import React from 'react';
import { useEffect, useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/user').then(response => response.json()).then(user => {
      setLoading(false);
      setUser(user);
    });
  }, []);

  return (
    <div>
      <h1>Welcome to example-insecure-site!</h1>
      {loading && (
        <p>Loading data...</p>
      )}
      {user && (
        <>
          <p>Username: <b>{user.username}</b></p>
          <p>Account Balance: $<b>{user.money}</b></p>
        </>
      )}
    </div>
  );
}
