import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { createHash, randomBytes } from 'node:crypto';
import { PassThrough } from 'node:stream';
import { parseDistros, parseWslUnc, windowsToLinux, toWslUnc, shellQuote } from '../src/paths.mjs';
import { runProcess } from '../src/process.mjs';
import { readFrames, MAX_FRAME } from '../src/rpc.mjs';
import { connect, ConnectionPool } from '../src/connector.mjs';
import { authorize } from '../src/policy.mjs';
import { trusted } from '../src/routes.mjs';
import { apply } from '../src/index.mjs';
import { decodeChunk } from '../src/encoding.mjs';
import { matchesPlatform } from '../src/install-cache.mjs';

test('UTF-16 发行版列表支持本地化状态并过滤 Docker', () => {
  const bytes = Buffer.from('  NAME            STATE           VERSION\r\n* Ubuntu          正在运行         2\r\n  Debian          Stopped         2\r\n  docker-desktop  Running         2\r\n', 'utf16le');
  assert.deepEqual(parseDistros(bytes).map(x => [x.name, x.version, x.isDefault]), [['Ubuntu', 2, true], ['Debian', 2, false]]);
});
test('盘符、中文、UNC 与发行版边界', () => {
  assert.equal(windowsToLinux('D:\\中文 空格\\a.txt'), '/mnt/d/中文 空格/a.txt');
  assert.equal(windowsToLinux('C:\\'), '/mnt/c');
  assert.equal(windowsToLinux('C:\\x', undefined, '/windows'), '/windows/c/x');
  assert.deepEqual(parseWslUnc('\\\\wsl$\\Ubuntu\\home\\a'), { distro: 'Ubuntu', path: '/home/a' });
  assert.equal(toWslUnc('/home/中文', 'Ubuntu'), '\\\\wsl.localhost\\Ubuntu\\home\\中文');
  assert.throws(() => windowsToLinux('C:relative'), /绝对路径/);
  assert.throws(() => windowsToLinux('\\\\wsl$\\Debian\\a', 'Ubuntu'), /发行版/);
  assert.throws(() => toWslUnc('/a:b', 'Ubuntu'), /不能/);
  assert.equal(shellQuote("a'$(b)"), "'a'\\''$(b)'");
});
test('RPC 分包、粘包与多字节字符', () => {
  const stream = new PassThrough(), seen = []; let failure;
  const dispose = readFrames(stream, m => seen.push(m), e => failure = e);
  const data = Buffer.from('{"a":"中"}\n{"b":2}\n');
  for (const c of data) stream.write(Buffer.from([c]));
  assert.deepEqual(seen, [{ a: '中' }, { b: 2 }]); assert.equal(failure, undefined); dispose(); stream.destroy();
});
test('RPC 拒绝过大或无效帧', () => {
  for (const data of [Buffer.alloc(MAX_FRAME + 1, 65), Buffer.from('not json\n')]) {
    const stream = new PassThrough(); let error;
    readFrames(stream, () => assert.fail('invalid frame accepted'), e => error = e);
    stream.write(data); assert.ok(error); stream.destroy();
  }
});
test('UTF-8 与 GB18030 分页保留完整字符并返回正确字节偏移', () => {
  assert.deepEqual(decodeChunk(Buffer.from('A中文').subarray(0, 5), 'utf8', false), { content: 'A中', bytes: 4 });
  assert.deepEqual(decodeChunk(Buffer.from([0x41,0xd6,0xd0,0xce]), 'gb18030', false), { content: 'A中', bytes: 3 });
  assert.throws(() => decodeChunk(Buffer.from([0xff]), 'utf8', true), { code: 'INVALID_ENCODING' });
});
test('下载缓存按 Linux 架构和 libc 选择二进制依赖', () => {
  assert.equal(matchesPlatform({}, 'x64'), true);
  assert.equal(matchesPlatform({os:['linux'],cpu:['x64'],libc:['glibc']}, 'x64'), true);
  for(const p of [{os:['win32']},{os:['!linux']},{cpu:['arm64']},{libc:['musl']}]) assert.equal(matchesPlatform(p,'x64'),false);
});
test('程序参数原样传递，不经 shell 拼接', async () => {
  const arg = '中文 空格 "quoted" & $(touch NEVER)';
  const r = await runProcess(process.execPath, ['-e', 'process.stdout.write(process.argv[1])', arg]);
  assert.equal(r.exitCode, 0); assert.equal(r.stdout, arg);
});
test('大输出持续排空、截断不破坏 UTF-8', async () => {
  const r = await runProcess(process.execPath, ['-e', 'process.stdout.write("中".repeat(100000));process.stderr.write("x".repeat(100000))'], { maxOutputBytes: 1000 });
  assert.equal(r.exitCode, 0); assert.equal(r.truncated, true); assert.ok(!r.stdout.includes('\uFFFD')); assert.ok(Buffer.byteLength(r.stdout) <= 1000); assert.equal(r.outputBytes.stdout, 300000);
});
test('超时回收进程', async () => {
  const r = await runProcess(process.execPath, ['-e', 'setInterval(()=>{},1000)'], { timeoutMs: 120 });
  assert.equal(r.timedOut, true); assert.ok(r.durationMs < 8000);
});
test('取消传播并回收子进程树', async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'dsh-wsl-tree-'));
  const file = path.join(dir, 'should-not-exist');
  const childCode = `setTimeout(()=>require('fs').writeFileSync(${JSON.stringify(file)},'bad'),1800);setInterval(()=>{},1000)`;
  const parentCode = `require('child_process').spawn(process.execPath,['-e',${JSON.stringify(childCode)}],{stdio:'ignore'});console.log('spawned');setInterval(()=>{},1000)`;
  const abort = new AbortController(); let ready;
  const launched = new Promise(resolve => ready = resolve);
  const result = runProcess(process.execPath, ['-e', parentCode], { signal: abort.signal, onOutput: () => ready(), timeoutMs: 7000 });
  await launched; abort.abort(); const r = await result;
  assert.equal(r.cancelled, true); await new Promise(resolve => setTimeout(resolve, 1900));
  await assert.rejects(fs.stat(file), { code: 'ENOENT' }); await fs.rmdir(dir);
});

test('工作进程并发请求、文件冲突与二进制分块', async t => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'dsh-wsl-rpc-'));
  const rpc = await connect({ target: 'local' });
  try {
    await t.test('并发请求复用同一 PID，命令 cwd 独立', async () => {
      const pings = await Promise.all(Array.from({ length: 12 }, () => rpc.call('ping')));
      assert.equal(new Set(pings.map(p => p.pid)).size, 1);
      const runs = await Promise.all([dir, os.homedir()].map(cwd => rpc.call('exec', { executable: process.execPath, args: ['-e', 'process.stdout.write(process.cwd())'], cwd })));
      assert.equal(runs[0].stdout, dir); assert.equal(runs[1].stdout, os.homedir());
    });
    await t.test('原子文本写入与旧 hash 冲突', async () => {
      const file = path.join(dir, '中文 空格.txt');
      const first = await rpc.call('file.write', { path: file, content: '原文 中文', expectedHash: 'absent' });
      await assert.rejects(rpc.call('file.write', { path: file, content: '覆盖', expectedHash: 'absent' }), { code: 'FILE_CONFLICT' });
      await assert.rejects(rpc.call('file.write', { path: file, content: '覆盖', expectedHash: '0'.repeat(64) }), { code: 'FILE_CONFLICT' });
      await rpc.call('file.write', { path: file, content: '', expectedHash: first.sha256 });
      assert.equal((await rpc.call('file.read', { path: file })).content, '');
    });
    await t.test('新建目录保留中文名称，拒绝越级路径和已有目录', async () => {
      const name = '中文 WSL 工作区', destination = path.join(dir, name);
      try {
        assert.equal((await rpc.call('directory.create', { parent: dir, name })).path, destination);
        await assert.rejects(rpc.call('directory.create', { parent: dir, name }), { code: 'EEXIST' });
        for (const invalid of ['../outside', '..', 'a/b', 'a\\b', '', ' x '])
          await assert.rejects(rpc.call('directory.create', { parent: dir, name: invalid }), { code: 'INVALID_ARGUMENT' });
      } finally { await fs.rmdir(destination).catch(() => {}); }
    });
    await t.test('二进制分块、校验失败清理与提交', async () => {
      const data = randomBytes(400123), file = path.join(dir, 'binary.bin');
      let tx = await rpc.call('transfer.begin', { path: file, expectedHash: 'absent' });
      await rpc.call('transfer.chunk', { id: tx.id, offset: 0, data: data.subarray(0, 200000).toString('base64') });
      await assert.rejects(rpc.call('transfer.commit', { id: tx.id, sha256: '0'.repeat(64) }), { code: 'HASH_MISMATCH' });
      await assert.rejects(fs.stat(file), { code: 'ENOENT' });
      tx = await rpc.call('transfer.begin', { path: file, expectedHash: 'absent' });
      for (let i = 0; i < data.length; i += 200000) await rpc.call('transfer.chunk', { id: tx.id, offset: i, data: data.subarray(i, i + 200000).toString('base64') });
      await rpc.call('transfer.commit', { id: tx.id, sha256: createHash('sha256').update(data).digest('hex') });
      assert.deepEqual(await fs.readFile(file), data); assert.ok(!(await fs.readdir(dir)).some(n => n.endsWith('.tmp')));
    });
    await t.test('取消单次请求后连接仍可用', async () => {
      const abort = new AbortController();
      const r = rpc.call('exec', { executable: process.execPath, args: ['-e', 'setInterval(()=>{},1000)'] }, { signal: abort.signal });
      setTimeout(() => abort.abort(), 150); assert.equal((await r).cancelled, true); assert.equal((await rpc.call('ping')).pid, rpc.info.pid);
    });
    await t.test('后台任务显式取消', async () => {
      const { id } = await rpc.call('job.start', { executable: process.execPath, args: ['-e', 'console.log("ready");setInterval(()=>{},1000)'] });
      assert.equal((await rpc.call('job.status', { id })).status, 'running');
      assert.equal((await rpc.call('job.cancel', { id })).status, 'cancelled');
      await rpc.call('job.forget', { id }); await assert.rejects(rpc.call('job.status', { id }), { code: 'JOB_NOT_FOUND' });
    });
    await t.test('未知方法不导致连接损坏', async () => { await assert.rejects(rpc.call('no.such.method'), { code: 'UNKNOWN_METHOD' }); assert.ok(await rpc.call('ping')); });
    await t.test('多个启动器互斥并在 EOF 释放锁', async () => {
      const file = path.join(dir,'runtime.lock'); const lease=await rpc.call('lease.acquire',{path:file}); const other=await connect({target:'local'});
      try {
        await assert.rejects(other.call('lease.acquire',{path:file}),{code:'RUNTIME_BUSY'});
        await rpc.call('lease.release',lease); await other.call('lease.acquire',{path:file});
      } finally {await other.close();}
      await assert.rejects(fs.stat(file),{code:'ENOENT'});
    });
    await t.test('Windows 长脚本保留中文并清理临时文件', {skip:process.platform!=='win32'}, async () => {
      const result=await rpc.call('exec',{command:'#'+ 'x'.repeat(40000)+"\n[Console]::Write('长命令 中文')"});
      assert.equal(result.exitCode,0,result.stderr); assert.equal(result.stdout,'长命令 中文');
    });
    await t.test('EOF 清理未提交临时文件', async () => { await rpc.call('transfer.begin', { path: path.join(dir, 'unfinished.bin') }); await rpc.close(); assert.ok(!(await fs.readdir(dir)).some(n => n.endsWith('.tmp'))); });
  } finally { await rpc.close(); for (const file of await fs.readdir(dir)) await fs.unlink(path.join(dir, file)); await fs.rmdir(dir); }
});
test('连接池合并首次连接，关闭后拒绝调用', async () => {
  const pool = new ConnectionPool();
  const all = await Promise.all(Array.from({ length: 10 }, () => pool.get('local')));
  assert.equal(new Set(all).size, 1); assert.equal(pool.starts, 1); await pool.close();
  await assert.rejects(pool.get('local'), { code: 'CONNECTION_CLOSED' });
});
test('跨系统权限只接受完全访问或本次批准', async () => {
  let asked = 0;
  const exec = { signal: new AbortController().signal, agent: { session: {} }, name: 'test', callId: '1' };
  const ctx = (mode, grant) => ({ get: n => n === 'sandboxPolicy' ? { resolve: () => ({ mode }) } : n === 'approval' ? { request: async () => { asked++; return grant; } } : undefined });
  await authorize(ctx('danger-full-access', 'rejected'), exec, 'test'); assert.equal(asked, 0);
  await authorize(ctx('workspace-write', 'allowed-once'), exec, 'test'); assert.equal(asked, 1);
  for (const grant of ['rejected', 'unavailable', 'cancelled']) await assert.rejects(authorize(ctx('workspace-write', grant), exec, 'test'), { code: 'CROSS_OS_PERMISSION' });
  await assert.rejects(authorize({ get: () => undefined }, exec, 'test'), { code: 'CROSS_OS_PERMISSION' });
});
test('插件 HTTP 拒绝 DNS rebinding、跨域和错误端口', () => {
  const req = headers => ({ headers });
  assert.equal(trusted(req({ host: '127.0.0.1:3080', origin: 'http://127.0.0.1:3080' }), 3080), true);
  for (const headers of [{ host: 'evil.test:3080' }, { host: '127.0.0.1:3081' }, { host: '127.0.0.1:3080', origin: 'https://evil.test' }, { host: '127.0.0.1:3080', 'sec-fetch-site': 'cross-site' }]) assert.equal(trusted(req(headers), 3080), false);
});
test('官方 defineTool 接受七个工具，host 不需要启动 WSL', async () => {
  const tools = [], cleanups = [];
  apply({ tools: { register: t => tools.push(t) }, effect: f => cleanups.push(f()), inject: () => {}, get: () => undefined }, { settingsFile: path.join(os.tmpdir(), `absent-dsh-wsl-${Date.now()}.json`) });
  assert.equal(tools.length, 7); assert.equal(new Set(tools.map(t => t.name)).size, 7);
  for (const dispose of cleanups) await dispose();
});
