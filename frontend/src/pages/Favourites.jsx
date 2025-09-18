// src/pages/FavouritesPage.js
import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import axios from "axios";

export default function FavouritesPage() {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token"); // JWT from login/signup

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/movies/favourites",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setFavourites(res.data);
      } catch (err) {
        console.error("Error fetching favourites:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchFavourites();
  }, [token]);

  if (loading)
    return (
      <p className="text-white px-4 sm:px-6 md:px-8 py-6">Loading favourites...</p>
    );

  return (
    <div className="px-4 sm:px-6 md:px-8 py-6 bg-gray-900 min-h-screen text-white">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">Your Favourites</h2>

      {favourites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {favourites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 text-sm sm:text-base">
          No favourite movies yet.
        </p>
      )}
    </div>
  );
}
