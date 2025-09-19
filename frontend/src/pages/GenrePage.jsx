// src/pages/GenrePage.jsx
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoviesByGenre } from "../features/movies/movieSlice";
import MovieCard from "../components/MovieCard";

// Map of genre names to TMDB IDs
const genreMap = {
  action: 28,
  "sci-fi": 878,
  thriller: 53,
  horror: 27,
  comedy: 35,
  drama: 18,
};

export default function GenrePage() {
  const { genre } = useParams();
  const dispatch = useDispatch();
  const { genreMovies, loading, error } = useSelector((state) => state.movies);

  useEffect(() => {
    if (!genre) return;

    // 1️⃣ Decode URL in case of %2D, %20 etc.
    // 2️⃣ Convert to lowercase to match keys in genreMap
    const normalizedGenre = decodeURIComponent(genre).toLowerCase();

    // 3️⃣ Handle TMDB genre mapping
    const genreId = genreMap[normalizedGenre];

    if (genreId) {
      dispatch(fetchMoviesByGenre(genreId));
    }
  }, [genre, dispatch]);

  if (loading) {
    return <p className="text-white px-4 sm:px-6 md:px-8 py-6">Loading...</p>;
  }

  if (error) {
    return (
      <p className="text-red-400 px-4 sm:px-6 md:px-8 py-6">
        Failed to fetch movies: {error}
      </p>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white px-4 sm:px-6 md:px-8 py-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 capitalize">
        {decodeURIComponent(genre)} Movies
      </h1>

      {genreMovies.length === 0 ? (
        <p className="text-gray-400 text-center text-sm sm:text-base">
          No movies found for this genre.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {genreMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
