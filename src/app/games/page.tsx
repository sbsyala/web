import Link from "next/link";
import PageHero from "@/components/PageHero";
import GamesNavbar from "@/components/games/GamesNavbar";

export const metadata = {
  title: "परम्परागत खेलहरु (Traditional Heritage Games) | Shakya Bajracharya Samaj Yala",
};

export default function GamesHubPage() {
  const gamesList = [
    {
      slug: "bagh-chal",
      titleNe: "बाघचाल (Bagh Chal)",
      titleEn: "Tigers & Goats Board Game",
      tag: "प्रत्यक्ष खेल्न मिल्ने (Interactive Game)",
      icon: "🐅",
      descNe:
        "नेपालको सबैभन्दा प्रख्यात राष्ट्रिय तथा रैथाने बौद्धिक खेल । ४ बाघ र २० बाख्रा बीचको रोमाञ्चक रणनीतिक खेल, जुन ललितपुरका बहाः-बही र चोकहरुमा परापूर्वकालदेखि खेलिंदै आएको छ ।",
      descEn:
        "Nepal's ancient two-player abstract strategy board game featuring 4 Tigers and 20 Goats. Played on brass and wooden boards in Patan's monastic courtyards.",
      cta: "अहिले खेल्नुहोस् (Play Now) →",
      featured: true,
    },
    {
      slug: "pasa",
      titleNe: "पासा (Pasa / Chaupar)",
      titleEn: "Traditional Newar Dice Game",
      tag: "साँस्कृतिक खेल (Cultural Board)",
      icon: "🎲",
      descNe:
        "कौडा र कपडाको क्रस-आकारको बिसातमा खेलिने नेवार संस्कृतिको ऐतिहासिक खेल । विशेष गरी म्हपूजा, तिहार र चाडपर्वमा परिवारमा खेलिन्छ ।",
      descEn:
        "Historic Newar dice and race game played on embroidered cloth boards with cowrie shells, deeply rooted in Mha Puja and Tihar festivities.",
      cta: "इतिहास र नियम हेर्नुहोस् →",
    },
    {
      slug: "rules",
      titleNe: "बाघचाल नियम तथा रणनीति",
      titleEn: "Bagh Chal Rules & Strategy",
      tag: "नियम पुस्तिका (Rulebook)",
      icon: "📖",
      descNe:
        "बाघचालको आधिकारिक नियम, बाख्राको चक्रव्यूह बनाउने रणनीति, र बाघको शिकार गर्ने कला सम्बन्धी पूर्ण गाइड ।",
      descEn:
        "Comprehensive guide on opening placements, defensive goat clusters, and tiger trapping tactics.",
      cta: "नियम पढ्नुहोस् →",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fdf7ec]">
      <GamesNavbar />

      <section className="mx-auto max-w-7xl px-4 py-12 space-y-12">
        {/* Banner */}
        <div className="bg-white rounded-3xl border border-amber-200 p-8 sm:p-12 shadow-sm text-center max-w-4xl mx-auto space-y-4">
          <span className="text-4xl">☸</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#7a1f1f]">
            शाक्य बज्राचार्य समाज, यल — परम्परागत नेपाली खेल मञ्च
          </h1>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-3xl mx-auto">
            ललितपुर (यल) को नेवार बौद्ध संस्कृतिमा बहाः-बही (विहार), फल्चा (पाटी) र चोकहरुमा पुर्खाहरुले
            मानसिक तीक्ष्णता, धैर्यता र मनोरञ्जनका लागि विकास गरेका रैथाने परम्परागत खेलहरुको
            संरक्षण तथा नयाँ पुस्तामा हस्तान्तरण गर्ने उद्देश्यले यो अनलाइन मञ्च तयार पारिएको हो ।
          </p>
          <div className="pt-2">
            <Link
              href="/games/bagh-chal"
              className="inline-flex items-center gap-2 bg-[color:var(--brand)] text-white font-bold px-8 py-3.5 rounded-full shadow-lg hover:bg-[color:var(--brand-dark)] transition hover:scale-105"
            >
              <span>🐅 बाघचाल सिधै खेल्नुहोस् (Play Bagh Chal Online)</span>
            </Link>
          </div>
        </div>

        {/* Games Directory Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {gamesList.map((g) => (
            <div
              key={g.slug}
              className={`bg-white rounded-3xl p-6 sm:p-8 shadow-sm border flex flex-col justify-between transition hover:shadow-xl ${
                g.featured ? "border-2 border-amber-400 ring-2 ring-amber-100" : "border-amber-200"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-4xl">{g.icon}</span>
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-200">
                    {g.tag}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  {g.titleNe}
                </h3>
                <p className="text-xs text-amber-800 font-semibold">{g.titleEn}</p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {g.descNe}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-amber-100">
                <Link
                  href={g.slug === "bagh-chal" ? "/games/bagh-chal" : `/games/${g.slug}`}
                  className="text-xs sm:text-sm font-bold text-[color:var(--brand)] hover:underline flex items-center gap-1"
                >
                  {g.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
