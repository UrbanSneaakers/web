import React from 'react';
import '../styles/DropdownMenu.css';

const DropdownMenu = ({ items }) => {

  return (
    <div className="dropdown-menu">
      <div className="dropdown-wrapper">
      {Object.entries(items).map(([brand, models]) => (
        <div key={brand} className="dropdown-section">
          <div className="dropdown-title">{brand}</div>
          {models.map((model) => (
            <div key={model.slug} className="dropdown-item">
              {model.name}
            </div>
          ))}
        </div>
      ))}
      </div>
    </div>
  );
};

export default DropdownMenu;
