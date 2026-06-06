import type { AsyncSubject, BehaviorSubject, ReplaySubject, Subject, Subscription } from "rxjs";

export type JsonRecord = Record<string, unknown>;
export type Cleanup = () => void;

export type BackendRequest = {
  workspaceId?: string;
  data?: JsonRecord;
};

export type BackendCall = (method: string, input?: BackendRequest) => Promise<unknown>;
export type SidebarSnapshot = { activeWorkspaceId?: string };
export type SidebarApi = { getSnapshot?: () => SidebarSnapshot };

export type PluginAppElement = HTMLElement & {
  piWebSidebar?: SidebarApi;
};

export type PluginContext = {
  app?: PluginAppElement;
  backend?: BackendCall;
  session?: { activeWorkspaceId?: () => string };
};

export type PiWebSubjects = {
  readonly version: string;
  subject<T>(name: string): Subject<T>;
  behaviorSubject<T>(name: string, initialValue: T): BehaviorSubject<T>;
  replaySubject<T>(name: string, bufferSize?: number): ReplaySubject<T>;
  asyncSubject<T>(name: string): AsyncSubject<T>;
  hasSubject(name: string): boolean;
  deleteSubject(name: string): boolean;
  completeSubject(name: string): void;
  listSubjects(): string[];
};

declare global {
  const piWeb: PiWebSubjects | undefined;
}

export type ChatInputSubmitted = {
  text: string;
  attachments: FileAttachment[];
};

export type ToastRequest = {
  level?: "info" | "success" | "warning" | "error";
  message: string;
};

export type PluginCommand = {
  command?: string;
  cmd?: string;
  name?: string;
  description?: string;
  template?: string;
};

export type FileSearchResult = {
  path?: string;
  name?: string;
  size?: number;
};

export type FileAttachment = {
  name?: string;
  path?: string;
  size?: number;
  content?: string;
  mimeType?: string;
};

export type BackendResponse = {
  commands?: PluginCommand[];
  files?: FileSearchResult[];
  attachments?: FileAttachment[];
  errors?: unknown[];
  exitCode?: number;
  durationMs?: number;
  output?: string;
  truncated?: boolean;
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant" | "tool" | "system";
  text: string;
  createdAt: number;
  attachments?: FileAttachment[];
  meta?: JsonRecord;
};

export type ChatSession = {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  messages: ChatMessage[];
};

export type ChatStore = {
  activeSessionId: string;
  sessions: ChatSession[];
};

export type Runtime = {
  dispose(): void;
};

export type Disposer = Cleanup | Subscription | { unsubscribe(): void } | { remove(): void };
