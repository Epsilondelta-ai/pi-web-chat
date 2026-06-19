var M={attachFile:["M16.5 6v11.5a4 4 0 0 1-8 0V5a2.5 2.5 0 0 1 5 0v10.5a1 1 0 0 1-2 0V6H10v9.5","a2.5 2.5 0 0 0 5 0V5a4 4 0 0 0-8 0v12.5a5.5 5.5 0 0 0 11 0V6h-1.5Z"].join(""),stop:"M6 6h12v12H6V6Z",send:"M2 21 23 12 2 3v7l15 2-15 2v7Z",terminal:"M3 4h18v16H3V4Zm2 2v12h14V6H5Zm2 3 1.1-1.1L12.2 12l-4.1 4.1L7 15l3-3-3-3Zm6 6h5v1.5h-5V15Z",file:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 2.5L17.5 8H14V4.5ZM8 13h8v1.5H8V13Zm0 3h8v1.5H8V16Z"},c={attachFile:x("attach_file",M.attachFile),stop:x("stop",M.stop),send:x("send",M.send),terminal:x("terminal",M.terminal)};function g1(b){return`<span class="composer-spinner" aria-hidden="true"></span><span class="sr-only">${I(b)}</span>`}function x(b,w){return`<svg class="material-icon" data-material-icon="${b}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="${w}"></path></svg>`}function I(b){return b.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function z1(){return"pi-web-chat-mounted"}function r1(){let b=document.createElement("main");return b.className="main pi-web-chat-surface",b.dataset.main="session",b.dataset.pluginChatRoot="",b.innerHTML='<div class="term"><div class="term-inner" role="log" aria-live="polite" aria-relevant="additions text"></div></div><button type="button" class="scroll-bottom-btn" data-action="scroll-bottom" aria-label="stick to bottom" title="stick to bottom" aria-pressed="true" hidden>↓</button>',b}function c1(){let b=document.createElement("section");return b.className="prompt-region pi-web-chat-composer",b.innerHTML=`
    <div class="slash-pop" hidden><div class="slash-head">slash commands · type to filter</div><div class="slash-list"></div></div>
    <div class="prompt-file-ref-pop" hidden><div class="slash-head">project files · type to filter</div><div class="prompt-file-ref-list"></div></div>
    <div class="prompt-bar">
      <button class="attach-btn" type="button" aria-label="attach files" title="attach files">${c.attachFile}</button>
      <input type="file" multiple hidden data-file-input />
      <div class="prompt-input-col"><div class="attach-chips" hidden></div><div class="shell-attachment-note" aria-live="polite" hidden>queued attachments are hidden during shell mode and will reappear for the next normal prompt</div><textarea class="prompt-textarea" aria-label="Prompt" placeholder="ask pi to do something…" rows="1"></textarea></div>
      <div class="prompt-actions">
        <button class="stop-btn" type="button" aria-label="stop" title="stop" hidden>${c.stop}</button>
        <button class="mic-btn" type="button" data-action="toggle-speech-input" aria-label="start voice input" title="voice input" hidden>\uD83C\uDF99</button>
        <button class="send-btn" type="button" aria-label="send" title="send" aria-disabled="true">${c.send}</button>
      </div>
      <div class="drop-overlay" hidden><span>drop to attach</span></div>
    </div>
    <div class="prompt-meta" data-prompt-meta></div>`,p1(b,{}),b}function p1(b,w={},p=!1){let f=b.querySelector("[data-prompt-meta]");if(!f)return;let L=[e0(w.model||"—",w.thinkingLevel)],T=u1("5h",w.fiveHourQuota),H=u1("Week",w.weeklyQuota),$=w.currentBranch||w.branch||"—";if(w.warning)L.push(s0(w.warning));if(T)L.push(T);if(H)L.push(H);if(L.push(t0($)),f.innerHTML=L.join(" | "),p)f.append(document.createTextNode(" | "),o0())}function o0(){let b=document.createElement("span");return b.className="prompt-meta-item pi-web-chat-badge",b.textContent="chat plugin",b}function t0(b){return`<span class="prompt-meta-item prompt-meta-branch">${I1("git-branch")}<span>${I(b)}</span></span>`}function s0(b){return`<span class="prompt-meta-item prompt-meta-warning" title="${I(b)}">runtime warning</span>`}function e0(b,w){let p=I(b);return w?`${p} (${I(w)})`:p}function u1(b,w){if(typeof w!=="number"||!Number.isFinite(w))return;let p=Math.max(0,Math.min(100,Math.round(w))),f=p>=70?"full":p>=30?"medium":"low";return`<span class="prompt-meta-item prompt-meta-battery prompt-meta-battery-${f}">${I(b)} ${I1(`battery-${f}`)}(${p}%)</span>`}function I1(b){return{"battery-full":'<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 10v4"></path><path d="M14 10v4"></path><path d="M22 14v-4"></path><path d="M6 10v4"></path><rect x="2" y="6" width="16" height="12" rx="2"></rect></svg>',"battery-medium":'<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 14v-4"></path><path d="M22 14v-4"></path><path d="M6 14v-4"></path><rect x="2" y="6" width="16" height="12" rx="2"></rect></svg>',"battery-low":'<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 14v-4"></path><path d="M6 14v-4"></path><rect x="2" y="6" width="16" height="12" rx="2"></rect></svg>',"git-branch":'<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6a9 9 0 0 0-9 9V3"></path><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle></svg>'}[b]||""}function bb(){let b=document.createElement("section");return b.className="pi-web-chat-root",b.dataset.plugin="pi-web-chat",b.innerHTML=`
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
        <button class="pi-web-chat-icon-btn" type="button" data-attach aria-label="attach files" title="attach files">${x("attach_file",M.attachFile)}</button>
        <input type="file" multiple hidden data-file-input />
        <textarea class="pi-web-chat-textarea" data-chat-input aria-label="Prompt" placeholder="ask pi to do something…" rows="1"></textarea>
        <button class="pi-web-chat-send" type="button" data-send aria-label="send" title="send" aria-disabled="true">${x("send",M.send)}</button>
      </div>
    </section>`,{root:b,transcript:A(b.querySelector("[data-chat-transcript]")),textarea:A(b.querySelector("[data-chat-input]")),sendButton:A(b.querySelector("[data-send]")),attachButton:A(b.querySelector("[data-attach]")),fileInput:A(b.querySelector("[data-file-input]")),slashPopover:A(b.querySelector("[data-slash-popover]")),slashList:A(b.querySelector("[data-slash-list]")),refsPopover:A(b.querySelector("[data-refs-popover]")),refsList:A(b.querySelector("[data-refs-list]")),attachments:A(b.querySelector("[data-attachments]"))}}function wb(b,w){b.replaceChildren(...w.map(pb)),b.scrollTop=b.scrollHeight}function pb(b){let w=document.createElement("article");w.className=`pi-web-chat-message pi-web-chat-message-${b.role}`,w.dataset.messageId=b.id;let p=document.createElement("div");p.className="pi-web-chat-message-role",p.textContent=b.role;let f=document.createElement("pre");if(f.className="pi-web-chat-message-body",f.textContent=b.text,w.append(p,f),b.thinking){let L=document.createElement("details");L.className="pi-web-chat-thinking",L.open=Boolean(b.streaming);let T=document.createElement("summary");T.textContent="thinking";let H=document.createElement("pre");H.textContent=b.thinking,L.append(T,H),w.append(L)}if(b.toolCalls?.length){let L=document.createElement("div");L.className="pi-web-chat-tools";for(let T of b.toolCalls){let H=document.createElement("details");H.className=`pi-web-chat-tool pi-web-chat-tool-${T.status}`,H.open=T.status==="running";let $=document.createElement("summary");$.textContent=`${T.name} · ${T.status}`;let h=document.createElement("pre");h.textContent=T.text||N1(T),H.append($,h),L.append(H)}w.append(L)}if(b.streaming){let L=document.createElement("div");L.className="pi-web-chat-message-meta",L.textContent="streaming...",w.append(L)}if(b.attachments?.length){let L=document.createElement("div");L.className="pi-web-chat-message-meta",L.textContent=`${b.attachments.length} attachment(s)`,w.append(L)}return w}function f1(b){if(b.argsStatus==="truncated")return"arguments truncated";if(b.argsStatus==="omitted")return"arguments omitted";if(b.argsStatus==="unavailable")return"arguments unavailable";if(b.argsStatus==="empty")return"no arguments";if(!b.args)return"";return JSON.stringify(b.args)}function N1(b){if(b.argsStatus==="truncated")return"arguments truncated: too large to display";if(b.argsStatus==="omitted")return"arguments omitted: response too large";if(b.argsStatus==="unavailable")return"arguments unavailable";if(b.argsStatus==="empty")return"no arguments";if(!b.args)return"arguments unavailable";return JSON.stringify(b.args,null,2)}function fb(b,w){b.root.dataset.composerMode=w,O1(b.attachButton,w)}function S1(b,w,p){if(b.disabled=w==="steering"||w==="loading"&&!p,b.dataset.mode=w,b.setAttribute("aria-disabled",p?"false":"true"),w==="loading"){let f=p?"send steering message":"loading";b.innerHTML=g1(f),b.title=f,b.setAttribute("aria-label",f);return}if(w==="steering"){b.innerHTML=g1("steering"),b.title="steering message pending",b.setAttribute("aria-label","steering message pending");return}b.innerHTML=c.send,b.title="send",b.setAttribute("aria-label","send")}function O1(b,w){if(b.disabled=w==="shell",b.setAttribute("aria-disabled",w==="shell"?"true":"false"),w==="shell"){b.innerHTML=c.terminal,b.title="shell command mode",b.setAttribute("aria-label","shell command mode");return}if(w==="file-ref"){b.innerHTML=x("file",M.file),b.title="file reference mode",b.setAttribute("aria-label","file reference mode");return}b.innerHTML=c.attachFile,b.title="attach files",b.setAttribute("aria-label","attach files")}function j1(b,w){b.hidden=w.length===0,b.replaceChildren(...w.map((p)=>{let f=document.createElement("span");return f.className="pi-web-chat-attachment-chip",f.textContent=p,f}))}function m1(){return`
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
  `}function d1(){document.getElementById("pi-web-chat-style")?.remove();let b=document.createElement("style");return b.id="pi-web-chat-style",b.textContent=m1(),document.head.append(b),b}function L1(b){return b.command||b.cmd||(b.name?`/${b.name}`:"")}function A(b){if(!b)throw Error("pi-web-chat DOM template is invalid");return b}function Lb(b,w,p){return{threadId:b,runId:w,state:{},messages:p,tools:[],context:[]}}function Tb(b){let w=[...b.messages].reverse().find((p)=>p.role==="user");return{text:w?.text||"",attachments:w?.attachments||[],sessionId:b.threadId}}function Hb(b,w,p){return b.map((f)=>$b(f,w,p))}function $b(b,w,p){if(b.type==="text.delta")return{type:"TEXT_MESSAGE_CONTENT",threadId:w,runId:p,delta:b.delta||""};if(b.type==="thinking.delta")return{type:"THINKING_MESSAGE_CONTENT",threadId:w,runId:p,delta:b.delta||""};if(b.type==="tool.start")return{type:"TOOL_CALL_START",threadId:w,runId:p,toolCallId:b.toolCallId,payload:n1(b)};if(b.type==="tool.delta")return{type:"TOOL_CALL_ARGS",threadId:w,runId:p,toolCallId:b.toolCallId,delta:b.delta||""};if(b.type==="tool.end")return{type:"TOOL_CALL_END",threadId:w,runId:p,toolCallId:b.toolCallId,payload:n1(b)};return{type:b.type.toUpperCase().replaceAll(".","_"),threadId:w,runId:p,payload:b}}function n1(b){return{name:b.toolName||"tool",args:b.args||{},result:b.result||"",isError:b.isError===!0}}var T1="pi-web-chat.sessions.v1";var $0="plugin.pi-web-sidebar.selectedSession",h0="plugin.pi-web-sidebar.event",_0="plugin.pi-web-sidebar.activeSessionId",U1="plugin.pi-web-sidebar.activeWorkspaceId",hb=12,a1=20,a=200,K1=200,_b=8,ib=1e6,Rb=64000;var zb=250,Nb=100,Ob=6,jb=100,i0="piWebChatAssistantOnlyAnchorUsed",S=new Set,q1=new WeakMap,yb={"book-open":'<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',"file-plus":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="M9 15h6"/>',pencil:'<path d="M21.2 6.8 17.2 2.8a2 2 0 0 0-2.8 0L3 14.2V21h6.8L21.2 9.6a2 2 0 0 0 0-2.8z"/><path d="m14 5 5 5"/>',terminal:'<path d="m4 17 6-6-6-6"/><path d="M12 19h8"/>',cpu:'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 15h3"/><path d="M1 9h3"/><path d="M1 15h3"/>',globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 0 20"/><path d="M12 2a15.3 15.3 0 0 0 0 20"/>',search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',braces:'<path d="M8 3H7a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-4a2 2 0 0 1 2-2 2 2 0 0 1-2-2V7a2 2 0 0 0-2-2h-1"/>',"file-text":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',"circle-question-mark":'<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 1 1 5.8 1c-.5 1-1.4 1.5-2.1 2-.6.4-.8.8-.8 2"/><path d="M12 17h.01"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',plug:'<path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a6 6 0 0 1-12 0V8Z"/>',"git-branch":'<line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',"circle-check":'<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',hammer:'<path d="m15 12-8.5 8.5a2.1 2.1 0 0 1-3-3L12 9"/><path d="m17.6 5.4 1.8-1.8"/><path d="m14 7 3 3"/><path d="M5 11 2 8l6-6 3 3"/>',package:'<path d="m7.5 4.3 9 5.2"/><path d="M21 8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>'},C1=new WeakMap,Vb={read:"book-open",write:"file-plus",edit:"pencil",ctx_execute:"cpu",ctx_batch_execute:"cpu",ctx_execute_file:"cpu",ctx_search:"cpu",ctx_index:"cpu",ctx_fetch_and_index:"cpu",web_search:"globe",fetch_content:"search",get_search_content:"search",code_search:"braces",document_parse:"file-text",ask_user_question:"circle-question-mark",teams:"users",subagent:"users",mcp:"plug",git:"git-branch"};class R0{#b=[];add(b){if(b)this.#b.push(b);return b}listen(b,w,p){b.addEventListener(w,p),this.add({remove:()=>b.removeEventListener(w,p)})}dispose(){for(let b of this.#b.splice(0).reverse())if(typeof b==="function")b();else if("unsubscribe"in b)b.unsubscribe();else b.remove()}}function Zb(b={}){let w=b.app;if(w?.piWebChat?.dispose(),typeof b.mount?.chat!=="function"||typeof b.mount?.composer!=="function")throw Error("pi-web-chat requires modern pi-web mount.chat and mount.composer APIs");return Jb(b,w)}function Jb(b,w){let p=new R0,f=p.add(d1());Gb(w);let L=r1(),T=c1(),H=b.mount?.chat(L,{replace:!0}),$=b.mount?.composer(T,{replace:!0});if(Vw(p,L),H)p.add(H);if($)p.add($);let h=k(b);g(b,h||void 0);let _=h?.sessionId?aw(h.sessionId):nw(),i={backendChatToken:0,pendingPromptEchoIds:new Map,pendingAssistantEchoIds:new Map,completedRunIds:new Set};if(!h?.sessionId)_1(L);else Y(L,w1(_).messages,_.activeSessionId),h1(b,L,_,i,h.sessionId);_w(p,b,L,_,i),Qb(p,L,_,i),Yb(p,b,T,L,_,i),qb(b,T),w?.classList.add(z1());let R=()=>{if(i.runEventsAbort?.abort(),i.sessionEventsAbort?.abort(),p.dispose(),S.clear(),f.remove(),w?.classList.remove(z1()),w?.piWebChat===N)delete w.piWebChat},N={dispose:R};if(w)w.piWebChat=N;return R}function Gb(b){if(!b)return;b.querySelectorAll(".pi-web-chat-surface, .pi-web-chat-composer").forEach((w)=>{w.remove()})}function qb(b,w){p1(w,{}),Cb(b,w)}async function Cb(b,w){try{let p=X(b),f=p.path?{workspacePath:p.path}:{},L=await v(b,"runtimeStatus",f,p.id),T=D(L)?L:{},H=D(T.status)?Fb(T.status):void 0;if(!H)return;p1(w,H)}catch{}}function Fb(b){let w={};if(typeof b.model==="string")w.model=b.model;if(typeof b.modelProvider==="string")w.modelProvider=b.modelProvider;if(typeof b.thinkingLevel==="string")w.thinkingLevel=b.thinkingLevel;if(typeof b.fiveHourQuota==="number")w.fiveHourQuota=b.fiveHourQuota;if(typeof b.weeklyQuota==="number")w.weeklyQuota=b.weeklyQuota;if(typeof b.currentBranch==="string")w.currentBranch=b.currentBranch;if(typeof b.branch==="string")w.branch=b.branch;if(typeof b.warning==="string")w.warning=b.warning;return w}function Yb(b,w,p,f,L,T){let H=p.querySelector(".prompt-textarea"),$=p.querySelector(".send-btn"),h=p.querySelector(".attach-btn"),_=p.querySelector(".stop-btn"),i=p.querySelector("[data-file-input]"),R=p.querySelector(".attach-chips"),N=p.querySelector(".shell-attachment-note");if(!H||!$)return;let y=p.querySelector(".prompt-bar"),V=p.querySelector(".slash-pop"),j=p.querySelector(".prompt-file-ref-pop"),O={selectedAttachments:[],shellMode:!1,commands:[]},F=()=>{Ub(R,H.value,O)},K=()=>{Kb(y,H,h,N,O)},G=()=>{let J=H.value,Z=Xb(T),z=Boolean(T.pendingSteering),q=Boolean(T.activeRunId&&T.activeRunSessionId===L.activeSessionId),U=z?"steering":Z?"loading":"idle",d=Boolean(J.trim())&&!z&&!T.resolvingSubmit&&(!Z||q);if(S1($,U,d),y)y.dataset.runState=U;if(_){let l=Boolean(T.pendingSteering&&!T.pendingSteering.sent);_.hidden=!Z&&!l,_.disabled=!1,_.title=l?"cancel steering":"stop response",_.setAttribute("aria-label",l?"cancel steering":"stop response")}if(F(),o1(O),O.shellMode){y1(V,j);return}Pb(w,p,H,J,O.commands,(l)=>{O.commands=l}),O.fileSearchTimer=setTimeout(()=>{Mb(w,p,H,H.value)},120)},u=()=>{O.shellMode=!0,y1(V,j),K(),F()},P=()=>{O.shellMode=!1,K(),F()},E=async(J)=>{J?.preventDefault(),J?.stopImmediatePropagation();let Z=H.value.trim();if(G(),T.resolvingSubmit||T.pendingSteering)return;if(T.startingRunSessionId||T.fallbackSubmittingSessionId)return;if(!Z){H.value="",G();return}if(T.resolvingSubmit=!0,H.value="",i)i.value="";G();try{if(O.shellMode)e1(Z,[]),await Ab(w,f,L,Z),P();else{let z=[...O.selectedAttachments,...await vb(w,Z)];O.selectedAttachments=[],F(),e1(Z,z);let q=cb(w,f,L,T,Z,z,G);T.resolvingSubmit=!1,G(),await q}}catch(z){if(!d0(z))Y(f,[lb(z)],L.activeSessionId)}finally{T.resolvingSubmit=!1,K(),G()}};if(b.listen(H,"input",()=>{if(!O.shellMode&&H.value.startsWith("! "))H.value=H.value.slice(2),u();G()}),b.listen(H,"keydown",(J)=>{let Z=J;if(Z.key===" "&&!O.shellMode&&H.value==="!"&&H.selectionStart===1&&H.selectionEnd===1){Z.preventDefault(),H.value="",u(),G();return}if(Z.key==="Backspace"&&O.shellMode&&H.value===""){Z.preventDefault(),P(),G();return}if(Z.key==="Escape"){y1(V,j);return}if(Z.key==="Enter"&&(Z.metaKey||Z.ctrlKey))E(Z)}),b.listen($,"click",(J)=>{E(J)}),_)b.listen(_,"click",(J)=>{J.preventDefault(),J.stopImmediatePropagation(),Db(w,f,L,T).finally(G),G()});if(h&&i)b.listen(h,"click",()=>{if(!O.shellMode)i.click()}),b.listen(i,"change",()=>{Wb(i,(J)=>{O.selectedAttachments=J,F()})});T.onRunStateChange=G,b.add({remove:()=>{if(o1(O),T.onRunStateChange===G)T.onRunStateChange=void 0}}),K(),G()}function Xb(b){return Boolean(b.activeRunId||b.startingRunSessionId||b.fallbackSubmittingSessionId||b.pendingSteering)}function Qb(b,w,p,f){b.listen(w,"click",(L)=>{let H=L.target?.closest?.("[data-action='cancel-steering']");if(!H)return;L.preventDefault(),L.stopPropagation();let $=H.dataset.sessionId||"",h=H.dataset.messageId||"";if(!z0(p,f)&&$&&h)t(p,$,h);if($&&p.activeSessionId===$)Y(w,Q(p,$).messages,$)})}async function Db(b,w,p,f){if(f.pendingSteering&&!f.pendingSteering.sent){let $=f.pendingSteering.sessionId;if(z0(p,f),p.activeSessionId===$)Y(w,Q(p,$).messages,$);return}let L=f.activeRunId,T=f.activeRunSessionId||f.startingRunSessionId||f.fallbackSubmittingSessionId||p.activeSessionId,H=f.activeRunWorkspaceId||X(b).id;if(!L){f.runEventsAbort?.abort(),f.startingRunSessionId=void 0,f.fallbackSubmittingSessionId=void 0;return}f.runEventsAbort?.abort();try{await G0(b,L,T,H)}catch($){globalThis.piWeb?.subject("toast.requested").next({level:"error",message:`stop failed: ${R1($)}`})}finally{if(f.activeRunId===L)f.activeRunId=void 0,f.activeRunSessionId=void 0,f.activeRunWorkspacePath=void 0,f.activeRunWorkspaceId=void 0}}function z0(b,w){let p=w.pendingSteering;if(!p||p.sent)return!1;return clearTimeout(p.timeout),p.controller.abort(),w.pendingSteering=void 0,t(b,p.sessionId,p.messageId),!0}function Ub(b,w,p){if(!b)return;if(p.shellMode){j1(b,[]);return}j1(b,[...p.selectedAttachments.map((f)=>f.name||"attachment"),...N0(w)])}function Kb(b,w,p,f,L){if(b?.classList.toggle("shell-mode",L.shellMode),w.setAttribute("placeholder",L.shellMode?"run shell command in workspace…":"ask pi to do something…"),f)f.hidden=!(L.shellMode&&L.selectedAttachments.length>0);if(p)O1(p,L.shellMode?"shell":"normal")}function o1(b){if(b.fileSearchTimer)clearTimeout(b.fileSearchTimer),b.fileSearchTimer=void 0}function y1(b,w){b?.setAttribute("hidden",""),w?.setAttribute("hidden","")}function lb(b){return{id:B(),role:"system",text:`prompt failed: ${R1(b)}`,createdAt:Date.now()}}async function Wb(b,w){let p=Array.from(b.files||[]).slice(0,_b),f=[];for(let L of p){if(L.size>ib)continue;f.push({name:L.name,size:L.size,content:await L.text(),mimeType:L.type||void 0})}w(f)}async function Ab(b,w,p,f){let L=Q0(b,p),T=Q(p,L),H={id:B(),role:"user",text:`! ${f}`,createdAt:Date.now()},$={id:B(),role:"tool",text:`$ ${f}
(running...)`,createdAt:Date.now()};T.messages.push(H,$),T.updatedAt=Date.now(),C(p),Y(w,T.messages,L);try{let h=await v(b,"runShell",{command:f}),_=typeof h.exitCode==="number"?h.exitCode:1,i=typeof h.durationMs==="number"?h.durationMs:0,R=typeof h.output==="string"?h.output:"";$.text=Bb(f,R,_,i,Boolean(h.truncated))}catch(h){$.text=`$ ${f}
${R1(h)}`}T.updatedAt=Date.now(),C(p),Y(w,T.messages,L)}async function vb(b,w){let p=N0(w);if(!p.length)return[];let f=await v(b,"resolveContext",{text:w,refs:p});return Array.isArray(f.attachments)?f.attachments.filter(D):[]}function Bb(b,w,p,f,L){let T=Eb(w,Rb),H=L||T.truncated,$=T.text.endsWith(`
`)||!T.text?"":`
`;return`$ ${b}
${T.text}${$}[exit ${p} · ${f}ms${H?" · truncated":""}]`}function Eb(b,w){let p=new TextEncoder,f=p.encode(b);if(f.byteLength<=w)return{text:b,truncated:!1};let L=new TextDecoder().decode(f.slice(0,w));while(L&&p.encode(L).byteLength>w)L=L.slice(0,-1);return{text:L,truncated:!0}}async function Pb(b,w,p,f,L,T){let H=w.querySelector(".slash-pop"),$=w.querySelector(".slash-list"),h=Pw(f);if(h===null||!$){H?.setAttribute("hidden","");return}let _=L;if(!_.length){let R=await v(b,"commands",{});_=Array.isArray(R.commands)?R.commands.filter(D):[],T(_)}if(p.value!==f)return;let i=_.filter((R)=>{return L1(R).slice(1).toLowerCase().includes(h)});xb($,i,p,H),H?.toggleAttribute("hidden",i.length===0)}async function Mb(b,w,p,f){let L=w.querySelector(".prompt-file-ref-pop"),T=w.querySelector(".prompt-file-ref-list"),H=Mw(f);if(H===null||!T){L?.setAttribute("hidden","");return}try{let $=await v(b,"searchFiles",{query:H,limit:hb}),h=Array.isArray($.files)?$.files.filter(D):[];if(p.value!==f)return;kb(T,p,h,L),L?.toggleAttribute("hidden",h.length===0)}catch{L?.setAttribute("hidden","")}}function xb(b,w,p,f){b.replaceChildren(...w.map((L)=>{let T=document.createElement("button"),H=L1(L);return T.type="button",T.className="slash-item",T.dataset.slash=H,T.innerHTML='<span class="sl-name"></span><span class="sl-desc"></span>',T.querySelector(".sl-name").textContent=H,T.querySelector(".sl-desc").textContent=L.description||"",T.addEventListener("click",()=>{p.value=L.template||`${H} `,f?.setAttribute("hidden",""),p.dispatchEvent(new(p.ownerDocument.defaultView?.Event||Event)("input",{bubbles:!0})),p.focus()}),T}))}function kb(b,w,p,f){b.replaceChildren(...p.map((L)=>{let T=L.path||L.name||"",H=document.createElement("button");return H.type="button",H.className="prompt-file-ref-item",H.dataset.path=T,H.disabled=!T,H.innerHTML='<span class="pfr-path"></span><span class="pfr-kind"></span>',H.querySelector(".pfr-path").textContent=T,H.querySelector(".pfr-kind").textContent=typeof L.size==="number"?`${L.size} bytes`:"file",H.addEventListener("click",()=>{gb(w,T),f?.setAttribute("hidden","")}),H}))}function gb(b,w){if(!w)return;let{value:p,selectionStart:f}=b,L=p.slice(0,f),T=/(?:^|\s)@([^\s@`]*)$/.exec(L),H=T?f-(T[1]||"").length-1:f,$=`@${w} `;b.value=`${p.slice(0,H)}${$}${p.slice(f)}`;let h=H+$.length;b.setSelectionRange(h,h),b.dispatchEvent(new(b.ownerDocument.defaultView?.Event||Event)("input",{bubbles:!0})),b.focus()}function h2(b){return{input$:b.behaviorSubject("chat.input",""),submitted$:b.subject("chat.input.submitted"),activeSessionId$:b.behaviorSubject("session.activeId",null),sidebarSelectedSession$:b.behaviorSubject($0,ub()),toastRequested$:b.subject("toast.requested")}}function N0(b){let w=[],p=new Set,f=/(^|[\s`])@([^\s@`]+)/g,L=f.exec(String(b||""));while(L!==null){let T=L[2]||"";if((L[1]||"")!=="`"&&T&&!p.has(T))p.add(T),w.push(T);L=f.exec(String(b||""))}return w}function _2(b=[],w=[]){let p=[],f=new Set;for(let L of[...b,...w]){let T=L1(L);if(!T||f.has(T))continue;f.add(T),p.push(L)}return p}function $1(b){return b.app?.piWebSidebar?.getSnapshot?.().activeWorkspaceId||b.app?.dataset.activeWorkspaceId||""}function ub(){return k({})}function k(b){let w=b.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),p=w?.activeSessionId||"",f=w?.activeWorkspaceId||"";if(p&&b.app?.dataset.clearedSessionId!==p)return{sessionId:p,workspaceId:f||void 0};return null}function g(b,w){if(w?.workspaceId&&b.app)b.app.dataset.activeWorkspaceId=w.workspaceId,t1(U1,w.workspaceId);if(w?.sessionId)delete b.app?.dataset.clearedSessionId,b.app?.setAttribute("data-active-session-id",w.sessionId),t1(_0,w.sessionId)}function O0(b){let w=k(b);if(w?.sessionId&&b.app)b.app.dataset.clearedSessionId=w.sessionId;b.app?.removeAttribute("data-active-session-id"),rb(_0),globalThis.piWeb?.behaviorSubject("session.activeId",null).next(null)}function o(b,w,p={}){let f=b.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),L={type:w,detail:p,snapshot:f};(b.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$)?.next(L),globalThis.piWeb?.subject(h0).next(L)}function l1(b,w,p){let f=b.app?.dataset.activeWorkspaceId||$1(b),L={reason:p,sessionId:w,workspaceId:f};globalThis.piWeb?.behaviorSubject("session.activeId",w).next(w),o(b,"active.start",L),o(b,"session.created",L)}function W1(b,w){globalThis.piWeb?.subject("session.changed").next({sessionId:b,name:w,title:w})}function A1(b){if(b.title!=="New chat")return"";let p=b.messages.find((f)=>f.role==="user")?.text.slice(0,48)||"";if(!p)return"";return b.title=p,p}function t1(b,w){try{localStorage.setItem(b,w)}catch{}}function rb(b){try{localStorage.removeItem(b)}catch{}}async function v(b,w,p={},f=$1(b)){if(!b.backend)return{};let L=await b.backend(w,{workspaceId:f,data:p});return D(L)?L:{}}function F1(b){let w=Array.isArray(b.warnings)?b.warnings.filter((p)=>typeof p==="string"&&p.trim().length>0):[];for(let p of w)globalThis.piWeb?.subject("toast.requested").next({level:"warning",message:p})}function i2(b,w){return b.trim().startsWith("!")?[]:[...w]}async function cb(b,w,p,f,L,T,H=()=>{}){let $=Q0(b,p),h=X(b);if(f.activeRunId&&f.activeRunSessionId===$){let O=f.activeRunWorkspacePath||h.path,F=f.activeRunWorkspaceId||h.id;await Ib(b,w,p,f,L,T,O,F,H);return}if(f.startingRunSessionId===$||f.fallbackSubmittingSessionId===$)return;f.backendChatToken+=1,f.startingRunSessionId=$,H(),f.runEventsAbort?.abort();let _=new AbortController;f.runEventsAbort=_,f.sessionEventsAbort?.abort();let i={id:B(),role:"user",text:L,attachments:x1(T),createdAt:Date.now()},R=Q(p,$);D1(f.pendingPromptEchoIds,$,i.id),R.messages.push(i),R.updatedAt=Date.now(),C(p),Y(w,R.messages,$);let N;try{N=await sb(b,L,T,$,h.path,h.id)}catch(O){throw f.startingRunSessionId=void 0,H(),O}if(_.signal.aborted){if(f.startingRunSessionId=void 0,typeof N.runId==="string"&&N.runId)await G0(b,N.runId,$,h.id);t(p,$,i.id),H();return}if(F1(N),typeof N.activeSessionId==="string"&&N.activeSessionId){let O=$,F=p.activeSessionId===O;if($=N.activeSessionId,F)m(p,$),g(b,{sessionId:N.activeSessionId,workspaceId:h.id||void 0}),o(b,"chat-session",{reason:"startPrompt",sessionId:N.activeSessionId}),l1(b,N.activeSessionId,"startPrompt");else Q(p,$);u0(p,O,$,i.id),mw(f.pendingPromptEchoIds,O,$)}if(typeof N.runId!=="string"||!N.runId){f.startingRunSessionId=void 0,f.fallbackSubmittingSessionId=$,H();let O;try{O=await eb(b,L,T,$,h.path,h.id)}catch(u){throw f.fallbackSubmittingSessionId=void 0,H(),u}if(_.signal.aborted){f.fallbackSubmittingSessionId=void 0,t(p,$,i.id),H();return}F1(O);let F=typeof O.activeSessionId==="string"&&O.activeSessionId?O.activeSessionId:$,K=e(f.pendingPromptEchoIds,$),G=hw(b,p,O,"submitPrompt",$,K);if(b1(f.pendingPromptEchoIds,F,G,K),p.activeSessionId===$||p.activeSessionId===F)Y(w,G,p.activeSessionId);if(f.runEventsAbort===_)f.runEventsAbort=void 0;f.startingRunSessionId=void 0,f.fallbackSubmittingSessionId=void 0,H();return}let y=Q(p,$);f.activeRunId=N.runId,f.activeRunSessionId=$,f.activeRunWorkspacePath=h.path,f.activeRunWorkspaceId=h.id,f.startingRunSessionId=void 0,H();let V=A1(y);if(V)C(p),W1($,V);let j=ww(y);D1(f.pendingAssistantEchoIds,$,j.id);try{await db(b,p,y,N.runId,h.path,h.id,j,()=>{if(!_.signal.aborted&&p.activeSessionId===$)Y(w,y.messages,$)},_.signal)}finally{if($w(f,N.runId),f.activeRunId===N.runId)f.activeRunId=void 0,f.activeRunSessionId=void 0,f.activeRunWorkspacePath=void 0,f.activeRunWorkspaceId=void 0,f.startingRunSessionId=void 0,f.fallbackSubmittingSessionId=void 0,H();if(f.runEventsAbort===_)f.runEventsAbort=void 0}if(!_.signal.aborted&&p.activeSessionId===$)h1(b,w,p,f,$,h.path,h.id)}async function Ib(b,w,p,f,L,T,H,$,h=()=>{}){let{activeRunId:_,activeRunSessionId:i}=f;if(!_||!i)throw Error("active run is unavailable for steering");if(f.pendingSteering)return;let R={id:B(),role:"user",text:L,attachments:x1(T),createdAt:Date.now(),meta:{piWebChatSteeringState:"pending"}},N=Q(p,i),y=new AbortController,V=Sb(y.signal,()=>{let j=f.pendingSteering;if(j){if(j.sent=!0,mb(p,j.sessionId,j.messageId),p.activeSessionId===j.sessionId)Y(w,Q(p,j.sessionId).messages,j.sessionId);h()}});if(f.pendingSteering={sessionId:i,messageId:R.id,timeout:V.timeout,controller:y,sent:!1},D1(f.pendingPromptEchoIds,i,R.id),N.messages.push(R),N.updatedAt=Date.now(),C(p),p.activeSessionId===i)Y(w,N.messages,i);h();try{if(await V.promise,y.signal.aborted)return;let j=await bw(b,_,L,T,i,H,$);F1(j)}catch(j){if(d0(j))return;if(t(p,i,R.id),Sw(f.pendingPromptEchoIds,i,R.id),J0(j)){Y(w,N.messages,i),globalThis.piWeb?.subject("toast.requested").next({level:"error",message:"This backend does not support steering while a response is streaming."});return}throw j}finally{if(f.pendingSteering?.controller===y)f.pendingSteering=void 0,h()}}function Sb(b,w){let p,f=new Promise((L,T)=>{p=setTimeout(()=>{w(),L()},jb),b.addEventListener("abort",()=>{clearTimeout(p),T(new DOMException("Steering cancelled","AbortError"))},{once:!0})});return{timeout:p,promise:f}}function t(b,w,p){let f=b.sessions.find((L)=>L.id===w);if(!f)return;f.messages=f.messages.filter((L)=>L.id!==p),r0(b,f.id),C(b)}function mb(b,w,p){let f=Q(b,w).messages.find((L)=>L.id===p);if(!f?.meta)return;if(delete f.meta.piWebChatSteeringState,Object.keys(f.meta).length===0)delete f.meta;C(b)}async function db(b,w,p,f,L,T,H,$,h){let _=await y0(b,"streamEventsSse",{runId:f,cursor:0,workspacePath:L},h,T);if(!_)throw Error("SSE streaming backend did not return a stream");let i=j0($),R=nb(w,Nb);H.streaming=!0,i.flush();try{await V0(_,(N)=>{pw(H,[N]),H.streaming=N.type!=="run.end",p.updatedAt=Date.now(),R.request(),i.request()})}finally{H.streaming=!1,R.flush(),i.flush()}}function nb(b,w){let p=0,f,L=()=>{if(f)clearTimeout(f),f=void 0},T=()=>{L(),p=Date.now(),C(b)};return{request:()=>{let $=w-(Date.now()-p);if($<=0){T();return}f||=setTimeout(T,$)},flush:T}}function j0(b){let w=0,p,f=()=>{if(p)clearTimeout(p),p=void 0},L=()=>{f(),w=Date.now(),b()};return{request:()=>{let H=zb-(Date.now()-w);if(H<=0){L();return}p||=setTimeout(L,H)},flush:L,cancel:f}}async function y0(b,w,p={},f,L=$1(b)){if(!b.backendStream)throw Error("SSE streaming backend is unavailable");let T=await b.backendStream(w,{workspaceId:L,data:p},{signal:f});return ab(T)}function ab(b){if(typeof ReadableStream<"u"&&b instanceof ReadableStream)return b;if(typeof Response<"u"&&b instanceof Response)return b.body;if(typeof b==="string")return s1(b);if(!D(b))return null;let w=b.body;if(typeof ReadableStream<"u"&&w instanceof ReadableStream)return w;let p=b.sse;if(typeof p==="string")return s1(p);return null}function s1(b){let w=new TextEncoder().encode(b);return new ReadableStream({start(p){p.enqueue(w),p.close()}})}async function V0(b,w){let p=b.getReader(),f=new TextDecoder,L="";while(!0){let T=await p.read();if(T.done){L+=f.decode(),tb(L,w);return}L+=f.decode(T.value,{stream:!0});let H=ob(L);L=H.remainder;for(let $ of H.frames)Z0($,w)}}function ob(b){let p=b.replaceAll(`\r
`,`
`).replaceAll("\r",`
`).split(`

`),f=p.pop()||"";return{frames:p,remainder:f}}function tb(b,w){let p=b.trim();if(p)Z0(p,w)}function Z0(b,w){let p=b.split(`
`).filter((f)=>f.startsWith("data:")).map((f)=>f.slice(5).trimStart()).join(`
`);if(!p)return;try{let f=JSON.parse(p);if(Tw(f))w(f)}catch{}}function e1(b,w){globalThis.piWeb?.subject("chat.input.submitted").next({text:b,attachments:x1(w)||[]})}async function sb(b,w,p,f,L=X(b).path,T=X(b).id){try{return await v(b,"startPrompt",v1(w,p,f,L),T)}catch(H){if(J0(H))return{};throw H}}function J0(b){return/unknown method: (startPrompt|streamEventsSse|steerPrompt)|unsupported method: (startPrompt|streamEventsSse|steerPrompt)|(startPrompt|streamEventsSse|steerPrompt) unsupported/i.test(R1(b))}async function eb(b,w,p,f="",L=X(b).path,T=X(b).id){return await v(b,"submitPrompt",v1(w,p,f,L),T)}async function bw(b,w,p,f,L="",T=X(b).path,H=X(b).id){let $={...v1(p,f,L,T),runId:w};return v(b,"steerPrompt",$,H)}async function G0(b,w,p="",f=X(b).id){return v(b,"abortPrompt",{runId:w,sessionId:p},f)}function v1(b,w,p,f){let L={text:b,attachments:w,sessionId:p};if(f)L.workspacePath=f;return L}function ww(b){let w=[...b.messages].reverse().find((f)=>f.role==="assistant"&&f.streaming);if(w)return w;let p={id:B(),role:"assistant",text:"",createdAt:Date.now(),streaming:!0};return b.messages.push(p),p}function pw(b,w){for(let p of w)if(p.type==="text.delta"&&typeof p.delta==="string")V1(b,"text",p.delta),b.text+=p.delta;else if(p.type==="thinking.delta"&&typeof p.delta==="string")V1(b,"thinking",p.delta),b.thinking=`${b.thinking||""}${p.delta}`;else if(p.type==="tool.start")Z1(b,p,"running");else if(p.type==="tool.delta"&&typeof p.delta==="string"){let f=Z1(b,p,"running");f.text=p.delta}else if(p.type==="tool.end"){let f=Z1(b,p,p.isError?"err":"ok");if(typeof p.result==="string"&&p.result)f.text=p.result}else if(p.type==="error"&&typeof p.message==="string")V1(b,"text",`${b.text?`
`:""}${p.message}`),b.text+=`${b.text?`
`:""}${p.message}`}function V1(b,w,p){b.blocks||=[];let f=b.blocks[b.blocks.length-1];if(f?.type===w){f.text+=p;return}if(b.blocks.length<K1)b.blocks.push({id:B(),type:w,text:p})}function Z1(b,w,p){let f=w.toolCallId||w.toolName||"tool";b.toolCalls||=[];let L=b.toolCalls.find((T)=>T.id===f);if(!L)L={id:f,name:w.toolName||"tool",args:w.args,text:"",status:p},b.toolCalls.push(L),fw(b,L);if(L.status=p,Lw(L,w))L.args=w.args,L.argsStatus=w.argsStatus;return L}function fw(b,w){if(b.blocks||=[],b.blocks.some((p)=>p.type==="tool"&&p.toolCall?.id===w.id))return;if(b.blocks.length<K1)b.blocks.push({id:B(),type:"tool",text:"",toolCall:w})}function Lw(b,w){if(!w.argsStatus)return Boolean(w.args);if(w.argsStatus==="unavailable")return!b.argsStatus;return!0}function Tw(b){return D(b)&&typeof b.type==="string"}async function h1(b,w,p,f,L="",T=B1(b),H=X(b).id){if(!b.backendStream){await b0(b,w,p,f,L,T);return}let $=++f.backendChatToken;f.sessionEventsAbort?.abort();let h=new AbortController;f.sessionEventsAbort=h;let _=j0(()=>{Y(w,w1(p).messages,p.activeSessionId)});try{let i=await y0(b,"sessionEventsSse",q0(b,L,T),h.signal,H);if(!i)throw Error("session SSE backend did not return a stream");await V0(i,(R)=>{if($!==f.backendChatToken||R.type!=="chat.state")return;let N=Hw(R),y=typeof N.activeSessionId==="string"?N.activeSessionId:L,V=e(f.pendingPromptEchoIds,y),j=e(f.pendingAssistantEchoIds,y),O=Y0(b,p,N,"chatState",V,j,{allowAssistantOnlyTailEcho:k0(f,N,y),preserveOnlyEchoMessages:!0});if(C0(f,N,y,T,H),b1(f.pendingPromptEchoIds,y,O,V),b1(f.pendingAssistantEchoIds,y,O,j),O.length||Array.isArray(N.messages))_.request()})}catch(i){if(!h.signal.aborted)await b0(b,w,p,f,L,T)}finally{if(_.flush(),f.sessionEventsAbort===h)f.sessionEventsAbort=void 0}}async function b0(b,w,p,f,L="",T=B1(b)){let H=++f.backendChatToken;try{let $=await v(b,"chatState",q0(b,L,T));if(H!==f.backendChatToken)return;let h=typeof $.activeSessionId==="string"?$.activeSessionId:L,_=e(f.pendingPromptEchoIds,h),i=e(f.pendingAssistantEchoIds,h),R=Y0(b,p,$,"chatState",_,i,{allowAssistantOnlyTailEcho:k0(f,$,h),preserveOnlyEchoMessages:!0});if(C0(f,$,h,T,X(b).id),b1(f.pendingPromptEchoIds,h,R,_),b1(f.pendingAssistantEchoIds,h,R,i),R.length||Array.isArray($.messages))Y(w,R,p.activeSessionId)}catch{}}function q0(b,w,p=B1(b)){let f=w?{sessionId:w}:{};if(p)f.workspacePath=p;return f}function Hw(b){return{activeSessionId:b.activeSessionId,messages:b.messages,runId:b.runId,isStreaming:b.isStreaming}}function C0(b,w,p,f,L){if(w.isStreaming===!0&&typeof w.runId==="string"&&w.runId&&!b.completedRunIds.has(w.runId)){b.activeRunId=w.runId,b.activeRunSessionId=typeof w.activeSessionId==="string"&&w.activeSessionId?w.activeSessionId:p,b.activeRunWorkspacePath=f,b.activeRunWorkspaceId=L,b.onRunStateChange?.();return}if(w.isStreaming===!1&&(!w.activeSessionId||w.activeSessionId===b.activeRunSessionId))b.activeRunId=void 0,b.activeRunSessionId=void 0,b.activeRunWorkspacePath=void 0,b.activeRunWorkspaceId=void 0,b.onRunStateChange?.()}function $w(b,w){if(b.completedRunIds.add(w),b.completedRunIds.size<=50)return;let p=b.completedRunIds.values().next().value;if(typeof p==="string")b.completedRunIds.delete(p)}function B1(b){return X(b).path}function X(b){let w=b.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),p=w?.activeWorkspaceId||b.app?.dataset.activeWorkspaceId||"",f=w?.workspaces?.find((L)=>L.id===p)?.path||"";return{id:p,path:f}}function F0(b,w){let p=b.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),f=w.workspaceId||p?.activeWorkspaceId||b.app?.dataset.activeWorkspaceId||"",L=p?.workspaces?.find((T)=>T.id===f)?.path||"";if(L||f!==p?.activeWorkspaceId)return{id:f,path:L};return X(b)}function Y0(b,w,p,f,L="",T="",H={}){let $=Array.isArray(p.messages),h=k1(p.messages);if(typeof p.activeSessionId==="string"&&p.activeSessionId){let N=w.activeSessionId;if(m(w,p.activeSessionId),g(b,{sessionId:p.activeSessionId,workspaceId:b.app?.dataset.activeWorkspaceId||$1(b)||void 0}),f!=="chatState"||N!==p.activeSessionId)o(b,"chat-session",{reason:f,sessionId:p.activeSessionId});if(f!=="chatState")l1(b,p.activeSessionId,f)}if(!$)return[];let _=w1(w),i=g0(_.messages,h,L,T,H).slice(-a);if(!X0(_.messages,i))return _.messages;_.messages=i;let R=A1(_);if(_.updatedAt=Date.now(),C(w),R)W1(_.id,R);return _.messages}function X0(b,w){if(b.length!==w.length)return!0;return b.some((p,f)=>Y1(p)!==Y1(w[f]))}function Y1(b){return JSON.stringify({id:b.id,role:b.role,text:b.text,blocks:b.blocks,thinking:b.thinking,streaming:b.streaming,toolCalls:b.toolCalls,attachments:b.attachments,meta:b.meta})}function hw(b,w,p,f,L,T=""){let H=k1(p.messages),$=typeof p.activeSessionId==="string"&&p.activeSessionId?p.activeSessionId:L,h=w.activeSessionId===L;if($!==L)if(h)m(w,$),g(b,{sessionId:$,workspaceId:X(b).id||void 0}),o(b,"chat-session",{reason:f,sessionId:$}),l1(b,$,f);else Q(w,$);let _=Array.isArray(T)?T:[T].filter(Boolean);if($!==L)for(let y of _)u0(w,L,$,y);let i=Q(w,$);if(!H.length)return[];let R=g0(i.messages,H,T).slice(-a);if(!X0(i.messages,R))return[];i.messages=R;let N=A1(i);if(i.updatedAt=Date.now(),C(w),N)W1(i.id,N);return i.messages}function _w(b,w,p,f,L){let T=(_,i)=>{if(!_?.sessionId){if(!i)w0(w,p,f,L,!0);return}if(D0(w,f,_))return;g(w,_),m(f,_.sessionId),Y(p,w1(f).messages,f.activeSessionId);let R=F0(w,_);h1(w,p,f,L,_.sessionId,R.path,R.id)},H=(_)=>{if(iw(w,p,f,L,_))return;let i=zw(w,_);if(i)T(i,!1)},$=w.app?.piWebSidebar?.channels?.selectedSession$||globalThis.piWebSidebar?.channels?.selectedSession$,h=w.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$;if($){let _=!0;b.add($.subscribe((i)=>{T(i,_),_=!1}))}if(h)b.add(h.subscribe(H));if(w.app)b.listen(w.app,"pi-web-sidebar:session-created",(_)=>{let i=_.detail||{},R=typeof i.sessionId==="string"?i.sessionId:"",N=typeof i.workspaceId==="string"?i.workspaceId:"";if(R)T({sessionId:R,workspaceId:N||void 0},!1)});if(globalThis.piWeb){let _=!0;b.add(globalThis.piWeb.behaviorSubject($0,k(w)).subscribe((R)=>{T(R,_),_=!1})),b.add(globalThis.piWeb.subject(h0).subscribe(H));let i=!0;b.add(globalThis.piWeb.behaviorSubject("session.activeId",null).subscribe((R)=>{if(!R){if(!i)w0(w,p,f,L,!1);i=!1;return}i=!1,T({sessionId:R,workspaceId:w.app?.dataset.activeWorkspaceId||c0(U1)||void 0},!1)}))}}function w0(b,w,p,f,L){if(f.backendChatToken+=1,f.runEventsAbort?.abort(),f.sessionEventsAbort?.abort(),p.activeSessionId="",C(p),L)O0(b);else{let T=k(b);if(T?.sessionId&&b.app)b.app.dataset.clearedSessionId=T.sessionId}_1(w)}function Q0(b,w){let p=k(b);if(p?.sessionId&&!D0(b,w,p))g(b,p),m(w,p.sessionId);if(!w.activeSessionId)return Q(w,"",!0).id;return w.activeSessionId}function D0(b,w,p){let f=p.workspaceId||"",L=b.app?.dataset.activeWorkspaceId||c0(U1)||"";return w.activeSessionId===p.sessionId&&(!f||f===L)}function iw(b,w,p,f,L){if(L.type!=="session.deleted")return!1;let T=U0(L);if(!T)return!0;let H=p.activeSessionId===T,$=p.sessions.length;if(p.sessions=p.sessions.filter((h)=>h.id!==T),H){f.runEventsAbort?.abort(),f.sessionEventsAbort?.abort();let h=Rw(b,L,T);if(h?.sessionId){g(b,h),m(p,h.sessionId),Ow(w,w1(p).messages,p.activeSessionId);let _=F0(b,h);return h1(b,w,p,f,h.sessionId,_.path,_.id),!0}return p.activeSessionId="",O0(b),C(p),_1(w),!0}if(p.sessions.length!==$)C(p);return!0}function Rw(b,w,p){let f=w.snapshot?.activeSessionId||"",L=w.snapshot?.activeWorkspaceId||"";if(f&&f!==p)return{sessionId:f,workspaceId:L||void 0};let T=k(b);if(T?.sessionId&&T.sessionId!==p)return T;return null}function zw(b,w){if(!Nw(w.type))return null;let p=w.detail||{},f=U0(w)||w.snapshot?.activeSessionId||"",L=typeof p.workspaceId==="string"?p.workspaceId:w.snapshot?.activeWorkspaceId||b.app?.dataset.activeWorkspaceId||"";if(!f)return null;return{sessionId:f,workspaceId:L||void 0}}function U0(b){let w=b.detail||{};if(typeof w.sessionId==="string")return w.sessionId;if(typeof w.id==="string")return w.id;return""}function Nw(b){return b==="session.selected"||b==="session.created"||b==="new-session"||b==="active.start"}function m(b,w){let p=b.sessions.find((f)=>f.id===w);if(!p)p=i1(w),b.sessions.unshift(p);return b.activeSessionId=p.id,C(b),p}function Y(b,w,p){if(B0(w,p),!w.length){_1(b);return}let f=b.querySelector(".term-inner")||b;K0(f,w,p),E1(b)}function Ow(b,w,p){B0(w,p);let f=b.querySelector(".term-inner")||b;K0(f,w,p),E1(b)}function K0(b,w,p){let f=yw(b),L=w.map(($)=>{let h=`${p}:${Y1($)}`,_=f.get($.id);if(_){if(q1.get(_)!==h)jw(_,$,p,h);return _}let i=W0($,p);return q1.set(i,h),i}),T=new Set(L),H=b.firstChild;for(let $ of L){if(H!==$)b.insertBefore($,H);H=$.nextSibling}for(let $ of Array.from(b.children)){if(X1(b,$)&&!T.has($)){$.remove();continue}if(!X1(b,$))$.remove()}}function jw(b,w,p,f){let L=W0(w,p);if(b.replaceChildren(...Array.from(L.childNodes)),b.className=L.className,b.dataset.messageId=w.id,w.streaming)b.dataset.streaming="true";else delete b.dataset.streaming;q1.set(b,f)}function yw(b){let w=new Map;for(let p of Array.from(b.children)){if(!X1(b,p))continue;let f=p.dataset.messageId||"";if(f)w.set(f,p)}return w}function X1(b,w){let p=b.ownerDocument.defaultView;return Boolean(p&&w instanceof p.HTMLElement&&w.classList.contains("transcript-item"))}function _1(b){let w=b.querySelector(".term-inner")||b,p=document.createElement("article");p.className="pi-web-chat-docs",p.setAttribute("aria-label","pi-web-chat guide");let f=document.createElement("h1");f.textContent="pi-web-chat guide";let L=document.createElement("p");L.textContent=["Select or create a session in the sidebar to load chat history,","or type below to start a new session."].join(" ");let T=document.createElement("ul");for(let H of["Ask pi in the prompt box and press Cmd/Ctrl+Enter to send.","Type ! then Space at the start to turn the prompt yellow and run shell commands in the workspace.","Queued file attachments hide during shell mode and reappear for the next normal prompt.","Type @ to list project files, then pick one to tag it as prompt context.","Type / at the start to open the slash command list.","Chats are cached locally after you start or select a session."]){let $=document.createElement("li");$.textContent=H,T.append($)}p.append(f,L,T),w.replaceChildren(p),E1(b)}function Vw(b,w){let p=w.querySelector(".term"),f=w.querySelector("[data-action='scroll-bottom']");if(!p||!f)return;let L={term:p,button:f,pinned:!0,touchStartY:null};C1.set(w,L),f.hidden=!1,H1(L),b.listen(f,"click",()=>{L.pinned=!0,l0(L),H1(L)}),b.listen(p,"wheel",(T)=>{if(T.deltaY<0)p0(L)}),b.listen(p,"touchstart",(T)=>{let H=T;L.touchStartY=H.touches.item(0)?.clientY??null}),b.listen(p,"touchmove",(T)=>{let $=T.touches.item(0)?.clientY;if(typeof $==="number"&&L.touchStartY!==null&&$-L.touchStartY>8)p0(L)}),b.listen(p,"touchend",()=>{L.touchStartY=null}),b.add({remove:()=>{C1.delete(w)}})}function E1(b){let w=C1.get(b);if(!w)return;if(w.pinned)l0(w);H1(w)}function l0(b){b.term.scrollTop=b.term.scrollHeight}function p0(b){b.pinned=!1,H1(b)}function H1(b){b.button.dataset.pinned=b.pinned?"true":"false",b.button.setAttribute("aria-pressed",b.pinned?"true":"false")}function W0(b,w){let p=document.createElement("article");if(p.className="transcript-item",p.dataset.messageId=b.id,A0(b))Zw(p,b,w);else if(Jw(b)){let f=Gw(b);if(f)P1(p,b.role,b.text);Fw(p,b,w,f)}else Yw(p,b,w);if(b.streaming)p.dataset.streaming="true";return p}function A0(b){return b.role==="user"&&b.meta?.piWebChatSteeringState==="pending"}function Zw(b,w,p){let f=document.createElement("div");f.className="msg pending-steering",f.dataset.kind="user";let L=document.createElement("span");L.className="prefix user",L.textContent=x0("user");let T=document.createElement("small");T.className="body user pending-steering-text",T.textContent=w.text;let H=document.createElement("button");H.type="button",H.className="pending-steering-cancel",H.dataset.action="cancel-steering",H.dataset.sessionId=p,H.dataset.messageId=w.id,H.setAttribute("aria-label","cancel steering"),H.title="cancel steering",H.textContent="×",f.append(L,T,H),b.append(f)}function Jw(b){return Boolean(b.blocks?.some((w)=>{return w.type==="tool"||w.text.trim().length>0}))}function Gw(b){return Boolean(b.text.trim())&&(!qw(b)||Cw(b))}function qw(b){return Boolean(b.blocks?.some((w)=>{return w.type==="text"&&w.text.trim().length>0}))}function Cw(b){return(b.blocks?.length||0)>=K1}function Fw(b,w,p,f=!1){for(let L of w.blocks||[])if(L.type==="text"){if(!f)P1(b,w.role,L.text)}else if(L.type==="thinking")b.append(v0(L.text,Boolean(w.streaming)));else if(L.type==="tool"&&L.toolCall){let T=w.toolCalls?.find((H)=>H.id===L.toolCall?.id)||L.toolCall;b.append(E0(T,M1(p,w,T)))}}function Yw(b,w,p){if(Xw(w))P1(b,w.role,w.text);if(w.thinking)b.append(v0(w.thinking,Boolean(w.streaming)));for(let f of w.toolCalls||[])b.append(E0(f,M1(p,w,f)))}function P1(b,w,p){if(w==="assistant"&&!p.trim())return;let f=document.createElement("div");f.className="msg",f.dataset.kind=J1(w);let L=document.createElement("span");L.className=`prefix ${J1(w)}`,L.textContent=x0(w);let T=document.createElement("pre");T.className=`body ${J1(w)}`,T.textContent=p,f.append(L,T),b.append(f)}function Xw(b){let w=b.text.trim().length>0;return b.role!=="assistant"||w}function v0(b,w){let p=document.createElement("details");p.className="msg-detail think thinking-block",p.open=w;let f=document.createElement("summary");f.className="label",f.textContent="THINKING";let L=document.createElement("pre");return L.className="body",L.textContent=b,p.append(f,L),p}function B0(b,w){let p=new Set;for(let f of b)for(let L of f.toolCalls||[])p.add(M1(w,f,L));for(let f of S)if(!p.has(f))S.delete(f)}function M1(b,w,p){return`${b}:${w.id}:${p.id}`}function E0(b,w){let p=document.createElement("div");p.className="tool-card",p.dataset.tool=b.name||"tool",p.dataset.status=b.status;let f=!S.has(w);p.dataset.collapsed=f?"true":"false";let L=document.createElement("button");if(L.type="button",L.className="tc-head",L.title=f?"Show tool output":"Hide tool output",L.setAttribute("aria-expanded",f?"false":"true"),L.setAttribute("aria-label",P0(b,f)),L.append(Kw(b),lw(b),Ww(b),Aw(b,f)),!f)p.append(M0(b));return L.addEventListener("click",()=>Uw(p,L,b,w)),p.prepend(L),p}function P0(b,w){let p=w?"Show":"Hide",f=b.status==="running"?"running":b.status==="err"?"failed":"done",L=Qw(b),T=L?`, ${L}`:"";return`${p} ${b.name||"tool"} output, ${f}${T}`}function Qw(b){if(b.argsStatus==="present")return"arguments present";if(b.argsStatus)return f1(b);return b.args?"arguments present":""}function M0(b){let w=document.createElement("pre");return w.className="tc-body",w.textContent=b.text||N1(b),w}function Dw(){let b=document.createElement("span");b.className="spinner",b.setAttribute("aria-hidden","true");for(let w=0;w<Ob;w+=1)b.append(document.createElement("span"));return b}function Uw(b,w,p,f){let L=b.querySelector(".tc-body"),T=L!==null;if(L)L.remove(),S.delete(f);else b.append(M0(p)),S.add(f);b.dataset.collapsed=T?"true":"false",w.setAttribute("aria-expanded",T?"false":"true"),w.setAttribute("aria-label",P0(p,T)),w.title=T?"Show tool output":"Hide tool output";let H=w.querySelector(".tc-toggle-label");if(H)H.textContent=T?"show":"hide"}function Kw(b){let w=document.createElement("span");w.className="tc-glyph";let p=vw(b),f=p?yb[p]:"";if(!p||!f)return w.textContent="●",w;return w.innerHTML=`<svg class="tc-icon" data-tool-icon="${p}" aria-hidden="true" viewBox="0 0 24 24">${f}</svg>`,w}function lw(b){let w=document.createElement("span");return w.className="tc-name",w.textContent=b.name||"tool",w}function Ww(b){let w=document.createElement("span");return w.className="tc-args",w.textContent=f1(b),w}function Aw(b,w){let p=document.createElement("span");if(p.className="tc-meta",b.status==="running"){let T=Dw(),H=document.createElement("span");return H.className="running",H.textContent="running",p.append(T,H,f0(w)),p}let f=document.createElement("span");f.className=b.status==="err"?"err":"ok",f.textContent=b.status==="err"?"✗":"✓";let L=document.createElement("span");return L.textContent=b.status==="err"?" · failed":" · done",p.append(f,L,f0(w)),p}function f0(b){let w=document.createElement("span");w.className="tc-toggle";let p=document.createElement("span");p.className="tc-toggle-label",p.textContent=b?"show":"hide";let f=document.createElement("span");return f.className="tc-caret",f.textContent="▸",w.append(p,f),w}function vw(b){let w=Bw(b.name);if(["bash","shell","sh","zsh","terminal"].includes(w))return Ew(f1(b).toLowerCase())||"terminal";return Vb[w]}function Bw(b){return b.trim().replace(/^functions\./,"").replace(/^multi_tool_use\./,"")}function Ew(b){if(/\bgit\b|\bgh\b/.test(b))return"git-branch";if(/\b(go test|bun test|npm test|pnpm test|yarn test|vitest|pytest|cargo test)\b/.test(b))return"circle-check";if(/\b(bun|npm|pnpm|yarn)\s+(run\s+)?build\b|\b(go build|cargo build)\b/.test(b))return"hammer";if(/\b(bun|npm|pnpm|yarn)\s+(add|install|i)\b|\bpip\s+install\b|\bgo\s+get\b/.test(b))return"package";return}function x0(b){if(b==="assistant")return"pi >";if(b==="user")return"you >";if(b==="system")return"sys >";return"tool >"}function J1(b){if(b==="assistant")return"pi";if(b==="system")return"sys";return b}function Pw(b){let w=/^\/([^\s/]*)$/.exec(b);return w?w[1].toLowerCase():null}function Mw(b){let w=/(?:^|\s)@([^\s@`]*)$/.exec(b);return w?w[1]:null}function R2(b){return b.length>0}function z2(b,w){return b.trim().startsWith("!")&&w}function k0(b,w,p){return Boolean(typeof w.runId==="string"&&w.runId&&p)}function g0(b,w,p="",f="",L={}){let T=L0(p),H=b.filter(s).map((z)=>z.id),$=[...T,...H],h=L0(f),_=new Set([...$,...h]),i=new Set(w.map((z)=>z.id)),R=L.preserveOnlyEchoMessages===!0,N=L.allowAssistantOnlyTailEcho===!0,y=R?b.filter((z)=>{return i.has(z.id)||_.has(z.id)||s(z)||A0(z)}):b,V=new Map,j=new Map,O=new Map,F=new Map,K=w.some((z)=>z.role==="user"),G=uw(y,w),u=w.length;for(let z of y)V.set(z.id,z),j.set(z.id,u++);let P=new Set,E=new Set,J=new Set;w.forEach((z,q)=>{let U=kw(y,z,$,P);if(U){P.add(U.id),F.set(z.id,U.id);let W=Q1(y,U.id,h,E);if(W)O.set(z.id,W);G1(V,j,U.id,z,q);return}let d=gw(y,w,z,q,h,E,O);if(d){let W=w[q-1],r=W?F.get(W.id):void 0;if(E.add(d),r)J.add(r);G1(V,j,d,z,q);return}let l=cw(y,z,$);if(l&&N){J.add(l.id);let W=(j.get(l.id)??q)+(q+1)/1000;T0(V,l),j.set(z.id,W),V.set(z.id,{...V.get(z.id),...z});return}let n0=rw(z,q,K,G,P,J,N),a0=!K||P.size===0&&J.size===0,n=Iw(y,z,$,J,n0,a0);if(n){J.add(n.id);let W=(j.get(n.id)??q)+(q+1)/1000;T0(V,n);let r=Q1(y,n.id,h,E);if(r){E.add(r),G1(V,j,r,z,W);return}j.set(z.id,W),V.set(z.id,{...V.get(z.id),...z});return}j.set(z.id,q),V.set(z.id,{...V.get(z.id),...z})});let Z=[...V.values()].sort((z,q)=>{let U=(j.get(z.id)??0)-(j.get(q.id)??0);if(U!==0)return U;return z.createdAt-q.createdAt});return xw(Z)}function xw(b){let w=new Set;return b.filter((p)=>{if(p.role!=="user"||!s(p))return!0;let f=b.find((L)=>{return L.role==="user"&&!s(L)&&!w.has(L.id)&&L.text.trim()===p.text.trim()&&L.createdAt>=p.createdAt});if(!f)return!0;return w.add(f.id),!1})}function L0(b){return Array.isArray(b)?b:[b].filter(Boolean)}function G1(b,w,p,f,L){b.delete(p),b.set(f.id,f),w.delete(p),w.set(f.id,L)}function kw(b,w,p,f){if(!p.length||w.role!=="user"||!w.text.trim())return;if(b.some((L)=>L.id===w.id))return;return b.find((L)=>{return p.includes(L.id)&&!f.has(L.id)&&L.role===w.role&&L.text.trim()===w.text.trim()})}function gw(b,w,p,f,L,T,H){if(p.role!=="assistant"||f<=0)return"";let $=w[f-1];if($?.role!=="user")return"";let h=H.get($.id)||"";if(h&&!T.has(h))return h;return Q1(b,$.id,L,T)}function uw(b,w){let p=new Set(b.map((L)=>L.id)),f=-1;return w.forEach((L,T)=>{if(p.has(L.id))f=T}),f}function rw(b,w,p,f,L,T,H){if(!H||b.role!=="assistant")return!1;if(!p)return!0;return L.size>0||T.size>0||f>=0&&w>f}function cw(b,w,p){if(w.role!=="assistant")return;let f=b.findIndex((T)=>T.id===w.id);if(f<=0)return;let L=b[f-1];if(L?.role==="user"&&p.includes(L.id))return L;return}function Iw(b,w,p,f,L,T){if(!L||w.role!=="assistant")return;let H=b.find((h)=>{return p.includes(h.id)&&h.role==="user"&&!f.has(h.id)&&(!T||w.createdAt>=h.createdAt)});if(H)return H;let $=[...f].at(-1);return b.find((h)=>h.id===$)}function s(b){return b.meta?.[i0]===!0}function T0(b,w){b.set(w.id,{...w,meta:{...w.meta||{},[i0]:!0}})}function Q1(b,w,p,f){let L=b.findIndex((H)=>H.id===w);if(L<0)return"";let T=b[L+1];if(T?.role==="assistant"&&p.includes(T.id)&&!f.has(T.id))return T.id;return""}function D1(b,w,p){b.set(w,[...b.get(w)||[],p])}function e(b,w){return b.get(w)||[]}function Sw(b,w,p){let f=(b.get(w)||[]).filter((L)=>L!==p);if(f.length){b.set(w,f);return}b.delete(w)}function mw(b,w,p){let f=b.get(w)||[];if(!f.length)return;b.delete(w),b.set(p,[...b.get(p)||[],...f])}function b1(b,w,p,f){if(!f.length||!p.length)return;let L=f.filter((T)=>{return p.some((H)=>{return H.id===T&&!s(H)})});if(L.length){b.set(w,L);return}b.delete(w)}function w1(b){return Q(b,b.activeSessionId,!0)}function Q(b,w,p=!1){let f=b.sessions.find((L)=>L.id===w);if(!f)f=i1(w||void 0),b.sessions.unshift(f),C(b);if(p||!b.activeSessionId)b.activeSessionId=f.id,C(b);return f}function u0(b,w,p,f){if(w===p)return;let L=b.sessions.find((h)=>h.id===w),T=L?.messages.findIndex((h)=>h.id===f)??-1;if(!L||T<0)return;let[H]=L.messages.splice(T,1),$=Q(b,p);if(!$.messages.some((h)=>h.id===H.id))$.messages.push(H);L.updatedAt=Date.now(),$.updatedAt=Date.now(),r0(b,L.id),C(b)}function r0(b,w){let p=b.sessions.find((f)=>f.id===w);if(!p||p.id===b.activeSessionId||p.messages.length>0||p.title!=="New chat")return;b.sessions=b.sessions.filter((f)=>f.id!==p.id)}function i1(b=B()){let w=Date.now();return{id:b,title:"New chat",createdAt:w,updatedAt:w,messages:[]}}function c0(b){try{return localStorage.getItem(b)||""}catch{return""}}function dw(b){let w=i1(b);return{activeSessionId:w.id,sessions:[w]}}function nw(){try{let b=JSON.parse(localStorage.getItem(T1)||"null");if(b&&Array.isArray(b.sessions))return{activeSessionId:"",sessions:b.sessions.filter(I0).map(S0)}}catch{}return{activeSessionId:"",sessions:[]}}function aw(b=""){try{let w=JSON.parse(localStorage.getItem(T1)||"null");if(w&&typeof w.activeSessionId==="string"&&Array.isArray(w.sessions)){let p=w.sessions.filter(I0).map(S0);if(b&&!p.some((f)=>f.id===b))p.unshift(i1(b));return{activeSessionId:b||w.activeSessionId,sessions:p}}}catch{}return dw(b||void 0)}function C(b){H0(b);try{localStorage.setItem(T1,JSON.stringify(b))}catch{for(let w of b.sessions)w.messages=w.messages.slice(-Math.floor(a/2));H0(b);try{localStorage.setItem(T1,JSON.stringify(b))}catch{}}}function x1(b){if(!b?.length)return;return b.map(({content:w,...p})=>p)}function H0(b){b.sessions.sort((f,L)=>L.updatedAt-f.updatedAt);let w=b.sessions.find((f)=>f.id===b.activeSessionId),p=b.sessions.filter((f)=>f.id!==b.activeSessionId).slice(0,Math.max(0,a1-1));b.sessions=w?[w,...p]:b.sessions.slice(0,a1);for(let f of b.sessions)if(f.messages.length>a)f.messages.splice(0,f.messages.length-a)}function I0(b){return D(b)&&typeof b.id==="string"&&Array.isArray(b.messages)}function S0(b){return{...b,messages:k1(b.messages)}}function k1(b){return Array.isArray(b)?b.filter(w2).map(ow):[]}function ow(b){let w={...b};if(Array.isArray(b.toolCalls))w.toolCalls=b.toolCalls.filter(m0);else delete w.toolCalls;if(Array.isArray(b.blocks))w.blocks=b.blocks.filter(sw).map(tw);else delete w.blocks;return w}function tw(b){if(b.type!=="tool"){let{toolCall:w,...p}=b;return p}return b}function sw(b){if(!D(b)||typeof b.id!=="string"||typeof b.text!=="string")return!1;if(b.type==="text"||b.type==="thinking")return!0;return b.type==="tool"&&m0(b.toolCall)}function m0(b){if(!D(b)||typeof b.id!=="string"||typeof b.name!=="string")return!1;return typeof b.text==="string"&&b2(b.status)&&ew(b.argsStatus)}function ew(b){return b===void 0||b==="present"||b==="empty"||b==="unavailable"||b==="truncated"||b==="omitted"}function b2(b){return b==="running"||b==="ok"||b==="err"}function w2(b){if(!D(b)||typeof b.id!=="string"||typeof b.text!=="string")return!1;return typeof b.createdAt==="number"&&p2(b.role)}function p2(b){return b==="user"||b==="assistant"||b==="tool"||b==="system"}function D(b){return typeof b==="object"&&b!==null}function B(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`}function d0(b){return b instanceof Error&&(b.name==="AbortError"||/aborted|abort/i.test(b.message))}function R1(b){return b instanceof Error?b.message:String(b)}export{f1 as toolArgsInlineText,N1 as toolArgsBodyText,i2 as submittedAttachmentsForText,z2 as shellAttachmentNoteVisible,fb as setComposerMode,p1 as renderPromptMeta,wb as renderMessages,Tb as promptFromAgUiLikeRunInput,m1 as pluginStyleText,z1 as pluginClass,_2 as mergeCommands,R2 as hasQueuedAttachmentNames,$1 as getActiveWorkspaceId,Bb as formatShellOutput,N0 as extractRefs,Zb as default,c1 as createComposerSurface,r1 as createChatSurface,bb as createChatDom,h2 as createChannels,Lb as createAgUiLikeRunInput,L1 as commandName,Hb as chatEventsToAgUiLikeEvents,v as backendCall};
