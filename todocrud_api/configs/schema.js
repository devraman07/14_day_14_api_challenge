import { pgTable, serial, text, timestamp, boolean } from "drizzle-orm/pg-core";

export const todos = pgTable("todos", {
  id: serial("id").primaryKey(),

  title: text("title").notNull(),

  description: text("description"),

  status: text("status").default("pending"),

  isChecked: boolean("is_checked").default(false),

  createdAt: timestamp("created_at").defaultNow(),
});
