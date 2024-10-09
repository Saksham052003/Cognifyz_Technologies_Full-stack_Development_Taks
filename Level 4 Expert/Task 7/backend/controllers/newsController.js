const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);
const News = require('../models/News');

// Fetch top headlines
const getTopNews = async (req, res) => {
  try {
    const response = await newsapi.v2.topHeadlines({
      language: 'en',
      pageSize: 10,
    });
    res.json(response);
  } catch (err) {
    console.error('Error fetching top news:', err);
    res.status(500).json({ error: err.message });
  }
};

// Fetch news by category
const getNewsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const response = await newsapi.v2.topHeadlines({
      category: category,
      language: 'en',
    });
    res.json(response);
  } catch (err) {
    console.error('Error fetching news by category:', err);
    res.status(500).json({ error: err.message });
  }
};

// Search news by query
const searchNews = async (req, res) => {
  const { q } = req.query;
  try {
    const response = await newsapi.v2.everything({ q });
    res.json(response);
  } catch (err) {
    console.error('Error searching news:', err);
    res.status(500).json({ error: err.message });
  }
};


// Save favorite news
const saveFavorite = async (req, res) => {
  const { title, description, url, source, author,urlToImage} = req.body;
  const userId = req.user._id;

  try {
    const newNews = await News.create({
      title,
      description,
      url,
      source,
      author,
      urlToImage,
      userId,
    });
    await newNews.save();
    res.status(201).json(newNews);
  } catch (err) {
    console.error('Error saving favorite news:', err);
    res.status(500).json({ error: err.message });
  }
};

// Get user favorites
const getFavorites = async (req, res) => {
  try {
    const favorites = await News.find({ userId: req.user._id });
    res.status(200).json(favorites);
  } catch (err) {
    console.error('Error fetching favorites:', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getTopNews, getNewsByCategory, searchNews, saveFavorite, getFavorites};
