# 🚀 Complete Database Setup Guide

This guide will help you set up the database and connect it to your NepGo application.

## 📋 Prerequisites

1. **Node.js** (v14 or higher)
2. **npm** or **yarn**
3. **MongoDB** (local or cloud)

## 🔧 Option 1: Local MongoDB Setup

### Step 1: Install MongoDB

#### Windows:
1. Download MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Run the installer and follow the setup wizard
3. Add MongoDB to your system PATH
4. Create data directory: `mkdir C:\data\db`

#### macOS:
```bash
brew install mongodb-community
```

#### Linux (Ubuntu):
```bash
sudo apt update
sudo apt install mongodb
```

### Step 2: Start MongoDB Service

#### Windows:
```bash
# Start MongoDB service
net start MongoDB

# Or start manually
"C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe" --dbpath="C:\data\db"
```

#### macOS/Linux:
```bash
sudo systemctl start mongod
sudo systemctl enable mongod
```

## 🔧 Option 2: MongoDB Atlas (Cloud) - RECOMMENDED

### Step 1: Create MongoDB Atlas Account
1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new cluster (free tier available)

### Step 2: Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database password

### Step 3: Update Environment Variables
Update your `.env` file:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/nepgo
```

## 🚀 Application Setup

### Step 1: Install Dependencies
```bash
# Backend
cd nepgo.backend
npm install

# Frontend
cd ../nepgo
npm install
```

### Step 2: Configure Environment Variables

#### Backend (.env file in nepgo.backend/):
```env
# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/nepgo
# or for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/nepgo

# JWT Secret
JWT_SECRET=nepgo-super-secret-jwt-key-2024

# Email Configuration (optional for 2FA)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Admin Email
ADMIN_EMAIL=admin@nepgo.com

# OpenWeatherMap API Key (optional)
OPENWEATHER_API_KEY=your-openweather-api-key

# Server Port
PORT=5000
```

#### Frontend (.env file in nepgo/):
```env
REACT_APP_API_URL=http://localhost:5000
```

### Step 3: Seed the Database
```bash
cd nepgo.backend
npm run seed
```

### Step 4: Start the Application

#### Terminal 1 - Backend:
```bash
cd nepgo.backend
npm start
```

#### Terminal 2 - Frontend:
```bash
cd nepgo
npm start
```

## 🧪 Testing the Setup

### Test Database Connection:
```bash
cd nepgo.backend
node testConnection.js
```

### Test API Endpoints:
1. Open your browser to `http://localhost:3000`
2. Try registering a new user
3. Try logging in
4. Browse treks and features

## 📊 Database Models

The application includes these models:

1. **User** - User profiles, preferences, trek history
2. **Trek** - Trek information, itineraries, reviews
3. **Booking** - User bookings and reservations
4. **Weather** - Weather data for trek locations
5. **ForumPost** - Community forum posts
6. **Feedback** - User feedback and reviews

## 🔍 Sample Data

The seeding script creates:
- 3 sample treks (Everest Base Camp, Annapurna Circuit, Langtang Valley)
- 1 sample user (John Doe)
- Complete trek details with itineraries and reviews

## 🛠️ Development Commands

```bash
# Backend
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm run seed       # Seed database with sample data
npm test           # Run tests

# Frontend
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
```

## 🚨 Troubleshooting

### MongoDB Connection Issues:
1. **Connection refused**: MongoDB not running
   ```bash
   # Start MongoDB service
   net start MongoDB  # Windows
   sudo systemctl start mongod  # Linux/macOS
   ```

2. **Authentication failed**: Check username/password in connection string

3. **Network timeout**: Check firewall settings or use MongoDB Atlas

### Application Issues:
1. **Port already in use**: Change PORT in .env file
2. **CORS errors**: Ensure frontend URL is correct
3. **JWT errors**: Check JWT_SECRET in .env file

## 📞 Support

If you encounter issues:
1. Check the console logs for error messages
2. Verify all environment variables are set correctly
3. Ensure MongoDB is running and accessible
4. Test API endpoints with Postman or similar tool

## 🎉 Success Indicators

Your setup is complete when:
- ✅ Backend server starts without errors
- ✅ Database connection is successful
- ✅ Frontend loads and connects to backend
- ✅ User registration/login works
- ✅ Trek data is displayed
- ✅ All features are functional

---

**Happy Trekking! 🏔️** 