// PopularSneaakersGallery.jsx
import React from 'react';
import { useSneaakers } from '../../hooks/useSneaakers';
import SneaakersGalleryFrame from '../../components/SneaakersGalleryFrame';
import '../../features/home/PopularSneaakersGallery.css';

const PopularSneaakersGallery = () => {
  const { sneaakers, loading } = useSneaakers();

  return (
    <div className="popular-sneaakers-gallery">
      <h2 style={{ textAlign: 'left' }}>Más vendidos</h2>
      <SneaakersGalleryFrame items={sneaakers} loading={loading} />
    </div>
  );
};

export default PopularSneaakersGallery;
