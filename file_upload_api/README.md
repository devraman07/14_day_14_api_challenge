# file_upload_api

A simple API demonstrating **file upload** during signup using **Multer** and **Cloudinary**.

Built with **Node.js + Express + PostgreSQL**.

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

## Routes

Mounted in `server.js` at: `/api/user`

- `POST /api/user/signup` (multipart/form-data; file field: `profileImage`)

## Project structure

- `server.js` - Express app entrypoint
- `routes/` - Signup route
- `controllers/` - Signup handler
- `middlewares/` - Multer config (and other middleware)
- `services/` - Cloudinary/upload helpers
- `configs/` - DB/config helpers
- `drizzle/` + `drizzle.config.js` - DB migrations/schema tooling
