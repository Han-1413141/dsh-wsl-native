import test from 'node:test';
import assert from 'node:assert/strict';
import { createConnectionRecovery } from '../src/connection-recovery.mjs';

function fixture(retry) {
  let entry = { key: 'Ubuntu' }, sequence = 0;
  const timers = new Map(), waits = [];
  const recovery = createConnectionRecovery({ retry, current: () => entry, changed() {}, delays: [10, 20, 40], stableMs: 100,
    setTimer(fn, ms) { const id = ++sequence; timers.set(id, { fn, ms }); waits.push(ms); return id; },
    clearTimer(id) { timers.delete(id); },
  });
  return { recovery, timers, waits, get entry() { return entry; }, replace() { entry = { ...entry }; },
    async tick() { const [id, timer] = timers.entries().next().value; timers.delete(id); await timer.fn(); },
  };
}

test('recovery coalesces failures, survives page replacement and stops after three retries', async () => {
  let attempts = 0;
  const f = fixture(async () => { attempts++; f.replace(); throw new Error('offline'); });
  for (let i = 0; i < 10; i++) f.recovery.failed(f.entry, new Error('offline'));
  assert.equal(f.timers.size, 1);
  await f.tick(); await f.tick(); await f.tick();
  assert.equal(attempts, 3); assert.equal(f.timers.size, 0);
  assert.deepEqual(f.waits, [10, 20, 40]); assert.equal(f.entry.recovery.phase, 'failed');
  f.recovery.failed(f.entry, new Error('offline')); assert.equal(f.timers.size, 0);
});

test('a native reconnect within the grace period cancels page reload; only stable recovery resets the budget', async () => {
  const f = fixture(async () => {});
  f.recovery.failed(f.entry, new Error('offline'), 50);
  assert.deepEqual(f.waits, [50]);
  f.recovery.connected(f.entry); assert.equal(f.entry.recovery, null);
  assert.equal(f.timers.size, 1); // stability timer, not a reconnect
  await f.tick();
  f.recovery.failed(f.entry, new Error('offline')); await f.tick();
  f.recovery.connected(f.entry);
  f.recovery.failed(f.entry, new Error('offline'));
  assert.equal(f.entry.recovery.attempt, 2);
  f.recovery.dispose(); assert.equal(f.timers.size, 0);
});

test('a failure during a reconnect is retained, while closing a page cancels its pending retry', async () => {
  let finish;
  const f = fixture(() => new Promise(resolve => { finish = resolve; }));
  f.recovery.failed(f.entry, new Error('offline'));
  const running = f.tick();
  f.recovery.failed(f.entry, new Error('load failed'));
  finish(); await running;
  assert.equal(f.entry.recovery.attempt, 2); assert.equal(f.timers.size, 1);
  f.recovery.cancel(f.entry.key); assert.equal(f.timers.size, 0);
});
