import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";

const SearchResultsPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("movie");

  const query = new URLSearchParams(useLocation().search).get("query");

  useEffect(() => {
    if (query) {
      const fetchResults = async () => {
        try {
          setLoading(true);
          const response = await axios.get(
            `https://api.themoviedb.org/3/search/multi`,
            {
              params: {
                api_key: import.meta.env.VITE_TMDB_API_KEY,
                query: query,
              },
            }
          );
          setResults(response.data.results);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };

      fetchResults();
    }
  }, [query]);

  const filterResults = (type) => {
    return results.filter((result) => result.media_type === type);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching results</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-4">Search Results for "{query}"</h1>
      <div className="flex mb-4">
        <button
          onClick={() => setActiveTab("movie")}
          className={`px-4 py-2 mr-2 rounded-md ${
            activeTab === "movie"
              ? "bg-red-700 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
        >
          Movies
        </button>
        <button
          onClick={() => setActiveTab("tv")}
          className={`px-4 py-2 rounded-md ${
            activeTab === "tv"
              ? "bg-red-700 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
        >
          TV Shows
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {activeTab === "movie" && filterResults("movie").length > 0 ? (
          filterResults("movie").map((result) => (
            <div key={result.id} className="bg-gray-800 p-4 rounded-lg group">
              <Link to={`/movie/${result.id}`} className="block">
                <img
                  src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}
                  alt={result.title}
                  className="w-full h-auto rounded-lg transition-transform duration-300 transform group-hover:scale-105"
                />
                <h2 className="text-lg mt-2">{result.title}</h2>
              </Link>
            </div>
          ))
        ) : activeTab === "tv" && filterResults("tv").length > 0 ? (
          filterResults("tv").map((result) => (
            <div key={result.id} className="bg-gray-800 p-4 rounded-lg group">
              <Link to={`/tv/${result.id}`} className="block">
                <img
                  src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}
                  alt={result.name}
                  className="w-full h-auto rounded-lg transition-transform duration-300 transform group-hover:scale-105"
                />
                <h2 className="text-lg mt-2">{result.name}</h2>
              </Link>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
