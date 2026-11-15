"use client";

import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageHero
        title={t.contact.pageTitle}
        subtitle={t.contact.pageSubtitle}
      />

      <section className="mx-auto max-w-6xl px-4 py-12 grid gap-8 lg:grid-cols-5">
        <aside className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl brand-gradient text-white p-6 shadow-md">
            <h2 className="text-xl font-bold">{t.site.name}</h2>
            <p className="text-amber-100 text-xs mt-1">{t.site.fullName}</p>
            <ul className="mt-6 space-y-3.5 text-sm">
              <li className="flex gap-3 items-start">
                <span className="text-amber-300 text-base">📍</span>
                <span>
                  <strong className="text-amber-200 block text-xs">{t.contact.officeAddressTitle}:</strong>
                  {t.site.address}
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <span className="text-amber-300 text-base">📞</span>
                <div>
                  <span className="text-amber-200 block text-xs">Phone:</span>
                  <a
                    href={`tel:${t.site.phoneRaw}`}
                    className="hover:text-amber-300 font-semibold"
                  >
                    {t.site.phone}
                  </a>
                </div>
              </li>
              <li className="flex gap-3 items-center">
                <span className="text-amber-300 text-base">✉</span>
                <div className="overflow-hidden">
                  <span className="text-amber-200 block text-xs">Email:</span>
                  <a
                    href={`mailto:${t.site.email}`}
                    className="hover:text-amber-300 font-semibold break-all text-xs sm:text-sm"
                  >
                    {t.site.email}
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl overflow-hidden border border-amber-200 shadow-sm bg-white">
            <iframe
              title="Lalitpur Map"
              src="https://www.google.com/maps?q=Ha+Kha+Tole+Lalitpur+Nepal&output=embed"
              className="w-full h-72"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </aside>

        <div className="lg:col-span-3 bg-white rounded-2xl border border-amber-100 p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-[color:var(--brand)] section-heading-left">
            {t.contact.formTitle}
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            {t.contact.formSubtitle}
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
