import { NextResponse } from "next/server";
import { db } from "@/db";
import { contactMessages } from "@/db/schema";
import { getSessionAdmin } from "@/lib/auth";
import { desc, eq } from "drizzle-orm";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

export async function GET(req: Request) {
  const session = await getSessionAdmin(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const messages = await db
      .select()
      .from(contactMessages)
      .orderBy(desc(contactMessages.createdAt));
    return NextResponse.json({ messages });
  } catch (err) {
    console.error("GET messages error:", err);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const session = await getSessionAdmin(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, isRead } = body;
    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    const [updated] = await db
      .update(contactMessages)
      .set({ isRead: Boolean(isRead) })
      .where(eq(contactMessages.id, Number(id)))
      .returning();

    return NextResponse.json({ ok: true, message: updated });
  } catch (err) {
    console.error("PUT message error:", err);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
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

    await db.delete(contactMessages).where(eq(contactMessages.id, Number(id)));
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("DELETE message error:", err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
