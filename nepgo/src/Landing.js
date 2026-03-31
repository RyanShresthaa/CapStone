import React from 'react';
import './Landing.css';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
<<<<<<< HEAD
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from './contexts/ThemeContext';
import { TREK_LOCATION_PHOTOS } from './data/trekLocationPhotos';

const HERO_BG = TREK_LOCATION_PHOTOS.mountEverest;
=======
import { useTheme } from './contexts/ThemeContext';

const HERO_BG = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80';
const HERO_CARD_IMG = 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80';
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb

const AnimatedStat = ({ value, label, duration = 1200 }) => {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    let start = 0;
    const end = parseInt(value.replace(/\D/g, ''));
    if (start === end) return;
    let incrementTime = Math.abs(Math.floor(duration / end));
    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);
    return () => clearInterval(timer);
  }, [value, duration]);
  return (
    <div className="stat-card">
      <span className="stat-number">{count}{value.replace(/\d/g, '')}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
};

<<<<<<< HEAD
=======
const FEATURES = [
  { icon: '🧗', title: 'Expert Guides', desc: 'Certified, local guides with years of Himalayan experience.' },
  { icon: '🗺️', title: 'Custom Routes', desc: 'Personalized itineraries for every fitness level and interest.' },
  { icon: '🌡️', title: 'Weather Updates', desc: 'Real-time weather forecasts and safety alerts.' },
  { icon: '🏠', title: 'Local Culture', desc: 'Immerse yourself in authentic Himalayan culture and traditions.' },
  { icon: '🚑', title: 'Safety First', desc: 'Emergency support, first aid, and insurance included.' },
  { icon: '📷', title: 'Photo Memories', desc: 'Professional photography to capture your journey.' },
];

>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
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

const Landing = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <div className={classNames('landing-container', { dark: isDarkMode })}>
<<<<<<< HEAD
=======
      {/* Hero Section */}
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
      <section
        className="landing-hero-bg full-bleed"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          width: '100vw',
          position: 'relative',
        }}
      >
<<<<<<< HEAD
        <div className="hero-image-mesh" aria-hidden />
        <div className={classNames('hero-glass-overlay', { dark: isDarkMode })} />
        <div className="hero-gradient-fade" />

        <button
          type="button"
          className="landing-hero-theme"
          onClick={toggleTheme}
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>

        <div className="hero-center-content">
          <p className="hero-eyebrow">Himalayan trekking, reimagined</p>
          <h1 className="hero-headline">NepGo</h1>
          <h2 className="hero-subheadline">Where peaks meet planning</h2>
          <p className="hero-desc">
            Routes, weather, community, and bookings — so you spend less time guessing and more time on the trail.
          </p>
          <div className="hero-actions">
            <Link to="/signup" className="hero-btn hero-btn--primary">
              Get started free
            </Link>
            <Link to="/login" className="hero-btn hero-btn--ghost">
              Sign in
            </Link>
            <Link to="/home" className="hero-btn hero-btn--quiet">
              Browse treks
            </Link>
          </div>
        </div>
=======
        <div className={classNames('hero-glass-overlay', { dark: isDarkMode })} />
        <div className="hero-gradient-fade" />
        <div className="hero-center-content">
          <h1 className="hero-headline">NepGo</h1>
          <h2 className="hero-subheadline">Where Mountains Meet Adventure</h2>
          <p className="hero-desc">Trek smarter. Discover deeper. Experience the Himalayas like never before.</p>
        </div>
        <button className="hero-cta-btn">Start Your Journey →</button>
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="features-title">Why Choose NepGo?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-emoji">🏔️</div>
              <div className="feature-card-title">Epic Treks</div>
              <div className="feature-card-desc">Curated routes through the most breathtaking Himalayan landscapes.</div>
            </div>
            <div className="feature-card">
              <div className="feature-emoji">👨‍🌾</div>
              <div className="feature-card-title">Local Guides</div>
              <div className="feature-card-desc">Expert, friendly guides for a safe, authentic, and immersive experience.</div>
            </div>
            <div className="feature-card">
              <div className="feature-emoji">📡</div>
              <div className="feature-card-title">Smart Planning</div>
              <div className="feature-card-desc">Real-time weather, route info, and community tips at your fingertips.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section section">
        <div className="container">
          <div className="animated-stats" style={{ justifyContent: 'center' }}>
            <AnimatedStat value="5000+" label="Happy Trekkers" />
            <AnimatedStat value="200+" label="Trail Routes" />
            <AnimatedStat value="4.9★" label="Average Rating" />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section testimonials-section">
        <div className="container">
          <h2 className="section-title">What Our Trekkers Say</h2>
          <div className="testimonials-grid" style={{ justifyContent: 'center' }}>
            {TESTIMONIALS.slice(0, 2).map((testimonial, index) => (
              <div key={index} className="testimonial-card card">
                <div className="testimonial-content">
                  <p className="testimonial-text">{testimonial.text}</p>
                  <div className="testimonial-author">
                    <img src={testimonial.avatar} alt="Author" className="testimonial-avatar" />
                    <span>{testimonial.author}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
<<<<<<< HEAD
            <p className="cta-eyebrow">Start today</p>
            <h2 className="cta-title">Ready for your next ridge?</h2>
            <p className="cta-lead">
              Create an account in seconds — save treks, ask the community, and plan with confidence.
            </p>
            <div className="cta-actions">
              <Link to="/signup" className="cta-btn cta-btn--primary">
                Create free account
              </Link>
              <Link to="/login" className="cta-btn cta-btn--outline">
                I already have an account
              </Link>
            </div>
=======
            <h2>Ready for Your Next Adventure?</h2>
            <p>Join thousands of trekkers who have discovered Nepal's wonders with NepGo.</p>
            <Link to="/signup" className="btn btn-primary btn-xl">
              Get Started Free
            </Link>
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
