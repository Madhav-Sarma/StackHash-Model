import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AdminMovies from "./pages/AdminMovies";
import AdminShowtimes from "./pages/AdminShowtimes";
import AdminReservations from "./pages/AdminReservations";
import AdminUsers from "./pages/AdminUsers";
import AdminTheatres from "./pages/AdminTheatres";
import MovieDetails from "./pages/MovieDetails";
import Theatres from "./pages/Theatres";
import Seats from "./pages/Seats";  // Import the Seats component
import Reservations from "./pages/Reservations";
import Users from "./pages/Users";
import Admin from "./pages/Admin";
import Login from "./components/Login";
import Payment from "./pages/Payment";
import './App.css'; // Import App CSS


function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adminMovies" element={<AdminMovies />} />
          <Route path="/adminShowtimes" element={<AdminShowtimes />} />
          <Route path="/adminReservations" element={<AdminReservations />} />
          <Route path="/adminUsers" element={<AdminUsers />} />
          <Route path="/adminTheatres" element={<AdminTheatres   />} />
          <Route path="/movies/:name" element={<MovieDetails />} />
          <Route path="/theatres" element={<Theatres />} />
          <Route path="/seats/:showId" element={<Seats />} /> {/* Add Seats Route */}
          <Route path="/Payments" element={<Payment/> }/>
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/users" element={<Users />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <Footer />
    </Router>
    
  );
}

export default App;
