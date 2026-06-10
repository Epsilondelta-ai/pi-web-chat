var g={attachFile:["M16.5 6v11.5a4 4 0 0 1-8 0V5a2.5 2.5 0 0 1 5 0v10.5a1 1 0 0 1-2 0V6H10v9.5","a2.5 2.5 0 0 0 5 0V5a4 4 0 0 0-8 0v12.5a5.5 5.5 0 0 0 11 0V6h-1.5Z"].join(""),stop:"M6 6h12v12H6V6Z",send:"M2 21 23 12 2 3v7l15 2-15 2v7Z",terminal:"M3 4h18v16H3V4Zm2 2v12h14V6H5Zm2 3 1.1-1.1L12.2 12l-4.1 4.1L7 15l3-3-3-3Zm6 6h5v1.5h-5V15Z",file:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 2.5L17.5 8H14V4.5ZM8 13h8v1.5H8V13Zm0 3h8v1.5H8V16Z"},K={attachFile:B("attach_file",g.attachFile),stop:B("stop",g.stop),send:B("send",g.send)};function B(i,b){return`<svg class="material-icon" data-material-icon="${i}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="${b}"></path></svg>`}function x(){return"pi-web-chat-mounted"}function o(){let i=document.createElement("main");return i.className="main pi-web-chat-surface",i.dataset.main="session",i.innerHTML='<div class="term"><div class="term-inner" role="log" aria-live="polite" aria-relevant="additions text"></div></div><button type="button" class="scroll-bottom-btn" data-action="scroll-bottom" aria-label="stick to bottom" title="stick to bottom" aria-pressed="true" hidden>↓</button>',i}function t(){let i=document.createElement("section");return i.className="prompt-region pi-web-chat-composer",i.innerHTML=`
    <div class="slash-pop" hidden><div class="slash-head">slash commands · type to filter</div><div class="slash-list"></div></div>
    <div class="prompt-bar">
      <button class="attach-btn" type="button" aria-label="attach files" title="attach files">${K.attachFile}</button>
      <input type="file" multiple hidden data-file-input />
      <div class="prompt-input-col"><div class="attach-chips" hidden></div><textarea class="prompt-textarea" aria-label="Prompt" placeholder="ask pi to do something…" rows="1"></textarea></div>
      <div class="prompt-actions">
        <button class="stop-btn" type="button" aria-label="stop" title="stop" hidden>${K.stop}</button>
        <button class="mic-btn" type="button" data-action="toggle-speech-input" aria-label="start voice input" title="voice input" hidden>\uD83C\uDF99</button>
        <button class="send-btn" type="button" aria-label="send" title="send" aria-disabled="true">${K.send}</button>
      </div>
      <div class="drop-overlay" hidden><span>drop to attach</span></div>
    </div>
    <div class="prompt-meta" data-prompt-meta>— | <span class="prompt-meta-item prompt-meta-branch"><span>—</span></span></div>`,i}function e(i){let b=document.createElement("span");return b.className="prompt-meta-item pi-web-chat-badge",b.textContent="chat plugin",i.querySelector("[data-prompt-meta]")?.append(b),b}function Xi(){let i=document.createElement("section");return i.className="pi-web-chat-root",i.dataset.plugin="pi-web-chat",i.innerHTML=`
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
        <button class="pi-web-chat-icon-btn" type="button" data-attach aria-label="attach files" title="attach files">${B("attach_file",g.attachFile)}</button>
        <input type="file" multiple hidden data-file-input />
        <textarea class="pi-web-chat-textarea" data-chat-input aria-label="Prompt" placeholder="ask pi to do something…" rows="1"></textarea>
        <button class="pi-web-chat-send" type="button" data-send aria-label="send" title="send" aria-disabled="true">${B("send",g.send)}</button>
      </div>
    </section>`,{root:i,transcript:y(i.querySelector("[data-chat-transcript]")),textarea:y(i.querySelector("[data-chat-input]")),sendButton:y(i.querySelector("[data-send]")),attachButton:y(i.querySelector("[data-attach]")),fileInput:y(i.querySelector("[data-file-input]")),slashPopover:y(i.querySelector("[data-slash-popover]")),slashList:y(i.querySelector("[data-slash-list]")),refsPopover:y(i.querySelector("[data-refs-popover]")),refsList:y(i.querySelector("[data-refs-list]")),attachments:y(i.querySelector("[data-attachments]"))}}function Yi(i,b){i.replaceChildren(...b.map(Qi)),i.scrollTop=i.scrollHeight}function Qi(i){let b=document.createElement("article");b.className=`pi-web-chat-message pi-web-chat-message-${i.role}`,b.dataset.messageId=i.id;let p=document.createElement("div");p.className="pi-web-chat-message-role",p.textContent=i.role;let h=document.createElement("pre");if(h.className="pi-web-chat-message-body",h.textContent=i.text,b.append(p,h),i.thinking){let f=document.createElement("details");f.className="pi-web-chat-thinking",f.open=Boolean(i.streaming);let w=document.createElement("summary");w.textContent="thinking";let l=document.createElement("pre");l.textContent=i.thinking,f.append(w,l),b.append(f)}if(i.toolCalls?.length){let f=document.createElement("div");f.className="pi-web-chat-tools";for(let w of i.toolCalls){let l=document.createElement("details");l.className=`pi-web-chat-tool pi-web-chat-tool-${w.status}`,l.open=w.status==="running";let r=document.createElement("summary");r.textContent=`${w.name} · ${w.status}`;let L=document.createElement("pre");L.textContent=w.text||JSON.stringify(w.args||{},null,2),l.append(r,L),f.append(l)}b.append(f)}if(i.streaming){let f=document.createElement("div");f.className="pi-web-chat-message-meta",f.textContent="streaming...",b.append(f)}if(i.attachments?.length){let f=document.createElement("div");f.className="pi-web-chat-message-meta",f.textContent=`${i.attachments.length} attachment(s)`,b.append(f)}return b}function s(i,b){i.hidden=b.length===0,i.replaceChildren(...b.map((p)=>{let h=document.createElement("span");return h.className="pi-web-chat-attachment-chip",h.textContent=p,h}))}function ii(){return`
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
  `}function pi(){document.getElementById("pi-web-chat-style")?.remove();let i=document.createElement("style");return i.id="pi-web-chat-style",i.textContent=ii(),document.head.append(i),i}function bi(i){return i.command||i.cmd||(i.name?`/${i.name}`:"")}function y(i){if(!i)throw Error("pi-web-chat DOM template is invalid");return i}function ui(i,b,p){return{threadId:i,runId:b,state:{},messages:p,tools:[],context:[]}}function Ki(i){let b=[...i.messages].reverse().find((p)=>p.role==="user");return{text:b?.text||"",attachments:b?.attachments||[],sessionId:i.threadId}}function xi(i,b,p){return i.map((h)=>Pi(h,b,p))}function Pi(i,b,p){if(i.type==="text.delta")return{type:"TEXT_MESSAGE_CONTENT",threadId:b,runId:p,delta:i.delta||""};if(i.type==="thinking.delta")return{type:"THINKING_MESSAGE_CONTENT",threadId:b,runId:p,delta:i.delta||""};if(i.type==="tool.start")return{type:"TOOL_CALL_START",threadId:b,runId:p,toolCallId:i.toolCallId,payload:hi(i)};if(i.type==="tool.delta")return{type:"TOOL_CALL_ARGS",threadId:b,runId:p,toolCallId:i.toolCallId,delta:i.delta||""};if(i.type==="tool.end")return{type:"TOOL_CALL_END",threadId:b,runId:p,toolCallId:i.toolCallId,payload:hi(i)};return{type:i.type.toUpperCase().replaceAll(".","_"),threadId:b,runId:p,payload:i}}function hi(i){return{name:i.toolName||"tool",args:i.args||{},result:i.result||"",isError:i.isError===!0}}var G="pi-web-chat.sessions.v1";var Oi="plugin.pi-web-sidebar.selectedSession",Ei="plugin.pi-web-sidebar.event",_i="plugin.pi-web-sidebar.activeSessionId",v="plugin.pi-web-sidebar.activeWorkspaceId";var fi=20,Z=200,Wi=8,ki=1e6;var Si=250,M=new Set,Ii={"book-open":'<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',"file-plus":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="M9 15h6"/>',pencil:'<path d="M21.2 6.8 17.2 2.8a2 2 0 0 0-2.8 0L3 14.2V21h6.8L21.2 9.6a2 2 0 0 0 0-2.8z"/><path d="m14 5 5 5"/>',terminal:'<path d="m4 17 6-6-6-6"/><path d="M12 19h8"/>',cpu:'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 15h3"/><path d="M1 9h3"/><path d="M1 15h3"/>',globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 0 20"/><path d="M12 2a15.3 15.3 0 0 0 0 20"/>',search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',braces:'<path d="M8 3H7a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-4a2 2 0 0 1 2-2 2 2 0 0 1-2-2V7a2 2 0 0 0-2-2h-1"/>',"file-text":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',"circle-question-mark":'<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 1 1 5.8 1c-.5 1-1.4 1.5-2.1 2-.6.4-.8.8-.8 2"/><path d="M12 17h.01"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',plug:'<path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a6 6 0 0 1-12 0V8Z"/>',"git-branch":'<line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',"circle-check":'<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',hammer:'<path d="m15 12-8.5 8.5a2.1 2.1 0 0 1-3-3L12 9"/><path d="m17.6 5.4 1.8-1.8"/><path d="m14 7 3 3"/><path d="M5 11 2 8l6-6 3 3"/>',package:'<path d="m7.5 4.3 9 5.2"/><path d="M21 8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>'},k=new WeakMap,di={read:"book-open",write:"file-plus",edit:"pencil",ctx_execute:"cpu",ctx_batch_execute:"cpu",ctx_execute_file:"cpu",ctx_search:"cpu",ctx_index:"cpu",ctx_fetch_and_index:"cpu",web_search:"globe",fetch_content:"search",get_search_content:"search",code_search:"braces",document_parse:"file-text",ask_user_question:"circle-question-mark",teams:"users",subagent:"users",mcp:"plug",git:"git-branch"};class yi{#i=[];add(i){if(i)this.#i.push(i);return i}listen(i,b,p){i.addEventListener(b,p),this.add({remove:()=>i.removeEventListener(b,p)})}dispose(){for(let i of this.#i.splice(0).reverse())if(typeof i==="function")i();else if("unsubscribe"in i)i.unsubscribe();else i.remove()}}function mi(i={}){let b=i.app;if(b?.piWebChat?.dispose(),typeof i.mount?.chat!=="function"||typeof i.mount?.composer!=="function")throw Error("pi-web-chat requires modern pi-web mount.chat and mount.composer APIs");return ni(i,b)}function ni(i,b){let p=new yi,h=p.add(pi()),f=o(),w=t(),l=i.mount?.chat(f,{replace:!0}),r=i.mount?.composer(w,{replace:!0});if(Ap(p,f),l)p.add(l);if(r)p.add(r);let L=Y(i);F(i,L||void 0);let c=!L?.sessionId&&!Yp(),T=Xp(L?.sessionId||""),C={backendChatToken:0};if(c)$p(f);else A(f,Q(T).messages,T.activeSessionId),d(i,f,T,C,L?.sessionId||T.activeSessionId);_p(p,i,f,T,C),ai(p,i,w,f,T,C);let E=b?p.add(e(b)):void 0;b?.classList.add(x());let N=()=>{if(C.runEventsAbort?.abort(),C.sessionEventsAbort?.abort(),p.dispose(),M.clear(),E?.remove(),h.remove(),b?.classList.remove(x()),b?.piWebChat===_)delete b.piWebChat},_={dispose:N};if(b)b.piWebChat=_;return N}function ai(i,b,p,h,f,w){let l=p.querySelector(".prompt-textarea"),r=p.querySelector(".send-btn"),L=p.querySelector(".attach-btn"),c=p.querySelector("[data-file-input]"),T=p.querySelector(".attach-chips");if(!l||!r)return;let C=[],E=()=>{let O=l.value;r.setAttribute("aria-disabled",O.trim()?"false":"true")},N=()=>{if(!T)return;s(T,C.map((O)=>{return O.name||"attachment"}))},_=async(O)=>{O?.preventDefault(),O?.stopImmediatePropagation();let H=l.value.trim();if(E(),!H)return;let a=[...C];r.disabled=!0;try{if(fp(H,a),await si(b,h,f,w,H,a),C=[],N(),l.value.trim()===H)l.value="";if(c)c.value=""}catch(vi){A(h,[oi(vi)],f.activeSessionId)}finally{r.disabled=!1,E()}};if(i.listen(l,"input",E),i.listen(l,"keydown",(O)=>{let H=O;if(H.key==="Enter"&&(H.metaKey||H.ctrlKey))_(H)}),i.listen(r,"click",(O)=>{_(O)}),L&&c)i.listen(L,"click",()=>c.click()),i.listen(c,"change",()=>{ti(c,(O)=>{C=O,N()})})}function oi(i){return{id:u(),role:"system",text:`prompt failed: ${ji(i)}`,createdAt:Date.now()}}async function ti(i,b){let p=Array.from(i.files||[]).slice(0,Wi),h=[];for(let f of p){if(f.size>ki)continue;h.push({name:f.name,size:f.size,content:await f.text(),mimeType:f.type||void 0})}b(h)}function ap(i){return{input$:i.behaviorSubject("chat.input",""),submitted$:i.subject("chat.input.submitted"),activeSessionId$:i.behaviorSubject("session.activeId",null),sidebarSelectedSession$:i.behaviorSubject(Oi,ei()),toastRequested$:i.subject("toast.requested")}}function op(i){let b=[],p=new Set,h=/(^|[\s`])@([^\s@`]+)/g,f=h.exec(String(i||""));while(f!==null){let w=f[2]||"";if((f[1]||"")!=="`"&&w&&!p.has(w))p.add(w),b.push(w);f=h.exec(String(i||""))}return b}function tp(i=[],b=[]){let p=[],h=new Set;for(let f of[...i,...b]){let w=bi(f);if(!w||h.has(w))continue;h.add(w),p.push(f)}return p}function X(i){return i.app?.piWebSidebar?.getSnapshot?.().activeWorkspaceId||i.app?.dataset.activeWorkspaceId||""}function ei(){return Y({})}function Y(i){let b=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),p=b?.activeSessionId||"",h=b?.activeWorkspaceId||"";if(p)return{sessionId:p,workspaceId:h||void 0};let f=j(_i),w=j(v);return f?{sessionId:f,workspaceId:w||void 0}:null}function F(i,b){if(b?.workspaceId&&i.app)i.app.dataset.activeWorkspaceId=b.workspaceId,wi(v,b.workspaceId);if(b?.sessionId)i.app?.setAttribute("data-active-session-id",b.sessionId),wi(_i,b.sessionId)}function V(i,b,p={}){let h=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),f={type:b,detail:p,snapshot:h};(i.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$)?.next(f),globalThis.piWeb?.subject(Ei).next(f)}function S(i,b,p){let h=i.app?.dataset.activeWorkspaceId||X(i),f={reason:p,sessionId:b,workspaceId:h};globalThis.piWeb?.behaviorSubject("session.activeId",b).next(b),globalThis.piWeb?.subject("session.changed").next({sessionId:b,workspaceId:h,reason:p}),V(i,"active.start",f),V(i,"session.created",f)}function wi(i,b){try{localStorage.setItem(i,b)}catch{}}async function I(i,b,p={},h=X(i)){if(!i.backend)return{};let f=await i.backend(b,{workspaceId:h,data:p});return U(f)?f:{}}async function si(i,b,p,h,f,w){let l=yp(i,p),r=R(i);h.backendChatToken+=1,h.runEventsAbort?.abort();let L=new AbortController;h.runEventsAbort=L,h.sessionEventsAbort?.abort();let c={id:u(),role:"user",text:f,attachments:qi(w),createdAt:Date.now()},T=z(p,l);T.messages.push(c),T.updatedAt=Date.now(),$(p),A(b,T.messages,l);let C=await wp(i,f,w,l,r.path,r.id);if(typeof C.activeSessionId==="string"&&C.activeSessionId){let _=l,O=p.activeSessionId===_;if(l=C.activeSessionId,O)D(p,l),F(i,{sessionId:C.activeSessionId,workspaceId:r.id||void 0}),V(i,"chat-session",{reason:"startPrompt",sessionId:C.activeSessionId}),S(i,C.activeSessionId,"startPrompt");else z(p,l);vp(p,_,l,c.id)}if(typeof C.runId!=="string"||!C.runId){let _=await rp(i,f,w,l,r.path,r.id),O=Ep(i,p,_,"submitPrompt",l);if(p.activeSessionId===l)A(b,O,l);if(h.runEventsAbort===L)h.runEventsAbort=void 0;return}let E=z(p,l),N=Lp(E);try{await ip(i,p,E,C.runId,r.path,r.id,N,()=>{if(p.activeSessionId===l)A(b,E.messages,l)},L.signal)}finally{if(h.runEventsAbort===L)h.runEventsAbort=void 0}if(p.activeSessionId===l)d(i,b,p,h,l,r.path,r.id)}async function ip(i,b,p,h,f,w,l,r,L){let c=await Ri(i,"streamEventsSse",{runId:h,cursor:0,workspacePath:f},L,w);if(!c)throw Error("SSE streaming backend did not return a stream");let T=Hi(r);l.streaming=!0,T.flush();try{await $i(c,(C)=>{cp(l,[C]),l.streaming=C.type!=="run.end",p.updatedAt=Date.now(),$(b),T.request()})}finally{l.streaming=!1,$(b),T.flush()}}function Hi(i){let b=0,p,h=()=>{if(p)clearTimeout(p),p=void 0},f=()=>{h(),b=Date.now(),i()};return{request:()=>{let l=Si-(Date.now()-b);if(l<=0){f();return}p||=setTimeout(f,l)},flush:f,cancel:h}}async function Ri(i,b,p={},h,f=X(i)){if(!i.backendStream)throw Error("SSE streaming backend is unavailable");let w=await i.backendStream(b,{workspaceId:f,data:p},{signal:h});return pp(w)}function pp(i){if(typeof ReadableStream<"u"&&i instanceof ReadableStream)return i;if(typeof Response<"u"&&i instanceof Response)return i.body;if(typeof i==="string")return li(i);if(!U(i))return null;let b=i.body;if(typeof ReadableStream<"u"&&b instanceof ReadableStream)return b;let p=i.sse;if(typeof p==="string")return li(p);return null}function li(i){let b=new TextEncoder().encode(i);return new ReadableStream({start(p){p.enqueue(b),p.close()}})}async function $i(i,b){let p=i.getReader(),h=new TextDecoder,f="";while(!0){let w=await p.read();if(w.done){f+=h.decode(),hp(f,b);return}f+=h.decode(w.value,{stream:!0});let l=bp(f);f=l.remainder;for(let r of l.frames)Ai(r,b)}}function bp(i){let p=i.replaceAll(`\r
`,`
`).replaceAll("\r",`
`).split(`

`),h=p.pop()||"";return{frames:p,remainder:h}}function hp(i,b){let p=i.trim();if(p)Ai(p,b)}function Ai(i,b){let p=i.split(`
`).filter((h)=>h.startsWith("data:")).map((h)=>h.slice(5).trimStart()).join(`
`);if(!p)return;try{let h=JSON.parse(p);if(Tp(h))b(h)}catch{}}function fp(i,b){globalThis.piWeb?.subject("chat.input.submitted").next({text:i,attachments:qi(b)||[]})}async function wp(i,b,p,h,f=R(i).path,w=R(i).id){try{return await I(i,"startPrompt",Ni(b,p,h,f),w)}catch(l){if(lp(l))return{};throw l}}function lp(i){return/unknown method: (startPrompt|streamEventsSse)|unsupported method: (startPrompt|streamEventsSse)|(startPrompt|streamEventsSse) unsupported/i.test(ji(i))}async function rp(i,b,p,h="",f=R(i).path,w=R(i).id){return await I(i,"submitPrompt",Ni(b,p,h,f),w)}function Ni(i,b,p,h){let f={text:i,attachments:b,sessionId:p};if(h)f.workspacePath=h;return f}function Lp(i){let b=[...i.messages].reverse().find((h)=>h.role==="assistant"&&h.streaming);if(b)return b;let p={id:u(),role:"assistant",text:"",createdAt:Date.now(),streaming:!0};return i.messages.push(p),p}function cp(i,b){for(let p of b)if(p.type==="text.delta"&&typeof p.delta==="string")i.text+=p.delta;else if(p.type==="thinking.delta"&&typeof p.delta==="string")i.thinking=`${i.thinking||""}${p.delta}`;else if(p.type==="tool.start")P(i,p,"running");else if(p.type==="tool.delta"&&typeof p.delta==="string"){let h=P(i,p,"running");h.text=p.delta}else if(p.type==="tool.end"){let h=P(i,p,p.isError?"err":"ok");if(typeof p.result==="string"&&p.result)h.text=p.result}else if(p.type==="error"&&typeof p.message==="string")i.text+=`${i.text?`
`:""}${p.message}`}function P(i,b,p){let h=b.toolCallId||b.toolName||"tool";i.toolCalls||=[];let f=i.toolCalls.find((w)=>w.id===h);if(!f)f={id:h,name:b.toolName||"tool",args:b.args,text:"",status:p},i.toolCalls.push(f);if(f.status=p,b.args)f.args=b.args;return f}function Tp(i){return U(i)&&typeof i.type==="string"}async function d(i,b,p,h,f="",w=m(i),l=R(i).id){if(!i.backendStream){await ri(i,b,p,h,f,w);return}let r=++h.backendChatToken;h.sessionEventsAbort?.abort();let L=new AbortController;h.sessionEventsAbort=L;let c=Hi(()=>{A(b,Q(p).messages,p.activeSessionId)});try{let T=await Ri(i,"sessionEventsSse",zi(i,f,w),L.signal,l);if(!T)throw Error("session SSE backend did not return a stream");await $i(T,(C)=>{if(r!==h.backendChatToken||C.type!=="chat.state")return;if(Mi(i,p,Cp(C),"chatState").length)c.request()})}catch(T){if(!L.signal.aborted)await ri(i,b,p,h,f,w)}finally{if(c.cancel(),h.sessionEventsAbort===L)h.sessionEventsAbort=void 0}}async function ri(i,b,p,h,f="",w=m(i)){let l=++h.backendChatToken;try{let r=await I(i,"chatState",zi(i,f,w));if(l!==h.backendChatToken)return;let L=Mi(i,p,r,"chatState");if(L.length)A(b,L,p.activeSessionId)}catch{}}function zi(i,b,p=m(i)){let h=b?{sessionId:b}:{};if(p)h.workspacePath=p;return h}function Cp(i){return{activeSessionId:i.activeSessionId,messages:i.messages,isStreaming:i.isStreaming}}function m(i){return R(i).path}function R(i){let b=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),p=b?.activeWorkspaceId||i.app?.dataset.activeWorkspaceId||"",h=b?.workspaces?.find((f)=>f.id===p)?.path||"";return{id:p,path:h}}function Op(i,b){let p=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),h=b.workspaceId||p?.activeWorkspaceId||i.app?.dataset.activeWorkspaceId||"",f=p?.workspaces?.find((w)=>w.id===h)?.path||"";if(f||h!==p?.activeWorkspaceId)return{id:h,path:f};return R(i)}function Mi(i,b,p,h){let f=n(p.messages);if(typeof p.activeSessionId==="string"&&p.activeSessionId){let r=b.activeSessionId;if(D(b,p.activeSessionId),F(i,{sessionId:p.activeSessionId,workspaceId:i.app?.dataset.activeWorkspaceId||X(i)||void 0}),h!=="chatState"||r!==p.activeSessionId)V(i,"chat-session",{reason:h,sessionId:p.activeSessionId});if(h!=="chatState")S(i,p.activeSessionId,h)}let w=Q(b);if(!f.length)return[];let l=Gi(w.messages,f).slice(-Z);if(!Fi(w.messages,l))return[];if(w.messages=l,w.title==="New chat"){let r=w.messages.find((L)=>L.role==="user");if(r)w.title=r.text.slice(0,48)||w.title}return w.updatedAt=Date.now(),$(b),w.messages}function Fi(i,b){if(i.length!==b.length)return!0;return i.some((p,h)=>Li(p)!==Li(b[h]))}function Li(i){return JSON.stringify({id:i.id,role:i.role,text:i.text,thinking:i.thinking,streaming:i.streaming,toolCalls:i.toolCalls,attachments:i.attachments})}function Ep(i,b,p,h,f){let w=n(p.messages),l=typeof p.activeSessionId==="string"&&p.activeSessionId?p.activeSessionId:f,r=b.activeSessionId===f;if(l!==f)if(r)D(b,l),F(i,{sessionId:l,workspaceId:R(i).id||void 0}),V(i,"chat-session",{reason:h,sessionId:l}),S(i,l,h);else z(b,l);let L=z(b,l);if(!w.length)return[];let c=Gi(L.messages,w).slice(-Z);if(!Fi(L.messages,c))return[];return L.messages=c,L.updatedAt=Date.now(),$(b),L.messages}function _p(i,b,p,h,f){let w=(c)=>{if(!c?.sessionId)return;if(Ui(b,h,c))return;F(b,c),D(h,c.sessionId),A(p,Q(h).messages,h.activeSessionId);let T=Op(b,c);d(b,p,h,f,c.sessionId,T.path,T.id)},l=(c)=>{let T=Hp(b,c);if(T)w(T)},r=b.app?.piWebSidebar?.channels?.selectedSession$||globalThis.piWebSidebar?.channels?.selectedSession$,L=b.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$;if(r)i.add(r.subscribe(w));if(L)i.add(L.subscribe(l));if(b.app)i.listen(b.app,"pi-web-sidebar:session-created",(c)=>{let T=c.detail||{},C=typeof T.sessionId==="string"?T.sessionId:"",E=typeof T.workspaceId==="string"?T.workspaceId:"";if(C)w({sessionId:C,workspaceId:E||void 0})});if(globalThis.piWeb)i.add(globalThis.piWeb.behaviorSubject(Oi,Y(b)).subscribe(w)),i.add(globalThis.piWeb.subject(Ei).subscribe(l)),i.add(globalThis.piWeb.behaviorSubject("session.activeId",null).subscribe((c)=>{if(!c)return;w({sessionId:c,workspaceId:b.app?.dataset.activeWorkspaceId||j(v)||void 0})}))}function yp(i,b){let p=Y(i);if(p?.sessionId&&!Ui(i,b,p))F(i,p),D(b,p.sessionId);return b.activeSessionId}function Ui(i,b,p){let h=p.workspaceId||"",f=i.app?.dataset.activeWorkspaceId||j(v)||"";return b.activeSessionId===p.sessionId&&(!h||h===f)}function Hp(i,b){if(!Rp(b.type))return null;let p=b.detail||{},h=typeof p.sessionId==="string"?p.sessionId:b.snapshot?.activeSessionId||"",f=typeof p.workspaceId==="string"?p.workspaceId:b.snapshot?.activeWorkspaceId||i.app?.dataset.activeWorkspaceId||"";if(!h)return null;return{sessionId:h,workspaceId:f||void 0}}function Rp(i){return i==="session.selected"||i==="session.created"||i==="new-session"||i==="active.start"}function D(i,b){let p=i.sessions.find((h)=>h.id===b);if(!p)p=J(b),i.sessions.unshift(p);return i.activeSessionId=p.id,$(i),p}function A(i,b,p){Fp(b,p),(i.querySelector(".term-inner")||i).replaceChildren(...b.map((f)=>Np(f,p))),gi(i)}function $p(i){let b=i.querySelector(".term-inner")||i,p=document.createElement("article");p.className="pi-web-chat-docs",p.setAttribute("aria-label","pi-web-chat guide");let h=document.createElement("h1");h.textContent="pi-web-chat guide";let f=document.createElement("p");f.textContent=["Select or create a session in the sidebar to load chat history,","or type below to start a new session."].join(" ");let w=document.createElement("ul");for(let l of["Ask pi in the prompt box and press Cmd/Ctrl+Enter to send.","Use / for slash commands, @ for file references, and ! for shell commands.","Chats are cached locally after you start or select a session."]){let r=document.createElement("li");r.textContent=l,w.append(r)}p.append(h,f,w),b.replaceChildren(p),gi(i)}function Ap(i,b){let p=b.querySelector(".term"),h=b.querySelector("[data-action='scroll-bottom']");if(!p||!h)return;let f={term:p,button:h,pinned:!0,touchStartY:null};k.set(b,f),h.hidden=!1,q(f),i.listen(h,"click",()=>{f.pinned=!0,Bi(f),q(f)}),i.listen(p,"wheel",(w)=>{if(w.deltaY<0)ci(f)}),i.listen(p,"touchstart",(w)=>{let l=w;f.touchStartY=l.touches.item(0)?.clientY??null}),i.listen(p,"touchmove",(w)=>{let r=w.touches.item(0)?.clientY;if(typeof r==="number"&&f.touchStartY!==null&&r-f.touchStartY>8)ci(f)}),i.listen(p,"touchend",()=>{f.touchStartY=null}),i.add({remove:()=>{k.delete(b)}})}function gi(i){let b=k.get(i);if(!b)return;if(b.pinned)Bi(b);q(b)}function Bi(i){i.term.scrollTop=i.term.scrollHeight}function ci(i){i.pinned=!1,q(i)}function q(i){i.button.dataset.pinned=i.pinned?"true":"false",i.button.setAttribute("aria-pressed",i.pinned?"true":"false")}function Np(i,b){let p=document.createElement("article");p.className="transcript-item",p.dataset.messageId=i.id;let h=document.createElement("div");h.className="msg",h.dataset.kind=W(i.role);let f=document.createElement("span");f.className=`prefix ${W(i.role)}`,f.textContent=jp(i.role);let w=document.createElement("pre");if(w.className=`body ${W(i.role)}`,w.textContent=i.text,h.append(f,w),zp(i))p.append(h);if(i.thinking)p.append(Mp(i.thinking,Boolean(i.streaming)));for(let l of i.toolCalls||[])p.append(Up(l,Zi(b,i,l)));if(i.streaming)p.dataset.streaming="true";return p}function zp(i){let b=i.text.trim().length>0;return i.role!=="assistant"||b}function Mp(i,b){let p=document.createElement("details");p.className="msg-detail think thinking-block",p.open=b;let h=document.createElement("summary");h.className="label",h.textContent="THINKING";let f=document.createElement("pre");return f.className="body",f.textContent=i,p.append(h,f),p}function Fp(i,b){let p=new Set;for(let h of i)for(let f of h.toolCalls||[])p.add(Zi(b,h,f));for(let h of M)if(!p.has(h))M.delete(h)}function Zi(i,b,p){return`${i}:${b.id}:${p.id}`}function Up(i,b){let p=document.createElement("div");p.className="tool-card",p.dataset.tool=i.name||"tool",p.dataset.status=i.status;let h=!M.has(b);p.dataset.collapsed=h?"true":"false";let f=document.createElement("button");if(f.type="button",f.className="tc-head",f.title=h?"Show tool output":"Hide tool output",f.setAttribute("aria-expanded",h?"false":"true"),f.setAttribute("aria-label",`${h?"Show":"Hide"} ${i.name||"tool"} output`),f.append(Bp(i),Zp(i),Vp(i),Dp(i,h)),!h)p.append(Vi(i));return f.addEventListener("click",()=>gp(p,f,i,b)),p.prepend(f),p}function Vi(i){let b=document.createElement("pre");return b.className="tc-body",b.textContent=i.text||JSON.stringify(i.args||{},null,2),b}function gp(i,b,p,h){let f=i.querySelector(".tc-body"),w=f!==null;if(f)f.remove(),M.delete(h);else i.append(Vi(p)),M.add(h);i.dataset.collapsed=w?"true":"false",b.setAttribute("aria-expanded",w?"false":"true"),b.setAttribute("aria-label",`${w?"Show":"Hide"} ${i.dataset.tool||"tool"} output`),b.title=w?"Show tool output":"Hide tool output";let l=b.querySelector(".tc-toggle-label");if(l)l.textContent=w?"show":"hide"}function Bp(i){let b=document.createElement("span");b.className="tc-glyph";let p=Gp(i),h=p?Ii[p]:"";if(!p||!h)return b.textContent="●",b;return b.innerHTML=`<svg class="tc-icon" data-tool-icon="${p}" aria-hidden="true" viewBox="0 0 24 24">${h}</svg>`,b}function Zp(i){let b=document.createElement("span");return b.className="tc-name",b.textContent=i.name||"tool",b}function Vp(i){let b=document.createElement("span");return b.className="tc-args",b.textContent=Di(i),b}function Dp(i,b){let p=document.createElement("span");if(p.className="tc-meta",i.status==="running"){let w=document.createElement("span");w.className="spinner",w.textContent="⠇";let l=document.createElement("span");return l.className="running",l.textContent="running",p.append(w,l,Ti(b)),p}let h=document.createElement("span");h.className=i.status==="err"?"err":"ok",h.textContent=i.status==="err"?"✗":"✓";let f=document.createElement("span");return f.textContent=i.status==="err"?" · failed":" · done",p.append(h,f,Ti(b)),p}function Ti(i){let b=document.createElement("span");b.className="tc-toggle";let p=document.createElement("span");p.className="tc-toggle-label",p.textContent=i?"show":"hide";let h=document.createElement("span");return h.className="tc-caret",h.textContent="▸",b.append(p,h),b}function Di(i){if(!i.args)return"";return JSON.stringify(i.args)}function Gp(i){let b=qp(i.name);if(["bash","shell","sh","zsh","terminal"].includes(b))return Jp(Di(i).toLowerCase())||"terminal";return di[b]}function qp(i){return i.trim().replace(/^functions\./,"").replace(/^multi_tool_use\./,"")}function Jp(i){if(/\bgit\b|\bgh\b/.test(i))return"git-branch";if(/\b(go test|bun test|npm test|pnpm test|yarn test|vitest|pytest|cargo test)\b/.test(i))return"circle-check";if(/\b(bun|npm|pnpm|yarn)\s+(run\s+)?build\b|\b(go build|cargo build)\b/.test(i))return"hammer";if(/\b(bun|npm|pnpm|yarn)\s+(add|install|i)\b|\bpip\s+install\b|\bgo\s+get\b/.test(i))return"package";return}function jp(i){if(i==="assistant")return"pi >";if(i==="user")return"you >";if(i==="system")return"sys >";return"tool >"}function W(i){if(i==="assistant")return"pi";if(i==="system")return"sys";return i}function Gi(i,b){let p=new Map;for(let h of i)p.set(h.id,h);for(let h of b)p.set(h.id,{...p.get(h.id),...h});return[...p.values()].sort((h,f)=>h.createdAt-f.createdAt)}function Q(i){return z(i,i.activeSessionId,!0)}function z(i,b,p=!1){let h=i.sessions.find((f)=>f.id===b);if(!h)h=J(b||void 0),i.sessions.unshift(h),$(i);if(p||!i.activeSessionId)i.activeSessionId=h.id,$(i);return h}function vp(i,b,p,h){if(b===p)return;let f=i.sessions.find((L)=>L.id===b),w=f?.messages.findIndex((L)=>L.id===h)??-1;if(!f||w<0)return;let[l]=f.messages.splice(w,1),r=z(i,p);if(!r.messages.some((L)=>L.id===l.id))r.messages.push(l);f.updatedAt=Date.now(),r.updatedAt=Date.now(),$(i)}function J(i=u()){let b=Date.now();return{id:i,title:"New chat",createdAt:b,updatedAt:b,messages:[]}}function j(i){try{return localStorage.getItem(i)||""}catch{return""}}function Xp(i=""){try{let p=JSON.parse(localStorage.getItem(G)||"null");if(p&&typeof p.activeSessionId==="string"&&Array.isArray(p.sessions)){let h=p.sessions.filter(Ji).map(Qp);if(i&&!h.some((f)=>f.id===i))h.unshift(J(i));return{activeSessionId:i||p.activeSessionId,sessions:h}}}catch{}let b=J(i||void 0);return{activeSessionId:b.id,sessions:[b]}}function Yp(){try{let i=JSON.parse(localStorage.getItem(G)||"null");return Boolean(i&&Array.isArray(i.sessions)&&i.sessions.some(Ji))}catch{return!1}}function $(i){Ci(i);try{localStorage.setItem(G,JSON.stringify(i))}catch{for(let b of i.sessions)b.messages=b.messages.slice(-Math.floor(Z/2));Ci(i);try{localStorage.setItem(G,JSON.stringify(i))}catch{}}}function qi(i){if(!i?.length)return;return i.map(({content:b,...p})=>p)}function Ci(i){i.sessions.sort((h,f)=>f.updatedAt-h.updatedAt);let b=i.sessions.find((h)=>h.id===i.activeSessionId),p=i.sessions.filter((h)=>h.id!==i.activeSessionId).slice(0,Math.max(0,fi-1));i.sessions=b?[b,...p]:i.sessions.slice(0,fi);for(let h of i.sessions)if(h.messages.length>Z)h.messages.splice(0,h.messages.length-Z)}function Ji(i){return U(i)&&typeof i.id==="string"&&Array.isArray(i.messages)}function Qp(i){return{...i,messages:n(i.messages)}}function n(i){return Array.isArray(i)?i.filter(Pp).map(up):[]}function up(i){if(!Array.isArray(i.toolCalls)){let{toolCalls:b,...p}=i;return p}return{...i,toolCalls:i.toolCalls.filter(Kp)}}function Kp(i){if(!U(i)||typeof i.id!=="string"||typeof i.name!=="string")return!1;return typeof i.text==="string"&&xp(i.status)}function xp(i){return i==="running"||i==="ok"||i==="err"}function Pp(i){if(!U(i)||typeof i.id!=="string"||typeof i.text!=="string")return!1;return typeof i.createdAt==="number"&&Wp(i.role)}function Wp(i){return i==="user"||i==="assistant"||i==="tool"||i==="system"}function U(i){return typeof i==="object"&&i!==null}function u(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`}function ji(i){return i instanceof Error?i.message:String(i)}export{Yi as renderMessages,Ki as promptFromAgUiLikeRunInput,ii as pluginStyleText,x as pluginClass,tp as mergeCommands,X as getActiveWorkspaceId,op as extractRefs,mi as default,t as createComposerSurface,o as createChatSurface,Xi as createChatDom,ap as createChannels,ui as createAgUiLikeRunInput,bi as commandName,xi as chatEventsToAgUiLikeEvents,I as backendCall};
