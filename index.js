var A={attachFile:["M16.5 6v11.5a4 4 0 0 1-8 0V5a2.5 2.5 0 0 1 5 0v10.5a1 1 0 0 1-2 0V6H10v9.5","a2.5 2.5 0 0 0 5 0V5a4 4 0 0 0-8 0v12.5a5.5 5.5 0 0 0 11 0V6h-1.5Z"].join(""),stop:"M6 6h12v12H6V6Z",send:"M2 21 23 12 2 3v7l15 2-15 2v7Z",terminal:"M3 4h18v16H3V4Zm2 2v12h14V6H5Zm2 3 1.1-1.1L12.2 12l-4.1 4.1L7 15l3-3-3-3Zm6 6h5v1.5h-5V15Z",file:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 2.5L17.5 8H14V4.5ZM8 13h8v1.5H8V13Zm0 3h8v1.5H8V16Z"},F={attachFile:x("attach_file",A.attachFile),stop:x("stop",A.stop),send:x("send",A.send)};function x(i,p){return`<svg class="material-icon" data-material-icon="${i}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="${p}"></path></svg>`}function P(){return"pi-web-chat-mounted"}function K(){let i=document.createElement("main");return i.className="main pi-web-chat-surface",i.dataset.main="session",i.innerHTML='<div class="term"><div class="term-inner" role="log" aria-live="polite" aria-relevant="additions text"></div></div><button type="button" class="scroll-bottom-btn" data-action="scroll-bottom" aria-label="scroll to bottom" title="scroll to bottom" hidden>↓</button>',i}function X(){let i=document.createElement("section");return i.className="prompt-region pi-web-chat-composer",i.innerHTML=`
    <div class="slash-pop" hidden><div class="slash-head">slash commands · type to filter</div><div class="slash-list"></div></div>
    <div class="prompt-bar">
      <button class="attach-btn" type="button" aria-label="attach files" title="attach files">${F.attachFile}</button>
      <input type="file" multiple hidden data-file-input />
      <div class="prompt-input-col"><div class="attach-chips" hidden></div><textarea class="prompt-textarea" aria-label="Prompt" placeholder="ask pi to do something…" rows="1"></textarea></div>
      <div class="prompt-actions">
        <button class="stop-btn" type="button" aria-label="stop" title="stop" hidden>${F.stop}</button>
        <button class="mic-btn" type="button" data-action="toggle-speech-input" aria-label="start voice input" title="voice input" hidden>\uD83C\uDF99</button>
        <button class="send-btn" type="button" aria-label="send" title="send" aria-disabled="true">${F.send}</button>
      </div>
      <div class="drop-overlay" hidden><span>drop to attach</span></div>
    </div>
    <div class="prompt-meta" data-prompt-meta>— | <span class="prompt-meta-item prompt-meta-branch"><span>—</span></span></div>`,i}function Q(i){let p=document.createElement("span");return p.className="prompt-meta-item pi-web-chat-badge",p.textContent="chat plugin",i.querySelector("[data-prompt-meta]")?.append(p),p}function Ci(){let i=document.createElement("section");return i.className="pi-web-chat-root",i.dataset.plugin="pi-web-chat",i.innerHTML=`
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
        <button class="pi-web-chat-icon-btn" type="button" data-attach aria-label="attach files" title="attach files">${x("attach_file",A.attachFile)}</button>
        <input type="file" multiple hidden data-file-input />
        <textarea class="pi-web-chat-textarea" data-chat-input aria-label="Prompt" placeholder="ask pi to do something…" rows="1"></textarea>
        <button class="pi-web-chat-send" type="button" data-send aria-label="send" title="send" aria-disabled="true">${x("send",A.send)}</button>
      </div>
    </section>`,{root:i,transcript:O(i.querySelector("[data-chat-transcript]")),textarea:O(i.querySelector("[data-chat-input]")),sendButton:O(i.querySelector("[data-send]")),attachButton:O(i.querySelector("[data-attach]")),fileInput:O(i.querySelector("[data-file-input]")),slashPopover:O(i.querySelector("[data-slash-popover]")),slashList:O(i.querySelector("[data-slash-list]")),refsPopover:O(i.querySelector("[data-refs-popover]")),refsList:O(i.querySelector("[data-refs-list]")),attachments:O(i.querySelector("[data-attachments]"))}}function ni(i,p){i.replaceChildren(...p.map(yi)),i.scrollTop=i.scrollHeight}function yi(i){let p=document.createElement("article");p.className=`pi-web-chat-message pi-web-chat-message-${i.role}`,p.dataset.messageId=i.id;let r=document.createElement("div");r.className="pi-web-chat-message-role",r.textContent=i.role;let c=document.createElement("pre");if(c.className="pi-web-chat-message-body",c.textContent=i.text,p.append(r,c),i.thinking){let b=document.createElement("details");b.className="pi-web-chat-thinking",b.open=Boolean(i.streaming);let h=document.createElement("summary");h.textContent="thinking";let l=document.createElement("pre");l.textContent=i.thinking,b.append(h,l),p.append(b)}if(i.toolCalls?.length){let b=document.createElement("div");b.className="pi-web-chat-tools";for(let h of i.toolCalls){let l=document.createElement("details");l.className=`pi-web-chat-tool pi-web-chat-tool-${h.status}`,l.open=h.status==="running";let f=document.createElement("summary");f.textContent=`${h.name} · ${h.status}`;let a=document.createElement("pre");a.textContent=h.text||JSON.stringify(h.args||{},null,2),l.append(f,a),b.append(l)}p.append(b)}if(i.streaming){let b=document.createElement("div");b.className="pi-web-chat-message-meta",b.textContent="streaming...",p.append(b)}if(i.attachments?.length){let b=document.createElement("div");b.className="pi-web-chat-message-meta",b.textContent=`${i.attachments.length} attachment(s)`,p.append(b)}return p}function W(i,p){i.hidden=p.length===0,i.replaceChildren(...p.map((r)=>{let c=document.createElement("span");return c.className="pi-web-chat-attachment-chip",c.textContent=r,c}))}function d(){return`
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
  `}function S(){document.getElementById("pi-web-chat-style")?.remove();let i=document.createElement("style");return i.id="pi-web-chat-style",i.textContent=d(),document.head.append(i),i}function I(i){return i.command||i.cmd||(i.name?`/${i.name}`:"")}function O(i){if(!i)throw Error("pi-web-chat DOM template is invalid");return i}function _i(i,p,r){return{threadId:i,runId:p,state:{},messages:r,tools:[],context:[]}}function Ai(i){let p=[...i.messages].reverse().find((r)=>r.role==="user");return{text:p?.text||"",attachments:p?.attachments||[],sessionId:i.threadId}}function xi(i,p,r){return i.map((c)=>Ri(c,p,r))}function Ri(i,p,r){if(i.type==="text.delta")return{type:"TEXT_MESSAGE_CONTENT",threadId:p,runId:r,delta:i.delta||""};if(i.type==="thinking.delta")return{type:"THINKING_MESSAGE_CONTENT",threadId:p,runId:r,delta:i.delta||""};if(i.type==="tool.start")return{type:"TOOL_CALL_START",threadId:p,runId:r,toolCallId:i.toolCallId,payload:m(i)};if(i.type==="tool.delta")return{type:"TOOL_CALL_ARGS",threadId:p,runId:r,toolCallId:i.toolCallId,delta:i.delta||""};if(i.type==="tool.end")return{type:"TOOL_CALL_END",threadId:p,runId:r,toolCallId:i.toolCallId,payload:m(i)};return{type:i.type.toUpperCase().replaceAll(".","_"),threadId:p,runId:r,payload:i}}function m(i){return{name:i.toolName||"tool",args:i.args||{},result:i.result||"",isError:i.isError===!0}}var B="pi-web-chat.sessions.v1";var pi="plugin.pi-web-sidebar.selectedSession",ri="plugin.pi-web-sidebar.event",ci="plugin.pi-web-sidebar.activeSessionId",D="plugin.pi-web-sidebar.activeWorkspaceId";var o=20,H=200,Hi=8,Mi=1e6;var $i={"book-open":'<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',"file-plus":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="M9 15h6"/>',pencil:'<path d="M21.2 6.8 17.2 2.8a2 2 0 0 0-2.8 0L3 14.2V21h6.8L21.2 9.6a2 2 0 0 0 0-2.8z"/><path d="m14 5 5 5"/>',terminal:'<path d="m4 17 6-6-6-6"/><path d="M12 19h8"/>',cpu:'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 15h3"/><path d="M1 9h3"/><path d="M1 15h3"/>',globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 0 20"/><path d="M12 2a15.3 15.3 0 0 0 0 20"/>',search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',braces:'<path d="M8 3H7a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-4a2 2 0 0 1 2-2 2 2 0 0 1-2-2V7a2 2 0 0 0-2-2h-1"/>',"file-text":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',"circle-question-mark":'<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 1 1 5.8 1c-.5 1-1.4 1.5-2.1 2-.6.4-.8.8-.8 2"/><path d="M12 17h.01"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',plug:'<path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a6 6 0 0 1-12 0V8Z"/>',"git-branch":'<line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',"circle-check":'<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',hammer:'<path d="m15 12-8.5 8.5a2.1 2.1 0 0 1-3-3L12 9"/><path d="m17.6 5.4 1.8-1.8"/><path d="m14 7 3 3"/><path d="M5 11 2 8l6-6 3 3"/>',package:'<path d="m7.5 4.3 9 5.2"/><path d="M21 8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>'},Ni={read:"book-open",write:"file-plus",edit:"pencil",ctx_execute:"cpu",ctx_batch_execute:"cpu",ctx_execute_file:"cpu",ctx_search:"cpu",ctx_index:"cpu",ctx_fetch_and_index:"cpu",web_search:"globe",fetch_content:"search",get_search_content:"search",code_search:"braces",document_parse:"file-text",ask_user_question:"circle-question-mark",teams:"users",subagent:"users",mcp:"plug",git:"git-branch"};class bi{#i=[];add(i){if(i)this.#i.push(i);return i}listen(i,p,r){i.addEventListener(p,r),this.add({remove:()=>i.removeEventListener(p,r)})}dispose(){for(let i of this.#i.splice(0).reverse())if(typeof i==="function")i();else if("unsubscribe"in i)i.unsubscribe();else i.remove()}}function ki(i={}){let p=i.app;if(p?.piWebChat?.dispose(),typeof i.mount?.chat!=="function"||typeof i.mount?.composer!=="function")throw Error("pi-web-chat requires modern pi-web mount.chat and mount.composer APIs");return zi(i,p)}function zi(i,p){let r=new bi,c=r.add(S()),b=K(),h=X(),l=i.mount?.chat(b,{replace:!0}),f=i.mount?.composer(h,{replace:!0});if(l)r.add(l);if(f)r.add(f);let a=V(i);N(i,a||void 0);let w=ap(a?.sessionId||""),g={backendChatToken:0};y(b,C(w).messages),G(i,b,w,g,a?.sessionId||w.activeSessionId),Ii(r,i,b,w,g),Fi(r,i,h,b,w,g);let L=p?r.add(Q(p)):void 0;p?.classList.add(P());let u={dispose:()=>r.dispose()};if(p)p.piWebChat=u;return()=>{if(r.dispose(),L?.remove(),c.remove(),p?.classList.remove(P()),p?.piWebChat===u)delete p.piWebChat}}function Fi(i,p,r,c,b,h){let l=r.querySelector(".prompt-textarea"),f=r.querySelector(".send-btn"),a=r.querySelector(".attach-btn"),w=r.querySelector("[data-file-input]"),g=r.querySelector(".attach-chips");if(!l||!f)return;let L=[],u=()=>{let T=l.value;f.setAttribute("aria-disabled",T.trim()?"false":"true")},J=()=>{if(!g)return;W(g,L.map((T)=>{return T.name||"attachment"}))},j=async(T)=>{T?.preventDefault(),T?.stopImmediatePropagation();let E=l.value.trim();if(u(),!E)return;let Y=[...L];f.disabled=!0;try{if(Yi(E,Y),await Bi(p,c,b,h,E,Y),L=[],J(),l.value="",w)w.value=""}catch(Ei){y(c,[Pi(Ei)])}finally{f.disabled=!1,u()}};if(i.listen(l,"input",u),i.listen(l,"keydown",(T)=>{let E=T;if(E.key==="Enter"&&(E.metaKey||E.ctrlKey))j(E)}),i.listen(f,"click",(T)=>{j(T)}),a&&w)i.listen(a,"click",()=>w.click()),i.listen(w,"change",()=>{vi(w,(T)=>{L=T,J()})})}function Pi(i){return{id:z(),role:"system",text:`prompt failed: ${Oi(i)}`,createdAt:Date.now()}}async function vi(i,p){let r=Array.from(i.files||[]).slice(0,Hi),c=[];for(let b of r){if(b.size>Mi)continue;c.push({name:b.name,size:b.size,content:await b.text(),mimeType:b.type||void 0})}p(c)}function Hp(i){return{input$:i.behaviorSubject("chat.input",""),submitted$:i.subject("chat.input.submitted"),activeSessionId$:i.behaviorSubject("session.activeId",null),sidebarSelectedSession$:i.behaviorSubject(pi,Ui()),toastRequested$:i.subject("toast.requested")}}function Mp(i){let p=[],r=new Set,c=/(^|[\s`])@([^\s@`]+)/g,b=c.exec(String(i||""));while(b!==null){let h=b[2]||"";if((b[1]||"")!=="`"&&h&&!r.has(h))r.add(h),p.push(h);b=c.exec(String(i||""))}return p}function $p(i=[],p=[]){let r=[],c=new Set;for(let b of[...i,...p]){let h=I(b);if(!h||c.has(h))continue;c.add(h),r.push(b)}return r}function R(i){return i.app?.piWebSidebar?.getSnapshot?.().activeWorkspaceId||i.app?.dataset.activeWorkspaceId||""}function Ui(){return V({})}function V(i){let p=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),r=p?.activeSessionId||"",c=p?.activeWorkspaceId||"";if(r)return{sessionId:r,workspaceId:c||void 0};let b=Z(ci),h=Z(D);return b?{sessionId:b,workspaceId:h||void 0}:null}function N(i,p){if(p?.workspaceId&&i.app)i.app.dataset.activeWorkspaceId=p.workspaceId,t(D,p.workspaceId);if(p?.sessionId)i.app?.setAttribute("data-active-session-id",p.sessionId),t(ci,p.sessionId)}function M(i,p,r={}){let c=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),b={type:p,detail:r,snapshot:c};(i.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$)?.next(b),globalThis.piWeb?.subject(ri).next(b)}function hi(i,p,r){let c=i.app?.dataset.activeWorkspaceId||R(i),b={reason:r,sessionId:p,workspaceId:c};globalThis.piWeb?.behaviorSubject("session.activeId",p).next(p),globalThis.piWeb?.subject("session.changed").next({sessionId:p,workspaceId:c,reason:r}),M(i,"active.start",b),M(i,"session.created",b)}function t(i,p){try{localStorage.setItem(i,p)}catch{}}async function k(i,p,r={}){if(!i.backend)return{};let c=R(i),b=await i.backend(p,{workspaceId:c,data:r});return _(b)?b:{}}async function Bi(i,p,r,c,b,h){let l={id:z(),role:"user",text:b,attachments:Ti(h),createdAt:Date.now()},f=C(r);f.messages.push(l),f.updatedAt=Date.now(),n(r),y(p,f.messages);let a=await Ki(i,b,h,r.activeSessionId);if(typeof a.activeSessionId==="string"&&a.activeSessionId){let g=r.activeSessionId,L=q(r,a.activeSessionId);if(g!==L.id&&!L.messages.some((u)=>u.id===l.id))L.messages.push(l),L.updatedAt=Date.now();N(i,{sessionId:a.activeSessionId,workspaceId:i.app?.dataset.activeWorkspaceId||R(i)||void 0}),M(i,"chat-session",{reason:"startPrompt",sessionId:a.activeSessionId}),hi(i,a.activeSessionId,"startPrompt")}if(typeof a.runId!=="string"||!a.runId){let g=await Xi(i,b,h,r.activeSessionId),L=gi(i,r,g,"submitPrompt");y(p,L);return}let w=Qi(r);await Zi(i,r,a.runId,w,()=>y(p,C(r).messages)),await G(i,p,r,c,r.activeSessionId)}async function Zi(i,p,r,c,b){if(await Di(i,p,r,c,b))return;let h=0,l=!0;b();try{while(l){await Wi(120);let f=await k(i,"streamEvents",{runId:r,cursor:h}),a=Array.isArray(f.events)?f.events.filter(ai):[];h=typeof f.cursor==="number"?f.cursor:h,l=f.isStreaming===!0,wi(c,a),c.streaming=l,C(p).updatedAt=Date.now(),n(p),b()}}finally{c.streaming=!1,n(p),b()}}async function Di(i,p,r,c,b){let h=await Vi(i,"streamEventsSse",{runId:r,cursor:0});if(!h)return!1;c.streaming=!0,b();try{await qi(h,(l)=>{wi(c,[l]),c.streaming=l.type!=="run.end",C(p).updatedAt=Date.now(),n(p),b()})}finally{c.streaming=!1,n(p),b()}return!0}async function Vi(i,p,r={}){if(!i.backend)return null;let c=R(i);try{let b=await i.backend(p,{workspaceId:c,data:r});return Gi(b)}catch(b){if(fi(b))return null;throw b}}function Gi(i){if(typeof ReadableStream<"u"&&i instanceof ReadableStream)return i;if(typeof Response<"u"&&i instanceof Response)return i.body;if(typeof i==="string")return e(i);if(!_(i))return null;let p=i.body;if(typeof ReadableStream<"u"&&p instanceof ReadableStream)return p;let r=i.sse;if(typeof r==="string")return e(r);return null}function e(i){let p=new TextEncoder().encode(i);return new ReadableStream({start(r){r.enqueue(p),r.close()}})}async function qi(i,p){let r=i.getReader(),c=new TextDecoder,b="";while(!0){let h=await r.read();if(h.done){b+=c.decode(),ji(b,p);return}b+=c.decode(h.value,{stream:!0});let l=Ji(b);b=l.remainder;for(let f of l.frames)li(f,p)}}function Ji(i){let r=i.replaceAll(`\r
`,`
`).replaceAll("\r",`
`).split(`

`),c=r.pop()||"";return{frames:r,remainder:c}}function ji(i,p){let r=i.trim();if(r)li(r,p)}function li(i,p){let r=i.split(`
`).filter((c)=>c.startsWith("data:")).map((c)=>c.slice(5).trimStart()).join(`
`);if(!r)return;try{let c=JSON.parse(r);if(ai(c))p(c)}catch{}}function Yi(i,p){globalThis.piWeb?.subject("chat.input.submitted").next({text:i,attachments:Ti(p)||[]})}async function Ki(i,p,r,c){try{return await k(i,"startPrompt",{text:p,attachments:r,sessionId:c})}catch(b){if(fi(b))return{};throw b}}function fi(i){return/unknown method: (startPrompt|streamEventsSse)|unsupported method: (startPrompt|streamEventsSse)|(startPrompt|streamEventsSse) unsupported/i.test(Oi(i))}async function Xi(i,p,r,c=""){return await k(i,"submitPrompt",{text:p,attachments:r,sessionId:c})}function Qi(i){let p=C(i),r=[...p.messages].reverse().find((b)=>b.role==="assistant"&&b.streaming);if(r)return r;let c={id:z(),role:"assistant",text:"",createdAt:Date.now(),streaming:!0};return p.messages.push(c),c}function wi(i,p){for(let r of p)if(r.type==="text.delta"&&typeof r.delta==="string")i.text+=r.delta;else if(r.type==="thinking.delta"&&typeof r.delta==="string")i.thinking=`${i.thinking||""}${r.delta}`;else if(r.type==="tool.start")v(i,r,"running");else if(r.type==="tool.delta"&&typeof r.delta==="string"){let c=v(i,r,"running");c.text=r.delta}else if(r.type==="tool.end"){let c=v(i,r,r.isError?"err":"ok");if(typeof r.result==="string"&&r.result)c.text=r.result}else if(r.type==="error"&&typeof r.message==="string")i.text+=`${i.text?`
`:""}${r.message}`}function v(i,p,r){let c=p.toolCallId||p.toolName||"tool";i.toolCalls||=[];let b=i.toolCalls.find((h)=>h.id===c);if(!b)b={id:c,name:p.toolName||"tool",args:p.args,text:"",status:r},i.toolCalls.push(b);if(b.status=r,p.args)b.args=p.args;return b}function ai(i){return _(i)&&typeof i.type==="string"}function Wi(i){return new Promise((p)=>globalThis.setTimeout(p,i))}async function G(i,p,r,c,b=""){let h=++c.backendChatToken;try{let l=await k(i,"chatState",di(i,b));if(h!==c.backendChatToken)return;let f=gi(i,r,l,"chatState");if(f.length)y(p,f)}catch{}}function di(i,p){let r=p?{sessionId:p}:{},c=Si(i);if(c)r.workspacePath=c;return r}function Si(i){let p=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),r=i.app?.dataset.activeWorkspaceId||p?.activeWorkspaceId||"";return p?.workspaces?.find((c)=>c.id===r)?.path||""}function gi(i,p,r,c){let b=ui(r.messages);if(typeof r.activeSessionId==="string"&&r.activeSessionId){let l=p.activeSessionId;if(q(p,r.activeSessionId),N(i,{sessionId:r.activeSessionId,workspaceId:i.app?.dataset.activeWorkspaceId||R(i)||void 0}),c!=="chatState"||l!==r.activeSessionId)M(i,"chat-session",{reason:c,sessionId:r.activeSessionId});if(c!=="chatState")hi(i,r.activeSessionId,c)}let h=C(p);if(b.length){if(h.messages=b.slice(-H),h.title==="New chat"){let l=b.find((f)=>f.role==="user");if(l)h.title=l.text.slice(0,48)||h.title}h.updatedAt=Date.now()}return n(p),h.messages}function Ii(i,p,r,c,b){let h=(w)=>{if(!w?.sessionId)return;N(p,w),q(c,w.sessionId),y(r,C(c).messages),G(p,r,c,b,w.sessionId)},l=(w)=>{let g=mi(p,w);if(g)h(g)},f=p.app?.piWebSidebar?.channels?.selectedSession$||globalThis.piWebSidebar?.channels?.selectedSession$,a=p.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$;if(f)i.add(f.subscribe(h));if(a)i.add(a.subscribe(l));if(p.app)i.listen(p.app,"pi-web-sidebar:session-created",(w)=>{let g=w.detail||{},L=typeof g.sessionId==="string"?g.sessionId:"",u=typeof g.workspaceId==="string"?g.workspaceId:"";if(L)h({sessionId:L,workspaceId:u||void 0})});if(globalThis.piWeb)i.add(globalThis.piWeb.behaviorSubject(pi,V(p)).subscribe(h)),i.add(globalThis.piWeb.subject(ri).subscribe(l)),i.add(globalThis.piWeb.behaviorSubject("session.activeId",null).subscribe((w)=>{if(!w)return;h({sessionId:w,workspaceId:p.app?.dataset.activeWorkspaceId||Z(D)||void 0})}))}function mi(i,p){if(!oi(p.type))return null;let r=p.detail||{},c=typeof r.sessionId==="string"?r.sessionId:p.snapshot?.activeSessionId||"",b=typeof r.workspaceId==="string"?r.workspaceId:p.snapshot?.activeWorkspaceId||i.app?.dataset.activeWorkspaceId||"";if(!c)return null;return{sessionId:c,workspaceId:b||void 0}}function oi(i){return i==="session.selected"||i==="session.created"||i==="new-session"||i==="active.start"}function q(i,p){let r=i.sessions.find((c)=>c.id===p);if(!r)r=$(p),i.sessions.unshift(r);return i.activeSessionId=r.id,n(i),r}function y(i,p){(i.querySelector(".term-inner")||i).replaceChildren(...p.map(ti))}function ti(i){let p=document.createElement("article");p.className="transcript-item",p.dataset.messageId=i.id;let r=document.createElement("div");r.className="msg",r.dataset.kind=U(i.role);let c=document.createElement("span");c.className=`prefix ${U(i.role)}`,c.textContent=wp(i.role);let b=document.createElement("pre");if(b.className=`body ${U(i.role)}`,b.textContent=i.text,r.append(c,b),p.append(r),i.thinking)p.append(ei(i.thinking,Boolean(i.streaming)));for(let h of i.toolCalls||[])p.append(si(h));if(i.streaming)p.dataset.streaming="true";return p}function ei(i,p){let r=document.createElement("details");r.className="msg-detail think thinking-block",r.open=p;let c=document.createElement("summary");c.className="label",c.textContent="THINKING";let b=document.createElement("pre");return b.className="body",b.textContent=i,r.append(c,b),r}function si(i){let p=document.createElement("div");p.className="tool-card",p.dataset.tool=i.name||"tool",p.dataset.status=i.status;let r=i.status!=="running";p.dataset.collapsed=r?"true":"false";let c=document.createElement("button");c.type="button",c.className="tc-head",c.title=r?"Show tool output":"Hide tool output",c.setAttribute("aria-expanded",r?"false":"true"),c.setAttribute("aria-label",`${r?"Show":"Hide"} ${i.name||"tool"} output`),c.append(pp(i),rp(i),cp(i),bp(i));let b=document.createElement("pre");return b.className="tc-body",b.hidden=r,b.textContent=i.text||JSON.stringify(i.args||{},null,2),c.addEventListener("click",()=>ip(p,c,b)),p.append(c,b),p}function ip(i,p,r){let c=r.hidden===!1;r.hidden=c,i.dataset.collapsed=c?"true":"false",p.setAttribute("aria-expanded",c?"false":"true"),p.setAttribute("aria-label",`${c?"Show":"Hide"} ${i.dataset.tool||"tool"} output`),p.title=c?"Show tool output":"Hide tool output";let b=p.querySelector(".tc-toggle-label");if(b)b.textContent=c?"show":"hide"}function pp(i){let p=document.createElement("span");p.className="tc-glyph";let r=hp(i),c=r?$i[r]:"";if(!r||!c)return p.textContent="●",p;return p.innerHTML=`<svg class="tc-icon" data-tool-icon="${r}" aria-hidden="true" viewBox="0 0 24 24">${c}</svg>`,p}function rp(i){let p=document.createElement("span");return p.className="tc-name",p.textContent=i.name||"tool",p}function cp(i){let p=document.createElement("span");return p.className="tc-args",p.textContent=Li(i),p}function bp(i){let p=document.createElement("span");if(p.className="tc-meta",i.status==="running"){let b=document.createElement("span");b.className="spinner",b.textContent="⠇";let h=document.createElement("span");return h.className="running",h.textContent="running",p.append(b,h,s(i.status)),p}let r=document.createElement("span");r.className=i.status==="err"?"err":"ok",r.textContent=i.status==="err"?"✗":"✓";let c=document.createElement("span");return c.textContent=i.status==="err"?" · failed":" · done",p.append(r,c,s()),p}function s(i="ok"){let p=document.createElement("span");p.className="tc-toggle";let r=document.createElement("span");r.className="tc-toggle-label",r.textContent=i==="running"?"hide":"show";let c=document.createElement("span");return c.className="tc-caret",c.textContent="▸",p.append(r,c),p}function Li(i){if(!i.args)return"";return JSON.stringify(i.args)}function hp(i){let p=lp(i.name);if(["bash","shell","sh","zsh","terminal"].includes(p))return fp(Li(i).toLowerCase())||"terminal";return Ni[p]}function lp(i){return i.trim().replace(/^functions\./,"").replace(/^multi_tool_use\./,"")}function fp(i){if(/\bgit\b|\bgh\b/.test(i))return"git-branch";if(/\b(go test|bun test|npm test|pnpm test|yarn test|vitest|pytest|cargo test)\b/.test(i))return"circle-check";if(/\b(bun|npm|pnpm|yarn)\s+(run\s+)?build\b|\b(go build|cargo build)\b/.test(i))return"hammer";if(/\b(bun|npm|pnpm|yarn)\s+(add|install|i)\b|\bpip\s+install\b|\bgo\s+get\b/.test(i))return"package";return}function wp(i){if(i==="assistant")return"pi >";if(i==="user")return"you >";if(i==="system")return"sys >";return"tool >"}function U(i){if(i==="assistant")return"pi";if(i==="system")return"sys";return i}function C(i){let p=i.sessions.find((r)=>r.id===i.activeSessionId);if(!p)p=$(),i.sessions.unshift(p),i.activeSessionId=p.id,n(i);return p}function $(i=z()){let p=Date.now();return{id:i,title:"New chat",createdAt:p,updatedAt:p,messages:[]}}function Z(i){try{return localStorage.getItem(i)||""}catch{return""}}function ap(i=""){try{let r=JSON.parse(localStorage.getItem(B)||"null");if(r&&typeof r.activeSessionId==="string"&&Array.isArray(r.sessions)){let c=r.sessions.filter(gp).map(Lp);if(i&&!c.some((b)=>b.id===i))c.unshift($(i));return{activeSessionId:i||r.activeSessionId,sessions:c}}}catch{}let p=$(i||void 0);return{activeSessionId:p.id,sessions:[p]}}function n(i){ii(i);try{localStorage.setItem(B,JSON.stringify(i))}catch{for(let p of i.sessions)p.messages=p.messages.slice(-Math.floor(H/2));ii(i);try{localStorage.setItem(B,JSON.stringify(i))}catch{}}}function Ti(i){if(!i?.length)return;return i.map(({content:p,...r})=>r)}function ii(i){i.sessions.sort((c,b)=>b.updatedAt-c.updatedAt);let p=i.sessions.find((c)=>c.id===i.activeSessionId),r=i.sessions.filter((c)=>c.id!==i.activeSessionId).slice(0,Math.max(0,o-1));i.sessions=p?[p,...r]:i.sessions.slice(0,o);for(let c of i.sessions)if(c.messages.length>H)c.messages.splice(0,c.messages.length-H)}function gp(i){return _(i)&&typeof i.id==="string"&&Array.isArray(i.messages)}function Lp(i){return{...i,messages:ui(i.messages)}}function ui(i){return Array.isArray(i)?i.filter(Ep).map(Tp):[]}function Tp(i){if(!Array.isArray(i.toolCalls)){let{toolCalls:p,...r}=i;return r}return{...i,toolCalls:i.toolCalls.filter(up)}}function up(i){if(!_(i)||typeof i.id!=="string"||typeof i.name!=="string")return!1;return typeof i.text==="string"&&Op(i.status)}function Op(i){return i==="running"||i==="ok"||i==="err"}function Ep(i){if(!_(i)||typeof i.id!=="string"||typeof i.text!=="string")return!1;return typeof i.createdAt==="number"&&Cp(i.role)}function Cp(i){return i==="user"||i==="assistant"||i==="tool"||i==="system"}function _(i){return typeof i==="object"&&i!==null}function z(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`}function Oi(i){return i instanceof Error?i.message:String(i)}export{ni as renderMessages,Ai as promptFromAgUiLikeRunInput,d as pluginStyleText,P as pluginClass,$p as mergeCommands,R as getActiveWorkspaceId,Mp as extractRefs,ki as default,X as createComposerSurface,K as createChatSurface,Ci as createChatDom,Hp as createChannels,_i as createAgUiLikeRunInput,I as commandName,xi as chatEventsToAgUiLikeEvents,k as backendCall};
