"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { adminFetch, clearClientAdminToken, getClientAdminToken, stripTokenFromUrl } from "@/lib/api-client";

const ADMIN_NAV = [
  { href: "/admin/dashboard", label: "ड्यासबोर्ड (Dashboard)", icon: "📊" },
  { href: "/admin/members", label: "सदस्यहरु (Members Directory)", icon: "👥" },
  { href: "/admin/activities", label: "गतिविधि / पोष्ट (Activities)", icon: "📰" },
  { href: "/admin/gallery", label: "तस्वीर संग्रह (Gallery)", icon: "🖼️" },
  { href: "/admin/notices", label: "सूचनाहरु (Notices)", icon: "📢" },
  { href: "/admin/committee", label: "कार्यसमिति (Committee)", icon: "🏛️" },
  { href: "/admin/messages", label: "सन्देशहरु (Messages)", icon: "✉️" },
  { href: "/admin/settings", label: "वेबसाइट सेटिङ (Settings)", icon: "⚙️" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);
  const [adminUser, setAdminUser] = useState<{ username: string; name: string } | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setChecking(false);
      return;
    }

    let isMounted = true;

    async function checkAuth() {
      try {
        // First, ensure a token exists client-side
        const token = getClientAdminToken();
        if (!token) {
          if (isMounted) window.location.replace("/admin/login");
          return;
        }

        let res = await adminFetch("/api/admin/me");

        // Single retry in case of a transient network error
        if (!res.ok) {
          await new Promise((r) => setTimeout(r, 400));
          res = await adminFetch("/api/admin/me");
        }

        if (!res.ok) {
          clearClientAdminToken();
          if (isMounted) window.location.replace("/admin/login");
          return;
        }

        const data = await res.json();
        if (data.authenticated && isMounted) {
          // The token (from storage or URL) has already been persisted by
          // getClientAdminToken(); now clean the URL for hygiene.
          stripTokenFromUrl();
          setAdminUser(data.user);
          setChecking(false);
        } else if (isMounted) {
          clearClientAdminToken();
          window.location.replace("/admin/login");
        }
      } catch {
        if (isMounted) {
          clearClientAdminToken();
          window.location.replace("/admin/login");
        }
      }
    }

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [pathname, isLoginPage]);

  async function handleLogout() {
    clearClientAdminToken();
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {
      // ignore
    }
    window.location.replace("/admin/login");
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-slate-900 grid place-items-center text-white">
        <div className="text-center space-y-3">
          <div className="text-4xl animate-spin">☸</div>
          <p className="text-sm text-amber-300">व्यवस्थापक कक्ष लोड हुँदैछ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex md:w-64 flex-col bg-slate-900 text-white shrink-0 border-r border-slate-800">
        {/* Brand */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full brand-gradient text-white grid place-items-center font-bold text-lg ring-2 ring-amber-400">
            ☸
          </div>
          <div className="overflow-hidden">
            <h1 className="text-sm font-bold text-white truncate">शाक्य बज्राचार्य समाज</h1>
            <p className="text-xs text-amber-300">CPanel / व्यवस्थापक</p>
          </div>
        </div>

        {/* User info */}
        <div className="px-4 py-3 bg-slate-800/60 border-b border-slate-800 text-xs text-slate-300 flex items-center justify-between">
          <span>👤 {adminUser?.name || "Administrator"}</span>
          <span className="bg-green-600 text-white text-[10px] px-2 py-0.5 rounded-full font-mono">
            Active
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {ADMIN_NAV.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                  active
                    ? "bg-[color:var(--brand)] text-white shadow-md"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Language switch + footer actions */}
        <div className="p-3 border-t border-slate-800 space-y-2">
          <div className="flex items-center justify-center pb-2">
            <LanguageSwitcher compact />
          </div>
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 transition"
          >
            <span>🌐 मुख्य वेबसाइट खोल्नुहोस्</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg bg-red-600/80 hover:bg-red-600 text-xs font-semibold text-white transition"
          >
            <span>🚪 लगआउट (Logout)</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden bg-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-xl">☸</span>
          <span className="font-bold text-sm">CPanel / शाक्य बज्राचार्य समाज</span>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher compact />
          <button
            onClick={() => setMobileNavOpen((v) => !v)}
            className="px-3 py-1.5 rounded-lg bg-slate-800 text-amber-300 border border-slate-700 text-sm"
          >
            {mobileNavOpen ? "✕ बन्द" : "☰ मेनु"}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileNavOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 space-y-1">
          {ADMIN_NAV.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileNavOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${
                  active ? "bg-[color:var(--brand)] text-white" : "text-slate-300 hover:bg-slate-800"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
          <div className="pt-3 flex gap-2">
            <Link
              href="/"
              target="_blank"
              className="flex-1 text-center py-2 bg-slate-800 text-xs text-white rounded-lg"
            >
              🌐 वेबसाइट
            </Link>
            <button
              onClick={handleLogout}
              className="flex-1 py-2 bg-red-600 text-xs font-semibold text-white rounded-lg"
            >
              🚪 लगआउट
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto max-w-7xl">
        {children}
      </main>
    </div>
  );
}
