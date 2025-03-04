import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-center text-3xl font-bold text-gray-900 mb-6">
          Welcome to Ticketing System
        </h1>
        <div className="space-y-4">
          <Link
            to="/login"
            className="block w-full text-center bg-black hover:bg-blue text-white font-semibold py-3 px-4 rounded-md transition-colors"
          >
            Login
          </Link>
          <div className="text-center text-gray-500">or</div>
          <Link
            to="/signup"
            className="block w-full text-center border border-black text-black hover:bg-black hover:text-white font-semibold py-3 px-4 rounded-md transition-colors"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
