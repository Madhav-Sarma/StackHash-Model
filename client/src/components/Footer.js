import React from 'react'
import './Footer.css'

function Footer() {
  return (
      <footer className="text-white mt-5 pt-4 text-center">
      <p>CineSphere &copy; {new Date().getFullYear()}. All rights reserved.</p>
    </footer>
  )
}

export default Footer;