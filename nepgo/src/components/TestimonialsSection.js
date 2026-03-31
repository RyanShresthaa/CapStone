import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar, FaUserCircle, FaMapMarkerAlt } from 'react-icons/fa';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "USA",
      avatar: "/google.jpg",
      rating: 5,
      text: "NepGo made my trek seamless! The guides were incredibly knowledgeable and the routes were absolutely breathtaking. I felt safe and supported throughout the entire journey. The attention to detail was remarkable.",
      trek: "Everest Base Camp",
      date: "March 2024"
    },
    {
      id: 2,
      name: "Anish Thapa",
      location: "Nepal",
      avatar: "/google.jpg",
      rating: 5,
      text: "A professional, safe, and unforgettable experience. The attention to detail and customer service exceeded all my expectations. The local guides shared amazing stories about the culture and history.",
      trek: "Annapurna Circuit",
      date: "February 2024"
    },
    {
      id: 3,
      name: "Marcus Chen",
      location: "Singapore",
      avatar: "/google.jpg",
      rating: 5,
      text: "The best trekking experience I've ever had! The local guides shared amazing stories about the culture and history. Every moment was magical and the views were absolutely spectacular.",
      trek: "Langtang Valley",
      date: "January 2024"
    },
    {
      id: 4,
      name: "Emma Thompson",
      location: "UK",
      avatar: "/google.jpg",
      rating: 5,
      text: "Outstanding service from start to finish. The trek was challenging but incredibly rewarding. The team made sure we were comfortable and well-prepared for every step of the journey.",
      trek: "Manaslu Circuit",
      date: "December 2023"
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

  const cardVariants = {
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

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
<<<<<<< HEAD
    <section className="testimonials-section" id="testimonials">
      <div className="section-container testimonials-section-inner">
=======
    <section className="testimonials-section">
      <div className="section-container">
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">What Trekkers Say</h2>
          <p className="section-subtitle">
            Real experiences from adventurers who've explored Nepal with NepGo
          </p>
        </motion.div>

        <motion.div
          className="testimonials-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="testimonial-card"
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="testimonial-header">
                <div className="quote-container">
                  <FaQuoteLeft className="quote-icon" />
                </div>
                <div className="rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="star-icon" />
                  ))}
                </div>
              </div>

              <blockquote className="testimonial-text">
                "{testimonial.text}"
              </blockquote>

              <div className="testimonial-footer">
                <div className="user-info">
                  <div className="user-avatar">
                    <FaUserCircle className="avatar-icon" />
                  </div>
                  <div className="user-details">
                    <h4 className="user-name">{testimonial.name}</h4>
                    <div className="user-location">
                      <FaMapMarkerAlt className="location-icon" />
                      <span>{testimonial.location}</span>
                    </div>
                    <div className="trek-info">
                      <span className="trek-name">{testimonial.trek}</span>
                      <span className="trek-date">• {testimonial.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="testimonials-stats"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <motion.div 
            className="stat-item"
            variants={statsVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="stat-number">4.9</div>
            <div className="stat-label">Average Rating</div>
          </motion.div>
          <motion.div 
            className="stat-item"
            variants={statsVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="stat-number">2,500+</div>
            <div className="stat-label">Happy Trekkers</div>
          </motion.div>
          <motion.div 
            className="stat-item"
            variants={statsVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="stat-number">50+</div>
            <div className="stat-label">Trek Routes</div>
          </motion.div>
          <motion.div 
            className="stat-item"
            variants={statsVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="stat-number">15+</div>
            <div className="stat-label">Years Experience</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
