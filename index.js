var K={attachFile:["M16.5 6v11.5a4 4 0 0 1-8 0V5a2.5 2.5 0 0 1 5 0v10.5a1 1 0 0 1-2 0V6H10v9.5","a2.5 2.5 0 0 0 5 0V5a4 4 0 0 0-8 0v12.5a5.5 5.5 0 0 0 11 0V6h-1.5Z"].join(""),stop:"M6 6h12v12H6V6Z",send:"M2 21 23 12 2 3v7l15 2-15 2v7Z",terminal:"M3 4h18v16H3V4Zm2 2v12h14V6H5Zm2 3 1.1-1.1L12.2 12l-4.1 4.1L7 15l3-3-3-3Zm6 6h5v1.5h-5V15Z",file:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 2.5L17.5 8H14V4.5ZM8 13h8v1.5H8V13Zm0 3h8v1.5H8V16Z"},B={attachFile:W("attach_file",K.attachFile),stop:W("stop",K.stop),send:W("send",K.send),terminal:W("terminal",K.terminal)};function B1(b){return`<span class="composer-spinner" aria-hidden="true"></span><span class="sr-only">${P(b)}</span>`}function W(b,p){return`<svg class="material-icon" data-material-icon="${b}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="${p}"></path></svg>`}function P(b){return b.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function L1(){return"pi-web-chat-mounted"}function E1(){let b=document.createElement("main");return b.className="main pi-web-chat-surface",b.dataset.main="session",b.dataset.pluginChatRoot="",b.innerHTML='<div class="term"><div class="term-inner" role="log" aria-live="polite" aria-relevant="additions text"></div></div><button type="button" class="scroll-bottom-btn" data-action="scroll-bottom" aria-label="stick to bottom" title="stick to bottom" aria-pressed="true" hidden>↓</button>',b}function k1(){let b=document.createElement("section");return b.className="prompt-region pi-web-chat-composer",b.innerHTML=`
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
    <div class="prompt-meta" data-prompt-meta></div>`,d(b,{}),b}function d(b,p={},w=!1){let f=b.querySelector("[data-prompt-meta]");if(!f)return;let L=[I0(p.model||"—",p.thinkingLevel)],h=P1("5h",p.fiveHourQuota),i=P1("Week",p.weeklyQuota),T=p.currentBranch||p.branch||"—";if(p.warning)L.push(c0(p.warning));if(h)L.push(h);if(i)L.push(i);if(L.push(u0(T)),f.innerHTML=L.join(" | "),w)f.append(document.createTextNode(" | "),r0())}function r0(){let b=document.createElement("span");return b.className="prompt-meta-item pi-web-chat-badge",b.textContent="chat plugin",b}function u0(b){return`<span class="prompt-meta-item prompt-meta-branch">${x1("git-branch")}<span>${P(b)}</span></span>`}function c0(b){return`<span class="prompt-meta-item prompt-meta-warning" title="${P(b)}">runtime warning</span>`}function I0(b,p){let w=P(b);return p?`${w} (${P(p)})`:w}function P1(b,p){if(typeof p!=="number"||!Number.isFinite(p))return;let w=Math.max(0,Math.min(100,Math.round(p))),f=w>=70?"full":w>=30?"medium":"low";return`<span class="prompt-meta-item prompt-meta-battery prompt-meta-battery-${f}">${P(b)} ${x1(`battery-${f}`)}(${w}%)</span>`}function x1(b){return{"battery-full":'<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 10v4"></path><path d="M14 10v4"></path><path d="M22 14v-4"></path><path d="M6 10v4"></path><rect x="2" y="6" width="16" height="12" rx="2"></rect></svg>',"battery-medium":'<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 14v-4"></path><path d="M22 14v-4"></path><path d="M6 14v-4"></path><rect x="2" y="6" width="16" height="12" rx="2"></rect></svg>',"battery-low":'<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 14v-4"></path><path d="M6 14v-4"></path><rect x="2" y="6" width="16" height="12" rx="2"></rect></svg>',"git-branch":'<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6a9 9 0 0 0-9 9V3"></path><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle></svg>'}[b]||""}function S0(){let b=document.createElement("section");return b.className="pi-web-chat-root",b.dataset.plugin="pi-web-chat",b.innerHTML=`
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
        <button class="pi-web-chat-icon-btn" type="button" data-attach aria-label="attach files" title="attach files">${W("attach_file",K.attachFile)}</button>
        <input type="file" multiple hidden data-file-input />
        <textarea class="pi-web-chat-textarea" data-chat-input aria-label="Prompt" placeholder="ask pi to do something…" rows="1"></textarea>
        <button class="pi-web-chat-send" type="button" data-send aria-label="send" title="send" aria-disabled="true">${W("send",K.send)}</button>
      </div>
    </section>`,{root:b,transcript:Q(b.querySelector("[data-chat-transcript]")),textarea:Q(b.querySelector("[data-chat-input]")),sendButton:Q(b.querySelector("[data-send]")),attachButton:Q(b.querySelector("[data-attach]")),fileInput:Q(b.querySelector("[data-file-input]")),slashPopover:Q(b.querySelector("[data-slash-popover]")),slashList:Q(b.querySelector("[data-slash-list]")),refsPopover:Q(b.querySelector("[data-refs-popover]")),refsList:Q(b.querySelector("[data-refs-list]")),attachments:Q(b.querySelector("[data-attachments]"))}}function m0(b,p){b.replaceChildren(...p.map(d0)),b.scrollTop=b.scrollHeight}function d0(b){let p=document.createElement("article");p.className=`pi-web-chat-message pi-web-chat-message-${b.role}`,p.dataset.messageId=b.id;let w=document.createElement("div");w.className="pi-web-chat-message-role",w.textContent=b.role;let f=document.createElement("pre");if(f.className="pi-web-chat-message-body",f.textContent=b.text,p.append(w,f),b.thinking){let L=document.createElement("details");L.className="pi-web-chat-thinking",L.open=Boolean(b.streaming);let h=document.createElement("summary");h.textContent="thinking";let i=document.createElement("pre");i.textContent=b.thinking,L.append(h,i),p.append(L)}if(b.toolCalls?.length){let L=document.createElement("div");L.className="pi-web-chat-tools";for(let h of b.toolCalls){let i=document.createElement("details");i.className=`pi-web-chat-tool pi-web-chat-tool-${h.status}`,i.open=h.status==="running";let T=document.createElement("summary");T.textContent=`${h.name} · ${h.status}`;let H=document.createElement("pre");H.textContent=h.text||h1(h),i.append(T,H),L.append(i)}p.append(L)}if(b.streaming){let L=document.createElement("div");L.className="pi-web-chat-message-meta",L.textContent="streaming...",p.append(L)}if(b.attachments?.length){let L=document.createElement("div");L.className="pi-web-chat-message-meta",L.textContent=`${b.attachments.length} attachment(s)`,p.append(L)}return p}function n(b){if(b.argsStatus==="truncated")return"arguments truncated";if(b.argsStatus==="omitted")return"arguments omitted";if(b.argsStatus==="unavailable")return"arguments unavailable";if(b.argsStatus==="empty")return"no arguments";if(!b.args)return"";return JSON.stringify(b.args)}function h1(b){if(b.argsStatus==="truncated")return"arguments truncated: too large to display";if(b.argsStatus==="omitted")return"arguments omitted: response too large";if(b.argsStatus==="unavailable")return"arguments unavailable";if(b.argsStatus==="empty")return"no arguments";if(!b.args)return"arguments unavailable";return JSON.stringify(b.args,null,2)}function n0(b,p){b.root.dataset.composerMode=p,i1(b.attachButton,p)}function g1(b,p,w){if(b.disabled=p==="steering"||p==="loading"&&!w,b.dataset.mode=p,b.setAttribute("aria-disabled",w?"false":"true"),p==="loading"){let f=w?"send steering message":"loading";b.innerHTML=B1(f),b.title=f,b.setAttribute("aria-label",f);return}if(p==="steering"){b.innerHTML=B1("steering"),b.title="steering message pending",b.setAttribute("aria-label","steering message pending");return}b.innerHTML=B.send,b.title="send",b.setAttribute("aria-label","send")}function i1(b,p){if(b.disabled=p==="shell",b.setAttribute("aria-disabled",p==="shell"?"true":"false"),p==="shell"){b.innerHTML=B.terminal,b.title="shell command mode",b.setAttribute("aria-label","shell command mode");return}if(p==="file-ref"){b.innerHTML=W("file",K.file),b.title="file reference mode",b.setAttribute("aria-label","file reference mode");return}b.innerHTML=B.attachFile,b.title="attach files",b.setAttribute("aria-label","attach files")}function T1(b,p){b.hidden=p.length===0,b.replaceChildren(...p.map((w)=>{let f=document.createElement("span");return f.className="pi-web-chat-attachment-chip",f.textContent=w,f}))}function r1(){return`
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
  `}function u1(){document.getElementById("pi-web-chat-style")?.remove();let b=document.createElement("style");return b.id="pi-web-chat-style",b.textContent=r1(),document.head.append(b),b}function a(b){return b.command||b.cmd||(b.name?`/${b.name}`:"")}function Q(b){if(!b)throw Error("pi-web-chat DOM template is invalid");return b}function a0(b,p,w){return{threadId:b,runId:p,state:{},messages:w,tools:[],context:[]}}function o0(b){let p=[...b.messages].reverse().find((w)=>w.role==="user");return{text:p?.text||"",attachments:p?.attachments||[],sessionId:b.threadId}}function t0(b,p,w){return b.map((f)=>s0(f,p,w))}function s0(b,p,w){if(b.type==="text.delta")return{type:"TEXT_MESSAGE_CONTENT",threadId:p,runId:w,delta:b.delta||""};if(b.type==="thinking.delta")return{type:"THINKING_MESSAGE_CONTENT",threadId:p,runId:w,delta:b.delta||""};if(b.type==="tool.start")return{type:"TOOL_CALL_START",threadId:p,runId:w,toolCallId:b.toolCallId,payload:c1(b)};if(b.type==="tool.delta")return{type:"TOOL_CALL_ARGS",threadId:p,runId:w,toolCallId:b.toolCallId,delta:b.delta||""};if(b.type==="tool.end")return{type:"TOOL_CALL_END",threadId:p,runId:w,toolCallId:b.toolCallId,payload:c1(b)};return{type:b.type.toUpperCase().replaceAll(".","_"),threadId:p,runId:w,payload:b}}function c1(b){return{name:b.toolName||"tool",args:b.args||{},result:b.result||"",isError:b.isError===!0}}var o="pi-web-chat.sessions.v1";var p0="plugin.pi-web-sidebar.selectedSession",w0="plugin.pi-web-sidebar.event",f0="plugin.pi-web-sidebar.activeSessionId",J1="plugin.pi-web-sidebar.activeWorkspaceId",e0=12,I1=20,g=200,G1=200,bb=8,pb=1e6,wb=64000;var fb=250,Lb=100,hb=6,ib=100,E=new Set,z1=new WeakMap,Tb={"book-open":'<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',"file-plus":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="M9 15h6"/>',pencil:'<path d="M21.2 6.8 17.2 2.8a2 2 0 0 0-2.8 0L3 14.2V21h6.8L21.2 9.6a2 2 0 0 0 0-2.8z"/><path d="m14 5 5 5"/>',terminal:'<path d="m4 17 6-6-6-6"/><path d="M12 19h8"/>',cpu:'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 15h3"/><path d="M1 9h3"/><path d="M1 15h3"/>',globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 0 20"/><path d="M12 2a15.3 15.3 0 0 0 0 20"/>',search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',braces:'<path d="M8 3H7a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-4a2 2 0 0 1 2-2 2 2 0 0 1-2-2V7a2 2 0 0 0-2-2h-1"/>',"file-text":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',"circle-question-mark":'<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 1 1 5.8 1c-.5 1-1.4 1.5-2.1 2-.6.4-.8.8-.8 2"/><path d="M12 17h.01"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',plug:'<path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a6 6 0 0 1-12 0V8Z"/>',"git-branch":'<line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',"circle-check":'<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',hammer:'<path d="m15 12-8.5 8.5a2.1 2.1 0 0 1-3-3L12 9"/><path d="m17.6 5.4 1.8-1.8"/><path d="m14 7 3 3"/><path d="M5 11 2 8l6-6 3 3"/>',package:'<path d="m7.5 4.3 9 5.2"/><path d="M21 8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>'},N1=new WeakMap,Hb={read:"book-open",write:"file-plus",edit:"pencil",ctx_execute:"cpu",ctx_batch_execute:"cpu",ctx_execute_file:"cpu",ctx_search:"cpu",ctx_index:"cpu",ctx_fetch_and_index:"cpu",web_search:"globe",fetch_content:"search",get_search_content:"search",code_search:"braces",document_parse:"file-text",ask_user_question:"circle-question-mark",teams:"users",subagent:"users",mcp:"plug",git:"git-branch"};class L0{#b=[];add(b){if(b)this.#b.push(b);return b}listen(b,p,w){b.addEventListener(p,w),this.add({remove:()=>b.removeEventListener(p,w)})}dispose(){for(let b of this.#b.splice(0).reverse())if(typeof b==="function")b();else if("unsubscribe"in b)b.unsubscribe();else b.remove()}}function $b(b={}){let p=b.app;if(p?.piWebChat?.dispose(),typeof b.mount?.chat!=="function"||typeof b.mount?.composer!=="function")throw Error("pi-web-chat requires modern pi-web mount.chat and mount.composer APIs");return _b(b,p)}function _b(b,p){let w=new L0,f=w.add(u1()),L=E1(),h=k1(),i=b.mount?.chat(L,{replace:!0}),T=b.mount?.composer(h,{replace:!0});if(ip(w,L),i)w.add(i);if(T)w.add(T);let H=M(b);v(b,H||void 0);let $=H?.sessionId?Bp(H.sessionId):vp(),_={backendChatToken:0,pendingPromptEchoIds:new Map,pendingAssistantEchoIds:new Map};if(!H?.sessionId)b1(L);else q(L,S($).messages,$.activeSessionId),e(b,L,$,_,H.sessionId);sb(w,b,L,$,_),jb(w,L,$,_),Nb(w,b,h,L,$,_),Ob(b,h),p?.classList.add(L1());let O=()=>{if(_.runEventsAbort?.abort(),_.sessionEventsAbort?.abort(),w.dispose(),E.clear(),f.remove(),p?.classList.remove(L1()),p?.piWebChat===R)delete p.piWebChat},R={dispose:O};if(p)p.piWebChat=R;return O}function Ob(b,p){d(p,{}),Rb(b,p)}async function Rb(b,p){try{let w=C(b),f=w.path?{workspacePath:w.path}:{},L=await A(b,"runtimeStatus",f,w.id),h=X(L)?L:{},i=X(h.status)?zb(h.status):void 0;if(!i)return;d(p,i)}catch{}}function zb(b){let p={};if(typeof b.model==="string")p.model=b.model;if(typeof b.modelProvider==="string")p.modelProvider=b.modelProvider;if(typeof b.thinkingLevel==="string")p.thinkingLevel=b.thinkingLevel;if(typeof b.fiveHourQuota==="number")p.fiveHourQuota=b.fiveHourQuota;if(typeof b.weeklyQuota==="number")p.weeklyQuota=b.weeklyQuota;if(typeof b.currentBranch==="string")p.currentBranch=b.currentBranch;if(typeof b.branch==="string")p.branch=b.branch;if(typeof b.warning==="string")p.warning=b.warning;return p}function Nb(b,p,w,f,L,h){let i=w.querySelector(".prompt-textarea"),T=w.querySelector(".send-btn"),H=w.querySelector(".attach-btn"),$=w.querySelector(".stop-btn"),_=w.querySelector("[data-file-input]"),O=w.querySelector(".attach-chips"),R=w.querySelector(".shell-attachment-note");if(!i||!T)return;let z=w.querySelector(".prompt-bar"),j=w.querySelector(".slash-pop"),y=w.querySelector(".prompt-file-ref-pop"),N={selectedAttachments:[],shellMode:!1,commands:[]},Z=()=>{Zb(O,i.value,N)},U=()=>{Jb(z,i,H,R,N)},J=()=>{let F=i.value,V=yb(h),D=Boolean(h.pendingSteering),f1=Boolean(h.activeRunId&&h.activeRunSessionId===L.activeSessionId),v1=D?"steering":V?"loading":"idle",g0=Boolean(F.trim())&&!D&&!h.resolvingSubmit&&(!V||f1);if(g1(T,v1,g0),z)z.dataset.runState=v1;if($){let x=Boolean(h.pendingSteering&&!h.pendingSteering.sent);$.hidden=!V&&!x,$.disabled=!1,$.title=x?"cancel steering":"stop response",$.setAttribute("aria-label",x?"cancel steering":"stop response")}if(Z(),S1(N),N.shellMode){H1(j,y);return}Ub(p,w,i,F,N.commands,(x)=>{N.commands=x}),N.fileSearchTimer=setTimeout(()=>{Qb(p,w,i,i.value)},120)},m=()=>{N.shellMode=!0,H1(j,y),U(),Z()},W1=()=>{N.shellMode=!1,U(),Z()},M1=async(F)=>{F?.preventDefault(),F?.stopImmediatePropagation();let V=i.value.trim();if(J(),h.resolvingSubmit||h.pendingSteering)return;if(h.startingRunSessionId||h.fallbackSubmittingSessionId)return;if(!V){i.value="",J();return}if(h.resolvingSubmit=!0,i.value="",_)_.value="";J();try{if(N.shellMode)n1(V,[]),await Cb(p,f,L,V),W1();else{let D=[...N.selectedAttachments,...await Fb(p,V)];N.selectedAttachments=[],Z(),n1(V,D);let f1=Mb(p,f,L,h,V,D,J);h.resolvingSubmit=!1,J(),await f1}}catch(D){if(!x0(D))q(f,[Gb(D)],L.activeSessionId)}finally{h.resolvingSubmit=!1,U(),J()}};if(b.listen(i,"input",()=>{if(!N.shellMode&&i.value.startsWith("! "))i.value=i.value.slice(2),m();J()}),b.listen(i,"keydown",(F)=>{let V=F;if(V.key===" "&&!N.shellMode&&i.value==="!"&&i.selectionStart===1&&i.selectionEnd===1){V.preventDefault(),i.value="",m(),J();return}if(V.key==="Backspace"&&N.shellMode&&i.value===""){V.preventDefault(),W1(),J();return}if(V.key==="Escape"){H1(j,y);return}if(V.key==="Enter"&&(V.metaKey||V.ctrlKey))M1(V)}),b.listen(T,"click",(F)=>{M1(F)}),$)b.listen($,"click",(F)=>{F.preventDefault(),F.stopImmediatePropagation(),Vb(p,f,L,h).finally(J),J()});if(H&&_)b.listen(H,"click",()=>{if(!N.shellMode)_.click()}),b.listen(_,"change",()=>{qb(_,(F)=>{N.selectedAttachments=F,Z()})});h.onRunStateChange=J,b.add({remove:()=>{if(S1(N),h.onRunStateChange===J)h.onRunStateChange=void 0}}),U(),J()}function yb(b){return Boolean(b.activeRunId||b.startingRunSessionId||b.fallbackSubmittingSessionId||b.pendingSteering)}function jb(b,p,w,f){b.listen(p,"click",(L)=>{let i=L.target?.closest?.("[data-action='cancel-steering']");if(!i)return;L.preventDefault(),L.stopPropagation();let T=i.dataset.sessionId||"",H=i.dataset.messageId||"";if(!h0(w,f)&&T&&H)u(w,T,H);if(T&&w.activeSessionId===T)q(p,Y(w,T).messages,T)})}async function Vb(b,p,w,f){if(f.pendingSteering&&!f.pendingSteering.sent){let T=f.pendingSteering.sessionId;if(h0(w,f),w.activeSessionId===T)q(p,Y(w,T).messages,T);return}let L=f.activeRunId,h=f.activeRunSessionId||f.startingRunSessionId||f.fallbackSubmittingSessionId||w.activeSessionId,i=f.activeRunWorkspaceId||C(b).id;if(!L){f.runEventsAbort?.abort(),f.startingRunSessionId=void 0,f.fallbackSubmittingSessionId=void 0;return}f.runEventsAbort?.abort();try{await z0(b,L,h,i)}catch(T){globalThis.piWeb?.subject("toast.requested").next({level:"error",message:`stop failed: ${w1(T)}`})}finally{if(f.activeRunId===L)f.activeRunId=void 0,f.activeRunSessionId=void 0,f.activeRunWorkspacePath=void 0,f.activeRunWorkspaceId=void 0}}function h0(b,p){let w=p.pendingSteering;if(!w||w.sent)return!1;return clearTimeout(w.timeout),w.controller.abort(),p.pendingSteering=void 0,u(b,w.sessionId,w.messageId),!0}function Zb(b,p,w){if(!b)return;if(w.shellMode){T1(b,[]);return}T1(b,[...w.selectedAttachments.map((f)=>f.name||"attachment"),...i0(p)])}function Jb(b,p,w,f,L){if(b?.classList.toggle("shell-mode",L.shellMode),p.setAttribute("placeholder",L.shellMode?"run shell command in workspace…":"ask pi to do something…"),f)f.hidden=!(L.shellMode&&L.selectedAttachments.length>0);if(w)i1(w,L.shellMode?"shell":"normal")}function S1(b){if(b.fileSearchTimer)clearTimeout(b.fileSearchTimer),b.fileSearchTimer=void 0}function H1(b,p){b?.setAttribute("hidden",""),p?.setAttribute("hidden","")}function Gb(b){return{id:l(),role:"system",text:`prompt failed: ${w1(b)}`,createdAt:Date.now()}}async function qb(b,p){let w=Array.from(b.files||[]).slice(0,bb),f=[];for(let L of w){if(L.size>pb)continue;f.push({name:L.name,size:L.size,content:await L.text(),mimeType:L.type||void 0})}p(f)}async function Cb(b,p,w,f){let L=J0(b,w),h=Y(w,L),i={id:l(),role:"user",text:`! ${f}`,createdAt:Date.now()},T={id:l(),role:"tool",text:`$ ${f}
(running...)`,createdAt:Date.now()};h.messages.push(i,T),h.updatedAt=Date.now(),G(w),q(p,h.messages,L);try{let H=await A(b,"runShell",{command:f}),$=typeof H.exitCode==="number"?H.exitCode:1,_=typeof H.durationMs==="number"?H.durationMs:0,O=typeof H.output==="string"?H.output:"";T.text=Yb(f,O,$,_,Boolean(H.truncated))}catch(H){T.text=`$ ${f}
${w1(H)}`}h.updatedAt=Date.now(),G(w),q(p,h.messages,L)}async function Fb(b,p){let w=i0(p);if(!w.length)return[];let f=await A(b,"resolveContext",{text:p,refs:w});return Array.isArray(f.attachments)?f.attachments.filter(X):[]}function Yb(b,p,w,f,L){let h=Xb(p,wb),i=L||h.truncated,T=h.text.endsWith(`
`)||!h.text?"":`
`;return`$ ${b}
${h.text}${T}[exit ${w} · ${f}ms${i?" · truncated":""}]`}function Xb(b,p){let w=new TextEncoder,f=w.encode(b);if(f.byteLength<=p)return{text:b,truncated:!1};let L=new TextDecoder().decode(f.slice(0,p));while(L&&w.encode(L).byteLength>p)L=L.slice(0,-1);return{text:L,truncated:!0}}async function Ub(b,p,w,f,L,h){let i=p.querySelector(".slash-pop"),T=p.querySelector(".slash-list"),H=Up(f);if(H===null||!T){i?.setAttribute("hidden","");return}let $=L;if(!$.length){let O=await A(b,"commands",{});$=Array.isArray(O.commands)?O.commands.filter(X):[],h($)}if(w.value!==f)return;let _=$.filter((O)=>{return a(O).slice(1).toLowerCase().includes(H)});Ab(T,_,w,i),i?.toggleAttribute("hidden",_.length===0)}async function Qb(b,p,w,f){let L=p.querySelector(".prompt-file-ref-pop"),h=p.querySelector(".prompt-file-ref-list"),i=Qp(f);if(i===null||!h){L?.setAttribute("hidden","");return}try{let T=await A(b,"searchFiles",{query:i,limit:e0}),H=Array.isArray(T.files)?T.files.filter(X):[];if(w.value!==f)return;lb(h,w,H,L),L?.toggleAttribute("hidden",H.length===0)}catch{L?.setAttribute("hidden","")}}function Ab(b,p,w,f){b.replaceChildren(...p.map((L)=>{let h=document.createElement("button"),i=a(L);return h.type="button",h.className="slash-item",h.dataset.slash=i,h.innerHTML='<span class="sl-name"></span><span class="sl-desc"></span>',h.querySelector(".sl-name").textContent=i,h.querySelector(".sl-desc").textContent=L.description||"",h.addEventListener("click",()=>{w.value=L.template||`${i} `,f?.setAttribute("hidden",""),w.dispatchEvent(new(w.ownerDocument.defaultView?.Event||Event)("input",{bubbles:!0})),w.focus()}),h}))}function lb(b,p,w,f){b.replaceChildren(...w.map((L)=>{let h=L.path||L.name||"",i=document.createElement("button");return i.type="button",i.className="prompt-file-ref-item",i.dataset.path=h,i.disabled=!h,i.innerHTML='<span class="pfr-path"></span><span class="pfr-kind"></span>',i.querySelector(".pfr-path").textContent=h,i.querySelector(".pfr-kind").textContent=typeof L.size==="number"?`${L.size} bytes`:"file",i.addEventListener("click",()=>{Db(p,h),f?.setAttribute("hidden","")}),i}))}function Db(b,p){if(!p)return;let{value:w,selectionStart:f}=b,L=w.slice(0,f),h=/(?:^|\s)@([^\s@`]*)$/.exec(L),i=h?f-(h[1]||"").length-1:f,T=`@${p} `;b.value=`${w.slice(0,i)}${T}${w.slice(f)}`;let H=i+T.length;b.setSelectionRange(H,H),b.dispatchEvent(new(b.ownerDocument.defaultView?.Event||Event)("input",{bubbles:!0})),b.focus()}function np(b){return{input$:b.behaviorSubject("chat.input",""),submitted$:b.subject("chat.input.submitted"),activeSessionId$:b.behaviorSubject("session.activeId",null),sidebarSelectedSession$:b.behaviorSubject(p0,Kb()),toastRequested$:b.subject("toast.requested")}}function i0(b){let p=[],w=new Set,f=/(^|[\s`])@([^\s@`]+)/g,L=f.exec(String(b||""));while(L!==null){let h=L[2]||"";if((L[1]||"")!=="`"&&h&&!w.has(h))w.add(h),p.push(h);L=f.exec(String(b||""))}return p}function ap(b=[],p=[]){let w=[],f=new Set;for(let L of[...b,...p]){let h=a(L);if(!h||f.has(h))continue;f.add(h),w.push(L)}return w}function s(b){return b.app?.piWebSidebar?.getSnapshot?.().activeWorkspaceId||b.app?.dataset.activeWorkspaceId||""}function Kb(){return M({})}function M(b){let p=b.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),w=p?.activeSessionId||"",f=p?.activeWorkspaceId||"";if(w&&b.app?.dataset.clearedSessionId!==w)return{sessionId:w,workspaceId:f||void 0};return null}function v(b,p){if(p?.workspaceId&&b.app)b.app.dataset.activeWorkspaceId=p.workspaceId,m1(J1,p.workspaceId);if(p?.sessionId)delete b.app?.dataset.clearedSessionId,b.app?.setAttribute("data-active-session-id",p.sessionId),m1(f0,p.sessionId)}function T0(b){let p=M(b);if(p?.sessionId&&b.app)b.app.dataset.clearedSessionId=p.sessionId;b.app?.removeAttribute("data-active-session-id"),Wb(f0),globalThis.piWeb?.behaviorSubject("session.activeId",null).next(null)}function r(b,p,w={}){let f=b.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),L={type:p,detail:w,snapshot:f};(b.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$)?.next(L),globalThis.piWeb?.subject(w0).next(L)}function q1(b,p,w){let f=b.app?.dataset.activeWorkspaceId||s(b),L={reason:w,sessionId:p,workspaceId:f};globalThis.piWeb?.behaviorSubject("session.activeId",p).next(p),r(b,"active.start",L),r(b,"session.created",L)}function C1(b,p){globalThis.piWeb?.subject("session.changed").next({sessionId:b,name:p,title:p})}function F1(b){if(b.title!=="New chat")return"";let w=b.messages.find((f)=>f.role==="user")?.text.slice(0,48)||"";if(!w)return"";return b.title=w,w}function m1(b,p){try{localStorage.setItem(b,p)}catch{}}function Wb(b){try{localStorage.removeItem(b)}catch{}}async function A(b,p,w={},f=s(b)){if(!b.backend)return{};let L=await b.backend(p,{workspaceId:f,data:w});return X(L)?L:{}}function y1(b){let p=Array.isArray(b.warnings)?b.warnings.filter((w)=>typeof w==="string"&&w.trim().length>0):[];for(let w of p)globalThis.piWeb?.subject("toast.requested").next({level:"warning",message:w})}function op(b,p){return b.trim().startsWith("!")?[]:[...p]}async function Mb(b,p,w,f,L,h,i=()=>{}){let T=J0(b,w),H=C(b);if(f.activeRunId&&f.activeRunSessionId===T){let N=f.activeRunWorkspacePath||H.path,Z=f.activeRunWorkspaceId||H.id;await vb(b,p,w,f,L,h,N,Z,i);return}if(f.startingRunSessionId===T||f.fallbackSubmittingSessionId===T)return;f.backendChatToken+=1,f.startingRunSessionId=T,i(),f.runEventsAbort?.abort();let $=new AbortController;f.runEventsAbort=$,f.sessionEventsAbort?.abort();let _={id:l(),role:"user",text:L,attachments:D1(h),createdAt:Date.now()},O=Y(w,T);Z1(f.pendingPromptEchoIds,T,_.id),O.messages.push(_),O.updatedAt=Date.now(),G(w),q(p,O.messages,T);let R;try{R=await ub(b,L,h,T,H.path,H.id)}catch(N){throw f.startingRunSessionId=void 0,i(),N}if($.signal.aborted){if(f.startingRunSessionId=void 0,typeof R.runId==="string"&&R.runId)await z0(b,R.runId,T,H.id);u(w,T,_.id),i();return}if(y1(R),typeof R.activeSessionId==="string"&&R.activeSessionId){let N=T,Z=w.activeSessionId===N;if(T=R.activeSessionId,Z)k(w,T),v(b,{sessionId:R.activeSessionId,workspaceId:H.id||void 0}),r(b,"chat-session",{reason:"startPrompt",sessionId:R.activeSessionId}),q1(b,R.activeSessionId,"startPrompt");else Y(w,T);M0(w,N,T,_.id),Wp(f.pendingPromptEchoIds,N,T)}if(typeof R.runId!=="string"||!R.runId){f.startingRunSessionId=void 0,f.fallbackSubmittingSessionId=T,i();let N;try{N=await cb(b,L,h,T,H.path,H.id)}catch(m){throw f.fallbackSubmittingSessionId=void 0,i(),m}if($.signal.aborted){f.fallbackSubmittingSessionId=void 0,u(w,T,_.id),i();return}y1(N);let Z=typeof N.activeSessionId==="string"&&N.activeSessionId?N.activeSessionId:T,U=c(f.pendingPromptEchoIds,T),J=tb(b,w,N,"submitPrompt",T,U);if(I(f.pendingPromptEchoIds,Z,J,U),w.activeSessionId===T||w.activeSessionId===Z)q(p,J,w.activeSessionId);if(f.runEventsAbort===$)f.runEventsAbort=void 0;f.startingRunSessionId=void 0,f.fallbackSubmittingSessionId=void 0,i();return}let z=Y(w,T);f.activeRunId=R.runId,f.activeRunSessionId=T,f.activeRunWorkspacePath=H.path,f.activeRunWorkspaceId=H.id,f.startingRunSessionId=void 0,i();let j=F1(z);if(j)G(w),C1(T,j);let y=Sb(z);Z1(f.pendingAssistantEchoIds,T,y.id);try{await Eb(b,w,z,R.runId,H.path,H.id,y,()=>{if(!$.signal.aborted&&w.activeSessionId===T)q(p,z.messages,T)},$.signal)}finally{if(f.activeRunId===R.runId)f.activeRunId=void 0,f.activeRunSessionId=void 0,f.activeRunWorkspacePath=void 0,f.activeRunWorkspaceId=void 0,f.startingRunSessionId=void 0,f.fallbackSubmittingSessionId=void 0,i();if(f.runEventsAbort===$)f.runEventsAbort=void 0}if(!$.signal.aborted&&w.activeSessionId===T)e(b,p,w,f,T,H.path,H.id)}async function vb(b,p,w,f,L,h,i,T,H=()=>{}){let{activeRunId:$,activeRunSessionId:_}=f;if(!$||!_)throw Error("active run is unavailable for steering");if(f.pendingSteering)return;let O={id:l(),role:"user",text:L,attachments:D1(h),createdAt:Date.now(),meta:{piWebChatSteeringState:"pending"}},R=Y(w,_),z=new AbortController,j=Bb(z.signal,()=>{let y=f.pendingSteering;if(y){if(y.sent=!0,Pb(w,y.sessionId,y.messageId),w.activeSessionId===y.sessionId)q(p,Y(w,y.sessionId).messages,y.sessionId);H()}});if(f.pendingSteering={sessionId:_,messageId:O.id,timeout:j.timeout,controller:z,sent:!1},Z1(f.pendingPromptEchoIds,_,O.id),R.messages.push(O),R.updatedAt=Date.now(),G(w),w.activeSessionId===_)q(p,R.messages,_);H();try{if(await j.promise,z.signal.aborted)return;let y=await Ib(b,$,L,h,_,i,T);y1(y)}catch(y){if(x0(y))return;if(u(w,_,O.id),Kp(f.pendingPromptEchoIds,_,O.id),R0(y)){q(p,R.messages,_),globalThis.piWeb?.subject("toast.requested").next({level:"error",message:"This backend does not support steering while a response is streaming."});return}throw y}finally{if(f.pendingSteering?.controller===z)f.pendingSteering=void 0,H()}}function Bb(b,p){let w,f=new Promise((L,h)=>{w=setTimeout(()=>{p(),L()},ib),b.addEventListener("abort",()=>{clearTimeout(w),h(new DOMException("Steering cancelled","AbortError"))},{once:!0})});return{timeout:w,promise:f}}function u(b,p,w){let f=b.sessions.find((L)=>L.id===p);if(!f)return;f.messages=f.messages.filter((L)=>L.id!==w),v0(b,f.id),G(b)}function Pb(b,p,w){let f=Y(b,p).messages.find((L)=>L.id===w);if(!f?.meta)return;if(delete f.meta.piWebChatSteeringState,Object.keys(f.meta).length===0)delete f.meta;G(b)}async function Eb(b,p,w,f,L,h,i,T,H){let $=await $0(b,"streamEventsSse",{runId:f,cursor:0,workspacePath:L},H,h);if(!$)throw Error("SSE streaming backend did not return a stream");let _=H0(T),O=kb(p,Lb);i.streaming=!0,_.flush();try{await _0($,(R)=>{mb(i,[R]),i.streaming=R.type!=="run.end",w.updatedAt=Date.now(),O.request(),_.request()})}finally{i.streaming=!1,O.flush(),_.flush()}}function kb(b,p){let w=0,f,L=()=>{if(f)clearTimeout(f),f=void 0},h=()=>{L(),w=Date.now(),G(b)};return{request:()=>{let T=p-(Date.now()-w);if(T<=0){h();return}f||=setTimeout(h,T)},flush:h}}function H0(b){let p=0,w,f=()=>{if(w)clearTimeout(w),w=void 0},L=()=>{f(),p=Date.now(),b()};return{request:()=>{let i=fb-(Date.now()-p);if(i<=0){L();return}w||=setTimeout(L,i)},flush:L,cancel:f}}async function $0(b,p,w={},f,L=s(b)){if(!b.backendStream)throw Error("SSE streaming backend is unavailable");let h=await b.backendStream(p,{workspaceId:L,data:w},{signal:f});return xb(h)}function xb(b){if(typeof ReadableStream<"u"&&b instanceof ReadableStream)return b;if(typeof Response<"u"&&b instanceof Response)return b.body;if(typeof b==="string")return d1(b);if(!X(b))return null;let p=b.body;if(typeof ReadableStream<"u"&&p instanceof ReadableStream)return p;let w=b.sse;if(typeof w==="string")return d1(w);return null}function d1(b){let p=new TextEncoder().encode(b);return new ReadableStream({start(w){w.enqueue(p),w.close()}})}async function _0(b,p){let w=b.getReader(),f=new TextDecoder,L="";while(!0){let h=await w.read();if(h.done){L+=f.decode(),rb(L,p);return}L+=f.decode(h.value,{stream:!0});let i=gb(L);L=i.remainder;for(let T of i.frames)O0(T,p)}}function gb(b){let w=b.replaceAll(`\r
`,`
`).replaceAll("\r",`
`).split(`

`),f=w.pop()||"";return{frames:w,remainder:f}}function rb(b,p){let w=b.trim();if(w)O0(w,p)}function O0(b,p){let w=b.split(`
`).filter((f)=>f.startsWith("data:")).map((f)=>f.slice(5).trimStart()).join(`
`);if(!w)return;try{let f=JSON.parse(w);if(ab(f))p(f)}catch{}}function n1(b,p){globalThis.piWeb?.subject("chat.input.submitted").next({text:b,attachments:D1(p)||[]})}async function ub(b,p,w,f,L=C(b).path,h=C(b).id){try{return await A(b,"startPrompt",Y1(p,w,f,L),h)}catch(i){if(R0(i))return{};throw i}}function R0(b){return/unknown method: (startPrompt|streamEventsSse|steerPrompt)|unsupported method: (startPrompt|streamEventsSse|steerPrompt)|(startPrompt|streamEventsSse|steerPrompt) unsupported/i.test(w1(b))}async function cb(b,p,w,f="",L=C(b).path,h=C(b).id){return await A(b,"submitPrompt",Y1(p,w,f,L),h)}async function Ib(b,p,w,f,L="",h=C(b).path,i=C(b).id){let T={...Y1(w,f,L,h),runId:p};return A(b,"steerPrompt",T,i)}async function z0(b,p,w="",f=C(b).id){return A(b,"abortPrompt",{runId:p,sessionId:w},f)}function Y1(b,p,w,f){let L={text:b,attachments:p,sessionId:w};if(f)L.workspacePath=f;return L}function Sb(b){let p=[...b.messages].reverse().find((f)=>f.role==="assistant"&&f.streaming);if(p)return p;let w={id:l(),role:"assistant",text:"",createdAt:Date.now(),streaming:!0};return b.messages.push(w),w}function mb(b,p){for(let w of p)if(w.type==="text.delta"&&typeof w.delta==="string")$1(b,"text",w.delta),b.text+=w.delta;else if(w.type==="thinking.delta"&&typeof w.delta==="string")$1(b,"thinking",w.delta),b.thinking=`${b.thinking||""}${w.delta}`;else if(w.type==="tool.start")_1(b,w,"running");else if(w.type==="tool.delta"&&typeof w.delta==="string"){let f=_1(b,w,"running");f.text=w.delta}else if(w.type==="tool.end"){let f=_1(b,w,w.isError?"err":"ok");if(typeof w.result==="string"&&w.result)f.text=w.result}else if(w.type==="error"&&typeof w.message==="string")$1(b,"text",`${b.text?`
`:""}${w.message}`),b.text+=`${b.text?`
`:""}${w.message}`}function $1(b,p,w){b.blocks||=[];let f=b.blocks[b.blocks.length-1];if(f?.type===p){f.text+=w;return}if(b.blocks.length<G1)b.blocks.push({id:l(),type:p,text:w})}function _1(b,p,w){let f=p.toolCallId||p.toolName||"tool";b.toolCalls||=[];let L=b.toolCalls.find((h)=>h.id===f);if(!L)L={id:f,name:p.toolName||"tool",args:p.args,text:"",status:w},b.toolCalls.push(L),db(b,L);if(L.status=w,nb(L,p))L.args=p.args,L.argsStatus=p.argsStatus;return L}function db(b,p){if(b.blocks||=[],b.blocks.some((w)=>w.type==="tool"&&w.toolCall?.id===p.id))return;if(b.blocks.length<G1)b.blocks.push({id:l(),type:"tool",text:"",toolCall:p})}function nb(b,p){if(!p.argsStatus)return Boolean(p.args);if(p.argsStatus==="unavailable")return!b.argsStatus;return!0}function ab(b){return X(b)&&typeof b.type==="string"}async function e(b,p,w,f,L="",h=X1(b),i=C(b).id){if(!b.backendStream){await a1(b,p,w,f,L,h);return}let T=++f.backendChatToken;f.sessionEventsAbort?.abort();let H=new AbortController;f.sessionEventsAbort=H;let $=H0(()=>{q(p,S(w).messages,w.activeSessionId)});try{let _=await $0(b,"sessionEventsSse",N0(b,L,h),H.signal,i);if(!_)throw Error("session SSE backend did not return a stream");await _0(_,(O)=>{if(T!==f.backendChatToken||O.type!=="chat.state")return;let R=ob(O),z=typeof R.activeSessionId==="string"?R.activeSessionId:L,j=c(f.pendingPromptEchoIds,z),y=c(f.pendingAssistantEchoIds,z),N=V0(b,w,R,"chatState",j,y,K0(f,R,z));if(y0(f,R,z,h,i),I(f.pendingPromptEchoIds,z,N,j),I(f.pendingAssistantEchoIds,z,N,y),N.length)$.request()})}catch(_){if(!H.signal.aborted)await a1(b,p,w,f,L,h)}finally{if($.flush(),f.sessionEventsAbort===H)f.sessionEventsAbort=void 0}}async function a1(b,p,w,f,L="",h=X1(b)){let i=++f.backendChatToken;try{let T=await A(b,"chatState",N0(b,L,h));if(i!==f.backendChatToken)return;let H=typeof T.activeSessionId==="string"?T.activeSessionId:L,$=c(f.pendingPromptEchoIds,H),_=c(f.pendingAssistantEchoIds,H),O=V0(b,w,T,"chatState",$,_,K0(f,T,H));if(y0(f,T,H,h,C(b).id),I(f.pendingPromptEchoIds,H,O,$),I(f.pendingAssistantEchoIds,H,O,_),O.length)q(p,O,w.activeSessionId)}catch{}}function N0(b,p,w=X1(b)){let f=p?{sessionId:p}:{};if(w)f.workspacePath=w;return f}function ob(b){return{activeSessionId:b.activeSessionId,messages:b.messages,runId:b.runId,isStreaming:b.isStreaming}}function y0(b,p,w,f,L){if(p.isStreaming===!0&&typeof p.runId==="string"&&p.runId){b.activeRunId=p.runId,b.activeRunSessionId=typeof p.activeSessionId==="string"&&p.activeSessionId?p.activeSessionId:w,b.activeRunWorkspacePath=f,b.activeRunWorkspaceId=L,b.onRunStateChange?.();return}if(p.isStreaming===!1&&(!p.activeSessionId||p.activeSessionId===b.activeRunSessionId))b.activeRunId=void 0,b.activeRunSessionId=void 0,b.activeRunWorkspacePath=void 0,b.activeRunWorkspaceId=void 0,b.onRunStateChange?.()}function X1(b){return C(b).path}function C(b){let p=b.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),w=p?.activeWorkspaceId||b.app?.dataset.activeWorkspaceId||"",f=p?.workspaces?.find((L)=>L.id===w)?.path||"";return{id:w,path:f}}function j0(b,p){let w=b.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),f=p.workspaceId||w?.activeWorkspaceId||b.app?.dataset.activeWorkspaceId||"",L=w?.workspaces?.find((h)=>h.id===f)?.path||"";if(L||f!==w?.activeWorkspaceId)return{id:f,path:L};return C(b)}function V0(b,p,w,f,L="",h="",i=!1){let T=K1(w.messages);if(typeof w.activeSessionId==="string"&&w.activeSessionId){let O=p.activeSessionId;if(k(p,w.activeSessionId),v(b,{sessionId:w.activeSessionId,workspaceId:b.app?.dataset.activeWorkspaceId||s(b)||void 0}),f!=="chatState"||O!==w.activeSessionId)r(b,"chat-session",{reason:f,sessionId:w.activeSessionId});if(f!=="chatState")q1(b,w.activeSessionId,f)}let H=S(p);if(!T.length)return[];let $=W0(H.messages,T,L,h,i).slice(-g);if(!Z0(H.messages,$))return[];H.messages=$;let _=F1(H);if(H.updatedAt=Date.now(),G(p),_)C1(H.id,_);return H.messages}function Z0(b,p){if(b.length!==p.length)return!0;return b.some((w,f)=>j1(w)!==j1(p[f]))}function j1(b){return JSON.stringify({id:b.id,role:b.role,text:b.text,blocks:b.blocks,thinking:b.thinking,streaming:b.streaming,toolCalls:b.toolCalls,attachments:b.attachments})}function tb(b,p,w,f,L,h=""){let i=K1(w.messages),T=typeof w.activeSessionId==="string"&&w.activeSessionId?w.activeSessionId:L,H=p.activeSessionId===L;if(T!==L)if(H)k(p,T),v(b,{sessionId:T,workspaceId:C(b).id||void 0}),r(b,"chat-session",{reason:f,sessionId:T}),q1(b,T,f);else Y(p,T);let $=Array.isArray(h)?h:[h].filter(Boolean);if(T!==L)for(let z of $)M0(p,L,T,z);let _=Y(p,T);if(!i.length)return[];let O=W0(_.messages,i,h).slice(-g);if(!Z0(_.messages,O))return[];_.messages=O;let R=F1(_);if(_.updatedAt=Date.now(),G(p),R)C1(_.id,R);return _.messages}function sb(b,p,w,f,L){let h=($,_)=>{if(!$?.sessionId){if(!_)o1(p,w,f,L,!0);return}if(G0(p,f,$))return;v(p,$),k(f,$.sessionId),q(w,S(f).messages,f.activeSessionId);let O=j0(p,$);e(p,w,f,L,$.sessionId,O.path,O.id)},i=($)=>{if(eb(p,w,f,L,$))return;let _=pp(p,$);if(_)h(_,!1)},T=p.app?.piWebSidebar?.channels?.selectedSession$||globalThis.piWebSidebar?.channels?.selectedSession$,H=p.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$;if(T){let $=!0;b.add(T.subscribe((_)=>{h(_,$),$=!1}))}if(H)b.add(H.subscribe(i));if(p.app)b.listen(p.app,"pi-web-sidebar:session-created",($)=>{let _=$.detail||{},O=typeof _.sessionId==="string"?_.sessionId:"",R=typeof _.workspaceId==="string"?_.workspaceId:"";if(O)h({sessionId:O,workspaceId:R||void 0},!1)});if(globalThis.piWeb){let $=!0;b.add(globalThis.piWeb.behaviorSubject(p0,M(p)).subscribe((O)=>{h(O,$),$=!1})),b.add(globalThis.piWeb.subject(w0).subscribe(i));let _=!0;b.add(globalThis.piWeb.behaviorSubject("session.activeId",null).subscribe((O)=>{if(!O){if(!_)o1(p,w,f,L,!1);_=!1;return}_=!1,h({sessionId:O,workspaceId:p.app?.dataset.activeWorkspaceId||B0(J1)||void 0},!1)}))}}function o1(b,p,w,f,L){if(f.backendChatToken+=1,f.runEventsAbort?.abort(),f.sessionEventsAbort?.abort(),w.activeSessionId="",G(w),L)T0(b);else{let h=M(b);if(h?.sessionId&&b.app)b.app.dataset.clearedSessionId=h.sessionId}b1(p)}function J0(b,p){let w=M(b);if(w?.sessionId&&!G0(b,p,w))v(b,w),k(p,w.sessionId);if(!p.activeSessionId)return Y(p,"",!0).id;return p.activeSessionId}function G0(b,p,w){let f=w.workspaceId||"",L=b.app?.dataset.activeWorkspaceId||B0(J1)||"";return p.activeSessionId===w.sessionId&&(!f||f===L)}function eb(b,p,w,f,L){if(L.type!=="session.deleted")return!1;let h=q0(L);if(!h)return!0;let i=w.activeSessionId===h,T=w.sessions.length;if(w.sessions=w.sessions.filter((H)=>H.id!==h),i){f.runEventsAbort?.abort(),f.sessionEventsAbort?.abort();let H=bp(b,L,h);if(H?.sessionId){v(b,H),k(w,H.sessionId),fp(p,S(w).messages,w.activeSessionId);let $=j0(b,H);return e(b,p,w,f,H.sessionId,$.path,$.id),!0}return w.activeSessionId="",T0(b),G(w),b1(p),!0}if(w.sessions.length!==T)G(w);return!0}function bp(b,p,w){let f=p.snapshot?.activeSessionId||"",L=p.snapshot?.activeWorkspaceId||"";if(f&&f!==w)return{sessionId:f,workspaceId:L||void 0};let h=M(b);if(h?.sessionId&&h.sessionId!==w)return h;return null}function pp(b,p){if(!wp(p.type))return null;let w=p.detail||{},f=q0(p)||p.snapshot?.activeSessionId||"",L=typeof w.workspaceId==="string"?w.workspaceId:p.snapshot?.activeWorkspaceId||b.app?.dataset.activeWorkspaceId||"";if(!f)return null;return{sessionId:f,workspaceId:L||void 0}}function q0(b){let p=b.detail||{};if(typeof p.sessionId==="string")return p.sessionId;if(typeof p.id==="string")return p.id;return""}function wp(b){return b==="session.selected"||b==="session.created"||b==="new-session"||b==="active.start"}function k(b,p){let w=b.sessions.find((f)=>f.id===p);if(!w)w=p1(p),b.sessions.unshift(w);return b.activeSessionId=w.id,G(b),w}function q(b,p,w){if(U0(p,w),!p.length){b1(b);return}let f=b.querySelector(".term-inner")||b;C0(f,p,w),U1(b)}function fp(b,p,w){U0(p,w);let f=b.querySelector(".term-inner")||b;C0(f,p,w),U1(b)}function C0(b,p,w){let f=hp(b),L=p.map((T)=>{let H=`${w}:${j1(T)}`,$=f.get(T.id);if($){if(z1.get($)!==H)Lp($,T,w,H);return $}let _=Y0(T,w);return z1.set(_,H),_}),h=new Set(L),i=b.firstChild;for(let T of L){if(i!==T)b.insertBefore(T,i);i=T.nextSibling}for(let T of Array.from(b.children)){if(V1(b,T)&&!h.has(T)){T.remove();continue}if(!V1(b,T))T.remove()}}function Lp(b,p,w,f){let L=Y0(p,w);if(b.replaceChildren(...Array.from(L.childNodes)),b.className=L.className,b.dataset.messageId=p.id,p.streaming)b.dataset.streaming="true";else delete b.dataset.streaming;z1.set(b,f)}function hp(b){let p=new Map;for(let w of Array.from(b.children)){if(!V1(b,w))continue;let f=w.dataset.messageId||"";if(f)p.set(f,w)}return p}function V1(b,p){let w=b.ownerDocument.defaultView;return Boolean(w&&p instanceof w.HTMLElement&&p.classList.contains("transcript-item"))}function b1(b){let p=b.querySelector(".term-inner")||b,w=document.createElement("article");w.className="pi-web-chat-docs",w.setAttribute("aria-label","pi-web-chat guide");let f=document.createElement("h1");f.textContent="pi-web-chat guide";let L=document.createElement("p");L.textContent=["Select or create a session in the sidebar to load chat history,","or type below to start a new session."].join(" ");let h=document.createElement("ul");for(let i of["Ask pi in the prompt box and press Cmd/Ctrl+Enter to send.","Type ! then Space at the start to turn the prompt yellow and run shell commands in the workspace.","Queued file attachments hide during shell mode and reappear for the next normal prompt.","Type @ to list project files, then pick one to tag it as prompt context.","Type / at the start to open the slash command list.","Chats are cached locally after you start or select a session."]){let T=document.createElement("li");T.textContent=i,h.append(T)}w.append(f,L,h),p.replaceChildren(w),U1(b)}function ip(b,p){let w=p.querySelector(".term"),f=p.querySelector("[data-action='scroll-bottom']");if(!w||!f)return;let L={term:w,button:f,pinned:!0,touchStartY:null};N1.set(p,L),f.hidden=!1,t(L),b.listen(f,"click",()=>{L.pinned=!0,F0(L),t(L)}),b.listen(w,"wheel",(h)=>{if(h.deltaY<0)t1(L)}),b.listen(w,"touchstart",(h)=>{let i=h;L.touchStartY=i.touches.item(0)?.clientY??null}),b.listen(w,"touchmove",(h)=>{let T=h.touches.item(0)?.clientY;if(typeof T==="number"&&L.touchStartY!==null&&T-L.touchStartY>8)t1(L)}),b.listen(w,"touchend",()=>{L.touchStartY=null}),b.add({remove:()=>{N1.delete(p)}})}function U1(b){let p=N1.get(b);if(!p)return;if(p.pinned)F0(p);t(p)}function F0(b){b.term.scrollTop=b.term.scrollHeight}function t1(b){b.pinned=!1,t(b)}function t(b){b.button.dataset.pinned=b.pinned?"true":"false",b.button.setAttribute("aria-pressed",b.pinned?"true":"false")}function Y0(b,p){let w=document.createElement("article");if(w.className="transcript-item",w.dataset.messageId=b.id,Tp(b))Hp(w,b,p);else if($p(b)){let f=_p(b);if(f)Q1(w,b.role,b.text);zp(w,b,p,f)}else Np(w,b,p);if(b.streaming)w.dataset.streaming="true";return w}function Tp(b){return b.role==="user"&&b.meta?.piWebChatSteeringState==="pending"}function Hp(b,p,w){let f=document.createElement("div");f.className="msg pending-steering",f.dataset.kind="user";let L=document.createElement("span");L.className="prefix user",L.textContent=D0("user");let h=document.createElement("small");h.className="body user pending-steering-text",h.textContent=p.text;let i=document.createElement("button");i.type="button",i.className="pending-steering-cancel",i.dataset.action="cancel-steering",i.dataset.sessionId=w,i.dataset.messageId=p.id,i.setAttribute("aria-label","cancel steering"),i.title="cancel steering",i.textContent="×",f.append(L,h,i),b.append(f)}function $p(b){return Boolean(b.blocks?.some((p)=>{return p.type==="tool"||p.text.trim().length>0}))}function _p(b){return Boolean(b.text.trim())&&(!Op(b)||Rp(b))}function Op(b){return Boolean(b.blocks?.some((p)=>{return p.type==="text"&&p.text.trim().length>0}))}function Rp(b){return(b.blocks?.length||0)>=G1}function zp(b,p,w,f=!1){for(let L of p.blocks||[])if(L.type==="text"){if(!f)Q1(b,p.role,L.text)}else if(L.type==="thinking")b.append(X0(L.text,Boolean(p.streaming)));else if(L.type==="tool"&&L.toolCall){let h=p.toolCalls?.find((i)=>i.id===L.toolCall?.id)||L.toolCall;b.append(Q0(h,A1(w,p,h)))}}function Np(b,p,w){if(yp(p))Q1(b,p.role,p.text);if(p.thinking)b.append(X0(p.thinking,Boolean(p.streaming)));for(let f of p.toolCalls||[])b.append(Q0(f,A1(w,p,f)))}function Q1(b,p,w){if(p==="assistant"&&!w.trim())return;let f=document.createElement("div");f.className="msg",f.dataset.kind=O1(p);let L=document.createElement("span");L.className=`prefix ${O1(p)}`,L.textContent=D0(p);let h=document.createElement("pre");h.className=`body ${O1(p)}`,h.textContent=w,f.append(L,h),b.append(f)}function yp(b){let p=b.text.trim().length>0;return b.role!=="assistant"||p}function X0(b,p){let w=document.createElement("details");w.className="msg-detail think thinking-block",w.open=p;let f=document.createElement("summary");f.className="label",f.textContent="THINKING";let L=document.createElement("pre");return L.className="body",L.textContent=b,w.append(f,L),w}function U0(b,p){let w=new Set;for(let f of b)for(let L of f.toolCalls||[])w.add(A1(p,f,L));for(let f of E)if(!w.has(f))E.delete(f)}function A1(b,p,w){return`${b}:${p.id}:${w.id}`}function Q0(b,p){let w=document.createElement("div");w.className="tool-card",w.dataset.tool=b.name||"tool",w.dataset.status=b.status;let f=!E.has(p);w.dataset.collapsed=f?"true":"false";let L=document.createElement("button");if(L.type="button",L.className="tc-head",L.title=f?"Show tool output":"Hide tool output",L.setAttribute("aria-expanded",f?"false":"true"),L.setAttribute("aria-label",A0(b,f)),L.append(Jp(b),Gp(b),qp(b),Cp(b,f)),!f)w.append(l0(b));return L.addEventListener("click",()=>Zp(w,L,b,p)),w.prepend(L),w}function A0(b,p){let w=p?"Show":"Hide",f=b.status==="running"?"running":b.status==="err"?"failed":"done",L=jp(b),h=L?`, ${L}`:"";return`${w} ${b.name||"tool"} output, ${f}${h}`}function jp(b){if(b.argsStatus==="present")return"arguments present";if(b.argsStatus)return n(b);return b.args?"arguments present":""}function l0(b){let p=document.createElement("pre");return p.className="tc-body",p.textContent=b.text||h1(b),p}function Vp(){let b=document.createElement("span");b.className="spinner",b.setAttribute("aria-hidden","true");for(let p=0;p<hb;p+=1)b.append(document.createElement("span"));return b}function Zp(b,p,w,f){let L=b.querySelector(".tc-body"),h=L!==null;if(L)L.remove(),E.delete(f);else b.append(l0(w)),E.add(f);b.dataset.collapsed=h?"true":"false",p.setAttribute("aria-expanded",h?"false":"true"),p.setAttribute("aria-label",A0(w,h)),p.title=h?"Show tool output":"Hide tool output";let i=p.querySelector(".tc-toggle-label");if(i)i.textContent=h?"show":"hide"}function Jp(b){let p=document.createElement("span");p.className="tc-glyph";let w=Fp(b),f=w?Tb[w]:"";if(!w||!f)return p.textContent="●",p;return p.innerHTML=`<svg class="tc-icon" data-tool-icon="${w}" aria-hidden="true" viewBox="0 0 24 24">${f}</svg>`,p}function Gp(b){let p=document.createElement("span");return p.className="tc-name",p.textContent=b.name||"tool",p}function qp(b){let p=document.createElement("span");return p.className="tc-args",p.textContent=n(b),p}function Cp(b,p){let w=document.createElement("span");if(w.className="tc-meta",b.status==="running"){let h=Vp(),i=document.createElement("span");return i.className="running",i.textContent="running",w.append(h,i,s1(p)),w}let f=document.createElement("span");f.className=b.status==="err"?"err":"ok",f.textContent=b.status==="err"?"✗":"✓";let L=document.createElement("span");return L.textContent=b.status==="err"?" · failed":" · done",w.append(f,L,s1(p)),w}function s1(b){let p=document.createElement("span");p.className="tc-toggle";let w=document.createElement("span");w.className="tc-toggle-label",w.textContent=b?"show":"hide";let f=document.createElement("span");return f.className="tc-caret",f.textContent="▸",p.append(w,f),p}function Fp(b){let p=Yp(b.name);if(["bash","shell","sh","zsh","terminal"].includes(p))return Xp(n(b).toLowerCase())||"terminal";return Hb[p]}function Yp(b){return b.trim().replace(/^functions\./,"").replace(/^multi_tool_use\./,"")}function Xp(b){if(/\bgit\b|\bgh\b/.test(b))return"git-branch";if(/\b(go test|bun test|npm test|pnpm test|yarn test|vitest|pytest|cargo test)\b/.test(b))return"circle-check";if(/\b(bun|npm|pnpm|yarn)\s+(run\s+)?build\b|\b(go build|cargo build)\b/.test(b))return"hammer";if(/\b(bun|npm|pnpm|yarn)\s+(add|install|i)\b|\bpip\s+install\b|\bgo\s+get\b/.test(b))return"package";return}function D0(b){if(b==="assistant")return"pi >";if(b==="user")return"you >";if(b==="system")return"sys >";return"tool >"}function O1(b){if(b==="assistant")return"pi";if(b==="system")return"sys";return b}function Up(b){let p=/^\/([^\s/]*)$/.exec(b);return p?p[1].toLowerCase():null}function Qp(b){let p=/(?:^|\s)@([^\s@`]*)$/.exec(b);return p?p[1]:null}function tp(b){return b.length>0}function sp(b,p){return b.trim().startsWith("!")&&p}function K0(b,p,w){return Boolean(typeof p.runId==="string"&&p.runId&&w)}function W0(b,p,w="",f="",L=!1){let h=e1(w),i=e1(f),T=new Map,H=new Map,$=new Map,_=p.length;for(let z of b)T.set(z.id,z),H.set(z.id,_++);let O=new Set,R=new Set;return p.forEach((z,j)=>{let y=Ap(b,z,h,O);if(y){O.add(y.id);let U=l1(b,y.id,i,R);if(U)$.set(z.id,U);R1(T,H,y.id,z,j);return}let N=lp(b,p,z,j,i,R,$);if(N){R.add(N),R1(T,H,N,z,j);return}let Z=Dp(b,p,z,j,h,i,R,L);if(Z){R.add(Z),R1(T,H,Z,z,H.get(Z)??j);return}H.set(z.id,j),T.set(z.id,{...T.get(z.id),...z})}),[...T.values()].sort((z,j)=>{let y=(H.get(z.id)??0)-(H.get(j.id)??0);if(y!==0)return y;return z.createdAt-j.createdAt})}function e1(b){return Array.isArray(b)?b:[b].filter(Boolean)}function R1(b,p,w,f,L){b.delete(w),b.set(f.id,f),p.delete(w),p.set(f.id,L)}function Ap(b,p,w,f){if(!w.length||p.role!=="user"||!p.text.trim())return;if(b.some((L)=>L.id===p.id))return;return b.find((L)=>{return w.includes(L.id)&&!f.has(L.id)&&L.role===p.role&&L.text.trim()===p.text.trim()})}function lp(b,p,w,f,L,h,i){if(w.role!=="assistant"||f<=0)return"";let T=p[f-1];if(T?.role!=="user")return"";let H=i.get(T.id)||"";if(H&&!h.has(H))return H;return l1(b,T.id,L,h)}function Dp(b,p,w,f,L,h,i,T){if(!T||w.role!=="assistant"||f!==p.length-1||p.some((H)=>H.role==="user"))return"";for(let H of L){let $=l1(b,H,h,i);if($)return $}return""}function l1(b,p,w,f){let L=b.findIndex((i)=>i.id===p);if(L<0)return"";let h=b[L+1];if(h?.role==="assistant"&&w.includes(h.id)&&!f.has(h.id))return h.id;return""}function Z1(b,p,w){b.set(p,[...b.get(p)||[],w])}function c(b,p){return b.get(p)||[]}function Kp(b,p,w){let f=(b.get(p)||[]).filter((L)=>L!==w);if(f.length){b.set(p,f);return}b.delete(p)}function Wp(b,p,w){let f=b.get(p)||[];if(!f.length)return;b.delete(p),b.set(w,[...b.get(w)||[],...f])}function I(b,p,w,f){if(!f.length||!w.length)return;let L=f.filter((h)=>{return w.some((i)=>i.id===h)});if(L.length){b.set(p,L);return}b.delete(p)}function S(b){return Y(b,b.activeSessionId,!0)}function Y(b,p,w=!1){let f=b.sessions.find((L)=>L.id===p);if(!f)f=p1(p||void 0),b.sessions.unshift(f),G(b);if(w||!b.activeSessionId)b.activeSessionId=f.id,G(b);return f}function M0(b,p,w,f){if(p===w)return;let L=b.sessions.find((H)=>H.id===p),h=L?.messages.findIndex((H)=>H.id===f)??-1;if(!L||h<0)return;let[i]=L.messages.splice(h,1),T=Y(b,w);if(!T.messages.some((H)=>H.id===i.id))T.messages.push(i);L.updatedAt=Date.now(),T.updatedAt=Date.now(),v0(b,L.id),G(b)}function v0(b,p){let w=b.sessions.find((f)=>f.id===p);if(!w||w.id===b.activeSessionId||w.messages.length>0||w.title!=="New chat")return;b.sessions=b.sessions.filter((f)=>f.id!==w.id)}function p1(b=l()){let p=Date.now();return{id:b,title:"New chat",createdAt:p,updatedAt:p,messages:[]}}function B0(b){try{return localStorage.getItem(b)||""}catch{return""}}function Mp(b){let p=p1(b);return{activeSessionId:p.id,sessions:[p]}}function vp(){try{let b=JSON.parse(localStorage.getItem(o)||"null");if(b&&Array.isArray(b.sessions))return{activeSessionId:"",sessions:b.sessions.filter(P0).map(E0)}}catch{}return{activeSessionId:"",sessions:[]}}function Bp(b=""){try{let p=JSON.parse(localStorage.getItem(o)||"null");if(p&&typeof p.activeSessionId==="string"&&Array.isArray(p.sessions)){let w=p.sessions.filter(P0).map(E0);if(b&&!w.some((f)=>f.id===b))w.unshift(p1(b));return{activeSessionId:b||p.activeSessionId,sessions:w}}}catch{}return Mp(b||void 0)}function G(b){b0(b);try{localStorage.setItem(o,JSON.stringify(b))}catch{for(let p of b.sessions)p.messages=p.messages.slice(-Math.floor(g/2));b0(b);try{localStorage.setItem(o,JSON.stringify(b))}catch{}}}function D1(b){if(!b?.length)return;return b.map(({content:p,...w})=>w)}function b0(b){b.sessions.sort((f,L)=>L.updatedAt-f.updatedAt);let p=b.sessions.find((f)=>f.id===b.activeSessionId),w=b.sessions.filter((f)=>f.id!==b.activeSessionId).slice(0,Math.max(0,I1-1));b.sessions=p?[p,...w]:b.sessions.slice(0,I1);for(let f of b.sessions)if(f.messages.length>g)f.messages.splice(0,f.messages.length-g)}function P0(b){return X(b)&&typeof b.id==="string"&&Array.isArray(b.messages)}function E0(b){return{...b,messages:K1(b.messages)}}function K1(b){return Array.isArray(b)?b.filter(rp).map(Pp):[]}function Pp(b){let p={...b};if(Array.isArray(b.toolCalls))p.toolCalls=b.toolCalls.filter(k0);else delete p.toolCalls;if(Array.isArray(b.blocks))p.blocks=b.blocks.filter(kp).map(Ep);else delete p.blocks;return p}function Ep(b){if(b.type!=="tool"){let{toolCall:p,...w}=b;return w}return b}function kp(b){if(!X(b)||typeof b.id!=="string"||typeof b.text!=="string")return!1;if(b.type==="text"||b.type==="thinking")return!0;return b.type==="tool"&&k0(b.toolCall)}function k0(b){if(!X(b)||typeof b.id!=="string"||typeof b.name!=="string")return!1;return typeof b.text==="string"&&gp(b.status)&&xp(b.argsStatus)}function xp(b){return b===void 0||b==="present"||b==="empty"||b==="unavailable"||b==="truncated"||b==="omitted"}function gp(b){return b==="running"||b==="ok"||b==="err"}function rp(b){if(!X(b)||typeof b.id!=="string"||typeof b.text!=="string")return!1;return typeof b.createdAt==="number"&&up(b.role)}function up(b){return b==="user"||b==="assistant"||b==="tool"||b==="system"}function X(b){return typeof b==="object"&&b!==null}function l(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`}function x0(b){return b instanceof Error&&(b.name==="AbortError"||/aborted|abort/i.test(b.message))}function w1(b){return b instanceof Error?b.message:String(b)}export{n as toolArgsInlineText,h1 as toolArgsBodyText,op as submittedAttachmentsForText,sp as shellAttachmentNoteVisible,n0 as setComposerMode,d as renderPromptMeta,m0 as renderMessages,o0 as promptFromAgUiLikeRunInput,r1 as pluginStyleText,L1 as pluginClass,ap as mergeCommands,tp as hasQueuedAttachmentNames,s as getActiveWorkspaceId,Yb as formatShellOutput,i0 as extractRefs,$b as default,k1 as createComposerSurface,E1 as createChatSurface,S0 as createChatDom,np as createChannels,a0 as createAgUiLikeRunInput,a as commandName,t0 as chatEventsToAgUiLikeEvents,A as backendCall};
