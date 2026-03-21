# movie_database_api

A movie database backend API with:
- Admin signup/login
- Public movie listing
- Protected admin-only movie creation

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
- `JWT_SECRET`

## Routes

Admin routes mounted at: `/api/admin`

- `POST /api/admin/signup`
- `POST /api/admin/login`

Movie routes mounted at: `/api/movies`

- `GET /api/movies/`
- `POST /api/movies/addmovies` (requires auth + role check)

## Project structure

- `server.js` - Express app entrypoint
- `routes/` - Admin/movie routes
- `controllers/` - Request handlers
- `middlewares/` - Auth + role checks
- `services/` - Shared helpers (if present)
- `configs/` - DB/config helpers
- `drizzle/` + `drizzle.config.js` - DB migrations/schema tooling
