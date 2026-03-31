# 🚀 Quick Database Setup

Follow these steps to connect your database:

## 1. Install Dependencies
```bash
cd nepgo.backend
npm install
```

## 2. Create Environment File
Create a `.env` file in the `nepgo.backend/` directory:

```env
# MongoDB Connection (choose one)
MONGO_URI=mongodb://localhost:27017/nepgo
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/nepgo

# JWT Secret
JWT_SECRET=nepgo-super-secret-jwt-key-2024

# Email (optional for now)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Admin Email
ADMIN_EMAIL=admin@nepgo.com

# Weather API (optional for now)
OPENWEATHER_API_KEY=your-openweather-api-key

# Server Port
PORT=5000
```

## 3. Test Database Connection
```bash
npm run test-db
```

## 4. Start the Server
```bash
npm run dev
```

## 5. Seed the Database (Optional)
```bash
npm run seed
```

## 🗄️ MongoDB Options

### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use: `MONGO_URI=mongodb://localhost:27017/nepgo`

### Option B: MongoDB Atlas (Cloud)
1. Create free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a cluster
3. Get connection string
4. Use: `MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/nepgo`

## ✅ Success Indicators
- ✅ Database connection test passes
- ✅ Server starts without errors
- ✅ API endpoints respond
- ✅ Sample data loads (after seeding)

## 🆘 Common Issues
- **Connection failed**: Check if MongoDB is running
- **Invalid URI**: Verify your connection string format
- **Missing .env**: Create the environment file
- **Port in use**: Change PORT in .env file

## 🔗 API Testing
Once connected, test these endpoints:
- `GET http://localhost:5000/api/treks` - Get all treks
- `POST http://localhost:5000/register` - Register user
- `POST http://localhost:5000/login` - Login user

---
**Need help?** Check the full `DATABASE_SETUP.md` guide for detailed instructions. 