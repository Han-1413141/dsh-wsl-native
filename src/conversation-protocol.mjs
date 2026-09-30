import { appOrigin, localOrigin, readHandoff, DESKTOP_ORIGIN } from './handoff.mjs';

export const CONVERSATION_PROTOCOL = 'dsh-wsl-conversation/1';
export const CONVERSATION_PANEL = 'dsh-wsl-conversation';
const channelPattern = /^[a-zA-Z0-9-]{32,64}$/;
const text = (value, limit) => typeof value === 'string' ? value.slice(0, limit) : '';

export function conversationKey(settings) {
  return JSON.stringify([settings.distro || '', settings.user || '']);
}

export function embeddedUrl(url, channel, parentOrigin) {
  const destination = new URL(url);
  const handoff = readHandoff(destination.hash);
  if (!localOrigin(destination.origin) || !appOrigin(parentOrigin) || !channelPattern.test(channel) ||
      !handoff?.proof || handoff.parentOrigin !== appOrigin(parentOrigin))
    throw new Error('无法验证同窗口对话的目标地址，请重新进入 Linux。');
  const payload = JSON.parse(decodeURIComponent(destination.hash.slice(9)));
  const embed = { channel, ...(appOrigin(parentOrigin) === DESKTOP_ORIGIN ? { transport: 'desktop' } : {}) };
  destination.hash = 'dsh-wsl=' + encodeURIComponent(JSON.stringify({ ...payload, embed }));
  return destination.href;
}

export function readEmbed(hash) {
  const handoff = readHandoff(hash);
  if (!handoff?.proof || !handoff.parentOrigin) return null;
  try {
    const { embed } = JSON.parse(decodeURIComponent(hash.slice(9)));
    if (!channelPattern.test(embed?.channel || '')) return null;
    if (embed.transport !== undefined && (embed.transport !== 'desktop' || handoff.parentOrigin !== DESKTOP_ORIGIN)) return null;
    return { channel: embed.channel, parentOrigin: handoff.parentOrigin, ...(embed.transport ? { transport: embed.transport } : {}) };
  } catch { return null; }
}

export function acceptsMessage(event, { origin, source, channel }) {
  return !!source && event.source === source && event.origin === origin &&
    !!localOrigin(origin) && channelPattern.test(channel || '') &&
    event.data?.protocol === CONVERSATION_PROTOCOL && event.data.channel === channel &&
    ['catalog', 'request', 'result', 'return', 'sidebar'].includes(event.data.type);
}

// Only navigation metadata crosses the boundary. Prompts, credentials and files stay in their host.
export function cleanCatalog(value) {
  if (!value || !Array.isArray(value.rows) || value.rows.length > 5000) return null;
  const seen = new Set();
  const rows = [];
  for (const row of value.rows) {
    if (!row || typeof row.id !== 'string' || !row.id || row.id.length > 200 || seen.has(row.id)) continue;
    seen.add(row.id);
    rows.push({ id: row.id, title: text(row.title, 500), cwd: text(row.cwd, 4096),
      workspaceId: text(row.workspaceId, 200), workspaceTitle: text(row.workspaceTitle, 500),
      running: row.running === true, blank: row.blank === true, pinned: row.pinned === true,
      archived: row.archived === true, updatedAt: Number.isFinite(row.updatedAt) ? row.updatedAt : 0 });
  }
  return { rows, selectedId: rows.some(row => row.id === value.selectedId) ? value.selectedId : null,
    connected: value.connected === true, phase: value.phase === 'ready' ? 'ready' : 'loading' };
}

export function catalogOf(ctx) {
  const sessions = ctx.sessions.list.getSnapshot();
  const workspaces = ctx.workspaces.list.getSnapshot();
  const owners = new Map();
  for (const workspace of workspaces.items || [])
    for (const id of workspace.sessionIds) owners.set(id, workspace);
  const archived = new Set(workspaces.archivedSessionIds || []);
  const pinned = new Set(workspaces.pinnedSessionIds || []);
  const rows = sessions.ids.map(id => sessions.byId[id]).filter(row => row && !row.parentId).slice(0, 5000);
  return cleanCatalog({ phase: sessions.phase, connected: ctx.connection.state.getSnapshot() === 'connected',
    selectedId: rows.find(row => row.retainedBy?.mainView > 0)?.id,
    rows: rows.map(row => ({ id: row.id, title: row.title || (row.blank ? '新对话' : row.displayTitle),
      cwd: row.cwd, workspaceId: owners.get(row.id)?.workspaceId,
      workspaceTitle: owners.get(row.id)?.title || '', running: row.running, blank: row.blank,
      updatedAt: row.updatedAt, archived: archived.has(row.id), pinned: pinned.has(row.id) })) });
}

export function conversationRows(local, environments, { filter = 'all', query = '', archived = false } = {}) {
  const all = (local?.rows || []).map(row => ({ ...row, environment: null, key: JSON.stringify(['windows', row.id]) }));
  for (const environment of environments) for (const row of environment.catalog?.rows || [])
    all.push({ ...row, environment, key: JSON.stringify(['wsl', environment.key, row.id]) });
  const needle = query.trim().toLocaleLowerCase();
  return all.filter(row => row.archived === archived &&
    (filter === 'all' || (filter === 'wsl') === !!row.environment) &&
    (!needle || [row.title, row.cwd, row.environment?.settings.distro].join(' ').toLocaleLowerCase().includes(needle)))
    .sort((a, b) => Number(b.pinned) - Number(a.pinned) || b.updatedAt - a.updatedAt || a.key.localeCompare(b.key));
}
