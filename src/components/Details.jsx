import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Logo from './Logo';

const Details = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data fetch
    setTimeout(() => {
      setPost({
        id: 1,
        title: "Sample Post",
        content: "This is a detailed view of the sample post content.",
        date: "March 20, 2025"
      });
      setLoading(false);
    }, 500);
  }, [slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <nav className='navbar'>
        <Logo />
        <div className="nav-links">
          <Link to='/about' className='nav-link'>About Me</Link>
          <a 
            href="https://www.linkedin.com/in/gurpreet-pannu-62990285/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className='nav-link'
          >
            LinkedIn
          </a>
          <Link to='/contact' className='nav-link'>Contact</Link>
        </div>
      </nav>
      <main className='main'>
        <article className="post-detail">
          <h1 className="post-title">{post?.title}</h1>
          <div className="post-meta">Posted on {post?.date}</div>
          <div className="post-content">{post?.content}</div>
          <div className="reactions">
            <button className="like-button">❤️ Like</button>
            <span className="like-count">0 likes</span>
          </div>
        </article>
      </main>
    </div>
  );
};

export default Details;
