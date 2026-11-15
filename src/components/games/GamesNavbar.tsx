"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function GamesNavbar() {
  const pathname = usePathname();
  const { language } = useLanguage();

  const isNepali = language === "ne";

  const gameLinks = [
    {
      href: "/games/bagh-chal",
      label: isNepali ? "🐅 बाघचाल (Bagh Chal Game)" : "🐅 Bagh Chal (Tigers & Goats)",
      badge: isNepali ? "प्रत्यक्ष खेल (Playable)" : "Interactive Game",
    },
    {
      href: "/games",
      label: isNepali ? "🎯 परम्परागत खेलहरु (All Games)" : "🎯 Heritage Games Directory",
    },
    {
      href: "/games/pasa",
      label: isNepali ? "🎲 पासा (Pasa / Chaupar)" : "🎲 Pasa (Traditional Dice)",
    },
    {
      href: "/games/rules",
      label: isNepali ? "📖 बाघचालको नियम (Bagh Chal Rules)" : "📖 Rules & Guide",
    },
  ];

  return (
    <div className="bg-[#5c1414] text-white border-b-2 border-amber-400 shadow-md">
      {/* Top Organization Header */}
      <div className="bg-black/35 py-2 px-4 border-b border-amber-500/30">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <span className="text-amber-400 text-lg">☸</span>
            <div>
              <span className="text-xs sm:text-sm font-extrabold text-amber-300 tracking-wide">
                {isNepali ? "शाक्य बज्राचार्य समाज, यल (ललितपुर)" : "Shakya Bajracharya Samaj Yala (Lalitpur)"}
              </span>
              <span className="text-white/80 text-[11px] ml-2 hidden md:inline">
                {isNepali
                  ? "— नेवार समुदायका परम्परागत तथा ऐतिहासिक खेलहरु"
                  : "— Traditional Indigenous Heritage Games of Newar Buddhist Community"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] bg-amber-400 text-amber-950 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              {isNepali ? "पुर्ख्यौली खेल मञ्च" : "Heritage Gaming"}
            </span>
            <LanguageSwitcher compact />
          </div>
        </div>
      </div>

      {/* Games Navigation Bar */}
      <div className="mx-auto max-w-7xl px-4 py-2.5 flex items-center justify-between gap-3 overflow-x-auto">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-full bg-amber-400 text-amber-950 font-black grid place-items-center text-sm shadow">
            🐅
          </div>
          <span className="text-sm font-bold text-amber-200 hidden sm:inline">
            {isNepali ? "परम्परागत खेल मञ्च:" : "Traditional Games:"}
          </span>
        </div>

        <nav className="flex items-center gap-1.5 overflow-x-auto py-1">
          {gameLinks.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
                  active
                    ? "bg-amber-400 text-amber-950 shadow-md ring-2 ring-amber-300"
                    : "text-amber-100 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[9px] bg-red-700 text-white font-bold px-1.5 py-0.2 rounded-full animate-pulse">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/"
          className="text-xs text-amber-300 hover:text-white underline underline-offset-2 shrink-0 hidden lg:inline"
        >
          {isNepali ? "← मुख्य गृहपृष्ठ" : "← Main Site"}
        </Link>
      </div>
    </div>
  );
}
