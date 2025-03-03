import React, { useEffect, useState } from "react";
import axios from "../services/api";
import Navbar from "../components/Navbar";

const UserDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  const createTicket = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/tickets",
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle("");
      setDescription("");
      // Refresh ticket list
      const response = await axios.get("/tickets", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTickets(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div>Loading tickets...</div>;

  return (
    <div>
      <Navbar />
      <h1>User Dashboard</h1>

      {/* Form to create a new ticket */}
      <form onSubmit={createTicket}>
        <input
          type="text"
          placeholder="Ticket Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Ticket Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Create Ticket</button>
      </form>

      {/* List user’s tickets */}
      <h2>Your Tickets</h2>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket._id}>
            <strong>{ticket.title}</strong> - {ticket.status}
            <p>{ticket.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDashboard;
