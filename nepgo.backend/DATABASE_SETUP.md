# 🗄️ Database Setup Guide

This guide will help you set up and populate the MongoDB database for the NepGo trekking platform.

## 📋 Prerequisites

1. **MongoDB** installed and running locally, or a MongoDB Atlas account
2. **Node.js** and **npm** installed
3. **Environment variables** configured

## 🔧 Environment Setup

Create a `.env` file in the `nepgo.backend/` directory:

```env
# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/nepgo
# or for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/nepgo

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-here

# Email Configuration (for 2FA and notifications)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Admin Email (for admin-only features)
ADMIN_EMAIL=admin@nepgo.com

# OpenWeatherMap API Key
OPENWEATHER_API_KEY=your-openweather-api-key

# Server Port
PORT=5000
```

## 🚀 Installation

1. **Install dependencies:**
   ```bash
   cd nepgo.backend
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Seed the database:**
   ```bash
   node seedDatabase.js
   ```

## 📊 Database Models

### 1. **User Model** (`models/User.js`)
- **Profile Information**: Name, email, bio, profile picture
- **Trekking Preferences**: Difficulty, regions, seasons, budget
- **Experience**: Completed treks, wishlist, statistics
- **Security**: Password hashing, 2FA, consent management
- **Social Features**: Followers, following, notifications

### 2. **Trek Model** (`models/Trek.js`)
- **Basic Info**: Name, region, difficulty, duration, altitude
- **Details**: Description, highlights, sustainability score
- **Practical Info**: Budget, group size, best season, accommodation
- **Content**: Detailed itinerary, reviews, images
- **Metadata**: Coordinates, tags, featured status

### 3. **Booking Model** (`models/Booking.js`)
- **Booking Details**: Dates, group size, accommodation preferences
- **Payment**: Total amount, deposit, payment status
- **Status**: Confirmed, cancelled, completed
- **Additional**: Emergency contacts, insurance, guide info

### 4. **Weather Model** (`models/Weather.js`)
- **Current Weather**: Temperature, humidity, wind, visibility
- **Forecast**: 7-day weather predictions
- **Historical Data**: Past weather patterns
- **Trekking Conditions**: Trail conditions, avalanche risk, altitude sickness risk
- **Alerts**: Weather warnings and safety alerts

### 5. **ForumPost Model** (`models/ForumPost.js`)
- **Content**: Title, content, author
- **Engagement**: Likes, comments, badges
- **Moderation**: Admin features for content management

### 6. **Feedback Model** (`models/Feedback.js`)
- **Reviews**: Rating, comments, trek references
- **User Tracking**: Optional user association
- **Admin Access**: Admin-only viewing for management

## 🔌 API Endpoints

### Authentication
- `POST /register` - User registration
- `POST /login` - User login
- `POST /forgot-password` - Password reset request
- `POST /reset-password` - Password reset
- `POST /api/enable-2fa` - Enable two-factor authentication
- `POST /api/verify-2fa` - Verify 2FA code

### Trek Management
- `GET /api/treks` - Get all treks
- `GET /api/treks/:id` - Get trek by ID
- `GET /api/treks/search` - Search treks with filters
- `GET /api/treks/featured` - Get featured treks
- `GET /api/recommendations` - Get personalized recommendations

### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `GET /api/user/wishlist` - Get user wishlist
- `POST /api/user/wishlist` - Add trek to wishlist
- `DELETE /api/user/wishlist/:trekId` - Remove from wishlist

### Booking Management
- `POST /api/bookings` - Create booking
- `GET /api/user/bookings` - Get user bookings
- `GET /api/bookings/:id` - Get booking details
- `PUT /api/bookings/:id/cancel` - Cancel booking

### Community Features
- `POST /api/forum/posts` - Create forum post
- `GET /api/forum/posts` - Get all forum posts
- `POST /api/forum/posts/:id/comments` - Add comment
- `POST /api/forum/posts/:id/like` - Like post
- `POST /api/feedback` - Submit feedback

### Weather & External APIs
- `GET /api/weather` - Get weather data for location

## 🌱 Database Seeding

The `seedDatabase.js` script populates the database with:

### Sample Data Included:
- **3 Trek Records**: Everest Base Camp, Annapurna Circuit, Langtang Valley
- **1 User Account**: John Doe (moderate experience trekker)
- **Complete Trek Details**: Itineraries, reviews, accommodation options
- **Coordinates**: GPS coordinates for mapping
- **Tags**: Searchable tags for filtering

### To Add More Data:
1. Edit the `trekData` array in `seedDatabase.js`
2. Add more trek objects with complete information
3. Run `node seedDatabase.js` again

## 🔍 Sample Queries

### Find treks by difficulty:
```javascript
const easyTreks = await Trek.find({ difficulty: 'Easy' });
```

### Search treks by region:
```javascript
const khumbuTreks = await Trek.find({ region: 'Khumbu' });
```

### Get user's wishlist:
```javascript
const user = await User.findOne({ email: 'user@example.com' }).populate('wishlist.trekId');
```

### Find bookings for a user:
```javascript
const bookings = await Booking.find({ user: userId }).populate('trek');
```

## 🛠️ Development Commands

```bash
# Start development server with nodemon
npm run dev

# Run tests
npm test

# Seed database
node seedDatabase.js

# Clear database (be careful!)
node -e "require('./models/Trek').deleteMany({}).then(() => console.log('Cleared'))"
```

## 🔐 Security Features

- **Password Hashing**: Bcrypt with salt rounds
- **JWT Authentication**: Secure token-based auth
- **2FA Support**: Email-based two-factor authentication
- **Input Validation**: Mongoose schema validation
- **CORS Protection**: Cross-origin request handling
- **Rate Limiting**: Built-in Express rate limiting

## 📈 Performance Optimization

- **Database Indexing**: Optimized queries with indexes
- **Population**: Efficient data relationships
- **Pagination**: Large dataset handling
- **Caching**: Weather data caching
- **Compression**: Response compression

## 🚨 Troubleshooting

### Common Issues:

1. **MongoDB Connection Failed**
   - Check if MongoDB is running
   - Verify MONGO_URI in .env file
   - Ensure network connectivity

2. **JWT Token Invalid**
   - Check JWT_SECRET in .env
   - Verify token expiration
   - Ensure proper token format

3. **Weather API Errors**
   - Verify OPENWEATHER_API_KEY
   - Check API quota limits
   - Ensure location names are valid

4. **Email Not Sending**
   - Check EMAIL_USER and EMAIL_PASS
   - Enable "Less secure app access" for Gmail
   - Use App Passwords for 2FA-enabled accounts

## 📞 Support

For database-related issues:
1. Check the MongoDB logs
2. Verify environment variables
3. Test API endpoints with Postman
4. Review the server console for errors

## 🔄 Database Migrations

To update the database schema:
1. Modify the model files
2. Update the seeding script
3. Run `node seedDatabase.js` to reset and repopulate
4. Test all API endpoints

---

**Happy Trekking! 🏔️** 