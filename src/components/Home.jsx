import React, { useState, useEffect, useCallback } from "react";
import { getAllPostsGroupedByMonth } from "../utils/posts";
import SEO from "./SEO";
import "../styles.css";
import Post from "./Post";

const Home = () => {

  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
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

  const handleMonthClick = (monthKey) => {
    setSelectedMonth(monthKey === selectedMonth ? "" : monthKey);
  };

  const clearFilters = () => {
    setSelectedMonth("");
    setSelectedTags([]);
    setSearchQuery("");
  };

  const formatMonthLabel = (monthKey) => {
    const date = new Date(monthKey);
    return date.toLocaleString("en-GB", { month: "long", year: "numeric" });
  };

  const sortedMonths = Object.keys(monthlyPosts).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  // Filter posts by selected month and tags
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

  const hasActiveFilters = selectedMonth || selectedTags.length > 0;

  return (
    <div className="home-outer-wrapper">
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

      {/* Search */}
      <div className="search-section">
        <input
          type="text"
          className="search-input"
          placeholder="Search posts..."
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

      {/* Filter Chips */}
      {(sortedMonths.length > 0 || allTags.size > 0) && (
        <div className="filter-group">
          <div className="all-tags">
            {sortedMonths.map((monthKey) => (
              <button
                key={monthKey}
                className={monthKey === selectedMonth ? "tag active" : "tag"}
                onClick={() => handleMonthClick(monthKey)}
              >
                {formatMonthLabel(monthKey)}
              </button>
            ))}
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
            {hasActiveFilters && (
              <button onClick={clearFilters} className="clear-filters" style={{ padding: '0.2rem 0.6rem', fontSize: '0.78rem' }}>
                ✕ Clear
              </button>
            )}
          </div>
        </div>
      )}

      {/* Posts */}
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
  );
};

export default Home;
