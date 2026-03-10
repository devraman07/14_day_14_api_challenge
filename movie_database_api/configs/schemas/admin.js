import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),

  name: text("name").notNull(),

  email: text("email").notNull().unique(),

  password: text("password").notNull(),

  role: text("role").default("admin"),

  createdAt: timestamp("created_at").defaultNow()
});