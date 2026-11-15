import { NextResponse } from "next/server";
import { db } from "@/db";
import { activities } from "@/db/schema";
import { getSessionAdmin } from "@/lib/auth";
import { desc, eq } from "drizzle-orm";
import { ensureSeeded } from "@/lib/seed";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

export async function GET(req: Request) {
  await ensureSeeded();
  try {
    const list = await db
      .select()
      .from(activities)
      .orderBy(desc(activities.createdAt));
    return NextResponse.json({ activities: list });
  } catch (err) {
    console.error("GET activities error:", err);
    return NextResponse.json({ error: "Failed to fetch activities" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getSessionAdmin(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, dateNe, dateEn, cover, excerpt, paragraphs, galleryImages, published } = body;

    if (!title || !dateNe || !cover || !excerpt) {
      return NextResponse.json({ error: "शीर्षक, मिति, कभर तस्वीर र सारांश आवश्यक छ।" }, { status: 400 });
    }

    const baseSlug = (title || "activity")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\u0900-\u097F]+/g, "-")
      .replace(/^-+|-+$/g, "");
    const slug = `${baseSlug || "post"}-${Date.now().toString(36)}`;

    const bodyJson = Array.isArray(paragraphs)
      ? JSON.stringify(paragraphs)
      : JSON.stringify([typeof paragraphs === "string" ? paragraphs : ""]);

    const galleryJson = Array.isArray(galleryImages) && galleryImages.length > 0
      ? JSON.stringify(galleryImages)
      : null;

    const [inserted] = await db
      .insert(activities)
      .values({
        slug,
        title: title.trim(),
        dateNe: dateNe.trim(),
        dateEn: (dateEn || new Date().toDateString()).trim(),
        cover: cover.trim(),
        excerpt: excerpt.trim(),
        body: bodyJson,
        gallery: galleryJson,
        published: published !== false,
      })
      .returning();

    return NextResponse.json({ ok: true, activity: inserted });
  } catch (err) {
    console.error("POST activity error:", err);
    return NextResponse.json({ error: "गतिविधि थप्न असफल भयो।" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const session = await getSessionAdmin(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, title, dateNe, dateEn, cover, excerpt, paragraphs, galleryImages, published } = body;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const bodyJson = Array.isArray(paragraphs)
      ? JSON.stringify(paragraphs)
      : JSON.stringify([typeof paragraphs === "string" ? paragraphs : ""]);

    const galleryJson = Array.isArray(galleryImages) && galleryImages.length > 0
      ? JSON.stringify(galleryImages)
      : null;

    const [updated] = await db
      .update(activities)
      .set({
        title: title?.trim(),
        dateNe: dateNe?.trim(),
        dateEn: dateEn?.trim(),
        cover: cover?.trim(),
        excerpt: excerpt?.trim(),
        body: bodyJson,
        gallery: galleryJson,
        published: published !== false,
        updatedAt: new Date(),
      })
      .where(eq(activities.id, Number(id)))
      .returning();

    return NextResponse.json({ ok: true, activity: updated });
  } catch (err) {
    console.error("PUT activity error:", err);
    return NextResponse.json({ error: "गतिविधि सम्पादन गर्न असफल भयो।" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await getSessionAdmin(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    await db.delete(activities).where(eq(activities.id, Number(id)));
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("DELETE activity error:", err);
    return NextResponse.json({ error: "मेटाउन असफल भयो।" }, { status: 500 });
  }
}
