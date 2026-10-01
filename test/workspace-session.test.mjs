import test from 'node:test';
import assert from 'node:assert/strict';
import { connectWorkspace, openWorkspace, startSession } from '../src/workspace-session.mjs';

function fixture(error) {
  const calls = [], navigation = new AbortController();
  const sessions = { phase: 'ready', ids: ['old'], byId: { old: { updatedAt: 10, retainedBy: { mainView: 1 } } } };
  const workspaces = { phase: 'ready', items: [{ workspaceId: 'project', sessionIds: ['old'] }] };
  const ctx = {
    sessions: { list: { getSnapshot: () => sessions }, create: async options => { calls.push(['create', options]); return 'fresh'; } },
    workspaces: { list: { getSnapshot: () => workspaces } },
    layout: { beginNavigation: () => navigation.signal },
    uiWorkspace: {
      connectWorkspace: async id => { calls.push(['connect', id]); if (error) throw error; return 'old'; },
      openSession: id => calls.push(['open', id]), startSession: () => calls.push(['empty']),
    },
  };
  return { ctx, calls, sessions, workspaces, navigation };
}
const missing = () => Object.assign(new Error('Unknown agent preset: anchored-standard'),
  { name: 'SessionCreateError', rpcError: { code: 'agent-preset/not-found' } });

test('removed blank-session preset creates one new identity with the current host default', async () => {
  const { ctx, calls } = fixture(missing());
  assert.deepEqual(await Promise.all([connectWorkspace(ctx, 'project'), connectWorkspace(ctx, 'project')]), ['fresh', 'fresh']);
  assert.deepEqual(calls, [['connect', 'project'], ['create', { workspaceId: 'project' }]]);
});

test('valid blank sessions are reused and other failures are not retried', async () => {
  const healthy = fixture(); assert.equal(await connectWorkspace(healthy.ctx, 'project'), 'old');
  assert.deepEqual(healthy.calls, [['connect', 'project']]);
  for (const error of [new Error('Unknown agent preset: anchored-standard'), Object.assign(missing(), { rpcError: { code: 'session/writer-held' } })]) {
    const f = fixture(error); await assert.rejects(connectWorkspace(f.ctx, 'project'), candidate => candidate === error);
    assert.deepEqual(f.calls, [['connect', 'project']]);
  }
});

test('an invalid default fails once and leaves the original blank session intact', async () => {
  const f = fixture(missing()); let attempts = 0;
  f.ctx.sessions.create = async () => { attempts++; throw missing(); };
  await assert.rejects(connectWorkspace(f.ctx, 'project'), /Unknown agent preset/);
  assert.equal(attempts, 1); assert.deepEqual(f.workspaces.items[0].sessionIds, ['old']);
});

test('new-session navigation uses the active or explicit workspace and honors cancellation', async () => {
  const f = fixture(missing()); await startSession(f.ctx);
  assert.deepEqual(f.calls.at(-1), ['open', 'fresh']);
  f.calls.length = 0; await startSession(f.ctx, 'other');
  assert.deepEqual(f.calls[0], ['connect', 'other']);
  f.calls.length = 0; f.navigation.abort(); await openWorkspace(f.ctx, 'project');
  assert.ok(!f.calls.some(([name]) => name === 'open'));
});

test('new-session fallback chooses the most recent workspace and retains the empty-home behavior', async () => {
  const f = fixture(); f.sessions.byId.old.retainedBy.mainView = 0;
  f.workspaces.items.push({ workspaceId: 'recent', sessionIds: [], createdAt: new Date(100).toISOString() });
  await startSession(f.ctx); assert.deepEqual(f.calls[0], ['connect', 'recent']);
  f.calls.length = 0; f.workspaces.items = []; await startSession(f.ctx);
  assert.deepEqual(f.calls, [['empty']]);
});
