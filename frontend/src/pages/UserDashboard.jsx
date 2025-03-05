import React, { useEffect, useState } from "react";
import axios from "../services/api";
import Navbar from "../components/Navbar";
import useAuth from "../hooks/useAuth";

const UserDashboard = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/tickets", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTickets(response.data);
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setError("Failed to fetch tickets");
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
      const response = await axios.get("/tickets", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTickets(response.data);
      setError("");
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError("Failed to create ticket");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <Navbar />
      <div className="max-w-7xl mx-auto p-8">
        {/* Welcome Section */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Welcome, {user?.username}
          </h1>
          <p className="text-gray-400 mt-2">Role: {user?.role}</p>
        </div>

        <div className="space-y-8">
          {/* Create Ticket Card */}
          <div className="backdrop-blur-xl bg-white/5 rounded-3xl shadow-2xl shadow-purple-900/30 border border-white/20 p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                New Support Ticket
              </h1>
              <p className="text-gray-400 mt-2">
                Describe your issue in detail for faster resolution
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-500/20 text-red-300 rounded-lg border border-red-500/30">
                {error}
              </div>
            )}

            <form onSubmit={createTicket} className="space-y-6">
              <div>
                <label className="block text-blue-200/80 mb-3 font-medium">
                  Title
                </label>
                <input
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/20
                    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                    placeholder:text-gray-400 text-white transition-all"
                  placeholder="Enter ticket title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-blue-200/80 mb-3 font-medium">
                  Description
                </label>
                <textarea
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/20
                    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                    placeholder:text-gray-400 text-white transition-all h-40"
                  placeholder="Describe your issue..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-blue-500
                  text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-600
                  transition-all transform hover:scale-[1.02] shadow-lg shadow-purple-500/20
                  flex items-center justify-center space-x-2"
              >
                <span>Submit Ticket</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </button>
            </form>
          </div>

          {/* Tickets List */}
          <div className="backdrop-blur-xl bg-white/5 rounded-3xl shadow-2xl shadow-purple-900/30 border border-white/20 p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Your Tickets
              </h2>
              <p className="text-gray-400 mt-2">
                {tickets.length} active ticket(s)
              </p>
            </div>

            <div className="space-y-4">
              {tickets.map((ticket) => (
                <div
                  key={ticket._id}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all border border-white/20 group"
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold text-gray-200 group-hover:text-white transition-colors">
                        {ticket.title}
                      </h3>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                        {ticket.description}
                      </p>
                      <div className="text-sm text-purple-300">
                        Created:{" "}
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                        ticket.status === "Open"
                          ? "bg-green-500/20 text-green-300"
                          : ticket.status === "In Progress"
                          ? "bg-yellow-500/20 text-yellow-300"
                          : "bg-red-500/20 text-red-300"
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
    </div>
  );
};

export default UserDashboard;
