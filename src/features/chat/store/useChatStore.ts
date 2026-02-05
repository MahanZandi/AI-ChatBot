"use client";

import { create } from "zustand";
import type { ChatMessage } from "@/features/chat/types/chat";
import { storage } from "@/core/storage/localStorage";

const initialMessages: ChatMessage[] = [
  {
    id: "system-1",
    role: "system",
    content: "You are a helpful, concise assistant.",
    createdAt: Date.now()
  }
];

type ChatState = {
  messages: ChatMessage[];
  input: string;
  isTyping: boolean;
  error: string | null;
  selectedModel: string;
  setInput: (value: string) => void;
  setSelectedModel: (model: string) => void;
  sendMessage: () => Promise<void>;
  clearChat: () => void;
};

const createId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `msg-${Date.now()}-${Math.random().toString(16).slice(2)}`;

export const useChatStore = create<ChatState>((set, get) => ({
  messages: storage.get<ChatMessage[]>('chat-messages') || initialMessages,
  input: "",
  isTyping: false,
  error: null,
  selectedModel: storage.get<string>('chat-model') || "qwen2.5:0.5b",
  setInput: (value) => set({ input: value }),
  setSelectedModel: (model) => {
    storage.set('chat-model', model);
    set({ selectedModel: model });
  },
  clearChat: () => {
    storage.set('chat-messages', initialMessages);
    set({ messages: initialMessages, error: null });
  },
  sendMessage: async () => {
    const { input, messages, isTyping, selectedModel } = get();
    if (!input.trim() || isTyping) {
      return;
    }

    const userMessage: ChatMessage = {
      id: createId(),
      role: "user",
      content: input.trim(),
      createdAt: Date.now()
    };

    const updatedMessages = [...messages, userMessage];
    storage.set('chat-messages', updatedMessages);

    set({
      messages: updatedMessages,
      input: "",
      isTyping: true,
      error: null
    });

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((message) => ({
            role: message.role,
            content: message.content
          })),
          model: selectedModel
        })
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response from server.");
      }

      const data = (await response.json()) as { message: string };

      const assistantMessage: ChatMessage = {
        id: createId(),
        role: "assistant",
        content: data.message,
        createdAt: Date.now()
      };

      const finalMessages = [...get().messages, assistantMessage];
      storage.set('chat-messages', finalMessages);

      set({
        messages: finalMessages,
        isTyping: false
      });
    } catch (error) {
      set({
        isTyping: false,
        error: error instanceof Error ? error.message : "Something went wrong."
      });
    }
  }
}));