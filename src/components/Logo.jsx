import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const Logo = () => {
  return (
    <Link to="/" className="logo">
      <span className="logo-mark">DM</span>
      <span className="logo-text">Data Musings</span>
    </Link>
  );
};

export default Logo;