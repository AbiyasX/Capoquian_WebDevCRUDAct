import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function LoginForm() {
  const auth = useAuth();
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then(res => res.json())
      .then(data => {
        console.log('Fetched users:', data.data);
        setUsers(data.data);
      })
      .catch(() => setError('Failed to fetch users'));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find(user => user.email === email);
    if (user && password === 'password123') {
      auth.setIsLoggedIn(true);
      auth.setLoggedUser(user);
      navigate('/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
}
