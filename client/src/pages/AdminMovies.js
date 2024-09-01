// src/pages/AdminMovies.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css'; // Import the CSS file for styling

function AdminMovies() {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({
    name: '',
    genre: '',
    releaseDate: '',
    description: '',
    director: '',
    rating: '',
    imageLink: ''
  });

  useEffect(() => {
    // Fetch movies from the API
    axios.get('http://localhost:5000/api/movies')
      .then(response => setMovies(response.data))
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add or update movie via API
    axios.post('http://localhost:5000/api/movies', newMovie)
      .then(response => {
        setMovies([...movies, response.data]);
        setNewMovie({
          name: '',
          genre: '',
          releaseDate: '',
          description: '',
          director: '',
          rating: '',
          imageLink: ''
        });
      })
      .catch(error => console.error('Error adding/updating movie:', error));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/movies/${id}`)
      .then(() => {
        setMovies(movies.filter(m => m.id !== id));
      })
      .catch(error => console.error('Error deleting movie:', error));
  };

  return (
    <div className="admin-container">
      <h2>Manage Movies</h2>
      <div className="form-container">
        <h4>Add New Movie</h4>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Movie Name"
            value={newMovie.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            className="form-control mt-2"
            name="genre"
            placeholder="Genre"
            value={newMovie.genre}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            className="form-control mt-2"
            name="releaseDate"
            value={newMovie.releaseDate}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            className="form-control mt-2"
            placeholder="Description"
            value={newMovie.description}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            className="form-control mt-2"
            name="director"
            placeholder="Director"
            value={newMovie.director}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            className="form-control mt-2"
            name="rating"
            placeholder="Rating"
            value={newMovie.rating}
            onChange={handleChange}
            step="0.1"
            min="0"
            max="10"
            required
          />
          <input
            type="text"
            className="form-control mt-2"
            name="imageLink"
            placeholder="Image URL"
            value={newMovie.imageLink}
            onChange={handleChange}
            required
          />
          <button className="btn btn-success mt-2" onClick={handleSubmit}>
            Add/Update Movie
          </button>
        </div>
      </div>

      <h4>Movies List</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Movie Name</th>
            <th>Genre</th>
            <th>Release Date</th>
            <th>Description</th>
            <th>Director</th>
            <th>Rating</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
  {movies.map((movie, index) => (
    <tr key={movie.id || index}>{/* Use index as a fallback key if id is missing */}
      <td>{movie.name}</td>
      <td>{movie.genre}</td>
      <td>{new Date(movie.releaseDate).toLocaleDateString()}</td>
      <td>{movie.description}</td>
      <td>{movie.director}</td>
      <td>{movie.rating}</td>
      <td>
        <img src={movie.imageLink} alt={movie.name} className="movie-image" />
      </td>
      <td>
        <button className="btn btn-danger" onClick={() => handleDelete(movie.id)}>
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

export default AdminMovies;
