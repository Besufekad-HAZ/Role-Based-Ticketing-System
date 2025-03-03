import React from "react";
import axios from "axios";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

// Custom withRouter HOC for React Router v6
export function withRouter() {
  return function ComponentWithRouterProp(Component) {
    function ComponentWithRouter(props) {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      return <Component {...props} router={{ location, navigate, params }} />;
    }
    return ComponentWithRouter;
  };
}

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
      // Redirect using this.props.router.navigate
      this.props.router.navigate("/dashboard");
    } catch {
      this.setState({ error: "Invalid credentials" });
    }
  };

  render() {
    return (
      <div className="home-container">
        <h2>Welcome to Ticketing System</h2>
        {this.state.error && <div className="error">{this.state.error}</div>}
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={this.state.username}
            onChange={(e) => this.setState({ username: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
            required
          />
          <button type="submit">Login</button>
        </form>
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
