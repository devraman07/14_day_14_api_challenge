# project_management_system

A project management backend API with:
- User signup/login
- Project CRUD (authenticated)
- Task CRUD per project (authenticated)
- Member management + RBAC (OWNER-only actions)

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

User routes mounted at: `/api/user`

- `POST /api/user/signup`
- `POST /api/user/login`
- `GET /api/user/profile` (requires auth)
- `GET /api/user/:id`

Project routes mounted at: `/api/projects`

- `POST /api/projects/addproject` (requires auth)
- `GET /api/projects/userverifiedproject` (requires auth)
- `GET /api/projects/userverifiedproject/:id` (requires auth)
- `PATCH /api/projects/update/:id` (requires auth)
- `DELETE /api/projects/delete/:id` (requires auth)

Task routes mounted at: `/api/task`

- `POST /api/task/addtask` (requires auth)
- `GET /api/task/:id` (requires auth)
- `PATCH /api/task/update/:id` (requires auth)
- `DELETE /api/task/delete/:id` (requires auth)

Member routes mounted at: `/api/member`

- `POST /api/member/addmember` (requires auth + role OWNER)
- `PATCH /api/member/:taskId/assign` (requires auth + role OWNER)

## Project structure

- `server.js` - Express app entrypoint
- `routes/` - Route definitions
- `controllers/` - Request handlers
- `middlewares/` - Auth + RBAC middleware
- `schemas/` - Validation schemas
- `services/` - Domain helpers
- `configs/` - DB/config helpers
- `drizzle/` + `drizzle.config.js` - DB migrations/schema tooling
