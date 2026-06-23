const request = require('supertest');
const app = require('../server');

describe('POST /api/search', () => {
  it('returns 400 when no query', async () => {
    const res = await request(app).post('/api/search').send({});
    expect(res.statusCode).toBe(400);
  });

  it('returns 400 when query is blank', async () => {
    const res = await request(app).post('/api/search').send({ q: '   ' });
    expect(res.statusCode).toBe(400);
  });

  it('returns structured response for a query', async () => {
    const res = await request(app).post('/api/search').send({ q: 'Notebook Gamer' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('category');
    expect(res.body).toHaveProperty('summary');
    expect(res.body).toHaveProperty('related');
  });
});

describe('GET /api/history', () => {
  it('returns recent searches', async () => {
    const res = await request(app).get('/api/history');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.items)).toBe(true);
  });
});

describe('GET /api/dashboard', () => {
  it('returns dashboard stats', async () => {
    const res = await request(app).get('/api/dashboard');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('totalSearches');
    expect(res.body).toHaveProperty('topCategories');
    expect(res.body).toHaveProperty('topQueries');
    expect(res.body).toHaveProperty('recentSearches');
  });
});
