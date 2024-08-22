import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [showtimes, setShowtimes] = useState([]);

  useEffect(() => {
    // Replace with your API call to fetch movie details and showtimes
    fetch(`https://api.sampleapis.com/movies/action-adventure/${id}`)
      .then(response => response.json())
      .then(data => {
        setMovie(data.movie);
        setShowtimes(data.showtimes);
      });
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{movie.title}</h1>
      <img src={movie.image} alt={movie.title} />
      <p>{movie.description}</p>
      <h3>Showtimes</h3>
      {showtimes.length === 0 ? (
        <p>No showtimes available.</p>
      ) : (
        <div className="list-group">
          {showtimes.map(show => (
            <Link
              to={`/showtimes/${movie.id}`}
              className="list-group-item list-group-item-action"
              key={show.id}
            >
              {show.theatreName} - {show.time} - {show.language} - {show.format}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default MovieDetails;
