import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../../store/slices/favoritesSlice';
import './MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [similarMovies, setSimilarMovies] = useState([]);
  
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.movies);
  
  const API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your actual key
  const BASE_URL = 'https://api.themoviedb.org/3';
  
  useEffect(() => {
    // Define fetchMovieDetails inside useEffect
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
        );
        setMovie(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        // Fallback dummy data for testing
        setMovie({
          id: id,
          title: "Sample Movie",
          poster_path: "/placeholder.jpg",
          backdrop_path: "/placeholder.jpg",
          vote_average: 7.5,
          release_date: "2023-01-01",
          runtime: 120,
          genres: [{ id: 1, name: "Action" }, { id: 2, name: "Adventure" }],
          overview: "This is a sample movie overview for testing purposes."
        });
        setLoading(false);
      }
    };
    
    // Define fetchSimilarMovies inside useEffect
    const fetchSimilarMovies = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`
        );
        setSimilarMovies(response.data.results.slice(0, 5));
      } catch (error) {
        console.error('Error fetching similar movies:', error);
      }
    };
    
    // Call both functions
    fetchMovieDetails();
    fetchSimilarMovies();
  }, [id]); // Only depend on id
  
  const isFavorite = favorites.some(fav => fav.id === parseInt(id));
  
  const handleFavoriteToggle = () => {
    if (movie) {
      if (isFavorite) {
        dispatch(removeFavorite(movie.id));
      } else {
        dispatch(addFavorite(movie));
      }
    }
  };
  
  const handleBack = () => {
    navigate(-1);
  };
  
  if (loading) {
    return <div className="loading">Loading movie details...</div>;
  }
  
  if (!movie) {
    return (
      <div className="error-page">
        <h2>Movie not found!</h2>
        <button onClick={handleBack} className="back-btn">Go Back</button>
      </div>
    );
  }
  
  return (
    <div className="movie-details">
      <button onClick={handleBack} className="back-btn">
        ← Back
      </button>
      
      <div className="movie-hero">
        <div className="movie-backdrop">
          <img 
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} 
            alt={movie.title}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/1200x400?text=Movie+Backdrop';
            }}
          />
          <div className="backdrop-overlay"></div>
        </div>
        
        <div className="movie-content">
          <img 
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} 
            alt={movie.title}
            className="detail-poster"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x450?text=Movie+Poster';
            }}
          />
          
          <div className="movie-info">
            <h1>{movie.title}</h1>
            
            <div className="movie-meta">
              <span className="rating">⭐ {movie.vote_average}/10</span>
              <span className="year">{movie.release_date?.split('-')[0]}</span>
              {movie.runtime && <span className="runtime">{movie.runtime} mins</span>}
            </div>
            
            <div className="movie-genres">
              {movie.genres?.map(genre => (
                <span key={genre.id} className="genre-tag">
                  {genre.name}
                </span>
              ))}
            </div>
            
            <p className="movie-overview">{movie.overview}</p>
            
            <div className="movie-actions">
              <button 
                onClick={handleFavoriteToggle}
                className={`favorite-btn ${isFavorite ? 'active' : ''}`}
              >
                {isFavorite ? '❤️ Remove Favorite' : '🤍 Add to Favorites'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Similar Movies Section */}
      {similarMovies.length > 0 && (
        <div className="similar-movies">
          <h2>You might also like:</h2>
          <div className="similar-grid">
            {similarMovies.map(similarMovie => (
              <div 
                key={similarMovie.id} 
                className="similar-movie"
                onClick={() => navigate(`/movie/${similarMovie.id}`)}
              >
                <img 
                  src={`https://image.tmdb.org/t/p/w200${similarMovie.poster_path}`} 
                  alt={similarMovie.title}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/200x300?text=Movie';
                  }}
                />
                <h4>{similarMovie.title}</h4>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;