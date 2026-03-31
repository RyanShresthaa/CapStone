import React, { useState } from "react";
import "./SignUp.css";
import { FaEnvelope, FaEye, FaEyeSlash, FaSpinner, FaMountain, FaUser, FaLock, FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
<<<<<<< HEAD
=======
import { useTheme } from "./contexts/ThemeContext";
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
import toast from "react-hot-toast";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();
<<<<<<< HEAD
=======
  const { isDarkMode } = useTheme();
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setIsLoading(true);

    try {
      const result = await register({ firstName, lastName, email, password });
      
      if (result.success) {
        // Welcome message
        toast.success(`Welcome to NepGo, ${firstName}! 🎉 Your adventure begins now!`);
        
        setTimeout(() => {
<<<<<<< HEAD
          navigate("/home");
        }, 600);
=======
          navigate("/login");
        }, 1000);
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
      } else {
        setError(result.message || "Registration failed.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
<<<<<<< HEAD
    <div className="auth-page-container auth-page-container--signup">
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
            Create a free account to save treks, join forum threads, and get trip-ready insights.
          </p>
          <ul className="auth-aside-bullets">
            <li>No spam — just trek planning tools</li>
            <li>Join thousands exploring Nepal safely</li>
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
                <h1 className="auth-title">Create your account</h1>
                <p className="auth-subtitle">Takes under a minute — then you&apos;re in.</p>
              </div>

              <form className="auth-form" onSubmit={handleSubmit}>
=======
    <div className="auth-page-container">
      {/* Animated Background */}
      <div className="auth-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
        <div className="mountain-overlay"></div>
      </div>

      {/* Main Content */}
      <div className="auth-content">
        <div className="auth-card">
          {/* Logo and Header */}
          <div className="auth-header">
            <div className="logo-container">
              <FaMountain className="logo-icon" />
              <h1 className="logo-text">NepGo</h1>
            </div>
            <h2 className="auth-title">Create Account</h2>
            <p className="auth-subtitle">Join us and start your adventure</p>
          </div>

          {/* Sign Up Form */}
          <form className="auth-form" onSubmit={handleSubmit}>
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  <FaUser className="label-icon" />
                  First Name
                </label>
                <div className="input-container">
                  <input
                    type="text"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="form-input"
                    required
                  />
                  <div className="input-focus-border"></div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <FaUser className="label-icon" />
                  Last Name
                </label>
                <div className="input-container">
                  <input
                    type="text"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="form-input"
                    required
                  />
                  <div className="input-focus-border"></div>
                </div>
              </div>
            </div>

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
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  required
                />
                <div className="input-focus-border"></div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                <FaLock className="label-icon" />
                Password
              </label>
              <div className="input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                <div className="input-focus-border"></div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                <FaLock className="label-icon" />
                Confirm Password
              </label>
              <div className="input-container">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="form-input"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirm(!showConfirm)}
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                >
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </button>
                <div className="input-focus-border"></div>
              </div>
            </div>

            {error && (
              <div className="error-banner">
                <div className="error-icon">⚠️</div>
                <span>{error}</span>
              </div>
            )}

            <button 
              type="submit" 
              className={`submit-btn ${isLoading ? 'loading' : ''}`} 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <FaSpinner className="spinner" />
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>

            {/* Divider */}
            <div className="divider">
              <span className="divider-text">or</span>
            </div>

<<<<<<< HEAD
                <button type="button" className="google-btn" disabled aria-label="Google sign-in coming soon">
                  <FaGoogle className="google-icon" aria-hidden />
                  <span>Google (coming soon)</span>
                </button>
              </form>

              <div className="auth-footer">
                <p className="footer-text">
                  Already have an account?{' '}
                  <button
                    type="button"
                    className="footer-link"
                    onClick={() => navigate("/login")}
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </div>
          </div>
        </main>
=======
            {/* Google Sign Up */}
            <button type="button" className="google-btn">
              <FaGoogle className="google-icon" />
              <span>Continue with Google</span>
            </button>
          </form>

          {/* Footer */}
          <div className="auth-footer">
            <p className="footer-text">
              Already have an account?{' '}
              <button
                type="button"
                className="footer-link"
                onClick={() => navigate("/login")}
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
      </div>
    </div>
  );
};

export default SignUp;
