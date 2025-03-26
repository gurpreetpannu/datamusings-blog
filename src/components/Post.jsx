import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const Post = ({ post, onTagClick }) => {
  const { title, excerpt, date, slug, tags } = post;

  return (
    <article className="post-card">
      <div className="post-content">
        <h2>
          <Link to={`/post/${slug}`} className="post-title">
            {title}
          </Link>
        </h2>
        <p className="post-excerpt">{excerpt}</p>
        <div className="post-meta">
          <span className="post-date">{date}</span>
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
      </div>
    </article>
  );
};

export default Post;
