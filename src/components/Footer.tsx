"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Footer() {
  const { t, language } = useLanguage();
  const isNepali = language === "ne";

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/objectives", label: t.nav.objectives },
    { href: "/committee", label: t.nav.committee },
    { href: "/members", label: t.nav.members },
    { href: "/games/bagh-chal", label: isNepali ? "🐅 बाघचाल खेल" : "🐅 Bagh Chal Game" },
    { href: "/activities", label: t.nav.activities },
    { href: "/notices", label: t.nav.notices },
    { href: "/gallery", label: t.nav.gallery },
    { href: "/donate", label: t.nav.donate },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <footer className="mt-16 bg-[color:var(--brand-dark)] text-amber-50">
      <div className="mx-auto max-w-7xl px-4 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/10 border border-amber-300 grid place-items-center text-2xl">
              ☸
            </div>
            <div>
              <div className="text-lg font-bold">{t.site.name}</div>
              <div className="text-xs text-amber-200">{t.site.subName}</div>
            </div>
          </div>
          <p className="mt-4 text-sm text-amber-100/90 leading-relaxed">
            {t.footer.aboutSnippet}
          </p>

          <div className="mt-5 flex items-center gap-2">
            <span className="text-xs text-amber-200">Language / भाषा:</span>
            <LanguageSwitcher />
          </div>
        </div>

        <div>
          <h4 className="text-base font-semibold text-amber-200 uppercase tracking-wider">
            {t.footer.quickLinks}
          </h4>
          <ul className="mt-4 grid grid-cols-2 gap-y-2 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  className="hover:text-amber-300 transition"
                  href={l.href}
                >
                  ➤ {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-base font-semibold text-amber-200 uppercase tracking-wider">
            {t.footer.contactTitle}
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>📍 {t.site.address}</li>
            <li>
              📞{" "}
              <a href={`tel:${t.site.phoneRaw}`} className="hover:text-amber-300">
                {t.site.phone}
              </a>
            </li>
            <li>
              ✉{" "}
              <a
                href={`mailto:${t.site.email}`}
                className="hover:text-amber-300 break-all"
              >
                {t.site.email}
              </a>
            </li>
            <li className="text-xs text-amber-200/80 pt-2">
              {t.site.registration}
            </li>
            <li className="text-xs text-amber-200/80">{t.site.pan}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-amber-400/20">
        <div className="mx-auto max-w-7xl px-4 py-4 text-xs text-amber-200 flex flex-col sm:flex-row justify-between items-center gap-3">
          <span>© {new Date().getFullYear()} {t.site.name}. {t.footer.rightsReserved}</span>
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <Link
              href="/games/bagh-chal"
              className="text-amber-300 hover:text-white font-bold underline underline-offset-2 flex items-center gap-1"
            >
              <span>🐅 बाघचाल (Bagh Chal)</span>
            </Link>
            <span>•</span>
            <Link
              href="/member/login"
              className="text-amber-300 hover:text-white font-semibold underline underline-offset-2 flex items-center gap-1"
            >
              <span>{t.footer.memberPortalLink}</span>
            </Link>
            <span>•</span>
            <Link
              href="/admin/login"
              className="text-amber-300 hover:text-white underline underline-offset-2 flex items-center gap-1 font-semibold"
            >
              {t.footer.cpanelLink}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
