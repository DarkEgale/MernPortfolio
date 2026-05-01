import React from "react";
import { Link } from "react-router-dom";
import "./BlogCard.scss";

const BlogCard = ({ post, index = 0 }) => {
  const delay = `${index * 80}ms`;
  return (
    <article className="blog-card fade-up" style={{ animationDelay: delay }}>
      <div className="thumb">
        <img src={post.image} alt={post.title} />
      </div>
      <div className="card-body">
        <h3 className="title">{post.title}</h3>
        <p className="excerpt">{post.excerpt || post.subtitle}</p>
        <div className="meta">
          <span
            className="date"
            style={{
              fontSize: "14px",
              color: "#9ca3af",
              fontFamily: "monospace",
              borderBottom: "1px solid #00d2ff",
              paddingBottom: "2px",
            }}
          >
            {post.date
              ? new Date(post.date.toString().split("T")[0]).toLocaleDateString(
                  "en-GB",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  },
                )
              : "No Date"}
          </span>
          <Link
            className="read-more"
            to={`/blog/${post._id || post.id}`}
            aria-label={`Read ${post.title}`}
          >
            Read more
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
