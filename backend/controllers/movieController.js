// backend/controllers/movieController.js
const User = require("../models/User.js");

// Add movie to watchlist
const addToWatchlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // use id from protect middleware
    const movie = req.body.movie;

    if (!user.watchlist.some((m) => m.id === movie.id)) {
      user.watchlist.push(movie);
      await user.save();
    }
    res.json(user.watchlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove movie from watchlist
const removeFromWatchlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const movie = req.body.movie;

    user.watchlist = user.watchlist.filter((m) => m.id !== movie.id);
    await user.save();
    res.json(user.watchlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add movie to favorites
const addToFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const movie = req.body.movie;

    if (!user.favorites.some((m) => m.id === movie.id)) {
      user.favorites.push(movie);
      await user.save();
    }
    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove movie from favorites
const removeFromFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const movie = req.body.movie;

    user.favorites = user.favorites.filter((m) => m.id !== movie.id);
    await user.save();
    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user watchlist
const getWatchlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.watchlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user favorites
const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addToWatchlist,
  removeFromWatchlist,
  addToFavorites,
  removeFromFavorites,
  getWatchlist,
  getFavorites,
};
