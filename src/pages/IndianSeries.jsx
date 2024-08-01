import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const IndianSeries = () => {
  const [series, setSeries] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
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
      const genresData = response.data.genres;
      setGenres(genresData);

      const actionGenre = genresData.find(
        (genre) => genre.name.toLowerCase() === "action & adventure"
      );
      if (actionGenre) {
        setSelectedGenre(actionGenre.id);
      }
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const fetchSeries = useCallback(async () => {
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
        `https://api.themoviedb.org/3/discover/tv`,
        { params }
      );
      setSeries((prevSeries) => [...prevSeries, ...response.data.results]);
    } catch (error) {
      console.error("Error fetching series:", error);
    } finally {
      setLoading(false);
    }
  }, [page, selectedGenre]);

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    fetchSeries();
  }, [fetchSeries, selectedGenre]);

  const lastSeriesElementRef = useCallback(
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
    setSeries([]);
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
        {series.map((serie, index) => (
          <div
            key={serie.id}
            className="bg-gray-800 rounded-lg transform transition-transform hover:scale-105"
            ref={index === series.length - 1 ? lastSeriesElementRef : null}
          >
            <Link to={`/tv/${serie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
                alt={serie.name}
                className="rounded-lg mb-4 w-full h-full object-cover"
              />
              {/* <h2 className="text-lg font-semibold hidden lg:block text-white mb-2">
                  {serie.name}
                </h2> */}
            </Link>
          </div>
        ))}
      </div>
      {loading && <div className="text-center text-white mt-4">Loading...</div>}
    </div>
  );
};

export default IndianSeries;
