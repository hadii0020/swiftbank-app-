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
    { symbol: 'SOL', name: 'Solana', price: 98.43, change: 5.1, amount: 5.2, value: 511.84, icon: '◎', color: '#9945ff' },
    { symbol: 'USDT', name: 'Tether', price: 1.00, change: 0.0, amount: 500, value: 500.00, icon: '₮', color: '#26a17b' },
  ];

  const totalPortfolio = coins.reduce((sum, c) => sum + c.value, 0);

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
    setSwapMsg(`Swapped ${swapAmount} ${swapFrom} to ${toAmount} ${swapTo}!`);
    setSwapSuccess(true);
    setSwapAmount('');
  };

  const selectedCoinData = coins.find(c => c.symbol === selectedCoin);
  const fromCoinData = coins.find(c => c.symbol === swapFrom);
  const toCoinData = coins.find(c => c.symbol === swapTo);

  return (
    <div className="page-content">

      {/* PAGE HEADER */}
      <div className="crypto-page-header">
        <div>
          <h1>Crypto</h1>
          <p className="page-subtitle">Manage your crypto portfolio</p>
        </div>
        <div className="portfolio-badge">
          <p>Portfolio Value</p>
          <h2>${totalPortfolio.toLocaleString('en-US', {minimumFractionDigits: 2})}</h2>
          <span className="crypto-change positive">+5.2% today</span>
        </div>
      </div>

      {/* TABS */}
      <div className="tabs">
        <button className={`tab-btn ${activeTab === 'portfolio' ? 'active' : ''}`}
          onClick={() => setActiveTab('portfolio')}>📊 Portfolio</button>
        <button className={`tab-btn ${activeTab === 'market' ? 'active' : ''}`}
          onClick={() => setActiveTab('market')}>📈 Market</button>
        <button className={`tab-btn ${activeTab === 'trade' ? 'active' : ''}`}
          onClick={() => setActiveTab('trade')}>💰 Buy/Sell</button>
        <button className={`tab-btn ${activeTab === 'swap' ? 'active' : ''}`}
          onClick={() => setActiveTab('swap')}>🔄 Swap</button>
      </div>

      {/* ==================
          PORTFOLIO TAB
      ================== */}
      {activeTab === 'portfolio' && (
        <div>
          {/* SUMMARY CARDS */}
          <div className="crypto-summary-grid">
            <div className="crypto-summary-card">
              <p>Total Value</p>
              <h2>${totalPortfolio.toLocaleString('en-US', {minimumFractionDigits: 2})}</h2>
              <span className="crypto-change positive">+$1,240 today</span>
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

          {/* HOLDINGS */}
          <div className="section-card">
            <h2>My Holdings</h2>
            <div className="crypto-list">
              {coins.map(coin => (
                <div className="crypto-item" key={coin.symbol}
                  onClick={() => { setSelectedCoin(coin.symbol); setActiveTab('trade'); }}>
                  <div className="crypto-icon" style={{
                    background: coin.color,
                    color: coin.symbol === 'BNB' ? '#1a1a2e' : 'white'
                  }}>
                    {coin.icon}
                  </div>
                  <div className="crypto-details">
                    <h4>{coin.name}</h4>
                    <p>{coin.amount} {coin.symbol}</p>
                  </div>
                  <div className="crypto-holding-bar">
                    <div className="holding-bar-fill" style={{
                      width: `${(coin.value / totalPortfolio * 100).toFixed(0)}%`,
                      background: coin.color
                    }}></div>
                  </div>
                  <div className="crypto-amount">
                    <h4>${coin.value.toLocaleString()}</h4>
                    <p className="crypto-value">
                      {(coin.value / totalPortfolio * 100).toFixed(1)}%
                    </p>
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

      {/* ==================
          MARKET TAB
      ================== */}
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
            <div className="market-header-row">
              <span>Coin</span>
              <span>Price</span>
              <span>24h Change</span>
              <span>Action</span>
            </div>
            <div className="crypto-list">
              {coins.map(coin => (
                <div className="crypto-item" key={coin.symbol}>
                  <div className="crypto-icon" style={{
                    background: coin.color,
                    color: coin.symbol === 'BNB' ? '#1a1a2e' : 'white'
                  }}>
                    {coin.icon}
                  </div>
                  <div className="crypto-details">
                    <h4>{coin.name}</h4>
                    <p>{coin.symbol}</p>
                  </div>
                  <div className="crypto-amount">
                    <h4>${coin.price.toLocaleString()}</h4>
                  </div>
                  <div className={`crypto-change ${coin.change >= 0 ? 'positive' : 'negative'}`}>
                    {coin.change >= 0 ? '+' : ''}{coin.change}%
                  </div>
                  <button className="mini-trade-btn"
                    onClick={() => { setSelectedCoin(coin.symbol); setActiveTab('trade'); }}>
                    Trade
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================
          BUY/SELL TAB
      ================== */}
      {activeTab === 'trade' && (
        <div className="trade-grid">
          <div className="section-card">
            <h2>Buy / Sell</h2>

            {tradeMsg && (
              <div className={`trade-msg ${tradeSuccess ? 'success' : 'error'}`}>
                {tradeMsg}
              </div>
            )}

            {/* COIN SELECTOR */}
            <div className="form-group">
              <label>Select Coin</label>
              <div className="coin-selector">
                {coins.map(coin => (
                  <div key={coin.symbol}
                    className={`coin-option ${selectedCoin === coin.symbol ? 'selected' : ''}`}
                    onClick={() => { setSelectedCoin(coin.symbol); setTradeMsg(''); }}>
                    <div style={{
                      background: coin.color,
                      color: coin.symbol === 'BNB' ? '#1a1a2e' : 'white',
                      width: '24px', height: '24px', borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '11px', fontWeight: '900', flexShrink: 0
                    }}>
                      {coin.icon}
                    </div>
                    <span>{coin.symbol}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* PRICE BAR */}
            <div className="price-info-bar">
              <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                <div style={{
                  background: selectedCoinData.color,
                  color: selectedCoin === 'BNB' ? '#1a1a2e' : 'white',
                  width: '32px', height: '32px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '14px', fontWeight: '900'
                }}>
                  {selectedCoinData.icon}
                </div>
                <span style={{color: 'white', fontWeight: '700'}}>{selectedCoinData.name}</span>
              </div>
              <span style={{color: '#00e5ff', fontWeight: '700', fontSize: '18px'}}>
                ${selectedCoinData.price.toLocaleString()}
              </span>
              <span className={`crypto-change ${selectedCoinData.change >= 0 ? 'positive' : 'negative'}`}>
                {selectedCoinData.change >= 0 ? '+' : ''}{selectedCoinData.change}%
              </span>
            </div>

            {/* BUY */}
            <div className="buy-sell-section">
              <h4 style={{color: '#00e5ff', marginBottom: '12px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px'}}>
                Buy {selectedCoin}
              </h4>
              <div className="form-group">
                <label>Amount (USD)</label>
                <div className="amount-input-wrapper">
                  <span className="currency-label">$</span>
                  <input type="number" placeholder="0.00"
                    value={buyAmount}
                    onChange={(e) => { setBuyAmount(e.target.value); setTradeMsg(''); }} />
                </div>
                {buyAmount > 0 && (
                  <p className="conversion-hint">
                    You will receive ≈ {(buyAmount / selectedCoinData.price).toFixed(6)} {selectedCoin}
                  </p>
                )}
              </div>
              <button className="buy-btn" onClick={() => handleTrade('buy')}>
                Buy {selectedCoin}
              </button>
            </div>

            <div className="trade-divider"></div>

            {/* SELL */}
            <div className="buy-sell-section">
              <h4 style={{color: '#ff4444', marginBottom: '12px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px'}}>
                Sell {selectedCoin}
              </h4>
              <div className="form-group">
                <label>Amount (USD)</label>
                <div className="amount-input-wrapper">
                  <span className="currency-label" style={{color: '#ff4444', borderRight: '1px solid #ff444422'}}>$</span>
                  <input type="number" placeholder="0.00"
                    value={sellAmount}
                    onChange={(e) => { setSellAmount(e.target.value); setTradeMsg(''); }} />
                </div>
                {sellAmount > 0 && (
                  <p className="conversion-hint">
                    You will sell ≈ {(sellAmount / selectedCoinData.price).toFixed(6)} {selectedCoin}
                  </p>
                )}
              </div>
              <button className="sell-btn" onClick={() => handleTrade('sell')}>
                Sell {selectedCoin}
              </button>
            </div>
          </div>

          {/* MARKET INFO */}
          <div>
            <div className="section-card" style={{marginBottom: '16px'}}>
              <h2>Coin Info</h2>
              <div style={{textAlign: 'center', padding: '20px 0'}}>
                <div style={{
                  background: selectedCoinData.color,
                  color: selectedCoin === 'BNB' ? '#1a1a2e' : 'white',
                  width: '72px', height: '72px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 12px', fontSize: '32px', fontWeight: '900'
                }}>
                  {selectedCoinData.icon}
                </div>
                <h3 style={{color: 'white', fontSize: '20px'}}>{selectedCoinData.name}</h3>
                <p style={{color: '#444', fontSize: '13px', marginTop: '4px'}}>{selectedCoin}</p>
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
                <span className="info-value" style={{color: '#00e5ff'}}>
                  ${selectedCoinData.value.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="section-card">
              <h2>Quick Actions</h2>
              <button className="action-btn blue" style={{width: '100%', marginBottom: '10px'}}
                onClick={() => setActiveTab('swap')}>
                🔄 Swap {selectedCoin}
              </button>
              <button className="action-btn outline" style={{width: '100%'}}>
                📤 Send {selectedCoin}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================
          SWAP TAB
      ================== */}
      {activeTab === 'swap' && (
        <div className="swap-page-layout">

          {/* SWAP CARD */}
          <div className="section-card swap-main-card">
            <h2>Swap Tokens</h2>

            {swapMsg && (
              <div className={`trade-msg ${swapSuccess ? 'success' : 'error'}`}>
                {swapMsg}
              </div>
            )}

            {/* FROM BOX */}
            <div className="swap-box">
              <div className="swap-box-header">
                <label>From</label>
                <span className="swap-balance-label">
                  Balance: {fromCoinData.amount} {swapFrom}
                </span>
              </div>
              <div className="swap-input-row">
                <select className="swap-coin-select"
                  value={swapFrom}
                  onChange={(e) => { setSwapFrom(e.target.value); setSwapMsg(''); }}>
                  {coins.map(c => (
                    <option key={c.symbol} value={c.symbol}>{c.icon} {c.symbol} - {c.name}</option>
                  ))}
                </select>
                <input type="number" placeholder="0.00"
                  value={swapAmount}
                  onChange={(e) => { setSwapAmount(e.target.value); setSwapMsg(''); }}
                  className="swap-amount-input" />
              </div>
              {swapAmount > 0 && (
                <p className="swap-usd-value">
                  ≈ ${(swapAmount * fromCoinData.price).toFixed(2)} USD
                </p>
              )}
            </div>

            {/* SWAP ARROW BUTTON */}
            <div className="swap-arrow-container">
              <button className="swap-arrow-btn" onClick={() => {
                const temp = swapFrom;
                setSwapFrom(swapTo);
                setSwapTo(temp);
                setSwapMsg('');
              }}>
                ⇅
              </button>
            </div>

            {/* TO BOX */}
            <div className="swap-box">
              <div className="swap-box-header">
                <label>To</label>
                <span className="swap-balance-label">
                  Balance: {toCoinData.amount} {swapTo}
                </span>
              </div>
              <div className="swap-input-row">
                <select className="swap-coin-select"
                  value={swapTo}
                  onChange={(e) => { setSwapTo(e.target.value); setSwapMsg(''); }}>
                  {coins.map(c => (
                    <option key={c.symbol} value={c.symbol}>{c.icon} {c.symbol} - {c.name}</option>
                  ))}
                </select>
                <div className="swap-estimate-box">
                  {swapAmount > 0 && swapFrom !== swapTo ? (
                    <>
                      <span className="swap-estimate-amount">
                        {((swapAmount * fromCoinData.price) / toCoinData.price).toFixed(6)}
                      </span>
                      <span className="swap-estimate-usd">
                        ≈ ${(swapAmount * fromCoinData.price).toFixed(2)} USD
                      </span>
                    </>
                  ) : (
                    <span style={{color: '#444', fontSize: '20px'}}>0.00</span>
                  )}
                </div>
              </div>
            </div>

            {/* RATE INFO */}
            {swapFrom !== swapTo && (
              <div className="swap-rate-bar">
                <span>Rate</span>
                <span>
                  1 {swapFrom} = {(fromCoinData.price / toCoinData.price).toFixed(6)} {swapTo}
                </span>
              </div>
            )}

            {/* SWAP BUTTON */}
            <button className="swap-confirm-btn" onClick={handleSwap}>
              🔄 Swap {swapFrom} → {swapTo}
            </button>
          </div>

          {/* SWAP INFO PANEL */}
          <div>
            <div className="section-card" style={{marginBottom: '16px'}}>
              <h2>Transaction Details</h2>
              <div className="info-row">
                <span className="info-label">Network Fee</span>
                <span className="info-value">~$2.50</span>
              </div>
              <div className="info-row">
                <span className="info-label">Slippage Tolerance</span>
                <span className="info-value">0.5%</span>
              </div>
              <div className="info-row">
                <span className="info-label">Route</span>
                <span className="info-value">{swapFrom} → {swapTo}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Est. Time</span>
                <span className="info-value">~30 seconds</span>
              </div>
              {swapAmount > 0 && swapFrom !== swapTo && (
                <div className="info-row">
                  <span className="info-label">You Receive</span>
                  <span className="info-value" style={{color: '#00e5ff'}}>
                    {((swapAmount * fromCoinData.price) / toCoinData.price).toFixed(6)} {swapTo}
                  </span>
                </div>
              )}
            </div>

            <div className="section-card">
              <h2>Slippage Settings</h2>
              <div className="slippage-options">
                {['0.1%', '0.5%', '1.0%', 'Custom'].map(s => (
                  <button key={s} className={`slippage-btn ${s === '0.5%' ? 'active' : ''}`}>
                    {s}
                  </button>
                ))}
              </div>
              <div className="swap-tip">
                <p style={{color: '#00e5ff', fontSize: '12px', fontWeight: '600', marginBottom: '6px'}}>
                  Pro Tip
                </p>
                <p style={{color: '#444', fontSize: '12px', lineHeight: 1.6}}>
                  Higher slippage tolerance increases the chance your swap succeeds but may result in a less favorable rate.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Crypto;