import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    navigate('/admin');
  };

  return (
    <button type="button" className="btn btn-primary m-2 float-end" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;

export const MyModelAdmin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('loggedIn');
    if (isLoggedIn !== 'true') {
      navigate('/admin');
    }
  }, [navigate]);

  return (
    <div>
      <LogoutButton />
    </div>
  );
};

export function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('loggedIn');
    if (isLoggedIn === 'true') {
      navigate('/adminsuccessful');
    }
  }, []);
  

  const handleLogin = () => {
    const defaultUsername = 'admin';
    const defaultPassword = 'password';

    if (username === defaultUsername && password === defaultPassword) {
      localStorage.setItem('loggedIn', 'true');
      navigate('/adminsuccessful');
    } else {
      alert('Login failed');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Login</h2>
      <div className="form-group" style={{ margin: 'auto', width: '250px' }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
          className="form-control"
          style={{ width: '100%' }}
        />
      </div>
      <div className="form-group" style={{ margin: 'auto', width: '250px' }}>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
          className="form-control"
          style={{ width: '100%' }}
        />
      </div>
      <br/>
      <button onClick={handleLogin} className="btn btn-primary">Login</button>
    </div>
  );  
}


