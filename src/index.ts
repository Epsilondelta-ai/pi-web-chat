import type { BehaviorSubject, Subject } from "rxjs";
import {
  commandName,
  createChatDom,
  createChatSurface,
  createComposerSurface,
  installBadge,
  installStyles,
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
  SidebarActionEvent,
  SidebarSelectedSession,
  SidebarWorkspace,
  ToastRequest,
} from "./types";

const STORAGE_KEY = "pi-web-chat.sessions.v1";
const DRAFT_KEY = "pi-web-chat.draft.v1";
const SIDEBAR_SELECTED_SESSION_CHANNEL = "plugin.pi-web-sidebar.selectedSession";
const SIDEBAR_EVENT_CHANNEL = "plugin.pi-web-sidebar.event";
const SIDEBAR_ACTIVE_SESSION_KEY = "plugin.pi-web-sidebar.activeSessionId";
const SIDEBAR_ACTIVE_WORKSPACE_KEY = "plugin.pi-web-sidebar.activeWorkspaceId";
const FILE_REF_LIMIT = 12;
const MAX_SESSIONS = 20;
const MAX_MESSAGES_PER_SESSION = 200;
const MAX_LOCAL_ATTACHMENTS = 8;
const MAX_LOCAL_ATTACHMENT_BYTES = 1_000_000;
const MOUNTED_CHAT_POLL_MS = 250;
const STREAM_RENDER_MIN_MS = 250;
const mountedExpandedToolCards: Set<string> = new Set<string>();

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
  backendChatToken: number;
  runEventsAbort?: AbortController;
  sessionEventsAbort?: AbortController;
};

type MountedState = {
  backendChatToken: number;
  runEventsAbort?: AbortController;
  sessionEventsAbort?: AbortController;
};

type MountedScrollLock = {
  term: HTMLElement;
  button: HTMLButtonElement;
  pinned: boolean;
  touchStartY: number | null;
};

type ToolIconName =
  | "book-open"
  | "file-plus"
  | "pencil"
  | "terminal"
  | "cpu"
  | "globe"
  | "search"
  | "braces"
  | "file-text"
  | "circle-question-mark"
  | "users"
  | "plug"
  | "git-branch"
  | "circle-check"
  | "hammer"
  | "package";

const TOOL_ICON_PATHS: Record<ToolIconName, string> = {
  "book-open": `<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>`,
  "file-plus": `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="M9 15h6"/>`,
  pencil: `<path d="M21.2 6.8 17.2 2.8a2 2 0 0 0-2.8 0L3 14.2V21h6.8L21.2 9.6a2 2 0 0 0 0-2.8z"/><path d="m14 5 5 5"/>`,
  terminal: `<path d="m4 17 6-6-6-6"/><path d="M12 19h8"/>`,
  cpu: `<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 15h3"/><path d="M1 9h3"/><path d="M1 15h3"/>`,
  globe: `<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 0 20"/><path d="M12 2a15.3 15.3 0 0 0 0 20"/>`,
  search: `<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>`,
  braces: `<path d="M8 3H7a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-4a2 2 0 0 1 2-2 2 2 0 0 1-2-2V7a2 2 0 0 0-2-2h-1"/>`,
  "file-text": `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>`,
  "circle-question-mark": `<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 1 1 5.8 1c-.5 1-1.4 1.5-2.1 2-.6.4-.8.8-.8 2"/><path d="M12 17h.01"/>`,
  users: `<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>`,
  plug: `<path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a6 6 0 0 1-12 0V8Z"/>`,
  "git-branch": `<line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>`,
  "circle-check": `<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>`,
  hammer: `<path d="m15 12-8.5 8.5a2.1 2.1 0 0 1-3-3L12 9"/><path d="m17.6 5.4 1.8-1.8"/><path d="m14 7 3 3"/><path d="M5 11 2 8l6-6 3 3"/>`,
  package: `<path d="m7.5 4.3 9 5.2"/><path d="M21 8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>`,
};

const mountedScrollLocks: WeakMap<HTMLElement, MountedScrollLock> = new WeakMap<HTMLElement, MountedScrollLock>();

const TOOL_ICON_NAMES: Record<string, ToolIconName> = {
  read: "book-open",
  write: "file-plus",
  edit: "pencil",
  ctx_execute: "cpu",
  ctx_batch_execute: "cpu",
  ctx_execute_file: "cpu",
  ctx_search: "cpu",
  ctx_index: "cpu",
  ctx_fetch_and_index: "cpu",
  web_search: "globe",
  fetch_content: "search",
  get_search_content: "search",
  code_search: "braces",
  document_parse: "file-text",
  ask_user_question: "circle-question-mark",
  teams: "users",
  subagent: "users",
  mcp: "plug",
  git: "git-branch",
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

export { commandName, createChatDom, createChatSurface, createComposerSurface, pluginClass, pluginStyleText, renderMessages };
export { chatEventsToAgUiLikeEvents, createAgUiLikeRunInput, promptFromAgUiLikeRunInput } from "./ag-ui";

export default function activate(context: PluginContext = {}): Cleanup {
  const app = context.app as AppWithRuntime | undefined;
  app?.piWebChat?.dispose();

  if (typeof context.mount?.chat !== "function" || typeof context.mount?.composer !== "function") {
    throw new Error("pi-web-chat requires modern pi-web mount.chat and mount.composer APIs");
  }

  return activateMountedPiWeb(context, app);
}

function activateMountedPiWeb(context: PluginContext, app: AppWithRuntime | undefined): Cleanup {
  const disposables = new Disposables();
  const style = disposables.add(installStyles());
  const chatSurface = createChatSurface();
  const composerSurface = createComposerSurface();
  const cleanupChat = context.mount?.chat(chatSurface, { replace: true });
  const cleanupComposer = context.mount?.composer(composerSurface, { replace: true });
  installMountedScrollLock(disposables, chatSurface);
  if (cleanupChat) {
    disposables.add(cleanupChat);
  }

  if (cleanupComposer) {
    disposables.add(cleanupComposer);
  }
  const selected = readSidebarSelection(context);
  persistSidebarSelection(context, selected || undefined);
  const shouldShowDocumentation: boolean = !selected?.sessionId && !hasStoredSessions();
  const mountedStore = loadStore(selected?.sessionId || "");
  const mountedState: MountedState = { backendChatToken: 0 };

  if (shouldShowDocumentation) {
    renderMountedDocumentation(chatSurface);
  } else {
    renderMountedBackendMessages(chatSurface, activeSession(mountedStore).messages, mountedStore.activeSessionId);
    void openMountedSessionEvents(context, chatSurface, mountedStore, mountedState, selected?.sessionId || mountedStore.activeSessionId);
  }
  bindMountedSidebarSelection(disposables, context, chatSurface, mountedStore, mountedState);
  bindMountedComposer(disposables, context, composerSurface, chatSurface, mountedStore, mountedState);
  const badge = app ? disposables.add(installBadge(app)) : undefined;
  app?.classList.add(pluginClass());

  const cleanup = (): void => {
    mountedState.runEventsAbort?.abort();
    mountedState.sessionEventsAbort?.abort();
    disposables.dispose();
    mountedExpandedToolCards.clear();
    badge?.remove();
    style.remove();
    app?.classList.remove(pluginClass());
    if (app?.piWebChat === runtime) delete app.piWebChat;
  };
  const runtime = { dispose: cleanup };
  if (app) {
    app.piWebChat = runtime;
  }

  return cleanup;
}

function bindMountedComposer(
  disposables: Disposables,
  context: PluginContext,
  composerSurface: HTMLElement,
  chatSurface: HTMLElement,
  store: ChatStore,
  mountedState: MountedState,
): void {
  const textarea = composerSurface.querySelector<HTMLTextAreaElement>(".prompt-textarea");
  const sendButton = composerSurface.querySelector<HTMLButtonElement>(".send-btn");
  const attachButton = composerSurface.querySelector<HTMLButtonElement>(".attach-btn");
  const fileInput = composerSurface.querySelector<HTMLInputElement>("[data-file-input]");
  const attachmentChips = composerSurface.querySelector<HTMLElement>(".attach-chips");

  if (!textarea || !sendButton) {
    return;
  }

  let selectedAttachments: FileAttachment[] = [];

  const sync = (): void => {
    const value = textarea.value;
    sendButton.setAttribute("aria-disabled", value.trim() ? "false" : "true");
  };
  const syncAttachments = (): void => {
    if (!attachmentChips) {
      return;
    }

    renderAttachmentChips(attachmentChips, selectedAttachments.map((attachment): string => {
      return attachment.name || "attachment";
    }));
  };
  const submit = async (event?: Event): Promise<void> => {
    event?.preventDefault();
    event?.stopImmediatePropagation();
    const text = textarea.value.trim();
    sync();

    if (!text) {
      return;
    }

    const attachments = [...selectedAttachments];
    sendButton.disabled = true;

    try {
      publishChatInputSubmitted(text, attachments);
      await submitMountedPromptWithStreaming(context, chatSurface, store, mountedState, text, attachments);
      selectedAttachments = [];
      syncAttachments();

      if (textarea.value.trim() === text) {
        textarea.value = "";
      }

      if (fileInput) {
        fileInput.value = "";
      }
    } catch (error) {
      renderMountedBackendMessages(chatSurface, [mountedPromptErrorMessage(error)], store.activeSessionId);
    } finally {
      sendButton.disabled = false;
      sync();
    }
  };

  disposables.listen(textarea, "input", sync);
  disposables.listen(textarea, "keydown", (event) => {
    const keyEvent = event as KeyboardEvent;

    if (keyEvent.key === "Enter" && (keyEvent.metaKey || keyEvent.ctrlKey)) {
      void submit(keyEvent);
    }
  });
  disposables.listen(sendButton, "click", (event) => {
    void submit(event);
  });

  if (attachButton && fileInput) {
    disposables.listen(attachButton, "click", () => fileInput.click());
    disposables.listen(fileInput, "change", () => {
      void loadMountedLocalAttachments(fileInput, (attachments: FileAttachment[]): void => {
        selectedAttachments = attachments;
        syncAttachments();
      });
    });
  }
}

function mountedPromptErrorMessage(error: unknown): ChatMessage {
  return {
    id: id(),
    role: "system",
    text: `prompt failed: ${errorText(error)}`,
    createdAt: Date.now(),
  };
}

async function loadMountedLocalAttachments(
  fileInput: HTMLInputElement,
  onLoaded: (attachments: FileAttachment[]) => void,
): Promise<void> {
  const files = Array.from(fileInput.files || []).slice(0, MAX_LOCAL_ATTACHMENTS);
  const attachments: FileAttachment[] = [];

  for (const file of files) {
    if (file.size > MAX_LOCAL_ATTACHMENT_BYTES) {
      continue;
    }

    attachments.push({
      name: file.name,
      size: file.size,
      content: await file.text(),
      mimeType: file.type || undefined,
    });
  }

  onLoaded(attachments);
}

export function createChannels(pi: PiWebSubjects): Channels {
  return {
    input$: pi.behaviorSubject<string>("chat.input", ""),
    submitted$: pi.subject<ChatInputSubmitted>("chat.input.submitted"),
    activeSessionId$: pi.behaviorSubject<string | null>("session.activeId", null),
    sidebarSelectedSession$: pi.behaviorSubject<SidebarSelectedSession | null>(SIDEBAR_SELECTED_SESSION_CHANNEL, readSidebarSelectedSession()),
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
  return readSidebarSelection(context)?.sessionId || channels.sidebarSelectedSession$.getValue()?.sessionId || "";
}

function readSidebarSelectedSession(): SidebarSelectedSession | null {
  return readSidebarSelection({});
}

function readSidebarSelection(context: PluginContext): SidebarSelectedSession | null {
  const snapshot = context.app?.piWebSidebar?.getSnapshot?.() || globalThis.piWebSidebar?.getSnapshot?.();
  const snapshotSessionId = snapshot?.activeSessionId || "";
  const snapshotWorkspaceId = snapshot?.activeWorkspaceId || "";

  if (snapshotSessionId) {
    return { sessionId: snapshotSessionId, workspaceId: snapshotWorkspaceId || undefined };
  }

  const sessionId = readStoredString(SIDEBAR_ACTIVE_SESSION_KEY);
  const workspaceId = readStoredString(SIDEBAR_ACTIVE_WORKSPACE_KEY);
  return sessionId ? { sessionId, workspaceId: workspaceId || undefined } : null;
}

function persistSidebarSelection(context: PluginContext, selected: SidebarSelectedSession | undefined): void {
  if (selected?.workspaceId && context.app) {
    context.app.dataset.activeWorkspaceId = selected.workspaceId;
    storeString(SIDEBAR_ACTIVE_WORKSPACE_KEY, selected.workspaceId);
  }

  if (selected?.sessionId) {
    context.app?.setAttribute("data-active-session-id", selected.sessionId);
    storeString(SIDEBAR_ACTIVE_SESSION_KEY, selected.sessionId);
  }
}

function publishSidebarEvent(context: PluginContext, type: string, detail: JsonRecord = {}): void {
  const snapshot = context.app?.piWebSidebar?.getSnapshot?.() || globalThis.piWebSidebar?.getSnapshot?.();
  const event: SidebarActionEvent = { type, detail, snapshot };
  const sidebarEvents = context.app?.piWebSidebar?.channels?.events$ || globalThis.piWebSidebar?.channels?.events$;
  sidebarEvents?.next(event);
  globalThis.piWeb?.subject<SidebarActionEvent>(SIDEBAR_EVENT_CHANNEL).next(event);
}

function publishSidebarActiveSession(context: PluginContext, sessionId: string, reason: string): void {
  const workspaceId = context.app?.dataset.activeWorkspaceId || getActiveWorkspaceId(context);
  const detail: JsonRecord = { reason, sessionId, workspaceId };

  globalThis.piWeb?.behaviorSubject<string | null>("session.activeId", sessionId).next(sessionId);
  globalThis.piWeb?.subject<JsonRecord>("session.changed").next({ sessionId, workspaceId, reason });
  publishSidebarEvent(context, "active.start", detail);
  publishSidebarEvent(context, "session.created", detail);
}

function storeString(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Sidebar persistence is best effort.
  }
}

export async function backendCall(
  context: PluginContext,
  method: string,
  data: JsonRecord = {},
  workspaceId = getActiveWorkspaceId(context),
): Promise<BackendResponse> {
  if (!context.backend) return {};
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
    if (id) {
      persistSidebarSelection(state.context, {
        sessionId: id,
        workspaceId: state.context.app?.dataset.activeWorkspaceId || getActiveWorkspaceId(state.context) || undefined,
      });
      switchToSession(state, dom, id);
    }
  }));

  disposables.add(state.channels.sidebarSelectedSession$.subscribe((selected) => {
    if (selected?.workspaceId && state.context.app) {
      state.context.app.dataset.activeWorkspaceId = selected.workspaceId;
    }

    if (selected?.sessionId) {
      switchToSession(state, dom, selected.sessionId);
      void openSessionEvents(state, dom, selected.sessionId);
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
  const sessionId = syncStateToViewedSession(state, dom);
  renderAttachmentChips(dom.attachments, []);

  if (text.startsWith("!")) {
    clearPendingAttachments(state);
    addMessage(state, { role: "user", text });
    render(state, dom);
    await runShell(state, dom, text.slice(1).trim());
    return;
  }

  const attachments = [...event.attachments, ...(await resolveAttachments(state, text))];
  const pendingUserMessage = addMessageToSession(state.store, sessionId, { role: "user", text, attachments });
  render(state, dom);
  try {
    await submitPromptWithStreaming(state, dom, text, attachments, sessionId, pendingUserMessage);
  } catch (error) {
    state.channels.toastRequested$.next({ level: "error", message: `prompt failed: ${errorText(error)}` });
  }
  clearPendingAttachments(state);
}

async function submitPromptWithStreaming(
  state: State,
  dom: ChatDom,
  text: string,
  attachments: FileAttachment[],
  sessionId: string,
  pendingUserMessage: ChatMessage,
): Promise<void> {
  state.backendChatToken += 1;
  state.runEventsAbort?.abort();
  const runController = new AbortController();
  state.runEventsAbort = runController;
  state.sessionEventsAbort?.abort();
  let targetSessionId: string = sessionId;
  const targetWorkspace = activeWorkspaceSelection(state.context);
  const start = await startStreamingPrompt(state.context, text, attachments, targetSessionId, targetWorkspace.path, targetWorkspace.id);
  if (typeof start.activeSessionId === "string" && start.activeSessionId) {
    const previousSessionId = targetSessionId;
    const shouldAdoptActiveSession = state.store.activeSessionId === previousSessionId;
    targetSessionId = start.activeSessionId;

    if (shouldAdoptActiveSession) {
      state.store.activeSessionId = targetSessionId;
    }

    moveMessageBetweenSessions(state.store, previousSessionId, targetSessionId, pendingUserMessage.id);
  }

  if (typeof start.runId !== "string" || !start.runId) {
    const response = await submitPromptToPluginBackend(state.context, text, attachments, targetSessionId, targetWorkspace.path, targetWorkspace.id);
    applyBackendResponseToSession(state.store, response, targetSessionId, state.store.activeSessionId === targetSessionId);
    render(state, dom);

    if (state.runEventsAbort === runController) {
      state.runEventsAbort = undefined;
    }

    return;
  }

  const session = sessionById(state.store, targetSessionId);
  const assistant = ensureStreamingAssistant(session);
  try {
    await consumeStreamingRun(state.context, state.store, session, start.runId, targetWorkspace.path, targetWorkspace.id, assistant, (): void => {
      if (state.store.activeSessionId === targetSessionId) {
        render(state, dom);
      }
    }, runController.signal);
  } finally {
    if (state.runEventsAbort === runController) {
      state.runEventsAbort = undefined;
    }
  }

  if (state.store.activeSessionId === targetSessionId) {
    void openSessionEvents(state, dom, targetSessionId, targetWorkspace.path, targetWorkspace.id);
  }
}

async function submitMountedPromptWithStreaming(
  context: PluginContext,
  chatSurface: HTMLElement,
  store: ChatStore,
  mountedState: MountedState,
  text: string,
  attachments: FileAttachment[],
): Promise<void> {
  let targetSessionId: string = syncMountedStoreToViewedSession(context, store);
  const targetWorkspace = activeWorkspaceSelection(context);
  mountedState.backendChatToken += 1;
  mountedState.runEventsAbort?.abort();
  const runController = new AbortController();
  mountedState.runEventsAbort = runController;
  mountedState.sessionEventsAbort?.abort();
  const pendingUserMessage: ChatMessage = {
    id: id(),
    role: "user",
    text,
    attachments: sanitizeAttachmentsForStorage(attachments),
    createdAt: Date.now(),
  };
  const submitSession = sessionById(store, targetSessionId);
  submitSession.messages.push(pendingUserMessage);
  submitSession.updatedAt = Date.now();
  saveStore(store);
  renderMountedBackendMessages(chatSurface, submitSession.messages, targetSessionId);

  const start = await startStreamingPrompt(context, text, attachments, targetSessionId, targetWorkspace.path, targetWorkspace.id);

  if (typeof start.activeSessionId === "string" && start.activeSessionId) {
    const previousSessionId = targetSessionId;
    const shouldAdoptActiveSession = store.activeSessionId === previousSessionId;
    targetSessionId = start.activeSessionId;

    if (shouldAdoptActiveSession) {
      switchMountedStoreToSession(store, targetSessionId);
      persistSidebarSelection(context, {
        sessionId: start.activeSessionId,
        workspaceId: targetWorkspace.id || undefined,
      });
      publishSidebarEvent(context, "chat-session", { reason: "startPrompt", sessionId: start.activeSessionId });
      publishSidebarActiveSession(context, start.activeSessionId, "startPrompt");
    } else {
      sessionById(store, targetSessionId);
    }

    moveMessageBetweenSessions(store, previousSessionId, targetSessionId, pendingUserMessage.id);
  }

  if (typeof start.runId !== "string" || !start.runId) {
    const response = await submitPromptToPluginBackend(context, text, attachments, targetSessionId, targetWorkspace.path, targetWorkspace.id);
    const messages = applyBackendResponseToMountedSession(context, store, response, "submitPrompt", targetSessionId);

    if (store.activeSessionId === targetSessionId) {
      renderMountedBackendMessages(chatSurface, messages, targetSessionId);
    }

    if (mountedState.runEventsAbort === runController) {
      mountedState.runEventsAbort = undefined;
    }

    return;
  }

  const session = sessionById(store, targetSessionId);
  const assistant = ensureStreamingAssistant(session);
  try {
    await consumeStreamingRun(
      context,
      store,
      session,
      start.runId,
      targetWorkspace.path,
      targetWorkspace.id,
      assistant,
      (): void => {
        if (store.activeSessionId === targetSessionId) {
          renderMountedBackendMessages(chatSurface, session.messages, targetSessionId);
        }
      },
      runController.signal,
    );
  } finally {
    if (mountedState.runEventsAbort === runController) {
      mountedState.runEventsAbort = undefined;
    }
  }

  if (store.activeSessionId === targetSessionId) {
    void openMountedSessionEvents(context, chatSurface, store, mountedState, targetSessionId, targetWorkspace.path, targetWorkspace.id);
  }
}

async function consumeStreamingRun(
  context: PluginContext,
  store: ChatStore,
  session: ChatSession,
  runId: string,
  workspacePath: string,
  workspaceId: string,
  assistant: ChatMessage,
  renderCurrent: () => void,
  signal?: AbortSignal,
): Promise<void> {
  const stream = await backendSseStream(context, "streamEventsSse", { runId, cursor: 0, workspacePath }, signal, workspaceId);

  if (!stream) {
    throw new Error("SSE streaming backend did not return a stream");
  }

  const render = throttledRender(renderCurrent);
  assistant.streaming = true;
  render.flush();

  try {
    await readSseChatEvents(stream, (event: ChatEvent): void => {
      applyChatEvents(assistant, [event]);
      assistant.streaming = event.type !== "run.end";
      session.updatedAt = Date.now();
      saveStore(store);
      render.request();
    });
  } finally {
    assistant.streaming = false;
    saveStore(store);
    render.flush();
  }
}

function throttledRender(renderNow: () => void): { request: () => void; flush: () => void; cancel: () => void } {
  let lastRender = 0;
  let pending: ReturnType<typeof setTimeout> | undefined;

  const cancel = (): void => {
    if (pending) {
      clearTimeout(pending);
      pending = undefined;
    }
  };

  const flush = (): void => {
    cancel();
    lastRender = Date.now();
    renderNow();
  };

  const request = (): void => {
    const delay = STREAM_RENDER_MIN_MS - (Date.now() - lastRender);

    if (delay <= 0) {
      flush();
      return;
    }

    pending ||= setTimeout(flush, delay);
  };

  return { request, flush, cancel };
}

async function backendSseStream(
  context: PluginContext,
  method: string,
  data: JsonRecord = {},
  signal?: AbortSignal,
  workspaceId = getActiveWorkspaceId(context),
): Promise<ReadableStream<Uint8Array> | null> {
  if (!context.backendStream) {
    throw new Error("SSE streaming backend is unavailable");
  }

  const response = await context.backendStream(method, { workspaceId, data }, { signal });
  return readableStreamFromBackendResponse(response);
}

function readableStreamFromBackendResponse(response: unknown): ReadableStream<Uint8Array> | null {
  if (typeof ReadableStream !== "undefined" && response instanceof ReadableStream) {
    return response as ReadableStream<Uint8Array>;
  }

  if (typeof Response !== "undefined" && response instanceof Response) {
    return response.body;
  }

  if (typeof response === "string") {
    return textToReadableStream(response);
  }

  if (!isRecord(response)) {
    return null;
  }

  const body = response.body;

  if (typeof ReadableStream !== "undefined" && body instanceof ReadableStream) {
    return body as ReadableStream<Uint8Array>;
  }

  const sse = response.sse;

  if (typeof sse === "string") {
    return textToReadableStream(sse);
  }

  return null;
}

function textToReadableStream(text: string): ReadableStream<Uint8Array> {
  const encoded = new TextEncoder().encode(text);
  return new ReadableStream<Uint8Array>({
    start(controller: ReadableStreamDefaultController<Uint8Array>): void {
      controller.enqueue(encoded);
      controller.close();
    },
  });
}

async function readSseChatEvents(stream: ReadableStream<Uint8Array>, onEvent: (event: ChatEvent) => void): Promise<void> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const result = await reader.read();

    if (result.done) {
      buffer += decoder.decode();
      emitSseBuffer(buffer, onEvent);
      return;
    }

    buffer += decoder.decode(result.value, { stream: true });
    const split = splitCompleteSseFrames(buffer);
    buffer = split.remainder;

    for (const frame of split.frames) {
      emitSseFrame(frame, onEvent);
    }
  }
}

function splitCompleteSseFrames(buffer: string): { frames: string[]; remainder: string } {
  const normalized = buffer.replaceAll("\r\n", "\n").replaceAll("\r", "\n");
  const parts = normalized.split("\n\n");
  const remainder = parts.pop() || "";
  return { frames: parts, remainder };
}

function emitSseBuffer(buffer: string, onEvent: (event: ChatEvent) => void): void {
  const trimmed = buffer.trim();

  if (trimmed) {
    emitSseFrame(trimmed, onEvent);
  }
}

function emitSseFrame(frame: string, onEvent: (event: ChatEvent) => void): void {
  const data = frame
    .split("\n")
    .filter((line: string): boolean => line.startsWith("data:"))
    .map((line: string): string => line.slice(5).trimStart())
    .join("\n");

  if (!data) {
    return;
  }

  try {
    const parsed: unknown = JSON.parse(data);

    if (isChatEvent(parsed)) {
      onEvent(parsed);
    }
  } catch {
    // Ignore malformed SSE frames; the next frame can still be valid.
  }
}

function publishChatInputSubmitted(text: string, attachments: FileAttachment[]): void {
  globalThis.piWeb?.subject<ChatInputSubmitted>("chat.input.submitted").next({
    text,
    attachments: sanitizeAttachmentsForStorage(attachments) || [],
  });
}

async function startStreamingPrompt(
  context: PluginContext,
  text: string,
  attachments: FileAttachment[],
  sessionId: string,
  workspacePath = activeWorkspaceSelection(context).path,
  workspaceId = activeWorkspaceSelection(context).id,
): Promise<BackendResponse> {
  try {
    return await backendCall(context, "startPrompt", promptRequestData(text, attachments, sessionId, workspacePath), workspaceId);
  } catch (error) {
    if (isUnsupportedStreamingBackend(error)) return {};
    throw error;
  }
}

function isUnsupportedStreamingBackend(error: unknown): boolean {
  return /unknown method: (startPrompt|streamEventsSse)|unsupported method: (startPrompt|streamEventsSse)|(startPrompt|streamEventsSse) unsupported/i.test(errorText(error));
}

async function submitPromptToPluginBackend(
  context: PluginContext,
  text: string,
  attachments: FileAttachment[],
  sessionId = "",
  workspacePath = activeWorkspaceSelection(context).path,
  workspaceId = activeWorkspaceSelection(context).id,
): Promise<BackendResponse> {
  const response = await backendCall(context, "submitPrompt", promptRequestData(text, attachments, sessionId, workspacePath), workspaceId);
  return response;
}

function promptRequestData(text: string, attachments: FileAttachment[], sessionId: string, workspacePath: string): JsonRecord {
  const data: JsonRecord = { text, attachments, sessionId };

  if (workspacePath) {
    data.workspacePath = workspacePath;
  }

  return data;
}

function applyBackendResponseToStore(store: ChatStore, response: BackendResponse): void {
  const fallbackSessionId = typeof response.activeSessionId === "string" && response.activeSessionId
    ? response.activeSessionId
    : store.activeSessionId;

  applyBackendResponseToSession(store, response, fallbackSessionId, true);
}

function applyBackendResponseToSession(
  store: ChatStore,
  response: BackendResponse,
  fallbackSessionId: string,
  shouldAdoptActiveSession: boolean,
): void {
  const sessionId = typeof response.activeSessionId === "string" && response.activeSessionId ? response.activeSessionId : fallbackSessionId;

  if (typeof response.activeSessionId === "string" && response.activeSessionId) {
    sessionById(store, response.activeSessionId);

    if (shouldAdoptActiveSession) {
      store.activeSessionId = response.activeSessionId;
    }
  }

  if (Array.isArray(response.messages)) {
    const session = sessionById(store, sessionId);
    const nextMessages = sanitizeChatMessages(response.messages).slice(-MAX_MESSAGES_PER_SESSION);
    if (!sessionMessagesChanged(session.messages, nextMessages)) {
      return;
    }

    session.messages = nextMessages;
    session.updatedAt = Date.now();
    saveStore(store);
  }
}

function ensureStreamingAssistant(session: ChatSession): ChatMessage {
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

async function openMountedSessionEvents(
  context: PluginContext,
  chatSurface: HTMLElement,
  store: ChatStore,
  mountedState: MountedState,
  sessionId = "",
  workspacePath = activeWorkspacePath(context),
  workspaceId = activeWorkspaceSelection(context).id,
): Promise<void> {
  if (!context.backendStream) {
    await refreshMountedBackendChatState(context, chatSurface, store, mountedState, sessionId, workspacePath);
    return;
  }

  const token = ++mountedState.backendChatToken;
  mountedState.sessionEventsAbort?.abort();
  const controller = new AbortController();
  mountedState.sessionEventsAbort = controller;
  const render = throttledRender((): void => {
    renderMountedBackendMessages(chatSurface, activeSession(store).messages, store.activeSessionId);
  });

  try {
    const stream = await backendSseStream(context, "sessionEventsSse", chatStateRequestData(context, sessionId, workspacePath), controller.signal, workspaceId);

    if (!stream) {
      throw new Error("session SSE backend did not return a stream");
    }

    await readSseChatEvents(stream, (event: ChatEvent): void => {
      if (token !== mountedState.backendChatToken || event.type !== "chat.state") {
        return;
      }

      const messages = applyBackendResponseToMountedStore(context, store, chatStateEventResponse(event), "chatState");
      if (messages.length) {
        render.request();
      }
    });
  } catch (error) {
    if (!controller.signal.aborted) {
      await refreshMountedBackendChatState(context, chatSurface, store, mountedState, sessionId, workspacePath);
    }
  } finally {
    render.cancel();

    if (mountedState.sessionEventsAbort === controller) {
      mountedState.sessionEventsAbort = undefined;
    }
  }
}

async function refreshMountedBackendChatState(
  context: PluginContext,
  chatSurface: HTMLElement,
  store: ChatStore,
  mountedState: MountedState,
  sessionId = "",
  workspacePath = activeWorkspacePath(context),
): Promise<void> {
  const token = ++mountedState.backendChatToken;

  try {
    const response = await backendCall(context, "chatState", chatStateRequestData(context, sessionId, workspacePath));

    if (token !== mountedState.backendChatToken) {
      return;
    }

    const messages = applyBackendResponseToMountedStore(context, store, response, "chatState");
    if (messages.length) {
      renderMountedBackendMessages(chatSurface, messages, store.activeSessionId);
    }
  } catch {
    // The mounted chat still shows any localStorage-backed messages when backend state is unavailable.
  }
}

function chatStateRequestData(
  context: PluginContext,
  sessionId: string,
  workspacePath = activeWorkspacePath(context),
): JsonRecord {
  const data: JsonRecord = sessionId ? { sessionId } : {};

  if (workspacePath) {
    data.workspacePath = workspacePath;
  }

  return data;
}

function chatStateEventResponse(event: ChatEvent): BackendResponse {
  return {
    activeSessionId: event.activeSessionId,
    messages: event.messages,
    isStreaming: event.isStreaming,
  };
}

function activeWorkspacePath(context: PluginContext): string {
  return activeWorkspaceSelection(context).path;
}

function activeWorkspaceSelection(context: PluginContext): { id: string; path: string } {
  const snapshot = context.app?.piWebSidebar?.getSnapshot?.() || globalThis.piWebSidebar?.getSnapshot?.();
  const workspaceId = snapshot?.activeWorkspaceId || context.app?.dataset.activeWorkspaceId || "";
  const path = snapshot?.workspaces?.find((workspace: SidebarWorkspace): boolean => workspace.id === workspaceId)?.path || "";
  return { id: workspaceId, path };
}

function workspaceSelectionForSelectedSession(
  context: PluginContext,
  selected: SidebarSelectedSession,
): { id: string; path: string } {
  const snapshot = context.app?.piWebSidebar?.getSnapshot?.() || globalThis.piWebSidebar?.getSnapshot?.();
  const workspaceId = selected.workspaceId || snapshot?.activeWorkspaceId || context.app?.dataset.activeWorkspaceId || "";
  const path = snapshot?.workspaces?.find((workspace: SidebarWorkspace): boolean => workspace.id === workspaceId)?.path || "";

  if (path || workspaceId !== snapshot?.activeWorkspaceId) {
    return { id: workspaceId, path };
  }

  return activeWorkspaceSelection(context);
}

function applyBackendResponseToMountedStore(
  context: PluginContext,
  store: ChatStore,
  response: BackendResponse,
  reason: string,
): ChatMessage[] {
  const responseMessages = sanitizeChatMessages(response.messages);

  if (typeof response.activeSessionId === "string" && response.activeSessionId) {
    const previousSessionId = store.activeSessionId;
    switchMountedStoreToSession(store, response.activeSessionId);
    persistSidebarSelection(context, {
      sessionId: response.activeSessionId,
      workspaceId: context.app?.dataset.activeWorkspaceId || getActiveWorkspaceId(context) || undefined,
    });

    if (reason !== "chatState" || previousSessionId !== response.activeSessionId) {
      publishSidebarEvent(context, "chat-session", { reason, sessionId: response.activeSessionId });
    }

    if (reason !== "chatState") {
      publishSidebarActiveSession(context, response.activeSessionId, reason);
    }
  }

  const session = activeSession(store);

  if (!responseMessages.length) {
    return [];
  }

  const nextMessages = mergeChatMessages(session.messages, responseMessages).slice(-MAX_MESSAGES_PER_SESSION);
  if (!sessionMessagesChanged(session.messages, nextMessages)) {
    return [];
  }

  session.messages = nextMessages;

  if (session.title === "New chat") {
    const firstUser = session.messages.find((message) => message.role === "user");

    if (firstUser) {
      session.title = firstUser.text.slice(0, 48) || session.title;
    }
  }

  session.updatedAt = Date.now();
  saveStore(store);
  return session.messages;
}

function sessionMessagesChanged(current: ChatMessage[], next: ChatMessage[]): boolean {
  if (current.length !== next.length) {
    return true;
  }

  return current.some((message, index) => messageSignature(message) !== messageSignature(next[index]));
}

function messageSignature(message: ChatMessage): string {
  return JSON.stringify({
    id: message.id,
    role: message.role,
    text: message.text,
    thinking: message.thinking,
    streaming: message.streaming,
    toolCalls: message.toolCalls,
    attachments: message.attachments,
  });
}

function applyBackendResponseToMountedSession(
  context: PluginContext,
  store: ChatStore,
  response: BackendResponse,
  reason: string,
  fallbackSessionId: string,
): ChatMessage[] {
  const responseMessages = sanitizeChatMessages(response.messages);
  const responseSessionId = typeof response.activeSessionId === "string" && response.activeSessionId
    ? response.activeSessionId
    : fallbackSessionId;
  const shouldAdoptActiveSession = store.activeSessionId === fallbackSessionId;

  if (responseSessionId !== fallbackSessionId) {
    if (shouldAdoptActiveSession) {
      switchMountedStoreToSession(store, responseSessionId);
      persistSidebarSelection(context, {
        sessionId: responseSessionId,
        workspaceId: activeWorkspaceSelection(context).id || undefined,
      });
      publishSidebarEvent(context, "chat-session", { reason, sessionId: responseSessionId });
      publishSidebarActiveSession(context, responseSessionId, reason);
    } else {
      sessionById(store, responseSessionId);
    }
  }

  const session = sessionById(store, responseSessionId);

  if (!responseMessages.length) {
    return [];
  }

  const nextMessages = mergeChatMessages(session.messages, responseMessages).slice(-MAX_MESSAGES_PER_SESSION);
  if (!sessionMessagesChanged(session.messages, nextMessages)) {
    return [];
  }

  session.messages = nextMessages;
  session.updatedAt = Date.now();
  saveStore(store);
  return session.messages;
}

function bindMountedSidebarSelection(
  disposables: Disposables,
  context: PluginContext,
  chatSurface: HTMLElement,
  store: ChatStore,
  mountedState: MountedState,
): void {
  const onSelected = (selected: SidebarSelectedSession | null): void => {
    if (!selected?.sessionId) {
      return;
    }

    if (isMountedSelectionActive(context, store, selected)) {
      return;
    }

    persistSidebarSelection(context, selected);
    switchMountedStoreToSession(store, selected.sessionId);
    renderMountedBackendMessages(chatSurface, activeSession(store).messages, store.activeSessionId);
    const workspace: { id: string; path: string } = workspaceSelectionForSelectedSession(context, selected);
    void openMountedSessionEvents(context, chatSurface, store, mountedState, selected.sessionId, workspace.path, workspace.id);
  };

  const onSidebarEvent = (event: SidebarActionEvent): void => {
    const selected = selectedSessionFromSidebarEvent(context, event);

    if (selected) {
      onSelected(selected);
    }
  };
  const sidebarSelection = context.app?.piWebSidebar?.channels?.selectedSession$ || globalThis.piWebSidebar?.channels?.selectedSession$;
  const sidebarEvents = context.app?.piWebSidebar?.channels?.events$ || globalThis.piWebSidebar?.channels?.events$;

  if (sidebarSelection) {
    disposables.add(sidebarSelection.subscribe(onSelected));
  }

  if (sidebarEvents) {
    disposables.add(sidebarEvents.subscribe(onSidebarEvent));
  }

  if (context.app) {
    disposables.listen(context.app, "pi-web-sidebar:session-created", (event: Event): void => {
      const detail = (event as CustomEvent<JsonRecord>).detail || {};
      const sessionId = typeof detail.sessionId === "string" ? detail.sessionId : "";
      const workspaceId = typeof detail.workspaceId === "string" ? detail.workspaceId : "";

      if (sessionId) {
        onSelected({ sessionId, workspaceId: workspaceId || undefined });
      }
    });
  }

  if (globalThis.piWeb) {
    disposables.add(globalThis.piWeb.behaviorSubject<SidebarSelectedSession | null>(SIDEBAR_SELECTED_SESSION_CHANNEL, readSidebarSelection(context)).subscribe(onSelected));
    disposables.add(globalThis.piWeb.subject<SidebarActionEvent>(SIDEBAR_EVENT_CHANNEL).subscribe(onSidebarEvent));
    disposables.add(globalThis.piWeb.behaviorSubject<string | null>("session.activeId", null).subscribe((sessionId: string | null): void => {
      if (!sessionId) {
        return;
      }

      onSelected({ sessionId, workspaceId: context.app?.dataset.activeWorkspaceId || readStoredString(SIDEBAR_ACTIVE_WORKSPACE_KEY) || undefined });
    }));
  }
}

function syncStateToViewedSession(state: State, dom: ChatDom): string {
  const selected = readSidebarSelection(state.context);

  if (selected?.sessionId) {
    persistSidebarSelection(state.context, selected);
    switchToSession(state, dom, selected.sessionId);
  }

  return state.store.activeSessionId;
}

function syncMountedStoreToViewedSession(context: PluginContext, store: ChatStore): string {
  const selected = readSidebarSelection(context);

  if (selected?.sessionId && !isMountedSelectionActive(context, store, selected)) {
    persistSidebarSelection(context, selected);
    switchMountedStoreToSession(store, selected.sessionId);
  }

  return store.activeSessionId;
}

function isMountedSelectionActive(context: PluginContext, store: ChatStore, selected: SidebarSelectedSession): boolean {
  const selectedWorkspaceId = selected.workspaceId || "";
  const currentWorkspaceId = context.app?.dataset.activeWorkspaceId || readStoredString(SIDEBAR_ACTIVE_WORKSPACE_KEY) || "";
  return store.activeSessionId === selected.sessionId && (!selectedWorkspaceId || selectedWorkspaceId === currentWorkspaceId);
}

function selectedSessionFromSidebarEvent(context: PluginContext, event: SidebarActionEvent): SidebarSelectedSession | null {
  if (!isSidebarSessionSelectionEvent(event.type)) {
    return null;
  }

  const detail = event.detail || {};
  const sessionId = typeof detail.sessionId === "string" ? detail.sessionId : event.snapshot?.activeSessionId || "";
  const workspaceId = typeof detail.workspaceId === "string"
    ? detail.workspaceId
    : event.snapshot?.activeWorkspaceId || context.app?.dataset.activeWorkspaceId || "";

  if (!sessionId) {
    return null;
  }

  return { sessionId, workspaceId: workspaceId || undefined };
}

function isSidebarSessionSelectionEvent(type: string): boolean {
  return type === "session.selected" || type === "session.created" || type === "new-session" || type === "active.start";
}

function switchMountedStoreToSession(store: ChatStore, sessionId: string): ChatSession {
  let session = store.sessions.find((item) => item.id === sessionId);

  if (!session) {
    session = createSession(sessionId);
    store.sessions.unshift(session);
  }

  store.activeSessionId = session.id;
  saveStore(store);
  return session;
}

function renderMountedBackendMessages(chatSurface: HTMLElement, messages: ChatMessage[], sessionId: string): void {
  pruneMountedExpandedToolCards(messages, sessionId);
  const container = chatSurface.querySelector<HTMLElement>(".term-inner") || chatSurface;
  container.replaceChildren(...messages.map((message: ChatMessage): HTMLElement => renderMountedBackendMessage(message, sessionId)));
  syncMountedScrollAfterRender(chatSurface);
}

function renderMountedDocumentation(chatSurface: HTMLElement): void {
  const container = chatSurface.querySelector<HTMLElement>(".term-inner") || chatSurface;
  const guide = document.createElement("article");
  guide.className = "pi-web-chat-docs";
  guide.setAttribute("aria-label", "pi-web-chat guide");

  const title = document.createElement("h1");
  title.textContent = "pi-web-chat guide";

  const summary = document.createElement("p");
  summary.textContent = [
    "Select or create a session in the sidebar to load chat history,",
    "or type below to start a new session.",
  ].join(" ");

  const list = document.createElement("ul");

  for (const text of [
    "Ask pi in the prompt box and press Cmd/Ctrl+Enter to send.",
    "Use / for slash commands, @ for file references, and ! for shell commands.",
    "Chats are cached locally after you start or select a session.",
  ]) {
    const item = document.createElement("li");
    item.textContent = text;
    list.append(item);
  }

  guide.append(title, summary, list);
  container.replaceChildren(guide);
  syncMountedScrollAfterRender(chatSurface);
}

function installMountedScrollLock(disposables: Disposables, chatSurface: HTMLElement): void {
  const term = chatSurface.querySelector<HTMLElement>(".term");
  const button = chatSurface.querySelector<HTMLButtonElement>("[data-action='scroll-bottom']");

  if (!term || !button) {
    return;
  }

  const state: MountedScrollLock = { term, button, pinned: true, touchStartY: null };
  mountedScrollLocks.set(chatSurface, state);
  button.hidden = false;
  updateMountedScrollButton(state);

  disposables.listen(button, "click", (): void => {
    state.pinned = true;
    scrollMountedToBottom(state);
    updateMountedScrollButton(state);
  });

  disposables.listen(term, "wheel", (event: Event): void => {
    const wheelEvent = event as WheelEvent;

    if (wheelEvent.deltaY < 0) {
      releaseMountedScrollLock(state);
    }
  });

  disposables.listen(term, "touchstart", (event: Event): void => {
    const touchEvent = event as TouchEvent;
    state.touchStartY = touchEvent.touches.item(0)?.clientY ?? null;
  });

  disposables.listen(term, "touchmove", (event: Event): void => {
    const touchEvent = event as TouchEvent;
    const currentY: number | undefined = touchEvent.touches.item(0)?.clientY;

    if (typeof currentY === "number" && state.touchStartY !== null && currentY - state.touchStartY > 8) {
      releaseMountedScrollLock(state);
    }
  });

  disposables.listen(term, "touchend", (): void => {
    state.touchStartY = null;
  });

  disposables.add({
    remove: (): void => {
      mountedScrollLocks.delete(chatSurface);
    },
  });
}

function syncMountedScrollAfterRender(chatSurface: HTMLElement): void {
  const state = mountedScrollLocks.get(chatSurface);

  if (!state) {
    return;
  }

  if (state.pinned) {
    scrollMountedToBottom(state);
  }

  updateMountedScrollButton(state);
}

function scrollMountedToBottom(state: MountedScrollLock): void {
  state.term.scrollTop = state.term.scrollHeight;
}

function releaseMountedScrollLock(state: MountedScrollLock): void {
  state.pinned = false;
  updateMountedScrollButton(state);
}

function updateMountedScrollButton(state: MountedScrollLock): void {
  state.button.dataset.pinned = state.pinned ? "true" : "false";
  state.button.setAttribute("aria-pressed", state.pinned ? "true" : "false");
}

function renderMountedBackendMessage(message: ChatMessage, sessionId: string): HTMLElement {
  const item = document.createElement("article");
  item.className = "transcript-item";
  item.dataset.messageId = message.id;

  const row = document.createElement("div");
  row.className = "msg";
  row.dataset.kind = mountedMessageKind(message.role);

  const prefix = document.createElement("span");
  prefix.className = `prefix ${mountedMessageKind(message.role)}`;
  prefix.textContent = mountedMessagePrefix(message.role);

  const body = document.createElement("pre");
  body.className = `body ${mountedMessageKind(message.role)}`;
  body.textContent = message.text;

  row.append(prefix, body);

  if (shouldRenderMountedMessageRow(message)) {
    item.append(row);
  }

  if (message.thinking) {
    item.append(renderMountedThinking(message.thinking, Boolean(message.streaming)));
  }

  for (const tool of message.toolCalls || []) {
    item.append(renderMountedToolCard(tool, mountedToolKey(sessionId, message, tool)));
  }

  if (message.streaming) {
    item.dataset.streaming = "true";
  }

  return item;
}

function shouldRenderMountedMessageRow(message: ChatMessage): boolean {
  const hasText: boolean = message.text.trim().length > 0;

  return message.role !== "assistant" || hasText;
}

function renderMountedThinking(text: string, open: boolean): HTMLElement {
  const details = document.createElement("details");
  details.className = "msg-detail think thinking-block";
  details.open = open;
  const summary = document.createElement("summary");
  summary.className = "label";
  summary.textContent = "THINKING";
  const body = document.createElement("pre");
  body.className = "body";
  body.textContent = text;
  details.append(summary, body);
  return details;
}

function pruneMountedExpandedToolCards(messages: ChatMessage[], sessionId: string): void {
  const currentKeys: Set<string> = new Set<string>();

  for (const message of messages) {
    for (const tool of message.toolCalls || []) {
      currentKeys.add(mountedToolKey(sessionId, message, tool));
    }
  }

  for (const key of mountedExpandedToolCards) {
    if (!currentKeys.has(key)) {
      mountedExpandedToolCards.delete(key);
    }
  }
}

function mountedToolKey(sessionId: string, message: ChatMessage, tool: ChatToolCall): string {
  return `${sessionId}:${message.id}:${tool.id}`;
}

function renderMountedToolCard(tool: ChatToolCall, toolKey: string): HTMLElement {
  const card = document.createElement("div");
  card.className = "tool-card";
  card.dataset.tool = tool.name || "tool";
  card.dataset.status = tool.status;
  const collapsed: boolean = !mountedExpandedToolCards.has(toolKey);
  card.dataset.collapsed = collapsed ? "true" : "false";

  const head = document.createElement("button");
  head.type = "button";
  head.className = "tc-head";
  head.title = collapsed ? "Show tool output" : "Hide tool output";
  head.setAttribute("aria-expanded", collapsed ? "false" : "true");
  head.setAttribute("aria-label", `${collapsed ? "Show" : "Hide"} ${tool.name || "tool"} output`);
  head.append(toolGlyph(tool), toolName(tool), toolArgs(tool), toolMeta(tool, collapsed));

  if (!collapsed) {
    card.append(renderMountedToolBody(tool));
  }

  head.addEventListener("click", () => toggleMountedToolCard(card, head, tool, toolKey));
  card.prepend(head);
  return card;
}

function renderMountedToolBody(tool: ChatToolCall): HTMLElement {
  const body = document.createElement("pre");
  body.className = "tc-body";
  body.textContent = tool.text || JSON.stringify(tool.args || {}, null, 2);
  return body;
}

function toggleMountedToolCard(card: HTMLElement, head: HTMLElement, tool: ChatToolCall, toolKey: string): void {
  const body = card.querySelector<HTMLElement>(".tc-body");
  const collapsed: boolean = body !== null;

  if (body) {
    body.remove();
    mountedExpandedToolCards.delete(toolKey);
  } else {
    card.append(renderMountedToolBody(tool));
    mountedExpandedToolCards.add(toolKey);
  }

  card.dataset.collapsed = collapsed ? "true" : "false";
  head.setAttribute("aria-expanded", collapsed ? "false" : "true");
  head.setAttribute("aria-label", `${collapsed ? "Show" : "Hide"} ${card.dataset.tool || "tool"} output`);
  head.title = collapsed ? "Show tool output" : "Hide tool output";
  const toggle = head.querySelector<HTMLElement>(".tc-toggle-label");

  if (toggle) {
    toggle.textContent = collapsed ? "show" : "hide";
  }
}

function toolGlyph(tool: ChatToolCall): HTMLElement {
  const glyph = document.createElement("span");
  glyph.className = "tc-glyph";
  const iconName = toolIconName(tool);
  const paths = iconName ? TOOL_ICON_PATHS[iconName] : "";

  if (!iconName || !paths) {
    glyph.textContent = "●";
    return glyph;
  }

  glyph.innerHTML = `<svg class="tc-icon" data-tool-icon="${iconName}" aria-hidden="true" viewBox="0 0 24 24">${paths}</svg>`;
  return glyph;
}

function toolName(tool: ChatToolCall): HTMLElement {
  const name = document.createElement("span");
  name.className = "tc-name";
  name.textContent = tool.name || "tool";
  return name;
}

function toolArgs(tool: ChatToolCall): HTMLElement {
  const args = document.createElement("span");
  args.className = "tc-args";
  args.textContent = mountedToolArgsText(tool);
  return args;
}

function toolMeta(tool: ChatToolCall, collapsed: boolean): HTMLElement {
  const meta = document.createElement("span");
  meta.className = "tc-meta";

  if (tool.status === "running") {
    const spinner = document.createElement("span");
    spinner.className = "spinner";
    spinner.textContent = "⠇";
    const label = document.createElement("span");
    label.className = "running";
    label.textContent = "running";
    meta.append(spinner, label, toolCaret(collapsed));
    return meta;
  }

  const status = document.createElement("span");
  status.className = tool.status === "err" ? "err" : "ok";
  status.textContent = tool.status === "err" ? "✗" : "✓";
  const label = document.createElement("span");
  label.textContent = tool.status === "err" ? " · failed" : " · done";
  meta.append(status, label, toolCaret(collapsed));
  return meta;
}

function toolCaret(collapsed: boolean): HTMLElement {
  const wrap = document.createElement("span");
  wrap.className = "tc-toggle";
  const label = document.createElement("span");
  label.className = "tc-toggle-label";
  label.textContent = collapsed ? "show" : "hide";
  const caret = document.createElement("span");
  caret.className = "tc-caret";
  caret.textContent = "▸";
  wrap.append(label, caret);
  return wrap;
}

function mountedToolArgsText(tool: ChatToolCall): string {
  if (!tool.args) {
    return "";
  }

  return JSON.stringify(tool.args);
}

function toolIconName(tool: ChatToolCall): ToolIconName | undefined {
  const name = normalizeToolName(tool.name);

  if (["bash", "shell", "sh", "zsh", "terminal"].includes(name)) {
    return commandIconName(mountedToolArgsText(tool).toLowerCase()) || "terminal";
  }

  return TOOL_ICON_NAMES[name];
}

function normalizeToolName(name: string): string {
  return name.trim().replace(/^functions\./, "").replace(/^multi_tool_use\./, "");
}

function commandIconName(text: string): ToolIconName | undefined {
  if (/\bgit\b|\bgh\b/.test(text)) {
    return "git-branch";
  }

  if (/\b(go test|bun test|npm test|pnpm test|yarn test|vitest|pytest|cargo test)\b/.test(text)) {
    return "circle-check";
  }

  if (/\b(bun|npm|pnpm|yarn)\s+(run\s+)?build\b|\b(go build|cargo build)\b/.test(text)) {
    return "hammer";
  }

  if (/\b(bun|npm|pnpm|yarn)\s+(add|install|i)\b|\bpip\s+install\b|\bgo\s+get\b/.test(text)) {
    return "package";
  }

  return undefined;
}

function mountedMessagePrefix(role: ChatMessage["role"]): string {
  if (role === "assistant") {
    return "pi >";
  }

  if (role === "user") {
    return "you >";
  }

  if (role === "system") {
    return "sys >";
  }

  return "tool >";
}

function mountedMessageKind(role: ChatMessage["role"]): string {
  if (role === "assistant") {
    return "pi";
  }

  if (role === "system") {
    return "sys";
  }

  return role;
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

async function openSessionEvents(
  state: State,
  dom: ChatDom,
  sessionId = "",
  workspacePath = activeWorkspacePath(state.context),
  workspaceId = activeWorkspaceSelection(state.context).id,
): Promise<void> {
  if (!state.context.backendStream) {
    await refreshBackendChatState(state, dom, sessionId, workspacePath);
    return;
  }

  const token = ++state.backendChatToken;
  state.sessionEventsAbort?.abort();
  const controller = new AbortController();
  state.sessionEventsAbort = controller;
  const renderState = throttledRender((): void => render(state, dom));

  try {
    const data = chatStateRequestData(state.context, sessionId, workspacePath);
    const stream = await backendSseStream(state.context, "sessionEventsSse", data, controller.signal, workspaceId);

    if (!stream) {
      throw new Error("session SSE backend did not return a stream");
    }

    await readSseChatEvents(stream, (event: ChatEvent): void => {
      if (token !== state.backendChatToken || event.type !== "chat.state") {
        return;
      }

      if (applySessionStateEvent(state, event)) {
        renderState.request();
      }
    });
  } catch (error) {
    if (!controller.signal.aborted) {
      await refreshBackendChatState(state, dom, sessionId, workspacePath);
    }
  } finally {
    renderState.cancel();

    if (state.sessionEventsAbort === controller) {
      state.sessionEventsAbort = undefined;
    }
  }
}

function applySessionStateEvent(state: State, event: ChatEvent): boolean {
  const messages = sanitizeChatMessages(event.messages);
  if (!messages.length) {
    return false;
  }

  const session = sessionForBackendState(state.store, typeof event.activeSessionId === "string" ? event.activeSessionId : null);
  const nextMessages = mergeChatMessages(session.messages, messages).slice(-MAX_MESSAGES_PER_SESSION);
  if (!sessionMessagesChanged(session.messages, nextMessages)) {
    return false;
  }

  session.messages = nextMessages;
  session.updatedAt = Date.now();
  saveStore(state.store);
  return true;
}

async function refreshBackendChatState(state: State, dom: ChatDom, sessionId = "", workspacePath = activeWorkspacePath(state.context)): Promise<void> {
  const token = ++state.backendChatToken;

  try {
    const response = await backendCall(state.context, "chatState", chatStateRequestData(state.context, sessionId, workspacePath));
    if (token !== state.backendChatToken) return;

    if (Array.isArray(response.messages)) {
      const messages = sanitizeChatMessages(response.messages);
      if (messages.length) {
        const session = sessionForBackendState(state.store, typeof response.activeSessionId === "string" ? response.activeSessionId : null);
        const nextMessages = mergeChatMessages(session.messages, messages).slice(-MAX_MESSAGES_PER_SESSION);
        if (!sessionMessagesChanged(session.messages, nextMessages)) {
          return;
        }

        session.messages = nextMessages;
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
  return sessionById(store, store.activeSessionId, true);
}

function sessionById(store: ChatStore, sessionId: string, makeActive = false): ChatSession {
  let session = store.sessions.find((item) => item.id === sessionId);

  if (!session) {
    session = createSession(sessionId || undefined);
    store.sessions.unshift(session);
    saveStore(store);
  }

  if (makeActive || !store.activeSessionId) {
    store.activeSessionId = session.id;
    saveStore(store);
  }

  return session;
}

function addMessageToSession(
  store: ChatStore,
  sessionId: string,
  message: Omit<ChatMessage, "id" | "createdAt">,
): ChatMessage {
  const session = sessionById(store, sessionId);
  const storedMessage: ChatMessage = {
    id: id(),
    createdAt: Date.now(),
    ...message,
    attachments: sanitizeAttachmentsForStorage(message.attachments),
  };

  session.messages.push(storedMessage);
  if (session.messages.length > MAX_MESSAGES_PER_SESSION) {
    session.messages.splice(0, session.messages.length - MAX_MESSAGES_PER_SESSION);
  }
  if (session.title === "New chat" && message.role === "user") session.title = message.text.slice(0, 48) || session.title;
  session.updatedAt = Date.now();
  pruneStore(store);
  saveStore(store);
  return storedMessage;
}

function moveMessageBetweenSessions(store: ChatStore, fromSessionId: string, toSessionId: string, messageId: string): void {
  if (fromSessionId === toSessionId) {
    return;
  }

  const fromSession = store.sessions.find((item) => item.id === fromSessionId);
  const messageIndex = fromSession?.messages.findIndex((message) => message.id === messageId) ?? -1;

  if (!fromSession || messageIndex < 0) {
    return;
  }

  const [message] = fromSession.messages.splice(messageIndex, 1);
  const toSession = sessionById(store, toSessionId);

  if (!toSession.messages.some((item) => item.id === message.id)) {
    toSession.messages.push(message);
  }

  fromSession.updatedAt = Date.now();
  toSession.updatedAt = Date.now();
  saveStore(store);
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
      const sessions = parsed.sessions.filter(isSession).map(sanitizeSession);
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

function hasStoredSessions(): boolean {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") as Partial<ChatStore> | null;
    return Boolean(parsed && Array.isArray(parsed.sessions) && parsed.sessions.some(isSession));
  } catch {
    return false;
  }
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

function isSession(value: unknown): value is ChatSession {
  return isRecord(value) && typeof value.id === "string" && Array.isArray(value.messages);
}

function sanitizeSession(session: ChatSession): ChatSession {
  return { ...session, messages: sanitizeChatMessages(session.messages) };
}

function sanitizeChatMessages(value: unknown): ChatMessage[] {
  return Array.isArray(value) ? value.filter(isChatMessage).map(sanitizeChatMessage) : [];
}

function sanitizeChatMessage(message: ChatMessage): ChatMessage {
  if (!Array.isArray(message.toolCalls)) {
    const { toolCalls: _toolCalls, ...rest } = message;
    return rest;
  }

  return { ...message, toolCalls: message.toolCalls.filter(isChatToolCall) };
}

function isChatToolCall(value: unknown): value is ChatToolCall {
  if (!isRecord(value) || typeof value.id !== "string" || typeof value.name !== "string") {
    return false;
  }

  return typeof value.text === "string" && isToolStatus(value.status);
}

function isToolStatus(value: unknown): value is ChatToolCall["status"] {
  return value === "running" || value === "ok" || value === "err";
}

function isChatMessage(value: unknown): value is ChatMessage {
  if (!isRecord(value) || typeof value.id !== "string" || typeof value.text !== "string") {
    return false;
  }

  return typeof value.createdAt === "number" && isChatRole(value.role);
}

function isChatRole(value: unknown): value is ChatMessage["role"] {
  return value === "user" || value === "assistant" || value === "tool" || value === "system";
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
