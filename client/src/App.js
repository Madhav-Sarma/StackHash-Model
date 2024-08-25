import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import Theatres from "./pages/Theatres";
import Showtimes from "./pages/Showtimes";
import Seats from "./pages/Seats";  // Import the Seats component
import Reservations from "./pages/Reservations";
import Users from "./pages/Users";
import Admin from "./pages/Admin";
import Login from "./components/Login";
import Register from "./components/Register";
import './App.css'; // Import App CSS

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:name" element={<MovieDetails />} />
          <Route path="/theatres" element={<Theatres />} />
          <Route path="/showtimes/:movieId" element={<Showtimes />} />
          <Route path="/seats/:showId" element={<Seats />} /> {/* Add Seats Route */}
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/users" element={<Users />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      <Footer />
    </Router>
    
  );
}

export default App;
