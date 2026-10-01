import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { handoffUrl, readHandoff } from '../src/handoff.mjs';
import { signHandoff, verifyHandoff } from '../src/handoff-auth.mjs';
import { embeddedUrl, readEmbed, acceptsMessage, cleanCatalog, conversationKey,
  conversationRows, catalogOf, CONVERSATION_PROTOCOL } from '../src/conversation-protocol.mjs';

test('embedded navigation preserves the signed handoff and never accepts a foreign parent', () => {
  const secret = 'test-key-only';
  const signed = signHandoff({ id: randomUUID(), settings: { distro: 'Ubuntu', user: 'dev', directory: '/home/dev/a' }, parentOrigin: 'http://127.0.0.1:8080' }, secret);
  const launch = handoffUrl('http://127.0.0.1:9090/?token=test', signed);
  const channel = randomUUID(), url = embeddedUrl(launch, channel, 'http://127.0.0.1:8080');
  assert.equal(verifyHandoff(readHandoff(new URL(url).hash), secret), true);
  assert.deepEqual(readEmbed(new URL(url).hash), { channel, parentOrigin: 'http://127.0.0.1:8080' });
  assert.throws(() => embeddedUrl(launch, channel, 'http://127.0.0.1:8181'));
  assert.throws(() => embeddedUrl(launch, 'short', 'http://127.0.0.1:8080'));
  assert.equal(readEmbed('#dsh-wsl=' + encodeURIComponent(JSON.stringify({ ...readHandoff(new URL(launch).hash), proof: undefined, embed: { channel } }))), null);
});

test('message boundary requires the exact origin, window, channel and protocol', () => {
  const source = {}, channel = randomUUID(), origin = 'http://127.0.0.1:9090';
  const expected = { source, origin, channel };
  const event = { source, origin, data: { channel, protocol: CONVERSATION_PROTOCOL, type: 'catalog' } };
  assert.equal(acceptsMessage(event, expected), true);
  for (const other of [{ ...event, source: {} }, { ...event, origin: 'http://127.0.0.1:9091' },
    { ...event, origin: 'https://example.com' }, { ...event, data: { ...event.data, channel: randomUUID() } },
    { ...event, data: { ...event.data, protocol: 'other' } }, { ...event, data: { ...event.data, type: 'exec' } }])
    assert.equal(acceptsMessage(other, expected), false);
});

test('cross-host catalogs carry only bounded navigation metadata', () => {
  const catalog = cleanCatalog({ selectedId: 'absent', connected: true, phase: 'ready', token: 'secret', rows: [
    { id: 'one', title: 'a'.repeat(800), cwd: '/home/dev', apiKey: 'secret', messages: ['private'], updatedAt: Infinity },
    { id: 'one', title: 'duplicate' }, { id: null },
  ] });
  assert.equal(catalog.rows.length, 1); assert.equal(catalog.rows[0].title.length, 500);
  assert.equal(catalog.rows[0].updatedAt, 0); assert.equal(catalog.selectedId, null);
  assert.doesNotMatch(JSON.stringify(catalog), /secret|private|apiKey|messages/);
  assert.equal(cleanCatalog({ rows: Array(5001).fill({ id: 'x' }) }), null);
});

test('identical session ids from Windows and two WSL users remain distinct', () => {
  const row = { id: 'same-id', title: '项目', archived: false, updatedAt: 10, pinned: false };
  const a = { key: conversationKey({ distro: 'Ubuntu', user: 'alice' }), settings: { distro: 'Ubuntu', user: 'alice' }, catalog: { rows: [row] } };
  const b = { key: conversationKey({ distro: 'Ubuntu', user: 'bob' }), settings: { distro: 'Ubuntu', user: 'bob' }, catalog: { rows: [row] } };
  const rows = conversationRows({ rows: [row] }, [a, b]);
  assert.equal(rows.length, 3); assert.equal(new Set(rows.map(item => item.key)).size, 3);
  assert.equal(conversationRows({ rows: [row] }, [a, b], { filter: 'wsl' }).length, 2);
  assert.equal(conversationRows({ rows: [row] }, [a, b], { filter: 'windows' }).length, 1);
  assert.equal(conversationRows({ rows: [row] }, [a], { query: 'ubuntu' }).length, 1);
});

test('pinning and archive filters apply across hosts without mutating source data', () => {
  const local = { rows: [{ id: 'old', title: '旧任务', pinned: true, archived: false, updatedAt: 1 },
    { id: 'new', title: '新任务', pinned: false, archived: false, updatedAt: 20 },
    { id: 'archived', title: '历史', archived: true, updatedAt: 99 }] };
  assert.deepEqual(conversationRows(local, []).map(row => row.id), ['old', 'new']);
  assert.deepEqual(conversationRows(local, [], { archived: true }).map(row => row.id), ['archived']);
  assert.equal(local.rows.length, 3); assert.equal(local.rows[0].key, undefined);
});

test('native catalog projects real workspace ownership and excludes subagents', () => {
  const ctx = { sessions: { list: { getSnapshot: () => ({ phase: 'ready', ids: ['a', 'child'], byId: {
    a: { id: 'a', displayTitle: 'Project', cwd: 'C:\\work', running: true, retainedBy: { mainView: 1 }, updatedAt: 20 },
    child: { id: 'child', parentId: 'a' },
  } }) } }, workspaces: { list: { getSnapshot: () => ({ items: [{ workspaceId: 'w', title: 'work', sessionIds: ['a'] }], archivedSessionIds: [], pinnedSessionIds: ['a'] }) } },
    connection: { state: { getSnapshot: () => 'connected' } } };
  const result = catalogOf(ctx);
  assert.equal(result.rows.length, 1); assert.equal(result.rows[0].workspaceId, 'w');
  assert.equal(result.rows[0].pinned, true); assert.equal(result.rows[0].running, true);
  assert.equal(result.selectedId, 'a'); assert.equal(result.connected, true);
  assert.equal(result.phase, 'loading', 'workspace initialization must complete before commands are dispatched');
});
