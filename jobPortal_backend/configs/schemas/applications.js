import { pgTable, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { users } from "./user.js";
import { jobs } from "./jobs.js";

export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),

  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),

  jobId: integer("job_id")
    .references(() => jobs.id)
    .notNull(),

  appliedAt: timestamp("applied_at").defaultNow()
});