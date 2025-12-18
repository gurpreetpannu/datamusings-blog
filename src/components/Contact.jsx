import React, { useState, useCallback } from "react";
import SEO from "./SEO";
import "../styles.css";

const initialFormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const Contact = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          "form-name": "contact",
          ...formData,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData(initialFormState);
      } else {
        throw new Error("Form submission failed");
      }
    } catch (err) {
      setError("There was an error submitting the form. Please try again.");
      console.error("Form submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

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

      <h1 className="contact-title">Contact Me</h1>
      <p className="contact-description">
        Have a question or want to work together? Feel free to reach out!
      </p>

      {/* Hidden form for Netlify Forms detection */}
      <form
        name="contact"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        hidden
      >
        <input type="text" name="name" />
        <input type="email" name="email" />
        <input type="text" name="subject" />
        <textarea name="message"></textarea>
      </form>

      {/* Visible contact form */}
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your name"
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="your.email@example.com"
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            placeholder="What's this about?"
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Your message..."
            rows="5"
            disabled={isSubmitting}
          />
        </div>

        <button
          type="submit"
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>

      {submitted && (
        <div className="success-message">
          Thank you for your message! I&apos;ll get back to you soon.
        </div>
      )}

      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Contact; 