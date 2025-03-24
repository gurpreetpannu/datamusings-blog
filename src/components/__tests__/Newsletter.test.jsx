import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Newsletter from '../Newsletter';

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
    render(<Newsletter />);
    
    expect(screen.getByText('Subscribe to My Newsletter')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByText('Subscribe')).toBeInTheDocument();
    expect(screen.getByText('Get the latest posts delivered straight to your inbox.')).toBeInTheDocument();
  });

  test('handles successful subscription', async () => {
    render(<Newsletter />);
    
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const form = screen.getByRole('form');
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    await act(async () => {
      fireEvent.submit(form);
    });
    
    await waitFor(() => {
      expect(screen.getByText('Thanks for subscribing! Please check your email to confirm.')).toBeInTheDocument();
    });
    
    expect(emailInput.value).toBe('');
  });

  test('handles subscription error', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Failed to subscribe' })
      })
    );
    
    render(<Newsletter />);
    
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const form = screen.getByRole('form');
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    await act(async () => {
      fireEvent.submit(form);
    });
    
    await waitFor(() => {
      expect(screen.getByText('Failed to subscribe')).toBeInTheDocument();
    });
  });

  test('handles network error', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.reject(new Error('Network error'))
    );
    
    render(<Newsletter />);
    
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const form = screen.getByRole('form');
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    await act(async () => {
      fireEvent.submit(form);
    });
    
    await waitFor(() => {
      expect(screen.getByText('Failed to subscribe. Please try again.')).toBeInTheDocument();
    });
  });

  test('validates email input', async () => {
    render(<Newsletter />);
    
    const emailInput = screen.getByPlaceholderText('Enter your email');
    const form = screen.getByRole('form');
    
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      fireEvent.submit(form);
    });
    
    // HTML5 validation will prevent the form from submitting with an invalid email
    expect(emailInput).toBeInvalid();
  });
}); 