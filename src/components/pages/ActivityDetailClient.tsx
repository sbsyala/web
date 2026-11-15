"use client";

import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  activity: any;
  paragraphs: string[];
  galleryImages: string[];
  related: any[];
}

export default function ActivityDetailClient({
  activity,
  paragraphs,
  galleryImages,
  related,
}: Props) {
  const { t, language } = useLanguage();

  return (
    <>
      <PageHero
        title={activity.title}
        breadcrumb={t.nav.activities}
      />

      <article className="mx-auto max-w-4xl px-4 py-12">
        <div className="text-sm text-amber-800 font-bold mb-4 bg-amber-50 inline-block px-3 py-1 rounded-lg border border-amber-200">
          📅 {language === "en" && activity.dateEn ? activity.dateEn : activity.dateNe}
        </div>

        <div className="relative aspect-video rounded-2xl overflow-hidden bg-amber-50 shadow-md">
          <Image
            src={activity.cover}
            alt={activity.title}
            fill
            sizes="(max-width: 1024px) 100vw, 800px"
            className="object-cover"
            unoptimized
            priority
          />
        </div>

        <div className="mt-8 space-y-4 text-[15px] leading-loose text-slate-700 bg-white rounded-2xl border border-amber-100 p-6 sm:p-8 shadow-sm">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {galleryImages.length > 0 && (
          <div className="mt-10">
            <h3 className="text-xl font-bold text-[color:var(--brand)] section-heading-left">
              {t.activities.galleryHeading}
            </h3>
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {galleryImages.map((g, i) => (
                <div
                  key={i}
                  className="relative aspect-square rounded-xl overflow-hidden bg-amber-50 shadow-sm hover:shadow-md transition"
                >
                  <Image
                    src={g}
                    alt={`${activity.title} - ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 50vw, 200px"
                    className="object-cover hover:scale-105 transition duration-300"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {related.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-bold text-[color:var(--brand)] section-heading-left">
              {t.activities.relatedHeading}
            </h3>
            <div className="mt-5 grid gap-5 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/activities/${r.slug}`}
                  className="group bg-white rounded-xl overflow-hidden border border-amber-100 hover:shadow-lg transition"
                >
                  <div className="relative aspect-video bg-amber-50">
                    <Image
                      src={r.cover}
                      alt={r.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 250px"
                      className="object-cover group-hover:scale-105 transition"
                      unoptimized
                    />
                  </div>
                  <div className="p-3">
                    <div className="text-xs text-amber-700 font-semibold">
                      {language === "en" && r.dateEn ? r.dateEn : r.dateNe}
                    </div>
                    <div className="mt-1 text-sm font-bold text-[color:var(--brand)] group-hover:underline line-clamp-2">
                      {r.title}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            href="/activities"
            className="inline-block bg-[color:var(--brand)] text-white px-7 py-3 rounded-full font-bold hover:bg-[color:var(--brand-dark)] shadow"
          >
            {t.activities.backBtn}
          </Link>
        </div>
      </article>
    </>
  );
}
