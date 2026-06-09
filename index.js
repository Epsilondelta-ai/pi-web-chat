var _={attachFile:["M16.5 6v11.5a4 4 0 0 1-8 0V5a2.5 2.5 0 0 1 5 0v10.5a1 1 0 0 1-2 0V6H10v9.5","a2.5 2.5 0 0 0 5 0V5a4 4 0 0 0-8 0v12.5a5.5 5.5 0 0 0 11 0V6h-1.5Z"].join(""),stop:"M6 6h12v12H6V6Z",send:"M2 21 23 12 2 3v7l15 2-15 2v7Z",terminal:"M3 4h18v16H3V4Zm2 2v12h14V6H5Zm2 3 1.1-1.1L12.2 12l-4.1 4.1L7 15l3-3-3-3Zm6 6h5v1.5h-5V15Z",file:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 2.5L17.5 8H14V4.5ZM8 13h8v1.5H8V13Zm0 3h8v1.5H8V16Z"},z={attachFile:A("attach_file",_.attachFile),stop:A("stop",_.stop),send:A("send",_.send)};function A(i,p){return`<svg class="material-icon" data-material-icon="${i}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="${p}"></path></svg>`}function B(){return"pi-web-chat-mounted"}function Y(){let i=document.createElement("main");return i.className="main pi-web-chat-surface",i.dataset.main="session",i.innerHTML='<div class="term"><div class="term-inner" role="log" aria-live="polite" aria-relevant="additions text"></div></div><button type="button" class="scroll-bottom-btn" data-action="scroll-bottom" aria-label="scroll to bottom" title="scroll to bottom" hidden>↓</button>',i}function K(){let i=document.createElement("section");return i.className="prompt-region pi-web-chat-composer",i.innerHTML=`
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
    <div class="prompt-meta" data-prompt-meta>— | <span class="prompt-meta-item prompt-meta-branch"><span>—</span></span></div>`,i}function X(i){let p=document.createElement("span");return p.className="prompt-meta-item pi-web-chat-badge",p.textContent="chat plugin",i.querySelector("[data-prompt-meta]")?.append(p),p}function fi(){let i=document.createElement("section");return i.className="pi-web-chat-root",i.dataset.plugin="pi-web-chat",i.innerHTML=`
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
    </section>`,{root:i,transcript:E(i.querySelector("[data-chat-transcript]")),textarea:E(i.querySelector("[data-chat-input]")),sendButton:E(i.querySelector("[data-send]")),attachButton:E(i.querySelector("[data-attach]")),fileInput:E(i.querySelector("[data-file-input]")),slashPopover:E(i.querySelector("[data-slash-popover]")),slashList:E(i.querySelector("[data-slash-list]")),refsPopover:E(i.querySelector("[data-refs-popover]")),refsList:E(i.querySelector("[data-refs-list]")),attachments:E(i.querySelector("[data-attachments]"))}}function Q(i,p){i.hidden=p.length===0,i.replaceChildren(...p.map((l)=>{let r=document.createElement("span");return r.className="pi-web-chat-attachment-chip",r.textContent=l,r}))}function W(){return`
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
      background: var(--bg-1, #080b0f);
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
      font-size: var(--text-sm, 12px);
      color: var(--fg-3, #858585);
      padding-top: 1px;
      user-select: none;
    }

    .pi-web-chat-surface .msg .prefix.user {
      color: var(--user-msg, #8ab4ff);
    }

    .pi-web-chat-surface .msg .prefix.pi {
      color: var(--accent, #00ff88);
    }

    .pi-web-chat-surface .msg .prefix.system {
      color: var(--fg-3, #858585);
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
      resize: vertical;
      border: 1px solid var(--border, #24313a);
      border-radius: var(--radius-1, 6px);
      outline: 0;
      background: var(--bg-1, #080b0f);
      color: var(--fg-1, #d4d4d4);
      font: inherit;
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
  `}function d(){document.getElementById("pi-web-chat-style")?.remove();let i=document.createElement("style");return i.id="pi-web-chat-style",i.textContent=W(),document.head.append(i),i}function S(i){return i.command||i.cmd||(i.name?`/${i.name}`:"")}function E(i){if(!i)throw Error("pi-web-chat DOM template is invalid");return i}function gi(i,p,l){return{threadId:i,runId:p,state:{},messages:l,tools:[],context:[]}}function Li(i){let p=[...i.messages].reverse().find((l)=>l.role==="user");return{text:p?.text||"",attachments:p?.attachments||[],sessionId:i.threadId}}function ai(i,p,l){return i.map((r)=>Ti(r,p,l))}function Ti(i,p,l){if(i.type==="text.delta")return{type:"TEXT_MESSAGE_CONTENT",threadId:p,runId:l,delta:i.delta||""};if(i.type==="thinking.delta")return{type:"THINKING_MESSAGE_CONTENT",threadId:p,runId:l,delta:i.delta||""};if(i.type==="tool.start")return{type:"TOOL_CALL_START",threadId:p,runId:l,toolCallId:i.toolCallId,payload:I(i)};if(i.type==="tool.delta")return{type:"TOOL_CALL_ARGS",threadId:p,runId:l,toolCallId:i.toolCallId,delta:i.delta||""};if(i.type==="tool.end")return{type:"TOOL_CALL_END",threadId:p,runId:l,toolCallId:i.toolCallId,payload:I(i)};return{type:i.type.toUpperCase().replaceAll(".","_"),threadId:p,runId:l,payload:i}}function I(i){return{name:i.toolName||"tool",args:i.args||{},result:i.result||"",isError:i.isError===!0}}var v="pi-web-chat.sessions.v1";var s="plugin.pi-web-sidebar.selectedSession",ii="plugin.pi-web-sidebar.event",pi="plugin.pi-web-sidebar.activeSessionId",V="plugin.pi-web-sidebar.activeWorkspaceId";var m=20,R=200,ui=8,Ei=1e6;class li{#i=[];add(i){if(i)this.#i.push(i);return i}listen(i,p,l){i.addEventListener(p,l),this.add({remove:()=>i.removeEventListener(p,l)})}dispose(){for(let i of this.#i.splice(0).reverse())if(typeof i==="function")i();else if("unsubscribe"in i)i.unsubscribe();else i.remove()}}function Ci(i={}){let p=i.app;if(p?.piWebChat?.dispose(),typeof i.mount?.chat!=="function"||typeof i.mount?.composer!=="function")throw Error("pi-web-chat requires modern pi-web mount.chat and mount.composer APIs");return ni(i,p)}function ni(i,p){let l=new li,r=l.add(d()),h=Y(),b=K(),c=i.mount?.chat(h,{replace:!0}),w=i.mount?.composer(b,{replace:!0});if(c)l.add(c);if(w)l.add(w);let g=x(i);$(i,g||void 0);let f=ji(g?.sessionId||""),L={backendChatToken:0};n(h,O(f).messages),G(i,h,f,L,g?.sessionId||f.activeSessionId),Di(l,i,h,f,L),Oi(l,i,b,h,f,L);let a=p?l.add(X(p)):void 0;p?.classList.add(B());let u={dispose:()=>l.dispose()};if(p)p.piWebChat=u;return()=>{if(l.dispose(),a?.remove(),r.remove(),p?.classList.remove(B()),p?.piWebChat===u)delete p.piWebChat}}function Oi(i,p,l,r,h,b){let c=l.querySelector(".prompt-textarea"),w=l.querySelector(".send-btn"),g=l.querySelector(".attach-btn"),f=l.querySelector("[data-file-input]"),L=l.querySelector(".attach-chips");if(!c||!w)return;let a=[],u=()=>{let T=c.value;w.setAttribute("aria-disabled",T.trim()?"false":"true")},J=()=>{if(!L)return;Q(L,a.map((T)=>{return T.name||"attachment"}))},j=async(T)=>{T?.preventDefault(),T?.stopImmediatePropagation();let C=c.value.trim();if(u(),!C)return;let k=[...a];w.disabled=!0;try{if(Mi(C,k),await Ri(p,r,h,b,C,k),a=[],J(),c.value="",f)f.value=""}catch(wi){n(r,[yi(wi)])}finally{w.disabled=!1,u()}};if(i.listen(c,"input",u),i.listen(c,"keydown",(T)=>{let C=T;if(C.key==="Enter"&&(C.metaKey||C.ctrlKey))j(C)}),i.listen(w,"click",(T)=>{j(T)}),g&&f)i.listen(g,"click",()=>f.click()),i.listen(f,"change",()=>{_i(f,(T)=>{a=T,J()})})}function yi(i){return{id:U(),role:"system",text:`prompt failed: ${ci(i)}`,createdAt:Date.now()}}async function _i(i,p){let l=Array.from(i.files||[]).slice(0,ui),r=[];for(let h of l){if(h.size>Ei)continue;r.push({name:h.name,size:h.size,content:await h.text(),mimeType:h.type||void 0})}p(r)}function mi(i){return{input$:i.behaviorSubject("chat.input",""),submitted$:i.subject("chat.input.submitted"),activeSessionId$:i.behaviorSubject("session.activeId",null),sidebarSelectedSession$:i.behaviorSubject(s,Ai()),toastRequested$:i.subject("toast.requested")}}function oi(i){let p=[],l=new Set,r=/(^|[\s`])@([^\s@`]+)/g,h=r.exec(String(i||""));while(h!==null){let b=h[2]||"";if((h[1]||"")!=="`"&&b&&!l.has(b))l.add(b),p.push(b);h=r.exec(String(i||""))}return p}function ti(i=[],p=[]){let l=[],r=new Set;for(let h of[...i,...p]){let b=S(h);if(!b||r.has(b))continue;r.add(b),l.push(h)}return l}function N(i){return i.app?.piWebSidebar?.getSnapshot?.().activeWorkspaceId||i.app?.dataset.activeWorkspaceId||""}function Ai(){return x({})}function x(i){let p=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),l=p?.activeSessionId||"",r=p?.activeWorkspaceId||"";if(l)return{sessionId:l,workspaceId:r||void 0};let h=D(pi),b=D(V);return h?{sessionId:h,workspaceId:b||void 0}:null}function $(i,p){if(p?.workspaceId&&i.app)i.app.dataset.activeWorkspaceId=p.workspaceId,o(V,p.workspaceId);if(p?.sessionId)i.app?.setAttribute("data-active-session-id",p.sessionId),o(pi,p.sessionId)}function H(i,p,l={}){let r=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),h={type:p,detail:l,snapshot:r};(i.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$)?.next(h),globalThis.piWeb?.subject(ii).next(h)}function ri(i,p,l){let r=i.app?.dataset.activeWorkspaceId||N(i),h={reason:l,sessionId:p,workspaceId:r};globalThis.piWeb?.behaviorSubject("session.activeId",p).next(p),globalThis.piWeb?.subject("session.changed").next({sessionId:p,workspaceId:r,reason:l}),H(i,"active.start",h),H(i,"session.created",h)}function o(i,p){try{localStorage.setItem(i,p)}catch{}}async function F(i,p,l={}){if(!i.backend)return{};let r=N(i),h=await i.backend(p,{workspaceId:r,data:l});return P(h)?h:{}}async function Ri(i,p,l,r,h,b){let c={id:U(),role:"user",text:h,attachments:bi(b),createdAt:Date.now()},w=O(l);w.messages.push(c),w.updatedAt=Date.now(),y(l),n(p,w.messages);let g=await Ni(i,h,b,l.activeSessionId);if(typeof g.activeSessionId==="string"&&g.activeSessionId){let L=l.activeSessionId,a=q(l,g.activeSessionId);if(L!==a.id&&!a.messages.some((u)=>u.id===c.id))a.messages.push(c),a.updatedAt=Date.now();$(i,{sessionId:g.activeSessionId,workspaceId:i.app?.dataset.activeWorkspaceId||N(i)||void 0}),H(i,"chat-session",{reason:"startPrompt",sessionId:g.activeSessionId}),ri(i,g.activeSessionId,"startPrompt")}if(typeof g.runId!=="string"||!g.runId){let L=await Fi(i,h,b,l.activeSessionId),a=hi(i,l,L,"submitPrompt");n(p,a);return}let f=Pi(l);await Hi(i,l,g.runId,f,()=>n(p,O(l).messages)),await G(i,p,l,r,l.activeSessionId)}async function Hi(i,p,l,r,h){let b=0,c=!0;h();try{while(c){await Bi(120);let w=await F(i,"streamEvents",{runId:l,cursor:b}),g=Array.isArray(w.events)?w.events.filter(zi):[];b=typeof w.cursor==="number"?w.cursor:b,c=w.isStreaming===!0,Ui(r,g),r.streaming=c,O(p).updatedAt=Date.now(),y(p),h()}}finally{r.streaming=!1,y(p),h()}}function Mi(i,p){globalThis.piWeb?.subject("chat.input.submitted").next({text:i,attachments:bi(p)||[]})}async function Ni(i,p,l,r){try{return await F(i,"startPrompt",{text:p,attachments:l,sessionId:r})}catch(h){if($i(h))return{};throw h}}function $i(i){return/unknown method: startPrompt|unsupported method: startPrompt|startPrompt unsupported/i.test(ci(i))}async function Fi(i,p,l,r=""){return await F(i,"submitPrompt",{text:p,attachments:l,sessionId:r})}function Pi(i){let p=O(i),l=[...p.messages].reverse().find((h)=>h.role==="assistant"&&h.streaming);if(l)return l;let r={id:U(),role:"assistant",text:"",createdAt:Date.now(),streaming:!0};return p.messages.push(r),r}function Ui(i,p){for(let l of p)if(l.type==="text.delta"&&typeof l.delta==="string")i.text+=l.delta;else if(l.type==="thinking.delta"&&typeof l.delta==="string")i.thinking=`${i.thinking||""}${l.delta}`;else if(l.type==="tool.start")Z(i,l,"running");else if(l.type==="tool.delta"&&typeof l.delta==="string"){let r=Z(i,l,"running");r.text=l.delta}else if(l.type==="tool.end"){let r=Z(i,l,l.isError?"err":"ok");if(typeof l.result==="string"&&l.result)r.text=l.result}else if(l.type==="error"&&typeof l.message==="string")i.text+=`${i.text?`
`:""}${l.message}`}function Z(i,p,l){let r=p.toolCallId||p.toolName||"tool";i.toolCalls||=[];let h=i.toolCalls.find((b)=>b.id===r);if(!h)h={id:r,name:p.toolName||"tool",args:p.args,text:"",status:l},i.toolCalls.push(h);if(h.status=l,p.args)h.args=p.args;return h}function zi(i){return P(i)&&typeof i.type==="string"}function Bi(i){return new Promise((p)=>globalThis.setTimeout(p,i))}async function G(i,p,l,r,h=""){let b=++r.backendChatToken;try{let c=await F(i,"chatState",Zi(i,h));if(b!==r.backendChatToken)return;let w=hi(i,l,c,"chatState");if(w.length)n(p,w)}catch{}}function Zi(i,p){let l=p?{sessionId:p}:{},r=vi(i);if(r)l.workspacePath=r;return l}function vi(i){let p=i.app?.piWebSidebar?.getSnapshot?.()||globalThis.piWebSidebar?.getSnapshot?.(),l=i.app?.dataset.activeWorkspaceId||p?.activeWorkspaceId||"";return p?.workspaces?.find((r)=>r.id===l)?.path||""}function hi(i,p,l,r){let h=Array.isArray(l.messages)?l.messages.filter(Yi):[];if(typeof l.activeSessionId==="string"&&l.activeSessionId){let c=p.activeSessionId;if(q(p,l.activeSessionId),$(i,{sessionId:l.activeSessionId,workspaceId:i.app?.dataset.activeWorkspaceId||N(i)||void 0}),r!=="chatState"||c!==l.activeSessionId)H(i,"chat-session",{reason:r,sessionId:l.activeSessionId});if(r!=="chatState")ri(i,l.activeSessionId,r)}let b=O(p);if(h.length){if(b.messages=h.slice(-R),b.title==="New chat"){let c=h.find((w)=>w.role==="user");if(c)b.title=c.text.slice(0,48)||b.title}b.updatedAt=Date.now()}return y(p),b.messages}function Di(i,p,l,r,h){let b=(f)=>{if(!f?.sessionId)return;$(p,f),q(r,f.sessionId),n(l,O(r).messages),G(p,l,r,h,f.sessionId)},c=(f)=>{let L=Vi(p,f);if(L)b(L)},w=p.app?.piWebSidebar?.channels?.selectedSession$||globalThis.piWebSidebar?.channels?.selectedSession$,g=p.app?.piWebSidebar?.channels?.events$||globalThis.piWebSidebar?.channels?.events$;if(w)i.add(w.subscribe(b));if(g)i.add(g.subscribe(c));if(p.app)i.listen(p.app,"pi-web-sidebar:session-created",(f)=>{let L=f.detail||{},a=typeof L.sessionId==="string"?L.sessionId:"",u=typeof L.workspaceId==="string"?L.workspaceId:"";if(a)b({sessionId:a,workspaceId:u||void 0})});if(globalThis.piWeb)i.add(globalThis.piWeb.behaviorSubject(s,x(p)).subscribe(b)),i.add(globalThis.piWeb.subject(ii).subscribe(c)),i.add(globalThis.piWeb.behaviorSubject("session.activeId",null).subscribe((f)=>{if(!f)return;b({sessionId:f,workspaceId:p.app?.dataset.activeWorkspaceId||D(V)||void 0})}))}function Vi(i,p){if(!xi(p.type))return null;let l=p.detail||{},r=typeof l.sessionId==="string"?l.sessionId:p.snapshot?.activeSessionId||"",h=typeof l.workspaceId==="string"?l.workspaceId:p.snapshot?.activeWorkspaceId||i.app?.dataset.activeWorkspaceId||"";if(!r)return null;return{sessionId:r,workspaceId:h||void 0}}function xi(i){return i==="session.selected"||i==="session.created"||i==="new-session"||i==="active.start"}function q(i,p){let l=i.sessions.find((r)=>r.id===p);if(!l)l=M(p),i.sessions.unshift(l);return i.activeSessionId=l.id,y(i),l}function n(i,p){(i.querySelector(".term-inner")||i).replaceChildren(...p.map(Gi))}function Gi(i){let p=document.createElement("article");p.className="transcript-item",p.dataset.messageId=i.id;let l=document.createElement("div");l.className="msg";let r=document.createElement("span");r.className=`prefix ${Ji(i.role)}`,r.textContent=qi(i.role);let h=document.createElement("pre");if(h.className="body",h.textContent=i.text,l.append(r,h),p.append(l),i.thinking)p.append(t("think","thinking",i.thinking,i.streaming===!0));for(let b of i.toolCalls||[])p.append(t("tool",`${b.name} · ${b.status}`,b.text||JSON.stringify(b.args||{},null,2),b.status==="running"));if(i.streaming)p.dataset.streaming="true";return p}function t(i,p,l,r){let h=document.createElement("details");h.className=`msg-detail ${i}`,h.open=r;let b=document.createElement("summary");b.textContent=p;let c=document.createElement("pre");return c.className="body",c.textContent=l,h.append(b,c),h}function qi(i){if(i==="assistant")return"pi";if(i==="system")return"sys";return i}function Ji(i){return i==="assistant"?"pi":i}function O(i){let p=i.sessions.find((l)=>l.id===i.activeSessionId);if(!p)p=M(),i.sessions.unshift(p),i.activeSessionId=p.id,y(i);return p}function M(i=U()){let p=Date.now();return{id:i,title:"New chat",createdAt:p,updatedAt:p,messages:[]}}function D(i){try{return localStorage.getItem(i)||""}catch{return""}}function ji(i=""){try{let l=JSON.parse(localStorage.getItem(v)||"null");if(l&&typeof l.activeSessionId==="string"&&Array.isArray(l.sessions)){let r=l.sessions.filter(ki);if(i&&!r.some((h)=>h.id===i))r.unshift(M(i));return{activeSessionId:i||l.activeSessionId,sessions:r}}}catch{}let p=M(i||void 0);return{activeSessionId:p.id,sessions:[p]}}function y(i){e(i);try{localStorage.setItem(v,JSON.stringify(i))}catch{for(let p of i.sessions)p.messages=p.messages.slice(-Math.floor(R/2));e(i);try{localStorage.setItem(v,JSON.stringify(i))}catch{}}}function bi(i){if(!i?.length)return;return i.map(({content:p,...l})=>l)}function e(i){i.sessions.sort((r,h)=>h.updatedAt-r.updatedAt);let p=i.sessions.find((r)=>r.id===i.activeSessionId),l=i.sessions.filter((r)=>r.id!==i.activeSessionId).slice(0,Math.max(0,m-1));i.sessions=p?[p,...l]:i.sessions.slice(0,m);for(let r of i.sessions)if(r.messages.length>R)r.messages.splice(0,r.messages.length-R)}function ki(i){return P(i)&&typeof i.id==="string"&&Array.isArray(i.messages)}function Yi(i){return P(i)&&typeof i.id==="string"&&typeof i.text==="string"&&typeof i.createdAt==="number"&&(i.role==="user"||i.role==="assistant"||i.role==="tool"||i.role==="system")}function P(i){return typeof i==="object"&&i!==null}function U(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,10)}`}function ci(i){return i instanceof Error?i.message:String(i)}export{Li as promptFromAgUiLikeRunInput,W as pluginStyleText,B as pluginClass,ti as mergeCommands,N as getActiveWorkspaceId,oi as extractRefs,Ci as default,K as createComposerSurface,Y as createChatSurface,fi as createChatDom,mi as createChannels,gi as createAgUiLikeRunInput,S as commandName,ai as chatEventsToAgUiLikeEvents,F as backendCall};
