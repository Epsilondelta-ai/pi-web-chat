var K={attachFile:["M16.5 6v11.5a4 4 0 0 1-8 0V5a2.5 2.5 0 0 1 5 0v10.5a1 1 0 0 1-2 0V6H10v9.5","a2.5 2.5 0 0 0 5 0V5a4 4 0 0 0-8 0v12.5a5.5 5.5 0 0 0 11 0V6h-1.5Z"].join(""),stop:"M6 6h12v12H6V6Z",send:"M2 21 23 12 2 3v7l15 2-15 2v7Z",terminal:"M3 4h18v16H3V4Zm2 2v12h14V6H5Zm2 3 1.1-1.1L12.2 12l-4.1 4.1L7 15l3-3-3-3Zm6 6h5v1.5h-5V15Z",file:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 2.5L17.5 8H14V4.5ZM8 13h8v1.5H8V13Zm0 3h8v1.5H8V16Z"},E={attachFile:W("attach_file",K.attachFile),stop:W("stop",K.stop),send:W("send",K.send),terminal:W("terminal",K.terminal)};function Mb(b){return`<span class="composer-spinner" aria-hidden="true"></span><span class="sr-only">${v(b)}</span>`}function W(b,p){return`<svg class="material-icon" data-material-icon="${b}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="${p}"></path></svg>`}function v(b){return b.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function hb(){return"pi-web-chat-mounted"}function Eb(){let b=document.createElement("main");return b.className="main pi-web-chat-surface",b.dataset.main="session",b.dataset.pluginChatRoot="",b.innerHTML='<div class="term"><div class="term-inner" role="log" aria-live="polite" aria-relevant="additions text"></div></div><button type="button" class="scroll-bottom-btn" data-action="scroll-bottom" aria-label="stick to bottom" title="stick to bottom" aria-pressed="true" hidden>↓</button>',b}function vb(){let b=document.createElement("section");return b.className="prompt-region pi-web-chat-composer",b.innerHTML=`
    <div class="slash-pop" hidden><div class="slash-head">slash commands · type to filter</div><div class="slash-list"></div></div>
    <div class="prompt-file-ref-pop" hidden><div class="slash-head">project files · type to filter</div><div class="prompt-file-ref-list"></div></div>
    <div class="prompt-bar">
      <button class="attach-btn" type="button" aria-label="attach files" title="attach files">${E.attachFile}</button>
      <input type="file" multiple hidden data-file-input />
      <div class="prompt-input-col"><div class="attach-chips" hidden></div><div class="shell-attachment-note" aria-live="polite" hidden>queued attachments are hidden during shell mode and will reappear for the next normal prompt</div><textarea class="prompt-textarea" aria-label="Prompt" placeholder="ask pi to do something…" rows="1"></textarea></div>
      <div class="prompt-actions">
        <button class="stop-btn" type="button" aria-label="stop" title="stop" hidden>${E.stop}</button>
        <button class="mic-btn" type="button" data-action="toggle-speech-input" aria-label="start voice input" title="voice input" hidden>\uD83C\uDF99</button>
        <button class="send-btn" type="button" aria-label="send" title="send" aria-disabled="true">${E.send}</button>
      </div>
      <div class="drop-overlay" hidden><span>drop to attach</span></div>
    </div>
    <div class="prompt-meta" data-prompt-meta></div>`,d(b,{}),b}function d(b,p={},w=!1){let f=b.querySelector("[data-prompt-meta]");if(!f)return;let h=[u1(p.model||"—",p.thinkingLevel)],i=Bb("5h",p.fiveHourQuota),L=Bb("Week",p.weeklyQuota),T=p.currentBranch||p.branch||"—";if(p.warning)h.push(c1(p.warning));if(i)h.push(i);if(L)h.push(L);if(h.push(r1(T)),f.innerHTML=h.join(" | "),w)f.append(document.createTextNode(" | "),g1())}function g1(){let b=document.createElement("span");return b.className="prompt-meta-item pi-web-chat-badge",b.textContent="chat plugin",b}function r1(b){return`<span class="prompt-meta-item prompt-meta-branch">${Pb("git-branch")}<span>${v(b)}</span></span>`}function c1(b){return`<span class="prompt-meta-item prompt-meta-warning" title="${v(b)}">runtime warning</span>`}function u1(b,p){let w=v(b);return p?`${w} (${v(p)})`:w}function Bb(b,p){if(typeof p!=="number"||!Number.isFinite(p))return;let w=Math.max(0,Math.min(100,Math.round(p))),f=w>=70?"full":w>=30?"medium":"low";return`<span class="prompt-meta-item prompt-meta-battery prompt-meta-battery-${f}">${v(b)} ${Pb(`battery-${f}`)}(${w}%)</span>`}function Pb(b){return{"battery-full":'<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 10v4"></path><path d="M14 10v4"></path><path d="M22 14v-4"></path><path d="M6 10v4"></path><rect x="2" y="6" width="16" height="12" rx="2"></rect></svg>',"battery-medium":'<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 14v-4"></path><path d="M22 14v-4"></path><path d="M6 14v-4"></path><rect x="2" y="6" width="16" height="12" rx="2"></rect></svg>',"battery-low":'<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 14v-4"></path><path d="M6 14v-4"></path><rect x="2" y="6" width="16" height="12" rx="2"></rect></svg>',"git-branch":'<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6a9 9 0 0 0-9 9V3"></path><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle></svg>'}[b]||""}function I1(){let b=document.createElement("section");return b.className="pi-web-chat-root",b.dataset.plugin="pi-web-chat",b.innerHTML=`
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
    </section>`,{root:b,transcript:Y(b.querySelector("[data-chat-transcript]")),textarea:Y(b.querySelector("[data-chat-input]")),sendButton:Y(b.querySelector("[data-send]")),attachButton:Y(b.querySelector("[data-attach]")),fileInput:Y(b.querySelector("[data-file-input]")),slashPopover:Y(b.querySelector("[data-slash-popover]")),slashList:Y(b.querySelector("[data-slash-list]")),refsPopover:Y(b.querySelector("[data-refs-popover]")),refsList:Y(b.querySelector("[data-refs-list]")),attachments:Y(b.querySelector("[data-attachments]"))}}function S1(b,p){b.replaceChildren(...p.map(m1)),b.scrollTop=b.scrollHeight}function m1(b){let p=document.createElement("article");p.className=`pi-web-chat-message pi-web-chat-message-${b.role}`,p.dataset.messageId=b.id;let w=document.createElement("div");w.className="pi-web-chat-message-role",w.textContent=b.role;let f=document.createElement("pre");if(f.className="pi-web-chat-message-body",f.textContent=b.text,p.append(w,f),b.thinking){let h=document.createElement("details");h.className="pi-web-chat-thinking",h.open=Boolean(b.streaming);let i=document.createElement("summary");i.textContent="thinking";let L=document.createElement("pre");L.textContent=b.thinking,h.append(i,L),p.append(h)}if(b.toolCalls?.length){let h=document.createElement("div");h.className="pi-web-chat-tools";for(let i of b.toolCalls){let L=document.createElement("details");L.className=`pi-web-chat-tool pi-web-chat-tool-${i.status}`,L.open=i.status==="running";let T=document.createElement("summary");T.textContent=`${i.name} · ${i.status}`;let H=document.createElement("pre");H.textContent=i.text||ib(i),L.append(T,H),h.append(L)}p.append(h)}if(b.streaming){let h=document.createElement("div");h.className="pi-web-chat-message-meta",h.textContent="streaming...",p.append(h)}if(b.attachments?.length){let h=document.createElement("div");h.className="pi-web-chat-message-meta",h.textContent=`${b.attachments.length} attachment(s)`,p.append(h)}return p}function n(b){if(b.argsStatus==="truncated")return"arguments truncated";if(b.argsStatus==="omitted")return"arguments omitted";if(b.argsStatus==="unavailable")return"arguments unavailable";if(b.argsStatus==="empty")return"no arguments";if(!b.args)return"";return JSON.stringify(b.args)}function ib(b){if(b.argsStatus==="truncated")return"arguments truncated: too large to display";if(b.argsStatus==="omitted")return"arguments omitted: response too large";if(b.argsStatus==="unavailable")return"arguments unavailable";if(b.argsStatus==="empty")return"no arguments";if(!b.args)return"arguments unavailable";return JSON.stringify(b.args,null,2)}function d1(b,p){b.root.dataset.composerMode=p,Lb(b.attachButton,p)}function kb(b,p,w){if(b.disabled=p==="steering"||p==="loading"&&!w,b.dataset.mode=p,b.setAttribute("aria-disabled",w?"false":"true"),p==="loading"){let f=w?"send steering message":"loading";b.innerHTML=Mb(f),b.title=f,b.setAttribute("aria-label",f);return}if(p==="steering"){b.innerHTML=Mb("steering"),b.title="steering message pending",b.setAttribute("aria-label","steering message pending");return}b.innerHTML=E.send,b.title="send",b.setAttribute("aria-label","send")}function Lb(b,p){if(b.disabled=p==="shell",b.setAttribute("aria-disabled",p==="shell"?"true":"false"),p==="shell"){b.innerHTML=E.terminal,b.title="shell command mode",b.setAttribute("aria-label","shell command mode");return}if(p==="file-ref"){b.innerHTML=W("file",K.file),b.title="file reference mode",b.setAttribute("aria-label","file reference mode");return}b.innerHTML=E.attachFile,b.title="attach files",b.setAttribute("aria-label","attach files")}function Tb(b,p){b.hidden=p.length===0,b.replaceChildren(...p.map((w)=>{let f=document.createElement("span");return f.className="pi-web-chat-attachment-chip",f.textContent=w,f}))}function xb(){return`
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
  `}function gb(){document.getElementById("pi-web-chat-style")?.remove();let b=document.createElement("style");return b.id="pi-web-chat-style",b.textContent=xb(),document.head.append(b),b}function a(b){return b.command||b.cmd||(b.name?`/${b.name}`:"")}function Y(b){if(!b)throw Error("pi-web-chat DOM template is invalid");return b}function n1(b,p,w){return{threadId:b,runId:p,state:{},messages:w,tools:[],context:[]}}function a1(b){let p=[...b.messages].reverse().find((w)=>w.role==="user");return{text:p?.text||"",attachments:p?.attachments||[],sessionId:b.threadId}}function o1(b,p,w){return b.map((f)=>t1(f,p,w))}function t1(b,p,w){if(b.type==="text.delta")return{type:"TEXT_MESSAGE_CONTENT",threadId:p,runId:w,delta:b.delta||""};if(b.type==="thinking.delta")return{type:"THINKING_MESSAGE_CONTENT",threadId:p,runId:w,delta:b.delta||""};if(b.type==="tool.start")return{type:"TOOL_CALL_START",threadId:p,runId:w,toolCallId:b.toolCallId,payload:rb(b)};if(b.type==="tool.delta")return{type:"TOOL_CALL_ARGS",threadId:p,runId:w,toolCallId:b.toolCallId,delta:b.delta||""};if(b.type==="tool.end")return{type:"TOOL_CALL_END",threadId:p,runId:w,toolCallId:b.toolCallId,payload:rb(b)};return{type:b.type.toUpperCase().replaceAll(".","_"),threadId:p,runId:w,payload:b}}function rb(b){return{name:b.toolName||"tool",args:b.args||{},result:b.result||"",isError:b.isError===!0}}var o="pi-web-chat.sessions.v1";var b1="plugin.pi-web-sidebar.selectedSession",p1="plugin.pi-web-sidebar.event",w1="plugin.pi-web-sidebar.activeSessionId",Vb="plugin.pi-web-sidebar.activeWorkspaceId",s1=12,cb=20,g=200,Zb=200,e1=8,bp=1e6,pp=64000;var wp=250,fp=100,hp=6,ip=100,P=new Set,Rb=new WeakMap,Lp={"book-open":'<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',"file-plus":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="M9 15h6"/>',pencil:'<path d="M21.2 6.8 17.2 2.8a2 2 0 0 0-2.8 0L3 14.2V21h6.8L21.2 9.6a2 2 0 0 0 0-2.8z"/><path d="m14 5 5 5"/>',terminal:'<path d="m4 17 6-6-6-6"/><path d="M12 19h8"/>',cpu:'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 15h3"/><path d="M1 9h3"/><path d="M1 15h3"/>',globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 0 20"/><path d="M12 2a15.3 15.3 0 0 0 0 20"/>',search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',braces:'<path d="M8 3H7a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-4a2 2 0 0 1 2-2 2 2 0 0 1-2-2V7a2 2 0 0 0-2-2h-1"/>',"file-text":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',"circle-question-mark":'<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 1 1 5.8 1c-.5 1-1.4 1.5-2.1 2-.6.4-.8.8-.8 2"/><path d="M12 17h.01"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',plug:'<path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a6 6 0 0 1-12 0V8Z"/>',"git-branch":'<line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',"circle-check":'<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',hammer:'<path d="m15 12-8.5 8.5a2.1 2.1 0 0 1-3-3L12 9"/><path d="m17.6 5.4 1.8-1.8"/><path d="m14 7 3 3"/><path d="M5 11 2 8l6-6 3 3"/>',package:'<path d="m7.5 4.3 9 5.2"/><path d="M21 8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>'},zb=new WeakMap,Tp={read:"book-open",write:"file-plus",edit:"pencil",ctx_execute:"cpu",ctx_batch_execute:"cpu",ctx_execute_file:"cpu",ctx_search:"cpu",ctx_index:"cpu",ctx_fetch_and_index:"cpu",web_search:"globe",fetch_content:"search",get_search_content:"search",code_search:"braces",document_parse:"file-text",ask_user_question:"circle-question-mark",teams:"users",subagent:"users",mcp:"plug",git:"git-branch"};class f1{#b=[];add(b){if(b)this.#b.push(b);return b}listen(b,p,w){b.addEventListener(p,w),this.add({remove:()=>b.removeEventListener(p,w)})}dispose(){for(let b of this.#b.splice(0).reverse())if(typeof b==="function")b();else if("unsubscribe"in b)b.unsubscribe();else b.remove()}}function Hp(b={}){let p=b.app;if(p?.piWebChat?.dispose(),typeof b.mount?.chat!=="function"||typeof b.mount?.composer!=="function")throw Error("pi-web-chat requires modern pi-web mount.chat and mount.composer APIs");return $p(b,p)}function $p(b,p){let w=new f1,f=w.add(gb()),h=Eb(),i=vb(),L=b.mount?.chat(h,{replace:!0}),T=b.mount?.composer(i,{replace:!0});if(i0(w,h),L)w.add(L);if(T)w.add(T);let H=M(b);B(b,H||void 0);let O=H?.sessionId?M0(H.sessionId):W0(),$={backendChatToken:0,pendingPromptEchoIds:new Map,pendingAssistantEchoIds:new Map};if(!H?.sessionId)bb(h);else J(h,S(O).messages,O.activeSessionId),e(b,h,O,$,H.sessionId);tp(w,b,h,O,$),yp(w,h,O,$),zp(w,b,i,h,O,$),Op(b,i),p?.classList.add(hb());let R=()=>{if($.runEventsAbort?.abort(),$.sessionEventsAbort?.abort(),w.dispose(),P.clear(),f.remove(),p?.classList.remove(hb()),p?.piWebChat===_)delete p.piWebChat},_={dispose:R};if(p)p.piWebChat=_;return R}function Op(b,p){d(p,{}),_p(b,p)}async function _p(b,p){try{let w=A(b),f=w.path?{workspacePath:w.path}:{},h=await X(b,"runtimeStatus",f,w.id),i=F(h)?h:{},L=F(i.status)?Rp(i.status):void 0;if(!L)return;d(p,L)}catch{}}function Rp(b){let p={};if(typeof b.model==="string")p.model=b.model;if(typeof b.modelProvider==="string")p.modelProvider=b.modelProvider;if(typeof b.thinkingLevel==="string")p.thinkingLevel=b.thinkingLevel;if(typeof b.fiveHourQuota==="number")p.fiveHourQuota=b.fiveHourQuota;if(typeof b.weeklyQuota==="number")p.weeklyQuota=b.weeklyQuota;if(typeof b.currentBranch==="string")p.currentBranch=b.currentBranch;if(typeof b.branch==="string")p.branch=b.branch;if(typeof b.warning==="string")p.warning=b.warning;return p}function zp(b,p,w,f,h,i){let L=w.querySelector(".prompt-textarea"),T=w.querySelector(".send-btn"),H=w.querySelector(".attach-btn"),O=w.querySelector(".stop-btn"),$=w.querySelector("[data-file-input]"),R=w.querySelector(".attach-chips"),_=w.querySelector(".shell-attachment-note");if(!L||!T)return;let l=w.querySelector(".prompt-bar"),N=w.querySelector(".slash-pop"),y=w.querySelector(".prompt-file-ref-pop"),z={selectedAttachments:[],shellMode:!1,commands:[]},C=()=>{jp(R,L.value,z)},D=()=>{Vp(l,L,H,_,z)},V=()=>{let G=L.value,j=lp(i),Q=Boolean(i.pendingSteering),fb=Boolean(i.activeRunId&&i.activeRunSessionId===h.activeSessionId),Wb=Q?"steering":j?"loading":"idle",x1=Boolean(G.trim())&&!Q&&!i.resolvingSubmit&&(!j||fb);if(kb(T,Wb,x1),l)l.dataset.runState=Wb;if(O){let x=Boolean(i.pendingSteering&&!i.pendingSteering.sent);O.hidden=!j&&!x,O.disabled=!1,O.title=x?"cancel steering":"stop response",O.setAttribute("aria-label",x?"cancel steering":"stop response")}if(C(),ub(z),z.shellMode){Hb(N,y);return}Fp(p,w,L,G,z.commands,(x)=>{z.commands=x}),z.fileSearchTimer=setTimeout(()=>{Yp(p,w,L,L.value)},120)},m=()=>{z.shellMode=!0,Hb(N,y),D(),C()},Db=()=>{z.shellMode=!1,D(),C()},Kb=async(G)=>{G?.preventDefault(),G?.stopImmediatePropagation();let j=L.value.trim();if(V(),i.resolvingSubmit||i.pendingSteering)return;if(i.startingRunSessionId||i.fallbackSubmittingSessionId)return;if(!j){L.value="",V();return}if(i.resolvingSubmit=!0,L.value="",$)$.value="";V();try{if(z.shellMode)mb(j,[]),await Ap(p,f,h,j),Db();else{let Q=[...z.selectedAttachments,...await Gp(p,j)];z.selectedAttachments=[],C(),mb(j,Q);let fb=Wp(p,f,h,i,j,Q,V);i.resolvingSubmit=!1,V(),await fb}}catch(Q){if(!k1(Q))J(f,[Zp(Q)],h.activeSessionId)}finally{i.resolvingSubmit=!1,D(),V()}};if(b.listen(L,"input",()=>{if(!z.shellMode&&L.value.startsWith("! "))L.value=L.value.slice(2),m();V()}),b.listen(L,"keydown",(G)=>{let j=G;if(j.key===" "&&!z.shellMode&&L.value==="!"&&L.selectionStart===1&&L.selectionEnd===1){j.preventDefault(),L.value="",m(),V();return}if(j.key==="Backspace"&&z.shellMode&&L.value===""){j.preventDefault(),Db(),V();return}if(j.key==="Escape"){Hb(N,y);return}if(j.key==="Enter"&&(j.metaKey||j.ctrlKey))Kb(j)}),b.listen(T,"click",(G)=>{Kb(G)}),O)b.listen(O,"click",(G)=>{G.preventDefault(),G.stopImmediatePropagation(),Np(p,f,h,i).finally(V),V()});if(H&&$)b.listen(H,"click",()=>{if(!z.shellMode)$.click()}),b.listen($,"change",()=>{Jp($,(G)=>{z.selectedAttachments=G,C()})});i.onRunStateChange=V,b.add({remove:()=>{if(ub(z),i.onRunStateChange===V)i.onRunStateChange=void 0}}),D(),V()}function lp(b){return Boolean(b.activeRunId||b.startingRunSessionId||b.fallbackSubmittingSessionId||b.pendingSteering)}function yp(b,p,w,f){b.listen(p,"click",(h)=>{let L=h.target?.closest?.("[data-action='cancel-steering']");if(!L)return;h.preventDefault(),h.stopPropagation();let T=L.dataset.sessionId||"",H=L.dataset.messageId||"";if(!h1(w,f)&&T&&H)c(w,T,H);if(T&&w.activeSessionId===T)J(p,q(w,T).messages,T)})}async function Np(b,p,w,f){if(f.pendingSteering&&!f.pendingSteering.sent){let T=f.pendingSteering.sessionId;if(h1(w,f),w.activeSessionId===T)J(p,q(w,T).messages,T);return}let h=f.activeRunId,i=f.activeRunSessionId||f.startingRunSessionId||f.fallbackSubmittingSessionId||w.activeSessionId,L=f.activeRunWorkspaceId||A(b).id;if(!h){f.runEventsAbort?.abort(),f.startingRunSessionId=void 0,f.fallbackSubmittingSessionId=void 0;return}f.runEventsAbort?.abort();try{await R1(b,h,i,L)}catch(T){globalThis.piWeb?.subject("toast.requested").next({level:"error",message:`stop failed: ${wb(T)}`})}finally{if(f.activeRunId===h)f.activeRunId=void 0,f.activeRunSessionId=void 0,f.activeRunWorkspacePath=void 0,f.activeRunWorkspaceId=void 0}}function h1(b,p){let w=p.pendingSteering;if(!w||w.sent)return!1;return clearTimeout(w.timeout),w.controller.abort(),p.pendingSteering=void 0,c(b,w.sessionId,w.messageId),!0}function jp(b,p,w){if(!b)return;if(w.shellMode){Tb(b,[]);return}Tb(b,[...w.selectedAttachments.map((f)=>f.name||"attachment"),...i1(p)])}function Vp(b,p,w,f,h){if(b?.classList.toggle("shell-mode",h.shellMode),p.setAttribute("placeholder",h.shellMode?"run shell command in workspace…":"ask pi to do something…"),f)f.hidden=!(h.shellMode&&h.selectedAttachments.length>0);if(w)Lb(w,h.shellMode?"shell":"normal")}function ub(b){if(b.fileSearchTimer)clearTimeout(b.fileSearchTimer),b.fileSearchTimer=void 0}function Hb(b,p){b?.setAttribute("hidden",""),p?.setAttribute("hidden","")}function Zp(b){return{id:U(),role:"system",text:`prompt failed: ${wb(b)}`,createdAt:Date.now()}}async function Jp(b,p){let w=Array.from(b.files||[]).slice(0,e1),f=[];for(let h of w){if(h.size>bp)continue;f.push({name:h.name,size:h.size,content:await h.text(),mimeType:h.type||void 0})}p(f)}async function Ap(b,p,w,f){let h=V1(b,w),i=q(w,h),L={id:U(),role:"user",text:`! ${f}`,createdAt:Date.now()},T={id:U(),role:"tool",text:`$ ${f}
(running...)`,createdAt:Date.now()};i.messages.push(L,T),i.updatedAt=Date.now(),Z(w),J(p,i.messages,h);try{let H=await X(b,"runShell",{command:f}),O=typeof H.exitCode==="number"?H.exitCode:1,$=typeof H.durationMs==="number"?H.durationMs:0,R=typeof H.output==="string"?H.output:"";T.text=qp(f,R,O,$,Boolean(H.truncated))}catch(H){T.text=`$ ${f}
${wb(H)}`}i.updatedAt=Date.now(),Z(w),J(p,i.messages,h)}async function Gp(b,p){let w=i1(p);if(!w.length)return[];let f=await X(b,"resolveContext",{text:p,refs:w});return Array.isArray(f.attachments)?f.attachments.filter(F):[]}function qp(b,p,w,f,h){let i=Cp(p,pp),L=h||i.truncated,T=i.text.endsWith(`
`)||!i.text?"":`
`;return`$ ${b}
${i.text}${T}[exit ${w} · ${f}ms${L?" · truncated":""}]`}function Cp(b,p){let w=new TextEncoder,f=w.encode(b);if(f.byteLength<=p)return{text:b,truncated:!1};let h=new TextDecoder().decode(f.slice(0,p));while(h&&w.encode(h).byteLength>p)h=h.slice(0,-1);return{text:h,truncated:!0}}async function Fp(b,p,w,f,h,i){let L=p.querySelector(".slash-pop"),T=p.querySelector(".slash-list"),H=F0(f);if(H===null||!T){L?.setAttribute("hidden","");return}let O=h;if(!O.length){let R=await X(b,"commands",{});O=Array.isArray(R.commands)?R.commands.filter(F):[],i(O)}if(w.value!==f)return;let $=O.filter((R)=>{return a(R).slice(1).toLowerCase().includes(H)});Xp(T,$,w,L),L?.toggleAttribute("hidden",$.length===0)}async function Yp(b,p,w,f){let h=p.querySelector(".prompt-file-ref-pop"),i=p.querySelector(".prompt-file-ref-list"),L=Y0(f);if(L===null||!i){h?.setAttribute("hidden","");return}try{let T=await X(b,"searchFiles",{query:L,limit:s1}),H=Array.isArray(T.files)?T.files.filter(F):[];if(w.value!==f)return;Up(i,w,H,h),h?.toggleAttribute("hidden",H.length===0)}catch{h?.setAttribute("hidden","")}}function Xp(b,p,w,f){b.replaceChildren(...p.map((h)=>{let i=document.createElement("button"),L=a(h);return i.type="button",i.className="slash-item",i.dataset.slash=L,i.innerHTML='<span class="sl-name"></span><span class="sl-desc"></span>',i.querySelector(".sl-name").textContent=L,i.querySelector(".sl-desc").textContent=h.description||"",i.addEventListener("click",()=>{w.value=h.template||`${L} `,f?.setAttribute("hidden",""),w.dispatchEvent(new(w.ownerDocument.defaultView?.Event||Event)("input",{bubbles:!0})),w.focus()}),i}))}function Up(b,p,w,f){b.replaceChildren(...w.map((h)=>{let i=h.path||h.name||"",L=document.createElement("button");return L.type="button",L.className="prompt-file-ref-item",L.dataset.path=i,L.disabled=!i,L.innerHTML='<span class="pfr-path"></span><span class="pfr-kind"></span>',L.querySelector(".pfr-path").textContent=i,L.querySelector(".pfr-kind").textContent=typeof h.size==="number"?`${h.size} bytes`:"file",L.addEventListener("click",()=>{Qp(p,i),f?.setAttribute("hidden","")}),L}))}function Qp(b,p){if(!p)return;let{value:w,selectionStart:f}=b,h=w.slice(0,f),i=/(?:^|\s)@([^\s@`]*)$/.exec(h),L=i?f-(i[1]||"").length-1:f,T=`@${p} `;b.value=`${w.slice(0,L)}${T}${w.slice(f)}`;let H=L+T.length;b.setSelectionRange(H,H),b.dispatchEvent(new(b.ownerDocument.defaultView?.Event||Event)("input",{bubbles:!0})),b.focus()}function m0(b){return{input$:b.behaviorSubject("chat.input",""),submitted$:b.subject("chat.input.submitted"),activeSessionId$:b.behaviorSubject("session.activeId",null),sidebarSelectedSession$:b.behaviorSubject(b1,Dp()),toastRequested$:b.subject("toast.requested")}}function i1(b){let p=[],w=new Set,f=/(^|[\s`])@([^\s@`]+)/g,h=f.exec(String(b||""));while(h!==null){let i=h[2]||"";if((h[1]||"")!=="`"&&i&&!w.has(i))w.add(i),p.push(i);h=f.exec(String(b||""))}return p}function d0(b=[],p=[]){let w=[],f=new Set;for(let h of[...b,...p]){let i=a(h);if(!i||f.has(i))continue;f.add(i),w.push(h)}return w}function s(b){return b.app?.piWebSidebar?.getSnapshot?.().activeWorkspaceId||b.app?.dataset.activeWorkspaceId||""}function Dp(){return M({})}function M(b){let p=b.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),w=p?.activeSessionId||"",f=p?.activeWorkspaceId||"";if(w&&b.app?.dataset.clearedSessionId!==w)return{sessionId:w,workspaceId:f||void 0};return null}function B(b,p){if(p?.workspaceId&&b.app)b.app.dataset.activeWorkspaceId=p.workspaceId,Ib(Vb,p.workspaceId);if(p?.sessionId)delete b.app?.dataset.clearedSessionId,b.app?.setAttribute("data-active-session-id",p.sessionId),Ib(w1,p.sessionId)}function L1(b){let p=M(b);if(p?.sessionId&&b.app)b.app.dataset.clearedSessionId=p.sessionId;b.app?.removeAttribute("data-active-session-id"),Kp(w1),globalThis.piWeb?.behaviorSubject("session.activeId",null).next(null)}function r(b,p,w={}){let f=b.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),h={type:p,detail:w,snapshot:f};(b.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$)?.next(h),globalThis.piWeb?.subject(p1).next(h)}function Jb(b,p,w){let f=b.app?.dataset.activeWorkspaceId||s(b),h={reason:w,sessionId:p,workspaceId:f};globalThis.piWeb?.behaviorSubject("session.activeId",p).next(p),r(b,"active.start",h),r(b,"session.created",h)}function Ab(b,p){globalThis.piWeb?.subject("session.changed").next({sessionId:b,name:p,title:p})}function Gb(b){if(b.title!=="New chat")return"";let w=b.messages.find((f)=>f.role==="user")?.text.slice(0,48)||"";if(!w)return"";return b.title=w,w}function Ib(b,p){try{localStorage.setItem(b,p)}catch{}}function Kp(b){try{localStorage.removeItem(b)}catch{}}async function X(b,p,w={},f=s(b)){if(!b.backend)return{};let h=await b.backend(p,{workspaceId:f,data:w});return F(h)?h:{}}function lb(b){let p=Array.isArray(b.warnings)?b.warnings.filter((w)=>typeof w==="string"&&w.trim().length>0):[];for(let w of p)globalThis.piWeb?.subject("toast.requested").next({level:"warning",message:w})}function n0(b,p){return b.trim().startsWith("!")?[]:[...p]}async function Wp(b,p,w,f,h,i,L=()=>{}){let T=V1(b,w),H=A(b);if(f.activeRunId&&f.activeRunSessionId===T){let z=f.activeRunWorkspacePath||H.path,C=f.activeRunWorkspaceId||H.id;await Mp(b,p,w,f,h,i,z,C,L);return}if(f.startingRunSessionId===T||f.fallbackSubmittingSessionId===T)return;f.backendChatToken+=1,f.startingRunSessionId=T,L(),f.runEventsAbort?.abort();let O=new AbortController;f.runEventsAbort=O,f.sessionEventsAbort?.abort();let $={id:U(),role:"user",text:h,attachments:Ub(i),createdAt:Date.now()},R=q(w,T);jb(f.pendingPromptEchoIds,T,$.id),R.messages.push($),R.updatedAt=Date.now(),Z(w),J(p,R.messages,T);let _;try{_=await rp(b,h,i,T,H.path,H.id)}catch(z){throw f.startingRunSessionId=void 0,L(),z}if(O.signal.aborted){if(f.startingRunSessionId=void 0,typeof _.runId==="string"&&_.runId)await R1(b,_.runId,T,H.id);c(w,T,$.id),L();return}if(lb(_),typeof _.activeSessionId==="string"&&_.activeSessionId){let z=T,C=w.activeSessionId===z;if(T=_.activeSessionId,C)k(w,T),B(b,{sessionId:_.activeSessionId,workspaceId:H.id||void 0}),r(b,"chat-session",{reason:"startPrompt",sessionId:_.activeSessionId}),Jb(b,_.activeSessionId,"startPrompt");else q(w,T);W1(w,z,T,$.id),D0(f.pendingPromptEchoIds,z,T)}if(typeof _.runId!=="string"||!_.runId){f.startingRunSessionId=void 0,f.fallbackSubmittingSessionId=T,L();let z;try{z=await cp(b,h,i,T,H.path,H.id)}catch(m){throw f.fallbackSubmittingSessionId=void 0,L(),m}if(O.signal.aborted){f.fallbackSubmittingSessionId=void 0,c(w,T,$.id),L();return}lb(z);let C=typeof z.activeSessionId==="string"&&z.activeSessionId?z.activeSessionId:T,D=u(f.pendingPromptEchoIds,T),V=op(b,w,z,"submitPrompt",T,D);if(I(f.pendingPromptEchoIds,C,V,D),w.activeSessionId===T||w.activeSessionId===C)J(p,V,w.activeSessionId);if(f.runEventsAbort===O)f.runEventsAbort=void 0;f.startingRunSessionId=void 0,f.fallbackSubmittingSessionId=void 0,L();return}let l=q(w,T);f.activeRunId=_.runId,f.activeRunSessionId=T,f.activeRunWorkspacePath=H.path,f.activeRunWorkspaceId=H.id,f.startingRunSessionId=void 0,L();let N=Gb(l);if(N)Z(w),Ab(T,N);let y=Ip(l);jb(f.pendingAssistantEchoIds,T,y.id);try{await vp(b,w,l,_.runId,H.path,H.id,y,()=>{if(!O.signal.aborted&&w.activeSessionId===T)J(p,l.messages,T)},O.signal)}finally{if(f.activeRunId===_.runId)f.activeRunId=void 0,f.activeRunSessionId=void 0,f.activeRunWorkspacePath=void 0,f.activeRunWorkspaceId=void 0,f.startingRunSessionId=void 0,f.fallbackSubmittingSessionId=void 0,L();if(f.runEventsAbort===O)f.runEventsAbort=void 0}if(!O.signal.aborted&&w.activeSessionId===T)e(b,p,w,f,T,H.path,H.id)}async function Mp(b,p,w,f,h,i,L,T,H=()=>{}){let{activeRunId:O,activeRunSessionId:$}=f;if(!O||!$)throw Error("active run is unavailable for steering");if(f.pendingSteering)return;let R={id:U(),role:"user",text:h,attachments:Ub(i),createdAt:Date.now(),meta:{piWebChatSteeringState:"pending"}},_=q(w,$),l=new AbortController,N=Bp(l.signal,()=>{let y=f.pendingSteering;if(y){if(y.sent=!0,Ep(w,y.sessionId,y.messageId),w.activeSessionId===y.sessionId)J(p,q(w,y.sessionId).messages,y.sessionId);H()}});if(f.pendingSteering={sessionId:$,messageId:R.id,timeout:N.timeout,controller:l,sent:!1},jb(f.pendingPromptEchoIds,$,R.id),_.messages.push(R),_.updatedAt=Date.now(),Z(w),w.activeSessionId===$)J(p,_.messages,$);H();try{if(await N.promise,l.signal.aborted)return;let y=await up(b,O,h,i,$,L,T);lb(y)}catch(y){if(k1(y))return;if(c(w,$,R.id),Q0(f.pendingPromptEchoIds,$,R.id),_1(y)){J(p,_.messages,$),globalThis.piWeb?.subject("toast.requested").next({level:"error",message:"This backend does not support steering while a response is streaming."});return}throw y}finally{if(f.pendingSteering?.controller===l)f.pendingSteering=void 0,H()}}function Bp(b,p){let w,f=new Promise((h,i)=>{w=setTimeout(()=>{p(),h()},ip),b.addEventListener("abort",()=>{clearTimeout(w),i(new DOMException("Steering cancelled","AbortError"))},{once:!0})});return{timeout:w,promise:f}}function c(b,p,w){let f=b.sessions.find((h)=>h.id===p);if(!f)return;f.messages=f.messages.filter((h)=>h.id!==w),M1(b,f.id),Z(b)}function Ep(b,p,w){let f=q(b,p).messages.find((h)=>h.id===w);if(!f?.meta)return;if(delete f.meta.piWebChatSteeringState,Object.keys(f.meta).length===0)delete f.meta;Z(b)}async function vp(b,p,w,f,h,i,L,T,H){let O=await H1(b,"streamEventsSse",{runId:f,cursor:0,workspacePath:h},H,i);if(!O)throw Error("SSE streaming backend did not return a stream");let $=T1(T),R=Pp(p,fp);L.streaming=!0,$.flush();try{await $1(O,(_)=>{Sp(L,[_]),L.streaming=_.type!=="run.end",w.updatedAt=Date.now(),R.request(),$.request()})}finally{L.streaming=!1,R.flush(),$.flush()}}function Pp(b,p){let w=0,f,h=()=>{if(f)clearTimeout(f),f=void 0},i=()=>{h(),w=Date.now(),Z(b)};return{request:()=>{let T=p-(Date.now()-w);if(T<=0){i();return}f||=setTimeout(i,T)},flush:i}}function T1(b){let p=0,w,f=()=>{if(w)clearTimeout(w),w=void 0},h=()=>{f(),p=Date.now(),b()};return{request:()=>{let L=wp-(Date.now()-p);if(L<=0){h();return}w||=setTimeout(h,L)},flush:h,cancel:f}}async function H1(b,p,w={},f,h=s(b)){if(!b.backendStream)throw Error("SSE streaming backend is unavailable");let i=await b.backendStream(p,{workspaceId:h,data:w},{signal:f});return kp(i)}function kp(b){if(typeof ReadableStream<"u"&&b instanceof ReadableStream)return b;if(typeof Response<"u"&&b instanceof Response)return b.body;if(typeof b==="string")return Sb(b);if(!F(b))return null;let p=b.body;if(typeof ReadableStream<"u"&&p instanceof ReadableStream)return p;let w=b.sse;if(typeof w==="string")return Sb(w);return null}function Sb(b){let p=new TextEncoder().encode(b);return new ReadableStream({start(w){w.enqueue(p),w.close()}})}async function $1(b,p){let w=b.getReader(),f=new TextDecoder,h="";while(!0){let i=await w.read();if(i.done){h+=f.decode(),gp(h,p);return}h+=f.decode(i.value,{stream:!0});let L=xp(h);h=L.remainder;for(let T of L.frames)O1(T,p)}}function xp(b){let w=b.replaceAll(`\r
`,`
`).replaceAll("\r",`
`).split(`

`),f=w.pop()||"";return{frames:w,remainder:f}}function gp(b,p){let w=b.trim();if(w)O1(w,p)}function O1(b,p){let w=b.split(`
`).filter((f)=>f.startsWith("data:")).map((f)=>f.slice(5).trimStart()).join(`
`);if(!w)return;try{let f=JSON.parse(w);if(np(f))p(f)}catch{}}function mb(b,p){globalThis.piWeb?.subject("chat.input.submitted").next({text:b,attachments:Ub(p)||[]})}async function rp(b,p,w,f,h=A(b).path,i=A(b).id){try{return await X(b,"startPrompt",qb(p,w,f,h),i)}catch(L){if(_1(L))return{};throw L}}function _1(b){return/unknown method: (startPrompt|streamEventsSse|steerPrompt)|unsupported method: (startPrompt|streamEventsSse|steerPrompt)|(startPrompt|streamEventsSse|steerPrompt) unsupported/i.test(wb(b))}async function cp(b,p,w,f="",h=A(b).path,i=A(b).id){return await X(b,"submitPrompt",qb(p,w,f,h),i)}async function up(b,p,w,f,h="",i=A(b).path,L=A(b).id){let T={...qb(w,f,h,i),runId:p};return X(b,"steerPrompt",T,L)}async function R1(b,p,w="",f=A(b).id){return X(b,"abortPrompt",{runId:p,sessionId:w},f)}function qb(b,p,w,f){let h={text:b,attachments:p,sessionId:w};if(f)h.workspacePath=f;return h}function Ip(b){let p=[...b.messages].reverse().find((f)=>f.role==="assistant"&&f.streaming);if(p)return p;let w={id:U(),role:"assistant",text:"",createdAt:Date.now(),streaming:!0};return b.messages.push(w),w}function Sp(b,p){for(let w of p)if(w.type==="text.delta"&&typeof w.delta==="string")$b(b,"text",w.delta),b.text+=w.delta;else if(w.type==="thinking.delta"&&typeof w.delta==="string")$b(b,"thinking",w.delta),b.thinking=`${b.thinking||""}${w.delta}`;else if(w.type==="tool.start")Ob(b,w,"running");else if(w.type==="tool.delta"&&typeof w.delta==="string"){let f=Ob(b,w,"running");f.text=w.delta}else if(w.type==="tool.end"){let f=Ob(b,w,w.isError?"err":"ok");if(typeof w.result==="string"&&w.result)f.text=w.result}else if(w.type==="error"&&typeof w.message==="string")$b(b,"text",`${b.text?`
`:""}${w.message}`),b.text+=`${b.text?`
`:""}${w.message}`}function $b(b,p,w){b.blocks||=[];let f=b.blocks[b.blocks.length-1];if(f?.type===p){f.text+=w;return}if(b.blocks.length<Zb)b.blocks.push({id:U(),type:p,text:w})}function Ob(b,p,w){let f=p.toolCallId||p.toolName||"tool";b.toolCalls||=[];let h=b.toolCalls.find((i)=>i.id===f);if(!h)h={id:f,name:p.toolName||"tool",args:p.args,text:"",status:w},b.toolCalls.push(h),mp(b,h);if(h.status=w,dp(h,p))h.args=p.args,h.argsStatus=p.argsStatus;return h}function mp(b,p){if(b.blocks||=[],b.blocks.some((w)=>w.type==="tool"&&w.toolCall?.id===p.id))return;if(b.blocks.length<Zb)b.blocks.push({id:U(),type:"tool",text:"",toolCall:p})}function dp(b,p){if(!p.argsStatus)return Boolean(p.args);if(p.argsStatus==="unavailable")return!b.argsStatus;return!0}function np(b){return F(b)&&typeof b.type==="string"}async function e(b,p,w,f,h="",i=Cb(b),L=A(b).id){if(!b.backendStream){await db(b,p,w,f,h,i);return}let T=++f.backendChatToken;f.sessionEventsAbort?.abort();let H=new AbortController;f.sessionEventsAbort=H;let O=T1(()=>{J(p,S(w).messages,w.activeSessionId)});try{let $=await H1(b,"sessionEventsSse",z1(b,h,i),H.signal,L);if(!$)throw Error("session SSE backend did not return a stream");await $1($,(R)=>{if(T!==f.backendChatToken||R.type!=="chat.state")return;let _=ap(R),l=typeof _.activeSessionId==="string"?_.activeSessionId:h,N=u(f.pendingPromptEchoIds,l),y=u(f.pendingAssistantEchoIds,l),z=N1(b,w,_,"chatState",N,y);if(l1(f,_,l,i,L),I(f.pendingPromptEchoIds,l,z,N),I(f.pendingAssistantEchoIds,l,z,y),z.length)O.request()})}catch($){if(!H.signal.aborted)await db(b,p,w,f,h,i)}finally{if(O.flush(),f.sessionEventsAbort===H)f.sessionEventsAbort=void 0}}async function db(b,p,w,f,h="",i=Cb(b)){let L=++f.backendChatToken;try{let T=await X(b,"chatState",z1(b,h,i));if(L!==f.backendChatToken)return;let H=typeof T.activeSessionId==="string"?T.activeSessionId:h,O=u(f.pendingPromptEchoIds,H),$=u(f.pendingAssistantEchoIds,H),R=N1(b,w,T,"chatState",O,$);if(l1(f,T,H,i,A(b).id),I(f.pendingPromptEchoIds,H,R,O),I(f.pendingAssistantEchoIds,H,R,$),R.length)J(p,R,w.activeSessionId)}catch{}}function z1(b,p,w=Cb(b)){let f=p?{sessionId:p}:{};if(w)f.workspacePath=w;return f}function ap(b){return{activeSessionId:b.activeSessionId,messages:b.messages,runId:b.runId,isStreaming:b.isStreaming}}function l1(b,p,w,f,h){if(p.isStreaming===!0&&typeof p.runId==="string"&&p.runId){b.activeRunId=p.runId,b.activeRunSessionId=typeof p.activeSessionId==="string"&&p.activeSessionId?p.activeSessionId:w,b.activeRunWorkspacePath=f,b.activeRunWorkspaceId=h,b.onRunStateChange?.();return}if(p.isStreaming===!1&&(!p.activeSessionId||p.activeSessionId===b.activeRunSessionId))b.activeRunId=void 0,b.activeRunSessionId=void 0,b.activeRunWorkspacePath=void 0,b.activeRunWorkspaceId=void 0,b.onRunStateChange?.()}function Cb(b){return A(b).path}function A(b){let p=b.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),w=p?.activeWorkspaceId||b.app?.dataset.activeWorkspaceId||"",f=p?.workspaces?.find((h)=>h.id===w)?.path||"";return{id:w,path:f}}function y1(b,p){let w=b.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),f=p.workspaceId||w?.activeWorkspaceId||b.app?.dataset.activeWorkspaceId||"",h=w?.workspaces?.find((i)=>i.id===f)?.path||"";if(h||f!==w?.activeWorkspaceId)return{id:f,path:h};return A(b)}function N1(b,p,w,f,h="",i=""){let L=Qb(w.messages);if(typeof w.activeSessionId==="string"&&w.activeSessionId){let $=p.activeSessionId;if(k(p,w.activeSessionId),B(b,{sessionId:w.activeSessionId,workspaceId:b.app?.dataset.activeWorkspaceId||s(b)||void 0}),f!=="chatState"||$!==w.activeSessionId)r(b,"chat-session",{reason:f,sessionId:w.activeSessionId});if(f!=="chatState")Jb(b,w.activeSessionId,f)}let T=S(p);if(!L.length)return[];let H=D1(T.messages,L,h,i).slice(-g);if(!j1(T.messages,H))return[];T.messages=H;let O=Gb(T);if(T.updatedAt=Date.now(),Z(p),O)Ab(T.id,O);return T.messages}function j1(b,p){if(b.length!==p.length)return!0;return b.some((w,f)=>yb(w)!==yb(p[f]))}function yb(b){return JSON.stringify({id:b.id,role:b.role,text:b.text,blocks:b.blocks,thinking:b.thinking,streaming:b.streaming,toolCalls:b.toolCalls,attachments:b.attachments})}function op(b,p,w,f,h,i=""){let L=Qb(w.messages),T=typeof w.activeSessionId==="string"&&w.activeSessionId?w.activeSessionId:h,H=p.activeSessionId===h;if(T!==h)if(H)k(p,T),B(b,{sessionId:T,workspaceId:A(b).id||void 0}),r(b,"chat-session",{reason:f,sessionId:T}),Jb(b,T,f);else q(p,T);let O=Array.isArray(i)?i:[i].filter(Boolean);if(T!==h)for(let l of O)W1(p,h,T,l);let $=q(p,T);if(!L.length)return[];let R=D1($.messages,L,i).slice(-g);if(!j1($.messages,R))return[];$.messages=R;let _=Gb($);if($.updatedAt=Date.now(),Z(p),_)Ab($.id,_);return $.messages}function tp(b,p,w,f,h){let i=(O,$)=>{if(!O?.sessionId){if(!$)nb(p,w,f,h,!0);return}if(Z1(p,f,O))return;B(p,O),k(f,O.sessionId),J(w,S(f).messages,f.activeSessionId);let R=y1(p,O);e(p,w,f,h,O.sessionId,R.path,R.id)},L=(O)=>{if(sp(p,w,f,h,O))return;let $=b0(p,O);if($)i($,!1)},T=p.app?.piWebSidebar?.channels?.selectedSession$||globalThis.piWebSidebar?.channels?.selectedSession$,H=p.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$;if(T){let O=!0;b.add(T.subscribe(($)=>{i($,O),O=!1}))}if(H)b.add(H.subscribe(L));if(p.app)b.listen(p.app,"pi-web-sidebar:session-created",(O)=>{let $=O.detail||{},R=typeof $.sessionId==="string"?$.sessionId:"",_=typeof $.workspaceId==="string"?$.workspaceId:"";if(R)i({sessionId:R,workspaceId:_||void 0},!1)});if(globalThis.piWeb){let O=!0;b.add(globalThis.piWeb.behaviorSubject(b1,M(p)).subscribe((R)=>{i(R,O),O=!1})),b.add(globalThis.piWeb.subject(p1).subscribe(L));let $=!0;b.add(globalThis.piWeb.behaviorSubject("session.activeId",null).subscribe((R)=>{if(!R){if(!$)nb(p,w,f,h,!1);$=!1;return}$=!1,i({sessionId:R,workspaceId:p.app?.dataset.activeWorkspaceId||B1(Vb)||void 0},!1)}))}}function nb(b,p,w,f,h){if(f.backendChatToken+=1,f.runEventsAbort?.abort(),f.sessionEventsAbort?.abort(),w.activeSessionId="",Z(w),h)L1(b);else{let i=M(b);if(i?.sessionId&&b.app)b.app.dataset.clearedSessionId=i.sessionId}bb(p)}function V1(b,p){let w=M(b);if(w?.sessionId&&!Z1(b,p,w))B(b,w),k(p,w.sessionId);if(!p.activeSessionId)return q(p,"",!0).id;return p.activeSessionId}function Z1(b,p,w){let f=w.workspaceId||"",h=b.app?.dataset.activeWorkspaceId||B1(Vb)||"";return p.activeSessionId===w.sessionId&&(!f||f===h)}function sp(b,p,w,f,h){if(h.type!=="session.deleted")return!1;let i=J1(h);if(!i)return!0;let L=w.activeSessionId===i,T=w.sessions.length;if(w.sessions=w.sessions.filter((H)=>H.id!==i),L){f.runEventsAbort?.abort(),f.sessionEventsAbort?.abort();let H=ep(b,h,i);if(H?.sessionId){B(b,H),k(w,H.sessionId),w0(p,S(w).messages,w.activeSessionId);let O=y1(b,H);return e(b,p,w,f,H.sessionId,O.path,O.id),!0}return w.activeSessionId="",L1(b),Z(w),bb(p),!0}if(w.sessions.length!==T)Z(w);return!0}function ep(b,p,w){let f=p.snapshot?.activeSessionId||"",h=p.snapshot?.activeWorkspaceId||"";if(f&&f!==w)return{sessionId:f,workspaceId:h||void 0};let i=M(b);if(i?.sessionId&&i.sessionId!==w)return i;return null}function b0(b,p){if(!p0(p.type))return null;let w=p.detail||{},f=J1(p)||p.snapshot?.activeSessionId||"",h=typeof w.workspaceId==="string"?w.workspaceId:p.snapshot?.activeWorkspaceId||b.app?.dataset.activeWorkspaceId||"";if(!f)return null;return{sessionId:f,workspaceId:h||void 0}}function J1(b){let p=b.detail||{};if(typeof p.sessionId==="string")return p.sessionId;if(typeof p.id==="string")return p.id;return""}function p0(b){return b==="session.selected"||b==="session.created"||b==="new-session"||b==="active.start"}function k(b,p){let w=b.sessions.find((f)=>f.id===p);if(!w)w=pb(p),b.sessions.unshift(w);return b.activeSessionId=w.id,Z(b),w}function J(b,p,w){if(F1(p,w),!p.length){bb(b);return}let f=b.querySelector(".term-inner")||b;A1(f,p,w),Fb(b)}function w0(b,p,w){F1(p,w);let f=b.querySelector(".term-inner")||b;A1(f,p,w),Fb(b)}function A1(b,p,w){let f=h0(b),h=p.map((T)=>{let H=`${w}:${yb(T)}`,O=f.get(T.id);if(O){if(Rb.get(O)!==H)f0(O,T,w,H);return O}let $=q1(T,w);return Rb.set($,H),$}),i=new Set(h),L=b.firstChild;for(let T of h){if(L!==T)b.insertBefore(T,L);L=T.nextSibling}for(let T of Array.from(b.children)){if(Nb(b,T)&&!i.has(T)){T.remove();continue}if(!Nb(b,T))T.remove()}}function f0(b,p,w,f){let h=q1(p,w);if(b.replaceChildren(...Array.from(h.childNodes)),b.className=h.className,b.dataset.messageId=p.id,p.streaming)b.dataset.streaming="true";else delete b.dataset.streaming;Rb.set(b,f)}function h0(b){let p=new Map;for(let w of Array.from(b.children)){if(!Nb(b,w))continue;let f=w.dataset.messageId||"";if(f)p.set(f,w)}return p}function Nb(b,p){let w=b.ownerDocument.defaultView;return Boolean(w&&p instanceof w.HTMLElement&&p.classList.contains("transcript-item"))}function bb(b){let p=b.querySelector(".term-inner")||b,w=document.createElement("article");w.className="pi-web-chat-docs",w.setAttribute("aria-label","pi-web-chat guide");let f=document.createElement("h1");f.textContent="pi-web-chat guide";let h=document.createElement("p");h.textContent=["Select or create a session in the sidebar to load chat history,","or type below to start a new session."].join(" ");let i=document.createElement("ul");for(let L of["Ask pi in the prompt box and press Cmd/Ctrl+Enter to send.","Type ! then Space at the start to turn the prompt yellow and run shell commands in the workspace.","Queued file attachments hide during shell mode and reappear for the next normal prompt.","Type @ to list project files, then pick one to tag it as prompt context.","Type / at the start to open the slash command list.","Chats are cached locally after you start or select a session."]){let T=document.createElement("li");T.textContent=L,i.append(T)}w.append(f,h,i),p.replaceChildren(w),Fb(b)}function i0(b,p){let w=p.querySelector(".term"),f=p.querySelector("[data-action='scroll-bottom']");if(!w||!f)return;let h={term:w,button:f,pinned:!0,touchStartY:null};zb.set(p,h),f.hidden=!1,t(h),b.listen(f,"click",()=>{h.pinned=!0,G1(h),t(h)}),b.listen(w,"wheel",(i)=>{if(i.deltaY<0)ab(h)}),b.listen(w,"touchstart",(i)=>{let L=i;h.touchStartY=L.touches.item(0)?.clientY??null}),b.listen(w,"touchmove",(i)=>{let T=i.touches.item(0)?.clientY;if(typeof T==="number"&&h.touchStartY!==null&&T-h.touchStartY>8)ab(h)}),b.listen(w,"touchend",()=>{h.touchStartY=null}),b.add({remove:()=>{zb.delete(p)}})}function Fb(b){let p=zb.get(b);if(!p)return;if(p.pinned)G1(p);t(p)}function G1(b){b.term.scrollTop=b.term.scrollHeight}function ab(b){b.pinned=!1,t(b)}function t(b){b.button.dataset.pinned=b.pinned?"true":"false",b.button.setAttribute("aria-pressed",b.pinned?"true":"false")}function q1(b,p){let w=document.createElement("article");if(w.className="transcript-item",w.dataset.messageId=b.id,L0(b))T0(w,b,p);else if(H0(b)){let f=$0(b);if(f)Yb(w,b.role,b.text);R0(w,b,p,f)}else z0(w,b,p);if(b.streaming)w.dataset.streaming="true";return w}function L0(b){return b.role==="user"&&b.meta?.piWebChatSteeringState==="pending"}function T0(b,p,w){let f=document.createElement("div");f.className="msg pending-steering",f.dataset.kind="user";let h=document.createElement("span");h.className="prefix user",h.textContent=Q1("user");let i=document.createElement("small");i.className="body user pending-steering-text",i.textContent=p.text;let L=document.createElement("button");L.type="button",L.className="pending-steering-cancel",L.dataset.action="cancel-steering",L.dataset.sessionId=w,L.dataset.messageId=p.id,L.setAttribute("aria-label","cancel steering"),L.title="cancel steering",L.textContent="×",f.append(h,i,L),b.append(f)}function H0(b){return Boolean(b.blocks?.some((p)=>{return p.type==="tool"||p.text.trim().length>0}))}function $0(b){return Boolean(b.text.trim())&&(!O0(b)||_0(b))}function O0(b){return Boolean(b.blocks?.some((p)=>{return p.type==="text"&&p.text.trim().length>0}))}function _0(b){return(b.blocks?.length||0)>=Zb}function R0(b,p,w,f=!1){for(let h of p.blocks||[])if(h.type==="text"){if(!f)Yb(b,p.role,h.text)}else if(h.type==="thinking")b.append(C1(h.text,Boolean(p.streaming)));else if(h.type==="tool"&&h.toolCall){let i=p.toolCalls?.find((L)=>L.id===h.toolCall?.id)||h.toolCall;b.append(Y1(i,Xb(w,p,i)))}}function z0(b,p,w){if(l0(p))Yb(b,p.role,p.text);if(p.thinking)b.append(C1(p.thinking,Boolean(p.streaming)));for(let f of p.toolCalls||[])b.append(Y1(f,Xb(w,p,f)))}function Yb(b,p,w){if(p==="assistant"&&!w.trim())return;let f=document.createElement("div");f.className="msg",f.dataset.kind=_b(p);let h=document.createElement("span");h.className=`prefix ${_b(p)}`,h.textContent=Q1(p);let i=document.createElement("pre");i.className=`body ${_b(p)}`,i.textContent=w,f.append(h,i),b.append(f)}function l0(b){let p=b.text.trim().length>0;return b.role!=="assistant"||p}function C1(b,p){let w=document.createElement("details");w.className="msg-detail think thinking-block",w.open=p;let f=document.createElement("summary");f.className="label",f.textContent="THINKING";let h=document.createElement("pre");return h.className="body",h.textContent=b,w.append(f,h),w}function F1(b,p){let w=new Set;for(let f of b)for(let h of f.toolCalls||[])w.add(Xb(p,f,h));for(let f of P)if(!w.has(f))P.delete(f)}function Xb(b,p,w){return`${b}:${p.id}:${w.id}`}function Y1(b,p){let w=document.createElement("div");w.className="tool-card",w.dataset.tool=b.name||"tool",w.dataset.status=b.status;let f=!P.has(p);w.dataset.collapsed=f?"true":"false";let h=document.createElement("button");if(h.type="button",h.className="tc-head",h.title=f?"Show tool output":"Hide tool output",h.setAttribute("aria-expanded",f?"false":"true"),h.setAttribute("aria-label",X1(b,f)),h.append(V0(b),Z0(b),J0(b),A0(b,f)),!f)w.append(U1(b));return h.addEventListener("click",()=>j0(w,h,b,p)),w.prepend(h),w}function X1(b,p){let w=p?"Show":"Hide",f=b.status==="running"?"running":b.status==="err"?"failed":"done",h=y0(b),i=h?`, ${h}`:"";return`${w} ${b.name||"tool"} output, ${f}${i}`}function y0(b){if(b.argsStatus==="present")return"arguments present";if(b.argsStatus)return n(b);return b.args?"arguments present":""}function U1(b){let p=document.createElement("pre");return p.className="tc-body",p.textContent=b.text||ib(b),p}function N0(){let b=document.createElement("span");b.className="spinner",b.setAttribute("aria-hidden","true");for(let p=0;p<hp;p+=1)b.append(document.createElement("span"));return b}function j0(b,p,w,f){let h=b.querySelector(".tc-body"),i=h!==null;if(h)h.remove(),P.delete(f);else b.append(U1(w)),P.add(f);b.dataset.collapsed=i?"true":"false",p.setAttribute("aria-expanded",i?"false":"true"),p.setAttribute("aria-label",X1(w,i)),p.title=i?"Show tool output":"Hide tool output";let L=p.querySelector(".tc-toggle-label");if(L)L.textContent=i?"show":"hide"}function V0(b){let p=document.createElement("span");p.className="tc-glyph";let w=G0(b),f=w?Lp[w]:"";if(!w||!f)return p.textContent="●",p;return p.innerHTML=`<svg class="tc-icon" data-tool-icon="${w}" aria-hidden="true" viewBox="0 0 24 24">${f}</svg>`,p}function Z0(b){let p=document.createElement("span");return p.className="tc-name",p.textContent=b.name||"tool",p}function J0(b){let p=document.createElement("span");return p.className="tc-args",p.textContent=n(b),p}function A0(b,p){let w=document.createElement("span");if(w.className="tc-meta",b.status==="running"){let i=N0(),L=document.createElement("span");return L.className="running",L.textContent="running",w.append(i,L,ob(p)),w}let f=document.createElement("span");f.className=b.status==="err"?"err":"ok",f.textContent=b.status==="err"?"✗":"✓";let h=document.createElement("span");return h.textContent=b.status==="err"?" · failed":" · done",w.append(f,h,ob(p)),w}function ob(b){let p=document.createElement("span");p.className="tc-toggle";let w=document.createElement("span");w.className="tc-toggle-label",w.textContent=b?"show":"hide";let f=document.createElement("span");return f.className="tc-caret",f.textContent="▸",p.append(w,f),p}function G0(b){let p=q0(b.name);if(["bash","shell","sh","zsh","terminal"].includes(p))return C0(n(b).toLowerCase())||"terminal";return Tp[p]}function q0(b){return b.trim().replace(/^functions\./,"").replace(/^multi_tool_use\./,"")}function C0(b){if(/\bgit\b|\bgh\b/.test(b))return"git-branch";if(/\b(go test|bun test|npm test|pnpm test|yarn test|vitest|pytest|cargo test)\b/.test(b))return"circle-check";if(/\b(bun|npm|pnpm|yarn)\s+(run\s+)?build\b|\b(go build|cargo build)\b/.test(b))return"hammer";if(/\b(bun|npm|pnpm|yarn)\s+(add|install|i)\b|\bpip\s+install\b|\bgo\s+get\b/.test(b))return"package";return}function Q1(b){if(b==="assistant")return"pi >";if(b==="user")return"you >";if(b==="system")return"sys >";return"tool >"}function _b(b){if(b==="assistant")return"pi";if(b==="system")return"sys";return b}function F0(b){let p=/^\/([^\s/]*)$/.exec(b);return p?p[1].toLowerCase():null}function Y0(b){let p=/(?:^|\s)@([^\s@`]*)$/.exec(b);return p?p[1]:null}function a0(b){return b.length>0}function o0(b,p){return b.trim().startsWith("!")&&p}function D1(b,p,w="",f=""){let h=tb(w),i=tb(f),L=new Map,T=new Map,H=new Map,O=p.length;for(let _ of b)L.set(_.id,_),T.set(_.id,O++);let $=new Set,R=new Set;return p.forEach((_,l)=>{let N=X0(b,_,h,$);if(N){$.add(N.id);let z=K1(b,N.id,i,R);if(z)H.set(_.id,z);sb(L,T,N.id,_,l);return}let y=U0(b,p,_,l,i,R,H);if(y){R.add(y),sb(L,T,y,_,l);return}T.set(_.id,l),L.set(_.id,{...L.get(_.id),..._})}),[...L.values()].sort((_,l)=>{let N=(T.get(_.id)??0)-(T.get(l.id)??0);if(N!==0)return N;return _.createdAt-l.createdAt})}function tb(b){return Array.isArray(b)?b:[b].filter(Boolean)}function sb(b,p,w,f,h){b.delete(w),b.set(f.id,f),p.delete(w),p.set(f.id,h)}function X0(b,p,w,f){if(!w.length||p.role!=="user"||!p.text.trim())return;if(b.some((h)=>h.id===p.id))return;return b.find((h)=>{return w.includes(h.id)&&!f.has(h.id)&&h.role===p.role&&h.text.trim()===p.text.trim()})}function U0(b,p,w,f,h,i,L){if(w.role!=="assistant"||f<=0)return"";let T=p[f-1];if(T?.role!=="user")return"";let H=L.get(T.id)||"";if(H&&!i.has(H))return H;return K1(b,T.id,h,i)}function K1(b,p,w,f){let h=b.findIndex((L)=>L.id===p);if(h<0)return"";let i=b[h+1];if(i?.role==="assistant"&&w.includes(i.id)&&!f.has(i.id))return i.id;return""}function jb(b,p,w){b.set(p,[...b.get(p)||[],w])}function u(b,p){return b.get(p)||[]}function Q0(b,p,w){let f=(b.get(p)||[]).filter((h)=>h!==w);if(f.length){b.set(p,f);return}b.delete(p)}function D0(b,p,w){let f=b.get(p)||[];if(!f.length)return;b.delete(p),b.set(w,[...b.get(w)||[],...f])}function I(b,p,w,f){if(!f.length||!w.length)return;let h=f.filter((i)=>{return w.some((L)=>L.id===i)});if(h.length){b.set(p,h);return}b.delete(p)}function S(b){return q(b,b.activeSessionId,!0)}function q(b,p,w=!1){let f=b.sessions.find((h)=>h.id===p);if(!f)f=pb(p||void 0),b.sessions.unshift(f),Z(b);if(w||!b.activeSessionId)b.activeSessionId=f.id,Z(b);return f}function W1(b,p,w,f){if(p===w)return;let h=b.sessions.find((H)=>H.id===p),i=h?.messages.findIndex((H)=>H.id===f)??-1;if(!h||i<0)return;let[L]=h.messages.splice(i,1),T=q(b,w);if(!T.messages.some((H)=>H.id===L.id))T.messages.push(L);h.updatedAt=Date.now(),T.updatedAt=Date.now(),M1(b,h.id),Z(b)}function M1(b,p){let w=b.sessions.find((f)=>f.id===p);if(!w||w.id===b.activeSessionId||w.messages.length>0||w.title!=="New chat")return;b.sessions=b.sessions.filter((f)=>f.id!==w.id)}function pb(b=U()){let p=Date.now();return{id:b,title:"New chat",createdAt:p,updatedAt:p,messages:[]}}function B1(b){try{return localStorage.getItem(b)||""}catch{return""}}function K0(b){let p=pb(b);return{activeSessionId:p.id,sessions:[p]}}function W0(){try{let b=JSON.parse(localStorage.getItem(o)||"null");if(b&&Array.isArray(b.sessions))return{activeSessionId:"",sessions:b.sessions.filter(E1).map(v1)}}catch{}return{activeSessionId:"",sessions:[]}}function M0(b=""){try{let p=JSON.parse(localStorage.getItem(o)||"null");if(p&&typeof p.activeSessionId==="string"&&Array.isArray(p.sessions)){let w=p.sessions.filter(E1).map(v1);if(b&&!w.some((f)=>f.id===b))w.unshift(pb(b));return{activeSessionId:b||p.activeSessionId,sessions:w}}}catch{}return K0(b||void 0)}function Z(b){eb(b);try{localStorage.setItem(o,JSON.stringify(b))}catch{for(let p of b.sessions)p.messages=p.messages.slice(-Math.floor(g/2));eb(b);try{localStorage.setItem(o,JSON.stringify(b))}catch{}}}function Ub(b){if(!b?.length)return;return b.map(({content:p,...w})=>w)}function eb(b){b.sessions.sort((f,h)=>h.updatedAt-f.updatedAt);let p=b.sessions.find((f)=>f.id===b.activeSessionId),w=b.sessions.filter((f)=>f.id!==b.activeSessionId).slice(0,Math.max(0,cb-1));b.sessions=p?[p,...w]:b.sessions.slice(0,cb);for(let f of b.sessions)if(f.messages.length>g)f.messages.splice(0,f.messages.length-g)}function E1(b){return F(b)&&typeof b.id==="string"&&Array.isArray(b.messages)}function v1(b){return{...b,messages:Qb(b.messages)}}function Qb(b){return Array.isArray(b)?b.filter(x0).map(B0):[]}function B0(b){let p={...b};if(Array.isArray(b.toolCalls))p.toolCalls=b.toolCalls.filter(P1);else delete p.toolCalls;if(Array.isArray(b.blocks))p.blocks=b.blocks.filter(v0).map(E0);else delete p.blocks;return p}function E0(b){if(b.type!=="tool"){let{toolCall:p,...w}=b;return w}return b}function v0(b){if(!F(b)||typeof b.id!=="string"||typeof b.text!=="string")return!1;if(b.type==="text"||b.type==="thinking")return!0;return b.type==="tool"&&P1(b.toolCall)}function P1(b){if(!F(b)||typeof b.id!=="string"||typeof b.name!=="string")return!1;return typeof b.text==="string"&&k0(b.status)&&P0(b.argsStatus)}function P0(b){return b===void 0||b==="present"||b==="empty"||b==="unavailable"||b==="truncated"||b==="omitted"}function k0(b){return b==="running"||b==="ok"||b==="err"}function x0(b){if(!F(b)||typeof b.id!=="string"||typeof b.text!=="string")return!1;return typeof b.createdAt==="number"&&g0(b.role)}function g0(b){return b==="user"||b==="assistant"||b==="tool"||b==="system"}function F(b){return typeof b==="object"&&b!==null}function U(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`}function k1(b){return b instanceof Error&&(b.name==="AbortError"||/aborted|abort/i.test(b.message))}function wb(b){return b instanceof Error?b.message:String(b)}export{n as toolArgsInlineText,ib as toolArgsBodyText,n0 as submittedAttachmentsForText,o0 as shellAttachmentNoteVisible,d1 as setComposerMode,d as renderPromptMeta,S1 as renderMessages,a1 as promptFromAgUiLikeRunInput,xb as pluginStyleText,hb as pluginClass,d0 as mergeCommands,a0 as hasQueuedAttachmentNames,s as getActiveWorkspaceId,qp as formatShellOutput,i1 as extractRefs,Hp as default,vb as createComposerSurface,Eb as createChatSurface,I1 as createChatDom,m0 as createChannels,n1 as createAgUiLikeRunInput,a as commandName,o1 as chatEventsToAgUiLikeEvents,X as backendCall};
