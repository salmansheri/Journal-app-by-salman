import { text, pgTable, timestamp, integer } from "drizzle-orm/pg-core";
import { randomUUID } from "crypto";

export const collections = pgTable("collection", {
  id: text("id").primaryKey(),
  userId: text("user_id"),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type InsertCollection = typeof collections.$inferInsert;
export type SelectCollections = typeof collections.$inferSelect;

export const entry = pgTable("entry", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content"),
  userId: text("user_id"),
  mood: text("mood"),
  moodScore: integer("mood_score"),
  moodImageUrl: text("mood_image_url"),
  collectionId: text("collection_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
export type InsertEntry = typeof entry.$inferInsert;
export type SelectEntry = typeof entry.$inferSelect;

export const draft = pgTable("draft", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content"),
  userId: text("user_id").unique(),
  mood: text("mood"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
export type Insertdraft = typeof draft.$inferInsert;
export type Selectdraft = typeof draft.$inferSelect;
