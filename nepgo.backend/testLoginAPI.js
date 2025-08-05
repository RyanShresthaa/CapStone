const axios = require('axios');

async function testLoginAPI() {
  try {
    console.log('Testing login API...');
    
    const loginData = {
      email: 'ryanshr02@gmail.com',
      password: 'ryan123'
    };
    
    console.log('Sending login request with:', loginData);
    
    const response = await axios.post('http://localhost:5000/login', loginData);
    
    console.log('✅ Login successful!');
    console.log('Response:', response.data);
    
  } catch (error) {
    console.error('❌ Login failed:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error('Error:', error.message);
    }
  }
}

testLoginAPI(); 