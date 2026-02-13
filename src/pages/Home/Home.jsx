// This is the home page
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../../components/MovieCard/MovieCard';
import './Home.css';

const Home = () => {
  // State variables
  const [movies, setMovies] = useState([]);  // Store movies
  const [loading, setLoading] = useState(true);  // Loading state
  const [searchTerm, setSearchTerm] = useState('');  // Search input
  
  // You need to get your own API key from TMDB website
  const API_KEY = 'a4eb561b9e578307b45795b17d5dfa13';  // REPLACE THIS
  const BASE_URL = 'https://api.themoviedb.org/3';
  
  // Fetch movies when component loads
  useEffect(() => {
    fetchMovies();
  }, []);
  
  // Function to fetch popular movies
  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      );
      setMovies(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setLoading(false);
    }
  };
  
  // Handle search form submission
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchTerm}`
      );
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
    setLoading(false);
  };
  
  // Show loading message
  if (loading) {
    return <div className="loading">Loading movies...</div>;
  }
  
  return (
    <div className="home">
      {/* Hero Section */}
      <div className="hero">
        <h1>🎬 Discover Amazing Movies</h1>
        <p>Browse, search, and save your favorite movies</p>
        
        {/* Search Form */}
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search for movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">
            🔍 Search
          </button>
        </form>
      </div>
      
      {/* Movies Grid */}
      <div className="movies-grid">
        {movies.length > 0 ? (
          movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <div className="no-results">
            <p>No movies found. Try a different search!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;