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
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Create New Ticket
          </h1>
          <form onSubmit={createTicket} className="space-y-4">
            <input
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Ticket Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary h-32"
              placeholder="Ticket Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded-md transition-colors"
            >
              Create Ticket
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Your Tickets</h2>
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <div
                key={ticket._id}
                className="border rounded-md p-4 hover:bg-gray-50"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg">{ticket.title}</h3>
                    <p className="text-gray-600">{ticket.description}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      ticket.status === "Open"
                        ? "bg-green-100 text-green-800"
                        : ticket.status === "In Progress"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {ticket.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
