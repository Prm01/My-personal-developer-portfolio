import dotenv from 'dotenv';
dotenv.config();

console.log('Testing OpenRouter...');
try {
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'http://localhost:2000',
      'X-Title': 'Pramod Portfolio'
    },
    body: JSON.stringify({
      model: 'google/gemma-4-31b-it:free',
      messages: [{ role: 'user', content: 'Say hi in one word' }],
      max_tokens: 10
    })
  });
  const data = await res.json();
  console.log('OpenRouter status:', res.status);
  console.log('OpenRouter body:', JSON.stringify(data, null, 2));
} catch (e) {
  console.error('OpenRouter fetch error:', e.message);
}

console.log('\nTesting Gemini...');
try {
  const { GoogleGenerativeAI } = await import('@google/generative-ai');
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });
  const result = await model.generateContent('Say hi in one word');
  console.log('Gemini reply:', result.response.text());
} catch (e) {
  console.error('Gemini error:', e.message);
}
