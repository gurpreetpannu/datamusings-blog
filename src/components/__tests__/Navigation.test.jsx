import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navigation from '../Navigation';

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Navigation Component', () => {
  test('renders all navigation links', () => {
    renderWithRouter(<Navigation />);
    
    // Check if all navigation links are present
    expect(screen.getByText(/about me/i)).toBeInTheDocument();
    expect(screen.getByText(/linkedin/i)).toBeInTheDocument();
    expect(screen.getByText(/contact/i)).toBeInTheDocument();
  });

  test('renders logo with correct link', () => {
    renderWithRouter(<Navigation />);
    
    const logoLink = screen.getByRole('link', { name: /blog logo/i });
    expect(logoLink).toHaveAttribute('href', '/');
  });

  test('mobile menu toggle works', () => {
    renderWithRouter(<Navigation />);
    
    // Get the menu button
    const menuButton = screen.getByRole('button', { name: /menu/i });
    
    // Click the menu button
    fireEvent.click(menuButton);
    
    // Check if mobile menu is visible
    expect(screen.getByRole('navigation')).toHaveClass('mobile-menu');
    
    // Click the menu button again
    fireEvent.click(menuButton);
    
    // Check if mobile menu is hidden
    expect(screen.getByRole('navigation')).not.toHaveClass('mobile-menu');
  });

  test('navigation links have correct href attributes', () => {
    renderWithRouter(<Navigation />);
    
    // Check if all links have correct href attributes
    expect(screen.getByText(/about me/i).closest('a')).toHaveAttribute('href', '/about');
    expect(screen.getByText(/linkedin/i).closest('a')).toHaveAttribute('href', 'https://www.linkedin.com/in/gurpreet-pannu-62990285/');
    expect(screen.getByText(/contact/i).closest('a')).toHaveAttribute('href', '/contact');
  });

  test('mobile menu closes when clicking outside', () => {
    renderWithRouter(<Navigation />);
    
    // Open mobile menu
    const menuButton = screen.getByRole('button', { name: /menu/i });
    fireEvent.click(menuButton);
    
    // Click outside the menu
    fireEvent.click(document.body);
    
    // Check if mobile menu is hidden
    expect(screen.getByRole('navigation')).not.toHaveClass('mobile-menu');
  });

  test('mobile menu closes when clicking a link', () => {
    renderWithRouter(<Navigation />);
    
    // Open mobile menu
    const menuButton = screen.getByRole('button', { name: /menu/i });
    fireEvent.click(menuButton);
    
    // Click a navigation link
    const aboutLink = screen.getByText(/about/i);
    fireEvent.click(aboutLink);
    
    // Check if mobile menu is hidden
    expect(screen.getByRole('navigation')).not.toHaveClass('mobile-menu');
  });

  test('LinkedIn link opens in new tab', () => {
    renderWithRouter(<Navigation />);
    
    const linkedInLink = screen.getByText(/linkedin/i).closest('a');
    expect(linkedInLink).toHaveAttribute('target', '_blank');
    expect(linkedInLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
}); 