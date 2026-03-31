import React, { useState } from 'react';
import { FaRoute, FaClock, FaThermometerHalf, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './TrekItinerary.css';

const TrekItinerary = ({ checkpoints, trekName, compact = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Create compact route string with full names
  const createCompactRoute = () => {
    if (!checkpoints || checkpoints.length === 0) return '';
    
    return checkpoints
      .map(checkpoint => checkpoint.name)
      .join(' → ');
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Compact view
  if (compact && !isExpanded) {
    return (
      <div className="trek-itinerary-compact" onClick={toggleExpanded}>
        <div className="compact-header">
          <FaRoute className="route-icon" />
          <span className="compact-title">Trek Route</span>
          <FaChevronDown className="expand-icon" />
        </div>
        <div className="compact-route">
          <span className="route-string">{createCompactRoute()}</span>
        </div>
      </div>
    );
  }

  // Expanded view
  return (
    <div className="trek-itinerary-expanded">
      <div className="expanded-header" onClick={toggleExpanded}>
        <div className="header-content">
          <FaRoute className="route-icon" />
          <div className="header-text">
            <h3>{trekName} Trek Itinerary</h3>
            <p>Complete day-by-day route with elevations and durations</p>
          </div>
        </div>
        <FaChevronUp className="collapse-icon" />
      </div>
      
      <div className="itinerary-timeline">
        {checkpoints && checkpoints.map((checkpoint, index) => (
          <div key={index} className="itinerary-step">
            <div className="step-connector">
              {index < checkpoints.length - 1 && (
                <div className="connector-line"></div>
              )}
            </div>
            <div className="step-content">
              <div className="step-header">
                <div className="step-number">{index + 1}</div>
                <div className="step-info">
                  <h4>{checkpoint.name}</h4>
                  <span className="step-type">{checkpoint.type}</span>
                </div>
                <div className="step-details">
                  <span className="elevation">
                    <FaThermometerHalf /> {checkpoint.elevation}
                  </span>
                  <span className="duration">
                    <FaClock /> {checkpoint.duration}
                  </span>
                </div>
              </div>
              <div className="step-description">
                <p><strong>{checkpoint.description}</strong></p>
                <p>{checkpoint.details}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {compact && (
        <div className="compact-footer" onClick={toggleExpanded}>
          <span>Click to collapse</span>
          <FaChevronUp />
        </div>
      )}
    </div>
  );
};

export default TrekItinerary; 