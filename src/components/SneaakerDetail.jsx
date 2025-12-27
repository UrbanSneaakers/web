import React from 'react';
import { useParams } from 'react-router';
import { useSneaakers } from '../hooks/useSneaakers';

const SneaakerDetail = () => {
  const { id } = useParams();
  const { sneaakers, loading, error } = useSneaakers();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const sneaker = sneaakers.find(s => s.id === id);

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