const connecting = new WeakMap();

// Native DSH reuses blank sessions, including ones whose preset was removed.
// Recover only that refusal, with a fresh identity and the host's current default.
export function connectWorkspace(ctx, workspaceId) {
  let pending = connecting.get(ctx);
  if (!pending) connecting.set(ctx, pending = new Map());
  if (pending.has(workspaceId)) return pending.get(workspaceId);
  const operation = Promise.resolve().then(async () => {
    try {
      return await ctx.uiWorkspace.connectWorkspace(workspaceId);
    } catch (error) {
      if (error?.name !== 'SessionCreateError' || error.rpcError?.code !== 'agent-preset/not-found') throw error;
      return ctx.sessions.create({ workspaceId });
    }
  }).finally(() => pending.delete(workspaceId));
  pending.set(workspaceId, operation);
  return operation;
}

export async function openWorkspace(ctx, workspaceId, signal) {
  const navigation = ctx.layout.beginNavigation();
  const sessionId = await connectWorkspace(ctx, workspaceId);
  if (!navigation.aborted && !signal?.aborted) ctx.uiWorkspace.openSession(sessionId);
  return sessionId;
}

export async function startSession(ctx, workspaceId) {
  const workspaces = ctx.workspaces.list.getSnapshot();
  const sessions = ctx.sessions.list.getSnapshot();
  const current = sessions.ids.find(id => sessions.byId[id]?.retainedBy?.mainView > 0);
  let target = workspaceId ?? workspaces.items.find(item => item.sessionIds.includes(current))?.workspaceId;
  if (target === undefined && workspaces.phase === 'ready' && sessions.phase === 'ready') {
    let latest = Number.NEGATIVE_INFINITY;
    for (const workspace of workspaces.items) {
      const times = workspace.sessionIds.map(id => sessions.byId[id]?.updatedAt).filter(Number.isFinite);
      const time = times.length ? Math.max(...times) : Date.parse(workspace.createdAt);
      if (target === undefined || time > latest) { target = workspace.workspaceId; latest = time; }
    }
  }
  if (target === undefined) ctx.uiWorkspace.startSession();
  else await openWorkspace(ctx, target);
}
