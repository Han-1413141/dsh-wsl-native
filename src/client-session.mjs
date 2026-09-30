import { appOrigin, readHandoff } from "./handoff.mjs";
import { readEmbed } from "./conversation-protocol.mjs";
import { startConversationGuest } from "./conversation-guest.mjs";

const PREFIX = "dsh-wsl-native:";
export function stored(key, value, storage = sessionStorage) {
  try {
    if (value === undefined)
      return JSON.parse(storage.getItem(PREFIX + key) || "null");
    if (value === null) storage.removeItem(PREFIX + key);
    else storage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    /* Private browsing/storage limits do not prevent working. */
  }
  return null;
}
function ready(source, signal) {
  if (source.getSnapshot().phase === "ready") return Promise.resolve();
  return new Promise((resolve, reject) => {
    let dispose = () => {},
      timer;
    const finish = (error) => {
      dispose();
      clearTimeout(timer);
      signal?.removeEventListener("abort", abort);
      error ? reject(error) : resolve();
    };
    const abort = () => finish(new Error("工作区打开已取消。"));
    dispose = source.subscribe(() => {
      if (source.getSnapshot().phase === "ready") finish();
    });
    timer = setTimeout(
      () => finish(new Error("DSH 工作区仍在加载，请稍后重试。")),
      30000,
    );
    signal?.addEventListener("abort", abort, { once: true });
    if (signal?.aborted) abort();
    else if (source.getSnapshot().phase === "ready") finish();
  });
}
export async function openProject(ctx, directory, signal) {
  await Promise.all([
    ready(ctx.workspaces.list, signal),
    ready(ctx.sessions.list, signal),
  ]);
  if (signal?.aborted) return false;
  const navigation = ctx.layout.beginNavigation();
  const workspace = await ctx.workspaces.create({ path: directory });
  await ctx.sessions.refresh();
  if (signal?.aborted || navigation.aborted) return false;
  const { byId } = ctx.sessions.list.getSnapshot();
  const archived = ctx.workspaces.list.getSnapshot().archivedSessionIds;
  const choices = workspace.sessionIds
    .map((id) => byId[id])
    .filter(
      (item) =>
        item &&
        !item.parentId &&
        !archived.includes(item.id) &&
        item.cwd === workspace.path,
    );
  const saved = stored("selection", undefined, localStorage)?.[workspace.path];
  const selected =
    choices.find((item) => item.id === saved) ??
    choices.sort((a, b) => b.updatedAt - a.updatedAt)[0];
  if (selected) ctx.uiWorkspace.openSession(selected.id);
  else await ctx.uiWorkspace.openWorkspace(workspace.workspaceId);
  return true;
}

export function createClientModel(ctx, api) {
  const listeners = new Set();
  let refreshPromise,
    disposed = false,
    booting = false,
    lastSelection;
  const model = {
    state: null,
    error: null,
    draft: null,
    pending: stored("pending"),
    popup: null,
    parentOrigin: appOrigin(stored("parentOrigin")),
    readyLink: null,
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    emit() {
      if (!disposed) for (const listener of listeners) listener();
    },
    async refresh() {
      if (refreshPromise) return refreshPromise;
      refreshPromise = api("status")
        .then((state) => {
          if (!disposed) {
            model.state = state;
            model.error = null;
            model.parentOrigin ||= state.parentOrigin;
            model.emit();
          }
          return state;
        })
        .catch((error) => {
          model.error = error.message;
          model.emit();
          throw error;
        })
        .finally(() => {
          refreshPromise = null;
        });
      return refreshPromise;
    },
    setPending(pending) {
      model.pending = pending;
      stored("pending", pending);
      model.emit();
    },
    remember() {
      const catalog = ctx.sessions.list.getSnapshot();
      const current = catalog.ids
        .map((id) => catalog.byId[id])
        .find(
          (row) => row?.retainedBy?.mainView > 0 && row.cwd && !row.parentId,
        );
      if (!current || lastSelection === current.id) return;
      lastSelection = current.id;
      const selections = stored("selection", undefined, localStorage) || {};
      const next = Object.fromEntries(
        [
          [current.cwd, current.id],
          ...Object.entries(selections).filter(([key]) => key !== current.cwd),
        ].slice(0, 64),
      );
      stored("selection", next, localStorage);
    },
    async adopt() {
      const handoff = readHandoff(window.location.hash);
      const embed = readEmbed(window.location.hash);
      if (!handoff || booting || (stored("arrived") === handoff.id && !embed)) return;
      booting = true;
      try {
        const state = model.state || (await model.refresh());
        if (
          state.mode !== "wsl-host" ||
          !state.distros.some((d) => d.name === handoff.distro)
        )
          throw new Error("目标 DSH 与选定的 Linux 环境不一致。");
        const result = await api("environment/adopt", handoff);
        if (handoff.parentOrigin) {
          model.parentOrigin = handoff.parentOrigin;
          stored("parentOrigin", handoff.parentOrigin);
        }
        if (
          await openProject(ctx, result.settings.directory, lifetime.signal)
        ) {
          stored("arrived", handoff.id);
          if (embed) startConversationGuest(ctx, model, api, embed);
          history.replaceState(
            history.state,
            "",
            window.location.pathname + window.location.search,
          );
          await model.refresh();
        }
      } catch (error) {
        model.error = error.message;
        model.emit();
        if (!disposed) ctx.layout.selectPanel("dsh-wsl-native");
      } finally {
        booting = false;
      }
    },
  };
  const lifetime = new AbortController();
  const reset = () => {
    void model
      .refresh()
      .then(() => model.adopt())
      .catch(() => {});
  };
  const stopReset = ctx.on("connection/reset", reset);
  const stopSessions = ctx.sessions.list.subscribe(() => model.remember());
  window.addEventListener("hashchange", model.adopt);
  window.addEventListener("focus", reset);
  reset();
  model.dispose = () => {
    disposed = true;
    model.guest?.dispose();
    model.conversations?.dispose();
    lifetime.abort();
    stopReset();
    stopSessions();
    window.removeEventListener("hashchange", model.adopt);
    window.removeEventListener("focus", reset);
    listeners.clear();
  };
  return model;
}
