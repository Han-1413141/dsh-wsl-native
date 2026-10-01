# 故障处理

## 同窗口对话

WSL 对话应在当前窗口主区域显示，左侧行末带 `WSL` 标志。若显示“对话尚未连接”，先在环境面板查看 Linux 是否运行，再使用“重新连接”；该动作重新打开页面，不重放模型消息或文件操作。对话菜单可以关闭这个环境的页面而保留后台任务，再点击该对话重新打开。

点击“工作区”标题右侧的小切换按钮，可在原生工作区和紧凑列表间切换；两种视图都显示 WSL 对话。搜索框按需展开，匹配标题、目录和发行版。通过对话顶部“Linux 配置”进入 Linux 原生插件管理。

Windows Web 使用本机 HTTP(S) 页面；Desktop 使用 `dsh-app://app` 和官方隔离网页容器。出现“没有隔离浏览器接口”时，核对 Desktop 是否为 0.2.0-rc.2 及插件是否为 0.4.0 或后续兼容版。外部网站来源不支持同窗口嵌入。

## 桌面端安装

先使用桌面端安装目录下的 `resources/runtime/cli/bin/dsh.cmd` 执行 `plugin --profile desktop list --depth 0`。若只有 `web` 配置中存在插件，需要再安装到 `desktop`。完整步骤见[桌面端说明](desktop.md)。

安装成功而当前窗口没有出现“WSL 与 Windows”时，等运行中任务结束，从托盘退出并重新打开 DSH。不要只关闭窗口后立即判断安装失败，桌面程序可能仍在后台运行。安装脚本不会结束用户的 DSH 进程。

Linux 页面显示连接失败时，在“运行与连接管理”确认实例状态，再重新连接。若旧实例仍使用升级前的插件，结束其中的任务后停止该环境，再从面板进入以更新插件快照。0.5.0 默认从当前 Windows DSH 配置继承模型账号，之后各自保存；关闭继承或直接用 CLI 启动时，可在 Linux 单独配置。

先运行 `dsh-wsl doctor --distro Ubuntu --json`。它会实际启动桥接并报告两端 Node 的版本、平台和连接错误，不会修复系统设置。

## 环境与连接

| 现象 | 原因与处理 |
| --- | --- |
| `NO_DISTRO`、`DISTRO_NOT_FOUND` | 执行 `wsl --list --verbose`，使用实际发行版名称。插件不会自动安装操作系统 |
| `START_TIMEOUT` 或找不到 Node | 在目标发行版确认 Linux Node 可用；nvm 仅在交互式 shell 中初始化时，用 `--linux-node /绝对路径/node` 指定 |
| `WRONG_RUNTIME` | WSL 的 node 指向 Windows。安装 Linux Node，或明确指定 Linux Node 路径 |
| WSL 中找不到 `node.exe` | Windows Node 未加入 WSL 的互操作 PATH；设置 `DSH_WSL_WINDOWS_NODE` 或插件 `windowsNode` 为可执行路径 |
| `USER_MISMATCH` | 当前是 WSL 宿主，不能用设置伪装成另一个 Linux 用户；从 Windows 宿主使用 `--user` 连接 |
| `DISTRO_MISMATCH` | UNC 路径中的发行版与所选发行版不同；修正路径或选择对应发行版 |
| `ENOENT` | 确认目标系统和绝对路径。写入和复制要求父目录已经存在 |
| `POOL_FULL` | 已连接 8 个目标组合；结束不用的任务后，在面板断开全部连接，再连接需要的环境 |

## 安装与启动

Windows 能联网而 WSL 下载超时时，在 Windows 使用默认 `setup` 或明确加 `--install-network windows`。本次实机曾遇到 WSL 的 npm 域名解析到代理的 fake-IP 后超时；Windows 辅助下载已解决本项目的安装流程，没有更改本机代理监听、防火墙或 WSL 网络模式。

`NPM_DOWNLOAD_FAILED` 表示 Windows 侧下载失败。确认 Windows 的 npm 能查询 `@deepseek-ai/dsh@0.2.0-rc.2`，以及缓存目录可以写入。Windows npm 会沿用它已有的 registry 和网络配置；插件不会自动替换镜像。

官方 `dsh plugin add` 可能提示 peer dependency 未在配置目录中安装。DSH 的运行时解析器会提供官方 peer；本版已在源码目录之外验证正常加载。如果宿主实际报告找不到 `@deepseek-ai/dsh-tools`，先核对 DSH 是否为适配的 `0.2.0-rc.2`，保留错误详情。

如果 npm 缓存中的旧元数据造成 `ETARGET`，使用默认 Windows 辅助下载重新生成锁文件。插件先在线核对依赖版本，再按包地址缓存内容，避免把陈旧包列表当作版本不存在。

`SETUP_FAILED` 的正文保留安装任务错误。DSH 依赖中的原生模块仍需要与 Linux 运行时匹配；本版完整安装验证使用 Ubuntu x64、glibc。Alpine／musl 没有完成验证，Windows 辅助下载按 glibc 选择包。

`SETUP_REQUIRED` 表示安装或插件配置不存在，重新执行 `setup`。如果安装目录被手动改动，使用 `setup --reinstall`；该命令重新安装托管依赖，不清理 `dsh-home`。

`LOCALHOST_UNREACHABLE` 表示 Linux DSH 已启动但 Windows 无法访问其本机地址。检查 WSL 的 localhost 转发及原有网络配置。插件会停止这次启动失败的实例，不自动修改防火墙或绑定到公网地址。

`RUNTIME_BUSY` 表示同一托管目录已有启动器占用。先停止原实例。若此前发生系统崩溃或强制杀进程，锁文件可能残留：读取错误中明确给出的 `runtime.lock`，在对应发行版检查记录的 PID 和 DSH 进程；确认没有实例使用该目录后再移除该锁文件。不要删除 `runtime/` 或 `dsh-home/` 来解决锁冲突。

## 使用中的错误

| 错误 | 处理 |
| --- | --- |
| `CROSS_OS_PERMISSION` | 通过 DSH 的单次批准，或在 DSH 中选择完全访问；插件不会自动提高权限 |
| `FILE_CONFLICT` | 重新读取目标内容及 SHA-256，再决定是否覆盖 |
| `SOURCE_CHANGED` | 等源文件写入结束后重新复制；失败时原目标不会提交半成品 |
| `INVALID_ENCODING` | 指定实际文本编码，或使用 `base64` 读取二进制；分页沿用返回的 `nextOffset` |
| `LIMIT_TOO_SMALL` | 文本 limit 太小，不能容纳一个完整字符；至少使用 4 字节 |
| `JOB_NOT_FOUND` | 连接已重建、任务已删除或使用了错误目标；任务不能跨连接恢复 |
| `JOB_ENVIRONMENT_MISMATCH` | 显式参数与任务所属环境不一致；使用启动结果中的 target、distro、user，或省略发行版和用户让插件按 ID 定位 |
| `HANDOFF_INVALID` | 切换链接被修改、已过期或属于旧实例；回到 Windows 面板刷新状态后重新进入 |
| `CONNECTION_CLOSED` | 下一次请求会重建连接。先确认上一次操作是否已完成，再决定是否重试 |
| 面板出现 401／403 | 使用本次 DSH 启动输出的登录链接；确认浏览器与宿主属于同一个本机来源 |

强制结束系统或工作进程可能留下 `.dsh-wsl-*.tmp` 文件。它们位于目标目录，尚未提交；确认没有正在进行的传输后，可以移除明确属于该次失败传输的临时文件。

## 切换和同时使用

进入 Linux 不会停止 Windows DSH。返回 Windows 也不会停止 Linux；只有“停止此环境”“断开全部连接”或退出管理它的宿主会结束进程。若浏览器拦截“同时打开”的新窗口，准备仍会完成，之后点击“新窗口打开”。浏览器可能把新窗口链接交给系统默认浏览器。

输入错误目录后，页面保留输入并显示原因，之前的活动目录仍然有效。选择一个可用的最近目录或在“浏览”中重新选择即可。长时间未使用的路径可能已被移动，应更正路径后再进入。

从 Windows DSH 插件进入时，0.5.0 默认继承当前主环境的插件、设置和模型账号。Linux 独立修改优先，关闭继承只停止后续同步，不删除已继承的数据；详细行为见[继承说明](inheritance.md)。两边的模型对话和文件分别保留；页面切换不会迁移正在运行的模型上下文。需要同时编辑两边的页面时采用分窗口方式。

## 当前范围

本版提供前台 CLI、模型工具，以及 Desktop／Web 同窗口界面。插件没有另行实现托盘、自动启动、无人值守守护服务、断线任务恢复、PTY、目录同步和完整沙箱隔离。Desktop 内置运行时、Linux 启动与双向互操作已验证；原生桌面窗口中的鼠标操作、快捷键尚未逐项验收。遇到新版本兼容问题，保留 DSH 版本、错误代码、目标系统和复现步骤；不要在问题报告中附启动 token、API Key 或完整私有日志。
