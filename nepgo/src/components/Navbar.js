import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { 
  FaHome, 
  FaRoute, 
  FaUsers, 
  FaUser, 
  FaSignOutAlt, 
  FaSun, 
  FaMoon, 
  FaMountain
} from 'react-icons/fa';
import '../styles/design-system.css';
<<<<<<< HEAD
import './Navbar.css';
=======
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb

const NAV_LINKS = [
  { to: '/home', label: 'Home', icon: FaHome },
  { to: '/trip-planning', label: 'Trip Planning', icon: FaRoute },
  { to: '/trek-recommender', label: 'Trek Recommender', icon: FaMountain },
  { to: '/community', label: 'Community', icon: FaUsers },
];

const Topbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
<<<<<<< HEAD
=======
  const [hoveredLink, setHoveredLink] = useState(null);
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLanding = location.pathname === '/';
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/forgot-password' || location.pathname === '/reset-password';

  // Don't render navbar on auth pages
  if (isAuthPage) {
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

<<<<<<< HEAD
  const headerClass = [
    'nep-nav-header',
    isDarkMode ? 'nep-nav-header--dark' : 'nep-nav-header--light',
    scrolled ? 'nep-nav-header--scrolled' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const navInnerClass = [
    'nep-nav-inner',
    scrolled ? 'nep-nav-inner--compact' : 'nep-nav-inner--comfortable',
  ].join(' ');

  return (
    <header className={headerClass}>
      <nav className={navInnerClass}>
        <button
          type="button"
          className={`nep-nav-logo ${scrolled ? 'nep-nav-logo--compact' : 'nep-nav-logo--comfortable'}`}
          onClick={() => navigate('/')}
          aria-label="Go to home"
        >
          <span
            className={`nep-nav-logo-emoji ${scrolled ? 'nep-nav-logo-emoji--sm' : 'nep-nav-logo-emoji--lg'}`}
            aria-hidden
          >
            🏔️
          </span>
          <span
            className={`nep-nav-logo-text ${scrolled ? 'nep-nav-logo-text--sm' : 'nep-nav-logo-text--lg'}`}
          >
            NepGo
          </span>
        </button>

        {isLanding ? (
          <div className="flex-center nep-nav-actions">
            <button
              type="button"
              className="btn nep-nav-icon-btn"
=======
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        background: isDarkMode 
          ? scrolled 
            ? 'linear-gradient(135deg, rgba(15,23,42,0.98), rgba(30,41,59,0.98))' 
            : 'linear-gradient(135deg, rgba(15,23,42,0.85), rgba(30,41,59,0.85))'
          : scrolled 
            ? 'linear-gradient(135deg, rgba(255,255,255,0.98), rgba(248,250,252,0.98))' 
            : 'linear-gradient(135deg, rgba(255,255,255,0.85), rgba(248,250,252,0.85))',
        backdropFilter: 'blur(25px)',
        borderBottom: scrolled 
          ? isDarkMode 
            ? '1px solid rgba(14,165,233,0.2)' 
            : '1px solid rgba(14,165,233,0.15)'
          : 'none',
        boxShadow: scrolled 
          ? isDarkMode
            ? '0 20px 40px rgba(14,165,233,0.15), 0 8px 16px rgba(0,0,0,0.1)'
            : '0 20px 40px rgba(14,165,233,0.1), 0 8px 16px rgba(0,0,0,0.05)'
          : 'none',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <nav
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: scrolled ? '0.75rem 2rem' : '1rem 2rem',
          minHeight: scrolled ? '60px' : '70px',
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Improved Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontFamily: 'Montserrat, var(--font-main)',
            fontSize: scrolled ? '1.5rem' : '1.7rem',
            fontWeight: 900,
            cursor: 'pointer',
            userSelect: 'none',
            outline: 'none',
            letterSpacing: '0.5px',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
          }}
          onClick={() => navigate('/')}
          tabIndex={0}
          role="button"
          aria-label="Go to home"
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
          }}
        >
          <div style={{ 
            position: 'relative',
            fontSize: scrolled ? '1.8rem' : '2rem', 
            marginRight: '0.3em',
            filter: 'drop-shadow(0 2px 4px rgba(14,165,233,0.3))',
          }}>
            🏔️
          </div>
          <span style={{ 
            fontSize: scrolled ? '1.1em' : '1.2em', 
            fontWeight: 900, 
            letterSpacing: '1.2px',
            color: isDarkMode ? '#0ea5e9' : '#1e40af',
            textShadow: isDarkMode 
              ? '0 2px 4px rgba(14,165,233,0.3)' 
              : '0 2px 4px rgba(30,64,175,0.3)',
          }}>
            NepGo
          </span>
        </div>

        {isLanding ? (
          // Landing page minimal navbar
          <div className="flex-center" style={{ gap: '1rem' }}>
            <button
              className="btn"
              style={{ 
                background: 'rgba(14,165,233,0.1)', 
                color: 'var(--primary)', 
                borderRadius: '50%', 
                padding: '0.6rem', 
                minWidth: 48, 
                minHeight: 48, 
                fontSize: '1.1rem',
                border: '1px solid rgba(14,165,233,0.2)',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
              }}
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>
            {user ? null : (
              <>
<<<<<<< HEAD
                <Link to="/login" className="btn nep-nav-btn-ghost">
                  Login
                </Link>
                <Link to="/signup" className="btn nep-nav-btn-cta">
=======
                <Link 
                  to="/login" 
                  className="btn" 
                  style={{ 
                    background: 'transparent', 
                    color: 'var(--primary)', 
                    border: '2px solid var(--primary)', 
                    fontWeight: 600,
                    padding: '0.75rem 1.5rem',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                  }}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="btn" 
                  style={{ 
                    background: 'linear-gradient(135deg, #0ea5e9, #10b981)', 
                    color: '#fff', 
                    fontWeight: 600,
                    padding: '0.75rem 1.5rem',
                    borderRadius: '12px',
                    border: 'none',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(14,165,233,0.3)',
                  }}
                >
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
                  Register
                </Link>
              </>
            )}
          </div>
        ) : (
          <>
            {/* Desktop Navigation - Simplified and Better Aligned */}
<<<<<<< HEAD
            <div className="flex-center nep-nav-actions">
              {NAV_LINKS.map(link => {
                const IconComponent = link.icon;
                const isActive = location.pathname === link.to;

=======
            <div className="flex-center" style={{ gap: '1rem' }}>
              {NAV_LINKS.map(link => {
                const IconComponent = link.icon;
                const isActive = location.pathname === link.to;
                const isHovered = hoveredLink === link.to;
                
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
                return (
                  <Link
                    key={link.to}
                    to={link.to}
<<<<<<< HEAD
                    className={`nep-nav-link ${isActive ? 'nep-nav-link--active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
=======
                    className="text-light"
                    style={{
                      position: 'relative',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      color: isActive ? 'var(--primary)' : isDarkMode ? '#e2e8f0' : '#475569',
                      textDecoration: 'none',
                      padding: '0.75rem 1rem',
                      borderRadius: '12px',
                      transition: 'all 0.3s ease',
                      outline: 'none',
                      background: isActive 
                        ? 'rgba(14,165,233,0.1)' 
                        : isHovered 
                          ? 'rgba(14,165,233,0.05)'
                          : 'transparent',
                      border: isActive 
                        ? '1px solid rgba(14,165,233,0.2)' 
                        : '1px solid transparent',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      backdropFilter: 'blur(10px)',
                      transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                    }}
                    aria-current={isActive ? 'page' : undefined}
                    onMouseEnter={() => setHoveredLink(link.to)}
                    onMouseLeave={() => setHoveredLink(null)}
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
                  >
                    <IconComponent style={{ fontSize: '1rem' }} />
                    {link.label}
                    {isActive && (
<<<<<<< HEAD
                      <div className="nep-nav-active-indicator nep-nav-link-indicator" />
=======
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '-2px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '20px',
                          height: '3px',
                          background: 'linear-gradient(135deg, #0ea5e9, #10b981)',
                          borderRadius: '2px',
                          animation: 'slideIn 0.3s ease',
                        }}
                      />
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
                    )}
                  </Link>
                );
              })}
            </div>

<<<<<<< HEAD
            <div className="flex-center nep-nav-actions nep-nav-actions--tight">
              <button
                type="button"
                className="btn nep-nav-icon-btn"
=======
            {/* Right side controls - Simplified */}
            <div className="flex-center" style={{ gap: '0.75rem' }}>
              {/* Theme toggle */}
              <button
                className="btn"
                style={{ 
                  background: 'rgba(14,165,233,0.1)', 
                  color: 'var(--primary)', 
                  borderRadius: '50%', 
                  padding: '0.6rem', 
                  minWidth: 48, 
                  minHeight: 48, 
                  fontSize: '1.1rem',
                  border: '1px solid rgba(14,165,233,0.2)',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)',
                }}
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <FaSun /> : <FaMoon />}
              </button>

              {user ? (
<<<<<<< HEAD
                <div className="nep-nav-user-row">
                  <Link to="/profile" className="btn nep-nav-btn-profile">
                    <FaUser />
                    Profile
                  </Link>
                  <button type="button" className="btn nep-nav-btn-logout" onClick={handleLogout}>
=======
                // User menu - Simplified
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Link 
                    to="/profile" 
                    className="btn" 
                    style={{ 
                      background: 'linear-gradient(135deg, #10b981, #059669)', 
                      color: '#fff', 
                      fontWeight: 600,
                      padding: '0.75rem 1.25rem',
                      borderRadius: '12px',
                      border: 'none',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 15px rgba(16,185,129,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <FaUser />
                    Profile
                  </Link>
                  <button 
                    className="btn" 
                    style={{ 
                      background: 'linear-gradient(135deg, #ef4444, #dc2626)', 
                      color: '#fff', 
                      fontWeight: 600,
                      padding: '0.75rem 1.25rem',
                      borderRadius: '12px',
                      border: 'none',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 15px rgba(239,68,68,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }} 
                    onClick={handleLogout}
                  >
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
                    <FaSignOutAlt />
                    Logout
                  </button>
                </div>
              ) : (
                <>
<<<<<<< HEAD
                  <Link to="/login" className="btn nep-nav-btn-ghost">
                    Login
                  </Link>
                  <Link to="/signup" className="btn nep-nav-btn-cta">
=======
                  <Link 
                    to="/login" 
                    className="btn" 
                    style={{ 
                      background: 'transparent', 
                      color: 'var(--primary)', 
                      border: '2px solid var(--primary)', 
                      fontWeight: 600,
                      padding: '0.75rem 1.5rem',
                      borderRadius: '12px',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup" 
                    className="btn" 
                    style={{ 
                      background: 'linear-gradient(135deg, #0ea5e9, #10b981)', 
                      color: '#fff', 
                      fontWeight: 600,
                      padding: '0.75rem 1.5rem',
                      borderRadius: '12px',
                      border: 'none',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 15px rgba(14,165,233,0.3)',
                    }}
                  >
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
                    Register
                  </Link>
                </>
              )}
            </div>
          </>
        )}
      </nav>

<<<<<<< HEAD
=======
      <style jsx>{`
        @keyframes slideIn {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            width: 20px;
            opacity: 1;
          }
        }
      `}</style>
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
    </header>
  );
};

export default Topbar; 