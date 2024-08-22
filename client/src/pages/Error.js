import React from 'react';
import { Link } from 'react-router-dom';

function Error() {
  return (
    <div className="container mt-5">
      <h1 className="display-4">404 - Not Found</h1>
      <p className="lead">The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-primary">Go back to Home</Link>
    </div>
  );
}

export default Error;
