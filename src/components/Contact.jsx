import React, { useState } from 'react';
import SEO from './SEO';
import '../styles.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const encode = (data) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('');

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ "form-name": "contact", ...formData })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-container">
      <SEO post={{
        title: "Contact Me - Data Musings",
        excerpt: "Get in touch with me for collaborations, questions, or just to say hello!",
        seo: {
          title: "Contact Me - Data Musings",
          description: "Get in touch with me for collaborations, questions, or just to say hello!",
          keywords: ["contact", "get in touch", "collaboration", "questions"],
          ogTitle: "Contact Me - Data Musings",
          ogDescription: "Get in touch with me for collaborations, questions, or just to say hello!",
          ogImage: "/images/contact-og.jpg",
          canonicalUrl: "https://datamusings.blog/contact"
        }
      }} />
      
      <h1 className="page-title">Contact Me</h1>
      <p className="page-description">
        Have a question or want to work together? Feel free to reach out!
      </p>
      
      <form
        name="contact"
        method="post"
        onSubmit={handleSubmit}
        className="contact-form"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
      >
        <input type="hidden" name="form-name" value="contact" />
        <input type="hidden" name="bot-field" />
        
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            name="subject"
            id="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            id="message"
            value={formData.message}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>

        {status === 'success' && (
          <p className="success-message">
            Thank you for your message! I&apos;ll get back to you soon.
          </p>
        )}
        {status === 'error' && (
          <p className="error-message">
            Sorry, there was an error sending your message. Please try again.
          </p>
        )}

        <button
          type="submit"
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default Contact; 