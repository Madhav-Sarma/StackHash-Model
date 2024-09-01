// src/pages/AdminUsers.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user', // default role
  });
  const [role, setRole] = useState('user'); // Set logged-in user role
  const [token, setToken] = useState(''); // Store the token

  useEffect(() => {
    // Fetch token and role from local storage or state management
    const storedToken = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    setToken(storedToken);
    setRole(userRole);

    if (storedToken) {
      axios
        .get('http://localhost:5000/api/users', {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => setUsers(response.data))
        .catch((err) => console.error('Error fetching users:', err));
    }
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

    // Prevent admins from assigning roles other than 'user'
    if (role !== 'superadmin' && (newUser.role === 'admin' || newUser.role === 'superadmin')) {
      alert('Only superadmin can assign admin or superadmin roles');
      return;
    }

    // Add or update user via API
    axios
      .post(
        'http://localhost:5000/api/users',
        newUser,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setUsers([...users, response.data]);
        setNewUser({
          username: '',
          email: '',
          password: '',
          role: 'user',
        });
      })
      .catch((err) => console.error('Error adding user:', err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setUsers(users.filter((u) => u.id !== id));
      })
      .catch((err) => console.error('Error deleting user:', err));
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

          {/* Only display role selection if logged in as superadmin */}
          {role === 'superadmin' && (
            <select
              name="role"
              value={newUser.role}
              onChange={handleChange}
              className="form-control mt-2"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="superadmin">Superadmin</option>
            </select>
          )}

          <button type="submit" className="btn btn-success mt-2">
            Add/Update User
          </button>
        </form>
      </div>

      <h4>Users List</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email Address</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(user._id)}
                >
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
