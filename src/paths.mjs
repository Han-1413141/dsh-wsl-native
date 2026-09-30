import path from 'node:path';
import { ensure, text } from './errors.mjs';

export function linuxPath(value) {
  text(value, 'Linux path');
  ensure(value.startsWith('/'), 'INVALID_PATH', '需要绝对 Linux 路径，例如 /home/user/project。');
  return path.posix.normalize(value);
}
export function distroName(value) {
  text(value, 'distro', 128);
  ensure(!/[\\/\r\n\x00-\x1f]/.test(value) && !value.startsWith('-'), 'INVALID_DISTRO', '发行版名称无效。');
  return value;
}
export function parseWslUnc(value) {
  const match = /^\\\\(?:wsl\.localhost|wsl\$)\\([^\\]+)(?:\\(.*))?$/i.exec(value);
  if (!match) return null;
  return { distro: distroName(match[1]), path: path.posix.normalize('/' + (match[2] ?? '').replaceAll('\\', '/')) };
}
export function toWslUnc(value, distro) {
  const normalized = linuxPath(value);
  ensure(!/[<>:"|?*\x00-\x1f\\]/.test(normalized), 'UNREPRESENTABLE_PATH', '该 Linux 文件名不能通过 Windows UNC 表示。请使用 WSL 文件工具。');
  return `\\\\wsl.localhost\\${distroName(distro)}${normalized.replaceAll('/', '\\')}`;
}
/** Fast default-mount conversion. Runtime conversions use the distro's own wslpath. */
export function windowsToLinux(value, distro, mountRoot = '/mnt') {
  text(value, 'Windows path');
  const unc = parseWslUnc(value);
  if (unc) { ensure(!distro || unc.distro.toLowerCase() === distro.toLowerCase(), 'DISTRO_MISMATCH', '路径所属发行版与选定发行版不同。'); return unc.path; }
  ensure(/^[A-Za-z]:[\\/]/.test(value), 'INVALID_PATH', '需要盘符绝对路径或 WSL UNC 路径；不接受 C:relative。');
  const normalized = path.win32.normalize(value);
  return `${mountRoot}/${normalized[0].toLowerCase()}/${normalized.slice(3).replaceAll('\\', '/')}`.replace(/\/$/, '') || '/';
}
export function parseDistros(buffer) {
  const raw = Buffer.isBuffer(buffer) ? buffer.toString(buffer.includes(0) ? 'utf16le' : 'utf8') : String(buffer).replaceAll('\0', '');
  const rows = [];
  for (const line of raw.replace(/^\uFEFF/, '').split(/\r?\n/)) {
    const match = /^\s*(\*)?\s*(.+?)\s{2,}(\S+)\s+(1|2)\s*$/.exec(line);
    if (!match || /^docker-desktop(?:-data)?$/i.test(match[2])) continue;
    rows.push({ name: match[2], state: match[3], version: Number(match[4]), isDefault: !!match[1] });
  }
  return rows;
}
export function shellQuote(value) { return `'${String(value).replaceAll("'", "'\\''")}'`; }
