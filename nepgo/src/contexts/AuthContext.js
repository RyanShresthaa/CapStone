import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

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
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

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
      const response = await api.post('/forgot-password', { email });
      
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
      const response = await api.post('/reset-password', { token, newPassword });
      
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
