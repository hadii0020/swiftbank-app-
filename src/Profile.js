import { useState } from 'react';

function Profile() {
  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="page-content">
      <h1>Account</h1>
      <p className="page-subtitle">Manage your profile and settings</p>

      {/* TABS */}
      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}>
          👤 Profile
        </button>
        <button
          className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}>
          ⚙️ Settings
        </button>
      </div>

      {/* PROFILE TAB */}
      {activeTab === 'profile' && (
        <div className="profile-grid">
          <div className="profile-card">
            <div className="profile-avatar-large">AH</div>
            <h2>Abdulhadi</h2>
            <p>Premium Account</p>
            <button className="action-btn blue">📷 Change Photo</button>
          </div>
          <div className="section-card">
            <h2>Personal Information</h2>
            <div className="info-row">
              <span className="info-label">Full Name</span>
              <span className="info-value">Abdulhadi mijinyawa sani </span>
            </div>
            <div className="info-row">
              <span className="info-label">Email</span>
              <span className="info-value">abdulhadi0020@gmail.com</span>
            </div>
            <div className="info-row">
              <span className="info-label">Phone</span>
              <span className="info-value">+234 7018198258</span>
            </div>
            <div className="info-row">
              <span className="info-label">Location</span>
              <span className="info-value">Gombe, Nigeria</span>
            </div>
            <div className="info-row">
              <span className="info-label">Account Type</span>
              <span className="info-value premium">⭐ Premium</span>
            </div>
            <button className="action-btn blue" style={{marginTop: '20px'}}>
              ✏️ Edit Information
            </button>
          </div>
        </div>
      )}

      {/* SETTINGS TAB */}
      {activeTab === 'settings' && (
        <div className="settings-grid">
          <div className="section-card">
            <h2>Preferences</h2>
            <div className="setting-row">
              <div>
                <h4>Push Notifications</h4>
                <p>Receive alerts for transactions</p>
              </div>
              <div
                className={`toggle ${notifications ? 'on' : 'off'}`}
                onClick={() => setNotifications(!notifications)}>
                <div className="toggle-circle"></div>
              </div>
            </div>
            <div className="setting-row">
              <div>
                <h4>Two Factor Authentication</h4>
                <p>Extra security for your account</p>
              </div>
              <div
                className={`toggle ${twoFactor ? 'on' : 'off'}`}
                onClick={() => setTwoFactor(!twoFactor)}>
                <div className="toggle-circle"></div>
              </div>
            </div>
            <div className="setting-row">
              <div>
                <h4>Dark Mode</h4>
                <p>Switch to dark theme</p>
              </div>
              <div
                className={`toggle ${darkMode ? 'on' : 'off'}`}
                onClick={() => setDarkMode(!darkMode)}>
                <div className="toggle-circle"></div>
              </div>
            </div>
          </div>
          <div className="section-card">
            <h2>Security</h2>
            <button className="action-btn blue">🔑 Change Password</button>
            <button className="action-btn outline" style={{marginTop: '12px'}}>
              📱 Manage Devices
            </button>
            <button className="action-btn outline" style={{marginTop: '12px'}}>
              📋 Activity Log
            </button>
            <button className="action-btn danger" style={{marginTop: '24px'}}>
              🗑️ Delete Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;