# Pramod Yadav - Portfolio

A premium, full-stack portfolio with 3D graphics, animations, and AI chatbot. Built with MERN stack, Three.js, GSAP-ready, and deployment-ready.

## ✨ Features

- **3D Hero** – Animated Three.js background (React Three Fiber)
- **Typewriter** – Cycling tagline in Hero
- **Scroll Progress** – Reading progress indicator
- **Custom Cursor** – Desktop-only cursor animation
- **AI Chatbot** – Ask about skills, projects (Google Gemini)
- **Dynamic Projects** – Fetched from backend API (CRUD)
- **Skills** – Circular progress + animated bars
- **Timeline** – Vertical animated experience
- **Contact Form** – Stored in MongoDB
- **Lazy Loading** – Code splitting for faster load
- **SEO** – React Helmet meta tags
- **Dark/Light Mode** – System preference + toggle

## 🧠 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, Vite, Tailwind CSS, Framer Motion |
| 3D | Three.js, React Three Fiber, Drei |
| Animations | Framer Motion, react-type-animation (GSAP-ready) |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| AI | Google Gemini API |

## 📦 Setup

### 1. Install

```bash
npm run install:all
```

### 2. Environment

Create `server/.env` (from `server/.env.example`):

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
GEMINI_API_KEY=your_gemini_api_key
```

- **MongoDB:** [MongoDB Atlas](https://www.mongodb.com/atlas) or local
- **Gemini:** [Google AI Studio](https://makersuite.google.com/app/apikey)

### 3. Seed Projects (optional)

```bash
cd server
npm run seed
```

### 4. Run

```bash
npm run dev
```

- Frontend: http://localhost:2000
- Backend: http://localhost:5000

### 5. Build

```bash
npm run build
cd server && npm start
```

## 📁 Structure

```
myport/
├── client/               # React + Vite
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── lib/          # API config, utils
│   │   └── App.jsx
│   └── vite.config.js
├── server/               # Express API
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API routes
│   ├── seed/             # Seed scripts
│   └── index.js
├── DEPLOYMENT.md         # Deploy guide (Vercel + Render)
└── README.md
```

## 🌐 Deployment

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for:
- Vercel (frontend)
- Render / Railway (backend)
- MongoDB Atlas
- Environment variables

## 🎯 Customize

- **Links:** `Hero.jsx`, `Footer.jsx`
- **Projects:** Add via API or `server/seed/projects.js`
- **AI:** `server/routes/ai.js`
