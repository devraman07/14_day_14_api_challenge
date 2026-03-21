# userCrud_api

A simple **User CRUD** REST API built with **Node.js + Express + PostgreSQL**.

## Run locally

```bash
npm install
npm run dev
```

- Default port: `3000`
- Base URL: `http://localhost:3000`

## Environment variables

Create a `.env` file in this folder:

- `DB_URL`

## Routes

Mounted in `server.js` at: `/api/user`

- `POST /api/user/addUser`
- `GET /api/user/getallUser`
- `GET /api/user/uniqueUser/:id`
- `PUT /api/user/users/:id`
- `DELETE /api/user/deleteUser/:id`

## Project structure

- `server.js` - Express app entrypoint
- `routes/` - Express route definitions
- `controllers/` - Request handlers (CRUD logic)
- `configs/` - DB/config helpers (if present)
- `drizzle/` + `drizzle.config.js` - DB migrations/schema tooling (if used)
