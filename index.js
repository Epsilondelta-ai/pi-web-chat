var Q={attachFile:["M16.5 6v11.5a4 4 0 0 1-8 0V5a2.5 2.5 0 0 1 5 0v10.5a1 1 0 0 1-2 0V6H10v9.5","a2.5 2.5 0 0 0 5 0V5a4 4 0 0 0-8 0v12.5a5.5 5.5 0 0 0 11 0V6h-1.5Z"].join(""),stop:"M6 6h12v12H6V6Z",send:"M2 21 23 12 2 3v7l15 2-15 2v7Z",terminal:"M3 4h18v16H3V4Zm2 2v12h14V6H5Zm2 3 1.1-1.1L12.2 12l-4.1 4.1L7 15l3-3-3-3Zm6 6h5v1.5h-5V15Z",file:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 2.5L17.5 8H14V4.5ZM8 13h8v1.5H8V13Zm0 3h8v1.5H8V16Z"},v={attachFile:K("attach_file",Q.attachFile),stop:K("stop",Q.stop),send:K("send",Q.send),terminal:K("terminal",Q.terminal)};function K(b,p){return`<svg class="material-icon" data-material-icon="${b}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="${p}"></path></svg>`}function c(b){return b.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function t(){return"pi-web-chat-mounted"}function Yb(){let b=document.createElement("main");return b.className="main pi-web-chat-surface",b.dataset.main="session",b.dataset.pluginChatRoot="",b.innerHTML='<div class="term"><div class="term-inner" role="log" aria-live="polite" aria-relevant="additions text"></div></div><button type="button" class="scroll-bottom-btn" data-action="scroll-bottom" aria-label="stick to bottom" title="stick to bottom" aria-pressed="true" hidden>↓</button>',b}function Xb(){let b=document.createElement("section");return b.className="prompt-region pi-web-chat-composer",b.innerHTML=`
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
    <div class="prompt-meta" data-prompt-meta></div>`,g(b,{}),b}function g(b,p={},h=!1){let w=b.querySelector("[data-prompt-meta]");if(!w)return;let f=[Y1(p.model||"—",p.thinkingLevel)],i=Ub("5h",p.fiveHourQuota),L=Ub("Week",p.weeklyQuota),O=p.currentBranch||p.branch||"—";if(i)f.push(i);if(L)f.push(L);if(f.push(U1(O)),w.innerHTML=f.join(" | "),h)w.append(document.createTextNode(" | "),q1())}function q1(){let b=document.createElement("span");return b.className="prompt-meta-item pi-web-chat-badge",b.textContent="chat plugin",b}function U1(b){return`<span class="prompt-meta-item prompt-meta-branch">${Qb("git-branch")}<span>${c(b)}</span></span>`}function Y1(b,p){let h=c(b);return p?`${h} (${c(p)})`:h}function Ub(b,p){if(typeof p!=="number"||!Number.isFinite(p))return;let h=Math.max(0,Math.min(100,Math.round(p))),w=h>=70?"full":h>=30?"medium":"low";return`<span class="prompt-meta-item prompt-meta-battery prompt-meta-battery-${w}">${c(b)} ${Qb(`battery-${w}`)}(${h}%)</span>`}function Qb(b){return{"battery-full":'<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 10v4"></path><path d="M14 10v4"></path><path d="M22 14v-4"></path><path d="M6 10v4"></path><rect x="2" y="6" width="16" height="12" rx="2"></rect></svg>',"battery-medium":'<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 14v-4"></path><path d="M22 14v-4"></path><path d="M6 14v-4"></path><rect x="2" y="6" width="16" height="12" rx="2"></rect></svg>',"battery-low":'<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 14v-4"></path><path d="M6 14v-4"></path><rect x="2" y="6" width="16" height="12" rx="2"></rect></svg>',"git-branch":'<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6a9 9 0 0 0-9 9V3"></path><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle></svg>'}[b]||""}function X1(){let b=document.createElement("section");return b.className="pi-web-chat-root",b.dataset.plugin="pi-web-chat",b.innerHTML=`
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
    </section>`,{root:b,transcript:Z(b.querySelector("[data-chat-transcript]")),textarea:Z(b.querySelector("[data-chat-input]")),sendButton:Z(b.querySelector("[data-send]")),attachButton:Z(b.querySelector("[data-attach]")),fileInput:Z(b.querySelector("[data-file-input]")),slashPopover:Z(b.querySelector("[data-slash-popover]")),slashList:Z(b.querySelector("[data-slash-list]")),refsPopover:Z(b.querySelector("[data-refs-popover]")),refsList:Z(b.querySelector("[data-refs-list]")),attachments:Z(b.querySelector("[data-attachments]"))}}function Q1(b,p){b.replaceChildren(...p.map(K1)),b.scrollTop=b.scrollHeight}function K1(b){let p=document.createElement("article");p.className=`pi-web-chat-message pi-web-chat-message-${b.role}`,p.dataset.messageId=b.id;let h=document.createElement("div");h.className="pi-web-chat-message-role",h.textContent=b.role;let w=document.createElement("pre");if(w.className="pi-web-chat-message-body",w.textContent=b.text,p.append(h,w),b.thinking){let f=document.createElement("details");f.className="pi-web-chat-thinking",f.open=Boolean(b.streaming);let i=document.createElement("summary");i.textContent="thinking";let L=document.createElement("pre");L.textContent=b.thinking,f.append(i,L),p.append(f)}if(b.toolCalls?.length){let f=document.createElement("div");f.className="pi-web-chat-tools";for(let i of b.toolCalls){let L=document.createElement("details");L.className=`pi-web-chat-tool pi-web-chat-tool-${i.status}`,L.open=i.status==="running";let O=document.createElement("summary");O.textContent=`${i.name} · ${i.status}`;let l=document.createElement("pre");l.textContent=i.text||s(i),L.append(O,l),f.append(L)}p.append(f)}if(b.streaming){let f=document.createElement("div");f.className="pi-web-chat-message-meta",f.textContent="streaming...",p.append(f)}if(b.attachments?.length){let f=document.createElement("div");f.className="pi-web-chat-message-meta",f.textContent=`${b.attachments.length} attachment(s)`,p.append(f)}return p}function u(b){if(b.argsStatus==="truncated")return"arguments truncated";if(b.argsStatus==="omitted")return"arguments omitted";if(b.argsStatus==="unavailable")return"arguments unavailable";if(b.argsStatus==="empty")return"no arguments";if(!b.args)return"";return JSON.stringify(b.args)}function s(b){if(b.argsStatus==="truncated")return"arguments truncated: too large to display";if(b.argsStatus==="omitted")return"arguments omitted: response too large";if(b.argsStatus==="unavailable")return"arguments unavailable";if(b.argsStatus==="empty")return"no arguments";if(!b.args)return"arguments unavailable";return JSON.stringify(b.args,null,2)}function E1(b,p){b.root.dataset.composerMode=p,e(b.attachButton,p)}function e(b,p){if(b.disabled=p==="shell",b.setAttribute("aria-disabled",p==="shell"?"true":"false"),p==="shell"){b.innerHTML=v.terminal,b.title="shell command mode",b.setAttribute("aria-label","shell command mode");return}if(p==="file-ref"){b.innerHTML=K("file",Q.file),b.title="file reference mode",b.setAttribute("aria-label","file reference mode");return}b.innerHTML=v.attachFile,b.title="attach files",b.setAttribute("aria-label","attach files")}function bb(b,p){b.hidden=p.length===0,b.replaceChildren(...p.map((h)=>{let w=document.createElement("span");return w.className="pi-web-chat-attachment-chip",w.textContent=h,w}))}function Kb(){return`
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
  `}function Eb(){document.getElementById("pi-web-chat-style")?.remove();let b=document.createElement("style");return b.id="pi-web-chat-style",b.textContent=Kb(),document.head.append(b),b}function I(b){return b.command||b.cmd||(b.name?`/${b.name}`:"")}function Z(b){if(!b)throw Error("pi-web-chat DOM template is invalid");return b}function M1(b,p,h){return{threadId:b,runId:p,state:{},messages:h,tools:[],context:[]}}function W1(b){let p=[...b.messages].reverse().find((h)=>h.role==="user");return{text:p?.text||"",attachments:p?.attachments||[],sessionId:b.threadId}}function B1(b,p,h){return b.map((w)=>v1(w,p,h))}function v1(b,p,h){if(b.type==="text.delta")return{type:"TEXT_MESSAGE_CONTENT",threadId:p,runId:h,delta:b.delta||""};if(b.type==="thinking.delta")return{type:"THINKING_MESSAGE_CONTENT",threadId:p,runId:h,delta:b.delta||""};if(b.type==="tool.start")return{type:"TOOL_CALL_START",threadId:p,runId:h,toolCallId:b.toolCallId,payload:Mb(b)};if(b.type==="tool.delta")return{type:"TOOL_CALL_ARGS",threadId:p,runId:h,toolCallId:b.toolCallId,delta:b.delta||""};if(b.type==="tool.end")return{type:"TOOL_CALL_END",threadId:p,runId:h,toolCallId:b.toolCallId,payload:Mb(b)};return{type:b.type.toUpperCase().replaceAll(".","_"),threadId:p,runId:h,payload:b}}function Mb(b){return{name:b.toolName||"tool",args:b.args||{},result:b.result||"",isError:b.isError===!0}}var S="pi-web-chat.sessions.v1";var Sb="plugin.pi-web-sidebar.selectedSession",mb="plugin.pi-web-sidebar.event",db="plugin.pi-web-sidebar.activeSessionId",_b="plugin.pi-web-sidebar.activeWorkspaceId",P1=12,Wb=20,P=200,$b=200,r1=8,k1=1e6,x1=64000;var c1=250,nb=6,g1=150,W=new Set,Bb=new WeakMap,u1={"book-open":'<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',"file-plus":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="M9 15h6"/>',pencil:'<path d="M21.2 6.8 17.2 2.8a2 2 0 0 0-2.8 0L3 14.2V21h6.8L21.2 9.6a2 2 0 0 0 0-2.8z"/><path d="m14 5 5 5"/>',terminal:'<path d="m4 17 6-6-6-6"/><path d="M12 19h8"/>',cpu:'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 15h3"/><path d="M1 9h3"/><path d="M1 15h3"/>',globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 0 20"/><path d="M12 2a15.3 15.3 0 0 0 0 20"/>',search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',braces:'<path d="M8 3H7a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-4a2 2 0 0 1 2-2 2 2 0 0 1-2-2V7a2 2 0 0 0-2-2h-1"/>',"file-text":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',"circle-question-mark":'<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 1 1 5.8 1c-.5 1-1.4 1.5-2.1 2-.6.4-.8.8-.8 2"/><path d="M12 17h.01"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',plug:'<path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a6 6 0 0 1-12 0V8Z"/>',"git-branch":'<line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',"circle-check":'<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',hammer:'<path d="m15 12-8.5 8.5a2.1 2.1 0 0 1-3-3L12 9"/><path d="m17.6 5.4 1.8-1.8"/><path d="m14 7 3 3"/><path d="M5 11 2 8l6-6 3 3"/>',package:'<path d="m7.5 4.3 9 5.2"/><path d="M21 8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>'},ib=new WeakMap,I1={read:"book-open",write:"file-plus",edit:"pencil",ctx_execute:"cpu",ctx_batch_execute:"cpu",ctx_execute_file:"cpu",ctx_search:"cpu",ctx_index:"cpu",ctx_fetch_and_index:"cpu",web_search:"globe",fetch_content:"search",get_search_content:"search",code_search:"braces",document_parse:"file-text",ask_user_question:"circle-question-mark",teams:"users",subagent:"users",mcp:"plug",git:"git-branch"};class ab{#b=[];add(b){if(b)this.#b.push(b);return b}listen(b,p,h){b.addEventListener(p,h),this.add({remove:()=>b.removeEventListener(p,h)})}dispose(){for(let b of this.#b.splice(0).reverse())if(typeof b==="function")b();else if("unsubscribe"in b)b.unsubscribe();else b.remove()}}function S1(b={}){let p=b.app;if(p?.piWebChat?.dispose(),typeof b.mount?.chat!=="function"||typeof b.mount?.composer!=="function")throw Error("pi-web-chat requires modern pi-web mount.chat and mount.composer APIs");return m1(b,p)}function m1(b,p){let h=new ab,w=h.add(Eb()),f=Yb(),i=Xb(),L=b.mount?.chat(f,{replace:!0}),O=b.mount?.composer(i,{replace:!0});if(M0(h,f),u0(h,f),L)h.add(L);if(O)h.add(O);let l=E(b);M(b,l||void 0);let T=l?.sessionId?Lp(l.sessionId):ip(),_={backendChatToken:0,pendingPromptEchoIds:new Map};if(!l?.sessionId)a(f);else N(f,k(T).messages,T.activeSessionId),n(b,f,T,_,l.sessionId);q0(h,b,f,T,_),n1(h,b,i,f,T,_),d1(h,p,i),p?.classList.add(t());let $=()=>{if(_.runEventsAbort?.abort(),_.sessionEventsAbort?.abort(),h.dispose(),W.clear(),w.remove(),p?.classList.remove(t()),p?.piWebChat===C)delete p.piWebChat},C={dispose:$};if(p)p.piWebChat=C;return $}function d1(b,p,h){if(g(h,p?.runtimeStatus||{}),!p)return;let w=p.updatePromptMeta,f=(i={})=>{p.runtimeStatus={...p.runtimeStatus,...i,currentBranch:i.currentBranch||i.branch||p.runtimeStatus?.currentBranch},w?.call(p,i),g(h,p.runtimeStatus||i)};p.updatePromptMeta=f,b.add({remove:()=>{if(p.updatePromptMeta===f)p.updatePromptMeta=w}}),p.updatePromptMeta(p.runtimeStatus||{}),p.loadRuntimeStatus?.(p.dataset.activeWorkspaceId)}function n1(b,p,h,w,f,i){let L=h.querySelector(".prompt-textarea"),O=h.querySelector(".send-btn"),l=h.querySelector(".attach-btn"),T=h.querySelector("[data-file-input]"),_=h.querySelector(".attach-chips"),$=h.querySelector(".shell-attachment-note");if(!L||!O)return;let C=h.querySelector(".prompt-bar"),z=h.querySelector(".slash-pop"),q=h.querySelector(".prompt-file-ref-pop"),H={selectedAttachments:[],shellMode:!1,commands:[]},F=()=>{a1(_,L.value,H)},Y=()=>{o1(C,L,l,$,H)},V=()=>{let A=L.value,R=Boolean(i.startingRunSessionId||i.fallbackSubmittingSessionId);if(O.disabled=R,O.setAttribute("aria-disabled",A.trim()&&!R?"false":"true"),F(),vb(H),H.shellMode){pb(z,q);return}w0(p,h,L,A,H.commands,(X)=>{H.commands=X}),H.fileSearchTimer=setTimeout(()=>{f0(p,h,L,L.value)},120)},x=()=>{H.shellMode=!0,pb(z,q),Y(),F()},Db=()=>{H.shellMode=!1,Y(),F()},qb=async(A)=>{A?.preventDefault(),A?.stopImmediatePropagation();let R=L.value.trim();if(V(),i.resolvingSubmit||i.startingRunSessionId||i.fallbackSubmittingSessionId)return;if(!R){L.value="",V();return}if(i.resolvingSubmit=!0,L.value="",T)T.value="";V();try{if(H.shellMode)kb(R,[]),await e1(p,w,f,R),Db();else{let X=[...H.selectedAttachments,...await b0(p,R)];H.selectedAttachments=[],F(),kb(R,X);let D1=_0(p,w,f,i,R,X);i.resolvingSubmit=!1,await D1}}catch(X){if(!Rp(X))N(w,[t1(X)],f.activeSessionId)}finally{i.resolvingSubmit=!1,Y(),V()}};if(b.listen(L,"input",()=>{if(!H.shellMode&&L.value.startsWith("! "))L.value=L.value.slice(2),x();V()}),b.listen(L,"keydown",(A)=>{let R=A;if(R.key===" "&&!H.shellMode&&L.value==="!"&&L.selectionStart===1&&L.selectionEnd===1){R.preventDefault(),L.value="",x(),V();return}if(R.key==="Backspace"&&H.shellMode&&L.value===""){R.preventDefault(),Db(),V();return}if(R.key==="Escape"){pb(z,q);return}if(R.key==="Enter"&&(R.metaKey||R.ctrlKey))qb(R)}),b.listen(O,"click",(A)=>{qb(A)}),l&&T)b.listen(l,"click",()=>{if(!H.shellMode)T.click()}),b.listen(T,"change",()=>{s1(T,(A)=>{H.selectedAttachments=A,F()})});b.add({remove:()=>vb(H)}),Y()}function a1(b,p,h){if(!b)return;if(h.shellMode){bb(b,[]);return}bb(b,[...h.selectedAttachments.map((w)=>w.name||"attachment"),...ob(p)])}function o1(b,p,h,w,f){if(b?.classList.toggle("shell-mode",f.shellMode),p.setAttribute("placeholder",f.shellMode?"run shell command in workspace…":"ask pi to do something…"),w)w.hidden=!(f.shellMode&&f.selectedAttachments.length>0);if(h)e(h,f.shellMode?"shell":"normal")}function vb(b){if(b.fileSearchTimer)clearTimeout(b.fileSearchTimer),b.fileSearchTimer=void 0}function pb(b,p){b?.setAttribute("hidden",""),p?.setAttribute("hidden","")}function t1(b){return{id:D(),role:"system",text:`prompt failed: ${Jb(b)}`,createdAt:Date.now()}}async function s1(b,p){let h=Array.from(b.files||[]).slice(0,r1),w=[];for(let f of h){if(f.size>k1)continue;w.push({name:f.name,size:f.size,content:await f.text(),mimeType:f.type||void 0})}p(w)}async function e1(b,p,h,w){let f=O1(b,h),i=G(h,f),L={id:D(),role:"user",text:`! ${w}`,createdAt:Date.now()},O={id:D(),role:"tool",text:`$ ${w}
(running...)`,createdAt:Date.now()};i.messages.push(L,O),i.updatedAt=Date.now(),y(h),N(p,i.messages,f);try{let l=await U(b,"runShell",{command:w}),T=typeof l.exitCode==="number"?l.exitCode:1,_=typeof l.durationMs==="number"?l.durationMs:0,$=typeof l.output==="string"?l.output:"";O.text=p0(w,$,T,_,Boolean(l.truncated))}catch(l){O.text=`$ ${w}
${Jb(l)}`}i.updatedAt=Date.now(),y(h),N(p,i.messages,f)}async function b0(b,p){let h=ob(p);if(!h.length)return[];let w=await U(b,"resolveContext",{text:p,refs:h});return Array.isArray(w.attachments)?w.attachments.filter(J):[]}function p0(b,p,h,w,f){let i=h0(p,x1),L=f||i.truncated,O=i.text.endsWith(`
`)||!i.text?"":`
`;return`$ ${b}
${i.text}${O}[exit ${h} · ${w}ms${L?" · truncated":""}]`}function h0(b,p){let h=new TextEncoder,w=h.encode(b);if(w.byteLength<=p)return{text:b,truncated:!1};let f=new TextDecoder().decode(w.slice(0,p));while(f&&h.encode(f).byteLength>p)f=f.slice(0,-1);return{text:f,truncated:!0}}async function w0(b,p,h,w,f,i){let L=p.querySelector(".slash-pop"),O=p.querySelector(".slash-list"),l=bp(w);if(l===null||!O){L?.setAttribute("hidden","");return}let T=f;if(!T.length){let $=await U(b,"commands",{});T=Array.isArray($.commands)?$.commands.filter(J):[],i(T)}if(h.value!==w)return;let _=T.filter(($)=>{return I($).slice(1).toLowerCase().includes(l)});i0(O,_,h,L),L?.toggleAttribute("hidden",_.length===0)}async function f0(b,p,h,w){let f=p.querySelector(".prompt-file-ref-pop"),i=p.querySelector(".prompt-file-ref-list"),L=pp(w);if(L===null||!i){f?.setAttribute("hidden","");return}try{let O=await U(b,"searchFiles",{query:L,limit:P1}),l=Array.isArray(O.files)?O.files.filter(J):[];if(h.value!==w)return;L0(i,h,l,f),f?.toggleAttribute("hidden",l.length===0)}catch{f?.setAttribute("hidden","")}}function i0(b,p,h,w){b.replaceChildren(...p.map((f)=>{let i=document.createElement("button"),L=I(f);return i.type="button",i.className="slash-item",i.dataset.slash=L,i.innerHTML='<span class="sl-name"></span><span class="sl-desc"></span>',i.querySelector(".sl-name").textContent=L,i.querySelector(".sl-desc").textContent=f.description||"",i.addEventListener("click",()=>{h.value=f.template||`${L} `,w?.setAttribute("hidden",""),h.dispatchEvent(new(h.ownerDocument.defaultView?.Event||Event)("input",{bubbles:!0})),h.focus()}),i}))}function L0(b,p,h,w){b.replaceChildren(...h.map((f)=>{let i=f.path||f.name||"",L=document.createElement("button");return L.type="button",L.className="prompt-file-ref-item",L.dataset.path=i,L.disabled=!i,L.innerHTML='<span class="pfr-path"></span><span class="pfr-kind"></span>',L.querySelector(".pfr-path").textContent=i,L.querySelector(".pfr-kind").textContent=typeof f.size==="number"?`${f.size} bytes`:"file",L.addEventListener("click",()=>{O0(p,i),w?.setAttribute("hidden","")}),L}))}function O0(b,p){if(!p)return;let{value:h,selectionStart:w}=b,f=h.slice(0,w),i=/(?:^|\s)@([^\s@`]*)$/.exec(f),L=i?w-(i[1]||"").length-1:w,O=`@${p} `;b.value=`${h.slice(0,L)}${O}${h.slice(w)}`;let l=L+O.length;b.setSelectionRange(l,l),b.dispatchEvent(new(b.ownerDocument.defaultView?.Event||Event)("input",{bubbles:!0})),b.focus()}function Fp(b){return{input$:b.behaviorSubject("chat.input",""),submitted$:b.subject("chat.input.submitted"),activeSessionId$:b.behaviorSubject("session.activeId",null),sidebarSelectedSession$:b.behaviorSubject(Sb,l0()),toastRequested$:b.subject("toast.requested")}}function ob(b){let p=[],h=new Set,w=/(^|[\s`])@([^\s@`]+)/g,f=w.exec(String(b||""));while(f!==null){let i=f[2]||"";if((f[1]||"")!=="`"&&i&&!h.has(i))h.add(i),p.push(i);f=w.exec(String(b||""))}return p}function Vp(b=[],p=[]){let h=[],w=new Set;for(let f of[...b,...p]){let i=I(f);if(!i||w.has(i))continue;w.add(i),h.push(f)}return h}function d(b){return b.app?.piWebSidebar?.getSnapshot?.().activeWorkspaceId||b.app?.dataset.activeWorkspaceId||""}function l0(){return E({})}function E(b){let p=b.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),h=p?.activeSessionId||"",w=p?.activeWorkspaceId||"";if(h&&b.app?.dataset.clearedSessionId!==h)return{sessionId:h,workspaceId:w||void 0};return null}function M(b,p){if(p?.workspaceId&&b.app)b.app.dataset.activeWorkspaceId=p.workspaceId,Pb(_b,p.workspaceId);if(p?.sessionId)delete b.app?.dataset.clearedSessionId,b.app?.setAttribute("data-active-session-id",p.sessionId),Pb(db,p.sessionId)}function tb(b){let p=E(b);if(p?.sessionId&&b.app)b.app.dataset.clearedSessionId=p.sessionId;b.app?.removeAttribute("data-active-session-id"),T0(db),globalThis.piWeb?.behaviorSubject("session.activeId",null).next(null)}function r(b,p,h={}){let w=b.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),f={type:p,detail:h,snapshot:w};(b.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$)?.next(f),globalThis.piWeb?.subject(mb).next(f)}function Hb(b,p,h){let w=b.app?.dataset.activeWorkspaceId||d(b),f={reason:h,sessionId:p,workspaceId:w};globalThis.piWeb?.behaviorSubject("session.activeId",p).next(p),r(b,"active.start",f),r(b,"session.created",f)}function Cb(b,p){globalThis.piWeb?.subject("session.changed").next({sessionId:b,name:p,title:p})}function Rb(b){if(b.title!=="New chat")return"";let h=b.messages.find((w)=>w.role==="user")?.text.slice(0,48)||"";if(!h)return"";return b.title=h,h}function Pb(b,p){try{localStorage.setItem(b,p)}catch{}}function T0(b){try{localStorage.removeItem(b)}catch{}}async function U(b,p,h={},w=d(b)){if(!b.backend)return{};let f=await b.backend(p,{workspaceId:w,data:h});return J(f)?f:{}}function Lb(b){let p=Array.isArray(b.warnings)?b.warnings.filter((h)=>typeof h==="string"&&h.trim().length>0):[];for(let h of p)globalThis.piWeb?.subject("toast.requested").next({level:"warning",message:h})}function Zp(b,p){return b.trim().startsWith("!")?[]:[...p]}async function _0(b,p,h,w,f,i){let L=O1(b,h),O=j(b);if(w.activeRunId&&w.activeRunSessionId===L){await $0(b,p,h,w,f,i,O.path,O.id);return}if(w.startingRunSessionId===L||w.fallbackSubmittingSessionId===L)return;w.backendChatToken+=1,w.startingRunSessionId=L,w.runEventsAbort?.abort();let l=new AbortController;w.runEventsAbort=l,w.sessionEventsAbort?.abort();let T={id:D(),role:"user",text:f,attachments:Zb(i),createdAt:Date.now()},_=G(h,L);A1(w.pendingPromptEchoIds,L,T.id),_.messages.push(T),_.updatedAt=Date.now(),y(h),N(p,_.messages,L);let $;try{$=await N0(b,f,i,L,O.path,O.id)}catch(H){throw w.startingRunSessionId=void 0,H}if(l.signal.aborted){w.startingRunSessionId=void 0,Ob(h,L,T.id);return}if(Lb($),typeof $.activeSessionId==="string"&&$.activeSessionId){let H=L,F=h.activeSessionId===H;if(L=$.activeSessionId,F)B(h,L),M(b,{sessionId:$.activeSessionId,workspaceId:O.id||void 0}),r(b,"chat-session",{reason:"startPrompt",sessionId:$.activeSessionId}),Hb(b,$.activeSessionId,"startPrompt");else G(h,L);j1(h,H,L,T.id),wp(w.pendingPromptEchoIds,H,L)}if(typeof $.runId!=="string"||!$.runId){w.startingRunSessionId=void 0,w.fallbackSubmittingSessionId=L;let H;try{H=await z0(b,f,i,L,O.path,O.id)}catch(x){throw w.fallbackSubmittingSessionId=void 0,x}if(l.signal.aborted){w.fallbackSubmittingSessionId=void 0,Ob(h,L,T.id);return}Lb(H);let F=typeof H.activeSessionId==="string"&&H.activeSessionId?H.activeSessionId:L,Y=Fb(w.pendingPromptEchoIds,L),V=D0(b,h,H,"submitPrompt",L,Y);if(Vb(w.pendingPromptEchoIds,F,V,H.messages,Y),h.activeSessionId===L||h.activeSessionId===F)N(p,V,h.activeSessionId);if(w.runEventsAbort===l)w.runEventsAbort=void 0;w.startingRunSessionId=void 0,w.fallbackSubmittingSessionId=void 0;return}let C=G(h,L);w.activeRunId=$.runId,w.activeRunSessionId=L,w.startingRunSessionId=void 0;let z=Rb(C);if(z)y(h),Cb(L,z);let q=j0(C);try{await H0(b,h,C,$.runId,O.path,O.id,q,()=>{if(!l.signal.aborted&&h.activeSessionId===L)N(p,C.messages,L)},l.signal)}finally{if(w.activeRunId===$.runId)w.activeRunId=void 0,w.activeRunSessionId=void 0,w.startingRunSessionId=void 0,w.fallbackSubmittingSessionId=void 0;if(w.runEventsAbort===l)w.runEventsAbort=void 0}if(!l.signal.aborted&&h.activeSessionId===L)n(b,p,h,w,L,O.path,O.id)}async function $0(b,p,h,w,f,i,L,O){let{activeRunId:l,activeRunSessionId:T}=w;if(!l||!T)throw Error("active run is unavailable for steering");let _={id:D(),role:"user",text:f,attachments:Zb(i),createdAt:Date.now()},$=G(h,T);if(A1(w.pendingPromptEchoIds,T,_.id),$.messages.push(_),$.updatedAt=Date.now(),y(h),h.activeSessionId===T)N(p,$.messages,T);try{let C=await A0(b,l,f,i,T,L,O);Lb(C)}catch(C){if(Ob(h,T,_.id),h1(C)){N(p,$.messages,T),globalThis.piWeb?.subject("toast.requested").next({level:"error",message:"This backend does not support steering while a response is streaming."});return}throw C}}function Ob(b,p,h){let w=b.sessions.find((f)=>f.id===p);if(!w)return;w.messages=w.messages.filter((f)=>f.id!==h),F1(b,w.id),y(b)}async function H0(b,p,h,w,f,i,L,O,l){let T=await eb(b,"streamEventsSse",{runId:w,cursor:0,workspacePath:f},l,i);if(!T)throw Error("SSE streaming backend did not return a stream");let _=sb(O);L.streaming=!0,_.flush();try{await b1(T,($)=>{F0(L,[$]),L.streaming=$.type!=="run.end",h.updatedAt=Date.now(),y(p),_.request()})}finally{L.streaming=!1,y(p),_.flush()}}function sb(b){let p=0,h,w=()=>{if(h)clearTimeout(h),h=void 0},f=()=>{w(),p=Date.now(),b()};return{request:()=>{let L=c1-(Date.now()-p);if(L<=0){f();return}h||=setTimeout(f,L)},flush:f,cancel:w}}async function eb(b,p,h={},w,f=d(b)){if(!b.backendStream)throw Error("SSE streaming backend is unavailable");let i=await b.backendStream(p,{workspaceId:f,data:h},{signal:w});return C0(i)}function C0(b){if(typeof ReadableStream<"u"&&b instanceof ReadableStream)return b;if(typeof Response<"u"&&b instanceof Response)return b.body;if(typeof b==="string")return rb(b);if(!J(b))return null;let p=b.body;if(typeof ReadableStream<"u"&&p instanceof ReadableStream)return p;let h=b.sse;if(typeof h==="string")return rb(h);return null}function rb(b){let p=new TextEncoder().encode(b);return new ReadableStream({start(h){h.enqueue(p),h.close()}})}async function b1(b,p){let h=b.getReader(),w=new TextDecoder,f="";while(!0){let i=await h.read();if(i.done){f+=w.decode(),y0(f,p);return}f+=w.decode(i.value,{stream:!0});let L=R0(f);f=L.remainder;for(let O of L.frames)p1(O,p)}}function R0(b){let h=b.replaceAll(`\r
`,`
`).replaceAll("\r",`
`).split(`

`),w=h.pop()||"";return{frames:h,remainder:w}}function y0(b,p){let h=b.trim();if(h)p1(h,p)}function p1(b,p){let h=b.split(`
`).filter((w)=>w.startsWith("data:")).map((w)=>w.slice(5).trimStart()).join(`
`);if(!h)return;try{let w=JSON.parse(h);if(G0(w))p(w)}catch{}}function kb(b,p){globalThis.piWeb?.subject("chat.input.submitted").next({text:b,attachments:Zb(p)||[]})}async function N0(b,p,h,w,f=j(b).path,i=j(b).id){try{return await U(b,"startPrompt",yb(p,h,w,f),i)}catch(L){if(h1(L))return{};throw L}}function h1(b){return/unknown method: (startPrompt|streamEventsSse|steerPrompt)|unsupported method: (startPrompt|streamEventsSse|steerPrompt)|(startPrompt|streamEventsSse|steerPrompt) unsupported/i.test(Jb(b))}async function z0(b,p,h,w="",f=j(b).path,i=j(b).id){return await U(b,"submitPrompt",yb(p,h,w,f),i)}async function A0(b,p,h,w,f="",i=j(b).path,L=j(b).id){let O={...yb(h,w,f,i),runId:p};return U(b,"steerPrompt",O,L)}function yb(b,p,h,w){let f={text:b,attachments:p,sessionId:h};if(w)f.workspacePath=w;return f}function j0(b){let p=[...b.messages].reverse().find((w)=>w.role==="assistant"&&w.streaming);if(p)return p;let h={id:D(),role:"assistant",text:"",createdAt:Date.now(),streaming:!0};return b.messages.push(h),h}function F0(b,p){for(let h of p)if(h.type==="text.delta"&&typeof h.delta==="string")hb(b,"text",h.delta),b.text+=h.delta;else if(h.type==="thinking.delta"&&typeof h.delta==="string")hb(b,"thinking",h.delta),b.thinking=`${b.thinking||""}${h.delta}`;else if(h.type==="tool.start")wb(b,h,"running");else if(h.type==="tool.delta"&&typeof h.delta==="string"){let w=wb(b,h,"running");w.text=h.delta}else if(h.type==="tool.end"){let w=wb(b,h,h.isError?"err":"ok");if(typeof h.result==="string"&&h.result)w.text=h.result}else if(h.type==="error"&&typeof h.message==="string")hb(b,"text",`${b.text?`
`:""}${h.message}`),b.text+=`${b.text?`
`:""}${h.message}`}function hb(b,p,h){b.blocks||=[];let w=b.blocks[b.blocks.length-1];if(w?.type===p){w.text+=h;return}if(b.blocks.length<$b)b.blocks.push({id:D(),type:p,text:h})}function wb(b,p,h){let w=p.toolCallId||p.toolName||"tool";b.toolCalls||=[];let f=b.toolCalls.find((i)=>i.id===w);if(!f)f={id:w,name:p.toolName||"tool",args:p.args,text:"",status:h},b.toolCalls.push(f),V0(b,f);if(f.status=h,Z0(f,p))f.args=p.args,f.argsStatus=p.argsStatus;return f}function V0(b,p){if(b.blocks||=[],b.blocks.some((h)=>h.type==="tool"&&h.toolCall?.id===p.id))return;if(b.blocks.length<$b)b.blocks.push({id:D(),type:"tool",text:"",toolCall:p})}function Z0(b,p){if(!p.argsStatus)return Boolean(p.args);if(p.argsStatus==="unavailable")return!b.argsStatus;return!0}function G0(b){return J(b)&&typeof b.type==="string"}async function n(b,p,h,w,f="",i=Nb(b),L=j(b).id){if(!b.backendStream){await xb(b,p,h,w,f,i);return}let O=++w.backendChatToken;w.sessionEventsAbort?.abort();let l=new AbortController;w.sessionEventsAbort=l;let T=sb(()=>{N(p,k(h).messages,h.activeSessionId)});try{let _=await eb(b,"sessionEventsSse",w1(b,f,i),l.signal,L);if(!_)throw Error("session SSE backend did not return a stream");await b1(_,($)=>{if(O!==w.backendChatToken||$.type!=="chat.state")return;let C=J0($),z=typeof C.activeSessionId==="string"?C.activeSessionId:f,q=Fb(w.pendingPromptEchoIds,z),H=i1(b,h,C,"chatState",q);if(Vb(w.pendingPromptEchoIds,z,H,C.messages,q),H.length)T.request()})}catch(_){if(!l.signal.aborted)await xb(b,p,h,w,f,i)}finally{if(T.cancel(),w.sessionEventsAbort===l)w.sessionEventsAbort=void 0}}async function xb(b,p,h,w,f="",i=Nb(b)){let L=++w.backendChatToken;try{let O=await U(b,"chatState",w1(b,f,i));if(L!==w.backendChatToken)return;let l=typeof O.activeSessionId==="string"?O.activeSessionId:f,T=Fb(w.pendingPromptEchoIds,l),_=i1(b,h,O,"chatState",T);if(Vb(w.pendingPromptEchoIds,l,_,O.messages,T),_.length)N(p,_,h.activeSessionId)}catch{}}function w1(b,p,h=Nb(b)){let w=p?{sessionId:p}:{};if(h)w.workspacePath=h;return w}function J0(b){return{activeSessionId:b.activeSessionId,messages:b.messages,isStreaming:b.isStreaming}}function Nb(b){return j(b).path}function j(b){let p=b.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),h=p?.activeWorkspaceId||b.app?.dataset.activeWorkspaceId||"",w=p?.workspaces?.find((f)=>f.id===h)?.path||"";return{id:h,path:w}}function f1(b,p){let h=b.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),w=p.workspaceId||h?.activeWorkspaceId||b.app?.dataset.activeWorkspaceId||"",f=h?.workspaces?.find((i)=>i.id===w)?.path||"";if(f||w!==h?.activeWorkspaceId)return{id:w,path:f};return j(b)}function i1(b,p,h,w,f=""){let i=Gb(h.messages);if(typeof h.activeSessionId==="string"&&h.activeSessionId){let T=p.activeSessionId;if(B(p,h.activeSessionId),M(b,{sessionId:h.activeSessionId,workspaceId:b.app?.dataset.activeWorkspaceId||d(b)||void 0}),w!=="chatState"||T!==h.activeSessionId)r(b,"chat-session",{reason:w,sessionId:h.activeSessionId});if(w!=="chatState")Hb(b,h.activeSessionId,w)}let L=k(p);if(!i.length)return[];let O=z1(L.messages,i,f).slice(-P);if(!L1(L.messages,O))return[];L.messages=O;let l=Rb(L);if(L.updatedAt=Date.now(),y(p),l)Cb(L.id,l);return L.messages}function L1(b,p){if(b.length!==p.length)return!0;return b.some((h,w)=>lb(h)!==lb(p[w]))}function lb(b){return JSON.stringify({id:b.id,role:b.role,text:b.text,blocks:b.blocks,thinking:b.thinking,streaming:b.streaming,toolCalls:b.toolCalls,attachments:b.attachments})}function D0(b,p,h,w,f,i=""){let L=Gb(h.messages),O=typeof h.activeSessionId==="string"&&h.activeSessionId?h.activeSessionId:f,l=p.activeSessionId===f;if(O!==f)if(l)B(p,O),M(b,{sessionId:O,workspaceId:j(b).id||void 0}),r(b,"chat-session",{reason:w,sessionId:O}),Hb(b,O,w);else G(p,O);let T=Array.isArray(i)?i:[i].filter(Boolean);if(O!==f)for(let z of T)j1(p,f,O,z);let _=G(p,O);if(!L.length)return[];let $=z1(_.messages,L,i).slice(-P);if(!L1(_.messages,$))return[];_.messages=$;let C=Rb(_);if(_.updatedAt=Date.now(),y(p),C)Cb(_.id,C);return _.messages}function q0(b,p,h,w,f){let i=(T,_)=>{if(!T?.sessionId){if(!_)cb(p,h,w,f,!0);return}if(l1(p,w,T))return;M(p,T),B(w,T.sessionId),N(h,k(w).messages,w.activeSessionId);let $=f1(p,T);n(p,h,w,f,T.sessionId,$.path,$.id)},L=(T)=>{if(U0(p,h,w,f,T))return;let _=X0(p,T);if(_)i(_,!1)},O=p.app?.piWebSidebar?.channels?.selectedSession$||globalThis.piWebSidebar?.channels?.selectedSession$,l=p.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$;if(O){let T=!0;b.add(O.subscribe((_)=>{i(_,T),T=!1}))}if(l)b.add(l.subscribe(L));if(p.app)b.listen(p.app,"pi-web-sidebar:session-created",(T)=>{let _=T.detail||{},$=typeof _.sessionId==="string"?_.sessionId:"",C=typeof _.workspaceId==="string"?_.workspaceId:"";if($)i({sessionId:$,workspaceId:C||void 0},!1)});if(globalThis.piWeb){let T=!0;b.add(globalThis.piWeb.behaviorSubject(Sb,E(p)).subscribe(($)=>{i($,T),T=!1})),b.add(globalThis.piWeb.subject(mb).subscribe(L));let _=!0;b.add(globalThis.piWeb.behaviorSubject("session.activeId",null).subscribe(($)=>{if(!$){if(!_)cb(p,h,w,f,!1);_=!1;return}_=!1,i({sessionId:$,workspaceId:p.app?.dataset.activeWorkspaceId||V1(_b)||void 0},!1)}))}}function cb(b,p,h,w,f){if(w.backendChatToken+=1,w.runEventsAbort?.abort(),w.sessionEventsAbort?.abort(),h.activeSessionId="",y(h),f)tb(b);else{let i=E(b);if(i?.sessionId&&b.app)b.app.dataset.clearedSessionId=i.sessionId}a(p)}function O1(b,p){let h=E(b);if(h?.sessionId&&!l1(b,p,h))M(b,h),B(p,h.sessionId);if(!p.activeSessionId)return G(p,"",!0).id;return p.activeSessionId}function l1(b,p,h){let w=h.workspaceId||"",f=b.app?.dataset.activeWorkspaceId||V1(_b)||"";return p.activeSessionId===h.sessionId&&(!w||w===f)}function U0(b,p,h,w,f){if(f.type!=="session.deleted")return!1;let i=T1(f);if(!i)return!0;let L=h.activeSessionId===i,O=h.sessions.length;if(h.sessions=h.sessions.filter((l)=>l.id!==i),L){w.runEventsAbort?.abort(),w.sessionEventsAbort?.abort();let l=Y0(b,f,i);if(l?.sessionId){M(b,l),B(h,l.sessionId),K0(p,k(h).messages,h.activeSessionId);let T=f1(b,l);return n(b,p,h,w,l.sessionId,T.path,T.id),!0}return h.activeSessionId="",tb(b),y(h),a(p),!0}if(h.sessions.length!==O)y(h);return!0}function Y0(b,p,h){let w=p.snapshot?.activeSessionId||"",f=p.snapshot?.activeWorkspaceId||"";if(w&&w!==h)return{sessionId:w,workspaceId:f||void 0};let i=E(b);if(i?.sessionId&&i.sessionId!==h)return i;return null}function X0(b,p){if(!Q0(p.type))return null;let h=p.detail||{},w=T1(p)||p.snapshot?.activeSessionId||"",f=typeof h.workspaceId==="string"?h.workspaceId:p.snapshot?.activeWorkspaceId||b.app?.dataset.activeWorkspaceId||"";if(!w)return null;return{sessionId:w,workspaceId:f||void 0}}function T1(b){let p=b.detail||{};if(typeof p.sessionId==="string")return p.sessionId;if(typeof p.id==="string")return p.id;return""}function Q0(b){return b==="session.selected"||b==="session.created"||b==="new-session"||b==="active.start"}function B(b,p){let h=b.sessions.find((w)=>w.id===p);if(!h)h=o(p),b.sessions.unshift(h);return b.activeSessionId=h.id,y(b),h}function N(b,p,h){if(C1(p,h),!p.length){a(b);return}let w=b.querySelector(".term-inner")||b;_1(w,p,h),zb(b)}function K0(b,p,h){C1(p,h);let w=b.querySelector(".term-inner")||b;_1(w,p,h),zb(b)}function _1(b,p,h){let w=E0(b),f=p.map((O)=>{let l=`${h}:${lb(O)}`,T=w.get(O.id);if(T&&Bb.get(T)===l)return T;let _=W0(O,h);return Bb.set(_,l),_}),i=new Set(f),L=b.firstChild;for(let O of f){if(L!==O)b.insertBefore(O,L);L=O.nextSibling}for(let O of Array.from(b.children)){if(Tb(b,O)&&!i.has(O)){O.remove();continue}if(!Tb(b,O))O.remove()}}function E0(b){let p=new Map;for(let h of Array.from(b.children)){if(!Tb(b,h))continue;let w=h.dataset.messageId||"";if(w)p.set(w,h)}return p}function Tb(b,p){let h=b.ownerDocument.defaultView;return Boolean(h&&p instanceof h.HTMLElement&&p.classList.contains("transcript-item"))}function a(b){let p=b.querySelector(".term-inner")||b,h=document.createElement("article");h.className="pi-web-chat-docs",h.setAttribute("aria-label","pi-web-chat guide");let w=document.createElement("h1");w.textContent="pi-web-chat guide";let f=document.createElement("p");f.textContent=["Select or create a session in the sidebar to load chat history,","or type below to start a new session."].join(" ");let i=document.createElement("ul");for(let L of["Ask pi in the prompt box and press Cmd/Ctrl+Enter to send.","Type ! then Space at the start to turn the prompt yellow and run shell commands in the workspace.","Queued file attachments hide during shell mode and reappear for the next normal prompt.","Type @ to list project files, then pick one to tag it as prompt context.","Type / at the start to open the slash command list.","Chats are cached locally after you start or select a session."]){let O=document.createElement("li");O.textContent=L,i.append(O)}h.append(w,f,i),p.replaceChildren(h),zb(b)}function M0(b,p){let h=p.querySelector(".term"),w=p.querySelector("[data-action='scroll-bottom']");if(!h||!w)return;let f={term:h,button:w,pinned:!0,touchStartY:null};ib.set(p,f),w.hidden=!1,m(f),b.listen(w,"click",()=>{f.pinned=!0,$1(f),m(f)}),b.listen(h,"wheel",(i)=>{if(i.deltaY<0)gb(f)}),b.listen(h,"touchstart",(i)=>{let L=i;f.touchStartY=L.touches.item(0)?.clientY??null}),b.listen(h,"touchmove",(i)=>{let O=i.touches.item(0)?.clientY;if(typeof O==="number"&&f.touchStartY!==null&&O-f.touchStartY>8)gb(f)}),b.listen(h,"touchend",()=>{f.touchStartY=null}),b.add({remove:()=>{ib.delete(p)}})}function zb(b){let p=ib.get(b);if(!p)return;if(p.pinned)$1(p);m(p)}function $1(b){b.term.scrollTop=b.term.scrollHeight}function gb(b){b.pinned=!1,m(b)}function m(b){b.button.dataset.pinned=b.pinned?"true":"false",b.button.setAttribute("aria-pressed",b.pinned?"true":"false")}function W0(b,p){let h=document.createElement("article");if(h.className="transcript-item",h.dataset.messageId=b.id,B0(b)){let w=v0(b);if(w)Ab(h,b.role,b.text);k0(h,b,p,w)}else x0(h,b,p);if(b.streaming)h.dataset.streaming="true";return h}function B0(b){return Boolean(b.blocks?.some((p)=>{return p.type==="tool"||p.text.trim().length>0}))}function v0(b){return Boolean(b.text.trim())&&(!P0(b)||r0(b))}function P0(b){return Boolean(b.blocks?.some((p)=>{return p.type==="text"&&p.text.trim().length>0}))}function r0(b){return(b.blocks?.length||0)>=$b}function k0(b,p,h,w=!1){for(let f of p.blocks||[])if(f.type==="text"){if(!w)Ab(b,p.role,f.text)}else if(f.type==="thinking")b.append(H1(f.text,Boolean(p.streaming)));else if(f.type==="tool"&&f.toolCall){let i=p.toolCalls?.find((L)=>L.id===f.toolCall?.id)||f.toolCall;b.append(R1(i,jb(h,p,i)))}}function x0(b,p,h){if(c0(p))Ab(b,p.role,p.text);if(p.thinking)b.append(H1(p.thinking,Boolean(p.streaming)));for(let w of p.toolCalls||[])b.append(R1(w,jb(h,p,w)))}function Ab(b,p,h){if(p==="assistant"&&!h.trim())return;let w=document.createElement("div");w.className="msg",w.dataset.kind=fb(p);let f=document.createElement("span");f.className=`prefix ${fb(p)}`,f.textContent=e0(p);let i=document.createElement("pre");i.className=`body ${fb(p)}`,i.textContent=h,w.append(f,i),b.append(w)}function c0(b){let p=b.text.trim().length>0;return b.role!=="assistant"||p}function H1(b,p){let h=document.createElement("details");h.className="msg-detail think thinking-block",h.open=p;let w=document.createElement("summary");w.className="label",w.textContent="THINKING";let f=document.createElement("pre");return f.className="body",f.textContent=b,h.append(w,f),h}function C1(b,p){let h=new Set;for(let w of b)for(let f of w.toolCalls||[])h.add(jb(p,w,f));for(let w of W)if(!h.has(w))W.delete(w)}function jb(b,p,h){return`${b}:${p.id}:${h.id}`}function R1(b,p){let h=document.createElement("div");h.className="tool-card",h.dataset.tool=b.name||"tool",h.dataset.status=b.status;let w=!W.has(p);h.dataset.collapsed=w?"true":"false";let f=document.createElement("button");if(f.type="button",f.className="tc-head",f.title=w?"Show tool output":"Hide tool output",f.setAttribute("aria-expanded",w?"false":"true"),f.setAttribute("aria-label",y1(b,w)),f.append(m0(b),d0(b),n0(b),a0(b,w)),!w)h.append(N1(b));return f.addEventListener("click",()=>S0(h,f,b,p)),h.prepend(f),h}function y1(b,p){let h=p?"Show":"Hide",w=b.status==="running"?"running":b.status==="err"?"failed":"done",f=g0(b),i=f?`, ${f}`:"";return`${h} ${b.name||"tool"} output, ${w}${i}`}function g0(b){if(b.argsStatus==="present")return"arguments present";if(b.argsStatus)return u(b);return b.args?"arguments present":""}function N1(b){let p=document.createElement("pre");return p.className="tc-body",p.textContent=b.text||s(b),p}function u0(b,p){let h=0,w,f=p.ownerDocument.defaultView,i=typeof f?.matchMedia==="function"?f.matchMedia("(prefers-reduced-motion: reduce)"):void 0,L=()=>{if(w)clearInterval(w),w=void 0},O=()=>{h=(h+1)%nb;for(let _ of p.querySelectorAll(".spinner"))_.dataset.frame=String(h)},l=()=>{let _=p.querySelectorAll(".spinner");if(i?.matches||_.length===0){L(),h=0;for(let $ of _)$.dataset.frame="0";return}if(!w)w=setInterval(O,g1)},T=new(f?.MutationObserver||MutationObserver)(l);T.observe(p,{childList:!0,subtree:!0}),i?.addEventListener("change",l),l(),b.add({remove:()=>{T.disconnect(),i?.removeEventListener("change",l),L()}})}function I0(){let b=document.createElement("span");b.className="spinner",b.dataset.frame="0",b.setAttribute("aria-hidden","true");for(let p=0;p<nb;p+=1)b.append(document.createElement("span"));return b}function S0(b,p,h,w){let f=b.querySelector(".tc-body"),i=f!==null;if(f)f.remove(),W.delete(w);else b.append(N1(h)),W.add(w);b.dataset.collapsed=i?"true":"false",p.setAttribute("aria-expanded",i?"false":"true"),p.setAttribute("aria-label",y1(h,i)),p.title=i?"Show tool output":"Hide tool output";let L=p.querySelector(".tc-toggle-label");if(L)L.textContent=i?"show":"hide"}function m0(b){let p=document.createElement("span");p.className="tc-glyph";let h=o0(b),w=h?u1[h]:"";if(!h||!w)return p.textContent="●",p;return p.innerHTML=`<svg class="tc-icon" data-tool-icon="${h}" aria-hidden="true" viewBox="0 0 24 24">${w}</svg>`,p}function d0(b){let p=document.createElement("span");return p.className="tc-name",p.textContent=b.name||"tool",p}function n0(b){let p=document.createElement("span");return p.className="tc-args",p.textContent=u(b),p}function a0(b,p){let h=document.createElement("span");if(h.className="tc-meta",b.status==="running"){let i=I0(),L=document.createElement("span");return L.className="running",L.textContent="running",h.append(i,L,ub(p)),h}let w=document.createElement("span");w.className=b.status==="err"?"err":"ok",w.textContent=b.status==="err"?"✗":"✓";let f=document.createElement("span");return f.textContent=b.status==="err"?" · failed":" · done",h.append(w,f,ub(p)),h}function ub(b){let p=document.createElement("span");p.className="tc-toggle";let h=document.createElement("span");h.className="tc-toggle-label",h.textContent=b?"show":"hide";let w=document.createElement("span");return w.className="tc-caret",w.textContent="▸",p.append(h,w),p}function o0(b){let p=t0(b.name);if(["bash","shell","sh","zsh","terminal"].includes(p))return s0(u(b).toLowerCase())||"terminal";return I1[p]}function t0(b){return b.trim().replace(/^functions\./,"").replace(/^multi_tool_use\./,"")}function s0(b){if(/\bgit\b|\bgh\b/.test(b))return"git-branch";if(/\b(go test|bun test|npm test|pnpm test|yarn test|vitest|pytest|cargo test)\b/.test(b))return"circle-check";if(/\b(bun|npm|pnpm|yarn)\s+(run\s+)?build\b|\b(go build|cargo build)\b/.test(b))return"hammer";if(/\b(bun|npm|pnpm|yarn)\s+(add|install|i)\b|\bpip\s+install\b|\bgo\s+get\b/.test(b))return"package";return}function e0(b){if(b==="assistant")return"pi >";if(b==="user")return"you >";if(b==="system")return"sys >";return"tool >"}function fb(b){if(b==="assistant")return"pi";if(b==="system")return"sys";return b}function bp(b){let p=/^\/([^\s/]*)$/.exec(b);return p?p[1].toLowerCase():null}function pp(b){let p=/(?:^|\s)@([^\s@`]*)$/.exec(b);return p?p[1]:null}function Gp(b){return b.length>0}function Jp(b,p){return b.trim().startsWith("!")&&p}function z1(b,p,h=""){let w=Array.isArray(h)?h:[h].filter(Boolean),f=new Map,i=new Map,L=0;for(let l of b)f.set(l.id,l),i.set(l.id,L++);let O=new Set;for(let l of p){let T=hp(b,l,w,O);if(T){O.add(T.id),f.delete(T.id),f.set(l.id,l),i.set(l.id,i.get(T.id)??L++);continue}if(!i.has(l.id))i.set(l.id,L++);f.set(l.id,{...f.get(l.id),...l})}return[...f.values()].sort((l,T)=>{let _=l.createdAt-T.createdAt;if(_!==0)return _;return(i.get(l.id)??0)-(i.get(T.id)??0)})}function hp(b,p,h,w){if(!h.length||p.role!=="user"||!p.text.trim())return;if(b.some((i)=>i.id===p.id))return;let f=b.find((i)=>{return h.includes(i.id)&&!w.has(i.id)&&i.text.trim()===p.text.trim()});if(f?.role!==p.role||f.text.trim()!==p.text.trim())return;return f}function A1(b,p,h){b.set(p,[...b.get(p)||[],h])}function Fb(b,p){return b.get(p)||[]}function wp(b,p,h){let w=b.get(p)||[];if(!w.length)return;b.delete(p),b.set(h,[...b.get(h)||[],...w])}function Vb(b,p,h,w,f){if(!f.length||!h.length)return;let i=f.filter((L)=>{return h.some((O)=>O.id===L)});if(i.length){b.set(p,i);return}b.delete(p)}function k(b){return G(b,b.activeSessionId,!0)}function G(b,p,h=!1){let w=b.sessions.find((f)=>f.id===p);if(!w)w=o(p||void 0),b.sessions.unshift(w),y(b);if(h||!b.activeSessionId)b.activeSessionId=w.id,y(b);return w}function j1(b,p,h,w){if(p===h)return;let f=b.sessions.find((l)=>l.id===p),i=f?.messages.findIndex((l)=>l.id===w)??-1;if(!f||i<0)return;let[L]=f.messages.splice(i,1),O=G(b,h);if(!O.messages.some((l)=>l.id===L.id))O.messages.push(L);f.updatedAt=Date.now(),O.updatedAt=Date.now(),F1(b,f.id),y(b)}function F1(b,p){let h=b.sessions.find((w)=>w.id===p);if(!h||h.id===b.activeSessionId||h.messages.length>0||h.title!=="New chat")return;b.sessions=b.sessions.filter((w)=>w.id!==h.id)}function o(b=D()){let p=Date.now();return{id:b,title:"New chat",createdAt:p,updatedAt:p,messages:[]}}function V1(b){try{return localStorage.getItem(b)||""}catch{return""}}function fp(b){let p=o(b);return{activeSessionId:p.id,sessions:[p]}}function ip(){try{let b=JSON.parse(localStorage.getItem(S)||"null");if(b&&Array.isArray(b.sessions))return{activeSessionId:"",sessions:b.sessions.filter(Z1).map(G1)}}catch{}return{activeSessionId:"",sessions:[]}}function Lp(b=""){try{let p=JSON.parse(localStorage.getItem(S)||"null");if(p&&typeof p.activeSessionId==="string"&&Array.isArray(p.sessions)){let h=p.sessions.filter(Z1).map(G1);if(b&&!h.some((w)=>w.id===b))h.unshift(o(b));return{activeSessionId:b||p.activeSessionId,sessions:h}}}catch{}return fp(b||void 0)}function y(b){Ib(b);try{localStorage.setItem(S,JSON.stringify(b))}catch{for(let p of b.sessions)p.messages=p.messages.slice(-Math.floor(P/2));Ib(b);try{localStorage.setItem(S,JSON.stringify(b))}catch{}}}function Zb(b){if(!b?.length)return;return b.map(({content:p,...h})=>h)}function Ib(b){b.sessions.sort((w,f)=>f.updatedAt-w.updatedAt);let p=b.sessions.find((w)=>w.id===b.activeSessionId),h=b.sessions.filter((w)=>w.id!==b.activeSessionId).slice(0,Math.max(0,Wb-1));b.sessions=p?[p,...h]:b.sessions.slice(0,Wb);for(let w of b.sessions)if(w.messages.length>P)w.messages.splice(0,w.messages.length-P)}function Z1(b){return J(b)&&typeof b.id==="string"&&Array.isArray(b.messages)}function G1(b){return{...b,messages:Gb(b.messages)}}function Gb(b){return Array.isArray(b)?b.filter(Hp).map(Op):[]}function Op(b){let p={...b};if(Array.isArray(b.toolCalls))p.toolCalls=b.toolCalls.filter(J1);else delete p.toolCalls;if(Array.isArray(b.blocks))p.blocks=b.blocks.filter(Tp).map(lp);else delete p.blocks;return p}function lp(b){if(b.type!=="tool"){let{toolCall:p,...h}=b;return h}return b}function Tp(b){if(!J(b)||typeof b.id!=="string"||typeof b.text!=="string")return!1;if(b.type==="text"||b.type==="thinking")return!0;return b.type==="tool"&&J1(b.toolCall)}function J1(b){if(!J(b)||typeof b.id!=="string"||typeof b.name!=="string")return!1;return typeof b.text==="string"&&$p(b.status)&&_p(b.argsStatus)}function _p(b){return b===void 0||b==="present"||b==="empty"||b==="unavailable"||b==="truncated"||b==="omitted"}function $p(b){return b==="running"||b==="ok"||b==="err"}function Hp(b){if(!J(b)||typeof b.id!=="string"||typeof b.text!=="string")return!1;return typeof b.createdAt==="number"&&Cp(b.role)}function Cp(b){return b==="user"||b==="assistant"||b==="tool"||b==="system"}function J(b){return typeof b==="object"&&b!==null}function D(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`}function Rp(b){return b instanceof Error&&(b.name==="AbortError"||/aborted|abort/i.test(b.message))}function Jb(b){return b instanceof Error?b.message:String(b)}export{u as toolArgsInlineText,s as toolArgsBodyText,Zp as submittedAttachmentsForText,Jp as shellAttachmentNoteVisible,E1 as setComposerMode,g as renderPromptMeta,Q1 as renderMessages,W1 as promptFromAgUiLikeRunInput,Kb as pluginStyleText,t as pluginClass,Vp as mergeCommands,Gp as hasQueuedAttachmentNames,d as getActiveWorkspaceId,p0 as formatShellOutput,ob as extractRefs,S1 as default,Xb as createComposerSurface,Yb as createChatSurface,X1 as createChatDom,Fp as createChannels,M1 as createAgUiLikeRunInput,I as commandName,B1 as chatEventsToAgUiLikeEvents,U as backendCall};
