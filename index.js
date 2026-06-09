var y={attachFile:["M16.5 6v11.5a4 4 0 0 1-8 0V5a2.5 2.5 0 0 1 5 0v10.5a1 1 0 0 1-2 0V6H10v9.5","a2.5 2.5 0 0 0 5 0V5a4 4 0 0 0-8 0v12.5a5.5 5.5 0 0 0 11 0V6h-1.5Z"].join(""),stop:"M6 6h12v12H6V6Z",send:"M2 21 23 12 2 3v7l15 2-15 2v7Z",terminal:"M3 4h18v16H3V4Zm2 2v12h14V6H5Zm2 3 1.1-1.1L12.2 12l-4.1 4.1L7 15l3-3-3-3Zm6 6h5v1.5h-5V15Z",file:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 2.5L17.5 8H14V4.5ZM8 13h8v1.5H8V13Zm0 3h8v1.5H8V16Z"},d={attachFile:_("attach_file",y.attachFile),stop:_("stop",y.stop),send:_("send",y.send)};function _(i,r){return`<svg class="material-icon" data-material-icon="${i}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="${r}"></path></svg>`}function z(){return"pi-web-chat-mounted"}function Y(){let i=document.createElement("main");return i.className="main pi-web-chat-surface",i.dataset.main="session",i.innerHTML='<div class="term"><div class="term-inner" role="log" aria-live="polite" aria-relevant="additions text"></div></div><button type="button" class="scroll-bottom-btn" data-action="scroll-bottom" aria-label="scroll to bottom" title="scroll to bottom" hidden>↓</button>',i}function K(){let i=document.createElement("section");return i.className="prompt-region pi-web-chat-composer",i.innerHTML=`
    <div class="slash-pop" hidden><div class="slash-head">slash commands · type to filter</div><div class="slash-list"></div></div>
    <div class="prompt-bar">
      <button class="attach-btn" type="button" aria-label="attach files" title="attach files">${d.attachFile}</button>
      <input type="file" multiple hidden data-file-input />
      <div class="prompt-input-col"><div class="attach-chips" hidden></div><textarea class="prompt-textarea" aria-label="Prompt" placeholder="ask pi to do something…" rows="1"></textarea></div>
      <div class="prompt-actions">
        <button class="stop-btn" type="button" aria-label="stop" title="stop" hidden>${d.stop}</button>
        <button class="mic-btn" type="button" data-action="toggle-speech-input" aria-label="start voice input" title="voice input" hidden>\uD83C\uDF99</button>
        <button class="send-btn" type="button" aria-label="send" title="send" aria-disabled="true">${d.send}</button>
      </div>
      <div class="drop-overlay" hidden><span>drop to attach</span></div>
    </div>
    <div class="prompt-meta" data-prompt-meta>— | <span class="prompt-meta-item prompt-meta-branch"><span>—</span></span></div>`,i}function X(i){let r=document.createElement("span");return r.className="prompt-meta-item pi-web-chat-badge",r.textContent="chat plugin",i.querySelector("[data-prompt-meta]")?.append(r),r}function gi(){let i=document.createElement("section");return i.className="pi-web-chat-root",i.dataset.plugin="pi-web-chat",i.innerHTML=`
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
        <button class="pi-web-chat-icon-btn" type="button" data-attach aria-label="attach files" title="attach files">${_("attach_file",y.attachFile)}</button>
        <input type="file" multiple hidden data-file-input />
        <textarea class="pi-web-chat-textarea" data-chat-input aria-label="Prompt" placeholder="ask pi to do something…" rows="1"></textarea>
        <button class="pi-web-chat-send" type="button" data-send aria-label="send" title="send" aria-disabled="true">${_("send",y.send)}</button>
      </div>
    </section>`,{root:i,transcript:T(i.querySelector("[data-chat-transcript]")),textarea:T(i.querySelector("[data-chat-input]")),sendButton:T(i.querySelector("[data-send]")),attachButton:T(i.querySelector("[data-attach]")),fileInput:T(i.querySelector("[data-file-input]")),slashPopover:T(i.querySelector("[data-slash-popover]")),slashList:T(i.querySelector("[data-slash-list]")),refsPopover:T(i.querySelector("[data-refs-popover]")),refsList:T(i.querySelector("[data-refs-list]")),attachments:T(i.querySelector("[data-attachments]"))}}function Li(i,r){i.replaceChildren(...r.map(ui)),i.scrollTop=i.scrollHeight}function ui(i){let r=document.createElement("article");r.className=`pi-web-chat-message pi-web-chat-message-${i.role}`,r.dataset.messageId=i.id;let p=document.createElement("div");p.className="pi-web-chat-message-role",p.textContent=i.role;let c=document.createElement("pre");if(c.className="pi-web-chat-message-body",c.textContent=i.text,r.append(p,c),i.thinking){let l=document.createElement("details");l.className="pi-web-chat-thinking",l.open=Boolean(i.streaming);let b=document.createElement("summary");b.textContent="thinking";let h=document.createElement("pre");h.textContent=i.thinking,l.append(b,h),r.append(l)}if(i.toolCalls?.length){let l=document.createElement("div");l.className="pi-web-chat-tools";for(let b of i.toolCalls){let h=document.createElement("details");h.className=`pi-web-chat-tool pi-web-chat-tool-${b.status}`,h.open=b.status==="running";let f=document.createElement("summary");f.textContent=`${b.name} · ${b.status}`;let w=document.createElement("pre");w.textContent=b.text||JSON.stringify(b.args||{},null,2),h.append(f,w),l.append(h)}r.append(l)}if(i.streaming){let l=document.createElement("div");l.className="pi-web-chat-message-meta",l.textContent="streaming...",r.append(l)}if(i.attachments?.length){let l=document.createElement("div");l.className="pi-web-chat-message-meta",l.textContent=`${i.attachments.length} attachment(s)`,r.append(l)}return r}function Q(i,r){i.hidden=r.length===0,i.replaceChildren(...r.map((p)=>{let c=document.createElement("span");return c.className="pi-web-chat-attachment-chip",c.textContent=p,c}))}function W(){return`
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
  `}function S(){document.getElementById("pi-web-chat-style")?.remove();let i=document.createElement("style");return i.id="pi-web-chat-style",i.textContent=W(),document.head.append(i),i}function o(i){return i.command||i.cmd||(i.name?`/${i.name}`:"")}function T(i){if(!i)throw Error("pi-web-chat DOM template is invalid");return i}function Ti(i,r,p){return{threadId:i,runId:r,state:{},messages:p,tools:[],context:[]}}function Ei(i){let r=[...i.messages].reverse().find((p)=>p.role==="user");return{text:r?.text||"",attachments:r?.attachments||[],sessionId:i.threadId}}function Ci(i,r,p){return i.map((c)=>Oi(c,r,p))}function Oi(i,r,p){if(i.type==="text.delta")return{type:"TEXT_MESSAGE_CONTENT",threadId:r,runId:p,delta:i.delta||""};if(i.type==="thinking.delta")return{type:"THINKING_MESSAGE_CONTENT",threadId:r,runId:p,delta:i.delta||""};if(i.type==="tool.start")return{type:"TOOL_CALL_START",threadId:r,runId:p,toolCallId:i.toolCallId,payload:I(i)};if(i.type==="tool.delta")return{type:"TOOL_CALL_ARGS",threadId:r,runId:p,toolCallId:i.toolCallId,delta:i.delta||""};if(i.type==="tool.end")return{type:"TOOL_CALL_END",threadId:r,runId:p,toolCallId:i.toolCallId,payload:I(i)};return{type:i.type.toUpperCase().replaceAll(".","_"),threadId:r,runId:p,payload:i}}function I(i){return{name:i.toolName||"tool",args:i.args||{},result:i.result||"",isError:i.isError===!0}}var U="pi-web-chat.sessions.v1";var ii="plugin.pi-web-sidebar.selectedSession",ri="plugin.pi-web-sidebar.event",pi="plugin.pi-web-sidebar.activeSessionId",Z="plugin.pi-web-sidebar.activeWorkspaceId";var m=20,R=200,xi=8,yi=1e6;var _i={"book-open":'<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',"file-plus":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="M9 15h6"/>',pencil:'<path d="M21.2 6.8 17.2 2.8a2 2 0 0 0-2.8 0L3 14.2V21h6.8L21.2 9.6a2 2 0 0 0 0-2.8z"/><path d="m14 5 5 5"/>',terminal:'<path d="m4 17 6-6-6-6"/><path d="M12 19h8"/>',cpu:'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 15h3"/><path d="M1 9h3"/><path d="M1 15h3"/>',globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 0 20"/><path d="M12 2a15.3 15.3 0 0 0 0 20"/>',search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',braces:'<path d="M8 3H7a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-4a2 2 0 0 1 2-2 2 2 0 0 1-2-2V7a2 2 0 0 0-2-2h-1"/>',"file-text":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',"circle-question-mark":'<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 1 1 5.8 1c-.5 1-1.4 1.5-2.1 2-.6.4-.8.8-.8 2"/><path d="M12 17h.01"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',plug:'<path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a6 6 0 0 1-12 0V8Z"/>',"git-branch":'<line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',"circle-check":'<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',hammer:'<path d="m15 12-8.5 8.5a2.1 2.1 0 0 1-3-3L12 9"/><path d="m17.6 5.4 1.8-1.8"/><path d="m14 7 3 3"/><path d="M5 11 2 8l6-6 3 3"/>',package:'<path d="m7.5 4.3 9 5.2"/><path d="M21 8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>'},Ai={read:"book-open",write:"file-plus",edit:"pencil",ctx_execute:"cpu",ctx_batch_execute:"cpu",ctx_execute_file:"cpu",ctx_search:"cpu",ctx_index:"cpu",ctx_fetch_and_index:"cpu",web_search:"globe",fetch_content:"search",get_search_content:"search",code_search:"braces",document_parse:"file-text",ask_user_question:"circle-question-mark",teams:"users",subagent:"users",mcp:"plug",git:"git-branch"};class ci{#i=[];add(i){if(i)this.#i.push(i);return i}listen(i,r,p){i.addEventListener(r,p),this.add({remove:()=>i.removeEventListener(r,p)})}dispose(){for(let i of this.#i.splice(0).reverse())if(typeof i==="function")i();else if("unsubscribe"in i)i.unsubscribe();else i.remove()}}function Ri(i={}){let r=i.app;if(r?.piWebChat?.dispose(),typeof i.mount?.chat!=="function"||typeof i.mount?.composer!=="function")throw Error("pi-web-chat requires modern pi-web mount.chat and mount.composer APIs");return Hi(i,r)}function Hi(i,r){let p=new ci,c=p.add(S()),l=Y(),b=K(),h=i.mount?.chat(l,{replace:!0}),f=i.mount?.composer(b,{replace:!0});if(h)p.add(h);if(f)p.add(f);let w=D(i);N(i,w||void 0);let a=rr(w?.sessionId||""),n={backendChatToken:0};C(l,O(a).messages),V(i,l,a,n,w?.sessionId||a.activeSessionId),Ji(p,i,l,a,n),Mi(p,i,b,l,a,n);let g=r?p.add(X(r)):void 0;r?.classList.add(z());let u={dispose:()=>p.dispose()};if(r)r.piWebChat=u;return()=>{if(p.dispose(),g?.remove(),c.remove(),r?.classList.remove(z()),r?.piWebChat===u)delete r.piWebChat}}function Mi(i,r,p,c,l,b){let h=p.querySelector(".prompt-textarea"),f=p.querySelector(".send-btn"),w=p.querySelector(".attach-btn"),a=p.querySelector("[data-file-input]"),n=p.querySelector(".attach-chips");if(!h||!f)return;let g=[],u=()=>{let L=h.value;f.setAttribute("aria-disabled",L.trim()?"false":"true")},q=()=>{if(!n)return;Q(n,g.map((L)=>{return L.name||"attachment"}))},J=async(L)=>{L?.preventDefault(),L?.stopImmediatePropagation();let E=h.value.trim();if(u(),!E)return;let j=[...g];f.disabled=!0;try{if(zi(E,j),await vi(r,c,l,b,E,j),g=[],q(),h.value="",a)a.value=""}catch(ni){C(c,[$i(ni)])}finally{f.disabled=!1,u()}};if(i.listen(h,"input",u),i.listen(h,"keydown",(L)=>{let E=L;if(E.key==="Enter"&&(E.metaKey||E.ctrlKey))J(E)}),i.listen(f,"click",(L)=>{J(L)}),w&&a)i.listen(w,"click",()=>a.click()),i.listen(a,"change",()=>{Ni(a,(L)=>{g=L,q()})})}function $i(i){return{id:v(),role:"system",text:`prompt failed: ${wi(i)}`,createdAt:Date.now()}}async function Ni(i,r){let p=Array.from(i.files||[]).slice(0,xi),c=[];for(let l of p){if(l.size>yi)continue;c.push({name:l.name,size:l.size,content:await l.text(),mimeType:l.type||void 0})}r(c)}function Er(i){return{input$:i.behaviorSubject("chat.input",""),submitted$:i.subject("chat.input.submitted"),activeSessionId$:i.behaviorSubject("session.activeId",null),sidebarSelectedSession$:i.behaviorSubject(ii,ki()),toastRequested$:i.subject("toast.requested")}}function Cr(i){let r=[],p=new Set,c=/(^|[\s`])@([^\s@`]+)/g,l=c.exec(String(i||""));while(l!==null){let b=l[2]||"";if((l[1]||"")!=="`"&&b&&!p.has(b))p.add(b),r.push(b);l=c.exec(String(i||""))}return r}function Or(i=[],r=[]){let p=[],c=new Set;for(let l of[...i,...r]){let b=o(l);if(!b||c.has(b))continue;c.add(b),p.push(l)}return p}function $(i){return i.app?.piWebSidebar?.getSnapshot?.().activeWorkspaceId||i.app?.dataset.activeWorkspaceId||""}function ki(){return D({})}function D(i){let r=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),p=r?.activeSessionId||"",c=r?.activeWorkspaceId||"";if(p)return{sessionId:p,workspaceId:c||void 0};let l=B(pi),b=B(Z);return l?{sessionId:l,workspaceId:b||void 0}:null}function N(i,r){if(r?.workspaceId&&i.app)i.app.dataset.activeWorkspaceId=r.workspaceId,t(Z,r.workspaceId);if(r?.sessionId)i.app?.setAttribute("data-active-session-id",r.sessionId),t(pi,r.sessionId)}function H(i,r,p={}){let c=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),l={type:r,detail:p,snapshot:c};(i.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$)?.next(l),globalThis.piWeb?.subject(ri).next(l)}function li(i,r,p){let c=i.app?.dataset.activeWorkspaceId||$(i),l={reason:p,sessionId:r,workspaceId:c};globalThis.piWeb?.behaviorSubject("session.activeId",r).next(r),globalThis.piWeb?.subject("session.changed").next({sessionId:r,workspaceId:c,reason:p}),H(i,"active.start",l),H(i,"session.created",l)}function t(i,r){try{localStorage.setItem(i,r)}catch{}}async function k(i,r,p={}){if(!i.backend)return{};let c=$(i),l=await i.backend(r,{workspaceId:c,data:p});return A(l)?l:{}}async function vi(i,r,p,c,l,b){let h={id:v(),role:"user",text:l,attachments:fi(b),createdAt:Date.now()},f=O(p);f.messages.push(h),f.updatedAt=Date.now(),x(p),C(r,f.messages);let w=await Fi(i,l,b,p.activeSessionId);if(typeof w.activeSessionId==="string"&&w.activeSessionId){let n=p.activeSessionId,g=G(p,w.activeSessionId);if(n!==g.id&&!g.messages.some((u)=>u.id===h.id))g.messages.push(h),g.updatedAt=Date.now();N(i,{sessionId:w.activeSessionId,workspaceId:i.app?.dataset.activeWorkspaceId||$(i)||void 0}),H(i,"chat-session",{reason:"startPrompt",sessionId:w.activeSessionId}),li(i,w.activeSessionId,"startPrompt")}if(typeof w.runId!=="string"||!w.runId){let n=await Ui(i,l,b,p.activeSessionId),g=bi(i,p,n,"submitPrompt");C(r,g);return}let a=Bi(p);await di(i,p,w.runId,a,()=>C(r,O(p).messages)),await V(i,r,p,c,p.activeSessionId)}async function di(i,r,p,c,l){let b=0,h=!0;l();try{while(h){await Vi(120);let f=await k(i,"streamEvents",{runId:p,cursor:b}),w=Array.isArray(f.events)?f.events.filter(Di):[];b=typeof f.cursor==="number"?f.cursor:b,h=f.isStreaming===!0,Zi(c,w),c.streaming=h,O(r).updatedAt=Date.now(),x(r),l()}}finally{c.streaming=!1,x(r),l()}}function zi(i,r){globalThis.piWeb?.subject("chat.input.submitted").next({text:i,attachments:fi(r)||[]})}async function Fi(i,r,p,c){try{return await k(i,"startPrompt",{text:r,attachments:p,sessionId:c})}catch(l){if(Pi(l))return{};throw l}}function Pi(i){return/unknown method: startPrompt|unsupported method: startPrompt|startPrompt unsupported/i.test(wi(i))}async function Ui(i,r,p,c=""){return await k(i,"submitPrompt",{text:r,attachments:p,sessionId:c})}function Bi(i){let r=O(i),p=[...r.messages].reverse().find((l)=>l.role==="assistant"&&l.streaming);if(p)return p;let c={id:v(),role:"assistant",text:"",createdAt:Date.now(),streaming:!0};return r.messages.push(c),c}function Zi(i,r){for(let p of r)if(p.type==="text.delta"&&typeof p.delta==="string")i.text+=p.delta;else if(p.type==="thinking.delta"&&typeof p.delta==="string")i.thinking=`${i.thinking||""}${p.delta}`;else if(p.type==="tool.start")F(i,p,"running");else if(p.type==="tool.delta"&&typeof p.delta==="string"){let c=F(i,p,"running");c.text=p.delta}else if(p.type==="tool.end"){let c=F(i,p,p.isError?"err":"ok");if(typeof p.result==="string"&&p.result)c.text=p.result}else if(p.type==="error"&&typeof p.message==="string")i.text+=`${i.text?`
`:""}${p.message}`}function F(i,r,p){let c=r.toolCallId||r.toolName||"tool";i.toolCalls||=[];let l=i.toolCalls.find((b)=>b.id===c);if(!l)l={id:c,name:r.toolName||"tool",args:r.args,text:"",status:p},i.toolCalls.push(l);if(l.status=p,r.args)l.args=r.args;return l}function Di(i){return A(i)&&typeof i.type==="string"}function Vi(i){return new Promise((r)=>globalThis.setTimeout(r,i))}async function V(i,r,p,c,l=""){let b=++c.backendChatToken;try{let h=await k(i,"chatState",Gi(i,l));if(b!==c.backendChatToken)return;let f=bi(i,p,h,"chatState");if(f.length)C(r,f)}catch{}}function Gi(i,r){let p=r?{sessionId:r}:{},c=qi(i);if(c)p.workspacePath=c;return p}function qi(i){let r=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),p=i.app?.dataset.activeWorkspaceId||r?.activeWorkspaceId||"";return r?.workspaces?.find((c)=>c.id===p)?.path||""}function bi(i,r,p,c){let l=ai(p.messages);if(typeof p.activeSessionId==="string"&&p.activeSessionId){let h=r.activeSessionId;if(G(r,p.activeSessionId),N(i,{sessionId:p.activeSessionId,workspaceId:i.app?.dataset.activeWorkspaceId||$(i)||void 0}),c!=="chatState"||h!==p.activeSessionId)H(i,"chat-session",{reason:c,sessionId:p.activeSessionId});if(c!=="chatState")li(i,p.activeSessionId,c)}let b=O(r);if(l.length){if(b.messages=l.slice(-R),b.title==="New chat"){let h=l.find((f)=>f.role==="user");if(h)b.title=h.text.slice(0,48)||b.title}b.updatedAt=Date.now()}return x(r),b.messages}function Ji(i,r,p,c,l){let b=(a)=>{if(!a?.sessionId)return;N(r,a),G(c,a.sessionId),C(p,O(c).messages),V(r,p,c,l,a.sessionId)},h=(a)=>{let n=ji(r,a);if(n)b(n)},f=r.app?.piWebSidebar?.channels?.selectedSession$||globalThis.piWebSidebar?.channels?.selectedSession$,w=r.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$;if(f)i.add(f.subscribe(b));if(w)i.add(w.subscribe(h));if(r.app)i.listen(r.app,"pi-web-sidebar:session-created",(a)=>{let n=a.detail||{},g=typeof n.sessionId==="string"?n.sessionId:"",u=typeof n.workspaceId==="string"?n.workspaceId:"";if(g)b({sessionId:g,workspaceId:u||void 0})});if(globalThis.piWeb)i.add(globalThis.piWeb.behaviorSubject(ii,D(r)).subscribe(b)),i.add(globalThis.piWeb.subject(ri).subscribe(h)),i.add(globalThis.piWeb.behaviorSubject("session.activeId",null).subscribe((a)=>{if(!a)return;b({sessionId:a,workspaceId:r.app?.dataset.activeWorkspaceId||B(Z)||void 0})}))}function ji(i,r){if(!Yi(r.type))return null;let p=r.detail||{},c=typeof p.sessionId==="string"?p.sessionId:r.snapshot?.activeSessionId||"",l=typeof p.workspaceId==="string"?p.workspaceId:r.snapshot?.activeWorkspaceId||i.app?.dataset.activeWorkspaceId||"";if(!c)return null;return{sessionId:c,workspaceId:l||void 0}}function Yi(i){return i==="session.selected"||i==="session.created"||i==="new-session"||i==="active.start"}function G(i,r){let p=i.sessions.find((c)=>c.id===r);if(!p)p=M(r),i.sessions.unshift(p);return i.activeSessionId=p.id,x(i),p}function C(i,r){(i.querySelector(".term-inner")||i).replaceChildren(...r.map(Ki))}function Ki(i){let r=document.createElement("article");r.className="transcript-item",r.dataset.messageId=i.id;let p=document.createElement("div");p.className="msg",p.dataset.kind=P(i.role);let c=document.createElement("span");c.className=`prefix ${P(i.role)}`,c.textContent=ir(i.role);let l=document.createElement("pre");if(l.className=`body ${P(i.role)}`,l.textContent=i.text,p.append(c,l),r.append(p),i.thinking)r.append(Xi(i.thinking,Boolean(i.streaming)));for(let b of i.toolCalls||[])r.append(Qi(b));if(i.streaming)r.dataset.streaming="true";return r}function Xi(i,r){let p=document.createElement("details");p.className="msg-detail think thinking-block",p.open=r;let c=document.createElement("summary");c.className="label",c.textContent="THINKING";let l=document.createElement("pre");return l.className="body",l.textContent=i,p.append(c,l),p}function Qi(i){let r=document.createElement("div");r.className="tool-card",r.dataset.tool=i.name||"tool",r.dataset.status=i.status;let p=i.status!=="running";r.dataset.collapsed=p?"true":"false";let c=document.createElement("button");c.type="button",c.className="tc-head",c.title=p?"Show tool output":"Hide tool output",c.setAttribute("aria-expanded",p?"false":"true"),c.setAttribute("aria-label",`${p?"Show":"Hide"} ${i.name||"tool"} output`),c.append(Si(i),oi(i),Ii(i),mi(i));let l=document.createElement("pre");return l.className="tc-body",l.hidden=p,l.textContent=i.text||JSON.stringify(i.args||{},null,2),c.addEventListener("click",()=>Wi(r,c,l)),r.append(c,l),r}function Wi(i,r,p){let c=p.hidden===!1;p.hidden=c,i.dataset.collapsed=c?"true":"false",r.setAttribute("aria-expanded",c?"false":"true"),r.setAttribute("aria-label",`${c?"Show":"Hide"} ${i.dataset.tool||"tool"} output`),r.title=c?"Show tool output":"Hide tool output";let l=r.querySelector(".tc-toggle-label");if(l)l.textContent=c?"show":"hide"}function Si(i){let r=document.createElement("span");r.className="tc-glyph";let p=ti(i),c=p?_i[p]:"";if(!p||!c)return r.textContent="●",r;return r.innerHTML=`<svg class="tc-icon" data-tool-icon="${p}" aria-hidden="true" viewBox="0 0 24 24">${c}</svg>`,r}function oi(i){let r=document.createElement("span");return r.className="tc-name",r.textContent=i.name||"tool",r}function Ii(i){let r=document.createElement("span");return r.className="tc-args",r.textContent=hi(i),r}function mi(i){let r=document.createElement("span");if(r.className="tc-meta",i.status==="running"){let l=document.createElement("span");l.className="spinner",l.textContent="⠇";let b=document.createElement("span");return b.className="running",b.textContent="running",r.append(l,b,e(i.status)),r}let p=document.createElement("span");p.className=i.status==="err"?"err":"ok",p.textContent=i.status==="err"?"✗":"✓";let c=document.createElement("span");return c.textContent=i.status==="err"?" · failed":" · done",r.append(p,c,e()),r}function e(i="ok"){let r=document.createElement("span");r.className="tc-toggle";let p=document.createElement("span");p.className="tc-toggle-label",p.textContent=i==="running"?"hide":"show";let c=document.createElement("span");return c.className="tc-caret",c.textContent="▸",r.append(p,c),r}function hi(i){if(!i.args)return"";return JSON.stringify(i.args)}function ti(i){let r=ei(i.name);if(["bash","shell","sh","zsh","terminal"].includes(r))return si(hi(i).toLowerCase())||"terminal";return Ai[r]}function ei(i){return i.trim().replace(/^functions\./,"").replace(/^multi_tool_use\./,"")}function si(i){if(/\bgit\b|\bgh\b/.test(i))return"git-branch";if(/\b(go test|bun test|npm test|pnpm test|yarn test|vitest|pytest|cargo test)\b/.test(i))return"circle-check";if(/\b(bun|npm|pnpm|yarn)\s+(run\s+)?build\b|\b(go build|cargo build)\b/.test(i))return"hammer";if(/\b(bun|npm|pnpm|yarn)\s+(add|install|i)\b|\bpip\s+install\b|\bgo\s+get\b/.test(i))return"package";return}function ir(i){if(i==="assistant")return"pi >";if(i==="user")return"you >";if(i==="system")return"sys >";return"tool >"}function P(i){if(i==="assistant")return"pi";if(i==="system")return"sys";return i}function O(i){let r=i.sessions.find((p)=>p.id===i.activeSessionId);if(!r)r=M(),i.sessions.unshift(r),i.activeSessionId=r.id,x(i);return r}function M(i=v()){let r=Date.now();return{id:i,title:"New chat",createdAt:r,updatedAt:r,messages:[]}}function B(i){try{return localStorage.getItem(i)||""}catch{return""}}function rr(i=""){try{let p=JSON.parse(localStorage.getItem(U)||"null");if(p&&typeof p.activeSessionId==="string"&&Array.isArray(p.sessions)){let c=p.sessions.filter(pr).map(cr);if(i&&!c.some((l)=>l.id===i))c.unshift(M(i));return{activeSessionId:i||p.activeSessionId,sessions:c}}}catch{}let r=M(i||void 0);return{activeSessionId:r.id,sessions:[r]}}function x(i){s(i);try{localStorage.setItem(U,JSON.stringify(i))}catch{for(let r of i.sessions)r.messages=r.messages.slice(-Math.floor(R/2));s(i);try{localStorage.setItem(U,JSON.stringify(i))}catch{}}}function fi(i){if(!i?.length)return;return i.map(({content:r,...p})=>p)}function s(i){i.sessions.sort((c,l)=>l.updatedAt-c.updatedAt);let r=i.sessions.find((c)=>c.id===i.activeSessionId),p=i.sessions.filter((c)=>c.id!==i.activeSessionId).slice(0,Math.max(0,m-1));i.sessions=r?[r,...p]:i.sessions.slice(0,m);for(let c of i.sessions)if(c.messages.length>R)c.messages.splice(0,c.messages.length-R)}function pr(i){return A(i)&&typeof i.id==="string"&&Array.isArray(i.messages)}function cr(i){return{...i,messages:ai(i.messages)}}function ai(i){return Array.isArray(i)?i.filter(fr).map(lr):[]}function lr(i){if(!Array.isArray(i.toolCalls)){let{toolCalls:r,...p}=i;return p}return{...i,toolCalls:i.toolCalls.filter(br)}}function br(i){if(!A(i)||typeof i.id!=="string"||typeof i.name!=="string")return!1;return typeof i.text==="string"&&hr(i.status)}function hr(i){return i==="running"||i==="ok"||i==="err"}function fr(i){if(!A(i)||typeof i.id!=="string"||typeof i.text!=="string")return!1;return typeof i.createdAt==="number"&&ar(i.role)}function ar(i){return i==="user"||i==="assistant"||i==="tool"||i==="system"}function A(i){return typeof i==="object"&&i!==null}function v(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`}function wi(i){return i instanceof Error?i.message:String(i)}export{Li as renderMessages,Ei as promptFromAgUiLikeRunInput,W as pluginStyleText,z as pluginClass,Or as mergeCommands,$ as getActiveWorkspaceId,Cr as extractRefs,Ri as default,K as createComposerSurface,Y as createChatSurface,gi as createChatDom,Er as createChannels,Ti as createAgUiLikeRunInput,o as commandName,Ci as chatEventsToAgUiLikeEvents,k as backendCall};
