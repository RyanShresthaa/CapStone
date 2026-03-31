const mongoose = require('mongoose');

const trekLogSchema = new mongoose.Schema({
  trekId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trek', required: true },
  completedDate: { type: Date, default: Date.now },
  rating: { type: Number, min: 1, max: 5 },
  review: { type: String },
  photos: [{ type: String }], // URLs to uploaded photos
  companions: [{ type: String }], // Names of trekking companions
  weather: { type: String }, // Weather conditions during trek
  notes: { type: String } // Personal notes about the trek
});

const wishlistItemSchema = new mongoose.Schema({
  trekId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trek', required: true },
  addedAt: { type: Date, default: Date.now },
  plannedDate: { type: Date }, // When user plans to do this trek
  notes: { type: String } // Personal notes about why they want to do this trek
});

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  
  // Profile Information
  profilePicture: { type: String },
  bio: { type: String },
  dateOfBirth: { type: Date },
  phoneNumber: { type: String },
  location: { type: String },
  
  // Trekking Preferences
  preferredDifficulty: { type: String, enum: ['Easy', 'Moderate', 'Challenging'] },
  preferredRegions: [{ type: String }], // ['Khumbu', 'Annapurna', etc.]
  preferredSeasons: [{ type: String }], // ['Spring', 'Summer', 'Autumn', 'Winter']
  budgetRange: { type: String, enum: ['Low', 'Medium', 'High'] },
  groupSizePreference: { type: String, enum: ['Solo', 'Small', 'Medium', 'Large'] },
  interests: [{ type: String }], // ['Culture', 'Nature', 'Adventure', 'Photography']
  
  // Trekking Experience
  experienceLevel: { type: String, enum: ['Beginner', 'Moderate', 'Experienced'] },
  completedTreks: [trekLogSchema],
  wishlist: [wishlistItemSchema],
  
  // Statistics
  totalTreksCompleted: { type: Number, default: 0 },
  totalDistance: { type: Number, default: 0 }, // in kilometers
  totalAltitude: { type: Number, default: 0 }, // in meters
  favoriteRegion: { type: String },
  
  // Security & Privacy
  twoFactorEnabled: { type: Boolean, default: false },
  twoFactorSecret: { type: String },
  twoFactorExpiry: { type: Date },
  consentGiven: { type: Boolean, default: false },
  consentDate: { type: Date },
  
  // Account Status
  isActive: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  resetPasswordToken: { type: String },
  resetPasswordExpiry: { type: Date },
  
  // Social Features
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  
  // Notifications
  emailNotifications: {
    newTreks: { type: Boolean, default: true },
    weatherAlerts: { type: Boolean, default: true },
    communityUpdates: { type: Boolean, default: true },
    promotional: { type: Boolean, default: false }
  },
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  lastLogin: { type: Date }
});

// Update the updatedAt field before saving
userSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for trek completion percentage
userSchema.virtual('completionRate').get(function() {
  if (this.wishlist.length === 0) return 0;
  return Math.round((this.completedTreks.length / this.wishlist.length) * 100);
});

module.exports = mongoose.model('User', userSchema);
