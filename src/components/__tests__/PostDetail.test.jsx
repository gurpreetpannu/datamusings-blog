import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PostDetail from '../PostDetail';

// Mock the post data
const mockPost = {
  id: '1',
  title: 'Test Post',
  slug: 'test-post',
  excerpt: 'This is a test post excerpt',
  content: '<p>This is the main content of the test post.</p><h2>Subheading</h2><p>More content here.</p>',
  image: '/images/test.jpg',
  author: 'Test Author',
  date: '2024-03-22',
  readTime: '5 min read',
  category: 'Testing',
  tags: ['test', 'react'],
  seo: {
    title: 'Test Post - SEO Title',
    description: 'Test post description for SEO',
    keywords: ['test', 'react', 'blog'],
    ogImage: '/images/test.jpg',
    ogTitle: 'Test Post - Social Title',
    ogDescription: 'Test post description for social media'
  }
};

// Mock the useEffect hook
jest.spyOn(React, 'useEffect').mockImplementation((f) => f());

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockPost)
  })
);

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      <Routes>
        <Route path="/post/:slug" element={component} />
      </Routes>
    </BrowserRouter>
  );
};

describe('PostDetail Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    
    // Mock useState for post and comments
    jest.spyOn(React, 'useState').mockImplementation((initial) => {
      if (initial === null) return [mockPost, jest.fn()];
      if (Array.isArray(initial)) return [initial, jest.fn()];
      return [initial, jest.fn()];
    });
  });

  test('renders post content correctly', async () => {
    renderWithRouter(<PostDetail />);
    
    // Wait for the post to load
    await waitFor(() => {
      expect(screen.getByText('Test Post')).toBeInTheDocument();
      expect(screen.getByText('This is the main content of the test post.')).toBeInTheDocument();
      expect(screen.getByText('Subheading')).toBeInTheDocument();
      expect(screen.getByText('More content here.')).toBeInTheDocument();
    });
  });

  test('displays post metadata correctly', async () => {
    renderWithRouter(<PostDetail />);
    
    await waitFor(() => {
      expect(screen.getByText('Test Author')).toBeInTheDocument();
      expect(screen.getByText('5 min read')).toBeInTheDocument();
      expect(screen.getByText('Testing')).toBeInTheDocument();
      expect(screen.getByText('test')).toBeInTheDocument();
      expect(screen.getByText('react')).toBeInTheDocument();
    });
  });

  test('renders post image with correct attributes', async () => {
    renderWithRouter(<PostDetail />);
    
    await waitFor(() => {
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', '/images/test.jpg');
      expect(image).toHaveAttribute('alt', 'Test Post');
    });
  });

  test('handles comment submission', async () => {
    renderWithRouter(<PostDetail />);
    
    // Wait for the post to load
    await waitFor(() => {
      expect(screen.getByText('Test Post')).toBeInTheDocument();
    });
    
    // Get the comment input and submit button
    const commentInput = screen.getByPlaceholderText(/write a comment/i);
    const submitButton = screen.getByText(/post comment/i);
    
    // Type a comment and submit
    fireEvent.change(commentInput, { target: { value: 'Test comment' } });
    fireEvent.click(submitButton);
    
    // Check if the comment appears
    expect(screen.getByText('Test comment')).toBeInTheDocument();
  });

  test('displays loading state', () => {
    renderWithRouter(<PostDetail />);
    
    // Check if loading state is shown initially
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('handles error state', async () => {
    // Mock fetch to return an error
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404
      })
    );
    
    renderWithRouter(<PostDetail />);
    
    await waitFor(() => {
      expect(screen.getByText(/error loading post/i)).toBeInTheDocument();
    });
  });

  test('renders newsletter section', async () => {
    renderWithRouter(<PostDetail />);
    
    await waitFor(() => {
      expect(screen.getByText(/subscribe to my newsletter/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
      expect(screen.getByText(/subscribe/i)).toBeInTheDocument();
    });
  });
}); 