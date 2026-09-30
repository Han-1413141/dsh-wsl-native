import { localOrigin } from './handoff.mjs';
import { DESKTOP_MAILBOX } from './desktop-mailbox.mjs';

// These fixed calls target our own signed Linux plugin endpoint, never user-supplied JavaScript.
export function desktopCallSource(origin, channel, method, args) {
  if (!localOrigin(origin) || !['next', 'request'].includes(method) || !/^[a-zA-Z0-9-]{32,64}$/.test(channel))
    throw new Error('桌面 WSL 通道参数无效。');
  return `(() => { if (location.origin !== ${JSON.stringify(origin)} || location.pathname !== '/') return null; const api = window[${JSON.stringify(DESKTOP_MAILBOX)}]; return api ? api[${JSON.stringify(method)}](...${JSON.stringify([channel, ...args])}) : null; })()`;
}

export function mountDesktopView({ host, entry, bridge, onMessage, onError, createElement = () => document.createElement('webview') }) {
  let disposed = false, element, lease, unsubscribe, generation = 0, timer, wakeDelay;
  const delay = ms => new Promise(resolve => { wakeDelay = resolve; timer = setTimeout(() => { wakeDelay = null; resolve(); }, ms); });
  const invoke = (method, ...args) => {
    if (disposed || !element || new URL(element.getURL()).origin !== entry.origin)
      return Promise.reject(new Error('WSL 页面尚未连接或已离开所属环境。'));
    return element.executeJavaScript(desktopCallSource(entry.origin, entry.channel, method, args));
  };
  async function subscribe(current) {
    let sequence = 0;
    const until = Date.now() + 45000;
    try {
      while (!disposed && current === generation) {
        const message = await invoke('next', sequence);
        if (disposed || current !== generation) return;
        if (!message) {
          if (Date.now() > until) throw new Error('Linux 对话插件尚未就绪，请重新连接。');
          await delay(250); continue;
        }
        if (message.closed) return;
        if (!Number.isSafeInteger(message.sequence) || message.sequence < sequence) throw new Error('WSL 页面返回了无效游标。');
        sequence = message.sequence;
        if (message.catalog) onMessage({ type: 'catalog', catalog: message.catalog });
        for (const event of (message.signals || []).slice(0, 16))
          if (['return', 'sidebar'].includes(event.type)) onMessage({ type: event.type });
      }
    } catch (error) { if (!disposed && current === generation) onError(error); }
  }
  const adapter = {
    async request(action, payload) {
      const result = await invoke('request', action, payload);
      if (!result?.ok) throw new Error(result?.error || 'WSL 页面尚未连接。');
    },
    dispose() {
      if (disposed) return;
      disposed = true; generation++; clearTimeout(timer); wakeDelay?.(); unsubscribe?.();
      element?.remove();
      if (lease) void bridge.release(lease).catch(() => {});
    },
  };
  void (async () => {
    if (!bridge?.acquire || !bridge?.release) throw new Error('当前 DSH 桌面端没有隔离浏览器接口，请更新 DSH 或使用 Web 入口。');
    const reservation = await bridge.acquire('dsh-wsl-native:' + entry.key);
    lease = reservation.lease;
    if (disposed) { await bridge.release(lease); return; }
    element = createElement();
    element.className = 'dsh-wsl-desktop-view';
    element.setAttribute('name', lease);
    element.setAttribute('partition', reservation.partition);
    element.setAttribute('allowpopups', '');
    element.setAttribute('aria-label', `WSL ${entry.settings.distro} 原生 DSH 对话`);
    element.setAttribute('src', 'about:blank#' + lease);
    let bootstrap = true;
    element.addEventListener('dom-ready', () => {
      if (disposed) return;
      if (bootstrap) {
        bootstrap = false;
        void element.loadURL(entry.url).catch(error => { if (!disposed) onError(error); });
      } else void subscribe(++generation);
    });
    element.addEventListener('did-start-navigation', event => { if (event.isMainFrame && !event.isInPlace) generation++; });
    element.addEventListener('did-fail-load', event => {
      if (!disposed && event.isMainFrame && event.errorCode !== -3) onError(new Error('WSL 页面加载失败，请检查 Linux 实例并重新连接。'));
    });
    element.addEventListener('render-process-gone', () => {
      generation++; if (!disposed) onError(new Error('WSL 对话页面已退出，后台宿主仍独立运行。请重新连接。'));
    });
    unsubscribe = bridge.onOpenRequested?.(lease, url => {
      // The shell validates these user-clicked HTTP(S) links before publishing them.
      if (!disposed && /^https?:/.test(url)) window.open(url, '_blank', 'noopener');
    });
    host.append(element);
  })().catch(error => { if (!disposed) onError(error); });
  return adapter;
}
