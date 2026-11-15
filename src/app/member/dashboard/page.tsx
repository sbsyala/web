"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import CvRenderer from "@/components/member/CvRenderer";
import ImageUploadInput from "@/components/admin/ImageUploadInput";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { memberFetch, clearClientMemberToken, getClientMemberToken, stripTokenFromUrl } from "@/lib/api-client";

export default function MemberDashboardPage() {
  const router = useRouter();
  const { t, language } = useLanguage();

  const [loading, setLoading] = useState(true);
  const [member, setMember] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"profile" | "cv">("profile");

  // Profile Form States
  const [name, setName] = useState("");
  const [nameNe, setNameNe] = useState("");
  const [phone, setPhone] = useState("");
  const [photo, setPhoto] = useState("");
  const [education, setEducation] = useState("");
  const [profession, setProfession] = useState("");
  const [address, setAddress] = useState("");
  const [bahalBahi, setBahalBahi] = useState("");
  const [bio, setBio] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // CV Form States
  const [selectedTemplate, setSelectedTemplate] = useState<"template1" | "template2" | "template3">("template1");
  const [cvTitle, setCvTitle] = useState("");
  const [cvSummary, setCvSummary] = useState("");
  const [dob, setDob] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [languagesText, setLanguagesText] = useState("");
  const [nationality, setNationality] = useState("Nepali");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [spouseName, setSpouseName] = useState("");

  const [educationHistory, setEducationHistory] = useState<Array<{ degree: string; institution: string; year: string; grade: string }>>([]);
  const [experienceHistory, setExperienceHistory] = useState<Array<{ jobTitle: string; company: string; fromDate: string; toDate: string; current?: boolean; responsibilities: string }>>([]);
  const [skillsText, setSkillsText] = useState("");
  const [awardsText, setAwardsText] = useState("");

  // Feedback states
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function fetchMe() {
      try {
        if (!getClientMemberToken()) {
          if (isMounted) window.location.replace("/member/login");
          return;
        }

        let res = await memberFetch("/api/member/me");
        if (!res.ok) {
          await new Promise((r) => setTimeout(r, 400));
          res = await memberFetch("/api/member/me");
        }

        if (!res.ok) {
          clearClientMemberToken();
          if (isMounted) window.location.replace("/member/login");
          return;
        }

        const data = await res.json();
        if (data.authenticated && data.member) {
          // Token already persisted by getClientMemberToken(); clean URL now.
          stripTokenFromUrl();
          const m = data.member;
          setMember(m);
          setName(m.name || "");
          setNameNe(m.nameNe || "");
          setPhone(m.phone || "");
          setPhoto(m.photo || "");
          setEducation(m.education || "");
          setProfession(m.profession || "");
          setAddress(m.address || "");
          setBahalBahi(m.bahalBahi || "");
          setBio(m.bio || "");

          // Parse CV Data
          try {
            const cv = m.cvData ? (typeof m.cvData === "string" ? JSON.parse(m.cvData) : m.cvData) : {};
            setCvTitle(cv.title || m.profession || "");
            setCvSummary(cv.summary || m.bio || "");
            setDob(cv.dob || "");
            setBloodGroup(cv.bloodGroup || "");
            setLanguagesText(Array.isArray(cv.languages) ? cv.languages.join(", ") : "");
            setNationality(cv.nationality || "Nepali");
            setFatherName(cv.fatherName || "");
            setMotherName(cv.motherName || "");
            setSpouseName(cv.spouseName || "");
            setEducationHistory(cv.educationHistory || []);
            setExperienceHistory(cv.experienceHistory || []);
            setSkillsText(Array.isArray(cv.skills) ? cv.skills.join("\n") : "");
            setAwardsText(Array.isArray(cv.awardsAchievements) ? cv.awardsAchievements.join("\n") : "");
          } catch {
            // ignore
          }
          if (isMounted) setLoading(false);
        } else {
          clearClientMemberToken();
          if (isMounted) window.location.replace("/member/login");
        }
      } catch {
        clearClientMemberToken();
        if (isMounted) window.location.replace("/member/login");
      }
    }

    fetchMe();

    return () => {
      isMounted = false;
    };
  }, []);

  async function handleLogout() {
    clearClientMemberToken();
    try {
      await fetch("/api/member/logout", { method: "POST" });
    } catch {
      // ignore
    }
    window.location.replace("/member/login");
  }

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg("");
    setErrorMsg("");

    const languages = languagesText
      .split(",")
      .map((l) => l.trim())
      .filter(Boolean);

    const skills = skillsText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const awardsAchievements = awardsText
      .split("\n")
      .map((a) => a.trim())
      .filter(Boolean);

    const cvDataPayload = {
      title: cvTitle,
      summary: cvSummary,
      dob,
      bloodGroup,
      languages,
      nationality,
      fatherName,
      motherName,
      spouseName,
      educationHistory,
      experienceHistory,
      skills,
      awardsAchievements,
    };

    const payload = {
      name,
      nameNe,
      phone,
      photo,
      education,
      profession,
      address,
      bahalBahi,
      bio,
      cvData: cvDataPayload,
      password: newPassword || undefined,
    };

    try {
      const res = await memberFetch("/api/member/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || t.memberPortal.saveError);

      setMember((prev: any) => ({ ...prev, ...data.member }));
      setSuccessMsg(t.memberPortal.saveSuccess);
      setNewPassword("");
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : t.memberPortal.saveError);
    } finally {
      setSaving(false);
    }
  }

  function addEduRecord() {
    setEducationHistory([...educationHistory, { degree: "", institution: "", year: "", grade: "" }]);
  }

  function updateEduRecord(index: number, field: string, value: string) {
    const updated = [...educationHistory];
    updated[index] = { ...updated[index], [field]: value };
    setEducationHistory(updated);
  }

  function removeEduRecord(index: number) {
    setEducationHistory(educationHistory.filter((_, i) => i !== index));
  }

  function addExpRecord() {
    setExperienceHistory([...experienceHistory, { jobTitle: "", company: "", fromDate: "", toDate: "Present", current: true, responsibilities: "" }]);
  }

  function updateExpRecord(index: number, field: string, value: any) {
    const updated = [...experienceHistory];
    updated[index] = { ...updated[index], [field]: value };
    setExperienceHistory(updated);
  }

  function removeExpRecord(index: number) {
    setExperienceHistory(experienceHistory.filter((_, i) => i !== index));
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fdf7ec] grid place-items-center text-slate-700">
        <div className="text-center space-y-3">
          <div className="text-4xl animate-spin text-[color:var(--brand)]">☸</div>
          <p className="text-sm font-semibold">Loading Member Portal...</p>
        </div>
      </div>
    );
  }

  const cvDataObj = {
    title: cvTitle,
    summary: cvSummary,
    dob,
    bloodGroup,
    languages: languagesText.split(",").map((l) => l.trim()).filter(Boolean),
    nationality,
    fatherName,
    motherName,
    spouseName,
    educationHistory,
    experienceHistory,
    skills: skillsText.split("\n").map((s) => s.trim()).filter(Boolean),
    awardsAchievements: awardsText.split("\n").map((a) => a.trim()).filter(Boolean),
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Header Card (Member ID Card Banner) */}
        <div className="no-print bg-white rounded-3xl border border-amber-200 shadow-md p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-amber-50 border-3 border-amber-300 shadow-md shrink-0">
              {photo ? (
                <Image src={photo} alt={name} fill sizes="112px" className="object-cover" unoptimized />
              ) : (
                <div className="w-full h-full brand-gradient text-white grid place-items-center font-bold text-3xl">
                  {name.charAt(0)}
                </div>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 justify-center sm:justify-start flex-wrap">
                <span className="text-xs font-mono font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-300">
                  {member?.membershipNo}
                </span>
                <span className="text-xs font-bold bg-purple-100 text-purple-900 px-2.5 py-0.5 rounded-full uppercase border border-purple-200">
                  {member?.membershipType} Member
                </span>
                <span className="text-[10px] font-bold bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-mono">
                  ● Verified
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {name} {nameNe ? `(${nameNe})` : ""}
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-amber-800">
                🏢 {profession || "Member of Shakya Bajracharya Samaj"}
              </p>
              <p className="text-xs text-slate-500">
                ✉️ {member?.email} {phone ? `• 📞 ${phone}` : ""}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher compact />
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold border border-red-200 transition"
            >
              {t.memberPortal.logoutBtn}
            </button>
          </div>
        </div>

        {/* Tab Navigation Controls */}
        <div className="no-print flex items-center justify-between gap-4 border-b border-slate-200 pb-3 flex-wrap">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("profile")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 shadow-sm ${
                activeTab === "profile"
                  ? "bg-[color:var(--brand)] text-white shadow"
                  : "bg-white text-slate-700 hover:bg-amber-50 border border-slate-200"
              }`}
            >
              <span>👤</span>
              <span>{t.memberPortal.editProfileTab}</span>
            </button>

            <button
              onClick={() => setActiveTab("cv")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 shadow-sm ${
                activeTab === "cv"
                  ? "bg-[color:var(--brand)] text-white shadow"
                  : "bg-white text-slate-700 hover:bg-amber-50 border border-slate-200"
              }`}
            >
              <span>📄</span>
              <span>{t.memberPortal.cvGeneratorTab}</span>
            </button>
          </div>

          <Link
            href="/members"
            className="text-xs font-semibold text-[color:var(--brand)] hover:underline"
          >
            ← {t.membersPage.title}
          </Link>
        </div>

        {/* Status Alerts */}
        {successMsg && (
          <div className="no-print p-4 bg-green-50 text-green-800 rounded-2xl border border-green-200 text-xs sm:text-sm font-semibold shadow-sm animate-in fade-in">
            {successMsg}
          </div>
        )}
        {errorMsg && (
          <div className="no-print p-4 bg-red-50 text-red-800 rounded-2xl border border-red-200 text-xs sm:text-sm font-semibold shadow-sm animate-in fade-in">
            {errorMsg}
          </div>
        )}

        {/* TAB 1: EDIT PROFILE */}
        {activeTab === "profile" && (
          <form onSubmit={handleSaveProfile} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {t.memberPortal.editProfileTab}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {t.memberPortal.privacyNote}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  पुरा नाम (Name in English) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  नेपालीमा नाम (Name in Nepali)
                </label>
                <input
                  type="text"
                  value={nameNe}
                  onChange={(e) => setNameNe(e.target.value)}
                  placeholder="उदा. शरण कुमार शाक्य"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Photo Upload */}
            <ImageUploadInput
              label="आफ्नो फोटो (Profile Photo)"
              value={photo}
              onChange={setPhoto}
            />

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  🎓 {t.membersPage.educationLabel} (Degree)
                </label>
                <input
                  type="text"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  placeholder="उदा. Master's in Buddhist Studies"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  🏢 {t.membersPage.professionLabel}
                </label>
                <input
                  type="text"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  placeholder="उदा. Senior Engineer / Business Owner"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  सम्पर्क फोन (Phone)
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="9851000000"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  ठेगाना (Address)
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Ha:kha, Lalitpur"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                ☸ सम्बद्ध बहाः / बही (Associated Traditional Monastery)
              </label>
              <input
                type="text"
                value={bahalBahi}
                onChange={(e) => setBahalBahi(e.target.value)}
                placeholder="उदा. मयूरवर्ण महाविहार (भिन्छेबाहा:) / हिरण्यवर्ण महाविहार (क्वाबहा:)"
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                छोटो परिचय (Short Bio)
              </label>
              <textarea
                rows={2}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="आफ्नो छोटो परिचय..."
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1">
                पासवर्ड परिवर्तन (Change Password — Leave blank if unchanged)
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="नयाँ पासवर्ड (कमसेकम ६ अक्षर)"
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="brand-gradient text-white font-bold px-8 py-3 rounded-xl shadow-md hover:opacity-95 disabled:opacity-50 transition text-sm"
              >
                {saving ? t.memberPortal.savingBtn : t.memberPortal.saveProfileBtn}
              </button>
            </div>
          </form>
        )}

        {/* TAB 2: CV GENERATOR & 3 TEMPLATES */}
        {activeTab === "cv" && (
          <div className="space-y-8">
            {/* Template Selector & Print Controls */}
            <div className="no-print bg-white p-6 rounded-3xl border border-amber-200 shadow-sm space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    {t.memberPortal.chooseTemplate}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {t.memberPortal.cvSubtitle}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="bg-[color:var(--brand)] text-white text-sm font-bold px-6 py-3 rounded-2xl shadow-lg hover:bg-[color:var(--brand-dark)] flex items-center gap-2 justify-center transition shrink-0 hover:scale-105"
                >
                  <span>{t.memberPortal.printBtn}</span>
                </button>
              </div>

              {/* 3 Template Cards */}
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  {
                    id: "template1" as const,
                    name: t.memberPortal.template1Name,
                    desc: t.memberPortal.template1Desc,
                    accent: "border-[#7a1f1f] bg-amber-50/50",
                  },
                  {
                    id: "template2" as const,
                    name: t.memberPortal.template2Name,
                    desc: t.memberPortal.template2Desc,
                    accent: "border-blue-700 bg-blue-50/50",
                  },
                  {
                    id: "template3" as const,
                    name: t.memberPortal.template3Name,
                    desc: t.memberPortal.template3Desc,
                    accent: "border-slate-800 bg-slate-50",
                  },
                ].map((tpl) => (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => setSelectedTemplate(tpl.id)}
                    className={`text-left p-4 rounded-2xl border-2 transition relative ${
                      selectedTemplate === tpl.id
                        ? `${tpl.accent} shadow-md ring-2 ring-amber-400`
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    {selectedTemplate === tpl.id && (
                      <span className="absolute top-2 right-2 text-xs bg-amber-500 text-slate-950 font-bold px-2 py-0.5 rounded-full">
                        ✓ Selected
                      </span>
                    )}
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                      {tpl.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-1">
                      {tpl.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* In-depth CV Information Editor */}
            <div className="no-print bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="text-base font-bold text-slate-900">
                  ✏️ {t.memberPortal.cvTitle} — विवरण सम्पादन (Edit CV Content)
                </h3>
                <button
                  type="button"
                  onClick={handleSaveProfile}
                  disabled={saving}
                  className="brand-gradient text-white text-xs font-bold px-5 py-2 rounded-xl shadow hover:opacity-95"
                >
                  {saving ? "सुरक्षित हुँदैछ..." : "💾 Save CV Data"}
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1">
                  {t.memberPortal.cvSummaryLabel}
                </label>
                <textarea
                  rows={3}
                  value={cvSummary}
                  onChange={(e) => setCvSummary(e.target.value)}
                  placeholder={t.memberPortal.cvSummaryPlaceholder}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              {/* Personal Details Section */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                  {t.memberPortal.personalDetails}
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">{t.memberPortal.dob}</label>
                    <input
                      type="text"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      placeholder="1985-06-15"
                      className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">{t.memberPortal.bloodGroup}</label>
                    <input
                      type="text"
                      value={bloodGroup}
                      onChange={(e) => setBloodGroup(e.target.value)}
                      placeholder="O+ / A+ / B+"
                      className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">{t.memberPortal.languages}</label>
                    <input
                      type="text"
                      value={languagesText}
                      onChange={(e) => setLanguagesText(e.target.value)}
                      placeholder="Nepal Bhasa, Nepali, English"
                      className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">{t.memberPortal.fatherName}</label>
                    <input
                      type="text"
                      value={fatherName}
                      onChange={(e) => setFatherName(e.target.value)}
                      placeholder="Father's Name"
                      className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">{t.memberPortal.motherName}</label>
                    <input
                      type="text"
                      value={motherName}
                      onChange={(e) => setMotherName(e.target.value)}
                      placeholder="Mother's Name"
                      className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">{t.memberPortal.spouseName}</label>
                    <input
                      type="text"
                      value={spouseName}
                      onChange={(e) => setSpouseName(e.target.value)}
                      placeholder="Spouse Name"
                      className="w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Education Timeline */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    🎓 {t.memberPortal.educationHistory}
                  </h4>
                  <button
                    type="button"
                    onClick={addEduRecord}
                    className="text-xs font-bold text-[color:var(--brand)] bg-amber-50 hover:bg-amber-100 px-3 py-1 rounded-lg border border-amber-200"
                  >
                    {t.memberPortal.addEducationBtn}
                  </button>
                </div>
                <div className="space-y-3">
                  {educationHistory.map((edu, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 grid sm:grid-cols-4 gap-2 items-center">
                      <input
                        type="text"
                        placeholder="Degree (e.g. M.Sc. IT)"
                        value={edu.degree}
                        onChange={(e) => updateEduRecord(idx, "degree", e.target.value)}
                        className="rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Institution / Board"
                        value={edu.institution}
                        onChange={(e) => updateEduRecord(idx, "institution", e.target.value)}
                        className="rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Year (e.g. 2018)"
                        value={edu.year}
                        onChange={(e) => updateEduRecord(idx, "year", e.target.value)}
                        className="rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs"
                      />
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="Grade / Div"
                          value={edu.grade}
                          onChange={(e) => updateEduRecord(idx, "grade", e.target.value)}
                          className="w-full rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs"
                        />
                        <button
                          type="button"
                          onClick={() => removeEduRecord(idx)}
                          className="text-red-600 hover:text-red-800 text-xs px-2 py-1"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience Timeline */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    💼 {t.memberPortal.experienceHistory}
                  </h4>
                  <button
                    type="button"
                    onClick={addExpRecord}
                    className="text-xs font-bold text-[color:var(--brand)] bg-amber-50 hover:bg-amber-100 px-3 py-1 rounded-lg border border-amber-200"
                  >
                    {t.memberPortal.addExperienceBtn}
                  </button>
                </div>
                <div className="space-y-3">
                  {experienceHistory.map((exp, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <div className="grid sm:grid-cols-4 gap-2">
                        <input
                          type="text"
                          placeholder="Role (e.g. Principal / Senior Architect)"
                          value={exp.jobTitle}
                          onChange={(e) => updateExpRecord(idx, "jobTitle", e.target.value)}
                          className="rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-semibold"
                        />
                        <input
                          type="text"
                          placeholder="Company / Institution"
                          value={exp.company}
                          onChange={(e) => updateExpRecord(idx, "company", e.target.value)}
                          className="rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs"
                        />
                        <input
                          type="text"
                          placeholder="Start (e.g. 2018)"
                          value={exp.fromDate}
                          onChange={(e) => updateExpRecord(idx, "fromDate", e.target.value)}
                          className="rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs"
                        />
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            placeholder="End (e.g. Present)"
                            value={exp.toDate}
                            onChange={(e) => updateExpRecord(idx, "toDate", e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs"
                          />
                          <button
                            type="button"
                            onClick={() => removeExpRecord(idx)}
                            className="text-red-600 hover:text-red-800 text-xs px-2 py-1"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                      <input
                        type="text"
                        placeholder="Responsibilities & Key Achievements..."
                        value={exp.responsibilities}
                        onChange={(e) => updateExpRecord(idx, "responsibilities", e.target.value)}
                        className="w-full rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills and Awards */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    {t.memberPortal.skillsHeading} (One per line)
                  </label>
                  <textarea
                    rows={4}
                    value={skillsText}
                    onChange={(e) => setSkillsText(e.target.value)}
                    placeholder="Newar Buddhist Traditions&#10;Software Architecture&#10;Community Governance"
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-800 mb-1">
                    {t.memberPortal.awardsHeading} (One per line)
                  </label>
                  <textarea
                    rows={4}
                    value={awardsText}
                    onChange={(e) => setAwardsText(e.target.value)}
                    placeholder="Lalitpur Municipal Cultural Award (2022)&#10;Distinction Medal (2018)"
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Live CV Print Preview */}
            <div className="space-y-3">
              <div className="no-print flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-800">
                  👁️ {t.memberPortal.cvTitle} — Live Preview ({selectedTemplate.toUpperCase()}):
                </h3>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="text-xs font-bold text-[color:var(--brand)] bg-amber-100 hover:bg-amber-200 px-4 py-1.5 rounded-xl transition flex items-center gap-1.5"
                >
                  <span>🖨️ Print Now</span>
                </button>
              </div>

              {/* The chosen CV template rendered live */}
              <CvRenderer
                template={selectedTemplate}
                member={member}
                cv={cvDataObj}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
