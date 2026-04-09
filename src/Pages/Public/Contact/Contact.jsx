import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Contact.scss';

export const Contact = () => {
    const navigate=useNavigate()
    const[message,setMessage]=useState('')
    const[loading,setLoading]=useState(false)

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        setLoading(true)
        emailjs.sendForm(
            'service_hsq8xhk', 
            'template_7r9bjcv', 
            form.current, 
            '4zLI39W35sPt9wmWG'
        )
        .then((result) => {
            setLoading(false)
            console.log("Email was successfully sent", result.text);
            setMessage('Message was sucessfully sent to MD SHIMUL Please chack your email account for md shimul reply')
            setTimeout(()=>{
                setMessage('')
            },5000)
            e.target.reset(); 
        }, (error) => {
            console.log("Error", error.text);
            setMessage("Sorry, message wasn't sent.");
        });
    };

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
                                <a href="https://github.com/DarkEgale" target="_blank" rel="noreferrer"><FaGithub /></a>
                                <a href="https://www.linkedin.com/in/md-shimul-hossen-32ab67395" target="_blank" rel="noreferrer"><FaLinkedin /></a>
                                <a href="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter /></a>
                            </div>
                        </div>
                    </motion.div>

                    
                    <motion.div 
                        className="contact-form-container"
                        initial={{ opacity: 0, x: 80 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        
                        <form className="contact-form" ref={form} onSubmit={sendEmail}>
                            <div className="message"style={{color:'green'}}>
                                {message?message:''}
                            </div>
                            <div className="form-group">
                                <input type="text" placeholder="Your Name" name='name' required />
                            </div>
                            <div className="form-group">
                                <input type="email" placeholder="Your Email" name='user_email' required />
                            </div>
                            <div className="form-group">
                                <input type="text" placeholder="Subject" name='subject' required />
                            </div>
                            <div className="form-group">
                                <textarea placeholder="Your Message" rows="5" name='message' required></textarea>
                            </div>
                            
                            
                            <input type="hidden" name="time" value={new Date().toLocaleString()} />
                            
                            <button type="submit" className="submit-btn">{loading?'Sending Message...':'Send Message'}</button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </main>
    );
};