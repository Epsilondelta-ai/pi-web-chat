const PLUGIN_CLASS = "pi-web-chat-enhanced";
const MATERIAL_PATHS: Record<"attachFile" | "stop" | "send", string> = {
  attachFile: [
    "M16.5 6v11.5a4 4 0 0 1-8 0V5a2.5 2.5 0 0 1 5 0v10.5a1 1 0 0 1-2 0V6H10v9.5",
    "a2.5 2.5 0 0 0 5 0V5a4 4 0 0 0-8 0v12.5a5.5 5.5 0 0 0 11 0V6h-1.5Z",
  ].join(""),
  stop: "M6 6h12v12H6V6Z",
  send: "M2 21 23 12 2 3v7l15 2-15 2v7Z",
};
const MATERIAL_ICONS: Record<keyof typeof MATERIAL_PATHS, string> = {
  attachFile: materialIcon("attach_file", MATERIAL_PATHS.attachFile),
  stop: materialIcon("stop", MATERIAL_PATHS.stop),
  send: materialIcon("send", MATERIAL_PATHS.send),
};
function materialIcon(name: string, path: string): string {
  return `<svg class="material-icon" data-material-icon="${name}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="${path}"></path></svg>`;
}
export function pluginClass(): string {
  return PLUGIN_CLASS;
}
export function createChatSurface(): HTMLElement {
  const surface: HTMLElement = document.createElement("main");
  surface.className = "main pi-web-chat-surface";
  surface.dataset.main = "session";
  surface.innerHTML = `<div class="term"><div class="term-inner"></div></div><button type="button" class="scroll-bottom-btn" data-action="scroll-bottom" aria-label="scroll to bottom" title="scroll to bottom" hidden>↓</button>`;
  return surface;
}
export function createComposerSurface(): HTMLElement {
  const surface: HTMLElement = document.createElement("section");
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
  const badge: HTMLSpanElement = document.createElement("span");
  badge.className = "prompt-meta-item pi-web-chat-badge";
  badge.textContent = "chat plugin · ! / @";
  app.querySelector("[data-prompt-meta]")?.append(badge);
  return badge;
}
export function pluginStyleText(): string {
  return `
    .pi-web-chat-badge { color: var(--muted, #8a8f98); }
    .pi-web-chat-surface { display: flex; flex-direction: column; }
    .pi-web-chat-composer { display: block; }
    .pi-web-chat-composer .material-icon { display: block; width: 16px; height: 16px; pointer-events: none; }
    .${PLUGIN_CLASS} .prompt-file-ref-pop::before,
    .${PLUGIN_CLASS} .slash-pop::before {
      content: "pi-web-chat";
      display: block;
      padding: 4px 8px 2px;
      color: var(--muted, #8a8f98);
      font-size: 11px;
      letter-spacing: .03em;
      text-transform: uppercase;
    }
  `;
}
export function installStyles(): HTMLStyleElement {
  const style: HTMLStyleElement = document.createElement("style");
  style.textContent = pluginStyleText();
  document.head.append(style);
  return style;
}
