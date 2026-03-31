import React from 'react';
import './Reviews.css';

const TESTIMONIALS = [
  {
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    text: '"NepGo made my Everest Base Camp dream a reality! The guides were incredibly knowledgeable and the entire experience was perfectly organized. I felt safe and supported every step of the way."',
    author: '- Sarah Johnson, Canada',
  },
  {
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    text: '"The Annapurna Circuit trek exceeded all my expectations. Beautiful landscapes, amazing culture, and the best trekking team I could ask for. NepGo delivered an unforgettable adventure!"',
    author: '- Marco Rodriguez, Spain',
  },
  {
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    text: '"As a solo female traveler, I was initially nervous, but NepGo\'s team made me feel completely safe and welcome. The Langtang Valley trek was absolutely magical!"',
    author: '- Priya Patel, India',
  },
];

const Reviews = () => (
  <div className="reviews-page">
    <section className="reviews-hero">
      <h1 className="reviews-title">Trekker Stories</h1>
      <p className="reviews-desc">Hear from adventurers who experienced the magic of Nepal with NepGo.</p>
    </section>
    <section className="reviews-grid-section animated-section">
      <div className="reviews-grid">
        {TESTIMONIALS.map((t, i) => (
          <div className="review-card" key={i}>
            <img className="review-avatar" src={t.avatar} alt={t.author} />
            <p className="review-text">{t.text}</p>
            <p className="review-author">{t.author}</p>
          </div>
        ))}
      </div>
      <div className="reviews-badges">
        <span className="badge">⭐ 4.9/5 Rating</span>
        <span className="badge">🏆 Award Winning</span>
        <span className="badge">🌍 Trusted Worldwide</span>
      </div>
      <div className="reviews-cta">
        <button className="btn-primary">Share Your Story</button>
      </div>
    </section>
  </div>
);

export default Reviews; 