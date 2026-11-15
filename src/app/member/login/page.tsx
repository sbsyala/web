"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { setClientMemberToken } from "@/lib/api-client";

function MemberAuthForms() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get("email") || "";
  const initialTabParam = searchParams.get("tab") as "login" | "register" | "reset" | null;

  const { t, language } = useLanguage();
  const isNepali = language === "ne";

  const [activeTab, setActiveTab] = useState<"login" | "register" | "reset">(
    initialTabParam && ["login", "register", "reset"].includes(initialTabParam)
      ? initialTabParam
      : "login"
  );

  // LOGIN STATE
  const [loginIdentifier, setLoginIdentifier] = useState(initialEmail);
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // REGISTER STATE
  const [regName, setRegName] = useState("");
  const [regNameNe, setRegNameNe] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [regMembershipType, setRegMembershipType] = useState("general");
  const [regPhone, setRegPhone] = useState("");
  const [regEducation, setRegEducation] = useState("");
  const [regProfession, setRegProfession] = useState("");
  const [regBahalBahi, setRegBahalBahi] = useState("");
  const [regAddress, setRegAddress] = useState("");
  const [regLoading, setRegLoading] = useState(false);
  const [regError, setRegError] = useState("");

  // RESET / CREATE PASSWORD STATE
  const [resetIdentifier, setResetIdentifier] = useState(initialEmail);
  const [resetNewPassword, setResetNewPassword] = useState("");
  const [resetConfirmPassword, setResetConfirmPassword] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");

  // Demo accounts
  const demoAccounts = [
    { label: isNepali ? "संस्थापक (Founder)" : "Founder Member", email: "sharan.shakya@example.com", no: "SBS-FM-001", name: "Sharan Kumar Shakya" },
    { label: isNepali ? "मानार्थ (Honorary)" : "Honorary Member", email: "anjan.shakya@example.com", no: "SBS-HM-001", name: "Dr. Anjan Shakya" },
    { label: isNepali ? "आजीवन (Life)" : "Life Member", email: "asharatna.shakya@example.com", no: "SBS-LM-001", name: "Asha Ratna Shakya" },
    { label: isNepali ? "साधारण (General)" : "General Member", email: "sunil.shakya@example.com", no: "SBS-GM-001", name: "Sunil Shakya" },
  ];

  // HANDLE LOGIN
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");

    try {
      const res = await fetch("/api/member/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: loginIdentifier, password: loginPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "लगइन असफल भयो।");

      if (data.token) {
        setClientMemberToken(data.token);
      }

      const fallback = data.token ? `?token=${encodeURIComponent(data.token)}` : "";
      window.location.assign(`/member/dashboard${fallback}`);
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : "लगइन गर्न सकिएन ।");
      setLoginLoading(false);
    }
  }

  // HANDLE REGISTER
  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setRegLoading(true);
    setRegError("");

    if (regPassword !== regConfirmPassword) {
      setRegError(isNepali ? "दुवै पासवर्ड मिल्नुपर्छ।" : "Passwords do not match.");
      setRegLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/member/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: regName,
          nameNe: regNameNe,
          email: regEmail,
          password: regPassword,
          membershipType: regMembershipType,
          phone: regPhone,
          education: regEducation,
          profession: regProfession,
          bahalBahi: regBahalBahi,
          address: regAddress,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "दर्ता गर्न सकिएन ।");

      if (data.token) {
        setClientMemberToken(data.token);
      }

      const fallback = data.token ? `?token=${encodeURIComponent(data.token)}` : "";
      window.location.assign(`/member/dashboard${fallback}`);
    } catch (err) {
      setRegError(err instanceof Error ? err.message : "दर्ता गर्न सकिएन ।");
      setRegLoading(false);
    }
  }

  // HANDLE RESET / CREATE PASSWORD
  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();
    setResetLoading(true);
    setResetError("");
    setResetSuccess("");

    if (resetNewPassword !== resetConfirmPassword) {
      setResetError(isNepali ? "दुवै पासवर्ड मिल्नुपर्छ।" : "Passwords do not match.");
      setResetLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/member/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: resetIdentifier,
          newPassword: resetNewPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "पासवर्ड परिवर्तन गर्न सकिएन ।");

      if (data.token) {
        setClientMemberToken(data.token);
      }

      setResetSuccess(t.memberPortal.resetSuccess);
      setTimeout(() => {
        const fallback = data.token ? `?token=${encodeURIComponent(data.token)}` : "";
        window.location.assign(`/member/dashboard${fallback}`);
      }, 800);
    } catch (err) {
      setResetError(err instanceof Error ? err.message : "पासवर्ड परिवर्तन गर्न सकिएन ।");
    } finally {
      setResetLoading(false);
    }
  }

  function fillDemo(acc: typeof demoAccounts[0]) {
    setLoginIdentifier(acc.email);
    setLoginPassword("member123");
    setActiveTab("login");
  }

  return (
    <div className="min-h-screen bg-[#fdf7ec] flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg text-center">
        <div className="flex justify-center mb-3">
          <LanguageSwitcher compact />
        </div>
        <Link
          href="/"
          className="inline-flex items-center justify-center w-16 h-16 rounded-full brand-gradient text-white text-3xl font-bold shadow-xl ring-4 ring-amber-400 mb-3 hover:scale-105 transition"
        >
          ☸
        </Link>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#7a1f1f]">
          {t.memberPortal.loginTitle}
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 font-medium max-w-md mx-auto">
          {t.memberPortal.loginSubtitle}
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-lg">
        {/* TAB BUTTONS */}
        <div className="flex rounded-2xl bg-amber-100/80 p-1.5 border border-amber-300 shadow-inner mb-4">
          <button
            type="button"
            onClick={() => setActiveTab("login")}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeTab === "login"
                ? "bg-[color:var(--brand)] text-white shadow"
                : "text-slate-700 hover:text-slate-900"
            }`}
          >
            {t.memberPortal.tabLogin}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("register")}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeTab === "register"
                ? "bg-[color:var(--brand)] text-white shadow"
                : "text-slate-700 hover:text-slate-900"
            }`}
          >
            {t.memberPortal.tabRegister}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("reset")}
            className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeTab === "reset"
                ? "bg-[color:var(--brand)] text-white shadow"
                : "text-slate-700 hover:text-slate-900"
            }`}
          >
            {t.memberPortal.tabReset}
          </button>
        </div>

        {/* MAIN FORM CARD */}
        <div className="bg-white py-8 px-6 shadow-xl rounded-3xl sm:px-10 border border-amber-200">
          {/* TAB 1: LOGIN FORM */}
          {activeTab === "login" && (
            <form className="space-y-4" onSubmit={handleLogin}>
              {loginError && (
                <div className="rounded-xl bg-red-50 p-3 text-xs text-red-700 border border-red-200 font-medium">
                  {loginError}
                </div>
              )}

              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1">
                  {t.memberPortal.identifierLabel} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  placeholder={t.memberPortal.identifierPlaceholder}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs sm:text-sm font-bold text-slate-800">
                    {t.memberPortal.passwordLabel} <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setResetIdentifier(loginIdentifier);
                      setActiveTab("reset");
                    }}
                    className="text-xs text-[color:var(--brand)] font-semibold hover:underline"
                  >
                    {isNepali ? "पासवर्ड बिर्सनुभयो?" : "Forgot password?"}
                  </button>
                </div>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full flex justify-center py-3 px-4 rounded-xl shadow-md text-sm font-bold text-white brand-gradient hover:opacity-95 focus:outline-none disabled:opacity-50 transition"
              >
                {loginLoading ? t.memberPortal.loggingInBtn : t.memberPortal.loginBtn}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("register")}
                  className="text-xs text-slate-600 hover:text-[color:var(--brand)] font-semibold underline"
                >
                  {t.memberPortal.needAccountLink} →
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: REGISTER NEW MEMBER FORM */}
          {activeTab === "register" && (
            <form className="space-y-4" onSubmit={handleRegister}>
              {regError && (
                <div className="rounded-xl bg-red-50 p-3 text-xs text-red-700 border border-red-200 font-medium">
                  {regError}
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    {t.memberPortal.fullNameLabel} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. Sunil Shakya"
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    {t.memberPortal.fullNameNeLabel}
                  </label>
                  <input
                    type="text"
                    value={regNameNe}
                    onChange={(e) => setRegNameNe(e.target.value)}
                    placeholder="उदा. सुनिल शाक्य"
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  {t.memberPortal.emailLabel} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="member@example.com"
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    {t.memberPortal.passwordLabel} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="कमसेकम ४ अक्षर"
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    {t.memberPortal.confirmPasswordLabel} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    placeholder="पुनः पासवर्ड लेख्नुहोस्"
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    {t.memberPortal.membershipTypeLabel}
                  </label>
                  <select
                    value={regMembershipType}
                    onChange={(e) => setRegMembershipType(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  >
                    <option value="general">साधारण सदस्य (General Member)</option>
                    <option value="life">आजीवन सदस्य (Life Member)</option>
                    <option value="founder">संस्थापक सदस्य (Founder Member)</option>
                    <option value="honorary">मानार्थ सदस्य (Honorary Member)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    फोन (Phone)
                  </label>
                  <input
                    type="text"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="9851000000"
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    🎓 शैक्षिक योग्यता (Degree)
                  </label>
                  <input
                    type="text"
                    value={regEducation}
                    onChange={(e) => setRegEducation(e.target.value)}
                    placeholder="उदा. Master's in Buddhist Studies"
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    🏢 पेशा / कार्यरत संस्था (Profession)
                  </label>
                  <input
                    type="text"
                    value={regProfession}
                    onChange={(e) => setRegProfession(e.target.value)}
                    placeholder="उदा. Software Engineer / Business"
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  ☸ सम्बद्ध बहाः / बही (Associated Monastery)
                </label>
                <input
                  type="text"
                  value={regBahalBahi}
                  onChange={(e) => setRegBahalBahi(e.target.value)}
                  placeholder="उदा. मयूरवर्ण महाविहार (भिन्छेबाहा:)"
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={regLoading}
                className="w-full flex justify-center py-3 px-4 rounded-xl shadow-md text-sm font-bold text-white brand-gradient hover:opacity-95 focus:outline-none disabled:opacity-50 transition mt-2"
              >
                {regLoading ? t.memberPortal.registeringBtn : t.memberPortal.registerBtn}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("login")}
                  className="text-xs text-slate-600 hover:text-[color:var(--brand)] font-semibold underline"
                >
                  {t.memberPortal.alreadyAccountLink} →
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: CREATE / RESET PASSWORD FORM */}
          {activeTab === "reset" && (
            <form className="space-y-4" onSubmit={handleResetPassword}>
              <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-950">
                ℹ️ {isNepali
                  ? "यदि तपाईं शाक्य बज्राचार्य समाजको सदस्य हुनुहुन्छ र आफ्नो लगइन पासवर्ड बनाउन वा परिवर्तन गर्न चाहनुहुन्छ भने तल आफ्नो दर्ता इमेल वा सदस्यता नम्बर राखेर नयाँ पासवर्ड सेट गर्नुहोस्।"
                  : "If you are a member of the society and need to create or reset your portal login password, enter your registered email or membership number below."}
              </div>

              {resetSuccess && (
                <div className="rounded-xl bg-green-50 p-3 text-xs text-green-800 border border-green-200 font-bold">
                  {resetSuccess}
                </div>
              )}

              {resetError && (
                <div className="rounded-xl bg-red-50 p-3 text-xs text-red-700 border border-red-200 font-medium">
                  {resetError}
                </div>
              )}

              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1">
                  {t.memberPortal.identifierLabel} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={resetIdentifier}
                  onChange={(e) => setResetIdentifier(e.target.value)}
                  placeholder={t.memberPortal.identifierPlaceholder}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1">
                  {t.memberPortal.newPasswordLabel} <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  required
                  value={resetNewPassword}
                  onChange={(e) => setResetNewPassword(e.target.value)}
                  placeholder="कमसेकम ४ अक्षरको नयाँ पासवर्ड"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-800 mb-1">
                  {t.memberPortal.confirmPasswordLabel} <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  required
                  value={resetConfirmPassword}
                  onChange={(e) => setResetConfirmPassword(e.target.value)}
                  placeholder="पुनः नयाँ पासवर्ड लेख्नुहोस्"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={resetLoading}
                className="w-full flex justify-center py-3 px-4 rounded-xl shadow-md text-sm font-bold text-white brand-gradient hover:opacity-95 focus:outline-none disabled:opacity-50 transition"
              >
                {resetLoading ? t.memberPortal.resettingBtn : t.memberPortal.resetBtn}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("login")}
                  className="text-xs text-slate-600 hover:text-[color:var(--brand)] font-semibold underline"
                >
                  {t.memberPortal.alreadyAccountLink} →
                </button>
              </div>
            </form>
          )}

          {/* Quick Demo Accounts Helper */}
          <div className="mt-8 border-t border-slate-200 pt-5 space-y-2">
            <p className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
              <span>💡</span>
              <span>{t.memberPortal.demoHintTitle}</span>
            </p>
            <p className="text-[11px] text-slate-500">
              {t.memberPortal.demoHintText}
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              {demoAccounts.map((acc) => (
                <button
                  key={acc.email}
                  type="button"
                  onClick={() => fillDemo(acc)}
                  className="text-left p-2.5 rounded-xl bg-amber-50/80 hover:bg-amber-100 border border-amber-200 text-[11px] transition text-amber-950 flex flex-col justify-between group shadow-sm"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-bold text-slate-900 group-hover:text-[color:var(--brand)]">{acc.label}</span>
                    <span className="text-[9px] font-mono bg-white px-1.5 py-0.5 rounded border border-amber-200">{acc.no}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 truncate mt-1">{acc.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 text-center space-y-2 border-t border-slate-100 pt-4">
            <Link
              href="/members"
              className="text-xs font-semibold text-[color:var(--brand)] hover:underline block"
            >
              ← {t.membersPage.title}
            </Link>
            <Link
              href="/"
              className="text-xs text-slate-500 hover:text-slate-700 block"
            >
              ← {t.nav.home}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MemberLoginPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading Member Portal...</div>}>
      <MemberAuthForms />
    </Suspense>
  );
}
