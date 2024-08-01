import React from "react";
import { Link } from "react-router-dom";

const SeriesCard = ({ series }) => {
  return (
    <div className="p-2 transform transition-transform hover:scale-105">
      <Link to={`/tv/${series.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
          alt={series.name}
          className="rounded-lg"
        />
        <h3 className="text-lg mt-2 hidden lg:block">{series.name}</h3>
      </Link>
    </div>
  );
};

export default SeriesCard;
