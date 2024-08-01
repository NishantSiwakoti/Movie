import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SeriesCard from "./SeriesCard";
import Loader from "../Loader";

const SeriesList = ({ endpoint, title, genreId, extraParams = {} }) => {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const params = {
          api_key: import.meta.env.VITE_TMDB_API_KEY,
          language: "en-US",
          ...extraParams,
        };
        if (genreId) {
          params.with_genres = genreId;
        }
        const response = await axios.get(
          `https://api.themoviedb.org/3/${endpoint}`,
          { params }
        );
        setSeries(response.data.results);
      } catch (error) {
        console.error("Error fetching series:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeries();
  }, [endpoint, genreId, extraParams]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <Loader />
      </div>
    );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <Slider {...settings}>
        {series.map((serie) => (
          <SeriesCard key={serie.id} series={serie} />
        ))}
      </Slider>
    </div>
  );
};

export default SeriesList;
