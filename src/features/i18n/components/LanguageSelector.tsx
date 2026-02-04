"use client";

import { useLanguageStore } from "@/features/i18n/store/useLanguageStore";

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguageStore();

  return (
    <div className="flex gap-2 rounded-full border border-white/10 bg-white/5 p-1">
      <button
        onClick={() => setLanguage("en")}
        className={`rounded-full px-3 py-1 text-xs font-medium transition ${
          language === "en"
            ? "bg-white text-black"
            : "text-white/60 hover:text-white"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage("fa")}
        className={`rounded-full px-3 py-1 text-xs font-medium transition ${
          language === "fa"
            ? "bg-white text-black"
            : "text-white/60 hover:text-white"
        }`}
      >
        FA
      </button>
    </div>
  );
}
