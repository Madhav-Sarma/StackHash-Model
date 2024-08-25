import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

function Home() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/movies');
        setMovies(res.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError('Unable to load movies from the API.');
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="home-container">
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="movie-grid">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div className="movie-card" key={movie.name}>
              <img src={movie.image} alt={movie.name} className="movie-image" />
              <div className="movie-content">
                <h5 className="movie-title">{movie.name}</h5>
                <Link to={`/movies/${movie.name}`} className="btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="alert alert-danger">No movies available</div>
        )}
      </div>
    </div>
  );
}

export default Home;
