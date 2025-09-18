// movieRoutes.js
const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  addToWatchlist,
  removeFromWatchlist,
  addToFavorites,
  removeFromFavorites,
  getWatchlist,
  getFavorites,
} = require("../controllers/movieController");

// Watchlist
router.get("/watchlist", protect, getWatchlist);
router.post("/watchlist/add", protect, addToWatchlist);
router.post("/watchlist/remove", protect, removeFromWatchlist);

// Favourites
router.get("/favourites", protect, getFavorites);
router.post("/favourites/add", protect, addToFavorites);
router.post("/favourites/remove", protect, removeFromFavorites);

module.exports = router;
