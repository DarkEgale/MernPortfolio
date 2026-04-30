import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import './BlogDetails.scss'

const BlogDetails = () => {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/public/blogs/${id}`)
        if (!res.ok) throw new Error('Failed to load post')
        const data = await res.json()
        if (mounted) setPost(data)
      } catch (err) {
        if (mounted) setError(err.message)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchPost()
    return () => { mounted = false }
  }, [id])

  if (loading) return <p className="container">Loading…</p>
  if (error) return <p className="container error">{error}</p>
  if (!post) return <p className="container">Post not found.</p>

  return (
    <article className="blog-details">
      <div className="container">
        <header className="details-hero fade-up">
          <h1 className="details-title">{post.title}</h1>
          <p className="details-subtitle">{post.excerpt || post.subtitle}</p>
          <div className="details-meta">
            <span className="date">{post.date}</span>
            <Link to="/blog" className="back-link">← Back to articles</Link>
          </div>
        </header>

        <section className="details-body fade-up">
          <figure className="hero-image">
            <img src={post.image} alt={post.title} />
          </figure>

          <div className="content">
            <p>{post.content}</p>
          </div>
        </section>
      </div>
    </article>
  )
}

export default BlogDetails
