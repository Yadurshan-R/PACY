'use client';

import { useState } from 'react';

export default function HomePage() {
  const [names, setNames] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('No token found, please login.');
      return;
    }

    const res = await fetch('/api/users', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await res.json();

    if (res.ok) {
      setNames(data.names);
      setMessage('');
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Home Page</h1>
      <button onClick={fetchUsers}>Fetch Users</button>
      {message && <p>{message}</p>}
      <ul>
        {names.map((name, i) => <li key={i}>{name}</li>)}
      </ul>
    </div>
  );
}
