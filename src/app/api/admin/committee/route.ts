import { NextResponse } from "next/server";
import { db } from "@/db";
import { committeeMembers } from "@/db/schema";
import { getSessionAdmin } from "@/lib/auth";
import { asc, eq } from "drizzle-orm";
import { ensureSeeded } from "@/lib/seed";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

export async function GET(req: Request) {
  await ensureSeeded();
  try {
    const list = await db
      .select()
      .from(committeeMembers)
      .orderBy(asc(committeeMembers.orderNum));
    return NextResponse.json({ members: list });
  } catch (err) {
    console.error("GET committee error:", err);
    return NextResponse.json({ error: "Failed to fetch committee" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getSessionAdmin(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, position, image, orderNum } = body;

    if (!name || !position || !image) {
      return NextResponse.json({ error: "नाम, पद र तस्वीर URL आवश्यक छ।" }, { status: 400 });
    }

    const [inserted] = await db
      .insert(committeeMembers)
      .values({
        name: name.trim(),
        position: position.trim(),
        image: image.trim(),
        orderNum: Number(orderNum) || 0,
      })
      .returning();

    return NextResponse.json({ ok: true, member: inserted });
  } catch (err) {
    console.error("POST committee error:", err);
    return NextResponse.json({ error: "सदस्य थप्न असफल भयो।" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const session = await getSessionAdmin(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, name, position, image, orderNum } = body;

    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    const [updated] = await db
      .update(committeeMembers)
      .set({
        name: name?.trim(),
        position: position?.trim(),
        image: image?.trim(),
        orderNum: Number(orderNum) || 0,
      })
      .where(eq(committeeMembers.id, Number(id)))
      .returning();

    return NextResponse.json({ ok: true, member: updated });
  } catch (err) {
    console.error("PUT committee error:", err);
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

    await db.delete(committeeMembers).where(eq(committeeMembers.id, Number(id)));
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("DELETE committee error:", err);
    return NextResponse.json({ error: "मेटाउन असफल भयो।" }, { status: 500 });
  }
}
