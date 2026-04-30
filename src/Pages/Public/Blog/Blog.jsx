import React, { useEffect, useState } from 'react'
import './Blog.scss'
import BlogCard from '../../../Components/Public/Cards/BlogCard/BlogCard'

const Blog = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/public/blogs')
        if (!res.ok) throw new Error('Failed to load posts')
        const data = await res.json()
        if (mounted) setPosts(data)
      } catch (err) {
        if (mounted) setError(err.message)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchPosts()
    return () => { mounted = false }
  }, [])

  return (
    <section className="blog">
      <div className="blog-hero">
        <h1>Our Blog</h1>
        <p>Articles, stories and updates about our work.</p>
      </div>

      <div className="container blog-grid">
        {loading && <p>Loading posts…</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && posts.length === 0 && <p>No posts found.</p>}
        {!loading && !error && posts.map((post, index) => (
          <BlogCard key={post._id || post.id} post={post} index={index} />
        ))}
      </div>
    </section>
  )
}

export default Blog
