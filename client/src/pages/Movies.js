import React, { useEffect, useState } from "react";
import axios from "axios";

const Movies = () => {
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

  return (
    <div>
      <h2>Now Showing</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie._id}>
            {movie.title} - {movie.genre}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;
