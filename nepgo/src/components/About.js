import React from 'react';
import './About.css';
import { TREK_LOCATION_PHOTOS as P } from '../data/trekLocationPhotos';

const About = () => (
  <div className="about-page">
    <section className="about-hero">
      <div className="about-hero-content">
        <h1 className="about-title">About NepGo</h1>
        <p className="about-mission">Our mission is to make Himalayan trekking safe, accessible, and unforgettable for everyone. We connect adventurers with expert guides, curated routes, and authentic local experiences.</p>
      </div>
      <img className="about-hero-img" src={P.thorongLa} alt="Thorong La pass, Annapurna region, Nepal" />
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