import React, { useEffect, useState } from "react";
import axios from "../services/api";
import Navbar from "../components/Navbar";

const AdminDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [statusUpdates, setStatusUpdates] = useState({});
  const [error, setError] = useState("");
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
        setError("Failed to fetch tickets.");
      } finally {
        setLoading(false);
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

  if (loading) return <div>Loading tickets...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Admin Dashboard
        </h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tickets.map((ticket) => (
                  <tr key={ticket._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {ticket.title}
                    </td>
                    <td className="px-6 py-4 whitespace-normal max-w-xs">
                      {ticket.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {ticket.userId?.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={statusUpdates[ticket._id] || ticket.status}
                        onChange={(e) =>
                          setStatusUpdates((prev) => ({
                            ...prev,
                            [ticket._id]: e.target.value,
                          }))
                        }
                        className="border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => updateStatus(ticket._id)}
                        className="bg-primary hover:bg-secondary text-white px-3 py-1 rounded-md transition-colors"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
