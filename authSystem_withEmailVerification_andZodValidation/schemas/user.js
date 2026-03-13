import { pgTable, serial, text, boolean, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),

  name: text("name").notNull(),

  email: text("email").notNull().unique(),

  password: text("password").notNull(),

  profileImage: text("profile_image"),

  role: text("role").default("user"),

  isVerified: boolean("is_verified").default(false),

  otp: text("otp"),

  otpExpires: timestamp("otp_expires")
});