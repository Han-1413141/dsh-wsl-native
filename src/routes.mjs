import { randomBytes, randomUUID, timingSafeEqual } from "node:crypto";
import { NativeLauncher } from "./launcher.mjs";
import { BridgeError, ensure, errorData } from "./errors.mjs";
import { environmentKey } from "./service.mjs";
import { handoffUrl, appOrigin } from "./handoff.mjs";
import { signHandoff, verifyHandoff } from "./handoff-auth.mjs";
import { ProfileInheritance } from "../lib/inheritance.mjs";
export const PREFIX = "/dsh-wsl-native";

export function trusted(req, port) {
  try {
    const host = req.headers.host;
    if (typeof host !== "string") return false;
    const u = new URL(`http://${host}`);
    if (
      !["127.0.0.1", "localhost", "[::1]"].includes(u.hostname) ||
      u.port !== String(port) ||
      u.username ||
      u.password ||
      u.pathname !== "/"
    )
      return false;
    const origin = req.headers.origin;
    if (origin !== undefined && origin !== u.origin) return false;
    if (
      req.headers["sec-fetch-site"] &&
      req.headers["sec-fetch-site"] !== "same-origin" &&
      req.headers["sec-fetch-site"] !== "none"
    )
      return false;
    return true;
  } catch {
    return false;
  }
}
async function jsonBody(req) {
  ensure(
    req.headers["content-type"]?.split(";")[0] === "application/json",
    "CONTENT_TYPE",
    "需要 application/json。",
  );
  let length = 0;
  const chunks = [];
  for await (const c of req) {
    length += c.length;
    ensure(length <= 16384, "BODY_TOO_LARGE", "请求体过大。");
    chunks.push(c);
  }
  try {
    const value = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    ensure(
      value && typeof value === "object" && !Array.isArray(value),
      "INVALID_JSON",
      "需要 JSON 对象。",
    );
    return value;
  } catch {
    throw new BridgeError("INVALID_JSON", "请求 JSON 无效。");
  }
}
function reply(res, status, data) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
  });
  res.end(JSON.stringify(data));
}
export function createController(
  service,
  { createLauncher = (scoped) => new NativeLauncher(scoped) } = {},
) {
  const environments = new Map(),
    handoffs = new Map();
  let closed = false;
  function environment(settings) {
    const key = environmentKey(settings);
    let entry = environments.get(key);
    if (!entry) {
      entry = {
        settings: { ...settings },
        launcher: createLauncher(service.scope(settings)),
        operation: null,
        handoff: null,
        starting: false,
      };
      environments.set(key, entry);
    }
    entry.settings = { ...settings };
    return entry;
  }
  function snapshot(entry, settings = entry.settings) {
    const running = entry.launcher.running;
    return {
      settings: entry.settings,
      running: running
        ? {
            ...running,
            openUrl: handoffUrl(
              running.url,
              signHandoff(
                {
                  id: randomUUID(),
                  settings,
                  parentOrigin: entry.parentOrigin,
                },
                entry.launcher.handoffSecret,
              ),
            ),
          }
        : null,
      progress: entry.launcher.progress,
      preparing: !!entry.launcher.preparing,
      starting: entry.starting,
    };
  }
  async function selected(p, signal) {
    const result = await service.switchEnvironment(
      { distro: p.distro, user: p.user, directory: p.directory ?? p.cwd },
      { signal },
    );
    return { ...result, entry: environment(result.settings) };
  }
  return {
    async close() {
      closed = true;
      await Promise.allSettled(
        [...environments.values()].map(async (entry) => {
          await entry.launcher.close();
          await entry.operation;
        }),
      );
    },
    async dispatch(route, p = {}, signal) {
      ensure(!closed, "CONNECTION_CLOSED", "插件已停止。");
      ensure(
        p &&
          typeof p === "object" &&
          !Array.isArray(p) &&
          Buffer.byteLength(JSON.stringify(p)) <= 16384,
        "INVALID_ARGUMENT",
        "请求必须是至多 16 KiB 的对象。",
      );
      route = route.replace(/^\//, "");
      if (route === "status") {
        const status = await service.status();
        await Promise.all(
          [...environments.values()].map((entry) =>
            entry.launcher.getRunning(),
          ),
        );
        const active = environments.get(environmentKey(status.settings));
        return {
          ...status,
          parentOrigin: appOrigin(process.env.DSH_WSL_PARENT_ORIGIN),
          launchDirectory: process.env.DSH_WSL_DIRECTORY || null,
          native: {
            inheritance: await new ProfileInheritance(service).status(),
            ...(active
              ? snapshot(active, status.settings)
              : {
                  running: null,
                  progress: { phase: "idle", text: "" },
                  preparing: false,
                  starting: false,
                }),
            instances: [...environments.values()].map((entry) =>
              snapshot(entry),
            ),
          },
          handoffs: [...handoffs.values()],
        };
      }
      if (route === "settings")
        return (await service.switchEnvironment(p, { signal })).settings;
      if (route === "environment/switch")
        return service.switchEnvironment(p, { signal });
      if (route === "environment/adopt") {
        ensure(
          verifyHandoff(p, process.env.DSH_WSL_HANDOFF_SECRET),
          "HANDOFF_INVALID",
          "切换链接已过期或无效，请从 Windows 面板重新进入。",
        );
        return service.switchEnvironment(p, { signal });
      }
      if (route === "connect")
        return service.ping(p.target ?? "wsl", {
          distro: p.distro,
          user: p.user,
          signal,
        });
      if (route === "disconnect") {
        ensure(
          ![...environments.values()].some((entry) => entry.operation),
          "SETUP_BUSY",
          "准备或启动过程中不能断开连接。",
        );
        await Promise.all(
          [...environments.values()].map((entry) => entry.launcher.stop()),
        );
        await service.pool.disconnect();
        service.jobs.clear();
        handoffs.clear();
        return { disconnected: true };
      }
      if (route === "browse")
        return service.files(
          "wsl",
          "list",
          { path: p.path, offset: p.offset, limit: 200, hidden: p.hidden },
          { distro: p.distro, user: p.user, signal },
        );
      if (route === "open")
        return service.windows(
          { action: "open", target: p.path },
          { distro: p.distro, user: p.user, signal },
        );
      if (route === "native/enter") {
        ensure(
          process.platform === "win32",
          "WRONG_HOST",
          "请在 Windows DSH 中进入 Linux 环境。",
        );
        ensure(
          !p.parentOrigin || appOrigin(p.parentOrigin),
          "INVALID_ORIGIN",
          "返回地址必须是本机 DSH 的地址。",
        );
        const { settings, entry } = await selected(p, signal);
        entry.parentOrigin =
          appOrigin(p.parentOrigin) || entry.parentOrigin || null;
        if (entry.operation) {
          ensure(
            entry.handoff &&
              entry.handoff.settings.directory === settings.directory,
            "START_BUSY",
            "这个环境正在启动，请稍候。",
          );
          return { id: entry.handoff.id, settings };
        }
        const handoff = {
          id: randomUUID(),
          settings,
          parentOrigin: appOrigin(p.parentOrigin),
          state: "preparing",
          startedAt: Date.now(),
        };
        entry.handoff = handoff;
        handoffs.set(handoff.id, handoff);
        // A refresh or tab switch must not cancel installation. The plugin lifetime owns it.
        entry.operation = (async () => {
          try {
            let running = await entry.launcher.getRunning();
            if (!running) {
              await entry.launcher.prepare({ distro: settings.distro });
              handoff.state = "starting";
              entry.starting = true;
              running = await entry.launcher.start({
                distro: settings.distro,
                cwd: settings.directory,
                parentOrigin: handoff.parentOrigin,
              });
            }
            handoff.url = handoffUrl(
              running.url,
              signHandoff(handoff, entry.launcher.handoffSecret),
            );
            handoff.state = "ready";
            handoff.readyAt = Date.now();
          } catch (e) {
            handoff.state = "failed";
            handoff.error = e.message;
          } finally {
            entry.starting = false;
            entry.operation = null;
          }
        })();
        for (const [id, item] of handoffs)
          if (
            handoffs.size > 16 &&
            ["ready", "failed"].includes(item.state) &&
            id !== handoff.id
          )
            handoffs.delete(id);
        return { id: handoff.id, settings };
      }
      if (route === "native/inheritance") {
        const { entry } = await selected(p, signal);
        ensure(!entry.operation, 'SETUP_BUSY', '环境正在准备，完成后再调整继承选项。');
        return entry.launcher.inheritance.configure(p.options);
      }
      if (route === "native/prepare") {
        const { settings, entry } = await selected(p, signal);
        ensure(
          !entry.operation && !(await entry.launcher.getRunning()),
          "SETUP_BUSY",
          "请在该 Linux DSH 停止后准备环境。",
        );
        entry.operation = entry.launcher
          .prepare({ distro: settings.distro })
          .catch(() => {})
          .finally(() => {
            entry.operation = null;
          });
        return { started: true };
      }
      if (route === "native/start") {
        const { settings, entry } = await selected(p, signal);
        ensure(!entry.operation, "START_BUSY", "启动或准备正在进行。");
        entry.starting = true;
        entry.operation = entry.launcher.start({
          distro: settings.distro,
          cwd: settings.directory,
          port: p.port ?? 0,
          signal,
          parentOrigin: p.parentOrigin,
        });
        try {
          return await entry.operation;
        } finally {
          entry.starting = false;
          entry.operation = null;
        }
      }
      if (route === "native/stop") {
        const options = await service.options(p),
          entry = environments.get(environmentKey(options));
        if (!entry) return { stopped: true };
        ensure(!entry.operation, "START_BUSY", "启动或准备正在进行。");
        return entry.launcher.stop();
      }
      throw new BridgeError("NOT_FOUND", "未找到接口。");
    },
  };
}
// Exact /api routes use DSH's authenticated browser and Desktop carriers.
// Dedicated RPC channels require a webServer and are not carrier-neutral.
export function registerControlRoutes(connection, controller) {
  const endpoints = [
    "status",
    "settings",
    "environment/switch",
    "environment/adopt",
    "connect",
    "disconnect",
    "browse",
    "open",
    "native/enter",
    "native/inheritance",
    "native/prepare",
    "native/start",
    "native/stop",
  ];
  const removers = endpoints.map((endpoint) =>
    connection.fetch.register({
      path: `/api/dsh-wsl-native/${endpoint}`,
      methods: ["POST"],
      requestBody: "buffered",
      async fetch(request) {
        let rpcId = "invalid-request";
        try {
          ensure(
            request.headers.get("content-type")?.split(";")[0] ===
              "application/json",
            "CONTENT_TYPE",
            "需要 application/json。",
          );
          const body = await request.text();
          ensure(
            Buffer.byteLength(body) <= 17000,
            "BODY_TOO_LARGE",
            "请求体过大。",
          );
          const p = JSON.parse(body);
          ensure(
            p?.type === "client-request" &&
              typeof p.rpcId === "string" &&
              p.rpcId.length <= 200 &&
              p.method === `dsh-wsl-native/${endpoint}`,
            "INVALID_ARGUMENT",
            "RPC 请求格式无效。",
          );
          rpcId = p.rpcId;
          const value = await controller.dispatch(
            endpoint,
            p.payload,
            request.signal,
          );
          return Response.json({
            type: "server-response",
            rpcId,
            result: { ok: true, value },
          });
        } catch (e) {
          return Response.json({
            type: "server-response",
            rpcId,
            result: {
              ok: false,
              error: {
                code: e.code || "BRIDGE_ERROR",
                message: e.message,
                details: {},
              },
            },
          });
        }
      },
    }),
  );
  return async () => {
    for (const remove of removers.reverse()) await remove();
  };
}
export function registerRoutes(
  server,
  service,
  connection,
  controller = createController(service),
) {
  const token = randomBytes(32).toString("hex");
  return server.register({
    kind: "prefix",
    path: PREFIX,
    handler: async (req, res) => {
      try {
        if (!trusted(req, server.port)) {
          reply(res, 403, {
            error: { code: "FORBIDDEN", message: "只接受本机同源请求。" },
          });
          return;
        }
        const rejection =
          connection?.requestRejection?.(req) ??
          (connection?.requestRejection ? undefined : 401);
        if (rejection) {
          reply(res, rejection, {
            error: {
              code: "AUTH_REQUIRED",
              message: "请先通过 DSH 启动链接登录。",
            },
          });
          return;
        }
        const url = new URL(req.url, `http://127.0.0.1:${server.port}`);
        const route = url.pathname.slice(PREFIX.length);
        if (req.method === "GET" && route === "/status") {
          reply(res, 200, {
            ...(await controller.dispatch("status")),
            csrf: token,
          });
          return;
        }
        if (req.method !== "POST") {
          reply(res, 404, {
            error: { code: "NOT_FOUND", message: "未找到接口。" },
          });
          return;
        }
        const supplied = req.headers["x-dsh-wsl-token"];
        ensure(
          typeof supplied === "string" &&
            supplied.length === token.length &&
            timingSafeEqual(Buffer.from(supplied), Buffer.from(token)),
          "FORBIDDEN",
          "请刷新面板后重试。",
        );
        const p = await jsonBody(req);
        const result = await controller.dispatch(route, p);
        reply(res, 200, result);
      } catch (e) {
        if (!res.headersSent)
          reply(
            res,
            e.code === "FORBIDDEN"
              ? 403
              : e.code === "BODY_TOO_LARGE"
                ? 413
                : 400,
            { error: errorData(e) },
          );
      }
    },
  });
}
