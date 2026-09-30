import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";
import { spawn, execFile } from "node:child_process";
import { RpcClient } from "./rpc.mjs";
import { BridgeError, ensure, text } from "./errors.mjs";
import { distroName, parseDistros, shellQuote } from "./paths.mjs";

const workerFile = fileURLToPath(new URL("../lib/worker.mjs", import.meta.url));
let payload;
// The first line carries a bundled worker; no runtime is installed in the target distro.
// Later RPC bytes are put back before importing the worker, avoiding a lost-first-request race.
export const BOOTSTRAP = `let b=Buffer.alloc(0);process.stdin.on('data',function boot(c){b=Buffer.concat([b,c]);const n=b.indexOf(10);if(n<0){if(b.length>524288)process.exit(65);return}process.stdin.off('data',boot);process.stdin.pause();const rest=b.subarray(n+1);if(rest.length)process.stdin.unshift(rest);const src=b.subarray(0,n).toString();import('data:text/javascript;base64,'+src).then(()=>process.stdin.resume()).catch(e=>{process.stderr.write(e.stack+'\\n');process.exit(1)})});`;

export function wslExecutable() {
  return process.env.SystemRoot
    ? path.win32.join(process.env.SystemRoot, "System32", "wsl.exe")
    : "wsl.exe";
}
export function execFileBuffer(file, args, options = {}) {
  // Callback form survives the wrappers used by DSH Desktop.
  return new Promise((resolve, reject) =>
    execFile(
      file,
      args,
      {
        encoding: "buffer",
        windowsHide: true,
        timeout: 15000,
        maxBuffer: 1048576,
        ...options,
      },
      (error, stdout, stderr) =>
        error
          ? reject(
              Object.assign(error, {
                stderrText: stderr?.toString("utf8").slice(-2048),
              }),
            )
          : resolve({ stdout, stderr }),
    ),
  );
}
export async function listDistros() {
  if (process.platform !== "win32")
    return process.env.WSL_DISTRO_NAME
      ? [
          {
            name: process.env.WSL_DISTRO_NAME,
            state: "Running",
            version: 2,
            isDefault: true,
          },
        ]
      : [];
  const { stdout } = await execFileBuffer(wslExecutable(), [
    "--list",
    "--verbose",
  ]);
  return parseDistros(stdout);
}

export async function connect({
  target,
  distro,
  user,
  windowsNode,
  linuxNode,
} = {}) {
  let file, args;
  if (
    target === "local" ||
    (target === "windows" && process.platform === "win32") ||
    (target === "wsl" &&
      process.platform === "linux" &&
      (!distro || distro === process.env.WSL_DISTRO_NAME))
  ) {
    ensure(
      target !== "wsl" || process.env.WSL_DISTRO_NAME,
      "NOT_WSL",
      "当前 Linux 不是 WSL；请从 Windows 连接一个发行版。",
    );
    ensure(
      target !== "wsl" ||
        process.platform === "win32" ||
        !user ||
        user === os.userInfo().username,
      "USER_MISMATCH",
      "WSL 宿主只能使用当前 Linux 用户；切换用户请从 Windows 宿主连接。",
    );
    file = process.execPath;
    args = ["-e", BOOTSTRAP];
  } else if (target === "wsl") {
    ensure(
      process.platform === "win32",
      "WRONG_HOST",
      "跨发行版连接请在 Windows 宿主中进行。",
    );
    if (distro) distroName(distro);
    if (user) {
      text(user, "user", 128);
      ensure(
        !user.startsWith("-") && !/[\r\n]/.test(user),
        "INVALID_ARGUMENT",
        "Linux 用户名无效。",
      );
    }
    const nodeCommand = linuxNode
      ? shellQuote(text(linuxNode, "linuxNode"))
      : "node";
    const script = `command -v ${nodeCommand} >/dev/null 2>&1 || { echo 'WSL 中缺少 Node.js，请安装 Node.js 22.19+ 或 24+，或配置 linuxNode。' >&2; exit 69; }; exec ${nodeCommand} -e ${shellQuote(BOOTSTRAP)} 1>&3 3>&-`;
    // User login profiles may print banners. Reserve stdout for RPC before running them.
    const outer = `exec 3>&1; exec 1>&2; exec bash -lc ${shellQuote(script)}`;
    file = wslExecutable();
    args = [
      ...(distro ? ["--distribution", distro] : []),
      ...(user ? ["--user", user] : []),
      "--cd",
      "~",
      "--exec",
      "bash",
      "-c",
      outer,
    ];
  } else if (target === "windows") {
    ensure(
      process.platform === "linux" && process.env.WSL_DISTRO_NAME,
      "NOT_WSL",
      "Windows 互操作需要 WSL。",
    );
    file = windowsNode || process.env.DSH_WSL_WINDOWS_NODE || "node.exe";
    args = ["-e", BOOTSTRAP];
  } else
    throw new BridgeError(
      "INVALID_TARGET",
      "target 必须是 windows、wsl 或 local。",
    );
  payload ??= fs.readFile(workerFile).then((b) => b.toString("base64") + "\n");
  const source = await payload;
  const child = spawn(file, args, {
    windowsHide: true,
    stdio: ["pipe", "pipe", "pipe"],
    shell: false,
    env: { ...process.env, ELECTRON_RUN_AS_NODE: "1" },
    cwd: process.platform === "win32" ? process.env.SystemRoot : undefined,
  });
  const rpc = new RpcClient(child);
  child.stdin.write(source, (error) => {
    if (error) rpc.fail(error);
  });
  const info = await rpc.ready;
  try {
    ensure(
      target !== "wsl" || info.platform === "linux",
      "WRONG_RUNTIME",
      "WSL 的 node 实际指向 Windows；请配置 Linux node。",
    );
    ensure(
      target !== "windows" || info.platform === "win32",
      "WRONG_RUNTIME",
      "windowsNode 必须指向 Windows node.exe。",
    );
  } catch (e) {
    await rpc.close();
    throw e;
  }
  return rpc;
}

export class ConnectionPool {
  constructor(config = {}) {
    this.config = config;
    this.entries = new Map();
    this.closed = false;
    this.starts = 0;
  }
  async get(target, distro, user) {
    ensure(!this.closed, "CONNECTION_CLOSED", "插件已停止。");
    if (target !== "wsl") {
      distro = undefined;
      user = undefined;
    }
    const key = JSON.stringify([target, distro ?? "", user ?? ""]);
    let entry = this.entries.get(key);
    if (entry?.rpc?.closed) {
      clearTimeout(entry.timer);
      this.entries.delete(key);
      entry = undefined;
    }
    // The default user and their explicit name share the same resident worker.
    if (!entry && target === "wsl" && user)
      entry = [...this.entries.entries()].find(([k, value]) => {
        const identity = JSON.parse(k);
        return (
          identity[0] === "wsl" &&
          identity[1] === distro &&
          value.rpc &&
          !value.rpc.closed &&
          value.rpc.info?.user === user
        );
      })?.[1];
    if (!entry) {
      ensure(
        this.entries.size < 8,
        "POOL_FULL",
        "已连接 8 个目标，请先断开闲置连接。",
      );
      entry = { active: 0, touched: Date.now() };
      this.entries.set(key, entry);
      this.starts++;
      entry.promise = connect({ ...this.config, target, distro, user })
        .then((rpc) => {
          entry.rpc = rpc;
          return rpc;
        })
        .catch((e) => {
          if (this.entries.get(key) === entry) this.entries.delete(key);
          throw e;
        });
    }
    entry.touched = Date.now();
    return entry.promise;
  }
  async call(target, method, params = {}, options = {}) {
    const rpc = await this.get(target, options.distro, options.user);
    // Requests are never replayed after disconnect: an interrupted write/command may already have executed.
    return rpc.call(method, params, options);
  }
  snapshot() {
    return {
      starts: this.starts,
      connections: [...this.entries.entries()].map(([key, v]) => ({
        target: JSON.parse(key),
        connected: !!v.rpc && !v.rpc.closed,
        pending: v.rpc?.pending.size ?? 0,
        info: v.rpc?.info ?? null,
      })),
    };
  }
  async disconnect() {
    const items = [...this.entries.values()];
    this.entries.clear();
    await Promise.allSettled(items.map(async (e) => (await e.promise).close()));
  }
  async close() {
    this.closed = true;
    await this.disconnect();
  }
}
