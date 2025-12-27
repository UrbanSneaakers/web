import React from 'react';
import { useNavigate } from 'react-router';

const SneaakerCard = ({ sneaker }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/sneaker/${sneaker.id}`);
  };

  return (
    <div 
      onClick={handleClick}
      style={{
        border: '1px solid #ddd',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: '0px',
        padding: '16px',
        width: '320px',
        height: '320px', // Hacerlo cuadrado
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer'
      }}
    >
      <img src={sneaker.imageUrlString} alt={sneaker.name} style={{ width: '100%', height: '200px', objectFit: 'cover', marginBottom: '16px' }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h3 style={{ margin: '8px 0', fontSize: '18px', color: 'black' }}>{sneaker.name}</h3>
        <p style={{ margin: '4px 0', fontSize: '14px', color: 'black' }}>Marca: {sneaker.brand}</p>
        <p style={{ margin: '4px 0', fontSize: '16px', color: 'black', fontWeight: 'bold' }}>${sneaker.price}</p>
      </div>
    </div>
  );
};

export default SneaakerCard;