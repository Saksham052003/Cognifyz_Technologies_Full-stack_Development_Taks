import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const handleLogout = () => {
    logout();  // Call the logout function
  }; 
  const toggleNavbar = () => {
    setIsOpen(!isOpen);  // Toggle the state when the hamburger is clicked
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/dashboard">Expense Manager</Link>
      </div>
      <div className={`nav-links ${isOpen ? 'open' : ''}`}>
        {user ? (
          <>
            <span className="username">Hello, {user.email}</span>
            <Link className="nav-btn" to="/dashboard">Dashboard</Link>
            <Link className="nav-btn" to="/charts">Charts</Link> {/* Link to Charts page */}
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link className="nav-btn" to="/login">Login</Link>
            <Link className="nav-btn" to="/signup">Signup</Link>
          </>
        )}
      </div>
      {/* Hamburger icon */}
      <div className="hamburger" onClick={toggleNavbar}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
};

export default Navbar;
