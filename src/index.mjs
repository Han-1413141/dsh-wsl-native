import { defineTool } from "@deepseek-ai/dsh-tools";
import { WslService } from "./service.mjs";
import { authorize } from "./policy.mjs";
import {
  createController,
  registerRoutes,
  registerControlRoutes,
} from "./routes.mjs";
import { ensure } from "./errors.mjs";

export const name = "dsh-wsl-native";
export const inject = ["tools"];
const str = (description, required = false) => ({
  type: "string",
  description,
  ...(required ? { required: true } : {}),
});
const target = {
  type: "string",
  enum: ["wsl", "windows"],
  description: "操作目标；默认 wsl。",
};
const distro = str("WSL 发行版；省略时使用面板中所选发行版。");
const user = str(
  "Linux 用户；省略时使用该环境保存的用户。跨环境任务用返回的 user。",
);
const output = {
  schema: { type: "json" },
  render: (_args, value) => [
    { type: "text", text: JSON.stringify(value, null, 2) },
  ],
};
function options(args, exec) {
  return { distro: args.distro, user: args.user, signal: exec.signal };
}

export function apply(ctx, config = {}) {
  const service = new WslService(config);
  ctx.effect(() => () => service.close());
  const register = (tool) =>
    ctx.tools.register(defineTool({ output, ...tool }));
  register({
    name: "wsl_native_status",
    description:
      "查看 Windows/WSL 双宿主状态、发行版和已连接进程；不会启动发行版。",
    parameters: {},
    isConcurrencySafe: () => true,
    execute: () => service.status(),
  });
  register({
    name: "wsl_native_exec",
    description:
      "在指定系统执行命令。wsl 使用 Linux bash，windows 使用 Windows PowerShell；也可使用 executable+args 原样传参。每次命令独立，cwd/env 显式传递，不共享 shell 状态。连接复用。受限模式需单次批准。",
    parameters: {
      target,
      distro,
      user,
      command: str("Shell 脚本，与 executable 二选一。"),
      executable: str("直接执行的程序，与 command 二选一。"),
      args: {
        type: "array",
        items: { type: "string" },
        description: "原样传递的程序参数。",
      },
      cwd: str("绝对工作目录，支持 Linux、Windows 和 WSL UNC 路径。"),
      env: { type: "json", description: "本次命令的环境变量对象。" },
      timeoutMs: {
        type: "integer",
        description: "超时毫秒，默认 120000，前台最大 600000。",
      },
    },
    async execute(args, exec) {
      ensure(
        args.timeoutMs === undefined || args.timeoutMs <= 600000,
        "INVALID_ARGUMENT",
        "前台超时最大 600000 ms；长任务使用 wsl_native_job。",
      );
      await authorize(
        ctx,
        exec,
        `在 ${args.target ?? "wsl"} 中执行命令，使用该系统当前用户的权限。`,
      );
      return service.execute(args.target ?? "wsl", args, options(args, exec));
    },
  });
  register({
    name: "wsl_native_files",
    description:
      "由文件所在系统直接列目录、读取、写入或获取 SHA-256；不经过 Windows 9P 文件工具。写入保留符号链接并原子替换真实目标；父目录须已存在。offset/limit 是字节。复制二进制文件使用 wsl_native_copy。",
    parameters: {
      target,
      distro,
      user,
      operation: {
        type: "string",
        enum: ["list", "read", "write", "stat"],
        required: true,
      },
      path: str("文件或目录的绝对路径。", true),
      content: str("write 的完整 UTF-8 内容。"),
      expectedHash: str(
        "写入前校验旧 SHA-256；新文件使用 absent；省略表示允许覆盖。",
      ),
      encoding: { type: "string", enum: ["utf8", "gb18030", "base64"] },
      offset: {
        type: "integer",
        description: "read 为字节偏移；list 为分页偏移。",
      },
      limit: { type: "integer" },
      hidden: { type: "boolean" },
      hash: { type: "boolean", description: "stat 时计算 SHA-256。" },
    },
    isConcurrencySafe: (args) => args.operation !== "write",
    async execute(args, exec) {
      if (args.operation === "write")
        await authorize(
          ctx,
          exec,
          `写入 ${args.target ?? "wsl"} 文件 ${args.path}。`,
        );
      return service.files(
        args.target ?? "wsl",
        args.operation,
        args,
        options(args, exec),
      );
    },
  });
  register({
    name: "wsl_native_copy",
    description:
      "在 Windows 与 WSL 之间分块复制单个文件（上限 1 GiB），核对传输 SHA-256 后原子提交。默认拒绝覆盖已有文件。中断后清理临时文件，不自动重放。",
    parameters: {
      from: { ...target, required: true },
      to: { ...target, required: true },
      distro,
      user,
      source: str("源文件绝对路径。", true),
      destination: str("目标文件绝对路径，父目录必须存在。", true),
      expectedHash: str("默认 absent；覆盖时填目标当前的 SHA-256。"),
    },
    async execute(args, exec) {
      await authorize(
        ctx,
        exec,
        `将 ${args.source} 复制到 ${args.destination}。`,
      );
      return service.copy({ ...args, signal: exec.signal });
    },
  });
  register({
    name: "wsl_native_path",
    description:
      "使用所选发行版的 wslpath 转换 Windows/Linux 路径，识别自定义挂载点与发行版不匹配。",
    parameters: {
      path: str("原路径。", true),
      direction: { type: "string", enum: ["linux", "windows"], required: true },
      distro,
      user,
    },
    isConcurrencySafe: () => true,
    execute: (args, exec) =>
      service.convert(args.path, args.direction, options(args, exec)),
  });
  register({
    name: "wsl_native_windows",
    description:
      "在 Windows 打开文件、目录或 http/https 链接；读取或写入文本剪贴板。剪贴板读取也需要跨系统权限。",
    parameters: {
      action: {
        type: "string",
        enum: ["open", "clipboard_get", "clipboard_set"],
        required: true,
      },
      target: str("open 的文件、目录或网址。"),
      text: str("clipboard_set 的文本，可为空。"),
      distro,
      user,
    },
    async execute(args, exec) {
      await authorize(ctx, exec, `Windows 操作：${args.action}。`);
      return service.windows(args, options(args, exec));
    },
  });
  register({
    name: "wsl_native_job",
    description:
      "启动、查询、取消或移除跨系统后台任务。任务归当前连接所有；插件退出或断开连接时终止。任务 id 必须与原 target/distro 一起使用。",
    parameters: {
      action: {
        type: "string",
        enum: ["start", "status", "cancel", "forget"],
        required: true,
      },
      target,
      distro,
      user,
      id: str("已有任务 ID。"),
      command: str("start 的 shell 脚本。"),
      cwd: str("绝对工作目录。"),
      timeoutMs: {
        type: "integer",
        description: "最大 86400000 ms（24 小时）。",
      },
    },
    async execute(args, exec) {
      ensure(
        args.timeoutMs === undefined || args.timeoutMs > 0,
        "INVALID_ARGUMENT",
        "模型任务需要正数超时。",
      );
      if (args.action !== "status")
        await authorize(
          ctx,
          exec,
          `管理 ${args.target ?? "wsl"} 后台任务：${args.action}。`,
        );
      return service.job(
        args.target ?? "wsl",
        args.action,
        args,
        options(args, exec),
      );
    },
  });
  const controller = createController(service);
  ctx.effect(() => () => controller.close());
  ctx.inject(["connection"], (controlCtx) => {
    controlCtx.effect(() =>
      registerControlRoutes(controlCtx.connection, controller),
    );
  });
  ctx.inject(["webServer", "connection"], (routeCtx) => {
    routeCtx.effect(() =>
      registerRoutes(
        routeCtx.webServer,
        service,
        routeCtx.connection,
        controller,
      ),
    );
  });
}
