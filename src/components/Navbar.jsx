import React from 'react';
import useMenuData from '../hooks/useMenuData';
import '../styles/Navbar.css';

export const Navbar = () => {
  const { menu, loading } = useMenuData();

  const navItems = Object.keys(menu); // ['Hombre', 'Mujer', 'Ofertas']

  return (
    <nav className="navbar">
      <div className="navbar-logo">👟</div>
      <ul className="navbar-menu">
        {loading ? (
          <li className="navbar-item">Cargando...</li>
        ) : (
          navItems.map((item) => (
            <li key={item} className="navbar-item">
              <span className="navbar-label">{item}</span>
              <div className="dropdown-menu">
                {Object.entries(menu[item]).map(([brand, models]) => (
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
            </li>
          ))
        )}
      </ul>
      <div className="navbar-icons">🔍 ❤️ 🛒</div>
    </nav>
  );
};
