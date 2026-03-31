const fs = require('fs');
const path = require('path');

// Frontend environment configuration
const envConfig = `# API Configuration
REACT_APP_API_URL=http://localhost:5000

# Optional: Google Maps API Key (for enhanced mapping features)
REACT_APP_GOOGLE_MAPS_API_KEY=your-google-maps-api-key

# Optional: OpenWeatherMap API Key (for weather features)
REACT_APP_OPENWEATHER_API_KEY=your-openweather-api-key
`;

// Create .env file
const envPath = path.join(__dirname, '.env');

try {
  if (!fs.existsSync(envPath)) {
    fs.writeFileSync(envPath, envConfig);
    console.log('✅ Created .env file for frontend');
    console.log('📝 API URL set to: http://localhost:5000');
  } else {
    console.log('✅ Frontend .env file already exists');
  }
} catch (error) {
  console.error('❌ Error creating frontend .env file:', error.message);
}

console.log('\n🚀 Frontend setup complete!');
console.log('Next steps:');
console.log('1. Ensure backend server is running on port 5000');
console.log('2. Run: npm start (to start the frontend)');
console.log('3. Open http://localhost:3000 in your browser'); 