var M={attachFile:["M16.5 6v11.5a4 4 0 0 1-8 0V5a2.5 2.5 0 0 1 5 0v10.5a1 1 0 0 1-2 0V6H10v9.5","a2.5 2.5 0 0 0 5 0V5a4 4 0 0 0-8 0v12.5a5.5 5.5 0 0 0 11 0V6h-1.5Z"].join(""),stop:"M6 6h12v12H6V6Z",send:"M2 21 23 12 2 3v7l15 2-15 2v7Z",terminal:"M3 4h18v16H3V4Zm2 2v12h14V6H5Zm2 3 1.1-1.1L12.2 12l-4.1 4.1L7 15l3-3-3-3Zm6 6h5v1.5h-5V15Z",file:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 2.5L17.5 8H14V4.5ZM8 13h8v1.5H8V13Zm0 3h8v1.5H8V16Z"},D={attachFile:N("attach_file",M.attachFile),stop:N("stop",M.stop),send:N("send",M.send)};function N(i,p){return`<svg class="material-icon" data-material-icon="${i}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="${p}"></path></svg>`}function V(){return"pi-web-chat-mounted"}function I(){let i=document.createElement("main");return i.className="main pi-web-chat-surface",i.dataset.main="session",i.innerHTML='<div class="term"><div class="term-inner" role="log" aria-live="polite" aria-relevant="additions text"></div></div><button type="button" class="scroll-bottom-btn" data-action="scroll-bottom" aria-label="scroll to bottom" title="scroll to bottom" hidden>↓</button>',i}function d(){let i=document.createElement("section");return i.className="prompt-region pi-web-chat-composer",i.innerHTML=`
    <div class="slash-pop" hidden><div class="slash-head">slash commands · type to filter</div><div class="slash-list"></div></div>
    <div class="prompt-bar">
      <button class="attach-btn" type="button" aria-label="attach files" title="attach files">${D.attachFile}</button>
      <input type="file" multiple hidden data-file-input />
      <div class="prompt-input-col"><div class="attach-chips" hidden></div><textarea class="prompt-textarea" aria-label="Prompt" placeholder="ask pi to do something…" rows="1"></textarea></div>
      <div class="prompt-actions">
        <button class="stop-btn" type="button" aria-label="stop" title="stop" hidden>${D.stop}</button>
        <button class="mic-btn" type="button" data-action="toggle-speech-input" aria-label="start voice input" title="voice input" hidden>\uD83C\uDF99</button>
        <button class="send-btn" type="button" aria-label="send" title="send" aria-disabled="true">${D.send}</button>
      </div>
      <div class="drop-overlay" hidden><span>drop to attach</span></div>
    </div>
    <div class="prompt-meta" data-prompt-meta>— | <span class="prompt-meta-item prompt-meta-branch"><span>—</span></span></div>`,i}function n(i){let p=document.createElement("span");return p.className="prompt-meta-item pi-web-chat-badge",p.textContent="chat plugin",i.querySelector("[data-prompt-meta]")?.append(p),p}function Ni(){let i=document.createElement("section");return i.className="pi-web-chat-root",i.dataset.plugin="pi-web-chat",i.innerHTML=`
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
        <button class="pi-web-chat-icon-btn" type="button" data-attach aria-label="attach files" title="attach files">${N("attach_file",M.attachFile)}</button>
        <input type="file" multiple hidden data-file-input />
        <textarea class="pi-web-chat-textarea" data-chat-input aria-label="Prompt" placeholder="ask pi to do something…" rows="1"></textarea>
        <button class="pi-web-chat-send" type="button" data-send aria-label="send" title="send" aria-disabled="true">${N("send",M.send)}</button>
      </div>
    </section>`,{root:i,transcript:_(i.querySelector("[data-chat-transcript]")),textarea:_(i.querySelector("[data-chat-input]")),sendButton:_(i.querySelector("[data-send]")),attachButton:_(i.querySelector("[data-attach]")),fileInput:_(i.querySelector("[data-file-input]")),slashPopover:_(i.querySelector("[data-slash-popover]")),slashList:_(i.querySelector("[data-slash-list]")),refsPopover:_(i.querySelector("[data-refs-popover]")),refsList:_(i.querySelector("[data-refs-list]")),attachments:_(i.querySelector("[data-attachments]"))}}function ui(i,p){i.replaceChildren(...p.map(xi)),i.scrollTop=i.scrollHeight}function xi(i){let p=document.createElement("article");p.className=`pi-web-chat-message pi-web-chat-message-${i.role}`,p.dataset.messageId=i.id;let b=document.createElement("div");b.className="pi-web-chat-message-role",b.textContent=i.role;let h=document.createElement("pre");if(h.className="pi-web-chat-message-body",h.textContent=i.text,p.append(b,h),i.thinking){let r=document.createElement("details");r.className="pi-web-chat-thinking",r.open=Boolean(i.streaming);let c=document.createElement("summary");c.textContent="thinking";let l=document.createElement("pre");l.textContent=i.thinking,r.append(c,l),p.append(r)}if(i.toolCalls?.length){let r=document.createElement("div");r.className="pi-web-chat-tools";for(let c of i.toolCalls){let l=document.createElement("details");l.className=`pi-web-chat-tool pi-web-chat-tool-${c.status}`,l.open=c.status==="running";let f=document.createElement("summary");f.textContent=`${c.name} · ${c.status}`;let L=document.createElement("pre");L.textContent=c.text||JSON.stringify(c.args||{},null,2),l.append(f,L),r.append(l)}p.append(r)}if(i.streaming){let r=document.createElement("div");r.className="pi-web-chat-message-meta",r.textContent="streaming...",p.append(r)}if(i.attachments?.length){let r=document.createElement("div");r.className="pi-web-chat-message-meta",r.textContent=`${i.attachments.length} attachment(s)`,p.append(r)}return p}function m(i,p){i.hidden=p.length===0,i.replaceChildren(...p.map((b)=>{let h=document.createElement("span");return h.className="pi-web-chat-attachment-chip",h.textContent=b,h}))}function o(){return`
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
  `}function t(){document.getElementById("pi-web-chat-style")?.remove();let i=document.createElement("style");return i.id="pi-web-chat-style",i.textContent=o(),document.head.append(i),i}function e(i){return i.command||i.cmd||(i.name?`/${i.name}`:"")}function _(i){if(!i)throw Error("pi-web-chat DOM template is invalid");return i}function zi(i,p,b){return{threadId:i,runId:p,state:{},messages:b,tools:[],context:[]}}function Fi(i){let p=[...i.messages].reverse().find((b)=>b.role==="user");return{text:p?.text||"",attachments:p?.attachments||[],sessionId:i.threadId}}function Pi(i,p,b){return i.map((h)=>ki(h,p,b))}function ki(i,p,b){if(i.type==="text.delta")return{type:"TEXT_MESSAGE_CONTENT",threadId:p,runId:b,delta:i.delta||""};if(i.type==="thinking.delta")return{type:"THINKING_MESSAGE_CONTENT",threadId:p,runId:b,delta:i.delta||""};if(i.type==="tool.start")return{type:"TOOL_CALL_START",threadId:p,runId:b,toolCallId:i.toolCallId,payload:s(i)};if(i.type==="tool.delta")return{type:"TOOL_CALL_ARGS",threadId:p,runId:b,toolCallId:i.toolCallId,delta:i.delta||""};if(i.type==="tool.end")return{type:"TOOL_CALL_END",threadId:p,runId:b,toolCallId:i.toolCallId,payload:s(i)};return{type:i.type.toUpperCase().replaceAll(".","_"),threadId:p,runId:b,payload:i}}function s(i){return{name:i.toolName||"tool",args:i.args||{},result:i.result||"",isError:i.isError===!0}}var J="pi-web-chat.sessions.v1";var li="plugin.pi-web-sidebar.selectedSession",wi="plugin.pi-web-sidebar.event",fi="plugin.pi-web-sidebar.activeSessionId",Y="plugin.pi-web-sidebar.activeWorkspaceId";var ii=20,u=200,Ui=8,Zi=1e6;var y=new Set,Bi={"book-open":'<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',"file-plus":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="M9 15h6"/>',pencil:'<path d="M21.2 6.8 17.2 2.8a2 2 0 0 0-2.8 0L3 14.2V21h6.8L21.2 9.6a2 2 0 0 0 0-2.8z"/><path d="m14 5 5 5"/>',terminal:'<path d="m4 17 6-6-6-6"/><path d="M12 19h8"/>',cpu:'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 15h3"/><path d="M1 9h3"/><path d="M1 15h3"/>',globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 0 20"/><path d="M12 2a15.3 15.3 0 0 0 0 20"/>',search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',braces:'<path d="M8 3H7a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-4a2 2 0 0 1 2-2 2 2 0 0 1-2-2V7a2 2 0 0 0-2-2h-1"/>',"file-text":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',"circle-question-mark":'<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 1 1 5.8 1c-.5 1-1.4 1.5-2.1 2-.6.4-.8.8-.8 2"/><path d="M12 17h.01"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',plug:'<path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a6 6 0 0 1-12 0V8Z"/>',"git-branch":'<line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',"circle-check":'<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',hammer:'<path d="m15 12-8.5 8.5a2.1 2.1 0 0 1-3-3L12 9"/><path d="m17.6 5.4 1.8-1.8"/><path d="m14 7 3 3"/><path d="M5 11 2 8l6-6 3 3"/>',package:'<path d="m7.5 4.3 9 5.2"/><path d="M21 8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>'},Di={read:"book-open",write:"file-plus",edit:"pencil",ctx_execute:"cpu",ctx_batch_execute:"cpu",ctx_execute_file:"cpu",ctx_search:"cpu",ctx_index:"cpu",ctx_fetch_and_index:"cpu",web_search:"globe",fetch_content:"search",get_search_content:"search",code_search:"braces",document_parse:"file-text",ask_user_question:"circle-question-mark",teams:"users",subagent:"users",mcp:"plug",git:"git-branch"};class Li{#i=[];add(i){if(i)this.#i.push(i);return i}listen(i,p,b){i.addEventListener(p,b),this.add({remove:()=>i.removeEventListener(p,b)})}dispose(){for(let i of this.#i.splice(0).reverse())if(typeof i==="function")i();else if("unsubscribe"in i)i.unsubscribe();else i.remove()}}function Vi(i={}){let p=i.app;if(p?.piWebChat?.dispose(),typeof i.mount?.chat!=="function"||typeof i.mount?.composer!=="function")throw Error("pi-web-chat requires modern pi-web mount.chat and mount.composer APIs");return Gi(i,p)}function Gi(i,p){let b=new Li,h=b.add(t()),r=I(),c=d(),l=i.mount?.chat(r,{replace:!0}),f=i.mount?.composer(c,{replace:!0});if(l)b.add(l);if(f)b.add(f);let L=U(i);F(i,L||void 0);let w=yp(L?.sessionId||""),T={backendChatToken:0};R(r,W(w).messages,w.activeSessionId),Q(i,r,w,T,L?.sessionId||w.activeSessionId),ip(b,i,r,w,T),qi(b,i,c,r,w,T);let E=p?b.add(n(p)):void 0;p?.classList.add(V());let C=()=>{if(T.runEventsAbort?.abort(),T.sessionEventsAbort?.abort(),b.dispose(),y.clear(),E?.remove(),h.remove(),p?.classList.remove(V()),p?.piWebChat===H)delete p.piWebChat},H={dispose:C};if(p)p.piWebChat=H;return C}function qi(i,p,b,h,r,c){let l=b.querySelector(".prompt-textarea"),f=b.querySelector(".send-btn"),L=b.querySelector(".attach-btn"),w=b.querySelector("[data-file-input]"),T=b.querySelector(".attach-chips");if(!l||!f)return;let E=[],C=()=>{let O=l.value;f.setAttribute("aria-disabled",O.trim()?"false":"true")},H=()=>{if(!T)return;m(T,E.map((O)=>{return O.name||"attachment"}))},a=async(O)=>{O?.preventDefault(),O?.stopImmediatePropagation();let g=l.value.trim();if(C(),!g)return;let S=[...E];f.disabled=!0;try{if(ai(g,S),await Xi(p,h,r,c,g,S),E=[],H(),l.value.trim()===g)l.value="";if(w)w.value=""}catch(Mi){R(h,[Ji(Mi)],r.activeSessionId)}finally{f.disabled=!1,C()}};if(i.listen(l,"input",C),i.listen(l,"keydown",(O)=>{let g=O;if(g.key==="Enter"&&(g.metaKey||g.ctrlKey))a(g)}),i.listen(f,"click",(O)=>{a(O)}),L&&w)i.listen(L,"click",()=>w.click()),i.listen(w,"change",()=>{ji(w,(O)=>{E=O,H()})})}function Ji(i){return{id:B(),role:"system",text:`prompt failed: ${$i(i)}`,createdAt:Date.now()}}async function ji(i,p){let b=Array.from(i.files||[]).slice(0,Ui),h=[];for(let r of b){if(r.size>Zi)continue;h.push({name:r.name,size:r.size,content:await r.text(),mimeType:r.type||void 0})}p(h)}function Vp(i){return{input$:i.behaviorSubject("chat.input",""),submitted$:i.subject("chat.input.submitted"),activeSessionId$:i.behaviorSubject("session.activeId",null),sidebarSelectedSession$:i.behaviorSubject(li,Yi()),toastRequested$:i.subject("toast.requested")}}function Gp(i){let p=[],b=new Set,h=/(^|[\s`])@([^\s@`]+)/g,r=h.exec(String(i||""));while(r!==null){let c=r[2]||"";if((r[1]||"")!=="`"&&c&&!b.has(c))b.add(c),p.push(c);r=h.exec(String(i||""))}return p}function qp(i=[],p=[]){let b=[],h=new Set;for(let r of[...i,...p]){let c=e(r);if(!c||h.has(c))continue;h.add(c),b.push(r)}return b}function z(i){return i.app?.piWebSidebar?.getSnapshot?.().activeWorkspaceId||i.app?.dataset.activeWorkspaceId||""}function Yi(){return U({})}function U(i){let p=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),b=p?.activeSessionId||"",h=p?.activeWorkspaceId||"";if(b)return{sessionId:b,workspaceId:h||void 0};let r=j(fi),c=j(Y);return r?{sessionId:r,workspaceId:c||void 0}:null}function F(i,p){if(p?.workspaceId&&i.app)i.app.dataset.activeWorkspaceId=p.workspaceId,pi(Y,p.workspaceId);if(p?.sessionId)i.app?.setAttribute("data-active-session-id",p.sessionId),pi(fi,p.sessionId)}function P(i,p,b={}){let h=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),r={type:p,detail:b,snapshot:h};(i.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$)?.next(r),globalThis.piWeb?.subject(wi).next(r)}function Ti(i,p,b){let h=i.app?.dataset.activeWorkspaceId||z(i),r={reason:b,sessionId:p,workspaceId:h};globalThis.piWeb?.behaviorSubject("session.activeId",p).next(p),globalThis.piWeb?.subject("session.changed").next({sessionId:p,workspaceId:h,reason:b}),P(i,"active.start",r),P(i,"session.created",r)}function pi(i,p){try{localStorage.setItem(i,p)}catch{}}async function X(i,p,b={}){if(!i.backend)return{};let h=z(i),r=await i.backend(p,{workspaceId:h,data:b});return $(r)?r:{}}async function Xi(i,p,b,h,r,c){let l=pp(i,b);h.backendChatToken+=1,h.runEventsAbort?.abort(),h.runEventsAbort=new AbortController,h.sessionEventsAbort?.abort();let f={id:B(),role:"user",text:r,attachments:yi(c),createdAt:Date.now()},L=x(b,l);L.messages.push(f),L.updatedAt=Date.now(),A(b),R(p,L.messages,l);let w=await Si(i,r,c,l);if(typeof w.activeSessionId==="string"&&w.activeSessionId){let C=l;l=w.activeSessionId,Z(b,l),Hp(b,C,l,f.id),F(i,{sessionId:w.activeSessionId,workspaceId:i.app?.dataset.activeWorkspaceId||z(i)||void 0}),P(i,"chat-session",{reason:"startPrompt",sessionId:w.activeSessionId}),Ti(i,w.activeSessionId,"startPrompt")}if(typeof w.runId!=="string"||!w.runId){let C=await di(i,r,c,l),H=si(i,b,C,"submitPrompt",l);if(b.activeSessionId===l)R(p,H,l);return}let T=x(b,l),E=ni(T);try{await Qi(i,b,T,w.runId,E,()=>{if(b.activeSessionId===l)R(p,T.messages,l)},h.runEventsAbort.signal)}finally{h.runEventsAbort=void 0}if(b.activeSessionId===l)Q(i,p,b,h,l)}async function Qi(i,p,b,h,r,c,l){let f=await Ci(i,"streamEventsSse",{runId:h,cursor:0},l);if(!f)throw Error("SSE streaming backend did not return a stream");r.streaming=!0,c();try{await Oi(f,(L)=>{mi(r,[L]),r.streaming=L.type!=="run.end",b.updatedAt=Date.now(),A(p),c()})}finally{r.streaming=!1,A(p),c()}}async function Ci(i,p,b={},h){if(!i.backendStream)throw Error("SSE streaming backend is unavailable");let r=z(i),c=await i.backendStream(p,{workspaceId:r,data:b},{signal:h});return vi(c)}function vi(i){if(typeof ReadableStream<"u"&&i instanceof ReadableStream)return i;if(typeof Response<"u"&&i instanceof Response)return i.body;if(typeof i==="string")return bi(i);if(!$(i))return null;let p=i.body;if(typeof ReadableStream<"u"&&p instanceof ReadableStream)return p;let b=i.sse;if(typeof b==="string")return bi(b);return null}function bi(i){let p=new TextEncoder().encode(i);return new ReadableStream({start(b){b.enqueue(p),b.close()}})}async function Oi(i,p){let b=i.getReader(),h=new TextDecoder,r="";while(!0){let c=await b.read();if(c.done){r+=h.decode(),Ki(r,p);return}r+=h.decode(c.value,{stream:!0});let l=Wi(r);r=l.remainder;for(let f of l.frames)Ei(f,p)}}function Wi(i){let b=i.replaceAll(`\r
`,`
`).replaceAll("\r",`
`).split(`

`),h=b.pop()||"";return{frames:b,remainder:h}}function Ki(i,p){let b=i.trim();if(b)Ei(b,p)}function Ei(i,p){let b=i.split(`
`).filter((h)=>h.startsWith("data:")).map((h)=>h.slice(5).trimStart()).join(`
`);if(!b)return;try{let h=JSON.parse(b);if(oi(h))p(h)}catch{}}function ai(i,p){globalThis.piWeb?.subject("chat.input.submitted").next({text:i,attachments:yi(p)||[]})}async function Si(i,p,b,h){try{return await X(i,"startPrompt",{text:p,attachments:b,sessionId:h})}catch(r){if(Ii(r))return{};throw r}}function Ii(i){return/unknown method: (startPrompt|streamEventsSse)|unsupported method: (startPrompt|streamEventsSse)|(startPrompt|streamEventsSse) unsupported/i.test($i(i))}async function di(i,p,b,h=""){return await X(i,"submitPrompt",{text:p,attachments:b,sessionId:h})}function ni(i){let p=[...i.messages].reverse().find((h)=>h.role==="assistant"&&h.streaming);if(p)return p;let b={id:B(),role:"assistant",text:"",createdAt:Date.now(),streaming:!0};return i.messages.push(b),b}function mi(i,p){for(let b of p)if(b.type==="text.delta"&&typeof b.delta==="string")i.text+=b.delta;else if(b.type==="thinking.delta"&&typeof b.delta==="string")i.thinking=`${i.thinking||""}${b.delta}`;else if(b.type==="tool.start")G(i,b,"running");else if(b.type==="tool.delta"&&typeof b.delta==="string"){let h=G(i,b,"running");h.text=b.delta}else if(b.type==="tool.end"){let h=G(i,b,b.isError?"err":"ok");if(typeof b.result==="string"&&b.result)h.text=b.result}else if(b.type==="error"&&typeof b.message==="string")i.text+=`${i.text?`
`:""}${b.message}`}function G(i,p,b){let h=p.toolCallId||p.toolName||"tool";i.toolCalls||=[];let r=i.toolCalls.find((c)=>c.id===h);if(!r)r={id:h,name:p.toolName||"tool",args:p.args,text:"",status:b},i.toolCalls.push(r);if(r.status=b,p.args)r.args=p.args;return r}function oi(i){return $(i)&&typeof i.type==="string"}async function Q(i,p,b,h,r=""){if(!i.backendStream){await hi(i,p,b,h,r);return}let c=++h.backendChatToken;h.sessionEventsAbort?.abort();let l=new AbortController;h.sessionEventsAbort=l;try{let f=await Ci(i,"sessionEventsSse",_i(i,r),l.signal);if(!f)throw Error("session SSE backend did not return a stream");await Oi(f,(L)=>{if(c!==h.backendChatToken||L.type!=="chat.state")return;let w=v(i,b,ti(L),"chatState");if(w.length)R(p,w,b.activeSessionId)})}catch(f){if(!l.signal.aborted)await hi(i,p,b,h,r)}finally{if(h.sessionEventsAbort===l)h.sessionEventsAbort=void 0}}async function hi(i,p,b,h,r=""){let c=++h.backendChatToken;try{let l=await X(i,"chatState",_i(i,r));if(c!==h.backendChatToken)return;let f=v(i,b,l,"chatState");if(f.length)R(p,f,b.activeSessionId)}catch{}}function _i(i,p){let b=p?{sessionId:p}:{},h=ei(i);if(h)b.workspacePath=h;return b}function ti(i){return{activeSessionId:i.activeSessionId,messages:i.messages,isStreaming:i.isStreaming}}function ei(i){let p=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),b=i.app?.dataset.activeWorkspaceId||p?.activeWorkspaceId||"";return p?.workspaces?.find((h)=>h.id===b)?.path||""}function v(i,p,b,h){let r=K(b.messages);if(typeof b.activeSessionId==="string"&&b.activeSessionId){let l=p.activeSessionId;if(Z(p,b.activeSessionId),F(i,{sessionId:b.activeSessionId,workspaceId:i.app?.dataset.activeWorkspaceId||z(i)||void 0}),h!=="chatState"||l!==b.activeSessionId)P(i,"chat-session",{reason:h,sessionId:b.activeSessionId});if(h!=="chatState")Ti(i,b.activeSessionId,h)}let c=W(p);if(r.length){if(c.messages=Hi(c.messages,r).slice(-u),c.title==="New chat"){let l=c.messages.find((f)=>f.role==="user");if(l)c.title=l.text.slice(0,48)||c.title}c.updatedAt=Date.now()}return A(p),c.messages}function si(i,p,b,h,r){if(typeof b.activeSessionId==="string"&&b.activeSessionId)return v(i,p,b,h);let c=K(b.messages),l=x(p,r);if(c.length)l.messages=Hi(l.messages,c).slice(-u),l.updatedAt=Date.now();return A(p),l.messages}function ip(i,p,b,h,r){let c=(w)=>{if(!w?.sessionId)return;F(p,w),Z(h,w.sessionId),R(b,W(h).messages,h.activeSessionId),Q(p,b,h,r,w.sessionId)},l=(w)=>{let T=bp(p,w);if(T)c(T)},f=p.app?.piWebSidebar?.channels?.selectedSession$||globalThis.piWebSidebar?.channels?.selectedSession$,L=p.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$;if(f)i.add(f.subscribe(c));if(L)i.add(L.subscribe(l));if(p.app)i.listen(p.app,"pi-web-sidebar:session-created",(w)=>{let T=w.detail||{},E=typeof T.sessionId==="string"?T.sessionId:"",C=typeof T.workspaceId==="string"?T.workspaceId:"";if(E)c({sessionId:E,workspaceId:C||void 0})});if(globalThis.piWeb)i.add(globalThis.piWeb.behaviorSubject(li,U(p)).subscribe(c)),i.add(globalThis.piWeb.subject(wi).subscribe(l)),i.add(globalThis.piWeb.behaviorSubject("session.activeId",null).subscribe((w)=>{if(!w)return;c({sessionId:w,workspaceId:p.app?.dataset.activeWorkspaceId||j(Y)||void 0})}))}function pp(i,p){let b=U(i);if(b?.sessionId)F(i,b),Z(p,b.sessionId);return p.activeSessionId}function bp(i,p){if(!hp(p.type))return null;let b=p.detail||{},h=typeof b.sessionId==="string"?b.sessionId:p.snapshot?.activeSessionId||"",r=typeof b.workspaceId==="string"?b.workspaceId:p.snapshot?.activeWorkspaceId||i.app?.dataset.activeWorkspaceId||"";if(!h)return null;return{sessionId:h,workspaceId:r||void 0}}function hp(i){return i==="session.selected"||i==="session.created"||i==="new-session"||i==="active.start"}function Z(i,p){let b=i.sessions.find((h)=>h.id===p);if(!b)b=k(p),i.sessions.unshift(b);return i.activeSessionId=b.id,A(i),b}function R(i,p,b){wp(p,b),(i.querySelector(".term-inner")||i).replaceChildren(...p.map((r)=>rp(r,b)))}function rp(i,p){let b=document.createElement("article");b.className="transcript-item",b.dataset.messageId=i.id;let h=document.createElement("div");h.className="msg",h.dataset.kind=q(i.role);let r=document.createElement("span");r.className=`prefix ${q(i.role)}`,r.textContent=Rp(i.role);let c=document.createElement("pre");if(c.className=`body ${q(i.role)}`,c.textContent=i.text,h.append(r,c),cp(i))b.append(h);if(i.thinking)b.append(lp(i.thinking,Boolean(i.streaming)));for(let l of i.toolCalls||[])b.append(fp(l,gi(p,i,l)));if(i.streaming)b.dataset.streaming="true";return b}function cp(i){let p=i.text.trim().length>0;return i.role!=="assistant"||p}function lp(i,p){let b=document.createElement("details");b.className="msg-detail think thinking-block",b.open=p;let h=document.createElement("summary");h.className="label",h.textContent="THINKING";let r=document.createElement("pre");return r.className="body",r.textContent=i,b.append(h,r),b}function wp(i,p){let b=new Set;for(let h of i)for(let r of h.toolCalls||[])b.add(gi(p,h,r));for(let h of y)if(!b.has(h))y.delete(h)}function gi(i,p,b){return`${i}:${p.id}:${b.id}`}function fp(i,p){let b=document.createElement("div");b.className="tool-card",b.dataset.tool=i.name||"tool",b.dataset.status=i.status;let h=!y.has(p);b.dataset.collapsed=h?"true":"false";let r=document.createElement("button");if(r.type="button",r.className="tc-head",r.title=h?"Show tool output":"Hide tool output",r.setAttribute("aria-expanded",h?"false":"true"),r.setAttribute("aria-label",`${h?"Show":"Hide"} ${i.name||"tool"} output`),r.append(Tp(i),Cp(i),Op(i),Ep(i,h)),!h)b.append(Ai(i));return r.addEventListener("click",()=>Lp(b,r,i,p)),b.prepend(r),b}function Ai(i){let p=document.createElement("pre");return p.className="tc-body",p.textContent=i.text||JSON.stringify(i.args||{},null,2),p}function Lp(i,p,b,h){let r=i.querySelector(".tc-body"),c=r!==null;if(r)r.remove(),y.delete(h);else i.append(Ai(b)),y.add(h);i.dataset.collapsed=c?"true":"false",p.setAttribute("aria-expanded",c?"false":"true"),p.setAttribute("aria-label",`${c?"Show":"Hide"} ${i.dataset.tool||"tool"} output`),p.title=c?"Show tool output":"Hide tool output";let l=p.querySelector(".tc-toggle-label");if(l)l.textContent=c?"show":"hide"}function Tp(i){let p=document.createElement("span");p.className="tc-glyph";let b=_p(i),h=b?Bi[b]:"";if(!b||!h)return p.textContent="●",p;return p.innerHTML=`<svg class="tc-icon" data-tool-icon="${b}" aria-hidden="true" viewBox="0 0 24 24">${h}</svg>`,p}function Cp(i){let p=document.createElement("span");return p.className="tc-name",p.textContent=i.name||"tool",p}function Op(i){let p=document.createElement("span");return p.className="tc-args",p.textContent=Ri(i),p}function Ep(i,p){let b=document.createElement("span");if(b.className="tc-meta",i.status==="running"){let c=document.createElement("span");c.className="spinner",c.textContent="⠇";let l=document.createElement("span");return l.className="running",l.textContent="running",b.append(c,l,ri(p)),b}let h=document.createElement("span");h.className=i.status==="err"?"err":"ok",h.textContent=i.status==="err"?"✗":"✓";let r=document.createElement("span");return r.textContent=i.status==="err"?" · failed":" · done",b.append(h,r,ri(p)),b}function ri(i){let p=document.createElement("span");p.className="tc-toggle";let b=document.createElement("span");b.className="tc-toggle-label",b.textContent=i?"show":"hide";let h=document.createElement("span");return h.className="tc-caret",h.textContent="▸",p.append(b,h),p}function Ri(i){if(!i.args)return"";return JSON.stringify(i.args)}function _p(i){let p=gp(i.name);if(["bash","shell","sh","zsh","terminal"].includes(p))return Ap(Ri(i).toLowerCase())||"terminal";return Di[p]}function gp(i){return i.trim().replace(/^functions\./,"").replace(/^multi_tool_use\./,"")}function Ap(i){if(/\bgit\b|\bgh\b/.test(i))return"git-branch";if(/\b(go test|bun test|npm test|pnpm test|yarn test|vitest|pytest|cargo test)\b/.test(i))return"circle-check";if(/\b(bun|npm|pnpm|yarn)\s+(run\s+)?build\b|\b(go build|cargo build)\b/.test(i))return"hammer";if(/\b(bun|npm|pnpm|yarn)\s+(add|install|i)\b|\bpip\s+install\b|\bgo\s+get\b/.test(i))return"package";return}function Rp(i){if(i==="assistant")return"pi >";if(i==="user")return"you >";if(i==="system")return"sys >";return"tool >"}function q(i){if(i==="assistant")return"pi";if(i==="system")return"sys";return i}function Hi(i,p){let b=new Map;for(let h of i)b.set(h.id,h);for(let h of p)b.set(h.id,{...b.get(h.id),...h});return[...b.values()].sort((h,r)=>h.createdAt-r.createdAt)}function W(i){return x(i,i.activeSessionId,!0)}function x(i,p,b=!1){let h=i.sessions.find((r)=>r.id===p);if(!h)h=k(p||void 0),i.sessions.unshift(h),A(i);if(b||!i.activeSessionId)i.activeSessionId=h.id,A(i);return h}function Hp(i,p,b,h){if(p===b)return;let r=i.sessions.find((L)=>L.id===p),c=r?.messages.findIndex((L)=>L.id===h)??-1;if(!r||c<0)return;let[l]=r.messages.splice(c,1),f=x(i,b);if(!f.messages.some((L)=>L.id===l.id))f.messages.push(l);r.updatedAt=Date.now(),f.updatedAt=Date.now(),A(i)}function k(i=B()){let p=Date.now();return{id:i,title:"New chat",createdAt:p,updatedAt:p,messages:[]}}function j(i){try{return localStorage.getItem(i)||""}catch{return""}}function yp(i=""){try{let b=JSON.parse(localStorage.getItem(J)||"null");if(b&&typeof b.activeSessionId==="string"&&Array.isArray(b.sessions)){let h=b.sessions.filter($p).map(Mp);if(i&&!h.some((r)=>r.id===i))h.unshift(k(i));return{activeSessionId:i||b.activeSessionId,sessions:h}}}catch{}let p=k(i||void 0);return{activeSessionId:p.id,sessions:[p]}}function A(i){ci(i);try{localStorage.setItem(J,JSON.stringify(i))}catch{for(let p of i.sessions)p.messages=p.messages.slice(-Math.floor(u/2));ci(i);try{localStorage.setItem(J,JSON.stringify(i))}catch{}}}function yi(i){if(!i?.length)return;return i.map(({content:p,...b})=>b)}function ci(i){i.sessions.sort((h,r)=>r.updatedAt-h.updatedAt);let p=i.sessions.find((h)=>h.id===i.activeSessionId),b=i.sessions.filter((h)=>h.id!==i.activeSessionId).slice(0,Math.max(0,ii-1));i.sessions=p?[p,...b]:i.sessions.slice(0,ii);for(let h of i.sessions)if(h.messages.length>u)h.messages.splice(0,h.messages.length-u)}function $p(i){return $(i)&&typeof i.id==="string"&&Array.isArray(i.messages)}function Mp(i){return{...i,messages:K(i.messages)}}function K(i){return Array.isArray(i)?i.filter(zp).map(Np):[]}function Np(i){if(!Array.isArray(i.toolCalls)){let{toolCalls:p,...b}=i;return b}return{...i,toolCalls:i.toolCalls.filter(up)}}function up(i){if(!$(i)||typeof i.id!=="string"||typeof i.name!=="string")return!1;return typeof i.text==="string"&&xp(i.status)}function xp(i){return i==="running"||i==="ok"||i==="err"}function zp(i){if(!$(i)||typeof i.id!=="string"||typeof i.text!=="string")return!1;return typeof i.createdAt==="number"&&Fp(i.role)}function Fp(i){return i==="user"||i==="assistant"||i==="tool"||i==="system"}function $(i){return typeof i==="object"&&i!==null}function B(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`}function $i(i){return i instanceof Error?i.message:String(i)}export{ui as renderMessages,Fi as promptFromAgUiLikeRunInput,o as pluginStyleText,V as pluginClass,qp as mergeCommands,z as getActiveWorkspaceId,Gp as extractRefs,Vi as default,d as createComposerSurface,I as createChatSurface,Ni as createChatDom,Vp as createChannels,zi as createAgUiLikeRunInput,e as commandName,Pi as chatEventsToAgUiLikeEvents,X as backendCall};
