import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();

const PORTFOLIO_CONTEXT = `You are an AI assistant embedded in Pramod Yadav's developer portfolio. Answer questions about Pramod concisely, professionally, and accurately.

About Pramod:
- B.Tech Mathematics & Computing at Rajiv Gandhi Institute of Petroleum Technology (RGIPT, 2027)
- Role: Full Stack & AI Developer
- Open Source: Contributed to two organizations, Learning Unlimited and Neutralinojs
- Primary Email: 23mc3037@rgipt.ac.in (Secondary: pramodyadav2948@gmail.com)
- GitHub: https://github.com/Prm01
- LinkedIn: https://linkedin.com/in/pramod-yadav-7810b5299
- Competitive Programming: CodeChef, Codeforces, GeeksforGeeks (500+ DSA problems solved)

Experience:
- Automation Intern at Polluxa (May–Jul 2026):
  1. Reduced lead-processing turnaround time from 30 minutes to 10 minutes per lead (67% faster processing) using automated Python/JS Playwright workflows and Chrome extensions.
  2. Drove +20% increase in qualified client acquisition by integrating Apollo.io verified-email retrieval with REST APIs, token authentication, and deduplication.
  3. Built a CRM test automation tool and fixed 20 of 25+ critical automation and pipeline issues to achieve robust production stability.

Featured Projects:
1. Rahat:
   - Heat and flood early warning system for Delhi's 290 municipal wards.
   - Stack: FastAPI, PostgreSQL, AWS Bedrock, AWS Rekognition, AWS S3, RDS, CloudFront, MCP, Web Push.
   - Reliability: 35 comprehensive end-to-end integration tests. Sub-second alert dispatch.
   - Live: https://d17rx6mkixl5iz.cloudfront.net/ | GitHub: https://github.com/Prm01/Rahat
2. BhoomiAI:
   - Land record digitization and agentic validation platform.
   - Stack: TrOCR, LangChain agentic verification pipelines, Python, FastAPI, React.
   - Outcome: 92% field extraction accuracy across complex vernacular deeds; reduced turnaround from 15 minutes to under 1 minute per record (>93% latency reduction).
   - Live: https://smart-land-digitization.vercel.app/ | GitHub: https://github.com/Prm01
3. Doctor Appointment System:
   - Full-stack MERN booking platform with 3 discrete role-based dashboards (Patient, Doctor, Admin).
   - Stack: React.js, Node.js, Express.js, MongoDB, JWT, Tailwind CSS.
   - Accessibility: Elevated Lighthouse accessibility audit score from 79 to a perfect 100 with WCAG compliance.
   - Live: https://full-stack-project-1-vau7.onrender.com/ | GitHub: https://github.com/Prm01
4. Finance Dashboard UI:
   - Dynamic real-time portfolio analytics and cash flow visualization with 95+ mobile Lighthouse benchmark.
   - Stack: React.js, Tailwind CSS, Vite, Lucide Icons.
   - Live: https://finance-dashboard-ui-1.onrender.com/ | GitHub: https://github.com/Prm01

Skills:
- Frontend: React.js, Vite, Tailwind CSS, JavaScript (ES6+), HTML5, CSS3, Responsive Design
- Backend: Node.js, Express.js, FastAPI, REST APIs, PostgreSQL, MongoDB, JWT Auth
- Cloud & DevOps: AWS (Bedrock, Rekognition, S3, RDS, CloudFront), Docker, Git, GitHub Actions, CI/CD, Render, Vercel
- AI-ML: TrOCR, LangChain, Model Context Protocol (MCP), AWS Bedrock, Python ML, Gemini API, Hugging Face
- Languages: C++, Python, JavaScript, SQL, HTML / CSS

Open Source Contributions:
- Contributed to two organizations, Learning Unlimited and Neutralinojs
- Neutralinojs (neutralinojs-cli): Contributed to portable desktop framework CLI focusing on stability, developer experience, and release readiness.
- Learning Unlimited (ESP-Website): Open-source educational logistics management platform for Splash programs; bug fixes and UX improvements.

Achievements:
- JEE Main & Advanced Qualified: Ranked in the top 2% nationally among 1.2M+ candidates.
- RGIPT Merit-cum-Means Scholarship: Awarded to top academic performers in Mathematics & Computing.
- Design Executive at GDSC RGIPT: Facilitated peer learning programs with 500+ cloud badges earned.
- 500+ DSA Problems Solved: across CodeChef, Codeforces, and GeeksforGeeks.

Only answer questions about Pramod, his work, skills, or projects. Keep answers concise, factual, and metric-driven. Do not invent facts.`;

// — OpenRouter (primary) —
const OPENROUTER_MODEL = 'openai/gpt-4o-mini';

async function askOpenRouter(message) {
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://my-personal-developer-portfolio.onrender.com',
      'X-Title': 'Pramod Yadav Portfolio'
    },
    body: JSON.stringify({
      model: OPENROUTER_MODEL,
      messages: [
        { role: 'system', content: PORTFOLIO_CONTEXT },
        { role: 'user', content: message }
      ],
      max_tokens: 400
    })
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenRouter error ${res.status}: ${err}`);
  }
  const data = await res.json();
  return data.choices?.[0]?.message?.content || 'No response generated.';
}

// — Gemini (fallback) —
const GEMINI_MODEL = 'gemini-2.0-flash-lite';
const genAI = process.env.OPENROUTER_API_KEY ? null : process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

function formatAiError(provider, err) {
  const text = String(err?.message || err || '').toLowerCase();

  if (provider === 'OpenRouter') {
    if (text.includes('insufficient credits') || text.includes('no credits') || text.includes('402')) {
      return 'OpenRouter is configured, but the account has no credits. Add credits or create a new OpenRouter key with available balance.';
    }

    if (text.includes('invalid api key') || text.includes('unauthorized') || text.includes('401')) {
      return 'OpenRouter key is invalid or expired. Generate a new key and update OPENROUTER_API_KEY in server/.env.';
    }

    if (text.includes('no endpoints found') || text.includes('404')) {
      return 'The selected OpenRouter model is not available on this account or router endpoint. Use a different model slug from OpenRouter.';
    }

    return 'OpenRouter is unavailable right now. Please try again in a moment.';
  }

  if (text.includes('leaked') || text.includes('invalid api key') || text.includes('api key was reported') || text.includes('forbidden')) {
    return 'The Gemini API key in server/.env is invalid, revoked, or leaked. Generate a fresh key in Google AI Studio and update GEMINI_API_KEY.';
  }

  if (text.includes('429') || text.includes('rate limit') || text.includes('rate-limit') || text.includes('temporarily rate-limited')) {
    return 'The AI provider is rate-limited right now. Please wait a minute and try again, or add your own provider key.';
  }

  return `${provider} is unavailable right now. Please try again in a moment.`;
}

function shouldFallbackToGemini(err) {
  const text = String(err?.message || err || '').toLowerCase();
  return !text.includes('insufficient credits') && !text.includes('no credits') && !text.includes('401') && !text.includes('402') && !text.includes('invalid api key') && !text.includes('unauthorized');
}

async function askGemini(message) {
  if (!genAI) throw new Error('Gemini not configured');
  const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });
  const result = await model.generateContent(
    `${PORTFOLIO_CONTEXT}\n\nUser question: ${message}`
  );
  return result.response?.text?.() || 'No response generated.';
}

router.post('/chat', async (req, res) => {
  const { message } = req.body;
  if (!message?.trim()) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const hasOpenRouter = !!process.env.OPENROUTER_API_KEY;
  const hasGemini = !!genAI;

  if (!hasOpenRouter && !hasGemini) {
    return res.status(503).json({
      error: 'AI not configured. Add OPENROUTER_API_KEY or GEMINI_API_KEY to server/.env'
    });
  }

  try {
    let reply;
    if (hasOpenRouter) {
      try {
        reply = await askOpenRouter(message.trim());
      } catch (orErr) {
        const openRouterError = formatAiError('OpenRouter', orErr);
        console.warn('OpenRouter failed:', orErr.message);

        if (shouldFallbackToGemini(orErr) && hasGemini) {
          console.warn('Falling back to Gemini...');
          try {
            reply = await askGemini(message.trim());
          } catch (gemErr) {
            throw new Error(formatAiError('Gemini', gemErr));
          }
        } else {
          throw new Error(openRouterError);
        }
      }
    } else {
      try {
        reply = await askGemini(message.trim());
      } catch (gemErr) {
        throw new Error(formatAiError('Gemini', gemErr));
      }
    }
    res.json({ reply });
  } catch (err) {
    console.error('AI error:', err);
    res.status(502).json({
      error: err.message || 'AI service error. Please try again.'
    });
  }
});

export default router;
