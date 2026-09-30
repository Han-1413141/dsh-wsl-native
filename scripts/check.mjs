import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
const root = fileURLToPath(new URL('../', import.meta.url));
for (const dir of ['src', 'bin', 'scripts', 'test', 'lib']) {
  for (const name of await fs.readdir(path.join(root, dir))) {
    if (!/\.(mjs|js)$/.test(name)) continue;
    const r = spawnSync(process.execPath, ['--check', path.join(root, dir, name)], { stdio: 'inherit', windowsHide: true });
    if (r.status !== 0) process.exit(r.status || 1);
  }
}
console.log('Syntax checks passed.');
