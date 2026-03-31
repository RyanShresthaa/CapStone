import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { HiMail, HiCheckCircle, HiExclamationCircle } from "react-icons/hi";
import { FaMountain } from "react-icons/fa";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
=======
import { HiMail, HiArrowLeft, HiCheckCircle, HiExclamationCircle } from "react-icons/hi";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
<<<<<<< HEAD
    setError("");
    setMessage("");
    setSuccess(false);

    if (!email) {
      setError("Email is required");
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
=======
    setError('');
    setMessage('');
    setSuccess(false);
    
    // Basic email validation
    if (!email) {
      setError('Email is required');
      setLoading(false);
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
      setLoading(false);
      return;
    }

    try {
<<<<<<< HEAD
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
=======
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
<<<<<<< HEAD
        setMessage("Password reset email sent successfully! Please check your email.");
        setEmail("");
      } else {
        setError(data.message || "Failed to send reset email. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
=======
        setMessage('Password reset email sent successfully! Please check your email.');
        setEmail('');
      } else {
        setError(data.message || 'Failed to send reset email. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
    } finally {
      setLoading(false);
    }
  };

  return (
<<<<<<< HEAD
    <div className="auth-page-container auth-page-container--login">
      <div className="auth-bg-layer" aria-hidden>
        <div className="auth-bg-mesh" />
        <div className="auth-bg-orb auth-bg-orb--1" />
        <div className="auth-bg-orb auth-bg-orb--2" />
        <div className="auth-bg-orb auth-bg-orb--3" />
      </div>

      <div className="auth-shell auth-shell--single">
        <main className="auth-main">
          <div className="auth-content">
            <div className="auth-card">
              <div className="auth-mobile-brand">
                <button type="button" className="auth-back-home" onClick={() => navigate("/login")}>
                  ← Sign in
                </button>
                <span className="auth-mobile-logo">NepGo</span>
              </div>

              <div className="auth-header">
                <div className="logo-container">
                  <FaMountain className="logo-icon" aria-hidden />
                  <span className="logo-text">NepGo</span>
                </div>
                <h1 className="auth-title">Forgot password?</h1>
                <p className="auth-subtitle">
                  Enter your email and we&apos;ll send you a reset link.
                </p>
              </div>

              {success && message && (
                <div className="forgot-success" role="status">
                  <HiCheckCircle style={{ fontSize: "1.25rem", flexShrink: 0 }} />
                  <span>{message}</span>
                </div>
              )}

              {error && (
                <div className="forgot-error" role="alert">
                  <HiExclamationCircle style={{ fontSize: "1.25rem", flexShrink: 0 }} />
                  <span>{error}</span>
                </div>
              )}

              <form className="auth-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="forgot-email">
                    Email address
                  </label>
                  <div className="input-container forgot-email-wrap">
                    <span className="forgot-email-icon" aria-hidden>
                      <HiMail />
                    </span>
                    <input
                      id="forgot-email"
                      type="email"
                      className="form-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <button type="submit" className={`submit-btn ${loading ? "loading" : ""}`} disabled={loading}>
                  {loading ? "Sending…" : "Send reset link"}
                </button>
              </form>

              <div className="auth-footer">
                <p className="footer-text">
                  Remembered your password?{" "}
                  <button type="button" className="footer-link" onClick={() => navigate("/login")} disabled={loading}>
                    Sign in
                  </button>
                </p>
              </div>
            </div>
          </div>
        </main>
=======
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <img src="/logo.png" alt="NepGo Logo" className="w-12 h-12 mr-3" />
            <span className="text-3xl font-bold text-gray-800">NepGo</span>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-6">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors duration-200 mb-4"
              disabled={loading}
            >
              <HiArrowLeft className="w-5 h-5 mr-2" />
              Back to Login
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Forgot Password?</h2>
            <p className="text-gray-600">Enter your email address and we'll send you a link to reset your password.</p>
          </div>

          {/* Success Message */}
          {success && message && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center animate-fade-in">
              <HiCheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
              <span className="text-green-700 text-sm">{message}</span>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center animate-fade-in">
              <HiExclamationCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 transition-colors duration-200"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Sending Reset Link...
                </div>
              ) : (
                'Send Reset Link'
              )}
            </button>

            {/* Back to Login */}
            <div className="text-center mt-6">
              <span className="text-gray-600 text-sm">Remembered your password? </span>
              <button
                type="button"
                onClick={() => navigate('/')}
                disabled={loading}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200 disabled:opacity-50"
              >
                Sign in here
              </button>
            </div>
          </form>
        </div>
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default ForgotPassword;
=======
export default ForgotPassword; 
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
