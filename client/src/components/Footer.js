import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center">
      <p>MovieBooking &copy; {new Date().getFullYear()}. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
