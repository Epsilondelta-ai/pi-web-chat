var B={attachFile:["M16.5 6v11.5a4 4 0 0 1-8 0V5a2.5 2.5 0 0 1 5 0v10.5a1 1 0 0 1-2 0V6H10v9.5","a2.5 2.5 0 0 0 5 0V5a4 4 0 0 0-8 0v12.5a5.5 5.5 0 0 0 11 0V6h-1.5Z"].join(""),stop:"M6 6h12v12H6V6Z",send:"M2 21 23 12 2 3v7l15 2-15 2v7Z",terminal:"M3 4h18v16H3V4Zm2 2v12h14V6H5Zm2 3 1.1-1.1L12.2 12l-4.1 4.1L7 15l3-3-3-3Zm6 6h5v1.5h-5V15Z",file:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 2.5L17.5 8H14V4.5ZM8 13h8v1.5H8V13Zm0 3h8v1.5H8V16Z"},m={attachFile:Y("attach_file",B.attachFile),stop:Y("stop",B.stop),send:Y("send",B.send)};function Y(i,b){return`<svg class="material-icon" data-material-icon="${i}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="${b}"></path></svg>`}function n(){return"pi-web-chat-mounted"}function Oi(){let i=document.createElement("main");return i.className="main pi-web-chat-surface",i.dataset.main="session",i.innerHTML='<div class="term"><div class="term-inner" role="log" aria-live="polite" aria-relevant="additions text"></div></div><button type="button" class="scroll-bottom-btn" data-action="scroll-bottom" aria-label="stick to bottom" title="stick to bottom" aria-pressed="true" hidden>↓</button>',i}function gi(){let i=document.createElement("section");return i.className="prompt-region pi-web-chat-composer",i.innerHTML=`
    <div class="slash-pop" hidden><div class="slash-head">slash commands · type to filter</div><div class="slash-list"></div></div>
    <div class="prompt-file-ref-pop" hidden><div class="slash-head">project files · type to filter</div><div class="prompt-file-ref-list"></div></div>
    <div class="prompt-bar">
      <button class="attach-btn" type="button" aria-label="attach files" title="attach files">${m.attachFile}</button>
      <input type="file" multiple hidden data-file-input />
      <div class="prompt-input-col"><div class="attach-chips" hidden></div><textarea class="prompt-textarea" aria-label="Prompt" placeholder="ask pi to do something…" rows="1"></textarea></div>
      <div class="prompt-actions">
        <button class="stop-btn" type="button" aria-label="stop" title="stop" hidden>${m.stop}</button>
        <button class="mic-btn" type="button" data-action="toggle-speech-input" aria-label="start voice input" title="voice input" hidden>\uD83C\uDF99</button>
        <button class="send-btn" type="button" aria-label="send" title="send" aria-disabled="true">${m.send}</button>
      </div>
      <div class="drop-overlay" hidden><span>drop to attach</span></div>
    </div>
    <div class="prompt-meta" data-prompt-meta>— | <span class="prompt-meta-item prompt-meta-branch"><span>—</span></span></div>`,i}function Ci(i){let b=document.createElement("span");return b.className="prompt-meta-item pi-web-chat-badge",b.textContent="chat plugin",i.querySelector("[data-prompt-meta]")?.append(b),b}function ei(){let i=document.createElement("section");return i.className="pi-web-chat-root",i.dataset.plugin="pi-web-chat",i.innerHTML=`
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
        <button class="pi-web-chat-icon-btn" type="button" data-attach aria-label="attach files" title="attach files">${Y("attach_file",B.attachFile)}</button>
        <input type="file" multiple hidden data-file-input />
        <textarea class="pi-web-chat-textarea" data-chat-input aria-label="Prompt" placeholder="ask pi to do something…" rows="1"></textarea>
        <button class="pi-web-chat-send" type="button" data-send aria-label="send" title="send" aria-disabled="true">${Y("send",B.send)}</button>
      </div>
    </section>`,{root:i,transcript:y(i.querySelector("[data-chat-transcript]")),textarea:y(i.querySelector("[data-chat-input]")),sendButton:y(i.querySelector("[data-send]")),attachButton:y(i.querySelector("[data-attach]")),fileInput:y(i.querySelector("[data-file-input]")),slashPopover:y(i.querySelector("[data-slash-popover]")),slashList:y(i.querySelector("[data-slash-list]")),refsPopover:y(i.querySelector("[data-refs-popover]")),refsList:y(i.querySelector("[data-refs-list]")),attachments:y(i.querySelector("[data-attachments]"))}}function ip(i,b){i.replaceChildren(...b.map(pp)),i.scrollTop=i.scrollHeight}function pp(i){let b=document.createElement("article");b.className=`pi-web-chat-message pi-web-chat-message-${i.role}`,b.dataset.messageId=i.id;let p=document.createElement("div");p.className="pi-web-chat-message-role",p.textContent=i.role;let h=document.createElement("pre");if(h.className="pi-web-chat-message-body",h.textContent=i.text,b.append(p,h),i.thinking){let f=document.createElement("details");f.className="pi-web-chat-thinking",f.open=Boolean(i.streaming);let w=document.createElement("summary");w.textContent="thinking";let r=document.createElement("pre");r.textContent=i.thinking,f.append(w,r),b.append(f)}if(i.toolCalls?.length){let f=document.createElement("div");f.className="pi-web-chat-tools";for(let w of i.toolCalls){let r=document.createElement("details");r.className=`pi-web-chat-tool pi-web-chat-tool-${w.status}`,r.open=w.status==="running";let l=document.createElement("summary");l.textContent=`${w.name} · ${w.status}`;let c=document.createElement("pre");c.textContent=w.text||bp(w),r.append(l,c),f.append(r)}b.append(f)}if(i.streaming){let f=document.createElement("div");f.className="pi-web-chat-message-meta",f.textContent="streaming...",b.append(f)}if(i.attachments?.length){let f=document.createElement("div");f.className="pi-web-chat-message-meta",f.textContent=`${i.attachments.length} attachment(s)`,b.append(f)}return b}function bp(i){if(i.argsStatus==="truncated")return"arguments truncated: too large to display";if(i.argsStatus==="omitted")return"arguments omitted: response too large";if(i.argsStatus==="unavailable")return"arguments unavailable";if(i.argsStatus==="empty")return"no arguments";if(!i.args)return"arguments unavailable";return JSON.stringify(i.args,null,2)}function o(i,b){i.hidden=b.length===0,i.replaceChildren(...b.map((p)=>{let h=document.createElement("span");return h.className="pi-web-chat-attachment-chip",h.textContent=p,h}))}function Ei(){return`
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

    .pi-web-chat-composer .prompt-bar.shell-mode .prompt-textarea {
      border-color: var(--warning, #facc15);
      background: rgba(250,204,21,.12);
      box-shadow: 0 0 0 2px rgba(250,204,21,.25);
    }

    .pi-web-chat-composer .prompt-bar.shell-mode .attach-btn {
      opacity: .45;
      cursor: not-allowed;
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
  `}function _i(){document.getElementById("pi-web-chat-style")?.remove();let i=document.createElement("style");return i.id="pi-web-chat-style",i.textContent=Ei(),document.head.append(i),i}function v(i){return i.command||i.cmd||(i.name?`/${i.name}`:"")}function y(i){if(!i)throw Error("pi-web-chat DOM template is invalid");return i}function hp(i,b,p){return{threadId:i,runId:b,state:{},messages:p,tools:[],context:[]}}function fp(i){let b=[...i.messages].reverse().find((p)=>p.role==="user");return{text:b?.text||"",attachments:b?.attachments||[],sessionId:i.threadId}}function wp(i,b,p){return i.map((h)=>rp(h,b,p))}function rp(i,b,p){if(i.type==="text.delta")return{type:"TEXT_MESSAGE_CONTENT",threadId:b,runId:p,delta:i.delta||""};if(i.type==="thinking.delta")return{type:"THINKING_MESSAGE_CONTENT",threadId:b,runId:p,delta:i.delta||""};if(i.type==="tool.start")return{type:"TOOL_CALL_START",threadId:b,runId:p,toolCallId:i.toolCallId,payload:Hi(i)};if(i.type==="tool.delta")return{type:"TOOL_CALL_ARGS",threadId:b,runId:p,toolCallId:i.toolCallId,delta:i.delta||""};if(i.type==="tool.end")return{type:"TOOL_CALL_END",threadId:b,runId:p,toolCallId:i.toolCallId,payload:Hi(i)};return{type:i.type.toUpperCase().replaceAll(".","_"),threadId:b,runId:p,payload:i}}function Hi(i){return{name:i.toolName||"tool",args:i.args||{},result:i.result||"",isError:i.isError===!0}}var u="pi-web-chat.sessions.v1";var ji="plugin.pi-web-sidebar.selectedSession",Di="plugin.pi-web-sidebar.event",ii="plugin.pi-web-sidebar.activeSessionId",d="plugin.pi-web-sidebar.activeWorkspaceId",cp=12,$i=20,X=200,lp=8,Lp=1e6,Tp=64000;var Op=250,Gi=6,gp=150,V=new Set,Cp={"book-open":'<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',"file-plus":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="M9 15h6"/>',pencil:'<path d="M21.2 6.8 17.2 2.8a2 2 0 0 0-2.8 0L3 14.2V21h6.8L21.2 9.6a2 2 0 0 0 0-2.8z"/><path d="m14 5 5 5"/>',terminal:'<path d="m4 17 6-6-6-6"/><path d="M12 19h8"/>',cpu:'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 15h3"/><path d="M1 9h3"/><path d="M1 15h3"/>',globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 0 20"/><path d="M12 2a15.3 15.3 0 0 0 0 20"/>',search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',braces:'<path d="M8 3H7a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-4a2 2 0 0 1 2-2 2 2 0 0 1-2-2V7a2 2 0 0 0-2-2h-1"/>',"file-text":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',"circle-question-mark":'<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 1 1 5.8 1c-.5 1-1.4 1.5-2.1 2-.6.4-.8.8-.8 2"/><path d="M12 17h.01"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',plug:'<path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a6 6 0 0 1-12 0V8Z"/>',"git-branch":'<line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',"circle-check":'<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',hammer:'<path d="m15 12-8.5 8.5a2.1 2.1 0 0 1-3-3L12 9"/><path d="m17.6 5.4 1.8-1.8"/><path d="m14 7 3 3"/><path d="M5 11 2 8l6-6 3 3"/>',package:'<path d="m7.5 4.3 9 5.2"/><path d="M21 8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>'},e=new WeakMap,Ep={read:"book-open",write:"file-plus",edit:"pencil",ctx_execute:"cpu",ctx_batch_execute:"cpu",ctx_execute_file:"cpu",ctx_search:"cpu",ctx_index:"cpu",ctx_fetch_and_index:"cpu",web_search:"globe",fetch_content:"search",get_search_content:"search",code_search:"braces",document_parse:"file-text",ask_user_question:"circle-question-mark",teams:"users",subagent:"users",mcp:"plug",git:"git-branch"};class Ji{#i=[];add(i){if(i)this.#i.push(i);return i}listen(i,b,p){i.addEventListener(b,p),this.add({remove:()=>i.removeEventListener(b,p)})}dispose(){for(let i of this.#i.splice(0).reverse())if(typeof i==="function")i();else if("unsubscribe"in i)i.unsubscribe();else i.remove()}}function _p(i={}){let b=i.app;if(b?.piWebChat?.dispose(),typeof i.mount?.chat!=="function"||typeof i.mount?.composer!=="function")throw Error("pi-web-chat requires modern pi-web mount.chat and mount.composer APIs");return Hp(i,b)}function Hp(i,b){let p=new Ji,h=p.add(_i()),f=Oi(),w=gi(),r=i.mount?.chat(f,{replace:!0}),l=i.mount?.composer(w,{replace:!0});if(sp(p,f),bb(p,f),r)p.add(r);if(l)p.add(l);let c=Q(i);U(i,c||void 0);let L=!c?.sessionId&&!yb(),T=$b(c?.sessionId||""),O={backendChatToken:0};if(L)hi(f);else R(f,K(T).messages,T.activeSessionId),a(i,f,T,O,c?.sessionId||T.activeSessionId);Sp(p,i,f,T,O),$p(p,i,w,f,T,O);let $=b?p.add(Ci(b)):void 0;b?.classList.add(n());let A=()=>{if(O.runEventsAbort?.abort(),O.sessionEventsAbort?.abort(),p.dispose(),V.clear(),$?.remove(),h.remove(),b?.classList.remove(n()),b?.piWebChat===E)delete b.piWebChat},E={dispose:A};if(b)b.piWebChat=E;return A}function $p(i,b,p,h,f,w){let r=p.querySelector(".prompt-textarea"),l=p.querySelector(".send-btn"),c=p.querySelector(".attach-btn"),L=p.querySelector("[data-file-input]"),T=p.querySelector(".attach-chips");if(!r||!l)return;let O=p.querySelector(".prompt-bar"),$=p.querySelector(".slash-pop"),A=p.querySelector(".prompt-file-ref-pop"),E=[],C=!1,ci=[],G,J=()=>{if(!T)return;if(C){o(T,[]);return}o(T,[...E.map((_)=>_.name||"attachment"),...qi(r.value)])},W=()=>{if(O?.classList.toggle("shell-mode",C),r.setAttribute("placeholder",C?"run shell command in workspace…":"ask pi to do something…"),c)c.disabled=C,c.setAttribute("aria-disabled",C?"true":"false")},q=()=>{let _=r.value;if(l.setAttribute("aria-disabled",_.trim()?"false":"true"),J(),G)clearTimeout(G);if(C){$?.setAttribute("hidden",""),A?.setAttribute("hidden","");return}Up(b,p,r,_,ci,(g)=>{ci=g}),G=setTimeout(()=>{Zp(b,p,r,r.value)},120)},li=()=>{C=!0,$?.setAttribute("hidden",""),A?.setAttribute("hidden",""),W(),J()},Li=()=>{C=!1,W(),J()},Ti=async(_)=>{_?.preventDefault(),_?.stopImmediatePropagation();let g=r.value.trim();if(q(),!g)return;l.disabled=!0;try{if(C)Ni(g,[]),await zp(b,h,f,g),Li();else{let P=[...E,...await Np(b,g)];Ni(g,P),await Bp(b,h,f,w,g,P),E=[],J()}if(r.value.trim()===g)r.value="";if(L)L.value=""}catch(P){R(h,[yp(P)],f.activeSessionId)}finally{l.disabled=!1,W(),q()}};if(i.listen(r,"input",()=>{if(!C&&r.value.startsWith("! "))r.value=r.value.slice(2),li();q()}),i.listen(r,"keydown",(_)=>{let g=_;if(g.key===" "&&!C&&r.value==="!"&&r.selectionStart===1&&r.selectionEnd===1){g.preventDefault(),r.value="",li(),q();return}if(g.key==="Backspace"&&C&&r.value===""){g.preventDefault(),Li(),q();return}if(g.key==="Escape"){$?.setAttribute("hidden",""),A?.setAttribute("hidden","");return}if(g.key==="Enter"&&(g.metaKey||g.ctrlKey))Ti(g)}),i.listen(l,"click",(_)=>{Ti(_)}),c&&L)i.listen(c,"click",()=>{if(!C)L.click()}),i.listen(L,"change",()=>{Rp(L,(_)=>{E=_,J()})});i.add({remove:()=>{if(G)clearTimeout(G)}}),W()}function yp(i){return{id:j(),role:"system",text:`prompt failed: ${ri(i)}`,createdAt:Date.now()}}async function Rp(i,b){let p=Array.from(i.files||[]).slice(0,lp),h=[];for(let f of p){if(f.size>Lp)continue;h.push({name:f.name,size:f.size,content:await f.text(),mimeType:f.type||void 0})}b(h)}async function zp(i,b,p,h){let f=ui(i,p),w=F(p,f),r={id:j(),role:"user",text:`! ${h}`,createdAt:Date.now()},l={id:j(),role:"tool",text:`$ ${h}
(running...)`,createdAt:Date.now()};w.messages.push(r,l),w.updatedAt=Date.now(),H(p),R(b,w.messages,f);try{let c=await Z(i,"runShell",{command:h}),L=typeof c.exitCode==="number"?c.exitCode:1,T=typeof c.durationMs==="number"?c.durationMs:0,O=typeof c.output==="string"?c.output:"";l.text=Ap(h,O,L,T,Boolean(c.truncated))}catch(c){l.text=`$ ${h}
${ri(c)}`}w.updatedAt=Date.now(),H(p),R(b,w.messages,f)}async function Np(i,b){let p=qi(b);if(!p.length)return[];let h=await Z(i,"resolveContext",{text:b,refs:p});return Array.isArray(h.attachments)?h.attachments.filter(N):[]}function Ap(i,b,p,h,f){let w=Fp(b,Tp),r=f||w.truncated,l=w.text.endsWith(`
`)||!w.text?"":`
`;return`$ ${i}
${w.text}${l}[exit ${p} · ${h}ms${r?" · truncated":""}]`}function Fp(i,b){let p=new TextEncoder,h=p.encode(i);if(h.byteLength<=b)return{text:i,truncated:!1};let f=new TextDecoder().decode(h.slice(0,b));while(f&&p.encode(f).byteLength>b)f=f.slice(0,-1);return{text:f,truncated:!0}}async function Up(i,b,p,h,f,w){let r=b.querySelector(".slash-pop"),l=b.querySelector(".slash-list"),c=Eb(h);if(c===null||!l){r?.setAttribute("hidden","");return}let L=f;if(!L.length){let O=await Z(i,"commands",{});L=Array.isArray(O.commands)?O.commands.filter(N):[],w(L)}if(p.value!==h)return;let T=L.filter((O)=>{return v(O).slice(1).toLowerCase().includes(c)});Vp(l,T,p,r),r?.toggleAttribute("hidden",T.length===0)}async function Zp(i,b,p,h){let f=b.querySelector(".prompt-file-ref-pop"),w=b.querySelector(".prompt-file-ref-list"),r=_b(h);if(r===null||!w){f?.setAttribute("hidden","");return}try{let l=await Z(i,"searchFiles",{query:r,limit:cp}),c=Array.isArray(l.files)?l.files.filter(N):[];if(p.value!==h)return;jp(w,p,c,f),f?.toggleAttribute("hidden",c.length===0)}catch{f?.setAttribute("hidden","")}}function Vp(i,b,p,h){i.replaceChildren(...b.map((f)=>{let w=document.createElement("button"),r=v(f);return w.type="button",w.className="slash-item",w.dataset.slash=r,w.innerHTML='<span class="sl-name"></span><span class="sl-desc"></span>',w.querySelector(".sl-name").textContent=r,w.querySelector(".sl-desc").textContent=f.description||"",w.addEventListener("click",()=>{p.value=f.template||`${r} `,h?.setAttribute("hidden",""),p.dispatchEvent(new(p.ownerDocument.defaultView?.Event||Event)("input",{bubbles:!0})),p.focus()}),w}))}function jp(i,b,p,h){i.replaceChildren(...p.map((f)=>{let w=f.path||f.name||"",r=document.createElement("button");return r.type="button",r.className="prompt-file-ref-item",r.dataset.path=w,r.disabled=!w,r.innerHTML='<span class="pfr-path"></span><span class="pfr-kind"></span>',r.querySelector(".pfr-path").textContent=w,r.querySelector(".pfr-kind").textContent=typeof f.size==="number"?`${f.size} bytes`:"file",r.addEventListener("click",()=>{Dp(b,w),h?.setAttribute("hidden","")}),r}))}function Dp(i,b){if(!b)return;let{value:p,selectionStart:h}=i,f=p.slice(0,h),w=/(?:^|\s)@([^\s@`]*)$/.exec(f),r=w?h-(w[1]||"").length-1:h,l=`@${b} `;i.value=`${p.slice(0,r)}${l}${p.slice(h)}`;let c=r+l.length;i.setSelectionRange(c,c),i.dispatchEvent(new(i.ownerDocument.defaultView?.Event||Event)("input",{bubbles:!0})),i.focus()}function Bb(i){return{input$:i.behaviorSubject("chat.input",""),submitted$:i.subject("chat.input.submitted"),activeSessionId$:i.behaviorSubject("session.activeId",null),sidebarSelectedSession$:i.behaviorSubject(ji,Gp()),toastRequested$:i.subject("toast.requested")}}function qi(i){let b=[],p=new Set,h=/(^|[\s`])@([^\s@`]+)/g,f=h.exec(String(i||""));while(f!==null){let w=f[2]||"";if((f[1]||"")!=="`"&&w&&!p.has(w))p.add(w),b.push(w);f=h.exec(String(i||""))}return b}function Yb(i=[],b=[]){let p=[],h=new Set;for(let f of[...i,...b]){let w=v(f);if(!w||h.has(w))continue;h.add(w),p.push(f)}return p}function S(i){return i.app?.piWebSidebar?.getSnapshot?.().activeWorkspaceId||i.app?.dataset.activeWorkspaceId||""}function Gp(){return Q({})}function Q(i){let b=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),p=b?.activeSessionId||"",h=b?.activeWorkspaceId||"";if(p)return{sessionId:p,workspaceId:h||void 0};let f=I(ii),w=I(d);return f?{sessionId:f,workspaceId:w||void 0}:null}function U(i,b){if(b?.workspaceId&&i.app)i.app.dataset.activeWorkspaceId=b.workspaceId,yi(d,b.workspaceId);if(b?.sessionId)i.app?.setAttribute("data-active-session-id",b.sessionId),yi(ii,b.sessionId)}function Jp(i){i.app?.removeAttribute("data-active-session-id"),qp(ii),globalThis.piWeb?.behaviorSubject("session.activeId",null).next(null)}function M(i,b,p={}){let h=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),f={type:b,detail:p,snapshot:h};(i.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$)?.next(f),globalThis.piWeb?.subject(Di).next(f)}function pi(i,b,p){let h=i.app?.dataset.activeWorkspaceId||S(i),f={reason:p,sessionId:b,workspaceId:h};globalThis.piWeb?.behaviorSubject("session.activeId",b).next(b),globalThis.piWeb?.subject("session.changed").next({sessionId:b,workspaceId:h,reason:p}),M(i,"active.start",f),M(i,"session.created",f)}function yi(i,b){try{localStorage.setItem(i,b)}catch{}}function qp(i){try{localStorage.removeItem(i)}catch{}}async function Z(i,b,p={},h=S(i)){if(!i.backend)return{};let f=await i.backend(b,{workspaceId:h,data:p});return N(f)?f:{}}function Ri(i){let b=Array.isArray(i.warnings)?i.warnings.filter((p)=>typeof p==="string"&&p.trim().length>0):[];for(let p of b)globalThis.piWeb?.subject("toast.requested").next({level:"warning",message:p})}async function Bp(i,b,p,h,f,w){let r=ui(i,p),l=z(i);h.backendChatToken+=1,h.runEventsAbort?.abort();let c=new AbortController;h.runEventsAbort=c,h.sessionEventsAbort?.abort();let L={id:j(),role:"user",text:f,attachments:ti(w),createdAt:Date.now()},T=F(p,r);T.messages.push(L),T.updatedAt=Date.now(),H(p),R(b,T.messages,r);let O=await Kp(i,f,w,r,l.path,l.id);if(Ri(O),typeof O.activeSessionId==="string"&&O.activeSessionId){let E=r,C=p.activeSessionId===E;if(r=O.activeSessionId,C)D(p,r),U(i,{sessionId:O.activeSessionId,workspaceId:l.id||void 0}),M(i,"chat-session",{reason:"startPrompt",sessionId:O.activeSessionId}),pi(i,O.activeSessionId,"startPrompt");else F(p,r);Hb(p,E,r,L.id)}if(typeof O.runId!=="string"||!O.runId){let E=await Pp(i,f,w,r,l.path,l.id);Ri(E);let C=dp(i,p,E,"submitPrompt",r);if(p.activeSessionId===r)R(b,C,r);if(h.runEventsAbort===c)h.runEventsAbort=void 0;return}let $=F(p,r),A=vp($);try{await Yp(i,p,$,O.runId,l.path,l.id,A,()=>{if(p.activeSessionId===r)R(b,$.messages,r)},c.signal)}finally{if(h.runEventsAbort===c)h.runEventsAbort=void 0}if(p.activeSessionId===r)a(i,b,p,h,r,l.path,l.id)}async function Yp(i,b,p,h,f,w,r,l,c){let L=await Yi(i,"streamEventsSse",{runId:h,cursor:0,workspacePath:f},c,w);if(!L)throw Error("SSE streaming backend did not return a stream");let T=Bi(l);r.streaming=!0,T.flush();try{await Xi(L,(O)=>{up(r,[O]),r.streaming=O.type!=="run.end",p.updatedAt=Date.now(),H(b),T.request()})}finally{r.streaming=!1,H(b),T.flush()}}function Bi(i){let b=0,p,h=()=>{if(p)clearTimeout(p),p=void 0},f=()=>{h(),b=Date.now(),i()};return{request:()=>{let r=Op-(Date.now()-b);if(r<=0){f();return}p||=setTimeout(f,r)},flush:f,cancel:h}}async function Yi(i,b,p={},h,f=S(i)){if(!i.backendStream)throw Error("SSE streaming backend is unavailable");let w=await i.backendStream(b,{workspaceId:f,data:p},{signal:h});return Xp(w)}function Xp(i){if(typeof ReadableStream<"u"&&i instanceof ReadableStream)return i;if(typeof Response<"u"&&i instanceof Response)return i.body;if(typeof i==="string")return zi(i);if(!N(i))return null;let b=i.body;if(typeof ReadableStream<"u"&&b instanceof ReadableStream)return b;let p=i.sse;if(typeof p==="string")return zi(p);return null}function zi(i){let b=new TextEncoder().encode(i);return new ReadableStream({start(p){p.enqueue(b),p.close()}})}async function Xi(i,b){let p=i.getReader(),h=new TextDecoder,f="";while(!0){let w=await p.read();if(w.done){f+=h.decode(),Qp(f,b);return}f+=h.decode(w.value,{stream:!0});let r=Mp(f);f=r.remainder;for(let l of r.frames)Mi(l,b)}}function Mp(i){let p=i.replaceAll(`\r
`,`
`).replaceAll("\r",`
`).split(`

`),h=p.pop()||"";return{frames:p,remainder:h}}function Qp(i,b){let p=i.trim();if(p)Mi(p,b)}function Mi(i,b){let p=i.split(`
`).filter((h)=>h.startsWith("data:")).map((h)=>h.slice(5).trimStart()).join(`
`);if(!p)return;try{let h=JSON.parse(p);if(xp(h))b(h)}catch{}}function Ni(i,b){globalThis.piWeb?.subject("chat.input.submitted").next({text:i,attachments:ti(b)||[]})}async function Kp(i,b,p,h,f=z(i).path,w=z(i).id){try{return await Z(i,"startPrompt",Qi(b,p,h,f),w)}catch(r){if(Wp(r))return{};throw r}}function Wp(i){return/unknown method: (startPrompt|streamEventsSse)|unsupported method: (startPrompt|streamEventsSse)|(startPrompt|streamEventsSse) unsupported/i.test(ri(i))}async function Pp(i,b,p,h="",f=z(i).path,w=z(i).id){return await Z(i,"submitPrompt",Qi(b,p,h,f),w)}function Qi(i,b,p,h){let f={text:i,attachments:b,sessionId:p};if(h)f.workspacePath=h;return f}function vp(i){let b=[...i.messages].reverse().find((h)=>h.role==="assistant"&&h.streaming);if(b)return b;let p={id:j(),role:"assistant",text:"",createdAt:Date.now(),streaming:!0};return i.messages.push(p),p}function up(i,b){for(let p of b)if(p.type==="text.delta"&&typeof p.delta==="string")i.text+=p.delta;else if(p.type==="thinking.delta"&&typeof p.delta==="string")i.thinking=`${i.thinking||""}${p.delta}`;else if(p.type==="tool.start")t(i,p,"running");else if(p.type==="tool.delta"&&typeof p.delta==="string"){let h=t(i,p,"running");h.text=p.delta}else if(p.type==="tool.end"){let h=t(i,p,p.isError?"err":"ok");if(typeof p.result==="string"&&p.result)h.text=p.result}else if(p.type==="error"&&typeof p.message==="string")i.text+=`${i.text?`
`:""}${p.message}`}function t(i,b,p){let h=b.toolCallId||b.toolName||"tool";i.toolCalls||=[];let f=i.toolCalls.find((w)=>w.id===h);if(!f)f={id:h,name:b.toolName||"tool",args:b.args,text:"",status:p},i.toolCalls.push(f);if(f.status=p,kp(f,b))f.args=b.args,f.argsStatus=b.argsStatus;return f}function kp(i,b){if(!b.argsStatus)return Boolean(b.args);if(b.argsStatus==="unavailable")return!i.argsStatus;return!0}function xp(i){return N(i)&&typeof i.type==="string"}async function a(i,b,p,h,f="",w=bi(i),r=z(i).id){if(!i.backendStream){await Ai(i,b,p,h,f,w);return}let l=++h.backendChatToken;h.sessionEventsAbort?.abort();let c=new AbortController;h.sessionEventsAbort=c;let L=Bi(()=>{R(b,K(p).messages,p.activeSessionId)});try{let T=await Yi(i,"sessionEventsSse",Ki(i,f,w),c.signal,r);if(!T)throw Error("session SSE backend did not return a stream");await Xi(T,(O)=>{if(l!==h.backendChatToken||O.type!=="chat.state")return;if(Pi(i,p,Ip(O),"chatState").length)L.request()})}catch(T){if(!c.signal.aborted)await Ai(i,b,p,h,f,w)}finally{if(L.cancel(),h.sessionEventsAbort===c)h.sessionEventsAbort=void 0}}async function Ai(i,b,p,h,f="",w=bi(i)){let r=++h.backendChatToken;try{let l=await Z(i,"chatState",Ki(i,f,w));if(r!==h.backendChatToken)return;let c=Pi(i,p,l,"chatState");if(c.length)R(b,c,p.activeSessionId)}catch{}}function Ki(i,b,p=bi(i)){let h=b?{sessionId:b}:{};if(p)h.workspacePath=p;return h}function Ip(i){return{activeSessionId:i.activeSessionId,messages:i.messages,isStreaming:i.isStreaming}}function bi(i){return z(i).path}function z(i){let b=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),p=b?.activeWorkspaceId||i.app?.dataset.activeWorkspaceId||"",h=b?.workspaces?.find((f)=>f.id===p)?.path||"";return{id:p,path:h}}function Wi(i,b){let p=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),h=b.workspaceId||p?.activeWorkspaceId||i.app?.dataset.activeWorkspaceId||"",f=p?.workspaces?.find((w)=>w.id===h)?.path||"";if(f||h!==p?.activeWorkspaceId)return{id:h,path:f};return z(i)}function Pi(i,b,p,h){let f=wi(p.messages);if(typeof p.activeSessionId==="string"&&p.activeSessionId){let l=b.activeSessionId;if(D(b,p.activeSessionId),U(i,{sessionId:p.activeSessionId,workspaceId:i.app?.dataset.activeWorkspaceId||S(i)||void 0}),h!=="chatState"||l!==p.activeSessionId)M(i,"chat-session",{reason:h,sessionId:p.activeSessionId});if(h!=="chatState")pi(i,p.activeSessionId,h)}let w=K(b);if(!f.length)return[];let r=oi(w.messages,f).slice(-X);if(!vi(w.messages,r))return[];if(w.messages=r,w.title==="New chat"){let l=w.messages.find((c)=>c.role==="user");if(l)w.title=l.text.slice(0,48)||w.title}return w.updatedAt=Date.now(),H(b),w.messages}function vi(i,b){if(i.length!==b.length)return!0;return i.some((p,h)=>Fi(p)!==Fi(b[h]))}function Fi(i){return JSON.stringify({id:i.id,role:i.role,text:i.text,thinking:i.thinking,streaming:i.streaming,toolCalls:i.toolCalls,attachments:i.attachments})}function dp(i,b,p,h,f){let w=wi(p.messages),r=typeof p.activeSessionId==="string"&&p.activeSessionId?p.activeSessionId:f,l=b.activeSessionId===f;if(r!==f)if(l)D(b,r),U(i,{sessionId:r,workspaceId:z(i).id||void 0}),M(i,"chat-session",{reason:h,sessionId:r}),pi(i,r,h);else F(b,r);let c=F(b,r);if(!w.length)return[];let L=oi(c.messages,w).slice(-X);if(!vi(c.messages,L))return[];return c.messages=L,c.updatedAt=Date.now(),H(b),c.messages}function Sp(i,b,p,h,f){let w=(L)=>{if(!L?.sessionId)return;if(ki(b,h,L))return;U(b,L),D(h,L.sessionId),R(p,K(h).messages,h.activeSessionId);let T=Wi(b,L);a(b,p,h,f,L.sessionId,T.path,T.id)},r=(L)=>{if(ap(b,p,h,f,L))return;let T=np(b,L);if(T)w(T)},l=b.app?.piWebSidebar?.channels?.selectedSession$||globalThis.piWebSidebar?.channels?.selectedSession$,c=b.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$;if(l)i.add(l.subscribe(w));if(c)i.add(c.subscribe(r));if(b.app)i.listen(b.app,"pi-web-sidebar:session-created",(L)=>{let T=L.detail||{},O=typeof T.sessionId==="string"?T.sessionId:"",$=typeof T.workspaceId==="string"?T.workspaceId:"";if(O)w({sessionId:O,workspaceId:$||void 0})});if(globalThis.piWeb)i.add(globalThis.piWeb.behaviorSubject(ji,Q(b)).subscribe(w)),i.add(globalThis.piWeb.subject(Di).subscribe(r)),i.add(globalThis.piWeb.behaviorSubject("session.activeId",null).subscribe((L)=>{if(!L)return;w({sessionId:L,workspaceId:b.app?.dataset.activeWorkspaceId||I(d)||void 0})}))}function ui(i,b){let p=Q(i);if(p?.sessionId&&!ki(i,b,p))U(i,p),D(b,p.sessionId);return b.activeSessionId}function ki(i,b,p){let h=p.workspaceId||"",f=i.app?.dataset.activeWorkspaceId||I(d)||"";return b.activeSessionId===p.sessionId&&(!h||h===f)}function ap(i,b,p,h,f){if(f.type!=="session.deleted")return!1;let w=xi(f);if(!w)return!0;let r=p.activeSessionId===w,l=p.sessions.length;if(p.sessions=p.sessions.filter((c)=>c.id!==w),r){h.runEventsAbort?.abort(),h.sessionEventsAbort?.abort();let c=mp(i,f,w);if(c?.sessionId){U(i,c),D(p,c.sessionId),tp(b,K(p).messages,p.activeSessionId);let L=Wi(i,c);return a(i,b,p,h,c.sessionId,L.path,L.id),!0}return p.activeSessionId="",Jp(i),H(p),hi(b),!0}if(p.sessions.length!==l)H(p);return!0}function mp(i,b,p){let h=b.snapshot?.activeSessionId||"",f=b.snapshot?.activeWorkspaceId||"";if(h&&h!==p)return{sessionId:h,workspaceId:f||void 0};let w=Q(i);if(w?.sessionId&&w.sessionId!==p)return w;return null}function np(i,b){if(!op(b.type))return null;let p=b.detail||{},h=xi(b)||b.snapshot?.activeSessionId||"",f=typeof p.workspaceId==="string"?p.workspaceId:b.snapshot?.activeWorkspaceId||i.app?.dataset.activeWorkspaceId||"";if(!h)return null;return{sessionId:h,workspaceId:f||void 0}}function xi(i){let b=i.detail||{};if(typeof b.sessionId==="string")return b.sessionId;if(typeof b.id==="string")return b.id;return""}function op(i){return i==="session.selected"||i==="session.created"||i==="new-session"||i==="active.start"}function D(i,b){let p=i.sessions.find((h)=>h.id===b);if(!p)p=x(b),i.sessions.unshift(p);return i.activeSessionId=p.id,H(i),p}function R(i,b,p){if(Si(b,p),!b.length){hi(i);return}(i.querySelector(".term-inner")||i).replaceChildren(...b.map((f)=>di(f,p))),fi(i)}function tp(i,b,p){Si(b,p),(i.querySelector(".term-inner")||i).replaceChildren(...b.map((f)=>di(f,p))),fi(i)}function hi(i){let b=i.querySelector(".term-inner")||i,p=document.createElement("article");p.className="pi-web-chat-docs",p.setAttribute("aria-label","pi-web-chat guide");let h=document.createElement("h1");h.textContent="pi-web-chat guide";let f=document.createElement("p");f.textContent=["Select or create a session in the sidebar to load chat history,","or type below to start a new session."].join(" ");let w=document.createElement("ul");for(let r of["Ask pi in the prompt box and press Cmd/Ctrl+Enter to send.","Type ! then Space at the start to turn the prompt yellow and run shell commands in the workspace.","Type @ to list project files, then pick one to tag it as prompt context.","Type / at the start to open the slash command list.","Chats are cached locally after you start or select a session."]){let l=document.createElement("li");l.textContent=r,w.append(l)}p.append(h,f,w),b.replaceChildren(p),fi(i)}function sp(i,b){let p=b.querySelector(".term"),h=b.querySelector("[data-action='scroll-bottom']");if(!p||!h)return;let f={term:p,button:h,pinned:!0,touchStartY:null};e.set(b,f),h.hidden=!1,k(f),i.listen(h,"click",()=>{f.pinned=!0,Ii(f),k(f)}),i.listen(p,"wheel",(w)=>{if(w.deltaY<0)Ui(f)}),i.listen(p,"touchstart",(w)=>{let r=w;f.touchStartY=r.touches.item(0)?.clientY??null}),i.listen(p,"touchmove",(w)=>{let l=w.touches.item(0)?.clientY;if(typeof l==="number"&&f.touchStartY!==null&&l-f.touchStartY>8)Ui(f)}),i.listen(p,"touchend",()=>{f.touchStartY=null}),i.add({remove:()=>{e.delete(b)}})}function fi(i){let b=e.get(i);if(!b)return;if(b.pinned)Ii(b);k(b)}function Ii(i){i.term.scrollTop=i.term.scrollHeight}function Ui(i){i.pinned=!1,k(i)}function k(i){i.button.dataset.pinned=i.pinned?"true":"false",i.button.setAttribute("aria-pressed",i.pinned?"true":"false")}function di(i,b){let p=document.createElement("article");p.className="transcript-item",p.dataset.messageId=i.id;let h=document.createElement("div");h.className="msg",h.dataset.kind=s(i.role);let f=document.createElement("span");f.className=`prefix ${s(i.role)}`,f.textContent=Cb(i.role);let w=document.createElement("pre");if(w.className=`body ${s(i.role)}`,w.textContent=i.text,h.append(f,w),ep(i))p.append(h);if(i.thinking)p.append(ib(i.thinking,Boolean(i.streaming)));for(let r of i.toolCalls||[])p.append(pb(r,ai(b,i,r)));if(i.streaming)p.dataset.streaming="true";return p}function ep(i){let b=i.text.trim().length>0;return i.role!=="assistant"||b}function ib(i,b){let p=document.createElement("details");p.className="msg-detail think thinking-block",p.open=b;let h=document.createElement("summary");h.className="label",h.textContent="THINKING";let f=document.createElement("pre");return f.className="body",f.textContent=i,p.append(h,f),p}function Si(i,b){let p=new Set;for(let h of i)for(let f of h.toolCalls||[])p.add(ai(b,h,f));for(let h of V)if(!p.has(h))V.delete(h)}function ai(i,b,p){return`${i}:${b.id}:${p.id}`}function pb(i,b){let p=document.createElement("div");p.className="tool-card",p.dataset.tool=i.name||"tool",p.dataset.status=i.status;let h=!V.has(b);p.dataset.collapsed=h?"true":"false";let f=document.createElement("button");if(f.type="button",f.className="tc-head",f.title=h?"Show tool output":"Hide tool output",f.setAttribute("aria-expanded",h?"false":"true"),f.setAttribute("aria-label",`${h?"Show":"Hide"} ${i.name||"tool"} output`),f.append(wb(i),rb(i),cb(i),lb(i,h)),!h)p.append(mi(i));return f.addEventListener("click",()=>fb(p,f,i,b)),p.prepend(f),p}function mi(i){let b=document.createElement("pre");return b.className="tc-body",b.textContent=i.text||Lb(i),b}function bb(i,b){let p=0,h,f=b.ownerDocument.defaultView,w=typeof f?.matchMedia==="function"?f.matchMedia("(prefers-reduced-motion: reduce)"):void 0,r=()=>{if(h)clearInterval(h),h=void 0},l=()=>{p=(p+1)%Gi;for(let T of b.querySelectorAll(".spinner"))T.dataset.frame=String(p)},c=()=>{let T=b.querySelectorAll(".spinner");if(w?.matches||T.length===0){r(),p=0;for(let O of T)O.dataset.frame="0";return}if(!h)h=setInterval(l,gp)},L=new(f?.MutationObserver||MutationObserver)(c);L.observe(b,{childList:!0,subtree:!0}),w?.addEventListener("change",c),c(),i.add({remove:()=>{L.disconnect(),w?.removeEventListener("change",c),r()}})}function hb(){let i=document.createElement("span");i.className="spinner",i.dataset.frame="0",i.setAttribute("aria-hidden","true");for(let b=0;b<Gi;b+=1)i.append(document.createElement("span"));return i}function fb(i,b,p,h){let f=i.querySelector(".tc-body"),w=f!==null;if(f)f.remove(),V.delete(h);else i.append(mi(p)),V.add(h);i.dataset.collapsed=w?"true":"false",b.setAttribute("aria-expanded",w?"false":"true"),b.setAttribute("aria-label",`${w?"Show":"Hide"} ${i.dataset.tool||"tool"} output`),b.title=w?"Show tool output":"Hide tool output";let r=b.querySelector(".tc-toggle-label");if(r)r.textContent=w?"show":"hide"}function wb(i){let b=document.createElement("span");b.className="tc-glyph";let p=Tb(i),h=p?Cp[p]:"";if(!p||!h)return b.textContent="●",b;return b.innerHTML=`<svg class="tc-icon" data-tool-icon="${p}" aria-hidden="true" viewBox="0 0 24 24">${h}</svg>`,b}function rb(i){let b=document.createElement("span");return b.className="tc-name",b.textContent=i.name||"tool",b}function cb(i){let b=document.createElement("span");return b.className="tc-args",b.textContent=ni(i),b}function lb(i,b){let p=document.createElement("span");if(p.className="tc-meta",i.status==="running"){let w=hb(),r=document.createElement("span");return r.className="running",r.textContent="running",p.append(w,r,Zi(b)),p}let h=document.createElement("span");h.className=i.status==="err"?"err":"ok",h.textContent=i.status==="err"?"✗":"✓";let f=document.createElement("span");return f.textContent=i.status==="err"?" · failed":" · done",p.append(h,f,Zi(b)),p}function Zi(i){let b=document.createElement("span");b.className="tc-toggle";let p=document.createElement("span");p.className="tc-toggle-label",p.textContent=i?"show":"hide";let h=document.createElement("span");return h.className="tc-caret",h.textContent="▸",b.append(p,h),b}function ni(i){if(i.argsStatus==="truncated")return"arguments truncated";if(i.argsStatus==="omitted")return"arguments omitted";if(i.argsStatus==="unavailable")return"arguments unavailable";if(i.argsStatus==="empty")return"no arguments";if(!i.args)return"";return JSON.stringify(i.args)}function Lb(i){if(i.argsStatus==="truncated")return"arguments truncated: too large to display";if(i.argsStatus==="omitted")return"arguments omitted: response too large";if(i.argsStatus==="unavailable")return"arguments unavailable";if(i.argsStatus==="empty")return"no arguments";if(!i.args)return"arguments unavailable";return JSON.stringify(i.args,null,2)}function Tb(i){let b=Ob(i.name);if(["bash","shell","sh","zsh","terminal"].includes(b))return gb(ni(i).toLowerCase())||"terminal";return Ep[b]}function Ob(i){return i.trim().replace(/^functions\./,"").replace(/^multi_tool_use\./,"")}function gb(i){if(/\bgit\b|\bgh\b/.test(i))return"git-branch";if(/\b(go test|bun test|npm test|pnpm test|yarn test|vitest|pytest|cargo test)\b/.test(i))return"circle-check";if(/\b(bun|npm|pnpm|yarn)\s+(run\s+)?build\b|\b(go build|cargo build)\b/.test(i))return"hammer";if(/\b(bun|npm|pnpm|yarn)\s+(add|install|i)\b|\bpip\s+install\b|\bgo\s+get\b/.test(i))return"package";return}function Cb(i){if(i==="assistant")return"pi >";if(i==="user")return"you >";if(i==="system")return"sys >";return"tool >"}function s(i){if(i==="assistant")return"pi";if(i==="system")return"sys";return i}function Eb(i){let b=/^\/([^\s/]*)$/.exec(i);return b?b[1].toLowerCase():null}function _b(i){let b=/(?:^|\s)@([^\s@`]*)$/.exec(i);return b?b[1]:null}function oi(i,b){let p=new Map;for(let h of i)p.set(h.id,h);for(let h of b)p.set(h.id,{...p.get(h.id),...h});return[...p.values()].sort((h,f)=>h.createdAt-f.createdAt)}function K(i){return F(i,i.activeSessionId,!0)}function F(i,b,p=!1){let h=i.sessions.find((f)=>f.id===b);if(!h)h=x(b||void 0),i.sessions.unshift(h),H(i);if(p||!i.activeSessionId)i.activeSessionId=h.id,H(i);return h}function Hb(i,b,p,h){if(b===p)return;let f=i.sessions.find((c)=>c.id===b),w=f?.messages.findIndex((c)=>c.id===h)??-1;if(!f||w<0)return;let[r]=f.messages.splice(w,1),l=F(i,p);if(!l.messages.some((c)=>c.id===r.id))l.messages.push(r);f.updatedAt=Date.now(),l.updatedAt=Date.now(),H(i)}function x(i=j()){let b=Date.now();return{id:i,title:"New chat",createdAt:b,updatedAt:b,messages:[]}}function I(i){try{return localStorage.getItem(i)||""}catch{return""}}function $b(i=""){try{let p=JSON.parse(localStorage.getItem(u)||"null");if(p&&typeof p.activeSessionId==="string"&&Array.isArray(p.sessions)){let h=p.sessions.filter(si).map(Rb);if(i&&!h.some((f)=>f.id===i))h.unshift(x(i));return{activeSessionId:i||p.activeSessionId,sessions:h}}}catch{}let b=x(i||void 0);return{activeSessionId:b.id,sessions:[b]}}function yb(){try{let i=JSON.parse(localStorage.getItem(u)||"null");return Boolean(i&&Array.isArray(i.sessions)&&i.sessions.some(si))}catch{return!1}}function H(i){Vi(i);try{localStorage.setItem(u,JSON.stringify(i))}catch{for(let b of i.sessions)b.messages=b.messages.slice(-Math.floor(X/2));Vi(i);try{localStorage.setItem(u,JSON.stringify(i))}catch{}}}function ti(i){if(!i?.length)return;return i.map(({content:b,...p})=>p)}function Vi(i){i.sessions.sort((h,f)=>f.updatedAt-h.updatedAt);let b=i.sessions.find((h)=>h.id===i.activeSessionId),p=i.sessions.filter((h)=>h.id!==i.activeSessionId).slice(0,Math.max(0,$i-1));i.sessions=b?[b,...p]:i.sessions.slice(0,$i);for(let h of i.sessions)if(h.messages.length>X)h.messages.splice(0,h.messages.length-X)}function si(i){return N(i)&&typeof i.id==="string"&&Array.isArray(i.messages)}function Rb(i){return{...i,messages:wi(i.messages)}}function wi(i){return Array.isArray(i)?i.filter(Ub).map(zb):[]}function zb(i){if(!Array.isArray(i.toolCalls)){let{toolCalls:b,...p}=i;return p}return{...i,toolCalls:i.toolCalls.filter(Nb)}}function Nb(i){if(!N(i)||typeof i.id!=="string"||typeof i.name!=="string")return!1;return typeof i.text==="string"&&Fb(i.status)&&Ab(i.argsStatus)}function Ab(i){return i===void 0||i==="present"||i==="empty"||i==="unavailable"||i==="truncated"||i==="omitted"}function Fb(i){return i==="running"||i==="ok"||i==="err"}function Ub(i){if(!N(i)||typeof i.id!=="string"||typeof i.text!=="string")return!1;return typeof i.createdAt==="number"&&Zb(i.role)}function Zb(i){return i==="user"||i==="assistant"||i==="tool"||i==="system"}function N(i){return typeof i==="object"&&i!==null}function j(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`}function ri(i){return i instanceof Error?i.message:String(i)}export{ip as renderMessages,fp as promptFromAgUiLikeRunInput,Ei as pluginStyleText,n as pluginClass,Yb as mergeCommands,S as getActiveWorkspaceId,qi as extractRefs,_p as default,gi as createComposerSurface,Oi as createChatSurface,ei as createChatDom,Bb as createChannels,hp as createAgUiLikeRunInput,v as commandName,wp as chatEventsToAgUiLikeEvents,Z as backendCall};
