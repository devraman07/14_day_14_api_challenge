import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core';

export const demoUsers = pgTable('demo_users', {
  id: serial('id').primaryKey(),
  name: text('name'),
  age : integer('age'),
  gender : text('gender')
});