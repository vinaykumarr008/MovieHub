// Simple footer component
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>🎬 MovieHub - Discover Amazing Movies</p>
      <p className="footer-sub">Made with React, Redux & ❤️</p>
      <p className="footer-note">Data provided by The Movie Database (TMDB)</p>
    </footer>
  );
};

export default Footer;