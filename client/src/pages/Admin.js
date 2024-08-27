// src/pages/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Admin.css'; // Import a CSS file for styling

function Admin() {
  return (
    <div className="dashboard">
      <div className="dashboard-menu">
        <Link to="/adminMovies" className="dashboard-item">Manage Movies</Link>
        <Link to="/adminShowtimes" className="dashboard-item">Manage Showtimes</Link>
        <Link to="/adminReservations" className="dashboard-item">Manage Reservations</Link>
        <Link to="/adminUsers" className="dashboard-item">Manage Users</Link>
        <Link to="/adminTheatres" className="dashboard-item">Manage Theatres</Link>
      </div>
    </div>
  );
}

export default Admin;

 