var Z={attachFile:["M16.5 6v11.5a4 4 0 0 1-8 0V5a2.5 2.5 0 0 1 5 0v10.5a1 1 0 0 1-2 0V6H10v9.5","a2.5 2.5 0 0 0 5 0V5a4 4 0 0 0-8 0v12.5a5.5 5.5 0 0 0 11 0V6h-1.5Z"].join(""),stop:"M6 6h12v12H6V6Z",send:"M2 21 23 12 2 3v7l15 2-15 2v7Z",terminal:"M3 4h18v16H3V4Zm2 2v12h14V6H5Zm2 3 1.1-1.1L12.2 12l-4.1 4.1L7 15l3-3-3-3Zm6 6h5v1.5h-5V15Z",file:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 2.5L17.5 8H14V4.5ZM8 13h8v1.5H8V13Zm0 3h8v1.5H8V16Z"},W={attachFile:V("attach_file",Z.attachFile),stop:V("stop",Z.stop),send:V("send",Z.send)};function V(i,p){return`<svg class="material-icon" data-material-icon="${i}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="${p}"></path></svg>`}function x(){return"pi-web-chat-mounted"}function e(){let i=document.createElement("main");return i.className="main pi-web-chat-surface",i.dataset.main="session",i.innerHTML='<div class="term"><div class="term-inner" role="log" aria-live="polite" aria-relevant="additions text"></div></div><button type="button" class="scroll-bottom-btn" data-action="scroll-bottom" aria-label="stick to bottom" title="stick to bottom" aria-pressed="true" hidden>↓</button>',i}function ii(){let i=document.createElement("section");return i.className="prompt-region pi-web-chat-composer",i.innerHTML=`
    <div class="slash-pop" hidden><div class="slash-head">slash commands · type to filter</div><div class="slash-list"></div></div>
    <div class="prompt-bar">
      <button class="attach-btn" type="button" aria-label="attach files" title="attach files">${W.attachFile}</button>
      <input type="file" multiple hidden data-file-input />
      <div class="prompt-input-col"><div class="attach-chips" hidden></div><textarea class="prompt-textarea" aria-label="Prompt" placeholder="ask pi to do something…" rows="1"></textarea></div>
      <div class="prompt-actions">
        <button class="stop-btn" type="button" aria-label="stop" title="stop" hidden>${W.stop}</button>
        <button class="mic-btn" type="button" data-action="toggle-speech-input" aria-label="start voice input" title="voice input" hidden>\uD83C\uDF99</button>
        <button class="send-btn" type="button" aria-label="send" title="send" aria-disabled="true">${W.send}</button>
      </div>
      <div class="drop-overlay" hidden><span>drop to attach</span></div>
    </div>
    <div class="prompt-meta" data-prompt-meta>— | <span class="prompt-meta-item prompt-meta-branch"><span>—</span></span></div>`,i}function bi(i){let p=document.createElement("span");return p.className="prompt-meta-item pi-web-chat-badge",p.textContent="chat plugin",i.querySelector("[data-prompt-meta]")?.append(p),p}function Wi(){let i=document.createElement("section");return i.className="pi-web-chat-root",i.dataset.plugin="pi-web-chat",i.innerHTML=`
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
        <button class="pi-web-chat-icon-btn" type="button" data-attach aria-label="attach files" title="attach files">${V("attach_file",Z.attachFile)}</button>
        <input type="file" multiple hidden data-file-input />
        <textarea class="pi-web-chat-textarea" data-chat-input aria-label="Prompt" placeholder="ask pi to do something…" rows="1"></textarea>
        <button class="pi-web-chat-send" type="button" data-send aria-label="send" title="send" aria-disabled="true">${V("send",Z.send)}</button>
      </div>
    </section>`,{root:i,transcript:y(i.querySelector("[data-chat-transcript]")),textarea:y(i.querySelector("[data-chat-input]")),sendButton:y(i.querySelector("[data-send]")),attachButton:y(i.querySelector("[data-attach]")),fileInput:y(i.querySelector("[data-file-input]")),slashPopover:y(i.querySelector("[data-slash-popover]")),slashList:y(i.querySelector("[data-slash-list]")),refsPopover:y(i.querySelector("[data-refs-popover]")),refsList:y(i.querySelector("[data-refs-list]")),attachments:y(i.querySelector("[data-attachments]"))}}function xi(i,p){i.replaceChildren(...p.map(ui)),i.scrollTop=i.scrollHeight}function ui(i){let p=document.createElement("article");p.className=`pi-web-chat-message pi-web-chat-message-${i.role}`,p.dataset.messageId=i.id;let b=document.createElement("div");b.className="pi-web-chat-message-role",b.textContent=i.role;let h=document.createElement("pre");if(h.className="pi-web-chat-message-body",h.textContent=i.text,p.append(b,h),i.thinking){let f=document.createElement("details");f.className="pi-web-chat-thinking",f.open=Boolean(i.streaming);let w=document.createElement("summary");w.textContent="thinking";let l=document.createElement("pre");l.textContent=i.thinking,f.append(w,l),p.append(f)}if(i.toolCalls?.length){let f=document.createElement("div");f.className="pi-web-chat-tools";for(let w of i.toolCalls){let l=document.createElement("details");l.className=`pi-web-chat-tool pi-web-chat-tool-${w.status}`,l.open=w.status==="running";let L=document.createElement("summary");L.textContent=`${w.name} · ${w.status}`;let T=document.createElement("pre");T.textContent=w.text||JSON.stringify(w.args||{},null,2),l.append(L,T),f.append(l)}p.append(f)}if(i.streaming){let f=document.createElement("div");f.className="pi-web-chat-message-meta",f.textContent="streaming...",p.append(f)}if(i.attachments?.length){let f=document.createElement("div");f.className="pi-web-chat-message-meta",f.textContent=`${i.attachments.length} attachment(s)`,p.append(f)}return p}function pi(i,p){i.hidden=p.length===0,i.replaceChildren(...p.map((b)=>{let h=document.createElement("span");return h.className="pi-web-chat-attachment-chip",h.textContent=b,h}))}function hi(){return`
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
  `}function fi(){document.getElementById("pi-web-chat-style")?.remove();let i=document.createElement("style");return i.id="pi-web-chat-style",i.textContent=hi(),document.head.append(i),i}function wi(i){return i.command||i.cmd||(i.name?`/${i.name}`:"")}function y(i){if(!i)throw Error("pi-web-chat DOM template is invalid");return i}function ki(i,p,b){return{threadId:i,runId:p,state:{},messages:b,tools:[],context:[]}}function Ii(i){let p=[...i.messages].reverse().find((b)=>b.role==="user");return{text:p?.text||"",attachments:p?.attachments||[],sessionId:i.threadId}}function Si(i,p,b){return i.map((h)=>mi(h,p,b))}function mi(i,p,b){if(i.type==="text.delta")return{type:"TEXT_MESSAGE_CONTENT",threadId:p,runId:b,delta:i.delta||""};if(i.type==="thinking.delta")return{type:"THINKING_MESSAGE_CONTENT",threadId:p,runId:b,delta:i.delta||""};if(i.type==="tool.start")return{type:"TOOL_CALL_START",threadId:p,runId:b,toolCallId:i.toolCallId,payload:li(i)};if(i.type==="tool.delta")return{type:"TOOL_CALL_ARGS",threadId:p,runId:b,toolCallId:i.toolCallId,delta:i.delta||""};if(i.type==="tool.end")return{type:"TOOL_CALL_END",threadId:p,runId:b,toolCallId:i.toolCallId,payload:li(i)};return{type:i.type.toUpperCase().replaceAll(".","_"),threadId:p,runId:b,payload:i}}function li(i){return{name:i.toolName||"tool",args:i.args||{},result:i.result||"",isError:i.isError===!0}}var j="pi-web-chat.sessions.v1";var Ri="plugin.pi-web-sidebar.selectedSession",yi="plugin.pi-web-sidebar.event",S="plugin.pi-web-sidebar.activeSessionId",Q="plugin.pi-web-sidebar.activeWorkspaceId";var Li=20,D=200,di=8,ai=1e6;var ni=250,F=new Set,oi={"book-open":'<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',"file-plus":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="M9 15h6"/>',pencil:'<path d="M21.2 6.8 17.2 2.8a2 2 0 0 0-2.8 0L3 14.2V21h6.8L21.2 9.6a2 2 0 0 0 0-2.8z"/><path d="m14 5 5 5"/>',terminal:'<path d="m4 17 6-6-6-6"/><path d="M12 19h8"/>',cpu:'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 15h3"/><path d="M1 9h3"/><path d="M1 15h3"/>',globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 0 20"/><path d="M12 2a15.3 15.3 0 0 0 0 20"/>',search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',braces:'<path d="M8 3H7a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-4a2 2 0 0 1 2-2 2 2 0 0 1-2-2V7a2 2 0 0 0-2-2h-1"/>',"file-text":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',"circle-question-mark":'<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 1 1 5.8 1c-.5 1-1.4 1.5-2.1 2-.6.4-.8.8-.8 2"/><path d="M12 17h.01"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',plug:'<path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a6 6 0 0 1-12 0V8Z"/>',"git-branch":'<line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',"circle-check":'<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',hammer:'<path d="m15 12-8.5 8.5a2.1 2.1 0 0 1-3-3L12 9"/><path d="m17.6 5.4 1.8-1.8"/><path d="m14 7 3 3"/><path d="M5 11 2 8l6-6 3 3"/>',package:'<path d="m7.5 4.3 9 5.2"/><path d="M21 8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>'},I=new WeakMap,ti={read:"book-open",write:"file-plus",edit:"pencil",ctx_execute:"cpu",ctx_batch_execute:"cpu",ctx_execute_file:"cpu",ctx_search:"cpu",ctx_index:"cpu",ctx_fetch_and_index:"cpu",web_search:"globe",fetch_content:"search",get_search_content:"search",code_search:"braces",document_parse:"file-text",ask_user_question:"circle-question-mark",teams:"users",subagent:"users",mcp:"plug",git:"git-branch"};class $i{#i=[];add(i){if(i)this.#i.push(i);return i}listen(i,p,b){i.addEventListener(p,b),this.add({remove:()=>i.removeEventListener(p,b)})}dispose(){for(let i of this.#i.splice(0).reverse())if(typeof i==="function")i();else if("unsubscribe"in i)i.unsubscribe();else i.remove()}}function si(i={}){let p=i.app;if(p?.piWebChat?.dispose(),typeof i.mount?.chat!=="function"||typeof i.mount?.composer!=="function")throw Error("pi-web-chat requires modern pi-web mount.chat and mount.composer APIs");return ei(i,p)}function ei(i,p){let b=new $i,h=b.add(fi()),f=e(),w=ii(),l=i.mount?.chat(f,{replace:!0}),L=i.mount?.composer(w,{replace:!0});if(Vb(b,f),l)b.add(l);if(L)b.add(L);let T=q(i);c(i,T||void 0);let r=!T?.sessionId&&!ub(),C=xb(T?.sessionId||""),O={backendChatToken:0};if(r)n(f);else N(f,J(C).messages,C.activeSessionId),v(i,f,C,O,T?.sessionId||C.activeSessionId);zb(b,i,f,C,O),ib(b,i,w,f,C,O);let _=p?b.add(bi(p)):void 0;p?.classList.add(x());let z=()=>{if(O.runEventsAbort?.abort(),O.sessionEventsAbort?.abort(),b.dispose(),F.clear(),_?.remove(),h.remove(),p?.classList.remove(x()),p?.piWebChat===R)delete p.piWebChat},R={dispose:z};if(p)p.piWebChat=R;return z}function ib(i,p,b,h,f,w){let l=b.querySelector(".prompt-textarea"),L=b.querySelector(".send-btn"),T=b.querySelector(".attach-btn"),r=b.querySelector("[data-file-input]"),C=b.querySelector(".attach-chips");if(!l||!L)return;let O=[],_=()=>{let E=l.value;L.setAttribute("aria-disabled",E.trim()?"false":"true")},z=()=>{if(!C)return;pi(C,O.map((E)=>{return E.name||"attachment"}))},R=async(E)=>{E?.preventDefault(),E?.stopImmediatePropagation();let $=l.value.trim();if(_(),!$)return;let s=[...O];L.disabled=!0;try{if(Ob($,s),await lb(p,h,f,w,$,s),O=[],z(),l.value.trim()===$)l.value="";if(r)r.value=""}catch(Pi){N(h,[bb(Pi)],f.activeSessionId)}finally{L.disabled=!1,_()}};if(i.listen(l,"input",_),i.listen(l,"keydown",(E)=>{let $=E;if($.key==="Enter"&&($.metaKey||$.ctrlKey))R($)}),i.listen(L,"click",(E)=>{R(E)}),T&&r)i.listen(T,"click",()=>r.click()),i.listen(r,"change",()=>{pb(r,(E)=>{O=E,z()})})}function bb(i){return{id:P(),role:"system",text:`prompt failed: ${vi(i)}`,createdAt:Date.now()}}async function pb(i,p){let b=Array.from(i.files||[]).slice(0,di),h=[];for(let f of b){if(f.size>ai)continue;h.push({name:f.name,size:f.size,content:await f.text(),mimeType:f.type||void 0})}p(h)}function bp(i){return{input$:i.behaviorSubject("chat.input",""),submitted$:i.subject("chat.input.submitted"),activeSessionId$:i.behaviorSubject("session.activeId",null),sidebarSelectedSession$:i.behaviorSubject(Ri,hb()),toastRequested$:i.subject("toast.requested")}}function pp(i){let p=[],b=new Set,h=/(^|[\s`])@([^\s@`]+)/g,f=h.exec(String(i||""));while(f!==null){let w=f[2]||"";if((f[1]||"")!=="`"&&w&&!b.has(w))b.add(w),p.push(w);f=h.exec(String(i||""))}return p}function hp(i=[],p=[]){let b=[],h=new Set;for(let f of[...i,...p]){let w=wi(f);if(!w||h.has(w))continue;h.add(w),b.push(f)}return b}function K(i){return i.app?.piWebSidebar?.getSnapshot?.().activeWorkspaceId||i.app?.dataset.activeWorkspaceId||""}function hb(){return q({})}function q(i){let p=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),b=p?.activeSessionId||"",h=p?.activeWorkspaceId||"";if(b)return{sessionId:b,workspaceId:h||void 0};let f=Y(S),w=Y(Q);return f?{sessionId:f,workspaceId:w||void 0}:null}function c(i,p){if(p?.workspaceId&&i.app)i.app.dataset.activeWorkspaceId=p.workspaceId,Ti(Q,p.workspaceId);if(p?.sessionId)i.app?.setAttribute("data-active-session-id",p.sessionId),Ti(S,p.sessionId)}function fb(i){i.app?.removeAttribute("data-active-session-id"),wb(S),globalThis.piWeb?.behaviorSubject("session.activeId",null).next(null)}function G(i,p,b={}){let h=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),f={type:p,detail:b,snapshot:h};(i.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$)?.next(f),globalThis.piWeb?.subject(yi).next(f)}function m(i,p,b){let h=i.app?.dataset.activeWorkspaceId||K(i),f={reason:b,sessionId:p,workspaceId:h};globalThis.piWeb?.behaviorSubject("session.activeId",p).next(p),globalThis.piWeb?.subject("session.changed").next({sessionId:p,workspaceId:h,reason:b}),G(i,"active.start",f),G(i,"session.created",f)}function Ti(i,p){try{localStorage.setItem(i,p)}catch{}}function wb(i){try{localStorage.removeItem(i)}catch{}}async function d(i,p,b={},h=K(i)){if(!i.backend)return{};let f=await i.backend(p,{workspaceId:h,data:b});return B(f)?f:{}}async function lb(i,p,b,h,f,w){let l=Mb(i,b),L=A(i);h.backendChatToken+=1,h.runEventsAbort?.abort();let T=new AbortController;h.runEventsAbort=T,h.sessionEventsAbort?.abort();let r={id:P(),role:"user",text:f,attachments:Qi(w),createdAt:Date.now()},C=M(b,l);C.messages.push(r),C.updatedAt=Date.now(),H(b),N(p,C.messages,l);let O=await Eb(i,f,w,l,L.path,L.id);if(typeof O.activeSessionId==="string"&&O.activeSessionId){let R=l,E=b.activeSessionId===R;if(l=O.activeSessionId,E)U(b,l),c(i,{sessionId:O.activeSessionId,workspaceId:L.id||void 0}),G(i,"chat-session",{reason:"startPrompt",sessionId:O.activeSessionId}),m(i,O.activeSessionId,"startPrompt");else M(b,l);Wb(b,R,l,r.id)}if(typeof O.runId!=="string"||!O.runId){let R=await Hb(i,f,w,l,L.path,L.id),E=Nb(i,b,R,"submitPrompt",l);if(b.activeSessionId===l)N(p,E,l);if(h.runEventsAbort===T)h.runEventsAbort=void 0;return}let _=M(b,l),z=Rb(_);try{await Lb(i,b,_,O.runId,L.path,L.id,z,()=>{if(b.activeSessionId===l)N(p,_.messages,l)},T.signal)}finally{if(h.runEventsAbort===T)h.runEventsAbort=void 0}if(b.activeSessionId===l)v(i,p,b,h,l,L.path,L.id)}async function Lb(i,p,b,h,f,w,l,L,T){let r=await Ni(i,"streamEventsSse",{runId:h,cursor:0,workspacePath:f},T,w);if(!r)throw Error("SSE streaming backend did not return a stream");let C=Ai(L);l.streaming=!0,C.flush();try{await zi(r,(O)=>{yb(l,[O]),l.streaming=O.type!=="run.end",b.updatedAt=Date.now(),H(p),C.request()})}finally{l.streaming=!1,H(p),C.flush()}}function Ai(i){let p=0,b,h=()=>{if(b)clearTimeout(b),b=void 0},f=()=>{h(),p=Date.now(),i()};return{request:()=>{let l=ni-(Date.now()-p);if(l<=0){f();return}b||=setTimeout(f,l)},flush:f,cancel:h}}async function Ni(i,p,b={},h,f=K(i)){if(!i.backendStream)throw Error("SSE streaming backend is unavailable");let w=await i.backendStream(p,{workspaceId:f,data:b},{signal:h});return Tb(w)}function Tb(i){if(typeof ReadableStream<"u"&&i instanceof ReadableStream)return i;if(typeof Response<"u"&&i instanceof Response)return i.body;if(typeof i==="string")return ri(i);if(!B(i))return null;let p=i.body;if(typeof ReadableStream<"u"&&p instanceof ReadableStream)return p;let b=i.sse;if(typeof b==="string")return ri(b);return null}function ri(i){let p=new TextEncoder().encode(i);return new ReadableStream({start(b){b.enqueue(p),b.close()}})}async function zi(i,p){let b=i.getReader(),h=new TextDecoder,f="";while(!0){let w=await b.read();if(w.done){f+=h.decode(),Cb(f,p);return}f+=h.decode(w.value,{stream:!0});let l=rb(f);f=l.remainder;for(let L of l.frames)Mi(L,p)}}function rb(i){let b=i.replaceAll(`\r
`,`
`).replaceAll("\r",`
`).split(`

`),h=b.pop()||"";return{frames:b,remainder:h}}function Cb(i,p){let b=i.trim();if(b)Mi(b,p)}function Mi(i,p){let b=i.split(`
`).filter((h)=>h.startsWith("data:")).map((h)=>h.slice(5).trimStart()).join(`
`);if(!b)return;try{let h=JSON.parse(b);if($b(h))p(h)}catch{}}function Ob(i,p){globalThis.piWeb?.subject("chat.input.submitted").next({text:i,attachments:Qi(p)||[]})}async function Eb(i,p,b,h,f=A(i).path,w=A(i).id){try{return await d(i,"startPrompt",ci(p,b,h,f),w)}catch(l){if(_b(l))return{};throw l}}function _b(i){return/unknown method: (startPrompt|streamEventsSse)|unsupported method: (startPrompt|streamEventsSse)|(startPrompt|streamEventsSse) unsupported/i.test(vi(i))}async function Hb(i,p,b,h="",f=A(i).path,w=A(i).id){return await d(i,"submitPrompt",ci(p,b,h,f),w)}function ci(i,p,b,h){let f={text:i,attachments:p,sessionId:b};if(h)f.workspacePath=h;return f}function Rb(i){let p=[...i.messages].reverse().find((h)=>h.role==="assistant"&&h.streaming);if(p)return p;let b={id:P(),role:"assistant",text:"",createdAt:Date.now(),streaming:!0};return i.messages.push(b),b}function yb(i,p){for(let b of p)if(b.type==="text.delta"&&typeof b.delta==="string")i.text+=b.delta;else if(b.type==="thinking.delta"&&typeof b.delta==="string")i.thinking=`${i.thinking||""}${b.delta}`;else if(b.type==="tool.start")u(i,b,"running");else if(b.type==="tool.delta"&&typeof b.delta==="string"){let h=u(i,b,"running");h.text=b.delta}else if(b.type==="tool.end"){let h=u(i,b,b.isError?"err":"ok");if(typeof b.result==="string"&&b.result)h.text=b.result}else if(b.type==="error"&&typeof b.message==="string")i.text+=`${i.text?`
`:""}${b.message}`}function u(i,p,b){let h=p.toolCallId||p.toolName||"tool";i.toolCalls||=[];let f=i.toolCalls.find((w)=>w.id===h);if(!f)f={id:h,name:p.toolName||"tool",args:p.args,text:"",status:b},i.toolCalls.push(f);if(f.status=b,p.args)f.args=p.args;return f}function $b(i){return B(i)&&typeof i.type==="string"}async function v(i,p,b,h,f="",w=a(i),l=A(i).id){if(!i.backendStream){await Ci(i,p,b,h,f,w);return}let L=++h.backendChatToken;h.sessionEventsAbort?.abort();let T=new AbortController;h.sessionEventsAbort=T;let r=Ai(()=>{N(p,J(b).messages,b.activeSessionId)});try{let C=await Ni(i,"sessionEventsSse",Fi(i,f,w),T.signal,l);if(!C)throw Error("session SSE backend did not return a stream");await zi(C,(O)=>{if(L!==h.backendChatToken||O.type!=="chat.state")return;if(Bi(i,b,Ab(O),"chatState").length)r.request()})}catch(C){if(!T.signal.aborted)await Ci(i,p,b,h,f,w)}finally{if(r.cancel(),h.sessionEventsAbort===T)h.sessionEventsAbort=void 0}}async function Ci(i,p,b,h,f="",w=a(i)){let l=++h.backendChatToken;try{let L=await d(i,"chatState",Fi(i,f,w));if(l!==h.backendChatToken)return;let T=Bi(i,b,L,"chatState");if(T.length)N(p,T,b.activeSessionId)}catch{}}function Fi(i,p,b=a(i)){let h=p?{sessionId:p}:{};if(b)h.workspacePath=b;return h}function Ab(i){return{activeSessionId:i.activeSessionId,messages:i.messages,isStreaming:i.isStreaming}}function a(i){return A(i).path}function A(i){let p=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),b=p?.activeWorkspaceId||i.app?.dataset.activeWorkspaceId||"",h=p?.workspaces?.find((f)=>f.id===b)?.path||"";return{id:b,path:h}}function Ui(i,p){let b=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),h=p.workspaceId||b?.activeWorkspaceId||i.app?.dataset.activeWorkspaceId||"",f=b?.workspaces?.find((w)=>w.id===h)?.path||"";if(f||h!==b?.activeWorkspaceId)return{id:h,path:f};return A(i)}function Bi(i,p,b,h){let f=t(b.messages);if(typeof b.activeSessionId==="string"&&b.activeSessionId){let L=p.activeSessionId;if(U(p,b.activeSessionId),c(i,{sessionId:b.activeSessionId,workspaceId:i.app?.dataset.activeWorkspaceId||K(i)||void 0}),h!=="chatState"||L!==b.activeSessionId)G(i,"chat-session",{reason:h,sessionId:b.activeSessionId});if(h!=="chatState")m(i,b.activeSessionId,h)}let w=J(p);if(!f.length)return[];let l=Yi(w.messages,f).slice(-D);if(!Zi(w.messages,l))return[];if(w.messages=l,w.title==="New chat"){let L=w.messages.find((T)=>T.role==="user");if(L)w.title=L.text.slice(0,48)||w.title}return w.updatedAt=Date.now(),H(p),w.messages}function Zi(i,p){if(i.length!==p.length)return!0;return i.some((b,h)=>Oi(b)!==Oi(p[h]))}function Oi(i){return JSON.stringify({id:i.id,role:i.role,text:i.text,thinking:i.thinking,streaming:i.streaming,toolCalls:i.toolCalls,attachments:i.attachments})}function Nb(i,p,b,h,f){let w=t(b.messages),l=typeof b.activeSessionId==="string"&&b.activeSessionId?b.activeSessionId:f,L=p.activeSessionId===f;if(l!==f)if(L)U(p,l),c(i,{sessionId:l,workspaceId:A(i).id||void 0}),G(i,"chat-session",{reason:h,sessionId:l}),m(i,l,h);else M(p,l);let T=M(p,l);if(!w.length)return[];let r=Yi(T.messages,w).slice(-D);if(!Zi(T.messages,r))return[];return T.messages=r,T.updatedAt=Date.now(),H(p),T.messages}function zb(i,p,b,h,f){let w=(r)=>{if(!r?.sessionId)return;if(Vi(p,h,r))return;c(p,r),U(h,r.sessionId),N(b,J(h).messages,h.activeSessionId);let C=Ui(p,r);v(p,b,h,f,r.sessionId,C.path,C.id)},l=(r)=>{if(cb(p,b,h,f,r))return;let C=Ub(p,r);if(C)w(C)},L=p.app?.piWebSidebar?.channels?.selectedSession$||globalThis.piWebSidebar?.channels?.selectedSession$,T=p.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$;if(L)i.add(L.subscribe(w));if(T)i.add(T.subscribe(l));if(p.app)i.listen(p.app,"pi-web-sidebar:session-created",(r)=>{let C=r.detail||{},O=typeof C.sessionId==="string"?C.sessionId:"",_=typeof C.workspaceId==="string"?C.workspaceId:"";if(O)w({sessionId:O,workspaceId:_||void 0})});if(globalThis.piWeb)i.add(globalThis.piWeb.behaviorSubject(Ri,q(p)).subscribe(w)),i.add(globalThis.piWeb.subject(yi).subscribe(l)),i.add(globalThis.piWeb.behaviorSubject("session.activeId",null).subscribe((r)=>{if(!r)return;w({sessionId:r,workspaceId:p.app?.dataset.activeWorkspaceId||Y(Q)||void 0})}))}function Mb(i,p){let b=q(i);if(b?.sessionId&&!Vi(i,p,b))c(i,b),U(p,b.sessionId);return p.activeSessionId}function Vi(i,p,b){let h=b.workspaceId||"",f=i.app?.dataset.activeWorkspaceId||Y(Q)||"";return p.activeSessionId===b.sessionId&&(!h||h===f)}function cb(i,p,b,h,f){if(f.type!=="session.deleted")return!1;let w=Di(f);if(!w)return!0;let l=b.activeSessionId===w,L=b.sessions.length;if(b.sessions=b.sessions.filter((T)=>T.id!==w),l){h.runEventsAbort?.abort(),h.sessionEventsAbort?.abort();let T=Fb(i,f,w);if(T?.sessionId){c(i,T),U(b,T.sessionId),Zb(p,J(b).messages,b.activeSessionId);let r=Ui(i,T);return v(i,p,b,h,T.sessionId,r.path,r.id),!0}return b.activeSessionId="",fb(i),H(b),n(p),!0}if(b.sessions.length!==L)H(b);return!0}function Fb(i,p,b){let h=p.snapshot?.activeSessionId||"",f=p.snapshot?.activeWorkspaceId||"";if(h&&h!==b)return{sessionId:h,workspaceId:f||void 0};let w=q(i);if(w?.sessionId&&w.sessionId!==b)return w;return null}function Ub(i,p){if(!Bb(p.type))return null;let b=p.detail||{},h=Di(p)||p.snapshot?.activeSessionId||"",f=typeof b.workspaceId==="string"?b.workspaceId:p.snapshot?.activeWorkspaceId||i.app?.dataset.activeWorkspaceId||"";if(!h)return null;return{sessionId:h,workspaceId:f||void 0}}function Di(i){let p=i.detail||{};if(typeof p.sessionId==="string")return p.sessionId;if(typeof p.id==="string")return p.id;return""}function Bb(i){return i==="session.selected"||i==="session.created"||i==="new-session"||i==="active.start"}function U(i,p){let b=i.sessions.find((h)=>h.id===p);if(!b)b=X(p),i.sessions.unshift(b);return i.activeSessionId=b.id,H(i),b}function N(i,p,b){if(Ji(p,b),!p.length){n(i);return}(i.querySelector(".term-inner")||i).replaceChildren(...p.map((f)=>qi(f,b))),o(i)}function Zb(i,p,b){Ji(p,b),(i.querySelector(".term-inner")||i).replaceChildren(...p.map((f)=>qi(f,b))),o(i)}function n(i){let p=i.querySelector(".term-inner")||i,b=document.createElement("article");b.className="pi-web-chat-docs",b.setAttribute("aria-label","pi-web-chat guide");let h=document.createElement("h1");h.textContent="pi-web-chat guide";let f=document.createElement("p");f.textContent=["Select or create a session in the sidebar to load chat history,","or type below to start a new session."].join(" ");let w=document.createElement("ul");for(let l of["Ask pi in the prompt box and press Cmd/Ctrl+Enter to send.","Use / for slash commands, @ for file references, and ! for shell commands.","Chats are cached locally after you start or select a session."]){let L=document.createElement("li");L.textContent=l,w.append(L)}b.append(h,f,w),p.replaceChildren(b),o(i)}function Vb(i,p){let b=p.querySelector(".term"),h=p.querySelector("[data-action='scroll-bottom']");if(!b||!h)return;let f={term:b,button:h,pinned:!0,touchStartY:null};I.set(p,f),h.hidden=!1,g(f),i.listen(h,"click",()=>{f.pinned=!0,Gi(f),g(f)}),i.listen(b,"wheel",(w)=>{if(w.deltaY<0)Ei(f)}),i.listen(b,"touchstart",(w)=>{let l=w;f.touchStartY=l.touches.item(0)?.clientY??null}),i.listen(b,"touchmove",(w)=>{let L=w.touches.item(0)?.clientY;if(typeof L==="number"&&f.touchStartY!==null&&L-f.touchStartY>8)Ei(f)}),i.listen(b,"touchend",()=>{f.touchStartY=null}),i.add({remove:()=>{I.delete(p)}})}function o(i){let p=I.get(i);if(!p)return;if(p.pinned)Gi(p);g(p)}function Gi(i){i.term.scrollTop=i.term.scrollHeight}function Ei(i){i.pinned=!1,g(i)}function g(i){i.button.dataset.pinned=i.pinned?"true":"false",i.button.setAttribute("aria-pressed",i.pinned?"true":"false")}function qi(i,p){let b=document.createElement("article");b.className="transcript-item",b.dataset.messageId=i.id;let h=document.createElement("div");h.className="msg",h.dataset.kind=k(i.role);let f=document.createElement("span");f.className=`prefix ${k(i.role)}`,f.textContent=Pb(i.role);let w=document.createElement("pre");if(w.className=`body ${k(i.role)}`,w.textContent=i.text,h.append(f,w),Db(i))b.append(h);if(i.thinking)b.append(Gb(i.thinking,Boolean(i.streaming)));for(let l of i.toolCalls||[])b.append(qb(l,ji(p,i,l)));if(i.streaming)b.dataset.streaming="true";return b}function Db(i){let p=i.text.trim().length>0;return i.role!=="assistant"||p}function Gb(i,p){let b=document.createElement("details");b.className="msg-detail think thinking-block",b.open=p;let h=document.createElement("summary");h.className="label",h.textContent="THINKING";let f=document.createElement("pre");return f.className="body",f.textContent=i,b.append(h,f),b}function Ji(i,p){let b=new Set;for(let h of i)for(let f of h.toolCalls||[])b.add(ji(p,h,f));for(let h of F)if(!b.has(h))F.delete(h)}function ji(i,p,b){return`${i}:${p.id}:${b.id}`}function qb(i,p){let b=document.createElement("div");b.className="tool-card",b.dataset.tool=i.name||"tool",b.dataset.status=i.status;let h=!F.has(p);b.dataset.collapsed=h?"true":"false";let f=document.createElement("button");if(f.type="button",f.className="tc-head",f.title=h?"Show tool output":"Hide tool output",f.setAttribute("aria-expanded",h?"false":"true"),f.setAttribute("aria-label",`${h?"Show":"Hide"} ${i.name||"tool"} output`),f.append(jb(i),gb(i),Xb(i),Yb(i,h)),!h)b.append(gi(i));return f.addEventListener("click",()=>Jb(b,f,i,p)),b.prepend(f),b}function gi(i){let p=document.createElement("pre");return p.className="tc-body",p.textContent=i.text||JSON.stringify(i.args||{},null,2),p}function Jb(i,p,b,h){let f=i.querySelector(".tc-body"),w=f!==null;if(f)f.remove(),F.delete(h);else i.append(gi(b)),F.add(h);i.dataset.collapsed=w?"true":"false",p.setAttribute("aria-expanded",w?"false":"true"),p.setAttribute("aria-label",`${w?"Show":"Hide"} ${i.dataset.tool||"tool"} output`),p.title=w?"Show tool output":"Hide tool output";let l=p.querySelector(".tc-toggle-label");if(l)l.textContent=w?"show":"hide"}function jb(i){let p=document.createElement("span");p.className="tc-glyph";let b=Qb(i),h=b?oi[b]:"";if(!b||!h)return p.textContent="●",p;return p.innerHTML=`<svg class="tc-icon" data-tool-icon="${b}" aria-hidden="true" viewBox="0 0 24 24">${h}</svg>`,p}function gb(i){let p=document.createElement("span");return p.className="tc-name",p.textContent=i.name||"tool",p}function Xb(i){let p=document.createElement("span");return p.className="tc-args",p.textContent=Xi(i),p}function Yb(i,p){let b=document.createElement("span");if(b.className="tc-meta",i.status==="running"){let w=document.createElement("span");w.className="spinner",w.textContent="⠇";let l=document.createElement("span");return l.className="running",l.textContent="running",b.append(w,l,_i(p)),b}let h=document.createElement("span");h.className=i.status==="err"?"err":"ok",h.textContent=i.status==="err"?"✗":"✓";let f=document.createElement("span");return f.textContent=i.status==="err"?" · failed":" · done",b.append(h,f,_i(p)),b}function _i(i){let p=document.createElement("span");p.className="tc-toggle";let b=document.createElement("span");b.className="tc-toggle-label",b.textContent=i?"show":"hide";let h=document.createElement("span");return h.className="tc-caret",h.textContent="▸",p.append(b,h),p}function Xi(i){if(!i.args)return"";return JSON.stringify(i.args)}function Qb(i){let p=Kb(i.name);if(["bash","shell","sh","zsh","terminal"].includes(p))return vb(Xi(i).toLowerCase())||"terminal";return ti[p]}function Kb(i){return i.trim().replace(/^functions\./,"").replace(/^multi_tool_use\./,"")}function vb(i){if(/\bgit\b|\bgh\b/.test(i))return"git-branch";if(/\b(go test|bun test|npm test|pnpm test|yarn test|vitest|pytest|cargo test)\b/.test(i))return"circle-check";if(/\b(bun|npm|pnpm|yarn)\s+(run\s+)?build\b|\b(go build|cargo build)\b/.test(i))return"hammer";if(/\b(bun|npm|pnpm|yarn)\s+(add|install|i)\b|\bpip\s+install\b|\bgo\s+get\b/.test(i))return"package";return}function Pb(i){if(i==="assistant")return"pi >";if(i==="user")return"you >";if(i==="system")return"sys >";return"tool >"}function k(i){if(i==="assistant")return"pi";if(i==="system")return"sys";return i}function Yi(i,p){let b=new Map;for(let h of i)b.set(h.id,h);for(let h of p)b.set(h.id,{...b.get(h.id),...h});return[...b.values()].sort((h,f)=>h.createdAt-f.createdAt)}function J(i){return M(i,i.activeSessionId,!0)}function M(i,p,b=!1){let h=i.sessions.find((f)=>f.id===p);if(!h)h=X(p||void 0),i.sessions.unshift(h),H(i);if(b||!i.activeSessionId)i.activeSessionId=h.id,H(i);return h}function Wb(i,p,b,h){if(p===b)return;let f=i.sessions.find((T)=>T.id===p),w=f?.messages.findIndex((T)=>T.id===h)??-1;if(!f||w<0)return;let[l]=f.messages.splice(w,1),L=M(i,b);if(!L.messages.some((T)=>T.id===l.id))L.messages.push(l);f.updatedAt=Date.now(),L.updatedAt=Date.now(),H(i)}function X(i=P()){let p=Date.now();return{id:i,title:"New chat",createdAt:p,updatedAt:p,messages:[]}}function Y(i){try{return localStorage.getItem(i)||""}catch{return""}}function xb(i=""){try{let b=JSON.parse(localStorage.getItem(j)||"null");if(b&&typeof b.activeSessionId==="string"&&Array.isArray(b.sessions)){let h=b.sessions.filter(Ki).map(kb);if(i&&!h.some((f)=>f.id===i))h.unshift(X(i));return{activeSessionId:i||b.activeSessionId,sessions:h}}}catch{}let p=X(i||void 0);return{activeSessionId:p.id,sessions:[p]}}function ub(){try{let i=JSON.parse(localStorage.getItem(j)||"null");return Boolean(i&&Array.isArray(i.sessions)&&i.sessions.some(Ki))}catch{return!1}}function H(i){Hi(i);try{localStorage.setItem(j,JSON.stringify(i))}catch{for(let p of i.sessions)p.messages=p.messages.slice(-Math.floor(D/2));Hi(i);try{localStorage.setItem(j,JSON.stringify(i))}catch{}}}function Qi(i){if(!i?.length)return;return i.map(({content:p,...b})=>b)}function Hi(i){i.sessions.sort((h,f)=>f.updatedAt-h.updatedAt);let p=i.sessions.find((h)=>h.id===i.activeSessionId),b=i.sessions.filter((h)=>h.id!==i.activeSessionId).slice(0,Math.max(0,Li-1));i.sessions=p?[p,...b]:i.sessions.slice(0,Li);for(let h of i.sessions)if(h.messages.length>D)h.messages.splice(0,h.messages.length-D)}function Ki(i){return B(i)&&typeof i.id==="string"&&Array.isArray(i.messages)}function kb(i){return{...i,messages:t(i.messages)}}function t(i){return Array.isArray(i)?i.filter(db).map(Ib):[]}function Ib(i){if(!Array.isArray(i.toolCalls)){let{toolCalls:p,...b}=i;return b}return{...i,toolCalls:i.toolCalls.filter(Sb)}}function Sb(i){if(!B(i)||typeof i.id!=="string"||typeof i.name!=="string")return!1;return typeof i.text==="string"&&mb(i.status)}function mb(i){return i==="running"||i==="ok"||i==="err"}function db(i){if(!B(i)||typeof i.id!=="string"||typeof i.text!=="string")return!1;return typeof i.createdAt==="number"&&ab(i.role)}function ab(i){return i==="user"||i==="assistant"||i==="tool"||i==="system"}function B(i){return typeof i==="object"&&i!==null}function P(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`}function vi(i){return i instanceof Error?i.message:String(i)}export{xi as renderMessages,Ii as promptFromAgUiLikeRunInput,hi as pluginStyleText,x as pluginClass,hp as mergeCommands,K as getActiveWorkspaceId,pp as extractRefs,si as default,ii as createComposerSurface,e as createChatSurface,Wi as createChatDom,bp as createChannels,ki as createAgUiLikeRunInput,wi as commandName,Si as chatEventsToAgUiLikeEvents,d as backendCall};
