const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');

// Connect to MongoDB
mongoose.connect('mongodb+srv://ryanshr02:ryan123@cluster0.3zodk4z.mongodb.net/nepgo')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

async function verifyPassword() {
  try {
    const email = 'ryanshr02@gmail.com';
    const testPassword = 'ryan123';
    
    // Find the user
    const user = await User.findOne({ email });
    if (!user) {
      console.log('❌ User not found:', email);
      return;
    }
    
    console.log('✅ Found user:', user.email);
    console.log('Password hash length:', user.passwordHash.length);
    
    // Test password verification
    const match = await bcrypt.compare(testPassword, user.passwordHash);
    console.log('Password match:', match);
    
    if (match) {
      console.log('✅ Password verification successful!');
    } else {
      console.log('❌ Password verification failed!');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    mongoose.connection.close();
  }
}

verifyPassword(); 