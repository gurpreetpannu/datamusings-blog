// Import all posts directly
import { post as cursorPost } from '../posts/building-with-cursor.jsx';
import { post as dinoPost } from '../posts/dino-v3.jsx';
import { post as chatPost } from '../posts/ChatGPT.jsx';

// Function to get all posts
export async function getAllPosts() {
  // For now, we'll return our posts array directly
  const posts = [cursorPost, dinoPost, chatPost];

  // Sort posts by date (newest first)
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
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