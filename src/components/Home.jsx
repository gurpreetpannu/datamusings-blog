import React, { useState, useEffect, useCallback } from "react";
import { getAllPosts } from "../utils/posts";
import Newsletter from "./Newsletter";
import SEO from "./SEO";
import "../styles.css";
import Post from "./Post";

const Home = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedTags, setSuggestedTags] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [monthlyPosts, setMonthlyPosts] = useState({});

  // Memoize the unique tags extraction
  const extractUniqueTags = useCallback((posts) => {
    const tags = new Set();
    posts.forEach((post) => {
      post.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags);
  }, []);

  // Group posts by month
  const groupPostsByMonth = useCallback((posts) => {
    const groups = {};
    posts.forEach((post) => {
      const date = new Date(post.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (!groups[monthKey]) {
        groups[monthKey] = [];
      }
      groups[monthKey].push(post);
    });
    return groups;
  }, []);

  // Fetch posts and extract tags
  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await getAllPosts();
      setAllTags(extractUniqueTags(fetchedPosts));
      
      // Group posts by month
      const groupedPosts = groupPostsByMonth(fetchedPosts);
      setMonthlyPosts(groupedPosts);
      
      // Set the most recent month as selected
      const months = Object.keys(groupedPosts).sort().reverse();
      if (months.length > 0) {
        setSelectedMonth(months[0]);
      }
    };
    fetchPosts();
  }, [extractUniqueTags, groupPostsByMonth]);

  // Memoize tag suggestions
  const getSuggestedTags = useCallback(() => {
    if (!searchQuery) return [];
    const searchTerms = searchQuery.toLowerCase().split(' ');
    const lastTerm = searchTerms[searchTerms.length - 1];
    
    return allTags.filter((tag) => 
      !selectedTags.includes(tag) && 
      tag.toLowerCase().includes(lastTerm)
    );
  }, [allTags, searchQuery, selectedTags]);

  // Update suggested tags when search query changes
  useEffect(() => {
    setSuggestedTags(getSuggestedTags());
  }, [getSuggestedTags]);

  const handleTagClick = useCallback((tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
      setSearchQuery('');
      setSuggestedTags([]);
    }
  }, [selectedTags]);

  const handleTagRemove = useCallback((tagToRemove) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  }, [selectedTags]);

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const formatMonthLabel = (monthKey) => {
    const [year, month] = monthKey.split('-');
    return new Date(year, month - 1).toLocaleString('default', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="home-container">
      <div className="newsletter-wrapper">
        <Newsletter />
      </div>

      <div className="main-content">
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
            placeholder="Search posts or type to filter tags..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {selectedTags.length > 0 && (
            <div className="selected-tags">
              {selectedTags.map((tag) => (
                <span key={tag} className="selected-tag">
                  {tag}
                  <button onClick={() => handleTagRemove(tag)}>&times;</button>
                </span>
              ))}
            </div>
          )}
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

        <div className="monthly-tabs">
          {Object.keys(monthlyPosts)
            .sort()
            .reverse()
            .map((monthKey) => (
              <button
                key={monthKey}
                className={`month-tab ${selectedMonth === monthKey ? 'active' : ''}`}
                onClick={() => setSelectedMonth(monthKey)}
              >
                {formatMonthLabel(monthKey)}
              </button>
            ))}
        </div>

        <div className="posts-grid">
          {selectedMonth && monthlyPosts[selectedMonth]?.length > 0 ? (
            monthlyPosts[selectedMonth]
              .filter(post => {
                const matchesSearch = searchQuery === '' || 
                  post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
                const matchesTags = selectedTags.length === 0 || 
                  selectedTags.every(tag => post.tags.includes(tag));
                return matchesSearch && matchesTags;
              })
              .map((post) => (
                <Post key={post.slug} post={post} onTagClick={handleTagClick} />
              ))
          ) : (
            <div className="no-results">
              No posts found matching your search criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
