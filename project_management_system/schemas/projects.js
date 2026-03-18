import {
  pgTable,
  pgEnum,
  uuid,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const projectStatusEnum = pgEnum("project_status", [
  "TODO",
  "IN_PROGRESS",
  "COMPLETED",
]);

export const projects = pgTable("projects", {
  id: uuid("id").defaultRandom().primaryKey(),

  title: varchar("title", { length: 255 }).notNull(),

  description: text("description"),
  
  status: projectStatusEnum("status").default("TODO").notNull(),

  ownerId: uuid("owner_id").notNull(),

  createdAt: timestamp("created_at").defaultNow(),

  updatedAt: timestamp("updated_at").defaultNow(),
});
