import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../Home';

// Mock the posts data
const mockPosts = [
  {
    id: '1',
    title: 'Test Post 1',
    slug: 'test-post-1',
    excerpt: 'This is a test post excerpt',
    image: '/images/test1.jpg',
    author: 'Test Author',
    date: '2024-03-22',
    readTime: '5 min read',
    category: 'Testing',
    tags: ['test', 'react'],
    seo: {
      title: 'Test Post 1 - SEO Title',
      description: 'Test post description for SEO',
      keywords: ['test', 'react', 'blog'],
      ogImage: '/images/test1.jpg',
      ogTitle: 'Test Post 1 - Social Title',
      ogDescription: 'Test post description for social media'
    }
  },
  {
    id: '2',
    title: 'Test Post 2',
    slug: 'test-post-2',
    excerpt: 'This is another test post excerpt',
    image: '/images/test2.jpg',
    author: 'Test Author',
    date: '2024-03-21',
    readTime: '3 min read',
    category: 'Testing',
    tags: ['test', 'javascript'],
    seo: {
      title: 'Test Post 2 - SEO Title',
      description: 'Another test post description for SEO',
      keywords: ['test', 'javascript', 'blog'],
      ogImage: '/images/test2.jpg',
      ogTitle: 'Test Post 2 - Social Title',
      ogDescription: 'Another test post description for social media'
    }
  }
];

// Mock the useEffect hook
jest.spyOn(React, 'useEffect').mockImplementation((f) => f());

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Home Component', () => {
  beforeEach(() => {
    // Reset the posts state before each test
    jest.spyOn(React, 'useState').mockImplementation((initial) => {
      if (initial === []) return [mockPosts, jest.fn()];
      return [initial, jest.fn()];
    });
  });

  test('renders all posts', () => {
    renderWithRouter(<Home />);
    
    // Check if all posts are rendered
    expect(screen.getByText('Test Post 1')).toBeInTheDocument();
    expect(screen.getByText('Test Post 2')).toBeInTheDocument();
    
    // Check if excerpts are rendered
    expect(screen.getByText('This is a test post excerpt')).toBeInTheDocument();
    expect(screen.getByText('This is another test post excerpt')).toBeInTheDocument();
  });

  test('search functionality filters posts', () => {
    renderWithRouter(<Home />);
    
    // Get the search input
    const searchInput = screen.getByPlaceholderText(/search posts/i);
    
    // Type "javascript" in the search box
    fireEvent.change(searchInput, { target: { value: 'javascript' } });
    
    // Check if only the post with "javascript" tag is shown
    expect(screen.getByText('Test Post 2')).toBeInTheDocument();
    expect(screen.queryByText('Test Post 1')).not.toBeInTheDocument();
  });

  test('post links are working', () => {
    renderWithRouter(<Home />);
    
    // Check if post links are rendered with correct href
    const post1Link = screen.getByText('Test Post 1').closest('a');
    expect(post1Link).toHaveAttribute('href', '/post/test-post-1');
    
    const post2Link = screen.getByText('Test Post 2').closest('a');
    expect(post2Link).toHaveAttribute('href', '/post/test-post-2');
  });

  test('post images are rendered with correct attributes', () => {
    renderWithRouter(<Home />);
    
    // Check if images are rendered with correct src and alt
    const images = screen.getAllByRole('img');
    expect(images[0]).toHaveAttribute('src', '/images/test1.jpg');
    expect(images[0]).toHaveAttribute('alt', 'Test Post 1');
    
    expect(images[1]).toHaveAttribute('src', '/images/test2.jpg');
    expect(images[1]).toHaveAttribute('alt', 'Test Post 2');
  });

  test('post metadata is displayed correctly', () => {
    renderWithRouter(<Home />);
    
    // Check if post metadata is rendered
    expect(screen.getByText('Test Author')).toBeInTheDocument();
    expect(screen.getByText('5 min read')).toBeInTheDocument();
    expect(screen.getByText('3 min read')).toBeInTheDocument();
    expect(screen.getByText('Testing')).toBeInTheDocument();
  });
}); 