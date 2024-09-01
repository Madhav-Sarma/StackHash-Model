import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

function Home() {
  const [movies, setMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loopedMovies, setLoopedMovies] = useState([]);
  const wiperTrackRef = useRef(null);
  const cardWidthRef = useRef(0);

  // Fetch movies data
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get('https://cinespher.onrender.com/api/movies');
        // Filter to only include released and upcoming movies
        const releasedMovies = res.data.filter(movie => movie.released === '1');
        const upcomingMovies = res.data.filter(movie => movie.released === '0');
        setMovies(releasedMovies);
        setUpcomingMovies(upcomingMovies);

        // Duplicate movies for looped effect
        const duplicatedMovies = [...releasedMovies, ...releasedMovies];
        setLoopedMovies(duplicatedMovies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  // Handle slide movement
  useEffect(() => {
    const wiperTrack = wiperTrackRef.current;

    if (loopedMovies.length > 0 && wiperTrack) {
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
  }, [activeIndex, loopedMovies]);

  // Auto-slide every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => {
        // Move to the next slide
        const nextIndex = prevIndex + 1;
        // Loop back to start if at the end of the duplicated list
        return nextIndex >= loopedMovies.length ? 0 : nextIndex;
      });
    }, 15000);

    return () => clearInterval(interval);
  }, [loopedMovies.length]);

  // Handle next button click
  const handleNextClick = () => {
    setActiveIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex >= loopedMovies.length ? 0 : nextIndex;
    });
  };

  // Handle previous button click
  const handlePrevClick = () => {
    setActiveIndex((prevIndex) => {
      const prevIndexAdjusted = prevIndex - 1;
      return prevIndexAdjusted < 0 ? loopedMovies.length - 1 : prevIndexAdjusted;
    });
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
            {loopedMovies.map((movie, index) => (
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
        {activeIndex < loopedMovies.length - 1 && (
          <button className="wiper-button wiper-button__right" onClick={handleNextClick}>
            <img src="https://www.iconpacks.net/icons/2/free-icon-arrow-right-3098.png" alt="right" />
          </button>
        )}
      </div>

      <div className="upcoming-movies">
        <h2>Upcoming Movies</h2>
        <div className="upcoming-movies-grid">
          {upcomingMovies.map((movie, index) => (
            <Link to={`/movies/${movie.name}`} key={index} className="upcoming-movie-card">
              <img
                src={movie.image}
                alt={movie.name}
                className="upcoming-movie-image"
              />
              <div className="movie-content">
                <h5 className="upcoming-movie-title">{movie.name}</h5>
                <p>{movie.releaseDate}</p>
                <p>{movie.genre}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
