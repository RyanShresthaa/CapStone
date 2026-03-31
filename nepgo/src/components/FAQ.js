import React from 'react';
import './About.css';

const FAQS = [
  { q: 'How do I plan a trek with NepGo?', a: 'Sign up, log in, and use the Trip Planning page to select your destination, dates, and preferences.' },
  { q: 'Is my personal data safe?', a: 'Yes, we use secure protocols and never share your data without consent. See our Privacy Policy for details.' },
  { q: 'Can I book accommodation through NepGo?', a: 'Currently, we focus on trek planning and community features. For accommodation, we recommend checking with local providers or your trek guide.' },
  { q: 'How do I contact a guide?', a: 'Use the Community or Trip Planning features to connect with certified guides.' },
  { q: 'What if I forget my password?', a: 'Use the Forgot Password link on the login page to reset your password securely.' },
];

const FAQ = () => (
  <div className="about-page">
    <section className="about-hero">
      <h1 className="about-title">Frequently Asked Questions</h1>
      <p className="about-desc">Find answers to common questions about NepGo and trekking in Nepal.</p>
    </section>
    <section className="about-section">
      {FAQS.map((item, idx) => (
        <div key={idx} className="faq-item">
          <h3 className="faq-question">{item.q}</h3>
          <p className="faq-answer">{item.a}</p>
        </div>
      ))}
    </section>
  </div>
);

export default FAQ; 