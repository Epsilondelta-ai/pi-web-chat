import type { ChatMessage, FileSearchResult, PluginCommand } from "./types";

const PLUGIN_ID = "pi-web-chat";
const STYLE_ID = `${PLUGIN_ID}-style`;
const ROOT_CLASS = "pi-web-chat-root";
const LEGACY_PLUGIN_CLASS = "pi-web-chat-enhanced";

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
  return LEGACY_PLUGIN_CLASS;
}

export function createChatSurface(): HTMLElement {
  const surface = document.createElement("main");
  surface.className = "main pi-web-chat-surface";
  surface.dataset.main = "session";
  surface.innerHTML = `<div class="term"><div class="term-inner"></div></div><button type="button" class="scroll-bottom-btn" data-action="scroll-bottom" aria-label="scroll to bottom" title="scroll to bottom" hidden>↓</button>`;
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
      <div class="prompt-input-col"><div class="attach-chips" hidden></div><textarea class="prompt-textarea" placeholder="ask pi to do something…" rows="1"></textarea></div>
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
  badge.textContent = "chat plugin · ! / @";
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
        <textarea class="pi-web-chat-textarea" data-chat-input placeholder="ask pi to do something…" rows="1"></textarea>
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

export function installToolbarButton(onClick: () => void): HTMLElement | undefined {
  const toolbar = document.querySelector("[data-plugin-toolbar]");
  if (!toolbar) return undefined;
  const button = document.createElement("button");
  button.type = "button";
  button.className = "pi-web-chat-toolbar-button";
  button.textContent = "New chat";
  button.addEventListener("click", onClick);
  toolbar.append(button);
  return button;
}

export function installSettingsSection(): HTMLElement | undefined {
  const settingsRoot = document.querySelector("[data-plugin-settings-root]");
  if (!settingsRoot) return undefined;
  const section = document.createElement("section");
  section.className = "pi-web-chat-settings";
  section.innerHTML = `<h3>Chat Composer</h3><p>Owns chat UI, composer, local sessions, slash commands, file refs, and shell tool messages.</p>`;
  settingsRoot.append(section);
  return section;
}

export function pluginStyleText(): string {
  return `
    .pi-web-chat-badge { color: var(--muted, #8a8f98); }
    .pi-web-chat-surface { display: flex; flex-direction: column; }
    .pi-web-chat-composer { display: block; }
    .pi-web-chat-composer .material-icon { display: block; width: 16px; height: 16px; pointer-events: none; }
    .${LEGACY_PLUGIN_CLASS} .app-body:has(.sidebar-wrap) > [data-plugin-chat-root],
    .${LEGACY_PLUGIN_CLASS} .app-body:has(.sidebar-wrap) > [data-plugin-composer-root] { grid-column: 2; }
    .${LEGACY_PLUGIN_CLASS} .slash-pop {
      position: absolute;
      left: var(--space-3, 12px);
      right: 120px;
      bottom: calc(100% + 4px);
      max-width: 640px;
      background: var(--bg-2, #161b22);
      border: 1px solid var(--border-hi, var(--border, #30363d));
      box-shadow: var(--shadow-modal, 0 18px 48px rgba(0,0,0,.35));
      z-index: 30;
    }
    .${LEGACY_PLUGIN_CLASS} .slash-head {
      padding: 6px var(--space-3, 12px);
      border-bottom: 1px solid var(--border-dim, var(--border, #30363d));
      font-size: var(--text-xs, 12px);
      color: var(--fg-3, var(--muted, #8a8f98));
      letter-spacing: var(--tracking-wide, .04em);
      text-transform: uppercase;
      background: var(--bg-1, #0f1117);
    }
    .${LEGACY_PLUGIN_CLASS} .slash-list { max-height: 240px; overflow-y: auto; }
    .${LEGACY_PLUGIN_CLASS} .slash-item {
      display: grid;
      grid-template-columns: minmax(120px, .8fr) auto minmax(0, 1.4fr);
      gap: 10px;
      padding: 6px var(--space-3, 12px);
      cursor: pointer;
      font-size: var(--text-sm, 13px);
      align-items: baseline;
    }
    .${LEGACY_PLUGIN_CLASS} .slash-item.selected { background: var(--bg-4, rgba(255,255,255,.08)); }
    .${LEGACY_PLUGIN_CLASS} .slash-item .sl-cmd { color: var(--accent, #00ff88); font-family: var(--font-mono, monospace); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .${LEGACY_PLUGIN_CLASS} .slash-item .sl-tags { display: inline-flex; gap: 4px; align-items: center; }
    .${LEGACY_PLUGIN_CLASS} .slash-item .sl-scope,
    .${LEGACY_PLUGIN_CLASS} .slash-item .sl-source { border: 1px solid var(--border, #30363d); color: var(--fg-3, #8a8f98); font-size: 10px; padding: 1px 5px; text-transform: uppercase; }
    .${LEGACY_PLUGIN_CLASS} .slash-item .sl-scope { color: var(--tool-call, #79c0ff); }
    .${LEGACY_PLUGIN_CLASS} .slash-item .sl-desc { color: var(--fg-2, #c9d1d9); font-size: var(--text-xs, 12px); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .${LEGACY_PLUGIN_CLASS} .slash-empty { padding: 10px var(--space-3, 12px); color: var(--fg-3, #8a8f98); font-size: var(--text-sm, 13px); }
    .${LEGACY_PLUGIN_CLASS} .prompt-file-ref-pop::before,
    .${LEGACY_PLUGIN_CLASS} .slash-pop::before {
      content: "pi-web-chat";
      display: block;
      padding: 4px 8px 2px;
      color: var(--muted, #8a8f98);
      font-size: 11px;
      letter-spacing: .03em;
      text-transform: uppercase;
    }
    .${ROOT_CLASS} { display: flex; flex-direction: column; gap: 10px; height: 100%; min-height: 0; }
    .pi-web-chat-transcript { flex: 1; min-height: 160px; overflow: auto; display: flex; flex-direction: column; gap: 10px; padding: 12px; }
    .pi-web-chat-message { border: 1px solid var(--border, #30363d); border-radius: 10px; padding: 10px; background: var(--panel, rgba(255,255,255,.03)); }
    .pi-web-chat-message-role { color: var(--muted, #8a8f98); font-size: 11px; text-transform: uppercase; margin-bottom: 6px; }
    .pi-web-chat-message-body { margin: 0; white-space: pre-wrap; word-break: break-word; font: inherit; }
    .pi-web-chat-message-meta { margin-top: 6px; color: var(--muted, #8a8f98); font-size: 12px; }
    .${ROOT_CLASS} .pi-web-chat-composer { position: relative; padding: 10px; border-top: 1px solid var(--border, #30363d); }
    .pi-web-chat-prompt-bar { display: flex; align-items: flex-end; gap: 8px; border: 1px solid var(--border, #30363d); border-radius: 12px; padding: 8px; background: var(--surface, #0f1117); }
    .${ROOT_CLASS}[data-composer-mode="shell"] .pi-web-chat-prompt-bar { border-color: var(--warning, #facc15); box-shadow: 0 0 0 1px rgba(250,204,21,.35); }
    .${ROOT_CLASS}[data-composer-mode="shell"] .pi-web-chat-icon-btn { color: var(--warning, #facc15); border-color: var(--warning, #facc15); }
    .${ROOT_CLASS}[data-composer-mode="file-ref"] .pi-web-chat-prompt-bar { border-color: var(--accent, #60a5fa); }
    .${ROOT_CLASS}[data-composer-mode="file-ref"] .pi-web-chat-icon-btn { color: var(--accent, #60a5fa); border-color: var(--accent, #60a5fa); }
    .pi-web-chat-textarea { flex: 1; min-height: 38px; max-height: 180px; resize: vertical; border: 0; outline: 0; background: transparent; color: inherit; font: inherit; }
    .pi-web-chat-icon-btn, .pi-web-chat-send, .pi-web-chat-toolbar-button, .pi-web-chat-popover-item { cursor: pointer; }
    .pi-web-chat-icon-btn, .pi-web-chat-send { display: inline-flex; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: 8px; border: 1px solid var(--border, #30363d); background: transparent; color: inherit; }
    .pi-web-chat-send[aria-disabled="true"] { opacity: .45; }
    .${ROOT_CLASS} .material-icon { display: block; width: 16px; height: 16px; pointer-events: none; }
    .pi-web-chat-popover { position: absolute; left: 12px; right: 12px; bottom: calc(100% - 8px); z-index: 5; max-height: 220px; overflow: auto; border: 1px solid var(--border, #30363d); border-radius: 10px; background: var(--surface, #111827); box-shadow: 0 10px 30px rgba(0,0,0,.25); }
    .pi-web-chat-popover-head { padding: 6px 10px; color: var(--muted, #8a8f98); font-size: 11px; text-transform: uppercase; }
    .pi-web-chat-popover-list { display: flex; flex-direction: column; }
    .pi-web-chat-popover-item { text-align: left; border: 0; border-top: 1px solid var(--border, #30363d); background: transparent; color: inherit; padding: 8px 10px; }
    .pi-web-chat-popover-item-file { display: flex; align-items: center; gap: 8px; }
    .pi-web-chat-popover-item:hover { background: rgba(255,255,255,.06); }
    .pi-web-chat-attachments { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 8px; }
    .pi-web-chat-attachment-chip { border: 1px solid var(--border, #30363d); border-radius: 999px; padding: 3px 8px; color: var(--muted, #8a8f98); font-size: 12px; }
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
