import React from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaStar, FaHeart, FaShare, FaMountain, FaCompass, FaThermometerHalf, FaHiking } from 'react-icons/fa';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import './TrekScrollStack.css';
<<<<<<< HEAD
import { TREK_LOCATION_PHOTOS as P } from '../data/trekLocationPhotos';
=======
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb

const TrekScrollStack = () => {
  const trekDestinations = [
    {
      id: 1,
      name: "Everest Base Camp",
      location: "Khumbu Region, Nepal",
      elevation: "5,364m",
      duration: "14 days",
      difficulty: "Challenging",
      rating: 4.9,
      reviews: 156,
<<<<<<< HEAD
      image: P.everestBaseCamp,
=======
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
      description: "Trek to the base of the world's highest peak, experiencing Sherpa culture and breathtaking Himalayan views.",
      highlights: ["Kala Patthar viewpoint", "Namche Bazaar", "Tengboche Monastery", "Khumbu Glacier"],
      bestTime: "March-May, September-November",
      temperature: "-15°C to 15°C"
    },
    {
      id: 2,
      name: "Annapurna Circuit",
      location: "Annapurna Region, Nepal",
      elevation: "5,416m",
      duration: "12 days",
      difficulty: "Moderate",
      rating: 4.8,
      reviews: 89,
<<<<<<< HEAD
      image: P.thorongLa,
=======
      image: "https://images.unsplash.com/photo-1464013778555-8e723c2f01f8?auto=format&fit=crop&w=800&q=80",
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
      description: "Circumnavigate the Annapurna massif through diverse landscapes from subtropical valleys to high alpine passes.",
      highlights: ["Thorong La Pass", "Manang Valley", "Muktinath Temple", "Jomsom"],
      bestTime: "March-May, September-November",
      temperature: "-10°C to 25°C"
    },
    {
      id: 3,
      name: "Langtang Valley",
      location: "Langtang Region, Nepal",
      elevation: "4,984m",
      duration: "10 days",
      difficulty: "Easy",
      rating: 4.7,
      reviews: 124,
<<<<<<< HEAD
      image: P.langtangValley,
=======
      image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80",
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
      description: "Explore the beautiful Langtang Valley, known for its stunning glaciers and traditional Tamang villages.",
      highlights: ["Langtang Lirung", "Kyanjin Gompa", "Tamang Heritage", "Langtang Glacier"],
      bestTime: "March-May, September-November",
      temperature: "-5°C to 20°C"
    },
    {
      id: 4,
      name: "Manaslu Circuit",
      location: "Manaslu Region, Nepal",
      elevation: "5,106m",
      duration: "16 days",
      difficulty: "Challenging",
      rating: 4.6,
      reviews: 67,
<<<<<<< HEAD
      image: P.manasluFromTimang,
=======
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80",
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
      description: "Trek around the eighth highest peak in the world, experiencing remote villages and pristine landscapes.",
      highlights: ["Larkya La Pass", "Manaslu Base Camp", "Sama Gaon", "Buddhist Monasteries"],
      bestTime: "March-May, September-November",
      temperature: "-12°C to 18°C"
    },
    {
      id: 5,
      name: "Upper Mustang",
      location: "Mustang Region, Nepal",
      elevation: "4,200m",
      duration: "14 days",
      difficulty: "Moderate",
      rating: 4.5,
      reviews: 45,
<<<<<<< HEAD
      image: P.loManthang,
=======
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
      description: "Journey to the ancient Kingdom of Lo, a hidden valley with Tibetan culture and dramatic desert landscapes.",
      highlights: ["Lo Manthang", "Tibetan Culture", "Desert Landscapes", "Ancient Monasteries"],
      bestTime: "March-May, September-November",
      temperature: "-5°C to 25°C"
    }
  ];

  const handleStackComplete = () => {
    try {
      console.log('Scroll stack animation completed!');
    } catch (error) {
      console.error('Stack complete handler error:', error);
    }
  };

  try {
    return (
      <div className="trek-scroll-stack-container">
        <div className="trek-scroll-header">
          <h1 className="trek-scroll-title">
            <FaMountain className="title-icon" />
            Discover Nepal's Treasures
          </h1>
          <p className="trek-scroll-subtitle">
            Scroll through our handpicked trekking destinations and find your next adventure
          </p>
        </div>

        <ScrollStack
          className="trek-scroll-stack"
          itemDistance={150}
          itemScale={0.05}
          itemStackDistance={40}
          stackPosition="25%"
          scaleEndPosition="15%"
          baseScale={0.8}
          rotationAmount={2}
          blurAmount={0.5}
          onStackComplete={handleStackComplete}
        >
          {trekDestinations.map((trek, index) => (
            <ScrollStackItem key={trek.id} itemClassName={`trek-card-${index + 1}`}>
              <div className="trek-card-content">
                <div className="trek-card-background" style={{ backgroundImage: `url(${trek.image})` }}>
                  <div className="trek-card-overlay"></div>
                </div>
                
                <div className="trek-card-info">
                  <div className="trek-card-header">
                    <h2 className="trek-card-title">{trek.name}</h2>
                    <div className="trek-card-rating">
                      <FaStar className="star-icon" />
                      <span>{trek.rating}</span>
                      <span className="review-count">({trek.reviews})</span>
                    </div>
                  </div>
                  
                  <div className="trek-card-location">
                    <FaMapMarkerAlt className="location-icon" />
                    <span>{trek.location}</span>
                  </div>
                  
                  <p className="trek-card-description">{trek.description}</p>
                  
                  <div className="trek-card-details">
                    <div className="trek-detail-item">
                      <FaCompass className="detail-icon" />
                      <div>
                        <span className="detail-label">Elevation</span>
                        <span className="detail-value">{trek.elevation}</span>
                      </div>
                    </div>
                    
                    <div className="trek-detail-item">
                      <FaCalendarAlt className="detail-icon" />
                      <div>
                        <span className="detail-label">Duration</span>
                        <span className="detail-value">{trek.duration}</span>
                      </div>
                    </div>
                    
                    <div className="trek-detail-item">
                      <FaHiking className="detail-icon" />
                      <div>
                        <span className="detail-label">Difficulty</span>
                        <span className="detail-value">{trek.difficulty}</span>
                      </div>
                    </div>
                    
                    <div className="trek-detail-item">
                      <FaThermometerHalf className="detail-icon" />
                      <div>
                        <span className="detail-label">Temperature</span>
                        <span className="detail-value">{trek.temperature}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="trek-card-highlights">
                    <h4>Highlights</h4>
                    <ul>
                      {trek.highlights.map((highlight, idx) => (
                        <li key={idx}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="trek-card-footer">
                    <div className="trek-card-actions">
                      <button className="action-btn like-btn">
                        <FaHeart />
                        <span>Like</span>
                      </button>
                      <button className="action-btn share-btn">
                        <FaShare />
                        <span>Share</span>
                      </button>
                    </div>
                    
                    <div className="trek-card-booking">
                      <span className="best-time">Best Time: {trek.bestTime}</span>
                      <button className="book-now-btn">Explore Trek</button>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    );
  } catch (error) {
    console.error('TrekScrollStack render error:', error);
    return (
      <div className="trek-scroll-stack-container">
        <div className="trek-scroll-header">
          <h1 className="trek-scroll-title">
            <FaMountain className="title-icon" />
            Discover Nepal's Treasures
          </h1>
          <p className="trek-scroll-subtitle">
            Scroll through our handpicked trekking destinations and find your next adventure
          </p>
        </div>
        <div style={{ padding: '2rem', textAlign: 'center', color: 'white' }}>
          <p>Loading trek destinations...</p>
        </div>
      </div>
    );
  }
};

export default TrekScrollStack; 