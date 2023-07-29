const express = require('express');
const router = express.Router();
const { getLeaderboard } = require('../../../controllers/leaderboardController');
const verifyToken = require('../../../middleware/verifyTokenMiddleware');

router.get('/leaderboard', verifyToken, getLeaderboard);

module.exports = router;