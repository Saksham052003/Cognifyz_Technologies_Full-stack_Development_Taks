import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const News = () => {
  const { user } = useAuth();
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      fetchTopHeadlines();
    }
  }, [user]);

  const fetchTopHeadlines = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const response = await axios.get('http://localhost:8000/api/news/top-headlines', { headers });
      setNews(response.data.articles || []);
    } catch (error) {
      setError(`Error fetching top headlines: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = async (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);

    if (selectedCategory) {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`http://localhost:8000/api/news/category/${selectedCategory}`);
        setNews(response.data.articles || []);
      } catch (error) {
        setError(`Error fetching news by category: ${error.message}`);
      } finally {
        setLoading(false);
      }
    } else {
      fetchTopHeadlines();
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`http://localhost:8000/api/news/search?q=${searchQuery}`);
      setNews(response.data.articles || []);
    } catch (error) {
      setError(`Error fetching search results: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = async (article) => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      await axios.post('http://localhost:8000/api/news/favorites', article, { headers });
      alert('Added to favorites');
    } catch (error) {
      console.error('Add to favorites error:', error.response ? error.response.data : error);
    }
  };

  return (
    <div className="news-container">
      <h1 className="name">News</h1>

      <div className="category-container">
        <select value={category} onChange={handleCategoryChange}>
          <option value="">Select Category</option>
          <option value="business">Business</option>
          <option value="entertainment">Entertainment</option>
          <option value="health">Health</option>
          <option value="science">Science</option>
          <option value="sports">Sports</option>
          <option value="technology">Technology</option>
        </select>
      </div>

      <form onSubmit={handleSearch} className="form-container">
        <input
          type="text"
          placeholder="Search news..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading ? (
        <p>Loading news...</p>
      ) : error ? (
        <p>{error}</p>
      ) : news.length > 0 ? (
        <div className="news-list">
          {news.map((article, index) => (
            <div key={index} className="news-item">
              <h3>{article.title}</h3>
              <p><strong>Source:</strong> {article.source.name}</p>
              <p><strong>Author:</strong> {article.author}</p>
              <img src={article.urlToImage} alt={article.title} className="news-image" />
              <p>{article.description}</p>
              <a className="readmore" href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
              <button className="favorites-btn" onClick={() => addToFavorites(article)}>Add to Favorites</button>
              <hr className="news-separator" /> {/* Add separator here */}
            </div>
          ))}
        </div>
      ) : (
        <p>No news available</p>
      )}
    </div>
  );
};

export default News;
