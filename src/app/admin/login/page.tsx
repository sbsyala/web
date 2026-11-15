"use client";

import { useState } from "react";
import Link from "next/link";
import { DEFAULT_ADMIN_PASS, DEFAULT_ADMIN_USER } from "@/lib/auth-constants";
import { setClientAdminToken } from "@/lib/api-client";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "लगइन असफल भयो।");

      if (data.token) {
        setClientAdminToken(data.token);
      }

      // Force a full page navigation. Include the token in the URL as a final
      // fallback so the dashboard can authenticate even if storage is blocked.
      const fallback = data.token ? `?token=${encodeURIComponent(data.token)}` : "";
      window.location.assign(`/admin/dashboard${fallback}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "लगइन गर्न सकिएन ।");
      setLoading(false);
    }
  }

  function fillDemoCredentials() {
    setUsername(DEFAULT_ADMIN_USER);
    setPassword(DEFAULT_ADMIN_PASS);
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full brand-gradient text-white text-3xl font-bold shadow-xl ring-4 ring-amber-400 mb-3">
          ☸
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          शाक्य बज्राचार्य समाज, यल
        </h2>
        <p className="mt-1 text-sm text-amber-300 font-medium">
          व्यवस्थापक नियन्त्रण कक्ष (Admin Control Panel)
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-2xl rounded-2xl sm:px-10 border border-slate-700">
          <form className="space-y-5" onSubmit={handleLogin}>
            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700 border border-red-200">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-slate-800">
                प्रयोगकर्ता नाम (Username)
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  autoComplete="username"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-800">
                पासवर्ड (Password)
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 rounded-xl shadow-md text-sm font-bold text-white brand-gradient hover:opacity-95 focus:outline-none disabled:opacity-50 transition"
            >
              {loading ? "लगइन हुँदैछ..." : "प्रवेश गर्नुहोस् (Log In)"}
            </button>
          </form>

          {/* Quick Demo Hint */}
          <div className="mt-6 border-t border-slate-200 pt-4 text-center">
            <p className="text-xs text-slate-500">
              पूर्वनिर्धारित लगइन (Default Admin Access):
            </p>
            <div className="mt-1 inline-flex items-center gap-2 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg text-xs font-mono text-amber-900">
              <span>user: <b>admin</b></span>
              <span>•</span>
              <span>pass: <b>yala2075</b></span>
            </div>
            <div className="mt-2">
              <button
                type="button"
                onClick={fillDemoCredentials}
                className="text-xs text-[color:var(--brand)] font-semibold hover:underline"
              >
                यहाँ क्लिक गरी विवरण स्वतः भर्नुहोस् (Auto Fill)
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-xs text-slate-600 hover:text-[color:var(--brand)] transition"
            >
              ← मुख्य वेबसाइटमा फर्कनुहोस्
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
