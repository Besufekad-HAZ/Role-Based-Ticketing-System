import React, { useEffect, useState } from "react";
import axios from "../services/api";

const AdminDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("Open");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/tickets", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTickets(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTickets();
  }, []);

  // Update ticket status
  const updateStatus = async (ticketId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `/tickets/${ticketId}`,
        { status: selectedStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Refresh the list
      const response = await axios.get("/tickets", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTickets(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket._id}>
            <p><strong>Title:</strong> {ticket.title}</p>
            <p><strong>Description:</strong> {ticket.description}</p>
            <p><strong>Status:</strong> {ticket.status}</p>
            <p><strong>User:</strong> {ticket.userId?.username}</p>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
            <button onClick={() => updateStatus(ticket._id)}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
