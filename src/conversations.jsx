import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Button, MenuItemButton, StateDot, IconPanelLeftOutlineRegular } from '@deepseek-ai/dsh-client-ui-primitives';
import { TerminalIcon } from './components.jsx';
import { useModel } from './page.jsx';
import { CONVERSATION_PANEL } from './conversation-protocol.mjs';
import { appOrigin } from './handoff.mjs';
import { mountDesktopView } from './desktop-view.mjs';
import { CompactConversationList } from './sidebar.jsx';
import { installNativeWorkspaces } from './native-workspaces.mjs';
import { installNativeSidebar } from './native-sidebar.jsx';
import { WorkspaceDialogs } from './workspace-dialogs.jsx';
import { bindHandoffDraft } from './work-handoff.mjs';

function HandoffDraftBinding({ ctx, sessionId, useStore, actions }) {
  const draft = useStore(state => state.draft), latest = useRef(draft);
  latest.current = draft;
  useEffect(() => bindHandoffDraft(ctx, sessionId, {
    getDraft: () => latest.current,
    setDraft: text => { latest.current = text; actions.setDraft(text); },
  }), [ctx, sessionId, actions]);
  return null;
}

function WslMark({ distro, connected = true }) {
  return <span className={`dsh-wsl-chat-mark${connected ? '' : ' is-offline'}`} title={`WSL · ${distro || 'Linux'}`}><TerminalIcon size={12} />WSL</span>;
}

export function ConversationTarget({ ctx, model }) {
  useModel(model);
  const ref = useRef(null), chat = model.conversations;
  const ready = chat.entries.get(chat.activeKey)?.ready;
  useLayoutEffect(() => { chat.setAnchor(ref.current); return () => chat.setAnchor(null); }, [chat]);
  return <div className="dsh-wsl-chat-target" ref={ref}>
    {!ready && <div className="dsh-wsl-chat-loading"><StateDot state="ongoing" />正在连接 WSL 对话…
      <Button variant="ghost" onClick={() => ctx.layout.selectPanel('dsh-wsl-native')}>查看环境</Button>
      <Button variant="ghost" onClick={() => chat.showWindows()}>返回 Windows 对话</Button>
    </div>}
  </div>;
}

function DesktopSurface({ entry, model, visible }) {
  const host = useRef(null);
  useEffect(() => {
    const chat = model.conversations;
    const adapter = mountDesktopView({ host: host.current, entry, bridge: window.dshDesktop?.browser,
      onMessage: message => chat.desktopMessage(entry, message), onError: error => chat.desktopError(entry, error) });
    entry.desktop = adapter;
    return () => { adapter.dispose(); if (entry.desktop === adapter) entry.desktop = null; };
  }, [entry, model]);
  return <div className="dsh-wsl-desktop-surface" ref={host} inert={!visible || !!entry.navigating}
    style={{ visibility: visible && entry.ready ? 'visible' : 'hidden' }} />;
}

function ResidentFrame({ entry, model, visible, rect, ctx }) {
  const chat = model.conversations;
  useEffect(() => {
    if (entry.ready || ['waiting', 'failed'].includes(entry.recovery?.phase)) return;
    const timer = setTimeout(() => chat.desktopError(entry, new Error('WSL 对话连接超时。')), 45000);
    return () => clearTimeout(timer);
  }, [entry, entry.ready, entry.recovery, chat]);
  const failed = entry.recovery?.phase === 'failed';
  const selected = entry.catalog?.rows.find(row => row.id === entry.catalog.selectedId);
  return <section className="dsh-wsl-resident" aria-label={`WSL · ${entry.settings.distro} 对话`}
    aria-hidden={!visible} inert={!visible} style={visible && rect ? { top: rect.top, left: rect.left, width: rect.width, height: rect.height } : { visibility: 'hidden', left: -20000, top: 0, width: rect?.width || 1000, height: rect?.height || 800 }}>
    <header className="dsh-wsl-chat-toolbar">
      <Button variant="ghost" icon={<IconPanelLeftOutlineRegular />} aria-label="展开或收起对话列表" title="展开或收起对话列表" onClick={() => ctx.layout.toggleSidebar()} />
      <WslMark distro={entry.settings.distro} connected={entry.catalog?.connected} /><span className="dsh-wsl-chat-context" title={selected?.cwd || entry.settings.directory}>{entry.settings.distro}<span> · {selected?.cwd?.split('/').filter(Boolean).at(-1) || 'Linux'}</span></span>
      <div className="dsh-wsl-chat-toolbar-actions"><Button variant="ghost" onClick={() => void chat.newLinux(entry)}>新对话</Button>
        <Button variant="ghost" disabled={!entry.ready || !selected} onClick={() => chat.requestHandoff({ entry, id: selected.id, row: selected })}>交接工作</Button>
        <Button variant="ghost" disabled={!entry.ready} title="管理 Linux 插件与配置" onClick={() => chat.toggleChrome(entry)}>{entry.configOpen ? '返回对话' : 'Linux 配置'}</Button></div>
    </header>
    {chat.error && visible && <div role="alert" className="dsh-wsl-chat-notice">{chat.error}</div>}
    <div className="dsh-wsl-chat-frame-body">
      {entry.transport === 'desktop' ? <DesktopSurface entry={entry} model={model} visible={visible} /> :
        <iframe key={entry.channel} title={`WSL ${entry.settings.distro} 原生 DSH 对话`} src={entry.url} ref={element => chat.bind(entry, element)} inert={!visible || !!entry.navigating}
          onError={() => chat.desktopError(entry, new Error('WSL 页面加载失败。'))}
          referrerPolicy="no-referrer" allow="clipboard-read; clipboard-write" style={{ visibility: visible && entry.ready ? 'visible' : 'hidden' }} />}
      {!entry.ready && <div className="dsh-wsl-chat-loading" role="status">{!failed && <StateDot state="ongoing" />}<span>{entry.recovery?.message || '正在打开 Linux 对话…'}{entry.recovery && !failed ? ` (${entry.recovery.attempt}/3)` : ''}</span>
        {failed && <Button onClick={() => chat.reconnect(entry)}>重新连接</Button>}
        <Button variant="ghost" onClick={() => chat.showWindows()}>返回 Windows</Button></div>}
    </div>
  </section>;
}

export function ConversationFrames({ ctx, model }) {
  useModel(model);
  const [rect, setRect] = useState(null), chat = model.conversations;
  const visible = chat?.visible(), anchor = chat?.anchor;
  useLayoutEffect(() => {
    if (!anchor) return;
    let raf;
    const measure = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => {
      const box = anchor.getBoundingClientRect();
      setRect({ top: box.top, left: box.left, width: Math.max(0, document.documentElement.clientWidth - box.left), height: box.height });
    }); };
    const observer = new ResizeObserver(measure); observer.observe(anchor);
    window.addEventListener('resize', measure); measure();
    return () => { observer.disconnect(); window.removeEventListener('resize', measure); cancelAnimationFrame(raf); };
  }, [anchor]);
  useEffect(() => {
    document.documentElement.toggleAttribute('data-dsh-wsl-conversation', !!visible);
    return () => document.documentElement.removeAttribute('data-dsh-wsl-conversation');
  }, [visible]);
  if (model.state?.mode !== 'windows-host' || !chat) return null;
  return <>{[...chat.entries.values()].filter(entry => entry.url).map(entry => <ResidentFrame key={entry.key + entry.channel} entry={entry} model={model} ctx={ctx}
    visible={!!visible && !!anchor && chat.activeKey === entry.key} rect={rect} />)}</>;
}

export function GuestChrome({ model }) {
  useModel(model);
  const ref = useRef(null), compact = model.guest?.compact === true;
  useLayoutEffect(() => {
    const frame = ref.current?.closest('[data-shell-overlay]')?.parentElement;
    if (!frame || !model.guest) return;
    const right = frame.querySelector(':scope > [data-rightbar-col]');
    const center = right?.previousElementSibling, sidebar = center?.previousElementSibling;
    sidebar?.setAttribute('data-dsh-wsl-guest-sidebar', '');
    center?.setAttribute('data-dsh-wsl-guest-center', '');
    frame.toggleAttribute('data-dsh-wsl-embedded', compact);
    const update = () => {
      const match = /minmax\(0px,\s*([\d.]+px)\)\s*$/.exec(frame.style.gridTemplateColumns);
      const width = match?.[1] || '0px';
      if (frame.style.getPropertyValue('--dsh-wsl-right-track') !== width) frame.style.setProperty('--dsh-wsl-right-track', width);
    };
    const observer = new MutationObserver(update); observer.observe(frame, { attributes: true, attributeFilter: ['style'] }); update();
    return () => { observer.disconnect(); frame.removeAttribute('data-dsh-wsl-embedded'); frame.style.removeProperty('--dsh-wsl-right-track'); sidebar?.removeAttribute('data-dsh-wsl-guest-sidebar'); center?.removeAttribute('data-dsh-wsl-guest-center'); };
  }, [model.guest, compact]);
  return <span ref={ref} />;
}

export function installConversationSlots(ctx, model, api) {
  ctx.slots.inject('conversation.input.dock', () => {
    const native = ctx.slots.entries('conversation.session').find(entry => entry.store?.spec?.persist === 'dsh.conversation');
    if (!native) return;
    return ctx.slots.register({ name: 'conversation.input.dock', id: 'dsh-wsl-handoff-draft', store: native.store }, props => <HandoffDraftBinding {...props} ctx={ctx} />);
  });
  ctx.effect(() => installNativeWorkspaces(ctx, model));
  ctx.effect(() => installNativeSidebar(ctx, model));
  ctx.slots.inject('sidebar.workspaces.session.menu.item', () => ctx.slots.register({ name: 'sidebar.workspaces.session.menu.item', id: 'dsh-wsl-handoff', order: 350 }, props => {
    const [, closeMenu] = props.useMenuOpenState();
    if (model.state?.mode !== 'windows-host' || model.guest) return null;
    return <MenuItemButton onSelect={() => {
      closeMenu(false);
      const row = model.conversations.nativeCatalog().rows.find(row => row.id === props.sessionId);
      if (row) model.conversations.requestHandoff({ id: row.id, row });
    }}>交接工作…</MenuItemButton>;
  }));
  ctx.slots.inject('main', () => ctx.slots.register({ name: 'main', key: CONVERSATION_PANEL }, () => <ConversationTarget ctx={ctx} model={model} />));
  ctx.slots.inject('shell.overlay', () => ctx.slots.register({ name: 'shell.overlay', id: 'dsh-wsl-conversations', order: 15 }, () => <><ConversationFrames ctx={ctx} model={model} /><GuestChrome model={model} /><WorkspaceDialogs model={model} api={api} ctx={ctx} /></>));
  ctx.slots.inject('sidebar.workspaces', () => {
    let dispose;
    const sync = () => {
      const enabled = model.state?.mode === 'windows-host' && !!appOrigin(location.origin) && model.conversations?.unified;
      if (enabled && !dispose) dispose = ctx.slots.register({ name: 'sidebar.workspaces', priority: -80 }, props => <CompactConversationList {...props} ctx={ctx} model={model} />);
      else if (!enabled && dispose) { dispose(); dispose = null; }
    };
    const unsubscribe = model.subscribe(sync); sync();
    return () => { unsubscribe(); dispose?.(); };
  });
  ctx.slots.inject('conversation.session.header.actions', () => ctx.slots.register({ name: 'conversation.session.header.actions', id: 'dsh-wsl-environment', order: 5 }, () => {
    useModel(model);
    return model.state?.mode === 'wsl-host' && !model.guest ? <WslMark distro={model.state.settings.distro} /> : null;
  }));
}
