var U={attachFile:["M16.5 6v11.5a4 4 0 0 1-8 0V5a2.5 2.5 0 0 1 5 0v10.5a1 1 0 0 1-2 0V6H10v9.5","a2.5 2.5 0 0 0 5 0V5a4 4 0 0 0-8 0v12.5a5.5 5.5 0 0 0 11 0V6h-1.5Z"].join(""),stop:"M6 6h12v12H6V6Z",send:"M2 21 23 12 2 3v7l15 2-15 2v7Z",terminal:"M3 4h18v16H3V4Zm2 2v12h14V6H5Zm2 3 1.1-1.1L12.2 12l-4.1 4.1L7 15l3-3-3-3Zm6 6h5v1.5h-5V15Z",file:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 2.5L17.5 8H14V4.5ZM8 13h8v1.5H8V13Zm0 3h8v1.5H8V16Z"},X={attachFile:Z("attach_file",U.attachFile),stop:Z("stop",U.stop),send:Z("send",U.send),terminal:Z("terminal",U.terminal)};function Z(i,p){return`<svg class="material-icon" data-material-icon="${i}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="${p}"></path></svg>`}function a(){return"pi-web-chat-mounted"}function Oi(){let i=document.createElement("main");return i.className="main pi-web-chat-surface",i.dataset.main="session",i.innerHTML='<div class="term"><div class="term-inner" role="log" aria-live="polite" aria-relevant="additions text"></div></div><button type="button" class="scroll-bottom-btn" data-action="scroll-bottom" aria-label="stick to bottom" title="stick to bottom" aria-pressed="true" hidden>↓</button>',i}function Ci(){let i=document.createElement("section");return i.className="prompt-region pi-web-chat-composer",i.innerHTML=`
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
    <div class="prompt-meta" data-prompt-meta>— | <span class="prompt-meta-item prompt-meta-branch"><span>—</span></span></div>`,i}function _i(i){let p=document.createElement("span");return p.className="prompt-meta-item pi-web-chat-badge",p.textContent="chat plugin",i.querySelector("[data-prompt-meta]")?.append(p),p}function ip(){let i=document.createElement("section");return i.className="pi-web-chat-root",i.dataset.plugin="pi-web-chat",i.innerHTML=`
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
    </section>`,{root:i,transcript:R(i.querySelector("[data-chat-transcript]")),textarea:R(i.querySelector("[data-chat-input]")),sendButton:R(i.querySelector("[data-send]")),attachButton:R(i.querySelector("[data-attach]")),fileInput:R(i.querySelector("[data-file-input]")),slashPopover:R(i.querySelector("[data-slash-popover]")),slashList:R(i.querySelector("[data-slash-list]")),refsPopover:R(i.querySelector("[data-refs-popover]")),refsList:R(i.querySelector("[data-refs-list]")),attachments:R(i.querySelector("[data-attachments]"))}}function pp(i,p){i.replaceChildren(...p.map(bp)),i.scrollTop=i.scrollHeight}function bp(i){let p=document.createElement("article");p.className=`pi-web-chat-message pi-web-chat-message-${i.role}`,p.dataset.messageId=i.id;let b=document.createElement("div");b.className="pi-web-chat-message-role",b.textContent=i.role;let h=document.createElement("pre");if(h.className="pi-web-chat-message-body",h.textContent=i.text,p.append(b,h),i.thinking){let f=document.createElement("details");f.className="pi-web-chat-thinking",f.open=Boolean(i.streaming);let w=document.createElement("summary");w.textContent="thinking";let l=document.createElement("pre");l.textContent=i.thinking,f.append(w,l),p.append(f)}if(i.toolCalls?.length){let f=document.createElement("div");f.className="pi-web-chat-tools";for(let w of i.toolCalls){let l=document.createElement("details");l.className=`pi-web-chat-tool pi-web-chat-tool-${w.status}`,l.open=w.status==="running";let r=document.createElement("summary");r.textContent=`${w.name} · ${w.status}`;let c=document.createElement("pre");c.textContent=w.text||hp(w),l.append(r,c),f.append(l)}p.append(f)}if(i.streaming){let f=document.createElement("div");f.className="pi-web-chat-message-meta",f.textContent="streaming...",p.append(f)}if(i.attachments?.length){let f=document.createElement("div");f.className="pi-web-chat-message-meta",f.textContent=`${i.attachments.length} attachment(s)`,p.append(f)}return p}function hp(i){if(i.argsStatus==="truncated")return"arguments truncated: too large to display";if(i.argsStatus==="omitted")return"arguments omitted: response too large";if(i.argsStatus==="unavailable")return"arguments unavailable";if(i.argsStatus==="empty")return"no arguments";if(!i.args)return"arguments unavailable";return JSON.stringify(i.args,null,2)}function fp(i,p){i.root.dataset.composerMode=p,n(i.attachButton,p)}function n(i,p){if(i.disabled=p==="shell",i.setAttribute("aria-disabled",p==="shell"?"true":"false"),p==="shell"){i.innerHTML=X.terminal,i.title="shell command mode",i.setAttribute("aria-label","shell command mode");return}if(p==="file-ref"){i.innerHTML=Z("file",U.file),i.title="file reference mode",i.setAttribute("aria-label","file reference mode");return}i.innerHTML=X.attachFile,i.title="attach files",i.setAttribute("aria-label","attach files")}function o(i,p){i.hidden=p.length===0,i.replaceChildren(...p.map((b)=>{let h=document.createElement("span");return h.className="pi-web-chat-attachment-chip",h.textContent=b,h}))}function Ei(){return`
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
  `}function Hi(){document.getElementById("pi-web-chat-style")?.remove();let i=document.createElement("style");return i.id="pi-web-chat-style",i.textContent=Ei(),document.head.append(i),i}function v(i){return i.command||i.cmd||(i.name?`/${i.name}`:"")}function R(i){if(!i)throw Error("pi-web-chat DOM template is invalid");return i}function wp(i,p,b){return{threadId:i,runId:p,state:{},messages:b,tools:[],context:[]}}function lp(i){let p=[...i.messages].reverse().find((b)=>b.role==="user");return{text:p?.text||"",attachments:p?.attachments||[],sessionId:i.threadId}}function cp(i,p,b){return i.map((h)=>rp(h,p,b))}function rp(i,p,b){if(i.type==="text.delta")return{type:"TEXT_MESSAGE_CONTENT",threadId:p,runId:b,delta:i.delta||""};if(i.type==="thinking.delta")return{type:"THINKING_MESSAGE_CONTENT",threadId:p,runId:b,delta:i.delta||""};if(i.type==="tool.start")return{type:"TOOL_CALL_START",threadId:p,runId:b,toolCallId:i.toolCallId,payload:$i(i)};if(i.type==="tool.delta")return{type:"TOOL_CALL_ARGS",threadId:p,runId:b,toolCallId:i.toolCallId,delta:i.delta||""};if(i.type==="tool.end")return{type:"TOOL_CALL_END",threadId:p,runId:b,toolCallId:i.toolCallId,payload:$i(i)};return{type:i.type.toUpperCase().replaceAll(".","_"),threadId:p,runId:b,payload:i}}function $i(i){return{name:i.toolName||"tool",args:i.args||{},result:i.result||"",isError:i.isError===!0}}var k="pi-web-chat.sessions.v1";var Di="plugin.pi-web-sidebar.selectedSession",Gi="plugin.pi-web-sidebar.event",pi="plugin.pi-web-sidebar.activeSessionId",I="plugin.pi-web-sidebar.activeWorkspaceId",Lp=12,yi=20,Q=200,Tp=8,Op=1e6,Cp=64000;var _p=250,Ji=6,Ep=150,D=new Set,Hp={"book-open":'<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',"file-plus":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="M9 15h6"/>',pencil:'<path d="M21.2 6.8 17.2 2.8a2 2 0 0 0-2.8 0L3 14.2V21h6.8L21.2 9.6a2 2 0 0 0 0-2.8z"/><path d="m14 5 5 5"/>',terminal:'<path d="m4 17 6-6-6-6"/><path d="M12 19h8"/>',cpu:'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 15h3"/><path d="M1 9h3"/><path d="M1 15h3"/>',globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 0 20"/><path d="M12 2a15.3 15.3 0 0 0 0 20"/>',search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',braces:'<path d="M8 3H7a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-4a2 2 0 0 1 2-2 2 2 0 0 1-2-2V7a2 2 0 0 0-2-2h-1"/>',"file-text":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',"circle-question-mark":'<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 1 1 5.8 1c-.5 1-1.4 1.5-2.1 2-.6.4-.8.8-.8 2"/><path d="M12 17h.01"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',plug:'<path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a6 6 0 0 1-12 0V8Z"/>',"git-branch":'<line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',"circle-check":'<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',hammer:'<path d="m15 12-8.5 8.5a2.1 2.1 0 0 1-3-3L12 9"/><path d="m17.6 5.4 1.8-1.8"/><path d="m14 7 3 3"/><path d="M5 11 2 8l6-6 3 3"/>',package:'<path d="m7.5 4.3 9 5.2"/><path d="M21 8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>'},ii=new WeakMap,$p={read:"book-open",write:"file-plus",edit:"pencil",ctx_execute:"cpu",ctx_batch_execute:"cpu",ctx_execute_file:"cpu",ctx_search:"cpu",ctx_index:"cpu",ctx_fetch_and_index:"cpu",web_search:"globe",fetch_content:"search",get_search_content:"search",code_search:"braces",document_parse:"file-text",ask_user_question:"circle-question-mark",teams:"users",subagent:"users",mcp:"plug",git:"git-branch"};class qi{#i=[];add(i){if(i)this.#i.push(i);return i}listen(i,p,b){i.addEventListener(p,b),this.add({remove:()=>i.removeEventListener(p,b)})}dispose(){for(let i of this.#i.splice(0).reverse())if(typeof i==="function")i();else if("unsubscribe"in i)i.unsubscribe();else i.remove()}}function yp(i={}){let p=i.app;if(p?.piWebChat?.dispose(),typeof i.mount?.chat!=="function"||typeof i.mount?.composer!=="function")throw Error("pi-web-chat requires modern pi-web mount.chat and mount.composer APIs");return Rp(i,p)}function Rp(i,p){let b=new qi,h=b.add(Hi()),f=Oi(),w=Ci(),l=i.mount?.chat(f,{replace:!0}),r=i.mount?.composer(w,{replace:!0});if(bb(b,f),lb(b,f),l)b.add(l);if(r)b.add(r);let c=g(i);V(i,c||void 0);let L=!c?.sessionId&&!Fb(),T=Nb(c?.sessionId||""),O={backendChatToken:0};if(L)fi(f);else z(f,B(T).messages,T.activeSessionId),m(i,f,T,O,c?.sessionId||T.activeSessionId);op(b,i,f,T,O),zp(b,i,w,f,T,O);let y=p?b.add(_i(p)):void 0;p?.classList.add(a());let F=()=>{if(O.runEventsAbort?.abort(),O.sessionEventsAbort?.abort(),b.dispose(),D.clear(),y?.remove(),h.remove(),p?.classList.remove(a()),p?.piWebChat===H)delete p.piWebChat},H={dispose:F};if(p)p.piWebChat=H;return F}function zp(i,p,b,h,f,w){let l=b.querySelector(".prompt-textarea"),r=b.querySelector(".send-btn"),c=b.querySelector(".attach-btn"),L=b.querySelector("[data-file-input]"),T=b.querySelector(".attach-chips"),O=b.querySelector(".shell-attachment-note");if(!l||!r)return;let y=b.querySelector(".prompt-bar"),F=b.querySelector(".slash-pop"),H=b.querySelector(".prompt-file-ref-pop"),C={selectedAttachments:[],shellMode:!1,commands:[]},q=()=>{Ap(T,l.value,C)},W=()=>{Np(y,l,c,O,C)},Y=()=>{let $=l.value;if(r.setAttribute("aria-disabled",$.trim()?"false":"true"),q(),Ri(C),C.shellMode){t(F,H);return}Dp(p,b,l,$,C.commands,(_)=>{C.commands=_}),C.fileSearchTimer=setTimeout(()=>{Gp(p,b,l,l.value)},120)},ri=()=>{C.shellMode=!0,t(F,H),W(),q()},Li=()=>{C.shellMode=!1,W(),q()},Ti=async($)=>{$?.preventDefault(),$?.stopImmediatePropagation();let _=l.value.trim();if(Y(),!_)return;r.disabled=!0;try{if(C.shellMode)Fi(_,[]),await Up(p,h,f,_),Li();else{let P=[...C.selectedAttachments,...await Zp(p,_)];Fi(_,P),await gp(p,h,f,w,_,P),C.selectedAttachments=[],q()}if(l.value.trim()===_)l.value="";if(L)L.value=""}catch(P){z(h,[Fp(P)],f.activeSessionId)}finally{r.disabled=!1,W(),Y()}};if(i.listen(l,"input",()=>{if(!C.shellMode&&l.value.startsWith("! "))l.value=l.value.slice(2),ri();Y()}),i.listen(l,"keydown",($)=>{let _=$;if(_.key===" "&&!C.shellMode&&l.value==="!"&&l.selectionStart===1&&l.selectionEnd===1){_.preventDefault(),l.value="",ri(),Y();return}if(_.key==="Backspace"&&C.shellMode&&l.value===""){_.preventDefault(),Li(),Y();return}if(_.key==="Escape"){t(F,H);return}if(_.key==="Enter"&&(_.metaKey||_.ctrlKey))Ti(_)}),i.listen(r,"click",($)=>{Ti($)}),c&&L)i.listen(c,"click",()=>{if(!C.shellMode)L.click()}),i.listen(L,"change",()=>{Mp(L,($)=>{C.selectedAttachments=$,q()})});i.add({remove:()=>Ri(C)}),W()}function Ap(i,p,b){if(!i)return;if(b.shellMode){o(i,[]);return}o(i,[...b.selectedAttachments.map((h)=>h.name||"attachment"),...Yi(p)])}function Np(i,p,b,h,f){if(i?.classList.toggle("shell-mode",f.shellMode),p.setAttribute("placeholder",f.shellMode?"run shell command in workspace…":"ask pi to do something…"),h)h.hidden=!(f.shellMode&&f.selectedAttachments.length>0);if(b)n(b,f.shellMode?"shell":"normal")}function Ri(i){if(i.fileSearchTimer)clearTimeout(i.fileSearchTimer),i.fileSearchTimer=void 0}function t(i,p){i?.setAttribute("hidden",""),p?.setAttribute("hidden","")}function Fp(i){return{id:G(),role:"system",text:`prompt failed: ${ci(i)}`,createdAt:Date.now()}}async function Mp(i,p){let b=Array.from(i.files||[]).slice(0,Tp),h=[];for(let f of b){if(f.size>Op)continue;h.push({name:f.name,size:f.size,content:await f.text(),mimeType:f.type||void 0})}p(h)}async function Up(i,p,b,h){let f=ui(i,b),w=M(b,f),l={id:G(),role:"user",text:`! ${h}`,createdAt:Date.now()},r={id:G(),role:"tool",text:`$ ${h}
(running...)`,createdAt:Date.now()};w.messages.push(l,r),w.updatedAt=Date.now(),E(b),z(p,w.messages,f);try{let c=await j(i,"runShell",{command:h}),L=typeof c.exitCode==="number"?c.exitCode:1,T=typeof c.durationMs==="number"?c.durationMs:0,O=typeof c.output==="string"?c.output:"";r.text=Vp(h,O,L,T,Boolean(c.truncated))}catch(c){r.text=`$ ${h}
${ci(c)}`}w.updatedAt=Date.now(),E(b),z(p,w.messages,f)}async function Zp(i,p){let b=Yi(p);if(!b.length)return[];let h=await j(i,"resolveContext",{text:p,refs:b});return Array.isArray(h.attachments)?h.attachments.filter(N):[]}function Vp(i,p,b,h,f){let w=jp(p,Cp),l=f||w.truncated,r=w.text.endsWith(`
`)||!w.text?"":`
`;return`$ ${i}
${w.text}${r}[exit ${b} · ${h}ms${l?" · truncated":""}]`}function jp(i,p){let b=new TextEncoder,h=b.encode(i);if(h.byteLength<=p)return{text:i,truncated:!1};let f=new TextDecoder().decode(h.slice(0,p));while(f&&b.encode(f).byteLength>p)f=f.slice(0,-1);return{text:f,truncated:!0}}async function Dp(i,p,b,h,f,w){let l=p.querySelector(".slash-pop"),r=p.querySelector(".slash-list"),c=Rb(h);if(c===null||!r){l?.setAttribute("hidden","");return}let L=f;if(!L.length){let O=await j(i,"commands",{});L=Array.isArray(O.commands)?O.commands.filter(N):[],w(L)}if(b.value!==h)return;let T=L.filter((O)=>{return v(O).slice(1).toLowerCase().includes(c)});Jp(r,T,b,l),l?.toggleAttribute("hidden",T.length===0)}async function Gp(i,p,b,h){let f=p.querySelector(".prompt-file-ref-pop"),w=p.querySelector(".prompt-file-ref-list"),l=zb(h);if(l===null||!w){f?.setAttribute("hidden","");return}try{let r=await j(i,"searchFiles",{query:l,limit:Lp}),c=Array.isArray(r.files)?r.files.filter(N):[];if(b.value!==h)return;qp(w,b,c,f),f?.toggleAttribute("hidden",c.length===0)}catch{f?.setAttribute("hidden","")}}function Jp(i,p,b,h){i.replaceChildren(...p.map((f)=>{let w=document.createElement("button"),l=v(f);return w.type="button",w.className="slash-item",w.dataset.slash=l,w.innerHTML='<span class="sl-name"></span><span class="sl-desc"></span>',w.querySelector(".sl-name").textContent=l,w.querySelector(".sl-desc").textContent=f.description||"",w.addEventListener("click",()=>{b.value=f.template||`${l} `,h?.setAttribute("hidden",""),b.dispatchEvent(new(b.ownerDocument.defaultView?.Event||Event)("input",{bubbles:!0})),b.focus()}),w}))}function qp(i,p,b,h){i.replaceChildren(...b.map((f)=>{let w=f.path||f.name||"",l=document.createElement("button");return l.type="button",l.className="prompt-file-ref-item",l.dataset.path=w,l.disabled=!w,l.innerHTML='<span class="pfr-path"></span><span class="pfr-kind"></span>',l.querySelector(".pfr-path").textContent=w,l.querySelector(".pfr-kind").textContent=typeof f.size==="number"?`${f.size} bytes`:"file",l.addEventListener("click",()=>{Yp(p,w),h?.setAttribute("hidden","")}),l}))}function Yp(i,p){if(!p)return;let{value:b,selectionStart:h}=i,f=b.slice(0,h),w=/(?:^|\s)@([^\s@`]*)$/.exec(f),l=w?h-(w[1]||"").length-1:h,r=`@${p} `;i.value=`${b.slice(0,l)}${r}${b.slice(h)}`;let c=l+r.length;i.setSelectionRange(c,c),i.dispatchEvent(new(i.ownerDocument.defaultView?.Event||Event)("input",{bubbles:!0})),i.focus()}function Kb(i){return{input$:i.behaviorSubject("chat.input",""),submitted$:i.subject("chat.input.submitted"),activeSessionId$:i.behaviorSubject("session.activeId",null),sidebarSelectedSession$:i.behaviorSubject(Di,Xp()),toastRequested$:i.subject("toast.requested")}}function Yi(i){let p=[],b=new Set,h=/(^|[\s`])@([^\s@`]+)/g,f=h.exec(String(i||""));while(f!==null){let w=f[2]||"";if((f[1]||"")!=="`"&&w&&!b.has(w))b.add(w),p.push(w);f=h.exec(String(i||""))}return p}function gb(i=[],p=[]){let b=[],h=new Set;for(let f of[...i,...p]){let w=v(f);if(!w||h.has(w))continue;h.add(w),b.push(f)}return b}function S(i){return i.app?.piWebSidebar?.getSnapshot?.().activeWorkspaceId||i.app?.dataset.activeWorkspaceId||""}function Xp(){return g({})}function g(i){let p=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),b=p?.activeSessionId||"",h=p?.activeWorkspaceId||"";if(b)return{sessionId:b,workspaceId:h||void 0};let f=d(pi),w=d(I);return f?{sessionId:f,workspaceId:w||void 0}:null}function V(i,p){if(p?.workspaceId&&i.app)i.app.dataset.activeWorkspaceId=p.workspaceId,zi(I,p.workspaceId);if(p?.sessionId)i.app?.setAttribute("data-active-session-id",p.sessionId),zi(pi,p.sessionId)}function Qp(i){i.app?.removeAttribute("data-active-session-id"),Kp(pi),globalThis.piWeb?.behaviorSubject("session.activeId",null).next(null)}function K(i,p,b={}){let h=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),f={type:p,detail:b,snapshot:h};(i.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$)?.next(f),globalThis.piWeb?.subject(Gi).next(f)}function bi(i,p,b){let h=i.app?.dataset.activeWorkspaceId||S(i),f={reason:b,sessionId:p,workspaceId:h};globalThis.piWeb?.behaviorSubject("session.activeId",p).next(p),globalThis.piWeb?.subject("session.changed").next({sessionId:p,workspaceId:h,reason:b}),K(i,"active.start",f),K(i,"session.created",f)}function zi(i,p){try{localStorage.setItem(i,p)}catch{}}function Kp(i){try{localStorage.removeItem(i)}catch{}}async function j(i,p,b={},h=S(i)){if(!i.backend)return{};let f=await i.backend(p,{workspaceId:h,data:b});return N(f)?f:{}}function Ai(i){let p=Array.isArray(i.warnings)?i.warnings.filter((b)=>typeof b==="string"&&b.trim().length>0):[];for(let b of p)globalThis.piWeb?.subject("toast.requested").next({level:"warning",message:b})}function Bb(i,p){return i.trim().startsWith("!")?[]:[...p]}async function gp(i,p,b,h,f,w){let l=ui(i,b),r=A(i);h.backendChatToken+=1,h.runEventsAbort?.abort();let c=new AbortController;h.runEventsAbort=c,h.sessionEventsAbort?.abort();let L={id:G(),role:"user",text:f,attachments:si(w),createdAt:Date.now()},T=M(b,l);T.messages.push(L),T.updatedAt=Date.now(),E(b),z(p,T.messages,l);let O=await kp(i,f,w,l,r.path,r.id);if(Ai(O),typeof O.activeSessionId==="string"&&O.activeSessionId){let H=l,C=b.activeSessionId===H;if(l=O.activeSessionId,C)J(b,l),V(i,{sessionId:O.activeSessionId,workspaceId:r.id||void 0}),K(i,"chat-session",{reason:"startPrompt",sessionId:O.activeSessionId}),bi(i,O.activeSessionId,"startPrompt");else M(b,l);Ab(b,H,l,L.id)}if(typeof O.runId!=="string"||!O.runId){let H=await xp(i,f,w,l,r.path,r.id);Ai(H);let C=np(i,b,H,"submitPrompt",l);if(b.activeSessionId===l)z(p,C,l);if(h.runEventsAbort===c)h.runEventsAbort=void 0;return}let y=M(b,l),F=dp(y);try{await Bp(i,b,y,O.runId,r.path,r.id,F,()=>{if(b.activeSessionId===l)z(p,y.messages,l)},c.signal)}finally{if(h.runEventsAbort===c)h.runEventsAbort=void 0}if(b.activeSessionId===l)m(i,p,b,h,l,r.path,r.id)}async function Bp(i,p,b,h,f,w,l,r,c){let L=await Qi(i,"streamEventsSse",{runId:h,cursor:0,workspacePath:f},c,w);if(!L)throw Error("SSE streaming backend did not return a stream");let T=Xi(r);l.streaming=!0,T.flush();try{await Ki(L,(O)=>{Ip(l,[O]),l.streaming=O.type!=="run.end",b.updatedAt=Date.now(),E(p),T.request()})}finally{l.streaming=!1,E(p),T.flush()}}function Xi(i){let p=0,b,h=()=>{if(b)clearTimeout(b),b=void 0},f=()=>{h(),p=Date.now(),i()};return{request:()=>{let l=_p-(Date.now()-p);if(l<=0){f();return}b||=setTimeout(f,l)},flush:f,cancel:h}}async function Qi(i,p,b={},h,f=S(i)){if(!i.backendStream)throw Error("SSE streaming backend is unavailable");let w=await i.backendStream(p,{workspaceId:f,data:b},{signal:h});return Wp(w)}function Wp(i){if(typeof ReadableStream<"u"&&i instanceof ReadableStream)return i;if(typeof Response<"u"&&i instanceof Response)return i.body;if(typeof i==="string")return Ni(i);if(!N(i))return null;let p=i.body;if(typeof ReadableStream<"u"&&p instanceof ReadableStream)return p;let b=i.sse;if(typeof b==="string")return Ni(b);return null}function Ni(i){let p=new TextEncoder().encode(i);return new ReadableStream({start(b){b.enqueue(p),b.close()}})}async function Ki(i,p){let b=i.getReader(),h=new TextDecoder,f="";while(!0){let w=await b.read();if(w.done){f+=h.decode(),vp(f,p);return}f+=h.decode(w.value,{stream:!0});let l=Pp(f);f=l.remainder;for(let r of l.frames)gi(r,p)}}function Pp(i){let b=i.replaceAll(`\r
`,`
`).replaceAll("\r",`
`).split(`

`),h=b.pop()||"";return{frames:b,remainder:h}}function vp(i,p){let b=i.trim();if(b)gi(b,p)}function gi(i,p){let b=i.split(`
`).filter((h)=>h.startsWith("data:")).map((h)=>h.slice(5).trimStart()).join(`
`);if(!b)return;try{let h=JSON.parse(b);if(mp(h))p(h)}catch{}}function Fi(i,p){globalThis.piWeb?.subject("chat.input.submitted").next({text:i,attachments:si(p)||[]})}async function kp(i,p,b,h,f=A(i).path,w=A(i).id){try{return await j(i,"startPrompt",Bi(p,b,h,f),w)}catch(l){if(up(l))return{};throw l}}function up(i){return/unknown method: (startPrompt|streamEventsSse)|unsupported method: (startPrompt|streamEventsSse)|(startPrompt|streamEventsSse) unsupported/i.test(ci(i))}async function xp(i,p,b,h="",f=A(i).path,w=A(i).id){return await j(i,"submitPrompt",Bi(p,b,h,f),w)}function Bi(i,p,b,h){let f={text:i,attachments:p,sessionId:b};if(h)f.workspacePath=h;return f}function dp(i){let p=[...i.messages].reverse().find((h)=>h.role==="assistant"&&h.streaming);if(p)return p;let b={id:G(),role:"assistant",text:"",createdAt:Date.now(),streaming:!0};return i.messages.push(b),b}function Ip(i,p){for(let b of p)if(b.type==="text.delta"&&typeof b.delta==="string")i.text+=b.delta;else if(b.type==="thinking.delta"&&typeof b.delta==="string")i.thinking=`${i.thinking||""}${b.delta}`;else if(b.type==="tool.start")s(i,b,"running");else if(b.type==="tool.delta"&&typeof b.delta==="string"){let h=s(i,b,"running");h.text=b.delta}else if(b.type==="tool.end"){let h=s(i,b,b.isError?"err":"ok");if(typeof b.result==="string"&&b.result)h.text=b.result}else if(b.type==="error"&&typeof b.message==="string")i.text+=`${i.text?`
`:""}${b.message}`}function s(i,p,b){let h=p.toolCallId||p.toolName||"tool";i.toolCalls||=[];let f=i.toolCalls.find((w)=>w.id===h);if(!f)f={id:h,name:p.toolName||"tool",args:p.args,text:"",status:b},i.toolCalls.push(f);if(f.status=b,Sp(f,p))f.args=p.args,f.argsStatus=p.argsStatus;return f}function Sp(i,p){if(!p.argsStatus)return Boolean(p.args);if(p.argsStatus==="unavailable")return!i.argsStatus;return!0}function mp(i){return N(i)&&typeof i.type==="string"}async function m(i,p,b,h,f="",w=hi(i),l=A(i).id){if(!i.backendStream){await Mi(i,p,b,h,f,w);return}let r=++h.backendChatToken;h.sessionEventsAbort?.abort();let c=new AbortController;h.sessionEventsAbort=c;let L=Xi(()=>{z(p,B(b).messages,b.activeSessionId)});try{let T=await Qi(i,"sessionEventsSse",Wi(i,f,w),c.signal,l);if(!T)throw Error("session SSE backend did not return a stream");await Ki(T,(O)=>{if(r!==h.backendChatToken||O.type!=="chat.state")return;if(vi(i,b,ap(O),"chatState").length)L.request()})}catch(T){if(!c.signal.aborted)await Mi(i,p,b,h,f,w)}finally{if(L.cancel(),h.sessionEventsAbort===c)h.sessionEventsAbort=void 0}}async function Mi(i,p,b,h,f="",w=hi(i)){let l=++h.backendChatToken;try{let r=await j(i,"chatState",Wi(i,f,w));if(l!==h.backendChatToken)return;let c=vi(i,b,r,"chatState");if(c.length)z(p,c,b.activeSessionId)}catch{}}function Wi(i,p,b=hi(i)){let h=p?{sessionId:p}:{};if(b)h.workspacePath=b;return h}function ap(i){return{activeSessionId:i.activeSessionId,messages:i.messages,isStreaming:i.isStreaming}}function hi(i){return A(i).path}function A(i){let p=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),b=p?.activeWorkspaceId||i.app?.dataset.activeWorkspaceId||"",h=p?.workspaces?.find((f)=>f.id===b)?.path||"";return{id:b,path:h}}function Pi(i,p){let b=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),h=p.workspaceId||b?.activeWorkspaceId||i.app?.dataset.activeWorkspaceId||"",f=b?.workspaces?.find((w)=>w.id===h)?.path||"";if(f||h!==b?.activeWorkspaceId)return{id:h,path:f};return A(i)}function vi(i,p,b,h){let f=li(b.messages);if(typeof b.activeSessionId==="string"&&b.activeSessionId){let r=p.activeSessionId;if(J(p,b.activeSessionId),V(i,{sessionId:b.activeSessionId,workspaceId:i.app?.dataset.activeWorkspaceId||S(i)||void 0}),h!=="chatState"||r!==b.activeSessionId)K(i,"chat-session",{reason:h,sessionId:b.activeSessionId});if(h!=="chatState")bi(i,b.activeSessionId,h)}let w=B(p);if(!f.length)return[];let l=ti(w.messages,f).slice(-Q);if(!ki(w.messages,l))return[];if(w.messages=l,w.title==="New chat"){let r=w.messages.find((c)=>c.role==="user");if(r)w.title=r.text.slice(0,48)||w.title}return w.updatedAt=Date.now(),E(p),w.messages}function ki(i,p){if(i.length!==p.length)return!0;return i.some((b,h)=>Ui(b)!==Ui(p[h]))}function Ui(i){return JSON.stringify({id:i.id,role:i.role,text:i.text,thinking:i.thinking,streaming:i.streaming,toolCalls:i.toolCalls,attachments:i.attachments})}function np(i,p,b,h,f){let w=li(b.messages),l=typeof b.activeSessionId==="string"&&b.activeSessionId?b.activeSessionId:f,r=p.activeSessionId===f;if(l!==f)if(r)J(p,l),V(i,{sessionId:l,workspaceId:A(i).id||void 0}),K(i,"chat-session",{reason:h,sessionId:l}),bi(i,l,h);else M(p,l);let c=M(p,l);if(!w.length)return[];let L=ti(c.messages,w).slice(-Q);if(!ki(c.messages,L))return[];return c.messages=L,c.updatedAt=Date.now(),E(p),c.messages}function op(i,p,b,h,f){let w=(L)=>{if(!L?.sessionId)return;if(xi(p,h,L))return;V(p,L),J(h,L.sessionId),z(b,B(h).messages,h.activeSessionId);let T=Pi(p,L);m(p,b,h,f,L.sessionId,T.path,T.id)},l=(L)=>{if(tp(p,b,h,f,L))return;let T=ep(p,L);if(T)w(T)},r=p.app?.piWebSidebar?.channels?.selectedSession$||globalThis.piWebSidebar?.channels?.selectedSession$,c=p.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$;if(r)i.add(r.subscribe(w));if(c)i.add(c.subscribe(l));if(p.app)i.listen(p.app,"pi-web-sidebar:session-created",(L)=>{let T=L.detail||{},O=typeof T.sessionId==="string"?T.sessionId:"",y=typeof T.workspaceId==="string"?T.workspaceId:"";if(O)w({sessionId:O,workspaceId:y||void 0})});if(globalThis.piWeb)i.add(globalThis.piWeb.behaviorSubject(Di,g(p)).subscribe(w)),i.add(globalThis.piWeb.subject(Gi).subscribe(l)),i.add(globalThis.piWeb.behaviorSubject("session.activeId",null).subscribe((L)=>{if(!L)return;w({sessionId:L,workspaceId:p.app?.dataset.activeWorkspaceId||d(I)||void 0})}))}function ui(i,p){let b=g(i);if(b?.sessionId&&!xi(i,p,b))V(i,b),J(p,b.sessionId);return p.activeSessionId}function xi(i,p,b){let h=b.workspaceId||"",f=i.app?.dataset.activeWorkspaceId||d(I)||"";return p.activeSessionId===b.sessionId&&(!h||h===f)}function tp(i,p,b,h,f){if(f.type!=="session.deleted")return!1;let w=di(f);if(!w)return!0;let l=b.activeSessionId===w,r=b.sessions.length;if(b.sessions=b.sessions.filter((c)=>c.id!==w),l){h.runEventsAbort?.abort(),h.sessionEventsAbort?.abort();let c=sp(i,f,w);if(c?.sessionId){V(i,c),J(b,c.sessionId),pb(p,B(b).messages,b.activeSessionId);let L=Pi(i,c);return m(i,p,b,h,c.sessionId,L.path,L.id),!0}return b.activeSessionId="",Qp(i),E(b),fi(p),!0}if(b.sessions.length!==r)E(b);return!0}function sp(i,p,b){let h=p.snapshot?.activeSessionId||"",f=p.snapshot?.activeWorkspaceId||"";if(h&&h!==b)return{sessionId:h,workspaceId:f||void 0};let w=g(i);if(w?.sessionId&&w.sessionId!==b)return w;return null}function ep(i,p){if(!ib(p.type))return null;let b=p.detail||{},h=di(p)||p.snapshot?.activeSessionId||"",f=typeof b.workspaceId==="string"?b.workspaceId:p.snapshot?.activeWorkspaceId||i.app?.dataset.activeWorkspaceId||"";if(!h)return null;return{sessionId:h,workspaceId:f||void 0}}function di(i){let p=i.detail||{};if(typeof p.sessionId==="string")return p.sessionId;if(typeof p.id==="string")return p.id;return""}function ib(i){return i==="session.selected"||i==="session.created"||i==="new-session"||i==="active.start"}function J(i,p){let b=i.sessions.find((h)=>h.id===p);if(!b)b=x(p),i.sessions.unshift(b);return i.activeSessionId=b.id,E(i),b}function z(i,p,b){if(mi(p,b),!p.length){fi(i);return}(i.querySelector(".term-inner")||i).replaceChildren(...p.map((f)=>Si(f,b))),wi(i)}function pb(i,p,b){mi(p,b),(i.querySelector(".term-inner")||i).replaceChildren(...p.map((f)=>Si(f,b))),wi(i)}function fi(i){let p=i.querySelector(".term-inner")||i,b=document.createElement("article");b.className="pi-web-chat-docs",b.setAttribute("aria-label","pi-web-chat guide");let h=document.createElement("h1");h.textContent="pi-web-chat guide";let f=document.createElement("p");f.textContent=["Select or create a session in the sidebar to load chat history,","or type below to start a new session."].join(" ");let w=document.createElement("ul");for(let l of["Ask pi in the prompt box and press Cmd/Ctrl+Enter to send.","Type ! then Space at the start to turn the prompt yellow and run shell commands in the workspace.","Queued file attachments hide during shell mode and reappear for the next normal prompt.","Type @ to list project files, then pick one to tag it as prompt context.","Type / at the start to open the slash command list.","Chats are cached locally after you start or select a session."]){let r=document.createElement("li");r.textContent=l,w.append(r)}b.append(h,f,w),p.replaceChildren(b),wi(i)}function bb(i,p){let b=p.querySelector(".term"),h=p.querySelector("[data-action='scroll-bottom']");if(!b||!h)return;let f={term:b,button:h,pinned:!0,touchStartY:null};ii.set(p,f),h.hidden=!1,u(f),i.listen(h,"click",()=>{f.pinned=!0,Ii(f),u(f)}),i.listen(b,"wheel",(w)=>{if(w.deltaY<0)Zi(f)}),i.listen(b,"touchstart",(w)=>{let l=w;f.touchStartY=l.touches.item(0)?.clientY??null}),i.listen(b,"touchmove",(w)=>{let r=w.touches.item(0)?.clientY;if(typeof r==="number"&&f.touchStartY!==null&&r-f.touchStartY>8)Zi(f)}),i.listen(b,"touchend",()=>{f.touchStartY=null}),i.add({remove:()=>{ii.delete(p)}})}function wi(i){let p=ii.get(i);if(!p)return;if(p.pinned)Ii(p);u(p)}function Ii(i){i.term.scrollTop=i.term.scrollHeight}function Zi(i){i.pinned=!1,u(i)}function u(i){i.button.dataset.pinned=i.pinned?"true":"false",i.button.setAttribute("aria-pressed",i.pinned?"true":"false")}function Si(i,p){let b=document.createElement("article");b.className="transcript-item",b.dataset.messageId=i.id;let h=document.createElement("div");h.className="msg",h.dataset.kind=e(i.role);let f=document.createElement("span");f.className=`prefix ${e(i.role)}`,f.textContent=yb(i.role);let w=document.createElement("pre");if(w.className=`body ${e(i.role)}`,w.textContent=i.text,h.append(f,w),hb(i))b.append(h);if(i.thinking)b.append(fb(i.thinking,Boolean(i.streaming)));for(let l of i.toolCalls||[])b.append(wb(l,ai(p,i,l)));if(i.streaming)b.dataset.streaming="true";return b}function hb(i){let p=i.text.trim().length>0;return i.role!=="assistant"||p}function fb(i,p){let b=document.createElement("details");b.className="msg-detail think thinking-block",b.open=p;let h=document.createElement("summary");h.className="label",h.textContent="THINKING";let f=document.createElement("pre");return f.className="body",f.textContent=i,b.append(h,f),b}function mi(i,p){let b=new Set;for(let h of i)for(let f of h.toolCalls||[])b.add(ai(p,h,f));for(let h of D)if(!b.has(h))D.delete(h)}function ai(i,p,b){return`${i}:${p.id}:${b.id}`}function wb(i,p){let b=document.createElement("div");b.className="tool-card",b.dataset.tool=i.name||"tool",b.dataset.status=i.status;let h=!D.has(p);b.dataset.collapsed=h?"true":"false";let f=document.createElement("button");if(f.type="button",f.className="tc-head",f.title=h?"Show tool output":"Hide tool output",f.setAttribute("aria-expanded",h?"false":"true"),f.setAttribute("aria-label",`${h?"Show":"Hide"} ${i.name||"tool"} output`),f.append(Lb(i),Tb(i),Ob(i),Cb(i,h)),!h)b.append(ni(i));return f.addEventListener("click",()=>rb(b,f,i,p)),b.prepend(f),b}function ni(i){let p=document.createElement("pre");return p.className="tc-body",p.textContent=i.text||_b(i),p}function lb(i,p){let b=0,h,f=p.ownerDocument.defaultView,w=typeof f?.matchMedia==="function"?f.matchMedia("(prefers-reduced-motion: reduce)"):void 0,l=()=>{if(h)clearInterval(h),h=void 0},r=()=>{b=(b+1)%Ji;for(let T of p.querySelectorAll(".spinner"))T.dataset.frame=String(b)},c=()=>{let T=p.querySelectorAll(".spinner");if(w?.matches||T.length===0){l(),b=0;for(let O of T)O.dataset.frame="0";return}if(!h)h=setInterval(r,Ep)},L=new(f?.MutationObserver||MutationObserver)(c);L.observe(p,{childList:!0,subtree:!0}),w?.addEventListener("change",c),c(),i.add({remove:()=>{L.disconnect(),w?.removeEventListener("change",c),l()}})}function cb(){let i=document.createElement("span");i.className="spinner",i.dataset.frame="0",i.setAttribute("aria-hidden","true");for(let p=0;p<Ji;p+=1)i.append(document.createElement("span"));return i}function rb(i,p,b,h){let f=i.querySelector(".tc-body"),w=f!==null;if(f)f.remove(),D.delete(h);else i.append(ni(b)),D.add(h);i.dataset.collapsed=w?"true":"false",p.setAttribute("aria-expanded",w?"false":"true"),p.setAttribute("aria-label",`${w?"Show":"Hide"} ${i.dataset.tool||"tool"} output`),p.title=w?"Show tool output":"Hide tool output";let l=p.querySelector(".tc-toggle-label");if(l)l.textContent=w?"show":"hide"}function Lb(i){let p=document.createElement("span");p.className="tc-glyph";let b=Eb(i),h=b?Hp[b]:"";if(!b||!h)return p.textContent="●",p;return p.innerHTML=`<svg class="tc-icon" data-tool-icon="${b}" aria-hidden="true" viewBox="0 0 24 24">${h}</svg>`,p}function Tb(i){let p=document.createElement("span");return p.className="tc-name",p.textContent=i.name||"tool",p}function Ob(i){let p=document.createElement("span");return p.className="tc-args",p.textContent=oi(i),p}function Cb(i,p){let b=document.createElement("span");if(b.className="tc-meta",i.status==="running"){let w=cb(),l=document.createElement("span");return l.className="running",l.textContent="running",b.append(w,l,Vi(p)),b}let h=document.createElement("span");h.className=i.status==="err"?"err":"ok",h.textContent=i.status==="err"?"✗":"✓";let f=document.createElement("span");return f.textContent=i.status==="err"?" · failed":" · done",b.append(h,f,Vi(p)),b}function Vi(i){let p=document.createElement("span");p.className="tc-toggle";let b=document.createElement("span");b.className="tc-toggle-label",b.textContent=i?"show":"hide";let h=document.createElement("span");return h.className="tc-caret",h.textContent="▸",p.append(b,h),p}function oi(i){if(i.argsStatus==="truncated")return"arguments truncated";if(i.argsStatus==="omitted")return"arguments omitted";if(i.argsStatus==="unavailable")return"arguments unavailable";if(i.argsStatus==="empty")return"no arguments";if(!i.args)return"";return JSON.stringify(i.args)}function _b(i){if(i.argsStatus==="truncated")return"arguments truncated: too large to display";if(i.argsStatus==="omitted")return"arguments omitted: response too large";if(i.argsStatus==="unavailable")return"arguments unavailable";if(i.argsStatus==="empty")return"no arguments";if(!i.args)return"arguments unavailable";return JSON.stringify(i.args,null,2)}function Eb(i){let p=Hb(i.name);if(["bash","shell","sh","zsh","terminal"].includes(p))return $b(oi(i).toLowerCase())||"terminal";return $p[p]}function Hb(i){return i.trim().replace(/^functions\./,"").replace(/^multi_tool_use\./,"")}function $b(i){if(/\bgit\b|\bgh\b/.test(i))return"git-branch";if(/\b(go test|bun test|npm test|pnpm test|yarn test|vitest|pytest|cargo test)\b/.test(i))return"circle-check";if(/\b(bun|npm|pnpm|yarn)\s+(run\s+)?build\b|\b(go build|cargo build)\b/.test(i))return"hammer";if(/\b(bun|npm|pnpm|yarn)\s+(add|install|i)\b|\bpip\s+install\b|\bgo\s+get\b/.test(i))return"package";return}function yb(i){if(i==="assistant")return"pi >";if(i==="user")return"you >";if(i==="system")return"sys >";return"tool >"}function e(i){if(i==="assistant")return"pi";if(i==="system")return"sys";return i}function Rb(i){let p=/^\/([^\s/]*)$/.exec(i);return p?p[1].toLowerCase():null}function zb(i){let p=/(?:^|\s)@([^\s@`]*)$/.exec(i);return p?p[1]:null}function Wb(i){return i.length>0}function Pb(i,p){return i.trim().startsWith("!")&&p}function ti(i,p){let b=new Map;for(let h of i)b.set(h.id,h);for(let h of p)b.set(h.id,{...b.get(h.id),...h});return[...b.values()].sort((h,f)=>h.createdAt-f.createdAt)}function B(i){return M(i,i.activeSessionId,!0)}function M(i,p,b=!1){let h=i.sessions.find((f)=>f.id===p);if(!h)h=x(p||void 0),i.sessions.unshift(h),E(i);if(b||!i.activeSessionId)i.activeSessionId=h.id,E(i);return h}function Ab(i,p,b,h){if(p===b)return;let f=i.sessions.find((c)=>c.id===p),w=f?.messages.findIndex((c)=>c.id===h)??-1;if(!f||w<0)return;let[l]=f.messages.splice(w,1),r=M(i,b);if(!r.messages.some((c)=>c.id===l.id))r.messages.push(l);f.updatedAt=Date.now(),r.updatedAt=Date.now(),E(i)}function x(i=G()){let p=Date.now();return{id:i,title:"New chat",createdAt:p,updatedAt:p,messages:[]}}function d(i){try{return localStorage.getItem(i)||""}catch{return""}}function Nb(i=""){try{let b=JSON.parse(localStorage.getItem(k)||"null");if(b&&typeof b.activeSessionId==="string"&&Array.isArray(b.sessions)){let h=b.sessions.filter(ei).map(Mb);if(i&&!h.some((f)=>f.id===i))h.unshift(x(i));return{activeSessionId:i||b.activeSessionId,sessions:h}}}catch{}let p=x(i||void 0);return{activeSessionId:p.id,sessions:[p]}}function Fb(){try{let i=JSON.parse(localStorage.getItem(k)||"null");return Boolean(i&&Array.isArray(i.sessions)&&i.sessions.some(ei))}catch{return!1}}function E(i){ji(i);try{localStorage.setItem(k,JSON.stringify(i))}catch{for(let p of i.sessions)p.messages=p.messages.slice(-Math.floor(Q/2));ji(i);try{localStorage.setItem(k,JSON.stringify(i))}catch{}}}function si(i){if(!i?.length)return;return i.map(({content:p,...b})=>b)}function ji(i){i.sessions.sort((h,f)=>f.updatedAt-h.updatedAt);let p=i.sessions.find((h)=>h.id===i.activeSessionId),b=i.sessions.filter((h)=>h.id!==i.activeSessionId).slice(0,Math.max(0,yi-1));i.sessions=p?[p,...b]:i.sessions.slice(0,yi);for(let h of i.sessions)if(h.messages.length>Q)h.messages.splice(0,h.messages.length-Q)}function ei(i){return N(i)&&typeof i.id==="string"&&Array.isArray(i.messages)}function Mb(i){return{...i,messages:li(i.messages)}}function li(i){return Array.isArray(i)?i.filter(Db).map(Ub):[]}function Ub(i){if(!Array.isArray(i.toolCalls)){let{toolCalls:p,...b}=i;return b}return{...i,toolCalls:i.toolCalls.filter(Zb)}}function Zb(i){if(!N(i)||typeof i.id!=="string"||typeof i.name!=="string")return!1;return typeof i.text==="string"&&jb(i.status)&&Vb(i.argsStatus)}function Vb(i){return i===void 0||i==="present"||i==="empty"||i==="unavailable"||i==="truncated"||i==="omitted"}function jb(i){return i==="running"||i==="ok"||i==="err"}function Db(i){if(!N(i)||typeof i.id!=="string"||typeof i.text!=="string")return!1;return typeof i.createdAt==="number"&&Gb(i.role)}function Gb(i){return i==="user"||i==="assistant"||i==="tool"||i==="system"}function N(i){return typeof i==="object"&&i!==null}function G(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`}function ci(i){return i instanceof Error?i.message:String(i)}export{Bb as submittedAttachmentsForText,Pb as shellAttachmentNoteVisible,fp as setComposerMode,pp as renderMessages,lp as promptFromAgUiLikeRunInput,Ei as pluginStyleText,a as pluginClass,gb as mergeCommands,Wb as hasQueuedAttachmentNames,S as getActiveWorkspaceId,Vp as formatShellOutput,Yi as extractRefs,yp as default,Ci as createComposerSurface,Oi as createChatSurface,ip as createChatDom,Kb as createChannels,wp as createAgUiLikeRunInput,v as commandName,cp as chatEventsToAgUiLikeEvents,j as backendCall};
