import React, { useState } from 'react';
import './ProjectUpload.scss';

export const UploadProject = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [techStack, setTechStack] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [screenShots, setScreenShots] = useState([]);
    const [loading, setLoading] = useState(false);

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
            screenShots.forEach((file) => {
                formData.append('screenShots', file);
            });
        }

        try {
            const response = await fetch('https://mernportfolio-7x6r.onrender.com/api/admin/create', {
                method: 'POST',
                body: formData,
                credentials: 'include', 
            });

            const result = await response.json();

            if (response.ok) {
                alert("Project Uploaded Successfully!");
                setTitle('');
                setDescription('');
                setTechStack('');
                setThumbnail(null);
                setScreenShots([]);
            } else {
                alert(result.message || "Upload failed");
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
            <h2>Upload Project</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="">Title</label>
                    <input 
                        type="text" 
                        placeholder="Title" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="">Description</label>
                    <textarea 
                        placeholder="Description" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        required 
                    />
                </div>

                <div className="input-group">
                    <input 
                        type="text" 
                        placeholder="Tech Stack (e.g. React, Node, Sass)" 
                        value={techStack} 
                        onChange={(e) => setTechStack(e.target.value)} 
                        required
                    />
                    <small style={{color: '#64748b', fontSize: '0.8rem'}}>Separate tags with commas (,)</small>
                </div>

                <div className="input-group">
                    <label>Thumbnail:</label>
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => setThumbnail(e.target.files[0])} 
                        required 
                    />
                </div>

                <div className="input-group">
                    <label>Screenshots:</label>
                    <input 
                        type="file" 
                        multiple 
                        accept="image/*"
                        onChange={(e) => {
                            const files = Array.from(e.target.files);
                            setScreenShots(files);
                        }} 
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "Processing..." : "Submit Project"}
                </button>
            </form>
        </section>
    );
};