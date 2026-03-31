import React from 'react';
import { motion } from 'framer-motion';
import { FaRoute, FaCloudSun, FaCalendarCheck, FaMapMarkedAlt, FaInfoCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const PlanTrekSection = () => {
  const navigate = useNavigate();

  const planningFeatures = [
    {
      icon: FaRoute,
      title: "Trail Conditions",
      description: "Real-time updates on trail conditions and accessibility"
    },
    {
      icon: FaCloudSun,
      title: "Weather Forecast",
      description: "Detailed weather predictions for your planned trek dates"
    },
    {
      icon: FaCalendarCheck,
      title: "Group Treks",
      description: "Join upcoming group treks or create your own adventure"
    },
    {
      icon: FaMapMarkedAlt,
      title: "Route Planning",
      description: "Custom route planning with difficulty levels and duration"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="plan-trek-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Plan Your Perfect Trek</h2>
          <p className="section-subtitle">
            Get all the information you need to plan your dream trekking adventure in Nepal
          </p>
        </motion.div>

        <motion.div
          className="planning-features"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {planningFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-item"
              variants={featureVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="feature-icon">
                <feature.icon />
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="trek-info-box"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="info-content">
            <div className="info-icon">
              <FaInfoCircle />
            </div>
            <div className="info-text">
              <h3>Ready to Start Your Adventure?</h3>
              <p>
                Check trail conditions, upcoming group treks, and current weather forecasts 
                to prepare for your journey. Our comprehensive trek planner helps you make 
                informed decisions for a safe and memorable experience.
              </p>
            </div>
          </div>

          <div className="action-buttons">
            <motion.button
              className="primary-btn"
              onClick={() => navigate('/plan')}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaRoute className="btn-icon" />
              View Trek Planner
            </motion.button>
            
            <motion.button
              className="secondary-btn"
              onClick={() => navigate('/dashboard')}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaMapMarkedAlt className="btn-icon" />
              Explore Routes
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          className="emergency-info"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="emergency-content">
            <h4>Safety First</h4>
            <p>
              All our treks include emergency support, first aid kits, and communication devices. 
              Your safety is our top priority throughout your journey.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PlanTrekSection;
