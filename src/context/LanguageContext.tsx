"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Language, TranslationData, translations } from "@/lib/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: TranslationData;
  isNepali: boolean;
  isEnglish: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ne");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("sb_lang") as Language | null;
      if (saved === "ne" || saved === "en") {
        setLanguageState(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  function setLanguage(lang: Language) {
    setLanguageState(lang);
    try {
      localStorage.setItem("sb_lang", lang);
      document.cookie = `sb_lang=${lang}; path=/; max-age=31536000`;
    } catch {
      // ignore
    }
  }

  function toggleLanguage() {
    setLanguage(language === "ne" ? "en" : "ne");
  }

  const value: LanguageContextType = {
    language,
    setLanguage,
    toggleLanguage,
    t: translations[language] || translations.ne,
    isNepali: language === "ne",
    isEnglish: language === "en",
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Fallback default if rendered outside provider
    return {
      language: "ne" as Language,
      setLanguage: () => {},
      toggleLanguage: () => {},
      t: translations.ne,
      isNepali: true,
      isEnglish: false,
    };
  }
  return context;
}
