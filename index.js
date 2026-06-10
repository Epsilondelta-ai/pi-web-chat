var B={attachFile:["M16.5 6v11.5a4 4 0 0 1-8 0V5a2.5 2.5 0 0 1 5 0v10.5a1 1 0 0 1-2 0V6H10v9.5","a2.5 2.5 0 0 0 5 0V5a4 4 0 0 0-8 0v12.5a5.5 5.5 0 0 0 11 0V6h-1.5Z"].join(""),stop:"M6 6h12v12H6V6Z",send:"M2 21 23 12 2 3v7l15 2-15 2v7Z",terminal:"M3 4h18v16H3V4Zm2 2v12h14V6H5Zm2 3 1.1-1.1L12.2 12l-4.1 4.1L7 15l3-3-3-3Zm6 6h5v1.5h-5V15Z",file:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 2.5L17.5 8H14V4.5ZM8 13h8v1.5H8V13Zm0 3h8v1.5H8V16Z"},W={attachFile:U("attach_file",B.attachFile),stop:U("stop",B.stop),send:U("send",B.send)};function U(i,h){return`<svg class="material-icon" data-material-icon="${i}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="${h}"></path></svg>`}function x(){return"pi-web-chat-mounted"}function e(){let i=document.createElement("main");return i.className="main pi-web-chat-surface",i.dataset.main="session",i.innerHTML='<div class="term"><div class="term-inner" role="log" aria-live="polite" aria-relevant="additions text"></div></div><button type="button" class="scroll-bottom-btn" data-action="scroll-bottom" aria-label="stick to bottom" title="stick to bottom" aria-pressed="true" hidden>↓</button>',i}function ii(){let i=document.createElement("section");return i.className="prompt-region pi-web-chat-composer",i.innerHTML=`
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
    <div class="prompt-meta" data-prompt-meta>— | <span class="prompt-meta-item prompt-meta-branch"><span>—</span></span></div>`,i}function pi(i){let h=document.createElement("span");return h.className="prompt-meta-item pi-web-chat-badge",h.textContent="chat plugin",i.querySelector("[data-prompt-meta]")?.append(h),h}function vi(){let i=document.createElement("section");return i.className="pi-web-chat-root",i.dataset.plugin="pi-web-chat",i.innerHTML=`
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
    </section>`,{root:i,transcript:H(i.querySelector("[data-chat-transcript]")),textarea:H(i.querySelector("[data-chat-input]")),sendButton:H(i.querySelector("[data-send]")),attachButton:H(i.querySelector("[data-attach]")),fileInput:H(i.querySelector("[data-file-input]")),slashPopover:H(i.querySelector("[data-slash-popover]")),slashList:H(i.querySelector("[data-slash-list]")),refsPopover:H(i.querySelector("[data-refs-popover]")),refsList:H(i.querySelector("[data-refs-list]")),attachments:H(i.querySelector("[data-attachments]"))}}function ki(i,h){i.replaceChildren(...h.map(ai)),i.scrollTop=i.scrollHeight}function ai(i){let h=document.createElement("article");h.className=`pi-web-chat-message pi-web-chat-message-${i.role}`,h.dataset.messageId=i.id;let p=document.createElement("div");p.className="pi-web-chat-message-role",p.textContent=i.role;let b=document.createElement("pre");if(b.className="pi-web-chat-message-body",b.textContent=i.text,h.append(p,b),i.thinking){let r=document.createElement("details");r.className="pi-web-chat-thinking",r.open=Boolean(i.streaming);let f=document.createElement("summary");f.textContent="thinking";let c=document.createElement("pre");c.textContent=i.thinking,r.append(f,c),h.append(r)}if(i.toolCalls?.length){let r=document.createElement("div");r.className="pi-web-chat-tools";for(let f of i.toolCalls){let c=document.createElement("details");c.className=`pi-web-chat-tool pi-web-chat-tool-${f.status}`,c.open=f.status==="running";let l=document.createElement("summary");l.textContent=`${f.name} · ${f.status}`;let w=document.createElement("pre");w.textContent=f.text||ni(f),c.append(l,w),r.append(c)}h.append(r)}if(i.streaming){let r=document.createElement("div");r.className="pi-web-chat-message-meta",r.textContent="streaming...",h.append(r)}if(i.attachments?.length){let r=document.createElement("div");r.className="pi-web-chat-message-meta",r.textContent=`${i.attachments.length} attachment(s)`,h.append(r)}return h}function ni(i){if(i.argsStatus==="truncated")return"arguments truncated: too large to display";if(i.argsStatus==="omitted")return"arguments omitted: response too large";if(i.argsStatus==="unavailable")return"arguments unavailable";if(i.argsStatus==="empty")return"no arguments";if(!i.args)return"arguments unavailable";return JSON.stringify(i.args,null,2)}function hi(i,h){i.hidden=h.length===0,i.replaceChildren(...h.map((p)=>{let b=document.createElement("span");return b.className="pi-web-chat-attachment-chip",b.textContent=p,b}))}function bi(){return`
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
  `}function ri(){document.getElementById("pi-web-chat-style")?.remove();let i=document.createElement("style");return i.id="pi-web-chat-style",i.textContent=bi(),document.head.append(i),i}function fi(i){return i.command||i.cmd||(i.name?`/${i.name}`:"")}function H(i){if(!i)throw Error("pi-web-chat DOM template is invalid");return i}function di(i,h,p){return{threadId:i,runId:h,state:{},messages:p,tools:[],context:[]}}function mi(i){let h=[...i.messages].reverse().find((p)=>p.role==="user");return{text:h?.text||"",attachments:h?.attachments||[],sessionId:i.threadId}}function Ii(i,h,p){return i.map((b)=>Si(b,h,p))}function Si(i,h,p){if(i.type==="text.delta")return{type:"TEXT_MESSAGE_CONTENT",threadId:h,runId:p,delta:i.delta||""};if(i.type==="thinking.delta")return{type:"THINKING_MESSAGE_CONTENT",threadId:h,runId:p,delta:i.delta||""};if(i.type==="tool.start")return{type:"TOOL_CALL_START",threadId:h,runId:p,toolCallId:i.toolCallId,payload:ci(i)};if(i.type==="tool.delta")return{type:"TOOL_CALL_ARGS",threadId:h,runId:p,toolCallId:i.toolCallId,delta:i.delta||""};if(i.type==="tool.end")return{type:"TOOL_CALL_END",threadId:h,runId:p,toolCallId:i.toolCallId,payload:ci(i)};return{type:i.type.toUpperCase().replaceAll(".","_"),threadId:h,runId:p,payload:i}}function ci(i){return{name:i.toolName||"tool",args:i.args||{},result:i.result||"",isError:i.isError===!0}}var j="pi-web-chat.sessions.v1";var Hi="plugin.pi-web-sidebar.selectedSession",Ri="plugin.pi-web-sidebar.event",n="plugin.pi-web-sidebar.activeSessionId",X="plugin.pi-web-sidebar.activeWorkspaceId";var wi=20,Z=200,oi=8,ti=1e6;var si=250,gi=6,ei=150,z=new Set,ip={"book-open":'<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',"file-plus":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="M9 15h6"/>',pencil:'<path d="M21.2 6.8 17.2 2.8a2 2 0 0 0-2.8 0L3 14.2V21h6.8L21.2 9.6a2 2 0 0 0 0-2.8z"/><path d="m14 5 5 5"/>',terminal:'<path d="m4 17 6-6-6-6"/><path d="M12 19h8"/>',cpu:'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 15h3"/><path d="M1 9h3"/><path d="M1 15h3"/>',globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 0 20"/><path d="M12 2a15.3 15.3 0 0 0 0 20"/>',search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',braces:'<path d="M8 3H7a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-4a2 2 0 0 1 2-2 2 2 0 0 1-2-2V7a2 2 0 0 0-2-2h-1"/>',"file-text":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',"circle-question-mark":'<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 1 1 5.8 1c-.5 1-1.4 1.5-2.1 2-.6.4-.8.8-.8 2"/><path d="M12 17h.01"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',plug:'<path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a6 6 0 0 1-12 0V8Z"/>',"git-branch":'<line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',"circle-check":'<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',hammer:'<path d="m15 12-8.5 8.5a2.1 2.1 0 0 1-3-3L12 9"/><path d="m17.6 5.4 1.8-1.8"/><path d="m14 7 3 3"/><path d="M5 11 2 8l6-6 3 3"/>',package:'<path d="m7.5 4.3 9 5.2"/><path d="M21 8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>'},a=new WeakMap,pp={read:"book-open",write:"file-plus",edit:"pencil",ctx_execute:"cpu",ctx_batch_execute:"cpu",ctx_execute_file:"cpu",ctx_search:"cpu",ctx_index:"cpu",ctx_fetch_and_index:"cpu",web_search:"globe",fetch_content:"search",get_search_content:"search",code_search:"braces",document_parse:"file-text",ask_user_question:"circle-question-mark",teams:"users",subagent:"users",mcp:"plug",git:"git-branch"};class $i{#i=[];add(i){if(i)this.#i.push(i);return i}listen(i,h,p){i.addEventListener(h,p),this.add({remove:()=>i.removeEventListener(h,p)})}dispose(){for(let i of this.#i.splice(0).reverse())if(typeof i==="function")i();else if("unsubscribe"in i)i.unsubscribe();else i.remove()}}function hp(i={}){let h=i.app;if(h?.piWebChat?.dispose(),typeof i.mount?.chat!=="function"||typeof i.mount?.composer!=="function")throw Error("pi-web-chat requires modern pi-web mount.chat and mount.composer APIs");return bp(i,h)}function bp(i,h){let p=new $i,b=p.add(ri()),r=e(),f=ii(),c=i.mount?.chat(r,{replace:!0}),l=i.mount?.composer(f,{replace:!0});if(jp(p,r),Xp(p,r),c)p.add(c);if(l)p.add(l);let w=D(i);u(i,w||void 0);let L=!w?.sessionId&&!op(),T=Sp(w?.sessionId||""),C={backendChatToken:0};if(L)S(r);else $(r,G(T).messages,T.activeSessionId),K(i,r,T,C,w?.sessionId||T.activeSessionId);Fp(p,i,r,T,C),rp(p,i,f,r,T,C);let E=h?p.add(pi(h)):void 0;h?.classList.add(x());let A=()=>{if(C.runEventsAbort?.abort(),C.sessionEventsAbort?.abort(),p.dispose(),z.clear(),E?.remove(),b.remove(),h?.classList.remove(x()),h?.piWebChat===y)delete h.piWebChat},y={dispose:A};if(h)h.piWebChat=y;return A}function rp(i,h,p,b,r,f){let c=p.querySelector(".prompt-textarea"),l=p.querySelector(".send-btn"),w=p.querySelector(".attach-btn"),L=p.querySelector("[data-file-input]"),T=p.querySelector(".attach-chips");if(!c||!l)return;let C=[],E=()=>{let O=c.value;l.setAttribute("aria-disabled",O.trim()?"false":"true")},A=()=>{if(!T)return;hi(T,C.map((O)=>{return O.name||"attachment"}))},y=async(O)=>{O?.preventDefault(),O?.stopImmediatePropagation();let R=c.value.trim();if(E(),!R)return;let s=[...C];l.disabled=!0;try{if(_p(R,s),await Tp(h,b,r,f,R,s),C=[],A(),c.value.trim()===R)c.value="";if(L)L.value=""}catch(xi){$(b,[fp(xi)],r.activeSessionId)}finally{l.disabled=!1,E()}};if(i.listen(c,"input",E),i.listen(c,"keydown",(O)=>{let R=O;if(R.key==="Enter"&&(R.metaKey||R.ctrlKey))y(R)}),i.listen(l,"click",(O)=>{y(O)}),w&&L)i.listen(w,"click",()=>L.click()),i.listen(L,"change",()=>{cp(L,(O)=>{C=O,A()})})}function fp(i){return{id:P(),role:"system",text:`prompt failed: ${Wi(i)}`,createdAt:Date.now()}}async function cp(i,h){let p=Array.from(i.files||[]).slice(0,oi),b=[];for(let r of p){if(r.size>ti)continue;b.push({name:r.name,size:r.size,content:await r.text(),mimeType:r.type||void 0})}h(b)}function Th(i){return{input$:i.behaviorSubject("chat.input",""),submitted$:i.subject("chat.input.submitted"),activeSessionId$:i.behaviorSubject("session.activeId",null),sidebarSelectedSession$:i.behaviorSubject(Hi,wp()),toastRequested$:i.subject("toast.requested")}}function Ch(i){let h=[],p=new Set,b=/(^|[\s`])@([^\s@`]+)/g,r=b.exec(String(i||""));while(r!==null){let f=r[2]||"";if((r[1]||"")!=="`"&&f&&!p.has(f))p.add(f),h.push(f);r=b.exec(String(i||""))}return h}function Oh(i=[],h=[]){let p=[],b=new Set;for(let r of[...i,...h]){let f=fi(r);if(!f||b.has(f))continue;b.add(f),p.push(r)}return p}function Q(i){return i.app?.piWebSidebar?.getSnapshot?.().activeWorkspaceId||i.app?.dataset.activeWorkspaceId||""}function wp(){return D({})}function D(i){let h=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),p=h?.activeSessionId||"",b=h?.activeWorkspaceId||"";if(p)return{sessionId:p,workspaceId:b||void 0};let r=Y(n),f=Y(X);return r?{sessionId:r,workspaceId:f||void 0}:null}function u(i,h){if(h?.workspaceId&&i.app)i.app.dataset.activeWorkspaceId=h.workspaceId,li(X,h.workspaceId);if(h?.sessionId)i.app?.setAttribute("data-active-session-id",h.sessionId),li(n,h.sessionId)}function lp(i){i.app?.removeAttribute("data-active-session-id"),Lp(n),globalThis.piWeb?.behaviorSubject("session.activeId",null).next(null)}function V(i,h,p={}){let b=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),r={type:h,detail:p,snapshot:b};(i.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$)?.next(r),globalThis.piWeb?.subject(Ri).next(r)}function d(i,h,p){let b=i.app?.dataset.activeWorkspaceId||Q(i),r={reason:p,sessionId:h,workspaceId:b};globalThis.piWeb?.behaviorSubject("session.activeId",h).next(h),globalThis.piWeb?.subject("session.changed").next({sessionId:h,workspaceId:b,reason:p}),V(i,"active.start",r),V(i,"session.created",r)}function li(i,h){try{localStorage.setItem(i,h)}catch{}}function Lp(i){try{localStorage.removeItem(i)}catch{}}async function m(i,h,p={},b=Q(i)){if(!i.backend)return{};let r=await i.backend(h,{workspaceId:b,data:p});return F(r)?r:{}}function Li(i){let h=Array.isArray(i.warnings)?i.warnings.filter((p)=>typeof p==="string"&&p.trim().length>0):[];for(let p of h)globalThis.piWeb?.subject("toast.requested").next({level:"warning",message:p})}async function Tp(i,h,p,b,r,f){let c=Bp(i,p),l=g(i);b.backendChatToken+=1,b.runEventsAbort?.abort();let w=new AbortController;b.runEventsAbort=w,b.sessionEventsAbort?.abort();let L={id:P(),role:"user",text:r,attachments:Ki(f),createdAt:Date.now()},T=N(p,c);T.messages.push(L),T.updatedAt=Date.now(),_(p),$(h,T.messages,c);let C=await Hp(i,r,f,c,l.path,l.id);if(Li(C),typeof C.activeSessionId==="string"&&C.activeSessionId){let y=c,O=p.activeSessionId===y;if(c=C.activeSessionId,O)M(p,c),u(i,{sessionId:C.activeSessionId,workspaceId:l.id||void 0}),V(i,"chat-session",{reason:"startPrompt",sessionId:C.activeSessionId}),d(i,C.activeSessionId,"startPrompt");else N(p,c);Ip(p,y,c,L.id)}if(typeof C.runId!=="string"||!C.runId){let y=await gp(i,r,f,c,l.path,l.id);Li(y);let O=Mp(i,p,y,"submitPrompt",c);if(p.activeSessionId===c)$(h,O,c);if(b.runEventsAbort===w)b.runEventsAbort=void 0;return}let E=N(p,c),A=$p(E);try{await Cp(i,p,E,C.runId,l.path,l.id,A,()=>{if(p.activeSessionId===c)$(h,E.messages,c)},w.signal)}finally{if(b.runEventsAbort===w)b.runEventsAbort=void 0}if(p.activeSessionId===c)K(i,h,p,b,c,l.path,l.id)}async function Cp(i,h,p,b,r,f,c,l,w){let L=await Ni(i,"streamEventsSse",{runId:b,cursor:0,workspacePath:r},w,f);if(!L)throw Error("SSE streaming backend did not return a stream");let T=Ai(l);c.streaming=!0,T.flush();try{await ui(L,(C)=>{Ap(c,[C]),c.streaming=C.type!=="run.end",p.updatedAt=Date.now(),_(h),T.request()})}finally{c.streaming=!1,_(h),T.flush()}}function Ai(i){let h=0,p,b=()=>{if(p)clearTimeout(p),p=void 0},r=()=>{b(),h=Date.now(),i()};return{request:()=>{let c=si-(Date.now()-h);if(c<=0){r();return}p||=setTimeout(r,c)},flush:r,cancel:b}}async function Ni(i,h,p={},b,r=Q(i)){if(!i.backendStream)throw Error("SSE streaming backend is unavailable");let f=await i.backendStream(h,{workspaceId:r,data:p},{signal:b});return Op(f)}function Op(i){if(typeof ReadableStream<"u"&&i instanceof ReadableStream)return i;if(typeof Response<"u"&&i instanceof Response)return i.body;if(typeof i==="string")return Ti(i);if(!F(i))return null;let h=i.body;if(typeof ReadableStream<"u"&&h instanceof ReadableStream)return h;let p=i.sse;if(typeof p==="string")return Ti(p);return null}function Ti(i){let h=new TextEncoder().encode(i);return new ReadableStream({start(p){p.enqueue(h),p.close()}})}async function ui(i,h){let p=i.getReader(),b=new TextDecoder,r="";while(!0){let f=await p.read();if(f.done){r+=b.decode(),yp(r,h);return}r+=b.decode(f.value,{stream:!0});let c=Ep(r);r=c.remainder;for(let l of c.frames)zi(l,h)}}function Ep(i){let p=i.replaceAll(`\r
`,`
`).replaceAll("\r",`
`).split(`

`),b=p.pop()||"";return{frames:p,remainder:b}}function yp(i,h){let p=i.trim();if(p)zi(p,h)}function zi(i,h){let p=i.split(`
`).filter((b)=>b.startsWith("data:")).map((b)=>b.slice(5).trimStart()).join(`
`);if(!p)return;try{let b=JSON.parse(p);if(up(b))h(b)}catch{}}function _p(i,h){globalThis.piWeb?.subject("chat.input.submitted").next({text:i,attachments:Ki(h)||[]})}async function Hp(i,h,p,b,r=g(i).path,f=g(i).id){try{return await m(i,"startPrompt",Mi(h,p,b,r),f)}catch(c){if(Rp(c))return{};throw c}}function Rp(i){return/unknown method: (startPrompt|streamEventsSse)|unsupported method: (startPrompt|streamEventsSse)|(startPrompt|streamEventsSse) unsupported/i.test(Wi(i))}async function gp(i,h,p,b="",r=g(i).path,f=g(i).id){return await m(i,"submitPrompt",Mi(h,p,b,r),f)}function Mi(i,h,p,b){let r={text:i,attachments:h,sessionId:p};if(b)r.workspacePath=b;return r}function $p(i){let h=[...i.messages].reverse().find((b)=>b.role==="assistant"&&b.streaming);if(h)return h;let p={id:P(),role:"assistant",text:"",createdAt:Date.now(),streaming:!0};return i.messages.push(p),p}function Ap(i,h){for(let p of h)if(p.type==="text.delta"&&typeof p.delta==="string")i.text+=p.delta;else if(p.type==="thinking.delta"&&typeof p.delta==="string")i.thinking=`${i.thinking||""}${p.delta}`;else if(p.type==="tool.start")v(i,p,"running");else if(p.type==="tool.delta"&&typeof p.delta==="string"){let b=v(i,p,"running");b.text=p.delta}else if(p.type==="tool.end"){let b=v(i,p,p.isError?"err":"ok");if(typeof p.result==="string"&&p.result)b.text=p.result}else if(p.type==="error"&&typeof p.message==="string")i.text+=`${i.text?`
`:""}${p.message}`}function v(i,h,p){let b=h.toolCallId||h.toolName||"tool";i.toolCalls||=[];let r=i.toolCalls.find((f)=>f.id===b);if(!r)r={id:b,name:h.toolName||"tool",args:h.args,text:"",status:p},i.toolCalls.push(r);if(r.status=p,Np(r,h))r.args=h.args,r.argsStatus=h.argsStatus;return r}function Np(i,h){if(!h.argsStatus)return Boolean(h.args);if(h.argsStatus==="unavailable")return!i.argsStatus;return!0}function up(i){return F(i)&&typeof i.type==="string"}async function K(i,h,p,b,r="",f=I(i),c=g(i).id){if(!i.backendStream){await Ci(i,h,p,b,r,f);return}let l=++b.backendChatToken;b.sessionEventsAbort?.abort();let w=new AbortController;b.sessionEventsAbort=w;let L=Ai(()=>{$(h,G(p).messages,p.activeSessionId)});try{let T=await Ni(i,"sessionEventsSse",Fi(i,r,f),w.signal,c);if(!T)throw Error("session SSE backend did not return a stream");await ui(T,(C)=>{if(l!==b.backendChatToken||C.type!=="chat.state")return;if(Ui(i,p,zp(C),"chatState").length)L.request()})}catch(T){if(!w.signal.aborted)await Ci(i,h,p,b,r,f)}finally{if(L.cancel(),b.sessionEventsAbort===w)b.sessionEventsAbort=void 0}}async function Ci(i,h,p,b,r="",f=I(i)){let c=++b.backendChatToken;try{let l=await m(i,"chatState",Fi(i,r,f));if(c!==b.backendChatToken)return;let w=Ui(i,p,l,"chatState");if(w.length)$(h,w,p.activeSessionId)}catch{}}function Fi(i,h,p=I(i)){let b=h?{sessionId:h}:{};if(p)b.workspacePath=p;return b}function zp(i){return{activeSessionId:i.activeSessionId,messages:i.messages,isStreaming:i.isStreaming}}function I(i){return g(i).path}function g(i){let h=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),p=h?.activeWorkspaceId||i.app?.dataset.activeWorkspaceId||"",b=h?.workspaces?.find((r)=>r.id===p)?.path||"";return{id:p,path:b}}function Bi(i,h){let p=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),b=h.workspaceId||p?.activeWorkspaceId||i.app?.dataset.activeWorkspaceId||"",r=p?.workspaces?.find((f)=>f.id===b)?.path||"";if(r||b!==p?.activeWorkspaceId)return{id:b,path:r};return g(i)}function Ui(i,h,p,b){let r=t(p.messages);if(typeof p.activeSessionId==="string"&&p.activeSessionId){let l=h.activeSessionId;if(M(h,p.activeSessionId),u(i,{sessionId:p.activeSessionId,workspaceId:i.app?.dataset.activeWorkspaceId||Q(i)||void 0}),b!=="chatState"||l!==p.activeSessionId)V(i,"chat-session",{reason:b,sessionId:p.activeSessionId});if(b!=="chatState")d(i,p.activeSessionId,b)}let f=G(h);if(!r.length)return[];let c=Qi(f.messages,r).slice(-Z);if(!Zi(f.messages,c))return[];if(f.messages=c,f.title==="New chat"){let l=f.messages.find((w)=>w.role==="user");if(l)f.title=l.text.slice(0,48)||f.title}return f.updatedAt=Date.now(),_(h),f.messages}function Zi(i,h){if(i.length!==h.length)return!0;return i.some((p,b)=>Oi(p)!==Oi(h[b]))}function Oi(i){return JSON.stringify({id:i.id,role:i.role,text:i.text,thinking:i.thinking,streaming:i.streaming,toolCalls:i.toolCalls,attachments:i.attachments})}function Mp(i,h,p,b,r){let f=t(p.messages),c=typeof p.activeSessionId==="string"&&p.activeSessionId?p.activeSessionId:r,l=h.activeSessionId===r;if(c!==r)if(l)M(h,c),u(i,{sessionId:c,workspaceId:g(i).id||void 0}),V(i,"chat-session",{reason:b,sessionId:c}),d(i,c,b);else N(h,c);let w=N(h,c);if(!f.length)return[];let L=Qi(w.messages,f).slice(-Z);if(!Zi(w.messages,L))return[];return w.messages=L,w.updatedAt=Date.now(),_(h),w.messages}function Fp(i,h,p,b,r){let f=(L)=>{if(!L?.sessionId)return;if(Vi(h,b,L))return;u(h,L),M(b,L.sessionId),$(p,G(b).messages,b.activeSessionId);let T=Bi(h,L);K(h,p,b,r,L.sessionId,T.path,T.id)},c=(L)=>{if(Up(h,p,b,r,L))return;let T=Vp(h,L);if(T)f(T)},l=h.app?.piWebSidebar?.channels?.selectedSession$||globalThis.piWebSidebar?.channels?.selectedSession$,w=h.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$;if(l)i.add(l.subscribe(f));if(w)i.add(w.subscribe(c));if(h.app)i.listen(h.app,"pi-web-sidebar:session-created",(L)=>{let T=L.detail||{},C=typeof T.sessionId==="string"?T.sessionId:"",E=typeof T.workspaceId==="string"?T.workspaceId:"";if(C)f({sessionId:C,workspaceId:E||void 0})});if(globalThis.piWeb)i.add(globalThis.piWeb.behaviorSubject(Hi,D(h)).subscribe(f)),i.add(globalThis.piWeb.subject(Ri).subscribe(c)),i.add(globalThis.piWeb.behaviorSubject("session.activeId",null).subscribe((L)=>{if(!L)return;f({sessionId:L,workspaceId:h.app?.dataset.activeWorkspaceId||Y(X)||void 0})}))}function Bp(i,h){let p=D(i);if(p?.sessionId&&!Vi(i,h,p))u(i,p),M(h,p.sessionId);return h.activeSessionId}function Vi(i,h,p){let b=p.workspaceId||"",r=i.app?.dataset.activeWorkspaceId||Y(X)||"";return h.activeSessionId===p.sessionId&&(!b||b===r)}function Up(i,h,p,b,r){if(r.type!=="session.deleted")return!1;let f=Di(r);if(!f)return!0;let c=p.activeSessionId===f,l=p.sessions.length;if(p.sessions=p.sessions.filter((w)=>w.id!==f),c){b.runEventsAbort?.abort(),b.sessionEventsAbort?.abort();let w=Zp(i,r,f);if(w?.sessionId){u(i,w),M(p,w.sessionId),Gp(h,G(p).messages,p.activeSessionId);let L=Bi(i,w);return K(i,h,p,b,w.sessionId,L.path,L.id),!0}return p.activeSessionId="",lp(i),_(p),S(h),!0}if(p.sessions.length!==l)_(p);return!0}function Zp(i,h,p){let b=h.snapshot?.activeSessionId||"",r=h.snapshot?.activeWorkspaceId||"";if(b&&b!==p)return{sessionId:b,workspaceId:r||void 0};let f=D(i);if(f?.sessionId&&f.sessionId!==p)return f;return null}function Vp(i,h){if(!Dp(h.type))return null;let p=h.detail||{},b=Di(h)||h.snapshot?.activeSessionId||"",r=typeof p.workspaceId==="string"?p.workspaceId:h.snapshot?.activeWorkspaceId||i.app?.dataset.activeWorkspaceId||"";if(!b)return null;return{sessionId:b,workspaceId:r||void 0}}function Di(i){let h=i.detail||{};if(typeof h.sessionId==="string")return h.sessionId;if(typeof h.id==="string")return h.id;return""}function Dp(i){return i==="session.selected"||i==="session.created"||i==="new-session"||i==="active.start"}function M(i,h){let p=i.sessions.find((b)=>b.id===h);if(!p)p=J(h),i.sessions.unshift(p);return i.activeSessionId=p.id,_(i),p}function $(i,h,p){if(qi(h,p),!h.length){S(i);return}(i.querySelector(".term-inner")||i).replaceChildren(...h.map((r)=>ji(r,p))),o(i)}function Gp(i,h,p){qi(h,p),(i.querySelector(".term-inner")||i).replaceChildren(...h.map((r)=>ji(r,p))),o(i)}function S(i){let h=i.querySelector(".term-inner")||i,p=document.createElement("article");p.className="pi-web-chat-docs",p.setAttribute("aria-label","pi-web-chat guide");let b=document.createElement("h1");b.textContent="pi-web-chat guide";let r=document.createElement("p");r.textContent=["Select or create a session in the sidebar to load chat history,","or type below to start a new session."].join(" ");let f=document.createElement("ul");for(let c of["Ask pi in the prompt box and press Cmd/Ctrl+Enter to send.","Use / for slash commands, @ for file references, and ! for shell commands.","Chats are cached locally after you start or select a session."]){let l=document.createElement("li");l.textContent=c,f.append(l)}p.append(b,r,f),h.replaceChildren(p),o(i)}function jp(i,h){let p=h.querySelector(".term"),b=h.querySelector("[data-action='scroll-bottom']");if(!p||!b)return;let r={term:p,button:b,pinned:!0,touchStartY:null};a.set(h,r),b.hidden=!1,q(r),i.listen(b,"click",()=>{r.pinned=!0,Gi(r),q(r)}),i.listen(p,"wheel",(f)=>{if(f.deltaY<0)Ei(r)}),i.listen(p,"touchstart",(f)=>{let c=f;r.touchStartY=c.touches.item(0)?.clientY??null}),i.listen(p,"touchmove",(f)=>{let l=f.touches.item(0)?.clientY;if(typeof l==="number"&&r.touchStartY!==null&&l-r.touchStartY>8)Ei(r)}),i.listen(p,"touchend",()=>{r.touchStartY=null}),i.add({remove:()=>{a.delete(h)}})}function o(i){let h=a.get(i);if(!h)return;if(h.pinned)Gi(h);q(h)}function Gi(i){i.term.scrollTop=i.term.scrollHeight}function Ei(i){i.pinned=!1,q(i)}function q(i){i.button.dataset.pinned=i.pinned?"true":"false",i.button.setAttribute("aria-pressed",i.pinned?"true":"false")}function ji(i,h){let p=document.createElement("article");p.className="transcript-item",p.dataset.messageId=i.id;let b=document.createElement("div");b.className="msg",b.dataset.kind=k(i.role);let r=document.createElement("span");r.className=`prefix ${k(i.role)}`,r.textContent=mp(i.role);let f=document.createElement("pre");if(f.className=`body ${k(i.role)}`,f.textContent=i.text,b.append(r,f),qp(i))p.append(b);if(i.thinking)p.append(Jp(i.thinking,Boolean(i.streaming)));for(let c of i.toolCalls||[])p.append(Yp(c,Ji(h,i,c)));if(i.streaming)p.dataset.streaming="true";return p}function qp(i){let h=i.text.trim().length>0;return i.role!=="assistant"||h}function Jp(i,h){let p=document.createElement("details");p.className="msg-detail think thinking-block",p.open=h;let b=document.createElement("summary");b.className="label",b.textContent="THINKING";let r=document.createElement("pre");return r.className="body",r.textContent=i,p.append(b,r),p}function qi(i,h){let p=new Set;for(let b of i)for(let r of b.toolCalls||[])p.add(Ji(h,b,r));for(let b of z)if(!p.has(b))z.delete(b)}function Ji(i,h,p){return`${i}:${h.id}:${p.id}`}function Yp(i,h){let p=document.createElement("div");p.className="tool-card",p.dataset.tool=i.name||"tool",p.dataset.status=i.status;let b=!z.has(h);p.dataset.collapsed=b?"true":"false";let r=document.createElement("button");if(r.type="button",r.className="tc-head",r.title=b?"Show tool output":"Hide tool output",r.setAttribute("aria-expanded",b?"false":"true"),r.setAttribute("aria-label",`${b?"Show":"Hide"} ${i.name||"tool"} output`),r.append(Pp(i),Wp(i),xp(i),vp(i,b)),!b)p.append(Yi(i));return r.addEventListener("click",()=>Kp(p,r,i,h)),p.prepend(r),p}function Yi(i){let h=document.createElement("pre");return h.className="tc-body",h.textContent=i.text||kp(i),h}function Xp(i,h){let p=0,b,r=h.ownerDocument.defaultView,f=typeof r?.matchMedia==="function"?r.matchMedia("(prefers-reduced-motion: reduce)"):void 0,c=()=>{if(b)clearInterval(b),b=void 0},l=()=>{p=(p+1)%gi;for(let T of h.querySelectorAll(".spinner"))T.dataset.frame=String(p)},w=()=>{let T=h.querySelectorAll(".spinner");if(f?.matches||T.length===0){c(),p=0;for(let C of T)C.dataset.frame="0";return}if(!b)b=setInterval(l,ei)},L=new(r?.MutationObserver||MutationObserver)(w);L.observe(h,{childList:!0,subtree:!0}),f?.addEventListener("change",w),w(),i.add({remove:()=>{L.disconnect(),f?.removeEventListener("change",w),c()}})}function Qp(){let i=document.createElement("span");i.className="spinner",i.dataset.frame="0",i.setAttribute("aria-hidden","true");for(let h=0;h<gi;h+=1)i.append(document.createElement("span"));return i}function Kp(i,h,p,b){let r=i.querySelector(".tc-body"),f=r!==null;if(r)r.remove(),z.delete(b);else i.append(Yi(p)),z.add(b);i.dataset.collapsed=f?"true":"false",h.setAttribute("aria-expanded",f?"false":"true"),h.setAttribute("aria-label",`${f?"Show":"Hide"} ${i.dataset.tool||"tool"} output`),h.title=f?"Show tool output":"Hide tool output";let c=h.querySelector(".tc-toggle-label");if(c)c.textContent=f?"show":"hide"}function Pp(i){let h=document.createElement("span");h.className="tc-glyph";let p=ap(i),b=p?ip[p]:"";if(!p||!b)return h.textContent="●",h;return h.innerHTML=`<svg class="tc-icon" data-tool-icon="${p}" aria-hidden="true" viewBox="0 0 24 24">${b}</svg>`,h}function Wp(i){let h=document.createElement("span");return h.className="tc-name",h.textContent=i.name||"tool",h}function xp(i){let h=document.createElement("span");return h.className="tc-args",h.textContent=Xi(i),h}function vp(i,h){let p=document.createElement("span");if(p.className="tc-meta",i.status==="running"){let f=Qp(),c=document.createElement("span");return c.className="running",c.textContent="running",p.append(f,c,yi(h)),p}let b=document.createElement("span");b.className=i.status==="err"?"err":"ok",b.textContent=i.status==="err"?"✗":"✓";let r=document.createElement("span");return r.textContent=i.status==="err"?" · failed":" · done",p.append(b,r,yi(h)),p}function yi(i){let h=document.createElement("span");h.className="tc-toggle";let p=document.createElement("span");p.className="tc-toggle-label",p.textContent=i?"show":"hide";let b=document.createElement("span");return b.className="tc-caret",b.textContent="▸",h.append(p,b),h}function Xi(i){if(i.argsStatus==="truncated")return"arguments truncated";if(i.argsStatus==="omitted")return"arguments omitted";if(i.argsStatus==="unavailable")return"arguments unavailable";if(i.argsStatus==="empty")return"no arguments";if(!i.args)return"";return JSON.stringify(i.args)}function kp(i){if(i.argsStatus==="truncated")return"arguments truncated: too large to display";if(i.argsStatus==="omitted")return"arguments omitted: response too large";if(i.argsStatus==="unavailable")return"arguments unavailable";if(i.argsStatus==="empty")return"no arguments";if(!i.args)return"arguments unavailable";return JSON.stringify(i.args,null,2)}function ap(i){let h=np(i.name);if(["bash","shell","sh","zsh","terminal"].includes(h))return dp(Xi(i).toLowerCase())||"terminal";return pp[h]}function np(i){return i.trim().replace(/^functions\./,"").replace(/^multi_tool_use\./,"")}function dp(i){if(/\bgit\b|\bgh\b/.test(i))return"git-branch";if(/\b(go test|bun test|npm test|pnpm test|yarn test|vitest|pytest|cargo test)\b/.test(i))return"circle-check";if(/\b(bun|npm|pnpm|yarn)\s+(run\s+)?build\b|\b(go build|cargo build)\b/.test(i))return"hammer";if(/\b(bun|npm|pnpm|yarn)\s+(add|install|i)\b|\bpip\s+install\b|\bgo\s+get\b/.test(i))return"package";return}function mp(i){if(i==="assistant")return"pi >";if(i==="user")return"you >";if(i==="system")return"sys >";return"tool >"}function k(i){if(i==="assistant")return"pi";if(i==="system")return"sys";return i}function Qi(i,h){let p=new Map;for(let b of i)p.set(b.id,b);for(let b of h)p.set(b.id,{...p.get(b.id),...b});return[...p.values()].sort((b,r)=>b.createdAt-r.createdAt)}function G(i){return N(i,i.activeSessionId,!0)}function N(i,h,p=!1){let b=i.sessions.find((r)=>r.id===h);if(!b)b=J(h||void 0),i.sessions.unshift(b),_(i);if(p||!i.activeSessionId)i.activeSessionId=b.id,_(i);return b}function Ip(i,h,p,b){if(h===p)return;let r=i.sessions.find((w)=>w.id===h),f=r?.messages.findIndex((w)=>w.id===b)??-1;if(!r||f<0)return;let[c]=r.messages.splice(f,1),l=N(i,p);if(!l.messages.some((w)=>w.id===c.id))l.messages.push(c);r.updatedAt=Date.now(),l.updatedAt=Date.now(),_(i)}function J(i=P()){let h=Date.now();return{id:i,title:"New chat",createdAt:h,updatedAt:h,messages:[]}}function Y(i){try{return localStorage.getItem(i)||""}catch{return""}}function Sp(i=""){try{let p=JSON.parse(localStorage.getItem(j)||"null");if(p&&typeof p.activeSessionId==="string"&&Array.isArray(p.sessions)){let b=p.sessions.filter(Pi).map(tp);if(i&&!b.some((r)=>r.id===i))b.unshift(J(i));return{activeSessionId:i||p.activeSessionId,sessions:b}}}catch{}let h=J(i||void 0);return{activeSessionId:h.id,sessions:[h]}}function op(){try{let i=JSON.parse(localStorage.getItem(j)||"null");return Boolean(i&&Array.isArray(i.sessions)&&i.sessions.some(Pi))}catch{return!1}}function _(i){_i(i);try{localStorage.setItem(j,JSON.stringify(i))}catch{for(let h of i.sessions)h.messages=h.messages.slice(-Math.floor(Z/2));_i(i);try{localStorage.setItem(j,JSON.stringify(i))}catch{}}}function Ki(i){if(!i?.length)return;return i.map(({content:h,...p})=>p)}function _i(i){i.sessions.sort((b,r)=>r.updatedAt-b.updatedAt);let h=i.sessions.find((b)=>b.id===i.activeSessionId),p=i.sessions.filter((b)=>b.id!==i.activeSessionId).slice(0,Math.max(0,wi-1));i.sessions=h?[h,...p]:i.sessions.slice(0,wi);for(let b of i.sessions)if(b.messages.length>Z)b.messages.splice(0,b.messages.length-Z)}function Pi(i){return F(i)&&typeof i.id==="string"&&Array.isArray(i.messages)}function tp(i){return{...i,messages:t(i.messages)}}function t(i){return Array.isArray(i)?i.filter(hh).map(sp):[]}function sp(i){if(!Array.isArray(i.toolCalls)){let{toolCalls:h,...p}=i;return p}return{...i,toolCalls:i.toolCalls.filter(ep)}}function ep(i){if(!F(i)||typeof i.id!=="string"||typeof i.name!=="string")return!1;return typeof i.text==="string"&&ph(i.status)&&ih(i.argsStatus)}function ih(i){return i===void 0||i==="present"||i==="empty"||i==="unavailable"||i==="truncated"||i==="omitted"}function ph(i){return i==="running"||i==="ok"||i==="err"}function hh(i){if(!F(i)||typeof i.id!=="string"||typeof i.text!=="string")return!1;return typeof i.createdAt==="number"&&bh(i.role)}function bh(i){return i==="user"||i==="assistant"||i==="tool"||i==="system"}function F(i){return typeof i==="object"&&i!==null}function P(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`}function Wi(i){return i instanceof Error?i.message:String(i)}export{ki as renderMessages,mi as promptFromAgUiLikeRunInput,bi as pluginStyleText,x as pluginClass,Oh as mergeCommands,Q as getActiveWorkspaceId,Ch as extractRefs,hp as default,ii as createComposerSurface,e as createChatSurface,vi as createChatDom,Th as createChannels,di as createAgUiLikeRunInput,fi as commandName,Ii as chatEventsToAgUiLikeEvents,m as backendCall};
