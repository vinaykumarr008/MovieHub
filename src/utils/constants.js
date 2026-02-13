// This file contains constants used throughout the app

// API Configuration
export const API_KEY = "a4eb561b9e578307b45795b17d5dfa13"; // REPLACE WITH YOUR ACTUAL KEY
export const BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

// Movie categories
export const MOVIE_CATEGORIES = [
  { id: "popular", name: "Popular" },
  { id: "top_rated", name: "Top Rated" },
  { id: "upcoming", name: "Upcoming" },
  { id: "now_playing", name: "Now Playing" },
];

// Get full image URL
export const getImageUrl = (path, size = "w300") => {
  return `${IMAGE_BASE_URL}/${size}${path}`;
};
