import { spawn } from 'node:child_process';
import { StringDecoder } from 'node:string_decoder';
import { performance } from 'node:perf_hooks';
import { aborted, integer, text, ensure } from './errors.mjs';

export async function killTree(child, graceMs = 250) {
  if (!child.pid) return;
  if (process.platform === 'win32') {
    await new Promise(resolve => {
      const killer = spawn(`${process.env.SystemRoot || 'C:\\Windows'}\\System32\\taskkill.exe`, ['/PID', String(child.pid), '/T', '/F'], { windowsHide: true, stdio: 'ignore' });
      killer.once('error', () => { child.kill(); resolve(); });
      killer.once('close', resolve);
    });
  } else {
    try { process.kill(-child.pid, 'SIGTERM'); } catch {}
    await new Promise(resolve => setTimeout(resolve, graceMs));
    try { process.kill(-child.pid, 'SIGKILL'); } catch {}
  }
}

/** Drain both streams after the retained-byte cap; never let a chat result grow without bound. */
export async function runProcess(file, args = [], options = {}) {
  text(file, 'executable');
  ensure(Array.isArray(args) && args.every(x => typeof x === 'string' && !x.includes('\0')), 'INVALID_ARGUMENT', 'args 必须是字符串数组。');
  aborted(options.signal);
  const timeoutMs = integer(options.timeoutMs, 120000, 0, 86400000, 'timeoutMs');
  const maxOutputBytes = integer(options.maxOutputBytes, 65536, 256, 1048576, 'maxOutputBytes');
  const environment = { ...process.env }; delete environment.ELECTRON_RUN_AS_NODE;
  const start = performance.now();
  return new Promise((resolve, reject) => {
    const child = spawn(file, args, { cwd: options.cwd, env: options.env ?? environment, shell: false, windowsHide: true, detached: process.platform !== 'win32', stdio: ['pipe', 'pipe', 'pipe'] });
    let timedOut = false, cancelled = false, closing, spawnError;
    const buffers = { stdout: [], stderr: [] }, received = { stdout: 0, stderr: 0 }, retained = { stdout: 0, stderr: 0 };
    const collect = key => chunk => {
      received[key] += chunk.length;
      const keep = Math.min(chunk.length, maxOutputBytes - retained[key]);
      if (keep > 0) { buffers[key].push(chunk.subarray(0, keep)); retained[key] += keep; }
      options.onOutput?.(key, chunk);
    };
    child.stdout.on('data', collect('stdout'));
    child.stderr.on('data', collect('stderr'));
    child.stdin.on('error', () => {});
    child.once('error', error => { spawnError = error; });
    const stop = () => { closing ??= killTree(child); };
    const timer = timeoutMs === 0 ? undefined : setTimeout(() => { timedOut = true; stop(); }, timeoutMs);
    const cancel = () => { cancelled = true; stop(); };
    options.signal?.addEventListener('abort', cancel, { once: true });
    if (options.signal?.aborted) cancel();
    child.stdin.end(options.stdin ?? '');
    child.once('close', async (exitCode, signal) => {
      clearTimeout(timer);
      options.signal?.removeEventListener('abort', cancel);
      await closing;
      if (spawnError) { reject(spawnError); return; }
      const decode = key => {
        const decoder = new StringDecoder('utf8');
        const value = decoder.write(Buffer.concat(buffers[key]));
        return value + (received[key] > retained[key] ? '' : decoder.end());
      };
      resolve({ exitCode, signal, stdout: decode('stdout'), stderr: decode('stderr'), timedOut, cancelled,
        truncated: received.stdout > retained.stdout || received.stderr > retained.stderr,
        outputBytes: received, durationMs: Math.round((performance.now() - start) * 100) / 100 });
    });
  });
}

export function powershellArgs(script) {
  text(script, 'script', 262144);
  const prefix = "$ErrorActionPreference = 'Stop'; [Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false); $OutputEncoding = [Console]::OutputEncoding; ";
  const encoded = Buffer.from(prefix + script, 'utf16le').toString('base64');
  ensure(encoded.length < 30000, 'COMMAND_TOO_LONG', 'PowerShell 参数超过 Windows 命令行长度限制。请通过脚本文件执行。');
  return ['-NoLogo', '-NoProfile', '-NonInteractive', '-EncodedCommand', encoded];
}
export function powershellPath() { return `${process.env.SystemRoot || 'C:\\Windows'}\\System32\\WindowsPowerShell\\v1.0\\powershell.exe`; }
export function psLiteral(value) { return `'${String(value).replaceAll("'", "''")}'`; }
