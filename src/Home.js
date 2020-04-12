import React from 'react';
import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './Home.css';

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
              <table>
                <thead>
                  <tr>
                    <td>Date</td>
                    <td>Amount</td>
                    <td>To</td>
                    <td>Description</td>
                  </tr>
                </thead>
                <tbody>
                  {user.transfers.map((transfer, i) => (
                    <tr key={i}>
                      <td>{new Date(transfer.date).toLocaleDateString()}</td>
                      <td>{transfer.amount}</td>
                      <td>{transfer.to}</td>
                      <td>{transfer.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <Card.Text>No transfers made yet.</Card.Text>
            )}
            <Button onClick={setShowTransferModal.bind(this, true)}>Make Transfer</Button>
          </Card.Body>
        </Card>
      </div>
      {showTransferModal && (
        <div className="modal" onClick={setShowTransferModal.bind(this, false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Make a Transfer</h3>
            <form ref={formRef}>
              <label htmlFor="amount">Amount:</label>
              <input type="number" name="amount" id="amount" />
              <br />
              <label htmlFor="to">To:</label>
              <input type="text" name="to" id="to" />
              <br />
              <label htmlFor="description">Description:</label>
              <input type="text" name="description" id="description" />
              <br />
              <input type="submit" onClick={submitForm} />
            </form>
          </div>
        </div>
      )}
    </>
  );
}
