import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { createHash, randomUUID } from 'node:crypto';
import { parseDocument, stringify } from 'yaml';
import { stringifyString } from 'yaml/util';
import { runProcess, powershellArgs, powershellPath, psLiteral } from './process.mjs';
import { prepareWindowsCache, matchesPlatform } from './install-cache.mjs';
import { shellQuote } from './paths.mjs';
import { ensure, aborted } from './errors.mjs';

const defaults = { plugins: true, config: true, credentials: true };
const packageName = /^(?:@[a-z0-9][a-z0-9._-]*\/)?[a-z0-9][a-z0-9._-]*$/i;
const digest = value => createHash('sha256').update(typeof value === 'string' || Buffer.isBuffer(value) ? value : JSON.stringify(value)).digest('hex');
const plain = value => value && typeof value === 'object' && !Array.isArray(value) && !(value instanceof Expression);
class Expression {
  constructor(value) { this.value = value; }
  toString() { return this.value; }
}
const tags = [{ tag: 'tag:yaml.org,2002:js', identify: value => value instanceof Expression,
  resolve: value => new Expression(value), stringify: (item, ctx, onComment, onChompKeep) => stringifyString({ ...item, value: String(item.value) }, ctx, onComment, onChompKeep) }];
export function yaml(text, fallback) {
  if (!text?.trim()) return fallback;
  const doc = parseDocument(text, { customTags: tags, prettyErrors: false, uniqueKeys: true });
  ensure(!doc.errors.length && !doc.warnings.length, 'INHERIT_CONFIG', '配置含无法继承的 YAML 格式或标签；原文件保持不变。');
  return doc.toJS({ maxAliasCount: 100 }) ?? fallback;
}
export const yamlText = value => stringify(value, { customTags: tags, lineWidth: 0 });
function flatten(value, prefix = [], map = new Map()) {
  if (plain(value) && !prefix.length && !Object.keys(value).length) return map;
  // Authorization records are one unit: token and expiry must never be mixed.
  if (plain(value) && !['grant', 'api-key'].includes(value.kind) && Object.keys(value).length) {
    for (const [key, child] of Object.entries(value)) flatten(child, [...prefix, key], map);
  } else map.set(JSON.stringify(prefix), value);
  return map;
}
function expand(map) {
  let root = Object.create(null);
  for (const [encoded, value] of map) {
    const keys = JSON.parse(encoded); if (!keys.length) { root = value; continue; }
    let parent = root;
    for (const key of keys.slice(0, -1)) {
      if (!Object.hasOwn(parent, key) || !plain(parent[key])) Object.defineProperty(parent, key, { value: Object.create(null), enumerable: true, configurable: true, writable: true });
      parent = parent[key];
    }
    Object.defineProperty(parent, keys.at(-1), { value, enumerable: true, configurable: true, writable: true });
  }
  return root;
}
export function mergeInherited(current, incoming, baseline = null) {
  const target = flatten(current), source = flatten(incoming), hashes = Object.create(null);
  const ancestor = (a, b) => a === b || a === '[]' || b.startsWith(a.slice(0, -1) + ',');
  const overlaps = (a, b) => ancestor(a, b) || ancestor(b, a);
  let overrides = 0;
  for (const [key, value] of source) {
    const hash = digest(value); hashes[key] = hash;
    const conflicts = [...target.keys()].filter(k => overlaps(k, key));
    const deleted = baseline && Object.keys(baseline).some(k => overlaps(k, key) && !target.has(k));
    const unchanged = !baseline || (!deleted && conflicts.every(k => digest(target.get(k)) === baseline[k]));
    if (unchanged) {
      for (const k of conflicts) target.delete(k);
      target.set(key, value);
    } else if (!target.has(key) || digest(target.get(key)) !== hash) overrides++;
  }
  for (const [key, hash] of Object.entries(baseline || {})) if (!source.has(key) && target.has(key) && digest(target.get(key)) === hash) target.delete(key);
  return { value: expand(target), baseline: hashes, overrides };
}
export function mergePatchLayers(current, incoming, baseline) {
  ensure(Array.isArray(current) && Array.isArray(incoming), 'INHERIT_CONFIG', 'Cordis 配置必须为列表。');
  const keyed = rows => Object.fromEntries(rows.map((row, i) => [typeof row?.id === 'string' ? 'id:' + row.id : 'row:' + i, row]));
  const result = mergeInherited(keyed(current), keyed(incoming), baseline);
  return { ...result, value: Object.values(result.value) };
}
async function optional(file) { try { return await fs.readFile(file, 'utf8'); } catch (error) { if (error.code === 'ENOENT') return null; throw error; } }
async function atomic(file, value) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  const temp = file + '.' + randomUUID() + '.tmp';
  try { await fs.writeFile(temp, JSON.stringify(value, null, 2) + '\n', { mode: 0o600 }); await fs.rename(temp, file); }
  finally { await fs.unlink(temp).catch(() => {}); }
}

export class ProfileInheritance {
  constructor(service, source = service.config.sourceProfile) {
    this.service = service; this.source = source;
    const key = digest([service.settings.distro, service.settings.user]).slice(0, 24);
    this.preferences = path.join(service.config.inheritanceStateHome || source?.home || process.env.DSH_HOME || path.join(os.homedir(), '.dsh'), 'dsh-wsl-native', 'inheritance', key + '.json');
  }
  async status() {
    const saved = JSON.parse(await optional(this.preferences) || '{}');
    return { available: !!this.source && process.platform === 'win32', source: this.source?.name || null,
      options: { ...defaults, ...saved.options }, applied: saved.applied || null };
  }
  async configure(options) {
    ensure(this.source && options && Object.keys(options).every(k => k in defaults && typeof options[k] === 'boolean'), 'INVALID_ARGUMENT', '继承设置必须是插件、配置或模型账号的开关。');
    const saved = JSON.parse(await optional(this.preferences) || '{}');
    await atomic(this.preferences, { ...saved, options: { ...defaults, ...saved.options, ...options } });
    return this.status();
  }
  async inventory() {
    if (!this.source) return { manifest: null, plugins: [] };
    const manifest = JSON.parse(await fs.readFile(path.join(this.source.dir, 'package.json'), 'utf8'));
    const names = Object.keys(manifest.dependencies || {}).filter(name => name !== 'dsh-wsl-native');
    const plugins = [];
    for (const name of names) {
      ensure(packageName.test(name), 'INHERIT_PLUGIN', '插件包名称无效。');
      const directory = await fs.realpath(path.join(this.source.dir, 'node_modules', name));
      const json = await fs.readFile(path.join(directory, 'package.json'), 'utf8'), pkg = JSON.parse(json);
      ensure(pkg.name === name, 'INHERIT_PLUGIN', '插件包名称与安装目录不一致。');
      const hash = createHash('sha256').update(directory).update(json);
      for (const file of [pkg.main, 'lib/client.js', 'cordis.patch.yml'].filter(f => typeof f === 'string' && !path.isAbsolute(f) && !f.split(/[\\/]/).includes('..'))) {
        hash.update(await optional(path.join(directory, file)) || '');
      }
      plugins.push({ name, version: pkg.version, directory, pkg, fingerprint: hash.digest('hex') });
    }
    return { manifest, plugins };
  }
  async apply(loc, { distro, signal, npmCache, onProgress, jobUntilDone }) {
    if (!this.source || process.platform !== 'win32') return null;
    const { options } = await this.status();
    if (!Object.values(options).some(Boolean)) return null;
    const rpc = { distro, signal }, svc = this.service;
    const execute = async (executable, args, extra = {}) => {
      const result = await svc.execute('wsl', { executable, args, cwd: '/', timeoutMs: 30000, ...extra }, rpc);
      ensure(result.exitCode === 0, 'INHERIT_FAILED', result.stderr || 'Linux 配置操作失败。'); return result;
    };
    const read = async file => { try { const r = await svc.files('wsl', 'read', { path: file, limit: 262144 }, rpc); ensure(r.eof !== false, 'INHERIT_CONFIG', '配置文件超过 256 KiB。'); return r.content; } catch (e) { if (e.code === 'ENOENT') return null; throw e; } };
    const write = (file, content, old) => svc.files('wsl', 'write', { path: file, content, expectedHash: old === null ? 'absent' : digest(old) }, rpc);
    const web = `${loc.dshHome}/profiles/web`, stateFile = `${loc.base}/inheritance-state.json`;
    const stateText = await read(stateFile), previous = JSON.parse(stateText || '{}'), next = { ...previous, files: { ...previous.files } };
    const backup = `${loc.base}/backups/inherit-${Date.now()}-${randomUUID().slice(0, 8)}`;
    await execute('mkdir', ['-p', '--', web, `${web}/node_modules`, backup]);
    await execute('chmod', ['700', backup]);
    const changes = [], report = { date: new Date().toISOString(), source: this.source.name, plugins: [], overrides: 0, settings: options.config, credentials: options.credentials };
    const save = async (file, content) => {
      const old = await read(file); if (old === content) return;
      if (old !== null) await write(`${backup}/${changes.length}-${path.posix.basename(file)}`, old, null);
      changes.push({ file, content, old });
    };
    onProgress?.('继承主环境插件与配置，保留 Linux 中的单独调整。');
    if (options.plugins) {
      const { manifest, plugins } = await this.inventory(), info = await svc.ping('wsl', { distro });
      const compatible = plugins.filter(item => {
        if (matchesPlatform(item.pkg, info.arch)) return true;
        report.plugins.push({ name: item.name, version: item.version, status: 'unsupported', reason: '插件声明不支持当前 Linux 平台' }); return false;
      });
      const cacheDir = path.join(this.source.home, 'dsh-wsl-native', 'plugin-cache'); await fs.mkdir(cacheDir, { recursive: true });
      const packages = [];
      for (const item of compatible) {
        aborted(signal);
        const directory = path.join(cacheDir, item.fingerprint); await fs.mkdir(directory, { recursive: true });
        let packed = JSON.parse(await optional(path.join(directory, 'packed.json')) || 'null');
        if (!packed || !(await fs.stat(path.join(directory, packed.filename)).catch(() => null))) {
          const r = await runProcess(powershellPath(), powershellArgs(`& npm pack --ignore-scripts --json --pack-destination ${psLiteral(directory)} ${psLiteral(item.directory)}; exit $LASTEXITCODE`), { signal, timeoutMs: 120000, maxOutputBytes: 262144 });
          ensure(r.exitCode === 0, 'INHERIT_PLUGIN', `无法准备插件 ${item.name}。`);
          packed = JSON.parse(r.stdout)[0]; ensure(path.basename(packed.filename) === packed.filename, 'INHERIT_PLUGIN', '插件包文件名无效。');
          await atomic(path.join(directory, 'packed.json'), { filename: packed.filename });
        }
        packages.push({ ...item, local: path.join(directory, packed.filename), linux: `${loc.base}/plugin-packages/${item.fingerprint}.tgz` });
      }
      const manifestFile = `${web}/package.json`, currentText = await read(manifestFile);
      const current = JSON.parse(currentText || '{"name":"dsh-profile-web","private":true,"dependencies":{},"dsh":{"profile":{"bundles":["@deepseek-ai/dsh-base","@deepseek-ai/dsh-web-app"]}}}');
      const incoming = Object.fromEntries(packages.map(p => [p.name, 'file:' + p.linux]));
      const merged = mergeInherited(current.dependencies || {}, incoming, previous.dependencies);
      report.overrides += merged.overrides; next.dependencies = merged.baseline;
      const inherited = packages.filter(p => merged.value[p.name] === incoming[p.name]);
      const layerId = digest(Object.fromEntries(inherited.map(p => [p.name, p.fingerprint]))).slice(0, 24), layer = `${loc.base}/plugin-layers/${layerId}`;
      if (inherited.length && !(await read(`${layer}/.complete`))) {
        await execute('mkdir', ['-p', '--', layer, `${loc.base}/plugin-packages`]);
        for (const p of inherited) {
          const found = await svc.files('wsl', 'stat', { path: p.linux }, rpc).catch(e => { if (e.code !== 'ENOENT') throw e; return null; });
          if (!found) await svc.copy({ from: 'windows', to: 'wsl', source: p.local, destination: p.linux, distro, signal });
        }
        if (!npmCache) {
          const result = await svc.execute('windows', { command: 'npm config get cache', timeoutMs: 15000 }, { signal });
          ensure(result.exitCode === 0, 'NPM_CACHE_REQUIRED', '无法读取 Windows npm 缓存。'); npmCache = result.stdout.trim();
        }
        const sourcePackage = { name: 'dsh-wsl-inherited-plugins', version: '1.0.0', private: true, dependencies: Object.fromEntries(inherited.map(p => [p.name, 'file:' + p.local.replaceAll('\\', '/')])) };
        const cached = await prepareWindowsCache({ packageJson: sourcePackage, arch: info.arch, cache: npmCache, legacyPeers: true, signal, onProgress });
        const lock = JSON.parse(cached.lockText), linuxPackage = { ...sourcePackage, dependencies: Object.fromEntries(inherited.map(p => [p.name, 'file:' + p.linux])) };
        lock.packages[''].dependencies = linuxPackage.dependencies;
        for (const p of inherited) {
          const record = lock.packages['node_modules/' + p.name]; ensure(record, 'INHERIT_PLUGIN', `缺少插件 ${p.name} 的安装记录。`); record.resolved = 'file:' + p.linux;
        }
        await write(`${layer}/package.json`, JSON.stringify(linuxPackage), await read(`${layer}/package.json`));
        await write(`${layer}/package-lock.json`, JSON.stringify(lock), await read(`${layer}/package-lock.json`));
        const cache = (await svc.convert(npmCache, 'linux', rpc)).path;
        onProgress?.('在 Linux 中安装继承插件的依赖。');
        const job = await svc.job('wsl', 'start', { command: `npm ci --offline --legacy-peer-deps --no-audit --no-fund --cache ${shellQuote(cache)}`, cwd: layer, timeoutMs: 600000 }, rpc);
        await jobUntilDone(job.id, rpc, () => {});
        await write(`${layer}/.complete`, 'ready', null);
      }
      // Resolve only plugin directories through Linux symlinks. Runtime dependencies
      // are installed in Linux, and the original Windows node_modules is never used.
      if (inherited.length) await execute(loc.node, ['-e', `const fs=require('fs'),path=require('path');let s='';process.stdin.on('data',c=>s+=c);process.stdin.on('end',()=>{const p=JSON.parse(s);for(const n of p.names){const dest=path.join(p.profile,'node_modules',n);fs.mkdirSync(path.dirname(dest),{recursive:true});try{const stat=fs.lstatSync(dest);if(stat.isSymbolicLink()&&fs.readlinkSync(dest)===path.join(p.layer,'node_modules',n))continue;const backup=path.join(p.backup,'plugin-'+n.replaceAll('/','_'));fs.renameSync(dest,backup);}catch(e){if(e.code!=='ENOENT')throw e;}fs.symlinkSync(path.join(p.layer,'node_modules',n),dest,'dir');}});`], { stdin: JSON.stringify({ names: inherited.map(p => p.name), profile: web, layer, backup }) });
      const sourceBundles = (manifest.dsh?.profile?.bundles || []).filter(n => n !== 'dsh-wsl-native' && !report.plugins.some(p => p.name === n && p.status === 'unsupported'));
      const currentBundles = current.dsh?.profile?.bundles || ['@deepseek-ai/dsh-base', '@deepseek-ai/dsh-web-app'];
      const bundleMerge = mergeInherited(Object.fromEntries(currentBundles.map(n => [n, true])), Object.fromEntries(sourceBundles.map(n => [n, true])), previous.bundles);
      next.bundles = bundleMerge.baseline;
      const bundles = [...new Set([...sourceBundles, ...currentBundles])].filter(n => bundleMerge.value[n]);
      current.dependencies = merged.value; current.dsh = { ...current.dsh, profile: { ...current.dsh?.profile, bundles } };
      await save(manifestFile, JSON.stringify(current, null, 2) + '\n');
      for (const p of packages) report.plugins.push({ name: p.name, version: p.version, status: inherited.includes(p) ? 'inherited' : 'overridden' });
    }
    for (const [key, source, target, credentials] of [
      ['profile', path.join(this.source.dir, 'cordis.patch.yml'), `${web}/cordis.patch.yml`, false],
      ['home', path.join(this.source.home, 'cordis.patch.yml'), `${loc.dshHome}/cordis.patch.yml`, false],
      ['credentials', path.join(this.source.home, '.credentials.yaml'), `${loc.dshHome}/.credentials.yaml`, true],
    ]) {
      if (!(credentials ? options.credentials : options.config)) continue;
      const sourceText = await optional(source); if (sourceText === null) continue;
      const currentText = await read(target), fallback = credentials ? {} : [];
      const incoming = yaml(sourceText, fallback), current = yaml(currentText, fallback);
      const merged = credentials ? mergeInherited(current, incoming, previous.files?.[key]) : mergePatchLayers(current, incoming, previous.files?.[key]);
      next.files[key] = merged.baseline; report.overrides += merged.overrides;
      await save(target, yamlText(merged.value));
    }
    for (const change of changes) { aborted(signal); await write(change.file, change.content, change.old); await execute('chmod', ['600', change.file]); }
    next.date = report.date;
    await write(stateFile, JSON.stringify(next, null, 2), stateText);
    const prefs = JSON.parse(await optional(this.preferences) || '{}');
    await atomic(this.preferences, { ...prefs, options, applied: report });
    return report;
  }
}
