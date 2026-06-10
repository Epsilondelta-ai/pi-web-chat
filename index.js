var M={attachFile:["M16.5 6v11.5a4 4 0 0 1-8 0V5a2.5 2.5 0 0 1 5 0v10.5a1 1 0 0 1-2 0V6H10v9.5","a2.5 2.5 0 0 0 5 0V5a4 4 0 0 0-8 0v12.5a5.5 5.5 0 0 0 11 0V6h-1.5Z"].join(""),stop:"M6 6h12v12H6V6Z",send:"M2 21 23 12 2 3v7l15 2-15 2v7Z",terminal:"M3 4h18v16H3V4Zm2 2v12h14V6H5Zm2 3 1.1-1.1L12.2 12l-4.1 4.1L7 15l3-3-3-3Zm6 6h5v1.5h-5V15Z",file:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 2.5L17.5 8H14V4.5ZM8 13h8v1.5H8V13Zm0 3h8v1.5H8V16Z"},P={attachFile:$("attach_file",M.attachFile),stop:$("stop",M.stop),send:$("send",M.send)};function $(i,p){return`<svg class="material-icon" data-material-icon="${i}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="${p}"></path></svg>`}function U(){return"pi-web-chat-mounted"}function W(){let i=document.createElement("main");return i.className="main pi-web-chat-surface",i.dataset.main="session",i.innerHTML='<div class="term"><div class="term-inner" role="log" aria-live="polite" aria-relevant="additions text"></div></div><button type="button" class="scroll-bottom-btn" data-action="scroll-bottom" aria-label="scroll to bottom" title="scroll to bottom" hidden>↓</button>',i}function v(){let i=document.createElement("section");return i.className="prompt-region pi-web-chat-composer",i.innerHTML=`
    <div class="slash-pop" hidden><div class="slash-head">slash commands · type to filter</div><div class="slash-list"></div></div>
    <div class="prompt-bar">
      <button class="attach-btn" type="button" aria-label="attach files" title="attach files">${P.attachFile}</button>
      <input type="file" multiple hidden data-file-input />
      <div class="prompt-input-col"><div class="attach-chips" hidden></div><textarea class="prompt-textarea" aria-label="Prompt" placeholder="ask pi to do something…" rows="1"></textarea></div>
      <div class="prompt-actions">
        <button class="stop-btn" type="button" aria-label="stop" title="stop" hidden>${P.stop}</button>
        <button class="mic-btn" type="button" data-action="toggle-speech-input" aria-label="start voice input" title="voice input" hidden>\uD83C\uDF99</button>
        <button class="send-btn" type="button" aria-label="send" title="send" aria-disabled="true">${P.send}</button>
      </div>
      <div class="drop-overlay" hidden><span>drop to attach</span></div>
    </div>
    <div class="prompt-meta" data-prompt-meta>— | <span class="prompt-meta-item prompt-meta-branch"><span>—</span></span></div>`,i}function n(i){let p=document.createElement("span");return p.className="prompt-meta-item pi-web-chat-badge",p.textContent="chat plugin",i.querySelector("[data-prompt-meta]")?.append(p),p}function Ai(){let i=document.createElement("section");return i.className="pi-web-chat-root",i.dataset.plugin="pi-web-chat",i.innerHTML=`
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
        <button class="pi-web-chat-icon-btn" type="button" data-attach aria-label="attach files" title="attach files">${$("attach_file",M.attachFile)}</button>
        <input type="file" multiple hidden data-file-input />
        <textarea class="pi-web-chat-textarea" data-chat-input aria-label="Prompt" placeholder="ask pi to do something…" rows="1"></textarea>
        <button class="pi-web-chat-send" type="button" data-send aria-label="send" title="send" aria-disabled="true">${$("send",M.send)}</button>
      </div>
    </section>`,{root:i,transcript:E(i.querySelector("[data-chat-transcript]")),textarea:E(i.querySelector("[data-chat-input]")),sendButton:E(i.querySelector("[data-send]")),attachButton:E(i.querySelector("[data-attach]")),fileInput:E(i.querySelector("[data-file-input]")),slashPopover:E(i.querySelector("[data-slash-popover]")),slashList:E(i.querySelector("[data-slash-list]")),refsPopover:E(i.querySelector("[data-refs-popover]")),refsList:E(i.querySelector("[data-refs-list]")),attachments:E(i.querySelector("[data-attachments]"))}}function Ri(i,p){i.replaceChildren(...p.map(Hi)),i.scrollTop=i.scrollHeight}function Hi(i){let p=document.createElement("article");p.className=`pi-web-chat-message pi-web-chat-message-${i.role}`,p.dataset.messageId=i.id;let r=document.createElement("div");r.className="pi-web-chat-message-role",r.textContent=i.role;let b=document.createElement("pre");if(b.className="pi-web-chat-message-body",b.textContent=i.text,p.append(r,b),i.thinking){let h=document.createElement("details");h.className="pi-web-chat-thinking",h.open=Boolean(i.streaming);let c=document.createElement("summary");c.textContent="thinking";let l=document.createElement("pre");l.textContent=i.thinking,h.append(c,l),p.append(h)}if(i.toolCalls?.length){let h=document.createElement("div");h.className="pi-web-chat-tools";for(let c of i.toolCalls){let l=document.createElement("details");l.className=`pi-web-chat-tool pi-web-chat-tool-${c.status}`,l.open=c.status==="running";let f=document.createElement("summary");f.textContent=`${c.name} · ${c.status}`;let g=document.createElement("pre");g.textContent=c.text||JSON.stringify(c.args||{},null,2),l.append(f,g),h.append(l)}p.append(h)}if(i.streaming){let h=document.createElement("div");h.className="pi-web-chat-message-meta",h.textContent="streaming...",p.append(h)}if(i.attachments?.length){let h=document.createElement("div");h.className="pi-web-chat-message-meta",h.textContent=`${i.attachments.length} attachment(s)`,p.append(h)}return p}function d(i,p){i.hidden=p.length===0,i.replaceChildren(...p.map((r)=>{let b=document.createElement("span");return b.className="pi-web-chat-attachment-chip",b.textContent=r,b}))}function S(){return`
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
  `}function I(){document.getElementById("pi-web-chat-style")?.remove();let i=document.createElement("style");return i.id="pi-web-chat-style",i.textContent=S(),document.head.append(i),i}function m(i){return i.command||i.cmd||(i.name?`/${i.name}`:"")}function E(i){if(!i)throw Error("pi-web-chat DOM template is invalid");return i}function Mi(i,p,r){return{threadId:i,runId:p,state:{},messages:r,tools:[],context:[]}}function $i(i){let p=[...i.messages].reverse().find((r)=>r.role==="user");return{text:p?.text||"",attachments:p?.attachments||[],sessionId:i.threadId}}function xi(i,p,r){return i.map((b)=>ui(b,p,r))}function ui(i,p,r){if(i.type==="text.delta")return{type:"TEXT_MESSAGE_CONTENT",threadId:p,runId:r,delta:i.delta||""};if(i.type==="thinking.delta")return{type:"THINKING_MESSAGE_CONTENT",threadId:p,runId:r,delta:i.delta||""};if(i.type==="tool.start")return{type:"TOOL_CALL_START",threadId:p,runId:r,toolCallId:i.toolCallId,payload:o(i)};if(i.type==="tool.delta")return{type:"TOOL_CALL_ARGS",threadId:p,runId:r,toolCallId:i.toolCallId,delta:i.delta||""};if(i.type==="tool.end")return{type:"TOOL_CALL_END",threadId:p,runId:r,toolCallId:i.toolCallId,payload:o(i)};return{type:i.type.toUpperCase().replaceAll(".","_"),threadId:p,runId:r,payload:i}}function o(i){return{name:i.toolName||"tool",args:i.args||{},result:i.result||"",isError:i.isError===!0}}var D="pi-web-chat.sessions.v1";var bi="plugin.pi-web-sidebar.selectedSession",hi="plugin.pi-web-sidebar.event",ci="plugin.pi-web-sidebar.activeSessionId",G="plugin.pi-web-sidebar.activeWorkspaceId";var t=20,u=200,Ni=8,ki=1e6;var zi={"book-open":'<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',"file-plus":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="M9 15h6"/>',pencil:'<path d="M21.2 6.8 17.2 2.8a2 2 0 0 0-2.8 0L3 14.2V21h6.8L21.2 9.6a2 2 0 0 0 0-2.8z"/><path d="m14 5 5 5"/>',terminal:'<path d="m4 17 6-6-6-6"/><path d="M12 19h8"/>',cpu:'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 15h3"/><path d="M1 9h3"/><path d="M1 15h3"/>',globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 0 20"/><path d="M12 2a15.3 15.3 0 0 0 0 20"/>',search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',braces:'<path d="M8 3H7a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-4a2 2 0 0 1 2-2 2 2 0 0 1-2-2V7a2 2 0 0 0-2-2h-1"/>',"file-text":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',"circle-question-mark":'<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 1 1 5.8 1c-.5 1-1.4 1.5-2.1 2-.6.4-.8.8-.8 2"/><path d="M12 17h.01"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',plug:'<path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a6 6 0 0 1-12 0V8Z"/>',"git-branch":'<line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',"circle-check":'<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',hammer:'<path d="m15 12-8.5 8.5a2.1 2.1 0 0 1-3-3L12 9"/><path d="m17.6 5.4 1.8-1.8"/><path d="m14 7 3 3"/><path d="M5 11 2 8l6-6 3 3"/>',package:'<path d="m7.5 4.3 9 5.2"/><path d="M21 8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>'},Fi={read:"book-open",write:"file-plus",edit:"pencil",ctx_execute:"cpu",ctx_batch_execute:"cpu",ctx_execute_file:"cpu",ctx_search:"cpu",ctx_index:"cpu",ctx_fetch_and_index:"cpu",web_search:"globe",fetch_content:"search",get_search_content:"search",code_search:"braces",document_parse:"file-text",ask_user_question:"circle-question-mark",teams:"users",subagent:"users",mcp:"plug",git:"git-branch"};class li{#i=[];add(i){if(i)this.#i.push(i);return i}listen(i,p,r){i.addEventListener(p,r),this.add({remove:()=>i.removeEventListener(p,r)})}dispose(){for(let i of this.#i.splice(0).reverse())if(typeof i==="function")i();else if("unsubscribe"in i)i.unsubscribe();else i.remove()}}function Pi(i={}){let p=i.app;if(p?.piWebChat?.dispose(),typeof i.mount?.chat!=="function"||typeof i.mount?.composer!=="function")throw Error("pi-web-chat requires modern pi-web mount.chat and mount.composer APIs");return Ui(i,p)}function Ui(i,p){let r=new li,b=r.add(I()),h=W(),c=v(),l=i.mount?.chat(h,{replace:!0}),f=i.mount?.composer(c,{replace:!0});if(l)r.add(l);if(f)r.add(f);let g=q(i);z(i,g||void 0);let w=Cp(g?.sessionId||""),L={backendChatToken:0};_(h,a(w).messages),j(i,h,w,L,g?.sessionId||w.activeSessionId),mi(r,i,h,w,L),Zi(r,i,c,h,w,L);let T=p?r.add(n(p)):void 0;p?.classList.add(U());let O=()=>{if(L.runEventsAbort?.abort(),L.sessionEventsAbort?.abort(),r.dispose(),T?.remove(),b.remove(),p?.classList.remove(U()),p?.piWebChat===H)delete p.piWebChat},H={dispose:O};if(p)p.piWebChat=H;return O}function Zi(i,p,r,b,h,c){let l=r.querySelector(".prompt-textarea"),f=r.querySelector(".send-btn"),g=r.querySelector(".attach-btn"),w=r.querySelector("[data-file-input]"),L=r.querySelector(".attach-chips");if(!l||!f)return;let T=[],O=()=>{let C=l.value;f.setAttribute("aria-disabled",C.trim()?"false":"true")},H=()=>{if(!L)return;d(L,T.map((C)=>{return C.name||"attachment"}))},X=async(C)=>{C?.preventDefault(),C?.stopImmediatePropagation();let y=l.value.trim();if(O(),!y)return;let Q=[...T];f.disabled=!0;try{if(Ki(y,Q),await Gi(p,b,h,c,y,Q),T=[],H(),l.value.trim()===y)l.value="";if(w)w.value=""}catch(ai){_(b,[Bi(ai)])}finally{f.disabled=!1,O()}};if(i.listen(l,"input",O),i.listen(l,"keydown",(C)=>{let y=C;if(y.key==="Enter"&&(y.metaKey||y.ctrlKey))X(y)}),i.listen(f,"click",(C)=>{X(C)}),g&&w)i.listen(g,"click",()=>w.click()),i.listen(w,"change",()=>{Di(w,(C)=>{T=C,H()})})}function Bi(i){return{id:F(),role:"system",text:`prompt failed: ${_i(i)}`,createdAt:Date.now()}}async function Di(i,p){let r=Array.from(i.files||[]).slice(0,Ni),b=[];for(let h of r){if(h.size>ki)continue;b.push({name:h.name,size:h.size,content:await h.text(),mimeType:h.type||void 0})}p(b)}function kp(i){return{input$:i.behaviorSubject("chat.input",""),submitted$:i.subject("chat.input.submitted"),activeSessionId$:i.behaviorSubject("session.activeId",null),sidebarSelectedSession$:i.behaviorSubject(bi,Vi()),toastRequested$:i.subject("toast.requested")}}function zp(i){let p=[],r=new Set,b=/(^|[\s`])@([^\s@`]+)/g,h=b.exec(String(i||""));while(h!==null){let c=h[2]||"";if((h[1]||"")!=="`"&&c&&!r.has(c))r.add(c),p.push(c);h=b.exec(String(i||""))}return p}function Fp(i=[],p=[]){let r=[],b=new Set;for(let h of[...i,...p]){let c=m(h);if(!c||b.has(c))continue;b.add(c),r.push(h)}return r}function x(i){return i.app?.piWebSidebar?.getSnapshot?.().activeWorkspaceId||i.app?.dataset.activeWorkspaceId||""}function Vi(){return q({})}function q(i){let p=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),r=p?.activeSessionId||"",b=p?.activeWorkspaceId||"";if(r)return{sessionId:r,workspaceId:b||void 0};let h=V(ci),c=V(G);return h?{sessionId:h,workspaceId:c||void 0}:null}function z(i,p){if(p?.workspaceId&&i.app)i.app.dataset.activeWorkspaceId=p.workspaceId,e(G,p.workspaceId);if(p?.sessionId)i.app?.setAttribute("data-active-session-id",p.sessionId),e(ci,p.sessionId)}function N(i,p,r={}){let b=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),h={type:p,detail:r,snapshot:b};(i.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$)?.next(h),globalThis.piWeb?.subject(hi).next(h)}function fi(i,p,r){let b=i.app?.dataset.activeWorkspaceId||x(i),h={reason:r,sessionId:p,workspaceId:b};globalThis.piWeb?.behaviorSubject("session.activeId",p).next(p),globalThis.piWeb?.subject("session.changed").next({sessionId:p,workspaceId:b,reason:r}),N(i,"active.start",h),N(i,"session.created",h)}function e(i,p){try{localStorage.setItem(i,p)}catch{}}async function J(i,p,r={}){if(!i.backend)return{};let b=x(i),h=await i.backend(p,{workspaceId:b,data:r});return R(h)?h:{}}async function Gi(i,p,r,b,h,c){b.backendChatToken+=1,b.runEventsAbort?.abort(),b.runEventsAbort=new AbortController,b.sessionEventsAbort?.abort();let l={id:F(),role:"user",text:h,attachments:Ei(c),createdAt:Date.now()},f=a(r);f.messages.push(l),f.updatedAt=Date.now(),A(r),_(p,f.messages);let g=await Xi(i,h,c,r.activeSessionId);if(typeof g.activeSessionId==="string"&&g.activeSessionId){let L=r.activeSessionId,T=K(r,g.activeSessionId);if(L!==T.id&&!T.messages.some((O)=>O.id===l.id))T.messages.push(l),T.updatedAt=Date.now();z(i,{sessionId:g.activeSessionId,workspaceId:i.app?.dataset.activeWorkspaceId||x(i)||void 0}),N(i,"chat-session",{reason:"startPrompt",sessionId:g.activeSessionId}),fi(i,g.activeSessionId,"startPrompt")}if(typeof g.runId!=="string"||!g.runId){let L=await Wi(i,h,c,r.activeSessionId),T=Y(i,r,L,"submitPrompt");_(p,T);return}let w=vi(r);try{await qi(i,r,g.runId,w,()=>_(p,a(r).messages),b.runEventsAbort.signal)}finally{b.runEventsAbort=void 0}j(i,p,r,b,r.activeSessionId)}async function qi(i,p,r,b,h,c){let l=await wi(i,"streamEventsSse",{runId:r,cursor:0},c);if(!l)throw Error("SSE streaming backend did not return a stream");b.streaming=!0,h();try{await gi(l,(f)=>{ni(b,[f]),b.streaming=f.type!=="run.end",a(p).updatedAt=Date.now(),A(p),h()})}finally{b.streaming=!1,A(p),h()}}async function wi(i,p,r={},b){if(!i.backendStream)throw Error("SSE streaming backend is unavailable");let h=x(i),c=await i.backendStream(p,{workspaceId:h,data:r},{signal:b});return Ji(c)}function Ji(i){if(typeof ReadableStream<"u"&&i instanceof ReadableStream)return i;if(typeof Response<"u"&&i instanceof Response)return i.body;if(typeof i==="string")return s(i);if(!R(i))return null;let p=i.body;if(typeof ReadableStream<"u"&&p instanceof ReadableStream)return p;let r=i.sse;if(typeof r==="string")return s(r);return null}function s(i){let p=new TextEncoder().encode(i);return new ReadableStream({start(r){r.enqueue(p),r.close()}})}async function gi(i,p){let r=i.getReader(),b=new TextDecoder,h="";while(!0){let c=await r.read();if(c.done){h+=b.decode(),Yi(h,p);return}h+=b.decode(c.value,{stream:!0});let l=ji(h);h=l.remainder;for(let f of l.frames)Li(f,p)}}function ji(i){let r=i.replaceAll(`\r
`,`
`).replaceAll("\r",`
`).split(`

`),b=r.pop()||"";return{frames:r,remainder:b}}function Yi(i,p){let r=i.trim();if(r)Li(r,p)}function Li(i,p){let r=i.split(`
`).filter((b)=>b.startsWith("data:")).map((b)=>b.slice(5).trimStart()).join(`
`);if(!r)return;try{let b=JSON.parse(r);if(di(b))p(b)}catch{}}function Ki(i,p){globalThis.piWeb?.subject("chat.input.submitted").next({text:i,attachments:Ei(p)||[]})}async function Xi(i,p,r,b){try{return await J(i,"startPrompt",{text:p,attachments:r,sessionId:b})}catch(h){if(Qi(h))return{};throw h}}function Qi(i){return/unknown method: (startPrompt|streamEventsSse)|unsupported method: (startPrompt|streamEventsSse)|(startPrompt|streamEventsSse) unsupported/i.test(_i(i))}async function Wi(i,p,r,b=""){return await J(i,"submitPrompt",{text:p,attachments:r,sessionId:b})}function vi(i){let p=a(i),r=[...p.messages].reverse().find((h)=>h.role==="assistant"&&h.streaming);if(r)return r;let b={id:F(),role:"assistant",text:"",createdAt:Date.now(),streaming:!0};return p.messages.push(b),b}function ni(i,p){for(let r of p)if(r.type==="text.delta"&&typeof r.delta==="string")i.text+=r.delta;else if(r.type==="thinking.delta"&&typeof r.delta==="string")i.thinking=`${i.thinking||""}${r.delta}`;else if(r.type==="tool.start")Z(i,r,"running");else if(r.type==="tool.delta"&&typeof r.delta==="string"){let b=Z(i,r,"running");b.text=r.delta}else if(r.type==="tool.end"){let b=Z(i,r,r.isError?"err":"ok");if(typeof r.result==="string"&&r.result)b.text=r.result}else if(r.type==="error"&&typeof r.message==="string")i.text+=`${i.text?`
`:""}${r.message}`}function Z(i,p,r){let b=p.toolCallId||p.toolName||"tool";i.toolCalls||=[];let h=i.toolCalls.find((c)=>c.id===b);if(!h)h={id:b,name:p.toolName||"tool",args:p.args,text:"",status:r},i.toolCalls.push(h);if(h.status=r,p.args)h.args=p.args;return h}function di(i){return R(i)&&typeof i.type==="string"}async function j(i,p,r,b,h=""){if(!i.backendStream){await ii(i,p,r,b,h);return}let c=++b.backendChatToken;b.sessionEventsAbort?.abort();let l=new AbortController;b.sessionEventsAbort=l;try{let f=await wi(i,"sessionEventsSse",Ti(i,h),l.signal);if(!f)throw Error("session SSE backend did not return a stream");await gi(f,(g)=>{if(c!==b.backendChatToken||g.type!=="chat.state")return;let w=Y(i,r,Si(g),"chatState");if(w.length)_(p,w)})}catch(f){if(!l.signal.aborted)await ii(i,p,r,b,h)}finally{if(b.sessionEventsAbort===l)b.sessionEventsAbort=void 0}}async function ii(i,p,r,b,h=""){let c=++b.backendChatToken;try{let l=await J(i,"chatState",Ti(i,h));if(c!==b.backendChatToken)return;let f=Y(i,r,l,"chatState");if(f.length)_(p,f)}catch{}}function Ti(i,p){let r=p?{sessionId:p}:{},b=Ii(i);if(b)r.workspacePath=b;return r}function Si(i){return{activeSessionId:i.activeSessionId,messages:i.messages,isStreaming:i.isStreaming}}function Ii(i){let p=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),r=i.app?.dataset.activeWorkspaceId||p?.activeWorkspaceId||"";return p?.workspaces?.find((b)=>b.id===r)?.path||""}function Y(i,p,r,b){let h=yi(r.messages);if(typeof r.activeSessionId==="string"&&r.activeSessionId){let l=p.activeSessionId;if(K(p,r.activeSessionId),z(i,{sessionId:r.activeSessionId,workspaceId:i.app?.dataset.activeWorkspaceId||x(i)||void 0}),b!=="chatState"||l!==r.activeSessionId)N(i,"chat-session",{reason:b,sessionId:r.activeSessionId});if(b!=="chatState")fi(i,r.activeSessionId,b)}let c=a(p);if(h.length){if(c.messages=Tp(c.messages,h).slice(-u),c.title==="New chat"){let l=c.messages.find((f)=>f.role==="user");if(l)c.title=l.text.slice(0,48)||c.title}c.updatedAt=Date.now()}return A(p),c.messages}function mi(i,p,r,b,h){let c=(w)=>{if(!w?.sessionId)return;if(w.sessionId!==b.activeSessionId)h.runEventsAbort?.abort();z(p,w),K(b,w.sessionId),_(r,a(b).messages),j(p,r,b,h,w.sessionId)},l=(w)=>{let L=oi(p,w);if(L)c(L)},f=p.app?.piWebSidebar?.channels?.selectedSession$||globalThis.piWebSidebar?.channels?.selectedSession$,g=p.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$;if(f)i.add(f.subscribe(c));if(g)i.add(g.subscribe(l));if(p.app)i.listen(p.app,"pi-web-sidebar:session-created",(w)=>{let L=w.detail||{},T=typeof L.sessionId==="string"?L.sessionId:"",O=typeof L.workspaceId==="string"?L.workspaceId:"";if(T)c({sessionId:T,workspaceId:O||void 0})});if(globalThis.piWeb)i.add(globalThis.piWeb.behaviorSubject(bi,q(p)).subscribe(c)),i.add(globalThis.piWeb.subject(hi).subscribe(l)),i.add(globalThis.piWeb.behaviorSubject("session.activeId",null).subscribe((w)=>{if(!w)return;c({sessionId:w,workspaceId:p.app?.dataset.activeWorkspaceId||V(G)||void 0})}))}function oi(i,p){if(!ti(p.type))return null;let r=p.detail||{},b=typeof r.sessionId==="string"?r.sessionId:p.snapshot?.activeSessionId||"",h=typeof r.workspaceId==="string"?r.workspaceId:p.snapshot?.activeWorkspaceId||i.app?.dataset.activeWorkspaceId||"";if(!b)return null;return{sessionId:b,workspaceId:h||void 0}}function ti(i){return i==="session.selected"||i==="session.created"||i==="new-session"||i==="active.start"}function K(i,p){let r=i.sessions.find((b)=>b.id===p);if(!r)r=k(p),i.sessions.unshift(r);return i.activeSessionId=r.id,A(i),r}function _(i,p){(i.querySelector(".term-inner")||i).replaceChildren(...p.map(ei))}function ei(i){let p=document.createElement("article");p.className="transcript-item",p.dataset.messageId=i.id;let r=document.createElement("div");r.className="msg",r.dataset.kind=B(i.role);let b=document.createElement("span");b.className=`prefix ${B(i.role)}`,b.textContent=Lp(i.role);let h=document.createElement("pre");if(h.className=`body ${B(i.role)}`,h.textContent=i.text,r.append(b,h),si(i))p.append(r);if(i.thinking)p.append(ip(i.thinking,Boolean(i.streaming)));for(let c of i.toolCalls||[])p.append(pp(c));if(i.streaming)p.dataset.streaming="true";return p}function si(i){let p=i.text.trim().length>0;return i.role!=="assistant"||p}function ip(i,p){let r=document.createElement("details");r.className="msg-detail think thinking-block",r.open=p;let b=document.createElement("summary");b.className="label",b.textContent="THINKING";let h=document.createElement("pre");return h.className="body",h.textContent=i,r.append(b,h),r}function pp(i){let p=document.createElement("div");p.className="tool-card",p.dataset.tool=i.name||"tool",p.dataset.status=i.status;let r=i.status!=="running";p.dataset.collapsed=r?"true":"false";let b=document.createElement("button");if(b.type="button",b.className="tc-head",b.title=r?"Show tool output":"Hide tool output",b.setAttribute("aria-expanded",r?"false":"true"),b.setAttribute("aria-label",`${r?"Show":"Hide"} ${i.name||"tool"} output`),b.append(bp(i),hp(i),cp(i),lp(i)),!r)p.append(Ci(i));return b.addEventListener("click",()=>rp(p,b,i)),p.prepend(b),p}function Ci(i){let p=document.createElement("pre");return p.className="tc-body",p.textContent=i.text||JSON.stringify(i.args||{},null,2),p}function rp(i,p,r){let b=i.querySelector(".tc-body"),h=b!==null;if(b)b.remove();else i.append(Ci(r));i.dataset.collapsed=h?"true":"false",p.setAttribute("aria-expanded",h?"false":"true"),p.setAttribute("aria-label",`${h?"Show":"Hide"} ${i.dataset.tool||"tool"} output`),p.title=h?"Show tool output":"Hide tool output";let c=p.querySelector(".tc-toggle-label");if(c)c.textContent=h?"show":"hide"}function bp(i){let p=document.createElement("span");p.className="tc-glyph";let r=fp(i),b=r?zi[r]:"";if(!r||!b)return p.textContent="●",p;return p.innerHTML=`<svg class="tc-icon" data-tool-icon="${r}" aria-hidden="true" viewBox="0 0 24 24">${b}</svg>`,p}function hp(i){let p=document.createElement("span");return p.className="tc-name",p.textContent=i.name||"tool",p}function cp(i){let p=document.createElement("span");return p.className="tc-args",p.textContent=Oi(i),p}function lp(i){let p=document.createElement("span");if(p.className="tc-meta",i.status==="running"){let h=document.createElement("span");h.className="spinner",h.textContent="⠇";let c=document.createElement("span");return c.className="running",c.textContent="running",p.append(h,c,pi(i.status)),p}let r=document.createElement("span");r.className=i.status==="err"?"err":"ok",r.textContent=i.status==="err"?"✗":"✓";let b=document.createElement("span");return b.textContent=i.status==="err"?" · failed":" · done",p.append(r,b,pi()),p}function pi(i="ok"){let p=document.createElement("span");p.className="tc-toggle";let r=document.createElement("span");r.className="tc-toggle-label",r.textContent=i==="running"?"hide":"show";let b=document.createElement("span");return b.className="tc-caret",b.textContent="▸",p.append(r,b),p}function Oi(i){if(!i.args)return"";return JSON.stringify(i.args)}function fp(i){let p=wp(i.name);if(["bash","shell","sh","zsh","terminal"].includes(p))return gp(Oi(i).toLowerCase())||"terminal";return Fi[p]}function wp(i){return i.trim().replace(/^functions\./,"").replace(/^multi_tool_use\./,"")}function gp(i){if(/\bgit\b|\bgh\b/.test(i))return"git-branch";if(/\b(go test|bun test|npm test|pnpm test|yarn test|vitest|pytest|cargo test)\b/.test(i))return"circle-check";if(/\b(bun|npm|pnpm|yarn)\s+(run\s+)?build\b|\b(go build|cargo build)\b/.test(i))return"hammer";if(/\b(bun|npm|pnpm|yarn)\s+(add|install|i)\b|\bpip\s+install\b|\bgo\s+get\b/.test(i))return"package";return}function Lp(i){if(i==="assistant")return"pi >";if(i==="user")return"you >";if(i==="system")return"sys >";return"tool >"}function B(i){if(i==="assistant")return"pi";if(i==="system")return"sys";return i}function Tp(i,p){let r=new Map;for(let b of i)r.set(b.id,b);for(let b of p)r.set(b.id,{...r.get(b.id),...b});return[...r.values()].sort((b,h)=>b.createdAt-h.createdAt)}function a(i){let p=i.sessions.find((r)=>r.id===i.activeSessionId);if(!p)p=k(),i.sessions.unshift(p),i.activeSessionId=p.id,A(i);return p}function k(i=F()){let p=Date.now();return{id:i,title:"New chat",createdAt:p,updatedAt:p,messages:[]}}function V(i){try{return localStorage.getItem(i)||""}catch{return""}}function Cp(i=""){try{let r=JSON.parse(localStorage.getItem(D)||"null");if(r&&typeof r.activeSessionId==="string"&&Array.isArray(r.sessions)){let b=r.sessions.filter(Op).map(Ep);if(i&&!b.some((h)=>h.id===i))b.unshift(k(i));return{activeSessionId:i||r.activeSessionId,sessions:b}}}catch{}let p=k(i||void 0);return{activeSessionId:p.id,sessions:[p]}}function A(i){ri(i);try{localStorage.setItem(D,JSON.stringify(i))}catch{for(let p of i.sessions)p.messages=p.messages.slice(-Math.floor(u/2));ri(i);try{localStorage.setItem(D,JSON.stringify(i))}catch{}}}function Ei(i){if(!i?.length)return;return i.map(({content:p,...r})=>r)}function ri(i){i.sessions.sort((b,h)=>h.updatedAt-b.updatedAt);let p=i.sessions.find((b)=>b.id===i.activeSessionId),r=i.sessions.filter((b)=>b.id!==i.activeSessionId).slice(0,Math.max(0,t-1));i.sessions=p?[p,...r]:i.sessions.slice(0,t);for(let b of i.sessions)if(b.messages.length>u)b.messages.splice(0,b.messages.length-u)}function Op(i){return R(i)&&typeof i.id==="string"&&Array.isArray(i.messages)}function Ep(i){return{...i,messages:yi(i.messages)}}function yi(i){return Array.isArray(i)?i.filter(Ap).map(yp):[]}function yp(i){if(!Array.isArray(i.toolCalls)){let{toolCalls:p,...r}=i;return r}return{...i,toolCalls:i.toolCalls.filter(_p)}}function _p(i){if(!R(i)||typeof i.id!=="string"||typeof i.name!=="string")return!1;return typeof i.text==="string"&&ap(i.status)}function ap(i){return i==="running"||i==="ok"||i==="err"}function Ap(i){if(!R(i)||typeof i.id!=="string"||typeof i.text!=="string")return!1;return typeof i.createdAt==="number"&&Rp(i.role)}function Rp(i){return i==="user"||i==="assistant"||i==="tool"||i==="system"}function R(i){return typeof i==="object"&&i!==null}function F(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`}function _i(i){return i instanceof Error?i.message:String(i)}export{Ri as renderMessages,$i as promptFromAgUiLikeRunInput,S as pluginStyleText,U as pluginClass,Fp as mergeCommands,x as getActiveWorkspaceId,zp as extractRefs,Pi as default,v as createComposerSurface,W as createChatSurface,Ai as createChatDom,kp as createChannels,Mi as createAgUiLikeRunInput,m as commandName,xi as chatEventsToAgUiLikeEvents,J as backendCall};
