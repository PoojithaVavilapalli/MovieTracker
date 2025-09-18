// src/components/MovieCard.jsx
import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark } from "react-icons/fa";

export default function MovieCard({ movie }) {
  const [isFavourite, setIsFavourite] = useState(false);
  const [isWatchlist, setIsWatchlist] = useState(false);

  const token = localStorage.getItem("token");

  // ✅ Check if movie is already in user's lists
  useEffect(() => {
    const checkStatus = async () => {
      if (!token) return;

      try {
        const resWatchlist = await fetch("http://localhost:5000/api/movies/watchlist", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const watchlistData = await resWatchlist.json();
        setIsWatchlist(watchlistData.some((m) => m.id === movie.id));

        const resFavourites = await fetch("http://localhost:5000/api/movies/favourites", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const favouritesData = await resFavourites.json();
        setIsFavourite(favouritesData.some((m) => m.id === movie.id));
      } catch (err) {
        console.error(err);
      }
    };
    checkStatus();
  }, [movie.id, token]);

  // ✅ Toggle watchlist
  const toggleWatchlist = async () => {
    if (!token) return alert("Login first!");

    try {
      const res = await fetch(
        `http://localhost:5000/api/movies/watchlist/${isWatchlist ? "remove" : "add"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ movie }),
        }
      );
      if (res.ok) setIsWatchlist(!isWatchlist);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Toggle favourites
  const toggleFavourites = async () => {
    if (!token) return alert("Login first!");

    try {
      const res = await fetch(
        `http://localhost:5000/api/movies/favourites/${isFavourite ? "remove" : "add"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ movie }),
        }
      );
      if (res.ok) setIsFavourite(!isFavourite);
    } catch (err) {
      console.error(err);
    }
  };

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  const description =
    movie.overview && movie.overview.length > 100
      ? movie.overview.slice(0, 100) + "..."
      : movie.overview;

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transform transition duration-300 flex flex-col">
      {/* Poster */}
      <img
        src={posterUrl}
        alt={movie.title}
        className="w-full h-64 sm:h-72 md:h-80 object-cover"
      />

      {/* Info */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-base sm:text-lg font-semibold line-clamp-1">
          {movie.title}
        </h3>
        <p className="text-yellow-400 font-bold text-sm sm:text-base">
          ⭐ {movie.vote_average}
        </p>

        {description && (
          <p className="text-gray-300 text-xs sm:text-sm mt-2 line-clamp-3">
            {description}
          </p>
        )}

        {/* Actions */}
        <div className="flex justify-between items-center mt-auto pt-4">
          <button onClick={toggleWatchlist} className="text-xl sm:text-2xl">
            {isWatchlist ? (
              <FaBookmark className="text-blue-500" />
            ) : (
              <FaRegBookmark />
            )}
          </button>

          <button onClick={toggleFavourites} className="text-xl sm:text-2xl">
            {isFavourite ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
