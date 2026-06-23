var x={attachFile:["M16.5 6v11.5a4 4 0 0 1-8 0V5a2.5 2.5 0 0 1 5 0v10.5a1 1 0 0 1-2 0V6H10v9.5","a2.5 2.5 0 0 0 5 0V5a4 4 0 0 0-8 0v12.5a5.5 5.5 0 0 0 11 0V6h-1.5Z"].join(""),stop:"M6 6h12v12H6V6Z",send:"M2 21 23 12 2 3v7l15 2-15 2v7Z",terminal:"M3 4h18v16H3V4Zm2 2v12h14V6H5Zm2 3 1.1-1.1L12.2 12l-4.1 4.1L7 15l3-3-3-3Zm6 6h5v1.5h-5V15Z",file:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 2.5L17.5 8H14V4.5ZM8 13h8v1.5H8V13Zm0 3h8v1.5H8V16Z"},r={attachFile:k("attach_file",x.attachFile),stop:k("stop",x.stop),send:k("send",x.send),terminal:k("terminal",x.terminal)};function S1(b){return`<span class="composer-spinner" aria-hidden="true"></span><span class="sr-only">${S(b)}</span>`}function k(b,w){return`<svg class="material-icon" data-material-icon="${b}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="${w}"></path></svg>`}function S(b){return b.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function Z1(){return"pi-web-chat-mounted"}function d1(){let b=document.createElement("main");return b.className="main pi-web-chat-surface",b.dataset.main="session",b.dataset.pluginChatRoot="",b.innerHTML='<div class="term"><div class="term-inner" role="log" aria-live="polite" aria-relevant="additions text"></div></div><button type="button" class="scroll-bottom-btn" data-action="scroll-bottom" aria-label="stick to bottom" title="stick to bottom" aria-pressed="true" hidden>↓</button>',b}function n1(){let b=document.createElement("section");return b.className="prompt-region pi-web-chat-composer",b.innerHTML=`
    <div class="slash-pop" hidden><div class="slash-head">slash commands · type to filter</div><div class="slash-list"></div></div>
    <div class="prompt-file-ref-pop" hidden><div class="slash-head">project files · type to filter</div><div class="prompt-file-ref-list"></div></div>
    <div class="prompt-bar">
      <button class="attach-btn" type="button" aria-label="attach files" title="attach files">${r.attachFile}</button>
      <input type="file" multiple hidden data-file-input />
      <div class="prompt-input-col"><div class="attach-chips" hidden></div><div class="shell-attachment-note" aria-live="polite" hidden>queued attachments are hidden during shell mode and will reappear for the next normal prompt</div><textarea class="prompt-textarea" aria-label="Prompt" placeholder="ask pi to do something…" rows="1"></textarea></div>
      <div class="prompt-actions">
        <button class="stop-btn" type="button" aria-label="stop" title="stop" hidden>${r.stop}</button>
        <button class="mic-btn" type="button" data-action="toggle-speech-input" aria-label="start voice input" title="voice input" hidden>\uD83C\uDF99</button>
        <button class="send-btn" type="button" aria-label="send" title="send" aria-disabled="true">${r.send}</button>
      </div>
      <div class="drop-overlay" hidden><span>drop to attach</span></div>
    </div>
    <div class="prompt-meta" data-prompt-meta></div>`,L1(b,{}),b}function L1(b,w={},f=!1){let p=b.querySelector("[data-prompt-meta]");if(!p)return;let L=[fb(w.model||"—",w.thinkingLevel)],T=m1("5h",w.fiveHourQuota),$=m1("Week",w.weeklyQuota),H=w.currentBranch||w.branch||"—";if(w.warning)L.push(wb(w.warning));if(T)L.push(T);if($)L.push($);if(L.push(bb(H)),p.innerHTML=L.join(" | "),f)p.append(document.createTextNode(" | "),e0())}function e0(){let b=document.createElement("span");return b.className="prompt-meta-item pi-web-chat-badge",b.textContent="chat plugin",b}function bb(b){return`<span class="prompt-meta-item prompt-meta-branch">${a1("git-branch")}<span>${S(b)}</span></span>`}function wb(b){return`<span class="prompt-meta-item prompt-meta-warning" title="${S(b)}">runtime warning</span>`}function fb(b,w){let f=S(b);return w?`${f} (${S(w)})`:f}function m1(b,w){if(typeof w!=="number"||!Number.isFinite(w))return;let f=Math.max(0,Math.min(100,Math.round(w))),p=f>=70?"full":f>=30?"medium":"low";return`<span class="prompt-meta-item prompt-meta-battery prompt-meta-battery-${p}">${S(b)} ${a1(`battery-${p}`)}(${f}%)</span>`}function a1(b){return{"battery-full":'<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 10v4"></path><path d="M14 10v4"></path><path d="M22 14v-4"></path><path d="M6 10v4"></path><rect x="2" y="6" width="16" height="12" rx="2"></rect></svg>',"battery-medium":'<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 14v-4"></path><path d="M22 14v-4"></path><path d="M6 14v-4"></path><rect x="2" y="6" width="16" height="12" rx="2"></rect></svg>',"battery-low":'<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 14v-4"></path><path d="M6 14v-4"></path><rect x="2" y="6" width="16" height="12" rx="2"></rect></svg>',"git-branch":'<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6a9 9 0 0 0-9 9V3"></path><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle></svg>'}[b]||""}function pb(){let b=document.createElement("section");return b.className="pi-web-chat-root",b.dataset.plugin="pi-web-chat",b.innerHTML=`
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
        <button class="pi-web-chat-icon-btn" type="button" data-attach aria-label="attach files" title="attach files">${k("attach_file",x.attachFile)}</button>
        <input type="file" multiple hidden data-file-input />
        <textarea class="pi-web-chat-textarea" data-chat-input aria-label="Prompt" placeholder="ask pi to do something…" rows="1"></textarea>
        <button class="pi-web-chat-send" type="button" data-send aria-label="send" title="send" aria-disabled="true">${k("send",x.send)}</button>
      </div>
    </section>`,{root:b,transcript:l(b.querySelector("[data-chat-transcript]")),textarea:l(b.querySelector("[data-chat-input]")),sendButton:l(b.querySelector("[data-send]")),attachButton:l(b.querySelector("[data-attach]")),fileInput:l(b.querySelector("[data-file-input]")),slashPopover:l(b.querySelector("[data-slash-popover]")),slashList:l(b.querySelector("[data-slash-list]")),refsPopover:l(b.querySelector("[data-refs-popover]")),refsList:l(b.querySelector("[data-refs-list]")),attachments:l(b.querySelector("[data-attachments]"))}}function Lb(b,w){b.replaceChildren(...w.map(Tb)),b.scrollTop=b.scrollHeight}function Tb(b){let w=document.createElement("article");w.className=`pi-web-chat-message pi-web-chat-message-${b.role}`,w.dataset.messageId=b.id;let f=document.createElement("div");f.className="pi-web-chat-message-role",f.textContent=b.role;let p=document.createElement("pre");if(p.className="pi-web-chat-message-body",p.textContent=b.text,w.append(f,p),b.thinking){let L=document.createElement("details");L.className="pi-web-chat-thinking",L.open=Boolean(b.streaming);let T=document.createElement("summary");T.textContent="thinking";let $=document.createElement("pre");$.textContent=b.thinking,L.append(T,$),w.append(L)}if(b.toolCalls?.length){let L=document.createElement("div");L.className="pi-web-chat-tools";for(let T of b.toolCalls){let $=document.createElement("details");$.className=`pi-web-chat-tool pi-web-chat-tool-${T.status}`,$.open=T.status==="running";let H=document.createElement("summary");H.textContent=`${T.name} · ${T.status}`;let _=document.createElement("pre");_.textContent=T.text||J1(T),$.append(H,_),L.append($)}w.append(L)}if(b.streaming){let L=document.createElement("div");L.className="pi-web-chat-message-meta",L.textContent="streaming...",w.append(L)}if(b.attachments?.length){let L=document.createElement("div");L.className="pi-web-chat-message-meta",L.textContent=`${b.attachments.length} attachment(s)`,w.append(L)}return w}function T1(b){if(b.argsStatus==="truncated")return"arguments truncated";if(b.argsStatus==="omitted")return"arguments omitted";if(b.argsStatus==="unavailable")return"arguments unavailable";if(b.argsStatus==="empty")return"no arguments";if(!b.args)return"";return JSON.stringify(b.args)}function J1(b){if(b.argsStatus==="truncated")return"arguments truncated: too large to display";if(b.argsStatus==="omitted")return"arguments omitted: response too large";if(b.argsStatus==="unavailable")return"arguments unavailable";if(b.argsStatus==="empty")return"no arguments";if(!b.args)return"arguments unavailable";return JSON.stringify(b.args,null,2)}function $b(b,w){b.root.dataset.composerMode=w,G1(b.attachButton,w)}function o1(b,w,f){if(b.disabled=w==="steering"||w==="loading"&&!f,b.dataset.mode=w,b.setAttribute("aria-disabled",f?"false":"true"),w==="loading"){let p=f?"send steering message":"loading";b.innerHTML=S1(p),b.title=p,b.setAttribute("aria-label",p);return}if(w==="steering"){b.innerHTML=S1("steering"),b.title="steering message pending",b.setAttribute("aria-label","steering message pending");return}b.innerHTML=r.send,b.title="send",b.setAttribute("aria-label","send")}function G1(b,w){if(b.disabled=w==="shell",b.setAttribute("aria-disabled",w==="shell"?"true":"false"),w==="shell"){b.innerHTML=r.terminal,b.title="shell command mode",b.setAttribute("aria-label","shell command mode");return}if(w==="file-ref"){b.innerHTML=k("file",x.file),b.title="file reference mode",b.setAttribute("aria-label","file reference mode");return}b.innerHTML=r.attachFile,b.title="attach files",b.setAttribute("aria-label","attach files")}function q1(b,w){b.hidden=w.length===0,b.replaceChildren(...w.map((f)=>{let p=document.createElement("span");return p.className="pi-web-chat-attachment-chip",p.textContent=f,p}))}function t1(){return`
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
  `}function s1(){document.getElementById("pi-web-chat-style")?.remove();let b=document.createElement("style");return b.id="pi-web-chat-style",b.textContent=t1(),document.head.append(b),b}function $1(b){return b.command||b.cmd||(b.name?`/${b.name}`:"")}function l(b){if(!b)throw Error("pi-web-chat DOM template is invalid");return b}function Hb(b,w,f){return{threadId:b,runId:w,state:{},messages:f,tools:[],context:[]}}function _b(b){let w=[...b.messages].reverse().find((f)=>f.role==="user");return{text:w?.text||"",attachments:w?.attachments||[],sessionId:b.threadId}}function Rb(b,w,f){return b.map((p)=>zb(p,w,f))}function zb(b,w,f){if(b.type==="text.delta")return{type:"TEXT_MESSAGE_CONTENT",threadId:w,runId:f,delta:b.delta||""};if(b.type==="thinking.delta")return{type:"THINKING_MESSAGE_CONTENT",threadId:w,runId:f,delta:b.delta||""};if(b.type==="tool.start")return{type:"TOOL_CALL_START",threadId:w,runId:f,toolCallId:b.toolCallId,payload:e1(b)};if(b.type==="tool.delta")return{type:"TOOL_CALL_ARGS",threadId:w,runId:f,toolCallId:b.toolCallId,delta:b.delta||""};if(b.type==="tool.end")return{type:"TOOL_CALL_END",threadId:w,runId:f,toolCallId:b.toolCallId,payload:e1(b)};return{type:b.type.toUpperCase().replaceAll(".","_"),threadId:w,runId:f,payload:b}}function e1(b){return{name:b.toolName||"tool",args:b.args||{},result:b.result||"",isError:b.isError===!0}}var H1="pi-web-chat.sessions.v1";var h0="plugin.pi-web-sidebar.selectedSession",N0="plugin.pi-web-sidebar.event",O0="plugin.pi-web-sidebar.activeSessionId",B1="plugin.pi-web-sidebar.activeWorkspaceId",hb=12,b0=20,m=200,Nb=200,Ob=24,l1=200,jb=8,Vb=1e6,Zb=64000;var Jb=250,Gb=100,qb=6,yb=100,j0="piWebChatAssistantOnlyAnchorUsed",d=new Set,Q1=new WeakMap,Cb={"book-open":'<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',"file-plus":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="M9 15h6"/>',pencil:'<path d="M21.2 6.8 17.2 2.8a2 2 0 0 0-2.8 0L3 14.2V21h6.8L21.2 9.6a2 2 0 0 0 0-2.8z"/><path d="m14 5 5 5"/>',terminal:'<path d="m4 17 6-6-6-6"/><path d="M12 19h8"/>',cpu:'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 15h3"/><path d="M1 9h3"/><path d="M1 15h3"/>',globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 0 20"/><path d="M12 2a15.3 15.3 0 0 0 0 20"/>',search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',braces:'<path d="M8 3H7a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-4a2 2 0 0 1 2-2 2 2 0 0 1-2-2V7a2 2 0 0 0-2-2h-1"/>',"file-text":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',"circle-question-mark":'<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 1 1 5.8 1c-.5 1-1.4 1.5-2.1 2-.6.4-.8.8-.8 2"/><path d="M12 17h.01"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',plug:'<path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a6 6 0 0 1-12 0V8Z"/>',"git-branch":'<line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',"circle-check":'<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',hammer:'<path d="m15 12-8.5 8.5a2.1 2.1 0 0 1-3-3L12 9"/><path d="m17.6 5.4 1.8-1.8"/><path d="m14 7 3 3"/><path d="M5 11 2 8l6-6 3 3"/>',package:'<path d="m7.5 4.3 9 5.2"/><path d="M21 8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>'},_1=new WeakMap,Fb={read:"book-open",write:"file-plus",edit:"pencil",ctx_execute:"cpu",ctx_batch_execute:"cpu",ctx_execute_file:"cpu",ctx_search:"cpu",ctx_index:"cpu",ctx_fetch_and_index:"cpu",web_search:"globe",fetch_content:"search",get_search_content:"search",code_search:"braces",document_parse:"file-text",ask_user_question:"circle-question-mark",teams:"users",subagent:"users",mcp:"plug",git:"git-branch"};class V0{#b=[];add(b){if(b)this.#b.push(b);return b}listen(b,w,f){b.addEventListener(w,f),this.add({remove:()=>b.removeEventListener(w,f)})}dispose(){for(let b of this.#b.splice(0).reverse())if(typeof b==="function")b();else if("unsubscribe"in b)b.unsubscribe();else b.remove()}}function Xb(b={}){let w=b.app;if(w?.piWebChat?.dispose(),typeof b.mount?.chat!=="function"||typeof b.mount?.composer!=="function")throw Error("pi-web-chat requires modern pi-web mount.chat and mount.composer APIs");return Yb(b,w)}function Yb(b,w){let f=new V0,p=f.add(s1());Qb(w);let L=d1(),T=n1(),$=b.mount?.chat(L,{replace:!0}),H=b.mount?.composer(T,{replace:!0});if(Qw(f,L),$)f.add($);if(H)f.add(H);let _=g(b);u(b,_||void 0);let R=_?.sessionId?$2(_.sessionId):T2(),z={backendChatToken:0,historyPages:new Map,pendingPromptEchoIds:new Map,pendingAssistantEchoIds:new Map,completedRunIds:new Set};if(!_?.sessionId)N1(L);else X(L,w1(R).messages,R.activeSessionId),h1(b,L,R,z,_.sessionId);Jw(f,b,L,R,z),Dw(f,b,L,R,z),Ab(f,L,R,z),ib(f,b,T,L,R,z),Db(b,T),w?.classList.add(Z1());let h=()=>{if(z.runEventsAbort?.abort(),z.sessionEventsAbort?.abort(),f.dispose(),d.clear(),p.remove(),w?.classList.remove(Z1()),w?.piWebChat===N)delete w.piWebChat},N={dispose:h};if(w)w.piWebChat=N;return h}function Qb(b){if(!b)return;b.querySelectorAll(".pi-web-chat-surface, .pi-web-chat-composer").forEach((w)=>{w.remove()})}function Db(b,w){L1(w,{}),Ub(b,w)}async function Ub(b,w){try{let f=Y(b),p=f.path?{workspacePath:f.path}:{},L=await K(b,"runtimeStatus",p,f.id),T=U(L)?L:{},$=U(T.status)?Kb(T.status):void 0;if(!$)return;L1(w,$)}catch{}}function Kb(b){let w={};if(typeof b.model==="string")w.model=b.model;if(typeof b.modelProvider==="string")w.modelProvider=b.modelProvider;if(typeof b.thinkingLevel==="string")w.thinkingLevel=b.thinkingLevel;if(typeof b.fiveHourQuota==="number")w.fiveHourQuota=b.fiveHourQuota;if(typeof b.weeklyQuota==="number")w.weeklyQuota=b.weeklyQuota;if(typeof b.currentBranch==="string")w.currentBranch=b.currentBranch;if(typeof b.branch==="string")w.branch=b.branch;if(typeof b.warning==="string")w.warning=b.warning;return w}function ib(b,w,f,p,L,T){let $=f.querySelector(".prompt-textarea"),H=f.querySelector(".send-btn"),_=f.querySelector(".attach-btn"),R=f.querySelector(".stop-btn"),z=f.querySelector("[data-file-input]"),h=f.querySelector(".attach-chips"),N=f.querySelector(".shell-attachment-note");if(!$||!H)return;let V=f.querySelector(".prompt-bar"),J=f.querySelector(".slash-pop"),Z=f.querySelector(".prompt-file-ref-pop"),j={selectedAttachments:[],shellMode:!1,commands:[]},Q=()=>{lb(h,$.value,j)},i=()=>{vb(V,$,_,N,j)},y=()=>{let q=$.value,G=Wb(T),W=Boolean(T.pendingSteering),O=Boolean(T.activeRunId&&T.activeRunSessionId===L.activeSessionId),F=W?"steering":G?"loading":"idle",A=Boolean(q.trim())&&!W&&!T.resolvingSubmit&&(!G||O);if(o1(H,F,A),V)V.dataset.runState=F;if(R){let v=Boolean(T.pendingSteering&&!T.pendingSteering.sent);R.hidden=!G&&!v,R.disabled=!1,R.title=v?"cancel steering":"stop response",R.setAttribute("aria-label",v?"cancel steering":"stop response")}if(Q(),w0(j),j.shellMode){y1(J,Z);return}ub(w,f,$,q,j.commands,(v)=>{j.commands=v}),j.fileSearchTimer=setTimeout(()=>{Ib(w,f,$,$.value)},120)},I=()=>{j.shellMode=!0,y1(J,Z),i(),Q()},f1=()=>{j.shellMode=!1,i(),Q()},M=async(q)=>{q?.preventDefault(),q?.stopImmediatePropagation();let G=$.value.trim();if(y(),T.resolvingSubmit||T.pendingSteering)return;if(T.startingRunSessionId||T.fallbackSubmittingSessionId)return;if(!G){$.value="",y();return}if(T.resolvingSubmit=!0,$.value="",z)z.value="";y();try{if(j.shellMode)L0(G,[]),await Mb(w,p,L,G),f1();else{let W=[...j.selectedAttachments,...await xb(w,G)];j.selectedAttachments=[],Q(),L0(G,W);let O=nb(w,p,L,T,G,W,y);T.resolvingSubmit=!1,y(),await O}}catch(W){if(!o0(W))X(p,[Eb(W)],L.activeSessionId)}finally{T.resolvingSubmit=!1,i(),y()}};if(b.listen($,"input",()=>{if(!j.shellMode&&$.value.startsWith("! "))$.value=$.value.slice(2),I();y()}),b.listen($,"keydown",(q)=>{let G=q;if(G.key===" "&&!j.shellMode&&$.value==="!"&&$.selectionStart===1&&$.selectionEnd===1){G.preventDefault(),$.value="",I(),y();return}if(G.key==="Backspace"&&j.shellMode&&$.value===""){G.preventDefault(),f1(),y();return}if(G.key==="Escape"){y1(J,Z);return}if(G.key==="Enter"&&(G.metaKey||G.ctrlKey))M(G)}),b.listen(H,"click",(q)=>{M(q)}),R)b.listen(R,"click",(q)=>{q.preventDefault(),q.stopImmediatePropagation(),Bb(w,p,L,T).finally(y),y()});if(_&&z)b.listen(_,"click",()=>{if(!j.shellMode)z.click()}),b.listen(z,"change",()=>{Pb(z,(q)=>{j.selectedAttachments=q,Q()})});T.onRunStateChange=y,b.add({remove:()=>{if(w0(j),T.onRunStateChange===y)T.onRunStateChange=void 0}}),i(),y()}function Wb(b){return Boolean(b.activeRunId||b.startingRunSessionId||b.fallbackSubmittingSessionId||b.pendingSteering)}function Ab(b,w,f,p){b.listen(w,"click",(L)=>{let $=L.target?.closest?.("[data-action='cancel-steering']");if(!$)return;L.preventDefault(),L.stopPropagation();let H=$.dataset.sessionId||"",_=$.dataset.messageId||"";if(!Z0(f,p)&&H&&_)t(f,H,_);if(H&&f.activeSessionId===H)X(w,D(f,H).messages,H)})}async function Bb(b,w,f,p){if(p.pendingSteering&&!p.pendingSteering.sent){let H=p.pendingSteering.sessionId;if(Z0(f,p),f.activeSessionId===H)X(w,D(f,H).messages,H);return}let L=p.activeRunId,T=p.activeRunSessionId||p.startingRunSessionId||p.fallbackSubmittingSessionId||f.activeSessionId,$=p.activeRunWorkspaceId||Y(b).id;if(!L){p.runEventsAbort?.abort(),p.startingRunSessionId=void 0,p.fallbackSubmittingSessionId=void 0;return}p.runEventsAbort?.abort();try{await Y0(b,L,T,$)}catch(H){globalThis.piWeb?.subject("toast.requested").next({level:"error",message:`stop failed: ${V1(H)}`})}finally{if(p.activeRunId===L)p.activeRunId=void 0,p.activeRunSessionId=void 0,p.activeRunWorkspacePath=void 0,p.activeRunWorkspaceId=void 0}}function Z0(b,w){let f=w.pendingSteering;if(!f||f.sent)return!1;return clearTimeout(f.timeout),f.controller.abort(),w.pendingSteering=void 0,t(b,f.sessionId,f.messageId),!0}function lb(b,w,f){if(!b)return;if(f.shellMode){q1(b,[]);return}q1(b,[...f.selectedAttachments.map((p)=>p.name||"attachment"),...J0(w)])}function vb(b,w,f,p,L){if(b?.classList.toggle("shell-mode",L.shellMode),w.setAttribute("placeholder",L.shellMode?"run shell command in workspace…":"ask pi to do something…"),p)p.hidden=!(L.shellMode&&L.selectedAttachments.length>0);if(f)G1(f,L.shellMode?"shell":"normal")}function w0(b){if(b.fileSearchTimer)clearTimeout(b.fileSearchTimer),b.fileSearchTimer=void 0}function y1(b,w){b?.setAttribute("hidden",""),w?.setAttribute("hidden","")}function Eb(b){return{id:E(),role:"system",text:`prompt failed: ${V1(b)}`,createdAt:Date.now()}}async function Pb(b,w){let f=Array.from(b.files||[]).slice(0,jb),p=[];for(let L of f){if(L.size>Vb)continue;p.push({name:L.name,size:L.size,content:await L.text(),mimeType:L.type||void 0})}w(p)}async function Mb(b,w,f,p){let L=i0(b,f),T=D(f,L),$={id:E(),role:"user",text:`! ${p}`,createdAt:Date.now()},H={id:E(),role:"tool",text:`$ ${p}
(running...)`,createdAt:Date.now()};T.messages.push($,H),T.updatedAt=Date.now(),C(f),X(w,T.messages,L);try{let _=await K(b,"runShell",{command:p}),R=typeof _.exitCode==="number"?_.exitCode:1,z=typeof _.durationMs==="number"?_.durationMs:0,h=typeof _.output==="string"?_.output:"";H.text=kb(p,h,R,z,Boolean(_.truncated))}catch(_){H.text=`$ ${p}
${V1(_)}`}T.updatedAt=Date.now(),C(f),X(w,T.messages,L)}async function xb(b,w){let f=J0(w);if(!f.length)return[];let p=await K(b,"resolveContext",{text:w,refs:f});return Array.isArray(p.attachments)?p.attachments.filter(U):[]}function kb(b,w,f,p,L){let T=gb(w,Zb),$=L||T.truncated,H=T.text.endsWith(`
`)||!T.text?"":`
`;return`$ ${b}
${T.text}${H}[exit ${f} · ${p}ms${$?" · truncated":""}]`}function gb(b,w){let f=new TextEncoder,p=f.encode(b);if(p.byteLength<=w)return{text:b,truncated:!1};let L=new TextDecoder().decode(p.slice(0,w));while(L&&f.encode(L).byteLength>w)L=L.slice(0,-1);return{text:L,truncated:!0}}async function ub(b,w,f,p,L,T){let $=w.querySelector(".slash-pop"),H=w.querySelector(".slash-list"),_=dw(p);if(_===null||!H){$?.setAttribute("hidden","");return}let R=L;if(!R.length){let h=await K(b,"commands",{});R=Array.isArray(h.commands)?h.commands.filter(U):[],T(R)}if(f.value!==p)return;let z=R.filter((h)=>{return $1(h).slice(1).toLowerCase().includes(_)});cb(H,z,f,$),$?.toggleAttribute("hidden",z.length===0)}async function Ib(b,w,f,p){let L=w.querySelector(".prompt-file-ref-pop"),T=w.querySelector(".prompt-file-ref-list"),$=nw(p);if($===null||!T){L?.setAttribute("hidden","");return}try{let H=await K(b,"searchFiles",{query:$,limit:hb}),_=Array.isArray(H.files)?H.files.filter(U):[];if(f.value!==p)return;rb(T,f,_,L),L?.toggleAttribute("hidden",_.length===0)}catch{L?.setAttribute("hidden","")}}function cb(b,w,f,p){b.replaceChildren(...w.map((L)=>{let T=document.createElement("button"),$=$1(L);return T.type="button",T.className="slash-item",T.dataset.slash=$,T.innerHTML='<span class="sl-name"></span><span class="sl-desc"></span>',T.querySelector(".sl-name").textContent=$,T.querySelector(".sl-desc").textContent=L.description||"",T.addEventListener("click",()=>{f.value=L.template||`${$} `,p?.setAttribute("hidden",""),f.dispatchEvent(new(f.ownerDocument.defaultView?.Event||Event)("input",{bubbles:!0})),f.focus()}),T}))}function rb(b,w,f,p){b.replaceChildren(...f.map((L)=>{let T=L.path||L.name||"",$=document.createElement("button");return $.type="button",$.className="prompt-file-ref-item",$.dataset.path=T,$.disabled=!T,$.innerHTML='<span class="pfr-path"></span><span class="pfr-kind"></span>',$.querySelector(".pfr-path").textContent=T,$.querySelector(".pfr-kind").textContent=typeof L.size==="number"?`${L.size} bytes`:"file",$.addEventListener("click",()=>{Sb(w,T),p?.setAttribute("hidden","")}),$}))}function Sb(b,w){if(!w)return;let{value:f,selectionStart:p}=b,L=f.slice(0,p),T=/(?:^|\s)@([^\s@`]*)$/.exec(L),$=T?p-(T[1]||"").length-1:p,H=`@${w} `;b.value=`${f.slice(0,$)}${H}${f.slice(p)}`;let _=$+H.length;b.setSelectionRange(_,_),b.dispatchEvent(new(b.ownerDocument.defaultView?.Event||Event)("input",{bubbles:!0})),b.focus()}function q2(b){return{input$:b.behaviorSubject("chat.input",""),submitted$:b.subject("chat.input.submitted"),activeSessionId$:b.behaviorSubject("session.activeId",null),sidebarSelectedSession$:b.behaviorSubject(h0,mb()),toastRequested$:b.subject("toast.requested")}}function J0(b){let w=[],f=new Set,p=/(^|[\s`])@([^\s@`]+)/g,L=p.exec(String(b||""));while(L!==null){let T=L[2]||"";if((L[1]||"")!=="`"&&T&&!f.has(T))f.add(T),w.push(T);L=p.exec(String(b||""))}return w}function y2(b=[],w=[]){let f=[],p=new Set;for(let L of[...b,...w]){let T=$1(L);if(!T||p.has(T))continue;p.add(T),f.push(L)}return f}function z1(b){return b.app?.piWebSidebar?.getSnapshot?.().activeWorkspaceId||b.app?.dataset.activeWorkspaceId||""}function mb(){return g({})}function g(b){let w=b.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),f=w?.activeSessionId||"",p=w?.activeWorkspaceId||"";if(f&&b.app?.dataset.clearedSessionId!==f)return{sessionId:f,workspaceId:p||void 0};return null}function u(b,w){if(w?.workspaceId&&b.app)b.app.dataset.activeWorkspaceId=w.workspaceId,f0(B1,w.workspaceId);if(w?.sessionId)delete b.app?.dataset.clearedSessionId,b.app?.setAttribute("data-active-session-id",w.sessionId),f0(O0,w.sessionId)}function G0(b){let w=g(b);if(w?.sessionId&&b.app)b.app.dataset.clearedSessionId=w.sessionId;b.app?.removeAttribute("data-active-session-id"),db(O0),globalThis.piWeb?.behaviorSubject("session.activeId",null).next(null)}function o(b,w,f={}){let p=b.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),L={type:w,detail:f,snapshot:p};(b.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$)?.next(L),globalThis.piWeb?.subject(N0).next(L)}function v1(b,w,f){let p=b.app?.dataset.activeWorkspaceId||z1(b),L={reason:f,sessionId:w,workspaceId:p};globalThis.piWeb?.behaviorSubject("session.activeId",w).next(w),o(b,"active.start",L),o(b,"session.created",L)}function E1(b,w){globalThis.piWeb?.subject("session.changed").next({sessionId:b,name:w,title:w})}function P1(b){if(b.title!=="New chat")return"";let f=b.messages.find((p)=>p.role==="user")?.text.slice(0,48)||"";if(!f)return"";return b.title=f,f}function f0(b,w){try{localStorage.setItem(b,w)}catch{}}function db(b){try{localStorage.removeItem(b)}catch{}}async function K(b,w,f={},p=z1(b)){if(!b.backend)return{};let L=await b.backend(w,{workspaceId:p,data:f});return U(L)?L:{}}function D1(b){let w=Array.isArray(b.warnings)?b.warnings.filter((f)=>typeof f==="string"&&f.trim().length>0):[];for(let f of w)globalThis.piWeb?.subject("toast.requested").next({level:"warning",message:f})}function C2(b,w){return b.trim().startsWith("!")?[]:[...w]}async function nb(b,w,f,p,L,T,$=()=>{}){let H=i0(b,f),_=Y(b);if(p.activeRunId&&p.activeRunSessionId===H){let j=p.activeRunWorkspacePath||_.path,Q=p.activeRunWorkspaceId||_.id;await ab(b,w,f,p,L,T,j,Q,$);return}if(p.startingRunSessionId===H||p.fallbackSubmittingSessionId===H)return;p.backendChatToken+=1,p.startingRunSessionId=H,$(),p.runEventsAbort?.abort();let R=new AbortController;p.runEventsAbort=R,p.sessionEventsAbort?.abort();let z={id:E(),role:"user",text:L,attachments:r1(T),createdAt:Date.now()},h=D(f,H);A1(p.pendingPromptEchoIds,H,z.id),h.messages.push(z),h.updatedAt=Date.now(),C(f),X(w,h.messages,H);let N;try{N=await pw(b,L,T,H,_.path,_.id)}catch(j){throw p.startingRunSessionId=void 0,$(),j}if(R.signal.aborted){if(p.startingRunSessionId=void 0,typeof N.runId==="string"&&N.runId)await Y0(b,N.runId,H,_.id);t(f,H,z.id),$();return}if(D1(N),typeof N.activeSessionId==="string"&&N.activeSessionId){let j=H,Q=f.activeSessionId===j;if(H=N.activeSessionId,Q)n(f,H),u(b,{sessionId:N.activeSessionId,workspaceId:_.id||void 0}),o(b,"chat-session",{reason:"startPrompt",sessionId:N.activeSessionId}),v1(b,N.activeSessionId,"startPrompt");else D(f,H);r0(f,j,H,z.id),p2(p.pendingPromptEchoIds,j,H)}if(typeof N.runId!=="string"||!N.runId){p.startingRunSessionId=void 0,p.fallbackSubmittingSessionId=H,$();let j;try{j=await Lw(b,L,T,H,_.path,_.id)}catch(I){throw p.fallbackSubmittingSessionId=void 0,$(),I}if(R.signal.aborted){p.fallbackSubmittingSessionId=void 0,t(f,H,z.id),$();return}D1(j);let Q=typeof j.activeSessionId==="string"&&j.activeSessionId?j.activeSessionId:H,i=e(p.pendingPromptEchoIds,H),y=Zw(b,f,j,"submitPrompt",H,i);if(b1(p.pendingPromptEchoIds,Q,y,i),f.activeSessionId===H||f.activeSessionId===Q)X(w,y,f.activeSessionId);if(p.runEventsAbort===R)p.runEventsAbort=void 0;p.startingRunSessionId=void 0,p.fallbackSubmittingSessionId=void 0,$();return}let V=D(f,H);p.activeRunId=N.runId,p.activeRunSessionId=H,p.activeRunWorkspacePath=_.path,p.activeRunWorkspaceId=_.id,p.startingRunSessionId=void 0,$();let J=P1(V);if(J)C(f),E1(H,J);let Z=$w(V);A1(p.pendingAssistantEchoIds,H,Z.id);try{await sb(b,f,V,N.runId,_.path,_.id,Z,()=>{if(!R.signal.aborted&&f.activeSessionId===H)X(w,V.messages,H)},R.signal)}finally{if(Nw(p,N.runId),p.activeRunId===N.runId)p.activeRunId=void 0,p.activeRunSessionId=void 0,p.activeRunWorkspacePath=void 0,p.activeRunWorkspaceId=void 0,p.startingRunSessionId=void 0,p.fallbackSubmittingSessionId=void 0,$();if(p.runEventsAbort===R)p.runEventsAbort=void 0}if(!R.signal.aborted&&f.activeSessionId===H)h1(b,w,f,p,H,_.path,_.id)}async function ab(b,w,f,p,L,T,$,H,_=()=>{}){let{activeRunId:R,activeRunSessionId:z}=p;if(!R||!z)throw Error("active run is unavailable for steering");if(p.pendingSteering)return;let h={id:E(),role:"user",text:L,attachments:r1(T),createdAt:Date.now(),meta:{piWebChatSteeringState:"pending"}},N=D(f,z),V=new AbortController,J=ob(V.signal,()=>{let Z=p.pendingSteering;if(Z){if(Z.sent=!0,tb(f,Z.sessionId,Z.messageId),f.activeSessionId===Z.sessionId)X(w,D(f,Z.sessionId).messages,Z.sessionId);_()}});if(p.pendingSteering={sessionId:z,messageId:h.id,timeout:J.timeout,controller:V,sent:!1},A1(p.pendingPromptEchoIds,z,h.id),N.messages.push(h),N.updatedAt=Date.now(),C(f),f.activeSessionId===z)X(w,N.messages,z);_();try{if(await J.promise,V.signal.aborted)return;let Z=await Tw(b,R,L,T,z,$,H);D1(Z)}catch(Z){if(o0(Z))return;if(t(f,z,h.id),f2(p.pendingPromptEchoIds,z,h.id),X0(Z)){X(w,N.messages,z),globalThis.piWeb?.subject("toast.requested").next({level:"error",message:"This backend does not support steering while a response is streaming."});return}throw Z}finally{if(p.pendingSteering?.controller===V)p.pendingSteering=void 0,_()}}function ob(b,w){let f,p=new Promise((L,T)=>{f=setTimeout(()=>{w(),L()},yb),b.addEventListener("abort",()=>{clearTimeout(f),T(new DOMException("Steering cancelled","AbortError"))},{once:!0})});return{timeout:f,promise:p}}function t(b,w,f){let p=b.sessions.find((L)=>L.id===w);if(!p)return;p.messages=p.messages.filter((L)=>L.id!==f),S0(b,p.id),C(b)}function tb(b,w,f){let p=D(b,w).messages.find((L)=>L.id===f);if(!p?.meta)return;if(delete p.meta.piWebChatSteeringState,Object.keys(p.meta).length===0)delete p.meta;C(b)}async function sb(b,w,f,p,L,T,$,H,_){let R=await y0(b,"streamEventsSse",{runId:p,cursor:0,workspacePath:L},_,T);if(!R)throw Error("SSE streaming backend did not return a stream");let z=q0(H),h=eb(w,Gb);$.streaming=!0,z.flush();try{await C0(R,(N)=>{Hw($,[N]),$.streaming=N.type!=="run.end",f.updatedAt=Date.now(),h.request(),z.request()})}finally{$.streaming=!1,h.flush(),z.flush()}}function eb(b,w){let f=0,p,L=()=>{if(p)clearTimeout(p),p=void 0},T=()=>{L(),f=Date.now(),C(b)};return{request:()=>{let H=w-(Date.now()-f);if(H<=0){T();return}p||=setTimeout(T,H)},flush:T}}function q0(b){let w=0,f,p=()=>{if(f)clearTimeout(f),f=void 0},L=()=>{p(),w=Date.now(),b()};return{request:()=>{let $=Jb-(Date.now()-w);if($<=0){L();return}f||=setTimeout(L,$)},flush:L,cancel:p}}async function y0(b,w,f={},p,L=z1(b)){if(!b.backendStream)throw Error("SSE streaming backend is unavailable");let T=await b.backendStream(w,{workspaceId:L,data:f},{signal:p});return bw(T)}function bw(b){if(typeof ReadableStream<"u"&&b instanceof ReadableStream)return b;if(typeof Response<"u"&&b instanceof Response)return b.body;if(typeof b==="string")return p0(b);if(!U(b))return null;let w=b.body;if(typeof ReadableStream<"u"&&w instanceof ReadableStream)return w;let f=b.sse;if(typeof f==="string")return p0(f);return null}function p0(b){let w=new TextEncoder().encode(b);return new ReadableStream({start(f){f.enqueue(w),f.close()}})}async function C0(b,w){let f=b.getReader(),p=new TextDecoder,L="";while(!0){let T=await f.read();if(T.done){L+=p.decode(),fw(L,w);return}L+=p.decode(T.value,{stream:!0});let $=ww(L);L=$.remainder;for(let H of $.frames)F0(H,w)}}function ww(b){let f=b.replaceAll(`\r
`,`
`).replaceAll("\r",`
`).split(`

`),p=f.pop()||"";return{frames:f,remainder:p}}function fw(b,w){let f=b.trim();if(f)F0(f,w)}function F0(b,w){let f=b.split(`
`).filter((p)=>p.startsWith("data:")).map((p)=>p.slice(5).trimStart()).join(`
`);if(!f)return;try{let p=JSON.parse(f);if(zw(p))w(p)}catch{}}function L0(b,w){globalThis.piWeb?.subject("chat.input.submitted").next({text:b,attachments:r1(w)||[]})}async function pw(b,w,f,p,L=Y(b).path,T=Y(b).id){try{return await K(b,"startPrompt",M1(w,f,p,L),T)}catch($){if(X0($))return{};throw $}}function X0(b){return/unknown method: (startPrompt|streamEventsSse|steerPrompt)|unsupported method: (startPrompt|streamEventsSse|steerPrompt)|(startPrompt|streamEventsSse|steerPrompt) unsupported/i.test(V1(b))}async function Lw(b,w,f,p="",L=Y(b).path,T=Y(b).id){return await K(b,"submitPrompt",M1(w,f,p,L),T)}async function Tw(b,w,f,p,L="",T=Y(b).path,$=Y(b).id){let H={...M1(f,p,L,T),runId:w};return K(b,"steerPrompt",H,$)}async function Y0(b,w,f="",p=Y(b).id){return K(b,"abortPrompt",{runId:w,sessionId:f},p)}function M1(b,w,f,p){let L={text:b,attachments:w,sessionId:f};if(p)L.workspacePath=p;return L}function $w(b){let w=[...b.messages].reverse().find((p)=>p.role==="assistant"&&p.streaming);if(w)return w;let f={id:E(),role:"assistant",text:"",createdAt:Date.now(),streaming:!0};return b.messages.push(f),f}function Hw(b,w){for(let f of w)if(f.type==="text.delta"&&typeof f.delta==="string")C1(b,"text",f.delta),b.text+=f.delta;else if(f.type==="thinking.delta"&&typeof f.delta==="string")C1(b,"thinking",f.delta),b.thinking=`${b.thinking||""}${f.delta}`;else if(f.type==="tool.start")F1(b,f,"running");else if(f.type==="tool.delta"&&typeof f.delta==="string"){let p=F1(b,f,"running");p.text=f.delta}else if(f.type==="tool.end"){let p=F1(b,f,f.isError?"err":"ok");if(typeof f.result==="string"&&f.result)p.text=f.result}else if(f.type==="error"&&typeof f.message==="string")C1(b,"text",`${b.text?`
`:""}${f.message}`),b.text+=`${b.text?`
`:""}${f.message}`}function C1(b,w,f){b.blocks||=[];let p=b.blocks[b.blocks.length-1];if(p?.type===w){p.text+=f;return}if(b.blocks.length<l1)b.blocks.push({id:E(),type:w,text:f})}function F1(b,w,f){let p=w.toolCallId||w.toolName||"tool";b.toolCalls||=[];let L=b.toolCalls.find((T)=>T.id===p);if(!L)L={id:p,name:w.toolName||"tool",args:w.args,text:"",status:f},b.toolCalls.push(L),_w(b,L);if(L.status=f,Rw(L,w))L.args=w.args,L.argsStatus=w.argsStatus;return L}function _w(b,w){if(b.blocks||=[],b.blocks.some((f)=>f.type==="tool"&&f.toolCall?.id===w.id))return;if(b.blocks.length<l1)b.blocks.push({id:E(),type:"tool",text:"",toolCall:w})}function Rw(b,w){if(!w.argsStatus)return Boolean(w.args);if(w.argsStatus==="unavailable")return!b.argsStatus;return!0}function zw(b){return U(b)&&typeof b.type==="string"}async function h1(b,w,f,p,L="",T=g1(b),$=Y(b).id){if(!b.backendStream){await T0(b,w,f,p,L,T);return}let H=++p.backendChatToken;p.sessionEventsAbort?.abort();let _=new AbortController;p.sessionEventsAbort=_;let R=q0(()=>{X(w,w1(f).messages,f.activeSessionId)});try{let z=await y0(b,"sessionEventsSse",x1(b,L,T),_.signal,$);if(!z)throw Error("session SSE backend did not return a stream");await C0(z,(h)=>{if(H!==p.backendChatToken||h.type!=="chat.state")return;let N=hw(h),V=typeof N.activeSessionId==="string"?N.activeSessionId:L,J=e(p.pendingPromptEchoIds,V),Z=e(p.pendingAssistantEchoIds,V),j=U0(b,f,N,"chatState",J,Z,{allowAssistantOnlyTailEcho:I0(p,N,V),preserveOnlyEchoMessages:!0});if(k1(p,N,V),Q0(p,N,V,T,$),j.changed)b1(p.pendingPromptEchoIds,V,j.messages,J),b1(p.pendingAssistantEchoIds,V,j.messages,Z);if(j.messages.length||Array.isArray(N.messages))R.request()})}catch(z){if(!_.signal.aborted)await T0(b,w,f,p,L,T)}finally{if(R.flush(),p.sessionEventsAbort===_)p.sessionEventsAbort=void 0}}async function T0(b,w,f,p,L="",T=g1(b)){let $=++p.backendChatToken;try{let H=await K(b,"chatState",x1(b,L,T));if($!==p.backendChatToken)return;let _=typeof H.activeSessionId==="string"?H.activeSessionId:L,R=e(p.pendingPromptEchoIds,_),z=e(p.pendingAssistantEchoIds,_),h=U0(b,f,H,"chatState",R,z,{allowAssistantOnlyTailEcho:I0(p,H,_),preserveOnlyEchoMessages:!0});if(k1(p,H,_),Q0(p,H,_,T,Y(b).id),h.changed)b1(p.pendingPromptEchoIds,_,h.messages,R),b1(p.pendingAssistantEchoIds,_,h.messages,z);if(h.messages.length||Array.isArray(H.messages))X(w,h.messages,f.activeSessionId)}catch{}}function x1(b,w,f=g1(b)){let p=w?{sessionId:w}:{};if(f)p.workspacePath=f;return p}function hw(b){return{activeSessionId:b.activeSessionId,messages:b.messages,runId:b.runId,isStreaming:b.isStreaming,hasMoreBefore:b.hasMoreBefore,oldestMessageId:b.oldestMessageId}}function k1(b,w,f){let p=typeof w.activeSessionId==="string"&&w.activeSessionId?w.activeSessionId:f;if(!p||!Array.isArray(w.messages))return;let L=b.historyPages.get(p),T=typeof w.oldestMessageId==="string"&&w.oldestMessageId?w.oldestMessageId:w.messages[0]?.id||L?.oldestMessageId;b.historyPages.set(p,{hasMoreBefore:w.hasMoreBefore===!0,oldestMessageId:T,loading:L?.loading===!0})}function Q0(b,w,f,p,L){if(w.isStreaming===!0&&typeof w.runId==="string"&&w.runId&&!b.completedRunIds.has(w.runId)){b.activeRunId=w.runId,b.activeRunSessionId=typeof w.activeSessionId==="string"&&w.activeSessionId?w.activeSessionId:f,b.activeRunWorkspacePath=p,b.activeRunWorkspaceId=L,b.onRunStateChange?.();return}if(w.isStreaming===!1&&(!w.activeSessionId||w.activeSessionId===b.activeRunSessionId))b.activeRunId=void 0,b.activeRunSessionId=void 0,b.activeRunWorkspacePath=void 0,b.activeRunWorkspaceId=void 0,b.onRunStateChange?.()}function Nw(b,w){if(b.completedRunIds.add(w),b.completedRunIds.size<=50)return;let f=b.completedRunIds.values().next().value;if(typeof f==="string")b.completedRunIds.delete(f)}function g1(b){return Y(b).path}function Y(b){let w=b.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),f=w?.activeWorkspaceId||b.app?.dataset.activeWorkspaceId||"",p=w?.workspaces?.find((L)=>L.id===f)?.path||"";return{id:f,path:p}}function D0(b,w){let f=b.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),p=w.workspaceId||f?.activeWorkspaceId||b.app?.dataset.activeWorkspaceId||"",L=f?.workspaces?.find((T)=>T.id===p)?.path||"";if(L||p!==f?.activeWorkspaceId)return{id:p,path:L};return Y(b)}function U0(b,w,f,p,L="",T="",$={}){let H=Array.isArray(f.messages),_=j1(f.messages);if(typeof f.activeSessionId==="string"&&f.activeSessionId){let V=w.activeSessionId;if(n(w,f.activeSessionId),u(b,{sessionId:f.activeSessionId,workspaceId:b.app?.dataset.activeWorkspaceId||z1(b)||void 0}),p!=="chatState"||V!==f.activeSessionId)o(b,"chat-session",{reason:p,sessionId:f.activeSessionId});if(p!=="chatState")v1(b,f.activeSessionId,p)}if(!H)return{messages:[],changed:!1};let R=w1(w),z=c0(R.messages,_,L,T,$),h=$.preserveOnlyEchoMessages===!0?Ow(R.messages,jw(z)):z.slice(-m);if(!K0(R.messages,h))return{messages:R.messages,changed:!1};R.messages=h;let N=P1(R);if(R.updatedAt=Date.now(),R.messages.some(P))Vw(w);else C(w);if(N)E1(R.id,N);return{messages:R.messages,changed:!0}}function Ow(b,w){let f=new Set(w.map((L)=>L.id)),p=b.filter((L)=>{return P(L)&&!f.has(L.id)});return p.length?[...p,...w]:w}function jw(b){let w=b.filter((p)=>{return!P(p)}),f=new Set(w.slice(-m).map((p)=>p.id));return b.filter((p)=>{return P(p)||f.has(p.id)})}function Vw(b){let w={activeSessionId:b.activeSessionId,sessions:b.sessions.map((f)=>({...f,messages:f.messages.filter((p)=>{return!P(p)})}))};C(w)}function K0(b,w){if(b.length!==w.length)return!0;return b.some((f,p)=>U1(f)!==U1(w[p]))}function U1(b){return JSON.stringify({id:b.id,role:b.role,text:b.text,blocks:b.blocks,thinking:b.thinking,streaming:b.streaming,toolCalls:b.toolCalls,attachments:b.attachments,meta:b.meta})}function Zw(b,w,f,p,L,T=""){let $=j1(f.messages),H=typeof f.activeSessionId==="string"&&f.activeSessionId?f.activeSessionId:L,_=w.activeSessionId===L;if(H!==L)if(_)n(w,H),u(b,{sessionId:H,workspaceId:Y(b).id||void 0}),o(b,"chat-session",{reason:p,sessionId:H}),v1(b,H,p);else D(w,H);let R=Array.isArray(T)?T:[T].filter(Boolean);if(H!==L)for(let V of R)r0(w,L,H,V);let z=D(w,H);if(!$.length)return[];let h=c0(z.messages,$,T).slice(-m);if(!K0(z.messages,h))return[];z.messages=h;let N=P1(z);if(z.updatedAt=Date.now(),C(w),N)E1(z.id,N);return z.messages}function Jw(b,w,f,p,L){let T=(R,z)=>{if(!R?.sessionId){if(!z)$0(w,f,p,L,!0);return}if(W0(w,p,R))return;u(w,R),n(p,R.sessionId),X(f,w1(p).messages,p.activeSessionId);let h=D0(w,R);h1(w,f,p,L,R.sessionId,h.path,h.id)},$=(R)=>{if(Gw(w,f,p,L,R))return;let z=yw(w,R);if(z)T(z,!1)},H=w.app?.piWebSidebar?.channels?.selectedSession$||globalThis.piWebSidebar?.channels?.selectedSession$,_=w.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$;if(H){let R=!0;b.add(H.subscribe((z)=>{T(z,R),R=!1}))}if(_)b.add(_.subscribe($));if(w.app)b.listen(w.app,"pi-web-sidebar:session-created",(R)=>{let z=R.detail||{},h=typeof z.sessionId==="string"?z.sessionId:"",N=typeof z.workspaceId==="string"?z.workspaceId:"";if(h)T({sessionId:h,workspaceId:N||void 0},!1)});if(globalThis.piWeb){let R=!0;b.add(globalThis.piWeb.behaviorSubject(h0,g(w)).subscribe((h)=>{T(h,R),R=!1})),b.add(globalThis.piWeb.subject(N0).subscribe($));let z=!0;b.add(globalThis.piWeb.behaviorSubject("session.activeId",null).subscribe((h)=>{if(!h){if(!z)$0(w,f,p,L,!1);z=!1;return}z=!1,T({sessionId:h,workspaceId:w.app?.dataset.activeWorkspaceId||m0(B1)||void 0},!1)}))}}function $0(b,w,f,p,L){if(p.backendChatToken+=1,p.runEventsAbort?.abort(),p.sessionEventsAbort?.abort(),f.activeSessionId="",C(f),L)G0(b);else{let T=g(b);if(T?.sessionId&&b.app)b.app.dataset.clearedSessionId=T.sessionId}N1(w)}function i0(b,w){let f=g(b);if(f?.sessionId&&!W0(b,w,f))u(b,f),n(w,f.sessionId);if(!w.activeSessionId)return D(w,"",!0).id;return w.activeSessionId}function W0(b,w,f){let p=f.workspaceId||"",L=b.app?.dataset.activeWorkspaceId||m0(B1)||"";return w.activeSessionId===f.sessionId&&(!p||p===L)}function Gw(b,w,f,p,L){if(L.type!=="session.deleted")return!1;let T=A0(L);if(!T)return!0;let $=f.activeSessionId===T,H=f.sessions.length;if(f.sessions=f.sessions.filter((_)=>_.id!==T),$){p.runEventsAbort?.abort(),p.sessionEventsAbort?.abort();let _=qw(b,L,T);if(_?.sessionId){u(b,_),n(f,_.sessionId),Fw(w,w1(f).messages,f.activeSessionId);let R=D0(b,_);return h1(b,w,f,p,_.sessionId,R.path,R.id),!0}return f.activeSessionId="",G0(b),C(f),N1(w),!0}if(f.sessions.length!==H)C(f);return!0}function qw(b,w,f){let p=w.snapshot?.activeSessionId||"",L=w.snapshot?.activeWorkspaceId||"";if(p&&p!==f)return{sessionId:p,workspaceId:L||void 0};let T=g(b);if(T?.sessionId&&T.sessionId!==f)return T;return null}function yw(b,w){if(!Cw(w.type))return null;let f=w.detail||{},p=A0(w)||w.snapshot?.activeSessionId||"",L=typeof f.workspaceId==="string"?f.workspaceId:w.snapshot?.activeWorkspaceId||b.app?.dataset.activeWorkspaceId||"";if(!p)return null;return{sessionId:p,workspaceId:L||void 0}}function A0(b){let w=b.detail||{};if(typeof w.sessionId==="string")return w.sessionId;if(typeof w.id==="string")return w.id;return""}function Cw(b){return b==="session.selected"||b==="session.created"||b==="new-session"||b==="active.start"}function n(b,w){let f=b.sessions.find((p)=>p.id===w);if(!f)f=O1(w),b.sessions.unshift(f);return b.activeSessionId=f.id,C(b),f}function X(b,w,f){if(M0(w,f),!w.length){N1(b);return}let p=b.querySelector(".term-inner")||b;B0(p,w,f,{preserveHistoryPageNodes:!0}),u1(b)}function Fw(b,w,f){M0(w,f);let p=b.querySelector(".term-inner")||b;B0(p,w,f,{preserveHistoryPageNodes:!1}),u1(b)}function B0(b,w,f,p={}){let L=Yw(b),T=w.map((_)=>{let R=`${f}:${U1(_)}`,z=L.get(_.id);if(z){if(Q1.get(z)!==R)Xw(z,_,f,R);return z}let h=v0(_,f);return Q1.set(h,R),h}),$=new Set(T),H=b.firstChild;for(let _ of T){if(H!==_)b.insertBefore(_,H);H=_.nextSibling}for(let _ of Array.from(b.children)){if(K1(b,_)&&!$.has(_)){if(p.preserveHistoryPageNodes===!0&&_.dataset.sessionId===f&&_.dataset.historyPage==="true")continue;_.remove();continue}if(!K1(b,_))_.remove()}}function Xw(b,w,f,p){let L=v0(w,f);if(b.replaceChildren(...Array.from(L.childNodes)),b.className=L.className,b.dataset.messageId=w.id,w.streaming)b.dataset.streaming="true";else delete b.dataset.streaming;Q1.set(b,p)}function Yw(b){let w=new Map;for(let f of Array.from(b.children)){if(!K1(b,f))continue;let p=f.dataset.messageId||"";if(p)w.set(p,f)}return w}function K1(b,w){let f=b.ownerDocument.defaultView;return Boolean(f&&w instanceof f.HTMLElement&&w.classList.contains("transcript-item"))}function N1(b){let w=b.querySelector(".term-inner")||b,f=document.createElement("article");f.className="pi-web-chat-docs",f.setAttribute("aria-label","pi-web-chat guide");let p=document.createElement("h1");p.textContent="pi-web-chat guide";let L=document.createElement("p");L.textContent=["Select or create a session in the sidebar to load chat history,","or type below to start a new session."].join(" ");let T=document.createElement("ul");for(let $ of["Ask pi in the prompt box and press Cmd/Ctrl+Enter to send.","Type ! then Space at the start to turn the prompt yellow and run shell commands in the workspace.","Queued file attachments hide during shell mode and reappear for the next normal prompt.","Type @ to list project files, then pick one to tag it as prompt context.","Type / at the start to open the slash command list.","Chats are cached locally after you start or select a session.","When older messages exist, scroll to the top of the transcript to load previous history."]){let H=document.createElement("li");H.textContent=$,T.append(H)}f.append(p,L,T),w.replaceChildren(f),u1(b)}function Qw(b,w){let f=w.querySelector(".term"),p=w.querySelector("[data-action='scroll-bottom']");if(!f||!p)return;let L={term:f,button:p,pinned:!0,touchStartY:null};_1.set(w,L),p.hidden=!1,R1(L),b.listen(p,"click",()=>{L.pinned=!0,l0(L),R1(L)}),b.listen(f,"wheel",(T)=>{if(T.deltaY<0)i1(L)}),b.listen(f,"touchstart",(T)=>{let $=T;L.touchStartY=$.touches.item(0)?.clientY??null}),b.listen(f,"touchmove",(T)=>{let H=T.touches.item(0)?.clientY;if(typeof H==="number"&&L.touchStartY!==null&&H-L.touchStartY>8)i1(L)}),b.listen(f,"touchend",()=>{L.touchStartY=null}),b.add({remove:()=>{_1.delete(w)}})}function Dw(b,w,f,p,L){let T=_1.get(f);if(!T)return;b.listen(T.term,"scroll",()=>{if(T.term.scrollTop>Ob)return;Uw(w,f,p,L,T)})}async function Uw(b,w,f,p,L){let T=f.activeSessionId,$=p.historyPages.get(T);if(!T||!$?.hasMoreBefore||!$.oldestMessageId||$.loading)return;$.loading=!0;let H=L.term.scrollHeight,_=L.term.scrollTop;i1(L),L.term.setAttribute("aria-busy","true");try{let R=Y(b),z=await K(b,"chatState",{...x1(b,T,R.path),beforeMessageId:$.oldestMessageId,limit:Nb},R.id);if((typeof z.activeSessionId==="string"&&z.activeSessionId?z.activeSessionId:T)!==f.activeSessionId)return;let N=Kw(j1(z.messages),T),V=D(f,T),J=new Set(V.messages.map((j)=>j.id)),Z=N.filter((j)=>!J.has(j.id));if(Z.length)V.messages=[...Z,...V.messages],V.updatedAt=Date.now(),X(w,V.messages,T),L.term.scrollTop=_+Math.max(0,L.term.scrollHeight-H);k1(p,z,T)}catch{}finally{let R=p.historyPages.get(T);if(R)R.loading=!1;L.term.setAttribute("aria-busy","false")}}function Kw(b,w){return b.map((f)=>{return{...f,meta:{...f.meta||{},piWebChatHistoryPage:!0}}})}function P(b){return b.meta?.piWebChatHistoryPage===!0}function u1(b){let w=_1.get(b);if(!w)return;if(w.pinned)l0(w);R1(w)}function l0(b){b.term.scrollTop=b.term.scrollHeight}function i1(b){b.pinned=!1,R1(b)}function R1(b){b.button.dataset.pinned=b.pinned?"true":"false",b.button.setAttribute("aria-pressed",b.pinned?"true":"false")}function v0(b,w){let f=document.createElement("article");if(f.className="transcript-item",f.dataset.messageId=b.id,f.dataset.sessionId=w,E0(b))iw(f,b,w);else if(Ww(b)){let p=Aw(b);if(p)I1(f,b.role,b.text);vw(f,b,w,p)}else Ew(f,b,w);if(P(b))f.dataset.historyPage="true";if(b.streaming)f.dataset.streaming="true";return f}function E0(b){return b.role==="user"&&b.meta?.piWebChatSteeringState==="pending"}function iw(b,w,f){let p=document.createElement("div");p.className="msg pending-steering",p.dataset.kind="user";let L=document.createElement("span");L.className="prefix user",L.textContent=u0("user");let T=document.createElement("small");T.className="body user pending-steering-text",T.textContent=w.text;let $=document.createElement("button");$.type="button",$.className="pending-steering-cancel",$.dataset.action="cancel-steering",$.dataset.sessionId=f,$.dataset.messageId=w.id,$.setAttribute("aria-label","cancel steering"),$.title="cancel steering",$.textContent="×",p.append(L,T,$),b.append(p)}function Ww(b){return Boolean(b.blocks?.some((w)=>{return w.type==="tool"||w.text.trim().length>0}))}function Aw(b){return Boolean(b.text.trim())&&(!Bw(b)||lw(b))}function Bw(b){return Boolean(b.blocks?.some((w)=>{return w.type==="text"&&w.text.trim().length>0}))}function lw(b){return(b.blocks?.length||0)>=l1}function vw(b,w,f,p=!1){for(let L of w.blocks||[])if(L.type==="text"){if(!p)I1(b,w.role,L.text)}else if(L.type==="thinking")b.append(P0(L.text,Boolean(w.streaming)));else if(L.type==="tool"&&L.toolCall){let T=w.toolCalls?.find(($)=>$.id===L.toolCall?.id)||L.toolCall;b.append(x0(T,c1(f,w,T)))}}function Ew(b,w,f){if(Pw(w))I1(b,w.role,w.text);if(w.thinking)b.append(P0(w.thinking,Boolean(w.streaming)));for(let p of w.toolCalls||[])b.append(x0(p,c1(f,w,p)))}function I1(b,w,f){if(w==="assistant"&&!f.trim())return;let p=document.createElement("div");p.className="msg",p.dataset.kind=X1(w);let L=document.createElement("span");L.className=`prefix ${X1(w)}`,L.textContent=u0(w);let T=document.createElement("pre");T.className=`body ${X1(w)}`,T.textContent=f,p.append(L,T),b.append(p)}function Pw(b){let w=b.text.trim().length>0;return b.role!=="assistant"||w}function P0(b,w){let f=document.createElement("details");f.className="msg-detail think thinking-block",f.open=w;let p=document.createElement("summary");p.className="label",p.textContent="THINKING";let L=document.createElement("pre");return L.className="body",L.textContent=b,f.append(p,L),f}function M0(b,w){let f=new Set;for(let p of b)for(let L of p.toolCalls||[])f.add(c1(w,p,L));for(let p of d)if(!f.has(p))d.delete(p)}function c1(b,w,f){return`${b}:${w.id}:${f.id}`}function x0(b,w){let f=document.createElement("div");f.className="tool-card",f.dataset.tool=b.name||"tool",f.dataset.status=b.status;let p=!d.has(w);f.dataset.collapsed=p?"true":"false";let L=document.createElement("button");if(L.type="button",L.className="tc-head",L.title=p?"Show tool output":"Hide tool output",L.setAttribute("aria-expanded",p?"false":"true"),L.setAttribute("aria-label",k0(b,p)),L.append(gw(b),uw(b),Iw(b),cw(b,p)),!p)f.append(g0(b));return L.addEventListener("click",()=>kw(f,L,b,w)),f.prepend(L),f}function k0(b,w){let f=w?"Show":"Hide",p=b.status==="running"?"running":b.status==="err"?"failed":"done",L=Mw(b),T=L?`, ${L}`:"";return`${f} ${b.name||"tool"} output, ${p}${T}`}function Mw(b){if(b.argsStatus==="present")return"arguments present";if(b.argsStatus)return T1(b);return b.args?"arguments present":""}function g0(b){let w=document.createElement("pre");return w.className="tc-body",w.textContent=b.text||J1(b),w}function xw(){let b=document.createElement("span");b.className="spinner",b.setAttribute("aria-hidden","true");for(let w=0;w<qb;w+=1)b.append(document.createElement("span"));return b}function kw(b,w,f,p){let L=b.querySelector(".tc-body"),T=L!==null;if(L)L.remove(),d.delete(p);else b.append(g0(f)),d.add(p);b.dataset.collapsed=T?"true":"false",w.setAttribute("aria-expanded",T?"false":"true"),w.setAttribute("aria-label",k0(f,T)),w.title=T?"Show tool output":"Hide tool output";let $=w.querySelector(".tc-toggle-label");if($)$.textContent=T?"show":"hide"}function gw(b){let w=document.createElement("span");w.className="tc-glyph";let f=rw(b),p=f?Cb[f]:"";if(!f||!p)return w.textContent="●",w;return w.innerHTML=`<svg class="tc-icon" data-tool-icon="${f}" aria-hidden="true" viewBox="0 0 24 24">${p}</svg>`,w}function uw(b){let w=document.createElement("span");return w.className="tc-name",w.textContent=b.name||"tool",w}function Iw(b){let w=document.createElement("span");return w.className="tc-args",w.textContent=T1(b),w}function cw(b,w){let f=document.createElement("span");if(f.className="tc-meta",b.status==="running"){let T=xw(),$=document.createElement("span");return $.className="running",$.textContent="running",f.append(T,$,H0(w)),f}let p=document.createElement("span");p.className=b.status==="err"?"err":"ok",p.textContent=b.status==="err"?"✗":"✓";let L=document.createElement("span");return L.textContent=b.status==="err"?" · failed":" · done",f.append(p,L,H0(w)),f}function H0(b){let w=document.createElement("span");w.className="tc-toggle";let f=document.createElement("span");f.className="tc-toggle-label",f.textContent=b?"show":"hide";let p=document.createElement("span");return p.className="tc-caret",p.textContent="▸",w.append(f,p),w}function rw(b){let w=Sw(b.name);if(["bash","shell","sh","zsh","terminal"].includes(w))return mw(T1(b).toLowerCase())||"terminal";return Fb[w]}function Sw(b){return b.trim().replace(/^functions\./,"").replace(/^multi_tool_use\./,"")}function mw(b){if(/\bgit\b|\bgh\b/.test(b))return"git-branch";if(/\b(go test|bun test|npm test|pnpm test|yarn test|vitest|pytest|cargo test)\b/.test(b))return"circle-check";if(/\b(bun|npm|pnpm|yarn)\s+(run\s+)?build\b|\b(go build|cargo build)\b/.test(b))return"hammer";if(/\b(bun|npm|pnpm|yarn)\s+(add|install|i)\b|\bpip\s+install\b|\bgo\s+get\b/.test(b))return"package";return}function u0(b){if(b==="assistant")return"pi >";if(b==="user")return"you >";if(b==="system")return"sys >";return"tool >"}function X1(b){if(b==="assistant")return"pi";if(b==="system")return"sys";return b}function dw(b){let w=/^\/([^\s/]*)$/.exec(b);return w?w[1].toLowerCase():null}function nw(b){let w=/(?:^|\s)@([^\s@`]*)$/.exec(b);return w?w[1]:null}function F2(b){return b.length>0}function X2(b,w){return b.trim().startsWith("!")&&w}function I0(b,w,f){return Boolean(typeof w.runId==="string"&&w.runId&&f)}function c0(b,w,f="",p="",L={}){let T=_0(f),$=b.filter(s).map((O)=>O.id),H=[...T,...$],_=_0(p),R=new Set([...H,..._]),z=new Set(w.map((O)=>O.id)),h=L.preserveOnlyEchoMessages===!0,N=L.allowAssistantOnlyTailEcho===!0,V=h?b.filter((O)=>{return z.has(O.id)||R.has(O.id)||s(O)||E0(O)||P(O)}):b,J=new Map,Z=new Map,j=new Map,Q=new Map,i=w.some((O)=>O.role==="user"),y=sw(V,w),I=w.length,f1=-V.length;for(let O of V){if(J.set(O.id,O),P(O)&&!z.has(O.id)){Z.set(O.id,f1++);continue}Z.set(O.id,I++)}let M=new Set,q=new Set,G=new Set;w.forEach((O,F)=>{let A=ow(V,O,H,M);if(A){M.add(A.id),Q.set(O.id,A.id);let B=W1(V,A.id,_,q);if(B)j.set(O.id,B);Y1(J,Z,A.id,O,F);return}let v=tw(V,w,O,F,_,q,j);if(v){let B=w[F-1],c=B?Q.get(B.id):void 0;if(q.add(v),c)G.add(c);Y1(J,Z,v,O,F);return}let p1=b2(V,O,H);if(p1&&N){G.add(p1.id);let B=(Z.get(p1.id)??F)+(F+1)/1000;R0(J,p1),Z.set(O.id,B),J.set(O.id,{...J.get(O.id),...O});return}let t0=ew(O,F,i,y,M,G,N),s0=!i||M.size===0&&G.size===0,a=w2(V,O,H,G,t0,s0);if(a){G.add(a.id);let B=(Z.get(a.id)??F)+(F+1)/1000;R0(J,a);let c=W1(V,a.id,_,q);if(c){q.add(c),Y1(J,Z,c,O,B);return}Z.set(O.id,B),J.set(O.id,{...J.get(O.id),...O});return}Z.set(O.id,F),J.set(O.id,{...J.get(O.id),...O})});let W=[...J.values()].sort((O,F)=>{let A=(Z.get(O.id)??0)-(Z.get(F.id)??0);if(A!==0)return A;return O.createdAt-F.createdAt});return aw(W)}function aw(b){let w=new Set;return b.filter((f)=>{if(f.role!=="user"||!s(f))return!0;let p=b.find((L)=>{return L.role==="user"&&!s(L)&&!w.has(L.id)&&L.text.trim()===f.text.trim()&&L.createdAt>=f.createdAt});if(!p)return!0;return w.add(p.id),!1})}function _0(b){return Array.isArray(b)?b:[b].filter(Boolean)}function Y1(b,w,f,p,L){b.delete(f),b.set(p.id,p),w.delete(f),w.set(p.id,L)}function ow(b,w,f,p){if(!f.length||w.role!=="user"||!w.text.trim())return;if(b.some((L)=>L.id===w.id))return;return b.find((L)=>{return f.includes(L.id)&&!p.has(L.id)&&L.role===w.role&&L.text.trim()===w.text.trim()})}function tw(b,w,f,p,L,T,$){if(f.role!=="assistant"||p<=0)return"";let H=w[p-1];if(H?.role!=="user")return"";let _=$.get(H.id)||"";if(_&&!T.has(_))return _;return W1(b,H.id,L,T)}function sw(b,w){let f=new Set(b.map((L)=>L.id)),p=-1;return w.forEach((L,T)=>{if(f.has(L.id))p=T}),p}function ew(b,w,f,p,L,T,$){if(!$||b.role!=="assistant")return!1;if(!f)return!0;return L.size>0||T.size>0||p>=0&&w>p}function b2(b,w,f){if(w.role!=="assistant")return;let p=b.findIndex((T)=>T.id===w.id);if(p<=0)return;let L=b[p-1];if(L?.role==="user"&&f.includes(L.id))return L;return}function w2(b,w,f,p,L,T){if(!L||w.role!=="assistant")return;let $=b.find((_)=>{return f.includes(_.id)&&_.role==="user"&&!p.has(_.id)&&(!T||w.createdAt>=_.createdAt)});if($)return $;let H=[...p].at(-1);return b.find((_)=>_.id===H)}function s(b){return b.meta?.[j0]===!0}function R0(b,w){b.set(w.id,{...w,meta:{...w.meta||{},[j0]:!0}})}function W1(b,w,f,p){let L=b.findIndex(($)=>$.id===w);if(L<0)return"";let T=b[L+1];if(T?.role==="assistant"&&f.includes(T.id)&&!p.has(T.id))return T.id;return""}function A1(b,w,f){b.set(w,[...b.get(w)||[],f])}function e(b,w){return b.get(w)||[]}function f2(b,w,f){let p=(b.get(w)||[]).filter((L)=>L!==f);if(p.length){b.set(w,p);return}b.delete(w)}function p2(b,w,f){let p=b.get(w)||[];if(!p.length)return;b.delete(w),b.set(f,[...b.get(f)||[],...p])}function b1(b,w,f,p){if(!p.length||!f.length)return;let L=p.filter((T)=>{return f.some(($)=>{return $.id===T&&!s($)})});if(L.length){b.set(w,L);return}b.delete(w)}function w1(b){return D(b,b.activeSessionId,!0)}function D(b,w,f=!1){let p=b.sessions.find((L)=>L.id===w);if(!p)p=O1(w||void 0),b.sessions.unshift(p),C(b);if(f||!b.activeSessionId)b.activeSessionId=p.id,C(b);return p}function r0(b,w,f,p){if(w===f)return;let L=b.sessions.find((_)=>_.id===w),T=L?.messages.findIndex((_)=>_.id===p)??-1;if(!L||T<0)return;let[$]=L.messages.splice(T,1),H=D(b,f);if(!H.messages.some((_)=>_.id===$.id))H.messages.push($);L.updatedAt=Date.now(),H.updatedAt=Date.now(),S0(b,L.id),C(b)}function S0(b,w){let f=b.sessions.find((p)=>p.id===w);if(!f||f.id===b.activeSessionId||f.messages.length>0||f.title!=="New chat")return;b.sessions=b.sessions.filter((p)=>p.id!==f.id)}function O1(b=E()){let w=Date.now();return{id:b,title:"New chat",createdAt:w,updatedAt:w,messages:[]}}function m0(b){try{return localStorage.getItem(b)||""}catch{return""}}function L2(b){let w=O1(b);return{activeSessionId:w.id,sessions:[w]}}function T2(){try{let b=JSON.parse(localStorage.getItem(H1)||"null");if(b&&Array.isArray(b.sessions))return{activeSessionId:"",sessions:b.sessions.filter(d0).map(n0)}}catch{}return{activeSessionId:"",sessions:[]}}function $2(b=""){try{let w=JSON.parse(localStorage.getItem(H1)||"null");if(w&&typeof w.activeSessionId==="string"&&Array.isArray(w.sessions)){let f=w.sessions.filter(d0).map(n0);if(b&&!f.some((p)=>p.id===b))f.unshift(O1(b));return{activeSessionId:b||w.activeSessionId,sessions:f}}}catch{}return L2(b||void 0)}function C(b){z0(b);try{localStorage.setItem(H1,JSON.stringify(b))}catch{for(let w of b.sessions)w.messages=w.messages.slice(-Math.floor(m/2));z0(b);try{localStorage.setItem(H1,JSON.stringify(b))}catch{}}}function r1(b){if(!b?.length)return;return b.map(({content:w,...f})=>f)}function z0(b){b.sessions.sort((p,L)=>L.updatedAt-p.updatedAt);let w=b.sessions.find((p)=>p.id===b.activeSessionId),f=b.sessions.filter((p)=>p.id!==b.activeSessionId).slice(0,Math.max(0,b0-1));b.sessions=w?[w,...f]:b.sessions.slice(0,b0);for(let p of b.sessions)if(p.messages.length>m)p.messages.splice(0,p.messages.length-m)}function d0(b){return U(b)&&typeof b.id==="string"&&Array.isArray(b.messages)}function n0(b){return{...b,messages:j1(b.messages)}}function j1(b){return Array.isArray(b)?b.filter(N2).map(H2):[]}function H2(b){let w={...b};if(Array.isArray(b.toolCalls))w.toolCalls=b.toolCalls.filter(a0);else delete w.toolCalls;if(Array.isArray(b.blocks))w.blocks=b.blocks.filter(R2).map(_2);else delete w.blocks;return w}function _2(b){if(b.type!=="tool"){let{toolCall:w,...f}=b;return f}return b}function R2(b){if(!U(b)||typeof b.id!=="string"||typeof b.text!=="string")return!1;if(b.type==="text"||b.type==="thinking")return!0;return b.type==="tool"&&a0(b.toolCall)}function a0(b){if(!U(b)||typeof b.id!=="string"||typeof b.name!=="string")return!1;return typeof b.text==="string"&&h2(b.status)&&z2(b.argsStatus)}function z2(b){return b===void 0||b==="present"||b==="empty"||b==="unavailable"||b==="truncated"||b==="omitted"}function h2(b){return b==="running"||b==="ok"||b==="err"}function N2(b){if(!U(b)||typeof b.id!=="string"||typeof b.text!=="string")return!1;return typeof b.createdAt==="number"&&O2(b.role)}function O2(b){return b==="user"||b==="assistant"||b==="tool"||b==="system"}function U(b){return typeof b==="object"&&b!==null}function E(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`}function o0(b){return b instanceof Error&&(b.name==="AbortError"||/aborted|abort/i.test(b.message))}function V1(b){return b instanceof Error?b.message:String(b)}export{T1 as toolArgsInlineText,J1 as toolArgsBodyText,C2 as submittedAttachmentsForText,X2 as shellAttachmentNoteVisible,$b as setComposerMode,L1 as renderPromptMeta,Lb as renderMessages,_b as promptFromAgUiLikeRunInput,t1 as pluginStyleText,Z1 as pluginClass,y2 as mergeCommands,F2 as hasQueuedAttachmentNames,z1 as getActiveWorkspaceId,kb as formatShellOutput,J0 as extractRefs,Xb as default,n1 as createComposerSurface,d1 as createChatSurface,pb as createChatDom,q2 as createChannels,Hb as createAgUiLikeRunInput,$1 as commandName,Rb as chatEventsToAgUiLikeEvents,K as backendCall};
