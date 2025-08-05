import React from 'react';
import './Features.css';

const FEATURES = [
  { icon: '🧗', title: 'Expert Guides', desc: 'Certified, local guides with years of Himalayan experience.' },
  { icon: '🗺️', title: 'Custom Routes', desc: 'Personalized itineraries for every fitness level and interest.' },
  { icon: '🌡️', title: 'Weather Updates', desc: 'Real-time weather forecasts and safety alerts.' },
  { icon: '🏠', title: 'Local Culture', desc: 'Immerse yourself in authentic Himalayan culture and traditions.' },
  { icon: '🚑', title: 'Safety First', desc: 'Emergency support, first aid, and insurance included.' },
  { icon: '📷', title: 'Photo Memories', desc: 'Professional photography to capture your journey.' },
];

const STEPS = [
  { icon: '🔍', title: 'Explore', desc: 'Browse treks and guides to find your perfect adventure.' },
  { icon: '📝', title: 'Book', desc: 'Reserve your trek and connect with your guide.' },
  { icon: '🥾', title: 'Trek', desc: 'Embark on your journey with full support and safety.' },
  { icon: '🎉', title: 'Enjoy', desc: 'Create memories and share your story with the world.' },
];

const Features = () => (
  <div className="features-page">
    <section className="features-hero">
      <h1 className="features-title">Features</h1>
      <p className="features-desc">Everything you need for an unforgettable Himalayan adventure.</p>
    </section>
    <section className="features-grid-section animated-section">
      <div className="features-grid">
        {FEATURES.map((f, i) => (
          <div className="feature-card" key={i}>
            <span className="feature-icon">{f.icon}</span>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
    <section className="features-steps animated-section">
      <h2 className="features-section-title">How It Works</h2>
      <div className="features-steps-timeline">
        {STEPS.map((s, i) => (
          <div className="features-step" key={i}>
            <span className="features-step-icon">{s.icon}</span>
            <h4>{s.title}</h4>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default Features; 