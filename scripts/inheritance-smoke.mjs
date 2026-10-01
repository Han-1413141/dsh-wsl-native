import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { parse, stringify } from 'yaml';
import { WslService } from '../src/service.mjs';
import { NativeLauncher } from '../src/launcher.mjs';

const root = new URL('../', import.meta.url), out = new URL('../.test-output/', import.meta.url);
await fs.mkdir(out, { recursive: true });
const id = randomUUID(), home = process.env.DSH_HOME || path.join(os.homedir(), '.dsh');
const nativeRoot = '/tmp/dsh-wsl-inherit-' + id;
const service = new WslService({ settingsFile: fileURLToPath(new URL(`settings-inherit-${id}.json`, out)), nativeRoot,
  inheritanceStateHome: path.join(os.tmpdir(), 'dsh-wsl-inherit-' + id), sourceProfile: { name: 'desktop', dir: path.join(home, 'profiles/desktop'), home } });
const distro = process.env.DSH_TEST_DISTRO || 'Ubuntu';
await service.switchEnvironment({ distro, directory: '/tmp' });
const launcher = new NativeLauncher(service);
let loc;
try {
  let phase;
  loc = await launcher.prepare({ distro, onProgress: p => { if (p.phase !== phase) { phase = p.phase; console.log('Phase:', phase); } } });
  const inheritance = await launcher.inheritance.status();
  assert.ok(inheritance.applied.plugins.length >= 1);
  assert.ok(inheritance.applied.plugins.every(p => p.status === 'inherited'), JSON.stringify(inheritance.applied.plugins));
  const manifest = JSON.parse((await service.files('wsl', 'read', { path: `${loc.dshHome}/profiles/web/package.json` })).content);
  for (const p of inheritance.applied.plugins) assert.ok(manifest.dependencies[p.name]);
  const check = await service.execute('wsl', { executable: loc.node, args: ['-e', `const fs=require('fs');const p=process.argv[1];const s=fs.statSync(p+'/.credentials.yaml');if(s.mode&63)throw Error('Credential mode is not private');console.log('private');`, loc.dshHome] });
  assert.equal(check.exitCode, 0, check.stderr);
  // An actual local setting edit must survive subsequent inheritance.
  const configFile = `${loc.dshHome}/profiles/web/cordis.patch.yml`;
  const config = parse((await service.files('wsl', 'read', { path: configFile })).content) || [];
  const theme = config.find(row => row.id === 'ui-chat'); assert.ok(theme);
  theme.config.transcriptView = 'inheritance-local-test';
  await service.files('wsl', 'write', { path: configFile, content: stringify(config) });
  await launcher.prepare({ distro });
  const preserved = parse((await service.files('wsl', 'read', { path: configFile })).content);
  assert.equal(preserved.find(row=>row.id==='ui-chat').config.transcriptView, 'inheritance-local-test');
  // Restore a valid display option before the real host loads the configuration.
  theme.config.transcriptView = 'standard'; await service.files('wsl', 'write', { path: configFile, content: stringify(config) });
  const running = await launcher.start({ distro, cwd: '/tmp' });
  const origin = new URL(running.url).origin;
  const login = await fetch(running.url, { redirect: 'manual' });
  const cookie = login.headers.getSetCookie().map(v => v.split(';')[0]).join('; '); assert.ok(cookie);
  const response = await fetch(origin + '/api/dsh-wsl-native/status', { method: 'POST', headers: { Cookie: cookie, 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'client-request', rpcId: 'inheritance-test', method: 'dsh-wsl-native/status', payload: {} }) });
  const result = await response.json(); assert.equal(result.result?.ok, true);
  const expected = JSON.parse(await fs.readFile(new URL('package.json', root), 'utf8')).version;
  assert.equal(result.result.value.version, expected);
  const evidence = { date: new Date().toISOString(), version: expected, inheritedPlugins: inheritance.applied.plugins, source: 'desktop', isolatedLinuxHome: true,
    credentialsOwnerOnly: true, localConfigOverridePreserved: true, warmPluginLayerReused: true, realLinuxDshLoaded: true, authenticatedApi: true, modelApiCalled: false };
  await fs.writeFile(new URL('inheritance-smoke.json', out), JSON.stringify(evidence, null, 2));
  console.log('PASS actual Desktop plugins inherited into isolated Linux DSH; local setting override retained; authenticated host loaded.');
} finally {
  await launcher.close();
  if (/^\/tmp\/dsh-wsl-inherit-[a-f0-9-]{36}$/.test(nativeRoot)) await service.execute('wsl', { executable: 'node', args: ['-e', `require('fs').rmSync(process.argv[1],{recursive:true,force:true});`, nativeRoot], cwd: '/' }).catch(() => {});
  await service.close();
}
