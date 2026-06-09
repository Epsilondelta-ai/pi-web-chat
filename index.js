var O={attachFile:["M16.5 6v11.5a4 4 0 0 1-8 0V5a2.5 2.5 0 0 1 5 0v10.5a1 1 0 0 1-2 0V6H10v9.5","a2.5 2.5 0 0 0 5 0V5a4 4 0 0 0-8 0v12.5a5.5 5.5 0 0 0 11 0V6h-1.5Z"].join(""),stop:"M6 6h12v12H6V6Z",send:"M2 21 23 12 2 3v7l15 2-15 2v7Z",terminal:"M3 4h18v16H3V4Zm2 2v12h14V6H5Zm2 3 1.1-1.1L12.2 12l-4.1 4.1L7 15l3-3-3-3Zm6 6h5v1.5h-5V15Z",file:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 2.5L17.5 8H14V4.5ZM8 13h8v1.5H8V13Zm0 3h8v1.5H8V16Z"},N={attachFile:x("attach_file",O.attachFile),stop:x("stop",O.stop),send:x("send",O.send)};function x(i,r){return`<svg class="material-icon" data-material-icon="${i}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="${r}"></path></svg>`}function z(){return"pi-web-chat-mounted"}function Y(){let i=document.createElement("main");return i.className="main pi-web-chat-surface",i.dataset.main="session",i.innerHTML='<div class="term"><div class="term-inner" role="log" aria-live="polite" aria-relevant="additions text"></div></div><button type="button" class="scroll-bottom-btn" data-action="scroll-bottom" aria-label="scroll to bottom" title="scroll to bottom" hidden>↓</button>',i}function K(){let i=document.createElement("section");return i.className="prompt-region pi-web-chat-composer",i.innerHTML=`
    <div class="slash-pop" hidden><div class="slash-head">slash commands · type to filter</div><div class="slash-list"></div></div>
    <div class="prompt-bar">
      <button class="attach-btn" type="button" aria-label="attach files" title="attach files">${N.attachFile}</button>
      <input type="file" multiple hidden data-file-input />
      <div class="prompt-input-col"><div class="attach-chips" hidden></div><textarea class="prompt-textarea" aria-label="Prompt" placeholder="ask pi to do something…" rows="1"></textarea></div>
      <div class="prompt-actions">
        <button class="stop-btn" type="button" aria-label="stop" title="stop" hidden>${N.stop}</button>
        <button class="mic-btn" type="button" data-action="toggle-speech-input" aria-label="start voice input" title="voice input" hidden>\uD83C\uDF99</button>
        <button class="send-btn" type="button" aria-label="send" title="send" aria-disabled="true">${N.send}</button>
      </div>
      <div class="drop-overlay" hidden><span>drop to attach</span></div>
    </div>
    <div class="prompt-meta" data-prompt-meta>— | <span class="prompt-meta-item prompt-meta-branch"><span>—</span></span></div>`,i}function X(i){let r=document.createElement("span");return r.className="prompt-meta-item pi-web-chat-badge",r.textContent="chat plugin",i.querySelector("[data-prompt-meta]")?.append(r),r}function ni(){let i=document.createElement("section");return i.className="pi-web-chat-root",i.dataset.plugin="pi-web-chat",i.innerHTML=`
    <div class="pi-web-chat-transcript" data-chat-transcript aria-live="polite"></div>
    <section class="pi-web-chat-composer" data-chat-composer>
      <div class="pi-web-chat-popover pi-web-chat-slash" data-slash-popover hidden>
        <div class="pi-web-chat-popover-head">slash commands</div>
        <div class="pi-web-chat-popover-list" data-slash-list></div>
      </div>
      <div class="pi-web-chat-popover pi-web-chat-refs" data-refs-popover hidden>
        <div class="pi-web-chat-popover-head">file references</div>
        <div class="pi-web-chat-popover-list" data-refs-list></div>
      </div>
      <div class="pi-web-chat-attachments" data-attachments hidden></div>
      <div class="pi-web-chat-prompt-bar">
        <button class="pi-web-chat-icon-btn" type="button" data-attach aria-label="attach files" title="attach files">${x("attach_file",O.attachFile)}</button>
        <input type="file" multiple hidden data-file-input />
        <textarea class="pi-web-chat-textarea" data-chat-input placeholder="ask pi to do something…" rows="1"></textarea>
        <button class="pi-web-chat-send" type="button" data-send aria-label="send" title="send" aria-disabled="true">${x("send",O.send)}</button>
      </div>
    </section>`,{root:i,transcript:T(i.querySelector("[data-chat-transcript]")),textarea:T(i.querySelector("[data-chat-input]")),sendButton:T(i.querySelector("[data-send]")),attachButton:T(i.querySelector("[data-attach]")),fileInput:T(i.querySelector("[data-file-input]")),slashPopover:T(i.querySelector("[data-slash-popover]")),slashList:T(i.querySelector("[data-slash-list]")),refsPopover:T(i.querySelector("[data-refs-popover]")),refsList:T(i.querySelector("[data-refs-list]")),attachments:T(i.querySelector("[data-attachments]"))}}function Q(i,r){i.hidden=r.length===0,i.replaceChildren(...r.map((p)=>{let l=document.createElement("span");return l.className="pi-web-chat-attachment-chip",l.textContent=p,l}))}function W(){return`
    .pi-web-chat-badge {
      color: var(--fg-3, var(--muted, #8a8f98));
    }

    .pi-web-chat-surface {
      display: flex;
      flex-direction: column;
      min-width: 0;
      min-height: 0;
      position: relative;
    }

    .pi-web-chat-surface .term {
      flex: 1 1 auto;
      min-height: 0;
      overflow-y: auto;
      overflow-x: hidden;
      padding: var(--space-4, 16px) var(--space-4, 16px) var(--space-6, 24px);
      font-size: var(--text-base, 14px);
      line-height: 1.55;
      color: var(--fg-1, #d4d4d4);
      background: var(--bg-1, #0a0a0a);
      position: relative;
      scroll-behavior: smooth;
      overflow-anchor: none;
    }

    .pi-web-chat-surface .term-inner {
      position: relative;
      z-index: 2;
      max-width: 960px;
      min-height: 100%;
      overflow-anchor: none;
    }

    .pi-web-chat-surface .transcript-item {
      display: flow-root;
      overflow-anchor: none;
    }

    .pi-web-chat-surface .msg {
      display: flex;
      gap: var(--space-2, 8px);
      margin-bottom: 14px;
    }

    .pi-web-chat-surface .msg .prefix {
      width: 56px;
      flex-shrink: 0;
      font-size: var(--text-sm, 13px);
      color: var(--fg-3, #8b8b8b);
      padding-top: 1px;
      user-select: none;
      white-space: nowrap;
    }

    .pi-web-chat-surface .msg .prefix.user {
      color: var(--user-msg, #82aaff);
    }

    .pi-web-chat-surface .msg .prefix.pi {
      color: var(--accent, #00ff88);
    }

    .pi-web-chat-surface .msg .prefix.tool {
      color: var(--tool-call, #ffb86c);
    }

    .pi-web-chat-surface .msg .prefix.sys {
      color: var(--fg-3, #8b8b8b);
    }

    .pi-web-chat-surface .msg .body {
      color: var(--fg-1, #d4d4d4);
      min-width: 0;
      flex: 1;
      display: block;
      white-space: pre-wrap;
      overflow-wrap: anywhere;
      margin: 0;
      font: inherit;
    }

    .pi-web-chat-surface .msg .body.sys {
      color: var(--fg-3, #8b8b8b);
      font-size: var(--text-sm, 13px);
    }

    .pi-web-chat-surface .msg .body.tool {
      color: var(--fg-2, #a3a3a3);
    }

    .pi-web-chat-composer {
      display: block;
      border-top: 1px solid var(--border, #24313a);
      background: var(--bg-2, #0d1117);
      padding-bottom: env(safe-area-inset-bottom);
      position: relative;
      min-width: 0;
    }

    .pi-web-chat-composer .prompt-bar {
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: 8px;
      padding: var(--space-2, 8px) var(--space-3, 12px) var(--space-3, 12px);
      align-items: flex-end;
      position: relative;
    }

    .pi-web-chat-composer .prompt-input-col {
      display: flex;
      flex-direction: column;
      gap: 6px;
      min-width: 0;
    }

    .pi-web-chat-composer .prompt-textarea {
      width: 100%;
      min-height: 38px;
      max-height: 180px;
      resize: none;
      border: 1px solid var(--border, #24313a);
      border-radius: var(--radius-1, 6px);
      outline: 0;
      background: var(--bg-1, #080b0f);
      color: var(--fg-1, #d4d4d4);
      font-family: var(--font-mono, inherit);
      font-size: var(--text-base, 14px);
      padding: 9px 10px;
    }

    .pi-web-chat-composer .attach-btn {
      width: 38px;
      height: 38px;
      border: 1px solid var(--border, #24313a);
      background: var(--bg-1, #080b0f);
      color: var(--fg-2, #b9c0c7);
      border-radius: var(--radius-1, 6px);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      cursor: pointer;
      flex-shrink: 0;
    }

    .pi-web-chat-composer .prompt-actions {
      display: flex;
      gap: 4px;
      align-items: flex-end;
    }

    .pi-web-chat-composer .send-btn,
    .pi-web-chat-composer .stop-btn,
    .pi-web-chat-composer .mic-btn {
      border: 0;
      font: inherit;
      font-size: 12px;
      font-weight: 600;
      width: 38px;
      height: 38px;
      padding: 0;
      border-radius: var(--radius-1, 6px);
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .pi-web-chat-composer .send-btn {
      background: var(--accent, #00ff88);
      color: #021;
    }

    .pi-web-chat-composer .send-btn:disabled,
    .pi-web-chat-composer .send-btn[aria-disabled="true"] {
      opacity: .4;
      cursor: not-allowed;
    }

    .pi-web-chat-composer .stop-btn {
      background: var(--danger, #ef4444);
      color: #fff;
    }

    .pi-web-chat-composer .mic-btn {
      border: 1px solid var(--border, #24313a);
      background: var(--bg-1, #080b0f);
      color: var(--fg-2, #b9c0c7);
    }

    .pi-web-chat-composer .material-icon,
    .pi-web-chat-root .material-icon {
      display: block;
      width: 16px;
      height: 16px;
      pointer-events: none;
    }

    .pi-web-chat-surface .thinking-block {
      border: 1px dashed var(--border, #2a2a2a);
      color: var(--fg-2, #a3a3a3);
      font-size: var(--text-sm, 13px);
      font-style: italic;
      margin: 4px 0 14px;
      padding: 18px 26px 20px;
    }

    .pi-web-chat-surface .thinking-block .label {
      color: var(--thinking, #ff79c6);
      cursor: pointer;
      display: block;
      font-size: var(--text-md, 15px);
      font-style: normal;
      letter-spacing: var(--tracking-wide, .04em);
      list-style: none;
      margin-bottom: 18px;
      text-transform: uppercase;
    }

    .pi-web-chat-surface .thinking-block .label::-webkit-details-marker {
      display: none;
    }

    .pi-web-chat-surface .thinking-block .body {
      color: inherit;
      font: inherit;
      margin: 0;
      white-space: pre-wrap;
      overflow-wrap: anywhere;
    }

    .pi-web-chat-surface .tool-card {
      border: 1px solid var(--border, #2a2a2a);
      margin: 8px 0 14px;
      background: var(--bg-1, #0a0a0a);
      font-size: var(--text-sm, 13px);
    }

    .pi-web-chat-surface .tool-card .tc-head {
      display: grid;
      grid-template-columns: 18px auto minmax(0, 1fr) auto;
      align-items: center;
      gap: 8px;
      padding: 6px var(--space-2, 8px);
      background: var(--bg-2, #111111);
      border-bottom: 1px solid var(--border-dim, #1f1f1f);
      cursor: pointer;
      list-style: none;
      user-select: none;
    }

    .pi-web-chat-surface .tool-card:not([open]) .tc-head {
      border-bottom: 0;
    }

    .pi-web-chat-surface .tool-card .tc-head::-webkit-details-marker {
      display: none;
    }

    .pi-web-chat-surface .tool-card .tc-head:hover {
      background: var(--bg-3, #1a1a1a);
    }

    .pi-web-chat-surface .tool-card .tc-glyph {
      align-items: center;
      color: var(--tool-call, #ffb86c);
      display: inline-flex;
      font-size: 12px;
      justify-content: center;
      text-align: center;
    }

    .pi-web-chat-surface .tool-card .tc-icon {
      fill: none;
      height: 14px;
      stroke: currentColor;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 2;
      width: 14px;
    }

    .pi-web-chat-surface .tool-card .tc-name {
      color: var(--tool-call, #ffb86c);
      font-weight: 500;
    }

    .pi-web-chat-surface .tool-card .tc-args {
      color: var(--fg-1, #d4d4d4);
      font-size: var(--text-sm, 13px);
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .pi-web-chat-surface .tool-card .tc-meta {
      align-items: center;
      color: var(--fg-3, #8b8b8b);
      display: inline-flex;
      font-size: var(--text-xs, 12px);
      font-variant-numeric: tabular-nums;
      gap: 4px;
    }

    .pi-web-chat-surface .tool-card .tc-meta .ok,
    .pi-web-chat-surface .tool-card .tc-meta .running,
    .pi-web-chat-surface .tool-card .tc-meta .spinner {
      color: var(--accent, #00ff88);
    }

    .pi-web-chat-surface .tool-card .tc-meta .err {
      color: var(--danger, #ff6b6b);
    }

    .pi-web-chat-surface .tool-card .tc-caret {
      color: var(--fg-3, #8b8b8b);
      font-size: 10px;
      padding-right: 4px;
    }

    .pi-web-chat-surface .tool-card[open] .tc-caret {
      transform: rotate(90deg);
    }

    .pi-web-chat-surface .tool-card .tc-body {
      background: var(--bg-1, #0a0a0a);
      border-left: 2px solid var(--border-dim, #1f1f1f);
      color: var(--fg-1, #d4d4d4);
      font: inherit;
      margin: 0 0 0 14px;
      padding: var(--space-2, 8px) var(--space-3, 12px) var(--space-2, 8px) 32px;
      white-space: pre-wrap;
      word-break: break-word;
    }

    .pi-web-chat-root {
      display: flex;
      flex-direction: column;
      gap: 10px;
      height: 100%;
      min-height: 0;
    }

    .pi-web-chat-transcript {
      flex: 1;
      min-height: 160px;
      overflow: auto;
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 12px;
    }

    .pi-web-chat-root .pi-web-chat-message {
      border: 1px solid var(--border, #30363d);
      border-radius: 10px;
      padding: 10px;
      background: var(--panel, rgba(255,255,255,.03));
    }

    .pi-web-chat-root .pi-web-chat-message-role {
      color: var(--muted, #8a8f98);
      font-size: 11px;
      text-transform: uppercase;
      margin-bottom: 6px;
    }

    .pi-web-chat-root .pi-web-chat-message-body {
      margin: 0;
      white-space: pre-wrap;
      word-break: break-word;
      font: inherit;
    }

    .pi-web-chat-root .pi-web-chat-message-meta {
      margin-top: 6px;
      color: var(--muted, #8a8f98);
      font-size: 12px;
    }

    .pi-web-chat-root .pi-web-chat-composer {
      position: relative;
      padding: 10px;
      border-top: 1px solid var(--border, #30363d);
    }

    .pi-web-chat-root .pi-web-chat-prompt-bar {
      display: flex;
      align-items: flex-end;
      gap: 8px;
      border: 1px solid var(--border, #30363d);
      border-radius: 12px;
      padding: 8px;
      background: var(--surface, #0f1117);
    }

    .pi-web-chat-root[data-composer-mode="shell"] .pi-web-chat-prompt-bar {
      border-color: var(--warning, #facc15);
      box-shadow: 0 0 0 1px rgba(250,204,21,.35);
    }

    .pi-web-chat-root[data-composer-mode="shell"] .pi-web-chat-icon-btn {
      color: var(--warning, #facc15);
      border-color: var(--warning, #facc15);
    }

    .pi-web-chat-root[data-composer-mode="file-ref"] .pi-web-chat-prompt-bar {
      border-color: var(--accent, #60a5fa);
    }

    .pi-web-chat-root[data-composer-mode="file-ref"] .pi-web-chat-icon-btn {
      color: var(--accent, #60a5fa);
      border-color: var(--accent, #60a5fa);
    }

    .pi-web-chat-root .pi-web-chat-textarea {
      flex: 1;
      min-height: 38px;
      max-height: 180px;
      resize: vertical;
      border: 0;
      outline: 0;
      background: transparent;
      color: inherit;
      font: inherit;
    }

    .pi-web-chat-root .pi-web-chat-icon-btn,
    .pi-web-chat-root .pi-web-chat-send,
    .pi-web-chat-popover-item {
      cursor: pointer;
    }

    .pi-web-chat-root .pi-web-chat-icon-btn,
    .pi-web-chat-root .pi-web-chat-send {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 34px;
      height: 34px;
      border-radius: 8px;
      border: 1px solid var(--border, #30363d);
      background: transparent;
      color: inherit;
    }

    .pi-web-chat-root .pi-web-chat-send[aria-disabled="true"] {
      opacity: .45;
    }

    .pi-web-chat-popover {
      position: absolute;
      left: 12px;
      right: 12px;
      bottom: calc(100% - 8px);
      z-index: 5;
      max-height: 220px;
      overflow: auto;
      border: 1px solid var(--border, #30363d);
      border-radius: 10px;
      background: var(--surface, #111827);
      box-shadow: 0 10px 30px rgba(0,0,0,.25);
    }

    .pi-web-chat-popover-head {
      padding: 6px 10px;
      color: var(--muted, #8a8f98);
      font-size: 11px;
      text-transform: uppercase;
    }

    .pi-web-chat-popover-list {
      display: flex;
      flex-direction: column;
    }

    .pi-web-chat-popover-item {
      text-align: left;
      border: 0;
      border-top: 1px solid var(--border, #30363d);
      background: transparent;
      color: inherit;
      padding: 8px 10px;
    }

    .pi-web-chat-popover-item-file {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .pi-web-chat-popover-item:hover {
      background: rgba(255,255,255,.06);
    }

    .pi-web-chat-attachments {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 8px;
    }

    .pi-web-chat-attachment-chip {
      border: 1px solid var(--border, #30363d);
      border-radius: 999px;
      padding: 3px 8px;
      color: var(--muted, #8a8f98);
      font-size: 12px;
    }
  `}function o(){document.getElementById("pi-web-chat-style")?.remove();let i=document.createElement("style");return i.id="pi-web-chat-style",i.textContent=W(),document.head.append(i),i}function S(i){return i.command||i.cmd||(i.name?`/${i.name}`:"")}function T(i){if(!i)throw Error("pi-web-chat DOM template is invalid");return i}function gi(i,r,p){return{threadId:i,runId:r,state:{},messages:p,tools:[],context:[]}}function ui(i){let r=[...i.messages].reverse().find((p)=>p.role==="user");return{text:r?.text||"",attachments:r?.attachments||[],sessionId:i.threadId}}function Li(i,r,p){return i.map((l)=>Ti(l,r,p))}function Ti(i,r,p){if(i.type==="text.delta")return{type:"TEXT_MESSAGE_CONTENT",threadId:r,runId:p,delta:i.delta||""};if(i.type==="thinking.delta")return{type:"THINKING_MESSAGE_CONTENT",threadId:r,runId:p,delta:i.delta||""};if(i.type==="tool.start")return{type:"TOOL_CALL_START",threadId:r,runId:p,toolCallId:i.toolCallId,payload:I(i)};if(i.type==="tool.delta")return{type:"TOOL_CALL_ARGS",threadId:r,runId:p,toolCallId:i.toolCallId,delta:i.delta||""};if(i.type==="tool.end")return{type:"TOOL_CALL_END",threadId:r,runId:p,toolCallId:i.toolCallId,payload:I(i)};return{type:i.type.toUpperCase().replaceAll(".","_"),threadId:r,runId:p,payload:i}}function I(i){return{name:i.toolName||"tool",args:i.args||{},result:i.result||"",isError:i.isError===!0}}var U="pi-web-chat.sessions.v1";var ii="plugin.pi-web-sidebar.selectedSession",ri="plugin.pi-web-sidebar.event",pi="plugin.pi-web-sidebar.activeSessionId",Z="plugin.pi-web-sidebar.activeWorkspaceId";var m=20,_=200,Ei=8,Ci=1e6;var di={"book-open":'<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',"file-plus":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="M9 15h6"/>',pencil:'<path d="M21.2 6.8 17.2 2.8a2 2 0 0 0-2.8 0L3 14.2V21h6.8L21.2 9.6a2 2 0 0 0 0-2.8z"/><path d="m14 5 5 5"/>',terminal:'<path d="m4 17 6-6-6-6"/><path d="M12 19h8"/>',cpu:'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 15h3"/><path d="M1 9h3"/><path d="M1 15h3"/>',globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 0 20"/><path d="M12 2a15.3 15.3 0 0 0 0 20"/>',search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',braces:'<path d="M8 3H7a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-4a2 2 0 0 1 2-2 2 2 0 0 1-2-2V7a2 2 0 0 0-2-2h-1"/>',"file-text":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',"circle-question-mark":'<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 1 1 5.8 1c-.5 1-1.4 1.5-2.1 2-.6.4-.8.8-.8 2"/><path d="M12 17h.01"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',plug:'<path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a6 6 0 0 1-12 0V8Z"/>',"git-branch":'<line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',"circle-check":'<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',hammer:'<path d="m15 12-8.5 8.5a2.1 2.1 0 0 1-3-3L12 9"/><path d="m17.6 5.4 1.8-1.8"/><path d="m14 7 3 3"/><path d="M5 11 2 8l6-6 3 3"/>',package:'<path d="m7.5 4.3 9 5.2"/><path d="M21 8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>'},yi={read:"book-open",write:"file-plus",edit:"pencil",ctx_execute:"cpu",ctx_batch_execute:"cpu",ctx_execute_file:"cpu",ctx_search:"cpu",ctx_index:"cpu",ctx_fetch_and_index:"cpu",web_search:"globe",fetch_content:"search",get_search_content:"search",code_search:"braces",document_parse:"file-text",ask_user_question:"circle-question-mark",teams:"users",subagent:"users",mcp:"plug",git:"git-branch"};class li{#i=[];add(i){if(i)this.#i.push(i);return i}listen(i,r,p){i.addEventListener(r,p),this.add({remove:()=>i.removeEventListener(r,p)})}dispose(){for(let i of this.#i.splice(0).reverse())if(typeof i==="function")i();else if("unsubscribe"in i)i.unsubscribe();else i.remove()}}function Oi(i={}){let r=i.app;if(r?.piWebChat?.dispose(),typeof i.mount?.chat!=="function"||typeof i.mount?.composer!=="function")throw Error("pi-web-chat requires modern pi-web mount.chat and mount.composer APIs");return xi(i,r)}function xi(i,r){let p=new li,l=p.add(o()),c=Y(),h=K(),b=i.mount?.chat(c,{replace:!0}),a=i.mount?.composer(h,{replace:!0});if(b)p.add(b);if(a)p.add(a);let w=D(i);H(i,w||void 0);let f=ti(w?.sessionId||""),n={backendChatToken:0};C(c,d(f).messages),V(i,c,f,n,w?.sessionId||f.activeSessionId),Vi(p,i,c,f,n),_i(p,i,h,c,f,n);let g=r?p.add(X(r)):void 0;r?.classList.add(z());let L={dispose:()=>p.dispose()};if(r)r.piWebChat=L;return()=>{if(p.dispose(),g?.remove(),l.remove(),r?.classList.remove(z()),r?.piWebChat===L)delete r.piWebChat}}function _i(i,r,p,l,c,h){let b=p.querySelector(".prompt-textarea"),a=p.querySelector(".send-btn"),w=p.querySelector(".attach-btn"),f=p.querySelector("[data-file-input]"),n=p.querySelector(".attach-chips");if(!b||!a)return;let g=[],L=()=>{let u=b.value;a.setAttribute("aria-disabled",u.trim()?"false":"true")},q=()=>{if(!n)return;Q(n,g.map((u)=>{return u.name||"attachment"}))},J=async(u)=>{u?.preventDefault(),u?.stopImmediatePropagation();let E=b.value.trim();if(L(),!E)return;let j=[...g];a.disabled=!0;try{if($i(E,j),await Hi(r,l,c,h,E,j),g=[],q(),b.value="",f)f.value=""}catch(wi){C(l,[vi(wi)])}finally{a.disabled=!1,L()}};if(i.listen(b,"input",L),i.listen(b,"keydown",(u)=>{let E=u;if(E.key==="Enter"&&(E.metaKey||E.ctrlKey))J(E)}),i.listen(a,"click",(u)=>{J(u)}),w&&f)i.listen(w,"click",()=>f.click()),i.listen(f,"change",()=>{Ai(f,(u)=>{g=u,q()})})}function vi(i){return{id:k(),role:"system",text:`prompt failed: ${fi(i)}`,createdAt:Date.now()}}async function Ai(i,r){let p=Array.from(i.files||[]).slice(0,Ei),l=[];for(let c of p){if(c.size>Ci)continue;l.push({name:c.name,size:c.size,content:await c.text(),mimeType:c.type||void 0})}r(l)}function ar(i){return{input$:i.behaviorSubject("chat.input",""),submitted$:i.subject("chat.input.submitted"),activeSessionId$:i.behaviorSubject("session.activeId",null),sidebarSelectedSession$:i.behaviorSubject(ii,Ri()),toastRequested$:i.subject("toast.requested")}}function fr(i){let r=[],p=new Set,l=/(^|[\s`])@([^\s@`]+)/g,c=l.exec(String(i||""));while(c!==null){let h=c[2]||"";if((c[1]||"")!=="`"&&h&&!p.has(h))p.add(h),r.push(h);c=l.exec(String(i||""))}return r}function wr(i=[],r=[]){let p=[],l=new Set;for(let c of[...i,...r]){let h=S(c);if(!h||l.has(h))continue;l.add(h),p.push(c)}return p}function R(i){return i.app?.piWebSidebar?.getSnapshot?.().activeWorkspaceId||i.app?.dataset.activeWorkspaceId||""}function Ri(){return D({})}function D(i){let r=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),p=r?.activeSessionId||"",l=r?.activeWorkspaceId||"";if(p)return{sessionId:p,workspaceId:l||void 0};let c=B(pi),h=B(Z);return c?{sessionId:c,workspaceId:h||void 0}:null}function H(i,r){if(r?.workspaceId&&i.app)i.app.dataset.activeWorkspaceId=r.workspaceId,t(Z,r.workspaceId);if(r?.sessionId)i.app?.setAttribute("data-active-session-id",r.sessionId),t(pi,r.sessionId)}function v(i,r,p={}){let l=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),c={type:r,detail:p,snapshot:l};(i.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$)?.next(c),globalThis.piWeb?.subject(ri).next(c)}function ci(i,r,p){let l=i.app?.dataset.activeWorkspaceId||R(i),c={reason:p,sessionId:r,workspaceId:l};globalThis.piWeb?.behaviorSubject("session.activeId",r).next(r),globalThis.piWeb?.subject("session.changed").next({sessionId:r,workspaceId:l,reason:p}),v(i,"active.start",c),v(i,"session.created",c)}function t(i,r){try{localStorage.setItem(i,r)}catch{}}async function M(i,r,p={}){if(!i.backend)return{};let l=R(i),c=await i.backend(r,{workspaceId:l,data:p});return $(c)?c:{}}async function Hi(i,r,p,l,c,h){let b={id:k(),role:"user",text:c,attachments:ai(h),createdAt:Date.now()},a=d(p);a.messages.push(b),a.updatedAt=Date.now(),y(p),C(r,a.messages);let w=await ki(i,c,h,p.activeSessionId);if(typeof w.activeSessionId==="string"&&w.activeSessionId){let n=p.activeSessionId,g=G(p,w.activeSessionId);if(n!==g.id&&!g.messages.some((L)=>L.id===b.id))g.messages.push(b),g.updatedAt=Date.now();H(i,{sessionId:w.activeSessionId,workspaceId:i.app?.dataset.activeWorkspaceId||R(i)||void 0}),v(i,"chat-session",{reason:"startPrompt",sessionId:w.activeSessionId}),ci(i,w.activeSessionId,"startPrompt")}if(typeof w.runId!=="string"||!w.runId){let n=await zi(i,c,h,p.activeSessionId),g=hi(i,p,n,"submitPrompt");C(r,g);return}let f=Fi(p);await Mi(i,p,w.runId,f,()=>C(r,d(p).messages)),await V(i,r,p,l,p.activeSessionId)}async function Mi(i,r,p,l,c){let h=0,b=!0;c();try{while(b){await Bi(120);let a=await M(i,"streamEvents",{runId:p,cursor:h}),w=Array.isArray(a.events)?a.events.filter(Ui):[];h=typeof a.cursor==="number"?a.cursor:h,b=a.isStreaming===!0,Pi(l,w),l.streaming=b,d(r).updatedAt=Date.now(),y(r),c()}}finally{l.streaming=!1,y(r),c()}}function $i(i,r){globalThis.piWeb?.subject("chat.input.submitted").next({text:i,attachments:ai(r)||[]})}async function ki(i,r,p,l){try{return await M(i,"startPrompt",{text:r,attachments:p,sessionId:l})}catch(c){if(Ni(c))return{};throw c}}function Ni(i){return/unknown method: startPrompt|unsupported method: startPrompt|startPrompt unsupported/i.test(fi(i))}async function zi(i,r,p,l=""){return await M(i,"submitPrompt",{text:r,attachments:p,sessionId:l})}function Fi(i){let r=d(i),p=[...r.messages].reverse().find((c)=>c.role==="assistant"&&c.streaming);if(p)return p;let l={id:k(),role:"assistant",text:"",createdAt:Date.now(),streaming:!0};return r.messages.push(l),l}function Pi(i,r){for(let p of r)if(p.type==="text.delta"&&typeof p.delta==="string")i.text+=p.delta;else if(p.type==="thinking.delta"&&typeof p.delta==="string")i.thinking=`${i.thinking||""}${p.delta}`;else if(p.type==="tool.start")F(i,p,"running");else if(p.type==="tool.delta"&&typeof p.delta==="string"){let l=F(i,p,"running");l.text=p.delta}else if(p.type==="tool.end"){let l=F(i,p,p.isError?"err":"ok");if(typeof p.result==="string"&&p.result)l.text=p.result}else if(p.type==="error"&&typeof p.message==="string")i.text+=`${i.text?`
`:""}${p.message}`}function F(i,r,p){let l=r.toolCallId||r.toolName||"tool";i.toolCalls||=[];let c=i.toolCalls.find((h)=>h.id===l);if(!c)c={id:l,name:r.toolName||"tool",args:r.args,text:"",status:p},i.toolCalls.push(c);if(c.status=p,r.args)c.args=r.args;return c}function Ui(i){return $(i)&&typeof i.type==="string"}function Bi(i){return new Promise((r)=>globalThis.setTimeout(r,i))}async function V(i,r,p,l,c=""){let h=++l.backendChatToken;try{let b=await M(i,"chatState",Zi(i,c));if(h!==l.backendChatToken)return;let a=hi(i,p,b,"chatState");if(a.length)C(r,a)}catch{}}function Zi(i,r){let p=r?{sessionId:r}:{},l=Di(i);if(l)p.workspacePath=l;return p}function Di(i){let r=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),p=i.app?.dataset.activeWorkspaceId||r?.activeWorkspaceId||"";return r?.workspaces?.find((l)=>l.id===p)?.path||""}function hi(i,r,p,l){let c=Array.isArray(p.messages)?p.messages.filter(si):[];if(typeof p.activeSessionId==="string"&&p.activeSessionId){let b=r.activeSessionId;if(G(r,p.activeSessionId),H(i,{sessionId:p.activeSessionId,workspaceId:i.app?.dataset.activeWorkspaceId||R(i)||void 0}),l!=="chatState"||b!==p.activeSessionId)v(i,"chat-session",{reason:l,sessionId:p.activeSessionId});if(l!=="chatState")ci(i,p.activeSessionId,l)}let h=d(r);if(c.length){if(h.messages=c.slice(-_),h.title==="New chat"){let b=c.find((a)=>a.role==="user");if(b)h.title=b.text.slice(0,48)||h.title}h.updatedAt=Date.now()}return y(r),h.messages}function Vi(i,r,p,l,c){let h=(f)=>{if(!f?.sessionId)return;H(r,f),G(l,f.sessionId),C(p,d(l).messages),V(r,p,l,c,f.sessionId)},b=(f)=>{let n=Gi(r,f);if(n)h(n)},a=r.app?.piWebSidebar?.channels?.selectedSession$||globalThis.piWebSidebar?.channels?.selectedSession$,w=r.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$;if(a)i.add(a.subscribe(h));if(w)i.add(w.subscribe(b));if(r.app)i.listen(r.app,"pi-web-sidebar:session-created",(f)=>{let n=f.detail||{},g=typeof n.sessionId==="string"?n.sessionId:"",L=typeof n.workspaceId==="string"?n.workspaceId:"";if(g)h({sessionId:g,workspaceId:L||void 0})});if(globalThis.piWeb)i.add(globalThis.piWeb.behaviorSubject(ii,D(r)).subscribe(h)),i.add(globalThis.piWeb.subject(ri).subscribe(b)),i.add(globalThis.piWeb.behaviorSubject("session.activeId",null).subscribe((f)=>{if(!f)return;h({sessionId:f,workspaceId:r.app?.dataset.activeWorkspaceId||B(Z)||void 0})}))}function Gi(i,r){if(!qi(r.type))return null;let p=r.detail||{},l=typeof p.sessionId==="string"?p.sessionId:r.snapshot?.activeSessionId||"",c=typeof p.workspaceId==="string"?p.workspaceId:r.snapshot?.activeWorkspaceId||i.app?.dataset.activeWorkspaceId||"";if(!l)return null;return{sessionId:l,workspaceId:c||void 0}}function qi(i){return i==="session.selected"||i==="session.created"||i==="new-session"||i==="active.start"}function G(i,r){let p=i.sessions.find((l)=>l.id===r);if(!p)p=A(r),i.sessions.unshift(p);return i.activeSessionId=p.id,y(i),p}function C(i,r){(i.querySelector(".term-inner")||i).replaceChildren(...r.map(Ji))}function Ji(i){let r=document.createElement("article");r.className="transcript-item",r.dataset.messageId=i.id;let p=document.createElement("div");p.className="msg",p.dataset.kind=P(i.role);let l=document.createElement("span");l.className=`prefix ${P(i.role)}`,l.textContent=mi(i.role);let c=document.createElement("pre");if(c.className=`body ${P(i.role)}`,c.textContent=i.text,p.append(l,c),r.append(p),i.thinking)r.append(ji(i.thinking));for(let h of i.toolCalls||[])r.append(Yi(h));if(i.streaming)r.dataset.streaming="true";return r}function ji(i){let r=document.createElement("details");r.className="msg-detail think thinking-block",r.open=!0;let p=document.createElement("summary");p.className="label",p.textContent="THINKING";let l=document.createElement("pre");return l.className="body",l.textContent=i,r.append(p,l),r}function Yi(i){let r=document.createElement("details");r.className="tool-card",r.dataset.tool=i.name||"tool",r.dataset.status=i.status;let p=document.createElement("summary");p.className="tc-head",p.append(Ki(i),Xi(i),Qi(i),Wi(i));let l=document.createElement("pre");return l.className="tc-body",l.textContent=i.text||JSON.stringify(i.args||{},null,2),r.append(p,l),r}function Ki(i){let r=document.createElement("span");r.className="tc-glyph";let p=oi(i),l=p?di[p]:"";if(!p||!l)return r.textContent="●",r;return r.innerHTML=`<svg class="tc-icon" data-tool-icon="${p}" aria-hidden="true" viewBox="0 0 24 24">${l}</svg>`,r}function Xi(i){let r=document.createElement("span");return r.className="tc-name",r.textContent=i.name||"tool",r}function Qi(i){let r=document.createElement("span");return r.className="tc-args",r.textContent=bi(i),r}function Wi(i){let r=document.createElement("span");if(r.className="tc-meta",i.status==="running"){let c=document.createElement("span");c.className="spinner",c.textContent="⠇";let h=document.createElement("span");return h.className="running",h.textContent="running",r.append(c,h,e()),r}let p=document.createElement("span");p.className=i.status==="err"?"err":"ok",p.textContent=i.status==="err"?"✗":"✓";let l=document.createElement("span");return l.textContent=i.status==="err"?" · failed":" · done",r.append(p,l,e()),r}function e(){let i=document.createElement("span");return i.className="tc-caret",i.textContent="▸",i}function bi(i){if(!i.args)return"";return JSON.stringify(i.args)}function oi(i){let r=Si(i.name);if(["bash","shell","sh","zsh","terminal"].includes(r))return Ii(bi(i).toLowerCase())||"terminal";return yi[r]}function Si(i){return i.trim().replace(/^functions\./,"").replace(/^multi_tool_use\./,"")}function Ii(i){if(/\bgit\b|\bgh\b/.test(i))return"git-branch";if(/\b(go test|bun test|npm test|pnpm test|yarn test|vitest|pytest|cargo test)\b/.test(i))return"circle-check";if(/\b(bun|npm|pnpm|yarn)\s+(run\s+)?build\b|\b(go build|cargo build)\b/.test(i))return"hammer";if(/\b(bun|npm|pnpm|yarn)\s+(add|install|i)\b|\bpip\s+install\b|\bgo\s+get\b/.test(i))return"package";return}function mi(i){if(i==="assistant")return"pi >";if(i==="user")return"you >";if(i==="system")return"sys >";return"tool >"}function P(i){if(i==="assistant")return"pi";if(i==="system")return"sys";return i}function d(i){let r=i.sessions.find((p)=>p.id===i.activeSessionId);if(!r)r=A(),i.sessions.unshift(r),i.activeSessionId=r.id,y(i);return r}function A(i=k()){let r=Date.now();return{id:i,title:"New chat",createdAt:r,updatedAt:r,messages:[]}}function B(i){try{return localStorage.getItem(i)||""}catch{return""}}function ti(i=""){try{let p=JSON.parse(localStorage.getItem(U)||"null");if(p&&typeof p.activeSessionId==="string"&&Array.isArray(p.sessions)){let l=p.sessions.filter(ei);if(i&&!l.some((c)=>c.id===i))l.unshift(A(i));return{activeSessionId:i||p.activeSessionId,sessions:l}}}catch{}let r=A(i||void 0);return{activeSessionId:r.id,sessions:[r]}}function y(i){s(i);try{localStorage.setItem(U,JSON.stringify(i))}catch{for(let r of i.sessions)r.messages=r.messages.slice(-Math.floor(_/2));s(i);try{localStorage.setItem(U,JSON.stringify(i))}catch{}}}function ai(i){if(!i?.length)return;return i.map(({content:r,...p})=>p)}function s(i){i.sessions.sort((l,c)=>c.updatedAt-l.updatedAt);let r=i.sessions.find((l)=>l.id===i.activeSessionId),p=i.sessions.filter((l)=>l.id!==i.activeSessionId).slice(0,Math.max(0,m-1));i.sessions=r?[r,...p]:i.sessions.slice(0,m);for(let l of i.sessions)if(l.messages.length>_)l.messages.splice(0,l.messages.length-_)}function ei(i){return $(i)&&typeof i.id==="string"&&Array.isArray(i.messages)}function si(i){return $(i)&&typeof i.id==="string"&&typeof i.text==="string"&&typeof i.createdAt==="number"&&(i.role==="user"||i.role==="assistant"||i.role==="tool"||i.role==="system")}function $(i){return typeof i==="object"&&i!==null}function k(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`}function fi(i){return i instanceof Error?i.message:String(i)}export{ui as promptFromAgUiLikeRunInput,W as pluginStyleText,z as pluginClass,wr as mergeCommands,R as getActiveWorkspaceId,fr as extractRefs,Oi as default,K as createComposerSurface,Y as createChatSurface,ni as createChatDom,ar as createChannels,gi as createAgUiLikeRunInput,S as commandName,Li as chatEventsToAgUiLikeEvents,M as backendCall};
