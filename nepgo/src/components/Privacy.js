import React from 'react';
import './About.css';

const Privacy = () => (
  <div className="about-page">
    <section className="about-hero">
      <h1 className="about-title">Privacy Policy</h1>
      <p className="about-desc">Your privacy is important to us. This page explains how NepGo collects, uses, and protects your information.</p>
    </section>
    <section className="about-section">
      <h2>1. Data Collection</h2>
      <p>We collect information you provide when you register, plan trips, or interact with our services. This includes your name, email, and trip preferences.</p>
      <h2>2. Use of Information</h2>
      <p>Your data is used to personalize your experience, provide services, and improve NepGo. We do not sell your personal information.</p>
      <h2>3. Data Sharing</h2>
      <p>We only share your data with trusted partners as needed to deliver our services (e.g., guides, accommodation providers). We never share your data for marketing without consent.</p>
      <h2>4. Your Rights</h2>
      <p>You can access, update, or delete your information at any time from your profile or by contacting us.</p>
      <h2>5. Contact</h2>
      <p>If you have questions about privacy, email us at <a href="mailto:support@nepgo.com">support@nepgo.com</a>.</p>
    </section>
  </div>
);

export default Privacy; 