import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Movies.css';

function Movies() {
  const [movies, setMovies] = useState([]); // State for all movies
  const [error, setError] = useState(null); // State for error handling
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/movies'); // Fetch all movies
        const filteredMovies = res.data.filter(movie => movie.released === '1'); // Filter released movies
        setMovies(filteredMovies);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError('Unable to load movies from the API.');
      }
    };

    fetchMovies(); // Fetch movies on component mount
  }, []);

  if (error) {
    return <div className="alert alert-danger">{error}</div>; // Display error message
  }

  if (movies.length === 0) {
    return <div>Loading...</div>; // Display loading state if no movies are available
  }

  return (
    <div className="movies-container">
      <h1>Movies</h1>
      <div className="movies-grid">
        {movies.map((movie) => (
          <div key={movie._id} className="movie-card" onClick={() => navigate(`/movies/${movie.name}`)}>
            <img src={movie.image} alt={movie.name} className="movie-image" />
            <div className="movie-details">
              <h2>{movie.name}</h2>
              <p>{movie.genre}</p>
              <p>{movie.releaseDate}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movies;
