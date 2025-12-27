import React from 'react';
import { useParams } from 'react-router';
import { useUnifiedData } from '../hooks/useUnifiedData';
import SneaakerCard from './SneaakerCard';

const BrandDetail = () => {
  const { brand } = useParams();
  const { data, loading, error } = useUnifiedData();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const brandSneakers = [];
  if (data) {
    Object.values(data).forEach(category => {
      Object.values(category).forEach(brandArray => {
        if (Array.isArray(brandArray)) {
          brandArray.forEach(sneaker => {
            if (sneaker.brand.toLowerCase() === brand.toLowerCase()) {
              brandSneakers.push(sneaker);
            }
          });
        }
      });
    });
  }

  return (
    <div style={{ padding: '40px' }}>
      <h2>Tenis de {brand}</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
        {brandSneakers.map((s) => (
          <SneaakerCard key={s.id} sneaker={s} />
        ))}
      </div>
      {brandSneakers.length === 0 && <p>No hay sneakers disponibles para esta marca.</p>}
    </div>
  );
};

export default BrandDetail;