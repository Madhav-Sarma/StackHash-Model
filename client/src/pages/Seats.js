import React, { useState } from 'react';
import './Seats.css'; // Ensure you have this CSS file

function Seats() {
  const rows = 5;
  const columns = 8;
  const [selectedSeats, setSelectedSeats] = useState(new Set());
  const [showConfirmation, setShowConfirmation] = useState(false);

  const toggleSeatSelection = (row, column) => {
    const seatId = `${row}-${column}`;
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
    window.location.href = 'https://razorpay.me/@cineSphere?amount=zgioswZa9n4qt5x9yD7i%2BQ%3D%3D';
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
                className={`seat ${selectedSeats.has(`${rowIndex}-${colIndex}`) ? 'selected' : ''}`}
                onClick={() => toggleSeatSelection(rowIndex, colIndex)}
              >
                {String.fromCharCode(65 + rowIndex)}{colIndex + 1}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button
        className="btn btn-primary mt-3"
        onClick={confirmSelection}
      >
        Confirm Selection
      </button>

      {showConfirmation && (
        <div className="confirmation-popup">
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
