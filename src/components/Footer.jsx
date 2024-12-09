import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaFilm, FaTv } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white fixed bottom-0 w-full py-3 shadow-lg z-50 flex md:hidden justify-around items-center">
      <Link
        to="/"
        className="flex flex-col items-center hover:text-yellow-400 transition duration-300"
      >
        <FaHome size={24} />
        <span className="text-sm mt-1">Home</span>
      </Link>
      <Link
        to="/movies"
        className="flex flex-col items-center hover:text-yellow-400 transition duration-300"
      >
        <FaFilm size={24} />
        <span className="text-sm mt-1">Movies</span>
      </Link>
      <Link
        to="/tv-shows"
        className="flex flex-col items-center hover:text-yellow-400 transition duration-300"
      >
        <FaTv size={24} />
        <span className="text-sm mt-1">TV Shows</span>
      </Link>
    </footer>
  );
};

export default Footer;
