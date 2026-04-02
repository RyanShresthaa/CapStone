import axios from 'axios';

// Base API URL configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function isAuthRequestUrl(url) {
  if (!url) return false;
  const u = String(url);
  return (
    u.includes('/login') ||
    u.includes('/register') ||
    u.includes('/forgot-password') ||
    u.includes('/reset-password')
  );
}

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const url = error.config?.url || '';
      if (!isAuthRequestUrl(url)) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Authentication API
export const authAPI = {
  // Register new user
  register: (userData) => api.post('/register', userData),
  
  // Login user
  login: (credentials) => api.post('/login', credentials),
  
  // Forgot password
  forgotPassword: (email) => api.post('/forgot-password', { email }),
  
  // Reset password
  resetPassword: (token, newPassword) => api.post('/reset-password', { token, newPassword }),
  
  // Verify reset token
  verifyResetToken: (token) => api.get(`/api/auth/verify-reset-token/${token}`),
  
  // Enable 2FA
  enable2FA: () => api.post('/api/enable-2fa'),
  
  // Verify 2FA code
  verify2FA: (code) => api.post('/api/verify-2fa', { code }),
  
  // Get user consent status
  getConsent: () => api.get('/api/consent'),
  
  // Set user consent
  setConsent: (consentGiven) => api.post('/api/consent', { consentGiven }),
};

// Trek API
export const trekAPI = {
  // Get all treks
  getAllTreks: () => api.get('/api/treks'),
  
  // Get trek by ID
  getTrekById: (id) => api.get(`/api/treks/${id}`),
  
  // Search treks with filters
  searchTreks: (params) => api.get('/api/treks/search', { params }),
  
  // Get featured treks
  getFeaturedTreks: () => api.get('/api/treks/featured'),
  
  // Get personalized recommendations
  getRecommendations: () => api.get('/api/recommendations'),
};

// User API
export const userAPI = {
  // Get user profile
  getProfile: () => api.get('/api/user/profile'),
  
  // Update user profile
  updateProfile: (profileData) => api.put('/api/user/profile', profileData),
  
  // Get user wishlist
  getWishlist: () => api.get('/api/user/wishlist'),
  
  // Add trek to wishlist
  addToWishlist: (trekId, plannedDate, notes) => 
    api.post('/api/user/wishlist', { trekId, plannedDate, notes }),
  
  // Remove trek from wishlist
  removeFromWishlist: (trekId) => api.delete(`/api/user/wishlist/${trekId}`),
};

// Booking API
export const bookingAPI = {
  // Create new booking
  createBooking: (bookingData) => api.post('/api/bookings', bookingData),
  
  // Get user bookings
  getUserBookings: () => api.get('/api/user/bookings'),
  
  // Get booking by ID
  getBookingById: (id) => api.get(`/api/bookings/${id}`),
  
  // Cancel booking
  cancelBooking: (id, cancellationReason) => 
    api.put(`/api/bookings/${id}/cancel`, { cancellationReason }),
};

// Weather API
export const weatherAPI = {
  // Get weather for location
  getWeather: (location) => api.get('/api/weather', { params: { location } }),
};

// Community API
export const communityAPI = {
  // Create forum post
  createPost: (title, content, category) =>
    api.post('/api/forum/posts', { title, content, category }),
  
  // Get all forum posts
  getPosts: () => api.get('/api/forum/posts'),
  
  // Add comment to post
  addComment: (postId, content) => api.post(`/api/forum/posts/${postId}/comments`, { content }),
  
  // Like a post
  likePost: (postId) => api.post(`/api/forum/posts/${postId}/like`),
  
  // Add badge to post (admin only)
  addBadge: (postId, badge) => api.post(`/api/forum/posts/${postId}/badge`, { badge }),
};

// Feedback API
export const feedbackAPI = {
  // Submit feedback
  submitFeedback: (rating, comment, trek) => 
    api.post('/api/feedback', { rating, comment, trek }),
  
  // Get all feedback (admin only)
  getAllFeedback: () => api.get('/api/feedback'),
};

// Utility functions
export const apiUtils = {
  // Check if API is available
  checkHealth: () => api.get('/'),
  
  // Get error message from response
  getErrorMessage: (error) => {
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
    if (error.message) {
      return error.message;
    }
    return 'An unexpected error occurred';
  },
  
  // Handle API errors
  handleError: (error, customMessage = null) => {
    const message = customMessage || apiUtils.getErrorMessage(error);
    console.error('API Error:', error);
    return { success: false, message };
  },
  
  // Handle API success
  handleSuccess: (response, customMessage = null) => {
    const message = customMessage || 'Operation completed successfully';
    return { success: true, data: response.data, message };
  },
};

// Export the axios instance for custom requests
export default api; 