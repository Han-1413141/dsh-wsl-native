// Virtual ids exist only in the Windows sidebar. Real host ids are never changed.
export const remoteId = (entry, kind, id) => 'dsh-wsl:' + JSON.stringify([entry.key, kind, id]);

export function projectWorkspaces(localSessions, localWorkspaces, localStatus, entries, activeKey, order = []) {
  const sessions = { ...localSessions, ids: [...localSessions.ids], byId: { ...localSessions.byId } };
  if (activeKey) for (const id of sessions.ids) {
    const row = sessions.byId[id];
    if (row?.retainedBy?.mainView) sessions.byId[id] = { ...row, retainedBy: { ...row.retainedBy, mainView: 0 } };
  }
  const workspaces = { ...localWorkspaces, items: [...localWorkspaces.items],
    pinnedSessionIds: [...localWorkspaces.pinnedSessionIds], archivedSessionIds: [...localWorkspaces.archivedSessionIds] };
  const status = new Map(localStatus), targets = new Map();
  for (const entry of entries) {
    for (const row of entry.catalog?.rows || []) {
      const id = remoteId(entry, 'session', row.id);
      targets.set(id, { entry, id: row.id, row, kind: 'session' });
      sessions.ids.push(id);
      sessions.byId[id] = { id, title: row.title, displayTitle: row.title, cwd: row.cwd, blank: row.blank,
        running: row.running, updatedAt: row.updatedAt, retainedBy: { mainView: activeKey === entry.key && entry.catalog.selectedId === row.id ? 1 : 0 } };
      status.set(id, { running: row.running, completionUnread: false });
      if (row.pinned) workspaces.pinnedSessionIds.push(id);
      if (row.archived) workspaces.archivedSessionIds.push(id);
    }
    for (const workspace of entry.catalog?.workspaces || []) {
      const id = remoteId(entry, 'workspace', workspace.workspaceId);
      targets.set(id, { entry, id: workspace.workspaceId, workspace, kind: 'workspace' });
      workspaces.items.push({ ...workspace, workspaceId: id,
        sessionIds: workspace.sessionIds.map(id => remoteId(entry, 'session', id)) });
    }
  }
  const rank = new Map(order.map((id, index) => [id, index]));
  workspaces.items.sort((a, b) => (rank.get(a.workspaceId) ?? Infinity) - (rank.get(b.workspaceId) ?? Infinity));
  return { sessions, workspaces, status, targets };
}

export function reorderWorkspace(items, targets, id, before) {
  if (!items.some(item => item.workspaceId === id) || (before !== undefined && !items.some(item => item.workspaceId === before)))
    throw new Error('工作区列表已变化，请重试。');
  const order = items.map(item => item.workspaceId);
  if (id === before) return { order, beforeId: before };
  order.splice(order.indexOf(id), 1);
  order.splice(before === undefined ? order.length : order.indexOf(before), 0, id);
  const environment = targets.get(id)?.entry.key;
  const next = order.slice(order.indexOf(id) + 1).find(other => targets.get(other)?.entry.key === environment);
  return { order, beforeId: targets.get(next)?.id ?? next };
}
