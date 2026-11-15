import { NextResponse } from "next/server";
import { db } from "@/db";
import { siteSettings } from "@/db/schema";
import { getSessionAdmin } from "@/lib/auth";
import { ensureSeeded } from "@/lib/seed";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

export async function GET(req: Request) {
  await ensureSeeded();
  try {
    const list = await db.select().from(siteSettings);
    const settingsMap: Record<string, string> = {};
    for (const item of list) {
      settingsMap[item.key] = item.value;
    }
    return NextResponse.json({ settings: settingsMap });
  } catch (err) {
    console.error("GET settings error:", err);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getSessionAdmin(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { settings } = body; // Record<string, string>

    if (settings && typeof settings === "object") {
      for (const [key, value] of Object.entries(settings)) {
        await db
          .insert(siteSettings)
          .values({ key, value: String(value), updatedAt: new Date() })
          .onConflictDoUpdate({
            target: siteSettings.key,
            set: { value: String(value), updatedAt: new Date() },
          });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("POST settings error:", err);
    return NextResponse.json({ error: "सेटिङ सुरक्षित गर्न असफल भयो।" }, { status: 500 });
  }
}
