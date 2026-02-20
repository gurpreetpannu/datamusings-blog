import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <span className="footer-copyright">
                    © {new Date().getFullYear()} Data Musings
                </span>
                <div className="footer-links">
                    <Link to="/" className="footer-link">Home</Link>
                    <Link to="/about" className="footer-link">About</Link>
                    <Link to="/contact" className="footer-link">Contact</Link>
                    <a
                        href="https://www.linkedin.com/in/gurpreet-pannu-62990285/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-link"
                    >
                        LinkedIn
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
