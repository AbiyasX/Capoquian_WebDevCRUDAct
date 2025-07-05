import React, { useState } from 'react';

export default function UserForm({ usersRef, setRefresh, user = {}, editing = false, setEditing }) {
  const [firstName, setFirstName] = useState(user.first_name || '');
  const [lastName, setLastName] = useState(user.last_name || '');
  const [email, setEmail] = useState(user.email || '');
  const [avatar, setAvatar] = useState(user.avatar || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      usersRef.current = usersRef.current.map(u => u.id === user.id ? { ...user, first_name: firstName, last_name: lastName, email, avatar } : u);
      setEditing(false);
    } else {
      const id = Math.max(0, ...usersRef.current.map(u => u.id)) + 1;
      usersRef.current.push({ id, first_name: firstName, last_name: lastName, email, avatar });
    }
    setRefresh(r => !r);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First Name" required />
      <input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last Name" required />
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
      <input value={avatar} onChange={e => setAvatar(e.target.value)} placeholder="Avatar URL (optional)" />
      <button type="submit">{editing ? 'Update' : 'Add'} User</button>
    </form>
  );
}