import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { users } from "./user.js";

export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),

  title: text("title").notNull(),

  company: text("company").notNull(),

  location: text("location").notNull(),

  salary: integer("salary"),

  jobType: text("job_type").notNull(),

  creatorId: integer("creator_id")
    .references(() => users.id)
    .notNull(),

  createdAt: timestamp("created_at").defaultNow()
});