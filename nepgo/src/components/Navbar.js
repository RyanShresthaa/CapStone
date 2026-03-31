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
import './Navbar.css';

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
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>
            {user ? null : (
              <>
                <Link to="/login" className="btn nep-nav-btn-ghost">
                  Login
                </Link>
                <Link to="/signup" className="btn nep-nav-btn-cta">
                  Register
                </Link>
              </>
            )}
          </div>
        ) : (
          <>
            {/* Desktop Navigation - Simplified and Better Aligned */}
            <div className="flex-center nep-nav-actions">
              {NAV_LINKS.map(link => {
                const IconComponent = link.icon;
                const isActive = location.pathname === link.to;

                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`nep-nav-link ${isActive ? 'nep-nav-link--active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <IconComponent style={{ fontSize: '1rem' }} />
                    {link.label}
                    {isActive && (
                      <div className="nep-nav-active-indicator nep-nav-link-indicator" />
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="flex-center nep-nav-actions nep-nav-actions--tight">
              <button
                type="button"
                className="btn nep-nav-icon-btn"
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <FaSun /> : <FaMoon />}
              </button>

              {user ? (
                <div className="nep-nav-user-row">
                  <Link to="/profile" className="btn nep-nav-btn-profile">
                    <FaUser />
                    Profile
                  </Link>
                  <button type="button" className="btn nep-nav-btn-logout" onClick={handleLogout}>
                    <FaSignOutAlt />
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link to="/login" className="btn nep-nav-btn-ghost">
                    Login
                  </Link>
                  <Link to="/signup" className="btn nep-nav-btn-cta">
                    Register
                  </Link>
                </>
              )}
            </div>
          </>
        )}
      </nav>

    </header>
  );
};

export default Topbar; 