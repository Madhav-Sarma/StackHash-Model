import React, { useState, useEffect } from 'react';
import './Admin.css';

function AdminShowtimes() {
  const [showtimes, setShowtimes] = useState([]);
  const [newShowtime, setNewShowtime] = useState({
    movieName: '',
    theatreId: '',
    startDate: '',
    endDate: '',
    ticketPrice: '',
    timeSlots: [{ startTime: '' }], // Added timeSlots array
  });

  useEffect(() => {
    const fakeShowtimes = [
      {
        id: 1,
        movieName: 'Inception',
        theatreId: 1,
        startDate: '2024-08-01',
        endDate: '2024-08-31',
        ticketPrice: '300',
        timeSlots: [{ startTime: '15:00' }], // Example time slot
      },
    ];

    setShowtimes(fakeShowtimes);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewShowtime((prevShowtime) => ({
      ...prevShowtime,
      [name]: value,
    }));
  };

  const handleTimeSlotChange = (index, e) => {
    const { value } = e.target;
    const updatedTimeSlots = newShowtime.timeSlots.map((slot, i) =>
      i === index ? { ...slot, startTime: value } : slot
    );
    setNewShowtime((prevShowtime) => ({
      ...prevShowtime,
      timeSlots: updatedTimeSlots,
    }));
  };

  const handleAddTimeSlot = () => {
    setNewShowtime((prevShowtime) => ({
      ...prevShowtime,
      timeSlots: [...prevShowtime.timeSlots, { startTime: '' }],
    }));
  };

  const handleAddShowtime = () => {
    const updatedShowtimes = [
      ...showtimes,
      { id: showtimes.length + 1, ...newShowtime },
    ];
    setShowtimes(updatedShowtimes);
    setNewShowtime({
      movieName: '',
      theatreId: '',
      startDate: '',
      endDate: '',
      ticketPrice: '',
      timeSlots: [{ startTime: '' }],
    });
  };

  const handleDeleteShowtime = (id) => {
    const updatedShowtimes = showtimes.filter((showtime) => showtime.id !== id);
    setShowtimes(updatedShowtimes);
  };

  return (
    <div className="admin-container">
      <h2>Manage Showtimes</h2>
      <div className="form-container">
        <h4>Add New Showtime</h4>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="movieName"
            placeholder="Movie Name"
            value={newShowtime.movieName}
            onChange={handleChange}
          />
          <input
            type="text"
            className="form-control mt-2"
            name="theatreId"
            placeholder="Theatre ID"
            value={newShowtime.theatreId}
            onChange={handleChange}
          />
          <input
            type="date"
            className="form-control mt-2"
            name="startDate"
            value={newShowtime.startDate}
            onChange={handleChange}
          />
          <input
            type="date"
            className="form-control mt-2"
            name="endDate"
            value={newShowtime.endDate}
            onChange={handleChange}
          />
          {newShowtime.timeSlots.map((slot, index) => (
            <div className="time-slot-group" key={index}>
              <input
                type="time"
                className="form-control mt-2"
                value={slot.startTime}
                onChange={(e) => handleTimeSlotChange(index, e)}
                placeholder="Show Time Slot"
              />
            </div>
          ))}
          <button className="btn btn-primary mt-2" onClick={handleAddTimeSlot}>
            Add Another Time Slot
          </button>
          <input
            type="text"
            className="form-control mt-2"
            name="ticketPrice"
            placeholder="Ticket Price"
            value={newShowtime.ticketPrice}
            onChange={handleChange}
          />
          <div/>
          <button className="btn btn-success mt-2" onClick={handleAddShowtime}>
            Add Showtime
          </button>
        </div>
      </div>

      <h4>Showtimes List</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Movie Name</th>
            <th>Theatre ID</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Ticket Price</th>
            <th>Time Slots</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {showtimes.map((showtime) => (
            <tr key={showtime.id}>
              <td>{showtime.movieName}</td>
              <td>{showtime.theatreId}</td>
              <td>{showtime.startDate}</td>
              <td>{showtime.endDate}</td>
              <td>{showtime.ticketPrice}</td>
              <td>
                {showtime.timeSlots.map((slot, index) => (
                  <div key={index}>{slot.startTime}</div>
                ))}
              </td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDeleteShowtime(showtime.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminShowtimes;
