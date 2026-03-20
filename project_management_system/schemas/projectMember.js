import { pgTable, uuid, pgEnum } from "drizzle-orm/pg-core";


export const memberRoleEnum = pgEnum("member_role", [
  "OWNER",
  "MEMBER",
]);

export const projectMembers = pgTable("project_members", {
  id: uuid("id").defaultRandom().primaryKey(),

  projectId: uuid("project_id").notNull(),

  userId: uuid("user_id").notNull(),

  role: memberRoleEnum("role").default("MEMBER"),
});