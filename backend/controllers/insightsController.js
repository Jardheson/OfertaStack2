const db = require('../services/db');

async function history(req, res) {
  try {
    const limit = Number(req.query.limit || 10);
    const items = await db.listRecentSearches(Number.isFinite(limit) ? Math.max(1, Math.min(limit, 50)) : 10);
    res.json({ items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal_error' });
  }
}

async function dashboard(req, res) {
  try {
    const limit = Number(req.query.limit || 5);
    const data = await db.getDashboardStats(Number.isFinite(limit) ? Math.max(1, Math.min(limit, 20)) : 5);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'internal_error' });
  }
}

module.exports = { history, dashboard };