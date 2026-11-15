"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import PageHero from "@/components/PageHero";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  members: any[];
}

export default function MembersClient({ members }: Props) {
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type") || "all";

  const [activeType, setActiveType] = useState<string>(initialType);
  const [search, setSearch] = useState<string>("");

  const types = [
    { key: "all", label: t.memberTypes.all, icon: "👥" },
    { key: "founder", label: t.memberTypes.founder, icon: "🏛️" },
    { key: "honorary", label: t.memberTypes.honorary, icon: "🎖️" },
    { key: "life", label: t.memberTypes.life, icon: "🌟" },
    { key: "general", label: t.memberTypes.general, icon: "👤" },
  ];

  const filtered = members.filter((m) => {
    const matchesType = activeType === "all" || m.membershipType === activeType;
    const query = search.toLowerCase().trim();
    if (!query) return matchesType;

    const matchesQuery =
      (m.name && m.name.toLowerCase().includes(query)) ||
      (m.nameNe && m.nameNe.toLowerCase().includes(query)) ||
      (m.education && m.education.toLowerCase().includes(query)) ||
      (m.profession && m.profession.toLowerCase().includes(query)) ||
      (m.bahalBahi && m.bahalBahi.toLowerCase().includes(query)) ||
      (m.membershipNo && m.membershipNo.toLowerCase().includes(query));

    return matchesType && matchesQuery;
  });

  function getBadgeColor(type: string) {
    switch (type) {
      case "founder":
        return "bg-amber-100 text-amber-900 border-amber-300";
      case "honorary":
        return "bg-purple-100 text-purple-900 border-purple-300";
      case "life":
        return "bg-emerald-100 text-emerald-900 border-emerald-300";
      default:
        return "bg-blue-100 text-blue-900 border-blue-300";
    }
  }

  function getTypeName(type: string) {
    switch (type) {
      case "founder":
        return t.memberTypes.founder;
      case "honorary":
        return t.memberTypes.honorary;
      case "life":
        return t.memberTypes.life;
      default:
        return t.memberTypes.general;
    }
  }

  return (
    <>
      <PageHero
        title={t.membersPage.title}
        subtitle={t.membersPage.subtitle}
      />

      <section className="mx-auto max-w-7xl px-4 py-12 space-y-8">
        {/* Top Info Banner for Member Login / Privacy Notice */}
        <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 rounded-2xl border border-amber-200 p-5 sm:p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🔒</span>
            <div>
              <h2 className="text-sm font-bold text-amber-950">
                {t.membersPage.viewCvNotice}
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                {t.membersPage.loginToCvNotice}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            <Link
              href="/member/login?tab=register"
              className="bg-amber-500 text-slate-950 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-amber-400 shadow-md whitespace-nowrap transition"
            >
              📝 {language === "ne" ? "नयाँ सदस्य दर्ता" : "Register as Member"}
            </Link>
            <Link
              href="/member/login"
              className="bg-[color:var(--brand)] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-[color:var(--brand-dark)] shadow-md whitespace-nowrap transition"
            >
              {t.membersPage.memberLoginBtn}
            </Link>
          </div>
        </div>

        {/* Sub-tabs / Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {types.map((tp) => (
            <button
              key={tp.key}
              onClick={() => setActiveType(tp.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition shadow-sm border ${
                activeType === tp.key
                  ? "bg-[color:var(--brand)] text-white border-[color:var(--brand)] shadow"
                  : "bg-white text-slate-700 hover:bg-amber-50 border-amber-200"
              }`}
            >
              <span>{tp.icon}</span>
              <span>{tp.label}</span>
              <span className="text-[11px] opacity-75 font-mono">
                ({tp.key === "all" ? members.length : members.filter((m) => m.membershipType === tp.key).length})
              </span>
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto bg-white p-3 rounded-2xl border border-amber-200 shadow-sm flex items-center gap-3">
          <span className="text-amber-700 pl-2">🔍</span>
          <input
            type="text"
            placeholder={t.membersPage.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs sm:text-sm focus:outline-none"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="text-xs text-slate-400 hover:text-slate-600 pr-2"
            >
              ✕
            </button>
          )}
        </div>

        {/* Members Cards Grid */}
        {filtered.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl text-center text-slate-500 border border-amber-100">
            {t.membersPage.emptyText}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((m) => {
              const displayName = language === "ne" && m.nameNe ? m.nameNe : m.name;
              return (
                <div
                  key={m.id}
                  className="bg-white rounded-2xl border border-amber-200 shadow-sm hover:shadow-xl hover:border-amber-400 transition overflow-hidden flex flex-col justify-between"
                >
                  <div className="p-6 space-y-4">
                    {/* Header with Photo & Basic Info */}
                    <div className="flex gap-4 items-start">
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-amber-50 border-2 border-amber-200 shadow-sm shrink-0">
                        {m.photo ? (
                          <Image
                            src={m.photo}
                            alt={m.name}
                            fill
                            sizes="96px"
                            className="object-cover"
                            unoptimized
                          />
                        ) : (
                          <div className="w-full h-full brand-gradient text-white grid place-items-center font-bold text-2xl">
                            {m.name.charAt(0)}
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1 space-y-1">
                        <span
                          className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border ${getBadgeColor(
                            m.membershipType
                          )}`}
                        >
                          {getTypeName(m.membershipType)}
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                          {displayName}
                        </h3>
                        <p className="text-xs text-amber-800 font-mono font-semibold">
                          {t.membersPage.membershipNoLabel}: {m.membershipNo}
                        </p>
                      </div>
                    </div>

                    {/* Basic details fields visible to everyone */}
                    <div className="space-y-2.5 pt-2 border-t border-amber-100 text-xs text-slate-700">
                      {m.profession && (
                        <div className="flex items-start gap-2">
                          <span className="text-amber-700 font-bold shrink-0">🏢 {t.membersPage.professionLabel}:</span>
                          <span className="font-semibold text-slate-900">{m.profession}</span>
                        </div>
                      )}

                      {m.education && (
                        <div className="flex items-start gap-2">
                          <span className="text-amber-700 font-bold shrink-0">🎓 {t.membersPage.educationLabel}:</span>
                          <span className="text-slate-800">{m.education}</span>
                        </div>
                      )}

                      {m.bahalBahi && (
                        <div className="flex items-start gap-2">
                          <span className="text-amber-700 font-bold shrink-0">☸ {t.membersPage.monasteryLabel}:</span>
                          <span className="text-slate-800">{m.bahalBahi}</span>
                        </div>
                      )}

                      {m.address && (
                        <div className="flex items-start gap-2">
                          <span className="text-amber-700 font-bold shrink-0">📍 {t.membersPage.addressLabel}:</span>
                          <span className="text-slate-600">{m.address}</span>
                        </div>
                      )}

                      {m.bio && (
                        <p className="text-xs text-slate-600 italic line-clamp-2 pt-1 border-t border-amber-50">
                          “{m.bio}”
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="bg-amber-50/70 p-3 px-6 border-t border-amber-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-500">
                      🔒 Full CV: Member Only
                    </span>
                    <Link
                      href={`/member/login?email=${encodeURIComponent(m.email)}`}
                      className="text-[11px] font-bold text-[color:var(--brand)] hover:underline flex items-center gap-1"
                    >
                      <span>Member Login →</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
