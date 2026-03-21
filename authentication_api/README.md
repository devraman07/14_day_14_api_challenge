# authentication_api

A basic **JWT authentication** API (signup/login/profile) built with **Node.js + Express + PostgreSQL**.

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
- `JWT_SECRET`

## Routes

Mounted in `server.js` at: `/api/user`

- `POST /api/user/signup`
- `POST /api/user/login`
- `GET /api/user/profile` (requires auth)

## Project structure

- `server.js` - Express app entrypoint
- `routes/` - Express route definitions
- `controllers/` - Auth controllers (signup/login/profile)
- `middlewares/` - Auth middleware (`authenticate`)
- `configs/` - DB/config helpers
- `drizzle/` + `drizzle.config.js` - DB migrations/schema tooling
