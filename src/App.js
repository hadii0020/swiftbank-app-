import { useState } from 'react';
import './App.css';
import Login from './Login';
import SignUp from './Signup';
import Dashboard from './Dashboard';

function App() {
  const [page, setPage] = useState('login');

  return (
    <div>
      {page === 'login' && (
        <Login
          onSwitch={() => setPage('signup')}
          onLogin={() => setPage('dashboard')}
        />
      )}
      {page === 'signup' && (
        <SignUp onSwitch={() => setPage('login')} />
      )}
      {page === 'dashboard' && (
        <Dashboard onLogout={() => setPage('login')} />
      )}
    </div>
  );
}

export default App;