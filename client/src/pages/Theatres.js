import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Theatres.css'; // Import CSS for styling

function Theatres() {
  const [theatres, setTheatres] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTheatres = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/theatres');
        setTheatres(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching theatres:', error);
        setError('Unable to load theatres from the API.');
        setLoading(false);
      }
    };

    fetchTheatres();
  }, []);

  const handleBooking = (showId, isHouseFull) => {
    if (isHouseFull) {
      alert('Housefull');
    } else {
      navigate(`/seats/${showId}`); // Navigate to Seats page with showId
    }
  };

  if (loading) return <div>Loading theatres...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container">
      <h2 className="mt-4">Available Theatres & Showtimes</h2>
      <div className="theatres-list">
        {theatres.length > 0 ? (
          theatres.map(theatre => (
            <div className="theatre-item" key={theatre._id}>
              <h5>{theatre.name}</h5>
              <div className="showtimes">
                {theatre.showtimes && theatre.showtimes.length > 0 ? (
                  theatre.showtimes.map(show => (
                    <button
                      className={`showtime-btn ${show.isHouseFull ? 'disabled' : ''}`}
                      key={show._id}
                      onClick={() => handleBooking(show._id, show.isHouseFull)}
                    >
                      {show.time} - {show.language} - {show.format}
                    </button>
                  ))
                ) : (
                  <div className="alert alert-info">No showtimes available</div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No theatres available</p>
        )}
      </div>
    </div>
  );
}

export default Theatres;
