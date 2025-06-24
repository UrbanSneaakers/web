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
            <li
              key={item}
              className="navbar-item"
              onMouseEnter={() => setHoveredItem(item)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <span className="navbar-label">{item}</span>
            </li>
          ))
        )}
      </ul>

      {hoveredItem && menu[hoveredItem] && (
        <DropdownMenu items={menu[hoveredItem]} />
      )}

      <div className="navbar-icons">🔍 ❤️ 🛒</div>
    </nav>
  );
};
