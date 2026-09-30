import { BridgeError, ensure, errorData, aborted } from './errors.mjs';
export const MAX_FRAME = 2097152;
export const PROTOCOL = 1;

export function readFrames(stream, onFrame, onError) {
  let pending = Buffer.alloc(0), failed = false;
  const fail = error => { if (!failed) { failed = true; onError(error); } };
  const data = chunk => {
    if (failed) return;
    pending = Buffer.concat([pending, Buffer.from(chunk)]);
    let end;
    while ((end = pending.indexOf(10)) >= 0) {
      if (end > MAX_FRAME) { fail(new BridgeError('FRAME_TOO_LARGE', 'RPC 数据帧超过上限。')); return; }
      const line = pending.subarray(0, end); pending = pending.subarray(end + 1);
      if (!line.length) continue;
      try { onFrame(JSON.parse(line.toString('utf8'))); } catch (e) { fail(new BridgeError('INVALID_FRAME', `RPC 帧无效：${e.message}`)); return; }
    }
    if (pending.length > MAX_FRAME) fail(new BridgeError('FRAME_TOO_LARGE', 'RPC 数据帧超过上限。'));
  };
  stream.on('data', data);
  return () => stream.off('data', data);
}
export function writeFrame(stream, value) {
  const frame = JSON.stringify(value) + '\n';
  ensure(Buffer.byteLength(frame) <= MAX_FRAME, 'FRAME_TOO_LARGE', 'RPC 数据帧超过上限。');
  ensure(!stream.destroyed && !stream.writableEnded, 'CONNECTION_CLOSED', '连接已关闭。');
  ensure(stream.writableLength < 4 * MAX_FRAME, 'BACKPRESSURE', '连接写入队列已满。');
  return new Promise((resolve, reject) => { stream.write(frame, error => error ? reject(error) : resolve()); });
}

export class RpcClient {
  constructor(child, { startupMs = 20000, onExit } = {}) {
    this.child = child; this.pending = new Map(); this.next = 0; this.closed = false; this.stderr = '';
    this.ready = new Promise((resolve, reject) => { this.readyResolve = resolve; this.readyReject = reject; });
    // A bootstrap failure may precede the caller awaiting ready.
    this.ready.catch(() => {});
    this.startupTimer = setTimeout(() => this.fail(new BridgeError('START_TIMEOUT', '桥接服务启动超时。检查 WSL 和 Linux Node.js。')), startupMs);
    this.unread = readFrames(child.stdout, msg => this.receive(msg), error => this.fail(error));
    child.stderr.on('data', data => { this.stderr = (this.stderr + data.toString(data.includes(0) ? 'utf16le' : 'utf8')).slice(-8192); });
    child.stdin.on('error', e => this.fail(e));
    child.once('error', e => this.fail(e));
    child.once('close', () => { this.fail(new BridgeError('CONNECTION_CLOSED', `桥接服务已退出。${this.stderr.trim()}`)); onExit?.(); });
  }
  receive(msg) {
    if (msg?.event === 'ready') {
      ensure(msg.protocol === PROTOCOL, 'PROTOCOL_MISMATCH', '桥接协议版本不匹配。');
      clearTimeout(this.startupTimer); this.info = msg.info; this.readyResolve(msg.info); return;
    }
    if (!Number.isSafeInteger(msg?.id)) throw new BridgeError('INVALID_FRAME', 'RPC 响应缺少 id。');
    const entry = this.pending.get(msg.id);
    if (!entry) return;
    this.pending.delete(msg.id); entry.cleanup();
    if (msg.error) entry.reject(new BridgeError(msg.error.code, msg.error.message));
    else entry.resolve(msg.result);
  }
  async call(method, params = {}, { signal, timeoutMs = 130000 } = {}) {
    aborted(signal); await this.ready; aborted(signal);
    ensure(!this.closed, 'CONNECTION_CLOSED', '连接已关闭。');
    ensure(this.pending.size < 32, 'BUSY', '当前连接已有 32 个待完成请求。');
    const id = ++this.next;
    return new Promise((resolve, reject) => {
      let cancelTimer;
      const cancel = () => {
        void writeFrame(this.child.stdin, { method: '$cancel', params: { id } }).catch(e => this.fail(e));
        // Wait for the worker to kill the process tree before settling cancellation.
        cancelTimer ??= setTimeout(() => this.fail(new BridgeError('CANCEL_TIMEOUT', '工作进程未能及时取消，连接已关闭。')), 6000);
      };
      const timer = setTimeout(cancel, timeoutMs);
      const cleanup = () => { clearTimeout(timer); clearTimeout(cancelTimer); signal?.removeEventListener('abort', cancel); };
      this.pending.set(id, { resolve, reject, cleanup });
      signal?.addEventListener('abort', cancel, { once: true });
      void writeFrame(this.child.stdin, { id, method, params }).then(() => { if (signal?.aborted) cancel(); }).catch(e => this.fail(e));
    });
  }
  fail(error) {
    if (this.closed) return;
    this.closed = true; clearTimeout(this.startupTimer); this.unread?.(); this.readyReject(error);
    for (const item of this.pending.values()) { item.cleanup(); item.reject(error); }
    this.pending.clear();
    // EOF lets the worker clean up its own children and temporary transfers.
    this.child.stdin.end();
    const timer = setTimeout(() => this.child.kill(), 6500); timer.unref();
  }
  async close() {
    if (!this.closed) this.fail(new BridgeError('CONNECTION_CLOSED', '连接已关闭。'));
    if (this.child.exitCode !== null || this.child.signalCode !== null) return;
    await new Promise(resolve => { const timer = setTimeout(resolve, 7000); this.child.once('close', () => { clearTimeout(timer); resolve(); }); });
  }
}

export async function serve(handlers, { input = process.stdin, output = process.stdout, info = {}, dispose = async () => {} } = {}) {
  const active = new Map(); let stopping = false;
  output.on('error', () => shutdown());
  async function shutdown() {
    if (stopping) return; stopping = true;
    unread(); input.pause();
    for (const task of active.values()) task.controller.abort();
    await Promise.allSettled([...active.values()].map(t => t.promise));
    await dispose();
  }
  const unread = readFrames(input, msg => {
    if (msg?.method === '$cancel') { active.get(msg.params?.id)?.controller.abort(); return; }
    if (stopping) return;
    ensure(Number.isSafeInteger(msg?.id) && msg.id > 0 && typeof msg.method === 'string', 'INVALID_FRAME', 'RPC 请求无效。');
    ensure(!active.has(msg.id), 'DUPLICATE_ID', '重复 RPC id。');
    const handler = handlers[msg.method];
    if (!handler || active.size >= 16) {
      void writeFrame(output, { id: msg.id, error: { code: handler ? 'BUSY' : 'UNKNOWN_METHOD', message: handler ? '同时执行的请求超过 16 个。' : '未知桥接方法。' } }).catch(shutdown); return;
    }
    const controller = new AbortController();
    const promise = Promise.resolve().then(() => handler(msg.params ?? {}, controller.signal)).then(
      result => ({ id: msg.id, result }), error => ({ id: msg.id, error: errorData(error) })
    ).then(reply => writeFrame(output, reply)).catch(() => { void shutdown(); }).finally(() => active.delete(msg.id));
    active.set(msg.id, { controller, promise });
  }, () => { void shutdown(); });
  input.once('end', shutdown);
  input.once('error', shutdown);
  await writeFrame(output, { event: 'ready', protocol: PROTOCOL, info });
  return shutdown;
}
