import React from 'react';

const SneaakerCard = ({ sneaker }) => {
  return (
    <div style={{
      border: '1px solid #ddd',
      backgroundColor: '#f9f9f9',
      borderRadius: '0px',
      padding: '16px',
      width: '200px',
      height: '200px', // Hacerlo cuadrado
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <img src={sneaker.imageUrlString} alt={sneaker.name} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
      <h3 style={{ margin: '8px 0', fontSize: '16px' }}>{sneaker.name}</h3>
      <p style={{ margin: '4px 0', fontSize: '14px' }}>Marca: {sneaker.brand}</p>
      <p style={{ margin: '4px 0', fontSize: '14px' }}><strong>${sneaker.price}</strong></p>
    </div>
  );
};

export default SneaakerCard;