const PLUGIN_CLASS = "pi-web-chat-enhanced";
const FILE_REF_LIMIT = 12;

export function activate(context) {
  const app = context.app;
  const state = createState(context);
  const style = installStyles(context);
  const badge = installBadge(app);
  const restoreMethods = patchAppMethods(app, state);
  app.classList.add(PLUGIN_CLASS);
  void refreshPluginCommands(app, state);

  return () => {
    restoreMethods();
    badge.remove();
    style.remove();
    app.classList.remove(PLUGIN_CLASS);
  };
}

export default activate;

export function createState(context) {
  return {
    context,
    commands: [],
    commandMap: new Map(),
    fileSearchToken: 0,
    selectedRefs: new Set(),
  };
}

export function backendCall(state, method, data = {}) {
  const workspaceId = state.context.app.dataset.activeWorkspaceId || "";
  return state.context.backend(method, { workspaceId, data });
}

export function commandName(command) {
  return command.command || command.cmd || (command.name ? `/${command.name}` : "");
}

export function mergeCommands(coreCommands = [], pluginCommands = []) {
  const out = [];
  const seen = new Set();
  for (const command of [...coreCommands, ...pluginCommands]) {
    const name = commandName(command);
    if (!name || seen.has(name)) continue;
    seen.add(name);
    out.push(command);
  }
  return out;
}

export function extractRefs(text) {
  const refs = [];
  const seen = new Set();
  const pattern = /(^|[\s`])@([^\s@`]+)/g;
  let match;
  while ((match = pattern.exec(String(text || ""))) !== null) {
    if ((match[1] || "") === "`") continue;
    if (seen.has(match[2])) continue;
    seen.add(match[2]);
    refs.push(match[2]);
  }
  return refs;
}

function patchAppMethods(app, state) {
  const proto = Object.getPrototypeOf(app);
  const originals = {
    renderSlashCommands: app.renderSlashCommands,
    pickSlash: app.pickSlash,
    updatePromptFileRefs: app.updatePromptFileRefs,
    pickPromptFileRef: app.pickPromptFileRef,
    submitPrompt: app.submitPrompt,
    runPromptShellCommand: app.runPromptShellCommand,
    loadWorkspaceCommands: app.loadWorkspaceCommands,
  };

  app.renderSlashCommands = function renderSlashCommandsWithPlugin(commands = [], diagnostics = []) {
    const merged = mergeCommands(commands, state.commands);
    return originals.renderSlashCommands?.call(this, merged, diagnostics);
  };

  app.pickSlash = function pickSlashWithPlugin(command) {
    const pluginCommand = state.commandMap.get(command);
    if (pluginCommand?.template) {
      this.fillPrompt?.(pluginCommand.template);
      this.slashPopover?.setAttribute("hidden", "");
      return;
    }
    return originals.pickSlash?.call(this, command);
  };

  app.loadWorkspaceCommands = async function loadWorkspaceCommandsWithPlugin(workspaceId, options = {}) {
    await refreshPluginCommands(this, state);
    return originals.loadWorkspaceCommands?.call(this, workspaceId, options);
  };

  app.updatePromptFileRefs = function updatePromptFileRefsWithBackend(value = this.prompt?.value || "") {
    const ref = this.currentPromptFileRef?.(value);
    if (!ref || !ref.query) {
      this.hidePromptFileRefs?.();
      return;
    }
    const token = ++state.fileSearchToken;
    void backendCall(state, "searchFiles", { query: ref.query, limit: FILE_REF_LIMIT })
      .then((response) => {
        if (token !== state.fileSearchToken) return;
        const files = Array.isArray(response?.files) ? response.files : [];
        if (!files.length) {
          this.hidePromptFileRefs?.();
          return;
        }
        this.renderPromptFileRefs?.(files);
      })
      .catch(() => originals.updatePromptFileRefs?.call(this, value));
  };

  app.pickPromptFileRef = function pickPromptFileRefWithTracking(path) {
    if (path) state.selectedRefs.add(path);
    return originals.pickPromptFileRef?.call(this, path);
  };

  app.submitPrompt = async function submitPromptWithResolvedRefs() {
    await attachReferencedFiles(this, state);
    return originals.submitPrompt?.call(this);
  };

  app.runPromptShellCommand = async function runPromptShellCommandWithBackend(command, hooks = {}) {
    return runBackendShell(this, state, command, hooks);
  };

  return () => {
    for (const [name, fn] of Object.entries(originals)) {
      if (fn) app[name] = fn;
      else delete app[name];
    }
    Object.setPrototypeOf(app, proto);
  };
}

async function refreshPluginCommands(app, state) {
  try {
    const response = await backendCall(state, "commands", {});
    state.commands = Array.isArray(response?.commands) ? response.commands : [];
    state.commandMap = new Map(state.commands.map((command) => [commandName(command), command]));
    const list = app.querySelector(".slash-list");
    if (list) app.renderSlashCommands?.([], []);
  } catch (error) {
    console.warn("pi-web-chat commands unavailable", error);
  }
}

async function attachReferencedFiles(app, state) {
  if (!app.prompt || app.promptShellMode) return;
  const text = app.prompt.value || "";
  const refs = [...new Set([...state.selectedRefs, ...extractRefs(text)])];
  if (!refs.length) return;
  try {
    const response = await backendCall(state, "resolveContext", { text, refs });
    const attachments = Array.isArray(response?.attachments) ? response.attachments : [];
    if (!attachments.length) return;
    app.attachmentContents ??= [];
    for (const file of attachments) {
      app.attachmentContents.push(file);
      app.addAttachmentChip?.(file.name || file.path, file.size || file.content?.length || 0, null, "");
    }
    if (app.attachments) app.attachments.hidden = !app.attachments.children.length;
    app.updatePrompt?.();
  } catch (error) {
    app.appendMessage?.({ kind: "banner", text: `@ context failed: ${error instanceof Error ? error.message : String(error)}` });
  } finally {
    state.selectedRefs.clear();
  }
}

async function runBackendShell(app, state, command, hooks = {}) {
  const workspaceId = app.dataset.activeWorkspaceId;
  if (!command || !workspaceId || !app.apiConnected) return;
  hooks.onStart?.();
  app.showSessionMain?.();
  app.finalizeStreamingMessages?.();
  app.appendMessage?.({
    kind: "tool",
    tool: "shell",
    args: `$ ${command}`,
    status: "running",
    collapsedByDefault: false,
  });
  try {
    const result = await backendCall(state, "runShell", { command });
    app.finishTool?.({
      kind: "tool",
      tool: "shell",
      args: `$ ${command}`,
      status: result.exitCode === 0 ? "ok" : "err",
      durationMs: result.durationMs,
      resultMeta: result.exitCode === 0 ? (result.truncated ? "done · truncated" : "done") : `exit ${result.exitCode}`,
      body: result.output || "[no output]",
    });
    hooks.onSuccess?.();
    void app.loadRuntimeStatus?.(workspaceId);
    void app.loadWorkspaceMeta?.(workspaceId);
  } catch (error) {
    app.finishTool?.({
      kind: "tool",
      tool: "shell",
      args: `$ ${command}`,
      status: "err",
      resultMeta: error instanceof Error ? error.message : String(error),
      body: "",
    });
    app.setConnection?.("err");
  } finally {
    hooks.onFinish?.();
  }
}

function installBadge(app) {
  const meta = app.querySelector("[data-prompt-meta]");
  const badge = document.createElement("span");
  badge.className = "prompt-meta-item pi-web-chat-badge";
  badge.textContent = "chat plugin · ! / @";
  meta?.append(badge);
  return badge;
}

function installStyles(context) {
  const style = document.createElement("style");
  style.textContent = `
    .pi-web-chat-badge { color: var(--muted, #8a8f98); }
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
  document.head.append(style);
  return style;
}
