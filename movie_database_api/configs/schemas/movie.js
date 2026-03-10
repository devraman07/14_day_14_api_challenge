import { pgTable, serial, text, integer, real, timestamp } from "drizzle-orm/pg-core";
import { admins } from "./admin.js";

export const movies = pgTable("movies", {
  id: serial("id").primaryKey(),

  title: text("title").notNull(),

  description: text("description"),

  genre: text("genre"),

  director: text("director"),

  actor: text("actor"),

  actress: text("actress"),

  releaseYear: integer("release_year"),

  rating: real("rating"),

  creatorId: integer("creator_id")
    .references(() => admins.id)
    .notNull(),

  createdAt: timestamp("created_at").defaultNow()
});