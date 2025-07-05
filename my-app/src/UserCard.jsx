import React, { useState } from 'react';
import UserForm from './UserForm';

export default function UserCard({ user, onDelete }) {
  const [editing, setEditing] = useState(false);

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '5px' }}>
      <img src={user.avatar} alt={user.first_name} width={50} />
      <p>{user.first_name} {user.last_name}</p>
      <p>{user.email}</p>
      <button onClick={() => setEditing(!editing)}>{editing ? 'Cancel' : 'Edit'}</button>
      <button onClick={() => onDelete(user.id)}>Delete</button>
      {editing && <UserForm user={user} editing setEditing={setEditing} />}
    </div>
  );
}
