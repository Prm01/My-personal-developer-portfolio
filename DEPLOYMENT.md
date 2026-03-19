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

### Update API base URL

In production, the frontend must call the deployed backend. Update `client/src` to use:

```js
const API_URL = import.meta.env.VITE_API_URL || '/api';
```

Then in Contact, Projects, AIChat components, use `${API_URL}/contact`, `${API_URL}/projects`, etc.

---

## 4. CORS & Proxy

**Backend** (`server/index.js`): CORS should allow your Vercel domain:
```js
app.use(cors({ origin: ['https://your-portfolio.vercel.app', 'http://localhost:2000'] }));
```

**Frontend**: In production, `fetch('/api/...')` won't work (no proxy). Use full backend URL:
- Set `VITE_API_URL=https://your-backend.onrender.com` in Vercel
- Components should use: `const API_URL = import.meta.env.VITE_API_URL || '/api'`

---

## 5. Seed Data

After first deploy, seed projects:
```bash
cd server
MONGODB_URI="your-uri" node seed/projects.js
```

Or add a one-time deploy script.

---

## 6. Custom Domain (Optional)

- **Vercel**: Add domain in project settings
- **Render**: Upgrade for custom domain or use `.onrender.com`
- **Railway**: Custom domain in project settings

---

## Quick Reference

| Service | Frontend | Backend |
|---------|----------|---------|
| URL     | Vercel   | Render/Railway |
| Env     | VITE_API_URL | MONGODB_URI, GEMINI_API_KEY |
| Build   | npm run build | npm install |
| Start   | -        | node index.js |
