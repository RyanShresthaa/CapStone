const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');

// Connect to MongoDB
mongoose.connect('mongodb+srv://ryanshr02:ryan123@cluster0.3zodk4z.mongodb.net/nepgo')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

async function resetPassword() {
  try {
    const email = 'ryanshr02@gmail.com';
    const newPassword = 'ryan123';
    
    // Find the user
    const user = await User.findOne({ email });
    if (!user) {
      console.log('❌ User not found:', email);
      return;
    }
    
    console.log('✅ Found user:', user.email);
    
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update the user's password
    user.passwordHash = hashedPassword;
    await user.save();
    
    console.log('✅ Password reset successfully for:', email);
    console.log('New password:', newPassword);
    
  } catch (error) {
    console.error('❌ Error resetting password:', error);
  } finally {
    mongoose.connection.close();
  }
}

resetPassword(); 