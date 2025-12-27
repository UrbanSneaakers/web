import React from 'react';
import { useParams } from 'react-router';
import { useUnifiedData } from '../hooks/useUnifiedData';
import SneaakerCard from './SneaakerCard';

const CategoryDetail = () => {
  const { category } = useParams();
  const { data, loading, error } = useUnifiedData();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const categoryData = data?.[category];
  const allSneakers = [];
  if (categoryData) {
    Object.values(categoryData).forEach(brandArray => {
      if (Array.isArray(brandArray)) {
        allSneakers.push(...brandArray);
      }
    });
  }

  return (
    <div style={{ padding: '40px' }}>
      <h2>Tenis de {category}</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
        {allSneakers.map((s) => (
          <SneaakerCard key={s.id} sneaker={s} />
        ))}
      </div>
      {allSneakers.length === 0 && <p>No hay sneakers disponibles para esta categoría.</p>}
    </div>
  );
};

export default CategoryDetail;