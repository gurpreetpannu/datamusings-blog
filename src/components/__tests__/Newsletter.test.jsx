import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Newsletter from '../Newsletter';
import { ThemeProvider } from '../../context/ThemeContext';

const renderWithProviders = () => {
  return render(
    <ThemeProvider>
      <Newsletter />
    </ThemeProvider>
  );
};

describe('Newsletter Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Thanks for subscribing!' })
      })
    );
  });

  test('renders newsletter form', () => {
    renderWithProviders();

    expect(screen.getByText(/subscribe to the newsletter/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument();
    expect(screen.getByText(/get weekly updates/i)).toBeInTheDocument();
  });

  test('handles successful subscription', async () => {
    renderWithProviders();

    const emailInput = screen.getByPlaceholderText(/enter your email/i);
    const submitButton = screen.getByRole('button', { name: /subscribe/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/thank you for subscribing/i)).toBeInTheDocument();
    });
  });
});
