import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Loader from "./Loader";

const FeaturedMovie = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/now_playing",
          {
            params: {
              api_key: import.meta.env.VITE_TMDB_API_KEY,
              language: "en-US",
            },
          }
        );
        setMovies(response.data.results.slice(0, 40));
      } catch (error) {
        console.error("Error fetching now playing movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNowPlaying();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-96">
        <Loader />
      </div>
    );

  if (movies.length === 0) return null;

  return (
    <div className="mb-8">
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        interval={2000}
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] bg-cover bg-top bg-no-repeat rounded-lg"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-end p-6 md:p-10 lg:p-14">
              <div className="w-full md:w-2/3 lg:w-1/2 text-left">
                <h2 className="text-2xl md:text-4xl font-bold mb-2 text-white">
                  {movie.title}
                </h2>
                <div className="flex items-center mb-4 text-sm md:text-base text-white">
                  <span className="bg-gray-800 bg-opacity-75 px-2 py-1 rounded mr-2">
                    {movie.vote_average}{" "}
                    <span className="text-yellow-400">⭐</span>
                  </span>
                  <span className="bg-gray-800 bg-opacity-75 px-2 py-1 rounded mr-2">
                    {movie.release_date.split("-")[0]}
                  </span>
                  <span className="bg-gray-800 bg-opacity-75 px-2 py-1 rounded">
                    {movie.adult ? "18+" : "13+"}
                  </span>
                </div>
                <p className="mb-4 text-xs md:text-sm lg:text-base text-white line-clamp-2">
                  {movie.overview}
                </p>
                <Link
                  to={`/movie/${movie.id}`}
                  className="bg-red-600 text-white font-semibold py-2 px-5 rounded-md shadow-md hover:bg-red-700 transition duration-300 ease-in-out"
                >
                  Watch Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default FeaturedMovie;
