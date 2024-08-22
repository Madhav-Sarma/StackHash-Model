import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const mockMovies = [
      {
        id: 1,
        title: 'Inception',
        rating: '8.8',
        image: 'https://m.media-amazon.com/images/I/51v5ZpFyaFL._AC_SY445_.jpg',
      },
      {
        id: 2,
        title: 'The Dark Knight',
        rating: '9.0',
        image: 'https://wallpapercave.com/wp/wp4770368.jpg',
      },
    ];

    fetch('https://api.sampleapis.com/movies/action-adventure')
      .then(response => {
        if (!response.ok) {
          throw new Error(`API error: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        // Log and check the API data structure
        console.log('API data:', data);

        // Simulate an unexpected data format
        if (Array.isArray(data)) {
          setMovies(data);
        } else {
          throw new Error('Unexpected data format');
        }
      })
      .catch(error => {
        console.error('Fetch error:', error);
        setError('Unable to load movies from the API. Showing mock data.');
        setMovies(mockMovies);
      });
  }, []);

  return (
    <div className="row">
      {error && <div className="alert alert-danger">{error}</div>}
      {movies.length > 0 ? (
        movies.map(movie => (
          <div className="col-md-4" key={movie.id}>
            <div className="card mb-4 shadow-sm">
              <img
                src={movie.image}
                className="card-img-top"
                alt={movie.title}
              />
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">Rating: {movie.rating}</p>
                <Link to={`/movie/${movie.id}`} className="btn btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-12">
          <p>No movies available</p>
        </div>
      )}
    </div>
  );
}

export default Home;
