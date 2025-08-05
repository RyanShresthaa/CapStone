const fs = require('fs');
const path = require('path');

console.log('☁️  MongoDB Atlas Quick Setup for NepGo\n');

console.log('📋 Follow these steps to get your app running:\n');

console.log('1️⃣  Create MongoDB Atlas Account:');
console.log('   🔗 Go to: https://www.mongodb.com/atlas');
console.log('   📝 Sign up for a free account\n');

console.log('2️⃣  Create a Cluster:');
console.log('   🏗️  Click "Build a Database"');
console.log('   🆓 Choose "FREE" tier (M0)');
console.log('   🌍 Select a cloud provider and region');
console.log('   ✅ Click "Create"\n');

console.log('3️⃣  Create Database User:');
console.log('   👤 Go to "Database Access"');
console.log('   ➕ Click "Add New Database User"');
console.log('   🔐 Choose "Password" authentication');
console.log('   📝 Create username and password (save these!)');
console.log('   ✅ Click "Add User"\n');

console.log('4️⃣  Get Connection String:');
console.log('   🔗 Go to "Database" tab');
console.log('   🔌 Click "Connect"');
console.log('   📱 Choose "Connect your application"');
console.log('   📋 Copy the connection string\n');

console.log('5️⃣  Update Environment File:');
console.log('   📁 Open: nepgo.backend/.env');
console.log('   🔄 Replace MONGO_URI with your Atlas connection string');
console.log('   💡 Format: mongodb+srv://username:password@cluster.mongodb.net/nepgo\n');

console.log('6️⃣  Start the Application:');
console.log('   🚀 Run: node start-application.js\n');

console.log('🎯 Example Connection String:');
console.log('MONGO_URI=mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/nepgo\n');

console.log('💡 Tips:');
console.log('   - Replace <password> with your actual password');
console.log('   - Replace <username> with your actual username');
console.log('   - The "nepgo" at the end is your database name');
console.log('   - Keep your connection string secure!\n');

console.log('🚀 Ready to start? Run: node start-application.js'); 