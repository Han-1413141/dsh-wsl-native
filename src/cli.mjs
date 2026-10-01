import { parseArgs } from "node:util";
import { WslService } from "./service.mjs";
import { NativeLauncher } from "./launcher.mjs";
import { ensure } from "./errors.mjs";

const HELP = `DSH for WSL · dsh-wsl-native 0.6.0

  dsh-wsl list                               列出发行版
  dsh-wsl doctor [--distro Ubuntu]            检查 Linux 与 Windows 桥接
  dsh-wsl exec --command "uname -a"           执行 Linux 命令
  dsh-wsl exec --target windows --command …   执行 Windows PowerShell
  dsh-wsl path --path "C:\\Work" --direction linux
  dsh-wsl setup --distro Ubuntu               安装独立 Linux DSH 与插件
  dsh-wsl start --distro Ubuntu --cwd /home/user/project
                                             启动 Linux DSH；Ctrl+C 停止

选项：--distro 名称  --user Linux用户  --cwd 目录  --port 0
      --linux-node Linux可执行路径  --windows-node WSL中的node.exe路径
      --install-network auto|windows|linux  --npm-cache 缓存绝对路径
      --timeout 120000  --no-open  --json

Windows 中的 DSH：dsh plugin --profile web add <此插件绝对路径>
WSL 中的 DSH：同一个插件包、同一个安装命令。
`;

export async function main(argv = process.argv.slice(2)) {
  let service;
  const controller = new AbortController();
  const cancel = () => controller.abort();
  process.on("SIGINT", cancel);
  process.on("SIGTERM", cancel);
  try {
    const { values: v, positionals } = parseArgs({
      args: argv,
      allowPositionals: true,
      strict: true,
      options: {
        distro: { type: "string" },
        user: { type: "string" },
        cwd: { type: "string" },
        port: { type: "string" },
        command: { type: "string" },
        target: { type: "string" },
        path: { type: "string" },
        direction: { type: "string" },
        timeout: { type: "string" },
        "linux-node": { type: "string" },
        "windows-node": { type: "string" },
        json: { type: "boolean" },
        "no-open": { type: "boolean" },
        help: { type: "boolean", short: "h" },
        "install-network": { type: "string" },
        "npm-cache": { type: "string" },
        reinstall: { type: "boolean" },
      },
    });
    const cmd = positionals[0];
    if (v.help || !cmd || cmd === "help") {
      console.log(HELP);
      return;
    }
    ensure(
      positionals.length === 1,
      "INVALID_ARGUMENT",
      "多余参数；运行 dsh-wsl --help 查看用法。",
    );
    service = new WslService({
      distro: v.distro,
      user: v.user,
      linuxNode: v["linux-node"],
      windowsNode: v["windows-node"],
    });
    await service.initialized;
    if (v.user !== undefined) service.settings.user = v.user;
    const opts = { distro: v.distro, user: v.user, signal: controller.signal };
    let result;
    if (cmd === "list") result = await service.distros(true);
    else if (cmd === "status") result = await service.status();
    else if (cmd === "doctor") {
      const checks = [];
      for (const target of ["wsl", "windows"]) {
        try {
          checks.push({
            target,
            ok: true,
            ...(await service.ping(target, opts)),
          });
        } catch (e) {
          checks.push({ target, ok: false, code: e.code, error: e.message });
        }
      }
      result = { checks, ok: checks.every((c) => c.ok) };
      if (!result.ok) process.exitCode = 1;
    } else if (cmd === "exec") {
      result = await service.execute(
        v.target || "wsl",
        {
          command: v.command,
          cwd: v.cwd,
          timeoutMs: v.timeout ? Number(v.timeout) : undefined,
        },
        opts,
      );
      if (!v.json) {
        process.stdout.write(result.stdout);
        process.stderr.write(result.stderr);
      }
      process.exitCode = result.timedOut
        ? 124
        : result.cancelled
          ? 130
          : (result.exitCode ?? 1);
      if (!v.json) return;
    } else if (cmd === "path")
      result = await service.convert(v.path, v.direction || "linux", opts);
    else if (cmd === "setup") {
      const launcher = new NativeLauncher(service);
      let phase;
      result = await launcher.prepare({
        ...opts,
        installNetwork: v["install-network"],
        npmCache: v["npm-cache"],
        reinstall: v.reinstall,
        onProgress: (p) => {
          if (!v.json && phase !== p.text) {
            phase = p.text;
            process.stderr.write(p.text + "\n");
          }
        },
      });
    } else if (cmd === "start") {
      const launcher = new NativeLauncher(service);
      result = await launcher.start({
        ...opts,
        cwd: v.cwd,
        port: v.port ? Number(v.port) : 0,
      });
      console.log(
        v.json
          ? JSON.stringify(result)
          : `Linux DSH 已启动：${result.url}\n按 Ctrl+C 停止此实例。`,
      );
      if (!v["no-open"])
        await service.windows({ action: "open", target: result.url }, opts);
      while (!controller.signal.aborted) {
        await new Promise((resolve) => {
          const timer = setTimeout(done, 1500);
          function done() {
            clearTimeout(timer);
            controller.signal.removeEventListener("abort", done);
            resolve();
          }
          controller.signal.addEventListener("abort", done, { once: true });
        });
        if (controller.signal.aborted) break;
        const job = await service.job(
          "wsl",
          "status",
          { id: result.id },
          { distro: result.distro },
        );
        ensure(
          job.status === "running",
          "DSH_STOPPED",
          `Linux DSH 已退出：${job.status}。${job.stderr}`,
        );
      }
      await launcher.stop();
      return;
    } else throw new Error(`未知命令 ${cmd}。运行 dsh-wsl --help 查看用法。`);
    console.log(JSON.stringify(result, null, v.json ? 0 : 2));
  } catch (e) {
    console.error(`${e.code || "ERROR"}: ${e.message}`);
    process.exitCode = controller.signal.aborted ? 130 : 1;
  } finally {
    process.off("SIGINT", cancel);
    process.off("SIGTERM", cancel);
    await service?.close();
  }
}
