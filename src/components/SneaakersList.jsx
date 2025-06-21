import React from 'react';
import { useSneaakers } from '../hooks/useSneaakers';

const SneaakersList = () => {
  const { sneaakers, loading } = useSneaakers();

  if (loading) return <p>Cargando tenis...</p>;

  return (
    <div style={{ padding: '40px' }}>
      <h2>Catálogo de Tenis</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
        {sneaakers.map((s) => (
          <div key={s.id} style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '16px',
            width: '200px',
            textAlign: 'center'
          }}>
            <img src={s.imageUrlString} alt={s.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
            <h3>{s.name}</h3>
            <p>Marca: {s.brand}</p>
            <p><strong>${s.price}</strong></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SneaakersList;
