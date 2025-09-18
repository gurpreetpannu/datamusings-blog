import React, { memo } from "react";
import { Link } from "react-router-dom";
import "../styles.css";

const Post = memo(({ post, onTagClick }) => {
  const { title, excerpt, date, slug, tags } = post;

  return (
    <article className="post-card">
      <Link to={`/post/${slug}`} className="post-link">
        <h2 className="post-title">{title}</h2>
      </Link>
      <p className="post-excerpt">{excerpt}</p>
      <div className="post-meta">
        <span className="post-date">{date} • {post.readTime} min read</span>
        <div className="post-tags">
          {tags.map((tag) => (
            <button
              key={tag}
              className="tag"
              onClick={() => onTagClick(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </article>
  );
});

Post.displayName = "Post";

export default Post;
