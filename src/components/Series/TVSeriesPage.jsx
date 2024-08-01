import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../Loader";

const TVSeriesPage = () => {
  const [tvShows, setTvShows] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const observer = useRef();

  const fetchGenres = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/genre/tv/list`,
        {
          params: {
            api_key: import.meta.env.VITE_TMDB_API_KEY,
            language: "en-US",
          },
        }
      );
      setGenres(response.data.genres);
      const actionAdventureGenre = response.data.genres.find(
        (genre) => genre.name === "Action & Adventure"
      );
      if (actionAdventureGenre) {
        setSelectedGenre(actionAdventureGenre.id);
      }
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const fetchTVShows = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
        language: "en-US",
        page: page,
        with_genres: selectedGenre,
      };

      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/tv`,
        { params }
      );
      setTvShows((prevShows) => [...prevShows, ...response.data.results]);
    } catch (error) {
      console.error("Error fetching TV shows:", error);
    } finally {
      setIsLoading(false);
    }
  }, [page, selectedGenre]);

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    fetchTVShows();
  }, [fetchTVShows]);

  const lastTVShowElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading]
  );

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
    setTvShows([]);
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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {tvShows.map((show, index) => (
          <div
            key={show.id}
            className="bg-gray-800 rounded-lg transform transition-transform hover:scale-105"
            ref={index === tvShows.length - 1 ? lastTVShowElementRef : null}
          >
            <Link to={`/tv/${show.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                alt={show.name}
                className="rounded-lg mb-4 w-full h-full object-cover"
              />
              <h2 className="text-xl font-semibold hidden">{show.name}</h2>
            </Link>
          </div>
        ))}
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Loader />
        </div>
      ) : (
        tvShows.length === 0 &&
        !isLoading && <div className="text-center text-white mt-4"></div>
      )}
    </div>
  );
};

export default TVSeriesPage;
