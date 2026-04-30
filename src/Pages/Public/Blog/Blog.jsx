import React from 'react'
import './Blog.scss'
import BlogCard from '../../../Components/Public/Cards/BlogCard/BlogCard'
import posts from '../../../data/blogData'

const Blog = () => {
  return (
    <section className="blog">
      <div className="blog-hero">
        <h1>Our Blog</h1>
        <p>Articles, stories and updates about our work.</p>
      </div>

      <div className="container blog-grid">
        {posts.map((post, index) => (
          <BlogCard key={post.id} post={post} index={index} />
        ))}
      </div>
    </section>
  )
}

export default Blog
