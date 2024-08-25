import React, { useState } from 'react';
import './Seats.css'; // Ensure you have this CSS file

function Seats() {
  const rows = 5;
  const columns = 8;
  const [selectedSeats, setSelectedSeats] = useState(new Set());

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
        onClick={() => console.log(Array.from(selectedSeats))}
      >
        Confirm Selection
      </button>
    </div>
  );
}

export default Seats;
