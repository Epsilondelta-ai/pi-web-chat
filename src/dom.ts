import type { ChatMessage, FileSearchResult, PluginCommand } from "./types";

const PLUGIN_ID = "pi-web-chat";
const STYLE_ID = `${PLUGIN_ID}-style`;
const ROOT_CLASS = "pi-web-chat-root";

const MATERIAL_PATHS: Record<"attachFile" | "stop" | "send", string> = {
  attachFile: [
    "M16.5 6v11.5a4 4 0 0 1-8 0V5a2.5 2.5 0 0 1 5 0v10.5a1 1 0 0 1-2 0V6H10v9.5",
    "a2.5 2.5 0 0 0 5 0V5a4 4 0 0 0-8 0v12.5a5.5 5.5 0 0 0 11 0V6h-1.5Z",
  ].join(""),
  stop: "M6 6h12v12H6V6Z",
  send: "M2 21 23 12 2 3v7l15 2-15 2v7Z",
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
  return ROOT_CLASS;
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
    button.className = "pi-web-chat-popover-item";
    button.textContent = file.path || file.name || "unknown";
    button.addEventListener("click", () => onPick(file));
    return button;
  }));
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
    .${ROOT_CLASS} { display: flex; flex-direction: column; gap: 10px; height: 100%; min-height: 0; }
    .pi-web-chat-transcript { flex: 1; min-height: 160px; overflow: auto; display: flex; flex-direction: column; gap: 10px; padding: 12px; }
    .pi-web-chat-message { border: 1px solid var(--border, #30363d); border-radius: 10px; padding: 10px; background: var(--panel, rgba(255,255,255,.03)); }
    .pi-web-chat-message-role { color: var(--muted, #8a8f98); font-size: 11px; text-transform: uppercase; margin-bottom: 6px; }
    .pi-web-chat-message-body { margin: 0; white-space: pre-wrap; word-break: break-word; font: inherit; }
    .pi-web-chat-message-meta { margin-top: 6px; color: var(--muted, #8a8f98); font-size: 12px; }
    .pi-web-chat-composer { position: relative; padding: 10px; border-top: 1px solid var(--border, #30363d); }
    .pi-web-chat-prompt-bar { display: flex; align-items: flex-end; gap: 8px; border: 1px solid var(--border, #30363d); border-radius: 12px; padding: 8px; background: var(--surface, #0f1117); }
    .pi-web-chat-textarea { flex: 1; min-height: 38px; max-height: 180px; resize: vertical; border: 0; outline: 0; background: transparent; color: inherit; font: inherit; }
    .pi-web-chat-icon-btn, .pi-web-chat-send, .pi-web-chat-toolbar-button, .pi-web-chat-popover-item { cursor: pointer; }
    .pi-web-chat-icon-btn, .pi-web-chat-send { display: inline-flex; align-items: center; justify-content: center; width: 34px; height: 34px; border-radius: 8px; border: 1px solid var(--border, #30363d); background: transparent; color: inherit; }
    .pi-web-chat-send[aria-disabled="true"] { opacity: .45; }
    .${ROOT_CLASS} .material-icon { display: block; width: 16px; height: 16px; pointer-events: none; }
    .pi-web-chat-popover { position: absolute; left: 12px; right: 12px; bottom: calc(100% - 8px); z-index: 5; max-height: 220px; overflow: auto; border: 1px solid var(--border, #30363d); border-radius: 10px; background: var(--surface, #111827); box-shadow: 0 10px 30px rgba(0,0,0,.25); }
    .pi-web-chat-popover-head { padding: 6px 10px; color: var(--muted, #8a8f98); font-size: 11px; text-transform: uppercase; }
    .pi-web-chat-popover-list { display: flex; flex-direction: column; }
    .pi-web-chat-popover-item { text-align: left; border: 0; border-top: 1px solid var(--border, #30363d); background: transparent; color: inherit; padding: 8px 10px; }
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
