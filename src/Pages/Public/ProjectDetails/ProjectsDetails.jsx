import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./ProjectsDetails.scss";
import API_HOST from '../../../config/api'
import { ProjectDetailsSkeleton } from "../../../Components/Common/Skeleton/Skeleton";

export const ProjectDetails = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const scrollRef = useRef(null); 

    useEffect(() => {
        const fetchProject = async () => {
            try {
                setLoading(true);
                const res = await fetch(`${API_HOST}/api/public/projects/${id}`);
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

    if (loading) return <ProjectDetailsSkeleton />;
    
    if (!project || !project.title) return <div className="error">Project not found.</div>;

    return (
        <main className="project-details">
            <div className="container">
                <header className="project-header">
                    <Motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        {project.title}
                    </Motion.h1>
                    
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
                <div className="liveButtons">
                    <button onClick={()=>window.open(project.live)}>Live</button>
                    <button onClick={()=>window.open(project.gitrepo)}>GitRepository</button>
                </div>
                <section className="description-section">
                    <h2>Project Overview</h2>
                    <p>{project.description}</p>
                </section>
            </div>
        </main>
    );
};
