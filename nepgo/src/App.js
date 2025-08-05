import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import Landing from './Landing';
import Login from './Login';
import SignUp from './SignUp';
import HomePage from './HomePage';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Dashboard from './Dashboard';
import PrivateRoute from "./components/PrivateRoute";
import About from './components/About';
import Features from './components/Features';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Profile from './Profile';
import TripPlanning from './components/TripPlanning';
import CommunityForums from './components/CommunityForums';
import Settings from './components/Settings';
import Privacy from './components/Privacy';
import Terms from './components/Terms';
import FAQ from './components/FAQ';
import Help from './components/Help';
import './App.css';

import TrekDetail from './components/TrekDetail';
import TrekRecommender from './components/TrekRecommender';
import SearchResults from './components/SearchResults';
import AuthTest from './components/AuthTest';
import Topbar from './components/Navbar';

// Enhanced navbar component with glassmorphic design
function AppRoutes() {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const { isDarkMode } = useTheme();
  const isLanding = location.pathname === '/';
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className={`app${isLanding && isDarkMode ? ' landing-dark' : ''}`}>
      <Topbar />
      <main className={`main-content unified-layout${isLanding && isDarkMode ? ' landing-dark' : ''}`}> 
        <Routes>
          <Route path="/" element={user ? <Navigate to="/home" /> : <Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/testimonials" element={<Reviews />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={user ? <Navigate to="/home" /> : <Login />} />
          <Route path="/signup" element={user ? <Navigate to="/home" /> : <SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/home" element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          } />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="/profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />
          <Route path="/trip-planning" element={
            <PrivateRoute>
              <TripPlanning />
            </PrivateRoute>
          } />
          <Route path="/community" element={
            <PrivateRoute>
              <CommunityForums />
            </PrivateRoute>
          } />
          <Route path="/settings" element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          } />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/help" element={<Help />} />
          <Route path="/search" element={
            <PrivateRoute>
              <SearchResults />
            </PrivateRoute>
          } />
          <Route path="/treks/:id" element={
            <PrivateRoute>
              <TrekDetail />
            </PrivateRoute>
          } />
          <Route path="/trek-recommender" element={
            <PrivateRoute>
              <TrekRecommender />
            </PrivateRoute>
          } />
          <Route path="/auth-test" element={<AuthTest />} />
        </Routes>
      </main>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--card-bg)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)',
          },
        }}
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <Router>
            <AppRoutes />
          </Router>
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
