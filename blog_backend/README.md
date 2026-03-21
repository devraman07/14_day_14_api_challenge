# blog_backend

A blog backend API with:
- User signup/login
- JWT-protected user profile
- CRUD operations on blogs
- Admin-only blog routes

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

User routes mounted at: `/api/user`

- `POST /api/user/signup`
- `POST /api/user/login`
- `GET /api/user/userprofile` (requires auth)

Blog routes mounted at: `/api/blogs`

- `POST /api/blogs/addblog` (requires auth)
- `PUT /api/blogs/updateblog/:id` (requires auth)
- `DELETE /api/blogs/deleteblog/:id` (requires auth)
- `GET /api/blogs/myblogs` (requires auth)
- `POST /api/blogs/addblog/admin` (requires auth + admin)
- `DELETE /api/blogs/deleteblog/admin/:id` (requires auth + admin)

## Project structure

- `server.js` - Express app entrypoint
- `routes/` - User/blog routes
- `controllers/` - Request handlers
- `middlewares/` - Middleware (if present)
- `services/` - Auth + role helpers
- `utils/` - Helpers/utilities
- `configs/` - DB/config helpers
- `drizzle/` + `drizzle.config.js` - DB migrations/schema tooling
