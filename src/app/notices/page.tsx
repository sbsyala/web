import { db } from "@/db";
import { notices } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { ensureSeeded } from "@/lib/seed";
import NoticesClient from "@/components/pages/NoticesClient";

export const dynamic = "force-dynamic";

export default async function NoticesPage() {
  await ensureSeeded();

  let list: any[] = [];
  try {
    list = await db
      .select()
      .from(notices)
      .where(eq(notices.isActive, true))
      .orderBy(desc(notices.createdAt));
  } catch (err) {
    console.error("Notices error:", err);
  }

  return <NoticesClient notices={list} />;
}
