var U={attachFile:["M16.5 6v11.5a4 4 0 0 1-8 0V5a2.5 2.5 0 0 1 5 0v10.5a1 1 0 0 1-2 0V6H10v9.5","a2.5 2.5 0 0 0 5 0V5a4 4 0 0 0-8 0v12.5a5.5 5.5 0 0 0 11 0V6h-1.5Z"].join(""),stop:"M6 6h12v12H6V6Z",send:"M2 21 23 12 2 3v7l15 2-15 2v7Z",terminal:"M3 4h18v16H3V4Zm2 2v12h14V6H5Zm2 3 1.1-1.1L12.2 12l-4.1 4.1L7 15l3-3-3-3Zm6 6h5v1.5h-5V15Z",file:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 2.5L17.5 8H14V4.5ZM8 13h8v1.5H8V13Zm0 3h8v1.5H8V16Z"},X={attachFile:Z("attach_file",U.attachFile),stop:Z("stop",U.stop),send:Z("send",U.send),terminal:Z("terminal",U.terminal)};function Z(i,p){return`<svg class="material-icon" data-material-icon="${i}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="${p}"></path></svg>`}function S(){return"pi-web-chat-mounted"}function Li(){let i=document.createElement("main");return i.className="main pi-web-chat-surface",i.dataset.main="session",i.innerHTML='<div class="term"><div class="term-inner" role="log" aria-live="polite" aria-relevant="additions text"></div></div><button type="button" class="scroll-bottom-btn" data-action="scroll-bottom" aria-label="stick to bottom" title="stick to bottom" aria-pressed="true" hidden>↓</button>',i}function Ti(){let i=document.createElement("section");return i.className="prompt-region pi-web-chat-composer",i.innerHTML=`
    <div class="slash-pop" hidden><div class="slash-head">slash commands · type to filter</div><div class="slash-list"></div></div>
    <div class="prompt-file-ref-pop" hidden><div class="slash-head">project files · type to filter</div><div class="prompt-file-ref-list"></div></div>
    <div class="prompt-bar">
      <button class="attach-btn" type="button" aria-label="attach files" title="attach files">${X.attachFile}</button>
      <input type="file" multiple hidden data-file-input />
      <div class="prompt-input-col"><div class="attach-chips" hidden></div><div class="shell-attachment-note" aria-live="polite" hidden>queued attachments are hidden during shell mode and will reappear for the next normal prompt</div><textarea class="prompt-textarea" aria-label="Prompt" placeholder="ask pi to do something…" rows="1"></textarea></div>
      <div class="prompt-actions">
        <button class="stop-btn" type="button" aria-label="stop" title="stop" hidden>${X.stop}</button>
        <button class="mic-btn" type="button" data-action="toggle-speech-input" aria-label="start voice input" title="voice input" hidden>\uD83C\uDF99</button>
        <button class="send-btn" type="button" aria-label="send" title="send" aria-disabled="true">${X.send}</button>
      </div>
      <div class="drop-overlay" hidden><span>drop to attach</span></div>
    </div>
    <div class="prompt-meta" data-prompt-meta>— | <span class="prompt-meta-item prompt-meta-branch"><span>—</span></span></div>`,i}function Oi(i){let p=document.createElement("span");return p.className="prompt-meta-item pi-web-chat-badge",p.textContent="chat plugin",i.querySelector("[data-prompt-meta]")?.append(p),p}function pp(){let i=document.createElement("section");return i.className="pi-web-chat-root",i.dataset.plugin="pi-web-chat",i.innerHTML=`
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
        <button class="pi-web-chat-icon-btn" type="button" data-attach aria-label="attach files" title="attach files">${Z("attach_file",U.attachFile)}</button>
        <input type="file" multiple hidden data-file-input />
        <textarea class="pi-web-chat-textarea" data-chat-input aria-label="Prompt" placeholder="ask pi to do something…" rows="1"></textarea>
        <button class="pi-web-chat-send" type="button" data-send aria-label="send" title="send" aria-disabled="true">${Z("send",U.send)}</button>
      </div>
    </section>`,{root:i,transcript:y(i.querySelector("[data-chat-transcript]")),textarea:y(i.querySelector("[data-chat-input]")),sendButton:y(i.querySelector("[data-send]")),attachButton:y(i.querySelector("[data-attach]")),fileInput:y(i.querySelector("[data-file-input]")),slashPopover:y(i.querySelector("[data-slash-popover]")),slashList:y(i.querySelector("[data-slash-list]")),refsPopover:y(i.querySelector("[data-refs-popover]")),refsList:y(i.querySelector("[data-refs-list]")),attachments:y(i.querySelector("[data-attachments]"))}}function bp(i,p){i.replaceChildren(...p.map(hp)),i.scrollTop=i.scrollHeight}function hp(i){let p=document.createElement("article");p.className=`pi-web-chat-message pi-web-chat-message-${i.role}`,p.dataset.messageId=i.id;let b=document.createElement("div");b.className="pi-web-chat-message-role",b.textContent=i.role;let h=document.createElement("pre");if(h.className="pi-web-chat-message-body",h.textContent=i.text,p.append(b,h),i.thinking){let w=document.createElement("details");w.className="pi-web-chat-thinking",w.open=Boolean(i.streaming);let f=document.createElement("summary");f.textContent="thinking";let l=document.createElement("pre");l.textContent=i.thinking,w.append(f,l),p.append(w)}if(i.toolCalls?.length){let w=document.createElement("div");w.className="pi-web-chat-tools";for(let f of i.toolCalls){let l=document.createElement("details");l.className=`pi-web-chat-tool pi-web-chat-tool-${f.status}`,l.open=f.status==="running";let r=document.createElement("summary");r.textContent=`${f.name} · ${f.status}`;let c=document.createElement("pre");c.textContent=f.text||wp(f),l.append(r,c),w.append(l)}p.append(w)}if(i.streaming){let w=document.createElement("div");w.className="pi-web-chat-message-meta",w.textContent="streaming...",p.append(w)}if(i.attachments?.length){let w=document.createElement("div");w.className="pi-web-chat-message-meta",w.textContent=`${i.attachments.length} attachment(s)`,p.append(w)}return p}function wp(i){if(i.argsStatus==="truncated")return"arguments truncated: too large to display";if(i.argsStatus==="omitted")return"arguments omitted: response too large";if(i.argsStatus==="unavailable")return"arguments unavailable";if(i.argsStatus==="empty")return"no arguments";if(!i.args)return"arguments unavailable";return JSON.stringify(i.args,null,2)}function fp(i,p){i.root.dataset.composerMode=p,a(i.attachButton,p)}function a(i,p){if(i.disabled=p==="shell",i.setAttribute("aria-disabled",p==="shell"?"true":"false"),p==="shell"){i.innerHTML=X.terminal,i.title="shell command mode",i.setAttribute("aria-label","shell command mode");return}if(p==="file-ref"){i.innerHTML=Z("file",U.file),i.title="file reference mode",i.setAttribute("aria-label","file reference mode");return}i.innerHTML=X.attachFile,i.title="attach files",i.setAttribute("aria-label","attach files")}function m(i,p){i.hidden=p.length===0,i.replaceChildren(...p.map((b)=>{let h=document.createElement("span");return h.className="pi-web-chat-attachment-chip",h.textContent=b,h}))}function Ci(){return`
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
  `}function _i(){document.getElementById("pi-web-chat-style")?.remove();let i=document.createElement("style");return i.id="pi-web-chat-style",i.textContent=Ci(),document.head.append(i),i}function v(i){return i.command||i.cmd||(i.name?`/${i.name}`:"")}function y(i){if(!i)throw Error("pi-web-chat DOM template is invalid");return i}function lp(i,p,b){return{threadId:i,runId:p,state:{},messages:b,tools:[],context:[]}}function cp(i){let p=[...i.messages].reverse().find((b)=>b.role==="user");return{text:p?.text||"",attachments:p?.attachments||[],sessionId:i.threadId}}function rp(i,p,b){return i.map((h)=>Lp(h,p,b))}function Lp(i,p,b){if(i.type==="text.delta")return{type:"TEXT_MESSAGE_CONTENT",threadId:p,runId:b,delta:i.delta||""};if(i.type==="thinking.delta")return{type:"THINKING_MESSAGE_CONTENT",threadId:p,runId:b,delta:i.delta||""};if(i.type==="tool.start")return{type:"TOOL_CALL_START",threadId:p,runId:b,toolCallId:i.toolCallId,payload:Ei(i)};if(i.type==="tool.delta")return{type:"TOOL_CALL_ARGS",threadId:p,runId:b,toolCallId:i.toolCallId,delta:i.delta||""};if(i.type==="tool.end")return{type:"TOOL_CALL_END",threadId:p,runId:b,toolCallId:i.toolCallId,payload:Ei(i)};return{type:i.type.toUpperCase().replaceAll(".","_"),threadId:p,runId:b,payload:i}}function Ei(i){return{name:i.toolName||"tool",args:i.args||{},result:i.result||"",isError:i.isError===!0}}var k="pi-web-chat.sessions.v1";var Di="plugin.pi-web-sidebar.selectedSession",Vi="plugin.pi-web-sidebar.event",ji="plugin.pi-web-sidebar.activeSessionId",e="plugin.pi-web-sidebar.activeWorkspaceId",Tp=12,Hi=20,Q=200,Op=8,Cp=1e6,_p=64000;var Ep=250,Gi=6,Hp=150,j=new Set,$p={"book-open":'<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',"file-plus":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="M9 15h6"/>',pencil:'<path d="M21.2 6.8 17.2 2.8a2 2 0 0 0-2.8 0L3 14.2V21h6.8L21.2 9.6a2 2 0 0 0 0-2.8z"/><path d="m14 5 5 5"/>',terminal:'<path d="m4 17 6-6-6-6"/><path d="M12 19h8"/>',cpu:'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 15h3"/><path d="M1 9h3"/><path d="M1 15h3"/>',globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 0 20"/><path d="M12 2a15.3 15.3 0 0 0 0 20"/>',search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',braces:'<path d="M8 3H7a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-4a2 2 0 0 1 2-2 2 2 0 0 1-2-2V7a2 2 0 0 0-2-2h-1"/>',"file-text":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',"circle-question-mark":'<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 1 1 5.8 1c-.5 1-1.4 1.5-2.1 2-.6.4-.8.8-.8 2"/><path d="M12 17h.01"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',plug:'<path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a6 6 0 0 1-12 0V8Z"/>',"git-branch":'<line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',"circle-check":'<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',hammer:'<path d="m15 12-8.5 8.5a2.1 2.1 0 0 1-3-3L12 9"/><path d="m17.6 5.4 1.8-1.8"/><path d="m14 7 3 3"/><path d="M5 11 2 8l6-6 3 3"/>',package:'<path d="m7.5 4.3 9 5.2"/><path d="M21 8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>'},s=new WeakMap,yp={read:"book-open",write:"file-plus",edit:"pencil",ctx_execute:"cpu",ctx_batch_execute:"cpu",ctx_execute_file:"cpu",ctx_search:"cpu",ctx_index:"cpu",ctx_fetch_and_index:"cpu",web_search:"globe",fetch_content:"search",get_search_content:"search",code_search:"braces",document_parse:"file-text",ask_user_question:"circle-question-mark",teams:"users",subagent:"users",mcp:"plug",git:"git-branch"};class Ji{#i=[];add(i){if(i)this.#i.push(i);return i}listen(i,p,b){i.addEventListener(p,b),this.add({remove:()=>i.removeEventListener(p,b)})}dispose(){for(let i of this.#i.splice(0).reverse())if(typeof i==="function")i();else if("unsubscribe"in i)i.unsubscribe();else i.remove()}}function Rp(i={}){let p=i.app;if(p?.piWebChat?.dispose(),typeof i.mount?.chat!=="function"||typeof i.mount?.composer!=="function")throw Error("pi-web-chat requires modern pi-web mount.chat and mount.composer APIs");return zp(i,p)}function zp(i,p){let b=new Ji,h=b.add(_i()),w=Li(),f=Ti(),l=i.mount?.chat(w,{replace:!0}),r=i.mount?.composer(f,{replace:!0});if(hb(b,w),cb(b,w),l)b.add(l);if(r)b.add(r);let c=g(i);D(i,c||void 0);let L=c?.sessionId?Zb(c.sessionId):Ub(),T={backendChatToken:0};if(!c?.sessionId)bi(w);else R(w,B(L).messages,L.activeSessionId),d(i,w,L,T,c.sessionId);tp(b,i,w,L,T),Ap(b,i,f,w,L,T);let O=p?b.add(Oi(p)):void 0;p?.classList.add(S());let H=()=>{if(T.runEventsAbort?.abort(),T.sessionEventsAbort?.abort(),b.dispose(),j.clear(),O?.remove(),h.remove(),p?.classList.remove(S()),p?.piWebChat===M)delete p.piWebChat},M={dispose:H};if(p)p.piWebChat=M;return H}function Ap(i,p,b,h,w,f){let l=b.querySelector(".prompt-textarea"),r=b.querySelector(".send-btn"),c=b.querySelector(".attach-btn"),L=b.querySelector("[data-file-input]"),T=b.querySelector(".attach-chips"),O=b.querySelector(".shell-attachment-note");if(!l||!r)return;let H=b.querySelector(".prompt-bar"),M=b.querySelector(".slash-pop"),z=b.querySelector(".prompt-file-ref-pop"),C={selectedAttachments:[],shellMode:!1,commands:[]},q=()=>{Np(T,l.value,C)},W=()=>{Fp(H,l,c,O,C)},Y=()=>{let $=l.value;if(r.setAttribute("aria-disabled",$.trim()?"false":"true"),q(),$i(C),C.shellMode){n(M,z);return}Gp(p,b,l,$,C.commands,(_)=>{C.commands=_}),C.fileSearchTimer=setTimeout(()=>{Jp(p,b,l,l.value)},120)},li=()=>{C.shellMode=!0,n(M,z),W(),q()},ci=()=>{C.shellMode=!1,W(),q()},ri=async($)=>{$?.preventDefault(),$?.stopImmediatePropagation();let _=l.value.trim();if(Y(),!_)return;r.disabled=!0;try{if(C.shellMode)Ai(_,[]),await Zp(p,h,w,_),ci();else{let P=[...C.selectedAttachments,...await Dp(p,_)];Ai(_,P),await Bp(p,h,w,f,_,P),C.selectedAttachments=[],q()}if(l.value.trim()===_)l.value="";if(L)L.value=""}catch(P){R(h,[Mp(P)],w.activeSessionId)}finally{r.disabled=!1,W(),Y()}};if(i.listen(l,"input",()=>{if(!C.shellMode&&l.value.startsWith("! "))l.value=l.value.slice(2),li();Y()}),i.listen(l,"keydown",($)=>{let _=$;if(_.key===" "&&!C.shellMode&&l.value==="!"&&l.selectionStart===1&&l.selectionEnd===1){_.preventDefault(),l.value="",li(),Y();return}if(_.key==="Backspace"&&C.shellMode&&l.value===""){_.preventDefault(),ci(),Y();return}if(_.key==="Escape"){n(M,z);return}if(_.key==="Enter"&&(_.metaKey||_.ctrlKey))ri(_)}),i.listen(r,"click",($)=>{ri($)}),c&&L)i.listen(c,"click",()=>{if(!C.shellMode)L.click()}),i.listen(L,"change",()=>{Up(L,($)=>{C.selectedAttachments=$,q()})});i.add({remove:()=>$i(C)}),W()}function Np(i,p,b){if(!i)return;if(b.shellMode){m(i,[]);return}m(i,[...b.selectedAttachments.map((h)=>h.name||"attachment"),...qi(p)])}function Fp(i,p,b,h,w){if(i?.classList.toggle("shell-mode",w.shellMode),p.setAttribute("placeholder",w.shellMode?"run shell command in workspace…":"ask pi to do something…"),h)h.hidden=!(w.shellMode&&w.selectedAttachments.length>0);if(b)a(b,w.shellMode?"shell":"normal")}function $i(i){if(i.fileSearchTimer)clearTimeout(i.fileSearchTimer),i.fileSearchTimer=void 0}function n(i,p){i?.setAttribute("hidden",""),p?.setAttribute("hidden","")}function Mp(i){return{id:G(),role:"system",text:`prompt failed: ${fi(i)}`,createdAt:Date.now()}}async function Up(i,p){let b=Array.from(i.files||[]).slice(0,Op),h=[];for(let w of b){if(w.size>Cp)continue;h.push({name:w.name,size:w.size,content:await w.text(),mimeType:w.type||void 0})}p(h)}async function Zp(i,p,b,h){let w=ki(i,b),f=A(b,w),l={id:G(),role:"user",text:`! ${h}`,createdAt:Date.now()},r={id:G(),role:"tool",text:`$ ${h}
(running...)`,createdAt:Date.now()};f.messages.push(l,r),f.updatedAt=Date.now(),E(b),R(p,f.messages,w);try{let c=await V(i,"runShell",{command:h}),L=typeof c.exitCode==="number"?c.exitCode:1,T=typeof c.durationMs==="number"?c.durationMs:0,O=typeof c.output==="string"?c.output:"";r.text=Vp(h,O,L,T,Boolean(c.truncated))}catch(c){r.text=`$ ${h}
${fi(c)}`}f.updatedAt=Date.now(),E(b),R(p,f.messages,w)}async function Dp(i,p){let b=qi(p);if(!b.length)return[];let h=await V(i,"resolveContext",{text:p,refs:b});return Array.isArray(h.attachments)?h.attachments.filter(F):[]}function Vp(i,p,b,h,w){let f=jp(p,_p),l=w||f.truncated,r=f.text.endsWith(`
`)||!f.text?"":`
`;return`$ ${i}
${f.text}${r}[exit ${b} · ${h}ms${l?" · truncated":""}]`}function jp(i,p){let b=new TextEncoder,h=b.encode(i);if(h.byteLength<=p)return{text:i,truncated:!1};let w=new TextDecoder().decode(h.slice(0,p));while(w&&b.encode(w).byteLength>p)w=w.slice(0,-1);return{text:w,truncated:!0}}async function Gp(i,p,b,h,w,f){let l=p.querySelector(".slash-pop"),r=p.querySelector(".slash-list"),c=zb(h);if(c===null||!r){l?.setAttribute("hidden","");return}let L=w;if(!L.length){let O=await V(i,"commands",{});L=Array.isArray(O.commands)?O.commands.filter(F):[],f(L)}if(b.value!==h)return;let T=L.filter((O)=>{return v(O).slice(1).toLowerCase().includes(c)});qp(r,T,b,l),l?.toggleAttribute("hidden",T.length===0)}async function Jp(i,p,b,h){let w=p.querySelector(".prompt-file-ref-pop"),f=p.querySelector(".prompt-file-ref-list"),l=Ab(h);if(l===null||!f){w?.setAttribute("hidden","");return}try{let r=await V(i,"searchFiles",{query:l,limit:Tp}),c=Array.isArray(r.files)?r.files.filter(F):[];if(b.value!==h)return;Yp(f,b,c,w),w?.toggleAttribute("hidden",c.length===0)}catch{w?.setAttribute("hidden","")}}function qp(i,p,b,h){i.replaceChildren(...p.map((w)=>{let f=document.createElement("button"),l=v(w);return f.type="button",f.className="slash-item",f.dataset.slash=l,f.innerHTML='<span class="sl-name"></span><span class="sl-desc"></span>',f.querySelector(".sl-name").textContent=l,f.querySelector(".sl-desc").textContent=w.description||"",f.addEventListener("click",()=>{b.value=w.template||`${l} `,h?.setAttribute("hidden",""),b.dispatchEvent(new(b.ownerDocument.defaultView?.Event||Event)("input",{bubbles:!0})),b.focus()}),f}))}function Yp(i,p,b,h){i.replaceChildren(...b.map((w)=>{let f=w.path||w.name||"",l=document.createElement("button");return l.type="button",l.className="prompt-file-ref-item",l.dataset.path=f,l.disabled=!f,l.innerHTML='<span class="pfr-path"></span><span class="pfr-kind"></span>',l.querySelector(".pfr-path").textContent=f,l.querySelector(".pfr-kind").textContent=typeof w.size==="number"?`${w.size} bytes`:"file",l.addEventListener("click",()=>{Xp(p,f),h?.setAttribute("hidden","")}),l}))}function Xp(i,p){if(!p)return;let{value:b,selectionStart:h}=i,w=b.slice(0,h),f=/(?:^|\s)@([^\s@`]*)$/.exec(w),l=f?h-(f[1]||"").length-1:h,r=`@${p} `;i.value=`${b.slice(0,l)}${r}${b.slice(h)}`;let c=l+r.length;i.setSelectionRange(c,c),i.dispatchEvent(new(i.ownerDocument.defaultView?.Event||Event)("input",{bubbles:!0})),i.focus()}function Bb(i){return{input$:i.behaviorSubject("chat.input",""),submitted$:i.subject("chat.input.submitted"),activeSessionId$:i.behaviorSubject("session.activeId",null),sidebarSelectedSession$:i.behaviorSubject(Di,Qp()),toastRequested$:i.subject("toast.requested")}}function qi(i){let p=[],b=new Set,h=/(^|[\s`])@([^\s@`]+)/g,w=h.exec(String(i||""));while(w!==null){let f=w[2]||"";if((w[1]||"")!=="`"&&f&&!b.has(f))b.add(f),p.push(f);w=h.exec(String(i||""))}return p}function Wb(i=[],p=[]){let b=[],h=new Set;for(let w of[...i,...p]){let f=v(w);if(!f||h.has(f))continue;h.add(f),b.push(w)}return b}function x(i){return i.app?.piWebSidebar?.getSnapshot?.().activeWorkspaceId||i.app?.dataset.activeWorkspaceId||""}function Qp(){return g({})}function g(i){let p=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),b=p?.activeSessionId||"",h=p?.activeWorkspaceId||"";if(b)return{sessionId:b,workspaceId:h||void 0};return null}function D(i,p){if(p?.workspaceId&&i.app)i.app.dataset.activeWorkspaceId=p.workspaceId,yi(e,p.workspaceId);if(p?.sessionId)i.app?.setAttribute("data-active-session-id",p.sessionId),yi(ji,p.sessionId)}function Kp(i){i.app?.removeAttribute("data-active-session-id"),gp(ji),globalThis.piWeb?.behaviorSubject("session.activeId",null).next(null)}function K(i,p,b={}){let h=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),w={type:p,detail:b,snapshot:h};(i.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$)?.next(w),globalThis.piWeb?.subject(Vi).next(w)}function ii(i,p,b){let h=i.app?.dataset.activeWorkspaceId||x(i),w={reason:b,sessionId:p,workspaceId:h};globalThis.piWeb?.behaviorSubject("session.activeId",p).next(p),globalThis.piWeb?.subject("session.changed").next({sessionId:p,workspaceId:h,reason:b}),K(i,"active.start",w),K(i,"session.created",w)}function yi(i,p){try{localStorage.setItem(i,p)}catch{}}function gp(i){try{localStorage.removeItem(i)}catch{}}async function V(i,p,b={},h=x(i)){if(!i.backend)return{};let w=await i.backend(p,{workspaceId:h,data:b});return F(w)?w:{}}function Ri(i){let p=Array.isArray(i.warnings)?i.warnings.filter((b)=>typeof b==="string"&&b.trim().length>0):[];for(let b of p)globalThis.piWeb?.subject("toast.requested").next({level:"warning",message:b})}function Pb(i,p){return i.trim().startsWith("!")?[]:[...p]}async function Bp(i,p,b,h,w,f){let l=ki(i,b),r=N(i);h.backendChatToken+=1,h.runEventsAbort?.abort();let c=new AbortController;h.runEventsAbort=c,h.sessionEventsAbort?.abort();let L={id:G(),role:"user",text:w,attachments:si(f),createdAt:Date.now()},T=A(b,l);T.messages.push(L),T.updatedAt=Date.now(),E(b),R(p,T.messages,l);let O=await up(i,w,f,l,r.path,r.id);if(Ri(O),typeof O.activeSessionId==="string"&&O.activeSessionId){let z=l,C=b.activeSessionId===z;if(l=O.activeSessionId,C)J(b,l),D(i,{sessionId:O.activeSessionId,workspaceId:r.id||void 0}),K(i,"chat-session",{reason:"startPrompt",sessionId:O.activeSessionId}),ii(i,O.activeSessionId,"startPrompt");else A(b,l);Nb(b,z,l,L.id)}if(typeof O.runId!=="string"||!O.runId){let z=await dp(i,w,f,l,r.path,r.id);Ri(z);let C=op(i,b,z,"submitPrompt",l);if(b.activeSessionId===l)R(p,C,l);if(h.runEventsAbort===c)h.runEventsAbort=void 0;return}let H=A(b,l),M=Ip(H);try{await Wp(i,b,H,O.runId,r.path,r.id,M,()=>{if(b.activeSessionId===l)R(p,H.messages,l)},c.signal)}finally{if(h.runEventsAbort===c)h.runEventsAbort=void 0}if(b.activeSessionId===l)d(i,p,b,h,l,r.path,r.id)}async function Wp(i,p,b,h,w,f,l,r,c){let L=await Xi(i,"streamEventsSse",{runId:h,cursor:0,workspacePath:w},c,f);if(!L)throw Error("SSE streaming backend did not return a stream");let T=Yi(r);l.streaming=!0,T.flush();try{await Qi(L,(O)=>{Sp(l,[O]),l.streaming=O.type!=="run.end",b.updatedAt=Date.now(),E(p),T.request()})}finally{l.streaming=!1,E(p),T.flush()}}function Yi(i){let p=0,b,h=()=>{if(b)clearTimeout(b),b=void 0},w=()=>{h(),p=Date.now(),i()};return{request:()=>{let l=Ep-(Date.now()-p);if(l<=0){w();return}b||=setTimeout(w,l)},flush:w,cancel:h}}async function Xi(i,p,b={},h,w=x(i)){if(!i.backendStream)throw Error("SSE streaming backend is unavailable");let f=await i.backendStream(p,{workspaceId:w,data:b},{signal:h});return Pp(f)}function Pp(i){if(typeof ReadableStream<"u"&&i instanceof ReadableStream)return i;if(typeof Response<"u"&&i instanceof Response)return i.body;if(typeof i==="string")return zi(i);if(!F(i))return null;let p=i.body;if(typeof ReadableStream<"u"&&p instanceof ReadableStream)return p;let b=i.sse;if(typeof b==="string")return zi(b);return null}function zi(i){let p=new TextEncoder().encode(i);return new ReadableStream({start(b){b.enqueue(p),b.close()}})}async function Qi(i,p){let b=i.getReader(),h=new TextDecoder,w="";while(!0){let f=await b.read();if(f.done){w+=h.decode(),kp(w,p);return}w+=h.decode(f.value,{stream:!0});let l=vp(w);w=l.remainder;for(let r of l.frames)Ki(r,p)}}function vp(i){let b=i.replaceAll(`\r
`,`
`).replaceAll("\r",`
`).split(`

`),h=b.pop()||"";return{frames:b,remainder:h}}function kp(i,p){let b=i.trim();if(b)Ki(b,p)}function Ki(i,p){let b=i.split(`
`).filter((h)=>h.startsWith("data:")).map((h)=>h.slice(5).trimStart()).join(`
`);if(!b)return;try{let h=JSON.parse(b);if(mp(h))p(h)}catch{}}function Ai(i,p){globalThis.piWeb?.subject("chat.input.submitted").next({text:i,attachments:si(p)||[]})}async function up(i,p,b,h,w=N(i).path,f=N(i).id){try{return await V(i,"startPrompt",gi(p,b,h,w),f)}catch(l){if(xp(l))return{};throw l}}function xp(i){return/unknown method: (startPrompt|streamEventsSse)|unsupported method: (startPrompt|streamEventsSse)|(startPrompt|streamEventsSse) unsupported/i.test(fi(i))}async function dp(i,p,b,h="",w=N(i).path,f=N(i).id){return await V(i,"submitPrompt",gi(p,b,h,w),f)}function gi(i,p,b,h){let w={text:i,attachments:p,sessionId:b};if(h)w.workspacePath=h;return w}function Ip(i){let p=[...i.messages].reverse().find((h)=>h.role==="assistant"&&h.streaming);if(p)return p;let b={id:G(),role:"assistant",text:"",createdAt:Date.now(),streaming:!0};return i.messages.push(b),b}function Sp(i,p){for(let b of p)if(b.type==="text.delta"&&typeof b.delta==="string")i.text+=b.delta;else if(b.type==="thinking.delta"&&typeof b.delta==="string")i.thinking=`${i.thinking||""}${b.delta}`;else if(b.type==="tool.start")o(i,b,"running");else if(b.type==="tool.delta"&&typeof b.delta==="string"){let h=o(i,b,"running");h.text=b.delta}else if(b.type==="tool.end"){let h=o(i,b,b.isError?"err":"ok");if(typeof b.result==="string"&&b.result)h.text=b.result}else if(b.type==="error"&&typeof b.message==="string")i.text+=`${i.text?`
`:""}${b.message}`}function o(i,p,b){let h=p.toolCallId||p.toolName||"tool";i.toolCalls||=[];let w=i.toolCalls.find((f)=>f.id===h);if(!w)w={id:h,name:p.toolName||"tool",args:p.args,text:"",status:b},i.toolCalls.push(w);if(w.status=b,ap(w,p))w.args=p.args,w.argsStatus=p.argsStatus;return w}function ap(i,p){if(!p.argsStatus)return Boolean(p.args);if(p.argsStatus==="unavailable")return!i.argsStatus;return!0}function mp(i){return F(i)&&typeof i.type==="string"}async function d(i,p,b,h,w="",f=pi(i),l=N(i).id){if(!i.backendStream){await Ni(i,p,b,h,w,f);return}let r=++h.backendChatToken;h.sessionEventsAbort?.abort();let c=new AbortController;h.sessionEventsAbort=c;let L=Yi(()=>{R(p,B(b).messages,b.activeSessionId)});try{let T=await Xi(i,"sessionEventsSse",Bi(i,w,f),c.signal,l);if(!T)throw Error("session SSE backend did not return a stream");await Qi(T,(O)=>{if(r!==h.backendChatToken||O.type!=="chat.state")return;if(Pi(i,b,np(O),"chatState").length)L.request()})}catch(T){if(!c.signal.aborted)await Ni(i,p,b,h,w,f)}finally{if(L.cancel(),h.sessionEventsAbort===c)h.sessionEventsAbort=void 0}}async function Ni(i,p,b,h,w="",f=pi(i)){let l=++h.backendChatToken;try{let r=await V(i,"chatState",Bi(i,w,f));if(l!==h.backendChatToken)return;let c=Pi(i,b,r,"chatState");if(c.length)R(p,c,b.activeSessionId)}catch{}}function Bi(i,p,b=pi(i)){let h=p?{sessionId:p}:{};if(b)h.workspacePath=b;return h}function np(i){return{activeSessionId:i.activeSessionId,messages:i.messages,isStreaming:i.isStreaming}}function pi(i){return N(i).path}function N(i){let p=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),b=p?.activeWorkspaceId||i.app?.dataset.activeWorkspaceId||"",h=p?.workspaces?.find((w)=>w.id===b)?.path||"";return{id:b,path:h}}function Wi(i,p){let b=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),h=p.workspaceId||b?.activeWorkspaceId||i.app?.dataset.activeWorkspaceId||"",w=b?.workspaces?.find((f)=>f.id===h)?.path||"";if(w||h!==b?.activeWorkspaceId)return{id:h,path:w};return N(i)}function Pi(i,p,b,h){let w=wi(b.messages);if(typeof b.activeSessionId==="string"&&b.activeSessionId){let r=p.activeSessionId;if(J(p,b.activeSessionId),D(i,{sessionId:b.activeSessionId,workspaceId:i.app?.dataset.activeWorkspaceId||x(i)||void 0}),h!=="chatState"||r!==b.activeSessionId)K(i,"chat-session",{reason:h,sessionId:b.activeSessionId});if(h!=="chatState")ii(i,b.activeSessionId,h)}let f=B(p);if(!w.length)return[];let l=oi(f.messages,w).slice(-Q);if(!vi(f.messages,l))return[];if(f.messages=l,f.title==="New chat"){let r=f.messages.find((c)=>c.role==="user");if(r)f.title=r.text.slice(0,48)||f.title}return f.updatedAt=Date.now(),E(p),f.messages}function vi(i,p){if(i.length!==p.length)return!0;return i.some((b,h)=>Fi(b)!==Fi(p[h]))}function Fi(i){return JSON.stringify({id:i.id,role:i.role,text:i.text,thinking:i.thinking,streaming:i.streaming,toolCalls:i.toolCalls,attachments:i.attachments})}function op(i,p,b,h,w){let f=wi(b.messages),l=typeof b.activeSessionId==="string"&&b.activeSessionId?b.activeSessionId:w,r=p.activeSessionId===w;if(l!==w)if(r)J(p,l),D(i,{sessionId:l,workspaceId:N(i).id||void 0}),K(i,"chat-session",{reason:h,sessionId:l}),ii(i,l,h);else A(p,l);let c=A(p,l);if(!f.length)return[];let L=oi(c.messages,f).slice(-Q);if(!vi(c.messages,L))return[];return c.messages=L,c.updatedAt=Date.now(),E(p),c.messages}function tp(i,p,b,h,w){let f=(L)=>{if(!L?.sessionId)return;if(ui(p,h,L))return;D(p,L),J(h,L.sessionId),R(b,B(h).messages,h.activeSessionId);let T=Wi(p,L);d(p,b,h,w,L.sessionId,T.path,T.id)},l=(L)=>{if(sp(p,b,h,w,L))return;let T=ib(p,L);if(T)f(T)},r=p.app?.piWebSidebar?.channels?.selectedSession$||globalThis.piWebSidebar?.channels?.selectedSession$,c=p.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$;if(r)i.add(r.subscribe(f));if(c)i.add(c.subscribe(l));if(p.app)i.listen(p.app,"pi-web-sidebar:session-created",(L)=>{let T=L.detail||{},O=typeof T.sessionId==="string"?T.sessionId:"",H=typeof T.workspaceId==="string"?T.workspaceId:"";if(O)f({sessionId:O,workspaceId:H||void 0})});if(globalThis.piWeb)i.add(globalThis.piWeb.behaviorSubject(Di,g(p)).subscribe(f)),i.add(globalThis.piWeb.subject(Vi).subscribe(l)),i.add(globalThis.piWeb.behaviorSubject("session.activeId",null).subscribe((L)=>{if(!L)return;f({sessionId:L,workspaceId:p.app?.dataset.activeWorkspaceId||ti(e)||void 0})}))}function ki(i,p){let b=g(i);if(b?.sessionId&&!ui(i,p,b))D(i,b),J(p,b.sessionId);if(!p.activeSessionId)return A(p,"",!0).id;return p.activeSessionId}function ui(i,p,b){let h=b.workspaceId||"",w=i.app?.dataset.activeWorkspaceId||ti(e)||"";return p.activeSessionId===b.sessionId&&(!h||h===w)}function sp(i,p,b,h,w){if(w.type!=="session.deleted")return!1;let f=xi(w);if(!f)return!0;let l=b.activeSessionId===f,r=b.sessions.length;if(b.sessions=b.sessions.filter((c)=>c.id!==f),l){h.runEventsAbort?.abort(),h.sessionEventsAbort?.abort();let c=ep(i,w,f);if(c?.sessionId){D(i,c),J(b,c.sessionId),bb(p,B(b).messages,b.activeSessionId);let L=Wi(i,c);return d(i,p,b,h,c.sessionId,L.path,L.id),!0}return b.activeSessionId="",Kp(i),E(b),bi(p),!0}if(b.sessions.length!==r)E(b);return!0}function ep(i,p,b){let h=p.snapshot?.activeSessionId||"",w=p.snapshot?.activeWorkspaceId||"";if(h&&h!==b)return{sessionId:h,workspaceId:w||void 0};let f=g(i);if(f?.sessionId&&f.sessionId!==b)return f;return null}function ib(i,p){if(!pb(p.type))return null;let b=p.detail||{},h=xi(p)||p.snapshot?.activeSessionId||"",w=typeof b.workspaceId==="string"?b.workspaceId:p.snapshot?.activeWorkspaceId||i.app?.dataset.activeWorkspaceId||"";if(!h)return null;return{sessionId:h,workspaceId:w||void 0}}function xi(i){let p=i.detail||{};if(typeof p.sessionId==="string")return p.sessionId;if(typeof p.id==="string")return p.id;return""}function pb(i){return i==="session.selected"||i==="session.created"||i==="new-session"||i==="active.start"}function J(i,p){let b=i.sessions.find((h)=>h.id===p);if(!b)b=I(p),i.sessions.unshift(b);return i.activeSessionId=b.id,E(i),b}function R(i,p,b){if(Si(p,b),!p.length){bi(i);return}(i.querySelector(".term-inner")||i).replaceChildren(...p.map((w)=>Ii(w,b))),hi(i)}function bb(i,p,b){Si(p,b),(i.querySelector(".term-inner")||i).replaceChildren(...p.map((w)=>Ii(w,b))),hi(i)}function bi(i){let p=i.querySelector(".term-inner")||i,b=document.createElement("article");b.className="pi-web-chat-docs",b.setAttribute("aria-label","pi-web-chat guide");let h=document.createElement("h1");h.textContent="pi-web-chat guide";let w=document.createElement("p");w.textContent=["Select or create a session in the sidebar to load chat history,","or type below to start a new session."].join(" ");let f=document.createElement("ul");for(let l of["Ask pi in the prompt box and press Cmd/Ctrl+Enter to send.","Type ! then Space at the start to turn the prompt yellow and run shell commands in the workspace.","Queued file attachments hide during shell mode and reappear for the next normal prompt.","Type @ to list project files, then pick one to tag it as prompt context.","Type / at the start to open the slash command list.","Chats are cached locally after you start or select a session."]){let r=document.createElement("li");r.textContent=l,f.append(r)}b.append(h,w,f),p.replaceChildren(b),hi(i)}function hb(i,p){let b=p.querySelector(".term"),h=p.querySelector("[data-action='scroll-bottom']");if(!b||!h)return;let w={term:b,button:h,pinned:!0,touchStartY:null};s.set(p,w),h.hidden=!1,u(w),i.listen(h,"click",()=>{w.pinned=!0,di(w),u(w)}),i.listen(b,"wheel",(f)=>{if(f.deltaY<0)Mi(w)}),i.listen(b,"touchstart",(f)=>{let l=f;w.touchStartY=l.touches.item(0)?.clientY??null}),i.listen(b,"touchmove",(f)=>{let r=f.touches.item(0)?.clientY;if(typeof r==="number"&&w.touchStartY!==null&&r-w.touchStartY>8)Mi(w)}),i.listen(b,"touchend",()=>{w.touchStartY=null}),i.add({remove:()=>{s.delete(p)}})}function hi(i){let p=s.get(i);if(!p)return;if(p.pinned)di(p);u(p)}function di(i){i.term.scrollTop=i.term.scrollHeight}function Mi(i){i.pinned=!1,u(i)}function u(i){i.button.dataset.pinned=i.pinned?"true":"false",i.button.setAttribute("aria-pressed",i.pinned?"true":"false")}function Ii(i,p){let b=document.createElement("article");b.className="transcript-item",b.dataset.messageId=i.id;let h=document.createElement("div");h.className="msg",h.dataset.kind=t(i.role);let w=document.createElement("span");w.className=`prefix ${t(i.role)}`,w.textContent=Rb(i.role);let f=document.createElement("pre");if(f.className=`body ${t(i.role)}`,f.textContent=i.text,h.append(w,f),wb(i))b.append(h);if(i.thinking)b.append(fb(i.thinking,Boolean(i.streaming)));for(let l of i.toolCalls||[])b.append(lb(l,ai(p,i,l)));if(i.streaming)b.dataset.streaming="true";return b}function wb(i){let p=i.text.trim().length>0;return i.role!=="assistant"||p}function fb(i,p){let b=document.createElement("details");b.className="msg-detail think thinking-block",b.open=p;let h=document.createElement("summary");h.className="label",h.textContent="THINKING";let w=document.createElement("pre");return w.className="body",w.textContent=i,b.append(h,w),b}function Si(i,p){let b=new Set;for(let h of i)for(let w of h.toolCalls||[])b.add(ai(p,h,w));for(let h of j)if(!b.has(h))j.delete(h)}function ai(i,p,b){return`${i}:${p.id}:${b.id}`}function lb(i,p){let b=document.createElement("div");b.className="tool-card",b.dataset.tool=i.name||"tool",b.dataset.status=i.status;let h=!j.has(p);b.dataset.collapsed=h?"true":"false";let w=document.createElement("button");if(w.type="button",w.className="tc-head",w.title=h?"Show tool output":"Hide tool output",w.setAttribute("aria-expanded",h?"false":"true"),w.setAttribute("aria-label",`${h?"Show":"Hide"} ${i.name||"tool"} output`),w.append(Tb(i),Ob(i),Cb(i),_b(i,h)),!h)b.append(mi(i));return w.addEventListener("click",()=>Lb(b,w,i,p)),b.prepend(w),b}function mi(i){let p=document.createElement("pre");return p.className="tc-body",p.textContent=i.text||Eb(i),p}function cb(i,p){let b=0,h,w=p.ownerDocument.defaultView,f=typeof w?.matchMedia==="function"?w.matchMedia("(prefers-reduced-motion: reduce)"):void 0,l=()=>{if(h)clearInterval(h),h=void 0},r=()=>{b=(b+1)%Gi;for(let T of p.querySelectorAll(".spinner"))T.dataset.frame=String(b)},c=()=>{let T=p.querySelectorAll(".spinner");if(f?.matches||T.length===0){l(),b=0;for(let O of T)O.dataset.frame="0";return}if(!h)h=setInterval(r,Hp)},L=new(w?.MutationObserver||MutationObserver)(c);L.observe(p,{childList:!0,subtree:!0}),f?.addEventListener("change",c),c(),i.add({remove:()=>{L.disconnect(),f?.removeEventListener("change",c),l()}})}function rb(){let i=document.createElement("span");i.className="spinner",i.dataset.frame="0",i.setAttribute("aria-hidden","true");for(let p=0;p<Gi;p+=1)i.append(document.createElement("span"));return i}function Lb(i,p,b,h){let w=i.querySelector(".tc-body"),f=w!==null;if(w)w.remove(),j.delete(h);else i.append(mi(b)),j.add(h);i.dataset.collapsed=f?"true":"false",p.setAttribute("aria-expanded",f?"false":"true"),p.setAttribute("aria-label",`${f?"Show":"Hide"} ${i.dataset.tool||"tool"} output`),p.title=f?"Show tool output":"Hide tool output";let l=p.querySelector(".tc-toggle-label");if(l)l.textContent=f?"show":"hide"}function Tb(i){let p=document.createElement("span");p.className="tc-glyph";let b=Hb(i),h=b?$p[b]:"";if(!b||!h)return p.textContent="●",p;return p.innerHTML=`<svg class="tc-icon" data-tool-icon="${b}" aria-hidden="true" viewBox="0 0 24 24">${h}</svg>`,p}function Ob(i){let p=document.createElement("span");return p.className="tc-name",p.textContent=i.name||"tool",p}function Cb(i){let p=document.createElement("span");return p.className="tc-args",p.textContent=ni(i),p}function _b(i,p){let b=document.createElement("span");if(b.className="tc-meta",i.status==="running"){let f=rb(),l=document.createElement("span");return l.className="running",l.textContent="running",b.append(f,l,Ui(p)),b}let h=document.createElement("span");h.className=i.status==="err"?"err":"ok",h.textContent=i.status==="err"?"✗":"✓";let w=document.createElement("span");return w.textContent=i.status==="err"?" · failed":" · done",b.append(h,w,Ui(p)),b}function Ui(i){let p=document.createElement("span");p.className="tc-toggle";let b=document.createElement("span");b.className="tc-toggle-label",b.textContent=i?"show":"hide";let h=document.createElement("span");return h.className="tc-caret",h.textContent="▸",p.append(b,h),p}function ni(i){if(i.argsStatus==="truncated")return"arguments truncated";if(i.argsStatus==="omitted")return"arguments omitted";if(i.argsStatus==="unavailable")return"arguments unavailable";if(i.argsStatus==="empty")return"no arguments";if(!i.args)return"";return JSON.stringify(i.args)}function Eb(i){if(i.argsStatus==="truncated")return"arguments truncated: too large to display";if(i.argsStatus==="omitted")return"arguments omitted: response too large";if(i.argsStatus==="unavailable")return"arguments unavailable";if(i.argsStatus==="empty")return"no arguments";if(!i.args)return"arguments unavailable";return JSON.stringify(i.args,null,2)}function Hb(i){let p=$b(i.name);if(["bash","shell","sh","zsh","terminal"].includes(p))return yb(ni(i).toLowerCase())||"terminal";return yp[p]}function $b(i){return i.trim().replace(/^functions\./,"").replace(/^multi_tool_use\./,"")}function yb(i){if(/\bgit\b|\bgh\b/.test(i))return"git-branch";if(/\b(go test|bun test|npm test|pnpm test|yarn test|vitest|pytest|cargo test)\b/.test(i))return"circle-check";if(/\b(bun|npm|pnpm|yarn)\s+(run\s+)?build\b|\b(go build|cargo build)\b/.test(i))return"hammer";if(/\b(bun|npm|pnpm|yarn)\s+(add|install|i)\b|\bpip\s+install\b|\bgo\s+get\b/.test(i))return"package";return}function Rb(i){if(i==="assistant")return"pi >";if(i==="user")return"you >";if(i==="system")return"sys >";return"tool >"}function t(i){if(i==="assistant")return"pi";if(i==="system")return"sys";return i}function zb(i){let p=/^\/([^\s/]*)$/.exec(i);return p?p[1].toLowerCase():null}function Ab(i){let p=/(?:^|\s)@([^\s@`]*)$/.exec(i);return p?p[1]:null}function vb(i){return i.length>0}function kb(i,p){return i.trim().startsWith("!")&&p}function oi(i,p){let b=new Map;for(let h of i)b.set(h.id,h);for(let h of p)b.set(h.id,{...b.get(h.id),...h});return[...b.values()].sort((h,w)=>h.createdAt-w.createdAt)}function B(i){return A(i,i.activeSessionId,!0)}function A(i,p,b=!1){let h=i.sessions.find((w)=>w.id===p);if(!h)h=I(p||void 0),i.sessions.unshift(h),E(i);if(b||!i.activeSessionId)i.activeSessionId=h.id,E(i);return h}function Nb(i,p,b,h){if(p===b)return;let w=i.sessions.find((c)=>c.id===p),f=w?.messages.findIndex((c)=>c.id===h)??-1;if(!w||f<0)return;let[l]=w.messages.splice(f,1),r=A(i,b);if(!r.messages.some((c)=>c.id===l.id))r.messages.push(l);w.updatedAt=Date.now(),r.updatedAt=Date.now(),Fb(i,w.id),E(i)}function Fb(i,p){let b=i.sessions.find((h)=>h.id===p);if(!b||b.id===i.activeSessionId||b.messages.length>0||b.title!=="New chat")return;i.sessions=i.sessions.filter((h)=>h.id!==b.id)}function I(i=G()){let p=Date.now();return{id:i,title:"New chat",createdAt:p,updatedAt:p,messages:[]}}function ti(i){try{return localStorage.getItem(i)||""}catch{return""}}function Mb(i){let p=I(i);return{activeSessionId:p.id,sessions:[p]}}function Ub(){try{let i=JSON.parse(localStorage.getItem(k)||"null");if(i&&Array.isArray(i.sessions))return{activeSessionId:"",sessions:i.sessions.filter(ei).map(ip)}}catch{}return{activeSessionId:"",sessions:[]}}function Zb(i=""){try{let p=JSON.parse(localStorage.getItem(k)||"null");if(p&&typeof p.activeSessionId==="string"&&Array.isArray(p.sessions)){let b=p.sessions.filter(ei).map(ip);if(i&&!b.some((h)=>h.id===i))b.unshift(I(i));return{activeSessionId:i||p.activeSessionId,sessions:b}}}catch{}return Mb(i||void 0)}function E(i){Zi(i);try{localStorage.setItem(k,JSON.stringify(i))}catch{for(let p of i.sessions)p.messages=p.messages.slice(-Math.floor(Q/2));Zi(i);try{localStorage.setItem(k,JSON.stringify(i))}catch{}}}function si(i){if(!i?.length)return;return i.map(({content:p,...b})=>b)}function Zi(i){i.sessions.sort((h,w)=>w.updatedAt-h.updatedAt);let p=i.sessions.find((h)=>h.id===i.activeSessionId),b=i.sessions.filter((h)=>h.id!==i.activeSessionId).slice(0,Math.max(0,Hi-1));i.sessions=p?[p,...b]:i.sessions.slice(0,Hi);for(let h of i.sessions)if(h.messages.length>Q)h.messages.splice(0,h.messages.length-Q)}function ei(i){return F(i)&&typeof i.id==="string"&&Array.isArray(i.messages)}function ip(i){return{...i,messages:wi(i.messages)}}function wi(i){return Array.isArray(i)?i.filter(Jb).map(Db):[]}function Db(i){if(!Array.isArray(i.toolCalls)){let{toolCalls:p,...b}=i;return b}return{...i,toolCalls:i.toolCalls.filter(Vb)}}function Vb(i){if(!F(i)||typeof i.id!=="string"||typeof i.name!=="string")return!1;return typeof i.text==="string"&&Gb(i.status)&&jb(i.argsStatus)}function jb(i){return i===void 0||i==="present"||i==="empty"||i==="unavailable"||i==="truncated"||i==="omitted"}function Gb(i){return i==="running"||i==="ok"||i==="err"}function Jb(i){if(!F(i)||typeof i.id!=="string"||typeof i.text!=="string")return!1;return typeof i.createdAt==="number"&&qb(i.role)}function qb(i){return i==="user"||i==="assistant"||i==="tool"||i==="system"}function F(i){return typeof i==="object"&&i!==null}function G(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`}function fi(i){return i instanceof Error?i.message:String(i)}export{Pb as submittedAttachmentsForText,kb as shellAttachmentNoteVisible,fp as setComposerMode,bp as renderMessages,cp as promptFromAgUiLikeRunInput,Ci as pluginStyleText,S as pluginClass,Wb as mergeCommands,vb as hasQueuedAttachmentNames,x as getActiveWorkspaceId,Vp as formatShellOutput,qi as extractRefs,Rp as default,Ti as createComposerSurface,Li as createChatSurface,pp as createChatDom,Bb as createChannels,lp as createAgUiLikeRunInput,v as commandName,rp as chatEventsToAgUiLikeEvents,V as backendCall};
