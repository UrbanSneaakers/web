import React from 'react';
import { useLocation } from 'react-router';

const PurchaseScreen = () => {
  const location = useLocation();
  const { selectedSize, sneaker } = location.state || {};

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2>Estamos trabajando en la pantalla de compra</h2>
      {sneaker && (
        <div>
          <h3>Producto: {sneaker.name}</h3>
          <p>Marca: {sneaker.brand}</p>
          <p>Precio: ${sneaker.price}</p>
          {selectedSize && <p>Talla seleccionada: {selectedSize}</p>}
        </div>
      )}
    </div>
  );
};

export default PurchaseScreen;