var K={attachFile:["M16.5 6v11.5a4 4 0 0 1-8 0V5a2.5 2.5 0 0 1 5 0v10.5a1 1 0 0 1-2 0V6H10v9.5","a2.5 2.5 0 0 0 5 0V5a4 4 0 0 0-8 0v12.5a5.5 5.5 0 0 0 11 0V6h-1.5Z"].join(""),stop:"M6 6h12v12H6V6Z",send:"M2 21 23 12 2 3v7l15 2-15 2v7Z",terminal:"M3 4h18v16H3V4Zm2 2v12h14V6H5Zm2 3 1.1-1.1L12.2 12l-4.1 4.1L7 15l3-3-3-3Zm6 6h5v1.5h-5V15Z",file:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 2.5L17.5 8H14V4.5ZM8 13h8v1.5H8V13Zm0 3h8v1.5H8V16Z"},B={attachFile:M("attach_file",K.attachFile),stop:M("stop",K.stop),send:M("send",K.send),terminal:M("terminal",K.terminal)};function Kp(p){return`<span class="spinner" data-frame="0" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span></span><span class="sr-only">${v(p)}</span>`}function M(p,b){return`<svg class="material-icon" data-material-icon="${p}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="${b}"></path></svg>`}function v(p){return p.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function hp(){return"pi-web-chat-mounted"}function Ep(){let p=document.createElement("main");return p.className="main pi-web-chat-surface",p.dataset.main="session",p.dataset.pluginChatRoot="",p.innerHTML='<div class="term"><div class="term-inner" role="log" aria-live="polite" aria-relevant="additions text"></div></div><button type="button" class="scroll-bottom-btn" data-action="scroll-bottom" aria-label="stick to bottom" title="stick to bottom" aria-pressed="true" hidden>↓</button>',p}function Wp(){let p=document.createElement("section");return p.className="prompt-region pi-web-chat-composer",p.innerHTML=`
    <div class="slash-pop" hidden><div class="slash-head">slash commands · type to filter</div><div class="slash-list"></div></div>
    <div class="prompt-file-ref-pop" hidden><div class="slash-head">project files · type to filter</div><div class="prompt-file-ref-list"></div></div>
    <div class="prompt-bar">
      <button class="attach-btn" type="button" aria-label="attach files" title="attach files">${B.attachFile}</button>
      <input type="file" multiple hidden data-file-input />
      <div class="prompt-input-col"><div class="attach-chips" hidden></div><div class="shell-attachment-note" aria-live="polite" hidden>queued attachments are hidden during shell mode and will reappear for the next normal prompt</div><textarea class="prompt-textarea" aria-label="Prompt" placeholder="ask pi to do something…" rows="1"></textarea></div>
      <div class="prompt-actions">
        <button class="stop-btn" type="button" aria-label="stop" title="stop" hidden>${B.stop}</button>
        <button class="mic-btn" type="button" data-action="toggle-speech-input" aria-label="start voice input" title="voice input" hidden>\uD83C\uDF99</button>
        <button class="send-btn" type="button" aria-label="send" title="send" aria-disabled="true">${B.send}</button>
      </div>
      <div class="drop-overlay" hidden><span>drop to attach</span></div>
    </div>
    <div class="prompt-meta" data-prompt-meta></div>`,I(p,{}),p}function I(p,b={},h=!1){let w=p.querySelector("[data-prompt-meta]");if(!w)return;let i=[kb(b.model||"—",b.thinkingLevel)],f=Mp("5h",b.fiveHourQuota),l=Mp("Week",b.weeklyQuota),L=b.currentBranch||b.branch||"—";if(b.warning)i.push(rb(b.warning));if(f)i.push(f);if(l)i.push(l);if(i.push(Pb(L)),w.innerHTML=i.join(" | "),h)w.append(document.createTextNode(" | "),vb())}function vb(){let p=document.createElement("span");return p.className="prompt-meta-item pi-web-chat-badge",p.textContent="chat plugin",p}function Pb(p){return`<span class="prompt-meta-item prompt-meta-branch">${Bp("git-branch")}<span>${v(p)}</span></span>`}function rb(p){return`<span class="prompt-meta-item prompt-meta-warning" title="${v(p)}">runtime warning</span>`}function kb(p,b){let h=v(p);return b?`${h} (${v(b)})`:h}function Mp(p,b){if(typeof b!=="number"||!Number.isFinite(b))return;let h=Math.max(0,Math.min(100,Math.round(b))),w=h>=70?"full":h>=30?"medium":"low";return`<span class="prompt-meta-item prompt-meta-battery prompt-meta-battery-${w}">${v(p)} ${Bp(`battery-${w}`)}(${h}%)</span>`}function Bp(p){return{"battery-full":'<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 10v4"></path><path d="M14 10v4"></path><path d="M22 14v-4"></path><path d="M6 10v4"></path><rect x="2" y="6" width="16" height="12" rx="2"></rect></svg>',"battery-medium":'<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 14v-4"></path><path d="M22 14v-4"></path><path d="M6 14v-4"></path><rect x="2" y="6" width="16" height="12" rx="2"></rect></svg>',"battery-low":'<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 14v-4"></path><path d="M6 14v-4"></path><rect x="2" y="6" width="16" height="12" rx="2"></rect></svg>',"git-branch":'<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6a9 9 0 0 0-9 9V3"></path><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle></svg>'}[p]||""}function cb(){let p=document.createElement("section");return p.className="pi-web-chat-root",p.dataset.plugin="pi-web-chat",p.innerHTML=`
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
        <button class="pi-web-chat-icon-btn" type="button" data-attach aria-label="attach files" title="attach files">${M("attach_file",K.attachFile)}</button>
        <input type="file" multiple hidden data-file-input />
        <textarea class="pi-web-chat-textarea" data-chat-input aria-label="Prompt" placeholder="ask pi to do something…" rows="1"></textarea>
        <button class="pi-web-chat-send" type="button" data-send aria-label="send" title="send" aria-disabled="true">${M("send",K.send)}</button>
      </div>
    </section>`,{root:p,transcript:D(p.querySelector("[data-chat-transcript]")),textarea:D(p.querySelector("[data-chat-input]")),sendButton:D(p.querySelector("[data-send]")),attachButton:D(p.querySelector("[data-attach]")),fileInput:D(p.querySelector("[data-file-input]")),slashPopover:D(p.querySelector("[data-slash-popover]")),slashList:D(p.querySelector("[data-slash-list]")),refsPopover:D(p.querySelector("[data-refs-popover]")),refsList:D(p.querySelector("[data-refs-list]")),attachments:D(p.querySelector("[data-attachments]"))}}function xb(p,b){p.replaceChildren(...b.map(gb)),p.scrollTop=p.scrollHeight}function gb(p){let b=document.createElement("article");b.className=`pi-web-chat-message pi-web-chat-message-${p.role}`,b.dataset.messageId=p.id;let h=document.createElement("div");h.className="pi-web-chat-message-role",h.textContent=p.role;let w=document.createElement("pre");if(w.className="pi-web-chat-message-body",w.textContent=p.text,b.append(h,w),p.thinking){let i=document.createElement("details");i.className="pi-web-chat-thinking",i.open=Boolean(p.streaming);let f=document.createElement("summary");f.textContent="thinking";let l=document.createElement("pre");l.textContent=p.thinking,i.append(f,l),b.append(i)}if(p.toolCalls?.length){let i=document.createElement("div");i.className="pi-web-chat-tools";for(let f of p.toolCalls){let l=document.createElement("details");l.className=`pi-web-chat-tool pi-web-chat-tool-${f.status}`,l.open=f.status==="running";let L=document.createElement("summary");L.textContent=`${f.name} · ${f.status}`;let O=document.createElement("pre");O.textContent=f.text||wp(f),l.append(L,O),i.append(l)}b.append(i)}if(p.streaming){let i=document.createElement("div");i.className="pi-web-chat-message-meta",i.textContent="streaming...",b.append(i)}if(p.attachments?.length){let i=document.createElement("div");i.className="pi-web-chat-message-meta",i.textContent=`${p.attachments.length} attachment(s)`,b.append(i)}return b}function m(p){if(p.argsStatus==="truncated")return"arguments truncated";if(p.argsStatus==="omitted")return"arguments omitted";if(p.argsStatus==="unavailable")return"arguments unavailable";if(p.argsStatus==="empty")return"no arguments";if(!p.args)return"";return JSON.stringify(p.args)}function wp(p){if(p.argsStatus==="truncated")return"arguments truncated: too large to display";if(p.argsStatus==="omitted")return"arguments omitted: response too large";if(p.argsStatus==="unavailable")return"arguments unavailable";if(p.argsStatus==="empty")return"no arguments";if(!p.args)return"arguments unavailable";return JSON.stringify(p.args,null,2)}function ub(p,b){p.root.dataset.composerMode=b,ip(p.attachButton,b)}function vp(p,b,h){if(p.disabled=b==="steering"||b==="loading"&&!h,p.dataset.mode=b,p.setAttribute("aria-disabled",h?"false":"true"),b==="loading"){let w=h?"send steering message":"loading";p.innerHTML=Kp(w),p.title=w,p.setAttribute("aria-label",w);return}if(b==="steering"){p.innerHTML=Kp("steering"),p.title="steering message pending",p.setAttribute("aria-label","steering message pending");return}p.innerHTML=B.send,p.title="send",p.setAttribute("aria-label","send")}function ip(p,b){if(p.disabled=b==="shell",p.setAttribute("aria-disabled",b==="shell"?"true":"false"),b==="shell"){p.innerHTML=B.terminal,p.title="shell command mode",p.setAttribute("aria-label","shell command mode");return}if(b==="file-ref"){p.innerHTML=M("file",K.file),p.title="file reference mode",p.setAttribute("aria-label","file reference mode");return}p.innerHTML=B.attachFile,p.title="attach files",p.setAttribute("aria-label","attach files")}function fp(p,b){p.hidden=b.length===0,p.replaceChildren(...b.map((h)=>{let w=document.createElement("span");return w.className="pi-web-chat-attachment-chip",w.textContent=h,w}))}function Pp(){return`
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

    .pi-web-chat-composer .send-btn[data-mode="loading"] {
      cursor: pointer;
      opacity: 1;
    }

    .pi-web-chat-composer .send-btn[data-mode="steering"] {
      background: var(--warning, #facc15);
      color: #2a1500;
      cursor: progress;
      opacity: 1;
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

    .pi-web-chat-composer .sr-only,
    .pi-web-chat-surface .sr-only {
      border: 0;
      clip: rect(0 0 0 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      white-space: nowrap;
      width: 1px;
    }

    .pi-web-chat-composer .spinner,
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

    .pi-web-chat-composer .spinner span,
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

    .pi-web-chat-composer .spinner span::before,
    .pi-web-chat-surface .spinner span::before { content: "."; }
    .pi-web-chat-composer .spinner span:nth-child(1), .pi-web-chat-surface .spinner span:nth-child(1) { grid-column: 1; grid-row: 1; }
    .pi-web-chat-composer .spinner span:nth-child(2), .pi-web-chat-surface .spinner span:nth-child(2) { grid-column: 2; grid-row: 1; }
    .pi-web-chat-composer .spinner span:nth-child(3), .pi-web-chat-surface .spinner span:nth-child(3) { grid-column: 2; grid-row: 2; }
    .pi-web-chat-composer .spinner span:nth-child(4), .pi-web-chat-surface .spinner span:nth-child(4) { grid-column: 2; grid-row: 3; }
    .pi-web-chat-composer .spinner span:nth-child(5), .pi-web-chat-surface .spinner span:nth-child(5) { grid-column: 1; grid-row: 3; }
    .pi-web-chat-composer .spinner span:nth-child(6), .pi-web-chat-surface .spinner span:nth-child(6) { grid-column: 1; grid-row: 2; }
    .pi-web-chat-composer .spinner[data-frame="0"] span:nth-child(1),
    .pi-web-chat-composer .spinner[data-frame="1"] span:nth-child(2),
    .pi-web-chat-composer .spinner[data-frame="2"] span:nth-child(3),
    .pi-web-chat-composer .spinner[data-frame="3"] span:nth-child(4),
    .pi-web-chat-composer .spinner[data-frame="4"] span:nth-child(5),
    .pi-web-chat-composer .spinner[data-frame="5"] span:nth-child(6),
    .pi-web-chat-surface .spinner[data-frame="0"] span:nth-child(1),
    .pi-web-chat-surface .spinner[data-frame="1"] span:nth-child(2),
    .pi-web-chat-surface .spinner[data-frame="2"] span:nth-child(3),
    .pi-web-chat-surface .spinner[data-frame="3"] span:nth-child(4),
    .pi-web-chat-surface .spinner[data-frame="4"] span:nth-child(5),
    .pi-web-chat-surface .spinner[data-frame="5"] span:nth-child(6) {
      color: currentColor;
      opacity: 1;
    }

    .pi-web-chat-composer .spinner[data-frame="0"] span:nth-child(6),
    .pi-web-chat-composer .spinner[data-frame="1"] span:nth-child(1),
    .pi-web-chat-composer .spinner[data-frame="2"] span:nth-child(2),
    .pi-web-chat-composer .spinner[data-frame="3"] span:nth-child(3),
    .pi-web-chat-composer .spinner[data-frame="4"] span:nth-child(4),
    .pi-web-chat-composer .spinner[data-frame="5"] span:nth-child(5),
    .pi-web-chat-surface .spinner[data-frame="0"] span:nth-child(6),
    .pi-web-chat-surface .spinner[data-frame="1"] span:nth-child(1),
    .pi-web-chat-surface .spinner[data-frame="2"] span:nth-child(2),
    .pi-web-chat-surface .spinner[data-frame="3"] span:nth-child(3),
    .pi-web-chat-surface .spinner[data-frame="4"] span:nth-child(4),
    .pi-web-chat-surface .spinner[data-frame="5"] span:nth-child(5) {
      color: currentColor;
      opacity: 0.68;
    }

    .pi-web-chat-composer .spinner[data-frame="0"] span:nth-child(5),
    .pi-web-chat-composer .spinner[data-frame="1"] span:nth-child(6),
    .pi-web-chat-composer .spinner[data-frame="2"] span:nth-child(1),
    .pi-web-chat-composer .spinner[data-frame="3"] span:nth-child(2),
    .pi-web-chat-composer .spinner[data-frame="4"] span:nth-child(3),
    .pi-web-chat-composer .spinner[data-frame="5"] span:nth-child(4),
    .pi-web-chat-surface .spinner[data-frame="0"] span:nth-child(5),
    .pi-web-chat-surface .spinner[data-frame="1"] span:nth-child(6),
    .pi-web-chat-surface .spinner[data-frame="2"] span:nth-child(1),
    .pi-web-chat-surface .spinner[data-frame="3"] span:nth-child(2),
    .pi-web-chat-surface .spinner[data-frame="4"] span:nth-child(3),
    .pi-web-chat-surface .spinner[data-frame="5"] span:nth-child(4) {
      color: currentColor;
      opacity: 0.42;
    }

    .pi-web-chat-composer .spinner[data-frame="0"] span:nth-child(4),
    .pi-web-chat-composer .spinner[data-frame="1"] span:nth-child(5),
    .pi-web-chat-composer .spinner[data-frame="2"] span:nth-child(6),
    .pi-web-chat-composer .spinner[data-frame="3"] span:nth-child(1),
    .pi-web-chat-composer .spinner[data-frame="4"] span:nth-child(2),
    .pi-web-chat-composer .spinner[data-frame="5"] span:nth-child(3),
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
      .pi-web-chat-composer .spinner[data-frame] span:nth-child(1), .pi-web-chat-surface .spinner[data-frame] span:nth-child(1) { color: currentColor; opacity: 1; }
      .pi-web-chat-composer .spinner[data-frame] span:nth-child(2), .pi-web-chat-surface .spinner[data-frame] span:nth-child(2) { color: currentColor; opacity: 0.68; }
      .pi-web-chat-composer .spinner[data-frame] span:nth-child(3), .pi-web-chat-surface .spinner[data-frame] span:nth-child(3) { color: currentColor; opacity: 0.42; }
      .pi-web-chat-composer .spinner[data-frame] span:nth-child(4), .pi-web-chat-surface .spinner[data-frame] span:nth-child(4) { color: currentColor; opacity: 0.24; }
      .pi-web-chat-composer .spinner[data-frame] span:nth-child(5), .pi-web-chat-surface .spinner[data-frame] span:nth-child(5) { color: #000; opacity: 1; }
      .pi-web-chat-composer .spinner[data-frame] span:nth-child(6), .pi-web-chat-surface .spinner[data-frame] span:nth-child(6) { color: #000; opacity: 1; }
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
  `}function rp(){document.getElementById("pi-web-chat-style")?.remove();let p=document.createElement("style");return p.id="pi-web-chat-style",p.textContent=Pp(),document.head.append(p),p}function a(p){return p.command||p.cmd||(p.name?`/${p.name}`:"")}function D(p){if(!p)throw Error("pi-web-chat DOM template is invalid");return p}function Ib(p,b,h){return{threadId:p,runId:b,state:{},messages:h,tools:[],context:[]}}function mb(p){let b=[...p.messages].reverse().find((h)=>h.role==="user");return{text:b?.text||"",attachments:b?.attachments||[],sessionId:p.threadId}}function ab(p,b,h){return p.map((w)=>Sb(w,b,h))}function Sb(p,b,h){if(p.type==="text.delta")return{type:"TEXT_MESSAGE_CONTENT",threadId:b,runId:h,delta:p.delta||""};if(p.type==="thinking.delta")return{type:"THINKING_MESSAGE_CONTENT",threadId:b,runId:h,delta:p.delta||""};if(p.type==="tool.start")return{type:"TOOL_CALL_START",threadId:b,runId:h,toolCallId:p.toolCallId,payload:kp(p)};if(p.type==="tool.delta")return{type:"TOOL_CALL_ARGS",threadId:b,runId:h,toolCallId:p.toolCallId,delta:p.delta||""};if(p.type==="tool.end")return{type:"TOOL_CALL_END",threadId:b,runId:h,toolCallId:p.toolCallId,payload:kp(p)};return{type:p.type.toUpperCase().replaceAll(".","_"),threadId:b,runId:h,payload:p}}function kp(p){return{name:p.toolName||"tool",args:p.args||{},result:p.result||"",isError:p.isError===!0}}var S="pi-web-chat.sessions.v1";var sp="plugin.pi-web-sidebar.selectedSession",ep="plugin.pi-web-sidebar.event",pb="plugin.pi-web-sidebar.activeSessionId",yp="plugin.pi-web-sidebar.activeWorkspaceId",db=12,cp=20,c=200,zp=200,nb=8,ob=1e6,tb=64000;var sb=250,bb=6,eb=150,p1=100,P=new Set,xp=new WeakMap,b1={"book-open":'<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',"file-plus":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="M9 15h6"/>',pencil:'<path d="M21.2 6.8 17.2 2.8a2 2 0 0 0-2.8 0L3 14.2V21h6.8L21.2 9.6a2 2 0 0 0 0-2.8z"/><path d="m14 5 5 5"/>',terminal:'<path d="m4 17 6-6-6-6"/><path d="M12 19h8"/>',cpu:'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 15h3"/><path d="M1 9h3"/><path d="M1 15h3"/>',globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 0 20"/><path d="M12 2a15.3 15.3 0 0 0 0 20"/>',search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',braces:'<path d="M8 3H7a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-4a2 2 0 0 1 2-2 2 2 0 0 1-2-2V7a2 2 0 0 0-2-2h-1"/>',"file-text":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',"circle-question-mark":'<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 1 1 5.8 1c-.5 1-1.4 1.5-2.1 2-.6.4-.8.8-.8 2"/><path d="M12 17h.01"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',plug:'<path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a6 6 0 0 1-12 0V8Z"/>',"git-branch":'<line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',"circle-check":'<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',hammer:'<path d="m15 12-8.5 8.5a2.1 2.1 0 0 1-3-3L12 9"/><path d="m17.6 5.4 1.8-1.8"/><path d="m14 7 3 3"/><path d="M5 11 2 8l6-6 3 3"/>',package:'<path d="m7.5 4.3 9 5.2"/><path d="M21 8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>'},Hp=new WeakMap,h1={read:"book-open",write:"file-plus",edit:"pencil",ctx_execute:"cpu",ctx_batch_execute:"cpu",ctx_execute_file:"cpu",ctx_search:"cpu",ctx_index:"cpu",ctx_fetch_and_index:"cpu",web_search:"globe",fetch_content:"search",get_search_content:"search",code_search:"braces",document_parse:"file-text",ask_user_question:"circle-question-mark",teams:"users",subagent:"users",mcp:"plug",git:"git-branch"};class hb{#p=[];add(p){if(p)this.#p.push(p);return p}listen(p,b,h){p.addEventListener(b,h),this.add({remove:()=>p.removeEventListener(b,h)})}dispose(){for(let p of this.#p.splice(0).reverse())if(typeof p==="function")p();else if("unsubscribe"in p)p.unsubscribe();else p.remove()}}function w1(p={}){let b=p.app;if(b?.piWebChat?.dispose(),typeof p.mount?.chat!=="function"||typeof p.mount?.composer!=="function")throw Error("pi-web-chat requires modern pi-web mount.chat and mount.composer APIs");return i1(p,b)}function i1(p,b){let h=new hb,w=h.add(rp()),i=Ep(),f=Wp(),l=p.mount?.chat(i,{replace:!0}),L=p.mount?.composer(f,{replace:!0});if(t1(h,i),np(h,i),np(h,f),l)h.add(l);if(L)h.add(L);let O=E(p);W(p,O||void 0);let T=O?.sessionId?Gh(O.sessionId):Jh(),H={backendChatToken:0,pendingPromptEchoIds:new Map};if(!O?.sessionId)s(i);else Z(i,g(T).messages,T.activeSessionId),t(p,i,T,H,O.sessionId);I1(h,p,i,T,H),O1(h,p,f,i,T,H),f1(p,f),b?.classList.add(hp());let $=()=>{if(H.runEventsAbort?.abort(),H.sessionEventsAbort?.abort(),h.dispose(),P.clear(),w.remove(),b?.classList.remove(hp()),b?.piWebChat===_)delete b.piWebChat},_={dispose:$};if(b)b.piWebChat=_;return $}function f1(p,b){I(b,{}),l1(p,b)}async function l1(p,b){try{let h=await p.backend?.("runtimeStatus",{data:{}}),w=G(h)?h:{},i=G(w.status)?L1(w.status):void 0;if(!i)return;I(b,i)}catch{}}function L1(p){let b={};if(typeof p.model==="string")b.model=p.model;if(typeof p.modelProvider==="string")b.modelProvider=p.modelProvider;if(typeof p.thinkingLevel==="string")b.thinkingLevel=p.thinkingLevel;if(typeof p.fiveHourQuota==="number")b.fiveHourQuota=p.fiveHourQuota;if(typeof p.weeklyQuota==="number")b.weeklyQuota=p.weeklyQuota;if(typeof p.currentBranch==="string")b.currentBranch=p.currentBranch;if(typeof p.branch==="string")b.branch=p.branch;if(typeof p.warning==="string")b.warning=p.warning;return b}function O1(p,b,h,w,i,f){let l=h.querySelector(".prompt-textarea"),L=h.querySelector(".send-btn"),O=h.querySelector(".attach-btn"),T=h.querySelector(".stop-btn"),H=h.querySelector("[data-file-input]"),$=h.querySelector(".attach-chips"),_=h.querySelector(".shell-attachment-note");if(!l||!L)return;let z=h.querySelector(".prompt-bar"),F=h.querySelector(".slash-pop"),N=h.querySelector(".prompt-file-ref-pop"),R={selectedAttachments:[],shellMode:!1,commands:[]},J=()=>{_1($,l.value,R)},Q=()=>{R1(z,l,O,_,R)},A=()=>{let j=l.value,y=T1(f),X=Boolean(f.pendingSteering),bp=Boolean(f.activeRunId&&f.activeRunSessionId===i.activeSessionId),Qp=X?"steering":y?"loading":"idle",Bb=Boolean(j.trim())&&!X&&!f.resolvingSubmit&&(!y||bp);if(vp(L,Qp,Bb),z)z.dataset.runState=Qp;if(T){let k=Boolean(f.pendingSteering&&!f.pendingSteering.sent);T.hidden=!y&&!k,T.disabled=!1,T.title=k?"cancel steering":"stop response",T.setAttribute("aria-label",k?"cancel steering":"stop response")}if(J(),gp(R),R.shellMode){lp(F,N);return}V1(b,h,l,j,R.commands,(k)=>{R.commands=k}),R.fileSearchTimer=setTimeout(()=>{Z1(b,h,l,l.value)},120)},u=()=>{R.shellMode=!0,lp(F,N),Q(),J()},Yp=()=>{R.shellMode=!1,Q(),J()},Xp=async(j)=>{j?.preventDefault(),j?.stopImmediatePropagation();let y=l.value.trim();if(A(),f.resolvingSubmit||f.pendingSteering)return;if(f.startingRunSessionId||f.fallbackSubmittingSessionId)return;if(!y){l.value="",A();return}if(f.resolvingSubmit=!0,l.value="",H)H.value="";A();try{if(R.shellMode)mp(y,[]),await N1(b,w,i,y),Yp();else{let X=[...R.selectedAttachments,...await A1(b,y)];R.selectedAttachments=[],J(),mp(y,X);let bp=U1(b,w,i,f,y,X,A);f.resolvingSubmit=!1,A(),await bp}}catch(X){if(!Wb(X))Z(w,[y1(X)],i.activeSessionId)}finally{f.resolvingSubmit=!1,Q(),A()}};if(p.listen(l,"input",()=>{if(!R.shellMode&&l.value.startsWith("! "))l.value=l.value.slice(2),u();A()}),p.listen(l,"keydown",(j)=>{let y=j;if(y.key===" "&&!R.shellMode&&l.value==="!"&&l.selectionStart===1&&l.selectionEnd===1){y.preventDefault(),l.value="",u(),A();return}if(y.key==="Backspace"&&R.shellMode&&l.value===""){y.preventDefault(),Yp(),A();return}if(y.key==="Escape"){lp(F,N);return}if(y.key==="Enter"&&(y.metaKey||y.ctrlKey))Xp(y)}),p.listen(L,"click",(j)=>{Xp(j)}),T)p.listen(T,"click",(j)=>{j.preventDefault(),j.stopImmediatePropagation(),H1(b,w,i,f).finally(A),A()});if(O&&H)p.listen(O,"click",()=>{if(!R.shellMode)H.click()}),p.listen(H,"change",()=>{z1(H,(j)=>{R.selectedAttachments=j,J()})});f.onRunStateChange=A,p.add({remove:()=>{if(gp(R),f.onRunStateChange===A)f.onRunStateChange=void 0}}),Q(),A()}function T1(p){return Boolean(p.activeRunId||p.startingRunSessionId||p.fallbackSubmittingSessionId||p.pendingSteering)}async function H1(p,b,h,w){if(w.pendingSteering&&!w.pendingSteering.sent){let L=w.pendingSteering.sessionId;if($1(h,w),h.activeSessionId===L)Z(b,q(h,L).messages,L);return}let i=w.activeRunId,f=w.activeRunSessionId||w.startingRunSessionId||w.fallbackSubmittingSessionId||h.activeSessionId,l=w.activeRunWorkspaceId||V(p).id;if(!i){w.runEventsAbort?.abort(),w.startingRunSessionId=void 0,w.fallbackSubmittingSessionId=void 0;return}w.runEventsAbort?.abort();try{await Hb(p,i,f,l)}catch(L){globalThis.piWeb?.subject("toast.requested").next({level:"error",message:`stop failed: ${pp(L)}`})}finally{if(w.activeRunId===i)w.activeRunId=void 0,w.activeRunSessionId=void 0,w.activeRunWorkspacePath=void 0,w.activeRunWorkspaceId=void 0}}function $1(p,b){let h=b.pendingSteering;if(!h||h.sent)return;clearTimeout(h.timeout),h.controller.abort(),b.pendingSteering=void 0,d(p,h.sessionId,h.messageId)}function _1(p,b,h){if(!p)return;if(h.shellMode){fp(p,[]);return}fp(p,[...h.selectedAttachments.map((w)=>w.name||"attachment"),...wb(b)])}function R1(p,b,h,w,i){if(p?.classList.toggle("shell-mode",i.shellMode),b.setAttribute("placeholder",i.shellMode?"run shell command in workspace…":"ask pi to do something…"),w)w.hidden=!(i.shellMode&&i.selectedAttachments.length>0);if(h)ip(h,i.shellMode?"shell":"normal")}function gp(p){if(p.fileSearchTimer)clearTimeout(p.fileSearchTimer),p.fileSearchTimer=void 0}function lp(p,b){p?.setAttribute("hidden",""),b?.setAttribute("hidden","")}function y1(p){return{id:U(),role:"system",text:`prompt failed: ${pp(p)}`,createdAt:Date.now()}}async function z1(p,b){let h=Array.from(p.files||[]).slice(0,nb),w=[];for(let i of h){if(i.size>ob)continue;w.push({name:i.name,size:i.size,content:await i.text(),mimeType:i.type||void 0})}b(w)}async function N1(p,b,h,w){let i=Nb(p,h),f=q(h,i),l={id:U(),role:"user",text:`! ${w}`,createdAt:Date.now()},L={id:U(),role:"tool",text:`$ ${w}
(running...)`,createdAt:Date.now()};f.messages.push(l,L),f.updatedAt=Date.now(),C(h),Z(b,f.messages,i);try{let O=await Y(p,"runShell",{command:w}),T=typeof O.exitCode==="number"?O.exitCode:1,H=typeof O.durationMs==="number"?O.durationMs:0,$=typeof O.output==="string"?O.output:"";L.text=C1(w,$,T,H,Boolean(O.truncated))}catch(O){L.text=`$ ${w}
${pp(O)}`}f.updatedAt=Date.now(),C(h),Z(b,f.messages,i)}async function A1(p,b){let h=wb(b);if(!h.length)return[];let w=await Y(p,"resolveContext",{text:b,refs:h});return Array.isArray(w.attachments)?w.attachments.filter(G):[]}function C1(p,b,h,w,i){let f=j1(b,tb),l=i||f.truncated,L=f.text.endsWith(`
`)||!f.text?"":`
`;return`$ ${p}
${f.text}${L}[exit ${h} · ${w}ms${l?" · truncated":""}]`}function j1(p,b){let h=new TextEncoder,w=h.encode(p);if(w.byteLength<=b)return{text:p,truncated:!1};let i=new TextDecoder().decode(w.slice(0,b));while(i&&h.encode(i).byteLength>b)i=i.slice(0,-1);return{text:i,truncated:!0}}async function V1(p,b,h,w,i,f){let l=b.querySelector(".slash-pop"),L=b.querySelector(".slash-list"),O=Ah(w);if(O===null||!L){l?.setAttribute("hidden","");return}let T=i;if(!T.length){let $=await Y(p,"commands",{});T=Array.isArray($.commands)?$.commands.filter(G):[],f(T)}if(h.value!==w)return;let H=T.filter(($)=>{return a($).slice(1).toLowerCase().includes(O)});F1(L,H,h,l),l?.toggleAttribute("hidden",H.length===0)}async function Z1(p,b,h,w){let i=b.querySelector(".prompt-file-ref-pop"),f=b.querySelector(".prompt-file-ref-list"),l=Ch(w);if(l===null||!f){i?.setAttribute("hidden","");return}try{let L=await Y(p,"searchFiles",{query:l,limit:db}),O=Array.isArray(L.files)?L.files.filter(G):[];if(h.value!==w)return;J1(f,h,O,i),i?.toggleAttribute("hidden",O.length===0)}catch{i?.setAttribute("hidden","")}}function F1(p,b,h,w){p.replaceChildren(...b.map((i)=>{let f=document.createElement("button"),l=a(i);return f.type="button",f.className="slash-item",f.dataset.slash=l,f.innerHTML='<span class="sl-name"></span><span class="sl-desc"></span>',f.querySelector(".sl-name").textContent=l,f.querySelector(".sl-desc").textContent=i.description||"",f.addEventListener("click",()=>{h.value=i.template||`${l} `,w?.setAttribute("hidden",""),h.dispatchEvent(new(h.ownerDocument.defaultView?.Event||Event)("input",{bubbles:!0})),h.focus()}),f}))}function J1(p,b,h,w){p.replaceChildren(...h.map((i)=>{let f=i.path||i.name||"",l=document.createElement("button");return l.type="button",l.className="prompt-file-ref-item",l.dataset.path=f,l.disabled=!f,l.innerHTML='<span class="pfr-path"></span><span class="pfr-kind"></span>',l.querySelector(".pfr-path").textContent=f,l.querySelector(".pfr-kind").textContent=typeof i.size==="number"?`${i.size} bytes`:"file",l.addEventListener("click",()=>{G1(b,f),w?.setAttribute("hidden","")}),l}))}function G1(p,b){if(!b)return;let{value:h,selectionStart:w}=p,i=h.slice(0,w),f=/(?:^|\s)@([^\s@`]*)$/.exec(i),l=f?w-(f[1]||"").length-1:w,L=`@${b} `;p.value=`${h.slice(0,l)}${L}${h.slice(w)}`;let O=l+L.length;p.setSelectionRange(O,O),p.dispatchEvent(new(p.ownerDocument.defaultView?.Event||Event)("input",{bubbles:!0})),p.focus()}function Ph(p){return{input$:p.behaviorSubject("chat.input",""),submitted$:p.subject("chat.input.submitted"),activeSessionId$:p.behaviorSubject("session.activeId",null),sidebarSelectedSession$:p.behaviorSubject(sp,q1()),toastRequested$:p.subject("toast.requested")}}function wb(p){let b=[],h=new Set,w=/(^|[\s`])@([^\s@`]+)/g,i=w.exec(String(p||""));while(i!==null){let f=i[2]||"";if((i[1]||"")!=="`"&&f&&!h.has(f))h.add(f),b.push(f);i=w.exec(String(p||""))}return b}function rh(p=[],b=[]){let h=[],w=new Set;for(let i of[...p,...b]){let f=a(i);if(!f||w.has(f))continue;w.add(f),h.push(i)}return h}function o(p){return p.app?.piWebSidebar?.getSnapshot?.().activeWorkspaceId||p.app?.dataset.activeWorkspaceId||""}function q1(){return E({})}function E(p){let b=p.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),h=b?.activeSessionId||"",w=b?.activeWorkspaceId||"";if(h&&p.app?.dataset.clearedSessionId!==h)return{sessionId:h,workspaceId:w||void 0};return null}function W(p,b){if(b?.workspaceId&&p.app)p.app.dataset.activeWorkspaceId=b.workspaceId,up(yp,b.workspaceId);if(b?.sessionId)delete p.app?.dataset.clearedSessionId,p.app?.setAttribute("data-active-session-id",b.sessionId),up(pb,b.sessionId)}function ib(p){let b=E(p);if(b?.sessionId&&p.app)p.app.dataset.clearedSessionId=b.sessionId;p.app?.removeAttribute("data-active-session-id"),D1(pb),globalThis.piWeb?.behaviorSubject("session.activeId",null).next(null)}function x(p,b,h={}){let w=p.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),i={type:b,detail:h,snapshot:w};(p.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$)?.next(i),globalThis.piWeb?.subject(ep).next(i)}function Np(p,b,h){let w=p.app?.dataset.activeWorkspaceId||o(p),i={reason:h,sessionId:b,workspaceId:w};globalThis.piWeb?.behaviorSubject("session.activeId",b).next(b),x(p,"active.start",i),x(p,"session.created",i)}function Ap(p,b){globalThis.piWeb?.subject("session.changed").next({sessionId:p,name:b,title:b})}function Cp(p){if(p.title!=="New chat")return"";let h=p.messages.find((w)=>w.role==="user")?.text.slice(0,48)||"";if(!h)return"";return p.title=h,h}function up(p,b){try{localStorage.setItem(p,b)}catch{}}function D1(p){try{localStorage.removeItem(p)}catch{}}async function Y(p,b,h={},w=o(p)){if(!p.backend)return{};let i=await p.backend(b,{workspaceId:w,data:h});return G(i)?i:{}}function $p(p){let b=Array.isArray(p.warnings)?p.warnings.filter((h)=>typeof h==="string"&&h.trim().length>0):[];for(let h of b)globalThis.piWeb?.subject("toast.requested").next({level:"warning",message:h})}function kh(p,b){return p.trim().startsWith("!")?[]:[...b]}async function U1(p,b,h,w,i,f,l=()=>{}){let L=Nb(p,h),O=V(p);if(w.activeRunId&&w.activeRunSessionId===L){let R=w.activeRunWorkspacePath||O.path,J=w.activeRunWorkspaceId||O.id;await Y1(p,b,h,w,i,f,R,J,l);return}if(w.startingRunSessionId===L||w.fallbackSubmittingSessionId===L)return;w.backendChatToken+=1,w.startingRunSessionId=L,l(),w.runEventsAbort?.abort();let T=new AbortController;w.runEventsAbort=T,w.sessionEventsAbort?.abort();let H={id:U(),role:"user",text:i,attachments:Dp(f),createdAt:Date.now()},$=q(h,L);Ub(w.pendingPromptEchoIds,L,H.id),$.messages.push(H),$.updatedAt=Date.now(),C(h),Z(b,$.messages,L);let _;try{_=await W1(p,i,f,L,O.path,O.id)}catch(R){throw w.startingRunSessionId=void 0,l(),R}if(T.signal.aborted){if(w.startingRunSessionId=void 0,typeof _.runId==="string"&&_.runId)await Hb(p,_.runId,L,O.id);d(h,L,H.id),l();return}if($p(_),typeof _.activeSessionId==="string"&&_.activeSessionId){let R=L,J=h.activeSessionId===R;if(L=_.activeSessionId,J)r(h,L),W(p,{sessionId:_.activeSessionId,workspaceId:O.id||void 0}),x(p,"chat-session",{reason:"startPrompt",sessionId:_.activeSessionId}),Np(p,_.activeSessionId,"startPrompt");else q(h,L);Yb(h,R,L,H.id),Zh(w.pendingPromptEchoIds,R,L)}if(typeof _.runId!=="string"||!_.runId){w.startingRunSessionId=void 0,w.fallbackSubmittingSessionId=L,l();let R;try{R=await B1(p,i,f,L,O.path,O.id)}catch(u){throw w.fallbackSubmittingSessionId=void 0,l(),u}if(T.signal.aborted){w.fallbackSubmittingSessionId=void 0,d(h,L,H.id),l();return}$p(R);let J=typeof R.activeSessionId==="string"&&R.activeSessionId?R.activeSessionId:L,Q=Gp(w.pendingPromptEchoIds,L),A=u1(p,h,R,"submitPrompt",L,Q);if(qp(w.pendingPromptEchoIds,J,A,R.messages,Q),h.activeSessionId===L||h.activeSessionId===J)Z(b,A,h.activeSessionId);if(w.runEventsAbort===T)w.runEventsAbort=void 0;w.startingRunSessionId=void 0,w.fallbackSubmittingSessionId=void 0,l();return}let z=q(h,L);w.activeRunId=_.runId,w.activeRunSessionId=L,w.activeRunWorkspacePath=O.path,w.activeRunWorkspaceId=O.id,w.startingRunSessionId=void 0,l();let F=Cp(z);if(F)C(h),Ap(L,F);let N=P1(z);try{await Q1(p,h,z,_.runId,O.path,O.id,N,()=>{if(!T.signal.aborted&&h.activeSessionId===L)Z(b,z.messages,L)},T.signal)}finally{if(w.activeRunId===_.runId)w.activeRunId=void 0,w.activeRunSessionId=void 0,w.activeRunWorkspacePath=void 0,w.activeRunWorkspaceId=void 0,w.startingRunSessionId=void 0,w.fallbackSubmittingSessionId=void 0,l();if(w.runEventsAbort===T)w.runEventsAbort=void 0}if(!T.signal.aborted&&h.activeSessionId===L)t(p,b,h,w,L,O.path,O.id)}async function Y1(p,b,h,w,i,f,l,L,O=()=>{}){let{activeRunId:T,activeRunSessionId:H}=w;if(!T||!H)throw Error("active run is unavailable for steering");if(w.pendingSteering)return;let $={id:U(),role:"user",text:i,attachments:Dp(f),createdAt:Date.now()},_=q(h,H),z=new AbortController,F=X1(z.signal,()=>{let N=w.pendingSteering;if(N)N.sent=!0,O()});if(w.pendingSteering={sessionId:H,messageId:$.id,timeout:F.timeout,controller:z,sent:!1},Ub(w.pendingPromptEchoIds,H,$.id),_.messages.push($),_.updatedAt=Date.now(),C(h),h.activeSessionId===H)Z(b,_.messages,H);O();try{if(await F.promise,z.signal.aborted)return;let N=await v1(p,T,i,f,H,l,L);$p(N)}catch(N){if(Wb(N))return;if(d(h,H,$.id),Vh(w.pendingPromptEchoIds,H,$.id),Tb(N)){Z(b,_.messages,H),globalThis.piWeb?.subject("toast.requested").next({level:"error",message:"This backend does not support steering while a response is streaming."});return}throw N}finally{if(w.pendingSteering?.controller===z)w.pendingSteering=void 0,O()}}function X1(p,b){let h,w=new Promise((i,f)=>{h=setTimeout(()=>{b(),i()},p1),p.addEventListener("abort",()=>{clearTimeout(h),f(new DOMException("Steering cancelled","AbortError"))},{once:!0})});return{timeout:h,promise:w}}function d(p,b,h){let w=p.sessions.find((i)=>i.id===b);if(!w)return;w.messages=w.messages.filter((i)=>i.id!==h),Xb(p,w.id),C(p)}async function Q1(p,b,h,w,i,f,l,L,O){let T=await lb(p,"streamEventsSse",{runId:w,cursor:0,workspacePath:i},O,f);if(!T)throw Error("SSE streaming backend did not return a stream");let H=fb(L);l.streaming=!0,H.flush();try{await Lb(T,($)=>{r1(l,[$]),l.streaming=$.type!=="run.end",h.updatedAt=Date.now(),C(b),H.request()})}finally{l.streaming=!1,C(b),H.flush()}}function fb(p){let b=0,h,w=()=>{if(h)clearTimeout(h),h=void 0},i=()=>{w(),b=Date.now(),p()};return{request:()=>{let l=sb-(Date.now()-b);if(l<=0){i();return}h||=setTimeout(i,l)},flush:i,cancel:w}}async function lb(p,b,h={},w,i=o(p)){if(!p.backendStream)throw Error("SSE streaming backend is unavailable");let f=await p.backendStream(b,{workspaceId:i,data:h},{signal:w});return K1(f)}function K1(p){if(typeof ReadableStream<"u"&&p instanceof ReadableStream)return p;if(typeof Response<"u"&&p instanceof Response)return p.body;if(typeof p==="string")return Ip(p);if(!G(p))return null;let b=p.body;if(typeof ReadableStream<"u"&&b instanceof ReadableStream)return b;let h=p.sse;if(typeof h==="string")return Ip(h);return null}function Ip(p){let b=new TextEncoder().encode(p);return new ReadableStream({start(h){h.enqueue(b),h.close()}})}async function Lb(p,b){let h=p.getReader(),w=new TextDecoder,i="";while(!0){let f=await h.read();if(f.done){i+=w.decode(),E1(i,b);return}i+=w.decode(f.value,{stream:!0});let l=M1(i);i=l.remainder;for(let L of l.frames)Ob(L,b)}}function M1(p){let h=p.replaceAll(`\r
`,`
`).replaceAll("\r",`
`).split(`

`),w=h.pop()||"";return{frames:h,remainder:w}}function E1(p,b){let h=p.trim();if(h)Ob(h,b)}function Ob(p,b){let h=p.split(`
`).filter((w)=>w.startsWith("data:")).map((w)=>w.slice(5).trimStart()).join(`
`);if(!h)return;try{let w=JSON.parse(h);if(x1(w))b(w)}catch{}}function mp(p,b){globalThis.piWeb?.subject("chat.input.submitted").next({text:p,attachments:Dp(b)||[]})}async function W1(p,b,h,w,i=V(p).path,f=V(p).id){try{return await Y(p,"startPrompt",jp(b,h,w,i),f)}catch(l){if(Tb(l))return{};throw l}}function Tb(p){return/unknown method: (startPrompt|streamEventsSse|steerPrompt)|unsupported method: (startPrompt|streamEventsSse|steerPrompt)|(startPrompt|streamEventsSse|steerPrompt) unsupported/i.test(pp(p))}async function B1(p,b,h,w="",i=V(p).path,f=V(p).id){return await Y(p,"submitPrompt",jp(b,h,w,i),f)}async function v1(p,b,h,w,i="",f=V(p).path,l=V(p).id){let L={...jp(h,w,i,f),runId:b};return Y(p,"steerPrompt",L,l)}async function Hb(p,b,h="",w=V(p).id){return Y(p,"abortPrompt",{runId:b,sessionId:h},w)}function jp(p,b,h,w){let i={text:p,attachments:b,sessionId:h};if(w)i.workspacePath=w;return i}function P1(p){let b=[...p.messages].reverse().find((w)=>w.role==="assistant"&&w.streaming);if(b)return b;let h={id:U(),role:"assistant",text:"",createdAt:Date.now(),streaming:!0};return p.messages.push(h),h}function r1(p,b){for(let h of b)if(h.type==="text.delta"&&typeof h.delta==="string")Lp(p,"text",h.delta),p.text+=h.delta;else if(h.type==="thinking.delta"&&typeof h.delta==="string")Lp(p,"thinking",h.delta),p.thinking=`${p.thinking||""}${h.delta}`;else if(h.type==="tool.start")Op(p,h,"running");else if(h.type==="tool.delta"&&typeof h.delta==="string"){let w=Op(p,h,"running");w.text=h.delta}else if(h.type==="tool.end"){let w=Op(p,h,h.isError?"err":"ok");if(typeof h.result==="string"&&h.result)w.text=h.result}else if(h.type==="error"&&typeof h.message==="string")Lp(p,"text",`${p.text?`
`:""}${h.message}`),p.text+=`${p.text?`
`:""}${h.message}`}function Lp(p,b,h){p.blocks||=[];let w=p.blocks[p.blocks.length-1];if(w?.type===b){w.text+=h;return}if(p.blocks.length<zp)p.blocks.push({id:U(),type:b,text:h})}function Op(p,b,h){let w=b.toolCallId||b.toolName||"tool";p.toolCalls||=[];let i=p.toolCalls.find((f)=>f.id===w);if(!i)i={id:w,name:b.toolName||"tool",args:b.args,text:"",status:h},p.toolCalls.push(i),k1(p,i);if(i.status=h,c1(i,b))i.args=b.args,i.argsStatus=b.argsStatus;return i}function k1(p,b){if(p.blocks||=[],p.blocks.some((h)=>h.type==="tool"&&h.toolCall?.id===b.id))return;if(p.blocks.length<zp)p.blocks.push({id:U(),type:"tool",text:"",toolCall:b})}function c1(p,b){if(!b.argsStatus)return Boolean(b.args);if(b.argsStatus==="unavailable")return!p.argsStatus;return!0}function x1(p){return G(p)&&typeof p.type==="string"}async function t(p,b,h,w,i="",f=Vp(p),l=V(p).id){if(!p.backendStream){await ap(p,b,h,w,i,f);return}let L=++w.backendChatToken;w.sessionEventsAbort?.abort();let O=new AbortController;w.sessionEventsAbort=O;let T=fb(()=>{Z(b,g(h).messages,h.activeSessionId)});try{let H=await lb(p,"sessionEventsSse",$b(p,i,f),O.signal,l);if(!H)throw Error("session SSE backend did not return a stream");await Lb(H,($)=>{if(L!==w.backendChatToken||$.type!=="chat.state")return;let _=g1($),z=typeof _.activeSessionId==="string"?_.activeSessionId:i,F=Gp(w.pendingPromptEchoIds,z),N=yb(p,h,_,"chatState",F);if(_b(w,_,z,f,l),qp(w.pendingPromptEchoIds,z,N,_.messages,F),N.length)T.request()})}catch(H){if(!O.signal.aborted)await ap(p,b,h,w,i,f)}finally{if(T.cancel(),w.sessionEventsAbort===O)w.sessionEventsAbort=void 0}}async function ap(p,b,h,w,i="",f=Vp(p)){let l=++w.backendChatToken;try{let L=await Y(p,"chatState",$b(p,i,f));if(l!==w.backendChatToken)return;let O=typeof L.activeSessionId==="string"?L.activeSessionId:i,T=Gp(w.pendingPromptEchoIds,O),H=yb(p,h,L,"chatState",T);if(_b(w,L,O,f,V(p).id),qp(w.pendingPromptEchoIds,O,H,L.messages,T),H.length)Z(b,H,h.activeSessionId)}catch{}}function $b(p,b,h=Vp(p)){let w=b?{sessionId:b}:{};if(h)w.workspacePath=h;return w}function g1(p){return{activeSessionId:p.activeSessionId,messages:p.messages,runId:p.runId,isStreaming:p.isStreaming}}function _b(p,b,h,w,i){if(b.isStreaming===!0&&typeof b.runId==="string"&&b.runId){p.activeRunId=b.runId,p.activeRunSessionId=typeof b.activeSessionId==="string"&&b.activeSessionId?b.activeSessionId:h,p.activeRunWorkspacePath=w,p.activeRunWorkspaceId=i,p.onRunStateChange?.();return}if(b.isStreaming===!1&&(!b.activeSessionId||b.activeSessionId===p.activeRunSessionId))p.activeRunId=void 0,p.activeRunSessionId=void 0,p.activeRunWorkspacePath=void 0,p.activeRunWorkspaceId=void 0,p.onRunStateChange?.()}function Vp(p){return V(p).path}function V(p){let b=p.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),h=b?.activeWorkspaceId||p.app?.dataset.activeWorkspaceId||"",w=b?.workspaces?.find((i)=>i.id===h)?.path||"";return{id:h,path:w}}function Rb(p,b){let h=p.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),w=b.workspaceId||h?.activeWorkspaceId||p.app?.dataset.activeWorkspaceId||"",i=h?.workspaces?.find((f)=>f.id===w)?.path||"";if(i||w!==h?.activeWorkspaceId)return{id:w,path:i};return V(p)}function yb(p,b,h,w,i=""){let f=Up(h.messages);if(typeof h.activeSessionId==="string"&&h.activeSessionId){let T=b.activeSessionId;if(r(b,h.activeSessionId),W(p,{sessionId:h.activeSessionId,workspaceId:p.app?.dataset.activeWorkspaceId||o(p)||void 0}),w!=="chatState"||T!==h.activeSessionId)x(p,"chat-session",{reason:w,sessionId:h.activeSessionId});if(w!=="chatState")Np(p,h.activeSessionId,w)}let l=g(b);if(!f.length)return[];let L=Db(l.messages,f,i).slice(-c);if(!zb(l.messages,L))return[];l.messages=L;let O=Cp(l);if(l.updatedAt=Date.now(),C(b),O)Ap(l.id,O);return l.messages}function zb(p,b){if(p.length!==b.length)return!0;return p.some((h,w)=>_p(h)!==_p(b[w]))}function _p(p){return JSON.stringify({id:p.id,role:p.role,text:p.text,blocks:p.blocks,thinking:p.thinking,streaming:p.streaming,toolCalls:p.toolCalls,attachments:p.attachments})}function u1(p,b,h,w,i,f=""){let l=Up(h.messages),L=typeof h.activeSessionId==="string"&&h.activeSessionId?h.activeSessionId:i,O=b.activeSessionId===i;if(L!==i)if(O)r(b,L),W(p,{sessionId:L,workspaceId:V(p).id||void 0}),x(p,"chat-session",{reason:w,sessionId:L}),Np(p,L,w);else q(b,L);let T=Array.isArray(f)?f:[f].filter(Boolean);if(L!==i)for(let z of T)Yb(b,i,L,z);let H=q(b,L);if(!l.length)return[];let $=Db(H.messages,l,f).slice(-c);if(!zb(H.messages,$))return[];H.messages=$;let _=Cp(H);if(H.updatedAt=Date.now(),C(b),_)Ap(H.id,_);return H.messages}function I1(p,b,h,w,i){let f=(T,H)=>{if(!T?.sessionId){if(!H)Sp(b,h,w,i,!0);return}if(Ab(b,w,T))return;W(b,T),r(w,T.sessionId),Z(h,g(w).messages,w.activeSessionId);let $=Rb(b,T);t(b,h,w,i,T.sessionId,$.path,$.id)},l=(T)=>{if(m1(b,h,w,i,T))return;let H=S1(b,T);if(H)f(H,!1)},L=b.app?.piWebSidebar?.channels?.selectedSession$||globalThis.piWebSidebar?.channels?.selectedSession$,O=b.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$;if(L){let T=!0;p.add(L.subscribe((H)=>{f(H,T),T=!1}))}if(O)p.add(O.subscribe(l));if(b.app)p.listen(b.app,"pi-web-sidebar:session-created",(T)=>{let H=T.detail||{},$=typeof H.sessionId==="string"?H.sessionId:"",_=typeof H.workspaceId==="string"?H.workspaceId:"";if($)f({sessionId:$,workspaceId:_||void 0},!1)});if(globalThis.piWeb){let T=!0;p.add(globalThis.piWeb.behaviorSubject(sp,E(b)).subscribe(($)=>{f($,T),T=!1})),p.add(globalThis.piWeb.subject(ep).subscribe(l));let H=!0;p.add(globalThis.piWeb.behaviorSubject("session.activeId",null).subscribe(($)=>{if(!$){if(!H)Sp(b,h,w,i,!1);H=!1;return}H=!1,f({sessionId:$,workspaceId:b.app?.dataset.activeWorkspaceId||Qb(yp)||void 0},!1)}))}}function Sp(p,b,h,w,i){if(w.backendChatToken+=1,w.runEventsAbort?.abort(),w.sessionEventsAbort?.abort(),h.activeSessionId="",C(h),i)ib(p);else{let f=E(p);if(f?.sessionId&&p.app)p.app.dataset.clearedSessionId=f.sessionId}s(b)}function Nb(p,b){let h=E(p);if(h?.sessionId&&!Ab(p,b,h))W(p,h),r(b,h.sessionId);if(!b.activeSessionId)return q(b,"",!0).id;return b.activeSessionId}function Ab(p,b,h){let w=h.workspaceId||"",i=p.app?.dataset.activeWorkspaceId||Qb(yp)||"";return b.activeSessionId===h.sessionId&&(!w||w===i)}function m1(p,b,h,w,i){if(i.type!=="session.deleted")return!1;let f=Cb(i);if(!f)return!0;let l=h.activeSessionId===f,L=h.sessions.length;if(h.sessions=h.sessions.filter((O)=>O.id!==f),l){w.runEventsAbort?.abort(),w.sessionEventsAbort?.abort();let O=a1(p,i,f);if(O?.sessionId){W(p,O),r(h,O.sessionId),n1(b,g(h).messages,h.activeSessionId);let T=Rb(p,O);return t(p,b,h,w,O.sessionId,T.path,T.id),!0}return h.activeSessionId="",ib(p),C(h),s(b),!0}if(h.sessions.length!==L)C(h);return!0}function a1(p,b,h){let w=b.snapshot?.activeSessionId||"",i=b.snapshot?.activeWorkspaceId||"";if(w&&w!==h)return{sessionId:w,workspaceId:i||void 0};let f=E(p);if(f?.sessionId&&f.sessionId!==h)return f;return null}function S1(p,b){if(!d1(b.type))return null;let h=b.detail||{},w=Cb(b)||b.snapshot?.activeSessionId||"",i=typeof h.workspaceId==="string"?h.workspaceId:b.snapshot?.activeWorkspaceId||p.app?.dataset.activeWorkspaceId||"";if(!w)return null;return{sessionId:w,workspaceId:i||void 0}}function Cb(p){let b=p.detail||{};if(typeof b.sessionId==="string")return b.sessionId;if(typeof b.id==="string")return b.id;return""}function d1(p){return p==="session.selected"||p==="session.created"||p==="new-session"||p==="active.start"}function r(p,b){let h=p.sessions.find((w)=>w.id===b);if(!h)h=e(b),p.sessions.unshift(h);return p.activeSessionId=h.id,C(p),h}function Z(p,b,h){if(Fb(b,h),!b.length){s(p);return}let w=p.querySelector(".term-inner")||p;jb(w,b,h),Zp(p)}function n1(p,b,h){Fb(b,h);let w=p.querySelector(".term-inner")||p;jb(w,b,h),Zp(p)}function jb(p,b,h){let w=o1(p),i=b.map((L)=>{let O=`${h}:${_p(L)}`,T=w.get(L.id);if(T&&xp.get(T)===O)return T;let H=s1(L,h);return xp.set(H,O),H}),f=new Set(i),l=p.firstChild;for(let L of i){if(l!==L)p.insertBefore(L,l);l=L.nextSibling}for(let L of Array.from(p.children)){if(Rp(p,L)&&!f.has(L)){L.remove();continue}if(!Rp(p,L))L.remove()}}function o1(p){let b=new Map;for(let h of Array.from(p.children)){if(!Rp(p,h))continue;let w=h.dataset.messageId||"";if(w)b.set(w,h)}return b}function Rp(p,b){let h=p.ownerDocument.defaultView;return Boolean(h&&b instanceof h.HTMLElement&&b.classList.contains("transcript-item"))}function s(p){let b=p.querySelector(".term-inner")||p,h=document.createElement("article");h.className="pi-web-chat-docs",h.setAttribute("aria-label","pi-web-chat guide");let w=document.createElement("h1");w.textContent="pi-web-chat guide";let i=document.createElement("p");i.textContent=["Select or create a session in the sidebar to load chat history,","or type below to start a new session."].join(" ");let f=document.createElement("ul");for(let l of["Ask pi in the prompt box and press Cmd/Ctrl+Enter to send.","Type ! then Space at the start to turn the prompt yellow and run shell commands in the workspace.","Queued file attachments hide during shell mode and reappear for the next normal prompt.","Type @ to list project files, then pick one to tag it as prompt context.","Type / at the start to open the slash command list.","Chats are cached locally after you start or select a session."]){let L=document.createElement("li");L.textContent=l,f.append(L)}h.append(w,i,f),b.replaceChildren(h),Zp(p)}function t1(p,b){let h=b.querySelector(".term"),w=b.querySelector("[data-action='scroll-bottom']");if(!h||!w)return;let i={term:h,button:w,pinned:!0,touchStartY:null};Hp.set(b,i),w.hidden=!1,n(i),p.listen(w,"click",()=>{i.pinned=!0,Vb(i),n(i)}),p.listen(h,"wheel",(f)=>{if(f.deltaY<0)dp(i)}),p.listen(h,"touchstart",(f)=>{let l=f;i.touchStartY=l.touches.item(0)?.clientY??null}),p.listen(h,"touchmove",(f)=>{let L=f.touches.item(0)?.clientY;if(typeof L==="number"&&i.touchStartY!==null&&L-i.touchStartY>8)dp(i)}),p.listen(h,"touchend",()=>{i.touchStartY=null}),p.add({remove:()=>{Hp.delete(b)}})}function Zp(p){let b=Hp.get(p);if(!b)return;if(b.pinned)Vb(b);n(b)}function Vb(p){p.term.scrollTop=p.term.scrollHeight}function dp(p){p.pinned=!1,n(p)}function n(p){p.button.dataset.pinned=p.pinned?"true":"false",p.button.setAttribute("aria-pressed",p.pinned?"true":"false")}function s1(p,b){let h=document.createElement("article");if(h.className="transcript-item",h.dataset.messageId=p.id,e1(p)){let w=ph(p);if(w)Fp(h,p.role,p.text);wh(h,p,b,w)}else ih(h,p,b);if(p.streaming)h.dataset.streaming="true";return h}function e1(p){return Boolean(p.blocks?.some((b)=>{return b.type==="tool"||b.text.trim().length>0}))}function ph(p){return Boolean(p.text.trim())&&(!bh(p)||hh(p))}function bh(p){return Boolean(p.blocks?.some((b)=>{return b.type==="text"&&b.text.trim().length>0}))}function hh(p){return(p.blocks?.length||0)>=zp}function wh(p,b,h,w=!1){for(let i of b.blocks||[])if(i.type==="text"){if(!w)Fp(p,b.role,i.text)}else if(i.type==="thinking")p.append(Zb(i.text,Boolean(b.streaming)));else if(i.type==="tool"&&i.toolCall){let f=b.toolCalls?.find((l)=>l.id===i.toolCall?.id)||i.toolCall;p.append(Jb(f,Jp(h,b,f)))}}function ih(p,b,h){if(fh(b))Fp(p,b.role,b.text);if(b.thinking)p.append(Zb(b.thinking,Boolean(b.streaming)));for(let w of b.toolCalls||[])p.append(Jb(w,Jp(h,b,w)))}function Fp(p,b,h){if(b==="assistant"&&!h.trim())return;let w=document.createElement("div");w.className="msg",w.dataset.kind=Tp(b);let i=document.createElement("span");i.className=`prefix ${Tp(b)}`,i.textContent=Nh(b);let f=document.createElement("pre");f.className=`body ${Tp(b)}`,f.textContent=h,w.append(i,f),p.append(w)}function fh(p){let b=p.text.trim().length>0;return p.role!=="assistant"||b}function Zb(p,b){let h=document.createElement("details");h.className="msg-detail think thinking-block",h.open=b;let w=document.createElement("summary");w.className="label",w.textContent="THINKING";let i=document.createElement("pre");return i.className="body",i.textContent=p,h.append(w,i),h}function Fb(p,b){let h=new Set;for(let w of p)for(let i of w.toolCalls||[])h.add(Jp(b,w,i));for(let w of P)if(!h.has(w))P.delete(w)}function Jp(p,b,h){return`${p}:${b.id}:${h.id}`}function Jb(p,b){let h=document.createElement("div");h.className="tool-card",h.dataset.tool=p.name||"tool",h.dataset.status=p.status;let w=!P.has(b);h.dataset.collapsed=w?"true":"false";let i=document.createElement("button");if(i.type="button",i.className="tc-head",i.title=w?"Show tool output":"Hide tool output",i.setAttribute("aria-expanded",w?"false":"true"),i.setAttribute("aria-label",Gb(p,w)),i.append(Th(p),Hh(p),$h(p),_h(p,w)),!w)h.append(qb(p));return i.addEventListener("click",()=>Oh(h,i,p,b)),h.prepend(i),h}function Gb(p,b){let h=b?"Show":"Hide",w=p.status==="running"?"running":p.status==="err"?"failed":"done",i=lh(p),f=i?`, ${i}`:"";return`${h} ${p.name||"tool"} output, ${w}${f}`}function lh(p){if(p.argsStatus==="present")return"arguments present";if(p.argsStatus)return m(p);return p.args?"arguments present":""}function qb(p){let b=document.createElement("pre");return b.className="tc-body",b.textContent=p.text||wp(p),b}function np(p,b){let h=0,w,i=b.ownerDocument.defaultView,f=typeof i?.matchMedia==="function"?i.matchMedia("(prefers-reduced-motion: reduce)"):void 0,l=()=>{if(w)clearInterval(w),w=void 0},L=()=>{h=(h+1)%bb;for(let H of b.querySelectorAll(".spinner"))H.dataset.frame=String(h)},O=()=>{let H=b.querySelectorAll(".spinner");if(f?.matches||H.length===0){l(),h=0;for(let $ of H)$.dataset.frame="0";return}if(!w)w=setInterval(L,eb)},T=new(i?.MutationObserver||MutationObserver)(O);T.observe(b,{childList:!0,subtree:!0}),f?.addEventListener("change",O),O(),p.add({remove:()=>{T.disconnect(),f?.removeEventListener("change",O),l()}})}function Lh(){let p=document.createElement("span");p.className="spinner",p.dataset.frame="0",p.setAttribute("aria-hidden","true");for(let b=0;b<bb;b+=1)p.append(document.createElement("span"));return p}function Oh(p,b,h,w){let i=p.querySelector(".tc-body"),f=i!==null;if(i)i.remove(),P.delete(w);else p.append(qb(h)),P.add(w);p.dataset.collapsed=f?"true":"false",b.setAttribute("aria-expanded",f?"false":"true"),b.setAttribute("aria-label",Gb(h,f)),b.title=f?"Show tool output":"Hide tool output";let l=b.querySelector(".tc-toggle-label");if(l)l.textContent=f?"show":"hide"}function Th(p){let b=document.createElement("span");b.className="tc-glyph";let h=Rh(p),w=h?b1[h]:"";if(!h||!w)return b.textContent="●",b;return b.innerHTML=`<svg class="tc-icon" data-tool-icon="${h}" aria-hidden="true" viewBox="0 0 24 24">${w}</svg>`,b}function Hh(p){let b=document.createElement("span");return b.className="tc-name",b.textContent=p.name||"tool",b}function $h(p){let b=document.createElement("span");return b.className="tc-args",b.textContent=m(p),b}function _h(p,b){let h=document.createElement("span");if(h.className="tc-meta",p.status==="running"){let f=Lh(),l=document.createElement("span");return l.className="running",l.textContent="running",h.append(f,l,op(b)),h}let w=document.createElement("span");w.className=p.status==="err"?"err":"ok",w.textContent=p.status==="err"?"✗":"✓";let i=document.createElement("span");return i.textContent=p.status==="err"?" · failed":" · done",h.append(w,i,op(b)),h}function op(p){let b=document.createElement("span");b.className="tc-toggle";let h=document.createElement("span");h.className="tc-toggle-label",h.textContent=p?"show":"hide";let w=document.createElement("span");return w.className="tc-caret",w.textContent="▸",b.append(h,w),b}function Rh(p){let b=yh(p.name);if(["bash","shell","sh","zsh","terminal"].includes(b))return zh(m(p).toLowerCase())||"terminal";return h1[b]}function yh(p){return p.trim().replace(/^functions\./,"").replace(/^multi_tool_use\./,"")}function zh(p){if(/\bgit\b|\bgh\b/.test(p))return"git-branch";if(/\b(go test|bun test|npm test|pnpm test|yarn test|vitest|pytest|cargo test)\b/.test(p))return"circle-check";if(/\b(bun|npm|pnpm|yarn)\s+(run\s+)?build\b|\b(go build|cargo build)\b/.test(p))return"hammer";if(/\b(bun|npm|pnpm|yarn)\s+(add|install|i)\b|\bpip\s+install\b|\bgo\s+get\b/.test(p))return"package";return}function Nh(p){if(p==="assistant")return"pi >";if(p==="user")return"you >";if(p==="system")return"sys >";return"tool >"}function Tp(p){if(p==="assistant")return"pi";if(p==="system")return"sys";return p}function Ah(p){let b=/^\/([^\s/]*)$/.exec(p);return b?b[1].toLowerCase():null}function Ch(p){let b=/(?:^|\s)@([^\s@`]*)$/.exec(p);return b?b[1]:null}function ch(p){return p.length>0}function xh(p,b){return p.trim().startsWith("!")&&b}function Db(p,b,h=""){let w=Array.isArray(h)?h:[h].filter(Boolean),i=new Map,f=new Map,l=0;for(let O of p)i.set(O.id,O),f.set(O.id,l++);let L=new Set;for(let O of b){let T=jh(p,O,w,L);if(T){L.add(T.id),i.delete(T.id),i.set(O.id,O),f.set(O.id,f.get(T.id)??l++);continue}if(!f.has(O.id))f.set(O.id,l++);i.set(O.id,{...i.get(O.id),...O})}return[...i.values()].sort((O,T)=>{let H=O.createdAt-T.createdAt;if(H!==0)return H;return(f.get(O.id)??0)-(f.get(T.id)??0)})}function jh(p,b,h,w){if(!h.length||b.role!=="user"||!b.text.trim())return;if(p.some((f)=>f.id===b.id))return;let i=p.find((f)=>{return h.includes(f.id)&&!w.has(f.id)&&f.text.trim()===b.text.trim()});if(i?.role!==b.role||i.text.trim()!==b.text.trim())return;return i}function Ub(p,b,h){p.set(b,[...p.get(b)||[],h])}function Gp(p,b){return p.get(b)||[]}function Vh(p,b,h){let w=(p.get(b)||[]).filter((i)=>i!==h);if(w.length){p.set(b,w);return}p.delete(b)}function Zh(p,b,h){let w=p.get(b)||[];if(!w.length)return;p.delete(b),p.set(h,[...p.get(h)||[],...w])}function qp(p,b,h,w,i){if(!i.length||!h.length)return;let f=i.filter((l)=>{return h.some((L)=>L.id===l)});if(f.length){p.set(b,f);return}p.delete(b)}function g(p){return q(p,p.activeSessionId,!0)}function q(p,b,h=!1){let w=p.sessions.find((i)=>i.id===b);if(!w)w=e(b||void 0),p.sessions.unshift(w),C(p);if(h||!p.activeSessionId)p.activeSessionId=w.id,C(p);return w}function Yb(p,b,h,w){if(b===h)return;let i=p.sessions.find((O)=>O.id===b),f=i?.messages.findIndex((O)=>O.id===w)??-1;if(!i||f<0)return;let[l]=i.messages.splice(f,1),L=q(p,h);if(!L.messages.some((O)=>O.id===l.id))L.messages.push(l);i.updatedAt=Date.now(),L.updatedAt=Date.now(),Xb(p,i.id),C(p)}function Xb(p,b){let h=p.sessions.find((w)=>w.id===b);if(!h||h.id===p.activeSessionId||h.messages.length>0||h.title!=="New chat")return;p.sessions=p.sessions.filter((w)=>w.id!==h.id)}function e(p=U()){let b=Date.now();return{id:p,title:"New chat",createdAt:b,updatedAt:b,messages:[]}}function Qb(p){try{return localStorage.getItem(p)||""}catch{return""}}function Fh(p){let b=e(p);return{activeSessionId:b.id,sessions:[b]}}function Jh(){try{let p=JSON.parse(localStorage.getItem(S)||"null");if(p&&Array.isArray(p.sessions))return{activeSessionId:"",sessions:p.sessions.filter(Kb).map(Mb)}}catch{}return{activeSessionId:"",sessions:[]}}function Gh(p=""){try{let b=JSON.parse(localStorage.getItem(S)||"null");if(b&&typeof b.activeSessionId==="string"&&Array.isArray(b.sessions)){let h=b.sessions.filter(Kb).map(Mb);if(p&&!h.some((w)=>w.id===p))h.unshift(e(p));return{activeSessionId:p||b.activeSessionId,sessions:h}}}catch{}return Fh(p||void 0)}function C(p){tp(p);try{localStorage.setItem(S,JSON.stringify(p))}catch{for(let b of p.sessions)b.messages=b.messages.slice(-Math.floor(c/2));tp(p);try{localStorage.setItem(S,JSON.stringify(p))}catch{}}}function Dp(p){if(!p?.length)return;return p.map(({content:b,...h})=>h)}function tp(p){p.sessions.sort((w,i)=>i.updatedAt-w.updatedAt);let b=p.sessions.find((w)=>w.id===p.activeSessionId),h=p.sessions.filter((w)=>w.id!==p.activeSessionId).slice(0,Math.max(0,cp-1));p.sessions=b?[b,...h]:p.sessions.slice(0,cp);for(let w of p.sessions)if(w.messages.length>c)w.messages.splice(0,w.messages.length-c)}function Kb(p){return G(p)&&typeof p.id==="string"&&Array.isArray(p.messages)}function Mb(p){return{...p,messages:Up(p.messages)}}function Up(p){return Array.isArray(p)?p.filter(Qh).map(qh):[]}function qh(p){let b={...p};if(Array.isArray(p.toolCalls))b.toolCalls=p.toolCalls.filter(Eb);else delete b.toolCalls;if(Array.isArray(p.blocks))b.blocks=p.blocks.filter(Uh).map(Dh);else delete b.blocks;return b}function Dh(p){if(p.type!=="tool"){let{toolCall:b,...h}=p;return h}return p}function Uh(p){if(!G(p)||typeof p.id!=="string"||typeof p.text!=="string")return!1;if(p.type==="text"||p.type==="thinking")return!0;return p.type==="tool"&&Eb(p.toolCall)}function Eb(p){if(!G(p)||typeof p.id!=="string"||typeof p.name!=="string")return!1;return typeof p.text==="string"&&Xh(p.status)&&Yh(p.argsStatus)}function Yh(p){return p===void 0||p==="present"||p==="empty"||p==="unavailable"||p==="truncated"||p==="omitted"}function Xh(p){return p==="running"||p==="ok"||p==="err"}function Qh(p){if(!G(p)||typeof p.id!=="string"||typeof p.text!=="string")return!1;return typeof p.createdAt==="number"&&Kh(p.role)}function Kh(p){return p==="user"||p==="assistant"||p==="tool"||p==="system"}function G(p){return typeof p==="object"&&p!==null}function U(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`}function Wb(p){return p instanceof Error&&(p.name==="AbortError"||/aborted|abort/i.test(p.message))}function pp(p){return p instanceof Error?p.message:String(p)}export{m as toolArgsInlineText,wp as toolArgsBodyText,kh as submittedAttachmentsForText,xh as shellAttachmentNoteVisible,ub as setComposerMode,I as renderPromptMeta,xb as renderMessages,mb as promptFromAgUiLikeRunInput,Pp as pluginStyleText,hp as pluginClass,rh as mergeCommands,ch as hasQueuedAttachmentNames,o as getActiveWorkspaceId,C1 as formatShellOutput,wb as extractRefs,w1 as default,Wp as createComposerSurface,Ep as createChatSurface,cb as createChatDom,Ph as createChannels,Ib as createAgUiLikeRunInput,a as commandName,ab as chatEventsToAgUiLikeEvents,Y as backendCall};
