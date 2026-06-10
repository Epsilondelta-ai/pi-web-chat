import type { ChatMessage, FileSearchResult, PluginCommand } from "./types";

const PLUGIN_ID = "pi-web-chat";
const STYLE_ID = `${PLUGIN_ID}-style`;
const ROOT_CLASS = "pi-web-chat-root";
const MOUNTED_PLUGIN_CLASS = "pi-web-chat-mounted";

const MATERIAL_PATHS: Record<"attachFile" | "stop" | "send" | "terminal" | "file", string> = {
  attachFile: [
    "M16.5 6v11.5a4 4 0 0 1-8 0V5a2.5 2.5 0 0 1 5 0v10.5a1 1 0 0 1-2 0V6H10v9.5",
    "a2.5 2.5 0 0 0 5 0V5a4 4 0 0 0-8 0v12.5a5.5 5.5 0 0 0 11 0V6h-1.5Z",
  ].join(""),
  stop: "M6 6h12v12H6V6Z",
  send: "M2 21 23 12 2 3v7l15 2-15 2v7Z",
  terminal: "M3 4h18v16H3V4Zm2 2v12h14V6H5Zm2 3 1.1-1.1L12.2 12l-4.1 4.1L7 15l3-3-3-3Zm6 6h5v1.5h-5V15Z",
  file: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 2.5L17.5 8H14V4.5ZM8 13h8v1.5H8V13Zm0 3h8v1.5H8V16Z",
};

const MATERIAL_ICONS: Record<"attachFile" | "stop" | "send", string> = {
  attachFile: materialIcon("attach_file", MATERIAL_PATHS.attachFile),
  stop: materialIcon("stop", MATERIAL_PATHS.stop),
  send: materialIcon("send", MATERIAL_PATHS.send),
};

function materialIcon(name: string, path: string): string {
  return `<svg class="material-icon" data-material-icon="${name}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="${path}"></path></svg>`;
}

export type ChatDom = {
  root: HTMLElement;
  transcript: HTMLElement;
  textarea: HTMLTextAreaElement;
  sendButton: HTMLButtonElement;
  attachButton: HTMLButtonElement;
  fileInput: HTMLInputElement;
  slashPopover: HTMLElement;
  slashList: HTMLElement;
  refsPopover: HTMLElement;
  refsList: HTMLElement;
  attachments: HTMLElement;
};

export function pluginClass(): string {
  return MOUNTED_PLUGIN_CLASS;
}

export function createChatSurface(): HTMLElement {
  const surface = document.createElement("main");
  surface.className = "main pi-web-chat-surface";
  surface.dataset.main = "session";
  surface.innerHTML = `<div class="term"><div class="term-inner" role="log" aria-live="polite" aria-relevant="additions text"></div></div><button type="button" class="scroll-bottom-btn" data-action="scroll-bottom" aria-label="stick to bottom" title="stick to bottom" aria-pressed="true" hidden>↓</button>`;
  return surface;
}

export function createComposerSurface(): HTMLElement {
  const surface = document.createElement("section");
  surface.className = "prompt-region pi-web-chat-composer";
  surface.innerHTML = `
    <div class="slash-pop" hidden><div class="slash-head">slash commands · type to filter</div><div class="slash-list"></div></div>
    <div class="prompt-bar">
      <button class="attach-btn" type="button" aria-label="attach files" title="attach files">${MATERIAL_ICONS.attachFile}</button>
      <input type="file" multiple hidden data-file-input />
      <div class="prompt-input-col"><div class="attach-chips" hidden></div><textarea class="prompt-textarea" aria-label="Prompt" placeholder="ask pi to do something…" rows="1"></textarea></div>
      <div class="prompt-actions">
        <button class="stop-btn" type="button" aria-label="stop" title="stop" hidden>${MATERIAL_ICONS.stop}</button>
        <button class="mic-btn" type="button" data-action="toggle-speech-input" aria-label="start voice input" title="voice input" hidden>🎙</button>
        <button class="send-btn" type="button" aria-label="send" title="send" aria-disabled="true">${MATERIAL_ICONS.send}</button>
      </div>
      <div class="drop-overlay" hidden><span>drop to attach</span></div>
    </div>
    <div class="prompt-meta" data-prompt-meta>— | <span class="prompt-meta-item prompt-meta-branch"><span>—</span></span></div>`;
  return surface;
}

export function installBadge(app: HTMLElement): HTMLSpanElement {
  const badge = document.createElement("span");
  badge.className = "prompt-meta-item pi-web-chat-badge";
  badge.textContent = "chat plugin";
  app.querySelector("[data-prompt-meta]")?.append(badge);
  return badge;
}

export function createChatDom(): ChatDom {
  const root = document.createElement("section");
  root.className = ROOT_CLASS;
  root.dataset.plugin = PLUGIN_ID;
  root.innerHTML = `
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
        <button class="pi-web-chat-icon-btn" type="button" data-attach aria-label="attach files" title="attach files">${materialIcon("attach_file", MATERIAL_PATHS.attachFile)}</button>
        <input type="file" multiple hidden data-file-input />
        <textarea class="pi-web-chat-textarea" data-chat-input aria-label="Prompt" placeholder="ask pi to do something…" rows="1"></textarea>
        <button class="pi-web-chat-send" type="button" data-send aria-label="send" title="send" aria-disabled="true">${materialIcon("send", MATERIAL_PATHS.send)}</button>
      </div>
    </section>`;

  return {
    root,
    transcript: must(root.querySelector("[data-chat-transcript]")),
    textarea: must(root.querySelector("[data-chat-input]")),
    sendButton: must(root.querySelector("[data-send]")),
    attachButton: must(root.querySelector("[data-attach]")),
    fileInput: must(root.querySelector("[data-file-input]")),
    slashPopover: must(root.querySelector("[data-slash-popover]")),
    slashList: must(root.querySelector("[data-slash-list]")),
    refsPopover: must(root.querySelector("[data-refs-popover]")),
    refsList: must(root.querySelector("[data-refs-list]")),
    attachments: must(root.querySelector("[data-attachments]")),
  };
}

export function renderMessages(container: HTMLElement, messages: ChatMessage[]): void {
  container.replaceChildren(...messages.map(renderMessage));
  container.scrollTop = container.scrollHeight;
}

function renderMessage(message: ChatMessage): HTMLElement {
  const item = document.createElement("article");
  item.className = `pi-web-chat-message pi-web-chat-message-${message.role}`;
  item.dataset.messageId = message.id;

  const role = document.createElement("div");
  role.className = "pi-web-chat-message-role";
  role.textContent = message.role;

  const body = document.createElement("pre");
  body.className = "pi-web-chat-message-body";
  body.textContent = message.text;

  item.append(role, body);

  if (message.thinking) {
    const thinking = document.createElement("details");
    thinking.className = "pi-web-chat-thinking";
    thinking.open = Boolean(message.streaming);
    const summary = document.createElement("summary");
    summary.textContent = "thinking";
    const content = document.createElement("pre");
    content.textContent = message.thinking;
    thinking.append(summary, content);
    item.append(thinking);
  }

  if (message.toolCalls?.length) {
    const tools = document.createElement("div");
    tools.className = "pi-web-chat-tools";
    for (const tool of message.toolCalls) {
      const block = document.createElement("details");
      block.className = `pi-web-chat-tool pi-web-chat-tool-${tool.status}`;
      block.open = tool.status === "running";
      const summary = document.createElement("summary");
      summary.textContent = `${tool.name} · ${tool.status}`;
      const content = document.createElement("pre");
      content.textContent = tool.text || JSON.stringify(tool.args || {}, null, 2);
      block.append(summary, content);
      tools.append(block);
    }
    item.append(tools);
  }

  if (message.streaming) {
    const meta = document.createElement("div");
    meta.className = "pi-web-chat-message-meta";
    meta.textContent = "streaming...";
    item.append(meta);
  }

  if (message.attachments?.length) {
    const meta = document.createElement("div");
    meta.className = "pi-web-chat-message-meta";
    meta.textContent = `${message.attachments.length} attachment(s)`;
    item.append(meta);
  }

  return item;
}

export function renderSlashCommands(list: HTMLElement, commands: PluginCommand[], onPick: (command: PluginCommand) => void): void {
  list.replaceChildren(...commands.map((command) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "pi-web-chat-popover-item";
    button.textContent = commandName(command);
    if (command.description) button.title = command.description;
    button.addEventListener("click", () => onPick(command));
    return button;
  }));
}

export function renderFileRefs(list: HTMLElement, files: FileSearchResult[], onPick: (file: FileSearchResult) => void): void {
  list.replaceChildren(...files.map((file) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "pi-web-chat-popover-item pi-web-chat-popover-item-file";
    button.innerHTML = `${materialIcon("file", MATERIAL_PATHS.file)}<span></span>`;
    const label = button.querySelector("span");
    if (label) label.textContent = file.path || file.name || "unknown";
    button.addEventListener("click", () => onPick(file));
    return button;
  }));
}

export function setComposerMode(dom: Pick<ChatDom, "root" | "attachButton">, mode: "normal" | "shell" | "file-ref"): void {
  dom.root.dataset.composerMode = mode;
  if (mode === "shell") {
    dom.attachButton.innerHTML = materialIcon("terminal", MATERIAL_PATHS.terminal);
    dom.attachButton.title = "shell command mode";
    dom.attachButton.setAttribute("aria-label", "shell command mode");
    return;
  }
  if (mode === "file-ref") {
    dom.attachButton.innerHTML = materialIcon("file", MATERIAL_PATHS.file);
    dom.attachButton.title = "file reference mode";
    dom.attachButton.setAttribute("aria-label", "file reference mode");
    return;
  }
  dom.attachButton.innerHTML = materialIcon("attach_file", MATERIAL_PATHS.attachFile);
  dom.attachButton.title = "attach files";
  dom.attachButton.setAttribute("aria-label", "attach files");
}

export function renderAttachmentChips(container: HTMLElement, names: string[]): void {
  container.hidden = names.length === 0;
  container.replaceChildren(...names.map((name) => {
    const chip = document.createElement("span");
    chip.className = "pi-web-chat-attachment-chip";
    chip.textContent = name;
    return chip;
  }));
}

export function pluginStyleText(): string {
  return `
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
    .${ROOT_CLASS} .material-icon {
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

    .${ROOT_CLASS} {
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

    .${ROOT_CLASS} .pi-web-chat-message {
      border: 1px solid var(--border, #30363d);
      border-radius: 10px;
      padding: 10px;
      background: var(--panel, rgba(255,255,255,.03));
    }

    .${ROOT_CLASS} .pi-web-chat-message-role {
      color: var(--muted, #8a8f98);
      font-size: 11px;
      text-transform: uppercase;
      margin-bottom: 6px;
    }

    .${ROOT_CLASS} .pi-web-chat-message-body {
      margin: 0;
      white-space: pre-wrap;
      word-break: break-word;
      font: inherit;
    }

    .${ROOT_CLASS} .pi-web-chat-message-meta {
      margin-top: 6px;
      color: var(--muted, #8a8f98);
      font-size: 12px;
    }

    .${ROOT_CLASS} .pi-web-chat-composer {
      position: relative;
      padding: 10px;
      border-top: 1px solid var(--border, #30363d);
    }

    .${ROOT_CLASS} .pi-web-chat-prompt-bar {
      display: flex;
      align-items: flex-end;
      gap: 8px;
      border: 1px solid var(--border, #30363d);
      border-radius: 12px;
      padding: 8px;
      background: var(--surface, #0f1117);
    }

    .${ROOT_CLASS}[data-composer-mode="shell"] .pi-web-chat-prompt-bar {
      border-color: var(--warning, #facc15);
      box-shadow: 0 0 0 1px rgba(250,204,21,.35);
    }

    .${ROOT_CLASS}[data-composer-mode="shell"] .pi-web-chat-icon-btn {
      color: var(--warning, #facc15);
      border-color: var(--warning, #facc15);
    }

    .${ROOT_CLASS}[data-composer-mode="file-ref"] .pi-web-chat-prompt-bar {
      border-color: var(--accent, #60a5fa);
    }

    .${ROOT_CLASS}[data-composer-mode="file-ref"] .pi-web-chat-icon-btn {
      color: var(--accent, #60a5fa);
      border-color: var(--accent, #60a5fa);
    }

    .${ROOT_CLASS} .pi-web-chat-textarea {
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

    .${ROOT_CLASS} .pi-web-chat-textarea:focus-visible {
      box-shadow: inset 0 -2px 0 var(--accent, #60a5fa);
    }

    .${ROOT_CLASS} .pi-web-chat-icon-btn,
    .${ROOT_CLASS} .pi-web-chat-send,
    .pi-web-chat-popover-item {
      cursor: pointer;
    }

    .${ROOT_CLASS} .pi-web-chat-icon-btn,
    .${ROOT_CLASS} .pi-web-chat-send {
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

    .${ROOT_CLASS} .pi-web-chat-send[aria-disabled="true"] {
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
  `;
}

export function installStyles(): HTMLStyleElement {
  document.getElementById(STYLE_ID)?.remove();
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = pluginStyleText();
  document.head.append(style);
  return style;
}

export function commandName(command: PluginCommand): string {
  return command.command || command.cmd || (command.name ? `/${command.name}` : "");
}

function must<T extends Element>(value: T | null): T {
  if (!value) throw new Error("pi-web-chat DOM template is invalid");
  return value;
}
