const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');
const Trek = require('./models/Trek');
const Booking = require('./models/Booking');
const Weather = require('./models/Weather');
const ForumPost = require('./models/ForumPost');
const Feedback = require('./models/Feedback');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Sample trek data (simplified)
const trekData = [
  {
    name: "Everest Base Camp Trek",
    region: "Khumbu",
    difficulty: "Challenging",
    duration: "14 days",
    altitude: 5364,
    budget: "High",
    minExperience: "Moderate",
    description: "The iconic trek to the base of the world's highest peak",
    highlights: ["Kala Patthar viewpoint", "Namche Bazaar", "Tengboche Monastery"],
    sustainabilityScore: 8,
    bestSeason: "Spring/Autumn",
    groupSize: "2-12 people",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=500",
    weatherLocation: "Everest Base Camp",
    coordinates: { latitude: 28.0026, longitude: 86.8528 },
    tags: ["Everest", "Base Camp", "Khumbu", "Sherpa", "High Altitude"],
    featured: true,
    itinerary: [
      "Day 1: Kathmandu (1,400m) - Arrival & Preparation",
      "Day 2: Kathmandu → Lukla (2,860m) → Phakding (2,610m)",
      "Day 3: Phakding → Namche Bazaar (3,440m)",
      "Day 4: Namche Bazaar - Acclimatization Day",
      "Day 5: Namche → Tengboche (3,860m)",
      "Day 6: Tengboche → Dingboche (4,410m)",
      "Day 7: Dingboche - Acclimatization Day",
      "Day 8: Dingboche → Lobuche (4,940m)",
      "Day 9: Lobuche → Gorak Shep (5,170m) → EBC (5,364m)",
      "Day 10: Gorak Shep → Kala Patthar (5,545m) → Pheriche (4,280m)",
      "Day 11: Pheriche → Namche Bazaar (3,440m)",
      "Day 12: Namche → Phakding (2,610m)",
      "Day 13: Phakding → Lukla (2,860m)",
      "Day 14: Lukla → Kathmandu"
    ],
    reviews: [
      {
        name: "Sarah Johnson",
        rating: 5,
        text: "Absolutely life-changing! The views of Everest were breathtaking."
      },
      {
        name: "Michael Chen",
        rating: 4,
        text: "Challenging but rewarding. The altitude was tough but worth it."
      }
    ],
    accommodation: [
      {
        type: "Tea Houses",
        description: "Basic but comfortable lodges with shared rooms",
        price: "$15-25/night"
      },
      {
        type: "Luxury Lodges",
        description: "Premium accommodation with private rooms and hot showers",
        price: "$80-150/night"
      }
    ]
  },
  {
    name: "Annapurna Circuit Trek",
    region: "Annapurna",
    difficulty: "Moderate",
    duration: "18 days",
    altitude: 5416,
    budget: "Medium",
    minExperience: "Beginner",
    description: "A classic trek around the Annapurna massif",
    highlights: ["Thorong La Pass", "Manang Valley", "Muktinath Temple"],
    sustainabilityScore: 7,
    bestSeason: "Spring/Autumn",
    groupSize: "2-15 people",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500",
    weatherLocation: "Annapurna",
    coordinates: { latitude: 28.5951, longitude: 83.8208 },
    tags: ["Annapurna", "Circuit", "Thorong La", "Manang", "Muktinath"],
    featured: true,
    itinerary: [
      "Day 1: Kathmandu (1,400m) - Arrival & Preparation",
      "Day 2: Kathmandu → Besisahar (760m) → Bhulbhule (840m)",
      "Day 3: Bhulbhule → Jagat (1,300m)",
      "Day 4: Jagat → Dharapani (1,860m)",
      "Day 5: Dharapani → Chame (2,670m)",
      "Day 6: Chame → Pisang (3,200m)",
      "Day 7: Pisang → Manang (3,540m)",
      "Day 8: Manang - Acclimatization Day",
      "Day 9: Manang → Yak Kharka (4,018m)",
      "Day 10: Yak Kharka → Thorong Phedi (4,450m)",
      "Day 11: Thorong Phedi → Thorong La (5,416m) → Muktinath (3,760m)",
      "Day 12: Muktinath → Jomsom (2,720m)",
      "Day 13: Jomsom → Marpha (2,670m)",
      "Day 14: Marpha → Kalopani (2,530m)",
      "Day 15: Kalopani → Tatopani (1,190m)",
      "Day 16: Tatopani → Ghorepani (2,750m)",
      "Day 17: Ghorepani → Poon Hill (3,210m) → Tadapani (2,630m)",
      "Day 18: Tadapani → Nayapul → Pokhara"
    ],
    reviews: [
      {
        name: "David Thompson",
        rating: 5,
        text: "The diversity of landscapes was incredible!"
      },
      {
        name: "Lisa Wang",
        rating: 4,
        text: "Great trek for first-timers. The tea houses were comfortable."
      }
    ],
    accommodation: [
      {
        type: "Tea Houses",
        description: "Well-established lodges with good facilities",
        price: "$10-20/night"
      },
      {
        type: "Guest Houses",
        description: "Comfortable accommodation with attached bathrooms",
        price: "$25-40/night"
      }
    ]
  },
  {
    name: "Langtang Valley Trek",
    region: "Langtang",
    difficulty: "Easy",
    duration: "8 days",
    altitude: 3870,
    budget: "Low",
    minExperience: "Beginner",
    description: "A beautiful valley trek close to Kathmandu",
    highlights: ["Langtang Village", "Kyanjin Gompa", "Local cheese factory"],
    sustainabilityScore: 9,
    bestSeason: "Spring/Autumn/Winter",
    groupSize: "2-10 people",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500",
    weatherLocation: "Langtang",
    coordinates: { latitude: 28.2273, longitude: 85.5214 },
    tags: ["Langtang", "Valley", "Cheese Factory", "Tamang", "Easy"],
    featured: false,
    itinerary: [
      "Day 1: Kathmandu (1,400m) - Arrival & Preparation",
      "Day 2: Kathmandu → Syabrubesi (1,460m)",
      "Day 3: Syabrubesi → Lama Hotel (2,380m)",
      "Day 4: Lama Hotel → Langtang Village (3,430m)",
      "Day 5: Langtang Village → Kyanjin Gompa (3,870m)",
      "Day 6: Kyanjin Gompa - Exploration Day",
      "Day 7: Kyanjin Gompa → Lama Hotel (2,380m)",
      "Day 8: Lama Hotel → Syabrubesi (1,460m)",
      "Day 9: Syabrubesi → Kathmandu"
    ],
    reviews: [
      {
        name: "Maria Garcia",
        rating: 5,
        text: "Perfect for beginners! The Tamang culture was fascinating."
      },
      {
        name: "Alex Kim",
        rating: 4,
        text: "Great introduction to trekking in Nepal."
      }
    ],
    accommodation: [
      {
        type: "Tea Houses",
        description: "Simple but clean lodges with basic amenities",
        price: "$8-15/night"
      },
      {
        type: "Local Guest Houses",
        description: "Family-run accommodation with home-cooked meals",
        price: "$12-20/night"
      }
    ]
  }
];

// Sample user data
const userData = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    passwordHash: "$2b$10$example.hash.here",
    profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    bio: "Adventure seeker and mountain lover. Completed 5 treks in Nepal so far!",
    preferredDifficulty: "Moderate",
    preferredRegions: ["Khumbu", "Annapurna"],
    preferredSeasons: ["Spring", "Autumn"],
    budgetRange: "Medium",
    groupSizePreference: "Small",
    interests: ["Nature", "Photography", "Culture"],
    experienceLevel: "Moderate",
    totalTreksCompleted: 5,
    totalDistance: 150,
    totalAltitude: 25000,
    favoriteRegion: "Khumbu",
    isVerified: true
  }
];

// Seed function
async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Trek.deleteMany({});
    await Booking.deleteMany({});
    await Weather.deleteMany({});
    await ForumPost.deleteMany({});
    await Feedback.deleteMany({});

    console.log('✅ Cleared existing data');

    // Create users
    const users = await User.create(userData);
    console.log(`✅ Created ${users.length} users`);

    // Create treks
    const treks = await Trek.create(trekData);
    console.log(`✅ Created ${treks.length} treks`);

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📊 Database Summary:');
    console.log(`- Users: ${users.length}`);
    console.log(`- Treks: ${treks.length}`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

// Run the seeding
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase, trekData, userData }; 