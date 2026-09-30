export class BridgeError extends Error {
  constructor(code, message) { super(message); this.name = 'BridgeError'; this.code = code; }
}
export function ensure(test, code, message) { if (!test) throw new BridgeError(code, message); }
export function text(value, name, max = 32768) {
  ensure(typeof value === 'string' && value.length > 0 && value.length <= max && !value.includes('\0'), 'INVALID_ARGUMENT', `${name} 必须是非空字符串，且不含 NUL。`);
  return value;
}
export function integer(value, fallback, min, max, name = 'number') {
  if (value === undefined) return fallback;
  ensure(Number.isSafeInteger(value) && value >= min && value <= max, 'INVALID_ARGUMENT', `${name} 必须是 ${min}–${max} 之间的整数。`);
  return value;
}
export function aborted(signal) { if (signal?.aborted) throw new BridgeError('ABORTED', '操作已取消。'); }
export function errorData(e) { return { code: typeof e?.code === 'string' ? e.code : 'BRIDGE_ERROR', message: String(e?.message ?? e).slice(0, 4096) }; }
