import React from 'react';
import { useNavigate } from 'react-router';
import useMenuData from '../hooks/useMenuData';
import DropdownMenu from './DropdownMenu';
import { useNavbarViewModel } from '../viewModels/NavbarViewModel';

import '../styles/Navbar.css';

export const Navbar = () => {
  const { menu, loading, error } = useMenuData();
  const navigate = useNavigate();
  const {
    hoveredItem,
    handleItemMouseEnter,
    handleItemMouseLeave,
    handleDropdownMouseEnter,
    handleDropdownMouseLeave,
  } = useNavbarViewModel();

  const handleCategoryClick = (category) => {
    navigate(`/categoria/${category}`);
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
              <span className="navbar-label" onClick={() => handleCategoryClick(item)} style={{ cursor: 'pointer' }}>
                {item}
              </span>
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
        category={hoveredItem}
      />

      <div className="navbar-icons">🔍 ❤️ 🛒</div>
    </nav>
  );
};
