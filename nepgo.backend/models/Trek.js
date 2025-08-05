const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const accommodationSchema = new mongoose.Schema({
  type: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true }
});

const trekSchema = new mongoose.Schema({
  name: { type: String, required: true },
  region: { type: String, required: true },
  difficulty: { type: String, enum: ['Easy', 'Moderate', 'Challenging'], required: true },
  duration: { type: String, required: true }, // e.g., '14 days'
  altitude: { type: Number, required: true }, // max altitude in meters
  budget: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
  minExperience: { type: String, enum: ['Beginner', 'Moderate', 'Experienced'], required: true },
  description: { type: String, required: true },
  highlights: [{ type: String }],
  sustainabilityScore: { type: Number, min: 0, max: 10, default: 5 },
  bestSeason: { type: String, required: true },
  groupSize: { type: String, required: true },
  image: { type: String, required: true },
  weatherLocation: { type: String, required: true },
  itinerary: [{ type: String }], // Detailed day-by-day itinerary
  reviews: [reviewSchema],
  accommodation: [accommodationSchema],
  coordinates: {
    latitude: { type: Number },
    longitude: { type: Number }
  },
  tags: [{ type: String }], // For search and filtering
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update the updatedAt field before saving
trekSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Trek', trekSchema); 