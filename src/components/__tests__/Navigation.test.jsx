import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navigation from '../Navigation';

const renderWithProviders = () => {
  return render(
    <BrowserRouter>
      <Navigation />
    </BrowserRouter>
  );
};

describe('Navigation Component', () => {
  test('renders all navigation links', () => {
    renderWithProviders();

    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/about/i)).toBeInTheDocument();
    expect(screen.getByText(/linkedin/i)).toBeInTheDocument();
    expect(screen.getByText(/contact/i)).toBeInTheDocument();
  });

  test('navigation links have correct href attributes', () => {
    renderWithProviders();

    expect(screen.getByText(/home/i).closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText(/^about$/i).closest('a')).toHaveAttribute('href', '/about');
    expect(screen.getByText(/linkedin/i).closest('a')).toHaveAttribute('href', 'https://www.linkedin.com/in/gurpreet-pannu-62990285/');
    expect(screen.getByText(/contact/i).closest('a')).toHaveAttribute('href', '/contact');
  });
});
