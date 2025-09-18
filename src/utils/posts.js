// Import all posts directly
import { post as cursorPost, calculateReadTime as cursorCalculateReadTime } from '../posts/building-with-cursor.jsx';
import { post as dinoPost, calculateReadTime as dinoCalculateReadTime } from '../posts/dino-v3.jsx';
import { post as chatPost, calculateReadTime as chatCalculateReadTime } from '../posts/ChatGPT.jsx';

// Function to get all posts
export async function getAllPosts() {
  // For now, we'll return our posts array directly
  const posts = [cursorPost, dinoPost, chatPost].map(post => ({
    ...post,
    readTime: post === cursorPost
      ? cursorCalculateReadTime(post.content)
      : post === dinoPost
        ? dinoCalculateReadTime(post.content)
        : chatCalculateReadTime(post.content)
  }));

  // Sort posts by date (newest first)
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Function to group posts by month
function groupPostsByMonth(posts) {
  const grouped = {};
  posts.forEach(post => {
    const date = new Date(post.date.split('/').reverse().join('-')); // Parse date string
    const year = date.getFullYear();
    const month = date.getMonth(); // Month is 0-indexed
    const monthKey = new Date(year, month, 1).toISOString(); // Create a valid date string
    if (!grouped[monthKey]) {
      grouped[monthKey] = [];
    }
    grouped[monthKey].push(post);
  });
  return grouped;
}

// Function to get all posts grouped by month
export async function getAllPostsGroupedByMonth() {
  const posts = await getAllPosts();
  const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  return groupPostsByMonth(sortedPosts);
}

// Function to get a single post by slug
export async function getPostBySlug(slug) {
  const posts = await getAllPosts();
  return posts.find(post => post.slug === slug);
}

// Function to get posts by tag
export async function getPostsByTag(tag) {
  const posts = await getAllPosts();
  return posts.filter(post => post.tags.includes(tag));
}

// Function to get posts by category
export async function getPostsByCategory(category) {
  const posts = await getAllPosts();
  return posts.filter(post => post.category === category);
}

// Function to search posts
export async function searchPosts(query) {
  const posts = await getAllPosts();
  const searchTerm = query.toLowerCase();
  
  return posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm) ||
    post.excerpt.toLowerCase().includes(searchTerm) ||
    post.content.toLowerCase().includes(searchTerm) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
    post.category.toLowerCase().includes(searchTerm)
  );
} 