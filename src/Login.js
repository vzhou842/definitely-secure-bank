import React from 'react';

export default function Login() {
  return (
    <form action="/login">
      <label htmlFor="username">Username:</label>
      <input type="text" id="username" />
      <br />
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" />
      <br />
      <input type="submit" />
    </form>
  );
}
