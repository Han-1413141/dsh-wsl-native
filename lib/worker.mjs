// src/worker.mjs
import fs from "node:fs/promises";
import { createReadStream } from "node:fs";
import path from "node:path";
import os from "node:os";
import { createHash, randomUUID } from "node:crypto";

// src/process.mjs
import { spawn } from "node:child_process";
import { StringDecoder } from "node:string_decoder";
import { performance } from "node:perf_hooks";

// src/errors.mjs
var BridgeError = class extends Error {
  constructor(code, message) {
    super(message);
    this.name = "BridgeError";
    this.code = code;
  }
};
function ensure(test, code, message) {
  if (!test) throw new BridgeError(code, message);
}
function text(value, name, max = 32768) {
  ensure(typeof value === "string" && value.length > 0 && value.length <= max && !value.includes("\0"), "INVALID_ARGUMENT", `${name} \u5FC5\u987B\u662F\u975E\u7A7A\u5B57\u7B26\u4E32\uFF0C\u4E14\u4E0D\u542B NUL\u3002`);
  return value;
}
function integer(value, fallback, min, max, name = "number") {
  if (value === void 0) return fallback;
  ensure(Number.isSafeInteger(value) && value >= min && value <= max, "INVALID_ARGUMENT", `${name} \u5FC5\u987B\u662F ${min}\u2013${max} \u4E4B\u95F4\u7684\u6574\u6570\u3002`);
  return value;
}
function aborted(signal) {
  if (signal?.aborted) throw new BridgeError("ABORTED", "\u64CD\u4F5C\u5DF2\u53D6\u6D88\u3002");
}
function errorData(e) {
  return { code: typeof e?.code === "string" ? e.code : "BRIDGE_ERROR", message: String(e?.message ?? e).slice(0, 4096) };
}

// src/process.mjs
async function killTree(child, graceMs = 250) {
  if (!child.pid) return;
  if (process.platform === "win32") {
    await new Promise((resolve) => {
      const killer = spawn(`${process.env.SystemRoot || "C:\\Windows"}\\System32\\taskkill.exe`, ["/PID", String(child.pid), "/T", "/F"], { windowsHide: true, stdio: "ignore" });
      killer.once("error", () => {
        child.kill();
        resolve();
      });
      killer.once("close", resolve);
    });
  } else {
    try {
      process.kill(-child.pid, "SIGTERM");
    } catch {
    }
    await new Promise((resolve) => setTimeout(resolve, graceMs));
    try {
      process.kill(-child.pid, "SIGKILL");
    } catch {
    }
  }
}
async function runProcess(file, args = [], options = {}) {
  text(file, "executable");
  ensure(Array.isArray(args) && args.every((x) => typeof x === "string" && !x.includes("\0")), "INVALID_ARGUMENT", "args \u5FC5\u987B\u662F\u5B57\u7B26\u4E32\u6570\u7EC4\u3002");
  aborted(options.signal);
  const timeoutMs = integer(options.timeoutMs, 12e4, 0, 864e5, "timeoutMs");
  const maxOutputBytes = integer(options.maxOutputBytes, 65536, 256, 1048576, "maxOutputBytes");
  const environment = { ...process.env };
  delete environment.ELECTRON_RUN_AS_NODE;
  const start = performance.now();
  return new Promise((resolve, reject) => {
    const child = spawn(file, args, { cwd: options.cwd, env: options.env ?? environment, shell: false, windowsHide: true, detached: process.platform !== "win32", stdio: ["pipe", "pipe", "pipe"] });
    let timedOut = false, cancelled = false, closing, spawnError;
    const buffers = { stdout: [], stderr: [] }, received = { stdout: 0, stderr: 0 }, retained = { stdout: 0, stderr: 0 };
    const collect = (key) => (chunk) => {
      received[key] += chunk.length;
      const keep = Math.min(chunk.length, maxOutputBytes - retained[key]);
      if (keep > 0) {
        buffers[key].push(chunk.subarray(0, keep));
        retained[key] += keep;
      }
      options.onOutput?.(key, chunk);
    };
    child.stdout.on("data", collect("stdout"));
    child.stderr.on("data", collect("stderr"));
    child.stdin.on("error", () => {
    });
    child.once("error", (error) => {
      spawnError = error;
    });
    const stop = () => {
      closing ??= killTree(child);
    };
    const timer = timeoutMs === 0 ? void 0 : setTimeout(() => {
      timedOut = true;
      stop();
    }, timeoutMs);
    const cancel = () => {
      cancelled = true;
      stop();
    };
    options.signal?.addEventListener("abort", cancel, { once: true });
    if (options.signal?.aborted) cancel();
    child.stdin.end(options.stdin ?? "");
    child.once("close", async (exitCode, signal) => {
      clearTimeout(timer);
      options.signal?.removeEventListener("abort", cancel);
      await closing;
      if (spawnError) {
        reject(spawnError);
        return;
      }
      const decode = (key) => {
        const decoder = new StringDecoder("utf8");
        const value = decoder.write(Buffer.concat(buffers[key]));
        return value + (received[key] > retained[key] ? "" : decoder.end());
      };
      resolve({
        exitCode,
        signal,
        stdout: decode("stdout"),
        stderr: decode("stderr"),
        timedOut,
        cancelled,
        truncated: received.stdout > retained.stdout || received.stderr > retained.stderr,
        outputBytes: received,
        durationMs: Math.round((performance.now() - start) * 100) / 100
      });
    });
  });
}
function powershellArgs(script) {
  text(script, "script", 262144);
  const prefix = "$ErrorActionPreference = 'Stop'; [Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false); $OutputEncoding = [Console]::OutputEncoding; ";
  const encoded = Buffer.from(prefix + script, "utf16le").toString("base64");
  ensure(encoded.length < 3e4, "COMMAND_TOO_LONG", "PowerShell \u53C2\u6570\u8D85\u8FC7 Windows \u547D\u4EE4\u884C\u957F\u5EA6\u9650\u5236\u3002\u8BF7\u901A\u8FC7\u811A\u672C\u6587\u4EF6\u6267\u884C\u3002");
  return ["-NoLogo", "-NoProfile", "-NonInteractive", "-EncodedCommand", encoded];
}
function powershellPath() {
  return `${process.env.SystemRoot || "C:\\Windows"}\\System32\\WindowsPowerShell\\v1.0\\powershell.exe`;
}
function psLiteral(value) {
  return `'${String(value).replaceAll("'", "''")}'`;
}

// src/rpc.mjs
var MAX_FRAME = 2097152;
var PROTOCOL = 1;
function readFrames(stream, onFrame, onError) {
  let pending = Buffer.alloc(0), failed = false;
  const fail = (error) => {
    if (!failed) {
      failed = true;
      onError(error);
    }
  };
  const data = (chunk) => {
    if (failed) return;
    pending = Buffer.concat([pending, Buffer.from(chunk)]);
    let end;
    while ((end = pending.indexOf(10)) >= 0) {
      if (end > MAX_FRAME) {
        fail(new BridgeError("FRAME_TOO_LARGE", "RPC \u6570\u636E\u5E27\u8D85\u8FC7\u4E0A\u9650\u3002"));
        return;
      }
      const line = pending.subarray(0, end);
      pending = pending.subarray(end + 1);
      if (!line.length) continue;
      try {
        onFrame(JSON.parse(line.toString("utf8")));
      } catch (e) {
        fail(new BridgeError("INVALID_FRAME", `RPC \u5E27\u65E0\u6548\uFF1A${e.message}`));
        return;
      }
    }
    if (pending.length > MAX_FRAME) fail(new BridgeError("FRAME_TOO_LARGE", "RPC \u6570\u636E\u5E27\u8D85\u8FC7\u4E0A\u9650\u3002"));
  };
  stream.on("data", data);
  return () => stream.off("data", data);
}
function writeFrame(stream, value) {
  const frame = JSON.stringify(value) + "\n";
  ensure(Buffer.byteLength(frame) <= MAX_FRAME, "FRAME_TOO_LARGE", "RPC \u6570\u636E\u5E27\u8D85\u8FC7\u4E0A\u9650\u3002");
  ensure(!stream.destroyed && !stream.writableEnded, "CONNECTION_CLOSED", "\u8FDE\u63A5\u5DF2\u5173\u95ED\u3002");
  ensure(stream.writableLength < 4 * MAX_FRAME, "BACKPRESSURE", "\u8FDE\u63A5\u5199\u5165\u961F\u5217\u5DF2\u6EE1\u3002");
  return new Promise((resolve, reject) => {
    stream.write(frame, (error) => error ? reject(error) : resolve());
  });
}
async function serve(handlers2, { input = process.stdin, output = process.stdout, info = {}, dispose = async () => {
} } = {}) {
  const active = /* @__PURE__ */ new Map();
  let stopping = false;
  output.on("error", () => shutdown2());
  async function shutdown2() {
    if (stopping) return;
    stopping = true;
    unread();
    input.pause();
    for (const task of active.values()) task.controller.abort();
    await Promise.allSettled([...active.values()].map((t) => t.promise));
    await dispose();
  }
  const unread = readFrames(input, (msg) => {
    if (msg?.method === "$cancel") {
      active.get(msg.params?.id)?.controller.abort();
      return;
    }
    if (stopping) return;
    ensure(Number.isSafeInteger(msg?.id) && msg.id > 0 && typeof msg.method === "string", "INVALID_FRAME", "RPC \u8BF7\u6C42\u65E0\u6548\u3002");
    ensure(!active.has(msg.id), "DUPLICATE_ID", "\u91CD\u590D RPC id\u3002");
    const handler = handlers2[msg.method];
    if (!handler || active.size >= 16) {
      void writeFrame(output, { id: msg.id, error: { code: handler ? "BUSY" : "UNKNOWN_METHOD", message: handler ? "\u540C\u65F6\u6267\u884C\u7684\u8BF7\u6C42\u8D85\u8FC7 16 \u4E2A\u3002" : "\u672A\u77E5\u6865\u63A5\u65B9\u6CD5\u3002" } }).catch(shutdown2);
      return;
    }
    const controller = new AbortController();
    const promise = Promise.resolve().then(() => handler(msg.params ?? {}, controller.signal)).then(
      (result) => ({ id: msg.id, result }),
      (error) => ({ id: msg.id, error: errorData(error) })
    ).then((reply) => writeFrame(output, reply)).catch(() => {
      void shutdown2();
    }).finally(() => active.delete(msg.id));
    active.set(msg.id, { controller, promise });
  }, () => {
    void shutdown2();
  });
  input.once("end", shutdown2);
  input.once("error", shutdown2);
  await writeFrame(output, { event: "ready", protocol: PROTOCOL, info });
  return shutdown2;
}

// src/encoding.mjs
function decodeChunk(data, encoding, eof) {
  if (encoding === "base64") return { content: data.toString("base64"), bytes: data.length };
  let length = data.length;
  if (!eof) {
    let i = 0;
    while (i < data.length) {
      const first = data[i];
      let width = 1;
      if (encoding === "utf8") width = first < 128 ? 1 : first >= 194 && first <= 223 ? 2 : first >= 224 && first <= 239 ? 3 : first >= 240 && first <= 244 ? 4 : 1;
      else if (first >= 129 && first <= 254) width = data[i + 1] >= 48 && data[i + 1] <= 57 ? 4 : 2;
      if (i + width > data.length) {
        length = i;
        break;
      }
      i += width;
    }
    ensure(length > 0 || data.length === 0, "LIMIT_TOO_SMALL", "limit \u65E0\u6CD5\u5BB9\u7EB3\u4E00\u4E2A\u5B8C\u6574\u5B57\u7B26\uFF0C\u8BF7\u4F7F\u7528\u81F3\u5C11 4 \u5B57\u8282\u3002");
  }
  try {
    return { content: new TextDecoder(encoding === "utf8" ? "utf-8" : encoding, { fatal: true }).decode(data.subarray(0, length)), bytes: length };
  } catch {
    throw Object.assign(new Error("\u6587\u672C\u7F16\u7801\u6216 offset \u65E0\u6548\u3002\u8BF7\u6307\u5B9A\u5B9E\u9645\u7F16\u7801\uFF0C\u6216\u4F7F\u7528 base64 \u8BFB\u53D6\u4E8C\u8FDB\u5236\u3002"), { code: "INVALID_ENCODING" });
  }
}

// src/worker.mjs
var transfers = /* @__PURE__ */ new Map();
var jobs = /* @__PURE__ */ new Map();
var locks = /* @__PURE__ */ new Set();
var leases = /* @__PURE__ */ new Map();
var win = process.platform === "win32";
function absolute(value) {
  text(value, "path");
  ensure(
    path.isAbsolute(value) && (!win || /^[a-z]:[\\/]|^\\\\[^\\]+\\[^\\]+/i.test(value)),
    "INVALID_PATH",
    "\u9700\u8981\u5F53\u524D\u64CD\u4F5C\u7CFB\u7EDF\u7684\u7EDD\u5BF9\u8DEF\u5F84\u3002"
  );
  if (win)
    ensure(
      !/^\\\\[?.]\\/.test(value) && !value.slice(2).includes(":"),
      "INVALID_PATH",
      "\u4E0D\u652F\u6301\u8BBE\u5907\u8DEF\u5F84\u6216 NTFS \u5907\u7528\u6570\u636E\u6D41\u3002"
    );
  return path.normalize(value);
}
async function regular(value) {
  const resolved = await fs.realpath(absolute(value));
  const stat = await fs.stat(resolved);
  ensure(stat.isFile(), "NOT_FILE", "\u53EA\u80FD\u8BFB\u53D6\u666E\u901A\u6587\u4EF6\u3002");
  return { path: resolved, stat };
}
async function targetPath(value) {
  const full = absolute(value);
  try {
    const resolved = await fs.realpath(full);
    ensure(
      (await fs.stat(resolved)).isFile(),
      "NOT_FILE",
      "\u76EE\u6807\u5FC5\u987B\u662F\u666E\u901A\u6587\u4EF6\u3002"
    );
    return resolved;
  } catch (e) {
    if (e.code !== "ENOENT") throw e;
    try {
      const s = await fs.lstat(full);
      ensure(!s.isSymbolicLink(), "DANGLING_SYMLINK", "\u76EE\u6807\u662F\u5931\u6548\u7684\u7B26\u53F7\u94FE\u63A5\u3002");
    } catch (inner) {
      if (inner.code !== "ENOENT") throw inner;
    }
    return path.join(
      await fs.realpath(path.dirname(full)),
      path.basename(full)
    );
  }
}
async function digest(file, signal) {
  const hash = createHash("sha256");
  for await (const chunk of createReadStream(file)) {
    aborted(signal);
    hash.update(chunk);
  }
  return hash.digest("hex");
}
async function checkExpected(file, expected, signal) {
  if (expected === void 0) return;
  ensure(
    expected === "absent" || /^[a-f0-9]{64}$/i.test(expected),
    "INVALID_ARGUMENT",
    "expectedHash \u5FC5\u987B\u662F SHA-256 \u6216 absent\u3002"
  );
  let exists = true, value;
  try {
    value = await digest(file, signal);
  } catch (e) {
    if (e.code !== "ENOENT") throw e;
    exists = false;
  }
  ensure(
    expected === "absent" ? !exists : value === expected.toLowerCase(),
    "FILE_CONFLICT",
    "\u76EE\u6807\u6587\u4EF6\u53D1\u751F\u53D8\u5316\uFF0C\u672A\u8986\u76D6\u3002\u8BF7\u91CD\u65B0\u8BFB\u53D6\u540E\u91CD\u8BD5\u3002"
  );
}
async function abortTransfer(id) {
  const t = transfers.get(id);
  if (!t) return;
  transfers.delete(id);
  clearTimeout(t.timer);
  await t.handle.close().catch(() => {
  });
  await fs.unlink(t.temp).catch(() => {
  });
  locks.delete(t.target);
}
async function beginTransfer(p, signal) {
  aborted(signal);
  ensure(transfers.size < 8, "BUSY", "\u6587\u4EF6\u4F20\u8F93\u6570\u91CF\u8D85\u8FC7 8\u3002");
  const target = await targetPath(p.path);
  ensure(!locks.has(target), "FILE_BUSY", "\u76EE\u6807\u6587\u4EF6\u6B63\u5728\u5199\u5165\u3002");
  locks.add(target);
  let temp, handle;
  try {
    await checkExpected(target, p.expectedHash, signal);
    const id = randomUUID();
    temp = path.join(path.dirname(target), `.dsh-wsl-${id}.tmp`);
    let mode = 384;
    try {
      mode = (await fs.stat(target)).mode & 511;
    } catch (e) {
      if (e.code !== "ENOENT") throw e;
    }
    handle = await fs.open(temp, "wx", mode);
    const timer = setTimeout(() => {
      void abortTransfer(id);
    }, 3e5);
    timer.unref();
    transfers.set(id, {
      target,
      temp,
      handle,
      size: 0,
      hash: createHash("sha256"),
      expectedHash: p.expectedHash,
      timer,
      busy: false
    });
    return { id, path: target };
  } catch (e) {
    locks.delete(target);
    await handle?.close().catch(() => {
    });
    if (temp) await fs.unlink(temp).catch(() => {
    });
    throw e;
  }
}
async function chunkTransfer(p, signal) {
  const t = transfers.get(p.id);
  ensure(t && !t.busy, "INVALID_TRANSFER", "\u4F20\u8F93\u4E0D\u5B58\u5728\u6216\u6B63\u5728\u63D0\u4EA4\u3002");
  aborted(signal);
  ensure(p.offset === t.size, "OFFSET_MISMATCH", "\u6587\u4EF6\u5206\u5757\u504F\u79FB\u4E0D\u8FDE\u7EED\u3002");
  ensure(
    typeof p.data === "string" && p.data.length <= 35e4 && /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(
      p.data
    ),
    "INVALID_ARGUMENT",
    "\u6587\u4EF6\u5757\u5FC5\u987B\u662F\u6709\u6548 Base64\uFF0C\u4E14\u4E0D\u8D85\u8FC7 256 KiB\u3002"
  );
  const data = Buffer.from(p.data, "base64");
  ensure(
    t.size + data.length <= 1024 ** 3,
    "FILE_TOO_LARGE",
    "\u5355\u6B21\u6587\u4EF6\u590D\u5236\u4E0A\u9650\u4E3A 1 GiB\u3002"
  );
  t.busy = true;
  try {
    let offset = 0;
    while (offset < data.length) {
      aborted(signal);
      const { bytesWritten } = await t.handle.write(
        data,
        offset,
        data.length - offset,
        t.size + offset
      );
      ensure(bytesWritten > 0, "WRITE_FAILED", "\u6587\u4EF6\u5199\u5165\u6CA1\u6709\u8FDB\u5C55\u3002");
      offset += bytesWritten;
    }
    t.hash.update(data);
    t.size += data.length;
    t.timer.refresh();
    return { bytes: t.size };
  } catch (e) {
    await abortTransfer(p.id);
    throw e;
  } finally {
    t.busy = false;
  }
}
async function commitTransfer(p, signal) {
  const t = transfers.get(p.id);
  ensure(t && !t.busy, "INVALID_TRANSFER", "\u4F20\u8F93\u4E0D\u5B58\u5728\u6216\u6B63\u5728\u5199\u5165\u3002");
  t.busy = true;
  try {
    aborted(signal);
    const hash = t.hash.digest("hex");
    ensure(hash === p.sha256, "HASH_MISMATCH", "\u6587\u4EF6\u6821\u9A8C\u5931\u8D25\uFF0C\u672A\u66FF\u6362\u76EE\u6807\u3002");
    await t.handle.sync();
    await t.handle.close();
    await checkExpected(t.target, t.expectedHash, signal);
    aborted(signal);
    await fs.rename(t.temp, t.target);
    transfers.delete(p.id);
    clearTimeout(t.timer);
    locks.delete(t.target);
    return { path: t.target, bytes: t.size, sha256: hash };
  } catch (e) {
    await abortTransfer(p.id);
    throw e;
  }
}
async function execution(p, signal, onOutput) {
  ensure(
    p.command !== void 0 !== (p.executable !== void 0),
    "INVALID_ARGUMENT",
    "command \u4E0E executable \u5FC5\u987B\u63D0\u4F9B\u4E14\u53EA\u63D0\u4F9B\u4E00\u4E2A\u3002"
  );
  const cwd = p.cwd ? absolute(p.cwd) : os.homedir();
  let file, args, scriptFile;
  if (p.command !== void 0) {
    text(p.command, "command", 262144);
    file = win ? powershellPath() : "/bin/bash";
    if (win && p.command.length > 8e3) {
      scriptFile = path.join(
        os.tmpdir(),
        `dsh-wsl-command-${randomUUID()}.ps1`
      );
      args = ["-NoLogo", "-NoProfile", "-NonInteractive", "-File", scriptFile];
    } else args = win ? powershellArgs(p.command) : ["-lc", p.command];
  } else {
    file = text(p.executable, "executable");
    args = p.args ?? [];
  }
  const env = { ...process.env };
  delete env.ELECTRON_RUN_AS_NODE;
  if (p.env !== void 0) {
    ensure(
      p.env && typeof p.env === "object" && !Array.isArray(p.env) && Object.keys(p.env).length <= 64,
      "INVALID_ARGUMENT",
      "env \u5FC5\u987B\u662F\u81F3\u591A 64 \u9879\u7684\u5BF9\u8C61\u3002"
    );
    for (const [k, v] of Object.entries(p.env)) {
      ensure(
        /^[A-Za-z_][A-Za-z0-9_]*$/.test(k) && typeof v === "string" && !v.includes("\0"),
        "INVALID_ARGUMENT",
        "\u73AF\u5883\u53D8\u91CF\u65E0\u6548\u3002"
      );
      env[k] = v;
    }
  }
  const timeoutMs = integer(p.timeoutMs, 12e4, 0, 864e5, "timeoutMs");
  try {
    if (scriptFile)
      await fs.writeFile(
        scriptFile,
        "\uFEFF$ErrorActionPreference='Stop';[Console]::OutputEncoding=[Text.UTF8Encoding]::new($false);$OutputEncoding=[Console]::OutputEncoding;\n" + p.command,
        { flag: "wx", mode: 384 }
      );
    return await runProcess(file, args, {
      cwd,
      env,
      signal,
      timeoutMs,
      maxOutputBytes: p.maxOutputBytes,
      stdin: p.stdin,
      onOutput
    });
  } finally {
    if (scriptFile) await fs.unlink(scriptFile).catch(() => {
    });
  }
}
async function windowsAction(p, signal) {
  ensure(win, "WRONG_HOST", "\u8BE5\u64CD\u4F5C\u5FC5\u987B\u7531 Windows \u5DE5\u4F5C\u8FDB\u7A0B\u6267\u884C\u3002");
  if (p.action === "open") {
    const target = text(p.target, "target");
    let value = target;
    if (/^https?:\/\//i.test(target)) {
      const u = new URL(target);
      ensure(
        !u.username && !u.password,
        "INVALID_URL",
        "URL \u4E0D\u80FD\u5305\u542B\u767B\u5F55\u51ED\u636E\u3002"
      );
      value = u.href;
    } else {
      value = absolute(target);
      await fs.access(value);
    }
    return runProcess(
      powershellPath(),
      powershellArgs(`Start-Process -FilePath ${psLiteral(value)}`),
      { signal, timeoutMs: 15e3 }
    );
  }
  if (p.action === "clipboard_get") {
    const r = await runProcess(
      powershellPath(),
      powershellArgs("[Console]::Write((Get-Clipboard -Raw))"),
      { signal, timeoutMs: 1e4, maxOutputBytes: 262144 }
    );
    ensure(
      r.exitCode === 0,
      "CLIPBOARD_FAILED",
      r.stderr || "\u8BFB\u53D6\u526A\u8D34\u677F\u5931\u8D25\u3002"
    );
    return { text: r.stdout, truncated: r.truncated };
  }
  if (p.action === "clipboard_set") {
    ensure(
      typeof p.text === "string" && Buffer.byteLength(p.text) <= 262144,
      "INVALID_ARGUMENT",
      "\u526A\u8D34\u677F\u6587\u672C\u4E0D\u80FD\u8D85\u8FC7 256 KiB\u3002"
    );
    const encoded = Buffer.from(p.text).toString("base64");
    const r = await runProcess(
      powershellPath(),
      powershellArgs(
        "Set-Clipboard -Value ([Text.Encoding]::UTF8.GetString([Convert]::FromBase64String([Console]::In.ReadToEnd())))"
      ),
      { signal, timeoutMs: 1e4, stdin: encoded }
    );
    ensure(
      r.exitCode === 0,
      "CLIPBOARD_FAILED",
      r.stderr || "\u5199\u5165\u526A\u8D34\u677F\u5931\u8D25\u3002"
    );
    return { bytes: Buffer.byteLength(p.text) };
  }
  throw Object.assign(new Error("\u672A\u77E5 Windows \u64CD\u4F5C\u3002"), {
    code: "INVALID_ARGUMENT"
  });
}
var handlers = {
  "lease.acquire": async (p) => {
    const file = absolute(p.path);
    let handle;
    try {
      handle = await fs.open(file, "wx", 384);
    } catch (e) {
      if (e.code === "EEXIST")
        throw Object.assign(
          new Error(`\u53E6\u4E00\u4E2A\u542F\u52A8\u5668\u6B63\u5728\u4F7F\u7528\u6B64\u73AF\u5883\uFF1A${file}\u3002`),
          { code: "RUNTIME_BUSY" }
        );
      throw e;
    }
    const id = randomUUID();
    leases.set(id, { file, handle });
    await handle.writeFile(
      JSON.stringify({ pid: process.pid, startedAt: Date.now() })
    );
    return { id };
  },
  "lease.release": async (p) => {
    const lease = leases.get(p.id);
    if (!lease) return { released: true };
    leases.delete(p.id);
    await lease.handle.close();
    await fs.unlink(lease.file).catch((e) => {
      if (e.code !== "ENOENT") throw e;
    });
    return { released: true };
  },
  ping: async () => ({
    platform: process.platform,
    pid: process.pid,
    node: process.version,
    user: os.userInfo().username,
    home: os.homedir(),
    distro: process.env.WSL_DISTRO_NAME ?? null,
    arch: process.arch,
    uptime: process.uptime()
  }),
  "directory.resolve": async (p, signal) => {
    aborted(signal);
    const resolved = await fs.realpath(absolute(p.path));
    const stat = await fs.stat(resolved);
    ensure(stat.isDirectory(), "ENOTDIR", "\u8FD9\u4E2A\u8DEF\u5F84\u6307\u5411\u6587\u4EF6\uFF0C\u8BF7\u9009\u62E9\u6587\u4EF6\u5939\u3002");
    const dir = await fs.opendir(resolved);
    await dir.close();
    const filesystem = await fs.statfs(resolved).catch(() => null);
    const storage = win ? "windows" : filesystem?.type === 16914839 ? "windows-mount" : [61267, 16914836].includes(filesystem?.type) ? "linux" : "other";
    return { path: resolved, storage };
  },
  exec: (p, signal) => execution(p, signal),
  "path.convert": async (p, signal) => {
    ensure(!win, "WRONG_HOST", "\u8DEF\u5F84\u8F6C\u6362\u5728 WSL \u4E2D\u6267\u884C\u3002");
    const direction = p.direction ?? "linux";
    ensure(
      ["linux", "windows"].includes(direction),
      "INVALID_ARGUMENT",
      "direction \u5FC5\u987B\u662F linux \u6216 windows\u3002"
    );
    const r = await runProcess(
      "wslpath",
      [direction === "linux" ? "-u" : "-w", "-a", text(p.path, "path")],
      { signal, timeoutMs: 1e4 }
    );
    ensure(
      r.exitCode === 0 && !r.timedOut,
      "PATH_CONVERSION_FAILED",
      r.stderr || "wslpath \u8F6C\u6362\u5931\u8D25\u3002"
    );
    return { path: r.stdout.replace(/[\r\n]+$/, "") };
  },
  "file.stat": async (p, signal) => {
    const item = await regular(p.path);
    return {
      path: item.path,
      bytes: item.stat.size,
      mtimeMs: item.stat.mtimeMs,
      ...p.hash ? { sha256: await digest(item.path, signal) } : {}
    };
  },
  "file.list": async (p, signal) => {
    const dir = await fs.opendir(absolute(p.path));
    const entries = [];
    const offset = integer(p.offset, 0, 0, 1e6, "offset"), limit = integer(p.limit, 200, 1, 1e3, "limit");
    let index = 0, nextOffset = null;
    for await (const entry of dir) {
      aborted(signal);
      if (!p.hidden && entry.name.startsWith(".")) continue;
      if (index++ < offset) continue;
      if (entries.length === limit) {
        nextOffset = offset + limit;
        break;
      }
      entries.push({
        name: entry.name,
        type: entry.isDirectory() ? "directory" : entry.isSymbolicLink() ? "symlink" : entry.isFile() ? "file" : "other"
      });
    }
    return { path: p.path, entries, nextOffset };
  },
  "file.read": async (p, signal) => {
    aborted(signal);
    const item = await regular(p.path);
    const offset = integer(p.offset, 0, 0, Number.MAX_SAFE_INTEGER, "offset"), limit = integer(p.limit, 65536, 1, 262144, "limit");
    const handle = await fs.open(item.path, "r");
    try {
      const buffer = Buffer.alloc(
        Math.min(limit, Math.max(0, item.stat.size - offset))
      );
      const { bytesRead } = await handle.read(buffer, 0, buffer.length, offset);
      aborted(signal);
      const data = buffer.subarray(0, bytesRead);
      const encoding = p.encoding ?? "utf8";
      ensure(
        ["utf8", "gb18030", "base64"].includes(encoding),
        "INVALID_ARGUMENT",
        "encoding \u5FC5\u987B\u662F utf8\u3001gb18030 \u6216 base64\u3002"
      );
      const decoded = decodeChunk(
        data,
        encoding,
        offset + bytesRead >= item.stat.size
      );
      return {
        path: item.path,
        ...decoded,
        encoding,
        nextOffset: offset + decoded.bytes,
        totalBytes: item.stat.size,
        eof: offset + decoded.bytes >= item.stat.size,
        mtimeMs: item.stat.mtimeMs
      };
    } finally {
      await handle.close();
    }
  },
  "file.write": async (p, signal) => {
    ensure(
      typeof p.content === "string" && Buffer.byteLength(p.content) <= 524288,
      "INVALID_ARGUMENT",
      "\u6587\u672C\u5199\u5165\u4E0A\u9650\u4E3A 512 KiB\u3002"
    );
    const data = Buffer.from(p.content);
    const t = await beginTransfer(p, signal);
    try {
      for (let i = 0; i < data.length; i += 262144)
        await chunkTransfer(
          {
            id: t.id,
            offset: i,
            data: data.subarray(i, i + 262144).toString("base64")
          },
          signal
        );
      return await commitTransfer(
        { id: t.id, sha256: createHash("sha256").update(data).digest("hex") },
        signal
      );
    } catch (e) {
      await abortTransfer(t.id);
      throw e;
    }
  },
  "transfer.begin": beginTransfer,
  "transfer.chunk": chunkTransfer,
  "transfer.commit": commitTransfer,
  "transfer.abort": async (p) => {
    await abortTransfer(p.id);
    return { aborted: true };
  },
  "job.start": async (p) => {
    for (const [id2, job2] of jobs)
      if (job2.finishedAt && Date.now() - job2.finishedAt > 3e5)
        jobs.delete(id2);
    ensure(
      jobs.size < 32,
      "BUSY",
      "\u540E\u53F0\u4EFB\u52A1\u8FBE\u5230 32 \u4E2A\uFF0C\u8BF7\u5220\u9664\u5DF2\u7ED3\u675F\u4EFB\u52A1\u540E\u91CD\u8BD5\u3002"
    );
    const id = randomUUID(), controller = new AbortController();
    const job = {
      id,
      controller,
      startedAt: Date.now(),
      status: "running",
      stdout: "",
      stderr: ""
    };
    jobs.set(id, job);
    job.promise = execution(p, controller.signal, (key, chunk) => {
      job[key] = (job[key] + chunk.toString("utf8")).slice(-32768);
    }).then(
      (result) => {
        job.result = result;
        job.status = result.cancelled ? "cancelled" : result.timedOut ? "timed-out" : result.exitCode === 0 ? "completed" : "failed";
      },
      (error) => {
        job.error = errorData(error);
        job.status = "failed";
      }
    ).finally(() => {
      job.finishedAt = Date.now();
    });
    return { id, status: "running" };
  },
  "job.status": async (p) => {
    const j = jobs.get(p.id);
    ensure(j, "JOB_NOT_FOUND", "\u4EFB\u52A1\u4E0D\u5B58\u5728\uFF0C\u8FDE\u63A5\u53EF\u80FD\u5DF2\u91CD\u5EFA\u3002");
    return {
      id: j.id,
      status: j.status,
      startedAt: j.startedAt,
      stdout: j.stdout,
      stderr: j.stderr,
      result: j.result ?? null,
      error: j.error ?? null
    };
  },
  "job.cancel": async (p) => {
    const j = jobs.get(p.id);
    ensure(j, "JOB_NOT_FOUND", "\u4EFB\u52A1\u4E0D\u5B58\u5728\u3002");
    j.controller.abort();
    await j.promise;
    return { id: j.id, status: j.status };
  },
  "job.forget": async (p) => {
    const j = jobs.get(p.id);
    ensure(
      j && j.status !== "running",
      "JOB_RUNNING",
      "\u53EA\u80FD\u79FB\u9664\u5DF2\u7ECF\u7ED3\u675F\u7684\u4EFB\u52A1\u3002"
    );
    jobs.delete(p.id);
    return { removed: true };
  },
  "windows.action": windowsAction
};
var shutdown = await serve(handlers, {
  info: await handlers.ping(),
  dispose: async () => {
    for (const j of jobs.values()) j.controller.abort();
    await Promise.allSettled([...jobs.values()].map((j) => j.promise));
    await Promise.allSettled([...transfers.keys()].map(abortTransfer));
    await Promise.allSettled(
      [...leases.keys()].map((id) => handlers["lease.release"]({ id }))
    );
  }
});
for (const event of ["SIGINT", "SIGTERM", "SIGHUP"])
  process.once(event, () => {
    void shutdown().finally(() => process.exit(0));
  });
