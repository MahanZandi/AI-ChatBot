"use client";

import { useChatStore } from "@/features/chat/store/useChatStore";
import { useLanguageStore } from "@/features/language/store/useLanguageStore";
import { translations } from "@/features/language/translations";
import CompactModelSelector from "./CompactModelSelector";

export default function ChatInput() {
  const { input, setInput, sendMessage, isTyping, selectedModel, setSelectedModel } = useChatStore();
  const { language } = useLanguageStore();
  const t = translations[language];

  return (
    <form
      className="flex flex-col w-full gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur"
      onSubmit={(event) => {
        event.preventDefault();
        void sendMessage();
      }}
    >
      <textarea
        rows={1}
        className="flex-1 resize-none bg-transparent text-sm text-white outline-none placeholder:text-slate-400"
        placeholder={t.inputPlaceholder}
        value={input}
        onChange={(event) => setInput(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            void sendMessage();
          }
        }}
        disabled={isTyping}
      />
      <div className="flex flex-row-reverse justify-end items-center gap-2">
        <CompactModelSelector
          selectedModel={selectedModel}
          onModelChange={setSelectedModel}
        />
        <button
          type="submit"
          className="flex items-center gap-2 rounded-full bg-midnight-500 shrink-0 px-4 py-2 text-sm font-semibold text-white transition hover:bg-midnight-400 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isTyping || !input.trim()}
        >
          <span>{t.send}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M7.39999 6.32003L15.89 3.49003C19.7 2.22003 21.77 4.30003 20.51 8.11003L17.68 16.6C15.78 22.31 12.66 22.31 10.76 16.6L9.91999 14.08L7.39999 13.24C1.68999 11.34 1.68999 8.23003 7.39999 6.32003Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M10.11 13.6501L13.69 10.0601" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
        </button>
      </div>
    </form>
  );
}
