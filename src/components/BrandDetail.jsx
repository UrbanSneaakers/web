import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { useUnifiedData } from '../hooks/useUnifiedData';
import SneaakerCard from './SneaakerCard';

const BrandDetail = () => {
  const { brand } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useUnifiedData();

  const handleBuy = () => {
    navigate('/compra');
  };

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
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Tenis de {brand}</h2>
        <button onClick={handleBuy} style={{ backgroundColor: 'black', color: 'white', padding: '10px 20px', border: 'none', cursor: 'pointer', marginLeft: '20px' }}>
          Comprar
        </button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center' }}>
        {brandSneakers.map((s) => (
          <SneaakerCard key={s.id} sneaker={s} />
        ))}
      </div>
      {brandSneakers.length === 0 && <p>No hay sneakers disponibles para esta marca.</p>}
    </div>
  );
};

export default BrandDetail;