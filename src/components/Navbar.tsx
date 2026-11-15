"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [membersDropdown, setMembersDropdown] = useState(false);
  const [gamesDropdown, setGamesDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const gamesDropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { t, language } = useLanguage();

  const isNepali = language === "ne";

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMembersDropdown(false);
      }
      if (gamesDropdownRef.current && !gamesDropdownRef.current.contains(event.target as Node)) {
        setGamesDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/objectives", label: t.nav.objectives },
    { href: "/committee", label: t.nav.committee },
    { href: "/activities", label: t.nav.activities },
    { href: "/notices", label: t.nav.notices },
    { href: "/gallery", label: t.nav.gallery },
    { href: "/donate", label: t.nav.donate },
    { href: "/contact", label: t.nav.contact },
  ];

  const memberSublinks = [
    { href: "/members", label: t.memberTypes.all, icon: "👥" },
    { href: "/members?type=founder", label: t.memberTypes.founder, icon: "🏛️" },
    { href: "/members?type=honorary", label: t.memberTypes.honorary, icon: "🎖️" },
    { href: "/members?type=life", label: t.memberTypes.life, icon: "🌟" },
    { href: "/members?type=general", label: t.memberTypes.general, icon: "👤" },
    { href: "/member/login", label: t.nav.memberPortal, icon: "🔐", special: true },
    { href: "/member/login?tab=register", label: isNepali ? "📝 नयाँ सदस्य दर्ता (Register)" : "📝 Member Registration", icon: "📝", special: true },
  ];

  const gamesSublinks = [
    {
      href: "/games/bagh-chal",
      label: isNepali ? "🐅 बाघचाल (Bagh Chal Game)" : "🐅 Bagh Chal (Playable Game)",
      icon: "🐅",
      badge: isNepali ? "प्रत्यक्ष खेल" : "Live Game",
    },
    {
      href: "/games",
      label: isNepali ? "🎯 परम्परागत खेलहरु (All Games)" : "🎯 Heritage Games",
      icon: "🎯",
    },
    {
      href: "/games/pasa",
      label: isNepali ? "🎲 पासा (Pasa / Chaupar)" : "🎲 Pasa (Traditional Dice)",
      icon: "🎲",
    },
    {
      href: "/games/rules",
      label: isNepali ? "📖 खेलको नियम तथा रणनीति" : "📖 Bagh Chal Rules",
      icon: "📖",
    },
  ];

  const isMembersActive = pathname.startsWith("/members") || pathname.startsWith("/member");
  const isGamesActive = pathname.startsWith("/games");

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-amber-200 shadow-sm">
      {/* Top strip */}
      <div className="brand-gradient text-white text-xs sm:text-sm">
        <div className="mx-auto max-w-7xl px-4 py-1.5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="italic truncate text-center sm:text-left">
            ✦ {t.site.tagline} ✦
          </span>
          <div className="flex items-center gap-3 shrink-0">
            {/* Direct Traditional Game Link in Top Bar */}
            <Link
              href="/games/bagh-chal"
              className="text-xs bg-amber-400 text-amber-950 font-extrabold px-2.5 py-0.5 rounded-md hover:bg-amber-300 transition flex items-center gap-1 shadow-sm"
            >
              <span>🐅</span>
              <span>{isNepali ? "बाघचाल खेल्नुहोस्" : "Play Bagh Chal"}</span>
            </Link>

            <Link
              href="/member/login"
              className="text-xs bg-white/20 hover:bg-white/30 text-white font-semibold px-2.5 py-0.5 rounded-md transition flex items-center gap-1"
            >
              <span>👤</span>
              <span>{t.nav.memberPortal}</span>
            </Link>
            <span className="hidden md:inline text-white/40">|</span>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="mx-auto max-w-7xl px-4 py-2.5 flex items-center justify-between gap-2">
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full brand-gradient grid place-items-center text-white text-xl font-bold shadow-md ring-2 ring-amber-300 group-hover:scale-105 transition">
            ☸
          </div>
          <div className="leading-tight">
            <div className="text-[13px] sm:text-lg font-bold text-[color:var(--brand)]">
              {language === "ne" ? t.site.name : "Shakya Bajracharya Samaj Yala"}
            </div>
            <div className="text-[9px] sm:text-xs text-slate-600 tracking-wide">
              {language === "ne" ? "The Society of Shakya, Bajracharya Lalitpur" : "नेवार बौद्ध समाज · यल ललितपुर"}
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.slice(0, 4).map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`px-2 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
                  active
                    ? "bg-[color:var(--brand)] text-white shadow-sm"
                    : "text-slate-700 hover:bg-amber-100 hover:text-[color:var(--brand)]"
                }`}
              >
                {l.label}
              </Link>
            );
          })}

          {/* Members Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => {
                setMembersDropdown((v) => !v);
                setGamesDropdown(false);
              }}
              className={`px-2 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap flex items-center gap-1 ${
                isMembersActive
                  ? "bg-[color:var(--brand)] text-white shadow-sm"
                  : "text-slate-700 hover:bg-amber-100 hover:text-[color:var(--brand)]"
              }`}
            >
              <span>{t.nav.members}</span>
              <span className="text-[9px]">{membersDropdown ? "▲" : "▼"}</span>
            </button>

            {membersDropdown && (
              <div className="absolute top-full left-0 mt-1 w-60 bg-white rounded-xl shadow-2xl border border-amber-200 p-2 z-50 animate-in fade-in slide-in-from-top-1">
                <div className="text-[10px] font-bold text-amber-800 uppercase px-3 py-1 border-b border-amber-100 mb-1">
                  {t.nav.members}
                </div>
                {memberSublinks.map((sub) => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    onClick={() => setMembersDropdown(false)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                      sub.special
                        ? "bg-amber-50 text-[color:var(--brand)] font-bold mt-1 border border-amber-200 hover:bg-amber-100"
                        : "text-slate-700 hover:bg-amber-50 hover:text-[color:var(--brand)]"
                    }`}
                  >
                    <span>{sub.icon}</span>
                    <span>{sub.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Traditional Games Dropdown / Nav Tab */}
          <div className="relative" ref={gamesDropdownRef}>
            <button
              onClick={() => {
                setGamesDropdown((v) => !v);
                setMembersDropdown(false);
              }}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap flex items-center gap-1.5 shadow-sm border ${
                isGamesActive
                  ? "bg-[#5c1414] text-amber-300 border-amber-400 shadow"
                  : "bg-amber-50 text-amber-950 hover:bg-amber-100 border-amber-300"
              }`}
            >
              <span>🐅</span>
              <span>{isNepali ? "परम्परागत खेलहरु" : "Traditional Games"}</span>
              <span className="text-[9px]">{gamesDropdown ? "▲" : "▼"}</span>
            </button>

            {gamesDropdown && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-2xl border border-amber-200 p-2 z-50 animate-in fade-in slide-in-from-top-1">
                <div className="text-[10px] font-bold text-[#7a1f1f] uppercase px-3 py-1 border-b border-amber-100 mb-1 flex items-center justify-between">
                  <span>☸ {isNepali ? "नेवार पुर्ख्यौली खेलहरु" : "Heritage Games"}</span>
                </div>
                {gamesSublinks.map((sub) => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    onClick={() => setGamesDropdown(false)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-slate-800 hover:bg-amber-50 hover:text-[color:var(--brand)] transition"
                  >
                    <span>{sub.label}</span>
                    {sub.badge && (
                      <span className="text-[9px] bg-red-600 text-white font-bold px-1.5 py-0.2 rounded-full">
                        {sub.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navLinks.slice(4).map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`px-2 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
                  active
                    ? "bg-[color:var(--brand)] text-white shadow-sm"
                    : "text-slate-700 hover:bg-amber-100 hover:text-[color:var(--brand)]"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* Medium screens navigation (lg to xl) */}
        <nav className="hidden lg:flex xl:hidden items-center gap-1">
          <Link
            href="/"
            className="px-2 py-1 rounded-md text-[11px] font-semibold text-slate-700 hover:bg-amber-100"
          >
            {t.nav.home}
          </Link>
          <Link
            href="/members"
            className={`px-2 py-1 rounded-md text-[11px] font-semibold ${
              isMembersActive ? "bg-[color:var(--brand)] text-white" : "text-slate-700 hover:bg-amber-100"
            }`}
          >
            {t.nav.members}
          </Link>
          <Link
            href="/games/bagh-chal"
            className="px-2 py-1 rounded-md text-[11px] font-bold bg-amber-100 text-amber-950 border border-amber-300"
          >
            🐅 {isNepali ? "बाघचाल" : "Bagh Chal"}
          </Link>
          <Link
            href="/activities"
            className="px-2 py-1 rounded-md text-[11px] font-semibold text-slate-700 hover:bg-amber-100"
          >
            {t.nav.activities}
          </Link>
          <Link
            href="/gallery"
            className="px-2 py-1 rounded-md text-[11px] font-semibold text-slate-700 hover:bg-amber-100"
          >
            {t.nav.gallery}
          </Link>
          <Link
            href="/contact"
            className="px-2 py-1 rounded-md text-[11px] font-semibold text-slate-700 hover:bg-amber-100"
          >
            {t.nav.contact}
          </Link>
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/games/bagh-chal"
            className="px-2 py-1 rounded-lg bg-amber-400 text-amber-950 text-xs font-bold shadow-sm"
          >
            🐅 {isNepali ? "बाघचाल" : "Game"}
          </Link>
          <LanguageSwitcher compact />
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-amber-300 text-[color:var(--brand)] font-bold hover:bg-amber-50 text-sm"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {open && (
        <div className="lg:hidden border-t border-amber-200 bg-white/95 backdrop-blur animate-in slide-in-from-top-2">
          {/* Mobile Traditional Games Highlight Strip */}
          <div className="p-3 bg-[#5c1414] text-white flex items-center justify-between border-b border-amber-400">
            <div className="flex items-center gap-2">
              <span>☸</span>
              <span className="text-xs font-bold text-amber-200">
                {isNepali ? "परम्परागत नेपाली खेलहरु:" : "Traditional Games:"}
              </span>
            </div>
            <Link
              href="/games/bagh-chal"
              onClick={() => setOpen(false)}
              className="bg-amber-400 text-amber-950 text-xs font-black px-3 py-1 rounded-md shadow"
            >
              🐅 {isNepali ? "बाघचाल खेल्नुहोस्" : "Play Bagh Chal"}
            </Link>
          </div>

          <nav className="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-1">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className={`px-3 py-2 rounded-lg text-sm font-medium ${
                pathname === "/" ? "bg-[color:var(--brand)] text-white" : "text-slate-800 hover:bg-amber-100"
              }`}
            >
              {t.nav.home}
            </Link>

            <Link
              href="/about"
              onClick={() => setOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-800 hover:bg-amber-100"
            >
              {t.nav.about}
            </Link>

            {/* Traditional Games Submenu for Mobile */}
            <div className="bg-amber-50/90 rounded-xl p-2.5 border border-amber-300 my-1 space-y-1.5">
              <div className="text-xs font-bold text-[#7a1f1f] px-2 py-0.5 flex items-center justify-between">
                <span>🐅 {isNepali ? "परम्परागत खेल मञ्च" : "Traditional Games"}</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                {gamesSublinks.map((g) => (
                  <Link
                    key={g.href}
                    href={g.href}
                    onClick={() => setOpen(false)}
                    className="p-2 rounded-lg bg-white border border-amber-200 font-semibold text-slate-800 hover:bg-amber-100 flex items-center gap-1"
                  >
                    <span>{g.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Members Submenu */}
            <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200 my-1 space-y-1">
              <div className="text-xs font-bold text-slate-900 px-2 py-0.5 flex items-center justify-between">
                <span>👥 {t.nav.members}</span>
              </div>
              <div className="grid grid-cols-2 gap-1 text-xs">
                {memberSublinks.slice(0, 5).map((sub) => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    onClick={() => setOpen(false)}
                    className="p-1.5 rounded-lg bg-white border border-slate-200 font-medium text-slate-800"
                  >
                    {sub.icon} {sub.label}
                  </Link>
                ))}
              </div>
              <Link
                href="/member/login"
                onClick={() => setOpen(false)}
                className="block text-center py-2 rounded-lg brand-gradient text-white text-xs font-bold shadow-sm mt-2"
              >
                🔐 {t.nav.memberPortal}
              </Link>
            </div>

            {navLinks.slice(4).map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  pathname === l.href ? "bg-[color:var(--brand)] text-white" : "text-slate-800 hover:bg-amber-100"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
