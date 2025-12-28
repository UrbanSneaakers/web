import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { useUnifiedData } from '../hooks/useUnifiedData';
import { useSneaakerDetailViewModel } from '../viewModels/SneaakerDetailViewModel';

const SneaakerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useUnifiedData();
  const { selectedSize, handleSizeSelect } = useSneaakerDetailViewModel();

  const handleBuy = () => {
    navigate('/compra', { state: { selectedSize, sneaker } });
  };

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
      <img src={sneaker.imageUrlString} alt={sneaker.name} style={{ width: '300px', height: '300px', objectFit: 'contain', marginBottom: '20px' }} />
      <p>Marca: {sneaker.brand}</p>
      <p>Precio: ${sneaker.price}</p>
      {sneaker.description && <p>{sneaker.description}</p>}
      {sneaker.sizes && (
        <div style={{ marginTop: '20px' }}>
          <p>Tallas disponibles:</p>
          {sneaker.sizes.map((size) => (
            <label key={size} style={{ marginRight: '10px' }}>
              <input
                type="radio"
                name="size"
                value={size}
                checked={selectedSize === size}
                onChange={() => handleSizeSelect(size)}
              />
              {size}
            </label>
          ))}
        </div>
      )}
      {sneaker.color && <p>Color: {sneaker.color}</p>}
      <button onClick={handleBuy} disabled={!selectedSize} style={{ backgroundColor: 'black', color: 'white', padding: '10px 20px', border: 'none', cursor: selectedSize ? 'pointer' : 'not-allowed', marginTop: '20px', opacity: selectedSize ? 1 : 0.15 }}>
        Comprar
      </button>
    </div>
  );
};

export default SneaakerDetail;