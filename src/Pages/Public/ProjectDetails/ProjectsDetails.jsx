import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./ProjectsDetails.scss";

export const ProjectDetails = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const scrollRef = useRef(null); 

    useEffect(() => {
        const fetchProject = async () => {
            try {
                setLoading(true);
                const res = await fetch(`https://mernportfolio-7x6r.onrender.com/api/public/projects/${id}`);
                const data = await res.json();
                
                if (res.ok) {
                    setProject(data.project);
                    return
                } else if (data._id) {
                    setProject(data);
                }
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [id]);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollAmount = clientWidth * 0.8; 
            
            scrollRef.current.scrollTo({
                left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    if (loading) return <div className="loading">Loading Project...</div>;
    
    if (!project || !project.title) return <div className="error">Project not found.</div>;

    return (
        <main className="project-details">
            <div className="container">
                <header className="project-header">
                    <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        {project.title}
                    </motion.h1>
                    
                    <div className="tech-stack">
                        {project.techStack?.map((tech, i) => (
                            <span key={i} className="tech-badge">{tech}</span>
                        ))}
                    </div>
                </header>

                {project.screenShots?.length > 0 && (
                    <div className="screenshots-container">
                        {/* Left Button */}
                        <button className="nav-btn left" onClick={() => scroll('left')}>
                            <ChevronLeft size={30} />
                        </button>

                        <div className="scroll-wrapper" ref={scrollRef}>
                            {project.screenShots.map((img, index) => (
                                <div className="scroll-item" key={index}>
                                    <img src={img} alt={`Screenshot ${index + 1}`} />
                                </div>
                            ))}
                        </div>

                        {/* Right Button */}
                        <button className="nav-btn right" onClick={() => scroll('right')}>
                            <ChevronRight size={30} />
                        </button>
                    </div>
                )}

                <section className="description-section">
                    <h2>Project Overview</h2>
                    <p>{project.description}</p>
                </section>
            </div>
        </main>
    );
};