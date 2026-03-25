import { useState } from 'react';

function Cards() {
  const [activeCard, setActiveCard] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  const cards = [
    {
      id: 0,
      type: 'Main Account',
      number: '**** **** **** 4521',
      fullNumber: '4521 8832 7743 4521',
      holder: 'Abdulhadi',
      expiry: '03/28',
      cvv: '***',
      balance: '$150,521.00',
      color: 'blue',
      limit: '$200,000',
      spent: '$49,479',
    },
    {
      id: 1,
      type: 'Savings Account',
      number: '**** **** **** 8832',
      fullNumber: '8832 4521 1234 8832',
      holder: 'Abdulhadi',
      expiry: '07/29',
      cvv: '***',
      balance: '$32,000.00',
      color: 'dark',
      limit: '$50,000',
      spent: '$18,000',
    },
  ];

  const card = cards[activeCard];

  return (
    <div className="page-content">
      <h1>My Cards</h1>
      <p className="page-subtitle">Manage your bank cards</p>

      <div className="cards-layout">

        {/* LEFT — CARD DISPLAY */}
        <div>
          {/* CARD SWITCHER */}
          <div className="card-switcher">
            {cards.map((c, i) => (
              <button
                key={c.id}
                className={`card-switch-btn ${activeCard === i ? 'active' : ''}`}
                onClick={() => { setActiveCard(i); setShowDetails(false); }}>
                {c.type}
              </button>
            ))}
          </div>

          {/* CARD VISUAL */}
          <div className={`bank-card ${card.color}`} style={{width: '100%', maxWidth: '380px'}}>
            <div className="bank-card-top">
              <span className="bank-card-label">SwiftWallet • {card.type}</span>
              <span className="bank-card-chip">💳</span>
            </div>
            <div className="bank-card-number">
              {showDetails ? card.fullNumber : card.number}
            </div>
            <div className="bank-card-bottom">
              <div>
                <p className="bank-card-small">Card Holder</p>
                <p className="bank-card-name">{card.holder}</p>
              </div>
              <div>
                <p className="bank-card-small">Expires</p>
                <p className="bank-card-name">{card.expiry}</p>
              </div>
              <div>
                <p className="bank-card-small">CVV</p>
                <p className="bank-card-name">{showDetails ? '***' : card.cvv}</p>
              </div>
            </div>
          </div>

          {/* CARD ACTIONS */}
          <div className="card-actions" style={{marginTop: '20px'}}>
            <button className="action-btn blue"
              onClick={() => setShowDetails(!showDetails)}>
              {showDetails ? '🔒 Hide' : '👁️ Show'} Details
            </button>
            <button className="action-btn outline">🔒 Freeze</button>
            <button className="action-btn outline">⚙️ Settings</button>
          </div>
        </div>

        {/* RIGHT — CARD INFO */}
        <div>
          {/* BALANCE */}
          <div className="section-card" style={{marginBottom: '16px'}}>
            <h2>Balance</h2>
            <div style={{fontSize: '36px', fontWeight: '900', color: 'white', marginBottom: '16px',
              background: 'linear-gradient(135deg, #ffffff, #00e5ff)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
              {card.balance}
            </div>
            <div className="info-row">
              <span className="info-label">Card Limit</span>
              <span className="info-value">{card.limit}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Spent This Month</span>
              <span className="info-value" style={{color: '#ff4444'}}>{card.spent}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Available</span>
              <span className="info-value" style={{color: '#00e5ff'}}>{card.balance}</span>
            </div>
          </div>

          {/* RECENT TRANSACTIONS */}
          <div className="section-card" style={{marginBottom: '16px'}}>
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
                <h4>Transfer</h4>
                <p>Mar 8, 2026</p>
              </div>
              <span className="transaction-amount debit">-$500</span>
            </div>
          </div>

          {/* ADD NEW CARD */}
          <button className="action-btn blue" style={{width: '100%'}}>
            ➕ Add New Card
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cards;