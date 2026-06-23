const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const searchRouter = require('./routes/search');
const insightsRouter = require('./routes/insights');

const app = express();
app.use(cors());
app.use(express.json());

// Simple rate-limiter middleware (in-memory)
const rateMap = new Map();
function rateLimit(req, res, next) {
	try {
		const ip = req.ip || req.connection.remoteAddress || 'global';
		const now = Date.now();
		const windowMs = 60 * 1000; // 1 minute
		const max = 60; // max requests per window
		const entry = rateMap.get(ip) || { count: 0, start: now };
		if (now - entry.start > windowMs) {
			entry.count = 1;
			entry.start = now;
		} else {
			entry.count += 1;
		}
		rateMap.set(ip, entry);
		if (entry.count > max) return res.status(429).json({ error: 'rate_limited' });
		next();
	} catch (e) {
		next();
	}
}

app.use(rateLimit);
app.use('/api/search', searchRouter);
app.use('/api', insightsRouter);

// basic error handler
app.use((err, req, res, next) => {
	console.error('Unhandled error', err);
	res.status(500).json({ error: 'internal_error' });
});

if (require.main === module) {
	const port = process.env.PORT || 3000;
	app.listen(port, () => console.log(`Backend running on port ${port}`));
}

module.exports = app;
