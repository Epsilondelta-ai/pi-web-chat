export type JsonRecord = Record<string, unknown>;
export type PluginCommand = { command?: string; cmd?: string; name?: string; template?: string };
export type FileAttachment = { name?: string; path?: string; size?: number; content?: string; mimeType?: string };
export type BackendResponse = {
  commands?: PluginCommand[];
  files?: JsonRecord[];
  attachments?: FileAttachment[];
  exitCode?: number;
  durationMs?: number;
  output?: string;
  truncated?: boolean;
};
export type BackendCall = (method: string, input: { workspaceId?: string; data?: JsonRecord }) => Promise<unknown>;
export type Cleanup = () => void;
export type SidebarSnapshot = { activeWorkspaceId?: string };
export type SidebarApi = { getSnapshot?: () => SidebarSnapshot };
export type PluginContext = {
  app: AppElement;
  backend: BackendCall;
  mount: { chat(element: HTMLElement, options?: { replace?: boolean }): Cleanup; composer(element: HTMLElement, options?: { replace?: boolean }): Cleanup };
  composer?: { getPrompt?: () => string; setPrompt?: (value: string) => void };
  chat?: { appendMessage?: (message: JsonRecord) => void; finalizeStreamingMessages?: () => void };
  session?: { activeWorkspaceId?: () => string };
};
export type PromptFileRef = { query?: string };
export type ShellHooks = { onStart?: () => void; onSuccess?: () => void; onFinish?: () => void };
export type AppMethodName =
  | "renderSlashCommands"
  | "pickSlash"
  | "updatePromptFileRefs"
  | "pickPromptFileRef"
  | "submitPrompt"
  | "runPromptShellCommand"
  | "loadWorkspaceCommands";
export type AppMethods = {
  renderSlashCommands?: (this: AppElement, commands?: PluginCommand[], diagnostics?: unknown[]) => unknown;
  pickSlash?: (this: AppElement, command: string) => unknown;
  updatePromptFileRefs?: (this: AppElement, value?: string) => unknown;
  pickPromptFileRef?: (this: AppElement, path?: string) => unknown;
  submitPrompt?: (this: AppElement) => Promise<unknown> | unknown;
  runPromptShellCommand?: (this: AppElement, command: string, hooks?: ShellHooks) => Promise<void> | void;
  loadWorkspaceCommands?: (this: AppElement, workspaceId: string, options?: JsonRecord) => Promise<unknown> | unknown;
};
export type ToolMessage = {
  kind: "tool";
  tool: "shell";
  args: string;
  status: "running" | "ok" | "err";
  collapsedByDefault?: boolean;
  durationMs?: number;
  resultMeta?: string;
  body?: string;
};
export type AppElement = HTMLElement & AppMethods & {
  apiConnected?: boolean;
  piWebSidebar?: SidebarApi;
  attachmentContents?: FileAttachment[];
  attachments?: HTMLElement;
  currentPromptFileRef?: (value: string) => PromptFileRef | undefined;
  prompt?: HTMLTextAreaElement;
  promptShellMode?: boolean;
  slashPopover?: HTMLElement;
  addAttachmentChip?: (name: string | undefined, size: number, data: null, source: string) => void;
  finishTool?: (message: ToolMessage) => void;
  hidePromptFileRefs?: () => void;
  loadRuntimeStatus?: (workspaceId: string) => Promise<unknown> | unknown;
  loadWorkspaceMeta?: (workspaceId: string) => Promise<unknown> | unknown;
  renderPromptFileRefs?: (files: JsonRecord[]) => void;
  setConnection?: (state: "err") => void;
  showSessionMain?: () => void;
  updatePrompt?: () => void;
};
export type PluginState = {
  context: PluginContext;
  commands: PluginCommand[];
  commandMap: Map<string, PluginCommand>;
  fileSearchToken: number;
  selectedRefs: Set<string>;
};
