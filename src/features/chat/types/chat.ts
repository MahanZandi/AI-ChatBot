export type ChatRole = "system" | "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: number;
};

export type ChatCompletionPayload = {
  messages: Array<Pick<ChatMessage, "role" | "content">>;
};
