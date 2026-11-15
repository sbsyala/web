import { NextResponse } from "next/server";
import { db } from "@/db";
import { members } from "@/db/schema";
import { sql } from "drizzle-orm";
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

    const name = String(body?.name ?? "").trim();
    const nameNe = body?.nameNe ? String(body.nameNe).trim() : null;
    const email = String(body?.email ?? "").trim().toLowerCase();
    const password = String(body?.password ?? "").trim();
    const membershipType = String(body?.membershipType ?? "general").trim();
    const phone = body?.phone ? String(body.phone).trim() : null;
    const education = body?.education ? String(body.education).trim() : null;
    const profession = body?.profession ? String(body.profession).trim() : null;
    const address = body?.address ? String(body.address).trim() : null;
    const bahalBahi = body?.bahalBahi ? String(body.bahalBahi).trim() : null;
    const bio = body?.bio ? String(body.bio).trim() : null;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "कृपया पुरा नाम, इमेल र पासवर्ड भर्नुहोस्।" },
        { status: 400 }
      );
    }

    if (password.length < 4) {
      return NextResponse.json(
        { error: "पासवर्ड कम्तीमा ४ अक्षरको हुनुपर्छ।" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const [existing] = await db
      .select()
      .from(members)
      .where(sql`LOWER(${members.email}) = ${email}`);

    if (existing) {
      return NextResponse.json(
        {
          error:
            "यो इमेल पहिले नै दर्ता भइसकेको छ। कृपया 'पासवर्ड रिसेट' ट्याबबाट पासवर्ड बनाउनुहोस् वा सिधै लगइन गर्नुहोस्।",
        },
        { status: 409 }
      );
    }

    const typePrefix =
      membershipType === "founder"
        ? "FM"
        : membershipType === "honorary"
        ? "HM"
        : membershipType === "life"
        ? "LM"
        : "GM";

    const uniqueSuffix = Math.floor(1000 + Math.random() * 9000);
    const membershipNo = `SBS-${typePrefix}-${uniqueSuffix}`;

    const defaultCv = JSON.stringify({
      title: profession || "Member of Shakya Bajracharya Samaj",
      summary: bio || "",
      languages: ["Nepal Bhasa", "Nepali", "English"],
      nationality: "Nepali",
      educationHistory: education
        ? [{ degree: education, institution: "Recognized Institution", year: "", grade: "" }]
        : [],
      experienceHistory: profession
        ? [
            {
              jobTitle: profession,
              company: "Organization / Business",
              fromDate: "",
              toDate: "Present",
              current: true,
              responsibilities: "",
            },
          ]
        : [],
      skills: [],
      awardsAchievements: [],
    });

    const [newMember] = await db
      .insert(members)
      .values({
        membershipNo,
        membershipType,
        name,
        nameNe,
        email,
        passwordHash: hashPassword(password),
        phone,
        education,
        profession,
        address,
        bahalBahi,
        bio,
        cvData: defaultCv,
        status: "active",
      })
      .returning();

    const token = createMemberToken({
      id: newMember.id,
      membershipNo: newMember.membershipNo,
      email: newMember.email,
      name: newMember.name,
      membershipType: newMember.membershipType,
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
        id: newMember.id,
        membershipNo: newMember.membershipNo,
        name: newMember.name,
        nameNe: newMember.nameNe,
        email: newMember.email,
        membershipType: newMember.membershipType,
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
    console.error("Member register error:", err);
    return NextResponse.json(
      { error: "सदस्य दर्ता गर्न समस्या भयो। कृपया पुनः प्रयास गर्नुहोस्।" },
      { status: 500 }
    );
  }
}
