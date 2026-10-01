import React, { useMemo, useState } from 'react';
import { Button, Modal } from '@deepseek-ai/dsh-client-ui-primitives';
import { handoffText } from './work-handoff.mjs';

export function HandoffDialog({ model, source, close }) {
  const chat = model.conversations;
  const environments = useMemo(() => [{ key: 'windows', label: 'Windows', entry: null, catalog: chat.nativeCatalog() },
    ...[...chat.entries.values()].map(entry => ({ key: entry.key, entry, catalog: entry.catalog,
      label: `WSL · ${entry.settings.distro}${entry.settings.user ? ' · ' + entry.settings.user : ''}` }))]
    .filter(env => env.key !== (source.entry?.key || 'windows')), [source, chat]);
  const [environment, setEnvironment] = useState(environments[0]?.key || ''), [target, setTarget] = useState('');
  const [notes, setNotes] = useState(''), [recent, setRecent] = useState(''), [busy, setBusy] = useState(false), [error, setError] = useState('');
  const [transferId, setTransferId] = useState(() => crypto.randomUUID());
  const selected = environments.find(env => env.key === environment);
  const text = handoffText(source, notes, recent), tooLong = text.length > 24000;
  const read = async () => {
    setBusy(true); setError('');
    try { const result = await chat.handoff(source.entry, 'handoff.read', { sessionId: source.id }); setRecent(result.text); }
    catch (e) { setError(e.message); } finally { setBusy(false); }
  };
  const deliver = async mode => {
    setBusy(true); setError('');
    try {
      const [kind, id] = JSON.parse(target);
      await chat.handoff(selected.entry, 'handoff.deliver', { transferId, mode, text, [kind === 'workspace' ? 'workspaceId' : 'sessionId']: id });
      close();
    } catch (e) { setError(e.message); } finally { setBusy(false); }
  };
  const blocked = busy || !target || (!notes.trim() && !recent.trim()) || tooLong;
  return <Modal open title="跨环境交接工作" closeLabel="关闭交接" onClose={busy ? () => {} : close}
    description={`来源：${source.entry ? 'WSL · ' + source.entry.settings.distro : 'Windows'} · ${source.row.title || '新对话'}`}
    className="dsh-wsl-picker"
    footer={<><Button disabled={busy} onClick={close}>取消</Button><Button variant="outline" disabled={blocked} onClick={() => void deliver('draft')}>放入目标输入框</Button><Button variant="primary" disabled={blocked} onClick={() => void deliver('send')}>发送交接</Button></>}>
    <div className="dsh-wsl-dialog-form">
      {!environments.length ? <p>先打开另一边的环境，再从对话菜单发起交接。</p> : <>
        <label>目标环境<select value={environment} disabled={busy} onChange={e => { setEnvironment(e.target.value); setTarget(''); setTransferId(crypto.randomUUID()); }}>
          {environments.map(env => <option key={env.key} value={env.key}>{env.label}</option>)}
        </select></label>
        <label>交给哪条对话<select value={target} disabled={busy} onChange={e => { setTarget(e.target.value); setTransferId(crypto.randomUUID()); }}>
          <option value="">选择已有对话，或在工作区中新建</option>
          <optgroup label="新建对话">{(selected?.catalog?.workspaces || []).map(workspace => <option key={workspace.workspaceId} value={JSON.stringify(['workspace', workspace.workspaceId])}>{workspace.title || workspace.path} · 新对话</option>)}</optgroup>
          <optgroup label="已有对话">{(selected?.catalog?.rows || []).filter(row => !row.archived).map(row => <option key={row.id} value={JSON.stringify(['session', row.id])}>{row.title || '新对话'}{row.running ? ' · 运行中，交接将排队' : ''}</option>)}</optgroup>
        </select></label>
      </>}
      <label>工作说明<textarea value={notes} disabled={busy} maxLength={20000} onChange={e => setNotes(e.target.value)} placeholder="已完成的内容、相关文件、接下来需要做的工作…" /></label>
      <div><Button size="sm" variant="outline" disabled={busy} onClick={() => void read()}>带入最近对话</Button><span className="dsh-wsl-caption">　最多 8 条文字消息，可在下方编辑</span></div>
      {recent && <label>对话摘录<textarea value={recent} disabled={busy} onChange={e => setRecent(e.target.value)} /></label>}
      <details><summary>预览完整交接内容</summary><pre className="dsh-wsl-handoff-preview">{text}</pre></details>
      <p className="dsh-wsl-caption">发送后，运行中的目标对话会将交接排队处理。来源任务继续运行，文件保持原位置。</p>
      {tooLong && <p role="alert">内容超过 24,000 个字符，请精简工作说明或对话摘录。</p>}
      {error && <p role="alert" className="dsh-wsl-inline-error">{error}</p>}
    </div>
  </Modal>;
}
