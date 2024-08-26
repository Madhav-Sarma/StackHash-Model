import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

function Home() {
  const [movies, setMovies] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const wiperTrackRef = useRef(null);
  const cardWidthRef = useRef(0);

  // Fetch movies data
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/movies');
        setMovies(res.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  // Handle slide movement
  useEffect(() => {
    const wiperTrack = wiperTrackRef.current;

    if (movies.length > 0 && wiperTrack) {
      const wipes = Array.from(wiperTrack.children);
      if (wipes.length > 0) {
        const wipeWidth = wipes[0].getBoundingClientRect().width;
        cardWidthRef.current = wipeWidth;

        const wipeSlide = (index) => {
          wiperTrack.style.transform = `translateX(-${wipeWidth * index}px)`;
        };

        wipeSlide(activeIndex);
      }
    }
  }, [activeIndex, movies]);

  // Auto-slide every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex < movies.length - 1 ? prevIndex + 1 : prevIndex
      );
    }, 15000);

    return () => clearInterval(interval);
  }, [movies.length]);

  // Handle next button click
  const handleNextClick = () => {
    if (activeIndex < movies.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  // Handle previous button click
  const handlePrevClick = () => {
    const cardsVisible = Math.floor(wiperTrackRef.current.clientWidth / cardWidthRef.current);
    if (activeIndex > 0 && activeIndex > (movies.length - cardsVisible - 1)) {
      setActiveIndex(activeIndex - 1);
    }
  };

  return (
    <div className="home-container">
      <div className="wiper">
        {activeIndex > 0 && (
          <button className="wiper-button wiper-button__left" onClick={handlePrevClick}>
            <img src="https://www.iconpacks.net/icons/2/free-arrow-left-icon-3099-thumb.png" alt="left" />
          </button>
        )}
        <div className="wiper-wrapper">
          <ul className="wiper-track" ref={wiperTrackRef}>
            {movies.map((movie, index) => (
              <Link to={`/movies/${movie.name}`} key={index} className="wiper-item-link">
                <li className="wiper-item">
                  <img
                    className="wiper__image"
                    src={movie.image}
                    alt={movie.name}
                  />
                  <div className="movie-content">
                    <h5 className="movie-title">{movie.name}</h5>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
        {activeIndex < movies.length - 1 && (
          <button className="wiper-button wiper-button__right" onClick={handleNextClick}>
            <img src="https://www.iconpacks.net/icons/2/free-icon-arrow-right-3098.png" alt="right" />
          </button>
        )}
      </div>
    </div>
  );
}

export default Home;
