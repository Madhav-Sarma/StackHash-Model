// src/pages/UsersPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    // Fetch users from the API
    axios.get('/api/users').then(response => setUsers(response.data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add or update user via API
    axios.post('/api/users', newUser).then(response => {
      setUsers([...users, response.data]);
      setNewUser({
        username: '',
        email: '',
        password: '',
      });
    });
  };

  const handleDelete = (id) => {
    axios.delete(`/api/users/${id}`).then(() => {
      setUsers(users.filter(u => u.id !== id));
    });
  };

  return (
    <div className="admin-container">
      <h2>Manage Users</h2>
      <div className="form-container">
        <h4>Add New User</h4>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            value={newUser.username}
            onChange={handleChange}
            placeholder="Username"
            required
            className="form-control mt-2"
          />
          <input
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
            className="form-control mt-2"
          />
          <input
            type="password"
            name="password"
            value={newUser.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="form-control mt-2"
          />
          <button type="submit" className="btn btn-success mt-2">Add/Update User</button>
        </form>
      </div>

      <h4>Users List</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>
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

export default AdminUsers;
