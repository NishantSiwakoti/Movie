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
    <header className="bg-gradient-to-r from-gray-900 to-black text-white shadow-lg sticky top-0 z-50 transition-all duration-300 ease-in-out">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="flex items-center">
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-600 border-b-4 border-yellow-500 hover:scale-105 transform transition duration-300 ease-in-out">
            ZAPMOVIES
          </h1>
        </Link>

        <nav className="hidden md:flex items-center flex-grow justify-center space-x-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-500 border-b-2 border-yellow-500 font-semibold transition duration-300"
                : "hover:text-gray-300 transition duration-300"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-500 border-b-2 border-yellow-500 font-semibold transition duration-300"
                : "hover:text-gray-300 transition duration-300"
            }
          >
            Movies
          </NavLink>
          <NavLink
            to="/bollywood"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-500 border-b-2 border-yellow-500 font-semibold transition duration-300"
                : "hover:text-gray-300 transition duration-300"
            }
          >
            Bollywood
          </NavLink>
          <NavLink
            to="/inseries"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-500 border-b-2 border-yellow-500 font-semibold transition duration-300"
                : "hover:text-gray-300 transition duration-300"
            }
          >
            Indian Series
          </NavLink>
          <NavLink
            to="/tv-shows"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-500 border-b-2 border-yellow-500 font-semibold transition duration-300"
                : "hover:text-gray-300 transition duration-300"
            }
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
              className="bg-gray-800 text-white px-4 py-2 rounded-full pl-10 focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full transition duration-300"
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
            className="text-gray-400 focus:outline-none relative z-50 transition-transform duration-300"
          >
            {isMobileMenuOpen ? (
              <AiOutlineClose
                size={24}
                className="text-red-600 transform rotate-180"
              />
            ) : (
              <AiOutlineMenu
                size={24}
                className="text-red-600 transform rotate-180"
              />
            )}
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-95 backdrop-blur-lg transform transition-transform duration-500 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden flex flex-col items-center justify-center space-y-8 p-6`}
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-2xl font-semibold text-yellow-500 transition duration-300"
              : "text-2xl font-semibold text-white hover:text-gray-300 transition duration-300"
          }
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Home
        </NavLink>
        <NavLink
          to="/movies"
          className={({ isActive }) =>
            isActive
              ? "text-2xl font-semibold text-yellow-500 transition duration-300"
              : "text-2xl font-semibold text-white hover:text-gray-300 transition duration-300"
          }
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Movies
        </NavLink>
        <NavLink
          to="/bollywood"
          className={({ isActive }) =>
            isActive
              ? "text-2xl font-semibold text-yellow-500 transition duration-300"
              : "text-2xl font-semibold text-white hover:text-gray-300 transition duration-300"
          }
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Bollywood
        </NavLink>
        <NavLink
          to="/inseries"
          className={({ isActive }) =>
            isActive
              ? "text-2xl font-semibold text-yellow-500 transition duration-300"
              : "text-2xl font-semibold text-white hover:text-gray-300 transition duration-300"
          }
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Indian Series
        </NavLink>
        <NavLink
          to="/tv-shows"
          className={({ isActive }) =>
            isActive
              ? "text-2xl font-semibold text-yellow-500 transition duration-300"
              : "text-2xl font-semibold text-white hover:text-gray-300 transition duration-300"
          }
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
            className="bg-gray-800 text-white px-4 py-2 rounded-full pl-10 focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full transition duration-300"
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
                  className="flex items-center px-4 py-2 hover:bg-gray-700"
                  onClick={() => setSearchTerm("")}
                >
                  {result.poster_path || result.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w92${
                        result.poster_path || result.profile_path
                      }`}
                      alt={result.title || result.name}
                      className="w-12 h-12 rounded-lg mr-3 object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-700 rounded-lg mr-3 flex items-center justify-center">
                      <span className="text-xs text-gray-400">No Image</span>
                    </div>
                  )}
                  <span>{result.title || result.name}</span>
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
