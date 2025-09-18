import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // ⚡ lightweight icons

export default function Navbar() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleGenreSelect = (genre) => {
    navigate(`/genre/${genre}`);
    setDropdownOpen(false);
    setMobileMenuOpen(false); // close mobile menu too
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center relative ">
      {/* Logo */}
      <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        MovieTracker
      </h1>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-6 items-center">
        <li
          className="cursor-pointer hover:text-yellow-500"
          onClick={() => navigate("/")}
        >
          Home
        </li>

        <li className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="cursor-pointer hover:text-yellow-500 focus:outline-none"
          >
            Genre
          </button>
          {dropdownOpen && (
            <ul className="absolute top-full left-0 mt-2 bg-gray-800 shadow-lg rounded-lg w-40 z-50">
              {["Action", "Sci-Fi", "Thriller", "Horror"].map((genre) => (
                <li
                  key={genre}
                  className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                  onClick={() => handleGenreSelect(genre)}
                >
                  {genre}
                </li>
              ))}
            </ul>
          )}
        </li>

        <li
          className="cursor-pointer hover:text-yellow-500"
          onClick={() => navigate("/watchlist")}
        >
          WatchList
        </li>
        <li
          className="cursor-pointer hover:text-yellow-500"
          onClick={() => navigate("/favourites")}
        >
          Favorites
        </li>
      </ul>

      {/* Desktop Buttons */}
      <div className="hidden md:flex items-center space-x-4">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold"
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-gray-800 flex flex-col items-center py-6 space-y-4 md:hidden z-50">
          <p
            className="cursor-pointer hover:text-yellow-500"
            onClick={() => {
              navigate("/");
              setMobileMenuOpen(false);
            }}
          >
            Home
          </p>

          {/* Genre Dropdown inside mobile */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="cursor-pointer hover:text-yellow-500 focus:outline-none"
            >
              Genre
            </button>
            {dropdownOpen && (
              <ul className="mt-2 bg-gray-700 rounded-lg w-40 text-center">
                {["Action", "Sci-Fi", "Thriller", "Horror"].map((genre) => (
                  <li
                    key={genre}
                    className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                    onClick={() => handleGenreSelect(genre)}
                  >
                    {genre}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <p
            className="cursor-pointer hover:text-yellow-500"
            onClick={() => {
              navigate("/watchlist");
              setMobileMenuOpen(false);
            }}
          >
            WatchList
          </p>
          <p
            className="cursor-pointer hover:text-yellow-500"
            onClick={() => {
              navigate("/favourites");
              setMobileMenuOpen(false);
            }}
          >
            Favorites
          </p>

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
                setMobileMenuOpen(false);
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
