import { db } from "@/db";
import { activities } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { ensureSeeded } from "@/lib/seed";
import ActivitiesListClient from "@/components/pages/ActivitiesListClient";

export const dynamic = "force-dynamic";

export default async function ActivitiesPage() {
  await ensureSeeded();

  let list: any[] = [];
  try {
    list = await db
      .select()
      .from(activities)
      .where(eq(activities.published, true))
      .orderBy(desc(activities.createdAt));
  } catch (err) {
    console.error("Activities error:", err);
  }

  return <ActivitiesListClient list={list} />;
}
