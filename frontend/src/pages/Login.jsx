import React, { useState } from "react";
import axios from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Navbar from "../components/Navbar";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/login", { username, password });
      login(response.data.token, response.data.role);

      const redirectPath =
        response.data.role === "admin" ? "/admin-dashboard" : "/user-dashboard";
      navigate(redirectPath);
    } catch {
      setError("Invalid credentials");
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
              Welcome Back
            </h1>
            <p className="text-gray-300 text-xl font-light">
              Please sign in to continue
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
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-blue-500
                text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-600
                transition-all transform hover:scale-[1.02] shadow-lg shadow-purple-500/20
                flex items-center justify-center space-x-2"
            >
              <span>Sign In</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </form>

          {/* Bottom Link Section */}
          <div className="pt-8 text-center border-t border-white/20">
            <p className="text-gray-400 text-lg">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-400 hover:text-blue-300 font-medium underline transition-colors"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
