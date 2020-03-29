import React from 'react';

export default function Login() {
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
