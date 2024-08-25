import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Showtimes.css'; // Ensure you have this CSS file

function Showtimes() {
  const { movieId } = useParams(); // Get movieId from URL
  const [showtimes, setShowtimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShowtimes = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/shows?movieId=${movieId}`);
        setShowtimes(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching showtimes:', err);
        setError('Failed to fetch showtimes. Please try again later.');
        setLoading(false);
      }
    };

    fetchShowtimes();
  }, [movieId]);

  const handleBooking = (showId, isHouseFull) => {
    if (isHouseFull) {
      alert('Housefull');
    } else {
      navigate(`/seats/${showId}`); // Navigate to Seats page with showId
    }
  };

  if (loading) return <div>Loading showtimes...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <h1>Showtimes</h1>
      <div className="list-group">
        {showtimes.length > 0 ? (
          showtimes.map(show => (
            <button
              className={`list-group-item list-group-item-action ${show.isHouseFull ? 'disabled' : ''}`}
              key={show._id}
              onClick={() => handleBooking(show._id, show.isHouseFull)}
            >
              {show.theatreName} - {show.time} - {show.language} - {show.format}
            </button>
          ))
        ) : (
          <div className="alert alert-info">No showtimes available for this movie</div>
        )}
      </div>
    </div>
  );
}

export default Showtimes;
