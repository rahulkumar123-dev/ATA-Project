// src/pages/TicketList.js
import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance'; // ✅ uses axios with interceptors
import TicketModal from './TicketModal';
import { useNavigate } from 'react-router-dom';

function TicketList() {
  const [ticketsData, setTicketsData] = useState({ results: [], total: 0 }); // ⬅️ expect object
  const [selectedTicket, setSelectedTicket] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchTickets = async () => {
      try {
        const response = await axiosInstance.get('api/tickets/');
        setTicketsData(response.data); // ⬅️ response.data = { results: [...], total: n }
      } catch (error) {
        console.error('Error fetching tickets:', error);
        if (error.response?.status === 401) {
          navigate('/login');
        }
      }
    };

    fetchTickets();
  }, [navigate]);

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
  };

  const closeModal = () => {
    setSelectedTicket(null);
  };

  return (
    <div className="container mt-4">
      <h2>All Tickets ({ticketsData.total})</h2>

      {ticketsData.results.length === 0 ? (
        <p>No tickets found.</p>
      ) : (
        <ul className="list-group">
          {ticketsData.results.map((ticket) => (
            <li
              key={ticket.id}
              className="list-group-item list-group-item-action"
              onClick={() => handleTicketClick(ticket)}
              style={{ cursor: 'pointer' }}
            >
              <strong>{ticket.title}</strong> — Status: {ticket.status}
            </li>
          ))}
        </ul>
      )}

      {selectedTicket && (
        <TicketModal ticket={selectedTicket} onClose={closeModal} />
      )}
    </div>
  );
}

export default TicketList;