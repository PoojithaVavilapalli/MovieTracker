// src/features/movies/movieSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ TMDB API Key
const API_KEY = "75dd737af37127542cb737575b6c5e20";

// --- Async Thunks for API Calls ---

// Fetch Popular Movies
export const fetchPopularMovies = createAsyncThunk(
  "movies/fetchPopular",
  async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
    );
    const data = await res.json();
    return data.results.slice(0, 4); // only first 4 movies
  }
);

// Fetch Trending Movies
export const fetchTrendingMovies = createAsyncThunk(
  "movies/fetchTrending",
  async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
    );
    const data = await res.json();
    return data.results.slice(0, 4);
  }
);

// Fetch Movies by Genre
export const fetchMoviesByGenre = createAsyncThunk(
  "movies/fetchByGenre",
  async (genreId) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
    );
    const data = await res.json();
    return data.results;
  }
);

// --- Slice ---
const movieSlice = createSlice({
  name: "movies",
  initialState: {
    popular: [],
    trending: [],
    genreMovies: [],
    watchlist: [],
    favourites: [],
    loading: false,
    error: null,
  },
  reducers: {
    // ⭐ Watchlist Actions
    addToWatchlist: (state, action) => {
      if (!state.watchlist.find((m) => m.id === action.payload.id)) {
        state.watchlist.push(action.payload);
      }
    },
    removeFromWatchlist: (state, action) => {
      state.watchlist = state.watchlist.filter((m) => m.id !== action.payload.id);
    },

    // ❤️ Favourites Actions
    addToFavourites: (state, action) => {
      if (!state.favourites.find((m) => m.id === action.payload.id)) {
        state.favourites.push(action.payload);
      }
    },
    removeFromFavourites: (state, action) => {
      state.favourites = state.favourites.filter((m) => m.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      // Popular
      .addCase(fetchPopularMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.popular = action.payload;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Trending
      .addCase(fetchTrendingMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.trending = action.payload;
      })
      .addCase(fetchTrendingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Genre Movies
      .addCase(fetchMoviesByGenre.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
        state.loading = false;
        state.genreMovies = action.payload;
      })
      .addCase(fetchMoviesByGenre.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  addToWatchlist,
  removeFromWatchlist,
  addToFavourites,
  removeFromFavourites,
} = movieSlice.actions;

export default movieSlice.reducer;
