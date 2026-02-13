// This page shows all movies with filters
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../../components/MovieCard/MovieCard';
import './Movies.css';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('popular');
  
  // API key - REPLACE WITH YOURS
  const API_KEY = 'a4eb561b9e578307b45795b17d5dfa13';
  const BASE_URL = 'https://api.themoviedb.org/3';
  
  // Categories data
  const categories = [
    { id: 'popular', name: 'Popular' },
    { id: 'top_rated', name: 'Top Rated' },
    { id: 'upcoming', name: 'Upcoming' },
    { id: 'now_playing', name: 'Now Playing' },
  ];
  
  // Fetch movies based on selected category
  useEffect(() => {
    fetchMovies(selectedCategory);
  }, [selectedCategory]);
  
  const fetchMovies = async (category) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/movie/${category}?api_key=${API_KEY}&language=en-US&page=1`
      );
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
    setLoading(false);
  };
  
  if (loading) {
    return <div className="loading">Loading movies...</div>;
  }
  
  return (
    <div className="movies-page">
      <h1>🎥 Browse Movies</h1>
      
      {/* Category Filter */}
      <div className="category-filter">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      {/* Movies Grid */}
      <div className="movies-grid">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Movies;