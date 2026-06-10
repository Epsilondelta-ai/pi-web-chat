var B={attachFile:["M16.5 6v11.5a4 4 0 0 1-8 0V5a2.5 2.5 0 0 1 5 0v10.5a1 1 0 0 1-2 0V6H10v9.5","a2.5 2.5 0 0 0 5 0V5a4 4 0 0 0-8 0v12.5a5.5 5.5 0 0 0 11 0V6h-1.5Z"].join(""),stop:"M6 6h12v12H6V6Z",send:"M2 21 23 12 2 3v7l15 2-15 2v7Z",terminal:"M3 4h18v16H3V4Zm2 2v12h14V6H5Zm2 3 1.1-1.1L12.2 12l-4.1 4.1L7 15l3-3-3-3Zm6 6h5v1.5h-5V15Z",file:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 2.5L17.5 8H14V4.5ZM8 13h8v1.5H8V13Zm0 3h8v1.5H8V16Z"},W={attachFile:U("attach_file",B.attachFile),stop:U("stop",B.stop),send:U("send",B.send)};function U(i,p){return`<svg class="material-icon" data-material-icon="${i}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="${p}"></path></svg>`}function x(){return"pi-web-chat-mounted"}function e(){let i=document.createElement("main");return i.className="main pi-web-chat-surface",i.dataset.main="session",i.innerHTML='<div class="term"><div class="term-inner" role="log" aria-live="polite" aria-relevant="additions text"></div></div><button type="button" class="scroll-bottom-btn" data-action="scroll-bottom" aria-label="stick to bottom" title="stick to bottom" aria-pressed="true" hidden>↓</button>',i}function ii(){let i=document.createElement("section");return i.className="prompt-region pi-web-chat-composer",i.innerHTML=`
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
    <div class="prompt-meta" data-prompt-meta>— | <span class="prompt-meta-item prompt-meta-branch"><span>—</span></span></div>`,i}function pi(i){let p=document.createElement("span");return p.className="prompt-meta-item pi-web-chat-badge",p.textContent="chat plugin",i.querySelector("[data-prompt-meta]")?.append(p),p}function xi(){let i=document.createElement("section");return i.className="pi-web-chat-root",i.dataset.plugin="pi-web-chat",i.innerHTML=`
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
        <button class="pi-web-chat-icon-btn" type="button" data-attach aria-label="attach files" title="attach files">${U("attach_file",B.attachFile)}</button>
        <input type="file" multiple hidden data-file-input />
        <textarea class="pi-web-chat-textarea" data-chat-input aria-label="Prompt" placeholder="ask pi to do something…" rows="1"></textarea>
        <button class="pi-web-chat-send" type="button" data-send aria-label="send" title="send" aria-disabled="true">${U("send",B.send)}</button>
      </div>
    </section>`,{root:i,transcript:g(i.querySelector("[data-chat-transcript]")),textarea:g(i.querySelector("[data-chat-input]")),sendButton:g(i.querySelector("[data-send]")),attachButton:g(i.querySelector("[data-attach]")),fileInput:g(i.querySelector("[data-file-input]")),slashPopover:g(i.querySelector("[data-slash-popover]")),slashList:g(i.querySelector("[data-slash-list]")),refsPopover:g(i.querySelector("[data-refs-popover]")),refsList:g(i.querySelector("[data-refs-list]")),attachments:g(i.querySelector("[data-attachments]"))}}function vi(i,p){i.replaceChildren(...p.map(ki)),i.scrollTop=i.scrollHeight}function ki(i){let p=document.createElement("article");p.className=`pi-web-chat-message pi-web-chat-message-${i.role}`,p.dataset.messageId=i.id;let h=document.createElement("div");h.className="pi-web-chat-message-role",h.textContent=i.role;let b=document.createElement("pre");if(b.className="pi-web-chat-message-body",b.textContent=i.text,p.append(h,b),i.thinking){let r=document.createElement("details");r.className="pi-web-chat-thinking",r.open=Boolean(i.streaming);let f=document.createElement("summary");f.textContent="thinking";let c=document.createElement("pre");c.textContent=i.thinking,r.append(f,c),p.append(r)}if(i.toolCalls?.length){let r=document.createElement("div");r.className="pi-web-chat-tools";for(let f of i.toolCalls){let c=document.createElement("details");c.className=`pi-web-chat-tool pi-web-chat-tool-${f.status}`,c.open=f.status==="running";let l=document.createElement("summary");l.textContent=`${f.name} · ${f.status}`;let w=document.createElement("pre");w.textContent=f.text||ai(f),c.append(l,w),r.append(c)}p.append(r)}if(i.streaming){let r=document.createElement("div");r.className="pi-web-chat-message-meta",r.textContent="streaming...",p.append(r)}if(i.attachments?.length){let r=document.createElement("div");r.className="pi-web-chat-message-meta",r.textContent=`${i.attachments.length} attachment(s)`,p.append(r)}return p}function ai(i){if(i.argsStatus==="truncated")return"arguments truncated: too large to display";if(i.argsStatus==="omitted")return"arguments omitted: response too large";if(i.argsStatus==="unavailable")return"arguments unavailable";if(i.argsStatus==="empty")return"no arguments";if(!i.args)return"arguments unavailable";return JSON.stringify(i.args,null,2)}function hi(i,p){i.hidden=p.length===0,i.replaceChildren(...p.map((h)=>{let b=document.createElement("span");return b.className="pi-web-chat-attachment-chip",b.textContent=h,b}))}function bi(){return`
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
  `}function ri(){document.getElementById("pi-web-chat-style")?.remove();let i=document.createElement("style");return i.id="pi-web-chat-style",i.textContent=bi(),document.head.append(i),i}function fi(i){return i.command||i.cmd||(i.name?`/${i.name}`:"")}function g(i){if(!i)throw Error("pi-web-chat DOM template is invalid");return i}function ni(i,p,h){return{threadId:i,runId:p,state:{},messages:h,tools:[],context:[]}}function di(i){let p=[...i.messages].reverse().find((h)=>h.role==="user");return{text:p?.text||"",attachments:p?.attachments||[],sessionId:i.threadId}}function mi(i,p,h){return i.map((b)=>Ii(b,p,h))}function Ii(i,p,h){if(i.type==="text.delta")return{type:"TEXT_MESSAGE_CONTENT",threadId:p,runId:h,delta:i.delta||""};if(i.type==="thinking.delta")return{type:"THINKING_MESSAGE_CONTENT",threadId:p,runId:h,delta:i.delta||""};if(i.type==="tool.start")return{type:"TOOL_CALL_START",threadId:p,runId:h,toolCallId:i.toolCallId,payload:ci(i)};if(i.type==="tool.delta")return{type:"TOOL_CALL_ARGS",threadId:p,runId:h,toolCallId:i.toolCallId,delta:i.delta||""};if(i.type==="tool.end")return{type:"TOOL_CALL_END",threadId:p,runId:h,toolCallId:i.toolCallId,payload:ci(i)};return{type:i.type.toUpperCase().replaceAll(".","_"),threadId:p,runId:h,payload:i}}function ci(i){return{name:i.toolName||"tool",args:i.args||{},result:i.result||"",isError:i.isError===!0}}var j="pi-web-chat.sessions.v1";var _i="plugin.pi-web-sidebar.selectedSession",gi="plugin.pi-web-sidebar.event",n="plugin.pi-web-sidebar.activeSessionId",X="plugin.pi-web-sidebar.activeWorkspaceId";var wi=20,Z=200,Si=8,oi=1e6;var ti=250,Hi=6,si=150,z=new Set,ei={"book-open":'<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',"file-plus":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="M9 15h6"/>',pencil:'<path d="M21.2 6.8 17.2 2.8a2 2 0 0 0-2.8 0L3 14.2V21h6.8L21.2 9.6a2 2 0 0 0 0-2.8z"/><path d="m14 5 5 5"/>',terminal:'<path d="m4 17 6-6-6-6"/><path d="M12 19h8"/>',cpu:'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 15h3"/><path d="M1 9h3"/><path d="M1 15h3"/>',globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 0 20"/><path d="M12 2a15.3 15.3 0 0 0 0 20"/>',search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',braces:'<path d="M8 3H7a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-4a2 2 0 0 1 2-2 2 2 0 0 1-2-2V7a2 2 0 0 0-2-2h-1"/>',"file-text":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',"circle-question-mark":'<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 1 1 5.8 1c-.5 1-1.4 1.5-2.1 2-.6.4-.8.8-.8 2"/><path d="M12 17h.01"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',plug:'<path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a6 6 0 0 1-12 0V8Z"/>',"git-branch":'<line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',"circle-check":'<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',hammer:'<path d="m15 12-8.5 8.5a2.1 2.1 0 0 1-3-3L12 9"/><path d="m17.6 5.4 1.8-1.8"/><path d="m14 7 3 3"/><path d="M5 11 2 8l6-6 3 3"/>',package:'<path d="m7.5 4.3 9 5.2"/><path d="M21 8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>'},a=new WeakMap,ip={read:"book-open",write:"file-plus",edit:"pencil",ctx_execute:"cpu",ctx_batch_execute:"cpu",ctx_execute_file:"cpu",ctx_search:"cpu",ctx_index:"cpu",ctx_fetch_and_index:"cpu",web_search:"globe",fetch_content:"search",get_search_content:"search",code_search:"braces",document_parse:"file-text",ask_user_question:"circle-question-mark",teams:"users",subagent:"users",mcp:"plug",git:"git-branch"};class Ri{#i=[];add(i){if(i)this.#i.push(i);return i}listen(i,p,h){i.addEventListener(p,h),this.add({remove:()=>i.removeEventListener(p,h)})}dispose(){for(let i of this.#i.splice(0).reverse())if(typeof i==="function")i();else if("unsubscribe"in i)i.unsubscribe();else i.remove()}}function pp(i={}){let p=i.app;if(p?.piWebChat?.dispose(),typeof i.mount?.chat!=="function"||typeof i.mount?.composer!=="function")throw Error("pi-web-chat requires modern pi-web mount.chat and mount.composer APIs");return hp(i,p)}function hp(i,p){let h=new Ri,b=h.add(ri()),r=e(),f=ii(),c=i.mount?.chat(r,{replace:!0}),l=i.mount?.composer(f,{replace:!0});if(Gp(h,r),Yp(h,r),c)h.add(c);if(l)h.add(l);let w=D(i);u(i,w||void 0);let L=!w?.sessionId&&!Sp(),T=Ip(w?.sessionId||""),C={backendChatToken:0};if(L)S(r);else $(r,G(T).messages,T.activeSessionId),K(i,r,T,C,w?.sessionId||T.activeSessionId);Mp(h,i,r,T,C),bp(h,i,f,r,T,C);let E=p?h.add(pi(p)):void 0;p?.classList.add(x());let A=()=>{if(C.runEventsAbort?.abort(),C.sessionEventsAbort?.abort(),h.dispose(),z.clear(),E?.remove(),b.remove(),p?.classList.remove(x()),p?.piWebChat===_)delete p.piWebChat},_={dispose:A};if(p)p.piWebChat=_;return A}function bp(i,p,h,b,r,f){let c=h.querySelector(".prompt-textarea"),l=h.querySelector(".send-btn"),w=h.querySelector(".attach-btn"),L=h.querySelector("[data-file-input]"),T=h.querySelector(".attach-chips");if(!c||!l)return;let C=[],E=()=>{let O=c.value;l.setAttribute("aria-disabled",O.trim()?"false":"true")},A=()=>{if(!T)return;hi(T,C.map((O)=>{return O.name||"attachment"}))},_=async(O)=>{O?.preventDefault(),O?.stopImmediatePropagation();let H=c.value.trim();if(E(),!H)return;let s=[...C];l.disabled=!0;try{if(yp(H,s),await Lp(p,b,r,f,H,s),C=[],A(),c.value.trim()===H)c.value="";if(L)L.value=""}catch(Wi){$(b,[rp(Wi)],r.activeSessionId)}finally{l.disabled=!1,E()}};if(i.listen(c,"input",E),i.listen(c,"keydown",(O)=>{let H=O;if(H.key==="Enter"&&(H.metaKey||H.ctrlKey))_(H)}),i.listen(l,"click",(O)=>{_(O)}),w&&L)i.listen(w,"click",()=>L.click()),i.listen(L,"change",()=>{fp(L,(O)=>{C=O,A()})})}function rp(i){return{id:P(),role:"system",text:`prompt failed: ${Pi(i)}`,createdAt:Date.now()}}async function fp(i,p){let h=Array.from(i.files||[]).slice(0,Si),b=[];for(let r of h){if(r.size>oi)continue;b.push({name:r.name,size:r.size,content:await r.text(),mimeType:r.type||void 0})}p(b)}function Lh(i){return{input$:i.behaviorSubject("chat.input",""),submitted$:i.subject("chat.input.submitted"),activeSessionId$:i.behaviorSubject("session.activeId",null),sidebarSelectedSession$:i.behaviorSubject(_i,cp()),toastRequested$:i.subject("toast.requested")}}function Th(i){let p=[],h=new Set,b=/(^|[\s`])@([^\s@`]+)/g,r=b.exec(String(i||""));while(r!==null){let f=r[2]||"";if((r[1]||"")!=="`"&&f&&!h.has(f))h.add(f),p.push(f);r=b.exec(String(i||""))}return p}function Ch(i=[],p=[]){let h=[],b=new Set;for(let r of[...i,...p]){let f=fi(r);if(!f||b.has(f))continue;b.add(f),h.push(r)}return h}function Q(i){return i.app?.piWebSidebar?.getSnapshot?.().activeWorkspaceId||i.app?.dataset.activeWorkspaceId||""}function cp(){return D({})}function D(i){let p=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),h=p?.activeSessionId||"",b=p?.activeWorkspaceId||"";if(h)return{sessionId:h,workspaceId:b||void 0};let r=Y(n),f=Y(X);return r?{sessionId:r,workspaceId:f||void 0}:null}function u(i,p){if(p?.workspaceId&&i.app)i.app.dataset.activeWorkspaceId=p.workspaceId,li(X,p.workspaceId);if(p?.sessionId)i.app?.setAttribute("data-active-session-id",p.sessionId),li(n,p.sessionId)}function wp(i){i.app?.removeAttribute("data-active-session-id"),lp(n),globalThis.piWeb?.behaviorSubject("session.activeId",null).next(null)}function V(i,p,h={}){let b=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),r={type:p,detail:h,snapshot:b};(i.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$)?.next(r),globalThis.piWeb?.subject(gi).next(r)}function d(i,p,h){let b=i.app?.dataset.activeWorkspaceId||Q(i),r={reason:h,sessionId:p,workspaceId:b};globalThis.piWeb?.behaviorSubject("session.activeId",p).next(p),globalThis.piWeb?.subject("session.changed").next({sessionId:p,workspaceId:b,reason:h}),V(i,"active.start",r),V(i,"session.created",r)}function li(i,p){try{localStorage.setItem(i,p)}catch{}}function lp(i){try{localStorage.removeItem(i)}catch{}}async function m(i,p,h={},b=Q(i)){if(!i.backend)return{};let r=await i.backend(p,{workspaceId:b,data:h});return F(r)?r:{}}async function Lp(i,p,h,b,r,f){let c=Fp(i,h),l=R(i);b.backendChatToken+=1,b.runEventsAbort?.abort();let w=new AbortController;b.runEventsAbort=w,b.sessionEventsAbort?.abort();let L={id:P(),role:"user",text:r,attachments:Qi(f),createdAt:Date.now()},T=N(h,c);T.messages.push(L),T.updatedAt=Date.now(),y(h),$(p,T.messages,c);let C=await _p(i,r,f,c,l.path,l.id);if(typeof C.activeSessionId==="string"&&C.activeSessionId){let _=c,O=h.activeSessionId===_;if(c=C.activeSessionId,O)M(h,c),u(i,{sessionId:C.activeSessionId,workspaceId:l.id||void 0}),V(i,"chat-session",{reason:"startPrompt",sessionId:C.activeSessionId}),d(i,C.activeSessionId,"startPrompt");else N(h,c);mp(h,_,c,L.id)}if(typeof C.runId!=="string"||!C.runId){let _=await Hp(i,r,f,c,l.path,l.id),O=zp(i,h,_,"submitPrompt",c);if(h.activeSessionId===c)$(p,O,c);if(b.runEventsAbort===w)b.runEventsAbort=void 0;return}let E=N(h,c),A=Rp(E);try{await Tp(i,h,E,C.runId,l.path,l.id,A,()=>{if(h.activeSessionId===c)$(p,E.messages,c)},w.signal)}finally{if(b.runEventsAbort===w)b.runEventsAbort=void 0}if(h.activeSessionId===c)K(i,p,h,b,c,l.path,l.id)}async function Tp(i,p,h,b,r,f,c,l,w){let L=await Ai(i,"streamEventsSse",{runId:b,cursor:0,workspacePath:r},w,f);if(!L)throw Error("SSE streaming backend did not return a stream");let T=$i(l);c.streaming=!0,T.flush();try{await Ni(L,(C)=>{$p(c,[C]),c.streaming=C.type!=="run.end",h.updatedAt=Date.now(),y(p),T.request()})}finally{c.streaming=!1,y(p),T.flush()}}function $i(i){let p=0,h,b=()=>{if(h)clearTimeout(h),h=void 0},r=()=>{b(),p=Date.now(),i()};return{request:()=>{let c=ti-(Date.now()-p);if(c<=0){r();return}h||=setTimeout(r,c)},flush:r,cancel:b}}async function Ai(i,p,h={},b,r=Q(i)){if(!i.backendStream)throw Error("SSE streaming backend is unavailable");let f=await i.backendStream(p,{workspaceId:r,data:h},{signal:b});return Cp(f)}function Cp(i){if(typeof ReadableStream<"u"&&i instanceof ReadableStream)return i;if(typeof Response<"u"&&i instanceof Response)return i.body;if(typeof i==="string")return Li(i);if(!F(i))return null;let p=i.body;if(typeof ReadableStream<"u"&&p instanceof ReadableStream)return p;let h=i.sse;if(typeof h==="string")return Li(h);return null}function Li(i){let p=new TextEncoder().encode(i);return new ReadableStream({start(h){h.enqueue(p),h.close()}})}async function Ni(i,p){let h=i.getReader(),b=new TextDecoder,r="";while(!0){let f=await h.read();if(f.done){r+=b.decode(),Ep(r,p);return}r+=b.decode(f.value,{stream:!0});let c=Op(r);r=c.remainder;for(let l of c.frames)ui(l,p)}}function Op(i){let h=i.replaceAll(`\r
`,`
`).replaceAll("\r",`
`).split(`

`),b=h.pop()||"";return{frames:h,remainder:b}}function Ep(i,p){let h=i.trim();if(h)ui(h,p)}function ui(i,p){let h=i.split(`
`).filter((b)=>b.startsWith("data:")).map((b)=>b.slice(5).trimStart()).join(`
`);if(!h)return;try{let b=JSON.parse(h);if(Np(b))p(b)}catch{}}function yp(i,p){globalThis.piWeb?.subject("chat.input.submitted").next({text:i,attachments:Qi(p)||[]})}async function _p(i,p,h,b,r=R(i).path,f=R(i).id){try{return await m(i,"startPrompt",zi(p,h,b,r),f)}catch(c){if(gp(c))return{};throw c}}function gp(i){return/unknown method: (startPrompt|streamEventsSse)|unsupported method: (startPrompt|streamEventsSse)|(startPrompt|streamEventsSse) unsupported/i.test(Pi(i))}async function Hp(i,p,h,b="",r=R(i).path,f=R(i).id){return await m(i,"submitPrompt",zi(p,h,b,r),f)}function zi(i,p,h,b){let r={text:i,attachments:p,sessionId:h};if(b)r.workspacePath=b;return r}function Rp(i){let p=[...i.messages].reverse().find((b)=>b.role==="assistant"&&b.streaming);if(p)return p;let h={id:P(),role:"assistant",text:"",createdAt:Date.now(),streaming:!0};return i.messages.push(h),h}function $p(i,p){for(let h of p)if(h.type==="text.delta"&&typeof h.delta==="string")i.text+=h.delta;else if(h.type==="thinking.delta"&&typeof h.delta==="string")i.thinking=`${i.thinking||""}${h.delta}`;else if(h.type==="tool.start")v(i,h,"running");else if(h.type==="tool.delta"&&typeof h.delta==="string"){let b=v(i,h,"running");b.text=h.delta}else if(h.type==="tool.end"){let b=v(i,h,h.isError?"err":"ok");if(typeof h.result==="string"&&h.result)b.text=h.result}else if(h.type==="error"&&typeof h.message==="string")i.text+=`${i.text?`
`:""}${h.message}`}function v(i,p,h){let b=p.toolCallId||p.toolName||"tool";i.toolCalls||=[];let r=i.toolCalls.find((f)=>f.id===b);if(!r)r={id:b,name:p.toolName||"tool",args:p.args,text:"",status:h},i.toolCalls.push(r);if(r.status=h,Ap(r,p))r.args=p.args,r.argsStatus=p.argsStatus;return r}function Ap(i,p){if(!p.argsStatus)return Boolean(p.args);if(p.argsStatus==="unavailable")return!i.argsStatus;return!0}function Np(i){return F(i)&&typeof i.type==="string"}async function K(i,p,h,b,r="",f=I(i),c=R(i).id){if(!i.backendStream){await Ti(i,p,h,b,r,f);return}let l=++b.backendChatToken;b.sessionEventsAbort?.abort();let w=new AbortController;b.sessionEventsAbort=w;let L=$i(()=>{$(p,G(h).messages,h.activeSessionId)});try{let T=await Ai(i,"sessionEventsSse",Mi(i,r,f),w.signal,c);if(!T)throw Error("session SSE backend did not return a stream");await Ni(T,(C)=>{if(l!==b.backendChatToken||C.type!=="chat.state")return;if(Bi(i,h,up(C),"chatState").length)L.request()})}catch(T){if(!w.signal.aborted)await Ti(i,p,h,b,r,f)}finally{if(L.cancel(),b.sessionEventsAbort===w)b.sessionEventsAbort=void 0}}async function Ti(i,p,h,b,r="",f=I(i)){let c=++b.backendChatToken;try{let l=await m(i,"chatState",Mi(i,r,f));if(c!==b.backendChatToken)return;let w=Bi(i,h,l,"chatState");if(w.length)$(p,w,h.activeSessionId)}catch{}}function Mi(i,p,h=I(i)){let b=p?{sessionId:p}:{};if(h)b.workspacePath=h;return b}function up(i){return{activeSessionId:i.activeSessionId,messages:i.messages,isStreaming:i.isStreaming}}function I(i){return R(i).path}function R(i){let p=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),h=p?.activeWorkspaceId||i.app?.dataset.activeWorkspaceId||"",b=p?.workspaces?.find((r)=>r.id===h)?.path||"";return{id:h,path:b}}function Fi(i,p){let h=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),b=p.workspaceId||h?.activeWorkspaceId||i.app?.dataset.activeWorkspaceId||"",r=h?.workspaces?.find((f)=>f.id===b)?.path||"";if(r||b!==h?.activeWorkspaceId)return{id:b,path:r};return R(i)}function Bi(i,p,h,b){let r=t(h.messages);if(typeof h.activeSessionId==="string"&&h.activeSessionId){let l=p.activeSessionId;if(M(p,h.activeSessionId),u(i,{sessionId:h.activeSessionId,workspaceId:i.app?.dataset.activeWorkspaceId||Q(i)||void 0}),b!=="chatState"||l!==h.activeSessionId)V(i,"chat-session",{reason:b,sessionId:h.activeSessionId});if(b!=="chatState")d(i,h.activeSessionId,b)}let f=G(p);if(!r.length)return[];let c=Xi(f.messages,r).slice(-Z);if(!Ui(f.messages,c))return[];if(f.messages=c,f.title==="New chat"){let l=f.messages.find((w)=>w.role==="user");if(l)f.title=l.text.slice(0,48)||f.title}return f.updatedAt=Date.now(),y(p),f.messages}function Ui(i,p){if(i.length!==p.length)return!0;return i.some((h,b)=>Ci(h)!==Ci(p[b]))}function Ci(i){return JSON.stringify({id:i.id,role:i.role,text:i.text,thinking:i.thinking,streaming:i.streaming,toolCalls:i.toolCalls,attachments:i.attachments})}function zp(i,p,h,b,r){let f=t(h.messages),c=typeof h.activeSessionId==="string"&&h.activeSessionId?h.activeSessionId:r,l=p.activeSessionId===r;if(c!==r)if(l)M(p,c),u(i,{sessionId:c,workspaceId:R(i).id||void 0}),V(i,"chat-session",{reason:b,sessionId:c}),d(i,c,b);else N(p,c);let w=N(p,c);if(!f.length)return[];let L=Xi(w.messages,f).slice(-Z);if(!Ui(w.messages,L))return[];return w.messages=L,w.updatedAt=Date.now(),y(p),w.messages}function Mp(i,p,h,b,r){let f=(L)=>{if(!L?.sessionId)return;if(Zi(p,b,L))return;u(p,L),M(b,L.sessionId),$(h,G(b).messages,b.activeSessionId);let T=Fi(p,L);K(p,h,b,r,L.sessionId,T.path,T.id)},c=(L)=>{if(Bp(p,h,b,r,L))return;let T=Zp(p,L);if(T)f(T)},l=p.app?.piWebSidebar?.channels?.selectedSession$||globalThis.piWebSidebar?.channels?.selectedSession$,w=p.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$;if(l)i.add(l.subscribe(f));if(w)i.add(w.subscribe(c));if(p.app)i.listen(p.app,"pi-web-sidebar:session-created",(L)=>{let T=L.detail||{},C=typeof T.sessionId==="string"?T.sessionId:"",E=typeof T.workspaceId==="string"?T.workspaceId:"";if(C)f({sessionId:C,workspaceId:E||void 0})});if(globalThis.piWeb)i.add(globalThis.piWeb.behaviorSubject(_i,D(p)).subscribe(f)),i.add(globalThis.piWeb.subject(gi).subscribe(c)),i.add(globalThis.piWeb.behaviorSubject("session.activeId",null).subscribe((L)=>{if(!L)return;f({sessionId:L,workspaceId:p.app?.dataset.activeWorkspaceId||Y(X)||void 0})}))}function Fp(i,p){let h=D(i);if(h?.sessionId&&!Zi(i,p,h))u(i,h),M(p,h.sessionId);return p.activeSessionId}function Zi(i,p,h){let b=h.workspaceId||"",r=i.app?.dataset.activeWorkspaceId||Y(X)||"";return p.activeSessionId===h.sessionId&&(!b||b===r)}function Bp(i,p,h,b,r){if(r.type!=="session.deleted")return!1;let f=Vi(r);if(!f)return!0;let c=h.activeSessionId===f,l=h.sessions.length;if(h.sessions=h.sessions.filter((w)=>w.id!==f),c){b.runEventsAbort?.abort(),b.sessionEventsAbort?.abort();let w=Up(i,r,f);if(w?.sessionId){u(i,w),M(h,w.sessionId),Dp(p,G(h).messages,h.activeSessionId);let L=Fi(i,w);return K(i,p,h,b,w.sessionId,L.path,L.id),!0}return h.activeSessionId="",wp(i),y(h),S(p),!0}if(h.sessions.length!==l)y(h);return!0}function Up(i,p,h){let b=p.snapshot?.activeSessionId||"",r=p.snapshot?.activeWorkspaceId||"";if(b&&b!==h)return{sessionId:b,workspaceId:r||void 0};let f=D(i);if(f?.sessionId&&f.sessionId!==h)return f;return null}function Zp(i,p){if(!Vp(p.type))return null;let h=p.detail||{},b=Vi(p)||p.snapshot?.activeSessionId||"",r=typeof h.workspaceId==="string"?h.workspaceId:p.snapshot?.activeWorkspaceId||i.app?.dataset.activeWorkspaceId||"";if(!b)return null;return{sessionId:b,workspaceId:r||void 0}}function Vi(i){let p=i.detail||{};if(typeof p.sessionId==="string")return p.sessionId;if(typeof p.id==="string")return p.id;return""}function Vp(i){return i==="session.selected"||i==="session.created"||i==="new-session"||i==="active.start"}function M(i,p){let h=i.sessions.find((b)=>b.id===p);if(!h)h=J(p),i.sessions.unshift(h);return i.activeSessionId=h.id,y(i),h}function $(i,p,h){if(ji(p,h),!p.length){S(i);return}(i.querySelector(".term-inner")||i).replaceChildren(...p.map((r)=>Gi(r,h))),o(i)}function Dp(i,p,h){ji(p,h),(i.querySelector(".term-inner")||i).replaceChildren(...p.map((r)=>Gi(r,h))),o(i)}function S(i){let p=i.querySelector(".term-inner")||i,h=document.createElement("article");h.className="pi-web-chat-docs",h.setAttribute("aria-label","pi-web-chat guide");let b=document.createElement("h1");b.textContent="pi-web-chat guide";let r=document.createElement("p");r.textContent=["Select or create a session in the sidebar to load chat history,","or type below to start a new session."].join(" ");let f=document.createElement("ul");for(let c of["Ask pi in the prompt box and press Cmd/Ctrl+Enter to send.","Use / for slash commands, @ for file references, and ! for shell commands.","Chats are cached locally after you start or select a session."]){let l=document.createElement("li");l.textContent=c,f.append(l)}h.append(b,r,f),p.replaceChildren(h),o(i)}function Gp(i,p){let h=p.querySelector(".term"),b=p.querySelector("[data-action='scroll-bottom']");if(!h||!b)return;let r={term:h,button:b,pinned:!0,touchStartY:null};a.set(p,r),b.hidden=!1,q(r),i.listen(b,"click",()=>{r.pinned=!0,Di(r),q(r)}),i.listen(h,"wheel",(f)=>{if(f.deltaY<0)Oi(r)}),i.listen(h,"touchstart",(f)=>{let c=f;r.touchStartY=c.touches.item(0)?.clientY??null}),i.listen(h,"touchmove",(f)=>{let l=f.touches.item(0)?.clientY;if(typeof l==="number"&&r.touchStartY!==null&&l-r.touchStartY>8)Oi(r)}),i.listen(h,"touchend",()=>{r.touchStartY=null}),i.add({remove:()=>{a.delete(p)}})}function o(i){let p=a.get(i);if(!p)return;if(p.pinned)Di(p);q(p)}function Di(i){i.term.scrollTop=i.term.scrollHeight}function Oi(i){i.pinned=!1,q(i)}function q(i){i.button.dataset.pinned=i.pinned?"true":"false",i.button.setAttribute("aria-pressed",i.pinned?"true":"false")}function Gi(i,p){let h=document.createElement("article");h.className="transcript-item",h.dataset.messageId=i.id;let b=document.createElement("div");b.className="msg",b.dataset.kind=k(i.role);let r=document.createElement("span");r.className=`prefix ${k(i.role)}`,r.textContent=dp(i.role);let f=document.createElement("pre");if(f.className=`body ${k(i.role)}`,f.textContent=i.text,b.append(r,f),jp(i))h.append(b);if(i.thinking)h.append(qp(i.thinking,Boolean(i.streaming)));for(let c of i.toolCalls||[])h.append(Jp(c,qi(p,i,c)));if(i.streaming)h.dataset.streaming="true";return h}function jp(i){let p=i.text.trim().length>0;return i.role!=="assistant"||p}function qp(i,p){let h=document.createElement("details");h.className="msg-detail think thinking-block",h.open=p;let b=document.createElement("summary");b.className="label",b.textContent="THINKING";let r=document.createElement("pre");return r.className="body",r.textContent=i,h.append(b,r),h}function ji(i,p){let h=new Set;for(let b of i)for(let r of b.toolCalls||[])h.add(qi(p,b,r));for(let b of z)if(!h.has(b))z.delete(b)}function qi(i,p,h){return`${i}:${p.id}:${h.id}`}function Jp(i,p){let h=document.createElement("div");h.className="tool-card",h.dataset.tool=i.name||"tool",h.dataset.status=i.status;let b=!z.has(p);h.dataset.collapsed=b?"true":"false";let r=document.createElement("button");if(r.type="button",r.className="tc-head",r.title=b?"Show tool output":"Hide tool output",r.setAttribute("aria-expanded",b?"false":"true"),r.setAttribute("aria-label",`${b?"Show":"Hide"} ${i.name||"tool"} output`),r.append(Kp(i),Pp(i),Wp(i),xp(i,b)),!b)h.append(Ji(i));return r.addEventListener("click",()=>Qp(h,r,i,p)),h.prepend(r),h}function Ji(i){let p=document.createElement("pre");return p.className="tc-body",p.textContent=i.text||vp(i),p}function Yp(i,p){let h=0,b,r=p.ownerDocument.defaultView,f=typeof r?.matchMedia==="function"?r.matchMedia("(prefers-reduced-motion: reduce)"):void 0,c=()=>{if(b)clearInterval(b),b=void 0},l=()=>{h=(h+1)%Hi;for(let T of p.querySelectorAll(".spinner"))T.dataset.frame=String(h)},w=()=>{let T=p.querySelectorAll(".spinner");if(f?.matches||T.length===0){c(),h=0;for(let C of T)C.dataset.frame="0";return}if(!b)b=setInterval(l,si)},L=new(r?.MutationObserver||MutationObserver)(w);L.observe(p,{childList:!0,subtree:!0}),f?.addEventListener("change",w),w(),i.add({remove:()=>{L.disconnect(),f?.removeEventListener("change",w),c()}})}function Xp(){let i=document.createElement("span");i.className="spinner",i.dataset.frame="0",i.setAttribute("aria-hidden","true");for(let p=0;p<Hi;p+=1)i.append(document.createElement("span"));return i}function Qp(i,p,h,b){let r=i.querySelector(".tc-body"),f=r!==null;if(r)r.remove(),z.delete(b);else i.append(Ji(h)),z.add(b);i.dataset.collapsed=f?"true":"false",p.setAttribute("aria-expanded",f?"false":"true"),p.setAttribute("aria-label",`${f?"Show":"Hide"} ${i.dataset.tool||"tool"} output`),p.title=f?"Show tool output":"Hide tool output";let c=p.querySelector(".tc-toggle-label");if(c)c.textContent=f?"show":"hide"}function Kp(i){let p=document.createElement("span");p.className="tc-glyph";let h=kp(i),b=h?ei[h]:"";if(!h||!b)return p.textContent="●",p;return p.innerHTML=`<svg class="tc-icon" data-tool-icon="${h}" aria-hidden="true" viewBox="0 0 24 24">${b}</svg>`,p}function Pp(i){let p=document.createElement("span");return p.className="tc-name",p.textContent=i.name||"tool",p}function Wp(i){let p=document.createElement("span");return p.className="tc-args",p.textContent=Yi(i),p}function xp(i,p){let h=document.createElement("span");if(h.className="tc-meta",i.status==="running"){let f=Xp(),c=document.createElement("span");return c.className="running",c.textContent="running",h.append(f,c,Ei(p)),h}let b=document.createElement("span");b.className=i.status==="err"?"err":"ok",b.textContent=i.status==="err"?"✗":"✓";let r=document.createElement("span");return r.textContent=i.status==="err"?" · failed":" · done",h.append(b,r,Ei(p)),h}function Ei(i){let p=document.createElement("span");p.className="tc-toggle";let h=document.createElement("span");h.className="tc-toggle-label",h.textContent=i?"show":"hide";let b=document.createElement("span");return b.className="tc-caret",b.textContent="▸",p.append(h,b),p}function Yi(i){if(i.argsStatus==="truncated")return"arguments truncated";if(i.argsStatus==="omitted")return"arguments omitted";if(i.argsStatus==="unavailable")return"arguments unavailable";if(i.argsStatus==="empty")return"no arguments";if(!i.args)return"";return JSON.stringify(i.args)}function vp(i){if(i.argsStatus==="truncated")return"arguments truncated: too large to display";if(i.argsStatus==="omitted")return"arguments omitted: response too large";if(i.argsStatus==="unavailable")return"arguments unavailable";if(i.argsStatus==="empty")return"no arguments";if(!i.args)return"arguments unavailable";return JSON.stringify(i.args,null,2)}function kp(i){let p=ap(i.name);if(["bash","shell","sh","zsh","terminal"].includes(p))return np(Yi(i).toLowerCase())||"terminal";return ip[p]}function ap(i){return i.trim().replace(/^functions\./,"").replace(/^multi_tool_use\./,"")}function np(i){if(/\bgit\b|\bgh\b/.test(i))return"git-branch";if(/\b(go test|bun test|npm test|pnpm test|yarn test|vitest|pytest|cargo test)\b/.test(i))return"circle-check";if(/\b(bun|npm|pnpm|yarn)\s+(run\s+)?build\b|\b(go build|cargo build)\b/.test(i))return"hammer";if(/\b(bun|npm|pnpm|yarn)\s+(add|install|i)\b|\bpip\s+install\b|\bgo\s+get\b/.test(i))return"package";return}function dp(i){if(i==="assistant")return"pi >";if(i==="user")return"you >";if(i==="system")return"sys >";return"tool >"}function k(i){if(i==="assistant")return"pi";if(i==="system")return"sys";return i}function Xi(i,p){let h=new Map;for(let b of i)h.set(b.id,b);for(let b of p)h.set(b.id,{...h.get(b.id),...b});return[...h.values()].sort((b,r)=>b.createdAt-r.createdAt)}function G(i){return N(i,i.activeSessionId,!0)}function N(i,p,h=!1){let b=i.sessions.find((r)=>r.id===p);if(!b)b=J(p||void 0),i.sessions.unshift(b),y(i);if(h||!i.activeSessionId)i.activeSessionId=b.id,y(i);return b}function mp(i,p,h,b){if(p===h)return;let r=i.sessions.find((w)=>w.id===p),f=r?.messages.findIndex((w)=>w.id===b)??-1;if(!r||f<0)return;let[c]=r.messages.splice(f,1),l=N(i,h);if(!l.messages.some((w)=>w.id===c.id))l.messages.push(c);r.updatedAt=Date.now(),l.updatedAt=Date.now(),y(i)}function J(i=P()){let p=Date.now();return{id:i,title:"New chat",createdAt:p,updatedAt:p,messages:[]}}function Y(i){try{return localStorage.getItem(i)||""}catch{return""}}function Ip(i=""){try{let h=JSON.parse(localStorage.getItem(j)||"null");if(h&&typeof h.activeSessionId==="string"&&Array.isArray(h.sessions)){let b=h.sessions.filter(Ki).map(op);if(i&&!b.some((r)=>r.id===i))b.unshift(J(i));return{activeSessionId:i||h.activeSessionId,sessions:b}}}catch{}let p=J(i||void 0);return{activeSessionId:p.id,sessions:[p]}}function Sp(){try{let i=JSON.parse(localStorage.getItem(j)||"null");return Boolean(i&&Array.isArray(i.sessions)&&i.sessions.some(Ki))}catch{return!1}}function y(i){yi(i);try{localStorage.setItem(j,JSON.stringify(i))}catch{for(let p of i.sessions)p.messages=p.messages.slice(-Math.floor(Z/2));yi(i);try{localStorage.setItem(j,JSON.stringify(i))}catch{}}}function Qi(i){if(!i?.length)return;return i.map(({content:p,...h})=>h)}function yi(i){i.sessions.sort((b,r)=>r.updatedAt-b.updatedAt);let p=i.sessions.find((b)=>b.id===i.activeSessionId),h=i.sessions.filter((b)=>b.id!==i.activeSessionId).slice(0,Math.max(0,wi-1));i.sessions=p?[p,...h]:i.sessions.slice(0,wi);for(let b of i.sessions)if(b.messages.length>Z)b.messages.splice(0,b.messages.length-Z)}function Ki(i){return F(i)&&typeof i.id==="string"&&Array.isArray(i.messages)}function op(i){return{...i,messages:t(i.messages)}}function t(i){return Array.isArray(i)?i.filter(ph).map(tp):[]}function tp(i){if(!Array.isArray(i.toolCalls)){let{toolCalls:p,...h}=i;return h}return{...i,toolCalls:i.toolCalls.filter(sp)}}function sp(i){if(!F(i)||typeof i.id!=="string"||typeof i.name!=="string")return!1;return typeof i.text==="string"&&ih(i.status)&&ep(i.argsStatus)}function ep(i){return i===void 0||i==="present"||i==="empty"||i==="unavailable"||i==="truncated"||i==="omitted"}function ih(i){return i==="running"||i==="ok"||i==="err"}function ph(i){if(!F(i)||typeof i.id!=="string"||typeof i.text!=="string")return!1;return typeof i.createdAt==="number"&&hh(i.role)}function hh(i){return i==="user"||i==="assistant"||i==="tool"||i==="system"}function F(i){return typeof i==="object"&&i!==null}function P(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`}function Pi(i){return i instanceof Error?i.message:String(i)}export{vi as renderMessages,di as promptFromAgUiLikeRunInput,bi as pluginStyleText,x as pluginClass,Ch as mergeCommands,Q as getActiveWorkspaceId,Th as extractRefs,pp as default,ii as createComposerSurface,e as createChatSurface,xi as createChatDom,Lh as createChannels,ni as createAgUiLikeRunInput,fi as commandName,mi as chatEventsToAgUiLikeEvents,m as backendCall};
