import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Theatres.css'; // Import CSS for styling

function Theatres() {
  const [theatres, setTheatres] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTheatres = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/theatres');
        setTheatres(res.data);
      } catch (error) {
        console.error('Error fetching theatres:', error);
        setError('Unable to load theatres from the API.');
      }
    };

    fetchTheatres();
  }, []);

  return (
    <div className="container">
      <h2 className="mt-4">Available Theatres</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="theatres-list">
        {theatres.length > 0 ? (
          theatres.map(theatre => (
            <div className="theatre-item" key={theatre._id}> {/* Use a unique identifier */}
              <h5>{theatre.name}</h5>
              <Link to={`/showtimes/${theatre._id}`} className="btn btn-primary">
                View Show Times
              </Link>
            </div>
          ))
        ) : (
          <p>No theatres available</p>
        )}
      </div>
    </div>
  );
}

export default Theatres;
