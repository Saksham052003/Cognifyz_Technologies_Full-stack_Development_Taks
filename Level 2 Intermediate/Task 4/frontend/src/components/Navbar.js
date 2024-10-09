import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, NavItem, NavLink, Button } from 'reactstrap';

const Navbar = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();
  const email = localStorage.getItem('email');

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <BootstrapNavbar color="dark" light expand="md">
      <Nav className="mr-auto" navbar>
        {isAuthenticated ? (
          <>
            <NavItem>
              <NavLink tag={Link} to="/">
                Todo List
              </NavLink>
            </NavItem>
            <NavItem>
              <span className="navbar-text">{email}</span>
            </NavItem>
            <NavItem>
              <Button color="link" onClick={handleLogout} className="btn-link" style={{ textDecoration: 'none' }}>
                Logout
              </Button>
            </NavItem>
          </>
        ) : (
          <>
            <NavItem>
              <NavLink tag={Link} to="/signup">
                Signup
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/login">
                Login
              </NavLink>
            </NavItem>
          </>
        )}
      </Nav>
    </BootstrapNavbar>
  );
};

export default Navbar;
