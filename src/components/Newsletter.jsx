import React, { useState } from 'react';
import '../styles.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('');
    setError('');

    try {
      console.log('Submitting newsletter subscription for:', email);
      const response = await fetch('/.netlify/functions/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email,
          action: 'subscribe'
        }),
      });

      const data = await response.json();
      console.log('Newsletter subscription response:', data);

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
        setError(data.message || data.error || 'Failed to subscribe. Please try again.');
        console.error('Subscription error:', data);
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setStatus('error');
      setError('Failed to subscribe. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="newsletter-container">
      <div className="newsletter-content">
        <h2>Subscribe to My Newsletter</h2>
        <p className="newsletter-description">
          Get the latest posts delivered straight to your inbox.
        </p>
        <form onSubmit={handleSubmit} className="newsletter-form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="newsletter-input"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="newsletter-button"
            disabled={isLoading}
          >
            {isLoading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
        {status === 'success' && (
          <p className="newsletter-success">
            Thanks for subscribing! Please check your email to confirm your subscription.
          </p>
        )}
        {status === 'error' && (
          <p className="newsletter-error">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default Newsletter; 