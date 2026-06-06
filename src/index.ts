import type { BehaviorSubject, Subject } from "rxjs";
import {
  commandName,
  createChatDom,
  installSettingsSection,
  installStyles,
  installToolbarButton,
  pluginClass,
  pluginStyleText,
  renderAttachmentChips,
  renderFileRefs,
  renderMessages,
  renderSlashCommands,
  setComposerMode,
  type ChatDom,
} from "./dom";
import type {
  BackendResponse,
  ChatInputSubmitted,
  ChatMessage,
  ChatSession,
  ChatStore,
  Cleanup,
  Disposer,
  FileAttachment,
  FileSearchResult,
  JsonRecord,
  PiWebSubjects,
  PluginCommand,
  PluginContext,
  Runtime,
  ToastRequest,
} from "./types";

const STORAGE_KEY = "pi-web-chat.sessions.v1";
const DRAFT_KEY = "pi-web-chat.draft.v1";
const FILE_REF_LIMIT = 12;
const MAX_SESSIONS = 20;
const MAX_MESSAGES_PER_SESSION = 200;
const MAX_LOCAL_ATTACHMENTS = 8;
const MAX_LOCAL_ATTACHMENT_BYTES = 1_000_000;

type AppWithRuntime = HTMLElement & { piWebChat?: Runtime; dataset: DOMStringMap };

type Channels = {
  input$: BehaviorSubject<string>;
  submitted$: Subject<ChatInputSubmitted>;
  activeSessionId$: BehaviorSubject<string | null>;
  toastRequested$: Subject<ToastRequest>;
};

type State = {
  context: PluginContext;
  channels: Channels;
  store: ChatStore;
  selectedRefs: Set<string>;
  selectedLocalAttachments: FileAttachment[];
  selectedAttachmentNames: string[];
  commands: PluginCommand[];
  fileSearchToken: number;
};

class Disposables {
  #items: Disposer[] = [];

  add<T extends Disposer | undefined>(item: T): T {
    if (item) this.#items.push(item);
    return item;
  }

  listen(target: EventTarget, type: string, listener: EventListenerOrEventListenerObject): void {
    target.addEventListener(type, listener);
    this.add({ remove: () => target.removeEventListener(type, listener) });
  }

  dispose(): void {
    for (const item of this.#items.splice(0).reverse()) {
      if (typeof item === "function") item();
      else if ("unsubscribe" in item) item.unsubscribe();
      else item.remove();
    }
  }
}

export { commandName, createChatDom, pluginClass, pluginStyleText };

export default function activate(context: PluginContext = {}): Cleanup {
  const disposables = new Disposables();
  const app = context.app as AppWithRuntime | undefined;
  app?.piWebChat?.dispose();

  const pi = requirePiWeb();
  const channels = createChannels(pi);
  const draft = loadDraft();
  if (draft) channels.input$.next(draft);
  const state: State = {
    context,
    channels,
    store: loadStore(),
    selectedRefs: new Set(),
    selectedLocalAttachments: [],
    selectedAttachmentNames: [],
    commands: [],
    fileSearchToken: 0,
  };

  channels.activeSessionId$.next(state.store.activeSessionId);

  const style = disposables.add(installStyles());
  const dom = createChatDom();
  const main = findMainSurface();
  main.append(dom.root);
  disposables.add(dom.root);
  disposables.add(style);

  disposables.add(installToolbarButton(() => {
    createNewSession(state);
    channels.input$.next("");
    render(state, dom);
  }));
  disposables.add(installSettingsSection());

  bindDom(disposables, state, dom);
  bindChannels(disposables, state, dom);
  render(state, dom);
  updateComposerMode(dom, channels.input$.getValue());
  void refreshCommands(state, dom);
  void refreshBackendChatState(state, dom);

  const runtime = { dispose: () => disposables.dispose() };
  if (app) app.piWebChat = runtime;

  return (): void => {
    disposables.dispose();
    if (app?.piWebChat === runtime) delete app.piWebChat;
  };
}

export function createChannels(pi: PiWebSubjects): Channels {
  return {
    input$: pi.behaviorSubject<string>("chat.input", ""),
    submitted$: pi.subject<ChatInputSubmitted>("chat.input.submitted"),
    activeSessionId$: pi.behaviorSubject<string | null>("session.activeId", null),
    toastRequested$: pi.subject<ToastRequest>("toast.requested"),
  };
}

export function extractRefs(text: unknown): string[] {
  const refs: string[] = [];
  const seen = new Set<string>();
  const pattern = /(^|[\s`])@([^\s@`]+)/g;
  let match: RegExpExecArray | null = pattern.exec(String(text || ""));

  while (match !== null) {
    const ref = match[2] || "";
    if ((match[1] || "") !== "`" && ref && !seen.has(ref)) {
      seen.add(ref);
      refs.push(ref);
    }
    match = pattern.exec(String(text || ""));
  }

  return refs;
}

export function mergeCommands(coreCommands: PluginCommand[] = [], pluginCommands: PluginCommand[] = []): PluginCommand[] {
  const out: PluginCommand[] = [];
  const seen = new Set<string>();

  for (const command of [...coreCommands, ...pluginCommands]) {
    const name = commandName(command);
    if (!name || seen.has(name)) continue;
    seen.add(name);
    out.push(command);
  }

  return out;
}

export function getActiveWorkspaceId(context: PluginContext): string {
  return (
    context.app?.piWebSidebar?.getSnapshot?.().activeWorkspaceId ||
    context.session?.activeWorkspaceId?.() ||
    context.app?.dataset.activeWorkspaceId ||
    ""
  );
}

export async function backendCall(context: PluginContext, method: string, data: JsonRecord = {}): Promise<BackendResponse> {
  if (!context.backend) return {};
  const workspaceId = getActiveWorkspaceId(context);
  const response = await context.backend(method, { workspaceId, data });
  return isRecord(response) ? response : {};
}

function bindDom(disposables: Disposables, state: State, dom: ChatDom): void {
  disposables.listen(dom.textarea, "input", () => {
    state.channels.input$.next(dom.textarea.value);
    dom.sendButton.setAttribute("aria-disabled", dom.textarea.value.trim() ? "false" : "true");
    saveDraft(dom.textarea.value);
    updateComposerMode(dom, dom.textarea.value);
    void updateAssistPopovers(state, dom, dom.textarea.value);
  });

  disposables.listen(dom.textarea, "keydown", (event) => {
    const keyEvent = event as KeyboardEvent;
    if (keyEvent.key === "Enter" && (keyEvent.metaKey || keyEvent.ctrlKey)) {
      keyEvent.preventDefault();
      submitCurrentInput(state);
    }
  });

  disposables.listen(dom.sendButton, "click", () => submitCurrentInput(state));
  disposables.listen(dom.attachButton, "click", () => dom.fileInput.click());
  disposables.listen(dom.fileInput, "change", () => {
    void loadLocalAttachments(state, dom);
  });
}

function bindChannels(disposables: Disposables, state: State, dom: ChatDom): void {
  disposables.add(state.channels.input$.subscribe((value) => {
    if (dom.textarea.value !== value) dom.textarea.value = value;
    dom.sendButton.setAttribute("aria-disabled", value.trim() ? "false" : "true");
    saveDraft(value);
    updateComposerMode(dom, value);
    void updateAssistPopovers(state, dom, value);
  }));

  disposables.add(state.channels.submitted$.subscribe((event) => {
    void handleSubmitted(state, dom, event);
  }));

  disposables.add(state.channels.activeSessionId$.subscribe((id) => {
    if (id && id !== state.store.activeSessionId && state.store.sessions.some((session) => session.id === id)) {
      state.store.activeSessionId = id;
      saveStore(state.store);
      render(state, dom);
    }
  }));
}

function submitCurrentInput(state: State): void {
  const text = state.channels.input$.getValue().trim();
  if (!text) return;
  const attachments = [...state.selectedLocalAttachments];
  clearLocalAttachments(state);
  state.channels.submitted$.next({ text, attachments });
  clearDraft();
  state.channels.input$.next("");
}

async function handleSubmitted(state: State, dom: ChatDom, event: ChatInputSubmitted): Promise<void> {
  const text = event.text.trim();
  if (!text) return;
  renderAttachmentChips(dom.attachments, []);

  if (text.startsWith("!")) {
    clearPendingAttachments(state);
    addMessage(state, { role: "user", text });
    render(state, dom);
    await runShell(state, dom, text.slice(1).trim());
    return;
  }

  const attachments = [...event.attachments, ...(await resolveAttachments(state, text))];
  addMessage(state, { role: "user", text, attachments });
  clearPendingAttachments(state);
  render(state, dom);
}

async function runShell(state: State, dom: ChatDom, command: string): Promise<void> {
  if (!command) return;
  addMessage(state, { role: "tool", text: `$ ${command}\n(running...)`, meta: { status: "running" } });
  render(state, dom);

  try {
    const result = await backendCall(state.context, "runShell", { command });
    const exitCode = typeof result.exitCode === "number" ? result.exitCode : 1;
    const durationMs = typeof result.durationMs === "number" ? result.durationMs : 0;
    const output = typeof result.output === "string" ? result.output : "";
    replaceLastRunningTool(state, `$ ${command}\n${output}${output.endsWith("\n") || !output ? "" : "\n"}[exit ${exitCode} · ${durationMs}ms${result.truncated ? " · truncated" : ""}]`, exitCode === 0 ? "ok" : "err");
  } catch (error) {
    replaceLastRunningTool(state, `$ ${command}\n${errorText(error)}`, "err");
    state.channels.toastRequested$.next({ level: "error", message: `shell failed: ${errorText(error)}` });
  }

  render(state, dom);
}

async function loadLocalAttachments(state: State, dom: ChatDom): Promise<void> {
  const files = Array.from(dom.fileInput.files || []).slice(0, MAX_LOCAL_ATTACHMENTS);
  const attachments: FileAttachment[] = [];

  for (const file of files) {
    if (file.size > MAX_LOCAL_ATTACHMENT_BYTES) {
      state.channels.toastRequested$.next({ level: "warning", message: `${file.name} is too large to attach` });
      continue;
    }
    attachments.push({ name: file.name, size: file.size, content: await file.text(), mimeType: file.type || undefined });
  }

  state.selectedLocalAttachments = attachments;
  state.selectedAttachmentNames = attachments.map((file) => file.name || "attachment");
  renderAttachmentChips(dom.attachments, [...state.selectedAttachmentNames, ...state.selectedRefs]);
}

async function resolveAttachments(state: State, text: string): Promise<FileAttachment[]> {
  const refs = [...new Set([...state.selectedRefs, ...extractRefs(text)])];
  if (!refs.length) return [];

  try {
    const response = await backendCall(state.context, "resolveContext", { text, refs });
    return Array.isArray(response.attachments) ? response.attachments.filter(isRecord) as FileAttachment[] : [];
  } catch (error) {
    state.channels.toastRequested$.next({ level: "warning", message: `@ context failed: ${errorText(error)}` });
    return [];
  }
}

async function refreshCommands(state: State, dom: ChatDom): Promise<void> {
  try {
    const response = await backendCall(state.context, "commands", {});
    state.commands = Array.isArray(response.commands) ? response.commands.filter(isRecord) as PluginCommand[] : [];
    renderSlashCommands(dom.slashList, state.commands, (command) => {
      const template = command.template || commandName(command);
      state.channels.input$.next(template);
      dom.slashPopover.hidden = true;
      dom.textarea.focus();
    });
  } catch (error) {
    state.channels.toastRequested$.next({ level: "warning", message: `commands unavailable: ${errorText(error)}` });
  }
}

async function updateAssistPopovers(state: State, dom: ChatDom, value: string): Promise<void> {
  if (currentSlashQuery(value) !== null) {
    if (!state.commands.length) await refreshCommands(state, dom);
    if (dom.textarea.value !== value) return;
    renderFilteredSlashCommands(state, dom, value);
  } else {
    dom.slashPopover.hidden = true;
  }

  const query = currentFileRefQuery(value);
  if (query === null) {
    state.fileSearchToken += 1;
    dom.refsPopover.hidden = true;
    return;
  }

  const token = ++state.fileSearchToken;
  try {
    const response = await backendCall(state.context, "searchFiles", { query, limit: FILE_REF_LIMIT });
    if (token !== state.fileSearchToken || dom.textarea.value !== value) return;
    const files = Array.isArray(response.files) ? response.files.filter(isRecord) as FileSearchResult[] : [];
    renderFileRefs(dom.refsList, files, (file) => {
      const path = file.path || file.name || "";
      if (!path) return;
      state.selectedRefs.add(path);
      renderAttachmentChips(dom.attachments, [...state.selectedAttachmentNames, ...state.selectedRefs]);
      dom.refsPopover.hidden = true;
      dom.textarea.focus();
    });
    dom.refsPopover.hidden = files.length === 0;
  } catch {
    dom.refsPopover.hidden = true;
  }
}

function currentSlashQuery(value: string): string | null {
  const match = /^\/([^\s/]*)$/.exec(value);
  return match ? match[1].toLowerCase() : null;
}

function renderFilteredSlashCommands(state: State, dom: ChatDom, value: string): void {
  const query = currentSlashQuery(value);
  if (query === null) {
    dom.slashPopover.hidden = true;
    return;
  }
  const commands = state.commands.filter((command) => commandName(command).slice(1).toLowerCase().includes(query));
  renderSlashCommands(dom.slashList, commands, (command) => {
    const template = command.template || commandName(command);
    state.channels.input$.next(template);
    dom.slashPopover.hidden = true;
    dom.textarea.focus();
  });
  dom.slashPopover.hidden = commands.length === 0;
}

function currentFileRefQuery(value: string): string | null {
  const match = /(?:^|\s)@([^\s@`]*)$/.exec(value);
  return match ? match[1] : null;
}

function updateComposerMode(dom: ChatDom, value: string): void {
  if (value.startsWith("!")) setComposerMode(dom, "shell");
  else if (currentFileRefQuery(value) !== null) setComposerMode(dom, "file-ref");
  else setComposerMode(dom, "normal");
}

async function refreshBackendChatState(state: State, dom: ChatDom): Promise<void> {
  try {
    const response = await backendCall(state.context, "chatState", {});
    if (Array.isArray(response.messages)) {
      const messages = response.messages.filter(isChatMessage);
      if (messages.length) {
        const session = sessionForBackendState(state.store, typeof response.activeSessionId === "string" ? response.activeSessionId : null);
        session.messages = mergeChatMessages(session.messages, messages).slice(-MAX_MESSAGES_PER_SESSION);
        session.updatedAt = Date.now();
        saveStore(state.store);
        render(state, dom);
      }
    }
  } catch {
    // pi session state is best-effort; local chat still works without it.
  }
}

function sessionForBackendState(store: ChatStore, backendSessionId: string | null): ChatSession {
  if (!backendSessionId) return activeSession(store);
  let session = store.sessions.find((item) => item.id === backendSessionId);
  if (!session) {
    const active = activeSession(store);
    if (active.messages.length === 0) {
      active.id = backendSessionId;
      store.activeSessionId = backendSessionId;
      session = active;
    } else {
      session = createSession(backendSessionId);
      store.sessions.unshift(session);
    }
  }
  return session;
}

function mergeChatMessages(localMessages: ChatMessage[], backendMessages: ChatMessage[]): ChatMessage[] {
  const merged = new Map<string, ChatMessage>();
  for (const message of localMessages) merged.set(message.id, message);
  for (const message of backendMessages) merged.set(message.id, { ...merged.get(message.id), ...message });
  return [...merged.values()].sort((a, b) => a.createdAt - b.createdAt);
}

function render(state: State, dom: ChatDom): void {
  renderMessages(dom.transcript, activeSession(state.store).messages);
}

function clearPendingAttachments(state: State): void {
  state.selectedRefs.clear();
  clearLocalAttachments(state);
}

function clearLocalAttachments(state: State): void {
  state.selectedLocalAttachments = [];
  state.selectedAttachmentNames = [];
}

function addMessage(state: State, message: Omit<ChatMessage, "id" | "createdAt">): void {
  const session = activeSession(state.store);
  session.messages.push({ id: id(), createdAt: Date.now(), ...message, attachments: sanitizeAttachmentsForStorage(message.attachments) });
  if (session.messages.length > MAX_MESSAGES_PER_SESSION) {
    session.messages.splice(0, session.messages.length - MAX_MESSAGES_PER_SESSION);
  }
  if (session.title === "New chat" && message.role === "user") session.title = message.text.slice(0, 48) || session.title;
  session.updatedAt = Date.now();
  pruneStore(state.store);
  saveStore(state.store);
}

function replaceLastRunningTool(state: State, text: string, status: "ok" | "err"): void {
  const session = activeSession(state.store);
  const message = [...session.messages].reverse().find((item) => item.role === "tool" && item.meta?.status === "running");
  if (message) {
    message.text = text;
    message.meta = { status };
    session.updatedAt = Date.now();
    saveStore(state.store);
  }
}

function activeSession(store: ChatStore): ChatSession {
  let session = store.sessions.find((item) => item.id === store.activeSessionId);
  if (!session) {
    session = createSession();
    store.sessions.unshift(session);
    store.activeSessionId = session.id;
    saveStore(store);
  }
  return session;
}

function createNewSession(state: State): void {
  const session = createSession();
  state.store.sessions.unshift(session);
  state.store.activeSessionId = session.id;
  state.channels.activeSessionId$.next(session.id);
  pruneStore(state.store);
  saveStore(state.store);
}

function createSession(sessionId = id()): ChatSession {
  const now = Date.now();
  return { id: sessionId, title: "New chat", createdAt: now, updatedAt: now, messages: [] };
}

function loadDraft(): string {
  try {
    return localStorage.getItem(DRAFT_KEY) || "";
  } catch {
    return "";
  }
}

function saveDraft(value: string): void {
  try {
    if (value) localStorage.setItem(DRAFT_KEY, value);
    else localStorage.removeItem(DRAFT_KEY);
  } catch {
    // Draft persistence is best effort.
  }
}

function clearDraft(): void {
  saveDraft("");
}

function loadStore(): ChatStore {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") as Partial<ChatStore> | null;
    if (parsed && typeof parsed.activeSessionId === "string" && Array.isArray(parsed.sessions)) {
      return { activeSessionId: parsed.activeSessionId, sessions: parsed.sessions.filter(isSession) };
    }
  } catch {
    // Fall through to a fresh store.
  }
  const session = createSession();
  return { activeSessionId: session.id, sessions: [session] };
}

function saveStore(store: ChatStore): void {
  pruneStore(store);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    for (const session of store.sessions) {
      session.messages = session.messages.slice(-Math.floor(MAX_MESSAGES_PER_SESSION / 2));
    }
    pruneStore(store);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    } catch {
      // Persistence is best effort; do not break chat submission on quota failure.
    }
  }
}

function sanitizeAttachmentsForStorage(attachments: FileAttachment[] | undefined): FileAttachment[] | undefined {
  if (!attachments?.length) return undefined;
  return attachments.map(({ content: _content, ...attachment }) => attachment);
}

function pruneStore(store: ChatStore): void {
  store.sessions.sort((a, b) => b.updatedAt - a.updatedAt);
  const active = store.sessions.find((session) => session.id === store.activeSessionId);
  const rest = store.sessions.filter((session) => session.id !== store.activeSessionId).slice(0, Math.max(0, MAX_SESSIONS - 1));
  store.sessions = active ? [active, ...rest] : store.sessions.slice(0, MAX_SESSIONS);
  for (const session of store.sessions) {
    if (session.messages.length > MAX_MESSAGES_PER_SESSION) {
      session.messages.splice(0, session.messages.length - MAX_MESSAGES_PER_SESSION);
    }
  }
}

function findMainSurface(): HTMLElement {
  return document.querySelector<HTMLElement>(".main[data-main]") || document.querySelector<HTMLElement>("[data-main]") || document.body;
}

function requirePiWeb(): PiWebSubjects {
  if (typeof piWeb === "undefined" || !piWeb) throw new Error("pi-web-chat requires the piWeb Subject registry");
  return piWeb;
}

function isSession(value: unknown): value is ChatSession {
  return isRecord(value) && typeof value.id === "string" && Array.isArray(value.messages);
}

function isChatMessage(value: unknown): value is ChatMessage {
  return isRecord(value) && typeof value.id === "string" && typeof value.text === "string" && typeof value.createdAt === "number"
    && (value.role === "user" || value.role === "assistant" || value.role === "tool" || value.role === "system");
}

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null;
}

function id(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function errorText(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
