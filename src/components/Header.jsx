import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AiOutlineSearch, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import axios from "axios";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchTerm.trim()) {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/search/multi`,
            {
              params: {
                api_key: import.meta.env.VITE_TMDB_API_KEY,
                query: searchTerm,
              },
            }
          );
          setSearchResults(response.data.results.slice(0, 5));
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      } else {
        setSearchResults([]);
      }
    };

    const debounceTimeout = setTimeout(() => {
      fetchSearchResults();
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
    }
  };

  return (
    <header className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="flex items-center">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-yellow-600 border-b-4 border-yellow-400">
            ZAPMOVIES
          </h1>
        </Link>

        <nav className="hidden md:flex items-center flex-grow justify-center space-x-6">
          <NavLink
            to="/"
            className="hover:text-gray-400 transition duration-300"
            activeClassName="text-yellow-400"
          >
            Home
          </NavLink>
          <NavLink
            to="/movies"
            className="hover:text-gray-400 transition duration-300"
            activeClassName="text-yellow-400"
          >
            Movies
          </NavLink>
          <NavLink
            to="/bollywood"
            className="hover:text-gray-400 transition duration-300"
            activeClassName="text-yellow-400"
          >
            Bollywood
          </NavLink>
          <NavLink
            to="/inseries"
            className="hover:text-gray-400 transition duration-300"
            activeClassName="text-yellow-400"
          >
            Indian Series
          </NavLink>
          <NavLink
            to="/tv-shows"
            className="hover:text-gray-400 transition duration-300"
            activeClassName="text-yellow-400"
          >
            TV Shows
          </NavLink>
        </nav>

        <div className="hidden md:flex items-center ml-auto">
          <form onSubmit={handleSearch} className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-800 text-white px-4 py-2 rounded-full pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            <AiOutlineSearch
              className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            {searchResults.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-gray-800 text-white rounded-lg shadow-lg z-50">
                {searchResults.map((result) => (
                  <Link
                    key={result.id}
                    to={`/${result.media_type}/${result.id}`}
                    className="block px-4 py-2 hover:bg-gray-700"
                    onClick={() => setSearchTerm("")}
                  >
                    {result.title || result.name}
                  </Link>
                ))}
              </div>
            )}
          </form>
        </div>

        <div className="md:hidden flex items-center ml-auto">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-400 focus:outline-none relative z-50"
          >
            {isMobileMenuOpen ? (
              <AiOutlineClose size={24} className="text-red-600" />
            ) : (
              <AiOutlineMenu size={24} className="text-red-600" />
            )}
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-90 transition-transform transform ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden flex flex-col items-center justify-center space-y-6 p-6`}
      >
        <NavLink
          to="/"
          className="text-2xl font-semibold text-white hover:text-gray-400 transition duration-300"
          activeClassName="text-yellow-400"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Home
        </NavLink>
        <NavLink
          to="/movies"
          className="text-2xl font-semibold text-white hover:text-gray-400 transition duration-300"
          activeClassName="text-yellow-400"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Movies
        </NavLink>
        <NavLink
          to="/bollywood"
          className="text-2xl font-semibold text-white hover:text-gray-400 transition duration-300"
          activeClassName="text-yellow-400"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Bollywood
        </NavLink>
        <NavLink
          to="/inseries"
          className="text-2xl font-semibold text-white hover:text-gray-400 transition duration-300"
          activeClassName="text-yellow-400"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Indian Series
        </NavLink>
        <NavLink
          to="/tv-shows"
          className="text-2xl font-semibold text-white hover:text-gray-400 transition duration-300"
          activeClassName="text-yellow-400"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          TV Shows
        </NavLink>
      </div>

      <div className="md:hidden flex items-center justify-end p-4">
        <form onSubmit={handleSearch} className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-800 text-white px-4 py-2 rounded-full pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
          <AiOutlineSearch
            className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          {searchResults.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-gray-800 text-white rounded-lg shadow-lg z-50">
              {searchResults.map((result) => (
                <Link
                  key={result.id}
                  to={`/${result.media_type}/${result.id}`}
                  className="block px-4 py-2 hover:bg-gray-700"
                  onClick={() => setSearchTerm("")}
                >
                  {result.title || result.name}
                </Link>
              ))}
            </div>
          )}
        </form>
      </div>
    </header>
  );
};

export default Header;
