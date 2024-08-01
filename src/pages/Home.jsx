import React from "react";
import FeaturedMovie from "../components/FeaturedMovie";
import MovieList from "../components/MovieList";
import SeriesList from "../components/Series/SeriesList";

const Home = () => (
  <>
    <FeaturedMovie />
    <MovieList endpoint="movie/popular" title="Popular Movies" genreId="" />
    <SeriesList
      endpoint="trending/tv/week"
      title="Trending - Series"
      genreId=""
    />
    <SeriesList endpoint="tv/top_rated" title="Top - Rated Series" genreId="" />
    <MovieList
      endpoint="discover/movie"
      title="Bollywood Movies"
      extraParams={{ with_original_language: "hi" }}
    />
    <MovieList endpoint="movie/top_rated" title="Top Rated Movies" genreId="" />
    <SeriesList
      endpoint="discover/tv"
      title="Bollywood Web Series"
      extraParams={{ with_original_language: "hi" }}
    />
  </>
);

export default Home;
