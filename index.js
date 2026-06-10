var B={attachFile:["M16.5 6v11.5a4 4 0 0 1-8 0V5a2.5 2.5 0 0 1 5 0v10.5a1 1 0 0 1-2 0V6H10v9.5","a2.5 2.5 0 0 0 5 0V5a4 4 0 0 0-8 0v12.5a5.5 5.5 0 0 0 11 0V6h-1.5Z"].join(""),stop:"M6 6h12v12H6V6Z",send:"M2 21 23 12 2 3v7l15 2-15 2v7Z",terminal:"M3 4h18v16H3V4Zm2 2v12h14V6H5Zm2 3 1.1-1.1L12.2 12l-4.1 4.1L7 15l3-3-3-3Zm6 6h5v1.5h-5V15Z",file:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 2.5L17.5 8H14V4.5ZM8 13h8v1.5H8V13Zm0 3h8v1.5H8V16Z"},g={attachFile:Z("attach_file",B.attachFile),stop:Z("stop",B.stop),send:Z("send",B.send)};function Z(i,b){return`<svg class="material-icon" data-material-icon="${i}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="${b}"></path></svg>`}function v(){return"pi-web-chat-mounted"}function a(){let i=document.createElement("main");return i.className="main pi-web-chat-surface",i.dataset.main="session",i.innerHTML='<div class="term"><div class="term-inner" role="log" aria-live="polite" aria-relevant="additions text"></div></div><button type="button" class="scroll-bottom-btn" data-action="scroll-bottom" aria-label="scroll to bottom" title="scroll to bottom" hidden>↓</button>',i}function n(){let i=document.createElement("section");return i.className="prompt-region pi-web-chat-composer",i.innerHTML=`
    <div class="slash-pop" hidden><div class="slash-head">slash commands · type to filter</div><div class="slash-list"></div></div>
    <div class="prompt-bar">
      <button class="attach-btn" type="button" aria-label="attach files" title="attach files">${g.attachFile}</button>
      <input type="file" multiple hidden data-file-input />
      <div class="prompt-input-col"><div class="attach-chips" hidden></div><textarea class="prompt-textarea" aria-label="Prompt" placeholder="ask pi to do something…" rows="1"></textarea></div>
      <div class="prompt-actions">
        <button class="stop-btn" type="button" aria-label="stop" title="stop" hidden>${g.stop}</button>
        <button class="mic-btn" type="button" data-action="toggle-speech-input" aria-label="start voice input" title="voice input" hidden>\uD83C\uDF99</button>
        <button class="send-btn" type="button" aria-label="send" title="send" aria-disabled="true">${g.send}</button>
      </div>
      <div class="drop-overlay" hidden><span>drop to attach</span></div>
    </div>
    <div class="prompt-meta" data-prompt-meta>— | <span class="prompt-meta-item prompt-meta-branch"><span>—</span></span></div>`,i}function o(i){let b=document.createElement("span");return b.className="prompt-meta-item pi-web-chat-badge",b.textContent="chat plugin",i.querySelector("[data-prompt-meta]")?.append(b),b}function Gi(){let i=document.createElement("section");return i.className="pi-web-chat-root",i.dataset.plugin="pi-web-chat",i.innerHTML=`
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
        <button class="pi-web-chat-icon-btn" type="button" data-attach aria-label="attach files" title="attach files">${Z("attach_file",B.attachFile)}</button>
        <input type="file" multiple hidden data-file-input />
        <textarea class="pi-web-chat-textarea" data-chat-input aria-label="Prompt" placeholder="ask pi to do something…" rows="1"></textarea>
        <button class="pi-web-chat-send" type="button" data-send aria-label="send" title="send" aria-disabled="true">${Z("send",B.send)}</button>
      </div>
    </section>`,{root:i,transcript:_(i.querySelector("[data-chat-transcript]")),textarea:_(i.querySelector("[data-chat-input]")),sendButton:_(i.querySelector("[data-send]")),attachButton:_(i.querySelector("[data-attach]")),fileInput:_(i.querySelector("[data-file-input]")),slashPopover:_(i.querySelector("[data-slash-popover]")),slashList:_(i.querySelector("[data-slash-list]")),refsPopover:_(i.querySelector("[data-refs-popover]")),refsList:_(i.querySelector("[data-refs-list]")),attachments:_(i.querySelector("[data-attachments]"))}}function qi(i,b){i.replaceChildren(...b.map(Ji)),i.scrollTop=i.scrollHeight}function Ji(i){let b=document.createElement("article");b.className=`pi-web-chat-message pi-web-chat-message-${i.role}`,b.dataset.messageId=i.id;let p=document.createElement("div");p.className="pi-web-chat-message-role",p.textContent=i.role;let h=document.createElement("pre");if(h.className="pi-web-chat-message-body",h.textContent=i.text,b.append(p,h),i.thinking){let f=document.createElement("details");f.className="pi-web-chat-thinking",f.open=Boolean(i.streaming);let l=document.createElement("summary");l.textContent="thinking";let w=document.createElement("pre");w.textContent=i.thinking,f.append(l,w),b.append(f)}if(i.toolCalls?.length){let f=document.createElement("div");f.className="pi-web-chat-tools";for(let l of i.toolCalls){let w=document.createElement("details");w.className=`pi-web-chat-tool pi-web-chat-tool-${l.status}`,w.open=l.status==="running";let L=document.createElement("summary");L.textContent=`${l.name} · ${l.status}`;let T=document.createElement("pre");T.textContent=l.text||JSON.stringify(l.args||{},null,2),w.append(L,T),f.append(w)}b.append(f)}if(i.streaming){let f=document.createElement("div");f.className="pi-web-chat-message-meta",f.textContent="streaming...",b.append(f)}if(i.attachments?.length){let f=document.createElement("div");f.className="pi-web-chat-message-meta",f.textContent=`${i.attachments.length} attachment(s)`,b.append(f)}return b}function t(i,b){i.hidden=b.length===0,i.replaceChildren(...b.map((p)=>{let h=document.createElement("span");return h.className="pi-web-chat-attachment-chip",h.textContent=p,h}))}function e(){return`
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
  `}function s(){document.getElementById("pi-web-chat-style")?.remove();let i=document.createElement("style");return i.id="pi-web-chat-style",i.textContent=e(),document.head.append(i),i}function ii(i){return i.command||i.cmd||(i.name?`/${i.name}`:"")}function _(i){if(!i)throw Error("pi-web-chat DOM template is invalid");return i}function ji(i,b,p){return{threadId:i,runId:b,state:{},messages:p,tools:[],context:[]}}function ui(i){let b=[...i.messages].reverse().find((p)=>p.role==="user");return{text:b?.text||"",attachments:b?.attachments||[],sessionId:i.threadId}}function Yi(i,b,p){return i.map((h)=>Xi(h,b,p))}function Xi(i,b,p){if(i.type==="text.delta")return{type:"TEXT_MESSAGE_CONTENT",threadId:b,runId:p,delta:i.delta||""};if(i.type==="thinking.delta")return{type:"THINKING_MESSAGE_CONTENT",threadId:b,runId:p,delta:i.delta||""};if(i.type==="tool.start")return{type:"TOOL_CALL_START",threadId:b,runId:p,toolCallId:i.toolCallId,payload:pi(i)};if(i.type==="tool.delta")return{type:"TOOL_CALL_ARGS",threadId:b,runId:p,toolCallId:i.toolCallId,delta:i.delta||""};if(i.type==="tool.end")return{type:"TOOL_CALL_END",threadId:b,runId:p,toolCallId:i.toolCallId,payload:pi(i)};return{type:i.type.toUpperCase().replaceAll(".","_"),threadId:b,runId:p,payload:i}}function pi(i){return{name:i.toolName||"tool",args:i.args||{},result:i.result||"",isError:i.isError===!0}}var W="pi-web-chat.sessions.v1";var ci="plugin.pi-web-sidebar.selectedSession",ri="plugin.pi-web-sidebar.event",Ci="plugin.pi-web-sidebar.activeSessionId",j="plugin.pi-web-sidebar.activeWorkspaceId";var bi=20,D=200,Qi=8,gi=1e6;var vi=250,z=new Set,Ki={"book-open":'<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',"file-plus":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="M9 15h6"/>',pencil:'<path d="M21.2 6.8 17.2 2.8a2 2 0 0 0-2.8 0L3 14.2V21h6.8L21.2 9.6a2 2 0 0 0 0-2.8z"/><path d="m14 5 5 5"/>',terminal:'<path d="m4 17 6-6-6-6"/><path d="M12 19h8"/>',cpu:'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 15h3"/><path d="M1 9h3"/><path d="M1 15h3"/>',globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 0 20"/><path d="M12 2a15.3 15.3 0 0 0 0 20"/>',search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',braces:'<path d="M8 3H7a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-4a2 2 0 0 1 2-2 2 2 0 0 1-2-2V7a2 2 0 0 0-2-2h-1"/>',"file-text":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',"circle-question-mark":'<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 1 1 5.8 1c-.5 1-1.4 1.5-2.1 2-.6.4-.8.8-.8 2"/><path d="M12 17h.01"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',plug:'<path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a6 6 0 0 1-12 0V8Z"/>',"git-branch":'<line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',"circle-check":'<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',hammer:'<path d="m15 12-8.5 8.5a2.1 2.1 0 0 1-3-3L12 9"/><path d="m17.6 5.4 1.8-1.8"/><path d="m14 7 3 3"/><path d="M5 11 2 8l6-6 3 3"/>',package:'<path d="m7.5 4.3 9 5.2"/><path d="M21 8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>'},Pi={read:"book-open",write:"file-plus",edit:"pencil",ctx_execute:"cpu",ctx_batch_execute:"cpu",ctx_execute_file:"cpu",ctx_search:"cpu",ctx_index:"cpu",ctx_fetch_and_index:"cpu",web_search:"globe",fetch_content:"search",get_search_content:"search",code_search:"braces",document_parse:"file-text",ask_user_question:"circle-question-mark",teams:"users",subagent:"users",mcp:"plug",git:"git-branch"};class Oi{#i=[];add(i){if(i)this.#i.push(i);return i}listen(i,b,p){i.addEventListener(b,p),this.add({remove:()=>i.removeEventListener(b,p)})}dispose(){for(let i of this.#i.splice(0).reverse())if(typeof i==="function")i();else if("unsubscribe"in i)i.unsubscribe();else i.remove()}}function Wi(i={}){let b=i.app;if(b?.piWebChat?.dispose(),typeof i.mount?.chat!=="function"||typeof i.mount?.composer!=="function")throw Error("pi-web-chat requires modern pi-web mount.chat and mount.composer APIs");return xi(i,b)}function xi(i,b){let p=new Oi,h=p.add(s()),f=a(),l=n(),w=i.mount?.chat(f,{replace:!0}),L=i.mount?.composer(l,{replace:!0});if(w)p.add(w);if(L)p.add(L);let T=Y(i);F(i,T||void 0);let c=Zp(T?.sessionId||""),r={backendChatToken:0};y(f,X(c).messages,c.activeSessionId),S(i,f,c,r,T?.sessionId||c.activeSessionId),Lp(p,i,f,c,r),ki(p,i,l,f,c,r);let C=b?p.add(o(b)):void 0;b?.classList.add(v());let E=()=>{if(r.runEventsAbort?.abort(),r.sessionEventsAbort?.abort(),p.dispose(),z.clear(),C?.remove(),h.remove(),b?.classList.remove(v()),b?.piWebChat===A)delete b.piWebChat},A={dispose:E};if(b)b.piWebChat=A;return E}function ki(i,b,p,h,f,l){let w=p.querySelector(".prompt-textarea"),L=p.querySelector(".send-btn"),T=p.querySelector(".attach-btn"),c=p.querySelector("[data-file-input]"),r=p.querySelector(".attach-chips");if(!w||!L)return;let C=[],E=()=>{let O=w.value;L.setAttribute("aria-disabled",O.trim()?"false":"true")},A=()=>{if(!r)return;t(r,C.map((O)=>{return O.name||"attachment"}))},N=async(O)=>{O?.preventDefault(),O?.stopImmediatePropagation();let H=w.value.trim();if(E(),!H)return;let m=[...C];L.disabled=!0;try{if(ei(H,m),await mi(b,h,f,l,H,m),C=[],A(),w.value.trim()===H)w.value="";if(c)c.value=""}catch(Vi){y(h,[Si(Vi)],f.activeSessionId)}finally{L.disabled=!1,E()}};if(i.listen(w,"input",E),i.listen(w,"keydown",(O)=>{let H=O;if(H.key==="Enter"&&(H.metaKey||H.ctrlKey))N(H)}),i.listen(L,"click",(O)=>{N(O)}),T&&c)i.listen(T,"click",()=>c.click()),i.listen(c,"change",()=>{Ii(c,(O)=>{C=O,A()})})}function Si(i){return{id:Q(),role:"system",text:`prompt failed: ${Di(i)}`,createdAt:Date.now()}}async function Ii(i,b){let p=Array.from(i.files||[]).slice(0,Qi),h=[];for(let f of p){if(f.size>gi)continue;h.push({name:f.name,size:f.size,content:await f.text(),mimeType:f.type||void 0})}b(h)}function Pp(i){return{input$:i.behaviorSubject("chat.input",""),submitted$:i.subject("chat.input.submitted"),activeSessionId$:i.behaviorSubject("session.activeId",null),sidebarSelectedSession$:i.behaviorSubject(ci,di()),toastRequested$:i.subject("toast.requested")}}function Wp(i){let b=[],p=new Set,h=/(^|[\s`])@([^\s@`]+)/g,f=h.exec(String(i||""));while(f!==null){let l=f[2]||"";if((f[1]||"")!=="`"&&l&&!p.has(l))p.add(l),b.push(l);f=h.exec(String(i||""))}return b}function xp(i=[],b=[]){let p=[],h=new Set;for(let f of[...i,...b]){let l=ii(f);if(!l||h.has(l))continue;h.add(l),p.push(f)}return p}function u(i){return i.app?.piWebSidebar?.getSnapshot?.().activeWorkspaceId||i.app?.dataset.activeWorkspaceId||""}function di(){return Y({})}function Y(i){let b=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),p=b?.activeSessionId||"",h=b?.activeWorkspaceId||"";if(p)return{sessionId:p,workspaceId:h||void 0};let f=J(Ci),l=J(j);return f?{sessionId:f,workspaceId:l||void 0}:null}function F(i,b){if(b?.workspaceId&&i.app)i.app.dataset.activeWorkspaceId=b.workspaceId,hi(j,b.workspaceId);if(b?.sessionId)i.app?.setAttribute("data-active-session-id",b.sessionId),hi(Ci,b.sessionId)}function V(i,b,p={}){let h=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),f={type:b,detail:p,snapshot:h};(i.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$)?.next(f),globalThis.piWeb?.subject(ri).next(f)}function x(i,b,p){let h=i.app?.dataset.activeWorkspaceId||u(i),f={reason:p,sessionId:b,workspaceId:h};globalThis.piWeb?.behaviorSubject("session.activeId",b).next(b),globalThis.piWeb?.subject("session.changed").next({sessionId:b,workspaceId:h,reason:p}),V(i,"active.start",f),V(i,"session.created",f)}function hi(i,b){try{localStorage.setItem(i,b)}catch{}}async function k(i,b,p={},h=u(i)){if(!i.backend)return{};let f=await i.backend(b,{workspaceId:h,data:p});return U(f)?f:{}}async function mi(i,b,p,h,f,l){let w=Tp(i,p),L=$(i);h.backendChatToken+=1,h.runEventsAbort?.abort();let T=new AbortController;h.runEventsAbort=T,h.sessionEventsAbort?.abort();let c={id:Q(),role:"user",text:f,attachments:Zi(l),createdAt:Date.now()},r=M(p,w);r.messages.push(c),r.updatedAt=Date.now(),R(p),y(b,r.messages,w);let C=await si(i,f,l,w,L.path,L.id);if(typeof C.activeSessionId==="string"&&C.activeSessionId){let N=w,O=p.activeSessionId===N;if(w=C.activeSessionId,O)G(p,w),F(i,{sessionId:C.activeSessionId,workspaceId:L.id||void 0}),V(i,"chat-session",{reason:"startPrompt",sessionId:C.activeSessionId}),x(i,C.activeSessionId,"startPrompt");else M(p,w);Bp(p,N,w,c.id)}if(typeof C.runId!=="string"||!C.runId){let N=await pp(i,f,l,w,L.path,L.id),O=wp(i,p,N,"submitPrompt",w);if(p.activeSessionId===w)y(b,O,w);if(h.runEventsAbort===T)h.runEventsAbort=void 0;return}let E=M(p,w),A=bp(E);try{await ai(i,p,E,C.runId,L.path,L.id,A,()=>{if(p.activeSessionId===w)y(b,E.messages,w)},T.signal)}finally{if(h.runEventsAbort===T)h.runEventsAbort=void 0}if(p.activeSessionId===w)S(i,b,p,h,w,L.path,L.id)}async function ai(i,b,p,h,f,l,w,L,T){let c=await _i(i,"streamEventsSse",{runId:h,cursor:0,workspacePath:f},T,l);if(!c)throw Error("SSE streaming backend did not return a stream");let r=Ei(L);w.streaming=!0,r.flush();try{await Hi(c,(C)=>{hp(w,[C]),w.streaming=C.type!=="run.end",p.updatedAt=Date.now(),R(b),r.request()})}finally{w.streaming=!1,R(b),r.flush()}}function Ei(i){let b=0,p,h=()=>{if(p)clearTimeout(p),p=void 0},f=()=>{h(),b=Date.now(),i()};return{request:()=>{let w=vi-(Date.now()-b);if(w<=0){f();return}p||=setTimeout(f,w)},flush:f,cancel:h}}async function _i(i,b,p={},h,f=u(i)){if(!i.backendStream)throw Error("SSE streaming backend is unavailable");let l=await i.backendStream(b,{workspaceId:f,data:p},{signal:h});return ni(l)}function ni(i){if(typeof ReadableStream<"u"&&i instanceof ReadableStream)return i;if(typeof Response<"u"&&i instanceof Response)return i.body;if(typeof i==="string")return fi(i);if(!U(i))return null;let b=i.body;if(typeof ReadableStream<"u"&&b instanceof ReadableStream)return b;let p=i.sse;if(typeof p==="string")return fi(p);return null}function fi(i){let b=new TextEncoder().encode(i);return new ReadableStream({start(p){p.enqueue(b),p.close()}})}async function Hi(i,b){let p=i.getReader(),h=new TextDecoder,f="";while(!0){let l=await p.read();if(l.done){f+=h.decode(),ti(f,b);return}f+=h.decode(l.value,{stream:!0});let w=oi(f);f=w.remainder;for(let L of w.frames)Ri(L,b)}}function oi(i){let p=i.replaceAll(`\r
`,`
`).replaceAll("\r",`
`).split(`

`),h=p.pop()||"";return{frames:p,remainder:h}}function ti(i,b){let p=i.trim();if(p)Ri(p,b)}function Ri(i,b){let p=i.split(`
`).filter((h)=>h.startsWith("data:")).map((h)=>h.slice(5).trimStart()).join(`
`);if(!p)return;try{let h=JSON.parse(p);if(fp(h))b(h)}catch{}}function ei(i,b){globalThis.piWeb?.subject("chat.input.submitted").next({text:i,attachments:Zi(b)||[]})}async function si(i,b,p,h,f=$(i).path,l=$(i).id){try{return await k(i,"startPrompt",yi(b,p,h,f),l)}catch(w){if(ip(w))return{};throw w}}function ip(i){return/unknown method: (startPrompt|streamEventsSse)|unsupported method: (startPrompt|streamEventsSse)|(startPrompt|streamEventsSse) unsupported/i.test(Di(i))}async function pp(i,b,p,h="",f=$(i).path,l=$(i).id){return await k(i,"submitPrompt",yi(b,p,h,f),l)}function yi(i,b,p,h){let f={text:i,attachments:b,sessionId:p};if(h)f.workspacePath=h;return f}function bp(i){let b=[...i.messages].reverse().find((h)=>h.role==="assistant"&&h.streaming);if(b)return b;let p={id:Q(),role:"assistant",text:"",createdAt:Date.now(),streaming:!0};return i.messages.push(p),p}function hp(i,b){for(let p of b)if(p.type==="text.delta"&&typeof p.delta==="string")i.text+=p.delta;else if(p.type==="thinking.delta"&&typeof p.delta==="string")i.thinking=`${i.thinking||""}${p.delta}`;else if(p.type==="tool.start")K(i,p,"running");else if(p.type==="tool.delta"&&typeof p.delta==="string"){let h=K(i,p,"running");h.text=p.delta}else if(p.type==="tool.end"){let h=K(i,p,p.isError?"err":"ok");if(typeof p.result==="string"&&p.result)h.text=p.result}else if(p.type==="error"&&typeof p.message==="string")i.text+=`${i.text?`
`:""}${p.message}`}function K(i,b,p){let h=b.toolCallId||b.toolName||"tool";i.toolCalls||=[];let f=i.toolCalls.find((l)=>l.id===h);if(!f)f={id:h,name:b.toolName||"tool",args:b.args,text:"",status:p},i.toolCalls.push(f);if(f.status=p,b.args)f.args=b.args;return f}function fp(i){return U(i)&&typeof i.type==="string"}async function S(i,b,p,h,f="",l=I(i),w=$(i).id){if(!i.backendStream){await li(i,b,p,h,f,l);return}let L=++h.backendChatToken;h.sessionEventsAbort?.abort();let T=new AbortController;h.sessionEventsAbort=T;let c=Ei(()=>{y(b,X(p).messages,p.activeSessionId)});try{let r=await _i(i,"sessionEventsSse",$i(i,f,l),T.signal,w);if(!r)throw Error("session SSE backend did not return a stream");await Hi(r,(C)=>{if(L!==h.backendChatToken||C.type!=="chat.state")return;if(Ai(i,p,lp(C),"chatState").length)c.request()})}catch(r){if(!T.signal.aborted)await li(i,b,p,h,f,l)}finally{if(c.cancel(),h.sessionEventsAbort===T)h.sessionEventsAbort=void 0}}async function li(i,b,p,h,f="",l=I(i)){let w=++h.backendChatToken;try{let L=await k(i,"chatState",$i(i,f,l));if(w!==h.backendChatToken)return;let T=Ai(i,p,L,"chatState");if(T.length)y(b,T,p.activeSessionId)}catch{}}function $i(i,b,p=I(i)){let h=b?{sessionId:b}:{};if(p)h.workspacePath=p;return h}function lp(i){return{activeSessionId:i.activeSessionId,messages:i.messages,isStreaming:i.isStreaming}}function I(i){return $(i).path}function $(i){let b=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),p=b?.activeWorkspaceId||i.app?.dataset.activeWorkspaceId||"",h=b?.workspaces?.find((f)=>f.id===p)?.path||"";return{id:p,path:h}}function Ai(i,b,p,h){let f=d(p.messages);if(typeof p.activeSessionId==="string"&&p.activeSessionId){let L=b.activeSessionId;if(G(b,p.activeSessionId),F(i,{sessionId:p.activeSessionId,workspaceId:i.app?.dataset.activeWorkspaceId||u(i)||void 0}),h!=="chatState"||L!==p.activeSessionId)V(i,"chat-session",{reason:h,sessionId:p.activeSessionId});if(h!=="chatState")x(i,p.activeSessionId,h)}let l=X(b);if(!f.length)return[];let w=Bi(l.messages,f).slice(-D);if(!Ni(l.messages,w))return[];if(l.messages=w,l.title==="New chat"){let L=l.messages.find((T)=>T.role==="user");if(L)l.title=L.text.slice(0,48)||l.title}return l.updatedAt=Date.now(),R(b),l.messages}function Ni(i,b){if(i.length!==b.length)return!0;return i.some((p,h)=>wi(p)!==wi(b[h]))}function wi(i){return JSON.stringify({id:i.id,role:i.role,text:i.text,thinking:i.thinking,streaming:i.streaming,toolCalls:i.toolCalls,attachments:i.attachments})}function wp(i,b,p,h,f){let l=d(p.messages),w=typeof p.activeSessionId==="string"&&p.activeSessionId?p.activeSessionId:f,L=b.activeSessionId===f;if(w!==f)if(L)G(b,w),F(i,{sessionId:w,workspaceId:$(i).id||void 0}),V(i,"chat-session",{reason:h,sessionId:w}),x(i,w,h);else M(b,w);let T=M(b,w);if(!l.length)return[];let c=Bi(T.messages,l).slice(-D);if(!Ni(T.messages,c))return[];return T.messages=c,T.updatedAt=Date.now(),R(b),T.messages}function Lp(i,b,p,h,f){let l=(c)=>{if(!c?.sessionId)return;if(Mi(b,h,c))return;F(b,c),G(h,c.sessionId),y(p,X(h).messages,h.activeSessionId),S(b,p,h,f,c.sessionId)},w=(c)=>{let r=cp(b,c);if(r)l(r)},L=b.app?.piWebSidebar?.channels?.selectedSession$||globalThis.piWebSidebar?.channels?.selectedSession$,T=b.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$;if(L)i.add(L.subscribe(l));if(T)i.add(T.subscribe(w));if(b.app)i.listen(b.app,"pi-web-sidebar:session-created",(c)=>{let r=c.detail||{},C=typeof r.sessionId==="string"?r.sessionId:"",E=typeof r.workspaceId==="string"?r.workspaceId:"";if(C)l({sessionId:C,workspaceId:E||void 0})});if(globalThis.piWeb)i.add(globalThis.piWeb.behaviorSubject(ci,Y(b)).subscribe(l)),i.add(globalThis.piWeb.subject(ri).subscribe(w)),i.add(globalThis.piWeb.behaviorSubject("session.activeId",null).subscribe((c)=>{if(!c)return;l({sessionId:c,workspaceId:b.app?.dataset.activeWorkspaceId||J(j)||void 0})}))}function Tp(i,b){let p=Y(i);if(p?.sessionId&&!Mi(i,b,p))F(i,p),G(b,p.sessionId);return b.activeSessionId}function Mi(i,b,p){let h=p.workspaceId||"",f=i.app?.dataset.activeWorkspaceId||J(j)||"";return b.activeSessionId===p.sessionId&&(!h||h===f)}function cp(i,b){if(!rp(b.type))return null;let p=b.detail||{},h=typeof p.sessionId==="string"?p.sessionId:b.snapshot?.activeSessionId||"",f=typeof p.workspaceId==="string"?p.workspaceId:b.snapshot?.activeWorkspaceId||i.app?.dataset.activeWorkspaceId||"";if(!h)return null;return{sessionId:h,workspaceId:f||void 0}}function rp(i){return i==="session.selected"||i==="session.created"||i==="new-session"||i==="active.start"}function G(i,b){let p=i.sessions.find((h)=>h.id===b);if(!p)p=q(b),i.sessions.unshift(p);return i.activeSessionId=p.id,R(i),p}function y(i,b,p){_p(b,p),(i.querySelector(".term-inner")||i).replaceChildren(...b.map((f)=>Cp(f,p)))}function Cp(i,b){let p=document.createElement("article");p.className="transcript-item",p.dataset.messageId=i.id;let h=document.createElement("div");h.className="msg",h.dataset.kind=P(i.role);let f=document.createElement("span");f.className=`prefix ${P(i.role)}`,f.textContent=Up(i.role);let l=document.createElement("pre");if(l.className=`body ${P(i.role)}`,l.textContent=i.text,h.append(f,l),Op(i))p.append(h);if(i.thinking)p.append(Ep(i.thinking,Boolean(i.streaming)));for(let w of i.toolCalls||[])p.append(Hp(w,zi(b,i,w)));if(i.streaming)p.dataset.streaming="true";return p}function Op(i){let b=i.text.trim().length>0;return i.role!=="assistant"||b}function Ep(i,b){let p=document.createElement("details");p.className="msg-detail think thinking-block",p.open=b;let h=document.createElement("summary");h.className="label",h.textContent="THINKING";let f=document.createElement("pre");return f.className="body",f.textContent=i,p.append(h,f),p}function _p(i,b){let p=new Set;for(let h of i)for(let f of h.toolCalls||[])p.add(zi(b,h,f));for(let h of z)if(!p.has(h))z.delete(h)}function zi(i,b,p){return`${i}:${b.id}:${p.id}`}function Hp(i,b){let p=document.createElement("div");p.className="tool-card",p.dataset.tool=i.name||"tool",p.dataset.status=i.status;let h=!z.has(b);p.dataset.collapsed=h?"true":"false";let f=document.createElement("button");if(f.type="button",f.className="tc-head",f.title=h?"Show tool output":"Hide tool output",f.setAttribute("aria-expanded",h?"false":"true"),f.setAttribute("aria-label",`${h?"Show":"Hide"} ${i.name||"tool"} output`),f.append(yp(i),$p(i),Ap(i),Np(i,h)),!h)p.append(Fi(i));return f.addEventListener("click",()=>Rp(p,f,i,b)),p.prepend(f),p}function Fi(i){let b=document.createElement("pre");return b.className="tc-body",b.textContent=i.text||JSON.stringify(i.args||{},null,2),b}function Rp(i,b,p,h){let f=i.querySelector(".tc-body"),l=f!==null;if(f)f.remove(),z.delete(h);else i.append(Fi(p)),z.add(h);i.dataset.collapsed=l?"true":"false",b.setAttribute("aria-expanded",l?"false":"true"),b.setAttribute("aria-label",`${l?"Show":"Hide"} ${i.dataset.tool||"tool"} output`),b.title=l?"Show tool output":"Hide tool output";let w=b.querySelector(".tc-toggle-label");if(w)w.textContent=l?"show":"hide"}function yp(i){let b=document.createElement("span");b.className="tc-glyph";let p=Mp(i),h=p?Ki[p]:"";if(!p||!h)return b.textContent="●",b;return b.innerHTML=`<svg class="tc-icon" data-tool-icon="${p}" aria-hidden="true" viewBox="0 0 24 24">${h}</svg>`,b}function $p(i){let b=document.createElement("span");return b.className="tc-name",b.textContent=i.name||"tool",b}function Ap(i){let b=document.createElement("span");return b.className="tc-args",b.textContent=Ui(i),b}function Np(i,b){let p=document.createElement("span");if(p.className="tc-meta",i.status==="running"){let l=document.createElement("span");l.className="spinner",l.textContent="⠇";let w=document.createElement("span");return w.className="running",w.textContent="running",p.append(l,w,Li(b)),p}let h=document.createElement("span");h.className=i.status==="err"?"err":"ok",h.textContent=i.status==="err"?"✗":"✓";let f=document.createElement("span");return f.textContent=i.status==="err"?" · failed":" · done",p.append(h,f,Li(b)),p}function Li(i){let b=document.createElement("span");b.className="tc-toggle";let p=document.createElement("span");p.className="tc-toggle-label",p.textContent=i?"show":"hide";let h=document.createElement("span");return h.className="tc-caret",h.textContent="▸",b.append(p,h),b}function Ui(i){if(!i.args)return"";return JSON.stringify(i.args)}function Mp(i){let b=zp(i.name);if(["bash","shell","sh","zsh","terminal"].includes(b))return Fp(Ui(i).toLowerCase())||"terminal";return Pi[b]}function zp(i){return i.trim().replace(/^functions\./,"").replace(/^multi_tool_use\./,"")}function Fp(i){if(/\bgit\b|\bgh\b/.test(i))return"git-branch";if(/\b(go test|bun test|npm test|pnpm test|yarn test|vitest|pytest|cargo test)\b/.test(i))return"circle-check";if(/\b(bun|npm|pnpm|yarn)\s+(run\s+)?build\b|\b(go build|cargo build)\b/.test(i))return"hammer";if(/\b(bun|npm|pnpm|yarn)\s+(add|install|i)\b|\bpip\s+install\b|\bgo\s+get\b/.test(i))return"package";return}function Up(i){if(i==="assistant")return"pi >";if(i==="user")return"you >";if(i==="system")return"sys >";return"tool >"}function P(i){if(i==="assistant")return"pi";if(i==="system")return"sys";return i}function Bi(i,b){let p=new Map;for(let h of i)p.set(h.id,h);for(let h of b)p.set(h.id,{...p.get(h.id),...h});return[...p.values()].sort((h,f)=>h.createdAt-f.createdAt)}function X(i){return M(i,i.activeSessionId,!0)}function M(i,b,p=!1){let h=i.sessions.find((f)=>f.id===b);if(!h)h=q(b||void 0),i.sessions.unshift(h),R(i);if(p||!i.activeSessionId)i.activeSessionId=h.id,R(i);return h}function Bp(i,b,p,h){if(b===p)return;let f=i.sessions.find((T)=>T.id===b),l=f?.messages.findIndex((T)=>T.id===h)??-1;if(!f||l<0)return;let[w]=f.messages.splice(l,1),L=M(i,p);if(!L.messages.some((T)=>T.id===w.id))L.messages.push(w);f.updatedAt=Date.now(),L.updatedAt=Date.now(),R(i)}function q(i=Q()){let b=Date.now();return{id:i,title:"New chat",createdAt:b,updatedAt:b,messages:[]}}function J(i){try{return localStorage.getItem(i)||""}catch{return""}}function Zp(i=""){try{let p=JSON.parse(localStorage.getItem(W)||"null");if(p&&typeof p.activeSessionId==="string"&&Array.isArray(p.sessions)){let h=p.sessions.filter(Dp).map(Vp);if(i&&!h.some((f)=>f.id===i))h.unshift(q(i));return{activeSessionId:i||p.activeSessionId,sessions:h}}}catch{}let b=q(i||void 0);return{activeSessionId:b.id,sessions:[b]}}function R(i){Ti(i);try{localStorage.setItem(W,JSON.stringify(i))}catch{for(let b of i.sessions)b.messages=b.messages.slice(-Math.floor(D/2));Ti(i);try{localStorage.setItem(W,JSON.stringify(i))}catch{}}}function Zi(i){if(!i?.length)return;return i.map(({content:b,...p})=>p)}function Ti(i){i.sessions.sort((h,f)=>f.updatedAt-h.updatedAt);let b=i.sessions.find((h)=>h.id===i.activeSessionId),p=i.sessions.filter((h)=>h.id!==i.activeSessionId).slice(0,Math.max(0,bi-1));i.sessions=b?[b,...p]:i.sessions.slice(0,bi);for(let h of i.sessions)if(h.messages.length>D)h.messages.splice(0,h.messages.length-D)}function Dp(i){return U(i)&&typeof i.id==="string"&&Array.isArray(i.messages)}function Vp(i){return{...i,messages:d(i.messages)}}function d(i){return Array.isArray(i)?i.filter(jp).map(Gp):[]}function Gp(i){if(!Array.isArray(i.toolCalls)){let{toolCalls:b,...p}=i;return p}return{...i,toolCalls:i.toolCalls.filter(qp)}}function qp(i){if(!U(i)||typeof i.id!=="string"||typeof i.name!=="string")return!1;return typeof i.text==="string"&&Jp(i.status)}function Jp(i){return i==="running"||i==="ok"||i==="err"}function jp(i){if(!U(i)||typeof i.id!=="string"||typeof i.text!=="string")return!1;return typeof i.createdAt==="number"&&up(i.role)}function up(i){return i==="user"||i==="assistant"||i==="tool"||i==="system"}function U(i){return typeof i==="object"&&i!==null}function Q(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`}function Di(i){return i instanceof Error?i.message:String(i)}export{qi as renderMessages,ui as promptFromAgUiLikeRunInput,e as pluginStyleText,v as pluginClass,xp as mergeCommands,u as getActiveWorkspaceId,Wp as extractRefs,Wi as default,n as createComposerSurface,a as createChatSurface,Gi as createChatDom,Pp as createChannels,ji as createAgUiLikeRunInput,ii as commandName,Yi as chatEventsToAgUiLikeEvents,k as backendCall};
