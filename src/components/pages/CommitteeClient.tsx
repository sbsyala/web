"use client";

import Image from "next/image";
import PageHero from "@/components/PageHero";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  members: any[];
}

export default function CommitteeClient({ members }: Props) {
  const { t } = useLanguage();

  return (
    <>
      <PageHero
        title={t.committee.pageTitle}
        subtitle={t.committee.pageSubtitle}
      />

      <section className="mx-auto max-w-7xl px-4 py-12">
        {members.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl text-center text-slate-500 border border-amber-100">
            {t.committee.emptyText}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {members.map((m) => {
              const translatedPos = t.positions[m.position] || m.position;
              return (
                <div
                  key={m.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-amber-100 hover:shadow-xl hover:-translate-y-1 transition"
                >
                  <div className="relative w-full aspect-square bg-amber-50">
                    <Image
                      src={m.image}
                      alt={m.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 300px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="p-4 text-center">
                    <div className="text-xs uppercase tracking-wider text-amber-800 font-bold truncate">
                      {translatedPos}
                    </div>
                    <div className="mt-1 text-base font-bold text-[color:var(--brand)] truncate">
                      {m.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-14 grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl brand-gradient text-white p-6 shadow-sm">
            <h3 className="text-xl font-bold">{t.committee.rolesHeading}</h3>
            <p className="mt-3 text-amber-100 leading-relaxed text-sm">
              {t.committee.rolesDesc}
            </p>
          </div>
          <div className="rounded-2xl bg-white border border-amber-200 p-6 shadow-sm">
            <h3 className="text-xl font-bold text-[color:var(--brand)]">
              {t.committee.subcommitteeHeading}
            </h3>
            <p className="mt-3 text-slate-700 leading-relaxed text-sm">
              {t.committee.subcommitteeDesc}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
