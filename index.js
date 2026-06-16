var Y={attachFile:["M16.5 6v11.5a4 4 0 0 1-8 0V5a2.5 2.5 0 0 1 5 0v10.5a1 1 0 0 1-2 0V6H10v9.5","a2.5 2.5 0 0 0 5 0V5a4 4 0 0 0-8 0v12.5a5.5 5.5 0 0 0 11 0V6h-1.5Z"].join(""),stop:"M6 6h12v12H6V6Z",send:"M2 21 23 12 2 3v7l15 2-15 2v7Z",terminal:"M3 4h18v16H3V4Zm2 2v12h14V6H5Zm2 3 1.1-1.1L12.2 12l-4.1 4.1L7 15l3-3-3-3Zm6 6h5v1.5h-5V15Z",file:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 2.5L17.5 8H14V4.5ZM8 13h8v1.5H8V13Zm0 3h8v1.5H8V16Z"},v={attachFile:Q("attach_file",Y.attachFile),stop:Q("stop",Y.stop),send:Q("send",Y.send),terminal:Q("terminal",Y.terminal)};function Q(b,p){return`<svg class="material-icon" data-material-icon="${b}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="${p}"></path></svg>`}function n(){return"pi-web-chat-mounted"}function Jb(){let b=document.createElement("main");return b.className="main pi-web-chat-surface",b.dataset.main="session",b.dataset.pluginChatRoot="",b.innerHTML='<div class="term"><div class="term-inner" role="log" aria-live="polite" aria-relevant="additions text"></div></div><button type="button" class="scroll-bottom-btn" data-action="scroll-bottom" aria-label="stick to bottom" title="stick to bottom" aria-pressed="true" hidden>↓</button>',b}function Fb(){let b=document.createElement("section");return b.className="prompt-region pi-web-chat-composer",b.innerHTML=`
    <div class="slash-pop" hidden><div class="slash-head">slash commands · type to filter</div><div class="slash-list"></div></div>
    <div class="prompt-file-ref-pop" hidden><div class="slash-head">project files · type to filter</div><div class="prompt-file-ref-list"></div></div>
    <div class="prompt-bar">
      <button class="attach-btn" type="button" aria-label="attach files" title="attach files">${v.attachFile}</button>
      <input type="file" multiple hidden data-file-input />
      <div class="prompt-input-col"><div class="attach-chips" hidden></div><div class="shell-attachment-note" aria-live="polite" hidden>queued attachments are hidden during shell mode and will reappear for the next normal prompt</div><textarea class="prompt-textarea" aria-label="Prompt" placeholder="ask pi to do something…" rows="1"></textarea></div>
      <div class="prompt-actions">
        <button class="stop-btn" type="button" aria-label="stop" title="stop" hidden>${v.stop}</button>
        <button class="mic-btn" type="button" data-action="toggle-speech-input" aria-label="start voice input" title="voice input" hidden>\uD83C\uDF99</button>
        <button class="send-btn" type="button" aria-label="send" title="send" aria-disabled="true">${v.send}</button>
      </div>
      <div class="drop-overlay" hidden><span>drop to attach</span></div>
    </div>
    <div class="prompt-meta" data-prompt-meta>— | <span class="prompt-meta-item prompt-meta-branch"><span>—</span></span></div>`,b}function Vb(b){let p=document.createElement("span");return p.className="prompt-meta-item pi-web-chat-badge",p.textContent="chat plugin",b.querySelector("[data-prompt-meta]")?.append(p),p}function Np(){let b=document.createElement("section");return b.className="pi-web-chat-root",b.dataset.plugin="pi-web-chat",b.innerHTML=`
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
        <button class="pi-web-chat-icon-btn" type="button" data-attach aria-label="attach files" title="attach files">${Q("attach_file",Y.attachFile)}</button>
        <input type="file" multiple hidden data-file-input />
        <textarea class="pi-web-chat-textarea" data-chat-input aria-label="Prompt" placeholder="ask pi to do something…" rows="1"></textarea>
        <button class="pi-web-chat-send" type="button" data-send aria-label="send" title="send" aria-disabled="true">${Q("send",Y.send)}</button>
      </div>
    </section>`,{root:b,transcript:F(b.querySelector("[data-chat-transcript]")),textarea:F(b.querySelector("[data-chat-input]")),sendButton:F(b.querySelector("[data-send]")),attachButton:F(b.querySelector("[data-attach]")),fileInput:F(b.querySelector("[data-file-input]")),slashPopover:F(b.querySelector("[data-slash-popover]")),slashList:F(b.querySelector("[data-slash-list]")),refsPopover:F(b.querySelector("[data-refs-popover]")),refsList:F(b.querySelector("[data-refs-list]")),attachments:F(b.querySelector("[data-attachments]"))}}function Zp(b,p){b.replaceChildren(...p.map(jp)),b.scrollTop=b.scrollHeight}function jp(b){let p=document.createElement("article");p.className=`pi-web-chat-message pi-web-chat-message-${b.role}`,p.dataset.messageId=b.id;let w=document.createElement("div");w.className="pi-web-chat-message-role",w.textContent=b.role;let f=document.createElement("pre");if(f.className="pi-web-chat-message-body",f.textContent=b.text,p.append(w,f),b.thinking){let h=document.createElement("details");h.className="pi-web-chat-thinking",h.open=Boolean(b.streaming);let l=document.createElement("summary");l.textContent="thinking";let L=document.createElement("pre");L.textContent=b.thinking,h.append(l,L),p.append(h)}if(b.toolCalls?.length){let h=document.createElement("div");h.className="pi-web-chat-tools";for(let l of b.toolCalls){let L=document.createElement("details");L.className=`pi-web-chat-tool pi-web-chat-tool-${l.status}`,L.open=l.status==="running";let O=document.createElement("summary");O.textContent=`${l.name} · ${l.status}`;let i=document.createElement("pre");i.textContent=l.text||o(l),L.append(O,i),h.append(L)}p.append(h)}if(b.streaming){let h=document.createElement("div");h.className="pi-web-chat-message-meta",h.textContent="streaming...",p.append(h)}if(b.attachments?.length){let h=document.createElement("div");h.className="pi-web-chat-message-meta",h.textContent=`${b.attachments.length} attachment(s)`,p.append(h)}return p}function c(b){if(b.argsStatus==="truncated")return"arguments truncated";if(b.argsStatus==="omitted")return"arguments omitted";if(b.argsStatus==="unavailable")return"arguments unavailable";if(b.argsStatus==="empty")return"no arguments";if(!b.args)return"";return JSON.stringify(b.args)}function o(b){if(b.argsStatus==="truncated")return"arguments truncated: too large to display";if(b.argsStatus==="omitted")return"arguments omitted: response too large";if(b.argsStatus==="unavailable")return"arguments unavailable";if(b.argsStatus==="empty")return"no arguments";if(!b.args)return"arguments unavailable";return JSON.stringify(b.args,null,2)}function Gp(b,p){b.root.dataset.composerMode=p,t(b.attachButton,p)}function t(b,p){if(b.disabled=p==="shell",b.setAttribute("aria-disabled",p==="shell"?"true":"false"),p==="shell"){b.innerHTML=v.terminal,b.title="shell command mode",b.setAttribute("aria-label","shell command mode");return}if(p==="file-ref"){b.innerHTML=Q("file",Y.file),b.title="file reference mode",b.setAttribute("aria-label","file reference mode");return}b.innerHTML=v.attachFile,b.title="attach files",b.setAttribute("aria-label","attach files")}function s(b,p){b.hidden=p.length===0,b.replaceChildren(...p.map((w)=>{let f=document.createElement("span");return f.className="pi-web-chat-attachment-chip",f.textContent=w,f}))}function qb(){return`
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
  `}function Db(){document.getElementById("pi-web-chat-style")?.remove();let b=document.createElement("style");return b.id="pi-web-chat-style",b.textContent=qb(),document.head.append(b),b}function r(b){return b.command||b.cmd||(b.name?`/${b.name}`:"")}function F(b){if(!b)throw Error("pi-web-chat DOM template is invalid");return b}function Jp(b,p,w){return{threadId:b,runId:p,state:{},messages:w,tools:[],context:[]}}function Fp(b){let p=[...b.messages].reverse().find((w)=>w.role==="user");return{text:p?.text||"",attachments:p?.attachments||[],sessionId:b.threadId}}function Vp(b,p,w){return b.map((f)=>qp(f,p,w))}function qp(b,p,w){if(b.type==="text.delta")return{type:"TEXT_MESSAGE_CONTENT",threadId:p,runId:w,delta:b.delta||""};if(b.type==="thinking.delta")return{type:"THINKING_MESSAGE_CONTENT",threadId:p,runId:w,delta:b.delta||""};if(b.type==="tool.start")return{type:"TOOL_CALL_START",threadId:p,runId:w,toolCallId:b.toolCallId,payload:Ub(b)};if(b.type==="tool.delta")return{type:"TOOL_CALL_ARGS",threadId:p,runId:w,toolCallId:b.toolCallId,delta:b.delta||""};if(b.type==="tool.end")return{type:"TOOL_CALL_END",threadId:p,runId:w,toolCallId:b.toolCallId,payload:Ub(b)};return{type:b.type.toUpperCase().replaceAll(".","_"),threadId:p,runId:w,payload:b}}function Ub(b){return{name:b.toolName||"tool",args:b.args||{},result:b.result||"",isError:b.isError===!0}}var u="pi-web-chat.sessions.v1";var kb="plugin.pi-web-sidebar.selectedSession",xb="plugin.pi-web-sidebar.event",gb="plugin.pi-web-sidebar.activeSessionId",Ob="plugin.pi-web-sidebar.activeWorkspaceId",Dp=12,Ab=20,P=200,Up=8,Ap=1e6,Xp=64000;var Yp=250,cb=6,Qp=150,E=new Set,Xb=new WeakMap,Kp={"book-open":'<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',"file-plus":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="M9 15h6"/>',pencil:'<path d="M21.2 6.8 17.2 2.8a2 2 0 0 0-2.8 0L3 14.2V21h6.8L21.2 9.6a2 2 0 0 0 0-2.8z"/><path d="m14 5 5 5"/>',terminal:'<path d="m4 17 6-6-6-6"/><path d="M12 19h8"/>',cpu:'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 15h3"/><path d="M1 9h3"/><path d="M1 15h3"/>',globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 0 20"/><path d="M12 2a15.3 15.3 0 0 0 0 20"/>',search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',braces:'<path d="M8 3H7a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-4a2 2 0 0 1 2-2 2 2 0 0 1-2-2V7a2 2 0 0 0-2-2h-1"/>',"file-text":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',"circle-question-mark":'<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 1 1 5.8 1c-.5 1-1.4 1.5-2.1 2-.6.4-.8.8-.8 2"/><path d="M12 17h.01"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',plug:'<path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a6 6 0 0 1-12 0V8Z"/>',"git-branch":'<line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',"circle-check":'<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',hammer:'<path d="m15 12-8.5 8.5a2.1 2.1 0 0 1-3-3L12 9"/><path d="m17.6 5.4 1.8-1.8"/><path d="m14 7 3 3"/><path d="M5 11 2 8l6-6 3 3"/>',package:'<path d="m7.5 4.3 9 5.2"/><path d="M21 8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>'},wb=new WeakMap,Bp={read:"book-open",write:"file-plus",edit:"pencil",ctx_execute:"cpu",ctx_batch_execute:"cpu",ctx_execute_file:"cpu",ctx_search:"cpu",ctx_index:"cpu",ctx_fetch_and_index:"cpu",web_search:"globe",fetch_content:"search",get_search_content:"search",code_search:"braces",document_parse:"file-text",ask_user_question:"circle-question-mark",teams:"users",subagent:"users",mcp:"plug",git:"git-branch"};class rb{#b=[];add(b){if(b)this.#b.push(b);return b}listen(b,p,w){b.addEventListener(p,w),this.add({remove:()=>b.removeEventListener(p,w)})}dispose(){for(let b of this.#b.splice(0).reverse())if(typeof b==="function")b();else if("unsubscribe"in b)b.unsubscribe();else b.remove()}}function Wp(b={}){let p=b.app;if(p?.piWebChat?.dispose(),typeof b.mount?.chat!=="function"||typeof b.mount?.composer!=="function")throw Error("pi-web-chat requires modern pi-web mount.chat and mount.composer APIs");return Ep(b,p)}function Ep(b,p){let w=new rb,f=w.add(Db()),h=Jb(),l=Fb(),L=b.mount?.chat(h,{replace:!0}),O=b.mount?.composer(l,{replace:!0});if(j1(w,h),D1(w,h),L)w.add(L);if(O)w.add(O);let i=B(b);W(b,i||void 0);let T=i?.sessionId?r1(i.sessionId):c1(),H={backendChatToken:0,pendingPromptEchoIds:new Map};if(!i?.sessionId)d(h);else N(h,x(T).messages,T.activeSessionId),m(b,h,T,H,i.sessionId);_1(w,b,h,T,H),Mp(w,b,l,h,T,H);let $=p?w.add(Vb(p)):void 0;p?.classList.add(n());let z=()=>{if(H.runEventsAbort?.abort(),H.sessionEventsAbort?.abort(),w.dispose(),E.clear(),$?.remove(),f.remove(),p?.classList.remove(n()),p?.piWebChat===R)delete p.piWebChat},R={dispose:z};if(p)p.piWebChat=R;return z}function Mp(b,p,w,f,h,l){let L=w.querySelector(".prompt-textarea"),O=w.querySelector(".send-btn"),i=w.querySelector(".attach-btn"),T=w.querySelector("[data-file-input]"),H=w.querySelector(".attach-chips"),$=w.querySelector(".shell-attachment-note");if(!L||!O)return;let z=w.querySelector(".prompt-bar"),R=w.querySelector(".slash-pop"),D=w.querySelector(".prompt-file-ref-pop"),_={selectedAttachments:[],shellMode:!1,commands:[]},G=()=>{vp(H,L.value,_)},A=()=>{Pp(z,L,i,$,_)},J=()=>{let Z=L.value,C=Boolean(l.startingRunSessionId||l.fallbackSubmittingSessionId);if(O.disabled=C,O.setAttribute("aria-disabled",Z.trim()&&!C?"false":"true"),G(),Yb(_),_.shellMode){e(R,D);return}Ip(p,w,L,Z,_.commands,(X)=>{_.commands=X}),_.fileSearchTimer=setTimeout(()=>{Sp(p,w,L,L.value)},120)},g=()=>{_.shellMode=!0,e(R,D),A(),G()},jb=()=>{_.shellMode=!1,A(),G()},Gb=async(Z)=>{Z?.preventDefault(),Z?.stopImmediatePropagation();let C=L.value.trim();if(J(),l.resolvingSubmit||l.startingRunSessionId||l.fallbackSubmittingSessionId)return;if(!C){L.value="",J();return}if(l.resolvingSubmit=!0,L.value="",T)T.value="";J();try{if(_.shellMode)Bb(C,[]),await gp(p,f,h,C),jb();else{let X=[..._.selectedAttachments,...await cp(p,C)];_.selectedAttachments=[],G(),Bb(C,X);let Rp=tp(p,f,h,l,C,X);l.resolvingSubmit=!1,await Rp}}catch(X){if(!n1(X))N(f,[kp(X)],h.activeSessionId)}finally{l.resolvingSubmit=!1,A(),J()}};if(b.listen(L,"input",()=>{if(!_.shellMode&&L.value.startsWith("! "))L.value=L.value.slice(2),g();J()}),b.listen(L,"keydown",(Z)=>{let C=Z;if(C.key===" "&&!_.shellMode&&L.value==="!"&&L.selectionStart===1&&L.selectionEnd===1){C.preventDefault(),L.value="",g(),J();return}if(C.key==="Backspace"&&_.shellMode&&L.value===""){C.preventDefault(),jb(),J();return}if(C.key==="Escape"){e(R,D);return}if(C.key==="Enter"&&(C.metaKey||C.ctrlKey))Gb(C)}),b.listen(O,"click",(Z)=>{Gb(Z)}),i&&T)b.listen(i,"click",()=>{if(!_.shellMode)T.click()}),b.listen(T,"change",()=>{xp(T,(Z)=>{_.selectedAttachments=Z,G()})});b.add({remove:()=>Yb(_)}),A()}function vp(b,p,w){if(!b)return;if(w.shellMode){s(b,[]);return}s(b,[...w.selectedAttachments.map((f)=>f.name||"attachment"),...ub(p)])}function Pp(b,p,w,f,h){if(b?.classList.toggle("shell-mode",h.shellMode),p.setAttribute("placeholder",h.shellMode?"run shell command in workspace…":"ask pi to do something…"),f)f.hidden=!(h.shellMode&&h.selectedAttachments.length>0);if(w)t(w,h.shellMode?"shell":"normal")}function Yb(b){if(b.fileSearchTimer)clearTimeout(b.fileSearchTimer),b.fileSearchTimer=void 0}function e(b,p){b?.setAttribute("hidden",""),p?.setAttribute("hidden","")}function kp(b){return{id:K(),role:"system",text:`prompt failed: ${Zb(b)}`,createdAt:Date.now()}}async function xp(b,p){let w=Array.from(b.files||[]).slice(0,Up),f=[];for(let h of w){if(h.size>Ap)continue;f.push({name:h.name,size:h.size,content:await h.text(),mimeType:h.type||void 0})}p(f)}async function gp(b,p,w,f){let h=bp(b,w),l=V(w,h),L={id:K(),role:"user",text:`! ${f}`,createdAt:Date.now()},O={id:K(),role:"tool",text:`$ ${f}
(running...)`,createdAt:Date.now()};l.messages.push(L,O),l.updatedAt=Date.now(),y(w),N(p,l.messages,h);try{let i=await U(b,"runShell",{command:f}),T=typeof i.exitCode==="number"?i.exitCode:1,H=typeof i.durationMs==="number"?i.durationMs:0,$=typeof i.output==="string"?i.output:"";O.text=rp(f,$,T,H,Boolean(i.truncated))}catch(i){O.text=`$ ${f}
${Zb(i)}`}l.updatedAt=Date.now(),y(w),N(p,l.messages,h)}async function cp(b,p){let w=ub(p);if(!w.length)return[];let f=await U(b,"resolveContext",{text:p,refs:w});return Array.isArray(f.attachments)?f.attachments.filter(q):[]}function rp(b,p,w,f,h){let l=up(p,Xp),L=h||l.truncated,O=l.text.endsWith(`
`)||!l.text?"":`
`;return`$ ${b}
${l.text}${O}[exit ${w} · ${f}ms${L?" · truncated":""}]`}function up(b,p){let w=new TextEncoder,f=w.encode(b);if(f.byteLength<=p)return{text:b,truncated:!1};let h=new TextDecoder().decode(f.slice(0,p));while(h&&w.encode(h).byteLength>p)h=h.slice(0,-1);return{text:h,truncated:!0}}async function Ip(b,p,w,f,h,l){let L=p.querySelector(".slash-pop"),O=p.querySelector(".slash-list"),i=v1(f);if(i===null||!O){L?.setAttribute("hidden","");return}let T=h;if(!T.length){let $=await U(b,"commands",{});T=Array.isArray($.commands)?$.commands.filter(q):[],l(T)}if(w.value!==f)return;let H=T.filter(($)=>{return r($).slice(1).toLowerCase().includes(i)});mp(O,H,w,L),L?.toggleAttribute("hidden",H.length===0)}async function Sp(b,p,w,f){let h=p.querySelector(".prompt-file-ref-pop"),l=p.querySelector(".prompt-file-ref-list"),L=P1(f);if(L===null||!l){h?.setAttribute("hidden","");return}try{let O=await U(b,"searchFiles",{query:L,limit:Dp}),i=Array.isArray(O.files)?O.files.filter(q):[];if(w.value!==f)return;dp(l,w,i,h),h?.toggleAttribute("hidden",i.length===0)}catch{h?.setAttribute("hidden","")}}function mp(b,p,w,f){b.replaceChildren(...p.map((h)=>{let l=document.createElement("button"),L=r(h);return l.type="button",l.className="slash-item",l.dataset.slash=L,l.innerHTML='<span class="sl-name"></span><span class="sl-desc"></span>',l.querySelector(".sl-name").textContent=L,l.querySelector(".sl-desc").textContent=h.description||"",l.addEventListener("click",()=>{w.value=h.template||`${L} `,f?.setAttribute("hidden",""),w.dispatchEvent(new(w.ownerDocument.defaultView?.Event||Event)("input",{bubbles:!0})),w.focus()}),l}))}function dp(b,p,w,f){b.replaceChildren(...w.map((h)=>{let l=h.path||h.name||"",L=document.createElement("button");return L.type="button",L.className="prompt-file-ref-item",L.dataset.path=l,L.disabled=!l,L.innerHTML='<span class="pfr-path"></span><span class="pfr-kind"></span>',L.querySelector(".pfr-path").textContent=l,L.querySelector(".pfr-kind").textContent=typeof h.size==="number"?`${h.size} bytes`:"file",L.addEventListener("click",()=>{ap(p,l),f?.setAttribute("hidden","")}),L}))}function ap(b,p){if(!p)return;let{value:w,selectionStart:f}=b,h=w.slice(0,f),l=/(?:^|\s)@([^\s@`]*)$/.exec(h),L=l?f-(l[1]||"").length-1:f,O=`@${p} `;b.value=`${w.slice(0,L)}${O}${w.slice(f)}`;let i=L+O.length;b.setSelectionRange(i,i),b.dispatchEvent(new(b.ownerDocument.defaultView?.Event||Event)("input",{bubbles:!0})),b.focus()}function p0(b){return{input$:b.behaviorSubject("chat.input",""),submitted$:b.subject("chat.input.submitted"),activeSessionId$:b.behaviorSubject("session.activeId",null),sidebarSelectedSession$:b.behaviorSubject(kb,np()),toastRequested$:b.subject("toast.requested")}}function ub(b){let p=[],w=new Set,f=/(^|[\s`])@([^\s@`]+)/g,h=f.exec(String(b||""));while(h!==null){let l=h[2]||"";if((h[1]||"")!=="`"&&l&&!w.has(l))w.add(l),p.push(l);h=f.exec(String(b||""))}return p}function w0(b=[],p=[]){let w=[],f=new Set;for(let h of[...b,...p]){let l=r(h);if(!l||f.has(l))continue;f.add(l),w.push(h)}return w}function S(b){return b.app?.piWebSidebar?.getSnapshot?.().activeWorkspaceId||b.app?.dataset.activeWorkspaceId||""}function np(){return B({})}function B(b){let p=b.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),w=p?.activeSessionId||"",f=p?.activeWorkspaceId||"";if(w&&b.app?.dataset.clearedSessionId!==w)return{sessionId:w,workspaceId:f||void 0};return null}function W(b,p){if(p?.workspaceId&&b.app)b.app.dataset.activeWorkspaceId=p.workspaceId,Qb(Ob,p.workspaceId);if(p?.sessionId)delete b.app?.dataset.clearedSessionId,b.app?.setAttribute("data-active-session-id",p.sessionId),Qb(gb,p.sessionId)}function Ib(b){let p=B(b);if(p?.sessionId&&b.app)b.app.dataset.clearedSessionId=p.sessionId;b.app?.removeAttribute("data-active-session-id"),op(gb),globalThis.piWeb?.behaviorSubject("session.activeId",null).next(null)}function k(b,p,w={}){let f=b.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),h={type:p,detail:w,snapshot:f};(b.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$)?.next(h),globalThis.piWeb?.subject(xb).next(h)}function ib(b,p,w){let f=b.app?.dataset.activeWorkspaceId||S(b),h={reason:w,sessionId:p,workspaceId:f};globalThis.piWeb?.behaviorSubject("session.activeId",p).next(p),k(b,"active.start",h),k(b,"session.created",h)}function Tb(b,p){globalThis.piWeb?.subject("session.changed").next({sessionId:b,name:p,title:p})}function Hb(b){if(b.title!=="New chat")return"";let w=b.messages.find((f)=>f.role==="user")?.text.slice(0,48)||"";if(!w)return"";return b.title=w,w}function Qb(b,p){try{localStorage.setItem(b,p)}catch{}}function op(b){try{localStorage.removeItem(b)}catch{}}async function U(b,p,w={},f=S(b)){if(!b.backend)return{};let h=await b.backend(p,{workspaceId:f,data:w});return q(h)?h:{}}function fb(b){let p=Array.isArray(b.warnings)?b.warnings.filter((w)=>typeof w==="string"&&w.trim().length>0):[];for(let w of p)globalThis.piWeb?.subject("toast.requested").next({level:"warning",message:w})}function f0(b,p){return b.trim().startsWith("!")?[]:[...p]}async function tp(b,p,w,f,h,l){let L=bp(b,w),O=j(b);if(f.activeRunId&&f.activeRunSessionId===L){await sp(b,p,w,f,h,l,O.path,O.id);return}if(f.startingRunSessionId===L||f.fallbackSubmittingSessionId===L)return;f.backendChatToken+=1,f.startingRunSessionId=L,f.runEventsAbort?.abort();let i=new AbortController;f.runEventsAbort=i,f.sessionEventsAbort?.abort();let T={id:K(),role:"user",text:h,attachments:Rb(l),createdAt:Date.now()},H=V(w,L);Hp(f.pendingPromptEchoIds,L,T.id),H.messages.push(T),H.updatedAt=Date.now(),y(w),N(p,H.messages,L);let $;try{$=await f1(b,h,l,L,O.path,O.id)}catch(_){throw f.startingRunSessionId=void 0,_}if(i.signal.aborted){f.startingRunSessionId=void 0,hb(w,L,T.id);return}if(fb($),typeof $.activeSessionId==="string"&&$.activeSessionId){let _=L,G=w.activeSessionId===_;if(L=$.activeSessionId,G)M(w,L),W(b,{sessionId:$.activeSessionId,workspaceId:O.id||void 0}),k(b,"chat-session",{reason:"startPrompt",sessionId:$.activeSessionId}),ib(b,$.activeSessionId,"startPrompt");else V(w,L);$p(w,_,L,T.id),x1(f.pendingPromptEchoIds,_,L)}if(typeof $.runId!=="string"||!$.runId){f.startingRunSessionId=void 0,f.fallbackSubmittingSessionId=L;let _;try{_=await h1(b,h,l,L,O.path,O.id)}catch(g){throw f.fallbackSubmittingSessionId=void 0,g}if(i.signal.aborted){f.fallbackSubmittingSessionId=void 0,hb(w,L,T.id);return}fb(_);let G=typeof _.activeSessionId==="string"&&_.activeSessionId?_.activeSessionId:L,A=Cb(f.pendingPromptEchoIds,L),J=$1(b,w,_,"submitPrompt",L,A);if(yb(f.pendingPromptEchoIds,G,J,_.messages,A),w.activeSessionId===L||w.activeSessionId===G)N(p,J,w.activeSessionId);if(f.runEventsAbort===i)f.runEventsAbort=void 0;f.startingRunSessionId=void 0,f.fallbackSubmittingSessionId=void 0;return}let z=V(w,L);f.activeRunId=$.runId,f.activeRunSessionId=L,f.startingRunSessionId=void 0;let R=Hb(z);if(R)y(w),Tb(L,R);let D=l1(z);try{await ep(b,w,z,$.runId,O.path,O.id,D,()=>{if(!i.signal.aborted&&w.activeSessionId===L)N(p,z.messages,L)},i.signal)}finally{if(f.activeRunId===$.runId)f.activeRunId=void 0,f.activeRunSessionId=void 0,f.startingRunSessionId=void 0,f.fallbackSubmittingSessionId=void 0;if(f.runEventsAbort===i)f.runEventsAbort=void 0}if(!i.signal.aborted&&w.activeSessionId===L)m(b,p,w,f,L,O.path,O.id)}async function sp(b,p,w,f,h,l,L,O){let{activeRunId:i,activeRunSessionId:T}=f;if(!i||!T)throw Error("active run is unavailable for steering");let H={id:K(),role:"user",text:h,attachments:Rb(l),createdAt:Date.now()},$=V(w,T);if(Hp(f.pendingPromptEchoIds,T,H.id),$.messages.push(H),$.updatedAt=Date.now(),y(w),w.activeSessionId===T)N(p,$.messages,T);try{let z=await L1(b,i,h,l,T,L,O);fb(z)}catch(z){if(hb(w,T,H.id),nb(z)){N(p,$.messages,T),globalThis.piWeb?.subject("toast.requested").next({level:"error",message:"This backend does not support steering while a response is streaming."});return}throw z}}function hb(b,p,w){let f=b.sessions.find((h)=>h.id===p);if(!f)return;f.messages=f.messages.filter((h)=>h.id!==w),_p(b,f.id),y(b)}async function ep(b,p,w,f,h,l,L,O,i){let T=await mb(b,"streamEventsSse",{runId:f,cursor:0,workspacePath:h},i,l);if(!T)throw Error("SSE streaming backend did not return a stream");let H=Sb(O);L.streaming=!0,H.flush();try{await db(T,($)=>{O1(L,[$]),L.streaming=$.type!=="run.end",w.updatedAt=Date.now(),y(p),H.request()})}finally{L.streaming=!1,y(p),H.flush()}}function Sb(b){let p=0,w,f=()=>{if(w)clearTimeout(w),w=void 0},h=()=>{f(),p=Date.now(),b()};return{request:()=>{let L=Yp-(Date.now()-p);if(L<=0){h();return}w||=setTimeout(h,L)},flush:h,cancel:f}}async function mb(b,p,w={},f,h=S(b)){if(!b.backendStream)throw Error("SSE streaming backend is unavailable");let l=await b.backendStream(p,{workspaceId:h,data:w},{signal:f});return b1(l)}function b1(b){if(typeof ReadableStream<"u"&&b instanceof ReadableStream)return b;if(typeof Response<"u"&&b instanceof Response)return b.body;if(typeof b==="string")return Kb(b);if(!q(b))return null;let p=b.body;if(typeof ReadableStream<"u"&&p instanceof ReadableStream)return p;let w=b.sse;if(typeof w==="string")return Kb(w);return null}function Kb(b){let p=new TextEncoder().encode(b);return new ReadableStream({start(w){w.enqueue(p),w.close()}})}async function db(b,p){let w=b.getReader(),f=new TextDecoder,h="";while(!0){let l=await w.read();if(l.done){h+=f.decode(),w1(h,p);return}h+=f.decode(l.value,{stream:!0});let L=p1(h);h=L.remainder;for(let O of L.frames)ab(O,p)}}function p1(b){let w=b.replaceAll(`\r
`,`
`).replaceAll("\r",`
`).split(`

`),f=w.pop()||"";return{frames:w,remainder:f}}function w1(b,p){let w=b.trim();if(w)ab(w,p)}function ab(b,p){let w=b.split(`
`).filter((f)=>f.startsWith("data:")).map((f)=>f.slice(5).trimStart()).join(`
`);if(!w)return;try{let f=JSON.parse(w);if(T1(f))p(f)}catch{}}function Bb(b,p){globalThis.piWeb?.subject("chat.input.submitted").next({text:b,attachments:Rb(p)||[]})}async function f1(b,p,w,f,h=j(b).path,l=j(b).id){try{return await U(b,"startPrompt",$b(p,w,f,h),l)}catch(L){if(nb(L))return{};throw L}}function nb(b){return/unknown method: (startPrompt|streamEventsSse|steerPrompt)|unsupported method: (startPrompt|streamEventsSse|steerPrompt)|(startPrompt|streamEventsSse|steerPrompt) unsupported/i.test(Zb(b))}async function h1(b,p,w,f="",h=j(b).path,l=j(b).id){return await U(b,"submitPrompt",$b(p,w,f,h),l)}async function L1(b,p,w,f,h="",l=j(b).path,L=j(b).id){let O={...$b(w,f,h,l),runId:p};return U(b,"steerPrompt",O,L)}function $b(b,p,w,f){let h={text:b,attachments:p,sessionId:w};if(f)h.workspacePath=f;return h}function l1(b){let p=[...b.messages].reverse().find((f)=>f.role==="assistant"&&f.streaming);if(p)return p;let w={id:K(),role:"assistant",text:"",createdAt:Date.now(),streaming:!0};return b.messages.push(w),w}function O1(b,p){for(let w of p)if(w.type==="text.delta"&&typeof w.delta==="string")b.text+=w.delta;else if(w.type==="thinking.delta"&&typeof w.delta==="string")b.thinking=`${b.thinking||""}${w.delta}`;else if(w.type==="tool.start")bb(b,w,"running");else if(w.type==="tool.delta"&&typeof w.delta==="string"){let f=bb(b,w,"running");f.text=w.delta}else if(w.type==="tool.end"){let f=bb(b,w,w.isError?"err":"ok");if(typeof w.result==="string"&&w.result)f.text=w.result}else if(w.type==="error"&&typeof w.message==="string")b.text+=`${b.text?`
`:""}${w.message}`}function bb(b,p,w){let f=p.toolCallId||p.toolName||"tool";b.toolCalls||=[];let h=b.toolCalls.find((l)=>l.id===f);if(!h)h={id:f,name:p.toolName||"tool",args:p.args,text:"",status:w},b.toolCalls.push(h);if(h.status=w,i1(h,p))h.args=p.args,h.argsStatus=p.argsStatus;return h}function i1(b,p){if(!p.argsStatus)return Boolean(p.args);if(p.argsStatus==="unavailable")return!b.argsStatus;return!0}function T1(b){return q(b)&&typeof b.type==="string"}async function m(b,p,w,f,h="",l=_b(b),L=j(b).id){if(!b.backendStream){await Wb(b,p,w,f,h,l);return}let O=++f.backendChatToken;f.sessionEventsAbort?.abort();let i=new AbortController;f.sessionEventsAbort=i;let T=Sb(()=>{N(p,x(w).messages,w.activeSessionId)});try{let H=await mb(b,"sessionEventsSse",ob(b,h,l),i.signal,L);if(!H)throw Error("session SSE backend did not return a stream");await db(H,($)=>{if(O!==f.backendChatToken||$.type!=="chat.state")return;let z=H1($),R=typeof z.activeSessionId==="string"?z.activeSessionId:h,D=Cb(f.pendingPromptEchoIds,R),_=sb(b,w,z,"chatState",D);if(yb(f.pendingPromptEchoIds,R,_,z.messages,D),_.length)T.request()})}catch(H){if(!i.signal.aborted)await Wb(b,p,w,f,h,l)}finally{if(T.cancel(),f.sessionEventsAbort===i)f.sessionEventsAbort=void 0}}async function Wb(b,p,w,f,h="",l=_b(b)){let L=++f.backendChatToken;try{let O=await U(b,"chatState",ob(b,h,l));if(L!==f.backendChatToken)return;let i=typeof O.activeSessionId==="string"?O.activeSessionId:h,T=Cb(f.pendingPromptEchoIds,i),H=sb(b,w,O,"chatState",T);if(yb(f.pendingPromptEchoIds,i,H,O.messages,T),H.length)N(p,H,w.activeSessionId)}catch{}}function ob(b,p,w=_b(b)){let f=p?{sessionId:p}:{};if(w)f.workspacePath=w;return f}function H1(b){return{activeSessionId:b.activeSessionId,messages:b.messages,isStreaming:b.isStreaming}}function _b(b){return j(b).path}function j(b){let p=b.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),w=p?.activeWorkspaceId||b.app?.dataset.activeWorkspaceId||"",f=p?.workspaces?.find((h)=>h.id===w)?.path||"";return{id:w,path:f}}function tb(b,p){let w=b.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),f=p.workspaceId||w?.activeWorkspaceId||b.app?.dataset.activeWorkspaceId||"",h=w?.workspaces?.find((l)=>l.id===f)?.path||"";if(h||f!==w?.activeWorkspaceId)return{id:f,path:h};return j(b)}function sb(b,p,w,f,h=""){let l=Nb(w.messages);if(typeof w.activeSessionId==="string"&&w.activeSessionId){let T=p.activeSessionId;if(M(p,w.activeSessionId),W(b,{sessionId:w.activeSessionId,workspaceId:b.app?.dataset.activeWorkspaceId||S(b)||void 0}),f!=="chatState"||T!==w.activeSessionId)k(b,"chat-session",{reason:f,sessionId:w.activeSessionId});if(f!=="chatState")ib(b,w.activeSessionId,f)}let L=x(p);if(!l.length)return[];let O=Tp(L.messages,l,h).slice(-P);if(!eb(L.messages,O))return[];L.messages=O;let i=Hb(L);if(L.updatedAt=Date.now(),y(p),i)Tb(L.id,i);return L.messages}function eb(b,p){if(b.length!==p.length)return!0;return b.some((w,f)=>Lb(w)!==Lb(p[f]))}function Lb(b){return JSON.stringify({id:b.id,role:b.role,text:b.text,thinking:b.thinking,streaming:b.streaming,toolCalls:b.toolCalls,attachments:b.attachments})}function $1(b,p,w,f,h,l=""){let L=Nb(w.messages),O=typeof w.activeSessionId==="string"&&w.activeSessionId?w.activeSessionId:h,i=p.activeSessionId===h;if(O!==h)if(i)M(p,O),W(b,{sessionId:O,workspaceId:j(b).id||void 0}),k(b,"chat-session",{reason:f,sessionId:O}),ib(b,O,f);else V(p,O);let T=Array.isArray(l)?l:[l].filter(Boolean);if(O!==h)for(let R of T)$p(p,h,O,R);let H=V(p,O);if(!L.length)return[];let $=Tp(H.messages,L,l).slice(-P);if(!eb(H.messages,$))return[];H.messages=$;let z=Hb(H);if(H.updatedAt=Date.now(),y(p),z)Tb(H.id,z);return H.messages}function _1(b,p,w,f,h){let l=(T,H)=>{if(!T?.sessionId){if(!H)Eb(p,w,f,h,!0);return}if(pp(p,f,T))return;W(p,T),M(f,T.sessionId),N(w,x(f).messages,f.activeSessionId);let $=tb(p,T);m(p,w,f,h,T.sessionId,$.path,$.id)},L=(T)=>{if(z1(p,w,f,h,T))return;let H=y1(p,T);if(H)l(H,!1)},O=p.app?.piWebSidebar?.channels?.selectedSession$||globalThis.piWebSidebar?.channels?.selectedSession$,i=p.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$;if(O){let T=!0;b.add(O.subscribe((H)=>{l(H,T),T=!1}))}if(i)b.add(i.subscribe(L));if(p.app)b.listen(p.app,"pi-web-sidebar:session-created",(T)=>{let H=T.detail||{},$=typeof H.sessionId==="string"?H.sessionId:"",z=typeof H.workspaceId==="string"?H.workspaceId:"";if($)l({sessionId:$,workspaceId:z||void 0},!1)});if(globalThis.piWeb){let T=!0;b.add(globalThis.piWeb.behaviorSubject(kb,B(p)).subscribe(($)=>{l($,T),T=!1})),b.add(globalThis.piWeb.subject(xb).subscribe(L));let H=!0;b.add(globalThis.piWeb.behaviorSubject("session.activeId",null).subscribe(($)=>{if(!$){if(!H)Eb(p,w,f,h,!1);H=!1;return}H=!1,l({sessionId:$,workspaceId:p.app?.dataset.activeWorkspaceId||zp(Ob)||void 0},!1)}))}}function Eb(b,p,w,f,h){if(f.backendChatToken+=1,f.runEventsAbort?.abort(),f.sessionEventsAbort?.abort(),w.activeSessionId="",y(w),h)Ib(b);else{let l=B(b);if(l?.sessionId&&b.app)b.app.dataset.clearedSessionId=l.sessionId}d(p)}function bp(b,p){let w=B(b);if(w?.sessionId&&!pp(b,p,w))W(b,w),M(p,w.sessionId);if(!p.activeSessionId)return V(p,"",!0).id;return p.activeSessionId}function pp(b,p,w){let f=w.workspaceId||"",h=b.app?.dataset.activeWorkspaceId||zp(Ob)||"";return p.activeSessionId===w.sessionId&&(!f||f===h)}function z1(b,p,w,f,h){if(h.type!=="session.deleted")return!1;let l=wp(h);if(!l)return!0;let L=w.activeSessionId===l,O=w.sessions.length;if(w.sessions=w.sessions.filter((i)=>i.id!==l),L){f.runEventsAbort?.abort(),f.sessionEventsAbort?.abort();let i=C1(b,h,l);if(i?.sessionId){W(b,i),M(w,i.sessionId),N1(p,x(w).messages,w.activeSessionId);let T=tb(b,i);return m(b,p,w,f,i.sessionId,T.path,T.id),!0}return w.activeSessionId="",Ib(b),y(w),d(p),!0}if(w.sessions.length!==O)y(w);return!0}function C1(b,p,w){let f=p.snapshot?.activeSessionId||"",h=p.snapshot?.activeWorkspaceId||"";if(f&&f!==w)return{sessionId:f,workspaceId:h||void 0};let l=B(b);if(l?.sessionId&&l.sessionId!==w)return l;return null}function y1(b,p){if(!R1(p.type))return null;let w=p.detail||{},f=wp(p)||p.snapshot?.activeSessionId||"",h=typeof w.workspaceId==="string"?w.workspaceId:p.snapshot?.activeWorkspaceId||b.app?.dataset.activeWorkspaceId||"";if(!f)return null;return{sessionId:f,workspaceId:h||void 0}}function wp(b){let p=b.detail||{};if(typeof p.sessionId==="string")return p.sessionId;if(typeof p.id==="string")return p.id;return""}function R1(b){return b==="session.selected"||b==="session.created"||b==="new-session"||b==="active.start"}function M(b,p){let w=b.sessions.find((f)=>f.id===p);if(!w)w=a(p),b.sessions.unshift(w);return b.activeSessionId=w.id,y(b),w}function N(b,p,w){if(Lp(p,w),!p.length){d(b);return}let f=b.querySelector(".term-inner")||b;fp(f,p,w),zb(b)}function N1(b,p,w){Lp(p,w);let f=b.querySelector(".term-inner")||b;fp(f,p,w),zb(b)}function fp(b,p,w){let f=Z1(b),h=p.map((O)=>{let i=`${w}:${Lb(O)}`,T=f.get(O.id);if(T&&Xb.get(T)===i)return T;let H=G1(O,w);return Xb.set(H,i),H}),l=new Set(h),L=b.firstChild;for(let O of h){if(L!==O)b.insertBefore(O,L);L=O.nextSibling}for(let O of Array.from(b.children)){if(lb(b,O)&&!l.has(O)){O.remove();continue}if(!lb(b,O))O.remove()}}function Z1(b){let p=new Map;for(let w of Array.from(b.children)){if(!lb(b,w))continue;let f=w.dataset.messageId||"";if(f)p.set(f,w)}return p}function lb(b,p){let w=b.ownerDocument.defaultView;return Boolean(w&&p instanceof w.HTMLElement&&p.classList.contains("transcript-item"))}function d(b){let p=b.querySelector(".term-inner")||b,w=document.createElement("article");w.className="pi-web-chat-docs",w.setAttribute("aria-label","pi-web-chat guide");let f=document.createElement("h1");f.textContent="pi-web-chat guide";let h=document.createElement("p");h.textContent=["Select or create a session in the sidebar to load chat history,","or type below to start a new session."].join(" ");let l=document.createElement("ul");for(let L of["Ask pi in the prompt box and press Cmd/Ctrl+Enter to send.","Type ! then Space at the start to turn the prompt yellow and run shell commands in the workspace.","Queued file attachments hide during shell mode and reappear for the next normal prompt.","Type @ to list project files, then pick one to tag it as prompt context.","Type / at the start to open the slash command list.","Chats are cached locally after you start or select a session."]){let O=document.createElement("li");O.textContent=L,l.append(O)}w.append(f,h,l),p.replaceChildren(w),zb(b)}function j1(b,p){let w=p.querySelector(".term"),f=p.querySelector("[data-action='scroll-bottom']");if(!w||!f)return;let h={term:w,button:f,pinned:!0,touchStartY:null};wb.set(p,h),f.hidden=!1,I(h),b.listen(f,"click",()=>{h.pinned=!0,hp(h),I(h)}),b.listen(w,"wheel",(l)=>{if(l.deltaY<0)Mb(h)}),b.listen(w,"touchstart",(l)=>{let L=l;h.touchStartY=L.touches.item(0)?.clientY??null}),b.listen(w,"touchmove",(l)=>{let O=l.touches.item(0)?.clientY;if(typeof O==="number"&&h.touchStartY!==null&&O-h.touchStartY>8)Mb(h)}),b.listen(w,"touchend",()=>{h.touchStartY=null}),b.add({remove:()=>{wb.delete(p)}})}function zb(b){let p=wb.get(b);if(!p)return;if(p.pinned)hp(p);I(p)}function hp(b){b.term.scrollTop=b.term.scrollHeight}function Mb(b){b.pinned=!1,I(b)}function I(b){b.button.dataset.pinned=b.pinned?"true":"false",b.button.setAttribute("aria-pressed",b.pinned?"true":"false")}function G1(b,p){let w=document.createElement("article");w.className="transcript-item",w.dataset.messageId=b.id;let f=document.createElement("div");f.className="msg",f.dataset.kind=pb(b.role);let h=document.createElement("span");h.className=`prefix ${pb(b.role)}`,h.textContent=M1(b.role);let l=document.createElement("pre");if(l.className=`body ${pb(b.role)}`,l.textContent=b.text,f.append(h,l),J1(b))w.append(f);if(b.thinking)w.append(F1(b.thinking,Boolean(b.streaming)));for(let L of b.toolCalls||[])w.append(V1(L,lp(p,b,L)));if(b.streaming)w.dataset.streaming="true";return w}function J1(b){let p=b.text.trim().length>0;return b.role!=="assistant"||p}function F1(b,p){let w=document.createElement("details");w.className="msg-detail think thinking-block",w.open=p;let f=document.createElement("summary");f.className="label",f.textContent="THINKING";let h=document.createElement("pre");return h.className="body",h.textContent=b,w.append(f,h),w}function Lp(b,p){let w=new Set;for(let f of b)for(let h of f.toolCalls||[])w.add(lp(p,f,h));for(let f of E)if(!w.has(f))E.delete(f)}function lp(b,p,w){return`${b}:${p.id}:${w.id}`}function V1(b,p){let w=document.createElement("div");w.className="tool-card",w.dataset.tool=b.name||"tool",w.dataset.status=b.status;let f=!E.has(p);w.dataset.collapsed=f?"true":"false";let h=document.createElement("button");if(h.type="button",h.className="tc-head",h.title=f?"Show tool output":"Hide tool output",h.setAttribute("aria-expanded",f?"false":"true"),h.setAttribute("aria-label",Op(b,f)),h.append(X1(b),Y1(b),Q1(b),K1(b,f)),!f)w.append(ip(b));return h.addEventListener("click",()=>A1(w,h,b,p)),w.prepend(h),w}function Op(b,p){let w=p?"Show":"Hide",f=b.status==="running"?"running":b.status==="err"?"failed":"done",h=q1(b),l=h?`, ${h}`:"";return`${w} ${b.name||"tool"} output, ${f}${l}`}function q1(b){if(b.argsStatus==="present")return"arguments present";if(b.argsStatus)return c(b);return b.args?"arguments present":""}function ip(b){let p=document.createElement("pre");return p.className="tc-body",p.textContent=b.text||o(b),p}function D1(b,p){let w=0,f,h=p.ownerDocument.defaultView,l=typeof h?.matchMedia==="function"?h.matchMedia("(prefers-reduced-motion: reduce)"):void 0,L=()=>{if(f)clearInterval(f),f=void 0},O=()=>{w=(w+1)%cb;for(let H of p.querySelectorAll(".spinner"))H.dataset.frame=String(w)},i=()=>{let H=p.querySelectorAll(".spinner");if(l?.matches||H.length===0){L(),w=0;for(let $ of H)$.dataset.frame="0";return}if(!f)f=setInterval(O,Qp)},T=new(h?.MutationObserver||MutationObserver)(i);T.observe(p,{childList:!0,subtree:!0}),l?.addEventListener("change",i),i(),b.add({remove:()=>{T.disconnect(),l?.removeEventListener("change",i),L()}})}function U1(){let b=document.createElement("span");b.className="spinner",b.dataset.frame="0",b.setAttribute("aria-hidden","true");for(let p=0;p<cb;p+=1)b.append(document.createElement("span"));return b}function A1(b,p,w,f){let h=b.querySelector(".tc-body"),l=h!==null;if(h)h.remove(),E.delete(f);else b.append(ip(w)),E.add(f);b.dataset.collapsed=l?"true":"false",p.setAttribute("aria-expanded",l?"false":"true"),p.setAttribute("aria-label",Op(w,l)),p.title=l?"Show tool output":"Hide tool output";let L=p.querySelector(".tc-toggle-label");if(L)L.textContent=l?"show":"hide"}function X1(b){let p=document.createElement("span");p.className="tc-glyph";let w=B1(b),f=w?Kp[w]:"";if(!w||!f)return p.textContent="●",p;return p.innerHTML=`<svg class="tc-icon" data-tool-icon="${w}" aria-hidden="true" viewBox="0 0 24 24">${f}</svg>`,p}function Y1(b){let p=document.createElement("span");return p.className="tc-name",p.textContent=b.name||"tool",p}function Q1(b){let p=document.createElement("span");return p.className="tc-args",p.textContent=c(b),p}function K1(b,p){let w=document.createElement("span");if(w.className="tc-meta",b.status==="running"){let l=U1(),L=document.createElement("span");return L.className="running",L.textContent="running",w.append(l,L,vb(p)),w}let f=document.createElement("span");f.className=b.status==="err"?"err":"ok",f.textContent=b.status==="err"?"✗":"✓";let h=document.createElement("span");return h.textContent=b.status==="err"?" · failed":" · done",w.append(f,h,vb(p)),w}function vb(b){let p=document.createElement("span");p.className="tc-toggle";let w=document.createElement("span");w.className="tc-toggle-label",w.textContent=b?"show":"hide";let f=document.createElement("span");return f.className="tc-caret",f.textContent="▸",p.append(w,f),p}function B1(b){let p=W1(b.name);if(["bash","shell","sh","zsh","terminal"].includes(p))return E1(c(b).toLowerCase())||"terminal";return Bp[p]}function W1(b){return b.trim().replace(/^functions\./,"").replace(/^multi_tool_use\./,"")}function E1(b){if(/\bgit\b|\bgh\b/.test(b))return"git-branch";if(/\b(go test|bun test|npm test|pnpm test|yarn test|vitest|pytest|cargo test)\b/.test(b))return"circle-check";if(/\b(bun|npm|pnpm|yarn)\s+(run\s+)?build\b|\b(go build|cargo build)\b/.test(b))return"hammer";if(/\b(bun|npm|pnpm|yarn)\s+(add|install|i)\b|\bpip\s+install\b|\bgo\s+get\b/.test(b))return"package";return}function M1(b){if(b==="assistant")return"pi >";if(b==="user")return"you >";if(b==="system")return"sys >";return"tool >"}function pb(b){if(b==="assistant")return"pi";if(b==="system")return"sys";return b}function v1(b){let p=/^\/([^\s/]*)$/.exec(b);return p?p[1].toLowerCase():null}function P1(b){let p=/(?:^|\s)@([^\s@`]*)$/.exec(b);return p?p[1]:null}function h0(b){return b.length>0}function L0(b,p){return b.trim().startsWith("!")&&p}function Tp(b,p,w=""){let f=Array.isArray(w)?w:[w].filter(Boolean),h=new Map;for(let L of b)h.set(L.id,L);let l=new Set;for(let L of p){let O=k1(b,L,f,l);if(O){l.add(O.id),h.delete(O.id),h.set(L.id,L);continue}h.set(L.id,{...h.get(L.id),...L})}return[...h.values()].sort((L,O)=>L.createdAt-O.createdAt)}function k1(b,p,w,f){if(!w.length||p.role!=="user"||!p.text.trim())return;if(b.some((l)=>l.id===p.id))return;let h=b.find((l)=>{return w.includes(l.id)&&!f.has(l.id)&&l.text.trim()===p.text.trim()});if(h?.role!==p.role||h.text.trim()!==p.text.trim())return;return h}function Hp(b,p,w){b.set(p,[...b.get(p)||[],w])}function Cb(b,p){return b.get(p)||[]}function x1(b,p,w){let f=b.get(p)||[];if(!f.length)return;b.delete(p),b.set(w,[...b.get(w)||[],...f])}function yb(b,p,w,f,h){if(!h.length||!w.length)return;let l=h.filter((L)=>{return w.some((O)=>O.id===L)});if(l.length){b.set(p,l);return}b.delete(p)}function x(b){return V(b,b.activeSessionId,!0)}function V(b,p,w=!1){let f=b.sessions.find((h)=>h.id===p);if(!f)f=a(p||void 0),b.sessions.unshift(f),y(b);if(w||!b.activeSessionId)b.activeSessionId=f.id,y(b);return f}function $p(b,p,w,f){if(p===w)return;let h=b.sessions.find((i)=>i.id===p),l=h?.messages.findIndex((i)=>i.id===f)??-1;if(!h||l<0)return;let[L]=h.messages.splice(l,1),O=V(b,w);if(!O.messages.some((i)=>i.id===L.id))O.messages.push(L);h.updatedAt=Date.now(),O.updatedAt=Date.now(),_p(b,h.id),y(b)}function _p(b,p){let w=b.sessions.find((f)=>f.id===p);if(!w||w.id===b.activeSessionId||w.messages.length>0||w.title!=="New chat")return;b.sessions=b.sessions.filter((f)=>f.id!==w.id)}function a(b=K()){let p=Date.now();return{id:b,title:"New chat",createdAt:p,updatedAt:p,messages:[]}}function zp(b){try{return localStorage.getItem(b)||""}catch{return""}}function g1(b){let p=a(b);return{activeSessionId:p.id,sessions:[p]}}function c1(){try{let b=JSON.parse(localStorage.getItem(u)||"null");if(b&&Array.isArray(b.sessions))return{activeSessionId:"",sessions:b.sessions.filter(Cp).map(yp)}}catch{}return{activeSessionId:"",sessions:[]}}function r1(b=""){try{let p=JSON.parse(localStorage.getItem(u)||"null");if(p&&typeof p.activeSessionId==="string"&&Array.isArray(p.sessions)){let w=p.sessions.filter(Cp).map(yp);if(b&&!w.some((f)=>f.id===b))w.unshift(a(b));return{activeSessionId:b||p.activeSessionId,sessions:w}}}catch{}return g1(b||void 0)}function y(b){Pb(b);try{localStorage.setItem(u,JSON.stringify(b))}catch{for(let p of b.sessions)p.messages=p.messages.slice(-Math.floor(P/2));Pb(b);try{localStorage.setItem(u,JSON.stringify(b))}catch{}}}function Rb(b){if(!b?.length)return;return b.map(({content:p,...w})=>w)}function Pb(b){b.sessions.sort((f,h)=>h.updatedAt-f.updatedAt);let p=b.sessions.find((f)=>f.id===b.activeSessionId),w=b.sessions.filter((f)=>f.id!==b.activeSessionId).slice(0,Math.max(0,Ab-1));b.sessions=p?[p,...w]:b.sessions.slice(0,Ab);for(let f of b.sessions)if(f.messages.length>P)f.messages.splice(0,f.messages.length-P)}function Cp(b){return q(b)&&typeof b.id==="string"&&Array.isArray(b.messages)}function yp(b){return{...b,messages:Nb(b.messages)}}function Nb(b){return Array.isArray(b)?b.filter(d1).map(u1):[]}function u1(b){if(!Array.isArray(b.toolCalls)){let{toolCalls:p,...w}=b;return w}return{...b,toolCalls:b.toolCalls.filter(I1)}}function I1(b){if(!q(b)||typeof b.id!=="string"||typeof b.name!=="string")return!1;return typeof b.text==="string"&&m1(b.status)&&S1(b.argsStatus)}function S1(b){return b===void 0||b==="present"||b==="empty"||b==="unavailable"||b==="truncated"||b==="omitted"}function m1(b){return b==="running"||b==="ok"||b==="err"}function d1(b){if(!q(b)||typeof b.id!=="string"||typeof b.text!=="string")return!1;return typeof b.createdAt==="number"&&a1(b.role)}function a1(b){return b==="user"||b==="assistant"||b==="tool"||b==="system"}function q(b){return typeof b==="object"&&b!==null}function K(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`}function n1(b){return b instanceof Error&&(b.name==="AbortError"||/aborted|abort/i.test(b.message))}function Zb(b){return b instanceof Error?b.message:String(b)}export{c as toolArgsInlineText,o as toolArgsBodyText,f0 as submittedAttachmentsForText,L0 as shellAttachmentNoteVisible,Gp as setComposerMode,Zp as renderMessages,Fp as promptFromAgUiLikeRunInput,qb as pluginStyleText,n as pluginClass,w0 as mergeCommands,h0 as hasQueuedAttachmentNames,S as getActiveWorkspaceId,rp as formatShellOutput,ub as extractRefs,Wp as default,Fb as createComposerSurface,Jb as createChatSurface,Np as createChatDom,p0 as createChannels,Jp as createAgUiLikeRunInput,r as commandName,Vp as chatEventsToAgUiLikeEvents,U as backendCall};
