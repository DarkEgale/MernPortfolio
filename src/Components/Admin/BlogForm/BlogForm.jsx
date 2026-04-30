import React, { useEffect, useState } from 'react'
import './BlogForm.scss'
import API_HOST from '../../../config/api'

const BlogForm = ({ onSuccess, onCancel, initialData = null, blogId = null }) => {
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '')
      setSubtitle(initialData.subtitle || initialData.excerpt || '')
      setContent(initialData.content || '')
      // image left null so user can upload new one; show preview outside if needed
    }
  }, [initialData])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if (!title || !subtitle || !content) {
      setError('Title, subtitle and content are required')
      return
    }
    setLoading(true)
    try {
      const form = new FormData()
      form.append('title', title)
      form.append('subtitle', subtitle)
      form.append('content', content)
      if (image) form.append('image', image)

      const url = blogId ? `${API_HOST}/api/admin/blog/update/${blogId}` : `${API_HOST}/api/admin/blog/create`
      const method = blogId ? 'PATCH' : 'POST'

      const res = await fetch(url, {
        method,
        body: form,
        credentials: 'include'
      })

      let data = null
      const ct = res.headers.get('content-type') || ''
      if (ct.includes('application/json')) {
        data = await res.json()
      } else {
        const text = await res.text()
        try { data = text ? JSON.parse(text) : null } catch (err) { data = { message: text } }
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
        Cover image {blogId ? '(leave empty to keep existing)' : ''}
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
      </label>

      <div className="form-actions">
        <button type="button" className="btn btn-muted" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Saving...' : (blogId ? 'Update Blog' : 'Create Blog')}</button>
      </div>
    </form>
  )
}

export default BlogForm
