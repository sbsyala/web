"use client";

import PageHero from "@/components/PageHero";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageHero
        title={t.about.pageTitle}
        subtitle={t.about.pageSubtitle}
      />

      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-amber-100 p-6 sm:p-10 space-y-5 text-[15px] leading-loose text-slate-700">
          <h2 className="text-xl font-bold text-[color:var(--brand)]">
            {t.about.introHeading}
          </h2>
          {t.about.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {/* Registration facts */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {t.about.facts.map((f) => (
            <div
              key={f.label}
              className="rounded-2xl bg-[color:var(--brand-cream)] border border-amber-200 p-5 shadow-sm"
            >
              <div className="text-xs uppercase tracking-wider text-amber-800 font-bold">
                {f.label}
              </div>
              <div className="mt-1.5 font-bold text-[color:var(--brand)] text-sm">
                {f.value}
              </div>
              {f.sub && (
                <div className="mt-1 text-xs text-slate-600 font-medium">
                  {f.sub}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Work jurisdiction */}
        <div className="mt-8 rounded-2xl bg-white border border-amber-100 p-6 sm:p-8 shadow-sm">
          <h3 className="text-lg font-bold text-[color:var(--brand)]">
            {t.about.jurisdictionHeading}
          </h3>
          <p className="mt-3 text-slate-700 leading-loose text-[15px]">
            {t.about.jurisdictionText}
          </p>
        </div>

        {/* Membership types */}
        <div className="mt-10">
          <h3 className="text-2xl font-bold text-[color:var(--brand)] section-heading-left">
            {t.about.membershipHeading}
          </h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {t.about.memberships.map((m, i) => (
              <div
                key={m.title}
                className="rounded-2xl bg-white border border-amber-100 p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full brand-gradient text-white grid place-items-center font-bold text-xs shadow-sm">
                    {i + 1}
                  </div>
                  <div className="font-bold text-[color:var(--brand)] text-sm">
                    {m.title}
                  </div>
                </div>
                <p className="mt-3 text-sm text-slate-700 leading-relaxed">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
