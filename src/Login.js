import React from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function Login({ user }) {
  const history = useHistory();

  useEffect(() => {
    if (user) {
      history.replace('/');
    }
  }, [history, user]);

  return (
    <Form method="POST" action="/login">
      <Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" name="username" placeholder="Username" />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="password">Password:</Form.Label>
        <Form.Control type="password" name="password" placeholder="Password" />
      </Form.Group>
      <Button type="submit">Submit</Button>
    </Form>
  );
}
