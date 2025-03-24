import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Navigation = () => {
  return (
    <nav className="navbar">
      <Logo />
      <div className="nav-links">
        <Link to="/about" className="nav-link">About Me</Link>
        <a 
          href="https://www.linkedin.com/in/gurpreet-pannu-62990285/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="nav-link"
        >
          LinkedIn
        </a>
        <Link to="/contact" className="nav-link">Contact</Link>
      </div>
    </nav>
  );
};

export default Navigation; 