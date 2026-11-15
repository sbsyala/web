"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function LanguageSwitcher({
  className = "",
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const { language, setLanguage } = useLanguage();

  if (compact) {
    return (
      <button
        onClick={() => setLanguage(language === "ne" ? "en" : "ne")}
        aria-label="Toggle language"
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition shadow-sm border ${
          language === "ne"
            ? "bg-amber-100 border-amber-300 text-amber-950 hover:bg-amber-200"
            : "bg-blue-100 border-blue-300 text-blue-950 hover:bg-blue-200"
        } ${className}`}
      >
        <span>{language === "ne" ? "🇳🇵 नेपाली" : "🇬🇧 English"}</span>
        <span className="text-[10px] opacity-75">⇄</span>
      </button>
    );
  }

  return (
    <div
      role="group"
      aria-label="Language selection"
      className={`inline-flex items-center rounded-full bg-black/20 p-1 border border-white/25 backdrop-blur-sm ${className}`}
    >
      <button
        type="button"
        onClick={() => setLanguage("ne")}
        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition ${
          language === "ne"
            ? "bg-amber-400 text-amber-950 shadow"
            : "text-white/85 hover:text-white hover:bg-white/10"
        }`}
      >
        <span>🇳🇵</span>
        <span>नेपाली</span>
      </button>
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition ${
          language === "en"
            ? "bg-amber-400 text-amber-950 shadow"
            : "text-white/85 hover:text-white hover:bg-white/10"
        }`}
      >
        <span>🇬🇧</span>
        <span>English</span>
      </button>
    </div>
  );
}
