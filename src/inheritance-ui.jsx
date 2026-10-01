import React from 'react';
import { Button } from '@deepseek-ai/dsh-client-ui-primitives';

export function InheritanceSection({ state, model, chosen, task, api, disabled }) {
  const inheritance = state.native?.inheritance;
  if (state.mode !== 'windows-host' || !inheritance?.available) return null;
  const { options, applied } = inheritance;
  return <section className="dsh-wsl-section" aria-labelledby="dsh-wsl-inheritance-title">
    <div className="dsh-wsl-section-heading"><h2 id="dsh-wsl-inheritance-title">Linux 插件与配置</h2><span className="dsh-wsl-caption">主环境：{inheritance.source}</span></div>
    <div className="dsh-wsl-card dsh-wsl-inheritance">
      <p>默认沿用主环境。在 Linux 中单独修改的项目会保留，后续同步只更新仍跟随主环境的部分。</p>
      <div className="dsh-wsl-inherit-options">
        {[['plugins', '继承插件'], ['config', '继承设置'], ['credentials', '继承模型账号']].map(([key, label]) => <label key={key}><input type="checkbox" checked={options[key]} disabled={disabled} onChange={event => void task('inheritance', () => api('native/inheritance', { ...chosen(), options: { [key]: event.target.checked } }))} />{label}</label>)}
      </div>
      <div className="dsh-wsl-inherit-actions"><Button variant="outline" disabled={disabled || !chosen().distro} onClick={() => void model.conversations.enter(chosen(), { panel: 'plugins' })}>管理 Linux 插件与设置</Button>
        <span className="dsh-wsl-caption">更改继承选项后，下次启动 Linux 生效。</span></div>
      {applied && <details className="dsh-wsl-inherit-details"><summary>已继承 {applied.plugins.filter(p => p.status === 'inherited').length} 个插件{applied.overrides ? ` · 保留 ${applied.overrides} 项 Linux 调整` : ''}</summary>
        <ul>{applied.plugins.map(p => <li key={p.name}><span>{p.name} <small>{p.version}</small></span><span>{p.status === 'inherited' ? '跟随主环境' : p.status === 'overridden' ? 'Linux 单独配置' : p.reason}</span></li>)}</ul>
      </details>}
    </div>
  </section>;
}
