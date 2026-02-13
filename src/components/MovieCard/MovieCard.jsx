// This component shows a single movie card
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addFavorite, removeFavorite } from '../../store/slices/favoritesSlice';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  // Get Redux store data
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.movies);
  
  // Check if this movie is in favorites
  const isFavorite = favorites.some(fav => fav.id === movie.id);
  
  // Handle favorite button click
  const handleFavoriteClick = () => {
    if (isFavorite) {
      dispatch(removeFavorite(movie.id));  // Remove from favorites
    } else {
      dispatch(addFavorite(movie));  // Add to favorites
    }
  };

  return (
    <div className="movie-card">
      {/* Movie poster image */}
      <img 
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} 
        alt={movie.title}
        className="movie-poster"
      />
      
      <div className="movie-info">
        {/* Movie title */}
        <h3 className="movie-title">{movie.title}</h3>
        
        {/* Movie rating */}
        <p className="movie-rating">⭐ {movie.vote_average}/10</p>
        
        {/* Release date */}
        <p className="movie-date">{movie.release_date}</p>
        
        {/* Buttons */}
        <div className="movie-actions">
          {/* Link to movie details page */}
          <Link to={`/movie/${movie.id}`} className="details-btn">
            View Details
          </Link>
          
          {/* Favorite button */}
          <button 
            onClick={handleFavoriteClick}
            className={`favorite-btn ${isFavorite ? 'favorite-active' : ''}`}
          >
            {isFavorite ? '❤️ Remove' : '🤍 Add'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;