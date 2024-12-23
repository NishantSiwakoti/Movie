import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AdSenseAd from "./AdSenseAd";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            params: {
              api_key: import.meta.env.VITE_TMDB_API_KEY,
            },
          }
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      }
    };

    fetchMovie();
  }, [id]);

  useEffect(() => {
    const fetchSimilarMoviesByGenre = async (genreIds) => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie`,
          {
            params: {
              api_key: import.meta.env.VITE_TMDB_API_KEY,
              with_genres: genreIds.join(","),
            },
          }
        );
        setSimilarMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching similar movies:", error);
      }
    };

    if (movie) {
      const genreIds = movie.genres.map((genre) => genre.id);
      fetchSimilarMoviesByGenre(genreIds);
    }
  }, [movie]);

  if (!movie) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-2xl text-white animate-pulse">Loading...</div>
      </div>
    );
  }

  const imageUrl = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="relative bg-gray-900 text-white">
      {/* Background Section */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 1)), url(${imageUrl})`,
          height: "75vh",
        }}
      ></div>

      {/* Movie Details Section */}
      <div className="relative z-10 container mx-auto px-4 py-10 max-w-screen-lg">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col md:flex-row md:space-x-8">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={`${movie.title} Poster`}
            className="w-full md:w-1/3 h-auto object-cover rounded-lg shadow-md"
          />
          <div className="flex-1 flex flex-col justify-between mt-4 md:mt-0">
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              {movie.title}
            </h1>
            <div className="flex flex-wrap space-x-2 mt-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-red-600 px-3 py-1 mt-2 rounded-lg shadow-sm text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <p className=" text-gray-300 line-clamp-3 md:line-clamp-6 mt-2">
              {movie.overview}
            </p>
            <div className=" flex space-x-4 mt-2">
              <span className="font-semibold text-lg">
                {movie.runtime} mins
              </span>
              <span className="font-semibold text-lg">
                {movie.release_date.split("-")[0]}
              </span>
              <span className="font-semibold text-lg">
                {movie.vote_average} ⭐
              </span>
            </div>
            <button
              className="mt-6 bg-gradient-to-r from-red-600 to-red-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md "
              onClick={() => navigate(`/watch-options/${id}`)}
            >
              Watch Now
            </button>
          </div>
        </div>

        {/* AdSense Ad - Below Movie Details */}
        <div className="my-4">
          <AdSenseAd />
        </div>

        {/* Similar Movies Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-6">Similar Movies</h2>
          <Slider {...settings}>
            {similarMovies.map((similarMovie) => (
              <div
                key={similarMovie.id}
                className="cursor-pointer p-2"
                onClick={() => navigate(`/movie/${similarMovie.id}`)}
              >
                <img
                  src={
                    similarMovie.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${similarMovie.poster_path}`
                      : "/placeholder.jpg"
                  }
                  alt={similarMovie.title || "Movie Poster"}
                  className="w-full h-auto object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                />
                <h3 className="text-center text-sm mt-2">
                  {similarMovie.title}
                </h3>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
