import React from 'react';
import { useNavigate } from 'react-router';
import '../styles/DropdownMenu.css';

const DropdownMenu = ({ items, onMouseEnter, onMouseLeave, visible, category, loading, error }) => {
  const navigate = useNavigate();

  const handleBrandClick = (brand) => {
    navigate(`/categoria/${category}/marca/${brand}`);
  };

  const handleModelClick = (id) => {
    navigate(`/sneaker/${id}`);
  };

  return (
    <div
      className={`dropdown-menu ${visible ? 'visible' : ''}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="dropdown-wrapper">
        {loading && <p>Cargando...</p>}
        {error && <p>Error cargando dropdown: {error.message || String(error)}</p>}
        {!loading && !error && items && Object.keys(items).length > 0 ? (
          Object.entries(items).map(([brand, models]) => (
            <div key={brand} className="dropdown-section">
              <div className="dropdown-title" onClick={() => handleBrandClick(brand)} style={{ cursor: 'pointer' }}>
                {brand}
              </div>
              {Array.isArray(models) && models.map((model) => (
                <div key={model.id} className="dropdown-item" onClick={() => handleModelClick(model.id)} style={{ cursor: 'pointer' }}>
                  {model.name}
                </div>
              ))}
            </div>
          ))
        ) : (
          !loading && !error && <p>No hay productos disponibles</p>
        )}
      </div>
    </div>
  );
};

export default DropdownMenu;
