import { useState, useEffect } from "react";
import { ProjectCard } from "../../../Components/Public/Cards/ProjectsCard/ProjectsCard";
import "./Project.scss";

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch("http://localhost:5000/api/public/projects", {
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
    <section>
        <h1>My Projects</h1><br />
      <div className="projects-grid">
        {projects.length > 0 ? (
          projects.map((p) => (
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
    </section>
  );
};
