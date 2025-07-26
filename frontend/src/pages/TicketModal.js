import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function TicketModal({ ticket, onHide }) {
  return (
    <Modal show onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Ticket {ticket.ticket_number}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: '60vh', overflowY: 'auto' }}>
        <p><strong>Created:</strong> {new Date(ticket.created_date).toLocaleString()}</p>
        <p><strong>Updated:</strong> {new Date(ticket.updated_date).toLocaleString()}</p>
        <p><strong>Status:</strong> {ticket.status}</p>
        <p><strong>Assignee:</strong> {ticket.assignee}</p>
        <p><strong>Application:</strong> {ticket.application}</p>
        <p><strong>Assignment Group:</strong> {ticket.assignment_group}</p>
        <p><strong>Description:</strong></p>
        <p>{ticket.description || '—'}</p>
        {/* Render other fields similarly */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}