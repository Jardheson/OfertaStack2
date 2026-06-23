// Cache adapter: usa Redis quando REDIS_URL estiver configurada, senão fallback in-memory
const REDIS_URL = process.env.REDIS_URL;

if (REDIS_URL) {
  const IORedis = require('ioredis');
  const redis = new IORedis(REDIS_URL);

  async function set(key, value, ttlMs = 1000 * 60 * 5) {
    const val = JSON.stringify(value);
    await redis.set(key, val, 'PX', ttlMs);
  }

  async function get(key) {
    const v = await redis.get(key);
    if (!v) return null;
    try {
      return JSON.parse(v);
    } catch (e) {
      return null;
    }
  }

  module.exports = { set, get };
} else {
  const cache = new Map();

  async function set(key, value, ttlMs = 1000 * 60 * 5) {
    const expires = Date.now() + ttlMs;
    cache.set(key, { value, expires });
  }

  async function get(key) {
    const entry = cache.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expires) {
      cache.delete(key);
      return null;
    }
    return entry.value;
  }

  module.exports = { set, get };
}
