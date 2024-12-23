import React from "react";
import FeaturedMovie from "../components/FeaturedMovie";
import MovieList from "../components/MovieList";
import SeriesList from "../components/Series/SeriesList";
import AdSenseAd from "../components/AdSenseAd"; // Import the AdSense component

const Home = () => (
  <>
    <FeaturedMovie />

    {/* AdSense Ad - Below FeaturedMovie */}
    <div className="my-4">
      <AdSenseAd />
    </div>

    <MovieList
      endpoint="discover/movie"
      title="Bollywood Movies"
      extraParams={{ with_original_language: "hi" }}
    />

    {/* AdSense Ad - Between Sections */}
    <div className="my-4">
      <AdSenseAd />
    </div>

    <MovieList endpoint="movie/popular" title="Popular Movies" genreId="" />
    <SeriesList
      endpoint="trending/tv/week"
      title="Trending - Series"
      genreId=""
    />

    {/* AdSense Ad - Below Trending Section */}
    <div className="my-4">
      <AdSenseAd />
    </div>

    <SeriesList endpoint="tv/top_rated" title="Top - Rated Series" genreId="" />
    <MovieList endpoint="movie/top_rated" title="Top Rated Movies" genreId="" />

    <SeriesList
      endpoint="discover/tv"
      title="Bollywood Web Series"
      extraParams={{ with_original_language: "hi" }}
    />

    {/* AdSense Ad - Above Footer */}
    <div className="my-4">
      <AdSenseAd />
    </div>

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
