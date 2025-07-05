import React from 'react';
import UserCard from './UserCard';

export default function UserList({ usersRef, setRefresh }) {
  const handleDelete = (id) => {
    usersRef.current = usersRef.current.filter(user => user.id !== id);
    setRefresh(r => !r);
  };

  return (
    <div>
      {usersRef.current.map(user => (
        <UserCard key={user.id} user={user} onDelete={handleDelete} />
      ))}
    </div>
  );
}