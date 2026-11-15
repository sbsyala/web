import PageHero from "@/components/PageHero";
import GamesNavbar from "@/components/games/GamesNavbar";
import BaghChalGame from "@/components/games/BaghChalGame";

export const metadata = {
  title: "बाघचाल (Bagh Chal) — परम्परागत नेपाली खेल | Shakya Bajracharya Samaj Yala",
  description:
    "Play authentic Bagh Chal (बाघचाल) - the traditional Nepalese board game of Tigers & Goats. Provided by Shakya Bajracharya Samaj Yala for preserving cultural heritage.",
};

export default function BaghChalPage() {
  return (
    <div className="min-h-screen bg-[#fdf7ec]">
      {/* Dedicated Traditional Games Navigation Bar */}
      <GamesNavbar />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <BaghChalGame />
      </main>
    </div>
  );
}
