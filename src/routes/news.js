const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/auth');
const { fetchNews, getUserPreference, updateUserPreference } = require('../controllers/news');

router.get('/preference', authenticateToken, getUserPreference)
router.put('/preference', authenticateToken, updateUserPreference)
router.get('/fetchNews', authenticateToken, fetchNews)


module.exports = router;
