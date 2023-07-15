import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// const LogoutButton = () => {
//   const navigate = useNavigate();
//   localStorage.removeItem('loggedIn'); // Clear the login state
//   navigate('/admin'); // Redirect to the "/admin" page
// };

// export { LogoutButton };


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
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}


