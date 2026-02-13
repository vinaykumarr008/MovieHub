// This file manages favorite movies in Redux
import { createSlice } from "@reduxjs/toolkit";

// Initial state (empty array)
const favoritesSlice = createSlice({
  name: "favorites", // Name of this slice
  initialState: {
    movies: [], // Empty array to start
  },
  reducers: {
    // Action to add movie to favorites
    addFavorite: (state, action) => {
      state.movies.push(action.payload);
    },
    // Action to remove movie from favorites
    removeFavorite: (state, action) => {
      state.movies = state.movies.filter(
        (movie) => movie.id !== action.payload,
      );
    },
    // Action to clear all favorites
    clearFavorites: (state) => {
      state.movies = [];
    },
  },
});

// Export actions to use in components
export const { addFavorite, removeFavorite, clearFavorites } =
  favoritesSlice.actions;

// Export reducer to use in store
export default favoritesSlice.reducer;
