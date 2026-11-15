import { db } from "@/db";
import { committeeMembers } from "@/db/schema";
import { asc } from "drizzle-orm";
import { ensureSeeded } from "@/lib/seed";
import CommitteeClient from "@/components/pages/CommitteeClient";

export const dynamic = "force-dynamic";

export default async function CommitteePage() {
  await ensureSeeded();

  let members: any[] = [];
  try {
    members = await db
      .select()
      .from(committeeMembers)
      .orderBy(asc(committeeMembers.orderNum));
  } catch (err) {
    console.error("Committee error:", err);
  }

  return <CommitteeClient members={members} />;
}
