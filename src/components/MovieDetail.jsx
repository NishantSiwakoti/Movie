import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
      <div className="flex items-center justify-center min-h-screen bg-gray-800">
        <div className="text-xl text-gray-300">Loading...</div>
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
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="relative bg-background text-foreground">
      <div
        className="absolute inset-0 bg-cover bg-top rounded-lg"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url(${imageUrl})`,
          height: "80vh",
        }}
      ></div>
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-screen-lg">
        <div className="bg-card text-card-foreground rounded-lg shadow-lg p-6 md:flex md:items-start md:space-x-8">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            className="w-full md:w-1/3 h-auto object-cover rounded-lg"
          />
          <div className="flex-1 flex flex-col justify-between mt-4 md:mt-0">
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              {movie.title}
            </h1>
            <div className="flex flex-wrap mt-2 space-x-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-[#fb0009] text-white px-2 py-1 mt-2 rounded"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <div className="mt-4">
              <span className="font-semibold">Director:</span>{" "}
              <span>{movie.director || "N/A"}</span>
              <span className="mx-4">|</span>
              <span className="font-semibold">Stars:</span>{" "}
              <span>{movie.cast || "N/A"}</span>
            </div>
            <p className="mt-2 text-muted-foreground line-clamp-2">
              {movie.overview}
            </p>
            <div className="mt-4 flex items-center space-x-4">
              <span className="font-semibold">{movie.runtime} mins</span>
              <span className="mx-4">|</span>
              <span className="font-semibold">
                {movie.release_date.split("-")[0]}
              </span>
              <span className="mx-4">|</span>
              <span className="font-semibold">{movie.vote_average} ⭐</span>
            </div>
            <div className="mt-6 flex space-x-4">
              <button
                className="bg-red-600 text-white font-semibold py-2 px-5 rounded-md shadow-md hover:bg-red-700 transition duration-300 ease-in-out"
                onClick={() => navigate(`/watch-options/${id}`)}
              >
                Watch Now
              </button>
            </div>
          </div>
        </div>
        <div className="mt-10 lg:mt-16">
          <h2 className="text-2xl font-bold text-white mb-4">Similar Movies</h2>
          <Slider {...settings} className="mx-[-10px]">
            {similarMovies.map((similarMovie) => (
              <div
                key={similarMovie.id}
                className="cursor-pointer p-2"
                onClick={() => navigate(`/movie/${similarMovie.id}`)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500/${similarMovie.poster_path}`}
                  alt={similarMovie.title}
                  className="w-full h-auto object-cover rounded-lg"
                />
                <h3 className="text-white mt-2 text-center">
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
