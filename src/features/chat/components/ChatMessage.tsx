import ReactMarkdown from 'react-markdown';
import type { ChatMessage as ChatMessageType } from "@/features/chat/types/chat";
import CodeBlock from './CodeBlock';
import { useLanguageStore } from '@/features/i18n/store/useLanguageStore';

const roleStyles: Record<ChatMessageType["role"], string> = {
  system:
    "border border-dashed border-midnight-500/50 bg-midnight-950/70 text-midnight-100",
  user: "bg-midnight-500 text-white shadow-glow",
  assistant: "bg-slate-800/80 text-slate-100"
};

export default function ChatMessage({ message }: { message: ChatMessageType }) {
  const isUser = message.role === "user";

  const { language } = useLanguageStore();

  return (
    <div
      className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed sm:text-base ${roleStyles[message.role]
          } ${isUser ? `${language === 'en' ? "rounded-br-md" : "rounded-bl-md"}` : `${language === 'en' ? "rounded-bl-md" : "rounded-br-md"}`}`}
      >
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
            {message.content}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
}
