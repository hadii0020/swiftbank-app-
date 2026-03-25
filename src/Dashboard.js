import { useState } from 'react';
import Transfer from './Transfer';
import Profile from './Profile';
import Cards from './Cards';
import Crypto from './Crypto.';

function Dashboard({ onLogout }) {
  const [activePage, setActivePage] = useState('wallet');
  const [showNotif, setShowNotif] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showReceive, setShowReceive] = useState(false);
  
  return (
    <div className="dashboard">

      {/* SIDEBAR */}
      <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-top">
          {sidebarOpen && (
            <div className="wallet-identity">
              <div className="wallet-avatar">AH</div>
              <div>
                <h3 className="wallet-name">Swift<span>Wallet</span></h3>
                <p className="wallet-address">0x742d...f8fA</p>
              </div>
            </div>
          )}
          <button className="toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        <nav className="sidebar-nav">
          <a href="#" className={`nav-item ${activePage === 'wallet' ? 'active' : ''}`}
            onClick={() => setActivePage('wallet')}>
            <span className="nav-icon">👛</span>
            {sidebarOpen && <span className="nav-text">Wallet</span>}
          </a>
          <a href="#" className={`nav-item ${activePage === 'crypto' ? 'active' : ''}`}
            onClick={() => setActivePage('crypto')}>
            <span className="nav-icon">₿</span>
            {sidebarOpen && <span className="nav-text">Crypto</span>}
          </a>
          <a href="#" className={`nav-item ${activePage === 'cards' ? 'active' : ''}`}
            onClick={() => setActivePage('cards')}>
            <span className="nav-icon">💳</span>
            {sidebarOpen && <span className="nav-text">Cards</span>}
          </a>
          <a href="#" className={`nav-item ${activePage === 'transfer' ? 'active' : ''}`}
            onClick={() => setActivePage('transfer')}>
            <span className="nav-icon">📤</span>
            {sidebarOpen && <span className="nav-text">Transfer</span>}
          </a>
          <a href="#" className={`nav-item ${activePage === 'activity' ? 'active' : ''}`}
            onClick={() => setActivePage('activity')}>
            <span className="nav-icon">📋</span>
            {sidebarOpen && <span className="nav-text">Activity</span>}
          </a>
          <a href="#" className={`nav-item ${activePage === 'profile' ? 'active' : ''}`}
            onClick={() => setActivePage('profile')}>
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

        {/* WALLET PAGE */}
        {activePage === 'wallet' && (
          <>
            {/* HEADER */}
            <div className="dashboard-header">
              <div>
                <p style={{color: '#555', fontSize: '13px'}}>Total Balance</p>
                <h1 className="wallet-total">$175,353.50</h1>
                <p style={{color: '#00e5ff', fontSize: '13px'}}>↑ +$1,240 (0.71%) today</p>
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
                        <p>0.05 BTC received</p>
                      </div>
                      <div className="notif-item">
                        <span className="notif-dot blue"></span>
                        <p>ETH transfer confirmed</p>
                      </div>
                      <div className="notif-item">
                        <span className="notif-dot orange"></span>
                        <p>BTC price up 3.2%</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="avatar-container">
                  <div className="avatar">AH</div>
                  <div className="avatar-info">
                    <h4>Abdulhadi</h4>
                    <p>0x742d...f8fA</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="wallet-actions">
              <button className="wallet-action-btn" onClick={() => setActivePage('transfer')}>
                <span>📤</span>
                <p>Send</p>
              </button>
              <button className="wallet-action-btn" onClick={() => setActivePage('transfer')}>
              <span>📥</span>
              <p>Receive</p>
              </button>
              <button className="wallet-action-btn" onClick={() => setActivePage('crypto')}>
                <span>🔄</span>
                <p>Swap</p>
              </button>
              <button className="wallet-action-btn" onClick={() => setActivePage('cards')}>
                <span>💳</span>
                <p>Cards</p>
              </button>
            </div>

            

            {/* TOKEN LIST */}
            <div className="section-card" style={{marginBottom: '24px'}}>
              <h2>Tokens</h2>
              <div className="crypto-list">
                <div className="crypto-item">
                  <div className="crypto-icon" style={{background: '#f7931a'}}>₿</div>
                  <div className="crypto-details">
                    <h4>Bitcoin</h4>
                    <p>0.3542 BTC</p>
                  </div>
                  <div className="crypto-amount">
                    <h4>$14,320.00</h4>
                    <p className="crypto-value" style={{color: '#00e5ff'}}>+3.2%</p>
                  </div>
                </div>
                <div className="crypto-item">
                  <div className="crypto-icon" style={{background: '#627eea'}}>Ξ</div>
                  <div className="crypto-details">
                    <h4>Ethereum</h4>
                    <p>2.841 ETH</p>
                  </div>
                  <div className="crypto-amount">
                    <h4>$7,102.50</h4>
                    <p className="crypto-value" style={{color: '#00e5ff'}}>+1.8%</p>
                  </div>
                </div>
                <div className="crypto-item">
                  <div className="crypto-icon" style={{background: '#f3ba2f', color: '#1a1a2e'}}>B</div>
                  <div className="crypto-details">
                    <h4>BNB</h4>
                    <p>10.5 BNB</p>
                  </div>
                  <div className="crypto-amount">
                    <h4>$3,410.00</h4>
                    <p className="crypto-value" style={{color: '#ff4444'}}>-0.5%</p>
                  </div>
                </div>
                <div className="crypto-item">
                  <div className="crypto-icon" style={{background: '#0d1117', border: '1px solid #1a2535', color: '#00e5ff'}}>$</div>
                  <div className="crypto-details">
                    <h4>Bank Balance</h4>
                    <p>SwiftWallet Card</p>
                  </div>
                  <div className="crypto-amount">
                    <h4>$150,521.00</h4>
                    <p className="crypto-value">Fiat</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RECENT ACTIVITY */}
            <div className="section-card">
              <h2>Recent Activity</h2>
              <div className="transaction-item">
                <div className="transaction-icon green">📥</div>
                <div className="transaction-details">
                  <h4>Received BTC</h4>
                  <p>From 1A1zP...Divf • Mar 10</p>
                </div>
                <span className="transaction-amount credit">+0.05 BTC</span>
              </div>
              <div className="transaction-item">
                <div className="transaction-icon blue">🔄</div>
                <div className="transaction-details">
                  <h4>Swapped ETH → BNB</h4>
                  <p>Mar 9, 2026</p>
                </div>
                <span className="transaction-amount" style={{color: '#888'}}>1.2 ETH</span>
              </div>
              <div className="transaction-item">
                <div className="transaction-icon red">📤</div>
                <div className="transaction-details">
                  <h4>Sent ETH</h4>
                  <p>To 0x9f3e...2c1a • Mar 8</p>
                </div>
                <span className="transaction-amount debit">-0.5 ETH</span>
              </div>
              <div className="transaction-item">
                <div className="transaction-icon green">💵</div>
                <div className="transaction-details">
                  <h4>Salary Payment</h4>
                  <p>Mar 7, 2026</p>
                </div>
                <span className="transaction-amount credit">+$3,500</span>
              </div>
            </div>
          </>
        )}

        {activePage === 'crypto' && <Crypto />}
        {activePage === 'cards' && <Cards />}
        {activePage === 'transfer' && <Transfer />}
        {activePage === 'profile' && <Profile />}

        {/* ACTIVITY PAGE */}
        {activePage === 'activity' && (
          <div className="page-content">
            <h1>Activity</h1>
            <p className="page-subtitle">Your transaction history</p>
            <div className="section-card">
              <div className="transaction-item">
                <div className="transaction-icon green">📥</div>
                <div className="transaction-details">
                  <h4>Received BTC</h4>
                  <p>From 1A1zP...Divf • Mar 10, 2026</p>
                </div>
                <span className="transaction-amount credit">+0.05 BTC</span>
              </div>
              <div className="transaction-item">
                <div className="transaction-icon blue">🔄</div>
                <div className="transaction-details">
                  <h4>Swapped ETH → BNB</h4>
                  <p>Mar 9, 2026</p>
                </div>
                <span className="transaction-amount" style={{color: '#888'}}>1.2 ETH</span>
              </div>
              <div className="transaction-item">
                <div className="transaction-icon red">📤</div>
                <div className="transaction-details">
                  <h4>Sent ETH</h4>
                  <p>To 0x9f3e...2c1a • Mar 8, 2026</p>
                </div>
                <span className="transaction-amount debit">-0.5 ETH</span>
              </div>
              <div className="transaction-item">
                <div className="transaction-icon green">💵</div>
                <div className="transaction-details">
                  <h4>Salary Payment</h4>
                  <p>Mar 7, 2026</p>
                </div>
                <span className="transaction-amount credit">+$3,500</span>
              </div>
              <div className="transaction-item">
                <div className="transaction-icon red">🛒</div>
                <div className="transaction-details">
                  <h4>Shopping</h4>
                  <p>Mar 6, 2026</p>
                </div>
                <span className="transaction-amount debit">-$240</span>
              </div>
              <div className="transaction-item">
                <div className="transaction-icon green">📥</div>
                <div className="transaction-details">
                  <h4>Received USDT</h4>
                  <p>Mar 5, 2026</p>
                </div>
                <span className="transaction-amount credit">+$500 USDT</span>
              </div>
              <div className="transaction-item">
                <div className="transaction-icon blue">📤</div>
                <div className="transaction-details">
                  <h4>Transfer to John</h4>
                  <p>Mar 4, 2026</p>
                </div>
                <span className="transaction-amount debit">-$500</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Dashboard;