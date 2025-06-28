// SneaakersGalleryFrame.jsx
import React from 'react';
import Chevron from './Chevron';
import SneaakersPerspectiveScroll from './SneaakersPerspectiveScroll';
import '../styles/SneaakersGalleryFrame.css';
import '../styles/Chevron.css';

const SneaakersGalleryFrame = () => {
  const scrollRef = React.useRef(null);
  const itemWidth = 428; // 420 + 8 gap

  const scrollBy = (direction) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction * itemWidth,
      behavior: 'smooth',
    });
  };

  return (
    <div className="gallery-frame-wrapper">
      <Chevron direction="left" onClick={() => scrollBy(-1)} />
      <div className="gallery-scroll-container">
        <SneaakersPerspectiveScroll ref={scrollRef} />
      </div>
      <Chevron direction="right" onClick={() => scrollBy(1)} />
    </div>
  );
};

export default SneaakersGalleryFrame;
