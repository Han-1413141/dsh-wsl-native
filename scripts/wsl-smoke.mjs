import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { randomUUID, randomBytes, createHash } from 'node:crypto';
import { WslService } from '../src/service.mjs';
import { connect, execFileBuffer, wslExecutable } from '../src/connector.mjs';
const distro = process.env.DSH_TEST_DISTRO || 'Ubuntu';
const service = new WslService({ distro, settingsFile: path.join(os.tmpdir(), `dsh-wsl-smoke-settings-${randomUUID()}.json`) });
const windowsDir = await fs.mkdtemp(path.join(os.tmpdir(), 'dsh-wsl-native-smoke-'));
const linuxDir = `/tmp/dsh-wsl-native-smoke-${randomUUID()}`;
const results = [];
const record = (name, detail = {}) => { results.push({ name, ok: true, ...detail }); console.log(`PASS ${name}`); };
try {
  const linux = await service.ping('wsl', { distro }), windows = await service.ping('windows');
  assert.equal(linux.platform, 'linux'); assert.equal(windows.platform, 'win32'); record('Windows 与 Linux 真实进程', { linuxNode: linux.node, windowsNode: windows.node });
  const setup = await service.execute('wsl', { executable: 'mkdir', args: ['-p', '--', linuxDir] }, { distro }); assert.equal(setup.exitCode, 0);
  const values = ['中文 空格', "'quoted' \"double\"", '$(printf BAD); & | >'];
  const run = await service.execute('wsl', { executable: 'node', args: ['-e', 'process.stdout.write(JSON.stringify(process.argv.slice(1)))', ...values], cwd: linuxDir }, { distro });
  assert.equal(run.exitCode, 0); assert.deepEqual(JSON.parse(run.stdout), values); record('跨系统命令参数无转义损坏');
  const unicodeFile = `${linuxDir}/中文 文件.txt`;
  const written = await service.files('wsl', 'write', { path: unicodeFile, content: '中文\nEnglish\n🙂\n', expectedHash: 'absent' }, { distro });
  assert.equal((await service.files('wsl', 'read', { path: unicodeFile }, { distro })).content, '中文\nEnglish\n🙂\n');
  const symlink = await service.execute('wsl', { executable: 'ln', args: ['-s', unicodeFile, `${linuxDir}/link`] }, { distro }); assert.equal(symlink.exitCode, 0);
  await service.files('wsl', 'write', { path: `${linuxDir}/link`, content: '链接目标已更新', expectedHash: written.sha256 }, { distro });
  const linkStat = await service.execute('wsl', { executable: 'test', args: ['-L', `${linuxDir}/link`] }, { distro }); assert.equal(linkStat.exitCode, 0); record('Linux 文本、符号链接与原子写入');
  const binary = randomBytes(3 * 1024 * 1024 + 31), winSource = path.join(windowsDir, '二进制 source.bin'), winBack = path.join(windowsDir, '回传.bin');
  await fs.writeFile(winSource, binary);
  const a = await service.copy({ from: 'windows', to: 'wsl', source: winSource, destination: `${linuxDir}/二进制.bin`, distro });
  const b = await service.copy({ from: 'wsl', to: 'windows', source: `${linuxDir}/二进制.bin`, destination: winBack, distro });
  const expected = createHash('sha256').update(binary).digest('hex'); assert.equal(a.sha256, expected); assert.equal(b.sha256, expected); assert.deepEqual(await fs.readFile(winBack), binary); record('3 MiB 二进制往返及 SHA-256', { bytes: binary.length, sha256: expected });
  const linuxPath = (await service.convert(winSource, 'linux', { distro })).path;
  const winPath = (await service.convert(linuxPath, 'windows', { distro })).path;
  assert.equal(path.win32.normalize(winPath).toLowerCase(), winSource.toLowerCase()); record('真实 wslpath 双向转换');
  const timeout = await service.execute('wsl', { command: 'sleep 30', timeoutMs: 150 }, { distro }); assert.equal(timeout.timedOut, true);
  const controller = new AbortController(); const promise = service.execute('wsl', { command: 'sleep 30' }, { distro, signal: controller.signal }); setTimeout(() => controller.abort(), 150); assert.equal((await promise).cancelled, true); record('Linux 超时、取消与连接继续可用');
  const ping = await service.ping('wsl', { distro }); assert.equal(ping.pid, linux.pid); assert.equal(service.pool.starts, 2); record('全部操作复用两个常驻进程');
  const j = await service.job('wsl', 'start', { command: 'printf background; sleep 30' }, { distro }); assert.equal((await service.job('wsl', 'cancel', { id: j.id }, { distro })).status, 'cancelled'); record('Linux 后台任务取消');
  const windowsNodeLinux = (await service.convert(process.execPath, 'linux', { distro })).path;
  const packageLinux = (await service.convert(path.resolve('.'), 'linux', { distro })).path;
  const reverseCode = `const {WslService}=await import(${JSON.stringify('file://' + packageLinux + '/src/service.mjs')}); const s=new WslService({windowsNode:${JSON.stringify(windowsNodeLinux)}});try{const p=await s.ping('windows');if(p.platform!=='win32')throw Error('wrong host');const r=await s.execute('windows',{command:"[Console]::Write('WSL 调用 Windows')"});if(r.stdout!=='WSL 调用 Windows')throw Error(JSON.stringify(r));console.log(JSON.stringify({ok:true,node:p.node}))}finally{await s.close()}`;
  const reverse = await service.execute('wsl', { executable: 'node', args: ['--input-type=module', '-e', reverseCode], timeoutMs: 30000 }, { distro }); assert.equal(reverse.exitCode, 0, reverse.stderr); record('WSL 宿主反向调用 Windows PowerShell');
  const signalWorker=await connect({target:'wsl',distro});
  await signalWorker.call('lease.acquire',{path:`${linuxDir}/signal.lock`});
  const task=await signalWorker.call('job.start',{executable:'node',args:['-e','console.log(process.pid);setInterval(()=>{},1000)']});
  let taskPid;
  for(let i=0;i<50;i++){const s=await signalWorker.call('job.status',{id:task.id});taskPid=Number(s.stdout.trim());if(taskPid)break;await new Promise(r=>setTimeout(r,20));}
  assert.ok(taskPid); await execFileBuffer(wslExecutable(),['-d',distro,'--exec','kill','-TERM',String(signalWorker.info.pid)]);
  await signalWorker.close();
  const cleaned=await service.execute('wsl',{executable:'node',args:['-e','const fs=require("fs");if(fs.existsSync(process.argv[1]))throw Error("lease remains");try{process.kill(Number(process.argv[2]),0);throw Error("child remains")}catch(e){if(e.code!=="ESRCH")throw e}',`${linuxDir}/signal.lock`,String(taskPid)]},{distro});
  assert.equal(cleaned.exitCode,0,cleaned.stderr); record('SIGTERM 回收后台进程并释放运行锁');
  await fs.mkdir('.test-output', { recursive: true }); await fs.writeFile('.test-output/wsl-smoke.json', JSON.stringify({ date: '2026-09-30', distro, results }, null, 2));
} finally {
  // Both paths were created by this test; verify the exact cleanup boundaries.
  assert.match(linuxDir, /^\/tmp\/dsh-wsl-native-smoke-[a-f0-9-]+$/);
  await service.execute('wsl', { executable: 'node', args: ['-e', 'require("fs").rmSync(process.argv[1],{recursive:true,force:true})', linuxDir], timeoutMs: 10000 }, { distro }).catch(() => {});
  await service.close();
  const resolved = await fs.realpath(windowsDir); assert.ok(resolved.startsWith(path.join(os.tmpdir(), 'dsh-wsl-native-smoke-'))); await fs.rm(resolved, { recursive: true });
}
