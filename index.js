var y={attachFile:["M16.5 6v11.5a4 4 0 0 1-8 0V5a2.5 2.5 0 0 1 5 0v10.5a1 1 0 0 1-2 0V6H10v9.5","a2.5 2.5 0 0 0 5 0V5a4 4 0 0 0-8 0v12.5a5.5 5.5 0 0 0 11 0V6h-1.5Z"].join(""),stop:"M6 6h12v12H6V6Z",send:"M2 21 23 12 2 3v7l15 2-15 2v7Z",terminal:"M3 4h18v16H3V4Zm2 2v12h14V6H5Zm2 3 1.1-1.1L12.2 12l-4.1 4.1L7 15l3-3-3-3Zm6 6h5v1.5h-5V15Z",file:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 2.5L17.5 8H14V4.5ZM8 13h8v1.5H8V13Zm0 3h8v1.5H8V16Z"},W={attachFile:R("attach_file",y.attachFile),stop:R("stop",y.stop),send:R("send",y.send),terminal:R("terminal",y.terminal)};function R(p,b){return`<svg class="material-icon" data-material-icon="${p}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="${b}"></path></svg>`}function a(){return"pi-web-chat-mounted"}function $p(){let p=document.createElement("main");return p.className="main pi-web-chat-surface",p.dataset.main="session",p.innerHTML='<div class="term"><div class="term-inner" role="log" aria-live="polite" aria-relevant="additions text"></div></div><button type="button" class="scroll-bottom-btn" data-action="scroll-bottom" aria-label="stick to bottom" title="stick to bottom" aria-pressed="true" hidden>↓</button>',p}function _p(){let p=document.createElement("section");return p.className="prompt-region pi-web-chat-composer",p.innerHTML=`
    <div class="slash-pop" hidden><div class="slash-head">slash commands · type to filter</div><div class="slash-list"></div></div>
    <div class="prompt-file-ref-pop" hidden><div class="slash-head">project files · type to filter</div><div class="prompt-file-ref-list"></div></div>
    <div class="prompt-bar">
      <button class="attach-btn" type="button" aria-label="attach files" title="attach files">${W.attachFile}</button>
      <input type="file" multiple hidden data-file-input />
      <div class="prompt-input-col"><div class="attach-chips" hidden></div><div class="shell-attachment-note" aria-live="polite" hidden>queued attachments are hidden during shell mode and will reappear for the next normal prompt</div><textarea class="prompt-textarea" aria-label="Prompt" placeholder="ask pi to do something…" rows="1"></textarea></div>
      <div class="prompt-actions">
        <button class="stop-btn" type="button" aria-label="stop" title="stop" hidden>${W.stop}</button>
        <button class="mic-btn" type="button" data-action="toggle-speech-input" aria-label="start voice input" title="voice input" hidden>\uD83C\uDF99</button>
        <button class="send-btn" type="button" aria-label="send" title="send" aria-disabled="true">${W.send}</button>
      </div>
      <div class="drop-overlay" hidden><span>drop to attach</span></div>
    </div>
    <div class="prompt-meta" data-prompt-meta>— | <span class="prompt-meta-item prompt-meta-branch"><span>—</span></span></div>`,p}function zp(p){let b=document.createElement("span");return b.className="prompt-meta-item pi-web-chat-badge",b.textContent="chat plugin",p.querySelector("[data-prompt-meta]")?.append(b),b}function lb(){let p=document.createElement("section");return p.className="pi-web-chat-root",p.dataset.plugin="pi-web-chat",p.innerHTML=`
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
        <button class="pi-web-chat-icon-btn" type="button" data-attach aria-label="attach files" title="attach files">${R("attach_file",y.attachFile)}</button>
        <input type="file" multiple hidden data-file-input />
        <textarea class="pi-web-chat-textarea" data-chat-input aria-label="Prompt" placeholder="ask pi to do something…" rows="1"></textarea>
        <button class="pi-web-chat-send" type="button" data-send aria-label="send" title="send" aria-disabled="true">${R("send",y.send)}</button>
      </div>
    </section>`,{root:p,transcript:Z(p.querySelector("[data-chat-transcript]")),textarea:Z(p.querySelector("[data-chat-input]")),sendButton:Z(p.querySelector("[data-send]")),attachButton:Z(p.querySelector("[data-attach]")),fileInput:Z(p.querySelector("[data-file-input]")),slashPopover:Z(p.querySelector("[data-slash-popover]")),slashList:Z(p.querySelector("[data-slash-list]")),refsPopover:Z(p.querySelector("[data-refs-popover]")),refsList:Z(p.querySelector("[data-refs-list]")),attachments:Z(p.querySelector("[data-attachments]"))}}function Ob(p,b){p.replaceChildren(...b.map(Tb)),p.scrollTop=p.scrollHeight}function Tb(p){let b=document.createElement("article");b.className=`pi-web-chat-message pi-web-chat-message-${p.role}`,b.dataset.messageId=p.id;let i=document.createElement("div");i.className="pi-web-chat-message-role",i.textContent=p.role;let h=document.createElement("pre");if(h.className="pi-web-chat-message-body",h.textContent=p.text,b.append(i,h),p.thinking){let w=document.createElement("details");w.className="pi-web-chat-thinking",w.open=Boolean(p.streaming);let f=document.createElement("summary");f.textContent="thinking";let L=document.createElement("pre");L.textContent=p.thinking,w.append(f,L),b.append(w)}if(p.toolCalls?.length){let w=document.createElement("div");w.className="pi-web-chat-tools";for(let f of p.toolCalls){let L=document.createElement("details");L.className=`pi-web-chat-tool pi-web-chat-tool-${f.status}`,L.open=f.status==="running";let O=document.createElement("summary");O.textContent=`${f.name} · ${f.status}`;let l=document.createElement("pre");l.textContent=f.text||n(f),L.append(O,l),w.append(L)}b.append(w)}if(p.streaming){let w=document.createElement("div");w.className="pi-web-chat-message-meta",w.textContent="streaming...",b.append(w)}if(p.attachments?.length){let w=document.createElement("div");w.className="pi-web-chat-message-meta",w.textContent=`${p.attachments.length} attachment(s)`,b.append(w)}return b}function k(p){if(p.argsStatus==="truncated")return"arguments truncated";if(p.argsStatus==="omitted")return"arguments omitted";if(p.argsStatus==="unavailable")return"arguments unavailable";if(p.argsStatus==="empty")return"no arguments";if(!p.args)return"";return JSON.stringify(p.args)}function n(p){if(p.argsStatus==="truncated")return"arguments truncated: too large to display";if(p.argsStatus==="omitted")return"arguments omitted: response too large";if(p.argsStatus==="unavailable")return"arguments unavailable";if(p.argsStatus==="empty")return"no arguments";if(!p.args)return"arguments unavailable";return JSON.stringify(p.args,null,2)}function Hb(p,b){p.root.dataset.composerMode=b,o(p.attachButton,b)}function o(p,b){if(p.disabled=b==="shell",p.setAttribute("aria-disabled",b==="shell"?"true":"false"),b==="shell"){p.innerHTML=W.terminal,p.title="shell command mode",p.setAttribute("aria-label","shell command mode");return}if(b==="file-ref"){p.innerHTML=R("file",y.file),p.title="file reference mode",p.setAttribute("aria-label","file reference mode");return}p.innerHTML=W.attachFile,p.title="attach files",p.setAttribute("aria-label","attach files")}function t(p,b){p.hidden=b.length===0,p.replaceChildren(...b.map((i)=>{let h=document.createElement("span");return h.className="pi-web-chat-attachment-chip",h.textContent=i,h}))}function Ep(){return`
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
  `}function Cp(){document.getElementById("pi-web-chat-style")?.remove();let p=document.createElement("style");return p.id="pi-web-chat-style",p.textContent=Ep(),document.head.append(p),p}function r(p){return p.command||p.cmd||(p.name?`/${p.name}`:"")}function Z(p){if(!p)throw Error("pi-web-chat DOM template is invalid");return p}function $b(p,b,i){return{threadId:p,runId:b,state:{},messages:i,tools:[],context:[]}}function _b(p){let b=[...p.messages].reverse().find((i)=>i.role==="user");return{text:b?.text||"",attachments:b?.attachments||[],sessionId:p.threadId}}function zb(p,b,i){return p.map((h)=>Eb(h,b,i))}function Eb(p,b,i){if(p.type==="text.delta")return{type:"TEXT_MESSAGE_CONTENT",threadId:b,runId:i,delta:p.delta||""};if(p.type==="thinking.delta")return{type:"THINKING_MESSAGE_CONTENT",threadId:b,runId:i,delta:p.delta||""};if(p.type==="tool.start")return{type:"TOOL_CALL_START",threadId:b,runId:i,toolCallId:p.toolCallId,payload:Np(p)};if(p.type==="tool.delta")return{type:"TOOL_CALL_ARGS",threadId:b,runId:i,toolCallId:p.toolCallId,delta:p.delta||""};if(p.type==="tool.end")return{type:"TOOL_CALL_END",threadId:b,runId:i,toolCallId:p.toolCallId,payload:Np(p)};return{type:p.type.toUpperCase().replaceAll(".","_"),threadId:b,runId:i,payload:p}}function Np(p){return{name:p.toolName||"tool",args:p.args||{},result:p.result||"",isError:p.isError===!0}}var x="pi-web-chat.sessions.v1";var Ap="plugin.pi-web-sidebar.selectedSession",Qp="plugin.pi-web-sidebar.event",cp="plugin.pi-web-sidebar.activeSessionId",ip="plugin.pi-web-sidebar.activeWorkspaceId",Cb=12,Zp=20,g=200,Nb=8,Zb=1e6,jb=64000;var Jb=250,Kp=6,Fb=150,Y=new Set,Gb={"book-open":'<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',"file-plus":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="M9 15h6"/>',pencil:'<path d="M21.2 6.8 17.2 2.8a2 2 0 0 0-2.8 0L3 14.2V21h6.8L21.2 9.6a2 2 0 0 0 0-2.8z"/><path d="m14 5 5 5"/>',terminal:'<path d="m4 17 6-6-6-6"/><path d="M12 19h8"/>',cpu:'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 15h3"/><path d="M1 9h3"/><path d="M1 15h3"/>',globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 0 20"/><path d="M12 2a15.3 15.3 0 0 0 0 20"/>',search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',braces:'<path d="M8 3H7a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-4a2 2 0 0 1 2-2 2 2 0 0 1-2-2V7a2 2 0 0 0-2-2h-1"/>',"file-text":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',"circle-question-mark":'<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 1 1 5.8 1c-.5 1-1.4 1.5-2.1 2-.6.4-.8.8-.8 2"/><path d="M12 17h.01"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',plug:'<path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a6 6 0 0 1-12 0V8Z"/>',"git-branch":'<line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',"circle-check":'<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',hammer:'<path d="m15 12-8.5 8.5a2.1 2.1 0 0 1-3-3L12 9"/><path d="m17.6 5.4 1.8-1.8"/><path d="m14 7 3 3"/><path d="M5 11 2 8l6-6 3 3"/>',package:'<path d="m7.5 4.3 9 5.2"/><path d="M21 8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>'},bp=new WeakMap,Vb={read:"book-open",write:"file-plus",edit:"pencil",ctx_execute:"cpu",ctx_batch_execute:"cpu",ctx_execute_file:"cpu",ctx_search:"cpu",ctx_index:"cpu",ctx_fetch_and_index:"cpu",web_search:"globe",fetch_content:"search",get_search_content:"search",code_search:"braces",document_parse:"file-text",ask_user_question:"circle-question-mark",teams:"users",subagent:"users",mcp:"plug",git:"git-branch"};class Mp{#p=[];add(p){if(p)this.#p.push(p);return p}listen(p,b,i){p.addEventListener(b,i),this.add({remove:()=>p.removeEventListener(b,i)})}dispose(){for(let p of this.#p.splice(0).reverse())if(typeof p==="function")p();else if("unsubscribe"in p)p.unsubscribe();else p.remove()}}function Ub(p={}){let b=p.app;if(b?.piWebChat?.dispose(),typeof p.mount?.chat!=="function"||typeof p.mount?.composer!=="function")throw Error("pi-web-chat requires modern pi-web mount.chat and mount.composer APIs");return yb(p,b)}function yb(p,b){let i=new Mp,h=i.add(Cp()),w=$p(),f=_p(),L=p.mount?.chat(w,{replace:!0}),O=p.mount?.composer(f,{replace:!0});if(li(i,w),_i(i,w),L)i.add(L);if(O)i.add(O);let l=q(p);D(p,l||void 0);let T=l?.sessionId?Xi(l.sessionId):Di(),H={backendChatToken:0};if(!l?.sessionId)d(w);else j(w,B(T).messages,T.activeSessionId),m(p,w,T,H,l.sessionId);bi(i,p,w,T,H),Rb(i,p,f,w,T,H);let $=b?i.add(zp(b)):void 0;b?.classList.add(a());let C=()=>{if(H.runEventsAbort?.abort(),H.sessionEventsAbort?.abort(),i.dispose(),Y.clear(),$?.remove(),h.remove(),b?.classList.remove(a()),b?.piWebChat===U)delete b.piWebChat},U={dispose:C};if(b)b.piWebChat=U;return C}function Rb(p,b,i,h,w,f){let L=i.querySelector(".prompt-textarea"),O=i.querySelector(".send-btn"),l=i.querySelector(".attach-btn"),T=i.querySelector("[data-file-input]"),H=i.querySelector(".attach-chips"),$=i.querySelector(".shell-attachment-note");if(!L||!O)return;let C=i.querySelector(".prompt-bar"),U=i.querySelector(".slash-pop"),J=i.querySelector(".prompt-file-ref-pop"),_={selectedAttachments:[],shellMode:!1,commands:[]},c=()=>{qb(H,L.value,_)},v=()=>{Db(C,L,l,$,_)},K=()=>{let N=L.value;if(O.setAttribute("aria-disabled",N.trim()?"false":"true"),c(),jp(_),_.shellMode){s(U,J);return}Mb(b,i,L,N,_.commands,(z)=>{_.commands=z}),_.fileSearchTimer=setTimeout(()=>{Wb(b,i,L,L.value)},120)},Op=()=>{_.shellMode=!0,s(U,J),v(),c()},Tp=()=>{_.shellMode=!1,v(),c()},Hp=async(N)=>{N?.preventDefault(),N?.stopImmediatePropagation();let z=L.value.trim();if(K(),!z)return;O.disabled=!0;try{if(_.shellMode)Up(z,[]),await Ab(b,h,w,z),Tp();else{let M=[..._.selectedAttachments,...await Qb(b,z)];Up(z,M),await rb(b,h,w,f,z,M),_.selectedAttachments=[],c()}if(L.value.trim()===z)L.value="";if(T)T.value=""}catch(M){if(!Wi(M))j(h,[Xb(M)],w.activeSessionId)}finally{O.disabled=!1,v(),K()}};if(p.listen(L,"input",()=>{if(!_.shellMode&&L.value.startsWith("! "))L.value=L.value.slice(2),Op();K()}),p.listen(L,"keydown",(N)=>{let z=N;if(z.key===" "&&!_.shellMode&&L.value==="!"&&L.selectionStart===1&&L.selectionEnd===1){z.preventDefault(),L.value="",Op(),K();return}if(z.key==="Backspace"&&_.shellMode&&L.value===""){z.preventDefault(),Tp(),K();return}if(z.key==="Escape"){s(U,J);return}if(z.key==="Enter"&&(z.metaKey||z.ctrlKey))Hp(z)}),p.listen(O,"click",(N)=>{Hp(N)}),l&&T)p.listen(l,"click",()=>{if(!_.shellMode)T.click()}),p.listen(T,"change",()=>{Yb(T,(N)=>{_.selectedAttachments=N,c()})});p.add({remove:()=>jp(_)}),v()}function qb(p,b,i){if(!p)return;if(i.shellMode){t(p,[]);return}t(p,[...i.selectedAttachments.map((h)=>h.name||"attachment"),...Wp(b)])}function Db(p,b,i,h,w){if(p?.classList.toggle("shell-mode",w.shellMode),b.setAttribute("placeholder",w.shellMode?"run shell command in workspace…":"ask pi to do something…"),h)h.hidden=!(w.shellMode&&w.selectedAttachments.length>0);if(i)o(i,w.shellMode?"shell":"normal")}function jp(p){if(p.fileSearchTimer)clearTimeout(p.fileSearchTimer),p.fileSearchTimer=void 0}function s(p,b){p?.setAttribute("hidden",""),b?.setAttribute("hidden","")}function Xb(p){return{id:A(),role:"system",text:`prompt failed: ${lp(p)}`,createdAt:Date.now()}}async function Yb(p,b){let i=Array.from(p.files||[]).slice(0,Nb),h=[];for(let w of i){if(w.size>Zb)continue;h.push({name:w.name,size:w.size,content:await w.text(),mimeType:w.type||void 0})}b(h)}async function Ab(p,b,i,h){let w=dp(p,i),f=F(i,w),L={id:A(),role:"user",text:`! ${h}`,createdAt:Date.now()},O={id:A(),role:"tool",text:`$ ${h}
(running...)`,createdAt:Date.now()};f.messages.push(L,O),f.updatedAt=Date.now(),E(i),j(b,f.messages,w);try{let l=await X(p,"runShell",{command:h}),T=typeof l.exitCode==="number"?l.exitCode:1,H=typeof l.durationMs==="number"?l.durationMs:0,$=typeof l.output==="string"?l.output:"";O.text=cb(h,$,T,H,Boolean(l.truncated))}catch(l){O.text=`$ ${h}
${lp(l)}`}f.updatedAt=Date.now(),E(i),j(b,f.messages,w)}async function Qb(p,b){let i=Wp(b);if(!i.length)return[];let h=await X(p,"resolveContext",{text:b,refs:i});return Array.isArray(h.attachments)?h.attachments.filter(V):[]}function cb(p,b,i,h,w){let f=Kb(b,jb),L=w||f.truncated,O=f.text.endsWith(`
`)||!f.text?"":`
`;return`$ ${p}
${f.text}${O}[exit ${i} · ${h}ms${L?" · truncated":""}]`}function Kb(p,b){let i=new TextEncoder,h=i.encode(p);if(h.byteLength<=b)return{text:p,truncated:!1};let w=new TextDecoder().decode(h.slice(0,b));while(w&&i.encode(w).byteLength>b)w=w.slice(0,-1);return{text:w,truncated:!0}}async function Mb(p,b,i,h,w,f){let L=b.querySelector(".slash-pop"),O=b.querySelector(".slash-list"),l=Ui(h);if(l===null||!O){L?.setAttribute("hidden","");return}let T=w;if(!T.length){let $=await X(p,"commands",{});T=Array.isArray($.commands)?$.commands.filter(V):[],f(T)}if(i.value!==h)return;let H=T.filter(($)=>{return r($).slice(1).toLowerCase().includes(l)});gb(O,H,i,L),L?.toggleAttribute("hidden",H.length===0)}async function Wb(p,b,i,h){let w=b.querySelector(".prompt-file-ref-pop"),f=b.querySelector(".prompt-file-ref-list"),L=yi(h);if(L===null||!f){w?.setAttribute("hidden","");return}try{let O=await X(p,"searchFiles",{query:L,limit:Cb}),l=Array.isArray(O.files)?O.files.filter(V):[];if(i.value!==h)return;Pb(f,i,l,w),w?.toggleAttribute("hidden",l.length===0)}catch{w?.setAttribute("hidden","")}}function gb(p,b,i,h){p.replaceChildren(...b.map((w)=>{let f=document.createElement("button"),L=r(w);return f.type="button",f.className="slash-item",f.dataset.slash=L,f.innerHTML='<span class="sl-name"></span><span class="sl-desc"></span>',f.querySelector(".sl-name").textContent=L,f.querySelector(".sl-desc").textContent=w.description||"",f.addEventListener("click",()=>{i.value=w.template||`${L} `,h?.setAttribute("hidden",""),i.dispatchEvent(new(i.ownerDocument.defaultView?.Event||Event)("input",{bubbles:!0})),i.focus()}),f}))}function Pb(p,b,i,h){p.replaceChildren(...i.map((w)=>{let f=w.path||w.name||"",L=document.createElement("button");return L.type="button",L.className="prompt-file-ref-item",L.dataset.path=f,L.disabled=!f,L.innerHTML='<span class="pfr-path"></span><span class="pfr-kind"></span>',L.querySelector(".pfr-path").textContent=f,L.querySelector(".pfr-kind").textContent=typeof w.size==="number"?`${w.size} bytes`:"file",L.addEventListener("click",()=>{Bb(b,f),h?.setAttribute("hidden","")}),L}))}function Bb(p,b){if(!b)return;let{value:i,selectionStart:h}=p,w=i.slice(0,h),f=/(?:^|\s)@([^\s@`]*)$/.exec(w),L=f?h-(f[1]||"").length-1:h,O=`@${b} `;p.value=`${i.slice(0,L)}${O}${i.slice(h)}`;let l=L+O.length;p.setSelectionRange(l,l),p.dispatchEvent(new(p.ownerDocument.defaultView?.Event||Event)("input",{bubbles:!0})),p.focus()}function ri(p){return{input$:p.behaviorSubject("chat.input",""),submitted$:p.subject("chat.input.submitted"),activeSessionId$:p.behaviorSubject("session.activeId",null),sidebarSelectedSession$:p.behaviorSubject(Ap,vb()),toastRequested$:p.subject("toast.requested")}}function Wp(p){let b=[],i=new Set,h=/(^|[\s`])@([^\s@`]+)/g,w=h.exec(String(p||""));while(w!==null){let f=w[2]||"";if((w[1]||"")!=="`"&&f&&!i.has(f))i.add(f),b.push(f);w=h.exec(String(p||""))}return b}function xi(p=[],b=[]){let i=[],h=new Set;for(let w of[...p,...b]){let f=r(w);if(!f||h.has(f))continue;h.add(f),i.push(w)}return i}function I(p){return p.app?.piWebSidebar?.getSnapshot?.().activeWorkspaceId||p.app?.dataset.activeWorkspaceId||""}function vb(){return q({})}function q(p){let b=p.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),i=b?.activeSessionId||"",h=b?.activeWorkspaceId||"";if(i&&p.app?.dataset.clearedSessionId!==i)return{sessionId:i,workspaceId:h||void 0};return null}function D(p,b){if(b?.workspaceId&&p.app)p.app.dataset.activeWorkspaceId=b.workspaceId,Jp(ip,b.workspaceId);if(b?.sessionId)delete p.app?.dataset.clearedSessionId,p.app?.setAttribute("data-active-session-id",b.sessionId),Jp(cp,b.sessionId)}function gp(p){let b=q(p);if(b?.sessionId&&p.app)p.app.dataset.clearedSessionId=b.sessionId;p.app?.removeAttribute("data-active-session-id"),kb(cp),globalThis.piWeb?.behaviorSubject("session.activeId",null).next(null)}function P(p,b,i={}){let h=p.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),w={type:b,detail:i,snapshot:h};(p.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$)?.next(w),globalThis.piWeb?.subject(Qp).next(w)}function hp(p,b,i){let h=p.app?.dataset.activeWorkspaceId||I(p),w={reason:i,sessionId:b,workspaceId:h};globalThis.piWeb?.behaviorSubject("session.activeId",b).next(b),globalThis.piWeb?.subject("session.changed").next({sessionId:b,workspaceId:h,reason:i}),P(p,"active.start",w),P(p,"session.created",w)}function Jp(p,b){try{localStorage.setItem(p,b)}catch{}}function kb(p){try{localStorage.removeItem(p)}catch{}}async function X(p,b,i={},h=I(p)){if(!p.backend)return{};let w=await p.backend(b,{workspaceId:h,data:i});return V(w)?w:{}}function Fp(p){let b=Array.isArray(p.warnings)?p.warnings.filter((i)=>typeof i==="string"&&i.trim().length>0):[];for(let i of b)globalThis.piWeb?.subject("toast.requested").next({level:"warning",message:i})}function ui(p,b){return p.trim().startsWith("!")?[]:[...b]}async function rb(p,b,i,h,w,f){let L=dp(p,i),O=G(p);h.backendChatToken+=1,h.runEventsAbort?.abort();let l=new AbortController;h.runEventsAbort=l,h.sessionEventsAbort?.abort();let T={id:A(),role:"user",text:w,attachments:wb(f),createdAt:Date.now()},H=F(i,L);H.messages.push(T),H.updatedAt=Date.now(),E(i),j(b,H.messages,L);let $=await db(p,w,f,L,O.path,O.id);if(l.signal.aborted){Gp(i,L,T.id);return}if(Fp($),typeof $.activeSessionId==="string"&&$.activeSessionId){let J=L,_=i.activeSessionId===J;if(L=$.activeSessionId,_)Q(i,L),D(p,{sessionId:$.activeSessionId,workspaceId:O.id||void 0}),P(p,"chat-session",{reason:"startPrompt",sessionId:$.activeSessionId}),hp(p,$.activeSessionId,"startPrompt");else F(i,L);Ri(i,J,L,T.id)}if(typeof $.runId!=="string"||!$.runId){let J=await ab(p,w,f,L,O.path,O.id);if(l.signal.aborted){Gp(i,L,T.id);return}Fp(J);let _=pi(p,i,J,"submitPrompt",L);if(i.activeSessionId===L)j(b,_,L);if(h.runEventsAbort===l)h.runEventsAbort=void 0;return}let C=F(i,L),U=nb(C);try{await xb(p,i,C,$.runId,O.path,O.id,U,()=>{if(!l.signal.aborted&&i.activeSessionId===L)j(b,C.messages,L)},l.signal)}finally{if(h.runEventsAbort===l)h.runEventsAbort=void 0}if(!l.signal.aborted&&i.activeSessionId===L)m(p,b,i,h,L,O.path,O.id)}function Gp(p,b,i){let h=p.sessions.find((w)=>w.id===b);if(!h)return;h.messages=h.messages.filter((w)=>w.id!==i),ib(p,h.id),E(p)}async function xb(p,b,i,h,w,f,L,O,l){let T=await Bp(p,"streamEventsSse",{runId:h,cursor:0,workspacePath:w},l,f);if(!T)throw Error("SSE streaming backend did not return a stream");let H=Pp(O);L.streaming=!0,H.flush();try{await vp(T,($)=>{ob(L,[$]),L.streaming=$.type!=="run.end",i.updatedAt=Date.now(),E(b),H.request()})}finally{L.streaming=!1,E(b),H.flush()}}function Pp(p){let b=0,i,h=()=>{if(i)clearTimeout(i),i=void 0},w=()=>{h(),b=Date.now(),p()};return{request:()=>{let L=Jb-(Date.now()-b);if(L<=0){w();return}i||=setTimeout(w,L)},flush:w,cancel:h}}async function Bp(p,b,i={},h,w=I(p)){if(!p.backendStream)throw Error("SSE streaming backend is unavailable");let f=await p.backendStream(b,{workspaceId:w,data:i},{signal:h});return ub(f)}function ub(p){if(typeof ReadableStream<"u"&&p instanceof ReadableStream)return p;if(typeof Response<"u"&&p instanceof Response)return p.body;if(typeof p==="string")return Vp(p);if(!V(p))return null;let b=p.body;if(typeof ReadableStream<"u"&&b instanceof ReadableStream)return b;let i=p.sse;if(typeof i==="string")return Vp(i);return null}function Vp(p){let b=new TextEncoder().encode(p);return new ReadableStream({start(i){i.enqueue(b),i.close()}})}async function vp(p,b){let i=p.getReader(),h=new TextDecoder,w="";while(!0){let f=await i.read();if(f.done){w+=h.decode(),mb(w,b);return}w+=h.decode(f.value,{stream:!0});let L=Ib(w);w=L.remainder;for(let O of L.frames)kp(O,b)}}function Ib(p){let i=p.replaceAll(`\r
`,`
`).replaceAll("\r",`
`).split(`

`),h=i.pop()||"";return{frames:i,remainder:h}}function mb(p,b){let i=p.trim();if(i)kp(i,b)}function kp(p,b){let i=p.split(`
`).filter((h)=>h.startsWith("data:")).map((h)=>h.slice(5).trimStart()).join(`
`);if(!i)return;try{let h=JSON.parse(i);if(sb(h))b(h)}catch{}}function Up(p,b){globalThis.piWeb?.subject("chat.input.submitted").next({text:p,attachments:wb(b)||[]})}async function db(p,b,i,h,w=G(p).path,f=G(p).id){try{return await X(p,"startPrompt",rp(b,i,h,w),f)}catch(L){if(Sb(L))return{};throw L}}function Sb(p){return/unknown method: (startPrompt|streamEventsSse)|unsupported method: (startPrompt|streamEventsSse)|(startPrompt|streamEventsSse) unsupported/i.test(lp(p))}async function ab(p,b,i,h="",w=G(p).path,f=G(p).id){return await X(p,"submitPrompt",rp(b,i,h,w),f)}function rp(p,b,i,h){let w={text:p,attachments:b,sessionId:i};if(h)w.workspacePath=h;return w}function nb(p){let b=[...p.messages].reverse().find((h)=>h.role==="assistant"&&h.streaming);if(b)return b;let i={id:A(),role:"assistant",text:"",createdAt:Date.now(),streaming:!0};return p.messages.push(i),i}function ob(p,b){for(let i of b)if(i.type==="text.delta"&&typeof i.delta==="string")p.text+=i.delta;else if(i.type==="thinking.delta"&&typeof i.delta==="string")p.thinking=`${p.thinking||""}${i.delta}`;else if(i.type==="tool.start")e(p,i,"running");else if(i.type==="tool.delta"&&typeof i.delta==="string"){let h=e(p,i,"running");h.text=i.delta}else if(i.type==="tool.end"){let h=e(p,i,i.isError?"err":"ok");if(typeof i.result==="string"&&i.result)h.text=i.result}else if(i.type==="error"&&typeof i.message==="string")p.text+=`${p.text?`
`:""}${i.message}`}function e(p,b,i){let h=b.toolCallId||b.toolName||"tool";p.toolCalls||=[];let w=p.toolCalls.find((f)=>f.id===h);if(!w)w={id:h,name:b.toolName||"tool",args:b.args,text:"",status:i},p.toolCalls.push(w);if(w.status=i,tb(w,b))w.args=b.args,w.argsStatus=b.argsStatus;return w}function tb(p,b){if(!b.argsStatus)return Boolean(b.args);if(b.argsStatus==="unavailable")return!p.argsStatus;return!0}function sb(p){return V(p)&&typeof p.type==="string"}async function m(p,b,i,h,w="",f=wp(p),L=G(p).id){if(!p.backendStream){await yp(p,b,i,h,w,f);return}let O=++h.backendChatToken;h.sessionEventsAbort?.abort();let l=new AbortController;h.sessionEventsAbort=l;let T=Pp(()=>{j(b,B(i).messages,i.activeSessionId)});try{let H=await Bp(p,"sessionEventsSse",xp(p,w,f),l.signal,L);if(!H)throw Error("session SSE backend did not return a stream");await vp(H,($)=>{if(O!==h.backendChatToken||$.type!=="chat.state")return;if(Ip(p,i,eb($),"chatState").length)T.request()})}catch(H){if(!l.signal.aborted)await yp(p,b,i,h,w,f)}finally{if(T.cancel(),h.sessionEventsAbort===l)h.sessionEventsAbort=void 0}}async function yp(p,b,i,h,w="",f=wp(p)){let L=++h.backendChatToken;try{let O=await X(p,"chatState",xp(p,w,f));if(L!==h.backendChatToken)return;let l=Ip(p,i,O,"chatState");if(l.length)j(b,l,i.activeSessionId)}catch{}}function xp(p,b,i=wp(p)){let h=b?{sessionId:b}:{};if(i)h.workspacePath=i;return h}function eb(p){return{activeSessionId:p.activeSessionId,messages:p.messages,isStreaming:p.isStreaming}}function wp(p){return G(p).path}function G(p){let b=p.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),i=b?.activeWorkspaceId||p.app?.dataset.activeWorkspaceId||"",h=b?.workspaces?.find((w)=>w.id===i)?.path||"";return{id:i,path:h}}function up(p,b){let i=p.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),h=b.workspaceId||i?.activeWorkspaceId||p.app?.dataset.activeWorkspaceId||"",w=i?.workspaces?.find((f)=>f.id===h)?.path||"";if(w||h!==i?.activeWorkspaceId)return{id:h,path:w};return G(p)}function Ip(p,b,i,h){let w=Lp(i.messages);if(typeof i.activeSessionId==="string"&&i.activeSessionId){let O=b.activeSessionId;if(Q(b,i.activeSessionId),D(p,{sessionId:i.activeSessionId,workspaceId:p.app?.dataset.activeWorkspaceId||I(p)||void 0}),h!=="chatState"||O!==i.activeSessionId)P(p,"chat-session",{reason:h,sessionId:i.activeSessionId});if(h!=="chatState")hp(p,i.activeSessionId,h)}let f=B(b);if(!w.length)return[];let L=bb(f.messages,w).slice(-g);if(!mp(f.messages,L))return[];if(f.messages=L,f.title==="New chat"){let O=f.messages.find((l)=>l.role==="user");if(O)f.title=O.text.slice(0,48)||f.title}return f.updatedAt=Date.now(),E(b),f.messages}function mp(p,b){if(p.length!==b.length)return!0;return p.some((i,h)=>Rp(i)!==Rp(b[h]))}function Rp(p){return JSON.stringify({id:p.id,role:p.role,text:p.text,thinking:p.thinking,streaming:p.streaming,toolCalls:p.toolCalls,attachments:p.attachments})}function pi(p,b,i,h,w){let f=Lp(i.messages),L=typeof i.activeSessionId==="string"&&i.activeSessionId?i.activeSessionId:w,O=b.activeSessionId===w;if(L!==w)if(O)Q(b,L),D(p,{sessionId:L,workspaceId:G(p).id||void 0}),P(p,"chat-session",{reason:h,sessionId:L}),hp(p,L,h);else F(b,L);let l=F(b,L);if(!f.length)return[];let T=bb(l.messages,f).slice(-g);if(!mp(l.messages,T))return[];return l.messages=T,l.updatedAt=Date.now(),E(b),l.messages}function bi(p,b,i,h,w){let f=(T,H)=>{if(!T?.sessionId){if(!H)qp(b,i,h,w,!0);return}if(Sp(b,h,T))return;D(b,T),Q(h,T.sessionId),j(i,B(h).messages,h.activeSessionId);let $=up(b,T);m(b,i,h,w,T.sessionId,$.path,$.id)},L=(T)=>{if(ii(b,i,h,w,T))return;let H=wi(b,T);if(H)f(H,!1)},O=b.app?.piWebSidebar?.channels?.selectedSession$||globalThis.piWebSidebar?.channels?.selectedSession$,l=b.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$;if(O){let T=!0;p.add(O.subscribe((H)=>{f(H,T),T=!1}))}if(l)p.add(l.subscribe(L));if(b.app)p.listen(b.app,"pi-web-sidebar:session-created",(T)=>{let H=T.detail||{},$=typeof H.sessionId==="string"?H.sessionId:"",C=typeof H.workspaceId==="string"?H.workspaceId:"";if($)f({sessionId:$,workspaceId:C||void 0},!1)});if(globalThis.piWeb){let T=!0;p.add(globalThis.piWeb.behaviorSubject(Ap,q(b)).subscribe(($)=>{f($,T),T=!1})),p.add(globalThis.piWeb.subject(Qp).subscribe(L));let H=!0;p.add(globalThis.piWeb.behaviorSubject("session.activeId",null).subscribe(($)=>{if(!$){if(!H)qp(b,i,h,w,!1);H=!1;return}H=!1,f({sessionId:$,workspaceId:b.app?.dataset.activeWorkspaceId||hb(ip)||void 0},!1)}))}}function qp(p,b,i,h,w){if(h.backendChatToken+=1,h.runEventsAbort?.abort(),h.sessionEventsAbort?.abort(),i.activeSessionId="",E(i),w)gp(p);else{let f=q(p);if(f?.sessionId&&p.app)p.app.dataset.clearedSessionId=f.sessionId}d(b)}function dp(p,b){let i=q(p);if(i?.sessionId&&!Sp(p,b,i))D(p,i),Q(b,i.sessionId);if(!b.activeSessionId)return F(b,"",!0).id;return b.activeSessionId}function Sp(p,b,i){let h=i.workspaceId||"",w=p.app?.dataset.activeWorkspaceId||hb(ip)||"";return b.activeSessionId===i.sessionId&&(!h||h===w)}function ii(p,b,i,h,w){if(w.type!=="session.deleted")return!1;let f=ap(w);if(!f)return!0;let L=i.activeSessionId===f,O=i.sessions.length;if(i.sessions=i.sessions.filter((l)=>l.id!==f),L){h.runEventsAbort?.abort(),h.sessionEventsAbort?.abort();let l=hi(p,w,f);if(l?.sessionId){D(p,l),Q(i,l.sessionId),Li(b,B(i).messages,i.activeSessionId);let T=up(p,l);return m(p,b,i,h,l.sessionId,T.path,T.id),!0}return i.activeSessionId="",gp(p),E(i),d(b),!0}if(i.sessions.length!==O)E(i);return!0}function hi(p,b,i){let h=b.snapshot?.activeSessionId||"",w=b.snapshot?.activeWorkspaceId||"";if(h&&h!==i)return{sessionId:h,workspaceId:w||void 0};let f=q(p);if(f?.sessionId&&f.sessionId!==i)return f;return null}function wi(p,b){if(!fi(b.type))return null;let i=b.detail||{},h=ap(b)||b.snapshot?.activeSessionId||"",w=typeof i.workspaceId==="string"?i.workspaceId:b.snapshot?.activeWorkspaceId||p.app?.dataset.activeWorkspaceId||"";if(!h)return null;return{sessionId:h,workspaceId:w||void 0}}function ap(p){let b=p.detail||{};if(typeof b.sessionId==="string")return b.sessionId;if(typeof b.id==="string")return b.id;return""}function fi(p){return p==="session.selected"||p==="session.created"||p==="new-session"||p==="active.start"}function Q(p,b){let i=p.sessions.find((h)=>h.id===b);if(!i)i=S(b),p.sessions.unshift(i);return p.activeSessionId=i.id,E(p),i}function j(p,b,i){if(tp(b,i),!b.length){d(p);return}(p.querySelector(".term-inner")||p).replaceChildren(...b.map((w)=>op(w,i))),fp(p)}function Li(p,b,i){tp(b,i),(p.querySelector(".term-inner")||p).replaceChildren(...b.map((w)=>op(w,i))),fp(p)}function d(p){let b=p.querySelector(".term-inner")||p,i=document.createElement("article");i.className="pi-web-chat-docs",i.setAttribute("aria-label","pi-web-chat guide");let h=document.createElement("h1");h.textContent="pi-web-chat guide";let w=document.createElement("p");w.textContent=["Select or create a session in the sidebar to load chat history,","or type below to start a new session."].join(" ");let f=document.createElement("ul");for(let L of["Ask pi in the prompt box and press Cmd/Ctrl+Enter to send.","Type ! then Space at the start to turn the prompt yellow and run shell commands in the workspace.","Queued file attachments hide during shell mode and reappear for the next normal prompt.","Type @ to list project files, then pick one to tag it as prompt context.","Type / at the start to open the slash command list.","Chats are cached locally after you start or select a session."]){let O=document.createElement("li");O.textContent=L,f.append(O)}i.append(h,w,f),b.replaceChildren(i),fp(p)}function li(p,b){let i=b.querySelector(".term"),h=b.querySelector("[data-action='scroll-bottom']");if(!i||!h)return;let w={term:i,button:h,pinned:!0,touchStartY:null};bp.set(b,w),h.hidden=!1,u(w),p.listen(h,"click",()=>{w.pinned=!0,np(w),u(w)}),p.listen(i,"wheel",(f)=>{if(f.deltaY<0)Dp(w)}),p.listen(i,"touchstart",(f)=>{let L=f;w.touchStartY=L.touches.item(0)?.clientY??null}),p.listen(i,"touchmove",(f)=>{let O=f.touches.item(0)?.clientY;if(typeof O==="number"&&w.touchStartY!==null&&O-w.touchStartY>8)Dp(w)}),p.listen(i,"touchend",()=>{w.touchStartY=null}),p.add({remove:()=>{bp.delete(b)}})}function fp(p){let b=bp.get(p);if(!b)return;if(b.pinned)np(b);u(b)}function np(p){p.term.scrollTop=p.term.scrollHeight}function Dp(p){p.pinned=!1,u(p)}function u(p){p.button.dataset.pinned=p.pinned?"true":"false",p.button.setAttribute("aria-pressed",p.pinned?"true":"false")}function op(p,b){let i=document.createElement("article");i.className="transcript-item",i.dataset.messageId=p.id;let h=document.createElement("div");h.className="msg",h.dataset.kind=pp(p.role);let w=document.createElement("span");w.className=`prefix ${pp(p.role)}`,w.textContent=Vi(p.role);let f=document.createElement("pre");if(f.className=`body ${pp(p.role)}`,f.textContent=p.text,h.append(w,f),Oi(p))i.append(h);if(p.thinking)i.append(Ti(p.thinking,Boolean(p.streaming)));for(let L of p.toolCalls||[])i.append(Hi(L,sp(b,p,L)));if(p.streaming)i.dataset.streaming="true";return i}function Oi(p){let b=p.text.trim().length>0;return p.role!=="assistant"||b}function Ti(p,b){let i=document.createElement("details");i.className="msg-detail think thinking-block",i.open=b;let h=document.createElement("summary");h.className="label",h.textContent="THINKING";let w=document.createElement("pre");return w.className="body",w.textContent=p,i.append(h,w),i}function tp(p,b){let i=new Set;for(let h of p)for(let w of h.toolCalls||[])i.add(sp(b,h,w));for(let h of Y)if(!i.has(h))Y.delete(h)}function sp(p,b,i){return`${p}:${b.id}:${i.id}`}function Hi(p,b){let i=document.createElement("div");i.className="tool-card",i.dataset.tool=p.name||"tool",i.dataset.status=p.status;let h=!Y.has(b);i.dataset.collapsed=h?"true":"false";let w=document.createElement("button");if(w.type="button",w.className="tc-head",w.title=h?"Show tool output":"Hide tool output",w.setAttribute("aria-expanded",h?"false":"true"),w.setAttribute("aria-label",ep(p,h)),w.append(Ci(p),Ni(p),Zi(p),ji(p,h)),!h)i.append(pb(p));return w.addEventListener("click",()=>Ei(i,w,p,b)),i.prepend(w),i}function ep(p,b){let i=b?"Show":"Hide",h=p.status==="running"?"running":p.status==="err"?"failed":"done",w=$i(p),f=w?`, ${w}`:"";return`${i} ${p.name||"tool"} output, ${h}${f}`}function $i(p){if(p.argsStatus==="present")return"arguments present";if(p.argsStatus)return k(p);return p.args?"arguments present":""}function pb(p){let b=document.createElement("pre");return b.className="tc-body",b.textContent=p.text||n(p),b}function _i(p,b){let i=0,h,w=b.ownerDocument.defaultView,f=typeof w?.matchMedia==="function"?w.matchMedia("(prefers-reduced-motion: reduce)"):void 0,L=()=>{if(h)clearInterval(h),h=void 0},O=()=>{i=(i+1)%Kp;for(let H of b.querySelectorAll(".spinner"))H.dataset.frame=String(i)},l=()=>{let H=b.querySelectorAll(".spinner");if(f?.matches||H.length===0){L(),i=0;for(let $ of H)$.dataset.frame="0";return}if(!h)h=setInterval(O,Fb)},T=new(w?.MutationObserver||MutationObserver)(l);T.observe(b,{childList:!0,subtree:!0}),f?.addEventListener("change",l),l(),p.add({remove:()=>{T.disconnect(),f?.removeEventListener("change",l),L()}})}function zi(){let p=document.createElement("span");p.className="spinner",p.dataset.frame="0",p.setAttribute("aria-hidden","true");for(let b=0;b<Kp;b+=1)p.append(document.createElement("span"));return p}function Ei(p,b,i,h){let w=p.querySelector(".tc-body"),f=w!==null;if(w)w.remove(),Y.delete(h);else p.append(pb(i)),Y.add(h);p.dataset.collapsed=f?"true":"false",b.setAttribute("aria-expanded",f?"false":"true"),b.setAttribute("aria-label",ep(i,f)),b.title=f?"Show tool output":"Hide tool output";let L=b.querySelector(".tc-toggle-label");if(L)L.textContent=f?"show":"hide"}function Ci(p){let b=document.createElement("span");b.className="tc-glyph";let i=Ji(p),h=i?Gb[i]:"";if(!i||!h)return b.textContent="●",b;return b.innerHTML=`<svg class="tc-icon" data-tool-icon="${i}" aria-hidden="true" viewBox="0 0 24 24">${h}</svg>`,b}function Ni(p){let b=document.createElement("span");return b.className="tc-name",b.textContent=p.name||"tool",b}function Zi(p){let b=document.createElement("span");return b.className="tc-args",b.textContent=k(p),b}function ji(p,b){let i=document.createElement("span");if(i.className="tc-meta",p.status==="running"){let f=zi(),L=document.createElement("span");return L.className="running",L.textContent="running",i.append(f,L,Xp(b)),i}let h=document.createElement("span");h.className=p.status==="err"?"err":"ok",h.textContent=p.status==="err"?"✗":"✓";let w=document.createElement("span");return w.textContent=p.status==="err"?" · failed":" · done",i.append(h,w,Xp(b)),i}function Xp(p){let b=document.createElement("span");b.className="tc-toggle";let i=document.createElement("span");i.className="tc-toggle-label",i.textContent=p?"show":"hide";let h=document.createElement("span");return h.className="tc-caret",h.textContent="▸",b.append(i,h),b}function Ji(p){let b=Fi(p.name);if(["bash","shell","sh","zsh","terminal"].includes(b))return Gi(k(p).toLowerCase())||"terminal";return Vb[b]}function Fi(p){return p.trim().replace(/^functions\./,"").replace(/^multi_tool_use\./,"")}function Gi(p){if(/\bgit\b|\bgh\b/.test(p))return"git-branch";if(/\b(go test|bun test|npm test|pnpm test|yarn test|vitest|pytest|cargo test)\b/.test(p))return"circle-check";if(/\b(bun|npm|pnpm|yarn)\s+(run\s+)?build\b|\b(go build|cargo build)\b/.test(p))return"hammer";if(/\b(bun|npm|pnpm|yarn)\s+(add|install|i)\b|\bpip\s+install\b|\bgo\s+get\b/.test(p))return"package";return}function Vi(p){if(p==="assistant")return"pi >";if(p==="user")return"you >";if(p==="system")return"sys >";return"tool >"}function pp(p){if(p==="assistant")return"pi";if(p==="system")return"sys";return p}function Ui(p){let b=/^\/([^\s/]*)$/.exec(p);return b?b[1].toLowerCase():null}function yi(p){let b=/(?:^|\s)@([^\s@`]*)$/.exec(p);return b?b[1]:null}function Ii(p){return p.length>0}function mi(p,b){return p.trim().startsWith("!")&&b}function bb(p,b){let i=new Map;for(let h of p)i.set(h.id,h);for(let h of b)i.set(h.id,{...i.get(h.id),...h});return[...i.values()].sort((h,w)=>h.createdAt-w.createdAt)}function B(p){return F(p,p.activeSessionId,!0)}function F(p,b,i=!1){let h=p.sessions.find((w)=>w.id===b);if(!h)h=S(b||void 0),p.sessions.unshift(h),E(p);if(i||!p.activeSessionId)p.activeSessionId=h.id,E(p);return h}function Ri(p,b,i,h){if(b===i)return;let w=p.sessions.find((l)=>l.id===b),f=w?.messages.findIndex((l)=>l.id===h)??-1;if(!w||f<0)return;let[L]=w.messages.splice(f,1),O=F(p,i);if(!O.messages.some((l)=>l.id===L.id))O.messages.push(L);w.updatedAt=Date.now(),O.updatedAt=Date.now(),ib(p,w.id),E(p)}function ib(p,b){let i=p.sessions.find((h)=>h.id===b);if(!i||i.id===p.activeSessionId||i.messages.length>0||i.title!=="New chat")return;p.sessions=p.sessions.filter((h)=>h.id!==i.id)}function S(p=A()){let b=Date.now();return{id:p,title:"New chat",createdAt:b,updatedAt:b,messages:[]}}function hb(p){try{return localStorage.getItem(p)||""}catch{return""}}function qi(p){let b=S(p);return{activeSessionId:b.id,sessions:[b]}}function Di(){try{let p=JSON.parse(localStorage.getItem(x)||"null");if(p&&Array.isArray(p.sessions))return{activeSessionId:"",sessions:p.sessions.filter(fb).map(Lb)}}catch{}return{activeSessionId:"",sessions:[]}}function Xi(p=""){try{let b=JSON.parse(localStorage.getItem(x)||"null");if(b&&typeof b.activeSessionId==="string"&&Array.isArray(b.sessions)){let i=b.sessions.filter(fb).map(Lb);if(p&&!i.some((h)=>h.id===p))i.unshift(S(p));return{activeSessionId:p||b.activeSessionId,sessions:i}}}catch{}return qi(p||void 0)}function E(p){Yp(p);try{localStorage.setItem(x,JSON.stringify(p))}catch{for(let b of p.sessions)b.messages=b.messages.slice(-Math.floor(g/2));Yp(p);try{localStorage.setItem(x,JSON.stringify(p))}catch{}}}function wb(p){if(!p?.length)return;return p.map(({content:b,...i})=>i)}function Yp(p){p.sessions.sort((h,w)=>w.updatedAt-h.updatedAt);let b=p.sessions.find((h)=>h.id===p.activeSessionId),i=p.sessions.filter((h)=>h.id!==p.activeSessionId).slice(0,Math.max(0,Zp-1));p.sessions=b?[b,...i]:p.sessions.slice(0,Zp);for(let h of p.sessions)if(h.messages.length>g)h.messages.splice(0,h.messages.length-g)}function fb(p){return V(p)&&typeof p.id==="string"&&Array.isArray(p.messages)}function Lb(p){return{...p,messages:Lp(p.messages)}}function Lp(p){return Array.isArray(p)?p.filter(Ki).map(Yi):[]}function Yi(p){if(!Array.isArray(p.toolCalls)){let{toolCalls:b,...i}=p;return i}return{...p,toolCalls:p.toolCalls.filter(Ai)}}function Ai(p){if(!V(p)||typeof p.id!=="string"||typeof p.name!=="string")return!1;return typeof p.text==="string"&&ci(p.status)&&Qi(p.argsStatus)}function Qi(p){return p===void 0||p==="present"||p==="empty"||p==="unavailable"||p==="truncated"||p==="omitted"}function ci(p){return p==="running"||p==="ok"||p==="err"}function Ki(p){if(!V(p)||typeof p.id!=="string"||typeof p.text!=="string")return!1;return typeof p.createdAt==="number"&&Mi(p.role)}function Mi(p){return p==="user"||p==="assistant"||p==="tool"||p==="system"}function V(p){return typeof p==="object"&&p!==null}function A(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`}function Wi(p){return p instanceof Error&&(p.name==="AbortError"||/aborted|abort/i.test(p.message))}function lp(p){return p instanceof Error?p.message:String(p)}export{k as toolArgsInlineText,n as toolArgsBodyText,ui as submittedAttachmentsForText,mi as shellAttachmentNoteVisible,Hb as setComposerMode,Ob as renderMessages,_b as promptFromAgUiLikeRunInput,Ep as pluginStyleText,a as pluginClass,xi as mergeCommands,Ii as hasQueuedAttachmentNames,I as getActiveWorkspaceId,cb as formatShellOutput,Wp as extractRefs,Ub as default,_p as createComposerSurface,$p as createChatSurface,lb as createChatDom,ri as createChannels,$b as createAgUiLikeRunInput,r as commandName,zb as chatEventsToAgUiLikeEvents,X as backendCall};
