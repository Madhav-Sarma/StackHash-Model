import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Theatres.css';

function Theatres() {
  const [theatres, setTheatres] = useState([]);

  useEffect(() => {
    // Fake API call to fetch theatres data
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setTheatres(response.data.slice(0, 5)); // Limiting to 5 theatres for example
      })
      .catch(error => console.error('Error fetching the theatres:', error));
  }, []);

  return (
    <div className="theatres-container">
      <h1 className="title">Select a Theatre</h1>
      <div className="theatre-list">
        {theatres.map(theatre => (
          <div className="theatre" key={theatre.id}>
            <h2>{theatre.company.name}</h2>
            <p>{theatre.company.catchPhrase} | M-Ticket | Food & Beverage</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Theatres;
