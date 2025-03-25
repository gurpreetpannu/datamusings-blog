import React, { useState } from 'react';
import '../styles.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('');

    try {
      const response = await fetch('/.netlify/functions/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        const error = await response.json();
        console.error('Subscription error:', error);
        setStatus('error');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="newsletter-container">
      <h3>Subscribe to the Newsletter</h3>
      <p>Get weekly updates on new posts and data science insights!</p>
      
      <form onSubmit={handleSubmit} className="newsletter-form">
        <div className="form-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            disabled={isSubmitting}
          />
        </div>
        
        {status === 'success' && (
          <p className="success-message">
            Thank you for subscribing! You&apos;ll receive our weekly digest every Sunday.
          </p>
        )}
        {status === 'error' && (
          <p className="error-message">
            Sorry, there was an error subscribing. Please try again.
          </p>
        )}

        <button
          type="submit"
          className="subscribe-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
    </div>
  );
};

export default Newsletter; 