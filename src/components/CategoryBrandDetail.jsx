import React from 'react';
import { useParams } from 'react-router';
import { useUnifiedData } from '../hooks/useUnifiedData';
import SneaakerCard from './SneaakerCard';

const CategoryBrandDetail = () => {
  const { category, brand } = useParams();
  const { data, loading, error } = useUnifiedData();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const categoryData = data?.[category];
  const brandSneakers = categoryData?.[brand] || [];

  return (
    <div style={{ padding: '40px' }}>
      <h2>Tenis {brand} de {category}</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
        {brandSneakers.map((s) => (
          <SneaakerCard key={s.id} sneaker={s} />
        ))}
      </div>
      {brandSneakers.length === 0 && <p>No hay sneakers disponibles para esta categoría y marca.</p>}
    </div>
  );
};

export default CategoryBrandDetail;