import React from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function Login({ user }) {
  const history = useHistory();

  useEffect(() => {
    if (user) {
      history.replace('/');
    }
  }, [history, user]);

  return (
    <form method="POST" action="/login">
      <label htmlFor="username">Username:</label>
      <input type="text" name="username" id="username" placeholder="Username" />
      <br />
      <label htmlFor="password">Password:</label>
      <input type="password" name="password" id="password" placeholder="Password" />
      <br />
      <input type="submit" />
    </form>
  );
}
