# Akili Afya

Akili Afya is a vanilla JavaScript, HTML, and CSS single-page app built with Vite.

## Project structure

- `frontend/` contains the Vite app, its pages and styles, and static quiz/resource data.
- `backend/` contains the Express forum API, which stores posts and replies in MongoDB.

## Development

Install frontend dependencies with `npm install` and backend dependencies with `npm install --prefix backend`. Start a local MongoDB instance or use a hosted MongoDB URI, then copy `backend/.env.example` to `backend/.env` and set `MONGODB_URI`. Run both services with `npm run dev:all`.

- `npm run build` builds the frontend into `frontend/dist`.
- `npm run preview` previews the production build.

Set `VITE_API_URL` to the backend URL when deploying the frontend. See [backend/README.md](./backend/README.md) for API endpoints and Render deployment configuration.

The app includes Home, Resources, Forum, Quiz, Support, and Profile pages. Supabase client setup is in `frontend/src/api/supabaseClient.js`; configure `VITE_SUPABASE_URL` and `VITE_SUPABASE_KEY` when using it.
