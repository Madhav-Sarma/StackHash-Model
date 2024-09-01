import React from 'react';
import './Footer.css';
import { FaPhoneAlt, FaWhatsapp, FaEnvelope } from 'react-icons/fa'; // Importing icons

function Footer() {
  return (
    <footer className="footer text-white mt-5 pt-4 text-center">
      <p>CineSphere &copy; {new Date().getFullYear()}. All rights reserved.</p>
      <div className="footer-contact">
        <p>Need Help? Reach out to our support:</p>
        <div className="contact-item">
          <FaPhoneAlt className="contact-icon" />
          <a href="tel:+1234567890" className="text-white">
            Call Us: +1 234 567 890
          </a>
        </div>
        <div className="contact-item">
          <FaWhatsapp className="contact-icon" />
          <a href="https://wa.me/1234567890" className="text-white" target="_blank" rel="noopener noreferrer">
            WhatsApp Us: +1 234 567 890
          </a>
        </div>
        <div className="contact-item">
          <FaEnvelope className="contact-icon" />
          <a href="mailto:support@cinesphere.com" className="text-white">
            Email Us: support@cinesphere.com
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
