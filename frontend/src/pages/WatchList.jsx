// src/pages/WatchlistPage.js
import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import axios from "axios";

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const res = await axios.get("https://movietracker-4.onrender.com/api/movies/watchlist", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWatchlist(res.data);
      } catch (err) {
        console.error("Error fetching watchlist:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchWatchlist();
  }, [token]);

  if (loading) return <p className="text-white px-6 py-8">Loading watchlist...</p>;

  return (
    <div className="p-4">
      {watchlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {watchlist.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
          <p className="text-lg font-semibold">Your Watchlist is Empty 🎬</p>
          <p className="text-sm mt-2">Add movies to watch later!</p>
        </div>
      )}
    </div>
  );
}
