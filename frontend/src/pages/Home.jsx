import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl backdrop-blur-xl bg-white/5 rounded-3xl shadow-2xl shadow-purple-900/30 border border-white/20 p-12 space-y-10">
        {/* Header Section */}
        <div className="text-center space-y-3">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent py-3">
            Welcome to Ticketing System
          </h1>
          <p className="text-gray-300 text-xl font-light">
            Manage your support tickets with ease and efficiency
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-[10px]">
          <Link
            to="/login"
            className="group relative flex justify-center items-center gap-3 w-full py-5 px-8 bg-gradient-to-r from-indigo-600 to-purple-500
              text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-600
              transition-all transform hover:scale-[1.02] shadow-lg shadow-purple-500/20
              overflow-hidden"
          >
            <span className="z-10">Get Started</span>
            <svg
              className="w-5 h-5 z-10 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-transparent text-gray-300 text-m">
                or
              </span>
            </div>
          </div>

          <Link
            to="/signup"
            className="group flex justify-center items-center gap-2 w-full py-5 px-8 border-2 border-indigo-400/50
              text-indigo-100 font-semibold rounded-xl hover:bg-indigo-500/20
              transition-all transform hover:scale-[1.01] hover:border-indigo-400/80
              relative overflow-hidden"
          >
            <span className="z-10">Create New Account</span>
            <svg
              className="w-4 h-4 z-10 opacity-70 group-hover:translate-x-1 transition-transform"
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
            <div className="absolute inset-0 bg-indigo-500/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        </div>

        {/* Footer Text */}
        <p className="text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-300 hover:text-indigo-200 underline transition-colors"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Home;
