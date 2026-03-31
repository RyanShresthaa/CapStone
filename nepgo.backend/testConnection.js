const mongoose = require('mongoose');
require('dotenv').config();

async function testConnection() {
  try {
    console.log('🔌 Testing database connection...');
    
    // Check if MONGO_URI is set
    if (!process.env.MONGO_URI) {
      console.error('❌ MONGO_URI not found in environment variables');
      console.log('📝 Please create a .env file with your MongoDB connection string');
      console.log('Example: MONGO_URI=mongodb://localhost:27017/nepgo');
      return;
    }

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Successfully connected to MongoDB');
    
    // Test basic operations
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📊 Available collections:', collections.map(c => c.name));
    
    // Test models
    const User = require('./models/User');
    const Trek = require('./models/Trek');
    const Booking = require('./models/Booking');
    const Weather = require('./models/Weather');
    const ForumPost = require('./models/ForumPost');
    const Feedback = require('./models/Feedback');
    
    console.log('✅ All models loaded successfully');
    
    // Count documents in each collection
    const userCount = await User.countDocuments();
    const trekCount = await Trek.countDocuments();
    const bookingCount = await Booking.countDocuments();
    const weatherCount = await Weather.countDocuments();
    const forumCount = await ForumPost.countDocuments();
    const feedbackCount = await Feedback.countDocuments();
    
    console.log('\n📈 Database Statistics:');
    console.log(`- Users: ${userCount}`);
    console.log(`- Treks: ${trekCount}`);
    console.log(`- Bookings: ${bookingCount}`);
    console.log(`- Weather Records: ${weatherCount}`);
    console.log(`- Forum Posts: ${forumCount}`);
    console.log(`- Feedback: ${feedbackCount}`);
    
    if (trekCount === 0) {
      console.log('\n🌱 No trek data found. Run "npm run seed" to populate the database');
    }
    
    console.log('\n🎉 Database connection test completed successfully!');
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    
    if (error.name === 'MongoNetworkError') {
      console.log('\n🔧 Troubleshooting tips:');
      console.log('1. Make sure MongoDB is running');
      console.log('2. Check your MONGO_URI in .env file');
      console.log('3. For local MongoDB: mongodb://localhost:27017/nepgo');
      console.log('4. For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/nepgo');
    }
    
    if (error.name === 'MongoParseError') {
      console.log('\n🔧 Invalid connection string format');
      console.log('Check your MONGO_URI format in .env file');
    }
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the test
testConnection(); 