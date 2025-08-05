import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaGithub, FaLinkedin, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope, FaHeart } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { user } = useAuth();
  const [email, setEmail] = React.useState('');
  const [isSubscribing, setIsSubscribing] = React.useState(false);
  const [subscriptionMessage, setSubscriptionMessage] = React.useState('');

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setSubscriptionMessage('Please enter a valid email address');
      return;
    }

    setIsSubscribing(true);
    setSubscriptionMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubscriptionMessage('Thank you for subscribing! You\'ll receive updates soon.');
      setEmail('');
    } catch (error) {
      setSubscriptionMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-main">
          {/* Company Info Section */}
          <div className="footer-section">
            <div className="footer-logo">
              <span className="logo-icon">🏔️</span>
              <span className="logo-text">NepGo</span>
            </div>
            <p className="footer-description">
              Your ultimate companion for exploring the majestic Himalayas. 
              Discover breathtaking treks, plan your adventures, and connect with fellow trekkers.
            </p>
            <div className="footer-contact">
              <div className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <span>Kathmandu, Nepal</span>
              </div>
              <div className="contact-item">
                <FaPhone className="contact-icon" />
                <span>+977-1-4XXXXXX</span>
              </div>
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <span>info@nepgo.com</span>
              </div>
            </div>
            
            {/* Newsletter Subscription */}
            <div className="newsletter-section">
              <h4 className="newsletter-title">Stay Updated</h4>
              <p className="newsletter-desc">Get the latest trek updates and travel tips</p>
              <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="newsletter-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubscribing}
                />
                <button 
                  type="submit" 
                  className="newsletter-btn"
                  disabled={isSubscribing}
                >
                  {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
              {subscriptionMessage && (
                <p className={`subscription-message ${subscriptionMessage.includes('Thank you') ? 'success' : 'error'}`}>
                  {subscriptionMessage}
                </p>
              )}
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/features">Features</Link></li>
              <li><Link to="/testimonials">Reviews</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Services Section */}
          <div className="footer-section">
            <h3 className="footer-title">Services</h3>
            <ul className="footer-links">
              {user ? (
                <>
                  <li><Link to="/trip-planning">Trip Planning</Link></li>
                  <li><Link to="/trek-recommender">Trek Recommender</Link></li>
                  <li><Link to="/community">Community Forums</Link></li>
                  <li><Link to="/search">Search Treks</Link></li>
                  <li><Link to="/dashboard">Dashboard</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/features">Features</Link></li>
                  <li><Link to="/about">About Us</Link></li>
                  <li><Link to="/testimonials">Reviews</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                  <li><Link to="/signup">Get Started</Link></li>
                </>
              )}
            </ul>
          </div>

          {/* Support Section */}
          <div className="footer-section">
            <h3 className="footer-title">Support</h3>
            <ul className="footer-links">
              <li><Link to="/help">Help Center</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/contact">Contact Support</Link></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="footer-copyright">
              <p>
                © {currentYear} NepGo. All rights reserved. Made with <FaHeart className="heart-icon" /> in Nepal
              </p>
            </div>
            
            <div className="footer-socials">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
                <FaFacebook />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="YouTube">
                <FaYoutube />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
                <FaGithub />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
