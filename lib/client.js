window.__ModuleLoader__.load({id:"dsh-wsl-native",factory:(require)=>{const module={exports:{}};const exports=module.exports;
"use strict";var Me=Object.defineProperty;var yt=Object.getOwnPropertyDescriptor;var kt=Object.getOwnPropertyNames;var St=Object.prototype.hasOwnProperty;var It=(e,n)=>{for(var t in n)Me(e,t,{get:n[t],enumerable:!0})},Lt=(e,n,t,r)=>{if(n&&typeof n=="object"||typeof n=="function")for(let s of kt(n))!St.call(e,s)&&s!==t&&Me(e,s,{get:()=>n[s],enumerable:!(r=yt(n,s))||r.enumerable});return e};var Nt=e=>Lt(Me({},"__esModule",{value:!0}),e);var Kt={};It(Kt,{apply:()=>Jt,inject:()=>Ft,name:()=>Vt});module.exports=Nt(Kt);var yn=require("react");var Ue=`.dsh-wsl-conversations { position:relative; display:flex; flex-direction:column; gap:4px; min-height:0; height:100%; padding:0 6px; color:var(--dsw-alias-label-primary); font:13px/1.5 var(--dsw-font-family); }\r
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
.dsh-wsl-new-linux { color:var(--dsw-alias-label-primary); background:color-mix(in srgb,var(--dsw-alias-label-primary) 6%,var(--dsw-alias-bg-base)); }
.dsh-wsl-new-pair > button:hover { background:var(--dsw-alias-interactive-bg-hover); }
.dsh-wsl-new-pair > button:disabled { opacity:.5; cursor:default; }
.dsh-wsl-new-pair.is-narrow { flex-direction:column; }
.dsh-wsl-new-pair.is-narrow span { display:none; }
.dsh-wsl-new-pair.is-narrow button { flex:none; }
.dsh-wsl-native-toggle { margin-right:auto; }
.dsh-wsl-workspace-mark { flex:none; font:10px/16px var(--dsw-font-family); color:var(--dsw-alias-label-tertiary); border:1px solid var(--dsw-alias-border-l4); border-radius:4px; padding:0 4px; margin-left:5px; }
.dsh-wsl-session-mark { margin-left:2px; margin-right:4px; white-space:nowrap; pointer-events:none; }\r
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
`;var se=require("react"),j=require("@deepseek-ai/dsh-client-ui-primitives"),A=require("react/jsx-runtime");function le({size:e=20}){return(0,A.jsxs)("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.35",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:[(0,A.jsx)("rect",{x:"3",y:"4.5",width:"18",height:"15",rx:"3"}),(0,A.jsx)("path",{d:"m7 9 3 3-3 3m6 0h4"})]})}function Re({size:e=20}){return(0,A.jsxs)("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.35",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:[(0,A.jsx)("rect",{x:"3",y:"4",width:"18",height:"13",rx:"2.5"}),(0,A.jsx)("path",{d:"M8 21h8m-4-4v4"})]})}function ve({size:e=16}){return(0,A.jsx)("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:(0,A.jsx)("path",{d:"M14 4h6v6m0-6L10 14m0-10H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4"})})}function Ne({state:e="idle",children:n}){return(0,A.jsxs)("span",{className:"dsh-wsl-badge",children:[(0,A.jsx)(j.StateDot,{state:e,size:e==="ongoing"?12:7}),n]})}function ue(e,n=[]){return{distro:e.distro||n.find(t=>t.isDefault)?.name||n[0]?.name||"",user:e.user||"",directory:e.directory||""}}var Ct=e=>e.replace(/\/+$/,"").replace(/\/[^/]*$/,"")||"/",Ot=(e,n)=>`${e.replace(/\/+$/,"")}/${n}`;function ze(e){return/ENOENT/.test(e.message)?"\u627E\u4E0D\u5230\u8FD9\u4E2A\u6587\u4EF6\u5939\uFF0C\u8BF7\u68C0\u67E5\u8DEF\u5F84\u540E\u91CD\u8BD5\u3002":/EACCES|EPERM/.test(e.message)?"\u5F53\u524D Linux \u7528\u6237\u6CA1\u6709\u6743\u9650\u8BFB\u53D6\u8FD9\u4E2A\u6587\u4EF6\u5939\u3002":/ENOTDIR/.test(e.message)?"\u8FD9\u4E2A\u8DEF\u5F84\u6307\u5411\u6587\u4EF6\uFF0C\u8BF7\u9009\u62E9\u4E00\u4E2A\u6587\u4EF6\u5939\u3002":e.message}function We({api:e,distro:n,user:t,initialPath:r,onClose:s,onSelect:a,allowCreate:d=!1}){let[i,h]=(0,se.useState)(null),[c,m]=(0,se.useState)(r),[v,p]=(0,se.useState)(!1),[f,u]=(0,se.useState)(!1),[O,C]=(0,se.useState)(""),[W,N]=(0,se.useState)(null),y=(0,se.useRef)(0),w=(0,se.useCallback)(async(k,E=0,g=!1)=>{let P=++y.current;u(!0),C("");try{let o=k?null:await e("connect",{distro:n,user:t}),b=await e("browse",{distro:n,user:t,path:k||o.home,offset:E,hidden:g});if(P!==y.current)return;h(S=>({...b,entries:E?[...S?.entries||[],...b.entries]:b.entries})),m(b.path)}catch(o){P===y.current&&C(ze(o))}finally{P===y.current&&u(!1)}},[e,n,t]);(0,se.useEffect)(()=>(w(r),()=>{y.current++}),[w,r]);let L=(i?.entries||[]).filter(k=>k.type==="directory"||k.type==="symlink").sort((k,E)=>k.name.localeCompare(E.name,"zh-CN",{numeric:!0})),I=k=>{w(k,0,v)};return(0,A.jsxs)(j.Modal,{open:!0,onClose:s,title:"\u9009\u62E9 Linux \u6587\u4EF6\u5939",closeLabel:"\u5173\u95ED\u6587\u4EF6\u5939\u9009\u62E9",description:`${n} \u4E2D\u7684 Linux \u6587\u4EF6\u5939\u3002`,className:"dsh-wsl-picker",contentClassName:"dsh-wsl-picker-content",footer:(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(j.Button,{onClick:s,children:"\u53D6\u6D88"}),(0,A.jsx)(j.Button,{variant:"primary",disabled:f||!i||!!O||c!==i.path,onClick:()=>a(i.path),children:"\u9009\u62E9\u6B64\u6587\u4EF6\u5939"})]}),children:[(0,A.jsxs)("form",{className:"dsh-wsl-pathbar",onSubmit:k=>{k.preventDefault(),I(c)},children:[(0,A.jsx)(j.Button,{variant:"outline",title:"\u8FD4\u56DE\u4E0A\u7EA7","aria-label":"\u8FD4\u56DE\u4E0A\u7EA7",disabled:f||!i||i.path==="/",icon:(0,A.jsx)(j.IconChevronLeftOutlineMedium,{}),onClick:()=>I(Ct(i.path))}),(0,A.jsx)(j.Input,{"aria-label":"\u6587\u4EF6\u5939\u8DEF\u5F84","data-modal-autofocus":!0,value:c,onChange:k=>m(k.target.value),spellCheck:!1,className:"dsh-wsl-pathinput",placeholder:"/home"}),(0,A.jsx)(j.Button,{variant:"outline",type:"submit",disabled:f||!c.trim(),children:"\u524D\u5F80"})]}),(0,A.jsxs)("div",{className:"dsh-wsl-folder-meta",children:[(0,A.jsxs)("span",{children:[L.length," \u4E2A\u6587\u4EF6\u5939",i?.nextOffset!=null?" \xB7 \u8FD8\u6709\u66F4\u591A":""]}),(0,A.jsxs)("label",{children:[(0,A.jsx)("input",{type:"checkbox",checked:v,disabled:f,onChange:k=>{let E=k.target.checked;p(E),w(i?.path||c,0,E)}}),"\u663E\u793A\u9690\u85CF\u9879"]})]}),d&&(0,A.jsx)("div",{className:"dsh-wsl-folder-create",children:W===null?(0,A.jsx)(j.Button,{size:"sm",variant:"ghost",disabled:f||!i||!!O,onClick:()=>N(""),children:"\uFF0B \u65B0\u5EFA\u6587\u4EF6\u5939"}):(0,A.jsxs)("form",{className:"dsh-wsl-pathbar",onSubmit:async k=>{if(k.preventDefault(),!(f||!W.trim())){u(!0),C("");try{let E=await e("directory/create",{distro:n,user:t,parent:i.path,name:W.trim()});N(null),await w(E.path,0,v)}catch(E){C(E.message),u(!1)}}},children:[(0,A.jsx)(j.Input,{"aria-label":"\u65B0\u6587\u4EF6\u5939\u540D\u79F0",value:W,placeholder:"\u6587\u4EF6\u5939\u540D\u79F0",maxLength:255,onChange:k=>N(k.target.value)}),(0,A.jsx)(j.Button,{type:"submit",disabled:f||!W.trim(),children:"\u521B\u5EFA"}),(0,A.jsx)(j.Button,{disabled:f,onClick:()=>N(null),children:"\u53D6\u6D88"})]})}),(0,A.jsxs)("div",{className:"dsh-wsl-folder-list","aria-label":"\u6587\u4EF6\u5939\u5217\u8868","aria-busy":f,children:[O&&(0,A.jsxs)("div",{className:"dsh-wsl-inline-error",role:"alert",children:[O,(0,A.jsx)(j.Button,{size:"sm",onClick:()=>I(c),children:"\u91CD\u8BD5"})]}),!O&&L.map(k=>(0,A.jsxs)("button",{type:"button",className:"dsh-wsl-folder",disabled:f,onClick:()=>I(Ot(i.path,k.name)),children:[(0,A.jsx)(j.IconFolderCloseRegular,{size:18}),(0,A.jsx)("span",{children:k.name}),k.type==="symlink"&&(0,A.jsx)("small",{children:"\u94FE\u63A5"}),(0,A.jsx)(j.IconChevronRightOutlineRegular,{size:14})]},k.name)),f&&(0,A.jsxs)("div",{className:"dsh-wsl-empty",role:"status",children:[(0,A.jsx)(j.StateDot,{state:"ongoing"}),"\u6B63\u5728\u8BFB\u53D6\u6587\u4EF6\u5939\u2026"]}),!f&&!O&&!L.length&&(0,A.jsxs)("div",{className:"dsh-wsl-empty",children:[(0,A.jsx)(j.IconFolderOpenOutlineRegular,{size:28}),(0,A.jsx)("span",{children:i?.nextOffset!=null?"\u8FD9\u6279\u6761\u76EE\u4E2D\u6CA1\u6709\u6587\u4EF6\u5939":"\u6B64\u76EE\u5F55\u4E0B\u6CA1\u6709\u53EF\u663E\u793A\u7684\u6587\u4EF6\u5939"})]}),!f&&!O&&i?.nextOffset!=null&&(0,A.jsx)(j.Button,{className:"dsh-wsl-load-more",onClick:()=>w(i.path,i.nextOffset,v),children:"\u52A0\u8F7D\u66F4\u591A"})]}),(0,A.jsxs)("p",{className:"dsh-wsl-picker-hint",children:[i?.path||"\u9009\u62E9\u4E00\u4E2A\u76EE\u5F55",c!==i?.path&&i?" \xB7 \u70B9\u51FB\u201C\u524D\u5F80\u201D\u67E5\u770B\u8F93\u5165\u7684\u8DEF\u5F84":""]})]})}var _=require("react"),D=require("@deepseek-ai/dsh-client-ui-primitives");var de="dsh-app://app";function Q(e){return e===de||e===de+"/"?de:he(e)}function De(e){return Q(e)===de?"dsh://open":he(e)}function he(e){if(!e)return null;try{let n=new URL(e);return!["http:","https:"].includes(n.protocol)||!["127.0.0.1","localhost","[::1]"].includes(n.hostname)||n.username||n.password||n.search||n.hash||n.pathname!=="/"?null:n.origin}catch{return null}}function we(e){if(!e?.startsWith("#dsh-wsl=")||e.length>16e3)return null;try{let n=JSON.parse(decodeURIComponent(e.slice(9)));return typeof n.id!="string"||n.id.length>100||typeof n.distro!="string"||typeof n.user!="string"||typeof n.directory!="string"||!n.directory.startsWith("/")||/[\x00-\x1f]/.test(n.directory)?null:{id:n.id,distro:n.distro,user:n.user,directory:n.directory,parentOrigin:Q(n.parentOrigin),...n.proof?{issuedAt:n.issuedAt,proof:n.proof}:{}}}catch{return null}}var _e=new WeakMap;function Pe(e,n){let t=_e.get(e);if(t||_e.set(e,t=new Map),t.has(n))return t.get(n);let r=Promise.resolve().then(async()=>{try{return await e.uiWorkspace.connectWorkspace(n)}catch(s){if(s?.name!=="SessionCreateError"||s.rpcError?.code!=="agent-preset/not-found")throw s;return e.sessions.create({workspaceId:n})}}).finally(()=>t.delete(n));return t.set(n,r),r}async function fe(e,n,t){let r=e.layout.beginNavigation(),s=await Pe(e,n);return!r.aborted&&!t?.aborted&&e.uiWorkspace.openSession(s),s}async function Ve(e,n){let t=e.workspaces.list.getSnapshot(),r=e.sessions.list.getSnapshot(),s=r.ids.find(d=>r.byId[d]?.retainedBy?.mainView>0),a=n??t.items.find(d=>d.sessionIds.includes(s))?.workspaceId;if(a===void 0&&t.phase==="ready"&&r.phase==="ready"){let d=Number.NEGATIVE_INFINITY;for(let i of t.items){let h=i.sessionIds.map(m=>r.byId[m]?.updatedAt).filter(Number.isFinite),c=h.length?Math.max(...h):Date.parse(i.createdAt);(a===void 0||c>d)&&(a=i.workspaceId,d=c)}}a===void 0?e.uiWorkspace.startSession():await fe(e,a)}var be="dsh-wsl-conversation/1",ce="dsh-wsl-conversation",Te=/^[a-zA-Z0-9-]{32,64}$/,pe=(e,n)=>typeof e=="string"?e.slice(0,n):"";function Ce(e){return JSON.stringify([e.distro||"",e.user||""])}function Fe(e,n,t){let r=new URL(e),s=we(r.hash);if(!he(r.origin)||!Q(t)||!Te.test(n)||!s?.proof||s.parentOrigin!==Q(t))throw new Error("\u65E0\u6CD5\u9A8C\u8BC1\u540C\u7A97\u53E3\u5BF9\u8BDD\u7684\u76EE\u6807\u5730\u5740\uFF0C\u8BF7\u91CD\u65B0\u8FDB\u5165 Linux\u3002");let a=JSON.parse(decodeURIComponent(r.hash.slice(9))),d={channel:n,...Q(t)===de?{transport:"desktop"}:{}};return r.hash="dsh-wsl="+encodeURIComponent(JSON.stringify({...a,embed:d})),r.href}function Je(e){let n=we(e);if(!n?.proof||!n.parentOrigin)return null;try{let{embed:t}=JSON.parse(decodeURIComponent(e.slice(9)));return!Te.test(t?.channel||"")||t.transport!==void 0&&(t.transport!=="desktop"||n.parentOrigin!==de)?null:{channel:t.channel,parentOrigin:n.parentOrigin,...t.transport?{transport:t.transport}:{}}}catch{return null}}function Oe(e,{origin:n,source:t,channel:r}){return!!t&&e.source===t&&e.origin===n&&!!he(n)&&Te.test(r||"")&&e.data?.protocol===be&&e.data.channel===r&&["catalog","request","result","return","sidebar"].includes(e.data.type)}function xe(e){if(!e||!Array.isArray(e.rows)||e.rows.length>5e3)return null;let n=new Set,t=[];for(let a of e.rows)!a||typeof a.id!="string"||!a.id||a.id.length>200||n.has(a.id)||(n.add(a.id),t.push({id:a.id,title:pe(a.title,500),cwd:pe(a.cwd,4096),workspaceId:pe(a.workspaceId,200),workspaceTitle:pe(a.workspaceTitle,500),running:a.running===!0,blank:a.blank===!0,pinned:a.pinned===!0,archived:a.archived===!0,updatedAt:Number.isFinite(a.updatedAt)?a.updatedAt:0}));let r=new Set,s=[];for(let a of(Array.isArray(e.workspaces)?e.workspaces:[]).slice(0,2048))!a||typeof a.workspaceId!="string"||!a.workspaceId||a.workspaceId.length>200||r.has(a.workspaceId)||(r.add(a.workspaceId),s.push({workspaceId:a.workspaceId,path:pe(a.path,4096),title:pe(a.title,500),sessionIds:[...new Set((Array.isArray(a.sessionIds)?a.sessionIds:[]).filter(d=>n.has(d)))],createdAt:pe(a.createdAt,100),updatedAt:pe(a.updatedAt,100)}));for(let a of t)a.workspaceId&&!r.has(a.workspaceId)&&(r.add(a.workspaceId),s.push({workspaceId:a.workspaceId,path:a.cwd,title:a.workspaceTitle,sessionIds:t.filter(d=>d.workspaceId===a.workspaceId).map(d=>d.id),createdAt:"",updatedAt:""}));return{rows:t,workspaces:s,selectedId:t.some(a=>a.id===e.selectedId)?e.selectedId:null,connected:e.connected===!0,phase:e.phase==="ready"?"ready":"loading"}}function ye(e){let n=e.sessions.list.getSnapshot(),t=e.workspaces.list.getSnapshot(),r=new Map;for(let i of t.items||[])for(let h of i.sessionIds)r.set(h,i);let s=new Set(t.archivedSessionIds||[]),a=new Set(t.pinnedSessionIds||[]),d=n.ids.map(i=>n.byId[i]).filter(i=>i&&!i.parentId).slice(0,5e3);return xe({phase:n.phase,connected:e.connection.state.getSnapshot()==="connected",workspaces:t.items,selectedId:d.find(i=>i.retainedBy?.mainView>0)?.id,rows:d.map(i=>({id:i.id,title:i.title||(i.blank?"\u65B0\u5BF9\u8BDD":i.displayTitle),cwd:i.cwd,workspaceId:r.get(i.id)?.workspaceId,workspaceTitle:r.get(i.id)?.title||"",running:i.running,blank:i.blank,updatedAt:i.updatedAt,archived:s.has(i.id),pinned:a.has(i.id)}))})}function $e(e,n,{filter:t="all",query:r="",archived:s=!1}={}){let a=(e?.rows||[]).map(i=>({...i,environment:null,key:JSON.stringify(["windows",i.id])}));for(let i of n)for(let h of i.catalog?.rows||[])a.push({...h,environment:i,key:JSON.stringify(["wsl",i.key,h.id])});let d=r.trim().toLocaleLowerCase();return a.filter(i=>i.archived===s&&(t==="all"||t==="wsl"==!!i.environment)&&(!d||[i.title,i.cwd,i.environment?.settings.distro].join(" ").toLocaleLowerCase().includes(d))).sort((i,h)=>Number(h.pinned)-Number(i.pinned)||h.updatedAt-i.updatedAt||i.key.localeCompare(h.key))}var Et=["workspace.start","workspace.rename","workspace.delete","workspace.reorder","session.rename","session.fork","search"],Ge=new Set(["refresh","theme","chrome","navigate","pin","unpin","archive","unarchive","handoff.read","handoff.deliver",...Et]);function Ke(e){if(typeof e!="string"||!e.trim()||e.length>500||/[\x00-\x1f]/.test(e))throw new Error("\u540D\u79F0\u5FC5\u987B\u662F 1\u2013500 \u4E2A\u5B57\u7B26\u3002");return e.trim()}async function Xe(e,n,t){if(n==="search"){if(typeof t.query!="string"||t.query.length>2e3)throw new Error("\u641C\u7D22\u6587\u5B57\u8FC7\u957F\u3002");let s=await e.sessions.search(t.query);if(!s.ok)throw new Error(s.error.message);return{items:s.value.items.slice(0,20).map(a=>({sessionId:a.sessionId,snippet:a.snippet.slice(0,1e3)})),hasMore:s.value.hasMore}}if(n.startsWith("workspace.")){let s=e.workspaces.list.getSnapshot().items;if(!s.some(a=>a.workspaceId===t.workspaceId))throw new Error("\u8FD9\u4E2A WSL \u5DE5\u4F5C\u533A\u5DF2\u4E0D\u5B58\u5728\uFF0C\u8BF7\u5237\u65B0\u5217\u8868\u3002");if(n==="workspace.start"){await fe(e,t.workspaceId);return}if(n==="workspace.rename"){await e.workspaces.rename(t.workspaceId,Ke(t.title));return}if(n==="workspace.delete"){await e.workspaces.delete(t.workspaceId);return}if(n==="workspace.reorder"){if(t.beforeId!==void 0&&!s.some(a=>a.workspaceId===t.beforeId))throw new Error("\u76EE\u6807\u5DE5\u4F5C\u533A\u5DF2\u4E0D\u5B58\u5728\uFF0C\u8BF7\u91CD\u8BD5\u3002");await e.workspaces.insertBefore(t.workspaceId,t.beforeId);return}}if(!e.sessions.list.getSnapshot().byId[t.sessionId])throw new Error("\u8FD9\u6761 WSL \u5BF9\u8BDD\u5DF2\u4E0D\u5B58\u5728\uFF0C\u8BF7\u5237\u65B0\u5217\u8868\u3002");if(n==="session.rename"){let s=Ke(t.title),a=await e.sessions.using(t.sessionId,{source:"workspaceOperation"},d=>d.binding.session.rename(s));if(!a.ok)throw new Error(a.error.message);return}if(n==="session.fork"){let s=await e.uiWorkspace.forkSession(t.sessionId);e.uiWorkspace.openSession(s);return}let r={pin:"pinSession",unpin:"unpinSession",archive:"archiveSession",unarchive:"unarchiveSession"};if(!r[n])throw new Error("\u5BF9\u8BDD\u64CD\u4F5C\u65E0\u6548\u3002");await e.uiWorkspace[r[n]](t.sessionId,n==="archive"?{stopActivity:t.stopActivity===!0}:void 0)}var me="__DSH_WSL_DESKTOP_V1__";function Ze(e,n,{waitMs:t=2e4}={}){let r=0,s=0,a=null,d=!1,i,h=[],c=p=>{if(d||p!==e)throw new Error("WSL \u9875\u9762\u901A\u9053\u65E0\u6548\u6216\u5DF2\u5173\u95ED\u3002")},m=p=>({sequence:r,closed:d,catalog:s>p?a:null,signals:h.filter(f=>f.sequence>p)}),v=()=>i?.();return{api:Object.freeze({async request(p,f,u={}){if(c(p),!Ge.has(f)||!u||typeof u!="object"||Array.isArray(u)||JSON.stringify(u).length>131072)throw new Error("WSL \u9875\u9762\u64CD\u4F5C\u65E0\u6548\u3002");try{let O=await n(f,u);return O===void 0?{ok:!0}:{ok:!0,value:O}}catch(O){return{ok:!1,error:String(O?.message||O).slice(0,1e3)}}},next(p,f=0){if(c(p),!Number.isSafeInteger(f)||f<0||f>r)throw new Error("WSL \u9875\u9762\u6E38\u6807\u65E0\u6548\u3002");if(r>f)return Promise.resolve(m(f));if(i)throw new Error("WSL \u9875\u9762\u5DF2\u7ECF\u5B58\u5728\u7B49\u5F85\u4E2D\u7684\u8BA2\u9605\u3002");return new Promise(u=>{let O=()=>{clearTimeout(C),i=null,u(m(f))},C=setTimeout(O,t);i=O})}}),publish(p,f){if(!d){if(p==="catalog")a=f.catalog,s=++r;else if(p==="return"||p==="sidebar")h.push({sequence:++r,type:p}),h.length>16&&h.shift();else return;v()}},dispose(){d=!0,v(),h.length=0,a=null}}}var je=new WeakMap;function Qe(e){return je.has(e)||je.set(e,{writers:new Map,waiting:new Map}),je.get(e)}function Ye(e,n,t){let r=Qe(e);r.writers.set(n,t);for(let s of r.waiting.get(n)||[])s(t);return()=>{r.writers.get(n)===t&&r.writers.delete(n)}}function At(e,n){let t=Qe(e),r=t.writers.get(n);return r?Promise.resolve(r):new Promise((s,a)=>{let d,i=t.waiting.get(n)||new Set,h=()=>{clearTimeout(d),i.delete(c),i.size||t.waiting.delete(n)},c=m=>{h(),s(m)};i.add(c),t.waiting.set(n,i),d=setTimeout(()=>{h(),a(new Error("\u76EE\u6807\u8F93\u5165\u6846\u5C1A\u672A\u5C31\u7EEA\uFF0C\u8BF7\u6253\u5F00\u76EE\u6807\u5BF9\u8BDD\u540E\u91CD\u8BD5\u3002"))},1e4)})}function Bt(e,n=18e3){let t=[];for(let r of e){let s=r.event;if(r.type!=="event"||!["user/message","assistant/message"].includes(s?.type))continue;let d=((s.type==="user/message"?s.data:s.data.message)?.content||[]).filter(i=>i.type==="text"&&typeof i.text=="string").map(i=>i.text).join(`
`);d.trim()&&t.push(`${s.type==="user/message"?"\u7528\u6237":"\u52A9\u624B"}\uFF1A
${d}`)}return t.slice(-8).join(`

`).slice(-n)}function et(e,n,t=""){let r=e.entry?`WSL \xB7 ${e.entry.settings.distro} \xB7 ${e.entry.settings.user||"\u9ED8\u8BA4\u7528\u6237"}`:"Windows",s=e.row.cwd||"",a=e.entry&&s.startsWith("/")?`\\\\wsl.localhost\\${e.entry.settings.distro}${s.replaceAll("/","\\")}`:/^[a-z]:[\\/]/i.test(s)?"/mnt/"+s[0].toLowerCase()+s.slice(2).replaceAll("\\","/"):"";return`\u8DE8\u73AF\u5883\u5DE5\u4F5C\u4EA4\u63A5
\u6765\u6E90\uFF1A${r}
\u6765\u6E90\u5BF9\u8BDD\uFF1A${e.row.title||"\u65B0\u5BF9\u8BDD"}
\u6765\u6E90\u5BF9\u8BDD ID\uFF1A${e.id}
\u6765\u6E90\u76EE\u5F55\uFF1A${s||"\u672A\u6307\u5B9A"}${a?`
\u8DE8\u7CFB\u7EDF\u8BBF\u95EE\u8DEF\u5F84\uFF08\u9ED8\u8BA4 WSL \u6302\u8F7D\u8BBE\u7F6E\uFF09\uFF1A${a}`:""}

\u5DE5\u4F5C\u8BF4\u660E\uFF1A
${n.trim()}${t?`

\u6700\u8FD1\u5BF9\u8BDD\u6458\u5F55\uFF08\u53C2\u8003\u6750\u6599\uFF09\uFF1A
${t}`:""}

\u8BF7\u5728\u5F53\u524D\u76EE\u6807\u73AF\u5883\u7EE7\u7EED\u5DE5\u4F5C\u3002\u5148\u6838\u5BF9\u6587\u4EF6\u4F4D\u7F6E\u548C\u5DF2\u6709\u4FEE\u6539\uFF1B\u4EA4\u63A5\u4E0D\u4F1A\u81EA\u52A8\u590D\u5236\u6587\u4EF6\u6216\u505C\u6B62\u6765\u6E90\u4EFB\u52A1\u3002`}function Ee(e,n=globalThis.localStorage){let t=new Map;return async(r,s)=>{if(r==="handoff.read"){if(!e.sessions.list.getSnapshot().byId[s.sessionId])throw new Error("\u6765\u6E90\u5BF9\u8BDD\u5DF2\u4E0D\u5B58\u5728\u3002");return e.sessions.using(s.sessionId,{source:"workspaceOperation"},c=>({text:Bt(c.binding.eventSource.getSnapshot().entries)}))}if(r!=="handoff.deliver"||!/^[a-f0-9-]{36}$/.test(s.transferId||"")||!["draft","send"].includes(s.mode)||typeof s.text!="string"||!s.text.trim()||s.text.length>24e3)throw new Error("\u4EA4\u63A5\u5185\u5BB9\u6216\u76EE\u6807\u65E0\u6548\u3002");let a="dsh-wsl-native:handoff:"+s.transferId;if(t.has(a))return t.get(a);let d;try{d=JSON.parse(n?.getItem(a)||"null")}catch{}if(d?.done)return{sessionId:d.sessionId,mode:d.mode};if(d?.pending)throw new Error(`\u8FD9\u6B21\u4EA4\u63A5\u5DF2\u7ECF\u63D0\u4EA4\uFF0C\u7ED3\u679C\u5C1A\u672A\u786E\u8BA4\u3002\u8BF7\u67E5\u770B\u76EE\u6807\u5BF9\u8BDD ${d.sessionId}\uFF0C\u4E0D\u4F1A\u81EA\u52A8\u91CD\u590D\u53D1\u9001\u3002`);let i=c=>{d=c;try{n?.setItem(a,JSON.stringify(c))}catch{}},h=(async()=>{let c=d?.sessionId||s.sessionId;if(!c){if(!e.workspaces.list.getSnapshot().items.some(m=>m.workspaceId===s.workspaceId))throw new Error("\u8BF7\u5148\u9009\u62E9\u76EE\u6807\u5DE5\u4F5C\u533A\u3002");c=await Pe(e,s.workspaceId),i({sessionId:c})}if(e.sessions.list.getSnapshot().byId[c]||await e.sessions.refresh(),e.workspaces.list.getSnapshot().archivedSessionIds.includes(c))throw new Error("\u8BF7\u5148\u53D6\u6D88\u76EE\u6807\u5BF9\u8BDD\u7684\u5F52\u6863\u3002");return await e.sessions.using(c,{source:"workspaceOperation"},async m=>{if(s.mode==="draft"){let v=e.get("conversation");if(!v?.input)throw new Error("\u5F53\u524D DSH \u6CA1\u6709\u5BF9\u8BDD\u8F93\u5165\u63A5\u53E3\uFF0C\u8BF7\u66F4\u65B0 DSH\u3002");e.uiWorkspace.openSession(c);let p=await At(e,c),f=v.input.for(m.binding.ctx),u=f.state.getSnapshot();if(u.draft.trim()||p.getDraft().trim()||u.attachmentIds.length||u.phase!=="plain")throw new Error("\u76EE\u6807\u8F93\u5165\u6846\u5DF2\u6709\u8349\u7A3F\u6216\u6B63\u5728\u63D0\u4EA4\u3002\u8BF7\u5148\u5904\u7406\u8349\u7A3F\uFF0C\u6216\u9009\u62E9\u65B0\u5BF9\u8BDD\u3002");i({sessionId:c,mode:s.mode,pending:!0}),p.setDraft(s.text),f.setDraft(s.text)}else{i({sessionId:c,mode:s.mode,pending:!0});let v=await m.binding.session.prompt([{type:"text",text:s.text}],"queue");if(!v.ok)throw new Error(`\u4EA4\u63A5\u672A\u786E\u8BA4\uFF1A${v.error.message}\u3002\u8BF7\u67E5\u770B\u76EE\u6807\u5BF9\u8BDD\u540E\u518D\u51B3\u5B9A\u4E0B\u4E00\u6B65\u3002`);e.uiWorkspace.openSession(c)}}),i({sessionId:c,mode:s.mode,done:!0,time:Date.now()}),{sessionId:c,mode:s.mode}})();t.set(a,h);try{return await h}finally{t.delete(a)}}}function tt(e,n,t,r){let s=r.transport==="desktop";if(!s&&window.parent===window||n.guest)return;let a,d="",i=!1,h=new AbortController,c=Ee(e),m={origin:r.parentOrigin,source:window.parent,channel:r.channel},v=s?Ze(r.channel,O):null;v&&Object.defineProperty(window,me,{value:v.api,configurable:!0});let p=(N,y={})=>v?v.publish(N,y):m.source.postMessage({protocol:be,channel:r.channel,type:N,...y},m.origin),f=(N=!1)=>{clearTimeout(a),a=setTimeout(()=>{if(i)return;let y=ye(e),w=JSON.stringify(y);(N||w!==d)&&(d=w,p("catalog",{catalog:y}))},50)},u=n.guest={compact:!0,returnWindows(){p("return")},toggleSidebar(){p("sidebar")},publish:f};document.documentElement.setAttribute("data-dsh-wsl-guest","");async function O(N,y={}){if(N==="handoff.read"||N==="handoff.deliver"){let L=await c(N,y);return f(!0),L}if(N==="refresh"){f(!0);return}if(N==="theme"){if(document.body.toggleAttribute("data-ds-dark-theme",y.dark===!0),document.documentElement.style.colorScheme=y.dark===!0?"dark":"light",Array.isArray(y.tokens))for(let[L,I]of y.tokens.slice(0,256))/^--(?:ds|dsw|dsh)-[\w-]+$/.test(L)&&typeof I=="string"&&I.length<500&&document.body.style.setProperty(L,I);return}if(N==="chrome"){u.compact=!0,(y.panel==="plugins"||y.panel===null)&&e.layout.selectPanel(y.panel),n.emit();return}if(N==="navigate"){h.abort(),h=new AbortController;let L=h.signal;if(y.sessionId){let I=e.sessions.list.getSnapshot().byId[y.sessionId];if(!I||I.parentId||e.workspaces.list.getSnapshot().archivedSessionIds.includes(I.id))throw new Error("\u8FD9\u6761 WSL \u5BF9\u8BDD\u5DF2\u5F52\u6863\u6216\u4E0D\u5728\u5F53\u524D\u73AF\u5883\u4E2D\uFF0C\u8BF7\u5237\u65B0\u5217\u8868\u3002");e.uiWorkspace.openSession(I.id)}else{if(!y.handoff)throw new Error("\u7F3A\u5C11\u5DF2\u9A8C\u8BC1\u7684\u5DE5\u4F5C\u533A\u4FE1\u606F\u3002");let I=await t("environment/adopt",y.handoff);if(L.aborted)return;if(y.create){let k=await e.workspaces.create({path:I.settings.directory});if(L.aborted)return;L.aborted||await fe(e,k.workspaceId,L)}else await ke(e,I.settings.directory,L)}f(!0);return}let w=await Xe(e,N,y);return f(!0),w}let C=N=>{if(!Oe(N,m)||N.data.type!=="request")return;let{id:y,action:w,payload:L}=N.data;typeof y!="string"||y.length>100||typeof w!="string"||O(w,L).then(I=>p("result",{id:y,ok:!0,value:I}),I=>p("result",{id:y,ok:!1,error:String(I.message).slice(0,1e3)}))};s||window.addEventListener("message",C);let W=[e.sessions.list.subscribe(()=>f()),e.workspaces.list.subscribe(()=>f()),e.connection.state.subscribe(()=>f())];f(!0),n.emit(),u.dispose=()=>{i=!0,h.abort(),clearTimeout(a),window.removeEventListener("message",C),v?.dispose(),v&&window[me]===v.api&&delete window[me];for(let N of W)N();document.documentElement.removeAttribute("data-dsh-wsl-guest")}}var qe="dsh-wsl-native:";function K(e,n,t=sessionStorage){try{if(n===void 0)return JSON.parse(t.getItem(qe+e)||"null");n===null?t.removeItem(qe+e):t.setItem(qe+e,JSON.stringify(n))}catch{}return null}function st(e,n){return e.getSnapshot().phase==="ready"?Promise.resolve():new Promise((t,r)=>{let s=()=>{},a,d=h=>{s(),clearTimeout(a),n?.removeEventListener("abort",i),h?r(h):t()},i=()=>d(new Error("\u5DE5\u4F5C\u533A\u6253\u5F00\u5DF2\u53D6\u6D88\u3002"));s=e.subscribe(()=>{e.getSnapshot().phase==="ready"&&d()}),a=setTimeout(()=>d(new Error("DSH \u5DE5\u4F5C\u533A\u4ECD\u5728\u52A0\u8F7D\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002")),3e4),n?.addEventListener("abort",i,{once:!0}),n?.aborted?i():e.getSnapshot().phase==="ready"&&d()})}async function ke(e,n,t){if(await Promise.all([st(e.workspaces.list,t),st(e.sessions.list,t)]),t?.aborted)return!1;let r=e.layout.beginNavigation(),s=await e.workspaces.create({path:n});if(await e.sessions.refresh(),t?.aborted||r.aborted)return!1;let{byId:a}=e.sessions.list.getSnapshot(),d=e.workspaces.list.getSnapshot().archivedSessionIds,i=s.sessionIds.map(m=>a[m]).filter(m=>m&&!m.parentId&&!d.includes(m.id)&&m.cwd===s.path),h=K("selection",void 0,localStorage)?.[s.path],c=i.find(m=>m.id===h)??i.sort((m,v)=>v.updatedAt-m.updatedAt)[0];return c?e.uiWorkspace.openSession(c.id):await fe(e,s.workspaceId,t),!0}function nt(e,n){let t=new Set,r,s=!1,a=!1,d,i={state:null,error:null,draft:null,pending:K("pending"),popup:null,parentOrigin:Q(K("parentOrigin")),readyLink:null,subscribe(p){return t.add(p),()=>t.delete(p)},emit(){if(!s)for(let p of t)p()},async refresh(){return r||(r=n("status").then(p=>(s||(i.state=p,i.error=null,i.parentOrigin||=p.parentOrigin,i.emit()),p)).catch(p=>{throw i.error=p.message,i.emit(),p}).finally(()=>{r=null}),r)},setPending(p){i.pending=p,K("pending",p),i.emit()},remember(){let p=e.sessions.list.getSnapshot(),f=p.ids.map(C=>p.byId[C]).find(C=>C?.retainedBy?.mainView>0&&C.cwd&&!C.parentId);if(!f||d===f.id)return;d=f.id;let u=K("selection",void 0,localStorage)||{},O=Object.fromEntries([[f.cwd,f.id],...Object.entries(u).filter(([C])=>C!==f.cwd)].slice(0,64));K("selection",O,localStorage)},async adopt(){let p=we(window.location.hash),f=Je(window.location.hash);if(!(!p||a||K("arrived")===p.id&&!f)){a=!0;try{let u=i.state||await i.refresh();if(u.mode!=="wsl-host"||!u.distros.some(C=>C.name===p.distro))throw new Error("\u76EE\u6807 DSH \u4E0E\u9009\u5B9A\u7684 Linux \u73AF\u5883\u4E0D\u4E00\u81F4\u3002");let O=await n("environment/adopt",p);p.parentOrigin&&(i.parentOrigin=p.parentOrigin,K("parentOrigin",p.parentOrigin)),await ke(e,O.settings.directory,h.signal)&&(K("arrived",p.id),f&&tt(e,i,n,f),history.replaceState(history.state,"",window.location.pathname+window.location.search),await i.refresh())}catch(u){i.error=u.message,i.emit(),s||e.layout.selectPanel("dsh-wsl-native")}finally{a=!1}}}},h=new AbortController,c=()=>{i.refresh().then(()=>i.adopt()).catch(()=>{})},m=e.on("connection/reset",c),v=e.sessions.list.subscribe(()=>i.remember());return window.addEventListener("hashchange",i.adopt),window.addEventListener("focus",c),c(),i.dispose=()=>{s=!0,i.guest?.dispose(),i.conversations?.dispose(),h.abort(),m(),v(),window.removeEventListener("hashchange",i.adopt),window.removeEventListener("focus",c),t.clear()},i}var Ss=require("react"),Ae=require("@deepseek-ai/dsh-client-ui-primitives"),q=require("react/jsx-runtime");function rt({state:e,model:n,chosen:t,task:r,api:s,disabled:a}){let d=e.native?.inheritance;if(e.mode!=="windows-host"||!d?.available)return null;let{options:i,applied:h}=d;return(0,q.jsxs)("section",{className:"dsh-wsl-section","aria-labelledby":"dsh-wsl-inheritance-title",children:[(0,q.jsxs)("div",{className:"dsh-wsl-section-heading",children:[(0,q.jsx)("h2",{id:"dsh-wsl-inheritance-title",children:"Linux \u63D2\u4EF6\u4E0E\u914D\u7F6E"}),(0,q.jsxs)("span",{className:"dsh-wsl-caption",children:["\u4E3B\u73AF\u5883\uFF1A",d.source]})]}),(0,q.jsxs)("div",{className:"dsh-wsl-card dsh-wsl-inheritance",children:[(0,q.jsx)("p",{children:"\u9ED8\u8BA4\u6CBF\u7528\u4E3B\u73AF\u5883\u3002\u5728 Linux \u4E2D\u5355\u72EC\u4FEE\u6539\u7684\u9879\u76EE\u4F1A\u4FDD\u7559\uFF0C\u540E\u7EED\u540C\u6B65\u53EA\u66F4\u65B0\u4ECD\u8DDF\u968F\u4E3B\u73AF\u5883\u7684\u90E8\u5206\u3002"}),(0,q.jsx)("div",{className:"dsh-wsl-inherit-options",children:[["plugins","\u63D2\u4EF6","\u6CBF\u7528\u4E3B\u73AF\u5883\u5B89\u88C5\u7684\u63D2\u4EF6"],["config","\u8BBE\u7F6E","\u6CBF\u7528\u4E3B\u73AF\u5883\u7684\u504F\u597D\u8BBE\u7F6E"],["credentials","\u6A21\u578B\u8D26\u53F7","\u6CBF\u7528\u4E3B\u73AF\u5883\u767B\u5F55\u7684\u8D26\u53F7"]].map(([c,m,v])=>(0,q.jsxs)("div",{className:"dsh-wsl-inherit-option",children:[(0,q.jsxs)("div",{children:[(0,q.jsx)("strong",{children:m}),(0,q.jsx)("small",{children:v})]}),(0,q.jsx)(Ae.Switch,{checked:i[c],disabled:a,label:`\u7EE7\u627F${m}`,onChange:p=>void r("inheritance",()=>s("native/inheritance",{...t(),options:{[c]:p}}))})]},c))}),(0,q.jsxs)("div",{className:"dsh-wsl-inherit-actions",children:[(0,q.jsx)(Ae.Button,{variant:"outline",disabled:a||!t().distro,onClick:()=>void n.conversations.enter(t(),{panel:"plugins"}),children:"\u7BA1\u7406 Linux \u63D2\u4EF6\u4E0E\u8BBE\u7F6E"}),(0,q.jsx)("span",{className:"dsh-wsl-caption",children:"\u66F4\u6539\u7EE7\u627F\u9009\u9879\u540E\uFF0C\u4E0B\u6B21\u542F\u52A8 Linux \u751F\u6548\u3002"})]}),h&&(0,q.jsxs)("details",{className:"dsh-wsl-inherit-details",children:[(0,q.jsxs)("summary",{children:["\u5DF2\u7EE7\u627F ",h.plugins.filter(c=>c.status==="inherited").length," \u4E2A\u63D2\u4EF6",h.overrides?` \xB7 \u4FDD\u7559 ${h.overrides} \u9879 Linux \u8C03\u6574`:""]}),(0,q.jsx)("ul",{children:h.plugins.map(c=>(0,q.jsxs)("li",{children:[(0,q.jsxs)("span",{children:[c.name," ",(0,q.jsx)("small",{children:c.version})]}),(0,q.jsx)("span",{children:c.status==="inherited"?"\u8DDF\u968F\u4E3B\u73AF\u5883":c.status==="overridden"?"Linux \u5355\u72EC\u914D\u7F6E":c.reason})]},c.name))})]})]})]})}var l=require("react/jsx-runtime");function re(e){let[,n]=(0,_.useState)(0);return(0,_.useEffect)(()=>e.subscribe(()=>n(t=>t+1)),[e]),e.state}function it({api:e,ctx:n,model:t}){let r=re(t),[s,a]=(0,_.useState)(t.draft),[d,i]=(0,_.useState)(""),[h,c]=(0,_.useState)(null),[m,v]=(0,_.useState)(!1),[p,f]=(0,_.useState)(null),u=(0,_.useRef)(!1),O=(0,_.useRef)(!0),C=(0,_.useCallback)(()=>t.refresh(),[t]);(0,_.useEffect)(()=>(O.current=!0,C().catch(()=>{}),()=>{O.current=!1}),[C]),(0,_.useEffect)(()=>{r&&!s&&a(ue(r.settings,r.distros))},[r,s]),(0,_.useEffect)(()=>{t.draft=s},[s,t]),(0,_.useEffect)(()=>{let x=t.pending;if(!x)return;let H=r?.handoffs?.find(J=>J.id===x.id);H?.state==="ready"?(t.remember(),t.readyLink=H.url,t.setPending(null),x.mode==="same"?t.conversations.adopt(H).catch(J=>{t.error=J.message,t.emit()}):t.popup&&!t.popup.closed?(t.popup.location.replace(H.url),t.popup=null,c({text:"Linux \u5DF2\u5728\u65B0\u7A97\u53E3\u6253\u5F00\uFF0C\u4E24\u8FB9\u53EF\u4EE5\u540C\u65F6\u4F7F\u7528\u3002"})):c({text:"Linux \u5DF2\u5C31\u7EEA\u3002\u70B9\u51FB\u201C\u65B0\u7A97\u53E3\u6253\u5F00\u201D\u5373\u53EF\u4E0E Windows \u540C\u65F6\u4F7F\u7528\u3002"})):H?.state==="failed"?(t.popup?.close(),t.popup=null,t.setPending(null),c({error:!0,text:H.error})):r&&!H&&(t.setPending(null),c({error:!0,text:"\u542F\u52A8\u5668\u5DF2\u91CD\u65B0\u8FDE\u63A5\uFF0C\u8BF7\u91CD\u65B0\u8FDB\u5165 Linux \u73AF\u5883\u3002"}))},[r,t,t.pending]),(0,_.useEffect)(()=>{let x=r?.native?.instances?.some(J=>J.preparing||J.starting);if(!t.pending&&!x)return;let H=setTimeout(()=>{C().catch(()=>{})},700);return()=>clearTimeout(H)},[r,t,t.pending,C]);async function W(x,H){if(!u.current){u.current=!0,i(x),c(null),t.error=null;try{await H()}catch(J){O.current&&c({error:!0,text:ze(J)})}finally{try{await C()}catch{}u.current=!1,O.current&&i("")}}}function N(x,H){a(J=>({...J,[x]:H})),c(null)}let y=()=>({distro:s.distro,user:s.user.trim(),directory:s.directory.trim()});async function w(x,H="\u5DE5\u4F5C\u73AF\u5883\u5DF2\u8FDE\u63A5\uFF0C\u76EE\u5F55\u5DF2\u8BB0\u4F4F\u3002"){let J=await e("environment/switch",x);return O.current&&(a(ue(J.settings,r.distros)),c({text:H})),J}function L(x=!1){u.current||t.pending||(x&&(t.popup=window.open("about:blank","_blank"),t.popup&&(t.popup.opener=null,t.popup.document.title="\u6B63\u5728\u51C6\u5907 Linux DSH",t.popup.document.body.textContent="\u6B63\u5728\u51C6\u5907 Linux DSH\uFF0C\u5B8C\u6210\u540E\u4F1A\u81EA\u52A8\u8FDB\u5165\u3002Windows DSH \u53EF\u4EE5\u7EE7\u7EED\u4F7F\u7528\u3002",t.popup.document.body.style.cssText="font:14px/1.7 system-ui;padding:48px;max-width:560px;margin:auto;color:#666;background:#fafafa")),W("enter",async()=>{try{t.remember();let H=await e("native/enter",{...y(),parentOrigin:Q(window.location.origin)});a(ue(H.settings,r.distros)),await C(),t.setPending({id:H.id,mode:x?"new":"same"})}catch(H){throw t.popup?.close(),t.popup=null,H}}))}if(!r||!s)return(0,l.jsxs)("div",{className:"dsh-wsl-page",children:[(0,l.jsx)("header",{className:"dsh-wsl-heading",children:(0,l.jsxs)("div",{children:[(0,l.jsx)("h1",{children:"WSL \u4E0E Windows"}),(0,l.jsx)("p",{children:"\u5728\u540C\u4E00\u7A97\u53E3\u4F7F\u7528\u4E24\u5957\u73AF\u5883\uFF0CWSL \u5BF9\u8BDD\u4F1A\u663E\u793A\u6807\u5FD7\u3002"})]})}),(0,l.jsxs)("div",{className:"dsh-wsl-empty",role:t.error?"alert":"status",children:[t.error||(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(D.StateDot,{state:"ongoing"}),"\u6B63\u5728\u8BFB\u53D6\u73AF\u5883\u2026"]}),t.error&&(0,l.jsx)(D.Button,{onClick:()=>W("refresh",async()=>{}),children:"\u91CD\u65B0\u8FDE\u63A5"})]})]});let I=r.mode==="wsl-host",k=r.mode!=="unsupported",E=ue(r.settings,r.distros),g=["distro","user","directory"].some(x=>s[x].trim()!==E[x]),P=r.native||{},o=P.running,b=t.pending&&r.handoffs?.find(x=>x.id===t.pending.id),S=!!(P.preparing||P.starting||t.pending),R=!!d||!!t.pending||!k,V=r.profiles?.find(x=>x.distro===s.distro&&x.user===s.user.trim()),$=r.pool.connections.find(x=>x.connected&&x.target[0]==="wsl"&&x.target[1]===s.distro&&(x.target[2]===s.user.trim()||x.info?.user===s.user.trim())),ie=r.pool.connections.some(x=>x.connected&&x.target[0]==="windows"),F=h?.error&&h.text||t.error||r.error||!k&&"\u5F53\u524D\u73AF\u5883\u4E0D\u652F\u6301 WSL\uFF0C\u8BF7\u5728 Windows \u6216 WSL \u4E2D\u4F7F\u7528\u3002",ne=F||h?.text,Ie=o?.openUrl||null,Le=b?.state==="starting"||P.starting?"\u6B63\u5728\u542F\u52A8 DSH\uFF0C\u5E76\u7B49\u5F85 Windows \u8FDE\u63A5\u2026":P.progress?.text||"\u6B63\u5728\u8FDE\u63A5 Linux \u5DE5\u4F5C\u73AF\u5883\u2026";return(0,l.jsxs)("div",{className:"dsh-wsl-page",children:[(0,l.jsxs)("header",{className:"dsh-wsl-heading",children:[(0,l.jsxs)("div",{children:[(0,l.jsx)("h1",{children:"WSL \u4E0E Windows"}),(0,l.jsx)("p",{children:"\u5728\u540C\u4E00\u7A97\u53E3\u4F7F\u7528\u4E24\u5957\u73AF\u5883\uFF0CWSL \u5BF9\u8BDD\u4F1A\u663E\u793A\u6807\u5FD7\u3002"})]}),(0,l.jsx)(D.Button,{variant:"ghost",icon:(0,l.jsx)(D.IconRefreshOutlineRegular,{}),title:"\u5237\u65B0\u72B6\u6001","aria-label":"\u5237\u65B0\u72B6\u6001",disabled:!!d,onClick:()=>W("refresh",async()=>{})})]}),!I&&(0,l.jsxs)("div",{className:"dsh-wsl-unified-setting",children:[(0,l.jsx)("span",{children:"Windows \u4E0E WSL \u5BF9\u8BDD\u663E\u793A\u5728\u540C\u4E00\u4E2A\u5217\u8868\uFF0C\u5207\u6362\u5BF9\u8BDD\u5373\u53EF\u5207\u6362\u73AF\u5883\u3002"}),(0,l.jsx)(D.Button,{variant:"ghost",onClick:()=>t.conversations.setUnified(!t.conversations.unified),children:t.conversations.unified?"\u4F7F\u7528\u539F\u751F\u5DE5\u4F5C\u533A\u5217\u8868":"\u5207\u6362\u5230\u7D27\u51D1\u5BF9\u8BDD\u5217\u8868"})]}),ne&&(0,l.jsxs)("div",{className:`dsh-wsl-notice ${F?"is-error":""}`,role:F?"alert":"status",children:[(0,l.jsx)(D.StateDot,{state:F?"error":"done"}),(0,l.jsx)("span",{children:ne})]}),(0,l.jsxs)("section",{className:"dsh-wsl-section","aria-labelledby":"dsh-wsl-host-title",children:[(0,l.jsxs)("div",{className:"dsh-wsl-section-heading",children:[(0,l.jsx)("h2",{id:"dsh-wsl-host-title",children:"\u8FD0\u884C\u73AF\u5883"}),(0,l.jsx)("span",{className:"dsh-wsl-caption",children:"\u5207\u6362\u65F6\u4FDD\u7559\u4E24\u8FB9\u7684\u4EFB\u52A1"})]}),(0,l.jsxs)("div",{className:"dsh-wsl-host-grid",children:[(0,l.jsxs)("article",{className:`dsh-wsl-card dsh-wsl-host-card ${I?"":"is-current"}`,children:[(0,l.jsxs)("div",{className:"dsh-wsl-host-head",children:[(0,l.jsx)(Re,{size:23}),(0,l.jsx)(Ne,{state:I?"idle":"done",children:I?"\u72EC\u7ACB\u8FD0\u884C":"\u5F53\u524D\u73AF\u5883"})]}),(0,l.jsx)("h3",{children:"Windows DSH"}),(0,l.jsxs)("p",{children:["PowerShell\u3001Windows \u6587\u4EF6\u548C\u5E94\u7528\u3002",(0,l.jsx)("br",{}),"\u4FDD\u7559 Windows \u4E2D\u7684\u5DE5\u4F5C\u533A\u4E0E\u4F1A\u8BDD\u3002"]}),(0,l.jsx)("div",{className:"dsh-wsl-host-actions",children:I?t.parentOrigin?(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(D.Button,{variant:"outline",icon:(0,l.jsx)(Re,{size:16}),onClick:()=>{t.remember(),t.guest?t.guest.returnWindows():window.location.assign(De(t.parentOrigin))},children:"\u5207\u6362\u5230 Windows"}),(0,l.jsxs)("a",{className:"dsh-wsl-text-link",href:De(t.parentOrigin),target:"_blank",rel:"noopener noreferrer",children:["\u65B0\u7A97\u53E3\u6253\u5F00",(0,l.jsx)(ve,{})]})]}):(0,l.jsx)("span",{className:"dsh-wsl-caption",children:"\u4ECE Windows DSH \u8FDB\u5165\u540E\uFF0C\u53EF\u5728\u8FD9\u91CC\u4E00\u952E\u8FD4\u56DE\u3002"}):(0,l.jsx)(D.Button,{variant:"outline",onClick:()=>n.layout.selectPanel(null),children:"\u7EE7\u7EED Windows \u4F1A\u8BDD"})})]}),(0,l.jsxs)("article",{className:`dsh-wsl-card dsh-wsl-host-card ${I?"is-current":""}`,children:[(0,l.jsxs)("div",{className:"dsh-wsl-host-head",children:[(0,l.jsx)(le,{size:23}),(0,l.jsx)(Ne,{state:I||o?"done":S?"ongoing":"idle",children:I?"\u5F53\u524D\u73AF\u5883":o?"\u5DF2\u5C31\u7EEA":S?"\u51C6\u5907\u4E2D":"\u6309\u9700\u542F\u52A8"})]}),(0,l.jsxs)("h3",{children:["Linux DSH ",(0,l.jsx)("span",{children:s.distro||"WSL"})]}),(0,l.jsxs)("p",{children:["DSH\u3001\u7EC8\u7AEF\u548C\u9879\u76EE\u90FD\u5728 Linux \u4E2D\u8FD0\u884C\u3002",(0,l.jsx)("br",{}),"Linux \u539F\u751F\u5DE5\u5177\uFF0C\u968F\u65F6\u8BBF\u95EE Windows\u3002"]}),(0,l.jsx)("div",{className:"dsh-wsl-host-actions",children:I?(0,l.jsx)(D.Button,{variant:"outline",onClick:()=>W("workspace",async()=>{let x=await w(y());await ke(n,x.settings.directory)}),children:"\u7EE7\u7EED Linux \u4F1A\u8BDD"}):(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(D.Button,{variant:"primary",icon:S?(0,l.jsx)(D.StateDot,{state:"ongoing"}):(0,l.jsx)(le,{size:16}),disabled:R||!s.distro||S,onClick:()=>L(!1),children:S?"\u6B63\u5728\u51C6\u5907\u2026":o?"\u6253\u5F00 WSL \u5BF9\u8BDD":"\u5F00\u59CB WSL \u5BF9\u8BDD"}),Ie&&!g?(0,l.jsxs)("a",{className:"dsh-wsl-text-link",href:Ie,target:"_blank",rel:"noopener noreferrer",children:["\u65B0\u7A97\u53E3\u6253\u5F00",(0,l.jsx)(ve,{})]}):(0,l.jsx)(D.Button,{variant:"ghost",disabled:R||!s.distro||S,icon:(0,l.jsx)(ve,{}),onClick:()=>L(!0),children:"\u540C\u65F6\u6253\u5F00"})]})})]})]}),S&&(0,l.jsxs)("div",{className:"dsh-wsl-native-status",role:"status",children:[(0,l.jsx)(D.StateDot,{state:"ongoing"}),(0,l.jsx)("span",{children:Le})]}),!I&&!S&&(0,l.jsx)("p",{className:"dsh-wsl-section-note",children:"WSL \u5BF9\u8BDD\u76F4\u63A5\u5728\u5F53\u524D\u7A97\u53E3\u6253\u5F00\uFF0C\u5E76\u663E\u793A WSL \u6807\u5FD7\uFF1B\u4E24\u8FB9\u7684\u4EFB\u52A1\u7EE7\u7EED\u8FD0\u884C\u3002"})]}),(0,l.jsx)(rt,{state:r,model:t,chosen:y,task:W,api:e,disabled:R||S}),(0,l.jsxs)("section",{className:"dsh-wsl-section","aria-labelledby":"dsh-wsl-connection-title",children:[(0,l.jsxs)("div",{className:"dsh-wsl-section-heading",children:[(0,l.jsx)("h2",{id:"dsh-wsl-connection-title",children:"Linux \u5DE5\u4F5C\u76EE\u5F55"}),(0,l.jsx)(Ne,{state:$?"done":"idle",children:$?"\u8FDE\u63A5\u5DF2\u5C31\u7EEA":"\u6309\u9700\u8FDE\u63A5"})]}),(0,l.jsx)("div",{className:"dsh-wsl-card",children:(0,l.jsxs)("form",{onSubmit:x=>{x.preventDefault(),R||W("connect",()=>w(y()))},children:[(0,l.jsxs)("div",{className:"dsh-wsl-fields",children:[(0,l.jsxs)("div",{className:"dsh-wsl-field",children:[(0,l.jsx)("label",{htmlFor:"dsh-wsl-distro",children:"WSL \u53D1\u884C\u7248"}),(0,l.jsxs)("div",{className:"dsh-wsl-select-wrap",children:[(0,l.jsxs)("select",{id:"dsh-wsl-distro",value:s.distro,disabled:R||I,onChange:x=>{let H=x.target.value,J=r.profiles?.find(xt=>xt.distro===H);W("switch",async()=>{await w({distro:H,user:J?.user||"",...J?.directory?{directory:J.directory}:{}},"\u5DF2\u5207\u6362\u8FDE\u63A5\uFF0C\u539F\u73AF\u5883\u7684\u4EFB\u52A1\u7EE7\u7EED\u8FD0\u884C\u3002")})},children:[!r.distros.length&&(0,l.jsx)("option",{value:"",children:"\u672A\u53D1\u73B0\u53D1\u884C\u7248"}),r.distros.map(x=>(0,l.jsxs)("option",{value:x.name,children:[x.name,x.isDefault?"\uFF08\u9ED8\u8BA4\uFF09":""]},x.name))]}),(0,l.jsx)(D.IconChevronDownOutlineRegular,{size:14})]}),(0,l.jsx)("p",{children:s.user?`\u7528\u6237 ${s.user}`:"\u4F7F\u7528\u53D1\u884C\u7248\u7684\u9ED8\u8BA4\u7528\u6237"})]}),(0,l.jsxs)("div",{className:"dsh-wsl-field",children:[(0,l.jsx)("label",{htmlFor:"dsh-wsl-directory",children:"\u5DE5\u4F5C\u76EE\u5F55"}),(0,l.jsxs)("div",{className:"dsh-wsl-directory-row",children:[(0,l.jsx)(D.Input,{id:"dsh-wsl-directory",className:"dsh-wsl-directory-input",value:s.directory,disabled:R,onChange:x=>N("directory",x.target.value),placeholder:"Linux\u3001Windows \u6216 WSL \u8DEF\u5F84",autoComplete:"off",spellCheck:!1}),(0,l.jsx)(D.Button,{variant:"outline",icon:(0,l.jsx)(D.IconFolderOpenOutlineRegular,{}),disabled:R||!s.distro,onClick:()=>v(!0),children:"\u6D4F\u89C8"})]}),(0,l.jsx)("p",{children:V?.storage==="windows-mount"?"\u8FD9\u662F Windows \u6302\u8F7D\u76EE\u5F55\u3002\u4F9D\u8D56\u5B89\u88C5\u548C\u9891\u7E41\u6784\u5EFA\u5EFA\u8BAE\u4F7F\u7528 Linux \u4E3B\u76EE\u5F55\u3002":V?.storage==="linux"?"Linux \u6587\u4EF6\u7CFB\u7EDF \xB7 \u9002\u5408\u4F9D\u8D56\u5B89\u88C5\u3001Git \u548C\u9891\u7E41\u6784\u5EFA":"\u652F\u6301\u7C98\u8D34 Windows \u8DEF\u5F84\uFF1B\u8FDE\u63A5\u540E\u81EA\u52A8\u8F6C\u6362\u5E76\u8BB0\u4F4F\u3002"})]})]}),!!V?.recentDirectories?.length&&(0,l.jsxs)("div",{className:"dsh-wsl-recents","aria-label":"\u6700\u8FD1\u4F7F\u7528\u7684\u76EE\u5F55",children:[(0,l.jsx)("span",{children:"\u6700\u8FD1"}),V.recentDirectories.slice(0,5).map(x=>(0,l.jsxs)("button",{type:"button",title:x,"aria-label":`\u4F7F\u7528\u76EE\u5F55 ${x}`,className:x===s.directory?"is-selected":"",disabled:R,onClick:()=>W("directory",()=>w({...y(),directory:x})),children:[(0,l.jsx)(D.IconFolderOpenOutlineRegular,{size:14}),(0,l.jsx)("span",{children:x==="/"?"/":x.split("/").filter(Boolean).pop()})]},x))]}),!I&&(0,l.jsxs)("details",{className:"dsh-wsl-advanced",children:[(0,l.jsxs)("summary",{children:["\u9AD8\u7EA7\u8BBE\u7F6E",(0,l.jsx)(D.IconChevronDownOutlineRegular,{size:12})]}),(0,l.jsxs)("div",{className:"dsh-wsl-user-field",children:[(0,l.jsx)("label",{htmlFor:"dsh-wsl-user",children:"Linux \u7528\u6237"}),(0,l.jsx)(D.Input,{id:"dsh-wsl-user",value:s.user,disabled:R,placeholder:"\u9ED8\u8BA4\u7528\u6237",autoComplete:"off",onChange:x=>{N("user",x.target.value),N("directory","")}}),(0,l.jsx)("p",{children:"\u6BCF\u4E2A\u7528\u6237\u72EC\u7ACB\u8BB0\u5FC6\u76EE\u5F55\uFF1B\u5207\u6362\u4E0D\u4F1A\u505C\u6B62\u5176\u4ED6\u7528\u6237\u7684\u4EFB\u52A1\u3002"})]})]}),(0,l.jsxs)("div",{className:"dsh-wsl-card-actions",children:[(0,l.jsxs)("div",{className:"dsh-wsl-action-primary",children:[(0,l.jsx)(D.Button,{variant:"outline",type:"submit",disabled:R||!s.distro,icon:d==="connect"||d==="switch"?(0,l.jsx)(D.StateDot,{state:"ongoing"}):void 0,children:d==="connect"?"\u6B63\u5728\u8FDE\u63A5\u2026":g?"\u5E94\u7528\u5DE5\u4F5C\u76EE\u5F55":"\u8FDE\u63A5 WSL"}),I&&(0,l.jsx)(D.Button,{variant:"ghost",disabled:R,onClick:()=>W("windows",async()=>{await e("connect",{target:"windows"}),c({text:"Windows \u4E92\u64CD\u4F5C\u5DF2\u5C31\u7EEA\u3002"})}),children:ie?"Windows \u5DF2\u8FDE\u63A5":"\u8FDE\u63A5 Windows"})]}),(0,l.jsx)(D.Button,{variant:"ghost",icon:(0,l.jsx)(ve,{}),disabled:R||!s.directory.trim(),onClick:()=>W("open",async()=>{let x=await e("open",{path:s.directory.trim(),distro:s.distro,user:s.user});if(x.exitCode!==0)throw new Error(x.stderr||"Windows \u65E0\u6CD5\u6253\u5F00\u6B64\u76EE\u5F55\u3002");c({text:"\u5DF2\u5728 Windows \u4E2D\u6253\u5F00\u5DE5\u4F5C\u76EE\u5F55\u3002"})}),children:"\u5728 Windows \u4E2D\u6253\u5F00"})]})]})})]}),(0,l.jsxs)("div",{className:"dsh-wsl-help",children:[(0,l.jsx)(D.IconFolderOpenOutlineRegular,{size:18}),(0,l.jsx)("p",{children:I?"\u5F53\u524D\u4F1A\u8BDD\u4F7F\u7528 Linux \u539F\u751F\u5DE5\u5177\u3002\u9700\u8981 Windows \u6587\u4EF6\u3001PowerShell \u6216\u526A\u8D34\u677F\u65F6\uFF0C\u53EF\u4EE5\u76F4\u63A5\u5728\u5BF9\u8BDD\u4E2D\u63D0\u51FA\u3002":"Windows \u4F1A\u8BDD\u7EE7\u7EED\u4F7F\u7528\u539F\u751F Windows \u5DE5\u5177\uFF1B\u4E5F\u80FD\u901A\u8FC7\u63D2\u4EF6\u76F4\u63A5\u6267\u884C Linux \u547D\u4EE4\u6216\u53CC\u5411\u590D\u5236\u6587\u4EF6\u3002\u5B8C\u6574 Linux \u5DE5\u4F5C\u6D41\u53EF\u4ECE\u4E0A\u65B9\u8FDB\u5165\u3002"})]}),(0,l.jsxs)("details",{className:"dsh-wsl-diagnostics",children:[(0,l.jsxs)("summary",{children:["\u8FD0\u884C\u4E0E\u8FDE\u63A5\u7BA1\u7406",(0,l.jsx)(D.IconChevronDownOutlineRegular,{size:12})]}),(0,l.jsxs)("div",{className:"dsh-wsl-diagnostics-body",children:[(0,l.jsxs)("dl",{children:[(0,l.jsxs)("div",{children:[(0,l.jsx)("dt",{children:"\u5F53\u524D\u5BBF\u4E3B"}),(0,l.jsx)("dd",{children:I?"Linux / WSL":"Windows"})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)("dt",{children:"\u63D2\u4EF6\u7248\u672C"}),(0,l.jsx)("dd",{children:r.version})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)("dt",{children:"\u6D3B\u52A8\u8FDE\u63A5"}),(0,l.jsx)("dd",{children:r.pool.connections.filter(x=>x.connected).length})]}),$&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)("div",{children:[(0,l.jsx)("dt",{children:"Linux Node.js"}),(0,l.jsx)("dd",{children:$.info?.node})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)("dt",{children:"Linux \u4E3B\u76EE\u5F55"}),(0,l.jsx)("dd",{children:$.info?.home})]})]})]}),P.instances?.filter(x=>x.running).map(x=>(0,l.jsxs)("div",{className:"dsh-wsl-runtime-row",children:[(0,l.jsxs)("div",{children:[(0,l.jsx)("strong",{children:x.settings.distro}),(0,l.jsxs)("span",{children:[x.settings.user," \xB7 Linux DSH \u8FD0\u884C\u4E2D"]})]}),(0,l.jsx)(D.Button,{variant:"outline",disabled:R||x.preparing||x.starting,onClick:()=>f({kind:"stop",settings:x.settings}),children:"\u505C\u6B62\u6B64\u73AF\u5883"})]},`${x.settings.distro}/${x.settings.user}`)),!I&&(0,l.jsxs)("div",{className:"dsh-wsl-runtime-row",children:[(0,l.jsx)("p",{children:"\u9700\u8981\u9884\u5148\u4E0B\u8F7D\uFF0C\u6216\u66F4\u65B0\u505C\u6B62\u4E2D\u7684 Linux \u73AF\u5883\u65F6\u4F7F\u7528\u3002"}),(0,l.jsx)(D.Button,{variant:"outline",disabled:R||S||!!o||!s.distro,onClick:()=>W("prepare",async()=>{await e("native/prepare",y())}),children:"\u51C6\u5907\u73AF\u5883"})]}),(0,l.jsxs)("div",{className:"dsh-wsl-disconnect-row",children:[(0,l.jsx)("p",{children:"\u65AD\u5F00\u4F1A\u7ED3\u675F\u6865\u63A5\u8FDE\u63A5\u548C\u540E\u53F0\u4EFB\u52A1\u3002\u65E5\u5E38\u5207\u6362\u65E0\u9700\u65AD\u5F00\u3002"}),(0,l.jsx)(D.Button,{variant:"outline",disabled:R||S||!r.pool.connections.length,onClick:()=>f({kind:"disconnect"}),children:"\u65AD\u5F00\u5168\u90E8\u8FDE\u63A5"})]})]})]}),m&&(0,l.jsx)(We,{api:e,distro:s.distro,user:s.user,initialPath:s.directory.trim(),onClose:()=>v(!1),onSelect:x=>{v(!1),W("directory",()=>w({...y(),directory:x}))}}),(0,l.jsx)(D.Modal,{open:!!p,onClose:()=>f(null),title:p?.kind==="stop"?"\u505C\u6B62\u8FD9\u4E2A Linux \u73AF\u5883\uFF1F":"\u65AD\u5F00\u5168\u90E8\u8FDE\u63A5\uFF1F",closeLabel:"\u5173\u95ED",description:p?.kind==="stop"?"\u8BE5 Linux DSH \u4E2D\u7684\u4EFB\u52A1\u4F1A\u505C\u6B62\uFF0C\u5176\u4ED6\u73AF\u5883\u7EE7\u7EED\u8FD0\u884C\u3002\u5DF2\u4FDD\u5B58\u7684\u6587\u4EF6\u548C\u4F1A\u8BDD\u4F1A\u4FDD\u7559\u3002":"\u5168\u90E8\u6865\u63A5\u4EFB\u52A1\u548C\u672C\u63D2\u4EF6\u542F\u52A8\u7684 Linux DSH \u4F1A\u505C\u6B62\u3002Windows DSH \u548C\u5DF2\u4FDD\u5B58\u7684\u6587\u4EF6\u4FDD\u7559\u3002",footer:(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(D.Button,{onClick:()=>f(null),children:"\u53D6\u6D88"}),(0,l.jsx)(D.Button,{variant:"primary",onClick:()=>{let x=p;f(null),W("stop",async()=>{await e(x.kind==="stop"?"native/stop":"disconnect",x.settings||{}),t.readyLink=null,c({text:x.kind==="stop"?"\u8BE5 Linux \u73AF\u5883\u5DF2\u505C\u6B62\u3002":"\u6865\u63A5\u8FDE\u63A5\u5DF2\u65AD\u5F00\u3002"})})},children:"\u786E\u8BA4\u505C\u6B62"})]})})]})}function at(e,n,t){let r=new Map,s=new Map,a=new AbortController,d=new Set,i=new Set,h=new Map,c=Ee(e),m=K("workspace-order",void 0,localStorage),v=0,p,f,u={entries:r,activeKey:null,error:null,busy:!1,anchor:null,dialog:null,catalogRevision:0,workspaceOrder:Array.isArray(m)?m.filter(o=>typeof o=="string").slice(0,16e3):[],requestWorkspace(){u.dialog={type:"workspace"},t.emit()},requestRename(o){u.dialog={type:"rename",target:o},t.emit()},requestHandoff(o){u.dialog={type:"handoff",source:o},t.emit()},async handoff(o,b,S){let R=o?await u.remote(o,b,S):await c(b,S);return b==="handoff.deliver"&&(o?(u.activeKey=o.key,e.layout.selectPanel(ce)):u.showWindows(R.sessionId),t.emit()),R},setWorkspaceOrder(o){u.workspaceOrder=o,K("workspace-order",o,localStorage),t.emit()},async remote(o,b,S){if(!o.ready){if(u.busy)throw new Error("WSL \u73AF\u5883\u6B63\u5728\u8FDE\u63A5\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002");await u.enter(o.settings,{connectOnly:!0},!1),await new Promise((V,$)=>{let ie=()=>{},F=x=>{clearTimeout(Ie),ie(),a.signal.removeEventListener("abort",ne),x?$(x):V()},ne=()=>F(new Error("\u7A97\u53E3\u5DF2\u5173\u95ED\u3002")),Ie=setTimeout(()=>F(new Error(u.error||"WSL \u9875\u9762\u8FDE\u63A5\u8D85\u65F6\uFF0C\u8BF7\u91CD\u65B0\u8FDE\u63A5\u3002")),45e3),Le=()=>{let x=r.get(o.key);x?.ready?(o=x,F()):u.error&&F(new Error(u.error))};ie=t.subscribe(Le),a.signal.addEventListener("abort",ne,{once:!0}),Le()})}let R=await W(o,b,S);return b!=="search"&&await W(o,"refresh",{}),R},unified:K("sidebar-view-v050",void 0,localStorage)==="conversations",nativeCatalog:()=>ye(e),visible:()=>e.layout.panelInfo.getSnapshot().activePanelId===ce,changed(){t.emit()},setUnified(o){u.unified=o,K("sidebar-view-v050",o?"conversations":"workspaces",localStorage),t.emit()},setAnchor(o){u.anchor=o,t.emit()},showWindows(o){v++,u.error=null,o?e.uiWorkspace.openSession(o):e.layout.selectPanel(null),t.emit()},async openRow(o){if(!o.environment)return u.showWindows(o.id);let b=r.get(o.environment.key);if(!b?.ready)return u.enter(b.settings,{sessionId:o.id});v++,u.activeKey=b.key,u.error=null,e.layout.selectPanel(ce),t.emit();try{await N(b,{sessionId:o.id})}catch(S){u.error=S.message,t.emit()}},async enter(o,b={},S=!0){if(u.busy)return;let R=++v;u.busy=!0,u.error=null,t.emit();try{let V=await n("native/enter",{...o,parentOrigin:Q(location.origin)}),$,ie=Date.now()+600*1e3;for(;!a.signal.aborted&&Date.now()<ie;){if($=(await t.refresh()).handoffs.find(ne=>ne.id===V.id),$?.state==="failed")throw new Error($.error);if($?.state==="ready")break;await new Promise(ne=>setTimeout(ne,700))}if(a.signal.aborted)return;if($?.state!=="ready")throw new Error("Linux \u542F\u52A8\u4ECD\u672A\u5B8C\u6210\uFF0C\u8BF7\u5728\u73AF\u5883\u9762\u677F\u67E5\u770B\u8FDB\u5EA6\u3002");await u.adopt($,b,S&&R===v)}catch(V){u.error=V.message}finally{u.busy=!1,t.emit()}},async adopt(o,b={},S=!0){let R=Ce(o.settings);d.delete(R);let V=new URL(o.url).origin,$=r.get(R);if(!$||$.origin!==V){if([...r.values()].filter(ne=>ne.url&&ne.key!==R).length>=8)throw new Error("\u540C\u4E00\u7A97\u53E3\u6700\u591A\u4FDD\u6301 8 \u4E2A Linux \u73AF\u5883\u3002\u5728\u5BF9\u8BDD\u83DC\u5355\u4E2D\u5173\u95ED\u4E0D\u7528\u7684\u73AF\u5883\u9875\u9762\u540E\u53EF\u7EE7\u7EED\u6253\u5F00\uFF0C\u540E\u53F0\u4EFB\u52A1\u4E0D\u53D7\u5F71\u54CD\u3002");$&&y($,"Linux \u5DF2\u91CD\u65B0\u542F\u52A8\uFF0C\u8BF7\u91CD\u8BD5\u8FD9\u6B21\u64CD\u4F5C\u3002");let F=crypto.randomUUID();$={key:R,settings:o.settings,origin:V,channel:F,catalog:$?.catalog||null,url:Fe(o.url,F,location.origin),openUrl:o.url,transport:Q(location.origin)===de?"desktop":"iframe",ready:!1,compact:!0,window:null,waiting:null,startedAt:Date.now()},r.set(R,$)}else $.settings=o.settings,$.openUrl=o.url;$.handoff=we(new URL(o.url).hash),S&&(u.activeKey=R,e.layout.selectPanel(ce));let ie={handoff:$.handoff,...b};b.connectOnly||($.ready?await N($,ie):$.waiting=ie),O(),t.emit()},bind(o,b){o.window=b?.contentWindow||null},desktopMessage(o,b){r.get(o.key)===o&&I(o,b)},desktopError(o,b){r.get(o.key)===o&&(o.ready=!1,u.error=b.message,y(o,b.message),t.emit())},async newWindows(o){v++,u.error=null;try{await Ve(e,o)}catch(b){u.error=b.message}t.emit()},async newLinux(o){let b=o?.settings||t.state?.settings;if(!b?.distro){e.layout.selectPanel("dsh-wsl-native");return}let S=o?.catalog?.rows.find(R=>R.id===o.catalog.selectedId);await u.enter({...b,directory:S?.cwd||b.directory},{create:!0})},async action(o,b){u.error=null;try{if(o.environment){let S=r.get(o.environment.key);await u.remote(S,b,{sessionId:o.id})}else{let S={pin:"pinSession",unpin:"unpinSession",archive:"archiveSession",unarchive:"unarchiveSession"};if(!S[b])throw new Error("\u5BF9\u8BDD\u64CD\u4F5C\u65E0\u6548\u3002");await e.uiWorkspace[S[b]](o.id)}}catch(S){u.error=S.message}t.emit()},toggleChrome(o){let b=o.configOpen?null:"plugins";W(o,"chrome",{compact:!0,panel:b}).then(()=>{o.configOpen=!!b,o.compact=!0,t.emit()}).catch(S=>{u.error=S.message,t.emit()})},closeView(o){d.add(o.key),y(o,"\u8FD9\u4E2A\u73AF\u5883\u7684\u9875\u9762\u5DF2\u5173\u95ED\uFF0C\u540E\u53F0\u4EFB\u52A1\u7EE7\u7EED\u8FD0\u884C\u3002"),u.activeKey===o.key&&u.showWindows(),delete o.url,o.window=null,o.ready=!1,o.origin=null,o.waiting=null,O(),t.emit()},reconnect(o){y(o,"\u8FDE\u63A5\u6B63\u5728\u91CD\u65B0\u5EFA\u7ACB\u3002"),o.origin=null,u.enter(o.settings,o.catalog?.selectedId?{sessionId:o.catalog.selectedId}:{})}};function O(){clearTimeout(p),p=setTimeout(()=>K("conversation-catalogs",[...r.values()].map(o=>({key:o.key,settings:o.settings,catalog:o.catalog})),localStorage),200)}let C=K("conversation-catalogs",void 0,localStorage)||K("conversation-catalogs");for(let o of(Array.isArray(C)?C:[]).slice(0,8)){if(!o?.settings?.distro||!o?.settings?.directory||!xe(o.catalog))continue;let b=Ce(o.settings);r.set(b,{key:b,settings:o.settings,catalog:xe(o.catalog),ready:!1,compact:!0})}function W(o,b,S){if(!o.window&&!o.desktop||!o.ready)return Promise.reject(new Error("WSL \u5BF9\u8BDD\u754C\u9762\u5C1A\u672A\u8FDE\u63A5\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002"));let R=crypto.randomUUID();return new Promise((V,$)=>{let ie=setTimeout(()=>{s.delete(R),$(new Error("WSL \u5BF9\u8BDD\u6CA1\u6709\u53CA\u65F6\u54CD\u5E94\uFF0C\u8BF7\u68C0\u67E5\u8FDE\u63A5\uFF1B\u64CD\u4F5C\u4E0D\u4F1A\u81EA\u52A8\u91CD\u653E\u3002"))},3e4);s.set(R,{entry:o,resolve:V,reject:$,timer:ie}),o.desktop?o.desktop.request(b,S).then(F=>I(o,{type:"result",id:R,ok:!0,value:F}),F=>I(o,{type:"result",id:R,ok:!1,error:F.message})):o.window.postMessage({protocol:be,channel:o.channel,type:"request",id:R,action:b,payload:S},o.origin)})}async function N(o,b){let S=crypto.randomUUID();o.navigating=S,t.emit();try{await W(o,"navigate",b),o.configOpen=!1,b.panel==="plugins"&&(await W(o,"chrome",{compact:!0,panel:"plugins"}),o.configOpen=!0)}finally{o.navigating===S&&(o.navigating=null),t.emit()}}function y(o,b){for(let[S,R]of s)R.entry===o&&(clearTimeout(R.timer),s.delete(S),R.reject(new Error(b)))}function w(o){let b=[...document.body.style].filter(S=>/^--(?:ds|dsw|dsh)-/.test(S)).map(S=>[S,document.body.style.getPropertyValue(S)]);W(o,"theme",{dark:document.body.hasAttribute("data-ds-dark-theme"),tokens:b}).catch(()=>{})}let L=o=>{let b=[...r.values()].find(S=>Oe(o,{origin:S.origin,source:S.window,channel:S.channel}));b&&I(b,o.data)};function I(o,b){if(b.type==="catalog"){let S=xe(b.catalog);if(!S)return;let R=!o.ready;if(o.ready=!0,o.catalog=S,o.lastSeen=Date.now(),u.catalogRevision++,R&&w(o),o.waiting){let V=o.waiting;o.waiting=null,N(o,V).catch($=>{u.error=$.message,t.emit()})}O(),t.emit()}else if(b.type==="result"){let S=s.get(b.id);if(!S||S.entry!==o)return;clearTimeout(S.timer),s.delete(b.id),b.ok?S.resolve(b.value):S.reject(new Error(String(b.error||"\u64CD\u4F5C\u5931\u8D25\u3002").slice(0,1e3)))}else b.type==="return"?u.showWindows():b.type==="sidebar"&&e.layout.toggleSidebar()}window.addEventListener("message",L);let k=new MutationObserver(()=>{for(let o of r.values())o.ready&&w(o)});k.observe(document.body,{attributes:!0,attributeFilter:["data-ds-dark-theme","style"]});let E=()=>{let o=JSON.stringify(ye(e));o!==f&&(f=o,t.emit())},g=()=>{if(t.state?.mode==="windows-host")for(let o of t.state.native?.instances||[]){let b=Ce(o.settings);if(!o.running?.openUrl||r.get(b)?.url||d.has(b)||i.has(b))continue;let S;try{S=new URL(o.running.openUrl).origin}catch{continue}h.get(b)!==S&&(h.set(b,S),i.add(b),u.adopt({settings:o.settings,url:o.running.openUrl},{},!1).catch(R=>{u.error=R.message}).finally(()=>{i.delete(b),t.emit()}))}},P=[e.sessions.list.subscribe(E),e.workspaces.list.subscribe(E),e.layout.panelInfo.subscribe(()=>{t.emit()}),t.subscribe(g)];return g(),u.dispose=()=>{a.abort(),k.disconnect(),clearTimeout(p),window.removeEventListener("message",L);for(let o of P)o();for(let o of r.values())y(o,"\u7A97\u53E3\u5DF2\u5173\u95ED\u3002")},u}var Z=require("react"),X=require("@deepseek-ai/dsh-client-ui-primitives");function Mt(e,n,t,r){if(!he(e)||!["next","request"].includes(t)||!/^[a-zA-Z0-9-]{32,64}$/.test(n))throw new Error("\u684C\u9762 WSL \u901A\u9053\u53C2\u6570\u65E0\u6548\u3002");return`(() => { if (location.origin !== ${JSON.stringify(e)} || location.pathname !== '/') return null; const api = window[${JSON.stringify(me)}]; return api ? api[${JSON.stringify(t)}](...${JSON.stringify([n,...r])}) : null; })()`}function ot({host:e,entry:n,bridge:t,onMessage:r,onError:s,createElement:a=()=>document.createElement("webview")}){let d=!1,i,h,c,m=0,v,p,f=W=>new Promise(N=>{p=N,v=setTimeout(()=>{p=null,N()},W)}),u=(W,...N)=>d||!i||new URL(i.getURL()).origin!==n.origin?Promise.reject(new Error("WSL \u9875\u9762\u5C1A\u672A\u8FDE\u63A5\u6216\u5DF2\u79BB\u5F00\u6240\u5C5E\u73AF\u5883\u3002")):i.executeJavaScript(Mt(n.origin,n.channel,W,N));async function O(W){let N=0,y=Date.now()+45e3;try{for(;!d&&W===m;){let w=await u("next",N);if(d||W!==m)return;if(!w){if(Date.now()>y)throw new Error("Linux \u5BF9\u8BDD\u63D2\u4EF6\u5C1A\u672A\u5C31\u7EEA\uFF0C\u8BF7\u91CD\u65B0\u8FDE\u63A5\u3002");await f(250);continue}if(w.closed)return;if(!Number.isSafeInteger(w.sequence)||w.sequence<N)throw new Error("WSL \u9875\u9762\u8FD4\u56DE\u4E86\u65E0\u6548\u6E38\u6807\u3002");N=w.sequence,w.catalog&&r({type:"catalog",catalog:w.catalog});for(let L of(w.signals||[]).slice(0,16))["return","sidebar"].includes(L.type)&&r({type:L.type})}}catch(w){!d&&W===m&&s(w)}}let C={async request(W,N){let y=await u("request",W,N);if(!y?.ok)throw new Error(y?.error||"WSL \u9875\u9762\u5C1A\u672A\u8FDE\u63A5\u3002");return y.value},dispose(){d||(d=!0,m++,clearTimeout(v),p?.(),c?.(),i?.remove(),h&&t.release(h).catch(()=>{}))}};return(async()=>{if(!t?.acquire||!t?.release)throw new Error("\u5F53\u524D DSH \u684C\u9762\u7AEF\u6CA1\u6709\u9694\u79BB\u6D4F\u89C8\u5668\u63A5\u53E3\uFF0C\u8BF7\u66F4\u65B0 DSH \u6216\u4F7F\u7528 Web \u5165\u53E3\u3002");let W=await t.acquire("dsh-wsl-native:"+n.key);if(h=W.lease,d){await t.release(h);return}i=a(),i.className="dsh-wsl-desktop-view",i.setAttribute("name",h),i.setAttribute("partition",W.partition),i.setAttribute("allowpopups",""),i.setAttribute("aria-label",`WSL ${n.settings.distro} \u539F\u751F DSH \u5BF9\u8BDD`),i.setAttribute("src","about:blank#"+h);let N=!0;i.addEventListener("dom-ready",()=>{d||(N?(N=!1,i.loadURL(n.url).catch(y=>{d||s(y)})):O(++m))}),i.addEventListener("did-start-navigation",y=>{y.isMainFrame&&!y.isInPlace&&m++}),i.addEventListener("did-fail-load",y=>{!d&&y.isMainFrame&&y.errorCode!==-3&&s(new Error("WSL \u9875\u9762\u52A0\u8F7D\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5 Linux \u5B9E\u4F8B\u5E76\u91CD\u65B0\u8FDE\u63A5\u3002"))}),i.addEventListener("render-process-gone",()=>{m++,d||s(new Error("WSL \u5BF9\u8BDD\u9875\u9762\u5DF2\u9000\u51FA\uFF0C\u540E\u53F0\u5BBF\u4E3B\u4ECD\u72EC\u7ACB\u8FD0\u884C\u3002\u8BF7\u91CD\u65B0\u8FDE\u63A5\u3002"))}),c=t.onOpenRequested?.(h,y=>{!d&&/^https?:/.test(y)&&window.open(y,"_blank","noopener")}),e.append(i)})().catch(W=>{d||s(W)}),C}var Y=require("react"),ee=require("@deepseek-ai/dsh-client-ui-primitives");var B=require("react/jsx-runtime"),Rt={switch:"M4 7h16m-4-4 4 4-4 4M20 17H4m4-4-4 4 4 4",search:"M10.5 17a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13Zm5-1.5L21 21",filter:"M4 6h16M7 12h10M10 18h4",plus:"M12 4v16M4 12h16"};function Be({name:e}){return(0,B.jsx)("svg",{width:"15",height:"15",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:(0,B.jsx)("path",{d:Rt[e]})})}function lt({ctx:e,model:n,wide:t,expandSidebar:r}){re(n);let s=n.conversations,a=s.nativeCatalog(),[d,i]=(0,Y.useState)("all"),[h,c]=(0,Y.useState)(""),[m,v]=(0,Y.useState)(35),[p,f]=(0,Y.useState)(!1),[u,O]=(0,Y.useState)(null),[C,W]=(0,Y.useState)(null),[N,y]=(0,Y.useState)(!1),w=(0,Y.useRef)(null),L=(0,Y.useRef)(null);if((0,Y.useEffect)(()=>{if(!C)return;let g=P=>{(!w.current?.contains(P.target)||P.key==="Escape")&&W(null)};return document.addEventListener("pointerdown",g),document.addEventListener("keydown",g),()=>{document.removeEventListener("pointerdown",g),document.removeEventListener("keydown",g)}},[C]),(0,Y.useEffect)(()=>{N&&L.current?.focus()},[N]),!t)return(0,B.jsx)("div",{className:"dsh-wsl-chat-rail",children:(0,B.jsx)(ee.Button,{variant:"ghost",icon:(0,B.jsx)(le,{size:18}),"aria-label":"\u5C55\u5F00\u5BF9\u8BDD\u5217\u8868",onClick:r})});let I=$e(a,s.entries.values(),{filter:d,query:h,archived:p}),k=g=>{window.matchMedia("(max-width:600px)").matches&&e.layout.toggleSidebar(),g()},E=g=>{let P=u;O(null),s.action(P,g)};return(0,B.jsxs)("section",{ref:w,className:"dsh-wsl-conversations","aria-label":"Windows \u4E0E WSL \u5BF9\u8BDD\u5217\u8868",children:[(0,B.jsxs)("div",{className:"dsh-wsl-compact-heading",children:[(0,B.jsx)("span",{children:p?"\u5DF2\u5F52\u6863":d==="wsl"?"WSL \u5BF9\u8BDD":d==="windows"?"Windows \u5BF9\u8BDD":"\u5BF9\u8BDD"}),(0,B.jsx)("button",{type:"button",className:"dsh-wsl-icon-button","aria-label":"\u5207\u6362\u5230\u539F\u751F\u5DE5\u4F5C\u533A",title:"\u5207\u6362\u5230\u539F\u751F\u5DE5\u4F5C\u533A",onClick:()=>s.setUnified(!1),children:(0,B.jsx)(Be,{name:"switch"})}),(0,B.jsxs)("div",{className:"dsh-wsl-heading-actions",children:[(0,B.jsx)("button",{type:"button",className:"dsh-wsl-icon-button","aria-label":"\u641C\u7D22\u5BF9\u8BDD",title:"\u641C\u7D22\u5BF9\u8BDD","aria-expanded":N,onClick:()=>{y(!N),N&&c(""),W(null)},children:(0,B.jsx)(Be,{name:"search"})}),(0,B.jsx)("button",{type:"button",className:"dsh-wsl-icon-button","aria-label":"\u7B5B\u9009\u5BF9\u8BDD",title:"\u7B5B\u9009\u4E0E\u5F52\u6863","aria-expanded":C==="filter",onClick:()=>W(C==="filter"?null:"filter"),children:(0,B.jsx)(Be,{name:"filter"})}),(0,B.jsxs)("button",{type:"button",className:"dsh-wsl-icon-button dsh-wsl-add-workspace","aria-label":"\u65B0\u5EFA WSL \u5DE5\u4F5C\u533A",title:"\u65B0\u5EFA WSL \u5DE5\u4F5C\u533A",onClick:()=>s.requestWorkspace(),children:[(0,B.jsx)(Be,{name:"plus"}),(0,B.jsx)("span",{"aria-hidden":"true",children:"WSL"})]})]})]}),C&&(0,B.jsx)("div",{className:"dsh-wsl-list-popover",role:"group","aria-label":"\u5BF9\u8BDD\u7B5B\u9009",children:(0,B.jsxs)(B.Fragment,{children:[[["all","\u5168\u90E8\u73AF\u5883"],["windows","Windows"],["wsl","WSL"]].map(([g,P])=>(0,B.jsxs)("button",{type:"button","aria-pressed":d===g,onClick:()=>{i(g),v(35),W(null)},children:[P,d===g?" \u2713":""]},g)),(0,B.jsx)("button",{type:"button",className:"dsh-wsl-menu-divider","aria-pressed":p,onClick:()=>{f(!p),W(null)},children:p?"\u663E\u793A\u5F53\u524D\u5BF9\u8BDD":"\u663E\u793A\u5DF2\u5F52\u6863\u5BF9\u8BDD"})]})}),N&&(0,B.jsx)(ee.Input,{ref:L,"aria-label":"\u641C\u7D22\u5BF9\u8BDD\u6216\u5DE5\u4F5C\u76EE\u5F55",placeholder:"\u641C\u7D22\u5BF9\u8BDD\u6216\u76EE\u5F55",value:h,onChange:g=>{c(g.target.value),v(35)},onKeyDown:g=>{g.key==="Escape"&&(c(""),y(!1))}}),s.error&&(0,B.jsx)("div",{className:"dsh-wsl-chat-list-error",role:"alert",children:s.error}),(0,B.jsxs)("div",{className:"dsh-wsl-chat-rows",role:"list","aria-label":p?"\u5DF2\u5F52\u6863\u5BF9\u8BDD":"\u6240\u6709\u73AF\u5883\u7684\u5BF9\u8BDD",children:[I.slice(0,m).map(g=>{let P=g.environment?s.visible()&&s.activeKey===g.environment.key&&g.environment.catalog.selectedId===g.id:!e.layout.panelInfo.getSnapshot().activePanelId&&a.selectedId===g.id;return(0,B.jsxs)("div",{className:`dsh-wsl-chat-row${P?" is-selected":""}`,role:"listitem",children:[(0,B.jsxs)("button",{type:"button",className:"dsh-wsl-chat-row-open","aria-current":P?"page":void 0,disabled:p,"aria-label":`${g.environment?"WSL":"Windows"} \u5BF9\u8BDD\uFF1A${g.title}`,title:`${g.environment?`WSL \xB7 ${g.environment.settings.distro}`:"Windows"}
${g.cwd}`,onClick:()=>k(()=>void s.openRow(g)),children:[(0,B.jsx)("span",{className:"dsh-wsl-chat-dot",children:g.running?(0,B.jsx)(ee.StateDot,{state:"ongoing"}):g.pinned?"\u2022":null}),(0,B.jsx)("span",{className:"dsh-wsl-chat-row-text",children:(0,B.jsx)("span",{children:g.title||"\u65B0\u5BF9\u8BDD"})}),g.environment&&(0,B.jsx)("span",{className:"dsh-wsl-chat-mark",title:`WSL \xB7 ${g.environment.settings.distro}`,children:"WSL"})]}),(0,B.jsx)("button",{type:"button",className:"dsh-wsl-chat-more","aria-label":`\u7BA1\u7406\u5BF9\u8BDD\uFF1A${g.title}`,onClick:()=>O(g),children:"\u22EF"})]},g.key)}),I.length>m&&(0,B.jsxs)(ee.Button,{variant:"ghost",onClick:()=>v(m+35),children:["\u663E\u793A\u66F4\u591A\uFF08",I.length-m,"\uFF09"]}),!I.length&&(0,B.jsx)("div",{className:"dsh-wsl-chat-empty",children:h?"\u6CA1\u6709\u5339\u914D\u7684\u5BF9\u8BDD":p?"\u6CA1\u6709\u5DF2\u5F52\u6863\u5BF9\u8BDD":"\u70B9\u51FB\u4E0A\u65B9 Windows \u6216 WSL \u5F00\u59CB\u5BF9\u8BDD"})]}),s.busy&&(0,B.jsxs)("div",{className:"dsh-wsl-chat-list-foot",role:"status",children:[(0,B.jsx)(ee.StateDot,{state:"ongoing"}),"\u6B63\u5728\u51C6\u5907 WSL\u2026"]}),(0,B.jsx)(ee.Modal,{open:!!u,onClose:()=>O(null),title:u?.title||"\u7BA1\u7406\u5BF9\u8BDD",children:u&&(0,B.jsxs)("div",{className:"dsh-wsl-chat-menu",children:[(0,B.jsxs)("p",{children:[u.environment?`WSL \xB7 ${u.environment.settings.distro}`:"Windows"," \xB7 ",u.cwd]}),!u.archived&&(0,B.jsx)(ee.Button,{onClick:()=>E(u.pinned?"unpin":"pin"),children:u.pinned?"\u53D6\u6D88\u7F6E\u9876":"\u7F6E\u9876\u5BF9\u8BDD"}),(0,B.jsx)(ee.Button,{onClick:()=>E(u.archived?"unarchive":"archive"),children:u.archived?"\u6062\u590D\u5BF9\u8BDD":"\u5F52\u6863\u5BF9\u8BDD"}),!u.archived&&(0,B.jsx)(ee.Button,{onClick:()=>{s.requestHandoff({id:u.id,row:u,entry:u.environment||null}),O(null)},children:"\u4EA4\u63A5\u5DE5\u4F5C\u2026"}),u.environment?.url&&(0,B.jsx)(ee.Button,{variant:"ghost",onClick:()=>{s.closeView(u.environment),O(null)},children:"\u5173\u95ED\u73AF\u5883\u9875\u9762\uFF08\u4FDD\u7559\u540E\u53F0\u4EFB\u52A1\uFF09"})]})})]})}function dt(e,n){let t=document,r,s,a,d=!1,i,h=(w,L,I,k)=>{let E=t.createElement("button");E.type="button",E.className=L,E.title=w,E.setAttribute("aria-label",w);let g=t.createElementNS("http://www.w3.org/2000/svg","svg");for(let[o,b]of Object.entries({width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true"}))g.setAttribute(o,b);let P=t.createElementNS(g.namespaceURI,"path");return P.setAttribute("d",I),g.append(P),E.append(g),E.addEventListener("click",k),E},c=h("\u5207\u6362\u5230\u7D27\u51D1\u5BF9\u8BDD\u5217\u8868","dsh-wsl-icon-button dsh-wsl-native-toggle","M4 7h16m-4-4 4 4-4 4M20 17H4m4-4-4 4 4 4",()=>n.conversations.setUnified(!0)),m=h("\u65B0\u5EFA WSL \u5DE5\u4F5C\u533A","dsh-wsl-icon-button dsh-wsl-add-workspace","M3 7V5h6l2 2h10v13H3V7m9 4v6m-3-3h6",()=>n.conversations.requestWorkspace()),v=t.createElement("span");v.textContent="WSL",v.setAttribute("aria-hidden","true"),m.append(v),m.dataset.dshWslOwned="";let p=t.createElement("div");p.className="dsh-wsl-new-pair",p.dataset.dshWslOwned="";let f=h("\u65B0\u5EFA Windows \u5BF9\u8BDD","dsh-wsl-new-windows","M3 4h18v13H3zM8 21h8m-4-4v4",()=>n.conversations.newWindows()),u=h("\u65B0\u5EFA WSL \u5BF9\u8BDD","dsh-wsl-new-linux","M3 5h18v14H3zM7 9l3 3-3 3m6 0h4",()=>void n.conversations.newLinux(n.conversations.entries.get(n.conversations.activeKey)));for(let[w,L]of[[f,"Windows"],[u,"WSL"]]){let I=t.createElement("span");I.textContent=L,w.append(I)}p.append(f,u);let O=new Set;function C(){if(a=null,d||n.state?.mode!=="windows-host")return;let I=t.querySelector("[data-shell-overlay]")?.parentElement?.querySelector(":scope > [data-rightbar-col]")?.previousElementSibling?.previousElementSibling;if(!I)return;s!==I&&(r?.disconnect(),s=I,r=new MutationObserver(g=>{g.some(P=>!P.target.closest?.("[data-dsh-wsl-owned]")&&[...P.addedNodes,...P.removedNodes].some(o=>!o.dataset||!("dshWslOwned"in o.dataset)))&&W()}),r.observe(s,{subtree:!0,childList:!0}));let k=s.querySelector('button[class*="newSession"]');k&&(i!==k&&(i?.removeAttribute("data-dsh-wsl-replaced"),i=k),k.setAttribute("data-dsh-wsl-replaced",""),p.previousElementSibling!==k&&k.after(p),p.classList.toggle("is-narrow",k.parentElement.getBoundingClientRect().width<160)),u.disabled=n.conversations.busy;let E=s.querySelector('[class*="sectionHeader"]');if(E&&!n.conversations.unified){let g=E.querySelector(":scope > span");c.parentElement!==E&&(g?g.after(c):E.prepend(c)),m.parentElement!==E&&E.append(m)}else c.remove(),m.remove();for(let g of O)g.isConnected||O.delete(g);for(let[g,P]of[["workspace","projectText"],["session","title"]])for(let o of s.querySelectorAll(`[data-row-key^="${g}:dsh-wsl:"]`)){if(o.querySelector(":scope > .dsh-wsl-workspace-mark"))continue;let b=o.querySelector(`:scope > [class*="${P}"]`);if(!b)continue;let S=t.createElement("span");S.dataset.dshWslOwned="",S.className="dsh-wsl-workspace-mark"+(g==="session"?" dsh-wsl-session-mark":""),S.textContent="WSL",S.title=g==="session"?"WSL \u5BF9\u8BDD":"WSL \u5DE5\u4F5C\u533A",b.after(S),O.add(S)}}function W(){!d&&!a&&(a=requestAnimationFrame(C))}let N=n.subscribe(W),y=e.slots.subscribe("sidebar.workspaces",W);return W(),()=>{d=!0,cancelAnimationFrame(a),r?.disconnect(),N(),y(),i?.removeAttribute("data-dsh-wsl-replaced"),p.remove(),c.remove(),m.remove();for(let w of O)w.remove()}}var ut=require("react"),te=require("@deepseek-ai/dsh-client-ui-primitives");var Se=(e,n,t)=>"dsh-wsl:"+JSON.stringify([e.key,n,t]);function ct(e,n,t,r,s,a=[]){let d={...e,ids:[...e.ids],byId:{...e.byId}};if(s)for(let v of d.ids){let p=d.byId[v];p?.retainedBy?.mainView&&(d.byId[v]={...p,retainedBy:{...p.retainedBy,mainView:0}})}let i={...n,items:[...n.items],pinnedSessionIds:[...n.pinnedSessionIds],archivedSessionIds:[...n.archivedSessionIds]},h=new Map(t),c=new Map;for(let v of r){for(let p of v.catalog?.rows||[]){let f=Se(v,"session",p.id);c.set(f,{entry:v,id:p.id,row:p,kind:"session"}),d.ids.push(f),d.byId[f]={id:f,title:p.title,displayTitle:p.title,cwd:p.cwd,blank:p.blank,running:p.running,updatedAt:p.updatedAt,retainedBy:{mainView:s===v.key&&v.catalog.selectedId===p.id?1:0}},h.set(f,{running:p.running,completionUnread:!1}),p.pinned&&i.pinnedSessionIds.push(f),p.archived&&i.archivedSessionIds.push(f)}for(let p of v.catalog?.workspaces||[]){let f=Se(v,"workspace",p.workspaceId);c.set(f,{entry:v,id:p.workspaceId,workspace:p,kind:"workspace"}),i.items.push({...p,workspaceId:f,sessionIds:p.sessionIds.map(u=>Se(v,"session",u))})}}let m=new Map(a.map((v,p)=>[v,p]));return i.items.sort((v,p)=>(m.get(v.workspaceId)??1/0)-(m.get(p.workspaceId)??1/0)),{sessions:d,workspaces:i,status:h,targets:c}}function pt(e,n,t,r){if(!e.some(i=>i.workspaceId===t)||r!==void 0&&!e.some(i=>i.workspaceId===r))throw new Error("\u5DE5\u4F5C\u533A\u5217\u8868\u5DF2\u53D8\u5316\uFF0C\u8BF7\u91CD\u8BD5\u3002");let s=e.map(i=>i.workspaceId);if(t===r)return{order:s,beforeId:r};s.splice(s.indexOf(t),1),s.splice(r===void 0?s.length:s.indexOf(r),0,t);let a=n.get(t)?.entry.key,d=s.slice(s.indexOf(t)+1).find(i=>n.get(i)?.entry.key===a);return{order:s,beforeId:n.get(d)?.id??d}}var U=require("react/jsx-runtime");function ht(e,n,t){let r=Object.fromEntries(Object.entries(n||{}).map(([d,i])=>[t+d,i])),s=[];return{declarations:r,start:()=>{for(let d of Object.keys(n||{})){let i=[],h=()=>{i.splice(0).reverse().forEach(c=>c());for(let c of e.slots.entries(d)){let m=ht(e,c.children,t),v=c.component;i.push(e.slots.register({...c.options,name:t+d,...c.inject?{inject:c.inject}:{},...c.store?{store:c.store}:{},...c.locale?{locale:c.locale}:{},...c.children?{children:m.declarations}:{}},c.children?p=>(0,U.jsx)(v,{...p,renderSlot:(f,u,O)=>p.renderSlot(t+f,u,O)}):v)),c.children&&i.push(m.start())}};h(),s.push(e.slots.subscribe(d,h),()=>i.splice(0).reverse().forEach(c=>c()))}return()=>s.splice(0).reverse().forEach(d=>d())}}}function zt({Native:e,ctx:n,model:t,prefix:r,...s}){re(t);let a=t.conversations,d=s.useSessions(w=>w),i=s.useWorkspaces(w=>w),h=s.useSessionStatus(w=>w),c=s.usePanelInfo(w=>w),m=[...a.entries.values()],v=a.visible()?a.activeKey:null,p=(0,ut.useMemo)(()=>ct(d,i,h,m,v,a.workspaceOrder),[d,i,h,v,a.workspaceOrder,a.catalogRevision]),f=w=>p.targets.get(w),u=w=>void Promise.resolve().then(w).catch(L=>{a.error=L.message,t.emit()}),O=w=>{a.activeKey=w.key,n.layout.selectPanel(ce),t.emit()},C=async(w,L,I={})=>{let k=f(w);if(!k)throw new Error("WSL \u5DE5\u4F5C\u533A\u5DF2\u53D8\u5316\uFF0C\u8BF7\u91CD\u8BD5\u3002");await a.remote(k.entry,L,{[k.kind==="workspace"?"workspaceId":"sessionId"]:k.id,...I}),(L==="workspace.start"||L==="session.fork")&&O(k.entry)},W=(w,L)=>f(w)?a.requestRename({...f(w),title:L}):s.requestSessionRename(w,L),N=w=>w.row.running?(a.dialog={type:"archive",target:w},t.emit()):u(()=>a.remote(w.entry,"archive",{sessionId:w.id}));return(0,U.jsx)(e,{...s,useSessions:w=>w(p.sessions),useWorkspaces:w=>w(p.workspaces),useSessionStatus:w=>w(p.status),usePanelInfo:w=>w(v?{...c,activePanelId:null}:c),startSession:w=>f(w)?u(()=>C(w,"workspace.start")):void a.newWindows(w),open:w=>f(w)?void a.openRow({...f(w).row,environment:f(w).entry}):s.open(w),requestSessionRename:W,renameWorkspace:(w,L)=>f(w)?C(w,"workspace.rename",{title:L}):s.renameWorkspace(w,L),deleteWorkspace:w=>f(w)?C(w,"workspace.delete"):s.deleteWorkspace(w),insertWorkspaceBefore:async(w,L)=>{if(w===L)return;let I=pt(p.workspaces.items,p.targets,w,L);f(w)?await C(w,"workspace.reorder",{beforeId:I.beforeId}):await s.insertWorkspaceBefore(w,I.beforeId),a.setWorkspaceOrder(I.order)},unarchiveSession:w=>f(w)?C(w,"unarchive"):s.unarchiveSession(w),searchSessions:async(w,L)=>{let I=await Promise.all([s.searchSessions(w,L),...m.filter(E=>E.ready).map(async E=>{let g=await a.remote(E,"search",{query:w});return{...g,items:g.items.map(P=>({...P,sessionId:Se(E,"session",P.sessionId)}))}})]);if(L?.aborted)throw new DOMException("\u641C\u7D22\u5DF2\u53D6\u6D88","AbortError");let k=I.flatMap(E=>E.items);return{items:k.slice(0,s.searchResultLimit),hasMore:k.length>s.searchResultLimit||I.some(E=>E.hasMore)}},renderSlot:(w,L,I)=>{let k=f(L.sessionId);if(!k)return s.renderSlot(r+w,L,I);if(w==="sidebar.workspaces.session.menu.item"){let E=g=>()=>{I?.hookContext?.[1]?.(!1),g()};return(0,U.jsxs)(U.Fragment,{children:[!k.row.archived&&(0,U.jsx)(te.MenuItemButton,{icon:(0,U.jsx)(te.IconPinOutlineRegular,{}),onSelect:E(()=>u(()=>C(L.sessionId,k.row.pinned?"unpin":"pin"))),children:k.row.pinned?"\u53D6\u6D88\u7F6E\u9876":"\u7F6E\u9876\u5BF9\u8BDD"}),(0,U.jsx)(te.MenuItemButton,{icon:(0,U.jsx)(te.IconEditOutlineRegular,{}),onSelect:E(()=>W(L.sessionId,L.displayTitle)),children:"\u91CD\u547D\u540D"}),(0,U.jsx)(te.MenuItemButton,{onSelect:E(()=>u(()=>C(L.sessionId,"session.fork"))),children:"\u521B\u5EFA\u5206\u652F"}),(0,U.jsx)(te.MenuItemButton,{onSelect:E(()=>a.requestHandoff?.(k)),children:"\u4EA4\u63A5\u5DE5\u4F5C\u2026"}),(0,U.jsx)(te.MenuItemButton,{icon:(0,U.jsx)(te.IconArchiveOutlineRegular,{}),onSelect:E(()=>k.row.archived?u(()=>C(L.sessionId,"unarchive")):N(k)),children:k.row.archived?"\u53D6\u6D88\u5F52\u6863":"\u5F52\u6863\u5BF9\u8BDD"})]})}return w==="sidebar.workspaces.session.row.action"&&!k.row.archived?(0,U.jsxs)(U.Fragment,{children:[(0,U.jsx)("button",{className:"dsh-wsl-row-action",title:"\u5F52\u6863\u5BF9\u8BDD","aria-label":"\u5F52\u6863 WSL \u5BF9\u8BDD",onClick:()=>N(k),children:(0,U.jsx)(te.IconArchiveOutlineRegular,{size:14})}),(0,U.jsx)("button",{className:"dsh-wsl-row-action",title:k.row.pinned?"\u53D6\u6D88\u7F6E\u9876":"\u7F6E\u9876\u5BF9\u8BDD","aria-label":k.row.pinned?"\u53D6\u6D88\u7F6E\u9876 WSL \u5BF9\u8BDD":"\u7F6E\u9876 WSL \u5BF9\u8BDD",onClick:()=>u(()=>C(L.sessionId,k.row.pinned?"unpin":"pin")),children:(0,U.jsx)(te.IconPinOutlineRegular,{size:14})})]}):w==="sidebar.session.row.hover"?(0,U.jsxs)("div",{className:"dsh-wsl-caption",children:["WSL \xB7 ",k.entry.settings.distro," \xB7 ",k.entry.settings.user||"\u9ED8\u8BA4\u7528\u6237"]}):null}})}function wt(e,n){let t,r,s=!1,a=()=>{if(!s){s=!0;try{let h=e.slots.entries("sidebar.workspaces").find(u=>u.locale==="workspace"&&u.children?.["sidebar.workspaces.directoryFlow"]),c=n.state?.mode==="windows-host";if(r===h&&!!t==!!c||(t?.(),t=null,r=h,!c||!h))return;let m="dsh-wsl-native.",v=ht(e,h.children,m),p=e.slots.register({name:"sidebar.workspaces",priority:-60,inject:h.inject,store:h.store,locale:h.locale,children:v.declarations},u=>(0,U.jsx)(zt,{...u,Native:h.component,ctx:e,model:n,prefix:m})),f=v.start();t=()=>{f(),p()}}finally{s=!1}}},d=n.subscribe(a),i=e.slots.subscribe("sidebar.workspaces",a);return a(),()=>{d(),i(),t?.()}}var oe=require("react"),G=require("@deepseek-ai/dsh-client-ui-primitives");var ae=require("react"),ge=require("@deepseek-ai/dsh-client-ui-primitives");var T=require("react/jsx-runtime");function ft({model:e,source:n,close:t}){let r=e.conversations,s=(0,ae.useMemo)(()=>[{key:"windows",label:"Windows",entry:null,catalog:r.nativeCatalog()},...[...r.entries.values()].map(g=>({key:g.key,entry:g,catalog:g.catalog,label:`WSL \xB7 ${g.settings.distro}${g.settings.user?" \xB7 "+g.settings.user:""}`}))].filter(g=>g.key!==(n.entry?.key||"windows")),[n,r]),[a,d]=(0,ae.useState)(s[0]?.key||""),[i,h]=(0,ae.useState)(""),[c,m]=(0,ae.useState)(""),[v,p]=(0,ae.useState)(""),[f,u]=(0,ae.useState)(!1),[O,C]=(0,ae.useState)(""),[W,N]=(0,ae.useState)(()=>crypto.randomUUID()),y=s.find(g=>g.key===a),w=et(n,c,v),L=w.length>24e3,I=async()=>{u(!0),C("");try{let g=await r.handoff(n.entry,"handoff.read",{sessionId:n.id});p(g.text)}catch(g){C(g.message)}finally{u(!1)}},k=async g=>{u(!0),C("");try{let[P,o]=JSON.parse(i);await r.handoff(y.entry,"handoff.deliver",{transferId:W,mode:g,text:w,[P==="workspace"?"workspaceId":"sessionId"]:o}),t()}catch(P){C(P.message)}finally{u(!1)}},E=f||!i||!c.trim()&&!v.trim()||L;return(0,T.jsx)(ge.Modal,{open:!0,title:"\u8DE8\u73AF\u5883\u4EA4\u63A5\u5DE5\u4F5C",closeLabel:"\u5173\u95ED\u4EA4\u63A5",onClose:f?()=>{}:t,description:`\u6765\u6E90\uFF1A${n.entry?"WSL \xB7 "+n.entry.settings.distro:"Windows"} \xB7 ${n.row.title||"\u65B0\u5BF9\u8BDD"}`,className:"dsh-wsl-picker",footer:(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(ge.Button,{disabled:f,onClick:t,children:"\u53D6\u6D88"}),(0,T.jsx)(ge.Button,{variant:"outline",disabled:E,onClick:()=>void k("draft"),children:"\u653E\u5165\u76EE\u6807\u8F93\u5165\u6846"}),(0,T.jsx)(ge.Button,{variant:"primary",disabled:E,onClick:()=>void k("send"),children:"\u53D1\u9001\u4EA4\u63A5"})]}),children:(0,T.jsxs)("div",{className:"dsh-wsl-dialog-form",children:[s.length?(0,T.jsxs)(T.Fragment,{children:[(0,T.jsxs)("label",{children:["\u76EE\u6807\u73AF\u5883",(0,T.jsx)("select",{value:a,disabled:f,onChange:g=>{d(g.target.value),h(""),N(crypto.randomUUID())},children:s.map(g=>(0,T.jsx)("option",{value:g.key,children:g.label},g.key))})]}),(0,T.jsxs)("label",{children:["\u4EA4\u7ED9\u54EA\u6761\u5BF9\u8BDD",(0,T.jsxs)("select",{value:i,disabled:f,onChange:g=>{h(g.target.value),N(crypto.randomUUID())},children:[(0,T.jsx)("option",{value:"",children:"\u9009\u62E9\u5DF2\u6709\u5BF9\u8BDD\uFF0C\u6216\u5728\u5DE5\u4F5C\u533A\u4E2D\u65B0\u5EFA"}),(0,T.jsx)("optgroup",{label:"\u65B0\u5EFA\u5BF9\u8BDD",children:(y?.catalog?.workspaces||[]).map(g=>(0,T.jsxs)("option",{value:JSON.stringify(["workspace",g.workspaceId]),children:[g.title||g.path," \xB7 \u65B0\u5BF9\u8BDD"]},g.workspaceId))}),(0,T.jsx)("optgroup",{label:"\u5DF2\u6709\u5BF9\u8BDD",children:(y?.catalog?.rows||[]).filter(g=>!g.archived).map(g=>(0,T.jsxs)("option",{value:JSON.stringify(["session",g.id]),children:[g.title||"\u65B0\u5BF9\u8BDD",g.running?" \xB7 \u8FD0\u884C\u4E2D\uFF0C\u4EA4\u63A5\u5C06\u6392\u961F":""]},g.id))})]})]})]}):(0,T.jsx)("p",{children:"\u5148\u6253\u5F00\u53E6\u4E00\u8FB9\u7684\u73AF\u5883\uFF0C\u518D\u4ECE\u5BF9\u8BDD\u83DC\u5355\u53D1\u8D77\u4EA4\u63A5\u3002"}),(0,T.jsxs)("label",{children:["\u5DE5\u4F5C\u8BF4\u660E",(0,T.jsx)("textarea",{value:c,disabled:f,maxLength:2e4,onChange:g=>m(g.target.value),placeholder:"\u5DF2\u5B8C\u6210\u7684\u5185\u5BB9\u3001\u76F8\u5173\u6587\u4EF6\u3001\u63A5\u4E0B\u6765\u9700\u8981\u505A\u7684\u5DE5\u4F5C\u2026"})]}),(0,T.jsxs)("div",{children:[(0,T.jsx)(ge.Button,{size:"sm",variant:"outline",disabled:f,onClick:()=>void I(),children:"\u5E26\u5165\u6700\u8FD1\u5BF9\u8BDD"}),(0,T.jsx)("span",{className:"dsh-wsl-caption",children:"\u3000\u6700\u591A 8 \u6761\u6587\u5B57\u6D88\u606F\uFF0C\u53EF\u5728\u4E0B\u65B9\u7F16\u8F91"})]}),v&&(0,T.jsxs)("label",{children:["\u5BF9\u8BDD\u6458\u5F55",(0,T.jsx)("textarea",{value:v,disabled:f,onChange:g=>p(g.target.value)})]}),(0,T.jsxs)("details",{children:[(0,T.jsx)("summary",{children:"\u9884\u89C8\u5B8C\u6574\u4EA4\u63A5\u5185\u5BB9"}),(0,T.jsx)("pre",{className:"dsh-wsl-handoff-preview",children:w})]}),(0,T.jsx)("p",{className:"dsh-wsl-caption",children:"\u53D1\u9001\u540E\uFF0C\u8FD0\u884C\u4E2D\u7684\u76EE\u6807\u5BF9\u8BDD\u4F1A\u5C06\u4EA4\u63A5\u6392\u961F\u5904\u7406\u3002\u6765\u6E90\u4EFB\u52A1\u7EE7\u7EED\u8FD0\u884C\uFF0C\u6587\u4EF6\u4FDD\u6301\u539F\u4F4D\u7F6E\u3002"}),L&&(0,T.jsx)("p",{role:"alert",children:"\u5185\u5BB9\u8D85\u8FC7 24,000 \u4E2A\u5B57\u7B26\uFF0C\u8BF7\u7CBE\u7B80\u5DE5\u4F5C\u8BF4\u660E\u6216\u5BF9\u8BDD\u6458\u5F55\u3002"}),O&&(0,T.jsx)("p",{role:"alert",className:"dsh-wsl-inline-error",children:O})]})})}var z=require("react/jsx-runtime");function Dt({model:e,api:n,close:t}){let r=e.conversations,[s,a]=(0,oe.useState)(()=>ue(r.entries.get(r.activeKey)?.settings||e.state?.settings||{},e.state?.distros)),[d,i]=(0,oe.useState)(!1),[h,c]=(0,oe.useState)(!1),[m,v]=(0,oe.useState)(""),p=async f=>{i(!1),a(u=>({...u,directory:f})),c(!0),v(""),await r.enter({...s,directory:f},{create:!0}),c(!1),r.error?v(r.error):t()};return d?(0,z.jsx)(We,{api:n,distro:s.distro,user:s.user,initialPath:s.directory,allowCreate:!0,onClose:()=>i(!1),onSelect:p}):(0,z.jsx)(G.Modal,{open:!0,onClose:h?()=>{}:t,title:"\u65B0\u5EFA WSL \u5DE5\u4F5C\u533A",closeLabel:"\u5173\u95ED",description:"\u9009\u62E9 Linux \u6587\u4EF6\u5939\uFF0C\u6216\u5728\u6D4F\u89C8\u76EE\u5F55\u65F6\u65B0\u5EFA\u6587\u4EF6\u5939\u3002",className:"dsh-wsl-picker",footer:(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(G.Button,{disabled:h,onClick:t,children:"\u53D6\u6D88"}),(0,z.jsx)(G.Button,{variant:"primary",disabled:h||!s.distro||!s.directory.trim(),onClick:()=>void p(s.directory.trim()),children:h?"\u6B63\u5728\u6253\u5F00\u2026":"\u521B\u5EFA\u5DE5\u4F5C\u533A"})]}),children:(0,z.jsxs)("div",{className:"dsh-wsl-dialog-form",children:[(0,z.jsxs)("label",{children:["Linux \u53D1\u884C\u7248",(0,z.jsx)("select",{value:s.distro,disabled:h,onChange:f=>a({distro:f.target.value,user:"",directory:""}),children:(e.state?.distros||[]).map(f=>(0,z.jsx)("option",{children:f.name},f.name))})]}),(0,z.jsxs)("label",{children:["Linux \u7528\u6237",(0,z.jsx)(G.Input,{value:s.user,disabled:h,placeholder:"\u9ED8\u8BA4\u7528\u6237",onChange:f=>a({...s,user:f.target.value})})]}),(0,z.jsxs)("label",{children:["\u5DE5\u4F5C\u533A\u6587\u4EF6\u5939",(0,z.jsxs)("div",{className:"dsh-wsl-pathbar",children:[(0,z.jsx)(G.Input,{value:s.directory,disabled:h,placeholder:"/home/\u7528\u6237\u540D/\u9879\u76EE",onChange:f=>a({...s,directory:f.target.value})}),(0,z.jsx)(G.Button,{variant:"outline",disabled:h||!s.distro,onClick:()=>i(!0),children:"\u6D4F\u89C8\u2026"})]})]}),(0,z.jsx)("p",{className:"dsh-wsl-caption",children:"\u5DE5\u4F5C\u533A\u4F1A\u52A0\u5165\u5F53\u524D\u7A97\u53E3\u7684\u539F\u751F\u5217\u8868\uFF0C\u5E76\u663E\u793A WSL \u6807\u5FD7\u3002"}),m&&(0,z.jsx)("div",{role:"alert",className:"dsh-wsl-inline-error",children:m})]})})}function Pt({model:e,target:n,close:t}){let[r,s]=(0,oe.useState)(n.title||n.row.title),[a,d]=(0,oe.useState)(!1),[i,h]=(0,oe.useState)(""),c=async()=>{d(!0),h("");try{await e.conversations.remote(n.entry,"session.rename",{sessionId:n.id,title:r}),t()}catch(m){h(m.message)}finally{d(!1)}};return(0,z.jsx)(G.Modal,{open:!0,onClose:a?()=>{}:t,title:"\u91CD\u547D\u540D WSL \u5BF9\u8BDD",closeLabel:"\u5173\u95ED",footer:(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(G.Button,{disabled:a,onClick:t,children:"\u53D6\u6D88"}),(0,z.jsx)(G.Button,{variant:"primary",disabled:a||!r.trim(),onClick:()=>void c(),children:"\u4FDD\u5B58"})]}),children:(0,z.jsxs)("form",{className:"dsh-wsl-dialog-form",onSubmit:m=>{m.preventDefault(),!a&&r.trim()&&c()},children:[(0,z.jsx)(G.Input,{"data-modal-autofocus":!0,value:r,maxLength:500,"aria-label":"\u5BF9\u8BDD\u540D\u79F0",onChange:m=>s(m.target.value)}),i&&(0,z.jsx)("div",{role:"alert",children:i})]})})}function Tt({model:e,target:n,close:t}){let[r,s]=(0,oe.useState)(!1),[a,d]=(0,oe.useState)(""),i=async()=>{s(!0);try{await e.conversations.remote(n.entry,"archive",{sessionId:n.id,stopActivity:!0}),t()}catch(h){d(h.message)}finally{s(!1)}};return(0,z.jsx)(G.Modal,{open:!0,title:"\u5F52\u6863\u6B63\u5728\u8FD0\u884C\u7684 WSL \u5BF9\u8BDD",closeLabel:"\u5173\u95ED",onClose:r?()=>{}:t,description:"\u5F52\u6863\u4F1A\u505C\u6B62\u8FD9\u6761\u5BF9\u8BDD\u7684\u8FD0\u884C\u4EFB\u52A1\uFF0C\u5386\u53F2\u8BB0\u5F55\u4FDD\u7559\u3002",footer:(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(G.Button,{disabled:r,onClick:t,children:"\u53D6\u6D88"}),(0,z.jsx)(G.Button,{disabled:r,onClick:()=>void i(),children:"\u505C\u6B62\u5E76\u5F52\u6863"})]}),children:a&&(0,z.jsx)("p",{role:"alert",children:a})})}function gt({model:e,api:n}){re(e);let t=e.conversations.dialog,r=()=>{e.conversations.dialog=null,e.emit()};return t?t.type==="workspace"?(0,z.jsx)(Dt,{model:e,api:n,close:r}):t.type==="rename"?(0,z.jsx)(Pt,{model:e,target:t.target,close:r}):t.type==="archive"?(0,z.jsx)(Tt,{model:e,target:t.target,close:r}):t.type==="handoff"?(0,z.jsx)(ft,{model:e,source:t.source,close:r}):null:e.conversations.error&&!e.conversations.visible()?(0,z.jsxs)("div",{role:"alert",className:"dsh-wsl-operation-error",children:[(0,z.jsx)("span",{children:e.conversations.error}),(0,z.jsx)(G.Button,{variant:"ghost","aria-label":"\u5173\u95ED\u9519\u8BEF\u63D0\u793A",onClick:()=>{e.conversations.error=null,e.emit()},children:"\xD7"})]}):null}var M=require("react/jsx-runtime");function $t({ctx:e,sessionId:n,useStore:t,actions:r}){let s=t(d=>d.draft),a=(0,Z.useRef)(s);return a.current=s,(0,Z.useEffect)(()=>Ye(e,n,{getDraft:()=>a.current,setDraft:d=>{a.current=d,r.setDraft(d)}}),[e,n,r]),null}function mt({distro:e,connected:n=!0}){return(0,M.jsxs)("span",{className:`dsh-wsl-chat-mark${n?"":" is-offline"}`,title:`WSL \xB7 ${e||"Linux"}`,children:[(0,M.jsx)(le,{size:12}),"WSL"]})}function jt({ctx:e,model:n}){re(n);let t=(0,Z.useRef)(null),r=n.conversations,s=r.entries.get(r.activeKey)?.ready;return(0,Z.useLayoutEffect)(()=>(r.setAnchor(t.current),()=>r.setAnchor(null)),[r]),(0,M.jsx)("div",{className:"dsh-wsl-chat-target",ref:t,children:!s&&(0,M.jsxs)("div",{className:"dsh-wsl-chat-loading",children:[(0,M.jsx)(X.StateDot,{state:"ongoing"}),"\u6B63\u5728\u8FDE\u63A5 WSL \u5BF9\u8BDD\u2026",(0,M.jsx)(X.Button,{variant:"ghost",onClick:()=>e.layout.selectPanel("dsh-wsl-native"),children:"\u67E5\u770B\u73AF\u5883"}),(0,M.jsx)(X.Button,{variant:"ghost",onClick:()=>r.showWindows(),children:"\u8FD4\u56DE Windows \u5BF9\u8BDD"})]})})}function qt({entry:e,model:n,visible:t}){let r=(0,Z.useRef)(null);return(0,Z.useEffect)(()=>{let s=n.conversations,a=ot({host:r.current,entry:e,bridge:window.dshDesktop?.browser,onMessage:d=>s.desktopMessage(e,d),onError:d=>s.desktopError(e,d)});return e.desktop=a,()=>{a.dispose(),e.desktop===a&&(e.desktop=null)}},[e,n]),(0,M.jsx)("div",{className:"dsh-wsl-desktop-surface",ref:r,inert:!t||!!e.navigating,style:{visibility:t&&e.ready?"visible":"hidden"}})}function Ht({entry:e,model:n,visible:t,rect:r,ctx:s}){let a=n.conversations,[d,i]=(0,Z.useState)(!1);(0,Z.useEffect)(()=>{let c=setTimeout(()=>i(!0),45e3);return()=>clearTimeout(c)},[e.channel]);let h=e.catalog?.rows.find(c=>c.id===e.catalog.selectedId);return(0,M.jsxs)("section",{className:"dsh-wsl-resident","aria-label":`WSL \xB7 ${e.settings.distro} \u5BF9\u8BDD`,"aria-hidden":!t,inert:!t,style:t&&r?{top:r.top,left:r.left,width:r.width,height:r.height}:{visibility:"hidden",left:-2e4,top:0,width:r?.width||1e3,height:r?.height||800},children:[(0,M.jsxs)("header",{className:"dsh-wsl-chat-toolbar",children:[(0,M.jsx)(X.Button,{variant:"ghost",icon:(0,M.jsx)(X.IconPanelLeftOutlineRegular,{}),"aria-label":"\u5C55\u5F00\u6216\u6536\u8D77\u5BF9\u8BDD\u5217\u8868",title:"\u5C55\u5F00\u6216\u6536\u8D77\u5BF9\u8BDD\u5217\u8868",onClick:()=>s.layout.toggleSidebar()}),(0,M.jsx)(mt,{distro:e.settings.distro,connected:e.catalog?.connected}),(0,M.jsxs)("span",{className:"dsh-wsl-chat-context",title:h?.cwd||e.settings.directory,children:[e.settings.distro,(0,M.jsxs)("span",{children:[" \xB7 ",h?.cwd?.split("/").filter(Boolean).at(-1)||"Linux"]})]}),(0,M.jsxs)("div",{className:"dsh-wsl-chat-toolbar-actions",children:[(0,M.jsx)(X.Button,{variant:"ghost",disabled:!e.ready||a.busy,onClick:()=>void a.newLinux(e),children:"\u65B0\u5BF9\u8BDD"}),(0,M.jsx)(X.Button,{variant:"ghost",disabled:!e.ready||!h,onClick:()=>a.requestHandoff({entry:e,id:h.id,row:h}),children:"\u4EA4\u63A5\u5DE5\u4F5C"}),(0,M.jsx)(X.Button,{variant:"ghost",disabled:!e.ready,title:"\u7BA1\u7406 Linux \u63D2\u4EF6\u4E0E\u914D\u7F6E",onClick:()=>a.toggleChrome(e),children:e.configOpen?"\u8FD4\u56DE\u5BF9\u8BDD":"Linux \u914D\u7F6E"})]})]}),a.error&&t&&(0,M.jsx)("div",{role:"alert",className:"dsh-wsl-chat-notice",children:a.error}),e.ready&&!e.catalog?.connected&&(0,M.jsxs)("div",{role:"status",className:"dsh-wsl-chat-notice",children:["WSL \u8FDE\u63A5\u5DF2\u4E2D\u65AD\uFF0C\u6062\u590D\u8FDE\u63A5\u540E\u53EF\u7EE7\u7EED\u4F7F\u7528\u3002",(0,M.jsx)(X.Button,{variant:"ghost",disabled:a.busy,onClick:()=>a.reconnect(e),children:"\u91CD\u65B0\u8FDE\u63A5"})]}),(0,M.jsxs)("div",{className:"dsh-wsl-chat-frame-body",children:[e.transport==="desktop"?(0,M.jsx)(qt,{entry:e,model:n,visible:t}):(0,M.jsx)("iframe",{title:`WSL ${e.settings.distro} \u539F\u751F DSH \u5BF9\u8BDD`,src:e.url,ref:c=>a.bind(e,c),inert:!t||!!e.navigating,referrerPolicy:"no-referrer",allow:"clipboard-read; clipboard-write",style:{visibility:t&&e.ready?"visible":"hidden"}},e.channel),!e.ready&&(0,M.jsxs)("div",{className:"dsh-wsl-chat-loading",children:[(0,M.jsx)(X.StateDot,{state:"ongoing"}),(0,M.jsx)("span",{children:d?"WSL \u5BF9\u8BDD\u5C1A\u672A\u8FDE\u63A5\u3002\u53EF\u4EE5\u91CD\u65B0\u8FDE\u63A5\uFF0C\u6216\u67E5\u770B\u73AF\u5883\u4E2D\u7684\u542F\u52A8\u72B6\u6001\u3002":"\u6B63\u5728\u6253\u5F00 Linux \u5BF9\u8BDD\u2026"}),d&&(0,M.jsx)(X.Button,{onClick:()=>a.reconnect(e),children:"\u91CD\u65B0\u8FDE\u63A5"}),(0,M.jsx)(X.Button,{variant:"ghost",onClick:()=>a.showWindows(),children:"\u8FD4\u56DE Windows"})]})]})]})}function Ut({ctx:e,model:n}){re(n);let[t,r]=(0,Z.useState)(null),s=n.conversations,a=s?.visible(),d=s?.anchor;return(0,Z.useLayoutEffect)(()=>{if(!d)return;let i,h=()=>{cancelAnimationFrame(i),i=requestAnimationFrame(()=>{let m=d.getBoundingClientRect();r({top:m.top,left:m.left,width:Math.max(0,document.documentElement.clientWidth-m.left),height:m.height})})},c=new ResizeObserver(h);return c.observe(d),window.addEventListener("resize",h),h(),()=>{c.disconnect(),window.removeEventListener("resize",h),cancelAnimationFrame(i)}},[d]),(0,Z.useEffect)(()=>(document.documentElement.toggleAttribute("data-dsh-wsl-conversation",!!a),()=>document.documentElement.removeAttribute("data-dsh-wsl-conversation")),[a]),n.state?.mode!=="windows-host"||!s?null:(0,M.jsx)(M.Fragment,{children:[...s.entries.values()].filter(i=>i.url).map(i=>(0,M.jsx)(Ht,{entry:i,model:n,ctx:e,visible:!!a&&!!d&&s.activeKey===i.key,rect:t},i.key+i.channel))})}function _t({model:e}){re(e);let n=(0,Z.useRef)(null),t=e.guest?.compact===!0;return(0,Z.useLayoutEffect)(()=>{let r=n.current?.closest("[data-shell-overlay]")?.parentElement;if(!r||!e.guest)return;let a=r.querySelector(":scope > [data-rightbar-col]")?.previousElementSibling,d=a?.previousElementSibling;d?.setAttribute("data-dsh-wsl-guest-sidebar",""),a?.setAttribute("data-dsh-wsl-guest-center",""),r.toggleAttribute("data-dsh-wsl-embedded",t);let i=()=>{let m=/minmax\(0px,\s*([\d.]+px)\)\s*$/.exec(r.style.gridTemplateColumns)?.[1]||"0px";r.style.getPropertyValue("--dsh-wsl-right-track")!==m&&r.style.setProperty("--dsh-wsl-right-track",m)},h=new MutationObserver(i);return h.observe(r,{attributes:!0,attributeFilter:["style"]}),i(),()=>{h.disconnect(),r.removeAttribute("data-dsh-wsl-embedded"),r.style.removeProperty("--dsh-wsl-right-track"),d?.removeAttribute("data-dsh-wsl-guest-sidebar"),a?.removeAttribute("data-dsh-wsl-guest-center")}},[e.guest,t]),(0,M.jsx)("span",{ref:n})}function vt(e,n,t){e.slots.inject("conversation.input.dock",()=>{let r=e.slots.entries("conversation.session").find(s=>s.store?.spec?.persist==="dsh.conversation");if(r)return e.slots.register({name:"conversation.input.dock",id:"dsh-wsl-handoff-draft",store:r.store},s=>(0,M.jsx)($t,{...s,ctx:e}))}),e.effect(()=>dt(e,n)),e.effect(()=>wt(e,n)),e.slots.inject("sidebar.workspaces.session.menu.item",()=>e.slots.register({name:"sidebar.workspaces.session.menu.item",id:"dsh-wsl-handoff",order:350},r=>{let[,s]=r.useMenuOpenState();return n.state?.mode!=="windows-host"||n.guest?null:(0,M.jsx)(X.MenuItemButton,{onSelect:()=>{s(!1);let a=n.conversations.nativeCatalog().rows.find(d=>d.id===r.sessionId);a&&n.conversations.requestHandoff({id:a.id,row:a})},children:"\u4EA4\u63A5\u5DE5\u4F5C\u2026"})})),e.slots.inject("main",()=>e.slots.register({name:"main",key:ce},()=>(0,M.jsx)(jt,{ctx:e,model:n}))),e.slots.inject("shell.overlay",()=>e.slots.register({name:"shell.overlay",id:"dsh-wsl-conversations",order:15},()=>(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(Ut,{ctx:e,model:n}),(0,M.jsx)(_t,{model:n}),(0,M.jsx)(gt,{model:n,api:t,ctx:e})]}))),e.slots.inject("sidebar.workspaces",()=>{let r,s=()=>{let d=n.state?.mode==="windows-host"&&!!Q(location.origin)&&n.conversations?.unified;d&&!r?r=e.slots.register({name:"sidebar.workspaces",priority:-80},i=>(0,M.jsx)(lt,{...i,ctx:e,model:n})):!d&&r&&(r(),r=null)},a=n.subscribe(s);return s(),()=>{a(),r?.()}}),e.slots.inject("conversation.session.header.actions",()=>e.slots.register({name:"conversation.session.header.actions",id:"dsh-wsl-environment",order:5},()=>(re(n),n.state?.mode==="wsl-host"&&!n.guest?(0,M.jsx)(mt,{distro:n.state.settings.distro}):null)))}var bt=require("react/jsx-runtime"),He="dsh-wsl-native",Vt="dsh-wsl-native-client",Ft=["connection","slots","layout","workspaces","uiWorkspace","sessions"];function Jt(e){let n=async(r,s={})=>{let a=await e.connection.rpc.call("/api",`${He}/${r}`,s);if(!a.ok)throw Object.assign(new Error(a.error?.message||"\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\u3002"),{code:a.error?.code});return a.value},t=nt(e,n);t.conversations=at(e,n,t),vt(e,t,n),e.effect(()=>()=>t.dispose()),e.effect(()=>{let r=document.createElement("style");return r.dataset.dshWslNative="",r.textContent=Ue,document.head.append(r),()=>r.remove()}),e.slots.inject("main",()=>e.slots.register({name:"main",key:He},()=>(0,bt.jsx)(it,{api:n,ctx:e,model:t}))),e.slots.inject("sidebar.panellist",()=>e.slots.register({name:"sidebar.panellist",id:He,order:20,label:()=>"WSL \u4E0E Windows"},le))}

return module.exports;}});
