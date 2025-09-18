import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPostBySlug } from '../utils/posts';
import SEO from './SEO';
import Newsletter from './Newsletter';
import '../styles.css';

const PostDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: '', comment: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commentError, setCommentError] = useState('');

  useEffect(() => {
    const loadPost = async () => {
      try {
        const postData = await getPostBySlug(slug);
        if (postData) {
          setPost(postData);
          // Load comments from localStorage
          const storedComments = localStorage.getItem(`comments-${slug}`);
          if (storedComments) {
            setComments(JSON.parse(storedComments));
          }
        }
      } catch (error) {
        console.error('Error loading post:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setNewComment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setCommentError('');

    try {
      // Validate comment
      if (!newComment.name.trim() || !newComment.comment.trim()) {
        throw new Error('Please fill in all fields');
      }

      const commentToAdd = {
        id: Date.now(),
        ...newComment,
        date: new Date().toISOString(),
      };

      // Add new comment to state
      const updatedComments = [...comments, commentToAdd];
      setComments(updatedComments);

      // Store in localStorage
      localStorage.setItem(`comments-${slug}`, JSON.stringify(updatedComments));

      // Reset form
      setNewComment({ name: '', comment: '' });
      setCommentError('');
    } catch (error) {
      setCommentError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (!post) {
    return <div className="error-message">Post not found</div>;
  }

  return (
    <div className="post-detail">
      <SEO post={post} />
      
      <article className="full-post">
        <h1 className="post-title">{post.title}</h1>
        <div className="post-meta">
          <span>{post.author}</span>
          <span> </span>
          <span>{post.date}</span>
          <span> </span>
          <span>{post.readTime} min read</span>
        </div>
        
        {post.image && (
          <img 
            src={post.image} 
            alt={post.title} 
            className="post-detail-image"
          />
        )}
        
        <div 
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      <section className="comments-section">
        <h2>Comments</h2>
        
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={newComment.name}
              onChange={handleCommentChange}
              placeholder="Your Name"
              required
              disabled={isSubmitting}
              className="comment-input"
            />
          </div>
          <div className="form-group">
            <textarea
              name="comment"
              value={newComment.comment}
              onChange={handleCommentChange}
              placeholder="Your Comment"
              required
              disabled={isSubmitting}
              className="comment-textarea"
            />
          </div>
          {commentError && (
            <p className="comment-error">{commentError}</p>
          )}
          <button 
            type="submit" 
            className="comment-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </button>
        </form>

        <div className="comments-list">
          {comments.length > 0 ? (
            comments.map(comment => (
              <div key={comment.id} className="comment">
                <div className="comment-header">
                  <strong>{comment.name}</strong>
                  <span className="comment-date">
                    {new Date(comment.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="comment-text">{comment.comment}</p>
              </div>
            ))
          ) : (
            <p className="no-comments">No comments yet. Be the first to comment!</p>
          )}
        </div>
      </section>

      <div className="newsletter-section">
        <Newsletter />
      </div>
    </div>
  );
};

export default PostDetail; 