import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";  // Import Navbar component
import Footer from "./components/Footer";  // Import Footer component
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Bookings from "./pages/Bookings";
import Admin from "./pages/Admin";
import Login from "./components/Login";
import Register from "./components/Register";
import MovieDetails from "./pages/MovieDetails";
import './App.css';  // Import App CSS

function App() {
  return (
    <Router>
      <Navbar />  {/* Include Navbar at the top */}
      <div className="container">  {/* Optional: Add a container for better layout control */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/movies/:name" element={<MovieDetails />} />
          <Route path="/register" element={<Register />} />
          {/* Add routes for new pages */}
          <Route path="/theatres" element={<div>Theatres Page</div>} />
          <Route path="/showtimes" element={<div>Showtimes Page</div>} />
          <Route path="/reservations" element={<div>Reservations Page</div>} />
          <Route path="/users" element={<div>Users Page</div>} />
        </Routes>
      </div>
      <Footer />  {/* Include Footer at the bottom */}
    </Router>
  );
}

export default App;
