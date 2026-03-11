import { useState } from 'react';

function Dashboard({ onLogout }) {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [sendMsg, setSendMsg] = useState('');
  const [showNotif, setShowNotif] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSend = () => {
    if (recipient === '' || amount === '') {
      setSendMsg('❌ Please fill in all fields!');
    } else if (isNaN(amount) || amount <= 0) {
      setSendMsg('❌ Please enter a valid amount!');
    } else {
      setSendMsg(`✅ $${amount} sent to ${recipient} successfully!`);
      setRecipient('');
      setAmount('');
    }
  };

  return (
    <div className="dashboard">

      {/* SIDEBAR */}
      <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-top">
          {sidebarOpen && <h2 className="sidebar-logo">Swift<span>Bank</span></h2>}
          <button className="toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>
        <nav className="sidebar-nav">
          <a href="#" className="nav-item active">
            <span className="nav-icon">🏠</span>
            {sidebarOpen && <span className="nav-text">Dashboard</span>}
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">💳</span>
            {sidebarOpen && <span className="nav-text">Cards</span>}
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">📤</span>
            {sidebarOpen && <span className="nav-text">Transfer</span>}
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">📊</span>
            {sidebarOpen && <span className="nav-text">Analytics</span>}
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">👤</span>
            {sidebarOpen && <span className="nav-text">Profile</span>}
          </a>
          <a href="#" className="nav-item">
            <span className="nav-icon">⚙️</span>
            {sidebarOpen && <span className="nav-text">Settings</span>}
          </a>
        </nav>
        <button className="logout-btn" onClick={onLogout}>
          <span className="nav-icon">🚪</span>
          {sidebarOpen && <span className="nav-text">Logout</span>}
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="main-content">

        {/* HEADER */}
        <div className="dashboard-header">
          <div>
            <h1>Good morning, Abdulhadi 👋</h1>
            <p>Tuesday, March 11, 2026</p>
          </div>
          <div className="header-right">
            <div className="notification-bell" onClick={() => setShowNotif(!showNotif)}>
              🔔
              <span className="notif-badge">3</span>
              {showNotif && (
                <div className="notif-dropdown">
                  <h4>Notifications</h4>
                  <div className="notif-item">
                    <span className="notif-dot green"></span>
                    <p>Salary of $3,500 received</p>
                  </div>
                  <div className="notif-item">
                    <span className="notif-dot blue"></span>
                    <p>Transfer to John confirmed</p>
                  </div>
                  <div className="notif-item">
                    <span className="notif-dot orange"></span>
                    <p>Bill payment due tomorrow</p>
                  </div>
                </div>
              )}
            </div>
            <div className="avatar-container">
              <div className="avatar">AH</div>
              <div className="avatar-info">
                <h4>Abdulhadi</h4>
                <p>Premium Account</p>
              </div>
            </div>
          </div>
        </div>

        {/* BALANCE CARD */}
        <div className="balance-card">
          <div>
            <h3>TOTAL BALANCE</h3>
            <div className="balance-amount">$124,521.00</div>
            <div className="balance-card-number">**** **** **** 4521</div>
          </div>
          <div className="card-chip">💳</div>
        </div>

        {/* QUICK ACTIONS */}
<div className="quick-actions-grid">
  <div className="quick-action-card">
    <div className="quick-action-icon blue">📤</div>
    <p>Transfer</p>
  </div>
  <div className="quick-action-card">
    <div className="quick-action-icon red">💸</div>
    <p>Withdraw</p>
  </div>
  <div className="quick-action-card">
    <div className="quick-action-icon green">📥</div>
    <p>Deposit</p>
  </div>
</div>

        {/* BOTTOM GRID */}
        <div className="bottom-grid full">

          {/* TRANSACTIONS */}
          <div className="section-card">
            <h2>Recent Transactions</h2>
            <div className="transaction-item">
              <div className="transaction-icon green">💵</div>
              <div className="transaction-details">
                <h4>Salary Payment</h4>
                <p>Mar 10, 2026</p>
              </div>
              <span className="transaction-amount credit">+$3,500</span>
            </div>
            <div className="transaction-item">
              <div className="transaction-icon red">🛒</div>
              <div className="transaction-details">
                <h4>Shopping</h4>
                <p>Mar 9, 2026</p>
              </div>
              <span className="transaction-amount debit">-$240</span>
            </div>
            <div className="transaction-item">
              <div className="transaction-icon blue">📤</div>
              <div className="transaction-details">
                <h4>Transfer to John</h4>
                <p>Mar 8, 2026</p>
              </div>
              <span className="transaction-amount debit">-$500</span>
            </div>
            <div className="transaction-item">
              <div className="transaction-icon green">💵</div>
              <div className="transaction-details">
                <h4>Freelance Payment</h4>
                <p>Mar 7, 2026</p>
              </div>
              <span className="transaction-amount credit">+$1,200</span>
            </div>
            <div className="transaction-item">
              <div className="transaction-icon red">⚡</div>
              <div className="transaction-details">
                <h4>Electricity Bill</h4>
                <p>Mar 6, 2026</p>
              </div>
              <span className="transaction-amount debit">-$90</span>
            </div>
          </div>

         
        </div>
      </div>
    </div>
  );
}

export default Dashboard;