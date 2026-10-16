# Deployment

The frontend in `frontend/` is a static SPA built with Vite. The Express forum API in `backend/` is deployed separately as a Render Web Service. Recommended frontend hosts:

- Vercel: connect the GitHub repo, use `npm run build`, and set `VITE_API_URL` to the Render API URL. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_KEY` only if using Supabase.
- Netlify: connect the repo, set build command `npm run build`, publish directory `frontend/dist`, and set `VITE_API_URL` to the Render API URL.
- GitHub Pages: build with `npm run build` and publish the contents of `frontend/dist` (for example, using a deploy action or `gh-pages` package).

On Render, create a Web Service with root directory `backend`, build command `npm install`, and start command `npm start`. Set `MONGODB_URI` to a hosted MongoDB URI and `FRONTEND_ORIGIN` to the deployed frontend origin. Render supplies `PORT`. Redeploy the frontend after setting `VITE_API_URL`.
