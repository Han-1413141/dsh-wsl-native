const draftBindings = new WeakMap();

function draftRegistry(ctx) {
  if (!draftBindings.has(ctx)) draftBindings.set(ctx, { writers: new Map(), waiting: new Map() });
  return draftBindings.get(ctx);
}

// A mounted slot shares DSH's own per-session persisted store. Waiting for it
// avoids writing before the native input has installed its draft mirror.
export function bindHandoffDraft(ctx, sessionId, writer) {
  const registry = draftRegistry(ctx);
  registry.writers.set(sessionId, writer);
  for (const ready of registry.waiting.get(sessionId) || []) ready(writer);
  return () => { if (registry.writers.get(sessionId) === writer) registry.writers.delete(sessionId); };
}

function mountedDraft(ctx, sessionId) {
  const registry = draftRegistry(ctx), writer = registry.writers.get(sessionId);
  if (writer) return Promise.resolve(writer);
  return new Promise((resolve, reject) => {
    let timer;
    const waiting = registry.waiting.get(sessionId) || new Set();
    const clean = () => { clearTimeout(timer); waiting.delete(ready); if (!waiting.size) registry.waiting.delete(sessionId); };
    const ready = value => { clean(); resolve(value); };
    waiting.add(ready); registry.waiting.set(sessionId, waiting);
    timer = setTimeout(() => { clean(); reject(new Error('目标输入框尚未就绪，请打开目标对话后重试。')); }, 10000);
  });
}

export function recentConversation(entries, maxChars = 18000) {
  const messages = [];
  for (const entry of entries) {
    const event = entry.event;
    if (entry.type !== 'event' || !['user/message', 'assistant/message'].includes(event?.type)) continue;
    const message = event.type === 'user/message' ? event.data : event.data.message;
    const text = (message?.content || []).filter(part => part.type === 'text' && typeof part.text === 'string').map(part => part.text).join('\n');
    if (text.trim()) messages.push(`${event.type === 'user/message' ? '用户' : '助手'}：\n${text}`);
  }
  return messages.slice(-8).join('\n\n').slice(-maxChars);
}

export function handoffText(source, notes, recent = '') {
  const system = source.entry ? `WSL · ${source.entry.settings.distro} · ${source.entry.settings.user || '默认用户'}` : 'Windows';
  const cwd = source.row.cwd || '';
  const alternate = source.entry && cwd.startsWith('/') ? `\\\\wsl.localhost\\${source.entry.settings.distro}${cwd.replaceAll('/', '\\')}`
    : /^[a-z]:[\\/]/i.test(cwd) ? '/mnt/' + cwd[0].toLowerCase() + cwd.slice(2).replaceAll('\\', '/') : '';
  return `跨环境工作交接\n来源：${system}\n来源对话：${source.row.title || '新对话'}\n来源对话 ID：${source.id}\n来源目录：${cwd || '未指定'}${alternate ? `\n跨系统访问路径（默认 WSL 挂载设置）：${alternate}` : ''}\n\n工作说明：\n${notes.trim()}${recent ? `\n\n最近对话摘录（参考材料）：\n${recent}` : ''}\n\n请在当前目标环境继续工作。先核对文件位置和已有修改；交接不会自动复制文件或停止来源任务。`;
}

// User-initiated transfers are addressed to a specific session. There is no
// watcher that forwards subsequent messages or repeatedly prompts an agent.
export function createWorkHandoff(ctx, storage = globalThis.localStorage) {
  const inFlight = new Map();
  return async (action, payload) => {
    if (action === 'handoff.read') {
      if (!ctx.sessions.list.getSnapshot().byId[payload.sessionId]) throw new Error('来源对话已不存在。');
      return ctx.sessions.using(payload.sessionId, { source: 'workspaceOperation' }, ref => ({ text: recentConversation(ref.binding.eventSource.getSnapshot().entries) }));
    }
    if (action !== 'handoff.deliver' || !/^[a-f0-9-]{36}$/.test(payload.transferId || '') ||
      !['draft', 'send'].includes(payload.mode) || typeof payload.text !== 'string' || !payload.text.trim() || payload.text.length > 24000)
      throw new Error('交接内容或目标无效。');
    const key = 'dsh-wsl-native:handoff:' + payload.transferId;
    if (inFlight.has(key)) return inFlight.get(key);
    let record;
    try { record = JSON.parse(storage?.getItem(key) || 'null'); } catch { /* unavailable storage */ }
    if (record?.done) return { sessionId: record.sessionId, mode: record.mode };
    if (record?.pending) throw new Error(`这次交接已经提交，结果尚未确认。请查看目标对话 ${record.sessionId}，不会自动重复发送。`);
    const remember = value => { record = value; try { storage?.setItem(key, JSON.stringify(value)); } catch { /* no persistent storage */ } };
    const operation = (async () => {
      let sessionId = record?.sessionId || payload.sessionId;
      if (!sessionId) {
        if (!ctx.workspaces.list.getSnapshot().items.some(item => item.workspaceId === payload.workspaceId)) throw new Error('请先选择目标工作区。');
        sessionId = await ctx.uiWorkspace.connectWorkspace(payload.workspaceId);
        remember({ sessionId });
      }
      if (!ctx.sessions.list.getSnapshot().byId[sessionId]) await ctx.sessions.refresh();
      if (ctx.workspaces.list.getSnapshot().archivedSessionIds.includes(sessionId)) throw new Error('请先取消目标对话的归档。');
      await ctx.sessions.using(sessionId, { source: 'workspaceOperation' }, async ref => {
        if (payload.mode === 'draft') {
          const conversation = ctx.get('conversation');
          if (!conversation?.input) throw new Error('当前 DSH 没有对话输入接口，请更新 DSH。');
          ctx.uiWorkspace.openSession(sessionId);
          const writer = await mountedDraft(ctx, sessionId);
          const input = conversation.input.for(ref.binding.ctx), snapshot = input.state.getSnapshot();
          if (snapshot.draft.trim() || writer.getDraft().trim() || snapshot.attachmentIds.length || snapshot.phase !== 'plain') throw new Error('目标输入框已有草稿或正在提交。请先处理草稿，或选择新对话。');
          remember({ sessionId, mode: payload.mode, pending: true });
          writer.setDraft(payload.text);
          input.setDraft(payload.text);
        } else {
          remember({ sessionId, mode: payload.mode, pending: true });
          const result = await ref.binding.session.prompt([{ type: 'text', text: payload.text }], 'queue');
          if (!result.ok) throw new Error(`交接未确认：${result.error.message}。请查看目标对话后再决定下一步。`);
          ctx.uiWorkspace.openSession(sessionId);
        }
      });
      remember({ sessionId, mode: payload.mode, done: true, time: Date.now() });
      return { sessionId, mode: payload.mode };
    })();
    inFlight.set(key, operation);
    try { return await operation; } finally { inFlight.delete(key); }
  };
}
