import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';


if(!process.env.DATABASE_URL) {
    console.log('db connection string required');
}
const sql = neon(process.env.DATABASE_URL);
console.log('database connected');
export const db = drizzle(sql);