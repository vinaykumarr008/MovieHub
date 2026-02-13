// This page shows user's favorite movies
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearFavorites } from '../../store/slices/favoritesSlice';
import MovieCard from '../../components/MovieCard/MovieCard';
import './Favorites.css';

const Favorites = () => {
  // Get favorites from Redux
  const favorites = useSelector(state => state.favorites.movies);
  const dispatch = useDispatch();
  
  // Handle clear all favorites
  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all favorites?')) {
      dispatch(clearFavorites());
    }
  };
  
  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <h1>❤️ My Favorite Movies</h1>
        <p>You have {favorites.length} favorite {favorites.length === 1 ? 'movie' : 'movies'}</p>
        
        {/* Clear All button */}
        {favorites.length > 0 && (
          <button onClick={handleClearAll} className="clear-btn">
            🗑️ Clear All
          </button>
        )}
      </div>
      
      {/* If no favorites */}
      {favorites.length === 0 ? (
        <div className="empty-favorites">
          <h2>No favorites yet!</h2>
          <p>Go to browse movies and add some to your favorites.</p>
          <a href="/movies" className="browse-link">
            Browse Movies
          </a>
        </div>
      ) : (
        /* Show favorites grid */
        <div className="favorites-grid">
          {favorites.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;