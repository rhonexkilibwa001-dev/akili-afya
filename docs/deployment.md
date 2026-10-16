# Deployment

This project is a static SPA built with Vite. Recommended hosts:

- Vercel: connect the GitHub repo and the default build command `npm run build`; set environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_KEY) in the Vercel dashboard.
- Netlify: connect repo and set build command `npm run build` and publish directory `dist`.
- GitHub Pages: build locally `npm run build` then push the `dist` contents to `gh-pages` branch (use a deploy action or gh-pages package).

I left the final "putting it live" step for you. If you want, provide your hosting choice and I will add a GitHub Action or deployment config.
