import React from 'react';
import { motion } from 'framer-motion';
import shimul from '../../../assets/shimul.png'
import './About.scss';

export const About = () => {
    const skills = [
        { name: "React.js", level: "90%" },
        { name: "JavaScript (ES6+)", level: "85%" },
        { name: "HTML5 & CSS3/SCSS", level: "95%" },
        { name: "Framer Motion", level: "70%" },
        { name: "Node.js (Learning)", level: "55%" },
        { name: "Express & MongoDB", level: "50%" },
    ];

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <main className="about-page">
            <div className="container">
                <section className="about-intro">
                    <motion.div 
                        className="text-side"
                        initial="hidden"
                        whileInView="visible"
                        variants={fadeIn}
                        viewport={{ once: true }}
                    >
                        <span className="badge">Who I Am</span>
                        <h1>Front-end Expert & <span>MERN Enthusiast</span></h1>
                        <p>
                            I am a Front-end Developer based in Bangladesh, passionate about creating 
                            seamless user experiences. Currently, I am expanding my horizons by 
                            mastering the **MERN Stack** to build robust full-stack applications.
                        </p>
                        <div className="info-grid">
                            <div className="info-item"><strong>Location:</strong> Bangladesh</div>
                            <div className="info-item"><strong>Status:</strong> Available for Work</div>
                        </div>
                    </motion.div>

                    <motion.div 
                        className="image-side"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div className="img-wrapper">
                            <img src={shimul} alt="Developer Profile" />
                        </div>
                    </motion.div>
                </section>

                <section className="skills-section">
                    <motion.h2 
                        initial={{ opacity: 0 }} 
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        Technical Proficiency
                    </motion.h2>
                    
                    <div className="skills-grid">
                        {skills.map((skill, index) => (
                            <div className="skill-item" key={index}>
                                <div className="skill-labels">
                                    <span>{skill.name}</span>
                                    <span>{skill.level}</span>
                                </div>
                                <div className="bar-bg">
                                    <motion.div 
                                        className="bar-fill"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: skill.level }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.2, ease: "circOut", delay: index * 0.1 }}
                                    ></motion.div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <motion.div 
                    className="journey-box"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="journey-content">
                        <h3>My Learning Roadmap</h3>
                        <p>
                            Having mastered the art of Front-end development, I am now focused 
                            on the backend. I spend my days exploring Node.js architecture 
                            and MongoDB database management to become a proficient Full-stack Developer.
                        </p>
                    </div>
                </motion.div>
            </div>
        </main>
    );
};