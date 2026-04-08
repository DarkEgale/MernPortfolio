import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa'; // Install react-icons
import './Footer.scss';

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    {/* Brand/Name Part */}
                    <div className="footer-logo">
                        <h3>MD SHIMUL HOSSEN<span>.</span></h3>
                        <p>Building digital experiences with passion and code.</p>
                    </div>

                    {/* Social Links */}
                    <div className="footer-socials">
                        <a href="https://github.com" target="_blank" rel="noreferrer"><FaGithub /></a>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FaLinkedin /></a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter /></a>
                        <a href="mailto:your@email.com"><FaEnvelope /></a>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {currentYear} YourName. All rights reserved.</p>
                    <div className="footer-links">
                        <Link title="Home" to="/">Home</Link>
                        <Link title="Projects" to="/projects">Projects</Link>
                        <Link title="About" to="/about">About</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};