// src/pages/Explore.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";

const API_KEY = "75dd737af37127542cb737575b6c5e20";

export default function Explore() {
  const [popular, setPopular] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [popularRes, trendingRes] = await Promise.all([
          axios.get(
            `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
          ),
          axios.get(
            `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
          ),
        ]);
        setPopular(popularRes.data.results.slice(0, 4));
        setTrending(trendingRes.data.results.slice(0, 4));
      } catch (err) {
        console.error("Error fetching movies:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) return <p className="text-white px-4 sm:px-8 py-6">Loading...</p>;

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
