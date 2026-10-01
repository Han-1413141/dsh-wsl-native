# 验证报告

验证日期：2026-09-30。插件版本：**0.4.0**。适配 DeepSeek Harness **0.2.0-rc.2**。

## 本轮结果

| 检查 | 结果与范围 |
| --- | --- |
| 自动化检查 | 49 项通过，0 失败，0 跳过；Windows Node.js v24.19.0 |
| 语法检查与构建 | 通过；客户端 80,439 字节，上限 262,144 字节 |
| 已安装 Desktop 接口 | 确认 0.2.0-rc.2 的实际程序包包含浏览器容器申请、释放、lease 校验和隔离策略 |
| Desktop 内置 Electron 运行时 | 通过；使用它的 CLI 启动隔离测试宿主，加载本插件与 7 个 Agent 工具 |
| 认证和拒绝检查 | 已认证 Windows API 可用，未认证请求和缺少 CSRF 的旧 HTTP 变更接口被拒绝 |
| Desktop 来源与签名 | `dsh-app://app` 父来源生成的链接在实际 Linux DSH 通过签名验证 |
| 完整 Linux DSH | Ubuntu WSL 2、Linux Node.js v22.22.1 成功启动，加载 0.4.0 插件 |
| 反向 Windows 互操作 | 从 Linux 连接桌面端的 Electron Node 运行时，返回 win32 平台 |
| 测试资源释放 | 正常停止本轮 Linux 实例，结束隔离测试宿主 |
| Desktop 原生 GUI | 尚未逐项进行鼠标点击、快捷键与长时间运行验收 |

本轮运行时测试使用独立的 `DSH_HOME`；没有调用模型 API。它验证真实 Desktop 所带运行时及宿主协议，不等同于原生窗口完整交互验收。实际用户 `desktop` 配置的安装与最终包校验结果另存于发布附件 `verification-0.4.0.json`。

## Desktop 针对性检查

新增的 `test/desktop.test.mjs` 覆盖精确父来源和签名、固定操作列表、随机通道、参数大小上限、元数据变化合并、空闲等待和关闭释放、参数注入拒绝，以及卸载后才完成容器申请的清理。

容器适配检查使用模拟 webview 和真实插件通信模块，确认使用官方 lease 与 partition、重复操作复用页面、返回操作结果、离开所属来源后拒绝请求，以及关闭时释放 lease。该检查没有伪装为真实 Electron 窗口测试。

## 复现

```powershell
npm ci
npm run build
npm run check
npm test

$env:DSH_TEST_DESKTOP_ROOT = 'F:\deepseek harness'
npm run test:host
```

将安装目录替换为本机目录。最后一项需要已安装的 Desktop、WSL 2、Linux Node/npm 和 Windows npm，会创建隔离测试配置并准备测试用 Linux DSH。通过 `DSH_TEST_DISTRO` 指定其他已安装发行版。通用 CI 只运行前四项，本机 WSL 与 Desktop 集成检查单独记录。

## 历史结果

[0.3.0 报告](validation-0.3.0.md)保留真实 Windows Web 同窗口切换、新建 Windows／WSL 对话、草稿保留、置顶、归档、Linux 文件侧栏、深色主题、窄窗口与刷新后恢复结果。仓库中的统一对话截图均来自该版本的 Web 验证。

[0.2.0 报告](validation-0.2.0.md)保留 10 项真实 WSL 传输、7 项 Linux 文件与环境切换检查、双宿主认证和 30 轮短命令性能测量。常驻连接的中位耗时 4.601 ms，每次启动 wsl.exe 为 289.644 ms；该指标衡量短命令调用开销。0.4.0 没有重复测量未修改的传输和性能路径。

## 证据文件

| 文件 | 用途 |
| --- | --- |
| test/desktop.test.mjs | Desktop 来源、通信和容器生命周期 |
| test/conversations.test.mjs | Web 同窗口协议、元数据和列表 |
| test/core.test.mjs、test/environments.test.mjs | 工具、环境隔离、文件、启动复用 |
| scripts/host-smoke.mjs | 真实 Desktop 内置运行时、认证及完整 Linux DSH |
| scripts/install-desktop.ps1 | 官方 desktop 配置安装、备份与安装后检查 |
| docs/evidence/desktop-runtime-v040.json | 本轮运行时检查记录 |
| docs/evidence/summary.json | 当前构建和检查汇总 |
| docs/evidence/ui-v030.json、summary-v030.json | 0.3.0 历史结果 |
| docs/evidence/summary-v020.json | 0.2.0 历史结果 |

发布附件含最终包 SHA-256 与实际安装记录；认证链接、测试宿主数据、私有日志、备份配置和依赖缓存均不发布。

ARM64、其他发行版、WSL 1、Alpine／musl、八个环境同时驻留和耐久运行未实测。当前实机结果使用 Windows x64 与 Ubuntu WSL 2。
