import { NextResponse } from "next/server";
import { db } from "@/db";
import { members } from "@/db/schema";
import { getSessionMember } from "@/lib/auth";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

export async function GET(req: Request) {
  const session = await getSessionMember(req);
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  try {
    const [member] = await db
      .select({
        id: members.id,
        membershipNo: members.membershipNo,
        membershipType: members.membershipType,
        name: members.name,
        nameNe: members.nameNe,
        email: members.email,
        phone: members.phone,
        photo: members.photo,
        education: members.education,
        profession: members.profession,
        address: members.address,
        bahalBahi: members.bahalBahi,
        bio: members.bio,
        cvData: members.cvData,
        status: members.status,
      })
      .from(members)
      .where(eq(members.id, session.id));

    if (!member) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({ authenticated: true, member });
  } catch (err) {
    console.error("Member ME error:", err);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}
