const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');

// Connect to MongoDB
mongoose.connect('mongodb+srv://ryanshr02:ryan123@cluster0.3zodk4z.mongodb.net/nepgo')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

async function testLogin() {
  try {
    // Check if any users exist
    const userCount = await User.countDocuments();
    console.log('Total users in database:', userCount);
    
    if (userCount === 0) {
      console.log('No users found. Creating a test user...');
      
      // Create a test user
      const hashedPassword = await bcrypt.hash('test123', 10);
      const testUser = new User({
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        passwordHash: hashedPassword
      });
      
      await testUser.save();
      console.log('✅ Test user created successfully');
    }
    
    // Test login
    const testEmail = 'test@example.com';
    const testPassword = 'test123';
    
    const user = await User.findOne({ email: testEmail });
    if (user) {
      const match = await bcrypt.compare(testPassword, user.passwordHash);
      console.log('Password match:', match);
    } else {
      console.log('User not found');
    }
    
  } catch (error) {
    console.error('Test error:', error);
  } finally {
    mongoose.connection.close();
  }
}

testLogin(); 