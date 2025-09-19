// src/pages/Explore.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularMovies, fetchTrendingMovies } from "../features/movies/movieSlice";
import MovieCard from "../components/MovieCard";

export default function Explore() {
  const dispatch = useDispatch();
  const { popular, trending, loading, error } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchPopularMovies());
    dispatch(fetchTrendingMovies());
  }, [dispatch]);

  if (loading) return <p className="text-white px-4 sm:px-8 py-6">Loadingggg....</p>;
  if (error) return <p className="text-red-500 px-4 sm:px-8 py-6">Error: {error}</p>;

  return (
    <div className="px-4 sm:px-6 md:px-8 py-6 bg-gray-900 text-white min-h-screen">
      {/* Popular Movies */}
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Popular Movies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
        {popular.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* Trending Movies */}
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Trending Movies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {trending.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
