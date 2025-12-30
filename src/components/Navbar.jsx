import React from 'react';
import { useNavigate } from 'react-router';
import { useNavItems } from '../hooks/useNavItems';
import { useDropdownMenu } from '../hooks/useDropdownMenu';
import DropdownMenu from './DropdownMenu';
import { useNavbarViewModel } from '../viewModels/NavbarViewModel';
import RemoteImage from "./RemoteImage";

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

  const logoUrl = "https://64.media.tumblr.com/4654165fa2c874431c3a64810cc52935/3dbd1fe350877db0-2e/s640x960/c2427ee4fe2e74ea1d1bfa88c852510db1052596.pnj"; // URL de la imagen del logo

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate("/")}>
        <RemoteImage
          src={logoUrl}
          alt="Logo"
          height={48}                
          loadingFallback={<div style={{ width: 140, height: 40 }} />}
          fallback={<div style={{ width: 140, height: 40 }}>👟</div>}
          style={{ width: "auto" }}   // mantiene proporción
        />
      </div>

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
