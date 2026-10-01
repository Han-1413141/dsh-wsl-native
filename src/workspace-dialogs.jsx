import React, { useState } from 'react';
import { Button, Input, Modal } from '@deepseek-ai/dsh-client-ui-primitives';
import { DirectoryPicker, normalized } from './components.jsx';
import { useModel } from './page.jsx';
import { HandoffDialog } from './handoff-dialog.jsx';

function CreateWorkspace({ model, api, close }) {
  const chat = model.conversations;
  const [settings, setSettings] = useState(() => normalized(chat.entries.get(chat.activeKey)?.settings || model.state?.settings || {}, model.state?.distros));
  const [picking, setPicking] = useState(false), [busy, setBusy] = useState(false), [error, setError] = useState('');
  const create = async path => {
    setPicking(false); setSettings(value => ({ ...value, directory: path })); setBusy(true); setError('');
    await chat.enter({ ...settings, directory: path }, { create: true });
    setBusy(false);
    if (chat.error) setError(chat.error); else close();
  };
  if (picking) return <DirectoryPicker api={api} distro={settings.distro} user={settings.user} initialPath={settings.directory}
    allowCreate onClose={() => setPicking(false)} onSelect={create} />;
  return <Modal open onClose={busy ? () => {} : close} title="新建 WSL 工作区" closeLabel="关闭"
    description="选择 Linux 文件夹，或在浏览目录时新建文件夹。" className="dsh-wsl-picker"
    footer={<><Button disabled={busy} onClick={close}>取消</Button><Button variant="primary" disabled={busy || !settings.distro || !settings.directory.trim()} onClick={() => void create(settings.directory.trim())}>{busy ? '正在打开…' : '创建工作区'}</Button></>}>
    <div className="dsh-wsl-dialog-form">
      <label>Linux 发行版<select value={settings.distro} disabled={busy} onChange={e => setSettings({ distro: e.target.value, user: '', directory: '' })}>
        {(model.state?.distros || []).map(distro => <option key={distro.name}>{distro.name}</option>)}
      </select></label>
      <label>Linux 用户<Input value={settings.user} disabled={busy} placeholder="默认用户" onChange={e => setSettings({ ...settings, user: e.target.value })} /></label>
      <label>工作区文件夹<div className="dsh-wsl-pathbar"><Input value={settings.directory} disabled={busy} placeholder="/home/用户名/项目" onChange={e => setSettings({ ...settings, directory: e.target.value })} /><Button variant="outline" disabled={busy || !settings.distro} onClick={() => setPicking(true)}>浏览…</Button></div></label>
      <p className="dsh-wsl-caption">工作区会加入当前窗口的原生列表，并显示 WSL 标志。</p>
      {error && <div role="alert" className="dsh-wsl-inline-error">{error}</div>}
    </div>
  </Modal>;
}

function RenameSession({ model, target, close }) {
  const [title, setTitle] = useState(target.title || target.row.title), [busy, setBusy] = useState(false), [error, setError] = useState('');
  const submit = async () => {
    setBusy(true); setError('');
    try { await model.conversations.remote(target.entry, 'session.rename', { sessionId: target.id, title }); close(); }
    catch (e) { setError(e.message); } finally { setBusy(false); }
  };
  return <Modal open onClose={busy ? () => {} : close} title="重命名 WSL 对话" closeLabel="关闭"
    footer={<><Button disabled={busy} onClick={close}>取消</Button><Button variant="primary" disabled={busy || !title.trim()} onClick={() => void submit()}>保存</Button></>}>
    <form className="dsh-wsl-dialog-form" onSubmit={e => { e.preventDefault(); if (!busy && title.trim()) void submit(); }}>
      <Input data-modal-autofocus value={title} maxLength={500} aria-label="对话名称" onChange={e => setTitle(e.target.value)} />
      {error && <div role="alert">{error}</div>}
    </form>
  </Modal>;
}

function ArchiveSession({ model, target, close }) {
  const [busy, setBusy] = useState(false), [error, setError] = useState('');
  const submit = async () => {
    setBusy(true);
    try { await model.conversations.remote(target.entry, 'archive', { sessionId: target.id, stopActivity: true }); close(); }
    catch (e) { setError(e.message); } finally { setBusy(false); }
  };
  return <Modal open title="归档正在运行的 WSL 对话" closeLabel="关闭" onClose={busy ? () => {} : close}
    description="归档会停止这条对话的运行任务，历史记录保留。"
    footer={<><Button disabled={busy} onClick={close}>取消</Button><Button disabled={busy} onClick={() => void submit()}>停止并归档</Button></>}>
    {error && <p role="alert">{error}</p>}
  </Modal>;
}

export function WorkspaceDialogs({ model, api }) {
  useModel(model);
  const dialog = model.conversations.dialog;
  const close = () => { model.conversations.dialog = null; model.emit(); };
  if (!dialog) return model.conversations.error && !model.conversations.visible() ? <div role="alert" className="dsh-wsl-operation-error"><span>{model.conversations.error}</span><Button variant="ghost" aria-label="关闭错误提示" onClick={() => { model.conversations.error = null; model.emit(); }}>×</Button></div> : null;
  if (dialog.type === 'workspace') return <CreateWorkspace model={model} api={api} close={close} />;
  if (dialog.type === 'rename') return <RenameSession model={model} target={dialog.target} close={close} />;
  if (dialog.type === 'archive') return <ArchiveSession model={model} target={dialog.target} close={close} />;
  if (dialog.type === 'handoff') return <HandoffDialog model={model} source={dialog.source} close={close} />;
  return null;
}
