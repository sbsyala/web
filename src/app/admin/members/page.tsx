"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ImageUploadInput from "@/components/admin/ImageUploadInput";
import { adminFetch } from "@/lib/api-client";

interface MemberItem {
  id: number;
  membershipNo: string;
  membershipType: string;
  name: string;
  nameNe: string | null;
  email: string;
  phone: string | null;
  photo: string | null;
  education: string | null;
  profession: string | null;
  address: string | null;
  bahalBahi: string | null;
  bio: string | null;
  status: string;
}

export default function AdminMembersPage() {
  const [membersList, setMembersList] = useState<MemberItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [membershipNo, setMembershipNo] = useState("");
  const [membershipType, setMembershipType] = useState("general");
  const [name, setName] = useState("");
  const [nameNe, setNameNe] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [photo, setPhoto] = useState("");
  const [education, setEducation] = useState("");
  const [profession, setProfession] = useState("");
  const [address, setAddress] = useState("");
  const [bahalBahi, setBahalBahi] = useState("");
  const [bio, setBio] = useState("");
  const [status, setStatus] = useState("active");
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  async function loadMembers() {
    try {
      setLoading(true);
      const res = await adminFetch("/api/admin/members");
      const data = await res.json();
      setMembersList(data.members || []);
    } catch (err) {
      console.error("Load members error:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMembers();
  }, []);

  function openCreateModal() {
    setEditingId(null);
    setMembershipNo(`SBS-GM-${Date.now().toString().slice(-4)}`);
    setMembershipType("general");
    setName("");
    setNameNe("");
    setEmail("");
    setPassword("member123");
    setPhone("");
    setPhoto("");
    setEducation("");
    setProfession("");
    setAddress("Lalitpur");
    setBahalBahi("");
    setBio("");
    setStatus("active");
    setFormError("");
    setIsModalOpen(true);
  }

  function openEditModal(m: MemberItem) {
    setEditingId(m.id);
    setMembershipNo(m.membershipNo);
    setMembershipType(m.membershipType);
    setName(m.name);
    setNameNe(m.nameNe || "");
    setEmail(m.email);
    setPassword(""); // leave blank unless changing
    setPhone(m.phone || "");
    setPhoto(m.photo || "");
    setEducation(m.education || "");
    setProfession(m.profession || "");
    setAddress(m.address || "");
    setBahalBahi(m.bahalBahi || "");
    setBio(m.bio || "");
    setStatus(m.status || "active");
    setFormError("");
    setIsModalOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setFormError("");

    const payload = {
      id: editingId,
      membershipNo,
      membershipType,
      name,
      nameNe,
      email,
      password,
      phone,
      photo,
      education,
      profession,
      address,
      bahalBahi,
      bio,
      status,
    };

    try {
      const res = await adminFetch("/api/admin/members", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "सुरक्षित गर्न सकिएन ।");

      setIsModalOpen(false);
      await loadMembers();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "त्रुटि भयो।");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number, mName: string) {
    if (!confirm(`के तपाईं "${mName}" लाई सदस्य सूचीबाट मेटाउन निश्चित हुनुहुन्छ?`)) return;

    try {
      const res = await adminFetch(`/api/admin/members?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setMembersList((prev) => prev.filter((m) => m.id !== id));
      } else {
        alert("मेटाउन सकिएन ।");
      }
    } catch {
      alert("मेटाउन सकिएन ।");
    }
  }

  const filtered = membersList.filter((m) => {
    const matchesType = filterType === "all" || m.membershipType === filterType;
    const q = search.toLowerCase().trim();
    if (!q) return matchesType;

    const matchesQ =
      m.name.toLowerCase().includes(q) ||
      (m.nameNe && m.nameNe.toLowerCase().includes(q)) ||
      m.email.toLowerCase().includes(q) ||
      m.membershipNo.toLowerCase().includes(q) ||
      (m.profession && m.profession.toLowerCase().includes(q));

    return matchesType && matchesQ;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            सदस्य विवरण व्यवस्थापन (Members Directory Manager)
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            संस्थापक, मानार्थ, आजीवन र साधारण सदस्यहरुका सम्पूर्ण विवरण दर्ता एवं व्यवस्थापन गर्नुहोस् ।
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="bg-[color:var(--brand)] text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-[color:var(--brand-dark)] shadow flex items-center gap-2 justify-center transition"
        >
          <span>👤 + नयाँ सदस्य थप्नुहोस् (Add Member)</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {[
            { key: "all", label: "सबै (All)" },
            { key: "founder", label: "संस्थापक (Founder)" },
            { key: "honorary", label: "मानार्थ (Honorary)" },
            { key: "life", label: "आजीवन (Life)" },
            { key: "general", label: "साधारण (General)" },
          ].map((tp) => (
            <button
              key={tp.key}
              onClick={() => setFilterType(tp.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                filterType === tp.key
                  ? "bg-[color:var(--brand)] text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-amber-100"
              }`}
            >
              {tp.label}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-72 flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
          <span className="text-slate-400">🔍</span>
          <input
            type="text"
            placeholder="नाम, इमेल, सदस्यता नं..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs bg-transparent focus:outline-none"
          />
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="bg-white p-12 rounded-2xl border text-center text-slate-500">
          सदस्यहरु लोड हुँदैछ...
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border text-center text-slate-500">
          कुनै सदस्य फेला परेन ।
        </div>
      ) : (
        <div className="grid gap-4">
          {filtered.map((m) => (
            <div
              key={m.id}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-5 items-start justify-between hover:border-amber-300 transition"
            >
              <div className="flex gap-4 items-start w-full md:w-auto">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0 border">
                  {m.photo ? (
                    <Image
                      src={m.photo}
                      alt={m.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full brand-gradient text-white grid place-items-center font-bold text-xl">
                      {m.name.charAt(0)}
                    </div>
                  )}
                </div>

                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                      {m.membershipNo}
                    </span>
                    <span className="text-[11px] font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded uppercase">
                      {m.membershipType}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900">
                    {m.name} {m.nameNe ? `(${m.nameNe})` : ""}
                  </h3>
                  <div className="text-xs text-slate-600 flex flex-wrap gap-x-4 gap-y-1">
                    <span>✉️ {m.email}</span>
                    {m.phone && <span>📞 {m.phone}</span>}
                    {m.profession && <span>🏢 {m.profession}</span>}
                    {m.education && <span>🎓 {m.education}</span>}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 w-full md:w-auto justify-end">
                <button
                  onClick={() => openEditModal(m)}
                  className="px-3 py-1.5 rounded-lg bg-amber-100 text-amber-900 text-xs font-medium hover:bg-amber-200 transition"
                >
                  ✏️ सम्पादन
                </button>
                <button
                  onClick={() => handleDelete(m.id, m.name)}
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
            <div className="brand-gradient text-white px-6 py-4 flex items-center justify-between">
              <h2 className="text-base font-bold">
                {editingId ? "सदस्य विवरण सम्पादन गर्नुहोस्" : "नयाँ सदस्य दर्ता फारम (Insert Member Details)"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white hover:text-amber-200 text-xl"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto flex-1 text-sm">
              {formError && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
                  {formError}
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    सदस्यता प्रकार (Membership Type) <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={membershipType}
                    onChange={(e) => setMembershipType(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                    <option value="founder">संस्थापक सदस्य (Founder Member)</option>
                    <option value="honorary">मानार्थ सदस्य (Honorary Member)</option>
                    <option value="life">आजीवन सदस्य (Life Member)</option>
                    <option value="general">साधारण सदस्य (General Member)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    सदस्यता नम्बर (Membership No.)
                  </label>
                  <input
                    type="text"
                    placeholder="उदा. SBS-LM-001"
                    value={membershipNo}
                    onChange={(e) => setMembershipNo(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    पुरा नाम (Name in English) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sunil Shakya"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    नेपालीमा नाम (Name in Nepali)
                  </label>
                  <input
                    type="text"
                    placeholder="उदा. सुनिल शाक्य"
                    value={nameNe}
                    onChange={(e) => setNameNe(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    इमेल (Login Email) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="member@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    पासवर्ड {editingId && <span className="text-xs text-slate-500">(परिवर्तन नगर्ने भए खाली छोड्नुहोस्)</span>}
                  </label>
                  <input
                    type="password"
                    placeholder={editingId ? "नयाँ पासवर्ड हाल्नुहोस्" : "member123"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    सम्पर्क फोन (Phone)
                  </label>
                  <input
                    type="text"
                    placeholder="9851000000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    ठेगाना (Address)
                  </label>
                  <input
                    type="text"
                    placeholder="Ha:kha, Ward-12, Lalitpur"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Photo Upload */}
              <ImageUploadInput
                label="सदस्यको फोटो (Member Photo)"
                value={photo}
                onChange={setPhoto}
              />

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    शैक्षिक योग्यता (Education / Degree)
                  </label>
                  <input
                    type="text"
                    placeholder="उदा. Master in Buddhist Studies / BE Civil"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    पेशा / कार्यरत कार्यालय वा व्यवसाय (Profession / Business)
                  </label>
                  <input
                    type="text"
                    placeholder="उदा. Senior Engineer, Nepal Telecom / Managing Director, Shakya Crafts"
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  सम्बद्ध परम्परागत बहाः / बही (Associated Monastery)
                </label>
                <input
                  type="text"
                  placeholder="उदा. मयूरवर्ण महाविहार (भिन्छेबाहा:) / रुद्रवर्ण महाविहार (उकुबाहा:)"
                  value={bahalBahi}
                  onChange={(e) => setBahalBahi(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  छोटो परिचय (Short Bio / Introduction)
                </label>
                <textarea
                  rows={2}
                  placeholder="सदस्यको छोटो परिचय..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
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
                  className="px-6 py-2.5 rounded-xl brand-gradient text-white text-xs font-bold shadow hover:opacity-95 disabled:opacity-50"
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
