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

      const res = await fetch('/api/admin/blog/create', {
        method: 'POST',
        body: form,
        credentials: 'include'
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed')
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
