const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  location: { type: String, required: true },
  region: { type: String, required: true },
  
  // Current Weather
  current: {
    temperature: { type: Number, required: true }, // in Celsius
    feelsLike: { type: Number },
    humidity: { type: Number }, // percentage
    pressure: { type: Number }, // hPa
    windSpeed: { type: Number }, // m/s
    windDirection: { type: String },
    description: { type: String },
    icon: { type: String },
    visibility: { type: Number }, // km
    uvIndex: { type: Number }
  },
  
  // Forecast (next 7 days)
  forecast: [{
    date: { type: Date, required: true },
    day: { type: String },
    high: { type: Number }, // max temperature
    low: { type: Number }, // min temperature
    description: { type: String },
    icon: { type: String },
    humidity: { type: Number },
    windSpeed: { type: Number },
    precipitation: { type: Number }, // mm
    sunrise: { type: String },
    sunset: { type: String }
  }],
  
  // Historical Data
  historical: [{
    date: { type: Date, required: true },
    averageTemp: { type: Number },
    maxTemp: { type: Number },
    minTemp: { type: Number },
    precipitation: { type: Number },
    humidity: { type: Number },
    windSpeed: { type: Number }
  }],
  
  // Seasonal Information
  seasonal: {
    spring: {
      averageTemp: { type: Number },
      rainfall: { type: Number },
      bestTime: { type: String },
      notes: { type: String }
    },
    summer: {
      averageTemp: { type: Number },
      rainfall: { type: Number },
      bestTime: { type: String },
      notes: { type: String }
    },
    autumn: {
      averageTemp: { type: Number },
      rainfall: { type: Number },
      bestTime: { type: String },
      notes: { type: String }
    },
    winter: {
      averageTemp: { type: Number },
      rainfall: { type: Number },
      bestTime: { type: String },
      notes: { type: String }
    }
  },
  
  // Trekking Conditions
  trekkingConditions: {
    current: { type: String, enum: ['Excellent', 'Good', 'Fair', 'Poor', 'Dangerous'] },
    visibility: { type: String, enum: ['Clear', 'Good', 'Moderate', 'Poor', 'Very Poor'] },
    trailCondition: { type: String, enum: ['Dry', 'Wet', 'Muddy', 'Snowy', 'Icy'] },
    avalancheRisk: { type: String, enum: ['None', 'Low', 'Moderate', 'High', 'Extreme'] },
    altitudeSickness: { type: String, enum: ['Low Risk', 'Moderate Risk', 'High Risk'] }
  },
  
  // Alerts and Warnings
  alerts: [{
    type: { type: String, enum: ['Weather Warning', 'Avalanche Warning', 'Trail Closure', 'Health Alert'] },
    severity: { type: String, enum: ['Low', 'Moderate', 'High', 'Extreme'] },
    title: { type: String, required: true },
    description: { type: String, required: true },
    startTime: { type: Date },
    endTime: { type: Date },
    active: { type: Boolean, default: true }
  }],
  
  // Coordinates
  coordinates: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    altitude: { type: Number } // meters above sea level
  },
  
  // Data Source
  dataSource: { type: String, default: 'OpenWeatherMap' },
  lastUpdated: { type: Date, default: Date.now },
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update the updatedAt field before saving
weatherSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  this.lastUpdated = new Date();
  next();
});

// Index for efficient queries
weatherSchema.index({ location: 1, lastUpdated: -1 });
weatherSchema.index({ coordinates: '2dsphere' });

module.exports = mongoose.model('Weather', weatherSchema); 