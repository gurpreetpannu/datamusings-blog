import React, { useState, useEffect, useCallback } from "react";
import { getAllPostsGroupedByMonth } from "../utils/posts";
import SEO from "./SEO";
import "../styles.css";
import Post from "./Post";

const Home = () => {

  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(""); // NEW: selected month
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedTags, setSuggestedTags] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [monthlyPosts, setMonthlyPosts] = useState({});

  // Fetch posts and extract tags
  useEffect(() => {
    const fetchPosts = async () => {
      const groupedPosts = await getAllPostsGroupedByMonth();
      setMonthlyPosts(groupedPosts);
      setAllTags(
        Object.values(groupedPosts)
          .flat()
          .reduce((acc, post) => {
            post.tags.forEach((tag) => acc.add(tag));
            return acc;
          }, new Set())
      );
    };
    fetchPosts();
  }, []);

  // Memoize tag suggestions
  const getSuggestedTags = useCallback(() => {
    if (!searchQuery) return [];
    const searchTerms = searchQuery.toLowerCase().split(" ");
    const lastTerm = searchTerms[searchTerms.length - 1];

    return Array.from(allTags).filter(
      (tag) =>
        !selectedTags.includes(tag) && tag.toLowerCase().includes(lastTerm)
    );
  }, [allTags, searchQuery, selectedTags]);

  // Update suggested tags when search query changes
  useEffect(() => {
    setSuggestedTags(getSuggestedTags());
  }, [getSuggestedTags]);

  const handleTagClick = useCallback(
    (tag) => {
      if (!selectedTags.includes(tag)) {
        setSelectedTags([...selectedTags, tag]);
        setSearchQuery("");
        setSuggestedTags([]);
      }
    },
    [selectedTags]
  );

  const handleTagRemove = useCallback(
    (tagToRemove) => {
      setSelectedTags(selectedTags.filter((tag) => tag !== tagToRemove));
    },
    [selectedTags]
  );

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  // NEW: handle month click
  const handleMonthClick = (monthKey) => {
    setSelectedMonth(monthKey === selectedMonth ? "" : monthKey);
  };

  // NEW: clear all filters
  const clearFilters = () => {
    setSelectedMonth("");
    setSelectedTags([]);
    setSearchQuery("");
  };

  const formatMonthLabel = (monthKey) => {
    const date = new Date(monthKey);
    return date.toLocaleString("en-GB", { month: "long", year: "numeric" });
  };

  // NEW: get sorted months for sidepane
  const sortedMonths = Object.keys(monthlyPosts).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  // NEW: filter posts by selected month and tags
  const filteredMonthlyPosts = {};
  Object.entries(monthlyPosts).forEach(([monthKey, posts]) => {
    if (selectedMonth && monthKey !== selectedMonth) return;
    const filteredPosts = posts
      .filter((post) => {
        const matchesTags =
          selectedTags.length === 0 ||
          selectedTags.every((tag) => post.tags.includes(tag));
        const matchesSearch =
          searchQuery === "" ||
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTags && matchesSearch;
      })
      .sort((a, b) => {
        const dateA = new Date(a.date.split("/").reverse().join("-"));
        const dateB = new Date(b.date.split("/").reverse().join("-"));
        return dateB - dateA;
      });
    if (filteredPosts.length > 0) {
      filteredMonthlyPosts[monthKey] = filteredPosts;
    }
  });

  return (
    <div className="home-outer-wrapper">
      {/* Main content */}
      <div className="main-content">
        <SEO
          post={{
            title: "Data Musings - A Blog About Data Science and Technology",
            excerpt:
              "Explore insights about data science, machine learning, and technology through in-depth articles and tutorials.",
            seo: {
              title: "Data Musings - A Blog About Data Science and Technology",
              description:
                "Explore insights about data science, machine learning, and technology through in-depth articles and tutorials.",
              keywords: [
                "data science",
                "machine learning",
                "technology",
                "blog",
                "tutorials",
              ],
              ogTitle: "Data Musings - A Blog About Data Science and Technology",
              ogDescription:
                "Explore insights about data science, machine learning, and technology through in-depth articles and tutorials.",
              ogImage: "/images/home-og.jpg",
              canonicalUrl: "https://datamusings.blog",
            },
          }}
        />

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

        <div className="monthly-posts">
          {Object.entries(filteredMonthlyPosts).map(([monthKey, posts]) => (
            <div key={monthKey} className="month-section">
              <h3>{formatMonthLabel(monthKey)}</h3>
              <div className="posts-grid">
                {posts.map((post) => (
                  <Post
                    key={post.slug}
                    post={post}
                    onTagClick={handleTagClick}
                  />
                ))}
              </div>
            </div>
          ))}
          {Object.keys(filteredMonthlyPosts).length === 0 && (
            <div className="no-posts-found">
              No posts found for the selected filters.
            </div>
          )}
        </div>
      </div>

      {/* Sidepane */}
      <aside className="sidepane">
        <div className="filter-group">
          <h4>Filter by Month</h4>
          <ul className="month-list">
            {sortedMonths.map((monthKey) => (
              <li key={monthKey}>
                <button
                  className={monthKey === selectedMonth ? "active" : ""}
                  onClick={() => handleMonthClick(monthKey)}
                >
                  {formatMonthLabel(monthKey)}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="filter-group">
          <h4>Filter by Tag</h4>
          <div className="all-tags">
            {Array.from(allTags)
              .sort()
              .map((tag) => (
                <button
                  key={tag}
                  className={selectedTags.includes(tag) ? "tag active" : "tag"}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </button>
              ))}
          </div>
        </div>
        {(selectedMonth || selectedTags.length > 0) && (
          <button onClick={clearFilters} className="clear-filters">
            Clear Filters
          </button>
        )}
      </aside>
    </div>
  );
};

export default Home;
