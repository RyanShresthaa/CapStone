import React, { createContext, useContext, useState, useEffect } from 'react';
<<<<<<< HEAD
import toast from 'react-hot-toast';
import api from '../services/api';
=======
import axios from 'axios';
import toast from 'react-hot-toast';
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

<<<<<<< HEAD
=======
// Base API URL configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Configure axios defaults
axios.defaults.baseURL = API_BASE_URL;

// Request interceptor to add auth token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      // Don't redirect automatically, let the component handle it
      console.log('Token expired or invalid');
    }
    return Promise.reject(error);
  }
);

>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated on app load
  useEffect(() => {
    const checkAuth = () => {
      // Check both localStorage and sessionStorage for token
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const userData = localStorage.getItem('user') || sessionStorage.getItem('user');
      
      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          // Validate token format (basic check)
          if (token.split('.').length === 3) {
            setUser(parsedUser);
            setIsAuthenticated(true);
          } else {
            // Invalid token format, clear storage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
            setUser(null);
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('user');
          setUser(null);
          setIsAuthenticated(false);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };
    
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

<<<<<<< HEAD
  const clearAuthStorage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  };

  const persistSession = (token, userData, rememberMe) => {
    clearAuthStorage();
    const store = rememberMe ? localStorage : sessionStorage;
    store.setItem('token', token);
    store.setItem('user', JSON.stringify(userData));
  };

  // Login — MERN backend (Express + MongoDB)
  const login = async (email, password, rememberMe = false) => {
    try {
      setIsLoading(true);
      const { data } = await api.post('/login', { email, password });
      if (!data?.token || !data?.user) {
        throw new Error('Invalid response from server');
      }
      persistSession(data.token, data.user, rememberMe);
      setUser(data.user);
      setIsAuthenticated(true);
      toast.success('Login successful!');
      return { success: true, user: data.user };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Login failed';
=======
  // Login function with remember me functionality
  const login = async (email, password, rememberMe = false) => {
    try {
      setIsLoading(true);
      
      // Simple validation for the mock user
      if (email === 'ryanshr02@gmail.com' && password === 'ryan123') {
        const token = 'mock-jwt-token-' + Date.now();
        const userData = {
          email: email,
          name: 'Ryan Shrestha',
          firstName: 'Ryan',
          lastName: 'Shrestha'
        };
        
        // Store token and user data based on remember me preference
        if (rememberMe) {
          // Store in localStorage for persistent login
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(userData));
        } else {
          // Store in sessionStorage for session-only login
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('user', JSON.stringify(userData));
        }
        
        setUser(userData);
        setIsAuthenticated(true);
        
        toast.success('Login successful!');
        return { success: true, user: userData };
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      const errorMessage = error.message || 'Login failed';
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

<<<<<<< HEAD
  const register = async (userData) => {
    try {
      setIsLoading(true);
      const { data } = await api.post('/register', userData);
      if (!data?.token || !data?.user) {
        throw new Error('Invalid response from server');
      }
      persistSession(data.token, data.user, true);
      setUser(data.user);
      setIsAuthenticated(true);
      toast.success('Registration successful! Welcome to NepGo.');
      return { success: true, message: 'Registration successful' };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Registration failed';
=======
  // Register function
  const register = async (userData) => {
    try {
      setIsLoading(true);
      
      // Mock registration - just simulate success
      toast.success('Registration successful! Please login.');
      return { success: true, message: 'Registration successful' };
    } catch (error) {
      const errorMessage = error.message || 'Registration failed';
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function - clears both localStorage and sessionStorage
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    toast.success('Logged out successfully');
  };

  // Forgot password function
  const forgotPassword = async (email) => {
    try {
      setIsLoading(true);
<<<<<<< HEAD
      const response = await api.post('/forgot-password', { email });
=======
      const response = await axios.post('/forgot-password', { email });
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
      
      if (response.data.message) {
        toast.success('Password reset token generated! Check console for token.');
        return { success: true, message: 'Password reset token generated' };
      } else {
        throw new Error(response.data.message || 'Failed to send reset email');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to send reset email';
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Reset password function
  const resetPassword = async (token, newPassword) => {
    try {
      setIsLoading(true);
<<<<<<< HEAD
      const response = await api.post('/reset-password', { token, newPassword });
=======
      const response = await axios.post('/reset-password', { token, newPassword });
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
      
      if (response.data.message) {
        toast.success('Password reset successful! Please login.');
        return { success: true, message: 'Password reset successful' };
      } else {
        throw new Error(response.data.message || 'Password reset failed');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Password reset failed';
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };
  
  // Update auth state manually
  const updateAuthState = () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const userData = localStorage.getItem('user') || sessionStorage.getItem('user');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
      }
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    updateAuthState
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
