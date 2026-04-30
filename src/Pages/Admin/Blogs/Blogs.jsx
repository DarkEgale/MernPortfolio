import React, { useEffect, useState } from 'react'
import Sidebar from '../../../Components/Admin/Sidebar/Sidebar'
import './Blogs.scss'
import { Pencil, Trash2 } from 'lucide-react'

export const Blogs = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/public/blogs')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.blogs) setBlogs(data.blogs)
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="dashboard-root">
      <Sidebar />
      <div className="dashboard-container">
        <div className="admin-blogs">
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
                          <button>
                            <Pencil size={16} />
                          </button>
                          <button>
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
        </div>
      </div>
    </div>
  )
}

export default Blogs
