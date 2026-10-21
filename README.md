# Pramod Yadav - Full Stack & AI Developer Portfolio

Modern, high-performance developer portfolio for **Pramod Yadav**, B.Tech Mathematics & Computing at Rajiv Gandhi Institute of Petroleum Technology (RGIPT, 2027), targeting Summer 2026 engineering internships and GSoC 2026 recruiters.

---

## 🚀 Key Highlights & Architectural Features

- **Design System:** Sleek dark theme default with unified electric violet accent (`#8b5cf6`), glass-style cards (`backdrop-blur-xl`), and dark/light mode toggle.
- **Performance & Accessibility:** Engineered for **Lighthouse 95+** and **WCAG 2.1 AA** compliance with high-contrast text, keyboard-focusable controls, skip links, semantic landmarks, and lightweight bundle chunking.
- **Animations:** Fluid Framer Motion scroll animations, layout transitions, and interactive project filters.
- **Section Sequence (in exact recruiter-focused order):**
  1. **Hero:** Typing animation (`Full Stack & AI Developer`), value statement, and instant CTA buttons for Resume (PDF), GitHub, LinkedIn, and Contact.
  2. **About:** 3-4 line concise bio highlighting Mathematics & Computing background at RGIPT, plus quick stats (500+ DSA problems, JEE Advanced qualified top 2%, 3 major projects).
  3. **Featured Projects:** Metric-driven cards with screenshots, one-line problem statements, 3 outcome bullets, tech chips, live demos, and GitHub buttons:
     - **Rahat:** Heat and flood early warning system for Delhi's 290 municipal wards (FastAPI, PostgreSQL, AWS Bedrock/Rekognition/S3/RDS/CloudFront, MCP, Web Push, 35 e2e tests).
     - **BhoomiAI:** Land record digitization and agentic validation (TrOCR, LangChain agentic verification, 92% field accuracy, 15 min to under 1 min per record).
     - **Doctor Appointment System:** Full-stack MERN platform with 3 discrete role dashboards (Patient/Doctor/Admin) and Lighthouse accessibility elevated from 79 to 100.
     - **Finance Dashboard UI:** Dynamic portfolio analytics with responsive charting and 95+ mobile performance.
     - *Filter tabs:* All / Full Stack / AI / Backend.
  4. **Experience:** Automation Intern at Polluxa (May–Jul 2026) with 3 impact bullets (30→10 min per lead, +20% acquisition, fixed 20 of 25+ issues).
  5. **Skills:** Grouped technical arsenal (Frontend, Backend, Cloud/DevOps, AI/ML, Languages) with clean iconography.
  6. **Open Source:** Contributions to Neutralinojs (`neutralinojs-cli`) and Learning Unlimited (`ESP-Website`), links to PRs, GSoC 2026 candidacy note, and live GitHub contribution rhythm.
  7. **Achievements:** JEE Main & Advanced (top 2%), RGIPT Merit-cum-Means Scholarship, GDSC Design Executive.
  8. **Contact:** Working direct message form (Formspree/EmailJS), primary email `23mc3037@rgipt.ac.in`, one-click copy, and social profiles.
- **Additional Additions:**
  - Complete SEO meta tags & Open Graph preview image (`/og-image.png`).
  - Dark-mode SVG favicon (`/favicon.svg`).
  - Dedicated 404 Not Found view.
  - Sticky navbar with active section scroll highlighting.
  - Recruiter-friendly PDF Resume download button.

---

## 🛠 Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite 5, Tailwind CSS, Framer Motion, Lucide Icons |
| **SEO & Meta** | React Helmet Async, Schema.org Person JSON-LD, OpenGraph |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose) |
| **AI Integration** | Google Gemini API / OpenRouter |

---

## 📦 Setup & Development

### 1. Install Dependencies

```bash
npm run install:all
```

### 2. Environment Configuration

Create `server/.env` (from `server/.env.example`):

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
GEMINI_API_KEY=your_gemini_api_key
```

### 3. Run Development Server

```bash
npm run dev
```

- Client runs at: `http://localhost:2000`
- Server runs at: `http://localhost:5000`

### 4. Build for Production

```bash
npm run build
```

---

## 🌐 Deployment (Render)

Configured via `render.yaml`:
- **Static Site:** Publishes `client/dist`
- **Web Service:** Deploys `server` Node.js API with health checks
