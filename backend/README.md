# Akili Afya Forum API

The Express API stores forum posts and replies in MongoDB.

## Run locally

1. Start a local MongoDB instance or use a hosted MongoDB database.
2. Copy `.env.example` to `.env` and set `MONGODB_URI` to its connection string.
3. From this directory, run `npm install`.
4. Run `npm run dev`.

The API listens on `http://localhost:5000` by default. Set `VITE_API_URL=http://localhost:5000` in the frontend environment if you use a different API URL.

## Endpoints

- `GET /api/health` — API and database health.
- `GET /api/posts` — most recent 100 posts and their replies.
- `POST /api/posts` — create a post with `title` and `body`.
- `POST /api/posts/:id/comments` — add a reply with `text`.

Posts and replies are anonymous and displayed as “Community member”; this API does not provide authentication or user accounts.

## Deploy on Render

Create a **Web Service** from the repository and set:

- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`
- Environment variables:
  - `MONGODB_URI`: connection string for a hosted MongoDB database, such as MongoDB Atlas.
  - `FRONTEND_ORIGIN`: deployed frontend origin, for example `https://your-site.example`; comma-separate multiple allowed origins.

Render supplies `PORT` automatically. The server listens on that port. In the frontend hosting service, set `VITE_API_URL` to the Render service URL (for example, `https://your-api.onrender.com`) and redeploy the frontend.

Keep database credentials in local `.env` files or the hosting provider's environment settings. Never commit them.
