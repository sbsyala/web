"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  required?: boolean;
}

export default function ImageUploadInput({
  value,
  onChange,
  label = "तस्वीर (Image)",
  required = false,
}: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const headers: Record<string, string> = {};
      if (typeof window !== "undefined") {
        const adminToken = localStorage.getItem("sb_admin_token");
        const memberToken = localStorage.getItem("sb_member_token");
        if (adminToken) {
          headers["Authorization"] = `Bearer ${adminToken}`;
        } else if (memberToken) {
          headers["Authorization"] = `Bearer ${memberToken}`;
        }
      }

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers,
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Upload failed");

      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "तस्वीर अपलोड असफल भयो");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="flex flex-col sm:flex-row gap-3 items-start">
        <div className="flex-1 w-full space-y-2">
          {/* Direct URL input */}
          <input
            type="text"
            placeholder="तस्वीरको URL (उदा. https://... वा /uploads/...)"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full text-sm rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />

          {/* File upload input */}
          <div className="flex items-center gap-2">
            <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-300 text-xs font-semibold text-amber-900 hover:bg-amber-100 transition">
              <span>📁 उपकरणबाट छान्नुहोस् (Choose File)</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={uploading}
                className="hidden"
              />
            </label>
            {uploading && (
              <span className="text-xs text-amber-700 animate-pulse">
                अपलोड हुँदैछ...
              </span>
            )}
          </div>
          {error && <p className="text-xs text-red-600">{error}</p>}
        </div>

        {/* Thumbnail Preview */}
        {value && (
          <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-slate-300 bg-slate-100 shrink-0">
            <Image
              src={value}
              alt="Preview"
              fill
              sizes="96px"
              className="object-cover"
              unoptimized
            />
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center shadow"
              title="हटाउनुहोस्"
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
