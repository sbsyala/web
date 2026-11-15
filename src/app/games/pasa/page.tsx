import Link from "next/link";
import GamesNavbar from "@/components/games/GamesNavbar";

export const metadata = {
  title: "पासा (Pasa / Chaupar) — परम्परागत नेवार खेल | Shakya Bajracharya Samaj Yala",
};

export default function PasaGamePage() {
  return (
    <div className="min-h-screen bg-[#fdf7ec]">
      <GamesNavbar />

      <main className="mx-auto max-w-4xl px-4 py-12 space-y-8">
        <div className="bg-white rounded-3xl border border-amber-200 p-8 sm:p-12 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🎲</span>
            <div>
              <span className="text-xs font-bold text-amber-800 uppercase">नेवार साँस्कृतिक सम्पदा खेल</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#7a1f1f]">
                पासा (Pasa / Chaupar) को इतिहास तथा महत्व
              </h1>
            </div>
          </div>

          <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base border-t border-amber-100 pt-6">
            <p>
              <b>पासा (Pasa)</b> नेवार समुदाय तथा काठमाडौं उपत्यकाको सबैभन्दा प्राचीन र लोकप्रिय कौडा/गोटी खेल हो ।
              विशेष गरी <b>म्हपूजा</b>, <b>स्वन्ती (तिहार)</b>, र विभिन्न पारिवारिक उत्सवहरुमा शाक्य र बज्राचार्य परिवारमा पासा खेल्ने समृद्ध परम्परा रहेको छ ।
            </p>
            <p>
              यस खेलमा कपडा वा मखमलको क्रस-आकारको बिसात (Chaupar Board) मा ४ खेलाडीले आ-आफ्ना ४-४ वटा गोटीहरुलाई कौडा (Cowrie Shells) को चाल अनुसार सुरक्षित घर (Home) मा पुर्‍याउने प्रतिस्पर्धा गर्दछन् ।
            </p>
            <p>
              पासा खेलले धैर्यता, गणितीय सोच, पारिवारिक मिलनसारिता र सौहार्दपूर्ण सम्बन्ध विकास गर्न मद्दत गर्दछ ।
            </p>
          </div>

          <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-amber-950">
                बाघचाल सिधै अनलाइन खेल्न चाहनुहुन्छ?
              </h3>
              <p className="text-xs text-slate-600">
                अहिले कम्प्युटर वा साथीसँग बाघचाल खेल सुरु गर्नुहोस् ।
              </p>
            </div>
            <Link
              href="/games/bagh-chal"
              className="bg-[color:var(--brand)] text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-xl hover:bg-[color:var(--brand-dark)] shadow"
            >
              🐅 बाघचाल खेल्नुहोस् →
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
