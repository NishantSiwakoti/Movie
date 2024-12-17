import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import { auth, provider, signInWithPopup, signOut } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [user, setUser] = useState(null); // Track authenticated user
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchTerm.trim()) {
        try {
          const response = await axios.get(
            "https://api.themoviedb.org/3/search/multi",
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
      setShowMobileSearch(false);
    }
  };

  const handleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const loggedInUser = result.user;
      setUser(loggedInUser); // Set the authenticated user
      console.log("User signed in:", loggedInUser);
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setShowDropdown(false); // Close dropdown
      console.log("User signed out successfully.");
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        console.log("User is logged in:", currentUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <header className="bg-gradient-to-r from-gray-900 to-black text-white shadow-lg sticky top-0 z-50 transition-all duration-300 ease-in-out">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <h1 className="text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-600 border-b-4 border-yellow-500 hover:scale-105 transform transition duration-300 ease-in-out">
            ZAPMOVIES
          </h1>
        </Link>

        {/* Desktop Navigation */}
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

        {/* Search and Auth for Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Desktop Search */}
          <div className="relative w-60">
            <form onSubmit={handleSearch} className="relative">
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
                      <img
                        src={`https://image.tmdb.org/t/p/w92${result.poster_path}`}
                        alt={result.title || result.name}
                        className="w-12 h-16 object-cover rounded-lg mr-3"
                      />
                      <div>
                        <p className="font-semibold">
                          {result.title || result.name}
                        </p>
                        <p className="text-sm text-gray-400">
                          {result.media_type === "movie" ? "Movie" : "TV Show"}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </form>
          </div>

          {/* User Authentication */}
          {!user ? (
            <button
              onClick={handleAuth}
              className="bg-gradient-to-r from-yellow-500 to-red-500 text-white font-semibold px-6 py-2 rounded-full hover:scale-105 transform transition duration-300"
            >
              Login
            </button>
          ) : (
            <div className="relative">
              <img
                src={user.photoURL}
                alt="User Avatar"
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
              />
              {showDropdown && (
                <div className="absolute right-0 mt-2 bg-red-800 text-white rounded-lg shadow-lg">
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 w-full text-left hover:bg-red-800"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile: Search + User Auth */}
        <div className="flex items-center md:hidden space-x-4">
          {/* Search Icon */}
          <AiOutlineSearch
            className="text-yellow-500 cursor-pointer"
            size={25}
            onClick={() => setShowMobileSearch(!showMobileSearch)}
          />
          {/* User Authentication */}
          {!user ? (
            <button
              onClick={handleAuth}
              className="bg-gradient-to-r from-yellow-500 to-red-500 text-white font-semibold px-4 py-2 rounded-full"
            >
              Login
            </button>
          ) : (
            <div className="relative">
              <img
                src={user.photoURL}
                alt="User Avatar"
                className="w-8 h-8 rounded-full cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
              />
              {showDropdown && (
                <div className="absolute right-0 mt-2 bg-red-700 text-white rounded-lg shadow-lg z-50">
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 w-full text-left hover:bg-red-800"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search Box */}
      {/* Mobile Search Box */}
      {showMobileSearch && (
        <div className="absolute top-full left-0 w-full bg-gray-900 p-4 z-50">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-800 text-white px-4 py-2 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
            />
            <AiOutlineSearch
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </form>
          {/* Search Suggestions for Small Screens */}
          {searchResults.length > 0 && (
            <div className="mt-2 bg-gray-800 text-white rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {searchResults.map((result) => (
                <Link
                  key={result.id}
                  to={`/${result.media_type}/${result.id}`}
                  className="flex items-center px-4 py-2 hover:bg-gray-700"
                  onClick={() => {
                    setSearchTerm("");
                    setShowMobileSearch(false);
                  }}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w92${result.poster_path}`}
                    alt={result.title || result.name}
                    className="w-12 h-16 object-cover rounded-lg mr-3"
                  />
                  <div>
                    <p className="font-semibold">
                      {result.title || result.name}
                    </p>
                    <p className="text-sm text-gray-400">
                      {result.media_type === "movie" ? "Movie" : "TV Show"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
