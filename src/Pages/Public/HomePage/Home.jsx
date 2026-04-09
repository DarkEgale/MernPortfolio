import { ProjectCard } from "../../../Components/Public/Cards/ProjectsCard/ProjectsCard";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.scss";
import shimul from "../../../assets/shimul.png";
import { motion } from "framer-motion";

export const Home = () => {
  const [projects, setProjects] = useState([]);
  const navigate=useNavigate()
  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch("https://mernportfolio-7x6r.onrender.com/api/public/projects", {
        method: "GET",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(res.message);
        return;
      }
      const data = await res.json();
      setProjects(data.projects);
      console.log(data);
    };
    fetchProjects();
  }, []);
  console.log(projects);
  return (
    <>
      <section className="hero-section">
        <div className="container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="welcome-text">Welcome to my portfolio</span>
            <h1>
              Hi, I'm <span>MD SHIMUL</span>
            </h1>
            <p>
              A passionate Full-Stack Developer specializing in building modern
              web applications with the MERN stack.
            </p>
            <div className="hero-btns">
              <button className="btn-primary" onClick={()=>navigate('/projects')}>View My Work</button>
              <button className="btn-outline"><a href="https://drive.google.com/file/d/1CnsJlZg-4VhrdZasqcl6pgv3MJBgkr9p/view?usp=sharing" style={{color:'black'}}>Download Resume</a></button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="home-about">
        <motion.div
          className="about-container"
          initial={{ opacity: 0, scale: 0.1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} 
          transition={{ duration: 0.5 }}
        >
          <div className="about-wrapper">
            <div className="about-image">
              <img src={shimul} alt="About Me" />
            </div>
            <div className="about-content">
              <h2>About Me</h2>
              <p>
                I am a passionate Full-Stack Developer with a strong focus on
                building functional and aesthetic web applications. With
                expertise in the MERN stack, I love turning complex problems
                into simple, elegant solutions.
              </p>
              <div className="personal-info">
                <span>
                  <strong>Experience:</strong> 1+ Year
                </span>
                <span>
                  <strong>Freelance:</strong> Available
                </span>
              </div>
              <button className="btn-primary"onClick={()=>navigate('/about')}>Read More</button>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="projects-section">
        <div className="container">
          <div className="section-header">
            <h2 className="title">My Recent Projects</h2>
            <p className="subtitle">
              A collection of my work in web development and design.
            </p>
          </div>

          <div className="projects-grid">
            {projects.length > 0 ? (
              projects
                .slice(0, 4)
                .map((p) => (
                  <ProjectCard
                    key={p._id}
                    thumbnail={p.thumbnail}
                    title={p.title}
                    id={p._id}
                    teckStack={p.techStack}
                  />
                ))
            ) : (
              <div className="no-projects">
                <p>No projects found. Please check back later!</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
