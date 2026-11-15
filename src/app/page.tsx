import { db } from "@/db";
import { activities, committeeMembers, siteSettings } from "@/db/schema";
import { desc, eq, asc } from "drizzle-orm";
import { ensureSeeded } from "@/lib/seed";
import HomeClient from "@/components/pages/HomeClient";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  await ensureSeeded();

  let featuredActivities: any[] = [];
  let leadership: any[] = [];
  let marqueeText = "";

  try {
    featuredActivities = await db
      .select()
      .from(activities)
      .where(eq(activities.published, true))
      .orderBy(desc(activities.createdAt))
      .limit(3);

    leadership = await db
      .select()
      .from(committeeMembers)
      .orderBy(asc(committeeMembers.orderNum))
      .limit(6);

    const [settingRow] = await db
      .select()
      .from(siteSettings)
      .where(eq(siteSettings.key, "marquee_text"));
    if (settingRow?.value) {
      marqueeText = settingRow.value;
    }
  } catch (err) {
    console.error("Home page DB load error:", err);
  }

  return (
    <HomeClient
      initialActivities={featuredActivities}
      initialLeadership={leadership}
      initialMarquee={marqueeText}
    />
  );
}
