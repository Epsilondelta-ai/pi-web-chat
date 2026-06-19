var U={attachFile:["M16.5 6v11.5a4 4 0 0 1-8 0V5a2.5 2.5 0 0 1 5 0v10.5a1 1 0 0 1-2 0V6H10v9.5","a2.5 2.5 0 0 0 5 0V5a4 4 0 0 0-8 0v12.5a5.5 5.5 0 0 0 11 0V6h-1.5Z"].join(""),stop:"M6 6h12v12H6V6Z",send:"M2 21 23 12 2 3v7l15 2-15 2v7Z",terminal:"M3 4h18v16H3V4Zm2 2v12h14V6H5Zm2 3 1.1-1.1L12.2 12l-4.1 4.1L7 15l3-3-3-3Zm6 6h5v1.5h-5V15Z",file:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 2.5L17.5 8H14V4.5ZM8 13h8v1.5H8V13Zm0 3h8v1.5H8V16Z"},P={attachFile:W("attach_file",U.attachFile),stop:W("stop",U.stop),send:W("send",U.send),terminal:W("terminal",U.terminal)};function Mb(b){return`<span class="composer-spinner" aria-hidden="true"></span><span class="sr-only">${E(b)}</span>`}function W(b,p){return`<svg class="material-icon" data-material-icon="${b}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="${p}"></path></svg>`}function E(b){return b.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}function hb(){return"pi-web-chat-mounted"}function Pb(){let b=document.createElement("main");return b.className="main pi-web-chat-surface",b.dataset.main="session",b.dataset.pluginChatRoot="",b.innerHTML='<div class="term"><div class="term-inner" role="log" aria-live="polite" aria-relevant="additions text"></div></div><button type="button" class="scroll-bottom-btn" data-action="scroll-bottom" aria-label="stick to bottom" title="stick to bottom" aria-pressed="true" hidden>↓</button>',b}function Eb(){let b=document.createElement("section");return b.className="prompt-region pi-web-chat-composer",b.innerHTML=`
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
    <div class="prompt-meta" data-prompt-meta></div>`,d(b,{}),b}function d(b,p={},w=!1){let f=b.querySelector("[data-prompt-meta]");if(!f)return;let h=[u1(p.model||"—",p.thinkingLevel)],L=vb("5h",p.fiveHourQuota),i=vb("Week",p.weeklyQuota),T=p.currentBranch||p.branch||"—";if(p.warning)h.push(c1(p.warning));if(L)h.push(L);if(i)h.push(i);if(h.push(r1(T)),f.innerHTML=h.join(" | "),w)f.append(document.createTextNode(" | "),g1())}function g1(){let b=document.createElement("span");return b.className="prompt-meta-item pi-web-chat-badge",b.textContent="chat plugin",b}function r1(b){return`<span class="prompt-meta-item prompt-meta-branch">${Bb("git-branch")}<span>${E(b)}</span></span>`}function c1(b){return`<span class="prompt-meta-item prompt-meta-warning" title="${E(b)}">runtime warning</span>`}function u1(b,p){let w=E(b);return p?`${w} (${E(p)})`:w}function vb(b,p){if(typeof p!=="number"||!Number.isFinite(p))return;let w=Math.max(0,Math.min(100,Math.round(p))),f=w>=70?"full":w>=30?"medium":"low";return`<span class="prompt-meta-item prompt-meta-battery prompt-meta-battery-${f}">${E(b)} ${Bb(`battery-${f}`)}(${w}%)</span>`}function Bb(b){return{"battery-full":'<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 10v4"></path><path d="M14 10v4"></path><path d="M22 14v-4"></path><path d="M6 10v4"></path><rect x="2" y="6" width="16" height="12" rx="2"></rect></svg>',"battery-medium":'<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 14v-4"></path><path d="M22 14v-4"></path><path d="M6 14v-4"></path><rect x="2" y="6" width="16" height="12" rx="2"></rect></svg>',"battery-low":'<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 14v-4"></path><path d="M6 14v-4"></path><rect x="2" y="6" width="16" height="12" rx="2"></rect></svg>',"git-branch":'<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6a9 9 0 0 0-9 9V3"></path><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle></svg>'}[b]||""}function I1(){let b=document.createElement("section");return b.className="pi-web-chat-root",b.dataset.plugin="pi-web-chat",b.innerHTML=`
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
        <button class="pi-web-chat-icon-btn" type="button" data-attach aria-label="attach files" title="attach files">${W("attach_file",U.attachFile)}</button>
        <input type="file" multiple hidden data-file-input />
        <textarea class="pi-web-chat-textarea" data-chat-input aria-label="Prompt" placeholder="ask pi to do something…" rows="1"></textarea>
        <button class="pi-web-chat-send" type="button" data-send aria-label="send" title="send" aria-disabled="true">${W("send",U.send)}</button>
      </div>
    </section>`,{root:b,transcript:Y(b.querySelector("[data-chat-transcript]")),textarea:Y(b.querySelector("[data-chat-input]")),sendButton:Y(b.querySelector("[data-send]")),attachButton:Y(b.querySelector("[data-attach]")),fileInput:Y(b.querySelector("[data-file-input]")),slashPopover:Y(b.querySelector("[data-slash-popover]")),slashList:Y(b.querySelector("[data-slash-list]")),refsPopover:Y(b.querySelector("[data-refs-popover]")),refsList:Y(b.querySelector("[data-refs-list]")),attachments:Y(b.querySelector("[data-attachments]"))}}function S1(b,p){b.replaceChildren(...p.map(m1)),b.scrollTop=b.scrollHeight}function m1(b){let p=document.createElement("article");p.className=`pi-web-chat-message pi-web-chat-message-${b.role}`,p.dataset.messageId=b.id;let w=document.createElement("div");w.className="pi-web-chat-message-role",w.textContent=b.role;let f=document.createElement("pre");if(f.className="pi-web-chat-message-body",f.textContent=b.text,p.append(w,f),b.thinking){let h=document.createElement("details");h.className="pi-web-chat-thinking",h.open=Boolean(b.streaming);let L=document.createElement("summary");L.textContent="thinking";let i=document.createElement("pre");i.textContent=b.thinking,h.append(L,i),p.append(h)}if(b.toolCalls?.length){let h=document.createElement("div");h.className="pi-web-chat-tools";for(let L of b.toolCalls){let i=document.createElement("details");i.className=`pi-web-chat-tool pi-web-chat-tool-${L.status}`,i.open=L.status==="running";let T=document.createElement("summary");T.textContent=`${L.name} · ${L.status}`;let H=document.createElement("pre");H.textContent=L.text||Lb(L),i.append(T,H),h.append(i)}p.append(h)}if(b.streaming){let h=document.createElement("div");h.className="pi-web-chat-message-meta",h.textContent="streaming...",p.append(h)}if(b.attachments?.length){let h=document.createElement("div");h.className="pi-web-chat-message-meta",h.textContent=`${b.attachments.length} attachment(s)`,p.append(h)}return p}function n(b){if(b.argsStatus==="truncated")return"arguments truncated";if(b.argsStatus==="omitted")return"arguments omitted";if(b.argsStatus==="unavailable")return"arguments unavailable";if(b.argsStatus==="empty")return"no arguments";if(!b.args)return"";return JSON.stringify(b.args)}function Lb(b){if(b.argsStatus==="truncated")return"arguments truncated: too large to display";if(b.argsStatus==="omitted")return"arguments omitted: response too large";if(b.argsStatus==="unavailable")return"arguments unavailable";if(b.argsStatus==="empty")return"no arguments";if(!b.args)return"arguments unavailable";return JSON.stringify(b.args,null,2)}function d1(b,p){b.root.dataset.composerMode=p,ib(b.attachButton,p)}function kb(b,p,w){if(b.disabled=p==="steering"||p==="loading"&&!w,b.dataset.mode=p,b.setAttribute("aria-disabled",w?"false":"true"),p==="loading"){let f=w?"send steering message":"loading";b.innerHTML=Mb(f),b.title=f,b.setAttribute("aria-label",f);return}if(p==="steering"){b.innerHTML=Mb("steering"),b.title="steering message pending",b.setAttribute("aria-label","steering message pending");return}b.innerHTML=P.send,b.title="send",b.setAttribute("aria-label","send")}function ib(b,p){if(b.disabled=p==="shell",b.setAttribute("aria-disabled",p==="shell"?"true":"false"),p==="shell"){b.innerHTML=P.terminal,b.title="shell command mode",b.setAttribute("aria-label","shell command mode");return}if(p==="file-ref"){b.innerHTML=W("file",U.file),b.title="file reference mode",b.setAttribute("aria-label","file reference mode");return}b.innerHTML=P.attachFile,b.title="attach files",b.setAttribute("aria-label","attach files")}function Tb(b,p){b.hidden=p.length===0,b.replaceChildren(...p.map((w)=>{let f=document.createElement("span");return f.className="pi-web-chat-attachment-chip",f.textContent=w,f}))}function xb(){return`
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
  `}function gb(){document.getElementById("pi-web-chat-style")?.remove();let b=document.createElement("style");return b.id="pi-web-chat-style",b.textContent=xb(),document.head.append(b),b}function a(b){return b.command||b.cmd||(b.name?`/${b.name}`:"")}function Y(b){if(!b)throw Error("pi-web-chat DOM template is invalid");return b}function n1(b,p,w){return{threadId:b,runId:p,state:{},messages:w,tools:[],context:[]}}function a1(b){let p=[...b.messages].reverse().find((w)=>w.role==="user");return{text:p?.text||"",attachments:p?.attachments||[],sessionId:b.threadId}}function o1(b,p,w){return b.map((f)=>t1(f,p,w))}function t1(b,p,w){if(b.type==="text.delta")return{type:"TEXT_MESSAGE_CONTENT",threadId:p,runId:w,delta:b.delta||""};if(b.type==="thinking.delta")return{type:"THINKING_MESSAGE_CONTENT",threadId:p,runId:w,delta:b.delta||""};if(b.type==="tool.start")return{type:"TOOL_CALL_START",threadId:p,runId:w,toolCallId:b.toolCallId,payload:rb(b)};if(b.type==="tool.delta")return{type:"TOOL_CALL_ARGS",threadId:p,runId:w,toolCallId:b.toolCallId,delta:b.delta||""};if(b.type==="tool.end")return{type:"TOOL_CALL_END",threadId:p,runId:w,toolCallId:b.toolCallId,payload:rb(b)};return{type:b.type.toUpperCase().replaceAll(".","_"),threadId:p,runId:w,payload:b}}function rb(b){return{name:b.toolName||"tool",args:b.args||{},result:b.result||"",isError:b.isError===!0}}var o="pi-web-chat.sessions.v1";var b1="plugin.pi-web-sidebar.selectedSession",p1="plugin.pi-web-sidebar.event",w1="plugin.pi-web-sidebar.activeSessionId",Zb="plugin.pi-web-sidebar.activeWorkspaceId",s1=12,cb=20,g=200,yb=200,e1=8,b0=1e6,p0=64000;var w0=250,f0=100,h0=6,L0=100,B=new Set,Rb=new WeakMap,i0={"book-open":'<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',"file-plus":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="M9 15h6"/>',pencil:'<path d="M21.2 6.8 17.2 2.8a2 2 0 0 0-2.8 0L3 14.2V21h6.8L21.2 9.6a2 2 0 0 0 0-2.8z"/><path d="m14 5 5 5"/>',terminal:'<path d="m4 17 6-6-6-6"/><path d="M12 19h8"/>',cpu:'<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 15h3"/><path d="M1 9h3"/><path d="M1 15h3"/>',globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 0 20"/><path d="M12 2a15.3 15.3 0 0 0 0 20"/>',search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',braces:'<path d="M8 3H7a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-4a2 2 0 0 1 2-2 2 2 0 0 1-2-2V7a2 2 0 0 0-2-2h-1"/>',"file-text":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',"circle-question-mark":'<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 1 1 5.8 1c-.5 1-1.4 1.5-2.1 2-.6.4-.8.8-.8 2"/><path d="M12 17h.01"/>',users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',plug:'<path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a6 6 0 0 1-12 0V8Z"/>',"git-branch":'<line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',"circle-check":'<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',hammer:'<path d="m15 12-8.5 8.5a2.1 2.1 0 0 1-3-3L12 9"/><path d="m17.6 5.4 1.8-1.8"/><path d="m14 7 3 3"/><path d="M5 11 2 8l6-6 3 3"/>',package:'<path d="m7.5 4.3 9 5.2"/><path d="M21 8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>'},zb=new WeakMap,T0={read:"book-open",write:"file-plus",edit:"pencil",ctx_execute:"cpu",ctx_batch_execute:"cpu",ctx_execute_file:"cpu",ctx_search:"cpu",ctx_index:"cpu",ctx_fetch_and_index:"cpu",web_search:"globe",fetch_content:"search",get_search_content:"search",code_search:"braces",document_parse:"file-text",ask_user_question:"circle-question-mark",teams:"users",subagent:"users",mcp:"plug",git:"git-branch"};class f1{#b=[];add(b){if(b)this.#b.push(b);return b}listen(b,p,w){b.addEventListener(p,w),this.add({remove:()=>b.removeEventListener(p,w)})}dispose(){for(let b of this.#b.splice(0).reverse())if(typeof b==="function")b();else if("unsubscribe"in b)b.unsubscribe();else b.remove()}}function H0(b={}){let p=b.app;if(p?.piWebChat?.dispose(),typeof b.mount?.chat!=="function"||typeof b.mount?.composer!=="function")throw Error("pi-web-chat requires modern pi-web mount.chat and mount.composer APIs");return $0(b,p)}function $0(b,p){let w=new f1,f=w.add(gb()),h=Pb(),L=Eb(),i=b.mount?.chat(h,{replace:!0}),T=b.mount?.composer(L,{replace:!0});if(Lp(w,h),i)w.add(i);if(T)w.add(T);let H=M(b);v(b,H||void 0);let O=H?.sessionId?vp(H.sessionId):Mp(),$={backendChatToken:0,pendingPromptEchoIds:new Map,pendingAssistantEchoIds:new Map,pendingAssistantEchoByUserId:new Map};if(!H?.sessionId)bb(h);else G(h,S(O).messages,O.activeSessionId),e(b,h,O,$,H.sessionId);t0(w,b,h,O,$),N0(w,h,O,$),z0(w,b,L,h,O,$),O0(b,L),p?.classList.add(hb());let _=()=>{if($.runEventsAbort?.abort(),$.sessionEventsAbort?.abort(),w.dispose(),B.clear(),f.remove(),p?.classList.remove(hb()),p?.piWebChat===R)delete p.piWebChat},R={dispose:_};if(p)p.piWebChat=R;return _}function O0(b,p){d(p,{}),_0(b,p)}async function _0(b,p){try{let w=q(b),f=w.path?{workspacePath:w.path}:{},h=await X(b,"runtimeStatus",f,w.id),L=A(h)?h:{},i=A(L.status)?R0(L.status):void 0;if(!i)return;d(p,i)}catch{}}function R0(b){let p={};if(typeof b.model==="string")p.model=b.model;if(typeof b.modelProvider==="string")p.modelProvider=b.modelProvider;if(typeof b.thinkingLevel==="string")p.thinkingLevel=b.thinkingLevel;if(typeof b.fiveHourQuota==="number")p.fiveHourQuota=b.fiveHourQuota;if(typeof b.weeklyQuota==="number")p.weeklyQuota=b.weeklyQuota;if(typeof b.currentBranch==="string")p.currentBranch=b.currentBranch;if(typeof b.branch==="string")p.branch=b.branch;if(typeof b.warning==="string")p.warning=b.warning;return p}function z0(b,p,w,f,h,L){let i=w.querySelector(".prompt-textarea"),T=w.querySelector(".send-btn"),H=w.querySelector(".attach-btn"),O=w.querySelector(".stop-btn"),$=w.querySelector("[data-file-input]"),_=w.querySelector(".attach-chips"),R=w.querySelector(".shell-attachment-note");if(!i||!T)return;let l=w.querySelector(".prompt-bar"),j=w.querySelector(".slash-pop"),N=w.querySelector(".prompt-file-ref-pop"),z={selectedAttachments:[],shellMode:!1,commands:[]},J=()=>{V0(_,i.value,z)},K=()=>{Z0(l,i,H,R,z)},Z=()=>{let C=i.value,V=l0(L),D=Boolean(L.pendingSteering),fb=Boolean(L.activeRunId&&L.activeRunSessionId===h.activeSessionId),Wb=D?"steering":V?"loading":"idle",x1=Boolean(C.trim())&&!D&&!L.resolvingSubmit&&(!V||fb);if(kb(T,Wb,x1),l)l.dataset.runState=Wb;if(O){let x=Boolean(L.pendingSteering&&!L.pendingSteering.sent);O.hidden=!V&&!x,O.disabled=!1,O.title=x?"cancel steering":"stop response",O.setAttribute("aria-label",x?"cancel steering":"stop response")}if(J(),ub(z),z.shellMode){Hb(j,N);return}A0(p,w,i,C,z.commands,(x)=>{z.commands=x}),z.fileSearchTimer=setTimeout(()=>{Y0(p,w,i,i.value)},120)},m=()=>{z.shellMode=!0,Hb(j,N),K(),J()},Kb=()=>{z.shellMode=!1,K(),J()},Ub=async(C)=>{C?.preventDefault(),C?.stopImmediatePropagation();let V=i.value.trim();if(Z(),L.resolvingSubmit||L.pendingSteering)return;if(L.startingRunSessionId||L.fallbackSubmittingSessionId)return;if(!V){i.value="",Z();return}if(L.resolvingSubmit=!0,i.value="",$)$.value="";Z();try{if(z.shellMode)mb(V,[]),await G0(p,f,h,V),Kb();else{let D=[...z.selectedAttachments,...await q0(p,V)];z.selectedAttachments=[],J(),mb(V,D);let fb=W0(p,f,h,L,V,D,Z);L.resolvingSubmit=!1,Z(),await fb}}catch(D){if(!k1(D))G(f,[y0(D)],h.activeSessionId)}finally{L.resolvingSubmit=!1,K(),Z()}};if(b.listen(i,"input",()=>{if(!z.shellMode&&i.value.startsWith("! "))i.value=i.value.slice(2),m();Z()}),b.listen(i,"keydown",(C)=>{let V=C;if(V.key===" "&&!z.shellMode&&i.value==="!"&&i.selectionStart===1&&i.selectionEnd===1){V.preventDefault(),i.value="",m(),Z();return}if(V.key==="Backspace"&&z.shellMode&&i.value===""){V.preventDefault(),Kb(),Z();return}if(V.key==="Escape"){Hb(j,N);return}if(V.key==="Enter"&&(V.metaKey||V.ctrlKey))Ub(V)}),b.listen(T,"click",(C)=>{Ub(C)}),O)b.listen(O,"click",(C)=>{C.preventDefault(),C.stopImmediatePropagation(),j0(p,f,h,L).finally(Z),Z()});if(H&&$)b.listen(H,"click",()=>{if(!z.shellMode)$.click()}),b.listen($,"change",()=>{J0($,(C)=>{z.selectedAttachments=C,J()})});L.onRunStateChange=Z,b.add({remove:()=>{if(ub(z),L.onRunStateChange===Z)L.onRunStateChange=void 0}}),K(),Z()}function l0(b){return Boolean(b.activeRunId||b.startingRunSessionId||b.fallbackSubmittingSessionId||b.pendingSteering)}function N0(b,p,w,f){b.listen(p,"click",(h)=>{let i=h.target?.closest?.("[data-action='cancel-steering']");if(!i)return;h.preventDefault(),h.stopPropagation();let T=i.dataset.sessionId||"",H=i.dataset.messageId||"";if(!h1(w,f)&&T&&H)c(w,T,H);if(T&&w.activeSessionId===T)G(p,F(w,T).messages,T)})}async function j0(b,p,w,f){if(f.pendingSteering&&!f.pendingSteering.sent){let T=f.pendingSteering.sessionId;if(h1(w,f),w.activeSessionId===T)G(p,F(w,T).messages,T);return}let h=f.activeRunId,L=f.activeRunSessionId||f.startingRunSessionId||f.fallbackSubmittingSessionId||w.activeSessionId,i=f.activeRunWorkspaceId||q(b).id;if(!h){f.runEventsAbort?.abort(),f.startingRunSessionId=void 0,f.fallbackSubmittingSessionId=void 0;return}f.runEventsAbort?.abort();try{await R1(b,h,L,i)}catch(T){globalThis.piWeb?.subject("toast.requested").next({level:"error",message:`stop failed: ${wb(T)}`})}finally{if(f.activeRunId===h)f.activeRunId=void 0,f.activeRunSessionId=void 0,f.activeRunWorkspacePath=void 0,f.activeRunWorkspaceId=void 0}}function h1(b,p){let w=p.pendingSteering;if(!w||w.sent)return!1;return clearTimeout(w.timeout),w.controller.abort(),p.pendingSteering=void 0,c(b,w.sessionId,w.messageId),!0}function V0(b,p,w){if(!b)return;if(w.shellMode){Tb(b,[]);return}Tb(b,[...w.selectedAttachments.map((f)=>f.name||"attachment"),...L1(p)])}function Z0(b,p,w,f,h){if(b?.classList.toggle("shell-mode",h.shellMode),p.setAttribute("placeholder",h.shellMode?"run shell command in workspace…":"ask pi to do something…"),f)f.hidden=!(h.shellMode&&h.selectedAttachments.length>0);if(w)ib(w,h.shellMode?"shell":"normal")}function ub(b){if(b.fileSearchTimer)clearTimeout(b.fileSearchTimer),b.fileSearchTimer=void 0}function Hb(b,p){b?.setAttribute("hidden",""),p?.setAttribute("hidden","")}function y0(b){return{id:Q(),role:"system",text:`prompt failed: ${wb(b)}`,createdAt:Date.now()}}async function J0(b,p){let w=Array.from(b.files||[]).slice(0,e1),f=[];for(let h of w){if(h.size>b0)continue;f.push({name:h.name,size:h.size,content:await h.text(),mimeType:h.type||void 0})}p(f)}async function G0(b,p,w,f){let h=Z1(b,w),L=F(w,h),i={id:Q(),role:"user",text:`! ${f}`,createdAt:Date.now()},T={id:Q(),role:"tool",text:`$ ${f}
(running...)`,createdAt:Date.now()};L.messages.push(i,T),L.updatedAt=Date.now(),y(w),G(p,L.messages,h);try{let H=await X(b,"runShell",{command:f}),O=typeof H.exitCode==="number"?H.exitCode:1,$=typeof H.durationMs==="number"?H.durationMs:0,_=typeof H.output==="string"?H.output:"";T.text=C0(f,_,O,$,Boolean(H.truncated))}catch(H){T.text=`$ ${f}
${wb(H)}`}L.updatedAt=Date.now(),y(w),G(p,L.messages,h)}async function q0(b,p){let w=L1(p);if(!w.length)return[];let f=await X(b,"resolveContext",{text:p,refs:w});return Array.isArray(f.attachments)?f.attachments.filter(A):[]}function C0(b,p,w,f,h){let L=F0(p,p0),i=h||L.truncated,T=L.text.endsWith(`
`)||!L.text?"":`
`;return`$ ${b}
${L.text}${T}[exit ${w} · ${f}ms${i?" · truncated":""}]`}function F0(b,p){let w=new TextEncoder,f=w.encode(b);if(f.byteLength<=p)return{text:b,truncated:!1};let h=new TextDecoder().decode(f.slice(0,p));while(h&&w.encode(h).byteLength>p)h=h.slice(0,-1);return{text:h,truncated:!0}}async function A0(b,p,w,f,h,L){let i=p.querySelector(".slash-pop"),T=p.querySelector(".slash-list"),H=Ap(f);if(H===null||!T){i?.setAttribute("hidden","");return}let O=h;if(!O.length){let _=await X(b,"commands",{});O=Array.isArray(_.commands)?_.commands.filter(A):[],L(O)}if(w.value!==f)return;let $=O.filter((_)=>{return a(_).slice(1).toLowerCase().includes(H)});X0(T,$,w,i),i?.toggleAttribute("hidden",$.length===0)}async function Y0(b,p,w,f){let h=p.querySelector(".prompt-file-ref-pop"),L=p.querySelector(".prompt-file-ref-list"),i=Yp(f);if(i===null||!L){h?.setAttribute("hidden","");return}try{let T=await X(b,"searchFiles",{query:i,limit:s1}),H=Array.isArray(T.files)?T.files.filter(A):[];if(w.value!==f)return;Q0(L,w,H,h),h?.toggleAttribute("hidden",H.length===0)}catch{h?.setAttribute("hidden","")}}function X0(b,p,w,f){b.replaceChildren(...p.map((h)=>{let L=document.createElement("button"),i=a(h);return L.type="button",L.className="slash-item",L.dataset.slash=i,L.innerHTML='<span class="sl-name"></span><span class="sl-desc"></span>',L.querySelector(".sl-name").textContent=i,L.querySelector(".sl-desc").textContent=h.description||"",L.addEventListener("click",()=>{w.value=h.template||`${i} `,f?.setAttribute("hidden",""),w.dispatchEvent(new(w.ownerDocument.defaultView?.Event||Event)("input",{bubbles:!0})),w.focus()}),L}))}function Q0(b,p,w,f){b.replaceChildren(...w.map((h)=>{let L=h.path||h.name||"",i=document.createElement("button");return i.type="button",i.className="prompt-file-ref-item",i.dataset.path=L,i.disabled=!L,i.innerHTML='<span class="pfr-path"></span><span class="pfr-kind"></span>',i.querySelector(".pfr-path").textContent=L,i.querySelector(".pfr-kind").textContent=typeof h.size==="number"?`${h.size} bytes`:"file",i.addEventListener("click",()=>{D0(p,L),f?.setAttribute("hidden","")}),i}))}function D0(b,p){if(!p)return;let{value:w,selectionStart:f}=b,h=w.slice(0,f),L=/(?:^|\s)@([^\s@`]*)$/.exec(h),i=L?f-(L[1]||"").length-1:f,T=`@${p} `;b.value=`${w.slice(0,i)}${T}${w.slice(f)}`;let H=i+T.length;b.setSelectionRange(H,H),b.dispatchEvent(new(b.ownerDocument.defaultView?.Event||Event)("input",{bubbles:!0})),b.focus()}function dp(b){return{input$:b.behaviorSubject("chat.input",""),submitted$:b.subject("chat.input.submitted"),activeSessionId$:b.behaviorSubject("session.activeId",null),sidebarSelectedSession$:b.behaviorSubject(b1,K0()),toastRequested$:b.subject("toast.requested")}}function L1(b){let p=[],w=new Set,f=/(^|[\s`])@([^\s@`]+)/g,h=f.exec(String(b||""));while(h!==null){let L=h[2]||"";if((h[1]||"")!=="`"&&L&&!w.has(L))w.add(L),p.push(L);h=f.exec(String(b||""))}return p}function np(b=[],p=[]){let w=[],f=new Set;for(let h of[...b,...p]){let L=a(h);if(!L||f.has(L))continue;f.add(L),w.push(h)}return w}function s(b){return b.app?.piWebSidebar?.getSnapshot?.().activeWorkspaceId||b.app?.dataset.activeWorkspaceId||""}function K0(){return M({})}function M(b){let p=b.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),w=p?.activeSessionId||"",f=p?.activeWorkspaceId||"";if(w&&b.app?.dataset.clearedSessionId!==w)return{sessionId:w,workspaceId:f||void 0};return null}function v(b,p){if(p?.workspaceId&&b.app)b.app.dataset.activeWorkspaceId=p.workspaceId,Ib(Zb,p.workspaceId);if(p?.sessionId)delete b.app?.dataset.clearedSessionId,b.app?.setAttribute("data-active-session-id",p.sessionId),Ib(w1,p.sessionId)}function i1(b){let p=M(b);if(p?.sessionId&&b.app)b.app.dataset.clearedSessionId=p.sessionId;b.app?.removeAttribute("data-active-session-id"),U0(w1),globalThis.piWeb?.behaviorSubject("session.activeId",null).next(null)}function r(b,p,w={}){let f=b.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),h={type:p,detail:w,snapshot:f};(b.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$)?.next(h),globalThis.piWeb?.subject(p1).next(h)}function Jb(b,p,w){let f=b.app?.dataset.activeWorkspaceId||s(b),h={reason:w,sessionId:p,workspaceId:f};globalThis.piWeb?.behaviorSubject("session.activeId",p).next(p),r(b,"active.start",h),r(b,"session.created",h)}function Gb(b,p){globalThis.piWeb?.subject("session.changed").next({sessionId:b,name:p,title:p})}function qb(b){if(b.title!=="New chat")return"";let w=b.messages.find((f)=>f.role==="user")?.text.slice(0,48)||"";if(!w)return"";return b.title=w,w}function Ib(b,p){try{localStorage.setItem(b,p)}catch{}}function U0(b){try{localStorage.removeItem(b)}catch{}}async function X(b,p,w={},f=s(b)){if(!b.backend)return{};let h=await b.backend(p,{workspaceId:f,data:w});return A(h)?h:{}}function lb(b){let p=Array.isArray(b.warnings)?b.warnings.filter((w)=>typeof w==="string"&&w.trim().length>0):[];for(let w of p)globalThis.piWeb?.subject("toast.requested").next({level:"warning",message:w})}function ap(b,p){return b.trim().startsWith("!")?[]:[...p]}async function W0(b,p,w,f,h,L,i=()=>{}){let T=Z1(b,w),H=q(b);if(f.activeRunId&&f.activeRunSessionId===T){let z=f.activeRunWorkspacePath||H.path,J=f.activeRunWorkspaceId||H.id;await M0(b,p,w,f,h,L,z,J,i);return}if(f.startingRunSessionId===T||f.fallbackSubmittingSessionId===T)return;f.backendChatToken+=1,f.startingRunSessionId=T,i(),f.runEventsAbort?.abort();let O=new AbortController;f.runEventsAbort=O,f.sessionEventsAbort?.abort();let $={id:Q(),role:"user",text:h,attachments:Qb(L),createdAt:Date.now()},_=F(w,T);Vb(f.pendingPromptEchoIds,T,$.id),_.messages.push($),_.updatedAt=Date.now(),y(w),G(p,_.messages,T);let R;try{R=await r0(b,h,L,T,H.path,H.id)}catch(z){throw f.startingRunSessionId=void 0,i(),z}if(O.signal.aborted){if(f.startingRunSessionId=void 0,typeof R.runId==="string"&&R.runId)await R1(b,R.runId,T,H.id);c(w,T,$.id),i();return}if(lb(R),typeof R.activeSessionId==="string"&&R.activeSessionId){let z=T,J=w.activeSessionId===z;if(T=R.activeSessionId,J)k(w,T),v(b,{sessionId:R.activeSessionId,workspaceId:H.id||void 0}),r(b,"chat-session",{reason:"startPrompt",sessionId:R.activeSessionId}),Jb(b,R.activeSessionId,"startPrompt");else F(w,T);W1(w,z,T,$.id),Up(f.pendingPromptEchoIds,z,T)}if(typeof R.runId!=="string"||!R.runId){f.startingRunSessionId=void 0,f.fallbackSubmittingSessionId=T,i();let z;try{z=await c0(b,h,L,T,H.path,H.id)}catch(m){throw f.fallbackSubmittingSessionId=void 0,i(),m}if(O.signal.aborted){f.fallbackSubmittingSessionId=void 0,c(w,T,$.id),i();return}lb(z);let J=typeof z.activeSessionId==="string"&&z.activeSessionId?z.activeSessionId:T,K=u(f.pendingPromptEchoIds,T),Z=o0(b,w,z,"submitPrompt",T,K);if(I(f.pendingPromptEchoIds,J,Z,K),w.activeSessionId===T||w.activeSessionId===J)G(p,Z,w.activeSessionId);if(f.runEventsAbort===O)f.runEventsAbort=void 0;f.startingRunSessionId=void 0,f.fallbackSubmittingSessionId=void 0,i();return}let l=F(w,T);f.activeRunId=R.runId,f.activeRunSessionId=T,f.activeRunWorkspacePath=H.path,f.activeRunWorkspaceId=H.id,f.startingRunSessionId=void 0,i();let j=qb(l);if(j)y(w),Gb(T,j);let N=I0(l);Vb(f.pendingAssistantEchoIds,T,N.id);try{await E0(b,w,l,R.runId,H.path,H.id,N,()=>{if(!O.signal.aborted&&w.activeSessionId===T)G(p,l.messages,T)},O.signal)}finally{if(f.activeRunId===R.runId)f.activeRunId=void 0,f.activeRunSessionId=void 0,f.activeRunWorkspacePath=void 0,f.activeRunWorkspaceId=void 0,f.startingRunSessionId=void 0,f.fallbackSubmittingSessionId=void 0,i();if(f.runEventsAbort===O)f.runEventsAbort=void 0}if(!O.signal.aborted&&w.activeSessionId===T)e(b,p,w,f,T,H.path,H.id)}async function M0(b,p,w,f,h,L,i,T,H=()=>{}){let{activeRunId:O,activeRunSessionId:$}=f;if(!O||!$)throw Error("active run is unavailable for steering");if(f.pendingSteering)return;let _={id:Q(),role:"user",text:h,attachments:Qb(L),createdAt:Date.now(),meta:{piWebChatSteeringState:"pending"}},R=F(w,$),l=new AbortController,j=v0(l.signal,()=>{let N=f.pendingSteering;if(N){if(N.sent=!0,P0(w,N.sessionId,N.messageId),w.activeSessionId===N.sessionId)G(p,F(w,N.sessionId).messages,N.sessionId);H()}});if(f.pendingSteering={sessionId:$,messageId:_.id,timeout:j.timeout,controller:l,sent:!1},Vb(f.pendingPromptEchoIds,$,_.id),R.messages.push(_),R.updatedAt=Date.now(),y(w),w.activeSessionId===$)G(p,R.messages,$);H();try{if(await j.promise,l.signal.aborted)return;let N=await u0(b,O,h,L,$,i,T);lb(N)}catch(N){if(k1(N))return;if(c(w,$,_.id),Kp(f.pendingPromptEchoIds,$,_.id),_1(N)){G(p,R.messages,$),globalThis.piWeb?.subject("toast.requested").next({level:"error",message:"This backend does not support steering while a response is streaming."});return}throw N}finally{if(f.pendingSteering?.controller===l)f.pendingSteering=void 0,H()}}function v0(b,p){let w,f=new Promise((h,L)=>{w=setTimeout(()=>{p(),h()},L0),b.addEventListener("abort",()=>{clearTimeout(w),L(new DOMException("Steering cancelled","AbortError"))},{once:!0})});return{timeout:w,promise:f}}function c(b,p,w){let f=b.sessions.find((h)=>h.id===p);if(!f)return;f.messages=f.messages.filter((h)=>h.id!==w),M1(b,f.id),y(b)}function P0(b,p,w){let f=F(b,p).messages.find((h)=>h.id===w);if(!f?.meta)return;if(delete f.meta.piWebChatSteeringState,Object.keys(f.meta).length===0)delete f.meta;y(b)}async function E0(b,p,w,f,h,L,i,T,H){let O=await H1(b,"streamEventsSse",{runId:f,cursor:0,workspacePath:h},H,L);if(!O)throw Error("SSE streaming backend did not return a stream");let $=T1(T),_=B0(p,f0);i.streaming=!0,$.flush();try{await $1(O,(R)=>{S0(i,[R]),i.streaming=R.type!=="run.end",w.updatedAt=Date.now(),_.request(),$.request()})}finally{i.streaming=!1,_.flush(),$.flush()}}function B0(b,p){let w=0,f,h=()=>{if(f)clearTimeout(f),f=void 0},L=()=>{h(),w=Date.now(),y(b)};return{request:()=>{let T=p-(Date.now()-w);if(T<=0){L();return}f||=setTimeout(L,T)},flush:L}}function T1(b){let p=0,w,f=()=>{if(w)clearTimeout(w),w=void 0},h=()=>{f(),p=Date.now(),b()};return{request:()=>{let i=w0-(Date.now()-p);if(i<=0){h();return}w||=setTimeout(h,i)},flush:h,cancel:f}}async function H1(b,p,w={},f,h=s(b)){if(!b.backendStream)throw Error("SSE streaming backend is unavailable");let L=await b.backendStream(p,{workspaceId:h,data:w},{signal:f});return k0(L)}function k0(b){if(typeof ReadableStream<"u"&&b instanceof ReadableStream)return b;if(typeof Response<"u"&&b instanceof Response)return b.body;if(typeof b==="string")return Sb(b);if(!A(b))return null;let p=b.body;if(typeof ReadableStream<"u"&&p instanceof ReadableStream)return p;let w=b.sse;if(typeof w==="string")return Sb(w);return null}function Sb(b){let p=new TextEncoder().encode(b);return new ReadableStream({start(w){w.enqueue(p),w.close()}})}async function $1(b,p){let w=b.getReader(),f=new TextDecoder,h="";while(!0){let L=await w.read();if(L.done){h+=f.decode(),g0(h,p);return}h+=f.decode(L.value,{stream:!0});let i=x0(h);h=i.remainder;for(let T of i.frames)O1(T,p)}}function x0(b){let w=b.replaceAll(`\r
`,`
`).replaceAll("\r",`
`).split(`

`),f=w.pop()||"";return{frames:w,remainder:f}}function g0(b,p){let w=b.trim();if(w)O1(w,p)}function O1(b,p){let w=b.split(`
`).filter((f)=>f.startsWith("data:")).map((f)=>f.slice(5).trimStart()).join(`
`);if(!w)return;try{let f=JSON.parse(w);if(n0(f))p(f)}catch{}}function mb(b,p){globalThis.piWeb?.subject("chat.input.submitted").next({text:b,attachments:Qb(p)||[]})}async function r0(b,p,w,f,h=q(b).path,L=q(b).id){try{return await X(b,"startPrompt",Cb(p,w,f,h),L)}catch(i){if(_1(i))return{};throw i}}function _1(b){return/unknown method: (startPrompt|streamEventsSse|steerPrompt)|unsupported method: (startPrompt|streamEventsSse|steerPrompt)|(startPrompt|streamEventsSse|steerPrompt) unsupported/i.test(wb(b))}async function c0(b,p,w,f="",h=q(b).path,L=q(b).id){return await X(b,"submitPrompt",Cb(p,w,f,h),L)}async function u0(b,p,w,f,h="",L=q(b).path,i=q(b).id){let T={...Cb(w,f,h,L),runId:p};return X(b,"steerPrompt",T,i)}async function R1(b,p,w="",f=q(b).id){return X(b,"abortPrompt",{runId:p,sessionId:w},f)}function Cb(b,p,w,f){let h={text:b,attachments:p,sessionId:w};if(f)h.workspacePath=f;return h}function I0(b){let p=[...b.messages].reverse().find((f)=>f.role==="assistant"&&f.streaming);if(p)return p;let w={id:Q(),role:"assistant",text:"",createdAt:Date.now(),streaming:!0};return b.messages.push(w),w}function S0(b,p){for(let w of p)if(w.type==="text.delta"&&typeof w.delta==="string")$b(b,"text",w.delta),b.text+=w.delta;else if(w.type==="thinking.delta"&&typeof w.delta==="string")$b(b,"thinking",w.delta),b.thinking=`${b.thinking||""}${w.delta}`;else if(w.type==="tool.start")Ob(b,w,"running");else if(w.type==="tool.delta"&&typeof w.delta==="string"){let f=Ob(b,w,"running");f.text=w.delta}else if(w.type==="tool.end"){let f=Ob(b,w,w.isError?"err":"ok");if(typeof w.result==="string"&&w.result)f.text=w.result}else if(w.type==="error"&&typeof w.message==="string")$b(b,"text",`${b.text?`
`:""}${w.message}`),b.text+=`${b.text?`
`:""}${w.message}`}function $b(b,p,w){b.blocks||=[];let f=b.blocks[b.blocks.length-1];if(f?.type===p){f.text+=w;return}if(b.blocks.length<yb)b.blocks.push({id:Q(),type:p,text:w})}function Ob(b,p,w){let f=p.toolCallId||p.toolName||"tool";b.toolCalls||=[];let h=b.toolCalls.find((L)=>L.id===f);if(!h)h={id:f,name:p.toolName||"tool",args:p.args,text:"",status:w},b.toolCalls.push(h),m0(b,h);if(h.status=w,d0(h,p))h.args=p.args,h.argsStatus=p.argsStatus;return h}function m0(b,p){if(b.blocks||=[],b.blocks.some((w)=>w.type==="tool"&&w.toolCall?.id===p.id))return;if(b.blocks.length<yb)b.blocks.push({id:Q(),type:"tool",text:"",toolCall:p})}function d0(b,p){if(!p.argsStatus)return Boolean(p.args);if(p.argsStatus==="unavailable")return!b.argsStatus;return!0}function n0(b){return A(b)&&typeof b.type==="string"}async function e(b,p,w,f,h="",L=Fb(b),i=q(b).id){if(!b.backendStream){await db(b,p,w,f,h,L);return}let T=++f.backendChatToken;f.sessionEventsAbort?.abort();let H=new AbortController;f.sessionEventsAbort=H;let O=T1(()=>{G(p,S(w).messages,w.activeSessionId)});try{let $=await H1(b,"sessionEventsSse",z1(b,h,L),H.signal,i);if(!$)throw Error("session SSE backend did not return a stream");await $1($,(_)=>{if(T!==f.backendChatToken||_.type!=="chat.state")return;let R=a0(_),l=typeof R.activeSessionId==="string"?R.activeSessionId:h,j=u(f.pendingPromptEchoIds,l),N=u(f.pendingAssistantEchoIds,l),z=j1(b,w,R,"chatState",j,N,f.pendingAssistantEchoByUserId);if(l1(f,R,l,L,i),I(f.pendingPromptEchoIds,l,z,j),I(f.pendingAssistantEchoIds,l,z,N),z.length)O.request()})}catch($){if(!H.signal.aborted)await db(b,p,w,f,h,L)}finally{if(O.flush(),f.sessionEventsAbort===H)f.sessionEventsAbort=void 0}}async function db(b,p,w,f,h="",L=Fb(b)){let i=++f.backendChatToken;try{let T=await X(b,"chatState",z1(b,h,L));if(i!==f.backendChatToken)return;let H=typeof T.activeSessionId==="string"?T.activeSessionId:h,O=u(f.pendingPromptEchoIds,H),$=u(f.pendingAssistantEchoIds,H),_=j1(b,w,T,"chatState",O,$,f.pendingAssistantEchoByUserId);if(l1(f,T,H,L,q(b).id),I(f.pendingPromptEchoIds,H,_,O),I(f.pendingAssistantEchoIds,H,_,$),_.length)G(p,_,w.activeSessionId)}catch{}}function z1(b,p,w=Fb(b)){let f=p?{sessionId:p}:{};if(w)f.workspacePath=w;return f}function a0(b){return{activeSessionId:b.activeSessionId,messages:b.messages,runId:b.runId,isStreaming:b.isStreaming}}function l1(b,p,w,f,h){if(p.isStreaming===!0&&typeof p.runId==="string"&&p.runId){b.activeRunId=p.runId,b.activeRunSessionId=typeof p.activeSessionId==="string"&&p.activeSessionId?p.activeSessionId:w,b.activeRunWorkspacePath=f,b.activeRunWorkspaceId=h,b.onRunStateChange?.();return}if(p.isStreaming===!1&&(!p.activeSessionId||p.activeSessionId===b.activeRunSessionId))b.activeRunId=void 0,b.activeRunSessionId=void 0,b.activeRunWorkspacePath=void 0,b.activeRunWorkspaceId=void 0,b.onRunStateChange?.()}function Fb(b){return q(b).path}function q(b){let p=b.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),w=p?.activeWorkspaceId||b.app?.dataset.activeWorkspaceId||"",f=p?.workspaces?.find((h)=>h.id===w)?.path||"";return{id:w,path:f}}function N1(b,p){let w=b.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),f=p.workspaceId||w?.activeWorkspaceId||b.app?.dataset.activeWorkspaceId||"",h=w?.workspaces?.find((L)=>L.id===f)?.path||"";if(h||f!==w?.activeWorkspaceId)return{id:f,path:h};return q(b)}function j1(b,p,w,f,h="",L="",i=new Map){let T=Db(w.messages);if(typeof w.activeSessionId==="string"&&w.activeSessionId){let _=p.activeSessionId;if(k(p,w.activeSessionId),v(b,{sessionId:w.activeSessionId,workspaceId:b.app?.dataset.activeWorkspaceId||s(b)||void 0}),f!=="chatState"||_!==w.activeSessionId)r(b,"chat-session",{reason:f,sessionId:w.activeSessionId});if(f!=="chatState")Jb(b,w.activeSessionId,f)}let H=S(p);if(!T.length)return[];let O=K1(H.messages,T,h,L,i).slice(-g);if(!V1(H.messages,O))return[];H.messages=O;let $=qb(H);if(H.updatedAt=Date.now(),y(p),$)Gb(H.id,$);return H.messages}function V1(b,p){if(b.length!==p.length)return!0;return b.some((w,f)=>Nb(w)!==Nb(p[f]))}function Nb(b){return JSON.stringify({id:b.id,role:b.role,text:b.text,blocks:b.blocks,thinking:b.thinking,streaming:b.streaming,toolCalls:b.toolCalls,attachments:b.attachments})}function o0(b,p,w,f,h,L=""){let i=Db(w.messages),T=typeof w.activeSessionId==="string"&&w.activeSessionId?w.activeSessionId:h,H=p.activeSessionId===h;if(T!==h)if(H)k(p,T),v(b,{sessionId:T,workspaceId:q(b).id||void 0}),r(b,"chat-session",{reason:f,sessionId:T}),Jb(b,T,f);else F(p,T);let O=Array.isArray(L)?L:[L].filter(Boolean);if(T!==h)for(let l of O)W1(p,h,T,l);let $=F(p,T);if(!i.length)return[];let _=K1($.messages,i,L).slice(-g);if(!V1($.messages,_))return[];$.messages=_;let R=qb($);if($.updatedAt=Date.now(),y(p),R)Gb($.id,R);return $.messages}function t0(b,p,w,f,h){let L=(O,$)=>{if(!O?.sessionId){if(!$)nb(p,w,f,h,!0);return}if(y1(p,f,O))return;v(p,O),k(f,O.sessionId),G(w,S(f).messages,f.activeSessionId);let _=N1(p,O);e(p,w,f,h,O.sessionId,_.path,_.id)},i=(O)=>{if(s0(p,w,f,h,O))return;let $=bp(p,O);if($)L($,!1)},T=p.app?.piWebSidebar?.channels?.selectedSession$||globalThis.piWebSidebar?.channels?.selectedSession$,H=p.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$;if(T){let O=!0;b.add(T.subscribe(($)=>{L($,O),O=!1}))}if(H)b.add(H.subscribe(i));if(p.app)b.listen(p.app,"pi-web-sidebar:session-created",(O)=>{let $=O.detail||{},_=typeof $.sessionId==="string"?$.sessionId:"",R=typeof $.workspaceId==="string"?$.workspaceId:"";if(_)L({sessionId:_,workspaceId:R||void 0},!1)});if(globalThis.piWeb){let O=!0;b.add(globalThis.piWeb.behaviorSubject(b1,M(p)).subscribe((_)=>{L(_,O),O=!1})),b.add(globalThis.piWeb.subject(p1).subscribe(i));let $=!0;b.add(globalThis.piWeb.behaviorSubject("session.activeId",null).subscribe((_)=>{if(!_){if(!$)nb(p,w,f,h,!1);$=!1;return}$=!1,L({sessionId:_,workspaceId:p.app?.dataset.activeWorkspaceId||v1(Zb)||void 0},!1)}))}}function nb(b,p,w,f,h){if(f.backendChatToken+=1,f.runEventsAbort?.abort(),f.sessionEventsAbort?.abort(),w.activeSessionId="",y(w),h)i1(b);else{let L=M(b);if(L?.sessionId&&b.app)b.app.dataset.clearedSessionId=L.sessionId}bb(p)}function Z1(b,p){let w=M(b);if(w?.sessionId&&!y1(b,p,w))v(b,w),k(p,w.sessionId);if(!p.activeSessionId)return F(p,"",!0).id;return p.activeSessionId}function y1(b,p,w){let f=w.workspaceId||"",h=b.app?.dataset.activeWorkspaceId||v1(Zb)||"";return p.activeSessionId===w.sessionId&&(!f||f===h)}function s0(b,p,w,f,h){if(h.type!=="session.deleted")return!1;let L=J1(h);if(!L)return!0;let i=w.activeSessionId===L,T=w.sessions.length;if(w.sessions=w.sessions.filter((H)=>H.id!==L),i){f.runEventsAbort?.abort(),f.sessionEventsAbort?.abort();let H=e0(b,h,L);if(H?.sessionId){v(b,H),k(w,H.sessionId),wp(p,S(w).messages,w.activeSessionId);let O=N1(b,H);return e(b,p,w,f,H.sessionId,O.path,O.id),!0}return w.activeSessionId="",i1(b),y(w),bb(p),!0}if(w.sessions.length!==T)y(w);return!0}function e0(b,p,w){let f=p.snapshot?.activeSessionId||"",h=p.snapshot?.activeWorkspaceId||"";if(f&&f!==w)return{sessionId:f,workspaceId:h||void 0};let L=M(b);if(L?.sessionId&&L.sessionId!==w)return L;return null}function bp(b,p){if(!pp(p.type))return null;let w=p.detail||{},f=J1(p)||p.snapshot?.activeSessionId||"",h=typeof w.workspaceId==="string"?w.workspaceId:p.snapshot?.activeWorkspaceId||b.app?.dataset.activeWorkspaceId||"";if(!f)return null;return{sessionId:f,workspaceId:h||void 0}}function J1(b){let p=b.detail||{};if(typeof p.sessionId==="string")return p.sessionId;if(typeof p.id==="string")return p.id;return""}function pp(b){return b==="session.selected"||b==="session.created"||b==="new-session"||b==="active.start"}function k(b,p){let w=b.sessions.find((f)=>f.id===p);if(!w)w=pb(p),b.sessions.unshift(w);return b.activeSessionId=w.id,y(b),w}function G(b,p,w){if(A1(p,w),!p.length){bb(b);return}let f=b.querySelector(".term-inner")||b;G1(f,p,w),Ab(b)}function wp(b,p,w){A1(p,w);let f=b.querySelector(".term-inner")||b;G1(f,p,w),Ab(b)}function G1(b,p,w){let f=hp(b),h=p.map((T)=>{let H=`${w}:${Nb(T)}`,O=f.get(T.id);if(O){if(Rb.get(O)!==H)fp(O,T,w,H);return O}let $=C1(T,w);return Rb.set($,H),$}),L=new Set(h),i=b.firstChild;for(let T of h){if(i!==T)b.insertBefore(T,i);i=T.nextSibling}for(let T of Array.from(b.children)){if(jb(b,T)&&!L.has(T)){T.remove();continue}if(!jb(b,T))T.remove()}}function fp(b,p,w,f){let h=C1(p,w);if(b.replaceChildren(...Array.from(h.childNodes)),b.className=h.className,b.dataset.messageId=p.id,p.streaming)b.dataset.streaming="true";else delete b.dataset.streaming;Rb.set(b,f)}function hp(b){let p=new Map;for(let w of Array.from(b.children)){if(!jb(b,w))continue;let f=w.dataset.messageId||"";if(f)p.set(f,w)}return p}function jb(b,p){let w=b.ownerDocument.defaultView;return Boolean(w&&p instanceof w.HTMLElement&&p.classList.contains("transcript-item"))}function bb(b){let p=b.querySelector(".term-inner")||b,w=document.createElement("article");w.className="pi-web-chat-docs",w.setAttribute("aria-label","pi-web-chat guide");let f=document.createElement("h1");f.textContent="pi-web-chat guide";let h=document.createElement("p");h.textContent=["Select or create a session in the sidebar to load chat history,","or type below to start a new session."].join(" ");let L=document.createElement("ul");for(let i of["Ask pi in the prompt box and press Cmd/Ctrl+Enter to send.","Type ! then Space at the start to turn the prompt yellow and run shell commands in the workspace.","Queued file attachments hide during shell mode and reappear for the next normal prompt.","Type @ to list project files, then pick one to tag it as prompt context.","Type / at the start to open the slash command list.","Chats are cached locally after you start or select a session."]){let T=document.createElement("li");T.textContent=i,L.append(T)}w.append(f,h,L),p.replaceChildren(w),Ab(b)}function Lp(b,p){let w=p.querySelector(".term"),f=p.querySelector("[data-action='scroll-bottom']");if(!w||!f)return;let h={term:w,button:f,pinned:!0,touchStartY:null};zb.set(p,h),f.hidden=!1,t(h),b.listen(f,"click",()=>{h.pinned=!0,q1(h),t(h)}),b.listen(w,"wheel",(L)=>{if(L.deltaY<0)ab(h)}),b.listen(w,"touchstart",(L)=>{let i=L;h.touchStartY=i.touches.item(0)?.clientY??null}),b.listen(w,"touchmove",(L)=>{let T=L.touches.item(0)?.clientY;if(typeof T==="number"&&h.touchStartY!==null&&T-h.touchStartY>8)ab(h)}),b.listen(w,"touchend",()=>{h.touchStartY=null}),b.add({remove:()=>{zb.delete(p)}})}function Ab(b){let p=zb.get(b);if(!p)return;if(p.pinned)q1(p);t(p)}function q1(b){b.term.scrollTop=b.term.scrollHeight}function ab(b){b.pinned=!1,t(b)}function t(b){b.button.dataset.pinned=b.pinned?"true":"false",b.button.setAttribute("aria-pressed",b.pinned?"true":"false")}function C1(b,p){let w=document.createElement("article");if(w.className="transcript-item",w.dataset.messageId=b.id,ip(b))Tp(w,b,p);else if(Hp(b)){let f=$p(b);if(f)Yb(w,b.role,b.text);Rp(w,b,p,f)}else zp(w,b,p);if(b.streaming)w.dataset.streaming="true";return w}function ip(b){return b.role==="user"&&b.meta?.piWebChatSteeringState==="pending"}function Tp(b,p,w){let f=document.createElement("div");f.className="msg pending-steering",f.dataset.kind="user";let h=document.createElement("span");h.className="prefix user",h.textContent=D1("user");let L=document.createElement("small");L.className="body user pending-steering-text",L.textContent=p.text;let i=document.createElement("button");i.type="button",i.className="pending-steering-cancel",i.dataset.action="cancel-steering",i.dataset.sessionId=w,i.dataset.messageId=p.id,i.setAttribute("aria-label","cancel steering"),i.title="cancel steering",i.textContent="×",f.append(h,L,i),b.append(f)}function Hp(b){return Boolean(b.blocks?.some((p)=>{return p.type==="tool"||p.text.trim().length>0}))}function $p(b){return Boolean(b.text.trim())&&(!Op(b)||_p(b))}function Op(b){return Boolean(b.blocks?.some((p)=>{return p.type==="text"&&p.text.trim().length>0}))}function _p(b){return(b.blocks?.length||0)>=yb}function Rp(b,p,w,f=!1){for(let h of p.blocks||[])if(h.type==="text"){if(!f)Yb(b,p.role,h.text)}else if(h.type==="thinking")b.append(F1(h.text,Boolean(p.streaming)));else if(h.type==="tool"&&h.toolCall){let L=p.toolCalls?.find((i)=>i.id===h.toolCall?.id)||h.toolCall;b.append(Y1(L,Xb(w,p,L)))}}function zp(b,p,w){if(lp(p))Yb(b,p.role,p.text);if(p.thinking)b.append(F1(p.thinking,Boolean(p.streaming)));for(let f of p.toolCalls||[])b.append(Y1(f,Xb(w,p,f)))}function Yb(b,p,w){if(p==="assistant"&&!w.trim())return;let f=document.createElement("div");f.className="msg",f.dataset.kind=_b(p);let h=document.createElement("span");h.className=`prefix ${_b(p)}`,h.textContent=D1(p);let L=document.createElement("pre");L.className=`body ${_b(p)}`,L.textContent=w,f.append(h,L),b.append(f)}function lp(b){let p=b.text.trim().length>0;return b.role!=="assistant"||p}function F1(b,p){let w=document.createElement("details");w.className="msg-detail think thinking-block",w.open=p;let f=document.createElement("summary");f.className="label",f.textContent="THINKING";let h=document.createElement("pre");return h.className="body",h.textContent=b,w.append(f,h),w}function A1(b,p){let w=new Set;for(let f of b)for(let h of f.toolCalls||[])w.add(Xb(p,f,h));for(let f of B)if(!w.has(f))B.delete(f)}function Xb(b,p,w){return`${b}:${p.id}:${w.id}`}function Y1(b,p){let w=document.createElement("div");w.className="tool-card",w.dataset.tool=b.name||"tool",w.dataset.status=b.status;let f=!B.has(p);w.dataset.collapsed=f?"true":"false";let h=document.createElement("button");if(h.type="button",h.className="tc-head",h.title=f?"Show tool output":"Hide tool output",h.setAttribute("aria-expanded",f?"false":"true"),h.setAttribute("aria-label",X1(b,f)),h.append(Zp(b),yp(b),Jp(b),Gp(b,f)),!f)w.append(Q1(b));return h.addEventListener("click",()=>Vp(w,h,b,p)),w.prepend(h),w}function X1(b,p){let w=p?"Show":"Hide",f=b.status==="running"?"running":b.status==="err"?"failed":"done",h=Np(b),L=h?`, ${h}`:"";return`${w} ${b.name||"tool"} output, ${f}${L}`}function Np(b){if(b.argsStatus==="present")return"arguments present";if(b.argsStatus)return n(b);return b.args?"arguments present":""}function Q1(b){let p=document.createElement("pre");return p.className="tc-body",p.textContent=b.text||Lb(b),p}function jp(){let b=document.createElement("span");b.className="spinner",b.setAttribute("aria-hidden","true");for(let p=0;p<h0;p+=1)b.append(document.createElement("span"));return b}function Vp(b,p,w,f){let h=b.querySelector(".tc-body"),L=h!==null;if(h)h.remove(),B.delete(f);else b.append(Q1(w)),B.add(f);b.dataset.collapsed=L?"true":"false",p.setAttribute("aria-expanded",L?"false":"true"),p.setAttribute("aria-label",X1(w,L)),p.title=L?"Show tool output":"Hide tool output";let i=p.querySelector(".tc-toggle-label");if(i)i.textContent=L?"show":"hide"}function Zp(b){let p=document.createElement("span");p.className="tc-glyph";let w=qp(b),f=w?i0[w]:"";if(!w||!f)return p.textContent="●",p;return p.innerHTML=`<svg class="tc-icon" data-tool-icon="${w}" aria-hidden="true" viewBox="0 0 24 24">${f}</svg>`,p}function yp(b){let p=document.createElement("span");return p.className="tc-name",p.textContent=b.name||"tool",p}function Jp(b){let p=document.createElement("span");return p.className="tc-args",p.textContent=n(b),p}function Gp(b,p){let w=document.createElement("span");if(w.className="tc-meta",b.status==="running"){let L=jp(),i=document.createElement("span");return i.className="running",i.textContent="running",w.append(L,i,ob(p)),w}let f=document.createElement("span");f.className=b.status==="err"?"err":"ok",f.textContent=b.status==="err"?"✗":"✓";let h=document.createElement("span");return h.textContent=b.status==="err"?" · failed":" · done",w.append(f,h,ob(p)),w}function ob(b){let p=document.createElement("span");p.className="tc-toggle";let w=document.createElement("span");w.className="tc-toggle-label",w.textContent=b?"show":"hide";let f=document.createElement("span");return f.className="tc-caret",f.textContent="▸",p.append(w,f),p}function qp(b){let p=Cp(b.name);if(["bash","shell","sh","zsh","terminal"].includes(p))return Fp(n(b).toLowerCase())||"terminal";return T0[p]}function Cp(b){return b.trim().replace(/^functions\./,"").replace(/^multi_tool_use\./,"")}function Fp(b){if(/\bgit\b|\bgh\b/.test(b))return"git-branch";if(/\b(go test|bun test|npm test|pnpm test|yarn test|vitest|pytest|cargo test)\b/.test(b))return"circle-check";if(/\b(bun|npm|pnpm|yarn)\s+(run\s+)?build\b|\b(go build|cargo build)\b/.test(b))return"hammer";if(/\b(bun|npm|pnpm|yarn)\s+(add|install|i)\b|\bpip\s+install\b|\bgo\s+get\b/.test(b))return"package";return}function D1(b){if(b==="assistant")return"pi >";if(b==="user")return"you >";if(b==="system")return"sys >";return"tool >"}function _b(b){if(b==="assistant")return"pi";if(b==="system")return"sys";return b}function Ap(b){let p=/^\/([^\s/]*)$/.exec(b);return p?p[1].toLowerCase():null}function Yp(b){let p=/(?:^|\s)@([^\s@`]*)$/.exec(b);return p?p[1]:null}function op(b){return b.length>0}function tp(b,p){return b.trim().startsWith("!")&&p}function K1(b,p,w="",f="",h=new Map){let L=tb(w),i=tb(f),T=new Map,H=new Map,O=new Map(h),$=p.length;for(let l of b)T.set(l.id,l),H.set(l.id,$++);let _=new Set,R=new Set;return p.forEach((l,j)=>{let N=Qp(b,l,L,_);if(N){_.add(N.id);let J=U1(b,N.id,i,R);if(J)O.set(l.id,J),h.set(l.id,J);sb(T,H,N.id,l,j);return}let z=Dp(b,p,l,j,i,R,O);if(z){R.add(z),Xp(h,z),sb(T,H,z,l,j);return}H.set(l.id,j),T.set(l.id,{...T.get(l.id),...l})}),[...T.values()].sort((l,j)=>{let N=(H.get(l.id)??0)-(H.get(j.id)??0);if(N!==0)return N;return l.createdAt-j.createdAt})}function tb(b){return Array.isArray(b)?b:[b].filter(Boolean)}function Xp(b,p){for(let[w,f]of b)if(f===p)b.delete(w)}function sb(b,p,w,f,h){b.delete(w),b.set(f.id,f),p.delete(w),p.set(f.id,h)}function Qp(b,p,w,f){if(!w.length||p.role!=="user"||!p.text.trim())return;if(b.some((h)=>h.id===p.id))return;return b.find((h)=>{return w.includes(h.id)&&!f.has(h.id)&&h.role===p.role&&h.text.trim()===p.text.trim()})}function Dp(b,p,w,f,h,L,i){if(w.role!=="assistant"||f<=0)return"";let T=p[f-1];if(T?.role!=="user")return"";let H=i.get(T.id)||"";if(H&&!L.has(H))return H;return U1(b,T.id,h,L)}function U1(b,p,w,f){let h=b.findIndex((i)=>i.id===p);if(h<0)return"";let L=b[h+1];if(L?.role==="assistant"&&w.includes(L.id)&&!f.has(L.id))return L.id;return""}function Vb(b,p,w){b.set(p,[...b.get(p)||[],w])}function u(b,p){return b.get(p)||[]}function Kp(b,p,w){let f=(b.get(p)||[]).filter((h)=>h!==w);if(f.length){b.set(p,f);return}b.delete(p)}function Up(b,p,w){let f=b.get(p)||[];if(!f.length)return;b.delete(p),b.set(w,[...b.get(w)||[],...f])}function I(b,p,w,f){if(!f.length||!w.length)return;let h=f.filter((L)=>{return w.some((i)=>i.id===L)});if(h.length){b.set(p,h);return}b.delete(p)}function S(b){return F(b,b.activeSessionId,!0)}function F(b,p,w=!1){let f=b.sessions.find((h)=>h.id===p);if(!f)f=pb(p||void 0),b.sessions.unshift(f),y(b);if(w||!b.activeSessionId)b.activeSessionId=f.id,y(b);return f}function W1(b,p,w,f){if(p===w)return;let h=b.sessions.find((H)=>H.id===p),L=h?.messages.findIndex((H)=>H.id===f)??-1;if(!h||L<0)return;let[i]=h.messages.splice(L,1),T=F(b,w);if(!T.messages.some((H)=>H.id===i.id))T.messages.push(i);h.updatedAt=Date.now(),T.updatedAt=Date.now(),M1(b,h.id),y(b)}function M1(b,p){let w=b.sessions.find((f)=>f.id===p);if(!w||w.id===b.activeSessionId||w.messages.length>0||w.title!=="New chat")return;b.sessions=b.sessions.filter((f)=>f.id!==w.id)}function pb(b=Q()){let p=Date.now();return{id:b,title:"New chat",createdAt:p,updatedAt:p,messages:[]}}function v1(b){try{return localStorage.getItem(b)||""}catch{return""}}function Wp(b){let p=pb(b);return{activeSessionId:p.id,sessions:[p]}}function Mp(){try{let b=JSON.parse(localStorage.getItem(o)||"null");if(b&&Array.isArray(b.sessions))return{activeSessionId:"",sessions:b.sessions.filter(P1).map(E1)}}catch{}return{activeSessionId:"",sessions:[]}}function vp(b=""){try{let p=JSON.parse(localStorage.getItem(o)||"null");if(p&&typeof p.activeSessionId==="string"&&Array.isArray(p.sessions)){let w=p.sessions.filter(P1).map(E1);if(b&&!w.some((f)=>f.id===b))w.unshift(pb(b));return{activeSessionId:b||p.activeSessionId,sessions:w}}}catch{}return Wp(b||void 0)}function y(b){eb(b);try{localStorage.setItem(o,JSON.stringify(b))}catch{for(let p of b.sessions)p.messages=p.messages.slice(-Math.floor(g/2));eb(b);try{localStorage.setItem(o,JSON.stringify(b))}catch{}}}function Qb(b){if(!b?.length)return;return b.map(({content:p,...w})=>w)}function eb(b){b.sessions.sort((f,h)=>h.updatedAt-f.updatedAt);let p=b.sessions.find((f)=>f.id===b.activeSessionId),w=b.sessions.filter((f)=>f.id!==b.activeSessionId).slice(0,Math.max(0,cb-1));b.sessions=p?[p,...w]:b.sessions.slice(0,cb);for(let f of b.sessions)if(f.messages.length>g)f.messages.splice(0,f.messages.length-g)}function P1(b){return A(b)&&typeof b.id==="string"&&Array.isArray(b.messages)}function E1(b){return{...b,messages:Db(b.messages)}}function Db(b){return Array.isArray(b)?b.filter(gp).map(Pp):[]}function Pp(b){let p={...b};if(Array.isArray(b.toolCalls))p.toolCalls=b.toolCalls.filter(B1);else delete p.toolCalls;if(Array.isArray(b.blocks))p.blocks=b.blocks.filter(Bp).map(Ep);else delete p.blocks;return p}function Ep(b){if(b.type!=="tool"){let{toolCall:p,...w}=b;return w}return b}function Bp(b){if(!A(b)||typeof b.id!=="string"||typeof b.text!=="string")return!1;if(b.type==="text"||b.type==="thinking")return!0;return b.type==="tool"&&B1(b.toolCall)}function B1(b){if(!A(b)||typeof b.id!=="string"||typeof b.name!=="string")return!1;return typeof b.text==="string"&&xp(b.status)&&kp(b.argsStatus)}function kp(b){return b===void 0||b==="present"||b==="empty"||b==="unavailable"||b==="truncated"||b==="omitted"}function xp(b){return b==="running"||b==="ok"||b==="err"}function gp(b){if(!A(b)||typeof b.id!=="string"||typeof b.text!=="string")return!1;return typeof b.createdAt==="number"&&rp(b.role)}function rp(b){return b==="user"||b==="assistant"||b==="tool"||b==="system"}function A(b){return typeof b==="object"&&b!==null}function Q(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`}function k1(b){return b instanceof Error&&(b.name==="AbortError"||/aborted|abort/i.test(b.message))}function wb(b){return b instanceof Error?b.message:String(b)}export{n as toolArgsInlineText,Lb as toolArgsBodyText,ap as submittedAttachmentsForText,tp as shellAttachmentNoteVisible,d1 as setComposerMode,d as renderPromptMeta,S1 as renderMessages,a1 as promptFromAgUiLikeRunInput,xb as pluginStyleText,hb as pluginClass,np as mergeCommands,op as hasQueuedAttachmentNames,s as getActiveWorkspaceId,C0 as formatShellOutput,L1 as extractRefs,H0 as default,Eb as createComposerSurface,Pb as createChatSurface,I1 as createChatDom,dp as createChannels,n1 as createAgUiLikeRunInput,a as commandName,o1 as chatEventsToAgUiLikeEvents,X as backendCall};
