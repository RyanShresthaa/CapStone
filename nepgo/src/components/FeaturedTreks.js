import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaClock, FaStar, FaUsers } from 'react-icons/fa';
import { TREK_LOCATION_PHOTOS as P } from '../data/trekLocationPhotos';

const FeaturedTreks = () => {
  const trekData = [
    {
      id: 1,
      name: "Everest Base Camp",
      image: P.everestBaseCamp,
      duration: "14 days",
      difficulty: "Challenging",
      rating: 4.8,
      participants: 1200,
      description: "A legendary trek through the footsteps of adventurers to the base of the world's tallest mountain.",
      highlights: ["Khumbu Valley", "Sherpa Culture", "Tengboche Monastery"],
      price: "$1,850"
    },
    {
      id: 2,
      name: "Annapurna Circuit",
      image: P.thorongLa,
      duration: "18 days",
      difficulty: "Moderate",
      rating: 4.7,
      participants: 800,
      description: "Circle the massive Annapurna massif and experience cultural and natural diversity like nowhere else.",
      highlights: ["Thorong La Pass", "Hot Springs", "Diverse Landscapes"],
      price: "$1,450"
    },
    {
      id: 3,
      name: "Langtang Valley",
      image: "/mountain.jpg",
      duration: "10 days",
      difficulty: "Easy",
      rating: 4.6,
      participants: 600,
      description: "Stunning valleys, Tamang heritage, and beautiful landscapes just north of Kathmandu.",
      highlights: ["Kyanjin Gompa", "Cheese Factory", "Tamang Culture"],
      price: "$950"
    },
    {
      id: 4,
      name: "Manaslu Circuit",
      image: P.manasluFromTimang,
      duration: "16 days",
      difficulty: "Challenging",
      rating: 4.9,
      participants: 400,
      description: "Off-the-beaten-path trek around the eighth highest mountain in the world.",
      highlights: ["Larkya La Pass", "Remote Villages", "Pristine Nature"],
      price: "$1,650"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="featured-treks">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">Featured Treks</h2>
        <p className="section-subtitle">Discover the most popular and breathtaking treks in Nepal</p>
      </motion.div>

      <motion.div
        className="treks-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {trekData.map((trek) => (
          <motion.div
            key={trek.id}
            className="trek-card"
            variants={cardVariants}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="trek-image-container">
              <img src={trek.image} alt={trek.name} className="trek-image" />
              <div className="trek-overlay">
                <div className="trek-price">{trek.price}</div>
                <div className="trek-difficulty">{trek.difficulty}</div>
              </div>
            </div>

            <div className="trek-content">
              <h3 className="trek-name">{trek.name}</h3>
              <p className="trek-description">{trek.description}</p>
              
              <div className="trek-meta">
                <div className="trek-info">
                  <FaClock className="trek-icon" />
                  <span>{trek.duration}</span>
                </div>
                <div className="trek-info">
                  <FaMapMarkerAlt className="trek-icon" />
                  <span>Nepal</span>
                </div>
                <div className="trek-info">
                  <FaStar className="trek-icon" />
                  <span>{trek.rating}</span>
                </div>
                <div className="trek-info">
                  <FaUsers className="trek-icon" />
                  <span>{trek.participants}+</span>
                </div>
              </div>

              <div className="trek-highlights">
                <h4>Highlights:</h4>
                <ul>
                  {trek.highlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              </div>

              <button className="trek-btn">View Details</button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default FeaturedTreks;
