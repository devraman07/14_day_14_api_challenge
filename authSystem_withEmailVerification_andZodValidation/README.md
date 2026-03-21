# authSystem_withEmailVerification_andZodValidation

An authentication system with:
- Signup with profile image upload
- Login
- Email verification
- Validation (Zod)

Built with **Node.js + Express + PostgreSQL** (Drizzle), plus **Nodemailer** and **Cloudinary/Multer**.

## Run locally

```bash
npm install
npm run dev
```

- Default port: `3000`
- Base URL: `http://localhost:3000`

## Environment variables

Create a `.env` file in this folder:

- `DATABASE_URL`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `JWT_SECRET`
- `USER_EMAIL`
- `USER_PASSWORD`

## Routes

Mounted in `server.js` at: `/api/auth`

- `POST /api/auth/signup` (multipart/form-data; file field: `profileImage`)
- `POST /api/auth/login`
- `POST /api/auth/verify-email`

## Project structure

- `server.js` - Express app entrypoint
- `routes/` - Auth routes
- `controllers/` - Signup/login/verify handlers
- `middlewares/` - Guards (e.g., `checkExistingUser`)
- `schemas/` - Zod schemas
- `configs/` - Nodemailer + Multer + DB config
- `services/` - Email/token/upload helpers
- `drizzle/` + `drizzle.config.js` - DB migrations/schema tooling
