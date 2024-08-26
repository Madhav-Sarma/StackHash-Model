import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FaFilm, FaTheaterMasks, FaClock, FaTicketAlt, FaUser } from 'react-icons/fa';
import logo from './images/logo.png'; // Import the logo image

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Logo" width='250px' className="navbar-logo" /> {/* Add the logo here */}
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/movies">
                <FaFilm className="icon" /> Movies
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/theatres">
                <FaTheaterMasks className="icon" /> Theatres
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/showtimes">
                <FaClock className="icon" /> Showtimes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/reservations">
                <FaTicketAlt className="icon" /> Reservations
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/users">
                <FaUser className="icon" /> Users
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

