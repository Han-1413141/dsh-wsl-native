# Windows 桌面端安装与使用

`dsh-wsl-native` 0.4.0 让 Windows DSH 和 WSL 中完整的 Linux DSH 共用一个桌面窗口、一个对话列表。WSL 对话带 `WSL` 标志；点击不同对话即可切换。Windows 对话继续使用 Windows，WSL 对话使用 Linux 原生 Bash、文件系统与工作区。

## 安装条件

- Windows 上已安装 **DeepSeek Harness Desktop 0.2.0-rc.2**，至少打开过一次以生成 `desktop` 配置。
- 已安装 WSL 2 发行版。本项目实测使用 Ubuntu x64。
- Linux Node.js 为 22.x 的 `22.19+` 或 `24+`，且是 Linux 可执行文件；Linux npm 可用。
- Windows Node.js、npm 可用。桌面端自身使用随应用提供的 Electron Node 运行时；默认依赖下载通过 Windows npm 完成。

用 `wsl --list --verbose` 查看发行版名称。项目放在 `/home/<用户>/projects/...` 时，由 Linux 文件系统处理 Git、依赖、权限、符号链接和文件监听。选择 `/mnt/c/...` 仍然可以工作，但不会自动获得 Linux 文件系统的性能。

## 下载与安装

从 [GitHub Releases](https://github.com/Han-1413141/dsh-wsl-native/releases/latest) 下载 `dsh-wsl-native-0.4.0.tgz`，保存到固定位置。发布页附有 `SHA256SUMS`；可用 `Get-FileHash -Algorithm SHA256` 核对包文件。

使用桌面端安装目录内的 `resources\runtime\cli\bin\dsh.cmd`。下面以 `F:\deepseek harness` 为例，请换成本机实际目录：

```powershell
$dshDesktop = 'F:\deepseek harness\resources\runtime\cli\bin\dsh.cmd'
& $dshDesktop plugin --profile desktop add 'C:\Downloads\dsh-wsl-native-0.4.0.tgz'
& $dshDesktop plugin --profile desktop list --depth 0
```

桌面端使用 **`desktop`** 配置。安装到 `web` 只影响独立 Web 宿主。若 `Get-Command dsh.cmd` 已指向桌面端附带的命令，可直接执行 `dsh plugin --profile desktop add ...`。

安装成功后打开桌面端侧边栏的 **WSL 与 Windows**。若当前窗口尚未显示入口，等当前任务完成后，从托盘退出 DSH 并重新打开。安装不要求重新安装 DSH，也不需要修改应用程序包。

### 使用带备份的安装脚本

下载仓库源码，在仓库根目录运行：

```powershell
.\scripts\install-desktop.ps1 `
  -PackagePath 'C:\Downloads\dsh-wsl-native-0.4.0.tgz' `
  -DshCommand 'F:\deepseek harness\resources\runtime\cli\bin\dsh.cmd'
```

脚本先备份 `desktop` 的包清单、锁文件和 Cordis 配置，再通过官方 CLI 安装，最后核对插件版本、bundle 注册和原有插件是否保留。包文件复制到 `<DSH_HOME>\dsh-wsl-native\packages\`，安装来源不依赖临时下载目录。

备份位置为 `<DSH_HOME>\backups\dsh-wsl-native\install-<时间>\`，其中 `installation.json` 记录安装结果与 SHA-256。默认 `DSH_HOME` 为 `%USERPROFILE%\.dsh`；自定义目录可传 `-DshHome`。脚本不会退出或重启正在运行的 DSH。

## 第一次开始 WSL 对话

1. 打开 **WSL 与 Windows**，选择发行版和 Linux 用户；不指定用户时采用发行版默认用户。
2. 选择项目目录。可输入 `/home/...`、Windows 盘符路径或 WSL UNC 路径，也可点击 **浏览**。
3. 点击 **开始 WSL 对话**。插件准备 Linux DSH 和依赖，启动后在当前窗口打开 Linux 原生对话。
4. 首次进入 Linux 时，通过 **Linux 设置** 配置 Linux DSH 的模型账号或 API Key。两边账号独立保存。
5. 在左侧列表点击 Windows 对话即可返回；WSL 对话行带 `WSL` 标志，随时可以切回。

第一次准备涉及下载和安装；之后会复用已经准备的运行时与正在运行的实例。桌面端界面使用 DSH 原生控件、字体和主题变量。切换会话时保留已加载的 Linux 页面，不重新启动整个运行环境。

## 同一窗口中的日常操作

| 操作 | 用途 |
| --- | --- |
| Windows ＋ | 创建 Windows 对话 |
| WSL ＋ | 在当前 Linux 项目创建对话 |
| 全部／Windows／WSL | 按环境筛选列表 |
| 搜索 | 按标题、项目路径或发行版找对话 |
| 对话菜单 | 置顶、归档、恢复或关闭环境页面 |
| Linux 设置 | 展开 Linux DSH 自己的账号、插件及工作区设置 |
| 工作区 | 恢复 DSH 原生工作区列表 |
| 新窗口打开 | 使用独立浏览器窗口查看 Linux DSH |

同一窗口最多保留 8 个 Linux 环境页面。关闭某个环境的页面释放页面占用；停止环境才会结束它的 Linux DSH。退出管理它的 Windows DSH 也会结束所属 Linux 实例。不同环境的会话各自运行和保存，切换不会迁移正在生成的模型上下文。

## 与 Windows 互动

在 Linux 对话中，原生工具执行 Linux 工作；需要 Windows 操作时使用插件提供的 `wsl_native_*` 工具。例如：

> 使用 wsl_native_exec 的 windows 目标，查询 Windows Node.js 版本。

> 使用 wsl_native_copy，把 /home/me/project/report.pdf 复制到 C:\Users\me\Desktop\report.pdf，已有文件先不要覆盖。

> 使用 wsl_native_windows，在 Windows 资源管理器中打开当前项目目录。

插件支持路径转换、文件复制、Windows 程序调用和文本剪贴板。变更操作遵循 DSH 的权限与批准设置。完整参数见[使用手册](usage.md#工具接口)。

## 更新与卸载

更新时下载新版本包，使用同一条 `plugin --profile desktop add` 命令，或再次运行安装脚本。Linux 旧实例仍在运行时，先结束其中的任务，再从面板停止并重新进入，插件会更新 Linux 快照，账号和会话数据继续保留。

卸载 Windows 桌面端插件：

```powershell
& $dshDesktop plugin --profile desktop remove dsh-wsl-native
```

卸载不会自动删除托管的 Linux 数据。Linux 的账号和会话位于 `~/.local/share/dsh-wsl-native/dsh-home/`。需要清理时，先停止实例并备份该目录。不要直接用旧配置备份覆盖后来安装的其他插件；常规回退使用旧版包重新安装。

## 版本与验证

本版完成 49 项自动化检查，并通过已安装 Desktop 的内置 Electron 运行时验证官方插件加载、认证 API、Desktop 签名、完整 Linux DSH 启动和反向 Windows 互操作。桌面端容器使用官方 `browser.acquire/release` 接口，保留宿主的隔离与安全设置。

原生桌面窗口的鼠标操作、快捷键和长时间运行尚未逐项验收。仓库截图来自 Windows Web 的真实同窗口检查；不把 Web 截图当作 Desktop 实测截图。各项记录见[验证报告](validation.md)，安装问题见[故障处理](troubleshooting.md)。

上游资料：[DeepSeek Harness Desktop 文档](https://github.com/deepseek-ai/deepseek-harness/blob/master/apps/desktop/README.zh.md)。
