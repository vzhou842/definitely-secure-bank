import React from 'react';
import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import TimeAgo from 'javascript-time-ago';

import en from 'javascript-time-ago/locale/en';

import './Home.css';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

export default function Home({ user, setUser }) {
  const [showTransferModal, setShowTransferModal] = useState(false);
  const formRef = useRef(null);

  if (!user) {
    return null;
  }

  const submitForm = e => {
    e.preventDefault();
    const data = new URLSearchParams();
    for (const pair of new FormData(formRef.current)) {
      data.append(pair[0], pair[1]);
    }
    data.append('date', Date.now());
    fetch('/transfer', {
      method: 'post',
      body: data,
    })
      .then(response => response.json())
      .then(updatedUser => {
        setUser(updatedUser);
        setShowTransferModal(false);
      })
      .catch(console.error);
  };

  return (
    <>
      <div className="container">
        <Card>
          <Card.Header as="h5">Account</Card.Header>
          <Card.Body>
            <Card.Text>
              Username: <b>{user.username}</b>
            </Card.Text>
            <Card.Text>
              Account Balance: $<b>{user.money}</b>
            </Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Header as="h5">Activity</Card.Header>
          <Card.Body>
            {user.transfers.length > 0 ? (
              <Table responsive hover>
                <thead>
                  <tr>
                    <td>Date</td>
                    <td>Amount</td>
                    <td>To</td>
                    <td>Description</td>
                    <td>Balance</td>
                  </tr>
                </thead>
                <tbody>
                  {user.transfers.map((transfer, i) => (
                    <tr key={i}>
                      <td>{timeAgo.format(transfer.date)}</td>
                      <td>{-transfer.amount}</td>
                      <td>{transfer.to}</td>
                      <td>{transfer.description}</td>
                      <td>${transfer.balance}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <Card.Text>No transfers made yet.</Card.Text>
            )}
            <Button onClick={setShowTransferModal.bind(this, true)}>Make Transfer</Button>
          </Card.Body>
        </Card>
      </div>
      <Modal show={showTransferModal} onHide={setShowTransferModal.bind(this, false)}>
        <Modal.Header closeButton>
          <Modal.Title>Make a Transfer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form ref={formRef}>
            <Form.Group>
              <Form.Label>Amount:</Form.Label>
              <Form.Control type="number" name="amount" />
            </Form.Group>
            <Form.Group>
              <Form.Label>To:</Form.Label>
              <Form.Control type="text" name="to" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description:</Form.Label>
              <Form.Control type="text" name="description" />
            </Form.Group>
            <Button type="submit" onClick={submitForm}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
