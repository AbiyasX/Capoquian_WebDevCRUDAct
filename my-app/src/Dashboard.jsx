import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import UserList from './UserList';
import UserForm from './UserForm';

export default function Dashboard() {
  const { setIsLoggedIn } = useAuth();
  const usersRef = useRef([]);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then(res => res.json())
      .then(data => {
        usersRef.current = data.data;
        setRefresh(r => !r);
      });
  }, []);

  const logout = () => {
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={logout}>Logout</button>
      <UserForm usersRef={usersRef} setRefresh={setRefresh} />
      <UserList usersRef={usersRef} setRefresh={setRefresh} />
    </div>
  );
}
