import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createHash, randomBytes } from "node:crypto";
import { ensure, aborted, BridgeError } from "./errors.mjs";
import { shellQuote } from "./paths.mjs";
import { prepareWindowsCache } from "./install-cache.mjs";
import { waitForLocalhost } from "./localhost.mjs";
import { appOrigin } from "./handoff.mjs";

const packageRoot = fileURLToPath(new URL("../", import.meta.url));
export const DSH_VERSION = "0.2.0-rc.2";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export class NativeLauncher {
  constructor(service) {
    this.service = service;
    this.running = null;
    this.preparing = null;
    this.lifecycle = new AbortController();
    this.handoffSecret = randomBytes(32).toString("hex");
    this.progress = { phase: "idle", text: "" };
  }
  async lease(loc, distro, signal) {
    const mkdir = await this.service.execute(
      "wsl",
      {
        executable: "mkdir",
        args: ["-p", "--", loc.base],
        cwd: "/",
        timeoutMs: 15000,
      },
      { distro, signal },
    );
    ensure(mkdir.exitCode === 0, "SETUP_FAILED", mkdir.stderr);
    return this.service.call(
      "wsl",
      "lease.acquire",
      { path: `${loc.base}/runtime.lock` },
      { distro, signal },
    );
  }
  async release(lease, distro) {
    if (lease)
      await this.service
        .call("wsl", "lease.release", { id: lease.id }, { distro })
        .catch(() => {});
  }
  async close() {
    this.lifecycle.abort();
    await this.preparing?.catch(() => {});
    await this.stop().catch(() => {});
  }
  async getRunning() {
    if (!this.running) return null;
    const alive = this.service.pool
      .snapshot()
      .connections.some(
        (c) =>
          c.connected &&
          c.target[0] === "wsl" &&
          c.target[1] === this.running.distro &&
          (!this.service.settings.user ||
            c.info?.user === this.service.settings.user),
      );
    const job = alive
      ? await this.service
          .job("wsl", "status", { id: this.running.id })
          .catch(() => null)
      : null;
    if (job?.status === "running") return this.running;
    if (alive) await this.release(this.running.lease, this.running.distro);
    this.running = null;
    return null;
  }
  async locations(distro) {
    const info = await this.service.ping("wsl", { distro });
    const [major, minor] = info.node.replace(/^v/, "").split(".").map(Number);
    ensure(
      major >= 24 || (major === 22 && minor >= 19),
      "NODE_VERSION",
      "Linux DSH 需要 Node.js 22.19+ 的 22.x 系列或 24+。",
    );
    const base = `${info.home}/.local/share/dsh-wsl-native`;
    return {
      base,
      runtime: `${base}/runtime`,
      dshHome: `${base}/dsh-home`,
      patch: `${base}/runtime/plugin.patch.json`,
      cli: `${base}/runtime/node_modules/@deepseek-ai/dsh/lib/bin.js`,
      node: this.service.config.linuxNode || "node",
      distro: info.distro,
    };
  }
  async jobUntilDone(id, options, onProgress) {
    for (;;) {
      if (options.signal?.aborted) {
        await this.service.job(
          "wsl",
          "cancel",
          { id },
          { distro: options.distro },
        );
        aborted(options.signal);
      }
      const j = await this.service.job(
        "wsl",
        "status",
        { id },
        { distro: options.distro },
      );
      onProgress?.((j.stdout + "\n" + j.stderr).slice(-8192));
      if (j.status !== "running") {
        await this.service.job(
          "wsl",
          "forget",
          { id },
          { distro: options.distro },
        );
        ensure(
          j.status === "completed",
          "SETUP_FAILED",
          j.error?.message ||
            j.result?.stderr ||
            j.stderr ||
            `安装任务 ${j.status}。`,
        );
        return j.result;
      }
      await sleep(500);
    }
  }
  async prepare({
    distro,
    signal,
    onProgress,
    npmCache,
    installNetwork = "auto",
    reinstall = false,
  } = {}) {
    ensure(!this.preparing, "SETUP_BUSY", "环境准备正在进行。");
    signal = signal
      ? AbortSignal.any([signal, this.lifecycle.signal])
      : this.lifecycle.signal;
    const work = async () => {
      this.progress = { phase: "copying", text: "复制插件到 Linux 文件系统。" };
      onProgress?.(this.progress);
      const loc = await this.locations(distro);
      const lease = await this.lease(loc, distro, signal);
      try {
        const files = ["package.json", "cordis.patch.yml"];
        for (const folder of ["src", "lib", "bin"])
          for (const name of await fs.readdir(path.join(packageRoot, folder)))
            if (/\.(?:mjs|js)$/.test(name)) files.push(`${folder}/${name}`);
        const contents = await Promise.all(
          files.map(async (name) => ({
            name,
            content: await fs.readFile(path.join(packageRoot, name), "utf8"),
          })),
        );
        const hash = createHash("sha256");
        for (const f of contents) hash.update(f.name).update(f.content);
        const snapshot = `${loc.runtime}/plugins/${hash.digest("hex").slice(0, 20)}`;
        const mk = await this.service.execute(
          "wsl",
          {
            executable: "mkdir",
            args: [
              "-p",
              "--",
              loc.runtime,
              `${snapshot}/src`,
              `${snapshot}/lib`,
              `${snapshot}/bin`,
            ],
            timeoutMs: 15000,
          },
          { distro, signal },
        );
        ensure(mk.exitCode === 0, "SETUP_FAILED", mk.stderr);
        let copied = false;
        try {
          copied =
            (
              await this.service.files(
                "wsl",
                "read",
                { path: `${snapshot}/.complete` },
                { distro, signal },
              )
            ).content === "ready";
        } catch {
          /* A partial snapshot is repaired below. */
        }
        if (!copied) {
          for (const f of contents) {
            aborted(signal);
            await this.service.files(
              "wsl",
              "write",
              { path: `${snapshot}/${f.name}`, content: f.content },
              { distro, signal },
            );
          }
          await this.service.files(
            "wsl",
            "write",
            { path: `${snapshot}/.complete`, content: "ready" },
            { distro, signal },
          );
        }
        // npm's content-addressed cache is portable. Reuse existing Windows downloads;
        // no proxy, DNS, firewall or global npm configuration is changed.
        let installed;
        try {
          installed =
            JSON.parse(
              (
                await this.service.files(
                  "wsl",
                  "read",
                  { path: `${loc.runtime}/.dsh-wsl-ready.json` },
                  { distro, signal },
                )
              ).content,
            ).version === DSH_VERSION;
        } catch {
          installed = false;
        }
        if (!installed || reinstall) {
          if (!npmCache && process.platform === "win32") {
            const cache = await this.service
              .execute(
                "windows",
                { command: "npm config get cache", timeoutMs: 15000 },
                { signal },
              )
              .catch(() => null);
            if (
              cache?.exitCode === 0 &&
              /^[a-z]:[\\/][^\r\n]+$/i.test(cache.stdout.trim())
            )
              npmCache = cache.stdout.trim();
          }
          ensure(
            ["auto", "windows", "linux"].includes(installNetwork),
            "INVALID_ARGUMENT",
            "installNetwork 必须是 auto、windows 或 linux。",
          );
          const assisted =
            installNetwork === "windows" ||
            (installNetwork === "auto" && process.platform === "win32");
          ensure(
            !assisted || (process.platform === "win32" && npmCache),
            "NPM_CACHE_REQUIRED",
            "Windows 辅助下载需要 Windows 宿主及可用的 npm 缓存目录。",
          );
          const cacheArg = npmCache
            ? ` --cache ${shellQuote((await this.service.convert(npmCache, "linux", { distro, signal })).path)}`
            : "";
          if (assisted) {
            this.progress = {
              phase: "downloading",
              text: "通过 Windows 下载 Linux 安装包。",
            };
            onProgress?.(this.progress);
            const info = await this.service.ping("wsl", { distro });
            const cached = await prepareWindowsCache({
              version: DSH_VERSION,
              arch: info.arch,
              cache: npmCache,
              signal,
              onProgress: (text) => {
                this.progress.text = text;
                onProgress?.(this.progress);
              },
            });
            await this.service.files(
              "wsl",
              "write",
              {
                path: `${loc.runtime}/package.json`,
                content: cached.packageJson,
              },
              { distro, signal },
            );
            await this.service.files(
              "wsl",
              "write",
              {
                path: `${loc.runtime}/package-lock.json`,
                content: cached.lockText,
              },
              { distro, signal },
            );
          }
          this.progress = {
            phase: "installing",
            text: `安装 Linux DSH ${DSH_VERSION}，文件放在 ${loc.runtime}。`,
          };
          onProgress?.(this.progress);
          const install = assisted
            ? `npm ci --offline --no-audit --no-fund${cacheArg}`
            : `npm install --no-audit --no-fund --fetch-retries=1 --fetch-timeout=15000 --save-exact${cacheArg} ${shellQuote(`@deepseek-ai/dsh@${DSH_VERSION}`)}`;
          const script = `set -e\ncd ${shellQuote(loc.runtime)}\n${shellQuote(loc.node)} -e 'const [a,b]=process.versions.node.split(".").map(Number);if(!(a>=24||(a===22&&b>=19)))throw Error("DSH requires Node 22.19+ or 24+")'\n${install}`;
          const j = await this.service.job(
            "wsl",
            "start",
            { command: script, cwd: loc.runtime, timeoutMs: 1800000 },
            { distro, signal },
          );
          await this.jobUntilDone(j.id, { distro, signal }, (log) => {
            this.progress.text = log;
            onProgress?.(this.progress);
          });
          await this.service.files(
            "wsl",
            "write",
            {
              path: `${loc.runtime}/.dsh-wsl-ready.json`,
              content: JSON.stringify({ version: DSH_VERSION }),
            },
            { distro, signal },
          );
        }
        const entry = new URL("file:///");
        entry.pathname = `${snapshot}/src/index.mjs`;
        const patch =
          JSON.stringify(
            [{ insert: [{ id: "dsh-wsl-native", name: entry.href }] }],
            null,
            2,
          ) + "\n";
        await this.service.files(
          "wsl",
          "write",
          { path: loc.patch, content: patch },
          { distro, signal },
        );
        this.progress = {
          phase: "ready",
          text: "Linux DSH 与插件已经安装。",
          ...loc,
        };
        onProgress?.(this.progress);
        return { ...loc, plugin: snapshot, version: DSH_VERSION };
      } finally {
        await this.release(lease, distro);
      }
    };
    this.preparing = work();
    try {
      return await this.preparing;
    } catch (e) {
      this.progress = { phase: "failed", text: e.message };
      throw e;
    } finally {
      this.preparing = null;
    }
  }
  async start({
    distro,
    cwd,
    port = 0,
    signal,
    onProgress,
    parentOrigin,
  } = {}) {
    signal = signal
      ? AbortSignal.any([signal, this.lifecycle.signal])
      : this.lifecycle.signal;
    if (this.running) {
      const j = await this.service
        .job(
          "wsl",
          "status",
          { id: this.running.id },
          { distro: this.running.distro },
        )
        .catch(() => null);
      if (j?.status === "running") {
        ensure(
          !distro || this.running.distro === distro,
          "ALREADY_RUNNING",
          "本启动器已运行另一个发行版的 DSH；请先停止。",
        );
        return this.running;
      }
      await this.release(this.running.lease, this.running.distro);
      this.running = null;
    }
    const loc = await this.locations(distro);
    try {
      await this.service.files(
        "wsl",
        "stat",
        { path: loc.cli },
        { distro, signal },
      );
    } catch (e) {
      if (e.code === "ENOENT")
        throw new BridgeError(
          "SETUP_REQUIRED",
          "尚未安装 Linux DSH。先运行 dsh-wsl setup --distro " + loc.distro,
        );
      throw e;
    }
    ensure(
      Number.isSafeInteger(port) && port >= 0 && port <= 65535,
      "INVALID_ARGUMENT",
      "端口必须是 0–65535；0 自动选择空闲端口。",
    );
    const env = {
      DSH_HOME: loc.dshHome,
      DSH_WSL_HANDOFF_SECRET: this.handoffSecret,
    };
    if (appOrigin(parentOrigin))
      env.DSH_WSL_PARENT_ORIGIN = appOrigin(parentOrigin);
    if (cwd) env.DSH_WSL_DIRECTORY = cwd;
    if (process.platform === "win32")
      env.DSH_WSL_WINDOWS_NODE = (
        await this.service.convert(process.execPath, "linux", { distro })
      ).path;
    else if (process.env.DSH_WSL_WINDOWS_NODE)
      env.DSH_WSL_WINDOWS_NODE = process.env.DSH_WSL_WINDOWS_NODE;
    await this.service
      .files("wsl", "stat", { path: loc.patch }, { distro, signal })
      .catch(() => {
        throw new BridgeError(
          "SETUP_REQUIRED",
          "插件启动配置不存在，请重新运行 dsh-wsl setup。",
        );
      });
    const lease = await this.lease(loc, distro, signal);
    let job;
    try {
      job = await this.service.job(
        "wsl",
        "start",
        {
          executable: loc.node,
          args: [
            loc.cli,
            "web",
            "--patch",
            loc.patch,
            "--no-open",
            "--host",
            "127.0.0.1",
            "--port",
            String(port),
          ],
          cwd: cwd || undefined,
          env,
          timeoutMs: 0,
        },
        { distro, signal },
      );
      const deadline = Date.now() + 180000;
      while (Date.now() < deadline) {
        aborted(signal);
        const j = await this.service.job(
          "wsl",
          "status",
          { id: job.id },
          { distro },
        );
        onProgress?.(
          (j.stdout + "\n" + j.stderr)
            .replace(/([?&](?:token|auth|key)=[^\s&]+)/gi, "?[redacted]")
            .slice(-4096),
        );
        ensure(
          j.status === "running",
          "DSH_START_FAILED",
          j.error?.message ||
            j.result?.stderr ||
            j.stderr ||
            "DSH 在启动时退出。",
        );
        const match = /dsh web:\s+(http:\/\/127\.0\.0\.1:\d+[^\s]*)/.exec(
          j.stdout,
        );
        if (match) {
          const url = new URL(match[1]);
          ensure(
            url.hostname === "127.0.0.1" && url.port,
            "INVALID_URL",
            "DSH 返回了非本机地址。",
          );
          // Native DSH announces readiness after its startup audit. Also verify the Windows-facing carrier.
          const reachable = await waitForLocalhost(url.href, { signal });
          ensure(
            reachable,
            "LOCALHOST_UNREACHABLE",
            "Linux DSH 已启动，但 Windows localhost 转发不可达。请运行 dsh-wsl doctor 检查；插件不会修改防火墙或 WSL 网络配置。",
          );
          await this.service.files(
            "wsl",
            "write",
            {
              path: `${loc.runtime}/.dsh-wsl-ready.json`,
              content: JSON.stringify({ version: DSH_VERSION }),
            },
            { distro, signal },
          );
          this.running = {
            id: job.id,
            url: url.href,
            distro: loc.distro,
            user: this.service.settings.user,
            dshHome: loc.dshHome,
            lease,
            startedAt: Date.now(),
          };
          return this.running;
        }
        await sleep(500);
      }
      throw new BridgeError("DSH_START_TIMEOUT", "DSH 启动超过 180 秒。");
    } catch (e) {
      if (job)
        await this.service
          .job("wsl", "cancel", { id: job.id }, { distro })
          .catch(() => {});
      await this.release(lease, distro);
      throw e;
    }
  }
  async stop() {
    if (!this.running) return { stopped: true };
    const current = this.running;
    this.running = null;
    try {
      await this.service.job(
        "wsl",
        "cancel",
        { id: current.id },
        { distro: current.distro },
      );
      await this.service.job(
        "wsl",
        "forget",
        { id: current.id },
        { distro: current.distro },
      );
    } finally {
      await this.release(current.lease, current.distro);
    }
    return { stopped: true };
  }
}
