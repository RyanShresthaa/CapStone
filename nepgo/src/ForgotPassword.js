import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiMail, HiCheckCircle, HiExclamationCircle } from "react-icons/hi";
import { FaMountain } from "react-icons/fa";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
      setError("Please enter a valid email address");      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setMessage("Password reset email sent successfully! Please check your email.");
        setEmail("");
      } else {
        setError(data.message || "Failed to send reset email. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");    } finally {
      setLoading(false);
    }
  };

  return (
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
        </main>      </div>
    </div>
  );
};

export default ForgotPassword;