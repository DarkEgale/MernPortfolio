import React from 'react'
import { Link } from 'react-router-dom'
import './BlogCard.scss'

const BlogCard = ({ post, index = 0 }) => {
  const delay = `${index * 80}ms`
  return (
    <article className="blog-card fade-up" style={{ animationDelay: delay }}>
      <div className="thumb">
        <img src={post.image} alt={post.title} />
      </div>
      <div className="card-body">
        <h3 className="title">{post.title}</h3>
        <p className="excerpt">{post.excerpt}</p>
        <div className="meta">
          <span className="date">{post.date}</span>
          <Link
            className="read-more"
            to={`/blog/${post.id}`}
            aria-label={`Read ${post.title}`}
          >
            Read more
          </Link>
        </div>
      </div>
    </article>
  )
}

export default BlogCard
