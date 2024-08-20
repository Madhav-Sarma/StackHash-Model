import React, { useState, useEffect, useRef } from 'react';

 function Home(){
    const imageUrls = [
        "https://preview.redd.it/kalki-2898-a-d-offical-poster-v0-qd7gl7vni0xc1.jpeg?auto=webp&s=e0e35ae2558735d624aacedf0534da0bdfd23731",
        "https://media5.bollywoodhungama.in/wp-content/uploads/2024/07/Stree-2-2-1-322x381.jpg",
        "https://cdn.marvel.com/content/1x/dp3_1sht_digital_srgb_ka_swords_v5_resized.jpg",
        "https://m.media-amazon.com/images/M/MV5BZDdiMWQyMzYtOTI1ZS00NGYyLWEzYWUtYmRiZDYxNDhlMzM0XkEyXkFqcGc@._V1_.jpg",
        "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OC8xMCAgNDQuNksgVm90ZXM%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00343221-jhvvdffcwz-portrait.jpg",
        "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-NS45LzEwICAzMi40SyBWb3Rlcw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00380150-arzqzdkhjs-portrait.jpg"
      ];
  const [activeIndex, setActiveIndex] = useState(1);
  const wiperTrackRef = useRef(null);

  useEffect(() => {
    const wiperTrack = wiperTrackRef.current;
    const wipes = Array.from(wiperTrack.children);
    const wipeWidth = wipes[0].getBoundingClientRect().width;

    const wipeSlide = (index) => {
      const activeSlide = wiperTrack.querySelector('.active-swipe');
      const nextSlide = wipes[index];
      wiperTrack.style.transform = `translateX(-${(wipeWidth + 24) * (index - 1)}px)`;
      activeSlide.classList.remove('active-swipe');
      activeSlide.style.transform = 'scale(1)';
      nextSlide.classList.add('active-swipe');
      nextSlide.style.transform = 'scale(1.1)';
    };

    wipeSlide(activeIndex);
  }, [activeIndex]);

  const handleNextClick = () => {
    setActiveIndex((prevIndex) => Math.min(prevIndex + 1, 5));
  };

  const handlePrevClick = () => {
    setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  return (
    <div>
      <div style={{ height: '20px' }}></div>

      <div className="wiper">
        <button className="wiper-button wiper-button__right" onClick={handlePrevClick}>
          <img src="https://www.iconpacks.net/icons/2/free-arrow-left-icon-3099-thumb.png" alt="left" />
        </button>
        <div className="wiper-wrapper">
          <ul className="wiper-track" ref={wiperTrackRef}>
            {/* Map each slide item */}
            {imageUrls.map((url, index) => (
  <li key={index} className={`wiper-item ${index === activeIndex ? 'active-swipe' : ''}`}>
    <img
      className="wiper__image"
      src={url}
      alt={`background-image-${index}`}
    />
    <button className="swiper__image-button">Book Now</button>
  </li>
))}
          </ul>
        </div>
        <button className="wiper-button wiper-button__left" onClick={handleNextClick}>
          <img src="https://www.iconpacks.net/icons/2/free-arrow-left-icon-3099-thumb.png" alt="right" />
        </button>
      </div>
      <div style={{ height: '300px' }}></div>

      <style>
        {`
          h1 {
            text-align: center;
            margin: 3rem 0;
          }
          li {
            list-style: none;
          }
          body {
            box-sizing: border-box;
          }
          * {
            margin: 0;
            padding: 0;
          }

          .wiper-track {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            column-gap: 1.5rem;
            margin: 0 auto;
            transition: transform 0.4s ease-in;
            padding: 0 1rem;
          }
          .wiper-item {
            width: 200px;
            height: 300px;
            position: relative;
            transition: scale 0.2s linear;
          }
          .wiper-button img {
            height: 100%;
            width: 100%;
            object-fit: cover;
          }
          .wiper {
            max-width: 960px;
            position: relative;
            margin: 0 auto;
          }
          .active-swipe {
            transform: scale(1.1);
          }
          .wiper-button {
            margin: 0 1rem;
            height: 70px;
            width: 45px;
            position: absolute;
            top: 50%;
            background: transparent;
            border: none;
            transform: translateY(-50%);
            z-index: 1;
          }
          .wiper-button__left {
            right: 0;
            transform: translateY(-50%) rotate(180deg);
          }
              .wiper__image-button {
                right: 50%;
                top: 50%;
                position: absolute;
                padding: 0.8rem 1rem;
                border-radius: 3px;
                background-color: white;
                border: none;
                font-size: 1rem;
                transform: translateY(-50%) translateX(50%);
                cursor: pointer;
              }
          .wiper-wrapper {
            max-width: 660px;
            overflow: hidden;
            padding: 2rem 0.5rem;
            margin: 0 auto;
          }
          .swiper__image-button {
      right: 50%;
      top: 50%;
      position: absolute;
      padding: 0.1rem 0.5rem;
      border-radius: 3px;
      background-color: white;
      border: none;
      font-size: 1rem;
      transform: translateY(-50%) translateX(50%);
      cursor: pointer;
      opacity: 0.7; /* 90% transparency */
      transition: all 0.3s ease; /* Smooth transition for hover effects */
    }

    .swiper__image-button:hover {
      background-color: red; /* Change background color to red */
      color: white; /* Change text color to white */
      transform: translateY(-50%) translateX(50%) scale(1.1); /* Increase button size slightly */
    }
          .wiper__image {
            height: 100%;
            width: 100%;
            object-fit: cover;
            border-radius: 30px;
          }
          .is-hidden {
            display: none;
          }
        `}
      </style>
    </div>
  );
};

export default Home;
