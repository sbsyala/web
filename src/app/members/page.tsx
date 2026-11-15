import { Suspense } from "react";
import { db } from "@/db";
import { members } from "@/db/schema";
import { asc } from "drizzle-orm";
import { ensureSeeded } from "@/lib/seed";
import MembersClient from "@/components/pages/MembersClient";

export const dynamic = "force-dynamic";

export default async function MembersPage() {
  await ensureSeeded();

  let list: any[] = [];
  try {
    list = await db
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
        status: members.status,
      })
      .from(members)
      .orderBy(asc(members.id));
  } catch (err) {
    console.error("Members load error:", err);
  }

  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading members...</div>}>
      <MembersClient members={list} />
    </Suspense>
  );
}
