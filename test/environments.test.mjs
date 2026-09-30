import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { WslService } from "../src/service.mjs";
import { createController } from "../src/routes.mjs";
import { connect } from "../src/connector.mjs";
import { localOrigin, handoffUrl, readHandoff } from "../src/handoff.mjs";
import { signHandoff, verifyHandoff } from "../src/handoff-auth.mjs";

const deferred = () => {
  let resolve;
  const promise = new Promise((r) => {
    resolve = r;
  });
  return { promise, resolve };
};
async function fixture(t) {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "dsh-env-test-"));
  const settingsFile = path.join(dir, "settings.json"),
    calls = [],
    jobs = new Map();
  const pool = {
    snapshot: () => ({ starts: 1, connections: [] }),
    async call(target, method, p, options) {
      calls.push({ target, method, p, options: { ...options } });
      if (method === "ping")
        return {
          platform: "linux",
          user: options.user || "alice",
          home: `/home/${options.user || "alice"}`,
          distro: options.distro,
          node: "v24.0.0",
        };
      if (method === "directory.resolve") {
        if (p.path === "/missing")
          throw Object.assign(new Error("ENOENT"), { code: "ENOENT" });
        return { path: p.path.replace(/\/$/, "") || "/", storage: "linux" };
      }
      if (method === "job.start") {
        const result = { id: `job-${jobs.size}`, status: "running" };
        jobs.set(result.id, options);
        return result;
      }
      if (method.startsWith("job.")) {
        const owner = jobs.get(p.id);
        assert.equal(options.distro, owner.distro);
        assert.equal(options.user, owner.user);
        return { id: p.id, status: "running" };
      }
      return { exitCode: 0, stdout: "ok" };
    },
    async disconnect() {},
  };
  const service = new WslService(
    { settingsFile },
    {
      pool,
      listDistros: async () =>
        ["Ubuntu", "Debian"].map((name) => ({
          name,
          isDefault: name === "Ubuntu",
          version: 2,
        })),
    },
  );
  t.after(async () => {
    await service.close();
    await fs.unlink(settingsFile).catch(() => {});
    await fs.rmdir(dir);
  });
  return { service, pool, calls, settingsFile };
}

test("切换先验证目录；失败不改设置、历史或持久化文件", async (t) => {
  const { service, settingsFile } = await fixture(t);
  await service.switchEnvironment({
    distro: "Ubuntu",
    directory: "/home/alice/project",
  });
  const original = await fs.readFile(settingsFile, "utf8");
  await assert.rejects(
    service.switchEnvironment({ distro: "Debian", directory: "/missing" }),
    { code: "ENOENT" },
  );
  assert.equal(service.settings.distro, "Ubuntu");
  assert.equal(await fs.readFile(settingsFile, "utf8"), original);
  await assert.rejects(service.switchEnvironment({ distro: "NotInstalled" }), {
    code: "DISTRO_NOT_FOUND",
  });
});

test("发行版和用户分别记忆目录，最近目录去重，重载后保留", async (t) => {
  const { service, pool, settingsFile } = await fixture(t);
  await service.switchEnvironment({
    distro: "Ubuntu",
    user: "alice",
    directory: "/home/alice/first",
  });
  await service.switchEnvironment({
    distro: "Ubuntu",
    user: "alice",
    directory: "/home/alice/second",
  });
  await service.switchEnvironment({
    distro: "Ubuntu",
    user: "bob",
    directory: "/home/bob/work",
  });
  await service.switchEnvironment({
    distro: "Debian",
    user: "alice",
    directory: "/srv/work",
  });
  await service.switchEnvironment({ distro: "Ubuntu", user: "alice" });
  assert.equal(service.settings.directory, "/home/alice/second");
  const restored = new WslService(
    { settingsFile },
    { pool, listDistros: () => service.distros() },
  );
  await restored.initialized;
  assert.deepEqual(restored.settings, service.settings);
  assert.deepEqual(restored.profiles[0].recentDirectories, [
    "/home/alice/second",
    "/home/alice/first",
  ]);
  assert.equal(restored.profiles[0].storage, "linux");
  assert.equal(restored.profiles.length, 3);
});

test("并发切换按请求次序提交，失败不会阻塞后续切换", async (t) => {
  const { service } = await fixture(t);
  const results = await Promise.allSettled([
    service.switchEnvironment({ distro: "Ubuntu", directory: "/one" }),
    service.switchEnvironment({ distro: "Debian", directory: "/missing" }),
    service.switchEnvironment({ distro: "Debian", directory: "/three" }),
  ]);
  assert.deepEqual(
    results.map((r) => r.status),
    ["fulfilled", "rejected", "fulfilled"],
  );
  assert.equal(service.settings.directory, "/three");
  assert.equal(service.profiles.length, 2);
});

test("路径转换期间切换环境，不会把在途命令转到新发行版或用户", async (t) => {
  const { service, pool, calls } = await fixture(t);
  await service.switchEnvironment({
    distro: "Ubuntu",
    user: "alice",
    directory: "/old",
  });
  const started = deferred(),
    proceed = deferred(),
    call = pool.call.bind(pool);
  pool.call = async (target, method, p, opts) => {
    if (method === "path.convert") {
      started.resolve();
      await proceed.promise;
      return { path: "/mnt/c/work" };
    }
    return call(target, method, p, opts);
  };
  const command = service.execute("wsl", { command: "pwd", cwd: "C:\\work" });
  await started.promise;
  await service.switchEnvironment({
    distro: "Debian",
    user: "bob",
    directory: "/new",
  });
  proceed.resolve();
  await command;
  const executed = calls.findLast((c) => c.method === "exec");
  assert.equal(executed.options.distro, "Ubuntu");
  assert.equal(executed.options.user, "alice");
  assert.equal(executed.p.cwd, "/mnt/c/work");
});

test("后台任务记住所属环境，切换后按 id 查询并拒绝错误的显式目标", async (t) => {
  const { service } = await fixture(t);
  await service.switchEnvironment({
    distro: "Ubuntu",
    user: "alice",
    directory: "/old",
  });
  const job = await service.job("wsl", "start", { command: "sleep 10" });
  await service.switchEnvironment({
    distro: "Debian",
    user: "bob",
    directory: "/new",
  });
  assert.equal(
    (await service.job("wsl", "status", { id: job.id })).status,
    "running",
  );
  await assert.rejects(
    service.job("wsl", "status", { id: job.id }, { distro: "Debian" }),
    { code: "JOB_ENVIRONMENT_MISMATCH" },
  );
  assert.equal(job.user, "alice");
  assert.equal(job.distro, "Ubuntu");
});

test("启动器作用域固定身份与目录，不随活动设置变动", async (t) => {
  const { service, calls } = await fixture(t);
  const first = await service.switchEnvironment({
    distro: "Ubuntu",
    user: "alice",
    directory: "/old",
  });
  const scoped = service.scope(first.settings);
  await service.switchEnvironment({
    distro: "Debian",
    user: "bob",
    directory: "/new",
  });
  await scoped.execute("wsl", { command: "pwd" });
  const last = calls.at(-1);
  assert.equal(last.options.distro, "Ubuntu");
  assert.equal(last.options.user, "alice");
  assert.equal(last.p.cwd, "/old");
  assert.equal(scoped.pool, service.pool);
  assert.equal(scoped.ownsPool, false);
});

test("Windows 原生命令不依赖 WSL，也不会因选择 Linux 环境被重定向", async (t) => {
  const { service, calls } = await fixture(t);
  service.listDistros = () => {
    throw Error("No WSL installed");
  };
  await service.execute("windows", {
    command: "$PSVersionTable",
    cwd: "C:\\Work",
  });
  assert.equal(calls.at(-1).target, "windows");
  assert.equal(calls.at(-1).p.cwd, "C:\\Work");
});

test(
  "多宿主启动合并重复进入，复用已运行实例，停止一个不影响另一个",
  { skip: process.platform !== "win32" },
  async (t) => {
    const { service } = await fixture(t),
      gate = deferred(),
      launched = [];
    const controller = createController(service, {
      createLauncher: (scoped) => {
        const launcher = {
          service: scoped,
          running: null,
          preparing: null,
          progress: {},
          prepares: 0,
          stops: 0,
          handoffSecret: "test-secret",
          async prepare() {
            this.prepares++;
            this.preparing = gate.promise;
            await gate.promise;
            this.preparing = null;
          },
          async start() {
            this.running = {
              id: `native-${launched.indexOf(this)}`,
              distro: scoped.settings.distro,
              url: `http://127.0.0.1:${4100 + launched.indexOf(this)}/?token=test`,
            };
            return this.running;
          },
          async getRunning() {
            return this.running;
          },
          async stop() {
            this.stops++;
            this.running = null;
            return { stopped: true };
          },
          async close() {
            this.running = null;
          },
        };
        launched.push(launcher);
        return launcher;
      },
    });
    t.after(() => controller.close());
    const first = await controller.dispatch("native/enter", {
      distro: "Ubuntu",
      directory: "/first",
      parentOrigin: "http://127.0.0.1:3080",
    });
    const duplicate = await controller.dispatch("native/enter", {
      distro: "Ubuntu",
      directory: "/first",
    });
    assert.equal(duplicate.id, first.id);
    assert.equal(launched.length, 1);
    await controller.dispatch("native/enter", {
      distro: "Debian",
      directory: "/second",
    });
    assert.equal(launched.length, 2);
    gate.resolve();
    let status;
    for (let i = 0; i < 100; i++) {
      status = await controller.dispatch("status");
      if (status.handoffs.every((item) => item.state === "ready")) break;
      await new Promise((r) => setImmediate(r));
    }
    assert.equal(
      status.native.instances.filter((item) => item.running).length,
      2,
    );
    const resumed = await controller.dispatch("native/enter", {
      distro: "Ubuntu",
      directory: "/first",
    });
    for (let i = 0; i < 100; i++) {
      status = await controller.dispatch("status");
      if (
        status.handoffs.find((item) => item.id === resumed.id)?.state ===
        "ready"
      )
        break;
      await new Promise((r) => setImmediate(r));
    }
    assert.equal(launched[0].prepares, 1);
    await controller.dispatch("native/stop", {
      distro: "Ubuntu",
      user: "alice",
    });
    assert.equal(launched[0].running, null);
    assert.ok(launched[1].running);
    assert.equal(
      readHandoff(new URL(status.handoffs[0].url).hash).parentOrigin,
      "http://127.0.0.1:3080",
    );
  },
);

test("切换地址仅接受本机 origin，保留认证查询并正确传递中文目录", () => {
  for (const value of [
    "https://example.com",
    "javascript:alert(1)",
    "http://localhost:3000/?token=x",
    "http://user:pw@localhost:3000",
    "http://localhost.evil.test",
    "file:///C:/",
  ])
    assert.equal(localOrigin(value), null);
  const url = handoffUrl("http://127.0.0.1:4180/?token=example", {
    id: "test",
    settings: {
      distro: "Ubuntu",
      user: "alice",
      directory: "/home/alice/中文 project",
    },
    parentOrigin: "http://localhost:3080",
  });
  assert.equal(new URL(url).searchParams.get("token"), "example");
  assert.deepEqual(readHandoff(new URL(url).hash), {
    id: "test",
    distro: "Ubuntu",
    user: "alice",
    directory: "/home/alice/中文 project",
    parentOrigin: "http://localhost:3080",
  });
  assert.equal(readHandoff("#dsh-wsl=%broken"), null);
});

test("真实工作进程解析目录，拒绝普通文件，目录验证后连接仍可复用", async (t) => {
  const rpc = await connect({ target: "local" });
  t.after(() => rpc.close());
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "dsh-dir-test-")),
    file = path.join(dir, "file.txt");
  t.after(async () => {
    await fs.unlink(file);
    await fs.rmdir(dir);
  });
  await fs.writeFile(file, "test");
  assert.equal(
    (await rpc.call("directory.resolve", { path: dir })).path,
    await fs.realpath(dir),
  );
  await assert.rejects(rpc.call("directory.resolve", { path: file }), {
    code: "ENOTDIR",
  });
  assert.equal((await rpc.call("ping")).user, os.userInfo().username);
});

test("工作区自动进入校验签名、路径、来源、时间与运行实例", () => {
  const handoff = signHandoff(
    {
      id: "request-1",
      settings: {
        distro: "Ubuntu",
        user: "alice",
        directory: "/home/alice/中文",
      },
      parentOrigin: "http://127.0.0.1:3000",
    },
    "one-instance",
    1000000,
  );
  const parsed = readHandoff(
    new URL(handoffUrl("http://localhost:4000/?token=t", handoff)).hash,
  );
  assert.equal(verifyHandoff(parsed, "one-instance", 1001000), true);
  assert.equal(
    verifyHandoff(
      { ...parsed, directory: "/another" },
      "one-instance",
      1001000,
    ),
    false,
  );
  assert.equal(
    verifyHandoff(
      { ...parsed, parentOrigin: "http://localhost:1" },
      "one-instance",
      1001000,
    ),
    false,
  );
  assert.equal(verifyHandoff(parsed, "another-instance", 1001000), false);
  assert.equal(verifyHandoff(parsed, undefined, 1001000), false);
  assert.equal(
    verifyHandoff(parsed, "one-instance", 1000000 + 86400001),
    false,
  );
  assert.equal(verifyHandoff(parsed, "one-instance", 0), false);
});
