import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    {
      name: "Dashboard",
      path: user?.role === "admin" ? "/admin-dashboard" : "/user-dashboard",
    },
    { name: "Tickets", path: "/tickets" },
    { name: "Profile", path: "/profile" },
  ];

  return (
    <nav className="backdrop-blur-xl bg-white/5 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            >
              TicketFlow
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    location.pathname === item.path
                      ? "bg-gradient-to-r from-purple-600/30 to-blue-500/30 text-white"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    location.pathname === "/admin"
                      ? "bg-gradient-to-r from-purple-600/30 to-blue-500/30 text-white"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  Admin
                </Link>
              )}
            </div>
          </div>

          {/* Auth Section */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-4">
              {user ? (
                <>
                  <span className="text-gray-300 text-sm">
                    Welcome, {user.username}
                  </span>
                  <button
                    onClick={logout}
                    className="bg-gradient-to-r from-purple-600 to-blue-500
                      text-white px-4 py-2 rounded-lg text-sm font-semibold
                      hover:from-purple-700 hover:to-blue-600 transition-all
                      transform hover:scale-105 shadow-lg shadow-purple-500/20"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                      location.pathname === "/login"
                        ? "bg-gradient-to-r from-purple-600/30 to-blue-500/30 text-white"
                        : "text-gray-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-gradient-to-r from-purple-600 to-blue-500
                      text-white px-4 py-2 rounded-lg text-sm font-semibold
                      hover:from-purple-700 hover:to-blue-600 transition-all
                      transform hover:scale-105 shadow-lg shadow-purple-500/20"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === item.path
                    ? "bg-gradient-to-r from-purple-600/30 to-blue-500/30 text-white"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
            {user ? (
              <button
                onClick={logout}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium
                  bg-gradient-to-r from-purple-600 to-blue-500 text-white"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === "/login"
                      ? "bg-gradient-to-r from-purple-600/30 to-blue-500/30 text-white"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 rounded-md text-base font-medium
                    bg-gradient-to-r from-purple-600 to-blue-500 text-white"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
