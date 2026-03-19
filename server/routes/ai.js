import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();

const genAI = process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

const PORTFOLIO_CONTEXT = `You are an AI assistant for Pramod Yadav's portfolio. Pramod is a B.Tech student in Mathematics and Computing at RGIPT. His skills: JavaScript, Python, C++, React, Node.js, Express, MongoDB, SQL, ML. Projects: AQI Prediction (ML), Doctor Appointment System (MERN), Portfolio Website. He has Google Prompt Design in Vertex AI certification, is Design Executive at GDSC RGIPT, Contributor at GirlScript SoC 2024, and Executive at GeeksForGeeks RGIPT. Be helpful, concise, and professional.`;

router.post('/chat', async (req, res) => {
  if (!genAI) {
    return res.status(503).json({
      error: 'AI chat is not configured. Add GEMINI_API_KEY to server/.env for AI features.'
    });
  }
  try {
    const { message } = req.body;
    if (!message?.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `${PORTFOLIO_CONTEXT}\n\nUser question: ${message.trim()}`;
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response?.text?.() || 'I could not generate a response.';
    res.json({ reply: text });
  } catch (err) {
    console.error('AI error:', err);
    res.status(500).json({ error: err.message || 'AI service error' });
  }
});

export default router;
