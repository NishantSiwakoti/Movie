import React from "react";
import FeaturedMovie from "../components/FeaturedMovie";
import MovieList from "../components/MovieList";
import SeriesList from "../components/Series/SeriesList";

const Home = () => (
  <>
    <FeaturedMovie />
    <MovieList
      endpoint="discover/movie"
      title="Bollywood Movies"
      extraParams={{ with_original_language: "hi" }}
    />
    <MovieList endpoint="movie/popular" title="Popular Movies" genreId="" />
    <SeriesList
      endpoint="trending/tv/week"
      title="Trending - Series"
      genreId=""
    />
    <SeriesList endpoint="tv/top_rated" title="Top - Rated Series" genreId="" />

    <MovieList endpoint="movie/top_rated" title="Top Rated Movies" genreId="" />
    <SeriesList
      endpoint="discover/tv"
      title="Bollywood Web Series"
      extraParams={{ with_original_language: "hi" }}
    />
    <div className="max-w-6xl mx-auto text-center">
      <p className="text-xs md:text-sm">
        This project is for educational purposes only.
      </p>
      {/* <p className="text-base mt-4">
        Developed by
        <a
          href="https://www.nishantshiwakoti.com.np/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-400 ml-1"
        >
          Nishant Siwakoti
        </a>
      </p> */}
    </div>
  </>
);

export default Home;
