import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { createHash, randomUUID } from "node:crypto";
import { ConnectionPool, listDistros } from "./connector.mjs";
import { ensure, aborted, integer } from "./errors.mjs";
import { parseWslUnc, linuxPath, distroName } from "./paths.mjs";

export const environmentKey = ({ distro = "", user = "" }) =>
  JSON.stringify([distro, user]);

export class WslService {
  constructor(config = {}, dependencies = {}) {
    this.config = config;
    this.pool = dependencies.pool ?? new ConnectionPool(config);
    this.ownsPool = !dependencies.pool;
    this.listDistros = dependencies.listDistros ?? listDistros;
    this.settingsFile =
      config.settingsFile ??
      path.join(
        process.env.DSH_HOME || path.join(os.homedir(), ".dsh"),
        "dsh-wsl-native",
        "settings.json",
      );
    this.settings = dependencies.settings ?? {
      distro: config.distro ?? process.env.WSL_DISTRO_NAME ?? "",
      user: config.user ?? "",
      directory: config.directory ?? "",
    };
    this.profiles = [];
    this.jobs = dependencies.jobs ?? new Map();
    this.changes = Promise.resolve();
    this.initialized = dependencies.settings
      ? Promise.resolve()
      : this.loadSettings();
    this.listCache = null;
    this.pathCache = new Map();
  }
  async loadSettings() {
    try {
      const data = JSON.parse(await fs.readFile(this.settingsFile, "utf8"));
      this.settings = this.validateSettings({ ...this.settings, ...data });
      const profiles = Array.isArray(data.profiles)
        ? data.profiles
        : [this.settings];
      const seen = new Set();
      for (const item of profiles.slice(0, 32)) {
        try {
          const settings = this.validateSettings(item),
            key = environmentKey(settings);
          if (seen.has(key)) continue;
          seen.add(key);
          const recentDirectories = [
            ...new Set([
              settings.directory,
              ...(Array.isArray(item.recentDirectories)
                ? item.recentDirectories
                : []),
            ]),
          ]
            .filter(
              (p) =>
                typeof p === "string" &&
                p.startsWith("/") &&
                !/[\x00-\x1f]/.test(p),
            )
            .slice(0, 10);
          this.profiles.push({
            ...settings,
            recentDirectories,
            ...(["linux", "windows-mount", "other"].includes(item.storage)
              ? { storage: item.storage }
              : {}),
          });
        } catch {
          /* A damaged history item must not hide the usable active environment. */
        }
      }
    } catch (e) {
      if (e.code !== "ENOENT")
        this.settingsError = `设置文件无法读取：${e.message}`;
    }
  }
  validateSettings(p) {
    const distro = p.distro || "";
    if (distro) distroName(distro);
    const user = p.user || "";
    ensure(
      typeof user === "string" &&
        user.length <= 128 &&
        !/[\x00-\x1f]/.test(user) &&
        !user.startsWith("-"),
      "INVALID_ARGUMENT",
      "Linux 用户名无效。",
    );
    const directory = p.directory ? linuxPath(p.directory) : "";
    return { distro, user, directory };
  }
  profile(p) {
    return this.profiles.find(
      (item) => environmentKey(item) === environmentKey(p),
    );
  }
  // A launcher owns an immutable identity while sharing the warm transport pool.
  scope(settings) {
    return new WslService(this.config, {
      pool: this.pool,
      settings: Object.freeze({ ...settings }),
      jobs: this.jobs,
      listDistros: () => this.distros(),
    });
  }
  async resolveEnvironment(p = {}, signal) {
    await this.initialized;
    const requested = this.validateSettings({
      distro: p.distro ?? this.settings.distro,
      user:
        p.user ??
        (p.distro && p.distro !== this.settings.distro
          ? this.profiles.find(item => item.distro === p.distro)?.user || ''
          : this.settings.user),
    });
    const options = await this.options({ ...requested, signal });
    ensure(
      (await this.distros()).some((d) => d.name === options.distro),
      "DISTRO_NOT_FOUND",
      "选择的发行版未安装。",
    );
    const info = await this.ping("wsl", options);
    const identity = {
      distro: options.distro,
      user: info.user || options.user || "",
    };
    const profile = this.profile(identity) ?? this.profile(requested);
    const input =
      p.directory ??
      profile?.directory ??
      (options.distro === this.settings.distro &&
      requested.user === this.settings.user
        ? this.settings.directory
        : "") ??
      "";
    const directory = input
      ? await this.normalized("wsl", input, { ...options, ...identity })
      : info.home;
    const resolved = await this.call(
      "wsl",
      "directory.resolve",
      { path: directory },
      { ...options, ...identity },
    );
    aborted(signal);
    return {
      settings: { ...identity, directory: resolved.path },
      info,
      storage: resolved.storage,
    };
  }
  async switchEnvironment(p, { signal } = {}) {
    const change = this.changes.then(async () => {
      const result = await this.resolveEnvironment(p, signal),
        next = result.settings;
      const old = this.profile(next);
      const profiles = [
        {
          ...next,
          storage: result.storage,
          recentDirectories: [
            ...new Set([next.directory, ...(old?.recentDirectories ?? [])]),
          ].slice(0, 10),
        },
        ...this.profiles.filter(
          (item) => environmentKey(item) !== environmentKey(next),
        ),
      ].slice(0, 32);
      await fs.mkdir(path.dirname(this.settingsFile), { recursive: true });
      const temp = this.settingsFile + `.${randomUUID()}.tmp`;
      try {
        await fs.writeFile(
          temp,
          JSON.stringify({ ...next, profiles }, null, 2) + "\n",
          { mode: 0o600, flag: "wx" },
        );
        aborted(signal);
        await fs.rename(temp, this.settingsFile);
      } finally {
        await fs.unlink(temp).catch(() => {});
      }
      // Commit only after connection, directory resolution and persistence succeeded.
      this.settings = next;
      this.profiles = profiles;
      this.settingsError = undefined;
      return result;
    });
    this.changes = change.catch(() => {});
    return change;
  }
  async saveSettings(p) {
    return (await this.switchEnvironment(p)).settings;
  }
  async distros(refresh = false) {
    if (!refresh && this.listCache && Date.now() - this.listCache.at < 30000)
      return this.listCache.value;
    const value = await this.listDistros();
    this.listCache = { value, at: Date.now() };
    return value;
  }
  async options(p = {}) {
    await this.initialized;
    const current = this.settings;
    const distro =
      p.distro ||
      current.distro ||
      (await this.distros()).find((d) => d.isDefault)?.name ||
      (await this.distros())[0]?.name;
    ensure(
      distro,
      "NO_DISTRO",
      "没有可用的 WSL 发行版。请先安装或选择发行版。",
    );
    const user =
      p.user ??
      (distro === current.distro || !current.distro ? current.user : this.profiles.find(item => item.distro === distro)?.user || '');
    this.validateSettings({ distro, user });
    const directory =
      p.directory ??
      (environmentKey({ distro, user }) === environmentKey(current)
        ? current.directory
        : this.profile({ distro, user })?.directory) ??
      "";
    return {
      distro,
      user,
      directory,
      signal: p.signal,
      timeoutMs: p.rpcTimeoutMs ?? p.timeoutMs,
    };
  }
  async call(target, method, params = {}, options = {}) {
    ensure(
      ["wsl", "windows", "local"].includes(target),
      "INVALID_TARGET",
      "目标必须是 wsl 或 windows。",
    );
    const remote =
      target === "wsl"
        ? await this.options(options)
        : { ...options, timeoutMs: options.rpcTimeoutMs ?? options.timeoutMs };
    return this.pool.call(target, method, params, remote);
  }
  async status() {
    await this.initialized;
    let distros = [],
      error = this.settingsError ?? null;
    try {
      distros = await this.distros();
    } catch (e) {
      error = e.message;
    }
    return {
      version: "0.6.0",
      host: process.platform,
      mode:
        process.platform === "win32"
          ? "windows-host"
          : process.env.WSL_DISTRO_NAME
            ? "wsl-host"
            : "unsupported",
      node: process.version,
      settings: this.settings,
      profiles: this.profiles,
      distros,
      pool: this.pool.snapshot(),
      error,
    };
  }
  async ping(target = "wsl", p = {}) {
    return this.call(target, "ping", {}, p);
  }
  async convert(value, direction, p = {}) {
    ensure(
      ["linux", "windows"].includes(direction),
      "INVALID_ARGUMENT",
      "direction 必须是 linux 或 windows。",
    );
    const opts = await this.options(p),
      unc = parseWslUnc(value);
    if (unc)
      ensure(
        unc.distro.toLowerCase() === opts.distro.toLowerCase(),
        "DISTRO_MISMATCH",
        "路径所属发行版与选定发行版不同。",
      );
    if (direction === "linux" && value.startsWith("/"))
      return { path: linuxPath(value) };
    if (direction === "linux" && unc) return { path: unc.path };
    const key = JSON.stringify([opts.distro, opts.user, value, direction]);
    const cached = this.pathCache.get(key);
    if (cached && Date.now() - cached.at < 30000) return cached.value;
    const result = await this.pool.call(
      "wsl",
      "path.convert",
      { path: value, direction },
      opts,
    );
    if (this.pathCache.size > 256) this.pathCache.clear();
    this.pathCache.set(key, { value: result, at: Date.now() });
    return result;
  }
  async normalized(target, value, p = {}) {
    if (target === "wsl") return (await this.convert(value, "linux", p)).path;
    return value.startsWith("/")
      ? (await this.convert(value, "windows", p)).path
      : value;
  }
  async pinned(target, value, options) {
    return target === "wsl" || value?.startsWith("/")
      ? this.options(options)
      : { ...options };
  }
  async execute(target, p, options = {}) {
    const pinned = await this.pinned(target, p.cwd, options);
    integer(p.timeoutMs, 120000, 1, 86400000, "timeoutMs");
    const cwd = p.cwd
      ? await this.normalized(target, p.cwd, pinned)
      : target === "wsl"
        ? pinned.directory || undefined
        : undefined;
    return this.call(
      target,
      "exec",
      { ...p, cwd },
      { ...pinned, rpcTimeoutMs: (p.timeoutMs ?? 120000) + 10000 },
    );
  }
  async files(target, operation, p, options = {}) {
    ensure(
      ["read", "write", "list", "stat"].includes(operation),
      "INVALID_ARGUMENT",
      "文件操作必须是 read、write、list 或 stat。",
    );
    const pinned = await this.pinned(target, p.path, options);
    const normalized = await this.normalized(target, p.path, pinned);
    return this.call(
      target,
      `file.${operation}`,
      { ...p, path: normalized },
      pinned,
    );
  }
  async windows(p, options = {}) {
    const pinned = await this.pinned("windows", p.target, options);
    if (p.action === "open" && !/^https?:\/\//i.test(p.target))
      p = { ...p, target: await this.normalized("windows", p.target, pinned) };
    return this.call("windows", "windows.action", p, pinned);
  }
  async job(target, action, p, options = {}) {
    ensure(
      ["start", "status", "cancel", "forget"].includes(action),
      "INVALID_ARGUMENT",
      "未知任务操作。",
    );
    const owner = action === "start" ? null : this.jobs.get(p.id);
    if (owner)
      ensure(
        target === owner.target &&
          (!options.distro || options.distro === owner.distro) &&
          (options.user === undefined || options.user === owner.user),
        "JOB_ENVIRONMENT_MISMATCH",
        "任务属于另一个环境，请使用任务返回的 target、distro 和 user。",
      );
    const pinned = owner
      ? { ...owner, signal: options.signal }
      : await this.pinned(target, p.cwd, options);
    if (action === "start") {
      const cwd = p.cwd
        ? await this.normalized(target, p.cwd, pinned)
        : target === "wsl"
          ? pinned.directory || undefined
          : undefined;
      p = { ...p, cwd };
    }
    const result = await this.call(target, `job.${action}`, p, pinned);
    if (action === "start") {
      this.jobs.set(result.id, {
        target,
        distro: pinned.distro,
        user: pinned.user,
        directory: pinned.directory,
      });
      return { ...result, target, distro: pinned.distro, user: pinned.user };
    }
    if (action === "forget") this.jobs.delete(p.id);
    return result;
  }
  async copy({
    from,
    to,
    source,
    destination,
    expectedHash = "absent",
    distro,
    user,
    signal,
    onProgress,
  }) {
    ensure(
      ["windows", "wsl"].includes(from) && ["windows", "wsl"].includes(to),
      "INVALID_TARGET",
      "复制两端必须是 windows 或 wsl。",
    );
    const options = await this.options({ distro, user, signal });
    source = await this.normalized(from, source, options);
    destination = await this.normalized(to, destination, options);
    const before = await this.call(
      from,
      "file.stat",
      { path: source },
      options,
    );
    ensure(
      before.bytes <= 1024 ** 3,
      "FILE_TOO_LARGE",
      "文件复制上限为 1 GiB。",
    );
    const dst = await this.pool.get(
      to,
      ...(to === "wsl" ? [options.distro, options.user] : []),
    );
    const transfer = await dst.call(
      "transfer.begin",
      { path: destination, expectedHash },
      { signal },
    );
    const hash = createHash("sha256");
    let offset = 0;
    try {
      while (offset < before.bytes) {
        aborted(signal);
        const r = await this.call(
          from,
          "file.read",
          { path: source, offset, limit: 262144, encoding: "base64" },
          options,
        );
        ensure(
          r.bytes > 0 &&
            r.totalBytes === before.bytes &&
            r.mtimeMs === before.mtimeMs,
          "SOURCE_CHANGED",
          "复制期间源文件发生变化，已取消。",
        );
        hash.update(Buffer.from(r.content, "base64"));
        await dst.call(
          "transfer.chunk",
          { id: transfer.id, offset, data: r.content },
          { signal },
        );
        offset += r.bytes;
        onProgress?.({ bytes: offset, totalBytes: before.bytes });
      }
      const after = await this.call(
        from,
        "file.stat",
        { path: source },
        options,
      );
      ensure(
        after.bytes === before.bytes && after.mtimeMs === before.mtimeMs,
        "SOURCE_CHANGED",
        "复制期间源文件发生变化，已取消。",
      );
      return await dst.call(
        "transfer.commit",
        { id: transfer.id, sha256: hash.digest("hex") },
        { signal },
      );
    } catch (e) {
      await dst
        .call("transfer.abort", { id: transfer.id }, { timeoutMs: 5000 })
        .catch(() => {});
      throw e;
    }
  }
  async close() {
    if (this.ownsPool) {
      await this.changes;
      await this.pool.close();
    }
  }
}
