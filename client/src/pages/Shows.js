import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Shows() {
  const { theatreName } = useParams();
  const [showTimes, setShowTimes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShowTimes = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/theatres/${encodeURIComponent(theatreName)}/showtimes`);
        setShowTimes(res.data);
      } catch (error) {
        console.error('Error fetching show times:', error);
        setError('Unable to load show times.');
      }
    };

    fetchShowTimes();
  }, [theatreName]);

  return (
    <div className="container">
      <h2 className="mt-4">Available Show Times for {theatreName}</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <ul>
        {showTimes.length > 0 ? (
          showTimes.map(show => (
            <li key={show._id}>
              {show.time} - {show.movie}
            </li>
          ))
        ) : (
          <p>No show times available</p>
        )}
      </ul>
    </div>
  );
}

export default Shows;
