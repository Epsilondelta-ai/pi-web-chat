var B={attachFile:["M16.5 6v11.5a4 4 0 0 1-8 0V5a2.5 2.5 0 0 1 5 0v10.5a1 1 0 0 1-2 0V6H10v9.5","a2.5 2.5 0 0 0 5 0V5a4 4 0 0 0-8 0v12.5a5.5 5.5 0 0 0 11 0V6h-1.5Z"].join(""),stop:"M6 6h12v12H6V6Z",send:"M2 21 23 12 2 3v7l15 2-15 2v7Z",terminal:"M3 4h18v16H3V4Zm2 2v12h14V6H5Zm2 3 1.1-1.1L12.2 12l-4.1 4.1L7 15l3-3-3-3Zm6 6h5v1.5h-5V15Z",file:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 2.5L17.5 8H14V4.5ZM8 13h8v1.5H8V13Zm0 3h8v1.5H8V16Z"},P={attachFile:Z("attach_file",B.attachFile),stop:Z("stop",B.stop),send:Z("send",B.send)};function Z(i,b){return`<svg class="material-icon" data-material-icon="${i}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="${b}"></path></svg>`}function x(){return"pi-web-chat-mounted"}function s(){let i=document.createElement("main");return i.className="main pi-web-chat-surface",i.dataset.main="session",i.innerHTML='<div class="term"><div class="term-inner" role="log" aria-live="polite" aria-relevant="additions text"></div></div><button type="button" class="scroll-bottom-btn" data-action="scroll-bottom" aria-label="stick to bottom" title="stick to bottom" aria-pressed="true" hidden>↓</button>',i}function e(){let i=document.createElement("section");return i.className="prompt-region pi-web-chat-composer",i.innerHTML=`
    <div class="slash-pop" hidden><div class="slash-head">slash commands · type to filter</div><div class="slash-list"></div></div>
    <div class="prompt-bar">
      <button class="attach-btn" type="button" aria-label="attach files" title="attach files">${P.attachFile}</button>
      <input type="file" multiple hidden data-file-input />
      <div class="prompt-input-col"><div class="attach-chips" hidden></div><textarea class="prompt-textarea" aria-label="Prompt" placeholder="ask pi to do something…" rows="1"></textarea></div>
      <div class="prompt-actions">
        <button class="stop-btn" type="button" aria-label="stop" title="stop" hidden>${P.stop}</button>
        <button class="mic-btn" type="button" data-action="toggle-speech-input" aria-label="start voice input" title="voice input" hidden>\uD83C\uDF99</button>
        <button class="send-btn" type="button" aria-label="send" title="send" aria-disabled="true">${P.send}</button>
      </div>
      <div class="drop-overlay" hidden><span>drop to attach</span></div>
    </div>
    <div class="prompt-meta" data-prompt-meta>— | <span class="prompt-meta-item prompt-meta-branch"><span>—</span></span></div>`,i}function ii(i){let b=document.createElement("span");return b.className="prompt-meta-item pi-web-chat-badge",b.textContent="chat plugin",i.querySelector("[data-prompt-meta]")?.append(b),b}function vi(){let i=document.createElement("section");return i.className="pi-web-chat-root",i.dataset.plugin="pi-web-chat",i.innerHTML=`
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
    </section>`,{root:i,transcript:R(i.querySelector("[data-chat-transcript]")),textarea:R(i.querySelector("[data-chat-input]")),sendButton:R(i.querySelector("[data-send]")),attachButton:R(i.querySelector("[data-attach]")),fileInput:R(i.querySelector("[data-file-input]")),slashPopover:R(i.querySelector("[data-slash-popover]")),slashList:R(i.querySelector("[data-slash-list]")),refsPopover:R(i.querySelector("[data-refs-popover]")),refsList:R(i.querySelector("[data-refs-list]")),attachments:R(i.querySelector("[data-attachments]"))}}function Ki(i,b){i.replaceChildren(...b.map(Pi)),i.scrollTop=i.scrollHeight}function Pi(i){let b=document.createElement("article");b.className=`pi-web-chat-message pi-web-chat-message-${i.role}`,b.dataset.messageId=i.id;let p=document.createElement("div");p.className="pi-web-chat-message-role",p.textContent=i.role;let h=document.createElement("pre");if(h.className="pi-web-chat-message-body",h.textContent=i.text,b.append(p,h),i.thinking){let f=document.createElement("details");f.className="pi-web-chat-thinking",f.open=Boolean(i.streaming);let w=document.createElement("summary");w.textContent="thinking";let l=document.createElement("pre");l.textContent=i.thinking,f.append(w,l),b.append(f)}if(i.toolCalls?.length){let f=document.createElement("div");f.className="pi-web-chat-tools";for(let w of i.toolCalls){let l=document.createElement("details");l.className=`pi-web-chat-tool pi-web-chat-tool-${w.status}`,l.open=w.status==="running";let L=document.createElement("summary");L.textContent=`${w.name} · ${w.status}`;let r=document.createElement("pre");r.textContent=w.text||JSON.stringify(w.args||{},null,2),l.append(L,r),f.append(l)}b.append(f)}if(i.streaming){let f=document.createElement("div");f.className="pi-web-chat-message-meta",f.textContent="streaming...",b.append(f)}if(i.attachments?.length){let f=document.createElement("div");f.className="pi-web-chat-message-meta",f.textContent=`${i.attachments.length} attachment(s)`,b.append(f)}return b}function pi(i,b){i.hidden=b.length===0,i.replaceChildren(...b.map((p)=>{let h=document.createElement("span");return h.className="pi-web-chat-attachment-chip",h.textContent=p,h}))}function bi(){return`
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
  `}function hi(){document.getElementById("pi-web-chat-style")?.remove();let i=document.createElement("style");return i.id="pi-web-chat-style",i.textContent=bi(),document.head.append(i),i}function fi(i){return i.command||i.cmd||(i.name?`/${i.name}`:"")}function R(i){if(!i)throw Error("pi-web-chat DOM template is invalid");return i}function xi(i,b,p){return{threadId:i,runId:b,state:{},messages:p,tools:[],context:[]}}function ui(i){let b=[...i.messages].reverse().find((p)=>p.role==="user");return{text:b?.text||"",attachments:b?.attachments||[],sessionId:i.threadId}}function Wi(i,b,p){return i.map((h)=>ki(h,b,p))}function ki(i,b,p){if(i.type==="text.delta")return{type:"TEXT_MESSAGE_CONTENT",threadId:b,runId:p,delta:i.delta||""};if(i.type==="thinking.delta")return{type:"THINKING_MESSAGE_CONTENT",threadId:b,runId:p,delta:i.delta||""};if(i.type==="tool.start")return{type:"TOOL_CALL_START",threadId:b,runId:p,toolCallId:i.toolCallId,payload:wi(i)};if(i.type==="tool.delta")return{type:"TOOL_CALL_ARGS",threadId:b,runId:p,toolCallId:i.toolCallId,delta:i.delta||""};if(i.type==="tool.end")return{type:"TOOL_CALL_END",threadId:b,runId:p,toolCallId:i.toolCallId,payload:wi(i)};return{type:i.type.toUpperCase().replaceAll(".","_"),threadId:b,runId:p,payload:i}}function wi(i){return{name:i.toolName||"tool",args:i.args||{},result:i.result||"",isError:i.isError===!0}}var G="pi-web-chat.sessions.v1";var _i="plugin.pi-web-sidebar.selectedSession",Hi="plugin.pi-web-sidebar.event",I="plugin.pi-web-sidebar.activeSessionId",X="plugin.pi-web-sidebar.activeWorkspaceId";var li=20,V=200,Ii=8,Si=1e6;var di=250,M=new Set,mi={"book-open":'<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',"file-plus":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="M9 15h6"/>',pencil:'<path d="M21.2 6.8 17.2 2.8a2 2 0 0 0-2.8 0L3 14.2V21h6.8L21.2 9.6a2 2 0 0 0 0-2.8z"/><path d="m14 5 5 5"/>',terminal:'<path d="m4 17 6-6-6-6"/><path d="M12 19h8"/>',cpu:'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 15h3"/><path d="M1 9h3"/><path d="M1 15h3"/>',globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 0 20"/><path d="M12 2a15.3 15.3 0 0 0 0 20"/>',search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',braces:'<path d="M8 3H7a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-4a2 2 0 0 1 2-2 2 2 0 0 1-2-2V7a2 2 0 0 0-2-2h-1"/>',"file-text":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',"circle-question-mark":'<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 1 1 5.8 1c-.5 1-1.4 1.5-2.1 2-.6.4-.8.8-.8 2"/><path d="M12 17h.01"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',plug:'<path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a6 6 0 0 1-12 0V8Z"/>',"git-branch":'<line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',"circle-check":'<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',hammer:'<path d="m15 12-8.5 8.5a2.1 2.1 0 0 1-3-3L12 9"/><path d="m17.6 5.4 1.8-1.8"/><path d="m14 7 3 3"/><path d="M5 11 2 8l6-6 3 3"/>',package:'<path d="m7.5 4.3 9 5.2"/><path d="M21 8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>'},k=new WeakMap,ai={read:"book-open",write:"file-plus",edit:"pencil",ctx_execute:"cpu",ctx_batch_execute:"cpu",ctx_execute_file:"cpu",ctx_search:"cpu",ctx_index:"cpu",ctx_fetch_and_index:"cpu",web_search:"globe",fetch_content:"search",get_search_content:"search",code_search:"braces",document_parse:"file-text",ask_user_question:"circle-question-mark",teams:"users",subagent:"users",mcp:"plug",git:"git-branch"};class Ri{#i=[];add(i){if(i)this.#i.push(i);return i}listen(i,b,p){i.addEventListener(b,p),this.add({remove:()=>i.removeEventListener(b,p)})}dispose(){for(let i of this.#i.splice(0).reverse())if(typeof i==="function")i();else if("unsubscribe"in i)i.unsubscribe();else i.remove()}}function ni(i={}){let b=i.app;if(b?.piWebChat?.dispose(),typeof i.mount?.chat!=="function"||typeof i.mount?.composer!=="function")throw Error("pi-web-chat requires modern pi-web mount.chat and mount.composer APIs");return oi(i,b)}function oi(i,b){let p=new Ri,h=p.add(hi()),f=s(),w=e(),l=i.mount?.chat(f,{replace:!0}),L=i.mount?.composer(w,{replace:!0});if(Fp(p,f),l)p.add(l);if(L)p.add(L);let r=Q(i);F(i,r||void 0);let T=!r?.sessionId&&!xp(),c=Pp(r?.sessionId||""),C={backendChatToken:0};if(T)n(f);else A(f,v(c).messages,c.activeSessionId),m(i,f,c,C,r?.sessionId||c.activeSessionId);$p(p,i,f,c,C),ti(p,i,w,f,c,C);let E=b?p.add(ii(b)):void 0;b?.classList.add(x());let N=()=>{if(C.runEventsAbort?.abort(),C.sessionEventsAbort?.abort(),p.dispose(),M.clear(),E?.remove(),h.remove(),b?.classList.remove(x()),b?.piWebChat===H)delete b.piWebChat},H={dispose:N};if(b)b.piWebChat=H;return N}function ti(i,b,p,h,f,w){let l=p.querySelector(".prompt-textarea"),L=p.querySelector(".send-btn"),r=p.querySelector(".attach-btn"),T=p.querySelector("[data-file-input]"),c=p.querySelector(".attach-chips");if(!l||!L)return;let C=[],E=()=>{let O=l.value;L.setAttribute("aria-disabled",O.trim()?"false":"true")},N=()=>{if(!c)return;pi(c,C.map((O)=>{return O.name||"attachment"}))},H=async(O)=>{O?.preventDefault(),O?.stopImmediatePropagation();let y=l.value.trim();if(E(),!y)return;let t=[...C];L.disabled=!0;try{if(rp(y,t),await hp(b,h,f,w,y,t),C=[],N(),l.value.trim()===y)l.value="";if(T)T.value=""}catch(Qi){A(h,[si(Qi)],f.activeSessionId)}finally{L.disabled=!1,E()}};if(i.listen(l,"input",E),i.listen(l,"keydown",(O)=>{let y=O;if(y.key==="Enter"&&(y.metaKey||y.ctrlKey))H(y)}),i.listen(L,"click",(O)=>{H(O)}),r&&T)i.listen(r,"click",()=>T.click()),i.listen(T,"change",()=>{ei(T,(O)=>{C=O,N()})})}function si(i){return{id:K(),role:"system",text:`prompt failed: ${Yi(i)}`,createdAt:Date.now()}}async function ei(i,b){let p=Array.from(i.files||[]).slice(0,Ii),h=[];for(let f of p){if(f.size>Si)continue;h.push({name:f.name,size:f.size,content:await f.text(),mimeType:f.type||void 0})}b(h)}function ep(i){return{input$:i.behaviorSubject("chat.input",""),submitted$:i.subject("chat.input.submitted"),activeSessionId$:i.behaviorSubject("session.activeId",null),sidebarSelectedSession$:i.behaviorSubject(_i,ip()),toastRequested$:i.subject("toast.requested")}}function ib(i){let b=[],p=new Set,h=/(^|[\s`])@([^\s@`]+)/g,f=h.exec(String(i||""));while(f!==null){let w=f[2]||"";if((f[1]||"")!=="`"&&w&&!p.has(w))p.add(w),b.push(w);f=h.exec(String(i||""))}return b}function pb(i=[],b=[]){let p=[],h=new Set;for(let f of[...i,...b]){let w=fi(f);if(!w||h.has(w))continue;h.add(w),p.push(f)}return p}function Y(i){return i.app?.piWebSidebar?.getSnapshot?.().activeWorkspaceId||i.app?.dataset.activeWorkspaceId||""}function ip(){return Q({})}function Q(i){let b=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),p=b?.activeSessionId||"",h=b?.activeWorkspaceId||"";if(p)return{sessionId:p,workspaceId:h||void 0};let f=j(I),w=j(X);return f?{sessionId:f,workspaceId:w||void 0}:null}function F(i,b){if(b?.workspaceId&&i.app)i.app.dataset.activeWorkspaceId=b.workspaceId,Li(X,b.workspaceId);if(b?.sessionId)i.app?.setAttribute("data-active-session-id",b.sessionId),Li(I,b.sessionId)}function pp(i){i.app?.removeAttribute("data-active-session-id"),bp(I),globalThis.piWeb?.behaviorSubject("session.activeId",null).next(null)}function g(i,b,p={}){let h=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),f={type:b,detail:p,snapshot:h};(i.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$)?.next(f),globalThis.piWeb?.subject(Hi).next(f)}function S(i,b,p){let h=i.app?.dataset.activeWorkspaceId||Y(i),f={reason:p,sessionId:b,workspaceId:h};globalThis.piWeb?.behaviorSubject("session.activeId",b).next(b),globalThis.piWeb?.subject("session.changed").next({sessionId:b,workspaceId:h,reason:p}),g(i,"active.start",f),g(i,"session.created",f)}function Li(i,b){try{localStorage.setItem(i,b)}catch{}}function bp(i){try{localStorage.removeItem(i)}catch{}}async function d(i,b,p={},h=Y(i)){if(!i.backend)return{};let f=await i.backend(b,{workspaceId:h,data:p});return U(f)?f:{}}async function hp(i,b,p,h,f,w){let l=Ap(i,p),L=$(i);h.backendChatToken+=1,h.runEventsAbort?.abort();let r=new AbortController;h.runEventsAbort=r,h.sessionEventsAbort?.abort();let T={id:K(),role:"user",text:f,attachments:ji(w),createdAt:Date.now()},c=z(p,l);c.messages.push(T),c.updatedAt=Date.now(),_(p),A(b,c.messages,l);let C=await Tp(i,f,w,l,L.path,L.id);if(typeof C.activeSessionId==="string"&&C.activeSessionId){let H=l,O=p.activeSessionId===H;if(l=C.activeSessionId,O)D(p,l),F(i,{sessionId:C.activeSessionId,workspaceId:L.id||void 0}),g(i,"chat-session",{reason:"startPrompt",sessionId:C.activeSessionId}),S(i,C.activeSessionId,"startPrompt");else z(p,l);Kp(p,H,l,T.id)}if(typeof C.runId!=="string"||!C.runId){let H=await Cp(i,f,w,l,L.path,L.id),O=yp(i,p,H,"submitPrompt",l);if(p.activeSessionId===l)A(b,O,l);if(h.runEventsAbort===r)h.runEventsAbort=void 0;return}let E=z(p,l),N=Op(E);try{await fp(i,p,E,C.runId,L.path,L.id,N,()=>{if(p.activeSessionId===l)A(b,E.messages,l)},r.signal)}finally{if(h.runEventsAbort===r)h.runEventsAbort=void 0}if(p.activeSessionId===l)m(i,b,p,h,l,L.path,L.id)}async function fp(i,b,p,h,f,w,l,L,r){let T=await $i(i,"streamEventsSse",{runId:h,cursor:0,workspacePath:f},r,w);if(!T)throw Error("SSE streaming backend did not return a stream");let c=yi(L);l.streaming=!0,c.flush();try{await Ai(T,(C)=>{Ep(l,[C]),l.streaming=C.type!=="run.end",p.updatedAt=Date.now(),_(b),c.request()})}finally{l.streaming=!1,_(b),c.flush()}}function yi(i){let b=0,p,h=()=>{if(p)clearTimeout(p),p=void 0},f=()=>{h(),b=Date.now(),i()};return{request:()=>{let l=di-(Date.now()-b);if(l<=0){f();return}p||=setTimeout(f,l)},flush:f,cancel:h}}async function $i(i,b,p={},h,f=Y(i)){if(!i.backendStream)throw Error("SSE streaming backend is unavailable");let w=await i.backendStream(b,{workspaceId:f,data:p},{signal:h});return wp(w)}function wp(i){if(typeof ReadableStream<"u"&&i instanceof ReadableStream)return i;if(typeof Response<"u"&&i instanceof Response)return i.body;if(typeof i==="string")return ri(i);if(!U(i))return null;let b=i.body;if(typeof ReadableStream<"u"&&b instanceof ReadableStream)return b;let p=i.sse;if(typeof p==="string")return ri(p);return null}function ri(i){let b=new TextEncoder().encode(i);return new ReadableStream({start(p){p.enqueue(b),p.close()}})}async function Ai(i,b){let p=i.getReader(),h=new TextDecoder,f="";while(!0){let w=await p.read();if(w.done){f+=h.decode(),Lp(f,b);return}f+=h.decode(w.value,{stream:!0});let l=lp(f);f=l.remainder;for(let L of l.frames)Ni(L,b)}}function lp(i){let p=i.replaceAll(`\r
`,`
`).replaceAll("\r",`
`).split(`

`),h=p.pop()||"";return{frames:p,remainder:h}}function Lp(i,b){let p=i.trim();if(p)Ni(p,b)}function Ni(i,b){let p=i.split(`
`).filter((h)=>h.startsWith("data:")).map((h)=>h.slice(5).trimStart()).join(`
`);if(!p)return;try{let h=JSON.parse(p);if(_p(h))b(h)}catch{}}function rp(i,b){globalThis.piWeb?.subject("chat.input.submitted").next({text:i,attachments:ji(b)||[]})}async function Tp(i,b,p,h,f=$(i).path,w=$(i).id){try{return await d(i,"startPrompt",zi(b,p,h,f),w)}catch(l){if(cp(l))return{};throw l}}function cp(i){return/unknown method: (startPrompt|streamEventsSse)|unsupported method: (startPrompt|streamEventsSse)|(startPrompt|streamEventsSse) unsupported/i.test(Yi(i))}async function Cp(i,b,p,h="",f=$(i).path,w=$(i).id){return await d(i,"submitPrompt",zi(b,p,h,f),w)}function zi(i,b,p,h){let f={text:i,attachments:b,sessionId:p};if(h)f.workspacePath=h;return f}function Op(i){let b=[...i.messages].reverse().find((h)=>h.role==="assistant"&&h.streaming);if(b)return b;let p={id:K(),role:"assistant",text:"",createdAt:Date.now(),streaming:!0};return i.messages.push(p),p}function Ep(i,b){for(let p of b)if(p.type==="text.delta"&&typeof p.delta==="string")i.text+=p.delta;else if(p.type==="thinking.delta"&&typeof p.delta==="string")i.thinking=`${i.thinking||""}${p.delta}`;else if(p.type==="tool.start")u(i,p,"running");else if(p.type==="tool.delta"&&typeof p.delta==="string"){let h=u(i,p,"running");h.text=p.delta}else if(p.type==="tool.end"){let h=u(i,p,p.isError?"err":"ok");if(typeof p.result==="string"&&p.result)h.text=p.result}else if(p.type==="error"&&typeof p.message==="string")i.text+=`${i.text?`
`:""}${p.message}`}function u(i,b,p){let h=b.toolCallId||b.toolName||"tool";i.toolCalls||=[];let f=i.toolCalls.find((w)=>w.id===h);if(!f)f={id:h,name:b.toolName||"tool",args:b.args,text:"",status:p},i.toolCalls.push(f);if(f.status=p,b.args)f.args=b.args;return f}function _p(i){return U(i)&&typeof i.type==="string"}async function m(i,b,p,h,f="",w=a(i),l=$(i).id){if(!i.backendStream){await Ti(i,b,p,h,f,w);return}let L=++h.backendChatToken;h.sessionEventsAbort?.abort();let r=new AbortController;h.sessionEventsAbort=r;let T=yi(()=>{A(b,v(p).messages,p.activeSessionId)});try{let c=await $i(i,"sessionEventsSse",Mi(i,f,w),r.signal,l);if(!c)throw Error("session SSE backend did not return a stream");await Ai(c,(C)=>{if(L!==h.backendChatToken||C.type!=="chat.state")return;if(Fi(i,p,Hp(C),"chatState").length)T.request()})}catch(c){if(!r.signal.aborted)await Ti(i,b,p,h,f,w)}finally{if(T.cancel(),h.sessionEventsAbort===r)h.sessionEventsAbort=void 0}}async function Ti(i,b,p,h,f="",w=a(i)){let l=++h.backendChatToken;try{let L=await d(i,"chatState",Mi(i,f,w));if(l!==h.backendChatToken)return;let r=Fi(i,p,L,"chatState");if(r.length)A(b,r,p.activeSessionId)}catch{}}function Mi(i,b,p=a(i)){let h=b?{sessionId:b}:{};if(p)h.workspacePath=p;return h}function Hp(i){return{activeSessionId:i.activeSessionId,messages:i.messages,isStreaming:i.isStreaming}}function a(i){return $(i).path}function $(i){let b=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),p=b?.activeWorkspaceId||i.app?.dataset.activeWorkspaceId||"",h=b?.workspaces?.find((f)=>f.id===p)?.path||"";return{id:p,path:h}}function Rp(i,b){let p=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),h=b.workspaceId||p?.activeWorkspaceId||i.app?.dataset.activeWorkspaceId||"",f=p?.workspaces?.find((w)=>w.id===h)?.path||"";if(f||h!==p?.activeWorkspaceId)return{id:h,path:f};return $(i)}function Fi(i,b,p,h){let f=o(p.messages);if(typeof p.activeSessionId==="string"&&p.activeSessionId){let L=b.activeSessionId;if(D(b,p.activeSessionId),F(i,{sessionId:p.activeSessionId,workspaceId:i.app?.dataset.activeWorkspaceId||Y(i)||void 0}),h!=="chatState"||L!==p.activeSessionId)g(i,"chat-session",{reason:h,sessionId:p.activeSessionId});if(h!=="chatState")S(i,p.activeSessionId,h)}let w=v(b);if(!f.length)return[];let l=Ji(w.messages,f).slice(-V);if(!Ui(w.messages,l))return[];if(w.messages=l,w.title==="New chat"){let L=w.messages.find((r)=>r.role==="user");if(L)w.title=L.text.slice(0,48)||w.title}return w.updatedAt=Date.now(),_(b),w.messages}function Ui(i,b){if(i.length!==b.length)return!0;return i.some((p,h)=>ci(p)!==ci(b[h]))}function ci(i){return JSON.stringify({id:i.id,role:i.role,text:i.text,thinking:i.thinking,streaming:i.streaming,toolCalls:i.toolCalls,attachments:i.attachments})}function yp(i,b,p,h,f){let w=o(p.messages),l=typeof p.activeSessionId==="string"&&p.activeSessionId?p.activeSessionId:f,L=b.activeSessionId===f;if(l!==f)if(L)D(b,l),F(i,{sessionId:l,workspaceId:$(i).id||void 0}),g(i,"chat-session",{reason:h,sessionId:l}),S(i,l,h);else z(b,l);let r=z(b,l);if(!w.length)return[];let T=Ji(r.messages,w).slice(-V);if(!Ui(r.messages,T))return[];return r.messages=T,r.updatedAt=Date.now(),_(b),r.messages}function $p(i,b,p,h,f){let w=(T)=>{if(!T?.sessionId)return;if(Bi(b,h,T))return;F(b,T),D(h,T.sessionId),A(p,v(h).messages,h.activeSessionId);let c=Rp(b,T);m(b,p,h,f,T.sessionId,c.path,c.id)},l=(T)=>{if(Np(b,p,h,f,T))return;let c=zp(b,T);if(c)w(c)},L=b.app?.piWebSidebar?.channels?.selectedSession$||globalThis.piWebSidebar?.channels?.selectedSession$,r=b.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$;if(L)i.add(L.subscribe(w));if(r)i.add(r.subscribe(l));if(b.app)i.listen(b.app,"pi-web-sidebar:session-created",(T)=>{let c=T.detail||{},C=typeof c.sessionId==="string"?c.sessionId:"",E=typeof c.workspaceId==="string"?c.workspaceId:"";if(C)w({sessionId:C,workspaceId:E||void 0})});if(globalThis.piWeb)i.add(globalThis.piWeb.behaviorSubject(_i,Q(b)).subscribe(w)),i.add(globalThis.piWeb.subject(Hi).subscribe(l)),i.add(globalThis.piWeb.behaviorSubject("session.activeId",null).subscribe((T)=>{if(!T)return;w({sessionId:T,workspaceId:b.app?.dataset.activeWorkspaceId||j(X)||void 0})}))}function Ap(i,b){let p=Q(i);if(p?.sessionId&&!Bi(i,b,p))F(i,p),D(b,p.sessionId);return b.activeSessionId}function Bi(i,b,p){let h=p.workspaceId||"",f=i.app?.dataset.activeWorkspaceId||j(X)||"";return b.activeSessionId===p.sessionId&&(!h||h===f)}function Np(i,b,p,h,f){if(f.type!=="session.deleted")return!1;let w=Zi(f);if(!w)return!0;let l=p.activeSessionId===w,L=p.sessions.length;if(p.sessions=p.sessions.filter((r)=>r.id!==w),l)return p.activeSessionId="",h.runEventsAbort?.abort(),h.sessionEventsAbort?.abort(),pp(i),_(p),n(b),!0;if(p.sessions.length!==L)_(p);return!0}function zp(i,b){if(!Mp(b.type))return null;let p=b.detail||{},h=Zi(b)||b.snapshot?.activeSessionId||"",f=typeof p.workspaceId==="string"?p.workspaceId:b.snapshot?.activeWorkspaceId||i.app?.dataset.activeWorkspaceId||"";if(!h)return null;return{sessionId:h,workspaceId:f||void 0}}function Zi(i){let b=i.detail||{};if(typeof b.sessionId==="string")return b.sessionId;if(typeof b.id==="string")return b.id;return""}function Mp(i){return i==="session.selected"||i==="session.created"||i==="new-session"||i==="active.start"}function D(i,b){let p=i.sessions.find((h)=>h.id===b);if(!p)p=J(b),i.sessions.unshift(p);return i.activeSessionId=p.id,_(i),p}function A(i,b,p){if(Vp(b,p),!b.length){n(i);return}(i.querySelector(".term-inner")||i).replaceChildren(...b.map((f)=>Up(f,p))),Vi(i)}function n(i){let b=i.querySelector(".term-inner")||i,p=document.createElement("article");p.className="pi-web-chat-docs",p.setAttribute("aria-label","pi-web-chat guide");let h=document.createElement("h1");h.textContent="pi-web-chat guide";let f=document.createElement("p");f.textContent=["Select or create a session in the sidebar to load chat history,","or type below to start a new session."].join(" ");let w=document.createElement("ul");for(let l of["Ask pi in the prompt box and press Cmd/Ctrl+Enter to send.","Use / for slash commands, @ for file references, and ! for shell commands.","Chats are cached locally after you start or select a session."]){let L=document.createElement("li");L.textContent=l,w.append(L)}p.append(h,f,w),b.replaceChildren(p),Vi(i)}function Fp(i,b){let p=b.querySelector(".term"),h=b.querySelector("[data-action='scroll-bottom']");if(!p||!h)return;let f={term:p,button:h,pinned:!0,touchStartY:null};k.set(b,f),h.hidden=!1,q(f),i.listen(h,"click",()=>{f.pinned=!0,gi(f),q(f)}),i.listen(p,"wheel",(w)=>{if(w.deltaY<0)Ci(f)}),i.listen(p,"touchstart",(w)=>{let l=w;f.touchStartY=l.touches.item(0)?.clientY??null}),i.listen(p,"touchmove",(w)=>{let L=w.touches.item(0)?.clientY;if(typeof L==="number"&&f.touchStartY!==null&&L-f.touchStartY>8)Ci(f)}),i.listen(p,"touchend",()=>{f.touchStartY=null}),i.add({remove:()=>{k.delete(b)}})}function Vi(i){let b=k.get(i);if(!b)return;if(b.pinned)gi(b);q(b)}function gi(i){i.term.scrollTop=i.term.scrollHeight}function Ci(i){i.pinned=!1,q(i)}function q(i){i.button.dataset.pinned=i.pinned?"true":"false",i.button.setAttribute("aria-pressed",i.pinned?"true":"false")}function Up(i,b){let p=document.createElement("article");p.className="transcript-item",p.dataset.messageId=i.id;let h=document.createElement("div");h.className="msg",h.dataset.kind=W(i.role);let f=document.createElement("span");f.className=`prefix ${W(i.role)}`,f.textContent=vp(i.role);let w=document.createElement("pre");if(w.className=`body ${W(i.role)}`,w.textContent=i.text,h.append(f,w),Bp(i))p.append(h);if(i.thinking)p.append(Zp(i.thinking,Boolean(i.streaming)));for(let l of i.toolCalls||[])p.append(gp(l,Di(b,i,l)));if(i.streaming)p.dataset.streaming="true";return p}function Bp(i){let b=i.text.trim().length>0;return i.role!=="assistant"||b}function Zp(i,b){let p=document.createElement("details");p.className="msg-detail think thinking-block",p.open=b;let h=document.createElement("summary");h.className="label",h.textContent="THINKING";let f=document.createElement("pre");return f.className="body",f.textContent=i,p.append(h,f),p}function Vp(i,b){let p=new Set;for(let h of i)for(let f of h.toolCalls||[])p.add(Di(b,h,f));for(let h of M)if(!p.has(h))M.delete(h)}function Di(i,b,p){return`${i}:${b.id}:${p.id}`}function gp(i,b){let p=document.createElement("div");p.className="tool-card",p.dataset.tool=i.name||"tool",p.dataset.status=i.status;let h=!M.has(b);p.dataset.collapsed=h?"true":"false";let f=document.createElement("button");if(f.type="button",f.className="tc-head",f.title=h?"Show tool output":"Hide tool output",f.setAttribute("aria-expanded",h?"false":"true"),f.setAttribute("aria-label",`${h?"Show":"Hide"} ${i.name||"tool"} output`),f.append(Gp(i),qp(i),Jp(i),jp(i,h)),!h)p.append(Gi(i));return f.addEventListener("click",()=>Dp(p,f,i,b)),p.prepend(f),p}function Gi(i){let b=document.createElement("pre");return b.className="tc-body",b.textContent=i.text||JSON.stringify(i.args||{},null,2),b}function Dp(i,b,p,h){let f=i.querySelector(".tc-body"),w=f!==null;if(f)f.remove(),M.delete(h);else i.append(Gi(p)),M.add(h);i.dataset.collapsed=w?"true":"false",b.setAttribute("aria-expanded",w?"false":"true"),b.setAttribute("aria-label",`${w?"Show":"Hide"} ${i.dataset.tool||"tool"} output`),b.title=w?"Show tool output":"Hide tool output";let l=b.querySelector(".tc-toggle-label");if(l)l.textContent=w?"show":"hide"}function Gp(i){let b=document.createElement("span");b.className="tc-glyph";let p=Xp(i),h=p?mi[p]:"";if(!p||!h)return b.textContent="●",b;return b.innerHTML=`<svg class="tc-icon" data-tool-icon="${p}" aria-hidden="true" viewBox="0 0 24 24">${h}</svg>`,b}function qp(i){let b=document.createElement("span");return b.className="tc-name",b.textContent=i.name||"tool",b}function Jp(i){let b=document.createElement("span");return b.className="tc-args",b.textContent=qi(i),b}function jp(i,b){let p=document.createElement("span");if(p.className="tc-meta",i.status==="running"){let w=document.createElement("span");w.className="spinner",w.textContent="⠇";let l=document.createElement("span");return l.className="running",l.textContent="running",p.append(w,l,Oi(b)),p}let h=document.createElement("span");h.className=i.status==="err"?"err":"ok",h.textContent=i.status==="err"?"✗":"✓";let f=document.createElement("span");return f.textContent=i.status==="err"?" · failed":" · done",p.append(h,f,Oi(b)),p}function Oi(i){let b=document.createElement("span");b.className="tc-toggle";let p=document.createElement("span");p.className="tc-toggle-label",p.textContent=i?"show":"hide";let h=document.createElement("span");return h.className="tc-caret",h.textContent="▸",b.append(p,h),b}function qi(i){if(!i.args)return"";return JSON.stringify(i.args)}function Xp(i){let b=Yp(i.name);if(["bash","shell","sh","zsh","terminal"].includes(b))return Qp(qi(i).toLowerCase())||"terminal";return ai[b]}function Yp(i){return i.trim().replace(/^functions\./,"").replace(/^multi_tool_use\./,"")}function Qp(i){if(/\bgit\b|\bgh\b/.test(i))return"git-branch";if(/\b(go test|bun test|npm test|pnpm test|yarn test|vitest|pytest|cargo test)\b/.test(i))return"circle-check";if(/\b(bun|npm|pnpm|yarn)\s+(run\s+)?build\b|\b(go build|cargo build)\b/.test(i))return"hammer";if(/\b(bun|npm|pnpm|yarn)\s+(add|install|i)\b|\bpip\s+install\b|\bgo\s+get\b/.test(i))return"package";return}function vp(i){if(i==="assistant")return"pi >";if(i==="user")return"you >";if(i==="system")return"sys >";return"tool >"}function W(i){if(i==="assistant")return"pi";if(i==="system")return"sys";return i}function Ji(i,b){let p=new Map;for(let h of i)p.set(h.id,h);for(let h of b)p.set(h.id,{...p.get(h.id),...h});return[...p.values()].sort((h,f)=>h.createdAt-f.createdAt)}function v(i){return z(i,i.activeSessionId,!0)}function z(i,b,p=!1){let h=i.sessions.find((f)=>f.id===b);if(!h)h=J(b||void 0),i.sessions.unshift(h),_(i);if(p||!i.activeSessionId)i.activeSessionId=h.id,_(i);return h}function Kp(i,b,p,h){if(b===p)return;let f=i.sessions.find((r)=>r.id===b),w=f?.messages.findIndex((r)=>r.id===h)??-1;if(!f||w<0)return;let[l]=f.messages.splice(w,1),L=z(i,p);if(!L.messages.some((r)=>r.id===l.id))L.messages.push(l);f.updatedAt=Date.now(),L.updatedAt=Date.now(),_(i)}function J(i=K()){let b=Date.now();return{id:i,title:"New chat",createdAt:b,updatedAt:b,messages:[]}}function j(i){try{return localStorage.getItem(i)||""}catch{return""}}function Pp(i=""){try{let p=JSON.parse(localStorage.getItem(G)||"null");if(p&&typeof p.activeSessionId==="string"&&Array.isArray(p.sessions)){let h=p.sessions.filter(Xi).map(up);if(i&&!h.some((f)=>f.id===i))h.unshift(J(i));return{activeSessionId:i||p.activeSessionId,sessions:h}}}catch{}let b=J(i||void 0);return{activeSessionId:b.id,sessions:[b]}}function xp(){try{let i=JSON.parse(localStorage.getItem(G)||"null");return Boolean(i&&Array.isArray(i.sessions)&&i.sessions.some(Xi))}catch{return!1}}function _(i){Ei(i);try{localStorage.setItem(G,JSON.stringify(i))}catch{for(let b of i.sessions)b.messages=b.messages.slice(-Math.floor(V/2));Ei(i);try{localStorage.setItem(G,JSON.stringify(i))}catch{}}}function ji(i){if(!i?.length)return;return i.map(({content:b,...p})=>p)}function Ei(i){i.sessions.sort((h,f)=>f.updatedAt-h.updatedAt);let b=i.sessions.find((h)=>h.id===i.activeSessionId),p=i.sessions.filter((h)=>h.id!==i.activeSessionId).slice(0,Math.max(0,li-1));i.sessions=b?[b,...p]:i.sessions.slice(0,li);for(let h of i.sessions)if(h.messages.length>V)h.messages.splice(0,h.messages.length-V)}function Xi(i){return U(i)&&typeof i.id==="string"&&Array.isArray(i.messages)}function up(i){return{...i,messages:o(i.messages)}}function o(i){return Array.isArray(i)?i.filter(Sp).map(Wp):[]}function Wp(i){if(!Array.isArray(i.toolCalls)){let{toolCalls:b,...p}=i;return p}return{...i,toolCalls:i.toolCalls.filter(kp)}}function kp(i){if(!U(i)||typeof i.id!=="string"||typeof i.name!=="string")return!1;return typeof i.text==="string"&&Ip(i.status)}function Ip(i){return i==="running"||i==="ok"||i==="err"}function Sp(i){if(!U(i)||typeof i.id!=="string"||typeof i.text!=="string")return!1;return typeof i.createdAt==="number"&&dp(i.role)}function dp(i){return i==="user"||i==="assistant"||i==="tool"||i==="system"}function U(i){return typeof i==="object"&&i!==null}function K(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`}function Yi(i){return i instanceof Error?i.message:String(i)}export{Ki as renderMessages,ui as promptFromAgUiLikeRunInput,bi as pluginStyleText,x as pluginClass,pb as mergeCommands,Y as getActiveWorkspaceId,ib as extractRefs,ni as default,e as createComposerSurface,s as createChatSurface,vi as createChatDom,ep as createChannels,xi as createAgUiLikeRunInput,fi as commandName,Wi as chatEventsToAgUiLikeEvents,d as backendCall};
