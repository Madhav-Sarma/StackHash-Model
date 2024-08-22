import React, { useState, useEffect } from 'react';
import './Admin.css';

function AdminShowtimes() {
  const [showtimes, setShowtimes] = useState([]);
  const [newShowtime, setNewShowtime] = useState({
    movieId: '',
    theatreId: '',
    startDate: '',
    endDate: '',
    ticketPrice: '',
  });

  useEffect(() => {
    const fakeShowtimes = [
      {
        id: 1,
        movieId: 1,
        theatreId: 1,
        startDate: '2024-08-01',
        endDate: '2024-08-31',
        ticketPrice: '300',
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

  const handleAddShowtime = () => {
    const updatedShowtimes = [...showtimes, { id: showtimes.length + 1, ...newShowtime }];
    setShowtimes(updatedShowtimes);
    setNewShowtime({
      movieId: '',
      theatreId: '',
      startDate: '',
      endDate: '',
      ticketPrice: '',
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
            name="movieId"
            placeholder="Movie ID"
            value={newShowtime.movieId}
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
          <input
            type="text"
            className="form-control mt-2"
            name="ticketPrice"
            placeholder="Ticket Price"
            value={newShowtime.ticketPrice}
            onChange={handleChange}
          />
          <button className="btn btn-success mt-2" onClick={handleAddShowtime}>
            Add Showtime
          </button>
        </div>
      </div>

      <h4>Showtimes List</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Movie ID</th>
            <th>Theatre ID</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Ticket Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {showtimes.map((showtime) => (
            <tr key={showtime.id}>
              <td>{showtime.movieId}</td>
              <td>{showtime.theatreId}</td>
              <td>{showtime.startDate}</td>
              <td>{showtime.endDate}</td>
              <td>{showtime.ticketPrice}</td>
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
