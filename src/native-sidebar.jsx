import React, { useMemo } from 'react';
import { MenuItemButton, IconPinOutlineRegular, IconArchiveOutlineRegular, IconEditOutlineRegular } from '@deepseek-ai/dsh-client-ui-primitives';
import { useModel } from './page.jsx';
import { projectWorkspaces, reorderWorkspace, remoteId } from './workspace-projection.mjs';
import { CONVERSATION_PANEL } from './conversation-protocol.mjs';

// Mirror child slots under an owned namespace. The original registrations and
// their authorization remain intact; no private renderer or entry is patched.
function mirrorChildren(ctx, children, prefix) {
  const declarations = Object.fromEntries(Object.entries(children || {}).map(([key, spec]) => [prefix + key, spec]));
  const releases = [];
  const start = () => {
    for (const key of Object.keys(children || {})) {
      let copies = [];
      const sync = () => {
        copies.splice(0).reverse().forEach(dispose => dispose());
        for (const entry of ctx.slots.entries(key)) {
          const nested = mirrorChildren(ctx, entry.children, prefix);
          const Component = entry.component;
          copies.push(ctx.slots.register({ ...entry.options, name: prefix + key,
            ...(entry.inject ? { inject: entry.inject } : {}), ...(entry.store ? { store: entry.store } : {}),
            ...(entry.locale ? { locale: entry.locale } : {}), ...(entry.children ? { children: nested.declarations } : {}) },
          entry.children ? props => <Component {...props} renderSlot={(name, owner, options) => props.renderSlot(prefix + name, owner, options)} /> : Component));
          if (entry.children) copies.push(nested.start());
        }
      };
      sync();
      releases.push(ctx.slots.subscribe(key, sync), () => copies.splice(0).reverse().forEach(dispose => dispose()));
    }
    return () => releases.splice(0).reverse().forEach(dispose => dispose());
  };
  return { declarations, start };
}

function NativeWorkspaceAdapter({ Native, ctx, model, prefix, ...props }) {
  useModel(model);
  const chat = model.conversations;
  const localSessions = props.useSessions(state => state), localWorkspaces = props.useWorkspaces(state => state);
  const localStatus = props.useSessionStatus(state => state), panelInfo = props.usePanelInfo(info => info);
  const entries = [...chat.entries.values()];
  const activeKey = chat.visible() ? chat.activeKey : null;
  // Catalogs retain their reference until the guest publishes a change.
  const projection = useMemo(() => projectWorkspaces(localSessions, localWorkspaces, localStatus, entries, activeKey, chat.workspaceOrder),
    [localSessions, localWorkspaces, localStatus, activeKey, chat.workspaceOrder, chat.catalogRevision]);
  const target = id => projection.targets.get(id);
  const attempt = action => void Promise.resolve().then(action).catch(error => { chat.error = error.message; model.emit(); });
  const selectLinux = entry => { chat.activeKey = entry.key; ctx.layout.selectPanel(CONVERSATION_PANEL); model.emit(); };
  const run = async (id, action, payload = {}) => {
    const item = target(id);
    if (!item) throw new Error('WSL 工作区已变化，请重试。');
    await chat.remote(item.entry, action, { [item.kind === 'workspace' ? 'workspaceId' : 'sessionId']: item.id, ...payload });
    if (action === 'workspace.start' || action === 'session.fork') selectLinux(item.entry);
  };
  const rename = (id, title) => target(id) ? chat.requestRename({ ...target(id), title }) : props.requestSessionRename(id, title);
  const archive = item => item.row.running
    ? (chat.dialog = { type: 'archive', target: item }, model.emit())
    : attempt(() => chat.remote(item.entry, 'archive', { sessionId: item.id }));
  const renderSlot = (name, owner, options) => {
    const item = target(owner.sessionId);
    if (!item) return props.renderSlot(prefix + name, owner, options);
    if (name === 'sidebar.workspaces.session.menu.item') {
      const choose = action => () => { options?.hookContext?.[1]?.(false); action(); };
      return <>
        {!item.row.archived && <MenuItemButton icon={<IconPinOutlineRegular />} onSelect={choose(() => attempt(() => run(owner.sessionId, item.row.pinned ? 'unpin' : 'pin')))}>{item.row.pinned ? '取消置顶' : '置顶对话'}</MenuItemButton>}
        <MenuItemButton icon={<IconEditOutlineRegular />} onSelect={choose(() => rename(owner.sessionId, owner.displayTitle))}>重命名</MenuItemButton>
        <MenuItemButton onSelect={choose(() => attempt(() => run(owner.sessionId, 'session.fork')))}>创建分支</MenuItemButton>
        <MenuItemButton onSelect={choose(() => chat.requestHandoff?.(item))}>交接工作…</MenuItemButton>
        <MenuItemButton icon={<IconArchiveOutlineRegular />} onSelect={choose(() => item.row.archived ? attempt(() => run(owner.sessionId, 'unarchive')) : archive(item))}>{item.row.archived ? '取消归档' : '归档对话'}</MenuItemButton>
      </>;
    }
    if (name === 'sidebar.workspaces.session.row.action' && !item.row.archived) return <>
      <button className="dsh-wsl-row-action" title="归档对话" aria-label="归档 WSL 对话" onClick={() => archive(item)}><IconArchiveOutlineRegular size={14} /></button>
      <button className="dsh-wsl-row-action" title={item.row.pinned ? '取消置顶' : '置顶对话'} aria-label={item.row.pinned ? '取消置顶 WSL 对话' : '置顶 WSL 对话'} onClick={() => attempt(() => run(owner.sessionId, item.row.pinned ? 'unpin' : 'pin'))}><IconPinOutlineRegular size={14} /></button>
    </>;
    if (name === 'sidebar.session.row.hover') return <div className="dsh-wsl-caption">WSL · {item.entry.settings.distro} · {item.entry.settings.user || '默认用户'}</div>;
    return null;
  };
  return <Native {...props}
    useSessions={selector => selector(projection.sessions)} useWorkspaces={selector => selector(projection.workspaces)}
    useSessionStatus={selector => selector(projection.status)}
    usePanelInfo={selector => selector(activeKey ? { ...panelInfo, activePanelId: null } : panelInfo)}
    startSession={id => target(id) ? attempt(() => run(id, 'workspace.start')) : void chat.newWindows(id)}
    open={id => target(id) ? void chat.openRow({ ...target(id).row, environment: target(id).entry }) : props.open(id)}
    requestSessionRename={rename}
    renameWorkspace={(id, title) => target(id) ? run(id, 'workspace.rename', { title }) : props.renameWorkspace(id, title)}
    deleteWorkspace={id => target(id) ? run(id, 'workspace.delete') : props.deleteWorkspace(id)}
    insertWorkspaceBefore={async (id, before) => {
      if (id === before) return;
      const reordered = reorderWorkspace(projection.workspaces.items, projection.targets, id, before);
      if (target(id)) await run(id, 'workspace.reorder', { beforeId: reordered.beforeId });
      else await props.insertWorkspaceBefore(id, reordered.beforeId);
      chat.setWorkspaceOrder(reordered.order);
    }}
    unarchiveSession={id => target(id) ? run(id, 'unarchive') : props.unarchiveSession(id)}
    searchSessions={async (query, signal) => {
      const results = await Promise.all([props.searchSessions(query, signal), ...entries.filter(entry => entry.ready).map(async entry => {
        const value = await chat.remote(entry, 'search', { query });
        return { ...value, items: value.items.map(item => ({ ...item, sessionId: remoteId(entry, 'session', item.sessionId) })) };
      })]);
      if (signal?.aborted) throw new DOMException('搜索已取消', 'AbortError');
      const items = results.flatMap(result => result.items);
      return { items: items.slice(0, props.searchResultLimit), hasMore: items.length > props.searchResultLimit || results.some(result => result.hasMore) };
    }} renderSlot={renderSlot} />;
}

export function installNativeSidebar(ctx, model) {
  let release, native, busy = false;
  const sync = () => {
    if (busy) return;
    busy = true;
    try {
      const candidate = ctx.slots.entries('sidebar.workspaces').find(entry => entry.locale === 'workspace' && entry.children?.['sidebar.workspaces.directoryFlow']);
      const enabled = model.state?.mode === 'windows-host';
      if (native === candidate && !!release === !!enabled) return;
      release?.(); release = null; native = candidate;
      if (!enabled || !candidate) return;
      const prefix = 'dsh-wsl-native.';
      const mirror = mirrorChildren(ctx, candidate.children, prefix);
      const dispose = ctx.slots.register({ name: 'sidebar.workspaces', priority: -60, inject: candidate.inject,
        store: candidate.store, locale: candidate.locale, children: mirror.declarations },
      props => <NativeWorkspaceAdapter {...props} Native={candidate.component} ctx={ctx} model={model} prefix={prefix} />);
      const stopMirror = mirror.start();
      release = () => { stopMirror(); dispose(); };
    } finally { busy = false; }
  };
  const offModel = model.subscribe(sync), offSlot = ctx.slots.subscribe('sidebar.workspaces', sync);
  sync();
  return () => { offModel(); offSlot(); release?.(); };
}
