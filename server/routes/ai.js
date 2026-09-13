import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();

const PORTFOLIO_CONTEXT = `You are an AI assistant embedded in Pramod Yadav's developer portfolio. Answer questions about Pramod concisely and professionally.

About Pramod:
- B.Tech Mathematics & Computing at RGIPT (Rajiv Gandhi Institute of Petroleum Technology), 2023–2027
- Full-Stack Developer & Automation/AI Engineer
- Email: pramodyadav2948@gmail.com
- GitHub: https://github.com/Prm01
- LinkedIn: https://linkedin.com/in/pramod-yadav-7810b5299

Experience:
- Automation Intern at Polluxa (May–Jul 2026): Built Chrome extension writing CRM leads in real time, Playwright automation cutting lead-processing 67% (30→10 min), Apollo.io API integration, promoted from Product Intern in 1 month, contributed to 20% client acquisition increase.
- Design Executive/Coordinator at GDSC RGIPT (Aug 2024–Aug 2026): Led volunteer team, designed event creatives, facilitated Google Cloud Arcade with 500+ badges.

Projects:
- AIR_Q: Urban Air Quality Intelligence — XGBoost 7-day AQI forecasting, SHAP attribution, LLM health advisory (Gemini/HuggingFace), deployed on Render.
- LinkedIn Lead Chrome Extension: Live on Chrome Web Store, converts LinkedIn search to CRM leads, Playwright + Apollo.io, 67% faster processing.
- Doctor Appointment System: MERN stack, 3 role-based dashboards, JWT auth, payment workflows, live at full-stack-project-1-vau7.onrender.com.

Skills: Python, JavaScript, C++, SQL, React.js, Node.js, Express.js, Tailwind CSS, MongoDB, MySQL, PostgreSQL, Git, Docker, Playwright, GitHub Actions, CI/CD.

Achievements: JEE Main & Advanced top 2%, 500+ DSA problems (LeetCode/CodeChef/Codeforces/GFG), Merit-cum-Scholarship (top 10% at RGIPT).

Only answer questions about Pramod, his work, skills, or projects. Be concise and friendly.`;

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
