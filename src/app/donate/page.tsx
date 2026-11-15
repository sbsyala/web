"use client";

import Link from "next/link";
import PageHero from "@/components/PageHero";
import { useLanguage } from "@/context/LanguageContext";

export default function DonatePage() {
  const { t } = useLanguage();

  return (
    <>
      <PageHero
        title={t.donate.pageTitle}
        subtitle={t.donate.pageSubtitle}
      />

      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="rounded-2xl bg-white border border-amber-200 p-6 sm:p-10 shadow-sm">
          <div className="text-center">
            <div className="text-5xl animate-bounce">🪷</div>
            <h2 className="mt-3 text-2xl font-bold text-[color:var(--brand)]">
              {t.donate.appealTitle}
            </h2>
          </div>
          <div className="mt-6 space-y-4 text-slate-700 leading-loose text-[15px] text-center max-w-2xl mx-auto">
            <p>{t.donate.p1}</p>
            <p>{t.donate.p2}</p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl brand-gradient text-white p-6 shadow-md">
              <div className="text-xs uppercase tracking-wider text-amber-200 font-bold">
                {t.donate.bankAccountTitle}
              </div>
              <div className="mt-2 text-lg font-bold">{t.site.fullName}</div>
              <div className="mt-4 space-y-2 text-sm">
                <div>
                  <span className="text-amber-200 font-semibold">{t.donate.accountNameLabel}:</span>{" "}
                  {t.site.fullName}
                </div>
                <div>
                  <span className="text-amber-200 font-semibold">{t.donate.bankNameLabel}:</span>{" "}
                  {t.donate.bankNameValue}
                </div>
                <div>
                  <span className="text-amber-200 font-semibold">{t.donate.panLabel}:</span> 613326119
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-[color:var(--brand-cream)] border border-amber-200 p-6 shadow-sm">
              <div className="text-xs uppercase tracking-wider text-amber-800 font-bold">
                {t.donate.contactTitle}
              </div>
              <div className="mt-2 text-lg font-bold text-[color:var(--brand)]">
                {t.site.name}
              </div>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li>📍 {t.site.address}</li>
                <li>
                  📞{" "}
                  <a
                    className="text-[color:var(--brand)] font-bold hover:underline"
                    href={`tel:${t.site.phoneRaw}`}
                  >
                    {t.site.phone}
                  </a>
                </li>
                <li>
                  ✉{" "}
                  <a
                    className="text-[color:var(--brand)] font-bold hover:underline break-all"
                    href={`mailto:${t.site.email}`}
                  >
                    {t.site.email}
                  </a>
                </li>
              </ul>
              <Link
                href="/contact"
                className="mt-4 inline-block bg-[color:var(--brand)] text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-[color:var(--brand-dark)] shadow"
              >
                {t.donate.contactBtn}
              </Link>
            </div>
          </div>

          <div className="mt-10 text-center text-sm text-slate-700 italic bg-amber-50/70 p-4 rounded-xl border border-amber-200">
            {t.donate.footerBlessing}
          </div>
        </div>
      </section>
    </>
  );
}
