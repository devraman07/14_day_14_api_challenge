import { pgTable, uuid, varchar, text, timestamp, pgEnum } from "drizzle-orm/pg-core";


export const taskStatusEnum = pgEnum("task_status", [
  "TODO",
  "IN_PROGRESS",
  "DONE",
]);

export const tasks = pgTable("tasks", {
  id: uuid("id").defaultRandom().primaryKey(),

  title: varchar("title", { length: 255 }).notNull(),

  description: text("description"),

  status: taskStatusEnum("status").default("TODO").notNull(),

  projectId: uuid("project_id").notNull(),

  assignedTo: uuid("assigned_to"), 

  createdAt: timestamp("created_at").defaultNow(),

  updatedAt: timestamp("updated_at").defaultNow(),
});