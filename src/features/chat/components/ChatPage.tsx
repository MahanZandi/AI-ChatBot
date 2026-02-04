"use client";

import ChatInput from "@/features/chat/components/ChatInput";
import ChatMessage from "@/features/chat/components/ChatMessage";
import TypingIndicator from "@/features/chat/components/TypingIndicator";
import WelcomeScreen from "@/features/chat/components/WelcomeScreen";
import { useChatStore } from "@/features/chat/store/useChatStore";
import LanguageSelector from "@/features/i18n/components/LanguageSelector";
import { useLanguageStore } from "@/features/i18n/store/useLanguageStore";
import { translations } from "@/features/i18n/translations";
import { useEffect } from "react";

export default function ChatPage() {
  const { messages, isTyping, error, clearChat } = useChatStore();
  const { language } = useLanguageStore();
  const t = translations[language];
  
  useEffect(() => {
    document.body.dir = language === "fa" ? "rtl" : "ltr";
  }, [language]);
  
  const userMessages = messages.filter((message) => message.role !== "system");
  const hasMessages = userMessages.length > 0;

  return (
    <div className={`relative min-h-screen ${language === "fa" ? "font-persian" : ""}`} dir={language === "fa" ? "rtl" : "ltr"}>
      <div className="mx-auto flex h-screen max-w-4xl flex-col gap-6 px-4 py-10">
        <header className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <div className="flex items-center justify-between gap-3">
            <div className={language === "fa" ? "text-right" : ""}>
              <p className="text-xs uppercase tracking-[0.3em] text-midnight-300">
                {t.title}
              </p>
              <h1 className="text-3xl font-semibold text-white">
                {t.subtitle}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <LanguageSelector />
              <button
                type="button"
                className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/80 transition hover:border-midnight-400 hover:text-white"
                onClick={clearChat}
              >
                {t.reset}
              </button>
            </div>
          </div>
          <p className={`max-w-2xl text-sm text-slate-300 ${language === "fa" ? "text-right" : ""}`}>
            {t.description}
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
