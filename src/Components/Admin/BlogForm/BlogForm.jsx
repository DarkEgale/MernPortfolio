import React, { useState } from 'react'
import './BlogForm.scss'

const BlogForm = ({ onSuccess, onCancel }) => {
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if (!title || !subtitle || !content || !image) {
      setError('All fields are required')
      return
    }
    setLoading(true)
    try {
      const form = new FormData()
      form.append('title', title)
      form.append('subtitle', subtitle)
      form.append('content', content)
      form.append('image', image)

      const API_BASE = 'https://mernportfolio-7x6r.onrender.com';
      const res = await fetch(`${API_BASE}/api/admin/blog/create`, {
        method: 'POST',
        body: form,
        credentials: 'include'
      })
        let data = null
        const ct = res.headers.get('content-type') || ''
        if (ct.includes('application/json')) {
          data = await res.json()
        } else {
          const text = await res.text()
          try {
            data = text ? JSON.parse(text) : null
          } catch (err) {
            data = { message: text }
          }
        }
        if (!res.ok) throw new Error((data && (data.message || data.error)) || `Request failed (${res.status})`)
      if (onSuccess) onSuccess(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="blog-form" onSubmit={handleSubmit}>
      {error && <div className="form-error">{error}</div>}
      <label>
        Title
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>

      <label>
        Subtitle
        <input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
      </label>

      <label>
        Content
        <textarea rows={8} value={content} onChange={(e) => setContent(e.target.value)} />
      </label>

      <label className="file-input">
        Cover image
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
      </label>

      <div className="form-actions">
        <button type="button" className="btn btn-muted" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Saving...' : 'Create Blog'}</button>
      </div>
    </form>
  )
}

export default BlogForm
