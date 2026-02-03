export default function TypingIndicator() {
  return (
    <div className="flex w-full items-center justify-start">
      <div className="flex items-center gap-2 rounded-full bg-slate-800/70 px-4 py-2 text-xs text-slate-300">
        <span className="h-2 w-2 animate-pulse rounded-full bg-midnight-400" />
        <span className="h-2 w-2 animate-pulse rounded-full bg-midnight-300 [animation-delay:150ms]" />
        <span className="h-2 w-2 animate-pulse rounded-full bg-midnight-200 [animation-delay:300ms]" />
        <span>Assistant is thinking...</span>
      </div>
    </div>
  );
}
