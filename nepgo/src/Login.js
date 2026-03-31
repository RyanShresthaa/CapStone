import React, { useState } from "react";
import "./Login.css";
import { FaEye, FaEyeSlash, FaSpinner, FaMountain, FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value && !validateEmail(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value && !validatePassword(value)) {
      setPasswordError("Password must be at least 6 characters long");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate form
    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);

    try {
      const result = await login(email, password, rememberMe);
      
      if (result.success) {
        // Success animation and toast
        setError("");
        const successElement = document.querySelector('.submit-btn');
        if (successElement) {
          successElement.classList.add('success-animation');
        }
        
        const firstName = result.user?.firstName || result.user?.name || "there";
        toast.success(`Welcome back, ${firstName}! 🎉`);
        
        // Navigate to home after successful login
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else {
        setError(result.message || "Login failed");
      }
    } catch (err) {
      setError("Network error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-page-container auth-page-container--login">
      <div className="auth-bg-layer" aria-hidden>
        <div className="auth-bg-mesh" />
        <div className="auth-bg-orb auth-bg-orb--1" />
        <div className="auth-bg-orb auth-bg-orb--2" />
        <div className="auth-bg-orb auth-bg-orb--3" />
      </div>

      <div className="auth-shell">
        <aside className="auth-aside">
          <button type="button" className="auth-back-home" onClick={() => navigate('/')}>
            ← Back to home
          </button>
          <div className="auth-aside-brand">
            <FaMountain className="auth-aside-logo-icon" aria-hidden />
            <p className="auth-aside-logo-text">NepGo</p>
          </div>
          <p className="auth-aside-tagline">
            Plan treks, read the community, and track your next Himalayan adventure in one place.
          </p>
          <ul className="auth-aside-bullets">
            <li>Curated routes &amp; live weather context</li>
            <li>Secure account &amp; saved preferences</li>
          </ul>
        </aside>

        <main className="auth-main">
          <div className="auth-content">
            <div className="auth-card">
              <div className="auth-mobile-brand">
                <button type="button" className="auth-back-home" onClick={() => navigate('/')}>
                  ← Home
                </button>
                <span className="auth-mobile-logo">NepGo</span>
              </div>

              <div className="auth-header">
                <div className="logo-container">
                  <FaMountain className="logo-icon" aria-hidden />
                  <span className="logo-text">NepGo</span>
                </div>
                <h1 className="auth-title">Welcome back</h1>
                <p className="auth-subtitle">Sign in to pick up where you left off.</p>
              </div>

          {/* Login Form */}
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">
                <FaEnvelope className="label-icon" />
                Email Address
              </label>
              <div className="input-container">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  className={`form-input ${emailError ? 'error' : ''}`}
                  required
                />
                <div className="input-focus-border"></div>
              </div>
              {emailError && <div className="error-message">{emailError}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">
                <FaLock className="label-icon" />
                Password
              </label>
              <div className="input-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={handlePasswordChange}
                  className={`form-input ${passwordError ? 'error' : ''}`}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                <div className="input-focus-border"></div>
              </div>
              {passwordError && <div className="error-message">{passwordError}</div>}
            </div>

            {error && (
              <div className="error-banner">
                <div className="error-icon">⚠️</div>
                <span>{error}</span>
              </div>
            )}

            <div className="form-options">
              <label className="checkbox-container">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="checkbox-input"
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-label">Remember me</span>
              </label>
              <button
                type="button"
                className="forgot-link"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </button>
            </div>

            <button 
              type="submit" 
              className={`submit-btn ${isLoading ? 'loading' : ''}`} 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <FaSpinner className="spinner" />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Footer */}
              <div className="auth-footer">
                <p className="footer-text">
                  Don&apos;t have an account?{' '}
                  <button
                    type="button"
                    className="footer-link"
                    onClick={() => navigate("/signup")}
                  >
                    Create Account
                  </button>
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Login;
