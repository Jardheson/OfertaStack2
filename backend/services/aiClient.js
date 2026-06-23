const axios = require('axios');

const AI_PROVIDER = (process.env.AI_PROVIDER || 'openai').toLowerCase();
const OPENAI_KEY = process.env.OPENAI_API_KEY || '';
const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';
const GEMINI_KEY = process.env.GEMINI_API_KEY || '';
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

function mockResponse(prompt) {
  return JSON.stringify({
    corrected: prompt.slice(0, 40),
    category: 'Informática',
    description: 'Descrição automática mock do item pesquisado.',
    summary: 'Resposta mock: resumo do que o usuário procura.',
    suggestedCategories: ['Informática', 'Gamer', 'Acessórios'],
    improvedText: 'Texto melhorado automaticamente para ficar mais claro e objetivo.',
    related: ['Produto A - Benefício', 'Produto B - Benefício']
  });
}

async function callOpenAI(prompt, system = 'You are a helpful assistant.') {
  if (!OPENAI_KEY) {
    return mockResponse(prompt);
  }

  const resp = await axios.post(
    OPENAI_URL,
    {
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: prompt }
      ],
      max_tokens: 800,
      temperature: 0.2
    },
    {
      headers: { Authorization: `Bearer ${OPENAI_KEY}` },
      timeout: 12000
    }
  );

  return resp.data.choices[0].message.content;
}

async function callGemini(prompt, system = 'You are a helpful assistant.') {
  if (!GEMINI_KEY) {
    return mockResponse(prompt);
  }

  const resp = await axios.post(
    `${GEMINI_URL}?key=${GEMINI_KEY}`,
    {
      systemInstruction: {
        parts: [{ text: system }]
      },
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 800
      }
    },
    { timeout: 12000 }
  );

  return resp.data?.candidates?.[0]?.content?.parts?.map((part) => part.text).filter(Boolean).join('') || '';
}

async function callAI(prompt, system) {
  if (AI_PROVIDER === 'gemini') {
    return callGemini(prompt, system);
  }

  return callOpenAI(prompt, system);
}

module.exports = { callAI, AI_PROVIDER };