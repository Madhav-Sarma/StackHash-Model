import React, { useEffect, useState } from "react";
import axios from "axios";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get("/api/bookings")
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the bookings!", error);
      });
  }, []);

  return (
    <div>
      <h2>Your Bookings</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking._id}>
            {booking.movie.title} - {booking.showtime}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bookings;
