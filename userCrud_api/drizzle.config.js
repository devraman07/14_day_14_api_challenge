import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';


if (!process.env.DB_URL) {
  throw new Error('DATABASE_URL is not set in the .env file');
}

export default defineConfig({
  schema: './configs/schema.js', 
  out: './drizzle', 
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DB_URL,
  },
});