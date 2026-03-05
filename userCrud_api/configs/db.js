import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

if(!process.env.DB_URl) {
    console.log("problem while fetching the db url from .env file");
}

const sql = neon(process.env.DB_URL);
console.log("database Connected");
export const db = drizzle(sql);