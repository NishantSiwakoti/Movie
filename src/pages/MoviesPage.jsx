import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(() => {
    const savedGenre = localStorage.getItem("selectedGenre");
    return savedGenre ? savedGenre : "marvel";
  });
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
      const marvelGenre = { id: "marvel", name: "Marvel" }; // Add Marvel genre
      setGenres([...response.data.genres, marvelGenre]);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    try {
      let params = {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
        language: "en-US",
        page: page,
      };

      if (selectedGenre === "marvel") {
        params = {
          ...params,
          with_keywords: "180547",
        };
      } else {
        params = {
          ...params,
          with_genres: selectedGenre,
        };
      }

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
  }, [fetchMovies]);

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
    localStorage.setItem("selectedGenre", genreId);
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

      <>
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
              </Link>
            </div>
          ))}
        </div>
      </>
    </div>
  );
};

export default MoviesPage;
