import React, { useRef } from 'react';
import SneaakersPerspectiveScroll from './SneaakersPerspectiveScroll';
import Chevron from './Chevron';
import '../styles/SneaakersGalleryFrame.css';

/**
 * Componente que renderiza una galería horizontal con efecto de perspectiva e íconos de navegación.
 *
 * @param {Object} props
 * @param {Array} props.items - Lista de tenis u objetos visuales
 * @param {boolean} props.loading - Indica si se están cargando los datos
 * @returns {JSX.Element}
 */
const SneaakersGalleryFrame = ({ items = [], loading = false }) => {
  const scrollRef = useRef(null);
  const itemWidth = 428;

  const scrollBy = (dir) => {
    scrollRef.current?.scrollBy({
      left: dir * itemWidth,
      behavior: 'smooth',
    });
  };

  return (
    <div className="gallery-frame-wrapper">
      <Chevron direction="left" onClick={() => scrollBy(-1)} />
      <div className="gallery-scroll-container">
        <SneaakersPerspectiveScroll ref={scrollRef} items={items} loading={loading} />
      </div>
      <Chevron direction="right" onClick={() => scrollBy(1)} />
    </div>
  );
};

export default SneaakersGalleryFrame;
