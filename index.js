var q={attachFile:["M16.5 6v11.5a4 4 0 0 1-8 0V5a2.5 2.5 0 0 1 5 0v10.5a1 1 0 0 1-2 0V6H10v9.5","a2.5 2.5 0 0 0 5 0V5a4 4 0 0 0-8 0v12.5a5.5 5.5 0 0 0 11 0V6h-1.5Z"].join(""),stop:"M6 6h12v12H6V6Z",send:"M2 21 23 12 2 3v7l15 2-15 2v7Z",terminal:"M3 4h18v16H3V4Zm2 2v12h14V6H5Zm2 3 1.1-1.1L12.2 12l-4.1 4.1L7 15l3-3-3-3Zm6 6h5v1.5h-5V15Z",file:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 2.5L17.5 8H14V4.5ZM8 13h8v1.5H8V13Zm0 3h8v1.5H8V16Z"},m={attachFile:Y("attach_file",q.attachFile),stop:Y("stop",q.stop),send:Y("send",q.send)};function Y(i,b){return`<svg class="material-icon" data-material-icon="${i}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="${b}"></path></svg>`}function n(){return"pi-web-chat-mounted"}function Li(){let i=document.createElement("main");return i.className="main pi-web-chat-surface",i.dataset.main="session",i.innerHTML='<div class="term"><div class="term-inner" role="log" aria-live="polite" aria-relevant="additions text"></div></div><button type="button" class="scroll-bottom-btn" data-action="scroll-bottom" aria-label="stick to bottom" title="stick to bottom" aria-pressed="true" hidden>↓</button>',i}function Ti(){let i=document.createElement("section");return i.className="prompt-region pi-web-chat-composer",i.innerHTML=`
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
    <div class="prompt-meta" data-prompt-meta>— | <span class="prompt-meta-item prompt-meta-branch"><span>—</span></span></div>`,i}function Ci(i){let b=document.createElement("span");return b.className="prompt-meta-item pi-web-chat-badge",b.textContent="chat plugin",i.querySelector("[data-prompt-meta]")?.append(b),b}function ti(){let i=document.createElement("section");return i.className="pi-web-chat-root",i.dataset.plugin="pi-web-chat",i.innerHTML=`
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
        <button class="pi-web-chat-icon-btn" type="button" data-attach aria-label="attach files" title="attach files">${Y("attach_file",q.attachFile)}</button>
        <input type="file" multiple hidden data-file-input />
        <textarea class="pi-web-chat-textarea" data-chat-input aria-label="Prompt" placeholder="ask pi to do something…" rows="1"></textarea>
        <button class="pi-web-chat-send" type="button" data-send aria-label="send" title="send" aria-disabled="true">${Y("send",q.send)}</button>
      </div>
    </section>`,{root:i,transcript:$(i.querySelector("[data-chat-transcript]")),textarea:$(i.querySelector("[data-chat-input]")),sendButton:$(i.querySelector("[data-send]")),attachButton:$(i.querySelector("[data-attach]")),fileInput:$(i.querySelector("[data-file-input]")),slashPopover:$(i.querySelector("[data-slash-popover]")),slashList:$(i.querySelector("[data-slash-list]")),refsPopover:$(i.querySelector("[data-refs-popover]")),refsList:$(i.querySelector("[data-refs-list]")),attachments:$(i.querySelector("[data-attachments]"))}}function si(i,b){i.replaceChildren(...b.map(ei)),i.scrollTop=i.scrollHeight}function ei(i){let b=document.createElement("article");b.className=`pi-web-chat-message pi-web-chat-message-${i.role}`,b.dataset.messageId=i.id;let p=document.createElement("div");p.className="pi-web-chat-message-role",p.textContent=i.role;let h=document.createElement("pre");if(h.className="pi-web-chat-message-body",h.textContent=i.text,b.append(p,h),i.thinking){let f=document.createElement("details");f.className="pi-web-chat-thinking",f.open=Boolean(i.streaming);let w=document.createElement("summary");w.textContent="thinking";let r=document.createElement("pre");r.textContent=i.thinking,f.append(w,r),b.append(f)}if(i.toolCalls?.length){let f=document.createElement("div");f.className="pi-web-chat-tools";for(let w of i.toolCalls){let r=document.createElement("details");r.className=`pi-web-chat-tool pi-web-chat-tool-${w.status}`,r.open=w.status==="running";let l=document.createElement("summary");l.textContent=`${w.name} · ${w.status}`;let c=document.createElement("pre");c.textContent=w.text||ip(w),r.append(l,c),f.append(r)}b.append(f)}if(i.streaming){let f=document.createElement("div");f.className="pi-web-chat-message-meta",f.textContent="streaming...",b.append(f)}if(i.attachments?.length){let f=document.createElement("div");f.className="pi-web-chat-message-meta",f.textContent=`${i.attachments.length} attachment(s)`,b.append(f)}return b}function ip(i){if(i.argsStatus==="truncated")return"arguments truncated: too large to display";if(i.argsStatus==="omitted")return"arguments omitted: response too large";if(i.argsStatus==="unavailable")return"arguments unavailable";if(i.argsStatus==="empty")return"no arguments";if(!i.args)return"arguments unavailable";return JSON.stringify(i.args,null,2)}function Oi(i,b){i.hidden=b.length===0,i.replaceChildren(...b.map((p)=>{let h=document.createElement("span");return h.className="pi-web-chat-attachment-chip",h.textContent=p,h}))}function gi(){return`
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
  `}function Ei(){document.getElementById("pi-web-chat-style")?.remove();let i=document.createElement("style");return i.id="pi-web-chat-style",i.textContent=gi(),document.head.append(i),i}function W(i){return i.command||i.cmd||(i.name?`/${i.name}`:"")}function $(i){if(!i)throw Error("pi-web-chat DOM template is invalid");return i}function pp(i,b,p){return{threadId:i,runId:b,state:{},messages:p,tools:[],context:[]}}function bp(i){let b=[...i.messages].reverse().find((p)=>p.role==="user");return{text:b?.text||"",attachments:b?.attachments||[],sessionId:i.threadId}}function hp(i,b,p){return i.map((h)=>fp(h,b,p))}function fp(i,b,p){if(i.type==="text.delta")return{type:"TEXT_MESSAGE_CONTENT",threadId:b,runId:p,delta:i.delta||""};if(i.type==="thinking.delta")return{type:"THINKING_MESSAGE_CONTENT",threadId:b,runId:p,delta:i.delta||""};if(i.type==="tool.start")return{type:"TOOL_CALL_START",threadId:b,runId:p,toolCallId:i.toolCallId,payload:_i(i)};if(i.type==="tool.delta")return{type:"TOOL_CALL_ARGS",threadId:b,runId:p,toolCallId:i.toolCallId,delta:i.delta||""};if(i.type==="tool.end")return{type:"TOOL_CALL_END",threadId:b,runId:p,toolCallId:i.toolCallId,payload:_i(i)};return{type:i.type.toUpperCase().replaceAll(".","_"),threadId:b,runId:p,payload:i}}function _i(i){return{name:i.toolName||"tool",args:i.args||{},result:i.result||"",isError:i.isError===!0}}var v="pi-web-chat.sessions.v1";var Zi="plugin.pi-web-sidebar.selectedSession",Vi="plugin.pi-web-sidebar.event",e="plugin.pi-web-sidebar.activeSessionId",d="plugin.pi-web-sidebar.activeWorkspaceId",wp=12,Hi=20,M=200,rp=8,cp=1e6;var lp=250,ji=6,Lp=150,V=new Set,Tp={"book-open":'<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',"file-plus":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="M9 15h6"/>',pencil:'<path d="M21.2 6.8 17.2 2.8a2 2 0 0 0-2.8 0L3 14.2V21h6.8L21.2 9.6a2 2 0 0 0 0-2.8z"/><path d="m14 5 5 5"/>',terminal:'<path d="m4 17 6-6-6-6"/><path d="M12 19h8"/>',cpu:'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 15h3"/><path d="M1 9h3"/><path d="M1 15h3"/>',globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 0 20"/><path d="M12 2a15.3 15.3 0 0 0 0 20"/>',search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',braces:'<path d="M8 3H7a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-4a2 2 0 0 1 2-2 2 2 0 0 1-2-2V7a2 2 0 0 0-2-2h-1"/>',"file-text":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',"circle-question-mark":'<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 1 1 5.8 1c-.5 1-1.4 1.5-2.1 2-.6.4-.8.8-.8 2"/><path d="M12 17h.01"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',plug:'<path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a6 6 0 0 1-12 0V8Z"/>',"git-branch":'<line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',"circle-check":'<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',hammer:'<path d="m15 12-8.5 8.5a2.1 2.1 0 0 1-3-3L12 9"/><path d="m17.6 5.4 1.8-1.8"/><path d="m14 7 3 3"/><path d="M5 11 2 8l6-6 3 3"/>',package:'<path d="m7.5 4.3 9 5.2"/><path d="M21 8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>'},s=new WeakMap,Cp={read:"book-open",write:"file-plus",edit:"pencil",ctx_execute:"cpu",ctx_batch_execute:"cpu",ctx_execute_file:"cpu",ctx_search:"cpu",ctx_index:"cpu",ctx_fetch_and_index:"cpu",web_search:"globe",fetch_content:"search",get_search_content:"search",code_search:"braces",document_parse:"file-text",ask_user_question:"circle-question-mark",teams:"users",subagent:"users",mcp:"plug",git:"git-branch"};class Di{#i=[];add(i){if(i)this.#i.push(i);return i}listen(i,b,p){i.addEventListener(b,p),this.add({remove:()=>i.removeEventListener(b,p)})}dispose(){for(let i of this.#i.splice(0).reverse())if(typeof i==="function")i();else if("unsubscribe"in i)i.unsubscribe();else i.remove()}}function Op(i={}){let b=i.app;if(b?.piWebChat?.dispose(),typeof i.mount?.chat!=="function"||typeof i.mount?.composer!=="function")throw Error("pi-web-chat requires modern pi-web mount.chat and mount.composer APIs");return gp(i,b)}function gp(i,b){let p=new Di,h=p.add(Ei()),f=Li(),w=Ti(),r=i.mount?.chat(f,{replace:!0}),l=i.mount?.composer(w,{replace:!0});if(mp(p,f),sp(p,f),r)p.add(r);if(l)p.add(l);let c=Q(i);F(i,c||void 0);let L=!c?.sessionId&&!Eb(),T=gb(c?.sessionId||""),C={backendChatToken:0};if(L)bi(f);else A(f,K(T).messages,T.activeSessionId),a(i,f,T,C,c?.sessionId||T.activeSessionId);kp(p,i,f,T,C),Ep(p,i,w,f,T,C);let y=b?p.add(Ci(b)):void 0;b?.classList.add(n());let Z=()=>{if(C.runEventsAbort?.abort(),C.sessionEventsAbort?.abort(),p.dispose(),V.clear(),y?.remove(),h.remove(),b?.classList.remove(n()),b?.piWebChat===E)delete b.piWebChat},E={dispose:Z};if(b)b.piWebChat=E;return Z}function Ep(i,b,p,h,f,w){let r=p.querySelector(".prompt-textarea"),l=p.querySelector(".send-btn"),c=p.querySelector(".attach-btn"),L=p.querySelector("[data-file-input]"),T=p.querySelector(".attach-chips");if(!r||!l)return;let C=p.querySelector(".prompt-bar"),y=p.querySelector(".slash-pop"),Z=p.querySelector(".prompt-file-ref-pop"),E=[],g=!1,ri=[],G,S=()=>{if(!T)return;Oi(T,[...E.map((_)=>_.name||"attachment"),...Gi(r.value)])},B=()=>{if(C?.classList.toggle("shell-mode",g),r.setAttribute("placeholder",g?"run shell command in workspace…":"ask pi to do something…"),c)c.disabled=g,c.setAttribute("aria-disabled",g?"true":"false")},J=()=>{let _=r.value;if(l.setAttribute("aria-disabled",_.trim()?"false":"true"),S(),Ap(b,p,r,_,ri,(O)=>{ri=O}),G)clearTimeout(G);G=setTimeout(()=>{Rp(b,p,r,r.value)},120)},ci=()=>{g=!1,B()},li=async(_)=>{_?.preventDefault(),_?.stopImmediatePropagation();let O=r.value.trim();if(J(),!O)return;l.disabled=!0;try{if(g)await yp(b,h,f,O),ci();else{let P=[...E,...await $p(b,O)];qp(O,P),await jp(b,h,f,w,O,P)}if(E=[],S(),r.value.trim()===O)r.value="";if(L)L.value=""}catch(P){A(h,[_p(P)],f.activeSessionId)}finally{l.disabled=!1,B(),J()}};if(i.listen(r,"input",()=>{if(!g&&r.value.startsWith("! "))g=!0,r.value=r.value.slice(2),B();J()}),i.listen(r,"keydown",(_)=>{let O=_;if(O.key===" "&&!g&&r.value==="!"&&r.selectionStart===1&&r.selectionEnd===1){O.preventDefault(),g=!0,r.value="",B(),J();return}if(O.key==="Backspace"&&g&&r.value===""){O.preventDefault(),ci(),J();return}if(O.key==="Escape"){y?.setAttribute("hidden",""),Z?.setAttribute("hidden","");return}if(O.key==="Enter"&&(O.metaKey||O.ctrlKey))li(O)}),i.listen(l,"click",(_)=>{li(_)}),c&&L)i.listen(c,"click",()=>{if(!g)L.click()}),i.listen(L,"change",()=>{Hp(L,(_)=>{E=_,S()})});i.add({remove:()=>{if(G)clearTimeout(G)}}),B()}function _p(i){return{id:j(),role:"system",text:`prompt failed: ${wi(i)}`,createdAt:Date.now()}}async function Hp(i,b){let p=Array.from(i.files||[]).slice(0,rp),h=[];for(let f of p){if(f.size>cp)continue;h.push({name:f.name,size:f.size,content:await f.text(),mimeType:f.type||void 0})}b(h)}async function yp(i,b,p,h){let f=Wi(i,p),w=N(p,f),r={id:j(),role:"user",text:`! ${h}`,createdAt:Date.now()},l={id:j(),role:"tool",text:`$ ${h}
(running...)`,createdAt:Date.now()};w.messages.push(r,l),w.updatedAt=Date.now(),H(p),A(b,w.messages,f);try{let c=await U(i,"runShell",{command:h}),L=typeof c.exitCode==="number"?c.exitCode:1,T=typeof c.durationMs==="number"?c.durationMs:0,C=typeof c.output==="string"?c.output:"";l.text=`$ ${h}
${C}${C.endsWith(`
`)||!C?"":`
`}[exit ${L} · ${T}ms${c.truncated?" · truncated":""}]`}catch(c){l.text=`$ ${h}
${wi(c)}`}w.updatedAt=Date.now(),H(p),A(b,w.messages,f)}async function $p(i,b){let p=Gi(b);if(!p.length)return[];let h=await U(i,"resolveContext",{text:b,refs:p});return Array.isArray(h.attachments)?h.attachments.filter(z):[]}async function Ap(i,b,p,h,f,w){let r=b.querySelector(".slash-pop"),l=b.querySelector(".slash-list"),c=Tb(h);if(c===null||!l){r?.setAttribute("hidden","");return}let L=f;if(!L.length){let C=await U(i,"commands",{});L=Array.isArray(C.commands)?C.commands.filter(z):[],w(L)}if(p.value!==h)return;let T=L.filter((C)=>{return W(C).slice(1).toLowerCase().includes(c)});zp(l,T,p,r),r?.toggleAttribute("hidden",T.length===0)}async function Rp(i,b,p,h){let f=b.querySelector(".prompt-file-ref-pop"),w=b.querySelector(".prompt-file-ref-list"),r=Cb(h);if(r===null||!w){f?.setAttribute("hidden","");return}try{let l=await U(i,"searchFiles",{query:r,limit:wp}),c=Array.isArray(l.files)?l.files.filter(z):[];if(p.value!==h)return;Np(w,p,c,f),f?.toggleAttribute("hidden",c.length===0)}catch{f?.setAttribute("hidden","")}}function zp(i,b,p,h){i.replaceChildren(...b.map((f)=>{let w=document.createElement("button"),r=W(f);return w.type="button",w.className="slash-item",w.dataset.slash=r,w.innerHTML='<span class="sl-name"></span><span class="sl-desc"></span>',w.querySelector(".sl-name").textContent=r,w.querySelector(".sl-desc").textContent=f.description||"",w.addEventListener("click",()=>{p.value=f.template||`${r} `,h?.setAttribute("hidden",""),p.dispatchEvent(new(p.ownerDocument.defaultView?.Event||Event)("input",{bubbles:!0})),p.focus()}),w}))}function Np(i,b,p,h){i.replaceChildren(...p.map((f)=>{let w=f.path||f.name||"",r=document.createElement("button");return r.type="button",r.className="prompt-file-ref-item",r.dataset.path=w,r.disabled=!w,r.innerHTML='<span class="pfr-path"></span><span class="pfr-kind"></span>',r.querySelector(".pfr-path").textContent=w,r.querySelector(".pfr-kind").textContent=typeof f.size==="number"?`${f.size} bytes`:"file",r.addEventListener("click",()=>{Fp(b,w),h?.setAttribute("hidden","")}),r}))}function Fp(i,b){if(!b)return;let{value:p,selectionStart:h}=i,f=p.slice(0,h),w=/(?:^|\s)@([^\s@`]*)$/.exec(f),r=w?h-(w[1]||"").length-1:h,l=`@${b} `;i.value=`${p.slice(0,r)}${l}${p.slice(h)}`;let c=r+l.length;i.setSelectionRange(c,c),i.dispatchEvent(new(i.ownerDocument.defaultView?.Event||Event)("input",{bubbles:!0})),i.focus()}function Db(i){return{input$:i.behaviorSubject("chat.input",""),submitted$:i.subject("chat.input.submitted"),activeSessionId$:i.behaviorSubject("session.activeId",null),sidebarSelectedSession$:i.behaviorSubject(Zi,Up()),toastRequested$:i.subject("toast.requested")}}function Gi(i){let b=[],p=new Set,h=/(^|[\s`])@([^\s@`]+)/g,f=h.exec(String(i||""));while(f!==null){let w=f[2]||"";if((f[1]||"")!=="`"&&w&&!p.has(w))p.add(w),b.push(w);f=h.exec(String(i||""))}return b}function Gb(i=[],b=[]){let p=[],h=new Set;for(let f of[...i,...b]){let w=W(f);if(!w||h.has(w))continue;h.add(w),p.push(f)}return p}function I(i){return i.app?.piWebSidebar?.getSnapshot?.().activeWorkspaceId||i.app?.dataset.activeWorkspaceId||""}function Up(){return Q({})}function Q(i){let b=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),p=b?.activeSessionId||"",h=b?.activeWorkspaceId||"";if(p)return{sessionId:p,workspaceId:h||void 0};let f=x(e),w=x(d);return f?{sessionId:f,workspaceId:w||void 0}:null}function F(i,b){if(b?.workspaceId&&i.app)i.app.dataset.activeWorkspaceId=b.workspaceId,yi(d,b.workspaceId);if(b?.sessionId)i.app?.setAttribute("data-active-session-id",b.sessionId),yi(e,b.sessionId)}function Zp(i){i.app?.removeAttribute("data-active-session-id"),Vp(e),globalThis.piWeb?.behaviorSubject("session.activeId",null).next(null)}function X(i,b,p={}){let h=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),f={type:b,detail:p,snapshot:h};(i.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$)?.next(f),globalThis.piWeb?.subject(Vi).next(f)}function ii(i,b,p){let h=i.app?.dataset.activeWorkspaceId||I(i),f={reason:p,sessionId:b,workspaceId:h};globalThis.piWeb?.behaviorSubject("session.activeId",b).next(b),globalThis.piWeb?.subject("session.changed").next({sessionId:b,workspaceId:h,reason:p}),X(i,"active.start",f),X(i,"session.created",f)}function yi(i,b){try{localStorage.setItem(i,b)}catch{}}function Vp(i){try{localStorage.removeItem(i)}catch{}}async function U(i,b,p={},h=I(i)){if(!i.backend)return{};let f=await i.backend(b,{workspaceId:h,data:p});return z(f)?f:{}}function $i(i){let b=Array.isArray(i.warnings)?i.warnings.filter((p)=>typeof p==="string"&&p.trim().length>0):[];for(let p of b)globalThis.piWeb?.subject("toast.requested").next({level:"warning",message:p})}async function jp(i,b,p,h,f,w){let r=Wi(i,p),l=R(i);h.backendChatToken+=1,h.runEventsAbort?.abort();let c=new AbortController;h.runEventsAbort=c,h.sessionEventsAbort?.abort();let L={id:j(),role:"user",text:f,attachments:ni(w),createdAt:Date.now()},T=N(p,r);T.messages.push(L),T.updatedAt=Date.now(),H(p),A(b,T.messages,r);let C=await Yp(i,f,w,r,l.path,l.id);if($i(C),typeof C.activeSessionId==="string"&&C.activeSessionId){let E=r,g=p.activeSessionId===E;if(r=C.activeSessionId,g)D(p,r),F(i,{sessionId:C.activeSessionId,workspaceId:l.id||void 0}),X(i,"chat-session",{reason:"startPrompt",sessionId:C.activeSessionId}),ii(i,C.activeSessionId,"startPrompt");else N(p,r);Ob(p,E,r,L.id)}if(typeof C.runId!=="string"||!C.runId){let E=await Xp(i,f,w,r,l.path,l.id);$i(E);let g=up(i,p,E,"submitPrompt",r);if(p.activeSessionId===r)A(b,g,r);if(h.runEventsAbort===c)h.runEventsAbort=void 0;return}let y=N(p,r),Z=Qp(y);try{await Dp(i,p,y,C.runId,l.path,l.id,Z,()=>{if(p.activeSessionId===r)A(b,y.messages,r)},c.signal)}finally{if(h.runEventsAbort===c)h.runEventsAbort=void 0}if(p.activeSessionId===r)a(i,b,p,h,r,l.path,l.id)}async function Dp(i,b,p,h,f,w,r,l,c){let L=await Ji(i,"streamEventsSse",{runId:h,cursor:0,workspacePath:f},c,w);if(!L)throw Error("SSE streaming backend did not return a stream");let T=Bi(l);r.streaming=!0,T.flush();try{await qi(L,(C)=>{Kp(r,[C]),r.streaming=C.type!=="run.end",p.updatedAt=Date.now(),H(b),T.request()})}finally{r.streaming=!1,H(b),T.flush()}}function Bi(i){let b=0,p,h=()=>{if(p)clearTimeout(p),p=void 0},f=()=>{h(),b=Date.now(),i()};return{request:()=>{let r=lp-(Date.now()-b);if(r<=0){f();return}p||=setTimeout(f,r)},flush:f,cancel:h}}async function Ji(i,b,p={},h,f=I(i)){if(!i.backendStream)throw Error("SSE streaming backend is unavailable");let w=await i.backendStream(b,{workspaceId:f,data:p},{signal:h});return Gp(w)}function Gp(i){if(typeof ReadableStream<"u"&&i instanceof ReadableStream)return i;if(typeof Response<"u"&&i instanceof Response)return i.body;if(typeof i==="string")return Ai(i);if(!z(i))return null;let b=i.body;if(typeof ReadableStream<"u"&&b instanceof ReadableStream)return b;let p=i.sse;if(typeof p==="string")return Ai(p);return null}function Ai(i){let b=new TextEncoder().encode(i);return new ReadableStream({start(p){p.enqueue(b),p.close()}})}async function qi(i,b){let p=i.getReader(),h=new TextDecoder,f="";while(!0){let w=await p.read();if(w.done){f+=h.decode(),Jp(f,b);return}f+=h.decode(w.value,{stream:!0});let r=Bp(f);f=r.remainder;for(let l of r.frames)Yi(l,b)}}function Bp(i){let p=i.replaceAll(`\r
`,`
`).replaceAll("\r",`
`).split(`

`),h=p.pop()||"";return{frames:p,remainder:h}}function Jp(i,b){let p=i.trim();if(p)Yi(p,b)}function Yi(i,b){let p=i.split(`
`).filter((h)=>h.startsWith("data:")).map((h)=>h.slice(5).trimStart()).join(`
`);if(!p)return;try{let h=JSON.parse(p);if(Wp(h))b(h)}catch{}}function qp(i,b){globalThis.piWeb?.subject("chat.input.submitted").next({text:i,attachments:ni(b)||[]})}async function Yp(i,b,p,h,f=R(i).path,w=R(i).id){try{return await U(i,"startPrompt",Mi(b,p,h,f),w)}catch(r){if(Mp(r))return{};throw r}}function Mp(i){return/unknown method: (startPrompt|streamEventsSse)|unsupported method: (startPrompt|streamEventsSse)|(startPrompt|streamEventsSse) unsupported/i.test(wi(i))}async function Xp(i,b,p,h="",f=R(i).path,w=R(i).id){return await U(i,"submitPrompt",Mi(b,p,h,f),w)}function Mi(i,b,p,h){let f={text:i,attachments:b,sessionId:p};if(h)f.workspacePath=h;return f}function Qp(i){let b=[...i.messages].reverse().find((h)=>h.role==="assistant"&&h.streaming);if(b)return b;let p={id:j(),role:"assistant",text:"",createdAt:Date.now(),streaming:!0};return i.messages.push(p),p}function Kp(i,b){for(let p of b)if(p.type==="text.delta"&&typeof p.delta==="string")i.text+=p.delta;else if(p.type==="thinking.delta"&&typeof p.delta==="string")i.thinking=`${i.thinking||""}${p.delta}`;else if(p.type==="tool.start")o(i,p,"running");else if(p.type==="tool.delta"&&typeof p.delta==="string"){let h=o(i,p,"running");h.text=p.delta}else if(p.type==="tool.end"){let h=o(i,p,p.isError?"err":"ok");if(typeof p.result==="string"&&p.result)h.text=p.result}else if(p.type==="error"&&typeof p.message==="string")i.text+=`${i.text?`
`:""}${p.message}`}function o(i,b,p){let h=b.toolCallId||b.toolName||"tool";i.toolCalls||=[];let f=i.toolCalls.find((w)=>w.id===h);if(!f)f={id:h,name:b.toolName||"tool",args:b.args,text:"",status:p},i.toolCalls.push(f);if(f.status=p,Pp(f,b))f.args=b.args,f.argsStatus=b.argsStatus;return f}function Pp(i,b){if(!b.argsStatus)return Boolean(b.args);if(b.argsStatus==="unavailable")return!i.argsStatus;return!0}function Wp(i){return z(i)&&typeof i.type==="string"}async function a(i,b,p,h,f="",w=pi(i),r=R(i).id){if(!i.backendStream){await Ri(i,b,p,h,f,w);return}let l=++h.backendChatToken;h.sessionEventsAbort?.abort();let c=new AbortController;h.sessionEventsAbort=c;let L=Bi(()=>{A(b,K(p).messages,p.activeSessionId)});try{let T=await Ji(i,"sessionEventsSse",Xi(i,f,w),c.signal,r);if(!T)throw Error("session SSE backend did not return a stream");await qi(T,(C)=>{if(l!==h.backendChatToken||C.type!=="chat.state")return;if(Ki(i,p,vp(C),"chatState").length)L.request()})}catch(T){if(!c.signal.aborted)await Ri(i,b,p,h,f,w)}finally{if(L.cancel(),h.sessionEventsAbort===c)h.sessionEventsAbort=void 0}}async function Ri(i,b,p,h,f="",w=pi(i)){let r=++h.backendChatToken;try{let l=await U(i,"chatState",Xi(i,f,w));if(r!==h.backendChatToken)return;let c=Ki(i,p,l,"chatState");if(c.length)A(b,c,p.activeSessionId)}catch{}}function Xi(i,b,p=pi(i)){let h=b?{sessionId:b}:{};if(p)h.workspacePath=p;return h}function vp(i){return{activeSessionId:i.activeSessionId,messages:i.messages,isStreaming:i.isStreaming}}function pi(i){return R(i).path}function R(i){let b=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),p=b?.activeWorkspaceId||i.app?.dataset.activeWorkspaceId||"",h=b?.workspaces?.find((f)=>f.id===p)?.path||"";return{id:p,path:h}}function Qi(i,b){let p=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),h=b.workspaceId||p?.activeWorkspaceId||i.app?.dataset.activeWorkspaceId||"",f=p?.workspaces?.find((w)=>w.id===h)?.path||"";if(f||h!==p?.activeWorkspaceId)return{id:h,path:f};return R(i)}function Ki(i,b,p,h){let f=fi(p.messages);if(typeof p.activeSessionId==="string"&&p.activeSessionId){let l=b.activeSessionId;if(D(b,p.activeSessionId),F(i,{sessionId:p.activeSessionId,workspaceId:i.app?.dataset.activeWorkspaceId||I(i)||void 0}),h!=="chatState"||l!==p.activeSessionId)X(i,"chat-session",{reason:h,sessionId:p.activeSessionId});if(h!=="chatState")ii(i,p.activeSessionId,h)}let w=K(b);if(!f.length)return[];let r=mi(w.messages,f).slice(-M);if(!Pi(w.messages,r))return[];if(w.messages=r,w.title==="New chat"){let l=w.messages.find((c)=>c.role==="user");if(l)w.title=l.text.slice(0,48)||w.title}return w.updatedAt=Date.now(),H(b),w.messages}function Pi(i,b){if(i.length!==b.length)return!0;return i.some((p,h)=>zi(p)!==zi(b[h]))}function zi(i){return JSON.stringify({id:i.id,role:i.role,text:i.text,thinking:i.thinking,streaming:i.streaming,toolCalls:i.toolCalls,attachments:i.attachments})}function up(i,b,p,h,f){let w=fi(p.messages),r=typeof p.activeSessionId==="string"&&p.activeSessionId?p.activeSessionId:f,l=b.activeSessionId===f;if(r!==f)if(l)D(b,r),F(i,{sessionId:r,workspaceId:R(i).id||void 0}),X(i,"chat-session",{reason:h,sessionId:r}),ii(i,r,h);else N(b,r);let c=N(b,r);if(!w.length)return[];let L=mi(c.messages,w).slice(-M);if(!Pi(c.messages,L))return[];return c.messages=L,c.updatedAt=Date.now(),H(b),c.messages}function kp(i,b,p,h,f){let w=(L)=>{if(!L?.sessionId)return;if(vi(b,h,L))return;F(b,L),D(h,L.sessionId),A(p,K(h).messages,h.activeSessionId);let T=Qi(b,L);a(b,p,h,f,L.sessionId,T.path,T.id)},r=(L)=>{if(xp(b,p,h,f,L))return;let T=Ip(b,L);if(T)w(T)},l=b.app?.piWebSidebar?.channels?.selectedSession$||globalThis.piWebSidebar?.channels?.selectedSession$,c=b.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$;if(l)i.add(l.subscribe(w));if(c)i.add(c.subscribe(r));if(b.app)i.listen(b.app,"pi-web-sidebar:session-created",(L)=>{let T=L.detail||{},C=typeof T.sessionId==="string"?T.sessionId:"",y=typeof T.workspaceId==="string"?T.workspaceId:"";if(C)w({sessionId:C,workspaceId:y||void 0})});if(globalThis.piWeb)i.add(globalThis.piWeb.behaviorSubject(Zi,Q(b)).subscribe(w)),i.add(globalThis.piWeb.subject(Vi).subscribe(r)),i.add(globalThis.piWeb.behaviorSubject("session.activeId",null).subscribe((L)=>{if(!L)return;w({sessionId:L,workspaceId:b.app?.dataset.activeWorkspaceId||x(d)||void 0})}))}function Wi(i,b){let p=Q(i);if(p?.sessionId&&!vi(i,b,p))F(i,p),D(b,p.sessionId);return b.activeSessionId}function vi(i,b,p){let h=p.workspaceId||"",f=i.app?.dataset.activeWorkspaceId||x(d)||"";return b.activeSessionId===p.sessionId&&(!h||h===f)}function xp(i,b,p,h,f){if(f.type!=="session.deleted")return!1;let w=ui(f);if(!w)return!0;let r=p.activeSessionId===w,l=p.sessions.length;if(p.sessions=p.sessions.filter((c)=>c.id!==w),r){h.runEventsAbort?.abort(),h.sessionEventsAbort?.abort();let c=dp(i,f,w);if(c?.sessionId){F(i,c),D(p,c.sessionId),Sp(b,K(p).messages,p.activeSessionId);let L=Qi(i,c);return a(i,b,p,h,c.sessionId,L.path,L.id),!0}return p.activeSessionId="",Zp(i),H(p),bi(b),!0}if(p.sessions.length!==l)H(p);return!0}function dp(i,b,p){let h=b.snapshot?.activeSessionId||"",f=b.snapshot?.activeWorkspaceId||"";if(h&&h!==p)return{sessionId:h,workspaceId:f||void 0};let w=Q(i);if(w?.sessionId&&w.sessionId!==p)return w;return null}function Ip(i,b){if(!ap(b.type))return null;let p=b.detail||{},h=ui(b)||b.snapshot?.activeSessionId||"",f=typeof p.workspaceId==="string"?p.workspaceId:b.snapshot?.activeWorkspaceId||i.app?.dataset.activeWorkspaceId||"";if(!h)return null;return{sessionId:h,workspaceId:f||void 0}}function ui(i){let b=i.detail||{};if(typeof b.sessionId==="string")return b.sessionId;if(typeof b.id==="string")return b.id;return""}function ap(i){return i==="session.selected"||i==="session.created"||i==="new-session"||i==="active.start"}function D(i,b){let p=i.sessions.find((h)=>h.id===b);if(!p)p=k(b),i.sessions.unshift(p);return i.activeSessionId=p.id,H(i),p}function A(i,b,p){if(di(b,p),!b.length){bi(i);return}(i.querySelector(".term-inner")||i).replaceChildren(...b.map((f)=>xi(f,p))),hi(i)}function Sp(i,b,p){di(b,p),(i.querySelector(".term-inner")||i).replaceChildren(...b.map((f)=>xi(f,p))),hi(i)}function bi(i){let b=i.querySelector(".term-inner")||i,p=document.createElement("article");p.className="pi-web-chat-docs",p.setAttribute("aria-label","pi-web-chat guide");let h=document.createElement("h1");h.textContent="pi-web-chat guide";let f=document.createElement("p");f.textContent=["Select or create a session in the sidebar to load chat history,","or type below to start a new session."].join(" ");let w=document.createElement("ul");for(let r of["Ask pi in the prompt box and press Cmd/Ctrl+Enter to send.","Type ! then Space at the start to turn the prompt yellow and run shell commands in the workspace.","Type @ to list project files, then pick one to tag it as prompt context.","Type / at the start to open the slash command list.","Chats are cached locally after you start or select a session."]){let l=document.createElement("li");l.textContent=r,w.append(l)}p.append(h,f,w),b.replaceChildren(p),hi(i)}function mp(i,b){let p=b.querySelector(".term"),h=b.querySelector("[data-action='scroll-bottom']");if(!p||!h)return;let f={term:p,button:h,pinned:!0,touchStartY:null};s.set(b,f),h.hidden=!1,u(f),i.listen(h,"click",()=>{f.pinned=!0,ki(f),u(f)}),i.listen(p,"wheel",(w)=>{if(w.deltaY<0)Ni(f)}),i.listen(p,"touchstart",(w)=>{let r=w;f.touchStartY=r.touches.item(0)?.clientY??null}),i.listen(p,"touchmove",(w)=>{let l=w.touches.item(0)?.clientY;if(typeof l==="number"&&f.touchStartY!==null&&l-f.touchStartY>8)Ni(f)}),i.listen(p,"touchend",()=>{f.touchStartY=null}),i.add({remove:()=>{s.delete(b)}})}function hi(i){let b=s.get(i);if(!b)return;if(b.pinned)ki(b);u(b)}function ki(i){i.term.scrollTop=i.term.scrollHeight}function Ni(i){i.pinned=!1,u(i)}function u(i){i.button.dataset.pinned=i.pinned?"true":"false",i.button.setAttribute("aria-pressed",i.pinned?"true":"false")}function xi(i,b){let p=document.createElement("article");p.className="transcript-item",p.dataset.messageId=i.id;let h=document.createElement("div");h.className="msg",h.dataset.kind=t(i.role);let f=document.createElement("span");f.className=`prefix ${t(i.role)}`,f.textContent=Lb(i.role);let w=document.createElement("pre");if(w.className=`body ${t(i.role)}`,w.textContent=i.text,h.append(f,w),np(i))p.append(h);if(i.thinking)p.append(op(i.thinking,Boolean(i.streaming)));for(let r of i.toolCalls||[])p.append(tp(r,Ii(b,i,r)));if(i.streaming)p.dataset.streaming="true";return p}function np(i){let b=i.text.trim().length>0;return i.role!=="assistant"||b}function op(i,b){let p=document.createElement("details");p.className="msg-detail think thinking-block",p.open=b;let h=document.createElement("summary");h.className="label",h.textContent="THINKING";let f=document.createElement("pre");return f.className="body",f.textContent=i,p.append(h,f),p}function di(i,b){let p=new Set;for(let h of i)for(let f of h.toolCalls||[])p.add(Ii(b,h,f));for(let h of V)if(!p.has(h))V.delete(h)}function Ii(i,b,p){return`${i}:${b.id}:${p.id}`}function tp(i,b){let p=document.createElement("div");p.className="tool-card",p.dataset.tool=i.name||"tool",p.dataset.status=i.status;let h=!V.has(b);p.dataset.collapsed=h?"true":"false";let f=document.createElement("button");if(f.type="button",f.className="tc-head",f.title=h?"Show tool output":"Hide tool output",f.setAttribute("aria-expanded",h?"false":"true"),f.setAttribute("aria-label",`${h?"Show":"Hide"} ${i.name||"tool"} output`),f.append(pb(i),bb(i),hb(i),fb(i,h)),!h)p.append(ai(i));return f.addEventListener("click",()=>ib(p,f,i,b)),p.prepend(f),p}function ai(i){let b=document.createElement("pre");return b.className="tc-body",b.textContent=i.text||wb(i),b}function sp(i,b){let p=0,h,f=b.ownerDocument.defaultView,w=typeof f?.matchMedia==="function"?f.matchMedia("(prefers-reduced-motion: reduce)"):void 0,r=()=>{if(h)clearInterval(h),h=void 0},l=()=>{p=(p+1)%ji;for(let T of b.querySelectorAll(".spinner"))T.dataset.frame=String(p)},c=()=>{let T=b.querySelectorAll(".spinner");if(w?.matches||T.length===0){r(),p=0;for(let C of T)C.dataset.frame="0";return}if(!h)h=setInterval(l,Lp)},L=new(f?.MutationObserver||MutationObserver)(c);L.observe(b,{childList:!0,subtree:!0}),w?.addEventListener("change",c),c(),i.add({remove:()=>{L.disconnect(),w?.removeEventListener("change",c),r()}})}function ep(){let i=document.createElement("span");i.className="spinner",i.dataset.frame="0",i.setAttribute("aria-hidden","true");for(let b=0;b<ji;b+=1)i.append(document.createElement("span"));return i}function ib(i,b,p,h){let f=i.querySelector(".tc-body"),w=f!==null;if(f)f.remove(),V.delete(h);else i.append(ai(p)),V.add(h);i.dataset.collapsed=w?"true":"false",b.setAttribute("aria-expanded",w?"false":"true"),b.setAttribute("aria-label",`${w?"Show":"Hide"} ${i.dataset.tool||"tool"} output`),b.title=w?"Show tool output":"Hide tool output";let r=b.querySelector(".tc-toggle-label");if(r)r.textContent=w?"show":"hide"}function pb(i){let b=document.createElement("span");b.className="tc-glyph";let p=rb(i),h=p?Tp[p]:"";if(!p||!h)return b.textContent="●",b;return b.innerHTML=`<svg class="tc-icon" data-tool-icon="${p}" aria-hidden="true" viewBox="0 0 24 24">${h}</svg>`,b}function bb(i){let b=document.createElement("span");return b.className="tc-name",b.textContent=i.name||"tool",b}function hb(i){let b=document.createElement("span");return b.className="tc-args",b.textContent=Si(i),b}function fb(i,b){let p=document.createElement("span");if(p.className="tc-meta",i.status==="running"){let w=ep(),r=document.createElement("span");return r.className="running",r.textContent="running",p.append(w,r,Fi(b)),p}let h=document.createElement("span");h.className=i.status==="err"?"err":"ok",h.textContent=i.status==="err"?"✗":"✓";let f=document.createElement("span");return f.textContent=i.status==="err"?" · failed":" · done",p.append(h,f,Fi(b)),p}function Fi(i){let b=document.createElement("span");b.className="tc-toggle";let p=document.createElement("span");p.className="tc-toggle-label",p.textContent=i?"show":"hide";let h=document.createElement("span");return h.className="tc-caret",h.textContent="▸",b.append(p,h),b}function Si(i){if(i.argsStatus==="truncated")return"arguments truncated";if(i.argsStatus==="omitted")return"arguments omitted";if(i.argsStatus==="unavailable")return"arguments unavailable";if(i.argsStatus==="empty")return"no arguments";if(!i.args)return"";return JSON.stringify(i.args)}function wb(i){if(i.argsStatus==="truncated")return"arguments truncated: too large to display";if(i.argsStatus==="omitted")return"arguments omitted: response too large";if(i.argsStatus==="unavailable")return"arguments unavailable";if(i.argsStatus==="empty")return"no arguments";if(!i.args)return"arguments unavailable";return JSON.stringify(i.args,null,2)}function rb(i){let b=cb(i.name);if(["bash","shell","sh","zsh","terminal"].includes(b))return lb(Si(i).toLowerCase())||"terminal";return Cp[b]}function cb(i){return i.trim().replace(/^functions\./,"").replace(/^multi_tool_use\./,"")}function lb(i){if(/\bgit\b|\bgh\b/.test(i))return"git-branch";if(/\b(go test|bun test|npm test|pnpm test|yarn test|vitest|pytest|cargo test)\b/.test(i))return"circle-check";if(/\b(bun|npm|pnpm|yarn)\s+(run\s+)?build\b|\b(go build|cargo build)\b/.test(i))return"hammer";if(/\b(bun|npm|pnpm|yarn)\s+(add|install|i)\b|\bpip\s+install\b|\bgo\s+get\b/.test(i))return"package";return}function Lb(i){if(i==="assistant")return"pi >";if(i==="user")return"you >";if(i==="system")return"sys >";return"tool >"}function t(i){if(i==="assistant")return"pi";if(i==="system")return"sys";return i}function Tb(i){let b=/^\/([^\s/]*)$/.exec(i);return b?b[1].toLowerCase():null}function Cb(i){let b=/(?:^|\s)@([^\s@`]*)$/.exec(i);return b?b[1]:null}function mi(i,b){let p=new Map;for(let h of i)p.set(h.id,h);for(let h of b)p.set(h.id,{...p.get(h.id),...h});return[...p.values()].sort((h,f)=>h.createdAt-f.createdAt)}function K(i){return N(i,i.activeSessionId,!0)}function N(i,b,p=!1){let h=i.sessions.find((f)=>f.id===b);if(!h)h=k(b||void 0),i.sessions.unshift(h),H(i);if(p||!i.activeSessionId)i.activeSessionId=h.id,H(i);return h}function Ob(i,b,p,h){if(b===p)return;let f=i.sessions.find((c)=>c.id===b),w=f?.messages.findIndex((c)=>c.id===h)??-1;if(!f||w<0)return;let[r]=f.messages.splice(w,1),l=N(i,p);if(!l.messages.some((c)=>c.id===r.id))l.messages.push(r);f.updatedAt=Date.now(),l.updatedAt=Date.now(),H(i)}function k(i=j()){let b=Date.now();return{id:i,title:"New chat",createdAt:b,updatedAt:b,messages:[]}}function x(i){try{return localStorage.getItem(i)||""}catch{return""}}function gb(i=""){try{let p=JSON.parse(localStorage.getItem(v)||"null");if(p&&typeof p.activeSessionId==="string"&&Array.isArray(p.sessions)){let h=p.sessions.filter(oi).map(_b);if(i&&!h.some((f)=>f.id===i))h.unshift(k(i));return{activeSessionId:i||p.activeSessionId,sessions:h}}}catch{}let b=k(i||void 0);return{activeSessionId:b.id,sessions:[b]}}function Eb(){try{let i=JSON.parse(localStorage.getItem(v)||"null");return Boolean(i&&Array.isArray(i.sessions)&&i.sessions.some(oi))}catch{return!1}}function H(i){Ui(i);try{localStorage.setItem(v,JSON.stringify(i))}catch{for(let b of i.sessions)b.messages=b.messages.slice(-Math.floor(M/2));Ui(i);try{localStorage.setItem(v,JSON.stringify(i))}catch{}}}function ni(i){if(!i?.length)return;return i.map(({content:b,...p})=>p)}function Ui(i){i.sessions.sort((h,f)=>f.updatedAt-h.updatedAt);let b=i.sessions.find((h)=>h.id===i.activeSessionId),p=i.sessions.filter((h)=>h.id!==i.activeSessionId).slice(0,Math.max(0,Hi-1));i.sessions=b?[b,...p]:i.sessions.slice(0,Hi);for(let h of i.sessions)if(h.messages.length>M)h.messages.splice(0,h.messages.length-M)}function oi(i){return z(i)&&typeof i.id==="string"&&Array.isArray(i.messages)}function _b(i){return{...i,messages:fi(i.messages)}}function fi(i){return Array.isArray(i)?i.filter(Rb).map(Hb):[]}function Hb(i){if(!Array.isArray(i.toolCalls)){let{toolCalls:b,...p}=i;return p}return{...i,toolCalls:i.toolCalls.filter(yb)}}function yb(i){if(!z(i)||typeof i.id!=="string"||typeof i.name!=="string")return!1;return typeof i.text==="string"&&Ab(i.status)&&$b(i.argsStatus)}function $b(i){return i===void 0||i==="present"||i==="empty"||i==="unavailable"||i==="truncated"||i==="omitted"}function Ab(i){return i==="running"||i==="ok"||i==="err"}function Rb(i){if(!z(i)||typeof i.id!=="string"||typeof i.text!=="string")return!1;return typeof i.createdAt==="number"&&zb(i.role)}function zb(i){return i==="user"||i==="assistant"||i==="tool"||i==="system"}function z(i){return typeof i==="object"&&i!==null}function j(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`}function wi(i){return i instanceof Error?i.message:String(i)}export{si as renderMessages,bp as promptFromAgUiLikeRunInput,gi as pluginStyleText,n as pluginClass,Gb as mergeCommands,I as getActiveWorkspaceId,Gi as extractRefs,Op as default,Ti as createComposerSurface,Li as createChatSurface,ti as createChatDom,Db as createChannels,pp as createAgUiLikeRunInput,W as commandName,hp as chatEventsToAgUiLikeEvents,U as backendCall};
