import type { ChatEvent, ChatMessage, FileAttachment, JsonRecord } from "./types";

export type AgUiLikeRunInput = {
  threadId: string;
  runId: string;
  state: JsonRecord;
  messages: ChatMessage[];
  tools: JsonRecord[];
  context: JsonRecord[];
};

export type AgUiLikeEvent = {
  type: string;
  threadId: string;
  runId: string;
  messageId?: string;
  toolCallId?: string;
  delta?: string;
  payload?: JsonRecord;
};

export function createAgUiLikeRunInput(sessionId: string, runId: string, messages: ChatMessage[]): AgUiLikeRunInput {
  return { threadId: sessionId, runId, state: {}, messages, tools: [], context: [] };
}

export function promptFromAgUiLikeRunInput(input: AgUiLikeRunInput): { text: string; attachments: FileAttachment[]; sessionId: string } {
  const lastUser = [...input.messages].reverse().find((message) => message.role === "user");
  return { text: lastUser?.text || "", attachments: lastUser?.attachments || [], sessionId: input.threadId };
}

export function chatEventsToAgUiLikeEvents(events: ChatEvent[], threadId: string, runId: string): AgUiLikeEvent[] {
  return events.map((event) => toAgUiLikeEvent(event, threadId, runId));
}

function toAgUiLikeEvent(event: ChatEvent, threadId: string, runId: string): AgUiLikeEvent {
  if (event.type === "text.delta") {
    return { type: "TEXT_MESSAGE_CONTENT", threadId, runId, delta: event.delta || "" };
  }

  if (event.type === "thinking.delta") {
    return { type: "THINKING_MESSAGE_CONTENT", threadId, runId, delta: event.delta || "" };
  }

  if (event.type === "tool.start") {
    return { type: "TOOL_CALL_START", threadId, runId, toolCallId: event.toolCallId, payload: toolPayload(event) };
  }

  if (event.type === "tool.delta") {
    return { type: "TOOL_CALL_ARGS", threadId, runId, toolCallId: event.toolCallId, delta: event.delta || "" };
  }

  if (event.type === "tool.end") {
    return { type: "TOOL_CALL_END", threadId, runId, toolCallId: event.toolCallId, payload: toolPayload(event) };
  }

  return { type: event.type.toUpperCase().replaceAll(".", "_"), threadId, runId, payload: event as JsonRecord };
}

function toolPayload(event: ChatEvent): JsonRecord {
  return { name: event.toolName || "tool", args: event.args || {}, result: event.result || "", isError: event.isError === true };
}
