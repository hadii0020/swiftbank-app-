import { useState } from 'react';

function Crypto() {
  const [activeTab, setActiveTab] = useState('portfolio');
  const [buyAmount, setBuyAmount] = useState('');
  const [sellAmount, setSellAmount] = useState('');
  const [swapFrom, setSwapFrom] = useState('BTC');
  const [swapTo, setSwapTo] = useState('ETH');
  const [swapAmount, setSwapAmount] = useState('');
  const [swapMsg, setSwapMsg] = useState('');
  const [swapSuccess, setSwapSuccess] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState('BTC');
  const [tradeMsg, setTradeMsg] = useState('');
  const [tradeSuccess, setTradeSuccess] = useState(false);

  const coins = [
    { symbol: 'BTC', name: 'Bitcoin', price: 40420.50, change: 3.2, amount: 0.3542, value: 14320.00, icon: '₿', color: '#f7931a' },
    { symbol: 'ETH', name: 'Ethereum', price: 2500.75, change: 1.8, amount: 2.841, value: 7102.50, icon: 'Ξ', color: '#627eea' },
    { symbol: 'BNB', name: 'BNB', price: 324.76, change: -0.5, amount: 10.5, value: 3410.00, icon: 'B', color: '#f3ba2f' },
    { symbol: 'SOL', name: 'Solana', price: 98.43, change: 5.1, amount: 0, value: 0, icon: '◎', color: '#9945ff' },
    { symbol: 'USDT', name: 'Tether', price: 1.00, change: 0.0, amount: 0, value: 0, icon: '₮', color: '#26a17b' },
  ];

  const handleTrade = (type) => {
    const amount = type === 'buy' ? buyAmount : sellAmount;
    if (!amount || isNaN(amount) || amount <= 0) {
      setTradeMsg('Please enter a valid amount!');
      setTradeSuccess(false);
      return;
    }
    setTradeMsg(`Successfully ${type === 'buy' ? 'bought' : 'sold'} $${amount} of ${selectedCoin}!`);
    setTradeSuccess(true);
    setBuyAmount('');
    setSellAmount('');
  };

  const handleSwap = () => {
    if (!swapAmount || isNaN(swapAmount) || swapAmount <= 0) {
      setSwapMsg('Please enter a valid amount!');
      setSwapSuccess(false);
      return;
    }
    if (swapFrom === swapTo) {
      setSwapMsg('Please select different coins!');
      setSwapSuccess(false);
      return;
    }
    const fromCoin = coins.find(c => c.symbol === swapFrom);
    const toCoin = coins.find(c => c.symbol === swapTo);
    const toAmount = ((swapAmount * fromCoin.price) / toCoin.price).toFixed(6);
    setSwapMsg(`Swapped ${swapAmount} ${swapFrom} to ${toAmount} ${swapTo} successfully!`);
    setSwapSuccess(true);
    setSwapAmount('');
  };

  const selectedCoinData = coins.find(c => c.symbol === selectedCoin);

  return (
    <div className="page-content">
      <h1>Crypto</h1>
      <p className="page-subtitle">Manage your crypto portfolio</p>

      <div className="tabs">
        <button className={`tab-btn ${activeTab === 'portfolio' ? 'active' : ''}`}
          onClick={() => setActiveTab('portfolio')}>Portfolio</button>
        <button className={`tab-btn ${activeTab === 'market' ? 'active' : ''}`}
          onClick={() => setActiveTab('market')}>Market</button>
        <button className={`tab-btn ${activeTab === 'trade' ? 'active' : ''}`}
          onClick={() => setActiveTab('trade')}>Buy/Sell</button>
        <button className={`tab-btn ${activeTab === 'swap' ? 'active' : ''}`}
          onClick={() => setActiveTab('swap')}>Swap</button>
      </div>

      {activeTab === 'portfolio' && (
        <div>
          <div className="crypto-summary-grid">
            <div className="crypto-summary-card">
              <p>Total Portfolio</p>
              <h2>$24,832.50</h2>
              <span className="crypto-change positive">+$1,240 (5.2%) today</span>
            </div>
            <div className="crypto-summary-card">
              <p>Total Invested</p>
              <h2>$20,000.00</h2>
              <span className="crypto-change positive">+$4,832 profit</span>
            </div>
            <div className="crypto-summary-card">
              <p>Best Performer</p>
              <h2>SOL</h2>
              <span className="crypto-change positive">+5.1% today</span>
            </div>
          </div>
          <div className="section-card">
            <h2>My Holdings</h2>
            <div className="crypto-list">
              {coins.filter(c => c.amount > 0).map(coin => (
                <div className="crypto-item" key={coin.symbol}>
                  <div className="crypto-icon" style={{background: coin.color, color: coin.symbol === 'BNB' ? '#1a1a2e' : 'white'}}>
                    {coin.icon}
                  </div>
                  <div className="crypto-details">
                    <h4>{coin.name}</h4>
                    <p>{coin.symbol} - ${coin.price.toLocaleString()}</p>
                  </div>
                  <div className="crypto-amount">
                    <h4>{coin.amount} {coin.symbol}</h4>
                    <p className="crypto-value">${coin.value.toLocaleString()}</p>
                  </div>
                  <div className={`crypto-change ${coin.change >= 0 ? 'positive' : 'negative'}`}>
                    {coin.change >= 0 ? '+' : ''}{coin.change}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'market' && (
        <div>
          <div className="crypto-summary-grid">
            <div className="crypto-summary-card">
              <p>Market Cap</p>
              <h2>$2.4T</h2>
              <span className="crypto-change positive">+2.1%</span>
            </div>
            <div className="crypto-summary-card">
              <p>24h Volume</p>
              <h2>$89.2B</h2>
              <span className="crypto-change positive">+5.4%</span>
            </div>
            <div className="crypto-summary-card">
              <p>BTC Dominance</p>
              <h2>52.3%</h2>
              <span className="crypto-change negative">-0.3%</span>
            </div>
          </div>
          <div className="section-card">
            <h2>Live Prices</h2>
            <div className="crypto-list">
              {coins.map(coin => (
                <div className="crypto-item" key={coin.symbol}
                  onClick={() => { setSelectedCoin(coin.symbol); setActiveTab('trade'); }}>
                  <div className="crypto-icon" style={{background: coin.color, color: coin.symbol === 'BNB' ? '#1a1a2e' : 'white'}}>
                    {coin.icon}
                  </div>
                  <div className="crypto-details">
                    <h4>{coin.name}</h4>
                    <p>{coin.symbol}</p>
                  </div>
                  <div className="crypto-amount">
                    <h4>${coin.price.toLocaleString()}</h4>
                    <p className="crypto-value">Click to trade</p>
                  </div>
                  <div className={`crypto-change ${coin.change >= 0 ? 'positive' : 'negative'}`}>
                    {coin.change >= 0 ? '+' : ''}{coin.change}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'trade' && (
        <div className="trade-grid">
          <div className="section-card">
            <h2>Buy / Sell</h2>
            {tradeMsg && (
              <div style={{
                padding: '12px',
                borderRadius: '10px',
                marginBottom: '16px',
                background: tradeSuccess ? '#00e5ff11' : '#ff444411',
                color: tradeSuccess ? '#00e5ff' : '#ff4444',
                border: `1px solid ${tradeSuccess ? '#00e5ff33' : '#ff444433'}`,
                fontSize: '14px'
              }}>
                {tradeMsg}
              </div>
            )}
            <div className="form-group">
              <label>Select Coin</label>
              <div className="coin-selector">
                {coins.map(coin => (
                  <div key={coin.symbol}
                    className={`coin-option ${selectedCoin === coin.symbol ? 'selected' : ''}`}
                    onClick={() => setSelectedCoin(coin.symbol)}>
                    <div style={{
                      background: coin.color,
                      color: coin.symbol === 'BNB' ? '#1a1a2e' : 'white',
                      width: '28px', height: '28px', borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '12px', fontWeight: '900', flexShrink: 0
                    }}>
                      {coin.icon}
                    </div>
                    <span>{coin.symbol}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="price-info-bar">
              <span style={{color: '#444', fontSize: '13px'}}>{selectedCoinData.name}</span>
              <span style={{color: 'white', fontWeight: '700'}}>${selectedCoinData.price.toLocaleString()}</span>
              <span className={`crypto-change ${selectedCoinData.change >= 0 ? 'positive' : 'negative'}`}>
                {selectedCoinData.change >= 0 ? '+' : ''}{selectedCoinData.change}%
              </span>
            </div>
            <div className="trade-actions">
              <div className="form-group">
                <label>Buy Amount ($)</label>
                <input type="number" placeholder="Enter USD amount"
                  value={buyAmount}
                  onChange={(e) => { setBuyAmount(e.target.value); setTradeMsg(''); }} />
                <button className="buy-btn" onClick={() => handleTrade('buy')}>
                  Buy {selectedCoin}
                </button>
              </div>
              <div className="form-group">
                <label>Sell Amount ($)</label>
                <input type="number" placeholder="Enter USD amount"
                  value={sellAmount}
                  onChange={(e) => { setSellAmount(e.target.value); setTradeMsg(''); }} />
                <button className="sell-btn" onClick={() => handleTrade('sell')}>
                  Sell {selectedCoin}
                </button>
              </div>
            </div>
          </div>
          <div className="section-card">
            <h2>Market Info</h2>
            <div style={{textAlign: 'center', marginBottom: '20px'}}>
              <div style={{
                background: selectedCoinData.color,
                color: selectedCoin === 'BNB' ? '#1a1a2e' : 'white',
                width: '64px', height: '64px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 12px', fontSize: '28px', fontWeight: '900'
              }}>
                {selectedCoinData.icon}
              </div>
              <h3 style={{color: 'white', marginBottom: '4px'}}>{selectedCoinData.name}</h3>
            </div>
            <div className="info-row">
              <span className="info-label">Price</span>
              <span className="info-value">${selectedCoinData.price.toLocaleString()}</span>
            </div>
            <div className="info-row">
              <span className="info-label">24h Change</span>
              <span style={{color: selectedCoinData.change >= 0 ? '#00e5ff' : '#ff4444', fontWeight: '600'}}>
                {selectedCoinData.change >= 0 ? '+' : ''}{selectedCoinData.change}%
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Your Holdings</span>
              <span className="info-value">{selectedCoinData.amount} {selectedCoin}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Value</span>
              <span className="info-value">${selectedCoinData.value.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'swap' && (
        <div className="trade-grid">
          <div className="section-card">
            <h2>Swap Tokens</h2>
            {swapMsg && (
              <div style={{
                padding: '12px',
                borderRadius: '10px',
                marginBottom: '16px',
                background: swapSuccess ? '#00e5ff11' : '#ff444411',
                color: swapSuccess ? '#00e5ff' : '#ff4444',
                border: `1px solid ${swapSuccess ? '#00e5ff33' : '#ff444433'}`,
                fontSize: '14px'
              }}>
                {swapMsg}
              </div>
            )}
            <div className="swap-container">
              <div className="swap-box">
                <label>From</label>
                <div className="swap-input-row">
                  <select className="transfer-select swap-select"
                    value={swapFrom}
                    onChange={(e) => setSwapFrom(e.target.value)}>
                    {coins.map(c => (
                      <option key={c.symbol} value={c.symbol}>{c.symbol}</option>
                    ))}
                  </select>
                  <input type="number" placeholder="0.00"
                    value={swapAmount}
                    onChange={(e) => { setSwapAmount(e.target.value); setSwapMsg(''); }}
                    className="swap-amount-input" />
                </div>
                <p className="swap-balance">
                  Balance: {coins.find(c => c.symbol === swapFrom).amount} {swapFrom}
                </p>
              </div>
              <div className="swap-arrow" onClick={() => {
                const temp = swapFrom;
                setSwapFrom(swapTo);
                setSwapTo(temp);
              }}>
                swap
              </div>
              <div className="swap-box">
                <label>To</label>
                <div className="swap-input-row">
                  <select className="transfer-select swap-select"
                    value={swapTo}
                    onChange={(e) => setSwapTo(e.target.value)}>
                    {coins.map(c => (
                      <option key={c.symbol} value={c.symbol}>{c.symbol}</option>
                    ))}
                  </select>
                  <div className="swap-estimate">
                    {swapAmount && swapFrom !== swapTo ? (
                      <span style={{color: '#00e5ff', fontWeight: '700', fontSize: '18px'}}>
                        {((swapAmount * coins.find(c => c.symbol === swapFrom).price) /
                          coins.find(c => c.symbol === swapTo).price).toFixed(6)}
                      </span>
                    ) : (
                      <span style={{color: '#444'}}>0.00</span>
                    )}
                  </div>
                </div>
                <p className="swap-balance">
                  Balance: {coins.find(c => c.symbol === swapTo).amount} {swapTo}
                </p>
              </div>
            </div>
            {swapFrom !== swapTo && (
              <div className="swap-rate">
                <span>Rate</span>
                <span>1 {swapFrom} = {(
                  coins.find(c => c.symbol === swapFrom).price /
                  coins.find(c => c.symbol === swapTo).price
                ).toFixed(6)} {swapTo}</span>
              </div>
            )}
            <button className="action-btn blue" style={{width: '100%', marginTop: '20px'}}
              onClick={handleSwap}>
              Swap {swapFrom} to {swapTo}
            </button>
          </div>
          <div className="section-card">
            <h2>Swap Info</h2>
            <div className="info-row">
              <span className="info-label">Network Fee</span>
              <span className="info-value">~$2.50</span>
            </div>
            <div className="info-row">
              <span className="info-label">Slippage</span>
              <span className="info-value">0.5%</span>
            </div>
            <div className="info-row">
              <span className="info-label">Route</span>
              <span className="info-value">{swapFrom} to {swapTo}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Est. Time</span>
              <span className="info-value">~30 seconds</span>
            </div>
            <div style={{
              background: '#00e5ff08',
              border: '1px solid #00e5ff22',
              borderRadius: '12px',
              padding: '16px',
              marginTop: '20px'
            }}>
              <p style={{color: '#00e5ff', fontSize: '13px', fontWeight: '600', marginBottom: '6px'}}>
                Pro Tip
              </p>
              <p style={{color: '#555', fontSize: '12px', lineHeight: 1.6}}>
                Swaps are instant and settled on-chain. Make sure you have enough balance to cover network fees.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Crypto;