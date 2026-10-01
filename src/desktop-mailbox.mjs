export const DESKTOP_MAILBOX = '__DSH_WSL_DESKTOP_V1__';
import { CONVERSATION_ACTIONS as actions } from './workspace-commands.mjs';

// A capability-scoped, change-driven mailbox inside the owned Linux webview.
// It is installed only after the Linux host verifies the signed workspace handoff.
export function createDesktopMailbox(channel, command, { waitMs = 20000 } = {}) {
  let sequence = 0, catalogSequence = 0, catalog = null, closed = false, waiter;
  const signals = [];
  const authorize = value => {
    if (closed || value !== channel) throw new Error('WSL 页面通道无效或已关闭。');
  };
  const snapshot = after => ({ sequence, closed, catalog: catalogSequence > after ? catalog : null,
    signals: signals.filter(item => item.sequence > after) });
  const wake = () => waiter?.();
  return {
    api: Object.freeze({
      async request(key, action, payload = {}) {
        authorize(key);
        if (!actions.has(action) || !payload || typeof payload !== 'object' || Array.isArray(payload) ||
            JSON.stringify(payload).length > 131072) throw new Error('WSL 页面操作无效。');
        try { const value = await command(action, payload); return value === undefined ? { ok: true } : { ok: true, value }; }
        catch (error) { return { ok: false, error: String(error?.message || error).slice(0, 1000) }; }
      },
      next(key, after = 0) {
        authorize(key);
        if (!Number.isSafeInteger(after) || after < 0 || after > sequence) throw new Error('WSL 页面游标无效。');
        if (sequence > after) return Promise.resolve(snapshot(after));
        if (waiter) throw new Error('WSL 页面已经存在等待中的订阅。');
        return new Promise(resolve => {
          const finish = () => { clearTimeout(timer); waiter = null; resolve(snapshot(after)); };
          const timer = setTimeout(finish, waitMs);
          waiter = finish;
        });
      },
    }),
    publish(type, payload) {
      if (closed) return;
      if (type === 'catalog') { catalog = payload.catalog; catalogSequence = ++sequence; }
      else if (type === 'return' || type === 'sidebar') {
        signals.push({ sequence: ++sequence, type });
        if (signals.length > 16) signals.shift();
      } else return;
      wake();
    },
    dispose() { closed = true; wake(); signals.length = 0; catalog = null; },
  };
}
