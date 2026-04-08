import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import { UpdateProject } from "../../../Components/Admin/UpdateProject/UpdateProject";
import { UploadProject } from "../../../Components/Admin/ProjectUpload/ProjectUpload";
import "./Dashboard.scss";

export const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/public/projects");
      const data = await response.json();
      if (response.ok) {
        if (data.projects && Array.isArray(data.projects)) {
          setProjects(data.projects);
        } else {
          setProjects([]);
        }
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (id) => {
    setSelectedProjectId(id);
    setShowUpdateForm(true);
  };

  const handleCloseForm = () => {
    setShowUpdateForm(false);
    setShowCreateForm(false);
    setSelectedProjectId(null);
    fetchProjects();
  };

  return (
    <div className="dashboard-container">
      {/* Create Project Modal */}
      {showCreateForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowCreateForm(false)}>
              <X size={24}/>
            </button>
            {/* Success হলে ফর্ম বন্ধ করার জন্য প্রপস পাস করুন */}
            <UploadProject onSuccess={handleCloseForm} />
          </div>
        </div>
      )}

      {/* Update Project Modal */}
      {showUpdateForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={handleCloseForm}>
              <X size={24} />
            </button>
            <UpdateProject
              projectId={selectedProjectId}
              onUpdateSuccess={handleCloseForm}
            />
          </div>
        </div>
      )}

      {/* Main Table View (ফর্ম না দেখালে এটি দেখা যাবে) */}
      {!showCreateForm && !showUpdateForm && (
        <>
          <header className="dashboard-header">
            <div>
              <h1>Project Management</h1>
              <p>Total: {projects?.length || 0}</p>
            </div>
            <button className="add-btn" onClick={() => setShowCreateForm(true)}>
              <Plus size={20} /> Add New Project
            </button>
          </header>

          <section className="table-section">
            {loading ? (
              <p>Loading projects...</p>
            ) : (
              <table className="project-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(projects) && projects.length > 0 ? (
                    projects.map((project) => (
                      <tr key={project._id}>
                        <td>{project.title}</td>
                        <td className="actions">
                          <button onClick={() => handleEditClick(project._id)}>
                            <Pencil size={18} color="#3b82f6" />
                          </button>
                          <button>
                            <Trash2 size={18} color="#ef4444" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2">No projects found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </section>
        </>
      )}
    </div>
  );
};