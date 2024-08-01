import React from "react";
import { Link } from "react-router-dom";
import not from "../assets/404.png";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <img
        src={not}
        alt="404 Not Found"
        className="w-64 h-64 lg:w-96 rounded-xl object-cover mb-6"
      />
      <h1 className="text-4xl font-bold text-white mb-4">
        Oops! Page Not Found
      </h1>
      <p className="text-lg text-gray-400 mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-800"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
