import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // No initial user fetching

    const signup = async (email, password) => {
        try {
            const uri = 'http://localhost:8000';
            const response = await axios.post(`${uri}/api/auth/signup`, { email, password });
            setUser({ email, token: response.data.token }); // Set user state directly on signup
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            console.error('Signup error:', error); // Log signup errors
        }
    };

    const login = async (email, password) => {
        try {
            const uri = 'http://localhost:8000';
            const response = await axios.post(`${uri}/api/auth/login`, { email, password });
            setUser({ email, token: response.data.token }); // Set user state directly on login
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            console.error('Login error:', error); // Log login errors
        }
    };

    const logout = () => {
        setUser(null); // Clear user state on logout
        localStorage.removeItem('token'); // Remove token from local storage
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
