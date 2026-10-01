# 验证报告

验证日期：2026-10-01。插件版本：**0.5.0**。适配 DeepSeek Harness **0.2.0-rc.2**。

## 本版结果

| 检查 | 结果与范围 |
| --- | --- |
| 自动化检查 | 56 项通过，0 失败，0 跳过；Windows Node.js v24.19.0 |
| 语法与构建 | 通过；客户端 93,565 字节，上限 262,144 字节 |
| 主环境插件继承 | 实际 Windows desktop 的 5 个插件在隔离 Ubuntu WSL 2 环境完成安装 |
| Linux 配置覆盖 | Linux 修改过的显示设置在再次准备后保留 |
| 模型账号文件 | 实际复制到隔离 Linux 目录并验证 0600 权限；未调用模型 API |
| 安装包隔离加载 | 官方安装命令通过，认证 API、版本与官方 profileContext 均正确 |
| 完整 Linux DSH | 实际启动并通过认证 API 核对 0.5.0 版本 |
| 新增合并检查 | 字段更新、Linux 删除、主环境删除、账号整体记录、特殊对象键、对象类型变化及 Cordis 表达式 |
| 原生 WSL 分组 | 检查跨环境同名 ID、项目分组、运行状态排序、归档过滤和搜索 |
| Desktop 原生 GUI | 本版交互验收在桌面操作中止后尚未完成，不以源码检查代替点击验收 |

真实继承检查使用独立的 Linux 数据目录。测试中继承的插件为 dsh-autocompose 0.3.0、dsh-context 0.62.0、dsh-cost-meter 1.8.4、dsh-pnpm-build-control 0.1.3、dsh-visual-edit 0.5.0。这些版本是本次测试时的实际来源，不是对使用者的固定版本要求。

## 复现

```powershell
npm ci
npm run build
npm run check
npm test
npm run test:inheritance
```

最后一项需要 Windows、已安装的 Desktop 配置、WSL 2 与两端 Node/npm，默认使用 Ubuntu；可用 DSH_TEST_DISTRO 指定发行版。该项读取本机主环境插件和配置，在随机隔离 Linux 目录进行继承、加载和清理，不调用模型 API。

发布包可用 npm run test:package 验证：先生成 dist/dsh-wsl-native-0.5.0.tgz，脚本通过官方命令安装到源码目录外的隔离配置，并验证宿主认证接口、版本和官方 profileContext。最终安装结果与包 SHA-256 记录在发布附件 verification-0.5.0.json。

## 历史结果

[0.4.0 报告](validation-0.4.0.md)保留 Desktop 内置 Electron 运行时、精确来源与签名、完整 Linux DSH、反向 Windows 互操作和官方桌面配置安装的结果。

[0.3.0 报告](validation-0.3.0.md)保留 Windows Web 同窗口切换、草稿、置顶、归档、Linux 文件侧栏、深色主题、窄窗口与刷新恢复结果。仓库中的统一对话截图来自该版本，0.5.0 的布局已有变化。

[0.2.0 报告](validation-0.2.0.md)保留 WSL 传输、文件、环境切换及短命令性能测量。常驻连接中位耗时 4.601 ms，每次启动 wsl.exe 为 289.644 ms；本版没有重复测量未修改的执行路径。

## 证据

- [当前汇总](evidence/summary.json)
- [官方安装包加载](evidence/package-v050.json)
- [实际插件继承](evidence/inheritance-v050.json)
- [0.4.0 运行时](evidence/desktop-runtime-v040.json)
- test/inheritance.test.mjs：合并与原生工作区投影检查。
- scripts/inheritance-smoke.mjs：实际插件继承、Linux 独立调整及完整宿主加载。
- scripts/package-smoke.mjs：安装包的官方加载与配置上下文。
- scripts/install-desktop.ps1：桌面配置备份、安装与原有插件保留检查。

认证链接、账号、私有日志、用户配置备份和依赖缓存不发布。ARM64、其他发行版、WSL 1、Alpine/musl、八个环境同时驻留和长期运行未实测。
