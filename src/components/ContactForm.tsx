"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      subject: String(fd.get("subject") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setStatus("error");
      setMessage(t.contact.validationMsg);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Request failed");
      setStatus("success");
      setMessage(t.contact.successMsg);
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error
          ? err.message
          : t.contact.errorMsg
      );
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            {t.contact.nameLabel} <span className="text-red-600">*</span>
          </label>
          <input
            name="name"
            required
            placeholder={t.contact.namePlaceholder}
            className="w-full rounded-xl border border-amber-200 bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)]"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            {t.contact.emailLabel} <span className="text-red-600">*</span>
          </label>
          <input
            name="email"
            type="email"
            required
            placeholder={t.contact.emailPlaceholder}
            className="w-full rounded-xl border border-amber-200 bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)]"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">
          {t.contact.subjectLabel}
        </label>
        <input
          name="subject"
          placeholder={t.contact.subjectPlaceholder}
          className="w-full rounded-xl border border-amber-200 bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)]"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">
          {t.contact.messageLabel} <span className="text-red-600">*</span>
        </label>
        <textarea
          name="message"
          rows={5}
          required
          placeholder={t.contact.messagePlaceholder}
          className="w-full rounded-xl border border-amber-200 bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--brand)]"
        />
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="brand-gradient text-white font-bold px-7 py-3 rounded-full hover:opacity-95 shadow-md transition disabled:opacity-60 text-sm"
      >
        {status === "submitting" ? t.contact.submittingBtn : t.contact.submitBtn}
      </button>
      {message && (
        <p
          className={`text-sm mt-3 p-3 rounded-xl border ${
            status === "success"
              ? "bg-green-50 text-green-800 border-green-200 font-medium"
              : "bg-red-50 text-red-800 border-red-200 font-medium"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
