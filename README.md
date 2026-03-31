# 🏔️ NepGo - Complete Trekking Platform

A full-stack web application for trekking enthusiasts to discover, plan, and book treks in Nepal. Built with React frontend and Node.js backend with MongoDB database integration.

## ✨ Features

### 🎯 Core Features
- **User Authentication** - Secure registration, login, and password reset
- **Trek Discovery** - Browse and search treks with advanced filters
- **Personalized Recommendations** - AI-powered trek suggestions based on preferences
- **Trip Planning** - Interactive planning tools with maps and itineraries
- **Booking System** - Complete booking management with status tracking
- **Community Forums** - User discussions and trekking experiences
- **Weather Integration** - Real-time weather data for trek locations
- **User Profiles** - Comprehensive user profiles with trek history

### 🔧 Technical Features
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Real-time Updates** - Live data synchronization
- **Search & Filtering** - Advanced search with multiple criteria
- **Interactive Maps** - Location-based trek visualization
- **Two-Factor Authentication** - Enhanced security (optional)
- **Admin Panel** - Content management and user administration

## 🚀 Quick Start

### Option 1: One-Click Setup (Recommended)
```bash
# Clone the repository
git clone <repository-url>
cd CapStone

# Run the automated setup
node start-application.js
```

### Option 2: Manual Setup

#### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud)

#### Step 1: Install Dependencies
```bash
# Backend
cd nepgo.backend
npm install

# Frontend
cd ../nepgo
npm install
```

#### Step 2: Configure Environment
```bash
# Backend environment
cd nepgo.backend
node setup-env.js

# Frontend environment
cd ../nepgo
node setup-env.js
```

#### Step 3: Set Up Database
```bash
# Option A: Local MongoDB
# Install MongoDB from https://www.mongodb.com/try/download/community
# Start MongoDB service

# Option B: MongoDB Atlas (Cloud)
# Create account at https://www.mongodb.com/atlas
# Update MONGO_URI in nepgo.backend/.env
```

#### Step 4: Seed Database
```bash
cd nepgo.backend
npm run seed
```

#### Step 5: Start Application
```bash
# Terminal 1 - Backend
cd nepgo.backend
npm start

# Terminal 2 - Frontend
cd nepgo
npm start
```

## 📊 Database Schema

### User Model
- Profile information (name, email, bio, preferences)
- Trekking history and statistics
- Wishlist and completed treks
- Security settings (2FA, consent)

### Trek Model
- Basic information (name, region, difficulty, duration)
- Detailed descriptions and highlights
- Itineraries and accommodation options
- Reviews and ratings
- Coordinates and weather data

### Booking Model
- Booking details and dates
- Payment information
- Status tracking
- Cancellation management

### Additional Models
- **Weather** - Weather data for locations
- **ForumPost** - Community discussions
- **Feedback** - User reviews and ratings

## 🔌 API Endpoints

### Authentication
- `POST /register` - User registration
- `POST /login` - User login
- `POST /forgot-password` - Password reset
- `POST /reset-password` - Password reset confirmation

### Trek Management
- `GET /api/treks` - Get all treks
- `GET /api/treks/:id` - Get trek details
- `GET /api/treks/search` - Search treks
- `GET /api/treks/featured` - Featured treks
- `GET /api/recommendations` - Personalized recommendations

### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update profile
- `GET /api/user/wishlist` - Get wishlist
- `POST /api/user/wishlist` - Add to wishlist

### Booking System
- `POST /api/bookings` - Create booking
- `GET /api/user/bookings` - Get user bookings
- `PUT /api/bookings/:id/cancel` - Cancel booking

### Community Features
- `POST /api/forum/posts` - Create forum post
- `GET /api/forum/posts` - Get forum posts
- `POST /api/forum/posts/:id/comments` - Add comment

## 🎨 Frontend Architecture

### Components Structure
```
src/
├── components/          # Reusable UI components
│   ├── Auth/           # Authentication components
│   ├── Trek/           # Trek-related components
│   ├── Booking/        # Booking components
│   ├── Community/      # Forum components
│   └── UI/             # General UI components
├── contexts/           # React contexts
│   ├── AuthContext.js  # Authentication state
│   ├── DataContext.js  # Application data
│   └── ThemeContext.js # Theme management
├── services/           # API services
│   └── api.js         # API client and endpoints
└── pages/             # Page components
```

### Key Features
- **Context API** - Global state management
- **Custom Hooks** - Reusable logic
- **Responsive Design** - Mobile-first approach
- **Error Handling** - Comprehensive error management
- **Loading States** - User feedback during operations

## 🔧 Backend Architecture

### Server Structure
```
nepgo.backend/
├── models/             # Database models
├── middleware/         # Custom middleware
├── routes/            # API route handlers
├── utils/             # Utility functions
└── server.js          # Main server file
```

### Key Features
- **Express.js** - Web framework
- **MongoDB/Mongoose** - Database ORM
- **JWT Authentication** - Token-based auth
- **CORS Support** - Cross-origin requests
- **Error Handling** - Centralized error management
- **Validation** - Input validation and sanitization

## 🛠️ Development Commands

### Backend
```bash
cd nepgo.backend
npm start          # Start production server
npm run dev        # Start development server
npm run seed       # Seed database
npm test           # Run tests
```

### Frontend
```bash
cd nepgo
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
```

## 🔐 Security Features

- **Password Hashing** - Bcrypt with salt rounds
- **JWT Tokens** - Secure authentication
- **CORS Protection** - Cross-origin security
- **Input Validation** - Data sanitization
- **Rate Limiting** - API protection
- **2FA Support** - Two-factor authentication

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop** - Full feature set with advanced UI
- **Tablet** - Touch-optimized interface
- **Mobile** - Streamlined mobile experience

## 🎯 User Experience

### For Trek Enthusiasts
- Discover new treks with advanced search
- Get personalized recommendations
- Plan trips with interactive tools
- Book treks with secure payment
- Share experiences in community forums

### For Administrators
- Manage trek content and information
- Monitor user activity and bookings
- Moderate community discussions
- Generate reports and analytics

## 🚨 Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Check if MongoDB is running
   - Verify connection string in .env
   - Ensure network connectivity

2. **Port Already in Use**
   - Change PORT in environment variables
   - Kill existing processes on the port

3. **CORS Errors**
   - Verify frontend URL in backend CORS settings
   - Check API base URL configuration

4. **Authentication Issues**
   - Clear browser storage
   - Check JWT token expiration
   - Verify environment variables

### Getting Help
1. Check the console logs for error messages
2. Verify all environment variables are set
3. Ensure MongoDB is running and accessible
4. Test API endpoints with Postman

## 📈 Performance Optimization

- **Database Indexing** - Optimized queries
- **Caching** - Weather and static data caching
- **Compression** - Response compression
- **Lazy Loading** - Component and image optimization
- **CDN Integration** - Static asset delivery

## 🔄 Deployment

### Environment Variables
```env
# Backend (.env)
MONGO_URI=mongodb://localhost:27017/nepgo
JWT_SECRET=your-secret-key
PORT=5000

# Frontend (.env)
REACT_APP_API_URL=http://localhost:5000
```

### Production Build
```bash
# Backend
cd nepgo.backend
npm start

# Frontend
cd nepgo
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🏔️ About NepGo

NepGo is designed to be the ultimate platform for trekking enthusiasts visiting Nepal. It combines modern web technologies with comprehensive trekking information to provide an exceptional user experience.

---

**Happy Trekking! 🏔️** 