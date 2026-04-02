import React, { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import { useTheme } from './contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEdit, FaMedal, FaStar, FaCloudSun, FaMoon, FaSun, FaLock, FaTrash, FaEye } from 'react-icons/fa';import './Profile.css';

const ACHIEVEMENTS = [
  { icon: <FaMedal color="#FFD700" />, label: "First Trek" },
  { icon: <FaStar color="#38bdf8" />, label: "Summited 5000m+" }
];
const TREK_HISTORY = [
  { name: 'Langtang Valley', date: '2023-11-10', rating: 5 },
  { name: 'Manaslu Circuit', date: '2023-04-22', rating: 4 }
];
const UPCOMING_TREKS = [
  { name: 'Everest Base Camp', date: '2024-06-15', status: 'Confirmed' },
  { name: 'Annapurna Circuit', date: '2024-09-10', status: 'Pending' }
];

const Profile = () => {
  const { user } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || ''
  });
  const [docs, setDocs] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [notifEnabled, setNotifEnabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleEditSave = () => {
    // Mock save logic
    setEditOpen(false);
  };
  const handleUploadDoc = e => {
    const file = e.target.files[0];
    if (file) setDocs(d => [...d, { name: file.name, url: URL.createObjectURL(file) }]);
  };
  const handleAddPhoto = e => {
    const file = e.target.files[0];
    if (file) setPhotos(p => [...p, { name: file.name, url: URL.createObjectURL(file) }]);
  };

  return (
    <div className="profile-container">
      <div className="profile-header glass-card">
        <div className="profile-avatar">
          <FaUser size={48} />
        </div>
        <h1>Your Profile</h1>
        <p>Manage your NepGo account settings</p>
        <button className="btn" style={{ marginTop: 12, background: 'var(--primary)', color: '#fff', borderRadius: 16 }} onClick={() => setEditOpen(true)}>
          <FaEdit style={{ marginRight: 6 }} /> Edit Profile
        </button>
      </div>
      <div className="profile-content">
        <div className="profile-card glass-card">
          <h2>Personal Information</h2>
          <div className="profile-info">
            <div className="info-item"><label>First Name:</label><span>{user.firstName || 'Not provided'}</span></div>
            <div className="info-item"><label>Last Name:</label><span>{user.lastName || 'Not provided'}</span></div>
            <div className="info-item"><label>Email:</label><span>{user.email}</span></div>
            <div className="info-item"><label>Member Since:</label><span>Welcome, new explorer! 🎉</span></div>
          </div>
        </div>
        {/* Achievements */}
        <div className="profile-card glass-card" style={{ marginTop: 24 }}>
          <h2>Achievements</h2>
          <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', justifyContent: 'center' }}>
            {ACHIEVEMENTS.map((ach, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, minWidth: 60 }}>
                <span style={{ fontSize: 32 }}>{ach.icon}</span>
                <span style={{ fontSize: 13, color: 'var(--text-light)', fontWeight: 600 }}>{ach.label}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Trek History */}
        <div className="profile-card glass-card" style={{ marginTop: 24 }}>
          <h2>Trek History</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {TREK_HISTORY.map((t, idx) => (
              <li key={idx} style={{ marginBottom: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
                <FaCloudSun style={{ color: 'var(--primary)' }} />
                <span style={{ fontWeight: 600 }}>{t.name}</span>
                <span style={{ color: 'var(--text-light)', fontSize: 14 }}>({t.date})</span>
                <span style={{ marginLeft: 'auto', color: 'var(--accent)', fontWeight: 600 }}>{'★'.repeat(t.rating)}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Upcoming Treks */}
        <div className="profile-card glass-card" style={{ marginTop: 24 }}>
          <h2>Upcoming Treks</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {UPCOMING_TREKS.map((t, idx) => (
              <li key={idx} style={{ marginBottom: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
                <FaCloudSun style={{ color: 'var(--primary)' }} />
                <span style={{ fontWeight: 600 }}>{t.name}</span>
                <span style={{ color: 'var(--text-light)', fontSize: 14 }}>({t.date})</span>
                <span style={{ marginLeft: 'auto', color: t.status === 'Confirmed' ? 'var(--secondary)' : 'var(--accent)', fontWeight: 600 }}>{t.status}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Settings */}
        <div className="profile-card glass-card" style={{ marginTop: 24 }}>
          <h2>Settings</h2>
          <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', alignItems: 'center' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input type="checkbox" checked={notifEnabled} onChange={() => setNotifEnabled(v => !v)} style={{ accentColor: 'var(--primary)' }} />
              Enable notifications
            </label>
            <button className="btn" style={{ background: 'var(--primary)', color: '#fff', borderRadius: 16 }} onClick={toggleTheme}>
              {isDarkMode ? <FaSun /> : <FaMoon />} Theme
            </button>
          </div>
        </div>
        {/* Document Vault */}
        <div className="profile-card glass-card" style={{ marginTop: 24 }}>
          <h2>Document Vault</h2>
          <input type="file" onChange={handleUploadDoc} style={{ marginBottom: 8 }} />
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {docs.map((doc, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <a href={doc.url} download={doc.name} style={{ color: 'var(--primary)', fontWeight: 600 }}>{doc.name}</a>
              </li>
            ))}
          </ul>
        </div>
        {/* Photo Gallery */}
        <div className="profile-card glass-card" style={{ marginTop: 24 }}>
          <h2>Photo Gallery</h2>
          <input type="file" accept="image/*" onChange={handleAddPhoto} style={{ marginBottom: 8 }} />
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {photos.map((p, idx) => (
              <img key={idx} src={p.url} alt={p.name} style={{ width: 48, height: 48, borderRadius: 8, objectFit: 'cover', boxShadow: '0 2px 8px rgba(44,62,80,0.10)' }} />
            ))}
          </div>
        </div>
        {/* Security & Account Actions */}
        <div className="profile-card glass-card" style={{ marginTop: 24 }}>
          <h2>Security & Account</h2>
          <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', alignItems: 'center' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="New password" style={{ borderRadius: 8, border: '1px solid var(--gray-200)', padding: '4px 8px' }} />
              <button className="btn" style={{ background: 'var(--primary)', color: '#fff', borderRadius: 12, fontSize: 13 }} onClick={() => setShowPassword(v => !v)}><FaEye /></button>
            </label>
            <button className="btn" style={{ background: 'var(--primary)', color: '#fff', borderRadius: 16, fontSize: 13 }}>Change Password</button>
            <button className="btn" style={{ background: 'var(--danger)', color: '#fff', borderRadius: 16, fontSize: 13 }}><FaLock style={{ marginRight: 6 }} /> Enable 2FA</button>
            <button className="btn" style={{ background: 'var(--danger)', color: '#fff', borderRadius: 16, fontSize: 13 }}><FaTrash style={{ marginRight: 6 }} /> Delete Account</button>
          </div>
        </div>
      </div>
      {/* Edit Profile Modal */}
      {editOpen && (
        <div className="glass-card" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, margin: 'auto', zIndex: 2000, maxWidth: 400, padding: 32, boxShadow: '0 8px 32px rgba(44,62,80,0.18)', display: 'flex', flexDirection: 'column', gap: 18, animation: 'fadeIn 0.3s' }}>
          <h2>Edit Profile</h2>
          <label>First Name<input type="text" value={editData.firstName} onChange={e => setEditData(d => ({ ...d, firstName: e.target.value }))} style={{ width: '100%', borderRadius: 8, border: '1px solid var(--gray-200)', padding: '6px 10px', marginTop: 4 }} /></label>
          <label>Last Name<input type="text" value={editData.lastName} onChange={e => setEditData(d => ({ ...d, lastName: e.target.value }))} style={{ width: '100%', borderRadius: 8, border: '1px solid var(--gray-200)', padding: '6px 10px', marginTop: 4 }} /></label>
          <label>Email<input type="email" value={editData.email} onChange={e => setEditData(d => ({ ...d, email: e.target.value }))} style={{ width: '100%', borderRadius: 8, border: '1px solid var(--gray-200)', padding: '6px 10px', marginTop: 4 }} /></label>
          <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
            <button className="btn" style={{ background: 'var(--primary)', color: '#fff', fontWeight: 600, borderRadius: 12 }} onClick={handleEditSave}>Save</button>
            <button className="btn" style={{ background: 'var(--danger)', color: '#fff', fontWeight: 600, borderRadius: 12 }} onClick={() => setEditOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
