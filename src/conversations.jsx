import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Button, Input, Modal, StateDot, IconPanelLeftOutlineRegular } from '@deepseek-ai/dsh-client-ui-primitives';
import { TerminalIcon, SystemIcon } from './components.jsx';
import { useModel } from './page.jsx';
import { conversationRows, CONVERSATION_PANEL } from './conversation-protocol.mjs';
import { appOrigin } from './handoff.mjs';
import { mountDesktopView } from './desktop-view.mjs';

function WslMark({ distro, connected = true }) {
  return <span className={`dsh-wsl-chat-mark${connected ? '' : ' is-offline'}`} title={`WSL · ${distro || 'Linux'}`}><TerminalIcon size={12} />WSL</span>;
}

export function ConversationList({ ctx, model, wide, expandSidebar }) {
  useModel(model);
  const chat = model.conversations;
  const [filter, setFilter] = useState('all'), [query, setQuery] = useState(''), [limit, setLimit] = useState(35);
  const [archived, setArchived] = useState(false), [menu, setMenu] = useState(null);
  const local = chat.nativeCatalog();
  const rows = conversationRows(local, chat.entries.values(), { filter, query, archived });
  const active = chat.entries.get(chat.activeKey);
  if (!wide) return <div className="dsh-wsl-chat-rail"><Button variant="ghost" icon={<TerminalIcon size={18} />} aria-label="展开 Windows 与 WSL 对话列表" onClick={expandSidebar} /></div>;
  const runAction = action => { const row = menu; setMenu(null); void chat.action(row, action); };
  const choose = action => { if (window.matchMedia('(max-width:600px)').matches) ctx.layout.toggleSidebar(); action(); };
  const showNew = action => { setArchived(false); setFilter('all'); setQuery(''); setLimit(35); choose(action); };
  return <section className="dsh-wsl-conversations" aria-label="Windows 与 WSL 对话列表">
    <div className="dsh-wsl-chat-list-heading"><span>对话</span><div>
      <Button variant="ghost" title="打开原生工作区视图" aria-label="打开原生工作区视图" onClick={() => { chat.setUnified(false); chat.showWindows(); }}>工作区</Button>
      <Button variant="ghost" title={archived ? '显示当前对话' : '显示已归档对话'} aria-label={archived ? '显示当前对话' : '显示已归档对话'} onClick={() => setArchived(!archived)}>{archived ? '返回' : '归档'}</Button>
    </div></div>
    <div className="dsh-wsl-chat-filters" role="group" aria-label="按环境筛选对话">
      {[['all', '全部'], ['windows', 'Windows'], ['wsl', 'WSL']].map(([value, label]) => <button key={value} type="button" aria-pressed={filter === value} onClick={() => { setFilter(value); setLimit(35); }}>{label}</button>)}
    </div>
    <Input aria-label="搜索对话或工作目录" placeholder="搜索对话或目录" value={query} onChange={event => { setQuery(event.target.value); setLimit(35); }} />
    <div className="dsh-wsl-chat-new"><Button variant="ghost" onClick={() => showNew(() => chat.newWindows())} aria-label="新建 Windows 对话"><SystemIcon size={14} />Windows ＋</Button>
      <Button variant="ghost" disabled={chat.busy} onClick={() => showNew(() => void chat.newLinux(active))} aria-label="新建 WSL 对话"><TerminalIcon size={14} />WSL ＋</Button></div>
    {chat.error && <div className="dsh-wsl-chat-list-error" role="alert">{chat.error}</div>}
    <div className="dsh-wsl-chat-rows" role="list" aria-label={archived ? '已归档对话' : '所有环境的对话'}>
      {rows.slice(0, limit).map(row => {
        const selected = row.environment ? chat.visible() && chat.activeKey === row.environment.key && row.environment.catalog.selectedId === row.id :
          !ctx.layout.panelInfo.getSnapshot().activePanelId && local.selectedId === row.id;
        return <div className={`dsh-wsl-chat-row${selected ? ' is-selected' : ''}`} role="listitem" key={row.key}>
          <button type="button" className="dsh-wsl-chat-row-open" aria-current={selected ? 'page' : undefined} disabled={archived}
            aria-label={`${row.environment ? 'WSL' : 'Windows'} 对话：${row.title}`} title={`${row.environment ? `WSL · ${row.environment.settings.distro}` : 'Windows'}\n${row.cwd}`}
            onClick={() => choose(() => void chat.openRow(row))}>
            <span className="dsh-wsl-chat-dot">{row.running ? <StateDot state="ongoing" /> : row.pinned ? '•' : null}</span>
            <span className="dsh-wsl-chat-row-text"><span>{row.title || '新对话'}</span><small>{row.cwd.split(/[\\/]/).filter(Boolean).at(-1) || row.workspaceTitle}</small></span>
            {row.environment && <WslMark distro={row.environment.settings.distro} connected={row.environment.ready && row.environment.catalog.connected} />}
          </button>
          <button type="button" className="dsh-wsl-chat-more" aria-label={`管理对话：${row.title}`} onClick={() => setMenu(row)}>⋯</button>
        </div>;
      })}
      {rows.length > limit && <Button variant="ghost" onClick={() => setLimit(limit + 35)}>显示更多（{rows.length - limit}）</Button>}
      {!rows.length && <div className="dsh-wsl-chat-empty">{query ? '没有匹配的对话' : archived ? '没有已归档对话' : filter === 'wsl' ? '点击 WSL ＋，在这里开始 Linux 对话。' : '选择环境，开始新对话。'}</div>}
    </div>
    <div className="dsh-wsl-chat-list-foot">{chat.busy ? <><StateDot state="ongoing" />正在准备 WSL…</> : '两边的任务可同时运行'}</div>
    <Modal open={!!menu} onClose={() => setMenu(null)} title={menu?.title || '管理对话'}>
      {menu && <div className="dsh-wsl-chat-menu">
        <p>{menu.environment ? `WSL · ${menu.environment.settings.distro}` : 'Windows'} · {menu.cwd}</p>
        {!menu.archived && <Button onClick={() => runAction(menu.pinned ? 'unpin' : 'pin')}>{menu.pinned ? '取消置顶' : '置顶对话'}</Button>}
        <Button onClick={() => runAction(menu.archived ? 'unarchive' : 'archive')}>{menu.archived ? '恢复对话' : '归档对话'}</Button>
        {menu.environment?.url && <Button variant="ghost" onClick={() => { chat.closeView(menu.environment); setMenu(null); }}>关闭这个环境的页面（保留后台任务）</Button>}
        <Button variant="ghost" onClick={() => setMenu(null)}>取消</Button>
      </div>}
    </Modal>
  </section>;
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
  const chat = model.conversations, [late, setLate] = useState(false);
  useEffect(() => { const timer = setTimeout(() => setLate(true), 45000); return () => clearTimeout(timer); }, [entry.channel]);
  const selected = entry.catalog?.rows.find(row => row.id === entry.catalog.selectedId);
  return <section className="dsh-wsl-resident" aria-label={`WSL · ${entry.settings.distro} 对话`}
    aria-hidden={!visible} inert={!visible} style={visible && rect ? { top: rect.top, left: rect.left, width: rect.width, height: rect.height } : { visibility: 'hidden', left: -20000, top: 0, width: rect?.width || 1000, height: rect?.height || 800 }}>
    <header className="dsh-wsl-chat-toolbar">
      <Button variant="ghost" icon={<IconPanelLeftOutlineRegular />} aria-label="展开或收起对话列表" title="展开或收起对话列表" onClick={() => ctx.layout.toggleSidebar()} />
      <WslMark distro={entry.settings.distro} connected={entry.catalog?.connected} /><span className="dsh-wsl-chat-context" title={selected?.cwd || entry.settings.directory}>{entry.settings.distro}<span> · {selected?.cwd?.split('/').filter(Boolean).at(-1) || 'Linux'}</span></span>
      <div className="dsh-wsl-chat-toolbar-actions"><Button variant="ghost" disabled={!entry.ready || chat.busy} onClick={() => void chat.newLinux(entry)}>新对话</Button>
        <Button variant="ghost" disabled={!entry.ready} title="Linux 设置、插件与工作区" onClick={() => chat.toggleChrome(entry)}>{entry.compact ? 'Linux 设置' : '收起侧栏'}</Button></div>
    </header>
    {chat.error && visible && <div role="alert" className="dsh-wsl-chat-notice">{chat.error}</div>}
    {entry.ready && !entry.catalog?.connected && <div role="status" className="dsh-wsl-chat-notice">WSL 连接已中断，恢复连接后可继续使用。<Button variant="ghost" disabled={chat.busy} onClick={() => chat.reconnect(entry)}>重新连接</Button></div>}
    <div className="dsh-wsl-chat-frame-body">
      {entry.transport === 'desktop' ? <DesktopSurface entry={entry} model={model} visible={visible} /> :
        <iframe key={entry.channel} title={`WSL ${entry.settings.distro} 原生 DSH 对话`} src={entry.url} ref={element => chat.bind(entry, element)} inert={!visible || !!entry.navigating}
          referrerPolicy="no-referrer" allow="clipboard-read; clipboard-write" style={{ visibility: visible && entry.ready ? 'visible' : 'hidden' }} />}
      {!entry.ready && <div className="dsh-wsl-chat-loading"><StateDot state="ongoing" /><span>{late ? 'WSL 对话尚未连接。可以重新连接，或查看环境中的启动状态。' : '正在打开 Linux 对话…'}</span>
        {late && <Button onClick={() => chat.reconnect(entry)}>重新连接</Button>}
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
    frame.toggleAttribute('data-dsh-wsl-embedded', compact);
    const update = () => {
      const match = /minmax\(0px,\s*([\d.]+px)\)\s*$/.exec(frame.style.gridTemplateColumns);
      const width = match?.[1] || '0px';
      if (frame.style.getPropertyValue('--dsh-wsl-right-track') !== width) frame.style.setProperty('--dsh-wsl-right-track', width);
    };
    const observer = new MutationObserver(update); observer.observe(frame, { attributes: true, attributeFilter: ['style'] }); update();
    return () => { observer.disconnect(); frame.removeAttribute('data-dsh-wsl-embedded'); frame.style.removeProperty('--dsh-wsl-right-track'); };
  }, [model.guest, compact]);
  return <span ref={ref} />;
}

export function installConversationSlots(ctx, model) {
  ctx.slots.inject('main', () => ctx.slots.register({ name: 'main', key: CONVERSATION_PANEL }, () => <ConversationTarget ctx={ctx} model={model} />));
  ctx.slots.inject('shell.overlay', () => ctx.slots.register({ name: 'shell.overlay', id: 'dsh-wsl-conversations', order: 15 }, () => <><ConversationFrames ctx={ctx} model={model} /><GuestChrome model={model} /></>));
  ctx.slots.inject('sidebar.workspaces', () => {
    let dispose;
    const sync = () => {
      const enabled = model.state?.mode === 'windows-host' && !!appOrigin(location.origin) && model.conversations?.unified;
      if (enabled && !dispose) dispose = ctx.slots.register({ name: 'sidebar.workspaces', priority: -80 }, props => <ConversationList {...props} ctx={ctx} model={model} />);
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
