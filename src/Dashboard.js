import { useState } from 'react';

function Dashboard({ onLogout }) {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [sendMsg, setSendMsg] = useState('');

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
      <div className="sidebar">
        <h2 className="sidebar-logo">Swift<span>Bank</span></h2>
        <nav className="sidebar-nav">
          <a href="#" className="nav-item active">🏠 Dashboard</a>
          <a href="#" className="nav-item">💳 Cards</a>
          <a href="#" className="nav-item">📤 Transfer</a>
          <a href="#" className="nav-item">📊 Analytics</a>
          <a href="#" className="nav-item">👤 Profile</a>
          <a href="#" className="nav-item">⚙️ Settings</a>
        </nav>
        <button className="logout-btn" onClick={onLogout}>
          🚪 Logout
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
          <div className="header-avatar">A</div>
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

        {/* STATS */}
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-icon">📥</span>
            <div>
              <h3>$10,240</h3>
              <p>Total Income</p>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">📤</span>
            <div>
              <h3>$1,830</h3>
              <p>Total Expenses</p>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-icon">💰</span>
            <div>
              <h3>$3,410</h3>
              <p>Net Savings</p>
            </div>
          </div>
        </div>

        {/* BOTTOM GRID */}
        <div className="bottom-grid">

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

          {/* SEND MONEY */}
          <div className="section-card">
            <h2>Send Money</h2>
            {sendMsg && (
              <div style={{
                padding: '12px',
                borderRadius: '8px',
                marginBottom: '16px',
                background: sendMsg.includes('✅') ? '#f0fdf4' : '#fef2f2',
                color: sendMsg.includes('✅') ? '#16a34a' : '#dc2626',
                fontSize: '14px'
              }}>
                {sendMsg}
              </div>
            )}
            <div className="send-form">
              <div className="form-group">
                <label>Recipient Name</label>
                <input
                  type="text"
                  placeholder="Enter recipient name"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Account Number</label>
                <input
                  type="text"
                  placeholder="Enter account number"
                />
              </div>
              <div className="form-group">
                <label>Amount ($)</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <button className="send-btn" onClick={handleSend}>
                Send Money 📤
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;