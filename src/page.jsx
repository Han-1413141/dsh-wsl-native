import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Button,
  Input,
  Modal,
  StateDot,
  IconChevronDownOutlineRegular,
  IconFolderOpenOutlineRegular,
  IconRefreshOutlineRegular,
} from "@deepseek-ai/dsh-client-ui-primitives";
import {
  TerminalIcon,
  SystemIcon,
  OpenIcon,
  Badge,
  DirectoryPicker,
  normalized,
  directoryError,
} from "./components.jsx";
import { appOrigin, parentUrl } from "./handoff.mjs";
import { openProject } from "./client-session.mjs";
import { InheritanceSection } from "./inheritance-ui.jsx";

export function useModel(model) {
  const [, update] = useState(0);
  useEffect(() => model.subscribe(() => update((value) => value + 1)), [model]);
  return model.state;
}
export function WslPage({ api, ctx, model }) {
  const state = useModel(model);
  const [draft, setDraft] = useState(model.draft);
  const [busy, setBusy] = useState("");
  const [notice, setNotice] = useState(null);
  const [picker, setPicker] = useState(false);
  const [dialog, setDialog] = useState(null);
  const working = useRef(false),
    mounted = useRef(true);
  const refresh = useCallback(() => model.refresh(), [model]);
  useEffect(() => {
    mounted.current = true;
    void refresh().catch(() => {});
    return () => {
      mounted.current = false;
    };
  }, [refresh]);
  useEffect(() => {
    if (state && !draft) setDraft(normalized(state.settings, state.distros));
  }, [state, draft]);
  useEffect(() => {
    model.draft = draft;
  }, [draft, model]);
  // Work survives page reloads. Navigation happens only for the request this tab made.
  useEffect(() => {
    const pending = model.pending;
    if (!pending) return;
    const handoff = state?.handoffs?.find((item) => item.id === pending.id);
    if (handoff?.state === "ready") {
      model.remember();
      model.readyLink = handoff.url;
      model.setPending(null);
      if (pending.mode === "same") {
        void model.conversations.adopt(handoff).catch(error => {
          model.error = error.message;
          model.emit();
        });
      }
      else if (model.popup && !model.popup.closed) {
        model.popup.location.replace(handoff.url);
        model.popup = null;
        setNotice({ text: "Linux 已在新窗口打开，两边可以同时使用。" });
      } else
        setNotice({
          text: "Linux 已就绪。点击“新窗口打开”即可与 Windows 同时使用。",
        });
    } else if (handoff?.state === "failed") {
      model.popup?.close();
      model.popup = null;
      model.setPending(null);
      setNotice({ error: true, text: handoff.error });
    } else if (state && !handoff) {
      model.setPending(null);
      setNotice({
        error: true,
        text: "启动器已重新连接，请重新进入 Linux 环境。",
      });
    }
  }, [state, model, model.pending]);
  useEffect(() => {
    const preparing = state?.native?.instances?.some(
      (item) => item.preparing || item.starting,
    );
    if (!model.pending && !preparing) return;
    const timer = setTimeout(() => {
      void refresh().catch(() => {});
    }, 700);
    return () => clearTimeout(timer);
  }, [state, model, model.pending, refresh]);

  async function task(kind, action) {
    if (working.current) return;
    working.current = true;
    setBusy(kind);
    setNotice(null);
    model.error = null;
    try {
      await action();
    } catch (error) {
      if (mounted.current)
        setNotice({ error: true, text: directoryError(error) });
    } finally {
      try {
        await refresh();
      } catch {
        /* The shared model exposes the connection error. */
      }
      working.current = false;
      if (mounted.current) setBusy("");
    }
  }
  function edit(key, value) {
    setDraft((current) => ({ ...current, [key]: value }));
    setNotice(null);
  }
  const chosen = () => ({
    distro: draft.distro,
    user: draft.user.trim(),
    directory: draft.directory.trim(),
  });
  async function selectEnvironment(
    next,
    message = "工作环境已连接，目录已记住。",
  ) {
    const result = await api("environment/switch", next);
    if (mounted.current) {
      setDraft(normalized(result.settings, state.distros));
      setNotice({ text: message });
    }
    return result;
  }
  function enter(newWindow = false) {
    if (working.current || model.pending) return;
    // Reserve the window in the click event so browser popup rules do not block a cold start.
    if (newWindow) {
      model.popup = window.open("about:blank", "_blank");
      if (model.popup) {
        model.popup.opener = null;
        model.popup.document.title = "正在准备 Linux DSH";
        model.popup.document.body.textContent =
          "正在准备 Linux DSH，完成后会自动进入。Windows DSH 可以继续使用。";
        model.popup.document.body.style.cssText =
          "font:14px/1.7 system-ui;padding:48px;max-width:560px;margin:auto;color:#666;background:#fafafa";
      }
    }
    void task("enter", async () => {
      try {
        model.remember();
        const result = await api("native/enter", {
          ...chosen(),
          parentOrigin: appOrigin(window.location.origin),
        });
        setDraft(normalized(result.settings, state.distros));
        // Refresh before installing the pending id, avoiding stale-status cancellation.
        await refresh();
        model.setPending({ id: result.id, mode: newWindow ? "new" : "same" });
      } catch (error) {
        model.popup?.close();
        model.popup = null;
        throw error;
      }
    });
  }
  if (!state || !draft)
    return (
      <div className="dsh-wsl-page">
        <header className="dsh-wsl-heading">
          <div>
            <h1>WSL 与 Windows</h1>
            <p>在同一窗口使用两套环境，WSL 对话会显示标志。</p>
          </div>
        </header>
        <div className="dsh-wsl-empty" role={model.error ? "alert" : "status"}>
          {model.error || (
            <>
              <StateDot state="ongoing" />
              正在读取环境…
            </>
          )}
          {model.error && (
            <Button onClick={() => task("refresh", async () => {})}>
              重新连接
            </Button>
          )}
        </div>
      </div>
    );

  const wslHost = state.mode === "wsl-host";
  const supported = state.mode !== "unsupported";
  const saved = normalized(state.settings, state.distros);
  const dirty = ["distro", "user", "directory"].some(
    (key) => draft[key].trim() !== saved[key],
  );
  const native = state.native || {},
    running = native.running;
  const pending =
    model.pending &&
    state.handoffs?.find((item) => item.id === model.pending.id);
  const activeWork = !!(native.preparing || native.starting || model.pending);
  const disabled = !!busy || !!model.pending || !supported;
  const profile = state.profiles?.find(
    (item) => item.distro === draft.distro && item.user === draft.user.trim(),
  );
  const linuxConnection = state.pool.connections.find(
    (c) =>
      c.connected &&
      c.target[0] === "wsl" &&
      c.target[1] === draft.distro &&
      (c.target[2] === draft.user.trim() || c.info?.user === draft.user.trim()),
  );
  const windowsConnected = state.pool.connections.some(
    (c) => c.connected && c.target[0] === "windows",
  );
  const errorText =
    (notice?.error && notice.text) ||
    model.error ||
    state.error ||
    (!supported && "当前环境不支持 WSL，请在 Windows 或 WSL 中使用。");
  const statusText = errorText || notice?.text;
  const link = running?.openUrl || null;
  const progress =
    pending?.state === "starting" || native.starting
      ? "正在启动 DSH，并等待 Windows 连接…"
      : native.progress?.text || "正在连接 Linux 工作环境…";

  return (
    <div className="dsh-wsl-page">
      <header className="dsh-wsl-heading">
        <div>
          <h1>WSL 与 Windows</h1>
          <p>在同一窗口使用两套环境，WSL 对话会显示标志。</p>
        </div>
        <Button
          variant="ghost"
          icon={<IconRefreshOutlineRegular />}
          title="刷新状态"
          aria-label="刷新状态"
          disabled={!!busy}
          onClick={() => task("refresh", async () => {})}
        />
      </header>
      {!wslHost && <div className="dsh-wsl-unified-setting">
        <span>Windows 与 WSL 对话显示在同一个列表，切换对话即可切换环境。</span>
        <Button variant="ghost" onClick={() => model.conversations.setUnified(!model.conversations.unified)}>
          {model.conversations.unified ? '使用原生工作区列表' : '切换到紧凑对话列表'}
        </Button>
      </div>}
      {statusText && (
        <div
          className={`dsh-wsl-notice ${errorText ? "is-error" : ""}`}
          role={errorText ? "alert" : "status"}
        >
          <StateDot state={errorText ? "error" : "done"} />
          <span>{statusText}</span>
        </div>
      )}

      <section className="dsh-wsl-section" aria-labelledby="dsh-wsl-host-title">
        <div className="dsh-wsl-section-heading">
          <h2 id="dsh-wsl-host-title">运行环境</h2>
          <span className="dsh-wsl-caption">切换时保留两边的任务</span>
        </div>
        <div className="dsh-wsl-host-grid">
          <article
            className={`dsh-wsl-card dsh-wsl-host-card ${!wslHost ? "is-current" : ""}`}
          >
            <div className="dsh-wsl-host-head">
              <SystemIcon size={23} />
              <Badge state={!wslHost ? "done" : "idle"}>
                {!wslHost ? "当前环境" : "独立运行"}
              </Badge>
            </div>
            <h3>Windows DSH</h3>
            <p>
              PowerShell、Windows 文件和应用。
              <br />
              保留 Windows 中的工作区与会话。
            </p>
            <div className="dsh-wsl-host-actions">
              {!wslHost ? (
                <Button
                  variant="outline"
                  onClick={() => ctx.layout.selectPanel(null)}
                >
                  继续 Windows 会话
                </Button>
              ) : model.parentOrigin ? (
                <>
                  <Button
                    variant="outline"
                    icon={<SystemIcon size={16} />}
                    onClick={() => {
                      model.remember();
                      if (model.guest) model.guest.returnWindows();
                      else window.location.assign(parentUrl(model.parentOrigin));
                    }}
                  >
                    切换到 Windows
                  </Button>
                  <a
                    className="dsh-wsl-text-link"
                    href={parentUrl(model.parentOrigin)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    新窗口打开
                    <OpenIcon />
                  </a>
                </>
              ) : (
                <span className="dsh-wsl-caption">
                  从 Windows DSH 进入后，可在这里一键返回。
                </span>
              )}
            </div>
          </article>
          <article
            className={`dsh-wsl-card dsh-wsl-host-card ${wslHost ? "is-current" : ""}`}
          >
            <div className="dsh-wsl-host-head">
              <TerminalIcon size={23} />
              <Badge
                state={
                  wslHost || running ? "done" : activeWork ? "ongoing" : "idle"
                }
              >
                {wslHost
                  ? "当前环境"
                  : running
                    ? "已就绪"
                    : activeWork
                      ? "准备中"
                      : "按需启动"}
              </Badge>
            </div>
            <h3>
              Linux DSH <span>{draft.distro || "WSL"}</span>
            </h3>
            <p>
              DSH、终端和项目都在 Linux 中运行。
              <br />
              Linux 原生工具，随时访问 Windows。
            </p>
            <div className="dsh-wsl-host-actions">
              {wslHost ? (
                <Button
                  variant="outline"
                  onClick={() =>
                    task("workspace", async () => {
                      const result = await selectEnvironment(chosen());
                      await openProject(ctx, result.settings.directory);
                    })
                  }
                >
                  继续 Linux 会话
                </Button>
              ) : (
                <>
                  <Button
                    variant="primary"
                    icon={
                      activeWork ? (
                        <StateDot state="ongoing" />
                      ) : (
                        <TerminalIcon size={16} />
                      )
                    }
                    disabled={disabled || !draft.distro || activeWork}
                    onClick={() => enter(false)}
                  >
                    {activeWork
                      ? "正在准备…"
                      : running
                        ? "打开 WSL 对话"
                        : "开始 WSL 对话"}
                  </Button>
                  {link && !dirty ? (
                    <a
                      className="dsh-wsl-text-link"
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      新窗口打开
                      <OpenIcon />
                    </a>
                  ) : (
                    <Button
                      variant="ghost"
                      disabled={disabled || !draft.distro || activeWork}
                      icon={<OpenIcon />}
                      onClick={() => enter(true)}
                    >
                      同时打开
                    </Button>
                  )}
                </>
              )}
            </div>
          </article>
        </div>
        {activeWork && (
          <div className="dsh-wsl-native-status" role="status">
            <StateDot state="ongoing" />
            <span>{progress}</span>
          </div>
        )}
        {!wslHost && !activeWork && (
          <p className="dsh-wsl-section-note">
            WSL 对话直接在当前窗口打开，并显示 WSL 标志；两边的任务继续运行。
          </p>
        )}
      </section>

      <InheritanceSection state={state} model={model} chosen={chosen} task={task} api={api} disabled={disabled || activeWork} />
      <section
        className="dsh-wsl-section"
        aria-labelledby="dsh-wsl-connection-title"
      >
        <div className="dsh-wsl-section-heading">
          <h2 id="dsh-wsl-connection-title">Linux 工作目录</h2>
          <Badge state={linuxConnection ? "done" : "idle"}>
            {linuxConnection ? "连接已就绪" : "按需连接"}
          </Badge>
        </div>
        <div className="dsh-wsl-card">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (!disabled)
                void task("connect", () => selectEnvironment(chosen()));
            }}
          >
            <div className="dsh-wsl-fields">
              <div className="dsh-wsl-field">
                <label htmlFor="dsh-wsl-distro">WSL 发行版</label>
                <div className="dsh-wsl-select-wrap">
                  <select
                    id="dsh-wsl-distro"
                    value={draft.distro}
                    disabled={disabled || wslHost}
                    onChange={(event) => {
                      const distro = event.target.value,
                        recent = state.profiles?.find(
                          (item) => item.distro === distro,
                        );
                      void task("switch", async () => {
                        await selectEnvironment(
                          {
                            distro,
                            user: recent?.user || "",
                            ...(recent?.directory
                              ? { directory: recent.directory }
                              : {}),
                          },
                          "已切换连接，原环境的任务继续运行。",
                        );
                      });
                    }}
                  >
                    {!state.distros.length && (
                      <option value="">未发现发行版</option>
                    )}
                    {state.distros.map((d) => (
                      <option key={d.name} value={d.name}>
                        {d.name}
                        {d.isDefault ? "（默认）" : ""}
                      </option>
                    ))}
                  </select>
                  <IconChevronDownOutlineRegular size={14} />
                </div>
                <p>
                  {draft.user ? `用户 ${draft.user}` : "使用发行版的默认用户"}
                </p>
              </div>
              <div className="dsh-wsl-field">
                <label htmlFor="dsh-wsl-directory">工作目录</label>
                <div className="dsh-wsl-directory-row">
                  <Input
                    id="dsh-wsl-directory"
                    className="dsh-wsl-directory-input"
                    value={draft.directory}
                    disabled={disabled}
                    onChange={(event) => edit("directory", event.target.value)}
                    placeholder="Linux、Windows 或 WSL 路径"
                    autoComplete="off"
                    spellCheck={false}
                  />
                  <Button
                    variant="outline"
                    icon={<IconFolderOpenOutlineRegular />}
                    disabled={disabled || !draft.distro}
                    onClick={() => setPicker(true)}
                  >
                    浏览
                  </Button>
                </div>
                <p>
                  {profile?.storage === "windows-mount"
                    ? "这是 Windows 挂载目录。依赖安装和频繁构建建议使用 Linux 主目录。"
                    : profile?.storage === "linux"
                      ? "Linux 文件系统 · 适合依赖安装、Git 和频繁构建"
                      : "支持粘贴 Windows 路径；连接后自动转换并记住。"}
                </p>
              </div>
            </div>
            {!!profile?.recentDirectories?.length && (
              <div className="dsh-wsl-recents" aria-label="最近使用的目录">
                <span>最近</span>
                {profile.recentDirectories.slice(0, 5).map((directory) => (
                  <button
                    key={directory}
                    type="button"
                    title={directory}
                    aria-label={`使用目录 ${directory}`}
                    className={
                      directory === draft.directory ? "is-selected" : ""
                    }
                    disabled={disabled}
                    onClick={() =>
                      task("directory", () =>
                        selectEnvironment({ ...chosen(), directory }),
                      )
                    }
                  >
                    <IconFolderOpenOutlineRegular size={14} />
                    <span>
                      {directory === "/"
                        ? "/"
                        : directory.split("/").filter(Boolean).pop()}
                    </span>
                  </button>
                ))}
              </div>
            )}
            {!wslHost && (
              <details className="dsh-wsl-advanced">
                <summary>
                  高级设置
                  <IconChevronDownOutlineRegular size={12} />
                </summary>
                <div className="dsh-wsl-user-field">
                  <label htmlFor="dsh-wsl-user">Linux 用户</label>
                  <Input
                    id="dsh-wsl-user"
                    value={draft.user}
                    disabled={disabled}
                    placeholder="默认用户"
                    autoComplete="off"
                    onChange={(event) => {
                      edit("user", event.target.value);
                      edit("directory", "");
                    }}
                  />
                  <p>每个用户独立记忆目录；切换不会停止其他用户的任务。</p>
                </div>
              </details>
            )}
            <div className="dsh-wsl-card-actions">
              <div className="dsh-wsl-action-primary">
                <Button
                  variant="outline"
                  type="submit"
                  disabled={disabled || !draft.distro}
                  icon={
                    busy === "connect" || busy === "switch" ? (
                      <StateDot state="ongoing" />
                    ) : linuxConnection && !dirty ? (
                      <StateDot state="done" />
                    ) : undefined
                  }
                >
                  {busy === "connect" || busy === "switch"
                    ? "正在连接…"
                    : dirty
                      ? "应用工作目录"
                      : linuxConnection
                        ? "已连接"
                        : "连接 WSL"}
                </Button>
                {wslHost && (
                  <Button
                    variant="ghost"
                    disabled={disabled}
                    onClick={() =>
                      task("windows", async () => {
                        await api("connect", { target: "windows" });
                        setNotice({ text: "Windows 互操作已就绪。" });
                      })
                    }
                  >
                    {windowsConnected ? "Windows 已连接" : "连接 Windows"}
                  </Button>
                )}
              </div>
              <Button
                variant="ghost"
                icon={<OpenIcon />}
                disabled={disabled || !draft.directory.trim()}
                onClick={() =>
                  task("open", async () => {
                    const result = await api("open", {
                      path: draft.directory.trim(),
                      distro: draft.distro,
                      user: draft.user,
                    });
                    if (result.exitCode !== 0)
                      throw new Error(
                        result.stderr || "Windows 无法打开此目录。",
                      );
                    setNotice({ text: "已在 Windows 中打开工作目录。" });
                  })
                }
              >
                在 Windows 中打开
              </Button>
            </div>
          </form>
        </div>
      </section>

      <div className="dsh-wsl-help">
        <IconFolderOpenOutlineRegular size={18} />
        <p>
          {wslHost
            ? "当前会话使用 Linux 原生工具。需要 Windows 文件、PowerShell 或剪贴板时，可以直接在对话中提出。"
            : "Windows 会话继续使用原生 Windows 工具；也能通过插件直接执行 Linux 命令或双向复制文件。完整 Linux 工作流可从上方进入。"}
        </p>
      </div>
      <details className="dsh-wsl-diagnostics">
        <summary>
          运行与连接管理
          <IconChevronDownOutlineRegular size={12} />
        </summary>
        <div className="dsh-wsl-diagnostics-body">
          <dl>
            <div>
              <dt>当前宿主</dt>
              <dd>{wslHost ? "Linux / WSL" : "Windows"}</dd>
            </div>
            <div>
              <dt>插件版本</dt>
              <dd>{state.version}</dd>
            </div>
            <div>
              <dt>活动连接</dt>
              <dd>
                {state.pool.connections.filter((c) => c.connected).length}
              </dd>
            </div>
            {linuxConnection && (
              <>
                <div>
                  <dt>Linux Node.js</dt>
                  <dd>{linuxConnection.info?.node}</dd>
                </div>
                <div>
                  <dt>Linux 主目录</dt>
                  <dd>{linuxConnection.info?.home}</dd>
                </div>
              </>
            )}
          </dl>
          {native.instances
            ?.filter((item) => item.running)
            .map((item) => (
              <div
                className="dsh-wsl-runtime-row"
                key={`${item.settings.distro}/${item.settings.user}`}
              >
                <div>
                  <strong>{item.settings.distro}</strong>
                  <span>{item.settings.user} · Linux DSH 运行中</span>
                </div>
                <Button
                  variant="outline"
                  disabled={disabled || item.preparing || item.starting}
                  onClick={() =>
                    setDialog({ kind: "stop", settings: item.settings })
                  }
                >
                  停止此环境
                </Button>
              </div>
            ))}
          {!wslHost && (
            <div className="dsh-wsl-runtime-row">
              <p>需要预先下载，或更新停止中的 Linux 环境时使用。</p>
              <Button
                variant="outline"
                disabled={disabled || activeWork || !!running || !draft.distro}
                onClick={() =>
                  task("prepare", async () => {
                    await api("native/prepare", chosen());
                  })
                }
              >
                准备环境
              </Button>
            </div>
          )}
          <div className="dsh-wsl-disconnect-row">
            <p>断开会结束桥接连接和后台任务。日常切换无需断开。</p>
            <Button
              variant="outline"
              disabled={
                disabled || activeWork || !state.pool.connections.length
              }
              onClick={() => setDialog({ kind: "disconnect" })}
            >
              断开全部连接
            </Button>
          </div>
        </div>
      </details>
      {picker && (
        <DirectoryPicker
          api={api}
          distro={draft.distro}
          user={draft.user}
          initialPath={draft.directory.trim()}
          onClose={() => setPicker(false)}
          onSelect={(directory) => {
            setPicker(false);
            void task("directory", () =>
              selectEnvironment({ ...chosen(), directory }),
            );
          }}
        />
      )}
      <Modal
        open={!!dialog}
        onClose={() => setDialog(null)}
        title={
          dialog?.kind === "stop" ? "停止这个 Linux 环境？" : "断开全部连接？"
        }
        closeLabel="关闭"
        description={
          dialog?.kind === "stop"
            ? "该 Linux DSH 中的任务会停止，其他环境继续运行。已保存的文件和会话会保留。"
            : "全部桥接任务和本插件启动的 Linux DSH 会停止。Windows DSH 和已保存的文件保留。"
        }
        footer={
          <>
            <Button onClick={() => setDialog(null)}>取消</Button>
            <Button
              variant="primary"
              onClick={() => {
                const action = dialog;
                setDialog(null);
                void task("stop", async () => {
                  await api(
                    action.kind === "stop" ? "native/stop" : "disconnect",
                    action.settings || {},
                  );
                  model.readyLink = null;
                  setNotice({
                    text:
                      action.kind === "stop"
                        ? "该 Linux 环境已停止。"
                        : "桥接连接已断开。",
                  });
                });
              }}
            >
              确认停止
            </Button>
          </>
        }
      />
    </div>
  );
}
