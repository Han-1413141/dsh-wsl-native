import { acceptsMessage, catalogOf, CONVERSATION_PROTOCOL } from './conversation-protocol.mjs';
import { openProject } from './client-session.mjs';
import { createDesktopMailbox, DESKTOP_MAILBOX } from './desktop-mailbox.mjs';

// Called only after environment/adopt has verified the launcher's signed handoff.
export function startConversationGuest(ctx, model, api, embed) {
  const desktop = embed.transport === 'desktop';
  if ((!desktop && window.parent === window) || model.guest) return;
  let timer, lastCatalog = '', stopped = false;
  let navigation = new AbortController();
  const endpoint = { origin: embed.parentOrigin, source: window.parent, channel: embed.channel };
  const mailbox = desktop ? createDesktopMailbox(embed.channel, command) : null;
  if (mailbox) Object.defineProperty(window, DESKTOP_MAILBOX, { value: mailbox.api, configurable: true });
  const send = (type, value = {}) => mailbox ? mailbox.publish(type, value) : endpoint.source.postMessage({ protocol: CONVERSATION_PROTOCOL,
    channel: embed.channel, type, ...value }, endpoint.origin);
  const publish = (force = false) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (stopped) return;
      const catalog = catalogOf(ctx), serialized = JSON.stringify(catalog);
      if (force || serialized !== lastCatalog) { lastCatalog = serialized; send('catalog', { catalog }); }
    }, 50);
  };
  const guest = model.guest = {
    compact: true,
    returnWindows() { send('return'); },
    toggleSidebar() { send('sidebar'); },
    publish,
  };
  document.documentElement.setAttribute('data-dsh-wsl-guest', '');
  async function command(action, payload = {}) {
    if (action === 'refresh') { publish(true); return; }
    if (action === 'theme') {
      document.body.toggleAttribute('data-ds-dark-theme', payload.dark === true);
      document.documentElement.style.colorScheme = payload.dark === true ? 'dark' : 'light';
      if (Array.isArray(payload.tokens)) for (const [name, value] of payload.tokens.slice(0, 256))
        if (/^--(?:ds|dsw|dsh)-[\w-]+$/.test(name) && typeof value === 'string' && value.length < 500)
          document.body.style.setProperty(name, value);
      return;
    }
    if (action === 'chrome') { guest.compact = payload.compact !== false; model.emit(); return; }
    if (action === 'navigate') {
      navigation.abort(); navigation = new AbortController();
      const signal = navigation.signal;
      if (payload.sessionId) {
        const row = ctx.sessions.list.getSnapshot().byId[payload.sessionId];
        if (!row || row.parentId || ctx.workspaces.list.getSnapshot().archivedSessionIds.includes(row.id))
          throw new Error('这条 WSL 对话已归档或不在当前环境中，请刷新列表。');
        ctx.uiWorkspace.openSession(row.id);
      } else {
        if (!payload.handoff) throw new Error('缺少已验证的工作区信息。');
        const result = await api('environment/adopt', payload.handoff);
        if (signal.aborted) return;
        if (payload.create) {
          const workspace = await ctx.workspaces.create({ path: result.settings.directory });
          if (signal.aborted) return;
          const id = await ctx.sessions.create({ workspaceId: workspace.workspaceId });
          if (!signal.aborted) ctx.uiWorkspace.openSession(id);
        } else await openProject(ctx, result.settings.directory, signal);
      }
      publish(true); return;
    }
    const actions = { pin: 'pinSession', unpin: 'unpinSession', archive: 'archiveSession', unarchive: 'unarchiveSession' };
    if (!actions[action] || !ctx.sessions.list.getSnapshot().byId[payload.sessionId])
      throw new Error('对话操作无效。');
    await ctx.uiWorkspace[actions[action]](payload.sessionId);
    publish(true);
  }
  const receive = event => {
    if (!acceptsMessage(event, endpoint) || event.data.type !== 'request') return;
    const { id, action, payload } = event.data;
    if (typeof id !== 'string' || id.length > 100 || typeof action !== 'string') return;
    void command(action, payload).then(
      () => send('result', { id, ok: true }),
      error => send('result', { id, ok: false, error: String(error.message).slice(0, 1000) }),
    );
  };
  if (!desktop) window.addEventListener('message', receive);
  const disposers = [ctx.sessions.list.subscribe(() => publish()),
    ctx.workspaces.list.subscribe(() => publish()), ctx.connection.state.subscribe(() => publish())];
  publish(true); model.emit();
  guest.dispose = () => {
    stopped = true; navigation.abort(); clearTimeout(timer);
    window.removeEventListener('message', receive);
    mailbox?.dispose();
    if (mailbox && window[DESKTOP_MAILBOX] === mailbox.api) delete window[DESKTOP_MAILBOX];
    for (const dispose of disposers) dispose();
    document.documentElement.removeAttribute('data-dsh-wsl-guest');
  };
}
