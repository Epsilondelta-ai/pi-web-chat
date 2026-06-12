var X={attachFile:["M16.5 6v11.5a4 4 0 0 1-8 0V5a2.5 2.5 0 0 1 5 0v10.5a1 1 0 0 1-2 0V6H10v9.5","a2.5 2.5 0 0 0 5 0V5a4 4 0 0 0-8 0v12.5a5.5 5.5 0 0 0 11 0V6h-1.5Z"].join(""),stop:"M6 6h12v12H6V6Z",send:"M2 21 23 12 2 3v7l15 2-15 2v7Z",terminal:"M3 4h18v16H3V4Zm2 2v12h14V6H5Zm2 3 1.1-1.1L12.2 12l-4.1 4.1L7 15l3-3-3-3Zm6 6h5v1.5h-5V15Z",file:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 2.5L17.5 8H14V4.5ZM8 13h8v1.5H8V13Zm0 3h8v1.5H8V16Z"},M={attachFile:Y("attach_file",X.attachFile),stop:Y("stop",X.stop),send:Y("send",X.send),terminal:Y("terminal",X.terminal)};function Y(p,b){return`<svg class="material-icon" data-material-icon="${p}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="${b}"></path></svg>`}function a(){return"pi-web-chat-mounted"}function zp(){let p=document.createElement("main");return p.className="main pi-web-chat-surface",p.dataset.main="session",p.innerHTML='<div class="term"><div class="term-inner" role="log" aria-live="polite" aria-relevant="additions text"></div></div><button type="button" class="scroll-bottom-btn" data-action="scroll-bottom" aria-label="stick to bottom" title="stick to bottom" aria-pressed="true" hidden>↓</button>',p}function Cp(){let p=document.createElement("section");return p.className="prompt-region pi-web-chat-composer",p.innerHTML=`
    <div class="slash-pop" hidden><div class="slash-head">slash commands · type to filter</div><div class="slash-list"></div></div>
    <div class="prompt-file-ref-pop" hidden><div class="slash-head">project files · type to filter</div><div class="prompt-file-ref-list"></div></div>
    <div class="prompt-bar">
      <button class="attach-btn" type="button" aria-label="attach files" title="attach files">${M.attachFile}</button>
      <input type="file" multiple hidden data-file-input />
      <div class="prompt-input-col"><div class="attach-chips" hidden></div><div class="shell-attachment-note" aria-live="polite" hidden>queued attachments are hidden during shell mode and will reappear for the next normal prompt</div><textarea class="prompt-textarea" aria-label="Prompt" placeholder="ask pi to do something…" rows="1"></textarea></div>
      <div class="prompt-actions">
        <button class="stop-btn" type="button" aria-label="stop" title="stop" hidden>${M.stop}</button>
        <button class="mic-btn" type="button" data-action="toggle-speech-input" aria-label="start voice input" title="voice input" hidden>\uD83C\uDF99</button>
        <button class="send-btn" type="button" aria-label="send" title="send" aria-disabled="true">${M.send}</button>
      </div>
      <div class="drop-overlay" hidden><span>drop to attach</span></div>
    </div>
    <div class="prompt-meta" data-prompt-meta>— | <span class="prompt-meta-item prompt-meta-branch"><span>—</span></span></div>`,p}function Np(p){let b=document.createElement("span");return b.className="prompt-meta-item pi-web-chat-badge",b.textContent="chat plugin",p.querySelector("[data-prompt-meta]")?.append(b),b}function $b(){let p=document.createElement("section");return p.className="pi-web-chat-root",p.dataset.plugin="pi-web-chat",p.innerHTML=`
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
      <div class="pi-web-chat-shell-note" aria-live="polite">queued attachments are hidden during shell mode and will reappear for the next normal prompt</div>
      <div class="pi-web-chat-prompt-bar">
        <button class="pi-web-chat-icon-btn" type="button" data-attach aria-label="attach files" title="attach files">${Y("attach_file",X.attachFile)}</button>
        <input type="file" multiple hidden data-file-input />
        <textarea class="pi-web-chat-textarea" data-chat-input aria-label="Prompt" placeholder="ask pi to do something…" rows="1"></textarea>
        <button class="pi-web-chat-send" type="button" data-send aria-label="send" title="send" aria-disabled="true">${Y("send",X.send)}</button>
      </div>
    </section>`,{root:p,transcript:G(p.querySelector("[data-chat-transcript]")),textarea:G(p.querySelector("[data-chat-input]")),sendButton:G(p.querySelector("[data-send]")),attachButton:G(p.querySelector("[data-attach]")),fileInput:G(p.querySelector("[data-file-input]")),slashPopover:G(p.querySelector("[data-slash-popover]")),slashList:G(p.querySelector("[data-slash-list]")),refsPopover:G(p.querySelector("[data-refs-popover]")),refsList:G(p.querySelector("[data-refs-list]")),attachments:G(p.querySelector("[data-attachments]"))}}function _b(p,b){p.replaceChildren(...b.map(lb)),p.scrollTop=p.scrollHeight}function lb(p){let b=document.createElement("article");b.className=`pi-web-chat-message pi-web-chat-message-${p.role}`,b.dataset.messageId=p.id;let w=document.createElement("div");w.className="pi-web-chat-message-role",w.textContent=p.role;let f=document.createElement("pre");if(f.className="pi-web-chat-message-body",f.textContent=p.text,b.append(w,f),p.thinking){let h=document.createElement("details");h.className="pi-web-chat-thinking",h.open=Boolean(p.streaming);let i=document.createElement("summary");i.textContent="thinking";let L=document.createElement("pre");L.textContent=p.thinking,h.append(i,L),b.append(h)}if(p.toolCalls?.length){let h=document.createElement("div");h.className="pi-web-chat-tools";for(let i of p.toolCalls){let L=document.createElement("details");L.className=`pi-web-chat-tool pi-web-chat-tool-${i.status}`,L.open=i.status==="running";let T=document.createElement("summary");T.textContent=`${i.name} · ${i.status}`;let O=document.createElement("pre");O.textContent=i.text||n(i),L.append(T,O),h.append(L)}b.append(h)}if(p.streaming){let h=document.createElement("div");h.className="pi-web-chat-message-meta",h.textContent="streaming...",b.append(h)}if(p.attachments?.length){let h=document.createElement("div");h.className="pi-web-chat-message-meta",h.textContent=`${p.attachments.length} attachment(s)`,b.append(h)}return b}function c(p){if(p.argsStatus==="truncated")return"arguments truncated";if(p.argsStatus==="omitted")return"arguments omitted";if(p.argsStatus==="unavailable")return"arguments unavailable";if(p.argsStatus==="empty")return"no arguments";if(!p.args)return"";return JSON.stringify(p.args)}function n(p){if(p.argsStatus==="truncated")return"arguments truncated: too large to display";if(p.argsStatus==="omitted")return"arguments omitted: response too large";if(p.argsStatus==="unavailable")return"arguments unavailable";if(p.argsStatus==="empty")return"no arguments";if(!p.args)return"arguments unavailable";return JSON.stringify(p.args,null,2)}function zb(p,b){p.root.dataset.composerMode=b,o(p.attachButton,b)}function o(p,b){if(p.disabled=b==="shell",p.setAttribute("aria-disabled",b==="shell"?"true":"false"),b==="shell"){p.innerHTML=M.terminal,p.title="shell command mode",p.setAttribute("aria-label","shell command mode");return}if(b==="file-ref"){p.innerHTML=Y("file",X.file),p.title="file reference mode",p.setAttribute("aria-label","file reference mode");return}p.innerHTML=M.attachFile,p.title="attach files",p.setAttribute("aria-label","attach files")}function t(p,b){p.hidden=b.length===0,p.replaceChildren(...b.map((w)=>{let f=document.createElement("span");return f.className="pi-web-chat-attachment-chip",f.textContent=w,f}))}function Zp(){return`
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

    .pi-web-chat-surface .pi-web-chat-docs {
      border: 1px solid var(--border, #24313a);
      border-radius: var(--radius-2, 10px);
      background: var(--bg-2, #111111);
      color: var(--fg-1, #d4d4d4);
      margin: 0 auto;
      max-width: 720px;
      padding: var(--space-4, 16px);
    }

    .pi-web-chat-surface .pi-web-chat-docs h1 {
      color: var(--accent, #00ff88);
      font-size: var(--text-lg, 18px);
      margin: 0 0 var(--space-2, 8px);
    }

    .pi-web-chat-surface .pi-web-chat-docs p {
      color: var(--fg-2, #b9c0c7);
      margin: 0 0 var(--space-3, 12px);
    }

    .pi-web-chat-surface .pi-web-chat-docs ul {
      margin: 0;
      padding-left: 20px;
    }

    .pi-web-chat-surface .pi-web-chat-docs li + li {
      margin-top: 6px;
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

    .pi-web-chat-composer .shell-attachment-note {
      color: var(--fg-3, #8b8b8b);
      font-size: var(--text-xs, 12px);
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

    .pi-web-chat-composer .prompt-bar.shell-mode .prompt-textarea {
      border-color: var(--warning, #facc15);
      background: rgba(250,204,21,.12);
      box-shadow: 0 0 0 2px rgba(250,204,21,.25);
    }

    .pi-web-chat-composer .prompt-bar.shell-mode .attach-btn {
      color: var(--warning, #facc15);
      border-color: var(--warning, #facc15);
      cursor: not-allowed;
      opacity: 1;
      pointer-events: none;
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

    .pi-web-chat-composer .prompt-bar.shell-mode .send-btn {
      background: var(--warning, #facc15);
      color: #2a1500;
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

    .pi-web-chat-composer .slash-pop,
    .pi-web-chat-composer .prompt-file-ref-pop {
      position: absolute;
      left: var(--space-3, 12px);
      right: var(--space-3, 12px);
      bottom: calc(100% - 2px);
      z-index: 8;
      max-height: 240px;
      overflow: auto;
      border: 1px solid var(--border, #24313a);
      border-radius: var(--radius-2, 10px);
      background: var(--bg-2, #111111);
      box-shadow: 0 12px 36px rgba(0,0,0,.35);
    }

    .pi-web-chat-composer .slash-head {
      color: var(--fg-3, #8b8b8b);
      font-size: var(--text-xs, 12px);
      padding: 6px 10px;
      text-transform: uppercase;
    }

    .pi-web-chat-composer .slash-list,
    .pi-web-chat-composer .prompt-file-ref-list {
      display: flex;
      flex-direction: column;
    }

    .pi-web-chat-composer .slash-item,
    .pi-web-chat-composer .prompt-file-ref-item {
      border: 0;
      border-top: 1px solid var(--border-dim, #1f1f1f);
      background: transparent;
      color: var(--fg-1, #d4d4d4);
      cursor: pointer;
      font: inherit;
      padding: 8px 10px;
      text-align: left;
    }

    .pi-web-chat-composer .slash-item:hover,
    .pi-web-chat-composer .slash-item:focus-visible,
    .pi-web-chat-composer .prompt-file-ref-item:hover,
    .pi-web-chat-composer .prompt-file-ref-item:focus-visible {
      background: rgba(255,255,255,.06);
    }

    .pi-web-chat-composer .sl-name,
    .pi-web-chat-composer .pfr-path {
      display: block;
      font-weight: 600;
    }

    .pi-web-chat-composer .sl-desc,
    .pi-web-chat-composer .pfr-kind {
      color: var(--fg-3, #8b8b8b);
      display: block;
      font-size: var(--text-xs, 12px);
      margin-top: 2px;
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

    .pi-web-chat-surface .spinner {
      color: var(--accent, #00ff88);
      display: inline-grid;
      gap: 0;
      grid-template-columns: repeat(2, 0.42ch);
      grid-template-rows: repeat(3, 0.3em);
      height: 0.9em;
      margin-right: 0.35ch;
      transform: translateY(-2px);
      vertical-align: text-bottom;
      width: 0.84ch;
    }

    .pi-web-chat-surface .spinner span {
      align-items: center;
      color: #000;
      display: inline-flex;
      font-size: 0.9em;
      height: 0.3em;
      justify-content: center;
      line-height: 1;
      width: 0.42ch;
    }

    .pi-web-chat-surface .spinner span::before { content: "."; }
    .pi-web-chat-surface .spinner span:nth-child(1) { grid-column: 1; grid-row: 1; }
    .pi-web-chat-surface .spinner span:nth-child(2) { grid-column: 2; grid-row: 1; }
    .pi-web-chat-surface .spinner span:nth-child(3) { grid-column: 2; grid-row: 2; }
    .pi-web-chat-surface .spinner span:nth-child(4) { grid-column: 2; grid-row: 3; }
    .pi-web-chat-surface .spinner span:nth-child(5) { grid-column: 1; grid-row: 3; }
    .pi-web-chat-surface .spinner span:nth-child(6) { grid-column: 1; grid-row: 2; }
    .pi-web-chat-surface .spinner[data-frame="0"] span:nth-child(1),
    .pi-web-chat-surface .spinner[data-frame="1"] span:nth-child(2),
    .pi-web-chat-surface .spinner[data-frame="2"] span:nth-child(3),
    .pi-web-chat-surface .spinner[data-frame="3"] span:nth-child(4),
    .pi-web-chat-surface .spinner[data-frame="4"] span:nth-child(5),
    .pi-web-chat-surface .spinner[data-frame="5"] span:nth-child(6) {
      color: currentColor;
      opacity: 1;
    }

    .pi-web-chat-surface .spinner[data-frame="0"] span:nth-child(6),
    .pi-web-chat-surface .spinner[data-frame="1"] span:nth-child(1),
    .pi-web-chat-surface .spinner[data-frame="2"] span:nth-child(2),
    .pi-web-chat-surface .spinner[data-frame="3"] span:nth-child(3),
    .pi-web-chat-surface .spinner[data-frame="4"] span:nth-child(4),
    .pi-web-chat-surface .spinner[data-frame="5"] span:nth-child(5) {
      color: currentColor;
      opacity: 0.68;
    }

    .pi-web-chat-surface .spinner[data-frame="0"] span:nth-child(5),
    .pi-web-chat-surface .spinner[data-frame="1"] span:nth-child(6),
    .pi-web-chat-surface .spinner[data-frame="2"] span:nth-child(1),
    .pi-web-chat-surface .spinner[data-frame="3"] span:nth-child(2),
    .pi-web-chat-surface .spinner[data-frame="4"] span:nth-child(3),
    .pi-web-chat-surface .spinner[data-frame="5"] span:nth-child(4) {
      color: currentColor;
      opacity: 0.42;
    }

    .pi-web-chat-surface .spinner[data-frame="0"] span:nth-child(4),
    .pi-web-chat-surface .spinner[data-frame="1"] span:nth-child(5),
    .pi-web-chat-surface .spinner[data-frame="2"] span:nth-child(6),
    .pi-web-chat-surface .spinner[data-frame="3"] span:nth-child(1),
    .pi-web-chat-surface .spinner[data-frame="4"] span:nth-child(2),
    .pi-web-chat-surface .spinner[data-frame="5"] span:nth-child(3) {
      color: currentColor;
      opacity: 0.24;
    }

    @media (prefers-reduced-motion: reduce) {
      .pi-web-chat-surface .spinner[data-frame] span:nth-child(1) { color: currentColor; opacity: 1; }
      .pi-web-chat-surface .spinner[data-frame] span:nth-child(2) { color: currentColor; opacity: 0.68; }
      .pi-web-chat-surface .spinner[data-frame] span:nth-child(3) { color: currentColor; opacity: 0.42; }
      .pi-web-chat-surface .spinner[data-frame] span:nth-child(4) { color: currentColor; opacity: 0.24; }
      .pi-web-chat-surface .spinner[data-frame] span:nth-child(5) { color: #000; opacity: 1; }
      .pi-web-chat-surface .spinner[data-frame] span:nth-child(6) { color: #000; opacity: 1; }
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
      cursor: not-allowed;
      pointer-events: none;
    }

    .pi-web-chat-root[data-composer-mode="shell"] .pi-web-chat-send {
      background: var(--warning, #facc15);
      color: #2a1500;
    }

    .pi-web-chat-root .pi-web-chat-shell-note {
      color: var(--muted, #8a8f98);
      display: none;
      font-size: 12px;
      margin-bottom: 6px;
    }

    .pi-web-chat-root[data-composer-mode="shell"] .pi-web-chat-attachments {
      display: none;
    }

    .pi-web-chat-root[data-composer-mode="shell"][data-shell-attachments] .pi-web-chat-shell-note {
      display: block;
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
  `}function jp(){document.getElementById("pi-web-chat-style")?.remove();let p=document.createElement("style");return p.id="pi-web-chat-style",p.textContent=Zp(),document.head.append(p),p}function x(p){return p.command||p.cmd||(p.name?`/${p.name}`:"")}function G(p){if(!p)throw Error("pi-web-chat DOM template is invalid");return p}function Cb(p,b,w){return{threadId:p,runId:b,state:{},messages:w,tools:[],context:[]}}function Nb(p){let b=[...p.messages].reverse().find((w)=>w.role==="user");return{text:b?.text||"",attachments:b?.attachments||[],sessionId:p.threadId}}function Zb(p,b,w){return p.map((f)=>jb(f,b,w))}function jb(p,b,w){if(p.type==="text.delta")return{type:"TEXT_MESSAGE_CONTENT",threadId:b,runId:w,delta:p.delta||""};if(p.type==="thinking.delta")return{type:"THINKING_MESSAGE_CONTENT",threadId:b,runId:w,delta:p.delta||""};if(p.type==="tool.start")return{type:"TOOL_CALL_START",threadId:b,runId:w,toolCallId:p.toolCallId,payload:Jp(p)};if(p.type==="tool.delta")return{type:"TOOL_CALL_ARGS",threadId:b,runId:w,toolCallId:p.toolCallId,delta:p.delta||""};if(p.type==="tool.end")return{type:"TOOL_CALL_END",threadId:b,runId:w,toolCallId:p.toolCallId,payload:Jp(p)};return{type:p.type.toUpperCase().replaceAll(".","_"),threadId:b,runId:w,payload:p}}function Jp(p){return{name:p.toolName||"tool",args:p.args||{},result:p.result||"",isError:p.isError===!0}}var r="pi-web-chat.sessions.v1";var Ep="plugin.pi-web-sidebar.selectedSession",Wp="plugin.pi-web-sidebar.event",Bp="plugin.pi-web-sidebar.activeSessionId",wp="plugin.pi-web-sidebar.activeWorkspaceId",Jb=12,Gp=20,v=200,Gb=8,Vb=1e6,Ub=64000;var Fb=250,Pp=6,Rb=150,E=new Set,yb={"book-open":'<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',"file-plus":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="M9 15h6"/>',pencil:'<path d="M21.2 6.8 17.2 2.8a2 2 0 0 0-2.8 0L3 14.2V21h6.8L21.2 9.6a2 2 0 0 0 0-2.8z"/><path d="m14 5 5 5"/>',terminal:'<path d="m4 17 6-6-6-6"/><path d="M12 19h8"/>',cpu:'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 15h3"/><path d="M1 9h3"/><path d="M1 15h3"/>',globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 0 20"/><path d="M12 2a15.3 15.3 0 0 0 0 20"/>',search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',braces:'<path d="M8 3H7a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-4a2 2 0 0 1 2-2 2 2 0 0 1-2-2V7a2 2 0 0 0-2-2h-1"/>',"file-text":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',"circle-question-mark":'<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 1 1 5.8 1c-.5 1-1.4 1.5-2.1 2-.6.4-.8.8-.8 2"/><path d="M12 17h.01"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',plug:'<path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a6 6 0 0 1-12 0V8Z"/>',"git-branch":'<line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',"circle-check":'<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',hammer:'<path d="m15 12-8.5 8.5a2.1 2.1 0 0 1-3-3L12 9"/><path d="m17.6 5.4 1.8-1.8"/><path d="m14 7 3 3"/><path d="M5 11 2 8l6-6 3 3"/>',package:'<path d="m7.5 4.3 9 5.2"/><path d="M21 8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>'},bp=new WeakMap,qb={read:"book-open",write:"file-plus",edit:"pencil",ctx_execute:"cpu",ctx_batch_execute:"cpu",ctx_execute_file:"cpu",ctx_search:"cpu",ctx_index:"cpu",ctx_fetch_and_index:"cpu",web_search:"globe",fetch_content:"search",get_search_content:"search",code_search:"braces",document_parse:"file-text",ask_user_question:"circle-question-mark",teams:"users",subagent:"users",mcp:"plug",git:"git-branch"};class Mp{#p=[];add(p){if(p)this.#p.push(p);return p}listen(p,b,w){p.addEventListener(b,w),this.add({remove:()=>p.removeEventListener(b,w)})}dispose(){for(let p of this.#p.splice(0).reverse())if(typeof p==="function")p();else if("unsubscribe"in p)p.unsubscribe();else p.remove()}}function Db(p={}){let b=p.app;if(b?.piWebChat?.dispose(),typeof p.mount?.chat!=="function"||typeof p.mount?.composer!=="function")throw Error("pi-web-chat requires modern pi-web mount.chat and mount.composer APIs");return Xb(p,b)}function Xb(p,b){let w=new Mp,f=w.add(jp()),h=zp(),i=Cp(),L=p.mount?.chat(h,{replace:!0}),T=p.mount?.composer(i,{replace:!0});if($1(w,h),N1(w,h),L)w.add(L);if(T)w.add(T);let O=A(p);Q(p,O||void 0);let H=O?.sessionId?E1(O.sessionId):K1(),$={backendChatToken:0,pendingPromptEchoIds:new Map};if(!O?.sessionId)S(h);else V(h,g(H).messages,H.activeSessionId),m(p,h,H,$,O.sessionId);h1(w,p,h,H,$),Yb(w,p,i,h,H,$);let _=b?w.add(Np(b)):void 0;b?.classList.add(a());let N=()=>{if($.runEventsAbort?.abort(),$.sessionEventsAbort?.abort(),w.dispose(),E.clear(),_?.remove(),f.remove(),b?.classList.remove(a()),b?.piWebChat===j)delete b.piWebChat},j={dispose:N};if(b)b.piWebChat=j;return N}function Yb(p,b,w,f,h,i){let L=w.querySelector(".prompt-textarea"),T=w.querySelector(".send-btn"),O=w.querySelector(".attach-btn"),H=w.querySelector("[data-file-input]"),$=w.querySelector(".attach-chips"),_=w.querySelector(".shell-attachment-note");if(!L||!T)return;let N=w.querySelector(".prompt-bar"),j=w.querySelector(".slash-pop"),C=w.querySelector(".prompt-file-ref-pop"),l={selectedAttachments:[],shellMode:!1,commands:[]},y=()=>{Ab($,L.value,l)},q=()=>{Qb(N,L,O,_,l)},D=()=>{let J=L.value;if(T.setAttribute("aria-disabled",J.trim()?"false":"true"),y(),Vp(l),l.shellMode){s(j,C);return}vb(b,w,L,J,l.commands,(z)=>{l.commands=z}),l.fileSearchTimer=setTimeout(()=>{kb(b,w,L,L.value)},120)},$p=()=>{l.shellMode=!0,s(j,C),q(),y()},_p=()=>{l.shellMode=!1,q(),y()},lp=async(J)=>{J?.preventDefault(),J?.stopImmediatePropagation();let z=L.value.trim();if(D(),!z){L.value="",D();return}if(T.disabled=!0,L.value="",H)H.value="";D();try{if(l.shellMode)qp(z,[]),await Wb(b,f,h,z),_p();else{let P=[...l.selectedAttachments,...await Bb(b,z)];qp(z,P),await Ib(b,f,h,i,z,P),l.selectedAttachments=[],y()}}catch(P){if(!g1(P))V(f,[Kb(P)],h.activeSessionId)}finally{T.disabled=!1,q(),D()}};if(p.listen(L,"input",()=>{if(!l.shellMode&&L.value.startsWith("! "))L.value=L.value.slice(2),$p();D()}),p.listen(L,"keydown",(J)=>{let z=J;if(z.key===" "&&!l.shellMode&&L.value==="!"&&L.selectionStart===1&&L.selectionEnd===1){z.preventDefault(),L.value="",$p(),D();return}if(z.key==="Backspace"&&l.shellMode&&L.value===""){z.preventDefault(),_p(),D();return}if(z.key==="Escape"){s(j,C);return}if(z.key==="Enter"&&(z.metaKey||z.ctrlKey))lp(z)}),p.listen(T,"click",(J)=>{lp(J)}),O&&H)p.listen(O,"click",()=>{if(!l.shellMode)H.click()}),p.listen(H,"change",()=>{Eb(H,(J)=>{l.selectedAttachments=J,y()})});p.add({remove:()=>Vp(l)}),q()}function Ab(p,b,w){if(!p)return;if(w.shellMode){t(p,[]);return}t(p,[...w.selectedAttachments.map((f)=>f.name||"attachment"),...vp(b)])}function Qb(p,b,w,f,h){if(p?.classList.toggle("shell-mode",h.shellMode),b.setAttribute("placeholder",h.shellMode?"run shell command in workspace…":"ask pi to do something…"),f)f.hidden=!(h.shellMode&&h.selectedAttachments.length>0);if(w)o(w,h.shellMode?"shell":"normal")}function Vp(p){if(p.fileSearchTimer)clearTimeout(p.fileSearchTimer),p.fileSearchTimer=void 0}function s(p,b){p?.setAttribute("hidden",""),b?.setAttribute("hidden","")}function Kb(p){return{id:W(),role:"system",text:`prompt failed: ${Hp(p)}`,createdAt:Date.now()}}async function Eb(p,b){let w=Array.from(p.files||[]).slice(0,Gb),f=[];for(let h of w){if(h.size>Vb)continue;f.push({name:h.name,size:h.size,content:await h.text(),mimeType:h.type||void 0})}b(f)}async function Wb(p,b,w,f){let h=ap(p,w),i=U(w,h),L={id:W(),role:"user",text:`! ${f}`,createdAt:Date.now()},T={id:W(),role:"tool",text:`$ ${f}
(running...)`,createdAt:Date.now()};i.messages.push(L,T),i.updatedAt=Date.now(),Z(w),V(b,i.messages,h);try{let O=await K(p,"runShell",{command:f}),H=typeof O.exitCode==="number"?O.exitCode:1,$=typeof O.durationMs==="number"?O.durationMs:0,_=typeof O.output==="string"?O.output:"";T.text=Pb(f,_,H,$,Boolean(O.truncated))}catch(O){T.text=`$ ${f}
${Hp(O)}`}i.updatedAt=Date.now(),Z(w),V(b,i.messages,h)}async function Bb(p,b){let w=vp(b);if(!w.length)return[];let f=await K(p,"resolveContext",{text:b,refs:w});return Array.isArray(f.attachments)?f.attachments.filter(R):[]}function Pb(p,b,w,f,h){let i=Mb(b,Ub),L=h||i.truncated,T=i.text.endsWith(`
`)||!i.text?"":`
`;return`$ ${p}
${i.text}${T}[exit ${w} · ${f}ms${L?" · truncated":""}]`}function Mb(p,b){let w=new TextEncoder,f=w.encode(p);if(f.byteLength<=b)return{text:p,truncated:!1};let h=new TextDecoder().decode(f.slice(0,b));while(h&&w.encode(h).byteLength>b)h=h.slice(0,-1);return{text:h,truncated:!0}}async function vb(p,b,w,f,h,i){let L=b.querySelector(".slash-pop"),T=b.querySelector(".slash-list"),O=D1(f);if(O===null||!T){L?.setAttribute("hidden","");return}let H=h;if(!H.length){let _=await K(p,"commands",{});H=Array.isArray(_.commands)?_.commands.filter(R):[],i(H)}if(w.value!==f)return;let $=H.filter((_)=>{return x(_).slice(1).toLowerCase().includes(O)});gb(T,$,w,L),L?.toggleAttribute("hidden",$.length===0)}async function kb(p,b,w,f){let h=b.querySelector(".prompt-file-ref-pop"),i=b.querySelector(".prompt-file-ref-list"),L=X1(f);if(L===null||!i){h?.setAttribute("hidden","");return}try{let T=await K(p,"searchFiles",{query:L,limit:Jb}),O=Array.isArray(T.files)?T.files.filter(R):[];if(w.value!==f)return;cb(i,w,O,h),h?.toggleAttribute("hidden",O.length===0)}catch{h?.setAttribute("hidden","")}}function gb(p,b,w,f){p.replaceChildren(...b.map((h)=>{let i=document.createElement("button"),L=x(h);return i.type="button",i.className="slash-item",i.dataset.slash=L,i.innerHTML='<span class="sl-name"></span><span class="sl-desc"></span>',i.querySelector(".sl-name").textContent=L,i.querySelector(".sl-desc").textContent=h.description||"",i.addEventListener("click",()=>{w.value=h.template||`${L} `,f?.setAttribute("hidden",""),w.dispatchEvent(new(w.ownerDocument.defaultView?.Event||Event)("input",{bubbles:!0})),w.focus()}),i}))}function cb(p,b,w,f){p.replaceChildren(...w.map((h)=>{let i=h.path||h.name||"",L=document.createElement("button");return L.type="button",L.className="prompt-file-ref-item",L.dataset.path=i,L.disabled=!i,L.innerHTML='<span class="pfr-path"></span><span class="pfr-kind"></span>',L.querySelector(".pfr-path").textContent=i,L.querySelector(".pfr-kind").textContent=typeof h.size==="number"?`${h.size} bytes`:"file",L.addEventListener("click",()=>{xb(b,i),f?.setAttribute("hidden","")}),L}))}function xb(p,b){if(!b)return;let{value:w,selectionStart:f}=p,h=w.slice(0,f),i=/(?:^|\s)@([^\s@`]*)$/.exec(h),L=i?f-(i[1]||"").length-1:f,T=`@${b} `;p.value=`${w.slice(0,L)}${T}${w.slice(f)}`;let O=L+T.length;p.setSelectionRange(O,O),p.dispatchEvent(new(p.ownerDocument.defaultView?.Event||Event)("input",{bubbles:!0})),p.focus()}function m1(p){return{input$:p.behaviorSubject("chat.input",""),submitted$:p.subject("chat.input.submitted"),activeSessionId$:p.behaviorSubject("session.activeId",null),sidebarSelectedSession$:p.behaviorSubject(Ep,rb()),toastRequested$:p.subject("toast.requested")}}function vp(p){let b=[],w=new Set,f=/(^|[\s`])@([^\s@`]+)/g,h=f.exec(String(p||""));while(h!==null){let i=h[2]||"";if((h[1]||"")!=="`"&&i&&!w.has(i))w.add(i),b.push(i);h=f.exec(String(p||""))}return b}function S1(p=[],b=[]){let w=[],f=new Set;for(let h of[...p,...b]){let i=x(h);if(!i||f.has(i))continue;f.add(i),w.push(h)}return w}function I(p){return p.app?.piWebSidebar?.getSnapshot?.().activeWorkspaceId||p.app?.dataset.activeWorkspaceId||""}function rb(){return A({})}function A(p){let b=p.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),w=b?.activeSessionId||"",f=b?.activeWorkspaceId||"";if(w&&p.app?.dataset.clearedSessionId!==w)return{sessionId:w,workspaceId:f||void 0};return null}function Q(p,b){if(b?.workspaceId&&p.app)p.app.dataset.activeWorkspaceId=b.workspaceId,Up(wp,b.workspaceId);if(b?.sessionId)delete p.app?.dataset.clearedSessionId,p.app?.setAttribute("data-active-session-id",b.sessionId),Up(Bp,b.sessionId)}function kp(p){let b=A(p);if(b?.sessionId&&p.app)p.app.dataset.clearedSessionId=b.sessionId;p.app?.removeAttribute("data-active-session-id"),ub(Bp),globalThis.piWeb?.behaviorSubject("session.activeId",null).next(null)}function k(p,b,w={}){let f=p.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),h={type:b,detail:w,snapshot:f};(p.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$)?.next(h),globalThis.piWeb?.subject(Wp).next(h)}function fp(p,b,w){let f=p.app?.dataset.activeWorkspaceId||I(p),h={reason:w,sessionId:b,workspaceId:f};globalThis.piWeb?.behaviorSubject("session.activeId",b).next(b),globalThis.piWeb?.subject("session.changed").next({sessionId:b,workspaceId:f,reason:w}),k(p,"active.start",h),k(p,"session.created",h)}function Up(p,b){try{localStorage.setItem(p,b)}catch{}}function ub(p){try{localStorage.removeItem(p)}catch{}}async function K(p,b,w={},f=I(p)){if(!p.backend)return{};let h=await p.backend(b,{workspaceId:f,data:w});return R(h)?h:{}}function Fp(p){let b=Array.isArray(p.warnings)?p.warnings.filter((w)=>typeof w==="string"&&w.trim().length>0):[];for(let w of b)globalThis.piWeb?.subject("toast.requested").next({level:"warning",message:w})}function d1(p,b){return p.trim().startsWith("!")?[]:[...b]}async function Ib(p,b,w,f,h,i){let L=ap(p,w),T=F(p);f.backendChatToken+=1,f.runEventsAbort?.abort();let O=new AbortController;f.runEventsAbort=O,f.sessionEventsAbort?.abort();let H={id:W(),role:"user",text:h,attachments:Ob(i),createdAt:Date.now()},$=U(w,L);f.pendingPromptEchoIds.set(L,H.id),$.messages.push(H),$.updatedAt=Date.now(),Z(w),V(b,$.messages,L);let _=await nb(p,h,i,L,T.path,T.id);if(O.signal.aborted){Rp(w,L,H.id);return}if(Fp(_),typeof _.activeSessionId==="string"&&_.activeSessionId){let C=L,l=w.activeSessionId===C;if(L=_.activeSessionId,l)B(w,L),Q(p,{sessionId:_.activeSessionId,workspaceId:T.id||void 0}),k(p,"chat-session",{reason:"startPrompt",sessionId:_.activeSessionId}),fp(p,_.activeSessionId,"startPrompt");else U(w,L);hb(w,C,L,H.id),A1(f.pendingPromptEchoIds,C,L)}if(typeof _.runId!=="string"||!_.runId){let C=await tb(p,h,i,L,T.path,T.id);if(O.signal.aborted){Rp(w,L,H.id);return}Fp(C);let l=typeof C.activeSessionId==="string"&&C.activeSessionId?C.activeSessionId:L,y=Lp(f.pendingPromptEchoIds,L),q=f1(p,w,C,"submitPrompt",L,y);if(Op(f.pendingPromptEchoIds,l,q,C.messages,y),w.activeSessionId===L||w.activeSessionId===l)V(b,q,w.activeSessionId);if(f.runEventsAbort===O)f.runEventsAbort=void 0;return}let N=U(w,L),j=sb(N);try{await mb(p,w,N,_.runId,T.path,T.id,j,()=>{if(!O.signal.aborted&&w.activeSessionId===L)V(b,N.messages,L)},O.signal)}finally{if(f.runEventsAbort===O)f.runEventsAbort=void 0}if(!O.signal.aborted&&w.activeSessionId===L)m(p,b,w,f,L,T.path,T.id)}function Rp(p,b,w){let f=p.sessions.find((h)=>h.id===b);if(!f)return;f.messages=f.messages.filter((h)=>h.id!==w),ib(p,f.id),Z(p)}async function mb(p,b,w,f,h,i,L,T,O){let H=await cp(p,"streamEventsSse",{runId:f,cursor:0,workspacePath:h},O,i);if(!H)throw Error("SSE streaming backend did not return a stream");let $=gp(T);L.streaming=!0,$.flush();try{await xp(H,(_)=>{eb(L,[_]),L.streaming=_.type!=="run.end",w.updatedAt=Date.now(),Z(b),$.request()})}finally{L.streaming=!1,Z(b),$.flush()}}function gp(p){let b=0,w,f=()=>{if(w)clearTimeout(w),w=void 0},h=()=>{f(),b=Date.now(),p()};return{request:()=>{let L=Fb-(Date.now()-b);if(L<=0){h();return}w||=setTimeout(h,L)},flush:h,cancel:f}}async function cp(p,b,w={},f,h=I(p)){if(!p.backendStream)throw Error("SSE streaming backend is unavailable");let i=await p.backendStream(b,{workspaceId:h,data:w},{signal:f});return Sb(i)}function Sb(p){if(typeof ReadableStream<"u"&&p instanceof ReadableStream)return p;if(typeof Response<"u"&&p instanceof Response)return p.body;if(typeof p==="string")return yp(p);if(!R(p))return null;let b=p.body;if(typeof ReadableStream<"u"&&b instanceof ReadableStream)return b;let w=p.sse;if(typeof w==="string")return yp(w);return null}function yp(p){let b=new TextEncoder().encode(p);return new ReadableStream({start(w){w.enqueue(b),w.close()}})}async function xp(p,b){let w=p.getReader(),f=new TextDecoder,h="";while(!0){let i=await w.read();if(i.done){h+=f.decode(),ab(h,b);return}h+=f.decode(i.value,{stream:!0});let L=db(h);h=L.remainder;for(let T of L.frames)rp(T,b)}}function db(p){let w=p.replaceAll(`\r
`,`
`).replaceAll("\r",`
`).split(`

`),f=w.pop()||"";return{frames:w,remainder:f}}function ab(p,b){let w=p.trim();if(w)rp(w,b)}function rp(p,b){let w=p.split(`
`).filter((f)=>f.startsWith("data:")).map((f)=>f.slice(5).trimStart()).join(`
`);if(!w)return;try{let f=JSON.parse(w);if(b1(f))b(f)}catch{}}function qp(p,b){globalThis.piWeb?.subject("chat.input.submitted").next({text:p,attachments:Ob(b)||[]})}async function nb(p,b,w,f,h=F(p).path,i=F(p).id){try{return await K(p,"startPrompt",up(b,w,f,h),i)}catch(L){if(ob(L))return{};throw L}}function ob(p){return/unknown method: (startPrompt|streamEventsSse)|unsupported method: (startPrompt|streamEventsSse)|(startPrompt|streamEventsSse) unsupported/i.test(Hp(p))}async function tb(p,b,w,f="",h=F(p).path,i=F(p).id){return await K(p,"submitPrompt",up(b,w,f,h),i)}function up(p,b,w,f){let h={text:p,attachments:b,sessionId:w};if(f)h.workspacePath=f;return h}function sb(p){let b=[...p.messages].reverse().find((f)=>f.role==="assistant"&&f.streaming);if(b)return b;let w={id:W(),role:"assistant",text:"",createdAt:Date.now(),streaming:!0};return p.messages.push(w),w}function eb(p,b){for(let w of b)if(w.type==="text.delta"&&typeof w.delta==="string")p.text+=w.delta;else if(w.type==="thinking.delta"&&typeof w.delta==="string")p.thinking=`${p.thinking||""}${w.delta}`;else if(w.type==="tool.start")e(p,w,"running");else if(w.type==="tool.delta"&&typeof w.delta==="string"){let f=e(p,w,"running");f.text=w.delta}else if(w.type==="tool.end"){let f=e(p,w,w.isError?"err":"ok");if(typeof w.result==="string"&&w.result)f.text=w.result}else if(w.type==="error"&&typeof w.message==="string")p.text+=`${p.text?`
`:""}${w.message}`}function e(p,b,w){let f=b.toolCallId||b.toolName||"tool";p.toolCalls||=[];let h=p.toolCalls.find((i)=>i.id===f);if(!h)h={id:f,name:b.toolName||"tool",args:b.args,text:"",status:w},p.toolCalls.push(h);if(h.status=w,p1(h,b))h.args=b.args,h.argsStatus=b.argsStatus;return h}function p1(p,b){if(!b.argsStatus)return Boolean(b.args);if(b.argsStatus==="unavailable")return!p.argsStatus;return!0}function b1(p){return R(p)&&typeof p.type==="string"}async function m(p,b,w,f,h="",i=hp(p),L=F(p).id){if(!p.backendStream){await Dp(p,b,w,f,h,i);return}let T=++f.backendChatToken;f.sessionEventsAbort?.abort();let O=new AbortController;f.sessionEventsAbort=O;let H=gp(()=>{V(b,g(w).messages,w.activeSessionId)});try{let $=await cp(p,"sessionEventsSse",Ip(p,h,i),O.signal,L);if(!$)throw Error("session SSE backend did not return a stream");await xp($,(_)=>{if(T!==f.backendChatToken||_.type!=="chat.state")return;let N=w1(_),j=typeof N.activeSessionId==="string"?N.activeSessionId:h,C=Lp(f.pendingPromptEchoIds,j),l=Sp(p,w,N,"chatState",C);if(Op(f.pendingPromptEchoIds,j,l,N.messages,C),l.length)H.request()})}catch($){if(!O.signal.aborted)await Dp(p,b,w,f,h,i)}finally{if(H.cancel(),f.sessionEventsAbort===O)f.sessionEventsAbort=void 0}}async function Dp(p,b,w,f,h="",i=hp(p)){let L=++f.backendChatToken;try{let T=await K(p,"chatState",Ip(p,h,i));if(L!==f.backendChatToken)return;let O=typeof T.activeSessionId==="string"?T.activeSessionId:h,H=Lp(f.pendingPromptEchoIds,O),$=Sp(p,w,T,"chatState",H);if(Op(f.pendingPromptEchoIds,O,$,T.messages,H),$.length)V(b,$,w.activeSessionId)}catch{}}function Ip(p,b,w=hp(p)){let f=b?{sessionId:b}:{};if(w)f.workspacePath=w;return f}function w1(p){return{activeSessionId:p.activeSessionId,messages:p.messages,isStreaming:p.isStreaming}}function hp(p){return F(p).path}function F(p){let b=p.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),w=b?.activeWorkspaceId||p.app?.dataset.activeWorkspaceId||"",f=b?.workspaces?.find((h)=>h.id===w)?.path||"";return{id:w,path:f}}function mp(p,b){let w=p.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),f=b.workspaceId||w?.activeWorkspaceId||p.app?.dataset.activeWorkspaceId||"",h=w?.workspaces?.find((i)=>i.id===f)?.path||"";if(h||f!==w?.activeWorkspaceId)return{id:f,path:h};return F(p)}function Sp(p,b,w,f,h=""){let i=Tp(w.messages);if(typeof w.activeSessionId==="string"&&w.activeSessionId){let O=b.activeSessionId;if(B(b,w.activeSessionId),Q(p,{sessionId:w.activeSessionId,workspaceId:p.app?.dataset.activeWorkspaceId||I(p)||void 0}),f!=="chatState"||O!==w.activeSessionId)k(p,"chat-session",{reason:f,sessionId:w.activeSessionId});if(f!=="chatState")fp(p,w.activeSessionId,f)}let L=g(b);if(!i.length)return[];let T=fb(L.messages,i,h).slice(-v);if(!dp(L.messages,T))return[];if(L.messages=T,L.title==="New chat"){let O=L.messages.find((H)=>H.role==="user");if(O)L.title=O.text.slice(0,48)||L.title}return L.updatedAt=Date.now(),Z(b),L.messages}function dp(p,b){if(p.length!==b.length)return!0;return p.some((w,f)=>Xp(w)!==Xp(b[f]))}function Xp(p){return JSON.stringify({id:p.id,role:p.role,text:p.text,thinking:p.thinking,streaming:p.streaming,toolCalls:p.toolCalls,attachments:p.attachments})}function f1(p,b,w,f,h,i=""){let L=Tp(w.messages),T=typeof w.activeSessionId==="string"&&w.activeSessionId?w.activeSessionId:h,O=b.activeSessionId===h;if(T!==h)if(O)B(b,T),Q(p,{sessionId:T,workspaceId:F(p).id||void 0}),k(p,"chat-session",{reason:f,sessionId:T}),fp(p,T,f);else U(b,T);if(i&&T!==h)hb(b,h,T,i);let H=U(b,T);if(!L.length)return[];let $=fb(H.messages,L,i).slice(-v);if(!dp(H.messages,$))return[];return H.messages=$,H.updatedAt=Date.now(),Z(b),H.messages}function h1(p,b,w,f,h){let i=(H,$)=>{if(!H?.sessionId){if(!$)Yp(b,w,f,h,!0);return}if(np(b,f,H))return;Q(b,H),B(f,H.sessionId),V(w,g(f).messages,f.activeSessionId);let _=mp(b,H);m(b,w,f,h,H.sessionId,_.path,_.id)},L=(H)=>{if(i1(b,w,f,h,H))return;let $=O1(b,H);if($)i($,!1)},T=b.app?.piWebSidebar?.channels?.selectedSession$||globalThis.piWebSidebar?.channels?.selectedSession$,O=b.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$;if(T){let H=!0;p.add(T.subscribe(($)=>{i($,H),H=!1}))}if(O)p.add(O.subscribe(L));if(b.app)p.listen(b.app,"pi-web-sidebar:session-created",(H)=>{let $=H.detail||{},_=typeof $.sessionId==="string"?$.sessionId:"",N=typeof $.workspaceId==="string"?$.workspaceId:"";if(_)i({sessionId:_,workspaceId:N||void 0},!1)});if(globalThis.piWeb){let H=!0;p.add(globalThis.piWeb.behaviorSubject(Ep,A(b)).subscribe((_)=>{i(_,H),H=!1})),p.add(globalThis.piWeb.subject(Wp).subscribe(L));let $=!0;p.add(globalThis.piWeb.behaviorSubject("session.activeId",null).subscribe((_)=>{if(!_){if(!$)Yp(b,w,f,h,!1);$=!1;return}$=!1,i({sessionId:_,workspaceId:b.app?.dataset.activeWorkspaceId||Lb(wp)||void 0},!1)}))}}function Yp(p,b,w,f,h){if(f.backendChatToken+=1,f.runEventsAbort?.abort(),f.sessionEventsAbort?.abort(),w.activeSessionId="",Z(w),h)kp(p);else{let i=A(p);if(i?.sessionId&&p.app)p.app.dataset.clearedSessionId=i.sessionId}S(b)}function ap(p,b){let w=A(p);if(w?.sessionId&&!np(p,b,w))Q(p,w),B(b,w.sessionId);if(!b.activeSessionId)return U(b,"",!0).id;return b.activeSessionId}function np(p,b,w){let f=w.workspaceId||"",h=p.app?.dataset.activeWorkspaceId||Lb(wp)||"";return b.activeSessionId===w.sessionId&&(!f||f===h)}function i1(p,b,w,f,h){if(h.type!=="session.deleted")return!1;let i=op(h);if(!i)return!0;let L=w.activeSessionId===i,T=w.sessions.length;if(w.sessions=w.sessions.filter((O)=>O.id!==i),L){f.runEventsAbort?.abort(),f.sessionEventsAbort?.abort();let O=L1(p,h,i);if(O?.sessionId){Q(p,O),B(w,O.sessionId),H1(b,g(w).messages,w.activeSessionId);let H=mp(p,O);return m(p,b,w,f,O.sessionId,H.path,H.id),!0}return w.activeSessionId="",kp(p),Z(w),S(b),!0}if(w.sessions.length!==T)Z(w);return!0}function L1(p,b,w){let f=b.snapshot?.activeSessionId||"",h=b.snapshot?.activeWorkspaceId||"";if(f&&f!==w)return{sessionId:f,workspaceId:h||void 0};let i=A(p);if(i?.sessionId&&i.sessionId!==w)return i;return null}function O1(p,b){if(!T1(b.type))return null;let w=b.detail||{},f=op(b)||b.snapshot?.activeSessionId||"",h=typeof w.workspaceId==="string"?w.workspaceId:b.snapshot?.activeWorkspaceId||p.app?.dataset.activeWorkspaceId||"";if(!f)return null;return{sessionId:f,workspaceId:h||void 0}}function op(p){let b=p.detail||{};if(typeof b.sessionId==="string")return b.sessionId;if(typeof b.id==="string")return b.id;return""}function T1(p){return p==="session.selected"||p==="session.created"||p==="new-session"||p==="active.start"}function B(p,b){let w=p.sessions.find((f)=>f.id===b);if(!w)w=d(b),p.sessions.unshift(w);return p.activeSessionId=w.id,Z(p),w}function V(p,b,w){if(ep(b,w),!b.length){S(p);return}(p.querySelector(".term-inner")||p).replaceChildren(...b.map((h)=>sp(h,w))),ip(p)}function H1(p,b,w){ep(b,w),(p.querySelector(".term-inner")||p).replaceChildren(...b.map((h)=>sp(h,w))),ip(p)}function S(p){let b=p.querySelector(".term-inner")||p,w=document.createElement("article");w.className="pi-web-chat-docs",w.setAttribute("aria-label","pi-web-chat guide");let f=document.createElement("h1");f.textContent="pi-web-chat guide";let h=document.createElement("p");h.textContent=["Select or create a session in the sidebar to load chat history,","or type below to start a new session."].join(" ");let i=document.createElement("ul");for(let L of["Ask pi in the prompt box and press Cmd/Ctrl+Enter to send.","Type ! then Space at the start to turn the prompt yellow and run shell commands in the workspace.","Queued file attachments hide during shell mode and reappear for the next normal prompt.","Type @ to list project files, then pick one to tag it as prompt context.","Type / at the start to open the slash command list.","Chats are cached locally after you start or select a session."]){let T=document.createElement("li");T.textContent=L,i.append(T)}w.append(f,h,i),b.replaceChildren(w),ip(p)}function $1(p,b){let w=b.querySelector(".term"),f=b.querySelector("[data-action='scroll-bottom']");if(!w||!f)return;let h={term:w,button:f,pinned:!0,touchStartY:null};bp.set(b,h),f.hidden=!1,u(h),p.listen(f,"click",()=>{h.pinned=!0,tp(h),u(h)}),p.listen(w,"wheel",(i)=>{if(i.deltaY<0)Ap(h)}),p.listen(w,"touchstart",(i)=>{let L=i;h.touchStartY=L.touches.item(0)?.clientY??null}),p.listen(w,"touchmove",(i)=>{let T=i.touches.item(0)?.clientY;if(typeof T==="number"&&h.touchStartY!==null&&T-h.touchStartY>8)Ap(h)}),p.listen(w,"touchend",()=>{h.touchStartY=null}),p.add({remove:()=>{bp.delete(b)}})}function ip(p){let b=bp.get(p);if(!b)return;if(b.pinned)tp(b);u(b)}function tp(p){p.term.scrollTop=p.term.scrollHeight}function Ap(p){p.pinned=!1,u(p)}function u(p){p.button.dataset.pinned=p.pinned?"true":"false",p.button.setAttribute("aria-pressed",p.pinned?"true":"false")}function sp(p,b){let w=document.createElement("article");w.className="transcript-item",w.dataset.messageId=p.id;let f=document.createElement("div");f.className="msg",f.dataset.kind=pp(p.role);let h=document.createElement("span");h.className=`prefix ${pp(p.role)}`,h.textContent=q1(p.role);let i=document.createElement("pre");if(i.className=`body ${pp(p.role)}`,i.textContent=p.text,f.append(h,i),_1(p))w.append(f);if(p.thinking)w.append(l1(p.thinking,Boolean(p.streaming)));for(let L of p.toolCalls||[])w.append(z1(L,pb(b,p,L)));if(p.streaming)w.dataset.streaming="true";return w}function _1(p){let b=p.text.trim().length>0;return p.role!=="assistant"||b}function l1(p,b){let w=document.createElement("details");w.className="msg-detail think thinking-block",w.open=b;let f=document.createElement("summary");f.className="label",f.textContent="THINKING";let h=document.createElement("pre");return h.className="body",h.textContent=p,w.append(f,h),w}function ep(p,b){let w=new Set;for(let f of p)for(let h of f.toolCalls||[])w.add(pb(b,f,h));for(let f of E)if(!w.has(f))E.delete(f)}function pb(p,b,w){return`${p}:${b.id}:${w.id}`}function z1(p,b){let w=document.createElement("div");w.className="tool-card",w.dataset.tool=p.name||"tool",w.dataset.status=p.status;let f=!E.has(b);w.dataset.collapsed=f?"true":"false";let h=document.createElement("button");if(h.type="button",h.className="tc-head",h.title=f?"Show tool output":"Hide tool output",h.setAttribute("aria-expanded",f?"false":"true"),h.setAttribute("aria-label",bb(p,f)),h.append(J1(p),G1(p),V1(p),U1(p,f)),!f)w.append(wb(p));return h.addEventListener("click",()=>j1(w,h,p,b)),w.prepend(h),w}function bb(p,b){let w=b?"Show":"Hide",f=p.status==="running"?"running":p.status==="err"?"failed":"done",h=C1(p),i=h?`, ${h}`:"";return`${w} ${p.name||"tool"} output, ${f}${i}`}function C1(p){if(p.argsStatus==="present")return"arguments present";if(p.argsStatus)return c(p);return p.args?"arguments present":""}function wb(p){let b=document.createElement("pre");return b.className="tc-body",b.textContent=p.text||n(p),b}function N1(p,b){let w=0,f,h=b.ownerDocument.defaultView,i=typeof h?.matchMedia==="function"?h.matchMedia("(prefers-reduced-motion: reduce)"):void 0,L=()=>{if(f)clearInterval(f),f=void 0},T=()=>{w=(w+1)%Pp;for(let $ of b.querySelectorAll(".spinner"))$.dataset.frame=String(w)},O=()=>{let $=b.querySelectorAll(".spinner");if(i?.matches||$.length===0){L(),w=0;for(let _ of $)_.dataset.frame="0";return}if(!f)f=setInterval(T,Rb)},H=new(h?.MutationObserver||MutationObserver)(O);H.observe(b,{childList:!0,subtree:!0}),i?.addEventListener("change",O),O(),p.add({remove:()=>{H.disconnect(),i?.removeEventListener("change",O),L()}})}function Z1(){let p=document.createElement("span");p.className="spinner",p.dataset.frame="0",p.setAttribute("aria-hidden","true");for(let b=0;b<Pp;b+=1)p.append(document.createElement("span"));return p}function j1(p,b,w,f){let h=p.querySelector(".tc-body"),i=h!==null;if(h)h.remove(),E.delete(f);else p.append(wb(w)),E.add(f);p.dataset.collapsed=i?"true":"false",b.setAttribute("aria-expanded",i?"false":"true"),b.setAttribute("aria-label",bb(w,i)),b.title=i?"Show tool output":"Hide tool output";let L=b.querySelector(".tc-toggle-label");if(L)L.textContent=i?"show":"hide"}function J1(p){let b=document.createElement("span");b.className="tc-glyph";let w=F1(p),f=w?yb[w]:"";if(!w||!f)return b.textContent="●",b;return b.innerHTML=`<svg class="tc-icon" data-tool-icon="${w}" aria-hidden="true" viewBox="0 0 24 24">${f}</svg>`,b}function G1(p){let b=document.createElement("span");return b.className="tc-name",b.textContent=p.name||"tool",b}function V1(p){let b=document.createElement("span");return b.className="tc-args",b.textContent=c(p),b}function U1(p,b){let w=document.createElement("span");if(w.className="tc-meta",p.status==="running"){let i=Z1(),L=document.createElement("span");return L.className="running",L.textContent="running",w.append(i,L,Qp(b)),w}let f=document.createElement("span");f.className=p.status==="err"?"err":"ok",f.textContent=p.status==="err"?"✗":"✓";let h=document.createElement("span");return h.textContent=p.status==="err"?" · failed":" · done",w.append(f,h,Qp(b)),w}function Qp(p){let b=document.createElement("span");b.className="tc-toggle";let w=document.createElement("span");w.className="tc-toggle-label",w.textContent=p?"show":"hide";let f=document.createElement("span");return f.className="tc-caret",f.textContent="▸",b.append(w,f),b}function F1(p){let b=R1(p.name);if(["bash","shell","sh","zsh","terminal"].includes(b))return y1(c(p).toLowerCase())||"terminal";return qb[b]}function R1(p){return p.trim().replace(/^functions\./,"").replace(/^multi_tool_use\./,"")}function y1(p){if(/\bgit\b|\bgh\b/.test(p))return"git-branch";if(/\b(go test|bun test|npm test|pnpm test|yarn test|vitest|pytest|cargo test)\b/.test(p))return"circle-check";if(/\b(bun|npm|pnpm|yarn)\s+(run\s+)?build\b|\b(go build|cargo build)\b/.test(p))return"hammer";if(/\b(bun|npm|pnpm|yarn)\s+(add|install|i)\b|\bpip\s+install\b|\bgo\s+get\b/.test(p))return"package";return}function q1(p){if(p==="assistant")return"pi >";if(p==="user")return"you >";if(p==="system")return"sys >";return"tool >"}function pp(p){if(p==="assistant")return"pi";if(p==="system")return"sys";return p}function D1(p){let b=/^\/([^\s/]*)$/.exec(p);return b?b[1].toLowerCase():null}function X1(p){let b=/(?:^|\s)@([^\s@`]*)$/.exec(p);return b?b[1]:null}function a1(p){return p.length>0}function n1(p,b){return p.trim().startsWith("!")&&b}function fb(p,b,w=""){let f=new Map;for(let h of p)f.set(h.id,h);for(let h of b){let i=Y1(p,h,w);if(i){f.delete(i.id),f.set(h.id,h);continue}f.set(h.id,{...f.get(h.id),...h})}return[...f.values()].sort((h,i)=>h.createdAt-i.createdAt)}function Y1(p,b,w){if(!w||b.role!=="user"||!b.text.trim())return;if(p.some((h)=>h.id===b.id))return;let f=p.find((h)=>h.id===w);if(f?.role!==b.role||f.text.trim()!==b.text.trim())return;return f}function Lp(p,b){return p.get(b)||""}function A1(p,b,w){let f=p.get(b)||"";if(!f)return;p.delete(b),p.set(w,f)}function Op(p,b,w,f,h){if(!h||!w.length)return;if(w.some((i)=>i.id===h))return;p.delete(b)}function g(p){return U(p,p.activeSessionId,!0)}function U(p,b,w=!1){let f=p.sessions.find((h)=>h.id===b);if(!f)f=d(b||void 0),p.sessions.unshift(f),Z(p);if(w||!p.activeSessionId)p.activeSessionId=f.id,Z(p);return f}function hb(p,b,w,f){if(b===w)return;let h=p.sessions.find((O)=>O.id===b),i=h?.messages.findIndex((O)=>O.id===f)??-1;if(!h||i<0)return;let[L]=h.messages.splice(i,1),T=U(p,w);if(!T.messages.some((O)=>O.id===L.id))T.messages.push(L);h.updatedAt=Date.now(),T.updatedAt=Date.now(),ib(p,h.id),Z(p)}function ib(p,b){let w=p.sessions.find((f)=>f.id===b);if(!w||w.id===p.activeSessionId||w.messages.length>0||w.title!=="New chat")return;p.sessions=p.sessions.filter((f)=>f.id!==w.id)}function d(p=W()){let b=Date.now();return{id:p,title:"New chat",createdAt:b,updatedAt:b,messages:[]}}function Lb(p){try{return localStorage.getItem(p)||""}catch{return""}}function Q1(p){let b=d(p);return{activeSessionId:b.id,sessions:[b]}}function K1(){try{let p=JSON.parse(localStorage.getItem(r)||"null");if(p&&Array.isArray(p.sessions))return{activeSessionId:"",sessions:p.sessions.filter(Tb).map(Hb)}}catch{}return{activeSessionId:"",sessions:[]}}function E1(p=""){try{let b=JSON.parse(localStorage.getItem(r)||"null");if(b&&typeof b.activeSessionId==="string"&&Array.isArray(b.sessions)){let w=b.sessions.filter(Tb).map(Hb);if(p&&!w.some((f)=>f.id===p))w.unshift(d(p));return{activeSessionId:p||b.activeSessionId,sessions:w}}}catch{}return Q1(p||void 0)}function Z(p){Kp(p);try{localStorage.setItem(r,JSON.stringify(p))}catch{for(let b of p.sessions)b.messages=b.messages.slice(-Math.floor(v/2));Kp(p);try{localStorage.setItem(r,JSON.stringify(p))}catch{}}}function Ob(p){if(!p?.length)return;return p.map(({content:b,...w})=>w)}function Kp(p){p.sessions.sort((f,h)=>h.updatedAt-f.updatedAt);let b=p.sessions.find((f)=>f.id===p.activeSessionId),w=p.sessions.filter((f)=>f.id!==p.activeSessionId).slice(0,Math.max(0,Gp-1));p.sessions=b?[b,...w]:p.sessions.slice(0,Gp);for(let f of p.sessions)if(f.messages.length>v)f.messages.splice(0,f.messages.length-v)}function Tb(p){return R(p)&&typeof p.id==="string"&&Array.isArray(p.messages)}function Hb(p){return{...p,messages:Tp(p.messages)}}function Tp(p){return Array.isArray(p)?p.filter(v1).map(W1):[]}function W1(p){if(!Array.isArray(p.toolCalls)){let{toolCalls:b,...w}=p;return w}return{...p,toolCalls:p.toolCalls.filter(B1)}}function B1(p){if(!R(p)||typeof p.id!=="string"||typeof p.name!=="string")return!1;return typeof p.text==="string"&&M1(p.status)&&P1(p.argsStatus)}function P1(p){return p===void 0||p==="present"||p==="empty"||p==="unavailable"||p==="truncated"||p==="omitted"}function M1(p){return p==="running"||p==="ok"||p==="err"}function v1(p){if(!R(p)||typeof p.id!=="string"||typeof p.text!=="string")return!1;return typeof p.createdAt==="number"&&k1(p.role)}function k1(p){return p==="user"||p==="assistant"||p==="tool"||p==="system"}function R(p){return typeof p==="object"&&p!==null}function W(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`}function g1(p){return p instanceof Error&&(p.name==="AbortError"||/aborted|abort/i.test(p.message))}function Hp(p){return p instanceof Error?p.message:String(p)}export{c as toolArgsInlineText,n as toolArgsBodyText,d1 as submittedAttachmentsForText,n1 as shellAttachmentNoteVisible,zb as setComposerMode,_b as renderMessages,Nb as promptFromAgUiLikeRunInput,Zp as pluginStyleText,a as pluginClass,S1 as mergeCommands,a1 as hasQueuedAttachmentNames,I as getActiveWorkspaceId,Pb as formatShellOutput,vp as extractRefs,Db as default,Cp as createComposerSurface,zp as createChatSurface,$b as createChatDom,m1 as createChannels,Cb as createAgUiLikeRunInput,x as commandName,Zb as chatEventsToAgUiLikeEvents,K as backendCall};
