# API Setup Guide for NepGo

This guide will help you set up the free APIs used in the NepGo application.

## 🌤️ Weather API (OpenWeatherMap)

### Step 1: Get Free API Key
1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Click "Sign Up" and create a free account
3. After signing up, go to your profile and find "API keys"
4. Copy your free API key

### Step 2: Update the Weather Component
1. Open `src/components/WeatherComponent.js`
2. Find this line:
   ```javascript
   const API_KEY = '8c4c0c0c0c0c0c0c0c0c0c0c0c0c0c0c0c'; // This is a placeholder
   ```
3. Replace the placeholder with your actual API key:
   ```javascript
   const API_KEY = 'your_actual_api_key_here';
   ```

### Features Included
- ✅ Current weather data
- ✅ 5-day forecast
- ✅ Location-based weather
- ✅ Multiple weather conditions
- ✅ Sunrise/sunset times
- ✅ Wind, humidity, pressure data

## 🗺️ Map API (OpenStreetMap + Leaflet)

### No API Key Required!
The map functionality uses completely free services:
- **OpenStreetMap**: Free map tiles
- **Leaflet**: Free JavaScript library
- **Esri Satellite**: Free satellite imagery
- **OpenTopoMap**: Free terrain maps

### Features Included
- ✅ Interactive map with multiple layers
- ✅ Trekking location markers
- ✅ Route planning
- ✅ Current location detection
- ✅ Satellite and terrain views
- ✅ Popup information for each location

## 🚀 Getting Started

1. **Weather API Setup**:
   - Get your free OpenWeatherMap API key
   - Update the `WeatherComponent.js` file
   - The weather widget will show real data

2. **Map Setup**:
   - No setup required - works out of the box!
   - Map loads automatically with free tiles

3. **Test the Features**:
   - Weather widget shows current conditions
   - Map displays trekking locations in Nepal
   - Route planning works with current location

## 📱 Current Features

### Weather Component
- Real-time weather data
- 5-day forecast
- Current location weather
- Multiple weather conditions
- Responsive design

### Map Component
- Interactive map with multiple layers
- Trekking destination markers
- Route planning functionality
- Current location detection
- Satellite and terrain views

## 🔧 Troubleshooting

### Weather API Issues
- **"Invalid API key"**: Make sure you've replaced the placeholder with your real API key
- **"API limit exceeded"**: Free tier allows 1000 calls/day - upgrade if needed
- **"Location not found"**: Check if the city name is correct

### Map Issues
- **Map not loading**: Check internet connection
- **Markers not showing**: Refresh the page
- **Location not working**: Allow location permissions in browser

## 💡 Tips

1. **Weather API**: The free tier is perfect for development and small applications
2. **Map API**: OpenStreetMap is completely free and reliable
3. **Performance**: Both APIs are optimized for fast loading
4. **Mobile**: All features work perfectly on mobile devices

## 🔗 Useful Links

- [OpenWeatherMap API Documentation](https://openweathermap.org/api)
- [Leaflet Documentation](https://leafletjs.com/)
- [OpenStreetMap](https://www.openstreetmap.org/)
- [OpenTopoMap](https://opentopomap.org/)

---

**Note**: The application includes fallback data for weather when the API is not configured, so it will always work even without an API key! 