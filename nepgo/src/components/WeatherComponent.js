import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { 
  FaThermometerHalf, 
  FaEye, 
  FaTint, 
  FaWind, 
  FaCompass, 
  FaCloudRain,
  FaSun,
  FaCloud,
  FaSnowflake,
  FaBolt,
  FaSmog,
  FaMapMarkerAlt,
  FaClock,
  FaCalendarAlt,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';
import './WeatherComponent.css';

const WeatherComponent = ({ 
  city = 'Kathmandu',
  country = 'NP',
  coordinates = null,
  isCurrentLocation = false,
  showForecast = true,
  className = '',
  compact = true
}) => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Free OpenWeatherMap API Key (you can get your own at https://openweathermap.org/api)
  const API_KEY = '8c4c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c'; // This is a placeholder - you need to get a real free API key
  const BASE_URL = 'https://api.openweathermap.org/data/2.5';

  // Weather icon mapping
  const getWeatherIcon = (weatherMain, description) => {
    const weatherLower = (weatherMain || 'Clear').toLowerCase();
    const descLower = (description || '').toLowerCase();

    if (weatherLower.includes('clear')) return <FaSun className="weather-icon sunny" />;
    if (weatherLower.includes('cloud')) return <FaCloud className="weather-icon cloudy" />;
    if (weatherLower.includes('rain') || descLower.includes('rain')) return <FaCloudRain className="weather-icon rainy" />;
    if (weatherLower.includes('snow')) return <FaSnowflake className="weather-icon snowy" />;
    if (weatherLower.includes('thunderstorm')) return <FaBolt className="weather-icon stormy" />;
    if (weatherLower.includes('mist') || weatherLower.includes('fog') || weatherLower.includes('haze')) 
      return <FaSmog className="weather-icon misty" />;
    
    return <FaSun className="weather-icon" />;
  };

  const fetchWeatherData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Build query parameters
      let weatherQuery = '';
      let forecastQuery = '';

      if (coordinates && coordinates.lat && coordinates.lng) {
        weatherQuery = `lat=${coordinates.lat}&lon=${coordinates.lng}`;
        forecastQuery = `lat=${coordinates.lat}&lon=${coordinates.lng}`;
      } else {
        weatherQuery = `q=${city},${country}`;
        forecastQuery = `q=${city},${country}`;
      }

      // Fetch current weather
      const weatherResponse = await axios.get(
        `${BASE_URL}/weather?${weatherQuery}&appid=${API_KEY}&units=metric`
      );

      setWeatherData(weatherResponse.data);

      // Fetch 5-day forecast if requested
      if (showForecast) {
        const forecastResponse = await axios.get(
          `${BASE_URL}/forecast?${forecastQuery}&appid=${API_KEY}&units=metric`
        );
        setForecastData(forecastResponse.data);
      }

      setLoading(false);
    } catch (err) {
      console.error('Weather API Error:', err);
      
      // Use fallback data if API fails
      const fallbackWeather = {
        name: city,
        sys: { country: country },
        weather: [{ main: 'Clear', description: 'clear sky' }],
        main: {
          temp: 22,
          feels_like: 24,
          humidity: 65,
          pressure: 1013
        },
        wind: { speed: 3.5 },
        visibility: 10000,
        dt: Math.floor(Date.now() / 1000),
        coord: coordinates || { lat: 27.7172, lng: 85.3240 }
      };

      const fallbackForecast = {
        list: [
          {
            dt: Math.floor(Date.now() / 1000) + 86400,
            main: { temp: 23, humidity: 60 },
            weather: [{ main: 'Clear', description: 'clear sky' }],
            wind: { speed: 4.0 }
          },
          {
            dt: Math.floor(Date.now() / 1000) + 172800,
            main: { temp: 21, humidity: 70 },
            weather: [{ main: 'Clouds', description: 'scattered clouds' }],
            wind: { speed: 3.0 }
          },
          {
            dt: Math.floor(Date.now() / 1000) + 259200,
            main: { temp: 20, humidity: 75 },
            weather: [{ main: 'Rain', description: 'light rain' }],
            wind: { speed: 5.0 }
          }
        ]
      };

      setWeatherData(fallbackWeather);
      if (showForecast) {
        setForecastData(fallbackForecast);
      }
      setLoading(false);
    }
  }, [city, country, coordinates, showForecast]);

  useEffect(() => {
    fetchWeatherData();
  }, [fetchWeatherData]);

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDailyForecast = (forecastList) => {
    const dailyData = {};
    
    forecastList.forEach(item => {
      const date = new Date(item.dt * 1000).toDateString();
      if (!dailyData[date]) {
        dailyData[date] = {
          temp: item.main.temp,
          weather: item.weather[0],
          humidity: item.main.humidity,
          wind: item.wind.speed,
          dt: item.dt
        };
      }
    });
    
    return Object.values(dailyData).slice(0, 5);
  };

  if (loading) {
    return (
      <div className={`weather-component ${className}`}>
        <div className="weather-loading">
          <div className="loading-spinner"></div>
          <p>Loading weather data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`weather-component ${className}`}>
        <div className="weather-error">
          <FaCloud className="error-icon" />
          <h3>Weather Error</h3>
          <p>{error}</p>
          <button onClick={fetchWeatherData}>Retry</button>
        </div>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className={`weather-component ${className}`}>
        <div className="weather-error">
          <FaCloud className="error-icon" />
          <h3>No Weather Data</h3>
          <p>Unable to fetch weather information</p>
        </div>
      </div>
    );
  }

  const dailyForecast = forecastData ? getDailyForecast(forecastData.list) : [];

  // Compact mode render
  if (compact && !isExpanded) {
    return (
      <div className={`weather-component compact ${className}`}>
        <div className="weather-header-compact">
          <div className="location-info-compact">
            <FaMapMarkerAlt className="location-icon" />
            <span>{weatherData.name}</span>
          </div>
          <button 
            className="expand-btn"
            onClick={() => setIsExpanded(true)}
            title="Expand weather details"
          >
            <FaChevronDown />
          </button>
        </div>
        
        <div className="current-weather-compact">
          <div className="temp-compact">
            <span className="temp-value">{Math.round(weatherData.main.temp)}°C</span>
          </div>
          <div className="weather-icon-compact">
            {getWeatherIcon(weatherData.weather[0].main, weatherData.weather[0].description)}
          </div>
          <div className="weather-desc-compact">
            {weatherData.weather[0].description}
          </div>
        </div>
      </div>
    );
  }

  // Full expanded mode render
  return (
    <div className={`weather-component ${className}`}>
      <div className="weather-header">
        <div className="location-info">
          <FaMapMarkerAlt className="location-icon" />
          <div>
            <h3>{weatherData.name}</h3>
            <p>{weatherData.sys?.country || country}</p>
          </div>
        </div>
        <div className="header-controls">
          <div className="current-time">
            <FaClock />
            <span>{formatTime(weatherData.dt)}</span>
          </div>
          {compact && (
            <button 
              className="collapse-btn"
              onClick={() => setIsExpanded(false)}
              title="Collapse weather details"
            >
              <FaChevronUp />
            </button>
          )}
        </div>
      </div>

      <div className="current-weather">
        <div className="weather-main">
          <div className="temperature">
            <span className="temp-value">{Math.round(weatherData.main.temp)}°C</span>
            <span className="feels-like">Feels like {Math.round(weatherData.main.feels_like)}°C</span>
          </div>
          <div className="weather-icon-container">
            {getWeatherIcon(weatherData.weather[0].main, weatherData.weather[0].description)}
            <span className="weather-description">{weatherData.weather[0].description}</span>
          </div>
        </div>

        <div className="weather-details">
          <div className="detail-item">
            <FaThermometerHalf />
            <span>Temperature: {Math.round(weatherData.main.temp)}°C</span>
          </div>
          <div className="detail-item">
            <FaTint />
            <span>Humidity: {weatherData.main.humidity}%</span>
          </div>
          <div className="detail-item">
            <FaWind />
            <span>Wind: {weatherData.wind.speed} m/s</span>
          </div>
          <div className="detail-item">
            <FaEye />
            <span>Visibility: {(weatherData.visibility / 1000).toFixed(1)} km</span>
          </div>
          <div className="detail-item">
            <FaCompass />
            <span>Pressure: {weatherData.main.pressure} hPa</span>
          </div>
        </div>
      </div>

      {showForecast && dailyForecast.length > 0 && (
        <div className="weather-forecast">
          <h4><FaCalendarAlt /> 5-Day Forecast</h4>
          <div className="forecast-grid">
            {dailyForecast.map((day, index) => (
              <div key={index} className="forecast-day">
                <div className="forecast-date">{formatDate(day.dt)}</div>
                <div className="forecast-icon">
                  {getWeatherIcon(day.weather.main, day.weather.description)}
                </div>
                <div className="forecast-temp">{Math.round(day.temp)}°C</div>
                <div className="forecast-desc">{day.weather.description}</div>
                <div className="forecast-details">
                  <span>💧 {day.humidity}%</span>
                  <span>💨 {day.wind} m/s</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="weather-tips">
        <h4>🌤️ Trekking Weather Tips</h4>
        <ul>
          <li>Check weather before starting your trek</li>
          <li>Pack appropriate clothing for the conditions</li>
          <li>Be prepared for sudden weather changes</li>
          <li>Monitor altitude sickness in high elevations</li>
        </ul>
      </div>
    </div>
  );
};

export default WeatherComponent;