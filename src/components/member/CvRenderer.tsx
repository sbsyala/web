"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  template: "template1" | "template2" | "template3";
  member: any;
  cv: {
    title?: string;
    summary?: string;
    dob?: string;
    bloodGroup?: string;
    languages?: string[];
    nationality?: string;
    fatherName?: string;
    motherName?: string;
    spouseName?: string;
    educationHistory?: Array<{ degree: string; institution: string; year: string; grade: string }>;
    experienceHistory?: Array<{ jobTitle: string; company: string; fromDate: string; toDate: string; current?: boolean; responsibilities: string }>;
    skills?: string[];
    awardsAchievements?: string[];
  };
}

export default function CvRenderer({ template, member, cv }: Props) {
  const { t, language } = useLanguage();

  const name = language === "ne" && member.nameNe ? member.nameNe : member.name;
  const title = cv.title || member.profession || "Member of Shakya Bajracharya Samaj";
  const summary = cv.summary || member.bio || "";
  const educationHistory = cv.educationHistory || [];
  const experienceHistory = cv.experienceHistory || [];
  const skills = cv.skills || [];
  const awards = cv.awardsAchievements || [];

  // ==========================================
  // TEMPLATE 1: TRADITIONAL VAJRAYANA HERITAGE
  // ==========================================
  if (template === "template1") {
    return (
      <div className="bg-white text-slate-900 font-serif p-8 sm:p-12 max-w-4xl mx-auto shadow-xl border-4 border-[#7a1f1f] rounded-lg printable-cv">
        {/* Header */}
        <div className="border-b-2 border-amber-500 pb-6 mb-6 flex flex-col sm:flex-row items-center justify-between gap-6 bg-[#fdf7ec] p-6 rounded-lg">
          <div className="flex items-center gap-5 text-center sm:text-left">
            {member.photo && (
              <div className="relative w-28 h-28 rounded-full overflow-hidden border-3 border-amber-600 shadow-md shrink-0">
                <Image src={member.photo} alt={name} fill className="object-cover" unoptimized />
              </div>
            )}
            <div>
              <div className="text-amber-800 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 justify-center sm:justify-start">
                <span>☸</span>
                <span>शाक्य बज्राचार्य समाज, यल · Lalitpur, Nepal</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#7a1f1f] mt-1">
                {name}
              </h1>
              <p className="text-sm font-semibold text-amber-900 mt-0.5">{title}</p>
              <div className="text-xs text-slate-700 mt-2 flex flex-wrap gap-x-4 gap-y-1 justify-center sm:justify-start font-sans">
                <span>🆔 {member.membershipNo}</span>
                <span>📍 {member.address || "Lalitpur"}</span>
                {member.bahalBahi && <span>☸ {member.bahalBahi}</span>}
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-700 font-sans space-y-1 bg-white p-3.5 rounded-lg border border-amber-200 shrink-0">
            <div>✉️ {member.email}</div>
            {member.phone && <div>📞 {member.phone}</div>}
            <div className="text-[10px] text-amber-800 font-bold uppercase mt-1">
              Membership: {member.membershipType?.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Summary */}
        {summary && (
          <div className="mb-6">
            <h2 className="text-base font-bold text-[#7a1f1f] uppercase tracking-wider border-b border-amber-300 pb-1 mb-2 flex items-center gap-2">
              <span>✦</span>
              <span>{t.memberPortal.cvSummaryLabel}</span>
            </h2>
            <p className="text-sm leading-relaxed text-slate-800 italic">{summary}</p>
          </div>
        )}

        {/* Two Column Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-6">
          {/* Main Column */}
          <div className="md:col-span-2 space-y-6">
            {/* Experience */}
            {experienceHistory.length > 0 && (
              <div>
                <h2 className="text-base font-bold text-[#7a1f1f] uppercase tracking-wider border-b border-amber-300 pb-1 mb-3 flex items-center gap-2">
                  <span>✦</span>
                  <span>{t.memberPortal.experienceHistory}</span>
                </h2>
                <div className="space-y-4">
                  {experienceHistory.map((exp, idx) => (
                    <div key={idx} className="border-l-2 border-amber-600 pl-3.5">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-sm text-slate-900">{exp.jobTitle}</h3>
                        <span className="text-xs text-amber-900 font-sans font-semibold">
                          {exp.fromDate} – {exp.toDate || "Present"}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-[#7a1f1f]">{exp.company}</div>
                      {exp.responsibilities && (
                        <p className="text-xs text-slate-700 mt-1 leading-relaxed">{exp.responsibilities}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {educationHistory.length > 0 && (
              <div>
                <h2 className="text-base font-bold text-[#7a1f1f] uppercase tracking-wider border-b border-amber-300 pb-1 mb-3 flex items-center gap-2">
                  <span>✦</span>
                  <span>{t.memberPortal.educationHistory}</span>
                </h2>
                <div className="space-y-3">
                  {educationHistory.map((edu, idx) => (
                    <div key={idx} className="border-l-2 border-amber-600 pl-3.5">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-sm text-slate-900">{edu.degree}</h3>
                        {edu.year && <span className="text-xs text-slate-600 font-sans">{edu.year}</span>}
                      </div>
                      <div className="text-xs text-[#7a1f1f] font-semibold">{edu.institution}</div>
                      {edu.grade && <div className="text-[11px] text-slate-600">Grade/Division: {edu.grade}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Side Column */}
          <div className="space-y-6 font-sans">
            {/* Personal Details */}
            <div className="bg-[#fdf7ec] p-4 rounded-lg border border-amber-200">
              <h2 className="text-xs font-bold text-[#7a1f1f] uppercase tracking-wider pb-1 mb-2 border-b border-amber-300">
                {t.memberPortal.personalDetails}
              </h2>
              <div className="text-xs space-y-1.5 text-slate-700">
                {cv.dob && <div><b>DOB:</b> {cv.dob}</div>}
                {cv.bloodGroup && <div><b>Blood Group:</b> {cv.bloodGroup}</div>}
                {cv.nationality && <div><b>Nationality:</b> {cv.nationality}</div>}
                {cv.fatherName && <div><b>Father:</b> {cv.fatherName}</div>}
                {cv.motherName && <div><b>Mother:</b> {cv.motherName}</div>}
                {cv.spouseName && <div><b>Spouse:</b> {cv.spouseName}</div>}
                {cv.languages && cv.languages.length > 0 && (
                  <div><b>Languages:</b> {cv.languages.join(", ")}</div>
                )}
              </div>
            </div>

            {/* Skills */}
            {skills.length > 0 && (
              <div>
                <h2 className="text-xs font-bold text-[#7a1f1f] uppercase tracking-wider pb-1 mb-2 border-b border-amber-300">
                  {t.memberPortal.skillsHeading}
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((s, idx) => (
                    <span key={idx} className="bg-amber-100 text-amber-950 text-[11px] font-semibold px-2 py-0.5 rounded border border-amber-200">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Awards */}
            {awards.length > 0 && (
              <div>
                <h2 className="text-xs font-bold text-[#7a1f1f] uppercase tracking-wider pb-1 mb-2 border-b border-amber-300">
                  {t.memberPortal.awardsHeading}
                </h2>
                <ul className="text-xs space-y-1 text-slate-700 list-disc list-inside">
                  {awards.map((a, idx) => (
                    <li key={idx}>{a}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-amber-300 pt-4 text-center text-[10px] text-slate-500 font-sans">
          Curriculum Vitae — Verified Member of Shakya Bajracharya Samaj Yala (Registration No. 5587/2075)
        </div>
      </div>
    );
  }

  // ==========================================
  // TEMPLATE 2: MODERN CORPORATE EXECUTIVE (BLUE)
  // ==========================================
  if (template === "template2") {
    return (
      <div className="bg-white text-slate-900 font-sans p-8 sm:p-12 max-w-4xl mx-auto shadow-xl rounded-xl border border-slate-200 printable-cv">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-blue-950 text-white p-8 rounded-2xl shadow-lg mb-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6 text-center sm:text-left">
            {member.photo && (
              <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-blue-400 shadow-lg shrink-0">
                <Image src={member.photo} alt={name} fill className="object-cover" unoptimized />
              </div>
            )}
            <div>
              <span className="bg-blue-600/60 text-blue-200 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-blue-400/40">
                {member.membershipType} Member · {member.membershipNo}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black mt-2 tracking-tight">
                {name}
              </h1>
              <p className="text-sm font-medium text-blue-200 mt-0.5">{title}</p>
              <p className="text-xs text-slate-300 mt-2">
                📍 {member.address || "Lalitpur, Nepal"} {member.bahalBahi ? `• ☸ ${member.bahalBahi}` : ""}
              </p>
            </div>
          </div>

          <div className="text-xs text-slate-200 space-y-1.5 bg-white/10 p-4 rounded-xl border border-white/15 backdrop-blur shrink-0">
            <div>✉️ {member.email}</div>
            {member.phone && <div>📞 {member.phone}</div>}
            <div className="text-[11px] text-blue-300 pt-1 font-semibold">
              Shakya Bajracharya Samaj Yala
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        {summary && (
          <div className="mb-8 bg-blue-50/60 p-5 rounded-xl border-l-4 border-blue-600">
            <h2 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-1">
              {t.memberPortal.cvSummaryLabel}
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">{summary}</p>
          </div>
        )}

        {/* 2 Column Layout */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main 2 Cols */}
          <div className="md:col-span-2 space-y-8">
            {/* Work History */}
            {experienceHistory.length > 0 && (
              <div>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b-2 border-blue-600 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  <span>{t.memberPortal.experienceHistory}</span>
                </h2>
                <div className="space-y-5">
                  {experienceHistory.map((exp, idx) => (
                    <div key={idx} className="relative pl-6 border-l-2 border-slate-200">
                      <span className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-blue-600 border-2 border-white shadow" />
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-slate-900">{exp.jobTitle}</h3>
                        <span className="text-xs bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded">
                          {exp.fromDate} – {exp.toDate || "Present"}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-blue-700">{exp.company}</div>
                      {exp.responsibilities && (
                        <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{exp.responsibilities}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education History */}
            {educationHistory.length > 0 && (
              <div>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b-2 border-blue-600 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  <span>{t.memberPortal.educationHistory}</span>
                </h2>
                <div className="space-y-4">
                  {educationHistory.map((edu, idx) => (
                    <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-slate-900">{edu.degree}</h3>
                        {edu.year && <span className="text-xs text-slate-500 font-mono">{edu.year}</span>}
                      </div>
                      <div className="text-xs font-semibold text-blue-800 mt-0.5">{edu.institution}</div>
                      {edu.grade && <div className="text-[11px] text-slate-600 mt-0.5">Grade: {edu.grade}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Personal Details */}
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 pb-1 border-b border-slate-200">
                {t.memberPortal.personalDetails}
              </h2>
              <div className="text-xs space-y-2 text-slate-700">
                {cv.dob && <div><span className="text-slate-500 block">DOB:</span> <span className="font-semibold">{cv.dob}</span></div>}
                {cv.bloodGroup && <div><span className="text-slate-500 block">Blood Group:</span> <span className="font-semibold">{cv.bloodGroup}</span></div>}
                {cv.nationality && <div><span className="text-slate-500 block">Nationality:</span> <span className="font-semibold">{cv.nationality}</span></div>}
                {cv.fatherName && <div><span className="text-slate-500 block">Father:</span> <span className="font-semibold">{cv.fatherName}</span></div>}
                {cv.motherName && <div><span className="text-slate-500 block">Mother:</span> <span className="font-semibold">{cv.motherName}</span></div>}
                {cv.spouseName && <div><span className="text-slate-500 block">Spouse:</span> <span className="font-semibold">{cv.spouseName}</span></div>}
                {cv.languages && cv.languages.length > 0 && (
                  <div><span className="text-slate-500 block">Languages:</span> <span className="font-semibold">{cv.languages.join(", ")}</span></div>
                )}
              </div>
            </div>

            {/* Skills */}
            {skills.length > 0 && (
              <div>
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 pb-1 border-b border-slate-200">
                  {t.memberPortal.skillsHeading}
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((s, idx) => (
                    <span key={idx} className="bg-blue-100 text-blue-900 text-xs font-semibold px-2.5 py-1 rounded-md">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Honors */}
            {awards.length > 0 && (
              <div>
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 pb-1 border-b border-slate-200">
                  {t.memberPortal.awardsHeading}
                </h2>
                <ul className="text-xs space-y-1.5 text-slate-700">
                  {awards.map((a, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-blue-600">🏆</span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <span>Official CV Profile • Shakya Bajracharya Samaj Yala</span>
          <span>Reg. No. 5587/2075</span>
        </div>
      </div>
    );
  }

  // ==========================================
  // TEMPLATE 3: ACADEMIC MINIMALIST MONOCHROME
  // ==========================================
  return (
    <div className="bg-white text-slate-900 font-serif p-8 sm:p-14 max-w-4xl mx-auto shadow-xl border border-slate-300 rounded printable-cv">
      {/* Header */}
      <div className="text-center pb-6 border-b-2 border-slate-900 mb-6">
        <h1 className="text-3xl font-bold uppercase tracking-wide text-slate-950">
          {name}
        </h1>
        <p className="text-base font-medium text-slate-800 mt-1 font-sans">{title}</p>
        <div className="text-xs text-slate-600 mt-2 flex items-center justify-center gap-3 flex-wrap font-sans">
          <span>✉️ {member.email}</span>
          <span>•</span>
          {member.phone && <span>📞 {member.phone}</span>}
          <span>•</span>
          <span>📍 {member.address || "Lalitpur, Nepal"}</span>
          <span>•</span>
          <span>🆔 {member.membershipNo}</span>
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-400 pb-1 mb-2 font-sans">
            Profile Summary
          </h2>
          <p className="text-sm leading-relaxed text-slate-800">{summary}</p>
        </div>
      )}

      {/* Education First (Academic Style) */}
      {educationHistory.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-400 pb-1 mb-3 font-sans">
            Education & Academic Background
          </h2>
          <div className="space-y-3">
            {educationHistory.map((edu, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-950">{edu.degree}</h3>
                  <p className="text-xs text-slate-700 italic">{edu.institution} {edu.grade ? `— ${edu.grade}` : ""}</p>
                </div>
                {edu.year && <span className="text-xs text-slate-700 font-sans font-semibold shrink-0">{edu.year}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {experienceHistory.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-400 pb-1 mb-3 font-sans">
            Professional & Community Experience
          </h2>
          <div className="space-y-4">
            {experienceHistory.map((exp, idx) => (
              <div key={idx}>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <h3 className="text-sm font-bold text-slate-950">{exp.jobTitle}</h3>
                  <span className="text-xs text-slate-700 font-sans font-semibold">
                    {exp.fromDate} – {exp.toDate || "Present"}
                  </span>
                </div>
                <p className="text-xs text-slate-800 font-medium italic">{exp.company}</p>
                {exp.responsibilities && (
                  <p className="text-xs text-slate-700 mt-1 leading-relaxed">{exp.responsibilities}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills & Honors Grid */}
      <div className="grid sm:grid-cols-2 gap-6 mb-6 pt-2">
        {skills.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-400 pb-1 mb-2 font-sans">
              Expertise & Competencies
            </h2>
            <ul className="text-xs space-y-1 text-slate-800 list-disc list-inside">
              {skills.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ul>
          </div>
        )}

        {awards.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-400 pb-1 mb-2 font-sans">
              Honors & Recognition
            </h2>
            <ul className="text-xs space-y-1 text-slate-800 list-disc list-inside">
              {awards.map((a, idx) => (
                <li key={idx}>{a}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Personal / Sangha Heritage */}
      <div className="pt-4 border-t border-slate-300 text-xs text-slate-700 space-y-1 font-sans">
        <div className="flex flex-wrap gap-x-6 gap-y-1">
          {member.bahalBahi && <span><b>Monastery Affiliation:</b> {member.bahalBahi}</span>}
          {cv.dob && <span><b>DOB:</b> {cv.dob}</span>}
          {cv.languages && <span><b>Languages:</b> {cv.languages.join(", ")}</span>}
          {cv.nationality && <span><b>Nationality:</b> {cv.nationality}</span>}
        </div>
      </div>
    </div>
  );
}
