"use client";

import { useChatStore } from "@/features/chat/store/useChatStore";
import CompactModelSelector from "./CompactModelSelector";

export default function ChatInput() {
  const { input, setInput, sendMessage, isTyping, selectedModel, setSelectedModel } = useChatStore();

  return (
    <form
      className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur"
      onSubmit={(event) => {
        event.preventDefault();
        void sendMessage();
      }}
    >
      <textarea
        rows={1}
        className="flex-1 resize-none bg-transparent text-sm text-white outline-none placeholder:text-slate-400"
        placeholder="Ask me anything..."
        value={input}
        onChange={(event) => setInput(event.target.value)}
        disabled={isTyping}
      />
      <div className="flex items-center gap-2">
        <CompactModelSelector 
          selectedModel={selectedModel}
          onModelChange={setSelectedModel}
        />
        <button
          type="submit"
          className="rounded-full bg-midnight-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-midnight-400 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isTyping || !input.trim()}
        >
          Send
        </button>
      </div>
    </form>
  );
}
