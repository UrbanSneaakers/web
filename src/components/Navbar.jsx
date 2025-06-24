import React, { useState } from 'react';
import useMenuData from '../hooks/useMenuData';
import DropdownMenu from './DropdownMenu';

import '../styles/Navbar.css';

export const Navbar = () => {
  const { menu, loading } = useMenuData();
  const [hoveredItem, setHoveredItem] = useState(null);

  const navItems = Object.keys(menu);

  return (
    <nav className="navbar">
      <div className="navbar-logo">👟👟</div>

      <ul className="navbar-menu">
        {loading ? (
          <li className="navbar-item">Cargando...</li>
        ) : (
          navItems.map((item) => (
            <div
              key={item}
              className="navbar-hover-group"
              onMouseEnter={() => {
                setHoveredItem(item);
                console.log('--> Hovered:', item); // ✅ Verifica que entra aquí
              }}
              onMouseLeave={() => setHoveredItem(null)}
              style={{ position: 'relative' }}
            >
              <li className="navbar-item">
                <span className="navbar-label">{item}</span>
              </li>

              {/* Muestra el dropdown pegado al item */}
              {hoveredItem === item && (
                <DropdownMenu items={menu[item]} />
              )}
            </div>
          ))
        )}
      </ul>

      <div className="navbar-icons">🔍 ❤️ 🛒</div>
    </nav>
  );
};
