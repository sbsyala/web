"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ImageUploadInput from "@/components/admin/ImageUploadInput";
import { adminFetch } from "@/lib/api-client";

interface NoticeItem {
  id: number;
  title: string;
  dateNe: string;
  body: string;
  image: string | null;
  isActive: boolean;
  createdAt: string;
}

export default function AdminNoticesPage() {
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [dateNe, setDateNe] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [image, setImage] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadNotices() {
    try {
      setLoading(true);
      const res = await adminFetch("/api/admin/notices");
      const data = await res.json();
      setNotices(data.notices || []);
    } catch (err) {
      console.error("Load notices error:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNotices();
  }, []);

  function openCreateModal() {
    setEditingId(null);
    setTitle("");
    setDateNe(`२०८१ ${new Date().toLocaleDateString("ne-NP", { month: "long" })}`);
    setBodyText("");
    setImage("");
    setIsActive(true);
    setError("");
    setIsModalOpen(true);
  }

  function openEditModal(n: NoticeItem) {
    setEditingId(n.id);
    setTitle(n.title);
    setDateNe(n.dateNe);
    try {
      const parsed = JSON.parse(n.body);
      setBodyText(Array.isArray(parsed) ? parsed.join("\n\n") : n.body);
    } catch {
      setBodyText(n.body);
    }
    setImage(n.image || "");
    setIsActive(n.isActive);
    setError("");
    setIsModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const paragraphs = bodyText
      .split("\n")
      .map((p) => p.trim())
      .filter(Boolean);

    try {
      const res = await adminFetch("/api/admin/notices", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingId,
          title,
          dateNe,
          paragraphs,
          image,
          isActive,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "सुरक्षित गर्न असफल भयो।");

      setIsModalOpen(false);
      await loadNotices();
    } catch (err) {
      setError(err instanceof Error ? err.message : "त्रुटि भयो।");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number, t: string) {
    if (!confirm(`के तपाईं "${t}" सूचना मेटाउन निश्चित हुनुहुन्छ?`)) return;

    try {
      const res = await adminFetch(`/api/admin/notices?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setNotices((prev) => prev.filter((n) => n.id !== id));
      } else {
        alert("मेटाउन सकिएन ।");
      }
    } catch {
      alert("मेटाउन सकिएन ।");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            सूचना व्यवस्थापन (Notices & Announcements)
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            मूल विहारका सूचना, आपतकालीन सहयोग, बैठक वा आम भेला सम्बन्धी सूचना पोष्ट गर्नुहोस्।
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="bg-[color:var(--brand)] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-[color:var(--brand-dark)] shadow flex items-center gap-2 justify-center transition"
        >
          <span>📢 + नयाँ सूचना पोष्ट गर्नुहोस्</span>
        </button>
      </div>

      {loading ? (
        <div className="bg-white p-12 rounded-2xl border text-center text-slate-500">
          सूचनाहरु लोड हुँदैछ...
        </div>
      ) : notices.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border text-center text-slate-500">
          कुनै सूचना फेला परेन ।
        </div>
      ) : (
        <div className="space-y-4">
          {notices.map((n) => (
            <div
              key={n.id}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-5 items-start justify-between"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                    📅 {n.dateNe}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      n.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {n.isActive ? "सक्रिय (Active)" : "निष्क्रिय (Inactive)"}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{n.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-2">
                  {n.body.replace(/[\[\]"']/g, " ")}
                </p>
              </div>

              {n.image && (
                <div className="relative w-20 h-20 rounded-xl overflow-hidden border bg-slate-100 shrink-0">
                  <Image
                    src={n.image}
                    alt={n.title}
                    fill
                    sizes="80px"
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => openEditModal(n)}
                  className="px-3 py-1.5 rounded-lg bg-amber-100 text-amber-900 text-xs font-medium hover:bg-amber-200"
                >
                  ✏️ सम्पादन
                </button>
                <button
                  onClick={() => handleDelete(n.id, n.title)}
                  className="px-3 py-1.5 rounded-lg bg-red-50 text-red-700 text-xs font-medium hover:bg-red-100"
                >
                  🗑️ मेटाउनुहोस्
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-300 my-8">
            <div className="brand-gradient text-white px-6 py-4 flex items-center justify-between">
              <h2 className="text-base font-bold">
                {editingId ? "सूचना सम्पादन" : "नयाँ सूचना पोष्ट गर्नुहोस्"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white hover:text-amber-200 text-xl"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 text-sm">
              {error && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
                  {error}
                </div>
              )}

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  सूचनाको शीर्षक <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="उदा. जरुरी सूचना — मूल बिहारका आजुहरुका लागि सहयोग अभियान"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  मिति (नेपाली) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="उदा. २०८१ जेठ"
                  value={dateNe}
                  onChange={(e) => setDateNe(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  सूचनाको व्यहोरा (Notice Text) <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="सूचनाको पूर्ण विवरण..."
                  value={bodyText}
                  onChange={(e) => setBodyText(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <ImageUploadInput
                label="सूचनाको ब्यानर / फोटो (वैकल्पिक)"
                value={image}
                onChange={setImage}
              />

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="active_checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 text-amber-600 rounded"
                />
                <label htmlFor="active_checkbox" className="text-sm text-slate-700 font-medium">
                  सूचनालाई सक्रिय (Active) राख्नुहोस्
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                >
                  रद्द
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl brand-gradient text-white text-xs font-bold shadow hover:opacity-95 disabled:opacity-50"
                >
                  {saving ? "सुरक्षित हुँदैछ..." : "💾 सुरक्षित गर्नुहोस्"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
