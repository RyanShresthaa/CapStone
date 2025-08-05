const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

// Simple JWT secret
const JWT_SECRET = 'nepgo-super-secret-jwt-key-2024';

// Mock user data (in-memory storage)
const users = [
  {
    id: 1,
    firstName: 'Ryan',
    lastName: 'Shrestha',
    email: 'ryanshr02@gmail.com',
    passwordHash: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // password: ryan123
  },
  {
    id: 2,
    firstName: 'Sanjiwani',
    lastName: 'Shrestha',
    email: 'sanjiwani@gmail.com',
    passwordHash: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // password: sanjiwani123
  },
  {
    id: 3,
  }
];

// Mock trek data
const treks = [
  {
    id: 1,
    name: 'Everest Base Camp',
    location: 'Khumbu, Nepal',
    description: 'The classic trek to the foot of the world\'s highest mountain.',
    rating: 4.9,
    duration: '14 days',
    difficulty: 'Challenging',
    price: 1299,
    image: '/mountain.jpg'
  },
  {
    id: 2,
    name: 'Annapurna Circuit',
    location: 'Annapurna, Nepal',
    description: 'Circle the massive Annapurna massif and experience cultural diversity.',
    rating: 4.7,
    duration: '18 days',
    difficulty: 'Moderate',
    price: 999,
    image: '/background-mountains.jpg'
  },
  {
    id: 3,
    name: 'Langtang Valley',
    location: 'Langtang, Nepal',
    description: 'Stunning valleys and Tamang heritage just north of Kathmandu.',
    rating: 4.6,
    duration: '10 days',
    difficulty: 'Easy',
    price: 699,
    image: '/mountain.jpg'
  }
];

// Register
app.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const existing = users.find(u => u.email === email);
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hash = await bcrypt.hash(password, 10);
    const newUser = {
      id: users.length + 1,
      firstName,
      lastName,
      email,
      passwordHash: hash
    };
    users.push(newUser);

    const token = jwt.sign({ email: newUser.email }, JWT_SECRET, { expiresIn: '2h' });
    res.json({ token, email: newUser.email });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = users.find(u => u.email === email);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '2h' });
    res.json({ token, email: user.email });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all treks
app.get('/api/treks', (req, res) => {
  res.json(treks);
});

// Get featured treks
app.get('/api/treks/featured', (req, res) => {
  res.json(treks.slice(0, 3));
});

// Get trek by ID
app.get('/api/treks/:id', (req, res) => {
  const trek = treks.find(t => t.id === parseInt(req.params.id));
  if (!trek) return res.status(404).json({ message: 'Trek not found' });
  res.json(trek);
});

// Search treks
app.get('/api/treks/search', (req, res) => {
  const { query } = req.query;
  if (!query) return res.json(treks);
  
  const filtered = treks.filter(trek => 
    trek.name.toLowerCase().includes(query.toLowerCase()) ||
    trek.location.toLowerCase().includes(query.toLowerCase())
  );
  res.json(filtered);
});

// Get recommendations
app.get('/api/recommendations', (req, res) => {
  res.json({ recommendations: treks.slice(0, 2) });
});

// User profile
app.get('/api/user/profile', (req, res) => {
  res.json({
    firstName: 'Ryan',
    lastName: 'Shrestha',
    email: 'ryanshr02@gmail.com',
    experienceLevel: 'Moderate',
    completedTreks: 5
  });
});

// User wishlist
app.get('/api/user/wishlist', (req, res) => {
  res.json([]);
});

// User bookings
app.get('/api/user/bookings', (req, res) => {
  res.json([]);
});

// Forum posts
app.get('/api/forum/posts', (req, res) => {
  res.json([]);
});

// Weather API
app.get('/api/weather', (req, res) => {
  res.json({
    weather: {
      temperature: 15,
      condition: 'Sunny',
      humidity: 60
    }
  });
});

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'NepGo API is running!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;
