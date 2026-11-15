import { notFound } from "next/navigation";
import { db } from "@/db";
import { activities } from "@/db/schema";
import { desc, eq, ne, and } from "drizzle-orm";
import { ensureSeeded } from "@/lib/seed";
import ActivityDetailClient from "@/components/pages/ActivityDetailClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const [act] = await db
      .select()
      .from(activities)
      .where(eq(activities.slug, slug));
    return { title: act?.title ?? "गतिविधि" };
  } catch {
    return { title: "गतिविधि" };
  }
}

export default async function ActivityDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await ensureSeeded();
  const { slug } = await params;

  let activity: any = null;
  let related: any[] = [];

  try {
    const [found] = await db
      .select()
      .from(activities)
      .where(eq(activities.slug, slug));

    if (!found) notFound();
    activity = found;

    related = await db
      .select()
      .from(activities)
      .where(and(eq(activities.published, true), ne(activities.slug, slug)))
      .orderBy(desc(activities.createdAt))
      .limit(3);
  } catch (err) {
    console.error("Activity detail error:", err);
    notFound();
  }

  let paragraphs: string[] = [];
  try {
    const parsed = JSON.parse(activity.body);
    paragraphs = Array.isArray(parsed) ? parsed : [activity.body];
  } catch {
    paragraphs = [activity.body];
  }

  let galleryImages: string[] = [];
  try {
    if (activity.gallery) {
      const parsed = JSON.parse(activity.gallery);
      galleryImages = Array.isArray(parsed) ? parsed : [];
    }
  } catch {
    galleryImages = [];
  }

  return (
    <ActivityDetailClient
      activity={activity}
      paragraphs={paragraphs}
      galleryImages={galleryImages}
      related={related}
    />
  );
}
