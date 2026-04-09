import "./ProjectsCard.scss";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
export const ProjectCard = ({ title, thumbnail, teckStack, id }) => {
  const navigate=useNavigate();
  return (
    <>
      <motion.div
        className="card-body"
        initial={{ opacity: 0, scale: 0.1 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }} 
        transition={{ duration: 0.5 }}
      >
        <div className="card-top">
          <img src={thumbnail} alt={title} />
        </div>
        <div className="card-bottom">
          <b>{title}</b>
          <ul className="techStack">
            {teckStack.map((t) => (
              <li>{t}</li>
            ))}
          </ul>
          <button onClick={()=>navigate(`/projectdetails/${id}`)}>View Project</button>
        </div>
      </motion.div>
    </>
  );
};
