import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { randomUUID } from 'node:crypto';
import { appOrigin, localOrigin, handoffUrl, readHandoff, DESKTOP_ORIGIN, parentUrl } from '../src/handoff.mjs';
import { signHandoff, verifyHandoff } from '../src/handoff-auth.mjs';
import { embeddedUrl, readEmbed } from '../src/conversation-protocol.mjs';
import { createDesktopMailbox, DESKTOP_MAILBOX } from '../src/desktop-mailbox.mjs';
import { desktopCallSource, mountDesktopView } from '../src/desktop-view.mjs';

test('Desktop is an exact signed parent but never a network destination', () => {
  const secret = 'test-only', channel = randomUUID();
  assert.equal(appOrigin(DESKTOP_ORIGIN), DESKTOP_ORIGIN);
  assert.equal(appOrigin(DESKTOP_ORIGIN + '/'), DESKTOP_ORIGIN);
  assert.equal(localOrigin(DESKTOP_ORIGIN), null);
  for (const invalid of ['dsh-app://evil', 'dsh-app://app.evil', 'dsh-app://app:123', 'dsh-app://app/path',
    'dsh-app://user@app', 'dsh-app://app?token=x', 'dsh-app://app#x', 'null']) assert.equal(appOrigin(invalid), null);
  assert.equal(parentUrl(DESKTOP_ORIGIN), 'dsh://open');
  const signed = signHandoff({ id: randomUUID(), settings: { distro: 'Ubuntu', user: 'dev', directory: '/home/dev' }, parentOrigin: DESKTOP_ORIGIN }, secret);
  const url = embeddedUrl(handoffUrl('http://127.0.0.1:34567/?token=test', signed), channel, DESKTOP_ORIGIN);
  assert.deepEqual(readEmbed(new URL(url).hash), { channel, parentOrigin: DESKTOP_ORIGIN, transport: 'desktop' });
  assert.equal(verifyHandoff(readHandoff(new URL(url).hash), secret), true);
  assert.throws(() => handoffUrl(DESKTOP_ORIGIN, signed));
  assert.throws(() => embeddedUrl(url, channel, 'http://127.0.0.1:34567'));
});

test('Desktop mailbox isolates capabilities and limits the available operations', async () => {
  const channel = randomUUID(), commands = [];
  const box = createDesktopMailbox(channel, async (...args) => { commands.push(args); });
  await assert.rejects(box.api.request('wrong', 'navigate', {}));
  await assert.rejects(box.api.request(channel, 'exec', {}));
  await assert.rejects(box.api.request(channel, 'theme', { value: 'x'.repeat(131073) }));
  assert.deepEqual(commands, []);
  assert.deepEqual(await box.api.request(channel, 'navigate', { sessionId: 'linux-session' }), { ok: true });
  assert.deepEqual(commands, [['navigate', { sessionId: 'linux-session' }]]);
  box.dispose();
  await assert.rejects(box.api.request(channel, 'navigate', {}));
});

test('Desktop metadata waits for changes, coalesces catalogs and releases waiting subscriptions', async () => {
  const channel = randomUUID(), box = createDesktopMailbox(channel, async () => {}, { waitMs: 40 });
  const waiting = box.api.next(channel, 0);
  box.publish('catalog', { catalog: { rows: [{ id: 'a' }] } });
  assert.equal((await waiting).catalog.rows[0].id, 'a');
  box.publish('catalog', { catalog: { rows: [{ id: 'b' }] } });
  box.publish('return');
  const next = await box.api.next(channel, 1);
  assert.equal(next.catalog.rows[0].id, 'b'); assert.equal(next.signals[0].type, 'return');
  const idle = await box.api.next(channel, next.sequence);
  assert.equal(idle.catalog, null); assert.deepEqual(idle.signals, []);
  const final = box.api.next(channel, idle.sequence); box.dispose();
  assert.equal((await final).closed, true);
});

test('Desktop calls serialize text as data and refuse foreign documents before invoking the endpoint', async () => {
  const channel = randomUUID(), origin = 'http://127.0.0.1:34567', value = 'x\"); throw new Error("injected"); //';
  const box = createDesktopMailbox(channel, async (_action, payload) => assert.equal(payload.sessionId, value));
  const context = { location: { origin, pathname: '/' }, window: { [DESKTOP_MAILBOX]: box.api } };
  const source = desktopCallSource(origin, channel, 'request', ['navigate', { sessionId: value }]);
  assert.equal((await vm.runInNewContext(source, context)).ok, true);
  assert.equal(await vm.runInNewContext(source, { ...context, location: { origin: 'https://example.com', pathname: '/' } }), null);
  assert.throws(() => desktopCallSource(origin, channel, 'eval', []));
  box.dispose();
});

test('Desktop lease acquired after unmount is released without attaching a page', async () => {
  let resolve, appended = false;
  const releases = [], bridge = { acquire: () => new Promise(r => { resolve = r; }), release: async id => { releases.push(id); } };
  const view = mountDesktopView({ host: { append: () => { appended = true; } }, entry: { key: 'test' }, bridge,
    onMessage: () => {}, onError: error => { throw error; } });
  view.dispose(); resolve({ lease: 'owned', partition: 'isolated' });
  await new Promise(r => setImmediate(r));
  assert.equal(appended, false); assert.deepEqual(releases, ['owned']);
});

test('Desktop view uses an approved isolated lease, retains one page and ends owned resources', async () => {
  const channel = randomUUID(), origin = 'http://127.0.0.1:34567', commands = [], releases = [], errors = [];
  const box = createDesktopMailbox(channel, async (...args) => { commands.push(args); });
  const attrs = new Map(); let loads = 0, removed = false, firstMessage;
  const ready = new Promise(resolve => { firstMessage = resolve; });
  class Webview extends EventTarget {
    setAttribute(key, value) { attrs.set(key, value); }
    getURL() { return this.url || 'about:blank'; }
    async loadURL(url) { loads++; this.url = url; queueMicrotask(() => this.dispatchEvent(new Event('dom-ready'))); }
    executeJavaScript(source) { const url = new URL(this.url); return Promise.resolve(vm.runInNewContext(source, {
      location: { origin: url.origin, pathname: url.pathname }, window: { [DESKTOP_MAILBOX]: box.api },
    })); }
    remove() { removed = true; box.dispose(); }
  }
  const element = new Webview(), bridge = { acquire: async () => ({ lease: 'owned', partition: 'isolated' }), release: async id => { releases.push(id); } };
  const view = mountDesktopView({ host: { append: () => queueMicrotask(() => element.dispatchEvent(new Event('dom-ready'))) },
    entry: { key: 'ubuntu-user', origin, channel, settings: { distro: 'Ubuntu' }, url: origin + '/?token=test' }, bridge,
    createElement: () => element, onMessage: firstMessage, onError: error => errors.push(error) });
  box.publish('catalog', { catalog: { rows: [] } });
  assert.equal((await ready).type, 'catalog');
  await view.request('navigate', { sessionId: 'a' }); await view.request('navigate', { sessionId: 'b' });
  assert.equal(loads, 1); assert.equal(commands.length, 2);
  assert.equal(attrs.get('partition'), 'isolated'); assert.equal(attrs.get('src'), 'about:blank#owned');
  assert.equal(attrs.has('preload'), false); assert.equal(attrs.has('disablewebsecurity'), false);
  element.url = 'https://example.com/'; await assert.rejects(view.request('navigate', { sessionId: 'c' }));
  view.dispose(); await new Promise(resolve => setImmediate(resolve));
  assert.equal(removed, true); assert.deepEqual(releases, ['owned']); assert.deepEqual(errors, []);
});
