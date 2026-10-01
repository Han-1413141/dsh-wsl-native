import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { runProcess, powershellArgs, powershellPath, psLiteral } from './process.mjs';
import { ensure, aborted } from './errors.mjs';

export function matchesPlatform(entry, arch) {
  const permits = (list, value) => !list || (!list.includes('!' + value) && (list.every(v => v.startsWith('!')) || list.includes(value)));
  return permits(entry.os, 'linux') && permits(entry.cpu, arch) && permits(entry.libc, 'glibc');
}

/** Windows npm resolves/downloads; Linux npm performs extraction and install scripts. */
export async function prepareWindowsCache({ version, arch, cache, signal, onProgress, packageJson, legacyPeers = false }) {
  ensure(['x64', 'arm64'].includes(arch), 'UNSUPPORTED_ARCH', 'Linux 安装支持 x64 和 arm64。');
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'dsh-wsl-install-'));
  const run = async args => {
    aborted(signal);
    const result = await runProcess(powershellPath(), powershellArgs(`& npm ${args.map(psLiteral).join(' ')}; exit $LASTEXITCODE`), { cwd: directory, signal, timeoutMs: 600000, maxOutputBytes: 16384 });
    ensure(result.exitCode === 0 && !result.timedOut && !result.cancelled, 'NPM_DOWNLOAD_FAILED', result.stderr || result.stdout || 'Windows npm 下载失败。');
  };
  try {
    await fs.writeFile(path.join(directory, 'package.json'), JSON.stringify(packageJson || { name: 'dsh-wsl-managed-runtime', version: '1.0.0', private: true, dependencies: { '@deepseek-ai/dsh': version } }));
    const flags = ['--cache', cache, '--fetch-retries=1', '--fetch-timeout=20000', '--no-audit', '--no-fund'];
    onProgress?.('Windows 正在解析 Linux DSH 的依赖版本。');
    await run(['install', '--package-lock-only', '--ignore-scripts', '--prefer-online', '--os=linux', `--cpu=${arch}`, '--libc=glibc', ...(legacyPeers ? ['--legacy-peer-deps'] : []), ...flags]);
    const lockText = await fs.readFile(path.join(directory, 'package-lock.json'), 'utf8');
    const lock = JSON.parse(lockText);
    const urls = [...new Set(Object.values(lock.packages).filter(p => p.resolved && !p.resolved.startsWith('file:') && matchesPlatform(p, arch)).map(p => p.resolved))];
    ensure(urls.every(u => { try { const v = new URL(u); return v.protocol === 'https:' && !v.username && !v.password; } catch { return false; } }), 'INVALID_PACKAGE_SOURCE', '依赖锁文件包含非 HTTPS 包地址。');
    for (let i = 0; i < urls.length; i += 20) {
      onProgress?.(`Windows 正在缓存依赖：${Math.min(i + 20, urls.length)}/${urls.length}。`);
      await run(['cache', 'add', '--prefer-offline', ...flags, ...urls.slice(i, i + 20)]);
    }
    return { packageJson: await fs.readFile(path.join(directory, 'package.json'), 'utf8'), lockText, packages: urls.length };
  } finally {
    // Only remove files generated in this fresh temporary directory; no recursive deletion.
    for (const file of ['package.json', 'package-lock.json']) await fs.unlink(path.join(directory, file)).catch(() => {});
    await fs.rmdir(directory).catch(() => {});
  }
}
