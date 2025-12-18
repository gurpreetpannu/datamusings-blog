import { render, screen } from '@testing-library/react';
import App from './App';

test('renders navigation and main container', () => {
  render(<App />);
  const navElement = screen.getByRole('navigation');
  expect(navElement).toBeInTheDocument();

  const homeLinks = screen.getAllByRole('link', { name: /home/i });
  expect(homeLinks.length).toBeGreaterThan(0);
});
