import React, { useEffect, useState } from "react";
import axios from "../services/api";
import Navbar from "../components/Navbar";

const AdminDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [statusUpdates, setStatusUpdates] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/tickets", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTickets(response.data);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch tickets.");
      }
    };
    fetchTickets();
  }, []);

  // Update ticket status
  const updateStatus = async (ticketId) => {
    try {
      await axios.put(`/tickets/${ticketId}`, {
        status: statusUpdates[ticketId] || "Open",
      });
      // Reset error state on success
      setError("");
      // Optimistically update local state
      setTickets((prev) =>
        prev.map((ticket) =>
          ticket._id === ticketId
            ? { ...ticket, status: statusUpdates[ticketId] }
            : ticket
        )
      );
    } catch (error) {
      console.error(error);
      setError("Update failed. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Admin Dashboard</h1>
      {error && <div className="error">{error}</div>}
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket._id}>
            <p>
              <strong>Title:</strong> {ticket.title}
            </p>
            <p>
              <strong>Description:</strong> {ticket.description}
            </p>
            <p>
              <strong>Status:</strong> {ticket.status}
            </p>
            <p>
              <strong>User:</strong> {ticket.userId?.username}
            </p>
            <select
              value={statusUpdates[ticket._id] || ticket.status}
              onChange={(e) =>
                setStatusUpdates((prev) => ({
                  ...prev,
                  [ticket._id]: e.target.value,
                }))
              }
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
