import React from 'react';
import { useParams } from 'react-router';
import { useUnifiedData } from '../hooks/useUnifiedData';

const SneaakerDetail = () => {
  const { id } = useParams();
  const { data, loading, error } = useUnifiedData();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  let sneaker = null;
  if (data) {
    Object.values(data).forEach(category => {
      Object.values(category).forEach(brandArray => {
        if (Array.isArray(brandArray)) {
          const found = brandArray.find(s => s.id === id);
          if (found) sneaker = found;
        }
      });
    });
  }

  if (!sneaker) return <p>Sneaker no encontrado</p>;

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2>Detalle de {sneaker.name}</h2>
      <img src={sneaker.imageUrlString} alt={sneaker.name} style={{ width: '300px', height: '300px', objectFit: 'cover', marginBottom: '20px' }} />
      <p>Marca: {sneaker.brand}</p>
      <p>Precio: ${sneaker.price}</p>
      {sneaker.description && <p>{sneaker.description}</p>}
      {sneaker.sizes && <p>Tallas: {sneaker.sizes.join(', ')}</p>}
      {sneaker.color && <p>Color: {sneaker.color}</p>}
    </div>
  );
};

export default SneaakerDetail;