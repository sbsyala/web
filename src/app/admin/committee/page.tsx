"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ImageUploadInput from "@/components/admin/ImageUploadInput";
import { adminFetch } from "@/lib/api-client";

interface MemberItem {
  id: number;
  name: string;
  position: string;
  image: string;
  orderNum: number;
}

export default function AdminCommitteePage() {
  const [members, setMembers] = useState<MemberItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [image, setImage] = useState("");
  const [orderNum, setOrderNum] = useState(1);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadMembers() {
    try {
      setLoading(true);
      const res = await adminFetch("/api/admin/committee");
      const data = await res.json();
      setMembers(data.members || []);
    } catch (err) {
      console.error("Load committee error:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMembers();
  }, []);

  function openCreateModal() {
    setEditingId(null);
    setName("");
    setPosition("का.स. सदस्य");
    setImage("");
    setOrderNum((members.length || 0) + 1);
    setError("");
    setIsModalOpen(true);
  }

  function openEditModal(m: MemberItem) {
    setEditingId(m.id);
    setName(m.name);
    setPosition(m.position);
    setImage(m.image);
    setOrderNum(m.orderNum);
    setError("");
    setIsModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await adminFetch("/api/admin/committee", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingId,
          name,
          position,
          image,
          orderNum,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "सुरक्षित गर्न असफल भयो।");

      setIsModalOpen(false);
      await loadMembers();
    } catch (err) {
      setError(err instanceof Error ? err.message : "त्रुटि भयो।");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number, mName: string) {
    if (!confirm(`के तपाईं "${mName}" लाई कार्यसमितिबाट हटाउन चाहनुहुन्छ?`)) return;

    try {
      const res = await adminFetch(`/api/admin/committee?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setMembers((prev) => prev.filter((m) => m.id !== id));
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
            कार्यसमिति व्यवस्थापन (Committee Members)
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            वर्तमान कार्यसमितिका पदाधिकारीहरु एवं सदस्यहरु थप्नुहोस् वा सम्पादन गर्नुहोस् ।
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="bg-[color:var(--brand)] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-[color:var(--brand-dark)] shadow flex items-center gap-2 justify-center transition"
        >
          <span>👥 + नयाँ पदाधिकारी / सदस्य थप्नुहोस्</span>
        </button>
      </div>

      {loading ? (
        <div className="bg-white p-12 rounded-2xl border text-center text-slate-500">
          सदस्यहरु लोड हुँदैछ...
        </div>
      ) : members.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border text-center text-slate-500">
          कुनै सदस्य फेला परेन ।
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {members.map((m) => (
            <div
              key={m.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div className="relative aspect-square bg-slate-100">
                <Image
                  src={m.image}
                  alt={m.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 200px"
                  className="object-cover"
                  unoptimized
                />
                <span className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">
                  क्रम: {m.orderNum}
                </span>
              </div>
              <div className="p-3 text-center">
                <div className="text-[11px] font-bold text-amber-800 uppercase">
                  {m.position}
                </div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">
                  {m.name}
                </div>
                <div className="mt-3 flex items-center justify-center gap-3 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => openEditModal(m)}
                    className="text-xs text-amber-800 hover:underline font-semibold"
                  >
                    ✏️ सम्पादन
                  </button>
                  <button
                    onClick={() => handleDelete(m.id, m.name)}
                    className="text-xs text-red-600 hover:underline font-semibold"
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
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-300">
            <div className="brand-gradient text-white px-6 py-4 flex items-center justify-between">
              <h2 className="text-base font-bold">
                {editingId ? "सदस्य सम्पादन" : "नयाँ सदस्य थप्नुहोस्"}
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
                  पुरा नाम <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="उदा. जगतमुनि शाक्य"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  पद (Position) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="उदा. अध्यक्ष / उपाध्यक्ष / सचिव / का.स. सदस्य"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <ImageUploadInput
                label="फोटो छान्नुहोस् वा URL"
                value={image}
                onChange={setImage}
                required
              />

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  क्रम संख्या (Order Number)
                </label>
                <input
                  type="number"
                  min="1"
                  value={orderNum}
                  onChange={(e) => setOrderNum(Number(e.target.value))}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
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
