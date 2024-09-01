import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Seats.css';

function Seats() {
  const { showId } = useParams(); // Get showId from the URL parameters
  const navigate = useNavigate();

  const [theatre, setTheatre] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState(new Set());
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const fetchTheatreData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/theatres');
        const allTheatres = res.data;

        // Find the theatre and showtime that matches the showId
        const foundTheatre = allTheatres.find(theatre =>
          theatre.showtimes.some(show => show._id === showId)
        );

        if (foundTheatre) {
          setTheatre(foundTheatre);
        } else {
          setError('Showtime not found.');
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching theatre data:', error);
        setError('Unable to load theatre data from the API.');
        setLoading(false);
      }
    };

    fetchTheatreData();
  }, [showId]);

  if (loading) return <div>Loading seats...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  const rows = theatre.rows; // Array of number of columns per row

  const seatTypes = {
    standard: 'standard-seat',
    premium: 'premium-seat',
    vip: 'vip-seat'
  };

  const getSeatType = (row) => {
    const rowIndex = rows.indexOf(row);
    if (rowIndex < Math.floor(rows.length * 0.2)) return seatTypes.vip;
    if (rowIndex < Math.floor(rows.length * 0.6)) return seatTypes.premium;
    return seatTypes.standard;
  };

  const toggleSeatSelection = (rowIndex, columnIndex) => {
    const seatId = `${String.fromCharCode(65 + rowIndex)}${columnIndex + 1}`;
    setSelectedSeats(prevState => {
      const newSelectedSeats = new Set(prevState);
      if (newSelectedSeats.has(seatId)) {
        newSelectedSeats.delete(seatId);
      } else {
        newSelectedSeats.add(seatId);
      }
      return newSelectedSeats;
    });
  };

  const confirmSelection = () => {
    setShowConfirmation(true);
  };

  const handleYes = () => {
    navigate('/payments', { state: { seats: Array.from(selectedSeats) } });
  };

  const handleNo = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="seats-container">
      <h1>Select Your Seats</h1>
      <div className="seats-grid">
        {rows.map((numColumns, rowIndex) => (
          <div className="seat-row" key={rowIndex}>
            {[...Array(numColumns)].map((_, colIndex) => (
              <div
                key={colIndex}
                className={`seat ${getSeatType(rows[rowIndex])} ${selectedSeats.has(`${String.fromCharCode(65 + rowIndex)}${colIndex + 1}`) ? 'selected' : ''}`}
                onClick={() => toggleSeatSelection(rowIndex, colIndex)}
                title={`Row ${String.fromCharCode(65 + rowIndex)}, Seat ${colIndex + 1} (${getSeatType(rows[rowIndex]).replace('-seat', '')})`}
              >
                {String.fromCharCode(65 + rowIndex)}{colIndex + 1}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button className="btn btn-primary mt-3" onClick={confirmSelection}>
        Confirm Selection
      </button>

      {showConfirmation && (
        <div className="confirmation-popup">
          <div className="popup-overlay" onClick={handleNo}></div>
          <div className="popup-content">
            <h2>Confirm Your Selection</h2>
            <p>You have selected the following seats:</p>
            <ul>
              {Array.from(selectedSeats).map(seat => (
                <li key={seat}>{seat}</li>
              ))}
            </ul>
            <p>Do you want to proceed to payment?</p>
            <button className="btn btn-success" onClick={handleYes}>Yes</button>
            <button className="btn btn-danger" onClick={handleNo}>No</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Seats;
