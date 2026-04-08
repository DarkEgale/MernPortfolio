import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaLaptopCode, FaDatabase, FaMobileAlt } from 'react-icons/fa'; // react-icons ব্যবহার করুন
import './Services.scss';

export const Services = () => {
    const serviceList = [
        {
            id: 1,
            icon: <FaCode />,
            title: "Front-end Development",
            description: "Building responsive, high-performance, and interactive user interfaces using React.js and modern SCSS.",
        },
        {
            id: 2,
            icon: <FaLaptopCode />,
            title: "Single Page Applications (SPA)",
            description: "Developing fast-loading web applications with smooth navigation using React Router and Framer Motion.",
        },
        {
            id: 3,
            icon: <FaDatabase />,
            title: "MERN Stack Solutions",
            description: "Currently expanding into full-stack territory, offering integrated solutions with MongoDB, Express, and Node.js.",
        },
        {
            id: 4,
            icon: <FaMobileAlt />,
            title: "Responsive Web Design",
            description: "Ensuring your website looks perfect on every device, from mobile screens to large desktop monitors.",
        }
    ];

    return (
        <main className="services-page">
            <div className="container">
                <motion.div 
                    className="services-header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="badge">What I Offer</span>
                    <h1>My Specialized <span>Services</span></h1>
                    <p>I provide high-quality web development services to help you build your digital presence.</p>
                </motion.div>

                <div className="services-grid">
                    {serviceList.map((service, index) => (
                        <motion.div 
                            className="service-card" 
                            key={service.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -10 }}
                        >
                            <div className="icon-box">{service.icon}</div>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                            <div className="card-footer">
                                <div className="dot-loader"></div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
};