import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };
  return (
    <div className="contact-page">
      <section className="contact-hero">
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-desc">Ready to start your adventure? Reach out for bookings, questions, or partnership opportunities.</p>
      </section>
      <section className="contact-form-section animated-section">
        {submitted ? (
          <div className="thank-you-message">Thank you for reaching out! We'll get back to you soon.</div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" required></textarea>
            <button type="submit" className="btn-primary">Send Message</button>
          </form>
        )}
        <div className="contact-socials">
          <a href="mailto:info@nepgo.com" className="contact-social-link">✉️ info@nepgo.com</a>
          <a href="tel:+977123456789" className="contact-social-link">📞 +977 123-456-789</a>
        </div>
      </section>
    </div>
  );
};

export default Contact; 