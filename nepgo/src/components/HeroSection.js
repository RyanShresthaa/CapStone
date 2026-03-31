import React from 'react';
import { motion } from 'framer-motion';
import { FaHiking, FaMapMarkedAlt, FaPhoneAlt, FaCalendarAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const HeroSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const heroButtons = [
    {
      icon: FaMapMarkedAlt,
      text: 'Explore Trails',
      color: 'green',
      route: '/trails'
    },
    {
      icon: FaHiking,
      text: 'Book a Guide',
      color: 'yellow',
      route: '/book-guide'
    },
    {
      icon: FaCalendarAlt,
      text: 'Plan Trek',
      color: 'blue',
      route: '/plan'
    },
    {
      icon: FaPhoneAlt,
      text: 'Contact Us',
      color: 'purple',
      route: '/contact'
    }
  ];

  return (
    <section className="hero-section">
      <div className="hero-background">
        <div className="hero-overlay"></div>
        <div className="hero-particles"></div>
      </div>
      
      <div className="hero-content">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-title">
            {user ? 
              `Welcome back, ${user.firstName || user.name || 'Explorer'}! 🏔️` : 
              'Discover the Himalayas with NepGo'
            }
          </h1>
          <p className="hero-subtitle">
            {user ? 
              'Ready for your next adventure? Let\'s explore the breathtaking trails and hidden gems of Nepal together!' :
              'Your ultimate companion for unforgettable trekking adventures in Nepal. Explore guided trails, hidden gems, and breathtaking peaks.'
            }
          </p>
        </motion.div>

        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          {heroButtons.map((button, index) => (
            <motion.button
              key={index}
              onClick={() => navigate(button.route)}
              className={`hero-btn ${button.color}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.15 }}
            >
              <button.icon className="btn-icon" />
              {button.text}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
