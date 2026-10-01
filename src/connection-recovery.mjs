// Retries reconnect the page only. Business operations are never replayed here.
export function createConnectionRecovery({ retry, current, changed, delays = [1500, 4000, 10000], stableMs = 60000,
  setTimer = setTimeout, clearTimer = clearTimeout }) {
  const states = new Map();
  const valid = entry => current(entry.key) === entry;
  function cancel(key) {
    const state = states.get(key);
    if (state) { clearTimer(state.timer); clearTimer(state.stable); states.delete(key); }
  }
  function failed(entry, error, graceMs = 0) {
    if (!valid(entry)) return;
    let state = states.get(entry.key);
    if (!state) states.set(entry.key, state = { attempts: 0 });
    clearTimer(state.stable); state.stable = null;
    if (state.running) { state.failure = error; return; }
    if (state.timer) return;
    if (state.attempts >= delays.length) {
      entry.recovery = { phase: 'failed', attempt: state.attempts, message: '自动重连未成功，请检查 WSL 环境后重试。' };
      changed(); return;
    }
    entry.recovery = { phase: 'waiting', attempt: state.attempts + 1, message: '正在自动重新连接 WSL…' };
    state.timer = setTimer(async () => {
      state.timer = null;
      if (states.get(entry.key) !== state || !valid(entry)) return;
      state.attempts++; state.running = true; state.failure = null;
      entry.recovery = { ...entry.recovery, phase: 'connecting' }; changed();
      let failure;
      try { await retry(entry); } catch (reason) { failure = reason; }
      finally { state.running = false; }
      failure ||= state.failure;
      if (failure && states.get(entry.key) === state) {
        const next = current(entry.key);
        if (next) failed(next, failure);
      }
    }, Math.max(graceMs, delays[state.attempts]));
    changed();
  }
  function connected(entry) {
    if (!valid(entry)) return;
    entry.recovery = null;
    const state = states.get(entry.key);
    if (!state) return;
    state.failure = null;
    clearTimer(state.timer); state.timer = null;
    if (!state.stable) state.stable = setTimer(() => cancel(entry.key), stableMs);
  }
  return { failed, connected, cancel, dispose() { for (const key of states.keys()) cancel(key); } };
}
