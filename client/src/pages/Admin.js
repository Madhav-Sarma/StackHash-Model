import React, { useEffect, useState } from "react";
import axios from "axios";

const Admin = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("/api/movies")
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the movies!", error);
      });
  }, []);

  const deleteMovie = (id) => {
    axios
      .delete(`/api/movies/${id}`)
      .then(() => {
        setMovies(movies.filter((movie) => movie._id !== id));
      })
      .catch((error) => {
        console.error("There was an error deleting the movie!", error);
      });
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie._id}>
            {movie.title} - {movie.genre}
            <button onClick={() => deleteMovie(movie._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
 