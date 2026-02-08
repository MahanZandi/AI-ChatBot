"use client";

import ChatInput from "@/features/chat/components/ChatInput";
import ChatMessage from "@/features/chat/components/ChatMessage";
import TypingIndicator from "@/features/chat/components/TypingIndicator";
import WelcomeScreen from "@/features/chat/components/WelcomeScreen";
import { useChatStore } from "@/features/chat/store/useChatStore";
import LanguageSelector from "@/features/language/components/LanguageSelector";
import { useLanguageStore } from "@/features/language/store/useLanguageStore";
import { translations } from "@/features/language/translations";
import { useEffect, useState } from "react";

export default function ChatPage() {
  const { messages, isTyping, error, clearChat } = useChatStore();
  const { language } = useLanguageStore();
  const t = translations[language];
  const [showInfo, setShowInfo] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const [animatingMessageId, setAnimatingMessageId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.dir = language === "fa" ? "rtl" : "ltr";
  }, [language]);

  useEffect(() => {
    if (!mounted) return;
    const userMessages = messages.filter((message) => message.role !== "system");
    const lastMessage = userMessages[userMessages.length - 1];
    if (lastMessage?.role === 'assistant' && isTyping === false) {
      setAnimatingMessageId(lastMessage.id);
    }
  }, [messages, isTyping, mounted]);

  const handleClearChat = () => {
    clearChat();
    setShowClearModal(false);
  };

  const userMessages = messages.filter((message) => message.role !== "system");
  const hasMessages = userMessages.length > 0;

  if (!mounted) {
    return null;
  }

  return (
    <div className={`relative min-h-screen ${language === "fa" ? "font-persian" : ""}`} dir={language === "fa" ? "rtl" : "ltr"}>
      <div className="mx-auto flex h-screen md:max-w-4xl flex-col  gap-6 md:px-4 md:py-10">
        {/* Mobile Header */}
        <header className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between gap-2 bg-black/60 px-4 py-3 backdrop-blur">
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="rounded-full border border-white/10 p-2 text-white/80 transition hover:border-midnight-400 hover:text-white"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <button
              type="button"
              className="rounded-full flex items-center gap-2 border border-white/10 px-3 py-2 text-xs text-white/80 transition hover:border-midnight-400 hover:text-white"
              onClick={() => setShowClearModal(true)}
            >
              <span>{t.reset}</span>

              <svg className="size-[18px]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <g clipPath="url(#clip0_4418_9808)">
                  <path d="M21 5.98047C17.67 5.65047 14.32 5.48047 10.98 5.48047C9 5.48047 7.02 5.58047 5.04 5.78047L3 5.98047" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M18.85 9.14062L18.2 19.2106C18.09 20.7806 18 22.0006 15.21 22.0006H8.79002C6.00002 22.0006 5.91002 20.7806 5.80002 19.2106L5.15002 9.14062" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10.33 16.5H13.66" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9.5 12.5H14.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <defs>
                  <clipPath id="clip0_4418_9808">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
        </header>

        {/* Mobile Info Modal */}
        {showInfo && (
          <div className="md:hidden fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur p-4" onClick={() => setShowInfo(false)}>
            <div className="bg-[#080813] border border-white/10 rounded-3xl p-6 max-w-md" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">{t.subtitle}</h2>
                <button onClick={() => setShowInfo(false)} className="text-white/60 hover:text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className={`text-sm text-slate-300 ${language === "fa" ? "text-right" : ""}`}>
                {language === "en" ? (
                  <>
                    AI chatbot powered by Ollama API running locally on your system. New to Ollama? Visit{" "}
                    <a href="https://ollama.com" target="_blank" rel="noopener noreferrer" className="text-midnight-300 hover:text-midnight-200 underline">
                      ollama.com
                    </a>{" "}
                    to get started.
                    <br /><br />
                    <strong className="text-white">Recommended Models:</strong>
                    <br />
                    • <code className="text-midnight-300">qwen2.5:0.5b</code> - For low-end systems, general use
                    <br />
                    • <code className="text-midnight-300">qwen2.5-coder:0.5b</code> - For low-end systems, optimized for coding
                  </>
                ) : (
                  <>
                    هوش مصنوعی که از API اولاما که روی سیستم شما نصب شده استفاده میکنه. برای آموزش نصب به{" "}
                    <a href="https://ollama.com" target="_blank" rel="noopener noreferrer" className="text-midnight-300 hover:text-midnight-200 underline">
                      ollama.com
                    </a>{" "}
                    مراجعه کنید.
                    <br /><br />
                    <strong className="text-white">مدل‌های پیشنهادی:</strong>
                    <br />
                    • <code className="text-midnight-300">qwen2.5:0.5b</code> - برای سیستم‌های ضعیف، کاربری عمومی
                    <br />
                    • <code className="text-midnight-300">qwen2.5-coder:0.5b</code> - برای سیستم‌های ضعیف، مناسب برنامه‌نویسی
                  </>
                )}
              </p>
            </div>
          </div>
        )}

        {/* Clear Chat Confirmation Modal */}
        {showClearModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur p-4" onClick={() => setShowClearModal(false)}>
            <div className="bg-[#080813] border border-white/10 rounded-3xl p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-lg font-semibold text-white mb-3">{language === 'en' ? 'Clear Chat?' : 'پاک کردن چت؟'}</h3>
              <p className="text-sm text-slate-300 mb-6">
                {language === 'en' ? 'Are you sure you want to clear all messages? This action cannot be undone.' : 'آیا مطمئن هستید که میخواهید تمام پیامها را پاک کنید؟ این عمل قابل بازگشت نیست.'}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowClearModal(false)}
                  className="flex-1 px-4 py-2 rounded-lg border border-white/10 text-white/80 hover:bg-white/5 transition"
                >
                  {language === 'en' ? 'Cancel' : 'لغو'}
                </button>
                <button
                  onClick={handleClearChat}
                  className="flex-1 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                >
                  {language === 'en' ? 'Clear' : 'پاک کردن'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Desktop Header */}
        <header className="hidden md:flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
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
                className="rounded-full flex items-center gap-2 border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/80 transition hover:border-midnight-400 hover:text-white"
                onClick={() => setShowClearModal(true)}
              >
                <span> {t.reset}</span>

                <svg className="size-[18px]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <g clipPath="url(#clip0_4418_9808)">
                    <path d="M21 5.98047C17.67 5.65047 14.32 5.48047 10.98 5.48047C9 5.48047 7.02 5.58047 5.04 5.78047L3 5.98047" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8.5 4.97L8.72 3.66C8.88 2.71 9 2 10.69 2H13.31C15 2 15.13 2.75 15.28 3.67L15.5 4.97" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M18.85 9.14062L18.2 19.2106C18.09 20.7806 18 22.0006 15.21 22.0006H8.79002C6.00002 22.0006 5.91002 20.7806 5.80002 19.2106L5.15002 9.14062" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10.33 16.5H13.66" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9.5 12.5H14.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_4418_9808">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
          </div>
          <p className={`max-w-2xl text-sm text-slate-300 ${language === "fa" ? "text-right" : ""}`}>
            {language === "en" ? (
              <>
                AI chatbot powered by Ollama API running locally on your system. New to Ollama? Visit{" "}
                <a href="https://ollama.com" target="_blank" rel="noopener noreferrer" className="text-midnight-300 hover:text-midnight-200 underline">
                  ollama.com
                </a>{" "}
                to get started.
              </>
            ) : (
              <>
                هوش مصنوعی که از API اولاما که روی سیستم شما نصب شده استفاده میکنه. برای آموزش نصب به{" "}
                <a href="https://ollama.com" target="_blank" rel="noopener noreferrer" className="text-midnight-300 hover:text-midnight-200 underline">
                  ollama.com
                </a>{" "}
                مراجعه کنید.
              </>
            )}
          </p>
        </header>

        <section className="flex pt-4 flex-1 flex-col gap-4 md:rounded-3xl border border-white/10 bg-black/40 px-4 pb-6 md:p-6 shadow-xl backdrop-blur overflow-hidden md:mt-0 mt-16">
          <div className="flex flex-1 flex-col gap-4 overflow-y-auto pr-1 min-h-0">
            {hasMessages ? (
              userMessages.map((message, index) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  isLatest={message.id === animatingMessageId && index === userMessages.length - 1 && message.role === 'assistant'}
                />
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
