import React, { useEffect, useState } from 'react'
import Sidebar from '../../../Components/Admin/Sidebar/Sidebar'
import BlogForm from '../../../Components/Admin/BlogForm/BlogForm'
import './Blogs.scss'
import { Pencil, Trash2 } from 'lucide-react'
import API_HOST from '../../../config/api'

export const Blogs = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [showEditor, setShowEditor] = useState(false)
  const [selectedBlog, setSelectedBlog] = useState(null)

  useEffect(() => { fetchBlogs() }, [])

  const fetchBlogs = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API_HOST}/api/public/blogs`)
      const data = await res.json()
      if (data && data.blogs) setBlogs(data.blogs)
      else setBlogs([])
    } catch (err) {
      console.error(err)
      setBlogs([])
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (blog) => {
    setSelectedBlog(blog)
    setShowEditor(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this blog?')) return
    try {
      const res = await fetch(`${API_HOST}/api/admin/blog/delete/${id}`, { method: 'DELETE', credentials: 'include' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Delete failed')
      // refresh list
      fetchBlogs()
    } catch (err) {
      console.error(err)
      alert(err.message || 'Delete failed')
    }
  }

  const handleEditorSuccess = () => {
    setShowEditor(false)
    setSelectedBlog(null)
    fetchBlogs()
  }

  return (
    <div className="dashboard-root">
      <Sidebar />
      <div className="dashboard-container">
        <div className="admin-blogs"
          style={{ padding: '20px',display: 'flex', flexDirection: 'column', gap: '20px',justifyContent: 'center', alignItems: 'flex-start' }}>
          <header className="admin-blogs-header">
            <h2>Blogs</h2>
            <p>Total: {blogs.length}</p>
          </header>

          <section className="blogs-table">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Subtitle</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.length > 0 ? (
                    blogs.map((b) => (
                      <tr key={b._id}>
                        <td>{b.title}</td>
                        <td>{b.subtitle}</td>
                        <td className="actions">
                          <button onClick={() => handleEdit(b)}>
                            <Pencil size={16} />
                          </button>
                          <button onClick={() => handleDelete(b._id)}>
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3}>No blogs found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </section>

          {showEditor && selectedBlog && (
            <div className="modal-overlay">
              <div className="modal-content">
                <button className="close-btn" onClick={() => { setShowEditor(false); setSelectedBlog(null) }}>
                  Close
                </button>
                <BlogForm initialData={selectedBlog} blogId={selectedBlog._id} onSuccess={handleEditorSuccess} onCancel={() => { setShowEditor(false); setSelectedBlog(null) }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Blogs
