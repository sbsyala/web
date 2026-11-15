"use client";

import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  notices: any[];
}

export default function NoticesClient({ notices }: Props) {
  const { t } = useLanguage();

  return (
    <>
      <PageHero
        title={t.notices.pageTitle}
        subtitle={t.notices.pageSubtitle}
      />

      <section className="mx-auto max-w-4xl px-4 py-12 space-y-8">
        {notices.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl text-center text-slate-500 border border-amber-100">
            {t.notices.emptyText}
          </div>
        ) : (
          notices.map((n) => {
            let paragraphs: string[] = [];
            try {
              const parsed = JSON.parse(n.body);
              paragraphs = Array.isArray(parsed) ? parsed : [n.body];
            } catch {
              paragraphs = [n.body];
            }

            return (
              <article
                key={n.id}
                className="bg-white rounded-2xl border border-amber-200 shadow-sm overflow-hidden"
              >
                <div className="brand-gradient text-white px-6 py-3 flex items-center justify-between">
                  <span className="font-bold text-sm">{t.notices.urgentBadge}</span>
                  <span className="text-xs text-amber-100 font-medium">{n.dateNe}</span>
                </div>
                <div className="p-6 sm:p-8">
                  <h2 className="text-xl font-bold text-[color:var(--brand)]">
                    {n.title}
                  </h2>
                  <div className="mt-4 space-y-3 text-slate-700 leading-loose text-[15px]">
                    {paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                  {n.image && (
                    <div className="mt-6 relative w-full max-w-lg mx-auto aspect-square bg-amber-50 rounded-xl overflow-hidden border">
                      <Image
                        src={n.image}
                        alt={n.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 500px"
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                  )}
                  <div className="mt-6 text-right text-sm font-bold text-[color:var(--brand)]">
                    {t.notices.thankYou}
                  </div>
                </div>
              </article>
            );
          })
        )}

        <div className="rounded-2xl bg-[color:var(--brand-cream)] border border-amber-200 p-6 text-center shadow-sm">
          <p className="text-slate-700 text-sm">
            {t.notices.footerPrompt}{" "}
            <Link
              href="/contact"
              className="text-[color:var(--brand)] font-bold underline"
            >
              {t.nav.contact}
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
