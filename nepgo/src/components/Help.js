import React from 'react';
import './About.css';
import { Link } from 'react-router-dom';

const Help = () => (
  <div className="about-page">
    <section className="about-hero">
      <h1 className="about-title">Help & Support</h1>
      <p className="about-desc">Need assistance? We’re here to help you get the most out of NepGo.</p>
    </section>
    <section className="about-section">
      <h2>Contact Support</h2>
      <p>Email us at <a href="mailto:support@nepgo.com">support@nepgo.com</a> for direct assistance.</p>
      <h2>Report an Issue</h2>
      <p>If you encounter bugs or problems, please <a href="mailto:support@nepgo.com?subject=Bug Report">report them here</a>.</p>
      <h2>More Resources</h2>
      <ul>
        <li><Link to="/faq">Frequently Asked Questions</Link></li>
        <li><Link to="/community">Community Forums</Link></li>
      </ul>
    </section>
  </div>
);

export default Help; 