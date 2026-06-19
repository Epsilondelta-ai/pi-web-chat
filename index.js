var K={attachFile:["M16.5 6v11.5a4 4 0 0 1-8 0V5a2.5 2.5 0 0 1 5 0v10.5a1 1 0 0 1-2 0V6H10v9.5","a2.5 2.5 0 0 0 5 0V5a4 4 0 0 0-8 0v12.5a5.5 5.5 0 0 0 11 0V6h-1.5Z"].join(""),stop:"M6 6h12v12H6V6Z",send:"M2 21 23 12 2 3v7l15 2-15 2v7Z",terminal:"M3 4h18v16H3V4Zm2 2v12h14V6H5Zm2 3 1.1-1.1L12.2 12l-4.1 4.1L7 15l3-3-3-3Zm6 6h5v1.5h-5V15Z",file:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 2.5L17.5 8H14V4.5ZM8 13h8v1.5H8V13Zm0 3h8v1.5H8V16Z"},B={attachFile:M("attach_file",K.attachFile),stop:M("stop",K.stop),send:M("send",K.send),terminal:M("terminal",K.terminal)};function Mb(b){return`<span class="composer-spinner" aria-hidden="true"></span><span class="sr-only">${v(b)}</span>`}function M(b,p){return`<svg class="material-icon" data-material-icon="${b}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="${p}"></path></svg>`}function v(b){return b.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function wb(){return"pi-web-chat-mounted"}function Wb(){let b=document.createElement("main");return b.className="main pi-web-chat-surface",b.dataset.main="session",b.dataset.pluginChatRoot="",b.innerHTML='<div class="term"><div class="term-inner" role="log" aria-live="polite" aria-relevant="additions text"></div></div><button type="button" class="scroll-bottom-btn" data-action="scroll-bottom" aria-label="stick to bottom" title="stick to bottom" aria-pressed="true" hidden>↓</button>',b}function Bb(){let b=document.createElement("section");return b.className="prompt-region pi-web-chat-composer",b.innerHTML=`
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
    <div class="prompt-meta" data-prompt-meta></div>`,S(b,{}),b}function S(b,p={},w=!1){let f=b.querySelector("[data-prompt-meta]");if(!f)return;let i=[gp(p.model||"—",p.thinkingLevel)],h=Eb("5h",p.fiveHourQuota),L=Eb("Week",p.weeklyQuota),O=p.currentBranch||p.branch||"—";if(p.warning)i.push(xp(p.warning));if(h)i.push(h);if(L)i.push(L);if(i.push(kp(O)),f.innerHTML=i.join(" | "),w)f.append(document.createTextNode(" | "),Pp())}function Pp(){let b=document.createElement("span");return b.className="prompt-meta-item pi-web-chat-badge",b.textContent="chat plugin",b}function kp(b){return`<span class="prompt-meta-item prompt-meta-branch">${vb("git-branch")}<span>${v(b)}</span></span>`}function xp(b){return`<span class="prompt-meta-item prompt-meta-warning" title="${v(b)}">runtime warning</span>`}function gp(b,p){let w=v(b);return p?`${w} (${v(p)})`:w}function Eb(b,p){if(typeof p!=="number"||!Number.isFinite(p))return;let w=Math.max(0,Math.min(100,Math.round(p))),f=w>=70?"full":w>=30?"medium":"low";return`<span class="prompt-meta-item prompt-meta-battery prompt-meta-battery-${f}">${v(b)} ${vb(`battery-${f}`)}(${w}%)</span>`}function vb(b){return{"battery-full":'<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 10v4"></path><path d="M14 10v4"></path><path d="M22 14v-4"></path><path d="M6 10v4"></path><rect x="2" y="6" width="16" height="12" rx="2"></rect></svg>',"battery-medium":'<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 14v-4"></path><path d="M22 14v-4"></path><path d="M6 14v-4"></path><rect x="2" y="6" width="16" height="12" rx="2"></rect></svg>',"battery-low":'<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 14v-4"></path><path d="M6 14v-4"></path><rect x="2" y="6" width="16" height="12" rx="2"></rect></svg>',"git-branch":'<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6a9 9 0 0 0-9 9V3"></path><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle></svg>'}[b]||""}function rp(){let b=document.createElement("section");return b.className="pi-web-chat-root",b.dataset.plugin="pi-web-chat",b.innerHTML=`
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
    </section>`,{root:b,transcript:U(b.querySelector("[data-chat-transcript]")),textarea:U(b.querySelector("[data-chat-input]")),sendButton:U(b.querySelector("[data-send]")),attachButton:U(b.querySelector("[data-attach]")),fileInput:U(b.querySelector("[data-file-input]")),slashPopover:U(b.querySelector("[data-slash-popover]")),slashList:U(b.querySelector("[data-slash-list]")),refsPopover:U(b.querySelector("[data-refs-popover]")),refsList:U(b.querySelector("[data-refs-list]")),attachments:U(b.querySelector("[data-attachments]"))}}function cp(b,p){b.replaceChildren(...p.map(up)),b.scrollTop=b.scrollHeight}function up(b){let p=document.createElement("article");p.className=`pi-web-chat-message pi-web-chat-message-${b.role}`,p.dataset.messageId=b.id;let w=document.createElement("div");w.className="pi-web-chat-message-role",w.textContent=b.role;let f=document.createElement("pre");if(f.className="pi-web-chat-message-body",f.textContent=b.text,p.append(w,f),b.thinking){let i=document.createElement("details");i.className="pi-web-chat-thinking",i.open=Boolean(b.streaming);let h=document.createElement("summary");h.textContent="thinking";let L=document.createElement("pre");L.textContent=b.thinking,i.append(h,L),p.append(i)}if(b.toolCalls?.length){let i=document.createElement("div");i.className="pi-web-chat-tools";for(let h of b.toolCalls){let L=document.createElement("details");L.className=`pi-web-chat-tool pi-web-chat-tool-${h.status}`,L.open=h.status==="running";let O=document.createElement("summary");O.textContent=`${h.name} · ${h.status}`;let T=document.createElement("pre");T.textContent=h.text||fb(h),L.append(O,T),i.append(L)}p.append(i)}if(b.streaming){let i=document.createElement("div");i.className="pi-web-chat-message-meta",i.textContent="streaming...",p.append(i)}if(b.attachments?.length){let i=document.createElement("div");i.className="pi-web-chat-message-meta",i.textContent=`${b.attachments.length} attachment(s)`,p.append(i)}return p}function m(b){if(b.argsStatus==="truncated")return"arguments truncated";if(b.argsStatus==="omitted")return"arguments omitted";if(b.argsStatus==="unavailable")return"arguments unavailable";if(b.argsStatus==="empty")return"no arguments";if(!b.args)return"";return JSON.stringify(b.args)}function fb(b){if(b.argsStatus==="truncated")return"arguments truncated: too large to display";if(b.argsStatus==="omitted")return"arguments omitted: response too large";if(b.argsStatus==="unavailable")return"arguments unavailable";if(b.argsStatus==="empty")return"no arguments";if(!b.args)return"arguments unavailable";return JSON.stringify(b.args,null,2)}function Ip(b,p){b.root.dataset.composerMode=p,ib(b.attachButton,p)}function Pb(b,p,w){if(b.disabled=p==="steering"||p==="loading"&&!w,b.dataset.mode=p,b.setAttribute("aria-disabled",w?"false":"true"),p==="loading"){let f=w?"send steering message":"loading";b.innerHTML=Mb(f),b.title=f,b.setAttribute("aria-label",f);return}if(p==="steering"){b.innerHTML=Mb("steering"),b.title="steering message pending",b.setAttribute("aria-label","steering message pending");return}b.innerHTML=B.send,b.title="send",b.setAttribute("aria-label","send")}function ib(b,p){if(b.disabled=p==="shell",b.setAttribute("aria-disabled",p==="shell"?"true":"false"),p==="shell"){b.innerHTML=B.terminal,b.title="shell command mode",b.setAttribute("aria-label","shell command mode");return}if(p==="file-ref"){b.innerHTML=M("file",K.file),b.title="file reference mode",b.setAttribute("aria-label","file reference mode");return}b.innerHTML=B.attachFile,b.title="attach files",b.setAttribute("aria-label","attach files")}function hb(b,p){b.hidden=p.length===0,b.replaceChildren(...p.map((w)=>{let f=document.createElement("span");return f.className="pi-web-chat-attachment-chip",f.textContent=w,f}))}function kb(){return`
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

    .pi-web-chat-surface .msg.pending-steering {
      align-items: center;
      margin-bottom: 10px;
      opacity: 0.62;
    }

    .pi-web-chat-surface .pending-steering-text {
      font-size: var(--text-sm, 13px);
      color: var(--fg-3, #8b8b8b);
    }

    .pi-web-chat-surface .pending-steering-cancel {
      border: 0;
      background: transparent;
      color: var(--fg-3, #8b8b8b);
      cursor: pointer;
      font: inherit;
      line-height: 1;
      padding: 2px 6px;
    }

    .pi-web-chat-surface .pending-steering-cancel:hover,
    .pi-web-chat-surface .pending-steering-cancel:focus-visible {
      color: var(--fg-1, #d4d4d4);
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

    .pi-web-chat-composer .composer-spinner {
      animation: pi-web-chat-composer-spin 800ms linear infinite;
      border: 2px solid currentColor;
      border-radius: 999px;
      border-right-color: transparent;
      display: inline-block;
      height: 16px;
      width: 16px;
    }

    @keyframes pi-web-chat-composer-spin {
      to { transform: rotate(360deg); }
    }

    @media (prefers-reduced-motion: reduce) {
      .pi-web-chat-composer .composer-spinner {
        animation: none;
      }
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
      animation: pi-web-chat-terminal-spinner 900ms linear infinite;
      color: currentColor;
      display: inline-flex;
      font-size: 0.9em;
      height: 0.3em;
      justify-content: center;
      line-height: 1;
      opacity: 0;
      width: 0.42ch;
    }

    .pi-web-chat-composer .spinner span::before,
    .pi-web-chat-surface .spinner span::before { content: "."; }
    .pi-web-chat-composer .spinner span:nth-child(1), .pi-web-chat-surface .spinner span:nth-child(1) { grid-column: 1; grid-row: 1; }
    .pi-web-chat-composer .spinner span:nth-child(2), .pi-web-chat-surface .spinner span:nth-child(2) { animation-delay: -150ms; grid-column: 2; grid-row: 1; }
    .pi-web-chat-composer .spinner span:nth-child(3), .pi-web-chat-surface .spinner span:nth-child(3) { animation-delay: -300ms; grid-column: 2; grid-row: 2; }
    .pi-web-chat-composer .spinner span:nth-child(4), .pi-web-chat-surface .spinner span:nth-child(4) { animation-delay: -450ms; grid-column: 2; grid-row: 3; }
    .pi-web-chat-composer .spinner span:nth-child(5), .pi-web-chat-surface .spinner span:nth-child(5) { animation-delay: -600ms; grid-column: 1; grid-row: 3; }
    .pi-web-chat-composer .spinner span:nth-child(6), .pi-web-chat-surface .spinner span:nth-child(6) { animation-delay: -750ms; grid-column: 1; grid-row: 2; }

    @keyframes pi-web-chat-terminal-spinner {
      0%, 16.66% { opacity: 1; }
      16.67%, 33.33% { opacity: 0.68; }
      33.34%, 50% { opacity: 0.42; }
      50.01%, 66.66% { opacity: 0.24; }
      66.67%, 100% { opacity: 0; }
    }

    @media (prefers-reduced-motion: reduce) {
      .pi-web-chat-composer .spinner span,
      .pi-web-chat-surface .spinner span { animation: none; }
      .pi-web-chat-composer .spinner span:nth-child(1), .pi-web-chat-surface .spinner span:nth-child(1) { opacity: 1; }
      .pi-web-chat-composer .spinner span:nth-child(2), .pi-web-chat-surface .spinner span:nth-child(2) { opacity: 0.68; }
      .pi-web-chat-composer .spinner span:nth-child(3), .pi-web-chat-surface .spinner span:nth-child(3) { opacity: 0.42; }
      .pi-web-chat-composer .spinner span:nth-child(4), .pi-web-chat-surface .spinner span:nth-child(4) { opacity: 0.24; }
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
  `}function xb(){document.getElementById("pi-web-chat-style")?.remove();let b=document.createElement("style");return b.id="pi-web-chat-style",b.textContent=kb(),document.head.append(b),b}function d(b){return b.command||b.cmd||(b.name?`/${b.name}`:"")}function U(b){if(!b)throw Error("pi-web-chat DOM template is invalid");return b}function Sp(b,p,w){return{threadId:b,runId:p,state:{},messages:w,tools:[],context:[]}}function mp(b){let p=[...b.messages].reverse().find((w)=>w.role==="user");return{text:p?.text||"",attachments:p?.attachments||[],sessionId:b.threadId}}function dp(b,p,w){return b.map((f)=>np(f,p,w))}function np(b,p,w){if(b.type==="text.delta")return{type:"TEXT_MESSAGE_CONTENT",threadId:p,runId:w,delta:b.delta||""};if(b.type==="thinking.delta")return{type:"THINKING_MESSAGE_CONTENT",threadId:p,runId:w,delta:b.delta||""};if(b.type==="tool.start")return{type:"TOOL_CALL_START",threadId:p,runId:w,toolCallId:b.toolCallId,payload:gb(b)};if(b.type==="tool.delta")return{type:"TOOL_CALL_ARGS",threadId:p,runId:w,toolCallId:b.toolCallId,delta:b.delta||""};if(b.type==="tool.end")return{type:"TOOL_CALL_END",threadId:p,runId:w,toolCallId:b.toolCallId,payload:gb(b)};return{type:b.type.toUpperCase().replaceAll(".","_"),threadId:p,runId:w,payload:b}}function gb(b){return{name:b.toolName||"tool",args:b.args||{},result:b.result||"",isError:b.isError===!0}}var n="pi-web-chat.sessions.v1";var tb="plugin.pi-web-sidebar.selectedSession",sb="plugin.pi-web-sidebar.event",eb="plugin.pi-web-sidebar.activeSessionId",zb="plugin.pi-web-sidebar.activeWorkspaceId",ap=12,rb=20,g=200,Ab=200,op=8,tp=1e6,sp=64000;var ep=250,b1=100,p1=6,w1=100,P=new Set,$b=new WeakMap,f1={"book-open":'<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',"file-plus":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="M9 15h6"/>',pencil:'<path d="M21.2 6.8 17.2 2.8a2 2 0 0 0-2.8 0L3 14.2V21h6.8L21.2 9.6a2 2 0 0 0 0-2.8z"/><path d="m14 5 5 5"/>',terminal:'<path d="m4 17 6-6-6-6"/><path d="M12 19h8"/>',cpu:'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 15h3"/><path d="M1 9h3"/><path d="M1 15h3"/>',globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 0 20"/><path d="M12 2a15.3 15.3 0 0 0 0 20"/>',search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',braces:'<path d="M8 3H7a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-4a2 2 0 0 1 2-2 2 2 0 0 1-2-2V7a2 2 0 0 0-2-2h-1"/>',"file-text":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',"circle-question-mark":'<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 1 1 5.8 1c-.5 1-1.4 1.5-2.1 2-.6.4-.8.8-.8 2"/><path d="M12 17h.01"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',plug:'<path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a6 6 0 0 1-12 0V8Z"/>',"git-branch":'<line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',"circle-check":'<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',hammer:'<path d="m15 12-8.5 8.5a2.1 2.1 0 0 1-3-3L12 9"/><path d="m17.6 5.4 1.8-1.8"/><path d="m14 7 3 3"/><path d="M5 11 2 8l6-6 3 3"/>',package:'<path d="m7.5 4.3 9 5.2"/><path d="M21 8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>'},lb=new WeakMap,i1={read:"book-open",write:"file-plus",edit:"pencil",ctx_execute:"cpu",ctx_batch_execute:"cpu",ctx_execute_file:"cpu",ctx_search:"cpu",ctx_index:"cpu",ctx_fetch_and_index:"cpu",web_search:"globe",fetch_content:"search",get_search_content:"search",code_search:"braces",document_parse:"file-text",ask_user_question:"circle-question-mark",teams:"users",subagent:"users",mcp:"plug",git:"git-branch"};class bp{#b=[];add(b){if(b)this.#b.push(b);return b}listen(b,p,w){b.addEventListener(p,w),this.add({remove:()=>b.removeEventListener(p,w)})}dispose(){for(let b of this.#b.splice(0).reverse())if(typeof b==="function")b();else if("unsubscribe"in b)b.unsubscribe();else b.remove()}}function h1(b={}){let p=b.app;if(p?.piWebChat?.dispose(),typeof b.mount?.chat!=="function"||typeof b.mount?.composer!=="function")throw Error("pi-web-chat requires modern pi-web mount.chat and mount.composer APIs");return L1(b,p)}function L1(b,p){let w=new bp,f=w.add(xb()),i=Wb(),h=Bb(),L=b.mount?.chat(i,{replace:!0}),O=b.mount?.composer(h,{replace:!0});if(w0(w,i),L)w.add(L);if(O)w.add(O);let T=E(b);W(b,T||void 0);let H=T?.sessionId?X0(T.sessionId):Y0(),$={backendChatToken:0,pendingPromptEchoIds:new Map};if(!T?.sessionId)s(i);else V(i,u(H).messages,H.activeSessionId),t(b,i,H,$,T.sessionId);n1(w,b,i,H,$),_1(w,i,H,$),$1(w,b,h,i,H,$),O1(b,h),p?.classList.add(wb());let l=()=>{if($.runEventsAbort?.abort(),$.sessionEventsAbort?.abort(),w.dispose(),P.clear(),f.remove(),p?.classList.remove(wb()),p?.piWebChat===_)delete p.piWebChat},_={dispose:l};if(p)p.piWebChat=_;return l}function O1(b,p){S(p,{}),T1(b,p)}async function T1(b,p){try{let w=Z(b),f=w.path?{workspacePath:w.path}:{},i=await D(b,"runtimeStatus",f,w.id),h=C(i)?i:{},L=C(h.status)?H1(h.status):void 0;if(!L)return;S(p,L)}catch{}}function H1(b){let p={};if(typeof b.model==="string")p.model=b.model;if(typeof b.modelProvider==="string")p.modelProvider=b.modelProvider;if(typeof b.thinkingLevel==="string")p.thinkingLevel=b.thinkingLevel;if(typeof b.fiveHourQuota==="number")p.fiveHourQuota=b.fiveHourQuota;if(typeof b.weeklyQuota==="number")p.weeklyQuota=b.weeklyQuota;if(typeof b.currentBranch==="string")p.currentBranch=b.currentBranch;if(typeof b.branch==="string")p.branch=b.branch;if(typeof b.warning==="string")p.warning=b.warning;return p}function $1(b,p,w,f,i,h){let L=w.querySelector(".prompt-textarea"),O=w.querySelector(".send-btn"),T=w.querySelector(".attach-btn"),H=w.querySelector(".stop-btn"),$=w.querySelector("[data-file-input]"),l=w.querySelector(".attach-chips"),_=w.querySelector(".shell-attachment-note");if(!L||!O)return;let A=w.querySelector(".prompt-bar"),G=w.querySelector(".slash-pop"),y=w.querySelector(".prompt-file-ref-pop"),R={selectedAttachments:[],shellMode:!1,commands:[]},q=()=>{y1(l,L.value,R)},Q=()=>{z1(A,L,T,_,R)},N=()=>{let F=L.value,z=l1(h),X=Boolean(h.pendingSteering),pb=Boolean(h.activeRunId&&h.activeRunSessionId===i.activeSessionId),Kb=X?"steering":z?"loading":"idle",vp=Boolean(F.trim())&&!X&&!h.resolvingSubmit&&(!z||pb);if(Pb(O,Kb,vp),A)A.dataset.runState=Kb;if(H){let x=Boolean(h.pendingSteering&&!h.pendingSteering.sent);H.hidden=!z&&!x,H.disabled=!1,H.title=x?"cancel steering":"stop response",H.setAttribute("aria-label",x?"cancel steering":"stop response")}if(q(),cb(R),R.shellMode){Lb(G,y);return}J1(p,w,L,F,R.commands,(x)=>{R.commands=x}),R.fileSearchTimer=setTimeout(()=>{G1(p,w,L,L.value)},120)},I=()=>{R.shellMode=!0,Lb(G,y),Q(),q()},Xb=()=>{R.shellMode=!1,Q(),q()},Qb=async(F)=>{F?.preventDefault(),F?.stopImmediatePropagation();let z=L.value.trim();if(N(),h.resolvingSubmit||h.pendingSteering)return;if(h.startingRunSessionId||h.fallbackSubmittingSessionId)return;if(!z){L.value="",N();return}if(h.resolvingSubmit=!0,L.value="",$)$.value="";N();try{if(R.shellMode)Sb(z,[]),await j1(p,f,i,z),Xb();else{let X=[...R.selectedAttachments,...await V1(p,z)];R.selectedAttachments=[],q(),Sb(z,X);let pb=X1(p,f,i,h,z,X,N);h.resolvingSubmit=!1,N(),await pb}}catch(X){if(!Bp(X))V(f,[A1(X)],i.activeSessionId)}finally{h.resolvingSubmit=!1,Q(),N()}};if(b.listen(L,"input",()=>{if(!R.shellMode&&L.value.startsWith("! "))L.value=L.value.slice(2),I();N()}),b.listen(L,"keydown",(F)=>{let z=F;if(z.key===" "&&!R.shellMode&&L.value==="!"&&L.selectionStart===1&&L.selectionEnd===1){z.preventDefault(),L.value="",I(),N();return}if(z.key==="Backspace"&&R.shellMode&&L.value===""){z.preventDefault(),Xb(),N();return}if(z.key==="Escape"){Lb(G,y);return}if(z.key==="Enter"&&(z.metaKey||z.ctrlKey))Qb(z)}),b.listen(O,"click",(F)=>{Qb(F)}),H)b.listen(H,"click",(F)=>{F.preventDefault(),F.stopImmediatePropagation(),R1(p,f,i,h).finally(N),N()});if(T&&$)b.listen(T,"click",()=>{if(!R.shellMode)$.click()}),b.listen($,"change",()=>{N1($,(F)=>{R.selectedAttachments=F,q()})});h.onRunStateChange=N,b.add({remove:()=>{if(cb(R),h.onRunStateChange===N)h.onRunStateChange=void 0}}),Q(),N()}function l1(b){return Boolean(b.activeRunId||b.startingRunSessionId||b.fallbackSubmittingSessionId||b.pendingSteering)}function _1(b,p,w,f){b.listen(p,"click",(i)=>{let L=i.target?.closest?.("[data-action='cancel-steering']");if(!L)return;i.preventDefault(),i.stopPropagation();let O=L.dataset.sessionId||"",T=L.dataset.messageId||"";if(!pp(w,f)&&O&&T)c(w,O,T);if(O&&w.activeSessionId===O)V(p,J(w,O).messages,O)})}async function R1(b,p,w,f){if(f.pendingSteering&&!f.pendingSteering.sent){let O=f.pendingSteering.sessionId;if(pp(w,f),w.activeSessionId===O)V(p,J(w,O).messages,O);return}let i=f.activeRunId,h=f.activeRunSessionId||f.startingRunSessionId||f.fallbackSubmittingSessionId||w.activeSessionId,L=f.activeRunWorkspaceId||Z(b).id;if(!i){f.runEventsAbort?.abort(),f.startingRunSessionId=void 0,f.fallbackSubmittingSessionId=void 0;return}f.runEventsAbort?.abort();try{await Hp(b,i,h,L)}catch(O){globalThis.piWeb?.subject("toast.requested").next({level:"error",message:`stop failed: ${bb(O)}`})}finally{if(f.activeRunId===i)f.activeRunId=void 0,f.activeRunSessionId=void 0,f.activeRunWorkspacePath=void 0,f.activeRunWorkspaceId=void 0}}function pp(b,p){let w=p.pendingSteering;if(!w||w.sent)return!1;return clearTimeout(w.timeout),w.controller.abort(),p.pendingSteering=void 0,c(b,w.sessionId,w.messageId),!0}function y1(b,p,w){if(!b)return;if(w.shellMode){hb(b,[]);return}hb(b,[...w.selectedAttachments.map((f)=>f.name||"attachment"),...wp(p)])}function z1(b,p,w,f,i){if(b?.classList.toggle("shell-mode",i.shellMode),p.setAttribute("placeholder",i.shellMode?"run shell command in workspace…":"ask pi to do something…"),f)f.hidden=!(i.shellMode&&i.selectedAttachments.length>0);if(w)ib(w,i.shellMode?"shell":"normal")}function cb(b){if(b.fileSearchTimer)clearTimeout(b.fileSearchTimer),b.fileSearchTimer=void 0}function Lb(b,p){b?.setAttribute("hidden",""),p?.setAttribute("hidden","")}function A1(b){return{id:Y(),role:"system",text:`prompt failed: ${bb(b)}`,createdAt:Date.now()}}async function N1(b,p){let w=Array.from(b.files||[]).slice(0,op),f=[];for(let i of w){if(i.size>tp)continue;f.push({name:i.name,size:i.size,content:await i.text(),mimeType:i.type||void 0})}p(f)}async function j1(b,p,w,f){let i=zp(b,w),h=J(w,i),L={id:Y(),role:"user",text:`! ${f}`,createdAt:Date.now()},O={id:Y(),role:"tool",text:`$ ${f}
(running...)`,createdAt:Date.now()};h.messages.push(L,O),h.updatedAt=Date.now(),j(w),V(p,h.messages,i);try{let T=await D(b,"runShell",{command:f}),H=typeof T.exitCode==="number"?T.exitCode:1,$=typeof T.durationMs==="number"?T.durationMs:0,l=typeof T.output==="string"?T.output:"";O.text=Z1(f,l,H,$,Boolean(T.truncated))}catch(T){O.text=`$ ${f}
${bb(T)}`}h.updatedAt=Date.now(),j(w),V(p,h.messages,i)}async function V1(b,p){let w=wp(p);if(!w.length)return[];let f=await D(b,"resolveContext",{text:p,refs:w});return Array.isArray(f.attachments)?f.attachments.filter(C):[]}function Z1(b,p,w,f,i){let h=F1(p,sp),L=i||h.truncated,O=h.text.endsWith(`
`)||!h.text?"":`
`;return`$ ${b}
${h.text}${O}[exit ${w} · ${f}ms${L?" · truncated":""}]`}function F1(b,p){let w=new TextEncoder,f=w.encode(b);if(f.byteLength<=p)return{text:b,truncated:!1};let i=new TextDecoder().decode(f.slice(0,p));while(i&&w.encode(i).byteLength>p)i=i.slice(0,-1);return{text:i,truncated:!0}}async function J1(b,p,w,f,i,h){let L=p.querySelector(".slash-pop"),O=p.querySelector(".slash-list"),T=J0(f);if(T===null||!O){L?.setAttribute("hidden","");return}let H=i;if(!H.length){let l=await D(b,"commands",{});H=Array.isArray(l.commands)?l.commands.filter(C):[],h(H)}if(w.value!==f)return;let $=H.filter((l)=>{return d(l).slice(1).toLowerCase().includes(T)});q1(O,$,w,L),L?.toggleAttribute("hidden",$.length===0)}async function G1(b,p,w,f){let i=p.querySelector(".prompt-file-ref-pop"),h=p.querySelector(".prompt-file-ref-list"),L=G0(f);if(L===null||!h){i?.setAttribute("hidden","");return}try{let O=await D(b,"searchFiles",{query:L,limit:ap}),T=Array.isArray(O.files)?O.files.filter(C):[];if(w.value!==f)return;C1(h,w,T,i),i?.toggleAttribute("hidden",T.length===0)}catch{i?.setAttribute("hidden","")}}function q1(b,p,w,f){b.replaceChildren(...p.map((i)=>{let h=document.createElement("button"),L=d(i);return h.type="button",h.className="slash-item",h.dataset.slash=L,h.innerHTML='<span class="sl-name"></span><span class="sl-desc"></span>',h.querySelector(".sl-name").textContent=L,h.querySelector(".sl-desc").textContent=i.description||"",h.addEventListener("click",()=>{w.value=i.template||`${L} `,f?.setAttribute("hidden",""),w.dispatchEvent(new(w.ownerDocument.defaultView?.Event||Event)("input",{bubbles:!0})),w.focus()}),h}))}function C1(b,p,w,f){b.replaceChildren(...w.map((i)=>{let h=i.path||i.name||"",L=document.createElement("button");return L.type="button",L.className="prompt-file-ref-item",L.dataset.path=h,L.disabled=!h,L.innerHTML='<span class="pfr-path"></span><span class="pfr-kind"></span>',L.querySelector(".pfr-path").textContent=h,L.querySelector(".pfr-kind").textContent=typeof i.size==="number"?`${i.size} bytes`:"file",L.addEventListener("click",()=>{U1(p,h),f?.setAttribute("hidden","")}),L}))}function U1(b,p){if(!p)return;let{value:w,selectionStart:f}=b,i=w.slice(0,f),h=/(?:^|\s)@([^\s@`]*)$/.exec(i),L=h?f-(h[1]||"").length-1:f,O=`@${p} `;b.value=`${w.slice(0,L)}${O}${w.slice(f)}`;let T=L+O.length;b.setSelectionRange(T,T),b.dispatchEvent(new(b.ownerDocument.defaultView?.Event||Event)("input",{bubbles:!0})),b.focus()}function c0(b){return{input$:b.behaviorSubject("chat.input",""),submitted$:b.subject("chat.input.submitted"),activeSessionId$:b.behaviorSubject("session.activeId",null),sidebarSelectedSession$:b.behaviorSubject(tb,D1()),toastRequested$:b.subject("toast.requested")}}function wp(b){let p=[],w=new Set,f=/(^|[\s`])@([^\s@`]+)/g,i=f.exec(String(b||""));while(i!==null){let h=i[2]||"";if((i[1]||"")!=="`"&&h&&!w.has(h))w.add(h),p.push(h);i=f.exec(String(b||""))}return p}function u0(b=[],p=[]){let w=[],f=new Set;for(let i of[...b,...p]){let h=d(i);if(!h||f.has(h))continue;f.add(h),w.push(i)}return w}function o(b){return b.app?.piWebSidebar?.getSnapshot?.().activeWorkspaceId||b.app?.dataset.activeWorkspaceId||""}function D1(){return E({})}function E(b){let p=b.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),w=p?.activeSessionId||"",f=p?.activeWorkspaceId||"";if(w&&b.app?.dataset.clearedSessionId!==w)return{sessionId:w,workspaceId:f||void 0};return null}function W(b,p){if(p?.workspaceId&&b.app)b.app.dataset.activeWorkspaceId=p.workspaceId,ub(zb,p.workspaceId);if(p?.sessionId)delete b.app?.dataset.clearedSessionId,b.app?.setAttribute("data-active-session-id",p.sessionId),ub(eb,p.sessionId)}function fp(b){let p=E(b);if(p?.sessionId&&b.app)b.app.dataset.clearedSessionId=p.sessionId;b.app?.removeAttribute("data-active-session-id"),Y1(eb),globalThis.piWeb?.behaviorSubject("session.activeId",null).next(null)}function r(b,p,w={}){let f=b.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),i={type:p,detail:w,snapshot:f};(b.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$)?.next(i),globalThis.piWeb?.subject(sb).next(i)}function Nb(b,p,w){let f=b.app?.dataset.activeWorkspaceId||o(b),i={reason:w,sessionId:p,workspaceId:f};globalThis.piWeb?.behaviorSubject("session.activeId",p).next(p),r(b,"active.start",i),r(b,"session.created",i)}function jb(b,p){globalThis.piWeb?.subject("session.changed").next({sessionId:b,name:p,title:p})}function Vb(b){if(b.title!=="New chat")return"";let w=b.messages.find((f)=>f.role==="user")?.text.slice(0,48)||"";if(!w)return"";return b.title=w,w}function ub(b,p){try{localStorage.setItem(b,p)}catch{}}function Y1(b){try{localStorage.removeItem(b)}catch{}}async function D(b,p,w={},f=o(b)){if(!b.backend)return{};let i=await b.backend(p,{workspaceId:f,data:w});return C(i)?i:{}}function _b(b){let p=Array.isArray(b.warnings)?b.warnings.filter((w)=>typeof w==="string"&&w.trim().length>0):[];for(let w of p)globalThis.piWeb?.subject("toast.requested").next({level:"warning",message:w})}function I0(b,p){return b.trim().startsWith("!")?[]:[...p]}async function X1(b,p,w,f,i,h,L=()=>{}){let O=zp(b,w),T=Z(b);if(f.activeRunId&&f.activeRunSessionId===O){let R=f.activeRunWorkspacePath||T.path,q=f.activeRunWorkspaceId||T.id;await Q1(b,p,w,f,i,h,R,q,L);return}if(f.startingRunSessionId===O||f.fallbackSubmittingSessionId===O)return;f.backendChatToken+=1,f.startingRunSessionId=O,L(),f.runEventsAbort?.abort();let H=new AbortController;f.runEventsAbort=H,f.sessionEventsAbort?.abort();let $={id:Y(),role:"user",text:i,attachments:Db(h),createdAt:Date.now()},l=J(w,O);Yp(f.pendingPromptEchoIds,O,$.id),l.messages.push($),l.updatedAt=Date.now(),j(w),V(p,l.messages,O);let _;try{_=await k1(b,i,h,O,T.path,T.id)}catch(R){throw f.startingRunSessionId=void 0,L(),R}if(H.signal.aborted){if(f.startingRunSessionId=void 0,typeof _.runId==="string"&&_.runId)await Hp(b,_.runId,O,T.id);c(w,O,$.id),L();return}if(_b(_),typeof _.activeSessionId==="string"&&_.activeSessionId){let R=O,q=w.activeSessionId===R;if(O=_.activeSessionId,q)k(w,O),W(b,{sessionId:_.activeSessionId,workspaceId:T.id||void 0}),r(b,"chat-session",{reason:"startPrompt",sessionId:_.activeSessionId}),Nb(b,_.activeSessionId,"startPrompt");else J(w,O);Xp(w,R,O,$.id),U0(f.pendingPromptEchoIds,R,O)}if(typeof _.runId!=="string"||!_.runId){f.startingRunSessionId=void 0,f.fallbackSubmittingSessionId=O,L();let R;try{R=await x1(b,i,h,O,T.path,T.id)}catch(I){throw f.fallbackSubmittingSessionId=void 0,L(),I}if(H.signal.aborted){f.fallbackSubmittingSessionId=void 0,c(w,O,$.id),L();return}_b(R);let q=typeof R.activeSessionId==="string"&&R.activeSessionId?R.activeSessionId:O,Q=Cb(f.pendingPromptEchoIds,O),N=d1(b,w,R,"submitPrompt",O,Q);if(Ub(f.pendingPromptEchoIds,q,N,R.messages,Q),w.activeSessionId===O||w.activeSessionId===q)V(p,N,w.activeSessionId);if(f.runEventsAbort===H)f.runEventsAbort=void 0;f.startingRunSessionId=void 0,f.fallbackSubmittingSessionId=void 0,L();return}let A=J(w,O);f.activeRunId=_.runId,f.activeRunSessionId=O,f.activeRunWorkspacePath=T.path,f.activeRunWorkspaceId=T.id,f.startingRunSessionId=void 0,L();let G=Vb(A);if(G)j(w),jb(O,G);let y=r1(A);try{await E1(b,w,A,_.runId,T.path,T.id,y,()=>{if(!H.signal.aborted&&w.activeSessionId===O)V(p,A.messages,O)},H.signal)}finally{if(f.activeRunId===_.runId)f.activeRunId=void 0,f.activeRunSessionId=void 0,f.activeRunWorkspacePath=void 0,f.activeRunWorkspaceId=void 0,f.startingRunSessionId=void 0,f.fallbackSubmittingSessionId=void 0,L();if(f.runEventsAbort===H)f.runEventsAbort=void 0}if(!H.signal.aborted&&w.activeSessionId===O)t(b,p,w,f,O,T.path,T.id)}async function Q1(b,p,w,f,i,h,L,O,T=()=>{}){let{activeRunId:H,activeRunSessionId:$}=f;if(!H||!$)throw Error("active run is unavailable for steering");if(f.pendingSteering)return;let l={id:Y(),role:"user",text:i,attachments:Db(h),createdAt:Date.now(),meta:{piWebChatSteeringState:"pending"}},_=J(w,$),A=new AbortController,G=K1(A.signal,()=>{let y=f.pendingSteering;if(y){if(y.sent=!0,M1(w,y.sessionId,y.messageId),w.activeSessionId===y.sessionId)V(p,J(w,y.sessionId).messages,y.sessionId);T()}});if(f.pendingSteering={sessionId:$,messageId:l.id,timeout:G.timeout,controller:A,sent:!1},Yp(f.pendingPromptEchoIds,$,l.id),_.messages.push(l),_.updatedAt=Date.now(),j(w),w.activeSessionId===$)V(p,_.messages,$);T();try{if(await G.promise,A.signal.aborted)return;let y=await g1(b,H,i,h,$,L,O);_b(y)}catch(y){if(Bp(y))return;if(c(w,$,l.id),C0(f.pendingPromptEchoIds,$,l.id),Tp(y)){V(p,_.messages,$),globalThis.piWeb?.subject("toast.requested").next({level:"error",message:"This backend does not support steering while a response is streaming."});return}throw y}finally{if(f.pendingSteering?.controller===A)f.pendingSteering=void 0,T()}}function K1(b,p){let w,f=new Promise((i,h)=>{w=setTimeout(()=>{p(),i()},w1),b.addEventListener("abort",()=>{clearTimeout(w),h(new DOMException("Steering cancelled","AbortError"))},{once:!0})});return{timeout:w,promise:f}}function c(b,p,w){let f=b.sessions.find((i)=>i.id===p);if(!f)return;f.messages=f.messages.filter((i)=>i.id!==w),Qp(b,f.id),j(b)}function M1(b,p,w){let f=J(b,p).messages.find((i)=>i.id===w);if(!f?.meta)return;if(delete f.meta.piWebChatSteeringState,Object.keys(f.meta).length===0)delete f.meta;j(b)}async function E1(b,p,w,f,i,h,L,O,T){let H=await hp(b,"streamEventsSse",{runId:f,cursor:0,workspacePath:i},T,h);if(!H)throw Error("SSE streaming backend did not return a stream");let $=ip(O),l=W1(p,b1);L.streaming=!0,$.flush();try{await Lp(H,(_)=>{c1(L,[_]),L.streaming=_.type!=="run.end",w.updatedAt=Date.now(),l.request(),$.request()})}finally{L.streaming=!1,l.flush(),$.flush()}}function W1(b,p){let w=0,f,i=()=>{if(f)clearTimeout(f),f=void 0},h=()=>{i(),w=Date.now(),j(b)};return{request:()=>{let O=p-(Date.now()-w);if(O<=0){h();return}f||=setTimeout(h,O)},flush:h}}function ip(b){let p=0,w,f=()=>{if(w)clearTimeout(w),w=void 0},i=()=>{f(),p=Date.now(),b()};return{request:()=>{let L=ep-(Date.now()-p);if(L<=0){i();return}w||=setTimeout(i,L)},flush:i,cancel:f}}async function hp(b,p,w={},f,i=o(b)){if(!b.backendStream)throw Error("SSE streaming backend is unavailable");let h=await b.backendStream(p,{workspaceId:i,data:w},{signal:f});return B1(h)}function B1(b){if(typeof ReadableStream<"u"&&b instanceof ReadableStream)return b;if(typeof Response<"u"&&b instanceof Response)return b.body;if(typeof b==="string")return Ib(b);if(!C(b))return null;let p=b.body;if(typeof ReadableStream<"u"&&p instanceof ReadableStream)return p;let w=b.sse;if(typeof w==="string")return Ib(w);return null}function Ib(b){let p=new TextEncoder().encode(b);return new ReadableStream({start(w){w.enqueue(p),w.close()}})}async function Lp(b,p){let w=b.getReader(),f=new TextDecoder,i="";while(!0){let h=await w.read();if(h.done){i+=f.decode(),P1(i,p);return}i+=f.decode(h.value,{stream:!0});let L=v1(i);i=L.remainder;for(let O of L.frames)Op(O,p)}}function v1(b){let w=b.replaceAll(`\r
`,`
`).replaceAll("\r",`
`).split(`

`),f=w.pop()||"";return{frames:w,remainder:f}}function P1(b,p){let w=b.trim();if(w)Op(w,p)}function Op(b,p){let w=b.split(`
`).filter((f)=>f.startsWith("data:")).map((f)=>f.slice(5).trimStart()).join(`
`);if(!w)return;try{let f=JSON.parse(w);if(S1(f))p(f)}catch{}}function Sb(b,p){globalThis.piWeb?.subject("chat.input.submitted").next({text:b,attachments:Db(p)||[]})}async function k1(b,p,w,f,i=Z(b).path,h=Z(b).id){try{return await D(b,"startPrompt",Zb(p,w,f,i),h)}catch(L){if(Tp(L))return{};throw L}}function Tp(b){return/unknown method: (startPrompt|streamEventsSse|steerPrompt)|unsupported method: (startPrompt|streamEventsSse|steerPrompt)|(startPrompt|streamEventsSse|steerPrompt) unsupported/i.test(bb(b))}async function x1(b,p,w,f="",i=Z(b).path,h=Z(b).id){return await D(b,"submitPrompt",Zb(p,w,f,i),h)}async function g1(b,p,w,f,i="",h=Z(b).path,L=Z(b).id){let O={...Zb(w,f,i,h),runId:p};return D(b,"steerPrompt",O,L)}async function Hp(b,p,w="",f=Z(b).id){return D(b,"abortPrompt",{runId:p,sessionId:w},f)}function Zb(b,p,w,f){let i={text:b,attachments:p,sessionId:w};if(f)i.workspacePath=f;return i}function r1(b){let p=[...b.messages].reverse().find((f)=>f.role==="assistant"&&f.streaming);if(p)return p;let w={id:Y(),role:"assistant",text:"",createdAt:Date.now(),streaming:!0};return b.messages.push(w),w}function c1(b,p){for(let w of p)if(w.type==="text.delta"&&typeof w.delta==="string")Ob(b,"text",w.delta),b.text+=w.delta;else if(w.type==="thinking.delta"&&typeof w.delta==="string")Ob(b,"thinking",w.delta),b.thinking=`${b.thinking||""}${w.delta}`;else if(w.type==="tool.start")Tb(b,w,"running");else if(w.type==="tool.delta"&&typeof w.delta==="string"){let f=Tb(b,w,"running");f.text=w.delta}else if(w.type==="tool.end"){let f=Tb(b,w,w.isError?"err":"ok");if(typeof w.result==="string"&&w.result)f.text=w.result}else if(w.type==="error"&&typeof w.message==="string")Ob(b,"text",`${b.text?`
`:""}${w.message}`),b.text+=`${b.text?`
`:""}${w.message}`}function Ob(b,p,w){b.blocks||=[];let f=b.blocks[b.blocks.length-1];if(f?.type===p){f.text+=w;return}if(b.blocks.length<Ab)b.blocks.push({id:Y(),type:p,text:w})}function Tb(b,p,w){let f=p.toolCallId||p.toolName||"tool";b.toolCalls||=[];let i=b.toolCalls.find((h)=>h.id===f);if(!i)i={id:f,name:p.toolName||"tool",args:p.args,text:"",status:w},b.toolCalls.push(i),u1(b,i);if(i.status=w,I1(i,p))i.args=p.args,i.argsStatus=p.argsStatus;return i}function u1(b,p){if(b.blocks||=[],b.blocks.some((w)=>w.type==="tool"&&w.toolCall?.id===p.id))return;if(b.blocks.length<Ab)b.blocks.push({id:Y(),type:"tool",text:"",toolCall:p})}function I1(b,p){if(!p.argsStatus)return Boolean(p.args);if(p.argsStatus==="unavailable")return!b.argsStatus;return!0}function S1(b){return C(b)&&typeof b.type==="string"}async function t(b,p,w,f,i="",h=Fb(b),L=Z(b).id){if(!b.backendStream){await mb(b,p,w,f,i,h);return}let O=++f.backendChatToken;f.sessionEventsAbort?.abort();let T=new AbortController;f.sessionEventsAbort=T;let H=ip(()=>{V(p,u(w).messages,w.activeSessionId)});try{let $=await hp(b,"sessionEventsSse",$p(b,i,h),T.signal,L);if(!$)throw Error("session SSE backend did not return a stream");await Lp($,(l)=>{if(O!==f.backendChatToken||l.type!=="chat.state")return;let _=m1(l),A=typeof _.activeSessionId==="string"?_.activeSessionId:i,G=Cb(f.pendingPromptEchoIds,A),y=Rp(b,w,_,"chatState",G);if(lp(f,_,A,h,L),Ub(f.pendingPromptEchoIds,A,y,_.messages,G),y.length)H.request()})}catch($){if(!T.signal.aborted)await mb(b,p,w,f,i,h)}finally{if(H.cancel(),f.sessionEventsAbort===T)f.sessionEventsAbort=void 0}}async function mb(b,p,w,f,i="",h=Fb(b)){let L=++f.backendChatToken;try{let O=await D(b,"chatState",$p(b,i,h));if(L!==f.backendChatToken)return;let T=typeof O.activeSessionId==="string"?O.activeSessionId:i,H=Cb(f.pendingPromptEchoIds,T),$=Rp(b,w,O,"chatState",H);if(lp(f,O,T,h,Z(b).id),Ub(f.pendingPromptEchoIds,T,$,O.messages,H),$.length)V(p,$,w.activeSessionId)}catch{}}function $p(b,p,w=Fb(b)){let f=p?{sessionId:p}:{};if(w)f.workspacePath=w;return f}function m1(b){return{activeSessionId:b.activeSessionId,messages:b.messages,runId:b.runId,isStreaming:b.isStreaming}}function lp(b,p,w,f,i){if(p.isStreaming===!0&&typeof p.runId==="string"&&p.runId){b.activeRunId=p.runId,b.activeRunSessionId=typeof p.activeSessionId==="string"&&p.activeSessionId?p.activeSessionId:w,b.activeRunWorkspacePath=f,b.activeRunWorkspaceId=i,b.onRunStateChange?.();return}if(p.isStreaming===!1&&(!p.activeSessionId||p.activeSessionId===b.activeRunSessionId))b.activeRunId=void 0,b.activeRunSessionId=void 0,b.activeRunWorkspacePath=void 0,b.activeRunWorkspaceId=void 0,b.onRunStateChange?.()}function Fb(b){return Z(b).path}function Z(b){let p=b.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),w=p?.activeWorkspaceId||b.app?.dataset.activeWorkspaceId||"",f=p?.workspaces?.find((i)=>i.id===w)?.path||"";return{id:w,path:f}}function _p(b,p){let w=b.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),f=p.workspaceId||w?.activeWorkspaceId||b.app?.dataset.activeWorkspaceId||"",i=w?.workspaces?.find((h)=>h.id===f)?.path||"";if(i||f!==w?.activeWorkspaceId)return{id:f,path:i};return Z(b)}function Rp(b,p,w,f,i=""){let h=Yb(w.messages);if(typeof w.activeSessionId==="string"&&w.activeSessionId){let H=p.activeSessionId;if(k(p,w.activeSessionId),W(b,{sessionId:w.activeSessionId,workspaceId:b.app?.dataset.activeWorkspaceId||o(b)||void 0}),f!=="chatState"||H!==w.activeSessionId)r(b,"chat-session",{reason:f,sessionId:w.activeSessionId});if(f!=="chatState")Nb(b,w.activeSessionId,f)}let L=u(p);if(!h.length)return[];let O=Dp(L.messages,h,i).slice(-g);if(!yp(L.messages,O))return[];L.messages=O;let T=Vb(L);if(L.updatedAt=Date.now(),j(p),T)jb(L.id,T);return L.messages}function yp(b,p){if(b.length!==p.length)return!0;return b.some((w,f)=>Rb(w)!==Rb(p[f]))}function Rb(b){return JSON.stringify({id:b.id,role:b.role,text:b.text,blocks:b.blocks,thinking:b.thinking,streaming:b.streaming,toolCalls:b.toolCalls,attachments:b.attachments})}function d1(b,p,w,f,i,h=""){let L=Yb(w.messages),O=typeof w.activeSessionId==="string"&&w.activeSessionId?w.activeSessionId:i,T=p.activeSessionId===i;if(O!==i)if(T)k(p,O),W(b,{sessionId:O,workspaceId:Z(b).id||void 0}),r(b,"chat-session",{reason:f,sessionId:O}),Nb(b,O,f);else J(p,O);let H=Array.isArray(h)?h:[h].filter(Boolean);if(O!==i)for(let A of H)Xp(p,i,O,A);let $=J(p,O);if(!L.length)return[];let l=Dp($.messages,L,h).slice(-g);if(!yp($.messages,l))return[];$.messages=l;let _=Vb($);if($.updatedAt=Date.now(),j(p),_)jb($.id,_);return $.messages}function n1(b,p,w,f,i){let h=(H,$)=>{if(!H?.sessionId){if(!$)db(p,w,f,i,!0);return}if(Ap(p,f,H))return;W(p,H),k(f,H.sessionId),V(w,u(f).messages,f.activeSessionId);let l=_p(p,H);t(p,w,f,i,H.sessionId,l.path,l.id)},L=(H)=>{if(a1(p,w,f,i,H))return;let $=t1(p,H);if($)h($,!1)},O=p.app?.piWebSidebar?.channels?.selectedSession$||globalThis.piWebSidebar?.channels?.selectedSession$,T=p.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$;if(O){let H=!0;b.add(O.subscribe(($)=>{h($,H),H=!1}))}if(T)b.add(T.subscribe(L));if(p.app)b.listen(p.app,"pi-web-sidebar:session-created",(H)=>{let $=H.detail||{},l=typeof $.sessionId==="string"?$.sessionId:"",_=typeof $.workspaceId==="string"?$.workspaceId:"";if(l)h({sessionId:l,workspaceId:_||void 0},!1)});if(globalThis.piWeb){let H=!0;b.add(globalThis.piWeb.behaviorSubject(tb,E(p)).subscribe((l)=>{h(l,H),H=!1})),b.add(globalThis.piWeb.subject(sb).subscribe(L));let $=!0;b.add(globalThis.piWeb.behaviorSubject("session.activeId",null).subscribe((l)=>{if(!l){if(!$)db(p,w,f,i,!1);$=!1;return}$=!1,h({sessionId:l,workspaceId:p.app?.dataset.activeWorkspaceId||Kp(zb)||void 0},!1)}))}}function db(b,p,w,f,i){if(f.backendChatToken+=1,f.runEventsAbort?.abort(),f.sessionEventsAbort?.abort(),w.activeSessionId="",j(w),i)fp(b);else{let h=E(b);if(h?.sessionId&&b.app)b.app.dataset.clearedSessionId=h.sessionId}s(p)}function zp(b,p){let w=E(b);if(w?.sessionId&&!Ap(b,p,w))W(b,w),k(p,w.sessionId);if(!p.activeSessionId)return J(p,"",!0).id;return p.activeSessionId}function Ap(b,p,w){let f=w.workspaceId||"",i=b.app?.dataset.activeWorkspaceId||Kp(zb)||"";return p.activeSessionId===w.sessionId&&(!f||f===i)}function a1(b,p,w,f,i){if(i.type!=="session.deleted")return!1;let h=Np(i);if(!h)return!0;let L=w.activeSessionId===h,O=w.sessions.length;if(w.sessions=w.sessions.filter((T)=>T.id!==h),L){f.runEventsAbort?.abort(),f.sessionEventsAbort?.abort();let T=o1(b,i,h);if(T?.sessionId){W(b,T),k(w,T.sessionId),e1(p,u(w).messages,w.activeSessionId);let H=_p(b,T);return t(b,p,w,f,T.sessionId,H.path,H.id),!0}return w.activeSessionId="",fp(b),j(w),s(p),!0}if(w.sessions.length!==O)j(w);return!0}function o1(b,p,w){let f=p.snapshot?.activeSessionId||"",i=p.snapshot?.activeWorkspaceId||"";if(f&&f!==w)return{sessionId:f,workspaceId:i||void 0};let h=E(b);if(h?.sessionId&&h.sessionId!==w)return h;return null}function t1(b,p){if(!s1(p.type))return null;let w=p.detail||{},f=Np(p)||p.snapshot?.activeSessionId||"",i=typeof w.workspaceId==="string"?w.workspaceId:p.snapshot?.activeWorkspaceId||b.app?.dataset.activeWorkspaceId||"";if(!f)return null;return{sessionId:f,workspaceId:i||void 0}}function Np(b){let p=b.detail||{};if(typeof p.sessionId==="string")return p.sessionId;if(typeof p.id==="string")return p.id;return""}function s1(b){return b==="session.selected"||b==="session.created"||b==="new-session"||b==="active.start"}function k(b,p){let w=b.sessions.find((f)=>f.id===p);if(!w)w=e(p),b.sessions.unshift(w);return b.activeSessionId=w.id,j(b),w}function V(b,p,w){if(Jp(p,w),!p.length){s(b);return}let f=b.querySelector(".term-inner")||b;jp(f,p,w),Jb(b)}function e1(b,p,w){Jp(p,w);let f=b.querySelector(".term-inner")||b;jp(f,p,w),Jb(b)}function jp(b,p,w){let f=p0(b),i=p.map((O)=>{let T=`${w}:${Rb(O)}`,H=f.get(O.id);if(H){if($b.get(H)!==T)b0(H,O,w,T);return H}let $=Zp(O,w);return $b.set($,T),$}),h=new Set(i),L=b.firstChild;for(let O of i){if(L!==O)b.insertBefore(O,L);L=O.nextSibling}for(let O of Array.from(b.children)){if(yb(b,O)&&!h.has(O)){O.remove();continue}if(!yb(b,O))O.remove()}}function b0(b,p,w,f){let i=Zp(p,w);if(b.replaceChildren(...Array.from(i.childNodes)),b.className=i.className,b.dataset.messageId=p.id,p.streaming)b.dataset.streaming="true";else delete b.dataset.streaming;$b.set(b,f)}function p0(b){let p=new Map;for(let w of Array.from(b.children)){if(!yb(b,w))continue;let f=w.dataset.messageId||"";if(f)p.set(f,w)}return p}function yb(b,p){let w=b.ownerDocument.defaultView;return Boolean(w&&p instanceof w.HTMLElement&&p.classList.contains("transcript-item"))}function s(b){let p=b.querySelector(".term-inner")||b,w=document.createElement("article");w.className="pi-web-chat-docs",w.setAttribute("aria-label","pi-web-chat guide");let f=document.createElement("h1");f.textContent="pi-web-chat guide";let i=document.createElement("p");i.textContent=["Select or create a session in the sidebar to load chat history,","or type below to start a new session."].join(" ");let h=document.createElement("ul");for(let L of["Ask pi in the prompt box and press Cmd/Ctrl+Enter to send.","Type ! then Space at the start to turn the prompt yellow and run shell commands in the workspace.","Queued file attachments hide during shell mode and reappear for the next normal prompt.","Type @ to list project files, then pick one to tag it as prompt context.","Type / at the start to open the slash command list.","Chats are cached locally after you start or select a session."]){let O=document.createElement("li");O.textContent=L,h.append(O)}w.append(f,i,h),p.replaceChildren(w),Jb(b)}function w0(b,p){let w=p.querySelector(".term"),f=p.querySelector("[data-action='scroll-bottom']");if(!w||!f)return;let i={term:w,button:f,pinned:!0,touchStartY:null};lb.set(p,i),f.hidden=!1,a(i),b.listen(f,"click",()=>{i.pinned=!0,Vp(i),a(i)}),b.listen(w,"wheel",(h)=>{if(h.deltaY<0)nb(i)}),b.listen(w,"touchstart",(h)=>{let L=h;i.touchStartY=L.touches.item(0)?.clientY??null}),b.listen(w,"touchmove",(h)=>{let O=h.touches.item(0)?.clientY;if(typeof O==="number"&&i.touchStartY!==null&&O-i.touchStartY>8)nb(i)}),b.listen(w,"touchend",()=>{i.touchStartY=null}),b.add({remove:()=>{lb.delete(p)}})}function Jb(b){let p=lb.get(b);if(!p)return;if(p.pinned)Vp(p);a(p)}function Vp(b){b.term.scrollTop=b.term.scrollHeight}function nb(b){b.pinned=!1,a(b)}function a(b){b.button.dataset.pinned=b.pinned?"true":"false",b.button.setAttribute("aria-pressed",b.pinned?"true":"false")}function Zp(b,p){let w=document.createElement("article");if(w.className="transcript-item",w.dataset.messageId=b.id,f0(b))i0(w,b,p);else if(h0(b)){let f=L0(b);if(f)Gb(w,b.role,b.text);H0(w,b,p,f)}else $0(w,b,p);if(b.streaming)w.dataset.streaming="true";return w}function f0(b){return b.role==="user"&&b.meta?.piWebChatSteeringState==="pending"}function i0(b,p,w){let f=document.createElement("div");f.className="msg pending-steering",f.dataset.kind="user";let i=document.createElement("span");i.className="prefix user",i.textContent=Up("user");let h=document.createElement("small");h.className="body user pending-steering-text",h.textContent=p.text;let L=document.createElement("button");L.type="button",L.className="pending-steering-cancel",L.dataset.action="cancel-steering",L.dataset.sessionId=w,L.dataset.messageId=p.id,L.setAttribute("aria-label","cancel steering"),L.title="cancel steering",L.textContent="×",f.append(i,h,L),b.append(f)}function h0(b){return Boolean(b.blocks?.some((p)=>{return p.type==="tool"||p.text.trim().length>0}))}function L0(b){return Boolean(b.text.trim())&&(!O0(b)||T0(b))}function O0(b){return Boolean(b.blocks?.some((p)=>{return p.type==="text"&&p.text.trim().length>0}))}function T0(b){return(b.blocks?.length||0)>=Ab}function H0(b,p,w,f=!1){for(let i of p.blocks||[])if(i.type==="text"){if(!f)Gb(b,p.role,i.text)}else if(i.type==="thinking")b.append(Fp(i.text,Boolean(p.streaming)));else if(i.type==="tool"&&i.toolCall){let h=p.toolCalls?.find((L)=>L.id===i.toolCall?.id)||i.toolCall;b.append(Gp(h,qb(w,p,h)))}}function $0(b,p,w){if(l0(p))Gb(b,p.role,p.text);if(p.thinking)b.append(Fp(p.thinking,Boolean(p.streaming)));for(let f of p.toolCalls||[])b.append(Gp(f,qb(w,p,f)))}function Gb(b,p,w){if(p==="assistant"&&!w.trim())return;let f=document.createElement("div");f.className="msg",f.dataset.kind=Hb(p);let i=document.createElement("span");i.className=`prefix ${Hb(p)}`,i.textContent=Up(p);let h=document.createElement("pre");h.className=`body ${Hb(p)}`,h.textContent=w,f.append(i,h),b.append(f)}function l0(b){let p=b.text.trim().length>0;return b.role!=="assistant"||p}function Fp(b,p){let w=document.createElement("details");w.className="msg-detail think thinking-block",w.open=p;let f=document.createElement("summary");f.className="label",f.textContent="THINKING";let i=document.createElement("pre");return i.className="body",i.textContent=b,w.append(f,i),w}function Jp(b,p){let w=new Set;for(let f of b)for(let i of f.toolCalls||[])w.add(qb(p,f,i));for(let f of P)if(!w.has(f))P.delete(f)}function qb(b,p,w){return`${b}:${p.id}:${w.id}`}function Gp(b,p){let w=document.createElement("div");w.className="tool-card",w.dataset.tool=b.name||"tool",w.dataset.status=b.status;let f=!P.has(p);w.dataset.collapsed=f?"true":"false";let i=document.createElement("button");if(i.type="button",i.className="tc-head",i.title=f?"Show tool output":"Hide tool output",i.setAttribute("aria-expanded",f?"false":"true"),i.setAttribute("aria-label",qp(b,f)),i.append(z0(b),A0(b),N0(b),j0(b,f)),!f)w.append(Cp(b));return i.addEventListener("click",()=>y0(w,i,b,p)),w.prepend(i),w}function qp(b,p){let w=p?"Show":"Hide",f=b.status==="running"?"running":b.status==="err"?"failed":"done",i=_0(b),h=i?`, ${i}`:"";return`${w} ${b.name||"tool"} output, ${f}${h}`}function _0(b){if(b.argsStatus==="present")return"arguments present";if(b.argsStatus)return m(b);return b.args?"arguments present":""}function Cp(b){let p=document.createElement("pre");return p.className="tc-body",p.textContent=b.text||fb(b),p}function R0(){let b=document.createElement("span");b.className="spinner",b.setAttribute("aria-hidden","true");for(let p=0;p<p1;p+=1)b.append(document.createElement("span"));return b}function y0(b,p,w,f){let i=b.querySelector(".tc-body"),h=i!==null;if(i)i.remove(),P.delete(f);else b.append(Cp(w)),P.add(f);b.dataset.collapsed=h?"true":"false",p.setAttribute("aria-expanded",h?"false":"true"),p.setAttribute("aria-label",qp(w,h)),p.title=h?"Show tool output":"Hide tool output";let L=p.querySelector(".tc-toggle-label");if(L)L.textContent=h?"show":"hide"}function z0(b){let p=document.createElement("span");p.className="tc-glyph";let w=V0(b),f=w?f1[w]:"";if(!w||!f)return p.textContent="●",p;return p.innerHTML=`<svg class="tc-icon" data-tool-icon="${w}" aria-hidden="true" viewBox="0 0 24 24">${f}</svg>`,p}function A0(b){let p=document.createElement("span");return p.className="tc-name",p.textContent=b.name||"tool",p}function N0(b){let p=document.createElement("span");return p.className="tc-args",p.textContent=m(b),p}function j0(b,p){let w=document.createElement("span");if(w.className="tc-meta",b.status==="running"){let h=R0(),L=document.createElement("span");return L.className="running",L.textContent="running",w.append(h,L,ab(p)),w}let f=document.createElement("span");f.className=b.status==="err"?"err":"ok",f.textContent=b.status==="err"?"✗":"✓";let i=document.createElement("span");return i.textContent=b.status==="err"?" · failed":" · done",w.append(f,i,ab(p)),w}function ab(b){let p=document.createElement("span");p.className="tc-toggle";let w=document.createElement("span");w.className="tc-toggle-label",w.textContent=b?"show":"hide";let f=document.createElement("span");return f.className="tc-caret",f.textContent="▸",p.append(w,f),p}function V0(b){let p=Z0(b.name);if(["bash","shell","sh","zsh","terminal"].includes(p))return F0(m(b).toLowerCase())||"terminal";return i1[p]}function Z0(b){return b.trim().replace(/^functions\./,"").replace(/^multi_tool_use\./,"")}function F0(b){if(/\bgit\b|\bgh\b/.test(b))return"git-branch";if(/\b(go test|bun test|npm test|pnpm test|yarn test|vitest|pytest|cargo test)\b/.test(b))return"circle-check";if(/\b(bun|npm|pnpm|yarn)\s+(run\s+)?build\b|\b(go build|cargo build)\b/.test(b))return"hammer";if(/\b(bun|npm|pnpm|yarn)\s+(add|install|i)\b|\bpip\s+install\b|\bgo\s+get\b/.test(b))return"package";return}function Up(b){if(b==="assistant")return"pi >";if(b==="user")return"you >";if(b==="system")return"sys >";return"tool >"}function Hb(b){if(b==="assistant")return"pi";if(b==="system")return"sys";return b}function J0(b){let p=/^\/([^\s/]*)$/.exec(b);return p?p[1].toLowerCase():null}function G0(b){let p=/(?:^|\s)@([^\s@`]*)$/.exec(b);return p?p[1]:null}function S0(b){return b.length>0}function m0(b,p){return b.trim().startsWith("!")&&p}function Dp(b,p,w=""){let f=Array.isArray(w)?w:[w].filter(Boolean),i=new Map,h=new Map,L=0;for(let T of b)i.set(T.id,T),h.set(T.id,L++);let O=new Set;for(let T of p){let H=q0(b,T,f,O);if(H){O.add(H.id),i.delete(H.id),i.set(T.id,T),h.set(T.id,h.get(H.id)??L++);continue}if(!h.has(T.id))h.set(T.id,L++);i.set(T.id,{...i.get(T.id),...T})}return[...i.values()].sort((T,H)=>{let $=T.createdAt-H.createdAt;if($!==0)return $;return(h.get(T.id)??0)-(h.get(H.id)??0)})}function q0(b,p,w,f){if(!w.length||p.role!=="user"||!p.text.trim())return;if(b.some((h)=>h.id===p.id))return;let i=b.find((h)=>{return w.includes(h.id)&&!f.has(h.id)&&h.text.trim()===p.text.trim()});if(i?.role!==p.role||i.text.trim()!==p.text.trim())return;return i}function Yp(b,p,w){b.set(p,[...b.get(p)||[],w])}function Cb(b,p){return b.get(p)||[]}function C0(b,p,w){let f=(b.get(p)||[]).filter((i)=>i!==w);if(f.length){b.set(p,f);return}b.delete(p)}function U0(b,p,w){let f=b.get(p)||[];if(!f.length)return;b.delete(p),b.set(w,[...b.get(w)||[],...f])}function Ub(b,p,w,f,i){if(!i.length||!w.length)return;let h=i.filter((L)=>{return w.some((O)=>O.id===L)});if(h.length){b.set(p,h);return}b.delete(p)}function u(b){return J(b,b.activeSessionId,!0)}function J(b,p,w=!1){let f=b.sessions.find((i)=>i.id===p);if(!f)f=e(p||void 0),b.sessions.unshift(f),j(b);if(w||!b.activeSessionId)b.activeSessionId=f.id,j(b);return f}function Xp(b,p,w,f){if(p===w)return;let i=b.sessions.find((T)=>T.id===p),h=i?.messages.findIndex((T)=>T.id===f)??-1;if(!i||h<0)return;let[L]=i.messages.splice(h,1),O=J(b,w);if(!O.messages.some((T)=>T.id===L.id))O.messages.push(L);i.updatedAt=Date.now(),O.updatedAt=Date.now(),Qp(b,i.id),j(b)}function Qp(b,p){let w=b.sessions.find((f)=>f.id===p);if(!w||w.id===b.activeSessionId||w.messages.length>0||w.title!=="New chat")return;b.sessions=b.sessions.filter((f)=>f.id!==w.id)}function e(b=Y()){let p=Date.now();return{id:b,title:"New chat",createdAt:p,updatedAt:p,messages:[]}}function Kp(b){try{return localStorage.getItem(b)||""}catch{return""}}function D0(b){let p=e(b);return{activeSessionId:p.id,sessions:[p]}}function Y0(){try{let b=JSON.parse(localStorage.getItem(n)||"null");if(b&&Array.isArray(b.sessions))return{activeSessionId:"",sessions:b.sessions.filter(Mp).map(Ep)}}catch{}return{activeSessionId:"",sessions:[]}}function X0(b=""){try{let p=JSON.parse(localStorage.getItem(n)||"null");if(p&&typeof p.activeSessionId==="string"&&Array.isArray(p.sessions)){let w=p.sessions.filter(Mp).map(Ep);if(b&&!w.some((f)=>f.id===b))w.unshift(e(b));return{activeSessionId:b||p.activeSessionId,sessions:w}}}catch{}return D0(b||void 0)}function j(b){ob(b);try{localStorage.setItem(n,JSON.stringify(b))}catch{for(let p of b.sessions)p.messages=p.messages.slice(-Math.floor(g/2));ob(b);try{localStorage.setItem(n,JSON.stringify(b))}catch{}}}function Db(b){if(!b?.length)return;return b.map(({content:p,...w})=>w)}function ob(b){b.sessions.sort((f,i)=>i.updatedAt-f.updatedAt);let p=b.sessions.find((f)=>f.id===b.activeSessionId),w=b.sessions.filter((f)=>f.id!==b.activeSessionId).slice(0,Math.max(0,rb-1));b.sessions=p?[p,...w]:b.sessions.slice(0,rb);for(let f of b.sessions)if(f.messages.length>g)f.messages.splice(0,f.messages.length-g)}function Mp(b){return C(b)&&typeof b.id==="string"&&Array.isArray(b.messages)}function Ep(b){return{...b,messages:Yb(b.messages)}}function Yb(b){return Array.isArray(b)?b.filter(B0).map(Q0):[]}function Q0(b){let p={...b};if(Array.isArray(b.toolCalls))p.toolCalls=b.toolCalls.filter(Wp);else delete p.toolCalls;if(Array.isArray(b.blocks))p.blocks=b.blocks.filter(M0).map(K0);else delete p.blocks;return p}function K0(b){if(b.type!=="tool"){let{toolCall:p,...w}=b;return w}return b}function M0(b){if(!C(b)||typeof b.id!=="string"||typeof b.text!=="string")return!1;if(b.type==="text"||b.type==="thinking")return!0;return b.type==="tool"&&Wp(b.toolCall)}function Wp(b){if(!C(b)||typeof b.id!=="string"||typeof b.name!=="string")return!1;return typeof b.text==="string"&&W0(b.status)&&E0(b.argsStatus)}function E0(b){return b===void 0||b==="present"||b==="empty"||b==="unavailable"||b==="truncated"||b==="omitted"}function W0(b){return b==="running"||b==="ok"||b==="err"}function B0(b){if(!C(b)||typeof b.id!=="string"||typeof b.text!=="string")return!1;return typeof b.createdAt==="number"&&v0(b.role)}function v0(b){return b==="user"||b==="assistant"||b==="tool"||b==="system"}function C(b){return typeof b==="object"&&b!==null}function Y(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`}function Bp(b){return b instanceof Error&&(b.name==="AbortError"||/aborted|abort/i.test(b.message))}function bb(b){return b instanceof Error?b.message:String(b)}export{m as toolArgsInlineText,fb as toolArgsBodyText,I0 as submittedAttachmentsForText,m0 as shellAttachmentNoteVisible,Ip as setComposerMode,S as renderPromptMeta,cp as renderMessages,mp as promptFromAgUiLikeRunInput,kb as pluginStyleText,wb as pluginClass,u0 as mergeCommands,S0 as hasQueuedAttachmentNames,o as getActiveWorkspaceId,Z1 as formatShellOutput,wp as extractRefs,h1 as default,Bb as createComposerSurface,Wb as createChatSurface,rp as createChatDom,c0 as createChannels,Sp as createAgUiLikeRunInput,d as commandName,dp as chatEventsToAgUiLikeEvents,D as backendCall};
