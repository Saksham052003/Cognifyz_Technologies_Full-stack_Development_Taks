// context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch user details using token
      axios.get('http://localhost:7000/api/auth/me', { 
        headers: { Authorization: `Bearer ${token}` } 
      }).then(response => {
        setUser(response.data);
      }).catch(() => {
        // If token is invalid, clear it
        localStorage.removeItem('token');
      });
    }
  }, []);

  const signup = async (name, email, password) => {
    const response = await axios.post('http://localhost:7000/api/auth/signup', { name, email, password });
    setUser(response.data);
    localStorage.setItem('token', response.data.token);
  };

  const login = async (email, password) => {
    const response = await axios.post('http://localhost:7000/api/auth/login', { email, password });
    setUser(response.data);
    localStorage.setItem('token', response.data.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
