import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Loader from "../Loader";

const FeaturedSeries = () => {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAiringToday = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/tv/airing_today",
          {
            params: {
              api_key: import.meta.env.VITE_TMDB_API_KEY,
              language: "en-US",
            },
          }
        );
        setSeries(response.data.results.slice(0, 40));
      } catch (error) {
        console.error("Error fetching airing today series:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAiringToday();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-96">
        <Loader />
      </div>
    );

  if (series.length === 0) return null;

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
        {series.map((show) => (
          <div
            key={show.id}
            className="relative w-full h-96 bg-cover bg-center rounded-lg"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${show.backdrop_path})`,
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-end p-6 md:p-10 lg:p-14">
              <div className="w-full md:w-2/3 lg:w-1/2 text-left">
                <h2 className="text-2xl md:text-4xl font-bold mb-2 text-white">
                  {show.name}
                </h2>
                <div className="flex items-center mb-4 text-sm md:text-base text-white">
                  <span className="bg-gray-800 bg-opacity-75 px-2 py-1 rounded mr-2">
                    {show.vote_average}{" "}
                    <span className="text-yellow-400">⭐</span>
                  </span>
                  <span className="bg-gray-800 bg-opacity-75 px-2 py-1 rounded mr-2">
                    {show.first_air_date.split("-")[0]}
                  </span>
                  <span className="bg-gray-800 bg-opacity-75 px-2 py-1 rounded">
                    {show.adult ? "18+" : "13+"}
                  </span>
                </div>
                <p className="mb-4 text-xs md:text-sm lg:text-base text-white line-clamp-2">
                  {show.overview}
                </p>
                <Link
                  to={`/series/${show.id}`}
                  className="bg-red-600 text-white font-bold py-2 px-5 rounded-xl shadow-md hover:bg-red-700 transition duration-300 ease-in-out"
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

export default FeaturedSeries;
