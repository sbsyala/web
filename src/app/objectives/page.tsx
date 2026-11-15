"use client";

import PageHero from "@/components/PageHero";
import { useLanguage } from "@/context/LanguageContext";

export default function ObjectivesPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageHero
        title={t.objectives.pageTitle}
        subtitle={t.objectives.pageSubtitle}
      />
      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="bg-[color:var(--brand-cream)] border border-amber-200 rounded-2xl p-6 sm:p-8 mb-8 shadow-sm">
          <p className="text-slate-700 leading-loose text-[15px]">
            {t.objectives.introText}
          </p>
        </div>

        <ol className="space-y-4">
          {t.objectives.list.map((o, i) => (
            <li
              key={i}
              className="bg-white rounded-2xl border border-amber-100 shadow-sm p-5 flex gap-4 items-start hover:border-amber-300 transition"
            >
              <div className="shrink-0 w-9 h-9 rounded-full brand-gradient text-white grid place-items-center font-bold text-sm shadow">
                {i + 1}
              </div>
              <p className="text-slate-700 leading-relaxed text-[15px] pt-1">
                {o}
              </p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
