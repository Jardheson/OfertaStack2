const express = require('express');
const controller = require('../controllers/insightsController');

const router = express.Router();

router.get('/history', controller.history);
router.get('/dashboard', controller.dashboard);

module.exports = router;