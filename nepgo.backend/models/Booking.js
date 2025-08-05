const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  trek: { type: mongoose.Schema.Types.ObjectId, ref: 'Trek', required: true },
  
  // Booking Details
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  numberOfPeople: { type: Number, required: true, min: 1 },
  groupSize: { type: String, enum: ['Solo', 'Small', 'Medium', 'Large'] },
  
  // Accommodation Preferences
  accommodationType: { type: String, required: true },
  specialRequirements: { type: String },
  
  // Pricing
  totalAmount: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  depositAmount: { type: Number, required: true },
  depositPaid: { type: Boolean, default: false },
  fullPaymentPaid: { type: Boolean, default: false },
  
  // Payment Information
  paymentMethod: { type: String, enum: ['Credit Card', 'PayPal', 'Bank Transfer', 'Cash'] },
  paymentStatus: { type: String, enum: ['Pending', 'Partial', 'Completed', 'Failed', 'Refunded'], default: 'Pending' },
  transactionId: { type: String },
  
  // Booking Status
  status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed', 'No Show'], default: 'Pending' },
  cancellationReason: { type: String },
  cancellationDate: { type: Date },
  
  // Guide Information
  assignedGuide: { type: String },
  guideContact: { type: String },
  
  // Emergency Contact
  emergencyContact: {
    name: { type: String, required: true },
    relationship: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String }
  },
  
  // Insurance
  insuranceIncluded: { type: Boolean, default: false },
  insuranceProvider: { type: String },
  insurancePolicyNumber: { type: String },
  
  // Additional Services
  additionalServices: [{
    name: { type: String },
    description: { type: String },
    cost: { type: Number }
  }],
  
  // Notes
  customerNotes: { type: String },
  adminNotes: { type: String },
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  confirmedAt: { type: Date },
  cancelledAt: { type: Date }
});

// Update the updatedAt field before saving
bookingSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Virtual for booking duration
bookingSchema.virtual('duration').get(function() {
  const diffTime = Math.abs(this.endDate - this.startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

// Virtual for remaining balance
bookingSchema.virtual('remainingBalance').get(function() {
  return this.totalAmount - this.depositAmount;
});

module.exports = mongoose.model('Booking', bookingSchema); 