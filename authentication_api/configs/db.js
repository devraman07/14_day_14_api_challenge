import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

if(!process.env.DATABASE_URL) {
    console.log('database url does not exists in the .env file');
}

const sql = neon(process.env.DATABASE_URL);
console.log('Database Connected Successfully');
export const db = drizzle(sql);