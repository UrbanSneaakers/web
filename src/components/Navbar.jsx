import React, { useState, useRef } from 'react';
import useMenuData from '../hooks/useMenuData';
import DropdownMenu from './DropdownMenu';

import '../styles/Navbar.css';

export const Navbar = () => {
  const { menu, loading, error } = useMenuData();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isHoveringDropdown, setIsHoveringDropdown] = useState(false);
  const hoverTimeout = useRef(null);

  const HOVER_EXIT_DELAY_MS = 100;
  const TRANSITION_DELAY_MS = 150;

  const cancelPendingClose = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
  };

  const handleItemMouseEnter = (item) => {
    cancelPendingClose();

    if (hoveredItem && hoveredItem !== item) {
      setHoveredItem(null); // inicia fade-out
      setTimeout(() => setHoveredItem(item), TRANSITION_DELAY_MS); // luego cambia
    } else {
      setHoveredItem(item);
    }
  };

  const handleItemMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      if (!isHoveringDropdown) {
        setHoveredItem(null);
      }
    }, HOVER_EXIT_DELAY_MS);
  };

  const handleDropdownMouseEnter = () => {
    cancelPendingClose();
    setIsHoveringDropdown(true);
  };

  const handleDropdownMouseLeave = () => {
    setIsHoveringDropdown(false);
    setHoveredItem(null);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">👟👟</div>

      <ul className="navbar-menu">
        {loading ? (
          <li className="navbar-item">Cargando...</li>
        ) : error ? (
          <li className="navbar-item">Error cargando menú: {error.message}</li>
        ) : menu ? (
          Object.keys(menu).map((item) => (
            <li
              key={item}
              className="navbar-item"
              onMouseEnter={() => handleItemMouseEnter(item)}
              onMouseLeave={handleItemMouseLeave}
            >
              <span className="navbar-label">{item}</span>
            </li>
          ))
        ) : (
          <li className="navbar-item">Menú no disponible</li>
        )}
      </ul>

      <DropdownMenu
        items={menu && menu[hoveredItem] ? menu[hoveredItem] : {}}
        visible={!!hoveredItem}
        onMouseEnter={handleDropdownMouseEnter}
        onMouseLeave={handleDropdownMouseLeave}
      />

      <div className="navbar-icons">🔍 ❤️ 🛒</div>
    </nav>
  );
};
