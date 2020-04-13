import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const onChangeFactory = setter => {
  return e => {
    setter(e.target.value);
  };
};

export default function TransferModal({ formRef, show, onHide, submitForm }) {
  const [amount, setAmount] = useState('');
  const [to, setTo] = useState('');
  const [description, setDescription] = useState('');

  const floatAmount = parseFloat(amount);
  const submittable =
    floatAmount != NaN && floatAmount > 0 && to.length > 0 && description.length > 0;

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Make a Transfer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form ref={formRef}>
          <Form.Group>
            <Form.Label>Amount:</Form.Label>
            <Form.Control
              type="number"
              name="amount"
              value={amount}
              onChange={onChangeFactory(setAmount)}
              placeholder="0.00"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>To:</Form.Label>
            <Form.Control
              type="text"
              name="to"
              value={to}
              onChange={onChangeFactory(setTo)}
              placeholder="Name"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description:</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={description}
              onChange={onChangeFactory(setDescription)}
              placeholder="What is this transfer for?"
            />
          </Form.Group>
          <Button type="submit" onClick={submitForm} disabled={!submittable}>
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
