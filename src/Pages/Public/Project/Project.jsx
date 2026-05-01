import { useState, useEffect } from "react";
import { ProjectCard } from "../../../Components/Public/Cards/ProjectsCard/ProjectsCard";
import "./Project.scss";
import API_HOST from '../../../config/api'
import { ProjectCardSkeleton } from "../../../Components/Common/Skeleton/Skeleton";

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_HOST}/api/public/projects`, {
          method: "GET",
        });
        if (!res.ok) {
          throw new Error("Failed to load projects");
        }
        const data = await res.json();
        if (mounted) {
          setProjects(Array.isArray(data.projects) ? data.projects : []);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };
    fetchProjects();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section>
        <h1>My Projects</h1><br />
      <div className="projects-grid">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <ProjectCardSkeleton key={index} />
          ))
        ) : error ? (
          <div className="no-projects">
            <p>{error}</p>
          </div>
        ) : projects.length > 0 ? (
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
