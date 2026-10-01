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

// DSH 0.2.0-rc.2 has no additive header/tree slot. These two owned nodes extend
// its existing workspace DOM; the native renderer and workspace data remain intact.
export function installNativeWorkspaces(ctx, model) {
  const doc = document, collapsed = new Set(), limits = new Map();
  let frame, sidebar, observer, scheduled, disposed = false, signature = '', lastInput;
  const toggle = doc.createElement('button'), mount = doc.createElement('div');
  toggle.type = 'button'; toggle.className = 'dsh-wsl-icon-button dsh-wsl-native-toggle';
  toggle.setAttribute('aria-label', '切换到紧凑对话列表'); toggle.title = '切换到紧凑对话列表';
  const svg = doc.createElementNS('http://www.w3.org/2000/svg', 'svg');
  for (const [key, value] of Object.entries({ width: '15', height: '15', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.6', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'aria-hidden': 'true' })) svg.setAttribute(key, value);
  const icon = doc.createElementNS(svg.namespaceURI, 'path'); icon.setAttribute('d', 'M4 7h16m-4-4 4 4-4 4M20 17H4m4-4-4 4 4 4'); svg.append(icon); toggle.append(svg);
  toggle.addEventListener('click', () => model.conversations.setUnified(true));
  mount.className = 'dsh-wsl-native-projects'; mount.setAttribute('role', 'group'); mount.setAttribute('aria-label', 'WSL 工作区');
  const button = (label, className, onClick) => {
    const node = doc.createElement('button'); node.type = 'button'; node.className = className; node.textContent = label;
    node.addEventListener('click', event => { event.stopPropagation(); onClick(); }); return node;
  };
  function render(groups) {
    const next = JSON.stringify([groups.map(g => [g.key, g.title, g.path, g.rows.map(r => [r.id, r.title, r.running, r.pinned]), g.environment.ready]), model.conversations.activeKey, model.conversations.visible(), [...collapsed], [...limits], groups.map(g=>g.environment.catalog?.selectedId)]);
    if (signature === next) return; signature = next;
    const fragment = doc.createDocumentFragment();
    for (const group of groups) {
      const section = doc.createElement('div'); section.setAttribute('role', 'treeitem');
      const expanded = !collapsed.has(group.key); section.setAttribute('aria-expanded', String(expanded));
      const title = button('', 'dsh-wsl-native-project', () => { expanded ? collapsed.add(group.key) : collapsed.delete(group.key); render(groups); });
      title.title = `WSL · ${group.environment.settings.distro} · ${group.path}`;
      title.setAttribute('aria-label', `${expanded ? '收起' : '展开'} WSL 工作区 ${group.title}`);
      const arrow = doc.createElement('span'); arrow.textContent = expanded ? '⌄' : '›'; arrow.setAttribute('aria-hidden', 'true');
      const name = doc.createElement('span'); name.className = 'dsh-wsl-native-title'; name.textContent = group.title;
      const mark = doc.createElement('span'); mark.className = 'dsh-wsl-chat-mark'; mark.textContent = 'WSL';
      title.append(arrow, name, mark); section.append(title);
      if (expanded) {
        const list = doc.createElement('div'); list.setAttribute('role', 'group'); const limit = limits.get(group.key) || 5;
        for (const row of group.rows.slice(0, limit)) {
          const selected = model.conversations.visible() && model.conversations.activeKey === group.environment.key && group.environment.catalog.selectedId === row.id;
          const node = button('', `dsh-wsl-native-session${selected ? ' is-selected' : ''}`, () => {
            if (window.matchMedia('(max-width:600px)').matches) ctx.layout.toggleSidebar();
            void model.conversations.openRow(row);
          });
          node.setAttribute('role', 'treeitem'); node.setAttribute('aria-selected', String(selected)); node.setAttribute('aria-label', `WSL 对话：${row.title}`);
          node.title = `${row.title}\n${group.environment.settings.distro} · ${row.cwd}${group.environment.ready ? '' : '\n点击连接环境'}`;
          const dot = doc.createElement('span'); dot.className = `dsh-wsl-native-status${row.running ? ' is-running' : ''}`; dot.textContent = row.running ? '◌' : row.pinned ? '•' : '';
          const text = doc.createElement('span'); text.textContent = row.title || '新对话'; node.append(dot, text); list.append(node);
        }
        if (group.rows.length > limit) list.append(button(`展开其余 ${group.rows.length - limit} 个 WSL 对话`, 'dsh-wsl-native-more', () => { limits.set(group.key, limit + 20); render(groups); }));
        section.append(list);
      }
      fragment.append(section);
    }
    mount.replaceChildren(fragment); mount.hidden = !groups.length;
  }
  function sync() {
    scheduled = null;
    if (disposed) return;
    const enabled = model.state?.mode === 'windows-host' && !model.conversations.unified;
    if (!enabled) { toggle.remove(); mount.remove(); return; }
    const overlay = doc.querySelector('[data-shell-overlay]');
    const nextFrame = overlay?.parentElement;
    const right = nextFrame?.querySelector(':scope > [data-rightbar-col]');
    const nextSidebar = right?.previousElementSibling?.previousElementSibling;
    if (!nextSidebar) return;
    if (sidebar !== nextSidebar) {
      observer?.disconnect(); frame = nextFrame; sidebar = nextSidebar;
      observer = new MutationObserver(records => {
        if (records.some(r => [...r.removedNodes].some(n => (n === mount || n === toggle) && !n.isConnected) ||
          (!mount.contains(r.target) && r.target !== toggle &&
          [...r.addedNodes, ...r.removedNodes].some(n => n !== mount && n !== toggle)))) schedule();
      });
      observer.observe(sidebar, { childList: true, subtree: true });
    }
    const header = sidebar.querySelector('[class*="sectionHeader"]');
    if (!header) { toggle.remove(); mount.remove(); return; }
    const label = header.querySelector(':scope > span');
    if (toggle.parentElement !== header) label ? label.after(toggle) : header.prepend(toggle);
    const input = header.querySelector('input');
    if (input !== lastInput) { lastInput?.removeEventListener('input', schedule); lastInput = input; input?.addEventListener('input', schedule); }
    const tree = header.parentElement.querySelector('[role="tree"]');
    if (tree && mount.parentElement !== tree) tree.prepend(mount);
    if (!tree) mount.remove();
    render(remoteWorkspaceGroups(model.conversations.entries.values(), input?.value || ''));
  }
  function schedule() { if (!disposed && !scheduled) scheduled = requestAnimationFrame(sync); }
  const unsubscribe = model.subscribe(schedule);
  // Initial refresh occurs after the shell mounts; observe only our sidebar thereafter.
  const stopSlots = ctx.slots.subscribe('sidebar.workspaces', schedule);
  schedule();
  return () => { disposed = true; cancelAnimationFrame(scheduled); observer?.disconnect(); lastInput?.removeEventListener('input', schedule); unsubscribe(); stopSlots(); toggle.remove(); mount.remove(); };
}
