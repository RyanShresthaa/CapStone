const fs = require('fs');
const path = require('path');

// Environment configuration
const envConfig = `# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/nepgo

# JWT Secret
JWT_SECRET=nepgo-super-secret-jwt-key-2024

# Email Configuration (for 2FA and notifications)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Admin Email (for admin-only features)
ADMIN_EMAIL=admin@nepgo.com

# OpenWeatherMap API Key
OPENWEATHER_API_KEY=your-openweather-api-key

# Server Port
PORT=5000
`;

// Create .env file
const envPath = path.join(__dirname, '.env');

try {
  if (!fs.existsSync(envPath)) {
    fs.writeFileSync(envPath, envConfig);
    console.log('✅ Created .env file with default configuration');
    console.log('📝 Please update the following values in .env:');
    console.log('   - EMAIL_USER: Your Gmail address');
    console.log('   - EMAIL_PASS: Your Gmail app password');
    console.log('   - OPENWEATHER_API_KEY: Your OpenWeatherMap API key');
  } else {
    console.log('✅ .env file already exists');
  }
} catch (error) {
  console.error('❌ Error creating .env file:', error.message);
}

console.log('\n🚀 Next steps:');
console.log('1. Install MongoDB if not already installed');
console.log('2. Start MongoDB service');
console.log('3. Update .env file with your credentials');
console.log('4. Run: npm run seed (to populate database)');
console.log('5. Run: npm start (to start the server)'); 