import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function MovieDetails() {
  const { name } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // Hook to programmatically navigate

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/movies/${name}`);
        setMovie(res.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setError('Unable to load movie details from the API.');
      }
    };

    fetchMovieDetails();
  }, [name]);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!movie) {
    return <div>Loading...</div>;
  }

  const handleBookNow = () => {
    navigate('/theatres');  // Redirect to Bookings page
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <iframe
            src={`https://www.youtube.com/embed/${movie.trailer}`}
            className="img-fluid"
            style={{ height: '500px', objectFit: 'cover', width: '100%' }}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={movie.name}
          />
        </div>
        <div className="col-md-6">
          <h2>{movie.name}</h2>
          <p><strong>Genre:</strong> {movie.genre}</p>
          <p><strong>Release Date:</strong> {movie.releaseDate}</p>
          <p><strong>Description:</strong> {movie.description}</p>
          <p><strong>Director:</strong> {movie.director}</p>
          <p><strong>Rating:</strong> {movie.rating}/10</p>
          {movie.released === '1' && (  // Check if movie is released
            <button className="btn btn-primary mt-3" onClick={handleBookNow}>
              Book Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;

