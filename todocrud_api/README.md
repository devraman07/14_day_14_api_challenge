# todocrud_api

A simple **Todo CRUD** REST API built with **Node.js + Express + PostgreSQL**.

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

## Routes

Mounted in `server.js` at: `/api/todo`

- `GET /api/todo/`
- `GET /api/todo/:id`
- `POST /api/todo/addtodo`
- `PATCH /api/todo/:id/check`
- `DELETE /api/todo/:id/`

## Project structure

- `server.js` - Express app entrypoint
- `routes/` - Express route definitions
- `controllers/` - Request handlers
- `services/` - Domain helpers (e.g., status checks)
- `configs/` - DB/config helpers
- `drizzle/` + `drizzle.config.js` - DB migrations/schema tooling
