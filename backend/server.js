const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const authRoutes = require("./routes/authRoutes");
const movieRoutes = require("./routes/movieRoutes")
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/movies',movieRoutes)

// Database connection + Server
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
})
.catch(err => console.error("❌ MongoDB connection error:", err));
