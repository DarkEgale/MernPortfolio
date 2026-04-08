import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import './Contact.scss';

export const Contact = () => {
    return (
        <main className="contact-page">
            <div className="container">
                <motion.div 
                    className="contact-header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="badge">Get In Touch</span>
                    <h1>Let's Talk About <span>Your Project</span></h1>
                    <p>Interested in working together? Feel free to drop a message!</p>
                </motion.div>

                <div className="contact-wrapper">
                    {/* Left Side: Contact Info */}
                    <motion.div 
                        className="contact-info"
                        initial={{ opacity: 0, x: -80 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="info-card">
                            <div className="icon-box"><FaEnvelope /></div>
                            <div>
                                <h4>Email Me</h4>
                                <p>shimul723290@gmail.com</p>
                                <p>01321372849</p>
                            </div>
                        </div>

                        <div className="info-card">
                            <div className="icon-box"><FaMapMarkerAlt /></div>
                            <div>
                                <h4>Location</h4>
                                <p>Dhaka, Bangladesh</p>
                            </div>
                        </div>

                        <div className="social-links">
                            <h3>Follow Me</h3>
                            <div className="links">
                                <a href="https://github.com" target="_blank" rel="noreferrer"><FaGithub /></a>
                                <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FaLinkedin /></a>
                                <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter /></a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side: Contact Form */}
                    <motion.div 
                        className="contact-form-container"
                        initial={{ opacity: 0, x: 80 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                            <div className="form-group">
                                <input type="text" placeholder="Your Name" required />
                            </div>
                            <div className="form-group">
                                <input type="email" placeholder="Your Email" required />
                            </div>
                            <div className="form-group">
                                <input type="text" placeholder="Subject" required />
                            </div>
                            <div className="form-group">
                                <textarea placeholder="Your Message" rows="5" required></textarea>
                            </div>
                            <button type="submit" className="submit-btn">Send Message</button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </main>
    );
};