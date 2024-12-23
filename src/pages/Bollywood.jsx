import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import AdSenseAd from "../components/AdSenseAd";

const Bollywood = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef();

  const fetchGenres = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list`,
        {
          params: {
            api_key: import.meta.env.VITE_TMDB_API_KEY,
            language: "en-US",
          },
        }
      );
      const genresData = response.data.genres;
      setGenres(genresData);

      const actionGenre = genresData.find(
        (genre) => genre.name.toLowerCase() === "adventure"
      );
      if (actionGenre) {
        setSelectedGenre(actionGenre.id);
      }
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const fetchMovies = useCallback(async () => {
    if (!selectedGenre) return;
    setLoading(true);
    try {
      const params = {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
        language: "en-US",
        page: page,
        with_original_language: "hi",
        with_genres: selectedGenre,
      };

      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie`,
        { params }
      );
      setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  }, [page, selectedGenre]);

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies, selectedGenre]);

  const lastMovieElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
    setMovies([]);
    setPage(1);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap gap-4 mb-4">
        {genres.map((genre) => (
          <div
            key={genre.id}
            className={`cursor-pointer p-1.5 md:p-2 md:text-base text-sm rounded-md ${
              selectedGenre === genre.id
                ? "bg-[#b91c1c] text-white"
                : "bg-gray-800 text-gray-400"
            }`}
            onClick={() => handleGenreClick(genre.id)}
          >
            {genre.name}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            className="bg-gray-800 rounded-lg transform transition-transform hover:scale-105"
            ref={index === movies.length - 1 ? lastMovieElementRef : null}
          >
            <Link to={`/movie/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded-lg mb-4 w-full h-full object-cover"
              />
              {/* <h2 className="text-lg font-semibold hidden lg:block text-white mb-2">
                {movie.title}
              </h2> */}
            </Link>
          </div>
        ))}
      </div>

      {/* AdSense Ad - Below Movie Details */}
      <div className="my-4">
        <AdSenseAd />
      </div>
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader />
        </div>
      ) : (
        movies.length === 0 &&
        !loading && <div className="text-center text-white mt-4"></div>
      )}
    </div>
  );
};

export default Bollywood;
