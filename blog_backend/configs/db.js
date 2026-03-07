import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';


if(!process.env.DATABASE_URL) {
    console.log("database url not coming from .env file");
}

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql);