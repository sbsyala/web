"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/api-client";

interface MessageItem {
  id: number;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadMessages() {
    try {
      setLoading(true);
      const res = await adminFetch("/api/admin/messages");
      const data = await res.json();
      setMessages(data.messages || []);
    } catch (err) {
      console.error("Load messages error:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMessages();
  }, []);

  async function toggleRead(id: number, current: boolean) {
    try {
      const res = await adminFetch("/api/admin/messages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, isRead: !current }),
      });
      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, isRead: !current } : m))
        );
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("के तपाईं यो सन्देश मेटाउन निश्चित हुनुहुन्छ?")) return;

    try {
      const res = await adminFetch(`/api/admin/messages?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            प्राप्त सन्देशहरु (Contact Inquiries)
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            वेबसाइटको सम्पर्क फारमबाट आएका जिज्ञासा, सहयोग तथा सुझावहरु ।
          </p>
        </div>
        <div className="text-xs bg-slate-100 px-3 py-1.5 rounded-xl text-slate-700 font-semibold">
          जम्मा: {messages.length} सन्देश (नपढेका: {messages.filter((m) => !m.isRead).length})
        </div>
      </div>

      {loading ? (
        <div className="bg-white p-12 rounded-2xl border text-center text-slate-500">
          लोड हुँदैछ...
        </div>
      ) : messages.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border text-center text-slate-500">
          हाल कुनै नयाँ सन्देश छैन ।
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`p-6 rounded-2xl border transition ${
                m.isRead
                  ? "bg-white border-slate-200"
                  : "bg-amber-50/50 border-amber-300 shadow-sm"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full brand-gradient text-white grid place-items-center font-bold text-sm">
                    {m.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      {m.name}
                      {!m.isRead && (
                        <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded-full font-bold">
                          नयाँ
                        </span>
                      )}
                    </h2>
                    <a
                      href={`mailto:${m.email}`}
                      className="text-xs text-amber-800 hover:underline font-mono"
                    >
                      {m.email}
                    </a>
                  </div>
                </div>
                <div className="text-xs text-slate-500 font-mono">
                  {new Date(m.createdAt).toLocaleString("ne-NP")}
                </div>
              </div>

              {m.subject && (
                <div className="mt-3 text-xs font-semibold text-slate-800">
                  विषय: <span className="font-normal">{m.subject}</span>
                </div>
              )}

              <div className="mt-2 text-sm text-slate-700 whitespace-pre-wrap bg-slate-50 p-4 rounded-xl border border-slate-100">
                {m.message}
              </div>

              <div className="mt-4 flex items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${m.email}?subject=${encodeURIComponent("Re: " + (m.subject || "Shakya Bajracharya Samaj Yala Inqury"))}`}
                    className="px-3 py-1.5 rounded-lg bg-[color:var(--brand)] text-white text-xs font-semibold hover:bg-[color:var(--brand-dark)] flex items-center gap-1.5 transition"
                  >
                    <span>✉️ इमेलमार्फत जवाफ दिनुहोस् (Reply)</span>
                  </a>
                  <button
                    onClick={() => toggleRead(m.id, m.isRead)}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
                  >
                    {m.isRead ? "चिन्ह लगाउनुहोस् (Mark as Unread)" : "✅ पढियो (Mark as Read)"}
                  </button>
                </div>
                <button
                  onClick={() => handleDelete(m.id)}
                  className="px-3 py-1.5 rounded-lg bg-red-50 text-red-700 text-xs font-semibold hover:bg-red-100 transition"
                >
                  🗑️ मेटाउनुहोस्
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
