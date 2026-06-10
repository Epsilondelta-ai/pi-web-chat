var B={attachFile:["M16.5 6v11.5a4 4 0 0 1-8 0V5a2.5 2.5 0 0 1 5 0v10.5a1 1 0 0 1-2 0V6H10v9.5","a2.5 2.5 0 0 0 5 0V5a4 4 0 0 0-8 0v12.5a5.5 5.5 0 0 0 11 0V6h-1.5Z"].join(""),stop:"M6 6h12v12H6V6Z",send:"M2 21 23 12 2 3v7l15 2-15 2v7Z",terminal:"M3 4h18v16H3V4Zm2 2v12h14V6H5Zm2 3 1.1-1.1L12.2 12l-4.1 4.1L7 15l3-3-3-3Zm6 6h5v1.5h-5V15Z",file:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 2.5L17.5 8H14V4.5ZM8 13h8v1.5H8V13Zm0 3h8v1.5H8V16Z"},v={attachFile:Z("attach_file",B.attachFile),stop:Z("stop",B.stop),send:Z("send",B.send)};function Z(i,p){return`<svg class="material-icon" data-material-icon="${i}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="${p}"></path></svg>`}function K(){return"pi-web-chat-mounted"}function o(){let i=document.createElement("main");return i.className="main pi-web-chat-surface",i.dataset.main="session",i.innerHTML='<div class="term"><div class="term-inner" role="log" aria-live="polite" aria-relevant="additions text"></div></div><button type="button" class="scroll-bottom-btn" data-action="scroll-bottom" aria-label="stick to bottom" title="stick to bottom" aria-pressed="true" hidden>↓</button>',i}function t(){let i=document.createElement("section");return i.className="prompt-region pi-web-chat-composer",i.innerHTML=`
    <div class="slash-pop" hidden><div class="slash-head">slash commands · type to filter</div><div class="slash-list"></div></div>
    <div class="prompt-bar">
      <button class="attach-btn" type="button" aria-label="attach files" title="attach files">${v.attachFile}</button>
      <input type="file" multiple hidden data-file-input />
      <div class="prompt-input-col"><div class="attach-chips" hidden></div><textarea class="prompt-textarea" aria-label="Prompt" placeholder="ask pi to do something…" rows="1"></textarea></div>
      <div class="prompt-actions">
        <button class="stop-btn" type="button" aria-label="stop" title="stop" hidden>${v.stop}</button>
        <button class="mic-btn" type="button" data-action="toggle-speech-input" aria-label="start voice input" title="voice input" hidden>\uD83C\uDF99</button>
        <button class="send-btn" type="button" aria-label="send" title="send" aria-disabled="true">${v.send}</button>
      </div>
      <div class="drop-overlay" hidden><span>drop to attach</span></div>
    </div>
    <div class="prompt-meta" data-prompt-meta>— | <span class="prompt-meta-item prompt-meta-branch"><span>—</span></span></div>`,i}function e(i){let p=document.createElement("span");return p.className="prompt-meta-item pi-web-chat-badge",p.textContent="chat plugin",i.querySelector("[data-prompt-meta]")?.append(p),p}function gi(){let i=document.createElement("section");return i.className="pi-web-chat-root",i.dataset.plugin="pi-web-chat",i.innerHTML=`
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
    </section>`,{root:i,transcript:_(i.querySelector("[data-chat-transcript]")),textarea:_(i.querySelector("[data-chat-input]")),sendButton:_(i.querySelector("[data-send]")),attachButton:_(i.querySelector("[data-attach]")),fileInput:_(i.querySelector("[data-file-input]")),slashPopover:_(i.querySelector("[data-slash-popover]")),slashList:_(i.querySelector("[data-slash-list]")),refsPopover:_(i.querySelector("[data-refs-popover]")),refsList:_(i.querySelector("[data-refs-list]")),attachments:_(i.querySelector("[data-attachments]"))}}function Xi(i,p){i.replaceChildren(...p.map(Yi)),i.scrollTop=i.scrollHeight}function Yi(i){let p=document.createElement("article");p.className=`pi-web-chat-message pi-web-chat-message-${i.role}`,p.dataset.messageId=i.id;let b=document.createElement("div");b.className="pi-web-chat-message-role",b.textContent=i.role;let h=document.createElement("pre");if(h.className="pi-web-chat-message-body",h.textContent=i.text,p.append(b,h),i.thinking){let f=document.createElement("details");f.className="pi-web-chat-thinking",f.open=Boolean(i.streaming);let l=document.createElement("summary");l.textContent="thinking";let w=document.createElement("pre");w.textContent=i.thinking,f.append(l,w),p.append(f)}if(i.toolCalls?.length){let f=document.createElement("div");f.className="pi-web-chat-tools";for(let l of i.toolCalls){let w=document.createElement("details");w.className=`pi-web-chat-tool pi-web-chat-tool-${l.status}`,w.open=l.status==="running";let r=document.createElement("summary");r.textContent=`${l.name} · ${l.status}`;let L=document.createElement("pre");L.textContent=l.text||JSON.stringify(l.args||{},null,2),w.append(r,L),f.append(w)}p.append(f)}if(i.streaming){let f=document.createElement("div");f.className="pi-web-chat-message-meta",f.textContent="streaming...",p.append(f)}if(i.attachments?.length){let f=document.createElement("div");f.className="pi-web-chat-message-meta",f.textContent=`${i.attachments.length} attachment(s)`,p.append(f)}return p}function s(i,p){i.hidden=p.length===0,i.replaceChildren(...p.map((b)=>{let h=document.createElement("span");return h.className="pi-web-chat-attachment-chip",h.textContent=b,h}))}function ii(){return`
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

    .pi-web-chat-surface .scroll-bottom-btn {
      position: absolute;
      right: var(--space-4, 16px);
      bottom: var(--space-4, 16px);
      z-index: 4;
      align-items: center;
      justify-content: center;
      width: 34px;
      height: 34px;
      border: 1px solid var(--border, #24313a);
      border-radius: 999px;
      background: var(--bg-2, #111111);
      color: var(--fg-1, #d4d4d4);
      cursor: pointer;
      display: inline-flex;
      font: inherit;
      font-size: 18px;
      line-height: 1;
      opacity: .85;
      box-shadow: 0 8px 24px rgba(0,0,0,.28);
    }

    .pi-web-chat-surface .scroll-bottom-btn[hidden] {
      display: none;
    }

    .pi-web-chat-surface .scroll-bottom-btn:hover,
    .pi-web-chat-surface .scroll-bottom-btn:focus-visible {
      border-color: var(--accent, #00ff88);
      color: var(--accent, #00ff88);
      opacity: 1;
    }

    .pi-web-chat-surface .scroll-bottom-btn[data-pinned="true"] {
      background: var(--accent, #00ff88);
      border-color: var(--accent, #00ff88);
      color: #021;
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
  `}function bi(){document.getElementById("pi-web-chat-style")?.remove();let i=document.createElement("style");return i.id="pi-web-chat-style",i.textContent=ii(),document.head.append(i),i}function pi(i){return i.command||i.cmd||(i.name?`/${i.name}`:"")}function _(i){if(!i)throw Error("pi-web-chat DOM template is invalid");return i}function Qi(i,p,b){return{threadId:i,runId:p,state:{},messages:b,tools:[],context:[]}}function ui(i){let p=[...i.messages].reverse().find((b)=>b.role==="user");return{text:p?.text||"",attachments:p?.attachments||[],sessionId:i.threadId}}function vi(i,p,b){return i.map((h)=>Ki(h,p,b))}function Ki(i,p,b){if(i.type==="text.delta")return{type:"TEXT_MESSAGE_CONTENT",threadId:p,runId:b,delta:i.delta||""};if(i.type==="thinking.delta")return{type:"THINKING_MESSAGE_CONTENT",threadId:p,runId:b,delta:i.delta||""};if(i.type==="tool.start")return{type:"TOOL_CALL_START",threadId:p,runId:b,toolCallId:i.toolCallId,payload:hi(i)};if(i.type==="tool.delta")return{type:"TOOL_CALL_ARGS",threadId:p,runId:b,toolCallId:i.toolCallId,delta:i.delta||""};if(i.type==="tool.end")return{type:"TOOL_CALL_END",threadId:p,runId:b,toolCallId:i.toolCallId,payload:hi(i)};return{type:i.type.toUpperCase().replaceAll(".","_"),threadId:p,runId:b,payload:i}}function hi(i){return{name:i.toolName||"tool",args:i.args||{},result:i.result||"",isError:i.isError===!0}}var W="pi-web-chat.sessions.v1";var Oi="plugin.pi-web-sidebar.selectedSession",Ei="plugin.pi-web-sidebar.event",_i="plugin.pi-web-sidebar.activeSessionId",g="plugin.pi-web-sidebar.activeWorkspaceId";var fi=20,D=200,Pi=8,xi=1e6;var Wi=250,z=new Set,ki={"book-open":'<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',"file-plus":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="M9 15h6"/>',pencil:'<path d="M21.2 6.8 17.2 2.8a2 2 0 0 0-2.8 0L3 14.2V21h6.8L21.2 9.6a2 2 0 0 0 0-2.8z"/><path d="m14 5 5 5"/>',terminal:'<path d="m4 17 6-6-6-6"/><path d="M12 19h8"/>',cpu:'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 15h3"/><path d="M1 9h3"/><path d="M1 15h3"/>',globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 0 20"/><path d="M12 2a15.3 15.3 0 0 0 0 20"/>',search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',braces:'<path d="M8 3H7a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-4a2 2 0 0 1 2-2 2 2 0 0 1-2-2V7a2 2 0 0 0-2-2h-1"/>',"file-text":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',"circle-question-mark":'<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 1 1 5.8 1c-.5 1-1.4 1.5-2.1 2-.6.4-.8.8-.8 2"/><path d="M12 17h.01"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',plug:'<path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a6 6 0 0 1-12 0V8Z"/>',"git-branch":'<line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',"circle-check":'<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',hammer:'<path d="m15 12-8.5 8.5a2.1 2.1 0 0 1-3-3L12 9"/><path d="m17.6 5.4 1.8-1.8"/><path d="m14 7 3 3"/><path d="M5 11 2 8l6-6 3 3"/>',package:'<path d="m7.5 4.3 9 5.2"/><path d="M21 8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>'},k=new WeakMap,Si={read:"book-open",write:"file-plus",edit:"pencil",ctx_execute:"cpu",ctx_batch_execute:"cpu",ctx_execute_file:"cpu",ctx_search:"cpu",ctx_index:"cpu",ctx_fetch_and_index:"cpu",web_search:"globe",fetch_content:"search",get_search_content:"search",code_search:"braces",document_parse:"file-text",ask_user_question:"circle-question-mark",teams:"users",subagent:"users",mcp:"plug",git:"git-branch"};class yi{#i=[];add(i){if(i)this.#i.push(i);return i}listen(i,p,b){i.addEventListener(p,b),this.add({remove:()=>i.removeEventListener(p,b)})}dispose(){for(let i of this.#i.splice(0).reverse())if(typeof i==="function")i();else if("unsubscribe"in i)i.unsubscribe();else i.remove()}}function Ii(i={}){let p=i.app;if(p?.piWebChat?.dispose(),typeof i.mount?.chat!=="function"||typeof i.mount?.composer!=="function")throw Error("pi-web-chat requires modern pi-web mount.chat and mount.composer APIs");return di(i,p)}function di(i,p){let b=new yi,h=b.add(bi()),f=o(),l=t(),w=i.mount?.chat(f,{replace:!0}),r=i.mount?.composer(l,{replace:!0});if(Hb(b,f),w)b.add(w);if(r)b.add(r);let L=Y(i);F(i,L||void 0);let T=gb(L?.sessionId||""),c={backendChatToken:0};$(f,Q(T).messages,T.activeSessionId),d(i,f,T,c,L?.sessionId||T.activeSessionId),Ob(b,i,f,T,c),mi(b,i,l,f,T,c);let C=p?b.add(e(p)):void 0;p?.classList.add(K());let E=()=>{if(c.runEventsAbort?.abort(),c.sessionEventsAbort?.abort(),b.dispose(),z.clear(),C?.remove(),h.remove(),p?.classList.remove(K()),p?.piWebChat===A)delete p.piWebChat},A={dispose:E};if(p)p.piWebChat=A;return E}function mi(i,p,b,h,f,l){let w=b.querySelector(".prompt-textarea"),r=b.querySelector(".send-btn"),L=b.querySelector(".attach-btn"),T=b.querySelector("[data-file-input]"),c=b.querySelector(".attach-chips");if(!w||!r)return;let C=[],E=()=>{let O=w.value;r.setAttribute("aria-disabled",O.trim()?"false":"true")},A=()=>{if(!c)return;s(c,C.map((O)=>{return O.name||"attachment"}))},N=async(O)=>{O?.preventDefault(),O?.stopImmediatePropagation();let y=w.value.trim();if(E(),!y)return;let a=[...C];r.disabled=!0;try{if(pb(y,a),await ti(p,h,f,l,y,a),C=[],A(),w.value.trim()===y)w.value="";if(T)T.value=""}catch(ji){$(h,[ni(ji)],f.activeSessionId)}finally{r.disabled=!1,E()}};if(i.listen(w,"input",E),i.listen(w,"keydown",(O)=>{let y=O;if(y.key==="Enter"&&(y.metaKey||y.ctrlKey))N(y)}),i.listen(r,"click",(O)=>{N(O)}),L&&T)i.listen(L,"click",()=>T.click()),i.listen(T,"change",()=>{ai(T,(O)=>{C=O,A()})})}function ni(i){return{id:u(),role:"system",text:`prompt failed: ${Ji(i)}`,createdAt:Date.now()}}async function ai(i,p){let b=Array.from(i.files||[]).slice(0,Pi),h=[];for(let f of b){if(f.size>xi)continue;h.push({name:f.name,size:f.size,content:await f.text(),mimeType:f.type||void 0})}p(h)}function mb(i){return{input$:i.behaviorSubject("chat.input",""),submitted$:i.subject("chat.input.submitted"),activeSessionId$:i.behaviorSubject("session.activeId",null),sidebarSelectedSession$:i.behaviorSubject(Oi,oi()),toastRequested$:i.subject("toast.requested")}}function nb(i){let p=[],b=new Set,h=/(^|[\s`])@([^\s@`]+)/g,f=h.exec(String(i||""));while(f!==null){let l=f[2]||"";if((f[1]||"")!=="`"&&l&&!b.has(l))b.add(l),p.push(l);f=h.exec(String(i||""))}return p}function ab(i=[],p=[]){let b=[],h=new Set;for(let f of[...i,...p]){let l=pi(f);if(!l||h.has(l))continue;h.add(l),b.push(f)}return b}function X(i){return i.app?.piWebSidebar?.getSnapshot?.().activeWorkspaceId||i.app?.dataset.activeWorkspaceId||""}function oi(){return Y({})}function Y(i){let p=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),b=p?.activeSessionId||"",h=p?.activeWorkspaceId||"";if(b)return{sessionId:b,workspaceId:h||void 0};let f=j(_i),l=j(g);return f?{sessionId:f,workspaceId:l||void 0}:null}function F(i,p){if(p?.workspaceId&&i.app)i.app.dataset.activeWorkspaceId=p.workspaceId,li(g,p.workspaceId);if(p?.sessionId)i.app?.setAttribute("data-active-session-id",p.sessionId),li(_i,p.sessionId)}function V(i,p,b={}){let h=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),f={type:p,detail:b,snapshot:h};(i.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$)?.next(f),globalThis.piWeb?.subject(Ei).next(f)}function S(i,p,b){let h=i.app?.dataset.activeWorkspaceId||X(i),f={reason:b,sessionId:p,workspaceId:h};globalThis.piWeb?.behaviorSubject("session.activeId",p).next(p),globalThis.piWeb?.subject("session.changed").next({sessionId:p,workspaceId:h,reason:b}),V(i,"active.start",f),V(i,"session.created",f)}function li(i,p){try{localStorage.setItem(i,p)}catch{}}async function I(i,p,b={},h=X(i)){if(!i.backend)return{};let f=await i.backend(p,{workspaceId:h,data:b});return U(f)?f:{}}async function ti(i,p,b,h,f,l){let w=Eb(i,b),r=H(i);h.backendChatToken+=1,h.runEventsAbort?.abort();let L=new AbortController;h.runEventsAbort=L,h.sessionEventsAbort?.abort();let T={id:u(),role:"user",text:f,attachments:qi(l),createdAt:Date.now()},c=M(b,w);c.messages.push(T),c.updatedAt=Date.now(),R(b),$(p,c.messages,w);let C=await hb(i,f,l,w,r.path,r.id);if(typeof C.activeSessionId==="string"&&C.activeSessionId){let N=w,O=b.activeSessionId===N;if(w=C.activeSessionId,O)G(b,w),F(i,{sessionId:C.activeSessionId,workspaceId:r.id||void 0}),V(i,"chat-session",{reason:"startPrompt",sessionId:C.activeSessionId}),S(i,C.activeSessionId,"startPrompt");else M(b,w);jb(b,N,w,T.id)}if(typeof C.runId!=="string"||!C.runId){let N=await lb(i,f,l,w,r.path,r.id),O=Cb(i,b,N,"submitPrompt",w);if(b.activeSessionId===w)$(p,O,w);if(h.runEventsAbort===L)h.runEventsAbort=void 0;return}let E=M(b,w),A=wb(E);try{await ei(i,b,E,C.runId,r.path,r.id,A,()=>{if(b.activeSessionId===w)$(p,E.messages,w)},L.signal)}finally{if(h.runEventsAbort===L)h.runEventsAbort=void 0}if(b.activeSessionId===w)d(i,p,b,h,w,r.path,r.id)}async function ei(i,p,b,h,f,l,w,r,L){let T=await Ri(i,"streamEventsSse",{runId:h,cursor:0,workspacePath:f},L,l);if(!T)throw Error("SSE streaming backend did not return a stream");let c=Hi(r);w.streaming=!0,c.flush();try{await $i(T,(C)=>{rb(w,[C]),w.streaming=C.type!=="run.end",b.updatedAt=Date.now(),R(p),c.request()})}finally{w.streaming=!1,R(p),c.flush()}}function Hi(i){let p=0,b,h=()=>{if(b)clearTimeout(b),b=void 0},f=()=>{h(),p=Date.now(),i()};return{request:()=>{let w=Wi-(Date.now()-p);if(w<=0){f();return}b||=setTimeout(f,w)},flush:f,cancel:h}}async function Ri(i,p,b={},h,f=X(i)){if(!i.backendStream)throw Error("SSE streaming backend is unavailable");let l=await i.backendStream(p,{workspaceId:f,data:b},{signal:h});return si(l)}function si(i){if(typeof ReadableStream<"u"&&i instanceof ReadableStream)return i;if(typeof Response<"u"&&i instanceof Response)return i.body;if(typeof i==="string")return wi(i);if(!U(i))return null;let p=i.body;if(typeof ReadableStream<"u"&&p instanceof ReadableStream)return p;let b=i.sse;if(typeof b==="string")return wi(b);return null}function wi(i){let p=new TextEncoder().encode(i);return new ReadableStream({start(b){b.enqueue(p),b.close()}})}async function $i(i,p){let b=i.getReader(),h=new TextDecoder,f="";while(!0){let l=await b.read();if(l.done){f+=h.decode(),bb(f,p);return}f+=h.decode(l.value,{stream:!0});let w=ib(f);f=w.remainder;for(let r of w.frames)Ai(r,p)}}function ib(i){let b=i.replaceAll(`\r
`,`
`).replaceAll("\r",`
`).split(`

`),h=b.pop()||"";return{frames:b,remainder:h}}function bb(i,p){let b=i.trim();if(b)Ai(b,p)}function Ai(i,p){let b=i.split(`
`).filter((h)=>h.startsWith("data:")).map((h)=>h.slice(5).trimStart()).join(`
`);if(!b)return;try{let h=JSON.parse(b);if(Lb(h))p(h)}catch{}}function pb(i,p){globalThis.piWeb?.subject("chat.input.submitted").next({text:i,attachments:qi(p)||[]})}async function hb(i,p,b,h,f=H(i).path,l=H(i).id){try{return await I(i,"startPrompt",Ni(p,b,h,f),l)}catch(w){if(fb(w))return{};throw w}}function fb(i){return/unknown method: (startPrompt|streamEventsSse)|unsupported method: (startPrompt|streamEventsSse)|(startPrompt|streamEventsSse) unsupported/i.test(Ji(i))}async function lb(i,p,b,h="",f=H(i).path,l=H(i).id){return await I(i,"submitPrompt",Ni(p,b,h,f),l)}function Ni(i,p,b,h){let f={text:i,attachments:p,sessionId:b};if(h)f.workspacePath=h;return f}function wb(i){let p=[...i.messages].reverse().find((h)=>h.role==="assistant"&&h.streaming);if(p)return p;let b={id:u(),role:"assistant",text:"",createdAt:Date.now(),streaming:!0};return i.messages.push(b),b}function rb(i,p){for(let b of p)if(b.type==="text.delta"&&typeof b.delta==="string")i.text+=b.delta;else if(b.type==="thinking.delta"&&typeof b.delta==="string")i.thinking=`${i.thinking||""}${b.delta}`;else if(b.type==="tool.start")P(i,b,"running");else if(b.type==="tool.delta"&&typeof b.delta==="string"){let h=P(i,b,"running");h.text=b.delta}else if(b.type==="tool.end"){let h=P(i,b,b.isError?"err":"ok");if(typeof b.result==="string"&&b.result)h.text=b.result}else if(b.type==="error"&&typeof b.message==="string")i.text+=`${i.text?`
`:""}${b.message}`}function P(i,p,b){let h=p.toolCallId||p.toolName||"tool";i.toolCalls||=[];let f=i.toolCalls.find((l)=>l.id===h);if(!f)f={id:h,name:p.toolName||"tool",args:p.args,text:"",status:b},i.toolCalls.push(f);if(f.status=b,p.args)f.args=p.args;return f}function Lb(i){return U(i)&&typeof i.type==="string"}async function d(i,p,b,h,f="",l=m(i),w=H(i).id){if(!i.backendStream){await ri(i,p,b,h,f,l);return}let r=++h.backendChatToken;h.sessionEventsAbort?.abort();let L=new AbortController;h.sessionEventsAbort=L;let T=Hi(()=>{$(p,Q(b).messages,b.activeSessionId)});try{let c=await Ri(i,"sessionEventsSse",Mi(i,f,l),L.signal,w);if(!c)throw Error("session SSE backend did not return a stream");await $i(c,(C)=>{if(r!==h.backendChatToken||C.type!=="chat.state")return;if(zi(i,b,Tb(C),"chatState").length)T.request()})}catch(c){if(!L.signal.aborted)await ri(i,p,b,h,f,l)}finally{if(T.cancel(),h.sessionEventsAbort===L)h.sessionEventsAbort=void 0}}async function ri(i,p,b,h,f="",l=m(i)){let w=++h.backendChatToken;try{let r=await I(i,"chatState",Mi(i,f,l));if(w!==h.backendChatToken)return;let L=zi(i,b,r,"chatState");if(L.length)$(p,L,b.activeSessionId)}catch{}}function Mi(i,p,b=m(i)){let h=p?{sessionId:p}:{};if(b)h.workspacePath=b;return h}function Tb(i){return{activeSessionId:i.activeSessionId,messages:i.messages,isStreaming:i.isStreaming}}function m(i){return H(i).path}function H(i){let p=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),b=p?.activeWorkspaceId||i.app?.dataset.activeWorkspaceId||"",h=p?.workspaces?.find((f)=>f.id===b)?.path||"";return{id:b,path:h}}function cb(i,p){let b=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),h=p.workspaceId||b?.activeWorkspaceId||i.app?.dataset.activeWorkspaceId||"",f=b?.workspaces?.find((l)=>l.id===h)?.path||"";if(f||h!==b?.activeWorkspaceId)return{id:h,path:f};return H(i)}function zi(i,p,b,h){let f=n(b.messages);if(typeof b.activeSessionId==="string"&&b.activeSessionId){let r=p.activeSessionId;if(G(p,b.activeSessionId),F(i,{sessionId:b.activeSessionId,workspaceId:i.app?.dataset.activeWorkspaceId||X(i)||void 0}),h!=="chatState"||r!==b.activeSessionId)V(i,"chat-session",{reason:h,sessionId:b.activeSessionId});if(h!=="chatState")S(i,b.activeSessionId,h)}let l=Q(p);if(!f.length)return[];let w=Gi(l.messages,f).slice(-D);if(!Fi(l.messages,w))return[];if(l.messages=w,l.title==="New chat"){let r=l.messages.find((L)=>L.role==="user");if(r)l.title=r.text.slice(0,48)||l.title}return l.updatedAt=Date.now(),R(p),l.messages}function Fi(i,p){if(i.length!==p.length)return!0;return i.some((b,h)=>Li(b)!==Li(p[h]))}function Li(i){return JSON.stringify({id:i.id,role:i.role,text:i.text,thinking:i.thinking,streaming:i.streaming,toolCalls:i.toolCalls,attachments:i.attachments})}function Cb(i,p,b,h,f){let l=n(b.messages),w=typeof b.activeSessionId==="string"&&b.activeSessionId?b.activeSessionId:f,r=p.activeSessionId===f;if(w!==f)if(r)G(p,w),F(i,{sessionId:w,workspaceId:H(i).id||void 0}),V(i,"chat-session",{reason:h,sessionId:w}),S(i,w,h);else M(p,w);let L=M(p,w);if(!l.length)return[];let T=Gi(L.messages,l).slice(-D);if(!Fi(L.messages,T))return[];return L.messages=T,L.updatedAt=Date.now(),R(p),L.messages}function Ob(i,p,b,h,f){let l=(T)=>{if(!T?.sessionId)return;if(Ui(p,h,T))return;F(p,T),G(h,T.sessionId),$(b,Q(h).messages,h.activeSessionId);let c=cb(p,T);d(p,b,h,f,T.sessionId,c.path,c.id)},w=(T)=>{let c=_b(p,T);if(c)l(c)},r=p.app?.piWebSidebar?.channels?.selectedSession$||globalThis.piWebSidebar?.channels?.selectedSession$,L=p.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$;if(r)i.add(r.subscribe(l));if(L)i.add(L.subscribe(w));if(p.app)i.listen(p.app,"pi-web-sidebar:session-created",(T)=>{let c=T.detail||{},C=typeof c.sessionId==="string"?c.sessionId:"",E=typeof c.workspaceId==="string"?c.workspaceId:"";if(C)l({sessionId:C,workspaceId:E||void 0})});if(globalThis.piWeb)i.add(globalThis.piWeb.behaviorSubject(Oi,Y(p)).subscribe(l)),i.add(globalThis.piWeb.subject(Ei).subscribe(w)),i.add(globalThis.piWeb.behaviorSubject("session.activeId",null).subscribe((T)=>{if(!T)return;l({sessionId:T,workspaceId:p.app?.dataset.activeWorkspaceId||j(g)||void 0})}))}function Eb(i,p){let b=Y(i);if(b?.sessionId&&!Ui(i,p,b))F(i,b),G(p,b.sessionId);return p.activeSessionId}function Ui(i,p,b){let h=b.workspaceId||"",f=i.app?.dataset.activeWorkspaceId||j(g)||"";return p.activeSessionId===b.sessionId&&(!h||h===f)}function _b(i,p){if(!yb(p.type))return null;let b=p.detail||{},h=typeof b.sessionId==="string"?b.sessionId:p.snapshot?.activeSessionId||"",f=typeof b.workspaceId==="string"?b.workspaceId:p.snapshot?.activeWorkspaceId||i.app?.dataset.activeWorkspaceId||"";if(!h)return null;return{sessionId:h,workspaceId:f||void 0}}function yb(i){return i==="session.selected"||i==="session.created"||i==="new-session"||i==="active.start"}function G(i,p){let b=i.sessions.find((h)=>h.id===p);if(!b)b=J(p),i.sessions.unshift(b);return i.activeSessionId=b.id,R(i),b}function $(i,p,b){Mb(p,b),(i.querySelector(".term-inner")||i).replaceChildren(...p.map((f)=>$b(f,b))),Rb(i)}function Hb(i,p){let b=p.querySelector(".term"),h=p.querySelector("[data-action='scroll-bottom']");if(!b||!h)return;let f={term:b,button:h,pinned:!0,touchStartY:null};k.set(p,f),h.hidden=!1,q(f),i.listen(h,"click",()=>{f.pinned=!0,Bi(f),q(f)}),i.listen(b,"wheel",(l)=>{if(l.deltaY<0)Ti(f)}),i.listen(b,"touchstart",(l)=>{let w=l;f.touchStartY=w.touches.item(0)?.clientY??null}),i.listen(b,"touchmove",(l)=>{let r=l.touches.item(0)?.clientY;if(typeof r==="number"&&f.touchStartY!==null&&r-f.touchStartY>8)Ti(f)}),i.listen(b,"touchend",()=>{f.touchStartY=null}),i.add({remove:()=>{k.delete(p)}})}function Rb(i){let p=k.get(i);if(!p)return;if(p.pinned)Bi(p);q(p)}function Bi(i){i.term.scrollTop=i.term.scrollHeight}function Ti(i){i.pinned=!1,q(i)}function q(i){i.button.dataset.pinned=i.pinned?"true":"false",i.button.setAttribute("aria-pressed",i.pinned?"true":"false")}function $b(i,p){let b=document.createElement("article");b.className="transcript-item",b.dataset.messageId=i.id;let h=document.createElement("div");h.className="msg",h.dataset.kind=x(i.role);let f=document.createElement("span");f.className=`prefix ${x(i.role)}`,f.textContent=Jb(i.role);let l=document.createElement("pre");if(l.className=`body ${x(i.role)}`,l.textContent=i.text,h.append(f,l),Ab(i))b.append(h);if(i.thinking)b.append(Nb(i.thinking,Boolean(i.streaming)));for(let w of i.toolCalls||[])b.append(zb(w,Zi(p,i,w)));if(i.streaming)b.dataset.streaming="true";return b}function Ab(i){let p=i.text.trim().length>0;return i.role!=="assistant"||p}function Nb(i,p){let b=document.createElement("details");b.className="msg-detail think thinking-block",b.open=p;let h=document.createElement("summary");h.className="label",h.textContent="THINKING";let f=document.createElement("pre");return f.className="body",f.textContent=i,b.append(h,f),b}function Mb(i,p){let b=new Set;for(let h of i)for(let f of h.toolCalls||[])b.add(Zi(p,h,f));for(let h of z)if(!b.has(h))z.delete(h)}function Zi(i,p,b){return`${i}:${p.id}:${b.id}`}function zb(i,p){let b=document.createElement("div");b.className="tool-card",b.dataset.tool=i.name||"tool",b.dataset.status=i.status;let h=!z.has(p);b.dataset.collapsed=h?"true":"false";let f=document.createElement("button");if(f.type="button",f.className="tc-head",f.title=h?"Show tool output":"Hide tool output",f.setAttribute("aria-expanded",h?"false":"true"),f.setAttribute("aria-label",`${h?"Show":"Hide"} ${i.name||"tool"} output`),f.append(Ub(i),Bb(i),Zb(i),Db(i,h)),!h)b.append(Di(i));return f.addEventListener("click",()=>Fb(b,f,i,p)),b.prepend(f),b}function Di(i){let p=document.createElement("pre");return p.className="tc-body",p.textContent=i.text||JSON.stringify(i.args||{},null,2),p}function Fb(i,p,b,h){let f=i.querySelector(".tc-body"),l=f!==null;if(f)f.remove(),z.delete(h);else i.append(Di(b)),z.add(h);i.dataset.collapsed=l?"true":"false",p.setAttribute("aria-expanded",l?"false":"true"),p.setAttribute("aria-label",`${l?"Show":"Hide"} ${i.dataset.tool||"tool"} output`),p.title=l?"Show tool output":"Hide tool output";let w=p.querySelector(".tc-toggle-label");if(w)w.textContent=l?"show":"hide"}function Ub(i){let p=document.createElement("span");p.className="tc-glyph";let b=Vb(i),h=b?ki[b]:"";if(!b||!h)return p.textContent="●",p;return p.innerHTML=`<svg class="tc-icon" data-tool-icon="${b}" aria-hidden="true" viewBox="0 0 24 24">${h}</svg>`,p}function Bb(i){let p=document.createElement("span");return p.className="tc-name",p.textContent=i.name||"tool",p}function Zb(i){let p=document.createElement("span");return p.className="tc-args",p.textContent=Vi(i),p}function Db(i,p){let b=document.createElement("span");if(b.className="tc-meta",i.status==="running"){let l=document.createElement("span");l.className="spinner",l.textContent="⠇";let w=document.createElement("span");return w.className="running",w.textContent="running",b.append(l,w,ci(p)),b}let h=document.createElement("span");h.className=i.status==="err"?"err":"ok",h.textContent=i.status==="err"?"✗":"✓";let f=document.createElement("span");return f.textContent=i.status==="err"?" · failed":" · done",b.append(h,f,ci(p)),b}function ci(i){let p=document.createElement("span");p.className="tc-toggle";let b=document.createElement("span");b.className="tc-toggle-label",b.textContent=i?"show":"hide";let h=document.createElement("span");return h.className="tc-caret",h.textContent="▸",p.append(b,h),p}function Vi(i){if(!i.args)return"";return JSON.stringify(i.args)}function Vb(i){let p=Gb(i.name);if(["bash","shell","sh","zsh","terminal"].includes(p))return qb(Vi(i).toLowerCase())||"terminal";return Si[p]}function Gb(i){return i.trim().replace(/^functions\./,"").replace(/^multi_tool_use\./,"")}function qb(i){if(/\bgit\b|\bgh\b/.test(i))return"git-branch";if(/\b(go test|bun test|npm test|pnpm test|yarn test|vitest|pytest|cargo test)\b/.test(i))return"circle-check";if(/\b(bun|npm|pnpm|yarn)\s+(run\s+)?build\b|\b(go build|cargo build)\b/.test(i))return"hammer";if(/\b(bun|npm|pnpm|yarn)\s+(add|install|i)\b|\bpip\s+install\b|\bgo\s+get\b/.test(i))return"package";return}function Jb(i){if(i==="assistant")return"pi >";if(i==="user")return"you >";if(i==="system")return"sys >";return"tool >"}function x(i){if(i==="assistant")return"pi";if(i==="system")return"sys";return i}function Gi(i,p){let b=new Map;for(let h of i)b.set(h.id,h);for(let h of p)b.set(h.id,{...b.get(h.id),...h});return[...b.values()].sort((h,f)=>h.createdAt-f.createdAt)}function Q(i){return M(i,i.activeSessionId,!0)}function M(i,p,b=!1){let h=i.sessions.find((f)=>f.id===p);if(!h)h=J(p||void 0),i.sessions.unshift(h),R(i);if(b||!i.activeSessionId)i.activeSessionId=h.id,R(i);return h}function jb(i,p,b,h){if(p===b)return;let f=i.sessions.find((L)=>L.id===p),l=f?.messages.findIndex((L)=>L.id===h)??-1;if(!f||l<0)return;let[w]=f.messages.splice(l,1),r=M(i,b);if(!r.messages.some((L)=>L.id===w.id))r.messages.push(w);f.updatedAt=Date.now(),r.updatedAt=Date.now(),R(i)}function J(i=u()){let p=Date.now();return{id:i,title:"New chat",createdAt:p,updatedAt:p,messages:[]}}function j(i){try{return localStorage.getItem(i)||""}catch{return""}}function gb(i=""){try{let b=JSON.parse(localStorage.getItem(W)||"null");if(b&&typeof b.activeSessionId==="string"&&Array.isArray(b.sessions)){let h=b.sessions.filter(Xb).map(Yb);if(i&&!h.some((f)=>f.id===i))h.unshift(J(i));return{activeSessionId:i||b.activeSessionId,sessions:h}}}catch{}let p=J(i||void 0);return{activeSessionId:p.id,sessions:[p]}}function R(i){Ci(i);try{localStorage.setItem(W,JSON.stringify(i))}catch{for(let p of i.sessions)p.messages=p.messages.slice(-Math.floor(D/2));Ci(i);try{localStorage.setItem(W,JSON.stringify(i))}catch{}}}function qi(i){if(!i?.length)return;return i.map(({content:p,...b})=>b)}function Ci(i){i.sessions.sort((h,f)=>f.updatedAt-h.updatedAt);let p=i.sessions.find((h)=>h.id===i.activeSessionId),b=i.sessions.filter((h)=>h.id!==i.activeSessionId).slice(0,Math.max(0,fi-1));i.sessions=p?[p,...b]:i.sessions.slice(0,fi);for(let h of i.sessions)if(h.messages.length>D)h.messages.splice(0,h.messages.length-D)}function Xb(i){return U(i)&&typeof i.id==="string"&&Array.isArray(i.messages)}function Yb(i){return{...i,messages:n(i.messages)}}function n(i){return Array.isArray(i)?i.filter(Kb).map(Qb):[]}function Qb(i){if(!Array.isArray(i.toolCalls)){let{toolCalls:p,...b}=i;return b}return{...i,toolCalls:i.toolCalls.filter(ub)}}function ub(i){if(!U(i)||typeof i.id!=="string"||typeof i.name!=="string")return!1;return typeof i.text==="string"&&vb(i.status)}function vb(i){return i==="running"||i==="ok"||i==="err"}function Kb(i){if(!U(i)||typeof i.id!=="string"||typeof i.text!=="string")return!1;return typeof i.createdAt==="number"&&Pb(i.role)}function Pb(i){return i==="user"||i==="assistant"||i==="tool"||i==="system"}function U(i){return typeof i==="object"&&i!==null}function u(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`}function Ji(i){return i instanceof Error?i.message:String(i)}export{Xi as renderMessages,ui as promptFromAgUiLikeRunInput,ii as pluginStyleText,K as pluginClass,ab as mergeCommands,X as getActiveWorkspaceId,nb as extractRefs,Ii as default,t as createComposerSurface,o as createChatSurface,gi as createChatDom,mb as createChannels,Qi as createAgUiLikeRunInput,pi as commandName,vi as chatEventsToAgUiLikeEvents,I as backendCall};
