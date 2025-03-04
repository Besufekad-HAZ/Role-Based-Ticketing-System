// filepath: src/pages/Login.jsx
import React, { useState } from "react";
import axios from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

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

      // Redirect based on role
      const redirectPath =
        response.data.role === "admin" ? "/admin-dashboard" : "/user-dashboard";
      navigate(redirectPath);
    } catch {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="container mx-auto px-4 h-screen flex items-center justify-center">
        <div className="w-full max-w-md backdrop-blur-lg bg-white/10 rounded-2xl p-8 shadow-2xl shadow-blue-900/50 border border-white/20">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-300">Please sign in to continue</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-500/20 text-red-300 rounded-lg border border-red-500/30">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-blue-200/80 mb-2 font-medium">
                Username
              </label>
              <input
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/20
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  placeholder:text-gray-400 text-white transition-all"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-blue-200/80 mb-2 font-medium">
                Password
              </label>
              <input
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/20
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  placeholder:text-gray-400 text-white transition-all"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-500
                text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-600
                transition-all transform hover:scale-[1.02] shadow-lg shadow-blue-500/20
                flex items-center justify-center space-x-2"
            >
              <span>Sign In</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
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
