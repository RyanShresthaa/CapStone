import React, { useState } from 'react';
import { FaMapMarkerAlt, FaMountain, FaRoute, FaDirections, FaLocationArrow, FaInfoCircle, FaTimes } from 'react-icons/fa';
import './MapComponent.css';

const MapComponent = ({ center = [27.7172, 85.3240], markers = [], onRouteSelect }) => {
  const [selectedMarker, setSelectedMarker] = useState(null);

  // Default Nepal trek locations if no markers provided
  const defaultMarkers = [
    { 
      position: [27.7172, 85.3240], 
      name: 'Kathmandu', 
      description: 'Capital city of Nepal - Starting point for many treks',
      difficulty: 'Easy',
      elevation: '1,400m',
      bestTime: 'Oct-Nov, Mar-Apr',
      coordinates: '27.7172°N, 85.3240°E',
      checkpoints: [
        {
          name: 'Tribhuvan International Airport',
          type: 'transportation',
          description: 'Main international airport for arrival',
          details: 'Direct flights from major cities, visa on arrival available'
        },
        {
          name: 'Thamel District',
          type: 'accommodation',
          description: 'Tourist hub with hotels and guesthouses',
          details: 'Budget to luxury options, trekking gear shops, restaurants'
        },
        {
          name: 'Trekking Permits Office',
          type: 'permit',
          description: 'Required permits for trekking',
          details: 'TIMS card, National Park permits, guide registration'
        }
      ]
    },
    { 
      position: [28.0026, 86.8527], 
      name: 'Everest Base Camp', 
      description: 'Base camp for Mount Everest - Ultimate trekking destination',
      difficulty: 'Hard',
      elevation: '5,364m',
      bestTime: 'Mar-May, Sep-Nov',
      coordinates: '28.0026°N, 86.8527°E',
      checkpoints: [
        {
          name: 'Lukla Airport',
          type: 'transportation',
          description: 'Gateway to Everest region',
          details: 'Domestic flights from Kathmandu, weather dependent'
        },
        {
          name: 'Namche Bazaar',
          type: 'accommodation',
          description: 'Major acclimatization stop',
          details: 'Tea houses, hotels, ATMs, internet cafes'
        },
        {
          name: 'Gorak Shep',
          type: 'accommodation',
          description: 'Last settlement before EBC',
          details: 'Basic tea houses, high altitude accommodation'
        },
        {
          name: 'Everest Base Camp',
          type: 'destination',
          description: 'Final destination',
          details: 'Tent city during climbing season, spectacular views'
        }
      ]
    },
    { 
      position: [28.5969, 83.9294], 
      name: 'Annapurna Base Camp', 
      description: 'Base camp for Annapurna - Stunning mountain views',
      difficulty: 'Moderate',
      elevation: '4,130m',
      bestTime: 'Mar-May, Sep-Nov',
      coordinates: '28.5969°N, 83.9294°E',
      checkpoints: [
        {
          name: 'Pokhara',
          type: 'transportation',
          description: 'Starting point for Annapurna treks',
          details: 'Domestic flights, buses from Kathmandu, lakeside hotels'
        },
        {
          name: 'Nayapul',
          type: 'transportation',
          description: 'Road head for trek',
          details: 'Taxi/bus from Pokhara, trek permit check'
        },
        {
          name: 'Ghorepani',
          type: 'accommodation',
          description: 'Famous for rhododendron forests',
          details: 'Tea houses, Poon Hill viewpoint, cultural villages'
        },
        {
          name: 'Annapurna Base Camp',
          type: 'destination',
          description: 'Surrounded by towering peaks',
          details: 'Tea houses, 360-degree mountain views'
        }
      ]
    },
    { 
      position: [28.2167, 85.5167], 
      name: 'Langtang Valley', 
      description: 'Traditional Tamang village - Cultural trekking experience',
      difficulty: 'Moderate',
      elevation: '3,430m',
      bestTime: 'Mar-May, Sep-Nov',
      coordinates: '28.2167°N, 85.5167°E',
      checkpoints: [
        {
          name: 'Syabrubesi',
          type: 'transportation',
          description: 'Road head for Langtang trek',
          details: 'Bus from Kathmandu, trek permit check'
        },
        {
          name: 'Langtang Village',
          type: 'accommodation',
          description: 'Traditional Tamang settlement',
          details: 'Tea houses, cultural experience, local cuisine'
        },
        {
          name: 'Kyanjin Gompa',
          type: 'destination',
          description: 'Monastery and highest point',
          details: 'Tea houses, cheese factory, mountain views'
        }
      ]
    },
    { 
      position: [27.8056, 86.7133], 
      name: 'Namche Bazaar', 
      description: 'Gateway to Everest region - Acclimatization stop',
      difficulty: 'Moderate',
      elevation: '3,440m',
      bestTime: 'Mar-May, Sep-Nov',
      coordinates: '27.8056°N, 86.7133°E',
      checkpoints: [
        {
          name: 'Lukla Airport',
          type: 'transportation',
          description: 'Flight from Kathmandu',
          details: 'Weather dependent flights, early morning departures'
        },
        {
          name: 'Phakding',
          type: 'accommodation',
          description: 'First night stop',
          details: 'Tea houses, acclimatization, river views'
        },
        {
          name: 'Namche Bazaar',
          type: 'accommodation',
          description: 'Sherpa capital and trading center',
          details: 'Hotels, restaurants, gear shops, ATMs, internet'
        }
      ]
    }
  ];

  // Only show selected trek if markers are provided, otherwise show all
  const trekMarkers = (markers || []).length > 0 ? markers : [];

  // Normalize markers to ensure .position is always [lat, lng]
  const normalizedMarkers = (trekMarkers || []).map(m => {
    if (Array.isArray(m.position)) return m;
    if (m.lat !== undefined && m.lng !== undefined) {
      return { ...m, position: [m.lat, m.lng] };
    }
    return m;
  });

  const handleMarkerClick = (marker) => {
    setSelectedMarker(selectedMarker?.name === marker.name ? null : marker);
  };

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
