// This file sets up our Redux store (global state manager)
import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./slices/favoritesSlice";

// Create the store with our reducer
export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});
