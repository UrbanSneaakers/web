import React from 'react';
import { useSneaakers } from '../hooks/useSneaakers';
import SneaakerCard from './SneaakerCard';
import { Navbar } from './Navbar';

const SneaakersList = () => {
  const { sneaakers, loading, error } = useSneaakers();

  if (loading) return <p>Cargando tenis...</p>;
  if (error) return <p>Error cargando sneakers: {error.message}</p>;
  if (!sneaakers || sneaakers.length === 0) return <p>No hay sneakers disponibles</p>;

  return (
    <>
      <Navbar />
      <div style={{ padding: '40px' }}>
        <h2>Catálogo de Tenis</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
          {sneaakers.map((s) => (
            <SneaakerCard key={s.id} sneaker={s} />
          ))}
        </div>
      </div>
      <div className="app-wrapper">
        <h1>Bienvenido a Urban Sneaakers 👟</h1>
        <p>¡Muy pronto podrás ver nuestro catálogo de tenis!</p>
      </div>
    </>
  );
};

export default SneaakersList;
