import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const WatchOptions = () => {
  const { id } = useParams();
  const [activeLink, setActiveLink] = useState("link1");
  const [isLoading, setIsLoading] = useState(true);
  const [movieTitle, setMovieTitle] = useState("");

  const link1 = `${import.meta.env.VITE_LINK4.replace("{TMDB_ID}", id)}`;
  const link2 = `${import.meta.env.VITE_LINK1}/movie/${id}`;
  const link4 = `${import.meta.env.VITE_LINK5.replace("{TMDB_ID}", id)}`;
  const link3 = `${import.meta.env.VITE_LINK2}/${id}`;

  useEffect(() => {
    const fetchMovieTitle = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            params: {
              api_key: import.meta.env.VITE_TMDB_API_KEY,
            },
          }
        );
        setMovieTitle(response.data.title);
      } catch (error) {
        console.error("Error fetching movie title:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieTitle();
  }, [id]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white">
      <h1 className="mt-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
        {movieTitle}
      </h1>
      <div className="mt-4 w-full max-w-5xl px-4">
        <div className="text-center mb-4 p-4 bg-gray-800 rounded-lg shadow-lg">
          <p className="text-sm sm:text-base">
            To avoid ads, use the Brave browser or an ad blocker.
          </p>
        </div>
        <div className="flex justify-center mb-4">
          <button
            className={`px-4 py-2 rounded-lg ${
              activeLink === "link1"
                ? "bg-[#fb0009] text-white"
                : "bg-gray-600 text-gray-200"
            }`}
            onClick={() => {
              setActiveLink("link1");
              setIsLoading(true); // Reset loading state when changing link
            }}
          >
            Link 1
          </button>
          <button
            className={`ml-4 px-4 py-2 rounded-lg ${
              activeLink === "link3"
                ? "bg-[#fb0009] text-white"
                : "bg-gray-600 text-gray-200"
            }`}
            onClick={() => {
              setActiveLink("link3");
              setIsLoading(true);
            }}
          >
            Link 2
          </button>
          <button
            className={`ml-4 px-4 py-2 rounded-lg ${
              activeLink === "link4"
                ? "bg-[#fb0009] text-white"
                : "bg-gray-600 text-gray-200"
            }`}
            onClick={() => {
              setActiveLink("link4");
              setIsLoading(true);
            }}
          >
            Link 3
          </button>
        </div>
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          </div>
        )}
        <iframe
          src={
            activeLink === "link1"
              ? link1
              : activeLink === "link3"
              ? link3
              : link4
          }
          width="100%"
          height="500"
          frameBorder="0"
          allowFullScreen
          title="Movie Player"
          onLoad={handleIframeLoad}
          style={{ display: isLoading ? "none" : "block" }}
        ></iframe>
      </div>
    </div>
  );
};

export default WatchOptions;
