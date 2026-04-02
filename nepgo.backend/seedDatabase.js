const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

require('dotenv').config({ path: path.join(__dirname, '.env') });

const { connectMongo } = require('./lib/mongoConnect');
const { defaultTreks } = require('./data/trekSeedData');
const User = require('./models/User');
const Trek = require('./models/Trek');
const Booking = require('./models/Booking');
const Weather = require('./models/Weather');
const ForumPost = require('./models/ForumPost');
const Feedback = require('./models/Feedback');

/** Optional extra treks: copy `data/treks.import.example.json` → `data/treks.import.json` and edit (no code changes). */
function loadExtraTreksFromFile() {
  const p = path.join(__dirname, 'data', 'treks.import.json');
  if (!fs.existsSync(p)) return [];
  try {
    const raw = JSON.parse(fs.readFileSync(p, 'utf8'));
    const list = Array.isArray(raw) ? raw : raw.treks;
    return Array.isArray(list) ? list : [];
  } catch (e) {
    console.warn('⚠️  Could not read data/treks.import.json:', e.message);
    return [];
  }
}

function dedupeByName(rows) {
  const seen = new Set();
  const out = [];
  for (const t of rows) {
    const n = t && t.name;
    if (!n || seen.has(n)) continue;
    seen.add(n);
    out.push(t);
  }
  return out;
}

const trekData = dedupeByName([...defaultTreks, ...loadExtraTreksFromFile()]);

// Sample user data (plain `password` is hashed before insert)
const userData = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 'password123',
    profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    bio: 'Adventure seeker and mountain lover. Completed 5 treks in Nepal so far!',
    preferredDifficulty: 'Moderate',
    preferredRegions: ['Khumbu', 'Annapurna'],
    preferredSeasons: ['Spring', 'Autumn'],
    budgetRange: 'Medium',
    groupSizePreference: 'Small',
    interests: ['Nature', 'Photography', 'Culture'],
    experienceLevel: 'Moderate',
    totalTreksCompleted: 5,
    totalDistance: 150,
    totalAltitude: 25000,
    favoriteRegion: 'Khumbu',
    isVerified: true,
  },
  {
    firstName: 'Demo',
    lastName: 'Trekker',
    email: 'demo@nepgo.com',
    password: 'nepgo123',
    bio: 'Demo account for NepGo capstone.',
    experienceLevel: 'Moderate',
    isVerified: true,
  },
];

// Seed function (expects an active mongoose connection unless you use runSeedCli)
async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');
    if (mongoose.connection.readyState !== 1) {
      await connectMongo();
    }
    // Clear existing data
    await User.deleteMany({});
    await Trek.deleteMany({});
    await Booking.deleteMany({});
    await Weather.deleteMany({});
    await ForumPost.deleteMany({});
    await Feedback.deleteMany({});

    console.log('✅ Cleared existing data');

    // Create users (hash passwords; strip plain `password`)
    const users = [];
    for (const row of userData) {
      const { password, ...rest } = row;
      const passwordHash = await bcrypt.hash(password || 'password123', 10);
      const doc = await User.create({ ...rest, passwordHash });
      users.push(doc);
    }
    console.log(
      `✅ Created ${users.length} users (try demo@nepgo.com / nepgo123 or john.doe@example.com / password123)`
    );

    // Create treks (8 defaults + optional data/treks.import.json)    const treks = await Trek.create(trekData);
    console.log(`✅ Created ${treks.length} treks`);

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📊 Database Summary:');
    console.log(`- Users: ${users.length}`);
    console.log(`- Treks: ${treks.length}`);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;  } finally {
    mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

if (require.main === module) {
  seedDatabase().catch((err) => {
    console.error('❌', err.message || err);
    process.exit(1);
  });
}

module.exports = { seedDatabase, trekData, userData };