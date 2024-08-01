import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <div className="p-2 transform transition-transform hover:scale-105">
      <Link to={`/movie/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded-lg"
        />
        <h3 className="text-lg mt-2 hidden lg:block">{movie.title}</h3>
      </Link>
    </div>
  );
};

export default MovieCard;
