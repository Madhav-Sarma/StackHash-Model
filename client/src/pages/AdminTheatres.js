import React, { useState, useEffect } from 'react';
import './Admin.css';

function AdminTheatres() {
  const [theatres, setTheatres] = useState([]);
  const [newTheatre, setNewTheatre] = useState({
    name: '',
    location: '',
    seats: '',
  });

  useEffect(() => {
    const fakeTheatres = [
      {
        id: 1,
        name: 'Theatre 1',
        location: 'Location 1',
        seats: '100',
      },
    ];

    setTheatres(fakeTheatres);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTheatre((prevTheatre) => ({
      ...prevTheatre,
      [name]: value,
    }));
  };

  const handleAddTheatre = () => {
    const updatedTheatres = [...theatres, { id: theatres.length + 1, ...newTheatre }];
    setTheatres(updatedTheatres);
    setNewTheatre({
      name: '',
      location: '',
      seats: '',
    });
  };

  const handleDeleteTheatre = (id) => {
    const updatedTheatres = theatres.filter((theatre) => theatre.id !== id);
    setTheatres(updatedTheatres);
  };

  return (
    <div className="admin-container">
      <h2>Manage Theatres</h2>
      <div className="form-container">
        <h4>Add New Theatre</h4>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Theatre Name"
            value={newTheatre.name}
            onChange={handleChange}
          />
          <input
            type="text"
            className="form-control mt-2"
            name="location"
            placeholder="Location"
            value={newTheatre.location}
            onChange={handleChange}
          />
          <input
            type="text"
            className="form-control mt-2"
            name="seats"
            placeholder="Number of Seats"
            value={newTheatre.seats}
            onChange={handleChange}
          />
          <button className="btn btn-success mt-2" onClick={handleAddTheatre}>
            Add Theatre
          </button>
        </div>
      </div>

      <h4>Theatres List</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Seats</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {theatres.map((theatre) => (
            <tr key={theatre.id}>
              <td>{theatre.name}</td>
              <td>{theatre.location}</td>
              <td>{theatre.seats}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDeleteTheatre(theatre.id)}>
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

export default AdminTheatres;
