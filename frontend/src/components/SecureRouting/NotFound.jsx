import React from "react";
import { Link } from "react-router-dom"; // If you're using react-router-dom

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-red-400 to-orange-500 flex items-center justify-center text-center px-4">
      <div className="max-w-md bg-white p-8 rounded-xl shadow-xl">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-4">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-800 transition duration-300"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
