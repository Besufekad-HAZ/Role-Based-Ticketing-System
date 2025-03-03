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
    <div className="home-container">
      <h2>Welcome to Ticketing System</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <div className="auth-options">
        <span>Don't have an account? </span>
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default Login;
