"use client";

import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  list: any[];
}

export default function ActivitiesListClient({ list }: Props) {
  const { t, language } = useLanguage();

  return (
    <>
      <PageHero
        title={t.activities.pageTitle}
        subtitle={t.activities.pageSubtitle}
      />

      <section className="mx-auto max-w-7xl px-4 py-12">
        {list.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl text-center text-slate-500 border border-amber-100">
            {t.activities.emptyText}
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {list.map((a) => (
              <Link
                key={a.slug}
                href={`/activities/${a.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-amber-100 hover:shadow-xl transition"
              >
                <div className="relative aspect-video bg-amber-50">
                  <Image
                    src={a.cover}
                    alt={a.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition duration-500"
                    unoptimized
                  />
                </div>
                <div className="p-5">
                  <div className="text-xs text-amber-700 font-semibold">
                    {language === "en" && a.dateEn ? a.dateEn : a.dateNe}
                  </div>
                  <h3 className="mt-2 font-bold text-[color:var(--brand)] leading-snug group-hover:underline">
                    {a.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 line-clamp-3">
                    {a.excerpt}
                  </p>
                  <span className="mt-4 inline-block text-sm text-[color:var(--brand)] font-bold">
                    {t.activities.readFull}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
