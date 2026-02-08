import ReactMarkdown from 'react-markdown';
import type { ChatMessage as ChatMessageType } from "@/features/chat/types/chat";
import CodeBlock from './CodeBlock';
import { useLanguageStore } from '@/features/language/store/useLanguageStore';
import { useTypingAnimation } from '../hooks/useTypingAnimation';
import { useState, useEffect } from 'react';

const roleStyles: Record<ChatMessageType["role"], string> = {
  system:
    "border border-dashed border-midnight-500/50 bg-midnight-950/70 text-midnight-100",
  user: "bg-midnight-500 text-white shadow-glow",
  assistant: "bg-slate-800/80 text-slate-100"
};

export default function ChatMessage({ message, isLatest }: { message: ChatMessageType; isLatest?: boolean }) {
  const isUser = message.role === "user";
  const { language } = useLanguageStore();
  const [showCopy, setShowCopy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    setMounted(true);
    setShouldAnimate(!isUser && !!isLatest);
  }, []);

  const { displayedText } = useTypingAnimation(shouldAnimate ? message.content : '', 20);
  const content = shouldAnimate ? displayedText : message.content;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`relative group max-w-[90%] md:max-w-[80%] rounded-2xl p-3 md:px-4 md:py-3 text-sm leading-relaxed sm:text-base ${roleStyles[message.role]
          } ${mounted ? (isUser ? `${language === 'en' ? "rounded-br-md" : "rounded-bl-md"}` : `${language === 'en' ? "rounded-bl-md" : "rounded-br-md"}`) : ''}`}
        onMouseEnter={() => setShowCopy(true)}
        onMouseLeave={() => setShowCopy(false)}
        onClick={() => setShowCopy(!showCopy)}
      >
        {mounted && (showCopy || copied) && (
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/50 hover:bg-black/70 transition-colors"
          >
            {copied ? (
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>
        )}
        {isUser ? (
          <p className="whitespace-pre-wrap">{message.content}</p>
        ) : (
          <ReactMarkdown
            components={{
              code({ node, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || '');
                const language = match ? match[1] : '';
                const inline = !className;

                return !inline ? (
                  <CodeBlock language={language}>
                    {String(children).replace(/\n$/, '')}
                  </CodeBlock>
                ) : (
                  <code className="bg-gray-700 px-1 py-0.5 rounded text-sm font-mono" {...props}>
                    {children}
                  </code>
                );
              },
              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
              ul: ({ children }) => <ul className="list-disc list-inside mb-2">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal list-inside mb-2">{children}</ol>,
              li: ({ children }) => <li className="mb-1">{children}</li>,
              h1: ({ children }) => <h1 className="text-xl font-bold mb-2">{children}</h1>,
              h2: ({ children }) => <h2 className="text-lg font-bold mb-2">{children}</h2>,
              h3: ({ children }) => <h3 className="text-base font-bold mb-2">{children}</h3>,
            }}
          >
            {content}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
}
