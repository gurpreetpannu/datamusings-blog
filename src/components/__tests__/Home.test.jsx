import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Home from '../Home';
import { ThemeProvider } from '../../context/ThemeContext';
import * as postsUtils from '../../utils/posts';

// Mock the posts utility
jest.mock('../../utils/posts');

const mockGroupedPosts = {
  'March 2024': [
    {
      id: '1',
      title: 'Test Post 1',
      slug: 'test-post-1',
      excerpt: 'This is a test post excerpt',
      image: '/images/test1.jpg',
      author: 'Test Author',
      date: '22/03/2024',
      readTime: '5',
      category: 'Testing',
      tags: ['test', 'react']
    },
    {
      id: '2',
      title: 'Test Post 2',
      slug: 'test-post-2',
      excerpt: 'This is another test post excerpt',
      image: '/images/test2.jpg',
      author: 'Test Author',
      date: '21/03/2024',
      readTime: '3',
      category: 'Testing',
      tags: ['test', 'javascript']
    }
  ]
};

const renderWithProviders = () => {
  return render(
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
};

describe('Home Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    postsUtils.getAllPostsGroupedByMonth.mockResolvedValue(mockGroupedPosts);
  });

  test('renders all posts', async () => {
    renderWithProviders();

    await waitFor(() => {
      expect(screen.getByText('Test Post 1')).toBeInTheDocument();
      expect(screen.getByText('Test Post 2')).toBeInTheDocument();
    });
  });

  test('tag filter functionality works', async () => {
    renderWithProviders();

    await waitFor(() => {
      expect(screen.getByText('Test Post 1')).toBeInTheDocument();
      expect(screen.getByText('Test Post 2')).toBeInTheDocument();
    });

    // Click the 'react' tag button in the sidepane to filter
    const reactTagButton = screen.getAllByRole('button', { name: /react/i })[0];
    fireEvent.click(reactTagButton);

    await waitFor(() => {
      expect(screen.getByText('Test Post 1')).toBeInTheDocument();
      expect(screen.queryByText('Test Post 2')).not.toBeInTheDocument();
    });
  });
});
