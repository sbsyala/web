"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/api-client";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({
    marquee_text: "",
    phone: "",
    phone_raw: "",
    email: "",
    address: "",
    tagline: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadSettings() {
      try {
        setLoading(true);
        const res = await adminFetch("/api/admin/settings");
        const data = await res.json();
        if (data.settings) {
          setSettings((prev) => ({ ...prev, ...data.settings }));
        }
      } catch (err) {
        console.error("Load settings error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    setError("");

    try {
      const res = await adminFetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "सेटिङ सुरक्षित गर्न असफल भयो।");

      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "त्रुटि भयो।");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">
          वेबसाइट सेटिङ (Site Settings)
        </h1>
        <p className="text-xs text-slate-600 mt-1">
          वेबसाइटको माथिल्लो पट्टीमा चल्ने सूचना (Ticker), सम्पर्क नम्बर, इमेल र ठेगाना परिवर्तन गर्नुहोस्।
        </p>
      </div>

      {loading ? (
        <div className="bg-white p-12 rounded-2xl border text-center text-slate-500">
          लोड हुँदैछ...
        </div>
      ) : (
        <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-5 text-sm">
          {success && (
            <div className="p-3 bg-green-50 text-green-800 text-xs font-semibold rounded-lg border border-green-200">
              ✅ सेटिङ सफलतापूर्वक सुरक्षित भयो !
            </div>
          )}
          {error && (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <div>
            <label className="block font-semibold text-slate-800 mb-1">
              📢 सूचना पट्टी (Marquee Announcement Ticker)
            </label>
            <textarea
              rows={3}
              value={settings.marquee_text || ""}
              onChange={(e) => setSettings({ ...settings, marquee_text: e.target.value })}
              placeholder="✦ मूल विहारका आजुहरुका लागि सहयोग अभियान जारी छ ✦ बुद्ध जयन्ती..."
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
            <p className="text-xs text-slate-500 mt-1">
              वेबसाइटको गृहपृष्ठमा चल्ने मुख्य सूचनाको सन्देश ।
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-800 mb-1">
                फोन नम्बर (Nepali script)
              </label>
              <input
                type="text"
                value={settings.phone || ""}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                placeholder="०१-५५४१८६८"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-800 mb-1">
                फोन नम्बर (Calling link raw format)
              </label>
              <input
                type="text"
                value={settings.phone_raw || ""}
                onChange={(e) => setSettings({ ...settings, phone_raw: e.target.value })}
                placeholder="+977-1-5541868"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-800 mb-1">
                आधिकारिक इमेल (Email)
              </label>
              <input
                type="email"
                value={settings.email || ""}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                placeholder="shakyabajracharyasamajyala@gmail.com"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-800 mb-1">
                कार्यालयको ठेगाना (Address)
              </label>
              <input
                type="text"
                value={settings.address || ""}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                placeholder="हःखाटोल, वडा १२, ललितपुर, नेपाल"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-800 mb-1">
              समाजको मूल नारा (Tagline)
            </label>
            <input
              type="text"
              value={settings.tagline || ""}
              onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
              placeholder="समुन्नत, सुसंस्कार, सद्भाव र शान्तिपूर्ण समाज समृद्धिका आधार"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-xl brand-gradient text-white text-sm font-bold shadow-md hover:opacity-95 disabled:opacity-50 transition"
            >
              {saving ? "सुरक्षित हुँदैछ..." : "💾 सेटिङ सुरक्षित गर्नुहोस्"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
