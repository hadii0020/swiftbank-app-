import { useState } from 'react';

function SignUp({ onSwitch }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSignUp = () => {
    if (name === '' || email === '' || password === '' || confirm === '') {
      setMessage('Please fill in all fields!');
      setSuccess(false);
    } else if (password.length < 6) {
      setMessage('Password must be at least 6 characters!');
      setSuccess(false);
    } else if (password !== confirm) {
      setMessage('Passwords do not match!');
      setSuccess(false);
    } else {
      setMessage('Account created successfully! 🎉');
      setSuccess(true);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">

        <h2>Create Account</h2>
        <p>Sign up to get started</p>

        {message && (
          <div className={success ? 'msg success' : 'msg error'}>
            {message}
          </div>
        )}

        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
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
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>

        <button className="login-btn" onClick={handleSignUp}>
          Create Account
        </button>

        <p className="signup-link">
          Already have an account?{' '}
          <a href="#" onClick={onSwitch}>Sign In</a>
        </p>

      </div>
    </div>
  );
}

export default SignUp;