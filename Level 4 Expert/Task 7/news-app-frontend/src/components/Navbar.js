import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () =>{
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    
    const handleLogout = () =>{
        logout();
    };

    const toggleNavbar = () =>{
        setIsOpen(!isOpen);
    };

    return(
        <nav className="navbar">
            <div className="logo">
                <Link to="/">News App</Link>
            </div>
            <div className={`nav-links ${isOpen ? 'open' : ''}`}>
                {user ?(
                    <>
                        <span className="username">Hello, {user.email}</span>
                        <Link className="nav-btn" to="/">News Dashboard</Link>
                        <Link className="nav-btn" to="/favorites">Favorites</Link>
                        <button className="logout-btn" onClick={handleLogout}>Logout</button>
                    </>
                ):(
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