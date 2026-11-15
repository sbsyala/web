import { NextResponse } from "next/server";
import { db } from "@/db";
import { notices } from "@/db/schema";
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
      .from(notices)
      .orderBy(desc(notices.createdAt));
    return NextResponse.json({ notices: list });
  } catch (err) {
    console.error("GET notices error:", err);
    return NextResponse.json({ error: "Failed to fetch notices" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getSessionAdmin(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, dateNe, paragraphs, image, isActive } = body;

    if (!title || !dateNe) {
      return NextResponse.json({ error: "शीर्षक र मिति आवश्यक छ।" }, { status: 400 });
    }

    const bodyJson = Array.isArray(paragraphs)
      ? JSON.stringify(paragraphs)
      : JSON.stringify([typeof paragraphs === "string" ? paragraphs : ""]);

    const [inserted] = await db
      .insert(notices)
      .values({
        title: title.trim(),
        dateNe: dateNe.trim(),
        body: bodyJson,
        image: image ? image.trim() : null,
        isActive: isActive !== false,
      })
      .returning();

    return NextResponse.json({ ok: true, notice: inserted });
  } catch (err) {
    console.error("POST notice error:", err);
    return NextResponse.json({ error: "सूचना थप्न असफल भयो।" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const session = await getSessionAdmin(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, title, dateNe, paragraphs, image, isActive } = body;

    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    const bodyJson = Array.isArray(paragraphs)
      ? JSON.stringify(paragraphs)
      : JSON.stringify([typeof paragraphs === "string" ? paragraphs : ""]);

    const [updated] = await db
      .update(notices)
      .set({
        title: title?.trim(),
        dateNe: dateNe?.trim(),
        body: bodyJson,
        image: image ? image.trim() : null,
        isActive: isActive !== false,
      })
      .where(eq(notices.id, Number(id)))
      .returning();

    return NextResponse.json({ ok: true, notice: updated });
  } catch (err) {
    console.error("PUT notice error:", err);
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

    await db.delete(notices).where(eq(notices.id, Number(id)));
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("DELETE notice error:", err);
    return NextResponse.json({ error: "मेटाउन असफल भयो।" }, { status: 500 });
  }
}
