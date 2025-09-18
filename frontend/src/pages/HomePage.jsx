import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate("/explore");
  };

  const featuredMovie = {
    title: "Guardians of the Galaxy",
    year: 2018,
    duration: "2h 8m",
    genres: ["Action", "Adventure", "Sci-Fi"],
    description:
      "In a post-apocalyptic world where cities ride on wheels and consume each other to survive, two people meet in London and try to stop a conspiracy.",
    image:
      "https://image.tmdb.org/t/p/original/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <div
        className="relative h-screen bg-cover bg-center flex items-center"
        style={{ backgroundImage: `url(${featuredMovie.image})` }}
      >
        <div className="bg-gradient-to-t from-gray-900 to-transparent w-full h-full flex items-center">
          <div className="px-12 max-w-2xl">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {featuredMovie.title}
            </h2>
            <p className="text-gray-300 mb-4">
              {featuredMovie.genres.join(" | ")} | {featuredMovie.year} |{" "}
              {featuredMovie.duration}
            </p>
            <p className="text-gray-300 mb-6">{featuredMovie.description}</p>
            <div className="flex space-x-4">
              <button
                onClick={handleExploreClick}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold"
              >
                Explore Movies
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
