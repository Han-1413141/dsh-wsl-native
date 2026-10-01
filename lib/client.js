window.__ModuleLoader__.load({id:"dsh-wsl-native",factory:(require)=>{const module={exports:{}};const exports=module.exports;
"use strict";var Re=Object.defineProperty;var kt=Object.getOwnPropertyDescriptor;var St=Object.getOwnPropertyNames;var It=Object.prototype.hasOwnProperty;var Lt=(e,n)=>{for(var t in n)Re(e,t,{get:n[t],enumerable:!0})},Nt=(e,n,t,r)=>{if(n&&typeof n=="object"||typeof n=="function")for(let s of St(n))!It.call(e,s)&&s!==t&&Re(e,s,{get:()=>n[s],enumerable:!(r=kt(n,s))||r.enumerable});return e};var Wt=e=>Nt(Re({},"__esModule",{value:!0}),e);var Gt={};Lt(Gt,{apply:()=>Kt,inject:()=>Ft,name:()=>Jt});module.exports=Wt(Gt);var In=require("react");var _e=`.dsh-wsl-conversations { position:relative; display:flex; flex-direction:column; gap:4px; min-height:0; height:100%; padding:0 6px; color:var(--dsw-alias-label-primary); font:13px/1.5 var(--dsw-font-family); }\r
.dsh-wsl-compact-heading { display:flex; align-items:center; gap:2px; min-height:32px; flex:none; color:var(--dsw-alias-label-tertiary); }\r
.dsh-wsl-compact-heading > span { padding-left:4px; white-space:nowrap; }\r
.dsh-wsl-heading-actions { display:flex; margin-left:auto; }\r
.dsh-wsl-icon-button { display:inline-flex; align-items:center; justify-content:center; width:26px; height:26px; padding:0; border:0; border-radius:6px; flex:none; color:var(--dsw-alias-label-secondary); background:transparent; cursor:pointer; }\r
.dsh-wsl-icon-button:hover, .dsh-wsl-icon-button[aria-expanded=true] { background:var(--dsw-alias-interactive-bg-hover); }\r
.dsh-wsl-icon-button:focus-visible { outline:2px solid var(--dsw-alias-state-business-primary); outline-offset:-2px; }\r
.dsh-wsl-add-workspace { width:auto; min-width:48px; gap:3px; padding:0 5px; white-space:nowrap; }\r
.dsh-wsl-add-workspace > span { font:500 10px/1 var(--dsw-font-family); letter-spacing:.02em; }\r
.dsh-wsl-list-popover { position:absolute; top:34px; right:6px; min-width:155px; z-index:20; padding:5px; border:1px solid var(--dsw-alias-border-l4); border-radius:10px; background:var(--dsw-alias-bg-base); box-shadow:0 6px 22px #0002; }\r
.dsh-wsl-list-popover button { display:block; width:100%; text-align:left; border:0; background:transparent; border-radius:6px; padding:7px 9px; font:inherit; color:inherit; cursor:pointer; }\r
.dsh-wsl-list-popover button:hover { background:var(--dsw-alias-interactive-bg-hover); }\r
.dsh-wsl-list-popover button:disabled { opacity:.5; cursor:default; }\r
.dsh-wsl-list-popover .dsh-wsl-menu-divider { border-top:1px solid var(--dsw-alias-border-l4); border-radius:0; margin-top:4px; padding-top:9px; }\r
.dsh-wsl-chat-list-heading { display:flex; align-items:center; justify-content:space-between; color:var(--dsw-alias-label-secondary); }\r
.dsh-wsl-chat-list-heading > div { display:flex; gap:0; }\r
.dsh-wsl-chat-list-heading button { font-size:11px; padding:2px 5px; }\r
.dsh-wsl-chat-filters { display:flex; gap:3px; padding:3px; border:1px solid var(--dsw-alias-border-l4); border-radius:9px; }\r
.dsh-wsl-chat-filters button { flex:1; border:0; background:transparent; color:var(--dsw-alias-label-secondary); font:inherit; cursor:pointer; border-radius:6px; padding:3px; }\r
.dsh-wsl-chat-filters button[aria-pressed=true] { color:var(--dsw-alias-label-primary); background:var(--dsw-alias-bg-base); box-shadow:0 1px 3px #0000000c; }\r
.dsh-wsl-chat-new { display:flex; justify-content:space-between; gap:4px; }\r
.dsh-wsl-chat-new button { flex:1; font-size:12px; }\r
.dsh-wsl-chat-rows { overflow:auto; flex:1; min-height:0; scrollbar-width:thin; margin:0 -4px; padding:0 4px; }\r
.dsh-wsl-chat-row { position:relative; display:flex; align-items:center; gap:0; border-radius:8px; margin:2px 0; min-width:0; }\r
.dsh-wsl-chat-row:hover { background:color-mix(in srgb,var(--dsw-alias-label-primary) 4%,transparent); }\r
.dsh-wsl-chat-row.is-selected { background:color-mix(in srgb,var(--dsw-alias-label-primary) 7%,transparent); }\r
.dsh-wsl-chat-row-open { border:0; background:transparent; color:inherit; text-align:left; cursor:pointer; display:flex; align-items:center; gap:6px; padding:5px 3px 5px 1px; min-height:32px; min-width:0; width:100%; font:inherit; }\r
.dsh-wsl-chat-row-open:disabled { cursor:default; }\r
.dsh-wsl-chat-dot { width:10px; display:flex; justify-content:center; flex:none; color:var(--dsw-alias-label-tertiary); }\r
.dsh-wsl-chat-row-text { flex:1; min-width:0; display:flex; flex-direction:column; gap:1px; }\r
.dsh-wsl-chat-row-text > span, .dsh-wsl-chat-row-text small { white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }\r
.dsh-wsl-chat-row-text small { color:var(--dsw-alias-label-tertiary); font-size:10px; }\r
.dsh-wsl-chat-mark { display:inline-flex; align-items:center; gap:3px; flex:none; padding:1px 5px; border-radius:5px; font:500 10px/16px var(--dsw-font-family); color:var(--dsw-alias-label-secondary); border:1px solid var(--dsw-alias-border-l4); background:color-mix(in srgb,var(--dsw-alias-label-primary) 3%,transparent); white-space:nowrap; }\r
.dsh-wsl-chat-mark.is-offline { opacity:.65; }\r
.dsh-wsl-chat-more { border:0; color:var(--dsw-alias-label-secondary); background:transparent; padding:5px; cursor:pointer; opacity:0; border-radius:5px; }\r
.dsh-wsl-chat-row:hover .dsh-wsl-chat-more, .dsh-wsl-chat-row:focus-within .dsh-wsl-chat-more { opacity:1; }\r
.dsh-wsl-chat-more:focus-visible,.dsh-wsl-chat-filters button:focus-visible,.dsh-wsl-chat-row-open:focus-visible { outline:2px solid var(--dsw-alias-label-secondary); outline-offset:-2px; }\r
.dsh-wsl-chat-list-foot { font-size:10px; color:var(--dsw-alias-label-tertiary); display:flex; gap:6px; align-items:center; padding:4px; }\r
.dsh-wsl-chat-list-error,.dsh-wsl-chat-notice { font-size:12px; line-height:1.6; overflow-wrap:anywhere; color:var(--dsw-alias-label-primary); padding:8px 12px; background:color-mix(in srgb,#c58b3a 10%,transparent); border-radius:8px; }\r
.dsh-wsl-chat-empty { padding:24px 8px; font-size:12px; color:var(--dsw-alias-label-tertiary); text-align:center; }\r
.dsh-wsl-chat-menu { display:flex; flex-direction:column; gap:10px; padding:8px; }\r
.dsh-wsl-chat-menu p { overflow-wrap:anywhere; font-size:12px; color:var(--dsw-alias-label-secondary); }\r
.dsh-wsl-chat-target { flex:1; min-height:0; position:relative; height:100%; }\r
.dsh-wsl-chat-loading { position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:16px; padding:32px; background:var(--dsw-alias-bg-base); color:var(--dsw-alias-label-secondary); font:13px/1.7 var(--dsw-font-family); }\r
.dsh-wsl-resident { position:fixed; display:flex; flex-direction:column; background:var(--dsw-alias-bg-base); color:var(--dsw-alias-label-primary); pointer-events:auto; z-index:5; overflow:hidden; }\r
.dsh-wsl-chat-toolbar { display:flex; align-items:center; gap:8px; padding:6px 12px; min-height:40px; border-bottom:1px solid var(--dsw-alias-border-l4); flex:none; font:12px/1.5 var(--dsw-font-family); }\r
.dsh-wsl-chat-context { flex:1; min-width:0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }\r
.dsh-wsl-chat-context > span { color:var(--dsw-alias-label-secondary); }\r
.dsh-wsl-chat-toolbar-actions { display:flex; flex:none; }\r
.dsh-wsl-chat-toolbar-actions button { font-size:12px; }\r
.dsh-wsl-chat-frame-body { position:relative; flex:1; min-height:0; }\r
.dsh-wsl-chat-frame-body iframe { border:0; display:block; width:100%; height:100%; background:var(--dsw-alias-bg-base); }\r
.dsh-wsl-desktop-surface { width:100%; height:100%; }\r
.dsh-wsl-desktop-view { display:flex; width:100%; height:100%; border:0; }\r
html[data-dsh-wsl-conversation] [data-rightbar-col] { visibility:hidden; pointer-events:none; }\r
[data-dsh-wsl-embedded] { grid-template-columns:0px minmax(0,1fr) minmax(0px,var(--dsh-wsl-right-track,0px)) !important; }\r
[data-dsh-wsl-embedded] > :first-child,[data-dsh-wsl-embedded] > [data-side=sidebar] { display:none !important; }\r
[data-dsh-wsl-embedded] > :nth-child(2) { grid-column:2; grid-row:1; }\r
[data-dsh-wsl-embedded] > [data-rightbar-col] { grid-column:3; grid-row:1; }\r
[data-dsh-wsl-embedded] > [data-dsh-wsl-guest-sidebar] { display:none !important; }\r
[data-dsh-wsl-embedded] > [data-dsh-wsl-guest-center] { grid-column:2; grid-row:1; min-width:0; }\r
.dsh-wsl-unified-setting { display:flex; align-items:center; justify-content:space-between; gap:14px; font-size:12px; color:var(--dsw-alias-label-secondary); }\r
.dsh-wsl-inheritance > p { margin:0 0 16px; color:var(--dsw-alias-label-secondary); }\r
.dsh-wsl-inherit-options { display:flex; flex-wrap:wrap; gap:12px 24px; }\r
.dsh-wsl-inherit-options label { display:flex; align-items:center; gap:7px; cursor:pointer; }\r
.dsh-wsl-inherit-options input { accent-color:var(--dsw-alias-label-primary); width:15px; height:15px; }\r
.dsh-wsl-inherit-actions { display:flex; flex-wrap:wrap; gap:12px; align-items:center; margin-top:18px; }\r
.dsh-wsl-inherit-details { border-top:1px solid var(--dsw-alias-border-l4); margin-top:18px; padding-top:12px; font-size:12px; }\r
.dsh-wsl-inherit-details summary { cursor:pointer; color:var(--dsw-alias-label-secondary); }\r
.dsh-wsl-inherit-details ul { list-style:none; margin:12px 0 0; padding:0; }\r
.dsh-wsl-inherit-details li { display:flex; justify-content:space-between; gap:12px; padding:5px 0; overflow-wrap:anywhere; }\r
.dsh-wsl-inherit-details small, .dsh-wsl-inherit-details li > span:last-child { color:var(--dsw-alias-label-tertiary); }\r
@media(max-width:600px) { .dsh-wsl-chat-toolbar { gap:5px; padding:5px; } .dsh-wsl-chat-context > span { display:none; } .dsh-wsl-chat-toolbar-actions button { padding:4px 6px; } .dsh-wsl-unified-setting { flex-direction:column; align-items:flex-start; } }\r
@media(hover:none) { .dsh-wsl-chat-more { opacity:1; } }\r
\r
.dsh-wsl-page {\r
  --wsl-border: var(--dsw-alias-border-l4);\r
  box-sizing: border-box;\r
  display: flex;\r
  flex-direction: column;\r
  align-items: center;\r
  gap: 28px;\r
  height: 100%;\r
  overflow: auto;\r
  padding: 28px clamp(20px, 4vw, 48px) 48px;\r
  color: var(--dsw-alias-label-primary);\r
  font-family: var(--dsw-font-family);\r
  font-size: 14px;\r
  line-height: 1.6;\r
  container-type: inline-size;\r
}\r
.dsh-wsl-page *,\r
.dsh-wsl-picker * {\r
  box-sizing: border-box;\r
}\r
.dsh-wsl-page > * {\r
  width: 100%;\r
  max-width: 880px;\r
  flex-shrink: 0;\r
}\r
.dsh-wsl-page h1,\r
.dsh-wsl-page h2,\r
.dsh-wsl-page h3,\r
.dsh-wsl-page p,\r
.dsh-wsl-page dl,\r
.dsh-wsl-page dd {\r
  margin: 0;\r
}\r
.dsh-wsl-heading {\r
  display: flex;\r
  align-items: flex-start;\r
  justify-content: space-between;\r
  gap: 16px;\r
}\r
.dsh-wsl-heading h1 {\r
  font-size: 20px;\r
  line-height: 28px;\r
  font-weight: 500;\r
}\r
.dsh-wsl-heading p {\r
  margin-top: 6px;\r
  font-size: 13px;\r
  line-height: 20px;\r
  color: var(--dsw-alias-label-secondary);\r
}\r
.dsh-wsl-host-grid {\r
  display: grid;\r
  grid-template-columns: repeat(2, minmax(0, 1fr));\r
  gap: 16px;\r
}\r
.dsh-wsl-host-card {\r
  display: flex;\r
  flex-direction: column;\r
  padding: 22px;\r
  min-width: 0;\r
}\r
.dsh-wsl-host-card.is-current {\r
  background: var(--dsw-alias-bg-module-platform);\r
}\r
.dsh-wsl-host-head {\r
  display: flex;\r
  justify-content: space-between;\r
  align-items: center;\r
  gap: 12px;\r
  margin-bottom: 18px;\r
  color: var(--dsw-alias-label-secondary);\r
}\r
.dsh-wsl-host-card h3 {\r
  font-size: 15px;\r
  font-weight: 500;\r
}\r
.dsh-wsl-host-card h3 > span {\r
  font-size: 12px;\r
  font-weight: 400;\r
  color: var(--dsw-alias-label-tertiary);\r
  margin-left: 6px;\r
}\r
.dsh-wsl-host-card > p {\r
  margin-top: 8px;\r
  font-size: 13px;\r
  color: var(--dsw-alias-label-secondary);\r
}\r
.dsh-wsl-host-actions {\r
  display: flex;\r
  flex-wrap: wrap;\r
  gap: 12px;\r
  align-items: center;\r
  padding-top: 24px;\r
  margin-top: auto;\r
}\r
.dsh-wsl-text-link {\r
  display: inline-flex;\r
  align-items: center;\r
  gap: 6px;\r
  color: var(--dsw-alias-label-secondary);\r
  font-size: 12px;\r
  text-decoration: none;\r
  border-radius: 4px;\r
}\r
.dsh-wsl-text-link:hover {\r
  color: var(--dsw-alias-label-primary);\r
  text-decoration: underline;\r
}\r
.dsh-wsl-section-note {\r
  margin-top: 12px !important;\r
  color: var(--dsw-alias-label-tertiary);\r
  font-size: 12px;\r
}\r
.dsh-wsl-recents {\r
  display: flex;\r
  flex-wrap: wrap;\r
  gap: 6px;\r
  align-items: center;\r
  margin: 0 22px 18px;\r
  font-size: 12px;\r
}\r
.dsh-wsl-recents > span {\r
  margin-right: 4px;\r
  color: var(--dsw-alias-label-tertiary);\r
}\r
.dsh-wsl-recents button {\r
  display: inline-flex;\r
  gap: 6px;\r
  align-items: center;\r
  max-width: 200px;\r
  border: 1px solid var(--wsl-border);\r
  border-radius: var(--dsw-radius-sm);\r
  background: transparent;\r
  padding: 5px 9px;\r
  color: var(--dsw-alias-label-secondary);\r
  font: inherit;\r
  cursor: pointer;\r
}\r
.dsh-wsl-recents button > span {\r
  overflow: hidden;\r
  white-space: nowrap;\r
  text-overflow: ellipsis;\r
}\r
.dsh-wsl-recents button > svg {\r
  flex-shrink: 0;\r
}\r
.dsh-wsl-recents button.is-selected,\r
.dsh-wsl-recents button:hover {\r
  background: var(--dsw-alias-interactive-bg-hover);\r
  color: var(--dsw-alias-label-primary);\r
}\r
.dsh-wsl-recents button:disabled {\r
  opacity: 0.5;\r
  cursor: default;\r
}\r
.dsh-wsl-runtime-row {\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  gap: 16px;\r
  margin-top: 20px;\r
  padding-top: 16px;\r
  border-top: 1px solid var(--wsl-border);\r
}\r
.dsh-wsl-runtime-row > div {\r
  display: flex;\r
  flex-direction: column;\r
}\r
.dsh-wsl-runtime-row strong {\r
  font-weight: 500;\r
}\r
.dsh-wsl-runtime-row span,\r
.dsh-wsl-runtime-row p {\r
  color: var(--dsw-alias-label-tertiary);\r
}\r
.dsh-wsl-runtime-row > button {\r
  flex-shrink: 0;\r
}\r
.dsh-wsl-section-heading {\r
  display: flex;\r
  justify-content: space-between;\r
  align-items: center;\r
  gap: 12px;\r
  margin-bottom: 12px;\r
}\r
.dsh-wsl-section-heading h2 {\r
  font-size: 14px;\r
  font-weight: 500;\r
  line-height: 22px;\r
}\r
.dsh-wsl-caption {\r
  font-size: 12px;\r
  color: var(--dsw-alias-label-tertiary);\r
}\r
.dsh-wsl-card {\r
  background: var(--dsw-alias-bg-layer-1);\r
  border: 1px solid var(--wsl-border);\r
  border-radius: var(--dsw-radius-lg);\r
  overflow: hidden;\r
}\r
.dsh-wsl-environment,\r
.dsh-wsl-native-head {\r
  display: flex;\r
  gap: 12px;\r
  align-items: center;\r
}\r
.dsh-wsl-environment {\r
  padding: 20px 22px;\r
  border-bottom: 1px solid var(--wsl-border);\r
  background: var(--dsw-alias-bg-module-platform);\r
}\r
.dsh-wsl-environment-icon {\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  width: 42px;\r
  height: 42px;\r
  flex: none;\r
  border-radius: var(--dsw-radius-md);\r
  background: var(--dsw-alias-bg-layer-2);\r
  border: 1px solid var(--wsl-border);\r
  color: var(--dsw-alias-label-secondary);\r
}\r
.dsh-wsl-environment-copy,\r
.dsh-wsl-native-copy {\r
  flex: 1;\r
  min-width: 0;\r
}\r
.dsh-wsl-environment-title {\r
  font-size: 14px;\r
  font-weight: 500;\r
  overflow-wrap: anywhere;\r
}\r
.dsh-wsl-bridge-arrow {\r
  margin: 0 10px;\r
  color: var(--dsw-alias-label-tertiary);\r
  font-weight: 400;\r
}\r
.dsh-wsl-environment-copy p,\r
.dsh-wsl-native-copy p {\r
  color: var(--dsw-alias-label-secondary);\r
  font-size: 12px;\r
  margin-top: 2px;\r
}\r
.dsh-wsl-badge {\r
  display: inline-flex;\r
  align-items: center;\r
  gap: 6px;\r
  white-space: nowrap;\r
  font-size: 12px;\r
  color: var(--dsw-alias-label-secondary);\r
}\r
.dsh-wsl-fields {\r
  padding: 22px 22px 12px;\r
  display: grid;\r
  grid-template-columns: minmax(150px, 0.75fr) minmax(0, 1.65fr);\r
  gap: 20px;\r
}\r
.dsh-wsl-field label,\r
.dsh-wsl-user-field label {\r
  display: block;\r
  font-size: 13px;\r
  font-weight: 500;\r
  margin-bottom: 8px;\r
}\r
.dsh-wsl-field > p,\r
.dsh-wsl-user-field p {\r
  color: var(--dsw-alias-label-tertiary);\r
  font-size: 12px;\r
  margin-top: 7px;\r
}\r
.dsh-wsl-select-wrap {\r
  position: relative;\r
}\r
.dsh-wsl-select-wrap > svg {\r
  position: absolute;\r
  right: 11px;\r
  top: 13px;\r
  pointer-events: none;\r
  color: var(--dsw-alias-label-secondary);\r
}\r
.dsh-wsl-select-wrap select {\r
  appearance: none;\r
  font: inherit;\r
  font-size: 13px;\r
  width: 100%;\r
  height: 40px;\r
  padding: 0 32px 0 12px;\r
  border: 1px solid var(--wsl-border);\r
  border-radius: var(--dsw-radius-md);\r
  color: var(--dsw-alias-label-primary);\r
  background: var(--dsw-alias-bg-layer-1);\r
  cursor: pointer;\r
}\r
.dsh-wsl-select-wrap select:disabled {\r
  opacity: 0.55;\r
  cursor: default;\r
}\r
.dsh-wsl-directory-row {\r
  display: flex;\r
  align-items: center;\r
  gap: 8px;\r
}\r
.dsh-wsl-page .dsh-wsl-directory-input {\r
  height: 40px;\r
  flex: 1;\r
  min-width: 0;\r
  padding: 0 12px;\r
}\r
.dsh-wsl-directory-input input {\r
  font-family: var(--ds-font-family-code);\r
  font-size: 13px;\r
  min-width: 0;\r
}\r
.dsh-wsl-directory-row > button {\r
  height: 40px;\r
  flex-shrink: 0;\r
}\r
.dsh-wsl-advanced {\r
  margin: 0 22px 18px;\r
  font-size: 12px;\r
}\r
.dsh-wsl-advanced summary,\r
.dsh-wsl-diagnostics summary {\r
  display: flex;\r
  gap: 6px;\r
  align-items: center;\r
  width: fit-content;\r
  list-style: none;\r
  cursor: pointer;\r
  color: var(--dsw-alias-label-secondary);\r
  border-radius: 4px;\r
}\r
.dsh-wsl-page summary::-webkit-details-marker {\r
  display: none;\r
}\r
.dsh-wsl-page details[open] > summary > svg {\r
  transform: rotate(180deg);\r
}\r
.dsh-wsl-user-field {\r
  margin-top: 14px;\r
  max-width: 320px;\r
}\r
.dsh-wsl-user-field > span {\r
  width: 100%;\r
}\r
.dsh-wsl-card-actions {\r
  display: flex;\r
  flex-wrap: wrap;\r
  justify-content: space-between;\r
  align-items: center;\r
  gap: 12px;\r
  padding: 16px 22px;\r
  border-top: 1px solid var(--wsl-border);\r
}\r
.dsh-wsl-action-primary {\r
  display: flex;\r
  align-items: center;\r
  flex-wrap: wrap;\r
  gap: 12px;\r
}\r
.dsh-wsl-native-card {\r
  padding: 22px;\r
}\r
.dsh-wsl-native-copy h3 {\r
  font-size: 14px;\r
  font-weight: 500;\r
  line-height: 22px;\r
}\r
.dsh-wsl-native-description {\r
  color: var(--dsw-alias-label-secondary);\r
  font-size: 13px;\r
  margin-top: 18px !important;\r
}\r
.dsh-wsl-native-actions {\r
  display: flex;\r
  align-items: center;\r
  flex-wrap: wrap;\r
  gap: 8px;\r
  margin-top: 20px;\r
}\r
.dsh-wsl-native-status {\r
  display: flex;\r
  align-items: flex-start;\r
  gap: 8px;\r
  padding: 12px 14px;\r
  margin-top: 14px;\r
  border-radius: var(--dsw-radius-sm);\r
  background: var(--dsw-alias-bg-module-platform);\r
  color: var(--dsw-alias-label-secondary);\r
  font-size: 12px;\r
  overflow-wrap: anywhere;\r
  max-height: 110px;\r
  overflow: auto;\r
}\r
.dsh-wsl-native-status > :first-child {\r
  margin-top: 5px;\r
  flex-shrink: 0;\r
}\r
.dsh-wsl-open-link {\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  gap: 8px;\r
  height: 36px;\r
  padding: 0 14px;\r
  border-radius: var(--dsw-radius-md);\r
  text-decoration: none;\r
  background: var(--dsw-alias-button-primary-fill);\r
  color: var(--dsw-alias-label-primary-foreground);\r
  font-size: 14px;\r
  font-weight: 500;\r
}\r
.dsh-wsl-open-link:hover {\r
  background: var(--dsw-alias-button-primary-hover);\r
}\r
.dsh-wsl-lock-note {\r
  padding: 0 22px 16px;\r
  color: var(--dsw-alias-label-secondary);\r
  font-size: 12px;\r
}\r
.dsh-wsl-help {\r
  display: flex;\r
  align-items: flex-start;\r
  gap: 10px;\r
  color: var(--dsw-alias-label-tertiary);\r
  font-size: 12px;\r
  line-height: 20px;\r
}\r
.dsh-wsl-help > svg {\r
  flex: none;\r
  margin-top: 1px;\r
}\r
.dsh-wsl-notice {\r
  display: flex;\r
  align-items: flex-start;\r
  gap: 9px;\r
  padding: 12px 16px;\r
  border: 1px solid var(--wsl-border);\r
  background: var(--dsw-alias-bg-module-platform);\r
  border-radius: var(--dsw-radius-md);\r
  font-size: 13px;\r
  overflow-wrap: anywhere;\r
}\r
.dsh-wsl-notice > :first-child {\r
  margin-top: 5px;\r
  flex: none;\r
}\r
.dsh-wsl-notice.is-error {\r
  color: var(--dsw-alias-state-error-primary);\r
}\r
.dsh-wsl-diagnostics {\r
  border-top: 1px solid var(--wsl-border);\r
  padding-top: 16px;\r
  font-size: 12px;\r
}\r
.dsh-wsl-diagnostics-body {\r
  padding-top: 16px;\r
}\r
.dsh-wsl-diagnostics dl {\r
  display: grid;\r
  grid-template-columns: repeat(3, minmax(0, 1fr));\r
  gap: 14px 24px;\r
}\r
.dsh-wsl-diagnostics dt {\r
  color: var(--dsw-alias-label-tertiary);\r
}\r
.dsh-wsl-diagnostics dd {\r
  color: var(--dsw-alias-label-secondary);\r
  overflow-wrap: anywhere;\r
  margin-top: 2px;\r
}\r
.dsh-wsl-disconnect-row {\r
  display: flex;\r
  justify-content: space-between;\r
  align-items: center;\r
  gap: 20px;\r
  margin-top: 20px;\r
}\r
.dsh-wsl-disconnect-row p {\r
  color: var(--dsw-alias-label-tertiary);\r
}\r
.dsh-wsl-disconnect-row button {\r
  flex-shrink: 0;\r
}\r
.dsh-wsl-picker {\r
  width: min(640px, 100%);\r
  max-height: 100%;\r
  color: var(--dsw-alias-label-primary);\r
  font-family: var(--dsw-font-family);\r
}\r
.dsh-wsl-picker-content {\r
  min-height: 0;\r
  overflow-y: auto;\r
}\r
.dsh-wsl-pathbar {\r
  display: flex;\r
  gap: 8px;\r
  align-items: center;\r
}\r
.dsh-wsl-picker .dsh-wsl-pathinput {\r
  height: 36px;\r
  flex: 1;\r
  min-width: 0;\r
}\r
.dsh-wsl-pathinput input {\r
  font-family: var(--ds-font-family-code);\r
  font-size: 13px;\r
}\r
.dsh-wsl-folder-meta {\r
  display: flex;\r
  flex-wrap: wrap;\r
  justify-content: space-between;\r
  gap: 12px;\r
  align-items: center;\r
  margin: 18px 0 8px;\r
  font-size: 12px;\r
  color: var(--dsw-alias-label-tertiary);\r
}\r
.dsh-wsl-folder-meta label {\r
  display: inline-flex;\r
  align-items: center;\r
  gap: 5px;\r
  cursor: pointer;\r
}\r
.dsh-wsl-folder-meta input {\r
  margin: 0;\r
  accent-color: var(--dsw-alias-button-primary-fill);\r
}\r
.dsh-wsl-folder-list {\r
  min-height: 220px;\r
  height: min(38vh, 330px);\r
  overflow-y: auto;\r
  overscroll-behavior: contain;\r
  border-top: 1px solid var(--dsw-alias-border-l4);\r
  border-bottom: 1px solid var(--dsw-alias-border-l4);\r
  padding: 6px 0;\r
}\r
.dsh-wsl-folder {\r
  border: 0;\r
  background: transparent;\r
  color: var(--dsw-alias-label-secondary);\r
  display: flex;\r
  gap: 12px;\r
  align-items: center;\r
  width: 100%;\r
  padding: 10px;\r
  text-align: left;\r
  border-radius: var(--dsw-radius-sm);\r
  font: inherit;\r
  font-size: 13px;\r
  cursor: pointer;\r
}\r
.dsh-wsl-folder:hover {\r
  background: var(--dsw-alias-interactive-bg-hover);\r
}\r
.dsh-wsl-folder:disabled {\r
  opacity: 0.5;\r
  cursor: default;\r
}\r
.dsh-wsl-folder > span {\r
  flex: 1;\r
  overflow-wrap: anywhere;\r
}\r
.dsh-wsl-folder > svg {\r
  flex-shrink: 0;\r
}\r
.dsh-wsl-folder > small {\r
  color: var(--dsw-alias-label-tertiary);\r
  font-size: 11px;\r
}\r
.dsh-wsl-empty {\r
  display: flex;\r
  flex-direction: column;\r
  align-items: center;\r
  justify-content: center;\r
  gap: 14px;\r
  padding: 48px 20px;\r
  color: var(--dsw-alias-label-tertiary);\r
  font-size: 13px;\r
  text-align: center;\r
}\r
.dsh-wsl-picker-hint {\r
  margin: 12px 0 0;\r
  font-size: 12px;\r
  color: var(--dsw-alias-label-tertiary);\r
  overflow-wrap: anywhere;\r
}\r
.dsh-wsl-inline-error {\r
  display: flex;\r
  flex-direction: column;\r
  align-items: flex-start;\r
  gap: 12px;\r
  padding: 14px 10px;\r
  font-size: 13px;\r
  color: var(--dsw-alias-state-error-primary);\r
  overflow-wrap: anywhere;\r
}\r
.dsh-wsl-picker .dsh-wsl-load-more {\r
  display: flex;\r
  margin: 8px auto;\r
}\r
.dsh-wsl-page :where(a, button, select, summary):focus-visible,\r
.dsh-wsl-picker :where(button, input):focus-visible {\r
  outline: 2px solid var(--dsw-alias-state-business-primary);\r
  outline-offset: 3px;\r
}\r
@container (max-width: 580px) {\r
  .dsh-wsl-host-grid {\r
    grid-template-columns: 1fr;\r
    gap: 12px;\r
  }\r
  .dsh-wsl-host-card {\r
    padding: 18px;\r
  }\r
  .dsh-wsl-host-head {\r
    margin-bottom: 12px;\r
  }\r
  .dsh-wsl-host-actions {\r
    padding-top: 18px;\r
  }\r
  .dsh-wsl-fields {\r
    grid-template-columns: 1fr;\r
    gap: 16px;\r
  }\r
  .dsh-wsl-environment,\r
  .dsh-wsl-native-head {\r
    flex-wrap: wrap;\r
  }\r
  .dsh-wsl-environment-copy,\r
  .dsh-wsl-native-copy {\r
    flex-basis: calc(100% - 54px);\r
  }\r
  .dsh-wsl-environment > .dsh-wsl-badge,\r
  .dsh-wsl-native-head > .dsh-wsl-badge {\r
    margin-left: 54px;\r
  }\r
  .dsh-wsl-diagnostics dl {\r
    grid-template-columns: repeat(2, minmax(0, 1fr));\r
  }\r
  .dsh-wsl-disconnect-row {\r
    align-items: flex-start;\r
    flex-direction: column;\r
    gap: 12px;\r
  }\r
}\r
@media (max-width: 520px) {\r
  .dsh-wsl-recents {\r
    margin-left: 16px;\r
    margin-right: 16px;\r
  }\r
  .dsh-wsl-page {\r
    padding: 20px 16px 32px;\r
    gap: 22px;\r
  }\r
  .dsh-wsl-environment,\r
  .dsh-wsl-native-card {\r
    padding: 16px;\r
  }\r
  .dsh-wsl-fields {\r
    padding: 18px 16px 12px;\r
  }\r
  .dsh-wsl-advanced {\r
    margin: 0 16px 16px;\r
  }\r
  .dsh-wsl-card-actions {\r
    padding: 14px 16px;\r
  }\r
  .dsh-wsl-picker .dsh-wsl-folder-list {\r
    min-height: 140px;\r
  }\r
}\r
[data-dsh-wsl-replaced] { display:none !important; }
.dsh-wsl-new-pair { display:flex; gap:6px; margin:0 2px 12px; }
.dsh-wsl-new-pair > button { display:flex; align-items:center; justify-content:center; gap:7px; flex:1; min-width:0; height:38px; border:1px solid var(--dsw-alias-border-l4); border-radius:var(--dsw-radius-button,10px); font:14px var(--dsw-font-family); cursor:pointer; transition:background .12s ease; }
.dsh-wsl-new-windows { color:var(--dsw-alias-label-primary); background:var(--dsw-alias-bg-base); }
.dsh-wsl-new-pair > .dsh-wsl-new-linux { color:var(--dsw-alias-label-primary-foreground); background:var(--dsw-alias-button-primary-fill); border-color:transparent; }\r
.dsh-wsl-new-pair > .dsh-wsl-new-linux:hover { background:var(--dsw-alias-button-primary-hover); }\r
.dsh-wsl-new-pair > button:focus-visible { outline:2px solid var(--dsw-alias-label-primary); outline-offset:2px; }\r
.dsh-wsl-new-pair > button:hover { background:var(--dsw-alias-interactive-bg-hover); }
.dsh-wsl-new-pair > button:disabled { opacity:.5; cursor:default; }
.dsh-wsl-new-pair.is-narrow { flex-direction:column; }
.dsh-wsl-new-pair.is-narrow span { display:none; }
.dsh-wsl-new-pair.is-narrow button { flex:none; }
.dsh-wsl-native-toggle { margin-right:auto; }
.dsh-wsl-workspace-mark { flex:none; font:10px/16px var(--dsw-font-family); color:var(--dsw-alias-label-tertiary); border:1px solid var(--dsw-alias-border-l4); border-radius:4px; padding:0 4px; margin-left:5px; }
.dsh-wsl-session-mark { margin-left:2px; margin-right:4px; white-space:nowrap; pointer-events:none; }\r
.dsh-wsl-startup-setting { display:flex; align-items:center; justify-content:space-between; gap:18px; padding:12px 16px; border:1px solid var(--dsw-alias-border-l4); border-radius:10px; }\r
.dsh-wsl-startup-setting > div { display:flex; flex-direction:column; gap:4px; min-width:0; }\r
.dsh-wsl-startup-setting strong { font-size:13px; font-weight:500; }\r
.dsh-wsl-startup-setting small { color:var(--dsw-alias-label-tertiary); font-size:12px; line-height:1.5; }\r
.dsh-wsl-row-action { display:inline-flex; align-items:center; justify-content:center; width:24px; height:24px; padding:0; border:0; border-radius:5px; color:var(--dsw-alias-label-secondary); background:transparent; cursor:pointer; }
.dsh-wsl-row-action:hover { background:var(--dsw-alias-interactive-bg-hover); }
.dsh-wsl-page .dsh-wsl-inheritance { padding:20px; }
.dsh-wsl-page .dsh-wsl-inheritance > p { margin:0 0 18px; font-size:13px; }
.dsh-wsl-inherit-options { display:grid; grid-template-columns:repeat(auto-fit,minmax(190px,1fr)); gap:12px; }
.dsh-wsl-inherit-option { display:flex; align-items:center; justify-content:space-between; gap:16px; padding:12px 14px; background:var(--dsw-alias-bg-base); border:1px solid var(--dsw-alias-border-l4); border-radius:10px; }
.dsh-wsl-inherit-option strong { display:block; font-size:13px; font-weight:500; }
.dsh-wsl-inherit-option small { display:block; margin-top:3px; font-size:11px; color:var(--dsw-alias-label-tertiary); }
.dsh-wsl-dialog-form { display:flex; flex-direction:column; gap:16px; padding:8px 0; }
.dsh-wsl-dialog-form label { display:flex; flex-direction:column; gap:7px; font-size:13px; }
.dsh-wsl-dialog-form select, .dsh-wsl-dialog-form textarea { width:100%; box-sizing:border-box; padding:9px 11px; border:1px solid var(--dsw-alias-border-l4); border-radius:8px; background:var(--dsw-alias-bg-base); color:var(--dsw-alias-label-primary); font:inherit; }
.dsh-wsl-dialog-form textarea { min-height:180px; resize:vertical; line-height:1.6; }
.dsh-wsl-dialog-form .dsh-wsl-pathbar > input { min-width:0; flex:1; }
.dsh-wsl-folder-create { margin:0 0 8px; }
@media (prefers-reduced-motion:reduce) { .dsh-wsl-new-pair > button { transition:none; } }\r
.dsh-wsl-handoff-preview { white-space:pre-wrap; overflow-wrap:anywhere; max-height:220px; overflow:auto; padding:12px; border-radius:8px; background:var(--dsw-alias-interactive-bg-hover); font:12px/1.6 var(--dsw-font-family); }\r
.dsh-wsl-operation-error { position:fixed; right:20px; bottom:20px; z-index:150; display:flex; align-items:center; gap:12px; max-width:min(520px,85vw); padding:12px 16px; border:1px solid var(--dsw-alias-border-l4); border-radius:12px; color:var(--dsw-alias-label-primary); background:var(--dsw-alias-bg-base); box-shadow:0 4px 22px #0002; pointer-events:auto; }\r
`;var ae=require("react"),j=require("@deepseek-ai/dsh-client-ui-primitives"),A=require("react/jsx-runtime");function pe({size:e=20}){return(0,A.jsxs)("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.35",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:[(0,A.jsx)("rect",{x:"3",y:"4.5",width:"18",height:"15",rx:"3"}),(0,A.jsx)("path",{d:"m7 9 3 3-3 3m6 0h4"})]})}function ze({size:e=20}){return(0,A.jsxs)("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.35",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:[(0,A.jsx)("rect",{x:"3",y:"4",width:"18",height:"13",rx:"2.5"}),(0,A.jsx)("path",{d:"M8 21h8m-4-4v4"})]})}function ke({size:e=16}){return(0,A.jsx)("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:(0,A.jsx)("path",{d:"M14 4h6v6m0-6L10 14m0-10H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4"})})}function Ce({state:e="idle",children:n}){return(0,A.jsxs)("span",{className:"dsh-wsl-badge",children:[(0,A.jsx)(j.StateDot,{state:e,size:e==="ongoing"?12:7}),n]})}function fe(e,n=[]){return{distro:e.distro||n.find(t=>t.isDefault)?.name||n[0]?.name||"",user:e.user||"",directory:e.directory||""}}var Ot=e=>e.replace(/\/+$/,"").replace(/\/[^/]*$/,"")||"/",Et=(e,n)=>`${e.replace(/\/+$/,"")}/${n}`;function De(e){return/ENOENT/.test(e.message)?"\u627E\u4E0D\u5230\u8FD9\u4E2A\u6587\u4EF6\u5939\uFF0C\u8BF7\u68C0\u67E5\u8DEF\u5F84\u540E\u91CD\u8BD5\u3002":/EACCES|EPERM/.test(e.message)?"\u5F53\u524D Linux \u7528\u6237\u6CA1\u6709\u6743\u9650\u8BFB\u53D6\u8FD9\u4E2A\u6587\u4EF6\u5939\u3002":/ENOTDIR/.test(e.message)?"\u8FD9\u4E2A\u8DEF\u5F84\u6307\u5411\u6587\u4EF6\uFF0C\u8BF7\u9009\u62E9\u4E00\u4E2A\u6587\u4EF6\u5939\u3002":e.message}function Oe({api:e,distro:n,user:t,initialPath:r,onClose:s,onSelect:a,allowCreate:l=!1}){let[i,h]=(0,ae.useState)(null),[p,m]=(0,ae.useState)(r),[y,c]=(0,ae.useState)(!1),[u,b]=(0,ae.useState)(!1),[k,g]=(0,ae.useState)(""),[O,C]=(0,ae.useState)(null),L=(0,ae.useRef)(0),w=(0,ae.useCallback)(async(I,E=0,f=!1)=>{let D=++L.current;b(!0),g("");try{let V=I?null:await e("connect",{distro:n,user:t}),se=await e("browse",{distro:n,user:t,path:I||V.home,offset:E,hidden:f});if(D!==L.current)return;h(J=>({...se,entries:E?[...J?.entries||[],...se.entries]:se.entries})),m(se.path)}catch(V){D===L.current&&g(De(V))}finally{D===L.current&&b(!1)}},[e,n,t]);(0,ae.useEffect)(()=>(w(r),()=>{L.current++}),[w,r]);let W=(i?.entries||[]).filter(I=>I.type==="directory"||I.type==="symlink").sort((I,E)=>I.name.localeCompare(E.name,"zh-CN",{numeric:!0})),S=I=>{w(I,0,y)};return(0,A.jsxs)(j.Modal,{open:!0,onClose:s,title:"\u9009\u62E9 Linux \u6587\u4EF6\u5939",closeLabel:"\u5173\u95ED\u6587\u4EF6\u5939\u9009\u62E9",description:`${n} \u4E2D\u7684 Linux \u6587\u4EF6\u5939\u3002`,className:"dsh-wsl-picker",contentClassName:"dsh-wsl-picker-content",footer:(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(j.Button,{onClick:s,children:"\u53D6\u6D88"}),(0,A.jsx)(j.Button,{variant:"primary",disabled:u||!i||!!k||p!==i.path,onClick:()=>a(i.path),children:"\u9009\u62E9\u6B64\u6587\u4EF6\u5939"})]}),children:[(0,A.jsxs)("form",{className:"dsh-wsl-pathbar",onSubmit:I=>{I.preventDefault(),S(p)},children:[(0,A.jsx)(j.Button,{variant:"outline",title:"\u8FD4\u56DE\u4E0A\u7EA7","aria-label":"\u8FD4\u56DE\u4E0A\u7EA7",disabled:u||!i||i.path==="/",icon:(0,A.jsx)(j.IconChevronLeftOutlineMedium,{}),onClick:()=>S(Ot(i.path))}),(0,A.jsx)(j.Input,{"aria-label":"\u6587\u4EF6\u5939\u8DEF\u5F84","data-modal-autofocus":!0,value:p,onChange:I=>m(I.target.value),spellCheck:!1,className:"dsh-wsl-pathinput",placeholder:"/home"}),(0,A.jsx)(j.Button,{variant:"outline",type:"submit",disabled:u||!p.trim(),children:"\u524D\u5F80"})]}),(0,A.jsxs)("div",{className:"dsh-wsl-folder-meta",children:[(0,A.jsxs)("span",{children:[W.length," \u4E2A\u6587\u4EF6\u5939",i?.nextOffset!=null?" \xB7 \u8FD8\u6709\u66F4\u591A":""]}),(0,A.jsxs)("label",{children:[(0,A.jsx)("input",{type:"checkbox",checked:y,disabled:u,onChange:I=>{let E=I.target.checked;c(E),w(i?.path||p,0,E)}}),"\u663E\u793A\u9690\u85CF\u9879"]})]}),l&&(0,A.jsx)("div",{className:"dsh-wsl-folder-create",children:O===null?(0,A.jsx)(j.Button,{size:"sm",variant:"ghost",disabled:u||!i||!!k,onClick:()=>C(""),children:"\uFF0B \u65B0\u5EFA\u6587\u4EF6\u5939"}):(0,A.jsxs)("form",{className:"dsh-wsl-pathbar",onSubmit:async I=>{if(I.preventDefault(),!(u||!O.trim())){b(!0),g("");try{let E=await e("directory/create",{distro:n,user:t,parent:i.path,name:O.trim()});C(null),await w(E.path,0,y)}catch(E){g(E.message),b(!1)}}},children:[(0,A.jsx)(j.Input,{"aria-label":"\u65B0\u6587\u4EF6\u5939\u540D\u79F0",value:O,placeholder:"\u6587\u4EF6\u5939\u540D\u79F0",maxLength:255,onChange:I=>C(I.target.value)}),(0,A.jsx)(j.Button,{type:"submit",disabled:u||!O.trim(),children:"\u521B\u5EFA"}),(0,A.jsx)(j.Button,{disabled:u,onClick:()=>C(null),children:"\u53D6\u6D88"})]})}),(0,A.jsxs)("div",{className:"dsh-wsl-folder-list","aria-label":"\u6587\u4EF6\u5939\u5217\u8868","aria-busy":u,children:[k&&(0,A.jsxs)("div",{className:"dsh-wsl-inline-error",role:"alert",children:[k,(0,A.jsx)(j.Button,{size:"sm",onClick:()=>S(p),children:"\u91CD\u8BD5"})]}),!k&&W.map(I=>(0,A.jsxs)("button",{type:"button",className:"dsh-wsl-folder",disabled:u,onClick:()=>S(Et(i.path,I.name)),children:[(0,A.jsx)(j.IconFolderCloseRegular,{size:18}),(0,A.jsx)("span",{children:I.name}),I.type==="symlink"&&(0,A.jsx)("small",{children:"\u94FE\u63A5"}),(0,A.jsx)(j.IconChevronRightOutlineRegular,{size:14})]},I.name)),u&&(0,A.jsxs)("div",{className:"dsh-wsl-empty",role:"status",children:[(0,A.jsx)(j.StateDot,{state:"ongoing"}),"\u6B63\u5728\u8BFB\u53D6\u6587\u4EF6\u5939\u2026"]}),!u&&!k&&!W.length&&(0,A.jsxs)("div",{className:"dsh-wsl-empty",children:[(0,A.jsx)(j.IconFolderOpenOutlineRegular,{size:28}),(0,A.jsx)("span",{children:i?.nextOffset!=null?"\u8FD9\u6279\u6761\u76EE\u4E2D\u6CA1\u6709\u6587\u4EF6\u5939":"\u6B64\u76EE\u5F55\u4E0B\u6CA1\u6709\u53EF\u663E\u793A\u7684\u6587\u4EF6\u5939"})]}),!u&&!k&&i?.nextOffset!=null&&(0,A.jsx)(j.Button,{className:"dsh-wsl-load-more",onClick:()=>w(i.path,i.nextOffset,y),children:"\u52A0\u8F7D\u66F4\u591A"})]}),(0,A.jsxs)("p",{className:"dsh-wsl-picker-hint",children:[i?.path||"\u9009\u62E9\u4E00\u4E2A\u76EE\u5F55",p!==i?.path&&i?" \xB7 \u70B9\u51FB\u201C\u524D\u5F80\u201D\u67E5\u770B\u8F93\u5165\u7684\u8DEF\u5F84":""]})]})}var G=require("react"),R=require("@deepseek-ai/dsh-client-ui-primitives");var ue="dsh-app://app";function te(e){return e===ue||e===ue+"/"?ue:ge(e)}function Pe(e){return te(e)===ue?"dsh://open":ge(e)}function ge(e){if(!e)return null;try{let n=new URL(e);return!["http:","https:"].includes(n.protocol)||!["127.0.0.1","localhost","[::1]"].includes(n.hostname)||n.username||n.password||n.search||n.hash||n.pathname!=="/"?null:n.origin}catch{return null}}function me(e){if(!e?.startsWith("#dsh-wsl=")||e.length>16e3)return null;try{let n=JSON.parse(decodeURIComponent(e.slice(9)));return typeof n.id!="string"||n.id.length>100||typeof n.distro!="string"||typeof n.user!="string"||typeof n.directory!="string"||!n.directory.startsWith("/")||/[\x00-\x1f]/.test(n.directory)?null:{id:n.id,distro:n.distro,user:n.user,directory:n.directory,parentOrigin:te(n.parentOrigin),...n.proof?{issuedAt:n.issuedAt,proof:n.proof}:{}}}catch{return null}}var Ve=new WeakMap;function Te(e,n){let t=Ve.get(e);if(t||Ve.set(e,t=new Map),t.has(n))return t.get(n);let r=Promise.resolve().then(async()=>{try{return await e.uiWorkspace.connectWorkspace(n)}catch(s){if(s?.name!=="SessionCreateError"||s.rpcError?.code!=="agent-preset/not-found")throw s;return e.sessions.create({workspaceId:n})}}).finally(()=>t.delete(n));return t.set(n,r),r}async function ve(e,n,t){let r=e.layout.beginNavigation(),s=await Te(e,n);return!r.aborted&&!t?.aborted&&e.uiWorkspace.openSession(s),s}async function Je(e,n){let t=e.workspaces.list.getSnapshot(),r=e.sessions.list.getSnapshot(),s=r.ids.find(l=>r.byId[l]?.retainedBy?.mainView>0),a=n??t.items.find(l=>l.sessionIds.includes(s))?.workspaceId;if(a===void 0&&t.phase==="ready"&&r.phase==="ready"){let l=Number.NEGATIVE_INFINITY;for(let i of t.items){let h=i.sessionIds.map(m=>r.byId[m]?.updatedAt).filter(Number.isFinite),p=h.length?Math.max(...h):Date.parse(i.createdAt);(a===void 0||p>l)&&(a=i.workspaceId,l=p)}}a===void 0?e.uiWorkspace.startSession():await ve(e,a)}var Se="dsh-wsl-conversation/1",he="dsh-wsl-conversation",$e=/^[a-zA-Z0-9-]{32,64}$/,we=(e,n)=>typeof e=="string"?e.slice(0,n):"";function be(e){return JSON.stringify([e.distro||"",e.user||""])}function Fe(e,n,t){let r=new URL(e),s=me(r.hash);if(!ge(r.origin)||!te(t)||!$e.test(n)||!s?.proof||s.parentOrigin!==te(t))throw new Error("\u65E0\u6CD5\u9A8C\u8BC1\u540C\u7A97\u53E3\u5BF9\u8BDD\u7684\u76EE\u6807\u5730\u5740\uFF0C\u8BF7\u91CD\u65B0\u8FDB\u5165 Linux\u3002");let a=JSON.parse(decodeURIComponent(r.hash.slice(9))),l={channel:n,...te(t)===ue?{transport:"desktop"}:{}};return r.hash="dsh-wsl="+encodeURIComponent(JSON.stringify({...a,embed:l})),r.href}function Ke(e){let n=me(e);if(!n?.proof||!n.parentOrigin)return null;try{let{embed:t}=JSON.parse(decodeURIComponent(e.slice(9)));return!$e.test(t?.channel||"")||t.transport!==void 0&&(t.transport!=="desktop"||n.parentOrigin!==ue)?null:{channel:t.channel,parentOrigin:n.parentOrigin,...t.transport?{transport:t.transport}:{}}}catch{return null}}function Ee(e,{origin:n,source:t,channel:r}){return!!t&&e.source===t&&e.origin===n&&!!ge(n)&&$e.test(r||"")&&e.data?.protocol===Se&&e.data.channel===r&&["catalog","request","result","return","sidebar"].includes(e.data.type)}function Ie(e){if(!e||!Array.isArray(e.rows)||e.rows.length>5e3)return null;let n=new Set,t=[];for(let a of e.rows)!a||typeof a.id!="string"||!a.id||a.id.length>200||n.has(a.id)||(n.add(a.id),t.push({id:a.id,title:we(a.title,500),cwd:we(a.cwd,4096),workspaceId:we(a.workspaceId,200),workspaceTitle:we(a.workspaceTitle,500),running:a.running===!0,blank:a.blank===!0,pinned:a.pinned===!0,archived:a.archived===!0,updatedAt:Number.isFinite(a.updatedAt)?a.updatedAt:0}));let r=new Set,s=[];for(let a of(Array.isArray(e.workspaces)?e.workspaces:[]).slice(0,2048))!a||typeof a.workspaceId!="string"||!a.workspaceId||a.workspaceId.length>200||r.has(a.workspaceId)||(r.add(a.workspaceId),s.push({workspaceId:a.workspaceId,path:we(a.path,4096),title:we(a.title,500),sessionIds:[...new Set((Array.isArray(a.sessionIds)?a.sessionIds:[]).filter(l=>n.has(l)))],createdAt:we(a.createdAt,100),updatedAt:we(a.updatedAt,100)}));for(let a of t)a.workspaceId&&!r.has(a.workspaceId)&&(r.add(a.workspaceId),s.push({workspaceId:a.workspaceId,path:a.cwd,title:a.workspaceTitle,sessionIds:t.filter(l=>l.workspaceId===a.workspaceId).map(l=>l.id),createdAt:"",updatedAt:""}));return{rows:t,workspaces:s,selectedId:t.some(a=>a.id===e.selectedId)?e.selectedId:null,connected:e.connected===!0,phase:e.phase==="ready"?"ready":"loading"}}function Le(e){let n=e.sessions.list.getSnapshot(),t=e.workspaces.list.getSnapshot(),r=new Map;for(let i of t.items||[])for(let h of i.sessionIds)r.set(h,i);let s=new Set(t.archivedSessionIds||[]),a=new Set(t.pinnedSessionIds||[]),l=n.ids.map(i=>n.byId[i]).filter(i=>i&&!i.parentId).slice(0,5e3);return Ie({phase:n.phase==="ready"&&t.phase==="ready"?"ready":"loading",connected:e.connection.state.getSnapshot()==="connected",workspaces:t.items,selectedId:l.find(i=>i.retainedBy?.mainView>0)?.id,rows:l.map(i=>({id:i.id,title:i.title||(i.blank?"\u65B0\u5BF9\u8BDD":i.displayTitle),cwd:i.cwd,workspaceId:r.get(i.id)?.workspaceId,workspaceTitle:r.get(i.id)?.title||"",running:i.running,blank:i.blank,updatedAt:i.updatedAt,archived:s.has(i.id),pinned:a.has(i.id)}))})}function je(e,n,{filter:t="all",query:r="",archived:s=!1}={}){let a=(e?.rows||[]).map(i=>({...i,environment:null,key:JSON.stringify(["windows",i.id])}));for(let i of n)for(let h of i.catalog?.rows||[])a.push({...h,environment:i,key:JSON.stringify(["wsl",i.key,h.id])});let l=r.trim().toLocaleLowerCase();return a.filter(i=>i.archived===s&&(t==="all"||t==="wsl"==!!i.environment)&&(!l||[i.title,i.cwd,i.environment?.settings.distro].join(" ").toLocaleLowerCase().includes(l))).sort((i,h)=>Number(h.pinned)-Number(i.pinned)||h.updatedAt-i.updatedAt||i.key.localeCompare(h.key))}var At=["workspace.start","workspace.rename","workspace.delete","workspace.reorder","session.rename","session.fork","search"],Xe=new Set(["refresh","theme","chrome","navigate","pin","unpin","archive","unarchive","handoff.read","handoff.deliver",...At]);function Ge(e){if(typeof e!="string"||!e.trim()||e.length>500||/[\x00-\x1f]/.test(e))throw new Error("\u540D\u79F0\u5FC5\u987B\u662F 1\u2013500 \u4E2A\u5B57\u7B26\u3002");return e.trim()}async function Ze(e,n,t){if(n==="search"){if(typeof t.query!="string"||t.query.length>2e3)throw new Error("\u641C\u7D22\u6587\u5B57\u8FC7\u957F\u3002");let s=await e.sessions.search(t.query);if(!s.ok)throw new Error(s.error.message);return{items:s.value.items.slice(0,20).map(a=>({sessionId:a.sessionId,snippet:a.snippet.slice(0,1e3)})),hasMore:s.value.hasMore}}if(n.startsWith("workspace.")){let s=e.workspaces.list.getSnapshot().items;if(!s.some(a=>a.workspaceId===t.workspaceId))throw new Error("\u8FD9\u4E2A WSL \u5DE5\u4F5C\u533A\u5DF2\u4E0D\u5B58\u5728\uFF0C\u8BF7\u5237\u65B0\u5217\u8868\u3002");if(n==="workspace.start"){await ve(e,t.workspaceId);return}if(n==="workspace.rename"){await e.workspaces.rename(t.workspaceId,Ge(t.title));return}if(n==="workspace.delete"){await e.workspaces.delete(t.workspaceId);return}if(n==="workspace.reorder"){if(t.beforeId!==void 0&&!s.some(a=>a.workspaceId===t.beforeId))throw new Error("\u76EE\u6807\u5DE5\u4F5C\u533A\u5DF2\u4E0D\u5B58\u5728\uFF0C\u8BF7\u91CD\u8BD5\u3002");await e.workspaces.insertBefore(t.workspaceId,t.beforeId);return}}if(!e.sessions.list.getSnapshot().byId[t.sessionId])throw new Error("\u8FD9\u6761 WSL \u5BF9\u8BDD\u5DF2\u4E0D\u5B58\u5728\uFF0C\u8BF7\u5237\u65B0\u5217\u8868\u3002");if(n==="session.rename"){let s=Ge(t.title),a=await e.sessions.using(t.sessionId,{source:"workspaceOperation"},l=>l.binding.session.rename(s));if(!a.ok)throw new Error(a.error.message);return}if(n==="session.fork"){let s=await e.uiWorkspace.forkSession(t.sessionId);e.uiWorkspace.openSession(s);return}let r={pin:"pinSession",unpin:"unpinSession",archive:"archiveSession",unarchive:"unarchiveSession"};if(!r[n])throw new Error("\u5BF9\u8BDD\u64CD\u4F5C\u65E0\u6548\u3002");await e.uiWorkspace[r[n]](t.sessionId,n==="archive"?{stopActivity:t.stopActivity===!0}:void 0)}var ye="__DSH_WSL_DESKTOP_V1__";function Qe(e,n,{waitMs:t=2e4}={}){let r=0,s=0,a=null,l=!1,i,h=[],p=c=>{if(l||c!==e)throw new Error("WSL \u9875\u9762\u901A\u9053\u65E0\u6548\u6216\u5DF2\u5173\u95ED\u3002")},m=c=>({sequence:r,closed:l,catalog:s>c?a:null,signals:h.filter(u=>u.sequence>c)}),y=()=>i?.();return{api:Object.freeze({async request(c,u,b={}){if(p(c),!Xe.has(u)||!b||typeof b!="object"||Array.isArray(b)||JSON.stringify(b).length>131072)throw new Error("WSL \u9875\u9762\u64CD\u4F5C\u65E0\u6548\u3002");try{let k=await n(u,b);return k===void 0?{ok:!0}:{ok:!0,value:k}}catch(k){return{ok:!1,error:String(k?.message||k).slice(0,1e3)}}},next(c,u=0){if(p(c),!Number.isSafeInteger(u)||u<0||u>r)throw new Error("WSL \u9875\u9762\u6E38\u6807\u65E0\u6548\u3002");if(r>u)return Promise.resolve(m(u));if(i)throw new Error("WSL \u9875\u9762\u5DF2\u7ECF\u5B58\u5728\u7B49\u5F85\u4E2D\u7684\u8BA2\u9605\u3002");return new Promise(b=>{let k=()=>{clearTimeout(g),i=null,b(m(u))},g=setTimeout(k,t);i=k})}}),publish(c,u){if(!l){if(c==="catalog")a=u.catalog,s=++r;else if(c==="return"||c==="sidebar")h.push({sequence:++r,type:c}),h.length>16&&h.shift();else return;y()}},dispose(){l=!0,y(),h.length=0,a=null}}}var He=new WeakMap;function Ye(e){return He.has(e)||He.set(e,{writers:new Map,waiting:new Map}),He.get(e)}function et(e,n,t){let r=Ye(e);r.writers.set(n,t);for(let s of r.waiting.get(n)||[])s(t);return()=>{r.writers.get(n)===t&&r.writers.delete(n)}}function Bt(e,n){let t=Ye(e),r=t.writers.get(n);return r?Promise.resolve(r):new Promise((s,a)=>{let l,i=t.waiting.get(n)||new Set,h=()=>{clearTimeout(l),i.delete(p),i.size||t.waiting.delete(n)},p=m=>{h(),s(m)};i.add(p),t.waiting.set(n,i),l=setTimeout(()=>{h(),a(new Error("\u76EE\u6807\u8F93\u5165\u6846\u5C1A\u672A\u5C31\u7EEA\uFF0C\u8BF7\u6253\u5F00\u76EE\u6807\u5BF9\u8BDD\u540E\u91CD\u8BD5\u3002"))},1e4)})}function Mt(e,n=18e3){let t=[];for(let r of e){let s=r.event;if(r.type!=="event"||!["user/message","assistant/message"].includes(s?.type))continue;let l=((s.type==="user/message"?s.data:s.data.message)?.content||[]).filter(i=>i.type==="text"&&typeof i.text=="string").map(i=>i.text).join(`
`);l.trim()&&t.push(`${s.type==="user/message"?"\u7528\u6237":"\u52A9\u624B"}\uFF1A
${l}`)}return t.slice(-8).join(`

`).slice(-n)}function tt(e,n,t=""){let r=e.entry?`WSL \xB7 ${e.entry.settings.distro} \xB7 ${e.entry.settings.user||"\u9ED8\u8BA4\u7528\u6237"}`:"Windows",s=e.row.cwd||"",a=e.entry&&s.startsWith("/")?`\\\\wsl.localhost\\${e.entry.settings.distro}${s.replaceAll("/","\\")}`:/^[a-z]:[\\/]/i.test(s)?"/mnt/"+s[0].toLowerCase()+s.slice(2).replaceAll("\\","/"):"";return`\u8DE8\u73AF\u5883\u5DE5\u4F5C\u4EA4\u63A5
\u6765\u6E90\uFF1A${r}
\u6765\u6E90\u5BF9\u8BDD\uFF1A${e.row.title||"\u65B0\u5BF9\u8BDD"}
\u6765\u6E90\u5BF9\u8BDD ID\uFF1A${e.id}
\u6765\u6E90\u76EE\u5F55\uFF1A${s||"\u672A\u6307\u5B9A"}${a?`
\u8DE8\u7CFB\u7EDF\u8BBF\u95EE\u8DEF\u5F84\uFF08\u9ED8\u8BA4 WSL \u6302\u8F7D\u8BBE\u7F6E\uFF09\uFF1A${a}`:""}

\u5DE5\u4F5C\u8BF4\u660E\uFF1A
${n.trim()}${t?`

\u6700\u8FD1\u5BF9\u8BDD\u6458\u5F55\uFF08\u53C2\u8003\u6750\u6599\uFF09\uFF1A
${t}`:""}

\u8BF7\u5728\u5F53\u524D\u76EE\u6807\u73AF\u5883\u7EE7\u7EED\u5DE5\u4F5C\u3002\u5148\u6838\u5BF9\u6587\u4EF6\u4F4D\u7F6E\u548C\u5DF2\u6709\u4FEE\u6539\uFF1B\u4EA4\u63A5\u4E0D\u4F1A\u81EA\u52A8\u590D\u5236\u6587\u4EF6\u6216\u505C\u6B62\u6765\u6E90\u4EFB\u52A1\u3002`}function Ae(e,n=globalThis.localStorage){let t=new Map;return async(r,s)=>{if(r==="handoff.read"){if(!e.sessions.list.getSnapshot().byId[s.sessionId])throw new Error("\u6765\u6E90\u5BF9\u8BDD\u5DF2\u4E0D\u5B58\u5728\u3002");return e.sessions.using(s.sessionId,{source:"workspaceOperation"},p=>({text:Mt(p.binding.eventSource.getSnapshot().entries)}))}if(r!=="handoff.deliver"||!/^[a-f0-9-]{36}$/.test(s.transferId||"")||!["draft","send"].includes(s.mode)||typeof s.text!="string"||!s.text.trim()||s.text.length>24e3)throw new Error("\u4EA4\u63A5\u5185\u5BB9\u6216\u76EE\u6807\u65E0\u6548\u3002");let a="dsh-wsl-native:handoff:"+s.transferId;if(t.has(a))return t.get(a);let l;try{l=JSON.parse(n?.getItem(a)||"null")}catch{}if(l?.done)return{sessionId:l.sessionId,mode:l.mode};if(l?.pending)throw new Error(`\u8FD9\u6B21\u4EA4\u63A5\u5DF2\u7ECF\u63D0\u4EA4\uFF0C\u7ED3\u679C\u5C1A\u672A\u786E\u8BA4\u3002\u8BF7\u67E5\u770B\u76EE\u6807\u5BF9\u8BDD ${l.sessionId}\uFF0C\u4E0D\u4F1A\u81EA\u52A8\u91CD\u590D\u53D1\u9001\u3002`);let i=p=>{l=p;try{n?.setItem(a,JSON.stringify(p))}catch{}},h=(async()=>{let p=l?.sessionId||s.sessionId;if(!p){if(!e.workspaces.list.getSnapshot().items.some(m=>m.workspaceId===s.workspaceId))throw new Error("\u8BF7\u5148\u9009\u62E9\u76EE\u6807\u5DE5\u4F5C\u533A\u3002");p=await Te(e,s.workspaceId),i({sessionId:p})}if(e.sessions.list.getSnapshot().byId[p]||await e.sessions.refresh(),e.workspaces.list.getSnapshot().archivedSessionIds.includes(p))throw new Error("\u8BF7\u5148\u53D6\u6D88\u76EE\u6807\u5BF9\u8BDD\u7684\u5F52\u6863\u3002");return await e.sessions.using(p,{source:"workspaceOperation"},async m=>{if(s.mode==="draft"){let y=e.get("conversation");if(!y?.input)throw new Error("\u5F53\u524D DSH \u6CA1\u6709\u5BF9\u8BDD\u8F93\u5165\u63A5\u53E3\uFF0C\u8BF7\u66F4\u65B0 DSH\u3002");e.uiWorkspace.openSession(p);let c=await Bt(e,p),u=y.input.for(m.binding.ctx),b=u.state.getSnapshot();if(b.draft.trim()||c.getDraft().trim()||b.attachmentIds.length||b.phase!=="plain")throw new Error("\u76EE\u6807\u8F93\u5165\u6846\u5DF2\u6709\u8349\u7A3F\u6216\u6B63\u5728\u63D0\u4EA4\u3002\u8BF7\u5148\u5904\u7406\u8349\u7A3F\uFF0C\u6216\u9009\u62E9\u65B0\u5BF9\u8BDD\u3002");i({sessionId:p,mode:s.mode,pending:!0}),c.setDraft(s.text),u.setDraft(s.text)}else{i({sessionId:p,mode:s.mode,pending:!0});let y=await m.binding.session.prompt([{type:"text",text:s.text}],"queue");if(!y.ok)throw new Error(`\u4EA4\u63A5\u672A\u786E\u8BA4\uFF1A${y.error.message}\u3002\u8BF7\u67E5\u770B\u76EE\u6807\u5BF9\u8BDD\u540E\u518D\u51B3\u5B9A\u4E0B\u4E00\u6B65\u3002`);e.uiWorkspace.openSession(p)}}),i({sessionId:p,mode:s.mode,done:!0,time:Date.now()}),{sessionId:p,mode:s.mode}})();t.set(a,h);try{return await h}finally{t.delete(a)}}}function st(e,n,t,r){let s=r.transport==="desktop";if(!s&&window.parent===window||n.guest)return;let a,l="",i=!1,h=new AbortController,p=Ae(e),m={origin:r.parentOrigin,source:window.parent,channel:r.channel},y=s?Qe(r.channel,k):null;y&&Object.defineProperty(window,ye,{value:y.api,configurable:!0});let c=(C,L={})=>y?y.publish(C,L):m.source.postMessage({protocol:Se,channel:r.channel,type:C,...L},m.origin),u=(C=!1)=>{clearTimeout(a),a=setTimeout(()=>{if(i)return;let L=Le(e),w=JSON.stringify(L);(C||w!==l)&&(l=w,c("catalog",{catalog:L}))},50)},b=n.guest={compact:!0,returnWindows(){c("return")},toggleSidebar(){c("sidebar")},publish:u};document.documentElement.setAttribute("data-dsh-wsl-guest","");async function k(C,L={}){if(C==="handoff.read"||C==="handoff.deliver"){let W=await p(C,L);return u(!0),W}if(C==="refresh"){u(!0);return}if(C==="theme"){if(document.body.toggleAttribute("data-ds-dark-theme",L.dark===!0),document.documentElement.style.colorScheme=L.dark===!0?"dark":"light",Array.isArray(L.tokens))for(let[W,S]of L.tokens.slice(0,256))/^--(?:ds|dsw|dsh)-[\w-]+$/.test(W)&&typeof S=="string"&&S.length<500&&document.body.style.setProperty(W,S);return}if(C==="chrome"){b.compact=!0,(L.panel==="plugins"||L.panel===null)&&e.layout.selectPanel(L.panel),n.emit();return}if(C==="navigate"){h.abort(),h=new AbortController;let W=h.signal;if(L.sessionId){let S=e.sessions.list.getSnapshot().byId[L.sessionId];if(!S||S.parentId||e.workspaces.list.getSnapshot().archivedSessionIds.includes(S.id))throw new Error("\u8FD9\u6761 WSL \u5BF9\u8BDD\u5DF2\u5F52\u6863\u6216\u4E0D\u5728\u5F53\u524D\u73AF\u5883\u4E2D\uFF0C\u8BF7\u5237\u65B0\u5217\u8868\u3002");e.uiWorkspace.openSession(S.id)}else{if(!L.handoff)throw new Error("\u7F3A\u5C11\u5DF2\u9A8C\u8BC1\u7684\u5DE5\u4F5C\u533A\u4FE1\u606F\u3002");let S=await t("environment/adopt",L.handoff);if(W.aborted)return;if(L.create){let I=await e.workspaces.create({path:S.settings.directory});if(W.aborted)return;W.aborted||await ve(e,I.workspaceId,W)}else await Ne(e,S.settings.directory,W)}u(!0);return}let w=await Ze(e,C,L);return u(!0),w}let g=C=>{if(!Ee(C,m)||C.data.type!=="request")return;let{id:L,action:w,payload:W}=C.data;typeof L!="string"||L.length>100||typeof w!="string"||k(w,W).then(S=>c("result",{id:L,ok:!0,value:S}),S=>c("result",{id:L,ok:!1,error:String(S.message).slice(0,1e3)}))};s||window.addEventListener("message",g);let O=[e.sessions.list.subscribe(()=>u()),e.workspaces.list.subscribe(()=>u()),e.connection.state.subscribe(()=>u())];u(!0),n.emit(),b.dispose=()=>{i=!0,h.abort(),clearTimeout(a),window.removeEventListener("message",g),y?.dispose(),y&&window[ye]===y.api&&delete window[ye];for(let C of O)C();document.documentElement.removeAttribute("data-dsh-wsl-guest")}}var qe="dsh-wsl-native:";function Z(e,n,t=sessionStorage){try{if(n===void 0)return JSON.parse(t.getItem(qe+e)||"null");n===null?t.removeItem(qe+e):t.setItem(qe+e,JSON.stringify(n))}catch{}return null}function nt(e,n){return e.getSnapshot().phase==="ready"?Promise.resolve():new Promise((t,r)=>{let s=()=>{},a,l=h=>{s(),clearTimeout(a),n?.removeEventListener("abort",i),h?r(h):t()},i=()=>l(new Error("\u5DE5\u4F5C\u533A\u6253\u5F00\u5DF2\u53D6\u6D88\u3002"));s=e.subscribe(()=>{e.getSnapshot().phase==="ready"&&l()}),a=setTimeout(()=>l(new Error("DSH \u5DE5\u4F5C\u533A\u4ECD\u5728\u52A0\u8F7D\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002")),3e4),n?.addEventListener("abort",i,{once:!0}),n?.aborted?i():e.getSnapshot().phase==="ready"&&l()})}async function Ne(e,n,t){if(await Promise.all([nt(e.workspaces.list,t),nt(e.sessions.list,t)]),t?.aborted)return!1;let r=e.layout.beginNavigation(),s=await e.workspaces.create({path:n});if(await e.sessions.refresh(),t?.aborted||r.aborted)return!1;let{byId:a}=e.sessions.list.getSnapshot(),l=e.workspaces.list.getSnapshot().archivedSessionIds,i=s.sessionIds.map(m=>a[m]).filter(m=>m&&!m.parentId&&!l.includes(m.id)&&m.cwd===s.path),h=Z("selection",void 0,localStorage)?.[s.path],p=i.find(m=>m.id===h)??i.sort((m,y)=>y.updatedAt-m.updatedAt)[0];return p?e.uiWorkspace.openSession(p.id):await ve(e,s.workspaceId,t),!0}function rt(e,n){let t=new Set,r,s=!1,a=!1,l,i={state:null,error:null,draft:null,pending:Z("pending"),popup:null,parentOrigin:te(Z("parentOrigin")),readyLink:null,subscribe(c){return t.add(c),()=>t.delete(c)},emit(){if(!s)for(let c of t)c()},async refresh(){return r||(r=n("status").then(c=>(s||(i.state=c,i.error=null,i.parentOrigin||=c.parentOrigin,i.emit()),c)).catch(c=>{throw i.error=c.message,i.emit(),c}).finally(()=>{r=null}),r)},setPending(c){i.pending=c,Z("pending",c),i.emit()},remember(){let c=e.sessions.list.getSnapshot(),u=c.ids.map(g=>c.byId[g]).find(g=>g?.retainedBy?.mainView>0&&g.cwd&&!g.parentId);if(!u||l===u.id)return;l=u.id;let b=Z("selection",void 0,localStorage)||{},k=Object.fromEntries([[u.cwd,u.id],...Object.entries(b).filter(([g])=>g!==u.cwd)].slice(0,64));Z("selection",k,localStorage)},async adopt(){let c=me(window.location.hash),u=Ke(window.location.hash);if(!(!c||a||Z("arrived")===c.id&&!u)){a=!0;try{let b=i.state||await i.refresh();if(b.mode!=="wsl-host"||!b.distros.some(g=>g.name===c.distro))throw new Error("\u76EE\u6807 DSH \u4E0E\u9009\u5B9A\u7684 Linux \u73AF\u5883\u4E0D\u4E00\u81F4\u3002");let k=await n("environment/adopt",c);if(s)return;c.parentOrigin&&(i.parentOrigin=c.parentOrigin,Z("parentOrigin",c.parentOrigin)),u&&st(e,i,n,u),(u||await Ne(e,k.settings.directory,h.signal))&&(Z("arrived",c.id),history.replaceState(history.state,"",window.location.pathname+window.location.search),await i.refresh())}catch(b){i.error=b.message,i.emit(),s||e.layout.selectPanel("dsh-wsl-native")}finally{a=!1}}}},h=new AbortController,p=()=>{i.refresh().then(()=>i.adopt()).catch(()=>{})},m=e.on("connection/reset",p),y=e.sessions.list.subscribe(()=>i.remember());return window.addEventListener("hashchange",i.adopt),window.addEventListener("focus",p),p(),i.dispose=()=>{s=!0,i.guest?.dispose(),i.conversations?.dispose(),h.abort(),m(),y(),window.removeEventListener("hashchange",i.adopt),window.removeEventListener("focus",p),t.clear()},i}var Is=require("react"),Be=require("@deepseek-ai/dsh-client-ui-primitives"),U=require("react/jsx-runtime");function it({state:e,model:n,chosen:t,task:r,api:s,disabled:a}){let l=e.native?.inheritance;if(e.mode!=="windows-host"||!l?.available)return null;let{options:i,applied:h}=l;return(0,U.jsxs)("section",{className:"dsh-wsl-section","aria-labelledby":"dsh-wsl-inheritance-title",children:[(0,U.jsxs)("div",{className:"dsh-wsl-section-heading",children:[(0,U.jsx)("h2",{id:"dsh-wsl-inheritance-title",children:"Linux \u63D2\u4EF6\u4E0E\u914D\u7F6E"}),(0,U.jsxs)("span",{className:"dsh-wsl-caption",children:["\u4E3B\u73AF\u5883\uFF1A",l.source]})]}),(0,U.jsxs)("div",{className:"dsh-wsl-card dsh-wsl-inheritance",children:[(0,U.jsx)("p",{children:"\u9ED8\u8BA4\u6CBF\u7528\u4E3B\u73AF\u5883\u3002\u5728 Linux \u4E2D\u5355\u72EC\u4FEE\u6539\u7684\u9879\u76EE\u4F1A\u4FDD\u7559\uFF0C\u540E\u7EED\u540C\u6B65\u53EA\u66F4\u65B0\u4ECD\u8DDF\u968F\u4E3B\u73AF\u5883\u7684\u90E8\u5206\u3002"}),(0,U.jsx)("div",{className:"dsh-wsl-inherit-options",children:[["plugins","\u63D2\u4EF6","\u6CBF\u7528\u4E3B\u73AF\u5883\u5B89\u88C5\u7684\u63D2\u4EF6"],["config","\u8BBE\u7F6E","\u6CBF\u7528\u4E3B\u73AF\u5883\u7684\u504F\u597D\u8BBE\u7F6E"],["credentials","\u6A21\u578B\u8D26\u53F7","\u6CBF\u7528\u4E3B\u73AF\u5883\u767B\u5F55\u7684\u8D26\u53F7"]].map(([p,m,y])=>(0,U.jsxs)("div",{className:"dsh-wsl-inherit-option",children:[(0,U.jsxs)("div",{children:[(0,U.jsx)("strong",{children:m}),(0,U.jsx)("small",{children:y})]}),(0,U.jsx)(Be.Switch,{checked:i[p],disabled:a,label:`\u7EE7\u627F${m}`,onChange:c=>void r("inheritance",()=>s("native/inheritance",{...t(),options:{[p]:c}}))})]},p))}),(0,U.jsxs)("div",{className:"dsh-wsl-inherit-actions",children:[(0,U.jsx)(Be.Button,{variant:"outline",disabled:a||!t().distro,onClick:()=>void n.conversations.enter(t(),{panel:"plugins"}),children:"\u7BA1\u7406 Linux \u63D2\u4EF6\u4E0E\u8BBE\u7F6E"}),(0,U.jsx)("span",{className:"dsh-wsl-caption",children:"\u66F4\u6539\u7EE7\u627F\u9009\u9879\u540E\uFF0C\u4E0B\u6B21\u542F\u52A8 Linux \u751F\u6548\u3002"})]}),h&&(0,U.jsxs)("details",{className:"dsh-wsl-inherit-details",children:[(0,U.jsxs)("summary",{children:["\u5DF2\u7EE7\u627F ",h.plugins.filter(p=>p.status==="inherited").length," \u4E2A\u63D2\u4EF6",h.overrides?` \xB7 \u4FDD\u7559 ${h.overrides} \u9879 Linux \u8C03\u6574`:""]}),(0,U.jsx)("ul",{children:h.plugins.map(p=>(0,U.jsxs)("li",{children:[(0,U.jsxs)("span",{children:[p.name," ",(0,U.jsx)("small",{children:p.version})]}),(0,U.jsx)("span",{children:p.status==="inherited"?"\u8DDF\u968F\u4E3B\u73AF\u5883":p.status==="overridden"?"Linux \u5355\u72EC\u914D\u7F6E":p.reason})]},p.name))})]})]})]})}var d=require("react/jsx-runtime");function oe(e){let[,n]=(0,G.useState)(0);return(0,G.useEffect)(()=>e.subscribe(()=>n(t=>t+1)),[e]),e.state}function at({api:e,ctx:n,model:t}){let r=oe(t),[s,a]=(0,G.useState)(t.draft),[l,i]=(0,G.useState)(""),[h,p]=(0,G.useState)(null),[m,y]=(0,G.useState)(!1),[c,u]=(0,G.useState)(null),b=(0,G.useRef)(!1),k=(0,G.useRef)(!0),g=(0,G.useCallback)(()=>t.refresh(),[t]);(0,G.useEffect)(()=>(k.current=!0,g().catch(()=>{}),()=>{k.current=!1}),[g]),(0,G.useEffect)(()=>{r&&!s&&a(fe(r.settings,r.distros))},[r,s]),(0,G.useEffect)(()=>{t.draft=s},[s,t]),(0,G.useEffect)(()=>{let x=t.pending;if(!x)return;let H=r?.handoffs?.find(K=>K.id===x.id);H?.state==="ready"?(t.remember(),t.readyLink=H.url,t.setPending(null),x.mode==="same"?t.conversations.adopt(H).catch(K=>{t.error=K.message,t.emit()}):t.popup&&!t.popup.closed?(t.popup.location.replace(H.url),t.popup=null,p({text:"Linux \u5DF2\u5728\u65B0\u7A97\u53E3\u6253\u5F00\uFF0C\u4E24\u8FB9\u53EF\u4EE5\u540C\u65F6\u4F7F\u7528\u3002"})):p({text:"Linux \u5DF2\u5C31\u7EEA\u3002\u70B9\u51FB\u201C\u65B0\u7A97\u53E3\u6253\u5F00\u201D\u5373\u53EF\u4E0E Windows \u540C\u65F6\u4F7F\u7528\u3002"})):H?.state==="failed"?(t.popup?.close(),t.popup=null,t.setPending(null),p({error:!0,text:H.error})):r&&!H&&(t.setPending(null),p({error:!0,text:"\u542F\u52A8\u5668\u5DF2\u91CD\u65B0\u8FDE\u63A5\uFF0C\u8BF7\u91CD\u65B0\u8FDB\u5165 Linux \u73AF\u5883\u3002"}))},[r,t,t.pending]),(0,G.useEffect)(()=>{let x=r?.native?.instances?.some(K=>K.preparing||K.starting);if(!t.pending&&!x)return;let H=setTimeout(()=>{g().catch(()=>{})},700);return()=>clearTimeout(H)},[r,t,t.pending,g]);async function O(x,H){if(!b.current){b.current=!0,i(x),p(null),t.error=null;try{await H()}catch(K){k.current&&p({error:!0,text:De(K)})}finally{try{await g()}catch{}b.current=!1,k.current&&i("")}}}function C(x,H){a(K=>({...K,[x]:H})),p(null)}let L=()=>({distro:s.distro,user:s.user.trim(),directory:s.directory.trim()});async function w(x,H="\u5DE5\u4F5C\u73AF\u5883\u5DF2\u8FDE\u63A5\uFF0C\u76EE\u5F55\u5DF2\u8BB0\u4F4F\u3002"){let K=await e("environment/switch",x);return k.current&&(a(fe(K.settings,r.distros)),p({text:H})),K}function W(x=!1){b.current||t.pending||(x&&(t.popup=window.open("about:blank","_blank"),t.popup&&(t.popup.opener=null,t.popup.document.title="\u6B63\u5728\u51C6\u5907 Linux DSH",t.popup.document.body.textContent="\u6B63\u5728\u51C6\u5907 Linux DSH\uFF0C\u5B8C\u6210\u540E\u4F1A\u81EA\u52A8\u8FDB\u5165\u3002Windows DSH \u53EF\u4EE5\u7EE7\u7EED\u4F7F\u7528\u3002",t.popup.document.body.style.cssText="font:14px/1.7 system-ui;padding:48px;max-width:560px;margin:auto;color:#666;background:#fafafa")),O("enter",async()=>{try{t.remember();let H=await e("native/enter",{...L(),parentOrigin:te(window.location.origin)});a(fe(H.settings,r.distros)),await g(),t.setPending({id:H.id,mode:x?"new":"same"})}catch(H){throw t.popup?.close(),t.popup=null,H}}))}if(!r||!s)return(0,d.jsxs)("div",{className:"dsh-wsl-page",children:[(0,d.jsx)("header",{className:"dsh-wsl-heading",children:(0,d.jsxs)("div",{children:[(0,d.jsx)("h1",{children:"WSL \u4E0E Windows"}),(0,d.jsx)("p",{children:"\u5728\u540C\u4E00\u7A97\u53E3\u4F7F\u7528\u4E24\u5957\u73AF\u5883\uFF0CWSL \u5BF9\u8BDD\u4F1A\u663E\u793A\u6807\u5FD7\u3002"})]})}),(0,d.jsxs)("div",{className:"dsh-wsl-empty",role:t.error?"alert":"status",children:[t.error||(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(R.StateDot,{state:"ongoing"}),"\u6B63\u5728\u8BFB\u53D6\u73AF\u5883\u2026"]}),t.error&&(0,d.jsx)(R.Button,{onClick:()=>O("refresh",async()=>{}),children:"\u91CD\u65B0\u8FDE\u63A5"})]})]});let S=r.mode==="wsl-host",I=r.mode!=="unsupported",E=fe(r.settings,r.distros),f=["distro","user","directory"].some(x=>s[x].trim()!==E[x]),D=r.native||{},V=D.running,se=t.pending&&r.handoffs?.find(x=>x.id===t.pending.id),J=!!(D.preparing||D.starting||t.pending),o=!!l||!!t.pending||!I,v=r.profiles?.find(x=>x.distro===s.distro&&x.user===s.user.trim()),N=r.pool.connections.find(x=>x.connected&&x.target[0]==="wsl"&&x.target[1]===s.distro&&(x.target[2]===s.user.trim()||x.info?.user===s.user.trim())),T=r.pool.connections.some(x=>x.connected&&x.target[0]==="windows"),F=h?.error&&h.text||t.error||r.error||!I&&"\u5F53\u524D\u73AF\u5883\u4E0D\u652F\u6301 WSL\uFF0C\u8BF7\u5728 Windows \u6216 WSL \u4E2D\u4F7F\u7528\u3002",$=F||h?.text,q=V?.openUrl||null,X=se?.state==="starting"||D.starting?"\u6B63\u5728\u542F\u52A8 DSH\uFF0C\u5E76\u7B49\u5F85 Windows \u8FDE\u63A5\u2026":D.progress?.text||"\u6B63\u5728\u8FDE\u63A5 Linux \u5DE5\u4F5C\u73AF\u5883\u2026";return(0,d.jsxs)("div",{className:"dsh-wsl-page",children:[(0,d.jsxs)("header",{className:"dsh-wsl-heading",children:[(0,d.jsxs)("div",{children:[(0,d.jsx)("h1",{children:"WSL \u4E0E Windows"}),(0,d.jsx)("p",{children:"\u5728\u540C\u4E00\u7A97\u53E3\u4F7F\u7528\u4E24\u5957\u73AF\u5883\uFF0CWSL \u5BF9\u8BDD\u4F1A\u663E\u793A\u6807\u5FD7\u3002"})]}),(0,d.jsx)(R.Button,{variant:"ghost",icon:(0,d.jsx)(R.IconRefreshOutlineRegular,{}),title:"\u5237\u65B0\u72B6\u6001","aria-label":"\u5237\u65B0\u72B6\u6001",disabled:!!l,onClick:()=>O("refresh",async()=>{})})]}),!S&&(0,d.jsxs)("div",{className:"dsh-wsl-unified-setting",children:[(0,d.jsx)("span",{children:"Windows \u4E0E WSL \u5BF9\u8BDD\u663E\u793A\u5728\u540C\u4E00\u4E2A\u5217\u8868\uFF0C\u5207\u6362\u5BF9\u8BDD\u5373\u53EF\u5207\u6362\u73AF\u5883\u3002"}),(0,d.jsx)(R.Button,{variant:"ghost",onClick:()=>t.conversations.setUnified(!t.conversations.unified),children:t.conversations.unified?"\u4F7F\u7528\u539F\u751F\u5DE5\u4F5C\u533A\u5217\u8868":"\u5207\u6362\u5230\u7D27\u51D1\u5BF9\u8BDD\u5217\u8868"})]}),!S&&(0,d.jsxs)("div",{className:"dsh-wsl-startup-setting",children:[(0,d.jsxs)("div",{children:[(0,d.jsx)("strong",{children:"\u968F DSH \u542F\u52A8 WSL \u73AF\u5883"}),(0,d.jsx)("small",{children:"\u4E0B\u6B21\u6253\u5F00 DSH \u65F6\u542F\u52A8\u4E0A\u6B21\u4F7F\u7528\u7684\u73AF\u5883\u3002\u5173\u95ED\u540E\u6309\u9700\u542F\u52A8\uFF0C\u5F53\u524D\u4EFB\u52A1\u7EE7\u7EED\u8FD0\u884C\u3002"})]}),(0,d.jsx)(R.Switch,{label:"\u968F DSH \u542F\u52A8 WSL \u73AF\u5883",checked:r.preferences?.autoStartWsl===!0,disabled:o,onChange:x=>void O("preferences",()=>e("preferences",{autoStartWsl:x}))})]}),$&&(0,d.jsxs)("div",{className:`dsh-wsl-notice ${F?"is-error":""}`,role:F?"alert":"status",children:[(0,d.jsx)(R.StateDot,{state:F?"error":"done"}),(0,d.jsx)("span",{children:$})]}),(0,d.jsxs)("section",{className:"dsh-wsl-section","aria-labelledby":"dsh-wsl-host-title",children:[(0,d.jsxs)("div",{className:"dsh-wsl-section-heading",children:[(0,d.jsx)("h2",{id:"dsh-wsl-host-title",children:"\u8FD0\u884C\u73AF\u5883"}),(0,d.jsx)("span",{className:"dsh-wsl-caption",children:"\u5207\u6362\u65F6\u4FDD\u7559\u4E24\u8FB9\u7684\u4EFB\u52A1"})]}),(0,d.jsxs)("div",{className:"dsh-wsl-host-grid",children:[(0,d.jsxs)("article",{className:`dsh-wsl-card dsh-wsl-host-card ${S?"":"is-current"}`,children:[(0,d.jsxs)("div",{className:"dsh-wsl-host-head",children:[(0,d.jsx)(ze,{size:23}),(0,d.jsx)(Ce,{state:S?"idle":"done",children:S?"\u72EC\u7ACB\u8FD0\u884C":"\u5F53\u524D\u73AF\u5883"})]}),(0,d.jsx)("h3",{children:"Windows DSH"}),(0,d.jsxs)("p",{children:["PowerShell\u3001Windows \u6587\u4EF6\u548C\u5E94\u7528\u3002",(0,d.jsx)("br",{}),"\u4FDD\u7559 Windows \u4E2D\u7684\u5DE5\u4F5C\u533A\u4E0E\u4F1A\u8BDD\u3002"]}),(0,d.jsx)("div",{className:"dsh-wsl-host-actions",children:S?t.parentOrigin?(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(R.Button,{variant:"outline",icon:(0,d.jsx)(ze,{size:16}),onClick:()=>{t.remember(),t.guest?t.guest.returnWindows():window.location.assign(Pe(t.parentOrigin))},children:"\u5207\u6362\u5230 Windows"}),(0,d.jsxs)("a",{className:"dsh-wsl-text-link",href:Pe(t.parentOrigin),target:"_blank",rel:"noopener noreferrer",children:["\u65B0\u7A97\u53E3\u6253\u5F00",(0,d.jsx)(ke,{})]})]}):(0,d.jsx)("span",{className:"dsh-wsl-caption",children:"\u4ECE Windows DSH \u8FDB\u5165\u540E\uFF0C\u53EF\u5728\u8FD9\u91CC\u4E00\u952E\u8FD4\u56DE\u3002"}):(0,d.jsx)(R.Button,{variant:"outline",onClick:()=>n.layout.selectPanel(null),children:"\u7EE7\u7EED Windows \u4F1A\u8BDD"})})]}),(0,d.jsxs)("article",{className:`dsh-wsl-card dsh-wsl-host-card ${S?"is-current":""}`,children:[(0,d.jsxs)("div",{className:"dsh-wsl-host-head",children:[(0,d.jsx)(pe,{size:23}),(0,d.jsx)(Ce,{state:S||V?"done":J?"ongoing":"idle",children:S?"\u5F53\u524D\u73AF\u5883":V?"\u5DF2\u5C31\u7EEA":J?"\u51C6\u5907\u4E2D":"\u6309\u9700\u542F\u52A8"})]}),(0,d.jsxs)("h3",{children:["Linux DSH ",(0,d.jsx)("span",{children:s.distro||"WSL"})]}),(0,d.jsxs)("p",{children:["DSH\u3001\u7EC8\u7AEF\u548C\u9879\u76EE\u90FD\u5728 Linux \u4E2D\u8FD0\u884C\u3002",(0,d.jsx)("br",{}),"Linux \u539F\u751F\u5DE5\u5177\uFF0C\u968F\u65F6\u8BBF\u95EE Windows\u3002"]}),(0,d.jsx)("div",{className:"dsh-wsl-host-actions",children:S?(0,d.jsx)(R.Button,{variant:"outline",onClick:()=>O("workspace",async()=>{let x=await w(L());await Ne(n,x.settings.directory)}),children:"\u7EE7\u7EED Linux \u4F1A\u8BDD"}):(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(R.Button,{variant:"primary",icon:J?(0,d.jsx)(R.StateDot,{state:"ongoing"}):(0,d.jsx)(pe,{size:16}),disabled:o||!s.distro||J,onClick:()=>W(!1),children:J?"\u6B63\u5728\u51C6\u5907\u2026":V?"\u6253\u5F00 WSL \u5BF9\u8BDD":"\u5F00\u59CB WSL \u5BF9\u8BDD"}),q&&!f?(0,d.jsxs)("a",{className:"dsh-wsl-text-link",href:q,target:"_blank",rel:"noopener noreferrer",children:["\u65B0\u7A97\u53E3\u6253\u5F00",(0,d.jsx)(ke,{})]}):(0,d.jsx)(R.Button,{variant:"ghost",disabled:o||!s.distro||J,icon:(0,d.jsx)(ke,{}),onClick:()=>W(!0),children:"\u540C\u65F6\u6253\u5F00"})]})})]})]}),J&&(0,d.jsxs)("div",{className:"dsh-wsl-native-status",role:"status",children:[(0,d.jsx)(R.StateDot,{state:"ongoing"}),(0,d.jsx)("span",{children:X})]}),!S&&!J&&(0,d.jsx)("p",{className:"dsh-wsl-section-note",children:"WSL \u5BF9\u8BDD\u76F4\u63A5\u5728\u5F53\u524D\u7A97\u53E3\u6253\u5F00\uFF0C\u5E76\u663E\u793A WSL \u6807\u5FD7\uFF1B\u4E24\u8FB9\u7684\u4EFB\u52A1\u7EE7\u7EED\u8FD0\u884C\u3002"})]}),(0,d.jsx)(it,{state:r,model:t,chosen:L,task:O,api:e,disabled:o||J}),(0,d.jsxs)("section",{className:"dsh-wsl-section","aria-labelledby":"dsh-wsl-connection-title",children:[(0,d.jsxs)("div",{className:"dsh-wsl-section-heading",children:[(0,d.jsx)("h2",{id:"dsh-wsl-connection-title",children:"Linux \u5DE5\u4F5C\u76EE\u5F55"}),(0,d.jsx)(Ce,{state:N?"done":"idle",children:N?"\u8FDE\u63A5\u5DF2\u5C31\u7EEA":"\u6309\u9700\u8FDE\u63A5"})]}),(0,d.jsx)("div",{className:"dsh-wsl-card",children:(0,d.jsxs)("form",{onSubmit:x=>{x.preventDefault(),o||O("connect",()=>w(L()))},children:[(0,d.jsxs)("div",{className:"dsh-wsl-fields",children:[(0,d.jsxs)("div",{className:"dsh-wsl-field",children:[(0,d.jsx)("label",{htmlFor:"dsh-wsl-distro",children:"WSL \u53D1\u884C\u7248"}),(0,d.jsxs)("div",{className:"dsh-wsl-select-wrap",children:[(0,d.jsxs)("select",{id:"dsh-wsl-distro",value:s.distro,disabled:o||S,onChange:x=>{let H=x.target.value,K=r.profiles?.find(ce=>ce.distro===H);O("switch",async()=>{await w({distro:H,user:K?.user||"",...K?.directory?{directory:K.directory}:{}},"\u5DF2\u5207\u6362\u8FDE\u63A5\uFF0C\u539F\u73AF\u5883\u7684\u4EFB\u52A1\u7EE7\u7EED\u8FD0\u884C\u3002")})},children:[!r.distros.length&&(0,d.jsx)("option",{value:"",children:"\u672A\u53D1\u73B0\u53D1\u884C\u7248"}),r.distros.map(x=>(0,d.jsxs)("option",{value:x.name,children:[x.name,x.isDefault?"\uFF08\u9ED8\u8BA4\uFF09":""]},x.name))]}),(0,d.jsx)(R.IconChevronDownOutlineRegular,{size:14})]}),(0,d.jsx)("p",{children:s.user?`\u7528\u6237 ${s.user}`:"\u4F7F\u7528\u53D1\u884C\u7248\u7684\u9ED8\u8BA4\u7528\u6237"})]}),(0,d.jsxs)("div",{className:"dsh-wsl-field",children:[(0,d.jsx)("label",{htmlFor:"dsh-wsl-directory",children:"\u5DE5\u4F5C\u76EE\u5F55"}),(0,d.jsxs)("div",{className:"dsh-wsl-directory-row",children:[(0,d.jsx)(R.Input,{id:"dsh-wsl-directory",className:"dsh-wsl-directory-input",value:s.directory,disabled:o,onChange:x=>C("directory",x.target.value),placeholder:"Linux\u3001Windows \u6216 WSL \u8DEF\u5F84",autoComplete:"off",spellCheck:!1}),(0,d.jsx)(R.Button,{variant:"outline",icon:(0,d.jsx)(R.IconFolderOpenOutlineRegular,{}),disabled:o||!s.distro,onClick:()=>y(!0),children:"\u6D4F\u89C8"})]}),(0,d.jsx)("p",{children:v?.storage==="windows-mount"?"\u8FD9\u662F Windows \u6302\u8F7D\u76EE\u5F55\u3002\u4F9D\u8D56\u5B89\u88C5\u548C\u9891\u7E41\u6784\u5EFA\u5EFA\u8BAE\u4F7F\u7528 Linux \u4E3B\u76EE\u5F55\u3002":v?.storage==="linux"?"Linux \u6587\u4EF6\u7CFB\u7EDF \xB7 \u9002\u5408\u4F9D\u8D56\u5B89\u88C5\u3001Git \u548C\u9891\u7E41\u6784\u5EFA":"\u652F\u6301\u7C98\u8D34 Windows \u8DEF\u5F84\uFF1B\u8FDE\u63A5\u540E\u81EA\u52A8\u8F6C\u6362\u5E76\u8BB0\u4F4F\u3002"})]})]}),!!v?.recentDirectories?.length&&(0,d.jsxs)("div",{className:"dsh-wsl-recents","aria-label":"\u6700\u8FD1\u4F7F\u7528\u7684\u76EE\u5F55",children:[(0,d.jsx)("span",{children:"\u6700\u8FD1"}),v.recentDirectories.slice(0,5).map(x=>(0,d.jsxs)("button",{type:"button",title:x,"aria-label":`\u4F7F\u7528\u76EE\u5F55 ${x}`,className:x===s.directory?"is-selected":"",disabled:o,onClick:()=>O("directory",()=>w({...L(),directory:x})),children:[(0,d.jsx)(R.IconFolderOpenOutlineRegular,{size:14}),(0,d.jsx)("span",{children:x==="/"?"/":x.split("/").filter(Boolean).pop()})]},x))]}),!S&&(0,d.jsxs)("details",{className:"dsh-wsl-advanced",children:[(0,d.jsxs)("summary",{children:["\u9AD8\u7EA7\u8BBE\u7F6E",(0,d.jsx)(R.IconChevronDownOutlineRegular,{size:12})]}),(0,d.jsxs)("div",{className:"dsh-wsl-user-field",children:[(0,d.jsx)("label",{htmlFor:"dsh-wsl-user",children:"Linux \u7528\u6237"}),(0,d.jsx)(R.Input,{id:"dsh-wsl-user",value:s.user,disabled:o,placeholder:"\u9ED8\u8BA4\u7528\u6237",autoComplete:"off",onChange:x=>{C("user",x.target.value),C("directory","")}}),(0,d.jsx)("p",{children:"\u6BCF\u4E2A\u7528\u6237\u72EC\u7ACB\u8BB0\u5FC6\u76EE\u5F55\uFF1B\u5207\u6362\u4E0D\u4F1A\u505C\u6B62\u5176\u4ED6\u7528\u6237\u7684\u4EFB\u52A1\u3002"})]})]}),(0,d.jsxs)("div",{className:"dsh-wsl-card-actions",children:[(0,d.jsxs)("div",{className:"dsh-wsl-action-primary",children:[(0,d.jsx)(R.Button,{variant:"outline",type:"submit",disabled:o||!s.distro,icon:l==="connect"||l==="switch"?(0,d.jsx)(R.StateDot,{state:"ongoing"}):N&&!f?(0,d.jsx)(R.StateDot,{state:"done"}):void 0,children:l==="connect"||l==="switch"?"\u6B63\u5728\u8FDE\u63A5\u2026":f?"\u5E94\u7528\u5DE5\u4F5C\u76EE\u5F55":N?"\u5DF2\u8FDE\u63A5":"\u8FDE\u63A5 WSL"}),S&&(0,d.jsx)(R.Button,{variant:"ghost",disabled:o,onClick:()=>O("windows",async()=>{await e("connect",{target:"windows"}),p({text:"Windows \u4E92\u64CD\u4F5C\u5DF2\u5C31\u7EEA\u3002"})}),children:T?"Windows \u5DF2\u8FDE\u63A5":"\u8FDE\u63A5 Windows"})]}),(0,d.jsx)(R.Button,{variant:"ghost",icon:(0,d.jsx)(ke,{}),disabled:o||!s.directory.trim(),onClick:()=>O("open",async()=>{let x=await e("open",{path:s.directory.trim(),distro:s.distro,user:s.user});if(x.exitCode!==0)throw new Error(x.stderr||"Windows \u65E0\u6CD5\u6253\u5F00\u6B64\u76EE\u5F55\u3002");p({text:"\u5DF2\u5728 Windows \u4E2D\u6253\u5F00\u5DE5\u4F5C\u76EE\u5F55\u3002"})}),children:"\u5728 Windows \u4E2D\u6253\u5F00"})]})]})})]}),(0,d.jsxs)("div",{className:"dsh-wsl-help",children:[(0,d.jsx)(R.IconFolderOpenOutlineRegular,{size:18}),(0,d.jsx)("p",{children:S?"\u5F53\u524D\u4F1A\u8BDD\u4F7F\u7528 Linux \u539F\u751F\u5DE5\u5177\u3002\u9700\u8981 Windows \u6587\u4EF6\u3001PowerShell \u6216\u526A\u8D34\u677F\u65F6\uFF0C\u53EF\u4EE5\u76F4\u63A5\u5728\u5BF9\u8BDD\u4E2D\u63D0\u51FA\u3002":"Windows \u4F1A\u8BDD\u7EE7\u7EED\u4F7F\u7528\u539F\u751F Windows \u5DE5\u5177\uFF1B\u4E5F\u80FD\u901A\u8FC7\u63D2\u4EF6\u76F4\u63A5\u6267\u884C Linux \u547D\u4EE4\u6216\u53CC\u5411\u590D\u5236\u6587\u4EF6\u3002\u5B8C\u6574 Linux \u5DE5\u4F5C\u6D41\u53EF\u4ECE\u4E0A\u65B9\u8FDB\u5165\u3002"})]}),(0,d.jsxs)("details",{className:"dsh-wsl-diagnostics",children:[(0,d.jsxs)("summary",{children:["\u8FD0\u884C\u4E0E\u8FDE\u63A5\u7BA1\u7406",(0,d.jsx)(R.IconChevronDownOutlineRegular,{size:12})]}),(0,d.jsxs)("div",{className:"dsh-wsl-diagnostics-body",children:[(0,d.jsxs)("dl",{children:[(0,d.jsxs)("div",{children:[(0,d.jsx)("dt",{children:"\u5F53\u524D\u5BBF\u4E3B"}),(0,d.jsx)("dd",{children:S?"Linux / WSL":"Windows"})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("dt",{children:"\u63D2\u4EF6\u7248\u672C"}),(0,d.jsx)("dd",{children:r.version})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("dt",{children:"\u6D3B\u52A8\u8FDE\u63A5"}),(0,d.jsx)("dd",{children:r.pool.connections.filter(x=>x.connected).length})]}),N&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)("div",{children:[(0,d.jsx)("dt",{children:"Linux Node.js"}),(0,d.jsx)("dd",{children:N.info?.node})]}),(0,d.jsxs)("div",{children:[(0,d.jsx)("dt",{children:"Linux \u4E3B\u76EE\u5F55"}),(0,d.jsx)("dd",{children:N.info?.home})]})]})]}),D.instances?.filter(x=>x.running).map(x=>(0,d.jsxs)("div",{className:"dsh-wsl-runtime-row",children:[(0,d.jsxs)("div",{children:[(0,d.jsx)("strong",{children:x.settings.distro}),(0,d.jsxs)("span",{children:[x.settings.user," \xB7 Linux DSH \u8FD0\u884C\u4E2D"]})]}),(0,d.jsx)(R.Button,{variant:"outline",disabled:o||x.preparing||x.starting,onClick:()=>u({kind:"stop",settings:x.settings}),children:"\u505C\u6B62\u6B64\u73AF\u5883"})]},`${x.settings.distro}/${x.settings.user}`)),!S&&(0,d.jsxs)("div",{className:"dsh-wsl-runtime-row",children:[(0,d.jsx)("p",{children:"\u9700\u8981\u9884\u5148\u4E0B\u8F7D\uFF0C\u6216\u66F4\u65B0\u505C\u6B62\u4E2D\u7684 Linux \u73AF\u5883\u65F6\u4F7F\u7528\u3002"}),(0,d.jsx)(R.Button,{variant:"outline",disabled:o||J||!!V||!s.distro,onClick:()=>O("prepare",async()=>{await e("native/prepare",L())}),children:"\u51C6\u5907\u73AF\u5883"})]}),(0,d.jsxs)("div",{className:"dsh-wsl-disconnect-row",children:[(0,d.jsx)("p",{children:"\u65AD\u5F00\u4F1A\u7ED3\u675F\u6865\u63A5\u8FDE\u63A5\u548C\u540E\u53F0\u4EFB\u52A1\u3002\u65E5\u5E38\u5207\u6362\u65E0\u9700\u65AD\u5F00\u3002"}),(0,d.jsx)(R.Button,{variant:"outline",disabled:o||J||!r.pool.connections.length,onClick:()=>u({kind:"disconnect"}),children:"\u65AD\u5F00\u5168\u90E8\u8FDE\u63A5"})]})]})]}),m&&(0,d.jsx)(Oe,{api:e,distro:s.distro,user:s.user,initialPath:s.directory.trim(),onClose:()=>y(!1),onSelect:x=>{y(!1),O("directory",()=>w({...L(),directory:x}))}}),(0,d.jsx)(R.Modal,{open:!!c,onClose:()=>u(null),title:c?.kind==="stop"?"\u505C\u6B62\u8FD9\u4E2A Linux \u73AF\u5883\uFF1F":"\u65AD\u5F00\u5168\u90E8\u8FDE\u63A5\uFF1F",closeLabel:"\u5173\u95ED",description:c?.kind==="stop"?"\u8BE5 Linux DSH \u4E2D\u7684\u4EFB\u52A1\u4F1A\u505C\u6B62\uFF0C\u5176\u4ED6\u73AF\u5883\u7EE7\u7EED\u8FD0\u884C\u3002\u5DF2\u4FDD\u5B58\u7684\u6587\u4EF6\u548C\u4F1A\u8BDD\u4F1A\u4FDD\u7559\u3002":"\u5168\u90E8\u6865\u63A5\u4EFB\u52A1\u548C\u672C\u63D2\u4EF6\u542F\u52A8\u7684 Linux DSH \u4F1A\u505C\u6B62\u3002Windows DSH \u548C\u5DF2\u4FDD\u5B58\u7684\u6587\u4EF6\u4FDD\u7559\u3002",footer:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(R.Button,{onClick:()=>u(null),children:"\u53D6\u6D88"}),(0,d.jsx)(R.Button,{variant:"primary",onClick:()=>{let x=c;u(null),O("stop",async()=>{await e(x.kind==="stop"?"native/stop":"disconnect",x.settings||{}),t.conversations.stopRecovery(x.kind==="stop"?x.settings:null),t.readyLink=null,p({text:x.kind==="stop"?"\u8BE5 Linux \u73AF\u5883\u5DF2\u505C\u6B62\u3002":"\u6865\u63A5\u8FDE\u63A5\u5DF2\u65AD\u5F00\u3002"})})},children:"\u786E\u8BA4\u505C\u6B62"})]})})]})}function ot({retry:e,current:n,changed:t,delays:r=[1500,4e3,1e4],stableMs:s=6e4,setTimer:a=setTimeout,clearTimer:l=clearTimeout}){let i=new Map,h=c=>n(c.key)===c;function p(c){let u=i.get(c);u&&(l(u.timer),l(u.stable),i.delete(c))}function m(c,u,b=0){if(!h(c))return;let k=i.get(c.key);if(k||i.set(c.key,k={attempts:0}),l(k.stable),k.stable=null,k.running){k.failure=u;return}if(!k.timer){if(k.attempts>=r.length){c.recovery={phase:"failed",attempt:k.attempts,message:"\u81EA\u52A8\u91CD\u8FDE\u672A\u6210\u529F\uFF0C\u8BF7\u68C0\u67E5 WSL \u73AF\u5883\u540E\u91CD\u8BD5\u3002"},t();return}c.recovery={phase:"waiting",attempt:k.attempts+1,message:"\u6B63\u5728\u81EA\u52A8\u91CD\u65B0\u8FDE\u63A5 WSL\u2026"},k.timer=a(async()=>{if(k.timer=null,i.get(c.key)!==k||!h(c))return;k.attempts++,k.running=!0,k.failure=null,c.recovery={...c.recovery,phase:"connecting"},t();let g;try{await e(c)}catch(O){g=O}finally{k.running=!1}if(g||=k.failure,g&&i.get(c.key)===k){let O=n(c.key);O&&m(O,g)}},Math.max(b,r[k.attempts])),t()}}function y(c){if(!h(c))return;c.recovery=null;let u=i.get(c.key);u&&(u.failure=null,l(u.timer),u.timer=null,u.stable||(u.stable=a(()=>p(c.key),s)))}return{failed:m,connected:y,cancel:p,dispose(){for(let c of i.keys())p(c)}}}function lt(e,n,t){let r=new Map,s=new Map,a=new AbortController,l=new Set,i=new Set,h=new Map,p=ot({retry:o=>g.reconnect(o,!0),current:o=>!a.signal.aborted&&!l.has(o)&&i.has(o)?r.get(o):null,changed:()=>t.emit()}),m=Ae(e),y=Z("workspace-order",void 0,localStorage),c=0,u,b,k=!1,g={entries:r,activeKey:null,error:null,busy:!1,anchor:null,dialog:null,catalogRevision:0,workspaceOrder:Array.isArray(y)?y.filter(o=>typeof o=="string").slice(0,16e3):[],requestWorkspace(){g.dialog={type:"workspace"},t.emit()},requestRename(o){g.dialog={type:"rename",target:o},t.emit()},requestHandoff(o){g.dialog={type:"handoff",source:o},t.emit()},async handoff(o,v,N){let T=o?await g.remote(o,v,N):await m(v,N);return v==="handoff.deliver"&&(o?(g.activeKey=o.key,e.layout.selectPanel(he)):g.showWindows(T.sessionId),t.emit()),T},setWorkspaceOrder(o){g.workspaceOrder=o,Z("workspace-order",o,localStorage),t.emit()},async remote(o,v,N){o.ready||(await g.enter(o.settings,{connectOnly:!0},!1),await new Promise((F,$)=>{let q=()=>{},X=ce=>{clearTimeout(H),q(),a.signal.removeEventListener("abort",x),ce?$(ce):F()},x=()=>X(new Error("\u7A97\u53E3\u5DF2\u5173\u95ED\u3002")),H=setTimeout(()=>X(new Error(g.error||"WSL \u9875\u9762\u8FDE\u63A5\u8D85\u65F6\uFF0C\u8BF7\u91CD\u65B0\u8FDE\u63A5\u3002")),18e4),K=()=>{let ce=r.get(o.key);ce?.ready?(o=ce,X()):l.has(o.key)?X(new Error("\u8FD9\u4E2A\u73AF\u5883\u7684\u9875\u9762\u5DF2\u5173\u95ED\u3002")):(ce?.recovery?.phase==="failed"||g.error)&&X(new Error(ce?.recovery?.message||g.error))};q=t.subscribe(K),a.signal.addEventListener("abort",x,{once:!0}),K()}));let T=await w(o,v,N);return v!=="search"&&await w(o,"refresh",{}),T},unified:Z("sidebar-view-v050",void 0,localStorage)==="conversations",nativeCatalog:()=>Le(e),visible:()=>e.layout.panelInfo.getSnapshot().activePanelId===he,changed(){t.emit()},setUnified(o){g.unified=o,Z("sidebar-view-v050",o?"conversations":"workspaces",localStorage),t.emit()},setAnchor(o){g.anchor=o,t.emit()},showWindows(o){c++,g.error=null,o?e.uiWorkspace.openSession(o):e.layout.selectPanel(null),t.emit()},async openRow(o){if(!o.environment)return g.showWindows(o.id);let v=r.get(o.environment.key);if(!v?.ready)return g.enter(v.settings,{sessionId:o.id});c++,g.activeKey=v.key,g.error=null,e.layout.selectPanel(he),t.emit();try{await W(v,{sessionId:o.id})}catch(N){g.error=N.message,t.emit()}},async enter(o,v={},N=!0,T=!1){let F=be(o);if(a.signal.aborted||T&&l.has(F))return;if(!T){p.cancel(F);let q=r.get(F);q?.recovery&&(q.recovery=null,q.origin=null)}l.delete(F),i.add(F);let $=N?++c:c;g.error=null,t.emit();try{let q=await O(o);if(a.signal.aborted||l.has(F))return;await g.adopt(q,$!==c?{connectOnly:!0}:v,N&&$===c)}catch(q){if(T)throw q;g.error=q.message,t.emit()}},async adopt(o,v={},N=!0){let T=be(o.settings);l.delete(T),i.add(T);let F=new URL(o.url).origin,$=r.get(T);if(!$||$.origin!==F){if([...r.values()].filter(x=>x.url&&x.key!==T).length>=8)throw new Error("\u540C\u4E00\u7A97\u53E3\u6700\u591A\u4FDD\u6301 8 \u4E2A Linux \u73AF\u5883\u3002\u5728\u5BF9\u8BDD\u83DC\u5355\u4E2D\u5173\u95ED\u4E0D\u7528\u7684\u73AF\u5883\u9875\u9762\u540E\u53EF\u7EE7\u7EED\u6253\u5F00\uFF0C\u540E\u53F0\u4EFB\u52A1\u4E0D\u53D7\u5F71\u54CD\u3002");$&&S($,"Linux \u5DF2\u91CD\u65B0\u542F\u52A8\uFF0C\u8BF7\u91CD\u8BD5\u8FD9\u6B21\u64CD\u4F5C\u3002");let X=crypto.randomUUID();$={key:T,settings:o.settings,origin:F,channel:X,catalog:$?.catalog||null,recovery:$?.recovery||null,url:Fe(o.url,X,location.origin),openUrl:o.url,transport:te(location.origin)===ue?"desktop":"iframe",ready:!1,compact:!0,window:null,waiting:null,startedAt:Date.now()},r.set(T,$)}else $.settings=o.settings,$.openUrl=o.url;$.handoff=me(new URL(o.url).hash),N&&(g.activeKey=T,e.layout.selectPanel(he));let q={handoff:$.handoff,...v};v.connectOnly||($.ready?await W($,q):$.waiting=q),C(),t.emit()},bind(o,v){o.window=v?.contentWindow||null},desktopMessage(o,v){r.get(o.key)===o&&f(o,v)},desktopError(o,v){r.get(o.key)===o&&(o.ready=!1,S(o,v.message),p.failed(o,v),t.emit())},async newWindows(o){c++,g.error=null;try{await Je(e,o)}catch(v){g.error=v.message}t.emit()},async newLinux(o){let v=o?.settings||t.state?.settings;if(!v?.distro){e.layout.selectPanel("dsh-wsl-native");return}let N=o?.catalog?.rows.find(T=>T.id===o.catalog.selectedId);await g.enter({...v,directory:N?.cwd||v.directory},{create:!0})},async action(o,v){g.error=null;try{if(o.environment){let N=r.get(o.environment.key);await g.remote(N,v,{sessionId:o.id})}else{let N={pin:"pinSession",unpin:"unpinSession",archive:"archiveSession",unarchive:"unarchiveSession"};if(!N[v])throw new Error("\u5BF9\u8BDD\u64CD\u4F5C\u65E0\u6548\u3002");await e.uiWorkspace[N[v]](o.id)}}catch(N){g.error=N.message}t.emit()},toggleChrome(o){let v=o.configOpen?null:"plugins";w(o,"chrome",{compact:!0,panel:v}).then(()=>{o.configOpen=!!v,o.compact=!0,t.emit()}).catch(N=>{g.error=N.message,t.emit()})},closeView(o){l.add(o.key),p.cancel(o.key),S(o,"\u8FD9\u4E2A\u73AF\u5883\u7684\u9875\u9762\u5DF2\u5173\u95ED\uFF0C\u540E\u53F0\u4EFB\u52A1\u7EE7\u7EED\u8FD0\u884C\u3002"),g.activeKey===o.key&&g.showWindows(),delete o.url,o.window=null,o.ready=!1,o.origin=null,o.waiting=null,C(),t.emit()},stopRecovery(o){for(let v of i)(!o||v===be(o))&&(l.add(v),p.cancel(v));for(let v of r.values())(!o||v.key===be(o))&&g.closeView(v)},reconnect(o,v=!1){if(r.get(o.key)!==o||l.has(o.key))return Promise.resolve();v||(p.cancel(o.key),o.recovery=null);let N=o.waiting||(o.catalog?.selectedId?{sessionId:o.catalog.selectedId}:{connectOnly:!0});return S(o,"\u8FDE\u63A5\u6B63\u5728\u91CD\u65B0\u5EFA\u7ACB\u3002"),o.origin=null,g.enter(o.settings,N,!v&&g.visible()&&g.activeKey===o.key,v)}};function O(o){let v=JSON.stringify([be(o),o.directory]);if(h.has(v))return h.get(v);let N=Promise.resolve().then(async()=>{let T=await n("native/enter",{...o,parentOrigin:te(location.origin)}),F=Date.now()+600*1e3;for(;!a.signal.aborted&&Date.now()<F;){let q=(await t.refresh()).handoffs.find(X=>X.id===T.id);if(q?.state==="failed")throw new Error(q.error);if(q?.state==="ready")return q;await new Promise(X=>setTimeout(X,700))}throw new Error("Linux \u542F\u52A8\u672A\u5B8C\u6210\uFF0C\u8BF7\u5728\u73AF\u5883\u9762\u677F\u67E5\u770B\u8FDB\u5EA6\u3002")}).finally(()=>{h.delete(v),g.busy=h.size>0,t.emit()});return h.set(v,N),g.busy=!0,t.emit(),N}function C(){clearTimeout(u),u=setTimeout(()=>Z("conversation-catalogs",[...r.values()].map(o=>({key:o.key,settings:o.settings,catalog:o.catalog})),localStorage),200)}let L=Z("conversation-catalogs",void 0,localStorage)||Z("conversation-catalogs");for(let o of(Array.isArray(L)?L:[]).slice(0,8)){if(!o?.settings?.distro||!o?.settings?.directory||!Ie(o.catalog))continue;let v=be(o.settings);r.set(v,{key:v,settings:o.settings,catalog:Ie(o.catalog),ready:!1,compact:!0})}function w(o,v,N){if(!o.window&&!o.desktop||!o.ready)return Promise.reject(new Error("WSL \u5BF9\u8BDD\u754C\u9762\u5C1A\u672A\u8FDE\u63A5\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002"));let T=crypto.randomUUID();return new Promise((F,$)=>{let q=setTimeout(()=>{s.delete(T),$(new Error("WSL \u5BF9\u8BDD\u6CA1\u6709\u53CA\u65F6\u54CD\u5E94\uFF0C\u8BF7\u68C0\u67E5\u8FDE\u63A5\uFF1B\u64CD\u4F5C\u4E0D\u4F1A\u81EA\u52A8\u91CD\u653E\u3002"))},3e4);s.set(T,{entry:o,resolve:F,reject:$,timer:q}),o.desktop?o.desktop.request(v,N).then(X=>f(o,{type:"result",id:T,ok:!0,value:X}),X=>f(o,{type:"result",id:T,ok:!1,error:X.message})):o.window.postMessage({protocol:Se,channel:o.channel,type:"request",id:T,action:v,payload:N},o.origin)})}async function W(o,v){let N=crypto.randomUUID();o.navigating=N,t.emit();try{await w(o,"navigate",v),o.configOpen=!1,v.panel==="plugins"&&(await w(o,"chrome",{compact:!0,panel:"plugins"}),o.configOpen=!0)}finally{o.navigating===N&&(o.navigating=null),t.emit()}}function S(o,v){for(let[N,T]of s)T.entry===o&&(clearTimeout(T.timer),s.delete(N),T.reject(new Error(v)))}function I(o){let v=[...document.body.style].filter(N=>/^--(?:ds|dsw|dsh)-/.test(N)).map(N=>[N,document.body.style.getPropertyValue(N)]);w(o,"theme",{dark:document.body.hasAttribute("data-ds-dark-theme"),tokens:v}).catch(()=>{})}let E=o=>{let v=[...r.values()].find(N=>Ee(o,{origin:N.origin,source:N.window,channel:N.channel}));v&&f(v,o.data)};function f(o,v){if(v.type==="catalog"){let N=Ie(v.catalog);if(!N)return;let T=!o.ready;if(o.ready=N.phase==="ready"&&N.connected,o.catalog=N,o.lastSeen=Date.now(),g.catalogRevision++,N.connected&&o.ready?p.connected(o):N.connected||p.failed(o,new Error("WSL \u8FDE\u63A5\u5DF2\u4E2D\u65AD\u3002"),15e3),T&&o.ready&&I(o),o.waiting&&o.ready&&N.connected){let F=o.waiting;o.waiting=null,W(o,F).catch($=>{g.error=$.message,t.emit()})}C(),t.emit()}else if(v.type==="result"){let N=s.get(v.id);if(!N||N.entry!==o)return;clearTimeout(N.timer),s.delete(v.id),v.ok?N.resolve(v.value):N.reject(new Error(String(v.error||"\u64CD\u4F5C\u5931\u8D25\u3002").slice(0,1e3)))}else v.type==="return"?g.showWindows():v.type==="sidebar"&&e.layout.toggleSidebar()}window.addEventListener("message",E);let D=new MutationObserver(()=>{for(let o of r.values())o.ready&&I(o)});D.observe(document.body,{attributes:!0,attributeFilter:["data-ds-dark-theme","style"]});let V=()=>{let o=JSON.stringify(Le(e));o!==b&&(b=o,t.emit())},se=()=>{if(t.state?.mode==="windows-host"&&!k&&(k=!0,t.state.preferences?.autoStartWsl===!0)){let o=t.state.settings,v=o.distro||t.state.distros.find(N=>N.isDefault)?.name||t.state.distros[0]?.name;v&&g.enter({...o,distro:v},{connectOnly:!0},!1).catch(()=>{})}},J=[e.sessions.list.subscribe(V),e.workspaces.list.subscribe(V),e.layout.panelInfo.subscribe(()=>{t.emit()}),t.subscribe(se)];return se(),g.dispose=()=>{a.abort(),p.dispose(),D.disconnect(),clearTimeout(u),window.removeEventListener("message",E);for(let o of J)o();for(let o of r.values())S(o,"\u7A97\u53E3\u5DF2\u5173\u95ED\u3002")},g}var ee=require("react"),Y=require("@deepseek-ai/dsh-client-ui-primitives");function Rt(e,n,t,r){if(!ge(e)||!["next","request"].includes(t)||!/^[a-zA-Z0-9-]{32,64}$/.test(n))throw new Error("\u684C\u9762 WSL \u901A\u9053\u53C2\u6570\u65E0\u6548\u3002");return`(() => { if (location.origin !== ${JSON.stringify(e)} || location.pathname !== '/') return null; const api = window[${JSON.stringify(ye)}]; return api ? api[${JSON.stringify(t)}](...${JSON.stringify([n,...r])}) : null; })()`}function dt({host:e,entry:n,bridge:t,onMessage:r,onError:s,createElement:a=()=>document.createElement("webview")}){let l=!1,i,h,p,m=0,y,c,u=O=>new Promise(C=>{c=C,y=setTimeout(()=>{c=null,C()},O)}),b=(O,...C)=>l||!i||new URL(i.getURL()).origin!==n.origin?Promise.reject(new Error("WSL \u9875\u9762\u5C1A\u672A\u8FDE\u63A5\u6216\u5DF2\u79BB\u5F00\u6240\u5C5E\u73AF\u5883\u3002")):i.executeJavaScript(Rt(n.origin,n.channel,O,C));async function k(O){let C=0,L=Date.now()+45e3;try{for(;!l&&O===m;){let w=await b("next",C);if(l||O!==m)return;if(!w){if(Date.now()>L)throw new Error("Linux \u5BF9\u8BDD\u63D2\u4EF6\u5C1A\u672A\u5C31\u7EEA\uFF0C\u8BF7\u91CD\u65B0\u8FDE\u63A5\u3002");await u(250);continue}if(w.closed)throw new Error("WSL \u5BF9\u8BDD\u901A\u4FE1\u5DF2\u5173\u95ED\u3002");if(L=Date.now()+45e3,!Number.isSafeInteger(w.sequence)||w.sequence<C)throw new Error("WSL \u9875\u9762\u8FD4\u56DE\u4E86\u65E0\u6548\u6E38\u6807\u3002");C=w.sequence,w.catalog&&r({type:"catalog",catalog:w.catalog});for(let W of(w.signals||[]).slice(0,16))["return","sidebar"].includes(W.type)&&r({type:W.type})}}catch(w){!l&&O===m&&s(w)}}let g={async request(O,C){let L=await b("request",O,C);if(!L?.ok)throw new Error(L?.error||"WSL \u9875\u9762\u5C1A\u672A\u8FDE\u63A5\u3002");return L.value},dispose(){l||(l=!0,m++,clearTimeout(y),c?.(),p?.(),i?.remove(),h&&t.release(h).catch(()=>{}))}};return(async()=>{if(!t?.acquire||!t?.release)throw new Error("\u5F53\u524D DSH \u684C\u9762\u7AEF\u6CA1\u6709\u9694\u79BB\u6D4F\u89C8\u5668\u63A5\u53E3\uFF0C\u8BF7\u66F4\u65B0 DSH \u6216\u4F7F\u7528 Web \u5165\u53E3\u3002");let O=await t.acquire("dsh-wsl-native:"+n.key);if(h=O.lease,l){await t.release(h);return}i=a(),i.className="dsh-wsl-desktop-view",i.setAttribute("name",h),i.setAttribute("partition",O.partition),i.setAttribute("allowpopups",""),i.setAttribute("aria-label",`WSL ${n.settings.distro} \u539F\u751F DSH \u5BF9\u8BDD`),i.setAttribute("src","about:blank#"+h);let C=!0;i.addEventListener("dom-ready",()=>{l||(C?(C=!1,i.loadURL(n.url).catch(L=>{l||s(L)})):k(++m))}),i.addEventListener("did-start-navigation",L=>{L.isMainFrame&&!L.isInPlace&&m++}),i.addEventListener("did-fail-load",L=>{!l&&L.isMainFrame&&L.errorCode!==-3&&s(new Error("WSL \u9875\u9762\u52A0\u8F7D\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5 Linux \u5B9E\u4F8B\u5E76\u91CD\u65B0\u8FDE\u63A5\u3002"))}),i.addEventListener("render-process-gone",()=>{m++,l||s(new Error("WSL \u5BF9\u8BDD\u9875\u9762\u5DF2\u9000\u51FA\uFF0C\u540E\u53F0\u5BBF\u4E3B\u4ECD\u72EC\u7ACB\u8FD0\u884C\u3002\u8BF7\u91CD\u65B0\u8FDE\u63A5\u3002"))}),p=t.onOpenRequested?.(h,L=>{!l&&/^https?:/.test(L)&&window.open(L,"_blank","noopener")}),e.append(i)})().catch(O=>{l||s(O)}),g}var ne=require("react"),re=require("@deepseek-ai/dsh-client-ui-primitives");var B=require("react/jsx-runtime"),zt={switch:"M4 7h16m-4-4 4 4-4 4M20 17H4m4-4-4 4 4 4",search:"M10.5 17a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13Zm5-1.5L21 21",filter:"M4 6h16M7 12h10M10 18h4",plus:"M12 4v16M4 12h16"};function Me({name:e}){return(0,B.jsx)("svg",{width:"15",height:"15",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:(0,B.jsx)("path",{d:zt[e]})})}function ct({ctx:e,model:n,wide:t,expandSidebar:r}){oe(n);let s=n.conversations,a=s.nativeCatalog(),[l,i]=(0,ne.useState)("all"),[h,p]=(0,ne.useState)(""),[m,y]=(0,ne.useState)(35),[c,u]=(0,ne.useState)(!1),[b,k]=(0,ne.useState)(null),[g,O]=(0,ne.useState)(null),[C,L]=(0,ne.useState)(!1),w=(0,ne.useRef)(null),W=(0,ne.useRef)(null);if((0,ne.useEffect)(()=>{if(!g)return;let f=D=>{(!w.current?.contains(D.target)||D.key==="Escape")&&O(null)};return document.addEventListener("pointerdown",f),document.addEventListener("keydown",f),()=>{document.removeEventListener("pointerdown",f),document.removeEventListener("keydown",f)}},[g]),(0,ne.useEffect)(()=>{C&&W.current?.focus()},[C]),!t)return(0,B.jsx)("div",{className:"dsh-wsl-chat-rail",children:(0,B.jsx)(re.Button,{variant:"ghost",icon:(0,B.jsx)(pe,{size:18}),"aria-label":"\u5C55\u5F00\u5BF9\u8BDD\u5217\u8868",onClick:r})});let S=je(a,s.entries.values(),{filter:l,query:h,archived:c}),I=f=>{window.matchMedia("(max-width:600px)").matches&&e.layout.toggleSidebar(),f()},E=f=>{let D=b;k(null),s.action(D,f)};return(0,B.jsxs)("section",{ref:w,className:"dsh-wsl-conversations","aria-label":"Windows \u4E0E WSL \u5BF9\u8BDD\u5217\u8868",children:[(0,B.jsxs)("div",{className:"dsh-wsl-compact-heading",children:[(0,B.jsx)("span",{children:c?"\u5DF2\u5F52\u6863":l==="wsl"?"WSL \u5BF9\u8BDD":l==="windows"?"Windows \u5BF9\u8BDD":"\u5BF9\u8BDD"}),(0,B.jsx)("button",{type:"button",className:"dsh-wsl-icon-button","aria-label":"\u5207\u6362\u5230\u539F\u751F\u5DE5\u4F5C\u533A",title:"\u5207\u6362\u5230\u539F\u751F\u5DE5\u4F5C\u533A",onClick:()=>s.setUnified(!1),children:(0,B.jsx)(Me,{name:"switch"})}),(0,B.jsxs)("div",{className:"dsh-wsl-heading-actions",children:[(0,B.jsx)("button",{type:"button",className:"dsh-wsl-icon-button","aria-label":"\u641C\u7D22\u5BF9\u8BDD",title:"\u641C\u7D22\u5BF9\u8BDD","aria-expanded":C,onClick:()=>{L(!C),C&&p(""),O(null)},children:(0,B.jsx)(Me,{name:"search"})}),(0,B.jsx)("button",{type:"button",className:"dsh-wsl-icon-button","aria-label":"\u7B5B\u9009\u5BF9\u8BDD",title:"\u7B5B\u9009\u4E0E\u5F52\u6863","aria-expanded":g==="filter",onClick:()=>O(g==="filter"?null:"filter"),children:(0,B.jsx)(Me,{name:"filter"})}),(0,B.jsxs)("button",{type:"button",className:"dsh-wsl-icon-button dsh-wsl-add-workspace","aria-label":"\u65B0\u5EFA WSL \u5DE5\u4F5C\u533A",title:"\u65B0\u5EFA WSL \u5DE5\u4F5C\u533A",onClick:()=>s.requestWorkspace(),children:[(0,B.jsx)(Me,{name:"plus"}),(0,B.jsx)("span",{"aria-hidden":"true",children:"WSL"})]})]})]}),g&&(0,B.jsx)("div",{className:"dsh-wsl-list-popover",role:"group","aria-label":"\u5BF9\u8BDD\u7B5B\u9009",children:(0,B.jsxs)(B.Fragment,{children:[[["all","\u5168\u90E8\u73AF\u5883"],["windows","Windows"],["wsl","WSL"]].map(([f,D])=>(0,B.jsxs)("button",{type:"button","aria-pressed":l===f,onClick:()=>{i(f),y(35),O(null)},children:[D,l===f?" \u2713":""]},f)),(0,B.jsx)("button",{type:"button",className:"dsh-wsl-menu-divider","aria-pressed":c,onClick:()=>{u(!c),O(null)},children:c?"\u663E\u793A\u5F53\u524D\u5BF9\u8BDD":"\u663E\u793A\u5DF2\u5F52\u6863\u5BF9\u8BDD"})]})}),C&&(0,B.jsx)(re.Input,{ref:W,"aria-label":"\u641C\u7D22\u5BF9\u8BDD\u6216\u5DE5\u4F5C\u76EE\u5F55",placeholder:"\u641C\u7D22\u5BF9\u8BDD\u6216\u76EE\u5F55",value:h,onChange:f=>{p(f.target.value),y(35)},onKeyDown:f=>{f.key==="Escape"&&(p(""),L(!1))}}),s.error&&(0,B.jsx)("div",{className:"dsh-wsl-chat-list-error",role:"alert",children:s.error}),(0,B.jsxs)("div",{className:"dsh-wsl-chat-rows",role:"list","aria-label":c?"\u5DF2\u5F52\u6863\u5BF9\u8BDD":"\u6240\u6709\u73AF\u5883\u7684\u5BF9\u8BDD",children:[S.slice(0,m).map(f=>{let D=f.environment?s.visible()&&s.activeKey===f.environment.key&&f.environment.catalog.selectedId===f.id:!e.layout.panelInfo.getSnapshot().activePanelId&&a.selectedId===f.id;return(0,B.jsxs)("div",{className:`dsh-wsl-chat-row${D?" is-selected":""}`,role:"listitem",children:[(0,B.jsxs)("button",{type:"button",className:"dsh-wsl-chat-row-open","aria-current":D?"page":void 0,disabled:c,"aria-label":`${f.environment?"WSL":"Windows"} \u5BF9\u8BDD\uFF1A${f.title}`,title:`${f.environment?`WSL \xB7 ${f.environment.settings.distro}`:"Windows"}
${f.cwd}`,onClick:()=>I(()=>void s.openRow(f)),children:[(0,B.jsx)("span",{className:"dsh-wsl-chat-dot",children:f.running?(0,B.jsx)(re.StateDot,{state:"ongoing"}):f.pinned?"\u2022":null}),(0,B.jsx)("span",{className:"dsh-wsl-chat-row-text",children:(0,B.jsx)("span",{children:f.title||"\u65B0\u5BF9\u8BDD"})}),f.environment&&(0,B.jsx)("span",{className:"dsh-wsl-chat-mark",title:`WSL \xB7 ${f.environment.settings.distro}`,children:"WSL"})]}),(0,B.jsx)("button",{type:"button",className:"dsh-wsl-chat-more","aria-label":`\u7BA1\u7406\u5BF9\u8BDD\uFF1A${f.title}`,onClick:()=>k(f),children:"\u22EF"})]},f.key)}),S.length>m&&(0,B.jsxs)(re.Button,{variant:"ghost",onClick:()=>y(m+35),children:["\u663E\u793A\u66F4\u591A\uFF08",S.length-m,"\uFF09"]}),!S.length&&(0,B.jsx)("div",{className:"dsh-wsl-chat-empty",children:h?"\u6CA1\u6709\u5339\u914D\u7684\u5BF9\u8BDD":c?"\u6CA1\u6709\u5DF2\u5F52\u6863\u5BF9\u8BDD":"\u70B9\u51FB\u4E0A\u65B9 Windows \u6216 WSL \u5F00\u59CB\u5BF9\u8BDD"})]}),s.busy&&(0,B.jsxs)("div",{className:"dsh-wsl-chat-list-foot",role:"status",children:[(0,B.jsx)(re.StateDot,{state:"ongoing"}),"\u6B63\u5728\u51C6\u5907 WSL\u2026"]}),(0,B.jsx)(re.Modal,{open:!!b,onClose:()=>k(null),title:b?.title||"\u7BA1\u7406\u5BF9\u8BDD",children:b&&(0,B.jsxs)("div",{className:"dsh-wsl-chat-menu",children:[(0,B.jsxs)("p",{children:[b.environment?`WSL \xB7 ${b.environment.settings.distro}`:"Windows"," \xB7 ",b.cwd]}),!b.archived&&(0,B.jsx)(re.Button,{onClick:()=>E(b.pinned?"unpin":"pin"),children:b.pinned?"\u53D6\u6D88\u7F6E\u9876":"\u7F6E\u9876\u5BF9\u8BDD"}),(0,B.jsx)(re.Button,{onClick:()=>E(b.archived?"unarchive":"archive"),children:b.archived?"\u6062\u590D\u5BF9\u8BDD":"\u5F52\u6863\u5BF9\u8BDD"}),!b.archived&&(0,B.jsx)(re.Button,{onClick:()=>{s.requestHandoff({id:b.id,row:b,entry:b.environment||null}),k(null)},children:"\u4EA4\u63A5\u5DE5\u4F5C\u2026"}),b.environment?.url&&(0,B.jsx)(re.Button,{variant:"ghost",onClick:()=>{s.closeView(b.environment),k(null)},children:"\u5173\u95ED\u73AF\u5883\u9875\u9762\uFF08\u4FDD\u7559\u540E\u53F0\u4EFB\u52A1\uFF09"})]})})]})}function pt(e,n){let t=document,r,s,a,l=!1,i,h=(w,W,S,I)=>{let E=t.createElement("button");E.type="button",E.className=W,E.title=w,E.setAttribute("aria-label",w);let f=t.createElementNS("http://www.w3.org/2000/svg","svg");for(let[V,se]of Object.entries({width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true"}))f.setAttribute(V,se);let D=t.createElementNS(f.namespaceURI,"path");return D.setAttribute("d",S),f.append(D),E.append(f),E.addEventListener("click",I),E},p=h("\u5207\u6362\u5230\u7D27\u51D1\u5BF9\u8BDD\u5217\u8868","dsh-wsl-icon-button dsh-wsl-native-toggle","M4 7h16m-4-4 4 4-4 4M20 17H4m4-4-4 4 4 4",()=>n.conversations.setUnified(!0)),m=h("\u65B0\u5EFA WSL \u5DE5\u4F5C\u533A","dsh-wsl-icon-button dsh-wsl-add-workspace","M3 7V5h6l2 2h10v13H3V7m9 4v6m-3-3h6",()=>n.conversations.requestWorkspace()),y=t.createElement("span");y.textContent="WSL",y.setAttribute("aria-hidden","true"),m.append(y),m.dataset.dshWslOwned="";let c=t.createElement("div");c.className="dsh-wsl-new-pair",c.dataset.dshWslOwned="";let u=h("\u65B0\u5EFA Windows \u5BF9\u8BDD","dsh-wsl-new-windows","M3 4h18v13H3zM8 21h8m-4-4v4",()=>n.conversations.newWindows()),b=h("\u65B0\u5EFA WSL \u5BF9\u8BDD","dsh-wsl-new-linux","M3 5h18v14H3zM7 9l3 3-3 3m6 0h4",()=>void n.conversations.newLinux(n.conversations.entries.get(n.conversations.activeKey)));for(let[w,W]of[[u,"Windows"],[b,"WSL"]]){let S=t.createElement("span");S.textContent=W,w.append(S)}c.append(u,b);let k=new Set;function g(){if(a=null,l||n.state?.mode!=="windows-host")return;let S=t.querySelector("[data-shell-overlay]")?.parentElement?.querySelector(":scope > [data-rightbar-col]")?.previousElementSibling?.previousElementSibling;if(!S)return;s!==S&&(r?.disconnect(),s=S,r=new MutationObserver(f=>{f.some(D=>!D.target.closest?.("[data-dsh-wsl-owned]")&&[...D.addedNodes,...D.removedNodes].some(V=>!V.dataset||!("dshWslOwned"in V.dataset)))&&O()}),r.observe(s,{subtree:!0,childList:!0}));let I=s.querySelector('button[class*="newSession"]');I&&(i!==I&&(i?.removeAttribute("data-dsh-wsl-replaced"),i=I),I.setAttribute("data-dsh-wsl-replaced",""),c.previousElementSibling!==I&&I.after(c),c.classList.toggle("is-narrow",I.parentElement.getBoundingClientRect().width<160)),b.setAttribute("aria-busy",String(n.conversations.busy));let E=s.querySelector('[class*="sectionHeader"]');if(E&&!n.conversations.unified){let f=E.querySelector(":scope > span");p.parentElement!==E&&(f?f.after(p):E.prepend(p)),m.parentElement!==E&&E.append(m)}else p.remove(),m.remove();for(let f of k)f.isConnected||k.delete(f);for(let[f,D]of[["workspace","projectText"],["session","title"]])for(let V of s.querySelectorAll(`[data-row-key^="${f}:dsh-wsl:"]`)){if(V.querySelector(":scope > .dsh-wsl-workspace-mark"))continue;let se=V.querySelector(`:scope > [class*="${D}"]`);if(!se)continue;let J=t.createElement("span");J.dataset.dshWslOwned="",J.className="dsh-wsl-workspace-mark"+(f==="session"?" dsh-wsl-session-mark":""),J.textContent="WSL",J.title=f==="session"?"WSL \u5BF9\u8BDD":"WSL \u5DE5\u4F5C\u533A",se.after(J),k.add(J)}}function O(){!l&&!a&&(a=requestAnimationFrame(g))}let C=n.subscribe(O),L=e.slots.subscribe("sidebar.workspaces",O);return O(),()=>{l=!0,cancelAnimationFrame(a),r?.disconnect(),C(),L(),i?.removeAttribute("data-dsh-wsl-replaced"),c.remove(),p.remove(),m.remove();for(let w of k)w.remove()}}var wt=require("react"),ie=require("@deepseek-ai/dsh-client-ui-primitives");var We=(e,n,t)=>"dsh-wsl:"+JSON.stringify([e.key,n,t]);function ut(e,n,t,r,s,a=[]){let l={...e,ids:[...e.ids],byId:{...e.byId}};if(s)for(let y of l.ids){let c=l.byId[y];c?.retainedBy?.mainView&&(l.byId[y]={...c,retainedBy:{...c.retainedBy,mainView:0}})}let i={...n,items:[...n.items],pinnedSessionIds:[...n.pinnedSessionIds],archivedSessionIds:[...n.archivedSessionIds]},h=new Map(t),p=new Map;for(let y of r){for(let c of y.catalog?.rows||[]){let u=We(y,"session",c.id);p.set(u,{entry:y,id:c.id,row:c,kind:"session"}),l.ids.push(u),l.byId[u]={id:u,title:c.title,displayTitle:c.title,cwd:c.cwd,blank:c.blank,running:c.running,updatedAt:c.updatedAt,retainedBy:{mainView:s===y.key&&y.catalog.selectedId===c.id?1:0}},h.set(u,{running:c.running,completionUnread:!1}),c.pinned&&i.pinnedSessionIds.push(u),c.archived&&i.archivedSessionIds.push(u)}for(let c of y.catalog?.workspaces||[]){let u=We(y,"workspace",c.workspaceId);p.set(u,{entry:y,id:c.workspaceId,workspace:c,kind:"workspace"}),i.items.push({...c,workspaceId:u,sessionIds:c.sessionIds.map(b=>We(y,"session",b))})}}let m=new Map(a.map((y,c)=>[y,c]));return i.items.sort((y,c)=>(m.get(y.workspaceId)??1/0)-(m.get(c.workspaceId)??1/0)),{sessions:l,workspaces:i,status:h,targets:p}}function ht(e,n,t,r){if(!e.some(i=>i.workspaceId===t)||r!==void 0&&!e.some(i=>i.workspaceId===r))throw new Error("\u5DE5\u4F5C\u533A\u5217\u8868\u5DF2\u53D8\u5316\uFF0C\u8BF7\u91CD\u8BD5\u3002");let s=e.map(i=>i.workspaceId);if(t===r)return{order:s,beforeId:r};s.splice(s.indexOf(t),1),s.splice(r===void 0?s.length:s.indexOf(r),0,t);let a=n.get(t)?.entry.key,l=s.slice(s.indexOf(t)+1).find(i=>n.get(i)?.entry.key===a);return{order:s,beforeId:n.get(l)?.id??l}}var _=require("react/jsx-runtime");function ft(e,n,t){let r=Object.fromEntries(Object.entries(n||{}).map(([l,i])=>[t+l,i])),s=[];return{declarations:r,start:()=>{for(let l of Object.keys(n||{})){let i=[],h=()=>{i.splice(0).reverse().forEach(p=>p());for(let p of e.slots.entries(l)){let m=ft(e,p.children,t),y=p.component;i.push(e.slots.register({...p.options,name:t+l,...p.inject?{inject:p.inject}:{},...p.store?{store:p.store}:{},...p.locale?{locale:p.locale}:{},...p.children?{children:m.declarations}:{}},p.children?c=>(0,_.jsx)(y,{...c,renderSlot:(u,b,k)=>c.renderSlot(t+u,b,k)}):y)),p.children&&i.push(m.start())}};h(),s.push(e.slots.subscribe(l,h),()=>i.splice(0).reverse().forEach(p=>p()))}return()=>s.splice(0).reverse().forEach(l=>l())}}}function Dt({Native:e,ctx:n,model:t,prefix:r,...s}){oe(t);let a=t.conversations,l=s.useSessions(w=>w),i=s.useWorkspaces(w=>w),h=s.useSessionStatus(w=>w),p=s.usePanelInfo(w=>w),m=[...a.entries.values()],y=a.visible()?a.activeKey:null,c=(0,wt.useMemo)(()=>ut(l,i,h,m,y,a.workspaceOrder),[l,i,h,y,a.workspaceOrder,a.catalogRevision]),u=w=>c.targets.get(w),b=w=>void Promise.resolve().then(w).catch(W=>{a.error=W.message,t.emit()}),k=w=>{a.activeKey=w.key,n.layout.selectPanel(he),t.emit()},g=async(w,W,S={})=>{let I=u(w);if(!I)throw new Error("WSL \u5DE5\u4F5C\u533A\u5DF2\u53D8\u5316\uFF0C\u8BF7\u91CD\u8BD5\u3002");await a.remote(I.entry,W,{[I.kind==="workspace"?"workspaceId":"sessionId"]:I.id,...S}),(W==="workspace.start"||W==="session.fork")&&k(I.entry)},O=(w,W)=>u(w)?a.requestRename({...u(w),title:W}):s.requestSessionRename(w,W),C=w=>w.row.running?(a.dialog={type:"archive",target:w},t.emit()):b(()=>a.remote(w.entry,"archive",{sessionId:w.id}));return(0,_.jsx)(e,{...s,useSessions:w=>w(c.sessions),useWorkspaces:w=>w(c.workspaces),useSessionStatus:w=>w(c.status),usePanelInfo:w=>w(y?{...p,activePanelId:null}:p),startSession:w=>u(w)?b(()=>g(w,"workspace.start")):void a.newWindows(w),open:w=>u(w)?void a.openRow({...u(w).row,environment:u(w).entry}):s.open(w),requestSessionRename:O,renameWorkspace:(w,W)=>u(w)?g(w,"workspace.rename",{title:W}):s.renameWorkspace(w,W),deleteWorkspace:w=>u(w)?g(w,"workspace.delete"):s.deleteWorkspace(w),insertWorkspaceBefore:async(w,W)=>{if(w===W)return;let S=ht(c.workspaces.items,c.targets,w,W);u(w)?await g(w,"workspace.reorder",{beforeId:S.beforeId}):await s.insertWorkspaceBefore(w,S.beforeId),a.setWorkspaceOrder(S.order)},unarchiveSession:w=>u(w)?g(w,"unarchive"):s.unarchiveSession(w),searchSessions:async(w,W)=>{let S=await Promise.all([s.searchSessions(w,W),...m.filter(E=>E.ready).map(async E=>{let f=await a.remote(E,"search",{query:w});return{...f,items:f.items.map(D=>({...D,sessionId:We(E,"session",D.sessionId)}))}})]);if(W?.aborted)throw new DOMException("\u641C\u7D22\u5DF2\u53D6\u6D88","AbortError");let I=S.flatMap(E=>E.items);return{items:I.slice(0,s.searchResultLimit),hasMore:I.length>s.searchResultLimit||S.some(E=>E.hasMore)}},renderSlot:(w,W,S)=>{let I=u(W.sessionId);if(!I)return s.renderSlot(r+w,W,S);if(w==="sidebar.workspaces.session.menu.item"){let E=f=>()=>{S?.hookContext?.[1]?.(!1),f()};return(0,_.jsxs)(_.Fragment,{children:[!I.row.archived&&(0,_.jsx)(ie.MenuItemButton,{icon:(0,_.jsx)(ie.IconPinOutlineRegular,{}),onSelect:E(()=>b(()=>g(W.sessionId,I.row.pinned?"unpin":"pin"))),children:I.row.pinned?"\u53D6\u6D88\u7F6E\u9876":"\u7F6E\u9876\u5BF9\u8BDD"}),(0,_.jsx)(ie.MenuItemButton,{icon:(0,_.jsx)(ie.IconEditOutlineRegular,{}),onSelect:E(()=>O(W.sessionId,W.displayTitle)),children:"\u91CD\u547D\u540D"}),(0,_.jsx)(ie.MenuItemButton,{onSelect:E(()=>b(()=>g(W.sessionId,"session.fork"))),children:"\u521B\u5EFA\u5206\u652F"}),(0,_.jsx)(ie.MenuItemButton,{onSelect:E(()=>a.requestHandoff?.(I)),children:"\u4EA4\u63A5\u5DE5\u4F5C\u2026"}),(0,_.jsx)(ie.MenuItemButton,{icon:(0,_.jsx)(ie.IconArchiveOutlineRegular,{}),onSelect:E(()=>I.row.archived?b(()=>g(W.sessionId,"unarchive")):C(I)),children:I.row.archived?"\u53D6\u6D88\u5F52\u6863":"\u5F52\u6863\u5BF9\u8BDD"})]})}return w==="sidebar.workspaces.session.row.action"&&!I.row.archived?(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)("button",{className:"dsh-wsl-row-action",title:"\u5F52\u6863\u5BF9\u8BDD","aria-label":"\u5F52\u6863 WSL \u5BF9\u8BDD",onClick:()=>C(I),children:(0,_.jsx)(ie.IconArchiveOutlineRegular,{size:14})}),(0,_.jsx)("button",{className:"dsh-wsl-row-action",title:I.row.pinned?"\u53D6\u6D88\u7F6E\u9876":"\u7F6E\u9876\u5BF9\u8BDD","aria-label":I.row.pinned?"\u53D6\u6D88\u7F6E\u9876 WSL \u5BF9\u8BDD":"\u7F6E\u9876 WSL \u5BF9\u8BDD",onClick:()=>b(()=>g(W.sessionId,I.row.pinned?"unpin":"pin")),children:(0,_.jsx)(ie.IconPinOutlineRegular,{size:14})})]}):w==="sidebar.session.row.hover"?(0,_.jsxs)("div",{className:"dsh-wsl-caption",children:["WSL \xB7 ",I.entry.settings.distro," \xB7 ",I.entry.settings.user||"\u9ED8\u8BA4\u7528\u6237"]}):null}})}function gt(e,n){let t,r,s=!1,a=()=>{if(!s){s=!0;try{let h=e.slots.entries("sidebar.workspaces").find(b=>b.locale==="workspace"&&b.children?.["sidebar.workspaces.directoryFlow"]),p=n.state?.mode==="windows-host";if(r===h&&!!t==!!p||(t?.(),t=null,r=h,!p||!h))return;let m="dsh-wsl-native.",y=ft(e,h.children,m),c=e.slots.register({name:"sidebar.workspaces",priority:-60,inject:h.inject,store:h.store,locale:h.locale,children:y.declarations},b=>(0,_.jsx)(Dt,{...b,Native:h.component,ctx:e,model:n,prefix:m})),u=y.start();t=()=>{u(),c()}}finally{s=!1}}},l=n.subscribe(a),i=e.slots.subscribe("sidebar.workspaces",a);return a(),()=>{l(),i(),t?.()}}var de=require("react"),Q=require("@deepseek-ai/dsh-client-ui-primitives");var le=require("react"),xe=require("@deepseek-ai/dsh-client-ui-primitives");var P=require("react/jsx-runtime");function mt({model:e,source:n,close:t}){let r=e.conversations,s=(0,le.useMemo)(()=>[{key:"windows",label:"Windows",entry:null,catalog:r.nativeCatalog()},...[...r.entries.values()].map(f=>({key:f.key,entry:f,catalog:f.catalog,label:`WSL \xB7 ${f.settings.distro}${f.settings.user?" \xB7 "+f.settings.user:""}`}))].filter(f=>f.key!==(n.entry?.key||"windows")),[n,r]),[a,l]=(0,le.useState)(s[0]?.key||""),[i,h]=(0,le.useState)(""),[p,m]=(0,le.useState)(""),[y,c]=(0,le.useState)(""),[u,b]=(0,le.useState)(!1),[k,g]=(0,le.useState)(""),[O,C]=(0,le.useState)(()=>crypto.randomUUID()),L=s.find(f=>f.key===a),w=tt(n,p,y),W=w.length>24e3,S=async()=>{b(!0),g("");try{let f=await r.handoff(n.entry,"handoff.read",{sessionId:n.id});c(f.text)}catch(f){g(f.message)}finally{b(!1)}},I=async f=>{b(!0),g("");try{let[D,V]=JSON.parse(i);await r.handoff(L.entry,"handoff.deliver",{transferId:O,mode:f,text:w,[D==="workspace"?"workspaceId":"sessionId"]:V}),t()}catch(D){g(D.message)}finally{b(!1)}},E=u||!i||!p.trim()&&!y.trim()||W;return(0,P.jsx)(xe.Modal,{open:!0,title:"\u8DE8\u73AF\u5883\u4EA4\u63A5\u5DE5\u4F5C",closeLabel:"\u5173\u95ED\u4EA4\u63A5",onClose:u?()=>{}:t,description:`\u6765\u6E90\uFF1A${n.entry?"WSL \xB7 "+n.entry.settings.distro:"Windows"} \xB7 ${n.row.title||"\u65B0\u5BF9\u8BDD"}`,className:"dsh-wsl-picker",footer:(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)(xe.Button,{disabled:u,onClick:t,children:"\u53D6\u6D88"}),(0,P.jsx)(xe.Button,{variant:"outline",disabled:E,onClick:()=>void I("draft"),children:"\u653E\u5165\u76EE\u6807\u8F93\u5165\u6846"}),(0,P.jsx)(xe.Button,{variant:"primary",disabled:E,onClick:()=>void I("send"),children:"\u53D1\u9001\u4EA4\u63A5"})]}),children:(0,P.jsxs)("div",{className:"dsh-wsl-dialog-form",children:[s.length?(0,P.jsxs)(P.Fragment,{children:[(0,P.jsxs)("label",{children:["\u76EE\u6807\u73AF\u5883",(0,P.jsx)("select",{value:a,disabled:u,onChange:f=>{l(f.target.value),h(""),C(crypto.randomUUID())},children:s.map(f=>(0,P.jsx)("option",{value:f.key,children:f.label},f.key))})]}),(0,P.jsxs)("label",{children:["\u4EA4\u7ED9\u54EA\u6761\u5BF9\u8BDD",(0,P.jsxs)("select",{value:i,disabled:u,onChange:f=>{h(f.target.value),C(crypto.randomUUID())},children:[(0,P.jsx)("option",{value:"",children:"\u9009\u62E9\u5DF2\u6709\u5BF9\u8BDD\uFF0C\u6216\u5728\u5DE5\u4F5C\u533A\u4E2D\u65B0\u5EFA"}),(0,P.jsx)("optgroup",{label:"\u65B0\u5EFA\u5BF9\u8BDD",children:(L?.catalog?.workspaces||[]).map(f=>(0,P.jsxs)("option",{value:JSON.stringify(["workspace",f.workspaceId]),children:[f.title||f.path," \xB7 \u65B0\u5BF9\u8BDD"]},f.workspaceId))}),(0,P.jsx)("optgroup",{label:"\u5DF2\u6709\u5BF9\u8BDD",children:(L?.catalog?.rows||[]).filter(f=>!f.archived).map(f=>(0,P.jsxs)("option",{value:JSON.stringify(["session",f.id]),children:[f.title||"\u65B0\u5BF9\u8BDD",f.running?" \xB7 \u8FD0\u884C\u4E2D\uFF0C\u4EA4\u63A5\u5C06\u6392\u961F":""]},f.id))})]})]})]}):(0,P.jsx)("p",{children:"\u5148\u6253\u5F00\u53E6\u4E00\u8FB9\u7684\u73AF\u5883\uFF0C\u518D\u4ECE\u5BF9\u8BDD\u83DC\u5355\u53D1\u8D77\u4EA4\u63A5\u3002"}),(0,P.jsxs)("label",{children:["\u5DE5\u4F5C\u8BF4\u660E",(0,P.jsx)("textarea",{value:p,disabled:u,maxLength:2e4,onChange:f=>m(f.target.value),placeholder:"\u5DF2\u5B8C\u6210\u7684\u5185\u5BB9\u3001\u76F8\u5173\u6587\u4EF6\u3001\u63A5\u4E0B\u6765\u9700\u8981\u505A\u7684\u5DE5\u4F5C\u2026"})]}),(0,P.jsxs)("div",{children:[(0,P.jsx)(xe.Button,{size:"sm",variant:"outline",disabled:u,onClick:()=>void S(),children:"\u5E26\u5165\u6700\u8FD1\u5BF9\u8BDD"}),(0,P.jsx)("span",{className:"dsh-wsl-caption",children:"\u3000\u6700\u591A 8 \u6761\u6587\u5B57\u6D88\u606F\uFF0C\u53EF\u5728\u4E0B\u65B9\u7F16\u8F91"})]}),y&&(0,P.jsxs)("label",{children:["\u5BF9\u8BDD\u6458\u5F55",(0,P.jsx)("textarea",{value:y,disabled:u,onChange:f=>c(f.target.value)})]}),(0,P.jsxs)("details",{children:[(0,P.jsx)("summary",{children:"\u9884\u89C8\u5B8C\u6574\u4EA4\u63A5\u5185\u5BB9"}),(0,P.jsx)("pre",{className:"dsh-wsl-handoff-preview",children:w})]}),(0,P.jsx)("p",{className:"dsh-wsl-caption",children:"\u53D1\u9001\u540E\uFF0C\u8FD0\u884C\u4E2D\u7684\u76EE\u6807\u5BF9\u8BDD\u4F1A\u5C06\u4EA4\u63A5\u6392\u961F\u5904\u7406\u3002\u6765\u6E90\u4EFB\u52A1\u7EE7\u7EED\u8FD0\u884C\uFF0C\u6587\u4EF6\u4FDD\u6301\u539F\u4F4D\u7F6E\u3002"}),W&&(0,P.jsx)("p",{role:"alert",children:"\u5185\u5BB9\u8D85\u8FC7 24,000 \u4E2A\u5B57\u7B26\uFF0C\u8BF7\u7CBE\u7B80\u5DE5\u4F5C\u8BF4\u660E\u6216\u5BF9\u8BDD\u6458\u5F55\u3002"}),k&&(0,P.jsx)("p",{role:"alert",className:"dsh-wsl-inline-error",children:k})]})})}var z=require("react/jsx-runtime");function Pt({model:e,api:n,close:t}){let r=e.conversations,[s,a]=(0,de.useState)(()=>fe(r.entries.get(r.activeKey)?.settings||e.state?.settings||{},e.state?.distros)),[l,i]=(0,de.useState)(!1),[h,p]=(0,de.useState)(!1),[m,y]=(0,de.useState)(""),c=async u=>{i(!1),a(b=>({...b,directory:u})),p(!0),y(""),await r.enter({...s,directory:u},{create:!0}),p(!1),r.error?y(r.error):t()};return l?(0,z.jsx)(Oe,{api:n,distro:s.distro,user:s.user,initialPath:s.directory,allowCreate:!0,onClose:()=>i(!1),onSelect:c}):(0,z.jsx)(Q.Modal,{open:!0,onClose:h?()=>{}:t,title:"\u65B0\u5EFA WSL \u5DE5\u4F5C\u533A",closeLabel:"\u5173\u95ED",description:"\u9009\u62E9 Linux \u6587\u4EF6\u5939\uFF0C\u6216\u5728\u6D4F\u89C8\u76EE\u5F55\u65F6\u65B0\u5EFA\u6587\u4EF6\u5939\u3002",className:"dsh-wsl-picker",footer:(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(Q.Button,{disabled:h,onClick:t,children:"\u53D6\u6D88"}),(0,z.jsx)(Q.Button,{variant:"primary",disabled:h||!s.distro||!s.directory.trim(),onClick:()=>void c(s.directory.trim()),children:h?"\u6B63\u5728\u6253\u5F00\u2026":"\u521B\u5EFA\u5DE5\u4F5C\u533A"})]}),children:(0,z.jsxs)("div",{className:"dsh-wsl-dialog-form",children:[(0,z.jsxs)("label",{children:["Linux \u53D1\u884C\u7248",(0,z.jsx)("select",{value:s.distro,disabled:h,onChange:u=>a({distro:u.target.value,user:"",directory:""}),children:(e.state?.distros||[]).map(u=>(0,z.jsx)("option",{children:u.name},u.name))})]}),(0,z.jsxs)("label",{children:["Linux \u7528\u6237",(0,z.jsx)(Q.Input,{value:s.user,disabled:h,placeholder:"\u9ED8\u8BA4\u7528\u6237",onChange:u=>a({...s,user:u.target.value})})]}),(0,z.jsxs)("label",{children:["\u5DE5\u4F5C\u533A\u6587\u4EF6\u5939",(0,z.jsxs)("div",{className:"dsh-wsl-pathbar",children:[(0,z.jsx)(Q.Input,{value:s.directory,disabled:h,placeholder:"/home/\u7528\u6237\u540D/\u9879\u76EE",onChange:u=>a({...s,directory:u.target.value})}),(0,z.jsx)(Q.Button,{variant:"outline",disabled:h||!s.distro,onClick:()=>i(!0),children:"\u6D4F\u89C8\u2026"})]})]}),(0,z.jsx)("p",{className:"dsh-wsl-caption",children:"\u5DE5\u4F5C\u533A\u4F1A\u52A0\u5165\u5F53\u524D\u7A97\u53E3\u7684\u539F\u751F\u5217\u8868\uFF0C\u5E76\u663E\u793A WSL \u6807\u5FD7\u3002"}),m&&(0,z.jsx)("div",{role:"alert",className:"dsh-wsl-inline-error",children:m})]})})}function Tt({model:e,target:n,close:t}){let[r,s]=(0,de.useState)(n.title||n.row.title),[a,l]=(0,de.useState)(!1),[i,h]=(0,de.useState)(""),p=async()=>{l(!0),h("");try{await e.conversations.remote(n.entry,"session.rename",{sessionId:n.id,title:r}),t()}catch(m){h(m.message)}finally{l(!1)}};return(0,z.jsx)(Q.Modal,{open:!0,onClose:a?()=>{}:t,title:"\u91CD\u547D\u540D WSL \u5BF9\u8BDD",closeLabel:"\u5173\u95ED",footer:(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(Q.Button,{disabled:a,onClick:t,children:"\u53D6\u6D88"}),(0,z.jsx)(Q.Button,{variant:"primary",disabled:a||!r.trim(),onClick:()=>void p(),children:"\u4FDD\u5B58"})]}),children:(0,z.jsxs)("form",{className:"dsh-wsl-dialog-form",onSubmit:m=>{m.preventDefault(),!a&&r.trim()&&p()},children:[(0,z.jsx)(Q.Input,{"data-modal-autofocus":!0,value:r,maxLength:500,"aria-label":"\u5BF9\u8BDD\u540D\u79F0",onChange:m=>s(m.target.value)}),i&&(0,z.jsx)("div",{role:"alert",children:i})]})})}function $t({model:e,target:n,close:t}){let[r,s]=(0,de.useState)(!1),[a,l]=(0,de.useState)(""),i=async()=>{s(!0);try{await e.conversations.remote(n.entry,"archive",{sessionId:n.id,stopActivity:!0}),t()}catch(h){l(h.message)}finally{s(!1)}};return(0,z.jsx)(Q.Modal,{open:!0,title:"\u5F52\u6863\u6B63\u5728\u8FD0\u884C\u7684 WSL \u5BF9\u8BDD",closeLabel:"\u5173\u95ED",onClose:r?()=>{}:t,description:"\u5F52\u6863\u4F1A\u505C\u6B62\u8FD9\u6761\u5BF9\u8BDD\u7684\u8FD0\u884C\u4EFB\u52A1\uFF0C\u5386\u53F2\u8BB0\u5F55\u4FDD\u7559\u3002",footer:(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(Q.Button,{disabled:r,onClick:t,children:"\u53D6\u6D88"}),(0,z.jsx)(Q.Button,{disabled:r,onClick:()=>void i(),children:"\u505C\u6B62\u5E76\u5F52\u6863"})]}),children:a&&(0,z.jsx)("p",{role:"alert",children:a})})}function vt({model:e,api:n}){oe(e);let t=e.conversations.dialog,r=()=>{e.conversations.dialog=null,e.emit()};return t?t.type==="workspace"?(0,z.jsx)(Pt,{model:e,api:n,close:r}):t.type==="rename"?(0,z.jsx)(Tt,{model:e,target:t.target,close:r}):t.type==="archive"?(0,z.jsx)($t,{model:e,target:t.target,close:r}):t.type==="handoff"?(0,z.jsx)(mt,{model:e,source:t.source,close:r}):null:e.conversations.error&&!e.conversations.visible()?(0,z.jsxs)("div",{role:"alert",className:"dsh-wsl-operation-error",children:[(0,z.jsx)("span",{children:e.conversations.error}),(0,z.jsx)(Q.Button,{variant:"ghost","aria-label":"\u5173\u95ED\u9519\u8BEF\u63D0\u793A",onClick:()=>{e.conversations.error=null,e.emit()},children:"\xD7"})]}):null}var M=require("react/jsx-runtime");function jt({ctx:e,sessionId:n,useStore:t,actions:r}){let s=t(l=>l.draft),a=(0,ee.useRef)(s);return a.current=s,(0,ee.useEffect)(()=>et(e,n,{getDraft:()=>a.current,setDraft:l=>{a.current=l,r.setDraft(l)}}),[e,n,r]),null}function bt({distro:e,connected:n=!0}){return(0,M.jsxs)("span",{className:`dsh-wsl-chat-mark${n?"":" is-offline"}`,title:`WSL \xB7 ${e||"Linux"}`,children:[(0,M.jsx)(pe,{size:12}),"WSL"]})}function Ht({ctx:e,model:n}){oe(n);let t=(0,ee.useRef)(null),r=n.conversations,s=r.entries.get(r.activeKey)?.ready;return(0,ee.useLayoutEffect)(()=>(r.setAnchor(t.current),()=>r.setAnchor(null)),[r]),(0,M.jsx)("div",{className:"dsh-wsl-chat-target",ref:t,children:!s&&(0,M.jsxs)("div",{className:"dsh-wsl-chat-loading",children:[(0,M.jsx)(Y.StateDot,{state:"ongoing"}),"\u6B63\u5728\u8FDE\u63A5 WSL \u5BF9\u8BDD\u2026",(0,M.jsx)(Y.Button,{variant:"ghost",onClick:()=>e.layout.selectPanel("dsh-wsl-native"),children:"\u67E5\u770B\u73AF\u5883"}),(0,M.jsx)(Y.Button,{variant:"ghost",onClick:()=>r.showWindows(),children:"\u8FD4\u56DE Windows \u5BF9\u8BDD"})]})})}function qt({entry:e,model:n,visible:t}){let r=(0,ee.useRef)(null);return(0,ee.useEffect)(()=>{let s=n.conversations,a=dt({host:r.current,entry:e,bridge:window.dshDesktop?.browser,onMessage:l=>s.desktopMessage(e,l),onError:l=>s.desktopError(e,l)});return e.desktop=a,()=>{a.dispose(),e.desktop===a&&(e.desktop=null)}},[e,n]),(0,M.jsx)("div",{className:"dsh-wsl-desktop-surface",ref:r,inert:!t||!!e.navigating,style:{visibility:t&&e.ready?"visible":"hidden"}})}function Ut({entry:e,model:n,visible:t,rect:r,ctx:s}){let a=n.conversations;(0,ee.useEffect)(()=>{if(e.ready||["waiting","failed"].includes(e.recovery?.phase))return;let h=setTimeout(()=>a.desktopError(e,new Error("WSL \u5BF9\u8BDD\u8FDE\u63A5\u8D85\u65F6\u3002")),45e3);return()=>clearTimeout(h)},[e,e.ready,e.recovery,a]);let l=e.recovery?.phase==="failed",i=e.catalog?.rows.find(h=>h.id===e.catalog.selectedId);return(0,M.jsxs)("section",{className:"dsh-wsl-resident","aria-label":`WSL \xB7 ${e.settings.distro} \u5BF9\u8BDD`,"aria-hidden":!t,inert:!t,style:t&&r?{top:r.top,left:r.left,width:r.width,height:r.height}:{visibility:"hidden",left:-2e4,top:0,width:r?.width||1e3,height:r?.height||800},children:[(0,M.jsxs)("header",{className:"dsh-wsl-chat-toolbar",children:[(0,M.jsx)(Y.Button,{variant:"ghost",icon:(0,M.jsx)(Y.IconPanelLeftOutlineRegular,{}),"aria-label":"\u5C55\u5F00\u6216\u6536\u8D77\u5BF9\u8BDD\u5217\u8868",title:"\u5C55\u5F00\u6216\u6536\u8D77\u5BF9\u8BDD\u5217\u8868",onClick:()=>s.layout.toggleSidebar()}),(0,M.jsx)(bt,{distro:e.settings.distro,connected:e.catalog?.connected}),(0,M.jsxs)("span",{className:"dsh-wsl-chat-context",title:i?.cwd||e.settings.directory,children:[e.settings.distro,(0,M.jsxs)("span",{children:[" \xB7 ",i?.cwd?.split("/").filter(Boolean).at(-1)||"Linux"]})]}),(0,M.jsxs)("div",{className:"dsh-wsl-chat-toolbar-actions",children:[(0,M.jsx)(Y.Button,{variant:"ghost",onClick:()=>void a.newLinux(e),children:"\u65B0\u5BF9\u8BDD"}),(0,M.jsx)(Y.Button,{variant:"ghost",disabled:!e.ready||!i,onClick:()=>a.requestHandoff({entry:e,id:i.id,row:i}),children:"\u4EA4\u63A5\u5DE5\u4F5C"}),(0,M.jsx)(Y.Button,{variant:"ghost",disabled:!e.ready,title:"\u7BA1\u7406 Linux \u63D2\u4EF6\u4E0E\u914D\u7F6E",onClick:()=>a.toggleChrome(e),children:e.configOpen?"\u8FD4\u56DE\u5BF9\u8BDD":"Linux \u914D\u7F6E"})]})]}),a.error&&t&&(0,M.jsx)("div",{role:"alert",className:"dsh-wsl-chat-notice",children:a.error}),(0,M.jsxs)("div",{className:"dsh-wsl-chat-frame-body",children:[e.transport==="desktop"?(0,M.jsx)(qt,{entry:e,model:n,visible:t}):(0,M.jsx)("iframe",{title:`WSL ${e.settings.distro} \u539F\u751F DSH \u5BF9\u8BDD`,src:e.url,ref:h=>a.bind(e,h),inert:!t||!!e.navigating,onError:()=>a.desktopError(e,new Error("WSL \u9875\u9762\u52A0\u8F7D\u5931\u8D25\u3002")),referrerPolicy:"no-referrer",allow:"clipboard-read; clipboard-write",style:{visibility:t&&e.ready?"visible":"hidden"}},e.channel),!e.ready&&(0,M.jsxs)("div",{className:"dsh-wsl-chat-loading",role:"status",children:[!l&&(0,M.jsx)(Y.StateDot,{state:"ongoing"}),(0,M.jsxs)("span",{children:[e.recovery?.message||"\u6B63\u5728\u6253\u5F00 Linux \u5BF9\u8BDD\u2026",e.recovery&&!l?` (${e.recovery.attempt}/3)`:""]}),l&&(0,M.jsx)(Y.Button,{onClick:()=>a.reconnect(e),children:"\u91CD\u65B0\u8FDE\u63A5"}),(0,M.jsx)(Y.Button,{variant:"ghost",onClick:()=>a.showWindows(),children:"\u8FD4\u56DE Windows"})]})]})]})}function _t({ctx:e,model:n}){oe(n);let[t,r]=(0,ee.useState)(null),s=n.conversations,a=s?.visible(),l=s?.anchor;return(0,ee.useLayoutEffect)(()=>{if(!l)return;let i,h=()=>{cancelAnimationFrame(i),i=requestAnimationFrame(()=>{let m=l.getBoundingClientRect();r({top:m.top,left:m.left,width:Math.max(0,document.documentElement.clientWidth-m.left),height:m.height})})},p=new ResizeObserver(h);return p.observe(l),window.addEventListener("resize",h),h(),()=>{p.disconnect(),window.removeEventListener("resize",h),cancelAnimationFrame(i)}},[l]),(0,ee.useEffect)(()=>(document.documentElement.toggleAttribute("data-dsh-wsl-conversation",!!a),()=>document.documentElement.removeAttribute("data-dsh-wsl-conversation")),[a]),n.state?.mode!=="windows-host"||!s?null:(0,M.jsx)(M.Fragment,{children:[...s.entries.values()].filter(i=>i.url).map(i=>(0,M.jsx)(Ut,{entry:i,model:n,ctx:e,visible:!!a&&!!l&&s.activeKey===i.key,rect:t},i.key+i.channel))})}function Vt({model:e}){oe(e);let n=(0,ee.useRef)(null),t=e.guest?.compact===!0;return(0,ee.useLayoutEffect)(()=>{let r=n.current?.closest("[data-shell-overlay]")?.parentElement;if(!r||!e.guest)return;let a=r.querySelector(":scope > [data-rightbar-col]")?.previousElementSibling,l=a?.previousElementSibling;l?.setAttribute("data-dsh-wsl-guest-sidebar",""),a?.setAttribute("data-dsh-wsl-guest-center",""),r.toggleAttribute("data-dsh-wsl-embedded",t);let i=()=>{let m=/minmax\(0px,\s*([\d.]+px)\)\s*$/.exec(r.style.gridTemplateColumns)?.[1]||"0px";r.style.getPropertyValue("--dsh-wsl-right-track")!==m&&r.style.setProperty("--dsh-wsl-right-track",m)},h=new MutationObserver(i);return h.observe(r,{attributes:!0,attributeFilter:["style"]}),i(),()=>{h.disconnect(),r.removeAttribute("data-dsh-wsl-embedded"),r.style.removeProperty("--dsh-wsl-right-track"),l?.removeAttribute("data-dsh-wsl-guest-sidebar"),a?.removeAttribute("data-dsh-wsl-guest-center")}},[e.guest,t]),(0,M.jsx)("span",{ref:n})}function xt(e,n,t){e.slots.inject("conversation.input.dock",()=>{let r=e.slots.entries("conversation.session").find(s=>s.store?.spec?.persist==="dsh.conversation");if(r)return e.slots.register({name:"conversation.input.dock",id:"dsh-wsl-handoff-draft",store:r.store},s=>(0,M.jsx)(jt,{...s,ctx:e}))}),e.effect(()=>pt(e,n)),e.effect(()=>gt(e,n)),e.slots.inject("sidebar.workspaces.session.menu.item",()=>e.slots.register({name:"sidebar.workspaces.session.menu.item",id:"dsh-wsl-handoff",order:350},r=>{let[,s]=r.useMenuOpenState();return n.state?.mode!=="windows-host"||n.guest?null:(0,M.jsx)(Y.MenuItemButton,{onSelect:()=>{s(!1);let a=n.conversations.nativeCatalog().rows.find(l=>l.id===r.sessionId);a&&n.conversations.requestHandoff({id:a.id,row:a})},children:"\u4EA4\u63A5\u5DE5\u4F5C\u2026"})})),e.slots.inject("main",()=>e.slots.register({name:"main",key:he},()=>(0,M.jsx)(Ht,{ctx:e,model:n}))),e.slots.inject("shell.overlay",()=>e.slots.register({name:"shell.overlay",id:"dsh-wsl-conversations",order:15},()=>(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(_t,{ctx:e,model:n}),(0,M.jsx)(Vt,{model:n}),(0,M.jsx)(vt,{model:n,api:t,ctx:e})]}))),e.slots.inject("sidebar.workspaces",()=>{let r,s=()=>{let l=n.state?.mode==="windows-host"&&!!te(location.origin)&&n.conversations?.unified;l&&!r?r=e.slots.register({name:"sidebar.workspaces",priority:-80},i=>(0,M.jsx)(ct,{...i,ctx:e,model:n})):!l&&r&&(r(),r=null)},a=n.subscribe(s);return s(),()=>{a(),r?.()}}),e.slots.inject("conversation.session.header.actions",()=>e.slots.register({name:"conversation.session.header.actions",id:"dsh-wsl-environment",order:5},()=>(oe(n),n.state?.mode==="wsl-host"&&!n.guest?(0,M.jsx)(bt,{distro:n.state.settings.distro}):null)))}var yt=require("react/jsx-runtime"),Ue="dsh-wsl-native",Jt="dsh-wsl-native-client",Ft=["connection","slots","layout","workspaces","uiWorkspace","sessions"];function Kt(e){let n=async(r,s={})=>{let a=await e.connection.rpc.call("/api",`${Ue}/${r}`,s);if(!a.ok)throw Object.assign(new Error(a.error?.message||"\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\u3002"),{code:a.error?.code});return a.value},t=rt(e,n);t.conversations=lt(e,n,t),xt(e,t,n),e.effect(()=>()=>t.dispose()),e.effect(()=>{let r=document.createElement("style");return r.dataset.dshWslNative="",r.textContent=_e,document.head.append(r),()=>r.remove()}),e.slots.inject("main",()=>e.slots.register({name:"main",key:Ue},()=>(0,yt.jsx)(at,{api:n,ctx:e,model:t}))),e.slots.inject("sidebar.panellist",()=>e.slots.register({name:"sidebar.panellist",id:Ue,order:20,label:()=>"WSL \u4E0E Windows"},pe))}

return module.exports;}});
