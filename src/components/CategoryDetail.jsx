import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { useUnifiedData } from '../hooks/useUnifiedData';
import SneaakerCard from './SneaakerCard';

const CategoryDetail = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useUnifiedData();

  const handleBuy = () => {
    navigate('/compra');
  };

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
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Tenis de {category}</h2>
        <button onClick={handleBuy} style={{ backgroundColor: 'black', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer', marginLeft: '20px' }}>
          Comprar
        </button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center' }}>
        {allSneakers.map((s) => (
          <SneaakerCard key={s.id} sneaker={s} />
        ))}
      </div>
      {allSneakers.length === 0 && <p>No hay sneakers disponibles para esta categoría.</p>}
    </div>
  );
};

export default CategoryDetail;