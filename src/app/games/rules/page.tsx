import Link from "next/link";
import GamesNavbar from "@/components/games/GamesNavbar";

export const metadata = {
  title: "बाघचाल नियम तथा रणनीति (Bagh Chal Rules) | Shakya Bajracharya Samaj Yala",
};

export default function RulesPage() {
  return (
    <div className="min-h-screen bg-[#fdf7ec]">
      <GamesNavbar />

      <main className="mx-auto max-w-4xl px-4 py-12 space-y-8">
        <div className="bg-white rounded-3xl border border-amber-200 p-8 sm:p-12 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-4xl">📖</span>
            <div>
              <span className="text-xs font-bold text-amber-800 uppercase">शाक्य बज्राचार्य समाज यल</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#7a1f1f]">
                बाघचाल खेलको सम्पूर्ण नियम तथा रणनीति
              </h1>
            </div>
          </div>

          <div className="space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base border-t border-amber-100 pt-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-2">
                १. खेलको परिचय र बिसात (The Board & Pieces)
              </h2>
              <p>
                बाघचाल ५×५ को २५ वटा विन्दु (intersections) भएको बिसातमा खेलिन्छ ।
                यसमा तेर्सो, ठाडो र कोणीय (diagonal) रेखाहरु हुन्छन् । खेल सुरु हुँदा ४ वटा कुनामा ४ वटा बाघ राखिन्छन् र बाख्रा पक्षसँग २० वटा बाख्रा हुन्छन् ।
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-2">
                २. बाख्रा राख्ने चरण (Placement Phase)
              </h2>
              <p>
                खेल बाख्राले सुरु गर्छ । बाख्रा खेलाडीले बिसातको कुनै पनि खाली विन्दुमा १-१ गरी २० वटै बाख्रा नराखुन्जेल बाख्रा सार्न पाइँदैन । यस चरणमा बाघले १ पाइला सर्न वा बाख्रालाई नाघेर शिकार गर्न सक्छ ।
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-2">
                ३. चाल चाल्ने चरण (Movement Phase)
              </h2>
              <p>
                २० वटै बाख्रा बिसातमा राखिसकेपछि मात्र बाख्राहरु जोडिएका रेखाहरुमा १-१ पाइला खाली ठाउँमा सर्न पाउँछन् ।
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-2">
                ४. बाघको शिकार गर्ने नियम (Capturing Goats)
              </h2>
              <p>
                बाघको नजिकै बाख्रा भएमा र सोही सीधा रेखाको लगत्तै पछिल्लो विन्दु खाली भएमा, बाघ बाख्रामाथि उफ्रिएर त्यो खाली विन्दुमा पुग्छ र बीचको बाख्रा खाइन्छ (बिसातबाट हटाइन्छ) ।
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-2">
                ५. जितका सर्तहरु (Winning Conditions)
              </h2>
              <ul className="list-disc list-inside space-y-1.5 pl-2">
                <li><b>बाघको जित:</b> बाघले कम्तीमा ५ वटा बाख्रा खाएमा बाघ जित्छ ।</li>
                <li><b>बाख्राको जित:</b> बाख्राले मिलेर चारैतिरबाट घेरेर ४ वटै बाघलाई कुनै पनि दिशामा चाल चाल्न नसक्ने गरी थुनेमा बाख्राको जित हुन्छ ।</li>
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t border-amber-100 text-center">
            <Link
              href="/games/bagh-chal"
              className="inline-flex items-center gap-2 bg-[color:var(--brand)] text-white font-bold px-8 py-3 rounded-full shadow-lg hover:bg-[color:var(--brand-dark)] transition"
            >
              <span>🐅 अहिले नै बाघचाल खेल्नुहोस् (Play Now)</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
