import React from 'react'
import { useParams, Link } from 'react-router-dom'
import './BlogDetails.scss'
import posts from '../../../data/blogData'

const BlogDetails = () => {
  const { id } = useParams()
  const post = posts.find((p) => p.id === id) || posts[0]

  return (
    <article className="blog-details">
      <div className="container">
        <header className="details-hero fade-up">
          <h1 className="details-title">{post.title}</h1>
          <p className="details-subtitle">{post.excerpt}</p>
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
