import React from 'react';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import TransferModal from './TransferModal';

import './Home.css';

export default function Home({ user, setUser }) {
  const [transferModalLoading, setTransferModalLoading] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferError, setTransferError] = useState(null);
  const formRef = useRef(null);

  if (!user) {
    return null;
  }

  const submitForm = e => {
    e.preventDefault();
    setTransferModalLoading(true);

    // The fields in this form (found in TransferModal.js) are:
    //   - amount
    //   - to
    //   - description
    const data = new URLSearchParams();
    for (const pair of new FormData(formRef.current)) {
      // pair[0] is the field name, pair[1] is the field value
      data.append(pair[0], pair[1]);
    }

    fetch('/transfer', {
      method: 'post',
      body: data,
    })
      .then(response => response.json())
      .then(response => {
        if (response.success) {
          const updatedUser = response.user;
          setUser(updatedUser);
          setShowTransferModal(false);
        } else {
          setTransferError(response.error);
        }

        setTransferModalLoading(false);
      })
      .catch(e => {
        setTransferError('An unknown error occurred.');
        setTransferModalLoading(false);
      });
  };

  return (
    <>
      <div className="container">
        <Card>
          <Card.Header as="h5">Account</Card.Header>
          <Card.Body>
            <Card.Text>
              Welcome back, <b>{user.username}</b>!
            </Card.Text>
            <Card.Text>
              Your balance is: <b>${user.money}</b>
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
                    <td>Amount</td>
                    <td>To</td>
                    <td>Description</td>
                    <td>Balance</td>
                  </tr>
                </thead>
                <tbody>
                  {user.transfers
                    .slice(0)
                    .reverse()
                    .map((transfer, i) => (
                      <tr key={i}>
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
      <p>
        Have a question? <Link to="/search">Try searching for the answer</Link>.
      </p>
      <TransferModal
        error={transferError}
        show={showTransferModal}
        onHide={setShowTransferModal.bind(this, false)}
        formRef={formRef}
        submitForm={submitForm}
        loading={transferModalLoading}
      />
    </>
  );
}
