import { NextResponse } from "next/server";
import { db } from "@/db";
import { members } from "@/db/schema";
import { or, sql, eq } from "drizzle-orm";
import { createMemberToken, hashPassword } from "@/lib/auth";
import { ensureSeeded } from "@/lib/seed";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    await ensureSeeded();
    const body = await req.json();

    const identifier = String(body?.identifier ?? body?.email ?? "").trim();
    const newPassword = String(body?.newPassword ?? body?.password ?? "").trim();

    if (!identifier || !newPassword) {
      return NextResponse.json(
        { error: "इमेल वा सदस्यता नम्बर र नयाँ पासवर्ड आवश्यक छ।" },
        { status: 400 }
      );
    }

    if (newPassword.length < 4) {
      return NextResponse.json(
        { error: "नयाँ पासवर्ड कम्तीमा ४ अक्षरको हुनुपर्छ।" },
        { status: 400 }
      );
    }

    const cleanIdentifier = identifier.toLowerCase();

    // Find member by email or membership number
    const [user] = await db
      .select()
      .from(members)
      .where(
        or(
          sql`LOWER(${members.email}) = ${cleanIdentifier}`,
          sql`LOWER(${members.membershipNo}) = ${cleanIdentifier}`
        )
      );

    if (!user) {
      return NextResponse.json(
        {
          error:
            "उक्त इमेल वा सदस्यता नम्बर प्रणालीमा फेला परेन। कृपया नयाँ सदस्यता दर्ता गर्नुहोस्।",
        },
        { status: 404 }
      );
    }

    // Update password hash
    const [updated] = await db
      .update(members)
      .set({
        passwordHash: hashPassword(newPassword),
        updatedAt: new Date(),
      })
      .where(eq(members.id, user.id))
      .returning();

    // Auto log them in
    const token = createMemberToken({
      id: updated.id,
      membershipNo: updated.membershipNo,
      email: updated.email,
      name: updated.name,
      membershipType: updated.membershipType,
    });

    try {
      const cookieStore = await cookies();
      cookieStore.set("sb_member_token", token, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 14,
      });
    } catch {
      // ignore
    }

    const res = NextResponse.json({
      ok: true,
      token,
      message: "पासवर्ड सफलतापूर्वक परिवर्तन भयो !",
      member: {
        id: updated.id,
        membershipNo: updated.membershipNo,
        name: updated.name,
        nameNe: updated.nameNe,
        email: updated.email,
        membershipType: updated.membershipType,
      },
    });

    res.cookies.set("sb_member_token", token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 14,
    });

    return res;
  } catch (err) {
    console.error("Reset password error:", err);
    return NextResponse.json(
      { error: "पासवर्ड अपडेट गर्न असफल भयो।" },
      { status: 500 }
    );
  }
}
