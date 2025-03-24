import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const Post = ({ post }) => {
  return (
    <article className="post">
      <div className="post-content">
        <Link to={`/post/${post.slug}`} className="post-title">
          {post.title}
        </Link>
        <p className="post-excerpt">
          {post.excerpt || post.content.substring(0, 150)}...
        </p>
        <div className="post-meta">
          <span>{post.author || 'By Author'}</span>
          <span>•</span>
          <span>{post.readTime || '5 min read'}</span>
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="post-tags">
            {post.tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        )}
      </div>
      {post.image && (
        <img 
          src={post.image} 
          alt={post.title} 
          className="post-image"
        />
      )}
    </article>
  );
};

export default Post;
