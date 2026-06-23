const ai = require('../services/aiService');
const db = require('../services/db');
const cache = require('../services/cache');

/** Controller: orquestra a busca. Usa use-case "analyzeQuery" para reduzir múltiplas chamadas à IA. */
async function search(req, res) {
  try {
    const qRaw = req.body.q;
    if (typeof qRaw !== 'string') return res.status(400).json({ error: 'query required' });
    const q = qRaw.replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 120);
    if (!q) return res.status(400).json({ error: 'query required' });

    // check cache first
    const cacheKey = `search:${q.toLowerCase()}`;
    const cached = await cache.get(cacheKey);
    if (cached) return res.json({ query: q, ...cached, cached: true });

    // single call to IA returning structured JSON
    const aiResult = await ai.analyzeQuery(q);
    const corrected = aiResult.corrected || q;
    const category = aiResult.category || 'Outros';
    const description = aiResult.description || '';
    const summary = aiResult.summary || '';
    const suggestedCategories = aiResult.suggestedCategories || [];
    const improvedText = aiResult.improvedText || '';
    const related = aiResult.related || [];

    // persist history (non-blocking)
    db.saveSearch({ query: q, corrected, category }).catch((e) => console.warn('saveSearch failed', e));

    const payload = { corrected, category, description, summary, suggestedCategories, improvedText, related };
    await cache.set(cacheKey, payload, 1000 * 60 * 10); // 10min cache

    res.json({ query: q, ...payload, cached: false });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal_error' });
  }
}

module.exports = { search };
