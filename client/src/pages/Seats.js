import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Seats.css';

function Seats() {
  const rows = 5;
  const columns = 8;
  const [selectedSeats, setSelectedSeats] = useState(new Set());
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const seatTypes = {
    standard: 'standard-seat',
    premium: 'premium-seat',
    vip: 'vip-seat'
  };

  const getSeatType = (row) => {
    if (row < 2) return seatTypes.vip;
    if (row < 4) return seatTypes.premium;
    return seatTypes.standard;
  };

  const toggleSeatSelection = (row, column) => {
    const seatId = `${String.fromCharCode(65 + row)}${column + 1}`;
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
        {[...Array(rows)].map((_, rowIndex) => (
          <div className="seat-row" key={rowIndex}>
            {[...Array(columns)].map((_, colIndex) => (
              <div
                key={colIndex}
                className={`seat ${getSeatType(rowIndex)} ${selectedSeats.has(`${String.fromCharCode(65 + rowIndex)}${colIndex + 1}`) ? 'selected' : ''}`}
                onClick={() => toggleSeatSelection(rowIndex, colIndex)}
                title={`Row ${String.fromCharCode(65 + rowIndex)}, Seat ${colIndex + 1} (${getSeatType(rowIndex).replace('-seat', '')})`}
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
