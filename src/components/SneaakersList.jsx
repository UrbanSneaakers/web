import React from 'react';
import { useSneaakers } from '../hooks/useSneaakers';
import SneaakerCard from './SneaakerCard';

const SneaakersList = () => {
  const { sneaakers, loading } = useSneaakers();

  if (loading) return <p>Cargando tenis...</p>;

  return (
    <div style={{ padding: '40px' }}>
      <h2>Catálogo de Tenis</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
        {sneaakers.map((s) => (
          <SneaakerCard key={s.id} sneaker={s} />
        ))}
      </div>
    </div>
  );
};

export default SneaakersList;
