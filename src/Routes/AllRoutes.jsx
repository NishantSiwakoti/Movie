import { Routes, Route } from "react-router-dom";
import React from "react";
import Home from "../pages/Home";
import MovieDetail from "../components/MovieDetail";
import SeriesDetail from "../components/Series/SeriesDetail";
import WatchOptions from "../components/WatchOptions";
import MoviesPage from "../pages/MoviesPage";
import SearchResultsPage from "../pages/SearchResultsPage";
import TVSeriesPlayer from "../components/Series/TVSeriesPlayer";
import TVSeriesPage from "../components/Series/TVSeriesPage";
import NotFound from "../pages/NotFound";
import Bollywood from "../pages/Bollywood";
import IndianSeries from "../pages/IndianSeries";

const AllRoutes = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/tv/:id" element={<SeriesDetail />} />
          <Route path="/watch-options/:id" element={<WatchOptions />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/bollywood" element={<Bollywood />} />
          <Route path="/inseries" element={<IndianSeries />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/tv-player/:id" element={<TVSeriesPlayer />} />
          <Route path="/tv-shows" element={<TVSeriesPage />} />{" "}
        </Routes>
      </div>
    </div>
  );
};

export default AllRoutes;
