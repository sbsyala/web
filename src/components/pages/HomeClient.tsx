"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  initialActivities: any[];
  initialLeadership: any[];
  initialMarquee: string;
}

export default function HomeClient({
  initialActivities,
  initialLeadership,
  initialMarquee,
}: Props) {
  const { t, language } = useLanguage();
  const isNepali = language === "ne";

  return (
    <>
      {/* HERO */}
      <section className="relative brand-gradient text-white overflow-hidden">
        <div className="absolute inset-0 dharma-pattern opacity-70" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block bg-white/15 border border-amber-300/40 rounded-full px-4 py-1 text-xs sm:text-sm tracking-wider">
              {t.home.badge}
            </span>
            <h1 className="mt-4 text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight drop-shadow">
              {t.home.heroTitle}
            </h1>
            <p className="mt-2 text-amber-100 text-sm sm:text-base">
              {t.home.heroSubtitle}
            </p>
            <p className="mt-6 text-base sm:text-lg italic text-amber-50 border-l-4 border-amber-300 pl-4">
              {t.home.heroQuote}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/about"
                className="bg-amber-400 text-[color:var(--brand-dark)] font-bold px-6 py-3 rounded-full shadow hover:bg-amber-300 transition text-sm"
              >
                {t.home.aboutBtn}
              </Link>
              <Link
                href="/games/bagh-chal"
                className="bg-white/20 border border-amber-300 text-white font-bold px-6 py-3 rounded-full hover:bg-white/30 transition text-sm flex items-center gap-1.5 shadow"
              >
                <span>🐅</span>
                <span>{isNepali ? "बाघचाल खेल्नुहोस्" : "Play Bagh Chal"}</span>
              </Link>
              <Link
                href="/donate"
                className="bg-white/15 border border-white/40 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/25 transition text-sm"
              >
                {t.home.donateBtn}
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 bg-amber-300/20 blur-3xl rounded-full" />
            <div className="relative aspect-square max-w-md mx-auto rounded-3xl bg-white/10 backdrop-blur border border-amber-200/40 grid place-items-center overflow-hidden shadow-2xl">
              <div className="text-center px-6">
                <div className="text-[9rem] sm:text-[10rem] leading-none opacity-90 animate-pulse">
                  ☸
                </div>
                <p className="text-amber-100 mt-2 text-sm font-semibold">
                  {t.site.established}
                </p>
                <p className="text-white/80 text-xs mt-1">Lalitpur (Yala), Nepal</p>
              </div>
            </div>
          </div>
        </div>

        {/* Notice ticker */}
        <div className="relative bg-black/30 border-y border-white/10">
          <div className="mx-auto max-w-7xl px-4 py-2 flex items-center gap-3 text-sm">
            <span className="bg-amber-400 text-[color:var(--brand-dark)] font-bold px-3 py-1 rounded-full text-xs shrink-0">
              {t.home.tickerLabel}
            </span>
            <div className="overflow-hidden flex-1">
              <div className="whitespace-nowrap animate-marquee font-medium">
                {language === "en" ? t.home.tickerDefault : initialMarquee || t.home.tickerDefault}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRADITIONAL GAMES BANNER SPOTLIGHT */}
      <section className="mx-auto max-w-7xl px-4 pt-12">
        <div className="bg-gradient-to-r from-[#5c1414] via-[#7a1f1f] to-[#4a0f0f] rounded-3xl p-6 sm:p-8 text-white shadow-xl border-2 border-amber-400 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="bg-amber-400/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-amber-400/40">
              ☸ {isNepali ? "शाक्य बज्राचार्य समाज — पुर्ख्यौली सम्पदा" : "Ancestral Heritage Gaming"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-300">
              🐅 {isNepali ? "परम्परागत नेपाली खेल: बाघचाल (Bagh Chal)" : "Traditional Nepali Game: Bagh Chal"}
            </h2>
            <p className="text-xs sm:text-sm text-amber-100/90 max-w-2xl leading-relaxed">
              {isNepali
                ? "ललितपुरका बहाः-बही र फल्चाहरुमा पुर्खाहरुले खेल्दै आएको नेपालको मौलिक बुद्धिचाल खेल । कम्प्युटर (AI) वा साथीसँग सिधै अनलाइन खेल्नुहोस् ।"
                : "Nepal's indigenous board game of strategic wits between 4 Tigers and 20 Goats. Play online against Computer AI or with friends."}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/games/bagh-chal"
              className="bg-amber-400 text-amber-950 font-black px-6 py-3 rounded-full hover:bg-amber-300 transition text-sm shadow-lg hover:scale-105 flex items-center gap-1.5"
            >
              <span>🐅</span>
              <span>{isNepali ? "अहिले नै खेल्नुहोस्" : "Play Bagh Chal Now"}</span>
            </Link>
            <Link
              href="/games"
              className="bg-white/10 text-white border border-white/30 font-semibold px-5 py-3 rounded-full hover:bg-white/20 transition text-sm"
            >
              {isNepali ? "अन्य खेलहरु →" : "View All Games →"}
            </Link>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[color:var(--brand)] section-heading">
            {t.home.introHeading}
          </h2>
          <p className="mt-6 max-w-4xl mx-auto text-slate-700 leading-loose text-[15px]">
            {t.home.introP1}
          </p>
          <div className="mt-6">
            <Link
              href="/about"
              className="inline-block text-[color:var(--brand)] font-bold hover:underline"
            >
              {t.home.readMore}
            </Link>
          </div>
        </div>

        {/* Feature strip */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.home.features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl bg-white p-6 shadow-sm border border-amber-100 hover:shadow-lg hover:-translate-y-1 transition"
            >
              <div className="text-4xl">{f.icon}</div>
              <h3 className="mt-3 text-lg font-bold text-[color:var(--brand)]">
                {f.title}
              </h3>
              <p className="mt-1 text-sm text-slate-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* OBJECTIVES SNAPSHOT */}
      <section className="bg-[color:var(--brand-cream)] border-y border-amber-200">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[color:var(--brand)] section-heading-left">
                {t.home.objectivesHeading}
              </h2>
              <p className="mt-6 text-slate-700 leading-loose">
                {t.home.objectivesDesc}
              </p>
              <Link
                href="/objectives"
                className="mt-6 inline-block bg-[color:var(--brand)] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-[color:var(--brand-dark)] shadow"
              >
                {t.home.allObjectivesBtn}
              </Link>
            </div>
            <ul className="space-y-3">
              {t.objectives.list.slice(0, 5).map((o, i) => (
                <li
                  key={i}
                  className="bg-white rounded-xl p-4 shadow-sm border border-amber-100 flex gap-3.5 items-start"
                >
                  <span className="shrink-0 w-8 h-8 rounded-full brand-gradient text-white grid place-items-center text-sm font-bold shadow-sm">
                    {i + 1}
                  </span>
                  <p className="text-sm text-slate-700 leading-relaxed pt-0.5">{o}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* COMMITTEE */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[color:var(--brand)] section-heading">
            {t.home.committeeHeading}
          </h2>
          <p className="mt-4 text-slate-600 font-medium">
            {t.home.committeeSubtitle}
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {initialLeadership.map((m) => {
            const translatedPos = t.positions[m.position] || m.position;
            return (
              <div
                key={m.id || m.name}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-amber-100 hover:shadow-lg transition"
              >
                <div className="relative w-full aspect-square bg-amber-50">
                  <Image
                    src={m.image}
                    alt={m.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 200px"
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="p-3 text-center">
                  <div className="text-[11px] uppercase tracking-wider text-amber-800 font-bold truncate">
                    {translatedPos}
                  </div>
                  <div className="mt-1 text-sm font-bold text-[color:var(--brand)] truncate">
                    {m.name}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/committee"
            className="inline-block border-2 border-[color:var(--brand)] text-[color:var(--brand)] font-bold px-6 py-2.5 rounded-full hover:bg-[color:var(--brand)] hover:text-white transition text-sm"
          >
            {t.home.allCommitteeBtn}
          </Link>
        </div>
      </section>

      {/* ACTIVITIES */}
      <section className="bg-white border-y border-amber-200">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-[color:var(--brand)] section-heading">
              {t.home.activitiesHeading}
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {initialActivities.map((a) => (
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
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/activities"
              className="text-[color:var(--brand)] font-bold hover:underline text-sm"
            >
              {t.home.allActivitiesBtn}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="brand-gradient rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl">
          <div className="text-4xl mb-3">🪷</div>
          <h2 className="text-2xl sm:text-3xl font-bold">
            {t.home.ctaHeading}
          </h2>
          <p className="mt-3 text-amber-100 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            {t.home.ctaDesc}
          </p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <Link
              href="/donate"
              className="bg-amber-400 text-[color:var(--brand-dark)] font-bold px-6 py-3 rounded-full hover:bg-amber-300 shadow text-sm"
            >
              {t.home.donateBtn}
            </Link>
            <Link
              href="/contact"
              className="border border-white text-white font-semibold px-6 py-3 rounded-full hover:bg-white/10 transition text-sm"
            >
              {t.home.contactBtn}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
