import React, { useState } from 'react';
<<<<<<< HEAD
import { FaCog, FaUser, FaBell, FaLock, FaShieldAlt, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';
=======
import { FaCog, FaUser, FaBell, FaLock, FaGlobe, FaPalette, FaShieldAlt, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';
>>>>>>> ae36830a320bcef5621904da780750d5ee0c20fb
import { useAuth } from '../contexts/AuthContext';
import './Settings.css';

const Settings = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Profile settings
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
    location: user?.location || ''
  });

  // Notification settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    marketingEmails: false,
    tripReminders: true,
    weatherAlerts: true,
    communityUpdates: true
  });

  // Privacy settings
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    shareLocation: false,
    shareActivity: true,
    allowMessages: true
  });

  // App settings
  const [appSettings, setAppSettings] = useState({
    theme: 'light',
    language: 'en',
    currency: 'USD',
    units: 'metric',
    timezone: 'UTC+5:45'
  });

  const settingsTabs = [
    { id: 'profile', name: 'Profile', icon: FaUser },
    { id: 'notifications', name: 'Notifications', icon: FaBell },
    { id: 'privacy', name: 'Privacy & Security', icon: FaShieldAlt },
    { id: 'preferences', name: 'Preferences', icon: FaCog },
    { id: 'help', name: 'Help & Support', icon: FaQuestionCircle }
  ];

  const handleProfileUpdate = () => {
    console.log('Updating profile:', profileData);
    // Handle profile update logic
  };

  const handleNotificationUpdate = (key, value) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handlePrivacyUpdate = (key, value) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleAppSettingUpdate = (key, value) => {
    setAppSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleLogout = () => {
    logout();
  };

  const renderProfileTab = () => (
    <div className="settings-content">
      <h2>Profile Information</h2>
      <div className="form-grid">
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            value={profileData.firstName}
            onChange={(e) => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            value={profileData.lastName}
            onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={profileData.email}
            onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            value={profileData.phone}
            onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
          />
        </div>
        <div className="form-group full-width">
          <label>Bio</label>
          <textarea
            value={profileData.bio}
            onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
            rows="3"
            placeholder="Tell us about yourself..."
          />
        </div>
        <div className="form-group full-width">
          <label>Location</label>
          <input
            type="text"
            value={profileData.location}
            onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
            placeholder="Your current location"
          />
        </div>
      </div>
      <button className="save-btn" onClick={handleProfileUpdate}>
        Save Changes
      </button>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="settings-content">
      <h2>Notification Preferences</h2>
      <div className="settings-group">
        <h3>Communication</h3>
        <div className="setting-item">
          <div className="setting-info">
            <span>Email Notifications</span>
            <small>Receive notifications via email</small>
          </div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={notifications.emailNotifications}
              onChange={(e) => handleNotificationUpdate('emailNotifications', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>
        <div className="setting-item">
          <div className="setting-info">
            <span>Push Notifications</span>
            <small>Get notified on your device</small>
          </div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={notifications.pushNotifications}
              onChange={(e) => handleNotificationUpdate('pushNotifications', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>
        <div className="setting-item">
          <div className="setting-info">
            <span>SMS Notifications</span>
            <small>Receive text messages</small>
          </div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={notifications.smsNotifications}
              onChange={(e) => handleNotificationUpdate('smsNotifications', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
      
      <div className="settings-group">
        <h3>Content</h3>
        <div className="setting-item">
          <div className="setting-info">
            <span>Trip Reminders</span>
            <small>Reminders about your upcoming trips</small>
          </div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={notifications.tripReminders}
              onChange={(e) => handleNotificationUpdate('tripReminders', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>
        <div className="setting-item">
          <div className="setting-info">
            <span>Weather Alerts</span>
            <small>Important weather updates for your destinations</small>
          </div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={notifications.weatherAlerts}
              onChange={(e) => handleNotificationUpdate('weatherAlerts', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>
        <div className="setting-item">
          <div className="setting-info">
            <span>Community Updates</span>
            <small>Updates from the trekking community</small>
          </div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={notifications.communityUpdates}
              onChange={(e) => handleNotificationUpdate('communityUpdates', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderPrivacyTab = () => (
    <div className="settings-content">
      <h2>Privacy & Security</h2>
      <div className="settings-group">
        <h3>Privacy Settings</h3>
        <div className="setting-item">
          <div className="setting-info">
            <span>Profile Visibility</span>
            <small>Who can see your profile</small>
          </div>
          <select
            value={privacy.profileVisibility}
            onChange={(e) => handlePrivacyUpdate('profileVisibility', e.target.value)}
          >
            <option value="public">Public</option>
            <option value="friends">Friends Only</option>
            <option value="private">Private</option>
          </select>
        </div>
        <div className="setting-item">
          <div className="setting-info">
            <span>Share Location</span>
            <small>Allow others to see your location</small>
          </div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={privacy.shareLocation}
              onChange={(e) => handlePrivacyUpdate('shareLocation', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>
        <div className="setting-item">
          <div className="setting-info">
            <span>Share Activity</span>
            <small>Show your trekking activities</small>
          </div>
          <label className="toggle">
            <input
              type="checkbox"
              checked={privacy.shareActivity}
              onChange={(e) => handlePrivacyUpdate('shareActivity', e.target.checked)}
            />
            <span className="slider"></span>
          </label>
        </div>
      </div>
      
      <div className="settings-group">
        <h3>Security</h3>
        <button className="action-btn">
          <FaLock /> Change Password
        </button>
        <button className="action-btn">
          <FaShieldAlt /> Enable Two-Factor Authentication
        </button>
      </div>
    </div>
  );

  const renderPreferencesTab = () => (
    <div className="settings-content">
      <h2>App Preferences</h2>
      <div className="settings-group">
        <h3>Appearance</h3>
        <div className="setting-item">
          <div className="setting-info">
            <span>Theme</span>
            <small>Choose your preferred theme</small>
          </div>
          <select
            value={appSettings.theme}
            onChange={(e) => handleAppSettingUpdate('theme', e.target.value)}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto</option>
          </select>
        </div>
      </div>
      
      <div className="settings-group">
        <h3>Localization</h3>
        <div className="setting-item">
          <div className="setting-info">
            <span>Language</span>
            <small>Choose your preferred language</small>
          </div>
          <select
            value={appSettings.language}
            onChange={(e) => handleAppSettingUpdate('language', e.target.value)}
          >
            <option value="en">English</option>
            <option value="np">Nepali</option>
            <option value="hi">Hindi</option>
          </select>
        </div>
        <div className="setting-item">
          <div className="setting-info">
            <span>Currency</span>
            <small>Preferred currency for pricing</small>
          </div>
          <select
            value={appSettings.currency}
            onChange={(e) => handleAppSettingUpdate('currency', e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="NPR">NPR</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
        <div className="setting-item">
          <div className="setting-info">
            <span>Units</span>
            <small>Measurement system</small>
          </div>
          <select
            value={appSettings.units}
            onChange={(e) => handleAppSettingUpdate('units', e.target.value)}
          >
            <option value="metric">Metric</option>
            <option value="imperial">Imperial</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderHelpTab = () => (
    <div className="settings-content">
      <h2>Help & Support</h2>
      <div className="help-section">
        <div className="help-item">
          <h3>📞 Contact Support</h3>
          <p>Get help from our support team</p>
          <button className="action-btn">Contact Us</button>
        </div>
        <div className="help-item">
          <h3>📚 User Guide</h3>
          <p>Learn how to use NepGo effectively</p>
          <button className="action-btn">View Guide</button>
        </div>
        <div className="help-item">
          <h3>❓ FAQ</h3>
          <p>Find answers to common questions</p>
          <button className="action-btn">View FAQ</button>
        </div>
        <div className="help-item">
          <h3>🐛 Report a Bug</h3>
          <p>Help us improve by reporting issues</p>
          <button className="action-btn">Report Bug</button>
        </div>
      </div>
      
      <div className="danger-zone">
        <h3>Account Actions</h3>
        <button className="danger-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Sign Out
        </button>
        <button className="danger-btn">
          Delete Account
        </button>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileTab();
      case 'notifications':
        return renderNotificationsTab();
      case 'privacy':
        return renderPrivacyTab();
      case 'preferences':
        return renderPreferencesTab();
      case 'help':
        return renderHelpTab();
      default:
        return renderProfileTab();
    }
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1><FaCog /> Settings</h1>
        <p>Manage your account and app preferences</p>
      </div>

      <div className="settings-layout">
        <div className="settings-sidebar">
          {settingsTabs.map((tab) => (
            <button
              key={tab.id}
              className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon />
              {tab.name}
            </button>
          ))}
        </div>

        <div className="settings-main">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;
