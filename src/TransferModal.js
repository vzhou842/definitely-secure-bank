import React from 'react';
import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function TransferModal({ formRef, show, onHide, submitForm }) {
  return (
    <Modal show={show} onHide={onHide}>
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
  );
}
