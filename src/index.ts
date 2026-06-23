import type { BehaviorSubject, Subject } from "rxjs";
import {
  commandName,
  createChatDom,
  createChatSurface,
  createComposerSurface,
  installStyles,
  pluginClass,
  pluginStyleText,
  renderAttachmentChips,
  renderFileRefs,
  renderMessages,
  renderPromptMeta,
  renderSlashCommands,
  setAttachButtonMode,
  setSendButtonMode,
  toolArgsBodyText,
  toolArgsInlineText,
  setComposerMode,
  type ChatDom,
} from "./dom";
import type {
  BackendResponse,
  ChatEvent,
  ChatInputSubmitted,
  ChatMessage,
  ChatMessageBlock,
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
  RuntimeStatus,
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
const CHAT_HISTORY_PAGE_SIZE = 200;
const CHAT_HISTORY_TOP_THRESHOLD_PX = 24;
const MAX_MESSAGE_BLOCKS = 200;
const MAX_LOCAL_ATTACHMENTS = 8;
const MAX_LOCAL_ATTACHMENT_BYTES = 1_000_000;
const MAX_SHELL_OUTPUT_BYTES = 64_000;
const MOUNTED_CHAT_POLL_MS = 250;
const STREAM_RENDER_MIN_MS = 250;
const STREAM_SAVE_MIN_MS = 100;
const SPINNER_DOT_COUNT = 6;
const STEERING_CANCEL_WINDOW_MS = 100;
const ASSISTANT_ONLY_ANCHOR_META_KEY = "piWebChatAssistantOnlyAnchorUsed";
const mountedExpandedToolCards: Set<string> = new Set<string>();
const mountedMessageSignatures: WeakMap<HTMLElement, string> = new WeakMap<HTMLElement, string>();

type AppWithRuntime = HTMLElement & {
  piWebChat?: Runtime;
  dataset: DOMStringMap;
};

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

type MountedSteeringRequest = {
  sessionId: string;
  messageId: string;
  timeout: ReturnType<typeof setTimeout>;
  controller: AbortController;
  sent: boolean;
};

type MountedState = {
  backendChatToken: number;
  historyPages: Map<string, MountedHistoryPageState>;
  pendingPromptEchoIds: Map<string, string[]>;
  pendingAssistantEchoIds: Map<string, string[]>;
  completedRunIds: Set<string>;
  activeRunId?: string;
  activeRunSessionId?: string;
  activeRunWorkspacePath?: string;
  activeRunWorkspaceId?: string;
  startingRunSessionId?: string;
  fallbackSubmittingSessionId?: string;
  resolvingSubmit?: boolean;
  pendingSteering?: MountedSteeringRequest;
  onRunStateChange?: () => void;
  runEventsAbort?: AbortController;
  sessionEventsAbort?: AbortController;
};

type MountedComposerTriggers = {
  selectedAttachments: FileAttachment[];
  shellMode: boolean;
  commands: PluginCommand[];
  fileSearchTimer?: ReturnType<typeof setTimeout>;
};

type MergeChatMessagesOptions = {
  allowAssistantOnlyTailEcho?: boolean;
  preserveOnlyEchoMessages?: boolean;
};

type MountedHistoryPageState = {
  hasMoreBefore: boolean;
  oldestMessageId?: string;
  loading: boolean;
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

export {
  commandName,
  createChatDom,
  createChatSurface,
  createComposerSurface,
  pluginClass,
  pluginStyleText,
  renderMessages,
  renderPromptMeta,
  setComposerMode,
  toolArgsBodyText,
  toolArgsInlineText,
};
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
  removeMountedPluginSurfaces(app);
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
  const mountedStore = selected?.sessionId ? loadStore(selected.sessionId) : createNoSelectionStore();
  const mountedState: MountedState = {
    backendChatToken: 0,
    historyPages: new Map<string, MountedHistoryPageState>(),
    pendingPromptEchoIds: new Map<string, string[]>(),
    pendingAssistantEchoIds: new Map<string, string[]>(),
    completedRunIds: new Set<string>(),
  };

  if (!selected?.sessionId) {
    renderMountedDocumentation(chatSurface);
  } else {
    renderMountedBackendMessages(chatSurface, activeSession(mountedStore).messages, mountedStore.activeSessionId);
    void openMountedSessionEvents(context, chatSurface, mountedStore, mountedState, selected.sessionId);
  }
  bindMountedSidebarSelection(disposables, context, chatSurface, mountedStore, mountedState);
  bindMountedHistoryPagination(disposables, context, chatSurface, mountedStore, mountedState);
  bindMountedSteeringCancel(disposables, chatSurface, mountedStore, mountedState);
  bindMountedComposer(disposables, context, composerSurface, chatSurface, mountedStore, mountedState);
  bindMountedPromptMeta(context, composerSurface);
  app?.classList.add(pluginClass());

  const cleanup = (): void => {
    mountedState.runEventsAbort?.abort();
    mountedState.sessionEventsAbort?.abort();
    disposables.dispose();
    mountedExpandedToolCards.clear();
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

function removeMountedPluginSurfaces(app: AppWithRuntime | undefined): void {
  if (!app) {
    return;
  }

  app.querySelectorAll<HTMLElement>(".pi-web-chat-surface, .pi-web-chat-composer").forEach((surface: HTMLElement): void => {
    surface.remove();
  });
}

function bindMountedPromptMeta(context: PluginContext, composerSurface: HTMLElement): void {
  renderPromptMeta(composerSurface, {});
  void refreshMountedPromptMetaFromBackend(context, composerSurface);
}

async function refreshMountedPromptMetaFromBackend(context: PluginContext, composerSurface: HTMLElement): Promise<void> {
  try {
    const workspace: { id: string; path: string } = activeWorkspaceSelection(context);
    const data: JsonRecord = workspace.path ? { workspacePath: workspace.path } : {};
    const response = await backendCall(context, "runtimeStatus", data, workspace.id);
    const responseRecord = isRecord(response) ? response : {};
    const status = isRecord(responseRecord.status) ? runtimeStatusFromRecord(responseRecord.status) : undefined;

    if (!status) {
      return;
    }

    renderPromptMeta(composerSurface, status);
  } catch {
    // Runtime status is best effort; prompt submission must not depend on it.
  }
}

function runtimeStatusFromRecord(record: JsonRecord): RuntimeStatus {
  const status: RuntimeStatus = {};

  if (typeof record.model === "string") {
    status.model = record.model;
  }

  if (typeof record.modelProvider === "string") {
    status.modelProvider = record.modelProvider;
  }

  if (typeof record.thinkingLevel === "string") {
    status.thinkingLevel = record.thinkingLevel;
  }

  if (typeof record.fiveHourQuota === "number") {
    status.fiveHourQuota = record.fiveHourQuota;
  }

  if (typeof record.weeklyQuota === "number") {
    status.weeklyQuota = record.weeklyQuota;
  }

  if (typeof record.currentBranch === "string") {
    status.currentBranch = record.currentBranch;
  }

  if (typeof record.branch === "string") {
    status.branch = record.branch;
  }

  if (typeof record.warning === "string") {
    status.warning = record.warning;
  }

  return status;
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
  const stopButton = composerSurface.querySelector<HTMLButtonElement>(".stop-btn");
  const fileInput = composerSurface.querySelector<HTMLInputElement>("[data-file-input]");
  const attachmentChips = composerSurface.querySelector<HTMLElement>(".attach-chips");
  const shellAttachmentNote = composerSurface.querySelector<HTMLElement>(".shell-attachment-note");

  if (!textarea || !sendButton) {
    return;
  }

  const promptBar = composerSurface.querySelector<HTMLElement>(".prompt-bar");
  const slashPopover = composerSurface.querySelector<HTMLElement>(".slash-pop");
  const fileRefPopover = composerSurface.querySelector<HTMLElement>(".prompt-file-ref-pop");
  const triggers: MountedComposerTriggers = { selectedAttachments: [], shellMode: false, commands: [] };

  const syncAttachments = (): void => {
    syncMountedAttachmentChips(attachmentChips, textarea.value, triggers);
  };
  const syncMode = (): void => {
    syncMountedShellUi(promptBar, textarea, attachButton, shellAttachmentNote, triggers);
  };
  const sync = (): void => {
    const value: string = textarea.value;
    const isBusy: boolean = isMountedRunBusy(mountedState);
    const isSteering: boolean = Boolean(mountedState.pendingSteering);
    const canSteer: boolean = Boolean(mountedState.activeRunId && mountedState.activeRunSessionId === store.activeSessionId);
    const sendMode: "idle" | "loading" | "steering" = isSteering ? "steering" : isBusy ? "loading" : "idle";
    const canSend: boolean = Boolean(value.trim()) && !isSteering && !mountedState.resolvingSubmit && (!isBusy || canSteer);
    setSendButtonMode(sendButton, sendMode, canSend);

    if (promptBar) {
      promptBar.dataset.runState = sendMode;
    }

    if (stopButton) {
      const canCancelSteering: boolean = Boolean(mountedState.pendingSteering && !mountedState.pendingSteering.sent);
      stopButton.hidden = !isBusy && !canCancelSteering;
      stopButton.disabled = false;
      stopButton.title = canCancelSteering ? "cancel steering" : "stop response";
      stopButton.setAttribute("aria-label", canCancelSteering ? "cancel steering" : "stop response");
    }

    syncAttachments();
    clearMountedFileSearchTimer(triggers);

    if (triggers.shellMode) {
      hideMountedAssistPopovers(slashPopover, fileRefPopover);
      return;
    }

    void updateMountedSlashPopover(context, composerSurface, textarea, value, triggers.commands, (nextCommands: PluginCommand[]): void => {
      triggers.commands = nextCommands;
    });

    triggers.fileSearchTimer = setTimeout((): void => {
      void updateMountedFileRefPopover(context, composerSurface, textarea, textarea.value);
    }, 120);
  };
  const enterShellMode = (): void => {
    triggers.shellMode = true;
    hideMountedAssistPopovers(slashPopover, fileRefPopover);
    syncMode();
    syncAttachments();
  };
  const resetShellMode = (): void => {
    triggers.shellMode = false;
    syncMode();
    syncAttachments();
  };
  const submit = async (event?: Event): Promise<void> => {
    event?.preventDefault();
    event?.stopImmediatePropagation();
    const text = textarea.value.trim();
    sync();

    if (mountedState.resolvingSubmit || mountedState.pendingSteering) {
      return;
    }

    if (mountedState.startingRunSessionId || mountedState.fallbackSubmittingSessionId) {
      return;
    }

    if (!text) {
      textarea.value = "";
      sync();
      return;
    }

    mountedState.resolvingSubmit = true;
    textarea.value = "";

    if (fileInput) {
      fileInput.value = "";
    }

    sync();

    try {
      if (triggers.shellMode) {
        publishChatInputSubmitted(text, []);
        await submitMountedShellCommand(context, chatSurface, store, text);
        resetShellMode();
      } else {
        const attachments = [...triggers.selectedAttachments, ...(await resolveMountedAttachments(context, text))];
        triggers.selectedAttachments = [];
        syncAttachments();
        publishChatInputSubmitted(text, attachments);
        const submitPromise = submitMountedPromptWithStreaming(context, chatSurface, store, mountedState, text, attachments, sync);
        mountedState.resolvingSubmit = false;
        sync();
        await submitPromise;
      }

    } catch (error) {
      if (!isAbortError(error)) {
        renderMountedBackendMessages(chatSurface, [mountedPromptErrorMessage(error)], store.activeSessionId);
      }
    } finally {
      mountedState.resolvingSubmit = false;
      syncMode();
      sync();
    }
  };

  disposables.listen(textarea, "input", () => {
    if (!triggers.shellMode && textarea.value.startsWith("! ")) {
      textarea.value = textarea.value.slice(2);
      enterShellMode();
    }

    sync();
  });
  disposables.listen(textarea, "keydown", (event) => {
    const keyEvent = event as KeyboardEvent;

    if (keyEvent.key === " " && !triggers.shellMode && textarea.value === "!" && textarea.selectionStart === 1 && textarea.selectionEnd === 1) {
      keyEvent.preventDefault();
      textarea.value = "";
      enterShellMode();
      sync();
      return;
    }

    if (keyEvent.key === "Backspace" && triggers.shellMode && textarea.value === "") {
      keyEvent.preventDefault();
      resetShellMode();
      sync();
      return;
    }

    if (keyEvent.key === "Escape") {
      hideMountedAssistPopovers(slashPopover, fileRefPopover);
      return;
    }

    if (keyEvent.key === "Enter" && (keyEvent.metaKey || keyEvent.ctrlKey)) {
      void submit(keyEvent);
    }
  });
  disposables.listen(sendButton, "click", (event) => {
    void submit(event);
  });

  if (stopButton) {
    disposables.listen(stopButton, "click", (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      void stopMountedRun(context, chatSurface, store, mountedState).finally(sync);
      sync();
    });
  }

  if (attachButton && fileInput) {
    disposables.listen(attachButton, "click", () => {
      if (!triggers.shellMode) {
        fileInput.click();
      }
    });
    disposables.listen(fileInput, "change", () => {
      void loadMountedLocalAttachments(fileInput, (attachments: FileAttachment[]): void => {
        triggers.selectedAttachments = attachments;
        syncAttachments();
      });
    });
  }

  mountedState.onRunStateChange = sync;
  disposables.add({
    remove: (): void => {
      clearMountedFileSearchTimer(triggers);

      if (mountedState.onRunStateChange === sync) {
        mountedState.onRunStateChange = undefined;
      }
    },
  });
  syncMode();
  sync();
}

function isMountedRunBusy(mountedState: MountedState): boolean {
  return Boolean(
    mountedState.activeRunId ||
    mountedState.startingRunSessionId ||
    mountedState.fallbackSubmittingSessionId ||
    mountedState.pendingSteering,
  );
}

function bindMountedSteeringCancel(
  disposables: Disposables,
  chatSurface: HTMLElement,
  store: ChatStore,
  mountedState: MountedState,
): void {
  disposables.listen(chatSurface, "click", (event: Event): void => {
    const target = event.target as { closest?: (selector: string) => HTMLButtonElement | null } | null;
    const button = target?.closest?.("[data-action='cancel-steering']");

    if (!button) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    const sessionId = button.dataset.sessionId || "";
    const messageId = button.dataset.messageId || "";
    const cancelled = cancelMountedSteering(store, mountedState);

    if (!cancelled && sessionId && messageId) {
      discardMountedPendingMessage(store, sessionId, messageId);
    }

    if (sessionId && store.activeSessionId === sessionId) {
      renderMountedBackendMessages(chatSurface, sessionById(store, sessionId).messages, sessionId);
    }
  });
}

async function stopMountedRun(
  context: PluginContext,
  chatSurface: HTMLElement,
  store: ChatStore,
  mountedState: MountedState,
): Promise<void> {
  if (mountedState.pendingSteering && !mountedState.pendingSteering.sent) {
    const steeringSessionId = mountedState.pendingSteering.sessionId;
    cancelMountedSteering(store, mountedState);

    if (store.activeSessionId === steeringSessionId) {
      renderMountedBackendMessages(chatSurface, sessionById(store, steeringSessionId).messages, steeringSessionId);
    }

    return;
  }

  const runId = mountedState.activeRunId;
  const sessionId = mountedState.activeRunSessionId || mountedState.startingRunSessionId || mountedState.fallbackSubmittingSessionId || store.activeSessionId;
  const workspaceId = mountedState.activeRunWorkspaceId || activeWorkspaceSelection(context).id;

  if (!runId) {
    mountedState.runEventsAbort?.abort();
    mountedState.startingRunSessionId = undefined;
    mountedState.fallbackSubmittingSessionId = undefined;
    return;
  }

  mountedState.runEventsAbort?.abort();

  try {
    await abortPromptToPluginBackend(context, runId, sessionId, workspaceId);
  } catch (error) {
    globalThis.piWeb?.subject<ToastRequest>("toast.requested").next({
      level: "error",
      message: `stop failed: ${errorText(error)}`,
    });
  } finally {
    if (mountedState.activeRunId === runId) {
      mountedState.activeRunId = undefined;
      mountedState.activeRunSessionId = undefined;
      mountedState.activeRunWorkspacePath = undefined;
      mountedState.activeRunWorkspaceId = undefined;
    }
  }
}

function cancelMountedSteering(store: ChatStore, mountedState: MountedState): boolean {
  const pending = mountedState.pendingSteering;

  if (!pending || pending.sent) {
    return false;
  }

  clearTimeout(pending.timeout);
  pending.controller.abort();
  mountedState.pendingSteering = undefined;
  discardMountedPendingMessage(store, pending.sessionId, pending.messageId);
  return true;
}

function syncMountedAttachmentChips(
  attachmentChips: HTMLElement | null,
  value: string,
  triggers: MountedComposerTriggers,
): void {
  if (!attachmentChips) {
    return;
  }

  if (triggers.shellMode) {
    renderAttachmentChips(attachmentChips, []);
    return;
  }

  renderAttachmentChips(attachmentChips, [
    ...triggers.selectedAttachments.map((attachment): string => attachment.name || "attachment"),
    ...extractRefs(value),
  ]);
}

function syncMountedShellUi(
  promptBar: HTMLElement | null,
  textarea: HTMLTextAreaElement,
  attachButton: HTMLButtonElement | null,
  shellAttachmentNote: HTMLElement | null,
  triggers: MountedComposerTriggers,
): void {
  promptBar?.classList.toggle("shell-mode", triggers.shellMode);
  textarea.setAttribute("placeholder", triggers.shellMode ? "run shell command in workspace…" : "ask pi to do something…");

  if (shellAttachmentNote) {
    shellAttachmentNote.hidden = !(triggers.shellMode && triggers.selectedAttachments.length > 0);
  }

  if (attachButton) {
    setAttachButtonMode(attachButton, triggers.shellMode ? "shell" : "normal");
  }
}

function clearMountedFileSearchTimer(triggers: MountedComposerTriggers): void {
  if (triggers.fileSearchTimer) {
    clearTimeout(triggers.fileSearchTimer);
    triggers.fileSearchTimer = undefined;
  }
}

function hideMountedAssistPopovers(slashPopover: HTMLElement | null, fileRefPopover: HTMLElement | null): void {
  slashPopover?.setAttribute("hidden", "");
  fileRefPopover?.setAttribute("hidden", "");
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

async function submitMountedShellCommand(
  context: PluginContext,
  chatSurface: HTMLElement,
  store: ChatStore,
  command: string,
): Promise<void> {
  const sessionId = syncMountedStoreToViewedSession(context, store);
  const session = sessionById(store, sessionId);
  const user: ChatMessage = { id: id(), role: "user", text: `! ${command}`, createdAt: Date.now() };
  const tool: ChatMessage = { id: id(), role: "tool", text: `$ ${command}\n(running...)`, createdAt: Date.now() };
  session.messages.push(user, tool);
  session.updatedAt = Date.now();
  saveStore(store);
  renderMountedBackendMessages(chatSurface, session.messages, sessionId);

  try {
    const result = await backendCall(context, "runShell", { command });
    const exitCode = typeof result.exitCode === "number" ? result.exitCode : 1;
    const durationMs = typeof result.durationMs === "number" ? result.durationMs : 0;
    const output = typeof result.output === "string" ? result.output : "";
    tool.text = formatShellOutput(command, output, exitCode, durationMs, Boolean(result.truncated));
  } catch (error) {
    tool.text = `$ ${command}\n${errorText(error)}`;
  }

  session.updatedAt = Date.now();
  saveStore(store);
  renderMountedBackendMessages(chatSurface, session.messages, sessionId);
}

async function resolveMountedAttachments(context: PluginContext, text: string): Promise<FileAttachment[]> {
  const refs = extractRefs(text);

  if (!refs.length) {
    return [];
  }

  const response = await backendCall(context, "resolveContext", { text, refs });
  return Array.isArray(response.attachments) ? response.attachments.filter(isRecord) as FileAttachment[] : [];
}

export function formatShellOutput(command: string, output: string, exitCode: number, durationMs: number, truncated: boolean): string {
  const capped = truncateTextBytes(output, MAX_SHELL_OUTPUT_BYTES);
  const wasTruncated = truncated || capped.truncated;
  const newline = capped.text.endsWith("\n") || !capped.text ? "" : "\n";
  return `$ ${command}\n${capped.text}${newline}[exit ${exitCode} · ${durationMs}ms${wasTruncated ? " · truncated" : ""}]`;
}

function truncateTextBytes(text: string, maxBytes: number): { text: string; truncated: boolean } {
  const encoder = new TextEncoder();
  const encoded = encoder.encode(text);

  if (encoded.byteLength <= maxBytes) {
    return { text, truncated: false };
  }

  let truncated = new TextDecoder().decode(encoded.slice(0, maxBytes));

  while (truncated && encoder.encode(truncated).byteLength > maxBytes) {
    truncated = truncated.slice(0, -1);
  }

  return { text: truncated, truncated: true };
}

async function updateMountedSlashPopover(
  context: PluginContext,
  composerSurface: HTMLElement,
  textarea: HTMLTextAreaElement,
  value: string,
  commands: PluginCommand[],
  setCommands: (commands: PluginCommand[]) => void,
): Promise<void> {
  const slashPopover = composerSurface.querySelector<HTMLElement>(".slash-pop");
  const slashList = composerSurface.querySelector<HTMLElement>(".slash-list");
  const query = currentSlashQuery(value);

  if (query === null || !slashList) {
    slashPopover?.setAttribute("hidden", "");
    return;
  }

  let nextCommands = commands;

  if (!nextCommands.length) {
    const response = await backendCall(context, "commands", {});
    nextCommands = Array.isArray(response.commands) ? response.commands.filter(isRecord) as PluginCommand[] : [];
    setCommands(nextCommands);
  }

  if (textarea.value !== value) {
    return;
  }

  const filtered = nextCommands.filter((command: PluginCommand): boolean => {
    return commandName(command).slice(1).toLowerCase().includes(query);
  });
  renderMountedSlashCommands(slashList, filtered, textarea, slashPopover);
  slashPopover?.toggleAttribute("hidden", filtered.length === 0);
}

async function updateMountedFileRefPopover(
  context: PluginContext,
  composerSurface: HTMLElement,
  textarea: HTMLTextAreaElement,
  value: string,
): Promise<void> {
  const fileRefPopover = composerSurface.querySelector<HTMLElement>(".prompt-file-ref-pop");
  const fileRefList = composerSurface.querySelector<HTMLElement>(".prompt-file-ref-list");
  const query = currentFileRefQuery(value);

  if (query === null || !fileRefList) {
    fileRefPopover?.setAttribute("hidden", "");
    return;
  }

  try {
    const response = await backendCall(context, "searchFiles", { query, limit: FILE_REF_LIMIT });
    const files = Array.isArray(response.files) ? response.files.filter(isRecord) as FileSearchResult[] : [];

    if (textarea.value !== value) {
      return;
    }

    renderMountedFileRefs(fileRefList, textarea, files, fileRefPopover);
    fileRefPopover?.toggleAttribute("hidden", files.length === 0);
  } catch {
    fileRefPopover?.setAttribute("hidden", "");
  }
}

function renderMountedSlashCommands(
  list: HTMLElement,
  commands: PluginCommand[],
  textarea: HTMLTextAreaElement,
  popover: HTMLElement | null,
): void {
  list.replaceChildren(...commands.map((command: PluginCommand): HTMLButtonElement => {
    const button = document.createElement("button");
    const name = commandName(command);
    button.type = "button";
    button.className = "slash-item";
    button.dataset.slash = name;
    button.innerHTML = `<span class="sl-name"></span><span class="sl-desc"></span>`;
    button.querySelector<HTMLElement>(".sl-name")!.textContent = name;
    button.querySelector<HTMLElement>(".sl-desc")!.textContent = command.description || "";
    button.addEventListener("click", (): void => {
      textarea.value = command.template || `${name} `;
      popover?.setAttribute("hidden", "");
      textarea.dispatchEvent(new (textarea.ownerDocument.defaultView?.Event || Event)("input", { bubbles: true }));
      textarea.focus();
    });
    return button;
  }));
}

function renderMountedFileRefs(
  list: HTMLElement,
  textarea: HTMLTextAreaElement,
  files: FileSearchResult[],
  popover: HTMLElement | null,
): void {
  list.replaceChildren(...files.map((file: FileSearchResult): HTMLButtonElement => {
    const path = file.path || file.name || "";
    const button = document.createElement("button");
    button.type = "button";
    button.className = "prompt-file-ref-item";
    button.dataset.path = path;
    button.disabled = !path;
    button.innerHTML = `<span class="pfr-path"></span><span class="pfr-kind"></span>`;
    button.querySelector<HTMLElement>(".pfr-path")!.textContent = path;
    button.querySelector<HTMLElement>(".pfr-kind")!.textContent = typeof file.size === "number" ? `${file.size} bytes` : "file";
    button.addEventListener("click", (): void => {
      insertMountedFileRef(textarea, path);
      popover?.setAttribute("hidden", "");
    });
    return button;
  }));
}

function insertMountedFileRef(textarea: HTMLTextAreaElement, path: string): void {
  if (!path) {
    return;
  }

  const value = textarea.value;
  const cursor = textarea.selectionStart;
  const prefix = value.slice(0, cursor);
  const match = /(?:^|\s)@([^\s@`]*)$/.exec(prefix);
  const start = match ? cursor - (match[1] || "").length - 1 : cursor;
  const insert = `@${path} `;
  textarea.value = `${value.slice(0, start)}${insert}${value.slice(cursor)}`;
  const nextCursor = start + insert.length;
  textarea.setSelectionRange(nextCursor, nextCursor);
  textarea.dispatchEvent(new (textarea.ownerDocument.defaultView?.Event || Event)("input", { bubbles: true }));
  textarea.focus();
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

  if (snapshotSessionId && context.app?.dataset.clearedSessionId !== snapshotSessionId) {
    return { sessionId: snapshotSessionId, workspaceId: snapshotWorkspaceId || undefined };
  }

  return null;
}

function persistSidebarSelection(context: PluginContext, selected: SidebarSelectedSession | undefined): void {
  if (selected?.workspaceId && context.app) {
    context.app.dataset.activeWorkspaceId = selected.workspaceId;
    storeString(SIDEBAR_ACTIVE_WORKSPACE_KEY, selected.workspaceId);
  }

  if (selected?.sessionId) {
    delete context.app?.dataset.clearedSessionId;
    context.app?.setAttribute("data-active-session-id", selected.sessionId);
    storeString(SIDEBAR_ACTIVE_SESSION_KEY, selected.sessionId);
  }
}

function clearSidebarActiveSession(context: PluginContext): void {
  const selected = readSidebarSelection(context);

  if (selected?.sessionId && context.app) {
    context.app.dataset.clearedSessionId = selected.sessionId;
  }

  context.app?.removeAttribute("data-active-session-id");
  removeStoredString(SIDEBAR_ACTIVE_SESSION_KEY);
  globalThis.piWeb?.behaviorSubject<string | null>("session.activeId", null).next(null);
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
  publishSidebarEvent(context, "active.start", detail);
  publishSidebarEvent(context, "session.created", detail);
}

function publishMountedSessionTitleIfChanged(sessionId: string, title: string): void {
  globalThis.piWeb?.subject<JsonRecord>("session.changed").next({ sessionId, name: title, title });
}

function updateSessionTitleFromFirstUser(session: ChatSession): string {
  if (session.title !== "New chat") {
    return "";
  }

  const firstUser = session.messages.find((message: ChatMessage): boolean => message.role === "user");
  const title = firstUser?.text.slice(0, 48) || "";

  if (!title) {
    return "";
  }

  session.title = title;
  return title;
}

function storeString(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Sidebar persistence is best effort.
  }
}

function removeStoredString(key: string): void {
  try {
    localStorage.removeItem(key);
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

function emitBackendWarnings(response: BackendResponse): void {
  const warnings = Array.isArray(response.warnings)
    ? response.warnings.filter((warning): warning is string => typeof warning === "string" && warning.trim().length > 0)
    : [];

  for (const warning of warnings) {
    globalThis.piWeb?.subject<ToastRequest>("toast.requested").next({ level: "warning", message: warning });
  }
}

function bindDom(disposables: Disposables, state: State, dom: ChatDom): void {
  disposables.listen(dom.textarea, "input", () => {
    state.channels.input$.next(dom.textarea.value);
    dom.sendButton.setAttribute("aria-disabled", dom.textarea.value.trim() ? "false" : "true");
    saveDraft(dom.textarea.value);
    updateComposerMode(dom, dom.textarea.value, hasQueuedAttachmentNames(state.selectedAttachmentNames));
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
  disposables.listen(dom.attachButton, "click", () => {
    if (!dom.attachButton.disabled) {
      dom.fileInput.click();
    }
  });
  disposables.listen(dom.fileInput, "change", () => {
    void loadLocalAttachments(state, dom);
  });
}

function bindChannels(disposables: Disposables, state: State, dom: ChatDom): void {
  disposables.add(state.channels.input$.subscribe((value) => {
    if (dom.textarea.value !== value) dom.textarea.value = value;
    dom.sendButton.setAttribute("aria-disabled", value.trim() ? "false" : "true");
    saveDraft(value);
    updateComposerMode(dom, value, hasQueuedAttachmentNames(state.selectedAttachmentNames));
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
  const attachments = submittedAttachmentsForText(text, state.selectedLocalAttachments);

  if (!text.startsWith("!")) {
    clearLocalAttachments(state);
  }

  state.channels.submitted$.next({ text, attachments });
  clearDraft();
  state.channels.input$.next("");
}

export function submittedAttachmentsForText(text: string, attachments: FileAttachment[]): FileAttachment[] {
  return text.trim().startsWith("!") ? [] : [...attachments];
}

async function handleSubmitted(state: State, dom: ChatDom, event: ChatInputSubmitted): Promise<void> {
  const text = event.text.trim();
  if (!text) return;
  const sessionId = syncStateToViewedSession(state, dom);

  if (text.startsWith("!")) {
    addMessage(state, { role: "user", text });
    render(state, dom);
    await runShell(state, dom, text.slice(1).trim());
    renderAttachmentChips(dom.attachments, [...state.selectedAttachmentNames, ...state.selectedRefs]);
    return;
  }

  renderAttachmentChips(dom.attachments, []);

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
  emitBackendWarnings(start);
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
    emitBackendWarnings(response);
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
  onStateChange: () => void = (): void => {},
): Promise<void> {
  let targetSessionId: string = syncMountedStoreToViewedSession(context, store);
  const targetWorkspace = activeWorkspaceSelection(context);

  if (mountedState.activeRunId && mountedState.activeRunSessionId === targetSessionId) {
    const runWorkspacePath: string = mountedState.activeRunWorkspacePath || targetWorkspace.path;
    const runWorkspaceId: string = mountedState.activeRunWorkspaceId || targetWorkspace.id;
    await steerMountedPrompt(context, chatSurface, store, mountedState, text, attachments, runWorkspacePath, runWorkspaceId, onStateChange);
    return;
  }

  if (mountedState.startingRunSessionId === targetSessionId || mountedState.fallbackSubmittingSessionId === targetSessionId) {
    return;
  }

  mountedState.backendChatToken += 1;
  mountedState.startingRunSessionId = targetSessionId;
  onStateChange();
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
  pushPendingEchoId(mountedState.pendingPromptEchoIds, targetSessionId, pendingUserMessage.id);
  submitSession.messages.push(pendingUserMessage);
  submitSession.updatedAt = Date.now();
  saveStore(store);
  renderMountedBackendMessages(chatSurface, submitSession.messages, targetSessionId);

  let start: BackendResponse;
  try {
    start = await startStreamingPrompt(context, text, attachments, targetSessionId, targetWorkspace.path, targetWorkspace.id);
  } catch (error) {
    mountedState.startingRunSessionId = undefined;
    onStateChange();
    throw error;
  }

  if (runController.signal.aborted) {
    mountedState.startingRunSessionId = undefined;

    if (typeof start.runId === "string" && start.runId) {
      await abortPromptToPluginBackend(context, start.runId, targetSessionId, targetWorkspace.id);
    }

    discardMountedPendingMessage(store, targetSessionId, pendingUserMessage.id);
    onStateChange();
    return;
  }

  emitBackendWarnings(start);

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
    movePendingPromptEchoId(mountedState.pendingPromptEchoIds, previousSessionId, targetSessionId);
  }

  if (typeof start.runId !== "string" || !start.runId) {
    mountedState.startingRunSessionId = undefined;
    mountedState.fallbackSubmittingSessionId = targetSessionId;
    onStateChange();
    let response: BackendResponse;
    try {
      response = await submitPromptToPluginBackend(context, text, attachments, targetSessionId, targetWorkspace.path, targetWorkspace.id);
    } catch (error) {
      mountedState.fallbackSubmittingSessionId = undefined;
      onStateChange();
      throw error;
    }

    if (runController.signal.aborted) {
      mountedState.fallbackSubmittingSessionId = undefined;
      discardMountedPendingMessage(store, targetSessionId, pendingUserMessage.id);
      onStateChange();
      return;
    }

    emitBackendWarnings(response);
    const responseSessionId = typeof response.activeSessionId === "string" && response.activeSessionId
      ? response.activeSessionId
      : targetSessionId;
    const echoIds = pendingEchoIds(mountedState.pendingPromptEchoIds, targetSessionId);
    const messages = applyBackendResponseToMountedSession(context, store, response, "submitPrompt", targetSessionId, echoIds);
    clearMatchedPendingEchoIds(mountedState.pendingPromptEchoIds, responseSessionId, messages, echoIds);

    if (store.activeSessionId === targetSessionId || store.activeSessionId === responseSessionId) {
      renderMountedBackendMessages(chatSurface, messages, store.activeSessionId);
    }

    if (mountedState.runEventsAbort === runController) {
      mountedState.runEventsAbort = undefined;
    }

    mountedState.startingRunSessionId = undefined;
    mountedState.fallbackSubmittingSessionId = undefined;
    onStateChange();
    return;
  }

  const session = sessionById(store, targetSessionId);
  mountedState.activeRunId = start.runId;
  mountedState.activeRunSessionId = targetSessionId;
  mountedState.activeRunWorkspacePath = targetWorkspace.path;
  mountedState.activeRunWorkspaceId = targetWorkspace.id;
  mountedState.startingRunSessionId = undefined;
  onStateChange();
  const title = updateSessionTitleFromFirstUser(session);

  if (title) {
    saveStore(store);
    publishMountedSessionTitleIfChanged(targetSessionId, title);
  }

  const assistant = ensureStreamingAssistant(session);
  pushPendingEchoId(mountedState.pendingAssistantEchoIds, targetSessionId, assistant.id);
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
        if (!runController.signal.aborted && store.activeSessionId === targetSessionId) {
          renderMountedBackendMessages(chatSurface, session.messages, targetSessionId);
        }
      },
      runController.signal,
    );
  } finally {
    rememberCompletedRunId(mountedState, start.runId);

    if (mountedState.activeRunId === start.runId) {
      mountedState.activeRunId = undefined;
      mountedState.activeRunSessionId = undefined;
      mountedState.activeRunWorkspacePath = undefined;
      mountedState.activeRunWorkspaceId = undefined;
      mountedState.startingRunSessionId = undefined;
      mountedState.fallbackSubmittingSessionId = undefined;
      onStateChange();
    }

    if (mountedState.runEventsAbort === runController) {
      mountedState.runEventsAbort = undefined;
    }
  }

  if (!runController.signal.aborted && store.activeSessionId === targetSessionId) {
    void openMountedSessionEvents(context, chatSurface, store, mountedState, targetSessionId, targetWorkspace.path, targetWorkspace.id);
  }
}

async function steerMountedPrompt(
  context: PluginContext,
  chatSurface: HTMLElement,
  store: ChatStore,
  mountedState: MountedState,
  text: string,
  attachments: FileAttachment[],
  workspacePath: string,
  workspaceId: string,
  onStateChange: () => void = (): void => {},
): Promise<void> {
  const runId = mountedState.activeRunId;
  const targetSessionId = mountedState.activeRunSessionId;

  if (!runId || !targetSessionId) {
    throw new Error("active run is unavailable for steering");
  }

  if (mountedState.pendingSteering) {
    return;
  }

  const pendingUserMessage: ChatMessage = {
    id: id(),
    role: "user",
    text,
    attachments: sanitizeAttachmentsForStorage(attachments),
    createdAt: Date.now(),
    meta: { piWebChatSteeringState: "pending" },
  };
  const session = sessionById(store, targetSessionId);
  const controller = new AbortController();
  const delay = createMountedSteeringDelay(controller.signal, (): void => {
    const pending = mountedState.pendingSteering;

    if (pending) {
      pending.sent = true;
      markMountedSteeringMessageSent(store, pending.sessionId, pending.messageId);

      if (store.activeSessionId === pending.sessionId) {
        renderMountedBackendMessages(chatSurface, sessionById(store, pending.sessionId).messages, pending.sessionId);
      }

      onStateChange();
    }
  });
  mountedState.pendingSteering = {
    sessionId: targetSessionId,
    messageId: pendingUserMessage.id,
    timeout: delay.timeout,
    controller,
    sent: false,
  };
  pushPendingEchoId(mountedState.pendingPromptEchoIds, targetSessionId, pendingUserMessage.id);
  session.messages.push(pendingUserMessage);
  session.updatedAt = Date.now();
  saveStore(store);

  if (store.activeSessionId === targetSessionId) {
    renderMountedBackendMessages(chatSurface, session.messages, targetSessionId);
  }

  onStateChange();

  try {
    await delay.promise;

    if (controller.signal.aborted) {
      return;
    }

    const response = await steerPromptToPluginBackend(context, runId, text, attachments, targetSessionId, workspacePath, workspaceId);
    emitBackendWarnings(response);
  } catch (error) {
    if (isAbortError(error)) {
      return;
    }

    discardMountedPendingMessage(store, targetSessionId, pendingUserMessage.id);
    removePendingPromptEchoId(mountedState.pendingPromptEchoIds, targetSessionId, pendingUserMessage.id);

    if (isUnsupportedStreamingBackend(error)) {
      renderMountedBackendMessages(chatSurface, session.messages, targetSessionId);
      globalThis.piWeb?.subject<ToastRequest>("toast.requested").next({
        level: "error",
        message: "This backend does not support steering while a response is streaming.",
      });
      return;
    }

    throw error;
  } finally {
    if (mountedState.pendingSteering?.controller === controller) {
      mountedState.pendingSteering = undefined;
      onStateChange();
    }
  }
}

function createMountedSteeringDelay(
  signal: AbortSignal,
  onDispatch: () => void,
): { timeout: ReturnType<typeof setTimeout>; promise: Promise<void> } {
  let timeout: ReturnType<typeof setTimeout>;
  const promise = new Promise<void>((resolve, reject): void => {
    timeout = setTimeout((): void => {
      onDispatch();
      resolve();
    }, STEERING_CANCEL_WINDOW_MS);
    signal.addEventListener("abort", (): void => {
      clearTimeout(timeout);
      reject(new DOMException("Steering cancelled", "AbortError"));
    }, { once: true });
  });
  return { timeout: timeout!, promise };
}

function discardMountedPendingMessage(store: ChatStore, sessionId: string, messageId: string): void {
  const session = store.sessions.find((item) => item.id === sessionId);

  if (!session) {
    return;
  }

  session.messages = session.messages.filter((message) => message.id !== messageId);
  removeEmptyInactiveSession(store, session.id);
  saveStore(store);
}

function markMountedSteeringMessageSent(store: ChatStore, sessionId: string, messageId: string): void {
  const message = sessionById(store, sessionId).messages.find((item: ChatMessage): boolean => item.id === messageId);

  if (!message?.meta) {
    return;
  }

  delete message.meta.piWebChatSteeringState;
  if (Object.keys(message.meta).length === 0) {
    delete message.meta;
  }
  saveStore(store);
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
  const save = throttledSaveStore(store, STREAM_SAVE_MIN_MS);
  assistant.streaming = true;
  render.flush();

  try {
    await readSseChatEvents(stream, (event: ChatEvent): void => {
      applyChatEvents(assistant, [event]);
      assistant.streaming = event.type !== "run.end";
      session.updatedAt = Date.now();
      save.request();
      render.request();
    });
  } finally {
    assistant.streaming = false;
    save.flush();
    render.flush();
  }
}

function throttledSaveStore(store: ChatStore, minDelayMs: number): { request: () => void; flush: () => void } {
  let lastSave = 0;
  let pending: ReturnType<typeof setTimeout> | undefined;

  const cancel = (): void => {
    if (pending) {
      clearTimeout(pending);
      pending = undefined;
    }
  };

  const flush = (): void => {
    cancel();
    lastSave = Date.now();
    saveStore(store);
  };

  const request = (): void => {
    const delay = minDelayMs - (Date.now() - lastSave);

    if (delay <= 0) {
      flush();
      return;
    }

    pending ||= setTimeout(flush, delay);
  };

  return { request, flush };
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
  return /unknown method: (startPrompt|streamEventsSse|steerPrompt)|unsupported method: (startPrompt|streamEventsSse|steerPrompt)|(startPrompt|streamEventsSse|steerPrompt) unsupported/i.test(errorText(error));
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

async function steerPromptToPluginBackend(
  context: PluginContext,
  runId: string,
  text: string,
  attachments: FileAttachment[],
  sessionId = "",
  workspacePath = activeWorkspaceSelection(context).path,
  workspaceId = activeWorkspaceSelection(context).id,
): Promise<BackendResponse> {
  const data: JsonRecord = { ...promptRequestData(text, attachments, sessionId, workspacePath), runId };
  return backendCall(context, "steerPrompt", data, workspaceId);
}

async function abortPromptToPluginBackend(
  context: PluginContext,
  runId: string,
  sessionId = "",
  workspaceId = activeWorkspaceSelection(context).id,
): Promise<BackendResponse> {
  return backendCall(context, "abortPrompt", { runId, sessionId }, workspaceId);
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
      appendMessageBlockText(message, "text", event.delta);
      message.text += event.delta;
    } else if (event.type === "thinking.delta" && typeof event.delta === "string") {
      appendMessageBlockText(message, "thinking", event.delta);
      message.thinking = `${message.thinking || ""}${event.delta}`;
    } else if (event.type === "tool.start") {
      upsertToolCall(message, event, "running");
    } else if (event.type === "tool.delta" && typeof event.delta === "string") {
      const tool = upsertToolCall(message, event, "running");
      tool.text = event.delta;
    } else if (event.type === "tool.end") {
      const tool = upsertToolCall(message, event, event.isError ? "err" : "ok");
      if (typeof event.result === "string" && event.result) {
        tool.text = event.result;
      }
    } else if (event.type === "error" && typeof event.message === "string") {
      appendMessageBlockText(message, "text", `${message.text ? "\n" : ""}${event.message}`);
      message.text += `${message.text ? "\n" : ""}${event.message}`;
    }
  }
}

function appendMessageBlockText(message: ChatMessage, type: "text" | "thinking", delta: string): void {
  message.blocks ||= [];
  const lastBlock: ChatMessageBlock | undefined = message.blocks[message.blocks.length - 1];

  if (lastBlock?.type === type) {
    lastBlock.text += delta;
    return;
  }

  if (message.blocks.length < MAX_MESSAGE_BLOCKS) {
    message.blocks.push({ id: id(), type, text: delta });
  }
}

function upsertToolCall(message: ChatMessage, event: ChatEvent, status: "running" | "ok" | "err"): ChatToolCall {
  const idValue = event.toolCallId || event.toolName || "tool";
  message.toolCalls ||= [];
  let tool = message.toolCalls.find((item) => item.id === idValue);

  if (!tool) {
    tool = { id: idValue, name: event.toolName || "tool", args: event.args, text: "", status };
    message.toolCalls.push(tool);
    appendToolMessageBlock(message, tool);
  }

  tool.status = status;
  if (shouldUpdateToolArgs(tool, event)) {
    tool.args = event.args;
    tool.argsStatus = event.argsStatus;
  }
  return tool;
}

function appendToolMessageBlock(message: ChatMessage, tool: ChatToolCall): void {
  message.blocks ||= [];

  if (message.blocks.some((block: ChatMessageBlock): boolean => block.type === "tool" && block.toolCall?.id === tool.id)) {
    return;
  }

  if (message.blocks.length < MAX_MESSAGE_BLOCKS) {
    message.blocks.push({ id: id(), type: "tool", text: "", toolCall: tool });
  }
}

function shouldUpdateToolArgs(tool: ChatToolCall, event: ChatEvent): boolean {
  if (!event.argsStatus) {
    return Boolean(event.args);
  }
  if (event.argsStatus === "unavailable") {
    return !tool.argsStatus;
  }

  return true;
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

      const response = chatStateEventResponse(event);
      const sessionIdForEcho = typeof response.activeSessionId === "string" ? response.activeSessionId : sessionId;
      const promptEchoIds = pendingEchoIds(mountedState.pendingPromptEchoIds, sessionIdForEcho);
      const assistantEchoIds = pendingEchoIds(mountedState.pendingAssistantEchoIds, sessionIdForEcho);
      const result = applyBackendResponseToMountedStore(
        context,
        store,
        response,
        "chatState",
        promptEchoIds,
        assistantEchoIds,
        {
          allowAssistantOnlyTailEcho: activeAssistantTailEchoAllowed(mountedState, response, sessionIdForEcho),
          preserveOnlyEchoMessages: true,
        },
      );
      updateMountedHistoryPageState(mountedState, response, sessionIdForEcho);
      syncMountedRunStateFromBackendResponse(mountedState, response, sessionIdForEcho, workspacePath, workspaceId);

      if (result.changed) {
        clearMatchedPendingEchoIds(mountedState.pendingPromptEchoIds, sessionIdForEcho, result.messages, promptEchoIds);
        clearMatchedPendingEchoIds(mountedState.pendingAssistantEchoIds, sessionIdForEcho, result.messages, assistantEchoIds);
      }

      if (result.messages.length || Array.isArray(response.messages)) {
        render.request();
      }
    });
  } catch (error) {
    if (!controller.signal.aborted) {
      await refreshMountedBackendChatState(context, chatSurface, store, mountedState, sessionId, workspacePath);
    }
  } finally {
    render.flush();

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

    const sessionIdForEcho = typeof response.activeSessionId === "string" ? response.activeSessionId : sessionId;
    const promptEchoIds = pendingEchoIds(mountedState.pendingPromptEchoIds, sessionIdForEcho);
    const assistantEchoIds = pendingEchoIds(mountedState.pendingAssistantEchoIds, sessionIdForEcho);
    const result = applyBackendResponseToMountedStore(
      context,
      store,
      response,
      "chatState",
      promptEchoIds,
      assistantEchoIds,
      {
        allowAssistantOnlyTailEcho: activeAssistantTailEchoAllowed(mountedState, response, sessionIdForEcho),
        preserveOnlyEchoMessages: true,
      },
    );
    updateMountedHistoryPageState(mountedState, response, sessionIdForEcho);
    syncMountedRunStateFromBackendResponse(mountedState, response, sessionIdForEcho, workspacePath, activeWorkspaceSelection(context).id);

    if (result.changed) {
      clearMatchedPendingEchoIds(mountedState.pendingPromptEchoIds, sessionIdForEcho, result.messages, promptEchoIds);
      clearMatchedPendingEchoIds(mountedState.pendingAssistantEchoIds, sessionIdForEcho, result.messages, assistantEchoIds);
    }

    if (result.messages.length || Array.isArray(response.messages)) {
      renderMountedBackendMessages(chatSurface, result.messages, store.activeSessionId);
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
    runId: event.runId,
    isStreaming: event.isStreaming,
    hasMoreBefore: event.hasMoreBefore,
    oldestMessageId: event.oldestMessageId,
  };
}

function updateMountedHistoryPageState(mountedState: MountedState, response: BackendResponse, fallbackSessionId: string): void {
  const sessionId: string = typeof response.activeSessionId === "string" && response.activeSessionId
    ? response.activeSessionId
    : fallbackSessionId;

  if (!sessionId || !Array.isArray(response.messages)) {
    return;
  }

  const previous: MountedHistoryPageState | undefined = mountedState.historyPages.get(sessionId);
  const oldestMessageId: string | undefined = typeof response.oldestMessageId === "string" && response.oldestMessageId
    ? response.oldestMessageId
    : response.messages[0]?.id || previous?.oldestMessageId;
  mountedState.historyPages.set(sessionId, {
    hasMoreBefore: response.hasMoreBefore === true,
    oldestMessageId,
    loading: previous?.loading === true,
  });
}

function syncMountedRunStateFromBackendResponse(
  mountedState: MountedState,
  response: BackendResponse,
  sessionId: string,
  workspacePath: string,
  workspaceId: string,
): void {
  if (
    response.isStreaming === true
    && typeof response.runId === "string"
    && response.runId
    && !mountedState.completedRunIds.has(response.runId)
  ) {
    mountedState.activeRunId = response.runId;
    mountedState.activeRunSessionId = typeof response.activeSessionId === "string" && response.activeSessionId ? response.activeSessionId : sessionId;
    mountedState.activeRunWorkspacePath = workspacePath;
    mountedState.activeRunWorkspaceId = workspaceId;
    mountedState.onRunStateChange?.();
    return;
  }

  if (response.isStreaming === false && (!response.activeSessionId || response.activeSessionId === mountedState.activeRunSessionId)) {
    mountedState.activeRunId = undefined;
    mountedState.activeRunSessionId = undefined;
    mountedState.activeRunWorkspacePath = undefined;
    mountedState.activeRunWorkspaceId = undefined;
    mountedState.onRunStateChange?.();
  }
}

function rememberCompletedRunId(mountedState: MountedState, runId: string): void {
  mountedState.completedRunIds.add(runId);

  if (mountedState.completedRunIds.size <= 50) {
    return;
  }

  const oldestRunId = mountedState.completedRunIds.values().next().value;

  if (typeof oldestRunId === "string") {
    mountedState.completedRunIds.delete(oldestRunId);
  }
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

type MountedStoreApplyResult = {
  messages: ChatMessage[];
  changed: boolean;
};

function applyBackendResponseToMountedStore(
  context: PluginContext,
  store: ChatStore,
  response: BackendResponse,
  reason: string,
  optimisticEchoIds: string | string[] = "",
  assistantEchoIds: string | string[] = "",
  options: MergeChatMessagesOptions = {},
): MountedStoreApplyResult {
  const hasResponseMessages: boolean = Array.isArray(response.messages);
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

  if (!hasResponseMessages) {
    return { messages: [], changed: false };
  }

  const session = activeSession(store);

  const mergedMessages = mergeChatMessages(
    session.messages,
    responseMessages,
    optimisticEchoIds,
    assistantEchoIds,
    options,
  );
  const nextMessages = options.preserveOnlyEchoMessages === true
    ? preserveMountedHistoryMessages(session.messages, pruneMountedChatStateMessages(mergedMessages))
    : mergedMessages.slice(-MAX_MESSAGES_PER_SESSION);
  if (!sessionMessagesChanged(session.messages, nextMessages)) {
    return { messages: session.messages, changed: false };
  }

  session.messages = nextMessages;
  const title = updateSessionTitleFromFirstUser(session);
  session.updatedAt = Date.now();

  if (session.messages.some(isMountedHistoryPageMessage)) {
    saveMountedStore(store);
  } else {
    saveStore(store);
  }

  if (title) {
    publishMountedSessionTitleIfChanged(session.id, title);
  }
  return { messages: session.messages, changed: true };
}

function preserveMountedHistoryMessages(previousMessages: ChatMessage[], nextMessages: ChatMessage[]): ChatMessage[] {
  const nextIds: Set<string> = new Set<string>(nextMessages.map((message: ChatMessage): string => message.id));
  const previousHistory: ChatMessage[] = previousMessages.filter((message: ChatMessage): boolean => {
    return isMountedHistoryPageMessage(message) && !nextIds.has(message.id);
  });

  return previousHistory.length ? [...previousHistory, ...nextMessages] : nextMessages;
}

function pruneMountedChatStateMessages(messages: ChatMessage[]): ChatMessage[] {
  const currentMessages: ChatMessage[] = messages.filter((message: ChatMessage): boolean => {
    return !isMountedHistoryPageMessage(message);
  });
  const retainedCurrentIds: Set<string> = new Set<string>(
    currentMessages.slice(-MAX_MESSAGES_PER_SESSION).map((message: ChatMessage): string => message.id),
  );

  return messages.filter((message: ChatMessage): boolean => {
    return isMountedHistoryPageMessage(message) || retainedCurrentIds.has(message.id);
  });
}

function saveMountedStore(store: ChatStore): void {
  const snapshot: ChatStore = {
    activeSessionId: store.activeSessionId,
    sessions: store.sessions.map((session: ChatSession): ChatSession => ({
      ...session,
      messages: session.messages.filter((message: ChatMessage): boolean => {
        return !isMountedHistoryPageMessage(message);
      }),
    })),
  };
  saveStore(snapshot);
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
    blocks: message.blocks,
    thinking: message.thinking,
    streaming: message.streaming,
    toolCalls: message.toolCalls,
    attachments: message.attachments,
    meta: message.meta,
  });
}

function applyBackendResponseToMountedSession(
  context: PluginContext,
  store: ChatStore,
  response: BackendResponse,
  reason: string,
  fallbackSessionId: string,
  optimisticEchoIds: string | string[] = "",
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

  const echoIds = Array.isArray(optimisticEchoIds) ? optimisticEchoIds : [optimisticEchoIds].filter(Boolean);
  if (responseSessionId !== fallbackSessionId) {
    for (const echoId of echoIds) {
      moveMessageBetweenSessions(store, fallbackSessionId, responseSessionId, echoId);
    }
  }

  const session = sessionById(store, responseSessionId);

  if (!responseMessages.length) {
    return [];
  }

  const nextMessages = mergeChatMessages(session.messages, responseMessages, optimisticEchoIds).slice(-MAX_MESSAGES_PER_SESSION);
  if (!sessionMessagesChanged(session.messages, nextMessages)) {
    return [];
  }

  session.messages = nextMessages;
  const title = updateSessionTitleFromFirstUser(session);
  session.updatedAt = Date.now();
  saveStore(store);

  if (title) {
    publishMountedSessionTitleIfChanged(session.id, title);
  }

  return session.messages;
}

function bindMountedSidebarSelection(
  disposables: Disposables,
  context: PluginContext,
  chatSurface: HTMLElement,
  store: ChatStore,
  mountedState: MountedState,
): void {
  const onSelected = (selected: SidebarSelectedSession | null, ignoreEmptySelection: boolean): void => {
    if (!selected?.sessionId) {
      if (!ignoreEmptySelection) {
        clearMountedSidebarSelection(context, chatSurface, store, mountedState, true);
      }

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
    if (handleMountedDeletedSession(context, chatSurface, store, mountedState, event)) {
      return;
    }

    const selected = selectedSessionFromSidebarEvent(context, event);

    if (selected) {
      onSelected(selected, false);
    }
  };
  const sidebarSelection = context.app?.piWebSidebar?.channels?.selectedSession$ || globalThis.piWebSidebar?.channels?.selectedSession$;
  const sidebarEvents = context.app?.piWebSidebar?.channels?.events$ || globalThis.piWebSidebar?.channels?.events$;

  if (sidebarSelection) {
    let isInitialSelection = true;
    disposables.add(sidebarSelection.subscribe((selected: SidebarSelectedSession | null): void => {
      onSelected(selected, isInitialSelection);
      isInitialSelection = false;
    }));
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
        onSelected({ sessionId, workspaceId: workspaceId || undefined }, false);
      }
    });
  }

  if (globalThis.piWeb) {
    let isInitialPiWebSelection = true;
    disposables.add(globalThis.piWeb.behaviorSubject<SidebarSelectedSession | null>(SIDEBAR_SELECTED_SESSION_CHANNEL, readSidebarSelection(context)).subscribe((selected: SidebarSelectedSession | null): void => {
      onSelected(selected, isInitialPiWebSelection);
      isInitialPiWebSelection = false;
    }));
    disposables.add(globalThis.piWeb.subject<SidebarActionEvent>(SIDEBAR_EVENT_CHANNEL).subscribe(onSidebarEvent));
    let isInitialActiveSession = true;
    disposables.add(globalThis.piWeb.behaviorSubject<string | null>("session.activeId", null).subscribe((sessionId: string | null): void => {
      if (!sessionId) {
        if (!isInitialActiveSession) {
          clearMountedSidebarSelection(context, chatSurface, store, mountedState, false);
        }

        isInitialActiveSession = false;
        return;
      }

      isInitialActiveSession = false;
      onSelected({ sessionId, workspaceId: context.app?.dataset.activeWorkspaceId || readStoredString(SIDEBAR_ACTIVE_WORKSPACE_KEY) || undefined }, false);
    }));
  }
}

function clearMountedSidebarSelection(
  context: PluginContext,
  chatSurface: HTMLElement,
  store: ChatStore,
  mountedState: MountedState,
  publish: boolean,
): void {
  mountedState.backendChatToken += 1;
  mountedState.runEventsAbort?.abort();
  mountedState.sessionEventsAbort?.abort();
  store.activeSessionId = "";
  saveStore(store);

  if (publish) {
    clearSidebarActiveSession(context);
  } else {
    const selected = readSidebarSelection(context);

    if (selected?.sessionId && context.app) {
      context.app.dataset.clearedSessionId = selected.sessionId;
    }
  }

  renderMountedDocumentation(chatSurface);
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

  if (!store.activeSessionId) {
    return sessionById(store, "", true).id;
  }

  return store.activeSessionId;
}

function isMountedSelectionActive(context: PluginContext, store: ChatStore, selected: SidebarSelectedSession): boolean {
  const selectedWorkspaceId = selected.workspaceId || "";
  const currentWorkspaceId = context.app?.dataset.activeWorkspaceId || readStoredString(SIDEBAR_ACTIVE_WORKSPACE_KEY) || "";
  return store.activeSessionId === selected.sessionId && (!selectedWorkspaceId || selectedWorkspaceId === currentWorkspaceId);
}

function handleMountedDeletedSession(
  context: PluginContext,
  chatSurface: HTMLElement,
  store: ChatStore,
  mountedState: MountedState,
  event: SidebarActionEvent,
): boolean {
  if (event.type !== "session.deleted") {
    return false;
  }

  const deletedSessionId = sessionIdFromSidebarEvent(event);

  if (!deletedSessionId) {
    return true;
  }

  const wasActive = store.activeSessionId === deletedSessionId;
  const beforeCount = store.sessions.length;
  store.sessions = store.sessions.filter((session: ChatSession): boolean => session.id !== deletedSessionId);

  if (wasActive) {
    mountedState.runEventsAbort?.abort();
    mountedState.sessionEventsAbort?.abort();

    const nextSelected = selectedSessionAfterDeletion(context, event, deletedSessionId);

    if (nextSelected?.sessionId) {
      persistSidebarSelection(context, nextSelected);
      switchMountedStoreToSession(store, nextSelected.sessionId);
      renderMountedSessionSwitch(chatSurface, activeSession(store).messages, store.activeSessionId);
      const workspace = workspaceSelectionForSelectedSession(context, nextSelected);
      void openMountedSessionEvents(context, chatSurface, store, mountedState, nextSelected.sessionId, workspace.path, workspace.id);
      return true;
    }

    store.activeSessionId = "";
    clearSidebarActiveSession(context);
    saveStore(store);
    renderMountedDocumentation(chatSurface);
    return true;
  }

  if (store.sessions.length !== beforeCount) {
    saveStore(store);
  }

  return true;
}

function selectedSessionAfterDeletion(
  context: PluginContext,
  event: SidebarActionEvent,
  deletedSessionId: string,
): SidebarSelectedSession | null {
  const snapshotSessionId = event.snapshot?.activeSessionId || "";
  const snapshotWorkspaceId = event.snapshot?.activeWorkspaceId || "";

  if (snapshotSessionId && snapshotSessionId !== deletedSessionId) {
    return { sessionId: snapshotSessionId, workspaceId: snapshotWorkspaceId || undefined };
  }

  const selected = readSidebarSelection(context);

  if (selected?.sessionId && selected.sessionId !== deletedSessionId) {
    return selected;
  }

  return null;
}

function selectedSessionFromSidebarEvent(context: PluginContext, event: SidebarActionEvent): SidebarSelectedSession | null {
  if (!isSidebarSessionSelectionEvent(event.type)) {
    return null;
  }

  const detail = event.detail || {};
  const sessionId = sessionIdFromSidebarEvent(event) || event.snapshot?.activeSessionId || "";
  const workspaceId = typeof detail.workspaceId === "string"
    ? detail.workspaceId
    : event.snapshot?.activeWorkspaceId || context.app?.dataset.activeWorkspaceId || "";

  if (!sessionId) {
    return null;
  }

  return { sessionId, workspaceId: workspaceId || undefined };
}

function sessionIdFromSidebarEvent(event: SidebarActionEvent): string {
  const detail = event.detail || {};

  if (typeof detail.sessionId === "string") {
    return detail.sessionId;
  }

  if (typeof detail.id === "string") {
    return detail.id;
  }

  return "";
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

  if (!messages.length) {
    renderMountedDocumentation(chatSurface);
    return;
  }

  const container = chatSurface.querySelector<HTMLElement>(".term-inner") || chatSurface;
  reconcileMountedBackendMessages(container, messages, sessionId, { preserveHistoryPageNodes: true });
  syncMountedScrollAfterRender(chatSurface);
}

function renderMountedSessionSwitch(chatSurface: HTMLElement, messages: ChatMessage[], sessionId: string): void {
  pruneMountedExpandedToolCards(messages, sessionId);
  const container = chatSurface.querySelector<HTMLElement>(".term-inner") || chatSurface;
  reconcileMountedBackendMessages(container, messages, sessionId, { preserveHistoryPageNodes: false });
  syncMountedScrollAfterRender(chatSurface);
}

type MountedReconcileOptions = {
  preserveHistoryPageNodes?: boolean;
};

function reconcileMountedBackendMessages(
  container: HTMLElement,
  messages: ChatMessage[],
  sessionId: string,
  options: MountedReconcileOptions = {},
): void {
  const existingItems: Map<string, HTMLElement> = mountedTranscriptItemsById(container);
  const nextItems: HTMLElement[] = messages.map((message: ChatMessage): HTMLElement => {
    const signature: string = `${sessionId}:${messageSignature(message)}`;
    const existing: HTMLElement | undefined = existingItems.get(message.id);

    if (existing) {
      if (mountedMessageSignatures.get(existing) !== signature) {
        patchMountedBackendMessage(existing, message, sessionId, signature);
      }

      return existing;
    }

    const item: HTMLElement = renderMountedBackendMessage(message, sessionId);
    mountedMessageSignatures.set(item, signature);
    return item;
  });
  const nextItemSet: Set<HTMLElement> = new Set<HTMLElement>(nextItems);
  let cursor: ChildNode | null = container.firstChild;

  for (const item of nextItems) {
    if (cursor !== item) {
      container.insertBefore(item, cursor);
    }

    cursor = item.nextSibling;
  }

  for (const child of Array.from(container.children)) {
    if (isMountedTranscriptItem(container, child) && !nextItemSet.has(child)) {
      if (options.preserveHistoryPageNodes === true && child.dataset.sessionId === sessionId && child.dataset.historyPage === "true") {
        continue;
      }

      child.remove();
      continue;
    }

    if (!isMountedTranscriptItem(container, child)) {
      child.remove();
    }
  }
}

function patchMountedBackendMessage(item: HTMLElement, message: ChatMessage, sessionId: string, signature: string): void {
  const nextItem = renderMountedBackendMessage(message, sessionId);
  item.replaceChildren(...Array.from(nextItem.childNodes));
  item.className = nextItem.className;
  item.dataset.messageId = message.id;

  if (message.streaming) {
    item.dataset.streaming = "true";
  } else {
    delete item.dataset.streaming;
  }

  mountedMessageSignatures.set(item, signature);
}

function mountedTranscriptItemsById(container: HTMLElement): Map<string, HTMLElement> {
  const items: Map<string, HTMLElement> = new Map<string, HTMLElement>();

  for (const child of Array.from(container.children)) {
    if (!isMountedTranscriptItem(container, child)) {
      continue;
    }

    const messageId: string = child.dataset.messageId || "";

    if (messageId) {
      items.set(messageId, child);
    }
  }

  return items;
}

function isMountedTranscriptItem(container: HTMLElement, child: Element): child is HTMLElement {
  const view = container.ownerDocument.defaultView as (Window & { HTMLElement: typeof HTMLElement }) | null;

  return Boolean(view && child instanceof view.HTMLElement && child.classList.contains("transcript-item"));
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
    "Type ! then Space at the start to turn the prompt yellow and run shell commands in the workspace.",
    "Queued file attachments hide during shell mode and reappear for the next normal prompt.",
    "Type @ to list project files, then pick one to tag it as prompt context.",
    "Type / at the start to open the slash command list.",
    "Chats are cached locally after you start or select a session.",
    "When older messages exist, scroll to the top of the transcript to load previous history."
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

function bindMountedHistoryPagination(
  disposables: Disposables,
  context: PluginContext,
  chatSurface: HTMLElement,
  store: ChatStore,
  mountedState: MountedState,
): void {
  const scrollLock = mountedScrollLocks.get(chatSurface);

  if (!scrollLock) {
    return;
  }

  disposables.listen(scrollLock.term, "scroll", (): void => {
    if (scrollLock.term.scrollTop > CHAT_HISTORY_TOP_THRESHOLD_PX) {
      return;
    }

    void loadMountedPreviousMessages(context, chatSurface, store, mountedState, scrollLock);
  });
}

async function loadMountedPreviousMessages(
  context: PluginContext,
  chatSurface: HTMLElement,
  store: ChatStore,
  mountedState: MountedState,
  scrollLock: MountedScrollLock,
): Promise<void> {
  const sessionId: string = store.activeSessionId;
  const historyState: MountedHistoryPageState | undefined = mountedState.historyPages.get(sessionId);

  if (!sessionId || !historyState?.hasMoreBefore || !historyState.oldestMessageId || historyState.loading) {
    return;
  }

  historyState.loading = true;
  const previousHeight: number = scrollLock.term.scrollHeight;
  const previousTop: number = scrollLock.term.scrollTop;
  releaseMountedScrollLock(scrollLock);
  scrollLock.term.setAttribute("aria-busy", "true");

  try {
    const workspace: { id: string; path: string } = activeWorkspaceSelection(context);
    const response: BackendResponse = await backendCall(
      context,
      "chatState",
      {
        ...chatStateRequestData(context, sessionId, workspace.path),
        beforeMessageId: historyState.oldestMessageId,
        limit: CHAT_HISTORY_PAGE_SIZE,
      },
      workspace.id,
    );
    const responseSessionId: string = typeof response.activeSessionId === "string" && response.activeSessionId
      ? response.activeSessionId
      : sessionId;

    if (responseSessionId !== store.activeSessionId) {
      return;
    }

    const olderMessages: ChatMessage[] = markMountedHistoryPageMessages(sanitizeChatMessages(response.messages), sessionId);
    const session: ChatSession = sessionById(store, sessionId);
    const existingIds: Set<string> = new Set<string>(session.messages.map((message: ChatMessage): string => message.id));
    const prependMessages: ChatMessage[] = olderMessages.filter((message: ChatMessage): boolean => !existingIds.has(message.id));

    if (prependMessages.length) {
      session.messages = [...prependMessages, ...session.messages];
      session.updatedAt = Date.now();
      renderMountedBackendMessages(chatSurface, session.messages, sessionId);
      scrollLock.term.scrollTop = previousTop + Math.max(0, scrollLock.term.scrollHeight - previousHeight);
    }

    updateMountedHistoryPageState(mountedState, response, sessionId);
  } catch {
    // History pagination is best effort; a failed page load must not break normal chat scrolling.
  } finally {
    const nextState: MountedHistoryPageState | undefined = mountedState.historyPages.get(sessionId);

    if (nextState) {
      nextState.loading = false;
    }

    scrollLock.term.setAttribute("aria-busy", "false");
  }
}

function markMountedHistoryPageMessages(messages: ChatMessage[], _sessionId: string): ChatMessage[] {
  return messages.map((message: ChatMessage): ChatMessage => {
    return {
      ...message,
      meta: { ...(message.meta || {}), piWebChatHistoryPage: true },
    };
  });
}

function isMountedHistoryPageMessage(message: ChatMessage): boolean {
  return message.meta?.piWebChatHistoryPage === true;
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
  item.dataset.sessionId = sessionId;

  if (isPendingMountedSteeringMessage(message)) {
    appendMountedPendingSteeringRow(item, message, sessionId);
  } else if (hasRenderableMessageBlocks(message)) {
    const skipTextBlocks = shouldRenderTextFallbackBeforeBlocks(message);

    if (skipTextBlocks) {
      appendMountedMessageRow(item, message.role, message.text);
    }

    renderMountedMessageBlocks(item, message, sessionId, skipTextBlocks);
  } else {
    renderMountedLegacyMessage(item, message, sessionId);
  }

  if (isMountedHistoryPageMessage(message)) {
    item.dataset.historyPage = "true";
  }

  if (message.streaming) {
    item.dataset.streaming = "true";
  }

  return item;
}

function isPendingMountedSteeringMessage(message: ChatMessage): boolean {
  return message.role === "user" && message.meta?.piWebChatSteeringState === "pending";
}

function appendMountedPendingSteeringRow(item: HTMLElement, message: ChatMessage, sessionId: string): void {
  const row = document.createElement("div");
  row.className = "msg pending-steering";
  row.dataset.kind = "user";

  const prefix = document.createElement("span");
  prefix.className = "prefix user";
  prefix.textContent = mountedMessagePrefix("user");

  const body = document.createElement("small");
  body.className = "body user pending-steering-text";
  body.textContent = message.text;

  const cancel = document.createElement("button");
  cancel.type = "button";
  cancel.className = "pending-steering-cancel";
  cancel.dataset.action = "cancel-steering";
  cancel.dataset.sessionId = sessionId;
  cancel.dataset.messageId = message.id;
  cancel.setAttribute("aria-label", "cancel steering");
  cancel.title = "cancel steering";
  cancel.textContent = "×";

  row.append(prefix, body, cancel);
  item.append(row);
}

function hasRenderableMessageBlocks(message: ChatMessage): boolean {
  return Boolean(message.blocks?.some((block: ChatMessageBlock): boolean => {
    return block.type === "tool" || block.text.trim().length > 0;
  }));
}

function shouldRenderTextFallbackBeforeBlocks(message: ChatMessage): boolean {
  return Boolean(message.text.trim()) && (!hasRenderableTextMessageBlock(message) || isMessageBlockCapReached(message));
}

function hasRenderableTextMessageBlock(message: ChatMessage): boolean {
  return Boolean(message.blocks?.some((block: ChatMessageBlock): boolean => {
    return block.type === "text" && block.text.trim().length > 0;
  }));
}

function isMessageBlockCapReached(message: ChatMessage): boolean {
  return (message.blocks?.length || 0) >= MAX_MESSAGE_BLOCKS;
}

function renderMountedMessageBlocks(item: HTMLElement, message: ChatMessage, sessionId: string, skipTextBlocks = false): void {
  for (const block of message.blocks || []) {
    if (block.type === "text") {
      if (!skipTextBlocks) {
        appendMountedMessageRow(item, message.role, block.text);
      }
    } else if (block.type === "thinking") {
      item.append(renderMountedThinking(block.text, Boolean(message.streaming)));
    } else if (block.type === "tool" && block.toolCall) {
      const tool = message.toolCalls?.find((item: ChatToolCall): boolean => item.id === block.toolCall?.id) || block.toolCall;
      item.append(renderMountedToolCard(tool, mountedToolKey(sessionId, message, tool)));
    }
  }
}

function renderMountedLegacyMessage(item: HTMLElement, message: ChatMessage, sessionId: string): void {
  if (shouldRenderMountedMessageRow(message)) {
    appendMountedMessageRow(item, message.role, message.text);
  }

  if (message.thinking) {
    item.append(renderMountedThinking(message.thinking, Boolean(message.streaming)));
  }

  for (const tool of message.toolCalls || []) {
    item.append(renderMountedToolCard(tool, mountedToolKey(sessionId, message, tool)));
  }
}

function appendMountedMessageRow(item: HTMLElement, role: ChatMessage["role"], text: string): void {
  if (role === "assistant" && !text.trim()) {
    return;
  }

  const row = document.createElement("div");
  row.className = "msg";
  row.dataset.kind = mountedMessageKind(role);

  const prefix = document.createElement("span");
  prefix.className = `prefix ${mountedMessageKind(role)}`;
  prefix.textContent = mountedMessagePrefix(role);

  const body = document.createElement("pre");
  body.className = `body ${mountedMessageKind(role)}`;
  body.textContent = text;

  row.append(prefix, body);
  item.append(row);
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
  head.setAttribute("aria-label", mountedToolAriaLabel(tool, collapsed));
  head.append(toolGlyph(tool), toolName(tool), toolArgs(tool), toolMeta(tool, collapsed));

  if (!collapsed) {
    card.append(renderMountedToolBody(tool));
  }

  head.addEventListener("click", () => toggleMountedToolCard(card, head, tool, toolKey));
  card.prepend(head);
  return card;
}

function mountedToolAriaLabel(tool: ChatToolCall, collapsed: boolean): string {
  const action = collapsed ? "Show" : "Hide";
  const status = tool.status === "running" ? "running" : tool.status === "err" ? "failed" : "done";
  const args = mountedToolAriaArgsText(tool);
  const argsLabel = args ? `, ${args}` : "";
  return `${action} ${tool.name || "tool"} output, ${status}${argsLabel}`;
}

function mountedToolAriaArgsText(tool: ChatToolCall): string {
  if (tool.argsStatus === "present") {
    return "arguments present";
  }

  if (tool.argsStatus) {
    return toolArgsInlineText(tool);
  }

  return tool.args ? "arguments present" : "";
}

function renderMountedToolBody(tool: ChatToolCall): HTMLElement {
  const body = document.createElement("pre");
  body.className = "tc-body";
  body.textContent = tool.text || toolArgsBodyText(tool);
  return body;
}

function createTerminalSpinner(): HTMLElement {
  const spinner = document.createElement("span");
  spinner.className = "spinner";
  spinner.setAttribute("aria-hidden", "true");

  for (let index: number = 0; index < SPINNER_DOT_COUNT; index += 1) {
    spinner.append(document.createElement("span"));
  }

  return spinner;
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
  head.setAttribute("aria-label", mountedToolAriaLabel(tool, collapsed));
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
  args.textContent = toolArgsInlineText(tool);
  return args;
}

function toolMeta(tool: ChatToolCall, collapsed: boolean): HTMLElement {
  const meta = document.createElement("span");
  meta.className = "tc-meta";

  if (tool.status === "running") {
    const spinner = createTerminalSpinner();
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

function toolIconName(tool: ChatToolCall): ToolIconName | undefined {
  const name = normalizeToolName(tool.name);

  if (["bash", "shell", "sh", "zsh", "terminal"].includes(name)) {
    return commandIconName(toolArgsInlineText(tool).toLowerCase()) || "terminal";
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
    replaceLastRunningTool(
      state,
      formatShellOutput(command, output, exitCode, durationMs, Boolean(result.truncated)),
      exitCode === 0 ? "ok" : "err",
    );
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
  updateComposerMode(dom, dom.textarea.value, hasQueuedAttachmentNames(state.selectedAttachmentNames));
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
  if (value.startsWith("!")) {
    state.fileSearchToken += 1;
    dom.slashPopover.hidden = true;
    dom.refsPopover.hidden = true;
    return;
  }

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

export function hasQueuedAttachmentNames(attachmentNames: string[]): boolean {
  return attachmentNames.length > 0;
}

export function shellAttachmentNoteVisible(value: string, hasQueuedAttachments: boolean): boolean {
  return value.trim().startsWith("!") && hasQueuedAttachments;
}

function updateComposerMode(dom: ChatDom, value: string, hasQueuedAttachments: boolean = false): void {
  dom.root.toggleAttribute("data-shell-attachments", shellAttachmentNoteVisible(value, hasQueuedAttachments));

  if (value.trim().startsWith("!")) setComposerMode(dom, "shell");
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

function activeAssistantTailEchoAllowed(
  _mountedState: MountedState,
  response: BackendResponse,
  sessionId: string,
): boolean {
  return Boolean(typeof response.runId === "string" && response.runId && sessionId);
}

function mergeChatMessages(
  localMessages: ChatMessage[],
  backendMessages: ChatMessage[],
  optimisticEchoIds: string | string[] = "",
  assistantEchoIds: string | string[] = "",
  options: MergeChatMessagesOptions = {},
): ChatMessage[] {
  const promptEchoIds = toEchoIdList(optimisticEchoIds);
  const consumedPromptAnchorIds = localMessages
    .filter(isAssistantOnlyPromptAnchor)
    .map((message: ChatMessage): string => message.id);
  const promptAnchorIds = [...promptEchoIds, ...consumedPromptAnchorIds];
  const assistantEchoIdList = toEchoIdList(assistantEchoIds);
  const preservedLocalIds: Set<string> = new Set<string>([...promptAnchorIds, ...assistantEchoIdList]);
  const backendMessageIds: Set<string> = new Set<string>(backendMessages.map((message: ChatMessage): string => message.id));
  const preserveOnlyEchoMessages: boolean = options.preserveOnlyEchoMessages === true;
  const allowAssistantOnlyTailEcho: boolean = options.allowAssistantOnlyTailEcho === true;
  const mergeLocalMessages: ChatMessage[] = preserveOnlyEchoMessages
    ? localMessages.filter((message: ChatMessage): boolean => {
      return backendMessageIds.has(message.id)
        || preservedLocalIds.has(message.id)
        || isAssistantOnlyPromptAnchor(message)
        || isPendingMountedSteeringMessage(message)
        || isMountedHistoryPageMessage(message);
    })
    : localMessages;
  const merged = new Map<string, ChatMessage>();
  const orderById = new Map<string, number>();
  const assistantEchoByBackendUserId = new Map<string, string>();
  const promptAnchorByBackendUserId = new Map<string, string>();
  const hasBackendUserMessages = backendMessages.some((message: ChatMessage): boolean => message.role === "user");
  const lastKnownBackendOrder = lastKnownBackendMessageOrder(mergeLocalMessages, backendMessages);
  let localOrder = backendMessages.length;
  let historyOrder = -mergeLocalMessages.length;

  for (const message of mergeLocalMessages) {
    merged.set(message.id, message);

    if (isMountedHistoryPageMessage(message) && !backendMessageIds.has(message.id)) {
      orderById.set(message.id, historyOrder++);
      continue;
    }

    orderById.set(message.id, localOrder++);
  }

  const usedPromptEchoIds: Set<string> = new Set<string>();
  const usedAssistantEchoIds: Set<string> = new Set<string>();
  const usedAssistantAnchorIds: Set<string> = new Set<string>();

  backendMessages.forEach((message: ChatMessage, backendOrder: number): void => {
    const promptDuplicate = findOptimisticPromptEchoMessage(
      mergeLocalMessages,
      message,
      promptAnchorIds,
      usedPromptEchoIds,
    );

    if (promptDuplicate) {
      usedPromptEchoIds.add(promptDuplicate.id);
      promptAnchorByBackendUserId.set(message.id, promptDuplicate.id);
      const assistantEchoId = nextAssistantEchoIdAfterMessage(
        mergeLocalMessages,
        promptDuplicate.id,
        assistantEchoIdList,
        usedAssistantEchoIds,
      );

      if (assistantEchoId) {
        assistantEchoByBackendUserId.set(message.id, assistantEchoId);
      }

      replaceMergedMessage(merged, orderById, promptDuplicate.id, message, backendOrder);
      return;
    }

    const assistantDuplicateId = immediateAssistantEchoIdForBackendMessage(
      mergeLocalMessages,
      backendMessages,
      message,
      backendOrder,
      assistantEchoIdList,
      usedAssistantEchoIds,
      assistantEchoByBackendUserId,
    );

    if (assistantDuplicateId) {
      const previousBackendMessage = backendMessages[backendOrder - 1];
      const promptAnchorId = previousBackendMessage
        ? promptAnchorByBackendUserId.get(previousBackendMessage.id)
        : undefined;
      usedAssistantEchoIds.add(assistantDuplicateId);

      if (promptAnchorId) {
        usedAssistantAnchorIds.add(promptAnchorId);
      }

      replaceMergedMessage(merged, orderById, assistantDuplicateId, message, backendOrder);
      return;
    }

    const existingPromptAnchor = existingPromptAnchorForBackendAssistant(mergeLocalMessages, message, promptAnchorIds);

    if (existingPromptAnchor && allowAssistantOnlyTailEcho) {
      usedAssistantAnchorIds.add(existingPromptAnchor.id);
      const anchoredOrder = (orderById.get(existingPromptAnchor.id) ?? backendOrder) + (backendOrder + 1) / 1_000;
      markAssistantOnlyPromptAnchor(merged, existingPromptAnchor);
      orderById.set(message.id, anchoredOrder);
      merged.set(message.id, { ...merged.get(message.id), ...message });
      return;
    }

    const canAnchorAssistant = canAnchorBackendAssistant(
      message,
      backendOrder,
      hasBackendUserMessages,
      lastKnownBackendOrder,
      usedPromptEchoIds,
      usedAssistantAnchorIds,
      allowAssistantOnlyTailEcho,
    );
    const requiresCurrentAssistant = !hasBackendUserMessages
      || (usedPromptEchoIds.size === 0 && usedAssistantAnchorIds.size === 0);
    const promptAnchor = nextPromptAnchorForBackendAssistant(
      mergeLocalMessages,
      message,
      promptAnchorIds,
      usedAssistantAnchorIds,
      canAnchorAssistant,
      requiresCurrentAssistant,
    );

    if (promptAnchor) {
      usedAssistantAnchorIds.add(promptAnchor.id);
      const anchoredOrder = (orderById.get(promptAnchor.id) ?? backendOrder) + (backendOrder + 1) / 1_000;
      markAssistantOnlyPromptAnchor(merged, promptAnchor);
      const assistantEchoId = nextAssistantEchoIdAfterMessage(
        mergeLocalMessages,
        promptAnchor.id,
        assistantEchoIdList,
        usedAssistantEchoIds,
      );

      if (assistantEchoId) {
        usedAssistantEchoIds.add(assistantEchoId);
        replaceMergedMessage(merged, orderById, assistantEchoId, message, anchoredOrder);
        return;
      }

      orderById.set(message.id, anchoredOrder);
      merged.set(message.id, { ...merged.get(message.id), ...message });
      return;
    }

    orderById.set(message.id, backendOrder);
    merged.set(message.id, { ...merged.get(message.id), ...message });
  });

  const orderedMessages = [...merged.values()].sort((a, b): number => {
    const orderDelta = (orderById.get(a.id) ?? 0) - (orderById.get(b.id) ?? 0);

    if (orderDelta !== 0) {
      return orderDelta;
    }

    return a.createdAt - b.createdAt;
  });
  return removeLateBackendUserEchoDuplicates(orderedMessages);
}

function removeLateBackendUserEchoDuplicates(messages: ChatMessage[]): ChatMessage[] {
  const usedBackendUserIds = new Set<string>();
  return messages.filter((message: ChatMessage): boolean => {
    if (message.role !== "user" || !isAssistantOnlyPromptAnchor(message)) {
      return true;
    }

    const duplicate = messages.find((candidate: ChatMessage): boolean => {
      return candidate.role === "user"
        && !isAssistantOnlyPromptAnchor(candidate)
        && !usedBackendUserIds.has(candidate.id)
        && candidate.text.trim() === message.text.trim()
        && candidate.createdAt >= message.createdAt;
    });

    if (!duplicate) {
      return true;
    }

    usedBackendUserIds.add(duplicate.id);
    return false;
  });
}

function toEchoIdList(echoIds: string | string[]): string[] {
  return Array.isArray(echoIds) ? echoIds : [echoIds].filter(Boolean);
}

function replaceMergedMessage(
  merged: Map<string, ChatMessage>,
  orderById: Map<string, number>,
  duplicateId: string,
  message: ChatMessage,
  order: number,
): void {
  merged.delete(duplicateId);
  merged.set(message.id, message);
  orderById.delete(duplicateId);
  orderById.set(message.id, order);
}

function findOptimisticPromptEchoMessage(
  localMessages: ChatMessage[],
  backendMessage: ChatMessage,
  optimisticEchoIds: string[],
  usedEchoIds: Set<string>,
): ChatMessage | undefined {
  if (!optimisticEchoIds.length || backendMessage.role !== "user" || !backendMessage.text.trim()) {
    return undefined;
  }

  if (localMessages.some((message: ChatMessage): boolean => message.id === backendMessage.id)) {
    return undefined;
  }

  return localMessages.find((message: ChatMessage): boolean => {
    return optimisticEchoIds.includes(message.id)
      && !usedEchoIds.has(message.id)
      && message.role === backendMessage.role
      && message.text.trim() === backendMessage.text.trim();
  });
}

function immediateAssistantEchoIdForBackendMessage(
  localMessages: ChatMessage[],
  backendMessages: ChatMessage[],
  backendMessage: ChatMessage,
  backendOrder: number,
  assistantEchoIds: string[],
  usedAssistantEchoIds: Set<string>,
  assistantEchoByBackendUserId: Map<string, string>,
): string {
  if (backendMessage.role !== "assistant" || backendOrder <= 0) {
    return "";
  }

  const previousBackendMessage = backendMessages[backendOrder - 1];

  if (previousBackendMessage?.role !== "user") {
    return "";
  }

  const sameMergeAssistantId = assistantEchoByBackendUserId.get(previousBackendMessage.id) || "";

  if (sameMergeAssistantId && !usedAssistantEchoIds.has(sameMergeAssistantId)) {
    return sameMergeAssistantId;
  }

  return nextAssistantEchoIdAfterMessage(localMessages, previousBackendMessage.id, assistantEchoIds, usedAssistantEchoIds);
}

function lastKnownBackendMessageOrder(localMessages: ChatMessage[], backendMessages: ChatMessage[]): number {
  const localMessageIds = new Set<string>(localMessages.map((message: ChatMessage): string => message.id));
  let lastKnownOrder = -1;

  backendMessages.forEach((message: ChatMessage, backendOrder: number): void => {
    if (localMessageIds.has(message.id)) {
      lastKnownOrder = backendOrder;
    }
  });

  return lastKnownOrder;
}

function canAnchorBackendAssistant(
  backendMessage: ChatMessage,
  backendOrder: number,
  hasBackendUserMessages: boolean,
  lastKnownBackendOrder: number,
  usedPromptEchoIds: Set<string>,
  usedAssistantAnchorIds: Set<string>,
  allowed: boolean,
): boolean {
  if (!allowed || backendMessage.role !== "assistant") {
    return false;
  }

  if (!hasBackendUserMessages) {
    return true;
  }

  return usedPromptEchoIds.size > 0
    || usedAssistantAnchorIds.size > 0
    || (lastKnownBackendOrder >= 0 && backendOrder > lastKnownBackendOrder);
}

function existingPromptAnchorForBackendAssistant(
  localMessages: ChatMessage[],
  backendMessage: ChatMessage,
  promptEchoIds: string[],
): ChatMessage | undefined {
  if (backendMessage.role !== "assistant") {
    return undefined;
  }

  const backendIndex = localMessages.findIndex((message: ChatMessage): boolean => message.id === backendMessage.id);

  if (backendIndex <= 0) {
    return undefined;
  }

  const previousMessage = localMessages[backendIndex - 1];

  if (previousMessage?.role === "user" && promptEchoIds.includes(previousMessage.id)) {
    return previousMessage;
  }

  return undefined;
}

function nextPromptAnchorForBackendAssistant(
  localMessages: ChatMessage[],
  backendMessage: ChatMessage,
  promptEchoIds: string[],
  usedPromptAnchorIds: Set<string>,
  allowed: boolean,
  requireCurrentTimestamp: boolean,
): ChatMessage | undefined {
  if (!allowed || backendMessage.role !== "assistant") {
    return undefined;
  }

  const unusedAnchor = localMessages.find((message: ChatMessage): boolean => {
    return promptEchoIds.includes(message.id)
      && message.role === "user"
      && !usedPromptAnchorIds.has(message.id)
      && (!requireCurrentTimestamp || backendMessage.createdAt >= message.createdAt);
  });

  if (unusedAnchor) {
    return unusedAnchor;
  }

  const lastUsedAnchorId = [...usedPromptAnchorIds].at(-1);
  return localMessages.find((message: ChatMessage): boolean => message.id === lastUsedAnchorId);
}

function isAssistantOnlyPromptAnchor(message: ChatMessage): boolean {
  return message.meta?.[ASSISTANT_ONLY_ANCHOR_META_KEY] === true;
}

function markAssistantOnlyPromptAnchor(merged: Map<string, ChatMessage>, promptAnchor: ChatMessage): void {
  merged.set(promptAnchor.id, {
    ...promptAnchor,
    meta: { ...(promptAnchor.meta || {}), [ASSISTANT_ONLY_ANCHOR_META_KEY]: true },
  });
}

function nextAssistantEchoIdAfterMessage(
  localMessages: ChatMessage[],
  previousMessageId: string,
  assistantEchoIds: string[],
  usedAssistantEchoIds: Set<string>,
): string {
  const previousIndex = localMessages.findIndex((message: ChatMessage): boolean => message.id === previousMessageId);

  if (previousIndex < 0) {
    return "";
  }

  const nextMessage = localMessages[previousIndex + 1];

  if (
    nextMessage?.role === "assistant"
    && assistantEchoIds.includes(nextMessage.id)
    && !usedAssistantEchoIds.has(nextMessage.id)
  ) {
    return nextMessage.id;
  }

  return "";
}

function pushPendingEchoId(pendingEchoIds: Map<string, string[]>, sessionId: string, echoId: string): void {
  pendingEchoIds.set(sessionId, [...(pendingEchoIds.get(sessionId) || []), echoId]);
}

function pendingEchoIds(pendingEchoIds: Map<string, string[]>, sessionId: string): string[] {
  return pendingEchoIds.get(sessionId) || [];
}

function removePendingPromptEchoId(pendingPromptEchoIds: Map<string, string[]>, sessionId: string, echoId: string): void {
  const remaining: string[] = (pendingPromptEchoIds.get(sessionId) || []).filter((item: string): boolean => item !== echoId);

  if (remaining.length) {
    pendingPromptEchoIds.set(sessionId, remaining);
    return;
  }

  pendingPromptEchoIds.delete(sessionId);
}

function movePendingPromptEchoId(pendingPromptEchoIds: Map<string, string[]>, fromSessionId: string, toSessionId: string): void {
  const echoIds = pendingPromptEchoIds.get(fromSessionId) || [];

  if (!echoIds.length) {
    return;
  }

  pendingPromptEchoIds.delete(fromSessionId);
  pendingPromptEchoIds.set(toSessionId, [...(pendingPromptEchoIds.get(toSessionId) || []), ...echoIds]);
}

function clearMatchedPendingEchoIds(
  pendingEchoIds: Map<string, string[]>,
  sessionId: string,
  mergedMessages: ChatMessage[],
  optimisticEchoIds: string[],
): void {
  if (!optimisticEchoIds.length || !mergedMessages.length) {
    return;
  }

  const remaining = optimisticEchoIds.filter((echoId: string): boolean => {
    return mergedMessages.some((message: ChatMessage): boolean => {
      return message.id === echoId && !isAssistantOnlyPromptAnchor(message);
    });
  });

  if (remaining.length) {
    pendingEchoIds.set(sessionId, remaining);
    return;
  }

  pendingEchoIds.delete(sessionId);
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
  removeEmptyInactiveSession(store, fromSession.id);
  saveStore(store);
}

function removeEmptyInactiveSession(store: ChatStore, sessionId: string): void {
  const session = store.sessions.find((item) => item.id === sessionId);

  if (!session || session.id === store.activeSessionId || session.messages.length > 0 || session.title !== "New chat") {
    return;
  }

  store.sessions = store.sessions.filter((item) => item.id !== session.id);
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

function createFreshStore(sessionId?: string): ChatStore {
  const session = createSession(sessionId);
  return { activeSessionId: session.id, sessions: [session] };
}

function createNoSelectionStore(): ChatStore {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") as Partial<ChatStore> | null;

    if (parsed && Array.isArray(parsed.sessions)) {
      return { activeSessionId: "", sessions: parsed.sessions.filter(isSession).map(sanitizeSession) };
    }
  } catch {
    // Fall through to an empty inactive store.
  }

  return { activeSessionId: "", sessions: [] };
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
  return createFreshStore(preferredSessionId || undefined);
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
  const sanitized: ChatMessage = { ...message };

  if (Array.isArray(message.toolCalls)) {
    sanitized.toolCalls = message.toolCalls.filter(isChatToolCall);
  } else {
    delete sanitized.toolCalls;
  }

  if (Array.isArray(message.blocks)) {
    sanitized.blocks = message.blocks.filter(isChatMessageBlock).map(sanitizeChatMessageBlock);
  } else {
    delete sanitized.blocks;
  }

  return sanitized;
}

function sanitizeChatMessageBlock(block: ChatMessageBlock): ChatMessageBlock {
  if (block.type !== "tool") {
    const { toolCall: _toolCall, ...rest } = block;
    return rest;
  }

  return block;
}

function isChatMessageBlock(value: unknown): value is ChatMessageBlock {
  if (!isRecord(value) || typeof value.id !== "string" || typeof value.text !== "string") {
    return false;
  }

  if (value.type === "text" || value.type === "thinking") {
    return true;
  }

  return value.type === "tool" && isChatToolCall(value.toolCall);
}

function isChatToolCall(value: unknown): value is ChatToolCall {
  if (!isRecord(value) || typeof value.id !== "string" || typeof value.name !== "string") {
    return false;
  }

  return typeof value.text === "string" && isToolStatus(value.status) && isToolArgsStatus(value.argsStatus);
}

function isToolArgsStatus(value: unknown): value is ChatToolCall["argsStatus"] {
  return value === undefined
    || value === "present"
    || value === "empty"
    || value === "unavailable"
    || value === "truncated"
    || value === "omitted";
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

function isAbortError(error: unknown): boolean {
  return error instanceof Error && (error.name === "AbortError" || /aborted|abort/i.test(error.message));
}

function errorText(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
