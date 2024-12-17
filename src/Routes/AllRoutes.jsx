import { Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
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
import LoginWarning from "../pages/LoginWarning";
import ProtectedRoute from "../Routes/protectedroute";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const AllRoutes = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto p-4">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/tv/:id" element={<SeriesDetail />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="*" element={<NotFound />} />

          {/* Protected Routes */}
          <Route
            path="/watch-options/:id"
            element={
              <ProtectedRoute user={user}>
                <WatchOptions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movies"
            element={
              <ProtectedRoute user={user}>
                <MoviesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bollywood"
            element={
              <ProtectedRoute user={user}>
                <Bollywood />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inseries"
            element={
              <ProtectedRoute user={user}>
                <IndianSeries />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tv-player/:id"
            element={
              <ProtectedRoute user={user}>
                <TVSeriesPlayer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tv-shows"
            element={
              <ProtectedRoute user={user}>
                <TVSeriesPage />
              </ProtectedRoute>
            }
          />

          {/* Login Warning */}
          <Route path="/login-warning" element={<LoginWarning />} />
        </Routes>
      </div>
    </div>
  );
};

export default AllRoutes;
