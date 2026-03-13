import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';


if(!process.env.DATABASE_URL) {
    console.log('dataBase string not avaliable in the .env file');
}

const sql = neon(process.env.DATABASE_URL);
console.log('dataBase connected successfully');
export const db = drizzle(sql);