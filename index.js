var U={attachFile:["M16.5 6v11.5a4 4 0 0 1-8 0V5a2.5 2.5 0 0 1 5 0v10.5a1 1 0 0 1-2 0V6H10v9.5","a2.5 2.5 0 0 0 5 0V5a4 4 0 0 0-8 0v12.5a5.5 5.5 0 0 0 11 0V6h-1.5Z"].join(""),stop:"M6 6h12v12H6V6Z",send:"M2 21 23 12 2 3v7l15 2-15 2v7Z",terminal:"M3 4h18v16H3V4Zm2 2v12h14V6H5Zm2 3 1.1-1.1L12.2 12l-4.1 4.1L7 15l3-3-3-3Zm6 6h5v1.5h-5V15Z",file:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 2.5L17.5 8H14V4.5ZM8 13h8v1.5H8V13Zm0 3h8v1.5H8V16Z"},v={attachFile:B("attach_file",U.attachFile),stop:B("stop",U.stop),send:B("send",U.send)};function B(i,h){return`<svg class="material-icon" data-material-icon="${i}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="${h}"></path></svg>`}function W(){return"pi-web-chat-mounted"}function e(){let i=document.createElement("main");return i.className="main pi-web-chat-surface",i.dataset.main="session",i.innerHTML='<div class="term"><div class="term-inner" role="log" aria-live="polite" aria-relevant="additions text"></div></div><button type="button" class="scroll-bottom-btn" data-action="scroll-bottom" aria-label="stick to bottom" title="stick to bottom" aria-pressed="true" hidden>↓</button>',i}function ii(){let i=document.createElement("section");return i.className="prompt-region pi-web-chat-composer",i.innerHTML=`
    <div class="slash-pop" hidden><div class="slash-head">slash commands · type to filter</div><div class="slash-list"></div></div>
    <div class="prompt-bar">
      <button class="attach-btn" type="button" aria-label="attach files" title="attach files">${v.attachFile}</button>
      <input type="file" multiple hidden data-file-input />
      <div class="prompt-input-col"><div class="attach-chips" hidden></div><textarea class="prompt-textarea" aria-label="Prompt" placeholder="ask pi to do something…" rows="1"></textarea></div>
      <div class="prompt-actions">
        <button class="stop-btn" type="button" aria-label="stop" title="stop" hidden>${v.stop}</button>
        <button class="mic-btn" type="button" data-action="toggle-speech-input" aria-label="start voice input" title="voice input" hidden>\uD83C\uDF99</button>
        <button class="send-btn" type="button" aria-label="send" title="send" aria-disabled="true">${v.send}</button>
      </div>
      <div class="drop-overlay" hidden><span>drop to attach</span></div>
    </div>
    <div class="prompt-meta" data-prompt-meta>— | <span class="prompt-meta-item prompt-meta-branch"><span>—</span></span></div>`,i}function pi(i){let h=document.createElement("span");return h.className="prompt-meta-item pi-web-chat-badge",h.textContent="chat plugin",i.querySelector("[data-prompt-meta]")?.append(h),h}function Wi(){let i=document.createElement("section");return i.className="pi-web-chat-root",i.dataset.plugin="pi-web-chat",i.innerHTML=`
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
        <button class="pi-web-chat-icon-btn" type="button" data-attach aria-label="attach files" title="attach files">${B("attach_file",U.attachFile)}</button>
        <input type="file" multiple hidden data-file-input />
        <textarea class="pi-web-chat-textarea" data-chat-input aria-label="Prompt" placeholder="ask pi to do something…" rows="1"></textarea>
        <button class="pi-web-chat-send" type="button" data-send aria-label="send" title="send" aria-disabled="true">${B("send",U.send)}</button>
      </div>
    </section>`,{root:i,transcript:H(i.querySelector("[data-chat-transcript]")),textarea:H(i.querySelector("[data-chat-input]")),sendButton:H(i.querySelector("[data-send]")),attachButton:H(i.querySelector("[data-attach]")),fileInput:H(i.querySelector("[data-file-input]")),slashPopover:H(i.querySelector("[data-slash-popover]")),slashList:H(i.querySelector("[data-slash-list]")),refsPopover:H(i.querySelector("[data-refs-popover]")),refsList:H(i.querySelector("[data-refs-list]")),attachments:H(i.querySelector("[data-attachments]"))}}function xi(i,h){i.replaceChildren(...h.map(ki)),i.scrollTop=i.scrollHeight}function ki(i){let h=document.createElement("article");h.className=`pi-web-chat-message pi-web-chat-message-${i.role}`,h.dataset.messageId=i.id;let p=document.createElement("div");p.className="pi-web-chat-message-role",p.textContent=i.role;let b=document.createElement("pre");if(b.className="pi-web-chat-message-body",b.textContent=i.text,h.append(p,b),i.thinking){let f=document.createElement("details");f.className="pi-web-chat-thinking",f.open=Boolean(i.streaming);let r=document.createElement("summary");r.textContent="thinking";let l=document.createElement("pre");l.textContent=i.thinking,f.append(r,l),h.append(f)}if(i.toolCalls?.length){let f=document.createElement("div");f.className="pi-web-chat-tools";for(let r of i.toolCalls){let l=document.createElement("details");l.className=`pi-web-chat-tool pi-web-chat-tool-${r.status}`,l.open=r.status==="running";let w=document.createElement("summary");w.textContent=`${r.name} · ${r.status}`;let c=document.createElement("pre");c.textContent=r.text||JSON.stringify(r.args||{},null,2),l.append(w,c),f.append(l)}h.append(f)}if(i.streaming){let f=document.createElement("div");f.className="pi-web-chat-message-meta",f.textContent="streaming...",h.append(f)}if(i.attachments?.length){let f=document.createElement("div");f.className="pi-web-chat-message-meta",f.textContent=`${i.attachments.length} attachment(s)`,h.append(f)}return h}function hi(i,h){i.hidden=h.length===0,i.replaceChildren(...h.map((p)=>{let b=document.createElement("span");return b.className="pi-web-chat-attachment-chip",b.textContent=p,b}))}function bi(){return`
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
  `}function fi(){document.getElementById("pi-web-chat-style")?.remove();let i=document.createElement("style");return i.id="pi-web-chat-style",i.textContent=bi(),document.head.append(i),i}function ri(i){return i.command||i.cmd||(i.name?`/${i.name}`:"")}function H(i){if(!i)throw Error("pi-web-chat DOM template is invalid");return i}function ai(i,h,p){return{threadId:i,runId:h,state:{},messages:p,tools:[],context:[]}}function ni(i){let h=[...i.messages].reverse().find((p)=>p.role==="user");return{text:h?.text||"",attachments:h?.attachments||[],sessionId:i.threadId}}function di(i,h,p){return i.map((b)=>Ii(b,h,p))}function Ii(i,h,p){if(i.type==="text.delta")return{type:"TEXT_MESSAGE_CONTENT",threadId:h,runId:p,delta:i.delta||""};if(i.type==="thinking.delta")return{type:"THINKING_MESSAGE_CONTENT",threadId:h,runId:p,delta:i.delta||""};if(i.type==="tool.start")return{type:"TOOL_CALL_START",threadId:h,runId:p,toolCallId:i.toolCallId,payload:li(i)};if(i.type==="tool.delta")return{type:"TOOL_CALL_ARGS",threadId:h,runId:p,toolCallId:i.toolCallId,delta:i.delta||""};if(i.type==="tool.end")return{type:"TOOL_CALL_END",threadId:h,runId:p,toolCallId:i.toolCallId,payload:li(i)};return{type:i.type.toUpperCase().replaceAll(".","_"),threadId:h,runId:p,payload:i}}function li(i){return{name:i.toolName||"tool",args:i.args||{},result:i.result||"",isError:i.isError===!0}}var j="pi-web-chat.sessions.v1";var _i="plugin.pi-web-sidebar.selectedSession",Hi="plugin.pi-web-sidebar.event",n="plugin.pi-web-sidebar.activeSessionId",X="plugin.pi-web-sidebar.activeWorkspaceId";var ci=20,Z=200,mi=8,Si=1e6;var oi=250,Ri=6,ti=150,M=new Set,si={"book-open":'<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',"file-plus":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="M9 15h6"/>',pencil:'<path d="M21.2 6.8 17.2 2.8a2 2 0 0 0-2.8 0L3 14.2V21h6.8L21.2 9.6a2 2 0 0 0 0-2.8z"/><path d="m14 5 5 5"/>',terminal:'<path d="m4 17 6-6-6-6"/><path d="M12 19h8"/>',cpu:'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 15h3"/><path d="M1 9h3"/><path d="M1 15h3"/>',globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 0 20"/><path d="M12 2a15.3 15.3 0 0 0 0 20"/>',search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',braces:'<path d="M8 3H7a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-4a2 2 0 0 1 2-2 2 2 0 0 1-2-2V7a2 2 0 0 0-2-2h-1"/>',"file-text":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',"circle-question-mark":'<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 1 1 5.8 1c-.5 1-1.4 1.5-2.1 2-.6.4-.8.8-.8 2"/><path d="M12 17h.01"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',plug:'<path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a6 6 0 0 1-12 0V8Z"/>',"git-branch":'<line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',"circle-check":'<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',hammer:'<path d="m15 12-8.5 8.5a2.1 2.1 0 0 1-3-3L12 9"/><path d="m17.6 5.4 1.8-1.8"/><path d="m14 7 3 3"/><path d="M5 11 2 8l6-6 3 3"/>',package:'<path d="m7.5 4.3 9 5.2"/><path d="M21 8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>'},a=new WeakMap,ei={read:"book-open",write:"file-plus",edit:"pencil",ctx_execute:"cpu",ctx_batch_execute:"cpu",ctx_execute_file:"cpu",ctx_search:"cpu",ctx_index:"cpu",ctx_fetch_and_index:"cpu",web_search:"globe",fetch_content:"search",get_search_content:"search",code_search:"braces",document_parse:"file-text",ask_user_question:"circle-question-mark",teams:"users",subagent:"users",mcp:"plug",git:"git-branch"};class $i{#i=[];add(i){if(i)this.#i.push(i);return i}listen(i,h,p){i.addEventListener(h,p),this.add({remove:()=>i.removeEventListener(h,p)})}dispose(){for(let i of this.#i.splice(0).reverse())if(typeof i==="function")i();else if("unsubscribe"in i)i.unsubscribe();else i.remove()}}function ip(i={}){let h=i.app;if(h?.piWebChat?.dispose(),typeof i.mount?.chat!=="function"||typeof i.mount?.composer!=="function")throw Error("pi-web-chat requires modern pi-web mount.chat and mount.composer APIs");return pp(i,h)}function pp(i,h){let p=new $i,b=p.add(fi()),f=e(),r=ii(),l=i.mount?.chat(f,{replace:!0}),w=i.mount?.composer(r,{replace:!0});if(Vp(p,f),qp(p,f),l)p.add(l);if(w)p.add(w);let c=D(i);z(i,c||void 0);let L=!c?.sessionId&&!dp(),T=np(c?.sessionId||""),C={backendChatToken:0};if(L)S(f);else A(f,G(T).messages,T.activeSessionId),K(i,f,T,C,c?.sessionId||T.activeSessionId);zp(p,i,f,T,C),hp(p,i,r,f,T,C);let E=h?p.add(pi(h)):void 0;h?.classList.add(W());let N=()=>{if(C.runEventsAbort?.abort(),C.sessionEventsAbort?.abort(),p.dispose(),M.clear(),E?.remove(),b.remove(),h?.classList.remove(W()),h?.piWebChat===_)delete h.piWebChat},_={dispose:N};if(h)h.piWebChat=_;return N}function hp(i,h,p,b,f,r){let l=p.querySelector(".prompt-textarea"),w=p.querySelector(".send-btn"),c=p.querySelector(".attach-btn"),L=p.querySelector("[data-file-input]"),T=p.querySelector(".attach-chips");if(!l||!w)return;let C=[],E=()=>{let O=l.value;w.setAttribute("aria-disabled",O.trim()?"false":"true")},N=()=>{if(!T)return;hi(T,C.map((O)=>{return O.name||"attachment"}))},_=async(O)=>{O?.preventDefault(),O?.stopImmediatePropagation();let R=l.value.trim();if(E(),!R)return;let s=[...C];w.disabled=!0;try{if(Ep(R,s),await wp(h,b,f,r,R,s),C=[],N(),l.value.trim()===R)l.value="";if(L)L.value=""}catch(vi){A(b,[bp(vi)],f.activeSessionId)}finally{w.disabled=!1,E()}};if(i.listen(l,"input",E),i.listen(l,"keydown",(O)=>{let R=O;if(R.key==="Enter"&&(R.metaKey||R.ctrlKey))_(R)}),i.listen(w,"click",(O)=>{_(O)}),c&&L)i.listen(c,"click",()=>L.click()),i.listen(L,"change",()=>{fp(L,(O)=>{C=O,N()})})}function bp(i){return{id:P(),role:"system",text:`prompt failed: ${Pi(i)}`,createdAt:Date.now()}}async function fp(i,h){let p=Array.from(i.files||[]).slice(0,mi),b=[];for(let f of p){if(f.size>Si)continue;b.push({name:f.name,size:f.size,content:await f.text(),mimeType:f.type||void 0})}h(b)}function rh(i){return{input$:i.behaviorSubject("chat.input",""),submitted$:i.subject("chat.input.submitted"),activeSessionId$:i.behaviorSubject("session.activeId",null),sidebarSelectedSession$:i.behaviorSubject(_i,rp()),toastRequested$:i.subject("toast.requested")}}function lh(i){let h=[],p=new Set,b=/(^|[\s`])@([^\s@`]+)/g,f=b.exec(String(i||""));while(f!==null){let r=f[2]||"";if((f[1]||"")!=="`"&&r&&!p.has(r))p.add(r),h.push(r);f=b.exec(String(i||""))}return h}function ch(i=[],h=[]){let p=[],b=new Set;for(let f of[...i,...h]){let r=ri(f);if(!r||b.has(r))continue;b.add(r),p.push(f)}return p}function Q(i){return i.app?.piWebSidebar?.getSnapshot?.().activeWorkspaceId||i.app?.dataset.activeWorkspaceId||""}function rp(){return D({})}function D(i){let h=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),p=h?.activeSessionId||"",b=h?.activeWorkspaceId||"";if(p)return{sessionId:p,workspaceId:b||void 0};let f=Y(n),r=Y(X);return f?{sessionId:f,workspaceId:r||void 0}:null}function z(i,h){if(h?.workspaceId&&i.app)i.app.dataset.activeWorkspaceId=h.workspaceId,wi(X,h.workspaceId);if(h?.sessionId)i.app?.setAttribute("data-active-session-id",h.sessionId),wi(n,h.sessionId)}function lp(i){i.app?.removeAttribute("data-active-session-id"),cp(n),globalThis.piWeb?.behaviorSubject("session.activeId",null).next(null)}function V(i,h,p={}){let b=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),f={type:h,detail:p,snapshot:b};(i.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$)?.next(f),globalThis.piWeb?.subject(Hi).next(f)}function d(i,h,p){let b=i.app?.dataset.activeWorkspaceId||Q(i),f={reason:p,sessionId:h,workspaceId:b};globalThis.piWeb?.behaviorSubject("session.activeId",h).next(h),globalThis.piWeb?.subject("session.changed").next({sessionId:h,workspaceId:b,reason:p}),V(i,"active.start",f),V(i,"session.created",f)}function wi(i,h){try{localStorage.setItem(i,h)}catch{}}function cp(i){try{localStorage.removeItem(i)}catch{}}async function I(i,h,p={},b=Q(i)){if(!i.backend)return{};let f=await i.backend(h,{workspaceId:b,data:p});return F(f)?f:{}}async function wp(i,h,p,b,f,r){let l=Mp(i,p),w=$(i);b.backendChatToken+=1,b.runEventsAbort?.abort();let c=new AbortController;b.runEventsAbort=c,b.sessionEventsAbort?.abort();let L={id:P(),role:"user",text:f,attachments:Qi(r),createdAt:Date.now()},T=g(p,l);T.messages.push(L),T.updatedAt=Date.now(),y(p),A(h,T.messages,l);let C=await yp(i,f,r,l,w.path,w.id);if(typeof C.activeSessionId==="string"&&C.activeSessionId){let _=l,O=p.activeSessionId===_;if(l=C.activeSessionId,O)u(p,l),z(i,{sessionId:C.activeSessionId,workspaceId:w.id||void 0}),V(i,"chat-session",{reason:"startPrompt",sessionId:C.activeSessionId}),d(i,C.activeSessionId,"startPrompt");else g(p,l);ap(p,_,l,L.id)}if(typeof C.runId!=="string"||!C.runId){let _=await Hp(i,f,r,l,w.path,w.id),O=gp(i,p,_,"submitPrompt",l);if(p.activeSessionId===l)A(h,O,l);if(b.runEventsAbort===c)b.runEventsAbort=void 0;return}let E=g(p,l),N=Rp(E);try{await Lp(i,p,E,C.runId,w.path,w.id,N,()=>{if(p.activeSessionId===l)A(h,E.messages,l)},c.signal)}finally{if(b.runEventsAbort===c)b.runEventsAbort=void 0}if(p.activeSessionId===l)K(i,h,p,b,l,w.path,w.id)}async function Lp(i,h,p,b,f,r,l,w,c){let L=await Ni(i,"streamEventsSse",{runId:b,cursor:0,workspacePath:f},c,r);if(!L)throw Error("SSE streaming backend did not return a stream");let T=Ai(w);l.streaming=!0,T.flush();try{await gi(L,(C)=>{$p(l,[C]),l.streaming=C.type!=="run.end",p.updatedAt=Date.now(),y(h),T.request()})}finally{l.streaming=!1,y(h),T.flush()}}function Ai(i){let h=0,p,b=()=>{if(p)clearTimeout(p),p=void 0},f=()=>{b(),h=Date.now(),i()};return{request:()=>{let l=oi-(Date.now()-h);if(l<=0){f();return}p||=setTimeout(f,l)},flush:f,cancel:b}}async function Ni(i,h,p={},b,f=Q(i)){if(!i.backendStream)throw Error("SSE streaming backend is unavailable");let r=await i.backendStream(h,{workspaceId:f,data:p},{signal:b});return Tp(r)}function Tp(i){if(typeof ReadableStream<"u"&&i instanceof ReadableStream)return i;if(typeof Response<"u"&&i instanceof Response)return i.body;if(typeof i==="string")return Li(i);if(!F(i))return null;let h=i.body;if(typeof ReadableStream<"u"&&h instanceof ReadableStream)return h;let p=i.sse;if(typeof p==="string")return Li(p);return null}function Li(i){let h=new TextEncoder().encode(i);return new ReadableStream({start(p){p.enqueue(h),p.close()}})}async function gi(i,h){let p=i.getReader(),b=new TextDecoder,f="";while(!0){let r=await p.read();if(r.done){f+=b.decode(),Op(f,h);return}f+=b.decode(r.value,{stream:!0});let l=Cp(f);f=l.remainder;for(let w of l.frames)zi(w,h)}}function Cp(i){let p=i.replaceAll(`\r
`,`
`).replaceAll("\r",`
`).split(`

`),b=p.pop()||"";return{frames:p,remainder:b}}function Op(i,h){let p=i.trim();if(p)zi(p,h)}function zi(i,h){let p=i.split(`
`).filter((b)=>b.startsWith("data:")).map((b)=>b.slice(5).trimStart()).join(`
`);if(!p)return;try{let b=JSON.parse(p);if(Ap(b))h(b)}catch{}}function Ep(i,h){globalThis.piWeb?.subject("chat.input.submitted").next({text:i,attachments:Qi(h)||[]})}async function yp(i,h,p,b,f=$(i).path,r=$(i).id){try{return await I(i,"startPrompt",Mi(h,p,b,f),r)}catch(l){if(_p(l))return{};throw l}}function _p(i){return/unknown method: (startPrompt|streamEventsSse)|unsupported method: (startPrompt|streamEventsSse)|(startPrompt|streamEventsSse) unsupported/i.test(Pi(i))}async function Hp(i,h,p,b="",f=$(i).path,r=$(i).id){return await I(i,"submitPrompt",Mi(h,p,b,f),r)}function Mi(i,h,p,b){let f={text:i,attachments:h,sessionId:p};if(b)f.workspacePath=b;return f}function Rp(i){let h=[...i.messages].reverse().find((b)=>b.role==="assistant"&&b.streaming);if(h)return h;let p={id:P(),role:"assistant",text:"",createdAt:Date.now(),streaming:!0};return i.messages.push(p),p}function $p(i,h){for(let p of h)if(p.type==="text.delta"&&typeof p.delta==="string")i.text+=p.delta;else if(p.type==="thinking.delta"&&typeof p.delta==="string")i.thinking=`${i.thinking||""}${p.delta}`;else if(p.type==="tool.start")x(i,p,"running");else if(p.type==="tool.delta"&&typeof p.delta==="string"){let b=x(i,p,"running");b.text=p.delta}else if(p.type==="tool.end"){let b=x(i,p,p.isError?"err":"ok");if(typeof p.result==="string"&&p.result)b.text=p.result}else if(p.type==="error"&&typeof p.message==="string")i.text+=`${i.text?`
`:""}${p.message}`}function x(i,h,p){let b=h.toolCallId||h.toolName||"tool";i.toolCalls||=[];let f=i.toolCalls.find((r)=>r.id===b);if(!f)f={id:b,name:h.toolName||"tool",args:h.args,text:"",status:p},i.toolCalls.push(f);if(f.status=p,h.args)f.args=h.args;return f}function Ap(i){return F(i)&&typeof i.type==="string"}async function K(i,h,p,b,f="",r=m(i),l=$(i).id){if(!i.backendStream){await Ti(i,h,p,b,f,r);return}let w=++b.backendChatToken;b.sessionEventsAbort?.abort();let c=new AbortController;b.sessionEventsAbort=c;let L=Ai(()=>{A(h,G(p).messages,p.activeSessionId)});try{let T=await Ni(i,"sessionEventsSse",ui(i,f,r),c.signal,l);if(!T)throw Error("session SSE backend did not return a stream");await gi(T,(C)=>{if(w!==b.backendChatToken||C.type!=="chat.state")return;if(Ui(i,p,Np(C),"chatState").length)L.request()})}catch(T){if(!c.signal.aborted)await Ti(i,h,p,b,f,r)}finally{if(L.cancel(),b.sessionEventsAbort===c)b.sessionEventsAbort=void 0}}async function Ti(i,h,p,b,f="",r=m(i)){let l=++b.backendChatToken;try{let w=await I(i,"chatState",ui(i,f,r));if(l!==b.backendChatToken)return;let c=Ui(i,p,w,"chatState");if(c.length)A(h,c,p.activeSessionId)}catch{}}function ui(i,h,p=m(i)){let b=h?{sessionId:h}:{};if(p)b.workspacePath=p;return b}function Np(i){return{activeSessionId:i.activeSessionId,messages:i.messages,isStreaming:i.isStreaming}}function m(i){return $(i).path}function $(i){let h=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),p=h?.activeWorkspaceId||i.app?.dataset.activeWorkspaceId||"",b=h?.workspaces?.find((f)=>f.id===p)?.path||"";return{id:p,path:b}}function Fi(i,h){let p=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),b=h.workspaceId||p?.activeWorkspaceId||i.app?.dataset.activeWorkspaceId||"",f=p?.workspaces?.find((r)=>r.id===b)?.path||"";if(f||b!==p?.activeWorkspaceId)return{id:b,path:f};return $(i)}function Ui(i,h,p,b){let f=t(p.messages);if(typeof p.activeSessionId==="string"&&p.activeSessionId){let w=h.activeSessionId;if(u(h,p.activeSessionId),z(i,{sessionId:p.activeSessionId,workspaceId:i.app?.dataset.activeWorkspaceId||Q(i)||void 0}),b!=="chatState"||w!==p.activeSessionId)V(i,"chat-session",{reason:b,sessionId:p.activeSessionId});if(b!=="chatState")d(i,p.activeSessionId,b)}let r=G(h);if(!f.length)return[];let l=Xi(r.messages,f).slice(-Z);if(!Bi(r.messages,l))return[];if(r.messages=l,r.title==="New chat"){let w=r.messages.find((c)=>c.role==="user");if(w)r.title=w.text.slice(0,48)||r.title}return r.updatedAt=Date.now(),y(h),r.messages}function Bi(i,h){if(i.length!==h.length)return!0;return i.some((p,b)=>Ci(p)!==Ci(h[b]))}function Ci(i){return JSON.stringify({id:i.id,role:i.role,text:i.text,thinking:i.thinking,streaming:i.streaming,toolCalls:i.toolCalls,attachments:i.attachments})}function gp(i,h,p,b,f){let r=t(p.messages),l=typeof p.activeSessionId==="string"&&p.activeSessionId?p.activeSessionId:f,w=h.activeSessionId===f;if(l!==f)if(w)u(h,l),z(i,{sessionId:l,workspaceId:$(i).id||void 0}),V(i,"chat-session",{reason:b,sessionId:l}),d(i,l,b);else g(h,l);let c=g(h,l);if(!r.length)return[];let L=Xi(c.messages,r).slice(-Z);if(!Bi(c.messages,L))return[];return c.messages=L,c.updatedAt=Date.now(),y(h),c.messages}function zp(i,h,p,b,f){let r=(L)=>{if(!L?.sessionId)return;if(Zi(h,b,L))return;z(h,L),u(b,L.sessionId),A(p,G(b).messages,b.activeSessionId);let T=Fi(h,L);K(h,p,b,f,L.sessionId,T.path,T.id)},l=(L)=>{if(up(h,p,b,f,L))return;let T=Up(h,L);if(T)r(T)},w=h.app?.piWebSidebar?.channels?.selectedSession$||globalThis.piWebSidebar?.channels?.selectedSession$,c=h.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$;if(w)i.add(w.subscribe(r));if(c)i.add(c.subscribe(l));if(h.app)i.listen(h.app,"pi-web-sidebar:session-created",(L)=>{let T=L.detail||{},C=typeof T.sessionId==="string"?T.sessionId:"",E=typeof T.workspaceId==="string"?T.workspaceId:"";if(C)r({sessionId:C,workspaceId:E||void 0})});if(globalThis.piWeb)i.add(globalThis.piWeb.behaviorSubject(_i,D(h)).subscribe(r)),i.add(globalThis.piWeb.subject(Hi).subscribe(l)),i.add(globalThis.piWeb.behaviorSubject("session.activeId",null).subscribe((L)=>{if(!L)return;r({sessionId:L,workspaceId:h.app?.dataset.activeWorkspaceId||Y(X)||void 0})}))}function Mp(i,h){let p=D(i);if(p?.sessionId&&!Zi(i,h,p))z(i,p),u(h,p.sessionId);return h.activeSessionId}function Zi(i,h,p){let b=p.workspaceId||"",f=i.app?.dataset.activeWorkspaceId||Y(X)||"";return h.activeSessionId===p.sessionId&&(!b||b===f)}function up(i,h,p,b,f){if(f.type!=="session.deleted")return!1;let r=Vi(f);if(!r)return!0;let l=p.activeSessionId===r,w=p.sessions.length;if(p.sessions=p.sessions.filter((c)=>c.id!==r),l){b.runEventsAbort?.abort(),b.sessionEventsAbort?.abort();let c=Fp(i,f,r);if(c?.sessionId){z(i,c),u(p,c.sessionId),Zp(h,G(p).messages,p.activeSessionId);let L=Fi(i,c);return K(i,h,p,b,c.sessionId,L.path,L.id),!0}return p.activeSessionId="",lp(i),y(p),S(h),!0}if(p.sessions.length!==w)y(p);return!0}function Fp(i,h,p){let b=h.snapshot?.activeSessionId||"",f=h.snapshot?.activeWorkspaceId||"";if(b&&b!==p)return{sessionId:b,workspaceId:f||void 0};let r=D(i);if(r?.sessionId&&r.sessionId!==p)return r;return null}function Up(i,h){if(!Bp(h.type))return null;let p=h.detail||{},b=Vi(h)||h.snapshot?.activeSessionId||"",f=typeof p.workspaceId==="string"?p.workspaceId:h.snapshot?.activeWorkspaceId||i.app?.dataset.activeWorkspaceId||"";if(!b)return null;return{sessionId:b,workspaceId:f||void 0}}function Vi(i){let h=i.detail||{};if(typeof h.sessionId==="string")return h.sessionId;if(typeof h.id==="string")return h.id;return""}function Bp(i){return i==="session.selected"||i==="session.created"||i==="new-session"||i==="active.start"}function u(i,h){let p=i.sessions.find((b)=>b.id===h);if(!p)p=J(h),i.sessions.unshift(p);return i.activeSessionId=p.id,y(i),p}function A(i,h,p){if(ji(h,p),!h.length){S(i);return}(i.querySelector(".term-inner")||i).replaceChildren(...h.map((f)=>Gi(f,p))),o(i)}function Zp(i,h,p){ji(h,p),(i.querySelector(".term-inner")||i).replaceChildren(...h.map((f)=>Gi(f,p))),o(i)}function S(i){let h=i.querySelector(".term-inner")||i,p=document.createElement("article");p.className="pi-web-chat-docs",p.setAttribute("aria-label","pi-web-chat guide");let b=document.createElement("h1");b.textContent="pi-web-chat guide";let f=document.createElement("p");f.textContent=["Select or create a session in the sidebar to load chat history,","or type below to start a new session."].join(" ");let r=document.createElement("ul");for(let l of["Ask pi in the prompt box and press Cmd/Ctrl+Enter to send.","Use / for slash commands, @ for file references, and ! for shell commands.","Chats are cached locally after you start or select a session."]){let w=document.createElement("li");w.textContent=l,r.append(w)}p.append(b,f,r),h.replaceChildren(p),o(i)}function Vp(i,h){let p=h.querySelector(".term"),b=h.querySelector("[data-action='scroll-bottom']");if(!p||!b)return;let f={term:p,button:b,pinned:!0,touchStartY:null};a.set(h,f),b.hidden=!1,q(f),i.listen(b,"click",()=>{f.pinned=!0,Di(f),q(f)}),i.listen(p,"wheel",(r)=>{if(r.deltaY<0)Oi(f)}),i.listen(p,"touchstart",(r)=>{let l=r;f.touchStartY=l.touches.item(0)?.clientY??null}),i.listen(p,"touchmove",(r)=>{let w=r.touches.item(0)?.clientY;if(typeof w==="number"&&f.touchStartY!==null&&w-f.touchStartY>8)Oi(f)}),i.listen(p,"touchend",()=>{f.touchStartY=null}),i.add({remove:()=>{a.delete(h)}})}function o(i){let h=a.get(i);if(!h)return;if(h.pinned)Di(h);q(h)}function Di(i){i.term.scrollTop=i.term.scrollHeight}function Oi(i){i.pinned=!1,q(i)}function q(i){i.button.dataset.pinned=i.pinned?"true":"false",i.button.setAttribute("aria-pressed",i.pinned?"true":"false")}function Gi(i,h){let p=document.createElement("article");p.className="transcript-item",p.dataset.messageId=i.id;let b=document.createElement("div");b.className="msg",b.dataset.kind=k(i.role);let f=document.createElement("span");f.className=`prefix ${k(i.role)}`,f.textContent=kp(i.role);let r=document.createElement("pre");if(r.className=`body ${k(i.role)}`,r.textContent=i.text,b.append(f,r),Dp(i))p.append(b);if(i.thinking)p.append(Gp(i.thinking,Boolean(i.streaming)));for(let l of i.toolCalls||[])p.append(jp(l,qi(h,i,l)));if(i.streaming)p.dataset.streaming="true";return p}function Dp(i){let h=i.text.trim().length>0;return i.role!=="assistant"||h}function Gp(i,h){let p=document.createElement("details");p.className="msg-detail think thinking-block",p.open=h;let b=document.createElement("summary");b.className="label",b.textContent="THINKING";let f=document.createElement("pre");return f.className="body",f.textContent=i,p.append(b,f),p}function ji(i,h){let p=new Set;for(let b of i)for(let f of b.toolCalls||[])p.add(qi(h,b,f));for(let b of M)if(!p.has(b))M.delete(b)}function qi(i,h,p){return`${i}:${h.id}:${p.id}`}function jp(i,h){let p=document.createElement("div");p.className="tool-card",p.dataset.tool=i.name||"tool",p.dataset.status=i.status;let b=!M.has(h);p.dataset.collapsed=b?"true":"false";let f=document.createElement("button");if(f.type="button",f.className="tc-head",f.title=b?"Show tool output":"Hide tool output",f.setAttribute("aria-expanded",b?"false":"true"),f.setAttribute("aria-label",`${b?"Show":"Hide"} ${i.name||"tool"} output`),f.append(Xp(i),Qp(i),Kp(i),Pp(i,b)),!b)p.append(Ji(i));return f.addEventListener("click",()=>Yp(p,f,i,h)),p.prepend(f),p}function Ji(i){let h=document.createElement("pre");return h.className="tc-body",h.textContent=i.text||JSON.stringify(i.args||{},null,2),h}function qp(i,h){let p=0,b,f=h.ownerDocument.defaultView,r=typeof f?.matchMedia==="function"?f.matchMedia("(prefers-reduced-motion: reduce)"):void 0,l=()=>{if(b)clearInterval(b),b=void 0},w=()=>{p=(p+1)%Ri;for(let T of h.querySelectorAll(".spinner"))T.dataset.frame=String(p)},c=()=>{let T=h.querySelectorAll(".spinner");if(r?.matches||T.length===0){l(),p=0;for(let C of T)C.dataset.frame="0";return}if(!b)b=setInterval(w,ti)},L=new(f?.MutationObserver||MutationObserver)(c);L.observe(h,{childList:!0,subtree:!0}),r?.addEventListener("change",c),c(),i.add({remove:()=>{L.disconnect(),r?.removeEventListener("change",c),l()}})}function Jp(){let i=document.createElement("span");i.className="spinner",i.dataset.frame="0",i.setAttribute("aria-hidden","true");for(let h=0;h<Ri;h+=1)i.append(document.createElement("span"));return i}function Yp(i,h,p,b){let f=i.querySelector(".tc-body"),r=f!==null;if(f)f.remove(),M.delete(b);else i.append(Ji(p)),M.add(b);i.dataset.collapsed=r?"true":"false",h.setAttribute("aria-expanded",r?"false":"true"),h.setAttribute("aria-label",`${r?"Show":"Hide"} ${i.dataset.tool||"tool"} output`),h.title=r?"Show tool output":"Hide tool output";let l=h.querySelector(".tc-toggle-label");if(l)l.textContent=r?"show":"hide"}function Xp(i){let h=document.createElement("span");h.className="tc-glyph";let p=vp(i),b=p?si[p]:"";if(!p||!b)return h.textContent="●",h;return h.innerHTML=`<svg class="tc-icon" data-tool-icon="${p}" aria-hidden="true" viewBox="0 0 24 24">${b}</svg>`,h}function Qp(i){let h=document.createElement("span");return h.className="tc-name",h.textContent=i.name||"tool",h}function Kp(i){let h=document.createElement("span");return h.className="tc-args",h.textContent=Yi(i),h}function Pp(i,h){let p=document.createElement("span");if(p.className="tc-meta",i.status==="running"){let r=Jp(),l=document.createElement("span");return l.className="running",l.textContent="running",p.append(r,l,Ei(h)),p}let b=document.createElement("span");b.className=i.status==="err"?"err":"ok",b.textContent=i.status==="err"?"✗":"✓";let f=document.createElement("span");return f.textContent=i.status==="err"?" · failed":" · done",p.append(b,f,Ei(h)),p}function Ei(i){let h=document.createElement("span");h.className="tc-toggle";let p=document.createElement("span");p.className="tc-toggle-label",p.textContent=i?"show":"hide";let b=document.createElement("span");return b.className="tc-caret",b.textContent="▸",h.append(p,b),h}function Yi(i){if(!i.args)return"";return JSON.stringify(i.args)}function vp(i){let h=Wp(i.name);if(["bash","shell","sh","zsh","terminal"].includes(h))return xp(Yi(i).toLowerCase())||"terminal";return ei[h]}function Wp(i){return i.trim().replace(/^functions\./,"").replace(/^multi_tool_use\./,"")}function xp(i){if(/\bgit\b|\bgh\b/.test(i))return"git-branch";if(/\b(go test|bun test|npm test|pnpm test|yarn test|vitest|pytest|cargo test)\b/.test(i))return"circle-check";if(/\b(bun|npm|pnpm|yarn)\s+(run\s+)?build\b|\b(go build|cargo build)\b/.test(i))return"hammer";if(/\b(bun|npm|pnpm|yarn)\s+(add|install|i)\b|\bpip\s+install\b|\bgo\s+get\b/.test(i))return"package";return}function kp(i){if(i==="assistant")return"pi >";if(i==="user")return"you >";if(i==="system")return"sys >";return"tool >"}function k(i){if(i==="assistant")return"pi";if(i==="system")return"sys";return i}function Xi(i,h){let p=new Map;for(let b of i)p.set(b.id,b);for(let b of h)p.set(b.id,{...p.get(b.id),...b});return[...p.values()].sort((b,f)=>b.createdAt-f.createdAt)}function G(i){return g(i,i.activeSessionId,!0)}function g(i,h,p=!1){let b=i.sessions.find((f)=>f.id===h);if(!b)b=J(h||void 0),i.sessions.unshift(b),y(i);if(p||!i.activeSessionId)i.activeSessionId=b.id,y(i);return b}function ap(i,h,p,b){if(h===p)return;let f=i.sessions.find((c)=>c.id===h),r=f?.messages.findIndex((c)=>c.id===b)??-1;if(!f||r<0)return;let[l]=f.messages.splice(r,1),w=g(i,p);if(!w.messages.some((c)=>c.id===l.id))w.messages.push(l);f.updatedAt=Date.now(),w.updatedAt=Date.now(),y(i)}function J(i=P()){let h=Date.now();return{id:i,title:"New chat",createdAt:h,updatedAt:h,messages:[]}}function Y(i){try{return localStorage.getItem(i)||""}catch{return""}}function np(i=""){try{let p=JSON.parse(localStorage.getItem(j)||"null");if(p&&typeof p.activeSessionId==="string"&&Array.isArray(p.sessions)){let b=p.sessions.filter(Ki).map(Ip);if(i&&!b.some((f)=>f.id===i))b.unshift(J(i));return{activeSessionId:i||p.activeSessionId,sessions:b}}}catch{}let h=J(i||void 0);return{activeSessionId:h.id,sessions:[h]}}function dp(){try{let i=JSON.parse(localStorage.getItem(j)||"null");return Boolean(i&&Array.isArray(i.sessions)&&i.sessions.some(Ki))}catch{return!1}}function y(i){yi(i);try{localStorage.setItem(j,JSON.stringify(i))}catch{for(let h of i.sessions)h.messages=h.messages.slice(-Math.floor(Z/2));yi(i);try{localStorage.setItem(j,JSON.stringify(i))}catch{}}}function Qi(i){if(!i?.length)return;return i.map(({content:h,...p})=>p)}function yi(i){i.sessions.sort((b,f)=>f.updatedAt-b.updatedAt);let h=i.sessions.find((b)=>b.id===i.activeSessionId),p=i.sessions.filter((b)=>b.id!==i.activeSessionId).slice(0,Math.max(0,ci-1));i.sessions=h?[h,...p]:i.sessions.slice(0,ci);for(let b of i.sessions)if(b.messages.length>Z)b.messages.splice(0,b.messages.length-Z)}function Ki(i){return F(i)&&typeof i.id==="string"&&Array.isArray(i.messages)}function Ip(i){return{...i,messages:t(i.messages)}}function t(i){return Array.isArray(i)?i.filter(tp).map(mp):[]}function mp(i){if(!Array.isArray(i.toolCalls)){let{toolCalls:h,...p}=i;return p}return{...i,toolCalls:i.toolCalls.filter(Sp)}}function Sp(i){if(!F(i)||typeof i.id!=="string"||typeof i.name!=="string")return!1;return typeof i.text==="string"&&op(i.status)}function op(i){return i==="running"||i==="ok"||i==="err"}function tp(i){if(!F(i)||typeof i.id!=="string"||typeof i.text!=="string")return!1;return typeof i.createdAt==="number"&&sp(i.role)}function sp(i){return i==="user"||i==="assistant"||i==="tool"||i==="system"}function F(i){return typeof i==="object"&&i!==null}function P(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`}function Pi(i){return i instanceof Error?i.message:String(i)}export{xi as renderMessages,ni as promptFromAgUiLikeRunInput,bi as pluginStyleText,W as pluginClass,ch as mergeCommands,Q as getActiveWorkspaceId,lh as extractRefs,ip as default,ii as createComposerSurface,e as createChatSurface,Wi as createChatDom,rh as createChannels,ai as createAgUiLikeRunInput,ri as commandName,di as chatEventsToAgUiLikeEvents,I as backendCall};
