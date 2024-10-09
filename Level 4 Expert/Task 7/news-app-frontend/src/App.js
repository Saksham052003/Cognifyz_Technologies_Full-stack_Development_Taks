import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import News from './components/Dashboard/News';
import Favorites from './components/Dashboard/Favorites';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Navbar from './components/Navbar';
import './App.css';

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>

      <Route path="/" element={user ? <News />:<Navigate to="/login" />}/>
      <Route path="/favorites" element={user ? <Favorites />:<Navigate to="/login" />}/>
      <Route path="/login" element={!user ? <Login />: <Navigate to="/"/>} />
      <Route path="/signup" element={!user ? <Signup />: <Navigate to="/" />}/>
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="pages">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
