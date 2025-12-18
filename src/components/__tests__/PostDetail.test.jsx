import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import PostDetail from '../PostDetail';
import { ThemeProvider } from '../../context/ThemeContext';
import * as postsUtils from '../../utils/posts';

// Mock the posts utility
jest.mock('../../utils/posts');

const mockPost = {
  id: '1',
  title: 'Test Post',
  slug: 'test-post',
  excerpt: 'This is a test post excerpt',
  content: '<p>This is the main content of the test post.</p><h2>Subheading</h2><p>More content here.</p>',
  image: '/images/test.jpg',
  author: 'Test Author',
  date: '22/03/2024',
  readTime: '5',
  category: 'Testing',
  tags: ['test', 'react']
};

const renderWithProviders = (slug = 'test-post') => {
  return render(
    <HelmetProvider>
      <ThemeProvider>
        <MemoryRouter initialEntries={[`/post/${slug}`]}>
          <Routes>
            <Route path="/post/:slug" element={<PostDetail />} />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
};

describe('PostDetail Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    postsUtils.getPostBySlug.mockResolvedValue(mockPost);
  });

  test('renders post content correctly', async () => {
    renderWithProviders();

    await waitFor(() => {
      expect(screen.getByText('Test Post')).toBeInTheDocument();
      expect(screen.getByText('Test Author')).toBeInTheDocument();
      expect(screen.getByText(/5 min read/i)).toBeInTheDocument();
    });
  });

  test('handles comment submission', async () => {
    renderWithProviders();

    await waitFor(() => {
      expect(screen.getByText('Test Post')).toBeInTheDocument();
    });

    const nameInput = screen.getByPlaceholderText(/your name/i);
    const commentInput = screen.getByPlaceholderText(/your comment/i);
    const submitButton = screen.getByText(/post comment/i);

    fireEvent.change(nameInput, { target: { value: 'User' } });
    fireEvent.change(commentInput, { target: { value: 'Test comment' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Test comment')).toBeInTheDocument();
      expect(screen.getByText('User')).toBeInTheDocument();
    });
  });
});
