# GitHub 同类项目调研

调研日期：2026-09-30。范围包括 GitHub 项目说明、公开源码、DSH 上游接口和 Microsoft WSL 文档。下表是文档与源码核查结果，没有把这些第三方插件全部安装实测。“未见说明”只描述本次核查到的材料，不表示作者一定没有实现。

## 已有项目

| 项目 | 本次核查到的能力 | 对本项目的影响 |
| --- | --- | --- |
| [dsh-wsl-workspace](https://github.com/dsh-wsl-workspace-maintainers/dsh-wsl-workspace) | v0.7.4 已有 WSL workspace、预设、持久 PTY、后台任务、GNU 搜索工具和技能发现；文件通过 Windows 的 WSL UNC 通道处理，文档说明 shell 用户与文件访问身份的区别 | 单纯做 WSL 工作区和持久终端没有明显差异。本项目选择 Linux 进程原生文件操作，并另外提供完整 Linux DSH 启动方式 |
| [Rycar1/dsh-for-wsl](https://github.com/Rycar1/dsh-for-wsl) | Windows Desktop 的 WSL workspace、UNC 文件树、shell 路由和原子写入；要求完全访问权限 | 不重复替换工作区服务，保留 Windows 工具，通过明确的目标系统参数调用 Linux |
| [penglai-doll/dsh-wsl](https://github.com/penglai-doll/dsh-wsl) | minimal-wsl 预设、一次性 Bash、持久 PTY 和设置界面；完全访问权限闸门 | 本项目保持每次命令的目录、环境独立；需要原生持久终端时使用完整 Linux DSH |
| [XINY11451/dsh-wsl](https://github.com/XINY11451/dsh-wsl) | WSL 模型工具、发行版选择与路径处理 | 发行版选择与路径转换属于基本能力，本项目补齐运行时路径转换、传输一致性和双宿主统一接口 |
| [ch1bug/dsh-wsl-bridge](https://github.com/ch1bug/dsh-wsl-bridge) | WSL DSH 访问 Windows 的 7 个工具；win_run 通过临时 bat／ps1 调用 Windows shell | Windows 反向交互已有成熟方向。本项目用同一常驻协议覆盖两端，并提供取消与后台任务生命周期 |
| [crack-time/dsh-wsl](https://github.com/crack-time/dsh-wsl) | 常驻 daemon、TCP 127.0.0.1:37778、持久 Bash、一次性调用回退、WSL workspace | 常驻连接并非本项目首创。本项目改用父子进程 stdio，不增加执行服务监听端口，也不自动重放失败操作 |
| [dsh-wsl-tray](https://github.com/liyu34/dsh-wsl-tray) | WSL DSH 的 Windows 托盘、快捷方式、watchdog 与设置 | 本项目提供前台启动器和 DSH 内管理面板；托盘、自动登录启动与 watchdog 不在本版范围内 |
| [dsh-bash-win](https://github.com/zimzaza4/dsh-bash-win) | Windows Bash／WSL、bwrap 沙箱、批准服务与后台任务 | 跨系统权限必须说明。本项目接入 DSH 批准服务，但不声称具备该项目的 bwrap 隔离能力 |

## 实现重点

本项目的差异来自这些能力的组合，而不是“首次支持 WSL”或“首次实现常驻桥接”。

1. **同一插件支持两个宿主。** Windows DSH 调用 Linux；Linux DSH 调用 Windows；两端共用工具接口、连接协议和文件传输逻辑。
2. **完整 Linux DSH 可以从 Windows 启动。** DSH 本体、插件快照、运行依赖和独立数据目录放在 Linux 文件系统；Windows 浏览器访问其本机页面。
3. **文件由所在系统直接处理。** 明确区分命令路由和文件执行位置，支持 UTF-8／GB18030 分页、符号链接保留、旧内容 hash 检查和二进制分块提交。
4. **常驻连接有明确的结束行为。** 取消会回收进程树；EOF 清理任务和未提交文件；断线后下一次请求建立新连接，已经发出的操作不会自动重放。
5. **安装可以利用 Windows 网络。** Windows npm 解析和缓存 Linux 所需依赖，Linux npm 使用锁文件进行本地安装，适用于本次遇到的 Windows 可联网、WSL 下载超时环境。
6. **结论有对应证据。** 检查真实 DSH 标准 Agent 的工具可见性与调用结果，并单独测量短命令调用开销。
7. **两个完整宿主可以同时使用。** 0.2.0 增加一键进入、同页返回、分窗口工作、按环境记忆目录和恢复项目会话；切换设置时，已开始的操作保留原来的发行版、用户和目录。这是本项目在前述方案基础上选择完成的使用流程，不据此声称其他项目没有相近功能。

没有把 PTY、完整 WSL 工作区替换、托盘、watchdog、bwrap 沙箱都放进首版。上述方向已有项目可参考，也各自带来独立的维护成本。本版围绕用户要求的双宿主、Linux 本体运行与 Windows 互操作完成实现。

## 版本与资料

本地源码核查固定到了以下提交：

| 源码 | 提交 |
| --- | --- |
| [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) | `639ed015397290b3745d163aafe02ffee4aa3f84` |
| dsh-wsl-workspace | `892542864af1369dfd6781848412ccad159f31c9` |
| ch1bug/dsh-wsl-bridge | `7e979a5d7ee62dc0cb75b19c816141fabc9188c9` |
| crack-time/dsh-wsl | `0db27c5bcc37177a9858e62e0df48d287c3c3f62` |
| liyu34/dsh-wsl-tray | `ff0327610f76733ebdadc5d9de510f6f09699085` |

其他表中项目核查的是当日在线 README／源码页面，没有另行固定完整源码快照。正式适配使用 npm 发布的 `@deepseek-ai/dsh@0.2.0-rc.2`，不是将上游开发分支当作已发布版本。

Microsoft 的 [WSL 文件系统说明](https://learn.microsoft.com/en-us/windows/wsl/filesystems) 支持把 Linux 工作负载放在 Linux 文件系统，并介绍 Windows 程序互操作与路径转换；[WSL 网络说明](https://learn.microsoft.com/en-us/windows/wsl/networking) 说明 NAT、本机访问和镜像网络差异。本插件使用已有 localhost 转发，不修改 WSL 网络配置。

本项目为独立实现，未复制上述竞品的业务代码。项目名称、事实和链接用于功能对比；上游接口及第三方软件仍适用各自许可证。
