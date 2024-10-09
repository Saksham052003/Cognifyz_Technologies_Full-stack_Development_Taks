import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext'; // Make sure to import your auth context.

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const { user } = useAuth(); // Get the authenticated user from context.
  
  useEffect(() => {
    if (user) {
      fetchFavorites();
    }
  }, [user]);

  const fetchFavorites = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      
      const response = await axios.get('http://localhost:8000/api/news/favorites', { headers });
      setFavorites(response.data);
    } catch (error) {
      console.error('Error fetching favorites:', error.response ? error.response.data : error);
    }
  };

  return (
    <div className="fav-container">
      <h2>Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorites yet!</p>
      ) : (
        <div>
          {favorites.map((article, index) => (
            <div key={index}>
              <h3>{article.title}</h3>
              <p><strong>Source:</strong> {article.source.name}</p> {/* Updated to use source */}
              <p><strong>Author:</strong> {article.author}</p>
              <img src={article.urlToImage} alt={article.title} /> {/* Updated to use image */}
              <p>{article.description}</p>
              <a className="readmore" href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
