import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllPosts, searchPosts } from "../utils/posts";
import Newsletter from "./Newsletter";
import SEO from "./SEO";
import "../styles.css";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const allPosts = await getAllPosts();
        setPosts(allPosts);
        setFilteredPosts(allPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setFilteredPosts(posts);
      return;
    }

    try {
      const results = await searchPosts(searchTerm);
      setFilteredPosts(results);
    } catch (error) {
      console.error('Error searching posts:', error);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading posts...</div>;
  }

  return (
    <div className="home">
      <SEO post={{
        title: "Data Musings - Gurpreet Pannu",
        excerpt: "Thoughts on data science, technology, and programming",
        seo: {
          title: "Data Musings - Gurpreet Pannu's Blog",
          description: "Explore articles about data science, technology, programming, and software development.",
          keywords: ["data science", "technology", "programming", "software development", "AI"],
          ogTitle: "Data Musings - Gurpreet Pannu's Blog",
          ogDescription: "Explore articles about data science, technology, programming, and software development.",
          ogImage: "/images/logo.svg",
          canonicalUrl: "https://datamusings.blog"
        }
      }} />
      
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search posts..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      
      <section className="posts-section">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <article key={post.id} className="post">
              <div className="post-content">
                <h2 className="post-title">
                  <Link to={`/post/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="post-excerpt">{post.excerpt}</p>
                <div className="post-meta">
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                {post.tags && (
                  <div className="post-tags">
                    {post.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))
        ) : (
          <p className="no-posts">
            {searchTerm ? 'No posts found matching your search.' : 'No posts available.'}
          </p>
        )}
      </section>
      <Newsletter />
    </div>
  );
};

export default Home;
