import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

if(!process.env.DATABASE_URL) {
    console.log("database string is required");
}

const sql = neon(process.env.DATABASE_URL);
console.log("db connected");
export const db = drizzle(sql);