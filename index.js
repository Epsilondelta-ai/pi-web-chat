var Q={attachFile:["M16.5 6v11.5a4 4 0 0 1-8 0V5a2.5 2.5 0 0 1 5 0v10.5a1 1 0 0 1-2 0V6H10v9.5","a2.5 2.5 0 0 0 5 0V5a4 4 0 0 0-8 0v12.5a5.5 5.5 0 0 0 11 0V6h-1.5Z"].join(""),stop:"M6 6h12v12H6V6Z",send:"M2 21 23 12 2 3v7l15 2-15 2v7Z",terminal:"M3 4h18v16H3V4Zm2 2v12h14V6H5Zm2 3 1.1-1.1L12.2 12l-4.1 4.1L7 15l3-3-3-3Zm6 6h5v1.5h-5V15Z",file:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 2.5L17.5 8H14V4.5ZM8 13h8v1.5H8V13Zm0 3h8v1.5H8V16Z"},P={attachFile:K("attach_file",Q.attachFile),stop:K("stop",Q.stop),send:K("send",Q.send),terminal:K("terminal",Q.terminal)};function K(p,b){return`<svg class="material-icon" data-material-icon="${p}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="${b}"></path></svg>`}function v(p){return p.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function t(){return"pi-web-chat-mounted"}function Yp(){let p=document.createElement("main");return p.className="main pi-web-chat-surface",p.dataset.main="session",p.dataset.pluginChatRoot="",p.innerHTML='<div class="term"><div class="term-inner" role="log" aria-live="polite" aria-relevant="additions text"></div></div><button type="button" class="scroll-bottom-btn" data-action="scroll-bottom" aria-label="stick to bottom" title="stick to bottom" aria-pressed="true" hidden>↓</button>',p}function Xp(){let p=document.createElement("section");return p.className="prompt-region pi-web-chat-composer",p.innerHTML=`
    <div class="slash-pop" hidden><div class="slash-head">slash commands · type to filter</div><div class="slash-list"></div></div>
    <div class="prompt-file-ref-pop" hidden><div class="slash-head">project files · type to filter</div><div class="prompt-file-ref-list"></div></div>
    <div class="prompt-bar">
      <button class="attach-btn" type="button" aria-label="attach files" title="attach files">${P.attachFile}</button>
      <input type="file" multiple hidden data-file-input />
      <div class="prompt-input-col"><div class="attach-chips" hidden></div><div class="shell-attachment-note" aria-live="polite" hidden>queued attachments are hidden during shell mode and will reappear for the next normal prompt</div><textarea class="prompt-textarea" aria-label="Prompt" placeholder="ask pi to do something…" rows="1"></textarea></div>
      <div class="prompt-actions">
        <button class="stop-btn" type="button" aria-label="stop" title="stop" hidden>${P.stop}</button>
        <button class="mic-btn" type="button" data-action="toggle-speech-input" aria-label="start voice input" title="voice input" hidden>\uD83C\uDF99</button>
        <button class="send-btn" type="button" aria-label="send" title="send" aria-disabled="true">${P.send}</button>
      </div>
      <div class="drop-overlay" hidden><span>drop to attach</span></div>
    </div>
    <div class="prompt-meta" data-prompt-meta></div>`,g(p,{}),p}function g(p,b={},w=!1){let f=p.querySelector("[data-prompt-meta]");if(!f)return;let h=[W1(b.model||"—",b.thinkingLevel)],i=Ap("5h",b.fiveHourQuota),L=Ap("Week",b.weeklyQuota),O=b.currentBranch||b.branch||"—";if(b.warning)h.push(K1(b.warning));if(i)h.push(i);if(L)h.push(L);if(h.push(Q1(O)),f.innerHTML=h.join(" | "),w)f.append(document.createTextNode(" | "),X1())}function X1(){let p=document.createElement("span");return p.className="prompt-meta-item pi-web-chat-badge",p.textContent="chat plugin",p}function Q1(p){return`<span class="prompt-meta-item prompt-meta-branch">${Qp("git-branch")}<span>${v(p)}</span></span>`}function K1(p){return`<span class="prompt-meta-item prompt-meta-warning" title="${v(p)}">runtime warning</span>`}function W1(p,b){let w=v(p);return b?`${w} (${v(b)})`:w}function Ap(p,b){if(typeof b!=="number"||!Number.isFinite(b))return;let w=Math.max(0,Math.min(100,Math.round(b))),f=w>=70?"full":w>=30?"medium":"low";return`<span class="prompt-meta-item prompt-meta-battery prompt-meta-battery-${f}">${v(p)} ${Qp(`battery-${f}`)}(${w}%)</span>`}function Qp(p){return{"battery-full":'<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 10v4"></path><path d="M14 10v4"></path><path d="M22 14v-4"></path><path d="M6 10v4"></path><rect x="2" y="6" width="16" height="12" rx="2"></rect></svg>',"battery-medium":'<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 14v-4"></path><path d="M22 14v-4"></path><path d="M6 14v-4"></path><rect x="2" y="6" width="16" height="12" rx="2"></rect></svg>',"battery-low":'<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 14v-4"></path><path d="M6 14v-4"></path><rect x="2" y="6" width="16" height="12" rx="2"></rect></svg>',"git-branch":'<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6a9 9 0 0 0-9 9V3"></path><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle></svg>'}[p]||""}function B1(){let p=document.createElement("section");return p.className="pi-web-chat-root",p.dataset.plugin="pi-web-chat",p.innerHTML=`
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
        <button class="pi-web-chat-icon-btn" type="button" data-attach aria-label="attach files" title="attach files">${K("attach_file",Q.attachFile)}</button>
        <input type="file" multiple hidden data-file-input />
        <textarea class="pi-web-chat-textarea" data-chat-input aria-label="Prompt" placeholder="ask pi to do something…" rows="1"></textarea>
        <button class="pi-web-chat-send" type="button" data-send aria-label="send" title="send" aria-disabled="true">${K("send",Q.send)}</button>
      </div>
    </section>`,{root:p,transcript:D(p.querySelector("[data-chat-transcript]")),textarea:D(p.querySelector("[data-chat-input]")),sendButton:D(p.querySelector("[data-send]")),attachButton:D(p.querySelector("[data-attach]")),fileInput:D(p.querySelector("[data-file-input]")),slashPopover:D(p.querySelector("[data-slash-popover]")),slashList:D(p.querySelector("[data-slash-list]")),refsPopover:D(p.querySelector("[data-refs-popover]")),refsList:D(p.querySelector("[data-refs-list]")),attachments:D(p.querySelector("[data-attachments]"))}}function E1(p,b){p.replaceChildren(...b.map(M1)),p.scrollTop=p.scrollHeight}function M1(p){let b=document.createElement("article");b.className=`pi-web-chat-message pi-web-chat-message-${p.role}`,b.dataset.messageId=p.id;let w=document.createElement("div");w.className="pi-web-chat-message-role",w.textContent=p.role;let f=document.createElement("pre");if(f.className="pi-web-chat-message-body",f.textContent=p.text,b.append(w,f),p.thinking){let h=document.createElement("details");h.className="pi-web-chat-thinking",h.open=Boolean(p.streaming);let i=document.createElement("summary");i.textContent="thinking";let L=document.createElement("pre");L.textContent=p.thinking,h.append(i,L),b.append(h)}if(p.toolCalls?.length){let h=document.createElement("div");h.className="pi-web-chat-tools";for(let i of p.toolCalls){let L=document.createElement("details");L.className=`pi-web-chat-tool pi-web-chat-tool-${i.status}`,L.open=i.status==="running";let O=document.createElement("summary");O.textContent=`${i.name} · ${i.status}`;let T=document.createElement("pre");T.textContent=i.text||s(i),L.append(O,T),h.append(L)}b.append(h)}if(p.streaming){let h=document.createElement("div");h.className="pi-web-chat-message-meta",h.textContent="streaming...",b.append(h)}if(p.attachments?.length){let h=document.createElement("div");h.className="pi-web-chat-message-meta",h.textContent=`${p.attachments.length} attachment(s)`,b.append(h)}return b}function c(p){if(p.argsStatus==="truncated")return"arguments truncated";if(p.argsStatus==="omitted")return"arguments omitted";if(p.argsStatus==="unavailable")return"arguments unavailable";if(p.argsStatus==="empty")return"no arguments";if(!p.args)return"";return JSON.stringify(p.args)}function s(p){if(p.argsStatus==="truncated")return"arguments truncated: too large to display";if(p.argsStatus==="omitted")return"arguments omitted: response too large";if(p.argsStatus==="unavailable")return"arguments unavailable";if(p.argsStatus==="empty")return"no arguments";if(!p.args)return"arguments unavailable";return JSON.stringify(p.args,null,2)}function P1(p,b){p.root.dataset.composerMode=b,e(p.attachButton,b)}function e(p,b){if(p.disabled=b==="shell",p.setAttribute("aria-disabled",b==="shell"?"true":"false"),b==="shell"){p.innerHTML=P.terminal,p.title="shell command mode",p.setAttribute("aria-label","shell command mode");return}if(b==="file-ref"){p.innerHTML=K("file",Q.file),p.title="file reference mode",p.setAttribute("aria-label","file reference mode");return}p.innerHTML=P.attachFile,p.title="attach files",p.setAttribute("aria-label","attach files")}function pp(p,b){p.hidden=b.length===0,p.replaceChildren(...b.map((w)=>{let f=document.createElement("span");return f.className="pi-web-chat-attachment-chip",f.textContent=w,f}))}function Kp(){return`
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
  `}function Wp(){document.getElementById("pi-web-chat-style")?.remove();let p=document.createElement("style");return p.id="pi-web-chat-style",p.textContent=Kp(),document.head.append(p),p}function I(p){return p.command||p.cmd||(p.name?`/${p.name}`:"")}function D(p){if(!p)throw Error("pi-web-chat DOM template is invalid");return p}function v1(p,b,w){return{threadId:p,runId:b,state:{},messages:w,tools:[],context:[]}}function k1(p){let b=[...p.messages].reverse().find((w)=>w.role==="user");return{text:b?.text||"",attachments:b?.attachments||[],sessionId:p.threadId}}function x1(p,b,w){return p.map((f)=>r1(f,b,w))}function r1(p,b,w){if(p.type==="text.delta")return{type:"TEXT_MESSAGE_CONTENT",threadId:b,runId:w,delta:p.delta||""};if(p.type==="thinking.delta")return{type:"THINKING_MESSAGE_CONTENT",threadId:b,runId:w,delta:p.delta||""};if(p.type==="tool.start")return{type:"TOOL_CALL_START",threadId:b,runId:w,toolCallId:p.toolCallId,payload:Bp(p)};if(p.type==="tool.delta")return{type:"TOOL_CALL_ARGS",threadId:b,runId:w,toolCallId:p.toolCallId,delta:p.delta||""};if(p.type==="tool.end")return{type:"TOOL_CALL_END",threadId:b,runId:w,toolCallId:p.toolCallId,payload:Bp(p)};return{type:p.type.toUpperCase().replaceAll(".","_"),threadId:b,runId:w,payload:p}}function Bp(p){return{name:p.toolName||"tool",args:p.args||{},result:p.result||"",isError:p.isError===!0}}var S="pi-web-chat.sessions.v1";var Sp="plugin.pi-web-sidebar.selectedSession",mp="plugin.pi-web-sidebar.event",dp="plugin.pi-web-sidebar.activeSessionId",_p="plugin.pi-web-sidebar.activeWorkspaceId",u1=12,Ep=20,k=200,Hp=200,g1=8,c1=1e6,I1=64000;var S1=250,np=6,m1=150,E=new Set,Mp=new WeakMap,d1={"book-open":'<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',"file-plus":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="M9 15h6"/>',pencil:'<path d="M21.2 6.8 17.2 2.8a2 2 0 0 0-2.8 0L3 14.2V21h6.8L21.2 9.6a2 2 0 0 0 0-2.8z"/><path d="m14 5 5 5"/>',terminal:'<path d="m4 17 6-6-6-6"/><path d="M12 19h8"/>',cpu:'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 15h3"/><path d="M1 9h3"/><path d="M1 15h3"/>',globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 0 20"/><path d="M12 2a15.3 15.3 0 0 0 0 20"/>',search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',braces:'<path d="M8 3H7a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-4a2 2 0 0 1 2-2 2 2 0 0 1-2-2V7a2 2 0 0 0-2-2h-1"/>',"file-text":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',"circle-question-mark":'<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 1 1 5.8 1c-.5 1-1.4 1.5-2.1 2-.6.4-.8.8-.8 2"/><path d="M12 17h.01"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',plug:'<path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a6 6 0 0 1-12 0V8Z"/>',"git-branch":'<line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',"circle-check":'<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',hammer:'<path d="m15 12-8.5 8.5a2.1 2.1 0 0 1-3-3L12 9"/><path d="m17.6 5.4 1.8-1.8"/><path d="m14 7 3 3"/><path d="M5 11 2 8l6-6 3 3"/>',package:'<path d="m7.5 4.3 9 5.2"/><path d="M21 8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>'},ip=new WeakMap,n1={read:"book-open",write:"file-plus",edit:"pencil",ctx_execute:"cpu",ctx_batch_execute:"cpu",ctx_execute_file:"cpu",ctx_search:"cpu",ctx_index:"cpu",ctx_fetch_and_index:"cpu",web_search:"globe",fetch_content:"search",get_search_content:"search",code_search:"braces",document_parse:"file-text",ask_user_question:"circle-question-mark",teams:"users",subagent:"users",mcp:"plug",git:"git-branch"};class ap{#p=[];add(p){if(p)this.#p.push(p);return p}listen(p,b,w){p.addEventListener(b,w),this.add({remove:()=>p.removeEventListener(b,w)})}dispose(){for(let p of this.#p.splice(0).reverse())if(typeof p==="function")p();else if("unsubscribe"in p)p.unsubscribe();else p.remove()}}function a1(p={}){let b=p.app;if(b?.piWebChat?.dispose(),typeof p.mount?.chat!=="function"||typeof p.mount?.composer!=="function")throw Error("pi-web-chat requires modern pi-web mount.chat and mount.composer APIs");return o1(p,b)}function o1(p,b){let w=new ap,f=w.add(Wp()),h=Yp(),i=Xp(),L=p.mount?.chat(h,{replace:!0}),O=p.mount?.composer(i,{replace:!0});if(rb(w,h),ob(w,h),L)w.add(L);if(O)w.add(O);let T=W(p);B(p,T||void 0);let $=T?.sessionId?N0(T.sessionId):y0(),H={backendChatToken:0,pendingPromptEchoIds:new Map,pendingAssistantEchoIds:new Map};if(!T?.sessionId)a(h);else j(h,r($).messages,$.activeSessionId),n(p,h,$,H,T.sessionId);Bb(w,p,h,$,H),pb(w,p,i,h,$,H),t1(p,i),b?.classList.add(t());let _=()=>{if(H.runEventsAbort?.abort(),H.sessionEventsAbort?.abort(),w.dispose(),E.clear(),f.remove(),b?.classList.remove(t()),b?.piWebChat===l)delete b.piWebChat},l={dispose:_};if(b)b.piWebChat=l;return _}function t1(p,b){g(b,{}),s1(p,b)}async function s1(p,b){try{let w=await p.backend?.("runtimeStatus",{data:{}}),f=V(w)?w:{},h=V(f.status)?e1(f.status):void 0;if(!h)return;g(b,h)}catch{}}function e1(p){let b={};if(typeof p.model==="string")b.model=p.model;if(typeof p.modelProvider==="string")b.modelProvider=p.modelProvider;if(typeof p.thinkingLevel==="string")b.thinkingLevel=p.thinkingLevel;if(typeof p.fiveHourQuota==="number")b.fiveHourQuota=p.fiveHourQuota;if(typeof p.weeklyQuota==="number")b.weeklyQuota=p.weeklyQuota;if(typeof p.currentBranch==="string")b.currentBranch=p.currentBranch;if(typeof p.branch==="string")b.branch=p.branch;if(typeof p.warning==="string")b.warning=p.warning;return b}function pb(p,b,w,f,h,i){let L=w.querySelector(".prompt-textarea"),O=w.querySelector(".send-btn"),T=w.querySelector(".attach-btn"),$=w.querySelector("[data-file-input]"),H=w.querySelector(".attach-chips"),_=w.querySelector(".shell-attachment-note");if(!L||!O)return;let l=w.querySelector(".prompt-bar"),N=w.querySelector(".slash-pop"),F=w.querySelector(".prompt-file-ref-pop"),C={selectedAttachments:[],shellMode:!1,commands:[]},z=()=>{bb(H,L.value,C)},Y=()=>{wb(l,L,T,_,C)},J=()=>{let Z=L.value,R=Boolean(i.startingRunSessionId||i.fallbackSubmittingSessionId);if(O.disabled=R,O.setAttribute("aria-disabled",Z.trim()&&!R?"false":"true"),z(),Pp(C),C.shellMode){bp(N,F);return}$b(b,w,L,Z,C.commands,(X)=>{C.commands=X}),C.fileSearchTimer=setTimeout(()=>{_b(b,w,L,L.value)},120)},u=()=>{C.shellMode=!0,bp(N,F),Y(),z()},Fp=()=>{C.shellMode=!1,Y(),z()},Up=async(Z)=>{Z?.preventDefault(),Z?.stopImmediatePropagation();let R=L.value.trim();if(J(),i.resolvingSubmit||i.startingRunSessionId||i.fallbackSubmittingSessionId)return;if(!R){L.value="",J();return}if(i.resolvingSubmit=!0,L.value="",$)$.value="";J();try{if(C.shellMode)xp(R,[]),await ib(b,f,h,R),Fp();else{let X=[...C.selectedAttachments,...await Lb(b,R)];C.selectedAttachments=[],z(),xp(R,X);let Y1=Nb(b,f,h,i,R,X);i.resolvingSubmit=!1,await Y1}}catch(X){if(!q0(X))j(f,[fb(X)],h.activeSessionId)}finally{i.resolvingSubmit=!1,Y(),J()}};if(p.listen(L,"input",()=>{if(!C.shellMode&&L.value.startsWith("! "))L.value=L.value.slice(2),u();J()}),p.listen(L,"keydown",(Z)=>{let R=Z;if(R.key===" "&&!C.shellMode&&L.value==="!"&&L.selectionStart===1&&L.selectionEnd===1){R.preventDefault(),L.value="",u(),J();return}if(R.key==="Backspace"&&C.shellMode&&L.value===""){R.preventDefault(),Fp(),J();return}if(R.key==="Escape"){bp(N,F);return}if(R.key==="Enter"&&(R.metaKey||R.ctrlKey))Up(R)}),p.listen(O,"click",(Z)=>{Up(Z)}),T&&$)p.listen(T,"click",()=>{if(!C.shellMode)$.click()}),p.listen($,"change",()=>{hb($,(Z)=>{C.selectedAttachments=Z,z()})});p.add({remove:()=>Pp(C)}),Y()}function bb(p,b,w){if(!p)return;if(w.shellMode){pp(p,[]);return}pp(p,[...w.selectedAttachments.map((f)=>f.name||"attachment"),...op(b)])}function wb(p,b,w,f,h){if(p?.classList.toggle("shell-mode",h.shellMode),b.setAttribute("placeholder",h.shellMode?"run shell command in workspace…":"ask pi to do something…"),f)f.hidden=!(h.shellMode&&h.selectedAttachments.length>0);if(w)e(w,h.shellMode?"shell":"normal")}function Pp(p){if(p.fileSearchTimer)clearTimeout(p.fileSearchTimer),p.fileSearchTimer=void 0}function bp(p,b){p?.setAttribute("hidden",""),b?.setAttribute("hidden","")}function fb(p){return{id:U(),role:"system",text:`prompt failed: ${qp(p)}`,createdAt:Date.now()}}async function hb(p,b){let w=Array.from(p.files||[]).slice(0,g1),f=[];for(let h of w){if(h.size>c1)continue;f.push({name:h.name,size:h.size,content:await h.text(),mimeType:h.type||void 0})}b(f)}async function ib(p,b,w,f){let h=O1(p,w),i=q(w,h),L={id:U(),role:"user",text:`! ${f}`,createdAt:Date.now()},O={id:U(),role:"tool",text:`$ ${f}
(running...)`,createdAt:Date.now()};i.messages.push(L,O),i.updatedAt=Date.now(),y(w),j(b,i.messages,h);try{let T=await A(p,"runShell",{command:f}),$=typeof T.exitCode==="number"?T.exitCode:1,H=typeof T.durationMs==="number"?T.durationMs:0,_=typeof T.output==="string"?T.output:"";O.text=Ob(f,_,$,H,Boolean(T.truncated))}catch(T){O.text=`$ ${f}
${qp(T)}`}i.updatedAt=Date.now(),y(w),j(b,i.messages,h)}async function Lb(p,b){let w=op(b);if(!w.length)return[];let f=await A(p,"resolveContext",{text:b,refs:w});return Array.isArray(f.attachments)?f.attachments.filter(V):[]}function Ob(p,b,w,f,h){let i=Tb(b,I1),L=h||i.truncated,O=i.text.endsWith(`
`)||!i.text?"":`
`;return`$ ${p}
${i.text}${O}[exit ${w} · ${f}ms${L?" · truncated":""}]`}function Tb(p,b){let w=new TextEncoder,f=w.encode(p);if(f.byteLength<=b)return{text:p,truncated:!1};let h=new TextDecoder().decode(f.slice(0,b));while(h&&w.encode(h).byteLength>b)h=h.slice(0,-1);return{text:h,truncated:!0}}async function $b(p,b,w,f,h,i){let L=b.querySelector(".slash-pop"),O=b.querySelector(".slash-list"),T=O0(f);if(T===null||!O){L?.setAttribute("hidden","");return}let $=h;if(!$.length){let _=await A(p,"commands",{});$=Array.isArray(_.commands)?_.commands.filter(V):[],i($)}if(w.value!==f)return;let H=$.filter((_)=>{return I(_).slice(1).toLowerCase().includes(T)});Hb(O,H,w,L),L?.toggleAttribute("hidden",H.length===0)}async function _b(p,b,w,f){let h=b.querySelector(".prompt-file-ref-pop"),i=b.querySelector(".prompt-file-ref-list"),L=T0(f);if(L===null||!i){h?.setAttribute("hidden","");return}try{let O=await A(p,"searchFiles",{query:L,limit:u1}),T=Array.isArray(O.files)?O.files.filter(V):[];if(w.value!==f)return;Cb(i,w,T,h),h?.toggleAttribute("hidden",T.length===0)}catch{h?.setAttribute("hidden","")}}function Hb(p,b,w,f){p.replaceChildren(...b.map((h)=>{let i=document.createElement("button"),L=I(h);return i.type="button",i.className="slash-item",i.dataset.slash=L,i.innerHTML='<span class="sl-name"></span><span class="sl-desc"></span>',i.querySelector(".sl-name").textContent=L,i.querySelector(".sl-desc").textContent=h.description||"",i.addEventListener("click",()=>{w.value=h.template||`${L} `,f?.setAttribute("hidden",""),w.dispatchEvent(new(w.ownerDocument.defaultView?.Event||Event)("input",{bubbles:!0})),w.focus()}),i}))}function Cb(p,b,w,f){p.replaceChildren(...w.map((h)=>{let i=h.path||h.name||"",L=document.createElement("button");return L.type="button",L.className="prompt-file-ref-item",L.dataset.path=i,L.disabled=!i,L.innerHTML='<span class="pfr-path"></span><span class="pfr-kind"></span>',L.querySelector(".pfr-path").textContent=i,L.querySelector(".pfr-kind").textContent=typeof h.size==="number"?`${h.size} bytes`:"file",L.addEventListener("click",()=>{lb(b,i),f?.setAttribute("hidden","")}),L}))}function lb(p,b){if(!b)return;let{value:w,selectionStart:f}=p,h=w.slice(0,f),i=/(?:^|\s)@([^\s@`]*)$/.exec(h),L=i?f-(i[1]||"").length-1:f,O=`@${b} `;p.value=`${w.slice(0,L)}${O}${w.slice(f)}`;let T=L+O.length;p.setSelectionRange(T,T),p.dispatchEvent(new(p.ownerDocument.defaultView?.Event||Event)("input",{bubbles:!0})),p.focus()}function Q0(p){return{input$:p.behaviorSubject("chat.input",""),submitted$:p.subject("chat.input.submitted"),activeSessionId$:p.behaviorSubject("session.activeId",null),sidebarSelectedSession$:p.behaviorSubject(Sp,Rb()),toastRequested$:p.subject("toast.requested")}}function op(p){let b=[],w=new Set,f=/(^|[\s`])@([^\s@`]+)/g,h=f.exec(String(p||""));while(h!==null){let i=h[2]||"";if((h[1]||"")!=="`"&&i&&!w.has(i))w.add(i),b.push(i);h=f.exec(String(p||""))}return b}function K0(p=[],b=[]){let w=[],f=new Set;for(let h of[...p,...b]){let i=I(h);if(!i||f.has(i))continue;f.add(i),w.push(h)}return w}function d(p){return p.app?.piWebSidebar?.getSnapshot?.().activeWorkspaceId||p.app?.dataset.activeWorkspaceId||""}function Rb(){return W({})}function W(p){let b=p.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),w=b?.activeSessionId||"",f=b?.activeWorkspaceId||"";if(w&&p.app?.dataset.clearedSessionId!==w)return{sessionId:w,workspaceId:f||void 0};return null}function B(p,b){if(b?.workspaceId&&p.app)p.app.dataset.activeWorkspaceId=b.workspaceId,vp(_p,b.workspaceId);if(b?.sessionId)delete p.app?.dataset.clearedSessionId,p.app?.setAttribute("data-active-session-id",b.sessionId),vp(dp,b.sessionId)}function tp(p){let b=W(p);if(b?.sessionId&&p.app)p.app.dataset.clearedSessionId=b.sessionId;p.app?.removeAttribute("data-active-session-id"),yb(dp),globalThis.piWeb?.behaviorSubject("session.activeId",null).next(null)}function x(p,b,w={}){let f=p.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),h={type:b,detail:w,snapshot:f};(p.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$)?.next(h),globalThis.piWeb?.subject(mp).next(h)}function Cp(p,b,w){let f=p.app?.dataset.activeWorkspaceId||d(p),h={reason:w,sessionId:b,workspaceId:f};globalThis.piWeb?.behaviorSubject("session.activeId",b).next(b),x(p,"active.start",h),x(p,"session.created",h)}function lp(p,b){globalThis.piWeb?.subject("session.changed").next({sessionId:p,name:b,title:b})}function Rp(p){if(p.title!=="New chat")return"";let w=p.messages.find((f)=>f.role==="user")?.text.slice(0,48)||"";if(!w)return"";return p.title=w,w}function vp(p,b){try{localStorage.setItem(p,b)}catch{}}function yb(p){try{localStorage.removeItem(p)}catch{}}async function A(p,b,w={},f=d(p)){if(!p.backend)return{};let h=await p.backend(b,{workspaceId:f,data:w});return V(h)?h:{}}function Lp(p){let b=Array.isArray(p.warnings)?p.warnings.filter((w)=>typeof w==="string"&&w.trim().length>0):[];for(let w of b)globalThis.piWeb?.subject("toast.requested").next({level:"warning",message:w})}function W0(p,b){return p.trim().startsWith("!")?[]:[...b]}async function Nb(p,b,w,f,h,i){let L=O1(p,w),O=G(p);if(f.activeRunId&&f.activeRunSessionId===L){await zb(p,b,w,f,h,i,O.path,O.id);return}if(f.startingRunSessionId===L||f.fallbackSubmittingSessionId===L)return;f.backendChatToken+=1,f.startingRunSessionId=L,f.runEventsAbort?.abort();let T=new AbortController;f.runEventsAbort=T,f.sessionEventsAbort?.abort();let $={id:U(),role:"user",text:h,attachments:Jp(i),createdAt:Date.now()},H=q(w,L);j1(f.pendingPromptEchoIds,L,$.id),H.messages.push($),H.updatedAt=Date.now(),y(w),j(b,H.messages,L);let _;try{_=await Jb(p,h,i,L,O.path,O.id)}catch(C){throw f.startingRunSessionId=void 0,C}if(T.signal.aborted){f.startingRunSessionId=void 0,Op(w,L,$.id);return}if(Lp(_),typeof _.activeSessionId==="string"&&_.activeSessionId){let C=L,z=w.activeSessionId===C;if(L=_.activeSessionId,z)M(w,L),B(p,{sessionId:_.activeSessionId,workspaceId:O.id||void 0}),x(p,"chat-session",{reason:"startPrompt",sessionId:_.activeSessionId}),Cp(p,_.activeSessionId,"startPrompt");else q(w,L);J1(w,C,L,$.id),l0(f.pendingPromptEchoIds,C,L)}if(typeof _.runId!=="string"||!_.runId){f.startingRunSessionId=void 0,f.fallbackSubmittingSessionId=L;let C;try{C=await Db(p,h,i,L,O.path,O.id)}catch(u){throw f.fallbackSubmittingSessionId=void 0,u}if(T.signal.aborted){f.fallbackSubmittingSessionId=void 0,Op(w,L,$.id);return}Lp(C);let z=typeof C.activeSessionId==="string"&&C.activeSessionId?C.activeSessionId:L,Y=Zp(f.pendingPromptEchoIds,L),J=Wb(p,w,C,"submitPrompt",L,Y);if(Gp(f.pendingPromptEchoIds,z,J,C.messages,Y),w.activeSessionId===L||w.activeSessionId===z)j(b,J,w.activeSessionId);if(f.runEventsAbort===T)f.runEventsAbort=void 0;f.startingRunSessionId=void 0,f.fallbackSubmittingSessionId=void 0;return}let l=q(w,L);f.activeRunId=_.runId,f.activeRunSessionId=L,f.startingRunSessionId=void 0;let N=Rp(l);if(N)y(w),lp(L,N);let F=Fb(l);C0(f.pendingAssistantEchoIds,L,F.id);try{await jb(p,w,l,_.runId,O.path,O.id,F,()=>{if(!T.signal.aborted&&w.activeSessionId===L)j(b,l.messages,L)},T.signal)}finally{if(f.activeRunId===_.runId)f.activeRunId=void 0,f.activeRunSessionId=void 0,f.startingRunSessionId=void 0,f.fallbackSubmittingSessionId=void 0;if(f.runEventsAbort===T)f.runEventsAbort=void 0}if(!T.signal.aborted&&w.activeSessionId===L)n(p,b,w,f,L,O.path,O.id)}async function zb(p,b,w,f,h,i,L,O){let{activeRunId:T,activeRunSessionId:$}=f;if(!T||!$)throw Error("active run is unavailable for steering");let H={id:U(),role:"user",text:h,attachments:Jp(i),createdAt:Date.now()},_=q(w,$);if(j1(f.pendingPromptEchoIds,$,H.id),_.messages.push(H),_.updatedAt=Date.now(),y(w),w.activeSessionId===$)j(b,_.messages,$);try{let l=await qb(p,T,h,i,$,L,O);Lp(l)}catch(l){if(Op(w,$,H.id),w1(l)){j(b,_.messages,$),globalThis.piWeb?.subject("toast.requested").next({level:"error",message:"This backend does not support steering while a response is streaming."});return}throw l}}function Op(p,b,w){let f=p.sessions.find((h)=>h.id===b);if(!f)return;f.messages=f.messages.filter((h)=>h.id!==w),D1(p,f.id),y(p)}async function jb(p,b,w,f,h,i,L,O,T){let $=await ep(p,"streamEventsSse",{runId:f,cursor:0,workspacePath:h},T,i);if(!$)throw Error("SSE streaming backend did not return a stream");let H=sp(O);L.streaming=!0,H.flush();try{await p1($,(_)=>{Ub(L,[_]),L.streaming=_.type!=="run.end",w.updatedAt=Date.now(),y(b),H.request()})}finally{L.streaming=!1,y(b),H.flush()}}function sp(p){let b=0,w,f=()=>{if(w)clearTimeout(w),w=void 0},h=()=>{f(),b=Date.now(),p()};return{request:()=>{let L=S1-(Date.now()-b);if(L<=0){h();return}w||=setTimeout(h,L)},flush:h,cancel:f}}async function ep(p,b,w={},f,h=d(p)){if(!p.backendStream)throw Error("SSE streaming backend is unavailable");let i=await p.backendStream(b,{workspaceId:h,data:w},{signal:f});return Vb(i)}function Vb(p){if(typeof ReadableStream<"u"&&p instanceof ReadableStream)return p;if(typeof Response<"u"&&p instanceof Response)return p.body;if(typeof p==="string")return kp(p);if(!V(p))return null;let b=p.body;if(typeof ReadableStream<"u"&&b instanceof ReadableStream)return b;let w=p.sse;if(typeof w==="string")return kp(w);return null}function kp(p){let b=new TextEncoder().encode(p);return new ReadableStream({start(w){w.enqueue(b),w.close()}})}async function p1(p,b){let w=p.getReader(),f=new TextDecoder,h="";while(!0){let i=await w.read();if(i.done){h+=f.decode(),Gb(h,b);return}h+=f.decode(i.value,{stream:!0});let L=Zb(h);h=L.remainder;for(let O of L.frames)b1(O,b)}}function Zb(p){let w=p.replaceAll(`\r
`,`
`).replaceAll("\r",`
`).split(`

`),f=w.pop()||"";return{frames:w,remainder:f}}function Gb(p,b){let w=p.trim();if(w)b1(w,b)}function b1(p,b){let w=p.split(`
`).filter((f)=>f.startsWith("data:")).map((f)=>f.slice(5).trimStart()).join(`
`);if(!w)return;try{let f=JSON.parse(w);if(Qb(f))b(f)}catch{}}function xp(p,b){globalThis.piWeb?.subject("chat.input.submitted").next({text:p,attachments:Jp(b)||[]})}async function Jb(p,b,w,f,h=G(p).path,i=G(p).id){try{return await A(p,"startPrompt",yp(b,w,f,h),i)}catch(L){if(w1(L))return{};throw L}}function w1(p){return/unknown method: (startPrompt|streamEventsSse|steerPrompt)|unsupported method: (startPrompt|streamEventsSse|steerPrompt)|(startPrompt|streamEventsSse|steerPrompt) unsupported/i.test(qp(p))}async function Db(p,b,w,f="",h=G(p).path,i=G(p).id){return await A(p,"submitPrompt",yp(b,w,f,h),i)}async function qb(p,b,w,f,h="",i=G(p).path,L=G(p).id){let O={...yp(w,f,h,i),runId:b};return A(p,"steerPrompt",O,L)}function yp(p,b,w,f){let h={text:p,attachments:b,sessionId:w};if(f)h.workspacePath=f;return h}function Fb(p){let b=[...p.messages].reverse().find((f)=>f.role==="assistant"&&f.streaming);if(b)return b;let w={id:U(),role:"assistant",text:"",createdAt:Date.now(),streaming:!0};return p.messages.push(w),w}function Ub(p,b){for(let w of b)if(w.type==="text.delta"&&typeof w.delta==="string")wp(p,"text",w.delta),p.text+=w.delta;else if(w.type==="thinking.delta"&&typeof w.delta==="string")wp(p,"thinking",w.delta),p.thinking=`${p.thinking||""}${w.delta}`;else if(w.type==="tool.start"){if(Ab(w))continue;fp(p,w,"running")}else if(w.type==="tool.delta"&&typeof w.delta==="string"){let f=fp(p,w,"running");f.text=w.delta}else if(w.type==="tool.end"){let f=fp(p,w,w.isError?"err":"ok");if(typeof w.result==="string"&&w.result)f.text=w.result}else if(w.type==="error"&&typeof w.message==="string")wp(p,"text",`${p.text?`
`:""}${w.message}`),p.text+=`${p.text?`
`:""}${w.message}`}function wp(p,b,w){p.blocks||=[];let f=p.blocks[p.blocks.length-1];if(f?.type===b){f.text+=w;return}if(p.blocks.length<Hp)p.blocks.push({id:U(),type:b,text:w})}function Ab(p){return!p.toolCallId&&(!p.toolName||p.toolName==="tool")&&p.argsStatus==="unavailable"}function fp(p,b,w){let f=b.toolCallId||b.toolName||"tool";p.toolCalls||=[];let h=p.toolCalls.find((i)=>i.id===f);if(!h)h={id:f,name:b.toolName||"tool",args:b.args,text:"",status:w},p.toolCalls.push(h),Yb(p,h);if(h.status=w,Xb(h,b))h.args=b.args,h.argsStatus=b.argsStatus;return h}function Yb(p,b){if(p.blocks||=[],p.blocks.some((w)=>w.type==="tool"&&w.toolCall?.id===b.id))return;if(p.blocks.length<Hp)p.blocks.push({id:U(),type:"tool",text:"",toolCall:b})}function Xb(p,b){if(!b.argsStatus)return Boolean(b.args);if(b.argsStatus==="unavailable")return!p.argsStatus;return!0}function Qb(p){return V(p)&&typeof p.type==="string"}async function n(p,b,w,f,h="",i=Np(p),L=G(p).id){if(!p.backendStream){await rp(p,b,w,f,h,i);return}let O=++f.backendChatToken;f.sessionEventsAbort?.abort();let T=new AbortController;f.sessionEventsAbort=T;let $=sp(()=>{j(b,r(w).messages,w.activeSessionId)});try{let H=await ep(p,"sessionEventsSse",f1(p,h,i),T.signal,L);if(!H)throw Error("session SSE backend did not return a stream");await p1(H,(_)=>{if(O!==f.backendChatToken||_.type!=="chat.state")return;let l=Kb(_),N=typeof l.activeSessionId==="string"?l.activeSessionId:h,F=Zp(f.pendingPromptEchoIds,N),C=V1(f.pendingAssistantEchoIds,N),z=i1(p,w,l,"chatState",F,C);if(Gp(f.pendingPromptEchoIds,N,z,l.messages,F),Z1(f.pendingAssistantEchoIds,N,z,C),z.length)$.request()})}catch(H){if(!T.signal.aborted)await rp(p,b,w,f,h,i)}finally{if($.cancel(),f.sessionEventsAbort===T)f.sessionEventsAbort=void 0}}async function rp(p,b,w,f,h="",i=Np(p)){let L=++f.backendChatToken;try{let O=await A(p,"chatState",f1(p,h,i));if(L!==f.backendChatToken)return;let T=typeof O.activeSessionId==="string"?O.activeSessionId:h,$=Zp(f.pendingPromptEchoIds,T),H=V1(f.pendingAssistantEchoIds,T),_=i1(p,w,O,"chatState",$,H);if(Gp(f.pendingPromptEchoIds,T,_,O.messages,$),Z1(f.pendingAssistantEchoIds,T,_,H),_.length)j(b,_,w.activeSessionId)}catch{}}function f1(p,b,w=Np(p)){let f=b?{sessionId:b}:{};if(w)f.workspacePath=w;return f}function Kb(p){return{activeSessionId:p.activeSessionId,messages:p.messages,isStreaming:p.isStreaming}}function Np(p){return G(p).path}function G(p){let b=p.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),w=b?.activeWorkspaceId||p.app?.dataset.activeWorkspaceId||"",f=b?.workspaces?.find((h)=>h.id===w)?.path||"";return{id:w,path:f}}function h1(p,b){let w=p.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),f=b.workspaceId||w?.activeWorkspaceId||p.app?.dataset.activeWorkspaceId||"",h=w?.workspaces?.find((i)=>i.id===f)?.path||"";if(h||f!==w?.activeWorkspaceId)return{id:f,path:h};return G(p)}function i1(p,b,w,f,h="",i=""){let L=Dp(w.messages);if(typeof w.activeSessionId==="string"&&w.activeSessionId){let H=b.activeSessionId;if(M(b,w.activeSessionId),B(p,{sessionId:w.activeSessionId,workspaceId:p.app?.dataset.activeWorkspaceId||d(p)||void 0}),f!=="chatState"||H!==w.activeSessionId)x(p,"chat-session",{reason:f,sessionId:w.activeSessionId});if(f!=="chatState")Cp(p,w.activeSessionId,f)}let O=r(b);if(!L.length)return[];let T=z1(O.messages,L,h,i).slice(-k);if(!L1(O.messages,T))return[];O.messages=T;let $=Rp(O);if(O.updatedAt=Date.now(),y(b),$)lp(O.id,$);return O.messages}function L1(p,b){if(p.length!==b.length)return!0;return p.some((w,f)=>Tp(w)!==Tp(b[f]))}function Tp(p){return JSON.stringify({id:p.id,role:p.role,text:p.text,blocks:p.blocks,thinking:p.thinking,streaming:p.streaming,toolCalls:p.toolCalls,attachments:p.attachments})}function Wb(p,b,w,f,h,i=""){let L=Dp(w.messages),O=typeof w.activeSessionId==="string"&&w.activeSessionId?w.activeSessionId:h,T=b.activeSessionId===h;if(O!==h)if(T)M(b,O),B(p,{sessionId:O,workspaceId:G(p).id||void 0}),x(p,"chat-session",{reason:f,sessionId:O}),Cp(p,O,f);else q(b,O);let $=Array.isArray(i)?i:[i].filter(Boolean);if(O!==h)for(let N of $)J1(b,h,O,N);let H=q(b,O);if(!L.length)return[];let _=z1(H.messages,L,i).slice(-k);if(!L1(H.messages,_))return[];H.messages=_;let l=Rp(H);if(H.updatedAt=Date.now(),y(b),l)lp(H.id,l);return H.messages}function Bb(p,b,w,f,h){let i=($,H)=>{if(!$?.sessionId){if(!H)up(b,w,f,h,!0);return}if(T1(b,f,$))return;B(b,$),M(f,$.sessionId),j(w,r(f).messages,f.activeSessionId);let _=h1(b,$);n(b,w,f,h,$.sessionId,_.path,_.id)},L=($)=>{if(Eb(b,w,f,h,$))return;let H=Pb(b,$);if(H)i(H,!1)},O=b.app?.piWebSidebar?.channels?.selectedSession$||globalThis.piWebSidebar?.channels?.selectedSession$,T=b.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$;if(O){let $=!0;p.add(O.subscribe((H)=>{i(H,$),$=!1}))}if(T)p.add(T.subscribe(L));if(b.app)p.listen(b.app,"pi-web-sidebar:session-created",($)=>{let H=$.detail||{},_=typeof H.sessionId==="string"?H.sessionId:"",l=typeof H.workspaceId==="string"?H.workspaceId:"";if(_)i({sessionId:_,workspaceId:l||void 0},!1)});if(globalThis.piWeb){let $=!0;p.add(globalThis.piWeb.behaviorSubject(Sp,W(b)).subscribe((_)=>{i(_,$),$=!1})),p.add(globalThis.piWeb.subject(mp).subscribe(L));let H=!0;p.add(globalThis.piWeb.behaviorSubject("session.activeId",null).subscribe((_)=>{if(!_){if(!H)up(b,w,f,h,!1);H=!1;return}H=!1,i({sessionId:_,workspaceId:b.app?.dataset.activeWorkspaceId||q1(_p)||void 0},!1)}))}}function up(p,b,w,f,h){if(f.backendChatToken+=1,f.runEventsAbort?.abort(),f.sessionEventsAbort?.abort(),w.activeSessionId="",y(w),h)tp(p);else{let i=W(p);if(i?.sessionId&&p.app)p.app.dataset.clearedSessionId=i.sessionId}a(b)}function O1(p,b){let w=W(p);if(w?.sessionId&&!T1(p,b,w))B(p,w),M(b,w.sessionId);if(!b.activeSessionId)return q(b,"",!0).id;return b.activeSessionId}function T1(p,b,w){let f=w.workspaceId||"",h=p.app?.dataset.activeWorkspaceId||q1(_p)||"";return b.activeSessionId===w.sessionId&&(!f||f===h)}function Eb(p,b,w,f,h){if(h.type!=="session.deleted")return!1;let i=$1(h);if(!i)return!0;let L=w.activeSessionId===i,O=w.sessions.length;if(w.sessions=w.sessions.filter((T)=>T.id!==i),L){f.runEventsAbort?.abort(),f.sessionEventsAbort?.abort();let T=Mb(p,h,i);if(T?.sessionId){B(p,T),M(w,T.sessionId),kb(b,r(w).messages,w.activeSessionId);let $=h1(p,T);return n(p,b,w,f,T.sessionId,$.path,$.id),!0}return w.activeSessionId="",tp(p),y(w),a(b),!0}if(w.sessions.length!==O)y(w);return!0}function Mb(p,b,w){let f=b.snapshot?.activeSessionId||"",h=b.snapshot?.activeWorkspaceId||"";if(f&&f!==w)return{sessionId:f,workspaceId:h||void 0};let i=W(p);if(i?.sessionId&&i.sessionId!==w)return i;return null}function Pb(p,b){if(!vb(b.type))return null;let w=b.detail||{},f=$1(b)||b.snapshot?.activeSessionId||"",h=typeof w.workspaceId==="string"?w.workspaceId:b.snapshot?.activeWorkspaceId||p.app?.dataset.activeWorkspaceId||"";if(!f)return null;return{sessionId:f,workspaceId:h||void 0}}function $1(p){let b=p.detail||{};if(typeof b.sessionId==="string")return b.sessionId;if(typeof b.id==="string")return b.id;return""}function vb(p){return p==="session.selected"||p==="session.created"||p==="new-session"||p==="active.start"}function M(p,b){let w=p.sessions.find((f)=>f.id===b);if(!w)w=o(b),p.sessions.unshift(w);return p.activeSessionId=w.id,y(p),w}function j(p,b,w){if(l1(b,w),!b.length){a(p);return}let f=p.querySelector(".term-inner")||p;_1(f,b,w),zp(p)}function kb(p,b,w){l1(b,w);let f=p.querySelector(".term-inner")||p;_1(f,b,w),zp(p)}function _1(p,b,w){let f=xb(p),h=b.map((O)=>{let T=`${w}:${Tp(O)}`,$=f.get(O.id);if($&&Mp.get($)===T)return $;let H=ub(O,w);return Mp.set(H,T),H}),i=new Set(h),L=p.firstChild;for(let O of h){if(L!==O)p.insertBefore(O,L);L=O.nextSibling}for(let O of Array.from(p.children)){if($p(p,O)&&!i.has(O)){O.remove();continue}if(!$p(p,O))O.remove()}}function xb(p){let b=new Map;for(let w of Array.from(p.children)){if(!$p(p,w))continue;let f=w.dataset.messageId||"";if(f)b.set(f,w)}return b}function $p(p,b){let w=p.ownerDocument.defaultView;return Boolean(w&&b instanceof w.HTMLElement&&b.classList.contains("transcript-item"))}function a(p){let b=p.querySelector(".term-inner")||p,w=document.createElement("article");w.className="pi-web-chat-docs",w.setAttribute("aria-label","pi-web-chat guide");let f=document.createElement("h1");f.textContent="pi-web-chat guide";let h=document.createElement("p");h.textContent=["Select or create a session in the sidebar to load chat history,","or type below to start a new session."].join(" ");let i=document.createElement("ul");for(let L of["Ask pi in the prompt box and press Cmd/Ctrl+Enter to send.","Type ! then Space at the start to turn the prompt yellow and run shell commands in the workspace.","Queued file attachments hide during shell mode and reappear for the next normal prompt.","Type @ to list project files, then pick one to tag it as prompt context.","Type / at the start to open the slash command list.","Chats are cached locally after you start or select a session."]){let O=document.createElement("li");O.textContent=L,i.append(O)}w.append(f,h,i),b.replaceChildren(w),zp(p)}function rb(p,b){let w=b.querySelector(".term"),f=b.querySelector("[data-action='scroll-bottom']");if(!w||!f)return;let h={term:w,button:f,pinned:!0,touchStartY:null};ip.set(b,h),f.hidden=!1,m(h),p.listen(f,"click",()=>{h.pinned=!0,H1(h),m(h)}),p.listen(w,"wheel",(i)=>{if(i.deltaY<0)gp(h)}),p.listen(w,"touchstart",(i)=>{let L=i;h.touchStartY=L.touches.item(0)?.clientY??null}),p.listen(w,"touchmove",(i)=>{let O=i.touches.item(0)?.clientY;if(typeof O==="number"&&h.touchStartY!==null&&O-h.touchStartY>8)gp(h)}),p.listen(w,"touchend",()=>{h.touchStartY=null}),p.add({remove:()=>{ip.delete(b)}})}function zp(p){let b=ip.get(p);if(!b)return;if(b.pinned)H1(b);m(b)}function H1(p){p.term.scrollTop=p.term.scrollHeight}function gp(p){p.pinned=!1,m(p)}function m(p){p.button.dataset.pinned=p.pinned?"true":"false",p.button.setAttribute("aria-pressed",p.pinned?"true":"false")}function ub(p,b){let w=document.createElement("article");if(w.className="transcript-item",w.dataset.messageId=p.id,gb(p)){let f=cb(p);if(f)jp(w,p.role,p.text);mb(w,p,b,f)}else db(w,p,b);if(p.streaming)w.dataset.streaming="true";return w}function gb(p){return Boolean(p.blocks?.some((b)=>{return b.type==="tool"||b.text.trim().length>0}))}function cb(p){return Boolean(p.text.trim())&&(!Ib(p)||Sb(p))}function Ib(p){return Boolean(p.blocks?.some((b)=>{return b.type==="text"&&b.text.trim().length>0}))}function Sb(p){return(p.blocks?.length||0)>=Hp}function mb(p,b,w,f=!1){for(let h of b.blocks||[])if(h.type==="text"){if(!f)jp(p,b.role,h.text)}else if(h.type==="thinking")p.append(C1(h.text,Boolean(b.streaming)));else if(h.type==="tool"&&h.toolCall){let i=b.toolCalls?.find((L)=>L.id===h.toolCall?.id)||h.toolCall;p.append(R1(i,Vp(w,b,i)))}}function db(p,b,w){if(nb(b))jp(p,b.role,b.text);if(b.thinking)p.append(C1(b.thinking,Boolean(b.streaming)));for(let f of b.toolCalls||[])p.append(R1(f,Vp(w,b,f)))}function jp(p,b,w){if(b==="assistant"&&!w.trim())return;let f=document.createElement("div");f.className="msg",f.dataset.kind=hp(b);let h=document.createElement("span");h.className=`prefix ${hp(b)}`,h.textContent=L0(b);let i=document.createElement("pre");i.className=`body ${hp(b)}`,i.textContent=w,f.append(h,i),p.append(f)}function nb(p){let b=p.text.trim().length>0;return p.role!=="assistant"||b}function C1(p,b){let w=document.createElement("details");w.className="msg-detail think thinking-block",w.open=b;let f=document.createElement("summary");f.className="label",f.textContent="THINKING";let h=document.createElement("pre");return h.className="body",h.textContent=p,w.append(f,h),w}function l1(p,b){let w=new Set;for(let f of p)for(let h of f.toolCalls||[])w.add(Vp(b,f,h));for(let f of E)if(!w.has(f))E.delete(f)}function Vp(p,b,w){return`${p}:${b.id}:${w.id}`}function R1(p,b){let w=document.createElement("div");w.className="tool-card",w.dataset.tool=p.name||"tool",w.dataset.status=p.status;let f=!E.has(b);w.dataset.collapsed=f?"true":"false";let h=document.createElement("button");if(h.type="button",h.className="tc-head",h.title=f?"Show tool output":"Hide tool output",h.setAttribute("aria-expanded",f?"false":"true"),h.setAttribute("aria-label",y1(p,f)),h.append(eb(p),p0(p),b0(p),w0(p,f)),!f)w.append(N1(p));return h.addEventListener("click",()=>sb(w,h,p,b)),w.prepend(h),w}function y1(p,b){let w=b?"Show":"Hide",f=p.status==="running"?"running":p.status==="err"?"failed":"done",h=ab(p),i=h?`, ${h}`:"";return`${w} ${p.name||"tool"} output, ${f}${i}`}function ab(p){if(p.argsStatus==="present")return"arguments present";if(p.argsStatus)return c(p);return p.args?"arguments present":""}function N1(p){let b=document.createElement("pre");return b.className="tc-body",b.textContent=p.text||s(p),b}function ob(p,b){let w=0,f,h=b.ownerDocument.defaultView,i=typeof h?.matchMedia==="function"?h.matchMedia("(prefers-reduced-motion: reduce)"):void 0,L=()=>{if(f)clearInterval(f),f=void 0},O=()=>{w=(w+1)%np;for(let H of b.querySelectorAll(".spinner"))H.dataset.frame=String(w)},T=()=>{let H=b.querySelectorAll(".spinner");if(i?.matches||H.length===0){L(),w=0;for(let _ of H)_.dataset.frame="0";return}if(!f)f=setInterval(O,m1)},$=new(h?.MutationObserver||MutationObserver)(T);$.observe(b,{childList:!0,subtree:!0}),i?.addEventListener("change",T),T(),p.add({remove:()=>{$.disconnect(),i?.removeEventListener("change",T),L()}})}function tb(){let p=document.createElement("span");p.className="spinner",p.dataset.frame="0",p.setAttribute("aria-hidden","true");for(let b=0;b<np;b+=1)p.append(document.createElement("span"));return p}function sb(p,b,w,f){let h=p.querySelector(".tc-body"),i=h!==null;if(h)h.remove(),E.delete(f);else p.append(N1(w)),E.add(f);p.dataset.collapsed=i?"true":"false",b.setAttribute("aria-expanded",i?"false":"true"),b.setAttribute("aria-label",y1(w,i)),b.title=i?"Show tool output":"Hide tool output";let L=b.querySelector(".tc-toggle-label");if(L)L.textContent=i?"show":"hide"}function eb(p){let b=document.createElement("span");b.className="tc-glyph";let w=f0(p),f=w?d1[w]:"";if(!w||!f)return b.textContent="●",b;return b.innerHTML=`<svg class="tc-icon" data-tool-icon="${w}" aria-hidden="true" viewBox="0 0 24 24">${f}</svg>`,b}function p0(p){let b=document.createElement("span");return b.className="tc-name",b.textContent=p.name||"tool",b}function b0(p){let b=document.createElement("span");return b.className="tc-args",b.textContent=c(p),b}function w0(p,b){let w=document.createElement("span");if(w.className="tc-meta",p.status==="running"){let i=tb(),L=document.createElement("span");return L.className="running",L.textContent="running",w.append(i,L,cp(b)),w}let f=document.createElement("span");f.className=p.status==="err"?"err":"ok",f.textContent=p.status==="err"?"✗":"✓";let h=document.createElement("span");return h.textContent=p.status==="err"?" · failed":" · done",w.append(f,h,cp(b)),w}function cp(p){let b=document.createElement("span");b.className="tc-toggle";let w=document.createElement("span");w.className="tc-toggle-label",w.textContent=p?"show":"hide";let f=document.createElement("span");return f.className="tc-caret",f.textContent="▸",b.append(w,f),b}function f0(p){let b=h0(p.name);if(["bash","shell","sh","zsh","terminal"].includes(b))return i0(c(p).toLowerCase())||"terminal";return n1[b]}function h0(p){return p.trim().replace(/^functions\./,"").replace(/^multi_tool_use\./,"")}function i0(p){if(/\bgit\b|\bgh\b/.test(p))return"git-branch";if(/\b(go test|bun test|npm test|pnpm test|yarn test|vitest|pytest|cargo test)\b/.test(p))return"circle-check";if(/\b(bun|npm|pnpm|yarn)\s+(run\s+)?build\b|\b(go build|cargo build)\b/.test(p))return"hammer";if(/\b(bun|npm|pnpm|yarn)\s+(add|install|i)\b|\bpip\s+install\b|\bgo\s+get\b/.test(p))return"package";return}function L0(p){if(p==="assistant")return"pi >";if(p==="user")return"you >";if(p==="system")return"sys >";return"tool >"}function hp(p){if(p==="assistant")return"pi";if(p==="system")return"sys";return p}function O0(p){let b=/^\/([^\s/]*)$/.exec(p);return b?b[1].toLowerCase():null}function T0(p){let b=/(?:^|\s)@([^\s@`]*)$/.exec(p);return b?b[1]:null}function B0(p){return p.length>0}function E0(p,b){return p.trim().startsWith("!")&&b}function z1(p,b,w="",f=""){let h=Array.isArray(w)?w:[w].filter(Boolean),i=Array.isArray(f)?f:[f].filter(Boolean),L=new Map,O=new Map,T=0;for(let _ of p)L.set(_.id,_),O.set(_.id,T++);let $=new Set,H=new Set;for(let _ of b){let l=$0(p,_,h,$)||_0(p,_,i,H);if(l){if(_.role==="assistant")H.add(l.id);else $.add(l.id);L.delete(l.id),L.set(_.id,_),O.set(_.id,O.get(l.id)??T++);continue}if(!O.has(_.id))O.set(_.id,T++);L.set(_.id,{...L.get(_.id),..._})}return[...L.values()].sort((_,l)=>{let N=_.createdAt-l.createdAt;if(N!==0)return N;return(O.get(_.id)??0)-(O.get(l.id)??0)})}function $0(p,b,w,f){if(!w.length||b.role!=="user"||!b.text.trim())return;if(p.some((i)=>i.id===b.id))return;let h=p.find((i)=>{return w.includes(i.id)&&!f.has(i.id)&&i.text.trim()===b.text.trim()});if(h?.role!==b.role||h.text.trim()!==b.text.trim())return;return h}function _0(p,b,w,f){if(!w.length||b.role!=="assistant")return;if(p.some((i)=>i.id===b.id))return;let h=p.find((i)=>{return w.includes(i.id)&&!f.has(i.id)&&H0(i,b)});if(!h||h.role!==b.role)return;return h}function H0(p,b){let w=p.text.trim(),f=b.text.trim();if(!w&&!f)return!1;return w===f}function j1(p,b,w){p.set(b,[...p.get(b)||[],w])}function Zp(p,b){return p.get(b)||[]}function C0(p,b,w){p.set(b,[...p.get(b)||[],w])}function V1(p,b){return p.get(b)||[]}function l0(p,b,w){let f=p.get(b)||[];if(!f.length)return;p.delete(b),p.set(w,[...p.get(w)||[],...f])}function Gp(p,b,w,f,h){G1(p,b,w,h)}function Z1(p,b,w,f){G1(p,b,w,f)}function G1(p,b,w,f){if(!f.length||!w.length)return;let h=f.filter((i)=>{return w.some((L)=>L.id===i)});if(h.length){p.set(b,h);return}p.delete(b)}function r(p){return q(p,p.activeSessionId,!0)}function q(p,b,w=!1){let f=p.sessions.find((h)=>h.id===b);if(!f)f=o(b||void 0),p.sessions.unshift(f),y(p);if(w||!p.activeSessionId)p.activeSessionId=f.id,y(p);return f}function J1(p,b,w,f){if(b===w)return;let h=p.sessions.find((T)=>T.id===b),i=h?.messages.findIndex((T)=>T.id===f)??-1;if(!h||i<0)return;let[L]=h.messages.splice(i,1),O=q(p,w);if(!O.messages.some((T)=>T.id===L.id))O.messages.push(L);h.updatedAt=Date.now(),O.updatedAt=Date.now(),D1(p,h.id),y(p)}function D1(p,b){let w=p.sessions.find((f)=>f.id===b);if(!w||w.id===p.activeSessionId||w.messages.length>0||w.title!=="New chat")return;p.sessions=p.sessions.filter((f)=>f.id!==w.id)}function o(p=U()){let b=Date.now();return{id:p,title:"New chat",createdAt:b,updatedAt:b,messages:[]}}function q1(p){try{return localStorage.getItem(p)||""}catch{return""}}function R0(p){let b=o(p);return{activeSessionId:b.id,sessions:[b]}}function y0(){try{let p=JSON.parse(localStorage.getItem(S)||"null");if(p&&Array.isArray(p.sessions))return{activeSessionId:"",sessions:p.sessions.filter(F1).map(U1)}}catch{}return{activeSessionId:"",sessions:[]}}function N0(p=""){try{let b=JSON.parse(localStorage.getItem(S)||"null");if(b&&typeof b.activeSessionId==="string"&&Array.isArray(b.sessions)){let w=b.sessions.filter(F1).map(U1);if(p&&!w.some((f)=>f.id===p))w.unshift(o(p));return{activeSessionId:p||b.activeSessionId,sessions:w}}}catch{}return R0(p||void 0)}function y(p){Ip(p);try{localStorage.setItem(S,JSON.stringify(p))}catch{for(let b of p.sessions)b.messages=b.messages.slice(-Math.floor(k/2));Ip(p);try{localStorage.setItem(S,JSON.stringify(p))}catch{}}}function Jp(p){if(!p?.length)return;return p.map(({content:b,...w})=>w)}function Ip(p){p.sessions.sort((f,h)=>h.updatedAt-f.updatedAt);let b=p.sessions.find((f)=>f.id===p.activeSessionId),w=p.sessions.filter((f)=>f.id!==p.activeSessionId).slice(0,Math.max(0,Ep-1));p.sessions=b?[b,...w]:p.sessions.slice(0,Ep);for(let f of p.sessions)if(f.messages.length>k)f.messages.splice(0,f.messages.length-k)}function F1(p){return V(p)&&typeof p.id==="string"&&Array.isArray(p.messages)}function U1(p){return{...p,messages:Dp(p.messages)}}function Dp(p){return Array.isArray(p)?p.filter(J0).map(z0):[]}function z0(p){let b={...p};if(Array.isArray(p.toolCalls))b.toolCalls=p.toolCalls.filter(A1);else delete b.toolCalls;if(Array.isArray(p.blocks))b.blocks=p.blocks.filter(V0).map(j0);else delete b.blocks;return b}function j0(p){if(p.type!=="tool"){let{toolCall:b,...w}=p;return w}return p}function V0(p){if(!V(p)||typeof p.id!=="string"||typeof p.text!=="string")return!1;if(p.type==="text"||p.type==="thinking")return!0;return p.type==="tool"&&A1(p.toolCall)}function A1(p){if(!V(p)||typeof p.id!=="string"||typeof p.name!=="string")return!1;return typeof p.text==="string"&&G0(p.status)&&Z0(p.argsStatus)}function Z0(p){return p===void 0||p==="present"||p==="empty"||p==="unavailable"||p==="truncated"||p==="omitted"}function G0(p){return p==="running"||p==="ok"||p==="err"}function J0(p){if(!V(p)||typeof p.id!=="string"||typeof p.text!=="string")return!1;return typeof p.createdAt==="number"&&D0(p.role)}function D0(p){return p==="user"||p==="assistant"||p==="tool"||p==="system"}function V(p){return typeof p==="object"&&p!==null}function U(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`}function q0(p){return p instanceof Error&&(p.name==="AbortError"||/aborted|abort/i.test(p.message))}function qp(p){return p instanceof Error?p.message:String(p)}export{c as toolArgsInlineText,s as toolArgsBodyText,W0 as submittedAttachmentsForText,E0 as shellAttachmentNoteVisible,P1 as setComposerMode,g as renderPromptMeta,E1 as renderMessages,k1 as promptFromAgUiLikeRunInput,Kp as pluginStyleText,t as pluginClass,K0 as mergeCommands,B0 as hasQueuedAttachmentNames,d as getActiveWorkspaceId,Ob as formatShellOutput,op as extractRefs,a1 as default,Xp as createComposerSurface,Yp as createChatSurface,B1 as createChatDom,Q0 as createChannels,v1 as createAgUiLikeRunInput,I as commandName,x1 as chatEventsToAgUiLikeEvents,A as backendCall};
