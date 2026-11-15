import { db } from "@/db";
import { galleryItems } from "@/db/schema";
import { desc } from "drizzle-orm";
import { ensureSeeded } from "@/lib/seed";
import GalleryClient from "@/components/pages/GalleryClient";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  await ensureSeeded();

  let list: any[] = [];
  try {
    list = await db
      .select()
      .from(galleryItems)
      .orderBy(desc(galleryItems.createdAt));
  } catch (err) {
    console.error("Gallery error:", err);
  }

  return <GalleryClient initialItems={list} />;
}
