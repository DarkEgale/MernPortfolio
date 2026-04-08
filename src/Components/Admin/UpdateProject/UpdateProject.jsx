import React, { useState, useEffect } from 'react';
import './UpdateProject.scss';

export const UpdateProject = ({ projectId, onUpdateSuccess }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [techStack, setTechStack] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [screenShots, setScreenShots] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!projectId) return;

        const fetchProject = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/public/projects/${projectId}`);
                const data = await response.json();
                if (response.ok) {
                    setTitle(data.title || '');
                    setDescription(data.description || '');
                    setTechStack(data.techStack ? data.techStack.join(', ') : '');
                }
            } catch (error) {
                console.error("Fetch Error:", error);
            }
        };
        fetchProject();
    }, [projectId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        
        const techArray = techStack.split(',').map(item => item.trim()).filter(item => item !== "");
        formData.append('techStack', JSON.stringify(techArray)); 

        if (thumbnail) {
            formData.append('thumbnail', thumbnail);
        }

        if (screenShots.length > 0) {
            Array.from(screenShots).forEach((file) => {
                formData.append('screenShots', file);
            });
        }

        try {
            const response = await fetch(`http://localhost:5000/api/admin/update/${projectId}`, {
                method: 'PATCH',
                body: formData,
                credentials: 'include', 
            });

            const result = await response.json();

            if (response.ok) {
                alert("Project Updated Successfully!");
                if (onUpdateSuccess) onUpdateSuccess();
            } else {
                alert(result.message || "Update failed");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Server error, please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section>
            <h2>Update Project</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Project Title</label>
                    <input 
                        type="text" 
                        placeholder="Title" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                    />
                </div>

                <div className="input-group">
                    <label>Description</label>
                    <textarea 
                        placeholder="Description" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        required 
                    />
                </div>

                <div className="input-group">
                    <label>Tech Stack</label>
                    <input 
                        type="text" 
                        placeholder="e.g. React, Node, Sass" 
                        value={techStack} 
                        onChange={(e) => setTechStack(e.target.value)} 
                        required
                    />
                    <small style={{color: '#64748b', fontSize: '0.8rem'}}>Separate tags with commas (,)</small>
                </div>

                <div className="input-group">
                    <label>Thumbnail (Optional)</label>
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => setThumbnail(e.target.files[0])} 
                    />
                </div>

                <div className="input-group">
                    <label>Screenshots (Optional)</label>
                    <input 
                        type="file" 
                        multiple 
                        accept="image/*"
                        onChange={(e) => setScreenShots(e.target.files)} 
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "Updating..." : "Update Project"}
                </button>
            </form>
        </section>
    );
};