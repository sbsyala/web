"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ImageUploadInput from "@/components/admin/ImageUploadInput";
import { adminFetch } from "@/lib/api-client";

interface ActivityItem {
  id: number;
  slug: string;
  title: string;
  dateNe: string;
  dateEn: string;
  cover: string;
  excerpt: string;
  body: string;
  gallery: string | null;
  published: boolean;
  createdAt: string;
}

export default function AdminActivitiesPage() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [dateNe, setDateNe] = useState("");
  const [dateEn, setDateEn] = useState("");
  const [cover, setCover] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [paragraphsText, setParagraphsText] = useState("");
  const [galleryUrlsText, setGalleryUrlsText] = useState("");
  const [published, setPublished] = useState(true);
  const [formSaving, setFormSaving] = useState(false);
  const [formError, setFormError] = useState("");

  async function loadActivities() {
    try {
      setLoading(true);
      const res = await adminFetch("/api/admin/activities");
      const data = await res.json();
      setActivities(data.activities || []);
    } catch (err) {
      console.error("Fetch activities error:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadActivities();
  }, []);

  function openCreateModal() {
    setEditingId(null);
    setTitle("");
    setDateNe(`२०८१ ${new Date().toLocaleDateString("ne-NP", { month: "long", day: "numeric" })}`);
    setDateEn(new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }));
    setCover("");
    setExcerpt("");
    setParagraphsText("");
    setGalleryUrlsText("");
    setPublished(true);
    setFormError("");
    setIsModalOpen(true);
  }

  function openEditModal(act: ActivityItem) {
    setEditingId(act.id);
    setTitle(act.title);
    setDateNe(act.dateNe);
    setDateEn(act.dateEn);
    setCover(act.cover);
    setExcerpt(act.excerpt);

    try {
      const parsedBody = JSON.parse(act.body);
      setParagraphsText(Array.isArray(parsedBody) ? parsedBody.join("\n\n") : act.body);
    } catch {
      setParagraphsText(act.body);
    }

    try {
      if (act.gallery) {
        const parsedGallery = JSON.parse(act.gallery);
        setGalleryUrlsText(Array.isArray(parsedGallery) ? parsedGallery.join("\n") : "");
      } else {
        setGalleryUrlsText("");
      }
    } catch {
      setGalleryUrlsText("");
    }

    setPublished(act.published);
    setFormError("");
    setIsModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setFormSaving(true);
    setFormError("");

    const paragraphs = paragraphsText
      .split("\n")
      .map((p) => p.trim())
      .filter(Boolean);

    const galleryImages = galleryUrlsText
      .split("\n")
      .map((u) => u.trim())
      .filter(Boolean);

    const payload = {
      id: editingId,
      title,
      dateNe,
      dateEn,
      cover,
      excerpt,
      paragraphs,
      galleryImages,
      published,
    };

    try {
      const res = await adminFetch("/api/admin/activities", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "सुरक्षित गर्न असफल भयो।");

      setIsModalOpen(false);
      await loadActivities();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "त्रुटि भयो।");
    } finally {
      setFormSaving(false);
    }
  }

  async function handleDelete(id: number, actTitle: string) {
    if (!confirm(`के तपाईं "${actTitle}" गतिविधि मेटाउन निश्चित हुनुहुन्छ?`)) return;

    try {
      const res = await adminFetch(`/api/admin/activities?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setActivities((prev) => prev.filter((a) => a.id !== id));
      } else {
        alert("मेटाउन सकिएन ।");
      }
    } catch {
      alert("मेटाउन सकिएन ।");
    }
  }

  const filtered = activities.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.excerpt.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            गतिविधि व्यवस्थापन (Activities & News)
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            समाजका कार्यक्रम, साधारण सभा, भित्तेपात्र, शुभकामना आदानप्रदान आदि पोष्ट गर्नुहोस्।
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="bg-[color:var(--brand)] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-[color:var(--brand-dark)] shadow flex items-center gap-2 justify-center transition"
        >
          <span>➕ नयाँ गतिविधि पोष्ट गर्नुहोस्</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-3">
        <span className="text-slate-400">🔍</span>
        <input
          type="text"
          placeholder="गतिविधि खोज्नुहोस् (Search by title or text)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full text-sm focus:outline-none"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="text-xs text-slate-400 hover:text-slate-600"
          >
            हटाउनुहोस्
          </button>
        )}
      </div>

      {/* List */}
      {loading ? (
        <div className="bg-white p-12 rounded-2xl border text-center text-slate-500">
          लोड हुँदैछ...
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border text-center text-slate-500">
          कुनै गतिविधि फेला परेन । "+ नयाँ गतिविधि पोष्ट गर्नुहोस्" थिचेर नयाँ सामग्री थप्नुहोस् ।
        </div>
      ) : (
        <div className="grid gap-4">
          {filtered.map((act) => (
            <div
              key={act.id}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-5 items-start justify-between hover:border-amber-300 transition"
            >
              <div className="flex gap-4 items-start w-full md:w-auto">
                <div className="relative w-24 h-20 sm:w-32 sm:h-24 rounded-xl overflow-hidden bg-slate-100 shrink-0 border">
                  <Image
                    src={act.cover}
                    alt={act.title}
                    fill
                    sizes="128px"
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                      📅 {act.dateNe}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        act.published
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {act.published ? "✅ प्रकाशित (Published)" : "⏸ ड्राफ्ट"}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 line-clamp-1">
                    {act.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {act.excerpt}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto justify-end shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                <a
                  href={`/activities/${act.slug}`}
                  target="_blank"
                  className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium hover:bg-slate-200 transition"
                >
                  👁️ हेर्नुहोस्
                </a>
                <button
                  onClick={() => openEditModal(act)}
                  className="px-3 py-1.5 rounded-lg bg-amber-100 text-amber-900 text-xs font-medium hover:bg-amber-200 transition"
                >
                  ✏️ सम्पादन
                </button>
                <button
                  onClick={() => handleDelete(act.id, act.title)}
                  className="px-3 py-1.5 rounded-lg bg-red-50 text-red-700 text-xs font-medium hover:bg-red-100 transition"
                >
                  🗑️ मेटाउनुहोस्
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-300 my-8">
            {/* Modal Header */}
            <div className="brand-gradient text-white px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">
                {editingId ? "गतिविधि सम्पादन गर्नुहोस्" : "नयाँ गतिविधि पोष्ट गर्नुहोस्"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white hover:text-amber-200 text-xl"
              >
                ✕
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto flex-1 text-sm">
              {formError && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
                  {formError}
                </div>
              )}

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  गतिविधिको शीर्षक (Title) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="उदा. बुद्ध जयन्तीको अवसरमा शुभकामना आदानप्रदान कार्यक्रम"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    नेपाली मिति (Date in BS) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="उदा. २०८१ बैशाख २७"
                    value={dateNe}
                    onChange={(e) => setDateNe(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    अंग्रेजी मिति (Date in AD)
                  </label>
                  <input
                    type="text"
                    placeholder="उदा. May 12, 2024"
                    value={dateEn}
                    onChange={(e) => setDateEn(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Cover Image Upload */}
              <ImageUploadInput
                label="मुख्य कभर तस्वीर (Cover Image)"
                value={cover}
                onChange={setCover}
                required
              />

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  छोटो सारांश (Short Excerpt) <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="गतिविधिको मुख्य सार १-२ वाक्यमा..."
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  पूर्ण विवरण (Full Story / Paragraphs)
                </label>
                <textarea
                  rows={6}
                  placeholder="गतिविधिको विस्तृत विवरण लेख्नुहोस् । प्रत्येक अनुच्छेद (paragraph) लाई नयाँ पंक्ति (Enter) मा छुट्याउनुहोस्..."
                  value={paragraphsText}
                  onChange={(e) => setParagraphsText(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  थप तस्वीरहरुका URL हरु (Additional Gallery Images) — प्रत्येक लाइनमा एक URL
                </label>
                <textarea
                  rows={3}
                  placeholder="https://example.com/photo1.jpg&#10;https://example.com/photo2.jpg"
                  value={galleryUrlsText}
                  onChange={(e) => setGalleryUrlsText(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-mono focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="published_checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="w-4 h-4 text-amber-600 rounded"
                />
                <label htmlFor="published_checkbox" className="text-sm font-medium text-slate-700">
                  तुरुन्त वेबसाइटमा प्रकाशित गर्नुहोस् (Publish Immediately)
                </label>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                >
                  रद्द गर्नुहोस्
                </button>
                <button
                  type="submit"
                  disabled={formSaving}
                  className="px-6 py-2.5 rounded-xl brand-gradient text-white text-xs font-bold shadow-md hover:opacity-95 disabled:opacity-50"
                >
                  {formSaving ? "सुरक्षित हुँदैछ..." : "💾 सुरक्षित गर्नुहोस्"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
