import React from "react";
import { withRouter } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
import axios from "axios";

class Login extends React.Component {
  state = {
    username: "",
    password: "",
    error: "",
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/login", this.state);
      this.props.login(response.data.token, response.data.role);
      // Redirect logic using this.props.history
    } catch {
      this.setState({ error: "Invalid credentials" });
    }
  };

  render() {
    return (
      <div className="home-container">
        <h2>Welcome to Ticketing System</h2>
        <div className="auth-options">
          <Link to="/login" className="auth-link">
            Login
          </Link>
          <span> or </span>
          <Link to="/signup" className="auth-link">
            Sign Up
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
