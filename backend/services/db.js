const { Client } = require('pg');
const connectionString = process.env.DATABASE_URL;

let client = null;
if (connectionString) {
  client = new Client({ connectionString });
  client.connect().catch(() => console.warn('DB connect failed (maybe invalid DATABASE_URL)'));
}

async function saveSearch({ query, corrected, category }) {
  if (!client) return;
  const text = `INSERT INTO searches(query, corrected, category, created_at) VALUES($1,$2,$3,NOW())`;
  try {
    await client.query(text, [query, corrected, category]);
  } catch (e) {
    console.warn('saveSearch failed', e.message);
  }
}

async function listRecentSearches(limit = 10) {
  if (!client) {
    return [
      { query: 'Notebook Gamer', corrected: 'Notebook Gamer', category: 'Informática', created_at: new Date().toISOString() },
      { query: 'Tênis para corrida', corrected: 'Tênis para corrida', category: 'Esporte', created_at: new Date().toISOString() }
    ];
  }

  const text = `
    SELECT query, corrected, category, created_at
    FROM searches
    ORDER BY created_at DESC
    LIMIT $1
  `;

  const result = await client.query(text, [limit]);
  return result.rows;
}

async function getDashboardStats(limit = 5) {
  if (!client) {
    return {
      totalSearches: 24,
      topCategories: [
        { category: 'Informática', total: 10 },
        { category: 'Esporte', total: 7 },
        { category: 'Moda', total: 4 }
      ],
      topQueries: [
        { query: 'Notebook Gamer', total: 6 },
        { query: 'Tênis para corrida', total: 5 },
        { query: 'Fone bluetooth', total: 3 }
      ],
      recentSearches: await listRecentSearches(limit)
    };
  }

  const totalResult = await client.query('SELECT COUNT(*)::int AS total FROM searches');
  const categoriesResult = await client.query(
    `SELECT COALESCE(category, 'Outros') AS category, COUNT(*)::int AS total
     FROM searches
     GROUP BY COALESCE(category, 'Outros')
     ORDER BY total DESC
     LIMIT $1`,
    [limit]
  );
  const queriesResult = await client.query(
    `SELECT COALESCE(corrected, query) AS query, COUNT(*)::int AS total
     FROM searches
     GROUP BY COALESCE(corrected, query)
     ORDER BY total DESC
     LIMIT $1`,
    [limit]
  );

  return {
    totalSearches: totalResult.rows?.[0]?.total || 0,
    topCategories: categoriesResult.rows,
    topQueries: queriesResult.rows,
    recentSearches: await listRecentSearches(limit)
  };
}

module.exports = { saveSearch, listRecentSearches, getDashboardStats };
