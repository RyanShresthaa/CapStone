import React, { useState } from 'react';
import { FaTimes, FaCalendarAlt, FaUsers, FaCreditCard, FaCheck, FaHotel, FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import './BookingModal.css';

const BookingModal = ({ accommodation, isOpen, onClose, onBookingComplete }) => {
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    roomType: 'standard',
    specialRequests: '',
    contactName: '',
    contactEmail: '',
    contactPhone: ''
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const roomTypes = [
    { value: 'standard', label: 'Standard Room', price: accommodation?.price || 0 },
    { value: 'deluxe', label: 'Deluxe Room', price: (accommodation?.price || 0) * 1.3 },
    { value: 'suite', label: 'Suite', price: (accommodation?.price || 0) * 1.8 }
  ];

  const selectedRoom = roomTypes.find(room => room.value === bookingData.roomType);
  const nights = bookingData.checkIn && bookingData.checkOut 
    ? Math.ceil((new Date(bookingData.checkOut) - new Date(bookingData.checkIn)) / (1000 * 60 * 60 * 24))
    : 0;
  const totalPrice = selectedRoom ? selectedRoom.price * nights * bookingData.guests : 0;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDatePickerClick = (field) => {
    const input = document.querySelector(`input[name="${field}"]`);
    if (input) {
      input.showPicker();
    }
  };

  const handleNext = () => {
    if (currentStep === 1 && (!bookingData.checkIn || !bookingData.checkOut || !bookingData.guests)) {
      alert('Please fill in all required fields');
      return;
    }
    if (currentStep === 2 && (!bookingData.contactName || !bookingData.contactEmail || !bookingData.contactPhone)) {
      alert('Please fill in all contact information');
      return;
    }
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setBookingSuccess(true);
      
      // Call the callback with booking details
      if (onBookingComplete) {
        onBookingComplete({
          ...bookingData,
          accommodation: accommodation,
          totalPrice: totalPrice,
          bookingId: `BK${Date.now()}`,
          bookingDate: new Date().toISOString()
        });
      }
      
      // Close modal after 3 seconds
      setTimeout(() => {
        onClose();
        setBookingSuccess(false);
        setCurrentStep(1);
        setBookingData({
          checkIn: '',
          checkOut: '',
          guests: 1,
          roomType: 'standard',
          specialRequests: '',
          contactName: '',
          contactEmail: '',
          contactPhone: ''
        });
      }, 3000);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="booking-modal-overlay">
      <div className="booking-modal modal-scrollbar">
        <div className="booking-modal-header">
          <h2>Book Accommodation</h2>
          <button className="close-modal-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        {bookingSuccess ? (
          <div className="booking-success">
            <div className="success-icon">
              <FaCheck />
            </div>
            <h3>Booking Confirmed!</h3>
            <p>Your booking has been successfully confirmed. You will receive a confirmation email shortly.</p>
            <div className="booking-summary">
              <p><strong>Booking ID:</strong> BK{Date.now()}</p>
              <p><strong>Total Amount:</strong> ${totalPrice}</p>
            </div>
          </div>
        ) : (
          <>
            {/* Progress Steps */}
            <div className="booking-progress">
              <div className={`progress-step ${currentStep >= 1 ? 'active' : ''}`}>
                <span className="step-number">1</span>
                <span className="step-label">Dates & Guests</span>
              </div>
              <div className={`progress-step ${currentStep >= 2 ? 'active' : ''}`}>
                <span className="step-number">2</span>
                <span className="step-label">Contact Info</span>
              </div>
              <div className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}>
                <span className="step-number">3</span>
                <span className="step-label">Review & Pay</span>
              </div>
            </div>

            {/* Step 1: Dates and Guests */}
            {currentStep === 1 && (
              <div className="booking-step">
                <div className="form-group">
                  <label>Check-in Date *</label>
                  <input
                    type="date"
                    name="checkIn"
                    value={bookingData.checkIn}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Check-out Date *</label>
                  <input
                    type="date"
                    name="checkOut"
                    value={bookingData.checkOut}
                    onChange={handleInputChange}
                    min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Number of Guests *</label>
                  <input
                    type="number"
                    name="guests"
                    value={bookingData.guests}
                    onChange={handleInputChange}
                    min="1"
                    max="10"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Room Type</label>
                  <select name="roomType" value={bookingData.roomType} onChange={handleInputChange}>
                    {roomTypes.map(room => (
                      <option key={room.value} value={room.value}>
                        {room.label} - ${room.price}/night
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Special Requests</label>
                  <textarea
                    name="specialRequests"
                    value={bookingData.specialRequests}
                    onChange={handleInputChange}
                    placeholder="Any special requests or requirements..."
                    rows="3"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Contact Information */}
            {currentStep === 2 && (
              <div className="booking-step">
                <h3>Contact Information</h3>
                
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="contactName"
                    value={bookingData.contactName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={bookingData.contactEmail}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={bookingData.contactPhone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 3: Review and Payment */}
            {currentStep === 3 && (
              <div className="booking-step">
                <h3>Review Your Booking</h3>
                
                <div className="booking-details">
                  <div className="detail-section">
                    <h4>Accommodation Details</h4>
                    <p><strong>Property:</strong> {accommodation?.name}</p>
                    <p><strong>Location:</strong> {accommodation?.location}</p>
                    <p><strong>Room Type:</strong> {selectedRoom?.label}</p>
                  </div>

                  <div className="detail-section">
                    <h4>Stay Details</h4>
                    <p><strong>Check-in:</strong> {bookingData.checkIn}</p>
                    <p><strong>Check-out:</strong> {bookingData.checkOut}</p>
                    <p><strong>Nights:</strong> {nights}</p>
                    <p><strong>Guests:</strong> {bookingData.guests}</p>
                  </div>

                  <div className="detail-section">
                    <h4>Contact Information</h4>
                    <p><strong>Name:</strong> {bookingData.contactName}</p>
                    <p><strong>Email:</strong> {bookingData.contactEmail}</p>
                    <p><strong>Phone:</strong> {bookingData.contactPhone}</p>
                  </div>

                  {bookingData.specialRequests && (
                    <div className="detail-section">
                      <h4>Special Requests</h4>
                      <p>{bookingData.specialRequests}</p>
                    </div>
                  )}
                </div>

                <div className="price-breakdown">
                  <h4>Price Breakdown</h4>
                  <div className="price-item">
                    <span>Room Rate (${selectedRoom?.price}/night × {nights} nights)</span>
                    <span>${selectedRoom?.price * nights}</span>
                  </div>
                  <div className="price-item">
                    <span>Number of Guests</span>
                    <span>× {bookingData.guests}</span>
                  </div>
                  <div className="price-total">
                    <span>Total Amount</span>
                    <span>${totalPrice}</span>
                  </div>
                </div>

                <div className="payment-section">
                  <h4>Payment Method</h4>
                  <div className="payment-options">
                    <label className="payment-option">
                      <input type="radio" name="paymentMethod" value="card" defaultChecked />
                      <FaCreditCard />
                      <span>Credit/Debit Card</span>
                    </label>
                    <label className="payment-option">
                      <input type="radio" name="paymentMethod" value="paypal" />
                      <span>PayPal</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="modal-actions">
              {currentStep > 1 && (
                <button className="btn-secondary" onClick={handleBack}>
                  Back
                </button>
              )}
              
              {currentStep < 3 ? (
                <button className="btn-primary" onClick={handleNext}>
                  Next
                </button>
              ) : (
                <button 
                  className="btn-primary" 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Confirm Booking'}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingModal; 