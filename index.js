var l={attachFile:["M16.5 6v11.5a4 4 0 0 1-8 0V5a2.5 2.5 0 0 1 5 0v10.5a1 1 0 0 1-2 0V6H10v9.5","a2.5 2.5 0 0 0 5 0V5a4 4 0 0 0-8 0v12.5a5.5 5.5 0 0 0 11 0V6h-1.5Z"].join(""),stop:"M6 6h12v12H6V6Z",send:"M2 21 23 12 2 3v7l15 2-15 2v7Z",terminal:"M3 4h18v16H3V4Zm2 2v12h14V6H5Zm2 3 1.1-1.1L12.2 12l-4.1 4.1L7 15l3-3-3-3Zm6 6h5v1.5h-5V15Z",file:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 2.5L17.5 8H14V4.5ZM8 13h8v1.5H8V13Zm0 3h8v1.5H8V16Z"},P={attachFile:K("attach_file",l.attachFile),stop:K("stop",l.stop),send:K("send",l.send),terminal:K("terminal",l.terminal)};function K(p,b){return`<svg class="material-icon" data-material-icon="${p}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="${b}"></path></svg>`}function n(){return"pi-web-chat-mounted"}function qp(){let p=document.createElement("main");return p.className="main pi-web-chat-surface",p.dataset.main="session",p.dataset.pluginChatRoot="",p.innerHTML='<div class="term"><div class="term-inner" role="log" aria-live="polite" aria-relevant="additions text"></div></div><button type="button" class="scroll-bottom-btn" data-action="scroll-bottom" aria-label="stick to bottom" title="stick to bottom" aria-pressed="true" hidden>↓</button>',p}function Up(){let p=document.createElement("section");return p.className="prompt-region pi-web-chat-composer",p.innerHTML=`
    <div class="slash-pop" hidden><div class="slash-head">slash commands · type to filter</div><div class="slash-list"></div></div>
    <div class="prompt-file-ref-pop" hidden><div class="slash-head">project files · type to filter</div><div class="prompt-file-ref-list"></div></div>
    <div class="prompt-bar">
      <button class="attach-btn" type="button" aria-label="attach files" title="attach files">${P.attachFile}</button>
      <input type="file" multiple hidden data-file-input />
      <div class="prompt-input-col"><div class="attach-chips" hidden></div><div class="shell-attachment-note" aria-live="polite" hidden>queued attachments are hidden during shell mode and will reappear for the next normal prompt</div><textarea class="prompt-textarea" aria-label="Prompt" placeholder="ask pi to do something…" rows="1"></textarea></div>
      <div class="prompt-actions">
        <button class="stop-btn" type="button" aria-label="stop" title="stop" hidden>${P.stop}</button>
        <button class="mic-btn" type="button" data-action="toggle-speech-input" aria-label="start voice input" title="voice input" hidden>\uD83C\uDF99</button>
        <button class="send-btn" type="button" aria-label="send" title="send" aria-disabled="true">${P.send}</button>
      </div>
      <div class="drop-overlay" hidden><span>drop to attach</span></div>
    </div>
    <div class="prompt-meta" data-prompt-meta>— | <span class="prompt-meta-item prompt-meta-branch"><span>—</span></span></div>`,p}function Yp(p){let b=document.createElement("span");return b.className="prompt-meta-item pi-web-chat-badge",b.textContent="chat plugin",p.querySelector("[data-prompt-meta]")?.append(b),b}function Jb(){let p=document.createElement("section");return p.className="pi-web-chat-root",p.dataset.plugin="pi-web-chat",p.innerHTML=`
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
        <button class="pi-web-chat-icon-btn" type="button" data-attach aria-label="attach files" title="attach files">${K("attach_file",l.attachFile)}</button>
        <input type="file" multiple hidden data-file-input />
        <textarea class="pi-web-chat-textarea" data-chat-input aria-label="Prompt" placeholder="ask pi to do something…" rows="1"></textarea>
        <button class="pi-web-chat-send" type="button" data-send aria-label="send" title="send" aria-disabled="true">${K("send",l.send)}</button>
      </div>
    </section>`,{root:p,transcript:G(p.querySelector("[data-chat-transcript]")),textarea:G(p.querySelector("[data-chat-input]")),sendButton:G(p.querySelector("[data-send]")),attachButton:G(p.querySelector("[data-attach]")),fileInput:G(p.querySelector("[data-file-input]")),slashPopover:G(p.querySelector("[data-slash-popover]")),slashList:G(p.querySelector("[data-slash-list]")),refsPopover:G(p.querySelector("[data-refs-popover]")),refsList:G(p.querySelector("[data-refs-list]")),attachments:G(p.querySelector("[data-attachments]"))}}function Db(p,b){p.replaceChildren(...b.map(qb)),p.scrollTop=p.scrollHeight}function qb(p){let b=document.createElement("article");b.className=`pi-web-chat-message pi-web-chat-message-${p.role}`,b.dataset.messageId=p.id;let f=document.createElement("div");f.className="pi-web-chat-message-role",f.textContent=p.role;let w=document.createElement("pre");if(w.className="pi-web-chat-message-body",w.textContent=p.text,b.append(f,w),p.thinking){let h=document.createElement("details");h.className="pi-web-chat-thinking",h.open=Boolean(p.streaming);let L=document.createElement("summary");L.textContent="thinking";let O=document.createElement("pre");O.textContent=p.thinking,h.append(L,O),b.append(h)}if(p.toolCalls?.length){let h=document.createElement("div");h.className="pi-web-chat-tools";for(let L of p.toolCalls){let O=document.createElement("details");O.className=`pi-web-chat-tool pi-web-chat-tool-${L.status}`,O.open=L.status==="running";let T=document.createElement("summary");T.textContent=`${L.name} · ${L.status}`;let _=document.createElement("pre");_.textContent=L.text||o(L),O.append(T,_),h.append(O)}b.append(h)}if(p.streaming){let h=document.createElement("div");h.className="pi-web-chat-message-meta",h.textContent="streaming...",b.append(h)}if(p.attachments?.length){let h=document.createElement("div");h.className="pi-web-chat-message-meta",h.textContent=`${p.attachments.length} attachment(s)`,b.append(h)}return b}function g(p){if(p.argsStatus==="truncated")return"arguments truncated";if(p.argsStatus==="omitted")return"arguments omitted";if(p.argsStatus==="unavailable")return"arguments unavailable";if(p.argsStatus==="empty")return"no arguments";if(!p.args)return"";return JSON.stringify(p.args)}function o(p){if(p.argsStatus==="truncated")return"arguments truncated: too large to display";if(p.argsStatus==="omitted")return"arguments omitted: response too large";if(p.argsStatus==="unavailable")return"arguments unavailable";if(p.argsStatus==="empty")return"no arguments";if(!p.args)return"arguments unavailable";return JSON.stringify(p.args,null,2)}function Ub(p,b){p.root.dataset.composerMode=b,t(p.attachButton,b)}function t(p,b){if(p.disabled=b==="shell",p.setAttribute("aria-disabled",b==="shell"?"true":"false"),b==="shell"){p.innerHTML=P.terminal,p.title="shell command mode",p.setAttribute("aria-label","shell command mode");return}if(b==="file-ref"){p.innerHTML=K("file",l.file),p.title="file reference mode",p.setAttribute("aria-label","file reference mode");return}p.innerHTML=P.attachFile,p.title="attach files",p.setAttribute("aria-label","attach files")}function s(p,b){p.hidden=b.length===0,p.replaceChildren(...b.map((f)=>{let w=document.createElement("span");return w.className="pi-web-chat-attachment-chip",w.textContent=f,w}))}function Xp(){return`
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
  `}function Qp(){document.getElementById("pi-web-chat-style")?.remove();let p=document.createElement("style");return p.id="pi-web-chat-style",p.textContent=Xp(),document.head.append(p),p}function r(p){return p.command||p.cmd||(p.name?`/${p.name}`:"")}function G(p){if(!p)throw Error("pi-web-chat DOM template is invalid");return p}function Yb(p,b,f){return{threadId:p,runId:b,state:{},messages:f,tools:[],context:[]}}function Xb(p){let b=[...p.messages].reverse().find((f)=>f.role==="user");return{text:b?.text||"",attachments:b?.attachments||[],sessionId:p.threadId}}function Qb(p,b,f){return p.map((w)=>lb(w,b,f))}function lb(p,b,f){if(p.type==="text.delta")return{type:"TEXT_MESSAGE_CONTENT",threadId:b,runId:f,delta:p.delta||""};if(p.type==="thinking.delta")return{type:"THINKING_MESSAGE_CONTENT",threadId:b,runId:f,delta:p.delta||""};if(p.type==="tool.start")return{type:"TOOL_CALL_START",threadId:b,runId:f,toolCallId:p.toolCallId,payload:lp(p)};if(p.type==="tool.delta")return{type:"TOOL_CALL_ARGS",threadId:b,runId:f,toolCallId:p.toolCallId,delta:p.delta||""};if(p.type==="tool.end")return{type:"TOOL_CALL_END",threadId:b,runId:f,toolCallId:p.toolCallId,payload:lp(p)};return{type:p.type.toUpperCase().replaceAll(".","_"),threadId:b,runId:f,payload:p}}function lp(p){return{name:p.toolName||"tool",args:p.args||{},result:p.result||"",isError:p.isError===!0}}var u="pi-web-chat.sessions.v1";var rp="plugin.pi-web-sidebar.selectedSession",up="plugin.pi-web-sidebar.event",Ip="plugin.pi-web-sidebar.activeSessionId",_p="plugin.pi-web-sidebar.activeWorkspaceId",Kb=12,Kp=20,v=200,ip=200,Eb=8,Wb=1e6,Bb=64000;var Mb=250,Sp=6,Pb=150,B=new Set,Ep=new WeakMap,vb={"book-open":'<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',"file-plus":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="M9 15h6"/>',pencil:'<path d="M21.2 6.8 17.2 2.8a2 2 0 0 0-2.8 0L3 14.2V21h6.8L21.2 9.6a2 2 0 0 0 0-2.8z"/><path d="m14 5 5 5"/>',terminal:'<path d="m4 17 6-6-6-6"/><path d="M12 19h8"/>',cpu:'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 15h3"/><path d="M1 9h3"/><path d="M1 15h3"/>',globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 0 20"/><path d="M12 2a15.3 15.3 0 0 0 0 20"/>',search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',braces:'<path d="M8 3H7a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-4a2 2 0 0 1 2-2 2 2 0 0 1-2-2V7a2 2 0 0 0-2-2h-1"/>',"file-text":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',"circle-question-mark":'<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 1 1 5.8 1c-.5 1-1.4 1.5-2.1 2-.6.4-.8.8-.8 2"/><path d="M12 17h.01"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',plug:'<path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a6 6 0 0 1-12 0V8Z"/>',"git-branch":'<line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',"circle-check":'<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',hammer:'<path d="m15 12-8.5 8.5a2.1 2.1 0 0 1-3-3L12 9"/><path d="m17.6 5.4 1.8-1.8"/><path d="m14 7 3 3"/><path d="M5 11 2 8l6-6 3 3"/>',package:'<path d="m7.5 4.3 9 5.2"/><path d="M21 8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>'},wp=new WeakMap,kb={read:"book-open",write:"file-plus",edit:"pencil",ctx_execute:"cpu",ctx_batch_execute:"cpu",ctx_execute_file:"cpu",ctx_search:"cpu",ctx_index:"cpu",ctx_fetch_and_index:"cpu",web_search:"globe",fetch_content:"search",get_search_content:"search",code_search:"braces",document_parse:"file-text",ask_user_question:"circle-question-mark",teams:"users",subagent:"users",mcp:"plug",git:"git-branch"};class mp{#p=[];add(p){if(p)this.#p.push(p);return p}listen(p,b,f){p.addEventListener(b,f),this.add({remove:()=>p.removeEventListener(b,f)})}dispose(){for(let p of this.#p.splice(0).reverse())if(typeof p==="function")p();else if("unsubscribe"in p)p.unsubscribe();else p.remove()}}function xb(p={}){let b=p.app;if(b?.piWebChat?.dispose(),typeof p.mount?.chat!=="function"||typeof p.mount?.composer!=="function")throw Error("pi-web-chat requires modern pi-web mount.chat and mount.composer APIs");return cb(p,b)}function cb(p,b){let f=new mp,w=f.add(Qp()),h=qp(),L=Up(),O=p.mount?.chat(h,{replace:!0}),T=p.mount?.composer(L,{replace:!0});if(U1(f,h),P1(f,h),O)f.add(O);if(T)f.add(T);let _=E(p);W(p,_||void 0);let i=_?.sessionId?e1(_.sessionId):s1(),C={backendChatToken:0,pendingPromptEchoIds:new Map};if(!_?.sessionId)d(h);else A(h,x(i).messages,i.activeSessionId),m(p,h,i,C,_.sessionId);F1(f,p,h,i,C),gb(f,p,L,h,i,C);let H=b?f.add(Yp(b)):void 0;b?.classList.add(n());let R=()=>{if(C.runEventsAbort?.abort(),C.sessionEventsAbort?.abort(),f.dispose(),B.clear(),H?.remove(),w.remove(),b?.classList.remove(n()),b?.piWebChat===y)delete b.piWebChat},y={dispose:R};if(b)b.piWebChat=y;return R}function gb(p,b,f,w,h,L){let O=f.querySelector(".prompt-textarea"),T=f.querySelector(".send-btn"),_=f.querySelector(".attach-btn"),i=f.querySelector("[data-file-input]"),C=f.querySelector(".attach-chips"),H=f.querySelector(".shell-attachment-note");if(!O||!T)return;let R=f.querySelector(".prompt-bar"),y=f.querySelector(".slash-pop"),U=f.querySelector(".prompt-file-ref-pop"),$={selectedAttachments:[],shellMode:!1,commands:[]},V=()=>{rb(C,O.value,$)},X=()=>{ub(R,O,_,H,$)},j=()=>{let Z=O.value,z=Boolean(L.startingRunSessionId||L.fallbackSubmittingSessionId);if(T.disabled=z,T.setAttribute("aria-disabled",Z.trim()&&!z?"false":"true"),V(),Wp($),$.shellMode){e(y,U);return}ob(b,f,O,Z,$.commands,(Q)=>{$.commands=Q}),$.fileSearchTimer=setTimeout(()=>{tb(b,f,O,O.value)},120)},c=()=>{$.shellMode=!0,e(y,U),X(),V()},Jp=()=>{$.shellMode=!1,X(),V()},Dp=async(Z)=>{Z?.preventDefault(),Z?.stopImmediatePropagation();let z=O.value.trim();if(j(),L.resolvingSubmit||L.startingRunSessionId||L.fallbackSubmittingSessionId)return;if(!z){O.value="",j();return}if(L.resolvingSubmit=!0,O.value="",i)i.value="";j();try{if($.shellMode)Pp(z,[]),await mb(b,w,h,z),Jp();else{let Q=[...$.selectedAttachments,...await db(b,z)];$.selectedAttachments=[],V(),Pp(z,Q);let Gb=w1(b,w,h,L,z,Q);L.resolvingSubmit=!1,await Gb}}catch(Q){if(!T0(Q))A(w,[Ib(Q)],h.activeSessionId)}finally{L.resolvingSubmit=!1,X(),j()}};if(p.listen(O,"input",()=>{if(!$.shellMode&&O.value.startsWith("! "))O.value=O.value.slice(2),c();j()}),p.listen(O,"keydown",(Z)=>{let z=Z;if(z.key===" "&&!$.shellMode&&O.value==="!"&&O.selectionStart===1&&O.selectionEnd===1){z.preventDefault(),O.value="",c(),j();return}if(z.key==="Backspace"&&$.shellMode&&O.value===""){z.preventDefault(),Jp(),j();return}if(z.key==="Escape"){e(y,U);return}if(z.key==="Enter"&&(z.metaKey||z.ctrlKey))Dp(z)}),p.listen(T,"click",(Z)=>{Dp(Z)}),_&&i)p.listen(_,"click",()=>{if(!$.shellMode)i.click()}),p.listen(i,"change",()=>{Sb(i,(Z)=>{$.selectedAttachments=Z,V()})});p.add({remove:()=>Wp($)}),X()}function rb(p,b,f){if(!p)return;if(f.shellMode){s(p,[]);return}s(p,[...f.selectedAttachments.map((w)=>w.name||"attachment"),...dp(b)])}function ub(p,b,f,w,h){if(p?.classList.toggle("shell-mode",h.shellMode),b.setAttribute("placeholder",h.shellMode?"run shell command in workspace…":"ask pi to do something…"),w)w.hidden=!(h.shellMode&&h.selectedAttachments.length>0);if(f)t(f,h.shellMode?"shell":"normal")}function Wp(p){if(p.fileSearchTimer)clearTimeout(p.fileSearchTimer),p.fileSearchTimer=void 0}function e(p,b){p?.setAttribute("hidden",""),b?.setAttribute("hidden","")}function Ib(p){return{id:q(),role:"system",text:`prompt failed: ${Gp(p)}`,createdAt:Date.now()}}async function Sb(p,b){let f=Array.from(p.files||[]).slice(0,Eb),w=[];for(let h of f){if(h.size>Wb)continue;w.push({name:h.name,size:h.size,content:await h.text(),mimeType:h.type||void 0})}b(w)}async function mb(p,b,f,w){let h=hb(p,f),L=J(f,h),O={id:q(),role:"user",text:`! ${w}`,createdAt:Date.now()},T={id:q(),role:"tool",text:`$ ${w}
(running...)`,createdAt:Date.now()};L.messages.push(O,T),L.updatedAt=Date.now(),N(f),A(b,L.messages,h);try{let _=await Y(p,"runShell",{command:w}),i=typeof _.exitCode==="number"?_.exitCode:1,C=typeof _.durationMs==="number"?_.durationMs:0,H=typeof _.output==="string"?_.output:"";T.text=ab(w,H,i,C,Boolean(_.truncated))}catch(_){T.text=`$ ${w}
${Gp(_)}`}L.updatedAt=Date.now(),N(f),A(b,L.messages,h)}async function db(p,b){let f=dp(b);if(!f.length)return[];let w=await Y(p,"resolveContext",{text:b,refs:f});return Array.isArray(w.attachments)?w.attachments.filter(D):[]}function ab(p,b,f,w,h){let L=nb(b,Bb),O=h||L.truncated,T=L.text.endsWith(`
`)||!L.text?"":`
`;return`$ ${p}
${L.text}${T}[exit ${f} · ${w}ms${O?" · truncated":""}]`}function nb(p,b){let f=new TextEncoder,w=f.encode(p);if(w.byteLength<=b)return{text:p,truncated:!1};let h=new TextDecoder().decode(w.slice(0,b));while(h&&f.encode(h).byteLength>b)h=h.slice(0,-1);return{text:h,truncated:!0}}async function ob(p,b,f,w,h,L){let O=b.querySelector(".slash-pop"),T=b.querySelector(".slash-list"),_=d1(w);if(_===null||!T){O?.setAttribute("hidden","");return}let i=h;if(!i.length){let H=await Y(p,"commands",{});i=Array.isArray(H.commands)?H.commands.filter(D):[],L(i)}if(f.value!==w)return;let C=i.filter((H)=>{return r(H).slice(1).toLowerCase().includes(_)});sb(T,C,f,O),O?.toggleAttribute("hidden",C.length===0)}async function tb(p,b,f,w){let h=b.querySelector(".prompt-file-ref-pop"),L=b.querySelector(".prompt-file-ref-list"),O=a1(w);if(O===null||!L){h?.setAttribute("hidden","");return}try{let T=await Y(p,"searchFiles",{query:O,limit:Kb}),_=Array.isArray(T.files)?T.files.filter(D):[];if(f.value!==w)return;eb(L,f,_,h),h?.toggleAttribute("hidden",_.length===0)}catch{h?.setAttribute("hidden","")}}function sb(p,b,f,w){p.replaceChildren(...b.map((h)=>{let L=document.createElement("button"),O=r(h);return L.type="button",L.className="slash-item",L.dataset.slash=O,L.innerHTML='<span class="sl-name"></span><span class="sl-desc"></span>',L.querySelector(".sl-name").textContent=O,L.querySelector(".sl-desc").textContent=h.description||"",L.addEventListener("click",()=>{f.value=h.template||`${O} `,w?.setAttribute("hidden",""),f.dispatchEvent(new(f.ownerDocument.defaultView?.Event||Event)("input",{bubbles:!0})),f.focus()}),L}))}function eb(p,b,f,w){p.replaceChildren(...f.map((h)=>{let L=h.path||h.name||"",O=document.createElement("button");return O.type="button",O.className="prompt-file-ref-item",O.dataset.path=L,O.disabled=!L,O.innerHTML='<span class="pfr-path"></span><span class="pfr-kind"></span>',O.querySelector(".pfr-path").textContent=L,O.querySelector(".pfr-kind").textContent=typeof h.size==="number"?`${h.size} bytes`:"file",O.addEventListener("click",()=>{p1(b,L),w?.setAttribute("hidden","")}),O}))}function p1(p,b){if(!b)return;let{value:f,selectionStart:w}=p,h=f.slice(0,w),L=/(?:^|\s)@([^\s@`]*)$/.exec(h),O=L?w-(L[1]||"").length-1:w,T=`@${b} `;p.value=`${f.slice(0,O)}${T}${f.slice(w)}`;let _=O+T.length;p.setSelectionRange(_,_),p.dispatchEvent(new(p.ownerDocument.defaultView?.Event||Event)("input",{bubbles:!0})),p.focus()}function R0(p){return{input$:p.behaviorSubject("chat.input",""),submitted$:p.subject("chat.input.submitted"),activeSessionId$:p.behaviorSubject("session.activeId",null),sidebarSelectedSession$:p.behaviorSubject(rp,b1()),toastRequested$:p.subject("toast.requested")}}function dp(p){let b=[],f=new Set,w=/(^|[\s`])@([^\s@`]+)/g,h=w.exec(String(p||""));while(h!==null){let L=h[2]||"";if((h[1]||"")!=="`"&&L&&!f.has(L))f.add(L),b.push(L);h=w.exec(String(p||""))}return b}function z0(p=[],b=[]){let f=[],w=new Set;for(let h of[...p,...b]){let L=r(h);if(!L||w.has(L))continue;w.add(L),f.push(h)}return f}function S(p){return p.app?.piWebSidebar?.getSnapshot?.().activeWorkspaceId||p.app?.dataset.activeWorkspaceId||""}function b1(){return E({})}function E(p){let b=p.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),f=b?.activeSessionId||"",w=b?.activeWorkspaceId||"";if(f&&p.app?.dataset.clearedSessionId!==f)return{sessionId:f,workspaceId:w||void 0};return null}function W(p,b){if(b?.workspaceId&&p.app)p.app.dataset.activeWorkspaceId=b.workspaceId,Bp(_p,b.workspaceId);if(b?.sessionId)delete p.app?.dataset.clearedSessionId,p.app?.setAttribute("data-active-session-id",b.sessionId),Bp(Ip,b.sessionId)}function ap(p){let b=E(p);if(b?.sessionId&&p.app)p.app.dataset.clearedSessionId=b.sessionId;p.app?.removeAttribute("data-active-session-id"),f1(Ip),globalThis.piWeb?.behaviorSubject("session.activeId",null).next(null)}function k(p,b,f={}){let w=p.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),h={type:b,detail:f,snapshot:w};(p.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$)?.next(h),globalThis.piWeb?.subject(up).next(h)}function Cp(p,b,f){let w=p.app?.dataset.activeWorkspaceId||S(p),h={reason:f,sessionId:b,workspaceId:w};globalThis.piWeb?.behaviorSubject("session.activeId",b).next(b),k(p,"active.start",h),k(p,"session.created",h)}function Hp(p,b){globalThis.piWeb?.subject("session.changed").next({sessionId:p,name:b,title:b})}function $p(p){if(p.title!=="New chat")return"";let f=p.messages.find((w)=>w.role==="user")?.text.slice(0,48)||"";if(!f)return"";return p.title=f,f}function Bp(p,b){try{localStorage.setItem(p,b)}catch{}}function f1(p){try{localStorage.removeItem(p)}catch{}}async function Y(p,b,f={},w=S(p)){if(!p.backend)return{};let h=await p.backend(b,{workspaceId:w,data:f});return D(h)?h:{}}function hp(p){let b=Array.isArray(p.warnings)?p.warnings.filter((f)=>typeof f==="string"&&f.trim().length>0):[];for(let f of b)globalThis.piWeb?.subject("toast.requested").next({level:"warning",message:f})}function N0(p,b){return p.trim().startsWith("!")?[]:[...b]}async function w1(p,b,f,w,h,L){let O=hb(p,f),T=F(p);if(w.activeRunId&&w.activeRunSessionId===O){await h1(p,b,f,w,h,L,T.path,T.id);return}if(w.startingRunSessionId===O||w.fallbackSubmittingSessionId===O)return;w.backendChatToken+=1,w.startingRunSessionId=O,w.runEventsAbort?.abort();let _=new AbortController;w.runEventsAbort=_,w.sessionEventsAbort?.abort();let i={id:q(),role:"user",text:h,attachments:Vp(L),createdAt:Date.now()},C=J(f,O);Nb(w.pendingPromptEchoIds,O,i.id),C.messages.push(i),C.updatedAt=Date.now(),N(f),A(b,C.messages,O);let H;try{H=await i1(p,h,L,O,T.path,T.id)}catch($){throw w.startingRunSessionId=void 0,$}if(_.signal.aborted){w.startingRunSessionId=void 0,Lp(f,O,i.id);return}if(hp(H),typeof H.activeSessionId==="string"&&H.activeSessionId){let $=O,V=f.activeSessionId===$;if(O=H.activeSessionId,V)M(f,O),W(p,{sessionId:H.activeSessionId,workspaceId:T.id||void 0}),k(p,"chat-session",{reason:"startPrompt",sessionId:H.activeSessionId}),Cp(p,H.activeSessionId,"startPrompt");else J(f,O);yb(f,$,O,i.id),o1(w.pendingPromptEchoIds,$,O)}if(typeof H.runId!=="string"||!H.runId){w.startingRunSessionId=void 0,w.fallbackSubmittingSessionId=O;let $;try{$=await C1(p,h,L,O,T.path,T.id)}catch(c){throw w.fallbackSubmittingSessionId=void 0,c}if(_.signal.aborted){w.fallbackSubmittingSessionId=void 0,Lp(f,O,i.id);return}hp($);let V=typeof $.activeSessionId==="string"&&$.activeSessionId?$.activeSessionId:O,X=Zp(w.pendingPromptEchoIds,O),j=Z1(p,f,$,"submitPrompt",O,X);if(Fp(w.pendingPromptEchoIds,V,j,$.messages,X),f.activeSessionId===O||f.activeSessionId===V)A(b,j,f.activeSessionId);if(w.runEventsAbort===_)w.runEventsAbort=void 0;w.startingRunSessionId=void 0,w.fallbackSubmittingSessionId=void 0;return}let R=J(f,O);w.activeRunId=H.runId,w.activeRunSessionId=O,w.startingRunSessionId=void 0;let y=$p(R);if(y)N(f),Hp(O,y);let U=$1(R);try{await L1(p,f,R,H.runId,T.path,T.id,U,()=>{if(!_.signal.aborted&&f.activeSessionId===O)A(b,R.messages,O)},_.signal)}finally{if(w.activeRunId===H.runId)w.activeRunId=void 0,w.activeRunSessionId=void 0,w.startingRunSessionId=void 0,w.fallbackSubmittingSessionId=void 0;if(w.runEventsAbort===_)w.runEventsAbort=void 0}if(!_.signal.aborted&&f.activeSessionId===O)m(p,b,f,w,O,T.path,T.id)}async function h1(p,b,f,w,h,L,O,T){let{activeRunId:_,activeRunSessionId:i}=w;if(!_||!i)throw Error("active run is unavailable for steering");let C={id:q(),role:"user",text:h,attachments:Vp(L),createdAt:Date.now()},H=J(f,i);if(Nb(w.pendingPromptEchoIds,i,C.id),H.messages.push(C),H.updatedAt=Date.now(),N(f),f.activeSessionId===i)A(b,H.messages,i);try{let R=await H1(p,_,h,L,i,O,T);hp(R)}catch(R){if(Lp(f,i,C.id),ep(R)){A(b,H.messages,i),globalThis.piWeb?.subject("toast.requested").next({level:"error",message:"This backend does not support steering while a response is streaming."});return}throw R}}function Lp(p,b,f){let w=p.sessions.find((h)=>h.id===b);if(!w)return;w.messages=w.messages.filter((h)=>h.id!==f),Ab(p,w.id),N(p)}async function L1(p,b,f,w,h,L,O,T,_){let i=await op(p,"streamEventsSse",{runId:w,cursor:0,workspacePath:h},_,L);if(!i)throw Error("SSE streaming backend did not return a stream");let C=np(T);O.streaming=!0,C.flush();try{await tp(i,(H)=>{R1(O,[H]),O.streaming=H.type!=="run.end",f.updatedAt=Date.now(),N(b),C.request()})}finally{O.streaming=!1,N(b),C.flush()}}function np(p){let b=0,f,w=()=>{if(f)clearTimeout(f),f=void 0},h=()=>{w(),b=Date.now(),p()};return{request:()=>{let O=Mb-(Date.now()-b);if(O<=0){h();return}f||=setTimeout(h,O)},flush:h,cancel:w}}async function op(p,b,f={},w,h=S(p)){if(!p.backendStream)throw Error("SSE streaming backend is unavailable");let L=await p.backendStream(b,{workspaceId:h,data:f},{signal:w});return O1(L)}function O1(p){if(typeof ReadableStream<"u"&&p instanceof ReadableStream)return p;if(typeof Response<"u"&&p instanceof Response)return p.body;if(typeof p==="string")return Mp(p);if(!D(p))return null;let b=p.body;if(typeof ReadableStream<"u"&&b instanceof ReadableStream)return b;let f=p.sse;if(typeof f==="string")return Mp(f);return null}function Mp(p){let b=new TextEncoder().encode(p);return new ReadableStream({start(f){f.enqueue(b),f.close()}})}async function tp(p,b){let f=p.getReader(),w=new TextDecoder,h="";while(!0){let L=await f.read();if(L.done){h+=w.decode(),_1(h,b);return}h+=w.decode(L.value,{stream:!0});let O=T1(h);h=O.remainder;for(let T of O.frames)sp(T,b)}}function T1(p){let f=p.replaceAll(`\r
`,`
`).replaceAll("\r",`
`).split(`

`),w=f.pop()||"";return{frames:f,remainder:w}}function _1(p,b){let f=p.trim();if(f)sp(f,b)}function sp(p,b){let f=p.split(`
`).filter((w)=>w.startsWith("data:")).map((w)=>w.slice(5).trimStart()).join(`
`);if(!f)return;try{let w=JSON.parse(f);if(y1(w))b(w)}catch{}}function Pp(p,b){globalThis.piWeb?.subject("chat.input.submitted").next({text:p,attachments:Vp(b)||[]})}async function i1(p,b,f,w,h=F(p).path,L=F(p).id){try{return await Y(p,"startPrompt",Rp(b,f,w,h),L)}catch(O){if(ep(O))return{};throw O}}function ep(p){return/unknown method: (startPrompt|streamEventsSse|steerPrompt)|unsupported method: (startPrompt|streamEventsSse|steerPrompt)|(startPrompt|streamEventsSse|steerPrompt) unsupported/i.test(Gp(p))}async function C1(p,b,f,w="",h=F(p).path,L=F(p).id){return await Y(p,"submitPrompt",Rp(b,f,w,h),L)}async function H1(p,b,f,w,h="",L=F(p).path,O=F(p).id){let T={...Rp(f,w,h,L),runId:b};return Y(p,"steerPrompt",T,O)}function Rp(p,b,f,w){let h={text:p,attachments:b,sessionId:f};if(w)h.workspacePath=w;return h}function $1(p){let b=[...p.messages].reverse().find((w)=>w.role==="assistant"&&w.streaming);if(b)return b;let f={id:q(),role:"assistant",text:"",createdAt:Date.now(),streaming:!0};return p.messages.push(f),f}function R1(p,b){for(let f of b)if(f.type==="text.delta"&&typeof f.delta==="string")pp(p,"text",f.delta),p.text+=f.delta;else if(f.type==="thinking.delta"&&typeof f.delta==="string")pp(p,"thinking",f.delta),p.thinking=`${p.thinking||""}${f.delta}`;else if(f.type==="tool.start")bp(p,f,"running");else if(f.type==="tool.delta"&&typeof f.delta==="string"){let w=bp(p,f,"running");w.text=f.delta}else if(f.type==="tool.end"){let w=bp(p,f,f.isError?"err":"ok");if(typeof f.result==="string"&&f.result)w.text=f.result}else if(f.type==="error"&&typeof f.message==="string")pp(p,"text",`${p.text?`
`:""}${f.message}`),p.text+=`${p.text?`
`:""}${f.message}`}function pp(p,b,f){p.blocks||=[];let w=p.blocks[p.blocks.length-1];if(w?.type===b){w.text+=f;return}if(p.blocks.length<ip)p.blocks.push({id:q(),type:b,text:f})}function bp(p,b,f){let w=b.toolCallId||b.toolName||"tool";p.toolCalls||=[];let h=p.toolCalls.find((L)=>L.id===w);if(!h)h={id:w,name:b.toolName||"tool",args:b.args,text:"",status:f},p.toolCalls.push(h),z1(p,h);if(h.status=f,N1(h,b))h.args=b.args,h.argsStatus=b.argsStatus;return h}function z1(p,b){if(p.blocks||=[],p.blocks.some((f)=>f.type==="tool"&&f.toolCall?.id===b.id))return;if(p.blocks.length<ip)p.blocks.push({id:q(),type:"tool",text:"",toolCall:b})}function N1(p,b){if(!b.argsStatus)return Boolean(b.args);if(b.argsStatus==="unavailable")return!p.argsStatus;return!0}function y1(p){return D(p)&&typeof p.type==="string"}async function m(p,b,f,w,h="",L=zp(p),O=F(p).id){if(!p.backendStream){await vp(p,b,f,w,h,L);return}let T=++w.backendChatToken;w.sessionEventsAbort?.abort();let _=new AbortController;w.sessionEventsAbort=_;let i=np(()=>{A(b,x(f).messages,f.activeSessionId)});try{let C=await op(p,"sessionEventsSse",pb(p,h,L),_.signal,O);if(!C)throw Error("session SSE backend did not return a stream");await tp(C,(H)=>{if(T!==w.backendChatToken||H.type!=="chat.state")return;let R=A1(H),y=typeof R.activeSessionId==="string"?R.activeSessionId:h,U=Zp(w.pendingPromptEchoIds,y),$=fb(p,f,R,"chatState",U);if(Fp(w.pendingPromptEchoIds,y,$,R.messages,U),$.length)i.request()})}catch(C){if(!_.signal.aborted)await vp(p,b,f,w,h,L)}finally{if(i.cancel(),w.sessionEventsAbort===_)w.sessionEventsAbort=void 0}}async function vp(p,b,f,w,h="",L=zp(p)){let O=++w.backendChatToken;try{let T=await Y(p,"chatState",pb(p,h,L));if(O!==w.backendChatToken)return;let _=typeof T.activeSessionId==="string"?T.activeSessionId:h,i=Zp(w.pendingPromptEchoIds,_),C=fb(p,f,T,"chatState",i);if(Fp(w.pendingPromptEchoIds,_,C,T.messages,i),C.length)A(b,C,f.activeSessionId)}catch{}}function pb(p,b,f=zp(p)){let w=b?{sessionId:b}:{};if(f)w.workspacePath=f;return w}function A1(p){return{activeSessionId:p.activeSessionId,messages:p.messages,isStreaming:p.isStreaming}}function zp(p){return F(p).path}function F(p){let b=p.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),f=b?.activeWorkspaceId||p.app?.dataset.activeWorkspaceId||"",w=b?.workspaces?.find((h)=>h.id===f)?.path||"";return{id:f,path:w}}function bb(p,b){let f=p.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),w=b.workspaceId||f?.activeWorkspaceId||p.app?.dataset.activeWorkspaceId||"",h=f?.workspaces?.find((L)=>L.id===w)?.path||"";if(h||w!==f?.activeWorkspaceId)return{id:w,path:h};return F(p)}function fb(p,b,f,w,h=""){let L=jp(f.messages);if(typeof f.activeSessionId==="string"&&f.activeSessionId){let i=b.activeSessionId;if(M(b,f.activeSessionId),W(p,{sessionId:f.activeSessionId,workspaceId:p.app?.dataset.activeWorkspaceId||S(p)||void 0}),w!=="chatState"||i!==f.activeSessionId)k(p,"chat-session",{reason:w,sessionId:f.activeSessionId});if(w!=="chatState")Cp(p,f.activeSessionId,w)}let O=x(b);if(!L.length)return[];let T=zb(O.messages,L,h).slice(-v);if(!wb(O.messages,T))return[];O.messages=T;let _=$p(O);if(O.updatedAt=Date.now(),N(b),_)Hp(O.id,_);return O.messages}function wb(p,b){if(p.length!==b.length)return!0;return p.some((f,w)=>Op(f)!==Op(b[w]))}function Op(p){return JSON.stringify({id:p.id,role:p.role,text:p.text,blocks:p.blocks,thinking:p.thinking,streaming:p.streaming,toolCalls:p.toolCalls,attachments:p.attachments})}function Z1(p,b,f,w,h,L=""){let O=jp(f.messages),T=typeof f.activeSessionId==="string"&&f.activeSessionId?f.activeSessionId:h,_=b.activeSessionId===h;if(T!==h)if(_)M(b,T),W(p,{sessionId:T,workspaceId:F(p).id||void 0}),k(p,"chat-session",{reason:w,sessionId:T}),Cp(p,T,w);else J(b,T);let i=Array.isArray(L)?L:[L].filter(Boolean);if(T!==h)for(let y of i)yb(b,h,T,y);let C=J(b,T);if(!O.length)return[];let H=zb(C.messages,O,L).slice(-v);if(!wb(C.messages,H))return[];C.messages=H;let R=$p(C);if(C.updatedAt=Date.now(),N(b),R)Hp(C.id,R);return C.messages}function F1(p,b,f,w,h){let L=(i,C)=>{if(!i?.sessionId){if(!C)kp(b,f,w,h,!0);return}if(Lb(b,w,i))return;W(b,i),M(w,i.sessionId),A(f,x(w).messages,w.activeSessionId);let H=bb(b,i);m(b,f,w,h,i.sessionId,H.path,H.id)},O=(i)=>{if(V1(b,f,w,h,i))return;let C=G1(b,i);if(C)L(C,!1)},T=b.app?.piWebSidebar?.channels?.selectedSession$||globalThis.piWebSidebar?.channels?.selectedSession$,_=b.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$;if(T){let i=!0;p.add(T.subscribe((C)=>{L(C,i),i=!1}))}if(_)p.add(_.subscribe(O));if(b.app)p.listen(b.app,"pi-web-sidebar:session-created",(i)=>{let C=i.detail||{},H=typeof C.sessionId==="string"?C.sessionId:"",R=typeof C.workspaceId==="string"?C.workspaceId:"";if(H)L({sessionId:H,workspaceId:R||void 0},!1)});if(globalThis.piWeb){let i=!0;p.add(globalThis.piWeb.behaviorSubject(rp,E(b)).subscribe((H)=>{L(H,i),i=!1})),p.add(globalThis.piWeb.subject(up).subscribe(O));let C=!0;p.add(globalThis.piWeb.behaviorSubject("session.activeId",null).subscribe((H)=>{if(!H){if(!C)kp(b,f,w,h,!1);C=!1;return}C=!1,L({sessionId:H,workspaceId:b.app?.dataset.activeWorkspaceId||Zb(_p)||void 0},!1)}))}}function kp(p,b,f,w,h){if(w.backendChatToken+=1,w.runEventsAbort?.abort(),w.sessionEventsAbort?.abort(),f.activeSessionId="",N(f),h)ap(p);else{let L=E(p);if(L?.sessionId&&p.app)p.app.dataset.clearedSessionId=L.sessionId}d(b)}function hb(p,b){let f=E(p);if(f?.sessionId&&!Lb(p,b,f))W(p,f),M(b,f.sessionId);if(!b.activeSessionId)return J(b,"",!0).id;return b.activeSessionId}function Lb(p,b,f){let w=f.workspaceId||"",h=p.app?.dataset.activeWorkspaceId||Zb(_p)||"";return b.activeSessionId===f.sessionId&&(!w||w===h)}function V1(p,b,f,w,h){if(h.type!=="session.deleted")return!1;let L=Ob(h);if(!L)return!0;let O=f.activeSessionId===L,T=f.sessions.length;if(f.sessions=f.sessions.filter((_)=>_.id!==L),O){w.runEventsAbort?.abort(),w.sessionEventsAbort?.abort();let _=j1(p,h,L);if(_?.sessionId){W(p,_),M(f,_.sessionId),D1(b,x(f).messages,f.activeSessionId);let i=bb(p,_);return m(p,b,f,w,_.sessionId,i.path,i.id),!0}return f.activeSessionId="",ap(p),N(f),d(b),!0}if(f.sessions.length!==T)N(f);return!0}function j1(p,b,f){let w=b.snapshot?.activeSessionId||"",h=b.snapshot?.activeWorkspaceId||"";if(w&&w!==f)return{sessionId:w,workspaceId:h||void 0};let L=E(p);if(L?.sessionId&&L.sessionId!==f)return L;return null}function G1(p,b){if(!J1(b.type))return null;let f=b.detail||{},w=Ob(b)||b.snapshot?.activeSessionId||"",h=typeof f.workspaceId==="string"?f.workspaceId:b.snapshot?.activeWorkspaceId||p.app?.dataset.activeWorkspaceId||"";if(!w)return null;return{sessionId:w,workspaceId:h||void 0}}function Ob(p){let b=p.detail||{};if(typeof b.sessionId==="string")return b.sessionId;if(typeof b.id==="string")return b.id;return""}function J1(p){return p==="session.selected"||p==="session.created"||p==="new-session"||p==="active.start"}function M(p,b){let f=p.sessions.find((w)=>w.id===b);if(!f)f=a(b),p.sessions.unshift(f);return p.activeSessionId=f.id,N(p),f}function A(p,b,f){if(Cb(b,f),!b.length){d(p);return}let w=p.querySelector(".term-inner")||p;Tb(w,b,f),Np(p)}function D1(p,b,f){Cb(b,f);let w=p.querySelector(".term-inner")||p;Tb(w,b,f),Np(p)}function Tb(p,b,f){let w=q1(p),h=b.map((T)=>{let _=`${f}:${Op(T)}`,i=w.get(T.id);if(i&&Ep.get(i)===_)return i;let C=Y1(T,f);return Ep.set(C,_),C}),L=new Set(h),O=p.firstChild;for(let T of h){if(O!==T)p.insertBefore(T,O);O=T.nextSibling}for(let T of Array.from(p.children)){if(Tp(p,T)&&!L.has(T)){T.remove();continue}if(!Tp(p,T))T.remove()}}function q1(p){let b=new Map;for(let f of Array.from(p.children)){if(!Tp(p,f))continue;let w=f.dataset.messageId||"";if(w)b.set(w,f)}return b}function Tp(p,b){let f=p.ownerDocument.defaultView;return Boolean(f&&b instanceof f.HTMLElement&&b.classList.contains("transcript-item"))}function d(p){let b=p.querySelector(".term-inner")||p,f=document.createElement("article");f.className="pi-web-chat-docs",f.setAttribute("aria-label","pi-web-chat guide");let w=document.createElement("h1");w.textContent="pi-web-chat guide";let h=document.createElement("p");h.textContent=["Select or create a session in the sidebar to load chat history,","or type below to start a new session."].join(" ");let L=document.createElement("ul");for(let O of["Ask pi in the prompt box and press Cmd/Ctrl+Enter to send.","Type ! then Space at the start to turn the prompt yellow and run shell commands in the workspace.","Queued file attachments hide during shell mode and reappear for the next normal prompt.","Type @ to list project files, then pick one to tag it as prompt context.","Type / at the start to open the slash command list.","Chats are cached locally after you start or select a session."]){let T=document.createElement("li");T.textContent=O,L.append(T)}f.append(w,h,L),b.replaceChildren(f),Np(p)}function U1(p,b){let f=b.querySelector(".term"),w=b.querySelector("[data-action='scroll-bottom']");if(!f||!w)return;let h={term:f,button:w,pinned:!0,touchStartY:null};wp.set(b,h),w.hidden=!1,I(h),p.listen(w,"click",()=>{h.pinned=!0,_b(h),I(h)}),p.listen(f,"wheel",(L)=>{if(L.deltaY<0)xp(h)}),p.listen(f,"touchstart",(L)=>{let O=L;h.touchStartY=O.touches.item(0)?.clientY??null}),p.listen(f,"touchmove",(L)=>{let T=L.touches.item(0)?.clientY;if(typeof T==="number"&&h.touchStartY!==null&&T-h.touchStartY>8)xp(h)}),p.listen(f,"touchend",()=>{h.touchStartY=null}),p.add({remove:()=>{wp.delete(b)}})}function Np(p){let b=wp.get(p);if(!b)return;if(b.pinned)_b(b);I(b)}function _b(p){p.term.scrollTop=p.term.scrollHeight}function xp(p){p.pinned=!1,I(p)}function I(p){p.button.dataset.pinned=p.pinned?"true":"false",p.button.setAttribute("aria-pressed",p.pinned?"true":"false")}function Y1(p,b){let f=document.createElement("article");if(f.className="transcript-item",f.dataset.messageId=p.id,X1(p)){let w=Q1(p);if(w)yp(f,p.role,p.text);E1(f,p,b,w)}else W1(f,p,b);if(p.streaming)f.dataset.streaming="true";return f}function X1(p){return Boolean(p.blocks?.some((b)=>{return b.type==="tool"||b.text.trim().length>0}))}function Q1(p){return Boolean(p.text.trim())&&(!l1(p)||K1(p))}function l1(p){return Boolean(p.blocks?.some((b)=>{return b.type==="text"&&b.text.trim().length>0}))}function K1(p){return(p.blocks?.length||0)>=ip}function E1(p,b,f,w=!1){for(let h of b.blocks||[])if(h.type==="text"){if(!w)yp(p,b.role,h.text)}else if(h.type==="thinking")p.append(ib(h.text,Boolean(b.streaming)));else if(h.type==="tool"&&h.toolCall){let L=b.toolCalls?.find((O)=>O.id===h.toolCall?.id)||h.toolCall;p.append(Hb(L,Ap(f,b,L)))}}function W1(p,b,f){if(B1(b))yp(p,b.role,b.text);if(b.thinking)p.append(ib(b.thinking,Boolean(b.streaming)));for(let w of b.toolCalls||[])p.append(Hb(w,Ap(f,b,w)))}function yp(p,b,f){if(b==="assistant"&&!f.trim())return;let w=document.createElement("div");w.className="msg",w.dataset.kind=fp(b);let h=document.createElement("span");h.className=`prefix ${fp(b)}`,h.textContent=m1(b);let L=document.createElement("pre");L.className=`body ${fp(b)}`,L.textContent=f,w.append(h,L),p.append(w)}function B1(p){let b=p.text.trim().length>0;return p.role!=="assistant"||b}function ib(p,b){let f=document.createElement("details");f.className="msg-detail think thinking-block",f.open=b;let w=document.createElement("summary");w.className="label",w.textContent="THINKING";let h=document.createElement("pre");return h.className="body",h.textContent=p,f.append(w,h),f}function Cb(p,b){let f=new Set;for(let w of p)for(let h of w.toolCalls||[])f.add(Ap(b,w,h));for(let w of B)if(!f.has(w))B.delete(w)}function Ap(p,b,f){return`${p}:${b.id}:${f.id}`}function Hb(p,b){let f=document.createElement("div");f.className="tool-card",f.dataset.tool=p.name||"tool",f.dataset.status=p.status;let w=!B.has(b);f.dataset.collapsed=w?"true":"false";let h=document.createElement("button");if(h.type="button",h.className="tc-head",h.title=w?"Show tool output":"Hide tool output",h.setAttribute("aria-expanded",w?"false":"true"),h.setAttribute("aria-label",$b(p,w)),h.append(x1(p),c1(p),g1(p),r1(p,w)),!w)f.append(Rb(p));return h.addEventListener("click",()=>k1(f,h,p,b)),f.prepend(h),f}function $b(p,b){let f=b?"Show":"Hide",w=p.status==="running"?"running":p.status==="err"?"failed":"done",h=M1(p),L=h?`, ${h}`:"";return`${f} ${p.name||"tool"} output, ${w}${L}`}function M1(p){if(p.argsStatus==="present")return"arguments present";if(p.argsStatus)return g(p);return p.args?"arguments present":""}function Rb(p){let b=document.createElement("pre");return b.className="tc-body",b.textContent=p.text||o(p),b}function P1(p,b){let f=0,w,h=b.ownerDocument.defaultView,L=typeof h?.matchMedia==="function"?h.matchMedia("(prefers-reduced-motion: reduce)"):void 0,O=()=>{if(w)clearInterval(w),w=void 0},T=()=>{f=(f+1)%Sp;for(let C of b.querySelectorAll(".spinner"))C.dataset.frame=String(f)},_=()=>{let C=b.querySelectorAll(".spinner");if(L?.matches||C.length===0){O(),f=0;for(let H of C)H.dataset.frame="0";return}if(!w)w=setInterval(T,Pb)},i=new(h?.MutationObserver||MutationObserver)(_);i.observe(b,{childList:!0,subtree:!0}),L?.addEventListener("change",_),_(),p.add({remove:()=>{i.disconnect(),L?.removeEventListener("change",_),O()}})}function v1(){let p=document.createElement("span");p.className="spinner",p.dataset.frame="0",p.setAttribute("aria-hidden","true");for(let b=0;b<Sp;b+=1)p.append(document.createElement("span"));return p}function k1(p,b,f,w){let h=p.querySelector(".tc-body"),L=h!==null;if(h)h.remove(),B.delete(w);else p.append(Rb(f)),B.add(w);p.dataset.collapsed=L?"true":"false",b.setAttribute("aria-expanded",L?"false":"true"),b.setAttribute("aria-label",$b(f,L)),b.title=L?"Show tool output":"Hide tool output";let O=b.querySelector(".tc-toggle-label");if(O)O.textContent=L?"show":"hide"}function x1(p){let b=document.createElement("span");b.className="tc-glyph";let f=u1(p),w=f?vb[f]:"";if(!f||!w)return b.textContent="●",b;return b.innerHTML=`<svg class="tc-icon" data-tool-icon="${f}" aria-hidden="true" viewBox="0 0 24 24">${w}</svg>`,b}function c1(p){let b=document.createElement("span");return b.className="tc-name",b.textContent=p.name||"tool",b}function g1(p){let b=document.createElement("span");return b.className="tc-args",b.textContent=g(p),b}function r1(p,b){let f=document.createElement("span");if(f.className="tc-meta",p.status==="running"){let L=v1(),O=document.createElement("span");return O.className="running",O.textContent="running",f.append(L,O,cp(b)),f}let w=document.createElement("span");w.className=p.status==="err"?"err":"ok",w.textContent=p.status==="err"?"✗":"✓";let h=document.createElement("span");return h.textContent=p.status==="err"?" · failed":" · done",f.append(w,h,cp(b)),f}function cp(p){let b=document.createElement("span");b.className="tc-toggle";let f=document.createElement("span");f.className="tc-toggle-label",f.textContent=p?"show":"hide";let w=document.createElement("span");return w.className="tc-caret",w.textContent="▸",b.append(f,w),b}function u1(p){let b=I1(p.name);if(["bash","shell","sh","zsh","terminal"].includes(b))return S1(g(p).toLowerCase())||"terminal";return kb[b]}function I1(p){return p.trim().replace(/^functions\./,"").replace(/^multi_tool_use\./,"")}function S1(p){if(/\bgit\b|\bgh\b/.test(p))return"git-branch";if(/\b(go test|bun test|npm test|pnpm test|yarn test|vitest|pytest|cargo test)\b/.test(p))return"circle-check";if(/\b(bun|npm|pnpm|yarn)\s+(run\s+)?build\b|\b(go build|cargo build)\b/.test(p))return"hammer";if(/\b(bun|npm|pnpm|yarn)\s+(add|install|i)\b|\bpip\s+install\b|\bgo\s+get\b/.test(p))return"package";return}function m1(p){if(p==="assistant")return"pi >";if(p==="user")return"you >";if(p==="system")return"sys >";return"tool >"}function fp(p){if(p==="assistant")return"pi";if(p==="system")return"sys";return p}function d1(p){let b=/^\/([^\s/]*)$/.exec(p);return b?b[1].toLowerCase():null}function a1(p){let b=/(?:^|\s)@([^\s@`]*)$/.exec(p);return b?b[1]:null}function y0(p){return p.length>0}function A0(p,b){return p.trim().startsWith("!")&&b}function zb(p,b,f=""){let w=Array.isArray(f)?f:[f].filter(Boolean),h=new Map,L=new Map,O=0;for(let _ of p)h.set(_.id,_),L.set(_.id,O++);let T=new Set;for(let _ of b){let i=n1(p,_,w,T);if(i){T.add(i.id),h.delete(i.id),h.set(_.id,_),L.set(_.id,L.get(i.id)??O++);continue}if(!L.has(_.id))L.set(_.id,O++);h.set(_.id,{...h.get(_.id),..._})}return[...h.values()].sort((_,i)=>{let C=_.createdAt-i.createdAt;if(C!==0)return C;return(L.get(_.id)??0)-(L.get(i.id)??0)})}function n1(p,b,f,w){if(!f.length||b.role!=="user"||!b.text.trim())return;if(p.some((L)=>L.id===b.id))return;let h=p.find((L)=>{return f.includes(L.id)&&!w.has(L.id)&&L.text.trim()===b.text.trim()});if(h?.role!==b.role||h.text.trim()!==b.text.trim())return;return h}function Nb(p,b,f){p.set(b,[...p.get(b)||[],f])}function Zp(p,b){return p.get(b)||[]}function o1(p,b,f){let w=p.get(b)||[];if(!w.length)return;p.delete(b),p.set(f,[...p.get(f)||[],...w])}function Fp(p,b,f,w,h){if(!h.length||!f.length)return;let L=h.filter((O)=>{return f.some((T)=>T.id===O)});if(L.length){p.set(b,L);return}p.delete(b)}function x(p){return J(p,p.activeSessionId,!0)}function J(p,b,f=!1){let w=p.sessions.find((h)=>h.id===b);if(!w)w=a(b||void 0),p.sessions.unshift(w),N(p);if(f||!p.activeSessionId)p.activeSessionId=w.id,N(p);return w}function yb(p,b,f,w){if(b===f)return;let h=p.sessions.find((_)=>_.id===b),L=h?.messages.findIndex((_)=>_.id===w)??-1;if(!h||L<0)return;let[O]=h.messages.splice(L,1),T=J(p,f);if(!T.messages.some((_)=>_.id===O.id))T.messages.push(O);h.updatedAt=Date.now(),T.updatedAt=Date.now(),Ab(p,h.id),N(p)}function Ab(p,b){let f=p.sessions.find((w)=>w.id===b);if(!f||f.id===p.activeSessionId||f.messages.length>0||f.title!=="New chat")return;p.sessions=p.sessions.filter((w)=>w.id!==f.id)}function a(p=q()){let b=Date.now();return{id:p,title:"New chat",createdAt:b,updatedAt:b,messages:[]}}function Zb(p){try{return localStorage.getItem(p)||""}catch{return""}}function t1(p){let b=a(p);return{activeSessionId:b.id,sessions:[b]}}function s1(){try{let p=JSON.parse(localStorage.getItem(u)||"null");if(p&&Array.isArray(p.sessions))return{activeSessionId:"",sessions:p.sessions.filter(Fb).map(Vb)}}catch{}return{activeSessionId:"",sessions:[]}}function e1(p=""){try{let b=JSON.parse(localStorage.getItem(u)||"null");if(b&&typeof b.activeSessionId==="string"&&Array.isArray(b.sessions)){let f=b.sessions.filter(Fb).map(Vb);if(p&&!f.some((w)=>w.id===p))f.unshift(a(p));return{activeSessionId:p||b.activeSessionId,sessions:f}}}catch{}return t1(p||void 0)}function N(p){gp(p);try{localStorage.setItem(u,JSON.stringify(p))}catch{for(let b of p.sessions)b.messages=b.messages.slice(-Math.floor(v/2));gp(p);try{localStorage.setItem(u,JSON.stringify(p))}catch{}}}function Vp(p){if(!p?.length)return;return p.map(({content:b,...f})=>f)}function gp(p){p.sessions.sort((w,h)=>h.updatedAt-w.updatedAt);let b=p.sessions.find((w)=>w.id===p.activeSessionId),f=p.sessions.filter((w)=>w.id!==p.activeSessionId).slice(0,Math.max(0,Kp-1));p.sessions=b?[b,...f]:p.sessions.slice(0,Kp);for(let w of p.sessions)if(w.messages.length>v)w.messages.splice(0,w.messages.length-v)}function Fb(p){return D(p)&&typeof p.id==="string"&&Array.isArray(p.messages)}function Vb(p){return{...p,messages:jp(p.messages)}}function jp(p){return Array.isArray(p)?p.filter(L0).map(p0):[]}function p0(p){let b={...p};if(Array.isArray(p.toolCalls))b.toolCalls=p.toolCalls.filter(jb);else delete b.toolCalls;if(Array.isArray(p.blocks))b.blocks=p.blocks.filter(f0).map(b0);else delete b.blocks;return b}function b0(p){if(p.type!=="tool"){let{toolCall:b,...f}=p;return f}return p}function f0(p){if(!D(p)||typeof p.id!=="string"||typeof p.text!=="string")return!1;if(p.type==="text"||p.type==="thinking")return!0;return p.type==="tool"&&jb(p.toolCall)}function jb(p){if(!D(p)||typeof p.id!=="string"||typeof p.name!=="string")return!1;return typeof p.text==="string"&&h0(p.status)&&w0(p.argsStatus)}function w0(p){return p===void 0||p==="present"||p==="empty"||p==="unavailable"||p==="truncated"||p==="omitted"}function h0(p){return p==="running"||p==="ok"||p==="err"}function L0(p){if(!D(p)||typeof p.id!=="string"||typeof p.text!=="string")return!1;return typeof p.createdAt==="number"&&O0(p.role)}function O0(p){return p==="user"||p==="assistant"||p==="tool"||p==="system"}function D(p){return typeof p==="object"&&p!==null}function q(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`}function T0(p){return p instanceof Error&&(p.name==="AbortError"||/aborted|abort/i.test(p.message))}function Gp(p){return p instanceof Error?p.message:String(p)}export{g as toolArgsInlineText,o as toolArgsBodyText,N0 as submittedAttachmentsForText,A0 as shellAttachmentNoteVisible,Ub as setComposerMode,Db as renderMessages,Xb as promptFromAgUiLikeRunInput,Xp as pluginStyleText,n as pluginClass,z0 as mergeCommands,y0 as hasQueuedAttachmentNames,S as getActiveWorkspaceId,ab as formatShellOutput,dp as extractRefs,xb as default,Up as createComposerSurface,qp as createChatSurface,Jb as createChatDom,R0 as createChannels,Yb as createAgUiLikeRunInput,r as commandName,Qb as chatEventsToAgUiLikeEvents,Y as backendCall};
