const express = require("express");
const { registerUser, loginUser, getCurrentUser } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// Signup
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Get logged in user
router.get("/me", protect, getCurrentUser);

module.exports = router;
