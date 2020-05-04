import React from 'react';
import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import TimeAgo from 'javascript-time-ago';
import TransferModal from './TransferModal';

import en from 'javascript-time-ago/locale/en';

import './Home.css';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

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
                    <td>Date</td>
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
