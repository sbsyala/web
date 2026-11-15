"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function PageHero({
  title,
  subtitle,
  breadcrumb,
}: {
  title: string;
  subtitle?: ReactNode;
  breadcrumb?: string;
}) {
  const { t } = useLanguage();

  return (
    <section className="brand-gradient text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16 text-center dharma-pattern">
        <div className="text-4xl mb-3 animate-pulse">☸</div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-md">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 text-amber-100 max-w-2xl mx-auto text-sm sm:text-base">
            {subtitle}
          </p>
        )}
        <nav className="mt-5 text-xs sm:text-sm text-amber-100 flex items-center justify-center gap-2">
          <Link href="/" className="hover:text-white underline underline-offset-2">
            {t.nav.home}
          </Link>
          <span>/</span>
          <span className="text-white font-medium">{breadcrumb ?? title}</span>
        </nav>
      </div>
    </section>
  );
}
