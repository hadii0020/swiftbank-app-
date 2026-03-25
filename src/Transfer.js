import { useState } from 'react';

function Transfer() {
  const [activeTab, setActiveTab] = useState('send');
  const [step, setStep] = useState(1);
  const [recipient, setRecipient] = useState('');
  const [account, setAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [selectedAsset, setSelectedAsset] = useState('BTC');
  const [success, setSuccess] = useState(false);

  const assets = [
    { symbol: 'BTC', name: 'Bitcoin', balance: '0.3542', icon: '₿', color: '#f7931a' },
    { symbol: 'ETH', name: 'Ethereum', balance: '2.841', icon: 'Ξ', color: '#627eea' },
    { symbol: 'BNB', name: 'BNB', balance: '10.5', icon: 'B', color: '#f3ba2f' },
    { symbol: 'USD', name: 'Bank Balance', balance: '$150,521', icon: '$', color: '#00e5ff' },
  ];

  const handleContinue = () => {
    if (recipient === '' || account === '') {
      alert('Please fill in all fields!');
      return;
    }
    setStep(2);
  };

  const handleSend = () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount!');
      return;
    }
    setSuccess(true);
    setStep(3);
  };

  const handleReset = () => {
    setStep(1);
    setRecipient('');
    setAccount('');
    setAmount('');
    setNote('');
    setSuccess(false);
  };

  return (
    <div className="page-content">
      <h1>Transfer</h1>
      <p className="page-subtitle">Send and receive crypto & fiat</p>

      {/* TABS */}
      <div className="tabs">
        <button className={`tab-btn ${activeTab === 'send' ? 'active' : ''}`}
          onClick={() => { setActiveTab('send'); handleReset(); }}>
          📤 Send
        </button>
        <button className={`tab-btn ${activeTab === 'receive' ? 'active' : ''}`}
          onClick={() => setActiveTab('receive')}>
          📥 Receive
        </button>
      </div>

      {/* SEND TAB */}
      {activeTab === 'send' && (
        <div className="transfer-grid">
          <div className="section-card">

            {/* STEPS */}
            <div className="steps">
              <div className={`step ${step >= 1 ? 'active' : ''}`}>
                <div className="step-circle">1</div>
                <span>Details</span>
              </div>
              <div className="step-line"></div>
              <div className={`step ${step >= 2 ? 'active' : ''}`}>
                <div className="step-circle">2</div>
                <span>Amount</span>
              </div>
              <div className="step-line"></div>
              <div className={`step ${step >= 3 ? 'active' : ''}`}>
                <div className="step-circle">3</div>
                <span>Done</span>
              </div>
            </div>

            {/* STEP 1 */}
            {step === 1 && (
              <div className="transfer-step">
                <h3>Who are you sending to?</h3>

                {/* ASSET SELECTOR */}
                <div className="form-group">
                  <label>Select Asset</label>
                  <div className="asset-selector">
                    {assets.map(asset => (
                      <div
                        key={asset.symbol}
                        className={`asset-option ${selectedAsset === asset.symbol ? 'selected' : ''}`}
                        onClick={() => setSelectedAsset(asset.symbol)}>
                        <div className="asset-icon" style={{background: asset.color, color: asset.symbol === 'BNB' ? '#1a1a2e' : asset.symbol === 'USD' ? '#050a0e' : 'white'}}>
                          {asset.icon}
                        </div>
                        <div>
                          <p className="asset-symbol">{asset.symbol}</p>
                          <p className="asset-balance">{asset.balance}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label>
                    {selectedAsset === 'USD' ? 'Recipient Name' : 'Wallet Address'}
                  </label>
                  <input
                    type="text"
                    placeholder={selectedAsset === 'USD' ? 'Enter recipient name' : 'Enter wallet address (0x...)'}
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>
                    {selectedAsset === 'USD' ? 'Account Number' : 'Confirm Address'}
                  </label>
                  <input
                    type="text"
                    placeholder={selectedAsset === 'USD' ? 'Enter account number' : 'Confirm wallet address'}
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                  />
                </div>

                {selectedAsset === 'USD' && (
                  <div className="form-group">
                    <label>Bank</label>
                    <select className="transfer-select">
                      <option>Select bank</option>
                      <option>Access Bank</option>
                      <option>GTBank</option>
                      <option>Zenith Bank</option>
                      <option>First Bank</option>
                      <option>UBA</option>
                      <option>Kuda Bank</option>
                    </select>
                  </div>
                )}

                <button className="action-btn blue" style={{width: '100%'}} onClick={handleContinue}>
                  Continue →
                </button>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="transfer-step">
                <h3>How much are you sending?</h3>

                <div className="transfer-summary">
                  <span>Asset</span>
                  <strong>{selectedAsset}</strong>
                </div>
                <div className="transfer-summary">
                  <span>To</span>
                  <strong>{recipient}</strong>
                </div>

                <div className="form-group" style={{marginTop: '20px'}}>
                  <label>Amount ({selectedAsset})</label>
                  <input
                    type="number"
                    placeholder={`Enter amount in ${selectedAsset}`}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="amount-input"
                  />
                </div>

                <div className="form-group">
                  <label>Note (optional)</label>
                  <input
                    type="text"
                    placeholder="What is this for?"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>

                <div style={{display: 'flex', gap: '12px'}}>
                  <button className="action-btn outline" onClick={() => setStep(1)}>← Back</button>
                  <button className="action-btn blue" style={{flex: 1}} onClick={handleSend}>
                    Send {selectedAsset} 📤
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="transfer-success">
                <div className="success-icon">✅</div>
                <h3>Transfer Successful!</h3>
                <p>{amount} {selectedAsset} sent to <strong style={{color: 'white'}}>{recipient}</strong></p>
                <p className="success-ref">Ref: TXN{Math.floor(Math.random() * 1000000)}</p>
                <button className="action-btn blue" onClick={handleReset}>
                  Make Another Transfer
                </button>
              </div>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div>
            <div className="section-card" style={{marginBottom: '16px'}}>
              <h2>Saved Beneficiary</h2>
              <div className="beneficiary-list">
                <div className="beneficiary-item"
                  onClick={() => { setRecipient('John Doe'); setAccount('1234567890'); }}>
                  <div className="beneficiary-avatar" style={{background: '#00e5ff11', color: '#00e5ff'}}>JD</div>
                  <div>
                    <h4>John Doe</h4>
                    <p>GTBank • **** 7890</p>
                  </div>
                </div>
                <div className="beneficiary-item"
                  onClick={() => { setRecipient('Sarah Smith'); setAccount('0987654321'); }}>
                  <div className="beneficiary-avatar" style={{background: '#00ff8811', color: '#00ff88'}}>SS</div>
                  <div>
                    <h4>Sarah Smith</h4>
                    <p>0x9f3e...2c1a</p>
                  </div>
                </div>
                <div className="beneficiary-item"
                  onClick={() => { setRecipient('Mike Johnson'); setAccount('1122334455'); }}>
                  <div className="beneficiary-avatar" style={{background: '#ff444411', color: '#ff4444'}}>MJ</div>
                  <div>
                    <h4>Mike Johnson</h4>
                    <p>Zenith Bank • **** 4455</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="section-card">
              <h2>Recent Transfers</h2>
              <div className="transaction-item">
                <div className="transaction-icon blue">📤</div>
                <div className="transaction-details">
                  <h4>Sent ETH</h4>
                  <p>To 0x9f3e...2c1a • Mar 10</p>
                </div>
                <span className="transaction-amount debit">-0.5 ETH</span>
              </div>
              <div className="transaction-item">
                <div className="transaction-icon blue">📤</div>
                <div className="transaction-details">
                  <h4>John Doe</h4>
                  <p>GTBank • Mar 8</p>
                </div>
                <span className="transaction-amount debit">-$500</span>
              </div>
              <div className="transaction-item">
                <div className="transaction-icon blue">📤</div>
                <div className="transaction-details">
                  <h4>Sent BTC</h4>
                  <p>To 1A1zP...Divf • Mar 5</p>
                </div>
                <span className="transaction-amount debit">-0.02 BTC</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RECEIVE TAB */}
      {activeTab === 'receive' && (
        <div className="transfer-grid">
          <div className="section-card">
            <h3 style={{color: 'white', marginBottom: '20px'}}>Your Wallet Addresses</h3>
            <div className="wallet-list">
              <div className="wallet-item">
                <div style={{background: '#f7931a', color: 'white', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', flexShrink: 0}}>₿</div>
                <div className="wallet-details">
                  <h4>Bitcoin (BTC)</h4>
                  <p className="wallet-address">1A1zP1eP5QGefi2DMPTfTL5SLmv7Divf</p>
                </div>
                <button className="action-btn outline" style={{padding: '8px 14px', fontSize: '12px'}}>📋 Copy</button>
              </div>
              <div className="wallet-item">
                <div style={{background: '#627eea', color: 'white', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', flexShrink: 0}}>Ξ</div>
                <div className="wallet-details">
                  <h4>Ethereum (ETH)</h4>
                  <p className="wallet-address">0x742d35Cc6634C0532925a3b844Bc9e7595f8fA</p>
                </div>
                <button className="action-btn outline" style={{padding: '8px 14px', fontSize: '12px'}}>📋 Copy</button>
              </div>
              <div className="wallet-item">
                <div style={{background: '#f3ba2f', color: '#1a1a2e', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', flexShrink: 0}}>B</div>
                <div className="wallet-details">
                  <h4>BNB</h4>
                  <p className="wallet-address">bnb1grpf0955h0ykzq3ar5nmum7y6gdfl6lxfn46h2</p>
                </div>
                <button className="action-btn outline" style={{padding: '8px 14px', fontSize: '12px'}}>📋 Copy</button>
              </div>
              <div className="wallet-item">
                <div style={{background: '#00e5ff', color: '#050a0e', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', flexShrink: 0}}>$</div>
                <div className="wallet-details">
                  <h4>Bank Account</h4>
                  <p className="wallet-address">Account: 1234567890 • GTBank</p>
                </div>
                <button className="action-btn outline" style={{padding: '8px 14px', fontSize: '12px'}}>📋 Copy</button>
              </div>
            </div>
          </div>

          <div className="section-card">
            <h3 style={{color: 'white', marginBottom: '20px'}}>QR Code</h3>
            <div style={{textAlign: 'center'}}>
              <div className="form-group">
                <label>Select Asset</label>
                <select className="transfer-select">
                  <option>Bitcoin (BTC)</option>
                  <option>Ethereum (ETH)</option>
                  <option>BNB</option>
                  <option>Bank Account</option>
                </select>
              </div>
              <div style={{
                background: 'white',
                padding: '24px',
                borderRadius: '16px',
                display: 'inline-block',
                marginTop: '16px'
              }}>
                <div style={{fontSize: '80px', lineHeight: 1}}>▦</div>
                <p style={{color: '#1a1a2e', fontSize: '12px', marginTop: '8px'}}>Scan to receive</p>
              </div>
              <p style={{color: '#444', fontSize: '12px', marginTop: '16px'}}>
                Only send supported assets to this address
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Transfer;