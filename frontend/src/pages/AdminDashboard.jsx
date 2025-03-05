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

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <Navbar />
      <div className="max-w-7xl mx-auto p-8">
        <div className="backdrop-blur-xl bg-white/5 rounded-3xl shadow-2xl shadow-purple-900/30 border border-white/20 p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 text-red-300 rounded-lg border border-red-500/30">
              {error}
            </div>
          )}

          <div className="rounded-xl overflow-hidden backdrop-blur-sm bg-white/5">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    {["Title", "Description", "User", "Status", "Actions"].map(
                      (header) => (
                        <th
                          key={header}
                          className="px-6 py-4 text-left text-sm font-semibold text-purple-300 uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {tickets.map((ticket) => (
                    <tr
                      key={ticket._id}
                      className="hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-gray-200">
                        {ticket.title}
                      </td>
                      <td className="px-6 py-4 whitespace-normal max-w-xs text-gray-400">
                        {ticket.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-purple-300">
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
                          className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          {["Open", "In Progress", "Closed"].map((status) => (
                            <option
                              key={status}
                              value={status}
                              className="bg-gray-900 text-gray-200"
                            >
                              {status}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => updateStatus(ticket._id)}
                          className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white px-4 py-2 rounded-lg transition-all transform hover:scale-105 shadow-purple-500/20"
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
    </div>
  );
};

export default AdminDashboard;
