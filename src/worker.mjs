import fs from "node:fs/promises";
import { createReadStream } from "node:fs";
import path from "node:path";
import os from "node:os";
import { createHash, randomUUID } from "node:crypto";
import {
  runProcess,
  powershellArgs,
  powershellPath,
  psLiteral,
} from "./process.mjs";
import { serve } from "./rpc.mjs";
import { ensure, text, integer, aborted, errorData } from "./errors.mjs";
import { decodeChunk } from "./encoding.mjs";

const transfers = new Map(),
  jobs = new Map(),
  locks = new Set(),
  leases = new Map();
const win = process.platform === "win32";
function absolute(value) {
  text(value, "path");
  ensure(
    path.isAbsolute(value) &&
      (!win || /^[a-z]:[\\/]|^\\\\[^\\]+\\[^\\]+/i.test(value)),
    "INVALID_PATH",
    "需要当前操作系统的绝对路径。",
  );
  if (win)
    ensure(
      !/^\\\\[?.]\\/.test(value) && !value.slice(2).includes(":"),
      "INVALID_PATH",
      "不支持设备路径或 NTFS 备用数据流。",
    );
  return path.normalize(value);
}
async function regular(value) {
  const resolved = await fs.realpath(absolute(value));
  const stat = await fs.stat(resolved);
  ensure(stat.isFile(), "NOT_FILE", "只能读取普通文件。");
  return { path: resolved, stat };
}
async function targetPath(value) {
  const full = absolute(value);
  try {
    const resolved = await fs.realpath(full);
    ensure(
      (await fs.stat(resolved)).isFile(),
      "NOT_FILE",
      "目标必须是普通文件。",
    );
    return resolved;
  } catch (e) {
    if (e.code !== "ENOENT") throw e;
    // A dangling symlink must not be silently replaced with a regular file.
    try {
      const s = await fs.lstat(full);
      ensure(!s.isSymbolicLink(), "DANGLING_SYMLINK", "目标是失效的符号链接。");
    } catch (inner) {
      if (inner.code !== "ENOENT") throw inner;
    }
    return path.join(
      await fs.realpath(path.dirname(full)),
      path.basename(full),
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
  if (expected === undefined) return;
  ensure(
    expected === "absent" || /^[a-f0-9]{64}$/i.test(expected),
    "INVALID_ARGUMENT",
    "expectedHash 必须是 SHA-256 或 absent。",
  );
  let exists = true,
    value;
  try {
    value = await digest(file, signal);
  } catch (e) {
    if (e.code !== "ENOENT") throw e;
    exists = false;
  }
  ensure(
    expected === "absent" ? !exists : value === expected.toLowerCase(),
    "FILE_CONFLICT",
    "目标文件发生变化，未覆盖。请重新读取后重试。",
  );
}
async function abortTransfer(id) {
  const t = transfers.get(id);
  if (!t) return;
  transfers.delete(id);
  clearTimeout(t.timer);
  await t.handle.close().catch(() => {});
  await fs.unlink(t.temp).catch(() => {});
  locks.delete(t.target);
}
async function beginTransfer(p, signal) {
  aborted(signal);
  ensure(transfers.size < 8, "BUSY", "文件传输数量超过 8。");
  const target = await targetPath(p.path);
  ensure(!locks.has(target), "FILE_BUSY", "目标文件正在写入。");
  locks.add(target);
  let temp, handle;
  try {
    await checkExpected(target, p.expectedHash, signal);
    const id = randomUUID();
    temp = path.join(path.dirname(target), `.dsh-wsl-${id}.tmp`);
    let mode = 0o600;
    try {
      mode = (await fs.stat(target)).mode & 0o777;
    } catch (e) {
      if (e.code !== "ENOENT") throw e;
    }
    handle = await fs.open(temp, "wx", mode);
    const timer = setTimeout(() => {
      void abortTransfer(id);
    }, 300000);
    timer.unref();
    transfers.set(id, {
      target,
      temp,
      handle,
      size: 0,
      hash: createHash("sha256"),
      expectedHash: p.expectedHash,
      timer,
      busy: false,
    });
    return { id, path: target };
  } catch (e) {
    locks.delete(target);
    await handle?.close().catch(() => {});
    if (temp) await fs.unlink(temp).catch(() => {});
    throw e;
  }
}
async function chunkTransfer(p, signal) {
  const t = transfers.get(p.id);
  ensure(t && !t.busy, "INVALID_TRANSFER", "传输不存在或正在提交。");
  aborted(signal);
  ensure(p.offset === t.size, "OFFSET_MISMATCH", "文件分块偏移不连续。");
  ensure(
    typeof p.data === "string" &&
      p.data.length <= 350000 &&
      /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(
        p.data,
      ),
    "INVALID_ARGUMENT",
    "文件块必须是有效 Base64，且不超过 256 KiB。",
  );
  const data = Buffer.from(p.data, "base64");
  ensure(
    t.size + data.length <= 1024 ** 3,
    "FILE_TOO_LARGE",
    "单次文件复制上限为 1 GiB。",
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
        t.size + offset,
      );
      ensure(bytesWritten > 0, "WRITE_FAILED", "文件写入没有进展。");
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
  ensure(t && !t.busy, "INVALID_TRANSFER", "传输不存在或正在写入。");
  t.busy = true;
  try {
    aborted(signal);
    const hash = t.hash.digest("hex");
    ensure(hash === p.sha256, "HASH_MISMATCH", "文件校验失败，未替换目标。");
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
    (p.command !== undefined) !== (p.executable !== undefined),
    "INVALID_ARGUMENT",
    "command 与 executable 必须提供且只提供一个。",
  );
  const cwd = p.cwd ? absolute(p.cwd) : os.homedir();
  let file, args, scriptFile;
  if (p.command !== undefined) {
    text(p.command, "command", 262144);
    file = win ? powershellPath() : "/bin/bash";
    if (win && p.command.length > 8000) {
      scriptFile = path.join(
        os.tmpdir(),
        `dsh-wsl-command-${randomUUID()}.ps1`,
      );
      args = ["-NoLogo", "-NoProfile", "-NonInteractive", "-File", scriptFile];
    } else args = win ? powershellArgs(p.command) : ["-lc", p.command];
  } else {
    file = text(p.executable, "executable");
    args = p.args ?? [];
  }
  const env = { ...process.env };
  delete env.ELECTRON_RUN_AS_NODE;
  if (p.env !== undefined) {
    ensure(
      p.env &&
        typeof p.env === "object" &&
        !Array.isArray(p.env) &&
        Object.keys(p.env).length <= 64,
      "INVALID_ARGUMENT",
      "env 必须是至多 64 项的对象。",
    );
    for (const [k, v] of Object.entries(p.env)) {
      ensure(
        /^[A-Za-z_][A-Za-z0-9_]*$/.test(k) &&
          typeof v === "string" &&
          !v.includes("\0"),
        "INVALID_ARGUMENT",
        "环境变量无效。",
      );
      env[k] = v;
    }
  }
  const timeoutMs = integer(p.timeoutMs, 120000, 0, 86400000, "timeoutMs");
  try {
    if (scriptFile)
      await fs.writeFile(
        scriptFile,
        "\uFEFF" +
          "$ErrorActionPreference='Stop';[Console]::OutputEncoding=[Text.UTF8Encoding]::new($false);$OutputEncoding=[Console]::OutputEncoding;\n" +
          p.command,
        { flag: "wx", mode: 0o600 },
      );
    return await runProcess(file, args, {
      cwd,
      env,
      signal,
      timeoutMs,
      maxOutputBytes: p.maxOutputBytes,
      stdin: p.stdin,
      onOutput,
    });
  } finally {
    if (scriptFile) await fs.unlink(scriptFile).catch(() => {});
  }
}
async function windowsAction(p, signal) {
  ensure(win, "WRONG_HOST", "该操作必须由 Windows 工作进程执行。");
  if (p.action === "open") {
    const target = text(p.target, "target");
    let value = target;
    if (/^https?:\/\//i.test(target)) {
      const u = new URL(target);
      ensure(
        !u.username && !u.password,
        "INVALID_URL",
        "URL 不能包含登录凭据。",
      );
      value = u.href;
    } else {
      value = absolute(target);
      await fs.access(value);
    }
    return runProcess(
      powershellPath(),
      powershellArgs(`Start-Process -FilePath ${psLiteral(value)}`),
      { signal, timeoutMs: 15000 },
    );
  }
  if (p.action === "clipboard_get") {
    const r = await runProcess(
      powershellPath(),
      powershellArgs("[Console]::Write((Get-Clipboard -Raw))"),
      { signal, timeoutMs: 10000, maxOutputBytes: 262144 },
    );
    ensure(
      r.exitCode === 0,
      "CLIPBOARD_FAILED",
      r.stderr || "读取剪贴板失败。",
    );
    return { text: r.stdout, truncated: r.truncated };
  }
  if (p.action === "clipboard_set") {
    ensure(
      typeof p.text === "string" && Buffer.byteLength(p.text) <= 262144,
      "INVALID_ARGUMENT",
      "剪贴板文本不能超过 256 KiB。",
    );
    const encoded = Buffer.from(p.text).toString("base64");
    const r = await runProcess(
      powershellPath(),
      powershellArgs(
        "Set-Clipboard -Value ([Text.Encoding]::UTF8.GetString([Convert]::FromBase64String([Console]::In.ReadToEnd())))",
      ),
      { signal, timeoutMs: 10000, stdin: encoded },
    );
    ensure(
      r.exitCode === 0,
      "CLIPBOARD_FAILED",
      r.stderr || "写入剪贴板失败。",
    );
    return { bytes: Buffer.byteLength(p.text) };
  }
  throw Object.assign(new Error("未知 Windows 操作。"), {
    code: "INVALID_ARGUMENT",
  });
}

const handlers = {
  "lease.acquire": async (p) => {
    const file = absolute(p.path);
    let handle;
    try {
      handle = await fs.open(file, "wx", 0o600);
    } catch (e) {
      if (e.code === "EEXIST")
        throw Object.assign(
          new Error(`另一个启动器正在使用此环境：${file}。`),
          { code: "RUNTIME_BUSY" },
        );
      throw e;
    }
    const id = randomUUID();
    leases.set(id, { file, handle });
    await handle.writeFile(
      JSON.stringify({ pid: process.pid, startedAt: Date.now() }),
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
    uptime: process.uptime(),
  }),
  "directory.resolve": async (p, signal) => {
    aborted(signal);
    const resolved = await fs.realpath(absolute(p.path));
    const stat = await fs.stat(resolved);
    ensure(stat.isDirectory(), "ENOTDIR", "这个路径指向文件，请选择文件夹。");
    const dir = await fs.opendir(resolved);
    await dir.close();
    const filesystem = await fs.statfs(resolved).catch(() => null);
    // Linux V9FS_MAGIC identifies WSL's Windows-mounted 9P volumes.
    const storage = win
      ? "windows"
      : filesystem?.type === 0x01021997
        ? "windows-mount"
        : [0xef53, 0x01021994].includes(filesystem?.type)
          ? "linux"
          : "other";
    return { path: resolved, storage };
  },
  exec: (p, signal) => execution(p, signal),
  "path.convert": async (p, signal) => {
    ensure(!win, "WRONG_HOST", "路径转换在 WSL 中执行。");
    const direction = p.direction ?? "linux";
    ensure(
      ["linux", "windows"].includes(direction),
      "INVALID_ARGUMENT",
      "direction 必须是 linux 或 windows。",
    );
    const r = await runProcess(
      "wslpath",
      [direction === "linux" ? "-u" : "-w", "-a", text(p.path, "path")],
      { signal, timeoutMs: 10000 },
    );
    ensure(
      r.exitCode === 0 && !r.timedOut,
      "PATH_CONVERSION_FAILED",
      r.stderr || "wslpath 转换失败。",
    );
    return { path: r.stdout.replace(/[\r\n]+$/, "") };
  },
  "file.stat": async (p, signal) => {
    const item = await regular(p.path);
    return {
      path: item.path,
      bytes: item.stat.size,
      mtimeMs: item.stat.mtimeMs,
      ...(p.hash ? { sha256: await digest(item.path, signal) } : {}),
    };
  },
  "file.list": async (p, signal) => {
    const dir = await fs.opendir(absolute(p.path));
    const entries = [];
    const offset = integer(p.offset, 0, 0, 1000000, "offset"),
      limit = integer(p.limit, 200, 1, 1000, "limit");
    let index = 0,
      nextOffset = null;
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
        type: entry.isDirectory()
          ? "directory"
          : entry.isSymbolicLink()
            ? "symlink"
            : entry.isFile()
              ? "file"
              : "other",
      });
    }
    return { path: p.path, entries, nextOffset };
  },
  "file.read": async (p, signal) => {
    aborted(signal);
    const item = await regular(p.path);
    const offset = integer(p.offset, 0, 0, Number.MAX_SAFE_INTEGER, "offset"),
      limit = integer(p.limit, 65536, 1, 262144, "limit");
    const handle = await fs.open(item.path, "r");
    try {
      const buffer = Buffer.alloc(
        Math.min(limit, Math.max(0, item.stat.size - offset)),
      );
      const { bytesRead } = await handle.read(buffer, 0, buffer.length, offset);
      aborted(signal);
      const data = buffer.subarray(0, bytesRead);
      const encoding = p.encoding ?? "utf8";
      ensure(
        ["utf8", "gb18030", "base64"].includes(encoding),
        "INVALID_ARGUMENT",
        "encoding 必须是 utf8、gb18030 或 base64。",
      );
      const decoded = decodeChunk(
        data,
        encoding,
        offset + bytesRead >= item.stat.size,
      );
      return {
        path: item.path,
        ...decoded,
        encoding,
        nextOffset: offset + decoded.bytes,
        totalBytes: item.stat.size,
        eof: offset + decoded.bytes >= item.stat.size,
        mtimeMs: item.stat.mtimeMs,
      };
    } finally {
      await handle.close();
    }
  },
  "file.write": async (p, signal) => {
    ensure(
      typeof p.content === "string" && Buffer.byteLength(p.content) <= 524288,
      "INVALID_ARGUMENT",
      "文本写入上限为 512 KiB。",
    );
    const data = Buffer.from(p.content);
    const t = await beginTransfer(p, signal);
    try {
      for (let i = 0; i < data.length; i += 262144)
        await chunkTransfer(
          {
            id: t.id,
            offset: i,
            data: data.subarray(i, i + 262144).toString("base64"),
          },
          signal,
        );
      return await commitTransfer(
        { id: t.id, sha256: createHash("sha256").update(data).digest("hex") },
        signal,
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
    for (const [id, job] of jobs)
      if (job.finishedAt && Date.now() - job.finishedAt > 300000)
        jobs.delete(id);
    ensure(
      jobs.size < 32,
      "BUSY",
      "后台任务达到 32 个，请删除已结束任务后重试。",
    );
    const id = randomUUID(),
      controller = new AbortController();
    const job = {
      id,
      controller,
      startedAt: Date.now(),
      status: "running",
      stdout: "",
      stderr: "",
    };
    jobs.set(id, job);
    job.promise = execution(p, controller.signal, (key, chunk) => {
      job[key] = (job[key] + chunk.toString("utf8")).slice(-32768);
    })
      .then(
        (result) => {
          job.result = result;
          job.status = result.cancelled
            ? "cancelled"
            : result.timedOut
              ? "timed-out"
              : result.exitCode === 0
                ? "completed"
                : "failed";
        },
        (error) => {
          job.error = errorData(error);
          job.status = "failed";
        },
      )
      .finally(() => {
        job.finishedAt = Date.now();
      });
    return { id, status: "running" };
  },
  "job.status": async (p) => {
    const j = jobs.get(p.id);
    ensure(j, "JOB_NOT_FOUND", "任务不存在，连接可能已重建。");
    return {
      id: j.id,
      status: j.status,
      startedAt: j.startedAt,
      stdout: j.stdout,
      stderr: j.stderr,
      result: j.result ?? null,
      error: j.error ?? null,
    };
  },
  "job.cancel": async (p) => {
    const j = jobs.get(p.id);
    ensure(j, "JOB_NOT_FOUND", "任务不存在。");
    j.controller.abort();
    await j.promise;
    return { id: j.id, status: j.status };
  },
  "job.forget": async (p) => {
    const j = jobs.get(p.id);
    ensure(
      j && j.status !== "running",
      "JOB_RUNNING",
      "只能移除已经结束的任务。",
    );
    jobs.delete(p.id);
    return { removed: true };
  },
  "windows.action": windowsAction,
};

const shutdown = await serve(handlers, {
  info: await handlers.ping(),
  dispose: async () => {
    for (const j of jobs.values()) j.controller.abort();
    await Promise.allSettled([...jobs.values()].map((j) => j.promise));
    await Promise.allSettled([...transfers.keys()].map(abortTransfer));
    await Promise.allSettled(
      [...leases.keys()].map((id) => handlers["lease.release"]({ id })),
    );
  },
});
for (const event of ["SIGINT", "SIGTERM", "SIGHUP"])
  process.once(event, () => {
    void shutdown().finally(() => process.exit(0));
  });
