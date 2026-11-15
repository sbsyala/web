import { NextResponse } from "next/server";
import { db } from "@/db";
import { galleryItems } from "@/db/schema";
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
      .from(galleryItems)
      .orderBy(desc(galleryItems.createdAt));
    return NextResponse.json({ gallery: list });
  } catch (err) {
    console.error("GET gallery error:", err);
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getSessionAdmin(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { src, caption, category } = body;

    if (!src || !caption) {
      return NextResponse.json({ error: "तस्वीर URL र विवरण (क्याप्सन) आवश्यक छ।" }, { status: 400 });
    }

    const [inserted] = await db
      .insert(galleryItems)
      .values({
        src: src.trim(),
        caption: caption.trim(),
        category: (category || "सामान्य").trim(),
      })
      .returning();

    return NextResponse.json({ ok: true, item: inserted });
  } catch (err) {
    console.error("POST gallery error:", err);
    return NextResponse.json({ error: "तस्वीर थप्न असफल भयो।" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const session = await getSessionAdmin(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, src, caption, category } = body;

    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    const [updated] = await db
      .update(galleryItems)
      .set({
        src: src?.trim(),
        caption: caption?.trim(),
        category: category?.trim(),
      })
      .where(eq(galleryItems.id, Number(id)))
      .returning();

    return NextResponse.json({ ok: true, item: updated });
  } catch (err) {
    console.error("PUT gallery error:", err);
    return NextResponse.json({ error: "सम्पादन असफल भयो।" }, { status: 500 });
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

    await db.delete(galleryItems).where(eq(galleryItems.id, Number(id)));
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("DELETE gallery error:", err);
    return NextResponse.json({ error: "मेटाउन असफल भयो।" }, { status: 500 });
  }
}
