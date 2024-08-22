import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminMovies() {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({
    title: '',
    genre: '',
    image: '',
    language: '',
    director: '',
    trailer: '',
    description: '',
    duration: '',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    // Fake API data
    const fakeMovies = [
      {
        id: 1,
        title: 'Inception',
        genre: 'Sci-Fi',
        image: 'https://m.media-amazon.com/images/I/51v5ZpFyaFL._AC_SY445_.jpg',
        language: 'English',
        director: 'Christopher Nolan',
        trailer: 'https://www.youtube.com/watch?v=YoHD9XEInc0',
        description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.',
        duration: '148 min',
        startDate: '2024-08-01',
        endDate: '2024-08-31',
      },
      // Add more movies here
    ];

    // Simulate API call
    setMovies(fakeMovies);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const handleAddMovie = () => {
    const updatedMovies = [...movies, { id: movies.length + 1, ...newMovie }];
    setMovies(updatedMovies);
    setNewMovie({
      title: '',
      genre: '',
      image: '',
      language: '',
      director: '',
      trailer: '',
      description: '',
      duration: '',
      startDate: '',
      endDate: '',
    });
  };

  const handleDeleteMovie = (id) => {
    const updatedMovies = movies.filter((movie) => movie.id !== id);
    setMovies(updatedMovies);
  };

  return (
    <div>
      <h2>Manage Movies</h2>
      <div className="mb-4">
        <h4>Add New Movie</h4>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="title"
            placeholder="Title"
            value={newMovie.title}
            onChange={handleChange}
          />
          <input
            type="text"
            className="form-control mt-2"
            name="genre"
            placeholder="Genre"
            value={newMovie.genre}
            onChange={handleChange}
          />
          <input
            type="text"
            className="form-control mt-2"
            name="image"
            placeholder="Image URL"
            value={newMovie.image}
            onChange={handleChange}
          />
          <input
            type="text"
            className="form-control mt-2"
            name="language"
            placeholder="Language"
            value={newMovie.language}
            onChange={handleChange}
          />
          <input
            type="text"
            className="form-control mt-2"
            name="director"
            placeholder="Director"
            value={newMovie.director}
            onChange={handleChange}
          />
          <input
            type="text"
            className="form-control mt-2"
            name="trailer"
            placeholder="Trailer URL"
            value={newMovie.trailer}
            onChange={handleChange}
          />
          <textarea
            className="form-control mt-2"
            name="description"
            placeholder="Description"
            value={newMovie.description}
            onChange={handleChange}
          ></textarea>
          <input
            type="text"
            className="form-control mt-2"
            name="duration"
            placeholder="Duration"
            value={newMovie.duration}
            onChange={handleChange}
          />
          <input
            type="date"
            className="form-control mt-2"
            name="startDate"
            placeholder="Start Date"
            value={newMovie.startDate}
            onChange={handleChange}
          />
          <input
            type="date"
            className="form-control mt-2"
            name="endDate"
            placeholder="End Date"
            value={newMovie.endDate}
            onChange={handleChange}
          />
          <button className="btn btn-success mt-2" onClick={handleAddMovie}>
            Add Movie
          </button>
        </div>
      </div>

      <h4>Movies List</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Language</th>
            <th>Director</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.title}</td>
              <td>{movie.genre}</td>
              <td>{movie.language}</td>
              <td>{movie.director}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDeleteMovie(movie.id)}>
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
