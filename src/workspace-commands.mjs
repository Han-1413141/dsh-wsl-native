import { openWorkspace } from './workspace-session.mjs';

export const WORKSPACE_ACTIONS = ['workspace.start', 'workspace.rename', 'workspace.delete', 'workspace.reorder', 'session.rename', 'session.fork', 'search'];
export const CONVERSATION_ACTIONS = new Set(['refresh', 'theme', 'chrome', 'navigate', 'pin', 'unpin', 'archive', 'unarchive', 'handoff.read', 'handoff.deliver', ...WORKSPACE_ACTIONS]);

function title(value) {
  if (typeof value !== 'string' || !value.trim() || value.length > 500 || /[\x00-\x1f]/.test(value)) throw new Error('名称必须是 1–500 个字符。');
  return value.trim();
}

// Fixed operations only. Neither transport can invoke arbitrary host methods.
export async function workspaceCommand(ctx, action, payload) {
  if (action === 'search') {
    if (typeof payload.query !== 'string' || payload.query.length > 2000) throw new Error('搜索文字过长。');
    const result = await ctx.sessions.search(payload.query);
    if (!result.ok) throw new Error(result.error.message);
    return { items: result.value.items.slice(0, 20).map(item => ({ sessionId: item.sessionId, snippet: item.snippet.slice(0, 1000) })), hasMore: result.value.hasMore };
  }
  if (action.startsWith('workspace.')) {
    const workspaces = ctx.workspaces.list.getSnapshot().items;
    if (!workspaces.some(item => item.workspaceId === payload.workspaceId)) throw new Error('这个 WSL 工作区已不存在，请刷新列表。');
    if (action === 'workspace.start') { await openWorkspace(ctx, payload.workspaceId); return; }
    if (action === 'workspace.rename') { await ctx.workspaces.rename(payload.workspaceId, title(payload.title)); return; }
    if (action === 'workspace.delete') { await ctx.workspaces.delete(payload.workspaceId); return; }
    if (action === 'workspace.reorder') {
      if (payload.beforeId !== undefined && !workspaces.some(item => item.workspaceId === payload.beforeId)) throw new Error('目标工作区已不存在，请重试。');
      await ctx.workspaces.insertBefore(payload.workspaceId, payload.beforeId); return;
    }
  }
  if (!ctx.sessions.list.getSnapshot().byId[payload.sessionId]) throw new Error('这条 WSL 对话已不存在，请刷新列表。');
  if (action === 'session.rename') {
    const name = title(payload.title);
    const result = await ctx.sessions.using(payload.sessionId, { source: 'workspaceOperation' }, ref => ref.binding.session.rename(name));
    if (!result.ok) throw new Error(result.error.message);
    return;
  }
  if (action === 'session.fork') { const id = await ctx.uiWorkspace.forkSession(payload.sessionId); ctx.uiWorkspace.openSession(id); return; }
  const actions = { pin: 'pinSession', unpin: 'unpinSession', archive: 'archiveSession', unarchive: 'unarchiveSession' };
  if (!actions[action]) throw new Error('对话操作无效。');
  await ctx.uiWorkspace[actions[action]](payload.sessionId, action === 'archive' ? { stopActivity: payload.stopActivity === true } : undefined);
}
