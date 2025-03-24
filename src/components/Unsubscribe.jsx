import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import '../styles.css';

const Unsubscribe = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const email = searchParams.get('email');

  useEffect(() => {
    const handleUnsubscribe = async () => {
      if (!email) {
        setStatus('error');
        setError('No email address provided.');
        return;
      }

      try {
        const response = await fetch('/.netlify/functions/newsletter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            email,
            action: 'unsubscribe'
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setStatus('success');
        } else {
          setStatus('error');
          setError(data.message || 'Failed to unsubscribe');
        }
      } catch (error) {
        setStatus('error');
        setError('Failed to unsubscribe. Please try again.');
      }
    };

    handleUnsubscribe();
  }, [email]);

  return (
    <div className="unsubscribe-container">
      <div className="unsubscribe-content">
        {status === 'success' ? (
          <>
            <h2>Successfully Unsubscribed</h2>
            <p>You have been successfully unsubscribed from our newsletter.</p>
            <p>If you change your mind, you can always subscribe again by visiting our website.</p>
          </>
        ) : status === 'error' ? (
          <>
            <h2>Error</h2>
            <p className="error-message">{error}</p>
          </>
        ) : (
          <h2>Processing your request...</h2>
        )}
      </div>
    </div>
  );
};

export default Unsubscribe; 