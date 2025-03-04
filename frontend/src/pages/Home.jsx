// filepath: src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Welcome to Ticketing System
        </h1>
        <div className="flex flex-col space-y-4">
          <Link
            to="/login"
            className="bg-primary hover:bg-secondary text-white text-center py-2 px-4 rounded-md transition-colors"
          >
            Login
          </Link>
          <div className="text-center text-gray-600">or</div>
          <Link
            to="/signup"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-white text-center py-2 px-4 rounded-md transition-colors"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
