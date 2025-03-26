import React, { useState, useEffect } from "react";
import { getAllPosts } from "../utils/posts";
import Newsletter from "./Newsletter";
import SEO from "./SEO";
import "../styles.css";
import Post from "./Post";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedTags, setSuggestedTags] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const allPosts = await getAllPosts();
        setPosts(allPosts);
        setFilteredPosts(allPosts);
        
        // Extract all unique tags
        const tags = [...new Set(allPosts.flatMap(post => post.tags || []))];
        setAllTags(tags);
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  useEffect(() => {
    // Filter posts based on search query and selected tag
    let filtered = [...posts];
    
    if (searchQuery) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    if (selectedTag) {
      filtered = filtered.filter((post) =>
        post.tags.includes(selectedTag)
      );
    }

    setFilteredPosts(filtered);

    // Update suggested tags based on search query
    if (searchQuery) {
      const suggestions = allTags.filter((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestedTags(suggestions);
    } else {
      setSuggestedTags([]);
    }
  }, [searchQuery, selectedTag, posts, allTags]);

  const handleTagClick = (tag) => {
    setSelectedTag(selectedTag === tag ? null : tag);
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
      
      <div className="search-section">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        {suggestedTags.length > 0 && (
          <div className="suggested-tags">
            <p>Suggested tags:</p>
            <div className="tag-list">
              {suggestedTags.map((tag) => (
                <button
                  key={tag}
                  className="tag"
                  onClick={() => {
                    setSelectedTag(tag);
                    setSearchQuery("");
                    setSuggestedTags([]);
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <section className="posts-section">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <Post
              key={post.slug}
              post={post}
              onTagClick={handleTagClick}
            />
          ))
        ) : (
          <p className="no-posts">
            {searchQuery ? 'No posts found matching your search.' : 'No posts available.'}
          </p>
        )}
      </section>
      <Newsletter />
    </div>
  );
};

export default Home;
