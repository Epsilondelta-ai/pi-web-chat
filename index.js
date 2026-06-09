var _={attachFile:["M16.5 6v11.5a4 4 0 0 1-8 0V5a2.5 2.5 0 0 1 5 0v10.5a1 1 0 0 1-2 0V6H10v9.5","a2.5 2.5 0 0 0 5 0V5a4 4 0 0 0-8 0v12.5a5.5 5.5 0 0 0 11 0V6h-1.5Z"].join(""),stop:"M6 6h12v12H6V6Z",send:"M2 21 23 12 2 3v7l15 2-15 2v7Z",terminal:"M3 4h18v16H3V4Zm2 2v12h14V6H5Zm2 3 1.1-1.1L12.2 12l-4.1 4.1L7 15l3-3-3-3Zm6 6h5v1.5h-5V15Z",file:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 2.5L17.5 8H14V4.5ZM8 13h8v1.5H8V13Zm0 3h8v1.5H8V16Z"},z={attachFile:A("attach_file",_.attachFile),stop:A("stop",_.stop),send:A("send",_.send)};function A(i,p){return`<svg class="material-icon" data-material-icon="${i}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="${p}"></path></svg>`}function P(){return"pi-web-chat-mounted"}function K(){let i=document.createElement("main");return i.className="main pi-web-chat-surface",i.dataset.main="session",i.innerHTML='<div class="term"><div class="term-inner" role="log" aria-live="polite" aria-relevant="additions text"></div></div><button type="button" class="scroll-bottom-btn" data-action="scroll-bottom" aria-label="scroll to bottom" title="scroll to bottom" hidden>↓</button>',i}function X(){let i=document.createElement("section");return i.className="prompt-region pi-web-chat-composer",i.innerHTML=`
    <div class="slash-pop" hidden><div class="slash-head">slash commands · type to filter</div><div class="slash-list"></div></div>
    <div class="prompt-bar">
      <button class="attach-btn" type="button" aria-label="attach files" title="attach files">${z.attachFile}</button>
      <input type="file" multiple hidden data-file-input />
      <div class="prompt-input-col"><div class="attach-chips" hidden></div><textarea class="prompt-textarea" aria-label="Prompt" placeholder="ask pi to do something…" rows="1"></textarea></div>
      <div class="prompt-actions">
        <button class="stop-btn" type="button" aria-label="stop" title="stop" hidden>${z.stop}</button>
        <button class="mic-btn" type="button" data-action="toggle-speech-input" aria-label="start voice input" title="voice input" hidden>\uD83C\uDF99</button>
        <button class="send-btn" type="button" aria-label="send" title="send" aria-disabled="true">${z.send}</button>
      </div>
      <div class="drop-overlay" hidden><span>drop to attach</span></div>
    </div>
    <div class="prompt-meta" data-prompt-meta>— | <span class="prompt-meta-item prompt-meta-branch"><span>—</span></span></div>`,i}function Q(i){let p=document.createElement("span");return p.className="prompt-meta-item pi-web-chat-badge",p.textContent="chat plugin",i.querySelector("[data-prompt-meta]")?.append(p),p}function ai(){let i=document.createElement("section");return i.className="pi-web-chat-root",i.dataset.plugin="pi-web-chat",i.innerHTML=`
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
      <div class="pi-web-chat-prompt-bar">
        <button class="pi-web-chat-icon-btn" type="button" data-attach aria-label="attach files" title="attach files">${A("attach_file",_.attachFile)}</button>
        <input type="file" multiple hidden data-file-input />
        <textarea class="pi-web-chat-textarea" data-chat-input placeholder="ask pi to do something…" rows="1"></textarea>
        <button class="pi-web-chat-send" type="button" data-send aria-label="send" title="send" aria-disabled="true">${A("send",_.send)}</button>
      </div>
    </section>`,{root:i,transcript:n(i.querySelector("[data-chat-transcript]")),textarea:n(i.querySelector("[data-chat-input]")),sendButton:n(i.querySelector("[data-send]")),attachButton:n(i.querySelector("[data-attach]")),fileInput:n(i.querySelector("[data-file-input]")),slashPopover:n(i.querySelector("[data-slash-popover]")),slashList:n(i.querySelector("[data-slash-list]")),refsPopover:n(i.querySelector("[data-refs-popover]")),refsList:n(i.querySelector("[data-refs-list]")),attachments:n(i.querySelector("[data-attachments]"))}}function W(i,p){i.hidden=p.length===0,i.replaceChildren(...p.map((r)=>{let l=document.createElement("span");return l.className="pi-web-chat-attachment-chip",l.textContent=r,l}))}function d(){return`
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

    .pi-web-chat-composer .material-icon,
    .pi-web-chat-root .material-icon {
      display: block;
      width: 16px;
      height: 16px;
      pointer-events: none;
    }

    .pi-web-chat-surface .msg-detail {
      margin: -8px 0 14px 64px;
      color: var(--fg-2, #c9d1d9);
    }

    .pi-web-chat-surface .msg-detail summary {
      cursor: pointer;
      color: var(--fg-3, #8a8f98);
      font-size: var(--text-sm, 12px);
    }

    .pi-web-chat-surface .msg-detail .body {
      margin: 6px 0 0;
      white-space: pre-wrap;
      overflow-wrap: anywhere;
      font: inherit;
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
  `}function S(){document.getElementById("pi-web-chat-style")?.remove();let i=document.createElement("style");return i.id="pi-web-chat-style",i.textContent=d(),document.head.append(i),i}function I(i){return i.command||i.cmd||(i.name?`/${i.name}`:"")}function n(i){if(!i)throw Error("pi-web-chat DOM template is invalid");return i}function gi(i,p,r){return{threadId:i,runId:p,state:{},messages:r,tools:[],context:[]}}function Li(i){let p=[...i.messages].reverse().find((r)=>r.role==="user");return{text:p?.text||"",attachments:p?.attachments||[],sessionId:i.threadId}}function Ti(i,p,r){return i.map((l)=>ui(l,p,r))}function ui(i,p,r){if(i.type==="text.delta")return{type:"TEXT_MESSAGE_CONTENT",threadId:p,runId:r,delta:i.delta||""};if(i.type==="thinking.delta")return{type:"THINKING_MESSAGE_CONTENT",threadId:p,runId:r,delta:i.delta||""};if(i.type==="tool.start")return{type:"TOOL_CALL_START",threadId:p,runId:r,toolCallId:i.toolCallId,payload:o(i)};if(i.type==="tool.delta")return{type:"TOOL_CALL_ARGS",threadId:p,runId:r,toolCallId:i.toolCallId,delta:i.delta||""};if(i.type==="tool.end")return{type:"TOOL_CALL_END",threadId:p,runId:r,toolCallId:i.toolCallId,payload:o(i)};return{type:i.type.toUpperCase().replaceAll(".","_"),threadId:p,runId:r,payload:i}}function o(i){return{name:i.toolName||"tool",args:i.args||{},result:i.result||"",isError:i.isError===!0}}var Z="pi-web-chat.sessions.v1";var ii="plugin.pi-web-sidebar.selectedSession",pi="plugin.pi-web-sidebar.event",ri="plugin.pi-web-sidebar.activeSessionId",V="plugin.pi-web-sidebar.activeWorkspaceId";var m=20,R=200,ni=8,Ei=1e6;class li{#i=[];add(i){if(i)this.#i.push(i);return i}listen(i,p,r){i.addEventListener(p,r),this.add({remove:()=>i.removeEventListener(p,r)})}dispose(){for(let i of this.#i.splice(0).reverse())if(typeof i==="function")i();else if("unsubscribe"in i)i.unsubscribe();else i.remove()}}function Ci(i={}){let p=i.app;if(p?.piWebChat?.dispose(),typeof i.mount?.chat!=="function"||typeof i.mount?.composer!=="function")throw Error("pi-web-chat requires modern pi-web mount.chat and mount.composer APIs");return yi(i,p)}function yi(i,p){let r=new li,l=r.add(S()),h=K(),b=X(),c=i.mount?.chat(h,{replace:!0}),w=i.mount?.composer(b,{replace:!0});if(c)r.add(c);if(w)r.add(w);let a=G(i);$(i,a||void 0);let f=ji(a?.sessionId||""),g={backendChatToken:0};C(h,y(f).messages),q(i,h,f,g,a?.sessionId||f.activeSessionId),Di(r,i,h,f,g),Oi(r,i,b,h,f,g);let L=p?r.add(Q(p)):void 0;p?.classList.add(P());let u={dispose:()=>r.dispose()};if(p)p.piWebChat=u;return()=>{if(r.dispose(),L?.remove(),l.remove(),p?.classList.remove(P()),p?.piWebChat===u)delete p.piWebChat}}function Oi(i,p,r,l,h,b){let c=r.querySelector(".prompt-textarea"),w=r.querySelector(".send-btn"),a=r.querySelector(".attach-btn"),f=r.querySelector("[data-file-input]"),g=r.querySelector(".attach-chips");if(!c||!w)return;let L=[],u=()=>{let T=c.value;w.setAttribute("aria-disabled",T.trim()?"false":"true")},j=()=>{if(!g)return;W(g,L.map((T)=>{return T.name||"attachment"}))},k=async(T)=>{T?.preventDefault(),T?.stopImmediatePropagation();let E=c.value.trim();if(u(),!E)return;let Y=[...L];w.disabled=!0;try{if(Ni(E,Y),await Hi(p,l,h,b,E,Y),L=[],j(),c.value="",f)f.value=""}catch(fi){C(l,[_i(fi)])}finally{w.disabled=!1,u()}};if(i.listen(c,"input",u),i.listen(c,"keydown",(T)=>{let E=T;if(E.key==="Enter"&&(E.metaKey||E.ctrlKey))k(E)}),i.listen(w,"click",(T)=>{k(T)}),a&&f)i.listen(a,"click",()=>f.click()),i.listen(f,"change",()=>{Ai(f,(T)=>{L=T,j()})})}function _i(i){return{id:x(),role:"system",text:`prompt failed: ${wi(i)}`,createdAt:Date.now()}}async function Ai(i,p){let r=Array.from(i.files||[]).slice(0,ni),l=[];for(let h of r){if(h.size>Ei)continue;l.push({name:h.name,size:h.size,content:await h.text(),mimeType:h.type||void 0})}p(l)}function oi(i){return{input$:i.behaviorSubject("chat.input",""),submitted$:i.subject("chat.input.submitted"),activeSessionId$:i.behaviorSubject("session.activeId",null),sidebarSelectedSession$:i.behaviorSubject(ii,Ri()),toastRequested$:i.subject("toast.requested")}}function mi(i){let p=[],r=new Set,l=/(^|[\s`])@([^\s@`]+)/g,h=l.exec(String(i||""));while(h!==null){let b=h[2]||"";if((h[1]||"")!=="`"&&b&&!r.has(b))r.add(b),p.push(b);h=l.exec(String(i||""))}return p}function ti(i=[],p=[]){let r=[],l=new Set;for(let h of[...i,...p]){let b=I(h);if(!b||l.has(b))continue;l.add(b),r.push(h)}return r}function N(i){return i.app?.piWebSidebar?.getSnapshot?.().activeWorkspaceId||i.app?.dataset.activeWorkspaceId||""}function Ri(){return G({})}function G(i){let p=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),r=p?.activeSessionId||"",l=p?.activeWorkspaceId||"";if(r)return{sessionId:r,workspaceId:l||void 0};let h=D(ri),b=D(V);return h?{sessionId:h,workspaceId:b||void 0}:null}function $(i,p){if(p?.workspaceId&&i.app)i.app.dataset.activeWorkspaceId=p.workspaceId,t(V,p.workspaceId);if(p?.sessionId)i.app?.setAttribute("data-active-session-id",p.sessionId),t(ri,p.sessionId)}function H(i,p,r={}){let l=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),h={type:p,detail:r,snapshot:l};(i.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$)?.next(h),globalThis.piWeb?.subject(pi).next(h)}function hi(i,p,r){let l=i.app?.dataset.activeWorkspaceId||N(i),h={reason:r,sessionId:p,workspaceId:l};globalThis.piWeb?.behaviorSubject("session.activeId",p).next(p),globalThis.piWeb?.subject("session.changed").next({sessionId:p,workspaceId:l,reason:r}),H(i,"active.start",h),H(i,"session.created",h)}function t(i,p){try{localStorage.setItem(i,p)}catch{}}async function v(i,p,r={}){if(!i.backend)return{};let l=N(i),h=await i.backend(p,{workspaceId:l,data:r});return F(h)?h:{}}async function Hi(i,p,r,l,h,b){let c={id:x(),role:"user",text:h,attachments:ci(b),createdAt:Date.now()},w=y(r);w.messages.push(c),w.updatedAt=Date.now(),O(r),C(p,w.messages);let a=await $i(i,h,b,r.activeSessionId);if(typeof a.activeSessionId==="string"&&a.activeSessionId){let g=r.activeSessionId,L=J(r,a.activeSessionId);if(g!==L.id&&!L.messages.some((u)=>u.id===c.id))L.messages.push(c),L.updatedAt=Date.now();$(i,{sessionId:a.activeSessionId,workspaceId:i.app?.dataset.activeWorkspaceId||N(i)||void 0}),H(i,"chat-session",{reason:"startPrompt",sessionId:a.activeSessionId}),hi(i,a.activeSessionId,"startPrompt")}if(typeof a.runId!=="string"||!a.runId){let g=await Fi(i,h,b,r.activeSessionId),L=bi(i,r,g,"submitPrompt");C(p,L);return}let f=xi(r);await Mi(i,r,a.runId,f,()=>C(p,y(r).messages)),await q(i,p,r,l,r.activeSessionId)}async function Mi(i,p,r,l,h){let b=0,c=!0;h();try{while(c){await Ui(120);let w=await v(i,"streamEvents",{runId:r,cursor:b}),a=Array.isArray(w.events)?w.events.filter(Pi):[];b=typeof w.cursor==="number"?w.cursor:b,c=w.isStreaming===!0,zi(l,a),l.streaming=c,y(p).updatedAt=Date.now(),O(p),h()}}finally{l.streaming=!1,O(p),h()}}function Ni(i,p){globalThis.piWeb?.subject("chat.input.submitted").next({text:i,attachments:ci(p)||[]})}async function $i(i,p,r,l){try{return await v(i,"startPrompt",{text:p,attachments:r,sessionId:l})}catch(h){if(vi(h))return{};throw h}}function vi(i){return/unknown method: startPrompt|unsupported method: startPrompt|startPrompt unsupported/i.test(wi(i))}async function Fi(i,p,r,l=""){return await v(i,"submitPrompt",{text:p,attachments:r,sessionId:l})}function xi(i){let p=y(i),r=[...p.messages].reverse().find((h)=>h.role==="assistant"&&h.streaming);if(r)return r;let l={id:x(),role:"assistant",text:"",createdAt:Date.now(),streaming:!0};return p.messages.push(l),l}function zi(i,p){for(let r of p)if(r.type==="text.delta"&&typeof r.delta==="string")i.text+=r.delta;else if(r.type==="thinking.delta"&&typeof r.delta==="string")i.thinking=`${i.thinking||""}${r.delta}`;else if(r.type==="tool.start")U(i,r,"running");else if(r.type==="tool.delta"&&typeof r.delta==="string"){let l=U(i,r,"running");l.text=r.delta}else if(r.type==="tool.end"){let l=U(i,r,r.isError?"err":"ok");if(typeof r.result==="string"&&r.result)l.text=r.result}else if(r.type==="error"&&typeof r.message==="string")i.text+=`${i.text?`
`:""}${r.message}`}function U(i,p,r){let l=p.toolCallId||p.toolName||"tool";i.toolCalls||=[];let h=i.toolCalls.find((b)=>b.id===l);if(!h)h={id:l,name:p.toolName||"tool",args:p.args,text:"",status:r},i.toolCalls.push(h);if(h.status=r,p.args)h.args=p.args;return h}function Pi(i){return F(i)&&typeof i.type==="string"}function Ui(i){return new Promise((p)=>globalThis.setTimeout(p,i))}async function q(i,p,r,l,h=""){let b=++l.backendChatToken;try{let c=await v(i,"chatState",Bi(i,h));if(b!==l.backendChatToken)return;let w=bi(i,r,c,"chatState");if(w.length)C(p,w)}catch{}}function Bi(i,p){let r=p?{sessionId:p}:{},l=Zi(i);if(l)r.workspacePath=l;return r}function Zi(i){let p=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),r=i.app?.dataset.activeWorkspaceId||p?.activeWorkspaceId||"";return p?.workspaces?.find((l)=>l.id===r)?.path||""}function bi(i,p,r,l){let h=Array.isArray(r.messages)?r.messages.filter(Yi):[];if(typeof r.activeSessionId==="string"&&r.activeSessionId){let c=p.activeSessionId;if(J(p,r.activeSessionId),$(i,{sessionId:r.activeSessionId,workspaceId:i.app?.dataset.activeWorkspaceId||N(i)||void 0}),l!=="chatState"||c!==r.activeSessionId)H(i,"chat-session",{reason:l,sessionId:r.activeSessionId});if(l!=="chatState")hi(i,r.activeSessionId,l)}let b=y(p);if(h.length){if(b.messages=h.slice(-R),b.title==="New chat"){let c=h.find((w)=>w.role==="user");if(c)b.title=c.text.slice(0,48)||b.title}b.updatedAt=Date.now()}return O(p),b.messages}function Di(i,p,r,l,h){let b=(f)=>{if(!f?.sessionId)return;$(p,f),J(l,f.sessionId),C(r,y(l).messages),q(p,r,l,h,f.sessionId)},c=(f)=>{let g=Vi(p,f);if(g)b(g)},w=p.app?.piWebSidebar?.channels?.selectedSession$||globalThis.piWebSidebar?.channels?.selectedSession$,a=p.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$;if(w)i.add(w.subscribe(b));if(a)i.add(a.subscribe(c));if(p.app)i.listen(p.app,"pi-web-sidebar:session-created",(f)=>{let g=f.detail||{},L=typeof g.sessionId==="string"?g.sessionId:"",u=typeof g.workspaceId==="string"?g.workspaceId:"";if(L)b({sessionId:L,workspaceId:u||void 0})});if(globalThis.piWeb)i.add(globalThis.piWeb.behaviorSubject(ii,G(p)).subscribe(b)),i.add(globalThis.piWeb.subject(pi).subscribe(c)),i.add(globalThis.piWeb.behaviorSubject("session.activeId",null).subscribe((f)=>{if(!f)return;b({sessionId:f,workspaceId:p.app?.dataset.activeWorkspaceId||D(V)||void 0})}))}function Vi(i,p){if(!Gi(p.type))return null;let r=p.detail||{},l=typeof r.sessionId==="string"?r.sessionId:p.snapshot?.activeSessionId||"",h=typeof r.workspaceId==="string"?r.workspaceId:p.snapshot?.activeWorkspaceId||i.app?.dataset.activeWorkspaceId||"";if(!l)return null;return{sessionId:l,workspaceId:h||void 0}}function Gi(i){return i==="session.selected"||i==="session.created"||i==="new-session"||i==="active.start"}function J(i,p){let r=i.sessions.find((l)=>l.id===p);if(!r)r=M(p),i.sessions.unshift(r);return i.activeSessionId=r.id,O(i),r}function C(i,p){(i.querySelector(".term-inner")||i).replaceChildren(...p.map(qi))}function qi(i){let p=document.createElement("article");p.className="transcript-item",p.dataset.messageId=i.id;let r=document.createElement("div");r.className="msg",r.dataset.kind=B(i.role);let l=document.createElement("span");l.className=`prefix ${B(i.role)}`,l.textContent=Ji(i.role);let h=document.createElement("pre");if(h.className=`body ${B(i.role)}`,h.textContent=i.text,r.append(l,h),p.append(r),i.thinking)p.append(e("think","thinking",i.thinking,i.streaming===!0));for(let b of i.toolCalls||[])p.append(e("tool",`${b.name} · ${b.status}`,b.text||JSON.stringify(b.args||{},null,2),b.status==="running"));if(i.streaming)p.dataset.streaming="true";return p}function e(i,p,r,l){let h=document.createElement("details");h.className=`msg-detail ${i}`,h.open=l;let b=document.createElement("summary");b.textContent=p;let c=document.createElement("pre");return c.className="body",c.textContent=r,h.append(b,c),h}function Ji(i){if(i==="assistant")return"pi >";if(i==="user")return"you >";if(i==="system")return"sys >";return"tool >"}function B(i){if(i==="assistant")return"pi";if(i==="system")return"sys";return i}function y(i){let p=i.sessions.find((r)=>r.id===i.activeSessionId);if(!p)p=M(),i.sessions.unshift(p),i.activeSessionId=p.id,O(i);return p}function M(i=x()){let p=Date.now();return{id:i,title:"New chat",createdAt:p,updatedAt:p,messages:[]}}function D(i){try{return localStorage.getItem(i)||""}catch{return""}}function ji(i=""){try{let r=JSON.parse(localStorage.getItem(Z)||"null");if(r&&typeof r.activeSessionId==="string"&&Array.isArray(r.sessions)){let l=r.sessions.filter(ki);if(i&&!l.some((h)=>h.id===i))l.unshift(M(i));return{activeSessionId:i||r.activeSessionId,sessions:l}}}catch{}let p=M(i||void 0);return{activeSessionId:p.id,sessions:[p]}}function O(i){s(i);try{localStorage.setItem(Z,JSON.stringify(i))}catch{for(let p of i.sessions)p.messages=p.messages.slice(-Math.floor(R/2));s(i);try{localStorage.setItem(Z,JSON.stringify(i))}catch{}}}function ci(i){if(!i?.length)return;return i.map(({content:p,...r})=>r)}function s(i){i.sessions.sort((l,h)=>h.updatedAt-l.updatedAt);let p=i.sessions.find((l)=>l.id===i.activeSessionId),r=i.sessions.filter((l)=>l.id!==i.activeSessionId).slice(0,Math.max(0,m-1));i.sessions=p?[p,...r]:i.sessions.slice(0,m);for(let l of i.sessions)if(l.messages.length>R)l.messages.splice(0,l.messages.length-R)}function ki(i){return F(i)&&typeof i.id==="string"&&Array.isArray(i.messages)}function Yi(i){return F(i)&&typeof i.id==="string"&&typeof i.text==="string"&&typeof i.createdAt==="number"&&(i.role==="user"||i.role==="assistant"||i.role==="tool"||i.role==="system")}function F(i){return typeof i==="object"&&i!==null}function x(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`}function wi(i){return i instanceof Error?i.message:String(i)}export{Li as promptFromAgUiLikeRunInput,d as pluginStyleText,P as pluginClass,ti as mergeCommands,N as getActiveWorkspaceId,mi as extractRefs,Ci as default,X as createComposerSurface,K as createChatSurface,ai as createChatDom,oi as createChannels,gi as createAgUiLikeRunInput,I as commandName,Ti as chatEventsToAgUiLikeEvents,v as backendCall};
