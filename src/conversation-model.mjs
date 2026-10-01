import { stored } from './client-session.mjs';
import { startSession } from './workspace-session.mjs';
import { createConnectionRecovery } from './connection-recovery.mjs';
import { createWorkHandoff } from './work-handoff.mjs';
import { readHandoff, appOrigin, DESKTOP_ORIGIN } from './handoff.mjs';
import { acceptsMessage, catalogOf, cleanCatalog, conversationKey, embeddedUrl,
  CONVERSATION_PANEL, CONVERSATION_PROTOCOL } from './conversation-protocol.mjs';

export function createConversations(ctx, api, model) {
  const entries = new Map(), requests = new Map(), lifetime = new AbortController();
  const closedViews = new Set();
  const requestedEnvironments = new Set(), starting = new Map();
  const recovery = createConnectionRecovery({
    retry: entry => chat.reconnect(entry, true),
    current: key => !lifetime.signal.aborted && !closedViews.has(key) && requestedEnvironments.has(key) ? entries.get(key) : null,
    changed: () => model.emit(),
  });
  const localHandoff = createWorkHandoff(ctx);
  const savedOrder = stored('workspace-order', undefined, localStorage);
  let revision = 0, saveTimer, lastLocal, startupChecked = false;
  const chat = {
    entries, activeKey: null, error: null, busy: false, anchor: null, dialog: null, catalogRevision: 0,
    workspaceOrder: Array.isArray(savedOrder) ? savedOrder.filter(id => typeof id === 'string').slice(0, 16000) : [],
    requestWorkspace() { chat.dialog = { type: 'workspace' }; model.emit(); },
    requestRename(target) { chat.dialog = { type: 'rename', target }; model.emit(); },
    requestHandoff(source) { chat.dialog = { type: 'handoff', source }; model.emit(); },
    async handoff(entry, action, payload) {
      const result = entry ? await chat.remote(entry, action, payload) : await localHandoff(action, payload);
      if (action === 'handoff.deliver') {
        if (entry) { chat.activeKey = entry.key; ctx.layout.selectPanel(CONVERSATION_PANEL); }
        else chat.showWindows(result.sessionId);
        model.emit();
      }
      return result;
    },
    setWorkspaceOrder(order) { chat.workspaceOrder = order; stored('workspace-order', order, localStorage); model.emit(); },
    async remote(entry, action, payload) {
      if (!entry.ready) {
        await chat.enter(entry.settings, { connectOnly: true }, false);
        await new Promise((resolve, reject) => {
          let unsubscribe = () => {};
          const finish = error => { clearTimeout(timer); unsubscribe(); lifetime.signal.removeEventListener('abort', abort); error ? reject(error) : resolve(); };
          const abort = () => finish(new Error('窗口已关闭。'));
          const timer = setTimeout(() => finish(new Error(chat.error || 'WSL 页面连接超时，请重新连接。')), 180000);
          const check = () => {
            const current = entries.get(entry.key);
            if (current?.ready) { entry = current; finish(); }
            else if (closedViews.has(entry.key)) finish(new Error('这个环境的页面已关闭。'));
            else if (current?.recovery?.phase === 'failed' || chat.error) finish(new Error(current?.recovery?.message || chat.error));
          };
          unsubscribe = model.subscribe(check); lifetime.signal.addEventListener('abort', abort, { once: true }); check();
        });
      }
      const value = await request(entry, action, payload);
      // Refresh after mutations so subsequent actions use authoritative membership.
      if (action !== 'search') await request(entry, 'refresh', {});
      return value;
    },
    unified: stored('sidebar-view-v050', undefined, localStorage) === 'conversations',
    nativeCatalog: () => catalogOf(ctx),
    visible: () => ctx.layout.panelInfo.getSnapshot().activePanelId === CONVERSATION_PANEL,
    changed() { model.emit(); },
    setUnified(value) {
      chat.unified = value; stored('sidebar-view-v050', value ? 'conversations' : 'workspaces', localStorage); model.emit();
    },
    setAnchor(element) { chat.anchor = element; model.emit(); },
    showWindows(sessionId) {
      revision++; chat.error = null;
      if (sessionId) ctx.uiWorkspace.openSession(sessionId);
      else ctx.layout.selectPanel(null);
      model.emit();
    },
    async openRow(row) {
      if (!row.environment) return chat.showWindows(row.id);
      const entry = entries.get(row.environment.key);
      if (!entry?.ready) return chat.enter(entry.settings, { sessionId: row.id });
      revision++; chat.activeKey = entry.key; chat.error = null;
      ctx.layout.selectPanel(CONVERSATION_PANEL); model.emit();
      try { await navigate(entry, { sessionId: row.id }); }
      catch (error) { chat.error = error.message; model.emit(); }
    },
    async enter(settings, intent = {}, select = true, automatic = false) {
      const key = conversationKey(settings);
      if (lifetime.signal.aborted || (automatic && closedViews.has(key))) return;
      if (!automatic) {
        recovery.cancel(key);
        const existing = entries.get(key);
        if (existing?.recovery) { existing.recovery = null; existing.origin = null; }
      }
      closedViews.delete(key); requestedEnvironments.add(key);
      const current = select ? ++revision : revision;
      chat.error = null; model.emit();
      try {
        const handoff = await ensureHost(settings);
        if (lifetime.signal.aborted || closedViews.has(key)) return;
        await chat.adopt(handoff, current !== revision ? { connectOnly: true } : intent, select && current === revision);
      } catch (error) {
        if (automatic) throw error;
        chat.error = error.message; model.emit();
      }
    },
    async adopt(handoff, intent = {}, select = true) {
      const key = conversationKey(handoff.settings);
      closedViews.delete(key);
      requestedEnvironments.add(key);
      const origin = new URL(handoff.url).origin;
      let entry = entries.get(key);
      if (!entry || entry.origin !== origin) {
        if ([...entries.values()].filter(item => item.url && item.key !== key).length >= 8)
          throw new Error('同一窗口最多保持 8 个 Linux 环境。在对话菜单中关闭不用的环境页面后可继续打开，后台任务不受影响。');
        if (entry) rejectRequests(entry, 'Linux 已重新启动，请重试这次操作。');
        const channel = crypto.randomUUID();
        entry = { key, settings: handoff.settings, origin, channel, catalog: entry?.catalog || null, recovery: entry?.recovery || null,
          url: embeddedUrl(handoff.url, channel, location.origin), openUrl: handoff.url,
          transport: appOrigin(location.origin) === DESKTOP_ORIGIN ? 'desktop' : 'iframe',
          ready: false, compact: true, window: null, waiting: null, startedAt: Date.now() };
        entries.set(key, entry);
      } else { entry.settings = handoff.settings; entry.openUrl = handoff.url; }
      entry.handoff = readHandoff(new URL(handoff.url).hash);
      if (select) { chat.activeKey = key; ctx.layout.selectPanel(CONVERSATION_PANEL); }
      const payload = { handoff: entry.handoff, ...intent };
      if (!intent.connectOnly) {
        if (entry.ready) await navigate(entry, payload);
        else entry.waiting = payload;
      }
      save(); model.emit();
    },
    bind(entry, iframe) { entry.window = iframe?.contentWindow || null; },
    desktopMessage(entry, message) { if (entries.get(entry.key) === entry) accept(entry, message); },
    desktopError(entry, error) {
      if (entries.get(entry.key) !== entry) return;
      entry.ready = false;
      rejectRequests(entry, error.message);
      recovery.failed(entry, error); model.emit();
    },
    async newWindows(workspaceId) {
      revision++; chat.error = null;
      try { await startSession(ctx, workspaceId); }
      catch (error) { chat.error = error.message; }
      model.emit();
    },
    async newLinux(entry) {
      const settings = entry?.settings || model.state?.settings;
      if (!settings?.distro) { ctx.layout.selectPanel('dsh-wsl-native'); return; }
      const selected = entry?.catalog?.rows.find(row => row.id === entry.catalog.selectedId);
      await chat.enter({ ...settings, directory: selected?.cwd || settings.directory }, { create: true });
    },
    async action(row, action) {
      chat.error = null;
      try {
        if (row.environment) {
          const entry = entries.get(row.environment.key);
          await chat.remote(entry, action, { sessionId: row.id });
        } else {
          const names = { pin: 'pinSession', unpin: 'unpinSession', archive: 'archiveSession', unarchive: 'unarchiveSession' };
          if (!names[action]) throw new Error('对话操作无效。');
          await ctx.uiWorkspace[names[action]](row.id);
        }
      } catch (error) { chat.error = error.message; }
      model.emit();
    },
    toggleChrome(entry) {
      const panel = entry.configOpen ? null : 'plugins';
      void request(entry, 'chrome', { compact: true, panel }).then(() => {
        entry.configOpen = !!panel; entry.compact = true; model.emit();
      }).catch(error => { chat.error = error.message; model.emit(); });
    },
    closeView(entry) {
      closedViews.add(entry.key);
      recovery.cancel(entry.key);
      rejectRequests(entry, '这个环境的页面已关闭，后台任务继续运行。');
      if (chat.activeKey === entry.key) chat.showWindows();
      delete entry.url; entry.window = null; entry.ready = false; entry.origin = null;
      entry.waiting = null; save(); model.emit();
    },
    stopRecovery(settings) {
      for (const key of requestedEnvironments) if (!settings || key === conversationKey(settings)) { closedViews.add(key); recovery.cancel(key); }
      for (const entry of entries.values()) if (!settings || entry.key === conversationKey(settings)) chat.closeView(entry);
    },
    reconnect(entry, automatic = false) {
      if (entries.get(entry.key) !== entry || closedViews.has(entry.key)) return Promise.resolve();
      if (!automatic) { recovery.cancel(entry.key); entry.recovery = null; }
      // Only an intent never dispatched to the guest may survive reconnect.
      const intent = entry.waiting || (entry.catalog?.selectedId ? { sessionId: entry.catalog.selectedId } : { connectOnly: true });
      rejectRequests(entry, '连接正在重新建立。');
      entry.origin = null;
      return chat.enter(entry.settings, intent, !automatic && chat.visible() && chat.activeKey === entry.key, automatic);
    },
  };
  function ensureHost(settings) {
    const key = JSON.stringify([conversationKey(settings), settings.directory]);
    if (starting.has(key)) return starting.get(key);
    const operation = Promise.resolve().then(async () => {
      const result = await api('native/enter', { ...settings, parentOrigin: appOrigin(location.origin) });
      const until = Date.now() + 10 * 60 * 1000;
      while (!lifetime.signal.aborted && Date.now() < until) {
        const state = await model.refresh();
        const handoff = state.handoffs.find(item => item.id === result.id);
        if (handoff?.state === 'failed') throw new Error(handoff.error);
        if (handoff?.state === 'ready') return handoff;
        await new Promise(resolve => setTimeout(resolve, 700));
      }
      throw new Error('Linux 启动未完成，请在环境面板查看进度。');
    }).finally(() => { starting.delete(key); chat.busy = starting.size > 0; model.emit(); });
    starting.set(key, operation); chat.busy = true; model.emit();
    return operation;
  }
  function save() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => stored('conversation-catalogs', [...entries.values()].map(entry => ({
      key: entry.key, settings: entry.settings, catalog: entry.catalog,
    })), localStorage), 200);
  }
  const cached = stored('conversation-catalogs', undefined, localStorage) || stored('conversation-catalogs');
  for (const saved of (Array.isArray(cached) ? cached : []).slice(0, 8)) {
    if (!saved?.settings?.distro || !saved?.settings?.directory || !cleanCatalog(saved.catalog)) continue;
    const key = conversationKey(saved.settings);
    entries.set(key, { key, settings: saved.settings, catalog: cleanCatalog(saved.catalog), ready: false, compact: true });
  }
  function request(entry, action, payload) {
    if ((!entry.window && !entry.desktop) || !entry.ready) return Promise.reject(new Error('WSL 对话界面尚未连接，请稍后重试。'));
    const id = crypto.randomUUID();
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => { requests.delete(id); reject(new Error('WSL 对话没有及时响应，请检查连接；操作不会自动重放。')); }, 30000);
      requests.set(id, { entry, resolve, reject, timer });
      if (entry.desktop) void entry.desktop.request(action, payload).then(
        value => accept(entry, { type: 'result', id, ok: true, value }),
        error => accept(entry, { type: 'result', id, ok: false, error: error.message }),
      );
      else entry.window.postMessage({ protocol: CONVERSATION_PROTOCOL, channel: entry.channel, type: 'request', id, action, payload }, entry.origin);
    });
  }
  async function navigate(entry, payload) {
    const id = crypto.randomUUID(); entry.navigating = id; model.emit();
    try {
      await request(entry, 'navigate', payload); entry.configOpen = false;
      if (payload.panel === 'plugins') { await request(entry, 'chrome', { compact: true, panel: 'plugins' }); entry.configOpen = true; }
    }
    finally { if (entry.navigating === id) entry.navigating = null; model.emit(); }
  }
  function rejectRequests(entry, reason) {
    for (const [id, pending] of requests) if (pending.entry === entry) {
      clearTimeout(pending.timer); requests.delete(id); pending.reject(new Error(reason));
    }
  }
  function theme(entry) {
    const tokens = [...document.body.style].filter(name => /^--(?:ds|dsw|dsh)-/.test(name)).map(name => [name, document.body.style.getPropertyValue(name)]);
    void request(entry, 'theme', { dark: document.body.hasAttribute('data-ds-dark-theme'), tokens }).catch(() => {});
  }
  const receive = event => {
    const entry = [...entries.values()].find(item => acceptsMessage(event, { origin: item.origin, source: item.window, channel: item.channel }));
    if (!entry) return;
    accept(entry, event.data);
  };
  function accept(entry, message) {
    if (message.type === 'catalog') {
      const catalog = cleanCatalog(message.catalog); if (!catalog) return;
      const first = !entry.ready;
      entry.ready = catalog.phase === 'ready' && catalog.connected; entry.catalog = catalog; entry.lastSeen = Date.now();
      chat.catalogRevision++;
      if (catalog.connected && entry.ready) recovery.connected(entry);
      else if (!catalog.connected) recovery.failed(entry, new Error('WSL 连接已中断。'), 15000);
      if (first && entry.ready) theme(entry);
      if (entry.waiting && entry.ready && catalog.connected) {
        const payload = entry.waiting; entry.waiting = null;
        void navigate(entry, payload).catch(error => { chat.error = error.message; model.emit(); });
      }
      save(); model.emit();
    } else if (message.type === 'result') {
      const pending = requests.get(message.id);
      if (!pending || pending.entry !== entry) return;
      clearTimeout(pending.timer); requests.delete(message.id);
      message.ok ? pending.resolve(message.value) : pending.reject(new Error(String(message.error || '操作失败。').slice(0, 1000)));
    } else if (message.type === 'return') chat.showWindows();
    else if (message.type === 'sidebar') ctx.layout.toggleSidebar();
  }
  window.addEventListener('message', receive);
  const observer = new MutationObserver(() => { for (const entry of entries.values()) if (entry.ready) theme(entry); });
  observer.observe(document.body, { attributes: true, attributeFilter: ['data-ds-dark-theme', 'style'] });
  const notifyLocal = () => {
    const next = JSON.stringify(catalogOf(ctx));
    if (next !== lastLocal) { lastLocal = next; model.emit(); }
  };
  const restoreRunning = () => {
    if (model.state?.mode !== 'windows-host') return;
    if (!startupChecked) {
      startupChecked = true;
      if (model.state.preferences?.autoStartWsl === true) {
        const settings = model.state.settings;
        const distro = settings.distro || model.state.distros.find(item => item.isDefault)?.name || model.state.distros[0]?.name;
        if (distro) void chat.enter({ ...settings, distro }, { connectOnly: true }, false).catch(() => {});
      }
    }
  };
  const disposers = [ctx.sessions.list.subscribe(notifyLocal), ctx.workspaces.list.subscribe(notifyLocal),
    ctx.layout.panelInfo.subscribe(() => { model.emit(); }), model.subscribe(restoreRunning)];
  restoreRunning();
  chat.dispose = () => {
    lifetime.abort(); recovery.dispose(); observer.disconnect(); clearTimeout(saveTimer);
    window.removeEventListener('message', receive);
    for (const dispose of disposers) dispose();
    for (const entry of entries.values()) rejectRequests(entry, '窗口已关闭。');
  };
  return chat;
}
