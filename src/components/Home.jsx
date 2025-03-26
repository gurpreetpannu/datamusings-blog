import React, { useState, useEffect, useCallback, useMemo } from "react";
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

  // Memoize the unique tags extraction
  const extractUniqueTags = useCallback((posts) => {
    const tags = new Set();
    posts.forEach((post) => {
      post.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags);
  }, []);

  // Fetch posts and extract tags
  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await getAllPosts();
      setPosts(fetchedPosts);
      setAllTags(extractUniqueTags(fetchedPosts));
    };
    fetchPosts();
  }, [extractUniqueTags]);

  // Memoize filtered posts
  const getFilteredPosts = useCallback(() => {
    return posts.filter((post) => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = !selectedTag || post.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [posts, searchQuery, selectedTag]);

  // Update filtered posts when dependencies change
  useEffect(() => {
    setFilteredPosts(getFilteredPosts());
  }, [getFilteredPosts]);

  // Memoize tag suggestions
  const getSuggestedTags = useCallback(() => {
    if (!searchQuery) return [];
    return allTags.filter((tag) =>
      tag.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allTags, searchQuery]);

  // Update suggested tags when search query changes
  useEffect(() => {
    setSuggestedTags(getSuggestedTags());
  }, [getSuggestedTags]);

  const handleTagClick = useCallback((tag) => {
    setSelectedTag(tag === selectedTag ? null : tag);
  }, [selectedTag]);

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  return (
    <div className="home-container">
      <SEO post={{
        title: "Data Musings - A Blog About Data Science and Technology",
        excerpt: "Explore insights about data science, machine learning, and technology through in-depth articles and tutorials.",
        seo: {
          title: "Data Musings - A Blog About Data Science and Technology",
          description: "Explore insights about data science, machine learning, and technology through in-depth articles and tutorials.",
          keywords: ["data science", "machine learning", "technology", "blog", "tutorials"],
          ogTitle: "Data Musings - A Blog About Data Science and Technology",
          ogDescription: "Explore insights about data science, machine learning, and technology through in-depth articles and tutorials.",
          ogImage: "/images/home-og.jpg",
          canonicalUrl: "https://datamusings.blog"
        }
      }} />

      <div className="search-section">
        <input
          type="text"
          className="search-input"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {suggestedTags.length > 0 && (
          <div className="suggested-tags">
            {suggestedTags.map((tag) => (
              <button
                key={tag}
                className="tag"
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="posts-grid">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Post key={post.slug} post={post} onTagClick={handleTagClick} />
          ))
        ) : (
          <div className="no-results">
            No posts found matching your search criteria.
          </div>
        )}
      </div>

      <Newsletter />
    </div>
  );
};

export default Home;
