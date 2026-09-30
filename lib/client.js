window.__ModuleLoader__.load({id:"dsh-wsl-native",factory:(require)=>{const module={exports:{}};const exports=module.exports;
"use strict";var he=Object.defineProperty;var Me=Object.getOwnPropertyDescriptor;var $e=Object.getOwnPropertyNames;var Ue=Object.prototype.hasOwnProperty;var He=(e,r)=>{for(var t in r)he(e,t,{get:r[t],enumerable:!0})},qe=(e,r,t,i)=>{if(r&&typeof r=="object"||typeof r=="function")for(let o of $e(r))!Ue.call(e,o)&&o!==t&&he(e,o,{get:()=>r[o],enumerable:!(i=Me(r,o))||i.enumerable});return e};var _e=e=>qe(he({},"__esModule",{value:!0}),e);var rt={};He(rt,{apply:()=>nt,inject:()=>it,name:()=>st});module.exports=_e(rt);var qt=require("react");var ke=`.dsh-wsl-conversations { display:flex; flex-direction:column; gap:10px; min-height:0; height:100%; padding:0 6px; color:var(--dsw-alias-label-primary); font:13px/1.5 var(--dsw-font-family); }
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
.dsh-wsl-chat-row-open { border:0; background:transparent; color:inherit; text-align:left; cursor:pointer; display:flex; align-items:center; gap:6px; padding:8px 3px 8px 1px; min-width:0; width:100%; font:inherit; }
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
.dsh-wsl-unified-setting { display:flex; align-items:center; justify-content:space-between; gap:14px; font-size:12px; color:var(--dsw-alias-label-secondary); }
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
`;var H=require("react"),P=require("@deepseek-ai/dsh-client-ui-primitives"),L=require("react/jsx-runtime");function F({size:e=20}){return(0,L.jsxs)("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.35",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:[(0,L.jsx)("rect",{x:"3",y:"4.5",width:"18",height:"15",rx:"3"}),(0,L.jsx)("path",{d:"m7 9 3 3-3 3m6 0h4"})]})}function X({size:e=20}){return(0,L.jsxs)("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.35",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:[(0,L.jsx)("rect",{x:"3",y:"4",width:"18",height:"13",rx:"2.5"}),(0,L.jsx)("path",{d:"M8 21h8m-4-4v4"})]})}function ee({size:e=16}){return(0,L.jsx)("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:(0,L.jsx)("path",{d:"M14 4h6v6m0-6L10 14m0-10H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4"})})}function le({state:e="idle",children:r}){return(0,L.jsxs)("span",{className:"dsh-wsl-badge",children:[(0,L.jsx)(P.StateDot,{state:e,size:e==="ongoing"?12:7}),r]})}function te(e,r=[]){return{distro:e.distro||r.find(t=>t.isDefault)?.name||r[0]?.name||"",user:e.user||"",directory:e.directory||""}}var Je=e=>e.replace(/\/+$/,"").replace(/\/[^/]*$/,"")||"/",Ke=(e,r)=>`${e.replace(/\/+$/,"")}/${r}`;function we(e){return/ENOENT/.test(e.message)?"\u627E\u4E0D\u5230\u8FD9\u4E2A\u6587\u4EF6\u5939\uFF0C\u8BF7\u68C0\u67E5\u8DEF\u5F84\u540E\u91CD\u8BD5\u3002":/EACCES|EPERM/.test(e.message)?"\u5F53\u524D Linux \u7528\u6237\u6CA1\u6709\u6743\u9650\u8BFB\u53D6\u8FD9\u4E2A\u6587\u4EF6\u5939\u3002":/ENOTDIR/.test(e.message)?"\u8FD9\u4E2A\u8DEF\u5F84\u6307\u5411\u6587\u4EF6\uFF0C\u8BF7\u9009\u62E9\u4E00\u4E2A\u6587\u4EF6\u5939\u3002":e.message}function Se({api:e,distro:r,user:t,initialPath:i,onClose:o,onSelect:w}){let[l,a]=(0,H.useState)(null),[f,h]=(0,H.useState)(i),[b,C]=(0,H.useState)(!1),[p,m]=(0,H.useState)(!1),[k,E]=(0,H.useState)(""),W=(0,H.useRef)(0),g=(0,H.useCallback)(async(v,s=0,c=!1)=>{let y=++W.current;m(!0),E("");try{let z=v?null:await e("connect",{distro:r,user:t}),D=await e("browse",{distro:r,user:t,path:v||z.home,offset:s,hidden:c});if(y!==W.current)return;a(O=>({...D,entries:s?[...O?.entries||[],...D.entries]:D.entries})),h(D.path)}catch(z){y===W.current&&E(we(z))}finally{y===W.current&&m(!1)}},[e,r,t]);(0,H.useEffect)(()=>(g(i),()=>{W.current++}),[g,i]);let x=(l?.entries||[]).filter(v=>v.type==="directory"||v.type==="symlink").sort((v,s)=>v.name.localeCompare(s.name,"zh-CN",{numeric:!0})),S=v=>{g(v,0,b)};return(0,L.jsxs)(P.Modal,{open:!0,onClose:o,title:"\u9009\u62E9 Linux \u6587\u4EF6\u5939",closeLabel:"\u5173\u95ED\u6587\u4EF6\u5939\u9009\u62E9",description:`${r} \u4E2D\u7684\u76EE\u5F55\uFF0C\u7528\u4F5C\u63D2\u4EF6\u7684\u9ED8\u8BA4\u5DE5\u4F5C\u76EE\u5F55\u3002`,className:"dsh-wsl-picker",contentClassName:"dsh-wsl-picker-content",footer:(0,L.jsxs)(L.Fragment,{children:[(0,L.jsx)(P.Button,{onClick:o,children:"\u53D6\u6D88"}),(0,L.jsx)(P.Button,{variant:"primary",disabled:p||!l||!!k||f!==l.path,onClick:()=>w(l.path),children:"\u9009\u62E9\u6B64\u6587\u4EF6\u5939"})]}),children:[(0,L.jsxs)("form",{className:"dsh-wsl-pathbar",onSubmit:v=>{v.preventDefault(),S(f)},children:[(0,L.jsx)(P.Button,{variant:"outline",title:"\u8FD4\u56DE\u4E0A\u7EA7","aria-label":"\u8FD4\u56DE\u4E0A\u7EA7",disabled:p||!l||l.path==="/",icon:(0,L.jsx)(P.IconChevronLeftOutlineMedium,{}),onClick:()=>S(Je(l.path))}),(0,L.jsx)(P.Input,{"aria-label":"\u6587\u4EF6\u5939\u8DEF\u5F84","data-modal-autofocus":!0,value:f,onChange:v=>h(v.target.value),spellCheck:!1,className:"dsh-wsl-pathinput",placeholder:"/home"}),(0,L.jsx)(P.Button,{variant:"outline",type:"submit",disabled:p||!f.trim(),children:"\u524D\u5F80"})]}),(0,L.jsxs)("div",{className:"dsh-wsl-folder-meta",children:[(0,L.jsxs)("span",{children:[x.length," \u4E2A\u6587\u4EF6\u5939",l?.nextOffset!=null?" \xB7 \u8FD8\u6709\u66F4\u591A":""]}),(0,L.jsxs)("label",{children:[(0,L.jsx)("input",{type:"checkbox",checked:b,disabled:p,onChange:v=>{let s=v.target.checked;C(s),g(l?.path||f,0,s)}}),"\u663E\u793A\u9690\u85CF\u9879"]})]}),(0,L.jsxs)("div",{className:"dsh-wsl-folder-list","aria-label":"\u6587\u4EF6\u5939\u5217\u8868","aria-busy":p,children:[k&&(0,L.jsxs)("div",{className:"dsh-wsl-inline-error",role:"alert",children:[k,(0,L.jsx)(P.Button,{size:"sm",onClick:()=>S(f),children:"\u91CD\u8BD5"})]}),!k&&x.map(v=>(0,L.jsxs)("button",{type:"button",className:"dsh-wsl-folder",disabled:p,onClick:()=>S(Ke(l.path,v.name)),children:[(0,L.jsx)(P.IconFolderCloseRegular,{size:18}),(0,L.jsx)("span",{children:v.name}),v.type==="symlink"&&(0,L.jsx)("small",{children:"\u94FE\u63A5"}),(0,L.jsx)(P.IconChevronRightOutlineRegular,{size:14})]},v.name)),p&&(0,L.jsxs)("div",{className:"dsh-wsl-empty",role:"status",children:[(0,L.jsx)(P.StateDot,{state:"ongoing"}),"\u6B63\u5728\u8BFB\u53D6\u6587\u4EF6\u5939\u2026"]}),!p&&!k&&!x.length&&(0,L.jsxs)("div",{className:"dsh-wsl-empty",children:[(0,L.jsx)(P.IconFolderOpenOutlineRegular,{size:28}),(0,L.jsx)("span",{children:l?.nextOffset!=null?"\u8FD9\u6279\u6761\u76EE\u4E2D\u6CA1\u6709\u6587\u4EF6\u5939":"\u6B64\u76EE\u5F55\u4E0B\u6CA1\u6709\u53EF\u663E\u793A\u7684\u6587\u4EF6\u5939"})]}),!p&&!k&&l?.nextOffset!=null&&(0,L.jsx)(P.Button,{className:"dsh-wsl-load-more",onClick:()=>g(l.path,l.nextOffset,b),children:"\u52A0\u8F7D\u66F4\u591A"})]}),(0,L.jsxs)("p",{className:"dsh-wsl-picker-hint",children:[l?.path||"\u9009\u62E9\u4E00\u4E2A\u76EE\u5F55",f!==l?.path&&l?" \xB7 \u70B9\u51FB\u201C\u524D\u5F80\u201D\u67E5\u770B\u8F93\u5165\u7684\u8DEF\u5F84":""]})]})}var R=require("react"),N=require("@deepseek-ai/dsh-client-ui-primitives");var J="dsh-app://app";function j(e){return e===J||e===J+"/"?J:V(e)}function de(e){return j(e)===J?"dsh://open":V(e)}function V(e){if(!e)return null;try{let r=new URL(e);return!["http:","https:"].includes(r.protocol)||!["127.0.0.1","localhost","[::1]"].includes(r.hostname)||r.username||r.password||r.search||r.hash||r.pathname!=="/"?null:r.origin}catch{return null}}function G(e){if(!e?.startsWith("#dsh-wsl=")||e.length>16e3)return null;try{let r=JSON.parse(decodeURIComponent(e.slice(9)));return typeof r.id!="string"||r.id.length>100||typeof r.distro!="string"||typeof r.user!="string"||typeof r.directory!="string"||!r.directory.startsWith("/")||/[\x00-\x1f]/.test(r.directory)?null:{id:r.id,distro:r.distro,user:r.user,directory:r.directory,parentOrigin:j(r.parentOrigin),...r.proof?{issuedAt:r.issuedAt,proof:r.proof}:{}}}catch{return null}}var se="dsh-wsl-conversation/1",Z="dsh-wsl-conversation",fe=/^[a-zA-Z0-9-]{32,64}$/,ce=(e,r)=>typeof e=="string"?e.slice(0,r):"";function ge(e){return JSON.stringify([e.distro||"",e.user||""])}function Le(e,r,t){let i=new URL(e),o=G(i.hash);if(!V(i.origin)||!j(t)||!fe.test(r)||!o?.proof||o.parentOrigin!==j(t))throw new Error("\u65E0\u6CD5\u9A8C\u8BC1\u540C\u7A97\u53E3\u5BF9\u8BDD\u7684\u76EE\u6807\u5730\u5740\uFF0C\u8BF7\u91CD\u65B0\u8FDB\u5165 Linux\u3002");let w=JSON.parse(decodeURIComponent(i.hash.slice(9))),l={channel:r,...j(t)===J?{transport:"desktop"}:{}};return i.hash="dsh-wsl="+encodeURIComponent(JSON.stringify({...w,embed:l})),i.href}function Ne(e){let r=G(e);if(!r?.proof||!r.parentOrigin)return null;try{let{embed:t}=JSON.parse(decodeURIComponent(e.slice(9)));return!fe.test(t?.channel||"")||t.transport!==void 0&&(t.transport!=="desktop"||r.parentOrigin!==J)?null:{channel:t.channel,parentOrigin:r.parentOrigin,...t.transport?{transport:t.transport}:{}}}catch{return null}}function pe(e,{origin:r,source:t,channel:i}){return!!t&&e.source===t&&e.origin===r&&!!V(r)&&fe.test(i||"")&&e.data?.protocol===se&&e.data.channel===i&&["catalog","request","result","return","sidebar"].includes(e.data.type)}function ie(e){if(!e||!Array.isArray(e.rows)||e.rows.length>5e3)return null;let r=new Set,t=[];for(let i of e.rows)!i||typeof i.id!="string"||!i.id||i.id.length>200||r.has(i.id)||(r.add(i.id),t.push({id:i.id,title:ce(i.title,500),cwd:ce(i.cwd,4096),workspaceId:ce(i.workspaceId,200),workspaceTitle:ce(i.workspaceTitle,500),running:i.running===!0,blank:i.blank===!0,pinned:i.pinned===!0,archived:i.archived===!0,updatedAt:Number.isFinite(i.updatedAt)?i.updatedAt:0}));return{rows:t,selectedId:t.some(i=>i.id===e.selectedId)?e.selectedId:null,connected:e.connected===!0,phase:e.phase==="ready"?"ready":"loading"}}function ne(e){let r=e.sessions.list.getSnapshot(),t=e.workspaces.list.getSnapshot(),i=new Map;for(let a of t.items||[])for(let f of a.sessionIds)i.set(f,a);let o=new Set(t.archivedSessionIds||[]),w=new Set(t.pinnedSessionIds||[]),l=r.ids.map(a=>r.byId[a]).filter(a=>a&&!a.parentId).slice(0,5e3);return ie({phase:r.phase,connected:e.connection.state.getSnapshot()==="connected",selectedId:l.find(a=>a.retainedBy?.mainView>0)?.id,rows:l.map(a=>({id:a.id,title:a.title||(a.blank?"\u65B0\u5BF9\u8BDD":a.displayTitle),cwd:a.cwd,workspaceId:i.get(a.id)?.workspaceId,workspaceTitle:i.get(a.id)?.title||"",running:a.running,blank:a.blank,updatedAt:a.updatedAt,archived:o.has(a.id),pinned:w.has(a.id)}))})}function We(e,r,{filter:t="all",query:i="",archived:o=!1}={}){let w=(e?.rows||[]).map(a=>({...a,environment:null,key:JSON.stringify(["windows",a.id])}));for(let a of r)for(let f of a.catalog?.rows||[])w.push({...f,environment:a,key:JSON.stringify(["wsl",a.key,f.id])});let l=i.trim().toLocaleLowerCase();return w.filter(a=>a.archived===o&&(t==="all"||t==="wsl"==!!a.environment)&&(!l||[a.title,a.cwd,a.environment?.settings.distro].join(" ").toLocaleLowerCase().includes(l))).sort((a,f)=>Number(f.pinned)-Number(a.pinned)||f.updatedAt-a.updatedAt||a.key.localeCompare(f.key))}var Q="__DSH_WSL_DESKTOP_V1__",Ve=new Set(["refresh","theme","chrome","navigate","pin","unpin","archive","unarchive"]);function Ce(e,r,{waitMs:t=2e4}={}){let i=0,o=0,w=null,l=!1,a,f=[],h=p=>{if(l||p!==e)throw new Error("WSL \u9875\u9762\u901A\u9053\u65E0\u6548\u6216\u5DF2\u5173\u95ED\u3002")},b=p=>({sequence:i,closed:l,catalog:o>p?w:null,signals:f.filter(m=>m.sequence>p)}),C=()=>a?.();return{api:Object.freeze({async request(p,m,k={}){if(h(p),!Ve.has(m)||!k||typeof k!="object"||Array.isArray(k)||JSON.stringify(k).length>131072)throw new Error("WSL \u9875\u9762\u64CD\u4F5C\u65E0\u6548\u3002");try{return await r(m,k),{ok:!0}}catch(E){return{ok:!1,error:String(E?.message||E).slice(0,1e3)}}},next(p,m=0){if(h(p),!Number.isSafeInteger(m)||m<0||m>i)throw new Error("WSL \u9875\u9762\u6E38\u6807\u65E0\u6548\u3002");if(i>m)return Promise.resolve(b(m));if(a)throw new Error("WSL \u9875\u9762\u5DF2\u7ECF\u5B58\u5728\u7B49\u5F85\u4E2D\u7684\u8BA2\u9605\u3002");return new Promise(k=>{let E=()=>{clearTimeout(W),a=null,k(b(m))},W=setTimeout(E,t);a=E})}}),publish(p,m){if(!l){if(p==="catalog")w=m.catalog,o=++i;else if(p==="return"||p==="sidebar")f.push({sequence:++i,type:p}),f.length>16&&f.shift();else return;C()}},dispose(){l=!0,C(),f.length=0,w=null}}}function Oe(e,r,t,i){let o=i.transport==="desktop";if(!o&&window.parent===window||r.guest)return;let w,l="",a=!1,f=new AbortController,h={origin:i.parentOrigin,source:window.parent,channel:i.channel},b=o?Ce(i.channel,k):null;b&&Object.defineProperty(window,Q,{value:b.api,configurable:!0});let C=(g,x={})=>b?b.publish(g,x):h.source.postMessage({protocol:se,channel:i.channel,type:g,...x},h.origin),p=(g=!1)=>{clearTimeout(w),w=setTimeout(()=>{if(a)return;let x=ne(e),S=JSON.stringify(x);(g||S!==l)&&(l=S,C("catalog",{catalog:x}))},50)},m=r.guest={compact:!0,returnWindows(){C("return")},toggleSidebar(){C("sidebar")},publish:p};document.documentElement.setAttribute("data-dsh-wsl-guest","");async function k(g,x={}){if(g==="refresh"){p(!0);return}if(g==="theme"){if(document.body.toggleAttribute("data-ds-dark-theme",x.dark===!0),document.documentElement.style.colorScheme=x.dark===!0?"dark":"light",Array.isArray(x.tokens))for(let[v,s]of x.tokens.slice(0,256))/^--(?:ds|dsw|dsh)-[\w-]+$/.test(v)&&typeof s=="string"&&s.length<500&&document.body.style.setProperty(v,s);return}if(g==="chrome"){m.compact=x.compact!==!1,r.emit();return}if(g==="navigate"){f.abort(),f=new AbortController;let v=f.signal;if(x.sessionId){let s=e.sessions.list.getSnapshot().byId[x.sessionId];if(!s||s.parentId||e.workspaces.list.getSnapshot().archivedSessionIds.includes(s.id))throw new Error("\u8FD9\u6761 WSL \u5BF9\u8BDD\u5DF2\u5F52\u6863\u6216\u4E0D\u5728\u5F53\u524D\u73AF\u5883\u4E2D\uFF0C\u8BF7\u5237\u65B0\u5217\u8868\u3002");e.uiWorkspace.openSession(s.id)}else{if(!x.handoff)throw new Error("\u7F3A\u5C11\u5DF2\u9A8C\u8BC1\u7684\u5DE5\u4F5C\u533A\u4FE1\u606F\u3002");let s=await t("environment/adopt",x.handoff);if(v.aborted)return;if(x.create){let c=await e.workspaces.create({path:s.settings.directory});if(v.aborted)return;let y=await e.sessions.create({workspaceId:c.workspaceId});v.aborted||e.uiWorkspace.openSession(y)}else await re(e,s.settings.directory,v)}p(!0);return}let S={pin:"pinSession",unpin:"unpinSession",archive:"archiveSession",unarchive:"unarchiveSession"};if(!S[g]||!e.sessions.list.getSnapshot().byId[x.sessionId])throw new Error("\u5BF9\u8BDD\u64CD\u4F5C\u65E0\u6548\u3002");await e.uiWorkspace[S[g]](x.sessionId),p(!0)}let E=g=>{if(!pe(g,h)||g.data.type!=="request")return;let{id:x,action:S,payload:v}=g.data;typeof x!="string"||x.length>100||typeof S!="string"||k(S,v).then(()=>C("result",{id:x,ok:!0}),s=>C("result",{id:x,ok:!1,error:String(s.message).slice(0,1e3)}))};o||window.addEventListener("message",E);let W=[e.sessions.list.subscribe(()=>p()),e.workspaces.list.subscribe(()=>p()),e.connection.state.subscribe(()=>p())];p(!0),r.emit(),m.dispose=()=>{a=!0,f.abort(),clearTimeout(w),window.removeEventListener("message",E),b?.dispose(),b&&window[Q]===b.api&&delete window[Q];for(let g of W)g();document.documentElement.removeAttribute("data-dsh-wsl-guest")}}var me="dsh-wsl-native:";function $(e,r,t=sessionStorage){try{if(r===void 0)return JSON.parse(t.getItem(me+e)||"null");r===null?t.removeItem(me+e):t.setItem(me+e,JSON.stringify(r))}catch{}return null}function Ie(e,r){return e.getSnapshot().phase==="ready"?Promise.resolve():new Promise((t,i)=>{let o=()=>{},w,l=f=>{o(),clearTimeout(w),r?.removeEventListener("abort",a),f?i(f):t()},a=()=>l(new Error("\u5DE5\u4F5C\u533A\u6253\u5F00\u5DF2\u53D6\u6D88\u3002"));o=e.subscribe(()=>{e.getSnapshot().phase==="ready"&&l()}),w=setTimeout(()=>l(new Error("DSH \u5DE5\u4F5C\u533A\u4ECD\u5728\u52A0\u8F7D\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002")),3e4),r?.addEventListener("abort",a,{once:!0}),r?.aborted?a():e.getSnapshot().phase==="ready"&&l()})}async function re(e,r,t){if(await Promise.all([Ie(e.workspaces.list,t),Ie(e.sessions.list,t)]),t?.aborted)return!1;let i=e.layout.beginNavigation(),o=await e.workspaces.create({path:r});if(await e.sessions.refresh(),t?.aborted||i.aborted)return!1;let{byId:w}=e.sessions.list.getSnapshot(),l=e.workspaces.list.getSnapshot().archivedSessionIds,a=o.sessionIds.map(b=>w[b]).filter(b=>b&&!b.parentId&&!l.includes(b.id)&&b.cwd===o.path),f=$("selection",void 0,localStorage)?.[o.path],h=a.find(b=>b.id===f)??a.sort((b,C)=>C.updatedAt-b.updatedAt)[0];return h?e.uiWorkspace.openSession(h.id):await e.uiWorkspace.openWorkspace(o.workspaceId),!0}function Ee(e,r){let t=new Set,i,o=!1,w=!1,l,a={state:null,error:null,draft:null,pending:$("pending"),popup:null,parentOrigin:j($("parentOrigin")),readyLink:null,subscribe(p){return t.add(p),()=>t.delete(p)},emit(){if(!o)for(let p of t)p()},async refresh(){return i||(i=r("status").then(p=>(o||(a.state=p,a.error=null,a.parentOrigin||=p.parentOrigin,a.emit()),p)).catch(p=>{throw a.error=p.message,a.emit(),p}).finally(()=>{i=null}),i)},setPending(p){a.pending=p,$("pending",p),a.emit()},remember(){let p=e.sessions.list.getSnapshot(),m=p.ids.map(W=>p.byId[W]).find(W=>W?.retainedBy?.mainView>0&&W.cwd&&!W.parentId);if(!m||l===m.id)return;l=m.id;let k=$("selection",void 0,localStorage)||{},E=Object.fromEntries([[m.cwd,m.id],...Object.entries(k).filter(([W])=>W!==m.cwd)].slice(0,64));$("selection",E,localStorage)},async adopt(){let p=G(window.location.hash),m=Ne(window.location.hash);if(!(!p||w||$("arrived")===p.id&&!m)){w=!0;try{let k=a.state||await a.refresh();if(k.mode!=="wsl-host"||!k.distros.some(W=>W.name===p.distro))throw new Error("\u76EE\u6807 DSH \u4E0E\u9009\u5B9A\u7684 Linux \u73AF\u5883\u4E0D\u4E00\u81F4\u3002");let E=await r("environment/adopt",p);p.parentOrigin&&(a.parentOrigin=p.parentOrigin,$("parentOrigin",p.parentOrigin)),await re(e,E.settings.directory,f.signal)&&($("arrived",p.id),m&&Oe(e,a,r,m),history.replaceState(history.state,"",window.location.pathname+window.location.search),await a.refresh())}catch(k){a.error=k.message,a.emit(),o||e.layout.selectPanel("dsh-wsl-native")}finally{w=!1}}}},f=new AbortController,h=()=>{a.refresh().then(()=>a.adopt()).catch(()=>{})},b=e.on("connection/reset",h),C=e.sessions.list.subscribe(()=>a.remember());return window.addEventListener("hashchange",a.adopt),window.addEventListener("focus",h),h(),a.dispose=()=>{o=!0,a.guest?.dispose(),a.conversations?.dispose(),f.abort(),b(),C(),window.removeEventListener("hashchange",a.adopt),window.removeEventListener("focus",h),t.clear()},a}var n=require("react/jsx-runtime");function K(e){let[,r]=(0,R.useState)(0);return(0,R.useEffect)(()=>e.subscribe(()=>r(t=>t+1)),[e]),e.state}function ze({model:e,ctx:r}){let i=K(e)?.mode==="wsl-host";return(0,n.jsx)(N.Button,{variant:"ghost",icon:i?(0,n.jsx)(F,{size:18}):(0,n.jsx)(X,{size:18}),title:i&&e.parentOrigin?"\u8FD4\u56DE Windows DSH \xB7 Linux \u4FDD\u6301\u8FD0\u884C":"\u7BA1\u7406 Windows \u4E0E Linux \u73AF\u5883","aria-label":i&&e.parentOrigin?"\u8FD4\u56DE Windows DSH":"\u7BA1\u7406 Windows \u4E0E Linux \u73AF\u5883",onClick:()=>{e.guest?e.guest.returnWindows():i&&e.parentOrigin?window.location.assign(de(e.parentOrigin)):r.layout.selectPanel("dsh-wsl-native")}})}function Ae({api:e,ctx:r,model:t}){let i=K(t),[o,w]=(0,R.useState)(t.draft),[l,a]=(0,R.useState)(""),[f,h]=(0,R.useState)(null),[b,C]=(0,R.useState)(!1),[p,m]=(0,R.useState)(null),k=(0,R.useRef)(!1),E=(0,R.useRef)(!0),W=(0,R.useCallback)(()=>t.refresh(),[t]);(0,R.useEffect)(()=>(E.current=!0,W().catch(()=>{}),()=>{E.current=!1}),[W]),(0,R.useEffect)(()=>{i&&!o&&w(te(i.settings,i.distros))},[i,o]),(0,R.useEffect)(()=>{t.draft=o},[o,t]),(0,R.useEffect)(()=>{let u=t.pending;if(!u)return;let A=i?.handoffs?.find(T=>T.id===u.id);A?.state==="ready"?(t.remember(),t.readyLink=A.url,t.setPending(null),u.mode==="same"?(t.conversations.setUnified(!0),t.conversations.adopt(A).catch(T=>{t.error=T.message,t.emit()})):t.popup&&!t.popup.closed?(t.popup.location.replace(A.url),t.popup=null,h({text:"Linux \u5DF2\u5728\u65B0\u7A97\u53E3\u6253\u5F00\uFF0C\u4E24\u8FB9\u53EF\u4EE5\u540C\u65F6\u4F7F\u7528\u3002"})):h({text:"Linux \u5DF2\u5C31\u7EEA\u3002\u70B9\u51FB\u201C\u65B0\u7A97\u53E3\u6253\u5F00\u201D\u5373\u53EF\u4E0E Windows \u540C\u65F6\u4F7F\u7528\u3002"})):A?.state==="failed"?(t.popup?.close(),t.popup=null,t.setPending(null),h({error:!0,text:A.error})):i&&!A&&(t.setPending(null),h({error:!0,text:"\u542F\u52A8\u5668\u5DF2\u91CD\u65B0\u8FDE\u63A5\uFF0C\u8BF7\u91CD\u65B0\u8FDB\u5165 Linux \u73AF\u5883\u3002"}))},[i,t,t.pending]),(0,R.useEffect)(()=>{let u=i?.native?.instances?.some(T=>T.preparing||T.starting);if(!t.pending&&!u)return;let A=setTimeout(()=>{W().catch(()=>{})},700);return()=>clearTimeout(A)},[i,t,t.pending,W]);async function g(u,A){if(!k.current){k.current=!0,a(u),h(null),t.error=null;try{await A()}catch(T){E.current&&h({error:!0,text:we(T)})}finally{try{await W()}catch{}k.current=!1,E.current&&a("")}}}function x(u,A){w(T=>({...T,[u]:A})),h(null)}let S=()=>({distro:o.distro,user:o.user.trim(),directory:o.directory.trim()});async function v(u,A="\u5DE5\u4F5C\u73AF\u5883\u5DF2\u8FDE\u63A5\uFF0C\u76EE\u5F55\u5DF2\u8BB0\u4F4F\u3002"){let T=await e("environment/switch",u);return E.current&&(w(te(T.settings,i.distros)),h({text:A})),T}function s(u=!1){k.current||t.pending||(u&&(t.popup=window.open("about:blank","_blank"),t.popup&&(t.popup.opener=null,t.popup.document.title="\u6B63\u5728\u51C6\u5907 Linux DSH",t.popup.document.body.textContent="\u6B63\u5728\u51C6\u5907 Linux DSH\uFF0C\u5B8C\u6210\u540E\u4F1A\u81EA\u52A8\u8FDB\u5165\u3002Windows DSH \u53EF\u4EE5\u7EE7\u7EED\u4F7F\u7528\u3002",t.popup.document.body.style.cssText="font:14px/1.7 system-ui;padding:48px;max-width:560px;margin:auto;color:#666;background:#fafafa")),g("enter",async()=>{try{t.remember();let A=await e("native/enter",{...S(),parentOrigin:j(window.location.origin)});w(te(A.settings,i.distros)),await W(),t.setPending({id:A.id,mode:u?"new":"same"})}catch(A){throw t.popup?.close(),t.popup=null,A}}))}if(!i||!o)return(0,n.jsxs)("div",{className:"dsh-wsl-page",children:[(0,n.jsx)("header",{className:"dsh-wsl-heading",children:(0,n.jsxs)("div",{children:[(0,n.jsx)("h1",{children:"WSL \u4E0E Windows"}),(0,n.jsx)("p",{children:"\u5728\u540C\u4E00\u7A97\u53E3\u4F7F\u7528\u4E24\u5957\u73AF\u5883\uFF0CWSL \u5BF9\u8BDD\u4F1A\u663E\u793A\u6807\u5FD7\u3002"})]})}),(0,n.jsxs)("div",{className:"dsh-wsl-empty",role:t.error?"alert":"status",children:[t.error||(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(N.StateDot,{state:"ongoing"}),"\u6B63\u5728\u8BFB\u53D6\u73AF\u5883\u2026"]}),t.error&&(0,n.jsx)(N.Button,{onClick:()=>g("refresh",async()=>{}),children:"\u91CD\u65B0\u8FDE\u63A5"})]})]});let c=i.mode==="wsl-host",y=i.mode!=="unsupported",z=te(i.settings,i.distros),D=["distro","user","directory"].some(u=>o[u].trim()!==z[u]),O=i.native||{},q=O.running,_=t.pending&&i.handoffs?.find(u=>u.id===t.pending.id),U=!!(O.preparing||O.starting||t.pending),M=!!l||!!t.pending||!y,ae=i.profiles?.find(u=>u.distro===o.distro&&u.user===o.user.trim()),Y=i.pool.connections.find(u=>u.connected&&u.target[0]==="wsl"&&u.target[1]===o.distro&&(u.target[2]===o.user.trim()||u.info?.user===o.user.trim())),Re=i.pool.connections.some(u=>u.connected&&u.target[0]==="windows"),oe=f?.error&&f.text||t.error||i.error||!y&&"\u5F53\u524D\u73AF\u5883\u4E0D\u652F\u6301 WSL\uFF0C\u8BF7\u5728 Windows \u6216 WSL \u4E2D\u4F7F\u7528\u3002",xe=oe||f?.text,ye=q?.openUrl||null,Te=_?.state==="starting"||O.starting?"\u6B63\u5728\u542F\u52A8 DSH\uFF0C\u5E76\u7B49\u5F85 Windows \u8FDE\u63A5\u2026":O.progress?.text||"\u6B63\u5728\u8FDE\u63A5 Linux \u5DE5\u4F5C\u73AF\u5883\u2026";return(0,n.jsxs)("div",{className:"dsh-wsl-page",children:[(0,n.jsxs)("header",{className:"dsh-wsl-heading",children:[(0,n.jsxs)("div",{children:[(0,n.jsx)("h1",{children:"WSL \u4E0E Windows"}),(0,n.jsx)("p",{children:"\u5728\u540C\u4E00\u7A97\u53E3\u4F7F\u7528\u4E24\u5957\u73AF\u5883\uFF0CWSL \u5BF9\u8BDD\u4F1A\u663E\u793A\u6807\u5FD7\u3002"})]}),(0,n.jsx)(N.Button,{variant:"ghost",icon:(0,n.jsx)(N.IconRefreshOutlineRegular,{}),title:"\u5237\u65B0\u72B6\u6001","aria-label":"\u5237\u65B0\u72B6\u6001",disabled:!!l,onClick:()=>g("refresh",async()=>{})})]}),!c&&(0,n.jsxs)("div",{className:"dsh-wsl-unified-setting",children:[(0,n.jsx)("span",{children:"Windows \u4E0E WSL \u5BF9\u8BDD\u663E\u793A\u5728\u540C\u4E00\u4E2A\u5217\u8868\uFF0C\u5207\u6362\u5BF9\u8BDD\u5373\u53EF\u5207\u6362\u73AF\u5883\u3002"}),(0,n.jsx)(N.Button,{variant:"ghost",onClick:()=>t.conversations.setUnified(!t.conversations.unified),children:t.conversations.unified?"\u4F7F\u7528\u539F\u751F\u5DE5\u4F5C\u533A\u5217\u8868":"\u542F\u7528\u540C\u7A97\u53E3\u5BF9\u8BDD\u5217\u8868"})]}),xe&&(0,n.jsxs)("div",{className:`dsh-wsl-notice ${oe?"is-error":""}`,role:oe?"alert":"status",children:[(0,n.jsx)(N.StateDot,{state:oe?"error":"done"}),(0,n.jsx)("span",{children:xe})]}),(0,n.jsxs)("section",{className:"dsh-wsl-section","aria-labelledby":"dsh-wsl-host-title",children:[(0,n.jsxs)("div",{className:"dsh-wsl-section-heading",children:[(0,n.jsx)("h2",{id:"dsh-wsl-host-title",children:"\u8FD0\u884C\u73AF\u5883"}),(0,n.jsx)("span",{className:"dsh-wsl-caption",children:"\u5207\u6362\u65F6\u4FDD\u7559\u4E24\u8FB9\u7684\u4EFB\u52A1"})]}),(0,n.jsxs)("div",{className:"dsh-wsl-host-grid",children:[(0,n.jsxs)("article",{className:`dsh-wsl-card dsh-wsl-host-card ${c?"":"is-current"}`,children:[(0,n.jsxs)("div",{className:"dsh-wsl-host-head",children:[(0,n.jsx)(X,{size:23}),(0,n.jsx)(le,{state:c?"idle":"done",children:c?"\u72EC\u7ACB\u8FD0\u884C":"\u5F53\u524D\u73AF\u5883"})]}),(0,n.jsx)("h3",{children:"Windows DSH"}),(0,n.jsxs)("p",{children:["PowerShell\u3001Windows \u6587\u4EF6\u548C\u5E94\u7528\u3002",(0,n.jsx)("br",{}),"\u4FDD\u7559 Windows \u4E2D\u7684\u5DE5\u4F5C\u533A\u4E0E\u4F1A\u8BDD\u3002"]}),(0,n.jsx)("div",{className:"dsh-wsl-host-actions",children:c?t.parentOrigin?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(N.Button,{variant:"outline",icon:(0,n.jsx)(X,{size:16}),onClick:()=>{t.remember(),t.guest?t.guest.returnWindows():window.location.assign(de(t.parentOrigin))},children:"\u5207\u6362\u5230 Windows"}),(0,n.jsxs)("a",{className:"dsh-wsl-text-link",href:de(t.parentOrigin),target:"_blank",rel:"noopener noreferrer",children:["\u65B0\u7A97\u53E3\u6253\u5F00",(0,n.jsx)(ee,{})]})]}):(0,n.jsx)("span",{className:"dsh-wsl-caption",children:"\u4ECE Windows DSH \u8FDB\u5165\u540E\uFF0C\u53EF\u5728\u8FD9\u91CC\u4E00\u952E\u8FD4\u56DE\u3002"}):(0,n.jsx)(N.Button,{variant:"outline",onClick:()=>r.layout.selectPanel(null),children:"\u7EE7\u7EED Windows \u4F1A\u8BDD"})})]}),(0,n.jsxs)("article",{className:`dsh-wsl-card dsh-wsl-host-card ${c?"is-current":""}`,children:[(0,n.jsxs)("div",{className:"dsh-wsl-host-head",children:[(0,n.jsx)(F,{size:23}),(0,n.jsx)(le,{state:c||q?"done":U?"ongoing":"idle",children:c?"\u5F53\u524D\u73AF\u5883":q?"\u5DF2\u5C31\u7EEA":U?"\u51C6\u5907\u4E2D":"\u6309\u9700\u542F\u52A8"})]}),(0,n.jsxs)("h3",{children:["Linux DSH ",(0,n.jsx)("span",{children:o.distro||"WSL"})]}),(0,n.jsxs)("p",{children:["DSH\u3001\u7EC8\u7AEF\u548C\u9879\u76EE\u90FD\u5728 Linux \u4E2D\u8FD0\u884C\u3002",(0,n.jsx)("br",{}),"Linux \u539F\u751F\u5DE5\u5177\uFF0C\u968F\u65F6\u8BBF\u95EE Windows\u3002"]}),(0,n.jsx)("div",{className:"dsh-wsl-host-actions",children:c?(0,n.jsx)(N.Button,{variant:"outline",onClick:()=>g("workspace",async()=>{let u=await v(S());await re(r,u.settings.directory)}),children:"\u7EE7\u7EED Linux \u4F1A\u8BDD"}):(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(N.Button,{variant:"primary",icon:U?(0,n.jsx)(N.StateDot,{state:"ongoing"}):(0,n.jsx)(F,{size:16}),disabled:M||!o.distro||U,onClick:()=>s(!1),children:U?"\u6B63\u5728\u51C6\u5907\u2026":q?"\u6253\u5F00 WSL \u5BF9\u8BDD":"\u5F00\u59CB WSL \u5BF9\u8BDD"}),ye&&!D?(0,n.jsxs)("a",{className:"dsh-wsl-text-link",href:ye,target:"_blank",rel:"noopener noreferrer",children:["\u65B0\u7A97\u53E3\u6253\u5F00",(0,n.jsx)(ee,{})]}):(0,n.jsx)(N.Button,{variant:"ghost",disabled:M||!o.distro||U,icon:(0,n.jsx)(ee,{}),onClick:()=>s(!0),children:"\u540C\u65F6\u6253\u5F00"})]})})]})]}),U&&(0,n.jsxs)("div",{className:"dsh-wsl-native-status",role:"status",children:[(0,n.jsx)(N.StateDot,{state:"ongoing"}),(0,n.jsx)("span",{children:Te})]}),!c&&!U&&(0,n.jsx)("p",{className:"dsh-wsl-section-note",children:"WSL \u5BF9\u8BDD\u76F4\u63A5\u5728\u5F53\u524D\u7A97\u53E3\u6253\u5F00\uFF0C\u5E76\u663E\u793A WSL \u6807\u5FD7\uFF1B\u4E24\u8FB9\u7684\u4EFB\u52A1\u7EE7\u7EED\u8FD0\u884C\u3002"})]}),(0,n.jsxs)("section",{className:"dsh-wsl-section","aria-labelledby":"dsh-wsl-connection-title",children:[(0,n.jsxs)("div",{className:"dsh-wsl-section-heading",children:[(0,n.jsx)("h2",{id:"dsh-wsl-connection-title",children:"Linux \u5DE5\u4F5C\u76EE\u5F55"}),(0,n.jsx)(le,{state:Y?"done":"idle",children:Y?"\u8FDE\u63A5\u5DF2\u5C31\u7EEA":"\u6309\u9700\u8FDE\u63A5"})]}),(0,n.jsx)("div",{className:"dsh-wsl-card",children:(0,n.jsxs)("form",{onSubmit:u=>{u.preventDefault(),M||g("connect",()=>v(S()))},children:[(0,n.jsxs)("div",{className:"dsh-wsl-fields",children:[(0,n.jsxs)("div",{className:"dsh-wsl-field",children:[(0,n.jsx)("label",{htmlFor:"dsh-wsl-distro",children:"WSL \u53D1\u884C\u7248"}),(0,n.jsxs)("div",{className:"dsh-wsl-select-wrap",children:[(0,n.jsxs)("select",{id:"dsh-wsl-distro",value:o.distro,disabled:M||c,onChange:u=>{let A=u.target.value,T=i.profiles?.find(je=>je.distro===A);g("switch",async()=>{await v({distro:A,user:T?.user||"",...T?.directory?{directory:T.directory}:{}},"\u5DF2\u5207\u6362\u8FDE\u63A5\uFF0C\u539F\u73AF\u5883\u7684\u4EFB\u52A1\u7EE7\u7EED\u8FD0\u884C\u3002")})},children:[!i.distros.length&&(0,n.jsx)("option",{value:"",children:"\u672A\u53D1\u73B0\u53D1\u884C\u7248"}),i.distros.map(u=>(0,n.jsxs)("option",{value:u.name,children:[u.name,u.isDefault?"\uFF08\u9ED8\u8BA4\uFF09":""]},u.name))]}),(0,n.jsx)(N.IconChevronDownOutlineRegular,{size:14})]}),(0,n.jsx)("p",{children:o.user?`\u7528\u6237 ${o.user}`:"\u4F7F\u7528\u53D1\u884C\u7248\u7684\u9ED8\u8BA4\u7528\u6237"})]}),(0,n.jsxs)("div",{className:"dsh-wsl-field",children:[(0,n.jsx)("label",{htmlFor:"dsh-wsl-directory",children:"\u5DE5\u4F5C\u76EE\u5F55"}),(0,n.jsxs)("div",{className:"dsh-wsl-directory-row",children:[(0,n.jsx)(N.Input,{id:"dsh-wsl-directory",className:"dsh-wsl-directory-input",value:o.directory,disabled:M,onChange:u=>x("directory",u.target.value),placeholder:"Linux\u3001Windows \u6216 WSL \u8DEF\u5F84",autoComplete:"off",spellCheck:!1}),(0,n.jsx)(N.Button,{variant:"outline",icon:(0,n.jsx)(N.IconFolderOpenOutlineRegular,{}),disabled:M||!o.distro,onClick:()=>C(!0),children:"\u6D4F\u89C8"})]}),(0,n.jsx)("p",{children:ae?.storage==="windows-mount"?"\u8FD9\u662F Windows \u6302\u8F7D\u76EE\u5F55\u3002\u4F9D\u8D56\u5B89\u88C5\u548C\u9891\u7E41\u6784\u5EFA\u5EFA\u8BAE\u4F7F\u7528 Linux \u4E3B\u76EE\u5F55\u3002":ae?.storage==="linux"?"Linux \u6587\u4EF6\u7CFB\u7EDF \xB7 \u9002\u5408\u4F9D\u8D56\u5B89\u88C5\u3001Git \u548C\u9891\u7E41\u6784\u5EFA":"\u652F\u6301\u7C98\u8D34 Windows \u8DEF\u5F84\uFF1B\u8FDE\u63A5\u540E\u81EA\u52A8\u8F6C\u6362\u5E76\u8BB0\u4F4F\u3002"})]})]}),!!ae?.recentDirectories?.length&&(0,n.jsxs)("div",{className:"dsh-wsl-recents","aria-label":"\u6700\u8FD1\u4F7F\u7528\u7684\u76EE\u5F55",children:[(0,n.jsx)("span",{children:"\u6700\u8FD1"}),ae.recentDirectories.slice(0,5).map(u=>(0,n.jsxs)("button",{type:"button",title:u,"aria-label":`\u4F7F\u7528\u76EE\u5F55 ${u}`,className:u===o.directory?"is-selected":"",disabled:M,onClick:()=>g("directory",()=>v({...S(),directory:u})),children:[(0,n.jsx)(N.IconFolderOpenOutlineRegular,{size:14}),(0,n.jsx)("span",{children:u==="/"?"/":u.split("/").filter(Boolean).pop()})]},u))]}),!c&&(0,n.jsxs)("details",{className:"dsh-wsl-advanced",children:[(0,n.jsxs)("summary",{children:["\u9AD8\u7EA7\u8BBE\u7F6E",(0,n.jsx)(N.IconChevronDownOutlineRegular,{size:12})]}),(0,n.jsxs)("div",{className:"dsh-wsl-user-field",children:[(0,n.jsx)("label",{htmlFor:"dsh-wsl-user",children:"Linux \u7528\u6237"}),(0,n.jsx)(N.Input,{id:"dsh-wsl-user",value:o.user,disabled:M,placeholder:"\u9ED8\u8BA4\u7528\u6237",autoComplete:"off",onChange:u=>{x("user",u.target.value),x("directory","")}}),(0,n.jsx)("p",{children:"\u6BCF\u4E2A\u7528\u6237\u72EC\u7ACB\u8BB0\u5FC6\u76EE\u5F55\uFF1B\u5207\u6362\u4E0D\u4F1A\u505C\u6B62\u5176\u4ED6\u7528\u6237\u7684\u4EFB\u52A1\u3002"})]})]}),(0,n.jsxs)("div",{className:"dsh-wsl-card-actions",children:[(0,n.jsxs)("div",{className:"dsh-wsl-action-primary",children:[(0,n.jsx)(N.Button,{variant:"outline",type:"submit",disabled:M||!o.distro,icon:l==="connect"||l==="switch"?(0,n.jsx)(N.StateDot,{state:"ongoing"}):void 0,children:l==="connect"?"\u6B63\u5728\u8FDE\u63A5\u2026":D?"\u5E94\u7528\u5DE5\u4F5C\u76EE\u5F55":"\u8FDE\u63A5 WSL"}),c&&(0,n.jsx)(N.Button,{variant:"ghost",disabled:M,onClick:()=>g("windows",async()=>{await e("connect",{target:"windows"}),h({text:"Windows \u4E92\u64CD\u4F5C\u5DF2\u5C31\u7EEA\u3002"})}),children:Re?"Windows \u5DF2\u8FDE\u63A5":"\u8FDE\u63A5 Windows"})]}),(0,n.jsx)(N.Button,{variant:"ghost",icon:(0,n.jsx)(ee,{}),disabled:M||!o.directory.trim(),onClick:()=>g("open",async()=>{let u=await e("open",{path:o.directory.trim(),distro:o.distro,user:o.user});if(u.exitCode!==0)throw new Error(u.stderr||"Windows \u65E0\u6CD5\u6253\u5F00\u6B64\u76EE\u5F55\u3002");h({text:"\u5DF2\u5728 Windows \u4E2D\u6253\u5F00\u5DE5\u4F5C\u76EE\u5F55\u3002"})}),children:"\u5728 Windows \u4E2D\u6253\u5F00"})]})]})})]}),(0,n.jsxs)("div",{className:"dsh-wsl-help",children:[(0,n.jsx)(N.IconFolderOpenOutlineRegular,{size:18}),(0,n.jsx)("p",{children:c?"\u5F53\u524D\u4F1A\u8BDD\u4F7F\u7528 Linux \u539F\u751F\u5DE5\u5177\u3002\u9700\u8981 Windows \u6587\u4EF6\u3001PowerShell \u6216\u526A\u8D34\u677F\u65F6\uFF0C\u53EF\u4EE5\u76F4\u63A5\u5728\u5BF9\u8BDD\u4E2D\u63D0\u51FA\u3002":"Windows \u4F1A\u8BDD\u7EE7\u7EED\u4F7F\u7528\u539F\u751F Windows \u5DE5\u5177\uFF1B\u4E5F\u80FD\u901A\u8FC7\u63D2\u4EF6\u76F4\u63A5\u6267\u884C Linux \u547D\u4EE4\u6216\u53CC\u5411\u590D\u5236\u6587\u4EF6\u3002\u5B8C\u6574 Linux \u5DE5\u4F5C\u6D41\u53EF\u4ECE\u4E0A\u65B9\u8FDB\u5165\u3002"})]}),(0,n.jsxs)("details",{className:"dsh-wsl-diagnostics",children:[(0,n.jsxs)("summary",{children:["\u8FD0\u884C\u4E0E\u8FDE\u63A5\u7BA1\u7406",(0,n.jsx)(N.IconChevronDownOutlineRegular,{size:12})]}),(0,n.jsxs)("div",{className:"dsh-wsl-diagnostics-body",children:[(0,n.jsxs)("dl",{children:[(0,n.jsxs)("div",{children:[(0,n.jsx)("dt",{children:"\u5F53\u524D\u5BBF\u4E3B"}),(0,n.jsx)("dd",{children:c?"Linux / WSL":"Windows"})]}),(0,n.jsxs)("div",{children:[(0,n.jsx)("dt",{children:"\u63D2\u4EF6\u7248\u672C"}),(0,n.jsx)("dd",{children:i.version})]}),(0,n.jsxs)("div",{children:[(0,n.jsx)("dt",{children:"\u6D3B\u52A8\u8FDE\u63A5"}),(0,n.jsx)("dd",{children:i.pool.connections.filter(u=>u.connected).length})]}),Y&&(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)("div",{children:[(0,n.jsx)("dt",{children:"Linux Node.js"}),(0,n.jsx)("dd",{children:Y.info?.node})]}),(0,n.jsxs)("div",{children:[(0,n.jsx)("dt",{children:"Linux \u4E3B\u76EE\u5F55"}),(0,n.jsx)("dd",{children:Y.info?.home})]})]})]}),O.instances?.filter(u=>u.running).map(u=>(0,n.jsxs)("div",{className:"dsh-wsl-runtime-row",children:[(0,n.jsxs)("div",{children:[(0,n.jsx)("strong",{children:u.settings.distro}),(0,n.jsxs)("span",{children:[u.settings.user," \xB7 Linux DSH \u8FD0\u884C\u4E2D"]})]}),(0,n.jsx)(N.Button,{variant:"outline",disabled:M||u.preparing||u.starting,onClick:()=>m({kind:"stop",settings:u.settings}),children:"\u505C\u6B62\u6B64\u73AF\u5883"})]},`${u.settings.distro}/${u.settings.user}`)),!c&&(0,n.jsxs)("div",{className:"dsh-wsl-runtime-row",children:[(0,n.jsx)("p",{children:"\u9700\u8981\u9884\u5148\u4E0B\u8F7D\uFF0C\u6216\u66F4\u65B0\u505C\u6B62\u4E2D\u7684 Linux \u73AF\u5883\u65F6\u4F7F\u7528\u3002"}),(0,n.jsx)(N.Button,{variant:"outline",disabled:M||U||!!q||!o.distro,onClick:()=>g("prepare",async()=>{await e("native/prepare",S())}),children:"\u51C6\u5907\u73AF\u5883"})]}),(0,n.jsxs)("div",{className:"dsh-wsl-disconnect-row",children:[(0,n.jsx)("p",{children:"\u65AD\u5F00\u4F1A\u7ED3\u675F\u6865\u63A5\u8FDE\u63A5\u548C\u540E\u53F0\u4EFB\u52A1\u3002\u65E5\u5E38\u5207\u6362\u65E0\u9700\u65AD\u5F00\u3002"}),(0,n.jsx)(N.Button,{variant:"outline",disabled:M||U||!i.pool.connections.length,onClick:()=>m({kind:"disconnect"}),children:"\u65AD\u5F00\u5168\u90E8\u8FDE\u63A5"})]})]})]}),b&&(0,n.jsx)(Se,{api:e,distro:o.distro,user:o.user,initialPath:o.directory.trim(),onClose:()=>C(!1),onSelect:u=>{C(!1),g("directory",()=>v({...S(),directory:u}))}}),(0,n.jsx)(N.Modal,{open:!!p,onClose:()=>m(null),title:p?.kind==="stop"?"\u505C\u6B62\u8FD9\u4E2A Linux \u73AF\u5883\uFF1F":"\u65AD\u5F00\u5168\u90E8\u8FDE\u63A5\uFF1F",closeLabel:"\u5173\u95ED",description:p?.kind==="stop"?"\u8BE5 Linux DSH \u4E2D\u7684\u4EFB\u52A1\u4F1A\u505C\u6B62\uFF0C\u5176\u4ED6\u73AF\u5883\u7EE7\u7EED\u8FD0\u884C\u3002\u5DF2\u4FDD\u5B58\u7684\u6587\u4EF6\u548C\u4F1A\u8BDD\u4F1A\u4FDD\u7559\u3002":"\u5168\u90E8\u6865\u63A5\u4EFB\u52A1\u548C\u672C\u63D2\u4EF6\u542F\u52A8\u7684 Linux DSH \u4F1A\u505C\u6B62\u3002Windows DSH \u548C\u5DF2\u4FDD\u5B58\u7684\u6587\u4EF6\u4FDD\u7559\u3002",footer:(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(N.Button,{onClick:()=>m(null),children:"\u53D6\u6D88"}),(0,n.jsx)(N.Button,{variant:"primary",onClick:()=>{let u=p;m(null),g("stop",async()=>{await e(u.kind==="stop"?"native/stop":"disconnect",u.settings||{}),t.readyLink=null,h({text:u.kind==="stop"?"\u8BE5 Linux \u73AF\u5883\u5DF2\u505C\u6B62\u3002":"\u6865\u63A5\u8FDE\u63A5\u5DF2\u65AD\u5F00\u3002"})})},children:"\u786E\u8BA4\u505C\u6B62"})]})})]})}function Pe(e,r,t){let i=new Map,o=new Map,w=new AbortController,l=0,a,f,h={entries:i,activeKey:null,error:null,busy:!1,anchor:null,unified:$("unified-conversations",void 0,localStorage)!==!1,nativeCatalog:()=>ne(e),visible:()=>e.layout.panelInfo.getSnapshot().activePanelId===Z,changed(){t.emit()},setUnified(s){h.unified=s,$("unified-conversations",s,localStorage),t.emit()},setAnchor(s){h.anchor=s,t.emit()},showWindows(s){l++,h.error=null,s?e.uiWorkspace.openSession(s):e.layout.selectPanel(null),t.emit()},async openRow(s){if(!s.environment)return h.showWindows(s.id);let c=i.get(s.environment.key);if(!c?.ready)return h.enter(c.settings,{sessionId:s.id});l++,h.activeKey=c.key,h.error=null,e.layout.selectPanel(Z),t.emit();try{await m(c,{sessionId:s.id})}catch(y){h.error=y.message,t.emit()}},async enter(s,c={}){if(h.busy)return;let y=++l;h.busy=!0,h.error=null,t.emit();try{let z=await r("native/enter",{...s,parentOrigin:j(location.origin)}),D,O=Date.now()+600*1e3;for(;!w.signal.aborted&&Date.now()<O;){if(D=(await t.refresh()).handoffs.find(_=>_.id===z.id),D?.state==="failed")throw new Error(D.error);if(D?.state==="ready")break;await new Promise(_=>setTimeout(_,700))}if(w.signal.aborted)return;if(D?.state!=="ready")throw new Error("Linux \u542F\u52A8\u4ECD\u672A\u5B8C\u6210\uFF0C\u8BF7\u5728\u73AF\u5883\u9762\u677F\u67E5\u770B\u8FDB\u5EA6\u3002");await h.adopt(D,c,y===l)}catch(z){h.error=z.message}finally{h.busy=!1,t.emit()}},async adopt(s,c={},y=!0){let z=ge(s.settings),D=new URL(s.url).origin,O=i.get(z);if(!O||O.origin!==D){if([...i.values()].filter(U=>U.url&&U.key!==z).length>=8)throw new Error("\u540C\u4E00\u7A97\u53E3\u6700\u591A\u4FDD\u6301 8 \u4E2A Linux \u73AF\u5883\u3002\u5728\u5BF9\u8BDD\u83DC\u5355\u4E2D\u5173\u95ED\u4E0D\u7528\u7684\u73AF\u5883\u9875\u9762\u540E\u53EF\u7EE7\u7EED\u6253\u5F00\uFF0C\u540E\u53F0\u4EFB\u52A1\u4E0D\u53D7\u5F71\u54CD\u3002");O&&k(O,"Linux \u5DF2\u91CD\u65B0\u542F\u52A8\uFF0C\u8BF7\u91CD\u8BD5\u8FD9\u6B21\u64CD\u4F5C\u3002");let _=crypto.randomUUID();O={key:z,settings:s.settings,origin:D,channel:_,catalog:O?.catalog||null,url:Le(s.url,_,location.origin),openUrl:s.url,transport:j(location.origin)===J?"desktop":"iframe",ready:!1,compact:!0,window:null,waiting:null,startedAt:Date.now()},i.set(z,O)}else O.settings=s.settings,O.openUrl=s.url;O.handoff=G(new URL(s.url).hash),y&&(h.activeKey=z,e.layout.selectPanel(Z));let q={handoff:O.handoff,...c};O.ready?await m(O,q):O.waiting=q,b(),t.emit()},bind(s,c){s.window=c?.contentWindow||null},desktopMessage(s,c){i.get(s.key)===s&&g(s,c)},desktopError(s,c){i.get(s.key)===s&&(s.ready=!1,h.error=c.message,k(s,c.message),t.emit())},newWindows(){l++,e.uiWorkspace.startSession(),t.emit()},async newLinux(s){let c=s?.settings||t.state?.settings;if(!c?.distro){e.layout.selectPanel("dsh-wsl-native");return}let y=s?.catalog?.rows.find(z=>z.id===s.catalog.selectedId);await h.enter({...c,directory:y?.cwd||c.directory},{create:!0})},async action(s,c){h.error=null;try{if(s.environment){let y=i.get(s.environment.key);if(!y.ready)throw new Error("\u8BF7\u5148\u6253\u5F00\u8FD9\u6761 WSL \u5BF9\u8BDD\uFF0C\u518D\u6267\u884C\u64CD\u4F5C\u3002");await p(y,c,{sessionId:s.id})}else{let y={pin:"pinSession",unpin:"unpinSession",archive:"archiveSession",unarchive:"unarchiveSession"};if(!y[c])throw new Error("\u5BF9\u8BDD\u64CD\u4F5C\u65E0\u6548\u3002");await e.uiWorkspace[y[c]](s.id)}}catch(y){h.error=y.message}t.emit()},toggleChrome(s){s.compact=!s.compact,p(s,"chrome",{compact:s.compact}).catch(c=>{h.error=c.message,t.emit()}),t.emit()},closeView(s){k(s,"\u8FD9\u4E2A\u73AF\u5883\u7684\u9875\u9762\u5DF2\u5173\u95ED\uFF0C\u540E\u53F0\u4EFB\u52A1\u7EE7\u7EED\u8FD0\u884C\u3002"),h.activeKey===s.key&&h.showWindows(),delete s.url,s.window=null,s.ready=!1,s.origin=null,s.waiting=null,b(),t.emit()},reconnect(s){k(s,"\u8FDE\u63A5\u6B63\u5728\u91CD\u65B0\u5EFA\u7ACB\u3002"),s.origin=null,h.enter(s.settings,s.catalog?.selectedId?{sessionId:s.catalog.selectedId}:{})}};function b(){clearTimeout(a),a=setTimeout(()=>$("conversation-catalogs",[...i.values()].map(s=>({key:s.key,settings:s.settings,catalog:s.catalog}))),200)}let C=$("conversation-catalogs");for(let s of(Array.isArray(C)?C:[]).slice(0,8)){if(!s?.settings?.distro||!s?.settings?.directory||!ie(s.catalog))continue;let c=ge(s.settings);i.set(c,{key:c,settings:s.settings,catalog:ie(s.catalog),ready:!1,compact:!0})}function p(s,c,y){if(!s.window&&!s.desktop||!s.ready)return Promise.reject(new Error("WSL \u5BF9\u8BDD\u754C\u9762\u5C1A\u672A\u8FDE\u63A5\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002"));let z=crypto.randomUUID();return new Promise((D,O)=>{let q=setTimeout(()=>{o.delete(z),O(new Error("WSL \u5BF9\u8BDD\u6CA1\u6709\u53CA\u65F6\u54CD\u5E94\uFF0C\u8BF7\u68C0\u67E5\u8FDE\u63A5\uFF1B\u64CD\u4F5C\u4E0D\u4F1A\u81EA\u52A8\u91CD\u653E\u3002"))},3e4);o.set(z,{entry:s,resolve:D,reject:O,timer:q}),s.desktop?s.desktop.request(c,y).then(()=>g(s,{type:"result",id:z,ok:!0}),_=>g(s,{type:"result",id:z,ok:!1,error:_.message})):s.window.postMessage({protocol:se,channel:s.channel,type:"request",id:z,action:c,payload:y},s.origin)})}async function m(s,c){let y=crypto.randomUUID();s.navigating=y,t.emit();try{await p(s,"navigate",c)}finally{s.navigating===y&&(s.navigating=null),t.emit()}}function k(s,c){for(let[y,z]of o)z.entry===s&&(clearTimeout(z.timer),o.delete(y),z.reject(new Error(c)))}function E(s){let c=[...document.body.style].filter(y=>/^--(?:ds|dsw|dsh)-/.test(y)).map(y=>[y,document.body.style.getPropertyValue(y)]);p(s,"theme",{dark:document.body.hasAttribute("data-ds-dark-theme"),tokens:c}).catch(()=>{})}let W=s=>{let c=[...i.values()].find(y=>pe(s,{origin:y.origin,source:y.window,channel:y.channel}));c&&g(c,s.data)};function g(s,c){if(c.type==="catalog"){let y=ie(c.catalog);if(!y)return;let z=!s.ready;if(s.ready=!0,s.catalog=y,s.lastSeen=Date.now(),z&&E(s),s.waiting){let D=s.waiting;s.waiting=null,m(s,D).catch(O=>{h.error=O.message,t.emit()})}b(),t.emit()}else if(c.type==="result"){let y=o.get(c.id);if(!y||y.entry!==s)return;clearTimeout(y.timer),o.delete(c.id),c.ok?y.resolve():y.reject(new Error(String(c.error||"\u64CD\u4F5C\u5931\u8D25\u3002").slice(0,1e3)))}else c.type==="return"?h.showWindows():c.type==="sidebar"&&e.layout.toggleSidebar()}window.addEventListener("message",W);let x=new MutationObserver(()=>{for(let s of i.values())s.ready&&E(s)});x.observe(document.body,{attributes:!0,attributeFilter:["data-ds-dark-theme","style"]});let S=()=>{let s=JSON.stringify(ne(e));s!==f&&(f=s,t.emit())},v=[e.sessions.list.subscribe(S),e.workspaces.list.subscribe(S),e.layout.panelInfo.subscribe(()=>{t.emit()})];return h.dispose=()=>{w.abort(),x.disconnect(),clearTimeout(a),window.removeEventListener("message",W);for(let s of v)s();for(let s of i.values())k(s,"\u7A97\u53E3\u5DF2\u5173\u95ED\u3002")},h}var B=require("react"),I=require("@deepseek-ai/dsh-client-ui-primitives");function Ge(e,r,t,i){if(!V(e)||!["next","request"].includes(t)||!/^[a-zA-Z0-9-]{32,64}$/.test(r))throw new Error("\u684C\u9762 WSL \u901A\u9053\u53C2\u6570\u65E0\u6548\u3002");return`(() => { if (location.origin !== ${JSON.stringify(e)} || location.pathname !== '/') return null; const api = window[${JSON.stringify(Q)}]; return api ? api[${JSON.stringify(t)}](...${JSON.stringify([r,...i])}) : null; })()`}function De({host:e,entry:r,bridge:t,onMessage:i,onError:o,createElement:w=()=>document.createElement("webview")}){let l=!1,a,f,h,b=0,C,p,m=g=>new Promise(x=>{p=x,C=setTimeout(()=>{p=null,x()},g)}),k=(g,...x)=>l||!a||new URL(a.getURL()).origin!==r.origin?Promise.reject(new Error("WSL \u9875\u9762\u5C1A\u672A\u8FDE\u63A5\u6216\u5DF2\u79BB\u5F00\u6240\u5C5E\u73AF\u5883\u3002")):a.executeJavaScript(Ge(r.origin,r.channel,g,x));async function E(g){let x=0,S=Date.now()+45e3;try{for(;!l&&g===b;){let v=await k("next",x);if(l||g!==b)return;if(!v){if(Date.now()>S)throw new Error("Linux \u5BF9\u8BDD\u63D2\u4EF6\u5C1A\u672A\u5C31\u7EEA\uFF0C\u8BF7\u91CD\u65B0\u8FDE\u63A5\u3002");await m(250);continue}if(v.closed)return;if(!Number.isSafeInteger(v.sequence)||v.sequence<x)throw new Error("WSL \u9875\u9762\u8FD4\u56DE\u4E86\u65E0\u6548\u6E38\u6807\u3002");x=v.sequence,v.catalog&&i({type:"catalog",catalog:v.catalog});for(let s of(v.signals||[]).slice(0,16))["return","sidebar"].includes(s.type)&&i({type:s.type})}}catch(v){!l&&g===b&&o(v)}}let W={async request(g,x){let S=await k("request",g,x);if(!S?.ok)throw new Error(S?.error||"WSL \u9875\u9762\u5C1A\u672A\u8FDE\u63A5\u3002")},dispose(){l||(l=!0,b++,clearTimeout(C),p?.(),h?.(),a?.remove(),f&&t.release(f).catch(()=>{}))}};return(async()=>{if(!t?.acquire||!t?.release)throw new Error("\u5F53\u524D DSH \u684C\u9762\u7AEF\u6CA1\u6709\u9694\u79BB\u6D4F\u89C8\u5668\u63A5\u53E3\uFF0C\u8BF7\u66F4\u65B0 DSH \u6216\u4F7F\u7528 Web \u5165\u53E3\u3002");let g=await t.acquire("dsh-wsl-native:"+r.key);if(f=g.lease,l){await t.release(f);return}a=w(),a.className="dsh-wsl-desktop-view",a.setAttribute("name",f),a.setAttribute("partition",g.partition),a.setAttribute("allowpopups",""),a.setAttribute("aria-label",`WSL ${r.settings.distro} \u539F\u751F DSH \u5BF9\u8BDD`),a.setAttribute("src","about:blank#"+f);let x=!0;a.addEventListener("dom-ready",()=>{l||(x?(x=!1,a.loadURL(r.url).catch(S=>{l||o(S)})):E(++b))}),a.addEventListener("did-start-navigation",S=>{S.isMainFrame&&!S.isInPlace&&b++}),a.addEventListener("did-fail-load",S=>{!l&&S.isMainFrame&&S.errorCode!==-3&&o(new Error("WSL \u9875\u9762\u52A0\u8F7D\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5 Linux \u5B9E\u4F8B\u5E76\u91CD\u65B0\u8FDE\u63A5\u3002"))}),a.addEventListener("render-process-gone",()=>{b++,l||o(new Error("WSL \u5BF9\u8BDD\u9875\u9762\u5DF2\u9000\u51FA\uFF0C\u540E\u53F0\u5BBF\u4E3B\u4ECD\u72EC\u7ACB\u8FD0\u884C\u3002\u8BF7\u91CD\u65B0\u8FDE\u63A5\u3002"))}),h=t.onOpenRequested?.(f,S=>{!l&&/^https?:/.test(S)&&window.open(S,"_blank","noopener")}),e.append(a)})().catch(g=>{l||o(g)}),W}var d=require("react/jsx-runtime");function ve({distro:e,connected:r=!0}){return(0,d.jsxs)("span",{className:`dsh-wsl-chat-mark${r?"":" is-offline"}`,title:`WSL \xB7 ${e||"Linux"}`,children:[(0,d.jsx)(F,{size:12}),"WSL"]})}function Xe({ctx:e,model:r,wide:t,expandSidebar:i}){K(r);let o=r.conversations,[w,l]=(0,B.useState)("all"),[a,f]=(0,B.useState)(""),[h,b]=(0,B.useState)(35),[C,p]=(0,B.useState)(!1),[m,k]=(0,B.useState)(null),E=o.nativeCatalog(),W=We(E,o.entries.values(),{filter:w,query:a,archived:C}),g=o.entries.get(o.activeKey);if(!t)return(0,d.jsx)("div",{className:"dsh-wsl-chat-rail",children:(0,d.jsx)(I.Button,{variant:"ghost",icon:(0,d.jsx)(F,{size:18}),"aria-label":"\u5C55\u5F00 Windows \u4E0E WSL \u5BF9\u8BDD\u5217\u8868",onClick:i})});let x=s=>{let c=m;k(null),o.action(c,s)},S=s=>{window.matchMedia("(max-width:600px)").matches&&e.layout.toggleSidebar(),s()},v=s=>{p(!1),l("all"),f(""),b(35),S(s)};return(0,d.jsxs)("section",{className:"dsh-wsl-conversations","aria-label":"Windows \u4E0E WSL \u5BF9\u8BDD\u5217\u8868",children:[(0,d.jsxs)("div",{className:"dsh-wsl-chat-list-heading",children:[(0,d.jsx)("span",{children:"\u5BF9\u8BDD"}),(0,d.jsxs)("div",{children:[(0,d.jsx)(I.Button,{variant:"ghost",title:"\u6253\u5F00\u539F\u751F\u5DE5\u4F5C\u533A\u89C6\u56FE","aria-label":"\u6253\u5F00\u539F\u751F\u5DE5\u4F5C\u533A\u89C6\u56FE",onClick:()=>{o.setUnified(!1),o.showWindows()},children:"\u5DE5\u4F5C\u533A"}),(0,d.jsx)(I.Button,{variant:"ghost",title:C?"\u663E\u793A\u5F53\u524D\u5BF9\u8BDD":"\u663E\u793A\u5DF2\u5F52\u6863\u5BF9\u8BDD","aria-label":C?"\u663E\u793A\u5F53\u524D\u5BF9\u8BDD":"\u663E\u793A\u5DF2\u5F52\u6863\u5BF9\u8BDD",onClick:()=>p(!C),children:C?"\u8FD4\u56DE":"\u5F52\u6863"})]})]}),(0,d.jsx)("div",{className:"dsh-wsl-chat-filters",role:"group","aria-label":"\u6309\u73AF\u5883\u7B5B\u9009\u5BF9\u8BDD",children:[["all","\u5168\u90E8"],["windows","Windows"],["wsl","WSL"]].map(([s,c])=>(0,d.jsx)("button",{type:"button","aria-pressed":w===s,onClick:()=>{l(s),b(35)},children:c},s))}),(0,d.jsx)(I.Input,{"aria-label":"\u641C\u7D22\u5BF9\u8BDD\u6216\u5DE5\u4F5C\u76EE\u5F55",placeholder:"\u641C\u7D22\u5BF9\u8BDD\u6216\u76EE\u5F55",value:a,onChange:s=>{f(s.target.value),b(35)}}),(0,d.jsxs)("div",{className:"dsh-wsl-chat-new",children:[(0,d.jsxs)(I.Button,{variant:"ghost",onClick:()=>v(()=>o.newWindows()),"aria-label":"\u65B0\u5EFA Windows \u5BF9\u8BDD",children:[(0,d.jsx)(X,{size:14}),"Windows \uFF0B"]}),(0,d.jsxs)(I.Button,{variant:"ghost",disabled:o.busy,onClick:()=>v(()=>void o.newLinux(g)),"aria-label":"\u65B0\u5EFA WSL \u5BF9\u8BDD",children:[(0,d.jsx)(F,{size:14}),"WSL \uFF0B"]})]}),o.error&&(0,d.jsx)("div",{className:"dsh-wsl-chat-list-error",role:"alert",children:o.error}),(0,d.jsxs)("div",{className:"dsh-wsl-chat-rows",role:"list","aria-label":C?"\u5DF2\u5F52\u6863\u5BF9\u8BDD":"\u6240\u6709\u73AF\u5883\u7684\u5BF9\u8BDD",children:[W.slice(0,h).map(s=>{let c=s.environment?o.visible()&&o.activeKey===s.environment.key&&s.environment.catalog.selectedId===s.id:!e.layout.panelInfo.getSnapshot().activePanelId&&E.selectedId===s.id;return(0,d.jsxs)("div",{className:`dsh-wsl-chat-row${c?" is-selected":""}`,role:"listitem",children:[(0,d.jsxs)("button",{type:"button",className:"dsh-wsl-chat-row-open","aria-current":c?"page":void 0,disabled:C,"aria-label":`${s.environment?"WSL":"Windows"} \u5BF9\u8BDD\uFF1A${s.title}`,title:`${s.environment?`WSL \xB7 ${s.environment.settings.distro}`:"Windows"}
${s.cwd}`,onClick:()=>S(()=>void o.openRow(s)),children:[(0,d.jsx)("span",{className:"dsh-wsl-chat-dot",children:s.running?(0,d.jsx)(I.StateDot,{state:"ongoing"}):s.pinned?"\u2022":null}),(0,d.jsxs)("span",{className:"dsh-wsl-chat-row-text",children:[(0,d.jsx)("span",{children:s.title||"\u65B0\u5BF9\u8BDD"}),(0,d.jsx)("small",{children:s.cwd.split(/[\\/]/).filter(Boolean).at(-1)||s.workspaceTitle})]}),s.environment&&(0,d.jsx)(ve,{distro:s.environment.settings.distro,connected:s.environment.ready&&s.environment.catalog.connected})]}),(0,d.jsx)("button",{type:"button",className:"dsh-wsl-chat-more","aria-label":`\u7BA1\u7406\u5BF9\u8BDD\uFF1A${s.title}`,onClick:()=>k(s),children:"\u22EF"})]},s.key)}),W.length>h&&(0,d.jsxs)(I.Button,{variant:"ghost",onClick:()=>b(h+35),children:["\u663E\u793A\u66F4\u591A\uFF08",W.length-h,"\uFF09"]}),!W.length&&(0,d.jsx)("div",{className:"dsh-wsl-chat-empty",children:a?"\u6CA1\u6709\u5339\u914D\u7684\u5BF9\u8BDD":C?"\u6CA1\u6709\u5DF2\u5F52\u6863\u5BF9\u8BDD":w==="wsl"?"\u70B9\u51FB WSL \uFF0B\uFF0C\u5728\u8FD9\u91CC\u5F00\u59CB Linux \u5BF9\u8BDD\u3002":"\u9009\u62E9\u73AF\u5883\uFF0C\u5F00\u59CB\u65B0\u5BF9\u8BDD\u3002"})]}),(0,d.jsx)("div",{className:"dsh-wsl-chat-list-foot",children:o.busy?(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(I.StateDot,{state:"ongoing"}),"\u6B63\u5728\u51C6\u5907 WSL\u2026"]}):"\u4E24\u8FB9\u7684\u4EFB\u52A1\u53EF\u540C\u65F6\u8FD0\u884C"}),(0,d.jsx)(I.Modal,{open:!!m,onClose:()=>k(null),title:m?.title||"\u7BA1\u7406\u5BF9\u8BDD",children:m&&(0,d.jsxs)("div",{className:"dsh-wsl-chat-menu",children:[(0,d.jsxs)("p",{children:[m.environment?`WSL \xB7 ${m.environment.settings.distro}`:"Windows"," \xB7 ",m.cwd]}),!m.archived&&(0,d.jsx)(I.Button,{onClick:()=>x(m.pinned?"unpin":"pin"),children:m.pinned?"\u53D6\u6D88\u7F6E\u9876":"\u7F6E\u9876\u5BF9\u8BDD"}),(0,d.jsx)(I.Button,{onClick:()=>x(m.archived?"unarchive":"archive"),children:m.archived?"\u6062\u590D\u5BF9\u8BDD":"\u5F52\u6863\u5BF9\u8BDD"}),m.environment?.url&&(0,d.jsx)(I.Button,{variant:"ghost",onClick:()=>{o.closeView(m.environment),k(null)},children:"\u5173\u95ED\u8FD9\u4E2A\u73AF\u5883\u7684\u9875\u9762\uFF08\u4FDD\u7559\u540E\u53F0\u4EFB\u52A1\uFF09"}),(0,d.jsx)(I.Button,{variant:"ghost",onClick:()=>k(null),children:"\u53D6\u6D88"})]})})]})}function Ze({ctx:e,model:r}){K(r);let t=(0,B.useRef)(null),i=r.conversations,o=i.entries.get(i.activeKey)?.ready;return(0,B.useLayoutEffect)(()=>(i.setAnchor(t.current),()=>i.setAnchor(null)),[i]),(0,d.jsx)("div",{className:"dsh-wsl-chat-target",ref:t,children:!o&&(0,d.jsxs)("div",{className:"dsh-wsl-chat-loading",children:[(0,d.jsx)(I.StateDot,{state:"ongoing"}),"\u6B63\u5728\u8FDE\u63A5 WSL \u5BF9\u8BDD\u2026",(0,d.jsx)(I.Button,{variant:"ghost",onClick:()=>e.layout.selectPanel("dsh-wsl-native"),children:"\u67E5\u770B\u73AF\u5883"}),(0,d.jsx)(I.Button,{variant:"ghost",onClick:()=>i.showWindows(),children:"\u8FD4\u56DE Windows \u5BF9\u8BDD"})]})})}function Qe({entry:e,model:r,visible:t}){let i=(0,B.useRef)(null);return(0,B.useEffect)(()=>{let o=r.conversations,w=De({host:i.current,entry:e,bridge:window.dshDesktop?.browser,onMessage:l=>o.desktopMessage(e,l),onError:l=>o.desktopError(e,l)});return e.desktop=w,()=>{w.dispose(),e.desktop===w&&(e.desktop=null)}},[e,r]),(0,d.jsx)("div",{className:"dsh-wsl-desktop-surface",ref:i,inert:!t||!!e.navigating,style:{visibility:t&&e.ready?"visible":"hidden"}})}function Ye({entry:e,model:r,visible:t,rect:i,ctx:o}){let w=r.conversations,[l,a]=(0,B.useState)(!1);(0,B.useEffect)(()=>{let h=setTimeout(()=>a(!0),45e3);return()=>clearTimeout(h)},[e.channel]);let f=e.catalog?.rows.find(h=>h.id===e.catalog.selectedId);return(0,d.jsxs)("section",{className:"dsh-wsl-resident","aria-label":`WSL \xB7 ${e.settings.distro} \u5BF9\u8BDD`,"aria-hidden":!t,inert:!t,style:t&&i?{top:i.top,left:i.left,width:i.width,height:i.height}:{visibility:"hidden",left:-2e4,top:0,width:i?.width||1e3,height:i?.height||800},children:[(0,d.jsxs)("header",{className:"dsh-wsl-chat-toolbar",children:[(0,d.jsx)(I.Button,{variant:"ghost",icon:(0,d.jsx)(I.IconPanelLeftOutlineRegular,{}),"aria-label":"\u5C55\u5F00\u6216\u6536\u8D77\u5BF9\u8BDD\u5217\u8868",title:"\u5C55\u5F00\u6216\u6536\u8D77\u5BF9\u8BDD\u5217\u8868",onClick:()=>o.layout.toggleSidebar()}),(0,d.jsx)(ve,{distro:e.settings.distro,connected:e.catalog?.connected}),(0,d.jsxs)("span",{className:"dsh-wsl-chat-context",title:f?.cwd||e.settings.directory,children:[e.settings.distro,(0,d.jsxs)("span",{children:[" \xB7 ",f?.cwd?.split("/").filter(Boolean).at(-1)||"Linux"]})]}),(0,d.jsxs)("div",{className:"dsh-wsl-chat-toolbar-actions",children:[(0,d.jsx)(I.Button,{variant:"ghost",disabled:!e.ready||w.busy,onClick:()=>void w.newLinux(e),children:"\u65B0\u5BF9\u8BDD"}),(0,d.jsx)(I.Button,{variant:"ghost",disabled:!e.ready,title:"Linux \u8BBE\u7F6E\u3001\u63D2\u4EF6\u4E0E\u5DE5\u4F5C\u533A",onClick:()=>w.toggleChrome(e),children:e.compact?"Linux \u8BBE\u7F6E":"\u6536\u8D77\u4FA7\u680F"})]})]}),w.error&&t&&(0,d.jsx)("div",{role:"alert",className:"dsh-wsl-chat-notice",children:w.error}),e.ready&&!e.catalog?.connected&&(0,d.jsxs)("div",{role:"status",className:"dsh-wsl-chat-notice",children:["WSL \u8FDE\u63A5\u5DF2\u4E2D\u65AD\uFF0C\u6062\u590D\u8FDE\u63A5\u540E\u53EF\u7EE7\u7EED\u4F7F\u7528\u3002",(0,d.jsx)(I.Button,{variant:"ghost",disabled:w.busy,onClick:()=>w.reconnect(e),children:"\u91CD\u65B0\u8FDE\u63A5"})]}),(0,d.jsxs)("div",{className:"dsh-wsl-chat-frame-body",children:[e.transport==="desktop"?(0,d.jsx)(Qe,{entry:e,model:r,visible:t}):(0,d.jsx)("iframe",{title:`WSL ${e.settings.distro} \u539F\u751F DSH \u5BF9\u8BDD`,src:e.url,ref:h=>w.bind(e,h),inert:!t||!!e.navigating,referrerPolicy:"no-referrer",allow:"clipboard-read; clipboard-write",style:{visibility:t&&e.ready?"visible":"hidden"}},e.channel),!e.ready&&(0,d.jsxs)("div",{className:"dsh-wsl-chat-loading",children:[(0,d.jsx)(I.StateDot,{state:"ongoing"}),(0,d.jsx)("span",{children:l?"WSL \u5BF9\u8BDD\u5C1A\u672A\u8FDE\u63A5\u3002\u53EF\u4EE5\u91CD\u65B0\u8FDE\u63A5\uFF0C\u6216\u67E5\u770B\u73AF\u5883\u4E2D\u7684\u542F\u52A8\u72B6\u6001\u3002":"\u6B63\u5728\u6253\u5F00 Linux \u5BF9\u8BDD\u2026"}),l&&(0,d.jsx)(I.Button,{onClick:()=>w.reconnect(e),children:"\u91CD\u65B0\u8FDE\u63A5"}),(0,d.jsx)(I.Button,{variant:"ghost",onClick:()=>w.showWindows(),children:"\u8FD4\u56DE Windows"})]})]})]})}function et({ctx:e,model:r}){K(r);let[t,i]=(0,B.useState)(null),o=r.conversations,w=o?.visible(),l=o?.anchor;return(0,B.useLayoutEffect)(()=>{if(!l)return;let a,f=()=>{cancelAnimationFrame(a),a=requestAnimationFrame(()=>{let b=l.getBoundingClientRect();i({top:b.top,left:b.left,width:Math.max(0,document.documentElement.clientWidth-b.left),height:b.height})})},h=new ResizeObserver(f);return h.observe(l),window.addEventListener("resize",f),f(),()=>{h.disconnect(),window.removeEventListener("resize",f),cancelAnimationFrame(a)}},[l]),(0,B.useEffect)(()=>(document.documentElement.toggleAttribute("data-dsh-wsl-conversation",!!w),()=>document.documentElement.removeAttribute("data-dsh-wsl-conversation")),[w]),r.state?.mode!=="windows-host"||!o?null:(0,d.jsx)(d.Fragment,{children:[...o.entries.values()].filter(a=>a.url).map(a=>(0,d.jsx)(Ye,{entry:a,model:r,ctx:e,visible:!!w&&!!l&&o.activeKey===a.key,rect:t},a.key+a.channel))})}function tt({model:e}){K(e);let r=(0,B.useRef)(null),t=e.guest?.compact===!0;return(0,B.useLayoutEffect)(()=>{let i=r.current?.closest("[data-shell-overlay]")?.parentElement;if(!i||!e.guest)return;i.toggleAttribute("data-dsh-wsl-embedded",t);let o=()=>{let a=/minmax\(0px,\s*([\d.]+px)\)\s*$/.exec(i.style.gridTemplateColumns)?.[1]||"0px";i.style.getPropertyValue("--dsh-wsl-right-track")!==a&&i.style.setProperty("--dsh-wsl-right-track",a)},w=new MutationObserver(o);return w.observe(i,{attributes:!0,attributeFilter:["style"]}),o(),()=>{w.disconnect(),i.removeAttribute("data-dsh-wsl-embedded"),i.style.removeProperty("--dsh-wsl-right-track")}},[e.guest,t]),(0,d.jsx)("span",{ref:r})}function Be(e,r){e.slots.inject("main",()=>e.slots.register({name:"main",key:Z},()=>(0,d.jsx)(Ze,{ctx:e,model:r}))),e.slots.inject("shell.overlay",()=>e.slots.register({name:"shell.overlay",id:"dsh-wsl-conversations",order:15},()=>(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(et,{ctx:e,model:r}),(0,d.jsx)(tt,{model:r})]}))),e.slots.inject("sidebar.workspaces",()=>{let t,i=()=>{let w=r.state?.mode==="windows-host"&&!!j(location.origin)&&r.conversations?.unified;w&&!t?t=e.slots.register({name:"sidebar.workspaces",priority:-80},l=>(0,d.jsx)(Xe,{...l,ctx:e,model:r})):!w&&t&&(t(),t=null)},o=r.subscribe(i);return i(),()=>{o(),t?.()}}),e.slots.inject("conversation.session.header.actions",()=>e.slots.register({name:"conversation.session.header.actions",id:"dsh-wsl-environment",order:5},()=>(K(r),r.state?.mode==="wsl-host"&&!r.guest?(0,d.jsx)(ve,{distro:r.state.settings.distro}):null)))}var be=require("react/jsx-runtime"),ue="dsh-wsl-native",st="dsh-wsl-native-client",it=["connection","slots","layout","workspaces","uiWorkspace","sessions"];function nt(e){let r=async(i,o={})=>{let w=await e.connection.rpc.call("/api",`${ue}/${i}`,o);if(!w.ok)throw Object.assign(new Error(w.error?.message||"\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\u3002"),{code:w.error?.code});return w.value},t=Ee(e,r);t.conversations=Pe(e,r,t),Be(e,t),e.effect(()=>()=>t.dispose()),e.effect(()=>{let i=document.createElement("style");return i.dataset.dshWslNative="",i.textContent=ke,document.head.append(i),()=>i.remove()}),e.slots.inject("main",()=>e.slots.register({name:"main",key:ue},()=>(0,be.jsx)(Ae,{api:r,ctx:e,model:t}))),e.slots.inject("sidebar.panellist",()=>e.slots.register({name:"sidebar.panellist",id:ue,order:20,label:()=>"WSL \u4E0E Windows"},F)),e.slots.inject("sidebar.footer.action",()=>e.slots.register({name:"sidebar.footer.action",id:ue,order:20},()=>(0,be.jsx)(ze,{ctx:e,model:t})))}

return module.exports;}});
