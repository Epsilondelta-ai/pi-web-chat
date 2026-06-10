var x={attachFile:["M16.5 6v11.5a4 4 0 0 1-8 0V5a2.5 2.5 0 0 1 5 0v10.5a1 1 0 0 1-2 0V6H10v9.5","a2.5 2.5 0 0 0 5 0V5a4 4 0 0 0-8 0v12.5a5.5 5.5 0 0 0 11 0V6h-1.5Z"].join(""),stop:"M6 6h12v12H6V6Z",send:"M2 21 23 12 2 3v7l15 2-15 2v7Z",terminal:"M3 4h18v16H3V4Zm2 2v12h14V6H5Zm2 3 1.1-1.1L12.2 12l-4.1 4.1L7 15l3-3-3-3Zm6 6h5v1.5h-5V15Z",file:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 2.5L17.5 8H14V4.5ZM8 13h8v1.5H8V13Zm0 3h8v1.5H8V16Z"},U={attachFile:N("attach_file",x.attachFile),stop:N("stop",x.stop),send:N("send",x.send)};function N(i,p){return`<svg class="material-icon" data-material-icon="${i}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="${p}"></path></svg>`}function Z(){return"pi-web-chat-mounted"}function K(){let i=document.createElement("main");return i.className="main pi-web-chat-surface",i.dataset.main="session",i.innerHTML='<div class="term"><div class="term-inner" role="log" aria-live="polite" aria-relevant="additions text"></div></div><button type="button" class="scroll-bottom-btn" data-action="scroll-bottom" aria-label="scroll to bottom" title="scroll to bottom" hidden>↓</button>',i}function n(){let i=document.createElement("section");return i.className="prompt-region pi-web-chat-composer",i.innerHTML=`
    <div class="slash-pop" hidden><div class="slash-head">slash commands · type to filter</div><div class="slash-list"></div></div>
    <div class="prompt-bar">
      <button class="attach-btn" type="button" aria-label="attach files" title="attach files">${U.attachFile}</button>
      <input type="file" multiple hidden data-file-input />
      <div class="prompt-input-col"><div class="attach-chips" hidden></div><textarea class="prompt-textarea" aria-label="Prompt" placeholder="ask pi to do something…" rows="1"></textarea></div>
      <div class="prompt-actions">
        <button class="stop-btn" type="button" aria-label="stop" title="stop" hidden>${U.stop}</button>
        <button class="mic-btn" type="button" data-action="toggle-speech-input" aria-label="start voice input" title="voice input" hidden>\uD83C\uDF99</button>
        <button class="send-btn" type="button" aria-label="send" title="send" aria-disabled="true">${U.send}</button>
      </div>
      <div class="drop-overlay" hidden><span>drop to attach</span></div>
    </div>
    <div class="prompt-meta" data-prompt-meta>— | <span class="prompt-meta-item prompt-meta-branch"><span>—</span></span></div>`,i}function S(i){let p=document.createElement("span");return p.className="prompt-meta-item pi-web-chat-badge",p.textContent="chat plugin",i.querySelector("[data-prompt-meta]")?.append(p),p}function yi(){let i=document.createElement("section");return i.className="pi-web-chat-root",i.dataset.plugin="pi-web-chat",i.innerHTML=`
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
        <button class="pi-web-chat-icon-btn" type="button" data-attach aria-label="attach files" title="attach files">${N("attach_file",x.attachFile)}</button>
        <input type="file" multiple hidden data-file-input />
        <textarea class="pi-web-chat-textarea" data-chat-input aria-label="Prompt" placeholder="ask pi to do something…" rows="1"></textarea>
        <button class="pi-web-chat-send" type="button" data-send aria-label="send" title="send" aria-disabled="true">${N("send",x.send)}</button>
      </div>
    </section>`,{root:i,transcript:E(i.querySelector("[data-chat-transcript]")),textarea:E(i.querySelector("[data-chat-input]")),sendButton:E(i.querySelector("[data-send]")),attachButton:E(i.querySelector("[data-attach]")),fileInput:E(i.querySelector("[data-file-input]")),slashPopover:E(i.querySelector("[data-slash-popover]")),slashList:E(i.querySelector("[data-slash-list]")),refsPopover:E(i.querySelector("[data-refs-popover]")),refsList:E(i.querySelector("[data-refs-list]")),attachments:E(i.querySelector("[data-attachments]"))}}function $i(i,p){i.replaceChildren(...p.map(xi)),i.scrollTop=i.scrollHeight}function xi(i){let p=document.createElement("article");p.className=`pi-web-chat-message pi-web-chat-message-${i.role}`,p.dataset.messageId=i.id;let r=document.createElement("div");r.className="pi-web-chat-message-role",r.textContent=i.role;let b=document.createElement("pre");if(b.className="pi-web-chat-message-body",b.textContent=i.text,p.append(r,b),i.thinking){let h=document.createElement("details");h.className="pi-web-chat-thinking",h.open=Boolean(i.streaming);let c=document.createElement("summary");c.textContent="thinking";let l=document.createElement("pre");l.textContent=i.thinking,h.append(c,l),p.append(h)}if(i.toolCalls?.length){let h=document.createElement("div");h.className="pi-web-chat-tools";for(let c of i.toolCalls){let l=document.createElement("details");l.className=`pi-web-chat-tool pi-web-chat-tool-${c.status}`,l.open=c.status==="running";let f=document.createElement("summary");f.textContent=`${c.name} · ${c.status}`;let g=document.createElement("pre");g.textContent=c.text||JSON.stringify(c.args||{},null,2),l.append(f,g),h.append(l)}p.append(h)}if(i.streaming){let h=document.createElement("div");h.className="pi-web-chat-message-meta",h.textContent="streaming...",p.append(h)}if(i.attachments?.length){let h=document.createElement("div");h.className="pi-web-chat-message-meta",h.textContent=`${i.attachments.length} attachment(s)`,p.append(h)}return p}function d(i,p){i.hidden=p.length===0,i.replaceChildren(...p.map((r)=>{let b=document.createElement("span");return b.className="pi-web-chat-attachment-chip",b.textContent=r,b}))}function I(){return`
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

    .pi-web-chat-composer .prompt-textarea:focus-visible {
      border-color: var(--accent, #00ff88);
      box-shadow: 0 0 0 2px rgba(0,255,136,.25);
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
      width: 100%;
      padding: 6px var(--space-2, 8px);
      background: var(--bg-2, #111111);
      border: 0;
      border-bottom: 1px solid var(--border-dim, #1f1f1f);
      border-radius: 0;
      color: inherit;
      cursor: pointer;
      font: inherit;
      list-style: none;
      text-align: left;
      user-select: none;
    }

    .pi-web-chat-surface .tool-card[data-collapsed="true"] .tc-head {
      border-bottom: 0;
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

    .pi-web-chat-surface .tool-card[data-collapsed="false"] .tc-caret {
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

    .pi-web-chat-root .pi-web-chat-textarea:focus-visible {
      box-shadow: inset 0 -2px 0 var(--accent, #60a5fa);
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
  `}function m(){document.getElementById("pi-web-chat-style")?.remove();let i=document.createElement("style");return i.id="pi-web-chat-style",i.textContent=I(),document.head.append(i),i}function o(i){return i.command||i.cmd||(i.name?`/${i.name}`:"")}function E(i){if(!i)throw Error("pi-web-chat DOM template is invalid");return i}function Ni(i,p,r){return{threadId:i,runId:p,state:{},messages:r,tools:[],context:[]}}function ui(i){let p=[...i.messages].reverse().find((r)=>r.role==="user");return{text:p?.text||"",attachments:p?.attachments||[],sessionId:i.threadId}}function ai(i,p,r){return i.map((b)=>ki(b,p,r))}function ki(i,p,r){if(i.type==="text.delta")return{type:"TEXT_MESSAGE_CONTENT",threadId:p,runId:r,delta:i.delta||""};if(i.type==="thinking.delta")return{type:"THINKING_MESSAGE_CONTENT",threadId:p,runId:r,delta:i.delta||""};if(i.type==="tool.start")return{type:"TOOL_CALL_START",threadId:p,runId:r,toolCallId:i.toolCallId,payload:t(i)};if(i.type==="tool.delta")return{type:"TOOL_CALL_ARGS",threadId:p,runId:r,toolCallId:i.toolCallId,delta:i.delta||""};if(i.type==="tool.end")return{type:"TOOL_CALL_END",threadId:p,runId:r,toolCallId:i.toolCallId,payload:t(i)};return{type:i.type.toUpperCase().replaceAll(".","_"),threadId:p,runId:r,payload:i}}function t(i){return{name:i.toolName||"tool",args:i.args||{},result:i.result||"",isError:i.isError===!0}}var V="pi-web-chat.sessions.v1";var hi="plugin.pi-web-sidebar.selectedSession",ci="plugin.pi-web-sidebar.event",li="plugin.pi-web-sidebar.activeSessionId",q="plugin.pi-web-sidebar.activeWorkspaceId";var e=20,a=200,zi=8,Fi=1e6;var H=new Set,Pi={"book-open":'<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',"file-plus":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="M9 15h6"/>',pencil:'<path d="M21.2 6.8 17.2 2.8a2 2 0 0 0-2.8 0L3 14.2V21h6.8L21.2 9.6a2 2 0 0 0 0-2.8z"/><path d="m14 5 5 5"/>',terminal:'<path d="m4 17 6-6-6-6"/><path d="M12 19h8"/>',cpu:'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 15h3"/><path d="M1 9h3"/><path d="M1 15h3"/>',globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 0 20"/><path d="M12 2a15.3 15.3 0 0 0 0 20"/>',search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',braces:'<path d="M8 3H7a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-4a2 2 0 0 1 2-2 2 2 0 0 1-2-2V7a2 2 0 0 0-2-2h-1"/>',"file-text":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',"circle-question-mark":'<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 1 1 5.8 1c-.5 1-1.4 1.5-2.1 2-.6.4-.8.8-.8 2"/><path d="M12 17h.01"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',plug:'<path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a6 6 0 0 1-12 0V8Z"/>',"git-branch":'<line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',"circle-check":'<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',hammer:'<path d="m15 12-8.5 8.5a2.1 2.1 0 0 1-3-3L12 9"/><path d="m17.6 5.4 1.8-1.8"/><path d="m14 7 3 3"/><path d="M5 11 2 8l6-6 3 3"/>',package:'<path d="m7.5 4.3 9 5.2"/><path d="M21 8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>'},Ui={read:"book-open",write:"file-plus",edit:"pencil",ctx_execute:"cpu",ctx_batch_execute:"cpu",ctx_execute_file:"cpu",ctx_search:"cpu",ctx_index:"cpu",ctx_fetch_and_index:"cpu",web_search:"globe",fetch_content:"search",get_search_content:"search",code_search:"braces",document_parse:"file-text",ask_user_question:"circle-question-mark",teams:"users",subagent:"users",mcp:"plug",git:"git-branch"};class fi{#i=[];add(i){if(i)this.#i.push(i);return i}listen(i,p,r){i.addEventListener(p,r),this.add({remove:()=>i.removeEventListener(p,r)})}dispose(){for(let i of this.#i.splice(0).reverse())if(typeof i==="function")i();else if("unsubscribe"in i)i.unsubscribe();else i.remove()}}function Zi(i={}){let p=i.app;if(p?.piWebChat?.dispose(),typeof i.mount?.chat!=="function"||typeof i.mount?.composer!=="function")throw Error("pi-web-chat requires modern pi-web mount.chat and mount.composer APIs");return Bi(i,p)}function Bi(i,p){let r=new fi,b=r.add(m()),h=K(),c=n(),l=i.mount?.chat(h,{replace:!0}),f=i.mount?.composer(c,{replace:!0});if(l)r.add(l);if(f)r.add(f);let g=J(i);F(i,g||void 0);let w=_p(g?.sessionId||""),L={backendChatToken:0};A(h,R(w).messages,w.activeSessionId),Y(i,h,w,L,g?.sessionId||w.activeSessionId),ti(r,i,h,w,L),Di(r,i,c,h,w,L);let T=p?r.add(S(p)):void 0;p?.classList.add(Z());let O=()=>{if(L.runEventsAbort?.abort(),L.sessionEventsAbort?.abort(),r.dispose(),H.clear(),T?.remove(),b.remove(),p?.classList.remove(Z()),p?.piWebChat===$)delete p.piWebChat},$={dispose:O};if(p)p.piWebChat=$;return O}function Di(i,p,r,b,h,c){let l=r.querySelector(".prompt-textarea"),f=r.querySelector(".send-btn"),g=r.querySelector(".attach-btn"),w=r.querySelector("[data-file-input]"),L=r.querySelector(".attach-chips");if(!l||!f)return;let T=[],O=()=>{let C=l.value;f.setAttribute("aria-disabled",C.trim()?"false":"true")},$=()=>{if(!L)return;d(L,T.map((C)=>{return C.name||"attachment"}))},W=async(C)=>{C?.preventDefault(),C?.stopImmediatePropagation();let _=l.value.trim();if(O(),!_)return;let v=[...T];f.disabled=!0;try{if(Wi(_,v),await Ji(p,b,h,c,_,v),T=[],$(),l.value.trim()===_)l.value="";if(w)w.value=""}catch(Mi){A(b,[Vi(Mi)],h.activeSessionId)}finally{f.disabled=!1,O()}};if(i.listen(l,"input",O),i.listen(l,"keydown",(C)=>{let _=C;if(_.key==="Enter"&&(_.metaKey||_.ctrlKey))W(_)}),i.listen(f,"click",(C)=>{W(C)}),g&&w)i.listen(g,"click",()=>w.click()),i.listen(w,"change",()=>{Gi(w,(C)=>{T=C,$()})})}function Vi(i){return{id:P(),role:"system",text:`prompt failed: ${Hi(i)}`,createdAt:Date.now()}}async function Gi(i,p){let r=Array.from(i.files||[]).slice(0,zi),b=[];for(let h of r){if(h.size>Fi)continue;b.push({name:h.name,size:h.size,content:await h.text(),mimeType:h.type||void 0})}p(b)}function Pp(i){return{input$:i.behaviorSubject("chat.input",""),submitted$:i.subject("chat.input.submitted"),activeSessionId$:i.behaviorSubject("session.activeId",null),sidebarSelectedSession$:i.behaviorSubject(hi,qi()),toastRequested$:i.subject("toast.requested")}}function Up(i){let p=[],r=new Set,b=/(^|[\s`])@([^\s@`]+)/g,h=b.exec(String(i||""));while(h!==null){let c=h[2]||"";if((h[1]||"")!=="`"&&c&&!r.has(c))r.add(c),p.push(c);h=b.exec(String(i||""))}return p}function Zp(i=[],p=[]){let r=[],b=new Set;for(let h of[...i,...p]){let c=o(h);if(!c||b.has(c))continue;b.add(c),r.push(h)}return r}function u(i){return i.app?.piWebSidebar?.getSnapshot?.().activeWorkspaceId||i.app?.dataset.activeWorkspaceId||""}function qi(){return J({})}function J(i){let p=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),r=p?.activeSessionId||"",b=p?.activeWorkspaceId||"";if(r)return{sessionId:r,workspaceId:b||void 0};let h=G(li),c=G(q);return h?{sessionId:h,workspaceId:c||void 0}:null}function F(i,p){if(p?.workspaceId&&i.app)i.app.dataset.activeWorkspaceId=p.workspaceId,s(q,p.workspaceId);if(p?.sessionId)i.app?.setAttribute("data-active-session-id",p.sessionId),s(li,p.sessionId)}function k(i,p,r={}){let b=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),h={type:p,detail:r,snapshot:b};(i.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$)?.next(h),globalThis.piWeb?.subject(ci).next(h)}function wi(i,p,r){let b=i.app?.dataset.activeWorkspaceId||u(i),h={reason:r,sessionId:p,workspaceId:b};globalThis.piWeb?.behaviorSubject("session.activeId",p).next(p),globalThis.piWeb?.subject("session.changed").next({sessionId:p,workspaceId:b,reason:r}),k(i,"active.start",h),k(i,"session.created",h)}function s(i,p){try{localStorage.setItem(i,p)}catch{}}async function j(i,p,r={}){if(!i.backend)return{};let b=u(i),h=await i.backend(p,{workspaceId:b,data:r});return y(h)?h:{}}async function Ji(i,p,r,b,h,c){b.backendChatToken+=1,b.runEventsAbort?.abort(),b.runEventsAbort=new AbortController,b.sessionEventsAbort?.abort();let l={id:P(),role:"user",text:h,attachments:Ai(c),createdAt:Date.now()},f=R(r);f.messages.push(l),f.updatedAt=Date.now(),M(r),A(p,f.messages,r.activeSessionId);let g=await vi(i,h,c,r.activeSessionId);if(typeof g.activeSessionId==="string"&&g.activeSessionId){let L=r.activeSessionId,T=Q(r,g.activeSessionId);if(L!==T.id&&!T.messages.some((O)=>O.id===l.id))T.messages.push(l),T.updatedAt=Date.now();F(i,{sessionId:g.activeSessionId,workspaceId:i.app?.dataset.activeWorkspaceId||u(i)||void 0}),k(i,"chat-session",{reason:"startPrompt",sessionId:g.activeSessionId}),wi(i,g.activeSessionId,"startPrompt")}if(typeof g.runId!=="string"||!g.runId){let L=await ni(i,h,c,r.activeSessionId),T=X(i,r,L,"submitPrompt");A(p,T,r.activeSessionId);return}let w=Si(r);try{await ji(i,r,g.runId,w,()=>A(p,R(r).messages,r.activeSessionId),b.runEventsAbort.signal)}finally{b.runEventsAbort=void 0}Y(i,p,r,b,r.activeSessionId)}async function ji(i,p,r,b,h,c){let l=await gi(i,"streamEventsSse",{runId:r,cursor:0},c);if(!l)throw Error("SSE streaming backend did not return a stream");b.streaming=!0,h();try{await Li(l,(f)=>{di(b,[f]),b.streaming=f.type!=="run.end",R(p).updatedAt=Date.now(),M(p),h()})}finally{b.streaming=!1,M(p),h()}}async function gi(i,p,r={},b){if(!i.backendStream)throw Error("SSE streaming backend is unavailable");let h=u(i),c=await i.backendStream(p,{workspaceId:h,data:r},{signal:b});return Yi(c)}function Yi(i){if(typeof ReadableStream<"u"&&i instanceof ReadableStream)return i;if(typeof Response<"u"&&i instanceof Response)return i.body;if(typeof i==="string")return ii(i);if(!y(i))return null;let p=i.body;if(typeof ReadableStream<"u"&&p instanceof ReadableStream)return p;let r=i.sse;if(typeof r==="string")return ii(r);return null}function ii(i){let p=new TextEncoder().encode(i);return new ReadableStream({start(r){r.enqueue(p),r.close()}})}async function Li(i,p){let r=i.getReader(),b=new TextDecoder,h="";while(!0){let c=await r.read();if(c.done){h+=b.decode(),Qi(h,p);return}h+=b.decode(c.value,{stream:!0});let l=Xi(h);h=l.remainder;for(let f of l.frames)Ti(f,p)}}function Xi(i){let r=i.replaceAll(`\r
`,`
`).replaceAll("\r",`
`).split(`

`),b=r.pop()||"";return{frames:r,remainder:b}}function Qi(i,p){let r=i.trim();if(r)Ti(r,p)}function Ti(i,p){let r=i.split(`
`).filter((b)=>b.startsWith("data:")).map((b)=>b.slice(5).trimStart()).join(`
`);if(!r)return;try{let b=JSON.parse(r);if(Ii(b))p(b)}catch{}}function Wi(i,p){globalThis.piWeb?.subject("chat.input.submitted").next({text:i,attachments:Ai(p)||[]})}async function vi(i,p,r,b){try{return await j(i,"startPrompt",{text:p,attachments:r,sessionId:b})}catch(h){if(Ki(h))return{};throw h}}function Ki(i){return/unknown method: (startPrompt|streamEventsSse)|unsupported method: (startPrompt|streamEventsSse)|(startPrompt|streamEventsSse) unsupported/i.test(Hi(i))}async function ni(i,p,r,b=""){return await j(i,"submitPrompt",{text:p,attachments:r,sessionId:b})}function Si(i){let p=R(i),r=[...p.messages].reverse().find((h)=>h.role==="assistant"&&h.streaming);if(r)return r;let b={id:P(),role:"assistant",text:"",createdAt:Date.now(),streaming:!0};return p.messages.push(b),b}function di(i,p){for(let r of p)if(r.type==="text.delta"&&typeof r.delta==="string")i.text+=r.delta;else if(r.type==="thinking.delta"&&typeof r.delta==="string")i.thinking=`${i.thinking||""}${r.delta}`;else if(r.type==="tool.start")B(i,r,"running");else if(r.type==="tool.delta"&&typeof r.delta==="string"){let b=B(i,r,"running");b.text=r.delta}else if(r.type==="tool.end"){let b=B(i,r,r.isError?"err":"ok");if(typeof r.result==="string"&&r.result)b.text=r.result}else if(r.type==="error"&&typeof r.message==="string")i.text+=`${i.text?`
`:""}${r.message}`}function B(i,p,r){let b=p.toolCallId||p.toolName||"tool";i.toolCalls||=[];let h=i.toolCalls.find((c)=>c.id===b);if(!h)h={id:b,name:p.toolName||"tool",args:p.args,text:"",status:r},i.toolCalls.push(h);if(h.status=r,p.args)h.args=p.args;return h}function Ii(i){return y(i)&&typeof i.type==="string"}async function Y(i,p,r,b,h=""){if(!i.backendStream){await pi(i,p,r,b,h);return}let c=++b.backendChatToken;b.sessionEventsAbort?.abort();let l=new AbortController;b.sessionEventsAbort=l;try{let f=await gi(i,"sessionEventsSse",Ci(i,h),l.signal);if(!f)throw Error("session SSE backend did not return a stream");await Li(f,(g)=>{if(c!==b.backendChatToken||g.type!=="chat.state")return;let w=X(i,r,mi(g),"chatState");if(w.length)A(p,w,r.activeSessionId)})}catch(f){if(!l.signal.aborted)await pi(i,p,r,b,h)}finally{if(b.sessionEventsAbort===l)b.sessionEventsAbort=void 0}}async function pi(i,p,r,b,h=""){let c=++b.backendChatToken;try{let l=await j(i,"chatState",Ci(i,h));if(c!==b.backendChatToken)return;let f=X(i,r,l,"chatState");if(f.length)A(p,f,r.activeSessionId)}catch{}}function Ci(i,p){let r=p?{sessionId:p}:{},b=oi(i);if(b)r.workspacePath=b;return r}function mi(i){return{activeSessionId:i.activeSessionId,messages:i.messages,isStreaming:i.isStreaming}}function oi(i){let p=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),r=i.app?.dataset.activeWorkspaceId||p?.activeWorkspaceId||"";return p?.workspaces?.find((b)=>b.id===r)?.path||""}function X(i,p,r,b){let h=Ri(r.messages);if(typeof r.activeSessionId==="string"&&r.activeSessionId){let l=p.activeSessionId;if(Q(p,r.activeSessionId),F(i,{sessionId:r.activeSessionId,workspaceId:i.app?.dataset.activeWorkspaceId||u(i)||void 0}),b!=="chatState"||l!==r.activeSessionId)k(i,"chat-session",{reason:b,sessionId:r.activeSessionId});if(b!=="chatState")wi(i,r.activeSessionId,b)}let c=R(p);if(h.length){if(c.messages=Ep(c.messages,h).slice(-a),c.title==="New chat"){let l=c.messages.find((f)=>f.role==="user");if(l)c.title=l.text.slice(0,48)||c.title}c.updatedAt=Date.now()}return M(p),c.messages}function ti(i,p,r,b,h){let c=(w)=>{if(!w?.sessionId)return;if(w.sessionId!==b.activeSessionId)h.runEventsAbort?.abort();F(p,w),Q(b,w.sessionId),A(r,R(b).messages,b.activeSessionId),Y(p,r,b,h,w.sessionId)},l=(w)=>{let L=ei(p,w);if(L)c(L)},f=p.app?.piWebSidebar?.channels?.selectedSession$||globalThis.piWebSidebar?.channels?.selectedSession$,g=p.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$;if(f)i.add(f.subscribe(c));if(g)i.add(g.subscribe(l));if(p.app)i.listen(p.app,"pi-web-sidebar:session-created",(w)=>{let L=w.detail||{},T=typeof L.sessionId==="string"?L.sessionId:"",O=typeof L.workspaceId==="string"?L.workspaceId:"";if(T)c({sessionId:T,workspaceId:O||void 0})});if(globalThis.piWeb)i.add(globalThis.piWeb.behaviorSubject(hi,J(p)).subscribe(c)),i.add(globalThis.piWeb.subject(ci).subscribe(l)),i.add(globalThis.piWeb.behaviorSubject("session.activeId",null).subscribe((w)=>{if(!w)return;c({sessionId:w,workspaceId:p.app?.dataset.activeWorkspaceId||G(q)||void 0})}))}function ei(i,p){if(!si(p.type))return null;let r=p.detail||{},b=typeof r.sessionId==="string"?r.sessionId:p.snapshot?.activeSessionId||"",h=typeof r.workspaceId==="string"?r.workspaceId:p.snapshot?.activeWorkspaceId||i.app?.dataset.activeWorkspaceId||"";if(!b)return null;return{sessionId:b,workspaceId:h||void 0}}function si(i){return i==="session.selected"||i==="session.created"||i==="new-session"||i==="active.start"}function Q(i,p){let r=i.sessions.find((b)=>b.id===p);if(!r)r=z(p),i.sessions.unshift(r);return i.activeSessionId=r.id,M(i),r}function A(i,p,r){bp(p,r),(i.querySelector(".term-inner")||i).replaceChildren(...p.map((h)=>ip(h,r)))}function ip(i,p){let r=document.createElement("article");r.className="transcript-item",r.dataset.messageId=i.id;let b=document.createElement("div");b.className="msg",b.dataset.kind=D(i.role);let h=document.createElement("span");h.className=`prefix ${D(i.role)}`,h.textContent=Op(i.role);let c=document.createElement("pre");if(c.className=`body ${D(i.role)}`,c.textContent=i.text,b.append(h,c),pp(i))r.append(b);if(i.thinking)r.append(rp(i.thinking,Boolean(i.streaming)));for(let l of i.toolCalls||[])r.append(hp(l,Oi(p,i,l)));if(i.streaming)r.dataset.streaming="true";return r}function pp(i){let p=i.text.trim().length>0;return i.role!=="assistant"||p}function rp(i,p){let r=document.createElement("details");r.className="msg-detail think thinking-block",r.open=p;let b=document.createElement("summary");b.className="label",b.textContent="THINKING";let h=document.createElement("pre");return h.className="body",h.textContent=i,r.append(b,h),r}function bp(i,p){let r=new Set;for(let b of i)for(let h of b.toolCalls||[])r.add(Oi(p,b,h));for(let b of H)if(!r.has(b))H.delete(b)}function Oi(i,p,r){return`${i}:${p.id}:${r.id}`}function hp(i,p){let r=document.createElement("div");r.className="tool-card",r.dataset.tool=i.name||"tool",r.dataset.status=i.status;let b=!H.has(p);r.dataset.collapsed=b?"true":"false";let h=document.createElement("button");if(h.type="button",h.className="tc-head",h.title=b?"Show tool output":"Hide tool output",h.setAttribute("aria-expanded",b?"false":"true"),h.setAttribute("aria-label",`${b?"Show":"Hide"} ${i.name||"tool"} output`),h.append(lp(i),fp(i),wp(i),gp(i,b)),!b)r.append(Ei(i));return h.addEventListener("click",()=>cp(r,h,i,p)),r.prepend(h),r}function Ei(i){let p=document.createElement("pre");return p.className="tc-body",p.textContent=i.text||JSON.stringify(i.args||{},null,2),p}function cp(i,p,r,b){let h=i.querySelector(".tc-body"),c=h!==null;if(h)h.remove(),H.delete(b);else i.append(Ei(r)),H.add(b);i.dataset.collapsed=c?"true":"false",p.setAttribute("aria-expanded",c?"false":"true"),p.setAttribute("aria-label",`${c?"Show":"Hide"} ${i.dataset.tool||"tool"} output`),p.title=c?"Show tool output":"Hide tool output";let l=p.querySelector(".tc-toggle-label");if(l)l.textContent=c?"show":"hide"}function lp(i){let p=document.createElement("span");p.className="tc-glyph";let r=Lp(i),b=r?Pi[r]:"";if(!r||!b)return p.textContent="●",p;return p.innerHTML=`<svg class="tc-icon" data-tool-icon="${r}" aria-hidden="true" viewBox="0 0 24 24">${b}</svg>`,p}function fp(i){let p=document.createElement("span");return p.className="tc-name",p.textContent=i.name||"tool",p}function wp(i){let p=document.createElement("span");return p.className="tc-args",p.textContent=_i(i),p}function gp(i,p){let r=document.createElement("span");if(r.className="tc-meta",i.status==="running"){let c=document.createElement("span");c.className="spinner",c.textContent="⠇";let l=document.createElement("span");return l.className="running",l.textContent="running",r.append(c,l,ri(p)),r}let b=document.createElement("span");b.className=i.status==="err"?"err":"ok",b.textContent=i.status==="err"?"✗":"✓";let h=document.createElement("span");return h.textContent=i.status==="err"?" · failed":" · done",r.append(b,h,ri(p)),r}function ri(i){let p=document.createElement("span");p.className="tc-toggle";let r=document.createElement("span");r.className="tc-toggle-label",r.textContent=i?"show":"hide";let b=document.createElement("span");return b.className="tc-caret",b.textContent="▸",p.append(r,b),p}function _i(i){if(!i.args)return"";return JSON.stringify(i.args)}function Lp(i){let p=Tp(i.name);if(["bash","shell","sh","zsh","terminal"].includes(p))return Cp(_i(i).toLowerCase())||"terminal";return Ui[p]}function Tp(i){return i.trim().replace(/^functions\./,"").replace(/^multi_tool_use\./,"")}function Cp(i){if(/\bgit\b|\bgh\b/.test(i))return"git-branch";if(/\b(go test|bun test|npm test|pnpm test|yarn test|vitest|pytest|cargo test)\b/.test(i))return"circle-check";if(/\b(bun|npm|pnpm|yarn)\s+(run\s+)?build\b|\b(go build|cargo build)\b/.test(i))return"hammer";if(/\b(bun|npm|pnpm|yarn)\s+(add|install|i)\b|\bpip\s+install\b|\bgo\s+get\b/.test(i))return"package";return}function Op(i){if(i==="assistant")return"pi >";if(i==="user")return"you >";if(i==="system")return"sys >";return"tool >"}function D(i){if(i==="assistant")return"pi";if(i==="system")return"sys";return i}function Ep(i,p){let r=new Map;for(let b of i)r.set(b.id,b);for(let b of p)r.set(b.id,{...r.get(b.id),...b});return[...r.values()].sort((b,h)=>b.createdAt-h.createdAt)}function R(i){let p=i.sessions.find((r)=>r.id===i.activeSessionId);if(!p)p=z(),i.sessions.unshift(p),i.activeSessionId=p.id,M(i);return p}function z(i=P()){let p=Date.now();return{id:i,title:"New chat",createdAt:p,updatedAt:p,messages:[]}}function G(i){try{return localStorage.getItem(i)||""}catch{return""}}function _p(i=""){try{let r=JSON.parse(localStorage.getItem(V)||"null");if(r&&typeof r.activeSessionId==="string"&&Array.isArray(r.sessions)){let b=r.sessions.filter(Ap).map(Rp);if(i&&!b.some((h)=>h.id===i))b.unshift(z(i));return{activeSessionId:i||r.activeSessionId,sessions:b}}}catch{}let p=z(i||void 0);return{activeSessionId:p.id,sessions:[p]}}function M(i){bi(i);try{localStorage.setItem(V,JSON.stringify(i))}catch{for(let p of i.sessions)p.messages=p.messages.slice(-Math.floor(a/2));bi(i);try{localStorage.setItem(V,JSON.stringify(i))}catch{}}}function Ai(i){if(!i?.length)return;return i.map(({content:p,...r})=>r)}function bi(i){i.sessions.sort((b,h)=>h.updatedAt-b.updatedAt);let p=i.sessions.find((b)=>b.id===i.activeSessionId),r=i.sessions.filter((b)=>b.id!==i.activeSessionId).slice(0,Math.max(0,e-1));i.sessions=p?[p,...r]:i.sessions.slice(0,e);for(let b of i.sessions)if(b.messages.length>a)b.messages.splice(0,b.messages.length-a)}function Ap(i){return y(i)&&typeof i.id==="string"&&Array.isArray(i.messages)}function Rp(i){return{...i,messages:Ri(i.messages)}}function Ri(i){return Array.isArray(i)?i.filter($p).map(Hp):[]}function Hp(i){if(!Array.isArray(i.toolCalls)){let{toolCalls:p,...r}=i;return r}return{...i,toolCalls:i.toolCalls.filter(Mp)}}function Mp(i){if(!y(i)||typeof i.id!=="string"||typeof i.name!=="string")return!1;return typeof i.text==="string"&&yp(i.status)}function yp(i){return i==="running"||i==="ok"||i==="err"}function $p(i){if(!y(i)||typeof i.id!=="string"||typeof i.text!=="string")return!1;return typeof i.createdAt==="number"&&xp(i.role)}function xp(i){return i==="user"||i==="assistant"||i==="tool"||i==="system"}function y(i){return typeof i==="object"&&i!==null}function P(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`}function Hi(i){return i instanceof Error?i.message:String(i)}export{$i as renderMessages,ui as promptFromAgUiLikeRunInput,I as pluginStyleText,Z as pluginClass,Zp as mergeCommands,u as getActiveWorkspaceId,Up as extractRefs,Zi as default,n as createComposerSurface,K as createChatSurface,yi as createChatDom,Pp as createChannels,Ni as createAgUiLikeRunInput,o as commandName,ai as chatEventsToAgUiLikeEvents,j as backendCall};
