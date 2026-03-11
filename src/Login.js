import { useState } from 'react';

function Login({ onSwitch, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleLogin = () => {
    if (email === '' || password === '') {
      setMessage('Please fill in all fields!');
      setSuccess(false);
    } else if (password.length < 6) {
      setMessage('Password must be at least 6 characters!');
      setSuccess(false);
    } else {
      setMessage('Login successful! Welcome back 👋');
      setSuccess(true);
      setTimeout(() => onLogin(), 1000);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h1>Swift<span style={{color:'#93c5fd'}}>Bank</span></h1>
        <p>Your trusted digital banking partner. Fast, secure and reliable.</p>
      </div>
      <div className="login-right">
        <div className="login-box">
          <h2>Welcome Back 👋</h2>
          <p>Sign in to your SwiftBank account</p>

          {message && (
            <div className={success ? 'msg success' : 'msg error'}>
              {message}
            </div>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="login-btn" onClick={handleLogin}>
            Sign In
          </button>

          <p className="signup-link">
            Don't have an account?{' '}
            <a href="#" onClick={onSwitch}>Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;