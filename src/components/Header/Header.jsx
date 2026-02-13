// This is the navigation header
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Header.css';

const Header = () => {
  // Get favorites count from Redux
  const favorites = useSelector(state => state.favorites.movies);
  
  return (
    <header className="header">
      {/* Logo */}
      <div className="logo">
        <Link to="/">🎬 MovieHub</Link>
      </div>
      
      {/* Navigation Menu */}
      <nav className="nav">
        <ul className="nav-list">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/movies">Browse</Link></li>
          <li className="favorites-link">
            <Link to="/favorites">
              ❤️ Favorites 
              <span className="favorites-count">({favorites.length})</span>
            </Link>
          </li>
        </ul>
      </nav>
      
      {/* User Info */}
      <div className="user-info">
        <span>Welcome! 👋</span>
      </div>
    </header>
  );
};

export default Header;