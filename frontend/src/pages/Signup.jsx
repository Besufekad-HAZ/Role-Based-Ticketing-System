import React, { useState } from "react";
import axios from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Navbar from "../components/Navbar";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/signup", { username, email, password, role });
      // Auto-login after signup
      const res = await axios.post("/auth/login", { username, password });
      login(res.data.token, res.data.role, res.data.username); // Add username
      navigate(
        res.data.role === "admin" ? "/admin-dashboard" : "/user-dashboard"
      );
    } catch (error) {
      console.error("Registration error:", error);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md backdrop-blur-xl bg-white/5 rounded-3xl shadow-2xl shadow-purple-900/30 border border-white/20 p-10 space-y-10">
          {/* Header Section */}
          <div className="text-center space-y-6">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Create Account
            </h1>
            <p className="text-gray-300 text-xl font-light">
              Join our platform to manage your support tickets
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-500/20 text-red-300 rounded-lg border border-red-500/30">
              {error}
            </div>
          )}

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              {/* Username Input */}
              <div>
                <label className="block text-blue-200/80 mb-3 font-medium">
                  Username
                </label>
                <input
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/20
                    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                    placeholder:text-gray-400 text-white transition-all"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-blue-200/80 mb-3 font-medium">
                  Email
                </label>
                <input
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/20
                    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                    placeholder:text-gray-400 text-white transition-all"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-blue-200/80 mb-3 font-medium">
                  Password
                </label>
                <input
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/20
                    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                    placeholder:text-gray-400 text-white transition-all"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-blue-200/80 mb-3 font-medium">
                  Account Type
                </label>
                <select
                  className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/20
                    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                    text-white transition-all appearance-none"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="user" className="bg-gray-800">
                    Standard User
                  </option>
                  <option value="admin" className="bg-gray-800">
                    Administrator
                  </option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-blue-500
                text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-600
                transition-all transform hover:scale-[1.02] shadow-lg shadow-purple-500/20
                flex items-center justify-center space-x-2"
            >
              <span>Create Account</span>
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </button>
          </form>

          {/* Login Link */}
          <div className="pt-8 text-center border-t border-white/20">
            <p className="text-gray-400 text-lg">
              Already registered?{" "}
              <Link
                to="/login"
                className="text-blue-400 hover:text-blue-300 font-medium underline transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
