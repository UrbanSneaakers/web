import React from 'react';
import { useNavigate } from 'react-router';
import { useNavItems } from '../hooks/useNavItems';
import { useDropdownMenu } from '../hooks/useDropdownMenu';
import DropdownMenu from './DropdownMenu';
import { useNavbarViewModel } from '../viewModels/NavbarViewModel';

import '../styles/Navbar.css';

export const Navbar = () => {
  const { items: navItems, loading: navLoading, error: navError } = useNavItems();
  const navigate = useNavigate();
  const {
    hoveredItem,
    handleItemMouseEnter,
    handleItemMouseLeave,
    handleDropdownMouseEnter,
    handleDropdownMouseLeave,
  } = useNavbarViewModel();

  // Cargar dropdown solo cuando hay item hovereado
  const { dropdown, loading: dropdownLoading, error: dropdownError } = useDropdownMenu(hoveredItem);

  const handleItemClick = (slug) => {
    navigate(`/categoria/${slug}`);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">👟👟</div>

      <ul className="navbar-menu">
        {navLoading ? (
          <li className="navbar-item">Cargando...</li>
        ) : navError ? (
          <li className="navbar-item">Error cargando menú</li>
        ) : navItems && Array.isArray(navItems) && navItems.length > 0 ? (
          navItems.map((item) => (
            <li
              key={item.slug}
              className="navbar-item"
              onMouseEnter={() => handleItemMouseEnter(item.slug)}
              onMouseLeave={handleItemMouseLeave}
            >
              <span className="navbar-label" onClick={() => handleItemClick(item.slug)} style={{ cursor: 'pointer' }}>
                {item.label}
              </span>
            </li>
          ))
        ) : (
          <li className="navbar-item">Menú no disponible</li>
        )}
      </ul>

      <DropdownMenu
        items={dropdown || {}}
        visible={!!hoveredItem}
        onMouseEnter={handleDropdownMouseEnter}
        onMouseLeave={handleDropdownMouseLeave}
        category={hoveredItem}
        loading={dropdownLoading}
        error={dropdownError}
      />

      <div className="navbar-icons">🔍 ❤️ 🛒</div>
    </nav>
  );
};
