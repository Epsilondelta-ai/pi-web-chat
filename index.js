var Q={attachFile:["M16.5 6v11.5a4 4 0 0 1-8 0V5a2.5 2.5 0 0 1 5 0v10.5a1 1 0 0 1-2 0V6H10v9.5","a2.5 2.5 0 0 0 5 0V5a4 4 0 0 0-8 0v12.5a5.5 5.5 0 0 0 11 0V6h-1.5Z"].join(""),stop:"M6 6h12v12H6V6Z",send:"M2 21 23 12 2 3v7l15 2-15 2v7Z",terminal:"M3 4h18v16H3V4Zm2 2v12h14V6H5Zm2 3 1.1-1.1L12.2 12l-4.1 4.1L7 15l3-3-3-3Zm6 6h5v1.5h-5V15Z",file:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 2.5L17.5 8H14V4.5ZM8 13h8v1.5H8V13Zm0 3h8v1.5H8V16Z"},v={attachFile:K("attach_file",Q.attachFile),stop:K("stop",Q.stop),send:K("send",Q.send),terminal:K("terminal",Q.terminal)};function K(p,b){return`<svg class="material-icon" data-material-icon="${p}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="${b}"></path></svg>`}function P(p){return p.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function t(){return"pi-web-chat-mounted"}function Yp(){let p=document.createElement("main");return p.className="main pi-web-chat-surface",p.dataset.main="session",p.dataset.pluginChatRoot="",p.innerHTML='<div class="term"><div class="term-inner" role="log" aria-live="polite" aria-relevant="additions text"></div></div><button type="button" class="scroll-bottom-btn" data-action="scroll-bottom" aria-label="stick to bottom" title="stick to bottom" aria-pressed="true" hidden>↓</button>',p}function Xp(){let p=document.createElement("section");return p.className="prompt-region pi-web-chat-composer",p.innerHTML=`
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
    <div class="prompt-meta" data-prompt-meta></div>`,c(p,{}),p}function c(p,b={},w=!1){let h=p.querySelector("[data-prompt-meta]");if(!h)return;let f=[Xb(b.model||"—",b.thinkingLevel)],i=Up("5h",b.fiveHourQuota),L=Up("Week",b.weeklyQuota),l=b.currentBranch||b.branch||"—";if(b.warning)f.push(Yb(b.warning));if(i)f.push(i);if(L)f.push(L);if(f.push(Ub(l)),h.innerHTML=f.join(" | "),w)h.append(document.createTextNode(" | "),qb())}function qb(){let p=document.createElement("span");return p.className="prompt-meta-item pi-web-chat-badge",p.textContent="chat plugin",p}function Ub(p){return`<span class="prompt-meta-item prompt-meta-branch">${Qp("git-branch")}<span>${P(p)}</span></span>`}function Yb(p){return`<span class="prompt-meta-item prompt-meta-warning" title="${P(p)}">runtime warning</span>`}function Xb(p,b){let w=P(p);return b?`${w} (${P(b)})`:w}function Up(p,b){if(typeof b!=="number"||!Number.isFinite(b))return;let w=Math.max(0,Math.min(100,Math.round(b))),h=w>=70?"full":w>=30?"medium":"low";return`<span class="prompt-meta-item prompt-meta-battery prompt-meta-battery-${h}">${P(p)} ${Qp(`battery-${h}`)}(${w}%)</span>`}function Qp(p){return{"battery-full":'<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 10v4"></path><path d="M14 10v4"></path><path d="M22 14v-4"></path><path d="M6 10v4"></path><rect x="2" y="6" width="16" height="12" rx="2"></rect></svg>',"battery-medium":'<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 14v-4"></path><path d="M22 14v-4"></path><path d="M6 14v-4"></path><rect x="2" y="6" width="16" height="12" rx="2"></rect></svg>',"battery-low":'<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 14v-4"></path><path d="M6 14v-4"></path><rect x="2" y="6" width="16" height="12" rx="2"></rect></svg>',"git-branch":'<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6a9 9 0 0 0-9 9V3"></path><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle></svg>'}[p]||""}function Qb(){let p=document.createElement("section");return p.className="pi-web-chat-root",p.dataset.plugin="pi-web-chat",p.innerHTML=`
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
    </section>`,{root:p,transcript:G(p.querySelector("[data-chat-transcript]")),textarea:G(p.querySelector("[data-chat-input]")),sendButton:G(p.querySelector("[data-send]")),attachButton:G(p.querySelector("[data-attach]")),fileInput:G(p.querySelector("[data-file-input]")),slashPopover:G(p.querySelector("[data-slash-popover]")),slashList:G(p.querySelector("[data-slash-list]")),refsPopover:G(p.querySelector("[data-refs-popover]")),refsList:G(p.querySelector("[data-refs-list]")),attachments:G(p.querySelector("[data-attachments]"))}}function Kb(p,b){p.replaceChildren(...b.map(Eb)),p.scrollTop=p.scrollHeight}function Eb(p){let b=document.createElement("article");b.className=`pi-web-chat-message pi-web-chat-message-${p.role}`,b.dataset.messageId=p.id;let w=document.createElement("div");w.className="pi-web-chat-message-role",w.textContent=p.role;let h=document.createElement("pre");if(h.className="pi-web-chat-message-body",h.textContent=p.text,b.append(w,h),p.thinking){let f=document.createElement("details");f.className="pi-web-chat-thinking",f.open=Boolean(p.streaming);let i=document.createElement("summary");i.textContent="thinking";let L=document.createElement("pre");L.textContent=p.thinking,f.append(i,L),b.append(f)}if(p.toolCalls?.length){let f=document.createElement("div");f.className="pi-web-chat-tools";for(let i of p.toolCalls){let L=document.createElement("details");L.className=`pi-web-chat-tool pi-web-chat-tool-${i.status}`,L.open=i.status==="running";let l=document.createElement("summary");l.textContent=`${i.name} · ${i.status}`;let O=document.createElement("pre");O.textContent=i.text||s(i),L.append(l,O),f.append(L)}b.append(f)}if(p.streaming){let f=document.createElement("div");f.className="pi-web-chat-message-meta",f.textContent="streaming...",b.append(f)}if(p.attachments?.length){let f=document.createElement("div");f.className="pi-web-chat-message-meta",f.textContent=`${p.attachments.length} attachment(s)`,b.append(f)}return b}function u(p){if(p.argsStatus==="truncated")return"arguments truncated";if(p.argsStatus==="omitted")return"arguments omitted";if(p.argsStatus==="unavailable")return"arguments unavailable";if(p.argsStatus==="empty")return"no arguments";if(!p.args)return"";return JSON.stringify(p.args)}function s(p){if(p.argsStatus==="truncated")return"arguments truncated: too large to display";if(p.argsStatus==="omitted")return"arguments omitted: response too large";if(p.argsStatus==="unavailable")return"arguments unavailable";if(p.argsStatus==="empty")return"no arguments";if(!p.args)return"arguments unavailable";return JSON.stringify(p.args,null,2)}function Mb(p,b){p.root.dataset.composerMode=b,e(p.attachButton,b)}function e(p,b){if(p.disabled=b==="shell",p.setAttribute("aria-disabled",b==="shell"?"true":"false"),b==="shell"){p.innerHTML=v.terminal,p.title="shell command mode",p.setAttribute("aria-label","shell command mode");return}if(b==="file-ref"){p.innerHTML=K("file",Q.file),p.title="file reference mode",p.setAttribute("aria-label","file reference mode");return}p.innerHTML=v.attachFile,p.title="attach files",p.setAttribute("aria-label","attach files")}function pp(p,b){p.hidden=b.length===0,p.replaceChildren(...b.map((w)=>{let h=document.createElement("span");return h.className="pi-web-chat-attachment-chip",h.textContent=w,h}))}function Kp(){return`
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
  `}function Ep(){document.getElementById("pi-web-chat-style")?.remove();let p=document.createElement("style");return p.id="pi-web-chat-style",p.textContent=Kp(),document.head.append(p),p}function I(p){return p.command||p.cmd||(p.name?`/${p.name}`:"")}function G(p){if(!p)throw Error("pi-web-chat DOM template is invalid");return p}function Wb(p,b,w){return{threadId:p,runId:b,state:{},messages:w,tools:[],context:[]}}function Bb(p){let b=[...p.messages].reverse().find((w)=>w.role==="user");return{text:b?.text||"",attachments:b?.attachments||[],sessionId:p.threadId}}function vb(p,b,w){return p.map((h)=>Pb(h,b,w))}function Pb(p,b,w){if(p.type==="text.delta")return{type:"TEXT_MESSAGE_CONTENT",threadId:b,runId:w,delta:p.delta||""};if(p.type==="thinking.delta")return{type:"THINKING_MESSAGE_CONTENT",threadId:b,runId:w,delta:p.delta||""};if(p.type==="tool.start")return{type:"TOOL_CALL_START",threadId:b,runId:w,toolCallId:p.toolCallId,payload:Mp(p)};if(p.type==="tool.delta")return{type:"TOOL_CALL_ARGS",threadId:b,runId:w,toolCallId:p.toolCallId,delta:p.delta||""};if(p.type==="tool.end")return{type:"TOOL_CALL_END",threadId:b,runId:w,toolCallId:p.toolCallId,payload:Mp(p)};return{type:p.type.toUpperCase().replaceAll(".","_"),threadId:b,runId:w,payload:p}}function Mp(p){return{name:p.toolName||"tool",args:p.args||{},result:p.result||"",isError:p.isError===!0}}var S="pi-web-chat.sessions.v1";var Sp="plugin.pi-web-sidebar.selectedSession",mp="plugin.pi-web-sidebar.event",dp="plugin.pi-web-sidebar.activeSessionId",$p="plugin.pi-web-sidebar.activeWorkspaceId",kb=12,Wp=20,k=200,_p=200,xb=8,rb=1e6,gb=64000;var cb=250,np=6,ub=150,W=new Set,Bp=new WeakMap,Ib={"book-open":'<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',"file-plus":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="M9 15h6"/>',pencil:'<path d="M21.2 6.8 17.2 2.8a2 2 0 0 0-2.8 0L3 14.2V21h6.8L21.2 9.6a2 2 0 0 0 0-2.8z"/><path d="m14 5 5 5"/>',terminal:'<path d="m4 17 6-6-6-6"/><path d="M12 19h8"/>',cpu:'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 15h3"/><path d="M1 9h3"/><path d="M1 15h3"/>',globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 0 20"/><path d="M12 2a15.3 15.3 0 0 0 0 20"/>',search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',braces:'<path d="M8 3H7a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-4a2 2 0 0 1 2-2 2 2 0 0 1-2-2V7a2 2 0 0 0-2-2h-1"/>',"file-text":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',"circle-question-mark":'<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 1 1 5.8 1c-.5 1-1.4 1.5-2.1 2-.6.4-.8.8-.8 2"/><path d="M12 17h.01"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',plug:'<path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a6 6 0 0 1-12 0V8Z"/>',"git-branch":'<line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',"circle-check":'<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',hammer:'<path d="m15 12-8.5 8.5a2.1 2.1 0 0 1-3-3L12 9"/><path d="m17.6 5.4 1.8-1.8"/><path d="m14 7 3 3"/><path d="M5 11 2 8l6-6 3 3"/>',package:'<path d="m7.5 4.3 9 5.2"/><path d="M21 8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>'},ip=new WeakMap,Sb={read:"book-open",write:"file-plus",edit:"pencil",ctx_execute:"cpu",ctx_batch_execute:"cpu",ctx_execute_file:"cpu",ctx_search:"cpu",ctx_index:"cpu",ctx_fetch_and_index:"cpu",web_search:"globe",fetch_content:"search",get_search_content:"search",code_search:"braces",document_parse:"file-text",ask_user_question:"circle-question-mark",teams:"users",subagent:"users",mcp:"plug",git:"git-branch"};class ap{#p=[];add(p){if(p)this.#p.push(p);return p}listen(p,b,w){p.addEventListener(b,w),this.add({remove:()=>p.removeEventListener(b,w)})}dispose(){for(let p of this.#p.splice(0).reverse())if(typeof p==="function")p();else if("unsubscribe"in p)p.unsubscribe();else p.remove()}}function mb(p={}){let b=p.app;if(b?.piWebChat?.dispose(),typeof p.mount?.chat!=="function"||typeof p.mount?.composer!=="function")throw Error("pi-web-chat requires modern pi-web mount.chat and mount.composer APIs");return db(p,b)}function db(p,b){let w=new ap,h=w.add(Ep()),f=Yp(),i=Xp(),L=p.mount?.chat(f,{replace:!0}),l=p.mount?.composer(i,{replace:!0});if(v1(w,f),m1(w,f),L)w.add(L);if(l)w.add(l);let O=E(p);M(p,O||void 0);let T=O?.sessionId?T0(O.sessionId):O0(),$={backendChatToken:0,pendingPromptEchoIds:new Map};if(!O?.sessionId)a(f);else N(f,r(T).messages,T.activeSessionId),n(p,f,T,$,O.sessionId);X1(w,p,f,T,$),tb(w,p,i,f,T,$),nb(p,i),b?.classList.add(t());let _=()=>{if($.runEventsAbort?.abort(),$.sessionEventsAbort?.abort(),w.dispose(),W.clear(),h.remove(),b?.classList.remove(t()),b?.piWebChat===C)delete b.piWebChat},C={dispose:_};if(b)b.piWebChat=C;return _}function nb(p,b){c(b,{}),ab(p,b)}async function ab(p,b){try{let w=await p.backend?.("runtimeStatus",{data:{}}),h=z(w)?w:{},f=z(h.status)?ob(h.status):void 0;if(!f)return;c(b,f)}catch{}}function ob(p){let b={};if(typeof p.model==="string")b.model=p.model;if(typeof p.modelProvider==="string")b.modelProvider=p.modelProvider;if(typeof p.thinkingLevel==="string")b.thinkingLevel=p.thinkingLevel;if(typeof p.fiveHourQuota==="number")b.fiveHourQuota=p.fiveHourQuota;if(typeof p.weeklyQuota==="number")b.weeklyQuota=p.weeklyQuota;if(typeof p.currentBranch==="string")b.currentBranch=p.currentBranch;if(typeof p.branch==="string")b.branch=p.branch;if(typeof p.warning==="string")b.warning=p.warning;return b}function tb(p,b,w,h,f,i){let L=w.querySelector(".prompt-textarea"),l=w.querySelector(".send-btn"),O=w.querySelector(".attach-btn"),T=w.querySelector("[data-file-input]"),$=w.querySelector(".attach-chips"),_=w.querySelector(".shell-attachment-note");if(!L||!l)return;let C=w.querySelector(".prompt-bar"),A=w.querySelector(".slash-pop"),q=w.querySelector(".prompt-file-ref-pop"),H={selectedAttachments:[],shellMode:!1,commands:[]},V=()=>{sb($,L.value,H)},Y=()=>{eb(C,L,O,_,H)},Z=()=>{let j=L.value,R=Boolean(i.startingRunSessionId||i.fallbackSubmittingSessionId);if(l.disabled=R,l.setAttribute("aria-disabled",j.trim()&&!R?"false":"true"),V(),vp(H),H.shellMode){bp(A,q);return}L1(b,w,L,j,H.commands,(X)=>{H.commands=X}),H.fileSearchTimer=setTimeout(()=>{l1(b,w,L,L.value)},120)},g=()=>{H.shellMode=!0,bp(A,q),Y(),V()},Dp=()=>{H.shellMode=!1,Y(),V()},qp=async(j)=>{j?.preventDefault(),j?.stopImmediatePropagation();let R=L.value.trim();if(Z(),i.resolvingSubmit||i.startingRunSessionId||i.fallbackSubmittingSessionId)return;if(!R){L.value="",Z();return}if(i.resolvingSubmit=!0,L.value="",T)T.value="";Z();try{if(H.shellMode)xp(R,[]),await w1(b,h,f,R),Dp();else{let X=[...H.selectedAttachments,...await h1(b,R)];H.selectedAttachments=[],V(),xp(R,X);let Db=C1(b,h,f,i,R,X);i.resolvingSubmit=!1,await Db}}catch(X){if(!z0(X))N(h,[p1(X)],f.activeSessionId)}finally{i.resolvingSubmit=!1,Y(),Z()}};if(p.listen(L,"input",()=>{if(!H.shellMode&&L.value.startsWith("! "))L.value=L.value.slice(2),g();Z()}),p.listen(L,"keydown",(j)=>{let R=j;if(R.key===" "&&!H.shellMode&&L.value==="!"&&L.selectionStart===1&&L.selectionEnd===1){R.preventDefault(),L.value="",g(),Z();return}if(R.key==="Backspace"&&H.shellMode&&L.value===""){R.preventDefault(),Dp(),Z();return}if(R.key==="Escape"){bp(A,q);return}if(R.key==="Enter"&&(R.metaKey||R.ctrlKey))qp(R)}),p.listen(l,"click",(j)=>{qp(j)}),O&&T)p.listen(O,"click",()=>{if(!H.shellMode)T.click()}),p.listen(T,"change",()=>{b1(T,(j)=>{H.selectedAttachments=j,V()})});p.add({remove:()=>vp(H)}),Y()}function sb(p,b,w){if(!p)return;if(w.shellMode){pp(p,[]);return}pp(p,[...w.selectedAttachments.map((h)=>h.name||"attachment"),...op(b)])}function eb(p,b,w,h,f){if(p?.classList.toggle("shell-mode",f.shellMode),b.setAttribute("placeholder",f.shellMode?"run shell command in workspace…":"ask pi to do something…"),h)h.hidden=!(f.shellMode&&f.selectedAttachments.length>0);if(w)e(w,f.shellMode?"shell":"normal")}function vp(p){if(p.fileSearchTimer)clearTimeout(p.fileSearchTimer),p.fileSearchTimer=void 0}function bp(p,b){p?.setAttribute("hidden",""),b?.setAttribute("hidden","")}function p1(p){return{id:D(),role:"system",text:`prompt failed: ${Jp(p)}`,createdAt:Date.now()}}async function b1(p,b){let w=Array.from(p.files||[]).slice(0,xb),h=[];for(let f of w){if(f.size>rb)continue;h.push({name:f.name,size:f.size,content:await f.text(),mimeType:f.type||void 0})}b(h)}async function w1(p,b,w,h){let f=lb(p,w),i=J(w,f),L={id:D(),role:"user",text:`! ${h}`,createdAt:Date.now()},l={id:D(),role:"tool",text:`$ ${h}
(running...)`,createdAt:Date.now()};i.messages.push(L,l),i.updatedAt=Date.now(),y(w),N(b,i.messages,f);try{let O=await U(p,"runShell",{command:h}),T=typeof O.exitCode==="number"?O.exitCode:1,$=typeof O.durationMs==="number"?O.durationMs:0,_=typeof O.output==="string"?O.output:"";l.text=f1(h,_,T,$,Boolean(O.truncated))}catch(O){l.text=`$ ${h}
${Jp(O)}`}i.updatedAt=Date.now(),y(w),N(b,i.messages,f)}async function h1(p,b){let w=op(b);if(!w.length)return[];let h=await U(p,"resolveContext",{text:b,refs:w});return Array.isArray(h.attachments)?h.attachments.filter(z):[]}function f1(p,b,w,h,f){let i=i1(b,gb),L=f||i.truncated,l=i.text.endsWith(`
`)||!i.text?"":`
`;return`$ ${p}
${i.text}${l}[exit ${w} · ${h}ms${L?" · truncated":""}]`}function i1(p,b){let w=new TextEncoder,h=w.encode(p);if(h.byteLength<=b)return{text:p,truncated:!1};let f=new TextDecoder().decode(h.slice(0,b));while(f&&w.encode(f).byteLength>b)f=f.slice(0,-1);return{text:f,truncated:!0}}async function L1(p,b,w,h,f,i){let L=b.querySelector(".slash-pop"),l=b.querySelector(".slash-list"),O=h0(h);if(O===null||!l){L?.setAttribute("hidden","");return}let T=f;if(!T.length){let _=await U(p,"commands",{});T=Array.isArray(_.commands)?_.commands.filter(z):[],i(T)}if(w.value!==h)return;let $=T.filter((_)=>{return I(_).slice(1).toLowerCase().includes(O)});O1(l,$,w,L),L?.toggleAttribute("hidden",$.length===0)}async function l1(p,b,w,h){let f=b.querySelector(".prompt-file-ref-pop"),i=b.querySelector(".prompt-file-ref-list"),L=f0(h);if(L===null||!i){f?.setAttribute("hidden","");return}try{let l=await U(p,"searchFiles",{query:L,limit:kb}),O=Array.isArray(l.files)?l.files.filter(z):[];if(w.value!==h)return;T1(i,w,O,f),f?.toggleAttribute("hidden",O.length===0)}catch{f?.setAttribute("hidden","")}}function O1(p,b,w,h){p.replaceChildren(...b.map((f)=>{let i=document.createElement("button"),L=I(f);return i.type="button",i.className="slash-item",i.dataset.slash=L,i.innerHTML='<span class="sl-name"></span><span class="sl-desc"></span>',i.querySelector(".sl-name").textContent=L,i.querySelector(".sl-desc").textContent=f.description||"",i.addEventListener("click",()=>{w.value=f.template||`${L} `,h?.setAttribute("hidden",""),w.dispatchEvent(new(w.ownerDocument.defaultView?.Event||Event)("input",{bubbles:!0})),w.focus()}),i}))}function T1(p,b,w,h){p.replaceChildren(...w.map((f)=>{let i=f.path||f.name||"",L=document.createElement("button");return L.type="button",L.className="prompt-file-ref-item",L.dataset.path=i,L.disabled=!i,L.innerHTML='<span class="pfr-path"></span><span class="pfr-kind"></span>',L.querySelector(".pfr-path").textContent=i,L.querySelector(".pfr-kind").textContent=typeof f.size==="number"?`${f.size} bytes`:"file",L.addEventListener("click",()=>{$1(b,i),h?.setAttribute("hidden","")}),L}))}function $1(p,b){if(!b)return;let{value:w,selectionStart:h}=p,f=w.slice(0,h),i=/(?:^|\s)@([^\s@`]*)$/.exec(f),L=i?h-(i[1]||"").length-1:h,l=`@${b} `;p.value=`${w.slice(0,L)}${l}${w.slice(h)}`;let O=L+l.length;p.setSelectionRange(O,O),p.dispatchEvent(new(p.ownerDocument.defaultView?.Event||Event)("input",{bubbles:!0})),p.focus()}function G0(p){return{input$:p.behaviorSubject("chat.input",""),submitted$:p.subject("chat.input.submitted"),activeSessionId$:p.behaviorSubject("session.activeId",null),sidebarSelectedSession$:p.behaviorSubject(Sp,_1()),toastRequested$:p.subject("toast.requested")}}function op(p){let b=[],w=new Set,h=/(^|[\s`])@([^\s@`]+)/g,f=h.exec(String(p||""));while(f!==null){let i=f[2]||"";if((f[1]||"")!=="`"&&i&&!w.has(i))w.add(i),b.push(i);f=h.exec(String(p||""))}return b}function J0(p=[],b=[]){let w=[],h=new Set;for(let f of[...p,...b]){let i=I(f);if(!i||h.has(i))continue;h.add(i),w.push(f)}return w}function d(p){return p.app?.piWebSidebar?.getSnapshot?.().activeWorkspaceId||p.app?.dataset.activeWorkspaceId||""}function _1(){return E({})}function E(p){let b=p.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),w=b?.activeSessionId||"",h=b?.activeWorkspaceId||"";if(w&&p.app?.dataset.clearedSessionId!==w)return{sessionId:w,workspaceId:h||void 0};return null}function M(p,b){if(b?.workspaceId&&p.app)p.app.dataset.activeWorkspaceId=b.workspaceId,Pp($p,b.workspaceId);if(b?.sessionId)delete p.app?.dataset.clearedSessionId,p.app?.setAttribute("data-active-session-id",b.sessionId),Pp(dp,b.sessionId)}function tp(p){let b=E(p);if(b?.sessionId&&p.app)p.app.dataset.clearedSessionId=b.sessionId;p.app?.removeAttribute("data-active-session-id"),H1(dp),globalThis.piWeb?.behaviorSubject("session.activeId",null).next(null)}function x(p,b,w={}){let h=p.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),f={type:b,detail:w,snapshot:h};(p.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$)?.next(f),globalThis.piWeb?.subject(mp).next(f)}function Hp(p,b,w){let h=p.app?.dataset.activeWorkspaceId||d(p),f={reason:w,sessionId:b,workspaceId:h};globalThis.piWeb?.behaviorSubject("session.activeId",b).next(b),x(p,"active.start",f),x(p,"session.created",f)}function Cp(p,b){globalThis.piWeb?.subject("session.changed").next({sessionId:p,name:b,title:b})}function Rp(p){if(p.title!=="New chat")return"";let w=p.messages.find((h)=>h.role==="user")?.text.slice(0,48)||"";if(!w)return"";return p.title=w,w}function Pp(p,b){try{localStorage.setItem(p,b)}catch{}}function H1(p){try{localStorage.removeItem(p)}catch{}}async function U(p,b,w={},h=d(p)){if(!p.backend)return{};let f=await p.backend(b,{workspaceId:h,data:w});return z(f)?f:{}}function Lp(p){let b=Array.isArray(p.warnings)?p.warnings.filter((w)=>typeof w==="string"&&w.trim().length>0):[];for(let w of b)globalThis.piWeb?.subject("toast.requested").next({level:"warning",message:w})}function D0(p,b){return p.trim().startsWith("!")?[]:[...b]}async function C1(p,b,w,h,f,i){let L=lb(p,w),l=F(p);if(h.activeRunId&&h.activeRunSessionId===L){await R1(p,b,w,h,f,i,l.path,l.id);return}if(h.startingRunSessionId===L||h.fallbackSubmittingSessionId===L)return;h.backendChatToken+=1,h.startingRunSessionId=L,h.runEventsAbort?.abort();let O=new AbortController;h.runEventsAbort=O,h.sessionEventsAbort?.abort();let T={id:D(),role:"user",text:f,attachments:Zp(i),createdAt:Date.now()},$=J(w,L);Ab(h.pendingPromptEchoIds,L,T.id),$.messages.push(T),$.updatedAt=Date.now(),y(w),N(b,$.messages,L);let _;try{_=await j1(p,f,i,L,l.path,l.id)}catch(H){throw h.startingRunSessionId=void 0,H}if(O.signal.aborted){h.startingRunSessionId=void 0,lp(w,L,T.id);return}if(Lp(_),typeof _.activeSessionId==="string"&&_.activeSessionId){let H=L,V=w.activeSessionId===H;if(L=_.activeSessionId,V)B(w,L),M(p,{sessionId:_.activeSessionId,workspaceId:l.id||void 0}),x(p,"chat-session",{reason:"startPrompt",sessionId:_.activeSessionId}),Hp(p,_.activeSessionId,"startPrompt");else J(w,L);jb(w,H,L,T.id),L0(h.pendingPromptEchoIds,H,L)}if(typeof _.runId!=="string"||!_.runId){h.startingRunSessionId=void 0,h.fallbackSubmittingSessionId=L;let H;try{H=await F1(p,f,i,L,l.path,l.id)}catch(g){throw h.fallbackSubmittingSessionId=void 0,g}if(O.signal.aborted){h.fallbackSubmittingSessionId=void 0,lp(w,L,T.id);return}Lp(H);let V=typeof H.activeSessionId==="string"&&H.activeSessionId?H.activeSessionId:L,Y=Fp(h.pendingPromptEchoIds,L),Z=Y1(p,w,H,"submitPrompt",L,Y);if(Vp(h.pendingPromptEchoIds,V,Z,H.messages,Y),w.activeSessionId===L||w.activeSessionId===V)N(b,Z,w.activeSessionId);if(h.runEventsAbort===O)h.runEventsAbort=void 0;h.startingRunSessionId=void 0,h.fallbackSubmittingSessionId=void 0;return}let C=J(w,L);h.activeRunId=_.runId,h.activeRunSessionId=L,h.startingRunSessionId=void 0;let A=Rp(C);if(A)y(w),Cp(L,A);let q=Z1(C);try{await y1(p,w,C,_.runId,l.path,l.id,q,()=>{if(!O.signal.aborted&&w.activeSessionId===L)N(b,C.messages,L)},O.signal)}finally{if(h.activeRunId===_.runId)h.activeRunId=void 0,h.activeRunSessionId=void 0,h.startingRunSessionId=void 0,h.fallbackSubmittingSessionId=void 0;if(h.runEventsAbort===O)h.runEventsAbort=void 0}if(!O.signal.aborted&&w.activeSessionId===L)n(p,b,w,h,L,l.path,l.id)}async function R1(p,b,w,h,f,i,L,l){let{activeRunId:O,activeRunSessionId:T}=h;if(!O||!T)throw Error("active run is unavailable for steering");let $={id:D(),role:"user",text:f,attachments:Zp(i),createdAt:Date.now()},_=J(w,T);if(Ab(h.pendingPromptEchoIds,T,$.id),_.messages.push($),_.updatedAt=Date.now(),y(w),w.activeSessionId===T)N(b,_.messages,T);try{let C=await V1(p,O,f,i,T,L,l);Lp(C)}catch(C){if(lp(w,T,$.id),wb(C)){N(b,_.messages,T),globalThis.piWeb?.subject("toast.requested").next({level:"error",message:"This backend does not support steering while a response is streaming."});return}throw C}}function lp(p,b,w){let h=p.sessions.find((f)=>f.id===b);if(!h)return;h.messages=h.messages.filter((f)=>f.id!==w),Fb(p,h.id),y(p)}async function y1(p,b,w,h,f,i,L,l,O){let T=await ep(p,"streamEventsSse",{runId:h,cursor:0,workspacePath:f},O,i);if(!T)throw Error("SSE streaming backend did not return a stream");let $=sp(l);L.streaming=!0,$.flush();try{await pb(T,(_)=>{G1(L,[_]),L.streaming=_.type!=="run.end",w.updatedAt=Date.now(),y(b),$.request()})}finally{L.streaming=!1,y(b),$.flush()}}function sp(p){let b=0,w,h=()=>{if(w)clearTimeout(w),w=void 0},f=()=>{h(),b=Date.now(),p()};return{request:()=>{let L=cb-(Date.now()-b);if(L<=0){f();return}w||=setTimeout(f,L)},flush:f,cancel:h}}async function ep(p,b,w={},h,f=d(p)){if(!p.backendStream)throw Error("SSE streaming backend is unavailable");let i=await p.backendStream(b,{workspaceId:f,data:w},{signal:h});return N1(i)}function N1(p){if(typeof ReadableStream<"u"&&p instanceof ReadableStream)return p;if(typeof Response<"u"&&p instanceof Response)return p.body;if(typeof p==="string")return kp(p);if(!z(p))return null;let b=p.body;if(typeof ReadableStream<"u"&&b instanceof ReadableStream)return b;let w=p.sse;if(typeof w==="string")return kp(w);return null}function kp(p){let b=new TextEncoder().encode(p);return new ReadableStream({start(w){w.enqueue(b),w.close()}})}async function pb(p,b){let w=p.getReader(),h=new TextDecoder,f="";while(!0){let i=await w.read();if(i.done){f+=h.decode(),A1(f,b);return}f+=h.decode(i.value,{stream:!0});let L=z1(f);f=L.remainder;for(let l of L.frames)bb(l,b)}}function z1(p){let w=p.replaceAll(`\r
`,`
`).replaceAll("\r",`
`).split(`

`),h=w.pop()||"";return{frames:w,remainder:h}}function A1(p,b){let w=p.trim();if(w)bb(w,b)}function bb(p,b){let w=p.split(`
`).filter((h)=>h.startsWith("data:")).map((h)=>h.slice(5).trimStart()).join(`
`);if(!w)return;try{let h=JSON.parse(w);if(q1(h))b(h)}catch{}}function xp(p,b){globalThis.piWeb?.subject("chat.input.submitted").next({text:p,attachments:Zp(b)||[]})}async function j1(p,b,w,h,f=F(p).path,i=F(p).id){try{return await U(p,"startPrompt",yp(b,w,h,f),i)}catch(L){if(wb(L))return{};throw L}}function wb(p){return/unknown method: (startPrompt|streamEventsSse|steerPrompt)|unsupported method: (startPrompt|streamEventsSse|steerPrompt)|(startPrompt|streamEventsSse|steerPrompt) unsupported/i.test(Jp(p))}async function F1(p,b,w,h="",f=F(p).path,i=F(p).id){return await U(p,"submitPrompt",yp(b,w,h,f),i)}async function V1(p,b,w,h,f="",i=F(p).path,L=F(p).id){let l={...yp(w,h,f,i),runId:b};return U(p,"steerPrompt",l,L)}function yp(p,b,w,h){let f={text:p,attachments:b,sessionId:w};if(h)f.workspacePath=h;return f}function Z1(p){let b=[...p.messages].reverse().find((h)=>h.role==="assistant"&&h.streaming);if(b)return b;let w={id:D(),role:"assistant",text:"",createdAt:Date.now(),streaming:!0};return p.messages.push(w),w}function G1(p,b){for(let w of b)if(w.type==="text.delta"&&typeof w.delta==="string")wp(p,"text",w.delta),p.text+=w.delta;else if(w.type==="thinking.delta"&&typeof w.delta==="string")wp(p,"thinking",w.delta),p.thinking=`${p.thinking||""}${w.delta}`;else if(w.type==="tool.start")hp(p,w,"running");else if(w.type==="tool.delta"&&typeof w.delta==="string"){let h=hp(p,w,"running");h.text=w.delta}else if(w.type==="tool.end"){let h=hp(p,w,w.isError?"err":"ok");if(typeof w.result==="string"&&w.result)h.text=w.result}else if(w.type==="error"&&typeof w.message==="string")wp(p,"text",`${p.text?`
`:""}${w.message}`),p.text+=`${p.text?`
`:""}${w.message}`}function wp(p,b,w){p.blocks||=[];let h=p.blocks[p.blocks.length-1];if(h?.type===b){h.text+=w;return}if(p.blocks.length<_p)p.blocks.push({id:D(),type:b,text:w})}function hp(p,b,w){let h=b.toolCallId||b.toolName||"tool";p.toolCalls||=[];let f=p.toolCalls.find((i)=>i.id===h);if(!f)f={id:h,name:b.toolName||"tool",args:b.args,text:"",status:w},p.toolCalls.push(f),J1(p,f);if(f.status=w,D1(f,b))f.args=b.args,f.argsStatus=b.argsStatus;return f}function J1(p,b){if(p.blocks||=[],p.blocks.some((w)=>w.type==="tool"&&w.toolCall?.id===b.id))return;if(p.blocks.length<_p)p.blocks.push({id:D(),type:"tool",text:"",toolCall:b})}function D1(p,b){if(!b.argsStatus)return Boolean(b.args);if(b.argsStatus==="unavailable")return!p.argsStatus;return!0}function q1(p){return z(p)&&typeof p.type==="string"}async function n(p,b,w,h,f="",i=Np(p),L=F(p).id){if(!p.backendStream){await rp(p,b,w,h,f,i);return}let l=++h.backendChatToken;h.sessionEventsAbort?.abort();let O=new AbortController;h.sessionEventsAbort=O;let T=sp(()=>{N(b,r(w).messages,w.activeSessionId)});try{let $=await ep(p,"sessionEventsSse",hb(p,f,i),O.signal,L);if(!$)throw Error("session SSE backend did not return a stream");await pb($,(_)=>{if(l!==h.backendChatToken||_.type!=="chat.state")return;let C=U1(_),A=typeof C.activeSessionId==="string"?C.activeSessionId:f,q=Fp(h.pendingPromptEchoIds,A),H=ib(p,w,C,"chatState",q);if(Vp(h.pendingPromptEchoIds,A,H,C.messages,q),H.length)T.request()})}catch($){if(!O.signal.aborted)await rp(p,b,w,h,f,i)}finally{if(T.cancel(),h.sessionEventsAbort===O)h.sessionEventsAbort=void 0}}async function rp(p,b,w,h,f="",i=Np(p)){let L=++h.backendChatToken;try{let l=await U(p,"chatState",hb(p,f,i));if(L!==h.backendChatToken)return;let O=typeof l.activeSessionId==="string"?l.activeSessionId:f,T=Fp(h.pendingPromptEchoIds,O),$=ib(p,w,l,"chatState",T);if(Vp(h.pendingPromptEchoIds,O,$,l.messages,T),$.length)N(b,$,w.activeSessionId)}catch{}}function hb(p,b,w=Np(p)){let h=b?{sessionId:b}:{};if(w)h.workspacePath=w;return h}function U1(p){return{activeSessionId:p.activeSessionId,messages:p.messages,isStreaming:p.isStreaming}}function Np(p){return F(p).path}function F(p){let b=p.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),w=b?.activeWorkspaceId||p.app?.dataset.activeWorkspaceId||"",h=b?.workspaces?.find((f)=>f.id===w)?.path||"";return{id:w,path:h}}function fb(p,b){let w=p.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),h=b.workspaceId||w?.activeWorkspaceId||p.app?.dataset.activeWorkspaceId||"",f=w?.workspaces?.find((i)=>i.id===h)?.path||"";if(f||h!==w?.activeWorkspaceId)return{id:h,path:f};return F(p)}function ib(p,b,w,h,f=""){let i=Gp(w.messages);if(typeof w.activeSessionId==="string"&&w.activeSessionId){let T=b.activeSessionId;if(B(b,w.activeSessionId),M(p,{sessionId:w.activeSessionId,workspaceId:p.app?.dataset.activeWorkspaceId||d(p)||void 0}),h!=="chatState"||T!==w.activeSessionId)x(p,"chat-session",{reason:h,sessionId:w.activeSessionId});if(h!=="chatState")Hp(p,w.activeSessionId,h)}let L=r(b);if(!i.length)return[];let l=zb(L.messages,i,f).slice(-k);if(!Lb(L.messages,l))return[];L.messages=l;let O=Rp(L);if(L.updatedAt=Date.now(),y(b),O)Cp(L.id,O);return L.messages}function Lb(p,b){if(p.length!==b.length)return!0;return p.some((w,h)=>Op(w)!==Op(b[h]))}function Op(p){return JSON.stringify({id:p.id,role:p.role,text:p.text,blocks:p.blocks,thinking:p.thinking,streaming:p.streaming,toolCalls:p.toolCalls,attachments:p.attachments})}function Y1(p,b,w,h,f,i=""){let L=Gp(w.messages),l=typeof w.activeSessionId==="string"&&w.activeSessionId?w.activeSessionId:f,O=b.activeSessionId===f;if(l!==f)if(O)B(b,l),M(p,{sessionId:l,workspaceId:F(p).id||void 0}),x(p,"chat-session",{reason:h,sessionId:l}),Hp(p,l,h);else J(b,l);let T=Array.isArray(i)?i:[i].filter(Boolean);if(l!==f)for(let A of T)jb(b,f,l,A);let $=J(b,l);if(!L.length)return[];let _=zb($.messages,L,i).slice(-k);if(!Lb($.messages,_))return[];$.messages=_;let C=Rp($);if($.updatedAt=Date.now(),y(b),C)Cp($.id,C);return $.messages}function X1(p,b,w,h,f){let i=(T,$)=>{if(!T?.sessionId){if(!$)gp(b,w,h,f,!0);return}if(Ob(b,h,T))return;M(b,T),B(h,T.sessionId),N(w,r(h).messages,h.activeSessionId);let _=fb(b,T);n(b,w,h,f,T.sessionId,_.path,_.id)},L=(T)=>{if(Q1(b,w,h,f,T))return;let $=E1(b,T);if($)i($,!1)},l=b.app?.piWebSidebar?.channels?.selectedSession$||globalThis.piWebSidebar?.channels?.selectedSession$,O=b.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$;if(l){let T=!0;p.add(l.subscribe(($)=>{i($,T),T=!1}))}if(O)p.add(O.subscribe(L));if(b.app)p.listen(b.app,"pi-web-sidebar:session-created",(T)=>{let $=T.detail||{},_=typeof $.sessionId==="string"?$.sessionId:"",C=typeof $.workspaceId==="string"?$.workspaceId:"";if(_)i({sessionId:_,workspaceId:C||void 0},!1)});if(globalThis.piWeb){let T=!0;p.add(globalThis.piWeb.behaviorSubject(Sp,E(b)).subscribe((_)=>{i(_,T),T=!1})),p.add(globalThis.piWeb.subject(mp).subscribe(L));let $=!0;p.add(globalThis.piWeb.behaviorSubject("session.activeId",null).subscribe((_)=>{if(!_){if(!$)gp(b,w,h,f,!1);$=!1;return}$=!1,i({sessionId:_,workspaceId:b.app?.dataset.activeWorkspaceId||Vb($p)||void 0},!1)}))}}function gp(p,b,w,h,f){if(h.backendChatToken+=1,h.runEventsAbort?.abort(),h.sessionEventsAbort?.abort(),w.activeSessionId="",y(w),f)tp(p);else{let i=E(p);if(i?.sessionId&&p.app)p.app.dataset.clearedSessionId=i.sessionId}a(b)}function lb(p,b){let w=E(p);if(w?.sessionId&&!Ob(p,b,w))M(p,w),B(b,w.sessionId);if(!b.activeSessionId)return J(b,"",!0).id;return b.activeSessionId}function Ob(p,b,w){let h=w.workspaceId||"",f=p.app?.dataset.activeWorkspaceId||Vb($p)||"";return b.activeSessionId===w.sessionId&&(!h||h===f)}function Q1(p,b,w,h,f){if(f.type!=="session.deleted")return!1;let i=Tb(f);if(!i)return!0;let L=w.activeSessionId===i,l=w.sessions.length;if(w.sessions=w.sessions.filter((O)=>O.id!==i),L){h.runEventsAbort?.abort(),h.sessionEventsAbort?.abort();let O=K1(p,f,i);if(O?.sessionId){M(p,O),B(w,O.sessionId),W1(b,r(w).messages,w.activeSessionId);let T=fb(p,O);return n(p,b,w,h,O.sessionId,T.path,T.id),!0}return w.activeSessionId="",tp(p),y(w),a(b),!0}if(w.sessions.length!==l)y(w);return!0}function K1(p,b,w){let h=b.snapshot?.activeSessionId||"",f=b.snapshot?.activeWorkspaceId||"";if(h&&h!==w)return{sessionId:h,workspaceId:f||void 0};let i=E(p);if(i?.sessionId&&i.sessionId!==w)return i;return null}function E1(p,b){if(!M1(b.type))return null;let w=b.detail||{},h=Tb(b)||b.snapshot?.activeSessionId||"",f=typeof w.workspaceId==="string"?w.workspaceId:b.snapshot?.activeWorkspaceId||p.app?.dataset.activeWorkspaceId||"";if(!h)return null;return{sessionId:h,workspaceId:f||void 0}}function Tb(p){let b=p.detail||{};if(typeof b.sessionId==="string")return b.sessionId;if(typeof b.id==="string")return b.id;return""}function M1(p){return p==="session.selected"||p==="session.created"||p==="new-session"||p==="active.start"}function B(p,b){let w=p.sessions.find((h)=>h.id===b);if(!w)w=o(b),p.sessions.unshift(w);return p.activeSessionId=w.id,y(p),w}function N(p,b,w){if(Cb(b,w),!b.length){a(p);return}let h=p.querySelector(".term-inner")||p;$b(h,b,w),zp(p)}function W1(p,b,w){Cb(b,w);let h=p.querySelector(".term-inner")||p;$b(h,b,w),zp(p)}function $b(p,b,w){let h=B1(p),f=b.map((l)=>{let O=`${w}:${Op(l)}`,T=h.get(l.id);if(T&&Bp.get(T)===O)return T;let $=P1(l,w);return Bp.set($,O),$}),i=new Set(f),L=p.firstChild;for(let l of f){if(L!==l)p.insertBefore(l,L);L=l.nextSibling}for(let l of Array.from(p.children)){if(Tp(p,l)&&!i.has(l)){l.remove();continue}if(!Tp(p,l))l.remove()}}function B1(p){let b=new Map;for(let w of Array.from(p.children)){if(!Tp(p,w))continue;let h=w.dataset.messageId||"";if(h)b.set(h,w)}return b}function Tp(p,b){let w=p.ownerDocument.defaultView;return Boolean(w&&b instanceof w.HTMLElement&&b.classList.contains("transcript-item"))}function a(p){let b=p.querySelector(".term-inner")||p,w=document.createElement("article");w.className="pi-web-chat-docs",w.setAttribute("aria-label","pi-web-chat guide");let h=document.createElement("h1");h.textContent="pi-web-chat guide";let f=document.createElement("p");f.textContent=["Select or create a session in the sidebar to load chat history,","or type below to start a new session."].join(" ");let i=document.createElement("ul");for(let L of["Ask pi in the prompt box and press Cmd/Ctrl+Enter to send.","Type ! then Space at the start to turn the prompt yellow and run shell commands in the workspace.","Queued file attachments hide during shell mode and reappear for the next normal prompt.","Type @ to list project files, then pick one to tag it as prompt context.","Type / at the start to open the slash command list.","Chats are cached locally after you start or select a session."]){let l=document.createElement("li");l.textContent=L,i.append(l)}w.append(h,f,i),b.replaceChildren(w),zp(p)}function v1(p,b){let w=b.querySelector(".term"),h=b.querySelector("[data-action='scroll-bottom']");if(!w||!h)return;let f={term:w,button:h,pinned:!0,touchStartY:null};ip.set(b,f),h.hidden=!1,m(f),p.listen(h,"click",()=>{f.pinned=!0,_b(f),m(f)}),p.listen(w,"wheel",(i)=>{if(i.deltaY<0)cp(f)}),p.listen(w,"touchstart",(i)=>{let L=i;f.touchStartY=L.touches.item(0)?.clientY??null}),p.listen(w,"touchmove",(i)=>{let l=i.touches.item(0)?.clientY;if(typeof l==="number"&&f.touchStartY!==null&&l-f.touchStartY>8)cp(f)}),p.listen(w,"touchend",()=>{f.touchStartY=null}),p.add({remove:()=>{ip.delete(b)}})}function zp(p){let b=ip.get(p);if(!b)return;if(b.pinned)_b(b);m(b)}function _b(p){p.term.scrollTop=p.term.scrollHeight}function cp(p){p.pinned=!1,m(p)}function m(p){p.button.dataset.pinned=p.pinned?"true":"false",p.button.setAttribute("aria-pressed",p.pinned?"true":"false")}function P1(p,b){let w=document.createElement("article");if(w.className="transcript-item",w.dataset.messageId=p.id,k1(p)){let h=x1(p);if(h)Ap(w,p.role,p.text);c1(w,p,b,h)}else u1(w,p,b);if(p.streaming)w.dataset.streaming="true";return w}function k1(p){return Boolean(p.blocks?.some((b)=>{return b.type==="tool"||b.text.trim().length>0}))}function x1(p){return Boolean(p.text.trim())&&(!r1(p)||g1(p))}function r1(p){return Boolean(p.blocks?.some((b)=>{return b.type==="text"&&b.text.trim().length>0}))}function g1(p){return(p.blocks?.length||0)>=_p}function c1(p,b,w,h=!1){for(let f of b.blocks||[])if(f.type==="text"){if(!h)Ap(p,b.role,f.text)}else if(f.type==="thinking")p.append(Hb(f.text,Boolean(b.streaming)));else if(f.type==="tool"&&f.toolCall){let i=b.toolCalls?.find((L)=>L.id===f.toolCall?.id)||f.toolCall;p.append(Rb(i,jp(w,b,i)))}}function u1(p,b,w){if(I1(b))Ap(p,b.role,b.text);if(b.thinking)p.append(Hb(b.thinking,Boolean(b.streaming)));for(let h of b.toolCalls||[])p.append(Rb(h,jp(w,b,h)))}function Ap(p,b,w){if(b==="assistant"&&!w.trim())return;let h=document.createElement("div");h.className="msg",h.dataset.kind=fp(b);let f=document.createElement("span");f.className=`prefix ${fp(b)}`,f.textContent=w0(b);let i=document.createElement("pre");i.className=`body ${fp(b)}`,i.textContent=w,h.append(f,i),p.append(h)}function I1(p){let b=p.text.trim().length>0;return p.role!=="assistant"||b}function Hb(p,b){let w=document.createElement("details");w.className="msg-detail think thinking-block",w.open=b;let h=document.createElement("summary");h.className="label",h.textContent="THINKING";let f=document.createElement("pre");return f.className="body",f.textContent=p,w.append(h,f),w}function Cb(p,b){let w=new Set;for(let h of p)for(let f of h.toolCalls||[])w.add(jp(b,h,f));for(let h of W)if(!w.has(h))W.delete(h)}function jp(p,b,w){return`${p}:${b.id}:${w.id}`}function Rb(p,b){let w=document.createElement("div");w.className="tool-card",w.dataset.tool=p.name||"tool",w.dataset.status=p.status;let h=!W.has(b);w.dataset.collapsed=h?"true":"false";let f=document.createElement("button");if(f.type="button",f.className="tc-head",f.title=h?"Show tool output":"Hide tool output",f.setAttribute("aria-expanded",h?"false":"true"),f.setAttribute("aria-label",yb(p,h)),f.append(a1(p),o1(p),t1(p),s1(p,h)),!h)w.append(Nb(p));return f.addEventListener("click",()=>n1(w,f,p,b)),w.prepend(f),w}function yb(p,b){let w=b?"Show":"Hide",h=p.status==="running"?"running":p.status==="err"?"failed":"done",f=S1(p),i=f?`, ${f}`:"";return`${w} ${p.name||"tool"} output, ${h}${i}`}function S1(p){if(p.argsStatus==="present")return"arguments present";if(p.argsStatus)return u(p);return p.args?"arguments present":""}function Nb(p){let b=document.createElement("pre");return b.className="tc-body",b.textContent=p.text||s(p),b}function m1(p,b){let w=0,h,f=b.ownerDocument.defaultView,i=typeof f?.matchMedia==="function"?f.matchMedia("(prefers-reduced-motion: reduce)"):void 0,L=()=>{if(h)clearInterval(h),h=void 0},l=()=>{w=(w+1)%np;for(let $ of b.querySelectorAll(".spinner"))$.dataset.frame=String(w)},O=()=>{let $=b.querySelectorAll(".spinner");if(i?.matches||$.length===0){L(),w=0;for(let _ of $)_.dataset.frame="0";return}if(!h)h=setInterval(l,ub)},T=new(f?.MutationObserver||MutationObserver)(O);T.observe(b,{childList:!0,subtree:!0}),i?.addEventListener("change",O),O(),p.add({remove:()=>{T.disconnect(),i?.removeEventListener("change",O),L()}})}function d1(){let p=document.createElement("span");p.className="spinner",p.dataset.frame="0",p.setAttribute("aria-hidden","true");for(let b=0;b<np;b+=1)p.append(document.createElement("span"));return p}function n1(p,b,w,h){let f=p.querySelector(".tc-body"),i=f!==null;if(f)f.remove(),W.delete(h);else p.append(Nb(w)),W.add(h);p.dataset.collapsed=i?"true":"false",b.setAttribute("aria-expanded",i?"false":"true"),b.setAttribute("aria-label",yb(w,i)),b.title=i?"Show tool output":"Hide tool output";let L=b.querySelector(".tc-toggle-label");if(L)L.textContent=i?"show":"hide"}function a1(p){let b=document.createElement("span");b.className="tc-glyph";let w=e1(p),h=w?Ib[w]:"";if(!w||!h)return b.textContent="●",b;return b.innerHTML=`<svg class="tc-icon" data-tool-icon="${w}" aria-hidden="true" viewBox="0 0 24 24">${h}</svg>`,b}function o1(p){let b=document.createElement("span");return b.className="tc-name",b.textContent=p.name||"tool",b}function t1(p){let b=document.createElement("span");return b.className="tc-args",b.textContent=u(p),b}function s1(p,b){let w=document.createElement("span");if(w.className="tc-meta",p.status==="running"){let i=d1(),L=document.createElement("span");return L.className="running",L.textContent="running",w.append(i,L,up(b)),w}let h=document.createElement("span");h.className=p.status==="err"?"err":"ok",h.textContent=p.status==="err"?"✗":"✓";let f=document.createElement("span");return f.textContent=p.status==="err"?" · failed":" · done",w.append(h,f,up(b)),w}function up(p){let b=document.createElement("span");b.className="tc-toggle";let w=document.createElement("span");w.className="tc-toggle-label",w.textContent=p?"show":"hide";let h=document.createElement("span");return h.className="tc-caret",h.textContent="▸",b.append(w,h),b}function e1(p){let b=p0(p.name);if(["bash","shell","sh","zsh","terminal"].includes(b))return b0(u(p).toLowerCase())||"terminal";return Sb[b]}function p0(p){return p.trim().replace(/^functions\./,"").replace(/^multi_tool_use\./,"")}function b0(p){if(/\bgit\b|\bgh\b/.test(p))return"git-branch";if(/\b(go test|bun test|npm test|pnpm test|yarn test|vitest|pytest|cargo test)\b/.test(p))return"circle-check";if(/\b(bun|npm|pnpm|yarn)\s+(run\s+)?build\b|\b(go build|cargo build)\b/.test(p))return"hammer";if(/\b(bun|npm|pnpm|yarn)\s+(add|install|i)\b|\bpip\s+install\b|\bgo\s+get\b/.test(p))return"package";return}function w0(p){if(p==="assistant")return"pi >";if(p==="user")return"you >";if(p==="system")return"sys >";return"tool >"}function fp(p){if(p==="assistant")return"pi";if(p==="system")return"sys";return p}function h0(p){let b=/^\/([^\s/]*)$/.exec(p);return b?b[1].toLowerCase():null}function f0(p){let b=/(?:^|\s)@([^\s@`]*)$/.exec(p);return b?b[1]:null}function q0(p){return p.length>0}function U0(p,b){return p.trim().startsWith("!")&&b}function zb(p,b,w=""){let h=Array.isArray(w)?w:[w].filter(Boolean),f=new Map,i=new Map,L=0;for(let O of p)f.set(O.id,O),i.set(O.id,L++);let l=new Set;for(let O of b){let T=i0(p,O,h,l);if(T){l.add(T.id),f.delete(T.id),f.set(O.id,O),i.set(O.id,i.get(T.id)??L++);continue}if(!i.has(O.id))i.set(O.id,L++);f.set(O.id,{...f.get(O.id),...O})}return[...f.values()].sort((O,T)=>{let $=O.createdAt-T.createdAt;if($!==0)return $;return(i.get(O.id)??0)-(i.get(T.id)??0)})}function i0(p,b,w,h){if(!w.length||b.role!=="user"||!b.text.trim())return;if(p.some((i)=>i.id===b.id))return;let f=p.find((i)=>{return w.includes(i.id)&&!h.has(i.id)&&i.text.trim()===b.text.trim()});if(f?.role!==b.role||f.text.trim()!==b.text.trim())return;return f}function Ab(p,b,w){p.set(b,[...p.get(b)||[],w])}function Fp(p,b){return p.get(b)||[]}function L0(p,b,w){let h=p.get(b)||[];if(!h.length)return;p.delete(b),p.set(w,[...p.get(w)||[],...h])}function Vp(p,b,w,h,f){if(!f.length||!w.length)return;let i=f.filter((L)=>{return w.some((l)=>l.id===L)});if(i.length){p.set(b,i);return}p.delete(b)}function r(p){return J(p,p.activeSessionId,!0)}function J(p,b,w=!1){let h=p.sessions.find((f)=>f.id===b);if(!h)h=o(b||void 0),p.sessions.unshift(h),y(p);if(w||!p.activeSessionId)p.activeSessionId=h.id,y(p);return h}function jb(p,b,w,h){if(b===w)return;let f=p.sessions.find((O)=>O.id===b),i=f?.messages.findIndex((O)=>O.id===h)??-1;if(!f||i<0)return;let[L]=f.messages.splice(i,1),l=J(p,w);if(!l.messages.some((O)=>O.id===L.id))l.messages.push(L);f.updatedAt=Date.now(),l.updatedAt=Date.now(),Fb(p,f.id),y(p)}function Fb(p,b){let w=p.sessions.find((h)=>h.id===b);if(!w||w.id===p.activeSessionId||w.messages.length>0||w.title!=="New chat")return;p.sessions=p.sessions.filter((h)=>h.id!==w.id)}function o(p=D()){let b=Date.now();return{id:p,title:"New chat",createdAt:b,updatedAt:b,messages:[]}}function Vb(p){try{return localStorage.getItem(p)||""}catch{return""}}function l0(p){let b=o(p);return{activeSessionId:b.id,sessions:[b]}}function O0(){try{let p=JSON.parse(localStorage.getItem(S)||"null");if(p&&Array.isArray(p.sessions))return{activeSessionId:"",sessions:p.sessions.filter(Zb).map(Gb)}}catch{}return{activeSessionId:"",sessions:[]}}function T0(p=""){try{let b=JSON.parse(localStorage.getItem(S)||"null");if(b&&typeof b.activeSessionId==="string"&&Array.isArray(b.sessions)){let w=b.sessions.filter(Zb).map(Gb);if(p&&!w.some((h)=>h.id===p))w.unshift(o(p));return{activeSessionId:p||b.activeSessionId,sessions:w}}}catch{}return l0(p||void 0)}function y(p){Ip(p);try{localStorage.setItem(S,JSON.stringify(p))}catch{for(let b of p.sessions)b.messages=b.messages.slice(-Math.floor(k/2));Ip(p);try{localStorage.setItem(S,JSON.stringify(p))}catch{}}}function Zp(p){if(!p?.length)return;return p.map(({content:b,...w})=>w)}function Ip(p){p.sessions.sort((h,f)=>f.updatedAt-h.updatedAt);let b=p.sessions.find((h)=>h.id===p.activeSessionId),w=p.sessions.filter((h)=>h.id!==p.activeSessionId).slice(0,Math.max(0,Wp-1));p.sessions=b?[b,...w]:p.sessions.slice(0,Wp);for(let h of p.sessions)if(h.messages.length>k)h.messages.splice(0,h.messages.length-k)}function Zb(p){return z(p)&&typeof p.id==="string"&&Array.isArray(p.messages)}function Gb(p){return{...p,messages:Gp(p.messages)}}function Gp(p){return Array.isArray(p)?p.filter(y0).map($0):[]}function $0(p){let b={...p};if(Array.isArray(p.toolCalls))b.toolCalls=p.toolCalls.filter(Jb);else delete b.toolCalls;if(Array.isArray(p.blocks))b.blocks=p.blocks.filter(H0).map(_0);else delete b.blocks;return b}function _0(p){if(p.type!=="tool"){let{toolCall:b,...w}=p;return w}return p}function H0(p){if(!z(p)||typeof p.id!=="string"||typeof p.text!=="string")return!1;if(p.type==="text"||p.type==="thinking")return!0;return p.type==="tool"&&Jb(p.toolCall)}function Jb(p){if(!z(p)||typeof p.id!=="string"||typeof p.name!=="string")return!1;return typeof p.text==="string"&&R0(p.status)&&C0(p.argsStatus)}function C0(p){return p===void 0||p==="present"||p==="empty"||p==="unavailable"||p==="truncated"||p==="omitted"}function R0(p){return p==="running"||p==="ok"||p==="err"}function y0(p){if(!z(p)||typeof p.id!=="string"||typeof p.text!=="string")return!1;return typeof p.createdAt==="number"&&N0(p.role)}function N0(p){return p==="user"||p==="assistant"||p==="tool"||p==="system"}function z(p){return typeof p==="object"&&p!==null}function D(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`}function z0(p){return p instanceof Error&&(p.name==="AbortError"||/aborted|abort/i.test(p.message))}function Jp(p){return p instanceof Error?p.message:String(p)}export{u as toolArgsInlineText,s as toolArgsBodyText,D0 as submittedAttachmentsForText,U0 as shellAttachmentNoteVisible,Mb as setComposerMode,c as renderPromptMeta,Kb as renderMessages,Bb as promptFromAgUiLikeRunInput,Kp as pluginStyleText,t as pluginClass,J0 as mergeCommands,q0 as hasQueuedAttachmentNames,d as getActiveWorkspaceId,f1 as formatShellOutput,op as extractRefs,mb as default,Xp as createComposerSurface,Yp as createChatSurface,Qb as createChatDom,G0 as createChannels,Wb as createAgUiLikeRunInput,I as commandName,vb as chatEventsToAgUiLikeEvents,U as backendCall};
