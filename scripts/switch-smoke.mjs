import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { WslService } from "../src/service.mjs";
const distro = process.env.DSH_TEST_DISTRO || "Ubuntu";
let root;
const service = new WslService({
  distro,
  settingsFile: path.resolve(".test-output/switch-settings.json"),
});
const results = [],
  record = (name) => {
    results.push({ name, ok: true });
    console.log(`PASS ${name}`);
  };
await fs.mkdir(".test-output", { recursive: true });
try {
  const info = await service.ping("wsl", { distro });
  root = `${info.home}/.local/share/dsh-wsl-native/validation-${randomUUID()}`;
  const a = `${root}/project-alpha`,
    b = `${root}/project-beta`;
  const setup = await service.execute("wsl", {
    executable: "mkdir",
    args: ["-p", "--", a, b],
  });
  assert.equal(setup.exitCode, 0);
  const semantics = await service.execute("wsl", {
    executable: "node",
    cwd: a,
    args: [
      "--input-type=module",
      "-e",
      `
    import fs from 'node:fs/promises'; import {watch} from 'node:fs'; import assert from 'node:assert/strict';
    await fs.writeFile('Case.txt','upper');await fs.writeFile('case.txt','lower');
    assert.equal(await fs.readFile('Case.txt','utf8'),'upper');assert.equal(await fs.readFile('case.txt','utf8'),'lower');
    await fs.symlink('Case.txt','link.txt');assert.ok((await fs.lstat('link.txt')).isSymbolicLink());
    await fs.writeFile('run.sh','#!/bin/sh\\nprintf native-linux');await fs.chmod('run.sh',0o755);assert.equal((await fs.stat('run.sh')).mode&0o777,0o755);
    await new Promise((resolve,reject)=>{const watcher=watch('.',(event,file)=>{if(file==='watched.txt'){clearTimeout(timer);watcher.close();resolve();}});const timer=setTimeout(()=>{watcher.close();reject(Error('watch event missing'));},3000);fs.writeFile('watched.txt','changed').catch(reject);});
    console.log(JSON.stringify({platform:process.platform,cwd:process.cwd(),caseSensitive:true,symlinks:true,executableMode:true,fileWatch:true}));
  `,
    ],
  });
  assert.equal(semantics.exitCode, 0, semantics.stderr);
  const native = JSON.parse(semantics.stdout);
  assert.equal(native.platform, "linux");
  record("Linux 大小写、符号链接、可执行权限与原生文件监听");
  const selected = await service.switchEnvironment({ distro, directory: a });
  assert.equal(selected.storage, "linux");
  const job = await service.job("wsl", "start", {
    executable: "node",
    args: ["-e", "setTimeout(()=>console.log(process.cwd()),600)"],
    timeoutMs: 10000,
  });
  await service.switchEnvironment({ distro, directory: b });
  let status;
  for (let i = 0; i < 50; i++) {
    status = await service.job("wsl", "status", { id: job.id });
    if (status.status !== "running") break;
    await new Promise((r) => setTimeout(r, 40));
  }
  assert.equal(status.status, "completed");
  assert.equal(status.stdout.trim(), a);
  await service.job("wsl", "forget", { id: job.id });
  record("真实后台任务在切换目录后继续留在原目录");
  const command = await service.execute("wsl", { executable: "pwd" });
  assert.equal(command.stdout.trim(), b);
  record("后续命令使用新的 Linux 目录");
  const win = await service.execute("windows", {
    executable: process.execPath,
    args: [
      "-e",
      "console.log(JSON.stringify({platform:process.platform,cwd:process.cwd()}))",
    ],
    cwd: process.cwd(),
  });
  assert.equal(win.exitCode, 0, win.stderr);
  assert.equal(JSON.parse(win.stdout).platform, "win32");
  record("Windows 原生命令与 Linux 命令同时可用");
  await assert.rejects(
    service.switchEnvironment({ distro, directory: `${root}/missing` }),
    { code: "ENOENT" },
  );
  assert.equal(service.settings.directory, b);
  record("真实目录失效时原环境保持可用");
  const mounted = await service.switchEnvironment({
    distro,
    directory: process.cwd(),
  });
  assert.equal(mounted.storage, "windows-mount");
  record("Windows 路径自动转换并识别跨文件系统目录");
  const explicit = await service.ping("wsl", { distro, user: info.user });
  assert.equal(explicit.pid, info.pid);
  record("默认用户与显式用户名共用同一常驻进程");
  await fs.writeFile(
    ".test-output/switch-smoke.json",
    JSON.stringify(
      { date: new Date().toISOString(), distro, root, a, b, native, results },
      null,
      2,
    ),
  );
} finally {
  if (root && !process.argv.includes("--keep")) {
    assert.match(
      root,
      /^\/home\/[^/]+\/\.local\/share\/dsh-wsl-native\/validation-[a-f0-9-]+$/,
    );
    await service
      .execute("wsl", {
        executable: "node",
        args: [
          "-e",
          'require("fs").rmSync(process.argv[1],{recursive:true,force:true})',
          root,
        ],
        cwd: "/",
      })
      .catch(() => {});
  }
  await service.close();
}
