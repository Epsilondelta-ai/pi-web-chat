import type { BehaviorSubject, Subject } from "rxjs";
import {
  commandName,
  createChatDom,
  createChatSurface,
  createComposerSurface,
  installBadge,
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
  ChatEvent,
  ChatInputSubmitted,
  ChatMessage,
  ChatSession,
  ChatToolCall,
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
  SidebarSelectedSession,
  ToastRequest,
} from "./types";

const STORAGE_KEY = "pi-web-chat.sessions.v1";
const DRAFT_KEY = "pi-web-chat.draft.v1";
const SIDEBAR_ACTIVE_SESSION_KEY = "plugin.pi-web-sidebar.activeSessionId";
const FILE_REF_LIMIT = 12;
const MAX_SESSIONS = 20;
const MAX_MESSAGES_PER_SESSION = 200;
const MAX_LOCAL_ATTACHMENTS = 8;
const MAX_LOCAL_ATTACHMENT_BYTES = 1_000_000;
const MOUNTED_CHAT_POLL_MS = 250;

type AppWithRuntime = HTMLElement & { piWebChat?: Runtime; dataset: DOMStringMap };

type Channels = {
  input$: BehaviorSubject<string>;
  submitted$: Subject<ChatInputSubmitted>;
  activeSessionId$: BehaviorSubject<string | null>;
  sidebarSelectedSession$: BehaviorSubject<SidebarSelectedSession | null>;
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

export { commandName, createChatDom, createChatSurface, createComposerSurface, pluginClass, pluginStyleText };
export { chatEventsToAgUiLikeEvents, createAgUiLikeRunInput, promptFromAgUiLikeRunInput } from "./ag-ui";

export default function activate(context: PluginContext = {}): Cleanup {
  const app = context.app as AppWithRuntime | undefined;
  app?.piWebChat?.dispose();

  if (typeof context.mount?.chat === "function" && typeof context.mount?.composer === "function") {
    return activateMountedPiWeb(context, app);
  }

  const disposables = new Disposables();

  const pi = requirePiWeb();
  const channels = createChannels(pi);
  const draft = loadDraft();
  if (draft) channels.input$.next(draft);
  const state: State = {
    context,
    channels,
    store: loadStore(getInitialSidebarSessionId(context, channels)),
    selectedRefs: new Set(),
    selectedLocalAttachments: [],
    selectedAttachmentNames: [],
    commands: [],
    fileSearchToken: 0,
  };

  saveStore(state.store);
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

function activateMountedPiWeb(context: PluginContext, app: AppWithRuntime | undefined): Cleanup {
  const disposables = new Disposables();
  const style = disposables.add(installStyles());
  const chatSurface = createChatSurface();
  const composerSurface = createComposerSurface();
  const cleanupChat = context.mount?.chat(chatSurface, { replace: true });
  const cleanupComposer = context.mount?.composer(composerSurface, { replace: true });
  if (cleanupChat) disposables.add(cleanupChat);
  if (cleanupComposer) disposables.add(cleanupComposer);
  const mountedStore = loadStore();
  renderMountedBackendMessages(chatSurface, activeSession(mountedStore).messages);
  void refreshMountedBackendChatState(context, chatSurface, mountedStore);
  bindMountedComposer(disposables, context, composerSurface, chatSurface, mountedStore);
  const badge = app ? disposables.add(installBadge(app)) : undefined;
  app?.classList.add(pluginClass());

  const runtime = { dispose: () => disposables.dispose() };
  if (app) app.piWebChat = runtime;

  return (): void => {
    disposables.dispose();
    badge?.remove();
    style.remove();
    app?.classList.remove(pluginClass());
    if (app?.piWebChat === runtime) delete app.piWebChat;
  };
}

function bindMountedComposer(disposables: Disposables, context: PluginContext, composerSurface: HTMLElement, chatSurface: HTMLElement, store: ChatStore): void {
  const textarea = composerSurface.querySelector<HTMLTextAreaElement>(".prompt-textarea");
  const sendButton = composerSurface.querySelector<HTMLButtonElement>(".send-btn");
  if (!textarea || !sendButton) return;

  const sync = (): void => {
    const value = textarea.value;
    sendButton.setAttribute("aria-disabled", value.trim() ? "false" : "true");
  };
  let activePoll: ReturnType<typeof globalThis.setInterval> | undefined;
  disposables.add({ remove: () => { if (activePoll) globalThis.clearInterval(activePoll); } });

  const submit = async (event?: Event): Promise<void> => {
    event?.preventDefault();
    event?.stopImmediatePropagation();
    const text = textarea.value.trim();
    sync();
    if (!text) return;
    sendButton.disabled = true;
    activePoll = globalThis.setInterval(() => {
      void refreshMountedBackendChatState(context, chatSurface, store);
    }, MOUNTED_CHAT_POLL_MS);
    try {
      const response = await submitPromptToPluginBackend(context, text, [], store.activeSessionId);
      const messages = applyBackendResponseToMountedStore(store, response);
      renderMountedBackendMessages(chatSurface, messages);
      textarea.value = "";
    } catch (error) {
      renderMountedBackendMessages(chatSurface, [{ id: id(), role: "system", text: `prompt failed: ${errorText(error)}`, createdAt: Date.now() }]);
    } finally {
      if (activePoll) globalThis.clearInterval(activePoll);
      activePoll = undefined;
      sendButton.disabled = false;
      sync();
    }
  };

  disposables.listen(textarea, "input", sync);
  disposables.listen(textarea, "keydown", (event) => {
    const keyEvent = event as KeyboardEvent;
    if (keyEvent.key === "Enter" && (keyEvent.metaKey || keyEvent.ctrlKey)) void submit(keyEvent);
  });
  disposables.listen(sendButton, "click", (event) => { void submit(event); });
}

export function createChannels(pi: PiWebSubjects): Channels {
  return {
    input$: pi.behaviorSubject<string>("chat.input", ""),
    submitted$: pi.subject<ChatInputSubmitted>("chat.input.submitted"),
    activeSessionId$: pi.behaviorSubject<string | null>("session.activeId", null),
    sidebarSelectedSession$: pi.behaviorSubject<SidebarSelectedSession | null>("plugin.pi-web-sidebar.selectedSession", readSidebarSelectedSession()),
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
    context.app?.dataset.activeWorkspaceId ||
    ""
  );
}

function getInitialSidebarSessionId(context: PluginContext, channels: Channels): string {
  return context.app?.piWebSidebar?.getSnapshot?.().activeSessionId || channels.sidebarSelectedSession$.getValue()?.sessionId || readStoredString(SIDEBAR_ACTIVE_SESSION_KEY);
}

function readSidebarSelectedSession(): SidebarSelectedSession | null {
  const sessionId = readStoredString(SIDEBAR_ACTIVE_SESSION_KEY);
  return sessionId ? { sessionId } : null;
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
    if (id) switchToSession(state, dom, id);
  }));

  disposables.add(state.channels.sidebarSelectedSession$.subscribe((selected) => {
    if (selected?.sessionId) switchToSession(state, dom, selected.sessionId);
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
  render(state, dom);
  try {
    await submitPromptWithStreaming(state, dom, text, attachments);
  } catch (error) {
    state.channels.toastRequested$.next({ level: "error", message: `prompt failed: ${errorText(error)}` });
  }
  clearPendingAttachments(state);
}

async function submitPromptWithStreaming(state: State, dom: ChatDom, text: string, attachments: FileAttachment[]): Promise<void> {
  const start = await backendCall(state.context, "startPrompt", { text, attachments, sessionId: state.store.activeSessionId });
  if (typeof start.runId !== "string" || !start.runId) {
    const response = await submitPromptToPluginBackend(state.context, text, attachments, state.store.activeSessionId);
    applyBackendResponseToStore(state.store, response);
    render(state, dom);
    return;
  }

  if (typeof start.activeSessionId === "string" && start.activeSessionId) {
    state.store.activeSessionId = start.activeSessionId;
  }

  const assistant = ensureStreamingAssistant(state.store);
  let cursor = 0;
  let streaming = true;
  render(state, dom);

  try {
    while (streaming) {
      await delay(120);
      const response = await backendCall(state.context, "streamEvents", { runId: start.runId, cursor });
      const events = Array.isArray(response.events) ? response.events.filter(isChatEvent) : [];
      cursor = typeof response.cursor === "number" ? response.cursor : cursor;
      streaming = response.isStreaming === true;
      applyChatEvents(assistant, events);
      assistant.streaming = streaming;
      activeSession(state.store).updatedAt = Date.now();
      saveStore(state.store);
      render(state, dom);
    }
  } finally {
    assistant.streaming = false;
    saveStore(state.store);
    render(state, dom);
  }

  await refreshBackendChatState(state, dom);
}

async function submitPromptToPluginBackend(context: PluginContext, text: string, attachments: FileAttachment[], sessionId = ""): Promise<BackendResponse> {
  const response = await backendCall(context, "submitPrompt", { text, attachments, sessionId });
  return response;
}

function applyBackendResponseToStore(store: ChatStore, response: BackendResponse): void {
  if (typeof response.activeSessionId === "string" && response.activeSessionId) {
    store.activeSessionId = response.activeSessionId;
  }
  if (Array.isArray(response.messages)) {
    activeSession(store).messages = response.messages.filter(isChatMessage).slice(-MAX_MESSAGES_PER_SESSION);
    activeSession(store).updatedAt = Date.now();
    saveStore(store);
  }
}

function ensureStreamingAssistant(store: ChatStore): ChatMessage {
  const session = activeSession(store);
  const existing = [...session.messages].reverse().find((message) => message.role === "assistant" && message.streaming);
  if (existing) return existing;
  const message: ChatMessage = { id: id(), role: "assistant", text: "", createdAt: Date.now(), streaming: true };
  session.messages.push(message);
  return message;
}

function applyChatEvents(message: ChatMessage, events: ChatEvent[]): void {
  for (const event of events) {
    if (event.type === "text.delta" && typeof event.delta === "string") {
      message.text += event.delta;
    } else if (event.type === "thinking.delta" && typeof event.delta === "string") {
      message.thinking = `${message.thinking || ""}${event.delta}`;
    } else if (event.type === "tool.start") {
      upsertToolCall(message, event, "running");
    } else if (event.type === "tool.delta" && typeof event.delta === "string") {
      const tool = upsertToolCall(message, event, "running");
      tool.text = event.delta;
    } else if (event.type === "tool.end") {
      const tool = upsertToolCall(message, event, event.isError ? "err" : "ok");
      if (typeof event.result === "string" && event.result) tool.text = event.result;
    } else if (event.type === "error" && typeof event.message === "string") {
      message.text += `${message.text ? "\n" : ""}${event.message}`;
    }
  }
}

function upsertToolCall(message: ChatMessage, event: ChatEvent, status: "running" | "ok" | "err"): ChatToolCall {
  const idValue = event.toolCallId || event.toolName || "tool";
  message.toolCalls ||= [];
  let tool = message.toolCalls.find((item) => item.id === idValue);
  if (!tool) {
    tool = { id: idValue, name: event.toolName || "tool", args: event.args, text: "", status };
    message.toolCalls.push(tool);
  }
  tool.status = status;
  if (event.args) tool.args = event.args;
  return tool;
}

function isChatEvent(value: unknown): value is ChatEvent {
  return isRecord(value) && typeof value.type === "string";
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => globalThis.setTimeout(resolve, ms));
}

async function refreshMountedBackendChatState(context: PluginContext, chatSurface: HTMLElement, store: ChatStore): Promise<void> {
  try {
    const response = await backendCall(context, "chatState", {});
    const messages = applyBackendResponseToMountedStore(store, response);
    if (messages.length) renderMountedBackendMessages(chatSurface, messages);
  } catch {
    // The mounted chat still shows any localStorage-backed messages when backend state is unavailable.
  }
}

function applyBackendResponseToMountedStore(store: ChatStore, response: BackendResponse): ChatMessage[] {
  const responseMessages = Array.isArray(response.messages) ? response.messages.filter(isChatMessage) : [];
  if (typeof response.activeSessionId === "string" && response.activeSessionId) {
    let session = store.sessions.find((item) => item.id === response.activeSessionId);
    if (!session) {
      session = createSession(response.activeSessionId);
      store.sessions.unshift(session);
    }
    store.activeSessionId = session.id;
  }
  const session = activeSession(store);
  if (responseMessages.length) {
    session.messages = responseMessages.slice(-MAX_MESSAGES_PER_SESSION);
    if (session.title === "New chat") {
      const firstUser = responseMessages.find((message) => message.role === "user");
      if (firstUser) session.title = firstUser.text.slice(0, 48) || session.title;
    }
    session.updatedAt = Date.now();
  }
  saveStore(store);
  return session.messages;
}

function renderMountedBackendMessages(chatSurface: HTMLElement, messages: ChatMessage[]): void {
  const container = chatSurface.querySelector<HTMLElement>(".term-inner") || chatSurface;
  container.replaceChildren(...messages.map((message) => {
    const item = document.createElement("article");
    item.className = `transcript-item pi-web-chat-message pi-web-chat-message-${message.role}`;
    const role = document.createElement("div");
    role.className = "pi-web-chat-message-role";
    role.textContent = message.role;
    const body = document.createElement("pre");
    body.className = "pi-web-chat-message-body";
    body.textContent = message.text;
    item.append(role, body);
    return item;
  }));
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
  // Adopt backend session state only when the visible local session is still empty.
  // Once the user has local messages, backend history is stored by backend id without switching the active chat.
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

function switchToSession(state: State, dom: ChatDom, sessionId: string): void {
  if (!sessionId || state.store.activeSessionId === sessionId) return;
  let session = state.store.sessions.find((item) => item.id === sessionId);
  if (!session) {
    session = createSession(sessionId);
    state.store.sessions.unshift(session);
  }
  state.store.activeSessionId = session.id;
  saveStore(state.store);
  render(state, dom);
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
  return readStoredString(DRAFT_KEY);
}

function readStoredString(key: string): string {
  try {
    return localStorage.getItem(key) || "";
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

function loadStore(preferredSessionId = ""): ChatStore {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") as Partial<ChatStore> | null;
    if (parsed && typeof parsed.activeSessionId === "string" && Array.isArray(parsed.sessions)) {
      const sessions = parsed.sessions.filter(isSession);
      if (preferredSessionId && !sessions.some((session) => session.id === preferredSessionId)) {
        sessions.unshift(createSession(preferredSessionId));
      }
      return { activeSessionId: preferredSessionId || parsed.activeSessionId, sessions };
    }
  } catch {
    // Fall through to a fresh store.
  }
  const session = createSession(preferredSessionId || undefined);
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
