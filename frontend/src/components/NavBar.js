// src/components/NavBar.js
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('access_token');

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  };

  const handleProfile = () => {
    navigate('/profile'); // ✅ Fixed: removed e.preventDefault()
  };

  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">ATA</Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarContent">
        <ul className="navbar-nav ms-auto">
          {token ? (
            <>
              <li className="nav-item mx-2">
                <button onClick={handleProfile} className="btn btn-outline-light">
                  Profile
                </button>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="btn btn-outline-danger">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              {!isLoginPage && (
                <li className="nav-item mx-1">
                  <Link to="/login" className="btn btn-outline-light">Login</Link>
                </li>
              )}
              {!isRegisterPage && (
                <li className="nav-item">
                  <Link to="/register" className="btn btn-outline-light">Register</Link>
                </li>
              )}
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;