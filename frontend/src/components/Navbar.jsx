import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav>
      {user && (
        <>
          <Link
            to={user.role === "admin" ? "/admin-dashboard" : "/user-dashboard"}
          >
            Dashboard
          </Link>
          <button onClick={logout}>Logout</button>
        </>
      )}
      {!user && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
