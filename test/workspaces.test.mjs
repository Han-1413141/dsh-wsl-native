import test from 'node:test';
import assert from 'node:assert/strict';
import { projectWorkspaces, reorderWorkspace, remoteId } from '../src/workspace-projection.mjs';
import { cleanCatalog } from '../src/conversation-protocol.mjs';
import { workspaceCommand } from '../src/workspace-commands.mjs';
import { bindHandoffDraft, createWorkHandoff, recentConversation } from '../src/work-handoff.mjs';

const catalog = () => cleanCatalog({ rows: [{ id: 'same', title: '任务', workspaceId: 'same', pinned: true }],
  workspaces: [{ workspaceId: 'same', title: 'Linux 项目', path: '/tmp/a', sessionIds: ['same'] },
    { workspaceId: 'empty', title: '空项目', path: '/tmp/b', sessionIds: [] }], selectedId: 'same', phase: 'ready' });
const entry = { key: '["Ubuntu","codex"]', catalog: catalog(), settings: { distro: 'Ubuntu', user: 'codex' } };
const localSessions = { ids: ['same'], byId: { same: { id: 'same', retainedBy: { mainView: 1 } } }, phase: 'ready', projectionsBySession: {} };
const localWorkspaces = { items: [{ workspaceId: 'same', title: 'Windows', sessionIds: ['same'] }], pinnedSessionIds: [], archivedSessionIds: [], phase: 'ready' };

test('native projection preserves empty workspaces and isolates colliding host ids and selection', () => {
  const p = projectWorkspaces(localSessions, localWorkspaces, new Map(), [entry], entry.key);
  assert.equal(p.workspaces.items.length, 3);
  const id = remoteId(entry, 'session', 'same');
  assert.equal(p.sessions.byId.same.retainedBy.mainView, 0);
  assert.equal(p.sessions.byId[id].retainedBy.mainView, 1);
  assert.equal(localSessions.byId.same.retainedBy.mainView, 1);
  assert.deepEqual(p.workspaces.pinnedSessionIds, [id]);
  assert.equal(p.targets.get(id).id, 'same');
  assert.deepEqual(p.workspaces.items[2].sessionIds, []);
});

test('cross-host workspace drag changes display order and routes only a same-host anchor', () => {
  const p = projectWorkspaces(localSessions, localWorkspaces, new Map(), [entry], null);
  const a = remoteId(entry, 'workspace', 'same'), b = remoteId(entry, 'workspace', 'empty');
  const move = reorderWorkspace(p.workspaces.items, p.targets, b, 'same');
  assert.deepEqual(move.order, [b, 'same', a]);
  assert.equal(move.beforeId, 'same'); // Real Linux id, never the Windows workspace object.
  const win = reorderWorkspace(p.workspaces.items, p.targets, 'same', b);
  assert.equal(win.beforeId, undefined);
  assert.throws(() => reorderWorkspace(p.workspaces.items, p.targets, 'missing', a));
});

test('workspace commands validate exact membership before rename, delete and reorder', async () => {
  const calls = [], ctx = { workspaces: { list: { getSnapshot: () => ({ items: [{ workspaceId: 'a' }, { workspaceId: 'b' }] }) },
    rename: (...args) => calls.push(['rename', ...args]), delete: (...args) => calls.push(['delete', ...args]), insertBefore: (...args) => calls.push(['order', ...args]) } };
  await workspaceCommand(ctx, 'workspace.rename', { workspaceId: 'a', title: ' 新名称 ' });
  await workspaceCommand(ctx, 'workspace.reorder', { workspaceId: 'b', beforeId: 'a' });
  await workspaceCommand(ctx, 'workspace.delete', { workspaceId: 'b' });
  assert.deepEqual(calls, [['rename', 'a', '新名称'], ['order', 'b', 'a'], ['delete', 'b']]);
  await assert.rejects(workspaceCommand(ctx, 'workspace.delete', { workspaceId: 'foreign' }));
  await assert.rejects(workspaceCommand(ctx, 'workspace.reorder', { workspaceId: 'a', beforeId: 'foreign' }));
  await assert.rejects(workspaceCommand(ctx, 'workspace.rename', { workspaceId: 'a', title: '\n' }));
});

test('handoff excerpt includes only visible message text, not tools, reasoning or attachments', () => {
  const excerpt = recentConversation([
    { type: 'event', event: { type: 'user/message', data: { content: [{ type: 'text', text: '修复 UI' }, { type: 'image', data: 'secret image' }] } } },
    { type: 'event', event: { type: 'tool/result', data: 'secret tools' } },
    { type: 'event', event: { type: 'assistant/message', data: { message: { content: [{ type: 'reasoning', text: 'secret reasoning' }, { type: 'text', text: '已完成按钮' }] } } } },
  ]);
  assert.match(excerpt, /修复 UI/); assert.match(excerpt, /已完成按钮/); assert.doesNotMatch(excerpt, /secret/);
});

function handoffFixture() {
  const receipts = new Map(), sends = [], drafts = [], opened = [];
  let draft = '', stored = '';
  const ctx = { sessions: { list: { getSnapshot: () => ({ byId: { target: { id: 'target' } } }) },
    using: async (_id, _options, use) => use({ binding: { ctx: {}, session: { prompt: async (...args) => { sends.push(args); return { ok: true }; } } } }) },
    workspaces: { list: { getSnapshot: () => ({ archivedSessionIds: [] }) } },
    uiWorkspace: { openSession: id => opened.push(id) },
    get: () => ({ input: { for: () => ({ state: { getSnapshot: () => ({ draft, attachmentIds: [], phase: 'plain' }) }, setDraft: text => { draft = text; drafts.push(text); } }) } }) };
  const storage = { getItem: key => receipts.get(key), setItem: (key, value) => receipts.set(key, value) };
  bindHandoffDraft(ctx, 'target', { getDraft: () => stored, setDraft: text => { stored = text; } });
  return { ctx, storage, sends, drafts, opened, getStored: () => stored, setStored: text => { stored = text; }, setDraft: text => { draft = text; } };
}

test('handoff queues exactly once and a persisted receipt prevents replay after reload', async () => {
  const f = handoffFixture(), deliver = createWorkHandoff(f.ctx, f.storage);
  const payload = { transferId: crypto.randomUUID(), mode: 'send', sessionId: 'target', text: '继续 Linux 工作' };
  await Promise.all([deliver('handoff.deliver', payload), deliver('handoff.deliver', payload)]);
  await createWorkHandoff(f.ctx, f.storage)('handoff.deliver', payload);
  assert.equal(f.sends.length, 1); assert.equal(f.sends[0][1], 'queue');
});

test('draft handoff preserves an existing draft and never calls the model', async () => {
  const f = handoffFixture(), deliver = createWorkHandoff(f.ctx, f.storage);
  const payload = { transferId: crypto.randomUUID(), mode: 'draft', sessionId: 'target', text: '待交接内容' };
  f.setDraft('用户未发送内容');
  await assert.rejects(deliver('handoff.deliver', payload), /已有草稿/);
  assert.equal(f.drafts.length, 0);
  f.setDraft(''); await deliver('handoff.deliver', payload);
  assert.deepEqual(f.drafts, ['待交接内容']); assert.equal(f.sends.length, 0);
  assert.equal(f.getStored(), '待交接内容');
});

test('draft handoff protects a persisted draft before its editor is hydrated', async () => {
  const f = handoffFixture(); f.setStored('尚未挂载的原生草稿');
  await assert.rejects(createWorkHandoff(f.ctx, f.storage)('handoff.deliver', {
    transferId: crypto.randomUUID(), mode: 'draft', sessionId: 'target', text: '交接',
  }), /已有草稿/);
  assert.equal(f.getStored(), '尚未挂载的原生草稿'); assert.equal(f.drafts.length, 0);
});
