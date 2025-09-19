// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../features/movies/movieSlice";

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    // add other reducers here if you have
  },
  devTools: true, // <-- enable Redux DevTools directly
});