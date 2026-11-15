import { pgTable, serial, text, timestamp, boolean, integer } from "drizzle-orm/pg-core";

export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const members = pgTable("members", {
  id: serial("id").primaryKey(),
  membershipNo: text("membership_no").notNull().unique(),
  membershipType: text("membership_type").notNull(), // 'founder' | 'honorary' | 'life' | 'general'
  name: text("name").notNull(),
  nameNe: text("name_ne"),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  phone: text("phone"),
  photo: text("photo"),
  education: text("education"), // Degree & Field, e.g. "Master in Buddhist Studies"
  profession: text("profession"), // Working office or business name
  address: text("address"),
  bahalBahi: text("bahal_bahi"), // Associated traditional monastery/Baha Bahi
  bio: text("bio"),
  cvData: text("cv_data"), // Full JSON for Curriculum Vitae (only visible to member themself)
  status: text("status").default("active").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  dateNe: text("date_ne").notNull(),
  dateEn: text("date_en").notNull(),
  cover: text("cover").notNull(),
  excerpt: text("excerpt").notNull(),
  body: text("body").notNull(), // JSON array of string paragraphs or plain text
  gallery: text("gallery"), // JSON array of image URLs
  published: boolean("published").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const galleryItems = pgTable("gallery_items", {
  id: serial("id").primaryKey(),
  src: text("src").notNull(),
  caption: text("caption").notNull(),
  category: text("category").default("सामान्य").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const notices = pgTable("notices", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  dateNe: text("date_ne").notNull(),
  body: text("body").notNull(), // JSON array of string paragraphs or text
  image: text("image"),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const committeeMembers = pgTable("committee_members", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  position: text("position").notNull(),
  image: text("image").notNull(),
  orderNum: integer("order_num").default(0).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject"),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const siteSettings = pgTable("site_settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export type AdminUser = typeof adminUsers.$inferSelect;
export type Member = typeof members.$inferSelect;
export type Activity = typeof activities.$inferSelect;
export type GalleryItem = typeof galleryItems.$inferSelect;
export type Notice = typeof notices.$inferSelect;
export type CommitteeMember = typeof committeeMembers.$inferSelect;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type SiteSetting = typeof siteSettings.$inferSelect;
