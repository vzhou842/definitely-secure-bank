import React from 'react';
import { useRef, useState } from 'react';

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
    }).then(response => response.json()).then(updatedUser => {
      setUser(updatedUser);
      setShowTransferModal(false);
    }).catch(console.error);
  };

  return (
    <>
      <div>
        <p>Username: <b>{user.username}</b></p>
        <p>Account Balance: $<b>{user.money}</b></p>
        <button onClick={setShowTransferModal.bind(this, true)}>Make Transfer</button>
      </div>
      {showTransferModal && (
        <div className="modal" onClick={setShowTransferModal.bind(this, false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Make a Transfer</h3>
            <form ref={formRef}>
              <label htmlFor="amount">Amount:</label>
              <input type="number" name="amount" id="amount" />
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
