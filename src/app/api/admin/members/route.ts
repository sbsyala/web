import { NextResponse } from "next/server";
import { db } from "@/db";
import { members } from "@/db/schema";
import { getSessionAdmin, hashPassword } from "@/lib/auth";
import { asc, eq } from "drizzle-orm";
import { ensureSeeded } from "@/lib/seed";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

export async function GET(req: Request) {
  await ensureSeeded();
  const session = await getSessionAdmin(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const list = await db.select().from(members).orderBy(asc(members.id));
    return NextResponse.json({ members: list });
  } catch (err) {
    console.error("GET admin members error:", err);
    return NextResponse.json({ error: "Failed to fetch members" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getSessionAdmin(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      membershipNo,
      membershipType,
      name,
      nameNe,
      email,
      password,
      phone,
      photo,
      education,
      profession,
      address,
      bahalBahi,
      bio,
    } = body;

    if (!name || !email || !membershipType) {
      return NextResponse.json(
        { error: "नाम, इमेल र सदस्यता प्रकार आवश्यक छ।" },
        { status: 400 }
      );
    }

    const defaultMembershipNo =
      membershipNo ||
      `SBS-${membershipType.substring(0, 2).toUpperCase()}-${Date.now().toString().slice(-4)}`;

    const defaultCv = JSON.stringify({
      title: profession || "Member of Shakya Bajracharya Samaj",
      summary: bio || "",
      languages: ["Nepali", "Nepal Bhasa", "English"],
      nationality: "Nepali",
      educationHistory: education
        ? [{ degree: education, institution: "Recognized Institution", year: "", grade: "" }]
        : [],
      experienceHistory: profession
        ? [{ jobTitle: profession, company: "Organization / Business", fromDate: "", toDate: "Present", current: true, responsibilities: "" }]
        : [],
      skills: [],
      awardsAchievements: [],
    });

    const [inserted] = await db
      .insert(members)
      .values({
        membershipNo: defaultMembershipNo.trim(),
        membershipType: membershipType.trim(),
        name: name.trim(),
        nameNe: nameNe ? nameNe.trim() : null,
        email: email.trim().toLowerCase(),
        passwordHash: hashPassword(password || "member123"),
        phone: phone ? phone.trim() : null,
        photo: photo ? photo.trim() : null,
        education: education ? education.trim() : null,
        profession: profession ? profession.trim() : null,
        address: address ? address.trim() : null,
        bahalBahi: bahalBahi ? bahalBahi.trim() : null,
        bio: bio ? bio.trim() : null,
        cvData: defaultCv,
        status: "active",
      })
      .returning();

    return NextResponse.json({ ok: true, member: inserted });
  } catch (err) {
    console.error("POST admin member error:", err);
    return NextResponse.json(
      { error: "सदस्य थप्न असफल भयो (इमेल वा सदस्यता नं. दोहोरिएको हुन सक्छ)।" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  const session = await getSessionAdmin(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      id,
      membershipNo,
      membershipType,
      name,
      nameNe,
      email,
      password,
      phone,
      photo,
      education,
      profession,
      address,
      bahalBahi,
      bio,
      status,
    } = body;

    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    const updateData: any = {
      membershipNo: membershipNo?.trim(),
      membershipType: membershipType?.trim(),
      name: name?.trim(),
      nameNe: nameNe?.trim(),
      email: email?.trim().toLowerCase(),
      phone: phone?.trim(),
      photo: photo?.trim(),
      education: education?.trim(),
      profession: profession?.trim(),
      address: address?.trim(),
      bahalBahi: bahalBahi?.trim(),
      bio: bio?.trim(),
      status: status || "active",
      updatedAt: new Date(),
    };

    if (password && password.trim().length > 0) {
      updateData.passwordHash = hashPassword(password.trim());
    }

    const [updated] = await db
      .update(members)
      .set(updateData)
      .where(eq(members.id, Number(id)))
      .returning();

    return NextResponse.json({ ok: true, member: updated });
  } catch (err) {
    console.error("PUT admin member error:", err);
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

    await db.delete(members).where(eq(members.id, Number(id)));
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("DELETE admin member error:", err);
    return NextResponse.json({ error: "मेटाउन असफल भयो।" }, { status: 500 });
  }
}
