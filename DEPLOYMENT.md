# Deployment Guide

Deploy the portfolio to **Vercel** (frontend) + **Render** or **Railway** (backend).

---

## Prerequisites

- MongoDB Atlas account (free tier)
- Vercel account
- Render or Railway account
- GitHub repo

---

## 1. MongoDB Atlas Setup

1. Create cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Get connection string: `mongodb+srv://user:pass@cluster.mongodb.net/portfolio`
3. Add to `.env` as `MONGODB_URI`

---

## 2. Backend (Render / Railway)

### Render

1. Push code to GitHub
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect repo, select `server` folder (or root if monorepo)
4. **Build**: `npm install`
5. **Start**: `node index.js` or `npm start`
6. **Root Directory**: set to `server` if backend is in server/
7. Environment variables:
   - `MONGODB_URI`
   - `GEMINI_API_KEY` (optional, for AI chat)
   - `PORT` (Render sets this automatically)
8. Deploy. Note the URL (e.g. `https://your-app.onrender.com`)

The backend must be a **Web Service** with `server` as its Root Directory. Do not use
the frontend build output or run `npm run start` from `client`; the client is a
static site and does not have a Node server.

### Railway

1. New project → Deploy from GitHub
2. Set root directory to `server` if needed
3. Add env vars: `MONGODB_URI`, `GEMINI_API_KEY`
4. Deploy. Note the public URL

---

## 3. Frontend (Vercel)

1. Install Vercel CLI: `npm i -g vercel`
2. In project root: `cd client && npm run build`
3. Deploy: `vercel` (or connect GitHub at vercel.com)
4. **Root Directory**: `client`
5. **Build Command**: `npm run build`
6. **Output Directory**: `dist`
7. **Environment Variable**: `VITE_API_URL` = your backend URL (e.g. `https://your-app.onrender.com`)

### Hosting the frontend on Render instead

Create a **Static Site**, not a Web Service:

- **Root Directory**: leave blank (repository root)
- **Build Command**: `npm install --prefix client && npm run build --prefix client`
- **Publish Directory**: `client/dist`
- **Environment Variable**: `VITE_API_URL` = your backend URL
- **Start Command**: leave empty

If the deploy log says `Running 'build'` or `build: command not found`, the
service is configured as a Web Service with `build` as its Start Command. Change
it to a Render **Static Site** and clear the Start Command; `build` belongs only
in the Build Command as `npm run build`.

The repository also includes `render.yaml`, which can create the Render backend
Web Service and frontend Static Site together. Set the secret environment
variables when prompted.

### Update API base URL





---

## Quick Reference

| Service | Frontend | Backend |
|---------|----------|---------|
| URL     | Vercel   | Render/Railway |
| Env     | VITE_API_URL | MONGODB_URI, GEMINI_API_KEY |
| Build   | npm run build | npm install |
| Start   | -        | node index.js |
