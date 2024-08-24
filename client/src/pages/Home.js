import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';  // Import axios

function Home() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/movies');  // Axios GET request
        setMovies(res.data);  // Set the movies state with the data
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError('Unable to load movies from the API.');
      }
    };

    fetchMovies();  // Call the function to fetch movies
  }, []);  // Empty dependency array to run once on mount

  return (
    <div className="row">
      {error && <div className="alert alert-danger">{error}</div>}
      {movies.length > 0 ? (
        movies.map(movie => (
          <div className="col-md-4" key={movie.name}> {/* Use movie.name as key */}
            <div className="card mb-4 shadow-sm">
              <img
                src={movie.image}
                className="card-img-top"
                alt={movie.name}
                style={{ height: '300px', objectFit: 'cover' }}  // Ensures consistent image size
              />
              <div className="card-body">
                <h5 className="card-title">{movie.name}</h5>
                <Link to={`/movies/${(movie.name)}`} className="btn btn-primary">
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
