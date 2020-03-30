import React from 'react';
import { useState } from 'react';

import './Home.css';

export default function Home({ user }) {
  const [showTransferModal, setShowTransferModal] = useState(false);

  if (!user) {
    return null;
  }

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
            <form>
              <label for="amount">Amount:</label>
              <input type="number" name="amount" id="amount" />
              <br />
              <label for="description">Description:</label>
              <input type="text" name="description" id="description" />
              <br />
              <input type="submit" />
            </form>
          </div>
        </div>
      )}
    </>
  );
}
