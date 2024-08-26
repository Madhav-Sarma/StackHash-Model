import React, { useState, useEffect } from 'react';
import './Admin.css';

function AdminReservations() {
  const [reservations, setReservations] = useState([]);
  const [newReservation, setNewReservation] = useState({
    movieName: '',
    theatreId: '',
    date: '',
    startAt: '',
    seats: '',
    ticketPrice: '',
    total: '',
    name: '',
    phone: '',
  });

  useEffect(() => {
    const fakeReservations = [
      {
        id: 1,
        movieName: 'Inception',
        theatreId: 1,
        date: '2024-08-10',
        startAt: '18:00',
        seats: 'A1,A2',
        ticketPrice: '300',
        total: '600',
        name: 'John Doe',
        phone: '1234567890',
      },
    ];

    setReservations(fakeReservations);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReservation((prevReservation) => ({
      ...prevReservation,
      [name]: value,
    }));
  };

  const handleAddReservation = () => {
    const updatedReservations = [...reservations, { id: reservations.length + 1, ...newReservation }];
    setReservations(updatedReservations);
    setNewReservation({
      movieName: '',
      theatreId: '',
      date: '',
      startAt: '',
      seats: '',
      ticketPrice: '',
      total: '',
      name: '',
      phone: '',
    });
  };

  const handleDeleteReservation = (id) => {
    const updatedReservations = reservations.filter((reservation) => reservation.id !== id);
    setReservations(updatedReservations);
  };

  return (
    <div className="admin-container">
      <h2>Manage Reservations</h2>
      <div className="form-container">
        <h4>Add New Reservation</h4>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="movieName"
            placeholder="Movie Name"
            value={newReservation.movieName}
            onChange={handleChange}
          />
          <input
            type="text"
            className="form-control mt-2"
            name="theatreId"
            placeholder="Theatre ID"
            value={newReservation.theatreId}
            onChange={handleChange}
          />
          <input
            type="date"
            className="form-control mt-2"
            name="date"
            value={newReservation.date}
            onChange={handleChange}
          />
          <input
            type="time"
            className="form-control mt-2"
            name="startAt"
            value={newReservation.startAt}
            onChange={handleChange}
          />
          <input
            type="text"
            className="form-control mt-2"
            name="seats"
            placeholder="Seats"
            value={newReservation.seats}
            onChange={handleChange}
          />
          <input
            type="text"
            className="form-control mt-2"
            name="ticketPrice"
            placeholder="Ticket Price"
            value={newReservation.ticketPrice}
            onChange={handleChange}
          />
          <input
            type="text"
            className="form-control mt-2"
            name="total"
            placeholder="Total Price"
            value={newReservation.total}
            onChange={handleChange}
          />
          <input
            type="text"
            className="form-control mt-2"
            name="name"
            placeholder="Customer Name"
            value={newReservation.name}
            onChange={handleChange}
          />
          <input
            type="text"
            className="form-control mt-2"
            name="phone"
            placeholder="Phone"
            value={newReservation.phone}
            onChange={handleChange}
          />
          <button className="btn btn-success mt-2" onClick={handleAddReservation}>
            Add Reservation
          </button>
        </div>
      </div>

      <h4>Reservations List</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Movie Name</th>
            <th>Theatre ID</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>Seats</th>
            <th>Total Price</th>
            <th>Customer Name</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td>{reservation.movieName}</td>
              <td>{reservation.theatreId}</td>
              <td>{reservation.date}</td>
              <td>{reservation.startAt}</td>
              <td>{reservation.seats}</td>
              <td>{reservation.total}</td>
              <td>{reservation.name}</td>
              <td>{reservation.phone}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDeleteReservation(reservation.id)}>
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

export default AdminReservations;
