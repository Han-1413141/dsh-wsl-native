import React, { useEffect, useRef, useState } from 'react';
import { Button, Input, Modal, StateDot } from '@deepseek-ai/dsh-client-ui-primitives';
import { useModel } from './page.jsx';
import { conversationRows } from './conversation-protocol.mjs';
import { TerminalIcon } from './components.jsx';

export const iconPaths = {
  switch: 'M4 7h16m-4-4 4 4-4 4M20 17H4m4-4-4 4 4 4',
  search: 'M10.5 17a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13Zm5-1.5L21 21',
  filter: 'M4 6h16M7 12h10M10 18h4',
  plus: 'M12 4v16M4 12h16',
};
function Icon({ name }) {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={iconPaths[name]} /></svg>;
}
export function CompactConversationList({ ctx, model, wide, expandSidebar }) {
  useModel(model);
  const chat = model.conversations, local = chat.nativeCatalog();
  const [filter, setFilter] = useState('all'), [query, setQuery] = useState(''), [limit, setLimit] = useState(35);
  const [archived, setArchived] = useState(false), [menu, setMenu] = useState(null), [tools, setTools] = useState(null), [search, setSearch] = useState(false);
  const section = useRef(null), searchRef = useRef(null);
  useEffect(() => {
    if (!tools) return;
    const close = event => { if (!section.current?.contains(event.target) || event.key === 'Escape') setTools(null); };
    document.addEventListener('pointerdown', close); document.addEventListener('keydown', close);
    return () => { document.removeEventListener('pointerdown', close); document.removeEventListener('keydown', close); };
  }, [tools]);
  useEffect(() => { if (search) searchRef.current?.focus(); }, [search]);
  if (!wide) return <div className="dsh-wsl-chat-rail"><Button variant="ghost" icon={<TerminalIcon size={18} />} aria-label="展开对话列表" onClick={expandSidebar} /></div>;
  const rows = conversationRows(local, chat.entries.values(), { filter, query, archived });
  const choose = action => { if (window.matchMedia('(max-width:600px)').matches) ctx.layout.toggleSidebar(); action(); };
  const run = action => { const row = menu; setMenu(null); void chat.action(row, action); };
  return <section ref={section} className="dsh-wsl-conversations" aria-label="Windows 与 WSL 对话列表">
    <div className="dsh-wsl-compact-heading">
      <span>{archived ? '已归档' : filter === 'wsl' ? 'WSL 对话' : filter === 'windows' ? 'Windows 对话' : '对话'}</span>
      <button type="button" className="dsh-wsl-icon-button" aria-label="切换到原生工作区" title="切换到原生工作区" onClick={() => chat.setUnified(false)}><Icon name="switch" /></button>
      <div className="dsh-wsl-heading-actions">
        <button type="button" className="dsh-wsl-icon-button" aria-label="搜索对话" title="搜索对话" aria-expanded={search} onClick={() => { setSearch(!search); if (search) setQuery(''); setTools(null); }}><Icon name="search" /></button>
        <button type="button" className="dsh-wsl-icon-button" aria-label="筛选对话" title="筛选与归档" aria-expanded={tools === 'filter'} onClick={() => setTools(tools === 'filter' ? null : 'filter')}><Icon name="filter" /></button>
        <button type="button" className="dsh-wsl-icon-button" aria-label="新建 WSL 工作区" title="新建 WSL 工作区" onClick={() => chat.requestWorkspace()}><Icon name="plus" /></button>
      </div>
    </div>
    {tools && <div className="dsh-wsl-list-popover" role="group" aria-label="对话筛选">
      <>
        {[['all', '全部环境'], ['windows', 'Windows'], ['wsl', 'WSL']].map(([value, label]) => <button key={value} type="button" aria-pressed={filter === value} onClick={() => { setFilter(value); setLimit(35); setTools(null); }}>{label}{filter === value ? ' ✓' : ''}</button>)}
        <button type="button" className="dsh-wsl-menu-divider" aria-pressed={archived} onClick={() => { setArchived(!archived); setTools(null); }}>{archived ? '显示当前对话' : '显示已归档对话'}</button>
      </>
    </div>}
    {search && <Input ref={searchRef} aria-label="搜索对话或工作目录" placeholder="搜索对话或目录" value={query} onChange={event => { setQuery(event.target.value); setLimit(35); }} onKeyDown={event => { if (event.key === 'Escape') { setQuery(''); setSearch(false); } }} />}
    {chat.error && <div className="dsh-wsl-chat-list-error" role="alert">{chat.error}</div>}
    <div className="dsh-wsl-chat-rows" role="list" aria-label={archived ? '已归档对话' : '所有环境的对话'}>
      {rows.slice(0, limit).map(row => {
        const selected = row.environment ? chat.visible() && chat.activeKey === row.environment.key && row.environment.catalog.selectedId === row.id : !ctx.layout.panelInfo.getSnapshot().activePanelId && local.selectedId === row.id;
        return <div className={`dsh-wsl-chat-row${selected ? ' is-selected' : ''}`} role="listitem" key={row.key}>
          <button type="button" className="dsh-wsl-chat-row-open" aria-current={selected ? 'page' : undefined} disabled={archived} aria-label={`${row.environment ? 'WSL' : 'Windows'} 对话：${row.title}`} title={`${row.environment ? `WSL · ${row.environment.settings.distro}` : 'Windows'}\n${row.cwd}`} onClick={() => choose(() => void chat.openRow(row))}>
            <span className="dsh-wsl-chat-dot">{row.running ? <StateDot state="ongoing" /> : row.pinned ? '•' : null}</span>
            <span className="dsh-wsl-chat-row-text"><span>{row.title || '新对话'}</span></span>
            {row.environment && <span className="dsh-wsl-chat-mark" title={`WSL · ${row.environment.settings.distro}`}>WSL</span>}
          </button>
          <button type="button" className="dsh-wsl-chat-more" aria-label={`管理对话：${row.title}`} onClick={() => setMenu(row)}>⋯</button>
        </div>;
      })}
      {rows.length > limit && <Button variant="ghost" onClick={() => setLimit(limit + 35)}>显示更多（{rows.length - limit}）</Button>}
      {!rows.length && <div className="dsh-wsl-chat-empty">{query ? '没有匹配的对话' : archived ? '没有已归档对话' : '点击上方 Windows 或 WSL 开始对话'}</div>}
    </div>
    {chat.busy && <div className="dsh-wsl-chat-list-foot" role="status"><StateDot state="ongoing" />正在准备 WSL…</div>}
    <Modal open={!!menu} onClose={() => setMenu(null)} title={menu?.title || '管理对话'}>
      {menu && <div className="dsh-wsl-chat-menu"><p>{menu.environment ? `WSL · ${menu.environment.settings.distro}` : 'Windows'} · {menu.cwd}</p>
        {!menu.archived && <Button onClick={() => run(menu.pinned ? 'unpin' : 'pin')}>{menu.pinned ? '取消置顶' : '置顶对话'}</Button>}
        <Button onClick={() => run(menu.archived ? 'unarchive' : 'archive')}>{menu.archived ? '恢复对话' : '归档对话'}</Button>
        {!menu.archived && <Button onClick={() => { chat.requestHandoff({ id: menu.id, row: menu, entry: menu.environment || null }); setMenu(null); }}>交接工作…</Button>}
        {menu.environment?.url && <Button variant="ghost" onClick={() => { chat.closeView(menu.environment); setMenu(null); }}>关闭环境页面（保留后台任务）</Button>}
      </div>}
    </Modal>
  </section>;
}
