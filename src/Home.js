import React from 'react';

export default function Home({ user }) {
  return (
    <div>
      {user && (
        <>
          <p>Username: <b>{user.username}</b></p>
          <p>Account Balance: $<b>{user.money}</b></p>
        </>
      )}
    </div>
  );
}
