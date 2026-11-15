"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ImageUploadInput from "@/components/admin/ImageUploadInput";
import { adminFetch } from "@/lib/api-client";

interface GalleryItem {
  id: number;
  src: string;
  caption: string;
  category: string;
  createdAt: string;
}

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [src, setSrc] = useState("");
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("कार्यक्रम");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadGallery() {
    try {
      setLoading(true);
      const res = await adminFetch("/api/admin/gallery");
      const data = await res.json();
      setItems(data.gallery || []);
    } catch (err) {
      console.error("Load gallery error:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadGallery();
  }, []);

  function openCreateModal() {
    setEditingId(null);
    setSrc("");
    setCaption("");
    setCategory("कार्यक्रम");
    setError("");
    setIsModalOpen(true);
  }

  function openEditModal(item: GalleryItem) {
    setEditingId(item.id);
    setSrc(item.src);
    setCaption(item.caption);
    setCategory(item.category);
    setError("");
    setIsModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await adminFetch("/api/admin/gallery", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingId, src, caption, category }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "सुरक्षित गर्न असफल भयो।");

      setIsModalOpen(false);
      await loadGallery();
    } catch (err) {
      setError(err instanceof Error ? err.message : "त्रुटि भयो।");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number, cap: string) {
    if (!confirm(`के तपाईं "${cap}" तस्वीर मेटाउन चाहनुहुन्छ?`)) return;

    try {
      const res = await adminFetch(`/api/admin/gallery?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setItems((prev) => prev.filter((i) => i.id !== id));
      } else {
        alert("मेटाउन सकिएन ।");
      }
    } catch {
      alert("मेटाउन सकिएन ।");
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            तस्वीर संग्रह व्यवस्थापन (Gallery Manager)
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            वेबसाइटको तस्वीर संग्रहमा नयाँ फोटोहरु अपलोड गर्नुहोस् वा व्यवस्थापन गर्नुहोस् ।
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="bg-amber-500 text-slate-950 text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-amber-400 shadow flex items-center gap-2 justify-center transition"
        >
          <span>📸 + नयाँ तस्वीर थप्नुहोस् (Add Photo)</span>
        </button>
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="bg-white p-12 rounded-2xl border text-center text-slate-500">
          तस्वीरहरु लोड हुँदैछ...
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border text-center text-slate-500">
          कुनै तस्वीर फेला परेन । माथिको बटन थिचेर फोटो थप्नुहोस् ।
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between group"
            >
              <div className="relative aspect-square bg-slate-100">
                <Image
                  src={item.src}
                  alt={item.caption}
                  fill
                  sizes="(max-width: 768px) 50vw, 250px"
                  className="object-cover group-hover:scale-105 transition duration-300"
                  unoptimized
                />
                <span className="absolute top-2 left-2 bg-black/60 backdrop-blur text-white text-[10px] px-2 py-0.5 rounded-md">
                  {item.category}
                </span>
              </div>
              <div className="p-3">
                <p className="text-xs font-semibold text-slate-800 line-clamp-2">
                  {item.caption}
                </p>
                <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100">
                  <button
                    onClick={() => openEditModal(item)}
                    className="text-[11px] text-amber-800 hover:underline font-semibold"
                  >
                    ✏️ सम्पादन
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, item.caption)}
                    className="text-[11px] text-red-600 hover:underline font-semibold"
                  >
                    🗑️ मेटाउनुहोस्
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-300">
            <div className="brand-gradient text-white px-6 py-4 flex items-center justify-between">
              <h2 className="text-base font-bold">
                {editingId ? "तस्वीर सम्पादन" : "नयाँ तस्वीर थप्नुहोस्"}
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

              {/* Photo upload input */}
              <ImageUploadInput
                label="फोटो छान्नुहोस् वा URL हाल्नुहोस्"
                value={src}
                onChange={setSrc}
                required
              />

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  तस्वीरको क्याप्सन / विवरण (Caption) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="उदा. बुद्ध जयन्ती समारोह, सम्यक महादान पर्व आदि"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  वर्ग (Category)
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                >
                  <option value="कार्यक्रम">कार्यक्रम (Events)</option>
                  <option value="साधारण सभा">साधारण सभा (General Assembly)</option>
                  <option value="पूजाविधि / संस्कार">पूजाविधि / संस्कार (Rituals)</option>
                  <option value="कार्यसमिति">कार्यसमिति (Committee)</option>
                  <option value="अन्य">अन्य (Other)</option>
                </select>
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
