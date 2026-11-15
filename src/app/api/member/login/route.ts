import { NextResponse } from "next/server";
import { db } from "@/db";
import { members } from "@/db/schema";
import { or, sql } from "drizzle-orm";
import { createMemberToken, verifyPassword } from "@/lib/auth";
import { ensureSeeded } from "@/lib/seed";
import { cookies } from "next/headers";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    await ensureSeeded();
    const body = await req.json();
    const identifier = String(body?.email ?? body?.identifier ?? "").trim();
    const password = String(body?.password ?? "").trim();

    if (!identifier || !password) {
      return NextResponse.json(
        { error: "इमेल वा सदस्यता नम्बर र पासवर्ड आवश्यक छ।" },
        { status: 400 }
      );
    }

    const cleanIdentifier = identifier.toLowerCase();

    // Match by email (case-insensitive) OR membership number (case-insensitive)
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
          error: "उक्त इमेल वा सदस्यता नम्बर भेटिएन। कृपया नयाँ खाता दर्ता गर्नुहोस् वा पासवर्ड रिसेट गर्नुहोस्।",
        },
        { status: 401 }
      );
    }

    const valid = verifyPassword(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json(
        {
          error: "पासवर्ड गलत भयो। कृपया पासवर्ड रिसेट ट्याबबाट नयाँ पासवर्ड बनाउनुहोस्।",
        },
        { status: 401 }
      );
    }

    const token = createMemberToken({
      id: user.id,
      membershipNo: user.membershipNo,
      email: user.email,
      name: user.name,
      membershipType: user.membershipType,
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
      member: {
        id: user.id,
        membershipNo: user.membershipNo,
        name: user.name,
        nameNe: user.nameNe,
        email: user.email,
        membershipType: user.membershipType,
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
    console.error("Member login error:", err);
    return NextResponse.json({ error: "लगइन गर्न समस्या भयो।" }, { status: 500 });
  }
}
