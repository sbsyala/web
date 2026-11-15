import { NextResponse } from "next/server";
import { db } from "@/db";
import { members } from "@/db/schema";
import { getSessionMember, hashPassword } from "@/lib/auth";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

export async function PUT(req: Request) {
  const session = await getSessionMember(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      name,
      nameNe,
      phone,
      photo,
      education,
      profession,
      address,
      bahalBahi,
      bio,
      cvData,
      password,
    } = body;

    const updatePayload: any = {
      name: name?.trim() || session.name,
      nameNe: nameNe?.trim() || null,
      phone: phone?.trim() || null,
      photo: photo?.trim() || null,
      education: education?.trim() || null,
      profession: profession?.trim() || null,
      address: address?.trim() || null,
      bahalBahi: bahalBahi?.trim() || null,
      bio: bio?.trim() || null,
      cvData: typeof cvData === "string" ? cvData : JSON.stringify(cvData || {}),
      updatedAt: new Date(),
    };

    if (password && password.trim().length >= 4) {
      updatePayload.passwordHash = hashPassword(password.trim());
    }

    const [updated] = await db
      .update(members)
      .set(updatePayload)
      .where(eq(members.id, session.id))
      .returning();

    return NextResponse.json({ ok: true, member: updated });
  } catch (err) {
    console.error("Member profile update error:", err);
    return NextResponse.json({ error: "प्रोफाइल अपडेट गर्न असफल भयो।" }, { status: 500 });
  }
}
