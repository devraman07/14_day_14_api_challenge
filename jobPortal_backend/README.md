# jobPortal_backend

A job portal backend API with:
- User signup/login
- Job posting and management (admin-only)
- Job browsing (public)
- Applications (authenticated)

Built with **Node.js + Express + PostgreSQL**.

## Run locally

```bash
npm install
npm run dev
```

- Default port: `4000`
- Base URL: `http://localhost:4000`

## Environment variables

Create a `.env` file in this folder:

- `DATABASE_URL`
- `JWT_SECRET`

## Routes

User routes mounted at: `/api/users`

- `POST /api/users/signup`
- `POST /api/users/login`

Job routes mounted at: `/api/jobs`

- `GET /api/jobs/alljobs`
- `POST /api/jobs/addjobs` (requires auth + admin)
- `PUT /api/jobs/updatejobs/:id` (requires auth + admin)
- `DELETE /api/jobs/deletejob/:id` (requires auth + admin)
- `GET /api/jobs/getmyjobs` (requires auth + admin)

Application routes mounted at: `/api/application`

- `POST /api/application/apply/:id` (requires auth)
- `GET /api/application/myapplications` (requires auth)

## Project structure

- `server.js` - Express app entrypoint
- `routes/` - User/job/application routes
- `controllers/` - Request handlers
- `middlewares/` - Auth, role checks, password hashing
- `utils/` - Helpers/utilities
- `configs/` - DB/config helpers
- `drizzle/` + `drizzle.config.js` - DB migrations/schema tooling
