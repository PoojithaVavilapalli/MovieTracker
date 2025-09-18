const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  id: Number, // TMDB movie ID
  title: String,
  poster_path: String,
  overview: String,
  vote_average: Number,
});

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  watchlist: [movieSchema],
  favorites: [movieSchema],
});

module.exports = mongoose.model("User", userSchema);
