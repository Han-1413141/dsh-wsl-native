window.__ModuleLoader__.load({id:"dsh-wsl-native",factory:(require)=>{const module={exports:{}};const exports=module.exports;
"use strict";var ye=Object.defineProperty;var Ke=Object.getOwnPropertyDescriptor;var Ve=Object.getOwnPropertyNames;var Ge=Object.prototype.hasOwnProperty;var Xe=(e,i)=>{for(var t in i)ye(e,t,{get:i[t],enumerable:!0})},Ze=(e,i,t,s)=>{if(i&&typeof i=="object"||typeof i=="function")for(let o of Ve(i))!Ge.call(e,o)&&o!==t&&ye(e,o,{get:()=>i[o],enumerable:!(s=Ke(i,o))||s.enumerable});return e};var Qe=e=>Ze(ye({},"__esModule",{value:!0}),e);var wt={};Xe(wt,{apply:()=>ht,inject:()=>ut,name:()=>pt});module.exports=Qe(wt);var ps=require("react");var Ee=`.dsh-wsl-conversations { position:relative; display:flex; flex-direction:column; gap:4px; min-height:0; height:100%; padding:0 6px; color:var(--dsw-alias-label-primary); font:13px/1.5 var(--dsw-font-family); }
.dsh-wsl-compact-heading { display:flex; align-items:center; gap:2px; min-height:32px; flex:none; color:var(--dsw-alias-label-tertiary); }
.dsh-wsl-compact-heading > span { padding-left:4px; white-space:nowrap; }
.dsh-wsl-heading-actions { display:flex; margin-left:auto; }
.dsh-wsl-icon-button { display:inline-flex; align-items:center; justify-content:center; width:26px; height:26px; padding:0; border:0; border-radius:6px; flex:none; color:var(--dsw-alias-label-secondary); background:transparent; cursor:pointer; }
.dsh-wsl-icon-button:hover, .dsh-wsl-icon-button[aria-expanded=true] { background:var(--dsw-alias-interactive-bg-hover); }
.dsh-wsl-icon-button:focus-visible { outline:2px solid var(--dsw-alias-state-business-primary); outline-offset:-2px; }
.dsh-wsl-list-popover { position:absolute; top:34px; right:6px; min-width:155px; z-index:20; padding:5px; border:1px solid var(--dsw-alias-border-l4); border-radius:10px; background:var(--dsw-alias-bg-base); box-shadow:0 6px 22px #0002; }
.dsh-wsl-list-popover button { display:block; width:100%; text-align:left; border:0; background:transparent; border-radius:6px; padding:7px 9px; font:inherit; color:inherit; cursor:pointer; }
.dsh-wsl-list-popover button:hover { background:var(--dsw-alias-interactive-bg-hover); }
.dsh-wsl-list-popover button:disabled { opacity:.5; cursor:default; }
.dsh-wsl-list-popover .dsh-wsl-menu-divider { border-top:1px solid var(--dsw-alias-border-l4); border-radius:0; margin-top:4px; padding-top:9px; }
.dsh-wsl-native-projects { color:var(--dsw-alias-label-primary); font:inherit; margin-bottom:3px; }
.dsh-wsl-native-project, .dsh-wsl-native-session, .dsh-wsl-native-more { display:flex; align-items:center; gap:7px; width:100%; min-width:0; min-height:32px; border:0; border-radius:7px; background:transparent; color:inherit; font:inherit; text-align:left; padding:5px 7px; cursor:pointer; }
.dsh-wsl-native-project:hover, .dsh-wsl-native-session:hover, .dsh-wsl-native-session.is-selected { background:var(--dsw-alias-interactive-bg-hover); }
.dsh-wsl-native-title { flex:1; min-width:0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.dsh-wsl-native-session { padding-left:21px; font-size:13px; }
.dsh-wsl-native-session > span:last-child { white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.dsh-wsl-native-status { width:10px; flex:none; color:var(--dsw-alias-label-tertiary); }
.dsh-wsl-native-status.is-running { color:var(--dsw-alias-state-business-primary); }
.dsh-wsl-native-more { font-size:11px; padding-left:38px; color:var(--dsw-alias-label-tertiary); }
.dsh-wsl-native-toggle { margin-right:auto; }
.dsh-wsl-chat-list-heading { display:flex; align-items:center; justify-content:space-between; color:var(--dsw-alias-label-secondary); }
.dsh-wsl-chat-list-heading > div { display:flex; gap:0; }
.dsh-wsl-chat-list-heading button { font-size:11px; padding:2px 5px; }
.dsh-wsl-chat-filters { display:flex; gap:3px; padding:3px; border:1px solid var(--dsw-alias-border-l4); border-radius:9px; }
.dsh-wsl-chat-filters button { flex:1; border:0; background:transparent; color:var(--dsw-alias-label-secondary); font:inherit; cursor:pointer; border-radius:6px; padding:3px; }
.dsh-wsl-chat-filters button[aria-pressed=true] { color:var(--dsw-alias-label-primary); background:var(--dsw-alias-bg-base); box-shadow:0 1px 3px #0000000c; }
.dsh-wsl-chat-new { display:flex; justify-content:space-between; gap:4px; }
.dsh-wsl-chat-new button { flex:1; font-size:12px; }
.dsh-wsl-chat-rows { overflow:auto; flex:1; min-height:0; scrollbar-width:thin; margin:0 -4px; padding:0 4px; }
.dsh-wsl-chat-row { position:relative; display:flex; align-items:center; gap:0; border-radius:8px; margin:2px 0; min-width:0; }
.dsh-wsl-chat-row:hover { background:color-mix(in srgb,var(--dsw-alias-label-primary) 4%,transparent); }
.dsh-wsl-chat-row.is-selected { background:color-mix(in srgb,var(--dsw-alias-label-primary) 7%,transparent); }
.dsh-wsl-chat-row-open { border:0; background:transparent; color:inherit; text-align:left; cursor:pointer; display:flex; align-items:center; gap:6px; padding:5px 3px 5px 1px; min-height:32px; min-width:0; width:100%; font:inherit; }
.dsh-wsl-chat-row-open:disabled { cursor:default; }
.dsh-wsl-chat-dot { width:10px; display:flex; justify-content:center; flex:none; color:var(--dsw-alias-label-tertiary); }
.dsh-wsl-chat-row-text { flex:1; min-width:0; display:flex; flex-direction:column; gap:1px; }
.dsh-wsl-chat-row-text > span, .dsh-wsl-chat-row-text small { white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.dsh-wsl-chat-row-text small { color:var(--dsw-alias-label-tertiary); font-size:10px; }
.dsh-wsl-chat-mark { display:inline-flex; align-items:center; gap:3px; flex:none; padding:1px 5px; border-radius:5px; font:500 10px/16px var(--dsw-font-family); color:var(--dsw-alias-label-secondary); border:1px solid var(--dsw-alias-border-l4); background:color-mix(in srgb,var(--dsw-alias-label-primary) 3%,transparent); white-space:nowrap; }
.dsh-wsl-chat-mark.is-offline { opacity:.65; }
.dsh-wsl-chat-more { border:0; color:var(--dsw-alias-label-secondary); background:transparent; padding:5px; cursor:pointer; opacity:0; border-radius:5px; }
.dsh-wsl-chat-row:hover .dsh-wsl-chat-more, .dsh-wsl-chat-row:focus-within .dsh-wsl-chat-more { opacity:1; }
.dsh-wsl-chat-more:focus-visible,.dsh-wsl-chat-filters button:focus-visible,.dsh-wsl-chat-row-open:focus-visible { outline:2px solid var(--dsw-alias-label-secondary); outline-offset:-2px; }
.dsh-wsl-chat-list-foot { font-size:10px; color:var(--dsw-alias-label-tertiary); display:flex; gap:6px; align-items:center; padding:4px; }
.dsh-wsl-chat-list-error,.dsh-wsl-chat-notice { font-size:12px; line-height:1.6; overflow-wrap:anywhere; color:var(--dsw-alias-label-primary); padding:8px 12px; background:color-mix(in srgb,#c58b3a 10%,transparent); border-radius:8px; }
.dsh-wsl-chat-empty { padding:24px 8px; font-size:12px; color:var(--dsw-alias-label-tertiary); text-align:center; }
.dsh-wsl-chat-menu { display:flex; flex-direction:column; gap:10px; padding:8px; }
.dsh-wsl-chat-menu p { overflow-wrap:anywhere; font-size:12px; color:var(--dsw-alias-label-secondary); }
.dsh-wsl-chat-target { flex:1; min-height:0; position:relative; height:100%; }
.dsh-wsl-chat-loading { position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:16px; padding:32px; background:var(--dsw-alias-bg-base); color:var(--dsw-alias-label-secondary); font:13px/1.7 var(--dsw-font-family); }
.dsh-wsl-resident { position:fixed; display:flex; flex-direction:column; background:var(--dsw-alias-bg-base); color:var(--dsw-alias-label-primary); pointer-events:auto; z-index:5; overflow:hidden; }
.dsh-wsl-chat-toolbar { display:flex; align-items:center; gap:8px; padding:6px 12px; min-height:40px; border-bottom:1px solid var(--dsw-alias-border-l4); flex:none; font:12px/1.5 var(--dsw-font-family); }
.dsh-wsl-chat-context { flex:1; min-width:0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.dsh-wsl-chat-context > span { color:var(--dsw-alias-label-secondary); }
.dsh-wsl-chat-toolbar-actions { display:flex; flex:none; }
.dsh-wsl-chat-toolbar-actions button { font-size:12px; }
.dsh-wsl-chat-frame-body { position:relative; flex:1; min-height:0; }
.dsh-wsl-chat-frame-body iframe { border:0; display:block; width:100%; height:100%; background:var(--dsw-alias-bg-base); }
.dsh-wsl-desktop-surface { width:100%; height:100%; }
.dsh-wsl-desktop-view { display:flex; width:100%; height:100%; border:0; }
html[data-dsh-wsl-conversation] [data-rightbar-col] { visibility:hidden; pointer-events:none; }
[data-dsh-wsl-embedded] { grid-template-columns:0px minmax(0,1fr) minmax(0px,var(--dsh-wsl-right-track,0px)) !important; }
[data-dsh-wsl-embedded] > :first-child,[data-dsh-wsl-embedded] > [data-side=sidebar] { display:none !important; }
[data-dsh-wsl-embedded] > :nth-child(2) { grid-column:2; grid-row:1; }
[data-dsh-wsl-embedded] > [data-rightbar-col] { grid-column:3; grid-row:1; }
[data-dsh-wsl-embedded] > [data-dsh-wsl-guest-sidebar] { display:none !important; }
[data-dsh-wsl-embedded] > [data-dsh-wsl-guest-center] { grid-column:2; grid-row:1; min-width:0; }
.dsh-wsl-unified-setting { display:flex; align-items:center; justify-content:space-between; gap:14px; font-size:12px; color:var(--dsw-alias-label-secondary); }
.dsh-wsl-inheritance > p { margin:0 0 16px; color:var(--dsw-alias-label-secondary); }
.dsh-wsl-inherit-options { display:flex; flex-wrap:wrap; gap:12px 24px; }
.dsh-wsl-inherit-options label { display:flex; align-items:center; gap:7px; cursor:pointer; }
.dsh-wsl-inherit-options input { accent-color:var(--dsw-alias-label-primary); width:15px; height:15px; }
.dsh-wsl-inherit-actions { display:flex; flex-wrap:wrap; gap:12px; align-items:center; margin-top:18px; }
.dsh-wsl-inherit-details { border-top:1px solid var(--dsw-alias-border-l4); margin-top:18px; padding-top:12px; font-size:12px; }
.dsh-wsl-inherit-details summary { cursor:pointer; color:var(--dsw-alias-label-secondary); }
.dsh-wsl-inherit-details ul { list-style:none; margin:12px 0 0; padding:0; }
.dsh-wsl-inherit-details li { display:flex; justify-content:space-between; gap:12px; padding:5px 0; overflow-wrap:anywhere; }
.dsh-wsl-inherit-details small, .dsh-wsl-inherit-details li > span:last-child { color:var(--dsw-alias-label-tertiary); }
@media(max-width:600px) { .dsh-wsl-chat-toolbar { gap:5px; padding:5px; } .dsh-wsl-chat-context > span { display:none; } .dsh-wsl-chat-toolbar-actions button { padding:4px 6px; } .dsh-wsl-unified-setting { flex-direction:column; align-items:flex-start; } }
@media(hover:none) { .dsh-wsl-chat-more { opacity:1; } }

.dsh-wsl-page {
  --wsl-border: var(--dsw-alias-border-l4);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  height: 100%;
  overflow: auto;
  padding: 28px clamp(20px, 4vw, 48px) 48px;
  color: var(--dsw-alias-label-primary);
  font-family: var(--dsw-font-family);
  font-size: 14px;
  line-height: 1.6;
  container-type: inline-size;
}
.dsh-wsl-page *,
.dsh-wsl-picker * {
  box-sizing: border-box;
}
.dsh-wsl-page > * {
  width: 100%;
  max-width: 880px;
  flex-shrink: 0;
}
.dsh-wsl-page h1,
.dsh-wsl-page h2,
.dsh-wsl-page h3,
.dsh-wsl-page p,
.dsh-wsl-page dl,
.dsh-wsl-page dd {
  margin: 0;
}
.dsh-wsl-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}
.dsh-wsl-heading h1 {
  font-size: 20px;
  line-height: 28px;
  font-weight: 500;
}
.dsh-wsl-heading p {
  margin-top: 6px;
  font-size: 13px;
  line-height: 20px;
  color: var(--dsw-alias-label-secondary);
}
.dsh-wsl-host-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}
.dsh-wsl-host-card {
  display: flex;
  flex-direction: column;
  padding: 22px;
  min-width: 0;
}
.dsh-wsl-host-card.is-current {
  background: var(--dsw-alias-bg-module-platform);
}
.dsh-wsl-host-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
  color: var(--dsw-alias-label-secondary);
}
.dsh-wsl-host-card h3 {
  font-size: 15px;
  font-weight: 500;
}
.dsh-wsl-host-card h3 > span {
  font-size: 12px;
  font-weight: 400;
  color: var(--dsw-alias-label-tertiary);
  margin-left: 6px;
}
.dsh-wsl-host-card > p {
  margin-top: 8px;
  font-size: 13px;
  color: var(--dsw-alias-label-secondary);
}
.dsh-wsl-host-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  padding-top: 24px;
  margin-top: auto;
}
.dsh-wsl-text-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
  text-decoration: none;
  border-radius: 4px;
}
.dsh-wsl-text-link:hover {
  color: var(--dsw-alias-label-primary);
  text-decoration: underline;
}
.dsh-wsl-section-note {
  margin-top: 12px !important;
  color: var(--dsw-alias-label-tertiary);
  font-size: 12px;
}
.dsh-wsl-recents {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
  margin: 0 22px 18px;
  font-size: 12px;
}
.dsh-wsl-recents > span {
  margin-right: 4px;
  color: var(--dsw-alias-label-tertiary);
}
.dsh-wsl-recents button {
  display: inline-flex;
  gap: 6px;
  align-items: center;
  max-width: 200px;
  border: 1px solid var(--wsl-border);
  border-radius: var(--dsw-radius-sm);
  background: transparent;
  padding: 5px 9px;
  color: var(--dsw-alias-label-secondary);
  font: inherit;
  cursor: pointer;
}
.dsh-wsl-recents button > span {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.dsh-wsl-recents button > svg {
  flex-shrink: 0;
}
.dsh-wsl-recents button.is-selected,
.dsh-wsl-recents button:hover {
  background: var(--dsw-alias-interactive-bg-hover);
  color: var(--dsw-alias-label-primary);
}
.dsh-wsl-recents button:disabled {
  opacity: 0.5;
  cursor: default;
}
.dsh-wsl-runtime-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid var(--wsl-border);
}
.dsh-wsl-runtime-row > div {
  display: flex;
  flex-direction: column;
}
.dsh-wsl-runtime-row strong {
  font-weight: 500;
}
.dsh-wsl-runtime-row span,
.dsh-wsl-runtime-row p {
  color: var(--dsw-alias-label-tertiary);
}
.dsh-wsl-runtime-row > button {
  flex-shrink: 0;
}
.dsh-wsl-section-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}
.dsh-wsl-section-heading h2 {
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
}
.dsh-wsl-caption {
  font-size: 12px;
  color: var(--dsw-alias-label-tertiary);
}
.dsh-wsl-card {
  background: var(--dsw-alias-bg-layer-1);
  border: 1px solid var(--wsl-border);
  border-radius: var(--dsw-radius-lg);
  overflow: hidden;
}
.dsh-wsl-environment,
.dsh-wsl-native-head {
  display: flex;
  gap: 12px;
  align-items: center;
}
.dsh-wsl-environment {
  padding: 20px 22px;
  border-bottom: 1px solid var(--wsl-border);
  background: var(--dsw-alias-bg-module-platform);
}
.dsh-wsl-environment-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  flex: none;
  border-radius: var(--dsw-radius-md);
  background: var(--dsw-alias-bg-layer-2);
  border: 1px solid var(--wsl-border);
  color: var(--dsw-alias-label-secondary);
}
.dsh-wsl-environment-copy,
.dsh-wsl-native-copy {
  flex: 1;
  min-width: 0;
}
.dsh-wsl-environment-title {
  font-size: 14px;
  font-weight: 500;
  overflow-wrap: anywhere;
}
.dsh-wsl-bridge-arrow {
  margin: 0 10px;
  color: var(--dsw-alias-label-tertiary);
  font-weight: 400;
}
.dsh-wsl-environment-copy p,
.dsh-wsl-native-copy p {
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
  margin-top: 2px;
}
.dsh-wsl-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  font-size: 12px;
  color: var(--dsw-alias-label-secondary);
}
.dsh-wsl-fields {
  padding: 22px 22px 12px;
  display: grid;
  grid-template-columns: minmax(150px, 0.75fr) minmax(0, 1.65fr);
  gap: 20px;
}
.dsh-wsl-field label,
.dsh-wsl-user-field label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 8px;
}
.dsh-wsl-field > p,
.dsh-wsl-user-field p {
  color: var(--dsw-alias-label-tertiary);
  font-size: 12px;
  margin-top: 7px;
}
.dsh-wsl-select-wrap {
  position: relative;
}
.dsh-wsl-select-wrap > svg {
  position: absolute;
  right: 11px;
  top: 13px;
  pointer-events: none;
  color: var(--dsw-alias-label-secondary);
}
.dsh-wsl-select-wrap select {
  appearance: none;
  font: inherit;
  font-size: 13px;
  width: 100%;
  height: 40px;
  padding: 0 32px 0 12px;
  border: 1px solid var(--wsl-border);
  border-radius: var(--dsw-radius-md);
  color: var(--dsw-alias-label-primary);
  background: var(--dsw-alias-bg-layer-1);
  cursor: pointer;
}
.dsh-wsl-select-wrap select:disabled {
  opacity: 0.55;
  cursor: default;
}
.dsh-wsl-directory-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.dsh-wsl-page .dsh-wsl-directory-input {
  height: 40px;
  flex: 1;
  min-width: 0;
  padding: 0 12px;
}
.dsh-wsl-directory-input input {
  font-family: var(--ds-font-family-code);
  font-size: 13px;
  min-width: 0;
}
.dsh-wsl-directory-row > button {
  height: 40px;
  flex-shrink: 0;
}
.dsh-wsl-advanced {
  margin: 0 22px 18px;
  font-size: 12px;
}
.dsh-wsl-advanced summary,
.dsh-wsl-diagnostics summary {
  display: flex;
  gap: 6px;
  align-items: center;
  width: fit-content;
  list-style: none;
  cursor: pointer;
  color: var(--dsw-alias-label-secondary);
  border-radius: 4px;
}
.dsh-wsl-page summary::-webkit-details-marker {
  display: none;
}
.dsh-wsl-page details[open] > summary > svg {
  transform: rotate(180deg);
}
.dsh-wsl-user-field {
  margin-top: 14px;
  max-width: 320px;
}
.dsh-wsl-user-field > span {
  width: 100%;
}
.dsh-wsl-card-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 16px 22px;
  border-top: 1px solid var(--wsl-border);
}
.dsh-wsl-action-primary {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}
.dsh-wsl-native-card {
  padding: 22px;
}
.dsh-wsl-native-copy h3 {
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
}
.dsh-wsl-native-description {
  color: var(--dsw-alias-label-secondary);
  font-size: 13px;
  margin-top: 18px !important;
}
.dsh-wsl-native-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 20px;
}
.dsh-wsl-native-status {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 12px 14px;
  margin-top: 14px;
  border-radius: var(--dsw-radius-sm);
  background: var(--dsw-alias-bg-module-platform);
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
  overflow-wrap: anywhere;
  max-height: 110px;
  overflow: auto;
}
.dsh-wsl-native-status > :first-child {
  margin-top: 5px;
  flex-shrink: 0;
}
.dsh-wsl-open-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 36px;
  padding: 0 14px;
  border-radius: var(--dsw-radius-md);
  text-decoration: none;
  background: var(--dsw-alias-button-primary-fill);
  color: var(--dsw-alias-label-primary-foreground);
  font-size: 14px;
  font-weight: 500;
}
.dsh-wsl-open-link:hover {
  background: var(--dsw-alias-button-primary-hover);
}
.dsh-wsl-lock-note {
  padding: 0 22px 16px;
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
}
.dsh-wsl-help {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: var(--dsw-alias-label-tertiary);
  font-size: 12px;
  line-height: 20px;
}
.dsh-wsl-help > svg {
  flex: none;
  margin-top: 1px;
}
.dsh-wsl-notice {
  display: flex;
  align-items: flex-start;
  gap: 9px;
  padding: 12px 16px;
  border: 1px solid var(--wsl-border);
  background: var(--dsw-alias-bg-module-platform);
  border-radius: var(--dsw-radius-md);
  font-size: 13px;
  overflow-wrap: anywhere;
}
.dsh-wsl-notice > :first-child {
  margin-top: 5px;
  flex: none;
}
.dsh-wsl-notice.is-error {
  color: var(--dsw-alias-state-error-primary);
}
.dsh-wsl-diagnostics {
  border-top: 1px solid var(--wsl-border);
  padding-top: 16px;
  font-size: 12px;
}
.dsh-wsl-diagnostics-body {
  padding-top: 16px;
}
.dsh-wsl-diagnostics dl {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px 24px;
}
.dsh-wsl-diagnostics dt {
  color: var(--dsw-alias-label-tertiary);
}
.dsh-wsl-diagnostics dd {
  color: var(--dsw-alias-label-secondary);
  overflow-wrap: anywhere;
  margin-top: 2px;
}
.dsh-wsl-disconnect-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
}
.dsh-wsl-disconnect-row p {
  color: var(--dsw-alias-label-tertiary);
}
.dsh-wsl-disconnect-row button {
  flex-shrink: 0;
}
.dsh-wsl-picker {
  width: min(640px, 100%);
  max-height: 100%;
  color: var(--dsw-alias-label-primary);
  font-family: var(--dsw-font-family);
}
.dsh-wsl-picker-content {
  min-height: 0;
  overflow-y: auto;
}
.dsh-wsl-pathbar {
  display: flex;
  gap: 8px;
  align-items: center;
}
.dsh-wsl-picker .dsh-wsl-pathinput {
  height: 36px;
  flex: 1;
  min-width: 0;
}
.dsh-wsl-pathinput input {
  font-family: var(--ds-font-family-code);
  font-size: 13px;
}
.dsh-wsl-folder-meta {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  margin: 18px 0 8px;
  font-size: 12px;
  color: var(--dsw-alias-label-tertiary);
}
.dsh-wsl-folder-meta label {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
}
.dsh-wsl-folder-meta input {
  margin: 0;
  accent-color: var(--dsw-alias-button-primary-fill);
}
.dsh-wsl-folder-list {
  min-height: 220px;
  height: min(38vh, 330px);
  overflow-y: auto;
  overscroll-behavior: contain;
  border-top: 1px solid var(--dsw-alias-border-l4);
  border-bottom: 1px solid var(--dsw-alias-border-l4);
  padding: 6px 0;
}
.dsh-wsl-folder {
  border: 0;
  background: transparent;
  color: var(--dsw-alias-label-secondary);
  display: flex;
  gap: 12px;
  align-items: center;
  width: 100%;
  padding: 10px;
  text-align: left;
  border-radius: var(--dsw-radius-sm);
  font: inherit;
  font-size: 13px;
  cursor: pointer;
}
.dsh-wsl-folder:hover {
  background: var(--dsw-alias-interactive-bg-hover);
}
.dsh-wsl-folder:disabled {
  opacity: 0.5;
  cursor: default;
}
.dsh-wsl-folder > span {
  flex: 1;
  overflow-wrap: anywhere;
}
.dsh-wsl-folder > svg {
  flex-shrink: 0;
}
.dsh-wsl-folder > small {
  color: var(--dsw-alias-label-tertiary);
  font-size: 11px;
}
.dsh-wsl-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 48px 20px;
  color: var(--dsw-alias-label-tertiary);
  font-size: 13px;
  text-align: center;
}
.dsh-wsl-picker-hint {
  margin: 12px 0 0;
  font-size: 12px;
  color: var(--dsw-alias-label-tertiary);
  overflow-wrap: anywhere;
}
.dsh-wsl-inline-error {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 10px;
  font-size: 13px;
  color: var(--dsw-alias-state-error-primary);
  overflow-wrap: anywhere;
}
.dsh-wsl-picker .dsh-wsl-load-more {
  display: flex;
  margin: 8px auto;
}
.dsh-wsl-page :where(a, button, select, summary):focus-visible,
.dsh-wsl-picker :where(button, input):focus-visible {
  outline: 2px solid var(--dsw-alias-state-business-primary);
  outline-offset: 3px;
}
@container (max-width: 580px) {
  .dsh-wsl-host-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  .dsh-wsl-host-card {
    padding: 18px;
  }
  .dsh-wsl-host-head {
    margin-bottom: 12px;
  }
  .dsh-wsl-host-actions {
    padding-top: 18px;
  }
  .dsh-wsl-fields {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .dsh-wsl-environment,
  .dsh-wsl-native-head {
    flex-wrap: wrap;
  }
  .dsh-wsl-environment-copy,
  .dsh-wsl-native-copy {
    flex-basis: calc(100% - 54px);
  }
  .dsh-wsl-environment > .dsh-wsl-badge,
  .dsh-wsl-native-head > .dsh-wsl-badge {
    margin-left: 54px;
  }
  .dsh-wsl-diagnostics dl {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .dsh-wsl-disconnect-row {
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
  }
}
@media (max-width: 520px) {
  .dsh-wsl-recents {
    margin-left: 16px;
    margin-right: 16px;
  }
  .dsh-wsl-page {
    padding: 20px 16px 32px;
    gap: 22px;
  }
  .dsh-wsl-environment,
  .dsh-wsl-native-card {
    padding: 16px;
  }
  .dsh-wsl-fields {
    padding: 18px 16px 12px;
  }
  .dsh-wsl-advanced {
    margin: 0 16px 16px;
  }
  .dsh-wsl-card-actions {
    padding: 14px 16px;
  }
  .dsh-wsl-picker .dsh-wsl-folder-list {
    min-height: 140px;
  }
}
`;var Q=require("react"),M=require("@deepseek-ai/dsh-client-ui-primitives"),W=require("react/jsx-runtime");function ee({size:e=20}){return(0,W.jsxs)("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.35",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:[(0,W.jsx)("rect",{x:"3",y:"4.5",width:"18",height:"15",rx:"3"}),(0,W.jsx)("path",{d:"m7 9 3 3-3 3m6 0h4"})]})}function ke({size:e=20}){return(0,W.jsxs)("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.35",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:[(0,W.jsx)("rect",{x:"3",y:"4",width:"18",height:"13",rx:"2.5"}),(0,W.jsx)("path",{d:"M8 21h8m-4-4v4"})]})}function de({size:e=16}){return(0,W.jsx)("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:(0,W.jsx)("path",{d:"M14 4h6v6m0-6L10 14m0-10H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4"})})}function fe({state:e="idle",children:i}){return(0,W.jsxs)("span",{className:"dsh-wsl-badge",children:[(0,W.jsx)(M.StateDot,{state:e,size:e==="ongoing"?12:7}),i]})}function ce(e,i=[]){return{distro:e.distro||i.find(t=>t.isDefault)?.name||i[0]?.name||"",user:e.user||"",directory:e.directory||""}}var et=e=>e.replace(/\/+$/,"").replace(/\/[^/]*$/,"")||"/",tt=(e,i)=>`${e.replace(/\/+$/,"")}/${i}`;function Se(e){return/ENOENT/.test(e.message)?"\u627E\u4E0D\u5230\u8FD9\u4E2A\u6587\u4EF6\u5939\uFF0C\u8BF7\u68C0\u67E5\u8DEF\u5F84\u540E\u91CD\u8BD5\u3002":/EACCES|EPERM/.test(e.message)?"\u5F53\u524D Linux \u7528\u6237\u6CA1\u6709\u6743\u9650\u8BFB\u53D6\u8FD9\u4E2A\u6587\u4EF6\u5939\u3002":/ENOTDIR/.test(e.message)?"\u8FD9\u4E2A\u8DEF\u5F84\u6307\u5411\u6587\u4EF6\uFF0C\u8BF7\u9009\u62E9\u4E00\u4E2A\u6587\u4EF6\u5939\u3002":e.message}function Oe({api:e,distro:i,user:t,initialPath:s,onClose:o,onSelect:p}){let[c,a]=(0,Q.useState)(null),[h,f]=(0,Q.useState)(s),[v,A]=(0,Q.useState)(!1),[d,m]=(0,Q.useState)(!1),[y,I]=(0,Q.useState)(""),L=(0,Q.useRef)(0),g=(0,Q.useCallback)(async(x,R=0,E=!1)=>{let T=++L.current;m(!0),I("");try{let U=x?null:await e("connect",{distro:i,user:t}),n=await e("browse",{distro:i,user:t,path:x||U.home,offset:R,hidden:E});if(T!==L.current)return;a(l=>({...n,entries:R?[...l?.entries||[],...n.entries]:n.entries})),f(n.path)}catch(U){T===L.current&&I(Se(U))}finally{T===L.current&&m(!1)}},[e,i,t]);(0,Q.useEffect)(()=>(g(s),()=>{L.current++}),[g,s]);let b=(c?.entries||[]).filter(x=>x.type==="directory"||x.type==="symlink").sort((x,R)=>x.name.localeCompare(R.name,"zh-CN",{numeric:!0})),k=x=>{g(x,0,v)};return(0,W.jsxs)(M.Modal,{open:!0,onClose:o,title:"\u9009\u62E9 Linux \u6587\u4EF6\u5939",closeLabel:"\u5173\u95ED\u6587\u4EF6\u5939\u9009\u62E9",description:`${i} \u4E2D\u7684\u76EE\u5F55\uFF0C\u7528\u4F5C\u63D2\u4EF6\u7684\u9ED8\u8BA4\u5DE5\u4F5C\u76EE\u5F55\u3002`,className:"dsh-wsl-picker",contentClassName:"dsh-wsl-picker-content",footer:(0,W.jsxs)(W.Fragment,{children:[(0,W.jsx)(M.Button,{onClick:o,children:"\u53D6\u6D88"}),(0,W.jsx)(M.Button,{variant:"primary",disabled:d||!c||!!y||h!==c.path,onClick:()=>p(c.path),children:"\u9009\u62E9\u6B64\u6587\u4EF6\u5939"})]}),children:[(0,W.jsxs)("form",{className:"dsh-wsl-pathbar",onSubmit:x=>{x.preventDefault(),k(h)},children:[(0,W.jsx)(M.Button,{variant:"outline",title:"\u8FD4\u56DE\u4E0A\u7EA7","aria-label":"\u8FD4\u56DE\u4E0A\u7EA7",disabled:d||!c||c.path==="/",icon:(0,W.jsx)(M.IconChevronLeftOutlineMedium,{}),onClick:()=>k(et(c.path))}),(0,W.jsx)(M.Input,{"aria-label":"\u6587\u4EF6\u5939\u8DEF\u5F84","data-modal-autofocus":!0,value:h,onChange:x=>f(x.target.value),spellCheck:!1,className:"dsh-wsl-pathinput",placeholder:"/home"}),(0,W.jsx)(M.Button,{variant:"outline",type:"submit",disabled:d||!h.trim(),children:"\u524D\u5F80"})]}),(0,W.jsxs)("div",{className:"dsh-wsl-folder-meta",children:[(0,W.jsxs)("span",{children:[b.length," \u4E2A\u6587\u4EF6\u5939",c?.nextOffset!=null?" \xB7 \u8FD8\u6709\u66F4\u591A":""]}),(0,W.jsxs)("label",{children:[(0,W.jsx)("input",{type:"checkbox",checked:v,disabled:d,onChange:x=>{let R=x.target.checked;A(R),g(c?.path||h,0,R)}}),"\u663E\u793A\u9690\u85CF\u9879"]})]}),(0,W.jsxs)("div",{className:"dsh-wsl-folder-list","aria-label":"\u6587\u4EF6\u5939\u5217\u8868","aria-busy":d,children:[y&&(0,W.jsxs)("div",{className:"dsh-wsl-inline-error",role:"alert",children:[y,(0,W.jsx)(M.Button,{size:"sm",onClick:()=>k(h),children:"\u91CD\u8BD5"})]}),!y&&b.map(x=>(0,W.jsxs)("button",{type:"button",className:"dsh-wsl-folder",disabled:d,onClick:()=>k(tt(c.path,x.name)),children:[(0,W.jsx)(M.IconFolderCloseRegular,{size:18}),(0,W.jsx)("span",{children:x.name}),x.type==="symlink"&&(0,W.jsx)("small",{children:"\u94FE\u63A5"}),(0,W.jsx)(M.IconChevronRightOutlineRegular,{size:14})]},x.name)),d&&(0,W.jsxs)("div",{className:"dsh-wsl-empty",role:"status",children:[(0,W.jsx)(M.StateDot,{state:"ongoing"}),"\u6B63\u5728\u8BFB\u53D6\u6587\u4EF6\u5939\u2026"]}),!d&&!y&&!b.length&&(0,W.jsxs)("div",{className:"dsh-wsl-empty",children:[(0,W.jsx)(M.IconFolderOpenOutlineRegular,{size:28}),(0,W.jsx)("span",{children:c?.nextOffset!=null?"\u8FD9\u6279\u6761\u76EE\u4E2D\u6CA1\u6709\u6587\u4EF6\u5939":"\u6B64\u76EE\u5F55\u4E0B\u6CA1\u6709\u53EF\u663E\u793A\u7684\u6587\u4EF6\u5939"})]}),!d&&!y&&c?.nextOffset!=null&&(0,W.jsx)(M.Button,{className:"dsh-wsl-load-more",onClick:()=>g(c.path,c.nextOffset,v),children:"\u52A0\u8F7D\u66F4\u591A"})]}),(0,W.jsxs)("p",{className:"dsh-wsl-picker-hint",children:[c?.path||"\u9009\u62E9\u4E00\u4E2A\u76EE\u5F55",h!==c?.path&&c?" \xB7 \u70B9\u51FB\u201C\u524D\u5F80\u201D\u67E5\u770B\u8F93\u5165\u7684\u8DEF\u5F84":""]})]})}var j=require("react"),O=require("@deepseek-ai/dsh-client-ui-primitives");var te="dsh-app://app";function F(e){return e===te||e===te+"/"?te:ne(e)}function Le(e){return F(e)===te?"dsh://open":ne(e)}function ne(e){if(!e)return null;try{let i=new URL(e);return!["http:","https:"].includes(i.protocol)||!["127.0.0.1","localhost","[::1]"].includes(i.hostname)||i.username||i.password||i.search||i.hash||i.pathname!=="/"?null:i.origin}catch{return null}}function ie(e){if(!e?.startsWith("#dsh-wsl=")||e.length>16e3)return null;try{let i=JSON.parse(decodeURIComponent(e.slice(9)));return typeof i.id!="string"||i.id.length>100||typeof i.distro!="string"||typeof i.user!="string"||typeof i.directory!="string"||!i.directory.startsWith("/")||/[\x00-\x1f]/.test(i.directory)?null:{id:i.id,distro:i.distro,user:i.user,directory:i.directory,parentOrigin:F(i.parentOrigin),...i.proof?{issuedAt:i.issuedAt,proof:i.proof}:{}}}catch{return null}}var pe="dsh-wsl-conversation/1",re="dsh-wsl-conversation",Ne=/^[a-zA-Z0-9-]{32,64}$/,ge=(e,i)=>typeof e=="string"?e.slice(0,i):"";function me(e){return JSON.stringify([e.distro||"",e.user||""])}function Ie(e,i,t){let s=new URL(e),o=ie(s.hash);if(!ne(s.origin)||!F(t)||!Ne.test(i)||!o?.proof||o.parentOrigin!==F(t))throw new Error("\u65E0\u6CD5\u9A8C\u8BC1\u540C\u7A97\u53E3\u5BF9\u8BDD\u7684\u76EE\u6807\u5730\u5740\uFF0C\u8BF7\u91CD\u65B0\u8FDB\u5165 Linux\u3002");let p=JSON.parse(decodeURIComponent(s.hash.slice(9))),c={channel:i,...F(t)===te?{transport:"desktop"}:{}};return s.hash="dsh-wsl="+encodeURIComponent(JSON.stringify({...p,embed:c})),s.href}function Ae(e){let i=ie(e);if(!i?.proof||!i.parentOrigin)return null;try{let{embed:t}=JSON.parse(decodeURIComponent(e.slice(9)));return!Ne.test(t?.channel||"")||t.transport!==void 0&&(t.transport!=="desktop"||i.parentOrigin!==te)?null:{channel:t.channel,parentOrigin:i.parentOrigin,...t.transport?{transport:t.transport}:{}}}catch{return null}}function ve(e,{origin:i,source:t,channel:s}){return!!t&&e.source===t&&e.origin===i&&!!ne(i)&&Ne.test(s||"")&&e.data?.protocol===pe&&e.data.channel===s&&["catalog","request","result","return","sidebar"].includes(e.data.type)}function ue(e){if(!e||!Array.isArray(e.rows)||e.rows.length>5e3)return null;let i=new Set,t=[];for(let s of e.rows)!s||typeof s.id!="string"||!s.id||s.id.length>200||i.has(s.id)||(i.add(s.id),t.push({id:s.id,title:ge(s.title,500),cwd:ge(s.cwd,4096),workspaceId:ge(s.workspaceId,200),workspaceTitle:ge(s.workspaceTitle,500),running:s.running===!0,blank:s.blank===!0,pinned:s.pinned===!0,archived:s.archived===!0,updatedAt:Number.isFinite(s.updatedAt)?s.updatedAt:0}));return{rows:t,selectedId:t.some(s=>s.id===e.selectedId)?e.selectedId:null,connected:e.connected===!0,phase:e.phase==="ready"?"ready":"loading"}}function he(e){let i=e.sessions.list.getSnapshot(),t=e.workspaces.list.getSnapshot(),s=new Map;for(let a of t.items||[])for(let h of a.sessionIds)s.set(h,a);let o=new Set(t.archivedSessionIds||[]),p=new Set(t.pinnedSessionIds||[]),c=i.ids.map(a=>i.byId[a]).filter(a=>a&&!a.parentId).slice(0,5e3);return ue({phase:i.phase,connected:e.connection.state.getSnapshot()==="connected",selectedId:c.find(a=>a.retainedBy?.mainView>0)?.id,rows:c.map(a=>({id:a.id,title:a.title||(a.blank?"\u65B0\u5BF9\u8BDD":a.displayTitle),cwd:a.cwd,workspaceId:s.get(a.id)?.workspaceId,workspaceTitle:s.get(a.id)?.title||"",running:a.running,blank:a.blank,updatedAt:a.updatedAt,archived:o.has(a.id),pinned:p.has(a.id)}))})}function be(e,i,{filter:t="all",query:s="",archived:o=!1}={}){let p=(e?.rows||[]).map(a=>({...a,environment:null,key:JSON.stringify(["windows",a.id])}));for(let a of i)for(let h of a.catalog?.rows||[])p.push({...h,environment:a,key:JSON.stringify(["wsl",a.key,h.id])});let c=s.trim().toLocaleLowerCase();return p.filter(a=>a.archived===o&&(t==="all"||t==="wsl"==!!a.environment)&&(!c||[a.title,a.cwd,a.environment?.settings.distro].join(" ").toLocaleLowerCase().includes(c))).sort((a,h)=>Number(h.pinned)-Number(a.pinned)||h.updatedAt-a.updatedAt||a.key.localeCompare(h.key))}var ae="__DSH_WSL_DESKTOP_V1__",st=new Set(["refresh","theme","chrome","navigate","pin","unpin","archive","unarchive"]);function ze(e,i,{waitMs:t=2e4}={}){let s=0,o=0,p=null,c=!1,a,h=[],f=d=>{if(c||d!==e)throw new Error("WSL \u9875\u9762\u901A\u9053\u65E0\u6548\u6216\u5DF2\u5173\u95ED\u3002")},v=d=>({sequence:s,closed:c,catalog:o>d?p:null,signals:h.filter(m=>m.sequence>d)}),A=()=>a?.();return{api:Object.freeze({async request(d,m,y={}){if(f(d),!st.has(m)||!y||typeof y!="object"||Array.isArray(y)||JSON.stringify(y).length>131072)throw new Error("WSL \u9875\u9762\u64CD\u4F5C\u65E0\u6548\u3002");try{return await i(m,y),{ok:!0}}catch(I){return{ok:!1,error:String(I?.message||I).slice(0,1e3)}}},next(d,m=0){if(f(d),!Number.isSafeInteger(m)||m<0||m>s)throw new Error("WSL \u9875\u9762\u6E38\u6807\u65E0\u6548\u3002");if(s>m)return Promise.resolve(v(m));if(a)throw new Error("WSL \u9875\u9762\u5DF2\u7ECF\u5B58\u5728\u7B49\u5F85\u4E2D\u7684\u8BA2\u9605\u3002");return new Promise(y=>{let I=()=>{clearTimeout(L),a=null,y(v(m))},L=setTimeout(I,t);a=I})}}),publish(d,m){if(!c){if(d==="catalog")p=m.catalog,o=++s;else if(d==="return"||d==="sidebar")h.push({sequence:++s,type:d}),h.length>16&&h.shift();else return;A()}},dispose(){c=!0,A(),h.length=0,p=null}}}function Re(e,i,t,s){let o=s.transport==="desktop";if(!o&&window.parent===window||i.guest)return;let p,c="",a=!1,h=new AbortController,f={origin:s.parentOrigin,source:window.parent,channel:s.channel},v=o?ze(s.channel,y):null;v&&Object.defineProperty(window,ae,{value:v.api,configurable:!0});let A=(g,b={})=>v?v.publish(g,b):f.source.postMessage({protocol:pe,channel:s.channel,type:g,...b},f.origin),d=(g=!1)=>{clearTimeout(p),p=setTimeout(()=>{if(a)return;let b=he(e),k=JSON.stringify(b);(g||k!==c)&&(c=k,A("catalog",{catalog:b}))},50)},m=i.guest={compact:!0,returnWindows(){A("return")},toggleSidebar(){A("sidebar")},publish:d};document.documentElement.setAttribute("data-dsh-wsl-guest","");async function y(g,b={}){if(g==="refresh"){d(!0);return}if(g==="theme"){if(document.body.toggleAttribute("data-ds-dark-theme",b.dark===!0),document.documentElement.style.colorScheme=b.dark===!0?"dark":"light",Array.isArray(b.tokens))for(let[x,R]of b.tokens.slice(0,256))/^--(?:ds|dsw|dsh)-[\w-]+$/.test(x)&&typeof R=="string"&&R.length<500&&document.body.style.setProperty(x,R);return}if(g==="chrome"){m.compact=!0,(b.panel==="plugins"||b.panel===null)&&e.layout.selectPanel(b.panel),i.emit();return}if(g==="navigate"){h.abort(),h=new AbortController;let x=h.signal;if(b.sessionId){let R=e.sessions.list.getSnapshot().byId[b.sessionId];if(!R||R.parentId||e.workspaces.list.getSnapshot().archivedSessionIds.includes(R.id))throw new Error("\u8FD9\u6761 WSL \u5BF9\u8BDD\u5DF2\u5F52\u6863\u6216\u4E0D\u5728\u5F53\u524D\u73AF\u5883\u4E2D\uFF0C\u8BF7\u5237\u65B0\u5217\u8868\u3002");e.uiWorkspace.openSession(R.id)}else{if(!b.handoff)throw new Error("\u7F3A\u5C11\u5DF2\u9A8C\u8BC1\u7684\u5DE5\u4F5C\u533A\u4FE1\u606F\u3002");let R=await t("environment/adopt",b.handoff);if(x.aborted)return;if(b.create){let E=await e.workspaces.create({path:R.settings.directory});if(x.aborted)return;let T=await e.sessions.create({workspaceId:E.workspaceId});x.aborted||e.uiWorkspace.openSession(T)}else await we(e,R.settings.directory,x)}d(!0);return}let k={pin:"pinSession",unpin:"unpinSession",archive:"archiveSession",unarchive:"unarchiveSession"};if(!k[g]||!e.sessions.list.getSnapshot().byId[b.sessionId])throw new Error("\u5BF9\u8BDD\u64CD\u4F5C\u65E0\u6548\u3002");await e.uiWorkspace[k[g]](b.sessionId),d(!0)}let I=g=>{if(!ve(g,f)||g.data.type!=="request")return;let{id:b,action:k,payload:x}=g.data;typeof b!="string"||b.length>100||typeof k!="string"||y(k,x).then(()=>A("result",{id:b,ok:!0}),R=>A("result",{id:b,ok:!1,error:String(R.message).slice(0,1e3)}))};o||window.addEventListener("message",I);let L=[e.sessions.list.subscribe(()=>d()),e.workspaces.list.subscribe(()=>d()),e.connection.state.subscribe(()=>d())];d(!0),i.emit(),m.dispose=()=>{a=!0,h.abort(),clearTimeout(p),window.removeEventListener("message",I),v?.dispose(),v&&window[ae]===v.api&&delete window[ae];for(let g of L)g();document.documentElement.removeAttribute("data-dsh-wsl-guest")}}var Ce="dsh-wsl-native:";function J(e,i,t=sessionStorage){try{if(i===void 0)return JSON.parse(t.getItem(Ce+e)||"null");i===null?t.removeItem(Ce+e):t.setItem(Ce+e,JSON.stringify(i))}catch{}return null}function Pe(e,i){return e.getSnapshot().phase==="ready"?Promise.resolve():new Promise((t,s)=>{let o=()=>{},p,c=h=>{o(),clearTimeout(p),i?.removeEventListener("abort",a),h?s(h):t()},a=()=>c(new Error("\u5DE5\u4F5C\u533A\u6253\u5F00\u5DF2\u53D6\u6D88\u3002"));o=e.subscribe(()=>{e.getSnapshot().phase==="ready"&&c()}),p=setTimeout(()=>c(new Error("DSH \u5DE5\u4F5C\u533A\u4ECD\u5728\u52A0\u8F7D\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002")),3e4),i?.addEventListener("abort",a,{once:!0}),i?.aborted?a():e.getSnapshot().phase==="ready"&&c()})}async function we(e,i,t){if(await Promise.all([Pe(e.workspaces.list,t),Pe(e.sessions.list,t)]),t?.aborted)return!1;let s=e.layout.beginNavigation(),o=await e.workspaces.create({path:i});if(await e.sessions.refresh(),t?.aborted||s.aborted)return!1;let{byId:p}=e.sessions.list.getSnapshot(),c=e.workspaces.list.getSnapshot().archivedSessionIds,a=o.sessionIds.map(v=>p[v]).filter(v=>v&&!v.parentId&&!c.includes(v.id)&&v.cwd===o.path),h=J("selection",void 0,localStorage)?.[o.path],f=a.find(v=>v.id===h)??a.sort((v,A)=>A.updatedAt-v.updatedAt)[0];return f?e.uiWorkspace.openSession(f.id):await e.uiWorkspace.openWorkspace(o.workspaceId),!0}function De(e,i){let t=new Set,s,o=!1,p=!1,c,a={state:null,error:null,draft:null,pending:J("pending"),popup:null,parentOrigin:F(J("parentOrigin")),readyLink:null,subscribe(d){return t.add(d),()=>t.delete(d)},emit(){if(!o)for(let d of t)d()},async refresh(){return s||(s=i("status").then(d=>(o||(a.state=d,a.error=null,a.parentOrigin||=d.parentOrigin,a.emit()),d)).catch(d=>{throw a.error=d.message,a.emit(),d}).finally(()=>{s=null}),s)},setPending(d){a.pending=d,J("pending",d),a.emit()},remember(){let d=e.sessions.list.getSnapshot(),m=d.ids.map(L=>d.byId[L]).find(L=>L?.retainedBy?.mainView>0&&L.cwd&&!L.parentId);if(!m||c===m.id)return;c=m.id;let y=J("selection",void 0,localStorage)||{},I=Object.fromEntries([[m.cwd,m.id],...Object.entries(y).filter(([L])=>L!==m.cwd)].slice(0,64));J("selection",I,localStorage)},async adopt(){let d=ie(window.location.hash),m=Ae(window.location.hash);if(!(!d||p||J("arrived")===d.id&&!m)){p=!0;try{let y=a.state||await a.refresh();if(y.mode!=="wsl-host"||!y.distros.some(L=>L.name===d.distro))throw new Error("\u76EE\u6807 DSH \u4E0E\u9009\u5B9A\u7684 Linux \u73AF\u5883\u4E0D\u4E00\u81F4\u3002");let I=await i("environment/adopt",d);d.parentOrigin&&(a.parentOrigin=d.parentOrigin,J("parentOrigin",d.parentOrigin)),await we(e,I.settings.directory,h.signal)&&(J("arrived",d.id),m&&Re(e,a,i,m),history.replaceState(history.state,"",window.location.pathname+window.location.search),await a.refresh())}catch(y){a.error=y.message,a.emit(),o||e.layout.selectPanel("dsh-wsl-native")}finally{p=!1}}}},h=new AbortController,f=()=>{a.refresh().then(()=>a.adopt()).catch(()=>{})},v=e.on("connection/reset",f),A=e.sessions.list.subscribe(()=>a.remember());return window.addEventListener("hashchange",a.adopt),window.addEventListener("focus",f),f(),a.dispose=()=>{o=!0,a.guest?.dispose(),a.conversations?.dispose(),h.abort(),v(),A(),window.removeEventListener("hashchange",a.adopt),window.removeEventListener("focus",f),t.clear()},a}var Rt=require("react"),Be=require("@deepseek-ai/dsh-client-ui-primitives"),$=require("react/jsx-runtime");function Te({state:e,model:i,chosen:t,task:s,api:o,disabled:p}){let c=e.native?.inheritance;if(e.mode!=="windows-host"||!c?.available)return null;let{options:a,applied:h}=c;return(0,$.jsxs)("section",{className:"dsh-wsl-section","aria-labelledby":"dsh-wsl-inheritance-title",children:[(0,$.jsxs)("div",{className:"dsh-wsl-section-heading",children:[(0,$.jsx)("h2",{id:"dsh-wsl-inheritance-title",children:"Linux \u63D2\u4EF6\u4E0E\u914D\u7F6E"}),(0,$.jsxs)("span",{className:"dsh-wsl-caption",children:["\u4E3B\u73AF\u5883\uFF1A",c.source]})]}),(0,$.jsxs)("div",{className:"dsh-wsl-card dsh-wsl-inheritance",children:[(0,$.jsx)("p",{children:"\u9ED8\u8BA4\u6CBF\u7528\u4E3B\u73AF\u5883\u3002\u5728 Linux \u4E2D\u5355\u72EC\u4FEE\u6539\u7684\u9879\u76EE\u4F1A\u4FDD\u7559\uFF0C\u540E\u7EED\u540C\u6B65\u53EA\u66F4\u65B0\u4ECD\u8DDF\u968F\u4E3B\u73AF\u5883\u7684\u90E8\u5206\u3002"}),(0,$.jsx)("div",{className:"dsh-wsl-inherit-options",children:[["plugins","\u7EE7\u627F\u63D2\u4EF6"],["config","\u7EE7\u627F\u8BBE\u7F6E"],["credentials","\u7EE7\u627F\u6A21\u578B\u8D26\u53F7"]].map(([f,v])=>(0,$.jsxs)("label",{children:[(0,$.jsx)("input",{type:"checkbox",checked:a[f],disabled:p,onChange:A=>void s("inheritance",()=>o("native/inheritance",{...t(),options:{[f]:A.target.checked}}))}),v]},f))}),(0,$.jsxs)("div",{className:"dsh-wsl-inherit-actions",children:[(0,$.jsx)(Be.Button,{variant:"outline",disabled:p||!t().distro,onClick:()=>void i.conversations.enter(t(),{panel:"plugins"}),children:"\u7BA1\u7406 Linux \u63D2\u4EF6\u4E0E\u8BBE\u7F6E"}),(0,$.jsx)("span",{className:"dsh-wsl-caption",children:"\u66F4\u6539\u7EE7\u627F\u9009\u9879\u540E\uFF0C\u4E0B\u6B21\u542F\u52A8 Linux \u751F\u6548\u3002"})]}),h&&(0,$.jsxs)("details",{className:"dsh-wsl-inherit-details",children:[(0,$.jsxs)("summary",{children:["\u5DF2\u7EE7\u627F ",h.plugins.filter(f=>f.status==="inherited").length," \u4E2A\u63D2\u4EF6",h.overrides?` \xB7 \u4FDD\u7559 ${h.overrides} \u9879 Linux \u8C03\u6574`:""]}),(0,$.jsx)("ul",{children:h.plugins.map(f=>(0,$.jsxs)("li",{children:[(0,$.jsxs)("span",{children:[f.name," ",(0,$.jsx)("small",{children:f.version})]}),(0,$.jsx)("span",{children:f.status==="inherited"?"\u8DDF\u968F\u4E3B\u73AF\u5883":f.status==="overridden"?"Linux \u5355\u72EC\u914D\u7F6E":f.reason})]},f.name))})]})]})]})}var r=require("react/jsx-runtime");function se(e){let[,i]=(0,j.useState)(0);return(0,j.useEffect)(()=>e.subscribe(()=>i(t=>t+1)),[e]),e.state}function Me({api:e,ctx:i,model:t}){let s=se(t),[o,p]=(0,j.useState)(t.draft),[c,a]=(0,j.useState)(""),[h,f]=(0,j.useState)(null),[v,A]=(0,j.useState)(!1),[d,m]=(0,j.useState)(null),y=(0,j.useRef)(!1),I=(0,j.useRef)(!0),L=(0,j.useCallback)(()=>t.refresh(),[t]);(0,j.useEffect)(()=>(I.current=!0,L().catch(()=>{}),()=>{I.current=!1}),[L]),(0,j.useEffect)(()=>{s&&!o&&p(ce(s.settings,s.distros))},[s,o]),(0,j.useEffect)(()=>{t.draft=o},[o,t]),(0,j.useEffect)(()=>{let u=t.pending;if(!u)return;let B=s?.handoffs?.find(q=>q.id===u.id);B?.state==="ready"?(t.remember(),t.readyLink=B.url,t.setPending(null),u.mode==="same"?t.conversations.adopt(B).catch(q=>{t.error=q.message,t.emit()}):t.popup&&!t.popup.closed?(t.popup.location.replace(B.url),t.popup=null,f({text:"Linux \u5DF2\u5728\u65B0\u7A97\u53E3\u6253\u5F00\uFF0C\u4E24\u8FB9\u53EF\u4EE5\u540C\u65F6\u4F7F\u7528\u3002"})):f({text:"Linux \u5DF2\u5C31\u7EEA\u3002\u70B9\u51FB\u201C\u65B0\u7A97\u53E3\u6253\u5F00\u201D\u5373\u53EF\u4E0E Windows \u540C\u65F6\u4F7F\u7528\u3002"})):B?.state==="failed"?(t.popup?.close(),t.popup=null,t.setPending(null),f({error:!0,text:B.error})):s&&!B&&(t.setPending(null),f({error:!0,text:"\u542F\u52A8\u5668\u5DF2\u91CD\u65B0\u8FDE\u63A5\uFF0C\u8BF7\u91CD\u65B0\u8FDB\u5165 Linux \u73AF\u5883\u3002"}))},[s,t,t.pending]),(0,j.useEffect)(()=>{let u=s?.native?.instances?.some(q=>q.preparing||q.starting);if(!t.pending&&!u)return;let B=setTimeout(()=>{L().catch(()=>{})},700);return()=>clearTimeout(B)},[s,t,t.pending,L]);async function g(u,B){if(!y.current){y.current=!0,a(u),f(null),t.error=null;try{await B()}catch(q){I.current&&f({error:!0,text:Se(q)})}finally{try{await L()}catch{}y.current=!1,I.current&&a("")}}}function b(u,B){p(q=>({...q,[u]:B})),f(null)}let k=()=>({distro:o.distro,user:o.user.trim(),directory:o.directory.trim()});async function x(u,B="\u5DE5\u4F5C\u73AF\u5883\u5DF2\u8FDE\u63A5\uFF0C\u76EE\u5F55\u5DF2\u8BB0\u4F4F\u3002"){let q=await e("environment/switch",u);return I.current&&(p(ce(q.settings,s.distros)),f({text:B})),q}function R(u=!1){y.current||t.pending||(u&&(t.popup=window.open("about:blank","_blank"),t.popup&&(t.popup.opener=null,t.popup.document.title="\u6B63\u5728\u51C6\u5907 Linux DSH",t.popup.document.body.textContent="\u6B63\u5728\u51C6\u5907 Linux DSH\uFF0C\u5B8C\u6210\u540E\u4F1A\u81EA\u52A8\u8FDB\u5165\u3002Windows DSH \u53EF\u4EE5\u7EE7\u7EED\u4F7F\u7528\u3002",t.popup.document.body.style.cssText="font:14px/1.7 system-ui;padding:48px;max-width:560px;margin:auto;color:#666;background:#fafafa")),g("enter",async()=>{try{t.remember();let B=await e("native/enter",{...k(),parentOrigin:F(window.location.origin)});p(ce(B.settings,s.distros)),await L(),t.setPending({id:B.id,mode:u?"new":"same"})}catch(B){throw t.popup?.close(),t.popup=null,B}}))}if(!s||!o)return(0,r.jsxs)("div",{className:"dsh-wsl-page",children:[(0,r.jsx)("header",{className:"dsh-wsl-heading",children:(0,r.jsxs)("div",{children:[(0,r.jsx)("h1",{children:"WSL \u4E0E Windows"}),(0,r.jsx)("p",{children:"\u5728\u540C\u4E00\u7A97\u53E3\u4F7F\u7528\u4E24\u5957\u73AF\u5883\uFF0CWSL \u5BF9\u8BDD\u4F1A\u663E\u793A\u6807\u5FD7\u3002"})]})}),(0,r.jsxs)("div",{className:"dsh-wsl-empty",role:t.error?"alert":"status",children:[t.error||(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(O.StateDot,{state:"ongoing"}),"\u6B63\u5728\u8BFB\u53D6\u73AF\u5883\u2026"]}),t.error&&(0,r.jsx)(O.Button,{onClick:()=>g("refresh",async()=>{}),children:"\u91CD\u65B0\u8FDE\u63A5"})]})]});let E=s.mode==="wsl-host",T=s.mode!=="unsupported",U=ce(s.settings,s.distros),n=["distro","user","directory"].some(u=>o[u].trim()!==U[u]),l=s.native||{},w=l.running,z=t.pending&&s.handoffs?.find(u=>u.id===t.pending.id),P=!!(l.preparing||l.starting||t.pending),N=!!c||!!t.pending||!T,H=s.profiles?.find(u=>u.distro===o.distro&&u.user===o.user.trim()),D=s.pool.connections.find(u=>u.connected&&u.target[0]==="wsl"&&u.target[1]===o.distro&&(u.target[2]===o.user.trim()||u.info?.user===o.user.trim())),_=s.pool.connections.some(u=>u.connected&&u.target[0]==="windows"),V=h?.error&&h.text||t.error||s.error||!T&&"\u5F53\u524D\u73AF\u5883\u4E0D\u652F\u6301 WSL\uFF0C\u8BF7\u5728 Windows \u6216 WSL \u4E2D\u4F7F\u7528\u3002",oe=V||h?.text,Y=w?.openUrl||null,le=z?.state==="starting"||l.starting?"\u6B63\u5728\u542F\u52A8 DSH\uFF0C\u5E76\u7B49\u5F85 Windows \u8FDE\u63A5\u2026":l.progress?.text||"\u6B63\u5728\u8FDE\u63A5 Linux \u5DE5\u4F5C\u73AF\u5883\u2026";return(0,r.jsxs)("div",{className:"dsh-wsl-page",children:[(0,r.jsxs)("header",{className:"dsh-wsl-heading",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("h1",{children:"WSL \u4E0E Windows"}),(0,r.jsx)("p",{children:"\u5728\u540C\u4E00\u7A97\u53E3\u4F7F\u7528\u4E24\u5957\u73AF\u5883\uFF0CWSL \u5BF9\u8BDD\u4F1A\u663E\u793A\u6807\u5FD7\u3002"})]}),(0,r.jsx)(O.Button,{variant:"ghost",icon:(0,r.jsx)(O.IconRefreshOutlineRegular,{}),title:"\u5237\u65B0\u72B6\u6001","aria-label":"\u5237\u65B0\u72B6\u6001",disabled:!!c,onClick:()=>g("refresh",async()=>{})})]}),!E&&(0,r.jsxs)("div",{className:"dsh-wsl-unified-setting",children:[(0,r.jsx)("span",{children:"Windows \u4E0E WSL \u5BF9\u8BDD\u663E\u793A\u5728\u540C\u4E00\u4E2A\u5217\u8868\uFF0C\u5207\u6362\u5BF9\u8BDD\u5373\u53EF\u5207\u6362\u73AF\u5883\u3002"}),(0,r.jsx)(O.Button,{variant:"ghost",onClick:()=>t.conversations.setUnified(!t.conversations.unified),children:t.conversations.unified?"\u4F7F\u7528\u539F\u751F\u5DE5\u4F5C\u533A\u5217\u8868":"\u542F\u7528\u540C\u7A97\u53E3\u5BF9\u8BDD\u5217\u8868"})]}),oe&&(0,r.jsxs)("div",{className:`dsh-wsl-notice ${V?"is-error":""}`,role:V?"alert":"status",children:[(0,r.jsx)(O.StateDot,{state:V?"error":"done"}),(0,r.jsx)("span",{children:oe})]}),(0,r.jsxs)("section",{className:"dsh-wsl-section","aria-labelledby":"dsh-wsl-host-title",children:[(0,r.jsxs)("div",{className:"dsh-wsl-section-heading",children:[(0,r.jsx)("h2",{id:"dsh-wsl-host-title",children:"\u8FD0\u884C\u73AF\u5883"}),(0,r.jsx)("span",{className:"dsh-wsl-caption",children:"\u5207\u6362\u65F6\u4FDD\u7559\u4E24\u8FB9\u7684\u4EFB\u52A1"})]}),(0,r.jsxs)("div",{className:"dsh-wsl-host-grid",children:[(0,r.jsxs)("article",{className:`dsh-wsl-card dsh-wsl-host-card ${E?"":"is-current"}`,children:[(0,r.jsxs)("div",{className:"dsh-wsl-host-head",children:[(0,r.jsx)(ke,{size:23}),(0,r.jsx)(fe,{state:E?"idle":"done",children:E?"\u72EC\u7ACB\u8FD0\u884C":"\u5F53\u524D\u73AF\u5883"})]}),(0,r.jsx)("h3",{children:"Windows DSH"}),(0,r.jsxs)("p",{children:["PowerShell\u3001Windows \u6587\u4EF6\u548C\u5E94\u7528\u3002",(0,r.jsx)("br",{}),"\u4FDD\u7559 Windows \u4E2D\u7684\u5DE5\u4F5C\u533A\u4E0E\u4F1A\u8BDD\u3002"]}),(0,r.jsx)("div",{className:"dsh-wsl-host-actions",children:E?t.parentOrigin?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(O.Button,{variant:"outline",icon:(0,r.jsx)(ke,{size:16}),onClick:()=>{t.remember(),t.guest?t.guest.returnWindows():window.location.assign(Le(t.parentOrigin))},children:"\u5207\u6362\u5230 Windows"}),(0,r.jsxs)("a",{className:"dsh-wsl-text-link",href:Le(t.parentOrigin),target:"_blank",rel:"noopener noreferrer",children:["\u65B0\u7A97\u53E3\u6253\u5F00",(0,r.jsx)(de,{})]})]}):(0,r.jsx)("span",{className:"dsh-wsl-caption",children:"\u4ECE Windows DSH \u8FDB\u5165\u540E\uFF0C\u53EF\u5728\u8FD9\u91CC\u4E00\u952E\u8FD4\u56DE\u3002"}):(0,r.jsx)(O.Button,{variant:"outline",onClick:()=>i.layout.selectPanel(null),children:"\u7EE7\u7EED Windows \u4F1A\u8BDD"})})]}),(0,r.jsxs)("article",{className:`dsh-wsl-card dsh-wsl-host-card ${E?"is-current":""}`,children:[(0,r.jsxs)("div",{className:"dsh-wsl-host-head",children:[(0,r.jsx)(ee,{size:23}),(0,r.jsx)(fe,{state:E||w?"done":P?"ongoing":"idle",children:E?"\u5F53\u524D\u73AF\u5883":w?"\u5DF2\u5C31\u7EEA":P?"\u51C6\u5907\u4E2D":"\u6309\u9700\u542F\u52A8"})]}),(0,r.jsxs)("h3",{children:["Linux DSH ",(0,r.jsx)("span",{children:o.distro||"WSL"})]}),(0,r.jsxs)("p",{children:["DSH\u3001\u7EC8\u7AEF\u548C\u9879\u76EE\u90FD\u5728 Linux \u4E2D\u8FD0\u884C\u3002",(0,r.jsx)("br",{}),"Linux \u539F\u751F\u5DE5\u5177\uFF0C\u968F\u65F6\u8BBF\u95EE Windows\u3002"]}),(0,r.jsx)("div",{className:"dsh-wsl-host-actions",children:E?(0,r.jsx)(O.Button,{variant:"outline",onClick:()=>g("workspace",async()=>{let u=await x(k());await we(i,u.settings.directory)}),children:"\u7EE7\u7EED Linux \u4F1A\u8BDD"}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(O.Button,{variant:"primary",icon:P?(0,r.jsx)(O.StateDot,{state:"ongoing"}):(0,r.jsx)(ee,{size:16}),disabled:N||!o.distro||P,onClick:()=>R(!1),children:P?"\u6B63\u5728\u51C6\u5907\u2026":w?"\u6253\u5F00 WSL \u5BF9\u8BDD":"\u5F00\u59CB WSL \u5BF9\u8BDD"}),Y&&!n?(0,r.jsxs)("a",{className:"dsh-wsl-text-link",href:Y,target:"_blank",rel:"noopener noreferrer",children:["\u65B0\u7A97\u53E3\u6253\u5F00",(0,r.jsx)(de,{})]}):(0,r.jsx)(O.Button,{variant:"ghost",disabled:N||!o.distro||P,icon:(0,r.jsx)(de,{}),onClick:()=>R(!0),children:"\u540C\u65F6\u6253\u5F00"})]})})]})]}),P&&(0,r.jsxs)("div",{className:"dsh-wsl-native-status",role:"status",children:[(0,r.jsx)(O.StateDot,{state:"ongoing"}),(0,r.jsx)("span",{children:le})]}),!E&&!P&&(0,r.jsx)("p",{className:"dsh-wsl-section-note",children:"WSL \u5BF9\u8BDD\u76F4\u63A5\u5728\u5F53\u524D\u7A97\u53E3\u6253\u5F00\uFF0C\u5E76\u663E\u793A WSL \u6807\u5FD7\uFF1B\u4E24\u8FB9\u7684\u4EFB\u52A1\u7EE7\u7EED\u8FD0\u884C\u3002"})]}),(0,r.jsx)(Te,{state:s,model:t,chosen:k,task:g,api:e,disabled:N||P}),(0,r.jsxs)("section",{className:"dsh-wsl-section","aria-labelledby":"dsh-wsl-connection-title",children:[(0,r.jsxs)("div",{className:"dsh-wsl-section-heading",children:[(0,r.jsx)("h2",{id:"dsh-wsl-connection-title",children:"Linux \u5DE5\u4F5C\u76EE\u5F55"}),(0,r.jsx)(fe,{state:D?"done":"idle",children:D?"\u8FDE\u63A5\u5DF2\u5C31\u7EEA":"\u6309\u9700\u8FDE\u63A5"})]}),(0,r.jsx)("div",{className:"dsh-wsl-card",children:(0,r.jsxs)("form",{onSubmit:u=>{u.preventDefault(),N||g("connect",()=>x(k()))},children:[(0,r.jsxs)("div",{className:"dsh-wsl-fields",children:[(0,r.jsxs)("div",{className:"dsh-wsl-field",children:[(0,r.jsx)("label",{htmlFor:"dsh-wsl-distro",children:"WSL \u53D1\u884C\u7248"}),(0,r.jsxs)("div",{className:"dsh-wsl-select-wrap",children:[(0,r.jsxs)("select",{id:"dsh-wsl-distro",value:o.distro,disabled:N||E,onChange:u=>{let B=u.target.value,q=s.profiles?.find(Je=>Je.distro===B);g("switch",async()=>{await x({distro:B,user:q?.user||"",...q?.directory?{directory:q.directory}:{}},"\u5DF2\u5207\u6362\u8FDE\u63A5\uFF0C\u539F\u73AF\u5883\u7684\u4EFB\u52A1\u7EE7\u7EED\u8FD0\u884C\u3002")})},children:[!s.distros.length&&(0,r.jsx)("option",{value:"",children:"\u672A\u53D1\u73B0\u53D1\u884C\u7248"}),s.distros.map(u=>(0,r.jsxs)("option",{value:u.name,children:[u.name,u.isDefault?"\uFF08\u9ED8\u8BA4\uFF09":""]},u.name))]}),(0,r.jsx)(O.IconChevronDownOutlineRegular,{size:14})]}),(0,r.jsx)("p",{children:o.user?`\u7528\u6237 ${o.user}`:"\u4F7F\u7528\u53D1\u884C\u7248\u7684\u9ED8\u8BA4\u7528\u6237"})]}),(0,r.jsxs)("div",{className:"dsh-wsl-field",children:[(0,r.jsx)("label",{htmlFor:"dsh-wsl-directory",children:"\u5DE5\u4F5C\u76EE\u5F55"}),(0,r.jsxs)("div",{className:"dsh-wsl-directory-row",children:[(0,r.jsx)(O.Input,{id:"dsh-wsl-directory",className:"dsh-wsl-directory-input",value:o.directory,disabled:N,onChange:u=>b("directory",u.target.value),placeholder:"Linux\u3001Windows \u6216 WSL \u8DEF\u5F84",autoComplete:"off",spellCheck:!1}),(0,r.jsx)(O.Button,{variant:"outline",icon:(0,r.jsx)(O.IconFolderOpenOutlineRegular,{}),disabled:N||!o.distro,onClick:()=>A(!0),children:"\u6D4F\u89C8"})]}),(0,r.jsx)("p",{children:H?.storage==="windows-mount"?"\u8FD9\u662F Windows \u6302\u8F7D\u76EE\u5F55\u3002\u4F9D\u8D56\u5B89\u88C5\u548C\u9891\u7E41\u6784\u5EFA\u5EFA\u8BAE\u4F7F\u7528 Linux \u4E3B\u76EE\u5F55\u3002":H?.storage==="linux"?"Linux \u6587\u4EF6\u7CFB\u7EDF \xB7 \u9002\u5408\u4F9D\u8D56\u5B89\u88C5\u3001Git \u548C\u9891\u7E41\u6784\u5EFA":"\u652F\u6301\u7C98\u8D34 Windows \u8DEF\u5F84\uFF1B\u8FDE\u63A5\u540E\u81EA\u52A8\u8F6C\u6362\u5E76\u8BB0\u4F4F\u3002"})]})]}),!!H?.recentDirectories?.length&&(0,r.jsxs)("div",{className:"dsh-wsl-recents","aria-label":"\u6700\u8FD1\u4F7F\u7528\u7684\u76EE\u5F55",children:[(0,r.jsx)("span",{children:"\u6700\u8FD1"}),H.recentDirectories.slice(0,5).map(u=>(0,r.jsxs)("button",{type:"button",title:u,"aria-label":`\u4F7F\u7528\u76EE\u5F55 ${u}`,className:u===o.directory?"is-selected":"",disabled:N,onClick:()=>g("directory",()=>x({...k(),directory:u})),children:[(0,r.jsx)(O.IconFolderOpenOutlineRegular,{size:14}),(0,r.jsx)("span",{children:u==="/"?"/":u.split("/").filter(Boolean).pop()})]},u))]}),!E&&(0,r.jsxs)("details",{className:"dsh-wsl-advanced",children:[(0,r.jsxs)("summary",{children:["\u9AD8\u7EA7\u8BBE\u7F6E",(0,r.jsx)(O.IconChevronDownOutlineRegular,{size:12})]}),(0,r.jsxs)("div",{className:"dsh-wsl-user-field",children:[(0,r.jsx)("label",{htmlFor:"dsh-wsl-user",children:"Linux \u7528\u6237"}),(0,r.jsx)(O.Input,{id:"dsh-wsl-user",value:o.user,disabled:N,placeholder:"\u9ED8\u8BA4\u7528\u6237",autoComplete:"off",onChange:u=>{b("user",u.target.value),b("directory","")}}),(0,r.jsx)("p",{children:"\u6BCF\u4E2A\u7528\u6237\u72EC\u7ACB\u8BB0\u5FC6\u76EE\u5F55\uFF1B\u5207\u6362\u4E0D\u4F1A\u505C\u6B62\u5176\u4ED6\u7528\u6237\u7684\u4EFB\u52A1\u3002"})]})]}),(0,r.jsxs)("div",{className:"dsh-wsl-card-actions",children:[(0,r.jsxs)("div",{className:"dsh-wsl-action-primary",children:[(0,r.jsx)(O.Button,{variant:"outline",type:"submit",disabled:N||!o.distro,icon:c==="connect"||c==="switch"?(0,r.jsx)(O.StateDot,{state:"ongoing"}):void 0,children:c==="connect"?"\u6B63\u5728\u8FDE\u63A5\u2026":n?"\u5E94\u7528\u5DE5\u4F5C\u76EE\u5F55":"\u8FDE\u63A5 WSL"}),E&&(0,r.jsx)(O.Button,{variant:"ghost",disabled:N,onClick:()=>g("windows",async()=>{await e("connect",{target:"windows"}),f({text:"Windows \u4E92\u64CD\u4F5C\u5DF2\u5C31\u7EEA\u3002"})}),children:_?"Windows \u5DF2\u8FDE\u63A5":"\u8FDE\u63A5 Windows"})]}),(0,r.jsx)(O.Button,{variant:"ghost",icon:(0,r.jsx)(de,{}),disabled:N||!o.directory.trim(),onClick:()=>g("open",async()=>{let u=await e("open",{path:o.directory.trim(),distro:o.distro,user:o.user});if(u.exitCode!==0)throw new Error(u.stderr||"Windows \u65E0\u6CD5\u6253\u5F00\u6B64\u76EE\u5F55\u3002");f({text:"\u5DF2\u5728 Windows \u4E2D\u6253\u5F00\u5DE5\u4F5C\u76EE\u5F55\u3002"})}),children:"\u5728 Windows \u4E2D\u6253\u5F00"})]})]})})]}),(0,r.jsxs)("div",{className:"dsh-wsl-help",children:[(0,r.jsx)(O.IconFolderOpenOutlineRegular,{size:18}),(0,r.jsx)("p",{children:E?"\u5F53\u524D\u4F1A\u8BDD\u4F7F\u7528 Linux \u539F\u751F\u5DE5\u5177\u3002\u9700\u8981 Windows \u6587\u4EF6\u3001PowerShell \u6216\u526A\u8D34\u677F\u65F6\uFF0C\u53EF\u4EE5\u76F4\u63A5\u5728\u5BF9\u8BDD\u4E2D\u63D0\u51FA\u3002":"Windows \u4F1A\u8BDD\u7EE7\u7EED\u4F7F\u7528\u539F\u751F Windows \u5DE5\u5177\uFF1B\u4E5F\u80FD\u901A\u8FC7\u63D2\u4EF6\u76F4\u63A5\u6267\u884C Linux \u547D\u4EE4\u6216\u53CC\u5411\u590D\u5236\u6587\u4EF6\u3002\u5B8C\u6574 Linux \u5DE5\u4F5C\u6D41\u53EF\u4ECE\u4E0A\u65B9\u8FDB\u5165\u3002"})]}),(0,r.jsxs)("details",{className:"dsh-wsl-diagnostics",children:[(0,r.jsxs)("summary",{children:["\u8FD0\u884C\u4E0E\u8FDE\u63A5\u7BA1\u7406",(0,r.jsx)(O.IconChevronDownOutlineRegular,{size:12})]}),(0,r.jsxs)("div",{className:"dsh-wsl-diagnostics-body",children:[(0,r.jsxs)("dl",{children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("dt",{children:"\u5F53\u524D\u5BBF\u4E3B"}),(0,r.jsx)("dd",{children:E?"Linux / WSL":"Windows"})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("dt",{children:"\u63D2\u4EF6\u7248\u672C"}),(0,r.jsx)("dd",{children:s.version})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("dt",{children:"\u6D3B\u52A8\u8FDE\u63A5"}),(0,r.jsx)("dd",{children:s.pool.connections.filter(u=>u.connected).length})]}),D&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("dt",{children:"Linux Node.js"}),(0,r.jsx)("dd",{children:D.info?.node})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("dt",{children:"Linux \u4E3B\u76EE\u5F55"}),(0,r.jsx)("dd",{children:D.info?.home})]})]})]}),l.instances?.filter(u=>u.running).map(u=>(0,r.jsxs)("div",{className:"dsh-wsl-runtime-row",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("strong",{children:u.settings.distro}),(0,r.jsxs)("span",{children:[u.settings.user," \xB7 Linux DSH \u8FD0\u884C\u4E2D"]})]}),(0,r.jsx)(O.Button,{variant:"outline",disabled:N||u.preparing||u.starting,onClick:()=>m({kind:"stop",settings:u.settings}),children:"\u505C\u6B62\u6B64\u73AF\u5883"})]},`${u.settings.distro}/${u.settings.user}`)),!E&&(0,r.jsxs)("div",{className:"dsh-wsl-runtime-row",children:[(0,r.jsx)("p",{children:"\u9700\u8981\u9884\u5148\u4E0B\u8F7D\uFF0C\u6216\u66F4\u65B0\u505C\u6B62\u4E2D\u7684 Linux \u73AF\u5883\u65F6\u4F7F\u7528\u3002"}),(0,r.jsx)(O.Button,{variant:"outline",disabled:N||P||!!w||!o.distro,onClick:()=>g("prepare",async()=>{await e("native/prepare",k())}),children:"\u51C6\u5907\u73AF\u5883"})]}),(0,r.jsxs)("div",{className:"dsh-wsl-disconnect-row",children:[(0,r.jsx)("p",{children:"\u65AD\u5F00\u4F1A\u7ED3\u675F\u6865\u63A5\u8FDE\u63A5\u548C\u540E\u53F0\u4EFB\u52A1\u3002\u65E5\u5E38\u5207\u6362\u65E0\u9700\u65AD\u5F00\u3002"}),(0,r.jsx)(O.Button,{variant:"outline",disabled:N||P||!s.pool.connections.length,onClick:()=>m({kind:"disconnect"}),children:"\u65AD\u5F00\u5168\u90E8\u8FDE\u63A5"})]})]})]}),v&&(0,r.jsx)(Oe,{api:e,distro:o.distro,user:o.user,initialPath:o.directory.trim(),onClose:()=>A(!1),onSelect:u=>{A(!1),g("directory",()=>x({...k(),directory:u}))}}),(0,r.jsx)(O.Modal,{open:!!d,onClose:()=>m(null),title:d?.kind==="stop"?"\u505C\u6B62\u8FD9\u4E2A Linux \u73AF\u5883\uFF1F":"\u65AD\u5F00\u5168\u90E8\u8FDE\u63A5\uFF1F",closeLabel:"\u5173\u95ED",description:d?.kind==="stop"?"\u8BE5 Linux DSH \u4E2D\u7684\u4EFB\u52A1\u4F1A\u505C\u6B62\uFF0C\u5176\u4ED6\u73AF\u5883\u7EE7\u7EED\u8FD0\u884C\u3002\u5DF2\u4FDD\u5B58\u7684\u6587\u4EF6\u548C\u4F1A\u8BDD\u4F1A\u4FDD\u7559\u3002":"\u5168\u90E8\u6865\u63A5\u4EFB\u52A1\u548C\u672C\u63D2\u4EF6\u542F\u52A8\u7684 Linux DSH \u4F1A\u505C\u6B62\u3002Windows DSH \u548C\u5DF2\u4FDD\u5B58\u7684\u6587\u4EF6\u4FDD\u7559\u3002",footer:(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(O.Button,{onClick:()=>m(null),children:"\u53D6\u6D88"}),(0,r.jsx)(O.Button,{variant:"primary",onClick:()=>{let u=d;m(null),g("stop",async()=>{await e(u.kind==="stop"?"native/stop":"disconnect",u.settings||{}),t.readyLink=null,f({text:u.kind==="stop"?"\u8BE5 Linux \u73AF\u5883\u5DF2\u505C\u6B62\u3002":"\u6865\u63A5\u8FDE\u63A5\u5DF2\u65AD\u5F00\u3002"})})},children:"\u786E\u8BA4\u505C\u6B62"})]})})]})}function $e(e,i,t){let s=new Map,o=new Map,p=new AbortController,c=new Set,a=new Set,h=new Map,f=0,v,A,d={entries:s,activeKey:null,error:null,busy:!1,anchor:null,unified:J("sidebar-view-v050",void 0,localStorage)==="conversations",nativeCatalog:()=>he(e),visible:()=>e.layout.panelInfo.getSnapshot().activePanelId===re,changed(){t.emit()},setUnified(n){d.unified=n,J("sidebar-view-v050",n?"conversations":"workspaces",localStorage),t.emit()},setAnchor(n){d.anchor=n,t.emit()},showWindows(n){f++,d.error=null,n?e.uiWorkspace.openSession(n):e.layout.selectPanel(null),t.emit()},async openRow(n){if(!n.environment)return d.showWindows(n.id);let l=s.get(n.environment.key);if(!l?.ready)return d.enter(l.settings,{sessionId:n.id});f++,d.activeKey=l.key,d.error=null,e.layout.selectPanel(re),t.emit();try{await L(l,{sessionId:n.id})}catch(w){d.error=w.message,t.emit()}},async enter(n,l={}){if(d.busy)return;let w=++f;d.busy=!0,d.error=null,t.emit();try{let z=await i("native/enter",{...n,parentOrigin:F(location.origin)}),P,N=Date.now()+600*1e3;for(;!p.signal.aborted&&Date.now()<N;){if(P=(await t.refresh()).handoffs.find(D=>D.id===z.id),P?.state==="failed")throw new Error(P.error);if(P?.state==="ready")break;await new Promise(D=>setTimeout(D,700))}if(p.signal.aborted)return;if(P?.state!=="ready")throw new Error("Linux \u542F\u52A8\u4ECD\u672A\u5B8C\u6210\uFF0C\u8BF7\u5728\u73AF\u5883\u9762\u677F\u67E5\u770B\u8FDB\u5EA6\u3002");await d.adopt(P,l,w===f)}catch(z){d.error=z.message}finally{d.busy=!1,t.emit()}},async adopt(n,l={},w=!0){let z=me(n.settings);c.delete(z);let P=new URL(n.url).origin,N=s.get(z);if(!N||N.origin!==P){if([...s.values()].filter(_=>_.url&&_.key!==z).length>=8)throw new Error("\u540C\u4E00\u7A97\u53E3\u6700\u591A\u4FDD\u6301 8 \u4E2A Linux \u73AF\u5883\u3002\u5728\u5BF9\u8BDD\u83DC\u5355\u4E2D\u5173\u95ED\u4E0D\u7528\u7684\u73AF\u5883\u9875\u9762\u540E\u53EF\u7EE7\u7EED\u6253\u5F00\uFF0C\u540E\u53F0\u4EFB\u52A1\u4E0D\u53D7\u5F71\u54CD\u3002");N&&g(N,"Linux \u5DF2\u91CD\u65B0\u542F\u52A8\uFF0C\u8BF7\u91CD\u8BD5\u8FD9\u6B21\u64CD\u4F5C\u3002");let D=crypto.randomUUID();N={key:z,settings:n.settings,origin:P,channel:D,catalog:N?.catalog||null,url:Ie(n.url,D,location.origin),openUrl:n.url,transport:F(location.origin)===te?"desktop":"iframe",ready:!1,compact:!0,window:null,waiting:null,startedAt:Date.now()},s.set(z,N)}else N.settings=n.settings,N.openUrl=n.url;N.handoff=ie(new URL(n.url).hash),w&&(d.activeKey=z,e.layout.selectPanel(re));let H={handoff:N.handoff,...l};N.ready?await L(N,H):N.waiting=H,m(),t.emit()},bind(n,l){n.window=l?.contentWindow||null},desktopMessage(n,l){s.get(n.key)===n&&x(n,l)},desktopError(n,l){s.get(n.key)===n&&(n.ready=!1,d.error=l.message,g(n,l.message),t.emit())},newWindows(){f++,e.uiWorkspace.startSession(),t.emit()},async newLinux(n){let l=n?.settings||t.state?.settings;if(!l?.distro){e.layout.selectPanel("dsh-wsl-native");return}let w=n?.catalog?.rows.find(z=>z.id===n.catalog.selectedId);await d.enter({...l,directory:w?.cwd||l.directory},{create:!0})},async action(n,l){d.error=null;try{if(n.environment){let w=s.get(n.environment.key);if(!w.ready)throw new Error("\u8BF7\u5148\u6253\u5F00\u8FD9\u6761 WSL \u5BF9\u8BDD\uFF0C\u518D\u6267\u884C\u64CD\u4F5C\u3002");await I(w,l,{sessionId:n.id})}else{let w={pin:"pinSession",unpin:"unpinSession",archive:"archiveSession",unarchive:"unarchiveSession"};if(!w[l])throw new Error("\u5BF9\u8BDD\u64CD\u4F5C\u65E0\u6548\u3002");await e.uiWorkspace[w[l]](n.id)}}catch(w){d.error=w.message}t.emit()},toggleChrome(n){let l=n.configOpen?null:"plugins";I(n,"chrome",{compact:!0,panel:l}).then(()=>{n.configOpen=!!l,n.compact=!0,t.emit()}).catch(w=>{d.error=w.message,t.emit()})},closeView(n){c.add(n.key),g(n,"\u8FD9\u4E2A\u73AF\u5883\u7684\u9875\u9762\u5DF2\u5173\u95ED\uFF0C\u540E\u53F0\u4EFB\u52A1\u7EE7\u7EED\u8FD0\u884C\u3002"),d.activeKey===n.key&&d.showWindows(),delete n.url,n.window=null,n.ready=!1,n.origin=null,n.waiting=null,m(),t.emit()},reconnect(n){g(n,"\u8FDE\u63A5\u6B63\u5728\u91CD\u65B0\u5EFA\u7ACB\u3002"),n.origin=null,d.enter(n.settings,n.catalog?.selectedId?{sessionId:n.catalog.selectedId}:{})}};function m(){clearTimeout(v),v=setTimeout(()=>J("conversation-catalogs",[...s.values()].map(n=>({key:n.key,settings:n.settings,catalog:n.catalog})),localStorage),200)}let y=J("conversation-catalogs",void 0,localStorage)||J("conversation-catalogs");for(let n of(Array.isArray(y)?y:[]).slice(0,8)){if(!n?.settings?.distro||!n?.settings?.directory||!ue(n.catalog))continue;let l=me(n.settings);s.set(l,{key:l,settings:n.settings,catalog:ue(n.catalog),ready:!1,compact:!0})}function I(n,l,w){if(!n.window&&!n.desktop||!n.ready)return Promise.reject(new Error("WSL \u5BF9\u8BDD\u754C\u9762\u5C1A\u672A\u8FDE\u63A5\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002"));let z=crypto.randomUUID();return new Promise((P,N)=>{let H=setTimeout(()=>{o.delete(z),N(new Error("WSL \u5BF9\u8BDD\u6CA1\u6709\u53CA\u65F6\u54CD\u5E94\uFF0C\u8BF7\u68C0\u67E5\u8FDE\u63A5\uFF1B\u64CD\u4F5C\u4E0D\u4F1A\u81EA\u52A8\u91CD\u653E\u3002"))},3e4);o.set(z,{entry:n,resolve:P,reject:N,timer:H}),n.desktop?n.desktop.request(l,w).then(()=>x(n,{type:"result",id:z,ok:!0}),D=>x(n,{type:"result",id:z,ok:!1,error:D.message})):n.window.postMessage({protocol:pe,channel:n.channel,type:"request",id:z,action:l,payload:w},n.origin)})}async function L(n,l){let w=crypto.randomUUID();n.navigating=w,t.emit();try{await I(n,"navigate",l),n.configOpen=!1,l.panel==="plugins"&&(await I(n,"chrome",{compact:!0,panel:"plugins"}),n.configOpen=!0)}finally{n.navigating===w&&(n.navigating=null),t.emit()}}function g(n,l){for(let[w,z]of o)z.entry===n&&(clearTimeout(z.timer),o.delete(w),z.reject(new Error(l)))}function b(n){let l=[...document.body.style].filter(w=>/^--(?:ds|dsw|dsh)-/.test(w)).map(w=>[w,document.body.style.getPropertyValue(w)]);I(n,"theme",{dark:document.body.hasAttribute("data-ds-dark-theme"),tokens:l}).catch(()=>{})}let k=n=>{let l=[...s.values()].find(w=>ve(n,{origin:w.origin,source:w.window,channel:w.channel}));l&&x(l,n.data)};function x(n,l){if(l.type==="catalog"){let w=ue(l.catalog);if(!w)return;let z=!n.ready;if(n.ready=!0,n.catalog=w,n.lastSeen=Date.now(),z&&b(n),n.waiting){let P=n.waiting;n.waiting=null,L(n,P).catch(N=>{d.error=N.message,t.emit()})}m(),t.emit()}else if(l.type==="result"){let w=o.get(l.id);if(!w||w.entry!==n)return;clearTimeout(w.timer),o.delete(l.id),l.ok?w.resolve():w.reject(new Error(String(l.error||"\u64CD\u4F5C\u5931\u8D25\u3002").slice(0,1e3)))}else l.type==="return"?d.showWindows():l.type==="sidebar"&&e.layout.toggleSidebar()}window.addEventListener("message",k);let R=new MutationObserver(()=>{for(let n of s.values())n.ready&&b(n)});R.observe(document.body,{attributes:!0,attributeFilter:["data-ds-dark-theme","style"]});let E=()=>{let n=JSON.stringify(he(e));n!==A&&(A=n,t.emit())},T=()=>{if(t.state?.mode==="windows-host")for(let n of t.state.native?.instances||[]){let l=me(n.settings);if(!n.running?.openUrl||s.get(l)?.url||c.has(l)||a.has(l))continue;let w;try{w=new URL(n.running.openUrl).origin}catch{continue}h.get(l)!==w&&(h.set(l,w),a.add(l),d.adopt({settings:n.settings,url:n.running.openUrl},{},!1).catch(z=>{d.error=z.message}).finally(()=>{a.delete(l),t.emit()}))}},U=[e.sessions.list.subscribe(E),e.workspaces.list.subscribe(E),e.layout.panelInfo.subscribe(()=>{t.emit()}),t.subscribe(T)];return T(),d.dispose=()=>{p.abort(),R.disconnect(),clearTimeout(v),window.removeEventListener("message",k);for(let n of U)n();for(let n of s.values())g(n,"\u7A97\u53E3\u5DF2\u5173\u95ED\u3002")},d}var K=require("react"),X=require("@deepseek-ai/dsh-client-ui-primitives");function nt(e,i,t,s){if(!ne(e)||!["next","request"].includes(t)||!/^[a-zA-Z0-9-]{32,64}$/.test(i))throw new Error("\u684C\u9762 WSL \u901A\u9053\u53C2\u6570\u65E0\u6548\u3002");return`(() => { if (location.origin !== ${JSON.stringify(e)} || location.pathname !== '/') return null; const api = window[${JSON.stringify(ae)}]; return api ? api[${JSON.stringify(t)}](...${JSON.stringify([i,...s])}) : null; })()`}function je({host:e,entry:i,bridge:t,onMessage:s,onError:o,createElement:p=()=>document.createElement("webview")}){let c=!1,a,h,f,v=0,A,d,m=g=>new Promise(b=>{d=b,A=setTimeout(()=>{d=null,b()},g)}),y=(g,...b)=>c||!a||new URL(a.getURL()).origin!==i.origin?Promise.reject(new Error("WSL \u9875\u9762\u5C1A\u672A\u8FDE\u63A5\u6216\u5DF2\u79BB\u5F00\u6240\u5C5E\u73AF\u5883\u3002")):a.executeJavaScript(nt(i.origin,i.channel,g,b));async function I(g){let b=0,k=Date.now()+45e3;try{for(;!c&&g===v;){let x=await y("next",b);if(c||g!==v)return;if(!x){if(Date.now()>k)throw new Error("Linux \u5BF9\u8BDD\u63D2\u4EF6\u5C1A\u672A\u5C31\u7EEA\uFF0C\u8BF7\u91CD\u65B0\u8FDE\u63A5\u3002");await m(250);continue}if(x.closed)return;if(!Number.isSafeInteger(x.sequence)||x.sequence<b)throw new Error("WSL \u9875\u9762\u8FD4\u56DE\u4E86\u65E0\u6548\u6E38\u6807\u3002");b=x.sequence,x.catalog&&s({type:"catalog",catalog:x.catalog});for(let R of(x.signals||[]).slice(0,16))["return","sidebar"].includes(R.type)&&s({type:R.type})}}catch(x){!c&&g===v&&o(x)}}let L={async request(g,b){let k=await y("request",g,b);if(!k?.ok)throw new Error(k?.error||"WSL \u9875\u9762\u5C1A\u672A\u8FDE\u63A5\u3002")},dispose(){c||(c=!0,v++,clearTimeout(A),d?.(),f?.(),a?.remove(),h&&t.release(h).catch(()=>{}))}};return(async()=>{if(!t?.acquire||!t?.release)throw new Error("\u5F53\u524D DSH \u684C\u9762\u7AEF\u6CA1\u6709\u9694\u79BB\u6D4F\u89C8\u5668\u63A5\u53E3\uFF0C\u8BF7\u66F4\u65B0 DSH \u6216\u4F7F\u7528 Web \u5165\u53E3\u3002");let g=await t.acquire("dsh-wsl-native:"+i.key);if(h=g.lease,c){await t.release(h);return}a=p(),a.className="dsh-wsl-desktop-view",a.setAttribute("name",h),a.setAttribute("partition",g.partition),a.setAttribute("allowpopups",""),a.setAttribute("aria-label",`WSL ${i.settings.distro} \u539F\u751F DSH \u5BF9\u8BDD`),a.setAttribute("src","about:blank#"+h);let b=!0;a.addEventListener("dom-ready",()=>{c||(b?(b=!1,a.loadURL(i.url).catch(k=>{c||o(k)})):I(++v))}),a.addEventListener("did-start-navigation",k=>{k.isMainFrame&&!k.isInPlace&&v++}),a.addEventListener("did-fail-load",k=>{!c&&k.isMainFrame&&k.errorCode!==-3&&o(new Error("WSL \u9875\u9762\u52A0\u8F7D\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5 Linux \u5B9E\u4F8B\u5E76\u91CD\u65B0\u8FDE\u63A5\u3002"))}),a.addEventListener("render-process-gone",()=>{v++,c||o(new Error("WSL \u5BF9\u8BDD\u9875\u9762\u5DF2\u9000\u51FA\uFF0C\u540E\u53F0\u5BBF\u4E3B\u4ECD\u72EC\u7ACB\u8FD0\u884C\u3002\u8BF7\u91CD\u65B0\u8FDE\u63A5\u3002"))}),f=t.onOpenRequested?.(h,k=>{!c&&/^https?:/.test(k)&&window.open(k,"_blank","noopener")}),e.append(a)})().catch(g=>{c||o(g)}),L}var G=require("react"),Z=require("@deepseek-ai/dsh-client-ui-primitives");var S=require("react/jsx-runtime"),it={switch:"M4 7h16m-4-4 4 4-4 4M20 17H4m4-4-4 4 4 4",search:"M10.5 17a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13Zm5-1.5L21 21",filter:"M4 6h16M7 12h10M10 18h4",plus:"M12 4v16M4 12h16"};function xe({name:e}){return(0,S.jsx)("svg",{width:"15",height:"15",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:(0,S.jsx)("path",{d:it[e]})})}function Ue({ctx:e,model:i,wide:t,expandSidebar:s}){se(i);let o=i.conversations,p=o.nativeCatalog(),[c,a]=(0,G.useState)("all"),[h,f]=(0,G.useState)(""),[v,A]=(0,G.useState)(35),[d,m]=(0,G.useState)(!1),[y,I]=(0,G.useState)(null),[L,g]=(0,G.useState)(null),[b,k]=(0,G.useState)(!1),x=(0,G.useRef)(null),R=(0,G.useRef)(null);if((0,G.useEffect)(()=>{if(!L)return;let l=w=>{(!x.current?.contains(w.target)||w.key==="Escape")&&g(null)};return document.addEventListener("pointerdown",l),document.addEventListener("keydown",l),()=>{document.removeEventListener("pointerdown",l),document.removeEventListener("keydown",l)}},[L]),(0,G.useEffect)(()=>{b&&R.current?.focus()},[b]),!t)return(0,S.jsx)("div",{className:"dsh-wsl-chat-rail",children:(0,S.jsx)(Z.Button,{variant:"ghost",icon:(0,S.jsx)(ee,{size:18}),"aria-label":"\u5C55\u5F00\u5BF9\u8BDD\u5217\u8868",onClick:s})});let E=be(p,o.entries.values(),{filter:c,query:h,archived:d}),T=l=>{window.matchMedia("(max-width:600px)").matches&&e.layout.toggleSidebar(),l()},U=l=>{m(!1),a("all"),f(""),A(35),g(null),T(()=>l?void o.newLinux(o.entries.get(o.activeKey)):o.newWindows())},n=l=>{let w=y;I(null),o.action(w,l)};return(0,S.jsxs)("section",{ref:x,className:"dsh-wsl-conversations","aria-label":"Windows \u4E0E WSL \u5BF9\u8BDD\u5217\u8868",children:[(0,S.jsxs)("div",{className:"dsh-wsl-compact-heading",children:[(0,S.jsx)("span",{children:d?"\u5DF2\u5F52\u6863":c==="wsl"?"WSL \u5BF9\u8BDD":c==="windows"?"Windows \u5BF9\u8BDD":"\u5BF9\u8BDD"}),(0,S.jsx)("button",{type:"button",className:"dsh-wsl-icon-button","aria-label":"\u5207\u6362\u5230\u539F\u751F\u5DE5\u4F5C\u533A",title:"\u5207\u6362\u5230\u539F\u751F\u5DE5\u4F5C\u533A",onClick:()=>o.setUnified(!1),children:(0,S.jsx)(xe,{name:"switch"})}),(0,S.jsxs)("div",{className:"dsh-wsl-heading-actions",children:[(0,S.jsx)("button",{type:"button",className:"dsh-wsl-icon-button","aria-label":"\u641C\u7D22\u5BF9\u8BDD",title:"\u641C\u7D22\u5BF9\u8BDD","aria-expanded":b,onClick:()=>{k(!b),b&&f(""),g(null)},children:(0,S.jsx)(xe,{name:"search"})}),(0,S.jsx)("button",{type:"button",className:"dsh-wsl-icon-button","aria-label":"\u7B5B\u9009\u5BF9\u8BDD",title:"\u7B5B\u9009\u4E0E\u5F52\u6863","aria-expanded":L==="filter",onClick:()=>g(L==="filter"?null:"filter"),children:(0,S.jsx)(xe,{name:"filter"})}),(0,S.jsx)("button",{type:"button",className:"dsh-wsl-icon-button","aria-label":"\u65B0\u5EFA\u73AF\u5883\u5BF9\u8BDD",title:"\u65B0\u5EFA\u5BF9\u8BDD","aria-expanded":L==="new",onClick:()=>g(L==="new"?null:"new"),children:(0,S.jsx)(xe,{name:"plus"})})]})]}),L&&(0,S.jsx)("div",{className:"dsh-wsl-list-popover",role:"group","aria-label":L==="filter"?"\u5BF9\u8BDD\u7B5B\u9009":"\u9009\u62E9\u65B0\u5BF9\u8BDD\u73AF\u5883",children:L==="new"?(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)("button",{type:"button",onClick:()=>U(!1),children:"Windows \u65B0\u5BF9\u8BDD"}),(0,S.jsx)("button",{type:"button",disabled:o.busy,onClick:()=>U(!0),children:"WSL \u65B0\u5BF9\u8BDD"})]}):(0,S.jsxs)(S.Fragment,{children:[[["all","\u5168\u90E8\u73AF\u5883"],["windows","Windows"],["wsl","WSL"]].map(([l,w])=>(0,S.jsxs)("button",{type:"button","aria-pressed":c===l,onClick:()=>{a(l),A(35),g(null)},children:[w,c===l?" \u2713":""]},l)),(0,S.jsx)("button",{type:"button",className:"dsh-wsl-menu-divider","aria-pressed":d,onClick:()=>{m(!d),g(null)},children:d?"\u663E\u793A\u5F53\u524D\u5BF9\u8BDD":"\u663E\u793A\u5DF2\u5F52\u6863\u5BF9\u8BDD"})]})}),b&&(0,S.jsx)(Z.Input,{ref:R,"aria-label":"\u641C\u7D22\u5BF9\u8BDD\u6216\u5DE5\u4F5C\u76EE\u5F55",placeholder:"\u641C\u7D22\u5BF9\u8BDD\u6216\u76EE\u5F55",value:h,onChange:l=>{f(l.target.value),A(35)},onKeyDown:l=>{l.key==="Escape"&&(f(""),k(!1))}}),o.error&&(0,S.jsx)("div",{className:"dsh-wsl-chat-list-error",role:"alert",children:o.error}),(0,S.jsxs)("div",{className:"dsh-wsl-chat-rows",role:"list","aria-label":d?"\u5DF2\u5F52\u6863\u5BF9\u8BDD":"\u6240\u6709\u73AF\u5883\u7684\u5BF9\u8BDD",children:[E.slice(0,v).map(l=>{let w=l.environment?o.visible()&&o.activeKey===l.environment.key&&l.environment.catalog.selectedId===l.id:!e.layout.panelInfo.getSnapshot().activePanelId&&p.selectedId===l.id;return(0,S.jsxs)("div",{className:`dsh-wsl-chat-row${w?" is-selected":""}`,role:"listitem",children:[(0,S.jsxs)("button",{type:"button",className:"dsh-wsl-chat-row-open","aria-current":w?"page":void 0,disabled:d,"aria-label":`${l.environment?"WSL":"Windows"} \u5BF9\u8BDD\uFF1A${l.title}`,title:`${l.environment?`WSL \xB7 ${l.environment.settings.distro}`:"Windows"}
${l.cwd}`,onClick:()=>T(()=>void o.openRow(l)),children:[(0,S.jsx)("span",{className:"dsh-wsl-chat-dot",children:l.running?(0,S.jsx)(Z.StateDot,{state:"ongoing"}):l.pinned?"\u2022":null}),(0,S.jsx)("span",{className:"dsh-wsl-chat-row-text",children:(0,S.jsx)("span",{children:l.title||"\u65B0\u5BF9\u8BDD"})}),l.environment&&(0,S.jsx)("span",{className:"dsh-wsl-chat-mark",title:`WSL \xB7 ${l.environment.settings.distro}`,children:"WSL"})]}),(0,S.jsx)("button",{type:"button",className:"dsh-wsl-chat-more","aria-label":`\u7BA1\u7406\u5BF9\u8BDD\uFF1A${l.title}`,onClick:()=>I(l),children:"\u22EF"})]},l.key)}),E.length>v&&(0,S.jsxs)(Z.Button,{variant:"ghost",onClick:()=>A(v+35),children:["\u663E\u793A\u66F4\u591A\uFF08",E.length-v,"\uFF09"]}),!E.length&&(0,S.jsx)("div",{className:"dsh-wsl-chat-empty",children:h?"\u6CA1\u6709\u5339\u914D\u7684\u5BF9\u8BDD":d?"\u6CA1\u6709\u5DF2\u5F52\u6863\u5BF9\u8BDD":"\u70B9\u51FB\u53F3\u4E0A\u89D2 \uFF0B \u5F00\u59CB\u5BF9\u8BDD"})]}),o.busy&&(0,S.jsxs)("div",{className:"dsh-wsl-chat-list-foot",role:"status",children:[(0,S.jsx)(Z.StateDot,{state:"ongoing"}),"\u6B63\u5728\u51C6\u5907 WSL\u2026"]}),(0,S.jsx)(Z.Modal,{open:!!y,onClose:()=>I(null),title:y?.title||"\u7BA1\u7406\u5BF9\u8BDD",children:y&&(0,S.jsxs)("div",{className:"dsh-wsl-chat-menu",children:[(0,S.jsxs)("p",{children:[y.environment?`WSL \xB7 ${y.environment.settings.distro}`:"Windows"," \xB7 ",y.cwd]}),!y.archived&&(0,S.jsx)(Z.Button,{onClick:()=>n(y.pinned?"unpin":"pin"),children:y.pinned?"\u53D6\u6D88\u7F6E\u9876":"\u7F6E\u9876\u5BF9\u8BDD"}),(0,S.jsx)(Z.Button,{onClick:()=>n(y.archived?"unarchive":"archive"),children:y.archived?"\u6062\u590D\u5BF9\u8BDD":"\u5F52\u6863\u5BF9\u8BDD"}),y.environment?.url&&(0,S.jsx)(Z.Button,{variant:"ghost",onClick:()=>{o.closeView(y.environment),I(null)},children:"\u5173\u95ED\u73AF\u5883\u9875\u9762\uFF08\u4FDD\u7559\u540E\u53F0\u4EFB\u52A1\uFF09"})]})})]})}function rt(e,i=""){let t=new Map;for(let s of be(null,e,{filter:"wsl",query:i})){let o=JSON.stringify([s.environment.key,s.workspaceId||s.cwd]);t.has(o)||t.set(o,{key:o,environment:s.environment,path:s.cwd,title:s.workspaceTitle||s.cwd.split("/").filter(Boolean).at(-1)||"Linux",rows:[]}),t.get(o).rows.push(s)}return[...t.values()].sort((s,o)=>Number(o.rows.some(p=>p.running))-Number(s.rows.some(p=>p.running))||s.title.localeCompare(o.title))}function qe(e,i){let t=document,s=new Set,o=new Map,p,c,a,h,f=!1,v="",A,d=t.createElement("button"),m=t.createElement("div");d.type="button",d.className="dsh-wsl-icon-button dsh-wsl-native-toggle",d.setAttribute("aria-label","\u5207\u6362\u5230\u7D27\u51D1\u5BF9\u8BDD\u5217\u8868"),d.title="\u5207\u6362\u5230\u7D27\u51D1\u5BF9\u8BDD\u5217\u8868";let y=t.createElementNS("http://www.w3.org/2000/svg","svg");for(let[E,T]of Object.entries({width:"15",height:"15",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"1.6","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true"}))y.setAttribute(E,T);let I=t.createElementNS(y.namespaceURI,"path");I.setAttribute("d","M4 7h16m-4-4 4 4-4 4M20 17H4m4-4-4 4 4 4"),y.append(I),d.append(y),d.addEventListener("click",()=>i.conversations.setUnified(!0)),m.className="dsh-wsl-native-projects",m.setAttribute("role","group"),m.setAttribute("aria-label","WSL \u5DE5\u4F5C\u533A");let L=(E,T,U)=>{let n=t.createElement("button");return n.type="button",n.className=T,n.textContent=E,n.addEventListener("click",l=>{l.stopPropagation(),U()}),n};function g(E){let T=JSON.stringify([E.map(n=>[n.key,n.title,n.path,n.rows.map(l=>[l.id,l.title,l.running,l.pinned]),n.environment.ready]),i.conversations.activeKey,i.conversations.visible(),[...s],[...o],E.map(n=>n.environment.catalog?.selectedId)]);if(v===T)return;v=T;let U=t.createDocumentFragment();for(let n of E){let l=t.createElement("div");l.setAttribute("role","treeitem");let w=!s.has(n.key);l.setAttribute("aria-expanded",String(w));let z=L("","dsh-wsl-native-project",()=>{w?s.add(n.key):s.delete(n.key),g(E)});z.title=`WSL \xB7 ${n.environment.settings.distro} \xB7 ${n.path}`,z.setAttribute("aria-label",`${w?"\u6536\u8D77":"\u5C55\u5F00"} WSL \u5DE5\u4F5C\u533A ${n.title}`);let P=t.createElement("span");P.textContent=w?"\u2304":"\u203A",P.setAttribute("aria-hidden","true");let N=t.createElement("span");N.className="dsh-wsl-native-title",N.textContent=n.title;let H=t.createElement("span");if(H.className="dsh-wsl-chat-mark",H.textContent="WSL",z.append(P,N,H),l.append(z),w){let D=t.createElement("div");D.setAttribute("role","group");let _=o.get(n.key)||5;for(let V of n.rows.slice(0,_)){let oe=i.conversations.visible()&&i.conversations.activeKey===n.environment.key&&n.environment.catalog.selectedId===V.id,Y=L("",`dsh-wsl-native-session${oe?" is-selected":""}`,()=>{window.matchMedia("(max-width:600px)").matches&&e.layout.toggleSidebar(),i.conversations.openRow(V)});Y.setAttribute("role","treeitem"),Y.setAttribute("aria-selected",String(oe)),Y.setAttribute("aria-label",`WSL \u5BF9\u8BDD\uFF1A${V.title}`),Y.title=`${V.title}
${n.environment.settings.distro} \xB7 ${V.cwd}${n.environment.ready?"":`
\u70B9\u51FB\u8FDE\u63A5\u73AF\u5883`}`;let le=t.createElement("span");le.className=`dsh-wsl-native-status${V.running?" is-running":""}`,le.textContent=V.running?"\u25CC":V.pinned?"\u2022":"";let u=t.createElement("span");u.textContent=V.title||"\u65B0\u5BF9\u8BDD",Y.append(le,u),D.append(Y)}n.rows.length>_&&D.append(L(`\u5C55\u5F00\u5176\u4F59 ${n.rows.length-_} \u4E2A WSL \u5BF9\u8BDD`,"dsh-wsl-native-more",()=>{o.set(n.key,_+20),g(E)})),l.append(D)}U.append(l)}m.replaceChildren(U),m.hidden=!E.length}function b(){if(h=null,f)return;if(!(i.state?.mode==="windows-host"&&!i.conversations.unified)){d.remove(),m.remove();return}let U=t.querySelector("[data-shell-overlay]")?.parentElement,l=U?.querySelector(":scope > [data-rightbar-col]")?.previousElementSibling?.previousElementSibling;if(!l)return;c!==l&&(a?.disconnect(),p=U,c=l,a=new MutationObserver(H=>{H.some(D=>[...D.removedNodes].some(_=>(_===m||_===d)&&!_.isConnected)||!m.contains(D.target)&&D.target!==d&&[...D.addedNodes,...D.removedNodes].some(_=>_!==m&&_!==d))&&k()}),a.observe(c,{childList:!0,subtree:!0}));let w=c.querySelector('[class*="sectionHeader"]');if(!w){d.remove(),m.remove();return}let z=w.querySelector(":scope > span");d.parentElement!==w&&(z?z.after(d):w.prepend(d));let P=w.querySelector("input");P!==A&&(A?.removeEventListener("input",k),A=P,P?.addEventListener("input",k));let N=w.parentElement.querySelector('[role="tree"]');N&&m.parentElement!==N&&N.prepend(m),N||m.remove(),g(rt(i.conversations.entries.values(),P?.value||""))}function k(){!f&&!h&&(h=requestAnimationFrame(b))}let x=i.subscribe(k),R=e.slots.subscribe("sidebar.workspaces",k);return k(),()=>{f=!0,cancelAnimationFrame(h),a?.disconnect(),A?.removeEventListener("input",k),x(),R(),d.remove(),m.remove()}}var C=require("react/jsx-runtime");function He({distro:e,connected:i=!0}){return(0,C.jsxs)("span",{className:`dsh-wsl-chat-mark${i?"":" is-offline"}`,title:`WSL \xB7 ${e||"Linux"}`,children:[(0,C.jsx)(ee,{size:12}),"WSL"]})}function at({ctx:e,model:i}){se(i);let t=(0,K.useRef)(null),s=i.conversations,o=s.entries.get(s.activeKey)?.ready;return(0,K.useLayoutEffect)(()=>(s.setAnchor(t.current),()=>s.setAnchor(null)),[s]),(0,C.jsx)("div",{className:"dsh-wsl-chat-target",ref:t,children:!o&&(0,C.jsxs)("div",{className:"dsh-wsl-chat-loading",children:[(0,C.jsx)(X.StateDot,{state:"ongoing"}),"\u6B63\u5728\u8FDE\u63A5 WSL \u5BF9\u8BDD\u2026",(0,C.jsx)(X.Button,{variant:"ghost",onClick:()=>e.layout.selectPanel("dsh-wsl-native"),children:"\u67E5\u770B\u73AF\u5883"}),(0,C.jsx)(X.Button,{variant:"ghost",onClick:()=>s.showWindows(),children:"\u8FD4\u56DE Windows \u5BF9\u8BDD"})]})})}function ot({entry:e,model:i,visible:t}){let s=(0,K.useRef)(null);return(0,K.useEffect)(()=>{let o=i.conversations,p=je({host:s.current,entry:e,bridge:window.dshDesktop?.browser,onMessage:c=>o.desktopMessage(e,c),onError:c=>o.desktopError(e,c)});return e.desktop=p,()=>{p.dispose(),e.desktop===p&&(e.desktop=null)}},[e,i]),(0,C.jsx)("div",{className:"dsh-wsl-desktop-surface",ref:s,inert:!t||!!e.navigating,style:{visibility:t&&e.ready?"visible":"hidden"}})}function lt({entry:e,model:i,visible:t,rect:s,ctx:o}){let p=i.conversations,[c,a]=(0,K.useState)(!1);(0,K.useEffect)(()=>{let f=setTimeout(()=>a(!0),45e3);return()=>clearTimeout(f)},[e.channel]);let h=e.catalog?.rows.find(f=>f.id===e.catalog.selectedId);return(0,C.jsxs)("section",{className:"dsh-wsl-resident","aria-label":`WSL \xB7 ${e.settings.distro} \u5BF9\u8BDD`,"aria-hidden":!t,inert:!t,style:t&&s?{top:s.top,left:s.left,width:s.width,height:s.height}:{visibility:"hidden",left:-2e4,top:0,width:s?.width||1e3,height:s?.height||800},children:[(0,C.jsxs)("header",{className:"dsh-wsl-chat-toolbar",children:[(0,C.jsx)(X.Button,{variant:"ghost",icon:(0,C.jsx)(X.IconPanelLeftOutlineRegular,{}),"aria-label":"\u5C55\u5F00\u6216\u6536\u8D77\u5BF9\u8BDD\u5217\u8868",title:"\u5C55\u5F00\u6216\u6536\u8D77\u5BF9\u8BDD\u5217\u8868",onClick:()=>o.layout.toggleSidebar()}),(0,C.jsx)(He,{distro:e.settings.distro,connected:e.catalog?.connected}),(0,C.jsxs)("span",{className:"dsh-wsl-chat-context",title:h?.cwd||e.settings.directory,children:[e.settings.distro,(0,C.jsxs)("span",{children:[" \xB7 ",h?.cwd?.split("/").filter(Boolean).at(-1)||"Linux"]})]}),(0,C.jsxs)("div",{className:"dsh-wsl-chat-toolbar-actions",children:[(0,C.jsx)(X.Button,{variant:"ghost",disabled:!e.ready||p.busy,onClick:()=>void p.newLinux(e),children:"\u65B0\u5BF9\u8BDD"}),(0,C.jsx)(X.Button,{variant:"ghost",disabled:!e.ready,title:"\u7BA1\u7406 Linux \u63D2\u4EF6\u4E0E\u914D\u7F6E",onClick:()=>p.toggleChrome(e),children:e.configOpen?"\u8FD4\u56DE\u5BF9\u8BDD":"Linux \u914D\u7F6E"})]})]}),p.error&&t&&(0,C.jsx)("div",{role:"alert",className:"dsh-wsl-chat-notice",children:p.error}),e.ready&&!e.catalog?.connected&&(0,C.jsxs)("div",{role:"status",className:"dsh-wsl-chat-notice",children:["WSL \u8FDE\u63A5\u5DF2\u4E2D\u65AD\uFF0C\u6062\u590D\u8FDE\u63A5\u540E\u53EF\u7EE7\u7EED\u4F7F\u7528\u3002",(0,C.jsx)(X.Button,{variant:"ghost",disabled:p.busy,onClick:()=>p.reconnect(e),children:"\u91CD\u65B0\u8FDE\u63A5"})]}),(0,C.jsxs)("div",{className:"dsh-wsl-chat-frame-body",children:[e.transport==="desktop"?(0,C.jsx)(ot,{entry:e,model:i,visible:t}):(0,C.jsx)("iframe",{title:`WSL ${e.settings.distro} \u539F\u751F DSH \u5BF9\u8BDD`,src:e.url,ref:f=>p.bind(e,f),inert:!t||!!e.navigating,referrerPolicy:"no-referrer",allow:"clipboard-read; clipboard-write",style:{visibility:t&&e.ready?"visible":"hidden"}},e.channel),!e.ready&&(0,C.jsxs)("div",{className:"dsh-wsl-chat-loading",children:[(0,C.jsx)(X.StateDot,{state:"ongoing"}),(0,C.jsx)("span",{children:c?"WSL \u5BF9\u8BDD\u5C1A\u672A\u8FDE\u63A5\u3002\u53EF\u4EE5\u91CD\u65B0\u8FDE\u63A5\uFF0C\u6216\u67E5\u770B\u73AF\u5883\u4E2D\u7684\u542F\u52A8\u72B6\u6001\u3002":"\u6B63\u5728\u6253\u5F00 Linux \u5BF9\u8BDD\u2026"}),c&&(0,C.jsx)(X.Button,{onClick:()=>p.reconnect(e),children:"\u91CD\u65B0\u8FDE\u63A5"}),(0,C.jsx)(X.Button,{variant:"ghost",onClick:()=>p.showWindows(),children:"\u8FD4\u56DE Windows"})]})]})]})}function dt({ctx:e,model:i}){se(i);let[t,s]=(0,K.useState)(null),o=i.conversations,p=o?.visible(),c=o?.anchor;return(0,K.useLayoutEffect)(()=>{if(!c)return;let a,h=()=>{cancelAnimationFrame(a),a=requestAnimationFrame(()=>{let v=c.getBoundingClientRect();s({top:v.top,left:v.left,width:Math.max(0,document.documentElement.clientWidth-v.left),height:v.height})})},f=new ResizeObserver(h);return f.observe(c),window.addEventListener("resize",h),h(),()=>{f.disconnect(),window.removeEventListener("resize",h),cancelAnimationFrame(a)}},[c]),(0,K.useEffect)(()=>(document.documentElement.toggleAttribute("data-dsh-wsl-conversation",!!p),()=>document.documentElement.removeAttribute("data-dsh-wsl-conversation")),[p]),i.state?.mode!=="windows-host"||!o?null:(0,C.jsx)(C.Fragment,{children:[...o.entries.values()].filter(a=>a.url).map(a=>(0,C.jsx)(lt,{entry:a,model:i,ctx:e,visible:!!p&&!!c&&o.activeKey===a.key,rect:t},a.key+a.channel))})}function ct({model:e}){se(e);let i=(0,K.useRef)(null),t=e.guest?.compact===!0;return(0,K.useLayoutEffect)(()=>{let s=i.current?.closest("[data-shell-overlay]")?.parentElement;if(!s||!e.guest)return;let p=s.querySelector(":scope > [data-rightbar-col]")?.previousElementSibling,c=p?.previousElementSibling;c?.setAttribute("data-dsh-wsl-guest-sidebar",""),p?.setAttribute("data-dsh-wsl-guest-center",""),s.toggleAttribute("data-dsh-wsl-embedded",t);let a=()=>{let v=/minmax\(0px,\s*([\d.]+px)\)\s*$/.exec(s.style.gridTemplateColumns)?.[1]||"0px";s.style.getPropertyValue("--dsh-wsl-right-track")!==v&&s.style.setProperty("--dsh-wsl-right-track",v)},h=new MutationObserver(a);return h.observe(s,{attributes:!0,attributeFilter:["style"]}),a(),()=>{h.disconnect(),s.removeAttribute("data-dsh-wsl-embedded"),s.style.removeProperty("--dsh-wsl-right-track"),c?.removeAttribute("data-dsh-wsl-guest-sidebar"),p?.removeAttribute("data-dsh-wsl-guest-center")}},[e.guest,t]),(0,C.jsx)("span",{ref:i})}function _e(e,i){e.effect(()=>qe(e,i)),e.slots.inject("main",()=>e.slots.register({name:"main",key:re},()=>(0,C.jsx)(at,{ctx:e,model:i}))),e.slots.inject("shell.overlay",()=>e.slots.register({name:"shell.overlay",id:"dsh-wsl-conversations",order:15},()=>(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(dt,{ctx:e,model:i}),(0,C.jsx)(ct,{model:i})]}))),e.slots.inject("sidebar.workspaces",()=>{let t,s=()=>{let p=i.state?.mode==="windows-host"&&!!F(location.origin)&&i.conversations?.unified;p&&!t?t=e.slots.register({name:"sidebar.workspaces",priority:-80},c=>(0,C.jsx)(Ue,{...c,ctx:e,model:i})):!p&&t&&(t(),t=null)},o=i.subscribe(s);return s(),()=>{o(),t?.()}}),e.slots.inject("conversation.session.header.actions",()=>e.slots.register({name:"conversation.session.header.actions",id:"dsh-wsl-environment",order:5},()=>(se(i),i.state?.mode==="wsl-host"&&!i.guest?(0,C.jsx)(He,{distro:i.state.settings.distro}):null)))}var Fe=require("react/jsx-runtime"),We="dsh-wsl-native",pt="dsh-wsl-native-client",ut=["connection","slots","layout","workspaces","uiWorkspace","sessions"];function ht(e){let i=async(s,o={})=>{let p=await e.connection.rpc.call("/api",`${We}/${s}`,o);if(!p.ok)throw Object.assign(new Error(p.error?.message||"\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\u3002"),{code:p.error?.code});return p.value},t=De(e,i);t.conversations=$e(e,i,t),_e(e,t),e.effect(()=>()=>t.dispose()),e.effect(()=>{let s=document.createElement("style");return s.dataset.dshWslNative="",s.textContent=Ee,document.head.append(s),()=>s.remove()}),e.slots.inject("main",()=>e.slots.register({name:"main",key:We},()=>(0,Fe.jsx)(Me,{api:i,ctx:e,model:t}))),e.slots.inject("sidebar.panellist",()=>e.slots.register({name:"sidebar.panellist",id:We,order:20,label:()=>"WSL \u4E0E Windows"},ee))}

return module.exports;}});
