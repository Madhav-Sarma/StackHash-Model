import React, { useState, useEffect } from 'react';
import './Admin.css';

function AdminTheatres() {
  const [theatres, setTheatres] = useState([]);
  const [newTheatre, setNewTheatre] = useState({
    theatreId: '',
    name: '',
    numberOfRows: '',
    numberOfColumns: '',
  });

  useEffect(() => {
    const fakeTheatres = [
      {
        id: 1,
        theatreId: 'T001',
        name: 'Theatre 1',
        numberOfRows: '10',
        numberOfColumns: '20',
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
      theatreId: '',
      name: '',
      numberOfRows: '',
      numberOfColumns: '',
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
            name="theatreId"
            placeholder="Theatre ID"
            value={newTheatre.theatreId}
            onChange={handleChange}
          />
          <input
            type="text"
            className="form-control mt-2"
            name="name"
            placeholder="Theatre Name"
            value={newTheatre.name}
            onChange={handleChange}
          />
          <input
            type="number"
            className="form-control mt-2"
            name="numberOfRows"
            placeholder="Number of Rows"
            value={newTheatre.numberOfRows}
            onChange={handleChange}
          />
          <input
            type="number"
            className="form-control mt-2"
            name="numberOfColumns"
            placeholder="Number of Columns"
            value={newTheatre.numberOfColumns}
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
            <th>Theatre ID</th>
            <th>Name</th>
            <th>Number of Rows</th>
            <th>Number of Columns</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {theatres.map((theatre) => (
            <tr key={theatre.id}>
              <td>{theatre.theatreId}</td>
              <td>{theatre.name}</td>
              <td>{theatre.numberOfRows}</td>
              <td>{theatre.numberOfColumns}</td>
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
