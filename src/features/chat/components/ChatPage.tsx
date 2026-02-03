"use client";

import ChatInput from "@/features/chat/components/ChatInput";
import ChatMessage from "@/features/chat/components/ChatMessage";
import TypingIndicator from "@/features/chat/components/TypingIndicator";
import WelcomeScreen from "@/features/chat/components/WelcomeScreen";
import { useChatStore } from "@/features/chat/store/useChatStore";

export default function ChatPage() {
  const { messages, isTyping, error, clearChat } = useChatStore();
  
  const userMessages = messages.filter((message) => message.role !== "system");
  const hasMessages = userMessages.length > 0;

  return (
    <div className="relative min-h-screen">
      <div className="mx-auto flex h-screen max-w-4xl flex-col gap-6 px-4 py-10">
        <header className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-midnight-300">
                MVP Chatbot
              </p>
              <h1 className="font-display text-3xl font-semibold text-white">
                Launch your assistant fast
              </h1>
            </div>
            <button
              type="button"
              className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/80 transition hover:border-midnight-400 hover:text-white"
              onClick={clearChat}
            >
              Reset
            </button>
          </div>
          <p className="max-w-2xl text-sm text-slate-300">
            This is a clean MVP chat interface wired to a local OpenAI-compatible
            backend. Messages stay on your machine.
          </p>
        </header>

        <section className="flex flex-1 flex-col gap-4 rounded-3xl border border-white/10 bg-black/40 p-6 shadow-xl backdrop-blur overflow-hidden">
          <div className="flex flex-1 flex-col gap-4 overflow-y-auto pr-1 min-h-0">
            {hasMessages ? (
              userMessages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))
            ) : (
              <WelcomeScreen />
            )}
            {isTyping ? <TypingIndicator /> : null}
          </div>
          {error ? (
            <div className="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-2 text-xs text-red-200">
              {error}
            </div>
          ) : null}
          <ChatInput />
        </section>
      </div>
    </div>
  );
}
