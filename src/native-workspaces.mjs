import { conversationRows } from './conversation-protocol.mjs';

export function remoteWorkspaceGroups(environments, query = '') {
  const groups = new Map();
  for (const row of conversationRows(null, environments, { filter: 'wsl', query })) {
    const key = JSON.stringify([row.environment.key, row.workspaceId || row.cwd]);
    if (!groups.has(key)) groups.set(key, { key, environment: row.environment, path: row.cwd,
      title: row.workspaceTitle || row.cwd.split('/').filter(Boolean).at(-1) || 'Linux', rows: [] });
    groups.get(key).rows.push(row);
  }
  return [...groups.values()].sort((a, b) => Number(b.rows.some(r => r.running)) - Number(a.rows.some(r => r.running)) || a.title.localeCompare(b.title));
}

// Only header affordances and badges need DOM augmentation: the tree itself
// is rendered by DSH. Every owned node and attribute is removed on disposal.
export function installNativeWorkspaces(ctx, model) {
  const doc = document;
  let observer, sidebar, scheduled, disposed = false, originalButton;
  const button = (label, cls, icon, action) => {
    const node = doc.createElement('button'); node.type = 'button'; node.className = cls;
    node.title = label; node.setAttribute('aria-label', label);
    const svg = doc.createElementNS('http://www.w3.org/2000/svg', 'svg');
    for (const [key, value] of Object.entries({ width: '16', height: '16', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'aria-hidden': 'true' })) svg.setAttribute(key, value);
    const path = doc.createElementNS(svg.namespaceURI, 'path'); path.setAttribute('d', icon); svg.append(path); node.append(svg);
    node.addEventListener('click', action); return node;
  };
  const toggle = button('切换到紧凑对话列表', 'dsh-wsl-icon-button dsh-wsl-native-toggle', 'M4 7h16m-4-4 4 4-4 4M20 17H4m4-4-4 4 4 4', () => model.conversations.setUnified(true));
  const add = button('新建 WSL 工作区', 'dsh-wsl-icon-button dsh-wsl-add-workspace', 'M3 7V5h6l2 2h10v13H3V7m9 4v6m-3-3h6', () => model.conversations.requestWorkspace());
  const addMark = doc.createElement('span'); addMark.textContent = 'WSL'; addMark.setAttribute('aria-hidden', 'true'); add.append(addMark);
  add.dataset.dshWslOwned = '';
  const pair = doc.createElement('div'); pair.className = 'dsh-wsl-new-pair'; pair.dataset.dshWslOwned = '';
  const win = button('新建 Windows 对话', 'dsh-wsl-new-windows', 'M3 4h18v13H3zM8 21h8m-4-4v4', () => model.conversations.newWindows());
  const linux = button('新建 WSL 对话', 'dsh-wsl-new-linux', 'M3 5h18v14H3zM7 9l3 3-3 3m6 0h4', () => void model.conversations.newLinux(model.conversations.entries.get(model.conversations.activeKey)));
  for (const [node, label] of [[win, 'Windows'], [linux, 'WSL']]) { const span = doc.createElement('span'); span.textContent = label; node.append(span); }
  pair.append(win, linux);
  const marks = new Set();
  function sync() {
    scheduled = null; if (disposed) return;
    if (model.state?.mode !== 'windows-host') return;
    const frame = doc.querySelector('[data-shell-overlay]')?.parentElement;
    const right = frame?.querySelector(':scope > [data-rightbar-col]');
    const nextSidebar = right?.previousElementSibling?.previousElementSibling;
    if (!nextSidebar) return;
    if (sidebar !== nextSidebar) {
      observer?.disconnect(); sidebar = nextSidebar;
      observer = new MutationObserver(records => {
        if (records.some(record => !record.target.closest?.('[data-dsh-wsl-owned]') && [...record.addedNodes, ...record.removedNodes].some(node => !node.dataset || !('dshWslOwned' in node.dataset)))) schedule();
      });
      observer.observe(sidebar, { subtree: true, childList: true });
    }
    const nativeButton = sidebar.querySelector('button[class*="newSession"]');
    if (nativeButton) {
      if (originalButton !== nativeButton) { originalButton?.removeAttribute('data-dsh-wsl-replaced'); originalButton = nativeButton; }
      nativeButton.setAttribute('data-dsh-wsl-replaced', '');
      if (pair.previousElementSibling !== nativeButton) nativeButton.after(pair);
      pair.classList.toggle('is-narrow', nativeButton.parentElement.getBoundingClientRect().width < 160);
    }
    linux.disabled = model.conversations.busy;
    const header = sidebar.querySelector('[class*="sectionHeader"]');
    if (header && !model.conversations.unified) {
      const label = header.querySelector(':scope > span');
      if (toggle.parentElement !== header) label ? label.after(toggle) : header.prepend(toggle);
      if (add.parentElement !== header) header.append(add);
    } else { toggle.remove(); add.remove(); }
    for (const mark of marks) if (!mark.isConnected) marks.delete(mark);
    for (const [kind, titleClass] of [['workspace', 'projectText'], ['session', 'title']]) {
      for (const row of sidebar.querySelectorAll(`[data-row-key^="${kind}:dsh-wsl:"]`)) {
        if (row.querySelector(':scope > .dsh-wsl-workspace-mark')) continue;
        const title = row.querySelector(`:scope > [class*="${titleClass}"]`);
        if (!title) continue;
        const mark = doc.createElement('span'); mark.dataset.dshWslOwned = '';
        mark.className = 'dsh-wsl-workspace-mark' + (kind === 'session' ? ' dsh-wsl-session-mark' : '');
        mark.textContent = 'WSL'; mark.title = kind === 'session' ? 'WSL 对话' : 'WSL 工作区';
        title.after(mark); marks.add(mark);
      }
    }
  }
  function schedule() { if (!disposed && !scheduled) scheduled = requestAnimationFrame(sync); }
  const off = model.subscribe(schedule), offSlots = ctx.slots.subscribe('sidebar.workspaces', schedule); schedule();
  return () => { disposed = true; cancelAnimationFrame(scheduled); observer?.disconnect(); off(); offSlots(); originalButton?.removeAttribute('data-dsh-wsl-replaced'); pair.remove(); toggle.remove(); add.remove(); for (const mark of marks) mark.remove(); };
}
