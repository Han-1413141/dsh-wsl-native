import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { createConversations } from '../src/conversation-model.mjs';
import { createClientModel } from '../src/client-session.mjs';
import { DESKTOP_MAILBOX } from '../src/desktop-mailbox.mjs';
import { conversationKey, embeddedUrl } from '../src/conversation-protocol.mjs';
import { handoffUrl, DESKTOP_ORIGIN } from '../src/handoff.mjs';
import { signHandoff } from '../src/handoff-auth.mjs';

const settings = { distro: 'Ubuntu', user: 'test', directory: '/home/test' };
const catalog = { phase: 'ready', connected: true, rows: [], workspaces: [] };
const settle = () => new Promise(resolve => setImmediate(resolve));
function source(value) { const listeners = new Set(); return { getSnapshot: () => value, subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); } }; }
function browser(t, href = DESKTOP_ORIGIN) {
  const storage = () => { const map = new Map(); return { getItem: key => map.get(key), setItem: (key, value) => map.set(key, value), removeItem: key => map.delete(key) }; };
  const win = new EventTarget(); win.parent = win; win.location = new URL(href);
  const values = { window: win, location: { origin: href === DESKTOP_ORIGIN ? DESKTOP_ORIGIN : new URL(href).origin },
    localStorage: storage(), sessionStorage: storage(), history: { replaceState() {}, state: null },
    document: { body: { style: [], hasAttribute: () => false }, documentElement: { setAttribute() {}, removeAttribute() {} } },
    MutationObserver: class { observe() {} disconnect() {} },
  };
  const cleanup = [], restore = [];
  t.after(() => { for (const fn of cleanup) fn(); for (const fn of restore) fn(); });
  for (const [key, value] of Object.entries(values)) {
    const previous = Object.getOwnPropertyDescriptor(globalThis, key);
    Object.defineProperty(globalThis, key, { value, configurable: true, writable: true });
    restore.push(() => previous ? Object.defineProperty(globalThis, key, previous) : delete globalThis[key]);
  }
  return fn => cleanup.push(fn);
}
function launch() {
  const signed = signHandoff({ id: randomUUID(), settings, parentOrigin: DESKTOP_ORIGIN }, 'test-secret');
  return { id: signed.id, state: 'ready', settings, url: handoffUrl('http://127.0.0.1:34567/?token=test', signed) };
}
function context() {
  const panels = [], creates = [];
  return { panels, creates, on: () => () => {},
    sessions: { list: source({ phase: 'ready', ids: [], byId: {} }) },
    workspaces: { list: source({ phase: 'ready', items: [], pinnedSessionIds: [], archivedSessionIds: [] }),
      create: async () => { creates.push('workspace'); throw new Error('bootstrap must not create a workspace'); } },
    connection: { state: source('connected') },
    layout: { panelInfo: source({ activePanelId: null }), selectPanel: id => panels.push(id), beginNavigation() { throw new Error('native navigation interrupted'); } },
  };
}
function host(t, { auto = false, cached = false } = {}) {
  const cleanup = browser(t);
  const handoff = launch(), ctx = context(), calls = [], listeners = new Set();
  let release;
  const gate = new Promise(resolve => { release = resolve; });
  if (cached) localStorage.setItem('dsh-wsl-native:conversation-catalogs', JSON.stringify([{ settings, catalog }]));
  const model = { state: { mode: 'windows-host', settings, preferences: { autoStartWsl: auto }, distros: [], handoffs: [handoff],
    native: { instances: [{ settings, running: { openUrl: handoff.url } }] } },
    emit() { for (const fn of listeners) fn(); }, subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
    async refresh() { await gate; model.emit(); return model.state; },
  };
  const chat = createConversations(ctx, async (route, payload) => { calls.push([route, payload]); return { id: handoff.id }; }, model);
  cleanup(() => chat.dispose());
  return { chat, model, ctx, calls, handoff, release, entry: () => chat.entries.get(conversationKey(settings)) };
}

test('startup off keeps cached WSL workspaces without opening a page or starting a host', async t => {
  const f = host(t, { cached: true }); await settle();
  assert.deepEqual(f.calls, []); assert.equal(f.entry().url, undefined);
  f.model.state.preferences.autoStartWsl = true; f.model.emit(); await settle();
  assert.deepEqual(f.calls, []); // preference applies on the next app startup
  f.release(); await f.chat.newLinux(f.entry());
  assert.equal(f.calls.length, 1); assert.equal(f.entry().waiting.create, true);
});

test('background autostart and repeated foreground clicks share one startup and dispatch the latest create once', async t => {
  const f = host(t, { auto: true }); await settle();
  assert.equal(f.calls.length, 1); assert.deepEqual(f.ctx.panels, []);
  const first = f.chat.newLinux(), second = f.chat.newLinux();
  f.release(); await Promise.all([first, second]);
  assert.equal(f.calls.length, 1); assert.equal(f.entry().waiting.create, true);
  const commands = []; f.entry().desktop = { request: async (action, payload) => commands.push([action, payload]) };
  f.chat.desktopMessage(f.entry(), { type: 'catalog', catalog }); await settle();
  f.chat.desktopMessage(f.entry(), { type: 'catalog', catalog }); await settle();
  assert.equal(commands.filter(([action]) => action === 'navigate').length, 1);
  assert.equal(f.entry().waiting, null);
});

test('explicit stop during startup prevents a late response reopening the page', async t => {
  const f = host(t, { auto: true }); await settle();
  f.chat.stopRecovery(settings); f.release(); await settle();
  assert.equal(f.entry(), undefined); assert.deepEqual(f.ctx.panels, []);
});

test('reconnecting never replays a create operation that was already dispatched', async t => {
  const f = host(t); f.release(); await f.chat.enter(settings, { create: true });
  let sent = 0;
  f.entry().desktop = { request: async action => { if (action === 'navigate') { sent++; throw new Error('response lost'); } } };
  f.chat.desktopMessage(f.entry(), { type: 'catalog', catalog }); await settle();
  assert.equal(f.entry().waiting, null);
  await f.chat.reconnect(f.entry(), true);
  assert.equal(f.entry().waiting, null); assert.equal(sent, 1);
});

test('an embedded guest registers its verified mailbox without waiting for or creating a workspace', async t => {
  const handoff = launch(), url = embeddedUrl(handoff.url, randomUUID(), DESKTOP_ORIGIN);
  const cleanup = browser(t, url), ctx = context(), calls = [];
  const model = createClientModel(ctx, async route => {
    calls.push(route);
    return route === 'status' ? { mode: 'wsl-host', distros: [{ name: 'Ubuntu' }] } : { settings };
  });
  cleanup(() => model.dispose()); await settle();
  assert.ok(window[DESKTOP_MAILBOX]); assert.ok(model.guest);
  assert.ok(calls.includes('environment/adopt')); assert.deepEqual(ctx.creates, []);
});

test('a rejected handoff never opens a guest mailbox', async t => {
  const handoff = launch(), cleanup = browser(t, embeddedUrl(handoff.url, randomUUID(), DESKTOP_ORIGIN));
  const model = createClientModel(context(), async route => {
    if (route === 'status') return { mode: 'wsl-host', distros: [{ name: 'Ubuntu' }] };
    throw new Error('HANDOFF_INVALID');
  });
  cleanup(() => model.dispose()); await settle();
  assert.equal(window[DESKTOP_MAILBOX], undefined); assert.equal(model.guest, undefined);
});
