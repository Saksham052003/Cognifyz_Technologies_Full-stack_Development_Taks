const express = require('express');
const {
  getTopNews,
  getNewsByCategory,
  searchNews,
  saveFavorite,
  getFavorites,
} = require('../controllers/newsController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Get top headlines
router.get('/top-headlines', authMiddleware, getTopNews);

// Get news by category
router.get('/category/:category', getNewsByCategory);

// Search news by keyword
router.get('/search', searchNews); // Make sure authMiddleware is added if required

// Save a favorite news
router.post('/favorites', authMiddleware, saveFavorite);

// Get user's favorite news
router.get('/favorites', authMiddleware, getFavorites);

module.exports = router;
