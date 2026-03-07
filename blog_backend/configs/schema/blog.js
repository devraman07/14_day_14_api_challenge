import { pgTable, serial, text, integer, timestamp, varchar } from "drizzle-orm/pg-core";
import { users } from "./user.js";

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),

  title: varchar("title", { length: 255 }).notNull(),

  content: text("content").notNull(),

  authorId: integer("author_id")
    .references(() => users.id)
    .notNull(),

  createdAt: timestamp("created_at").defaultNow(),

  updatedAt: timestamp("updated_at").defaultNow()
});