const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🔧 MongoDB Atlas Connection Setup\n');

console.log('📝 Please provide your MongoDB Atlas connection details:\n');

rl.question('Enter your MongoDB Atlas connection string: ', (connectionString) => {
  if (!connectionString || !connectionString.includes('mongodb+srv://')) {
    console.log('❌ Invalid connection string. Please provide a valid MongoDB Atlas connection string.');
    console.log('Example: mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/nepgo');
    rl.close();
    return;
  }

  // Read the current .env file
  const envPath = path.join(__dirname, '..', 'nepgo.backend', '.env');
  
  try {
    let envContent = '';
    
    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, 'utf8');
    } else {
      // Create default .env content
      envContent = `# MongoDB Connection
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
    }

    // Update the MONGO_URI
    const updatedContent = envContent.replace(
      /MONGO_URI=.*/,
      `MONGO_URI=${connectionString}`
    );

    // Write the updated content
    fs.writeFileSync(envPath, updatedContent);

    console.log('\n✅ Successfully updated MongoDB connection!');
    console.log('📁 Updated file: nepgo.backend/.env');
    console.log('\n🚀 You can now start the application:');
    console.log('   node start-application.js');

  } catch (error) {
    console.error('❌ Error updating environment file:', error.message);
  }

  rl.close();
}); 