import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SITE } from "@/lib/site-data";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: {
    default: `${SITE.nameEn} — ${SITE.nameNe}`,
    template: `%s | ${SITE.nameEn}`,
  },
  description:
    "The Society of Shakya, Bajracharya Lalitpur, Nepal (शाक्य बज्राचार्य समाज, यल) — dedicated to the religious, social, cultural, educational and economic development of the Shakya & Bajracharya community of Lalitpur.",
  keywords: [
    "Shakya Bajracharya Samaj Yala",
    "शाक्य बज्राचार्य समाज",
    "Newar Buddhist",
    "Lalitpur",
    "Patan",
    "Nepal",
    "Vajrayana",
    "Buddhism",
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ne" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased">
        <LanguageProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
