import type { AppElement, BackendResponse, PluginState, ShellHooks } from "./types";
import { backendCall } from "./index";

export async function runBackendShell(app: AppElement, state: PluginState, command: string, hooks: ShellHooks = {}): Promise<void> {
  const workspaceId: string | undefined = state.context.session?.activeWorkspaceId?.() || app.dataset.activeWorkspaceId;

  if (!command || !workspaceId || !app.apiConnected) {
    return;
  }

  hooks.onStart?.();
  app.showSessionMain?.();
  state.context.chat?.finalizeStreamingMessages?.();
  state.context.chat?.appendMessage?.({ kind: "tool", tool: "shell", args: `$ ${command}`, status: "running", collapsedByDefault: false });

  try {
    const result: BackendResponse = await backendCall(state, "runShell", { command });
    const exitCode: number = typeof result.exitCode === "number" ? result.exitCode : 1;
    app.finishTool?.({
      kind: "tool",
      tool: "shell",
      args: `$ ${command}`,
      status: exitCode === 0 ? "ok" : "err",
      durationMs: typeof result.durationMs === "number" ? result.durationMs : undefined,
      resultMeta: exitCode === 0 ? (result.truncated ? "done · truncated" : "done") : `exit ${exitCode}`,
      body: typeof result.output === "string" ? result.output : "[no output]",
    });
    hooks.onSuccess?.();
    void app.loadRuntimeStatus?.(workspaceId);
    void app.loadWorkspaceMeta?.(workspaceId);
  } catch (error: unknown) {
    app.finishTool?.({ kind: "tool", tool: "shell", args: `$ ${command}`, status: "err", resultMeta: errorText(error), body: "" });
    app.setConnection?.("err");
  } finally {
    hooks.onFinish?.();
  }
}

function errorText(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
