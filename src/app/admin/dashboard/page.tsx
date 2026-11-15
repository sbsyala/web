"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { adminFetch } from "@/lib/api-client";

interface Stats {
  membersCount: number;
  activitiesCount: number;
  galleryCount: number;
  noticesCount: number;
  committeeCount: number;
  messagesCount: number;
  unreadMessagesCount: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({
    membersCount: 0,
    activitiesCount: 0,
    galleryCount: 0,
    noticesCount: 0,
    committeeCount: 0,
    messagesCount: 0,
    unreadMessagesCount: 0,
  });
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [recentMembers, setRecentMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [memRes, actRes, galRes, notRes, comRes, msgRes] = await Promise.all([
          adminFetch("/api/admin/members"),
          adminFetch("/api/admin/activities"),
          adminFetch("/api/admin/gallery"),
          adminFetch("/api/admin/notices"),
          adminFetch("/api/admin/committee"),
          adminFetch("/api/admin/messages"),
        ]);

        const [memData, actData, galData, notData, comData, msgData] = await Promise.all([
          memRes.json(),
          actRes.json(),
          galRes.json(),
          notRes.json(),
          comRes.json(),
          msgRes.json(),
        ]);

        const mems = memData.members || [];
        const acts = actData.activities || [];
        const gals = galData.gallery || [];
        const nots = notData.notices || [];
        const coms = comData.members || [];
        const msgs = msgData.messages || [];

        setStats({
          membersCount: mems.length,
          activitiesCount: acts.length,
          galleryCount: gals.length,
          noticesCount: nots.length,
          committeeCount: coms.length,
          messagesCount: msgs.length,
          unreadMessagesCount: msgs.filter((m: any) => !m.isRead).length,
        });

        setRecentActivities(acts.slice(0, 4));
        setRecentMembers(mems.slice(0, 4));
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
            व्यवस्थापक नियन्त्रण कक्ष
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            ड्यासबोर्ड (Dashboard)
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            शाक्य बज्राचार्य समाज, यल — सदस्य विवरण, गतिविधि, तस्वीर संग्रह र सूचनाहरु यहाँबाट व्यवस्थापन गर्नुहोस् ।
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/admin/members"
            className="bg-amber-500 text-slate-950 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-amber-400 shadow transition"
          >
            👥 + नयाँ सदस्य थप्नुहोस्
          </Link>
          <Link
            href="/admin/activities"
            className="bg-[color:var(--brand)] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-[color:var(--brand-dark)] shadow transition"
          >
            📰 + नयाँ गतिविधि पोष्ट
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          {
            title: "सदस्यहरु (Members)",
            count: stats.membersCount,
            icon: "👥",
            href: "/admin/members",
            color: "border-amber-300 bg-amber-50/70",
          },
          {
            title: "गतिविधि / समाचार",
            count: stats.activitiesCount,
            icon: "📰",
            href: "/admin/activities",
            color: "border-blue-200 bg-blue-50/50",
          },
          {
            title: "तस्वीर संग्रह",
            count: stats.galleryCount,
            icon: "🖼️",
            href: "/admin/gallery",
            color: "border-emerald-200 bg-emerald-50/50",
          },
          {
            title: "सूचनाहरु",
            count: stats.noticesCount,
            icon: "📢",
            href: "/admin/notices",
            color: "border-amber-200 bg-amber-50/50",
          },
          {
            title: "कार्यसमिति",
            count: stats.committeeCount,
            icon: "🏛️",
            href: "/admin/committee",
            color: "border-purple-200 bg-purple-50/50",
          },
          {
            title: "सन्देशहरु",
            count: stats.messagesCount,
            badge: stats.unreadMessagesCount ? `${stats.unreadMessagesCount} नयाँ` : undefined,
            icon: "✉️",
            href: "/admin/messages",
            color: "border-rose-200 bg-rose-50/50",
          },
        ].map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className={`p-4 rounded-2xl border ${item.color} hover:shadow-md transition flex flex-col justify-between group`}
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">{item.icon}</span>
              {item.badge && (
                <span className="text-[10px] bg-red-600 text-white font-bold px-1.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </div>
            <div className="mt-3">
              <div className="text-xl sm:text-2xl font-extrabold text-slate-900">
                {loading ? "..." : item.count}
              </div>
              <div className="text-xs font-semibold text-slate-600 group-hover:text-[color:var(--brand)] transition truncate">
                {item.title} →
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Guide & Instructions Box */}
      <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 rounded-2xl border border-amber-200 p-6">
        <h2 className="text-base font-bold text-amber-950 flex items-center gap-2">
          <span>💡</span>
          <span>सदस्य व्यवस्थापन एवं CV जेनेरेटर सम्बन्धी जानकारी (Members & CV Guide):</span>
        </h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-3 text-xs text-slate-700">
          <div className="bg-white/80 p-3 rounded-xl border border-amber-200/60">
            <b className="text-slate-900 block mb-1">१. सदस्य विवरण थप्ने (Admin Form):</b>
            बायाँ मेनुमा <b>सदस्यहरु (Members)</b> मा जानुहोस् र "+ नयाँ सदस्य थप्नुहोस्" थिचेर संस्थापक, मानार्थ, आजीवन वा साधारण सदस्यको नाम, शैक्षिक योग्यता र पेशा दर्ता गर्नुहोस्।
          </div>
          <div className="bg-white/80 p-3 rounded-xl border border-amber-200/60">
            <b className="text-slate-900 block mb-1">२. सदस्य लगइन (Member Portal):</b>
            सदस्यहरुले वेबसाइटको <b>/member/login</b> मा गई आफ्नो इमेल र पासवर्ड प्रयोग गरी लगइन गर्न सक्छन्।
          </div>
          <div className="bg-white/80 p-3 rounded-xl border border-amber-200/60">
            <b className="text-slate-900 block mb-1">३. CV जेनेरेटर र ३ ढाँचा (3 Templates):</b>
            सदस्य स्वयंले आफ्नो पूर्ण कार्य इतिहास, शैक्षिक इतिहास लेखेर ३ विभिन्न शैलीमा बायोडाटा (CV) तुरुन्तै प्रिन्ट वा PDF मा सेभ गर्न सक्नुहुन्छ।
          </div>
        </div>
      </div>

      {/* Recent Members & Activities Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Members */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900">
              दर्ता भएका सदस्यहरु (Recent Members)
            </h2>
            <Link
              href="/admin/members"
              className="text-xs text-[color:var(--brand)] font-semibold hover:underline"
            >
              सबै हेर्नुहोस् →
            </Link>
          </div>

          {loading ? (
            <p className="text-xs text-slate-500 py-4">लोड हुँदैछ...</p>
          ) : recentMembers.length === 0 ? (
            <p className="text-xs text-slate-500 py-4">कुनै सदस्य फेला परेन।</p>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentMembers.map((m) => (
                <div key={m.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-slate-800 truncate">
                      {m.name} {m.nameNe ? `(${m.nameNe})` : ""}
                    </h3>
                    <p className="text-xs text-slate-500 truncate">
                      🆔 {m.membershipNo} • <span className="uppercase text-purple-700 font-bold">{m.membershipType}</span> • 🏢 {m.profession || m.education || "Member"}
                    </p>
                  </div>
                  <Link
                    href="/admin/members"
                    className="text-xs bg-slate-100 hover:bg-amber-100 text-slate-700 font-medium px-3 py-1.5 rounded-lg shrink-0 transition"
                  >
                    सम्पादन
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900">
              हालैका गतिविधिहरु (Recent Activities)
            </h2>
            <Link
              href="/admin/activities"
              className="text-xs text-[color:var(--brand)] font-semibold hover:underline"
            >
              सबै हेर्नुहोस् →
            </Link>
          </div>

          {loading ? (
            <p className="text-xs text-slate-500 py-4">लोड हुँदैछ...</p>
          ) : recentActivities.length === 0 ? (
            <p className="text-xs text-slate-500 py-4">कुनै गतिविधि फेला परेन।</p>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentActivities.map((act) => (
                <div key={act.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-slate-800 truncate">
                      {act.title}
                    </h3>
                    <p className="text-xs text-slate-500">
                      📅 {act.dateNe} {act.published ? "• ✅ प्रकाशित" : "• ⏸ ड्राफ्ट"}
                    </p>
                  </div>
                  <Link
                    href="/admin/activities"
                    className="text-xs bg-slate-100 hover:bg-amber-100 text-slate-700 font-medium px-3 py-1.5 rounded-lg shrink-0 transition"
                  >
                    सम्पादन
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
