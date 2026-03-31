import React from 'react';
import { FaMapMarkerAlt, FaMountain, FaRoute, FaInfoCircle } from 'react-icons/fa';
import './MapComponent.css';

const MapComponent = ({ center = [27.7172, 85.3240], markers = [] }) => {
  const trekMarkers = (markers || []).length > 0 ? markers : [];

  const normalizedMarkers = (trekMarkers || []).map((m) => {
    if (Array.isArray(m.position)) return m;
    if (m.lat !== undefined && m.lng !== undefined) {
      return { ...m, position: [m.lat, m.lng] };
    }
    return m;
  });

  return (
    <div className="map-container">
      <div className="map-header">
        <h3><FaMapMarkerAlt /> {markers && markers.length > 0 ? markers[0].name : 'No Trek Selected'} Checkpoints & Travel Guide</h3>
      </div>
      
      <div className="map-content">
        <div className="checkpoints-container">
          <div className="checkpoints-grid">
            {normalizedMarkers.map((trek, index) => (
              <div key={index} className="trek-card">
                <div className="trek-header">
                  <h4>{trek.name}</h4>
                  <div className="trek-meta">
                    <span className="difficulty">{trek.difficulty}</span>
                    <span className="elevation">{trek.elevation}</span>
                  </div>
                </div>
                
                <p className="trek-description">{trek.description}</p>
                
                <div className="checkpoints-list">
                  <h5>Checkpoints & Travel Information</h5>
                  {(trek.checkpoints || []).map((checkpoint, cpIndex) => (
                    <div key={cpIndex} className={`checkpoint-item ${checkpoint.type}`}>
                      <div className="checkpoint-icon">
                        {checkpoint.type === 'transportation' && <FaRoute />}
                        {checkpoint.type === 'accommodation' && <FaMapMarkerAlt />}
                        {checkpoint.type === 'permit' && <FaInfoCircle />}
                        {checkpoint.type === 'destination' && <FaMountain />}
                      </div>
                      <div className="checkpoint-content">
                        <h6>{checkpoint.name}</h6>
                        <p className="checkpoint-description">{checkpoint.description}</p>
                        <p className="checkpoint-details">{checkpoint.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="trek-info">
                  <div className="info-item">
                    <strong>Best Time:</strong> {trek.bestTime}
                  </div>
                  <div className="info-item">
                    <strong>Coordinates:</strong> {trek.coordinates}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
