window.__ModuleLoader__.load({id:"dsh-wsl-native",factory:(require)=>{const module={exports:{}};const exports=module.exports;
"use strict";var Be=Object.defineProperty;var mt=Object.getOwnPropertyDescriptor;var vt=Object.getOwnPropertyNames;var bt=Object.prototype.hasOwnProperty;var xt=(e,n)=>{for(var t in n)Be(e,t,{get:n[t],enumerable:!0})},yt=(e,n,t,r)=>{if(n&&typeof n=="object"||typeof n=="function")for(let s of vt(n))!bt.call(e,s)&&s!==t&&Be(e,s,{get:()=>n[s],enumerable:!(r=mt(n,s))||r.enumerable});return e};var kt=e=>yt(Be({},"__esModule",{value:!0}),e);var _t={};xt(_t,{apply:()=>Ut,inject:()=>Ht,name:()=>qt});module.exports=kt(_t);var pn=require("react");var qe=`.dsh-wsl-conversations { position:relative; display:flex; flex-direction:column; gap:4px; min-height:0; height:100%; padding:0 6px; color:var(--dsw-alias-label-primary); font:13px/1.5 var(--dsw-font-family); }\r
.dsh-wsl-compact-heading { display:flex; align-items:center; gap:2px; min-height:32px; flex:none; color:var(--dsw-alias-label-tertiary); }\r
.dsh-wsl-compact-heading > span { padding-left:4px; white-space:nowrap; }\r
.dsh-wsl-heading-actions { display:flex; margin-left:auto; }\r
.dsh-wsl-icon-button { display:inline-flex; align-items:center; justify-content:center; width:26px; height:26px; padding:0; border:0; border-radius:6px; flex:none; color:var(--dsw-alias-label-secondary); background:transparent; cursor:pointer; }\r
.dsh-wsl-icon-button:hover, .dsh-wsl-icon-button[aria-expanded=true] { background:var(--dsw-alias-interactive-bg-hover); }\r
.dsh-wsl-icon-button:focus-visible { outline:2px solid var(--dsw-alias-state-business-primary); outline-offset:-2px; }\r
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
`;var se=require("react"),j=require("@deepseek-ai/dsh-client-ui-primitives"),A=require("react/jsx-runtime");function le({size:e=20}){return(0,A.jsxs)("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.35",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:[(0,A.jsx)("rect",{x:"3",y:"4.5",width:"18",height:"15",rx:"3"}),(0,A.jsx)("path",{d:"m7 9 3 3-3 3m6 0h4"})]})}function Me({size:e=20}){return(0,A.jsxs)("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.35",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:[(0,A.jsx)("rect",{x:"3",y:"4",width:"18",height:"13",rx:"2.5"}),(0,A.jsx)("path",{d:"M8 21h8m-4-4v4"})]})}function me({size:e=16}){return(0,A.jsx)("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:(0,A.jsx)("path",{d:"M14 4h6v6m0-6L10 14m0-10H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4"})})}function Le({state:e="idle",children:n}){return(0,A.jsxs)("span",{className:"dsh-wsl-badge",children:[(0,A.jsx)(j.StateDot,{state:e,size:e==="ongoing"?12:7}),n]})}function ue(e,n=[]){return{distro:e.distro||n.find(t=>t.isDefault)?.name||n[0]?.name||"",user:e.user||"",directory:e.directory||""}}var It=e=>e.replace(/\/+$/,"").replace(/\/[^/]*$/,"")||"/",Lt=(e,n)=>`${e.replace(/\/+$/,"")}/${n}`;function Re(e){return/ENOENT/.test(e.message)?"\u627E\u4E0D\u5230\u8FD9\u4E2A\u6587\u4EF6\u5939\uFF0C\u8BF7\u68C0\u67E5\u8DEF\u5F84\u540E\u91CD\u8BD5\u3002":/EACCES|EPERM/.test(e.message)?"\u5F53\u524D Linux \u7528\u6237\u6CA1\u6709\u6743\u9650\u8BFB\u53D6\u8FD9\u4E2A\u6587\u4EF6\u5939\u3002":/ENOTDIR/.test(e.message)?"\u8FD9\u4E2A\u8DEF\u5F84\u6307\u5411\u6587\u4EF6\uFF0C\u8BF7\u9009\u62E9\u4E00\u4E2A\u6587\u4EF6\u5939\u3002":e.message}function Ne({api:e,distro:n,user:t,initialPath:r,onClose:s,onSelect:a,allowCreate:d=!1}){let[i,w]=(0,se.useState)(null),[c,m]=(0,se.useState)(r),[v,u]=(0,se.useState)(!1),[h,p]=(0,se.useState)(!1),[E,W]=(0,se.useState)(""),[C,N]=(0,se.useState)(null),x=(0,se.useRef)(0),f=(0,se.useCallback)(async(y,O=0,g=!1)=>{let P=++x.current;p(!0),W("");try{let o=y?null:await e("connect",{distro:n,user:t}),k=await e("browse",{distro:n,user:t,path:y||o.home,offset:O,hidden:g});if(P!==x.current)return;w(L=>({...k,entries:O?[...L?.entries||[],...k.entries]:k.entries})),m(k.path)}catch(o){P===x.current&&W(Re(o))}finally{P===x.current&&p(!1)}},[e,n,t]);(0,se.useEffect)(()=>(f(r),()=>{x.current++}),[f,r]);let I=(i?.entries||[]).filter(y=>y.type==="directory"||y.type==="symlink").sort((y,O)=>y.name.localeCompare(O.name,"zh-CN",{numeric:!0})),S=y=>{f(y,0,v)};return(0,A.jsxs)(j.Modal,{open:!0,onClose:s,title:"\u9009\u62E9 Linux \u6587\u4EF6\u5939",closeLabel:"\u5173\u95ED\u6587\u4EF6\u5939\u9009\u62E9",description:`${n} \u4E2D\u7684 Linux \u6587\u4EF6\u5939\u3002`,className:"dsh-wsl-picker",contentClassName:"dsh-wsl-picker-content",footer:(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(j.Button,{onClick:s,children:"\u53D6\u6D88"}),(0,A.jsx)(j.Button,{variant:"primary",disabled:h||!i||!!E||c!==i.path,onClick:()=>a(i.path),children:"\u9009\u62E9\u6B64\u6587\u4EF6\u5939"})]}),children:[(0,A.jsxs)("form",{className:"dsh-wsl-pathbar",onSubmit:y=>{y.preventDefault(),S(c)},children:[(0,A.jsx)(j.Button,{variant:"outline",title:"\u8FD4\u56DE\u4E0A\u7EA7","aria-label":"\u8FD4\u56DE\u4E0A\u7EA7",disabled:h||!i||i.path==="/",icon:(0,A.jsx)(j.IconChevronLeftOutlineMedium,{}),onClick:()=>S(It(i.path))}),(0,A.jsx)(j.Input,{"aria-label":"\u6587\u4EF6\u5939\u8DEF\u5F84","data-modal-autofocus":!0,value:c,onChange:y=>m(y.target.value),spellCheck:!1,className:"dsh-wsl-pathinput",placeholder:"/home"}),(0,A.jsx)(j.Button,{variant:"outline",type:"submit",disabled:h||!c.trim(),children:"\u524D\u5F80"})]}),(0,A.jsxs)("div",{className:"dsh-wsl-folder-meta",children:[(0,A.jsxs)("span",{children:[I.length," \u4E2A\u6587\u4EF6\u5939",i?.nextOffset!=null?" \xB7 \u8FD8\u6709\u66F4\u591A":""]}),(0,A.jsxs)("label",{children:[(0,A.jsx)("input",{type:"checkbox",checked:v,disabled:h,onChange:y=>{let O=y.target.checked;u(O),f(i?.path||c,0,O)}}),"\u663E\u793A\u9690\u85CF\u9879"]})]}),d&&(0,A.jsx)("div",{className:"dsh-wsl-folder-create",children:C===null?(0,A.jsx)(j.Button,{size:"sm",variant:"ghost",disabled:h||!i||!!E,onClick:()=>N(""),children:"\uFF0B \u65B0\u5EFA\u6587\u4EF6\u5939"}):(0,A.jsxs)("form",{className:"dsh-wsl-pathbar",onSubmit:async y=>{if(y.preventDefault(),!(h||!C.trim())){p(!0),W("");try{let O=await e("directory/create",{distro:n,user:t,parent:i.path,name:C.trim()});N(null),await f(O.path,0,v)}catch(O){W(O.message),p(!1)}}},children:[(0,A.jsx)(j.Input,{"aria-label":"\u65B0\u6587\u4EF6\u5939\u540D\u79F0",value:C,placeholder:"\u6587\u4EF6\u5939\u540D\u79F0",maxLength:255,onChange:y=>N(y.target.value)}),(0,A.jsx)(j.Button,{type:"submit",disabled:h||!C.trim(),children:"\u521B\u5EFA"}),(0,A.jsx)(j.Button,{disabled:h,onClick:()=>N(null),children:"\u53D6\u6D88"})]})}),(0,A.jsxs)("div",{className:"dsh-wsl-folder-list","aria-label":"\u6587\u4EF6\u5939\u5217\u8868","aria-busy":h,children:[E&&(0,A.jsxs)("div",{className:"dsh-wsl-inline-error",role:"alert",children:[E,(0,A.jsx)(j.Button,{size:"sm",onClick:()=>S(c),children:"\u91CD\u8BD5"})]}),!E&&I.map(y=>(0,A.jsxs)("button",{type:"button",className:"dsh-wsl-folder",disabled:h,onClick:()=>S(Lt(i.path,y.name)),children:[(0,A.jsx)(j.IconFolderCloseRegular,{size:18}),(0,A.jsx)("span",{children:y.name}),y.type==="symlink"&&(0,A.jsx)("small",{children:"\u94FE\u63A5"}),(0,A.jsx)(j.IconChevronRightOutlineRegular,{size:14})]},y.name)),h&&(0,A.jsxs)("div",{className:"dsh-wsl-empty",role:"status",children:[(0,A.jsx)(j.StateDot,{state:"ongoing"}),"\u6B63\u5728\u8BFB\u53D6\u6587\u4EF6\u5939\u2026"]}),!h&&!E&&!I.length&&(0,A.jsxs)("div",{className:"dsh-wsl-empty",children:[(0,A.jsx)(j.IconFolderOpenOutlineRegular,{size:28}),(0,A.jsx)("span",{children:i?.nextOffset!=null?"\u8FD9\u6279\u6761\u76EE\u4E2D\u6CA1\u6709\u6587\u4EF6\u5939":"\u6B64\u76EE\u5F55\u4E0B\u6CA1\u6709\u53EF\u663E\u793A\u7684\u6587\u4EF6\u5939"})]}),!h&&!E&&i?.nextOffset!=null&&(0,A.jsx)(j.Button,{className:"dsh-wsl-load-more",onClick:()=>f(i.path,i.nextOffset,v),children:"\u52A0\u8F7D\u66F4\u591A"})]}),(0,A.jsxs)("p",{className:"dsh-wsl-picker-hint",children:[i?.path||"\u9009\u62E9\u4E00\u4E2A\u76EE\u5F55",c!==i?.path&&i?" \xB7 \u70B9\u51FB\u201C\u524D\u5F80\u201D\u67E5\u770B\u8F93\u5165\u7684\u8DEF\u5F84":""]})]})}var _=require("react"),D=require("@deepseek-ai/dsh-client-ui-primitives");var de="dsh-app://app";function Q(e){return e===de||e===de+"/"?de:he(e)}function ze(e){return Q(e)===de?"dsh://open":he(e)}function he(e){if(!e)return null;try{let n=new URL(e);return!["http:","https:"].includes(n.protocol)||!["127.0.0.1","localhost","[::1]"].includes(n.hostname)||n.username||n.password||n.search||n.hash||n.pathname!=="/"?null:n.origin}catch{return null}}function we(e){if(!e?.startsWith("#dsh-wsl=")||e.length>16e3)return null;try{let n=JSON.parse(decodeURIComponent(e.slice(9)));return typeof n.id!="string"||n.id.length>100||typeof n.distro!="string"||typeof n.user!="string"||typeof n.directory!="string"||!n.directory.startsWith("/")||/[\x00-\x1f]/.test(n.directory)?null:{id:n.id,distro:n.distro,user:n.user,directory:n.directory,parentOrigin:Q(n.parentOrigin),...n.proof?{issuedAt:n.issuedAt,proof:n.proof}:{}}}catch{return null}}var ve="dsh-wsl-conversation/1",ce="dsh-wsl-conversation",De=/^[a-zA-Z0-9-]{32,64}$/,pe=(e,n)=>typeof e=="string"?e.slice(0,n):"";function We(e){return JSON.stringify([e.distro||"",e.user||""])}function He(e,n,t){let r=new URL(e),s=we(r.hash);if(!he(r.origin)||!Q(t)||!De.test(n)||!s?.proof||s.parentOrigin!==Q(t))throw new Error("\u65E0\u6CD5\u9A8C\u8BC1\u540C\u7A97\u53E3\u5BF9\u8BDD\u7684\u76EE\u6807\u5730\u5740\uFF0C\u8BF7\u91CD\u65B0\u8FDB\u5165 Linux\u3002");let a=JSON.parse(decodeURIComponent(r.hash.slice(9))),d={channel:n,...Q(t)===de?{transport:"desktop"}:{}};return r.hash="dsh-wsl="+encodeURIComponent(JSON.stringify({...a,embed:d})),r.href}function Ue(e){let n=we(e);if(!n?.proof||!n.parentOrigin)return null;try{let{embed:t}=JSON.parse(decodeURIComponent(e.slice(9)));return!De.test(t?.channel||"")||t.transport!==void 0&&(t.transport!=="desktop"||n.parentOrigin!==de)?null:{channel:t.channel,parentOrigin:n.parentOrigin,...t.transport?{transport:t.transport}:{}}}catch{return null}}function Ce(e,{origin:n,source:t,channel:r}){return!!t&&e.source===t&&e.origin===n&&!!he(n)&&De.test(r||"")&&e.data?.protocol===ve&&e.data.channel===r&&["catalog","request","result","return","sidebar"].includes(e.data.type)}function be(e){if(!e||!Array.isArray(e.rows)||e.rows.length>5e3)return null;let n=new Set,t=[];for(let a of e.rows)!a||typeof a.id!="string"||!a.id||a.id.length>200||n.has(a.id)||(n.add(a.id),t.push({id:a.id,title:pe(a.title,500),cwd:pe(a.cwd,4096),workspaceId:pe(a.workspaceId,200),workspaceTitle:pe(a.workspaceTitle,500),running:a.running===!0,blank:a.blank===!0,pinned:a.pinned===!0,archived:a.archived===!0,updatedAt:Number.isFinite(a.updatedAt)?a.updatedAt:0}));let r=new Set,s=[];for(let a of(Array.isArray(e.workspaces)?e.workspaces:[]).slice(0,2048))!a||typeof a.workspaceId!="string"||!a.workspaceId||a.workspaceId.length>200||r.has(a.workspaceId)||(r.add(a.workspaceId),s.push({workspaceId:a.workspaceId,path:pe(a.path,4096),title:pe(a.title,500),sessionIds:[...new Set((Array.isArray(a.sessionIds)?a.sessionIds:[]).filter(d=>n.has(d)))],createdAt:pe(a.createdAt,100),updatedAt:pe(a.updatedAt,100)}));for(let a of t)a.workspaceId&&!r.has(a.workspaceId)&&(r.add(a.workspaceId),s.push({workspaceId:a.workspaceId,path:a.cwd,title:a.workspaceTitle,sessionIds:t.filter(d=>d.workspaceId===a.workspaceId).map(d=>d.id),createdAt:"",updatedAt:""}));return{rows:t,workspaces:s,selectedId:t.some(a=>a.id===e.selectedId)?e.selectedId:null,connected:e.connected===!0,phase:e.phase==="ready"?"ready":"loading"}}function xe(e){let n=e.sessions.list.getSnapshot(),t=e.workspaces.list.getSnapshot(),r=new Map;for(let i of t.items||[])for(let w of i.sessionIds)r.set(w,i);let s=new Set(t.archivedSessionIds||[]),a=new Set(t.pinnedSessionIds||[]),d=n.ids.map(i=>n.byId[i]).filter(i=>i&&!i.parentId).slice(0,5e3);return be({phase:n.phase,connected:e.connection.state.getSnapshot()==="connected",workspaces:t.items,selectedId:d.find(i=>i.retainedBy?.mainView>0)?.id,rows:d.map(i=>({id:i.id,title:i.title||(i.blank?"\u65B0\u5BF9\u8BDD":i.displayTitle),cwd:i.cwd,workspaceId:r.get(i.id)?.workspaceId,workspaceTitle:r.get(i.id)?.title||"",running:i.running,blank:i.blank,updatedAt:i.updatedAt,archived:s.has(i.id),pinned:a.has(i.id)}))})}function Pe(e,n,{filter:t="all",query:r="",archived:s=!1}={}){let a=(e?.rows||[]).map(i=>({...i,environment:null,key:JSON.stringify(["windows",i.id])}));for(let i of n)for(let w of i.catalog?.rows||[])a.push({...w,environment:i,key:JSON.stringify(["wsl",i.key,w.id])});let d=r.trim().toLocaleLowerCase();return a.filter(i=>i.archived===s&&(t==="all"||t==="wsl"==!!i.environment)&&(!d||[i.title,i.cwd,i.environment?.settings.distro].join(" ").toLocaleLowerCase().includes(d))).sort((i,w)=>Number(w.pinned)-Number(i.pinned)||w.updatedAt-i.updatedAt||i.key.localeCompare(w.key))}var Nt=["workspace.start","workspace.rename","workspace.delete","workspace.reorder","session.rename","session.fork","search"],Je=new Set(["refresh","theme","chrome","navigate","pin","unpin","archive","unarchive","handoff.read","handoff.deliver",...Nt]);function _e(e){if(typeof e!="string"||!e.trim()||e.length>500||/[\x00-\x1f]/.test(e))throw new Error("\u540D\u79F0\u5FC5\u987B\u662F 1\u2013500 \u4E2A\u5B57\u7B26\u3002");return e.trim()}async function Ve(e,n,t){if(n==="search"){if(typeof t.query!="string"||t.query.length>2e3)throw new Error("\u641C\u7D22\u6587\u5B57\u8FC7\u957F\u3002");let s=await e.sessions.search(t.query);if(!s.ok)throw new Error(s.error.message);return{items:s.value.items.slice(0,20).map(a=>({sessionId:a.sessionId,snippet:a.snippet.slice(0,1e3)})),hasMore:s.value.hasMore}}if(n.startsWith("workspace.")){let s=e.workspaces.list.getSnapshot().items;if(!s.some(a=>a.workspaceId===t.workspaceId))throw new Error("\u8FD9\u4E2A WSL \u5DE5\u4F5C\u533A\u5DF2\u4E0D\u5B58\u5728\uFF0C\u8BF7\u5237\u65B0\u5217\u8868\u3002");if(n==="workspace.start"){await e.uiWorkspace.openWorkspace(t.workspaceId);return}if(n==="workspace.rename"){await e.workspaces.rename(t.workspaceId,_e(t.title));return}if(n==="workspace.delete"){await e.workspaces.delete(t.workspaceId);return}if(n==="workspace.reorder"){if(t.beforeId!==void 0&&!s.some(a=>a.workspaceId===t.beforeId))throw new Error("\u76EE\u6807\u5DE5\u4F5C\u533A\u5DF2\u4E0D\u5B58\u5728\uFF0C\u8BF7\u91CD\u8BD5\u3002");await e.workspaces.insertBefore(t.workspaceId,t.beforeId);return}}if(!e.sessions.list.getSnapshot().byId[t.sessionId])throw new Error("\u8FD9\u6761 WSL \u5BF9\u8BDD\u5DF2\u4E0D\u5B58\u5728\uFF0C\u8BF7\u5237\u65B0\u5217\u8868\u3002");if(n==="session.rename"){let s=_e(t.title),a=await e.sessions.using(t.sessionId,{source:"workspaceOperation"},d=>d.binding.session.rename(s));if(!a.ok)throw new Error(a.error.message);return}if(n==="session.fork"){let s=await e.uiWorkspace.forkSession(t.sessionId);e.uiWorkspace.openSession(s);return}let r={pin:"pinSession",unpin:"unpinSession",archive:"archiveSession",unarchive:"unarchiveSession"};if(!r[n])throw new Error("\u5BF9\u8BDD\u64CD\u4F5C\u65E0\u6548\u3002");await e.uiWorkspace[r[n]](t.sessionId,n==="archive"?{stopActivity:t.stopActivity===!0}:void 0)}var ge="__DSH_WSL_DESKTOP_V1__";function Fe(e,n,{waitMs:t=2e4}={}){let r=0,s=0,a=null,d=!1,i,w=[],c=u=>{if(d||u!==e)throw new Error("WSL \u9875\u9762\u901A\u9053\u65E0\u6548\u6216\u5DF2\u5173\u95ED\u3002")},m=u=>({sequence:r,closed:d,catalog:s>u?a:null,signals:w.filter(h=>h.sequence>u)}),v=()=>i?.();return{api:Object.freeze({async request(u,h,p={}){if(c(u),!Je.has(h)||!p||typeof p!="object"||Array.isArray(p)||JSON.stringify(p).length>131072)throw new Error("WSL \u9875\u9762\u64CD\u4F5C\u65E0\u6548\u3002");try{let E=await n(h,p);return E===void 0?{ok:!0}:{ok:!0,value:E}}catch(E){return{ok:!1,error:String(E?.message||E).slice(0,1e3)}}},next(u,h=0){if(c(u),!Number.isSafeInteger(h)||h<0||h>r)throw new Error("WSL \u9875\u9762\u6E38\u6807\u65E0\u6548\u3002");if(r>h)return Promise.resolve(m(h));if(i)throw new Error("WSL \u9875\u9762\u5DF2\u7ECF\u5B58\u5728\u7B49\u5F85\u4E2D\u7684\u8BA2\u9605\u3002");return new Promise(p=>{let E=()=>{clearTimeout(W),i=null,p(m(h))},W=setTimeout(E,t);i=E})}}),publish(u,h){if(!d){if(u==="catalog")a=h.catalog,s=++r;else if(u==="return"||u==="sidebar")w.push({sequence:++r,type:u}),w.length>16&&w.shift();else return;v()}},dispose(){d=!0,v(),w.length=0,a=null}}}var Te=new WeakMap;function Ke(e){return Te.has(e)||Te.set(e,{writers:new Map,waiting:new Map}),Te.get(e)}function Ge(e,n,t){let r=Ke(e);r.writers.set(n,t);for(let s of r.waiting.get(n)||[])s(t);return()=>{r.writers.get(n)===t&&r.writers.delete(n)}}function Wt(e,n){let t=Ke(e),r=t.writers.get(n);return r?Promise.resolve(r):new Promise((s,a)=>{let d,i=t.waiting.get(n)||new Set,w=()=>{clearTimeout(d),i.delete(c),i.size||t.waiting.delete(n)},c=m=>{w(),s(m)};i.add(c),t.waiting.set(n,i),d=setTimeout(()=>{w(),a(new Error("\u76EE\u6807\u8F93\u5165\u6846\u5C1A\u672A\u5C31\u7EEA\uFF0C\u8BF7\u6253\u5F00\u76EE\u6807\u5BF9\u8BDD\u540E\u91CD\u8BD5\u3002"))},1e4)})}function Ct(e,n=18e3){let t=[];for(let r of e){let s=r.event;if(r.type!=="event"||!["user/message","assistant/message"].includes(s?.type))continue;let d=((s.type==="user/message"?s.data:s.data.message)?.content||[]).filter(i=>i.type==="text"&&typeof i.text=="string").map(i=>i.text).join(`
`);d.trim()&&t.push(`${s.type==="user/message"?"\u7528\u6237":"\u52A9\u624B"}\uFF1A
${d}`)}return t.slice(-8).join(`

`).slice(-n)}function Xe(e,n,t=""){let r=e.entry?`WSL \xB7 ${e.entry.settings.distro} \xB7 ${e.entry.settings.user||"\u9ED8\u8BA4\u7528\u6237"}`:"Windows",s=e.row.cwd||"",a=e.entry&&s.startsWith("/")?`\\\\wsl.localhost\\${e.entry.settings.distro}${s.replaceAll("/","\\")}`:/^[a-z]:[\\/]/i.test(s)?"/mnt/"+s[0].toLowerCase()+s.slice(2).replaceAll("\\","/"):"";return`\u8DE8\u73AF\u5883\u5DE5\u4F5C\u4EA4\u63A5
\u6765\u6E90\uFF1A${r}
\u6765\u6E90\u5BF9\u8BDD\uFF1A${e.row.title||"\u65B0\u5BF9\u8BDD"}
\u6765\u6E90\u5BF9\u8BDD ID\uFF1A${e.id}
\u6765\u6E90\u76EE\u5F55\uFF1A${s||"\u672A\u6307\u5B9A"}${a?`
\u8DE8\u7CFB\u7EDF\u8BBF\u95EE\u8DEF\u5F84\uFF08\u9ED8\u8BA4 WSL \u6302\u8F7D\u8BBE\u7F6E\uFF09\uFF1A${a}`:""}

\u5DE5\u4F5C\u8BF4\u660E\uFF1A
${n.trim()}${t?`

\u6700\u8FD1\u5BF9\u8BDD\u6458\u5F55\uFF08\u53C2\u8003\u6750\u6599\uFF09\uFF1A
${t}`:""}

\u8BF7\u5728\u5F53\u524D\u76EE\u6807\u73AF\u5883\u7EE7\u7EED\u5DE5\u4F5C\u3002\u5148\u6838\u5BF9\u6587\u4EF6\u4F4D\u7F6E\u548C\u5DF2\u6709\u4FEE\u6539\uFF1B\u4EA4\u63A5\u4E0D\u4F1A\u81EA\u52A8\u590D\u5236\u6587\u4EF6\u6216\u505C\u6B62\u6765\u6E90\u4EFB\u52A1\u3002`}function Oe(e,n=globalThis.localStorage){let t=new Map;return async(r,s)=>{if(r==="handoff.read"){if(!e.sessions.list.getSnapshot().byId[s.sessionId])throw new Error("\u6765\u6E90\u5BF9\u8BDD\u5DF2\u4E0D\u5B58\u5728\u3002");return e.sessions.using(s.sessionId,{source:"workspaceOperation"},c=>({text:Ct(c.binding.eventSource.getSnapshot().entries)}))}if(r!=="handoff.deliver"||!/^[a-f0-9-]{36}$/.test(s.transferId||"")||!["draft","send"].includes(s.mode)||typeof s.text!="string"||!s.text.trim()||s.text.length>24e3)throw new Error("\u4EA4\u63A5\u5185\u5BB9\u6216\u76EE\u6807\u65E0\u6548\u3002");let a="dsh-wsl-native:handoff:"+s.transferId;if(t.has(a))return t.get(a);let d;try{d=JSON.parse(n?.getItem(a)||"null")}catch{}if(d?.done)return{sessionId:d.sessionId,mode:d.mode};if(d?.pending)throw new Error(`\u8FD9\u6B21\u4EA4\u63A5\u5DF2\u7ECF\u63D0\u4EA4\uFF0C\u7ED3\u679C\u5C1A\u672A\u786E\u8BA4\u3002\u8BF7\u67E5\u770B\u76EE\u6807\u5BF9\u8BDD ${d.sessionId}\uFF0C\u4E0D\u4F1A\u81EA\u52A8\u91CD\u590D\u53D1\u9001\u3002`);let i=c=>{d=c;try{n?.setItem(a,JSON.stringify(c))}catch{}},w=(async()=>{let c=d?.sessionId||s.sessionId;if(!c){if(!e.workspaces.list.getSnapshot().items.some(m=>m.workspaceId===s.workspaceId))throw new Error("\u8BF7\u5148\u9009\u62E9\u76EE\u6807\u5DE5\u4F5C\u533A\u3002");c=await e.uiWorkspace.connectWorkspace(s.workspaceId),i({sessionId:c})}if(e.sessions.list.getSnapshot().byId[c]||await e.sessions.refresh(),e.workspaces.list.getSnapshot().archivedSessionIds.includes(c))throw new Error("\u8BF7\u5148\u53D6\u6D88\u76EE\u6807\u5BF9\u8BDD\u7684\u5F52\u6863\u3002");return await e.sessions.using(c,{source:"workspaceOperation"},async m=>{if(s.mode==="draft"){let v=e.get("conversation");if(!v?.input)throw new Error("\u5F53\u524D DSH \u6CA1\u6709\u5BF9\u8BDD\u8F93\u5165\u63A5\u53E3\uFF0C\u8BF7\u66F4\u65B0 DSH\u3002");e.uiWorkspace.openSession(c);let u=await Wt(e,c),h=v.input.for(m.binding.ctx),p=h.state.getSnapshot();if(p.draft.trim()||u.getDraft().trim()||p.attachmentIds.length||p.phase!=="plain")throw new Error("\u76EE\u6807\u8F93\u5165\u6846\u5DF2\u6709\u8349\u7A3F\u6216\u6B63\u5728\u63D0\u4EA4\u3002\u8BF7\u5148\u5904\u7406\u8349\u7A3F\uFF0C\u6216\u9009\u62E9\u65B0\u5BF9\u8BDD\u3002");i({sessionId:c,mode:s.mode,pending:!0}),u.setDraft(s.text),h.setDraft(s.text)}else{i({sessionId:c,mode:s.mode,pending:!0});let v=await m.binding.session.prompt([{type:"text",text:s.text}],"queue");if(!v.ok)throw new Error(`\u4EA4\u63A5\u672A\u786E\u8BA4\uFF1A${v.error.message}\u3002\u8BF7\u67E5\u770B\u76EE\u6807\u5BF9\u8BDD\u540E\u518D\u51B3\u5B9A\u4E0B\u4E00\u6B65\u3002`);e.uiWorkspace.openSession(c)}}),i({sessionId:c,mode:s.mode,done:!0,time:Date.now()}),{sessionId:c,mode:s.mode}})();t.set(a,w);try{return await w}finally{t.delete(a)}}}function Ze(e,n,t,r){let s=r.transport==="desktop";if(!s&&window.parent===window||n.guest)return;let a,d="",i=!1,w=new AbortController,c=Oe(e),m={origin:r.parentOrigin,source:window.parent,channel:r.channel},v=s?Fe(r.channel,E):null;v&&Object.defineProperty(window,ge,{value:v.api,configurable:!0});let u=(N,x={})=>v?v.publish(N,x):m.source.postMessage({protocol:ve,channel:r.channel,type:N,...x},m.origin),h=(N=!1)=>{clearTimeout(a),a=setTimeout(()=>{if(i)return;let x=xe(e),f=JSON.stringify(x);(N||f!==d)&&(d=f,u("catalog",{catalog:x}))},50)},p=n.guest={compact:!0,returnWindows(){u("return")},toggleSidebar(){u("sidebar")},publish:h};document.documentElement.setAttribute("data-dsh-wsl-guest","");async function E(N,x={}){if(N==="handoff.read"||N==="handoff.deliver"){let I=await c(N,x);return h(!0),I}if(N==="refresh"){h(!0);return}if(N==="theme"){if(document.body.toggleAttribute("data-ds-dark-theme",x.dark===!0),document.documentElement.style.colorScheme=x.dark===!0?"dark":"light",Array.isArray(x.tokens))for(let[I,S]of x.tokens.slice(0,256))/^--(?:ds|dsw|dsh)-[\w-]+$/.test(I)&&typeof S=="string"&&S.length<500&&document.body.style.setProperty(I,S);return}if(N==="chrome"){p.compact=!0,(x.panel==="plugins"||x.panel===null)&&e.layout.selectPanel(x.panel),n.emit();return}if(N==="navigate"){w.abort(),w=new AbortController;let I=w.signal;if(x.sessionId){let S=e.sessions.list.getSnapshot().byId[x.sessionId];if(!S||S.parentId||e.workspaces.list.getSnapshot().archivedSessionIds.includes(S.id))throw new Error("\u8FD9\u6761 WSL \u5BF9\u8BDD\u5DF2\u5F52\u6863\u6216\u4E0D\u5728\u5F53\u524D\u73AF\u5883\u4E2D\uFF0C\u8BF7\u5237\u65B0\u5217\u8868\u3002");e.uiWorkspace.openSession(S.id)}else{if(!x.handoff)throw new Error("\u7F3A\u5C11\u5DF2\u9A8C\u8BC1\u7684\u5DE5\u4F5C\u533A\u4FE1\u606F\u3002");let S=await t("environment/adopt",x.handoff);if(I.aborted)return;if(x.create){let y=await e.workspaces.create({path:S.settings.directory});if(I.aborted)return;I.aborted||await e.uiWorkspace.openWorkspace(y.workspaceId)}else await ye(e,S.settings.directory,I)}h(!0);return}let f=await Ve(e,N,x);return h(!0),f}let W=N=>{if(!Ce(N,m)||N.data.type!=="request")return;let{id:x,action:f,payload:I}=N.data;typeof x!="string"||x.length>100||typeof f!="string"||E(f,I).then(S=>u("result",{id:x,ok:!0,value:S}),S=>u("result",{id:x,ok:!1,error:String(S.message).slice(0,1e3)}))};s||window.addEventListener("message",W);let C=[e.sessions.list.subscribe(()=>h()),e.workspaces.list.subscribe(()=>h()),e.connection.state.subscribe(()=>h())];h(!0),n.emit(),p.dispose=()=>{i=!0,w.abort(),clearTimeout(a),window.removeEventListener("message",W),v?.dispose(),v&&window[ge]===v.api&&delete window[ge];for(let N of C)N();document.documentElement.removeAttribute("data-dsh-wsl-guest")}}var $e="dsh-wsl-native:";function K(e,n,t=sessionStorage){try{if(n===void 0)return JSON.parse(t.getItem($e+e)||"null");n===null?t.removeItem($e+e):t.setItem($e+e,JSON.stringify(n))}catch{}return null}function Qe(e,n){return e.getSnapshot().phase==="ready"?Promise.resolve():new Promise((t,r)=>{let s=()=>{},a,d=w=>{s(),clearTimeout(a),n?.removeEventListener("abort",i),w?r(w):t()},i=()=>d(new Error("\u5DE5\u4F5C\u533A\u6253\u5F00\u5DF2\u53D6\u6D88\u3002"));s=e.subscribe(()=>{e.getSnapshot().phase==="ready"&&d()}),a=setTimeout(()=>d(new Error("DSH \u5DE5\u4F5C\u533A\u4ECD\u5728\u52A0\u8F7D\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002")),3e4),n?.addEventListener("abort",i,{once:!0}),n?.aborted?i():e.getSnapshot().phase==="ready"&&d()})}async function ye(e,n,t){if(await Promise.all([Qe(e.workspaces.list,t),Qe(e.sessions.list,t)]),t?.aborted)return!1;let r=e.layout.beginNavigation(),s=await e.workspaces.create({path:n});if(await e.sessions.refresh(),t?.aborted||r.aborted)return!1;let{byId:a}=e.sessions.list.getSnapshot(),d=e.workspaces.list.getSnapshot().archivedSessionIds,i=s.sessionIds.map(m=>a[m]).filter(m=>m&&!m.parentId&&!d.includes(m.id)&&m.cwd===s.path),w=K("selection",void 0,localStorage)?.[s.path],c=i.find(m=>m.id===w)??i.sort((m,v)=>v.updatedAt-m.updatedAt)[0];return c?e.uiWorkspace.openSession(c.id):await e.uiWorkspace.openWorkspace(s.workspaceId),!0}function Ye(e,n){let t=new Set,r,s=!1,a=!1,d,i={state:null,error:null,draft:null,pending:K("pending"),popup:null,parentOrigin:Q(K("parentOrigin")),readyLink:null,subscribe(u){return t.add(u),()=>t.delete(u)},emit(){if(!s)for(let u of t)u()},async refresh(){return r||(r=n("status").then(u=>(s||(i.state=u,i.error=null,i.parentOrigin||=u.parentOrigin,i.emit()),u)).catch(u=>{throw i.error=u.message,i.emit(),u}).finally(()=>{r=null}),r)},setPending(u){i.pending=u,K("pending",u),i.emit()},remember(){let u=e.sessions.list.getSnapshot(),h=u.ids.map(W=>u.byId[W]).find(W=>W?.retainedBy?.mainView>0&&W.cwd&&!W.parentId);if(!h||d===h.id)return;d=h.id;let p=K("selection",void 0,localStorage)||{},E=Object.fromEntries([[h.cwd,h.id],...Object.entries(p).filter(([W])=>W!==h.cwd)].slice(0,64));K("selection",E,localStorage)},async adopt(){let u=we(window.location.hash),h=Ue(window.location.hash);if(!(!u||a||K("arrived")===u.id&&!h)){a=!0;try{let p=i.state||await i.refresh();if(p.mode!=="wsl-host"||!p.distros.some(W=>W.name===u.distro))throw new Error("\u76EE\u6807 DSH \u4E0E\u9009\u5B9A\u7684 Linux \u73AF\u5883\u4E0D\u4E00\u81F4\u3002");let E=await n("environment/adopt",u);u.parentOrigin&&(i.parentOrigin=u.parentOrigin,K("parentOrigin",u.parentOrigin)),await ye(e,E.settings.directory,w.signal)&&(K("arrived",u.id),h&&Ze(e,i,n,h),history.replaceState(history.state,"",window.location.pathname+window.location.search),await i.refresh())}catch(p){i.error=p.message,i.emit(),s||e.layout.selectPanel("dsh-wsl-native")}finally{a=!1}}}},w=new AbortController,c=()=>{i.refresh().then(()=>i.adopt()).catch(()=>{})},m=e.on("connection/reset",c),v=e.sessions.list.subscribe(()=>i.remember());return window.addEventListener("hashchange",i.adopt),window.addEventListener("focus",c),c(),i.dispose=()=>{s=!0,i.guest?.dispose(),i.conversations?.dispose(),w.abort(),m(),v(),window.removeEventListener("hashchange",i.adopt),window.removeEventListener("focus",c),t.clear()},i}var ws=require("react"),Ee=require("@deepseek-ai/dsh-client-ui-primitives"),q=require("react/jsx-runtime");function et({state:e,model:n,chosen:t,task:r,api:s,disabled:a}){let d=e.native?.inheritance;if(e.mode!=="windows-host"||!d?.available)return null;let{options:i,applied:w}=d;return(0,q.jsxs)("section",{className:"dsh-wsl-section","aria-labelledby":"dsh-wsl-inheritance-title",children:[(0,q.jsxs)("div",{className:"dsh-wsl-section-heading",children:[(0,q.jsx)("h2",{id:"dsh-wsl-inheritance-title",children:"Linux \u63D2\u4EF6\u4E0E\u914D\u7F6E"}),(0,q.jsxs)("span",{className:"dsh-wsl-caption",children:["\u4E3B\u73AF\u5883\uFF1A",d.source]})]}),(0,q.jsxs)("div",{className:"dsh-wsl-card dsh-wsl-inheritance",children:[(0,q.jsx)("p",{children:"\u9ED8\u8BA4\u6CBF\u7528\u4E3B\u73AF\u5883\u3002\u5728 Linux \u4E2D\u5355\u72EC\u4FEE\u6539\u7684\u9879\u76EE\u4F1A\u4FDD\u7559\uFF0C\u540E\u7EED\u540C\u6B65\u53EA\u66F4\u65B0\u4ECD\u8DDF\u968F\u4E3B\u73AF\u5883\u7684\u90E8\u5206\u3002"}),(0,q.jsx)("div",{className:"dsh-wsl-inherit-options",children:[["plugins","\u63D2\u4EF6","\u6CBF\u7528\u4E3B\u73AF\u5883\u5B89\u88C5\u7684\u63D2\u4EF6"],["config","\u8BBE\u7F6E","\u6CBF\u7528\u4E3B\u73AF\u5883\u7684\u504F\u597D\u8BBE\u7F6E"],["credentials","\u6A21\u578B\u8D26\u53F7","\u6CBF\u7528\u4E3B\u73AF\u5883\u767B\u5F55\u7684\u8D26\u53F7"]].map(([c,m,v])=>(0,q.jsxs)("div",{className:"dsh-wsl-inherit-option",children:[(0,q.jsxs)("div",{children:[(0,q.jsx)("strong",{children:m}),(0,q.jsx)("small",{children:v})]}),(0,q.jsx)(Ee.Switch,{checked:i[c],disabled:a,label:`\u7EE7\u627F${m}`,onChange:u=>void r("inheritance",()=>s("native/inheritance",{...t(),options:{[c]:u}}))})]},c))}),(0,q.jsxs)("div",{className:"dsh-wsl-inherit-actions",children:[(0,q.jsx)(Ee.Button,{variant:"outline",disabled:a||!t().distro,onClick:()=>void n.conversations.enter(t(),{panel:"plugins"}),children:"\u7BA1\u7406 Linux \u63D2\u4EF6\u4E0E\u8BBE\u7F6E"}),(0,q.jsx)("span",{className:"dsh-wsl-caption",children:"\u66F4\u6539\u7EE7\u627F\u9009\u9879\u540E\uFF0C\u4E0B\u6B21\u542F\u52A8 Linux \u751F\u6548\u3002"})]}),w&&(0,q.jsxs)("details",{className:"dsh-wsl-inherit-details",children:[(0,q.jsxs)("summary",{children:["\u5DF2\u7EE7\u627F ",w.plugins.filter(c=>c.status==="inherited").length," \u4E2A\u63D2\u4EF6",w.overrides?` \xB7 \u4FDD\u7559 ${w.overrides} \u9879 Linux \u8C03\u6574`:""]}),(0,q.jsx)("ul",{children:w.plugins.map(c=>(0,q.jsxs)("li",{children:[(0,q.jsxs)("span",{children:[c.name," ",(0,q.jsx)("small",{children:c.version})]}),(0,q.jsx)("span",{children:c.status==="inherited"?"\u8DDF\u968F\u4E3B\u73AF\u5883":c.status==="overridden"?"Linux \u5355\u72EC\u914D\u7F6E":c.reason})]},c.name))})]})]})]})}var l=require("react/jsx-runtime");function re(e){let[,n]=(0,_.useState)(0);return(0,_.useEffect)(()=>e.subscribe(()=>n(t=>t+1)),[e]),e.state}function tt({api:e,ctx:n,model:t}){let r=re(t),[s,a]=(0,_.useState)(t.draft),[d,i]=(0,_.useState)(""),[w,c]=(0,_.useState)(null),[m,v]=(0,_.useState)(!1),[u,h]=(0,_.useState)(null),p=(0,_.useRef)(!1),E=(0,_.useRef)(!0),W=(0,_.useCallback)(()=>t.refresh(),[t]);(0,_.useEffect)(()=>(E.current=!0,W().catch(()=>{}),()=>{E.current=!1}),[W]),(0,_.useEffect)(()=>{r&&!s&&a(ue(r.settings,r.distros))},[r,s]),(0,_.useEffect)(()=>{t.draft=s},[s,t]),(0,_.useEffect)(()=>{let b=t.pending;if(!b)return;let H=r?.handoffs?.find(F=>F.id===b.id);H?.state==="ready"?(t.remember(),t.readyLink=H.url,t.setPending(null),b.mode==="same"?t.conversations.adopt(H).catch(F=>{t.error=F.message,t.emit()}):t.popup&&!t.popup.closed?(t.popup.location.replace(H.url),t.popup=null,c({text:"Linux \u5DF2\u5728\u65B0\u7A97\u53E3\u6253\u5F00\uFF0C\u4E24\u8FB9\u53EF\u4EE5\u540C\u65F6\u4F7F\u7528\u3002"})):c({text:"Linux \u5DF2\u5C31\u7EEA\u3002\u70B9\u51FB\u201C\u65B0\u7A97\u53E3\u6253\u5F00\u201D\u5373\u53EF\u4E0E Windows \u540C\u65F6\u4F7F\u7528\u3002"})):H?.state==="failed"?(t.popup?.close(),t.popup=null,t.setPending(null),c({error:!0,text:H.error})):r&&!H&&(t.setPending(null),c({error:!0,text:"\u542F\u52A8\u5668\u5DF2\u91CD\u65B0\u8FDE\u63A5\uFF0C\u8BF7\u91CD\u65B0\u8FDB\u5165 Linux \u73AF\u5883\u3002"}))},[r,t,t.pending]),(0,_.useEffect)(()=>{let b=r?.native?.instances?.some(F=>F.preparing||F.starting);if(!t.pending&&!b)return;let H=setTimeout(()=>{W().catch(()=>{})},700);return()=>clearTimeout(H)},[r,t,t.pending,W]);async function C(b,H){if(!p.current){p.current=!0,i(b),c(null),t.error=null;try{await H()}catch(F){E.current&&c({error:!0,text:Re(F)})}finally{try{await W()}catch{}p.current=!1,E.current&&i("")}}}function N(b,H){a(F=>({...F,[b]:H})),c(null)}let x=()=>({distro:s.distro,user:s.user.trim(),directory:s.directory.trim()});async function f(b,H="\u5DE5\u4F5C\u73AF\u5883\u5DF2\u8FDE\u63A5\uFF0C\u76EE\u5F55\u5DF2\u8BB0\u4F4F\u3002"){let F=await e("environment/switch",b);return E.current&&(a(ue(F.settings,r.distros)),c({text:H})),F}function I(b=!1){p.current||t.pending||(b&&(t.popup=window.open("about:blank","_blank"),t.popup&&(t.popup.opener=null,t.popup.document.title="\u6B63\u5728\u51C6\u5907 Linux DSH",t.popup.document.body.textContent="\u6B63\u5728\u51C6\u5907 Linux DSH\uFF0C\u5B8C\u6210\u540E\u4F1A\u81EA\u52A8\u8FDB\u5165\u3002Windows DSH \u53EF\u4EE5\u7EE7\u7EED\u4F7F\u7528\u3002",t.popup.document.body.style.cssText="font:14px/1.7 system-ui;padding:48px;max-width:560px;margin:auto;color:#666;background:#fafafa")),C("enter",async()=>{try{t.remember();let H=await e("native/enter",{...x(),parentOrigin:Q(window.location.origin)});a(ue(H.settings,r.distros)),await W(),t.setPending({id:H.id,mode:b?"new":"same"})}catch(H){throw t.popup?.close(),t.popup=null,H}}))}if(!r||!s)return(0,l.jsxs)("div",{className:"dsh-wsl-page",children:[(0,l.jsx)("header",{className:"dsh-wsl-heading",children:(0,l.jsxs)("div",{children:[(0,l.jsx)("h1",{children:"WSL \u4E0E Windows"}),(0,l.jsx)("p",{children:"\u5728\u540C\u4E00\u7A97\u53E3\u4F7F\u7528\u4E24\u5957\u73AF\u5883\uFF0CWSL \u5BF9\u8BDD\u4F1A\u663E\u793A\u6807\u5FD7\u3002"})]})}),(0,l.jsxs)("div",{className:"dsh-wsl-empty",role:t.error?"alert":"status",children:[t.error||(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(D.StateDot,{state:"ongoing"}),"\u6B63\u5728\u8BFB\u53D6\u73AF\u5883\u2026"]}),t.error&&(0,l.jsx)(D.Button,{onClick:()=>C("refresh",async()=>{}),children:"\u91CD\u65B0\u8FDE\u63A5"})]})]});let S=r.mode==="wsl-host",y=r.mode!=="unsupported",O=ue(r.settings,r.distros),g=["distro","user","directory"].some(b=>s[b].trim()!==O[b]),P=r.native||{},o=P.running,k=t.pending&&r.handoffs?.find(b=>b.id===t.pending.id),L=!!(P.preparing||P.starting||t.pending),R=!!d||!!t.pending||!y,J=r.profiles?.find(b=>b.distro===s.distro&&b.user===s.user.trim()),$=r.pool.connections.find(b=>b.connected&&b.target[0]==="wsl"&&b.target[1]===s.distro&&(b.target[2]===s.user.trim()||b.info?.user===s.user.trim())),ie=r.pool.connections.some(b=>b.connected&&b.target[0]==="windows"),V=w?.error&&w.text||t.error||r.error||!y&&"\u5F53\u524D\u73AF\u5883\u4E0D\u652F\u6301 WSL\uFF0C\u8BF7\u5728 Windows \u6216 WSL \u4E2D\u4F7F\u7528\u3002",ne=V||w?.text,Se=o?.openUrl||null,Ie=k?.state==="starting"||P.starting?"\u6B63\u5728\u542F\u52A8 DSH\uFF0C\u5E76\u7B49\u5F85 Windows \u8FDE\u63A5\u2026":P.progress?.text||"\u6B63\u5728\u8FDE\u63A5 Linux \u5DE5\u4F5C\u73AF\u5883\u2026";return(0,l.jsxs)("div",{className:"dsh-wsl-page",children:[(0,l.jsxs)("header",{className:"dsh-wsl-heading",children:[(0,l.jsxs)("div",{children:[(0,l.jsx)("h1",{children:"WSL \u4E0E Windows"}),(0,l.jsx)("p",{children:"\u5728\u540C\u4E00\u7A97\u53E3\u4F7F\u7528\u4E24\u5957\u73AF\u5883\uFF0CWSL \u5BF9\u8BDD\u4F1A\u663E\u793A\u6807\u5FD7\u3002"})]}),(0,l.jsx)(D.Button,{variant:"ghost",icon:(0,l.jsx)(D.IconRefreshOutlineRegular,{}),title:"\u5237\u65B0\u72B6\u6001","aria-label":"\u5237\u65B0\u72B6\u6001",disabled:!!d,onClick:()=>C("refresh",async()=>{})})]}),!S&&(0,l.jsxs)("div",{className:"dsh-wsl-unified-setting",children:[(0,l.jsx)("span",{children:"Windows \u4E0E WSL \u5BF9\u8BDD\u663E\u793A\u5728\u540C\u4E00\u4E2A\u5217\u8868\uFF0C\u5207\u6362\u5BF9\u8BDD\u5373\u53EF\u5207\u6362\u73AF\u5883\u3002"}),(0,l.jsx)(D.Button,{variant:"ghost",onClick:()=>t.conversations.setUnified(!t.conversations.unified),children:t.conversations.unified?"\u4F7F\u7528\u539F\u751F\u5DE5\u4F5C\u533A\u5217\u8868":"\u5207\u6362\u5230\u7D27\u51D1\u5BF9\u8BDD\u5217\u8868"})]}),ne&&(0,l.jsxs)("div",{className:`dsh-wsl-notice ${V?"is-error":""}`,role:V?"alert":"status",children:[(0,l.jsx)(D.StateDot,{state:V?"error":"done"}),(0,l.jsx)("span",{children:ne})]}),(0,l.jsxs)("section",{className:"dsh-wsl-section","aria-labelledby":"dsh-wsl-host-title",children:[(0,l.jsxs)("div",{className:"dsh-wsl-section-heading",children:[(0,l.jsx)("h2",{id:"dsh-wsl-host-title",children:"\u8FD0\u884C\u73AF\u5883"}),(0,l.jsx)("span",{className:"dsh-wsl-caption",children:"\u5207\u6362\u65F6\u4FDD\u7559\u4E24\u8FB9\u7684\u4EFB\u52A1"})]}),(0,l.jsxs)("div",{className:"dsh-wsl-host-grid",children:[(0,l.jsxs)("article",{className:`dsh-wsl-card dsh-wsl-host-card ${S?"":"is-current"}`,children:[(0,l.jsxs)("div",{className:"dsh-wsl-host-head",children:[(0,l.jsx)(Me,{size:23}),(0,l.jsx)(Le,{state:S?"idle":"done",children:S?"\u72EC\u7ACB\u8FD0\u884C":"\u5F53\u524D\u73AF\u5883"})]}),(0,l.jsx)("h3",{children:"Windows DSH"}),(0,l.jsxs)("p",{children:["PowerShell\u3001Windows \u6587\u4EF6\u548C\u5E94\u7528\u3002",(0,l.jsx)("br",{}),"\u4FDD\u7559 Windows \u4E2D\u7684\u5DE5\u4F5C\u533A\u4E0E\u4F1A\u8BDD\u3002"]}),(0,l.jsx)("div",{className:"dsh-wsl-host-actions",children:S?t.parentOrigin?(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(D.Button,{variant:"outline",icon:(0,l.jsx)(Me,{size:16}),onClick:()=>{t.remember(),t.guest?t.guest.returnWindows():window.location.assign(ze(t.parentOrigin))},children:"\u5207\u6362\u5230 Windows"}),(0,l.jsxs)("a",{className:"dsh-wsl-text-link",href:ze(t.parentOrigin),target:"_blank",rel:"noopener noreferrer",children:["\u65B0\u7A97\u53E3\u6253\u5F00",(0,l.jsx)(me,{})]})]}):(0,l.jsx)("span",{className:"dsh-wsl-caption",children:"\u4ECE Windows DSH \u8FDB\u5165\u540E\uFF0C\u53EF\u5728\u8FD9\u91CC\u4E00\u952E\u8FD4\u56DE\u3002"}):(0,l.jsx)(D.Button,{variant:"outline",onClick:()=>n.layout.selectPanel(null),children:"\u7EE7\u7EED Windows \u4F1A\u8BDD"})})]}),(0,l.jsxs)("article",{className:`dsh-wsl-card dsh-wsl-host-card ${S?"is-current":""}`,children:[(0,l.jsxs)("div",{className:"dsh-wsl-host-head",children:[(0,l.jsx)(le,{size:23}),(0,l.jsx)(Le,{state:S||o?"done":L?"ongoing":"idle",children:S?"\u5F53\u524D\u73AF\u5883":o?"\u5DF2\u5C31\u7EEA":L?"\u51C6\u5907\u4E2D":"\u6309\u9700\u542F\u52A8"})]}),(0,l.jsxs)("h3",{children:["Linux DSH ",(0,l.jsx)("span",{children:s.distro||"WSL"})]}),(0,l.jsxs)("p",{children:["DSH\u3001\u7EC8\u7AEF\u548C\u9879\u76EE\u90FD\u5728 Linux \u4E2D\u8FD0\u884C\u3002",(0,l.jsx)("br",{}),"Linux \u539F\u751F\u5DE5\u5177\uFF0C\u968F\u65F6\u8BBF\u95EE Windows\u3002"]}),(0,l.jsx)("div",{className:"dsh-wsl-host-actions",children:S?(0,l.jsx)(D.Button,{variant:"outline",onClick:()=>C("workspace",async()=>{let b=await f(x());await ye(n,b.settings.directory)}),children:"\u7EE7\u7EED Linux \u4F1A\u8BDD"}):(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(D.Button,{variant:"primary",icon:L?(0,l.jsx)(D.StateDot,{state:"ongoing"}):(0,l.jsx)(le,{size:16}),disabled:R||!s.distro||L,onClick:()=>I(!1),children:L?"\u6B63\u5728\u51C6\u5907\u2026":o?"\u6253\u5F00 WSL \u5BF9\u8BDD":"\u5F00\u59CB WSL \u5BF9\u8BDD"}),Se&&!g?(0,l.jsxs)("a",{className:"dsh-wsl-text-link",href:Se,target:"_blank",rel:"noopener noreferrer",children:["\u65B0\u7A97\u53E3\u6253\u5F00",(0,l.jsx)(me,{})]}):(0,l.jsx)(D.Button,{variant:"ghost",disabled:R||!s.distro||L,icon:(0,l.jsx)(me,{}),onClick:()=>I(!0),children:"\u540C\u65F6\u6253\u5F00"})]})})]})]}),L&&(0,l.jsxs)("div",{className:"dsh-wsl-native-status",role:"status",children:[(0,l.jsx)(D.StateDot,{state:"ongoing"}),(0,l.jsx)("span",{children:Ie})]}),!S&&!L&&(0,l.jsx)("p",{className:"dsh-wsl-section-note",children:"WSL \u5BF9\u8BDD\u76F4\u63A5\u5728\u5F53\u524D\u7A97\u53E3\u6253\u5F00\uFF0C\u5E76\u663E\u793A WSL \u6807\u5FD7\uFF1B\u4E24\u8FB9\u7684\u4EFB\u52A1\u7EE7\u7EED\u8FD0\u884C\u3002"})]}),(0,l.jsx)(et,{state:r,model:t,chosen:x,task:C,api:e,disabled:R||L}),(0,l.jsxs)("section",{className:"dsh-wsl-section","aria-labelledby":"dsh-wsl-connection-title",children:[(0,l.jsxs)("div",{className:"dsh-wsl-section-heading",children:[(0,l.jsx)("h2",{id:"dsh-wsl-connection-title",children:"Linux \u5DE5\u4F5C\u76EE\u5F55"}),(0,l.jsx)(Le,{state:$?"done":"idle",children:$?"\u8FDE\u63A5\u5DF2\u5C31\u7EEA":"\u6309\u9700\u8FDE\u63A5"})]}),(0,l.jsx)("div",{className:"dsh-wsl-card",children:(0,l.jsxs)("form",{onSubmit:b=>{b.preventDefault(),R||C("connect",()=>f(x()))},children:[(0,l.jsxs)("div",{className:"dsh-wsl-fields",children:[(0,l.jsxs)("div",{className:"dsh-wsl-field",children:[(0,l.jsx)("label",{htmlFor:"dsh-wsl-distro",children:"WSL \u53D1\u884C\u7248"}),(0,l.jsxs)("div",{className:"dsh-wsl-select-wrap",children:[(0,l.jsxs)("select",{id:"dsh-wsl-distro",value:s.distro,disabled:R||S,onChange:b=>{let H=b.target.value,F=r.profiles?.find(gt=>gt.distro===H);C("switch",async()=>{await f({distro:H,user:F?.user||"",...F?.directory?{directory:F.directory}:{}},"\u5DF2\u5207\u6362\u8FDE\u63A5\uFF0C\u539F\u73AF\u5883\u7684\u4EFB\u52A1\u7EE7\u7EED\u8FD0\u884C\u3002")})},children:[!r.distros.length&&(0,l.jsx)("option",{value:"",children:"\u672A\u53D1\u73B0\u53D1\u884C\u7248"}),r.distros.map(b=>(0,l.jsxs)("option",{value:b.name,children:[b.name,b.isDefault?"\uFF08\u9ED8\u8BA4\uFF09":""]},b.name))]}),(0,l.jsx)(D.IconChevronDownOutlineRegular,{size:14})]}),(0,l.jsx)("p",{children:s.user?`\u7528\u6237 ${s.user}`:"\u4F7F\u7528\u53D1\u884C\u7248\u7684\u9ED8\u8BA4\u7528\u6237"})]}),(0,l.jsxs)("div",{className:"dsh-wsl-field",children:[(0,l.jsx)("label",{htmlFor:"dsh-wsl-directory",children:"\u5DE5\u4F5C\u76EE\u5F55"}),(0,l.jsxs)("div",{className:"dsh-wsl-directory-row",children:[(0,l.jsx)(D.Input,{id:"dsh-wsl-directory",className:"dsh-wsl-directory-input",value:s.directory,disabled:R,onChange:b=>N("directory",b.target.value),placeholder:"Linux\u3001Windows \u6216 WSL \u8DEF\u5F84",autoComplete:"off",spellCheck:!1}),(0,l.jsx)(D.Button,{variant:"outline",icon:(0,l.jsx)(D.IconFolderOpenOutlineRegular,{}),disabled:R||!s.distro,onClick:()=>v(!0),children:"\u6D4F\u89C8"})]}),(0,l.jsx)("p",{children:J?.storage==="windows-mount"?"\u8FD9\u662F Windows \u6302\u8F7D\u76EE\u5F55\u3002\u4F9D\u8D56\u5B89\u88C5\u548C\u9891\u7E41\u6784\u5EFA\u5EFA\u8BAE\u4F7F\u7528 Linux \u4E3B\u76EE\u5F55\u3002":J?.storage==="linux"?"Linux \u6587\u4EF6\u7CFB\u7EDF \xB7 \u9002\u5408\u4F9D\u8D56\u5B89\u88C5\u3001Git \u548C\u9891\u7E41\u6784\u5EFA":"\u652F\u6301\u7C98\u8D34 Windows \u8DEF\u5F84\uFF1B\u8FDE\u63A5\u540E\u81EA\u52A8\u8F6C\u6362\u5E76\u8BB0\u4F4F\u3002"})]})]}),!!J?.recentDirectories?.length&&(0,l.jsxs)("div",{className:"dsh-wsl-recents","aria-label":"\u6700\u8FD1\u4F7F\u7528\u7684\u76EE\u5F55",children:[(0,l.jsx)("span",{children:"\u6700\u8FD1"}),J.recentDirectories.slice(0,5).map(b=>(0,l.jsxs)("button",{type:"button",title:b,"aria-label":`\u4F7F\u7528\u76EE\u5F55 ${b}`,className:b===s.directory?"is-selected":"",disabled:R,onClick:()=>C("directory",()=>f({...x(),directory:b})),children:[(0,l.jsx)(D.IconFolderOpenOutlineRegular,{size:14}),(0,l.jsx)("span",{children:b==="/"?"/":b.split("/").filter(Boolean).pop()})]},b))]}),!S&&(0,l.jsxs)("details",{className:"dsh-wsl-advanced",children:[(0,l.jsxs)("summary",{children:["\u9AD8\u7EA7\u8BBE\u7F6E",(0,l.jsx)(D.IconChevronDownOutlineRegular,{size:12})]}),(0,l.jsxs)("div",{className:"dsh-wsl-user-field",children:[(0,l.jsx)("label",{htmlFor:"dsh-wsl-user",children:"Linux \u7528\u6237"}),(0,l.jsx)(D.Input,{id:"dsh-wsl-user",value:s.user,disabled:R,placeholder:"\u9ED8\u8BA4\u7528\u6237",autoComplete:"off",onChange:b=>{N("user",b.target.value),N("directory","")}}),(0,l.jsx)("p",{children:"\u6BCF\u4E2A\u7528\u6237\u72EC\u7ACB\u8BB0\u5FC6\u76EE\u5F55\uFF1B\u5207\u6362\u4E0D\u4F1A\u505C\u6B62\u5176\u4ED6\u7528\u6237\u7684\u4EFB\u52A1\u3002"})]})]}),(0,l.jsxs)("div",{className:"dsh-wsl-card-actions",children:[(0,l.jsxs)("div",{className:"dsh-wsl-action-primary",children:[(0,l.jsx)(D.Button,{variant:"outline",type:"submit",disabled:R||!s.distro,icon:d==="connect"||d==="switch"?(0,l.jsx)(D.StateDot,{state:"ongoing"}):void 0,children:d==="connect"?"\u6B63\u5728\u8FDE\u63A5\u2026":g?"\u5E94\u7528\u5DE5\u4F5C\u76EE\u5F55":"\u8FDE\u63A5 WSL"}),S&&(0,l.jsx)(D.Button,{variant:"ghost",disabled:R,onClick:()=>C("windows",async()=>{await e("connect",{target:"windows"}),c({text:"Windows \u4E92\u64CD\u4F5C\u5DF2\u5C31\u7EEA\u3002"})}),children:ie?"Windows \u5DF2\u8FDE\u63A5":"\u8FDE\u63A5 Windows"})]}),(0,l.jsx)(D.Button,{variant:"ghost",icon:(0,l.jsx)(me,{}),disabled:R||!s.directory.trim(),onClick:()=>C("open",async()=>{let b=await e("open",{path:s.directory.trim(),distro:s.distro,user:s.user});if(b.exitCode!==0)throw new Error(b.stderr||"Windows \u65E0\u6CD5\u6253\u5F00\u6B64\u76EE\u5F55\u3002");c({text:"\u5DF2\u5728 Windows \u4E2D\u6253\u5F00\u5DE5\u4F5C\u76EE\u5F55\u3002"})}),children:"\u5728 Windows \u4E2D\u6253\u5F00"})]})]})})]}),(0,l.jsxs)("div",{className:"dsh-wsl-help",children:[(0,l.jsx)(D.IconFolderOpenOutlineRegular,{size:18}),(0,l.jsx)("p",{children:S?"\u5F53\u524D\u4F1A\u8BDD\u4F7F\u7528 Linux \u539F\u751F\u5DE5\u5177\u3002\u9700\u8981 Windows \u6587\u4EF6\u3001PowerShell \u6216\u526A\u8D34\u677F\u65F6\uFF0C\u53EF\u4EE5\u76F4\u63A5\u5728\u5BF9\u8BDD\u4E2D\u63D0\u51FA\u3002":"Windows \u4F1A\u8BDD\u7EE7\u7EED\u4F7F\u7528\u539F\u751F Windows \u5DE5\u5177\uFF1B\u4E5F\u80FD\u901A\u8FC7\u63D2\u4EF6\u76F4\u63A5\u6267\u884C Linux \u547D\u4EE4\u6216\u53CC\u5411\u590D\u5236\u6587\u4EF6\u3002\u5B8C\u6574 Linux \u5DE5\u4F5C\u6D41\u53EF\u4ECE\u4E0A\u65B9\u8FDB\u5165\u3002"})]}),(0,l.jsxs)("details",{className:"dsh-wsl-diagnostics",children:[(0,l.jsxs)("summary",{children:["\u8FD0\u884C\u4E0E\u8FDE\u63A5\u7BA1\u7406",(0,l.jsx)(D.IconChevronDownOutlineRegular,{size:12})]}),(0,l.jsxs)("div",{className:"dsh-wsl-diagnostics-body",children:[(0,l.jsxs)("dl",{children:[(0,l.jsxs)("div",{children:[(0,l.jsx)("dt",{children:"\u5F53\u524D\u5BBF\u4E3B"}),(0,l.jsx)("dd",{children:S?"Linux / WSL":"Windows"})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)("dt",{children:"\u63D2\u4EF6\u7248\u672C"}),(0,l.jsx)("dd",{children:r.version})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)("dt",{children:"\u6D3B\u52A8\u8FDE\u63A5"}),(0,l.jsx)("dd",{children:r.pool.connections.filter(b=>b.connected).length})]}),$&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)("div",{children:[(0,l.jsx)("dt",{children:"Linux Node.js"}),(0,l.jsx)("dd",{children:$.info?.node})]}),(0,l.jsxs)("div",{children:[(0,l.jsx)("dt",{children:"Linux \u4E3B\u76EE\u5F55"}),(0,l.jsx)("dd",{children:$.info?.home})]})]})]}),P.instances?.filter(b=>b.running).map(b=>(0,l.jsxs)("div",{className:"dsh-wsl-runtime-row",children:[(0,l.jsxs)("div",{children:[(0,l.jsx)("strong",{children:b.settings.distro}),(0,l.jsxs)("span",{children:[b.settings.user," \xB7 Linux DSH \u8FD0\u884C\u4E2D"]})]}),(0,l.jsx)(D.Button,{variant:"outline",disabled:R||b.preparing||b.starting,onClick:()=>h({kind:"stop",settings:b.settings}),children:"\u505C\u6B62\u6B64\u73AF\u5883"})]},`${b.settings.distro}/${b.settings.user}`)),!S&&(0,l.jsxs)("div",{className:"dsh-wsl-runtime-row",children:[(0,l.jsx)("p",{children:"\u9700\u8981\u9884\u5148\u4E0B\u8F7D\uFF0C\u6216\u66F4\u65B0\u505C\u6B62\u4E2D\u7684 Linux \u73AF\u5883\u65F6\u4F7F\u7528\u3002"}),(0,l.jsx)(D.Button,{variant:"outline",disabled:R||L||!!o||!s.distro,onClick:()=>C("prepare",async()=>{await e("native/prepare",x())}),children:"\u51C6\u5907\u73AF\u5883"})]}),(0,l.jsxs)("div",{className:"dsh-wsl-disconnect-row",children:[(0,l.jsx)("p",{children:"\u65AD\u5F00\u4F1A\u7ED3\u675F\u6865\u63A5\u8FDE\u63A5\u548C\u540E\u53F0\u4EFB\u52A1\u3002\u65E5\u5E38\u5207\u6362\u65E0\u9700\u65AD\u5F00\u3002"}),(0,l.jsx)(D.Button,{variant:"outline",disabled:R||L||!r.pool.connections.length,onClick:()=>h({kind:"disconnect"}),children:"\u65AD\u5F00\u5168\u90E8\u8FDE\u63A5"})]})]})]}),m&&(0,l.jsx)(Ne,{api:e,distro:s.distro,user:s.user,initialPath:s.directory.trim(),onClose:()=>v(!1),onSelect:b=>{v(!1),C("directory",()=>f({...x(),directory:b}))}}),(0,l.jsx)(D.Modal,{open:!!u,onClose:()=>h(null),title:u?.kind==="stop"?"\u505C\u6B62\u8FD9\u4E2A Linux \u73AF\u5883\uFF1F":"\u65AD\u5F00\u5168\u90E8\u8FDE\u63A5\uFF1F",closeLabel:"\u5173\u95ED",description:u?.kind==="stop"?"\u8BE5 Linux DSH \u4E2D\u7684\u4EFB\u52A1\u4F1A\u505C\u6B62\uFF0C\u5176\u4ED6\u73AF\u5883\u7EE7\u7EED\u8FD0\u884C\u3002\u5DF2\u4FDD\u5B58\u7684\u6587\u4EF6\u548C\u4F1A\u8BDD\u4F1A\u4FDD\u7559\u3002":"\u5168\u90E8\u6865\u63A5\u4EFB\u52A1\u548C\u672C\u63D2\u4EF6\u542F\u52A8\u7684 Linux DSH \u4F1A\u505C\u6B62\u3002Windows DSH \u548C\u5DF2\u4FDD\u5B58\u7684\u6587\u4EF6\u4FDD\u7559\u3002",footer:(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(D.Button,{onClick:()=>h(null),children:"\u53D6\u6D88"}),(0,l.jsx)(D.Button,{variant:"primary",onClick:()=>{let b=u;h(null),C("stop",async()=>{await e(b.kind==="stop"?"native/stop":"disconnect",b.settings||{}),t.readyLink=null,c({text:b.kind==="stop"?"\u8BE5 Linux \u73AF\u5883\u5DF2\u505C\u6B62\u3002":"\u6865\u63A5\u8FDE\u63A5\u5DF2\u65AD\u5F00\u3002"})})},children:"\u786E\u8BA4\u505C\u6B62"})]})})]})}function st(e,n,t){let r=new Map,s=new Map,a=new AbortController,d=new Set,i=new Set,w=new Map,c=Oe(e),m=K("workspace-order",void 0,localStorage),v=0,u,h,p={entries:r,activeKey:null,error:null,busy:!1,anchor:null,dialog:null,catalogRevision:0,workspaceOrder:Array.isArray(m)?m.filter(o=>typeof o=="string").slice(0,16e3):[],requestWorkspace(){p.dialog={type:"workspace"},t.emit()},requestRename(o){p.dialog={type:"rename",target:o},t.emit()},requestHandoff(o){p.dialog={type:"handoff",source:o},t.emit()},async handoff(o,k,L){let R=o?await p.remote(o,k,L):await c(k,L);return k==="handoff.deliver"&&(o?(p.activeKey=o.key,e.layout.selectPanel(ce)):p.showWindows(R.sessionId),t.emit()),R},setWorkspaceOrder(o){p.workspaceOrder=o,K("workspace-order",o,localStorage),t.emit()},async remote(o,k,L){if(!o.ready){if(p.busy)throw new Error("WSL \u73AF\u5883\u6B63\u5728\u8FDE\u63A5\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002");await p.enter(o.settings,{connectOnly:!0},!1),await new Promise((J,$)=>{let ie=()=>{},V=b=>{clearTimeout(Se),ie(),a.signal.removeEventListener("abort",ne),b?$(b):J()},ne=()=>V(new Error("\u7A97\u53E3\u5DF2\u5173\u95ED\u3002")),Se=setTimeout(()=>V(new Error(p.error||"WSL \u9875\u9762\u8FDE\u63A5\u8D85\u65F6\uFF0C\u8BF7\u91CD\u65B0\u8FDE\u63A5\u3002")),45e3),Ie=()=>{let b=r.get(o.key);b?.ready?(o=b,V()):p.error&&V(new Error(p.error))};ie=t.subscribe(Ie),a.signal.addEventListener("abort",ne,{once:!0}),Ie()})}let R=await C(o,k,L);return k!=="search"&&await C(o,"refresh",{}),R},unified:K("sidebar-view-v050",void 0,localStorage)==="conversations",nativeCatalog:()=>xe(e),visible:()=>e.layout.panelInfo.getSnapshot().activePanelId===ce,changed(){t.emit()},setUnified(o){p.unified=o,K("sidebar-view-v050",o?"conversations":"workspaces",localStorage),t.emit()},setAnchor(o){p.anchor=o,t.emit()},showWindows(o){v++,p.error=null,o?e.uiWorkspace.openSession(o):e.layout.selectPanel(null),t.emit()},async openRow(o){if(!o.environment)return p.showWindows(o.id);let k=r.get(o.environment.key);if(!k?.ready)return p.enter(k.settings,{sessionId:o.id});v++,p.activeKey=k.key,p.error=null,e.layout.selectPanel(ce),t.emit();try{await N(k,{sessionId:o.id})}catch(L){p.error=L.message,t.emit()}},async enter(o,k={},L=!0){if(p.busy)return;let R=++v;p.busy=!0,p.error=null,t.emit();try{let J=await n("native/enter",{...o,parentOrigin:Q(location.origin)}),$,ie=Date.now()+600*1e3;for(;!a.signal.aborted&&Date.now()<ie;){if($=(await t.refresh()).handoffs.find(ne=>ne.id===J.id),$?.state==="failed")throw new Error($.error);if($?.state==="ready")break;await new Promise(ne=>setTimeout(ne,700))}if(a.signal.aborted)return;if($?.state!=="ready")throw new Error("Linux \u542F\u52A8\u4ECD\u672A\u5B8C\u6210\uFF0C\u8BF7\u5728\u73AF\u5883\u9762\u677F\u67E5\u770B\u8FDB\u5EA6\u3002");await p.adopt($,k,L&&R===v)}catch(J){p.error=J.message}finally{p.busy=!1,t.emit()}},async adopt(o,k={},L=!0){let R=We(o.settings);d.delete(R);let J=new URL(o.url).origin,$=r.get(R);if(!$||$.origin!==J){if([...r.values()].filter(ne=>ne.url&&ne.key!==R).length>=8)throw new Error("\u540C\u4E00\u7A97\u53E3\u6700\u591A\u4FDD\u6301 8 \u4E2A Linux \u73AF\u5883\u3002\u5728\u5BF9\u8BDD\u83DC\u5355\u4E2D\u5173\u95ED\u4E0D\u7528\u7684\u73AF\u5883\u9875\u9762\u540E\u53EF\u7EE7\u7EED\u6253\u5F00\uFF0C\u540E\u53F0\u4EFB\u52A1\u4E0D\u53D7\u5F71\u54CD\u3002");$&&x($,"Linux \u5DF2\u91CD\u65B0\u542F\u52A8\uFF0C\u8BF7\u91CD\u8BD5\u8FD9\u6B21\u64CD\u4F5C\u3002");let V=crypto.randomUUID();$={key:R,settings:o.settings,origin:J,channel:V,catalog:$?.catalog||null,url:He(o.url,V,location.origin),openUrl:o.url,transport:Q(location.origin)===de?"desktop":"iframe",ready:!1,compact:!0,window:null,waiting:null,startedAt:Date.now()},r.set(R,$)}else $.settings=o.settings,$.openUrl=o.url;$.handoff=we(new URL(o.url).hash),L&&(p.activeKey=R,e.layout.selectPanel(ce));let ie={handoff:$.handoff,...k};k.connectOnly||($.ready?await N($,ie):$.waiting=ie),E(),t.emit()},bind(o,k){o.window=k?.contentWindow||null},desktopMessage(o,k){r.get(o.key)===o&&S(o,k)},desktopError(o,k){r.get(o.key)===o&&(o.ready=!1,p.error=k.message,x(o,k.message),t.emit())},newWindows(){v++,e.uiWorkspace.startSession(),t.emit()},async newLinux(o){let k=o?.settings||t.state?.settings;if(!k?.distro){e.layout.selectPanel("dsh-wsl-native");return}let L=o?.catalog?.rows.find(R=>R.id===o.catalog.selectedId);await p.enter({...k,directory:L?.cwd||k.directory},{create:!0})},async action(o,k){p.error=null;try{if(o.environment){let L=r.get(o.environment.key);await p.remote(L,k,{sessionId:o.id})}else{let L={pin:"pinSession",unpin:"unpinSession",archive:"archiveSession",unarchive:"unarchiveSession"};if(!L[k])throw new Error("\u5BF9\u8BDD\u64CD\u4F5C\u65E0\u6548\u3002");await e.uiWorkspace[L[k]](o.id)}}catch(L){p.error=L.message}t.emit()},toggleChrome(o){let k=o.configOpen?null:"plugins";C(o,"chrome",{compact:!0,panel:k}).then(()=>{o.configOpen=!!k,o.compact=!0,t.emit()}).catch(L=>{p.error=L.message,t.emit()})},closeView(o){d.add(o.key),x(o,"\u8FD9\u4E2A\u73AF\u5883\u7684\u9875\u9762\u5DF2\u5173\u95ED\uFF0C\u540E\u53F0\u4EFB\u52A1\u7EE7\u7EED\u8FD0\u884C\u3002"),p.activeKey===o.key&&p.showWindows(),delete o.url,o.window=null,o.ready=!1,o.origin=null,o.waiting=null,E(),t.emit()},reconnect(o){x(o,"\u8FDE\u63A5\u6B63\u5728\u91CD\u65B0\u5EFA\u7ACB\u3002"),o.origin=null,p.enter(o.settings,o.catalog?.selectedId?{sessionId:o.catalog.selectedId}:{})}};function E(){clearTimeout(u),u=setTimeout(()=>K("conversation-catalogs",[...r.values()].map(o=>({key:o.key,settings:o.settings,catalog:o.catalog})),localStorage),200)}let W=K("conversation-catalogs",void 0,localStorage)||K("conversation-catalogs");for(let o of(Array.isArray(W)?W:[]).slice(0,8)){if(!o?.settings?.distro||!o?.settings?.directory||!be(o.catalog))continue;let k=We(o.settings);r.set(k,{key:k,settings:o.settings,catalog:be(o.catalog),ready:!1,compact:!0})}function C(o,k,L){if(!o.window&&!o.desktop||!o.ready)return Promise.reject(new Error("WSL \u5BF9\u8BDD\u754C\u9762\u5C1A\u672A\u8FDE\u63A5\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002"));let R=crypto.randomUUID();return new Promise((J,$)=>{let ie=setTimeout(()=>{s.delete(R),$(new Error("WSL \u5BF9\u8BDD\u6CA1\u6709\u53CA\u65F6\u54CD\u5E94\uFF0C\u8BF7\u68C0\u67E5\u8FDE\u63A5\uFF1B\u64CD\u4F5C\u4E0D\u4F1A\u81EA\u52A8\u91CD\u653E\u3002"))},3e4);s.set(R,{entry:o,resolve:J,reject:$,timer:ie}),o.desktop?o.desktop.request(k,L).then(V=>S(o,{type:"result",id:R,ok:!0,value:V}),V=>S(o,{type:"result",id:R,ok:!1,error:V.message})):o.window.postMessage({protocol:ve,channel:o.channel,type:"request",id:R,action:k,payload:L},o.origin)})}async function N(o,k){let L=crypto.randomUUID();o.navigating=L,t.emit();try{await C(o,"navigate",k),o.configOpen=!1,k.panel==="plugins"&&(await C(o,"chrome",{compact:!0,panel:"plugins"}),o.configOpen=!0)}finally{o.navigating===L&&(o.navigating=null),t.emit()}}function x(o,k){for(let[L,R]of s)R.entry===o&&(clearTimeout(R.timer),s.delete(L),R.reject(new Error(k)))}function f(o){let k=[...document.body.style].filter(L=>/^--(?:ds|dsw|dsh)-/.test(L)).map(L=>[L,document.body.style.getPropertyValue(L)]);C(o,"theme",{dark:document.body.hasAttribute("data-ds-dark-theme"),tokens:k}).catch(()=>{})}let I=o=>{let k=[...r.values()].find(L=>Ce(o,{origin:L.origin,source:L.window,channel:L.channel}));k&&S(k,o.data)};function S(o,k){if(k.type==="catalog"){let L=be(k.catalog);if(!L)return;let R=!o.ready;if(o.ready=!0,o.catalog=L,o.lastSeen=Date.now(),p.catalogRevision++,R&&f(o),o.waiting){let J=o.waiting;o.waiting=null,N(o,J).catch($=>{p.error=$.message,t.emit()})}E(),t.emit()}else if(k.type==="result"){let L=s.get(k.id);if(!L||L.entry!==o)return;clearTimeout(L.timer),s.delete(k.id),k.ok?L.resolve(k.value):L.reject(new Error(String(k.error||"\u64CD\u4F5C\u5931\u8D25\u3002").slice(0,1e3)))}else k.type==="return"?p.showWindows():k.type==="sidebar"&&e.layout.toggleSidebar()}window.addEventListener("message",I);let y=new MutationObserver(()=>{for(let o of r.values())o.ready&&f(o)});y.observe(document.body,{attributes:!0,attributeFilter:["data-ds-dark-theme","style"]});let O=()=>{let o=JSON.stringify(xe(e));o!==h&&(h=o,t.emit())},g=()=>{if(t.state?.mode==="windows-host")for(let o of t.state.native?.instances||[]){let k=We(o.settings);if(!o.running?.openUrl||r.get(k)?.url||d.has(k)||i.has(k))continue;let L;try{L=new URL(o.running.openUrl).origin}catch{continue}w.get(k)!==L&&(w.set(k,L),i.add(k),p.adopt({settings:o.settings,url:o.running.openUrl},{},!1).catch(R=>{p.error=R.message}).finally(()=>{i.delete(k),t.emit()}))}},P=[e.sessions.list.subscribe(O),e.workspaces.list.subscribe(O),e.layout.panelInfo.subscribe(()=>{t.emit()}),t.subscribe(g)];return g(),p.dispose=()=>{a.abort(),y.disconnect(),clearTimeout(u),window.removeEventListener("message",I);for(let o of P)o();for(let o of r.values())x(o,"\u7A97\u53E3\u5DF2\u5173\u95ED\u3002")},p}var Z=require("react"),X=require("@deepseek-ai/dsh-client-ui-primitives");function Ot(e,n,t,r){if(!he(e)||!["next","request"].includes(t)||!/^[a-zA-Z0-9-]{32,64}$/.test(n))throw new Error("\u684C\u9762 WSL \u901A\u9053\u53C2\u6570\u65E0\u6548\u3002");return`(() => { if (location.origin !== ${JSON.stringify(e)} || location.pathname !== '/') return null; const api = window[${JSON.stringify(ge)}]; return api ? api[${JSON.stringify(t)}](...${JSON.stringify([n,...r])}) : null; })()`}function nt({host:e,entry:n,bridge:t,onMessage:r,onError:s,createElement:a=()=>document.createElement("webview")}){let d=!1,i,w,c,m=0,v,u,h=C=>new Promise(N=>{u=N,v=setTimeout(()=>{u=null,N()},C)}),p=(C,...N)=>d||!i||new URL(i.getURL()).origin!==n.origin?Promise.reject(new Error("WSL \u9875\u9762\u5C1A\u672A\u8FDE\u63A5\u6216\u5DF2\u79BB\u5F00\u6240\u5C5E\u73AF\u5883\u3002")):i.executeJavaScript(Ot(n.origin,n.channel,C,N));async function E(C){let N=0,x=Date.now()+45e3;try{for(;!d&&C===m;){let f=await p("next",N);if(d||C!==m)return;if(!f){if(Date.now()>x)throw new Error("Linux \u5BF9\u8BDD\u63D2\u4EF6\u5C1A\u672A\u5C31\u7EEA\uFF0C\u8BF7\u91CD\u65B0\u8FDE\u63A5\u3002");await h(250);continue}if(f.closed)return;if(!Number.isSafeInteger(f.sequence)||f.sequence<N)throw new Error("WSL \u9875\u9762\u8FD4\u56DE\u4E86\u65E0\u6548\u6E38\u6807\u3002");N=f.sequence,f.catalog&&r({type:"catalog",catalog:f.catalog});for(let I of(f.signals||[]).slice(0,16))["return","sidebar"].includes(I.type)&&r({type:I.type})}}catch(f){!d&&C===m&&s(f)}}let W={async request(C,N){let x=await p("request",C,N);if(!x?.ok)throw new Error(x?.error||"WSL \u9875\u9762\u5C1A\u672A\u8FDE\u63A5\u3002");return x.value},dispose(){d||(d=!0,m++,clearTimeout(v),u?.(),c?.(),i?.remove(),w&&t.release(w).catch(()=>{}))}};return(async()=>{if(!t?.acquire||!t?.release)throw new Error("\u5F53\u524D DSH \u684C\u9762\u7AEF\u6CA1\u6709\u9694\u79BB\u6D4F\u89C8\u5668\u63A5\u53E3\uFF0C\u8BF7\u66F4\u65B0 DSH \u6216\u4F7F\u7528 Web \u5165\u53E3\u3002");let C=await t.acquire("dsh-wsl-native:"+n.key);if(w=C.lease,d){await t.release(w);return}i=a(),i.className="dsh-wsl-desktop-view",i.setAttribute("name",w),i.setAttribute("partition",C.partition),i.setAttribute("allowpopups",""),i.setAttribute("aria-label",`WSL ${n.settings.distro} \u539F\u751F DSH \u5BF9\u8BDD`),i.setAttribute("src","about:blank#"+w);let N=!0;i.addEventListener("dom-ready",()=>{d||(N?(N=!1,i.loadURL(n.url).catch(x=>{d||s(x)})):E(++m))}),i.addEventListener("did-start-navigation",x=>{x.isMainFrame&&!x.isInPlace&&m++}),i.addEventListener("did-fail-load",x=>{!d&&x.isMainFrame&&x.errorCode!==-3&&s(new Error("WSL \u9875\u9762\u52A0\u8F7D\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5 Linux \u5B9E\u4F8B\u5E76\u91CD\u65B0\u8FDE\u63A5\u3002"))}),i.addEventListener("render-process-gone",()=>{m++,d||s(new Error("WSL \u5BF9\u8BDD\u9875\u9762\u5DF2\u9000\u51FA\uFF0C\u540E\u53F0\u5BBF\u4E3B\u4ECD\u72EC\u7ACB\u8FD0\u884C\u3002\u8BF7\u91CD\u65B0\u8FDE\u63A5\u3002"))}),c=t.onOpenRequested?.(w,x=>{!d&&/^https?:/.test(x)&&window.open(x,"_blank","noopener")}),e.append(i)})().catch(C=>{d||s(C)}),W}var Y=require("react"),ee=require("@deepseek-ai/dsh-client-ui-primitives");var B=require("react/jsx-runtime"),Et={switch:"M4 7h16m-4-4 4 4-4 4M20 17H4m4-4-4 4 4 4",search:"M10.5 17a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13Zm5-1.5L21 21",filter:"M4 6h16M7 12h10M10 18h4",plus:"M12 4v16M4 12h16"};function Ae({name:e}){return(0,B.jsx)("svg",{width:"15",height:"15",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:(0,B.jsx)("path",{d:Et[e]})})}function rt({ctx:e,model:n,wide:t,expandSidebar:r}){re(n);let s=n.conversations,a=s.nativeCatalog(),[d,i]=(0,Y.useState)("all"),[w,c]=(0,Y.useState)(""),[m,v]=(0,Y.useState)(35),[u,h]=(0,Y.useState)(!1),[p,E]=(0,Y.useState)(null),[W,C]=(0,Y.useState)(null),[N,x]=(0,Y.useState)(!1),f=(0,Y.useRef)(null),I=(0,Y.useRef)(null);if((0,Y.useEffect)(()=>{if(!W)return;let g=P=>{(!f.current?.contains(P.target)||P.key==="Escape")&&C(null)};return document.addEventListener("pointerdown",g),document.addEventListener("keydown",g),()=>{document.removeEventListener("pointerdown",g),document.removeEventListener("keydown",g)}},[W]),(0,Y.useEffect)(()=>{N&&I.current?.focus()},[N]),!t)return(0,B.jsx)("div",{className:"dsh-wsl-chat-rail",children:(0,B.jsx)(ee.Button,{variant:"ghost",icon:(0,B.jsx)(le,{size:18}),"aria-label":"\u5C55\u5F00\u5BF9\u8BDD\u5217\u8868",onClick:r})});let S=Pe(a,s.entries.values(),{filter:d,query:w,archived:u}),y=g=>{window.matchMedia("(max-width:600px)").matches&&e.layout.toggleSidebar(),g()},O=g=>{let P=p;E(null),s.action(P,g)};return(0,B.jsxs)("section",{ref:f,className:"dsh-wsl-conversations","aria-label":"Windows \u4E0E WSL \u5BF9\u8BDD\u5217\u8868",children:[(0,B.jsxs)("div",{className:"dsh-wsl-compact-heading",children:[(0,B.jsx)("span",{children:u?"\u5DF2\u5F52\u6863":d==="wsl"?"WSL \u5BF9\u8BDD":d==="windows"?"Windows \u5BF9\u8BDD":"\u5BF9\u8BDD"}),(0,B.jsx)("button",{type:"button",className:"dsh-wsl-icon-button","aria-label":"\u5207\u6362\u5230\u539F\u751F\u5DE5\u4F5C\u533A",title:"\u5207\u6362\u5230\u539F\u751F\u5DE5\u4F5C\u533A",onClick:()=>s.setUnified(!1),children:(0,B.jsx)(Ae,{name:"switch"})}),(0,B.jsxs)("div",{className:"dsh-wsl-heading-actions",children:[(0,B.jsx)("button",{type:"button",className:"dsh-wsl-icon-button","aria-label":"\u641C\u7D22\u5BF9\u8BDD",title:"\u641C\u7D22\u5BF9\u8BDD","aria-expanded":N,onClick:()=>{x(!N),N&&c(""),C(null)},children:(0,B.jsx)(Ae,{name:"search"})}),(0,B.jsx)("button",{type:"button",className:"dsh-wsl-icon-button","aria-label":"\u7B5B\u9009\u5BF9\u8BDD",title:"\u7B5B\u9009\u4E0E\u5F52\u6863","aria-expanded":W==="filter",onClick:()=>C(W==="filter"?null:"filter"),children:(0,B.jsx)(Ae,{name:"filter"})}),(0,B.jsx)("button",{type:"button",className:"dsh-wsl-icon-button","aria-label":"\u65B0\u5EFA WSL \u5DE5\u4F5C\u533A",title:"\u65B0\u5EFA WSL \u5DE5\u4F5C\u533A",onClick:()=>s.requestWorkspace(),children:(0,B.jsx)(Ae,{name:"plus"})})]})]}),W&&(0,B.jsx)("div",{className:"dsh-wsl-list-popover",role:"group","aria-label":"\u5BF9\u8BDD\u7B5B\u9009",children:(0,B.jsxs)(B.Fragment,{children:[[["all","\u5168\u90E8\u73AF\u5883"],["windows","Windows"],["wsl","WSL"]].map(([g,P])=>(0,B.jsxs)("button",{type:"button","aria-pressed":d===g,onClick:()=>{i(g),v(35),C(null)},children:[P,d===g?" \u2713":""]},g)),(0,B.jsx)("button",{type:"button",className:"dsh-wsl-menu-divider","aria-pressed":u,onClick:()=>{h(!u),C(null)},children:u?"\u663E\u793A\u5F53\u524D\u5BF9\u8BDD":"\u663E\u793A\u5DF2\u5F52\u6863\u5BF9\u8BDD"})]})}),N&&(0,B.jsx)(ee.Input,{ref:I,"aria-label":"\u641C\u7D22\u5BF9\u8BDD\u6216\u5DE5\u4F5C\u76EE\u5F55",placeholder:"\u641C\u7D22\u5BF9\u8BDD\u6216\u76EE\u5F55",value:w,onChange:g=>{c(g.target.value),v(35)},onKeyDown:g=>{g.key==="Escape"&&(c(""),x(!1))}}),s.error&&(0,B.jsx)("div",{className:"dsh-wsl-chat-list-error",role:"alert",children:s.error}),(0,B.jsxs)("div",{className:"dsh-wsl-chat-rows",role:"list","aria-label":u?"\u5DF2\u5F52\u6863\u5BF9\u8BDD":"\u6240\u6709\u73AF\u5883\u7684\u5BF9\u8BDD",children:[S.slice(0,m).map(g=>{let P=g.environment?s.visible()&&s.activeKey===g.environment.key&&g.environment.catalog.selectedId===g.id:!e.layout.panelInfo.getSnapshot().activePanelId&&a.selectedId===g.id;return(0,B.jsxs)("div",{className:`dsh-wsl-chat-row${P?" is-selected":""}`,role:"listitem",children:[(0,B.jsxs)("button",{type:"button",className:"dsh-wsl-chat-row-open","aria-current":P?"page":void 0,disabled:u,"aria-label":`${g.environment?"WSL":"Windows"} \u5BF9\u8BDD\uFF1A${g.title}`,title:`${g.environment?`WSL \xB7 ${g.environment.settings.distro}`:"Windows"}
${g.cwd}`,onClick:()=>y(()=>void s.openRow(g)),children:[(0,B.jsx)("span",{className:"dsh-wsl-chat-dot",children:g.running?(0,B.jsx)(ee.StateDot,{state:"ongoing"}):g.pinned?"\u2022":null}),(0,B.jsx)("span",{className:"dsh-wsl-chat-row-text",children:(0,B.jsx)("span",{children:g.title||"\u65B0\u5BF9\u8BDD"})}),g.environment&&(0,B.jsx)("span",{className:"dsh-wsl-chat-mark",title:`WSL \xB7 ${g.environment.settings.distro}`,children:"WSL"})]}),(0,B.jsx)("button",{type:"button",className:"dsh-wsl-chat-more","aria-label":`\u7BA1\u7406\u5BF9\u8BDD\uFF1A${g.title}`,onClick:()=>E(g),children:"\u22EF"})]},g.key)}),S.length>m&&(0,B.jsxs)(ee.Button,{variant:"ghost",onClick:()=>v(m+35),children:["\u663E\u793A\u66F4\u591A\uFF08",S.length-m,"\uFF09"]}),!S.length&&(0,B.jsx)("div",{className:"dsh-wsl-chat-empty",children:w?"\u6CA1\u6709\u5339\u914D\u7684\u5BF9\u8BDD":u?"\u6CA1\u6709\u5DF2\u5F52\u6863\u5BF9\u8BDD":"\u70B9\u51FB\u4E0A\u65B9 Windows \u6216 WSL \u5F00\u59CB\u5BF9\u8BDD"})]}),s.busy&&(0,B.jsxs)("div",{className:"dsh-wsl-chat-list-foot",role:"status",children:[(0,B.jsx)(ee.StateDot,{state:"ongoing"}),"\u6B63\u5728\u51C6\u5907 WSL\u2026"]}),(0,B.jsx)(ee.Modal,{open:!!p,onClose:()=>E(null),title:p?.title||"\u7BA1\u7406\u5BF9\u8BDD",children:p&&(0,B.jsxs)("div",{className:"dsh-wsl-chat-menu",children:[(0,B.jsxs)("p",{children:[p.environment?`WSL \xB7 ${p.environment.settings.distro}`:"Windows"," \xB7 ",p.cwd]}),!p.archived&&(0,B.jsx)(ee.Button,{onClick:()=>O(p.pinned?"unpin":"pin"),children:p.pinned?"\u53D6\u6D88\u7F6E\u9876":"\u7F6E\u9876\u5BF9\u8BDD"}),(0,B.jsx)(ee.Button,{onClick:()=>O(p.archived?"unarchive":"archive"),children:p.archived?"\u6062\u590D\u5BF9\u8BDD":"\u5F52\u6863\u5BF9\u8BDD"}),!p.archived&&(0,B.jsx)(ee.Button,{onClick:()=>{s.requestHandoff({id:p.id,row:p,entry:p.environment||null}),E(null)},children:"\u4EA4\u63A5\u5DE5\u4F5C\u2026"}),p.environment?.url&&(0,B.jsx)(ee.Button,{variant:"ghost",onClick:()=>{s.closeView(p.environment),E(null)},children:"\u5173\u95ED\u73AF\u5883\u9875\u9762\uFF08\u4FDD\u7559\u540E\u53F0\u4EFB\u52A1\uFF09"})]})})]})}function it(e,n){let t=document,r,s,a,d=!1,i,w=(x,f,I,S)=>{let y=t.createElement("button");y.type="button",y.className=f,y.title=x,y.setAttribute("aria-label",x);let O=t.createElementNS("http://www.w3.org/2000/svg","svg");for(let[P,o]of Object.entries({width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"1.5","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":"true"}))O.setAttribute(P,o);let g=t.createElementNS(O.namespaceURI,"path");return g.setAttribute("d",I),O.append(g),y.append(O),y.addEventListener("click",S),y},c=w("\u5207\u6362\u5230\u7D27\u51D1\u5BF9\u8BDD\u5217\u8868","dsh-wsl-icon-button dsh-wsl-native-toggle","M4 7h16m-4-4 4 4-4 4M20 17H4m4-4-4 4 4 4",()=>n.conversations.setUnified(!0)),m=w("\u65B0\u5EFA WSL \u5DE5\u4F5C\u533A","dsh-wsl-icon-button","M3 7V5h6l2 2h10v13H3V7m9 4v6m-3-3h6",()=>n.conversations.requestWorkspace());m.dataset.dshWslOwned="";let v=t.createElement("div");v.className="dsh-wsl-new-pair",v.dataset.dshWslOwned="";let u=w("\u65B0\u5EFA Windows \u5BF9\u8BDD","dsh-wsl-new-windows","M3 4h18v13H3zM8 21h8m-4-4v4",()=>n.conversations.newWindows()),h=w("\u65B0\u5EFA WSL \u5BF9\u8BDD","dsh-wsl-new-linux","M3 5h18v14H3zM7 9l3 3-3 3m6 0h4",()=>void n.conversations.newLinux(n.conversations.entries.get(n.conversations.activeKey)));for(let[x,f]of[[u,"Windows"],[h,"WSL"]]){let I=t.createElement("span");I.textContent=f,x.append(I)}v.append(u,h);let p=new Set;function E(){if(a=null,d||n.state?.mode!=="windows-host")return;let I=t.querySelector("[data-shell-overlay]")?.parentElement?.querySelector(":scope > [data-rightbar-col]")?.previousElementSibling?.previousElementSibling;if(!I)return;s!==I&&(r?.disconnect(),s=I,r=new MutationObserver(O=>{O.some(g=>!g.target.closest?.("[data-dsh-wsl-owned]")&&[...g.addedNodes,...g.removedNodes].some(P=>!P.dataset||!("dshWslOwned"in P.dataset)))&&W()}),r.observe(s,{subtree:!0,childList:!0}));let S=s.querySelector('button[class*="newSession"]');S&&(i!==S&&(i?.removeAttribute("data-dsh-wsl-replaced"),i=S),S.setAttribute("data-dsh-wsl-replaced",""),v.previousElementSibling!==S&&S.after(v),v.classList.toggle("is-narrow",S.parentElement.getBoundingClientRect().width<160)),h.disabled=n.conversations.busy;let y=s.querySelector('[class*="sectionHeader"]');if(y&&!n.conversations.unified){let O=y.querySelector(":scope > span");c.parentElement!==y&&(O?O.after(c):y.prepend(c)),m.parentElement!==y&&y.append(m)}else c.remove(),m.remove();for(let O of p)O.isConnected||p.delete(O);for(let O of s.querySelectorAll('[data-row-key^="workspace:dsh-wsl:"]')){if(O.querySelector("[data-dsh-wsl-owned]"))continue;let g=t.createElement("span");g.dataset.dshWslOwned="",g.className="dsh-wsl-workspace-mark",g.textContent="WSL";let P=O.querySelector('[class*="projectText"]');P&&(P.after(g),p.add(g))}}function W(){!d&&!a&&(a=requestAnimationFrame(E))}let C=n.subscribe(W),N=e.slots.subscribe("sidebar.workspaces",W);return W(),()=>{d=!0,cancelAnimationFrame(a),r?.disconnect(),C(),N(),i?.removeAttribute("data-dsh-wsl-replaced"),v.remove(),c.remove(),m.remove();for(let x of p)x.remove()}}var lt=require("react"),te=require("@deepseek-ai/dsh-client-ui-primitives");var ke=(e,n,t)=>"dsh-wsl:"+JSON.stringify([e.key,n,t]);function at(e,n,t,r,s,a=[]){let d={...e,ids:[...e.ids],byId:{...e.byId}};if(s)for(let v of d.ids){let u=d.byId[v];u?.retainedBy?.mainView&&(d.byId[v]={...u,retainedBy:{...u.retainedBy,mainView:0}})}let i={...n,items:[...n.items],pinnedSessionIds:[...n.pinnedSessionIds],archivedSessionIds:[...n.archivedSessionIds]},w=new Map(t),c=new Map;for(let v of r){for(let u of v.catalog?.rows||[]){let h=ke(v,"session",u.id);c.set(h,{entry:v,id:u.id,row:u,kind:"session"}),d.ids.push(h),d.byId[h]={id:h,title:u.title,displayTitle:u.title,cwd:u.cwd,blank:u.blank,running:u.running,updatedAt:u.updatedAt,retainedBy:{mainView:s===v.key&&v.catalog.selectedId===u.id?1:0}},w.set(h,{running:u.running,completionUnread:!1}),u.pinned&&i.pinnedSessionIds.push(h),u.archived&&i.archivedSessionIds.push(h)}for(let u of v.catalog?.workspaces||[]){let h=ke(v,"workspace",u.workspaceId);c.set(h,{entry:v,id:u.workspaceId,workspace:u,kind:"workspace"}),i.items.push({...u,workspaceId:h,sessionIds:u.sessionIds.map(p=>ke(v,"session",p))})}}let m=new Map(a.map((v,u)=>[v,u]));return i.items.sort((v,u)=>(m.get(v.workspaceId)??1/0)-(m.get(u.workspaceId)??1/0)),{sessions:d,workspaces:i,status:w,targets:c}}function ot(e,n,t,r){if(!e.some(i=>i.workspaceId===t)||r!==void 0&&!e.some(i=>i.workspaceId===r))throw new Error("\u5DE5\u4F5C\u533A\u5217\u8868\u5DF2\u53D8\u5316\uFF0C\u8BF7\u91CD\u8BD5\u3002");let s=e.map(i=>i.workspaceId);if(t===r)return{order:s,beforeId:r};s.splice(s.indexOf(t),1),s.splice(r===void 0?s.length:s.indexOf(r),0,t);let a=n.get(t)?.entry.key,d=s.slice(s.indexOf(t)+1).find(i=>n.get(i)?.entry.key===a);return{order:s,beforeId:n.get(d)?.id??d}}var U=require("react/jsx-runtime");function dt(e,n,t){let r=Object.fromEntries(Object.entries(n||{}).map(([d,i])=>[t+d,i])),s=[];return{declarations:r,start:()=>{for(let d of Object.keys(n||{})){let i=[],w=()=>{i.splice(0).reverse().forEach(c=>c());for(let c of e.slots.entries(d)){let m=dt(e,c.children,t),v=c.component;i.push(e.slots.register({...c.options,name:t+d,...c.inject?{inject:c.inject}:{},...c.store?{store:c.store}:{},...c.locale?{locale:c.locale}:{},...c.children?{children:m.declarations}:{}},c.children?u=>(0,U.jsx)(v,{...u,renderSlot:(h,p,E)=>u.renderSlot(t+h,p,E)}):v)),c.children&&i.push(m.start())}};w(),s.push(e.slots.subscribe(d,w),()=>i.splice(0).reverse().forEach(c=>c()))}return()=>s.splice(0).reverse().forEach(d=>d())}}}function At({Native:e,ctx:n,model:t,prefix:r,...s}){re(t);let a=t.conversations,d=s.useSessions(f=>f),i=s.useWorkspaces(f=>f),w=s.useSessionStatus(f=>f),c=s.usePanelInfo(f=>f),m=[...a.entries.values()],v=a.visible()?a.activeKey:null,u=(0,lt.useMemo)(()=>at(d,i,w,m,v,a.workspaceOrder),[d,i,w,v,a.workspaceOrder,a.catalogRevision]),h=f=>u.targets.get(f),p=f=>void Promise.resolve().then(f).catch(I=>{a.error=I.message,t.emit()}),E=f=>{a.activeKey=f.key,n.layout.selectPanel(ce),t.emit()},W=async(f,I,S={})=>{let y=h(f);if(!y)throw new Error("WSL \u5DE5\u4F5C\u533A\u5DF2\u53D8\u5316\uFF0C\u8BF7\u91CD\u8BD5\u3002");await a.remote(y.entry,I,{[y.kind==="workspace"?"workspaceId":"sessionId"]:y.id,...S}),(I==="workspace.start"||I==="session.fork")&&E(y.entry)},C=(f,I)=>h(f)?a.requestRename({...h(f),title:I}):s.requestSessionRename(f,I),N=f=>f.row.running?(a.dialog={type:"archive",target:f},t.emit()):p(()=>a.remote(f.entry,"archive",{sessionId:f.id}));return(0,U.jsx)(e,{...s,useSessions:f=>f(u.sessions),useWorkspaces:f=>f(u.workspaces),useSessionStatus:f=>f(u.status),usePanelInfo:f=>f(v?{...c,activePanelId:null}:c),startSession:f=>h(f)?p(()=>W(f,"workspace.start")):s.startSession(f),open:f=>h(f)?void a.openRow({...h(f).row,environment:h(f).entry}):s.open(f),requestSessionRename:C,renameWorkspace:(f,I)=>h(f)?W(f,"workspace.rename",{title:I}):s.renameWorkspace(f,I),deleteWorkspace:f=>h(f)?W(f,"workspace.delete"):s.deleteWorkspace(f),insertWorkspaceBefore:async(f,I)=>{if(f===I)return;let S=ot(u.workspaces.items,u.targets,f,I);h(f)?await W(f,"workspace.reorder",{beforeId:S.beforeId}):await s.insertWorkspaceBefore(f,S.beforeId),a.setWorkspaceOrder(S.order)},unarchiveSession:f=>h(f)?W(f,"unarchive"):s.unarchiveSession(f),searchSessions:async(f,I)=>{let S=await Promise.all([s.searchSessions(f,I),...m.filter(O=>O.ready).map(async O=>{let g=await a.remote(O,"search",{query:f});return{...g,items:g.items.map(P=>({...P,sessionId:ke(O,"session",P.sessionId)}))}})]);if(I?.aborted)throw new DOMException("\u641C\u7D22\u5DF2\u53D6\u6D88","AbortError");let y=S.flatMap(O=>O.items);return{items:y.slice(0,s.searchResultLimit),hasMore:y.length>s.searchResultLimit||S.some(O=>O.hasMore)}},renderSlot:(f,I,S)=>{let y=h(I.sessionId);if(!y)return s.renderSlot(r+f,I,S);if(f==="sidebar.workspaces.session.menu.item"){let O=g=>()=>{S?.hookContext?.[1]?.(!1),g()};return(0,U.jsxs)(U.Fragment,{children:[!y.row.archived&&(0,U.jsx)(te.MenuItemButton,{icon:(0,U.jsx)(te.IconPinOutlineRegular,{}),onSelect:O(()=>p(()=>W(I.sessionId,y.row.pinned?"unpin":"pin"))),children:y.row.pinned?"\u53D6\u6D88\u7F6E\u9876":"\u7F6E\u9876\u5BF9\u8BDD"}),(0,U.jsx)(te.MenuItemButton,{icon:(0,U.jsx)(te.IconEditOutlineRegular,{}),onSelect:O(()=>C(I.sessionId,I.displayTitle)),children:"\u91CD\u547D\u540D"}),(0,U.jsx)(te.MenuItemButton,{onSelect:O(()=>p(()=>W(I.sessionId,"session.fork"))),children:"\u521B\u5EFA\u5206\u652F"}),(0,U.jsx)(te.MenuItemButton,{onSelect:O(()=>a.requestHandoff?.(y)),children:"\u4EA4\u63A5\u5DE5\u4F5C\u2026"}),(0,U.jsx)(te.MenuItemButton,{icon:(0,U.jsx)(te.IconArchiveOutlineRegular,{}),onSelect:O(()=>y.row.archived?p(()=>W(I.sessionId,"unarchive")):N(y)),children:y.row.archived?"\u53D6\u6D88\u5F52\u6863":"\u5F52\u6863\u5BF9\u8BDD"})]})}return f==="sidebar.workspaces.session.row.action"&&!y.row.archived?(0,U.jsxs)(U.Fragment,{children:[(0,U.jsx)("button",{className:"dsh-wsl-row-action",title:"\u5F52\u6863\u5BF9\u8BDD","aria-label":"\u5F52\u6863 WSL \u5BF9\u8BDD",onClick:()=>N(y),children:(0,U.jsx)(te.IconArchiveOutlineRegular,{size:14})}),(0,U.jsx)("button",{className:"dsh-wsl-row-action",title:y.row.pinned?"\u53D6\u6D88\u7F6E\u9876":"\u7F6E\u9876\u5BF9\u8BDD","aria-label":y.row.pinned?"\u53D6\u6D88\u7F6E\u9876 WSL \u5BF9\u8BDD":"\u7F6E\u9876 WSL \u5BF9\u8BDD",onClick:()=>p(()=>W(I.sessionId,y.row.pinned?"unpin":"pin")),children:(0,U.jsx)(te.IconPinOutlineRegular,{size:14})})]}):f==="sidebar.session.row.hover"?(0,U.jsxs)("div",{className:"dsh-wsl-caption",children:["WSL \xB7 ",y.entry.settings.distro," \xB7 ",y.entry.settings.user||"\u9ED8\u8BA4\u7528\u6237"]}):null}})}function ct(e,n){let t,r,s=!1,a=()=>{if(!s){s=!0;try{let w=e.slots.entries("sidebar.workspaces").find(p=>p.locale==="workspace"&&p.children?.["sidebar.workspaces.directoryFlow"]),c=n.state?.mode==="windows-host";if(r===w&&!!t==!!c||(t?.(),t=null,r=w,!c||!w))return;let m="dsh-wsl-native.",v=dt(e,w.children,m),u=e.slots.register({name:"sidebar.workspaces",priority:-60,inject:w.inject,store:w.store,locale:w.locale,children:v.declarations},p=>(0,U.jsx)(At,{...p,Native:w.component,ctx:e,model:n,prefix:m})),h=v.start();t=()=>{h(),u()}}finally{s=!1}}},d=n.subscribe(a),i=e.slots.subscribe("sidebar.workspaces",a);return a(),()=>{d(),i(),t?.()}}var oe=require("react"),G=require("@deepseek-ai/dsh-client-ui-primitives");var ae=require("react"),fe=require("@deepseek-ai/dsh-client-ui-primitives");var T=require("react/jsx-runtime");function pt({model:e,source:n,close:t}){let r=e.conversations,s=(0,ae.useMemo)(()=>[{key:"windows",label:"Windows",entry:null,catalog:r.nativeCatalog()},...[...r.entries.values()].map(g=>({key:g.key,entry:g,catalog:g.catalog,label:`WSL \xB7 ${g.settings.distro}${g.settings.user?" \xB7 "+g.settings.user:""}`}))].filter(g=>g.key!==(n.entry?.key||"windows")),[n,r]),[a,d]=(0,ae.useState)(s[0]?.key||""),[i,w]=(0,ae.useState)(""),[c,m]=(0,ae.useState)(""),[v,u]=(0,ae.useState)(""),[h,p]=(0,ae.useState)(!1),[E,W]=(0,ae.useState)(""),[C,N]=(0,ae.useState)(()=>crypto.randomUUID()),x=s.find(g=>g.key===a),f=Xe(n,c,v),I=f.length>24e3,S=async()=>{p(!0),W("");try{let g=await r.handoff(n.entry,"handoff.read",{sessionId:n.id});u(g.text)}catch(g){W(g.message)}finally{p(!1)}},y=async g=>{p(!0),W("");try{let[P,o]=JSON.parse(i);await r.handoff(x.entry,"handoff.deliver",{transferId:C,mode:g,text:f,[P==="workspace"?"workspaceId":"sessionId"]:o}),t()}catch(P){W(P.message)}finally{p(!1)}},O=h||!i||!c.trim()&&!v.trim()||I;return(0,T.jsx)(fe.Modal,{open:!0,title:"\u8DE8\u73AF\u5883\u4EA4\u63A5\u5DE5\u4F5C",closeLabel:"\u5173\u95ED\u4EA4\u63A5",onClose:h?()=>{}:t,description:`\u6765\u6E90\uFF1A${n.entry?"WSL \xB7 "+n.entry.settings.distro:"Windows"} \xB7 ${n.row.title||"\u65B0\u5BF9\u8BDD"}`,className:"dsh-wsl-picker",footer:(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(fe.Button,{disabled:h,onClick:t,children:"\u53D6\u6D88"}),(0,T.jsx)(fe.Button,{variant:"outline",disabled:O,onClick:()=>void y("draft"),children:"\u653E\u5165\u76EE\u6807\u8F93\u5165\u6846"}),(0,T.jsx)(fe.Button,{variant:"primary",disabled:O,onClick:()=>void y("send"),children:"\u53D1\u9001\u4EA4\u63A5"})]}),children:(0,T.jsxs)("div",{className:"dsh-wsl-dialog-form",children:[s.length?(0,T.jsxs)(T.Fragment,{children:[(0,T.jsxs)("label",{children:["\u76EE\u6807\u73AF\u5883",(0,T.jsx)("select",{value:a,disabled:h,onChange:g=>{d(g.target.value),w(""),N(crypto.randomUUID())},children:s.map(g=>(0,T.jsx)("option",{value:g.key,children:g.label},g.key))})]}),(0,T.jsxs)("label",{children:["\u4EA4\u7ED9\u54EA\u6761\u5BF9\u8BDD",(0,T.jsxs)("select",{value:i,disabled:h,onChange:g=>{w(g.target.value),N(crypto.randomUUID())},children:[(0,T.jsx)("option",{value:"",children:"\u9009\u62E9\u5DF2\u6709\u5BF9\u8BDD\uFF0C\u6216\u5728\u5DE5\u4F5C\u533A\u4E2D\u65B0\u5EFA"}),(0,T.jsx)("optgroup",{label:"\u65B0\u5EFA\u5BF9\u8BDD",children:(x?.catalog?.workspaces||[]).map(g=>(0,T.jsxs)("option",{value:JSON.stringify(["workspace",g.workspaceId]),children:[g.title||g.path," \xB7 \u65B0\u5BF9\u8BDD"]},g.workspaceId))}),(0,T.jsx)("optgroup",{label:"\u5DF2\u6709\u5BF9\u8BDD",children:(x?.catalog?.rows||[]).filter(g=>!g.archived).map(g=>(0,T.jsxs)("option",{value:JSON.stringify(["session",g.id]),children:[g.title||"\u65B0\u5BF9\u8BDD",g.running?" \xB7 \u8FD0\u884C\u4E2D\uFF0C\u4EA4\u63A5\u5C06\u6392\u961F":""]},g.id))})]})]})]}):(0,T.jsx)("p",{children:"\u5148\u6253\u5F00\u53E6\u4E00\u8FB9\u7684\u73AF\u5883\uFF0C\u518D\u4ECE\u5BF9\u8BDD\u83DC\u5355\u53D1\u8D77\u4EA4\u63A5\u3002"}),(0,T.jsxs)("label",{children:["\u5DE5\u4F5C\u8BF4\u660E",(0,T.jsx)("textarea",{value:c,disabled:h,maxLength:2e4,onChange:g=>m(g.target.value),placeholder:"\u5DF2\u5B8C\u6210\u7684\u5185\u5BB9\u3001\u76F8\u5173\u6587\u4EF6\u3001\u63A5\u4E0B\u6765\u9700\u8981\u505A\u7684\u5DE5\u4F5C\u2026"})]}),(0,T.jsxs)("div",{children:[(0,T.jsx)(fe.Button,{size:"sm",variant:"outline",disabled:h,onClick:()=>void S(),children:"\u5E26\u5165\u6700\u8FD1\u5BF9\u8BDD"}),(0,T.jsx)("span",{className:"dsh-wsl-caption",children:"\u3000\u6700\u591A 8 \u6761\u6587\u5B57\u6D88\u606F\uFF0C\u53EF\u5728\u4E0B\u65B9\u7F16\u8F91"})]}),v&&(0,T.jsxs)("label",{children:["\u5BF9\u8BDD\u6458\u5F55",(0,T.jsx)("textarea",{value:v,disabled:h,onChange:g=>u(g.target.value)})]}),(0,T.jsxs)("details",{children:[(0,T.jsx)("summary",{children:"\u9884\u89C8\u5B8C\u6574\u4EA4\u63A5\u5185\u5BB9"}),(0,T.jsx)("pre",{className:"dsh-wsl-handoff-preview",children:f})]}),(0,T.jsx)("p",{className:"dsh-wsl-caption",children:"\u53D1\u9001\u540E\uFF0C\u8FD0\u884C\u4E2D\u7684\u76EE\u6807\u5BF9\u8BDD\u4F1A\u5C06\u4EA4\u63A5\u6392\u961F\u5904\u7406\u3002\u6765\u6E90\u4EFB\u52A1\u7EE7\u7EED\u8FD0\u884C\uFF0C\u6587\u4EF6\u4FDD\u6301\u539F\u4F4D\u7F6E\u3002"}),I&&(0,T.jsx)("p",{role:"alert",children:"\u5185\u5BB9\u8D85\u8FC7 24,000 \u4E2A\u5B57\u7B26\uFF0C\u8BF7\u7CBE\u7B80\u5DE5\u4F5C\u8BF4\u660E\u6216\u5BF9\u8BDD\u6458\u5F55\u3002"}),E&&(0,T.jsx)("p",{role:"alert",className:"dsh-wsl-inline-error",children:E})]})})}var z=require("react/jsx-runtime");function Bt({model:e,api:n,close:t}){let r=e.conversations,[s,a]=(0,oe.useState)(()=>ue(r.entries.get(r.activeKey)?.settings||e.state?.settings||{},e.state?.distros)),[d,i]=(0,oe.useState)(!1),[w,c]=(0,oe.useState)(!1),[m,v]=(0,oe.useState)(""),u=async h=>{i(!1),a(p=>({...p,directory:h})),c(!0),v(""),await r.enter({...s,directory:h},{create:!0}),c(!1),r.error?v(r.error):t()};return d?(0,z.jsx)(Ne,{api:n,distro:s.distro,user:s.user,initialPath:s.directory,allowCreate:!0,onClose:()=>i(!1),onSelect:u}):(0,z.jsx)(G.Modal,{open:!0,onClose:w?()=>{}:t,title:"\u65B0\u5EFA WSL \u5DE5\u4F5C\u533A",closeLabel:"\u5173\u95ED",description:"\u9009\u62E9 Linux \u6587\u4EF6\u5939\uFF0C\u6216\u5728\u6D4F\u89C8\u76EE\u5F55\u65F6\u65B0\u5EFA\u6587\u4EF6\u5939\u3002",className:"dsh-wsl-picker",footer:(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(G.Button,{disabled:w,onClick:t,children:"\u53D6\u6D88"}),(0,z.jsx)(G.Button,{variant:"primary",disabled:w||!s.distro||!s.directory.trim(),onClick:()=>void u(s.directory.trim()),children:w?"\u6B63\u5728\u6253\u5F00\u2026":"\u521B\u5EFA\u5DE5\u4F5C\u533A"})]}),children:(0,z.jsxs)("div",{className:"dsh-wsl-dialog-form",children:[(0,z.jsxs)("label",{children:["Linux \u53D1\u884C\u7248",(0,z.jsx)("select",{value:s.distro,disabled:w,onChange:h=>a({distro:h.target.value,user:"",directory:""}),children:(e.state?.distros||[]).map(h=>(0,z.jsx)("option",{children:h.name},h.name))})]}),(0,z.jsxs)("label",{children:["Linux \u7528\u6237",(0,z.jsx)(G.Input,{value:s.user,disabled:w,placeholder:"\u9ED8\u8BA4\u7528\u6237",onChange:h=>a({...s,user:h.target.value})})]}),(0,z.jsxs)("label",{children:["\u5DE5\u4F5C\u533A\u6587\u4EF6\u5939",(0,z.jsxs)("div",{className:"dsh-wsl-pathbar",children:[(0,z.jsx)(G.Input,{value:s.directory,disabled:w,placeholder:"/home/\u7528\u6237\u540D/\u9879\u76EE",onChange:h=>a({...s,directory:h.target.value})}),(0,z.jsx)(G.Button,{variant:"outline",disabled:w||!s.distro,onClick:()=>i(!0),children:"\u6D4F\u89C8\u2026"})]})]}),(0,z.jsx)("p",{className:"dsh-wsl-caption",children:"\u5DE5\u4F5C\u533A\u4F1A\u52A0\u5165\u5F53\u524D\u7A97\u53E3\u7684\u539F\u751F\u5217\u8868\uFF0C\u5E76\u663E\u793A WSL \u6807\u5FD7\u3002"}),m&&(0,z.jsx)("div",{role:"alert",className:"dsh-wsl-inline-error",children:m})]})})}function Mt({model:e,target:n,close:t}){let[r,s]=(0,oe.useState)(n.title||n.row.title),[a,d]=(0,oe.useState)(!1),[i,w]=(0,oe.useState)(""),c=async()=>{d(!0),w("");try{await e.conversations.remote(n.entry,"session.rename",{sessionId:n.id,title:r}),t()}catch(m){w(m.message)}finally{d(!1)}};return(0,z.jsx)(G.Modal,{open:!0,onClose:a?()=>{}:t,title:"\u91CD\u547D\u540D WSL \u5BF9\u8BDD",closeLabel:"\u5173\u95ED",footer:(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(G.Button,{disabled:a,onClick:t,children:"\u53D6\u6D88"}),(0,z.jsx)(G.Button,{variant:"primary",disabled:a||!r.trim(),onClick:()=>void c(),children:"\u4FDD\u5B58"})]}),children:(0,z.jsxs)("form",{className:"dsh-wsl-dialog-form",onSubmit:m=>{m.preventDefault(),!a&&r.trim()&&c()},children:[(0,z.jsx)(G.Input,{"data-modal-autofocus":!0,value:r,maxLength:500,"aria-label":"\u5BF9\u8BDD\u540D\u79F0",onChange:m=>s(m.target.value)}),i&&(0,z.jsx)("div",{role:"alert",children:i})]})})}function Rt({model:e,target:n,close:t}){let[r,s]=(0,oe.useState)(!1),[a,d]=(0,oe.useState)(""),i=async()=>{s(!0);try{await e.conversations.remote(n.entry,"archive",{sessionId:n.id,stopActivity:!0}),t()}catch(w){d(w.message)}finally{s(!1)}};return(0,z.jsx)(G.Modal,{open:!0,title:"\u5F52\u6863\u6B63\u5728\u8FD0\u884C\u7684 WSL \u5BF9\u8BDD",closeLabel:"\u5173\u95ED",onClose:r?()=>{}:t,description:"\u5F52\u6863\u4F1A\u505C\u6B62\u8FD9\u6761\u5BF9\u8BDD\u7684\u8FD0\u884C\u4EFB\u52A1\uFF0C\u5386\u53F2\u8BB0\u5F55\u4FDD\u7559\u3002",footer:(0,z.jsxs)(z.Fragment,{children:[(0,z.jsx)(G.Button,{disabled:r,onClick:t,children:"\u53D6\u6D88"}),(0,z.jsx)(G.Button,{disabled:r,onClick:()=>void i(),children:"\u505C\u6B62\u5E76\u5F52\u6863"})]}),children:a&&(0,z.jsx)("p",{role:"alert",children:a})})}function ut({model:e,api:n}){re(e);let t=e.conversations.dialog,r=()=>{e.conversations.dialog=null,e.emit()};return t?t.type==="workspace"?(0,z.jsx)(Bt,{model:e,api:n,close:r}):t.type==="rename"?(0,z.jsx)(Mt,{model:e,target:t.target,close:r}):t.type==="archive"?(0,z.jsx)(Rt,{model:e,target:t.target,close:r}):t.type==="handoff"?(0,z.jsx)(pt,{model:e,source:t.source,close:r}):null:e.conversations.error&&!e.conversations.visible()?(0,z.jsxs)("div",{role:"alert",className:"dsh-wsl-operation-error",children:[(0,z.jsx)("span",{children:e.conversations.error}),(0,z.jsx)(G.Button,{variant:"ghost","aria-label":"\u5173\u95ED\u9519\u8BEF\u63D0\u793A",onClick:()=>{e.conversations.error=null,e.emit()},children:"\xD7"})]}):null}var M=require("react/jsx-runtime");function zt({ctx:e,sessionId:n,useStore:t,actions:r}){let s=t(d=>d.draft),a=(0,Z.useRef)(s);return a.current=s,(0,Z.useEffect)(()=>Ge(e,n,{getDraft:()=>a.current,setDraft:d=>{a.current=d,r.setDraft(d)}}),[e,n,r]),null}function ht({distro:e,connected:n=!0}){return(0,M.jsxs)("span",{className:`dsh-wsl-chat-mark${n?"":" is-offline"}`,title:`WSL \xB7 ${e||"Linux"}`,children:[(0,M.jsx)(le,{size:12}),"WSL"]})}function Dt({ctx:e,model:n}){re(n);let t=(0,Z.useRef)(null),r=n.conversations,s=r.entries.get(r.activeKey)?.ready;return(0,Z.useLayoutEffect)(()=>(r.setAnchor(t.current),()=>r.setAnchor(null)),[r]),(0,M.jsx)("div",{className:"dsh-wsl-chat-target",ref:t,children:!s&&(0,M.jsxs)("div",{className:"dsh-wsl-chat-loading",children:[(0,M.jsx)(X.StateDot,{state:"ongoing"}),"\u6B63\u5728\u8FDE\u63A5 WSL \u5BF9\u8BDD\u2026",(0,M.jsx)(X.Button,{variant:"ghost",onClick:()=>e.layout.selectPanel("dsh-wsl-native"),children:"\u67E5\u770B\u73AF\u5883"}),(0,M.jsx)(X.Button,{variant:"ghost",onClick:()=>r.showWindows(),children:"\u8FD4\u56DE Windows \u5BF9\u8BDD"})]})})}function Pt({entry:e,model:n,visible:t}){let r=(0,Z.useRef)(null);return(0,Z.useEffect)(()=>{let s=n.conversations,a=nt({host:r.current,entry:e,bridge:window.dshDesktop?.browser,onMessage:d=>s.desktopMessage(e,d),onError:d=>s.desktopError(e,d)});return e.desktop=a,()=>{a.dispose(),e.desktop===a&&(e.desktop=null)}},[e,n]),(0,M.jsx)("div",{className:"dsh-wsl-desktop-surface",ref:r,inert:!t||!!e.navigating,style:{visibility:t&&e.ready?"visible":"hidden"}})}function Tt({entry:e,model:n,visible:t,rect:r,ctx:s}){let a=n.conversations,[d,i]=(0,Z.useState)(!1);(0,Z.useEffect)(()=>{let c=setTimeout(()=>i(!0),45e3);return()=>clearTimeout(c)},[e.channel]);let w=e.catalog?.rows.find(c=>c.id===e.catalog.selectedId);return(0,M.jsxs)("section",{className:"dsh-wsl-resident","aria-label":`WSL \xB7 ${e.settings.distro} \u5BF9\u8BDD`,"aria-hidden":!t,inert:!t,style:t&&r?{top:r.top,left:r.left,width:r.width,height:r.height}:{visibility:"hidden",left:-2e4,top:0,width:r?.width||1e3,height:r?.height||800},children:[(0,M.jsxs)("header",{className:"dsh-wsl-chat-toolbar",children:[(0,M.jsx)(X.Button,{variant:"ghost",icon:(0,M.jsx)(X.IconPanelLeftOutlineRegular,{}),"aria-label":"\u5C55\u5F00\u6216\u6536\u8D77\u5BF9\u8BDD\u5217\u8868",title:"\u5C55\u5F00\u6216\u6536\u8D77\u5BF9\u8BDD\u5217\u8868",onClick:()=>s.layout.toggleSidebar()}),(0,M.jsx)(ht,{distro:e.settings.distro,connected:e.catalog?.connected}),(0,M.jsxs)("span",{className:"dsh-wsl-chat-context",title:w?.cwd||e.settings.directory,children:[e.settings.distro,(0,M.jsxs)("span",{children:[" \xB7 ",w?.cwd?.split("/").filter(Boolean).at(-1)||"Linux"]})]}),(0,M.jsxs)("div",{className:"dsh-wsl-chat-toolbar-actions",children:[(0,M.jsx)(X.Button,{variant:"ghost",disabled:!e.ready||a.busy,onClick:()=>void a.newLinux(e),children:"\u65B0\u5BF9\u8BDD"}),(0,M.jsx)(X.Button,{variant:"ghost",disabled:!e.ready||!w,onClick:()=>a.requestHandoff({entry:e,id:w.id,row:w}),children:"\u4EA4\u63A5\u5DE5\u4F5C"}),(0,M.jsx)(X.Button,{variant:"ghost",disabled:!e.ready,title:"\u7BA1\u7406 Linux \u63D2\u4EF6\u4E0E\u914D\u7F6E",onClick:()=>a.toggleChrome(e),children:e.configOpen?"\u8FD4\u56DE\u5BF9\u8BDD":"Linux \u914D\u7F6E"})]})]}),a.error&&t&&(0,M.jsx)("div",{role:"alert",className:"dsh-wsl-chat-notice",children:a.error}),e.ready&&!e.catalog?.connected&&(0,M.jsxs)("div",{role:"status",className:"dsh-wsl-chat-notice",children:["WSL \u8FDE\u63A5\u5DF2\u4E2D\u65AD\uFF0C\u6062\u590D\u8FDE\u63A5\u540E\u53EF\u7EE7\u7EED\u4F7F\u7528\u3002",(0,M.jsx)(X.Button,{variant:"ghost",disabled:a.busy,onClick:()=>a.reconnect(e),children:"\u91CD\u65B0\u8FDE\u63A5"})]}),(0,M.jsxs)("div",{className:"dsh-wsl-chat-frame-body",children:[e.transport==="desktop"?(0,M.jsx)(Pt,{entry:e,model:n,visible:t}):(0,M.jsx)("iframe",{title:`WSL ${e.settings.distro} \u539F\u751F DSH \u5BF9\u8BDD`,src:e.url,ref:c=>a.bind(e,c),inert:!t||!!e.navigating,referrerPolicy:"no-referrer",allow:"clipboard-read; clipboard-write",style:{visibility:t&&e.ready?"visible":"hidden"}},e.channel),!e.ready&&(0,M.jsxs)("div",{className:"dsh-wsl-chat-loading",children:[(0,M.jsx)(X.StateDot,{state:"ongoing"}),(0,M.jsx)("span",{children:d?"WSL \u5BF9\u8BDD\u5C1A\u672A\u8FDE\u63A5\u3002\u53EF\u4EE5\u91CD\u65B0\u8FDE\u63A5\uFF0C\u6216\u67E5\u770B\u73AF\u5883\u4E2D\u7684\u542F\u52A8\u72B6\u6001\u3002":"\u6B63\u5728\u6253\u5F00 Linux \u5BF9\u8BDD\u2026"}),d&&(0,M.jsx)(X.Button,{onClick:()=>a.reconnect(e),children:"\u91CD\u65B0\u8FDE\u63A5"}),(0,M.jsx)(X.Button,{variant:"ghost",onClick:()=>a.showWindows(),children:"\u8FD4\u56DE Windows"})]})]})]})}function $t({ctx:e,model:n}){re(n);let[t,r]=(0,Z.useState)(null),s=n.conversations,a=s?.visible(),d=s?.anchor;return(0,Z.useLayoutEffect)(()=>{if(!d)return;let i,w=()=>{cancelAnimationFrame(i),i=requestAnimationFrame(()=>{let m=d.getBoundingClientRect();r({top:m.top,left:m.left,width:Math.max(0,document.documentElement.clientWidth-m.left),height:m.height})})},c=new ResizeObserver(w);return c.observe(d),window.addEventListener("resize",w),w(),()=>{c.disconnect(),window.removeEventListener("resize",w),cancelAnimationFrame(i)}},[d]),(0,Z.useEffect)(()=>(document.documentElement.toggleAttribute("data-dsh-wsl-conversation",!!a),()=>document.documentElement.removeAttribute("data-dsh-wsl-conversation")),[a]),n.state?.mode!=="windows-host"||!s?null:(0,M.jsx)(M.Fragment,{children:[...s.entries.values()].filter(i=>i.url).map(i=>(0,M.jsx)(Tt,{entry:i,model:n,ctx:e,visible:!!a&&!!d&&s.activeKey===i.key,rect:t},i.key+i.channel))})}function jt({model:e}){re(e);let n=(0,Z.useRef)(null),t=e.guest?.compact===!0;return(0,Z.useLayoutEffect)(()=>{let r=n.current?.closest("[data-shell-overlay]")?.parentElement;if(!r||!e.guest)return;let a=r.querySelector(":scope > [data-rightbar-col]")?.previousElementSibling,d=a?.previousElementSibling;d?.setAttribute("data-dsh-wsl-guest-sidebar",""),a?.setAttribute("data-dsh-wsl-guest-center",""),r.toggleAttribute("data-dsh-wsl-embedded",t);let i=()=>{let m=/minmax\(0px,\s*([\d.]+px)\)\s*$/.exec(r.style.gridTemplateColumns)?.[1]||"0px";r.style.getPropertyValue("--dsh-wsl-right-track")!==m&&r.style.setProperty("--dsh-wsl-right-track",m)},w=new MutationObserver(i);return w.observe(r,{attributes:!0,attributeFilter:["style"]}),i(),()=>{w.disconnect(),r.removeAttribute("data-dsh-wsl-embedded"),r.style.removeProperty("--dsh-wsl-right-track"),d?.removeAttribute("data-dsh-wsl-guest-sidebar"),a?.removeAttribute("data-dsh-wsl-guest-center")}},[e.guest,t]),(0,M.jsx)("span",{ref:n})}function wt(e,n,t){e.slots.inject("conversation.input.dock",()=>{let r=e.slots.entries("conversation.session").find(s=>s.store?.spec?.persist==="dsh.conversation");if(r)return e.slots.register({name:"conversation.input.dock",id:"dsh-wsl-handoff-draft",store:r.store},s=>(0,M.jsx)(zt,{...s,ctx:e}))}),e.effect(()=>it(e,n)),e.effect(()=>ct(e,n)),e.slots.inject("sidebar.workspaces.session.menu.item",()=>e.slots.register({name:"sidebar.workspaces.session.menu.item",id:"dsh-wsl-handoff",order:350},r=>{let[,s]=r.useMenuOpenState();return n.state?.mode!=="windows-host"||n.guest?null:(0,M.jsx)(X.MenuItemButton,{onSelect:()=>{s(!1);let a=n.conversations.nativeCatalog().rows.find(d=>d.id===r.sessionId);a&&n.conversations.requestHandoff({id:a.id,row:a})},children:"\u4EA4\u63A5\u5DE5\u4F5C\u2026"})})),e.slots.inject("main",()=>e.slots.register({name:"main",key:ce},()=>(0,M.jsx)(Dt,{ctx:e,model:n}))),e.slots.inject("shell.overlay",()=>e.slots.register({name:"shell.overlay",id:"dsh-wsl-conversations",order:15},()=>(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)($t,{ctx:e,model:n}),(0,M.jsx)(jt,{model:n}),(0,M.jsx)(ut,{model:n,api:t,ctx:e})]}))),e.slots.inject("sidebar.workspaces",()=>{let r,s=()=>{let d=n.state?.mode==="windows-host"&&!!Q(location.origin)&&n.conversations?.unified;d&&!r?r=e.slots.register({name:"sidebar.workspaces",priority:-80},i=>(0,M.jsx)(rt,{...i,ctx:e,model:n})):!d&&r&&(r(),r=null)},a=n.subscribe(s);return s(),()=>{a(),r?.()}}),e.slots.inject("conversation.session.header.actions",()=>e.slots.register({name:"conversation.session.header.actions",id:"dsh-wsl-environment",order:5},()=>(re(n),n.state?.mode==="wsl-host"&&!n.guest?(0,M.jsx)(ht,{distro:n.state.settings.distro}):null)))}var ft=require("react/jsx-runtime"),je="dsh-wsl-native",qt="dsh-wsl-native-client",Ht=["connection","slots","layout","workspaces","uiWorkspace","sessions"];function Ut(e){let n=async(r,s={})=>{let a=await e.connection.rpc.call("/api",`${je}/${r}`,s);if(!a.ok)throw Object.assign(new Error(a.error?.message||"\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\u3002"),{code:a.error?.code});return a.value},t=Ye(e,n);t.conversations=st(e,n,t),wt(e,t,n),e.effect(()=>()=>t.dispose()),e.effect(()=>{let r=document.createElement("style");return r.dataset.dshWslNative="",r.textContent=qe,document.head.append(r),()=>r.remove()}),e.slots.inject("main",()=>e.slots.register({name:"main",key:je},()=>(0,ft.jsx)(tt,{api:n,ctx:e,model:t}))),e.slots.inject("sidebar.panellist",()=>e.slots.register({name:"sidebar.panellist",id:je,order:20,label:()=>"WSL \u4E0E Windows"},le))}

return module.exports;}});
