import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Showtimes() {
  const { movieId } = useParams();
  const [showtimes, setShowtimes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Replace with your API call to fetch showtimes for the selected movie
    fetch(`https://api.example.com/movie/${movieId}/showtimes`)
      .then(response => response.json())
      .then(data => setShowtimes(data));
  }, [movieId]);

  const handleBooking = (showId, isHouseFull) => {
    if (isHouseFull) {
      alert('Housefull');
    } else {
      navigate(`/reservations?showId=${showId}`);
    }
  };

  return (
    <div>
      <h1>Showtimes</h1>
      <div className="list-group">
        {showtimes.map(show => (
          <button
            className={`list-group-item list-group-item-action ${show.isHouseFull ? 'disabled' : ''}`}
            key={show.id}
            onClick={() => handleBooking(show.id, show.isHouseFull)}
          >
            {show.theatreName} - {show.time} - {show.language} - {show.format}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Showtimes;
