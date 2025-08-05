import React from 'react';
import './About.css';

const Terms = () => (
  <div className="about-page">
    <section className="about-hero">
      <h1 className="about-title">Terms of Service</h1>
      <p className="about-desc">Please read these terms carefully before using NepGo. By accessing our services, you agree to these terms.</p>
    </section>
    <section className="about-section">
      <h2>1. Acceptance of Terms</h2>
      <p>By using NepGo, you agree to comply with these terms and all applicable laws.</p>
      <h2>2. Use of Service</h2>
      <p>You may use NepGo for personal, non-commercial purposes. Do not misuse our platform or attempt unauthorized access.</p>
      <h2>3. User Responsibilities</h2>
      <p>You are responsible for your account security and for the accuracy of information you provide.</p>
      <h2>4. Limitations</h2>
      <p>We strive for accuracy but do not guarantee the completeness of information. NepGo is not liable for damages arising from use of the platform.</p>
      <h2>5. Contact</h2>
      <p>Questions? Email <a href="mailto:support@nepgo.com">support@nepgo.com</a>.</p>
    </section>
  </div>
);

export default Terms; 