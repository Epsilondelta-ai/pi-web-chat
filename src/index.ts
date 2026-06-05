import { createChatSurface, createComposerSurface, installBadge, installStyles, pluginClass, pluginStyleText } from "./dom";
import { runBackendShell } from "./shell";
import type {
  AppElement,
  AppMethodName,
  AppMethods,
  BackendResponse,
  Cleanup,
  FileAttachment,
  JsonRecord,
  PluginCommand,
  PluginContext,
  PluginState,
  ShellHooks,
} from "./types";

const PLUGIN_CLASS = pluginClass();
const FILE_REF_LIMIT = 12;
const PATCHED_METHODS: AppMethodName[] = [
  "renderSlashCommands",
  "pickSlash",
  "updatePromptFileRefs",
  "pickPromptFileRef",
  "submitPrompt",
  "runPromptShellCommand",
  "loadWorkspaceCommands",
];

type OriginalMethod = { exists: boolean; value: AppMethods[AppMethodName] };

export { createChatSurface, createComposerSurface, pluginStyleText };

export function activate(context: PluginContext): Cleanup {
  const app: AppElement = context.app;
  const state: PluginState = createState(context);
  const style: HTMLStyleElement = installStyles();
  const cleanupChat: Cleanup = context.mount.chat(createChatSurface(), { replace: true });
  const cleanupComposer: Cleanup = context.mount.composer(createComposerSurface(), { replace: true });
  const restoreMethods: Cleanup = patchAppMethods(app, state);
  const badge: HTMLSpanElement = installBadge(app);
  app.classList.add(PLUGIN_CLASS);
  void refreshPluginCommands(app, state);

  return (): void => {
    restoreMethods();
    badge.remove();
    cleanupComposer();
    cleanupChat();
    style.remove();
    app.classList.remove(PLUGIN_CLASS);
  };
}

export default activate;

export function createState(context: PluginContext): PluginState {
  return { context, commands: [], commandMap: new Map(), fileSearchToken: 0, selectedRefs: new Set() };
}

export async function backendCall(state: PluginState, method: string, data: JsonRecord = {}): Promise<BackendResponse> {
  const workspaceId: string = state.context.session?.activeWorkspaceId?.() || state.context.app.dataset.activeWorkspaceId || "";
  const response: unknown = await state.context.backend(method, { workspaceId, data });
  return isRecord(response) ? response : {};
}

export function commandName(command: PluginCommand): string {
  return command.command || command.cmd || (command.name ? `/${command.name}` : "");
}

export function mergeCommands(coreCommands: PluginCommand[] = [], pluginCommands: PluginCommand[] = []): PluginCommand[] {
  const out: PluginCommand[] = [];
  const seen: Set<string> = new Set();

  for (const command of [...coreCommands, ...pluginCommands]) {
    const name: string = commandName(command);

    if (!name || seen.has(name)) {
      continue;
    }

    seen.add(name);
    out.push(command);
  }

  return out;
}

export function extractRefs(text: unknown): string[] {
  const refs: string[] = [];
  const seen: Set<string> = new Set();
  const pattern: RegExp = /(^|[\s`])@([^\s@`]+)/g;
  let match: RegExpExecArray | null = pattern.exec(String(text || ""));

  while (match !== null) {
    const ref: string = match[2] || "";

    if ((match[1] || "") !== "`" && ref && !seen.has(ref)) {
      seen.add(ref);
      refs.push(ref);
    }

    match = pattern.exec(String(text || ""));
  }

  return refs;
}

function patchAppMethods(app: AppElement, state: PluginState): Cleanup {
  const originals: Map<AppMethodName, OriginalMethod> = snapshotMethods(app);

  app.renderSlashCommands = function renderSlashCommandsWithPlugin(
    this: AppElement,
    commands: PluginCommand[] = [],
    diagnostics: unknown[] = [],
  ): unknown {
    return getOriginal(originals, "renderSlashCommands")?.call(this, mergeCommands(commands, state.commands), diagnostics);
  };
  app.pickSlash = function pickSlashWithPlugin(this: AppElement, command: string): unknown {
    const pluginCommand: PluginCommand | undefined = state.commandMap.get(command);

    if (pluginCommand?.template) {
      state.context.composer?.setPrompt?.(pluginCommand.template);
      this.slashPopover?.setAttribute("hidden", "");
      return undefined;
    }

    return getOriginal(originals, "pickSlash")?.call(this, command);
  };
  app.loadWorkspaceCommands = async function loadWorkspaceCommandsWithPlugin(
    this: AppElement,
    workspaceId: string,
    options: JsonRecord = {},
  ): Promise<unknown> {
    await refreshPluginCommands(this, state);
    return getOriginal(originals, "loadWorkspaceCommands")?.call(this, workspaceId, options);
  };
  app.updatePromptFileRefs = function updatePromptFileRefsWithBackend(this: AppElement, value: string = this.prompt?.value || ""): void {
    updatePromptFileRefs(this, state, originals, value);
  };
  app.pickPromptFileRef = function pickPromptFileRefWithTracking(this: AppElement, path?: string): unknown {
    if (path) {
      state.selectedRefs.add(path);
    }

    return getOriginal(originals, "pickPromptFileRef")?.call(this, path);
  };
  app.submitPrompt = async function submitPromptWithResolvedRefs(this: AppElement): Promise<unknown> {
    await attachReferencedFiles(this, state);
    return getOriginal(originals, "submitPrompt")?.call(this);
  };
  app.runPromptShellCommand = async function runPromptShellCommandWithBackend(
    this: AppElement,
    command: string,
    hooks: ShellHooks = {},
  ): Promise<void> {
    await runBackendShell(this, state, command, hooks);
  };

  return (): void => restoreAppMethods(app, originals);
}

function snapshotMethods(app: AppElement): Map<AppMethodName, OriginalMethod> {
  return new Map(PATCHED_METHODS.map((name: AppMethodName) => [name, { exists: name in app, value: app[name] }]));
}

function getOriginal<Name extends AppMethodName>(originals: Map<AppMethodName, OriginalMethod>, name: Name): AppMethods[Name] {
  return originals.get(name)?.value as AppMethods[Name];
}

function restoreAppMethods(app: AppElement, originals: Map<AppMethodName, OriginalMethod>): void {
  restoreMethod(app, originals, "renderSlashCommands");
  restoreMethod(app, originals, "pickSlash");
  restoreMethod(app, originals, "updatePromptFileRefs");
  restoreMethod(app, originals, "pickPromptFileRef");
  restoreMethod(app, originals, "submitPrompt");
  restoreMethod(app, originals, "runPromptShellCommand");
  restoreMethod(app, originals, "loadWorkspaceCommands");
}

function restoreMethod<Name extends AppMethodName>(app: AppElement, originals: Map<AppMethodName, OriginalMethod>, name: Name): void {
  const original: OriginalMethod | undefined = originals.get(name);

  if (original?.exists) {
    setMethod(app, name, original.value as AppMethods[Name]);
    return;
  }

  delete app[name];
}

function setMethod<Name extends AppMethodName>(app: AppElement, name: Name, value: AppMethods[Name]): void {
  Object.assign(app, { [name]: value });
}

function updatePromptFileRefs(app: AppElement, state: PluginState, originals: Map<AppMethodName, OriginalMethod>, value: string): void {
  const ref = app.currentPromptFileRef?.(value);

  if (!ref?.query) {
    app.hidePromptFileRefs?.();
    return;
  }

  const token: number = ++state.fileSearchToken;
  void backendCall(state, "searchFiles", { query: ref.query, limit: FILE_REF_LIMIT })
    .then((response: BackendResponse): void => {
      const files: JsonRecord[] = Array.isArray(response.files) ? response.files.filter(isRecord) : [];

      if (token !== state.fileSearchToken || !files.length) {
        app.hidePromptFileRefs?.();
        return;
      }

      app.renderPromptFileRefs?.(files);
    })
    .catch((): unknown => getOriginal(originals, "updatePromptFileRefs")?.call(app, value));
}

async function refreshPluginCommands(app: AppElement, state: PluginState): Promise<void> {
  try {
    const response: BackendResponse = await backendCall(state, "commands", {});
    state.commands = Array.isArray(response.commands) ? response.commands.filter(isPluginCommand) : [];
    state.commandMap = new Map(state.commands.map((command: PluginCommand) => [commandName(command), command]));

    if (app.querySelector(".slash-list")) {
      app.renderSlashCommands?.([], []);
    }
  } catch (error: unknown) {
    console.warn("pi-web-chat commands unavailable", error);
  }
}

async function attachReferencedFiles(app: AppElement, state: PluginState): Promise<void> {
  if (!app.prompt || app.promptShellMode) {
    return;
  }

  const text: string = state.context.composer?.getPrompt?.() || app.prompt.value || "";
  const refs: string[] = [...new Set([...state.selectedRefs, ...extractRefs(text)])];

  if (!refs.length) {
    return;
  }

  try {
    const response: BackendResponse = await backendCall(state, "resolveContext", { text, refs });
    const attachments: FileAttachment[] = Array.isArray(response.attachments) ? response.attachments.filter(isFileAttachment) : [];

    for (const file of attachments) {
      app.attachmentContents ??= [];
      app.attachmentContents.push(file);
      app.addAttachmentChip?.(file.name || file.path, file.size || file.content?.length || 0, null, "");
    }

    if (attachments.length && app.attachments) {
      app.attachments.hidden = !app.attachments.children.length;
      app.updatePrompt?.();
    }
  } catch (error: unknown) {
    state.context.chat?.appendMessage?.({ kind: "banner", text: `@ context failed: ${errorText(error)}` });
  } finally {
    state.selectedRefs.clear();
  }
}

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null;
}

function isPluginCommand(value: unknown): value is PluginCommand {
  return isRecord(value);
}

function isFileAttachment(value: unknown): value is FileAttachment {
  return isRecord(value);
}

function errorText(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
