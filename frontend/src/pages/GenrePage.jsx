// src/pages/GenrePage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MovieCard from "../components/MovieCard";

const API_KEY = "75dd737af37127542cb737575b6c5e20";

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
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      const genreId = genreMap[genre.toLowerCase()];
      if (!genreId) return;

      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
        );
        setMovies(res.data.results);
      } catch (err) {
        console.error("Error fetching genre movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [genre]);

  if (loading)
    return (
      <p className="text-white px-4 sm:px-6 md:px-8 py-6">Loading...</p>
    );

  return (
    <div className="bg-gray-900 min-h-screen text-white px-4 sm:px-6 md:px-8 py-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 capitalize">
        {genre} Movies
      </h1>

      {movies.length === 0 ? (
        <p className="text-gray-400 text-center text-sm sm:text-base">
          No movies found for this genre.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
