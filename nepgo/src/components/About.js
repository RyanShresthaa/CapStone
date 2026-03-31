import React from 'react';
import './About.css';
<<<<<<< HEAD
import { TREK_LOCATION_PHOTOS as P } from '../data/trekLocationPhotos';
=======
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb

const About = () => (
  <div className="about-page">
    <section className="about-hero">
      <div className="about-hero-content">
        <h1 className="about-title">About NepGo</h1>
        <p className="about-mission">Our mission is to make Himalayan trekking safe, accessible, and unforgettable for everyone. We connect adventurers with expert guides, curated routes, and authentic local experiences.</p>
      </div>
<<<<<<< HEAD
      <img className="about-hero-img" src={P.thorongLa} alt="Thorong La pass, Annapurna region, Nepal" />
=======
      <img className="about-hero-img" src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=900&q=80" alt="Nepal mountains" />
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
    </section>
    <section className="about-why animated-section">
      <h2 className="about-section-title">Why NepGo?</h2>
      <div className="about-features-grid">
        <div className="about-feature-card">
          <span className="about-feature-icon">🧭</span>
          <h3>Expert Local Guides</h3>
          <p>All our guides are certified, experienced, and passionate about sharing Nepal's beauty.</p>
        </div>
        <div className="about-feature-card">
          <span className="about-feature-icon">🌱</span>
          <h3>Sustainable Adventures</h3>
          <p>We promote eco-friendly trekking and support local communities.</p>
        </div>
        <div className="about-feature-card">
          <span className="about-feature-icon">🤝</span>
          <h3>Personalized Journeys</h3>
          <p>Custom routes and experiences for every fitness level and interest.</p>
        </div>
      </div>
    </section>
  </div>
);

export default About; 