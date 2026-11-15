"use client";

import { useState } from "react";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  initialItems: any[];
}

export default function GalleryClient({ initialItems }: Props) {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  // Extract unique categories
  const rawCategories = Array.from(
    new Set(initialItems.map((i) => i.category).filter(Boolean))
  );

  const filtered =
    activeCategory === "ALL"
      ? initialItems
      : initialItems.filter((i) => i.category === activeCategory);

  return (
    <>
      <PageHero
        title={t.gallery.pageTitle}
        subtitle={t.gallery.pageSubtitle}
      />

      <section className="mx-auto max-w-7xl px-4 py-12">
        {/* Category Filters */}
        {rawCategories.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            <button
              onClick={() => setActiveCategory("ALL")}
              className={`px-4 py-2 rounded-full text-xs font-bold transition ${
                activeCategory === "ALL"
                  ? "bg-[color:var(--brand)] text-white shadow"
                  : "bg-white text-slate-700 hover:bg-amber-100 border border-amber-200"
              }`}
            >
              {t.gallery.allCategory}
            </button>
            {rawCategories.map((cat) => {
              const translatedCat = t.categories[cat] || cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition ${
                    activeCategory === cat
                      ? "bg-[color:var(--brand)] text-white shadow"
                      : "bg-white text-slate-700 hover:bg-amber-100 border border-amber-200"
                  }`}
                >
                  {translatedCat}
                </button>
              );
            })}
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl text-center text-slate-500 border border-amber-100">
            {t.gallery.emptyText}
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {filtered.map((g) => {
              const translatedCat = t.categories[g.category] || g.category;
              return (
                <figure
                  key={g.id}
                  className="group relative overflow-hidden rounded-2xl bg-amber-50 shadow-sm border border-amber-100 hover:shadow-xl transition"
                >
                  <div className="relative w-full aspect-square">
                    <Image
                      src={g.src}
                      alt={g.caption}
                      fill
                      sizes="(max-width: 768px) 50vw, 300px"
                      className="object-cover group-hover:scale-110 transition duration-500"
                      unoptimized
                    />
                  </div>
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent text-white text-xs sm:text-sm p-3.5 opacity-0 group-hover:opacity-100 transition duration-300">
                    <div className="font-bold drop-shadow">{g.caption}</div>
                    {g.category && (
                      <div className="text-[10px] text-amber-300 font-semibold mt-1">
                        {t.gallery.categoryPrefix}: {translatedCat}
                      </div>
                    )}
                  </figcaption>
                </figure>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
